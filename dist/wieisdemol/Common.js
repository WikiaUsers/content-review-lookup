function changename(name, change, theclass){
    $('p:contains("'+name+'"),li:contains("'+name+'"),th:contains("'+name+'"),td:contains("'+name+'")').each(function(){
        if($(this).find('a').length != 0 && !$(this).hasClass('done')) return;
        safe = change.replace(' ', '_').replace(' ', '_').replace(' ', '_');
        re = new RegExp(name,"g");
        $(this).html(
           $(this).html().replace(re, '<a href="/wiki/'+safe+'" title="'+change+'" class="'+theclass+'">'+name+'</a>')
        )
        $(this).addClass('done');
    });
}

if (document.title.toLowerCase().indexOf("seizoen 13") >= 0){
  console.log('Seizoen 13');
  changename('Carolien', 'Carolien Borgers', 'inhetspel');
  changename('Daniël', 'Daniël Boissevain', 'inhetspel');
  changename('Ewout', 'Ewout Genemans', 'afgevallen');
  changename('Janine', 'Janine Abbring', 'afgevallen');
  changename('Joep', 'Joep van Deudekom', 'afgevallen');
  changename('Kees', 'Kees Tol', 'inhetspel');
  changename('Paulien', 'Paulien Cornelisse', 'inhetspel');
  changename('Tania', 'Tania Kross', 'inhetspel');
  changename('Tim', 'Tim Haars', 'inhetspel');
  changename('Zarayda', 'Zarayda Groenhart', 'inhetspel');
}