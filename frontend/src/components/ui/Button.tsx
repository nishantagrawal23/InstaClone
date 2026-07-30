import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button = ({
  children,
  loading = false,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`w-full rounded-lg bg-[#A98E87] py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;