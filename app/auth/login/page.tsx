import LoginForm from "@/components/forms/LoginForm";
import LinksWrapper from "@/components/auth/LinksWrapper";
import ProvidersWrapper from "@/components/auth/ProvidersWrapper";

const LoginPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <h4 className="text-3xl lg:text-4xl font-semibold mb-4 md:mb-6 lg:mb-10">
        Welcome! <br />
        Login to continue
      </h4>

      <LoginForm />
      <ProvidersWrapper />
      <LinksWrapper />
    </div>
  );
};

export default LoginPage;
