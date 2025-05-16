"use client"
import { Link, useLocation } from "react-router-dom"

const SidebarLink = ({ to, icon, label, collapsed }) => {
  const location = useLocation()
  const isActive = location.pathname.includes(to)

  return (
    <Link
      to={to}
      className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
        isActive
          ? "bg-green-900/30 text-green-400 border-l-2 border-green-400"
          : "text-gray-400 hover:bg-gray-800 hover:text-green-400"
      }`}
    >
      <div className="flex items-center justify-center w-6 h-6">{icon}</div>
      {!collapsed && <span className="ml-3 font-medium">{label}</span>}
    </Link>
  )
}

const TechSidebar = ({ collapsed, setCollapsed }) => {
  const handleLogout = () => {
    // Ici vous pourriez ajouter la logique de déconnexion
    // Par exemple, supprimer le token du localStorage
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      localStorage.removeItem("token")
      // Rediriger vers la page de connexion
      window.location.href = "/login"
    }
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 flex flex-col bg-black border-r border-gray-800 shadow-lg transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        {collapsed ? (
          <div className="text-2xl font-bold text-green-400">CX</div>
        ) : (
          <div className="text-xl font-bold text-green-400">CaroteX Maintenance</div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-2">
          <SidebarLink
            to="/tech/dashboard"
            collapsed={collapsed}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
            }
            label="Tableau de Bord"
          />
          <SidebarLink
            to="/tech/tasks"
            collapsed={collapsed}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
            }
            label="Tâches"
          />
          <SidebarLink
            to="/tech/planning"
            collapsed={collapsed}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            }
            label="Planning"
          />
          <SidebarLink
            to="/tech/history"
            collapsed={collapsed}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            }
            label="Historique"
          />
          <SidebarLink
            to="/tech/reports"
            collapsed={collapsed}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            }
            label="Rapports"
          />
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full p-2 text-gray-400 rounded-lg hover:bg-gray-800 hover:text-green-400 mb-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {!collapsed && <span className="ml-2">Réduire</span>}
        </button>

        <button
          onClick={() => handleLogout()}
          className="flex items-center justify-center w-full p-2 text-gray-400 rounded-lg hover:bg-red-900/20 hover:text-red-400 hover:border hover:border-red-500/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {!collapsed && <span className="ml-2">Déconnexion</span>}
        </button>
      </div>
    </aside>
  )
}

export default TechSidebar
