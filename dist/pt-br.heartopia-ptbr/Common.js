/**
 * MediaWiki:Common.js para Heartopia Wiki
 * Versão: 2.3 (Suporte para Pop-up, Barra e Relógios em Tempo Real)
 */

$(function() {
    /* 1. CONFIGURAÇÃO DE IMAGENS */
    function getFileUrl(name) {
        return mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=Especial:FilePath/' + name;
    }

    /* 2. MÓDULO DA BARRA LATERAL */
    var socialModule = 
        '<section class="rail-module" id="heartopia-social-module" style="background:#ffffff; border:1px solid #eee; border-radius:20px; padding:20px; margin-bottom:20px; box-shadow:0 4px 10px rgba(0,0,0,0.03); font-family:\'Segoe UI\', Roboto, sans-serif; text-align:center;">' +
            '<div style="font-size:18px; font-weight:bold; color:#333; margin-bottom:15px; display:flex; align-items:center; justify-content:center; gap:8px;">🌐 Nossas Comunidades</div>' +
            '<div style="display:flex; flex-direction:column; gap:12px;">' +
                '<a href="https://discord.gg/heartopia" target="_blank" style="background:#f0f7ff; border:1px solid #d0e4ff; color:#2a5a8a; padding:12px; border-radius:15px; font-weight:bold; text-decoration:none; font-size:14px; display:flex; align-items:center; justify-content:center; gap:12px;"><img src="' + getFileUrl('Icondiscord.png') + '" style="width:28px; height:28px; object-fit:contain;"> Discord Oficial</a>' +
                '<a href="https://discord.gg/Qkye3PsK" target="_blank" style="background:#f3fcf3; border:1px solid #dcf0dc; color:#2d5a2d; padding:12px; border-radius:15px; font-weight:bold; text-decoration:none; font-size:14px; display:flex; align-items:center; justify-content:center; gap:12px;"><img src="' + getFileUrl('Icondiscordazul.png') + '" style="width:28px; height:28px; object-fit:contain;"> Discord BR-PT</a>' +
                '<a href="https://heartopia.xd.com/pt/" target="_blank" style="background:#fffdf2; border:1px solid #f9f2d0; color:#7d6608; padding:12px; border-radius:15px; font-weight:bold; text-decoration:none; font-size:14px; display:flex; align-items:center; justify-content:center; gap:12px;"><img src="' + getFileUrl('Jogoicon.png') + '" style="width:28px; height:28px; object-fit:contain;"> Página do Jogo</a>' +
                '<a href="https://www.instagram.com/myheartopia/?hl=pt" target="_blank" style="background:#fff2f9; border:1px solid #fde0f0; color:#a33b73; padding:12px; border-radius:15px; font-weight:bold; text-decoration:none; font-size:14px; display:flex; align-items:center; justify-content:center; gap:12px;"><img src="' + getFileUrl('Instagramicon.png') + '" style="width:28px; height:28px; object-fit:contain;"> Instagram</a>' +
                '<a href="https://x.com/i/communities/2031141468723724347" target="_blank" style="background:#f0faff; border:1px solid #d0f0ff; color:#1da1f2; padding:12px; border-radius:15px; font-weight:bold; text-decoration:none; font-size:14px; display:flex; align-items:center; justify-content:center; gap:12px;"><img src="' + getFileUrl('Icontwitter.png') + '" style="width:28px; height:28px; object-fit:contain;"> Twitter</a>' +
            '</div>' +
        '</section>';

    if ($('#WikiaRail').length) {
        $('#WikiaRail').prepend(socialModule);
    } else if ($('#heartopia-custom-sidebar').length) {
        $('#heartopia-custom-sidebar').html(socialModule);
    }

    /* 3. BOTÃO VOLTAR AO TOPO */
    if (!$('#backToTop').length) {
        var $backToTop = $('<div id="backToTop" style="display:none; position:fixed; bottom:30px; right:30px; width:50px; height:50px; background:#ffffff; color:#ff8b71; border:1px solid #eee; border-radius:50%; text-align:center; line-height:50px; font-size:24px; cursor:pointer; box-shadow:0 4px 10px rgba(0,0,0,0.1); z-index:1000; transition:0.3s opacity;">▲</div>');
        $('body').append($backToTop);
        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) { $backToTop.fadeIn(); } else { $backToTop.fadeOut(); }
        });
        $backToTop.click(function() { $('html, body').animate({ scrollTop: 0 }, 600); });
    }

    /* 4. POP-UP FLUTUANTE */
    var sessionPopupHTML = 
        '<div id="heartopia-session-popup" style="position:fixed; bottom:20px; left:20px; width:350px; background:rgba(255, 255, 255, 0.9); border-radius:15px; box-shadow:0 10px 30px rgba(0,0,0,0.2); z-index:99999; font-family:\'Segoe UI\', Roboto, sans-serif; overflow:hidden; border:1px solid #eee; backdrop-filter:blur(10px); display:none;">' +
            '<div style="position:absolute; left:0; top:0; bottom:0; width:8px; display:flex; flex-direction:column;">' +
                '<div style="flex:1; background:#d0e4ff;"></div><div style="flex:1; background:#dcf0dc;"></div><div style="flex:1; background:#f9f2d0;"></div><div style="flex:1; background:#fde0f0;"></div><div style="flex:1; background:#ff8b71;"></div>' +
            '</div>' +
            '<div id="close-session-popup" style="position:absolute; top:10px; right:15px; cursor:pointer; font-size:22px; color:#aaa; font-weight:bold;">&times;</div>' +
            '<div style="padding:25px 20px 20px 30px; text-align:center;">' +
                '<div style="font-size:10px; font-weight:bold; color:#a33b73; text-transform:uppercase; margin-bottom:8px;">Heartopia Wiki</div>' +
                '<div style="font-size:18px; font-weight:800; color:#333; margin-bottom:12px;">Jogue Heartopia agora!</div>' +
                '<div style="background:#f9f9f9; border-radius:10px; padding:12px; margin-bottom:15px; border:1px solid #eee;">' +
                    '<img src="' + getFileUrl('Site-logo.png') + '" style="max-width:160px; height:auto; display:block; margin:0 auto;">' +
                '</div>' +
                '<p style="font-size:13px; color:#555; margin-bottom:15px;">Explore um mundo vibrante. Baixe na Steam!</p>' +
                '<div style="text-align:center;">' +
                    '<a href="https://store.steampowered.com/app/2443040/Heartopia/" target="_blank" style="display:inline-block; background:#ff8b71; color:white; padding:10px 25px; border-radius:50px; font-weight:bold; text-decoration:none; font-size:13px;">BAIXAR NA STEAM</a>' +
                    '<div style="margin-top:12px; font-size:12px; color:#2a5a8a; font-weight:600; cursor:pointer; text-decoration:underline;" id="btn-later-session">Explorar a Wiki primeiro</div>' +
                '</div>' +
            '</div>' +
        '</div>';

    $('body').prepend(sessionPopupHTML);
    
    setTimeout(function() {
        $('#heartopia-session-popup').fadeIn(500);
    }, 1500);

    $(document).on('click', '#close-session-popup, #btn-later-session', function() {
        $('#heartopia-session-popup').fadeOut(300);
    });
});

/* RELÓGIOS COM SEGUNDOS EM TEMPO REAL */
mw.hook('wikipage.content').add(function($content) {
    if (!$('#heartopia-clocks').length) return;

    function updateClocks() {
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

        var offsets = {
            'america': -5, 
            'global': 1,   
            'sea': 7       
        };

        for (var region in offsets) {
            var nd = new Date(utc + (3600000 * offsets[region]));
            var h = nd.getHours();
            var m = nd.getMinutes();
            var s = nd.getSeconds();

            var timeStr = (h < 10 ? '0'+h : h) + ':' + (m < 10 ? '0'+m : m);
            var secStr = ':' + (s < 10 ? '0'+s : s);

            var phase = "DIA";
            var icon = "☀️";
            var color = "#cf8a29";

            if (h >= 0 && h < 5) { phase = "NOITE"; icon = "🌙"; color = "#3b6b9e"; }
            else if (h >= 5 && h < 8) { phase = "AMANHECER"; icon = "🌅"; color = "#cf8a29"; }
            else if (h >= 8 && h < 17) { phase = "DIA"; icon = "☀️"; color = "#cf8a29"; }
            else if (h >= 17 && h < 20) { phase = "CREPÚSCULO"; icon = "🌙"; color = "#cf8a29"; }
            else { phase = "NOITE"; icon = "🌙"; color = "#3b6b9e"; }

            $('#clock-' + region + '-time').text(timeStr);
            $('#clock-' + region + '-sec').text(secStr);
            $('#clock-' + region + '-phase').html('<span style="color:' + color + '; display:flex; align-items:center; gap:5px;">' + icon + ' ' + phase + '</span>');
        }
    }
    
    setInterval(updateClocks, 1000);
    updateClocks();
});