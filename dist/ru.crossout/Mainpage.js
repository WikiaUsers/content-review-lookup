var mainbox     = $('#mainpage-box');
var buttons     = $('#mainpage-box .mainpage-box-buttons > div');
var ajaxcontent = $('#mainpage-box .mainpage-box-ajax-content');

window.onload = function(){
    for (i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function activebutton(){
           loadingpage(this);
        };
    }
};

function loadingpage(e){
    showLoading();
    removeSelected();
    e.className = e.className+' selected';
    $('#mainpage-box .mainpage-box-ajax-content').load('/ru/wiki/' + e.lastElementChild.innerText.replace(/\s/ig,'_') + ' #ajax-load').text();
}(this.jQuery)

function removeSelected(){
    for (i = 0; i < buttons.length; i++) {
        
        selClass=buttons[i].className;
        
        if (selClass.indexOf("selected")>=0){
            buttons[i].className=selClass.replace(" selected", '');
        }
            
    }

}

function showLoading(){
    var newDiv = document.createElement('div');
    newDiv.className = "ajax-onload";
    newDiv.style='background-color: rgba(0, 0, 0, 0.75)';
    newDiv.innerHTML = '<div><img src="https://vignette.wikia.nocookie.net/crossout/images/4/42/Loading.gif/revision/latest?cb=20170908054430&path-prefix=ru" /><br /><span style="font-weight: 700;">Идёт загрузка...</span></div>';
    
    $('#mainpage-box .mainpage-box-ajax-content')[0].appendChild(newDiv);
}