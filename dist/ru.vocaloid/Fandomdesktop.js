// Import from -en: Randomize wiki logo: http://community.wikia.com/wiki/Thread:
(function() {
	var images = [
		'https://static.wikia.nocookie.net/vocaloid/images/c/c8/Wiki-wordmark-seeu.png/revision/latest?cb=20220120145921&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/a/a1/Wiki-wordmark-ryuto.png/revision/latest?cb=20220120145920&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/3/3e/Wiki-wordmark-rionv4.png/revision/latest?cb=20220120145919&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/2/25/Wiki-wordmark-rion.png/revision/latest?cb=20220120145918&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/1/14/Wiki-wordmark-ranav4.png/revision/latest?cb=20220120145917&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/d/d2/Wiki-wordmark-rana.png/revision/latest?cb=20220120145916&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/6/63/Wiki-wordmark-prima.png/revision/latest?cb=20220120145915&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/3/30/Wiki-wordmark-piko.png/revision/latest?cb=20220120145914&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/9/99/Wiki-wordmark-oliver.png/revision/latest?cb=20220120145913&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/5/54/Wiki-wordmark-nanav4.png/revision/latest?cb=20220120145912&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/a/a7/Wiki-wordmark-nana.png/revision/latest?cb=20220120145911&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/5/5c/Wiki-wordmark-mikuv4x.png/revision/latest?cb=20220120145910&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/6/60/Wiki-wordmark-miku3.png/revision/latest?cb=20220120145909&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/5/54/Wiki-wordmark-miku2.png/revision/latest?cb=20220120145908&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/f/fe/Wiki-wordmark-miku.png/revision/latest?cb=20220120145907&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/2/22/Wiki-wordmark-mew.png/revision/latest?cb=20220120145906&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/4/44/Wiki-wordmark-merli.png/revision/latest?cb=20220120145905&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/d/dd/Wiki-wordmark-meiko.png/revision/latest?cb=20220120145904&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/9/9f/Wiki-wordmark-mayu2.png/revision/latest?cb=20220120145903&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/3/38/Wiki-wordmark-mayu.png/revision/latest?cb=20220120145902&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/2/2f/Wiki-wordmark-maika.png/revision/latest?cb=20220120145901&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/9/9c/Wiki-wordmark-lumi.png/revision/latest?cb=20220120145900&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/d/db/Wiki-wordmark-lily.png/revision/latest?cb=20220120145859&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/f/f7/Wiki-wordmark-leon-lola.png/revision/latest?cb=20220120145858&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/4/46/Wiki-wordmark-lapis.png/revision/latest?cb=20220120145857&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/d/d3/Wiki-wordmark-kananon.png/revision/latest?cb=20220120145856&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/3/38/Wiki-wordmark-ia.png/revision/latest?cb=20220120145855&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/d/db/Wiki-wordmark-galaco2.png/revision/latest?cb=20220120145854&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/5/5d/Wiki-wordmark-galaco.png/revision/latest?cb=20220120145853&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/9/94/Wiki-wordmark-flower.png/revision/latest?cb=20220120145851&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/6/63/Wiki-wordmark-diva.png/revision/latest?cb=20220120145849&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/0/0e/Wiki-wordmark-cul.png/revision/latest?cb=20220120145848&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/b/b9/Wiki-wordmark-bruno.png/revision/latest?cb=20220120145845&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/8/80/Wiki-wordmark-azuki.png/revision/latest?cb=20220120145843&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/c/c2/Wiki-wordmark-avanna.png/revision/latest?cb=20220120145842&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/8/88/Wiki-wordmark-al.png/revision/latest?cb=20220120145841&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/b/bb/Wiki-wordmark-akiko.png/revision/latest?cb=20220120145840&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/8/8e/Wiki-wordmark-akari.png/revision/latest?cb=20220120145839&format=original&path-prefix=ru',
		'https://static.wikia.nocookie.net/vocaloid/images/5/5a/Wiki-wordmark-575.png/revision/latest?cb=20220120145838&format=original&path-prefix=ru'
	];

	$('.fandom-community-header__image img').attr('src', images[Math.floor(Math.random() * images.length)]);
});
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