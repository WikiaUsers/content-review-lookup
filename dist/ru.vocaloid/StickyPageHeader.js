var copiedHeader = false;
window.onscroll = function() {
  var communityHeader = document.querySelector(".community-header-wrapper");
  var pageHeader = document.querySelector(".page-header");
  var pageHeaderBottom = pageHeader.querySelector(".page-header__bottom");
  var main = document.querySelector(".page__main");
  var rightRail = document.querySelector(".page__right-rail");
  if (window.pageYOffset > communityHeader.offsetHeight + pageHeaderBottom.offsetHeight + pageHeader.offsetHeight) {
    if (!copiedHeader) {
      var clone = pageHeaderBottom.cloneNode(true);
      if (rightRail.classList.contains("is-rail-hidden")) {
        clone.classList.add("is-rail-hidden");
      }
      var actions = clone.querySelector(".page-header__actions");
      var topButton = document.createElement("button");
      topButton.innerHTML = "Наверх";
      topButton.classList.add("wds-button", "wds-is-text", "page-header__action-button", "has-label");
      topButton.addEventListener("click", function() {
        window.scrollTo(0, 0);
      });
      actions.appendChild(topButton);
      main.insertBefore(clone, main.firstChild);
      copiedHeader = true;
    }
    main.firstChild.classList.add("sticky");
    main.firstChild.style.opacity = 1;
  } else if (window.pageYOffset > communityHeader.offsetHeight + pageHeaderBottom.offsetHeight) {
    if (!copiedHeader) {
      var clone = pageHeaderBottom.cloneNode(true);
      if (rightRail.classList.contains("is-rail-hidden")) {
        clone.classList.add("is-rail-hidden");
      }
      var actions = clone.querySelector(".page-header__actions");
      var topButton = document.createElement("button");
      topButton.innerHTML = "Наверх";
      topButton.classList.add("wds-button", "wds-is-text", "page-header__action-button", "has-label");
      topButton.addEventListener("click", function() {
        window.scrollTo(0, 0);
      });
      actions.appendChild(topButton);
      main.insertBefore(clone, main.firstChild);
      copiedHeader = true;
    }
    main.firstChild.classList.add("sticky");
    var distance = window.pageYOffset - communityHeader.offsetHeight - pageHeaderBottom.offsetHeight;
    var maxDistance = pageHeader.offsetHeight;
    var opacity = Math.min(1, Math.max(0, distance / maxDistance));
    main.firstChild.style.opacity = opacity;
  } else {
    if (copiedHeader) {
      main.firstChild.classList.remove("sticky");
      main.firstChild.remove();
      copiedHeader = false;
    }
  }
};