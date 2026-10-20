document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const links = navLinks.querySelectorAll("a");

  /* ---------- Sticky nav background ---------- */
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const setMenu = (open) => {
    navLinks.classList.toggle("open", open);
    navToggle.classList.toggle("open", open);
    nav.classList.toggle("menu-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  };
  navToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  links.forEach((link) => link.addEventListener("click", () => setMenu(false)));

  /* ---------- Active link on scroll ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Typing effect ---------- */
  const typedEl = document.getElementById("typed");
  const roles = [
    "AI/ML Engineer",
    "Computer Vision Developer",
    "Agentic AI Builder",
    "Frontend & UI/UX Enthusiast",
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const type = () => {
    const current = roles[roleIndex];
    typedEl.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
      charIndex++;
      setTimeout(type, 80);
    } else if (!deleting) {
      deleting = true;
      setTimeout(type, 1500);
    } else if (charIndex > 0) {
      charIndex--;
      setTimeout(type, 40);
    } else {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 300);
    }
  };
  if (reduceMotion) {
    typedEl.textContent = roles[0];
  } else {
    type();
  }

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    revealObserver.observe(el);
  });

  /* ---------- Animated counters ---------- */
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + (progress === 1 ? suffix : "");
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

  /* ---------- Contact form (opens the visitor's email app) ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    [form.name, form.email, form.message].forEach((f) => f.classList.remove("invalid"));
    status.className = "form__status";

    let valid = true;
    if (!name) { form.name.classList.add("invalid"); valid = false; }
    if (!emailPattern.test(email)) { form.email.classList.add("invalid"); valid = false; }
    if (!message) { form.message.classList.add("invalid"); valid = false; }

    if (!valid) {
      status.textContent = "Please fill in all fields with a valid email.";
      status.classList.add("error");
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n- ${name} (${email})`);
    window.location.href = `mailto:jjassmitha@gmail.com?subject=${subject}&body=${body}`;

    status.textContent = "Opening your email app...";
    status.classList.add("ok");
    form.reset();
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
