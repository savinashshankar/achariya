import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, CheckSquare, BarChart2, Users, FileText, Upload, LogOut, LayoutDashboard } from 'lucide-react';

const Layout = ({ role }: { role: 'student' | 'teacher' | 'admin' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10">
        <div className="p-6 flex items-center space-x-3 border-b border-gray-100">
          <div className="bg-blue-600 p-2 rounded-lg">
            <BookOpen className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold text-gray-800">Achariya</span>
        </div>

        <nav className="p-4 space-y-2">
          {role === 'student' && (
            <>
              <NavItem to="/student/courses" icon={BookOpen} label="My Courses" />
              <NavItem to="/student/tasks" icon={CheckSquare} label="My Tasks" />
              <NavItem to="/student/progress" icon={BarChart2} label="My Progress" />
            </>
          )}

          {role === 'teacher' && (
            <>
              <NavItem to="/teacher/classes" icon={Users} label="My Classes" />
              <NavItem to="/teacher/lesson-plans" icon={FileText} label="Lesson Plans" />
              <NavItem to="/teacher/evidence" icon={Upload} label="Evidence Upload" />
              <NavItem to="/teacher/progress" icon={BarChart2} label="Course Progress" />
            </>
          )}

          {role === 'admin' && (
            <>
              <NavItem to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
              <NavItem to="/admin/courses" icon={BookOpen} label="Courses" />
              <NavItem to="/admin/at-risk" icon={Users} label="At-Risk Students" />
              <NavItem to="/admin/coverage" icon={BarChart2} label="Teacher Coverage" />
            </>
          )}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
