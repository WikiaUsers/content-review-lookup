// Operation Name text.JS
const messages = [
    "OPERATION “THUNDER STORM“",
    "OPERATION “DARK TORNADO“",
    // Names
];

function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
}

function startTypingAnimation() {
    const element = document.getElementById('typing-text');
    if (!element) return;
    
    const message = getRandomMessage();
    element.innerHTML = '';
    
    const span = document.createElement('span');
    span.textContent = message;
    span.className = 'typing-animation';
    span.style.display = 'inline-block';
    span.style.overflow = 'hidden';
    span.style.whiteSpace = 'nowrap';
    span.style.verticalAlign = 'bottom';
    span.style.animation = `typing ${message.length * 0.2}s steps(${message.length}, end)`;
    
    element.appendChild(span);
}

window.addEventListener('load', startTypingAnimation);