/* Any JavaScript here will be loaded for all users on every page load. */

/* Custom Staff Userpage */

/* User:Eterhox */
const isEterhoxPage = (
  mw.config.get('wgNamespaceNumber') === 2 &&
  /(User:Eterhox|Message_Wall:Eterhox|User_blog:Eterhox\/?|Special:Contributions\/Eterhox|Special:UserProfileActivity\/Eterhox)/.test(mw.config.get('wgTitle'))
);

if (isEterhoxPage) {
  const eterStylesheet = document.createElement('link');
  eterStylesheet.rel = 'stylesheet';
  eterStylesheet.type = 'text/css';
  eterStylesheet.href = 'https://oneplus.fandom.com/load.php?mode=articles&articles=User:Eterhox/User.css&only=styles';
  document.head.appendChild(eterStylesheet);
  console.log("Flaming Wolf: Userpage customization code has run successfully!");
}

// Avatar Modification
if (mw.config.get('wgNamespaceNumber') === 2 && (mw.config.get('wgTitle') === 'Eterhox' || mw.config.get('wgTitle') === 'EterhoxAlt')) {
  const targetElement = document.querySelector('.user-identity-avatar');

  if (targetElement) {
    targetElement.style.position = 'relative';
    targetElement.style.border = 'none';

    const aorimybeloved = new Image();
    aorimybeloved.src = 'https://static.wikia.nocookie.net/eterhox/images/2/22/AoriIcon.png/revision/latest?cb=20230813132426';
    aorimybeloved.style.position = 'absolute';
    aorimybeloved.style.bottom = '0';
    aorimybeloved.style.right = '0';
    aorimybeloved.style.width = '75px';
    aorimybeloved.style.height = '75px';
    aorimybeloved.style.border = 'none';

    targetElement.appendChild(aorimybeloved);
  }
}