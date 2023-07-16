/* Any JavaScript here will be loaded for all users on every page load. */

/* Custom Staff Userpage */

/* User:Eterhox */
const nerd = /(User:Eterhox|Message_Wall:Eterhox|User_blog:Eterhox\/?|Special:Contributions\/Eterhox|Special:UserProfileActivity\/Eterhox)/.test(window.location.href);
if (nerd) {
  const eter = document.createElement('link');
  eter.rel = 'stylesheet';
  eter.type = 'text/css';
  eter.href = 'https://oneplus.fandom.com/load.php?mode=articles&articles=User:Eterhox/User.css&only=styles';
  document.head.appendChild(eter);
  console.log("Flaming Wolf: Code has ran successfully!");
}