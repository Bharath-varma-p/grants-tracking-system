const { processAdvancedSearch } = require(`./advanced-search/process-advanced-search`);
const { getPools } = require(`./database`);
const { createFulltextSearchParams } = require(`./helper`);
const { SuccessResult, ErrorResult } = require(`./result`);

module.exports.getTableData = async (tableOptions, req) => {
  const { department } = req;
  let sTable = (tableOptions.database || department.database_name_with_dot) + tableOptions.table_name;

  const defaultJoinQuery = tableOptions.join_query || ``;

  let joinQuery = defaultJoinQuery || ``;

  const isHistoric = tableOptions.historic_check === `yes` && req.params.id === `0`;

  let isPerformance = !!tableOptions.sql_total_count;

  let whereConditions = ((isHistoric ? tableOptions.historic_condition : tableOptions.condition) || ``).trim();

  const { column_names } = tableOptions;

  let limit = tableOptions.limit || true;

  const queryParams = req.query;

  const parameters = [];

  let ssn1;
  let ssn2;

  const advancedSearchResult = processAdvancedSearch(req, tableOptions);

  if (!advancedSearchResult.where.includes(`expungement = 'Yes'`)) {
    if ([`victim`, `arrest`, `suspect`, `warrant_citation_arrest`, `traffic_citation`].includes(tableOptions.name)) {
      whereConditions = ` (${whereConditions} OR (${
        req.session.passport.user.show_sealed || false
      } AND expungement = 'Yes'))`;
    }
  } else {
    whereConditions = ``;
  }

  let defaultWhereConditions = whereConditions;

  if (tableOptions.name === `bmv`) {
    whereConditions = ` deleted is null and case_id=${req.params.id} `;
  }

  if (tableOptions.name === `cfs`) {
    if (req.session.passport.user.cfs_data && req.session.passport.user.cfs_data.length > 3) {
      const selectedDepartments = req.session.passport.user.cfs_data.split(`,`);

      whereConditions = ` UnitHomeJurisdiction IN (?) `;
      defaultWhereConditions = whereConditions;

      isPerformance = false;

      parameters.push(selectedDepartments);
    }
  }

  if (tableOptions.name === `call_management` && isHistoric) {
    isPerformance = false;
  }

  if (advancedSearchResult.join) {
    joinQuery += ` ${advancedSearchResult.join}`;
  }

  if (advancedSearchResult.where) {
    whereConditions += ` ${advancedSearchResult.where}`;
  }

  parameters.push(...advancedSearchResult.parameters);

  if (advancedSearchResult.table) {
    sTable += advancedSearchResult.table;
  }

  // Ordering
  let sOrder = ``;
  if (queryParams.iSortCol_0) {
    for (let i = 0; i < queryParams.iSortingCols; i += 1) {
      if (queryParams[`bSortable_${parseInt(queryParams[`iSortCol_${i}`])}`] === `true`) {
        sOrder += `${column_names[parseInt(queryParams[`iSortCol_${i}`])]} ${queryParams[`sSortDir_${i}`]}, `;
      }
    }

    sOrder = sOrder.substring(0, sOrder.length - 2);

    if (sOrder) {
      sOrder = `ORDER BY ${sOrder}`;
    }
  }

  if (sOrder === `ORDER BY id asc`) {
    sOrder = tableOptions.sql_order || sOrder;
  }

  sOrder = sOrder || tableOptions.sql_order;

  // if (tableOptions.sql_order) {
  //   sOrder = tableOptions.sql_order;
  // }

  // Filtering
  // Create an exception for the ID number search
  const searchConditions = [];
  const individualColumnSearchConditions = [];
  const searchTerms = `${queryParams.sSearch}`.split(` `);
  let directSearch = 0;
  let directSearchParameter = "none";

  if (queryParams.sSearch) {
    if (queryParams.sSearch.includes("_?")) {
      directSearch = 1;
      directSearchParameter = `${queryParams.sSearch.split("_?")[1]} = '${queryParams.sSearch.split("_?")[0]}'`;
    }
    if (tableOptions.fulltext_search) {
      const { searchFilter } = createFulltextSearchParams(queryParams.sSearch);

      if (searchTerms.length > 1) {
        searchConditions.push(` ${tableOptions.fulltext_search} like '${searchTerms[0]} ${searchTerms[1]}%'  
        or ${tableOptions.fulltext_search} like '${searchTerms[1]} ${searchTerms[0]}%'`);
      } else {
        searchConditions.push(`MATCH(master_search) AGAINST('${queryParams.sSearch}' IN BOOLEAN MODE) `);
      }
      if (sOrder) {
        sOrder = ``;
      } else {
        sOrder = ``;
      }

      parameters.push(searchFilter, searchFilter);
    } else if (tableOptions.search_items && tableOptions.search_items.length > 0) {
      // Extra field for only searching for ID, or any parameter given
      if (queryParams.field) {
        searchConditions.push(`${queryParams.field} LIKE '${queryParams.sSearch}'`);
      } else {
        searchConditions.push(
          tableOptions.search_items.map((searchItem) => `${searchItem} LIKE '%${queryParams.sSearch}%'`).join(` OR `)
        );
      }
    }
  }

  // Individual column filtering
  for (let i = 0; i < tableOptions.search_items.length; i += 1) {
    if (
      queryParams[`bSearchable_${i}`] &&
      queryParams[`bSearchable_${i}`] === `true` &&
      queryParams[`sSearch_${i}`] !== ``
    ) {
      const individualColumnSearchValues = queryParams[`sSearch_${i}`].split(`|`);

      individualColumnSearchConditions.push(
        individualColumnSearchValues
          .map((searchVal) => `${tableOptions.search_items[i]} LIKE '%${searchVal}%'`)
          .join(` OR `)
      );
    }
  }

  let searchWhere = searchConditions
    .map((searchCondition) => `(${searchCondition})`)
    .join(` OR `)
    .trim();

  if (searchWhere) {
    searchWhere = "(" + searchWhere + ")";
  }

  if (directSearch == 1) {
    searchWhere = ` ${directSearchParameter}`;
  }

  const individualColumnSearchWhere = individualColumnSearchConditions
    .map((searchCondition) => `(${searchCondition})`)
    .join(` OR `)
    .trim();

  if (individualColumnSearchWhere) {
    if (searchWhere) {
      searchWhere += ` AND ( ${individualColumnSearchWhere} ) `;
    } else {
      searchWhere = `(${individualColumnSearchWhere})`;
    }
  }

  if (whereConditions.trim().toLowerCase().startsWith(`and`)) {
    whereConditions = whereConditions.trim().substring(3);
  }

  let sWhere = ``;
  if (searchWhere && whereConditions) {
    sWhere = `WHERE ${searchWhere} AND ${whereConditions}`;
  } else if (searchWhere) {
    sWhere = `WHERE ${searchWhere}`;
  } else if (whereConditions) {
    sWhere = `WHERE ${whereConditions}`;
  }

  let sLimit = `LIMIT 10`;
  if (queryParams.iDisplayStart && queryParams.iDisplayLength !== -1) {
    sLimit = `LIMIT ${queryParams.iDisplayStart}, ${queryParams.iDisplayLength}`;
  }

  if (limit === "false") {
    sLimit = ``;
  }

  let countColumn = `*`;

  if (tableOptions.count_column) {
    countColumn = `DISTINCT(${tableOptions.count_column})`;
  }

  const queryWithoutOrderAndLimit = `
              ${tableOptions.select_query}
              ${sTable}
              ${joinQuery}
              ${sWhere}
              ${tableOptions.sql_group || ``}
          `;

  const queryTotalCount = `
              SELECT Count(${countColumn}) AS rowTotal FROM 
              ${sTable}
              ${defaultJoinQuery}
              ${defaultWhereConditions ? `WHERE` : ``}
              ${defaultWhereConditions}
              ${tableOptions.sql_group || ``}
          `;

  const queryFilteredCount = `
              SELECT Count(${countColumn}) AS rowTotal FROM 
              ${sTable}
              ${joinQuery}
              ${sWhere}
              ${tableOptions.sql_group || ``}
          `;
  const sQuery = `
        ${queryWithoutOrderAndLimit}
        ${sOrder || ``}
        ${sLimit}
    `;
  let db;

  const { pool } = getPools("rafvue");

  try {
    db = await pool.getConnection();
    const tableUniqueId = queryParams._.substring(0, 10);

    const isDifferentTable =
      !req.session.passport.user.lastQuery ||
      req.session.passport.user.lastQuery.tableUniqueId !== tableUniqueId ||
      req.session.passport.user.lastQuery.path !== req.path;

    const isDifferentQuery =
      !isDifferentTable &&
      req.session.passport.user.lastQuery.query !== db.format(queryWithoutOrderAndLimit, parameters);
    const searchConditionExist =
      joinQuery !== defaultJoinQuery || whereConditions !== defaultWhereConditions || searchWhere;

    const shouldGetFilteredCount = searchConditionExist && (isDifferentQuery || isDifferentTable);

    let shouldGetTotalCount = isDifferentTable || isPerformance;

    if ([`storage_usage`, `user_activity`, `case_management`, `get_filtered_data`].includes(tableOptions.name)) {
      shouldGetTotalCount = shouldGetTotalCount || isDifferentQuery;
    }

    req.session.passport.user.lastQuery = req.session.passport.user.lastQuery || {};

    if (ssn1) {
      await db.query(
        `SET @ssn1 := CONVERT(AES_ENCRYPT(?, UNHEX(SHA2('${process.env.ssn_password}',512))) USING latin1)`,
        ssn1
      );
      await db.query(
        `SET @ssn2 := CONVERT(AES_ENCRYPT(?, UNHEX(SHA2('${process.env.ssn_password}',512))) USING latin1)`,
        ssn2
      );
    }

    const results = await db.query(sQuery, parameters);

    results.forEach((row) => {
      if (row.date_time) {
        const date = new Date(row.date_time);
        row.date_time = date
          .toLocaleString(`en-US`, {
            month: `2-digit`,
            day: `2-digit`,
            year: `numeric`,
            hour: `2-digit`,
            minute: `2-digit`,
            hour12: false,
          })
          .replace(/,/g, ``);
      }
    });

    if (shouldGetTotalCount) {
      let totalCountQuery = queryTotalCount;

      if (isPerformance) {
        totalCountQuery = isHistoric ? tableOptions.sql_total_count2 : tableOptions.sql_total_count;
        totalCountQuery += ` LIMIT 1`;
      }

      const totalCountResult = await db.query(totalCountQuery, parameters);

      const totalCount = totalCountResult.length === 1 ? totalCountResult[0].rowTotal : totalCountResult.length;

      req.session.passport.user.lastQuery.totalCount = totalCount;
    }

    if (shouldGetFilteredCount) {
      const filteredCountResult = await db.query(queryFilteredCount, parameters);

      const filteredCount =
        filteredCountResult.length === 1 ? filteredCountResult[0].rowTotal : filteredCountResult.length;

      req.session.passport.user.lastQuery.filteredCount = filteredCount;
    }

    if (!searchConditionExist) {
      req.session.passport.user.lastQuery.filteredCount = req.session.passport.user.lastQuery.totalCount;
    }

    req.session.passport.user.lastQuery = {
      ...req.session.passport.user.lastQuery,
      query: db.format(queryWithoutOrderAndLimit, parameters),
      tableUniqueId,
      path: req.path,
    };

    const { createExtraDataForDataTable } = require(`../utils/create-extra-data-for-data-table`);

    const output = {
      sEcho: parseInt(queryParams.sEcho),
      iTotalRecords: req.session.passport.user.lastQuery.totalCount,
      iTotalDisplayRecords: req.session.passport.user.lastQuery.filteredCount,
      aaData: results.map(Object.values),
      extra: await createExtraDataForDataTable({
        db,
        tableOptions,
        sTable,
        joinQuery,
        sWhere,
        parameters,
      }),
    };

    return new SuccessResult(output);
  } catch (err) {
    return new ErrorResult(err.sql || err.message, err);
  } finally {
    if (db) {
      db.release();
    }
  }
};
