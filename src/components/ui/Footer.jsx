import {
  Github, Instagram, Facebook, Youtube, Twitter, Linkedin
} from "lucide-react";

export default function Footer() {
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

        <div>
          <h3 className="font-semibold">Counties</h3>
          <ul className="space-y-1">
            <li><a href="#">Nairobi</a></li>
            <li><a href="#">Mombasa</a></li>
            <li><a href="#">...</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Support</h3>
          <ul className="space-y-1">
            <li><a href="#">Help</a></li>
            <li><a href="#">Privacy and terms</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap gap-4 justify-start md:justify-end items-center">
          <Github />
          <Instagram />
          <Facebook />
          <Youtube />
          <Twitter />
          <Linkedin />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 text-center text-xs text-white/60">
        &copy; Spacer
      </div>
    </footer>
  );
}
