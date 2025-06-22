document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  const headings = document.querySelectorAll("h1, h2, h3, h4, h5");
  headings.forEach((heading) => {
    heading.classList.add("scroll-animate");
    observer.observe(heading);
  });
});