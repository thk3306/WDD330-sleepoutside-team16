import { loadHeaderFooter } from "./utils.mjs";

// Import the new Alert system
import Alert from "./alert.js";

// Load header and footer on page load
loadHeaderFooter();



// Initialize alert system for homepage
// This will load alerts from alerts.json and display them at the top of the page
const alertSystem = new Alert('/public/json/alerts.json');
alertSystem.init();