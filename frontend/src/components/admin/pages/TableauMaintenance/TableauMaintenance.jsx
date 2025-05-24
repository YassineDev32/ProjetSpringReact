"use client"

import { useState } from "react"

const StatCard = ({ title, value, icon, color, percentage, trend }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800 hover:border-green-500/50 transition-all">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} text-black mr-4`}>{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
        </div>
      </div>
      {percentage && (
        <div className="mt-2 flex items-center text-sm">
          <span
            className={`mr-1 ${
              trend === "up" ? "text-green-400" : trend === "down" ? "text-red-400" : "text-gray-400"
            }`}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
          </span>
          <span
            className={`${trend === "up" ? "text-green-400" : trend === "down" ? "text-red-400" : "text-gray-400"}`}
          >
            {percentage}
          </span>
          <span className="text-gray-400 ml-1">vs mois précédent</span>
        </div>
      )}
    </div>
  )
}

const TableauMaintenance = () => {
  const [timeRange, setTimeRange] = useState("month")

  // Données fictives pour la démonstration
  const stats = [
    {
      title: "Taux de disponibilité",
      value: "94.8%",
      icon: (
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "bg-green-400",
      percentage: "1.2%",
      trend: "up",
    },
    {
      title: "MTTR (Temps moyen de réparation)",
      value: "2.4h",
      icon: (
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "bg-green-400",
      percentage: "0.3h",
      trend: "down",
    },
    {
      title: "MTBF (Temps moyen entre pannes)",
      value: "487h",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "bg-green-400",
      percentage: "12h",
      trend: "up",
    },
    {
      title: "Taux de panne",
      value: "3.2%",
      icon: (
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      color: "bg-green-400",
      percentage: "0.5%",
      trend: "down",
    },
  ]

  const maintenanceEfficiency = [
    {
      title: "Taux de maintenance préventive",
      value: "68%",
      target: "75%",
      color: "bg-blue-500",
    },
    {
      title: "Taux de maintenance corrective",
      value: "32%",
      target: "25%",
      color: "bg-yellow-500",
    },
    {
      title: "Respect du planning",
      value: "91%",
      target: "95%",
      color: "bg-green-500",
    },
    {
      title: "Taux d'utilisation des pièces",
      value: "87%",
      target: "90%",
      color: "bg-purple-500",
    },
  ]

  const vehiclePerformance = [
    { model: "Renault Clio", availability: 96.2, mttr: 1.8, mtbf: 520, failureRate: 2.1 },
    { model: "Peugeot 308", availability: 94.5, mttr: 2.3, mtbf: 480, failureRate: 3.5 },
    { model: "Citroën C3", availability: 92.8, mttr: 2.7, mtbf: 410, failureRate: 4.2 },
    { model: "Volkswagen Golf", availability: 95.7, mttr: 2.1, mtbf: 510, failureRate: 2.8 },
    { model: "Toyota Yaris", availability: 97.3, mttr: 1.5, mtbf: 550, failureRate: 1.9 },
  ]

  const maintenanceTasks = [
    { type: "Préventive", completed: 42, planned: 45, percentage: 93 },
    { type: "Corrective", completed: 18, planned: 18, percentage: 100 },
    { type: "Inspection", completed: 12, planned: 15, percentage: 80 },
    { type: "Révision", completed: 8, planned: 10, percentage: 80 },
  ]

  // Données pour les graphiques (fictives)
  const monthlyData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    availability: [92.1, 93.4, 91.8, 92.5, 93.7, 94.2, 93.8, 94.5, 94.8, 95.1, 94.7, 94.8],
    mttr: [2.8, 2.7, 2.9, 2.6, 2.5, 2.4, 2.5, 2.3, 2.4, 2.2, 2.3, 2.4],
    preventive: [62, 63, 65, 64, 66, 67, 65, 68, 67, 69, 68, 68],
    corrective: [38, 37, 35, 36, 34, 33, 35, 32, 33, 31, 32, 32],
  }

  return (
    <div className="space-y-6 mt-12">
      {/* Header avec sélecteur de période */}
      <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-white">Tableau de Bord Maintenance</h2>
            <p className="text-sm text-gray-400 mt-1">Suivi des indicateurs de performance maintenance et Lean</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange("week")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                timeRange === "week"
                  ? "bg-green-900/30 text-green-400 border border-green-500/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-green-400"
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => setTimeRange("month")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                timeRange === "month"
                  ? "bg-green-900/30 text-green-400 border border-green-500/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-green-400"
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => setTimeRange("quarter")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                timeRange === "quarter"
                  ? "bg-green-900/30 text-green-400 border border-green-500/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-green-400"
              }`}
            >
              Trimestre
            </button>
            <button
              onClick={() => setTimeRange("year")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                timeRange === "year"
                  ? "bg-green-900/30 text-green-400 border border-green-500/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-green-400"
              }`}
            >
              Année
            </button>
          </div>
        </div>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            percentage={stat.percentage}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Graphiques et tableaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution de la disponibilité */}
        <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
          <h3 className="text-lg font-medium text-white mb-4">Évolution de la disponibilité</h3>
          <div className="h-64 flex items-center justify-center">
            {/* Ici, vous intégreriez un graphique réel */}
            <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-end justify-around px-4">
                {monthlyData.availability.map((value, index) => (
                  <div
                    key={index}
                    className="w-6 bg-green-500 rounded-t-sm"
                    style={{ height: `${value - 85}%`, maxHeight: "100%" }}
                  ></div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-around px-4 pb-2">
                {monthlyData.labels.map((label, index) => (
                  <div key={index} className="text-xs text-gray-400">
                    {label}
                  </div>
                ))}
              </div>
              <div className="absolute top-2 left-2 text-xs text-gray-400">Disponibilité (%)</div>
            </div>
          </div>
        </div>

        {/* Répartition des types de maintenance */}
        <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
          <h3 className="text-lg font-medium text-white mb-4">Répartition des types de maintenance</h3>
          <div className="h-64 flex items-center justify-center">
            {/* Ici, vous intégreriez un graphique réel */}
            <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-end justify-around px-4">
                {monthlyData.preventive.map((value, index) => (
                  <div key={index} className="w-12 rounded-t-sm relative" style={{ height: "100%" }}>
                    <div
                      className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm"
                      style={{ height: `${value}%` }}
                    ></div>
                    <div
                      className="absolute bottom-0 w-full bg-yellow-500 rounded-t-sm"
                      style={{ height: `${monthlyData.corrective[index]}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-around px-4 pb-2">
                {monthlyData.labels.map((label, index) => (
                  <div key={index} className="text-xs text-gray-400">
                    {label}
                  </div>
                ))}
              </div>
              <div className="absolute top-2 left-2 text-xs text-gray-400">Répartition (%)</div>
              <div className="absolute top-2 right-2 flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
                  <span className="text-xs text-gray-400">Préventive</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-sm mr-1"></div>
                  <span className="text-xs text-gray-400">Corrective</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Efficacité de la maintenance */}
        <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
          <h3 className="text-lg font-medium text-white mb-4">Efficacité de la maintenance</h3>
          <div className="space-y-4">
            {maintenanceEfficiency.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-white">{item.title}</span>
                  <span className="text-sm text-white">
                    {item.value} / {item.target}
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${item.color}`} style={{ width: item.value }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tâches de maintenance */}
        <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
          <h3 className="text-lg font-medium text-white mb-4">Tâches de maintenance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Réalisées
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Planifiées
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Taux
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {maintenanceTasks.map((task, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{task.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{task.completed}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{task.planned}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-800 rounded-full h-2.5 mr-2 max-w-[100px]">
                          <div
                            className={`h-2.5 rounded-full ${
                              task.percentage >= 90
                                ? "bg-green-500"
                                : task.percentage >= 75
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${task.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-white">{task.percentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Performance par véhicule */}
      <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-800">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="text-lg font-medium text-white">Performance par modèle de véhicule</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Modèle
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Disponibilité
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  MTTR (h)
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  MTBF (h)
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Taux de panne (%)
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {vehiclePerformance.map((vehicle, index) => (
                <tr key={index} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{vehicle.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-800 rounded-full h-2.5 mr-2 max-w-[100px]">
                        <div
                          className={`h-2.5 rounded-full ${
                            vehicle.availability >= 95
                              ? "bg-green-500"
                              : vehicle.availability >= 90
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${vehicle.availability}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{vehicle.availability}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{vehicle.mttr}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{vehicle.mtbf}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        vehicle.failureRate <= 2
                          ? "bg-green-900/30 text-green-400 border border-green-500/30"
                          : vehicle.failureRate <= 3.5
                            ? "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30"
                            : "bg-red-900/30 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {vehicle.failureRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TableauMaintenance
