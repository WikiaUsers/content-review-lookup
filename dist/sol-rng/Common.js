/*
mw.loader.using(['mediawiki.util', 'mediawiki.api', 'jquery'], function() {
    mw.hook('wikipage.editform').add(function($form) {
        $form.on('submit', function(e) {
            var bannedWords = [];
            var articleText = $('#wpTextbox1').val();
            var regex = new RegExp(bannedWords.join("|"), "i");

            if (regex.test(articleText)) {
                alert("Your edit contains banned words and cannot be saved.");
                e.preventDefault();
            }
        });
    });
});
*/

window.UserTagsJS = {
	modules: {},
	tags: {
		fandomcontributor: {u: "Fandom Contributor"},
		bureaucrat: {order:0},
		sysop: {order:1},
		bot: {order:2},
		'content-moderator': {order: 3},
		'threadmoderator': {order: 4},
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.custom = {
	'Idk what life is or what the meaning is': ['fandomcontributor'],
	'IamIV': ['fandomcontributor'],
	'NoobieAtCode': ['fandomcontributor'],
	'MattPlays607': ['fandomcontributor'],
	'Zzombie Noel': ['fandomcontributor'],
	'CraftyCookie': ['fandomcontributor'],
	'Mr Robloxiancat': ['fandomcontributor'],
	'OccraD': ['fandomcontributor'],
	'OrbitSB': ['fandomcontributor'],
	'KDA Killed': ['fandomcontributor'],
	'Arcsanta': ['fandomcontributor'],
	'Ghoxst.X': ['fandomcontributor'],
	'IcySpriggan': ['fandomcontributor'],
    'Rainworth': ['fandomcontributor'],
    'F PsinFand0m': ['fandomcontributor'],
	//'UserName1': ['fandomcontributor'],
}

/*Test Popups*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});

/* Rail Module */
window.AddRailModule = [
    {page: 'Template:RandomPage', prepend: true},
    'Template:AdminList',
];

importScript('MediaWiki:OppressionTitleFont.js');

/* Nyctophobia Script */
const title = document.querySelector(".NyctoReworkAnimation");
const text = title.textContent;

title.innerHTML = "";

text.split("").forEach(letter => {
    const span = document.createElement("span");
    span.textContent = letter;
    title.appendChild(span);
});

const  letters= document.querySelectorAll(".NyctoReworkAnimation span");

letters.forEach((letter, index) => {
    letter.style.animationDelay = `${index * .005}s`;
});

//Oppression Script
(function () {
  const Speed = 75;

  document.querySelectorAll('.ColorChange-Oppression').forEach(el => {
    const colors = (el.dataset.colors || '#fff')
      .split(',')
      .map(c => c.trim());

    const text = el.textContent;
    el.textContent = '';

    for (let char of text) {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      el.appendChild(span);
    }

    const letters = el.children;

    setInterval(() => {
      for (let i = 0; i < letters.length; i++) {
        letters[i].style.color =
          colors[Math.floor(Math.random() * colors.length)];
      }
    }, Speed);
  });
})();

//Illusionary Script
(function () {
  const LetterSpeed = 100;
  const ActiveTime = 160;
  const IntervalTime  = 160;

  function initRandomColors(el) {
    const text = el.textContent;
    el.textContent = '';

    const letters = [...text].map(char => {
      const span = document.createElement('span');
      span.textContent = char;
      el.appendChild(span);
      return span;
    });

    const color = el.dataset.color || '#0302be';

    let lastIndex = -1;
    let active = true;

    setInterval(() => {
      if (lastIndex !== -1) {
        letters[lastIndex].style.color = '';
        lastIndex = -1;
      }

      if (!active) return;

      let index;
      do {
        index = Math.floor(Math.random() * letters.length);
      } while (letters[index].textContent === ' ');

      letters[index].style.color = color;
      lastIndex = index;
    }, LetterSpeed);

    setInterval(() => {
      active = !active;

      if (!active) {
        letters.forEach(l => (l.style.color = ''));
        lastIndex = -1;
      }
    }, ActiveTime + IntervalTime);
  }

  document.querySelectorAll('.ColorChange-Illusionary')
    .forEach(initRandomColors);
})();