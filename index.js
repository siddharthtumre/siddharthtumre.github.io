document.addEventListener("DOMContentLoaded", function () {
  fetch("components/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      const navbarContainer = document.getElementById("navbar");
      if (navbarContainer) {
        navbarContainer.innerHTML = data;

        const darkModeToggleButton =
          document.getElementById("dark-mode-toggle");
        const darkModeIcon = document.getElementById("dark-mode-icon");

        if (darkModeToggleButton && darkModeIcon) {
          let isDarkMode = false; // Initial state (false = light mode)

          darkModeToggleButton.addEventListener("click", function () {
            isDarkMode = !isDarkMode; // Toggle state

            // Change icon based on the state
            if (isDarkMode) {
              darkModeToggleButton.innerHTML =
                '<i id="dark-mode-icon" class="fas fa-sun"></i> Light Mode';
              document.body.classList.add("latex-dark"); // Example: add dark mode class to body
            } else {
              darkModeToggleButton.innerHTML =
                '<i id="dark-mode-icon" class="fas fa-moon"></i> Dark Mode';
              document.body.classList.remove("latex-dark"); // Example: remove dark mode class from body
            }

            console.log("Dark mode toggled:", isDarkMode);
          });
        } else {
          console.log("Button or icon not found");
        }
      } else {
        console.log("Navbar container not found");
      }
    })
    .catch((error) => console.error("Error loading navbar:", error));
});
