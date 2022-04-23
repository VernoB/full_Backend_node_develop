const chai = require("chai");
const chai_http = require("chai-http");
const expect = chai.expect;

const controller = require("../../../Controllers/pingController");
const boot = require("../../../app").boot;
const shutdown = require("../../../app").shutdown;

chai.use(chai_http);

describe("Unit test /api/ping", () => {
  buildResponse = () => {
    return http_mocks.createResponse({
      eventEmitter: require("events").EventEmitter,
    });
  };

  describe("test for the ping controller exist or not", () => {
    it("exits", () => {
      expect(controller).to.exist;
    });
  });

  describe("/Get /api/ping ", (done) => {
    it("return an object", () => {
      chai
        .request(boot)
        .get("/api/ping")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
    after(() => {
      shutdown();
    });
  });
});
