import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

document
  .querySelector(".checkout-button")
  .addEventListener("click", () => (location.href = "/checkout/index.html"));
