/* Размещённый здесь код JavaScript будет загружаться только участникам, имеющим статус администраторов (sysops) */

/* The info button at the start of the toolbar */

function toggleInfoT(){
    /* Check for toolbar */
    if(document.getElementById('_TLxsysop').parentNode.parentNode.id == 'WikiaNotifications' || document.getElementById('_TLxsysop').parentNode.parentNode.style.display != 'none'){
        /* If it is shown, hide it */
        var par = document.getElementById('_TLxsysop').parentNode.parentNode;
        par.style.display = 'none';
        par.id += '_X';
        /* If previous popup was displayed, show it */
        var check = document.getElementById('WikiaNotifications_S');
        if(check) check.id = 'WikiaNotifications';
    }else{
        /* Otherwise, show it */
        var par = document.getElementById('_TLxsysop').parentNode.parentNode;
        par.style.display = 'inherit';
        /* Hide current popup if it exists */
        var check = document.getElementById('WikiaNotifications');
        if(check) check.id += '_S';
        par.id = 'WikiaNotifications';
    }
}

function createInfoT(){
    /* Make sure page has info to display */
    try{
        var tryval = ['', wgPageName, wgArticleId, wgCurRevisionId, wgRestrictionEdit, wgRestrictionMove, wgCategories];
    }catch(e){
        /* If the page does not support info, quit */
        return;
    }
    /* Delete self when editing page */
    var chk = document.getElementById('_TLxsysop');
    if(chk) chk.parentNode.parentNode.parentNode.removeChild(chk.parentNode.parentNode);
    /* Create toggle element */
    var togg = document.createElement('li');
    togg.className = 'overflow';
    togg.onclick = toggleInfoT;
    togg.innerHTML = 'Page Info';
    togg.style.cursor = 'pointer';
    /* Prepend */
    var tools = document.getElementsByClassName('tools')[0];
    tools.insertBefore(togg, tools.firstChild);
    /* Create element */
    var ul = document.createElement('ul');
    ul.id = 'WikiaNotifications_X';
    ul.className = 'WikiaNotifications';
    ul.style.left = '16px';
    var li = document.createElement('li');
    var div = document.createElement('div');
    div.id = '_TLxsysop';
    div.className = 'notification-details';
    div.style.textAlign = 'center';
    div.innerHTML += wgUserName;
    var name = ['break', 'Page Name', 'Article ID', 'Revision ID', 'Edit Restriction', 'Move Restriction', 'Categories'];
    var value = ['', wgPageName, wgArticleId, wgCurRevisionId, wgRestrictionEdit, wgRestrictionMove, wgCategories];
    var ldiv = document.createElement('div');
    var rdiv = document.createElement('div');
    for(var i = 0; i < name.length; i++){
        if(name[i] == 'break'){
            div.appendChild(ldiv);
            div.appendChild(rdiv);
            div.appendChild(document.createElement('hr'));
            ldiv.innerHTML = '';
            rdiv.innerHTML = '';
            continue;
        }
        if(name[i] == 'Categories'){
            ldiv.innerHTML += name[i] + ':';
            rdiv.innerHTML += value[i].length < 1 ? 'None' : '<a href="/wiki/Category:' + value[i][0] + '">' + value[i][0] + '</a>';
            for(var g = 1; g < value[i].length; g++){
                ldiv.innerHTML += '<br />&nbsp;';
                rdiv.innerHTML += '<br />';
                rdiv.innerHTML += '<a href="/wiki/Category:' + value[i][g] + '">' + value[i][g] + '</a>';
            }
            continue;
        }
        ldiv.innerHTML += name[i] + ':';
        rdiv.innerHTML += value[i].length == 0 ? 'None' : value[i];
        if(i != name.length - 1){
            ldiv.innerHTML += '<br />';
            rdiv.innerHTML += '<br />';
        }
    }
    ldiv.style.display = 'inline-block';
    rdiv.style.display = 'inline-block';
    ldiv.style.textAlign = 'right';
    rdiv.style.textAlign = 'left';
    div.appendChild(ldiv);
    div.appendChild(rdiv);
    li.appendChild(div);
    ul.appendChild(li);
    document.getElementsByTagName('body')[0].appendChild(ul);
    var wdth = [ldiv.clientWidth, rdiv.clientWidth];
    div.parentNode.style.width = (ldiv.clientWidth + rdiv.clientWidth + 20) + 'px';
    div.parentNode.parentNode.style.right = 'none';
    div.style.maxWidth = 'none';
    div.parentNode.maxWidth = 'none';
    ldiv.width = wdth[0] + 'px';
    rdiv.width = wdth[1] + 'px';
    ldiv.style.padding = '0px';
    rdiv.style.padding = '0px';
    ldiv.style.backgroundColor = 'rgba(0,0,0,0)';
    ldiv.style.backgroundImage = 'none';
    ldiv.style.boxShadow = 'none';
    rdiv.style.backgroundColor = 'rgba(0,0,0,0)';
    rdiv.style.backgroundImage = 'none';
    rdiv.style.boxShadow = 'none';
    ldiv.style.paddingRight = '1em';
    ul.style.display = 'none';
}
addOnloadHook(createInfoT);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////