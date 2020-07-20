/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

if (wgUserName)
    $("span.insertusername").text(wgUserName);
else
    $("span.insertusername").text("An IP Address");