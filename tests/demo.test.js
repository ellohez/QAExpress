// Import chai
const {expect} = require("chai");
const {isPrime} = require("../maths");

describe("test suite", ()=> {

    // Basic test 1 + 1 = 2
    it("should equal 2", () => {
        expect(1 + 1).to.equal(2);
    })

    let nonPrimes = [4, 32, 74, 54, 600];
    nonPrimes.forEach(value => {
        it(`${value} is not a prime`, () => {
            expect(isPrime(value)).to.equal(false);
        })
    })

    let primes = [2, 5, 29, 59, 353];
    primes.forEach(value => {
        it(`${value} is a prime`, () => {
            expect(isPrime(value)).to.equal(true);
        })
    })
});


   
