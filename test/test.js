const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
chai.expect();

describe("basic crud operations", () => {
  let request;
  beforeEach(() => {
    request = chai.request("http://localhost:9000");
  });

  describe("Cohorts", () => {
    it("should retrieve location objects", async () => {
      const res = await request.get("/api/locations");
      const location = JSON.parse(res.text)[0];
      location.should.have.property("id");
      location.should.have.property("latitude");
      location.should.have.property("longitude");
      location.should.have.property("name");
      location.should.have.property("unleaded");
      location.should.have.property("midgrade");
      location.should.have.property("premium");
      location.should.have.property("phone");
      location.should.have.property("sitetype");
      location.should.have.property("amenities");
    });
  });
});
