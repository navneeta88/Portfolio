
// Loading Screen (monogram reveal)

window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  const minShow = 2600; // let the monogram animation finish
  setTimeout(() => {
    if (loader) {
      loader.classList.add("fade-out");
      document.body.classList.remove("loading");
    }
  }, minShow);
});

document.addEventListener("DOMContentLoaded", () => {

  
  // Typing Animation
 
  const text = ["ML/AI Developer", "Agentic AI Builder", "Problem Solver"];
  let i = 0, j = 0, isDeleting = false;

  function type() {
    const currentText = text[i];
    document.getElementById("typing").textContent =
      currentText.substring(0, isDeleting ? j-- : j++);

    if (!isDeleting && j === currentText.length + 1) {
      isDeleting = true;
      setTimeout(type, 1200);
      return;
    }
    if (isDeleting && j === -1) {
      isDeleting = false;
      j = 0;
      i = (i + 1) % text.length;
    }
    setTimeout(type, isDeleting ? 50 : 100);
  }
  type();

  // Scroll Reveal + Skill Bars
  
  const sections = document.querySelectorAll(".hidden");
  let skillsAnimated = false;

  function revealOnScroll() {
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top < window.innerHeight - 80) {
        sec.classList.add("show");
      }
    });


  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  
  // Active Navbar Highlight
  
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    document.querySelectorAll("section").forEach(section => {
      if (window.scrollY >= section.offsetTop - 130) {
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

  
  // Animated Stats Counter
  
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    const statsSection = document.getElementById("stats");
    if (!statsSection) return;
    const top = statsSection.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      statsAnimated = true;
      document.querySelectorAll(".stat-number").forEach(el => {
        const target = parseInt(el.getAttribute("data-target"));
        const duration = 1400;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current);
        }, 16);
      });
    }
  }

  window.addEventListener("scroll", animateStats);
  animateStats();

  
  // Back To Top Button
  
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("visible");
    else backToTop.classList.remove("visible");
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  const toggleBtn = document.getElementById("darkModeToggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.checked = true;
  }

  toggleBtn.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", toggleBtn.checked ? "dark" : "light");
  });

});


// Cursor Glow Effect

const glow = document.createElement("div");
glow.id = "cursor-glow";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});