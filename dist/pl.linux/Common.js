// {{terminal}}
// Dziękuję za pomoc użytkownikowi [[c:nonsensopedia:User:optdex]].
var zawartosc = $(".nowy-terminal").html();
if (typeof variable !== 'undefined') {
  zawartosc = zawartosc.replace(/\n\$ /g, "\n<span class=\"znak-zachety\">$ </span>");
  zawartosc = zawartosc.replace(/\n# /g, "\n<span class=\"znak-zachety-roota\" title=\"Polecenie powinno zostać wykonane jako root.\"># </span>");
  $(".nowy-terminal").hide().after("<pre class=\"nowy-terminal\">" + zawartosc + "</pre>");
}