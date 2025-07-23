import { LoginForm } from "@/components/login-form";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";


export default function LoginPage() {
  return (
    <>
      <Header />
    <div className="flex w-full h-full justify-center items-center">
      <div className="max-w-sm">
        <LoginForm />
      </div>
      </div>
      <Footer />
      </>
  );
}
