/// <reference types="cypress" />

describe("Verify the Tabs in the Page", () => {
  it("visits site", () => {
    cy.visit("/");
  });
  it("Verify the Page", () => {
    var arr = ["schedule", "speakers", "map", "about"];

    arr.forEach((ele) => {
      cy.get('[tab="' + ele + '"]')
        .should("be.visible")
        .click();
    });
  });
});
