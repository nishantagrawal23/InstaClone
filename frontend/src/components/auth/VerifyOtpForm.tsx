import { useForm } from "react-hook-form";
import { useVerifyMutation } from "../../services/authApi";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

type VerifyOtpFormData = {
  email: string;
  otp: string;
};

const VerifyOtpForm = () => {
    const [verify, { isLoading }] = useVerifyMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpFormData>();
    const navigate=useNavigate()
  
 
  const onSubmit = async (data: VerifyOtpFormData) => {
    try {
      const res = await verify(data).unwrap();
      console.log("OTP Verified:", res);

      // Navigate to login page here
      navigate("/login")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <h2 className="mb-6 text-center text-2xl font-bold">
        Verify OTP
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
          })}
          error={errors.email?.message}
        />

        <Input
          label="OTP"
          type="text"
          placeholder="Enter 6-digit OTP"
          {...register("otp", {
            required: "OTP is required",
            pattern: {
              value: /^[0-9]{6}$/,
              message: "OTP must be 6 digits",
            },
          })}
          error={errors.otp?.message}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>
    </Card>
  );
};

export default VerifyOtpForm;