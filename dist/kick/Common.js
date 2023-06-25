/* Any JavaScript here will be loaded for all users on every page load. */

/* Staff Userpage (CSS Override) */

const nerd = /(User:Eterhox|Message_Wall:Eterhox|User_blog:Eterhox\/?|Special:Contributions\/Eterhox|Special:UserProfileActivity\/Eterhox)/.test(window.location.href);

if (nerd) {
  const link1 = document.createElement('link');
  link1.rel = 'stylesheet';
  link1.type = 'text/css';
  link1.href = 'https://kick.fandom.com/load.php?mode=articles&articles=User:Eterhox/Dev.css&only=styles';
  document.head.appendChild(link1);
  console.log("FW: W.L. match!");
}

const eteriki = /(User:Eteriki|Message_Wall:Eteriki|User_blog:Eteriki\/?|Special:Contributions\/Eteriki|Special:UserProfileActivity\/Eteriki)/.test(window.location.href);

if (eteriki) {
  const link2 = document.createElement('link');
  link2.rel = 'stylesheet';
  link2.type = 'text/css';
  link2.href = 'https://kick.fandom.com/load.php?mode=articles&articles=User:Eterhox/Bot.css&only=styles';
  document.head.appendChild(link2);
  console.log("FW: W.L. match!");
}