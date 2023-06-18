/* Any JavaScript here will be loaded for all users on every page load. */

/* Custom Staff Userpage */

/* User:Eterhox */
const nerd = /(User:Eterhox|Message_Wall:Eterhox|User_blog:Eterhox\/?|Special:Contributions\/Eterhox|Special:UserProfileActivity\/Eterhox)/.test(window.location.href);
if (nerd) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://unofficial-alphabet-lore.fandom.com/load.php?mode=articles&articles=User:Eterhox/Dev.css&only=styles';
  document.head.appendChild(link);
  console.log("Code worked.. I think");
}
/* User:NoobyLord33 */
const nub = /(User:NoobyLord33|Message_Wall:NoobyLord33|User_blog:NoobyLord33\/?|Special:Contributions\/NoobyLord33|Special:UserProfileActivity\/NoobyLord33)/.test(window.location.href);
if (nub) {
  const nulink = document.createElement('link');
  nulink.rel = 'stylesheet';
  nulink.type = 'text/css';
  nulink.href = 'https://unofficial-alphabet-lore.fandom.com/load.php?mode=articles&articles=User:NoobyLord33/Dev.css&only=styles';
  document.head.appendChild(nulink);
  console.log("Flaming Wolf has activated.");
}