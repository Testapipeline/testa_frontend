import { Link, useLocation } from "react-router-dom";
import { Layout, FileText, Upload, Users, Settings, DollarSign, CheckSquare } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
export const DashboardSidebar = () => {
  const {
    user
  } = useAuth();
  const location = useLocation();
  const studentLinks = [{
    name: "Dashboard",
    icon: Layout,
    path: "/dashboard/student"
  }, {
    name: "My Exams",
    icon: FileText,
    path: "/dashboard/student/exams"
  }, {
    name: "Settings",
    icon: Settings,
    path: "/dashboard/student/settings"
  }];
  const instructorLinks = [{
    name: "Dashboard",
    icon: Layout,
    path: "/dashboard/instructor"
  }, {
    name: "Upload Exam",
    icon: Upload,
    path: "/dashboard/instructor/upload"
  }, {
    name: "Earnings",
    icon: DollarSign,
    path: "/dashboard/instructor/earnings"
  }, {
    name: "Settings",
    icon: Settings,
    path: "/dashboard/instructor/settings"
  }];
  const adminLinks = [{
    name: "Dashboard",
    icon: Layout,
    path: "/dashboard/admin"
  }, {
    name: "Approve Exams",
    icon: CheckSquare,
    path: "/dashboard/admin/approvals"
  }, {
    name: "Manage Users",
    icon: Users,
    path: "/dashboard/admin/users"
  }, {
    name: "Settings",
    icon: Settings,
    path: "/dashboard/admin/settings"
  }];
  const links = user?.role === "student" ? studentLinks : user?.role === "instructor" ? instructorLinks : adminLinks;
  return <div className="w-64 bg-white h-full border-r border-gray-200 mt-20 mb-5">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {links.map(link => {
          const Icon = link.icon;
          return <Link key={link.path} to={link.path} className={`${location.pathname === link.path ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>
                <Icon className={`${location.pathname === link.path ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"} mr-3 h-5 w-5`} />
                {link.name}
              </Link>;
        })}
        </div>
      </nav>
    </div>;
};