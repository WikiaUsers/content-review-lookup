window.BackToTopText = "Retornar";
$(".tooltip").tooltip(); // Tooltips

// Horário
 // Thanks to KockaAdmiralac
window.ajaxCallAgain = window.ajaxCallAgain || [];
window.ajaxCallAgain.push(function() {
    $('time.timeago').timeago();
});

// Personalização de Botões
if (mwCustomEditButtons) {

    // Botão ū 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
        "speedTip": "Adicionar o caractere ū",
        "tagOpen": "ū",
        "tagClose": "",
        "sampleText": ""
    };

    // Botão ō
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
        "speedTip": "Adicionar o caractere ō",
        "tagOpen": "ō",
        "tagClose": "",
        "sampleText": ""
    };

    // Botão de Referência
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png",
        "speedTip": "Adicionar referência",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "''Naruto'' capítulo 0, página 0"
    };

    // Botão de Construção
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/iWxuYqU.png",
        "speedTip": "Adicionar a predefinição de Construção",
        "tagOpen": "\{\{Em Construção",
        "tagClose": "\}\}",
        "sampleText": ""
    };

    // Botão InfoSlide
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/P5uOlcm.png",
        "speedTip": "Adicionar slideshow na Infobox",
        "tagOpen": '<gallery type="slideshow" widths="293" crop="true" position="center" hideaddbutton="true">',
        "tagClose": '</gallery>',
        "sampleText": ""
    };

    // Botão de Redirecionamento
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/IVLDN3o.png",
        "speedTip": "Adicionar um Redirecionamento",
        "tagOpen": "#REDIRECIONAMENTO [[",
        "tagClose": "]]",
        "sampleText": ""
    };

    // Botão de Jutsu
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/ORiUiwZ.png",
        "speedTip": "Adicionar a predefinição de Jutsu",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Jutsu\n|Nome = \n|Imagem = \n|Slide = \n|Anime = \n|Mangá = \n|Filme = \n|Novela = \n|Game = \n|Aparece em = \n|Kanji = \n|Rōmaji = \n|Português = \n|Viz Mangá = \n|Mangá Panini = \n|Games = \n|Outros = \n|Classificação = \n|Elemento = \n|Rank = \n|Classe = \n|Alcance = \n|Selos Manuais = \n|Jutsu Parente(s) = \n|Jutsu Derivado(s) = \n|Jutsu Relacionado(s) = \n|Usuários = \n"
    };

    // Botão de Personagem
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/cXG4jMY.png",
        "speedTip": "Adicionar a predefinição de Personagem",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Lua/Personagem\n|Nome = \n|Imagem = \n|Mangá = \n|Anime = \n|Filme = \n|Game = \n|OVA = \n|Novela = \n|Aparece em = \n|Japonês = \n|Português = \n|Kanji = \n|Rōmaji = \n|Estado = \n|Sexo = \n|Aniversário = \n|Altura = \n|Peso = \n|Idade = \n|Tipo Sanguíneo = \n|Espécie = \n|Jinchūriki = \n|Clã = \n|Bijū = \n|Kekkei Mōra = \n|Kekkei Tōta = \n|Kekkei Genkai = \n|Chakra = \n|Família = \n|Classificação = \n|Ocupação = \n|Afiliação = \n|Times = \n|Parceiro = \n|Registro Ninja = \n|Genin = \n|Chūnin = \n|Chakra = \n|Características = \n|Traços Únicos = \n"
    };

    // Botão de Episódio
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/hQSVIqZ.png",
        "speedTip": "Adicionar a predefinição de Episódio",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Episódio\n|Imagem = \n|Anterior = \n|Seguinte = \n|Kanji = \n|Rōmaji = \n|Outros = \n|Capítulo = \n|Episódio = \n|Arco = \n|Lançamento = \n|Personagens = \n|Jutsu = \n|Equipamentos = \n"
    };

    // Botão de Mangá
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/xKevL8O.png",
        "speedTip": "Adicionar a predefinição de Volume",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Tabela-Volumes\n|Nome = \n|Imagem = \n|Anterior = \n|Seguinte = \n|Kanji = \n|Rōmaji = \n|Volume = \n|Capítulo = \n|Lançamento = \n|Personagens = \n|Jutsu = \n|Equipamentos = \n"
    };

    // Botão de Game
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/c98ljT5.png",
        "speedTip": "Adicionar a predefinição de Game",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Game\n|Nome = \n|Imagem = \n|Kanji = \n|Rōmaji = \n|Outros Nomes = \n|Plataforma = \n|Série = \n|Anterior = \n|Próximo = \n|Japão = \n|América do Sul = \n|Personagens = \n|Jutsu = \n|Equipamentos = \n"
    };
}

// Criação de novos quadros p/ Fórum
$(function() {
    $(".Forum .DiscussionBox input[type=text], .message-topic input[type=text]").attr('placeholder', 'Adicionar uma categoria (opcional)');
    $(".Forum .DiscussionBox input[type=editarea], .MiniEditorWrapper .editarea .cke_source, .MiniEditorWrapper .editarea textarea").attr('placeholder', 'Sobre o que você quer falar?');
    $(".Forum .DiscussionBox textarea[type=title], .Forum .DiscussionBox textarea.title").attr('placeholder', 'Título');
    $('ul.boards').append('<li class="board board-20069" data-id="20399"><div class="heading"><h4><a href="https://naruto.fandom.com/pt-br/wiki/Portal:Pergaminhos_dos_Kage">Pergaminhos dos Kage</a></h4></div><p class="description grid-3 alpha">Uma coletânea de assuntos reunidos pelos administradores, trazendo inúmeros contos exibidos nos Databooks, análises, perguntas frequentes, cálculos e muito mais!</p></li>');
    $(".new-reply .MiniEditorWrapper").last().before("<center><small>Antes de postar sua resposta, verifique-a se está nos padrões com nossas <a href='https://naruto.fandom.com/pt-br/wiki/Wiki_Naruto:Política_de_Fórum'>políticas do fórum</a> e com os <a href='https://pt-br.wikia.com/Termos de Uso'>Termos de Uso da Wikia</a>. Caso sua mensagem viole as políticas da comunidade e da rede Wikia, ela será editada ou removida.</small></center>");
    $(".ForumNewMessage .heading").after("<center><small>Antes de postar um novo tópico, por favor, verifique se já existe um tópico com o mesmo assunto. Caso você não encontre nenhum tópico com o mesmo tema, crie um novo, mas garanta-se que ele está seguindo nossas <a href='https://naruto.fandom.com/pt-br/wiki/Wiki_Naruto:Política_de_Fórum'>políticas do Fórum</a>.</center>");
    $(".title-container > textarea.title").attr("maxlength", 125);
});

// Renomeação de painéis (Namespaces)
$(function() {
    if (wgCanonicalNamespace == 'Portal') {
        $('.header-column.header-title h1').text(wgPageName.replace(/^[^:]+:/, '').replace(/_/g, ' '));
        $('.header-column.header-title').append('<h2>Portal</h2>');
    }
});

// Alterar o nome de usuário com tags
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});

// Imagens externas sendo linkadas
$('.eximagem').each(function() {
var $this = $(this),
data = $this.data();
$this.find('img').css({
width: data.width,
height: data.height
});
});

// Modelo comparativo do Fórum
if (mw.config.get('wgPageName') === 'Quadro:Debate_de_Batalhas' || mw.config.get('wgPageName') === 'Quadro:Debate_de_Batalhas_CROSSOVER') {
    $(".Forum .DiscussionBox textarea.body").val($("textarea").val() + "'''Local:''' <insira aqui><br>'''Intenção:''' <insira aqui><br>'''Distância:''' <insira aqui><br>'''Condições:''' <insira aqui><br>'''Conhecimento:''' <insira aqui><br>'''Restrições:''' <insira aqui><br>'''Mídias:''' <insira aqui>");
}