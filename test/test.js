const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Analytics API Test Cases", () => {
  it("should fetch analytics for alias", (done) => {
    const alias = "H1V1F1J2";

    chai
      .request(app)
      .get(`/api/analytics/${alias}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.data.totalClicks).to.be.a("number");
        expect(res.body.data.uniqueUsers).to.be.a("number");
        expect(res.body.data.clicksByDate).to.be.an("array");
        expect(res.body.data.osType).to.be.an("array");
        expect(res.body.data.deviceType).to.be.an("array");
        done();
      });
  });

  it("should return 404 if no analytics or url found", (done) => {
    const alias = "H1V1";
    chai
      .request(app)
      .get(`/api/analytics/${alias}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal("No analytics found");
        done();
      });
  });

  it("should fetch analytics for topic", (done) => {
    const topic = "google";

    chai
      .request(app)
      .get(`/api/analytics/topic/${topic}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.data.totalClicks).to.be.a("number");
        expect(res.body.data.uniqueUsers).to.be.a("number");
        expect(res.body.data.clicksByDate).to.be.an("array");
        expect(res.body.data.urls).to.be.an("array");
        done();
      });
  });

  it("should fetch analytics for overall", (done) => {
    chai
      .request(app)
      .get(`/api/analytics/overall`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.data.totalUrls).to.be.a("number");
        expect(res.body.data.totalClicks).to.be.a("number");
        expect(res.body.data.uniqueUsers).to.be.a("number");
        expect(res.body.data.clicksByDate).to.be.an("array");
        expect(res.body.data.osType).to.be.an("array");
        expect(res.body.data.deviceType).to.be.an("array");
        done();
      });
  });
});
