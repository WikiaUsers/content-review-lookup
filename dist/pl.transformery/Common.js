/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

$(document).ready(function(){$(".quotebox-button").click(function(){var t=$(this).attr("id");$(".quotebox").each(function(){$(this).attr("id")==t?$(this).show():$(this).hide()})})});