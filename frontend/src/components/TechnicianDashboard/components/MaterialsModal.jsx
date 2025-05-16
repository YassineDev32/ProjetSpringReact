"use client"

import { useState, useEffect } from "react"

const MaterialsModal = ({ task, onClose }) => {
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [totalCost, setTotalCost] = useState(0)

  // Données fixes pour les matériaux selon le type de tâche
  const materialsByType = {
    electrical: [
      { id: 1, name: "Batterie Standard 45Ah", price: 89.99, brand: "Bosch" },
      { id: 2, name: "Batterie Premium 60Ah", price: 129.99, brand: "Varta" },
      { id: 3, name: "Batterie Haute Performance 75Ah", price: 169.99, brand: "Exide" },
      { id: 4, name: "Alternateur reconditionné", price: 249.99, brand: "Valeo" },
      { id: 5, name: "Kit câbles de démarrage", price: 34.99, brand: "Norauto" },
    ],
    maintenance: [
      { id: 1, name: "Huile moteur 5W30 (5L)", price: 39.99, brand: "Total" },
      { id: 2, name: "Huile moteur 10W40 (5L)", price: 35.99, brand: "Castrol" },
      { id: 3, name: "Filtre à huile", price: 12.99, brand: "Mann-Filter" },
      { id: 4, name: "Filtre à air", price: 15.99, brand: "Bosch" },
      { id: 5, name: "Kit vidange complet", price: 59.99, brand: "Motul" },
    ],
    repair: [
      { id: 1, name: "Plaquettes de frein avant", price: 45.99, brand: "Ferodo" },
      { id: 2, name: "Plaquettes de frein arrière", price: 39.99, brand: "Brembo" },
      { id: 3, name: "Disques de frein avant (paire)", price: 89.99, brand: "ATE" },
      { id: 4, name: "Liquide de frein DOT4 (1L)", price: 12.99, brand: "Motul" },
      { id: 5, name: "Kit de purge de frein", price: 24.99, brand: "Facom" },
    ],
    suspension: [
      { id: 1, name: "Amortisseurs avant (paire)", price: 159.99, brand: "Bilstein" },
      { id: 2, name: "Amortisseurs arrière (paire)", price: 139.99, brand: "KYB" },
      { id: 3, name: "Ressorts avant (paire)", price: 89.99, brand: "Lesjöfors" },
      { id: 4, name: "Kit de protection amortisseur", price: 19.99, brand: "Sachs" },
      { id: 5, name: "Coupelles de suspension", price: 34.99, brand: "Monroe" },
    ],
    climate: [
      { id: 1, name: "Recharge gaz R134a", price: 59.99, brand: "Clim" },
      { id: 2, name: "Compresseur de climatisation", price: 289.99, brand: "Denso" },
      { id: 3, name: "Filtre habitacle", price: 19.99, brand: "Mann-Filter" },
      { id: 4, name: "Détecteur de fuites", price: 29.99, brand: "Würth" },
      { id: 5, name: "Huile PAG 100", price: 24.99, brand: "Valeo" },
    ],
    inspection: [
      { id: 1, name: "Kit d'inspection complet", price: 79.99, brand: "Bosch" },
      { id: 2, name: "Liquide lave-glace (5L)", price: 9.99, brand: "Total" },
      { id: 3, name: "Balais d'essuie-glace (paire)", price: 29.99, brand: "Valeo" },
      { id: 4, name: "Ampoules de phare (kit)", price: 19.99, brand: "Philips" },
      { id: 5, name: "Bombe anti-crevaison", price: 14.99, brand: "Michelin" },
    ],
  }

  // Sélectionner les matériaux appropriés pour cette tâche
  const availableMaterials = materialsByType[task.type] || []

  // Mettre à jour le coût total lorsque les matériaux sélectionnés changent
  useEffect(() => {
    const newTotal = selectedMaterials.reduce((sum, material) => sum + material.price, 0)
    setTotalCost(newTotal)
  }, [selectedMaterials])

  const toggleMaterial = (material) => {
    if (selectedMaterials.some((m) => m.id === material.id)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m.id !== material.id))
    } else {
      setSelectedMaterials([...selectedMaterials, material])
    }
  }

  const handleSubmit = () => {
    // Ici, vous pourriez envoyer les données au backend
    console.log("Tâche démarrée avec les matériaux:", selectedMaterials)
    console.log("Coût total:", totalCost)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gray-900 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-gray-800">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-800">
          <h3 className="text-xl font-semibold text-white">Démarrer la tâche</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white focus:outline-none" aria-label="Fermer">
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
        <div className="px-6 py-4 border-b border-gray-800 bg-gray-800/50">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h4 className="text-lg font-medium text-white">{task.title}</h4>
              <p className="text-sm text-gray-400 mt-1">{task.description}</p>
            </div>
            <div className="mt-2 md:mt-0 flex items-center">
              <div className="bg-green-900/30 border border-green-500/50 rounded-lg px-4 py-2 text-center">
                <p className="text-sm text-gray-400">Coût total</p>
                <p className="text-xl font-bold text-green-400">{totalCost.toFixed(2)} €</p>
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs rounded-full bg-blue-900/30 text-blue-400 border border-blue-500/30">
              {task.vehicle} - {task.plate}
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-900/30 text-yellow-400 border border-yellow-500/30">
              {task.date} - {task.time}
            </span>
          </div>
        </div>

        {/* Materials Selection */}
        <div className="px-6 py-4 overflow-y-auto max-h-[40vh]">
          <h4 className="text-lg font-medium text-white mb-4">Sélectionnez les matériaux nécessaires</h4>
          <div className="space-y-3">
            {availableMaterials.map((material) => (
              <div
                key={material.id}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  selectedMaterials.some((m) => m.id === material.id)
                    ? "border-green-500 bg-green-900/20"
                    : "border-gray-700 hover:border-green-500/50"
                }`}
                onClick={() => toggleMaterial(material)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium text-white">{material.name}</h5>
                    <p className="text-sm text-gray-400">Marque: {material.brand}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 font-semibold mr-3">{material.price.toFixed(2)} €</span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        selectedMaterials.some((m) => m.id === material.id)
                          ? "bg-green-500 text-black"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {selectedMaterials.some((m) => m.id === material.id) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 mr-2"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md text-black bg-green-400 hover:bg-green-500 font-medium"
          >
            Démarrer la tâche
          </button>
        </div>
      </div>
    </div>
  )
}

export default MaterialsModal
