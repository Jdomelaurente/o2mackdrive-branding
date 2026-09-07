import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type LinkButtonProps = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

const variants: Record<ButtonVariant, string> = {
  primary: "bg-white text-slate-950 shadow-lg shadow-black/10 hover:bg-slate-100",
  secondary: "border border-slate-400/35 bg-slate-200/8 text-slate-100 hover:border-orange-300/60 hover:bg-orange-400/12",
  ghost: "border border-white/12 bg-black/20 text-white hover:bg-white/10",
};

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `inline-flex min-h-11 cursor-pointer items-center justify-center px-4 py-2.5 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:py-3 ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link className={classes} href={props.href} target={props.target} rel={props.rel} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as NativeButtonProps;

  return (
    <button className={classes} type={buttonProps.type} onClick={buttonProps.onClick} disabled={buttonProps.disabled}>
      {children}
    </button>
  );
}
