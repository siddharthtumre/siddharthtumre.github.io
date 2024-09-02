const darkModeSVG = `<svg id="dark-mode-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16">
  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
</svg>`;

const lightModeSVG = `<svg id="dark-mode-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16">
  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg>`;

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the dark mode state from localStorage
  let isDarkMode = localStorage.getItem("dark-mode") === "true";

  // Apply the dark mode class based on the stored state
  if (isDarkMode) {
    document.body.classList.add("latex-dark");
  } else {
    document.body.classList.remove("latex-dark");
  }

  const darkModeToggleButton = document.getElementById("dark-mode-toggle");
  const darkModeIcon = document.getElementById("dark-mode-icon");

  if (darkModeToggleButton && darkModeIcon) {
    // Set initial button state
    darkModeToggleButton.innerHTML = isDarkMode
      ? lightModeSVG + "Light Mode"
      : darkModeSVG + "Dark Mode";

    darkModeToggleButton.addEventListener("click", function () {
      // Toggle dark mode state
      isDarkMode = !isDarkMode;

      // Update icon and button text based on the new state
      if (isDarkMode) {
        darkModeToggleButton.innerHTML = lightModeSVG + "Light Mode";
        document.body.classList.add("latex-dark");
      } else {
        darkModeToggleButton.innerHTML = darkModeSVG + "Dark Mode";
        document.body.classList.remove("latex-dark");
      }

      // Save the new state to localStorage
      localStorage.setItem("dark-mode", isDarkMode);
      // console.log("Dark mode toggled:", isDarkMode);
    });
  }
});

// Variables to hold HTML content
let homeContent, aboutContent, contactContent, cvContent, blogContent;

// Variable to track the current page
let currentPage = localStorage.getItem("currentPage") || "home";

// Function to change content based on the page
const changeContent = (page, force = false) => {
  const contentDiv = document.getElementById("content");

  // Prevent reloading the content if already on the same page, unless forced
  if (currentPage === page && !force) {
    return;
  }

  switch (page) {
    case "home":
      contentDiv.innerHTML = homeContent;
      break;
    case "about":
      contentDiv.innerHTML = aboutContent;
      break;
    case "blog":
      contentDiv.innerHTML = blogContent;
      break;
    case "cv":
      contentDiv.innerHTML = cvContent;
      break;
    case "contact":
      contentDiv.innerHTML = contactContent;
      break;
    default:
      contentDiv.innerHTML = "<h2>Page not found!</h2>";
  }

  // Update the currentPage variable and save it to localStorage
  currentPage = page;
  localStorage.setItem("currentPage", currentPage);
};

// Fetch and load HTML files into the variables
Promise.all([
  fetch("home.html").then((response) => response.text()),
  fetch("about.html").then((response) => response.text()),
  fetch("contact.html").then((response) => response.text()),
  fetch("cv.html").then((response) => response.text()),
  fetch("blog.html").then((response) => response.text()),
])
  .then((data) => {
    [homeContent, aboutContent, contactContent, cvContent, blogContent] = data;

    changeContent(currentPage, true);
  })
  .catch((error) => {
    console.error("Error loading HTML files:", error);
  });
