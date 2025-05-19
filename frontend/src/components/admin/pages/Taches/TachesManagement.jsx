"use client"

import { useState, useEffect } from "react"
import api from "../../../../api"

const TachesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    vehicle: "",
    plate: "",
    technicien: "",
    priority: "medium",
    status: "pending",
    date: "",
    time: "",
    type: "maintenance",
  })
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cars, setCars] = useState([])
  const [techniciens, setTechniciens] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        const response = await api.get("/api/tasks")
        setTasks(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching tasks:", err)
        setError("Erreur lors du chargement des tâches. Veuillez réessayer.")
      } finally {
        setLoading(false)
      }
    }

    const fetchCars = async () => {
      try {
        const response = await api.get("/api/cars/")
        setCars(response.data)
      } catch (err) {
        console.error("Error fetching cars:", err)
      }
    }

    const fetchTechnicians = async () => {
      try {
        const response = await api.get("/user/gettech")
        setTechniciens(response.data)
      } catch (err) {
        console.error("Error fetching technicians:", err)
      }
    }

    fetchTasks()
    fetchCars()
    fetchTechnicians()
  }, [])

  // Données fictives pour la démonstration
  /*const tasks = [
    {
      id: 1,
      title: "Vidange moteur",
      description: "Changement d'huile et filtre à huile",
      vehicle: "Renault Clio",
      plate: "AB-123-CD",
      technicien: "Thomas Dupont",
      priority: "medium",
      status: "pending",
      date: "2025-05-15",
      time: "14:30",
      type: "maintenance",
    },
    {
      id: 2,
      title: "Remplacement plaquettes de frein",
      description: "Remplacement des plaquettes avant et arrière",
      vehicle: "Peugeot 308",
      plate: "EF-456-GH",
      technicien: "Sophie Martin",
      priority: "high",
      status: "in-progress",
      date: "2025-05-15",
      time: "16:00",
      type: "repair",
    },
    {
      id: 3,
      title: "Diagnostic système électrique",
      description: "Problème de démarrage intermittent",
      vehicle: "Citroën C3",
      plate: "IJ-789-KL",
      technicien: "Lucas Bernard",
      priority: "high",
      status: "pending",
      date: "2025-05-16",
      time: "09:15",
      type: "electrical",
    },
    {
      id: 4,
      title: "Contrôle technique",
      description: "Préparation et passage au contrôle technique",
      vehicle: "Volkswagen Golf",
      plate: "MN-012-OP",
      technicien: "Thomas Dupont",
      priority: "low",
      status: "completed",
      date: "2025-05-16",
      time: "11:00",
      type: "inspection",
    },
    {
      id: 5,
      title: "Changement courroie de distribution",
      description: "Remplacement de la courroie et vérification de la pompe à eau",
      vehicle: "Toyota Yaris",
      plate: "QR-345-ST",
      technicien: "Sophie Martin",
      priority: "high",
      status: "pending",
      date: "2025-05-17",
      time: "10:00",
      type: "maintenance",
    },
  ]*/

  // Liste des techniciens
  /*const techniciens = [
    { id: 1, name: "Thomas Dupont", speciality: "Mécanique générale" },
    { id: 2, name: "Sophie Martin", speciality: "Électronique" },
    { id: 3, name: "Lucas Bernard", speciality: "Diagnostic" },
    { id: 4, name: "Emma Petit", speciality: "Carrosserie" },
  ]*/

  const mapTaskFromBackend = (task) => {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      vehicle: task.car ? `${task.car.id} - ${task.car.model.name}` : "",
      plate: task.car ? task.car.matricule : "",
      technicien: task.technician
        ? `${task.technician.id} - ${task.technician.firstname} ${task.technician.lastname}`
        : "",
      priority: task.priority ? task.priority.toLowerCase() : "medium",
      status: task.status ? task.status.toLowerCase().replace("_", "-") : "pending",
      date: task.date,
      time: task.time,
      type: task.type ? task.type.toLowerCase() : "maintenance",
    }
  }

  // Filtrer les tâches
  const filteredTasks = tasks
    .map(mapTaskFromBackend)
    .filter(
      (task) =>
        (filterStatus === "all" || task.status === filterStatus) &&
        (filterPriority === "all" || task.priority === filterPriority) &&
        (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.technicien.toLowerCase().includes(searchTerm.toLowerCase())),
    )

  // Gérer l'ouverture du modal pour ajouter/modifier une tâche
  const handleOpenModal = (task = null) => {
    if (task) {
      setFormData(task)
      setSelectedTask(task)
    } else {
      setFormData({
        title: "",
        description: "",
        vehicle: "",
        plate: "",
        technicien: "",
        priority: "medium",
        status: "pending",
        date: "",
        time: "",
        type: "maintenance",
      })
      setSelectedTask(null)
    }
    setShowModal(true)
  }

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Extract car ID from the vehicle string
      const carId = formData.vehicle ? Number.parseInt(formData.vehicle.split("-")[0].trim()) : null

      // Extract technician ID from the technicien string
      const technicianId = formData.technicien ? Number.parseInt(formData.technicien.split("-")[0].trim()) : null

      if (!carId || !technicianId) {
        alert("Veuillez sélectionner un véhicule et un technicien")
        return
      }

      const taskData = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority.toUpperCase(),
        type: formData.type.toUpperCase(),
        date: formData.date,
        time: formData.time,
        car: { id: carId },
        technician: { id: technicianId },
      }

      if (selectedTask) {
        // Update existing task
        await api.put(`/api/tasks/updateTask`, taskData)
      } else {
        // Create new task
        await api.post("/api/tasks", taskData)
      }

      // Refresh tasks list
      const response = await api.get("/api/tasks")
      setTasks(response.data)

      setShowModal(false)
    } catch (err) {
      console.error("Error saving task:", err)
      alert("Erreur lors de l'enregistrement de la tâche. Veuillez réessayer.")
    }
  }

  // Fonctions pour obtenir les labels et couleurs
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

  const getTypeLabel = (type) => {
    switch (type) {
      case "maintenance":
        return "Maintenance"
      case "repair":
        return "Réparation"
      case "electrical":
        return "Électrique"
      case "inspection":
        return "Inspection"
      default:
        return type
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      try {
        await api.delete(`/api/tasks/${taskId}`)
        // Refresh tasks list
        const response = await api.get("/api/tasks")
        setTasks(response.data)
      } catch (err) {
        console.error("Error deleting task:", err)
        alert("Erreur lors de la suppression de la tâche. Veuillez réessayer.")
      }
    }
  }

  return (
    <div className="space-y-6 mt-12">
      {/* Header avec filtres et bouton d'ajout */}
      <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-white">Gestion des Tâches</h2>
            <p className="text-sm text-gray-400 mt-1">Créez, modifiez et assignez des tâches aux techniciens</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="in-progress">En cours</option>
              <option value="completed">Terminées</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Toutes les priorités</option>
              <option value="high">Haute</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </select>
            <button
              onClick={() => handleOpenModal()}
              className="w-full sm:w-auto px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nouvelle Tâche
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Liste des tâches */}
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
                  Technicien
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
                    <div className="text-sm text-white">{task.technicien}</div>
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
                    <button onClick={() => handleOpenModal(task)} className="text-green-400 hover:text-green-300 mr-3">
                      Modifier
                    </button>
                    <button onClick={() => handleDeleteTask(task.id)} className="text-red-400 hover:text-red-300">
                      Supprimer
                    </button>
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
                <span className="font-medium">{tasks.length}</span> résultats
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

      {/* Loading and error states */}
      {loading && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 text-red-400 border border-red-500/30 p-4 rounded-lg my-4">
          <p>{error}</p>
        </div>
      )}

      {!loading && tasks.length === 0 && !error && (
        <div className="bg-gray-800 p-8 text-center rounded-lg my-4">
          <p className="text-gray-400">Aucune tâche trouvée</p>
        </div>
      )}

      {/* Modal pour ajouter/modifier une tâche */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-800">
              <h3 className="text-xl font-semibold text-white">
                {selectedTask ? "Modifier la tâche" : "Nouvelle tâche"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white focus:outline-none">
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

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                    Titre de la tâche
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-400 mb-1">
                    Type d'intervention
                  </label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="maintenance">Maintenance</option>
                    <option value="repair">Réparation</option>
                    <option value="electrical">Électrique</option>
                    <option value="inspection">Inspection</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="vehicle" className="block text-sm font-medium text-gray-400 mb-1">
                    Véhicule
                  </label>
                  <select
                    id="vehicle"
                    value={formData.vehicle}
                    onChange={(e) => {
                      const selectedCar = cars.find((car) => `${car.id}` === e.target.value.split("-")[0].trim())
                      setFormData({
                        ...formData,
                        vehicle: e.target.value,
                        plate: selectedCar ? selectedCar.matricule : "",
                      })
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionner un véhicule</option>
                    {cars.map((car) => (
                      <option
                        key={car.id}
                        value={`${car.id} - ${car.model?.name || "N/A"} ${car.model?.mark?.name || ""}`}
                      >
                        {car.model?.name || "N/A"} {car.model?.mark?.name || ""} - {car.matricule}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="plate" className="block text-sm font-medium text-gray-400 mb-1">
                    Immatriculation
                  </label>
                  <input
                    type="text"
                    id="plate"
                    value={formData.plate}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-700"
                  />
                </div>

                <div>
                  <label htmlFor="technicien" className="block text-sm font-medium text-gray-400 mb-1">
                    Technicien assigné
                  </label>
                  <select
                    id="technicien"
                    value={formData.technicien}
                    onChange={(e) => setFormData({ ...formData, technicien: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionner un technicien</option>
                    {techniciens.map((tech) => (
                      <option key={tech.id} value={`${tech.id} - ${tech.firstname} ${tech.lastname}`}>
                        {tech.firstname} {tech.lastname} - {tech.role === "TECHNICIAN" ? "Technicien" : tech.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-400 mb-1">
                    Priorité
                  </label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-400 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-400 mb-1">
                    Heure
                  </label>
                  <input
                    type="time"
                    id="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-400 mb-1">
                    Statut
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="pending">En attente</option>
                    <option value="in-progress">En cours</option>
                    <option value="completed">Terminée</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700"
                >
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 text-black bg-green-500 rounded-md hover:bg-green-600">
                  {selectedTask ? "Mettre à jour" : "Créer la tâche"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TachesManagement
