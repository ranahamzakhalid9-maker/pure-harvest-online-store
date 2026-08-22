interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textColor?: 'dark' | 'light';
  className?: string;
}

export const LOGO_IMG_SRC = 'https://i.postimg.cc/BQS3Gy3z/066d9740-be7f-486a-8f88-c6d7b2b17d4f.png';

export const BrandLogo = ({
  size = 'md',
  showText = true,
  textColor = 'dark',
  className = ''
}: BrandLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14 sm:w-16 sm:h-16'
  };

  const titleClasses = {
    sm: 'text-[13px]',
    md: 'text-[15px] sm:text-[17px]',
    lg: 'text-xl sm:text-2xl'
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-white shadow-sm border border-[#e8e2d4] p-0.5 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
        <img
          src={LOGO_IMG_SRC}
          alt="Pure Harvest Organic Logo"
          className="w-full h-full object-contain rounded-full"
          loading="eager"
          onError={(e) => {
            // Fallback to local if CDN has issues
            const target = e.currentTarget;
            if (target.src !== window.location.origin + '/logo.png') {
              target.src = '/logo.png';
            }
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className={`font-extrabold tracking-tight leading-none ${titleClasses[size]} ${textColor === 'light' ? 'text-white' : 'text-[#162915]'}`}>
            PURE HARVEST
          </span>
          <span className={`text-[9px] sm:text-[10px] tracking-[0.22em] font-bold uppercase mt-0.5 ${textColor === 'light' ? 'text-[#86bf76]' : 'text-[#4d7f3c]'}`}>
            ORGANIC
          </span>
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
