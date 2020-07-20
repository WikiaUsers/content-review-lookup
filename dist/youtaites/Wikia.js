/*Custom YT player*/
$(function ytloader() {
    if (document.querySelector('.ytsample') !== null) {
        $('.ytsample').ready(function(){ 
            var ytid=document.querySelector('.ytsample').title;
            var yttemplate1="<div style='width: 202px; overflow: hidden; height: 21px; margin-top: 5px; margin-bottom: 5px; margin-right: 5px; position:relative; top:0; border: 3px solid #0f0f0f; border-radius:10px'><iframe width='417' height='23' src='http://www.youtube.com/embed/";
            var yttemplate2="?version=3&hl=en_US&theme=dark&color=white&loop=1&showinfo=0&autohide=0&disablekb=1&autoplay=0' frameborder='0' allowfullscreen=0></iframe></div>";
            $('.ytsample').append(yttemplate1+ytid+yttemplate2);
        });
    }
});