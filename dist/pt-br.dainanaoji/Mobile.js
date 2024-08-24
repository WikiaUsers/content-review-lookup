/* Todo o JavaScript aqui será carregado para usuários do site mobile */


  // Código que será executado apenas em dispositivos móveis
  var divPaginacompleta = document.createElement("div");
  divPaginacompleta.innerHTML = `
    <div class="Ver-Pagina-Completa" style="width: 45%; margin: auto; margin-bottom: 0.8em; font-variant: small-caps; border: outset; border-color: #e01c39;">
      <a href="https://dainanaoji.fandom.com/pt-br/Tensei_Shitara_Dai_Nana_Ouji_Dattanode,_Kimama_ni_Majutsu_o_Kiwamemasu?mobileaction=toggle_view_desktop"> Clique Aqui Para Ver a Página Completa</a>
    </div>
  `;

  // Adiciona a div paginacompleta ao DOM
  document.body.querySelector(".cquote").after(divPaginacompleta);


document.querySelector(".mw-parser-output").style.backgroundColor = "green";