import { useState } from "react";
import Input from "./Input";

type PasswordInputProps = {
  label: string;
  placeholder?: string;
  error?: string;
};

const PasswordInput = ({
  label,
  placeholder,
  error,
  ...props
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        label={label}
       
        type={show ? "text" : "password"}
        placeholder={placeholder}
        error={error}
        {...props}
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-10 text-sm text-gray-500"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default PasswordInput;