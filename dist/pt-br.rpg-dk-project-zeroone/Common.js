document.addEventListener('DOMContentLoaded', function() {
  var tabs = document.querySelectorAll('.JJK-tab1, .JJK-tab2');
  var contents = document.querySelectorAll('.tab-content');

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var id = this.textContent.trim();  // Get the name of the tab

      // Se a aba � "Perfil", redireciona para a p�gina principal do personagem
      if (id === 'Perfil') {
        var basePageName = window.location.pathname.split('/')[2]; // Pega o nome base da p�gina
        window.location.href = '/wiki/' + basePageName; // Redireciona para a p�gina principal
        return;
      }

      // Remove a classe 'active' de todas as abas e conte�dos
      tabs.forEach(function(innerTab) {
        innerTab.classList.remove('active');
      });
      contents.forEach(function(content) {
        content.classList.remove('active');
      });

      // Adiciona a classe 'active' � aba clicada e ao conte�do correspondente
      this.classList.add('active');
      var activeContent = document.getElementById(id);
      activeContent.classList.add('active');

      // Busca o conte�do usando a API do MediaWiki
      var apiUrl = '/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=' + id;
      fetch(apiUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var page = data.query.pages[0];
          if (page && page.revisions && page.revisions.length > 0) {
            activeContent.innerHTML = page.revisions[0]['*'];
          }
        })
        .catch(function(error) {
          console.error('Error fetching data:', error);
        });
    });
  });
});