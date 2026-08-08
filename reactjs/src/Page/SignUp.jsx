import { GalleryVerticalEnd } from "lucide-react";
import SignUpForm from "../Component/SignUp-form";
import logo from "../assets/logo.png";


export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium text-black">
            <img src={logo} alt="Logo" className="h-14 w-auto" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-gray-100 lg:block">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"
          alt="Shopping"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
