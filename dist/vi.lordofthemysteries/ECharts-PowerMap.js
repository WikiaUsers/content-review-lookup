// Function to check the data-theme attribute
function getThemeByDataAttribute() {
  return document.documentElement.getAttribute('data-theme');
}

window.onload = function() {
  function checkTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      console.log("The page and all resources have loaded in dark mode.");
      // Add your custom logic here
    } else {
      console.log("The page and all resources have loaded in light mode.");
      // Add your custom logic here
    }
  }

  checkTheme();
  // Note: For handling theme changes after load, you would still need a MutationObserver.
};

if (mw.config.get("wgPageName") === "MediaWiki:ECharts-PowerMap.js") {
  // Create a container for the chart
  var chartBox = document.createElement("div");
  chartBox.className = "ECharts"; // matches your script’s selector
  chartBox.style.width = "100%";
  chartBox.style.height = "600px";

  // Inject into the wiki content area
  document.getElementById("mw-content-text").appendChild(chartBox);
  
  // Now your existing WikiECharts script will find `.ECharts`
  // and render the chart inside it
}