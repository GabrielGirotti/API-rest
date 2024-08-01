import request from "supertest";
import server from "../../server";
import { json } from "sequelize";

describe("POST /api/products", () => {
  it("should display validation error", async () => {
    const response = await request(server).post("/api/products").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");

    expect(response.status).not.toBe(201);
    expect(response.body).not.toHaveProperty("data");
  });

  it("price should be greater than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "monitor",
      price: -5,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(201);
    expect(response.body).not.toHaveProperty("data");
    expect(response.body.errors).not.toHaveLength(2);
  });

  it("price not be a string", async () => {
    const response = await request(server).post("/api/products").send({
      name: "monitor",
      price: "monitor",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);

    expect(response.status).not.toBe(201);
    expect(response.body).not.toHaveProperty("data");
    expect(response.body.errors).not.toHaveLength(1);
  });

  it("should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "nombre de prueba",
      price: 300,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(200);
    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products", () => {
  it("GET a JSON response with the products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).not.toBe(404);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products/:id", () => {
  it("Should send a 400 error", async () => {
    const response = await request(server).get("/api/products/not-valid-id");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("ID no valido");
  });

  it("GET a JSON response with a single product", async () => {
    const response = await request(server).get(`/api/products/1`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("PUT /api/products/:id", () => {
  it("Should send a 400 error", async () => {
    const response = await request(server)
      .put("/api/products/not-valid-id")
      .send({
        name: "Prueba",
        avilable: true,
        price: 20,
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("ID no valido");
  });

  it("Should send a error when the PUT an empty update", async () => {
    const response = await request(server).put("/api/products/1").send({});
    expect(response.body).toHaveProperty("errors");
    expect(response.status).toBe(400);

    expect(response.body).not.toHaveProperty("data");
    expect(response.status).not.toBe(200);
  });

  it("Should send a error when the price is lower than 0", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Prueba",
      avilable: true,
      price: -20,
    });
    expect(response.body).toHaveProperty("errors");
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe("El valor debe ser mayor a cero");

    expect(response.body).not.toHaveProperty("data");
    expect(response.status).not.toBe(200);
  });

  it("Should update the data", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Prueba",
      available: true,
      price: 20,
    });

    expect(response.body).toHaveProperty("data");
    expect(response.status).toBe(200);

    expect(response.body).not.toHaveProperty("errors");
    expect(response.status).not.toBe(400);
  });
});
