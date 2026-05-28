import { db } from "../config/db.config.js";

export const createKeyResults = async (data) => {
    const sql = `
    INSERT INTO key_results
    (
      objective_id,
      company_id,
      cycle_id,
      created_by,
      kr_title,
      kr_description,
      metric_type,
      measurement_unit,
      initial_value,
      target_value,
      data_source,
      threshold_low,
      threshold_high
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const [result] = await db.execute(sql, [
        data.objectiveId,
        data.companyId,
        data.cycleId,
        data.createdBy,
        data.krTitle,
        data.krDescription || null,
        data.metricType,
        data.measurementUnit || null,
        data.initialValue || 0,
        data.targetValue,
        data.dataSource || null,
        data.thresholdLow || null,
        data.thresholdHigh || null
    ]);

    return {
        keyResultId: result.insertId
    };
};

export const updateKeyResultProgressService = async (keyResultId, data) => {

    // Insert progress history
    const progressSql = `
        INSERT INTO key_result_progress
        (
            key_result_id,
            company_id,
            cycle_id,
            reported_by,
            progress_value,
            progress_percentage,
            status,
            confidence_level,
            notes,
            update_week,
            reported_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [progressResult] = await db.execute(progressSql, [
        keyResultId,
        data.companyId,
        data.cycleId,
        data.reportedBy,
        data.progressValue,
        data.progressPercentage,
        data.status,
        data.confidenceLevel || "medium",
        data.notes || null,
        data.updateWeek || null,
        data.reportedDate
    ]);

    // Update kr
    const keyResultStatus =
        data.progressPercentage === 100
            ? "completed"
            : "in_progress";

    const updateKrSql = `
        UPDATE key_results
        SET
            current_value = ?,
            progress_percentage = ?,
            status = ?
        WHERE key_result_id = ?
    `;

    await db.execute(updateKrSql, [
        data.progressValue,
        data.progressPercentage,
        keyResultStatus,
        keyResultId
    ]);

    return {
        progressId: progressResult.insertId,
        keyResultId: Number(keyResultId),
        currentValue: data.progressValue,
        progressPercentage: data.progressPercentage,
        status: keyResultStatus
    };
};

export const getKeyResultProgressService = async (keyResultId) => {
    const sql = `
        SELECT
            reported_date AS date,
            progress_percentage AS progress
        FROM key_result_progress
        WHERE key_result_id = ?
        ORDER BY reported_date ASC;`;

    const [result] = await db.execute(sql, [keyResultId]);

    return {
        keyResults: result
    };
};