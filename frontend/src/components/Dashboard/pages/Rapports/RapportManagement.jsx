import React, { useState, useEffect } from 'react';
import RapportTable from './RapportTable';
import RapportFilter from './RapportFilter';
import api from '../../../../api';

const RapportManagement = () => {
  const [rapports, setRapports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ startDate: '', endDate: '' });

  useEffect(() => {
    const fetchRapports = async () => {
      try {
        const response = await api.get('/api/rapports');
        setRapports(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rapports:', error);
        setLoading(false);
      }
    };

    fetchRapports();
  }, []);

  const handleFilterChange = (filterKey, value) => {
    setFilters({ ...filters, [filterKey]: value });
  };

  const filteredRapports = rapports.filter(rapport => {
    const isWithinDateRange = (!filters.startDate || new Date(rapport.startDate) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(rapport.endDate) <= new Date(filters.endDate));
    return isWithinDateRange;
  });

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/rapports/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRapports(rapports.filter(rapport => rapport.id !== id));
    } catch (error) {
      console.error("Error deleting rapport:", error);
    }
  };

  return (
    <div className="max-w-7xl text-black my-20 mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Gestion des Rapports</h1>
      <div className="mb-6">
        <RapportFilter filters={filters} onFilterChange={handleFilterChange} />
      </div>
      {loading ? (
        <div className="text-center text-gray-500">Chargement des rapports...</div>
      ) : (
        <div className="overflow-x-auto">
          <RapportTable rapports={filteredRapports} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default RapportManagement;
