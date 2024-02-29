const { SuccessResult, ErrorResult } = require("./result");

const generateNewId = async (db, tableName, prefix, totalLength = 12) => {
  try {
    const currentYear = new Date().getFullYear();

    const lastRow = (
      await db.query(
        `select Year(created_date) as yearim, incident_id as lastId from ${tableName} Order by created_date Desc limit 1`
      )
    )[0];

    let generatedNo, sayi;

    if (!lastRow) {
      generatedNo = (currentYear.toString() + prefix).padEnd(totalLength - 1, "0") + "1";
      sayi = 1;
    } else {
      sayi = lastRow.lastId;
      const tarih = lastRow.yearim;

      if (currentYear > tarih) {
        sayi = 0;
        await db.query("Truncate table " + tableName);
      }
      sayi += 1;
      generatedNo =
        (currentYear.toString() + prefix).padEnd(totalLength - sayi.toString().length, "0") + sayi.toString();
    }

    await db.query(`Insert INTO ${tableName} (incident_id, created_date) values (?,?)`, [sayi, new Date()]);
    return new SuccessResult(generatedNo);
  } catch (error) {
    globalThis.logger.error(error);
    return new ErrorResult("Generating new Id failed. " + error.sqlMessage || error.message, error);
  }
};

const generateId = (type, db, totalLength) => {
  totalLength ||= 12;
  if (type == "traffic_crash") {
    return generateNewId(db, "traffic_id", "C", totalLength);
  } else if (type == "incident") {
    return generateNewId(db, "incident_id", "", totalLength);
  } else if (type == "warrant_citation_arrest") {
    return generateNewId(db, "arrest_id", "A", totalLength);
  } else if (type == "traffic_citation") {
    return generateNewId(db, "citation_id", "T", totalLength);
  } else if (type == "evidence") {
    return generateNewId(db, "evidence_id", "E", totalLength);
  } else if (type == "fir") {
    return generateNewId(db, "fir_id", "F", totalLength);
  } else if (type == "call_management") {
    return generateNewId(db, "cfs_id", "H", totalLength);
  } else if (type == "tow") {
    return generateNewId(db, "tows_id", "W", totalLength);
  } else if (type == "vacation_watch") {
    return generateNewId(db, "vacation_watch_id", "V", totalLength);
  }
};

const generateIdHandler = async (type, routeName, res, pool, req) => {
  let db;

  try {
    db = await pool.getConnection();

    const newIdResult = await generateId(type, db, req.department.incident_no_length);

    if (!newIdResult.status) {
      throw new Error(newIdResult.message);
    }

    if (routeName == "incidentFail") {
      res.json(newIdResult.data);
    }

    return newIdResult.data;
  } catch (err) {
    globalThis.logger.error(err);

    if (routeName == "incidentFail") {
      res.status(500).send(err.message);
    } else {
      res.status(500).render("error", {
        title: "Error Page",
        revert_link: "toRoot",
        error: err.message,
        layout: null,
      });
    }
  } finally {
    if (db) {
      db.release();
    }
  }

  return null;
};

const generateEasyToReadId = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";

  const timestamp = new Date().getTime().toString(36).toUpperCase();
  id += timestamp;

  for (let i = id.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  id = id.slice(0, length);

  return id;
};

module.exports = { generateEasyToReadId, generateId, generateIdHandler };
