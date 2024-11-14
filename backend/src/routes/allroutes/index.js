import express from "express";
import {
  getAllDoctorsRouteHandler,
  getAllUsersRouteHandler,
  postAppointmentRouteHandler,
  getAppointmentRouteHandler,
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
} from "../../services/routelogic/index.js";

const router = express.Router();

// Appointments
router.post("/appointments/:userId/:doctorTd", postAppointmentRouteHandler);
router.get("/appointments/:appointmentid", getAppointmentRouteHandler);
router.get("/appointments/:id", getAppointmentsRouteHandler);
router.get("/appointments/all", getAllAppointmentsRouteHandler);

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


// Patch Routes
router.patch("/users/:userId/phone", patchUserPhoneRouteHandler);
router.patch("/doctors/:doctorId/phone", patchDoctorPhoneRouteHandler);
router.patch("/appointments/:appointmentId/status", patchAppointmentStatusRouteHandler);
router.patch("/appointments/:appointmentId/status/successful", patchAppointmentStatusToSuccessfulRouteHandler);

export default router;