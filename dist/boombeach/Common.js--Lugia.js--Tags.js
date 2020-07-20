var busers = ['GorillaMan', 'Kk9199'];

for(var i = 0; i < busers.length; i++){
    if(location.href.match(new RegExp('boombeach.wikia.com/wiki/(User:|Message_Wall:|User_blog:|Special:Contributions/)' + busers[i])) !== null){
        addOnloadHook(tagEdit);
    }
}

function tagEdit(){
    var tags = document.getElementsByClassName('tag');
    for(var i = 0; i < tags.length; i++){
        if(tags[i].innerHTML.toLowerCase() == 'admin') tags[i].innerHTML = 'Bureaucrat';
    }
}