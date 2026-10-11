/* Any JavaScript here will be loaded for all users on every page load. */
/* Interactive Liquid Glass Effect Script */
mw.hook('wikipage.content').add(function($content) {
    const glassCards = $content[0].querySelectorAll('.liquid-glass-card');
    
    glassCards.forEach(card => {
        // Track mouse movement for specular sheen
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        // Add fluid click ripple effect
        card.addEventListener('click', (e) => {
            const rect = card.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'glass-ripple';
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            
            card.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
});