import { BarChart3, PieChart, Home } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Data Analyzer',
      path: '/dashboard',
      icon: <PieChart className="w-5 h-5" />,
    },
    {
      name: 'Fraud Predictor',
      path: '/dashboard/predictor',
      icon: <BarChart3 className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#000510] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#ffffff05] border-r border-[#ffffff1a] fixed h-full">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#ffffff1a]">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-[#99e39e]" />
              <span className="text-xl font-bold text-white">BlockFraud</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                      location.pathname === item.path
                        ? 'bg-[#99e39e20] text-[#99e39e]'
                        : 'text-[#ffffff99] hover:bg-[#ffffff0a] hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-[#ffffff1a]">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-[#ffffff99] hover:bg-[#ffffff0a] hover:text-white transition-all duration-200"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}