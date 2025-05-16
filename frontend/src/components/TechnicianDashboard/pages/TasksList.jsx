"use client"

import { useState } from "react"
import MaterialsModal from "../components/MaterialsModal"

const TasksList = () => {
  const [filter, setFilter] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [taskDetailsModal, setTaskDetailsModal] = useState(false)
  const [taskDetails, setTaskDetails] = useState(null)

  // Handle showing task details
  const showTaskDetails = (task) => {
    setTaskDetails(task)
    setTaskDetailsModal(true)
  }

  // Données fixes pour la démonstration
  const tasks = [
    {
      id: 1,
      title: "Vidange moteur",
      description: "Changement d'huile et filtre à huile",
      date: "2023-05-15",
      time: "14:30",
      vehicle: "Renault Clio",
      plate: "AB-123-CD",
      status: "pending",
      priority: "medium",
      type: "maintenance",
    },
    {
      id: 2,
      title: "Remplacement plaquettes de frein",
      description: "Remplacement des plaquettes avant et arrière",
      date: "2023-05-15",
      time: "16:00",
      vehicle: "Peugeot 308",
      plate: "EF-456-GH",
      status: "in-progress",
      priority: "medium",
      type: "repair",
    },
    {
      id: 3,
      title: "Diagnostic système électrique",
      description: "Problème de démarrage intermittent - Batterie défectueuse",
      date: "2023-05-16",
      time: "09:15",
      vehicle: "Citroën C3",
      plate: "IJ-789-KL",
      status: "pending",
      priority: "high",
      type: "electrical",
    },
    {
      id: 4,
      title: "Contrôle technique",
      description: "Préparation et passage au contrôle technique",
      date: "2023-05-16",
      time: "11:00",
      vehicle: "Volkswagen Golf",
      plate: "MN-012-OP",
      status: "pending",
      priority: "low",
      type: "inspection",
    },
    {
      id: 5,
      title: "Changement courroie de distribution",
      description: "Remplacement de la courroie et vérification de la pompe à eau",
      date: "2023-05-17",
      time: "10:00",
      vehicle: "Toyota Yaris",
      plate: "QR-345-ST",
      status: "pending",
      priority: "high",
      type: "maintenance",
    },
    {
      id: 6,
      title: "Réparation climatisation",
      description: "Recharge de gaz et vérification du circuit",
      date: "2023-05-17",
      time: "14:00",
      vehicle: "Renault Megane",
      plate: "UV-678-WX",
      status: "completed",
      priority: "medium",
      type: "climate",
    },
    {
      id: 7,
      title: "Remplacement amortisseurs",
      description: "Changement des amortisseurs avant",
      date: "2023-05-18",
      time: "09:00",
      vehicle: "Peugeot 208",
      plate: "YZ-901-AB",
      status: "completed",
      priority: "medium",
      type: "suspension",
    },
  ]

  const filteredTasks = tasks.filter(
    (task) =>
      (filter === "all" || task.status === filter) &&
      (searchTerm === "" ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "En attente"
      case "in-progress":
        return "En cours"
      case "completed":
        return "Terminée"
      default:
        return status
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30"
      case "in-progress":
        return "bg-blue-900/30 text-blue-400 border border-blue-500/30"
      case "completed":
        return "bg-green-900/30 text-green-400 border border-green-500/30"
      default:
        return "bg-gray-800 text-gray-300"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-900/30 text-red-400 border border-red-500/30"
      case "medium":
        return "bg-blue-900/30 text-blue-400 border border-blue-500/30"
      case "low":
        return "bg-green-900/30 text-green-400 border border-green-500/30"
      default:
        return "bg-gray-800 text-gray-300"
    }
  }

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high":
        return "Haute"
      case "medium":
        return "Moyenne"
      case "low":
        return "Basse"
      default:
        return priority
    }
  }

  const handleStartTask = (task) => {
    setSelectedTask(task)
    setShowModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-white">Liste des tâches</h2>
            <p className="text-sm text-gray-400 mt-1">Gérez vos tâches de maintenance</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Toutes les tâches</option>
              <option value="pending">En attente</option>
              <option value="in-progress">En cours</option>
              <option value="completed">Terminées</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Tâche
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Véhicule
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Date & Heure
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Priorité
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Statut
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-white">{task.title}</div>
                        <div className="text-sm text-gray-400">{task.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{task.vehicle}</div>
                    <div className="text-sm text-gray-400">{task.plate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{task.date}</div>
                    <div className="text-sm text-gray-400">{task.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(
                        task.priority,
                      )}`}
                    >
                      {getPriorityLabel(task.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        task.status,
                      )}`}
                    >
                      {getStatusLabel(task.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => showTaskDetails(task)} className="text-green-400 hover:text-green-300 mr-3">
                      Détails
                    </button>
                    {task.status === "pending" && (
                      <button
                        onClick={() => handleStartTask(task)}
                        className="text-green-400 hover:text-green-300 bg-green-900/20 px-3 py-1 rounded-md border border-green-500/30"
                      >
                        Démarrer
                      </button>
                    )}
                    {task.status === "in-progress" && (
                      <button className="text-green-400 hover:text-green-300 bg-green-900/20 px-3 py-1 rounded-md border border-green-500/30">
                        Terminer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-800 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-400">
                Affichage de <span className="font-medium">1</span> à{" "}
                <span className="font-medium">{filteredTasks.length}</span> sur{" "}
                <span className="font-medium">{filteredTasks.length}</span> résultats
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
                >
                  <span className="sr-only">Précédent</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-green-900/30 border-green-500 text-green-400 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
                >
                  <span className="sr-only">Suivant</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Task Details Modal */}
      {taskDetailsModal && taskDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-gray-800">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-800">
              <h3 className="text-xl font-semibold text-white">Détails de la tâche</h3>
              <button
                onClick={() => setTaskDetailsModal(false)}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Task Info */}
            <div className="p-6">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{taskDetails.title}</h2>
                    <p className="text-gray-400 mt-1">{taskDetails.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-2 py-1 text-xs rounded-full mb-2 ${getStatusColor(taskDetails.status)}`}>
                      {getStatusLabel(taskDetails.status)}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(taskDetails.priority)}`}>
                      Priorité {getPriorityLabel(taskDetails.priority)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Véhicule</h4>
                  <p className="text-lg font-medium text-white">{taskDetails.vehicle}</p>
                  <p className="text-sm text-gray-400">Immatriculation: {taskDetails.plate}</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Planification</h4>
                  <p className="text-lg font-medium text-white">{taskDetails.date}</p>
                  <p className="text-sm text-gray-400">Heure: {taskDetails.time}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Type d'intervention</h4>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                      {taskDetails.type === "maintenance" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : taskDetails.type === "repair" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                        </svg>
                      )}
                    </div>
                    <span className="text-white capitalize">{taskDetails.type}</span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Matériaux requis</h4>
                  <p className="text-white">
                    {taskDetails.type === "maintenance"
                      ? "Huile moteur, filtre à huile, filtre à air"
                      : taskDetails.type === "repair"
                        ? "Plaquettes de frein, liquide de frein"
                        : taskDetails.type === "electrical"
                          ? "Batterie, câbles, testeur"
                          : "Kit d'inspection, outils spécifiques"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setTaskDetailsModal(false)}
                  className="px-4 py-2 text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700"
                >
                  Fermer
                </button>
                {taskDetails.status === "pending" && (
                  <button
                    onClick={() => {
                      setTaskDetailsModal(false)
                      handleStartTask(taskDetails)
                    }}
                    className="px-4 py-2 text-black bg-green-400 rounded-md hover:bg-green-500"
                  >
                    Démarrer la tâche
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Materials Modal */}
      {showModal && <MaterialsModal task={selectedTask} onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default TasksList
