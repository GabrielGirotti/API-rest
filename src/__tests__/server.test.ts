import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

describe("GET /api", () => {
  it("Should send a succesfull connection", async () => {
    const response = await request(server).get("/api");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).not.toBe(404);
  });
});

jest.mock("../config/db");

describe("connectDB", () => {
  it("should handler database connection errors", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Hubo un error al conectar a la base"));

    const consoleSpy = jest.spyOn(console, "log");

    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Hubo un error al conectar a la base")
    );
  });
});
