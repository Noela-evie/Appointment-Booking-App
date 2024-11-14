import axios from 'axios';

// Appointments
const appointmentApi = {
  postAppointment: async (userId, doctorId, data) => {
    const response = await axios.post(`/appointments/${userId}/${doctorId}`, data);
    return response.data;
  },
  getAppointment: async (appointmentId) => {
    const response = await axios.get(`/appointments/${appointmentId}`);
    return response.data;
  },
  getAppointments: async (id) => {
    const response = await axios.get(`/appointments/${id}`);
    return response.data;
  },
  getAllAppointments: async () => {
    const response = await axios.get('/appointments/all');
    return response.data;
  },
};

// Events
const eventApi = {
  postEvent: async (doctorId, data) => {
    const response = await axios.post(`/make-event/${doctorId}`, data);
    return response.data;
  },
  getEvent: async (doctorId) => {
    const response = await axios.get(`/get-an-event/${doctorId}`);
    return response.data;
  },
  getEvents: async (doctorId) => {
    const response = await axios.get(`/get-all-events/${doctorId}`);
    return response.data;
  },
  deleteEvent: async (eventId) => {
    const response = await axios.delete(`/events/${eventId}`);
    return response.data;
  },
};

// Profiles
const profileApi = {
  getDoctorProfile: async (doctorId) => {
    const response = await axios.get(`/doctors/${doctorId}/profile`);
    return response.data;
  },
  getUserProfile: async (userId) => {
    const response = await axios.get(`/users/${userId}/profile`);
    return response.data;
  },
};

// Admin
const adminApi = {
  getAllDoctors: async () => {
    const response = await axios.get('/admin/doctors');
    return response.data;
  },
  getAllUsers: async () => {
    const response = await axios.get('/admin/users');
    return response.data;
  },
};

// Patch Routes
const patchApi = {
  patchUserPhone: async (userId, phone) => {
    const response = await axios.patch(`/users/${userId}/phone`, { phone });
    return response.data;
  },
  patchDoctorPhone: async (doctorId, phone) => {
    const response = await axios.patch(`/doctors/${doctorId}/phone`, { phone });
    return response.data;
  },
  patchAppointmentStatus: async (appointmentId) => {
    const response = await axios.patch(`/appointments/${appointmentId}/status`);
    return response.data;
  },
  patchAppointmentStatusToSuccessful: async (appointmentId) => {
    const response = await axios.patch(`/appointments/${appointmentId}/status/successful`);
    return response.data;
  },
};

export { appointmentApi, eventApi, profileApi, adminApi, patchApi };