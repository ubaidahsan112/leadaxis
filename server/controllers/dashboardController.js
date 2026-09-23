import pool from "../config/database.js";

export const getDashboard = async (req, res, next) => {
  try {
    const statsQuery = `
      SELECT
        COUNT(*)::int AS total_leads,

        COUNT(*) FILTER (
          WHERE status = 'New'
        )::int AS new_leads,

        COUNT(*) FILTER (
          WHERE status = 'Contacted'
        )::int AS contacted_leads,

        COUNT(*) FILTER (
          WHERE status = 'Qualified'
        )::int AS qualified_leads,

        COUNT(*) FILTER (
          WHERE status = 'Proposal Sent'
        )::int AS proposal_leads,

        COUNT(*) FILTER (
          WHERE status = 'Won'
        )::int AS won_leads,

        COUNT(*) FILTER (
          WHERE status = 'Lost'
        )::int AS lost_leads

      FROM bookings;
    `;

    const recentLeadsQuery = `
      SELECT
        id,
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
        status,
        created_at,
        updated_at
      FROM bookings
      ORDER BY created_at DESC
      LIMIT 10;
    `;

    const [statsResult, recentLeadsResult] = await Promise.all([
      pool.query(statsQuery),
      pool.query(recentLeadsQuery),
    ]);

    const stats = statsResult.rows[0];

    res.status(200).json({
      success: true,
      data: {
        totalLeads: stats.total_leads,
        newLeads: stats.new_leads,
        contactedLeads: stats.contacted_leads,
        qualifiedLeads: stats.qualified_leads,
        proposalLeads: stats.proposal_leads,
        wonLeads: stats.won_leads,
        lostLeads: stats.lost_leads,
        recentLeads: recentLeadsResult.rows,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    next(error);
  }
};