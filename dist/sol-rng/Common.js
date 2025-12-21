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
	'NiRex2002': ['fandomcontributor'],
	'ItzJaack': ['fandomcontributor'],
	'Arcsanta': ['fandomcontributor'],
	'CraftyCookie': ['fandomcontributor'],
	'Crytpt0hack_er': ['fandomcontributor'],
	'IcySpriggan': ['fandomcontributor'],
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
(function () {if (typeof jQuery === 'undefined') return; const $ = jQuery;const symbolvariations = ['\u0300','\u0301','\u0302','\u0303','\u0304','\u0305','\u0306','\u0307','\u0308','\u0309','\u030A','\u030B','\u030C','\u030D','\u030E','\u030F','\u0310','\u0311','\u0312','\u0313','\u0314','\u0315','\u0316','\u0317','\u0318','\u0319','\u031A','\u031B','\u031C','\u031D','\u031E','\u031F','\u0320','\u0321','\u0322','\u0323','\u0324','\u0325','\u0326','\u0327','\u0328','\u0329','\u032A','\u032B','\u032C','\u032D','\u032E','\u032F','\u0330','\u0331','\u0332','\u0333','\u0334','\u0335','\u0336','\u0337','\u0338','\u0339','\u033A','\u033B','\u033C','\u033D','\u033E','\u033F','\u0340','\u0341','\u0342','\u0343','\u0344','\u0345','\u0346','\u0347','\u0348','\u0349','\u034A','\u034B','\u034C','\u034D','\u034E','\u034F','\u0350','\u0351','\u0352','\u0353','\u0354','\u0355','\u0356','\u0357','\u0358','\u0359','\u035A','\u0360','\u0361','\u0489'];function symbolapply(text) {let out = "";for (const sv of text) {if (sv === " ") { out += sv; continue; }let g = sv;let count = 1 + Math.floor(Math.random() * 6);for (let i = 0; i < count; i++) {g += symbolvariations[Math.floor(Math.random() * symbolvariations.length)];}out += g;}return out;}function start(el) {const $el = $(el);if ($el.data('symbolchanging')) return;$el.data('symbolchanging', true);const base = $el.text();setInterval(() => {if(!document.body.contains(el))return;$el.text(symbolapply(base));},120);}function init() {$('.NyctophobiaTitle').each(function() { start(this); });}$(init);})();

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