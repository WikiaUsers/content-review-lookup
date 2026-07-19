// custom link icons for baldi's basics wiki
(function () {
	var initialized = false;

var LINK_ICONS = {
	'Baldi\'s Bus': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/d/d5/HyperlinkIcon_Baldi\'s_Bus.png',
	'Principal\'s Keys': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/2/20/HyperlinkIcon_Principal\'s_Keys.png',
	'Baldi\'s Least Favorite Tape': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/b4/HyperlinkIcon_Baldi\'s_Least_Favorite_Tape.png',
	'It\'s a Bully': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/bd/HyperlinkIcon_It\'s_a_Bully.png',
	'You Thought Points Multiplier': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/3/38/HyperlinkIcon_You_Thought_Points_Multiplier.png',
	'Power lever and cable': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/b0/HyperlinkIcon_Power_lever_and_cable.png',
	'An Apple for Baldi': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/e/e2/HyperlinkIcon_An_Apple_for_Baldi.png',
	'Diet BSODA machine': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/6/6a/HyperlinkIcon_Diet_BSODA_machine.png',
	'Energy Flavored Zesty Bar': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/e/e9/HyperlinkIcon_Energy_Flavored_Zesty_Bar.png',
	'Principal of the Thing': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/9/9c/HyperlinkIcon_Principal_of_the_Thing.png',
	'Cash Register': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/5/53/HyperlinkIcon_Cash_Register.png',
	'Math Machine': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/3/3f/HyperlinkIcon_Math_Machine.png',
	'Merry-go-round': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/1/13/HyperlinkIcon_Merry-go-round.png',
	'Stamina Boost': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/3/32/HyperlinkIcon_Stamina_Boost.png',
	'Super Stretchy Glove': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/5/55/HyperlinkIcon_Super_Stretchy_Glove.png',
	'Ear Muffs': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/5/5b/HyperlinkIcon_Ear_Muffs.png',
	'Swinging Door Lock': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/5/54/HyperlinkIcon_Swinging_Door_Lock.png',
	'Time Bonus': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/4/4f/HyperlinkIcon_Time_Bonus.png',
	'Arts and Crafters': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/1/13/HyperlinkIcon_Arts_and_Crafters.png',
	'Exploration Bonus': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/7/7a/HyperlinkIcon_Exploration_Bonus.png',
	'Elevator Gears': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/e/eb/HyperlinkIcon_Elevator_Gears.png',
	'Unnamed character': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/a/ab/HyperlinkIcon_Unnamed_character.png',
	'Big Ol\' Boots': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/2/28/HyperlinkIcon_Big_Ol\'_Boots.png',
	'Great Job!': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/c/c9/HyperlinkIcon_Great_Job!.png',
	'Packet-O-Matic': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/e/ed/HyperlinkIcon_Packet-O-Matic.png',
	'Reach Extender': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/2/2f/HyperlinkIcon_Reach_Extender.png',
	'Gotta Sweep': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/a/af/HyperlinkIcon_Gotta_Sweep.png',
	'Backpack': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/5/5a/HyperlinkIcon_Backpack.png',
	'Lost Item': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/1/1c/HyperlinkIcon_Lost_Item.png',
	'Bear trap': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/a/a0/HyperlinkIcon_Bear_trap.png',
	'Pay phone': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/d/d2/HyperlinkIcon_Pay_phone.png',
	'Vending machine': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/d/dd/HyperlinkIcon_Vending_machine.png',
	'Shadow': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/6/61/HyperlinkIcon_Shadow.png',
	'DSCI 0000': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/1/18/HyperlinkIcon_DSCI_0000.png',
	'Techno-Boots': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/b1/HyperlinkIcon_Techno-Boots.png',
	'Roto-hall': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/2/28/HyperlinkIcon_Roto-hall.png',
	'Countdown': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/1/18/HyperlinkIcon_Countdown.png',
	'Super door': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/0/06/HyperlinkIcon_Super_door.png',
	'Shrink machine': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/f/f4/HyperlinkIcon_Shrink_machine.png',
	'\'Nana Peel': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/5/5c/HyperlinkIcon_\'Nana_Peel.png',
	'Game lock': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/e/ed/HyperlinkIcon_Game_lock.png',
	'Crane': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/a/a2/HyperlinkIcon_Crane.png',
	'The Test': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/0/09/HyperlinkIcon_The_Test.png',
	'Safety Scissors': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/f/f3/HyperlinkIcon_Safety_Scissors.png',
	'Stealthy': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/0/0f/HyperlinkIcon_Stealthy.png',
	'Sticker packet': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/8/8a/HyperlinkIcon_Sticker_packet.png',
	'0th Prize': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/e/e8/HyperlinkIcon_0th_Prize.png',
	'Shape Key': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/6/64/HyperlinkIcon_Shape_Key.png',
	'Swinging door': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/1/13/HyperlinkIcon_Swinging_door.png',
	'Crazy Baby': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/5/55/HyperlinkIcon_Crazy_Baby.png',
	'Glue Stick': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/b2/HyperlinkIcon_Glue_Stick.png',
	'Dr. Reflex': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/d/d7/HyperlinkIcon_Dr._Reflex.png',
	'Principal Whistle': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/4/44/HyperlinkIcon_Principal_Whistle.png',
	'Water fountain': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/0/02/HyperlinkIcon_Water_fountain.png',
	'1st Prize': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/d/de/HyperlinkIcon_1st_Prize.png',
	'Mrs. Pomp': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/a/a1/HyperlinkIcon_Mrs._Pomp.png',
	'Faculty Nametag': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/0/06/HyperlinkIcon_Faculty_Nametag.png',
	'Safe Room (sticker)': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/6/62/HyperlinkIcon_Safe_Room_(sticker).png',
	'Conspiracy board': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/4/45/HyperlinkIcon_Conspiracy_board.png',
	'Curtain door': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/8/85/HyperlinkIcon_Curtain_door.png',
	'Diet BSODA': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/d/d7/HyperlinkIcon_Diet_BSODA.png',
	'Dirty Chalk Eraser': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/0/07/HyperlinkIcon_Dirty_Chalk_Eraser.png',
	'Distance Bonus': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/be/HyperlinkIcon_Distance_Bonus.png',
	'Door Stop': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/bf/HyperlinkIcon_Door_Stop.png',
	'Grappling Hook': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/bb/HyperlinkIcon_Grappling_Hook.png',
	'Portal Poster': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/c/c7/HyperlinkIcon_Portal_Poster.png',
	'Signal Boost': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/d/d6/HyperlinkIcon_Signal_Boost.png',
	'Sticker Bonus': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/5/57/HyperlinkIcon_Sticker_Bonus.png',
	'You Can Think Pad': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/a/a9/HyperlinkIcon_You_Can_Think_Pad.png',
	'You Thought Points': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/d/d4/HyperlinkIcon_You_Thought_Points.png',
	'Cloudy Copter': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/9/92/HyperlinkIcon_Cloudy_Copter.png',
	'Bus Pass': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/7/73/HyperlinkIcon_Bus_Pass.png',
	'Player': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/e/e0/HyperlinkIcon_Player.png',
	'Invisibility Elixir': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/a/ab/HyperlinkIcon_Invisibility_Elixir.png',
	'WD-NoSquee': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/d/d2/HyperlinkIcon_WD-NoSquee.png',
	'Hourglass': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/be/HyperlinkIcon_Hourglass.png',
	'Conveyor belt': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/b1/HyperlinkIcon_Conveyor_belt.png',
	'Alarm Clock': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/2/2b/HyperlinkIcon_Alarm_Clock.png',
	'Bulletin board': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/bf/HyperlinkIcon_Bulletin_board.png',
	'Animal': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/be/HyperlinkIcon_Animal.png',
	'Dangerous Teleporter': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/5/5a/HyperlinkIcon_Dangerous_Teleporter.png',
	'NINENINE surveyor': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/4/49/HyperlinkIcon_NINENINE_surveyor.png',
	'Tape player': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/7/7a/HyperlinkIcon_Tape_player.png',
	'PlaceFace': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/f/f3/HyperlinkIcon_PlaceFace.png',
	'Elevator': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/9/9d/HyperlinkIcon_Elevator.png',
	'Item': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/a/a9/HyperlinkIcon_Item.png',
	'BSODA': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/7/7d/HyperlinkIcon_BSODA.png',
	'Camera': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/7/72/HyperlinkIcon_Camera.png',
	'Null': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/9/9d/HyperlinkIcon_Null.png',
	'Baldloon': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/d/d9/HyperlinkIcon_Baldloon.png',
	'Wormhole': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/0/01/HyperlinkIcon_Wormhole.png',
	'Plus icon': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/f/fd/HyperlinkIcon_Plus_icon.png',
	'Baldi': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/8/8c/HyperlinkIcon_Baldi.png',
	'Window': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/8/85/HyperlinkIcon_Window.png',
	'Chalkles': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/4/45/HyperlinkIcon_Chalkles.png',
	'Breaker': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/b2/HyperlinkIcon_Breaker.png',
	'Quarter': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/8/84/HyperlinkIcon_Quarter.png',
	'Poster': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/0/07/HyperlinkIcon_Poster.png',
	'Campfire': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/0/0f/HyperlinkIcon_Campfire.png',
	'BadSum': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/3/36/HyperlinkIcon_BadSum.png',
	'Valve': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/f/f8/HyperlinkIcon_Valve.png',
	'Lever': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/e/e6/HyperlinkIcon_Lever.png',
	'Present': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/2/2d/HyperlinkIcon_Present.png',
	'Notebook': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/9/9b/HyperlinkIcon_Notebook.png',
	'Nothing': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/6/64/HyperlinkIcon_Nothing.png',
	'Me': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/b5/HyperlinkIcon_Me.png',
	'Gibby': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/9/9d/HyperlinkIcon_Gibby.png',
	'Log': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/9/99/HyperlinkIcon_Log.png',
	'Cake': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/1/1c/HyperlinkIcon_Cake.png',
	'Chalkboard': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/7/72/HyperlinkIcon_Chalkboard.png',
	'Underscore': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/8/83/HyperlinkIcon_Underscore.png',
	'Book': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/e/e9/HyperlinkIcon_Book.png',
	'Plunger': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/6/65/HyperlinkIcon_Plunger.png',
	'Door': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/9/9b/HyperlinkIcon_Door.png',
	'Balloon': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/5/54/HyperlinkIcon_Balloon.png',
	'Joe': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/5/5e/HyperlinkIcon_Joe.png',
	'Johnny': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/bb/HyperlinkIcon_Johnny.png',
	'Locker': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/9/9d/HyperlinkIcon_Locker.png',
	'Bladder': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/8/8f/HyperlinkIcon_Bladder.png',
	'Playtime': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/1/1c/HyperlinkIcon_Playtime.png',
	'Student': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/5/55/HyperlinkIcon_Student.png',
	'Beans': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/b/b6/HyperlinkIcon_Beans.png',
	'Vent': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/e/e7/HyperlinkIcon_Vent.png',
	'Button': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/c/c1/HyperlinkIcon_Button.png',
	'Teleporter': '//static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/7/7a/HyperlinkIcon_Teleporter.png'
};

	function init() {
		if (initialized) return;
		initialized = true;

		var root = document.querySelector('#content') || document.querySelector('.page__main') || document.body;

		function getTitleFromLink(link) {
		    if (link.hostname !== location.hostname) return null;
		    if (link.search || link.hash) return null;
		    var match = link.pathname.match(/\/wiki\/([^?#]+)/);
		    if (!match) return null;
		    return decodeURIComponent(match[1]).replace(/_/g, ' ');
		}

		function applyIcons(scope) {
			var links = scope.querySelectorAll('a[href]');
			for (var i = 0; i < links.length; i++) {
    			var link = links[i];
    			if (link.dataset.iconApplied) continue;
    			if (link.closest('.ve-fd-header__title, #mw-editform-cancel')) continue;
				
				var title = getTitleFromLink(link);
				if (!title || !Object.prototype.hasOwnProperty.call(LINK_ICONS, title)) continue;
				if (title === mw.config.get('wgTitle')) continue;

				var rects = link.getClientRects();
				var linkHeight = rects.length ? rects[0].height : link.getBoundingClientRect().height;
				if (!linkHeight) continue;

				var icon = document.createElement('img');
				icon.src = LINK_ICONS[title];
				icon.style.setProperty('height', linkHeight + 'px');

				link.insertBefore(icon, link.firstChild);
				link.dataset.iconApplied = 'true';
			}
		}

		applyIcons(root);

		var observer = new MutationObserver(function () {
			applyIcons(root);
		});
		observer.observe(root, { childList: true, subtree: true });
	}

	if (typeof mw !== 'undefined' && mw.hook) {
		mw.hook('wikipage.content').add(init);
	} else if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();