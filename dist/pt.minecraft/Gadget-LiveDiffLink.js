// Feito por: http://terraria.gamepedia.com/User:Equazcion
// Tradução por: https://minecraft-pt.gamepedia.com/Usu%C3%A1rio:Eduaddad

if (wgAction == 'history') {   // Não faz nada se não estiver na página do histórico de versões.

// Exibe o botão comparar, que cria um link vazio após cada versão que não está selecionada
   var submitButton = $('.mw-history-compareselectedversions-button:submit');
   submitButton.after("<a class='diffURL' style='border:#999 1px dashed; padding:2px 4px 2px 4px;'></a>");
   var displayDiffField = $('.diffURL');

// Exibe a versão original.
   var displayDiffNew = $('[name="diff"]:checked').slice(0,1).attr('value');
   var displayDiffOld = $('[name="oldid"]:checked').slice(0,1).attr('value');

// Coloca o link principal original na forma de uma URL, texto e dica de ferramenta e adiciona uma seta entre o botão comparar e o link
   displayDiffField.text("http://minecraft-pt.gamepedia.com/index.php?title=" + wgPageName + "&diff=" + displayDiffNew + "&oldid=" + displayDiffOld);
   displayDiffField.attr("href", "http://minecraft-pt.gamepedia.com/w/index.php?title=" + wgPageName + "&diff=" + displayDiffNew + "&oldid=" + displayDiffOld);
   displayDiffField.attr('title', 'http://minecraft-pt.gamepedia.com/w/index.php?title=' + wgPageName + '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld);
   displayDiffField.before("<b> → </b>");

// Exibe o tamanho da versão
   var displayDiffSizeNew = $('[name="diff"]:checked').slice(0,1).parent('li').find('.history-size');
   var displayDiffSizeOld = $('[name="oldid"]:checked').slice(0,1).parent('li').find('.history-size');

// Adiciona um link para diferenças de versão antes do tamanho da versão original. Usar tag dentro do link <span>, que permite retornar ao texto adicionado recentemente usando sua própria classe.
   var displayDiffMobileNew = displayDiffSizeNew.before('<span class="historyDiffLink">(<a href="http://minecraft-pt.gamepedia.com/index.php?title=' + wgPageName + 
                              '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld + '">diferente.</a>‎) . . </span>');
   var displayDiffMobileOld = displayDiffSizeOld.before('<span class="historyDiffLink">(<a href="http://minecraft-pt.gamepedia.com/w/index.php?title=' + wgPageName + 
                              '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld + '">diferente.</a>‎) . . </span>');

// Define a dica de ferramenta para vincular o tamanho da página à diferença de versão
   $('.historyDiffLink').find('a').attr('title', 'http://minecraft-pt.gamepedia.com/w/index.php?title=' + wgPageName + '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld);

// Define a função de clique para os comutadores
   $(":radio").click(function(){   

   // Limpa as referências de tamanho de versão existentes
      $('.historyDiffLink').remove();

   // Exibe versões selecionadas, coloca em variáveis apropriadas
      if ($(this).attr('name') == 'oldid') displayDiffOld = $(this).attr('value');
      if ($(this).attr('name') == 'diff') displayDiffNew = $(this).attr('value');

   // Atualiza o link para a versão principal do URL, texto e dica de ferramenta
      displayDiffField.attr("href", "http://minecraft-pt.gamepedia.com/index.php?title=" + wgPageName + "&diff=" + displayDiffNew + "&oldid=" + displayDiffOld);
      displayDiffField.text("http://minecraft-ru.gamepedia.com/index.php?title=" + wgPageName + "&diff=" + displayDiffNew + "&oldid=" + displayDiffOld);
      displayDiffField.attr('title', 'http://minecraft-pt.gamepedia.com/index.php?title=' + wgPageName + '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld);

   // Exibe novos tamanhos de comparação de versão
      displayDiffSizeNew = $('[name="diff"]:checked').slice(0,1).parent('li').find('.history-size');
      displayDiffSizeOld = $('[name="oldid"]:checked').slice(0,1).parent('li').find('.history-size');

   // Adiciona um link para a diferença de versão antes dos tamanhos
      var displayDiffMobileNew = displayDiffSizeNew.before('<span class="historyDiffLink">(<a href="http://minecraft-pt.gamepedia.com/index.php?title=' + wgPageName + 
                              '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld + '">разн.</a>)‎ . . </span>');
      var displayDiffMobileOld = displayDiffSizeOld.before('<span class="historyDiffLink">(<a href="http://minecraft-pt.gamepedia.com/index.php?title=' + wgPageName + 
                              '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld + '">разн.</a>) . . </span>');

   // Define uma dica de ferramenta para um link para a diferença de versão
      $('.historyDiffLink').find('a').attr('title', 'http://minecraft-pt.gamepedia.com/index.php?title=' + wgPageName + '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld);

   });

}