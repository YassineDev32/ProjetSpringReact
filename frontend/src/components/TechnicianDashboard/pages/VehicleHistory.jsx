"use client"

import { useState } from "react"

const VehicleHistory = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  // Données fixes pour la démonstration
  const vehicles = [
    {
      id: 1,
      model: "Renault Clio",
      plate: "AB-123-CD",
      year: 2018,
      status: "En maintenance",
    },
    {
      id: 2,
      model: "Peugeot 308",
      plate: "EF-456-GH",
      year: 2019,
      status: "En maintenance",
    },
    {
      id: 3,
      model: "Citroën C3",
      plate: "IJ-789-KL",
      year: 2017,
      status: "Hors service",
    },
    {
      id: 4,
      model: "Volkswagen Golf",
      plate: "MN-012-OP",
      year: 2020,
      status: "Disponible",
    },
    {
      id: 5,
      model: "Toyota Yaris",
      plate: "QR-345-ST",
      year: 2021,
      status: "Disponible",
    },
  ]

  // Historique des tâches du technicien
  const technicianHistory = [
    {
      id: 1,
      date: "2023-05-01",
      vehicle: {
        id: 1,
        model: "Renault Clio",
        plate: "AB-123-CD",
      },
      task: "Vidange moteur",
      description: "Changement d'huile et filtre à huile",
      materials: [
        { name: "Huile moteur 5W30", quantity: 5, price: 15 },
        { name: "Filtre à huile", quantity: 1, price: 12 },
      ],
      totalCost: 120,
      duration: "1h",
      status: "completed",
    },
    {
      id: 2,
      date: "2023-04-28",
      vehicle: {
        id: 2,
        model: "Peugeot 308",
        plate: "EF-456-GH",
      },
      task: "Remplacement plaquettes de frein",
      description: "Remplacement plaquettes avant et arrière",
      materials: [
        { name: "Plaquettes de frein avant", quantity: 1, price: 45 },
        { name: "Plaquettes de frein arrière", quantity: 1, price: 40 },
        { name: "Liquide de frein", quantity: 1, price: 15 },
      ],
      totalCost: 180,
      duration: "1h30",
      status: "completed",
    },
    {
      id: 3,
      date: "2023-04-25",
      vehicle: {
        id: 3,
        model: "Citroën C3",
        plate: "IJ-789-KL",
      },
      task: "Diagnostic système électrique",
      description: "Problème de démarrage intermittent - Batterie défectueuse",
      materials: [
        { name: "Batterie Premium 60Ah", quantity: 1, price: 129.99 },
        { name: "Kit câbles de démarrage", quantity: 1, price: 34.99 },
      ],
      totalCost: 220,
      duration: "1h15",
      status: "completed",
    },
    {
      id: 4,
      date: "2023-04-20",
      vehicle: {
        id: 4,
        model: "Volkswagen Golf",
        plate: "MN-012-OP",
      },
      task: "Contrôle technique",
      description: "Préparation et passage au contrôle technique",
      materials: [{ name: "Kit d'inspection complet", quantity: 1, price: 79.99 }],
      totalCost: 80,
      duration: "1h30",
      status: "completed",
    },
    {
      id: 5,
      date: "2023-04-15",
      vehicle: {
        id: 5,
        model: "Toyota Yaris",
        plate: "QR-345-ST",
      },
      task: "Changement courroie de distribution",
      description: "Remplacement de la courroie et vérification de la pompe à eau",
      materials: [
        { name: "Kit courroie de distribution", quantity: 1, price: 120 },
        { name: "Pompe à eau", quantity: 1, price: 85 },
        { name: "Liquide de refroidissement", quantity: 2, price: 15 },
      ],
      totalCost: 350,
      duration: "2h",
      status: "completed",
    },
  ]

  // Filtrer l'historique pour le véhicule sélectionné
  const filteredHistory = selectedVehicle
    ? technicianHistory.filter((item) => item.vehicle.id === selectedVehicle.id)
    : technicianHistory

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white">Historique des interventions</h2>
        <p className="text-sm text-gray-400 mt-1">Consultez l'historique complet de vos interventions</p>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle list */}
        <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
          <h3 className="text-lg font-medium text-white mb-4">Véhicules</h3>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Rechercher un véhicule..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            <div
              onClick={() => setSelectedVehicle(null)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                !selectedVehicle
                  ? "bg-green-900/20 border border-green-500/30"
                  : "hover:bg-gray-800 border border-gray-800 hover:border-green-500/30"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-white">Tous les véhicules</h4>
                  <p className="text-sm text-gray-400">Afficher toutes les interventions</p>
                </div>
              </div>
            </div>
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                onClick={() => setSelectedVehicle(vehicle)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedVehicle && selectedVehicle.id === vehicle.id
                    ? "bg-green-900/20 border border-green-500/30"
                    : "hover:bg-gray-800 border border-gray-800 hover:border-green-500/30"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-white">{vehicle.model}</h4>
                    <p className="text-sm text-gray-400">
                      {vehicle.plate} • {vehicle.year}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      vehicle.status === "Disponible"
                        ? "bg-green-900/30 text-green-400 border border-green-500/30"
                        : vehicle.status === "En maintenance"
                          ? "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30"
                          : "bg-red-900/30 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance history */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-medium text-white">
                  {selectedVehicle ? selectedVehicle.model : "Toutes les interventions"}
                </h3>
                <p className="text-sm text-gray-400">
                  {selectedVehicle
                    ? `Immatriculation: ${selectedVehicle.plate} • Année: ${selectedVehicle.year}`
                    : "Historique complet de vos interventions"}
                </p>
              </div>
              {selectedVehicle && (
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    selectedVehicle.status === "Disponible"
                      ? "bg-green-900/30 text-green-400 border border-green-500/30"
                      : selectedVehicle.status === "En maintenance"
                        ? "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30"
                        : "bg-red-900/30 text-red-400 border border-red-500/30"
                  }`}
                >
                  {selectedVehicle.status}
                </span>
              )}
            </div>

            {filteredHistory.length > 0 ? (
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-800"></div>
                  {filteredHistory
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((item, index) => (
                      <div key={item.id} className="relative pl-10 pb-8">
                        <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-green-900/30 border border-green-500/30 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-green-500/30 transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-white">{item.task}</h4>
                              <p className="text-sm text-gray-400 mt-1">
                                {new Date(item.date).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                            <span className="text-sm font-medium text-green-400">{item.totalCost.toFixed(2)} €</span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-900/30 text-blue-400 border border-blue-500/30">
                              {item.vehicle.model} - {item.vehicle.plate}
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-purple-900/30 text-purple-400 border border-purple-500/30">
                              Durée: {item.duration}
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-green-900/30 text-green-400 border border-green-500/30">
                              {item.status === "completed" ? "Terminée" : "En cours"}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-gray-300">{item.description}</p>

                          {item.materials.length > 0 && (
                            <div className="mt-3">
                              <h5 className="text-sm font-medium text-gray-300 mb-2">Pièces utilisées:</h5>
                              <div className="bg-gray-900 rounded-md p-2 border border-gray-700">
                                {item.materials.map((part, partIndex) => (
                                  <div key={partIndex} className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                      {part.name} (x{part.quantity})
                                    </span>
                                    <span className="text-green-400">{(part.price * part.quantity).toFixed(2)} €</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h4 className="mt-2 text-lg font-medium text-white">Aucun historique disponible</h4>
                <p className="mt-1 text-gray-400">Aucune intervention n'a été enregistrée pour ce véhicule.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleHistory
