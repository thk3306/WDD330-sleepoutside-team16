// Alert.js - Module to display customizable alerts on the homepage
// This class reads alerts from a JSON file and displays them at the top of the page

export default class Alert {
  // Constructor: Sets up the Alert class with the path to alerts.json
  // Path is relative to where the HTML file loads this script from
  constructor(alertsPath = '/public/json/alerts.json') {
    this.alertsPath = alertsPath;
  }

  // init(): The main method that loads and displays alerts
  // This is async because we need to wait for the JSON file to load
  async init() {
    try {
      // Fetch the alerts.json file from the server
      const response = await fetch(this.alertsPath);
      
      // Check if the file was found (response.ok is true if status is 200-299)
      if (!response.ok) {
        console.warn('No alerts found or failed to load alerts.json');
        return; // Exit early if file not found
      }

      // Convert the JSON response to a JavaScript array
      const alerts = await response.json();
      
      // Only create alert section if there are alerts in the array
      if (alerts && alerts.length > 0) {
        this.createAlertSection(alerts);
      }
    } catch (error) {
      // If anything goes wrong (network error, invalid JSON, etc.), log it
      console.error('Error loading alerts:', error);
    }
  }

  // createAlertSection(): Creates the HTML elements for displaying alerts
  // Parameter: alerts - an array of alert objects from the JSON file
  createAlertSection(alerts) {
    // Step 1: Create the main container (section element)
    const section = document.createElement('section');
    section.className = 'alert-list'; // Add CSS class for styling

    // Step 2: Loop through each alert in the array
    alerts.forEach(alert => {
      // Create a paragraph element for each alert
      const p = document.createElement('p');
      
      // Set the text content from the alert message
      p.textContent = alert.message;
      
      // Apply the background color specified in the JSON
      p.style.backgroundColor = alert.background;
      
      // Apply the text color specified in the JSON
      p.style.color = alert.color;
      
      // Add a CSS class for additional styling
      p.className = 'alert-item';
      
      // Add this paragraph to the section
      section.appendChild(p);
    });

    // Step 3: Find the <main> element on the page
    const main = document.querySelector('main');
    
    // Step 4: If main exists, add the alert section to the TOP of it
    if (main) {
      main.prepend(section); // prepend adds to the beginning
    } else {
      // If no main element found, warn in console
      console.warn('Main element not found on page');
    }
  }
}

// USAGE EXAMPLE:
// import Alert from './Alert.js';
// const alertSystem = new Alert('/public/json/alerts.json');
// alertSystem.init();