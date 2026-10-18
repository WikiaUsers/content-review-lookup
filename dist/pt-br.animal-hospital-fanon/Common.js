window.AutoCreateUserPagesConfig = {
    content: {
        2: 'Bem-vindo à Wiki Fanon de Animal Hospital em português brasileiro! Se precisar de ajuda, você pode entrar em contato com um membro da equipe.',
    },
    summary: 'Página de usuário criada automaticamente',
    notify: '<a href="/wiki/User:$2">Aqui está um link para a sua página de usuário, $1!</a>'
};

// Example configuration
window.reportArticleConfig = {
  group: ['sysop', 'content-moderator'],     // can be 'group' (string) or ['group','group']
  namespaces: [0, 6, 1, 2, 3, 5, 7, 9, 10, 11, 14, 15, 500, 2900],                        // main and File namespaces (default: [0])
  title: 'Artigo relatado: $1',             // optional; $1 → page name (plain text)
  body:  'Um artigo foi relatado: $1\n\nPor favor analise.' // optional; $1 → link to the page
};