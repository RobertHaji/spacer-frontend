import { SignUpForm } from "@/components/signup-form";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function SignUpPage() {
  return (
    <>
      <Header />
    <div className="flex w-full h-full justify-center items-center">
      <div className="max-w-sm">
        <SignUpForm />
      </div>
      </div>
     <Footer />
    </>
  );
}
