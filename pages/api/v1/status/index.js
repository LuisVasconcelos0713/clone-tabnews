import database from "infra/database.js"

const status = async (req, res) => {
  const result = await database.query("SELECT 1 + 1 as sum;")

  const postgresVersion = await database.query("SELECT split_part(version(), ' ', 2)")
  console.log(postgresVersion)
  const postgresVersionParsed = postgresVersion.rows[0].split_part

  const maxConections = await database.query("SHOW max_connections") 
  const maxConnectionsParsed = maxConections.rows[0].max_connections

  const activeConnections = await database.query("SELECT count(*) FROM pg_stat_activity WHERE state = 'active'")
  const activeConnectionsParsed = activeConnections.rows[0].count

  const updatedAt = new Date().toISOString()
  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database:{
        max_connections: maxConnectionsParsed,
        active_connections: activeConnectionsParsed,
      },
      postgres_version: postgresVersionParsed,
    }
  });
};

export default status;
 