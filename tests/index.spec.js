import request from "supertest";  
import app from "../src/app";

describe("GET /tasks", () => {
   // Prueba 1: Debería responder con un código de estado 200
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.statusCode).toBe(200);
  });

  // Prueba 2: Debería responder con un array
  test("should respond an array", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

// Descripción de las pruebas POST en la ruta /tasks
describe("POST /tasks", () => {
  //  Se inicia un bloque de pruebas para el caso en que se proporciona un título y descripción en la solicitud POST.
  describe("given a title and description", () => {
     // Datos de una nueva tarea
    const newTask = {
      title: "some title",
      description: "some description",
    };

      // Prueba 3: Debería responder con un código de estado 200
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.statusCode).toBe(200);
    });

    // Prueba 4: Debería tener un encabezado Content-Type: application/json
    test("should have a Content-Type: application/json header", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    // Prueba 5: Debería responder con un objeto JSON que contenga la nueva tarea con un ID
    test("should respond with an task ID", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.body.id).toBeDefined();
    });
  });

  // Descripción: Cuando falta el título y la descripción
  describe("when the title and description is missing", () => {
    // Prueba 6: Debería responder con un código de estado 400
    test("shoud respond with a 400 status code", async () => {
      const fields = [
        { title: "some title" },
        { description: "some description" },
      ];

      for (const body of fields) {
        const response = await request(app).post("/tasks").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
