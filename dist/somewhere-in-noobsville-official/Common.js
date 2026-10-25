/* Any JavaScript here will be loaded for all users on every page load. */
/*==================================================
  SIN HOMEPAGE: DYNAMIC PERSONNEL GREETING
==================================================*/

(function () {

	"use strict";

	function initializeSINHomepage() {

		var greetingElement = document.getElementById("Spectgreet");

		/* Do nothing on pages without the homepage greeting. */
		if (!greetingElement) {
			return;
		}

		var triviaElement = document.getElementById("sin-trivia-text");
		var avatarElement = document.getElementById("user-avatar");

		/*------------------------------------------
		  CURRENT USER
		------------------------------------------*/

		var rawUsername = mw.config.get("wgUserName");

		var username = rawUsername
			? rawUsername.replace(/_/g, " ")
			: "Agent";

		/*------------------------------------------
		  RANDOM HELPER
		------------------------------------------*/

		function randomItem(items) {
			return items[Math.floor(Math.random() * items.length)];
		}


		/*------------------------------------------
		  TIME-BASED GREETINGS
		------------------------------------------*/

		var hour = new Date().getHours();

		var morningGreetings = [
			"Good Morning, [USERNAME]",
			"Rise and shine, Corporal.",
			"Sleep well, [USERNAME]?",
			"Morning, [USERNAME]",
			"To watch the morning sunrise, [USERNAME]!",
			"Top of the morning, [USERNAME]!",
			"Welcome, welcome [USERNAME]!"
		];

		var afternoonGreetings = [
			"Good Afternoon, [USERNAME]",
			"Hello there, Corporal.",
			"Welcome, [USERNAME]",
			"Hello, Corporal.",
			"Mid-day [USERNAME], yeah?",
			"At Ease, [USERNAME]!",
			"Feeling well, [USERNAME]?"
		];

		var eveningGreetings = [
			"Good Evening, [USERNAME]",
			"Evening, Corporal.",
			"Welcome, [USERNAME]",
			"Sunset, eh [USERNAME]?",
			"Fall out, [USERNAME]!",
			"Seein' the stars tonight, [USERNAME]?"
		];

		var availableGreetings;

		if (hour >= 5 && hour < 12) {

			availableGreetings = morningGreetings;

		} else if (hour >= 12 && hour < 18) {

			availableGreetings = afternoonGreetings;

		} else {

			availableGreetings = eveningGreetings;

		}

		var normalGreeting = randomItem(availableGreetings)
			.replace(/\[USERNAME\]/g, username);

		greetingElement.textContent = normalGreeting;


		/*------------------------------------------
		 FIND THE CURRENT USER'S AVATAR
		------------------------------------------*/

		function findCurrentAvatar() {

			var selectors = [
				".global-navigation__bottom .wds-avatar img.wds-avatar__image",
				".global-navigation__bottom .wds-avatar img",
				".global-navigation__bottom img.wds-avatar__image",
				".global-navigation .wds-avatar img.wds-avatar__image",
				".global-navigation .wds-avatar img",
				".wds-avatar img.wds-avatar__image",
				"img.wds-avatar__image"
			];

			/* Try known avatar locations first. */
			for (var i = 0; i < selectors.length; i++) {

			var candidate = document.querySelector(selectors[i]);

			if (
				candidate &&
				candidate.tagName === "IMG" &&
				(candidate.currentSrc || candidate.src)
			) {
				return candidate;
			}
		}

			/* Fallback: look for an avatar matching the username. */
			var images = document.querySelectorAll("img");
			var normalizedUsername = username.toLowerCase();

			for (var j = 0; j < images.length; j++) {

			var image = images[j];
			var alt = (image.getAttribute("alt") || "")
			.trim()
			.toLowerCase();

				var className = String(image.className || "");

				var matchesUsername = normalizedUsername &&
					alt.indexOf(normalizedUsername) !== -1;

				var looksLikeAvatar = /avatar/i.test(className) &&
					image.closest &&
					(
						image.closest(".global-navigation") ||
						image.closest(".global-navigation__bottom") ||
						image.closest(".wds-avatar")
					);

				if (
					(matchesUsername || looksLikeAvatar) &&
					(image.currentSrc || image.src)
				) {
					return image;
				}
			}

			return null;
		}


		/*------------------------------------------
		 DISPLAY AVATAR OR MONOGRAM FALLBACK
		------------------------------------------*/

		if (avatarElement) {

			function showAvatarFallback() {

				avatarElement.textContent = "";

				var fallback = document.createElement("span");

				fallback.className = "sin-avatar-fallback";
				fallback.textContent = username.charAt(0).toUpperCase();

				avatarElement.appendChild(fallback);
			}

			function displayAvatar(imageSource) {

				if (!imageSource) {
					return false;
				}

				var image = document.createElement("img");

				image.src = imageSource;
				image.alt = username + "'s profile picture";
				image.draggable = false;

				image.onerror = function () {
					showAvatarFallback();
				};

				avatarElement.textContent = "";
				avatarElement.appendChild(image);

				return true;
			}

			function attemptAvatarLookup(attempt) {

				if (!rawUsername) {
					showAvatarFallback();
					return;
				}

				var avatarImage = findCurrentAvatar();

				if (avatarImage) {

					var imageSource =
						avatarImage.currentSrc ||
						avatarImage.src ||
						avatarImage.getAttribute("src");

					if (displayAvatar(imageSource)) {
						return;
					}
				}

				/*
				 * Retry because Fandom's navigation may not
				 * have finished rendering the avatar yet.
				 */

				if (attempt < 12) {

					window.setTimeout(function () {
						attemptAvatarLookup(attempt + 1);
					}, 250);

				} else {

					showAvatarFallback();
				}
			}

			/* Show the initial while the image is being located. */
			showAvatarFallback();

			attemptAvatarLookup(0);
		}


		/*------------------------------------------
		  RANDOM DID YOU KNOW
		------------------------------------------*/

		if (triviaElement) {

			var triviaEntries = [

				"Some of the game's characters, lore, and events originated from roleplays the creators played out for real.",

				"Somewhere in Noobsville draws inspiration from The Robloxia: Until Dawn, Forsaken, and Dead by Daylight.",

				"SIN takes a more militarized approach to the asymmetrical survival genre.",

				"Survivors must complete objectives while a Killer hunts them.",

				"The game's lore and character history are based partly on events played out by the creators, not just written after the fact.",

				"The official wiki is still in development, so there are plenty of opportunities to expand the archive.",
				
				"Colonel is in your walls!",
				
				"Movement in SIN is a lot more sluggish and 'realistic' than any your typical Asymmetrical game.",
				
				"Play your cards right, that is how you make it through, you are not immortal.",
				
				"There IS sometimes limited time CHARACTERS with events too! Not just skins, get them before they vanish possibly forever.",
				
				"Trust me man, Trollege will steal your liver.",
				
				"Yeah uh... there's fall damage in this game.",
				
				"Somewhere In Noobsville takes place in well... Noobsville, but there's also more states in Nusia and even multiple countries and nations like Dominia, Baccia, Guesa, Robloxia, and even the whole world there too! Like USA, Canada, Russia, Lithuania, and more!",
				
				"Remember a match can get ugly quickly even if you are doing good!",
				
				"Felix was a War Veteran in the USA Marines!",
				
				"The Somewhere In Noobsville Wiki was made September 25, 2026!",
			];

			triviaElement.textContent = randomItem(triviaEntries);

		}

		/*------------------------------------------
		AUTOMATIC STAFF COUNT
		------------------------------------------*/

		var staffCountElement = document.getElementById("sin-staff-count");

		if (staffCountElement) {

			var staffMembers = document.querySelectorAll(
				".sin-staff-grid .sin-staff-member"
			);

			staffCountElement.textContent = String(staffMembers.length);

		}

		/*------------------------------------------
		  UNSETTLING TRANSMISSIONS
		------------------------------------------*/

		var corruptedMessages = [

			"YOU AREN'T IMMORTAL, [USERNAME]",

			"YOU AREN'T ALONE HERE, [USERNAME]",

			"YOU ARE BEING FOOLED, [USERNAME]",

			"NONE OF THIS IS REAL, [USERNAME]",

			"WHY DID YOU GO RAIDO SILENT, [USERNAME]?",

			"DO NOT TRUST THE AFTER-ACTION REPORT, [USERNAME].",

			"YOUR CALLSIGN ISN'T IN THE ROSTER, [USERNAME].",

			"THE RADIO IS ANSWERING ITSELF, [USERNAME].",

			"THE MISSION IS STILL ACTIVE, [USERNAME].",

			"NO ONE'S COMING, [USERNAME].",

			"SOMETHING CAME BACK WITH YOU, [USERNAME].",

			"WHO AUTHORIZED YOUR RESPAWN, [USERNAME]?",

			"YOUR PERSONNEL FILE HAS BEEN ALTERED, [USERNAME].",

			"THIS TRANSMISSION WASN'T MEANT FOR YOU, [USERNAME].",

			"YOU WERE NEVER CLEARED TO LEAVE, [USERNAME].",
			
			"YOU AREN'T SEEN ON THE RADAR ANYMORE, [USERNAME]",
			
			"COMMAND DOESN'T CARE, [USERNAME]",
			
			"TOC WILL LEAVE YOU TO DIE, [USERNAME]",
			
			"YOUR COUNTRY WILL LEAVE YOU TO ROT, [USERNAME]",
			
			"DROP THE FIREARM, [USERNAME]",
			
			"A DETONATION CONTRACT IS ISSUED IF YOU EVAC, [USERNAME]",
			
			"WHY ARE YOU STILL ALIVE, [USERNAME]?",
			
			"GIVE UP, [USERNAME]",
			
			"SURRENDER, [USERNAME]"
			
		];


		/* Randomize message casing but preserve the username. */
		function randomizeCase(message) {

		return message.split(username).map(function (part) {

		return part.replace(/[a-z]/gi, function (letter) {

			return Math.random() < 0.5
				? letter.toLowerCase()
				: letter.toUpperCase();

			});

		}).join(username);

	}


		/*==================================================
		RAPID CORRUPTED TRANSMISSION
		==================================================*/

		function scheduleGlitch() {

			/* Wait 10–40 seconds between incidents. */
			var delay = 10000 + Math.random() * 30000;

			window.setTimeout(function () {

				if (!greetingElement.isConnected) {
					return;
				}
	
				/*
				 * IMPORTANT:
				 * Replace the placeholder BEFORE displaying the message.
				 * Without this, visitors literally see [USERNAME].
				 */
				var corruptedMessage = randomItem(corruptedMessages)
					.replace(/\[USERNAME\]/g, username);

				var startTime = Date.now();
				var glitchDuration = 1250;

				greetingElement.classList.add("is-glitching");

				function flicker() {

					if (!greetingElement.isConnected) {
						greetingElement.classList.remove("is-glitching");
						return;
					}

					var elapsed = Date.now() - startTime;

					if (elapsed >= glitchDuration) {

						greetingElement.textContent = normalGreeting;
						greetingElement.classList.remove("is-glitching");

						scheduleGlitch();
						return;

					}

					/* Briefly interrupt the corrupted message with reality. */
					if (Math.random() < 0.20) {

						greetingElement.textContent = normalGreeting;

					} else {

						greetingElement.textContent =
							randomizeCase(corruptedMessage);
		
					}

					/*
					 * Change the lettering approximately every 18–40 ms.
					 */
					window.setTimeout(
						flicker,
						18 + Math.random() * 22
					);

				}

				flicker();

			}, delay);

		}


		/* Respect the visitor's reduced-motion preference. */
		var reduceMotion = window.matchMedia &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (!reduceMotion) {
			scheduleGlitch();
		}

	}


	/* Run safely after the document is ready. */
	if (document.readyState === "loading") {

		document.addEventListener(
			"DOMContentLoaded",
			initializeSINHomepage
		);

	} else {

		initializeSINHomepage();

	}

})();