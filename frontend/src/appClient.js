import axios from 'axios';

// Appointments
const appointmentApi = {
  postAppointment: async (doctorId, userId, data) => {
    const response = await axios.post(`/appointments/${doctorId}/${userId}`, data);
    return response.data;
  },
  getuserAppointments: async (id) => {
    const role = localStorage.getItem("role");
    let doctorId, patientId;
    if (role === "doctor") {
      doctorId = id;
    } else {
      patientId = id;
    }
    const response = await axios.get(`/alluserappointments/${role === "doctor" ? doctorId : patientId}`);
    return response.data;
  },
  getAppointment: async (id) => {
    const response = await axios.get(`/appointments/${id}`);
    return response.data;
  },
  getAllAppointments: async () => {
    const response = await axios.get('/appointments/all');
    return response.data;
  },
  getDoctorAvailability: async (department, date, time) => {
    const response = await axios.get('/doctors/availability', {
      params: {
        department,
        date,
        time,
      },
    });
    return response.data;
  },
};
// Events
const eventApi = {
  postEvent: async (doctorId, data) => {
    const response = await axios.post(`/make-event/${doctorId}`, {
      eventName: data.eventName,
      eventDate: data.eventDate,
      eventTime: data.eventTime,
    });
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

// Notifications
const notificationApi = {
  postNotification: async (data) => {
    const response = await axios.post(`/notifications/`, data);
    return response.data;
  },
  postAppointmentNotification: async (userId, data) => {
    const response = await axios.post(`/notifications/${userId}`, data);
    return response.data;
  },
  getNotifications: async (userId) => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      return [];
    } else {
      let doctorId, patientId;
      if (role === "doctor") {
        doctorId = userId;
      } else {
        patientId = userId;
      }
      console.log(`Doctor: ${doctorId}`)
      const response = await axios.get(`/notifications/${role === "doctor" ? doctorId : patientId}`);
      return response.data;
    }
  },
  markNotificationAsRead: async (notificationId) => {
    const response = await axios.patch(`/notifications/${notificationId}/read`);
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


export { appointmentApi, eventApi, profileApi, adminApi, patchApi, notificationApi };