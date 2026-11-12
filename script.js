const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(opened));
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Apparition progressive des cartes et images pendant le défilement.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${(index % 3) * 90}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

// Léger effet de profondeur au survol des visuels (désactivé sur écran tactile).
const finePointer = window.matchMedia("(pointer: fine)").matches;
if (finePointer) {
  document.querySelectorAll(".visual-card").forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-3px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// Formulaire : prépare un e-mail avec les informations saisies.
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent("Message depuis le portfolio LUC-DEV");
    const body = encodeURIComponent(
      `Bonjour Luc,\n\n${data.get("message")}\n\nNom : ${data.get("name")}\nE-mail : ${data.get("email")}`
    );
    const hint = document.getElementById("formHint");
    if (hint) hint.textContent = "Ouverture de votre application e-mail…";
    window.location.href = `mailto:lucnekenarakotonindrina@gmail.com?subject=${subject}&body=${body}`;
  });
}
