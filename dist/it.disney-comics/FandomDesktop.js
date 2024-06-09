  // Funzione per aggiungere l'iframe dinamicamente
    function addInstagramEmbed() {
      var div = document.querySelector('.instagramembed');
      if (div) {
        div.style.display = 'block'; // Mostra il div
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.instagram.com/paperpediawikiofficial/embed';
        iframe.width = '';
        iframe.height = '400';
        iframe.frameBorder = '0';
        iframe.style.overflow = 'auto'; // Abilita lo scrolling
        div.appendChild(iframe); // Aggiungi l'iframe al div
      }
    }

    // Esempio di aggiunta della classe e chiamata alla funzione
    var div = document.querySelector('.instagramembed');
    if (div) {
      div.classList.add('instagramembed');
      addInstagramEmbed();
    }