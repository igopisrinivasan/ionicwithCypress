import "cypress-shadow-dom";
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import "cypress-file-upload";
let LOCAL_STORAGE_MEMORY = {};
Cypress.Commands.add("SignIn", () => {
  cy.visit("/login");
  cy.title().should("eq", "Conduit");
  cy.location("protocol").should("eq", "https:");
  cy.get("form").within(($form) => {
    // cy.get() will only search for elements within form, not within the entire document
    cy.get('input[type="email"]').type("coe@gmail.com");
    cy.get('input[type="password"]').type("coeautomation");
    cy.root().submit(); // submits the form yielded from 'within'
  });
  cy.contains("Your Feed", { timeout: 10000 }).should("be.visible");
});

Cypress.Commands.add("login", (email, password) => {
  cy.get("#Email").clear().type(email);
  cy.get("#Password").clear().type(password);
  cy.get("input[type='submit']").click();
});
Cypress.Commands.add("saveLocalStorageCache", () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
  cy.log("Local Session Storage Saved in the Browser");
});

Cypress.Commands.add("restoreLocalStorageCache", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    window.localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
  cy.log("Local Session Storage Restored in the Browser");
});

Cypress.Commands.add("clearLocalStorageCache", () => {
  localStorage.clear();
  LOCAL_STORAGE_MEMORY = {};
  cy.log("Local Session Storage Cleared in the Browser");
});

import { Storage } from "@ionic/storage";

const storage = new Storage();

Cypress.Commands.add("enableTutorial", () => {
  cy.visit("/", {
    onBeforeLoad() {
      storage.set("ion_did_tutorial", false);
    },
  });
});

Cypress.Commands.add("disableTutorial", () => {
  cy.visit("/", {
    onBeforeLoad() {
      storage.set("ion_did_tutorial", true);
    },
  });
});

Cypress.Commands.add("swipeLeft", () => {
  cy.get(".swiper-slide-active")
    .trigger("mousedown", { position: "right" })
    .trigger("mousemove", { clientX: 100, clientY: 275 })
    .trigger("mouseup", { force: true });
});

Cypress.Commands.add("swipeRight", () => {
  cy.get(".swiper-slide-active")
    .trigger("mousedown", { position: "left" })
    .trigger("mousemove", { clientX: 300, clientY: 275 })
    .trigger("mouseup", { force: true });
});
