
import { useState, useEffect } from "react"
import api from "../../../api"
import { jwtDecode } from "jwt-decode"

const MaintenancePlanning = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [view, setView] = useState("month") // "month", "week", "day"
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  // Fetch tasks from the database
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        const username = jwtDecode(localStorage.getItem("token")).sub;
        const response = await api.get(`/api/tasks/technician/${username}`)

        // Map tasks to calendar events format
        const mappedEvents = response.data.map((task) => {
          // Parse date and time strings to create Date objects
          const [year, month, day] = task.date.split("-").map(Number)
          const [hours, minutes] = task.time.split(":").map(Number)

          const start = new Date(year, month - 1, day, hours, minutes)
          // Assume tasks take 1.5 hours by default
          const end = new Date(start.getTime() + 90 * 60000)

          return {
            id: task.id,
            title: task.title,
            description: task.description,
            vehicle: task.car ? `${task.car.model?.name || ""} ${task.car.model?.mark?.name || ""}` : "",
            plate: task.car ? task.car.matricule : "",
            start,
            end,
            type: task.type ? task.type.toLowerCase() : "maintenance",
            status: task.status ? task.status.toLowerCase().replace("_", "-") : "scheduled",
          }
        })

        setEvents(mappedEvents)
        setError(null)
      } catch (err) {
        console.error("Error fetching tasks:", err)
        setError("Erreur lors du chargement des tâches. Veuillez réessayer.")
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  // Fonctions utilitaires pour le calendrier
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  // Génération des jours du mois pour la vue mensuelle
  const generateMonthDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Jours du mois précédent pour compléter la première semaine
    const prevMonthDays = getDaysInMonth(year, month - 1)
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      })
    }

    // Jours du mois courant
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      })
    }

    // Jours du mois suivant pour compléter la dernière semaine
    const remainingDays = 42 - days.length // 6 semaines * 7 jours = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      })
    }

    return days
  }

  // Vérifier si un jour a des événements
  const getEventsForDay = (date) => {
    return events.filter(
      (event) =>
        event.start.getDate() === date.getDate() &&
        event.start.getMonth() === date.getMonth() &&
        event.start.getFullYear() === date.getFullYear(),
    )
  }

  // Formater l'heure
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Navigation dans le calendrier
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
  }

  // Obtenir le nom du mois
  const getMonthName = (date) => {
    return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
  }

  // Obtenir les jours de la semaine
  const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]

  // Générer les jours pour l'affichage
  const days = generateMonthDays()

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setShowTaskModal(true)
  }

  // Update task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.put(`/api/tasks/${taskId}/status`, null, {
        params: { status: newStatus },
      })

      // Refresh tasks
      const response = await api.get("/api/tasks")

      // Map tasks to calendar events format
      const mappedEvents = response.data.map((task) => {
        // Parse date and time strings to create Date objects
        const [year, month, day] = task.date.split("-").map(Number)
        const [hours, minutes] = task.time.split(":").map(Number)

        const start = new Date(year, month - 1, day, hours, minutes)
        // Assume tasks take 1.5 hours by default
        const end = new Date(start.getTime() + 90 * 60000)

        return {
          id: task.id,
          title: task.title,
          description: task.description,
          vehicle: task.car ? `${task.car.model?.name || ""} ${task.car.model?.mark?.name || ""}` : "",
          plate: task.car ? task.car.matricule : "",
          start,
          end,
          type: task.type ? task.type.toLowerCase() : "maintenance",
          status: task.status ? task.status.toLowerCase().replace("_", "-") : "scheduled",
        }
      })

      setEvents(mappedEvents)

      // Close modal
      setShowTaskModal(false)
      setSelectedTask(null)
    } catch (err) {
      console.error("Error updating task status:", err)
      alert("Erreur lors de la mise à jour du statut de la tâche. Veuillez réessayer.")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-white">Planning de maintenance</h2>
            <p className="text-sm text-gray-400 mt-1">Gérez votre calendrier d'interventions</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-md text-gray-400 hover:text-green-400 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 text-sm font-medium text-green-400 hover:text-green-300 focus:outline-none"
            >
              Aujourd'hui
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-md text-gray-400 hover:text-green-400 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h3 className="text-lg font-medium text-white">{getMonthName(currentMonth)}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView("month")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                view === "month"
                  ? "bg-green-900/30 text-green-400 border border-green-500/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-green-400"
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                view === "week"
                  ? "bg-green-900/30 text-green-400 border border-green-500/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-green-400"
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => setView("day")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                view === "day"
                  ? "bg-green-900/30 text-green-400 border border-green-500/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-green-400"
              }`}
            >
              Jour
            </button>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-900/30 text-red-400 border border-red-500/30 p-4 rounded-lg my-4">
          <p>{error}</p>
        </div>
      )}

      {/* Calendar */}
      {!loading && (
        <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-800">
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-px bg-gray-800">
            {weekDays.map((day, index) => (
              <div key={index} className="bg-gray-800 py-2 text-center text-sm font-medium text-gray-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-px bg-gray-800">
            {days.map((day, index) => {
              const dayEvents = getEventsForDay(day.date)
              const isToday = day.date.toDateString() === new Date().toDateString()

              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 ${
                    day.isCurrentMonth ? "bg-gray-900" : "bg-gray-900/50 text-gray-500"
                  } ${isToday ? "bg-green-900/20 border border-green-500/30" : ""}`}
                >
                  <div className="flex justify-between">
                    <span
                      className={`text-sm font-medium ${
                        isToday
                          ? "h-6 w-6 rounded-full bg-green-500 text-black flex items-center justify-center"
                          : day.isCurrentMonth
                            ? "text-white"
                            : "text-gray-500"
                      }`}
                    >
                      {day.date.getDate()}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-xs text-gray-400">
                        {dayEvents.length} {dayEvents.length === 1 ? "tâche" : "tâches"}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 space-y-1 max-h-[80px] overflow-y-auto">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => handleTaskClick(event)}
                        className={`px-2 py-1 text-xs rounded-md truncate cursor-pointer hover:opacity-80 ${
                          event.type === "maintenance"
                            ? "bg-blue-900/20 text-blue-400 border border-blue-500/30"
                            : event.type === "repair"
                              ? "bg-yellow-900/20 text-yellow-400 border border-yellow-500/30"
                              : event.type === "diagnostic"
                                ? "bg-purple-900/20 text-purple-400 border border-purple-500/30"
                                : event.type === "electrical"
                                  ? "bg-red-900/20 text-red-400 border border-red-500/30"
                                  : event.type === "suspension"
                                    ? "bg-orange-900/20 text-orange-400 border border-orange-500/30"
                                    : event.type === "climate"
                                      ? "bg-teal-900/20 text-teal-400 border border-teal-500/30"
                                      : "bg-green-900/20 text-green-400 border border-green-500/30"
                        }`}
                      >
                        <div className="font-medium">
                          {formatTime(event.start)} - {event.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      {!loading && (
        <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
          <h3 className="text-lg font-medium text-white mb-4">Interventions à venir</h3>
          <div className="space-y-4">
            {events
              .filter((event) => event.start >= new Date())
              .sort((a, b) => a.start - b.start)
              .slice(0, 5)
              .map((event) => (
                <div
                  key={event.id}
                  className="flex items-start p-3 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-green-500/30 transition-colors"
                  onClick={() => handleTaskClick(event)}
                >
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="text-sm font-medium text-white">
                      {event.start.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                    </div>
                    <div className="text-sm text-gray-400">{formatTime(event.start)}</div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-white">{event.title}</h4>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          event.type === "maintenance"
                            ? "bg-blue-900/20 text-blue-400 border border-blue-500/30"
                            : event.type === "repair"
                              ? "bg-yellow-900/20 text-yellow-400 border border-yellow-500/30"
                              : event.type === "diagnostic"
                                ? "bg-purple-900/20 text-purple-400 border border-purple-500/30"
                                : event.type === "electrical"
                                  ? "bg-red-900/20 text-red-400 border border-red-500/30"
                                  : event.type === "suspension"
                                    ? "bg-orange-900/20 text-orange-400 border border-orange-500/30"
                                    : event.type === "climate"
                                      ? "bg-teal-900/20 text-teal-400 border border-teal-500/30"
                                      : "bg-green-900/20 text-green-400 border border-green-500/30"
                        }`}
                      >
                        {event.type === "maintenance"
                          ? "Maintenance"
                          : event.type === "repair"
                            ? "Réparation"
                            : event.type === "diagnostic"
                              ? "Diagnostic"
                              : event.type === "electrical"
                                ? "Électrique"
                                : event.type === "suspension"
                                  ? "Suspension"
                                  : event.type === "climate"
                                    ? "Climatisation"
                                    : "Inspection"}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-400">
                      {event.vehicle} - {event.plate}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Task Modal */}
      {showTaskModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-800">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-800">
              <h3 className="text-xl font-semibold text-white">Détails de la tâche</h3>
              <button
                onClick={() => setShowTaskModal(false)}
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

            {/* Task Content */}
            <div className="p-6">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 mb-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-white">{selectedTask.title}</h2>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      selectedTask.type === "maintenance"
                        ? "bg-blue-900/20 text-blue-400 border border-blue-500/30"
                        : selectedTask.type === "repair"
                          ? "bg-yellow-900/20 text-yellow-400 border border-yellow-500/30"
                          : selectedTask.type === "diagnostic"
                            ? "bg-purple-900/20 text-purple-400 border border-purple-500/30"
                            : selectedTask.type === "electrical"
                              ? "bg-red-900/20 text-red-400 border border-red-500/30"
                              : selectedTask.type === "suspension"
                                ? "bg-orange-900/20 text-orange-400 border border-orange-500/30"
                                : selectedTask.type === "climate"
                                  ? "bg-teal-900/20 text-teal-400 border border-teal-500/30"
                                  : "bg-green-900/20 text-green-400 border border-green-500/30"
                    }`}
                  >
                    {selectedTask.type === "maintenance"
                      ? "Maintenance"
                      : selectedTask.type === "repair"
                        ? "Réparation"
                        : selectedTask.type === "diagnostic"
                          ? "Diagnostic"
                          : selectedTask.type === "electrical"
                            ? "Électrique"
                            : selectedTask.type === "suspension"
                              ? "Suspension"
                              : selectedTask.type === "climate"
                                ? "Climatisation"
                                : "Inspection"}
                  </span>
                </div>
                {selectedTask.description && <p className="text-gray-400 mt-2">{selectedTask.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Véhicule</h4>
                  <p className="text-white">{selectedTask.vehicle}</p>
                  <p className="text-sm text-gray-400">{selectedTask.plate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Date & Heure</h4>
                  <p className="text-white">
                    {selectedTask.start.toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-400">
                    {formatTime(selectedTask.start)} - {formatTime(selectedTask.end)}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-400 mb-1">Durée estimée</h4>
                <p className="text-white">
                  {Math.round((selectedTask.end - selectedTask.start) / (1000 * 60))} minutes
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Actions</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTask.status === "pending" && (
                    <button
                      onClick={() => updateTaskStatus(selectedTask.id, "IN_PROGRESS")}
                      className="px-4 py-2 bg-green-900/30 text-green-400 border border-green-500/30 rounded-md hover:bg-green-900/50 transition-colors"
                    >
                      Démarrer
                    </button>
                  )}
                  {selectedTask.status === "in-progress" && (
                    <button
                      onClick={() => updateTaskStatus(selectedTask.id, "COMPLETED")}
                      className="px-4 py-2 bg-green-900/30 text-green-400 border border-green-500/30 rounded-md hover:bg-green-900/50 transition-colors"
                    >
                      Terminer
                    </button>
                  )}
                  <button className="px-4 py-2 bg-blue-900/30 text-blue-400 border border-blue-500/30 rounded-md hover:bg-blue-900/50 transition-colors">
                    Reprogrammer
                  </button>
                  <button className="px-4 py-2 bg-red-900/30 text-red-400 border border-red-500/30 rounded-md hover:bg-red-900/50 transition-colors">
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MaintenancePlanning
