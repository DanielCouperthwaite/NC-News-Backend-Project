const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const connection = require("../db/connection");
const endpoints = require('../endpoints.json')


beforeEach(() => seed(testData));

afterAll(() => connection.end());

describe("GET - /api/topics", () => {
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

describe("GET - /api/articles/:article_id", () => {
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


describe("GET - /api/articles/:article_id/comments", () => {
  test("GET - status 200 - Returns a comment with a valid article id", () => {
    return request(app)
    .get("/api/articles/9/comments")
    .expect(200)
    .then((res) => {
      expect(res.body.comments.length).toBe(2)
      expect(res.body.comments).toBeSortedBy('created_at', {
        descending: true
      }),
      res.body.comments.forEach((comment) => {
        expect(comment).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            article_id: expect.any(Number),
            votes: expect.any(Number),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String)
          })
        )
      })
    })
  })
  test("GET - look for article_id that is too high - Returns an error", () => {
    return request(app)
      .get("/api/articles/2112/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe('Article not found');
      });
  });
  test("GET - look for nonsense - Returns an error", () => {
    return request(app)
      .get("/api/articles/nonsense/comments")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe('Oh no! Please enter a valid article ID!');
      });
  });
  test("GET - look for an article with no comments - Returns 200 status and empty array", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.comments).toEqual([]);
      });
    })
  })

describe("GET - /api/articles", () => {
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

describe("POST - /api/articles/:article_id/comments", () => {
  test("POST - status: 201 - responds with success and a comment object", () => {
    const newComment =  {
      author: "butter_bridge",
      body: "I am making a comment",
    }
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        expect(response.body.comment.body).toBe("I am making a comment")
        expect(response.body.comment.author).toBe("butter_bridge");
      });
  });
  test("POST - status: 400 - responds with an error message with an invalid user", () => {
    const newComment =  {
      author: "Daniel",
      body: "I am making a comment",
    }
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe('Oh no! Please enter a valid username!');
      });
  })
  test("POST - add a comment to an article id that is too high - Returns an error", () => {
    return request(app)
      .get("/api/articles/2112/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe('Article not found');
      });
  });
  test("POST - look for nonsense - Returns an error", () => {
    return request(app)
      .get("/api/articles/nonsense/comments")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe('Oh no! Please enter a valid article ID!');
      });
  });
})

describe("PATCH - /api/articles/:article_id", () => {
  test("PATCH - status: 201 - Returns an expected number of one added vote", () => {
    const vote =  { inc_votes : 1 }
    return request(app)
      .patch("/api/articles/1")
      .send(vote)
      .expect(201)
      .then((response) => {
        expect(response.body.article.votes).toBe(101)
      });
    });
  test("PATCH - status: 201 - Returns an expected number of 57 removed votes", () => {
    const vote =  { inc_votes : -57 }
    return request(app)
      .patch("/api/articles/1")
      .send(vote)
      .expect(201)
      .then((response) => {
        expect(response.body.article.votes).toBe(43)
      });
    });
    test("PATCH - status 201 - Returns a whole valid article with updated votes", () => {
      const vote =  { inc_votes : 20 }
      return request(app)
      .patch("/api/articles/1")
      .send(vote)
      .expect(201)
      .then((response) => {
        expect(response.body.article.votes).toBe(120);
          expect(response.body.article).toEqual(
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
    test("PATCH - add a comment to an article id that is too high - Returns an error", () => {
      const vote =  { inc_votes : 20 }
      return request(app)
        .patch("/api/articles/2112")
        .send(vote)
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe('Article not found');
        });
    });
    test("PATCH - look for nonsense - Returns an error", () => {
      const vote =  { inc_votes : 20 }
      return request(app)
        .patch("/api/articles/nonsense")
        .send(vote)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe('Oh no! Please enter a valid article ID!');
        });
    });
})
