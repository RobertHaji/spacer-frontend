import {
  Github, Instagram, Facebook, Youtube, Twitter, Linkedin, ChevronDown
} from "lucide-react";
import { useState } from "react";

const counties = [
  "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta",
  "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru",
  "Tharaka-Nithi", "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua",
  "Nyeri", "Kirinyaga", "Murang’a", "Kiambu", "Turkana", "West Pokot",
  "Samburu", "Trans Nzoia", "Uasin Gishu", "Elgeyo-Marakwet", "Nandi",
  "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado", "Kericho", "Bomet",
  "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu", "Homa Bay",
  "Migori", "Kisii", "Nyamira", "Nairobi"
];

export default function Footer() {
  const [showCounties, setShowCounties] = useState(false);

  return (
    <footer className="bg-[#31194D] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 text-sm">
        <div className="font-bold text-lg">Spacer</div>

        <div>
          <h3 className="font-semibold">Company</h3>
          <ul className="space-y-1">
            <li><a href="#">Contact us</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>

        {/* Counties Dropdown */}
        <div>
          <h3
            className="font-semibold flex items-center cursor-pointer select-none"
            onClick={() => setShowCounties(prev => !prev)}
          >
            Counties
            <ChevronDown className={`ml-1 transition-transform ${showCounties ? "rotate-180" : ""}`} size={16} />
          </h3>
          {showCounties && (
            <ul className="mt-2 max-h-40 overflow-y-auto space-y-1">
              {counties.map((county, index) => (
                <li key={index}>
                  <a href="#" className="hover:underline">{county}</a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="font-semibold">Support</h3>
          <ul className="space-y-1">
            <li><a href="#">Help</a></li>
            <li><a href="#">Privacy and terms</a></li>
          </ul>
        </div>

        {/* Social Icons with Links */}
        <div className="flex flex-wrap gap-4 justify-start md:justify-end items-center">
          <a href="https://github.com/RobertHaji/spacer-frontend" target="_blank" rel="noopener noreferrer"><Github /></a>
          <a href="https://www.instagram.com/event.spaces/?igsh=MXc5NnR2OHdoc3kx#" target="_blank" rel="noopener noreferrer"><Instagram /></a>
          <a href="https://www.facebook.com/groups/160560687631591/" target="_blank" rel="noopener noreferrer"><Facebook /></a>
          <a href="https://youtu.be/_F5OfKbmQLo" target="_blank" rel="noopener noreferrer"><Youtube /></a>
          <a href="https://x.com/EventSpacesSA?t=uSdcWB2fIhz8F6KkcDAqNA&s=08" target="_blank" rel="noopener noreferrer"><Twitter /></a>
          <a href="https://www.linkedin.com/company/rialto-events/" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 text-center text-xs text-white/60">
        &copy; Spacer
      </div>
    </footer>
  );
}
