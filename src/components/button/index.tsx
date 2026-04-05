import type { ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type ButtonVariant = 'primary' | 'secondary' | 'banner' | 'banner-green' | 'outline';
type ButtonSize = 'small' | 'large';
type ButtonTone = 'green' | 'light' | 'dark';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;
  className?: string;
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';

  /** backend controlled */
  buttonColor?: string;
  buttonBg?: string;
}

const primaryToneStyles: Record<ButtonTone, string> = {
  green: 'bg-primary text-white hover:bg-primary-dark py-[14px]',
  light: 'bg-white text-primary hover:bg-slate-100',
  dark: 'bg-text-main text-white hover:bg-black',
};

const secondaryToneStyles: Record<ButtonTone, string> = {
  green: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white',
  light: 'border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary',
  dark: 'border-2 border-text-main text-text-main bg-transparent hover:bg-text-main hover:text-white',
};

const sizeStyles: Record<ButtonSize, string> = {
  small: 'py-[12px] px-[22px] text-[14px] leading-[1]',
  large: 'py-[20px] px-[64px] text-[16px] leading-[1] hover:px-[69px]',
};

const bannerStyles: Record<'banner' | 'banner-green', string> = {
  banner:
    'bg-white text-primary hover:bg-slate-100 rounded-[60px] border-0 uppercase font-semibold min-w-[clamp(280px,18.96vw,364px)] h-[clamp(50px,3.59vw,69px)] pt-[clamp(12px,1.04vw,20px)] pr-[64px] pb-[clamp(14px,1.15vw,22px)] pl-[64px] text-[clamp(14px,1.15vw,22px)] leading-[100%] tracking-[0%] gap-2.5',
  'banner-green':
    'bg-primary text-white hover:bg-primary-dark rounded-[60px] border-0 uppercase font-semibold min-w-[clamp(280px,18.96vw,364px)] h-[clamp(50px,3.59vw,69px)] pt-[clamp(12px,1.04vw,20px)] pr-[64px] pb-[clamp(14px,1.15vw,22px)] pl-[64px] text-[clamp(14px,1.15vw,22px)] leading-[100%] tracking-[0%] gap-2.5',
};

const outlineStyle =
  'bg-transparent text-white border-2 border-white rounded-[60px] font-semibold hover:bg-white hover:text-primary';

function Button({
  children,
  title,
  variant = 'primary',
  size = 'small',
  tone = 'green',
  className = '',
  type = 'button',
  isLoading = false,
  icon,
  iconPosition = 'start',
  buttonColor,
  buttonBg,
  style,
  ...props
}: ButtonProps) {
  let variantClasses = '';

  if (variant === 'banner' || variant === 'banner-green') {
    const hoverExpandClass = size === 'large' ? ' hover:px-[69px]' : '';
    variantClasses = `inline-flex items-center justify-center cursor-pointer whitespace-nowrap transition-all duration-200 ${bannerStyles[variant]}${hoverExpandClass}`;
  } else if (variant === 'outline') {
    variantClasses = `inline-flex items-center justify-center cursor-pointer whitespace-nowrap transition-colors px-[22px] py-[12px] ${outlineStyle}`;
  } else {
    const baseStyles =
      'inline-flex items-center justify-center cursor-pointer whitespace-nowrap rounded-[999px] font-semibold tracking-wide transition-all duration-200';

    const sizeClass = sizeStyles[size];
    const toneClass = variant === 'primary' ? primaryToneStyles[tone] : secondaryToneStyles[tone];

    variantClasses = `${baseStyles} ${sizeClass} ${toneClass}`;
  }

  const isDisabled = isLoading || props.disabled;

  const combinedClassName = `${variantClasses} ${
    isDisabled ? 'opacity-60 cursor-default' : ''
  } ${className}`.trim();

  /** backend style override */
  const dynamicStyle: CSSProperties = {
    ...(buttonColor && { color: buttonColor }),
    ...(buttonBg && { backgroundColor: buttonBg }),
    ...style,
  };

  return (
    <button
      type={type}
      className={combinedClassName}
      style={dynamicStyle}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" aria-hidden />
      ) : (
        <>
          {icon && iconPosition === 'start' ? <span className="mr-2 inline-flex items-center">{icon}</span> : null}
          {title ?? children}
          {icon && iconPosition === 'end' ? <span className="ml-2 inline-flex items-center">{icon}</span> : null}
        </>
      )}
    </button>
  );
}

export default Button;
