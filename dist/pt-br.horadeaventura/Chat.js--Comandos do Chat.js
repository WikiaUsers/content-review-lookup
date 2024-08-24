/* Script para adicionar comandos adicionais no chat, criado por [[User:BlackZetsu]], qualquer cópia ou redistribuição deste código deve passar antes por seu respectivo autor */
$(function() {
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 10) == '!interwiki') {
            comando = $(this).val().split("/");
            pagina = comando[1]
            lingua = comando[2]
            interwiki = '\n[[' + lingua + ':' + comando[3] + ']]'
            ComandosAPI.interwiki()
        }
    });

    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 10) == '!categoria') {
            comando = $(this).val().split("/");
            pagina = comando[1]
            categoria = '\n[[Categoria:' + comando[2] + ']]'
            ComandosAPI.categoria()
        }
    });
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 8) == '!deletar') {
            comando = $(this).val().split("/");
            pagina = comando[1]
            rasao = comando[2]
            ComandosAPI.deletar()
        }
    });
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 9) == '!mensagem') {
            comando = $(this).val().split("/");
            usuario = comando[1]
            titulo = comando[2]
            mensagem = comando[3]
            ComandosAPI.mensagem()
        }
    });

    var ComandosAPI = {
        interwiki: function() {
            $.post(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'edit',
                summary: 'Adicionando interwiki',
                title: pagina,
                appendtext: interwiki,
                token: mw.user.tokens.get("editToken"),
                success: alert('Feito!')
            });
        },
        deletar: function() {
            $.post(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'delete',
                reason: rasao,
                title: pagina,
                token: mw.user.tokens.get("editToken"),
                success: alert('Feito!')
            });
        },
        mensagem: function() {
            $.post(mw.util.wikiScript('wikia'), {
                controller: 'WallExternal',
                method: 'postNewMessage',
                pagenamespace: '1200',
                pagetitle: usuario,
                messagetitle: titulo,
                body: mensagem,
                format: 'json',
                success: alert('Feito!')
            });
        },
        categoria: function() {
            $.post(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'edit',
                summary: 'Adicionando: ' + comando[2],
                title: pagina,
                appendtext: categoria,
                token: mw.user.tokens.get("editToken"),
                success: alert('Feito!')
            });
        }
    }
});