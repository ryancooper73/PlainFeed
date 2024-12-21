// Theme utility
function updateTheme() {
  const hour = new Date().getHours();
  const isDarkMode = hour >= 18 || hour < 6; // Dark mode between 6 PM and 6 AM
  document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
}

// Update theme immediately and every minute
updateTheme();
setInterval(updateTheme, 60000);