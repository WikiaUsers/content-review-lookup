/* ======================================
   Universal Fandom-Safe Script Wrapper
   ====================================== */
mw.hook('wikipage.content').add(function($content) {
    // --- Community Hub ---
    const hub = document.getElementById('communityHub');
    const header = document.getElementById('hubToggle');
    if (hub && header) {
        let isDragging = false, startX = 0, startY = 0, offsetX = 0, offsetY = 0;
        hub.style.transition = 'box-shadow 0.25s ease, border-color 0.25s ease';

        header.addEventListener('mouseenter', () => {
            hub.style.boxShadow = '0 0 18px 4px #FFF2B0';
            hub.style.borderColor = '#FFF2B0';
        });
        header.addEventListener('mouseleave', () => {
            if (!isDragging) {
                hub.style.boxShadow = '0 0 12px #D9B55D';
                hub.style.borderColor = '#D9B55D';
            }
        });

        header.addEventListener('mousedown', e => {
            isDragging = true;
            header.style.cursor = 'grabbing';
            hub.style.transition = 'none';
            startX = e.clientX - offsetX;
            startY = e.clientY - offsetY;
            e.preventDefault();
        });

        document.addEventListener('mousemove', e => {
            if (!isDragging) return;
            offsetX = e.clientX - startX;
            offsetY = e.clientY - startY;
            hub.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            header.style.cursor = 'grab';
            if (hub.animate) {
                const anim = hub.animate([
                    { transform: `translate(${offsetX}px, ${offsetY}px) scale(1)` },
                    { transform: `translate(${offsetX}px, ${offsetY}px) scale(1.03)` },
                    { transform: `translate(${offsetX}px, ${offsetY}px) scale(1)` }
                ], { duration: 200, easing: 'ease-out' });
                anim.onfinish = () => {
                    hub.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                    hub.style.transition = 'box-shadow 0.25s ease, border-color 0.25s ease';
                    hub.style.boxShadow = '0 0 12px #D9B55D';
                    hub.style.borderColor = '#D9B55D';
                };
            }
        });
    }

	// --- Community Hub Time Thing ---
	$(document).ready(function() {
  const hubTime = document.getElementById('hubTime');
  if (!hubTime) return;

  function updateTime() {
    const now = new Date();
    const formatted = now.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'long'
    });
    hubTime.textContent = formatted;
  }

  updateTime();
  setInterval(updateTime, 1000);
});

    // --- Idiot Popups ---
    document.querySelectorAll('.idiot-popup').forEach(popup => {
        const title = popup.querySelector('.idiot-title');
        if (!title) return;

        let isDragging = false, startX = 0, startY = 0, offsetX = 0, offsetY = 0;
        popup.style.transform = 'translate(0, 0)';
        popup.style.position = 'absolute';

        title.addEventListener('mousedown', e => {
            isDragging = true;
            title.style.cursor = 'grabbing';
            popup.style.transition = 'none';
            startX = e.clientX - offsetX;
            startY = e.clientY - offsetY;
            e.preventDefault();
        });

        document.addEventListener('mousemove', e => {
            if (!isDragging) return;
            offsetX = e.clientX - startX;
            offsetY = e.clientY - startY;
            popup.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            title.style.cursor = 'grab';
            if (popup.animate) {
                popup.animate([
                    { transform: `translate(${offsetX}px, ${offsetY}px) scale(1)` },
                    { transform: `translate(${offsetX}px, ${offsetY - 8}px) scale(1.08)` },
                    { transform: `translate(${offsetX}px, ${offsetY + 4}px) scale(0.96)` },
                    { transform: `translate(${offsetX}px, ${offsetY}px) scale(1)` }
                ], { duration: 400, easing: 'ease-out' });
            }
        });
    });
/* ======================================
   Featured Article Rotator
   Rotates a featured article every 24h (12AM ET)
   ====================================== */
mw.hook('wikipage.content').add(function($content) {
  if (mw.config.get('wgPageName') !== 'Main_Page') return;

  // Featured article pool
  const featuredArticles = [
    {
      title: '.ChefGaming7540',
      image: 'MinecraftChefIcon.png',
      desc: '.ChefGaming7540 has joined the server'
    },
    {
      title: 'Wonder',
      image: 'WonderIcon2d.png',
      desc: 'We lcome, t o  W ond erl and! !! !!   !'
    },
    {
      title: 'The Nameless Knight',
      image: 'NamelessKnightIcon.png',
      desc: 'Betrayed! Abandoned! Cast to decay... You gave them your soul, and they threw you away. You bled for a crown that never did care; Now silence is all that you`re left to wear.'
    },
      {
      title: 'Robert Somme Bankes',
      image: 'Westernrobbankes.png',
      desc: 'I smell what you`re stepping in. The power in the Chef`s Game Universe is about to change forever. I am the Messiah. I am Chef`s Game Jesus.'
    }
  ];

  // --- Time zone math for EST ---
  const now = new Date();
  // Convert to EST (UTC−5 or UTC−4 with daylight saving)
  const estOffset = now.getTimezoneOffset() + 300; // convert minutes to EST
  const estDate = new Date(now.getTime() + estOffset * 60000);

  // Determine which article to show (changes daily at midnight EST)
  const dayIndex = Math.floor(estDate / 86400000) % featuredArticles.length;
  const article = featuredArticles[dayIndex];

  // Create the box dynamically
  const box = `
  <div class="featured-article">
    <div class="fa-header">Featured Article</div>
    <div class="fa-divider"></div>
    <div class="fa-flex">
      <div class="fa-overview">
        <span class="fa-section">Overview</span><br><br>
        <strong>[[${article.title}]]</strong><br><br>
        ${article.desc}
      </div>
      <div class="fa-image">
        [[File:${article.image}|250px]]
      </div>
    </div>
    <div class="fa-divider"></div>
  </div>`;

  // Insert it wherever you want (example: top of the page)
  $content.find('#mw-content-text').prepend(box);
});


// --- Sword of Corruption floating notices ---
if (mw.config.get('wgPageName') === 'Sword_of_Corruption') {
    const username = mw.config.get('wgUserName') || 'Chaosborn';
    const messages = [
        "MUAHAHAEHEAHAAH",
        `Hello, <span class="InputUsername">${username}</span>.`,
        "GET F*^&KED!",
        "The Wiki editors won't like this.",
        "Y'know, all demons only asked questions.",
        "I had a great friend in a third-dimensional world; he was a weird triangle.",
        `Uh oh! Bad decision, <span class="InputUsername">${username}</span>!`,
        "I dunno about you, but I kinda wanna kill people with hammers.",
        "Connection terminated. I'm sorry to interrupt you... Wait, wrong franchise.",
        "WHERE IS THE LAMB SAUCE?!!?",
        "Why is Wonder the one who's got the most pictures?",
        "Have you ever been hit with a wrench before?",
        "As the mighty Father John from The Unholy Trinity once said, 'A gun With one Bullet'.",
        "Panic! In-static! Out-manic.",
        "Don't you find it all romantic, the way things used to be?",
        "Classic, ecstatic, it's magic to trip the light fantastic, repeat it after me!",
        "Thank you, I'll say goodbye soon... Though, it's the end of the world. Don't blame yourself, now.",
        "One must imagine how horrible the world may be.",
        "I'm trying to save you from yourselves! Let me do that!",
        "There's nothing more to me. So please, stop looking.",
        "Have you ever eaten a depressed person before?",
        "You HAVE to take the cooling system out of the DeLorean, dude! That's the only rule!",
        "Doctor Wily ain't got sh*t on me!",
        "BACK TO THE FUTURE PART III!",
        "I have a very good friend, he's a cool triangle. △",
        "It's super illegal to say ''I want to kill the President of the United States of America''.",
        "I'm afraid of Americans, I'm afraid of the world!",
        "I'm so happy cuse today I've found my friends, they're in my head",
        "I'm so ugly, that's okay! Cause so are you!",
        "Broke our mirrors.",
        "'Cause I've found God.",
        "YEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH",
        "YAYYYYYEYYYAY YAAAAAAAH",
        "Skibidi Sigma",
        "gernig",
        "Smells like teen spirit.",
        "Come as you are, are you were,as I want you to be.",
        "A child, a child! He shivers in  the cold! Let us bring him silver and gold!",
        "HOW ABOUT A BLANKET?!?!?!?!",
        "Hello, hello, hello, hello, how low.",
        "*Opening to Johnny B. Goode*",
        "''Not S + P approved'' has been approved by the S + P."
    ];

    const images = [
        'https://static.wikia.nocookie.net/varandia/images/e/ef/ChaosIcon.png/revision/latest/scale-to-width-down/240?cb=20250602113959',
        'https://static.wikia.nocookie.net/varandia/images/3/39/WonderLaugh.gif/revision/latest/scale-to-width-down/185?cb=20251005190823',
        'https://static.wikia.nocookie.net/varandia/images/9/9c/WIP2d.png/revision/latest/scale-to-width-down/65?cb=20251001165921',
        'https://static.wikia.nocookie.net/varandia/images/e/e9/CourierIcon2d.png/revision/latest/scale-to-width-down/185?cb=20251027223750',
        'https://static.wikia.nocookie.net/varandia/images/e/e6/Site-logo.png/revision/latest?cb=20251028143900'
    ];

    const notices = [];     // text notices
    const imagesList = [];  // image notices
    const maxSpeed = 1.2;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function randomColor() {
        return `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
    }

    function spawnNotice() {
        const isImage = Math.random() < 0.3; // 30% chance for image

        if (isImage && images.length > 0) {
            // --- IMAGE SPAWN ---
            const img = document.createElement('img');
            img.src = images[Math.floor(Math.random() * images.length)];
            img.style.width = `${50 + Math.random() * 80}px`;
            img.style.height = 'auto';
            Object.assign(img.style, {
                position: 'fixed',
                left: `${Math.random() * (window.innerWidth - 100)}px`,  // random X
                top: `${Math.random() * (window.innerHeight - 100)}px`, // random Y
                opacity: 0,
                zIndex: 9999,
                pointerEvents: 'none',
                transformOrigin: 'center',
                transition: `opacity ${0.5 + Math.random()}s ease`
            });

            document.body.appendChild(img);

            img.angle = Math.random() * 360;
            img.spinSpeed = (Math.random() * 3) + 1; // 1-4 deg/frame

            // Fade in
            setTimeout(() => img.style.opacity = 0.7 + Math.random() * 0.3, 50);

            imagesList.push(img);

            // Fade out after 8s
            setTimeout(() => {
                img.style.opacity = 0;
                setTimeout(() => img.remove(), 2000);
            }, 8000);

        } else {
            // --- TEXT SPAWN ---
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

            const w = notice.offsetWidth;
            const h = notice.offsetHeight;
            notice.x = mouseX - w / 2;
            notice.y = mouseY - h / 2;
            notice.vx = (Math.random() - 0.5) * maxSpeed;
            notice.vy = (Math.random() - 0.5) * maxSpeed;
            notice.phaseX = Math.random() * Math.PI * 2;
            notice.phaseY = Math.random() * Math.PI * 2;

            notice.style.left = notice.x + 'px';
            notice.style.top = notice.y + 'px';
            requestAnimationFrame(() => notice.style.opacity = 0.95);

            notices.push(notice);

            // Fade out after 8s
            setTimeout(() => {
                notice.style.opacity = 0;
                setTimeout(() => notice.remove(), 2000);
            }, 8000);
        }
    }

    function animate() {
        // TEXT: drift + bounce
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

        // IMAGES: spin only
        imagesList.forEach(img => {
            img.angle += img.spinSpeed;
            img.style.transform = `rotate(${img.angle}deg)`;
        });

        requestAnimationFrame(animate);
    }

    setInterval(spawnNotice, 2000); // spawn every 2s
    animate();
}
});