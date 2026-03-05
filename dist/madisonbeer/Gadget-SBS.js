// Only run once
if (!window.themePriority) window.themePriority = {};

// Define priority
const themes = ['Locket', 'SBS', 'LS', 'ASP'];

// Check which theme is active (replace with your real detection)
const activeTheme = window.activeTheme || null;

// Set priority flag
if (activeTheme === 'Locket') {
    window.themePriority.locked = 'Locket';
} else if (activeTheme === 'SBS' && !window.themePriority.locked) {
    window.themePriority.locked = 'SBS';
} else if (activeTheme === 'LS' && !window.themePriority.locked) {
    window.themePriority.locked = 'LS';
} else if (activeTheme === 'ASP' && !window.themePriority.locked) {
    window.themePriority.locked = 'ASP';
}

// Add class to <html> for CSS targeting
document.documentElement.classList.add(`theme-${window.themePriority.locked}`);