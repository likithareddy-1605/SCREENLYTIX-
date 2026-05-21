/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Smartphone, 
  User, 
  BarChart2, 
  ArrowRight, 
  ChevronLeft, 
  Moon, 
  Clock, 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Zap,
  LayoutDashboard,
  Search,
  SlidersHorizontal,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { submitResponse, getAllUserResponses, calculateWellbeingScore, MobileResponse, UsageStatus } from './lib/firebase';

// Utilities
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Screenlytix Brand Logo Component
export function ScreenlytixLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main interactive brand linear gradient */}
        <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5B4BFF" />
          <stop offset="50%" stopColor="#AD6CFF" />
          <stop offset="100%" stopColor="#FF6FAE" />
        </linearGradient>
        
        {/* Underlay glow gradient for depth */}
        <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5B4BFF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FF6FAE" stopOpacity="0.12" />
        </linearGradient>
        
        {/* Dynamic central lens (Awareness eye) glow */}
        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6FAE" stopOpacity="1" />
          <stop offset="35%" stopColor="#5B4BFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#5B4BFF" stopOpacity="0" />
        </radialGradient>
        
        {/* Premium glass semi-transparent reflection */}
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
        </linearGradient>

        <linearGradient id="neonBarGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#5B4BFF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF6FAE" stopOpacity="0.9" />
        </linearGradient>

        {/* Soft shadow filter to give physical dimension */}
        <filter id="subtleShade" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#5B4BFF" floodOpacity="0.12" />
        </filter>

        {/* Highlight bloom */}
        <filter id="softBloom" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient Radial Underlay Glow */}
      <circle cx="50" cy="50" r="42" fill="url(#glowGrad)" filter="url(#softBloom)" />

      {/* Fine Outer Concentric Resonance Orbits (Mindfulness alignment) */}
      <circle cx="50" cy="50" r="46" stroke="url(#primaryGrad)" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.3" />
      <circle cx="50" cy="50" r="41" stroke="#FF6FAE" strokeWidth="0.5" strokeDasharray="4 2" opacity="0.2" />

      {/* Modern Smartphone Frame - Elevating glassmorphic aesthetic */}
      <rect 
        x="27" 
        y="17" 
        width="46" 
        height="66" 
        rx="11" 
        stroke="url(#primaryGrad)" 
        strokeWidth="3.2" 
        strokeLinecap="round"
        fill="#FFFFFF"
        fillOpacity="0.75"
        filter="url(#subtleShade)"
      />

      {/* Dynamic Device Speaker Bar & Smart Core Sensor */}
      <rect x="42" y="22" width="16" height="2.5" rx="1.25" fill="#5B4BFF" opacity="0.35" />
      <circle cx="36" cy="23.25" r="1.25" fill="#FF6FAE" opacity="0.6" />

      {/* Flowing Wave / Mindful Pulse Line traversing the unit */}
      <path 
        d="M 12 54 Q 24 34 38 52 T 62 48 T 88 42" 
        stroke="url(#primaryGrad)" 
        strokeWidth="3" 
        strokeLinecap="round" 
        fill="none" 
        opacity="0.9"
        filter="url(#softBloom)"
      />
      <path 
        d="M 12 54 Q 24 34 38 52 T 62 48 T 88 42" 
        stroke="#FFFFFF" 
        strokeWidth="0.8" 
        strokeLinecap="round" 
        fill="none" 
        opacity="0.8"
        strokeDasharray="1 2"
      />

      {/* The Digital Eye & Focus Lens (Visualizes Insightful Monitoring and Awareness) */}
      {/* Outer Eye Vessel */}
      <path 
        d="M 35 50 C 40 41.5, 60 41.5, 65 50 C 60 58.5, 40 58.5, 35 50 Z" 
        fill="url(#glassGrad)" 
        stroke="url(#primaryGrad)" 
        strokeWidth="1.8" 
        strokeLinejoin="round"
      />

      {/* Radiant Glowing Eye Iris */}
      <circle cx="50" cy="50" r="7.5" fill="url(#eyeGlow)" />
      <circle cx="50" cy="50" r="4.2" fill="#FFFFFF" />
      
      {/* Dynamic Specular Lens Flare Reflection (Provides ultimate premium finish) */}
      <circle cx="51.6" cy="48.4" r="1.1" fill="#FFFFFF" opacity="0.95" />

      {/* Subtle Analytics Activity Columns anchored at the layout bottom */}
      <rect x="33" y="65" width="3.2" height="7" rx="1.2" fill="url(#neonBarGrad)" />
      <rect x="39" y="61" width="3.2" height="11" rx="1.2" fill="url(#neonBarGrad)" opacity="0.5" />
      <rect x="45" y="64" width="3.2" height="8" rx="1.2" fill="url(#primaryGrad)" />
      <rect x="51" y="62" width="3.2" height="10" rx="1.2" fill="url(#neonBarGrad)" />
      <rect x="57" y="66" width="3.2" height="6" rx="1.2" fill="url(#neonBarGrad)" opacity="0.7" />
      <rect x="63" y="63" width="3.2" height="9" rx="1.2" fill="url(#primaryGrad)" opacity="0.4" />
    </svg>
  );
}

// App Icon with rounded corners
export function ScreenlytixIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={cn("bg-gradient-to-br from-[#F5F3FF] via-white to-[#FFF0F6] border border-gray-100/90 p-3.5 rounded-[24px] shadow-xl shadow-[#5B4BFF]/8 flex items-center justify-center transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl hover:shadow-[#5B4BFF]/15 cursor-pointer", className)}>
      <ScreenlytixLogo className="w-full h-full" />
    </div>
  );
}

// Types
type Page = 'welcome' | 'analysis' | 'result' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const [lastResponse, setLastResponse] = useState<MobileResponse | null>(null);
  const [allResponses, setAllResponses] = useState<MobileResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load responses for admin analytics
  useEffect(() => {
    if (currentPage === 'admin') {
      const load = async () => {
        setIsLoading(true);
        try {
          const data = await getAllUserResponses();
          setAllResponses(data);
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      };
      load();
    }
  }, [currentPage]);

  const handleStartAnalysis = () => setCurrentPage('analysis');
  const handleViewAdmin = () => setCurrentPage('admin');
  const handleBackToWelcome = () => setCurrentPage('welcome');

  const onAnalysisComplete = (response: MobileResponse) => {
    setLastResponse(response);
    setCurrentPage('result');
  };

  return (
    <div className="min-h-screen bg-app-bg text-text-main font-sans selection:bg-primary/20 flex items-center justify-center py-10 px-4 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentPage === 'welcome' && (
          <PhoneFrame key="welcome">
            <WelcomePage 
              onStart={handleStartAnalysis} 
              onAdmin={handleViewAdmin} 
            />
          </PhoneFrame>
        )}
        {currentPage === 'analysis' && (
          <PhoneFrame key="analysis">
            <AnalysisPage 
              onBack={handleBackToWelcome} 
              onComplete={onAnalysisComplete} 
            />
          </PhoneFrame>
        )}
        {currentPage === 'result' && (
          <PhoneFrame key="result">
            <ResultPage 
              response={lastResponse!} 
              onBack={handleBackToWelcome} 
            />
          </PhoneFrame>
        )}
        {currentPage === 'admin' && (
          <div key="admin" className="w-full max-w-6xl animate-in fade-in zoom-in duration-500">
            <AdminPage 
              responses={allResponses} 
              onBack={handleBackToWelcome} 
              isLoading={isLoading}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Layout Components ---

function PhoneFrame({ children }: { children: React.ReactNode; key?: string }) {
  return (
    <div className="w-full max-w-[375px] h-[760px] bg-white rounded-[40px] border-[10px] border-[#1a1a1a] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-500">
      <div className="absolute top-0 left-0 right-0 h-10 px-6 flex items-center justify-between z-50 pointer-events-none">
        <span className="text-[10px] font-black text-[#1a1a1a]">9:41</span>
        <div className="flex gap-1.5 items-center">
          <span className="text-[10px] font-black text-[#1a1a1a]">LTE</span>
          <span className="text-[10px] font-black text-[#1a1a1a]">100%</span>
        </div>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-2xl z-50 flex items-center justify-center">
        <div className="w-8 h-1 bg-white/20 rounded-full" />
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col pt-4">
        {children}
      </div>
    </div>
  );
}

// --- Welcome Page ---

function WelcomePage({ onStart, onAdmin }: { onStart: () => void; onAdmin: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-white p-6 pt-12"
    >
      <div className="mb-8 text-center flex flex-col items-center">
        <ScreenlytixIcon className="mb-6" />
        <h1 className="text-4xl font-black bg-gradient-to-r from-[#5B4BFF] via-[#FF6FAE] to-indigo-600 bg-clip-text text-transparent tracking-tight mb-2 select-none">
          Screenlytix
        </h1>
        <div className="bg-[#F3F1FF] text-[#5B4BFF] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 max-w-[280px] border border-[#5B4BFF]/10 text-center leading-normal">
          Smart Mobile Usage Analytics & Digital Wellbeing Platform
        </div>
        <p className="text-gray-500 text-xs leading-relaxed px-2 font-medium">
          Understand your mobile search, social feeds, entertainment, and work patterns. Track habits, discover dependency metrics, and make intentional choices about your digital lifestyle.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <button 
          id="btn-user-analysis"
          onClick={onStart}
          className="w-full group bg-secondary border border-primary/10 p-5 rounded-2xl transition-all text-left hover:border-primary active:scale-95 cursor-pointer"
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm text-xl">👤</div>
          <h3 className="font-bold text-sm text-text-main group-hover:text-primary transition-colors">USER ANALYSIS SURVEY</h3>
          <p className="text-[10px] text-gray-500 leading-tight mt-1 capitalize">
            Personalized habit tracking and awareness suggestions.
          </p>
        </button>

        <button 
          id="btn-admin-analytics"
          onClick={onAdmin}
          className="w-full group bg-secondary border border-primary/10 p-5 rounded-2xl transition-all text-left hover:border-primary active:scale-95 cursor-pointer"
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm text-xl">📊</div>
          <h3 className="font-bold text-sm text-text-main group-hover:text-primary transition-colors">ADMIN ANALYTICS</h3>
          <p className="text-[10px] text-gray-500 leading-tight mt-1 capitalize">
            Community insights, statistics, and global usage data.
          </p>
        </button>
      </div>

      <div className="mt-auto pb-2 space-y-4">
        <button 
          onClick={onStart}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors cursor-pointer"
        >
          Get Started
        </button>

        <div className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 opacity-60">
          <ScreenlytixLogo className="w-4.5 h-4.5" />
          <span>© 2026 Screenlytix • Intelligent Wellbeing</span>
        </div>
      </div>
    </motion.div>
  );
}

// --- Analysis Page ---

function AnalysisPage({ onBack, onComplete }: { onBack: () => void; onComplete: (res: MobileResponse) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    ageGroup: '18–30',
    gender: 'Male',
    occupation: 'Student',
    dailyUsage: '3–6 hours',
    socialMediaUsage: 'Sometimes',
    checkAfterWaking: 'Sometimes',
    useBeforeSleep: 'Sometimes',
    feelsAddicted: 'Maybe',
    stayWithoutPhone: 'Maybe',
    usageWhileEating: 'Sometimes'
  });

  const [usagePurpose, setUsagePurpose] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUsageToggle = (value: string) => {
    setUsagePurpose((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const calculateStatus = (): UsageStatus => {
    const { dailyUsage, useBeforeSleep, checkAfterWaking, feelsAddicted } = formData;
    
    const isHighRisk = 
      dailyUsage === 'More than 6 hours' && 
      useBeforeSleep === 'Always' && 
      checkAfterWaking === 'Always' && 
      feelsAddicted === 'Yes';

    if (isHighRisk) return 'High Risk';

    const isModerate = 
      (dailyUsage === '3–6 hours' || dailyUsage === 'More than 6 hours') ||
      (useBeforeSleep === 'Always' || checkAfterWaking === 'Always') ||
      feelsAddicted === 'Yes' || feelsAddicted === 'Maybe';

    if (isModerate) return 'Moderate';
    
    return 'Healthy';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usagePurpose.length === 0) {
      alert('Please select at least one mobile usage purpose.');
      return;
    }
    setIsSubmitting(true);
    const status = calculateStatus();
    
    const responseData: Omit<MobileResponse, 'id' | 'createdAt'> = {
      ...formData,
      usagePurpose,
      mainPurpose: usagePurpose.join(', '),
      status
    };

    try {
      const docRef = await submitResponse(responseData);
      onComplete({
        id: docRef.id,
        ...responseData,
        createdAt: new Date()
      } as MobileResponse);
    } catch (error) {
      console.error(error);
      alert('Error submitting survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="p-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 text-gray-400 hover:text-primary transition-colors cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold text-gray-800 tracking-tight">Screenlytix Analysis</h2>
        </div>
        <ScreenlytixLogo className="w-6 h-6 mr-1" />
      </header>

      <form onSubmit={handleSubmit} className="flex-1 p-5 overflow-y-auto space-y-4 pb-24 scrollbar-hide">
        <InputFormField 
          label="Your Name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Enter your name"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Age Group" name="ageGroup" value={formData.ageGroup} onChange={handleChange}>
            <option value="Below 18">Below 18</option>
            <option value="18–30">18–30</option>
            <option value="31–50">31–50</option>
            <option value="Above 50">Above 50</option>
          </FormField>
          
          <FormField label="Gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </FormField>
        </div>

        <FormField label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange}>
          <option value="Student">Student</option>
          <option value="Employee">Employee</option>
          <option value="Business">Business</option>
          <option value="Homemaker">Homemaker</option>
          <option value="Farmer">Farmer</option>
          <option value="Retired">Retired</option>
          <option value="Other">Other</option>
        </FormField>

        <FormField label="Daily Mobile Usage" name="dailyUsage" value={formData.dailyUsage} onChange={handleChange}>
          <option value="Less than 1 hour">Less than 1 hour</option>
          <option value="1–3 hours">1–3 hours</option>
          <option value="3–6 hours">3–6 hours</option>
          <option value="More than 6 hours">More than 6 hours</option>
        </FormField>

        <FormField label="Check phone after wake?" name="checkAfterWaking" value={formData.checkAfterWaking} onChange={handleChange}>
          <option value="Always">Always</option>
          <option value="Sometimes">Sometimes</option>
          <option value="Never">Never</option>
        </FormField>

        <FormField label="Use before sleep?" name="useBeforeSleep" value={formData.useBeforeSleep} onChange={handleChange}>
          <option value="Always">Always</option>
          <option value="Sometimes">Sometimes</option>
          <option value="Never">Never</option>
        </FormField>

        <FormField label="Feel addicted?" name="feelsAddicted" value={formData.feelsAddicted} onChange={handleChange}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Maybe">Maybe</option>
        </FormField>

        <FormField label="Social Media Frequency" name="socialMediaUsage" value={formData.socialMediaUsage} onChange={handleChange}>
          <option value="Not at all">Not at all</option>
          <option value="Rarely">Rarely</option>
          <option value="Sometimes">Sometimes</option>
          <option value="Frequently">Frequently</option>
          <option value="Very Frequently">Very Frequently</option>
        </FormField>

        <FormField label="Phone during meals/family time" name="usageWhileEating" value={formData.usageWhileEating} onChange={handleChange}>
          <option value="Never">Never</option>
          <option value="Sometimes">Sometimes</option>
          <option value="Often">Often</option>
        </FormField>

        <FormField label="Can stay without phone for 1 day?" name="stayWithoutPhone" value={formData.stayWithoutPhone} onChange={handleChange}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Maybe">Maybe</option>
        </FormField>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight ml-0.5">
            Main Mobile Usage Purpose <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 gap-2 bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
            {[
              'Calls',
              'Social Media',
              'Entertainment',
              'Education',
              'Work',
              'Gaming',
              'Online Payments'
            ].map((option) => (
              <div
                key={option}
                onClick={() => handleUsageToggle(option)}
                className={cn(
                  "flex items-center gap-3 w-full p-2.5 rounded-xl border text-left transition-all duration-200 select-none cursor-pointer",
                  usagePurpose.includes(option)
                    ? "bg-primary/5 border-primary/45 shadow-xs" 
                    : "bg-white border-gray-200 hover:border-gray-300"
                )}
              >
                <input
                  type="checkbox"
                  checked={usagePurpose.includes(option)}
                  readOnly
                  className="w-4 h-4 accent-primary cursor-pointer rounded"
                />
                <span className={cn(
                  "text-xs font-semibold tracking-tight transition-colors",
                  usagePurpose.includes(option) ? "text-primary font-bold" : "text-gray-700"
                )}>
                  {option}
                </span>
              </div>
            ))}
          </div>
          {usagePurpose.length === 0 && (
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1 animate-pulse">
              * Please select at least one purpose
            </p>
          )}
        </div>

        <div className="pt-2">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? "Processing..." : "Analyze My Usage"}
          </button>
        </div>
      </form>
    </div>
  );
}

function InputFormField({ label, name, value, onChange, placeholder, required }: { label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; required?: boolean }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight ml-0.5">{label}</label>
      <input 
        type="text"
        name={name} 
        value={value} 
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs font-semibold outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400"
      />
    </div>
  );
}

function FormField({ label, name, value, onChange, children }: { label: string; name: string; value: string; onChange: (e: any) => void; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight ml-0.5">{label}</label>
      <select 
        name={name} 
        value={value} 
        onChange={onChange}
        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs font-semibold outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
      >
        {children}
      </select>
    </div>
  );
}

// --- Result Page ---

function ResultPage({ response, onBack }: { response: MobileResponse; onBack: () => void }) {
  const score = calculateWellbeingScore(response);

  // Dynamic wellness message
  const getWellnessMessage = (res: MobileResponse, sc: number) => {
    if (sc >= 80) {
      return "Outstanding! You have a high degree of control over your digital habits. By keeping your device use intentional, you protect your focus, sleep hygiene, and relationships beautifully.";
    } else if (sc >= 55) {
      let focusTip = "";
      if (res.useBeforeSleep === 'Always') {
        focusTip = "Reducing night-time scrolling is the single most impactful adjustment you can make right now.";
      } else if (res.checkAfterWaking === 'Always') {
        focusTip = "Starting your morning with 15 minutes of screen-free focus will transform your mental clarity.";
      } else if (res.feelsAddicted === 'Yes') {
        focusTip = "Engaging in brief offline sessions or structured detox intervals will reset your digital cravings.";
      } else {
        focusTip = "Establishing hands-free family time zones will significantly elevate your interpersonal presence.";
      }
      return `You have good awareness about your mobile habits, but ${focusTip.toLowerCase()} can further improve your wellbeing.`;
    } else {
      return "Your smartphone behavior indicates strong dependency patterns. Taking regular structured digital detox periods, setting hard limits on social feeds, and declaring the sleeping zone strictly device-free will help restore cognitive energy and real-world connection.";
    }
  };

  const wellnessMessage = getWellnessMessage(response, score);

  // Build individual cards list
  interface AnalysisCard {
    title: string;
    message: string;
    tips?: string[];
    colorClass: string;
    icon: React.ReactNode;
  }

  const cards: AnalysisCard[] = [];

  // 1. Daily Usage Card
  if (response.dailyUsage === 'More than 6 hours') {
    cards.push({
      title: "Excessive Screen Time Detected",
      message: "You are spending very high time on mobile usage daily. Long screen exposure may affect productivity, eye health, sleep quality, and concentration.",
      tips: ["Take regular screen breaks", "Use app timers", "Reduce unnecessary scrolling"],
      colorClass: "bg-gradient-to-br from-red-50 to-rose-100/90 border border-red-200/60 text-red-955",
      icon: <Clock className="w-5 h-5 text-red-600" />
    });
  } else if (response.dailyUsage === '3–6 hours') {
    cards.push({
      title: "Moderate Screen Usage",
      message: "Your screen time is moderate, but maintaining balance is important.",
      tips: ["Monitor active daily usage", "Establish tech-free hours", "Stay aware of prolonged scrolling"],
      colorClass: "bg-gradient-to-br from-amber-50 to-orange-100/90 border border-orange-200/60 text-orange-955",
      icon: <Clock className="w-5 h-5 text-orange-600" />
    });
  } else {
    cards.push({
      title: "Healthy Screen Usage",
      message: "Your screen usage appears balanced and controlled.",
      tips: ["Keep up the good digital hygiene", "Keep screen time for learning or communication"],
      colorClass: "bg-gradient-to-br from-emerald-50 to-green-150 border border-emerald-200/70 text-emerald-955",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />
    });
  }

  // 2. Night-Time Usage Card
  if (response.useBeforeSleep === 'Always') {
    cards.push({
      title: "Night-Time Mobile Dependency",
      message: "Using phones before sleep may reduce sleep quality and increase stress.",
      tips: ["Stop mobile usage 30 minutes before sleep", "Enable night mode", "Reduce brightness"],
      colorClass: "bg-gradient-to-br from-indigo-50 to-blue-100 border border-blue-200/60 text-blue-955",
      icon: <Moon className="w-5 h-5 text-indigo-600" />
    });
  } else if (response.useBeforeSleep === 'Sometimes') {
    cards.push({
      title: "Occasional Night-Time Usage",
      message: "You occasionally use your phone before sleeping. Try reducing usage for better sleep.",
      tips: ["Charge phone away from the bed", "Avoid high-stimulation content before sleep"],
      colorClass: "bg-gradient-to-br from-purple-50 to-indigo-100 border border-indigo-200/60 text-indigo-955",
      icon: <Moon className="w-5 h-5 text-purple-600" />
    });
  }

  // 3. Wake-Up Phone Check Card
  if (response.checkAfterWaking === 'Always') {
    cards.push({
      title: "Morning Phone Checking Habit",
      message: "Checking phones immediately after waking may increase stress and distraction.",
      tips: ["Avoid notifications early morning", "Start day without screen exposure", "Establish a morning offline routine"],
      colorClass: "bg-gradient-to-br from-pink-50 to-rose-100 border border-pink-200/60 text-pink-955",
      icon: <Smartphone className="w-5 h-5 text-pink-600" />
    });
  }

  // 4. Addiction Analysis Card
  if (response.feelsAddicted === 'Yes') {
    cards.push({
      title: "High Addiction Behaviour Detected",
      message: "You may be emotionally dependent on smartphone usage.",
      tips: ["Reduce social media usage", "Avoid endless scrolling", "Practice digital detox"],
      colorClass: "bg-gradient-to-br from-red-50 to-rose-100/90 border border-red-200/60 text-red-955",
      icon: <AlertCircle className="w-5 h-5 text-red-600" />
    });
  } else if (response.feelsAddicted === 'Maybe') {
    cards.push({
      title: "Possible Dependency Signs",
      message: "You show potential signs of smartphone dependency.",
      tips: ["Set active usage limits", "Explore offline hobbies", "Keep screen time intentional"],
      colorClass: "bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200/60 text-amber-955",
      icon: <AlertCircle className="w-5 h-5 text-amber-500" />
    });
  }

  // 5. Family Interaction Card
  if (response.usageWhileEating === 'Often') {
    cards.push({
      title: "Reduced Family Interaction",
      message: "Frequent phone usage during family interaction may reduce communication quality.",
      tips: ["Keep phone away during meals", "Spend offline time with family", "Enforce hands-free dining zones"],
      colorClass: "bg-gradient-to-br from-fuchsia-50 to-purple-100 border border-purple-200/30 text-purple-955",
      icon: <Users className="w-5 h-5 text-fuchsia-600" />
    });
  }

  // 6. Social Media Card
  if (response.socialMediaUsage === 'Very Frequently') {
    cards.push({
      title: "High Social Media Usage",
      message: "Excessive social media usage may increase anxiety, distraction, and addiction patterns.",
      tips: ["Set limit for social media apps", "Mute non-essential notifications", "Focus on real-world connections"],
      colorClass: "bg-gradient-to-br from-violet-50 to-indigo-100 border border-indigo-200/30 text-indigo-955",
      icon: <BarChart2 className="w-5 h-5 text-indigo-600" />
    });
  }

  // 7. Positive Habits Card
  if (score >= 75) {
    cards.push({
      title: "Healthy Digital Behaviour",
      message: "You are maintaining balanced smartphone habits. Continue using technology mindfully.",
      tips: ["Promote mindful online patterns", "Share your habits with peer circles"],
      colorClass: "bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200/60 text-emerald-955",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />
    });
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="p-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 text-gray-400 hover:text-primary transition-colors cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold text-gray-800 tracking-tight">Screenlytix Result</h2>
        </div>
        <ScreenlytixLogo className="w-6 h-6 mr-1" />
      </header>

      <div className="flex-1 p-5 overflow-y-auto space-y-6 pb-24 scrollbar-hide">
        {/* Wellbeing Score SVG Section */}
        <div className="flex flex-col items-center justify-center p-5 bg-gradient-to-b from-gray-50/50 to-white rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">
            Digital Wellbeing Score
          </p>
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle 
                cx="56" cy="56" r="48" 
                className="stroke-gray-105 fill-none" 
                strokeWidth="8" 
              />
              <motion.circle 
                cx="56" cy="56" r="48" 
                className="stroke-primary fill-none" 
                strokeWidth="8" 
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 48}
                initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 48 * (1 - score / 100) }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-gray-900 leading-tight">{score}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">/ 100</span>
            </div>
          </div>
          <span className={cn(
            "mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider",
            score >= 80 ? "bg-green-100 text-green-600" :
            score >= 50 ? "bg-orange-100 text-orange-600" :
            "bg-red-100 text-red-600"
          )}>
            {score >= 80 ? "Excellent" : score >= 50 ? "Moderate" : "High Risk"}
          </span>
        </div>

        {/* Dynamic Wellness Message */}
        <div className="bg-secondary/40 border border-primary/10 p-4 rounded-2xl">
          <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1 flex items-center gap-1.5 align-middle">
            <Info className="w-3.5 h-3.5 text-primary inline" />
            Your Personal Wellness Message
          </p>
          <p className="text-[11px] font-medium leading-relaxed text-gray-600">
            "{wellnessMessage}"
          </p>
        </div>

        {/* Personalized Behaviour Insights Header */}
        <div className="border-t border-gray-100 pt-3">
          <p className="text-xs font-black text-gray-800 uppercase tracking-widest mb-3">
            Personalized Behaviour Insights
          </p>
          
          <div className="space-y-4">
            {cards.map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className={cn("p-4 rounded-2xl flex flex-col shadow-sm border", card.colorClass)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-white/70 rounded-lg shadow-sm">{card.icon}</div>
                  <h4 className="font-bold text-xs uppercase tracking-tight">{card.title}</h4>
                </div>
                <p className="text-[10px] font-medium leading-normal opacity-90 mb-2">
                  {card.message}
                </p>
                {card.tips && card.tips.length > 0 && (
                  <div className="bg-white/40 p-2.5 rounded-xl border border-white/40">
                    <p className="text-[9px] font-bold uppercase tracking-wider opacity-90 mb-1">
                      Guidance Tips:
                    </p>
                    <ul className="space-y-1">
                      {card.tips.map((tip, idx) => (
                        <li key={idx} className="flex gap-1.5 items-start text-[10px] font-medium leading-tight select-none">
                          <span className="text-primary">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button 
            onClick={onBack}
            className="w-full bg-gray-950 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm active:scale-95 transition-all shadow-md cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

function SuggestionItem({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="p-3 bg-gray-50 rounded-xl text-[10px] border-l-4 border-accent">
      <span className="font-bold block text-gray-800 mb-0.5">🌙 {title}</span>
      <p className="text-gray-500 font-medium">{detail}</p>
    </div>
  );
}

// --- Admin Page ---

function AdminPage({ responses, onBack, isLoading }: { responses: MobileResponse[]; onBack: () => void; isLoading: boolean }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Healthy' | 'Moderate' | 'High Risk'>('All');

  const formatTime = (ts: any) => {
    if (!ts) return 'N/A';
    let date: Date;
    if (ts.toDate && typeof ts.toDate === 'function') {
      date = ts.toDate();
    } else if (ts.seconds) {
      date = new Date(ts.seconds * 1000);
    } else if (ts instanceof Date) {
      date = ts;
    } else {
      date = new Date(ts);
    }
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredResponses = useMemo(() => {
    return responses.filter(r => {
      // 1. Status Filter
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      
      // 2. Search Text
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        !searchTerm ||
        (r.name?.toLowerCase() || '').includes(searchLower) ||
        (r.occupation?.toLowerCase() || '').includes(searchLower) ||
        (r.ageGroup?.toLowerCase() || '').includes(searchLower) ||
        (r.gender?.toLowerCase() || '').includes(searchLower) ||
        (r.dailyUsage?.toLowerCase() || '').includes(searchLower) ||
        (r.mainPurpose?.toLowerCase() || '').includes(searchLower) ||
        (r.socialMediaUsage?.toLowerCase() || '').includes(searchLower) ||
        (r.status?.toLowerCase() || '').includes(searchLower);

      return matchesStatus && matchesSearch;
    });
  }, [responses, searchTerm, statusFilter]);
  
  const stats = useMemo(() => {
    if (responses.length === 0) return null;

    const total = responses.length;
    const beforeSleep = responses.filter(r => r.useBeforeSleep === 'Always').length;
    const feelsAddicted = responses.filter(r => r.feelsAddicted === 'Yes').length;
    
    // Usage Distribution
    const usageMap = responses.reduce((acc, r) => {
      acc[r.dailyUsage] = (acc[r.dailyUsage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const usageChartData = Object.entries(usageMap).map(([name, value]) => ({ name, value }));

    // Occupation vs Status
    const occupationMap = responses.reduce((acc, r) => {
      if (!acc[r.occupation]) {
        acc[r.occupation] = { Healthy: 0, Moderate: 0, 'High Risk': 0 };
      }
      const rawStatus = (r.status as string) || '';
      const isHighRisk = rawStatus === 'High Risk' || rawStatus === 'High Risk Usage' || rawStatus.toLowerCase().includes('high risk');
      const isModerate = rawStatus === 'Moderate' || rawStatus.toLowerCase().includes('moderate');
      const isHealthy = rawStatus === 'Healthy' || rawStatus.toLowerCase().includes('healthy');
      
      if (isHighRisk) {
        acc[r.occupation]['High Risk']++;
      } else if (isModerate) {
        acc[r.occupation]['Moderate']++;
      } else if (isHealthy) {
        acc[r.occupation]['Healthy']++;
      } else {
        acc[r.occupation]['Healthy']++;
      }
      return acc;
    }, {} as Record<string, Record<string, number>>);

    const occupationChartData = Object.entries(occupationMap).map(([name, statusMap]) => {
      const healthy = statusMap['Healthy'] || 0;
      const moderate = statusMap['Moderate'] || 0;
      const highRisk = statusMap['High Risk'] || 0;
      const totalOcc = healthy + moderate + highRisk;
      const percentage = totalOcc > 0 ? Math.round((highRisk / totalOcc) * 100) : 0;
      return {
        name,
        healthy,
        moderate,
        highRisk,
        percentage,
        total: totalOcc
      };
    });

    // Most common purpose
    const purposeMap = responses.reduce((acc, r) => {
      const purposes = r.usagePurpose || (r.mainPurpose ? r.mainPurpose.split(', ') : []);
      purposes.forEach((p) => {
        const cleanP = p.trim() === 'Watching Videos' ? 'Entertainment' : p.trim();
        if (cleanP) {
          acc[cleanP] = (acc[cleanP] || 0) + 1;
        }
      });
      return acc;
    }, {} as Record<string, number>);
    const mostCommonPurpose = Object.entries(purposeMap).sort((a,b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return {
      total,
      beforeSleepPct: Math.round((beforeSleep / total) * 100),
      feelsAddictedPct: Math.round((feelsAddicted / total) * 100),
      mostCommonPurpose,
      usageChartData,
      occupationChartData
    };
  }, [responses]);

  return (
    <div className="bg-white rounded-[32px] border border-gray-200 shadow-xl overflow-hidden flex flex-col h-[800px] max-h-[90vh]">
      <header className="p-8 border-b border-gray-100 flex items-center justify-between bg-white">
        <div>
          <div className="flex items-center gap-4 mb-1">
            <button onClick={onBack} className="p-1.5 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-primary transition-all cursor-pointer">
              <ChevronLeft className="w-5.5 h-5.5" />
            </button>
            <div className="flex items-center gap-2">
              <ScreenlytixLogo className="w-8 h-8 animate-pulse" />
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Screenlytix Admin Dashboard</h1>
            </div>
          </div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest pl-11">Smart Mobile Usage Analytics & Wellbeing Platform</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-green-50 text-green-600 text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest border border-green-100 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Live Data
          </div>
        </div>
      </header>

      <div className="flex-1 p-8 overflow-y-auto scrollbar-hide space-y-8">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center py-24 space-y-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
              <ScreenlytixLogo className="w-16 h-16 animate-pulse" />
            </div>
            <p className="text-primary font-black uppercase tracking-widest text-[10px] animate-pulse">
              Screenlytix is fetching analytics data...
            </p>
          </div>
        ) : !stats ? (
          <div className="h-full flex flex-col items-center justify-center py-20 text-center opacity-50 space-y-4">
            <ScreenlytixLogo className="w-16 h-16 opacity-30 mx-auto" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No metrics recorded yet</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <StatBox label="Total Responses" value={stats.total.toLocaleString()} accent="primary" />
               <StatBox label="Avg Usage" value={stats.mostCommonPurpose} accent="primary" isText />
               <StatBox label="Night Users" value={`${stats.beforeSleepPct}%`} accent="orange" />
               <StatBox label="Addiction Feel" value={`${stats.feelsAddictedPct}%`} accent="rose" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-100 p-6 rounded-3xl">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                  <div className="w-1 h-3 bg-primary rounded-full" />
                  Usage Purpose Distribution
                </h3>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.usageChartData.slice(0, 5)}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                      <YAxis hide />
                      <Bar dataKey="value" fill="#5B4BFF" radius={[6, 6, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-gray-100 p-6 rounded-3xl flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-3 bg-rose-500 rounded-full" />
                    Risk level by Occupation
                  </h3>
                  <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1 scrollbar-hide py-1">
                    {stats.occupationChartData.map((item) => (
                      <div key={item.name} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                          <span className="truncate tracking-tight">{item.name}</span>
                          <span className="text-rose-600 ml-2 whitespace-nowrap font-black">
                            {item.percentage}% <span className="text-[10.5px] text-gray-400 font-bold dropdown-no-click">({item.highRisk}/{item.total})</span>
                          </span>
                        </div>
                        <div className="w-full bg-gray-100/80 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-gradient-to-r from-red-500 via-rose-500 to-rose-600 h-full rounded-full shadow-xs"
                          />
                        </div>
                      </div>
                    ))}
                    {stats.occupationChartData.length === 0 && (
                      <p className="text-xs text-gray-400 font-medium text-center py-8">No responses to analyze yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-[2rem]">
               <p className="text-xs text-blue-800 font-bold flex items-center gap-2">
                 <span className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-[10px] text-white">i</span>
                 Community Insight: {stats.total > 5 ? "Survey data indicates a growing trend in night-time usage among younger demographics." : "Aggregating community data to generate specific wellbeing insights."}
               </p>
            </div>

            {/* --- Survey Response Table Features --- */}
            <div className="bg-white border border-gray-100 p-6 rounded-[2rem] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-800 flex items-center gap-2">
                    <div className="w-1.5 h-3 bg-primary rounded-full" />
                    Survey Response Database
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                    Google Sheets Style Response Entries ({filteredResponses.length} of {responses.length} rows)
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Search input field */}
                  <div className="relative min-w-[180px] flex-1 sm:flex-initial">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      id="inp-search-responses"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search items..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8.5 pr-8 py-2 text-xs font-bold outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-400 text-gray-700"
                    />
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-bold w-5 h-5 flex items-center justify-center rounded-full bg-gray-100/50"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {/* Wellbeing filter selection */}
                  <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1">
                    <span className="text-[9px] text-gray-400 font-black uppercase select-none pr-1">Filter:</span>
                    <select
                      id="sel-status-filter"
                      value={statusFilter}
                      onChange={(e: any) => setStatusFilter(e.target.value)}
                      className="bg-transparent border-none outline-none text-[11px] font-black text-gray-700 py-1 cursor-pointer pr-1"
                    >
                      <option value="All">All statuses</option>
                      <option value="Healthy">Healthy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="High Risk">High Risk</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Modern Responsive Google Sheets Style Table Frame */}
              <div className="overflow-x-auto border border-gray-100 rounded-2xl bg-white shadow-xs max-h-[360px] overflow-y-auto scrollbar-thin">
                <table className="w-full text-[11px] text-left border-collapse min-w-[2000px]">
                  <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                    <tr className="text-gray-400 text-[10px] uppercase font-black tracking-wider">
                      <th className="px-3 py-3 w-12 text-center border-r border-gray-100 select-none bg-gray-50">row</th>
                      <th className="px-4 py-3 font-black text-left">Name</th>
                      <th className="px-4 py-3 font-black text-left">Submission Time</th>
                      <th className="px-4 py-3 font-black text-left">Age Group</th>
                      <th className="px-4 py-3 font-black text-left">Gender</th>
                      <th className="px-4 py-3 font-black text-left">Occupation</th>
                      <th className="px-4 py-3 font-black text-left">Daily Mobile Usage</th>
                      <th className="px-4 py-3 font-black text-left">Usage Purpose</th>
                      <th className="px-4 py-3 font-black text-left">Social Media Usage</th>
                      <th className="px-4 py-3 font-black text-left">Checks Phone After Waking</th>
                      <th className="px-4 py-3 font-black text-left">Uses Phone Before Sleep</th>
                      <th className="px-4 py-3 font-black text-left">Feels Addicted</th>
                      <th className="px-4 py-3 font-black text-left">Can Stay Without Phone</th>
                      <th className="px-4 py-3 font-black text-left">Uses Phone During Family Time</th>
                      <th className="px-4 py-3 font-black text-center bg-gray-50/50">Wellbeing Status</th>
                      <th className="px-4 py-3 font-black text-center sticky right-0 bg-gray-50 z-20 border-l border-gray-100">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResponses.length === 0 ? (
                      <tr>
                        <td colSpan={16} className="text-center py-16 text-gray-400 font-bold uppercase tracking-widest text-xs bg-gray-50/25">
                          No matching survey response records found
                        </td>
                      </tr>
                    ) : (
                      filteredResponses.map((res, index) => {
                        const scoreVal = res.digitalWellbeingScore ?? calculateWellbeingScore(res);
                        return (
                          <tr 
                            key={res.id || `response-row-${index}`}
                            className="hover:bg-primary/5 transition-colors duration-150 border-b border-gray-100 odd:bg-white even:bg-gray-50/35 font-medium text-gray-700"
                          >
                            <td className="px-3 py-2.5 text-center text-gray-300 font-bold bg-gray-50/55 border-r border-gray-100 text-[10px] select-none">{index + 1}</td>
                            <td className="px-4 py-2.5 font-bold text-gray-800">
                              {res.name || 'Anonymous'}
                            </td>
                            <td className="px-4 py-2.5 text-gray-400 font-bold whitespace-nowrap">
                              <span className="flex items-center gap-1.5 align-middle">
                                <Calendar className="w-3.5 h-3.5 text-gray-300" />
                                {formatTime(res.createdAt)}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-gray-900 font-bold">{res.ageGroup}</td>
                            <td className="px-4 py-2.5">{res.gender}</td>
                            <td className="px-4 py-2.5 text-gray-600 font-bold">{res.occupation}</td>
                            <td className="px-4 py-2.5 text-indigo-500 font-black">{res.dailyUsage}</td>
                            <td className="px-4 py-2.5 text-gray-800">{res.mainPurpose}</td>
                            <td className="px-4 py-2.5">{res.socialMediaUsage}</td>
                            <td className="px-4 py-2.5">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider",
                                res.checkAfterWaking === 'Always' ? "bg-red-50 text-red-600 border border-red-100" :
                                res.checkAfterWaking === 'Sometimes' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                                "bg-green-50 text-green-600 border border-green-100"
                              )}>
                                {res.checkAfterWaking}
                              </span>
                            </td>
                            <td className="px-4 py-2.5">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider",
                                res.useBeforeSleep === 'Always' ? "bg-red-50 text-red-600 border border-red-100" :
                                res.useBeforeSleep === 'Sometimes' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                                "bg-green-50 text-green-600 border border-green-100"
                              )}>
                                {res.useBeforeSleep}
                              </span>
                            </td>
                            <td className="px-4 py-2.5">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider",
                                res.feelsAddicted === 'Yes' ? "bg-red-50 text-red-600 border border-red-100" :
                                res.feelsAddicted === 'Maybe' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                                "bg-green-50 text-green-600 border border-green-100"
                              )}>
                                {res.feelsAddicted}
                              </span>
                            </td>
                            <td className="px-4 py-2.5">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider",
                                res.stayWithoutPhone === 'No' ? "bg-red-50 text-red-600 border border-red-100" :
                                res.stayWithoutPhone === 'Maybe' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                                "bg-green-50 text-green-600 border border-green-100"
                              )}>
                                {res.stayWithoutPhone}
                              </span>
                            </td>
                            <td className="px-4 py-2.5">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider",
                                res.usageWhileEating === 'Often' ? "bg-red-50 text-red-600 border border-red-100" :
                                res.usageWhileEating === 'Sometimes' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                                "bg-green-50 text-green-600 border border-green-100"
                              )}>
                                {res.usageWhileEating}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-center whitespace-nowrap bg-gray-50/25">
                              <span className={cn(
                                "px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                res.status === 'Healthy' ? "bg-green-50 text-green-700 border-green-100" :
                                res.status === 'Moderate' ? "bg-amber-50 text-amber-700 border-amber-100" :
                                "bg-rose-50 text-rose-700 border-rose-100"
                              )}>
                                {res.status}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-center sticky right-0 bg-white group-hover:bg-primary/5 border-l border-gray-100 shadow-[2px_0_12px_rgba(0,0,0,0.02)] z-10">
                              <span className={cn(
                                "inline-block w-8 py-0.5 rounded text-[11px] font-black text-center border shadow-xs",
                                scoreVal >= 80 ? "bg-green-50 text-green-700 border-green-100" :
                                scoreVal >= 55 ? "bg-amber-50 text-amber-700 border-amber-100" :
                                "bg-rose-50 text-rose-700 border-rose-100"
                              )}>
                                {scoreVal}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <footer className="pt-8 pb-4 border-t border-gray-100 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <ScreenlytixLogo className="w-5 h-5 opacity-60 animate-pulse" />
                <span>Screenlytix Intelligent Wellbeing Platform</span>
              </div>
              <p>© 2026 Screenlytix Inc. All rights reserved.</p>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

function StatBox({ label, value, accent, isText }: { label: string; value: string | number; accent: 'primary' | 'orange' | 'rose'; isText?: boolean }) {
  const colors = {
    primary: 'text-primary',
    orange: 'text-orange-500',
    rose: 'text-rose-500'
  };

  return (
    <div className="bg-gray-50/50 border border-gray-100 p-4 rounded-2xl flex flex-col justify-center">
      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1 leading-tight">{label}</p>
      <p className={cn("font-black tracking-tight leading-tight", isText ? "text-sm" : "text-2xl", colors[accent])}>
        {value}
      </p>
    </div>
  );
}
