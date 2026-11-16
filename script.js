
// =====================================
// NOVABANK - APPLICATION JAVASCRIPT
// =====================================

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});

// Close mobile navigation after clicking a link

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});


// MODAL SYSTEM

const backdrop = document.getElementById("modalBackdrop");
const planSelect = document.getElementById("plan");
const toast = document.getElementById("toast");

let toastTimer;

function openModal(type, plan) {

  document.getElementById("modalTitle").textContent =
    type === "login"
      ? "Welcome back."
      : "Let's get you started.";

  document.getElementById("modalDescription").textContent =
    type === "login"
      ? "The NovaBank customer portal is a design preview and is not connected to a real banking system."
      : "Tell us a little about what you're looking for. This demo form does not create a real bank account.";

  document.getElementById("leadForm").style.display =
    type === "login" ? "none" : "block";

  if (plan) {
    planSelect.value = plan;
  }

  backdrop.classList.add("show");

  document.getElementById("closeModal").focus();
}


// OPEN MODALS

document.querySelectorAll("[data-open]").forEach(button => {

  button.addEventListener("click", () => {

    openModal(
      button.dataset.open,
      button.dataset.plan
    );

  });

});


// CLOSE MODALS

function closeModal() {
  backdrop.classList.remove("show");
}

document.getElementById("closeModal")
  .addEventListener("click", closeModal);

backdrop.addEventListener("click", event => {

  if (event.target === backdrop) {
    closeModal();
  }

});

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeModal();
  }

});


// NOTIFICATION SYSTEM

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);

}


// ACCOUNT INTEREST FORM

document.getElementById("leadForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    const name = document
      .getElementById("fullName")
      .value.trim();

    if (!name) return;

    closeModal();

    event.target.reset();

    showToast(
      `Thanks, ${name.split(" ")[0]} — this demo has recorded your interest locally for this session.`
    );

  });
