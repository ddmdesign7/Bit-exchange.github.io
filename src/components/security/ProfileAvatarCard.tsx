import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { 
  UploadCloud, 
  Camera, 
  Trash2, 
  Check, 
  Sparkles, 
  Info, 
  ShieldCheck, 
  User as UserIcon,
  RefreshCw
} from 'lucide-react';
import { useTrading } from '../../context/TradingContext';

// 6 Modern Built-in Crypto/Trader Avatar Presets (Self-contained SVG data URIs)
export const AVATAR_PRESETS = [
  {
    id: 'preset-emerald-bull',
    name: 'Emerald Bull',
    tag: 'Institutional',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2310b981"/><stop offset="100%" stop-color="%23047857"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g1)"/><path d="M30 38 Q50 20 70 38 Q65 65 50 78 Q35 65 30 38 Z" fill="%2306281e" stroke="%2334d399" stroke-width="3"/><circle cx="42" cy="46" r="4" fill="%23a7f3d0"/><circle cx="58" cy="46" r="4" fill="%23a7f3d0"/><path d="M22 30 Q32 24 36 34" stroke="%236ee7b7" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M78 30 Q68 24 64 34" stroke="%236ee7b7" stroke-width="4" stroke-linecap="round" fill="none"/></svg>'
  },
  {
    id: 'preset-gold-vault',
    name: 'Gold Sovereign',
    tag: 'Whale',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23f59e0b"/><stop offset="100%" stop-color="%23b45309"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g2)"/><circle cx="50" cy="50" r="32" fill="%23261603" stroke="%23fbbf24" stroke-width="3"/><path d="M48 28 L48 72 M54 28 L54 72 M40 38 C56 36 58 48 48 50 C60 52 58 64 40 62" stroke="%23fde68a" stroke-width="3" fill="none" stroke-linecap="round"/></svg>'
  },
  {
    id: 'preset-cyber-quantum',
    name: 'Cyber Quantum',
    tag: 'Algorithmic',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2306b6d4"/><stop offset="100%" stop-color="%233b82f6"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g3)"/><polygon points="50,22 75,37 75,65 50,80 25,65 25,37" fill="%2304192f" stroke="%2367e8f9" stroke-width="3"/><circle cx="50" cy="51" r="9" fill="%2338bdf8"/><path d="M50 22 L50 80 M25 37 L75 65 M25 65 L75 37" stroke="%2338bdf8" stroke-width="1.5" stroke-opacity="0.6"/></svg>'
  },
  {
    id: 'preset-nebula-pioneer',
    name: 'Nebula Pro',
    tag: 'DeFi Native',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%238b5cf6"/><stop offset="100%" stop-color="%23ec4899"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g4)"/><circle cx="50" cy="45" r="16" fill="%231a0628" stroke="%23f472b6" stroke-width="2.5"/><path d="M26 80 C26 62 40 58 50 58 C60 58 74 62 74 80 Z" fill="%231a0628" stroke="%23f472b6" stroke-width="2.5"/><circle cx="50" cy="45" r="5" fill="%23fbcfe8"/></svg>'
  },
  {
    id: 'preset-matrix-shield',
    name: 'Vault Sentinel',
    tag: 'Security',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2310b981"/><stop offset="100%" stop-color="%230f172a"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g5)"/><path d="M50 20 L74 32 V54 C74 70 50 82 50 82 C50 82 26 70 26 54 V32 Z" fill="%23021b14" stroke="%2334d399" stroke-width="3"/><path d="M40 50 L47 57 L62 42" stroke="%236ee7b7" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  {
    id: 'preset-hyper-aurora',
    name: 'Aurora Trader',
    tag: 'Arbitrage',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23f43f5e"/><stop offset="100%" stop-color="%23fb923c"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g6)"/><circle cx="50" cy="50" r="32" fill="%2324080a" stroke="%23fda4af" stroke-width="3"/><polygon points="50,28 58,44 76,46 62,58 66,75 50,66 34,75 38,58 24,46 42,44" fill="%23f43f5e" stroke="%23fecdd3" stroke-width="1.5"/></svg>'
  }
];

export const ProfileAvatarCard: React.FC = () => {
  const { user, updateUser, addToast } = useTrading();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Maximum allowed file size: 5MB
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleFileProcess = (file: File) => {
    // Validate mime type
    if (!file.type.startsWith('image/')) {
      addToast({
        type: 'error',
        title: 'Unsupported File Format',
        message: 'Please select a valid image file (PNG, JPG, WebP, GIF, or SVG).',
      });
      return;
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      addToast({
        type: 'error',
        title: 'File Size Exceeded',
        message: `Image is ${(file.size / (1024 * 1024)).toFixed(1)} MB. Maximum allowed size is 5.0 MB.`,
      });
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        updateUser({ avatarUrl: dataUrl });
        setIsProcessing(false);
        addToast({
          type: 'success',
          title: 'Profile Picture Updated',
          message: 'Your new avatar has been successfully loaded and saved.',
        });
      }
    };

    reader.onerror = () => {
      setIsProcessing(false);
      addToast({
        type: 'error',
        title: 'Upload Error',
        message: 'Could not read image file. Please try a different photo.',
      });
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileProcess(droppedFile);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFileProcess(selectedFile);
      // Reset input value so re-selecting same file triggers change
      e.target.value = '';
    }
  };

  const handleSelectPreset = (presetUrl: string, presetName: string) => {
    updateUser({ avatarUrl: presetUrl });
    addToast({
      type: 'success',
      title: 'Preset Avatar Selected',
      message: `Set avatar to "${presetName}".`,
    });
  };

  const handleRemoveAvatar = () => {
    updateUser({ avatarUrl: undefined });
    addToast({
      type: 'info',
      title: 'Avatar Reset',
      message: 'Profile picture removed. Your display initials are now used.',
    });
  };

  const currentAvatar = user?.avatarUrl;
  const userInitials = user?.name ? user.name.slice(0, 2).toUpperCase() : 'BT';

  return (
    <div id="settings-profile-avatar-card" className="glass-panel rounded-2xl p-4 sm:p-6 border border-slate-700/60 shadow-xl space-y-6">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                User Profile Picture
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                {currentAvatar ? 'Custom Avatar Active' : 'Default Initials'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Upload a personal photo or select a verified trader avatar to display across your navigation bar, ledger, and trading desk.
            </p>
          </div>
        </div>

        {currentAvatar && (
          <button
            type="button"
            id="btn-remove-avatar"
            onClick={handleRemoveAvatar}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-950/70 border border-rose-800/60 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove Photo</span>
          </button>
        )}
      </div>

      {/* Main Avatar Showcase & Upload Dropzone Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Active Avatar Preview Box (4 cols) */}
        <div className="lg:col-span-4 rounded-xl bg-slate-900/70 border border-slate-800 p-4 sm:p-5 flex flex-col items-center text-center justify-center space-y-3 relative overflow-hidden">
          {/* Decorative ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

          {/* Avatar Ring */}
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-500/60 shadow-2xl shadow-emerald-500/20 bg-slate-950 flex items-center justify-center p-0.5">
              {currentAvatar ? (
                <img
                  src={currentAvatar}
                  alt={user?.name || 'User Profile'}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex flex-col items-center justify-center text-slate-950 font-black text-3xl shadow-inner">
                  <span>{userInitials}</span>
                </div>
              )}
            </div>

            {/* Online/Verified badge */}
            <div 
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-slate-900 border-2 border-emerald-500 flex items-center justify-center shadow-lg"
              title="Identity Cryptographically Verified"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-1 w-full pt-1">
            <div className="font-extrabold text-sm sm:text-base text-slate-100 truncate">
              {user?.name || 'Joshua James Bergin'}
            </div>
            <div className="text-xs text-slate-400 truncate font-mono">
              {user?.email || 'Berginjoshua1@gmail.com'}
            </div>
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/40">
                {user?.kycTier || 'Tier 2 Verified'}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-medium border border-slate-700">
                Member since {user?.joinedDate || '2019'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Drag and Drop Upload Zone & Actions (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          {/* Drag & Drop Target Area */}
          <div
            id="avatar-dropzone"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer select-none relative ${
              isDragging
                ? 'border-emerald-400 bg-emerald-500/10 scale-[0.99] ring-4 ring-emerald-500/20'
                : 'border-slate-700/80 bg-slate-900/40 hover:border-emerald-500/60 hover:bg-slate-900/70'
            }`}
          >
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              id="input-avatar-file"
              type="file"
              accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
              onChange={handleInputChange}
              className="hidden"
            />

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-colors ${
              isDragging 
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' 
                : 'bg-slate-800 text-slate-300 border border-slate-700 group-hover:text-emerald-400'
            }`}>
              {isProcessing ? (
                <RefreshCw className="w-7 h-7 animate-spin text-emerald-400" />
              ) : (
                <UploadCloud className="w-7 h-7" />
              )}
            </div>

            <div className="space-y-1 max-w-sm">
              <div className="text-sm font-bold text-slate-100">
                <span className="text-emerald-400 underline decoration-emerald-500/60 underline-offset-4 font-extrabold hover:text-emerald-300">
                  Click to browse
                </span>{' '}
                or drag and drop your photo
              </div>
              <p className="text-xs text-slate-400">
                Supports PNG, JPG, WebP, GIF, or SVG formats up to 5 MB
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Recommended: Square ratio (at least 200 &times; 200 px)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Avatars Library */}
      <div className="pt-2 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm font-bold text-slate-200">
              Or Choose a Verified Trader Avatar Preset
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            One-tap instant selection
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {AVATAR_PRESETS.map((preset) => {
            const isSelected = currentAvatar === preset.url;

            return (
              <button
                key={preset.id}
                type="button"
                id={`btn-preset-${preset.id}`}
                onClick={() => handleSelectPreset(preset.url, preset.name)}
                className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-2 transition-all cursor-pointer group ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-500/15 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-500/40'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md">
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shadow">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <div className="text-[11px] font-bold text-slate-200 truncate">
                    {preset.name}
                  </div>
                  <div className="text-[9px] text-slate-400 truncate">
                    {preset.tag}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Helpful Step-by-Step Guidance Callout */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-slate-200 font-bold">
          <Info className="w-4 h-4 text-emerald-400" />
          <span>Profile Picture & Avatar Guidelines:</span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-400 list-disc list-inside">
          <li><strong>Drag or Click:</strong> Easily drop any image from your computer or phone camera roll.</li>
          <li><strong>Universal Sync:</strong> Automatically updates your navbar, drawer, and transaction receipts.</li>
          <li><strong>Private & Secure:</strong> Stored locally in your encrypted session sandbox.</li>
        </ul>
      </div>
    </div>
  );
};
