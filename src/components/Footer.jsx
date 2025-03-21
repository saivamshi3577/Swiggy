import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f0f0f5] text-gray-700 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
 
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      
          <div>
            <h3 className="font-semibold text-lg mb-2">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Swiggy Corporate</li>
              <li>Careers</li>
              <li>Team</li>
              <li>Swiggy One</li>
              <li>Swiggy Instamart</li>
              <li>Swiggy Dineout</li>
              <li>Swiggy Genie</li>
              <li>Minis</li>
              <li>Pyng</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Contact us</h3>
            <ul className="space-y-2 text-sm">
              <li>Help & Support</li>
              <li>Partner with us</li>
              <li>Ride with us</li>
            </ul>
          </div>

     
          <div>
            <h3 className="font-semibold text-lg mb-2">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>Terms & Conditions</li>
              <li>Cookie Policy</li>
              <li>Privacy Policy</li>
              <li>Investor Relations</li>
              <li>Life at Swiggy</li>
            </ul>
          </div>

    
          <div>
            <h3 className="font-semibold text-lg mb-2">Explore with Swiggy</h3>
            <ul className="space-y-2 text-sm">
              <li>Swiggy News</li>
              <li>Snackables</li>
            </ul>
          </div>
        </div>

        <div className="border-t my-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-2">Available in:</h3>
            <p>Bangalore • Gurgaon • Hyderabad • Delhi • Mumbai • Pune</p>
            <p className="text-gray-500 mt-1">679 cities</p>
          </div>

         
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-xl"><FaLinkedin /></a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-xl"><FaInstagram /></a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-xl"><FaFacebook /></a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-xl"><FaPinterest /></a>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          © 2025 Swiggy Limited
        </div>
      </div>
    </footer>
  );
};

export default Footer;
