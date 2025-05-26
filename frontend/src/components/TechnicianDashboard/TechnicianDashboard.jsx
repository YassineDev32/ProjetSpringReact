"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import TechSidebar from "./TechSidebar"
import TechDashboard from "./pages/TechDashboard"
import TasksList from "./pages/TasksList"
import MaintenancePlanning from "./pages/MaintenancePlanning"
import VehicleHistory from "./pages/VehicleHistory"
import Reports from "./pages/Reports"

const TechnicianDashboard = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const [showNotifications, setShowNotifications] = useState(false)
  const notifications = [
    {
      type: "task",
      title: "Nouvelle tâche assignée",
      message: "Vidange moteur - Renault Clio (AB-123-CD)",
      time: "Il y a 10 minutes",
    },
    {
      type: "reminder",
      title: "Rappel de maintenance",
      message: "Contrôle technique - Volkswagen Golf (MN-012-OP)",
      time: "Il y a 30 minutes",
    },
    {
      type: "task",
      title: "Tâche modifiée",
      message: "Remplacement plaquettes de frein - Peugeot 308 (EF-456-GH)",
      time: "Il y a 1 heure",
    },
    {
      type: "reminder",
      title: "Pièce disponible",
      message: "Batterie Premium 60Ah pour Citroën C3 (IJ-789-KL)",
      time: "Il y a 2 heures",
    },
    {
      type: "task",
      title: "Tâche urgente",
      message: "Diagnostic système électrique - Toyota Yaris (QR-345-ST)",
      time: "Il y a 3 heures",
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest(".notification-container")) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showNotifications])

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <TechSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <div className={`flex-1 overflow-auto transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"}`}>
        {/* Top Navigation */}
        <header className="bg-black border-b border-gray-800 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-md text-gray-400 hover:text-green-400 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="ml-4 text-xl font-semibold text-white">
                {location.pathname.includes("/tasks")
                  ? "Gestion des Tâches"
                  : location.pathname.includes("/planning")
                    ? "Planning de Maintenance"
                    : location.pathname.includes("/history")
                      ? "Historique des Véhicules"
                      : location.pathname.includes("/reports")
                        ? "Rapports & Statistiques"
                        : "Tableau de Bord Technicien"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  className="p-2 rounded-full text-gray-400 hover:text-green-400 focus:outline-none"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-lg shadow-lg py-1 border border-gray-800 z-50 notification-container">
                    <div className="px-4 py-2 border-b border-gray-800">
                      <h3 className="text-sm font-medium text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 hover:bg-gray-800 border-b border-gray-800 last:border-b-0"
                        >
                          <div className="flex items-start">
                            <div
                              className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                                notification.type === "task"
                                  ? "bg-green-900/30 text-green-400 border border-green-500/30"
                                  : "bg-blue-900/30 text-blue-400 border border-blue-500/30"
                              }`}
                            >
                              {notification.type === "task" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-white">{notification.title}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                              <div className="mt-2 text-xs text-gray-500">{notification.time}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-800">
                      <button className="text-xs text-green-400 hover:text-green-300 w-full text-center">
                        Voir toutes les notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full object-cover border border-green-500"
                  src="/anas.jpg"
                  alt="Avatar"
                />
                <span className="ml-2 font-medium text-white">Anas</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<TechDashboard />} />
            <Route path="tasks" element={<TasksList />} />
            <Route path="planning" element={<MaintenancePlanning />} />
            <Route path="history" element={<VehicleHistory />} />
            <Route path="reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default TechnicianDashboard
