(function ($) {
	$(function () {
		var $root = $(".twee-difficulty").first();
		var $real = $(".twee-real-page").first();

		if (!$root.length || !$real.length) return;
		if ($root.attr("data-twee-loaded") === "yes") return;

		$root.attr("data-twee-loaded", "yes");

		$root.find(".twee-interface").remove();
		$(".twee-cutscene").remove();

		$real.hide().removeClass("twee-real-active");

		$root.prepend(
			'<div class="twee-interface">' +
				'<div class="twee-visor">' +
					'<div class="twee-visor-screen">' +
						'<div class="twee-eye left"></div>' +
						'<div class="twee-eye right"></div>' +
						'<div class="twee-visor-text">TWEE-VISOR // LOW CHARGE</div>' +
						'<div class="twee-visor-subtext">PAGE ACCESS // LOCKED</div>' +
					'</div>' +
				'</div>' +
				'<div class="twee-charge-wrap">' +
					'<div class="twee-charge-label">⚡ PAGE VOLTAGE — 0%</div>' +
					'<div class="twee-charge-track">' +
						'<div class="twee-charge-fill"></div>' +
					'</div>' +
				'</div>' +
				'<button type="button" class="twee-lightning-button">' +
					'⚡ START ELECTRICAL STORM ⚡' +
				'</button>' +
			'</div>'
		);

		$("body").append(
			'<div class="twee-cutscene">' +
				'<div class="twee-cutscene-panel">' +
					'<div class="twee-scene-status"></div>' +
					'<div class="twee-scene-text"></div>' +
					'<div class="twee-scene-prop"></div>' +
				'</div>' +
			'</div>'
		);

		var $interface = $root.find(".twee-interface");
		var $visor = $interface.find(".twee-visor");
		var $screen = $interface.find(".twee-visor-screen");
		var $eyes = $interface.find(".twee-eye");
		var $title = $interface.find(".twee-visor-text");
		var $subtitle = $interface.find(".twee-visor-subtext");
		var $fill = $interface.find(".twee-charge-fill");
		var $label = $interface.find(".twee-charge-label");
		var $button = $interface.find(".twee-lightning-button");

		var $cutscene = $(".twee-cutscene").last();
		var $panel = $cutscene.find(".twee-cutscene-panel");
		var $sceneStatus = $cutscene.find(".twee-scene-status");
		var $sceneText = $cutscene.find(".twee-scene-text");
		var $sceneProp = $cutscene.find(".twee-scene-prop");

		var voltage = 0;
		var combo = 0;
		var storm = false;
		var finished = false;
		var spawnTimer = null;
		var activeTargets = [];

		$title.css({
			position: "absolute",
			top: "10px",
			left: "12px",
			zIndex: "30",
			margin: "0",
			padding: "5px 9px",
			background: "linear-gradient(90deg,rgba(0,0,0,.45),rgba(0,0,0,.14),transparent)",
			borderLeft: "3px solid #fff200",
			color: "#fffbd0",
			fontFamily: "monospace",
			fontSize: "12px",
			fontWeight: "900",
			lineHeight: "1.1",
			letterSpacing: ".055em",
			textTransform: "uppercase",
			textShadow: "0 0 5px rgba(255,242,0,.6)"
		});

		$subtitle.css({
			position: "absolute",
			left: "12px",
			bottom: "10px",
			zIndex: "30",
			margin: "0",
			padding: "5px 9px",
			background: "linear-gradient(90deg,rgba(0,0,0,.45),rgba(0,0,0,.14),transparent)",
			borderLeft: "3px solid #fff200",
			color: "#fff879",
			fontFamily: "monospace",
			fontSize: "10px",
			fontWeight: "900",
			lineHeight: "1.1",
			letterSpacing: ".075em",
			textTransform: "uppercase",
			textShadow: "0 0 6px rgba(255,242,0,.7)"
		});

		$label.css({
			display: "block",
			margin: "0 0 9px 0",
			padding: "6px 9px",
			background: "linear-gradient(90deg,rgba(255,242,0,.09),transparent)",
			borderLeft: "3px solid #fff200",
			color: "#f6f6f6",
			fontFamily: "monospace",
			fontSize: "13px",
			fontWeight: "900",
			lineHeight: "1.2",
			letterSpacing: ".055em",
			textShadow: "0 0 5px rgba(255,242,0,.3)"
		});

		$button.css({
			display: "block",
			minWidth: "310px",
			margin: "20px auto 2px auto",
			padding: "14px 26px",
			background: "linear-gradient(#292929,#111)",
			color: "#fff200",
			border: "2px solid #fff200",
			borderRadius: "5px",
			fontFamily: "monospace",
			fontSize: "13px",
			fontWeight: "900",
			lineHeight: "1.2",
			letterSpacing: ".08em",
			textTransform: "uppercase",
			cursor: "pointer",
			boxShadow: "inset 0 0 12px rgba(255,242,0,.08),0 0 9px rgba(255,242,0,.2)",
			transition: "background .15s,color .15s,box-shadow .15s,transform .12s"
		});

		$panel.css({
			display: "block",
			position: "relative",
			width: "680px",
			maxWidth: "85vw",
			minHeight: "270px",
			padding: "40px 35px",
			boxSizing: "border-box",
			background: "linear-gradient(145deg,#181818,#080808)",
			border: "3px solid #fff200",
			color: "#fff",
			textAlign: "center",
			boxShadow: "0 0 8px #fff200,0 0 30px rgba(255,242,0,.4),0 0 80px rgba(255,242,0,.12),inset 0 0 45px #000",
			overflow: "hidden"
		});

		$sceneStatus.css({
			display: "inline-block",
			margin: "0 0 28px 0",
			padding: "7px 14px",
			background: "#050505",
			border: "1px solid #777000",
			color: "#fff200",
			fontFamily: "monospace",
			fontSize: "11px",
			fontWeight: "900",
			lineHeight: "1.2",
			letterSpacing: ".15em",
			textTransform: "uppercase",
			textShadow: "0 0 6px rgba(255,242,0,.75)"
		});

		$sceneText.css({
			display: "block",
			minHeight: "64px",
			margin: "0",
			padding: "0",
			color: "#fff",
			fontFamily: "monospace",
			fontSize: "22px",
			fontWeight: "900",
			lineHeight: "1.5",
			letterSpacing: ".04em",
			textAlign: "center",
			textShadow: "0 0 5px rgba(255,255,255,.3)"
		});

		function update() {
			voltage = Math.max(0, Math.min(100, voltage));

			$fill.css("width", voltage + "%");
			$label.text("⚡ PAGE VOLTAGE — " + Math.round(voltage) + "%");

			$eyes.removeClass("charged overcharged");

			if (voltage < 25) {
				$title.text("TWEE-VISOR // LOW CHARGE");
				$subtitle.text(storm ? "CATCH THE CHARGE // COMBO " + combo : "PAGE ACCESS // LOCKED");
			} else if (voltage < 55) {
				$title.text("TWEE-VISOR // CONDUCTING");
				$subtitle.text("ELECTRICITY ACCUMULATING // COMBO " + combo);
				$eyes.addClass("charged");
			} else if (voltage < 80) {
				$title.text("TWEE-VISOR // HIGH VOLTAGE");
				$subtitle.text("STORM INTENSIFYING // COMBO " + combo);
				$eyes.addClass("charged");
			} else if (voltage < 100) {
				$title.text("TWEE-VISOR // ⚠ DANGEROUS VOLTAGE");
				$subtitle.text("CRITICAL THRESHOLD // " + Math.ceil(100 - voltage) + "% REMAINING");
				$eyes.addClass("charged");
			} else {
				$title.text("TWEE-VISOR // ⚡ OVERCHARGED ⚡");
				$subtitle.text("CRITICAL ENERGY REACHED");
				$eyes.addClass("overcharged");
			}
		}

		function shake($el, amount, time) {
			var original = $el.css("transform");

			var frames = [
				"translate(0,0)",
				"translate(" + (-amount) + "px,2px)",
				"translate(" + amount + "px,-2px)",
				"translate(" + (-amount * .6) + "px,1px)",
				"translate(" + (amount * .5) + "px,-1px)",
				"translate(0,0)"
			];

			var i = 0;
			var step = Math.max(20, Math.floor(time / frames.length));

			function next() {
				if (i >= frames.length) {
					$el.css("transform", original === "none" ? "" : original);
					return;
				}

				$el.css("transform", frames[i]);
				i++;
				setTimeout(next, step);
			}

			next();
		}

		function flash(opacity, duration, color) {
			var $flash = $("<div></div>");

			$flash.css({
				position: "fixed",
				top: "0",
				left: "0",
				right: "0",
				bottom: "0",
				zIndex: "1000001",
				background: color || "#fff",
				opacity: opacity,
				pointerEvents: "none",
				transition: "opacity " + duration + "ms ease"
			});

			$("body").append($flash);

			setTimeout(function () {
				$flash.css("opacity", "0");
			}, 20);

			setTimeout(function () {
				$flash.remove();
			}, duration + 80);
		}

		function lightningBolt(x, y) {
			var $bolt = $("<div></div>");

			$bolt.css({
				position: "fixed",
				left: x + "px",
				top: "-20px",
				width: "7px",
				height: Math.max(y + 20, 120) + "px",
				background: "#fff",
				zIndex: "999999",
				pointerEvents: "none",
				transform: "translateX(-50%)",
				boxShadow: "0 0 5px #fff,0 0 12px #fff200,0 0 25px #fff200,0 0 45px #fff200"
			});

			function branch(left, right, top, width, rotation, origin) {
				var $branch = $("<div></div>");

				$branch.css({
					position: "absolute",
					left: left,
					right: right,
					top: top,
					width: width,
					height: "5px",
					background: "#fff",
					transform: "rotate(" + rotation + ")",
					transformOrigin: origin,
					boxShadow: "0 0 5px #fff,0 0 12px #fff200"
				});

				return $branch;
			}

			$bolt.append(
				branch("-20px", "auto", "28%", "26px", "-48deg", "right center"),
				branch("auto", "-22px", "53%", "29px", "49deg", "left center"),
				branch("-16px", "auto", "73%", "22px", "-43deg", "right center")
			);

			$("body").append($bolt);

			setTimeout(function () { $bolt.css("opacity", ".18"); }, 60);
			setTimeout(function () { $bolt.css("opacity", "1"); }, 100);
			setTimeout(function () { $bolt.css("opacity", ".3"); }, 140);
			setTimeout(function () { $bolt.css("opacity", "1"); }, 175);
			setTimeout(function () { $bolt.css("opacity", "0"); }, 220);
			setTimeout(function () { $bolt.remove(); }, 290);
		}

		function sparks(x, y, amount) {
			for (var i = 0; i < amount; i++) {
				(function () {
					var $spark = $("<div></div>");
					var angle = Math.random() * Math.PI * 2;
					var distance = 35 + Math.random() * 100;

					$spark.css({
						position: "fixed",
						left: x + "px",
						top: y + "px",
						width: "4px",
						height: (8 + Math.random() * 15) + "px",
						background: "#fff",
						zIndex: "1000000",
						pointerEvents: "none",
						boxShadow: "0 0 5px #fff,0 0 10px #fff200",
						transition: "transform 420ms ease-out,opacity 420ms ease-out"
					});

					$("body").append($spark);

					setTimeout(function () {
						$spark.css({
							transform:
								"translate(" +
								(Math.cos(angle) * distance) +
								"px," +
								(Math.sin(angle) * distance) +
								"px) rotate(" +
								(Math.random() * 360) +
								"deg)",
							opacity: "0"
						});
					}, 10);

					setTimeout(function () {
						$spark.remove();
					}, 470);
				})();
			}
		}

		function removeTargets() {
			for (var i = 0; i < activeTargets.length; i++) {
				if (activeTargets[i]) activeTargets[i].remove();
			}

			activeTargets = [];
		}

		function spawnTarget() {
			if (!storm || finished) return;

			var rect = $screen[0].getBoundingClientRect();
			var paddingX = 46;
			var paddingY = 38;

			var localX =
				paddingX +
				Math.random() *
				(rect.width - paddingX * 2);

			var localY =
				paddingY +
				Math.random() *
				(rect.height - paddingY * 2);

			var screenX = rect.left + localX;
			var screenY = rect.top + localY;

			lightningBolt(screenX, screenY);

			var targetSize = Math.max(
				32,
				50 - Math.floor(voltage / 8)
			);

			var $target = $("<div>⚡</div>");

			$target.css({
				position: "absolute",
				left: (localX - targetSize / 2) + "px",
				top: (localY - targetSize / 2) + "px",
				width: targetSize + "px",
				height: targetSize + "px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "radial-gradient(circle,#fff 0%,#ffff7c 13%,#fff200 52%,#bdb600 100%)",
				color: "#ff7b28",
				border: "3px solid #fff",
				borderRadius: "50%",
				fontSize: Math.max(17, targetSize * .48) + "px",
				fontWeight: "900",
				cursor: "pointer",
				zIndex: "50",
				userSelect: "none",
				boxShadow: "0 0 8px #fff,0 0 18px #fff200,0 0 38px #fff200",
				transition: "transform 100ms ease,opacity 100ms ease"
			});

			$screen.append($target);
			activeTargets.push($target);

			var resolved = false;
			var pulse = false;

			var pulseTimer = setInterval(function () {
				if (!$target.parent().length) {
					clearInterval(pulseTimer);
					return;
				}

				pulse = !pulse;

				$target.css(
					"transform",
					pulse ? "scale(1.14)" : "scale(.88)"
				);
			}, Math.max(90, 160 - voltage));

			$target.on("click", function (event) {
				event.preventDefault();
				event.stopPropagation();

				if (resolved || finished) return;

				resolved = true;
				clearInterval(pulseTimer);

				combo++;

				var gain =
					4 +
					Math.random() * 3 +
					Math.min(combo * .6, 5);

				voltage += gain;

				var tr = $target[0].getBoundingClientRect();

				sparks(
					tr.left + tr.width / 2,
					tr.top + tr.height / 2,
					14
				);

				shake($visor, Math.min(7, 2 + combo * .3), 160);

				$target.css({
					transform: "scale(1.7)",
					opacity: "0"
				});

				update();

				if (voltage >= 100) {
					setTimeout(criticalSequence, 120);
				}

				setTimeout(function () {
					$target.remove();
				}, 120);
			});

			var lifetime = Math.max(
				750,
				1350 - voltage * 4.5
			);

			setTimeout(function () {
				if (resolved || finished) return;

				resolved = true;
				clearInterval(pulseTimer);

				combo = 0;

				voltage -=
					voltage > 70
						? 4
						: 2;

				$target.css({
					transform: "scale(.1)",
					opacity: "0",
					filter: "grayscale(1)"
				});

				update();

				setTimeout(function () {
					$target.remove();
				}, 120);
			}, lifetime);

			var baseDelay =
				900 -
					Math.min(voltage * 5.2, 470);

			var randomDelay =
				Math.random() *
					Math.max(80, 220 - voltage);

			spawnTimer = setTimeout(
				spawnTarget,
				baseDelay + randomDelay
			);
		}

		function startStorm() {
			if (storm || finished) return;

			storm = true;
			combo = 0;

			$button
				.prop("disabled", true)
				.text("⚡ STORM ACTIVE — CATCH THE CHARGE ⚡")
				.css({
					background: "#181818",
					color: "#777",
					borderColor: "#555",
					boxShadow: "none",
					cursor: "default"
				});

			flash(.42, 180);
			shake($interface, 5, 260);
			update();

			setTimeout(spawnTarget, 250);
		}

		function stopStorm() {
			storm = false;

			if (spawnTimer) clearTimeout(spawnTimer);

			removeTargets();
		}

		function openCutscene() {
			$cutscene.css({
				display: "flex",
				position: "fixed",
				top: "0",
				left: "0",
				right: "0",
				bottom: "0",
				zIndex: "999990",
				alignItems: "center",
				justifyContent: "center",
				background: "radial-gradient(circle,rgba(255,242,0,.13),rgba(25,25,0,.05) 30%,rgba(0,0,0,.96) 67%)"
			});

			shake($panel, 9, 320);
		}

		function closeCutscene() {
			$cutscene.css("display", "none");
		}

		function typeText(text, speed, callback) {
			var i = 0;

			$sceneText.empty();

			function next() {
				if (i >= text.length) {
					if (callback) callback();
					return;
				}

				$sceneText.append(
					document.createTextNode(text.charAt(i))
				);

				if (Math.random() > .88) {
					shake($panel, 2, 70);
				}

				i++;
				setTimeout(next, speed);
			}

			next();
		}

		function pulseCutscene() {
			flash(.18, 100, "#fff200");
			shake($panel, 5, 140);
		}

		function makePotion() {
			$sceneProp.empty();

			$sceneProp.append(
				'<div class="twee-potion">' +
					'<div class="twee-potion-neck"></div>' +
					'<div class="twee-potion-liquid"></div>' +
					'<div class="twee-potion-icon">⚡</div>' +
				'</div>'
			);

			var $potion = $sceneProp.find(".twee-potion");
			var $neck = $sceneProp.find(".twee-potion-neck");
			var $liquid = $sceneProp.find(".twee-potion-liquid");
			var $icon = $sceneProp.find(".twee-potion-icon");

			$potion.css({
				display: "block",
				position: "relative",
				width: "100px",
				height: "125px",
				margin: "30px auto 0",
				background: "#333",
				border: "5px solid #aaa",
				borderRadius: "20px 20px 38px 38px",
				overflow: "hidden",
				boxShadow: "0 0 12px #fff200,0 0 30px rgba(255,242,0,.5)",
				transition: "transform .35s ease"
			});

			$neck.css({
				position: "absolute",
				left: "30px",
				top: "-4px",
				width: "29px",
				height: "28px",
				background: "linear-gradient(90deg,#777,#ccc,#777)",
				border: "4px solid #555",
				zIndex: "6"
			});

			$liquid.css({
				position: "absolute",
				left: "0",
				right: "0",
				bottom: "0",
				height: "63%",
				background: "linear-gradient(#ffff93,#fff200 32%,#bdb600)",
				boxShadow: "inset 0 7px 10px rgba(255,255,255,.4),0 0 18px #fff200"
			});

			$icon.css({
				position: "absolute",
				left: "0",
				right: "0",
				top: "44px",
				zIndex: "8",
				color: "#fff",
				fontSize: "34px",
				textAlign: "center",
				textShadow: "0 0 5px #fff,0 0 12px #fff200,0 0 24px #fff200"
			});

			var ticks = 0;

			var potionTimer = setInterval(function () {
				if (!$potion.parent().length) {
					clearInterval(potionTimer);
					return;
				}

				ticks++;

				$potion.css(
					"transform",
					ticks % 2
						? "translateY(-7px) rotate(2deg) scale(1.03)"
						: "translateY(5px) rotate(-2deg) scale(.98)"
				);

				$icon.css(
					"transform",
					ticks % 2
						? "scale(1.18) rotate(6deg)"
						: "scale(.9) rotate(-6deg)"
				);

				if (ticks % 3 === 0) {
					pulseCutscene();
				}
			}, 360);
		}

		function activateRealTweeMode() {
			document.documentElement.classList.add("twee-real-mode");
			document.body.classList.add("twee-real-mode");

			$("html, body").attr("data-twee-real", "yes");

			$("html, body").css({
				backgroundColor: "#070707",
				backgroundImage:
					"radial-gradient(circle at 50% 0%,rgba(255,242,0,.09),transparent 38%)," +
					"repeating-linear-gradient(90deg,rgba(255,242,0,.025) 0,rgba(255,242,0,.025) 1px,transparent 1px,transparent 40px)," +
					"repeating-linear-gradient(0deg,rgba(255,242,0,.025) 0,rgba(255,242,0,.025) 1px,transparent 1px,transparent 40px)",
				backgroundAttachment: "fixed",
				color: "#eee"
			});

			$(".main-container, .page, .page__main, .resizable-container").css({
				background: "linear-gradient(145deg,#181818,#0b0b0b)",
				color: "#eee"
			});

			$(".page__main").css({
				borderLeft: "1px solid #4f4b00",
				borderRight: "1px solid #4f4b00",
				boxShadow: "0 0 35px rgba(255,242,0,.08),inset 0 0 55px rgba(0,0,0,.65)"
			});

			$(".fandom-community-header").css({
				background: "linear-gradient(90deg,#101010,#202020 55%,#292700)",
				borderBottom: "3px solid #fff200",
				boxShadow: "0 4px 18px rgba(0,0,0,.65),0 3px 15px rgba(255,242,0,.16)"
			});

			$(".fandom-community-header__community-name, .fandom-community-header a").css({
				color: "#fff200",
				textShadow: "0 0 7px rgba(255,242,0,.5)"
			});

			$(".fandom-community-header__local-navigation, .fandom-community-header__local-navigation .wds-tabs").css({
				background: "#0c0c0c"
			});

			$(".global-navigation").css({
				background: "linear-gradient(180deg,#181818,#070707)",
				borderRight: "2px solid #575200",
				boxShadow: "4px 0 20px rgba(0,0,0,.7)"
			});

			$(".global-navigation a").css("color", "#d5d5d5");

			$(".global-navigation svg").css({
				color: "#d5d5d5",
				fill: "#d5d5d5"
			});

			$(".page-header").css({
				borderBottom: "2px solid #5c5700"
			});

			$(".page-header__title").css({
				color: "#fff200",
				fontWeight: "900",
				letterSpacing: ".04em",
				textShadow: "0 0 8px rgba(255,242,0,.45),2px 2px #000"
			});

			$(".page-header .wds-button, .page-header__actions .wds-button").css({
				background: "linear-gradient(#292929,#101010)",
				color: "#fff200",
				borderColor: "#716b00"
			});

			$(".wiki-tools, .wiki-tools__content, .page-side-tools").css({
				background: "#0d0d0d"
			});

			$(".right-rail-wrapper, .rail, #WikiaRail").css({
				background: "linear-gradient(#151515,#090909)",
				color: "#ddd",
				borderLeft: "1px solid #5b5600",
				boxShadow: "inset 8px 0 20px rgba(0,0,0,.45)"
			});

			$(".wds-dropdown__content").css({
				background: "#0e0e0e",
				border: "1px solid #5c5700",
				boxShadow: "0 6px 22px rgba(0,0,0,.75)"
			});

			$(".portable-infobox").css({
				background: "#111",
				color: "#eee",
				border: "2px solid #655f00",
				boxShadow: "0 5px 20px rgba(0,0,0,.5),0 0 15px rgba(255,242,0,.12)"
			});

			$(".portable-infobox .pi-title, .portable-infobox .pi-header").css({
				background: "linear-gradient(90deg,#fff200,#aaa300)",
				color: "#111",
				fontWeight: "900",
				textShadow: "none"
			});

			$(".portable-infobox .pi-data-label").css("color", "#fff878");

			$(".toc, .toccolours").css({
				background: "linear-gradient(145deg,#151515,#090909)",
				color: "#eee",
				border: "1px solid #5e5900",
				boxShadow: "inset 0 0 20px #000"
			});

			$(".toc a").css("color", "#fff200");

			$(".global-footer, .wds-global-footer").css({
				background: "#070707",
				color: "#999",
				borderTop: "2px solid #504b00"
			});

			$(
				".comments," +
				".article-comments," +
				".comment-list," +
				".comments-area," +
				".article-comments-section," +
				"#articleComments," +
				"#Comments," +
				'[class*="comment-module"],' +
				'[class*="comments-module"],' +
				'[class*="ArticleComments"],' +
				'[class*="article-comments"]'
			).hide();

			$real.css({
				display: "block",
				position: "relative",
				margin: "18px 0",
				padding: "30px",
				color: "#e8e8e8",
				background:
					"radial-gradient(circle at 80% 5%,rgba(255,242,0,.07),transparent 30%)," +
					"linear-gradient(rgba(255,242,0,.025) 1px,transparent 1px)," +
					"linear-gradient(90deg,rgba(255,242,0,.025) 1px,transparent 1px)," +
					"linear-gradient(145deg,#151515,#080808)",
				backgroundSize: "auto,25px 25px,25px 25px,auto",
				border: "3px solid #444",
				borderRadius: "12px",
				boxShadow: "inset 0 0 50px rgba(0,0,0,.85),0 0 23px rgba(255,242,0,.16)",
				overflow: "hidden"
			});

			$real.find("h1, h2, h3, h4").css({
				color: "#fff200",
				fontWeight: "900",
				textShadow: "0 0 7px rgba(255,242,0,.4)"
			});

			$real.find("h2").css({
				marginTop: "29px",
				padding: "9px 14px 9px 20px",
				background: "linear-gradient(90deg,#fff200 0,#fff200 6px,#282828 6px,#151515 100%)",
				border: "1px solid #444",
				boxShadow: "inset 0 0 14px #000,0 3px 9px rgba(0,0,0,.25)"
			});

			$real.find("p, li").css({
				color: "#e5e5e5",
				lineHeight: "1.6"
			});

			$real.find("a").css({
				color: "#fff200",
				fontWeight: "700",
				textDecoration: "none"
			});

			$real.find("b, strong").css("color", "#fff87a");

			$real.find("blockquote").css({
				padding: "15px 19px",
				background: "linear-gradient(90deg,rgba(255,242,0,.09),transparent 42%),#141414",
				border: "1px solid #474400",
				borderLeft: "5px solid #fff200",
				color: "#eee"
			});

			$real.find("table").css({
				background: "#101010",
				color: "#eee",
				border: "2px solid #444"
			});

			$real.find("table th").css({
				background: "linear-gradient(#ffff54,#c5bd00)",
				color: "#111",
				fontWeight: "900"
			});

			$real.find("table td").css({
				background: "#1c1c1c",
				color: "#eee",
				borderColor: "#444"
			});

			$real.find("img").css({
				filter: "drop-shadow(0 0 6px rgba(255,242,0,.18))"
			});
		}

		function revealRealPage() {
			$sceneStatus.text("TWEE-VISOR // SPEEDINESS APPLICATION");

			pulseCutscene();

			typeText(
				"Competitive running sports become effortless!",
				24,
				function () {
					setTimeout(function () {
						$sceneStatus.text("TWEE-VISOR // COMPETITIVE RUNNING");

						typeText("[READY...]", 50, function () {
							pulseCutscene();

							setTimeout(function () {
								typeText("[SET...]", 50, function () {
									pulseCutscene();

									setTimeout(function () {
										typeText("[GO!]", 80, function () {
											flash(.75, 220);
											shake($panel, 12, 280);

											setTimeout(function () {
												closeCutscene();

												$root.addClass("twee-running-away");

												setTimeout(function () {
													$root.hide();

													$real
														.show()
														.addClass("twee-real-active");

													activateRealTweeMode();

													flash(.85, 350);
												}, 850);
											}, 260);
										});
									}, 300);
								});
							}, 300);
						});
					}, 850);
				}
			);
		}

		function potionSequence() {
			$sceneStatus.text("TWEE-VISOR // ENERGY CONTAINMENT");

			pulseCutscene();

			typeText(
				"[BOTTLING ELECTRICITY...]",
				24,
				function () {
					setTimeout(function () {
						pulseCutscene();

						$sceneStatus.text("TWEE-VISOR // LIGHTNING UTILIZATION");

						typeText(
							"[UTILIZING LIGHTNING...]",
							24,
							function () {
								setTimeout(function () {
									makePotion();

									flash(.62, 220);
									shake($panel, 10, 260);

									setTimeout(function () {
										$sceneStatus.text("TWEE-VISOR // SUCCESS");

										typeText(
											"⚡ SPEEDINESS POTION CREATED ⚡",
											24,
											function () {
												setTimeout(revealRealPage, 1000);
											}
										);
									}, 650);
								}, 650);
							}
						);
					}, 850);
				}
			);
		}

		function criticalSequence() {
			if (finished) return;

			finished = true;
			stopStorm();

			voltage = 100;
			update();

			$button
				.prop("disabled", true)
				.text("⚠ CRITICAL VOLTAGE ⚠");

			var rect = $visor[0].getBoundingClientRect();

			var centerX =
				rect.left +
				rect.width / 2;

			var centerY =
				rect.top +
				rect.height / 2;

			lightningBolt(centerX, centerY);
			sparks(centerX, centerY, 45);

			flash(.95, 260);
			shake($interface, 13, 420);

			setTimeout(function () {
				openCutscene();

				$sceneStatus.text("TWEE-VISOR // ⚠ CRITICAL ENERGY ⚠");

				pulseCutscene();

				typeText(
					"[CRITICAL ENERGY REACHED!]",
					24,
					function () {
						setTimeout(potionSequence, 850);
					}
				);
			}, 600);
		}

		$button.on("mouseenter", function () {
			if ($(this).prop("disabled")) return;

			$(this).css({
				background: "#fff200",
				color: "#111",
				boxShadow: "0 0 9px #fff200,0 0 24px rgba(255,242,0,.7)",
				transform: "translateY(-2px)"
			});
		});

		$button.on("mouseleave", function () {
			if ($(this).prop("disabled")) return;

			$(this).css({
				background: "linear-gradient(#292929,#111)",
				color: "#fff200",
				boxShadow: "inset 0 0 12px rgba(255,242,0,.08),0 0 9px rgba(255,242,0,.2)",
				transform: "none"
			});
		});

		$button.on("click", function (event) {
			event.preventDefault();
			startStorm();
		});

		update();
	});
})(jQuery);