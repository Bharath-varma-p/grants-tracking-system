module.exports.createExtraDataForDataTable = async function ({
  db,
  tableOptions,
  sTable,
  joinQuery,
  sWhere,
  parameters,
}) {
  if (tableOptions.name === "training") {
    const query = `
      SELECT COUNT(DISTINCT(trainings.id)) as Count, officer_id, CONCAT_WS(' ',first_name, last_name) as full_name FROM
      ${sTable}
      ${joinQuery}
      ${sWhere}
      GROUP BY officer_id
      ORDER BY full_name
    `;

    return await db.query(query, parameters);
  }
};
