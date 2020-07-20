/*
 * Skrypt naprawiający wyszukiwarkę. Od dłuższego czasu wpisanie w nią nazwy strony specjalnej pokazuje pustrą stronę wyników wyszukiwania zamiast przekierowywać do owej strony specjalnej.
 * (Na Monobooku jest jeszcze chociaż odnośnik w nagłówku, na Oasisie go nie ma).
 * *****
 * Aby użyć na innej wiki na Fandomie, skonfiguruj aliasy przestrzeni zawarte w tablicy „szukajka_aliasy” (domyślnie „['Special', 'Specjalna']”, na pl.gta również „S”) i ustaw adres w zmiennej „szukajka_adres” (z prefiksem protokołu, bez ukośnika na końcu, kiedyś może usunę konieczność ręcznego podawania).
 * To use elsewhere on Fandom, configure the aliases in the „szukajka_aliasy” array (this depends on the lauguage your wiki uses, „['Special']” by default in English) and the address in the „szukajka_adres” variable (with a protocol prefix, with no slash in the end) and replace „Specjalna:Szukaj” in the regexes used to build the „szukajka_tmp” array with the equivalent in your language („Special:Search” in English).
 * *****
 * Copyright (c) 2016 Piotr "PiotrekD" Doroszewski
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * (See https://en.wikipedia.org/wiki/MIT_License and https://opensource.org/licenses/MIT.)
*/ 
var szukajka_aliasy = ['Special', 'Specjalna', 'S'];
var szukajka_adres  = 'http://pl.gta.wikia.com';

if (skin == 'oasis') {
  var szukajka_tmp = window.location.href.match(/\/wiki\/Specjalna:Szukaj\?query=(\w*)%3A([\w\d%\+]*)(&?.*)/);
  if (szukajka_tmp &&
      !(szukajka_tmp[3].match(/&fulltext=/)) &&
      szukajka_aliasy.indexOf(szukajka_tmp[1]) != -1
  ) window.location.replace(szukajka_adres + '/index.php?title=Special%3A' + szukajka_tmp[2]);
} else if (skin == 'monobook') {
  var szukajka_tmp = window.location.href.match(/\?title=Specjalna%3ASzukaj&search=(\w*)%3A([\w\d%\+]*)(&?.*)/);
  if (szukajka_tmp &&
      !(szukajka_tmp[3].match(/&fulltext=/)) &&
      szukajka_aliasy.indexOf(szukajka_tmp[1]) != -1
  ) window.location.replace(szukajka_adres + '/index.php?title=Special%3A' + szukajka_tmp[2]);
}