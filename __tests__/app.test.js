const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const connection = require("../db/connection");

beforeEach(() => seed(testData));

afterAll(() => connection.end());

describe("/api", () => {
    test("GET - status 200 - Returns all topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          expect(res.body.topics.length).toBe(3);
          expect(res.body.topics[0]).toHaveProperty('slug');
          expect(res.body.topics[0]).toHaveProperty('description');
        });
    });
    test("GET - look for nonsense - Returns an error", () => {
      return request(app)
        .get("/api/nonsense")
        .expect(404)
        .then((res) => {
          expect(res.body).toEqual({ msg: 'Oh no! Please enter a valid url' });
          
        });
    });
})