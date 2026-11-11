const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
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
document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
form.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent("Message depuis le portfolio LUC-DEV");
  const body = encodeURIComponent(
    `Bonjour Luc,\n\n${data.get("message")}\n\nNom : ${data.get("name")}\nE-mail : ${data.get("email")}`
  );
  document.getElementById("formHint").textContent = "Ouverture de votre application e-mail…";
  window.location.href = `mailto:lucnekenarakotonindrina@gmail.com?subject=${subject}&body=${body}`;
});
