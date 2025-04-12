import { Link } from 'react-router-dom';

export const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'Benefits', href: '#benefits' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="w-full bg-[#ffffff05] mt-20">
      <div className="container-custom py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-black mb-4">
              <span className="text-[#99E39E]">Block</span>Fraud
            </div>
            <p className="text-[#ffffff99] max-w-sm">
              Protecting digital transactions with advanced AI technology. Making blockchain safer for everyone.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg capitalize">Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#ffffff99] hover:text-[#99E39E] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg capitalize">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-[#ffffff99] hover:text-[#99E39E] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#ffffff1a]">
          <div className="text-center">
            <p className="text-[#ffffff99] text-sm">
              © {currentYear} BlockFraud. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};