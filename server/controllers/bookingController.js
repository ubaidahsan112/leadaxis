import pool from "../config/database.js";
import { sendBookingEmail } from "../config/email.js";

/*
|--------------------------------------------------------------------------
| Create Booking / Lead
|--------------------------------------------------------------------------
*/
export const createBooking = async (req, res) => {
  try {
    console.log("BOOKING REQUEST BODY:", req.body);

    const {
      name,
      email,
      businessName,
      industry,
      website,
      phone,
      location,
      service,
      monthlyBudget,
      monthlyLeads,
      goals,
      consultationDate,
      consultationTime,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!businessName || !businessName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Business name is required.",
      });
    }

    if (!industry) {
      return res.status(400).json({
        success: false,
        message: "Industry is required.",
      });
    }

    if (!consultationDate) {
      return res.status(400).json({
        success: false,
        message: "Consultation date is required.",
      });
    }

    if (!consultationTime) {
      return res.status(400).json({
        success: false,
        message: "Consultation time is required.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Save Booking / Lead
    |--------------------------------------------------------------------------
    */
    const result = await pool.query(
      `
      INSERT INTO bookings (
        name,
        email,
        business,
        industry,
        location,
        website,
        phone,
        service,
        budget,
        monthly_leads,
        goals,
        consultation_date,
        consultation_time,
        status
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        'New'
      )
      RETURNING *
      `,
      [
        name.trim(),
        email.trim(),
        businessName.trim(),
        industry,
        location?.trim() || null,
        website?.trim() || null,
        phone?.trim() || null,
        service || null,
        monthlyBudget || null,
        monthlyLeads?.trim() || null,
        goals?.trim() || null,
        consultationDate || null,
        consultationTime || null,
      ]
    );

    /*
    |--------------------------------------------------------------------------
    | Get Newly Created Booking
    |--------------------------------------------------------------------------
    */
    const booking = result.rows[0];

    /*
    |--------------------------------------------------------------------------
    | Send Email Notification
    |--------------------------------------------------------------------------
    */
  sendBookingEmail(booking)
  .then(() => {
    console.log("BOOKING EMAIL SENT SUCCESSFULLY");
  })
  .catch((emailError) => {
    console.error("BOOKING EMAIL ERROR:", emailError);
  });

return res.status(201).json({
  success: true,
  message: "Booking submitted successfully.",
  booking,
});
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit booking.",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get All Bookings / Leads
|--------------------------------------------------------------------------
*/
export const getBookings = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM bookings
      ORDER BY id DESC
      `
    );

    return res.status(200).json({
      success: true,
      bookings: result.rows,
    });
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings.",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Booking / Lead
|--------------------------------------------------------------------------
*/
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM bookings
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      booking: result.rows[0],
    });
  } catch (error) {
    console.error("GET BOOKING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking.",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Update Booking / Lead
|--------------------------------------------------------------------------
*/
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      businessName,
      industry,
      website,
      phone,
      location,
      service,
      monthlyBudget,
      monthlyLeads,
      goals,
      consultationDate,
      consultationTime,
      status,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE bookings
      SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        business = COALESCE($3, business),
        industry = COALESCE($4, industry),
        website = COALESCE($5, website),
        phone = COALESCE($6, phone),
        location = COALESCE($7, location),
        service = COALESCE($8, service),
        budget = COALESCE($9, budget),
        monthly_leads = COALESCE($10, monthly_leads),
        goals = COALESCE($11, goals),
        consultation_date = COALESCE($12, consultation_date),
        consultation_time = COALESCE($13, consultation_time),
        status = COALESCE($14, status)
      WHERE id = $15
      RETURNING *
      `,
      [
        name?.trim() || null,
        email?.trim() || null,
        businessName?.trim() || null,
        industry || null,
        website?.trim() || null,
        phone?.trim() || null,
        location?.trim() || null,
        service || null,
        monthlyBudget || null,
        monthlyLeads?.trim() || null,
        goals?.trim() || null,
        consultationDate || null,
        consultationTime || null,
        status || null,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully.",
      booking: result.rows[0],
    });
  } catch (error) {
    console.error("UPDATE BOOKING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update booking.",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Delete Booking / Lead
|--------------------------------------------------------------------------
*/
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM bookings
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully.",
      booking: result.rows[0],
    });
  } catch (error) {
    console.error("DELETE BOOKING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete booking.",
      error: error.message,
    });
  }
};
