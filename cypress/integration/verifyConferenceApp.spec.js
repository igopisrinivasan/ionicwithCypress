import { clearIndexedDb } from "./common/index";
/// <reference types="cypress" />

describe("Verify the Ionic Conference App", () => {
  before(() => {
    cy.clearLocalStorageCache();
    cy.clearCookies();
    clearIndexedDb();
  });

  it("visits site", () => {
    clearIndexedDb();
    cy.visit("/");
    cy.get('[color="primary"]').click();
  });
  it("Verify the Page", () => {
    var arr = ["speakers", "map", "about", "schedule"];

    arr.forEach((ele) => {
      cy.wait(400);
      cy.get('[tab="' + ele + '"]')
        .should("be.visible")
        .click();
    });
  });

  it.skip("Verify the Menu Items", () => {
    var arr = [
      "Schedule",
      "Speakers",
      "Map",
      "About",
      "Login",
      "Support",
      "Signup",
    ];
    arr.forEach((ele) => {
      cy.get(".buttons-first-slot > .md").should("be.visible").click();
      cy.wait(500);
      cy.shadowGet(
        '[ng-reflect-router-link="/app/tabs/' + ele.toLowerCase() + '"]'
      )
        .shadowFind("a.item-native")
        .click({ force: true });

      cy.get("ion-title.title-default").contains(ele).should("be.visible");
    });
  });

  it("Verify the Toggle Button", () => {
    cy.get('[ng-reflect-value="favorites"]').click();
    cy.contains("No Sessions Found").should("be.visible");
    cy.get('[ng-reflect-value="all"]').click();

    var arr = ["8:00 am", "9:15 am", "10:00 am", "11:00 am"];

    arr.forEach((ele) => {
      cy.contains(ele).should("be.visible");
      cy.wait(500);
    });
  });

  it("Verify Options", () => {
    clearIndexedDb();
    cy.visit("/");
    cy.get('[color="primary"]').click();
    cy.get('[name="options"]').click();

    var arr = [
      "angular",
      "documentation",
      "food",
      "ionic",
      "tooling",
      "design",
      "services",
      "workshop",
      "communication",
      "navigation",
    ];

    arr.forEach((ele) => {
      cy.get('div[role="dialog"] ion-list [track="' + ele + '"]')
        .should("be.visible")
        .click();
      cy.wait(500);
    });

    cy.get("ion-button").contains("Done").should("be.visible").click();
  });

  it("Verify the Toggle Button", () => {
    cy.get('[ng-reflect-value="favorites"]').click();
    cy.contains("No Sessions Found").should("be.visible");
    cy.get('[ng-reflect-value="all"]').click();
    cy.contains("No Sessions Found").should("be.visible");
  });

  it("Verify Speaker List", () => {
    cy.get('[tab="speakers"]').should("be.visible").click();

    var arr = [
      "Burt Bear",
      "Charlie Cheetah",
      "Donald Duck",
      "Eva Eagle",
      "Ellie Elephant",
      "Gino Giraffe",
      "Isabella Iguana",
      "Karl Kitten",
      "Lionel Lion",
      "Molly Mouse",
    ];
    arr.forEach((ele) => {
      cy.wait(500);
      cy.get("ion-label h2");
      cy.get("ion-label h2").contains(ele).scrollIntoView();
      //  cy.swipeDown(ele);
      //.scrollIntoView({ easing: "swing", duration: 500 });
    });
  });
});
