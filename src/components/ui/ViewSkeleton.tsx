import React from 'react';

interface ViewSkeletonProps {
  type?: string;
}

export const ViewSkeleton: React.FC<ViewSkeletonProps> = ({ type = 'dashboard' }) => {
  return (
    <div className="space-y-4 sm:space-y-6 w-full animate-pulse py-2" role="status" aria-label="Loading view">
      {/* Top Banner / Breadcrumb Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
        <div className="space-y-2.5">
          <div className="h-6 sm:h-8 w-48 sm:w-64 bg-slate-800/80 rounded-lg" />
          <div className="h-3.5 w-72 sm:w-96 bg-slate-800/50 rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-28 bg-slate-800/70 rounded-xl" />
          <div className="h-9 w-28 bg-slate-800/70 rounded-xl" />
        </div>
      </div>

      {/* Primary Metric Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-800/70 space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-3.5 w-20 bg-slate-800/60 rounded" />
              <div className="w-8 h-8 rounded-lg bg-slate-800/60" />
            </div>
            <div className="h-7 w-32 bg-slate-800/90 rounded-md" />
            <div className="h-3 w-24 bg-slate-800/40 rounded" />
          </div>
        ))}
      </div>

      {/* Main Content Area (Chart or Table) */}
      {type === 'transactions' ? (
        <div className="rounded-2xl bg-slate-900/50 border border-slate-800/70 p-4 sm:p-6 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
            <div className="h-4 w-32 bg-slate-800/80 rounded" />
            <div className="h-4 w-20 bg-slate-800/50 rounded" />
          </div>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-800/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800/70" />
                <div className="space-y-1.5">
                  <div className="h-3.5 w-28 bg-slate-800/80 rounded" />
                  <div className="h-2.5 w-16 bg-slate-800/50 rounded" />
                </div>
              </div>
              <div className="space-y-1.5 text-right">
                <div className="h-3.5 w-24 bg-slate-800/80 rounded ml-auto" />
                <div className="h-2.5 w-12 bg-slate-800/40 rounded ml-auto" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 rounded-2xl bg-slate-900/50 border border-slate-800/70 p-4 sm:p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-4 w-36 bg-slate-800/80 rounded" />
              <div className="h-6 w-24 bg-slate-800/50 rounded-lg" />
            </div>
            <div className="h-64 sm:h-72 w-full bg-slate-800/40 rounded-xl flex items-end p-4 gap-2">
              {[40, 65, 50, 75, 60, 85, 70, 95, 80, 60, 90, 100].map((h, idx) => (
                <div 
                  key={idx} 
                  className="flex-1 bg-slate-800/60 rounded-t"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-900/50 border border-slate-800/70 p-4 sm:p-6 space-y-4">
            <div className="h-4 w-28 bg-slate-800/80 rounded" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-800/40 border border-slate-800/50 space-y-2">
                  <div className="h-3 w-20 bg-slate-800/80 rounded" />
                  <div className="h-4 w-32 bg-slate-800/60 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
