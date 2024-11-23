import express from "express";
import {
  getAllDoctorsRouteHandler,
  getAllUsersRouteHandler,
  postAppointmentRouteHandler,
  getAppointmentsRouteHandler,
  getAllAppointmentsRouteHandler,
  postEventRouteHandler,
  getEventRouteHandler,
  getEventsRouteHandler,
  deleteEventRouteHandler,
  getDoctorProfileRouteHandler,
  getUserProfileRouteHandler,
  patchUserPhoneRouteHandler,
  patchDoctorPhoneRouteHandler,
  patchAppointmentStatusRouteHandler,
  patchAppointmentStatusToSuccessfulRouteHandler,
  postUpdateNotificationRouteHandler,
  postAppointmentNotificationRouteHandler,
  getNotificationsRouteHandler,
  updateNotificationReadStatusRouteHandler,
  getDoctorAvailabilityRouteHandler,

} from "../../services/routelogic/index.js";

const router = express.Router();

// Appointments
router.post("/appointments/:doctorId/:userId", postAppointmentRouteHandler);
router.get("/alluserappointments/:id", getAppointmentsRouteHandler);
router.get("/appointments/all", getAllAppointmentsRouteHandler);
router.get("/doctors/availability", getDoctorAvailabilityRouteHandler);

// Events
router.post("/make-event/:doctorId", postEventRouteHandler);
router.get("/get-an-event/:doctorId", getEventRouteHandler);
router.get("/get-all-events/:doctorId", getEventsRouteHandler);
router.delete("/events/:eventId", deleteEventRouteHandler);

// Doctor Profile
router.get("/doctors/:doctorId/profile", getDoctorProfileRouteHandler);
router.get("/users/:userId/profile", getUserProfileRouteHandler);

// Admin Routes
router.get("/admin/doctors", getAllDoctorsRouteHandler);
router.get("/admin/users", getAllUsersRouteHandler);

// Notifications
router.post("/notifications", postUpdateNotificationRouteHandler);
router.post("/notifications/:userId", postAppointmentNotificationRouteHandler);
router.get("/notifications/:userId", getNotificationsRouteHandler);
router.patch("/notifications/:notificationId/read", updateNotificationReadStatusRouteHandler);


// Patch Routes
router.patch("/users/:userId/phone", patchUserPhoneRouteHandler);
router.patch("/doctors/:doctorId/phone", patchDoctorPhoneRouteHandler);
router.patch("/appointments/:appointmentId/status", patchAppointmentStatusRouteHandler);
router.patch("/appointments/:appointmentId/status/successful", patchAppointmentStatusToSuccessfulRouteHandler);

export default router;