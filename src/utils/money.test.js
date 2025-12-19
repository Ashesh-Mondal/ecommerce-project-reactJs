import { it, expect, describe } from "vitest";
import { formatMoney } from "./money";

// describe => it lets us group related tests together
// group of tests = test suite
// first argument is the name of the test suite/group
// it helps us to organize our tests better
describe("formatMoney", () => {
  // it lets us create a test case
  // it(''); => this creates a test and the first argument is the name of the test i.e it describes what we are testing
  it("formats 1999 cents to $19.99", () => {
    // expect => is used to check if the result is correct
    // if the value from the function call is equal to the expected value then the test will pass
    expect(formatMoney(1999)).toBe("$19.99");
  });

  it("displays two decimal places", () => {
    expect(formatMoney(1090)).toBe("$10.90");
    expect(formatMoney(500)).toBe("$5.00");
  });
});
