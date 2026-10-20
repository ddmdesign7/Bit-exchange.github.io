import React, { useState, useEffect } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Logo } from '../layout/Logo';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  User as UserIcon, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Fingerprint, 
  Key, 
  RefreshCw, 
  BadgeCheck, 
  FileText, 
  CreditCard,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { AuthCardModal } from './AuthCardModal';

interface AuthCardProps {
  initialMode?: 'login' | 'register' | 'forgot-password';
  onSuccess?: () => void;
}

export const AuthCard: React.FC<AuthCardProps> = ({ initialMode = 'login', onSuccess }) => {
  const { login, register, setCurrentPage, addToast } = useTrading();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot-password'>(initialMode);
  const [authStep, setAuthStep] = useState<'credentials' | 'two-factor'>('credentials');
  const [twoFactorCode, setTwoFactorCode] = useState(['7', '4', '9', '2', '0', '1']);
  const [otpTimer, setOtpTimer] = useState(28);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setAuthStep('credentials');
  }, [initialMode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (authStep === 'two-factor') {
      interval = setInterval(() => {
        setOtpTimer((prev) => (prev > 1 ? prev - 1 : 30));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [authStep]);

  const switchMode = (newMode: 'login' | 'register' | 'forgot-password') => {
    setMode(newMode);
    setAuthStep('credentials');
    setCurrentPage(newMode);
  };
  
  // Form fields
  const [email, setEmail] = useState('user@eample.com');
  const [password, setPassword] = useState('Thatguy12@');
  const [name, setName] = useState('Joshua James Bergin');
  const [confirmPassword, setConfirmPassword] = useState('Thatguy12@');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [passkeyScanning, setPasskeyScanning] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        if (!email.trim() || !password.trim()) {
          addToast({
            type: 'error',
            title: 'Validation Error',
            message: 'Please provide both email address and password.',
          });
          setIsLoading(false);
          return;
        }

        // If on credentials step and logging in, offer 2FA verification step
        if (authStep === 'credentials' && (email.toLowerCase().includes('user@eample') || email.toLowerCase().includes('bergin') || email.toLowerCase().includes('example'))) {
          await new Promise((r) => setTimeout(r, 400));
          setIsLoading(false);
          setAuthStep('two-factor');
          addToast({
            type: 'info',
            title: '2FA Required',
            message: 'Institutional Account: Please verify your 6-digit TOTP security code.',
            duration: 3500,
          });
          return;
        }

        await new Promise((r) => setTimeout(r, 500));
        await login(email, password);
        onSuccess?.();
      } else if (mode === 'register') {
        if (!name.trim() || !email.trim() || !password.trim()) {
          addToast({
            type: 'error',
            title: 'Validation Error',
            message: 'Please fill in all required registration fields.',
          });
          setIsLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          addToast({
            type: 'error',
            title: 'Password Mismatch',
            message: 'The confirmed password does not match.',
          });
          setIsLoading(false);
          return;
        }
        if (!agreeTerms) {
          addToast({
            type: 'warning',
            title: 'Terms Required',
            message: 'You must accept the terms of service and risk disclosure.',
          });
          setIsLoading(false);
          return;
        }
        await new Promise((r) => setTimeout(r, 600));
        await register(name, email, password);
        onSuccess?.();
      } else if (mode === 'forgot-password') {
        if (!email.trim() || !email.includes('@')) {
          addToast({
            type: 'error',
            title: 'Invalid Email',
            message: 'Please provide a valid registered email address.',
          });
          setIsLoading(false);
          return;
        }
        await new Promise((r) => setTimeout(r, 700));
        setForgotSent(true);
        addToast({
          type: 'success',
          title: 'Reset Link Sent',
          message: `Instructions to reset your credentials were sent to ${email}.`,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete2FA = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    await login(email, password);
    addToast({
      type: 'success',
      title: 'Institutional Clearance Granted',
      message: '2FA Verified. Welcome back, Joshua James Bergin.',
      duration: 3000,
    });
    onSuccess?.();
    setIsLoading(false);
  };

  const handlePasskeyLogin = async () => {
    setPasskeyScanning(true);
    await new Promise((r) => setTimeout(r, 800));
    setPasskeyScanning(false);
    await login('user@eample.com', 'Thatguy12@');
    addToast({
      type: 'success',
      title: 'Passkey Verified',
      message: 'FIDO2 WebAuthn credential verified for Joshua James Bergin.',
      duration: 3000,
    });
    onSuccess?.();
  };

  const handleDemoFill = () => {
    if (mode === 'login') {
      setEmail('user@eample.com');
      setPassword('Thatguy12@');
    } else if (mode === 'register') {
      setName('Joshua James Bergin');
      setEmail('user@eample.com');
      setPassword('Thatguy12@');
      setConfirmPassword('Thatguy12@');
    } else {
      setEmail('user@eample.com');
    }
    addToast({
      type: 'info',
      title: 'Credentials Loaded',
      message: 'Institutional account credentials populated for user@eample.com.',
      duration: 2000,
    });
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const updated = [...twoFactorCode];
    updated[index] = val;
    setTwoFactorCode(updated);

    // Auto advance focus
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    await login('google.user@bittrade.net');
    onSuccess?.();
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] w-full flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-hidden">
      {/* Background Cyber Glow & Financial Grid Elements */}
      <div className="absolute inset-0 bg-trading-grid opacity-30 pointer-events-none" />
      
      {/* Radial soft emerald glow */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Authentication Card */}
      <div className="relative w-full max-w-[460px] z-10 my-4">
        <div 
          className="glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-700/60 relative overflow-hidden backdrop-blur-2xl"
          style={{
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(16, 185, 129, 0.08)'
          }}
        >
          {/* Top subtle highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80" />

          {/* Logo / Header */}
          <div className="flex flex-col items-center text-center mb-5">
            <Logo size="lg" showTagline={true} className="mb-3" />
            
            {authStep === 'two-factor' ? (
              <>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400 mb-2">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Institutional Clearance Check</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                  Two-Factor Security
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Enter the 6-digit TOTP code from your authenticator app
                </p>
              </>
            ) : (
              <>
                {mode === 'login' && (
                  <>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                      Institutional Sign In
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                      Access verified trading portfolio & clearance services
                    </p>
                  </>
                )}
                {mode === 'register' && (
                  <>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                      Create Account
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                      Join the next generation of institutional crypto trading
                    </p>
                  </>
                )}
                {mode === 'forgot-password' && (
                  <>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                      Reset Password
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                      Enter your verified email to receive recovery instructions
                    </p>
                  </>
                )}
              </>
            )}
          </div>

          {/* Quick Demo Fill & AuthCard Button */}
          {authStep === 'credentials' && (
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-500/20 rounded-xl px-3 py-2 text-xs text-emerald-300">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">Joshua James Bergin ($47,986.00)</span>
                </div>
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="shrink-0 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Fill Demo
                </button>
              </div>

              {/* Direct AuthCard inspection button */}
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-300 hover:text-slate-100 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Preview Institutional AuthCard (Clearance ID)</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded">
                  PDF / View
                </span>
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 2: TWO-FACTOR AUTHENTICATION (TOTP / PASSKEY)       */}
          {/* ======================================================== */}
          {authStep === 'two-factor' ? (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
                  <span className="text-slate-500">Account:</span>
                  <span className="font-bold text-emerald-400">Joshua James Bergin</span>
                </div>

                {/* 6 Digit Input Boxes */}
                <div className="flex items-center justify-center gap-2 sm:gap-2.5 pt-1">
                  {twoFactorCode.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-10 sm:w-11 h-12 text-center text-lg font-mono font-bold rounded-xl bg-slate-800/90 border border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 text-white outline-none transition-all"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 px-1">
                  <span className="flex items-center gap-1 font-mono">
                    <RefreshCw className="w-3 h-3 text-emerald-400 animate-spin" />
                    <span>New code in {otpTimer}s</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setTwoFactorCode(['7', '4', '9', '2', '0', '1'])}
                    className="text-emerald-400 hover:underline font-semibold cursor-pointer"
                  >
                    Demo: 749 201
                  </button>
                </div>
              </div>

              {/* Submit 2FA Button */}
              <button
                type="button"
                onClick={handleComplete2FA}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Verify Code & Enter Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Biometric / Passkey Alternative */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handlePasskeyLogin}
                  disabled={passkeyScanning}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
                >
                  <Fingerprint className={`w-4 h-4 text-emerald-400 ${passkeyScanning ? 'animate-bounce' : ''}`} />
                  <span>{passkeyScanning ? 'Scanning Touch ID / Face ID...' : 'Sign in with Passkey / Biometrics'}</span>
                </button>
              </div>

              {/* Back to credentials */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setAuthStep('credentials')}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Password Login</span>
                </button>
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* STEP 1: STANDARD CREDENTIALS FORM                        */
            /* ======================================================== */
            <>
              {forgotSent && mode === 'forgot-password' ? (
                <div className="text-center py-4 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-semibold text-slate-100">
                    Check Your Inbox
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    We've sent a secure one-time password recovery link to <strong className="text-slate-200">{email}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotSent(false);
                      switchMode('login');
                    }}
                    className="text-xs text-emerald-400 hover:underline font-semibold"
                  >
                    Return to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Name field (register mode) */}
                  {mode === 'register' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Legal Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <UserIcon className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Joshua James Bergin"
                          required
                          className="glass-input w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm transition-all placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Verified Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="user@eample.com"
                        required
                        className="glass-input w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm transition-all placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  {mode !== 'forgot-password' && (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-slate-300">
                          Password
                        </label>
                        {mode === 'login' && (
                          <button
                            type="button"
                            onClick={() => switchMode('forgot-password')}
                            className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          required
                          className="glass-input w-full pl-10 pr-10 py-2.5 rounded-xl text-sm transition-all placeholder:text-slate-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Confirm Password (register mode) */}
                  {mode === 'register' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••••••"
                          required
                          className="glass-input w-full pl-10 pr-10 py-2.5 rounded-xl text-sm transition-all placeholder:text-slate-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Checkboxes */}
                  {mode === 'login' && (
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-800/80 text-emerald-500 focus:ring-emerald-500/30 focus:ring-offset-0 cursor-pointer"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-300 cursor-pointer select-none">
                        Remember me on this secure device
                      </label>
                    </div>
                  )}

                  {mode === 'register' && (
                    <div className="flex items-start">
                      <input
                        id="terms-agree"
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-slate-700 bg-slate-800/80 text-emerald-500 focus:ring-emerald-500/30 focus:ring-offset-0 cursor-pointer"
                      />
                      <label htmlFor="terms-agree" className="ml-2 block text-xs text-slate-400 leading-tight select-none">
                        I acknowledge that Bit Trade Net is an institutional simulation and agree to the Terms and Risk Policies.
                      </label>
                    </div>
                  )}

                  {/* Primary Submit Button */}
                  <button
                    type="submit"
                    id="btn-auth-submit"
                    disabled={isLoading}
                    className="w-full relative group overflow-hidden py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>
                          {mode === 'login' && 'Continue to 2FA / Sign In'}
                          {mode === 'register' && 'Create Free Account'}
                          {mode === 'forgot-password' && 'Send Recovery Instructions'}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* OR Divider & Passkey Option */}
              {mode === 'login' && !forgotSent && (
                <>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-[#0b1220] px-3 text-slate-500 font-semibold tracking-wider">
                        Quick Passkey Access
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handlePasskeyLogin}
                      disabled={passkeyScanning}
                      className="py-2.5 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/70 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.99] cursor-pointer"
                    >
                      <Fingerprint className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{passkeyScanning ? 'Scanning...' : 'Passkey (FIDO2)'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                      className="py-2.5 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/70 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.99] cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z" />
                        <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
                        <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.6 7.2C.6 9.2 0 11.5 0 14s.6 4.8 1.6 6.8l3.7-2.9c-.3-.8-.5-1.7-.5-3.2z" />
                        <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.1L1.6 16.1C3.5 19.9 7.4 23 12 23z" />
                      </svg>
                      <span>Google</span>
                    </button>
                  </div>
                </>
              )}

              {/* Mode Switch Prompts */}
              <div className="mt-5 text-center text-xs text-slate-400">
                {mode === 'login' && (
                  <p>
                    Don’t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('register')}
                      className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
                    >
                      Create Account
                    </button>
                  </p>
                )}
                {mode === 'register' && (
                  <p>
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
                    >
                      Sign In to Account
                    </button>
                  </p>
                )}
                {mode === 'forgot-password' && !forgotSent && (
                  <p>
                    Remembered your password?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
                    >
                      Back to Sign In
                    </button>
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer info & Encryption Badges */}
        <div className="mt-4 text-center space-y-1">
          <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 font-medium">
            <span>AES-256 GCM</span>
            <span>&bull;</span>
            <span>FIPS 140-2 Level 3 HSM</span>
            <span>&bull;</span>
            <span>SOC 2 Type II</span>
          </div>
          <p className="text-[10px] text-slate-600">
            Bit Trade Net Institutional Sandbox &bull; Secure Clearance Protocol
          </p>
        </div>
      </div>

      {/* AuthCard Modal */}
      <AuthCardModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
};
