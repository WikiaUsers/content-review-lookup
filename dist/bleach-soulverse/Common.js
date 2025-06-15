mw.loader.using('jquery', function() {
  $(function() {
    var tracks = [
      { title: "Treachery", url: "https://dn720305.ca.archive.org/0/items/bleach-ost_202205/BLEACH%20OST/02.%20Diamond%20Dust%20Rebellion/24.%20Treachery.mp3" },
      { title: "Number One", url: "https://dn720305.ca.archive.org/0/items/bleach-ost_202205/BLEACH%20OST/Number%20One%20%28TYBW%29.mp3" },
      { title: "Blaze of the Soul Reaper", url: "https://dn720305.ca.archive.org/0/items/bleach-ost_202205/BLEACH%20OST/Bleach%20Original%20Soundtrack%201/17.%20Blaze%20of%20the%20Soul%20Reaper.mp3" },
      { title: "On the Precipice of Defeat", url: "https://dn720305.ca.archive.org/0/items/bleach-ost_202205/BLEACH%20OST/Bleach%20Original%20Soundtrack%201/01.%20On%20the%20Precipice%20of%20Defeat.mp3" },
      { title: "Battle Ignition", url: "https://dn720305.ca.archive.org/0/items/bleach-ost_202205/BLEACH%20OST/Bleach%20Original%20Soundtrack%201/18.%20Battle%20Ignition.mp3" },
      { title: "Asterik", url: "https://dn720305.ca.archive.org/0/items/bleach-ost_202205/BLEACH%20OST/Bleach%20Original%20Soundtrack%201/02.%20Asterisk%28OST%20version%29.mp3" },
      { title: "Heat of the Battle", url: "https://dn720305.ca.archive.org/0/items/bleach-ost_202205/BLEACH%20OST/Bleach%20Original%20Soundtrack%201/02.%20Asterisk%28OST%20version%29.mp3" },
      { title: "Velonica", url: "https://ia600709.us.archive.org/20/items/bleach-op-9-velonica-mp-3.mp3/Bleach_OP_9_-_Velonica_%28mp3.pm%29.mp3" },
      
    ]; 

    var currentTrack = 0;
    var audio = new Audio(tracks[currentTrack].url);
    audio.loop = false;

    var $btnPlayPause = $('<button>', {
      text: '▶️ Play ' + tracks[currentTrack].title,
      id: 'music-btn',
      css: {
        position: 'fixed',
        bottom: '60px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#1DB954',
        color: '#fff',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        fontSize: '16px',
        zIndex: 9999,
      },
      click: function() {
        if (audio.paused) {
          audio.play();
          $(this).text('⏸️ Pause ' + tracks[currentTrack].title);
        } else {
          audio.pause();
          $(this).text('▶️ Play ' + tracks[currentTrack].title);
        }
      }
    });

    var $btnNext = $('<button>', {
      text: 'Next ➡️',
      id: 'music-btn-next',
      css: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#1DB954',
        color: '#fff',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        fontSize: '16px',
        zIndex: 9999,
        marginLeft: '10px',
      },
      click: function() {
        audio.pause();
        currentTrack = (currentTrack + 1) % tracks.length;
        audio.src = tracks[currentTrack].url;
        audio.play();
        $btnPlayPause.text('⏸️ Pause ' + tracks[currentTrack].title);
      }
    });

    $('body').append($btnPlayPause, $btnNext);

    audio.addEventListener('ended', function() {
      $btnNext.click();
    });
  });
});