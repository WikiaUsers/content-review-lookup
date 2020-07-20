/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

$(".plytka").click(function() {
  window.location = $(this).find("a").attr("href"); 
  return false;
});