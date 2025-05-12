import RegisterForm from "@/components/forms/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="max-w-[420px] w-full flex flex-col justify-center z-10">
      <h4 className="text-2xl md:text-4xl font-semibold mb-10">Register</h4>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
