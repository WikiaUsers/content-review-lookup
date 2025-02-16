(function() {
  // Function to apply the mode based on a given value
  function applyMode(mode) {
    var htmlEl = document.documentElement;
    // Clear both classes first
    htmlEl.classList.remove('dark-mode', 'light-mode');
    
    if (mode === 'dark') {
      htmlEl.classList.add('dark-mode');
    } else if (mode === 'light') {
      htmlEl.classList.add('light-mode');
    } else {
      // If no mode stored, use system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlEl.classList.add('dark-mode');
      } else {
        htmlEl.classList.add('light-mode');
      }
    }
  }

  // Retrieve stored mode and apply it
  var storedMode = localStorage.getItem('preferredMode');
  applyMode(storedMode);

  // Create a toggle button
  var toggleBtn = document.createElement('button');
  toggleBtn.id = 'colorModeToggle';
  toggleBtn.textContent = 'Toggle Color Mode';
  // Style the button (feel free to adjust)
  toggleBtn.style.position = 'fixed';
  toggleBtn.style.bottom = '10px';
  toggleBtn.style.right = '10px';
  toggleBtn.style.zIndex = '1000';
  toggleBtn.style.padding = '8px 12px';
  toggleBtn.style.background = '#1e1e1e';
  toggleBtn.style.color = '#fff';
  toggleBtn.style.border = 'none';
  toggleBtn.style.borderRadius = '4px';
  toggleBtn.style.cursor = 'pointer';
  
  document.body.appendChild(toggleBtn);

  // Add event listener to toggle the mode
  toggleBtn.addEventListener('click', function() {
    var htmlEl = document.documentElement;
    if (htmlEl.classList.contains('dark-mode')) {
      applyMode('light');
      localStorage.setItem('preferredMode', 'light');
    } else {
      applyMode('dark');
      localStorage.setItem('preferredMode', 'dark');
    }
  });
})();