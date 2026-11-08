/********** 
THE MAIN CSS OF THE FANDOM WIKI LIES IN HERE. THIS NOTE IS FOR EVERYONE EXCEPT THE WIKI BUREAUCRATS AND OWNER.
CHANGING THE CODE WITHOUT ANY PERMISSION OR APPROVAL FROM THE WIKI'S CURRENT BUREAUCRAT WILL RESULT IN A TEMPORARY BAN OF 2 DAYS. PLEASE DO NOT GIVE EXCUSES OF EDITING THE CODE ACCIDENTALLY OR TAMPERING / MESSING WITH THE FONT FILES.
PROCEED AT YOUR OWN RISK. 
**********/

importArticles({
	type: 'script',
	articles: [
	    'u:dev:MediaWiki:AutoDesktop.js',
	    'u:dev:MediaWiki:PatrolPanel.js',
	]
});
importArticles({
    type: 'script',
    articles: [
        'u:templates:MediaWiki:Tabs.js',
    ]
});

/********* UTC Clock Format Starts HERE **********/
(function () {
    'use strict';
    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    function pad(value) { return String(value).padStart(2, '0'); }
    function face(date) {
        return pad(date.getUTCHours()) + ' : ' + pad(date.getUTCMinutes()) + ' : ' + pad(date.getUTCSeconds()) + ' | ' + weekdays[date.getUTCDay()] + ' | ' + months[date.getUTCMonth()] + ' ' + pad(date.getUTCDate()) + ', ' + date.getUTCFullYear();
    }
    window.DisplayClockJS = {
        format: '%2H : %2M : %2S | %{Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday}w | %B %2d, %Y',
        hoverText: 'In this town, timing is everything. Miss it, and you’re yesterday’s news.',
        interval: 500
    };
    mw.hook('dev.utc-clock').add(function (clock) {
        if (!clock || !clock.$el || !clock.$el[0] || clock.d1930AlignedTimer) { return; }
        clock.d1930AlignedTimer = true;
        var element = clock.$el[0];
        var localTime = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        var localDate = new Intl.DateTimeFormat(undefined, { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' });
        // Replace the original timer rather than running a second clock beside it.
        clearInterval(clock.interval);
        clock.interval = null;
        clock.update = function () {
            if (!document.documentElement.contains(element) || !clock.$el.data('UTCClock')) { return; }
            var now = new Date();
            var text = face(now);
            if (element.textContent !== text) {
                element.textContent = text;
                element.title = 'In this town, timing is everything. Miss it, and you’re yesterday’s news. Local time: ' + localTime.format(now) + ' | ' + localDate.format(now);
            }
        };
        function tick() {
            clearTimeout(clock.interval);
            clock.interval = null;
            if (document.hidden || !document.documentElement.contains(element) || !clock.$el.data('UTCClock')) { return; }
            clock.update();
            // Re-align after a busy frame, a suspended tab or a system-clock change.
            clock.interval = setTimeout(tick, 1000 - Date.now() % 1000 + 5);
        }
        document.addEventListener('visibilitychange', tick);
        window.addEventListener('pageshow', tick);
        tick();
    });
}());
/********* UTC Clock Format Ends HERE **********/

mw.loader.using("mediawiki.util").then(function () {
	jQuery(function ($) {

    // Text Sequence Animation STARTS HERE

    function advanceFrame(){
    	const $sequence = $(this);
    	const $currentFrame = $sequence.children(".is-visible");
    	const $nextFrame = $currentFrame.next();

    	if ($nextFrame.length === 0) {
    		clearInterval($sequence.data("intervalId"));
        	return;
    	}

		$currentFrame.removeClass("is-visible");
    	$nextFrame.addClass("is-visible");
    }
    
    $(".text-sequence").each(function(){
    	const $sequence = $(this);
    	const delayMs =	parseInt($sequence.data("delay-ms"), 10) || 2000;
    	$sequence.on("advanceFrame", advanceFrame);
    	
    	const intervalId = setInterval(function(){
    		$sequence.trigger("advanceFrame");
    	}, delayMs);
    	
    	$sequence.data("intervalId", intervalId);
    });

    // Text Sequence Animation ENDS HERE

    // Random Letter Reveal STARTS HERE
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()_+`-=";

    const element = document.getElementById("scramble");

    if (element){
    	const targetText = element.textContent.trim();

    	let revealIndex = 0;
    	let frame = 0;

    	const scramblePerChar = 10;
    	const frameDelay = 30;

    	let hasAnimated = false;

    	function scrambleFrame(){
    		let display = "";
    		
    		for (let i = 0; i < targetText.length; i++){
    			if (i < revealIndex){
    				display += targetText[i];
        		} 
        		else if (targetText[i] === " "){
        			display += " ";
        		} 
        		else {
        			const randChar =
		            chars[Math.floor(Math.random() * chars.length)];
		            display += randChar;
        		}
        	}

        element.textContent = display;
        frame++;

        if (frame % scramblePerChar === 0){
        	revealIndex++;
        }

        if (revealIndex <= targetText.length){
        	setTimeout(scrambleFrame, frameDelay);
        }
      }

      const observer = new IntersectionObserver((entries, observer) => {entries.forEach((entry) => {
      	if (entry.isIntersecting && !hasAnimated) {
      		hasAnimated = true;
        	scrambleFrame();
            observer.unobserve(entry.target);
      	}
      });
    },
    {
    	root: null,
        threshold: 0.5
	}
    );
    observer.observe(element);
    }

    // Random Letter Reveal ENDS HERE

    // Statistics Counter STARTS HERE
    function animateCounter(element, end, duration) {
    	const start = 0;
    	const range = end - start;
    	const startTime = performance.now();

    	function easeOutCubic(t) {
    		return 1 - Math.pow(1 - t, 3);
    	}

    	function updateCounter(currentTime) {
    		const elapsed = currentTime - startTime;
        	const progress = Math.min(elapsed / duration, 1);

        	const easedProgress = easeOutCubic(progress);
        	const currentValue = Math.floor(start + easedProgress * range);

        	element.textContent = currentValue.toLocaleString("en-US");

        	if (progress < 1) {
        		requestAnimationFrame(updateCounter);
        	}
      }
      
      requestAnimationFrame(updateCounter);
    }

    const counters = document.querySelectorAll(".counter");

    const observer = new IntersectionObserver((entries, observer) => {entries.forEach((entry) => {
    	if (entry.isIntersecting) {
    		const element = entry.target;

            const endValue = parseInt(element.getAttribute("data-target").replace(/,/g, ""), 10);

            animateCounter(element, endValue, 4000);
            observer.unobserve(element);
    	}
    });
    },
	{
		threshold: 0.5
	}
    );

    counters.forEach((counter) => {
      counter.textContent = "0";
      observer.observe(counter);
    });

    // Statistics Counter ENDS HERE

    // Custom Gallery Slider STARTS HERE

    document.querySelectorAll(".slider-container").forEach((container) => {
    	
    	const slider = container.querySelector(".slider");
        const slides = slider.querySelectorAll(".slide");
        const thumbnails = container.querySelectorAll(".thumb-wrapper");
        const leftArrow = container.querySelector(".leftArrow");

        const rightArrow = container.querySelector(".rightArrow");

        let currentIndex = 0;

        function updateSlider(){
        	slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        	thumbnails.forEach((thumb, i) => {
        		thumb.querySelector(".thumbnail").classList.toggle("active", i === currentIndex);
        	});
        }

        function goToSlide(index){
        	currentIndex = index;
        	updateSlider();
        }

        function nextSlide(){
        	currentIndex = (currentIndex + 1) % slides.length;
        	updateSlider();
        }

        function prevSlide() {
        	currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        	updateSlider();
        }

        thumbnails.forEach((thumb, index) => {thumb.addEventListener("click", () => {
        	goToSlide(index);
        });
	});
        
        rightArrow.addEventListener("click", nextSlide);
        leftArrow.addEventListener("click", prevSlide);

        setInterval(nextSlide, 5000);
	});

    // Custom Gallery Slider ENDS HERE

	//HALL OF FAME LOGIC STARTS HERE
	(function () {
		function initialiseHallOfFame(container) {
	        var slider = container.querySelector('.hof-slider');
	        var slides = container.querySelectorAll('.hof-slide');
	        var previousButton = container.querySelector('.hof-prev');
	        var nextButton = container.querySelector('.hof-next');
	        var smallPreviousButton = container.querySelector('.hof-small-prev');
	        var smallNextButton = container.querySelector('.hof-small-next');
	        var currentLabel = container.querySelector('.hof-current');
	        var totalLabel = container.querySelector('.hof-total');
	        var progress = container.querySelector('.hof-progress');
	        var progressFill = container.querySelector('.hof-progress-fill');
	        var currentIndex = 0;
	
	        if (!slider || !slides.length) {
	            return;
	        }
	
	        container.classList.toggle('hof-single-slide', slides.length === 1);
	
	        function updateSlider() {
	            slider.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
	
	            if (currentLabel) {
	                currentLabel.textContent = String(currentIndex + 1).padStart(2, '0');
	            }
	
	            if (totalLabel) {
	                totalLabel.textContent = String(slides.length).padStart(2, '0');
	            }
	
	            if (progressFill) {
	                progressFill.style.width = (((currentIndex + 1) / slides.length) * 100) + '%';
	            }
	        }
	
	        function goNext() {
	            currentIndex = (currentIndex + 1) % slides.length;
	            updateSlider();
	        }
	
	        function goPrevious() {
	            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
	            updateSlider();
	        }
	
	        var touchStartX = null;
	        var touchStartY = null;
	        var touchStartTime = 0;
	        var minimumSwipeDistance = 50;
	        var maximumSwipeDuration = 900;
	
	        function resetTouch() {
	            touchStartX = null;
	            touchStartY = null;
	            touchStartTime = 0;
	        }
	
	        container.addEventListener('touchstart', function (event) {
	            if (slides.length < 2 || event.touches.length !== 1) {
	                resetTouch();
	                return;
	            }
	
	            touchStartX = event.touches[0].clientX;
	            touchStartY = event.touches[0].clientY;
	            touchStartTime = Date.now();
	        }, { passive: true });
	
	        container.addEventListener('touchend', function (event) {
	            if (
	                slides.length < 2 ||
	                touchStartX === null ||
	                touchStartY === null ||
	                !event.changedTouches.length
	            ) {
	                resetTouch();
	                return;
	            }
	
	            var touchEndX = event.changedTouches[0].clientX;
	            var touchEndY = event.changedTouches[0].clientY;
	            var horizontalDistance = touchEndX - touchStartX;
	            var verticalDistance = touchEndY - touchStartY;
	            var swipeDuration = Date.now() - touchStartTime;
	            var isHorizontalSwipe =
	                Math.abs(horizontalDistance) >= minimumSwipeDistance &&
	                Math.abs(horizontalDistance) > Math.abs(verticalDistance) * 1.2;
	
	            resetTouch();
	
	            if (!isHorizontalSwipe || swipeDuration > maximumSwipeDuration) {
	                return;
	            }
	
	            if (horizontalDistance < 0) {
	                goNext();
	            } else {
	                goPrevious();
	            }
	        }, { passive: true });
	
	        container.addEventListener('touchcancel', resetTouch, { passive: true });
	
	        function activateOnKeyboard(element, action) {
	            if (!element) {
	                return;
	            }
	
	            element.addEventListener('keydown', function (event) {
	                if (event.key === 'Enter' || event.key === ' ') {
	                    event.preventDefault();
	                    action();
	                }
	            });
	        }
	
	        if (nextButton) {
	            nextButton.addEventListener('click', goNext);
	        }
	        
	        if (previousButton) {
	            previousButton.addEventListener('click', goPrevious);
	        }
	        
	        if (smallNextButton) {
	            smallNextButton.addEventListener('click', goNext);
	        }
	        
	        if (smallPreviousButton) {
	            smallPreviousButton.addEventListener('click', goPrevious);
	        }
	
	        activateOnKeyboard(nextButton, goNext);
	        activateOnKeyboard(previousButton, goPrevious);
	        activateOnKeyboard(smallNextButton, goNext);
	        activateOnKeyboard(smallPreviousButton, goPrevious);
	
	        if (progress) {
	            progress.addEventListener('click', function (event) {
	                var bounds = progress.getBoundingClientRect();
	                var percentage = (event.clientX - bounds.left) / bounds.width;
	                currentIndex = Math.max(0, Math.min(Math.floor(percentage * slides.length), slides.length - 1));
	                updateSlider();
	            });
	        }
	
	        container.setAttribute('tabindex', '0');
	        container.addEventListener('keydown', function (event) {
	            if (event.key === 'ArrowRight') {
	                goNext();
	            } else if (event.key === 'ArrowLeft') {
	                goPrevious();
	            }
	        });
	
	        updateSlider();
	    }
	
	    function initialiseAll() {
	        document.querySelectorAll('.hof-container').forEach(initialiseHallOfFame);
	    }
	
	    if (document.readyState === 'loading') {
	        document.addEventListener('DOMContentLoaded', initialiseAll);
	    } else {
	        initialiseAll();
	    }
	}());
	//HALL OF FAME LOGIC ENDS HERE

  });
});

/* IIFE For LIVE ROOMS START HERE*/
(function () {
    'use strict';
    var endpoint = 'wss://downtown1930s-rooms.duckdns.org/events';
    var widgets = [];
    var socket = null;
    var reconnectTimer = null;
    var retryDelay = 1000;
    var connectionTimer = null;
    var socketFailures = 0;
    var pollMode = false;
    var pollTimer = null;
    var pollController = null;
    var lastData = null;
    var pageActive = true;
    var summaryTimer = null;
    var snapshotReceivedAt = 0;
    var connectionView = {
        label: 'Connecting',
        message: 'Connecting to the public room lobby…',
        state: 'connecting'
    };
    var settingLabels = {
        MegaAdmin: 'Mega admin(s) present',
        FirstTimePlayer: 'First-time player',
        Races: 'Race Mode',
        Classic: 'Classic / Origin Mode',
        Cops: 'Lockdown Wars Mode'
    };

    function element(tag, className, text) {
        var node = document.createElement(tag);
        if (className) {
            node.className = className;
        }
        if (text !== undefined) {
            node.textContent = String(text);
        }
        return node;
    }
    function setText(node, text) {
        text = String(text);
        if (node.textContent !== text) {
            node.textContent = text;
        }
    }
    function value(value) {
        if (value === undefined || value === null) {
            return 'Unknown';
        }
        if (value === true) {
            return 'Yes';
        }
        if (value === false) {
            return 'No';
        }
        return typeof value === 'object' ? JSON.stringify(value) : String(value);
    }
    function utc(value, full) {
        var date = new Date(value);
        if (!value || isNaN(date.getTime())) {
            return 'Not received yet';
        }
        var time = date.toLocaleTimeString('en-GB', { timeZone: 'UTC' }) + ' UTC';
        return full ? date.toISOString().slice(0, 10) + ' · ' + time : time;
    }
    function region(value) {
        return value === 'eu'
            ? 'Europe (EU)'
            : value
              ? String(value).toUpperCase()
              : 'Unknown region';
    }
    function roomIdentity(id) {
        var label = id.replace(/\$\d+$/, '');
        var separator = label.indexOf(' : ');
        return separator < 0
            ? { owner: 'Unknown', name: label || 'Unnamed room' }
            : {
                  owner: label.slice(0, separator).trim() || 'Unknown',
                  name: label.slice(separator + 3).trim() || 'Unnamed room'
              };
    }
    function currentWidgets() {
        widgets = widgets.filter(function (widget) {
            return document.documentElement.contains(widget.root);
        });
        return widgets;
    }
    function wanted() {
        return pageActive && !document.hidden && currentWidgets().length > 0;
    }
    function field(list, label, className) {
        var pair = element('div', 'lr-pair');
        pair.appendChild(element('dt', '', label));
        var content = element('dd', className || '', '—');
        pair.appendChild(content);
        list.appendChild(pair);
        return content;
    }
    function disclosure(parent, label, className) {
        var details = element('details', className);
        details.appendChild(element('summary', '', label));
        parent.appendChild(details);
        return details;
    }
    function connectionStatus(label, message, state) {
        connectionView = { label: label, message: message, state: state };
        currentWidgets().forEach(function (widget) {
            setText(widget.status, label);
            setText(widget.notice, message);
            widget.notice.hidden = !message;
            widget.root.setAttribute('data-state', state);
        });
    }
    function updateSummary() {
        clearTimeout(summaryTimer);
        summaryTimer = null;
        if (lastData) {
            var checked = Date.parse(lastData.checkedAt);
            var updated = Date.parse(lastData.lastRoomListAt);
            var estimatedNow = checked + performance.now() - snapshotReceivedAt;
            var age =
                isFinite(checked) && isFinite(updated)
                    ? Math.max(0, Math.floor((estimatedNow - updated) / 1000))
                    : null;
            currentWidgets().forEach(function (widget) {
                setText(widget.updated, utc(lastData.lastRoomListAt));
                setText(
                    widget.age,
                    age === null ? '' : age + (age === 1 ? ' second ago' : ' seconds ago')
                );
                widget.age.hidden = age === null;
                widget.updated.title = utc(lastData.lastRoomListAt, true);
            });
        }
        if (wanted()) {
            summaryTimer = setTimeout(updateSummary, 1000 - (Date.now() % 1000) + 5);
        }
    }
    function createRoomView() {
        var root = element('li', 'lr-room');
        var header = element('div', 'lr-room-header');
        var identity = element('div', 'lr-room-identity');
        var ownerLine = element('p', 'lr-room-owner');
        ownerLine.appendChild(element('span', 'lr-identity-label', 'Original Room Owner Name : '));
        var owner = element('span', 'lr-room-owner-value');
        owner.title = 'Name shown in the room ID; the current host may differ.';
        ownerLine.appendChild(owner);
        identity.appendChild(ownerLine);
        var name = element('h3', 'lr-room-name');
        name.appendChild(element('span', 'lr-identity-label', 'Room Name : '));
        var nameValue = element('span', 'lr-room-name-value');
        name.appendChild(nameValue);
        identity.appendChild(name);
        var occupancy = element('span', 'lr-occupancy');
        header.appendChild(identity);
        header.appendChild(occupancy);
        root.appendChild(header);
        var facts = element('dl', 'lr-facts');
        root.appendChild(facts);
        var view = {
            root: root,
            name: nameValue,
            owner: owner,
            occupancy: occupancy,
            settings: {}
        };
        view.admission = field(facts, 'Availability');
        view.password = field(facts, 'Password');
        view.activity = field(facts, 'Activity');
        var players = disclosure(root, 'Players in room', 'lr-player-details');
        view.playersSummary = players.firstChild;
        view.playersList = element('ul', 'lr-player-list');
        players.appendChild(view.playersList);
        view.playersNote = element('p', 'lr-player-note');
        players.appendChild(view.playersNote);
        var details = disclosure(root, 'Room details', 'lr-room-details');
        var settings = element('dl', 'lr-settings');
        details.appendChild(settings);
        Object.keys(settingLabels).forEach(function (key) {
            view.settings[key] = field(settings, settingLabels[key]);
        });
        details.appendChild(
            element('p', 'lr-setting-note', 'Some more details about the rooms are provided below.')
        );
        var technical = element('dl', 'lr-room-meta');
        details.appendChild(technical);
        view.id = field(technical, 'Full room ID', 'lr-room-id');
        view.full = field(technical, 'At reported capacity');
        return view;
    }
    function updateRoom(view, room) {
        var signature = JSON.stringify(room);
        if (view.signature === signature) {
            return;
        }
        view.signature = signature;
        var id = String(room.roomId || 'Unnamed room');
        var identity = roomIdentity(id);
        setText(view.owner, identity.owner);
        setText(view.name, identity.name);
        view.name.title = id;
        var capacity = room.maxPlayers === 0 ? 'Unlimited' : value(room.maxPlayers);
        setText(view.occupancy, value(room.players) + ' / ' + capacity);
        view.occupancy.title = 'Players / capacity reported by Photon';
        var admission = room.full
            ? 'Full'
            : room.isOpen === false
              ? 'Closed'
              : room.requiresPassword
                ? 'Password required'
                : room.joinableWithoutPasswordByLobby
                  ? 'Joinable by lobby'
                  : 'Not joinable by lobby';
        setText(view.admission, admission);
        setText(
            view.password,
            room.requiresPassword === true
                ? 'Required'
                : room.requiresPassword === false
                  ? 'Not Required'
                  : 'Unknown'
        );
        setText(
            view.activity,
            room.active === true ? 'Occupied' : room.active === false ? 'Empty' : 'Unknown'
        );
        setText(view.id, id);
        setText(view.full, value(room.full));
        setText(view.playersSummary, 'Players in room (' + value(room.players) + ')');
        var names = Array.isArray(room.playerNames) ? room.playerNames : null;
        view.playersList.hidden = !names || names.length === 0;
        (names || []).forEach(function (name, index) {
            var item = view.playersList.children[index];
            if (!item) {
                item = element('li', 'lr-player-name');
                view.playersList.appendChild(item);
            }
            setText(item, name);
        });
        while (view.playersList.children.length > (names ? names.length : 0)) {
            view.playersList.removeChild(view.playersList.children[view.playersList.children.length - 1]);
        }
        setText(view.playersNote, names === null ? 'Player names are not available for this room yet.' :
            names.length === 0 ? (room.players === 0 ? 'No players are listed in this room.' : 'The game has not published any player names yet.') :
            'Names are supplied by the game and may briefly lag behind the player count.');
        Object.keys(settingLabels).forEach(function (key) {
            var setting = (room.settings || {})[key];
            var useYesNo = key === 'FirstTimePlayer';
            setText(
                view.settings[key],
                useYesNo
                    ? value(setting)
                    : setting === true
                      ? 'On'
                      : setting === false
                        ? 'Off'
                        : value(setting)
            );
        });
    }
    function renderRooms(widget, data) {
        var present = new Set();
        var rooms = data.rooms.slice().sort(function (a, b) {
            return String(a.roomId).localeCompare(String(b.roomId));
        });
        rooms.forEach(function (room, index) {
            var id = String(room.roomId);
            present.add(id);
            var view = widget.roomViews.get(id);
            if (!view) {
                view = createRoomView();
                widget.roomViews.set(id, view);
            }
            updateRoom(view, room);
            // Preserve expanded details and focused controls across live updates.
            if (widget.rooms.children[index] !== view.root) {
                widget.rooms.insertBefore(view.root, widget.rooms.children[index] || null);
            }
        });
        widget.roomViews.forEach(function (view, id) {
            if (!present.has(id)) {
                widget.rooms.removeChild(view.root);
                widget.roomViews.delete(id);
            }
        });
        widget.empty.hidden = rooms.length > 0;
        setText(
            widget.empty,
            data.stale
                ? 'Waiting for a live room list. No cached rooms are available.'
                : 'No public rooms are currently listed in this lobby.'
        );
    }
    function render(data) {
        lastData = data;
        currentWidgets().forEach(function (widget) {
            setText(widget.roomCount, value(data.roomCount));
            setText(widget.playerCount, value(data.playersInListedRooms));
            setText(
                widget.availableCount,
                data.rooms.filter(function (room) {
                    return room.joinableByLobby === true;
                }).length
            );
            setText(widget.feedRegion, region(data.region));
            setText(widget.version, value(data.appVersion));
            setText(widget.freshness, data.stale ? 'Cached · may be outdated' : 'Live connection');
            setText(widget.snapshotTime, utc(data.checkedAt, true));
            setText(widget.eventTime, utc(data.lastRoomListAt, true));
            renderRooms(widget, data);
        });
        if (data.stale) {
            connectionStatus(
                'Cached data',
                'The game feed is reconnecting. Counts and rooms below are the last received values.',
                'stale'
            );
        } else {
            connectionStatus('Live', '', 'live');
        }
        updateSummary();
    }
    function createWidget(root) {
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
        var widget = { root: root, roomViews: new Map() };
        var header = element('div', 'lr-header');
        var heading = element('div', 'lr-heading');
        heading.appendChild(element('h2', 'lr-title', 'Public Lobby Overview'));
        header.appendChild(heading);
        var liveInfo = element('div', 'lr-live-info');
        widget.status = element('span', 'lr-status', 'Connecting');
        widget.status.setAttribute('role', 'status');
        liveInfo.appendChild(widget.status);
        var updated = element('p', 'lr-updated');
        updated.setAttribute('aria-label', 'Latest lobby event');
        widget.updated = element('span', 'lr-update-time', 'Not received yet');
        updated.appendChild(widget.updated);
        widget.age = element('span', 'lr-update-age');
        widget.age.hidden = true;
        updated.appendChild(widget.age);
        liveInfo.appendChild(updated);
        header.appendChild(liveInfo);
        root.appendChild(header);
        widget.notice = element('p', 'lr-notice', 'Connecting to the public room lobby…');
        root.appendChild(widget.notice);
        var stats = element('dl', 'lr-stats');
        widget.roomCount = field(stats, 'Listed rooms', 'lr-stat-value');
        widget.playerCount = field(stats, 'Players in listed rooms', 'lr-stat-value');
        widget.availableCount = field(stats, 'Open & not full', 'lr-stat-value');
        root.appendChild(stats);
        widget.empty = element('p', 'lr-empty', 'Waiting for the first room list…');
        root.appendChild(widget.empty);
        widget.rooms = element('ul', 'lr-rooms');
        widget.rooms.setAttribute('aria-label', 'Public game rooms');
        root.appendChild(widget.rooms);
        root.appendChild(
            element(
                'p',
                'lr-help',
                'Counts use the capacity reported by Photon Engine, which may differ from the game menu. Occupied means at least one player.It does not indicate AFK activity.'
            )
        );
        var fallback = element('p', 'lr-fallback');
        var fallbackLink = element('a', '', 'Open the standalone room list');
        fallbackLink.href = endpoint.replace(/^wss:/, 'https:').replace(/^ws:/, 'http:').replace(/\/events$/, '/view');
        fallback.appendChild(fallbackLink);
        root.appendChild(fallback);
        var info = disclosure(root, 'About this Live Data', 'lr-feed-details');
        var metadata = element('dl', 'lr-feed-meta');
        info.appendChild(metadata);
        widget.feedRegion = field(metadata, 'Region');
        widget.version = field(metadata, 'Game network version');
        widget.freshness = field(metadata, 'Data freshness');
        widget.snapshotTime = field(metadata, 'Snapshot generated');
        widget.eventTime = field(metadata, 'Last lobby event');
        return widget;
    }
    function stopSocket() {
        clearTimeout(connectionTimer);
        connectionTimer = null;
        if (socket) {
            var oldSocket = socket;
            socket = null;
            oldSocket.onclose = null;
            oldSocket.onerror = null;
            oldSocket.onmessage = null;
            oldSocket.close();
        }
    }
    function stopPolling() {
        clearTimeout(pollTimer);
        pollTimer = null;
        if (pollController) {
            var controller = pollController;
            pollController = null;
            controller.abort();
        }
    }
    function disconnect() {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
        clearTimeout(summaryTimer);
        summaryTimer = null;
        stopSocket();
        stopPolling();
    }
    function validSnapshot(data) {
        return data && Array.isArray(data.rooms) && data.rooms.length <= 1000 &&
            typeof data.stale === 'boolean' &&
            Number.isSafeInteger(data.roomCount) && data.roomCount >= 0 &&
            Number.isSafeInteger(data.playersInListedRooms) && data.playersInListedRooms >= 0 &&
            data.rooms.every(function (room) {
                return room && typeof room.roomId === 'string' && room.roomId.length <= 1000 &&
                    Number.isSafeInteger(room.players) && room.players >= 0 &&
                    Number.isSafeInteger(room.maxPlayers) && room.maxPlayers >= 0 &&
                    (room.playerNames == null || (Array.isArray(room.playerNames) &&
                        room.playerNames.length <= 1000 && room.playerNames.every(function (name) {
                            return typeof name === 'string' && name.length <= 32767;
                        })));
            });
    }
    function acceptSnapshot(data, polling) {
        if (!validSnapshot(data)) { throw new Error('Invalid room data'); }
        snapshotReceivedAt = performance.now();
        render(data);
        if (polling && !data.stale) {
            connectionStatus('Live · polling', 'Updates every 15 seconds while the live connection is unavailable.', 'live');
        }
    }
    function poll() {
        clearTimeout(pollTimer);
        pollTimer = null;
        if (!wanted() || !pollMode || pollController) { return; }
        var controller = new AbortController();
        pollController = controller;
        var timeout = setTimeout(function () { controller.abort(); }, 8000);
        var url = endpoint.replace(/^wss:/, 'https:').replace(/^ws:/, 'http:').replace(/\/events$/, '/rooms');
        fetch(url, { cache: 'no-store', credentials: 'omit', signal: controller.signal })
            .then(function (response) {
                if (!response.ok && response.status !== 503) { throw new Error('Room service unavailable'); }
                return response.text();
            })
            .then(function (text) {
                if (pollController !== controller || !wanted() || !pollMode) { return; }
                if (text.length > 1024 * 1024) { throw new Error('Room data too large'); }
                acceptSnapshot(JSON.parse(text), true);
            })
            .catch(function () {
                if (pollController === controller && wanted() && pollMode) {
                    connectionStatus('Unavailable', lastData ?
                        'Room service unavailable or busy. Displayed values may be outdated; retrying automatically.' :
                        'Room service unavailable or busy. Retrying automatically.', 'stale');
                }
            })
            .finally(function () {
                clearTimeout(timeout);
                if (pollController !== controller) { return; }
                pollController = null;
                if (wanted() && pollMode) { pollTimer = setTimeout(poll, 15000); }
            });
    }
    function failedConnection(connection) {
        if (socket !== connection) { return; }
        stopSocket();
        socketFailures += 1;
        connectionStatus('Reconnecting', lastData ?
            'Connection interrupted. Displayed values may be outdated; retrying automatically.' :
            'The live connection is unavailable. Retrying automatically.', 'stale');
        if (socketFailures >= 3 && typeof fetch === 'function' && typeof AbortController === 'function') {
            pollMode = true;
            poll();
        }
        scheduleReconnect();
    }
    function armConnectionTimeout(connection, delay) {
        clearTimeout(connectionTimer);
        connectionTimer = setTimeout(function () { failedConnection(connection); }, delay);
    }
    function connect() {
        if (!wanted() || socket) { return; }
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
        if (!pollMode) {
            connectionStatus(lastData ? 'Reconnecting' : 'Connecting', lastData ?
                'Showing the last received room list while the connection resumes.' :
                'Connecting to the public room lobby…', 'connecting');
        }
        var connection;
        try { connection = new WebSocket(endpoint); }
        catch (error) {
            socketFailures += 1;
            if (socketFailures >= 3 && typeof fetch === 'function' && typeof AbortController === 'function') {
                pollMode = true;
                poll();
            }
            connectionStatus('Reconnecting', 'The live connection is unavailable. Retrying automatically.', 'stale');
            scheduleReconnect();
            return;
        }
        socket = connection;
        // Each attempt has its own deadline, including the opening handshake and first snapshot.
        armConnectionTimeout(connection, 15000);
        connection.onmessage = function (event) {
            if (socket !== connection) { return; }
            try {
                if (typeof event.data !== 'string' || event.data.length > 1024 * 1024) {
                    throw new Error('Invalid room message');
                }
                var data = JSON.parse(event.data);
                if (!validSnapshot(data)) { throw new Error('Invalid room data'); }
                pollMode = false;
                stopPolling();
                socketFailures = 0;
                retryDelay = 1000;
                acceptSnapshot(data, false);
                armConnectionTimeout(connection, 45000);
            } catch (error) { failedConnection(connection); }
        };
        connection.onerror = function () { failedConnection(connection); };
        connection.onclose = function () { failedConnection(connection); };
    }
    function scheduleReconnect() {
        if (!wanted() || reconnectTimer) { return; }
        var delay = pollMode ? 60000 : retryDelay;
        // Spread retries across visitors after a shared network or server interruption.
        delay = Math.round(delay * (0.8 + Math.random() * 0.4));
        reconnectTimer = setTimeout(connect, delay);
        retryDelay = Math.min(retryDelay * 2, 60000);
    }
    function discover() {
        document.querySelectorAll('.d1930-live-rooms').forEach(function (root) {
            if (root.getAttribute('data-live-rooms-ready') === '1') {
                return;
            }
            root.setAttribute('data-live-rooms-ready', '1');
            widgets.push(createWidget(root));
        });
        var savedView = connectionView;
        if (lastData) { render(lastData); }
        connectionStatus(savedView.label, savedView.message, savedView.state);
        if (wanted()) {
            connect();
            if (pollMode) { poll(); }
            updateSummary();
        } else {
            disconnect();
        }
    }
    document.addEventListener('visibilitychange', function () {
        if (wanted()) {
            retryDelay = 1000;
            updateSummary();
            connect();
            if (pollMode) { poll(); }
        } else {
            disconnect();
            connectionStatus(
                'Paused',
                'Live updates resume when this tab is visible again.',
                'paused'
            );
        }
    });
    window.addEventListener('pagehide', function () {
        pageActive = false;
        disconnect();
    });
    window.addEventListener('pageshow', function () {
        pageActive = true;
        discover();
    });
    mw.hook('wikipage.content').add(discover);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', discover);
    } else {
        discover();
    }
})();
/* IIFE For LIVE ROOMS ENDS HERE*/


/* BEGIN D1930 WELCOME ANIME: letter reveal, shared bullet underline and neon. */
(function() {
    'use strict';
    if (mw.config.get('wgAction') !== 'view') {
        return;
    }
    var libraryPromise;
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var gunSvg = '<svg viewBox="0 0 64 32" aria-hidden="true"><g class="d1930-gun-body"><path class="d1930-gun-stroke" d="M5 13h34l4-3h12M39 13h21M12 13l-6 8 8-2 5-6M23 14v5h8l2-5M27 19l-2 6M43 6h8"/></g><path class="d1930-gun-flash" d="m63 13 5 0m-6-4 4-2m-4 10 4 2"/></svg>';

    function library() {
        if (!libraryPromise) {
            libraryPromise = mw.loader.getScript('https://cdn.jsdelivr.net/npm/animejs@4.5.0/dist/bundles/anime.umd.min.js').then(function() {
                if (!window.anime || typeof window.anime.createTimeline !== 'function') {
                    throw new Error('Anime.js unavailable');
                }
                return window.anime;
            });
        }
        return libraryPromise;
    }

    function initialize(element) {
        if (element.dataset.d1930WelcomeReady) {
            return;
        }
        element.dataset.d1930WelcomeReady = '1';
        var fallback = element.querySelector('.d1930-welcome-text');
        if (!fallback) {
            return;
        }
        var text = fallback.textContent.replace(/\s+/g, ' ').trim();
        var scene, copy, glyphs, resizeObserver, visibilityObserver, timeline, anime, loadTimeout;
        var visible = !('IntersectionObserver' in window);
        var ready = false;
        var started = false;
        var finished = false;
        var resumeOnVisible = false;
        var distance = 0;
        element.classList.add('d1930-welcome-waiting');

        function all(selector) {
            return Array.prototype.slice.call(element.querySelectorAll(selector));
        }

        function one(selector) {
            return element.querySelector(selector);
        }

        function finish() {
            finished = true;
            clearTimeout(loadTimeout);
            if (timeline) {
                timeline.pause();
            }
            element.classList.remove('d1930-welcome-waiting', 'd1930-welcome-playing', 'd1930-welcome-paused');
            if (scene) {
                scene.classList.add('d1930-is-lit');
                copy.classList.add('neon-sign');
                all('.d1930-letter-ink').forEach(function(ink) {
                    ink.style.opacity = '1';
                    ink.style.transform = 'none';
                });
                all('.d1930-underline-half').forEach(function(line) {
                    line.style.opacity = '1';
                    line.style.transform = 'scaleX(1)';
                });
                all('.d1930-gun-rig, .d1930-shot, .d1930-impact-ring').forEach(function(part) {
                    part.style.opacity = '0';
                });
            } else {
                element.classList.add('d1930-welcome-static');
                fallback.classList.add('neon-sign');
            }
            if (visibilityObserver) {
                visibilityObserver.disconnect();
            }
            document.removeEventListener('visibilitychange', tabVisibility);
            motion.removeEventListener('change', motionChanged);
        }

        function layout() {
            if (!document.documentElement.contains(element)) {
                if (resizeObserver) {
                    resizeObserver.disconnect();
                }
                window.removeEventListener('resize', layout);
                return;
            }
            var fontSize = 46;
            var copyWidth = copy.offsetWidth || copy.scrollWidth || fontSize * 18.395;
            var copyHeight = copy.offsetHeight || fontSize * 1.5;
            var gutter = 52;
            var sceneWidth = copyWidth + gutter * 2;
            var padding = parseFloat(getComputedStyle(element).paddingLeft) || 18;
            var available = Math.max(1, element.clientWidth - padding * 2);
            var scale = Math.min(1, available / sceneWidth);
            distance = copyWidth / 2;
            scene.style.width = sceneWidth + 'px';
            scene.style.height = (24 + copyHeight + 64) + 'px';
            scene.style.setProperty('--d1930-scale', scale);
            scene.style.setProperty('--d1930-copy-left', gutter + 'px');
            scene.style.setProperty('--d1930-copy-right', (gutter + copyWidth) + 'px');
            scene.style.setProperty('--d1930-track-y', (24 + copyHeight - fontSize * 0.12) + 'px');
            scene.style.setProperty('--d1930-distance', distance + 'px');
            scene.style.setProperty('--d1930-line-weight', (1.25 / scale) + 'px');
            scene.style.setProperty('--d1930-gun-stroke', (1.5 / Math.sqrt(scale)) + 'px');
            scene.style.setProperty('--d1930-left-gun', (gutter - 60 / 64 * 36) + 'px');
            scene.style.setProperty('--d1930-right-gun', (gutter + copyWidth - 4 / 64 * 36) + 'px');
            glyphs.forEach(function(glyph) {
                var center = glyph.offsetLeft + glyph.offsetWidth / 2;
                glyph.dataset.arrival = Math.max(0, Math.min(1, Math.min(center, copyWidth - center) / distance));
                glyph.dataset.side = center < distance ? 'left' : 'right';
            });
        }

        function mount() {
            scene = document.createElement('div');
            scene.className = 'd1930-welcome-scene';
            scene.setAttribute('aria-hidden', 'true');
            scene.innerHTML = '<div class="d1930-welcome-copy"></div><div class="d1930-gun-rig d1930-gun-left"><div class="d1930-gun-icon">' + gunSvg + '</div></div><div class="d1930-gun-rig d1930-gun-right"><div class="d1930-gun-icon">' + gunSvg + '</div></div><div class="d1930-welcome-underline"><span class="d1930-underline-half d1930-line-left"></span><span class="d1930-underline-half d1930-line-right"></span></div><div class="d1930-shot d1930-shot-left"></div><div class="d1930-shot d1930-shot-right"></div><div class="d1930-center-impact"><span class="d1930-impact-ring"></span><span class="d1930-impact-ring d1930-inner-ring"></span></div>';
            copy = scene.querySelector('.d1930-welcome-copy');
            Array.from(text).forEach(function(character) {
                var glyph = document.createElement('span');
                glyph.className = 'd1930-gun-char' + (character === ' ' ? ' d1930-is-space' : '');
                var ink = document.createElement('span');
                ink.className = 'd1930-letter-ink';
                ink.textContent = character;
                glyph.appendChild(ink);
                copy.appendChild(glyph);
            });
            element.appendChild(scene);
            element.classList.add('d1930-welcome-mounted');
            glyphs = all('.d1930-gun-char:not(.d1930-is-space)');
            layout();
            if ('ResizeObserver' in window) {
                resizeObserver = new ResizeObserver(layout);
                resizeObserver.observe(element);
            } else {
                window.addEventListener('resize', layout);
            }
        }

        function play() {
            started = true;
            if (visibilityObserver) {
                visibilityObserver.disconnect();
            }
            element.classList.remove('d1930-welcome-waiting');
            element.classList.add('d1930-welcome-playing');
            var inks = glyphs.map(function(glyph) {
                return glyph.querySelector('.d1930-letter-ink');
            });
            // Letter reveal stays at 1x. Everything after it uses the chosen 0.5x choreography.
            var revealEnd = 120 + (inks.length - 1) * 38 + 240;
            var gunStart = revealEnd + 200;

            function at(milliseconds) {
                return gunStart + milliseconds * 2;
            }
            var fireAt = at(700);
            var travel = 4000;
            var meetAt = fireAt + travel;
            timeline = anime.createTimeline({
                autoplay: false,
                defaults: {
                    ease: 'out(3)'
                },
                onComplete: finish
            });
            timeline.add(inks, {
                    opacity: [0, 1],
                    y: [5, 0],
                    duration: 240,
                    delay: anime.stagger(38)
                }, 120)
                .add(one('.d1930-gun-left'), {
                    opacity: [0, 1],
                    x: [6, 0],
                    duration: 860
                }, gunStart)
                .add(one('.d1930-gun-right'), {
                    opacity: [0, 1],
                    x: [-6, 0],
                    duration: 860
                }, gunStart)
                .add(all('.d1930-gun-body'), {
                    x: [0, -2, 0],
                    rotate: [0, -3, 0],
                    duration: 560
                }, fireAt)
                .add(all('.d1930-gun-flash'), {
                    opacity: [0, 0.9, 0],
                    duration: 360,
                    ease: 'linear'
                }, fireAt)
                .add(one('.d1930-shot-left'), {
                    x: [0, distance],
                    duration: travel,
                    ease: 'linear'
                }, fireAt)
                .add(one('.d1930-shot-right'), {
                    x: [0, -distance],
                    duration: travel,
                    ease: 'linear'
                }, fireAt)
                .add(all('.d1930-shot'), {
                    opacity: [0, 1],
                    duration: 160
                }, fireAt)
                .add(all('.d1930-underline-half'), {
                    scaleX: [0, 1],
                    duration: travel,
                    ease: 'linear'
                }, fireAt)
                .call(function() {
                    all('.d1930-underline-half').forEach(function(line) {
                        line.style.opacity = '1';
                    });
                }, fireAt);
            glyphs.forEach(function(glyph) {
                timeline.add(glyph.querySelector('.d1930-letter-ink'), {
                    y: [0, -10, 3, 0],
                    rotateZ: [0, glyph.dataset.side === 'left' ? -3 : 3, 0],
                    duration: 1040,
                    ease: 'out(2)'
                }, fireAt + Number(glyph.dataset.arrival) * travel);
            });
            timeline.add(all('.d1930-shot'), {
                    opacity: [1, 0],
                    duration: 160
                }, meetAt)
                .add(one('.d1930-impact-ring:not(.d1930-inner-ring)'), {
                    scale: [0.12, 1.8],
                    opacity: [0, 0.5, 0],
                    duration: 1240,
                    ease: 'out(2)'
                }, meetAt)
                .add(one('.d1930-inner-ring'), {
                    scale: [0.12, 2],
                    opacity: [0, 0.35, 0],
                    duration: 1240,
                    ease: 'out(2)'
                }, meetAt + 180)
                .add(all('.d1930-gun-rig'), {
                    opacity: [1, 0],
                    y: [0, 5],
                    duration: 700
                }, meetAt + 440)
                .call(function() {
                    copy.classList.add('neon-sign');
                    scene.classList.add('d1930-is-lit');
                }, at(3500))
                .call(finish, at(4100));
            timeline.resume();
        }

        function tryStart() {
            if (!finished && !started && ready && visible && !document.hidden && document.documentElement.contains(element)) {
                play();
            }
        }

        function tabVisibility() {
            if (finished) {
                return;
            }
            if (document.hidden && timeline) {
                resumeOnVisible = !timeline.paused;
                timeline.pause();
                element.classList.add('d1930-welcome-paused');
            } else if (!document.hidden) {
                element.classList.remove('d1930-welcome-paused');
                if (timeline && resumeOnVisible) {
                    resumeOnVisible = false;
                    timeline.resume();
                } else {
                    tryStart();
                }
            }
        }

        function motionChanged() {
            if (motion.matches) {
                finish();
            }
        }
        if (motion.matches) {
            finish();
            return;
        }
        motion.addEventListener('change', motionChanged);
        document.addEventListener('visibilitychange', tabVisibility);
        if ('IntersectionObserver' in window) {
            visibilityObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.target === element) {
                        visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
                    }
                });
                tryStart();
            }, {
                threshold: 0.5
            });
            visibilityObserver.observe(element);
        }
        loadTimeout = setTimeout(function() {
            if (!ready && !finished) {
                finish();
            }
        }, 12000);
        Promise.all([library(), document.fonts ? document.fonts.ready : Promise.resolve()]).then(function(results) {
            if (finished || !document.documentElement.contains(element)) {
                return;
            }
            clearTimeout(loadTimeout);
            anime = results[0];
            mount();
            ready = true;
            tryStart();
        }).catch(function(error) {
            if (scene && scene.parentNode) {
                scene.parentNode.removeChild(scene);
            }
            scene = null;
            element.classList.remove('d1930-welcome-mounted');
            finish();
            if (window.console) {
                console.warn('Welcome animation unavailable:', error);
            }
        });
    }

    mw.hook('wikipage.content').add(function($content) {
        $content.find('.d1930-welcome').add($content.filter('.d1930-welcome')).each(function() {
            initialize(this);
        });
    });
}());
/* END D1930 WELCOME ANIME */