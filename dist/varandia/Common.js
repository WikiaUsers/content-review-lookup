$(function() {
  const popup = document.getElementById('idiot-popup');
  const playBtn = document.getElementById('play-btn');

  if (!popup || !playBtn) return;

  // Grab the HTML5 audio div
  const audioDiv = popup.querySelector('.html5audio');
  if (!audioDiv) return;

  const audio = new Audio(audioDiv.dataset.file);
  audio.loop = true;
  audio.preload = 'auto';

  let playing = false;

  // Try autoplay immediately; fallback on first click
  audio.play().catch(() => {
    const resume = () => { audio.play(); document.removeEventListener('click', resume); };
    document.addEventListener('click', resume);
  });

  // Toggle play/pause when clicking the Play button
  playBtn.addEventListener('click', () => {
    if (!playing) {
      audio.play().catch(() => {});
      playBtn.querySelector('span').textContent = 'Pause Audio';
      playing = true;
    } else {
      audio.pause();
      playBtn.querySelector('span').textContent = 'Play Audio';
      playing = false;
    }
  });

  // Make the popup draggable by the title bar (first div inside popup)
  let dragging = false, offsetX, offsetY;
  const titleBar = popup.querySelector('div'); // title bar = first div
  titleBar.addEventListener('mousedown', (e) => {
    dragging = true;
    const rect = popup.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', () => {
      dragging = false;
      document.removeEventListener('mousemove', drag);
    });
  });

  function drag(e) {
    if (dragging) {
      popup.style.left = `${e.clientX - offsetX}px`;
      popup.style.top = `${e.clientY - offsetY}px`;
    }
  }
});