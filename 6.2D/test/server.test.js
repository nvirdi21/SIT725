const chai = require("chai");
const request = require("request");
const expect = chai.expect;
const { server, Card } = require("../server");

const baseUrl = "http://localhost:3000";

describe("Cards API", () => {
  let createdCardId;

  // Clean DB before tests
  before(async () => {
    await Card.deleteMany({});
  });

  after(() => {
    server.close();
  });

  it("should return 200 for GET /cards", (done) => {
    request.get(`${baseUrl}/cards`, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.be.a("string");
      done();
    });
  });

  it("should create a new card", (done) => {
    const testCard = {
      name: "Test Card",
      image: "http://example.com/image.jpg",
      description: "A test card"
    };

    request.post({
      url: `${baseUrl}/cards`,
      json: testCard
    }, (error, response, body) => {
      expect(response.statusCode).to.equal(201);
      expect(body).to.have.property("_id");
      expect(body.name).to.equal("Test Card");
      createdCardId = body._id;
      done();
    });
  });

  it("should retrieve a specific card by ID", (done) => {
    request.get(`${baseUrl}/cards/${createdCardId}`, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      const data = JSON.parse(body);
      expect(data._id).to.equal(createdCardId);
      expect(data.name).to.equal("Test Card");
      done();
    });
  });

  it("should update a card", (done) => {
    const updatedData = {
      name: "Updated Card",
      description: "This is updated"
    };

    request.put({
      url: `${baseUrl}/cards/${createdCardId}`,
      json: updatedData
    }, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body.name).to.equal("Updated Card");
      expect(body.description).to.equal("This is updated");
      done();
    });
  });

  it("should delete the card", (done) => {
    request.delete(`${baseUrl}/cards/${createdCardId}`, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      const data = JSON.parse(body);
      expect(data.message).to.equal("Card deleted successfully");
      done();
    });
  });

  it("should return 404 when getting deleted card", (done) => {
    request.get(`${baseUrl}/cards/${createdCardId}`, (error, response, body) => {
      expect(response.statusCode).to.equal(404);
      const data = JSON.parse(body);
      expect(data.message).to.equal("Card not found");
      done();
    });
  });
  describe("Sum Calculator API - /add route", () => {
    it("should return correct sum for valid numbers", (done) => {
      request.get(`${baseUrl}/add?a=10&b=5`, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal("15");
        done();
      });
    });
  
    it("should return 400 if a is missing", (done) => {
      request.get(`${baseUrl}/add?b=5`, (error, response, body) => {
        expect(response.statusCode).to.equal(400);
        expect(body).to.include("Invalid input");
        done();
      });
    });
  
    it("should return 400 if b is missing", (done) => {
      request.get(`${baseUrl}/add?a=10`, (error, response, body) => {
        expect(response.statusCode).to.equal(400);
        expect(body).to.include("Invalid input");
        done();
      });
    });
  
    it("should return 400 for non-numeric input", (done) => {
      request.get(`${baseUrl}/add?a=hello&b=world`, (error, response, body) => {
        expect(response.statusCode).to.equal(400);
        expect(body).to.include("Invalid input");
        done();
      });
    });
  });
  
});
