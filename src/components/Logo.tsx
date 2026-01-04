import logoImage from "figma:asset/6e2e8dd8fcb58456312b2b694ed1673ae42ff429.png";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  return (
    <div className="flex items-center gap-3">
      <img 
        src={logoImage}
        alt="NutriAdapt Logo"
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <span className={`${textSizeClasses[size]} font-semibold text-[#1A1A1A] tracking-tight`}>
          NutriAdapt
        </span>
      )}
    </div>
  );
}