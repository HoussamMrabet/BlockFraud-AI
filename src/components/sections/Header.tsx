import { useState } from 'react';
import { Button } from "../ui/button";
import { Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { useNavigate } from "react-router-dom";

export const Header = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "Benefits", href: "#benefits" },
  ];

  return (
    <header className="py-6 w-full flex justify-between items-center relative">
      <div className="text-2xl font-black">
        <span className="text-[#99E39E]">Block</span>Fraud
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 text-white hover:text-[#99E39E] transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Navigation */}
      <NavigationMenu className="max-w-none hidden lg:flex">
        <NavigationMenuList className="flex gap-8">
          {navItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuLink
                href={item.href}
                className="font-medium text-white text-base hover:text-[#99E39E] tracking-[-0.60px] leading-[22.4px] whitespace-nowrap transition-colors"
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Navigation */}
      <div className={`
        lg:hidden fixed inset-x-0 top-[80px] bg-bg border-t border-[#ffffff1a]
        transition-all duration-300 ease-in-out z-50
        ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}
      `}>
        <nav className="container-custom py-4">
          <ul className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="block font-medium text-white text-base hover:text-[#99E39E] tracking-[-0.60px] leading-[22.4px] transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Get Started Button */}
      <Button onClick={() => navigate('/dashboard')} className="hidden lg:flex bg-main-colour hover:bg-[#70bf76] rounded-xl font-semibold text-bg text-base tracking-[-0.60px] leading-[22.4px] transition-all duration-300">
        Get started
      </Button>
    </header>
  );
};