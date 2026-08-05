import database from "infra/database.js"

const status = async (req, res) => {
  const result = await database.query("SELECT 1 + 1 as sum;")

  const postgresVersion = await database.query("SHOW server_version")
  const postgresVersionParsed = postgresVersion.rows[0].server_version

  const maxConections = await database.query("SHOW max_connections") 
  const maxConnectionsParsed = maxConections.rows[0].max_connections

  const databaseName = process.env.POSTGRES_DB
  const activeConnections = await database.query({
    text:"SELECT count(*)::int from pg_stat_activity WHERE datname = $1",
    values:[databaseName]
  })
  const activeConnectionsParsed = activeConnections.rows[0].count

  //const activityStatConnectionsDatail = await database.query("SELECT * from pg_stat_activity")

  const updatedAt = new Date().toISOString()
  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database:{
        max_connections: Number(maxConnectionsParsed),
        active_connections: activeConnectionsParsed,
      },
      postgres_version: postgresVersionParsed,
    }
  });
};

export default status;
 