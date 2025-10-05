document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".rslider-item");
  const prev = document.querySelector(".rslider-prev");
  const next = document.querySelector(".rslider-next");
  const caption = document.createElement("div");
  caption.className = "rslider-caption";
  document.querySelector(".rslider-wrapper").appendChild(caption);

  let current = 0;
  function showSlide(index) {
    slides.forEach((s, i) => {
      s.style.display = i === index ? "block" : "none";
    });
    const cap = slides[index].getAttribute("data-caption") || "";
    caption.innerHTML = cap;
  }

  prev.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  next.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  showSlide(current);
});