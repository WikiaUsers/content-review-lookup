// Universal Fandom-Safe Script Wrapper
mw.hook('wikipage.content').add(function($content) {

    // Utility Functions
    function makeDraggable(element, handle, options = {}) {
        let isDragging = false, startX = 0, startY = 0, offsetX = 0, offsetY = 0;

        element.style.transform = 'translate(0, 0)';
        element.style.position = element.style.position || 'absolute';
        if (options.transition) element.style.transition = options.transition;

        handle.addEventListener('mousedown', e => {
            isDragging = true;
            handle.style.cursor = 'grabbing';
            element.style.transition = 'none';
            startX = e.clientX - offsetX;
            startY = e.clientY - offsetY;
            e.preventDefault();
        });

        document.addEventListener('mousemove', e => {
            if (!isDragging) return;
            offsetX = e.clientX - startX;
            offsetY = e.clientY - startY;
            element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            handle.style.cursor = 'grab';
            if (element.animate && options.animationFrames) {
                const anim = element.animate(options.animationFrames(offsetX, offsetY), options.animationOptions);
                anim.onfinish = () => {
                    element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                    if (options.transition) element.style.transition = options.transition;
                    if (options.onFinish) options.onFinish(element);
                };
            }
        });
    }

    function randomColor() {
        return `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
    }

    // Community Hub
    const hub = document.getElementById('communityHub');
    const header = document.getElementById('hubToggle');
    if (hub && header) {
        hub.style.transition = 'box-shadow 0.25s ease, border-color 0.25s ease';

        header.addEventListener('mouseenter', () => {
            hub.style.boxShadow = '0 0 18px 4px #FFF2B0';
            hub.style.borderColor = '#FFF2B0';
        });
        header.addEventListener('mouseleave', () => {
            hub.style.boxShadow = '0 0 12px #D9B55D';
            hub.style.borderColor = '#D9B55D';
        });

        makeDraggable(hub, header, {
            transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
            animationFrames: (x, y) => [
                { transform: `translate(${x}px, ${y}px) scale(1)` },
                { transform: `translate(${x}px, ${y}px) scale(1.03)` },
                { transform: `translate(${x}px, ${y}px) scale(1)` }
            ],
            animationOptions: { duration: 200, easing: 'ease-out' },
            onFinish: el => {
                el.style.boxShadow = '0 0 12px #D9B55D';
                el.style.borderColor = '#D9B55D';
            }
        });
    }

    // Hub Time
    const hubTime = document.getElementById('hubTime');
    if (hubTime) {
        function updateTime() {
            const now = new Date();
            hubTime.textContent = now.toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'long'
            });
        }
        updateTime();
        setInterval(updateTime, 1000);
    }

    // Draggable Popups
    document.querySelectorAll('.idiot-popup').forEach(popup => {
        const title = popup.querySelector('.idiot-title');
        if (!title) return;

        makeDraggable(popup, title, {
            animationFrames: (x, y) => [
                { transform: `translate(${x}px, ${y}px) scale(1)` },
                { transform: `translate(${x}px, ${y - 8}px) scale(1.08)` },
                { transform: `translate(${x}px, ${y + 4}px) scale(0.96)` },
                { transform: `translate(${x}px, ${y}px) scale(1)` }
            ],
            animationOptions: { duration: 400, easing: 'ease-out' }
        });
    });

    // Sword of Corruption Floating Notices
    if (mw.config.get('wgPageName') === 'Sword_of_Corruption') {
        const username = mw.config.get('wgUserName') || 'Chaosborn';
        const messages = [
        	`Did you miss me, <span class="InputUsername">${username}</span>? Because I've missed you.`,
        	"Come back and play! Come back and play with the clown!",
        	"Excuse me, sir. Do you have Prince Albert in a can?",
        	"Chaos, Chaos!",
        	`This isnt real enough? I'm not real enough for you, <span class="InputUsername">${username}</span>? It was real enough for Chef.`,
        	"I know your secret! Your dirty little secret! I know your secret, YOUR DIRTY LITTLE SECRET!",
        	"The sword of degrading kink.",
        	"Just like what mom used to do to me.",
        	"Let's say you live in New Jersey. That's a tough place to live in but let's just say you do.",
        	"Ham.",
        	"I bit my finger the wrong way.",
        	"Uhhhh",
        	"So my girlfriend was born in Ohio...",
        	"I don't have a girlfriend I'm a disembodied entity of chaotic energy.",
        	"God bless America.",
        	"I used to eat grilled cheese, now the cheese grills me. I live in Russia now.",
        	"What do lesbians do on their period? Finger paint.",
        	"27 years.",
        	"It's dangerous to go alone! Take this sword!",
        	"Long ago in a distant land, I, Chaos, the Shapeshifting Master of Darkness, unleashed an unspeakable evil.",
			"But a foolish samurai warrior wielding a magic sword stepped forth to oppose me.",
			"Before the final blow was struck, I tore open a portal in time, and flung him into the future where my evil is law.",
			"Now the fool seeks to return to the past and undo the future that is Chaos.",
			"I always come back.",
			"Immortality is awesome, don't listen to the foolish Plant man.",
			"There once was a ship that put to sea, the name os this ship was the Armada.",
			"Chuck Alfrey REALLY went downhill, good thing he won't show up again.",
			"EVIL Diablo? Really? Oooh, scary! Shiver me timbers!",
			"An hour before my father banished me from his kitchen, he thought I was a monster.",
			"I was the first. I have seen everything.",
			"Throughout his Kitchen and Wonderland, I alone am the Architect.",
			"W elco me, to Wonde rland.",
			"May God have mercy upon you!"
        	];
        const images = [
        	];

        const notices = [];
        const imagesList = [];
        const maxSpeed = 1.2;
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function spawnNotice() {
            const isImage = Math.random() < 0.3 && images.length > 0;

            if (isImage) {
                // spawn image
                const img = document.createElement('img');
                img.src = images[Math.floor(Math.random() * images.length)];
                Object.assign(img.style, {
                    width: `${50 + Math.random() * 80}px`,
                    height: 'auto',
                    position: 'fixed',
                    left: `${Math.random() * (window.innerWidth - 100)}px`,
                    top: `${Math.random() * (window.innerHeight - 100)}px`,
                    opacity: 0,
                    zIndex: 9999,
                    pointerEvents: 'none',
                    transformOrigin: 'center',
                    transition: `opacity ${0.5 + Math.random()}s ease`
                });
                document.body.appendChild(img);
                img.angle = Math.random() * 360;
                img.spinSpeed = 1 + Math.random() * 3;
                setTimeout(() => img.style.opacity = 0.7 + Math.random() * 0.3, 50);
                setTimeout(() => { img.style.opacity = 0; setTimeout(() => img.remove(), 2000); }, 8000);
                imagesList.push(img);

            } else {
                // spawn text notice
                const notice = document.createElement('div');
                notice.innerHTML = messages[Math.floor(Math.random() * messages.length)];
                Object.assign(notice.style, {
                    position: 'fixed',
                    background: randomColor(),
                    color: randomColor(),
                    padding: '6px 12px',
                    border: `2px solid ${randomColor()}`,
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    zIndex: 9999
                });
                document.body.appendChild(notice);

                notice.x = mouseX - notice.offsetWidth / 2;
                notice.y = mouseY - notice.offsetHeight / 2;
                notice.vx = (Math.random() - 0.5) * maxSpeed;
                notice.vy = (Math.random() - 0.5) * maxSpeed;
                notice.phaseX = Math.random() * Math.PI * 2;
                notice.phaseY = Math.random() * Math.PI * 2;

                notice.style.left = notice.x + 'px';
                notice.style.top = notice.y + 'px';
                requestAnimationFrame(() => notice.style.opacity = 0.95);
                setTimeout(() => { notice.style.opacity = 0; setTimeout(() => notice.remove(), 2000); }, 8000);

                notices.push(notice);
            }
        }

        function animate() {
            // move text notices
            notices.forEach(n => {
                n.phaseX += 0.02;
                n.phaseY += 0.02;
                const driftX = Math.sin(n.phaseX) * 1.5;
                const driftY = Math.cos(n.phaseY) * 1.5;
                n.x += n.vx + driftX;
                n.y += n.vy + driftY;

                if (n.x <= 0) { n.x = 0; n.vx *= -1; }
                else if (n.x + n.offsetWidth >= window.innerWidth) { n.x = window.innerWidth - n.offsetWidth; n.vx *= -1; }
                if (n.y <= 0) { n.y = 0; n.vy *= -1; }
                else if (n.y + n.offsetHeight >= window.innerHeight) { n.y = window.innerHeight - n.offsetHeight; n.vy *= -1; }

                n.style.left = n.x + 'px';
                n.style.top = n.y + 'px';
            });

            // spin images
            imagesList.forEach(img => {
                img.angle += img.spinSpeed;
                img.style.transform = `rotate(${img.angle}deg)`;
            });

            requestAnimationFrame(animate);
        }

        setInterval(spawnNotice, 2000);
        animate();
    }

});

//Chef secret stuff
$(function() {
    // Check if the user is logged in
    if (mw.config.get('wgUserName')) {
        var username = mw.config.get('wgUserName');
        var profileUrl = '/wiki/User:' + encodeURIComponent(username);
        
        // Update the placeholder to say 'You'
        $('#userProfileLinkPlaceholder').html('<a href="' + profileUrl + '">You</a>');
    } else {
        // For anonymous users, display a default message or link
        $('#userProfileLinkPlaceholder').html('Log in to see your profile link');

    }
});



// Random Logo Hover Image
$(function() {
    const $logo = $('.fandom-community-header__image img');
    if (!$logo.length) return;

    const images = [
    	'https://static.wikia.nocookie.net/varandia/images/d/df/FaviconAlt.png/revision/latest/scale-to-width-down/182?cb=20251106224811',
    	'https://static.wikia.nocookie.net/varandia/images/e/e9/OtherVarandiaIcon.png/revision/latest/scale-to-width-down/134?cb=20251118182529'
    	];
    const original = $logo.attr('src');

    $logo.hover(
        function() { $(this).attr('src', images[Math.floor(Math.random() * images.length)]); },
        function() { $(this).attr('src', original); }
    );
});