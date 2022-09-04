/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
var mobile = (/iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));  
    if (mobile) { 
       alert("Мобильное устройство!!");
        $('.ColoredCell').hide();
    } 
    else 
    { 
       alert("НЕ мобильное устройство!"); 
    }