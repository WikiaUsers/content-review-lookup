let timeout;

function createPrompt() {
    let modal = document.createElement('div');
    modal.id = 'inactivityModal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.zIndex = '800';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';

    let prompt = document.createElement('div');
    prompt.id = 'inactivityPrompt';
    prompt.style.position = 'fixed';
    prompt.style.top = '50%';
    prompt.style.left = '50%';
    prompt.style.transform = 'translate(-50%, -50%)';
    prompt.style.padding = '20px';
    prompt.style.backgroundColor = 'var(--theme-page-background-color)';
    prompt.style.border = '1.5px solid var(--theme-accent-color)';
    prompt.style.borderRadius = '10px';
    prompt.style.display = 'flex';
    prompt.style.alignItems = 'center';
    prompt.style.zIndex = '800';
    prompt.style.animation = 'searchModalSlideIn .2s';
    
    let img = document.createElement('img');
    img.src = 'https://static.wikia.nocookie.net/xorumian-things/images/2/22/Heinrych.png/revision/latest/scale-to-width-down/1000?cb=20241007193623&path-prefix=de';
    img.style.marginRight = '0';
    img.style.width = '500px';
    img.style.height = '500px';
    img.style.borderRadius = '0';
    
    let text = document.createElement('span');
    text.innerText = 'Du hast deine Maus schon lange nicht mehr bewegt, weswegen wir uns fragen: Bist du inzwischen verstorben?';
    text.style.color = 'var(--theme-page-text-color)';
    text.style.fontSize = '35px';
    text.style.marginRight = '50px';
    
    prompt.appendChild(img);
    prompt.appendChild(text);
    modal.appendChild(prompt);
    document.body.appendChild(modal);
    
    // ::before Pseudo-Element hinzufügen
    let style = document.createElement('style');
    style.innerHTML = `
        #inactivityModal::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            backdrop-filter: blur(20px);
            z-index: 799;
            animation: searchOverlayFadeIn .2s;
        }
    `;
    document.head.appendChild(style);
}

function showPrompt() {
    let modal = document.getElementById('inactivityModal');
    if (!modal) {
        createPrompt();
    } else {
        modal.style.display = 'flex';
    }
}

function hidePrompt() {
    let modal = document.getElementById('inactivityModal');
    if (modal) {
        modal.style.display = 'none';
    }
    resetTimer();
}

function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(showPrompt, 5000); // 5 Sekunden
}

document.onmousemove = hidePrompt;

resetTimer(); // Timer beim Laden der Seite starten