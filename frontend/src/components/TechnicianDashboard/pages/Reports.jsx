"use client"

import { useState } from "react"
import { jsPDF } from "jspdf"

// Composant pour les graphiques (simulé)
const Chart = ({ type, data, options }) => {
  // Simuler différents types de graphiques
  const renderChart = () => {
    if (type === "bar") {
      return (
        <div className="h-full w-full flex flex-col">
          <div className="flex justify-between items-end h-48 mt-auto px-4">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center w-full">
                <div
                  className="w-8 bg-green-500 rounded-t-sm transition-all hover:bg-green-400"
                  style={{
                    height: `${(item.value / Math.max(...data.map((d) => d.value))) * 100}%`,
                    minHeight: "10px",
                  }}
                ></div>
                <div className="text-xs text-gray-400 mt-2">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      )
    } else if (type === "line") {
      return (
        <div className="h-full w-full flex items-center justify-center">
          <svg viewBox="0 0 200 100" className="h-48 w-full">
            <polyline
              points={data.map((item, index) => `${(index / (data.length - 1)) * 200},${100 - item.value}`).join(" ")}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
            {data.map((item, index) => (
              <circle key={index} cx={(index / (data.length - 1)) * 200} cy={100 - item.value} r="3" fill="#10b981" />
            ))}
          </svg>
        </div>
      )
    } else if (type === "pie") {
      const total = data.reduce((sum, item) => sum + item.value, 0)
      let cumulativePercent = 0

      return (
        <div className="h-full w-full flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="h-48 w-48">
            {data.map((item, index) => {
              const percent = (item.value / total) * 100
              const startX = Math.cos(2 * Math.PI * (cumulativePercent / 100)) * 50 + 50
              const startY = Math.sin(2 * Math.PI * (cumulativePercent / 100)) * 50 + 50
              cumulativePercent += percent
              const endX = Math.cos(2 * Math.PI * (cumulativePercent / 100)) * 50 + 50
              const endY = Math.sin(2 * Math.PI * (cumulativePercent / 100)) * 50 + 50
              const largeArcFlag = percent > 50 ? 1 : 0

              const pathData = [
                `M 50 50`,
                `L ${startX} ${startY}`,
                `A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                `Z`,
              ].join(" ")

              const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]

              return <path key={index} d={pathData} fill={colors[index % colors.length]} />
            })}
            <circle cx="50" cy="50" r="25" fill="#111827" />
          </svg>
        </div>
      )
    }

    return null
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4 h-64 flex flex-col">
      <h3 className="text-white text-sm font-medium mb-4">{options.title}</h3>
      {renderChart()}
    </div>
  )
}

const Reports = () => {
  const [dateRange, setDateRange] = useState("month")

  // Données fixes pour la démonstration
  const kpiData = [
    {
      title: "MTTR",
      value: "2.4h",
      description: "Temps moyen de réparation",
      change: "+5%",
      trend: "up",
    },
    {
      title: "MTBF",
      value: "45j",
      description: "Temps moyen entre pannes",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Taux de panne",
      value: "3.2%",
      description: "Pourcentage de véhicules en panne",
      change: "-8%",
      trend: "down",
    },
    {
      title: "Efficacité",
      value: "94%",
      description: "Taux de réussite des interventions",
      change: "+2%",
      trend: "up",
    },
  ]

  const chartData = {
    interventionsByType: [
      { label: "Vidange", value: 65 },
      { label: "Freins", value: 45 },
      { label: "Électrique", value: 30 },
      { label: "Pneus", value: 25 },
      { label: "Autres", value: 15 },
    ],
    repairTime: [
      { label: "Jan", value: 60 },
      { label: "Fév", value: 55 },
      { label: "Mar", value: 70 },
      { label: "Avr", value: 45 },
      { label: "Mai", value: 50 },
    ],
    breakdownDistribution: [
      { label: "Moteur", value: 35 },
      { label: "Électrique", value: 25 },
      { label: "Freins", value: 20 },
      { label: "Suspension", value: 15 },
      { label: "Autres", value: 5 },
    ],
    maintenanceCosts: [
      { label: "Clio", value: 75 },
      { label: "308", value: 60 },
      { label: "C3", value: 45 },
      { label: "Golf", value: 55 },
      { label: "Yaris", value: 40 },
    ],
  }

  const charts = [
    {
      type: "bar",
      data: chartData.interventionsByType,
      options: {
        title: "Interventions par type",
      },
    },
    {
      type: "line",
      data: chartData.repairTime,
      options: {
        title: "Temps moyen de réparation (h)",
      },
    },
    {
      type: "pie",
      data: chartData.breakdownDistribution,
      options: {
        title: "Répartition des pannes",
      },
    },
    {
      type: "bar",
      data: chartData.maintenanceCosts,
      options: {
        title: "Coûts de maintenance par véhicule",
      },
    },
  ]

  const recentReports = [
    {
      id: 1,
      title: "Rapport mensuel de maintenance",
      date: "2023-05-01",
      description: "Synthèse des interventions et KPIs du mois d'avril",
      type: "monthly",
    },
    {
      id: 2,
      title: "Analyse des pannes récurrentes",
      date: "2023-04-15",
      description: "Étude des causes de pannes fréquentes sur la flotte",
      type: "analysis",
    },
    {
      id: 3,
      title: "Rapport trimestriel Q1 2023",
      date: "2023-04-05",
      description: "Bilan du premier trimestre et recommandations",
      type: "quarterly",
    },
  ]

  const downloadPDF = (report) => {
    const doc = new jsPDF()

    // Titre
    doc.setFontSize(20)
    doc.setTextColor(0, 150, 70) // Vert
    doc.text("CaroteX Maintenance", 105, 20, { align: "center" })

    // Sous-titre
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text(report.title, 105, 30, { align: "center" })

    // Date
    doc.setFontSize(12)
    doc.setTextColor(100, 100, 100)
    doc.text(`Date: ${new Date(report.date).toLocaleDateString("fr-FR")}`, 105, 40, { align: "center" })

    // Description
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text("Description:", 20, 60)
    doc.text(report.description, 20, 70)

    // KPIs
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text("Indicateurs clés de performance:", 20, 90)

    let y = 100
    kpiData.forEach((kpi) => {
      doc.setFontSize(12)
      doc.text(`${kpi.title}: ${kpi.value} (${kpi.change})`, 30, y)
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text(kpi.description, 30, y + 5)
      y += 15
      doc.setTextColor(0, 0, 0)
    })

    // Pied de page
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text("Document généré automatiquement par CaroteX Maintenance", 105, 280, { align: "center" })

    // Téléchargement
    doc.save(`${report.title.replace(/\s+/g, "_").toLowerCase()}.pdf`)
  }

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-white">Rapports & Statistiques</h2>
            <p className="text-sm text-gray-400 mt-1">Analysez les performances de maintenance</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setDateRange("week")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                dateRange === "week"
                  ? "bg-green-900/30 text-green-400 border border-green-500/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-green-400"
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => setDateRange("month")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                dateRange === "month"
                  ? "bg-green-900/30 text-green-400 border border-green-500/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-green-400"
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => setDateRange("quarter")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                dateRange === "quarter"
                  ? "bg-green-900/30 text-green-400 border border-green-500/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-green-400"
              }`}
            >
              Trimestre
            </button>
            <button
              onClick={() => setDateRange("year")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                dateRange === "year"
                  ? "bg-green-900/30 text-green-400 border border-green-500/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-green-400"
              }`}
            >
              Année
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800 hover:border-green-500/50 transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400">{kpi.title}</p>
                <p className="text-3xl font-semibold text-white mt-1">{kpi.value}</p>
                <p className="text-xs text-gray-400 mt-1">{kpi.description}</p>
              </div>
              <span
                className={`flex items-center text-sm font-medium ${
                  kpi.trend === "up" ? "text-green-400" : "text-red-400"
                }`}
              >
                {kpi.change}
                {kpi.trend === "up" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {charts.map((chart, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all"
          >
            <div className="px-6 py-4 border-b border-gray-800">
              <h3 className="text-lg font-medium text-white">{chart.options.title}</h3>
            </div>
            <div className="p-4">
              <Chart type={chart.type} data={chart.data} options={chart.options} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-800">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="text-lg font-medium text-white">Rapports récents</h3>
        </div>
        <div className="divide-y divide-gray-800">
          {recentReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-800">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {report.type === "monthly" ? (
                    <div className="w-10 h-10 rounded-full bg-green-900/30 border border-green-500/30 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-400"
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
                  ) : report.type === "quarterly" ? (
                    <div className="w-10 h-10 rounded-full bg-purple-900/30 border border-purple-500/30 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-purple-400"
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
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 border border-blue-500/30 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-400"
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
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-lg font-medium text-white">{report.title}</h4>
                  <p className="mt-1 text-sm text-gray-400">{report.description}</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs text-gray-400">
                      {new Date(report.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="ml-auto">
                      <button
                        onClick={() => downloadPDF(report)}
                        className="text-green-400 hover:text-green-300 bg-green-900/20 px-3 py-1 rounded-md border border-green-500/30 text-sm font-medium flex items-center"
                      >
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
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Télécharger PDF
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reports
