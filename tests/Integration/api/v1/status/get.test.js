test("GET to /api/v1/status, should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json()
  expect(responseBody.updated_at).toBeDefined()

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString()
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt)

  const checkPostgresVersion = await responseBody.dependencies.postgres_version
  expect(checkPostgresVersion).toMatch(/^\d+\.\d+$/)
  expect(checkPostgresVersion).toEqual("16.14")

  const checkMaxConnections = await responseBody.dependencies.database.max_connections
  expect(Number(checkMaxConnections)).toBeGreaterThan(0)
  

  const checkActiveConnections = await responseBody.dependencies.database.active_connections
  expect(Number(checkActiveConnections)).toBeGreaterThanOrEqual(1)

  console.log(responseBody.dependencies.postgres_version, responseBody.dependencies.database.max_connections, responseBody.dependencies.database.active_connections)
});

