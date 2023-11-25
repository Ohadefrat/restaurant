import { Raleway } from 'next/font/google';
import Link from 'next/link';
import { FaFilePdf, FaGithub, FaLinkedin } from 'react-icons/fa'; // Import the LinkedIn icon
const raleway = Raleway({ subsets: ['latin'], weight: [] })
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-200 dark:bg-zinc-800/30 text-white" style={{ backgroundColor: '#00000030' }}>
      <div className="flex items-center">
        <Link href="/" passHref>
          <span title="logo" className="cursor-pointer">
            McOrder
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/about" passHref>
          <span title="about" className="cursor-pointer">
            About
          </span>
        </Link>
        <Link href="/contact" passHref>
          <span title="contact" className="cursor-pointer">
            Contact
          </span>
        </Link>



      </div>
    </nav>
  );
};

export default Navbar;
