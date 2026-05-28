import { db } from "../config/db.config.js";

export const getDashboardData = async (companyId) => {
  const sql = `
    SELECT
      obj.totalObjectives,
      obj.completedObjectives,
      kr.totalKeyResults,
      kr.completedKeyResults,
      usr.activeEmployees,

      ROUND(
        (
          (obj.completedObjectives + kr.completedKeyResults) * 100.0
        ) / NULLIF(
          (obj.totalObjectives + kr.totalKeyResults),
          0
        ),
        2
      ) AS completionRate

    FROM
      (
        SELECT
          COUNT(*) AS totalObjectives,
          SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completedObjectives
        FROM objectives
        WHERE company_id = ?
      ) obj,

      (
        SELECT
          COUNT(*) AS totalKeyResults,
          SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completedKeyResults
        FROM key_results
        WHERE company_id = ?
      ) kr,

      (
        SELECT
          COUNT(*) AS activeEmployees
        FROM users
        WHERE company_id = ?
          AND employment_status = 'active'
          AND is_deleted = FALSE
      ) usr;
  `;

  const [rows] = await db.query(sql, [
    companyId,
    companyId,
    companyId
  ]);

  return rows[0] || {};
};
