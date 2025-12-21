// The css used for this feature can be found in MediaWiki:UweInactivityWindow.css

let timeout;

function createPrompt() {
    let modal = document.createElement('div');
    modal.className = 'inactivity-modal'; 
    modal.style.display = 'flex';

    let prompt = document.createElement('div');
    prompt.className = 'inactivity-prompt';

    let img = document.createElement('img');
    img.src = 'https://static.wikia.nocookie.net/xorumian-things/images/2/22/Heinrych.png/revision/latest/scale-to-width-down/1000?path-prefix=de';

    let text1 = document.createElement('span');
    text1.innerText = 'You haven\'t moved your mouse for at least fifteen minutes. That got us wondering:';

    let text2 = document.createElement('span');
    text2.innerText = 'Are you still alive?';

    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    let yesButton = document.createElement('button');
    yesButton.innerText = 'Yes';
    yesButton.className = 'wds-button';
    yesButton.onclick = hidePrompt;

    let noButton = document.createElement('button');
    noButton.innerText = 'No';
    noButton.className = 'wds-button';

    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);

    prompt.appendChild(img);
    prompt.appendChild(text1);
    prompt.appendChild(text2);
    prompt.appendChild(buttonContainer);
    modal.appendChild(prompt);
    document.body.appendChild(modal);
    
    // Add ::before pseudo-element 
    let style = document.createElement('style');
    style.innerHTML = `
        .inactivity-modal::before {
        content: "";
        }
    `;
    document.head.appendChild(style);
}

function showPrompt() {
    let modal = document.querySelector('.inactivity-modal');
    if (!modal) {
        createPrompt();
    } else {
        modal.style.display = 'flex';
    }
}

function hidePrompt() {
    let modal = document.querySelector('.inactivity-modal');
    if (modal) {
        modal.style.display = 'none';
    }
    resetTimer();
}

function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(showPrompt, 900000); // 15 minutes till summoning of Heinrych
}

document.onmousemove = resetTimer; // Reset timer on mouse movement

document.onkeydown = function(event) {
    if (event.key === 'φ') { // Window also appears if key 'ø' is pressed
        showPrompt();
    }
};

resetTimer(); // Start timer when site loads