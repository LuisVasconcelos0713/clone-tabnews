test("GET to /api/v1/status, should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  console.log(response);
  expect(response.status).toBe(200);
});

test("GET should return, error 404", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status/teste");
  console.log(response.status);
  expect(response.status).toBe(404);
});
