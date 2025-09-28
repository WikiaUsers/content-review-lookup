/* add class to custom tabs when sticky */
let stickyElm = document.querySelector('.tabs');
let observer = new IntersectionObserver( 
  ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
  {threshold: [1], rootMargin: "-47px 0px 0px 0px"}
);
observer.observe(stickyElm);