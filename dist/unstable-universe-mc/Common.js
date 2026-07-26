/* Any JavaScript here will be loaded for all users on every page load. */
let stickyElm = document.querySelector('.tabs-sticky');
let observer = new IntersectionObserver( 
  ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
  {threshold: [1], rootMargin: "-47px 0px 0px 0px"}
);
observer.observe(stickyElm);