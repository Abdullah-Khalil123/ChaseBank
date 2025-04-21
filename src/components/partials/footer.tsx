import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  HouseIcon,
} from "lucide-react";

const Footer = () => {
  const IconSize = "25px";
  const IconClassName = "opacity-75 hover:text-blue-600 hover:opacity-100";
  return (
    <div className="bg-white flex flex-col items-center gap-4 py-4 ">
      <div className="flex justify-center items-center gap-4">
        <p className="text-gray-600">Follow us:</p>
        <Facebook size={IconSize} className={IconClassName} />
        <Instagram size={IconSize} className={IconClassName} />
        <Twitter size={IconSize} className={IconClassName} />
        <Youtube size={IconSize} className={IconClassName} />
        <Linkedin size={IconSize} className={IconClassName} />
      </div>
      <Section />
      <FooterLinks />
    </div>
  );
};

const Section = () => {
  return <div className="h-[1px] w-[90%] bg-gray-600"></div>;
};

const FooterLinks = () => {
  return (
    <div className="[1024px]:max-w-[720px] bg-white text-gray-600 text-sm text-center py-6 space-y-3">
      <div className="flex flex-wrap justify-center gap-4 underline">
        <a href="#">Contact us</a>
        <a href="#">Privacy</a>
        <a href="#">Security</a>
        <a href="#">Terms of use</a>
        <a href="#">Accessibility</a>
        <a href="#">SAFE Act: Chase Mortgage Loan Originators</a>
        <a href="#">Fair Lending</a>
        <a href="#">About Chase</a>
        <a href="#">J.P. Morgan</a>
        <a href="#">JPMorgan Chase & Co.</a>
        <a href="#">Careers</a>
        <a href="#">Español</a>
        <a href="#">Chase Canada</a>
        <a href="#">Site map</a>
        <a href="#">Member FDIC</a>
      </div>
      <div className="flex flex-col items-center space-y-1 mt-2">
        <div className="flex items-center gap-1">
          <span>
            <HouseIcon size={16} />
          </span>
          <span>Equal Housing Opportunity</span>
        </div>
        <p className="text-xs">&copy; 2025 JPMorgan Chase & Co.</p>
      </div>
    </div>
  );
};

export default Footer;
