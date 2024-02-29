const { migrateToDatabase } = require("./migrate-to-database");

module.exports.applyMigrations = async function () {
  if (process.env.skip_migrations_at_start !== "true") {
    globalThis.logger.info("Applying migrations");
    //Running migrations and database manipulations
    const migrationResult = await migrateToDatabase({ mode: "migration" });
    if (!migrationResult.status) {
      globalThis.logger.error("Applying migrations failed");
      throw migrationResult.error;
    }
    globalThis.logger.info("Applied migrations");

    //Database manipulation is only for specific cases like applying fix to inconsistent data or inserting data spesific to one department
    //If we want to add new daily activity event type and to see it after first run, that query must be added to migrations folder not to database-manipulations folder
    //Manipulations will be applied only in production mode. If you want to apply manipulations in local, send force:true option also.
    globalThis.logger.info("Applying database manipulations");
    const manipulationResult = await migrateToDatabase({
      mode: "manipulation",
    });
    if (!manipulationResult.status) {
      globalThis.logger.error("Applying database manipulations failed");
      throw manipulationResult.error;
    }
    globalThis.logger.info("Applied database manipulations");
  }
};
