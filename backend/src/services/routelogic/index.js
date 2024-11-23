import { appointmentModel } from '../../schemas/appointments.schema.js';
import { eventModel } from '../../schemas/events.schema.js';
import { doctorsModel } from '../../schemas/doctors.schema.js';
import { userModel } from '../../schemas/user.schema.js';
import { notificationModel } from '../../schemas/notifications.schema.js';


// 1. postAppointmentRouteHandler
export const postAppointmentRouteHandler = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const userId = req.params.userId;
    const appointmentData = req.body;

    // Get doctor and patient details
    const doctor = await doctorsModel.findById(doctorId);
    const patient = await userModel.findById(userId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check if time slot is available
    const availability = doctor.availability.find((availability) => availability.date === appointmentData.date);
    if (availability && availability.timeSlots.includes(appointmentData.time)) {
      return res.status(400).json({ message: 'This time slot is occupied. Choose another date or time.' });
    }

    // Create appointment
    const appointment = new appointmentModel(appointmentData);
    await appointment.save();

    // Add booked time slot to doctor's availability
    if (availability) {
      availability.timeSlots.push(appointmentData.time);
    } else {
      doctor.availability.push({ date: appointmentData.date, timeSlots: [appointmentData.time] });
    }
    await doctor.save();

    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

  
  // 3. Get all appointments for a given doctor or patient
export const getAppointmentsRouteHandler = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const patientId = req.params.id;
    const appointments = await appointmentModel.find({
      $or: [{ doctor: doctorId }, { patient: patientId }],
    });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
  
  // 4. Get all appointments
  export const getAllAppointmentsRouteHandler = async (req, res) => {
    try {
      const appointments = await appointmentModel.find();
      res.json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // 5. Post event
export const postEventRouteHandler = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const { eventName, eventDate, eventTime } = req.body;

    // Get doctor details
    const doctor = await doctorsModel.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if time slot is available
    const availability = doctor.availability.find((availability) => availability.date === eventDate);
    if (availability && availability.timeSlots.includes(eventTime)) {
      return res.status(400).json({ message: 'This time slot is occupied. Choose another date or time.' });
    }

    // Create event
    const event = new eventModel({ eventName, eventDate: eventDate.split('T')[0], eventTime, doctor: doctorId });
    await event.save();

    // Add booked time slot to doctor's availability
    if (availability) {
      availability.timeSlots.push(eventTime);
    } else {
      doctor.availability.push({ date: eventDate, timeSlots: [eventTime] });
    }
    await doctor.save();

    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


  // 6. Get event for given doctor
  export const getEventRouteHandler = async (req, res) => {
    try {
      const doctorId = req.params.doctorId;
      const event = await eventModel.findOne({ doctor: doctorId });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // 7. Get all events for a given doctor
  export const getEventsRouteHandler = async (req, res) => {
    try {
      const doctorId = req.params.doctorId;
      const events = await eventModel.find({ doctor: doctorId });
      if (!events) {
        return res.status(404).json({ message: 'No Events' });
      }
      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // 8. Delete event for a given doctor
export const deleteEventRouteHandler = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await eventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Remove time slot from doctor's availability
    const doctor = await doctorsModel.findById(event.doctor);
const availability = doctor.availability.find((availability) => availability.date === event.eventDate);

if (availability) {
  availability.timeSlots = availability.timeSlots.filter((timeSlot) => timeSlot !== event.eventTime);
  await doctor.save();
}

    await eventModel.findByIdAndDelete(eventId);
    res.status(204).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
  
  // 9. Get all doctor data for profile
  export const getDoctorProfileRouteHandler = async (req, res) => {
    try {
      const doctorId = req.params.doctorId;
      const doctor = await doctorsModel.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.json(doctor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
    // 10. Patch phone number to user schema
    export const patchUserPhoneRouteHandler = async (req, res) => {
    try {
    const userId = req.params.userId;
    const phone = req.body.phone;
    await userModel.updateOne({ _id: userId }, { $set: { phone } });
    res.status(200).json({ message: 'Phone number updated successfully' });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
    }
    };
    
    // 11. Patch phone number to doctor schema
    export const patchDoctorPhoneRouteHandler = async (req, res) => {
    try {
    const doctorId = req.params.doctorId;
    const phone = req.body.phone;
    await doctorsModel.updateOne({ _id: doctorId }, { $set: { phone } });
    res.status(200).json({ message: 'Phone number updated successfully' });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
    }
    };
    
    export const patchAppointmentStatusRouteHandler = async (req, res) => {
      try {
        const appointmentId = req.params.appointmentId;
        const appointment = await appointmentModel.findById(appointmentId);
    
        if (!appointment) {
          return res.status(404).json({ message: 'Appointment not found' });
        }
    
        const doctorId = appointment.doctor;
        const date = appointment.date;
        const time = appointment.time;
    
        await appointmentModel.updateOne({ _id: appointmentId }, { $set: { status: 'cancelled' } });
    
        // Remove time slot from doctor's availability
        const doctor = await doctorsModel.findById(doctorId);
        const availability = doctor.availability.find((availability) => availability.date === date);
    
        if (availability) {
          availability.timeSlots = availability.timeSlots.filter((timeSlot) => timeSlot !== time);
          await doctor.save();
        }
    
        res.status(200).json({ message: 'Appointment status updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    };


    
    // 13. Patch status to successful when appointment date passes
    export const patchAppointmentStatusToSuccessfulRouteHandler = async (req, res) => {
    try {
    const appointmentId = req.params.appointmentId;
    await appointmentModel.updateOne({ _id: appointmentId }, { $set: { status: 'successful' } });
    res.status(200).json({ message: 'Appointment status updated successfully' });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
    }
    };  

    //14. Get user data for user profile
  export const getUserProfileRouteHandler = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // Get all doctors
  export const getAllDoctorsRouteHandler = async (req, res) => {
    try {
      const doctors = await doctorsModel.find();
      res.json(doctors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  //Get all Patients
  export const getAllUsersRouteHandler = async (req, res) => {
    try {
      const users = await userModel.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // 15. Post notification
export const postUpdateNotificationRouteHandler = async (req, res) => {
  try {

    const { type, message, doctor, patient } = req.body;
    const notification = new notificationModel({
      type,
      message,
      doctor,
      patient,
    });
    await notification.save();
    res.status(201).json({ message: 'Notification created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const postAppointmentNotificationRouteHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { type, appointment, doctor, patient, message } = req.body;
    const notification = new notificationModel({
      type,
      appointment,
      doctor,
      patient,
      message,
    });
    await notification.save();
    res.status(201).json({ message: "Notification created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// 16. Get notifications for a user
export const getNotificationsRouteHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await notificationModel.find({
      $or: [{ doctor: userId }, { patient: userId }],
    });
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 17. Update notification read status
export const updateNotificationReadStatusRouteHandler = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const notification = await notificationModel.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    notification.readStatus = true;
    await notification.save();
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 18. Get doctor availability
export const getDoctorAvailabilityRouteHandler = async (req, res) => {
  try {
    const { department, date, time } = req.query;
    const doctors = await doctorsModel.find({ department });

    const availableDoctors = [];
    for (const doctor of doctors) {
      const availability = doctor.availability.find((availability) => availability.date === date);
      if (!availability) {
        availableDoctors.push({ _id: doctor._id, name: doctor.name, phone: doctor.phone, availableTimeSlots: [time] });
      } else if (!availability.timeSlots.includes(time)) {
        availableDoctors.push({ _id: doctor._id, name: doctor.name, phone: doctor.phone, availableTimeSlots: availability.timeSlots });
      }
    }

    if (availableDoctors.length === 0) {
      return res.status(400).json({ message: 'No doctors available at the selected time.' });
    }

    res.json(availableDoctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};