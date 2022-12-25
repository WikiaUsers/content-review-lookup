/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
if (wgPageName == "Specjalna:Filmy") {$(".ContentHeader").after('<p style="font-size:150%">Na tej stronie znajduje się lista wszystkich plików wideo użytych na wiki.<br />Jeśli chodziło Ci o pełnometrażowe filmy o Equestria Girls, zobacz <a href="/wiki/Kategoria:Filmy_pełnometrażowe">kategorię: Filmy pełnometrażowe</a>.</p>');
}

//Code for Template:Youtube. Replaces specially marked YouTube links with embeeded videos. Intended as a successor to the outdated flash-based youtube tags.
while ($(".ns-0 .youtube-placeholderlink").size() > 0) {
    currentItem = $(".youtube-placeholderlink")[0];
    embeedId = $(currentItem).attr("data-id");
    $(currentItem).replaceWith('<iframe width="340" height="191" src="https://www.youtube.com/embed/'+embeedId+'"frameborder="0" allowfullscreen></iframe>');
}