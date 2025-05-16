"use client"

import { useState } from "react"

const MaintenancePlanning = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [view, setView] = useState("month") // "month", "week", "day"

  // Données fixes pour la démonstration
  const events = [
    // Mai 2023
    {
      id: 1,
      title: "Vidange moteur",
      vehicle: "Renault Clio",
      plate: "AB-123-CD",
      start: new Date(2025, 4, 3, 14, 30),
      end: new Date(2025, 4, 3, 15, 30),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Remplacement plaquettes de frein",
      vehicle: "Peugeot 308",
      plate: "EF-456-GH",
      start: new Date(2025, 4, 7, 16, 0),
      end: new Date(2025, 4, 7, 17, 30),
      type: "repair",
      status: "scheduled",
    },
    {
      id: 3,
      title: "Diagnostic système électrique",
      vehicle: "Citroën C3",
      plate: "IJ-789-KL",
      start: new Date(2025, 4, 16, 9, 15),
      end: new Date(2025, 4, 16, 10, 30),
      type: "diagnostic",
      status: "scheduled",
    },
    {
      id: 4,
      title: "Contrôle technique",
      vehicle: "Volkswagen Golf",
      plate: "MN-012-OP",
      start: new Date(2025, 4, 19, 11, 0),
      end: new Date(2025, 4, 19, 12, 30),
      type: "inspection",
      status: "scheduled",
    },
    {
      id: 5,
      title: "Changement courroie de distribution",
      vehicle: "Toyota Yaris",
      plate: "QR-345-ST",
      start: new Date(2025, 4, 29, 10, 0),
      end: new Date(2025, 4, 29, 12, 0),
      type: "maintenance",
      status: "scheduled",
    },

    // Juin 2023
    {
      id: 6,
      title: "Remplacement amortisseurs",
      vehicle: "Peugeot 208",
      plate: "YZ-901-AB",
      start: new Date(2025, 5, 5, 9, 0),
      end: new Date(2025, 5, 5, 11, 30),
      type: "suspension",
      status: "scheduled",
    },
    {
      id: 7,
      title: "Réparation climatisation",
      vehicle: "Renault Megane",
      plate: "UV-678-WX",
      start: new Date(2025, 5, 12, 14, 0),
      end: new Date(2025, 5, 12, 16, 0),
      type: "climate",
      status: "scheduled",
    },
    {
      id: 8,
      title: "Changement batterie",
      vehicle: "Citroën C3",
      plate: "IJ-789-KL",
      start: new Date(2025, 5, 18, 10, 30),
      end: new Date(2025, 5, 18, 11, 30),
      type: "electrical",
      status: "scheduled",
    },
    {
      id: 9,
      title: "Vidange boîte de vitesse",
      vehicle: "Volkswagen Golf",
      plate: "MN-012-OP",
      start: new Date(2025, 5, 22, 14, 0),
      end: new Date(2025, 5, 22, 16, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 10,
      title: "Remplacement pneus",
      vehicle: "Renault Clio",
      plate: "AB-123-CD",
      start: new Date(2025, 5, 28, 9, 0),
      end: new Date(2025, 5, 28, 11, 0),
      type: "maintenance",
      status: "scheduled",
    },

    // Juillet 2023
    {
      id: 11,
      title: "Équilibrage roues",
      vehicle: "Toyota Yaris",
      plate: "QR-345-ST",
      start: new Date(2025, 6, 3, 14, 0),
      end: new Date(2025, 6, 3, 15, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 12,
      title: "Révision complète",
      vehicle: "Peugeot 308",
      plate: "EF-456-GH",
      start: new Date(2025, 6, 10, 9, 0),
      end: new Date(2025, 6, 10, 16, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 13,
      title: "Remplacement filtre à air",
      vehicle: "Citroën C3",
      plate: "IJ-789-KL",
      start: new Date(2025, 6, 17, 11, 0),
      end: new Date(2025, 6, 17, 12, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 14,
      title: "Diagnostic électronique",
      vehicle: "Volkswagen Golf",
      plate: "MN-012-OP",
      start: new Date(2025, 6, 24, 14, 30),
      end: new Date(2025, 6, 24, 15, 30),
      type: "diagnostic",
      status: "scheduled",
    },
    {
      id: 15,
      title: "Réparation démarreur",
      vehicle: "Renault Clio",
      plate: "AB-123-CD",
      start: new Date(2025, 6, 31, 10, 0),
      end: new Date(2025, 6, 31, 12, 0),
      type: "electrical",
      status: "scheduled",
    },

    // Août 2023
    {
      id: 16,
      title: "Vidange moteur",
      vehicle: "Peugeot 208",
      plate: "YZ-901-AB",
      start: new Date(2025, 7, 7, 9, 0),
      end: new Date(2025, 7, 7, 10, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 17,
      title: "Remplacement bougies",
      vehicle: "Toyota Yaris",
      plate: "QR-345-ST",
      start: new Date(2023, 7, 14, 11, 0),
      end: new Date(2023, 7, 14, 12, 30),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 18,
      title: "Contrôle géométrie",
      vehicle: "Renault Megane",
      plate: "UV-678-WX",
      start: new Date(2023, 7, 21, 14, 0),
      end: new Date(2023, 7, 21, 15, 30),
      type: "inspection",
      status: "scheduled",
    },
    {
      id: 19,
      title: "Remplacement courroie accessoires",
      vehicle: "Citroën C3",
      plate: "IJ-789-KL",
      start: new Date(2023, 7, 28, 9, 30),
      end: new Date(2023, 7, 28, 11, 30),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 20,
      title: "Réparation échappement",
      vehicle: "Volkswagen Golf",
      plate: "MN-012-OP",
      start: new Date(2023, 7, 31, 14, 0),
      end: new Date(2023, 7, 31, 16, 0),
      type: "repair",
      status: "scheduled",
    },

    // Septembre 2023
    {
      id: 21,
      title: "Vidange moteur",
      vehicle: "Renault Clio",
      plate: "AB-123-CD",
      start: new Date(2023, 8, 4, 10, 0),
      end: new Date(2023, 8, 4, 11, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 22,
      title: "Remplacement filtre à carburant",
      vehicle: "Peugeot 308",
      plate: "EF-456-GH",
      start: new Date(2023, 8, 11, 14, 0),
      end: new Date(2023, 8, 11, 15, 30),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 23,
      title: "Diagnostic ABS",
      vehicle: "Toyota Yaris",
      plate: "QR-345-ST",
      start: new Date(2023, 8, 18, 9, 0),
      end: new Date(2023, 8, 18, 10, 30),
      type: "diagnostic",
      status: "scheduled",
    },
    {
      id: 24,
      title: "Remplacement liquide de refroidissement",
      vehicle: "Citroën C3",
      plate: "IJ-789-KL",
      start: new Date(2023, 8, 25, 11, 0),
      end: new Date(2023, 8, 25, 12, 30),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 25,
      title: "Contrôle technique",
      vehicle: "Peugeot 208",
      plate: "YZ-901-AB",
      start: new Date(2023, 8, 29, 14, 0),
      end: new Date(2023, 8, 29, 16, 0),
      type: "inspection",
      status: "scheduled",
    },

    // Octobre 2023
    {
      id: 26,
      title: "Vidange moteur",
      vehicle: "Volkswagen Golf",
      plate: "MN-012-OP",
      start: new Date(2023, 9, 2, 9, 0),
      end: new Date(2023, 9, 2, 10, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 27,
      title: "Remplacement plaquettes de frein",
      vehicle: "Renault Megane",
      plate: "UV-678-WX",
      start: new Date(2023, 9, 9, 11, 0),
      end: new Date(2023, 9, 9, 12, 30),
      type: "repair",
      status: "scheduled",
    },
    {
      id: 28,
      title: "Diagnostic système électrique",
      vehicle: "Toyota Yaris",
      plate: "QR-345-ST",
      start: new Date(2023, 9, 16, 14, 0),
      end: new Date(2023, 9, 16, 15, 30),
      type: "diagnostic",
      status: "scheduled",
    },
    {
      id: 29,
      title: "Remplacement amortisseurs arrière",
      vehicle: "Renault Clio",
      plate: "AB-123-CD",
      start: new Date(2023, 9, 23, 9, 0),
      end: new Date(2023, 9, 23, 11, 30),
      type: "suspension",
      status: "scheduled",
    },
    {
      id: 30,
      title: "Révision climatisation",
      vehicle: "Peugeot 308",
      plate: "EF-456-GH",
      start: new Date(2023, 9, 30, 14, 0),
      end: new Date(2023, 9, 30, 16, 0),
      type: "climate",
      status: "scheduled",
    },

    // Novembre 2023
    {
      id: 31,
      title: "Vidange moteur",
      vehicle: "Citroën C3",
      plate: "IJ-789-KL",
      start: new Date(2023, 10, 6, 10, 0),
      end: new Date(2023, 10, 6, 11, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 32,
      title: "Remplacement batterie",
      vehicle: "Volkswagen Golf",
      plate: "MN-012-OP",
      start: new Date(2023, 10, 13, 14, 0),
      end: new Date(2023, 10, 13, 15, 0),
      type: "electrical",
      status: "scheduled",
    },
    {
      id: 33,
      title: "Contrôle géométrie",
      vehicle: "Peugeot 208",
      plate: "YZ-901-AB",
      start: new Date(2023, 10, 20, 9, 0),
      end: new Date(2023, 10, 20, 10, 30),
      type: "inspection",
      status: "scheduled",
    },
    {
      id: 34,
      title: "Remplacement disques de frein",
      vehicle: "Toyota Yaris",
      plate: "QR-345-ST",
      start: new Date(2023, 10, 27, 11, 0),
      end: new Date(2023, 10, 27, 13, 0),
      type: "repair",
      status: "scheduled",
    },
    {
      id: 35,
      title: "Diagnostic OBD",
      vehicle: "Renault Megane",
      plate: "UV-678-WX",
      start: new Date(2023, 10, 30, 14, 30),
      end: new Date(2023, 10, 30, 15, 30),
      type: "diagnostic",
      status: "scheduled",
    },

    // Décembre 2023
    {
      id: 36,
      title: "Vidange moteur",
      vehicle: "Renault Clio",
      plate: "AB-123-CD",
      start: new Date(2023, 11, 4, 9, 0),
      end: new Date(2023, 11, 4, 10, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 37,
      title: "Remplacement filtre habitacle",
      vehicle: "Peugeot 308",
      plate: "EF-456-GH",
      start: new Date(2023, 11, 11, 11, 0),
      end: new Date(2023, 11, 11, 12, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 38,
      title: "Contrôle technique",
      vehicle: "Citroën C3",
      plate: "IJ-789-KL",
      start: new Date(2023, 11, 18, 14, 0),
      end: new Date(2023, 11, 18, 16, 0),
      type: "inspection",
      status: "scheduled",
    },
    {
      id: 39,
      title: "Remplacement courroie de distribution",
      vehicle: "Volkswagen Golf",
      plate: "MN-012-OP",
      start: new Date(2023, 11, 25, 9, 0),
      end: new Date(2023, 11, 25, 12, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 40,
      title: "Diagnostic système électrique",
      vehicle: "Toyota Yaris",
      plate: "QR-345-ST",
      start: new Date(2023, 11, 28, 14, 0),
      end: new Date(2023, 11, 28, 15, 30),
      type: "diagnostic",
      status: "scheduled",
    },

    // Janvier 2024
    {
      id: 41,
      title: "Vidange moteur",
      vehicle: "Peugeot 208",
      plate: "YZ-901-AB",
      start: new Date(2024, 0, 8, 10, 0),
      end: new Date(2024, 0, 8, 11, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 42,
      title: "Remplacement plaquettes de frein",
      vehicle: "Renault Megane",
      plate: "UV-678-WX",
      start: new Date(2024, 0, 15, 14, 0),
      end: new Date(2024, 0, 15, 15, 30),
      type: "repair",
      status: "scheduled",
    },
    {
      id: 43,
      title: "Diagnostic ABS",
      vehicle: "Renault Clio",
      plate: "AB-123-CD",
      start: new Date(2024, 0, 22, 9, 0),
      end: new Date(2024, 0, 22, 10, 30),
      type: "diagnostic",
      status: "scheduled",
    },
    {
      id: 44,
      title: "Remplacement amortisseurs",
      vehicle: "Peugeot 308",
      plate: "EF-456-GH",
      start: new Date(2024, 0, 29, 11, 0),
      end: new Date(2024, 0, 29, 13, 30),
      type: "suspension",
      status: "scheduled",
    },
    {
      id: 45,
      title: "Révision complète",
      vehicle: "Citroën C3",
      plate: "IJ-789-KL",
      start: new Date(2024, 0, 31, 14, 0),
      end: new Date(2024, 0, 31, 17, 0),
      type: "maintenance",
      status: "scheduled",
    },

    // Février 2024
    {
      id: 46,
      title: "Vidange moteur",
      vehicle: "Volkswagen Golf",
      plate: "MN-012-OP",
      start: new Date(2024, 1, 5, 9, 0),
      end: new Date(2024, 1, 5, 10, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 47,
      title: "Remplacement batterie",
      vehicle: "Toyota Yaris",
      plate: "QR-345-ST",
      start: new Date(2024, 1, 12, 11, 0),
      end: new Date(2024, 1, 12, 12, 0),
      type: "electrical",
      status: "scheduled",
    },
    {
      id: 48,
      title: "Contrôle technique",
      vehicle: "Peugeot 208",
      plate: "YZ-901-AB",
      start: new Date(2024, 1, 19, 14, 0),
      end: new Date(2024, 1, 19, 16, 0),
      type: "inspection",
      status: "scheduled",
    },
    {
      id: 49,
      title: "Remplacement disques de frein",
      vehicle: "Renault Megane",
      plate: "UV-678-WX",
      start: new Date(2024, 1, 26, 9, 0),
      end: new Date(2024, 1, 26, 11, 0),
      type: "repair",
      status: "scheduled",
    },
    {
      id: 50,
      title: "Diagnostic système électrique",
      vehicle: "Renault Clio",
      plate: "AB-123-CD",
      start: new Date(2024, 1, 28, 14, 0),
      end: new Date(2024, 1, 28, 15, 30),
      type: "diagnostic",
    },

    // Mars 2024
    {
      id: 51,
      title: "Vidange moteur",
      vehicle: "Peugeot 308",
      plate: "EF-456-GH",
      start: new Date(2024, 2, 4, 10, 0),
      end: new Date(2024, 2, 4, 11, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 52,
      title: "Remplacement filtre à air",
      vehicle: "Citroën C3",
      plate: "IJ-789-KL",
      start: new Date(2024, 2, 11, 14, 0),
      end: new Date(2024, 2, 11, 15, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 53,
      title: "Diagnostic OBD",
      vehicle: "Volkswagen Golf",
      plate: "MN-012-OP",
      start: new Date(2024, 2, 18, 9, 0),
      end: new Date(2024, 2, 18, 10, 30),
      type: "diagnostic",
      status: "scheduled",
    },
    {
      id: 54,
      title: "Remplacement courroie accessoires",
      vehicle: "Toyota Yaris",
      plate: "QR-345-ST",
      start: new Date(2024, 2, 25, 11, 0),
      end: new Date(2024, 2, 25, 12, 30),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 55,
      title: "Contrôle géométrie",
      vehicle: "Peugeot 208",
      plate: "YZ-901-AB",
      start: new Date(2024, 2, 29, 14, 0),
      end: new Date(2024, 2, 29, 15, 30),
      type: "inspection",
      status: "scheduled",
    },

    // Avril 2024
    {
      id: 56,
      title: "Vidange moteur",
      vehicle: "Renault Megane",
      plate: "UV-678-WX",
      start: new Date(2024, 3, 1, 9, 0),
      end: new Date(2024, 3, 1, 10, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 57,
      title: "Remplacement plaquettes de frein",
      vehicle: "Renault Clio",
      plate: "AB-123-CD",
      start: new Date(2024, 3, 8, 11, 0),
      end: new Date(2024, 3, 8, 12, 30),
      type: "repair",
      status: "scheduled",
    },
    {
      id: 58,
      title: "Diagnostic système électrique",
      vehicle: "Peugeot 308",
      plate: "EF-456-GH",
      start: new Date(2024, 3, 15, 14, 0),
      end: new Date(2024, 3, 15, 15, 30),
      type: "diagnostic",
      status: "scheduled",
    },
    {
      id: 59,
      title: "Remplacement amortisseurs",
      vehicle: "Citroën C3",
      plate: "IJ-789-KL",
      start: new Date(2024, 3, 22, 9, 0),
      end: new Date(2024, 3, 22, 11, 30),
      type: "suspension",
      status: "scheduled",
    },
    {
      id: 60,
      title: "Révision climatisation",
      vehicle: "Volkswagen Golf",
      plate: "MN-012-OP",
      start: new Date(2024, 3, 29, 14, 0),
      end: new Date(2024, 3, 29, 16, 0),
      type: "climate",
      status: "scheduled",
    },

    // Mai 2024
    {
      id: 61,
      title: "Vidange moteur",
      vehicle: "Toyota Yaris",
      plate: "QR-345-ST",
      start: new Date(2024, 4, 6, 10, 0),
      end: new Date(2024, 4, 6, 11, 0),
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 62,
      title: "Remplacement batterie",
      vehicle: "Peugeot 208",
      plate: "YZ-901-AB",
      start: new Date(2024, 4, 13, 14, 0),
      end: new Date(2024, 4, 13, 15, 0),
      type: "electrical",
      status: "scheduled",
    },
    {
      id: 63,
      title: "Contrôle technique",
      vehicle: "Renault Megane",
      plate: "UV-678-WX",
      start: new Date(2024, 4, 20, 9, 0),
      end: new Date(2024, 4, 20, 11, 0),
      type: "inspection",
      status: "scheduled",
    },
    {
      id: 64,
      title: "Remplacement disques de frein",
      vehicle: "Renault Clio",
      plate: "AB-123-CD",
      start: new Date(2024, 4, 27, 11, 0),
      end: new Date(2024, 4, 27, 13, 0),
      type: "repair",
      status: "scheduled",
    },
    {
      id: 65,
      title: "Diagnostic OBD",
      vehicle: "Peugeot 308",
      plate: "EF-456-GH",
      start: new Date(2024, 4, 31, 14, 30),
      end: new Date(2024, 4, 31, 15, 30),
      type: "diagnostic",
      status: "scheduled",
    },
  ]

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

  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setShowTaskModal(true)
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

      {/* Calendar */}
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

      {/* Upcoming Events */}
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
                  <button className="px-4 py-2 bg-green-900/30 text-green-400 border border-green-500/30 rounded-md hover:bg-green-900/50 transition-colors">
                    Démarrer
                  </button>
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
