/* Any JavaScript here will be loaded for all users on every page load. */

/* Custom Staff Userpage */

const nerd= /(User:Eterhox|Message_Wall:Eterhox|User_blog:Eterhox\/?|Special:Contributions\/Eterhox|Special:UserProfileActivity\/Eterhox)/.test(window.location.href);

if (nerd) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://unofficial-alphabet-lore.fandom.com/load.php?mode=articles&articles=User:Eterhox/Dev.css&only=styles';
  document.head.appendChild(link);
  console.log("Code worked.. I think");
}