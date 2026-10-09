import axios from 'axios';
import initialDbData from '../../db.json';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2500, // Sunucuya erişilemiyorsa hızlıca fallback'e geçmek için kısa timeout
});

// Yerel (in-memory) mock veri deposu (db.json tabanlı)
let localDb = JSON.parse(JSON.stringify(initialDbData));
let isMockMode = false;

// Yenileme işlemi yapıldığında mod kontrolünü sıfırlama imkanı
export const resetApiMode = () => {
  isMockMode = false;
};

export const getIsMockMode = () => isMockMode;

// Güvenli API çağrısı yardımcısı (try/catch & fallback)
const safeApiCall = async (apiCall, fallbackFn) => {
  if (isMockMode) {
    return { data: fallbackFn(), isMock: true };
  }
  try {
    const response = await apiCall();
    isMockMode = false;
    return { data: response.data, isMock: false };
  } catch (error) {
    console.warn(
      'REST API (http://localhost:3001) bağlantısı kurulamadı. Demo Modu (Statik Veri) aktif edildi.',
      error.message
    );
    isMockMode = true;
    return { data: fallbackFn(), isMock: true };
  }
};

export const getOverview = () =>
  safeApiCall(
    () => api.get('/overview'),
    () => localDb.overview
  );

export const getMonthlyEmissions = () =>
  safeApiCall(
    () => api.get('/monthlyEmissions'),
    () => localDb.monthlyEmissions
  );

export const getEmissionsByCategory = () =>
  safeApiCall(
    () => api.get('/emissionsByCategory'),
    () => localDb.emissionsByCategory
  );

export const getDepartmentEmissions = () =>
  safeApiCall(
    () => api.get('/departmentEmissions'),
    () => localDb.departmentEmissions
  );

export const getReductionGoals = () =>
  safeApiCall(
    () => api.get('/reductionGoals'),
    () => localDb.reductionGoals
  );

export const getActivities = () =>
  safeApiCall(
    () => api.get('/activities'),
    () => localDb.activities
  );

export const getTips = () =>
  safeApiCall(
    () => api.get('/tips'),
    () => localDb.tips
  );

export const addActivity = async (activity) => {
  const newActivity = {
    id: String(Date.now()),
    ...activity,
    status: activity.status || 'Onaylandı',
  };

  if (isMockMode) {
    localDb.activities = [newActivity, ...localDb.activities];
    return { data: newActivity, isMock: true };
  }

  try {
    const res = await api.post('/activities', activity);
    localDb.activities = [res.data, ...localDb.activities];
    return { data: res.data, isMock: false };
  } catch (err) {
    console.warn('REST API POST isteği başarısız. Yerel state güncelleniyor (Demo Modu).');
    isMockMode = true;
    localDb.activities = [newActivity, ...localDb.activities];
    return { data: newActivity, isMock: true };
  }
};

export const deleteActivity = async (id) => {
  if (isMockMode) {
    localDb.activities = localDb.activities.filter(
      (item) => String(item.id) !== String(id)
    );
    return { data: { id }, isMock: true };
  }

  try {
    const res = await api.delete(`/activities/${id}`);
    localDb.activities = localDb.activities.filter(
      (item) => String(item.id) !== String(id)
    );
    return { data: res.data, isMock: false };
  } catch (err) {
    console.warn('REST API DELETE isteği başarısız. Yerel state güncelleniyor (Demo Modu).');
    isMockMode = true;
    localDb.activities = localDb.activities.filter(
      (item) => String(item.id) !== String(id)
    );
    return { data: { id }, isMock: true };
  }
};

export default api;

