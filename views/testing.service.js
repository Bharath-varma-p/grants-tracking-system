
const Service = require(`../utils/service`);
const { ErrorResult, SuccessResult } = require(`../utils/result`);
const { getPools } = require(`../utils/database`);
const { getTableData } = require(`../utils/get-data-table-data`);


class CoGroupsService extends Service {
  async getDataTableData(req) {
    return getTableData(await this.getFilteredReviewerData(req), req);
  }

  async getFilteredReviewerData(req) {
    let whereClause = ``;

    let reviewersJoinQuery = ``;

    if (req.query.reviewers) {
      const stringyfiedReviewers = req.query.reviewers;
      const reviewers = stringyfiedReviewers.split(",").map((name) => `'${name}'`);
      reviewersJoinQuery = ` user_name IN (${reviewers}) `;
    }
    whereClause += whereClause ? ` AND ${reviewersJoinQuery}` : reviewersJoinQuery;

    if (req.query.start_date && req.query.end_date) {
      const startDate = req.query.start_date;
      const endDate = req.query.end_date;

      const lastVisitCondition = ` started_time BETWEEN '${startDate}' AND '${endDate}' `;

      if (whereClause) {
        whereClause += " AND" + lastVisitCondition;
      } else {
        whereClause = lastVisitCondition;
      }
    }

    return {
      name: `review_analysis_page`,
      route: `review_analysis_page`,
      database: `rafvue.`,
      table_name: `case_review`,
      select_query: `SELECT 
      user_id,
      user_name AS reviewer_name,
      COUNT(CASE WHEN follow_up_status = 'Closed' OR case_action = 'verified' THEN id ELSE NULL END) AS total_completed_reviews,
      ROUND(COUNT(*) / COUNT(DISTINCT DATE(started_time)) AND DATE(started_time) IS NOT NULL, 2) AS individual_daily_average,
      COUNT(*) AS icd_10_reviewed,
      COUNT(CASE WHEN case_action = 'Remove code' THEN 1 ELSE NULL END) AS icd_10_removed,
      COUNT(CASE WHEN case_action = 'Revise code' THEN 1 ELSE NULL END) AS new_icd_10_entered,
      COUNT(CASE WHEN case_action IS NOT NULL AND follow_up_status IS NOT NULL THEN 1 ELSE NULL END) AS query_sent,
      SUM(CASE WHEN follow_up IS NOT NULL THEN 1 ELSE 0 END) / COUNT( subscriber_id) AS query_avg_per_patient
    FROM `,
      condition: whereClause,
      search_items: [
        `usr_id`,
        `reviewer_name`,
        `total_completed_reviews`,
        `individual_daily_average`,
        `Individual_daily_average`,
        `icd_10_reviewed`,
        `icd_10_removed`,
        `new_icd_10_entered`,
        `query_sent`,
        `query_avg_per_patient`,
      ],
      sql_order: [` `], //Order by cy_raf DESC
      sql_group: `group by user_id `,
      column_names: [
        `user_id`,
        `reviewer_name`,
        `total_completed_reviews`,
        `individual_daily_average`,
        `Individual_daily_average`,
        `icd_10_reviewed`,
        `icd_10_removed`,
        `new_icd_10_entered`,
        `query_sent`,
        `query_avg_per_patient`,
      ],
    };
  }

  async getReviewers(req) {
    const { pool } = this.pools;
    let db;
    try {
      db = await pool.getConnection();
      const { id } = req.body;
      const result = await db.query(
        `
        SELECT distinct user_name AS full_name
        FROM rafvue.case_review`
      );

      return new SuccessResult(result);
    } catch (err) {
      return new ErrorResult(err.sql || err.message, err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async getReviewerPatients(req) {
    const { pool } = getPools(`rafvue`);

    let db;
    try {
      db = await pool.getConnection();
      const { id } = req.body;
      const result = await db.query(
        `
        SELECT 
        subscriber_id as MRN,
        full_name,
        count(*) as reviewed_icds,
        SUM(CASE WHEN follow_up = 'Query Provider' OR follow_up = 'Update Claim' THEN 1 ELSE 0 END) as follow_up_queries_count,
        SUM(CASE WHEN follow_up_status = 'Closed' or case_action = 'Verified' THEN 1 END) as closed_queries,
        JSON_ARRAYAGG(JSON_OBJECT("pre review icd 10", pre_review_icd10,"icd 10", icd_10,"Case Action", case_action, "followup", follow_up, "follow up status",follow_up_status, "followup outcome", followup_query_outcome)) AS icd_data
      FROM case_review
      WHERE 
      case_review.user_id = ? GROUP BY user_id, subscriber_id `,
        [id]
      );

      return new SuccessResult(result);
    } catch (err) {
      return new ErrorResult(err.sql || err.message, err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }
}

module.exports = CoGroupsService;
