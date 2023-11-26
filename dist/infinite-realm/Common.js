/* Any JavaScript here will be loaded for all users on every page load. */

/* The following facilitates a spoiler warning each time a user loads a page.
 * Once the user dismisses the dialog, a flag will be set in localstorage to
 * ensure they don't see it again.
 *
 * Heavily inspired by the dialog used at the coppermind wiki. 
 * See here: https://coppermind.net/wiki/MediaWiki:Common.js 
 */

function hideSpoilerWarning(container) {
  // Remember that the user has seen this warning, for future visits.
  localStorage.setItem('ir-spoiler-warning-state', 'seen');
  document.body.classList.remove('ir-spoiler-blur');
  container.remove();
}

function showSpoilerWarning() {

  // Create the needed DOM elements for the popup, with relevant classnames.
  const container = document.createElement('div');
  container.classList.add('ir-spoiler-full-window');

  const popup = document.createElement('div');
  popup.classList.add('ir-spoiler-popup-box');

  const heading = document.createElement('h2');
  heading.innerText = "Spoilers ahead!!";

  const warning = document.createElement('p');
  warning.innerText = "Welcome to the Infinite Realm Wiki! However, please be warned that the content here reflects the current state of the ongoing web novel, Infinite Realm: Monsters and Legends.";

  const advice = document.createElement('p');
  advice.innerHTML = "To avoid spoilers, make sure you've read the first 5 published volumes on <a href='https://www.amazon.com/dp/B08SCFZWP5'>Kindle Unlimited</a>, as well as the <a href='https://www.royalroad.com/fiction/27325/infinite-realm-monsters-legends'>latest chapters on Royal Road</a> before continuing.";

  const button = document.createElement('button');
  button.classList.add('ir-spoiler-button');
  button.innerText = "Continue";
  button.ariaLabel = "Continue to wiki";
  button.onclick = function() { hideSpoilerWarning(container) };

  // Combine DOM elements into the popup, and then insert into the overlay flexbox.
  popup.append(heading, warning, advice, button);
  container.append(popup);

  // Add blur then show the popup
  document.body.classList.add("ir-spoiler-blur");
  document.body.appendChild(container);
}

// Always try to show warning once the site loads.
$(document).ready(function() {
  // However, only show warning if the user hasn't seen it before (according to cache)
  if (localStorage.getItem('ir-spoiler-warning-state') === null)
    showSpoilerWarning();
});