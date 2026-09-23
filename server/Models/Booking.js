import pool from "../config/database.js";

const Booking = {
  async create({
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
  }) {
    const query = `
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
        goals
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      )
      RETURNING *;
    `;

    const values = [
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
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
  },

  async getAll() {
    const query = `
      SELECT *
      FROM bookings
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query);

    return result.rows;
  },

  async getById(id) {
    const query = `
      SELECT *
      FROM bookings
      WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
  },

  async updateStatus(id, status) {
    const query = `
      UPDATE bookings
      SET
        status = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *;
    `;

    const result = await pool.query(query, [status, id]);

    return result.rows[0];
  },

  async delete(id) {
    const query = `
      DELETE FROM bookings
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
  },
};

export default Booking;