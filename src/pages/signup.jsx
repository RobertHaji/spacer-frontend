import { SignUpForm } from "@/components/signup-form";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import AdminHeader from "@/components/adminsHeader";

export default function SignUpPage() {
  return (
    <>
      <AdminHeader />
      <div className="flex w-full h-full justify-center items-center">
        <div className="max-w-sm">
          <SignUpForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
