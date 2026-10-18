window.UserTagsJS = {
    modules: {
        inactive: 30, // Opcional: Marca usuários como inativos após 30 dias
        mwGroups: ['bureaucrat', 'sysop', 'rollback', 'bot'], // Mantém os grupos nativos do Fandom
        custom: {
            // Adicione aqui os nomes exatos das contas dos roteiristas e a tag deles
            'NomeDoRoteirista1': ['roteirista_msp'],
            'NomeDoRoteirista2': ['roteirista_msp']
        }
    },
    tags: {
        // Configuração visual e de texto da tag personalizada
        roteirista_msp: { 
            m: 'Roteirista MSP', 
            f: 'Roteirista MSP', 
            u: 'Roteirista MSP', 
            title: 'Perfil verificado de profissional da Mauricio de Sousa Produções',
            link: 'Turma_da_Mônica_Fanon_Wiki:Estúdio' // Link para a política que criamos
        }
    },
    oasisPlaceBefore: ''
};

// Configurações extras de moderação para o UserTags
UserTagsJS.modules.userfilter = {
    // Remove a tag de "usuário novo" ou "não-registrado" se eles receberem a tag oficial
    'NomeDoRoteirista1': ['newuser', 'notregistered'],
    'NomeDoRoteirista2': ['newuser', 'notregistered']
};