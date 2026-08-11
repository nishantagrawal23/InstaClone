import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../services/authApi";

import Card from "../ui/Card";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import Divider from "../ui/Divider";
import { Link, useNavigate } from "react-router-dom";

type RegisterFormData = {
  name: string;
  username: string;
  email: string;
  password: string;
  // confirmPassword: string;
};

const RegisterForm = () => {
const [registerUser, { isLoading }] = useRegisterMutation();
  const {

    register,
    handleSubmit,
  } = useForm<RegisterFormData>();
  
  const navigate =useNavigate()
  const onSubmit = async (dto: RegisterFormData) => {
  try {
     await registerUser(dto).unwrap();
    navigate("/verify-otp")
    


  } catch (err) {
    console.log(err);
  }
};
  
  return (

    <Card>
      <h1 className="mb-2 text-center text-3xl font-bold">
        Create Account
      </h1>

      <p className="mb-8 text-center text-sm text-gray-500">
        Join our community today.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          label="name"
          placeholder="John Doe"
          {...register("name")}
        />

        <Input
          label="Username"
          placeholder="john_doe"
          {...register("username")}
        />

        <Input
          label="Email"
          type="email"
          placeholder="john@gmail.com"
          {...register("email")}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter password"
           {...register("password")}
        />

        {/* <PasswordInput
          label="Confirm Password"
          placeholder="Confirm password"
           {...register("confirmPassword")}
        /> */}

        <Button type="submit"  >
          {isLoading?"registering...": "register"}

        </Button>
      </form>

      <Divider />

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
      </p>
    </Card>
  );
};

export default RegisterForm;