import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { InstitutionalAuthCard } from './InstitutionalAuthCard';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Printer, 
  Download, 
  FileText, 
  CreditCard, 
  CheckCircle2, 
  Lock, 
  Zap, 
  ExternalLink,
  Copy,
  Check,
  QrCode,
  Shield,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const AuthCardView: React.FC = () => {
  const { user, cashBalanceUSD, setCurrentPage, addToast } = useTrading();
  const [activeTab, setActiveTab] = useState<'card' | 'certificate' | 'specs'>('card');
  const [copiedLink, setCopiedLink] = useState(false);

  const cardHolder = user?.name || 'Joshua James Bergin';
  const cardEmail = user?.email || 'Berginjoshua1@gmail.com';
  const balance = cashBalanceUSD || 47986.0;
  const clearanceFee = 5960.0;
  const authHash = '0x71C84092bF589A389Afb60f1A953b018599Ac02e';
  const complianceNode = '0x003bB95cE0010Fa8e9F7d81884f506355387cA1A';

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#/auth-card`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    addToast({
      type: 'info',
      title: 'Link Copied',
      message: 'Direct link to Institutional AuthCard copied to clipboard.',
      duration: 2500,
    });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 w-full animate-in fade-in duration-300">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-2xl p-4 sm:p-6 border border-slate-700/60 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage('dashboard')}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                Institutional AuthCard
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                Tier 2 Verified
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Official Trading Clearance Pass & Digital Identity Credential for {cardHolder}
            </p>
          </div>
        </div>

        {/* Action button header */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copiedLink ? 'Copied' : 'Share Link'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-100 transition-all cursor-pointer shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print PDF</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage('withdrawal-review')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md shadow-emerald-500/20"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Top First Review</span>
          </button>
        </div>
      </div>

      {/* Top Review Immediate Callout */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border-2 border-amber-500/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shrink-0">
            <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-sans">
                Top First Review Immediately
              </span>
              <span className="text-xs text-slate-300 font-bold font-mono">
                $47,986.00 Balance Clearance
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              $5,960.00 has to be paid before the available balance can be withdrawn, to meet with the investment.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setCurrentPage('withdrawal-review')}
          className="shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer"
        >
          <span>Open Review Route</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('card')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'card'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Interactive 3D AuthCard</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('certificate')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'certificate'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Official Certificate (AuthCard.pdf)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('specs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'specs'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Compliance & Security Specs</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE 3D AUTHCARD */}
      {activeTab === 'card' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 flex flex-col items-center glass-panel rounded-2xl p-6 sm:p-8 border border-slate-700/60 shadow-xl">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Digital Card Preview (Click to Flip)</span>
            </h3>
            
            <InstitutionalAuthCard />
          </div>

          <div className="lg:col-span-5 space-y-4">
            {/* Account Credential Overview Card */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 shadow-lg space-y-3.5">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Verified Account Profile</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Cardholder:</span>
                  <span className="font-bold text-slate-200">{cardHolder}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Verified Email:</span>
                  <span className="font-mono text-slate-200">{cardEmail}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Clearance Status:</span>
                  <span className="font-semibold text-amber-400">Tier 2 Clearance Review</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Available Balance:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Clearance Fee Required:</span>
                  <span className="font-mono font-bold text-amber-400">
                    ${clearanceFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Security Encryption:</span>
                  <span className="font-mono text-emerald-400">AES-256 GCM / HSM Tier 3</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 shadow-lg space-y-2.5">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Export & Clearance Actions
              </h4>
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-cyan-400" />
                  <span>Print Official AuthCard Certificate</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">PDF Format</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage('withdrawal-review')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-xs font-bold text-amber-300 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Go to Top First Review Immediately</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OFFICIAL CERTIFICATE VIEW */}
      {activeTab === 'certificate' && (
        <div className="max-w-3xl mx-auto glass-panel rounded-2xl p-6 sm:p-10 border border-slate-700/60 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-slate-950 text-sm">
                  B
                </div>
                <span className="font-black text-base tracking-tight text-white">
                  BIT<span className="text-emerald-400">TRADE</span>.NET
                </span>
              </div>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-1">
                Institutional Risk & Compliance Clearinghouse
              </p>
            </div>

            <div className="text-right text-xs font-mono">
              <div className="text-emerald-400 font-bold">CERTIFICATE: BTN-8849-2026</div>
              <div className="text-slate-400">ISSUED: OCTOBER 2026</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center py-2">
              <h2 className="text-xl font-black text-slate-100 uppercase tracking-wide">
                Institutional Trading Authorization Certificate
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Certified clearance protocol for account verification and fund settlement
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 font-medium">Account Beneficiary:</span>
                <p className="text-sm font-extrabold text-slate-100">{cardHolder}</p>
                <p className="font-mono text-slate-400">{cardEmail}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Compliance Verification Level:</span>
                <p className="text-sm font-extrabold text-emerald-400">Tier 2 Institutional Clearance</p>
                <p className="text-slate-400">Biometric & Identity Attestation Complete</p>
              </div>
            </div>

            {/* Investment Rule Box */}
            <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/40 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-amber-300">
                <span className="uppercase tracking-wider">Institutional Settlement Rule</span>
                <span className="font-mono text-sm">$5,960.00 Required Fee</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Notice: <strong>$5,960.00 has to be paid before the available balance can be withdrawn, to meet with the investment.</strong> Upon receipt and node confirmation of the compliance fee at node <code className="text-amber-300 font-mono bg-amber-950/60 px-1 py-0.5 rounded">{complianceNode}</code>, the entire balance of <strong className="text-emerald-300 font-mono">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong> will be instantaneously unlocked and disbursed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono bg-slate-900/40 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 block text-[10px]">SETTLEMENT WALLET ADDRESS</span>
                <span className="text-slate-200 break-all">{authHash}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">COMPLIANCE CLEARING NODE</span>
                <span className="text-slate-200 break-all">{complianceNode}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div>
              <div className="font-serif italic text-sm text-slate-300 font-bold">Joshua J. Bergin</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Account Holder Electronic Signature</div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-400" />
                <span>Print Document</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('withdrawal-review')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-colors cursor-pointer shadow-md shadow-emerald-500/20"
              >
                <span>Continue Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COMPLIANCE SPECS */}
      {activeTab === 'specs' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 shadow-lg space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-200">Cryptographic Attestation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every AuthCard is tied to an ECDSA secp256k1 institutional signature key registered on the Bit Trade Net settlement network.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 shadow-lg space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-200">KYC Tier 2 Verification</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Identity verification for Joshua James Bergin has passed institutional AML, PEP screening, and biometric face validation.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 shadow-lg space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-200">Settlement Protocol</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              $5,960.00 investment clearance fee requirement ensures compliance with institutional reserve liquidity provisions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
