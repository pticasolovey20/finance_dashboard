import LoginForm from "@/components/forms/LoginForm";
import ProvidersWrapper from "@/components/forms/ProvidersWrapper";
import ActionsWrapper from "@/components/forms/ActionsWrapper";

const LoginPage = () => {
  return (
    <div className="max-w-[420px] w-full flex flex-col justify-center z-10">
      <h4 className="text-3xl sm:text-4xl font-semibold mb-10">
        Welcome! <br />
        Login to continue
      </h4>

      <LoginForm />
      <ProvidersWrapper />
      <ActionsWrapper />
    </div>
  );
};

export default LoginPage;
