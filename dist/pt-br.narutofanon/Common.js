// Recarregamento Automático
AjaxRCRefreshText = 'Recarregamento Automático';
AjaxRCRefreshHoverText = 'A página recarrega-se automaticamente';
ajaxPages = ["Especial:Mudanças_recentes", "Especial:WikiActivity", "Especial:Páginas_vigiadas", "Especial:Registro", "Especial:Arquivos_novos", "Especial:Lista_de_arquivos", "Especial:Páginas_novas", "Especial:Contribuições"];

// Tooltip
var tooltips_config = { 
   offsetX: 5, 
   offsetY: 10, 
   waitForImages: true, 
   events: ['CustomEvent'], 
}

// Botões
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
        "speedTip": "Adicionar o caractere ū",
        "tagOpen": "ū",
        "tagClose": "",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
        "speedTip": "Adicionar o caractere ō",
        "tagOpen": "ō",
        "tagClose": "",
        "sampleText": ""
    };
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png",
        "speedTip": "Adicionar referência",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "''Naruto'' capítulo 0, página 0"
    };
}

// JavaScript para corrigir as imagens na wiki
$('.eximagem').each(function() {
var $this = $(this),
data = $this.data();
$this.find('img').css({
width: data.width,
float: data.align,
height: data.height
});
});