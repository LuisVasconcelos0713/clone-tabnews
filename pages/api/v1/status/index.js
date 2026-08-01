import database from "infra/database.js"

const status = async (req, res) => {
  const result = await database.query("SELECT 1 + 1 as sum;")

  const postgresVersion = await database.query("SHOW server_version")
  const postgresVersionParsed = postgresVersion.rows[0].server_version

  const maxConections = await database.query("SHOW max_connections") 
  const maxConnectionsParsed = maxConections.rows[0].max_connections

  const activeConnections = await database.query("SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'local_db';")
  const activeConnectionsParsed = activeConnections.rows[0].count

  //const activityStatConnectionsDatail = await database.query("SELECT * from pg_stat_activity")
  console.log(activeConnectionsParsed)

  const updatedAt = new Date().toISOString()
  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database:{
        max_connections: Number(maxConnectionsParsed),
        active_connections: Number(activeConnectionsParsed),
      },
      postgres_version: postgresVersionParsed,
    }
  });
};

export default status;
 