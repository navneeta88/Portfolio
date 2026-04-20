document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // Typing Animation
  // =========================
  const text = ["Developer", "Problem Solver", "Tech Enthusiast"];
  let i = 0;
  let j = 0;
  let isDeleting = false;

  function type() {
    const currentText = text[i];

    if (!isDeleting) {
      document.getElementById("typing").innerHTML =
        currentText.substring(0, j++);
    } else {
      document.getElementById("typing").innerHTML =
        currentText.substring(0, j--);
    }

    if (j === currentText.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }

    if (j === 0 && isDeleting) {
      isDeleting = false;
      i = (i + 1) % text.length;
    }

    setTimeout(type, isDeleting ? 50 : 100);
  }

  type();

  // =========================
  // Scroll Animation
  // =========================
  const sections = document.querySelectorAll(".hidden");

  function revealOnScroll() {
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;

      if (top < window.innerHeight - 100) {
        sec.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // =========================
  // Active Navbar Highlight
  // =========================
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    document.querySelectorAll("section").forEach(section => {
      const sectionTop = section.offsetTop - 120;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // =========================
  // Dark Mode Toggle (SWITCH VERSION)
  // =========================
  const toggleBtn = document.getElementById("darkModeToggle");

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.checked = true;
  }

  // Toggle theme
  toggleBtn.addEventListener("change", () => {
    document.body.classList.toggle("dark");

    if (toggleBtn.checked) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

});


// =========================
// Cursor Glow Effect
// =========================
const glow = document.createElement("div");

glow.style.position = "fixed";
glow.style.width = "20px";
glow.style.height = "20px";
glow.style.borderRadius = "50%";
glow.style.background = "rgba(0,198,255,0.7)";
glow.style.pointerEvents = "none";
glow.style.transform = "translate(-50%, -50%)";
glow.style.zIndex = "9999";

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});