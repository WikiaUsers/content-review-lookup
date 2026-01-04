/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* Tagi profilów */
window.UserTagsJS = {
	modules: {},
	tags: {
		'founder': { u:'Założyciel', link:'Project:Weterani' },
		'bureaucrat': { u:'Biurokrata_ka', m:'Biurokrata', f: 'Biurokratka', link:'Project:Administracja' },
		'sysop': { u:'Administrator_ka', m:'Administrator', f: 'Administratorka', link:'Project:Administracja' },
		'contentsysop': { u:'Administrator_ka treści', m:'Administrator treści', f: 'Administratorka treści', link:'Project:Administracja' },
		'threadsysop': { u:'Administrator_ka dyskusji', m:'Administrator dyskusji', f: 'Administratorka dyskusji', link:'Project:Administracja' },
		'content-moderator': { u:'Moderator_ka treści', m:'Moderator treści', f: 'Moderatorka treści', link:'Project:Administracja' },
		threadmoderator: { u:'Moderator_ka dyskusji', m:'Moderator dyskusji', f: 'Moderatorka dyskusji', link:'Project:Administracja' },
		'technik': { u:'Administrator_ka techniczny_a', m:'Administrator techniczny', f: 'Administratorka techniczna', link:'Project:Administracja' },
		'weteran': { u: 'Weteran_ka', m:'Weteran', f:'Weteranka', link:'Project:Weterani' },
		'blocked': { u: 'Zablokowany_a', m:'Zablokowany', f:'Zablokowana' },
		'newuser': { u: 'Nowy_a użytkownik_czka', m:'Nowy użytkownik', f:'Nowa użytkowniczka' },
		'inactive': { u: 'Nieaktywny_a', m:'Nieaktywny', f:'Nieaktywna' },
		'tt': { u: 'Zwycięzca Turnieju Trójtwórczego 2021' },
	}
};

UserTagsJS.modules.custom = {
	// Spersonalizowane dla obecnego składu
	'Dawid2': ['technik'],
	// Weterani
	'Leim': ['founder', 'weteran'],
	'Janek': ['weteran'],
	'W-Eamon': ['weteran'],
	'Glifion': ['weteran'],
	'WITCHER-Sum': ['weteran'],
	'Ausir-fduser': ['weteran'],
	'Game widow': ['weteran'],
	'Dyrektor Internetu': ['weteran'],
	'Neggev': ['weteran'],
	'ProOski': ['weteran'],
	'Isteres': ['weteran'],
	'NexGaming27': ['weteran'],
	'Ex q': ['weteran'],
	'Krętacz': ['weteran'],
	'Xardan': ['weteran'],
	'Xendou': ['weteran'],
	'Pio387': ['weteran'],
	'Wedkarski': ['weteran'],
	'Railfail536': ['weteran'],
	'Stygies VIII': ['weteran'],
	'Diode24q': ['weteran'],
	'Yrbeth': ['weteran'],
	'NephriteKnight': ['weteran'],
	'DeRudySoulStorm': ['weteran'],
	'Noxski': ['weteran'],
	'DuckeyD': ['weteran'],
	'Krzychukarniak': ['weteran'],
	// Inne
	'Mattibu': ['tt']
};

UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat', 'technik', 'bot'],
};

UserTagsJS.modules.implode = {
	'contentsysop': ['sysop', 'contentmoderator'],
	'threadsysop': ['sysop', 'threadmoderator']
};

UserTagsJS.modules.inactive = {
	days: 60,
	zeroIsInactive: false
};

/* Podtytuły zamiast prefiksów */
$(function FixNsUCPFinalSpan() {
	const $h1 = $('#firstHeading');
	const ns = mw.config.get('wgNamespaceNumber');

	if (!$h1.length) return;

	const desc = {
		4: 'Strona projektu Wiedźmin Wiki'
	};

	if (desc[ns]) {
		$h1.find('.mw-page-title-namespace, .mw-page-title-separator').hide();

		$h1.after(
				$('<div>', {
				class: 'page-header__page-subtitle',
				text: desc[ns]
			})
		).find('.mw-page-title-main').text(mw.config.get('wgTitle'));
	}

	const pageTitle = mw.config.get('wgTitle');
	const siteName  = mw.config.get('wgSiteName');
	document.title  = pageTitle + ' | ' + siteName + ' | Fandom';
});


/* Podtytuły podstron zamiast ukośników */ 
$(function() {
	const $h1 = $('#firstHeading');
	if (!$h1.length) return;

	const ns = mw.config.get('wgNamespaceNumber');
	if (ns === 500 || ns === 502) return;

	const name = mw.config.get('wgTitle');

	if (name.includes('/')) {
		const parts = name.split('/');
		let main = parts[0];
		const sub = parts.slice(1).join(' · ');

		const namespaceSeparatorIndex = main.indexOf(':');
		if (namespaceSeparatorIndex !== -1) {
			main = main.slice(namespaceSeparatorIndex + 1);
		}

		$h1.text(main);

		$h1.after(
			$('<div>', {
				class: 'page-header__page-subtitle',
				text: sub
			})
		);
	}
});

/* WDSIcons */
importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });

mw.hook('dev.wds').add(function(wds) {
	mw.hook('wikipage.content').add(function() {
	wds.render('.bar');
	});
});

/* Konfetti na Stronie Głównej */
$(function () {
	if (mw.config.get("wgIsMainPage") !== true) return;

	var canvas = document.createElement("canvas");
	canvas.style.position = "fixed";
	canvas.style.top = 0;
	canvas.style.left = 0;
	canvas.style.width = "100%";
	canvas.style.height = "100%";
	canvas.style.pointerEvents = "none";
	canvas.style.zIndex = 9999;
	document.body.appendChild(canvas);

	var ctx = canvas.getContext("2d");
	var pieces = [];
	var numberOfPieces = 120;
	var generating = true;

	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	resize();
	window.addEventListener("resize", resize);

	function randomColor() {
		var colors = ["#E40303", "#FF8C00", "#FFED00", "#008026", "#004CFF", "#732982"];
		return colors[Math.floor(Math.random() * colors.length)];
	}

	function ConfettiPiece() {
		this.x = Math.random() * canvas.width;
		this.y = -10;

		this.w = (Math.random() * 6) + 4;
		this.h = (Math.random() * 10) + 6;

		this.speed = (Math.random() * 2) + 2;
		this.wind = (Math.random() * 1) - 0.5;
		this.color = randomColor();

		this.rotation = Math.random() * 360;
		this.rotationSpeed = (Math.random() * 6) - 3;

		this.waveOffset = Math.random() * 100;
		this.waveSpeed = (Math.random() * 0.05) + 0.02;

		this.update = function () {
			this.y += this.speed;
			this.x += this.wind + Math.sin(this.waveOffset) * 0.5;
			this.waveOffset += this.waveSpeed;
			this.rotation += this.rotationSpeed;
		};

		this.draw = function () {
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.rotate(this.rotation * Math.PI / 180);

			var scale = Math.abs(Math.cos(this.rotation * Math.PI / 180));

			ctx.fillStyle = this.color;
			ctx.fillRect(-this.w * scale / 2, -this.h / 2, this.w * scale, this.h);

			ctx.restore();
		};
	}

	for (var i = 0; i < numberOfPieces; i++) {
		pieces.push(new ConfettiPiece());
	}

	setTimeout(function () {
		generating = false;
	}, 2000);

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		pieces.forEach(function (p) {
			p.update();
			p.draw();
		});

		pieces = pieces.filter(function (p) {
			return p.y < canvas.height + 20;
		});

		if (generating) {
			pieces.push(new ConfettiPiece());
		}

		if (!generating && pieces.length === 0) {
			canvas.remove();
			return;
		}

		requestAnimationFrame(animate);
	}

	animate();
});