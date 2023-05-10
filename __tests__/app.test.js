const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const connection = require("../db/connection");
const endpoints = require('../endpoints.json')

beforeEach(() => seed(testData));

afterAll(() => connection.end());

describe("/api/topics", () => {
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

describe("/api", () => {
  test("GET - status 200 - Returns all endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.body.endpoints).toEqual(endpoints);
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("GET - status 200 - Returns a valid article", () => {
    return request(app)
    .get("/api/articles/2")
    .expect(200)
    .then((res) => {
      expect(res.body.article.article_id).toBe(2)
      expect(res.body.article).toHaveProperty('author')
      expect(res.body.article).toHaveProperty('title')
      expect(res.body.article).toHaveProperty('topic')
      expect(res.body.article).toHaveProperty('author')
      expect(res.body.article).toHaveProperty('body')
      expect(res.body.article).toHaveProperty('created_at')
      expect(res.body.article).toHaveProperty('votes')
      expect(res.body.article).toHaveProperty('article_img_url')
    })
  })
  test("GET - look for article_id that is too high - Returns an error", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe('Oh no! Please enter a valid article ID!');
      });
  });
  test("GET - look for nonsense - Returns an error", () => {
    return request(app)
      .get("/api/articles/nonsense")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe('Oh no! Please enter a valid article ID!');
      });
  });
})