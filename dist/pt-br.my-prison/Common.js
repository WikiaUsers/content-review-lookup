/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

  /* ==== customização dos imports em [[MediaWiki:ImportJS]] ==== */

// configuração do risco do MarkBlocked 
window.mbIndefStyle = 'color: #ff0000; opacity: 0.7; font-style: italic; text-decoration: line-through; text-decoration-thickness: 0.1px; font-weight: 300; letter-spacing: 0.8px';

// Configuração do AutoCreateUserPages (Auto criação de páginas de usuário)
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{NovoUsuário}}',
    }, 
    summary: 'Automaticamente criando a página deste usuário',
    notify: true
};

 /* == Veja outros Gadgets em: [[Especial:Gadgets]] */

  /* ==== Barra de pesquisa para o Change Log ==== */
// Disponível em [[MediaWiki:Gadget-FiltroChangeLog.js]].


  /* ==== Calculadora de recursos ==== */
// Disponível em [[MediaWiki:Gadget-Calculadora.js]].