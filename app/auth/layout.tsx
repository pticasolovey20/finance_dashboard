import { ReactNode } from "react";

interface IAuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: IAuthLayoutProps) => {
  return (
    <main className="min-h-screen h-full flex items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;
