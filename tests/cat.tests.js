const chai = require("chai");
// Plug-in to send requests
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
// Import our server
const server = require("../index");
// Import mongoose for after test clean up
const mongoose = require("mongoose");
// Import DB schema class
const { catModel } = require("../db");

// Describe a test "suite" with the given title and callback fn containing nested suites.
describe("API Tests", () => {
    // Clear the cats from the DB and add one
    let testCat;
    beforeEach(async () => {
        await catModel.deleteMany({});
        // Create a cat in Mongo DB for testing
        testCat = await catModel.create({
            name: "Jason",
            colour: "Tabby",
            evil: false,
        });

        // Convert to JSON and back to an object
        // removes any $ chars etc.
        testCat = JSON.stringify(testCat);
        testCat = JSON.parse(testCat);
    });

    // Tests - Describe a specification or test-case
    // with the given title and callback fn acting as a thunk (fn with delay).

    // Test create
    it("Should create a cat", (done) => {
        const cat = { name: "Deux", colour: "Black", evil: true };
        chai.request(server)
            .post("/cats/create")
            .send(cat)
            .end((err, res) => {
                chai.expect(err).to.be.null;
                // Check that body contains the data we passed in - can't
                // use equals as the returned cat will also include the ID
                chai.expect(res.body).to.include(cat);
                chai.expect(res.status).to.equal(201);
                done(); // Fin!
            });
    });

    // Test getAll
    it("Should return all cats", (done) => {
        chai.request(server)
            .get("/cats/getAll")
            .send()
            .end((err, res) => {
                chai.expect(err).to.be.null;
                // Test the testCat exists
                chai.expect(res.body[0]).to.include(testCat);
                chai.expect(res.status).to.equal(200);
                done();
            });
    });

    // Test delete
    it("Should delete the test cat", (done) => {
        chai.request(server)
            .delete(`/cats/remove/${testCat.id}`)
            .send()
            .end((err, res) => {
                chai.expect(err).to.be.null;
                console.log(`testCat ID: ${testCat._id}`);
                chai.expect(res.body._id).to.equal(testCat._id);
                chai.expect(res.status).to.equal(200);
            });
    });

    // After all tests - disconnect
    after(async () => {
        await mongoose.disconnect();
    });
});
