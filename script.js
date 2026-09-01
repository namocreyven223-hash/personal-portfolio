document.addEventListener("DOMContentLoaded", () => {
  const progress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");
  const year = document.getElementById("year");
  const sections = [...document.querySelectorAll("section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-links a")];

  if (year) year.textContent = new Date().getFullYear();

  const updateScrollUI = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percent = height > 0 ? (scrollTop / height) * 100 : 0;
    if (progress) progress.style.width = `${percent}%`;
    if (backToTop) backToTop.classList.toggle("show", scrollTop > 500);

    let current = "home";
    sections.forEach(section => {
      if (scrollTop >= section.offsetTop - 180) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", updateScrollUI, {passive:true});
  updateScrollUI();

  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
  }

  // Reveal portfolio sections as they enter the screen.
  const revealItems = document.querySelectorAll(".section, .project, .card, .evidence > div, .skills > div, .contacts > *");
  revealItems.forEach(item => item.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.12});
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Smoothly close focus after clicking a navigation link on small screens.
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.setAttribute("tabindex", "-1");
    });
  });
});
