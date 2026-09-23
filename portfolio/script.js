/* ==========================================================
   PORTFOLIO SAMBA NDIAYE - SCRIPT JAVASCRIPT
   Toutes les interactions de la page sont gérées ici.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ----------------------------------------------------------
     1. MENU HAMBURGER (mobile)
     ---------------------------------------------------------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
  });

  // Fermer le menu quand on clique sur un lien (mobile)
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  /* ----------------------------------------------------------
     2. MODE SOMBRE / CLAIR
     ---------------------------------------------------------- */
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");
  const body = document.body;

  // On vérifie si l'utilisateur avait déjà choisi un thème
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");

    // On change l'icône (lune <-> soleil)
    themeIcon.classList.toggle("fa-moon", !isDark);
    themeIcon.classList.toggle("fa-sun", isDark);

    // On enregistre le choix pour la prochaine visite
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  /* ----------------------------------------------------------
     3. NAVIGATION ACTIVE AU DÉFILEMENT
     ---------------------------------------------------------- */
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  function highlightNav() {
    let current = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", highlightNav);

  /* ----------------------------------------------------------
     4. ANIMATION AU DÉFILEMENT (reveal)
     ---------------------------------------------------------- */
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));

  /* ----------------------------------------------------------
     5. BOUTON RETOUR EN HAUT
     ---------------------------------------------------------- */
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ----------------------------------------------------------
     6. VALIDATION DU FORMULAIRE DE CONTACT
     ---------------------------------------------------------- */
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const formSuccess = document.getElementById("formSuccess");

  function setError(input, errorId, message) {
    document.getElementById(errorId).textContent = message;
    input.closest(".form-group").classList.toggle("invalid", Boolean(message));
  }

  function isValidEmail(value) {
    // Vérification simple du format d'un email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Vérification du nom
    if (nameInput.value.trim().length < 2) {
      setError(nameInput, "nameError", "Merci d'indiquer votre nom.");
      isValid = false;
    } else {
      setError(nameInput, "nameError", "");
    }

    // Vérification de l'email
    if (!isValidEmail(emailInput.value.trim())) {
      setError(emailInput, "emailError", "Merci d'indiquer un email valide.");
      isValid = false;
    } else {
      setError(emailInput, "emailError", "");
    }

    // Vérification du message
    if (messageInput.value.trim().length < 10) {
      setError(messageInput, "messageError", "Votre message doit contenir au moins 10 caractères.");
      isValid = false;
    } else {
      setError(messageInput, "messageError", "");
    }

    if (isValid) {
      formSuccess.classList.add("show");
      form.reset();
      setTimeout(() => formSuccess.classList.remove("show"), 4000);
    }
  });

});
