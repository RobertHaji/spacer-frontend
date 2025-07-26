import { LoginForm } from "@/components/login-form";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import AdminHeader from "@/components/adminsHeader";

export default function LoginPage() {
  return (
    <>
      <AdminHeader />
      <div className="flex w-full h-full justify-center items-center">
        <div className="max-w-sm">
          <LoginForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
