import express from "express";

import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Booking / Lead Routes
|--------------------------------------------------------------------------
*/

// Create new booking / lead
router.post("/", createBooking);

// Get all bookings / leads
router.get("/", getBookings);

// Get single booking / lead
router.get("/:id", getBookingById);

// Update booking / lead
router.patch("/:id", updateBooking);

// Delete booking / lead
router.delete("/:id", deleteBooking);

export default router;