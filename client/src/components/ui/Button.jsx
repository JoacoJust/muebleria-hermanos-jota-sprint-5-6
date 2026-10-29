import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-brand-siena text-brand-alabastro hover:bg-[#8a4526] hover:shadow-md disabled:bg-brand-borde disabled:text-brand-muted disabled:hover:shadow-none",
  outline:
    "border-2 border-brand-siena text-brand-siena bg-transparent hover:bg-brand-siena hover:text-brand-alabastro hover:shadow-md",
  ghost: "text-brand-siena hover:bg-brand-borde/40 hover:shadow-sm",
};

function buttonClassName(variant, className) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-sans text-sm font-medium uppercase tracking-[0.08em] transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-siena disabled:cursor-not-allowed motion-reduce:transition-none",
    variants[variant],
    className,
  );
}

export function Button({
  children,
  type = "button",
  variant = "primary",
  className,
  disabled,
  to,
  ...props
}) {
  const classes = buttonClassName(variant, className);

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  );
}
