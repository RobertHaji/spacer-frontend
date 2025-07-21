import {
  Github, Instagram, Facebook, Youtube, Twitter, Linkedin, ChevronDown
} from "lucide-react";
import { useState } from "react";

// Custom TikTok SVG Icon
const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <title>TikTok</title>
    <path d="M12.735 0c.332 2.212 1.712 3.803 3.903 4.037v3.381c-1.404-.15-2.66-.713-3.81-1.63v7.61c0 4.633-3.967 5.88-6.356 3.97-1.27-1.01-1.674-2.875-1.141-4.364.45-1.244 1.643-2.122 3.055-2.235.645-.05 1.213.04 1.763.31V7.825c1.165-.127 2.34-.118 3.586.138v9.16c-.067 1.31-.392 2.442-1.011 3.414-1.818 2.69-5.69 3.108-8.084 1.135-2.375-1.96-2.723-5.613-.774-8.056 1.244-1.613 3.17-2.543 5.283-2.337V0h2.636z"/>
  </svg>
);


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
            <ChevronDown
              className={`ml-1 transition-transform ${showCounties ? "rotate-180" : ""}`}
              size={16}
            />
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
        {/* Support */}
        <div>
          <h3 className="font-semibold mb-1">Support</h3>
        <div>
          <h3 className="font-semibold">Support</h3>
          <ul className="space-y-1">
            <li><a href="#">Help</a></li>
            <li><a href="#">Privacy and terms</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap gap-4 justify-start md:justify-end items-center">
          <a href="https://github.com/RobertHaji/spacer-frontend" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition"><Github /></a>
          <a href="https://www.instagram.com/event.spaces/?igsh=MXc5NnR2OHdoc3kx#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition"><Instagram /></a>
          <a href="https://www.facebook.com/groups/160560687631591/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition"><Facebook /></a>
          <a href="https://youtu.be/_F5OfKbmQLo" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition"><Youtube /></a>
          <a href="https://x.com/EventSpacesSA?t=uSdcWB2fIhz8F6KkcDAqNA&s=08" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition"><Twitter /></a>
          <a href="https://www.linkedin.com/company/rialto-events/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition"><Linkedin /></a>
          <a href="https://www.tiktok.com/search?lang=en&q=event%20spaces%20kenya&t=1753094257792" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition"><TikTokIcon /></a>
        </div>
      </div>

      {/* Bottom Bar
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-xs text-white/60">
        <span>&copy; Spacer</span>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="https://github.com/RobertHaji/spacer-frontend" target="_blank" rel="noopener noreferrer"><Github size={16} /></a>
          <a href="https://www.instagram.com/event.spaces/?igsh=MXc5NnR2OHdoc3kx#" target="_blank" rel="noopener noreferrer"><Instagram size={16} /></a>
          <a href="https://www.facebook.com/groups/160560687631591/" target="_blank" rel="noopener noreferrer"><Facebook size={16} /></a>
          <a href="https://youtu.be/_F5OfKbmQLo" target="_blank" rel="noopener noreferrer"><Youtube size={16} /></a>
          <a href="https://x.com/EventSpacesSA?t=uSdcWB2fIhz8F6KkcDAqNA&s=08" target="_blank" rel="noopener noreferrer"><Twitter size={16} /></a>
          <a href="https://www.linkedin.com/company/rialto-events/" target="_blank" rel="noopener noreferrer"><Linkedin size={16} /></a>
          <a href="https://www.tiktok.com/@yourpage" target="_blank" rel="noopener noreferrer"><TikTokIcon /></a>
        </div> */}
      {/* </div> */}
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
