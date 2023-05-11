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
      expect(res.body.article.article_id).toBe(2);
        expect(res.body.article).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String)
          })
        )
      })
  })
  test("GET - look for article_id that is too high - Returns an error", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe('Oh no! Please enter a valid article ID!');
      });
  });
  test("GET - look for nonsense - Returns an error", () => {
    return request(app)
      .get("/api/articles/nonsense")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe('Oh no! Please enter a valid article ID!');
      });
  });
})

describe("/api/articles", () => {
  test("GET - status 200 - Returns all articles", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then((res) => { res.body.articles.forEach( (articles) => {
      expect(articles).toEqual(
        expect.not.objectContaining({
          body: expect.any(String)
        }),
        expect.objectContaining({
          author: expect.any(String),
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String)
        })
      )
      })
      expect(res.body.articles).toBeSortedBy('created_at', {
        descending: true,
    })     
    })
  })
})