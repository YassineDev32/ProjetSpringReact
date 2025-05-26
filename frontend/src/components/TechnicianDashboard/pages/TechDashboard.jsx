const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 flex items-center border border-gray-800 hover:border-green-500/50 transition-all">
      <div className={`p-3 rounded-full ${color} text-black mr-4`}>{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="text-2xl font-semibold text-white">{value}</p>
      </div>
    </div>
  )
}

const TaskItem = ({ task }) => {
  const statusColors = {
    "En attente": "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30",
    "En cours": "bg-blue-900/30 text-blue-400 border border-blue-500/30",
    Terminée: "bg-green-900/30 text-green-400 border border-green-500/30",
    Urgente: "bg-red-900/30 text-red-400 border border-red-500/30",
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-sm p-4 mb-3 hover:shadow-md transition-shadow border border-gray-800 hover:border-green-500/50">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-white">{task.title}</h3>
          <p className="text-sm text-gray-400 mt-1">{task.description}</p>
          <div className="flex items-center mt-2">
            <span className="text-xs text-gray-400 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
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
              {task.date}
            </span>
            <span className="text-xs text-gray-400 flex items-center ml-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {task.vehicle}
            </span>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${statusColors[task.status]}`}>{task.status}</span>
      </div>
    </div>
  )
}

const VehicleStatusItem = ({ vehicle }) => {
  const statusColors = {
    Disponible: "bg-green-500",
    "En maintenance": "bg-yellow-500",
    "Hors service": "bg-red-500",
  }

  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-800 last:border-0">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </div>
        <div>
          <p className="font-medium text-white">{vehicle.model}</p>
          <p className="text-xs text-gray-400">{vehicle.plate}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className={`w-3 h-3 rounded-full ${statusColors[vehicle.status]} mr-2`}></span>
        <span className="text-sm text-gray-300">{vehicle.status}</span>
      </div>
    </div>
  )
}

const TechDashboard = () => {
  // Données fixes pour la démonstration
  const stats = [
    {
      title: "Tâches en attente",
      value: "12",
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      color: "bg-green-400",
    },
    {
      title: "Tâches terminées",
      value: "48",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      color: "bg-green-400",
    },
    {
      title: "Véhicules en maintenance",
      value: "7",
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      color: "bg-green-400",
    },
    {
      title: "Taux de réussite",
      value: "94%",
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      color: "bg-green-400",
    },
  ]

  const tasks = [
    {
      title: "Vidange moteur",
      description: "Changement d'huile et filtre à huile",
      date: "Aujourd'hui, 14:30",
      vehicle: "Renault Clio - AB-123-CD",
      status: "En attente",
    },
    {
      title: "Remplacement plaquettes de frein",
      description: "Remplacement des plaquettes avant et arrière",
      date: "Aujourd'hui, 16:00",
      vehicle: "Peugeot 308 - EF-456-GH",
      status: "En cours",
    },
    {
      title: "Diagnostic système électrique",
      description: "Problème de démarrage intermittent",
      date: "Demain, 09:15",
      vehicle: "Citroën C3 - IJ-789-KL",
      status: "Urgente",
    },
    {
      title: "Contrôle technique",
      description: "Préparation et passage au contrôle technique",
      date: "Demain, 11:00",
      vehicle: "Volkswagen Golf - MN-012-OP",
      status: "En attente",
    },
  ]

  const vehicles = [
    {
      model: "Renault Clio",
      plate: "AB-123-CD",
      status: "En maintenance",
    },
    {
      model: "Peugeot 308",
      plate: "EF-456-GH",
      status: "En maintenance",
    },
    {
      model: "Citroën C3",
      plate: "IJ-789-KL",
      status: "Hors service",
    },
    {
      model: "Volkswagen Golf",
      plate: "MN-012-OP",
      status: "Disponible",
    },
    {
      model: "Toyota Yaris",
      plate: "QR-345-ST",
      status: "Disponible",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks Section */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-white">Tâches à venir</h2>
              
            </div>
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <TaskItem key={index} task={task} />
              ))}
            </div>
          </div>
        </div>

        {/* Vehicle Status Section */}
        <div>
          <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-white">État des véhicules</h2>
              
            </div>
            <div>
              {vehicles.map((vehicle, index) => (
                <VehicleStatusItem key={index} vehicle={vehicle} />
              ))}
            </div>
          </div>

          {/* Maintenance Calendar Preview */}
          <div className="bg-gray-900 rounded-lg shadow-md p-6 mt-6 border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Planning du jour</h2>
              <button className="text-green-400 hover:text-green-300 text-sm font-medium">Calendrier complet</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <div className="flex-shrink-0 w-2 h-10 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-white">Vidange moteur</p>
                  <p className="text-xs text-gray-400">14:30 - 15:30 • Renault Clio</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <div className="flex-shrink-0 w-2 h-10 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-white">Remplacement plaquettes</p>
                  <p className="text-xs text-gray-400">16:00 - 17:30 • Peugeot 308</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TechDashboard
