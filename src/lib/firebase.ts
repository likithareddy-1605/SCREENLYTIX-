import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export type UsageStatus = 'Healthy' | 'Moderate' | 'High Risk';

export interface MobileResponse {
  id?: string;
  name?: string;
  ageGroup: string;
  gender: string;
  occupation: string;
  dailyUsage: string;
  mainPurpose: string;
  usagePurpose?: string[];
  socialMediaUsage: string;
  checkAfterWaking: string;
  useBeforeSleep: string;
  feelsAddicted: string;
  stayWithoutPhone: string;
  usageWhileEating: string;
  status: UsageStatus;
  createdAt: any;
  userId?: string;
  digitalWellbeingScore?: number;
}

export function calculateWellbeingScore(res: any): number {
  let score = 100;
  
  // 1. Daily Screen Time
  if (res.dailyUsage === 'More than 6 hours') score -= 30;
  else if (res.dailyUsage === '3–6 hours') score -= 15;
  else if (res.dailyUsage === '1–3 hours') score += 0;
  else if (res.dailyUsage === 'Less than 1 hour') score += 5;
  
  // 2. Use Before Sleep
  if (res.useBeforeSleep === 'Always') score -= 20;
  else if (res.useBeforeSleep === 'Sometimes') score -= 10;
  else if (res.useBeforeSleep === 'Never') score += 5;
  
  // 3. Check After Waking
  if (res.checkAfterWaking === 'Always') score -= 15;
  else if (res.checkAfterWaking === 'Sometimes') score -= 5;
  else if (res.checkAfterWaking === 'Never') score += 5;
  
  // 4. Feels Addicted
  if (res.feelsAddicted === 'Yes') score -= 20;
  else if (res.feelsAddicted === 'Maybe') score -= 10;
  else if (res.feelsAddicted === 'No') score += 5;
  
  // 5. Usage While Eating
  if (res.usageWhileEating === 'Often') score -= 10;
  else if (res.usageWhileEating === 'Sometimes') score -= 5;
  else if (res.usageWhileEating === 'Never') score += 5;
  
  // 6. Social Media Frequency
  if (res.socialMediaUsage === 'Very Frequently') score -= 15;
  else if (res.socialMediaUsage === 'Frequently') score -= 10;
  else if (res.socialMediaUsage === 'Sometimes') score -= 5;
  else if (res.socialMediaUsage === 'Rarely' || res.socialMediaUsage === 'Not at all') score += 5;

  return Math.min(100, Math.max(0, score));
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const submitResponse = async (data: Omit<MobileResponse, 'id' | 'createdAt'>) => {
  const score = calculateWellbeingScore(data);
  const basePayload = {
    ...data,
    createdAt: serverTimestamp(),
    userId: auth.currentUser?.uid || null,
  };

  let docRef;
  try {
    // Submit to old responses collection (for backward compatibility / old charts/admin page)
    // IMPORTANT: It does not have digitalWellbeingScore to strictly satisfy 'responses' schema (size <= 14)
    docRef = await addDoc(collection(db, 'responses'), basePayload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'responses');
  }

  // Submit to new userResponses collection as requested
  try {
    const extendedPayload = {
      ...basePayload,
      digitalWellbeingScore: score,
    };
    await addDoc(collection(db, 'userResponses'), extendedPayload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'userResponses');
  }

  return docRef;
};

export const getAllResponses = async (): Promise<MobileResponse[]> => {
  try {
    const q = query(collection(db, 'responses'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      const rawPurpose = data.usagePurpose ?? (data.mainPurpose ? data.mainPurpose.split(', ') : []);
      const usagePurposeClean = rawPurpose.map((p: string) => p === 'Watching Videos' ? 'Entertainment' : p);
      const mainPurposeClean = usagePurposeClean.join(', ');
      return {
        id: doc.id,
        ...data,
        usagePurpose: usagePurposeClean,
        mainPurpose: mainPurposeClean,
        digitalWellbeingScore: data.digitalWellbeingScore ?? calculateWellbeingScore({ ...data, mainPurpose: mainPurposeClean, usagePurpose: usagePurposeClean }),
      } as MobileResponse;
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'responses');
    return [];
  }
};

export const getAllUserResponses = async (): Promise<MobileResponse[]> => {
  try {
    let userResponses: MobileResponse[] = [];
    try {
      const q = query(collection(db, 'userResponses'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      userResponses = snapshot.docs.map(doc => {
        const data = doc.data();
        const rawPurpose = data.usagePurpose ?? (data.mainPurpose ? data.mainPurpose.split(', ') : []);
        const usagePurposeClean = rawPurpose.map((p: string) => p === 'Watching Videos' ? 'Entertainment' : p);
        const mainPurposeClean = usagePurposeClean.join(', ');
        return {
          id: doc.id,
          ...data,
          usagePurpose: usagePurposeClean,
          mainPurpose: mainPurposeClean
        } as MobileResponse;
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'userResponses');
    }

    // Combine any legacy records from responses that don't exist in userResponses to prevent data loss
    let legacyResponses: MobileResponse[] = [];
    try {
      const legacyQ = query(collection(db, 'responses'), orderBy('createdAt', 'desc'));
      const legacySnapshot = await getDocs(legacyQ);
      legacyResponses = legacySnapshot.docs.map(doc => {
        const data = doc.data();
        const rawPurpose = data.usagePurpose ?? (data.mainPurpose ? data.mainPurpose.split(', ') : []);
        const usagePurposeClean = rawPurpose.map((p: string) => p === 'Watching Videos' ? 'Entertainment' : p);
        const mainPurposeClean = usagePurposeClean.join(', ');
        return {
          id: doc.id,
          ...data,
          usagePurpose: usagePurposeClean,
          mainPurpose: mainPurposeClean,
          digitalWellbeingScore: data.digitalWellbeingScore ?? calculateWellbeingScore({ ...data, mainPurpose: mainPurposeClean, usagePurpose: usagePurposeClean })
        } as MobileResponse;
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'responses');
    }

    const userResKeys = new Set(userResponses.map(r => `${r.ageGroup}-${r.gender}-${r.occupation}-${r.createdAt?.seconds || ''}`));
    const combined = [...userResponses];

    for (const leg of legacyResponses) {
      const key = `${leg.ageGroup}-${leg.gender}-${leg.occupation}-${leg.createdAt?.seconds || ''}`;
      if (!userResKeys.has(key)) {
        combined.push(leg);
      }
    }

    combined.sort((a, b) => {
      const timeA = a.createdAt?.seconds || (a.createdAt instanceof Date ? a.createdAt.getTime() / 1000 : 0);
      const timeB = b.createdAt?.seconds || (b.createdAt instanceof Date ? b.createdAt.getTime() / 1000 : 0);
      return timeB - timeA;
    });

    return combined;
  } catch (error) {
    console.error("Error loading userResponses: ", error);
    // Fallback to responses if userResponses has issues
    return getAllResponses();
  }
};
