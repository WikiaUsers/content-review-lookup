/* Button Handler */
document.querySelectorAll('.achievements-toggle').forEach(container => {
    const btn = container.querySelector('.toggle-btn');
    const tables = container.querySelectorAll('.achievements-table');
    const wave = tables[0];
    const comp = tables[1];

    btn.addEventListener('click', () => {
        if (wave.style.display === 'none') {
            wave.style.display = 'block';
            comp.style.display = 'none';
            btn.innerText = 'Wave Achievements';
        } else {
            wave.style.display = 'none';
            comp.style.display = 'block';
            btn.innerText = 'Completion Achievements';
        }
    });

    // Hide completion table by default (in case CSS fails)
    comp.style.display = 'none';
});