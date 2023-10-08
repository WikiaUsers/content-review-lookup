$(function(){
    setInterval(function(){
        $('#digital-lunge').html(Math.floor(Math.random() * 301));
        $('#digital-slash').html(Math.floor(Math.random() * 151));
    }, 1);
})();