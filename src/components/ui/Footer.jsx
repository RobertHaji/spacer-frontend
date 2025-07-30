import {
  Github,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Custom TikTok SVG Icon
const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <title>TikTok</title>
    <path d="M12.735 0c.332 2.212 1.712 3.803 3.903 4.037v3.381c-1.404-.15-2.66-.713-3.81-1.63v7.61c0 4.633-3.967 5.88-6.356 3.97-1.27-1.01-1.674-2.875-1.141-4.364.45-1.244 1.643-2.122 3.055-2.235.645-.05 1.213.04 1.763.31V7.825c1.165-.127 2.34-.118 3.586.138v9.16c-.067 1.31-.392 2.442-1.011 3.414-1.818 2.69-5.69 3.108-8.084 1.135-2.375-1.96-2.723-5.613-.774-8.056 1.244-1.613 3.17-2.543 5.283-2.337V0h2.636z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#004D61] text-white py-4 px-2 text-xs">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Logo */}
        <div className="font-bold text-base">Spacer</div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="space-y-1 text-white/80">
            <li>
              <Link to="/ContactUs" className="hover:underline">Contact Us</Link>
            </li>
            <li>
              <Link to="/AboutUs" className="hover:underline">About</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-white/80">
            <li>
              <Link to="/Help" className="hover:underline">Help</Link>
            </li>
            <li>
              <Link to="/Privacy" className="hover:underline">Privacy</Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap gap-6 justify-start md:justify-end items-center">
          <a href="https://github.com/RobertHaji/spacer-frontend" target="_blank" rel="noopener noreferrer"><Github size={16} /></a>
          <a href="https://www.instagram.com/event.spaces/?igsh=MXc5NnR2OHdoc3kx#" target="_blank" rel="noopener noreferrer"><Instagram size={16} /></a>
          <a href="https://www.facebook.com/groups/160560687631591/" target="_blank" rel="noopener noreferrer"><Facebook size={16} /></a>
          <a href="https://youtu.be/_F5OfKbmQLo" target="_blank" rel="noopener noreferrer"><Youtube size={16} /></a>
          <a href="https://x.com/EventSpacesSA?t=uSdcWB2fIhz8F6KkcDAqNA&s=08" target="_blank" rel="noopener noreferrer"><Twitter size={16} /></a>
          <a href="https://www.linkedin.com/company/rialto-events/" target="_blank" rel="noopener noreferrer"><Linkedin size={16} /></a>
          <a href="https://www.tiktok.com/search?lang=en&q=event%20spaces%20kenya&t=1753094257792" target="_blank" rel="noopener noreferrer">
            <TikTokIcon />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-5 text-center text-xs text-white/60">&copy; {new Date().getFullYear()} Spacer</div>
    </footer>
  );
}
