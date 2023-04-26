const chai = require("chai");
// Plug-in to send requests
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
// Import our server
const server = require("../index");

// Describe a test "suite" with the given title and callback fn containing nested suites.
describe("API Tests", () => {
    // Describe a specification or test-case 
    // with the given title and callback fn acting as a thunk (fn with delay).
    it("Should create a cat", (done) => {
        const cat = {name: "Jason", colour: "Tabby", evil: true};
        chai.request(server).post("/cats/create")
        .send(cat).end((err, res) => {
            chai.expect(err).to.be.null;
            // Check that body contains the data we passed in - can't 
            // use equals as the returned cat will include the ID
            chai.expect(res.body).to.include(cat);
            chai.expect(res.status).to.equal(201);
            done();
        })
    });
});