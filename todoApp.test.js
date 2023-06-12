const db = require("./data/db-config");
const request = require("supertest");
const server = require("./api/server");

afterAll(async () => {
  await db.destroy();
});
beforeEach(async () => {
  await db.migrate.rollback(); // yapılan değişiklikleri geri alır.
  await db.migrate.latest(); // yapılan değişiklikleri günceller.
  await db.seed.run(); //veritabanını doldurur.
});
test("[0] sanity check", () => {
  expect(true).not.toBe(false);
});

describe("Gorev test", () => {
  test("[1] get/tüm görevler geliyor mu ", async () => {
    const allGorevs = await request(server).get("/api/gorev");
    expect(allGorevs.statusCode).toBe(200);
    expect(allGorevs.body.length).toBe(1);
  });
  test("[2] getById sonuç dönüyor mu ", async () => {
    let gorevId = 1;
    let actual = await request(server).get(`/api/gorev/${gorevId}`);

    expect(actual.body.GorevId).toBe(1);
  });
  test("[3] getById/olmayan id ile hata dönüyor mu ", async () => {
    let gorevId = 15;
    let actual = await request(server).get(`/api/gorev/${gorevId}`);

    expect(actual.status).toBe(404);
  });
  test("[4] post/görev ekliyor mu", async () => {
    let model = { Adi: "test", Aciklama: "test" };
    let actual = await request(server).post("/api/gorev").send(model);
    expect(actual.status).toBe(201);
    expect(actual.body.GorevId).toBe(2);
  });
  test("[5] post/olmayan hata hata döndürüyo mu ", async () => {
    let model = { Aciklama: "test" };
    let actual = await request(server).post("/api/gorev").send(model);
    expect(actual.status).toBe(400);
  });
});
describe("Task test", () => {
  test("[6] get/tüm tasklar geliyor mu ", async () => {
    const actual = await request(server).get("/api/task");
    expect(actual.status).toBe(200);
    expect(actual.body.length).toBe(2);
  });
  test("[7] getById sonuç dönüyor mu ", async () => {
    let taskId = 1;
    let actual = await request(server).get(`/api/task/${taskId}`);

    expect(actual.body.TaskId).toBe(1);
  });
  test("[8] getById/olmayan id ile hata dönüyor mu ", async () => {
    let taskId = 15;
    let actual = await request(server).get(`/api/task/${taskId}`);

    expect(actual.status).toBe(404);
  });
  test("[9] post/task ekliyor mu", async () => {
    let model = { Adi: "test", Aciklama: "test", GorevId: 1 };
    let actual = await request(server).post("/api/task").send(model);
    expect(actual.status).toBe(201);
    expect(actual.body.TaskId).toBe(3);
  });
  test("[10] post/olmayan GorevId için hata döndürüyo mu ", async () => {
    let model = { Adi: "test", Aciklama: "test" };
    let actual = await request(server).post("/api/task").send(model);
    expect(actual.status).toBe(404);
    expect(actual.body.message).toEqual("Eksik alan var");
  });
});
