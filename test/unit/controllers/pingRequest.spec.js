const chai = require("chai");
const chai_http = require("chai-http");

const controller = require("../../../Controllers/pingRequest");
const boot = require("../../../app").boot;
const shutdown = require("../../../app").shutdown;

const expect = chai.expect;

chai.use(chai_http);

describe("Unit test for app", () => {
  buildResponse = () => {
    return http_mocks.createResponse({
      eventEmitter: require("events").eventEmitter,
    });
  };

  fError = (err) => {
    throw new Error(err);
  };

  describe("check if the controller exist", () => {
    it("exists", () => {
      expect(controller).to.exist;
    });
  });

  describe("/GET /api/posts", () => {
    it("should return an error without tags specified", () => {
      chai
        .request(boot)
        .get("/api/posts")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.be.to.eql("The tag parameter is required");
          fError("no tag specified " + err);
        });
    });
    after(() => {
      shutdown();
    });
  });

  describe("/GET /api/posts", () => {
    it("no post if tag is invalid", () => {
      const tag = "invalidTag";
      chai
        .request(boot)
        .get(`/api/posts?tag=${tag}`)
        .end((err, res) => {
          expect(res.statusCode).to.be(200);
          expect(res.body.length).to.be(0);
          fError(err);
        });
    });
    after(() => {
      shutdown();
    });
  });

  describe("/GET /api/posts", () => {
    it("with correct tag should return an object with posts", () => {
      const tag = "tech";
      chai
        .request(boot)
        .get(`/api/posts?tag=${tag}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.include.keys("posts");
          fError("return an object " + err);
        });
    });
    after(() => {
      shutdown();
    });
  });

  describe("/GET /api/posts", () => {
    it("can handle multiple tags", () => {
      const tags = ["tech", "history"];

      chai
        .request(boot)
        .get(`/api/posts/tag=${tags[0]},${tags[1]}`)
        .end((err, res) => {
          const post = res.body.posts;
          const randomId = Math.floor(Math.random() * post.length);

          expect(res.statusCode).to.be(200);
          expect(post[randomId].tags).to.contain(tags);
          fError("handle multiple tag " + err);
        });
    });
    after(() => {
      shutdown();
    });
  });

  describe("/GET ping/post", () => {
    it("check if invalid sortBy is provide", () => {
      const tag = "politics";
      const sortBy = "invalidParameter";

      chai
        .request(boot)
        .get(`/api/posts?tag=${tag}&sortBy=${sortBy}`)
        .end((err, res) => {
          expect(res.statusCode).to.be(400);
          fError("parameters provides" + err);
        });
    });
    after(() => {
      shutdown();
    });
  });

  describe("/GET ping/post", () => {
    it("check if invalid direction is provide", () => {
      const tag = "politics";
      const direction = "invalidParameter";

      chai
        .request(boot)
        .get(`/api/posts?tag=${tag}&direction=${direction}`)
        .end((err, res) => {
          expect(res.statusCode).to.be(400);
          fError("parameters provides" + err);
        });
    });
    after(() => {
      shutdown();
    });
  });

  describe("/GET ping/post", () => {
    it("check if sortBy parameter and direction are provides", () => {
      const tag = "tech";
      const sortBy = "reads";
      const direction = "asc";

      chai
        .request(boot)
        .get(`/api/posts/tag=${tag}&sortBy=${sortBy}&direction=${direction}`)
        .end((err, res) => {
          expect(res.statusCode).to.be(200);
          res.body.should.be.an("object");
          res.body.should.include.keys("posts");
          fError("parameters provides" + err);
        });
    });
    after(() => {
      shutdown();
    });
  });
  after(() => {
    shutdown();
  });
});
