// theme_toggle.js
document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (localStorage.getItem("dark-theme") === "enabled") {
        body.classList.add("dark-theme");
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-theme");
        localStorage.setItem("dark-theme", body.classList.contains("dark-theme") ? "enabled" : "disabled");
    });
});
