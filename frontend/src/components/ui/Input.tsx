import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const Input = ({label,error,className = "",...props}: InputProps) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input {...props}
        className={`w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#A98E87] ${className}`}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;