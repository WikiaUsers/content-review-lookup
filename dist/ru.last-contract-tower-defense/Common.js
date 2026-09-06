/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
document.addEventListener('DOMContentLoaded', function() {
    var terminal = document.querySelector('.lctd-terminal');
    if (!terminal) return;

    // Срабатывает один раз за сессию — не переигрывает при каждом переходе на главную
    if (sessionStorage.getItem('lctd_terminal_played')) return;

    var fullText = terminal.textContent;
    terminal.textContent = '';

    var i = 0;
    var speed = 30; // мс между символами, можно подстроить под вкус

    function typeChar() {
        if (i < fullText.length) {
            terminal.textContent += fullText.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        } else {
            sessionStorage.setItem('lctd_terminal_played', '1');
        }
    }

    typeChar();
});