"use client"

import { useState } from "react"

const StockManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStock, setFilterStock] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    reference: "",
    category: "engine",
    quantity: 0,
    threshold: 5,
    price: 0,
    supplier: "",
    location: "",
    description: "",
  })

  // Données fictives pour la démonstration
  const stockItems = [
    {
      id: 1,
      name: "Huile moteur 5W30",
      reference: "OIL-5W30-5L",
      category: "fluids",
      quantity: 15,
      threshold: 5,
      price: 45.99,
      supplier: "Total",
      location: "Étagère A1",
      description: "Huile synthétique pour moteurs essence et diesel",
      lastUpdated: "2025-05-10",
    },
    {
      id: 2,
      name: "Filtre à huile",
      reference: "FH-1234",
      category: "filters",
      quantity: 8,
      threshold: 10,
      price: 12.5,
      supplier: "Bosch",
      location: "Étagère B2",
      description: "Compatible avec Renault, Peugeot, Citroën",
      lastUpdated: "2025-05-08",
    },
    {
      id: 3,
      name: "Plaquettes de frein avant",
      reference: "PF-2345",
      category: "brakes",
      quantity: 3,
      threshold: 4,
      price: 35.75,
      supplier: "Ferodo",
      location: "Étagère C3",
      description: "Pour Peugeot 308, Citroën C4",
      lastUpdated: "2025-05-12",
    },
    {
      id: 4,
      name: "Batterie 60Ah",
      reference: "BAT-60AH",
      category: "electrical",
      quantity: 2,
      threshold: 2,
      price: 89.99,
      supplier: "Varta",
      location: "Étagère D1",
      description: "Batterie de démarrage 12V 60Ah 540A",
      lastUpdated: "2025-05-05",
    },
    {
      id: 5,
      name: "Amortisseur avant",
      reference: "AM-3456",
      category: "suspension",
      quantity: 4,
      threshold: 2,
      price: 65.25,
      supplier: "KYB",
      location: "Étagère E2",
      description: "Pour Renault Clio IV",
      lastUpdated: "2025-05-09",
    },
    {
      id: 6,
      name: "Liquide de frein DOT 4",
      reference: "LF-DOT4-1L",
      category: "fluids",
      quantity: 6,
      threshold: 3,
      price: 15.99,
      supplier: "ATE",
      location: "Étagère A2",
      description: "Liquide de frein haute performance",
      lastUpdated: "2025-05-11",
    },
    {
      id: 7,
      name: "Filtre à air",
      reference: "FA-5678",
      category: "filters",
      quantity: 12,
      threshold: 5,
      price: 18.5,
      supplier: "Mann-Filter",
      location: "Étagère B3",
      description: "Compatible avec plusieurs modèles",
      lastUpdated: "2025-05-07",
    },
    {
      id: 8,
      name: "Courroie de distribution",
      reference: "CD-6789",
      category: "engine",
      quantity: 1,
      threshold: 2,
      price: 45.0,
      supplier: "Continental",
      location: "Étagère F1",
      description: "Pour moteurs 1.6 HDi",
      lastUpdated: "2025-05-06",
    },
  ]

  // Filtrer les articles
  const filteredItems = stockItems.filter(
    (item) =>
      (filterCategory === "all" || item.category === filterCategory) &&
      (filterStock === "all" ||
        (filterStock === "low" && item.quantity <= item.threshold) ||
        (filterStock === "out" && item.quantity === 0) ||
        (filterStock === "available" && item.quantity > 0)) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Gérer l'ouverture du modal pour ajouter/modifier un article
  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData(item)
      setSelectedItem(item)
    } else {
      setFormData({
        name: "",
        reference: "",
        category: "engine",
        quantity: 0,
        threshold: 5,
        price: 0,
        supplier: "",
        location: "",
        description: "",
      })
      setSelectedItem(null)
    }
    setShowModal(true)
  }

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()
    // Logique pour ajouter ou modifier un article
    console.log("Formulaire soumis:", formData)
    setShowModal(false)
  }

  // Fonctions pour obtenir les labels et couleurs
  const getCategoryLabel = (category) => {
    switch (category) {
      case "engine":
        return "Moteur"
      case "brakes":
        return "Freinage"
      case "suspension":
        return "Suspension"
      case "electrical":
        return "Électrique"
      case "filters":
        return "Filtres"
      case "fluids":
        return "Fluides"
      default:
        return category
    }
  }

  const getStockStatusColor = (quantity, threshold) => {
    if (quantity === 0) {
      return "bg-red-900/30 text-red-400 border border-red-500/30"
    } else if (quantity <= threshold) {
      return "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30"
    } else {
      return "bg-green-900/30 text-green-400 border border-green-500/30"
    }
  }

  const getStockStatusLabel = (quantity, threshold) => {
    if (quantity === 0) {
      return "Rupture"
    } else if (quantity <= threshold) {
      return "Faible"
    } else {
      return "Disponible"
    }
  }

  return (
    <div className="space-y-6 mt-12">
      {/* Header avec filtres et bouton d'ajout */}
      <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-white">Gestion du Stock</h2>
            <p className="text-sm text-gray-400 mt-1">Gérez les pièces détachées et les consommables</p>
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
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Toutes les catégories</option>
              <option value="engine">Moteur</option>
              <option value="brakes">Freinage</option>
              <option value="suspension">Suspension</option>
              <option value="electrical">Électrique</option>
              <option value="filters">Filtres</option>
              <option value="fluids">Fluides</option>
            </select>
            <select
              value={filterStock}
              onChange={(e) => setFilterStock(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Tous les stocks</option>
              <option value="low">Stock faible</option>
              <option value="out">Rupture de stock</option>
              <option value="available">Disponible</option>
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
                Nouvel Article
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistiques du stock */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-900/30 text-green-400 border border-green-500/30 mr-4">
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
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Total des articles</p>
              <p className="text-2xl font-semibold text-white">{stockItems.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-900/30 text-yellow-400 border border-yellow-500/30 mr-4">
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
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Stock faible</p>
              <p className="text-2xl font-semibold text-white">
                {stockItems.filter((item) => item.quantity <= item.threshold && item.quantity > 0).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-900/30 text-red-400 border border-red-500/30 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Rupture de stock</p>
              <p className="text-2xl font-semibold text-white">
                {stockItems.filter((item) => item.quantity === 0).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-900/30 text-blue-400 border border-blue-500/30 mr-4">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Valeur du stock</p>
              <p className="text-2xl font-semibold text-white">
                {stockItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} €
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des articles */}
      <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Article
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Référence
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Catégorie
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Quantité
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Prix unitaire
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Fournisseur
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Dernière MAJ
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
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-white">{item.name}</div>
                        <div className="text-xs text-gray-400">{item.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{item.reference}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{getCategoryLabel(item.category)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full mr-2 ${getStockStatusColor(
                          item.quantity,
                          item.threshold,
                        )}`}
                      >
                        {getStockStatusLabel(item.quantity, item.threshold)}
                      </span>
                      <span className="text-sm text-white">
                        {item.quantity} / {item.threshold}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{item.price.toFixed(2)} €</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{item.supplier}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{item.lastUpdated}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleOpenModal(item)} className="text-green-400 hover:text-green-300 mr-3">
                      Modifier
                    </button>
                    <button className="text-red-400 hover:text-red-300">Supprimer</button>
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
                <span className="font-medium">{filteredItems.length}</span> sur{" "}
                <span className="font-medium">{stockItems.length}</span> résultats
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

      {/* Modal pour ajouter/modifier un article */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-800">
              <h3 className="text-xl font-semibold text-white">
                {selectedItem ? "Modifier l'article" : "Nouvel article"}
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                    Nom de l'article
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="reference" className="block text-sm font-medium text-gray-400 mb-1">
                    Référence
                  </label>
                  <input
                    type="text"
                    id="reference"
                    value={formData.reference}
                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">
                    Catégorie
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="engine">Moteur</option>
                    <option value="brakes">Freinage</option>
                    <option value="suspension">Suspension</option>
                    <option value="electrical">Électrique</option>
                    <option value="filters">Filtres</option>
                    <option value="fluids">Fluides</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="supplier" className="block text-sm font-medium text-gray-400 mb-1">
                    Fournisseur
                  </label>
                  <input
                    type="text"
                    id="supplier"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-400 mb-1">
                    Quantité en stock
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="threshold" className="block text-sm font-medium text-gray-400 mb-1">
                    Seuil d'alerte
                  </label>
                  <input
                    type="number"
                    id="threshold"
                    min="0"
                    value={formData.threshold}
                    onChange={(e) => setFormData({ ...formData, threshold: Number.parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-400 mb-1">
                    Prix unitaire (€)
                  </label>
                  <input
                    type="number"
                    id="price"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-400 mb-1">
                    Emplacement
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
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
                  ></textarea>
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
                  {selectedItem ? "Mettre à jour" : "Ajouter l'article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default StockManagement
