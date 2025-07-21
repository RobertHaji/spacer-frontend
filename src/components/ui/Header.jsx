import { User } from "lucide-react"; 

export default function Header() {
  return (
    <header className="bg-[#31194D] text-white flex items-center justify-between p-4">
      <h1 className="text-xl font-bold">Spacer</h1>
      <User className="w-6 h-6" />
    </header>
  );
}
