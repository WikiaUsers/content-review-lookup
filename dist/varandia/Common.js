// Community Hub Drag & Glow
(function() {
    const hub = document.getElementById('communityHub');
    const header = document.getElementById('hubToggle');
    if (!hub || !header) return;

    let isDragging = false;
    let startX = 0, startY = 0;
    let translateX = 0, translateY = 0;

    // Hover glow
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

    // Drag start
    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        header.style.cursor = 'grabbing';
        hub.style.transition = 'none';
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        e.preventDefault();
    });

    // Drag move
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        hub.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });

    // Drag stop
    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        header.style.cursor = 'grab';

        // Smooth small bounce
        hub.animate([
            { transform: `translate(${translateX}px, ${translateY}px) scale(1)` },
            { transform: `translate(${translateX}px, ${translateY}px) scale(1.03)` },
            { transform: `translate(${translateX}px, ${translateY}px) scale(1)` }
        ], {
            duration: 200,
            easing: 'ease-out'
        });

        // Restore glow
        hub.style.transition = 'box-shadow 0.25s ease, border-color 0.25s ease';
        hub.style.boxShadow = '0 0 12px #D9B55D';
        hub.style.borderColor = '#D9B55D';
    });

    // Smooth glide back on page refresh
    window.addEventListener('beforeunload', () => {
        hub.style.transition = 'transform 0.4s ease-in-out';
        hub.style.transform = 'translate(0, 0)';
    });
})();

// Idiot Popups: Retro 80s Drag & Choppy Bounce
window.addEventListener('load', () => {
    const popups = document.querySelectorAll('.idiot-popup');
    if (!popups.length) return;

    popups.forEach((popup, index) => {
        const title = popup.querySelector('#idiot-title');
        if (!title) return;

        let isDragging = false;
        let startX = 0, startY = 0;
        let translateX = 0, translateY = 0;

        // Initialize transform and default position
        popup.style.transform = 'translate(0px, 0px)';
        if (!popup.style.top || popup.style.top === 'auto') popup.style.top = '100px';
        if (!popup.style.left || popup.style.left === 'auto') popup.style.left = '50px';

        // Restore saved position if any
        const savedPos = JSON.parse(localStorage.getItem('idiotPopupPos_' + index));
        if (savedPos) {
            translateX = savedPos.x;
            translateY = savedPos.y;
            popup.style.transform = `translate(${translateX}px, ${translateY}px)`;
        }

        // Drag start
        title.addEventListener('mousedown', (e) => {
            isDragging = true;
            title.style.cursor = 'grabbing';
            popup.style.transition = 'none';
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            e.preventDefault();
        });

        // Drag move
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            popup.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });

        // Drag stop
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            title.style.cursor = 'grab';

            // Choppy 80s-style bounce
            popup.animate([
                { transform: `translate(${translateX}px, ${translateY}px) scale(1)` },
                { transform: `translate(${translateX}px, ${translateY - 12}px) scale(1.1)` },
                { transform: `translate(${translateX}px, ${translateY + 8}px) scale(0.95)` },
                { transform: `translate(${translateX}px, ${translateY}px) scale(1)` }
            ], {
                duration: 400,
                easing: 'steps(4, jump-none)'
            });

            // Save position
            localStorage.setItem('idiotPopupPos_' + index, JSON.stringify({ x: translateX, y: translateY }));

            // Re-enable transition for future glides
            popup.style.transition = 'transform 0.25s ease-out';
        });

        // Smooth glide back on page refresh
        window.addEventListener('beforeunload', () => {
            popup.style.transition = 'transform 0.5s cubic-bezier(0.22, 1.61, 0.36, 1)';
            popup.style.transform = 'translate(0px, 0px)';
        });
    });
});