import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatCards from './components/StatCards';
import EmissionsTrendChart from './components/EmissionsTrendChart';
import CategoryPieChart from './components/CategoryPieChart';
import DepartmentBarChart from './components/DepartmentBarChart';
import ActivityTable from './components/ActivityTable';
import AddActivityModal from './components/AddActivityModal';
import GoalsProgress from './components/GoalsProgress';
import TipsSection from './components/TipsSection';

import {
  getOverview,
  getMonthlyEmissions,
  getEmissionsByCategory,
  getDepartmentEmissions,
  getReductionGoals,
  getActivities,
  addActivity,
  deleteActivity,
  getTips,
  resetApiMode,
} from './services/api';

export default function App() {
  const [overview, setOverview] = useState(null);
  const [monthlyEmissions, setMonthlyEmissions] = useState([]);
  const [emissionsByCategory, setEmissionsByCategory] = useState([]);
  const [departmentEmissions, setDepartmentEmissions] = useState([]);
  const [reductionGoals, setReductionGoals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [tips, setTips] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAllData = async (resetMode = false) => {
    if (resetMode) {
      resetApiMode();
    }
    setLoading(true);
    setError(null);
    try {
      const [
        overviewRes,
        monthlyRes,
        categoryRes,
        deptRes,
        goalsRes,
        activitiesRes,
        tipsRes,
      ] = await Promise.all([
        getOverview(),
        getMonthlyEmissions(),
        getEmissionsByCategory(),
        getDepartmentEmissions(),
        getReductionGoals(),
        getActivities(),
        getTips(),
      ]);

      setOverview(overviewRes.data);
      setMonthlyEmissions(monthlyRes.data);
      setEmissionsByCategory(categoryRes.data);
      setDepartmentEmissions(deptRes.data);
      setReductionGoals(goalsRes.data);
      setActivities(activitiesRes.data);
      setTips(tipsRes.data);

      const usedMock = [
        overviewRes,
        monthlyRes,
        categoryRes,
        deptRes,
        goalsRes,
        activitiesRes,
        tipsRes,
      ].some((r) => r?.isMock);

      setIsDemoMode(usedMock);
    } catch (err) {
      console.error('Veri çekilirken beklenmeyen hata:', err);
      setIsDemoMode(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleAddActivity = async (newActivity) => {
    try {
      const res = await addActivity(newActivity);
      if (res.isMock) {
        setIsDemoMode(true);
      }
      // Yenilenmiş aktiviteleri al
      const updatedActivitiesRes = await getActivities();
      setActivities(updatedActivitiesRes.data);
    } catch (err) {
      console.error('Aktivite eklenirken hata:', err);
    }
  };

  const handleDeleteActivity = async (id) => {
    if (!window.confirm('Bu emisyon kaydını silmek istediğinize emin misiniz?')) return;
    try {
      const res = await deleteActivity(id);
      if (res.isMock) {
        setIsDemoMode(true);
      }
      setActivities((prev) => prev.filter((a) => String(a.id) !== String(id)));
    } catch (err) {
      console.error('Aktivite silinirken hata:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white pb-12">
      {/* Navbar Header */}
      <Header
        onOpenModal={() => setIsModalOpen(true)}
        onRefresh={() => fetchAllData(true)}
        loading={loading}
        isDemoMode={isDemoMode}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Error Alert (eğer kritik bir sorun kalırsa) */}
        {error && (
          <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => fetchAllData(true)}
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 font-bold rounded"
            >
              Tekrar Dene
            </button>
          </div>
        )}

        {/* Loading Spinner Skeleton */}
        {loading && !overview ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-medium">Panel Verileri Yükleniyor...</p>
          </div>
        ) : (
          <>
            {/* Top Stat Cards */}
            <StatCards overview={overview} />

            {/* Grid 1: Trend Chart & Category Donut */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <EmissionsTrendChart data={monthlyEmissions} />
              </div>
              <div className="lg:col-span-1">
                <CategoryPieChart data={emissionsByCategory} />
              </div>
            </div>

            {/* Grid 2: Department Bar & Sustainability Goals */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <DepartmentBarChart data={departmentEmissions} />
              </div>
              <div className="lg:col-span-1">
                <GoalsProgress goals={reductionGoals} />
              </div>
            </div>

            {/* Tips Section */}
            <div className="mb-6">
              <TipsSection tips={tips} />
            </div>

            {/* Activities Data Table */}
            <div className="mb-6">
              <ActivityTable
                activities={activities}
                onDeleteActivity={handleDeleteActivity}
              />
            </div>
          </>
        )}

      </main>

      {/* Modal Form */}
      <AddActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddActivity={handleAddActivity}
      />
    </div>
  );
}

