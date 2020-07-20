/* Размещённый здесь код JavaScript будет загружен всем пользователям при обращении к какой-либо странице */

addOnloadHook(zagadki);

function zagadki()
{
   var div = document.getElementById("resolve");
   if(div)
   {
     div.innerHTML = '<input type="text" id="question" /> <input type="submit" value="Разгадать" onclick="javascript:resolve();" />';
   }
}

/* Загадки каменного мудреца и вопросы трактирщика */
function resolve()
{
	var text = document.getElementById('question').value;
	text = orfo_sanitize(text);
	

	for(var i = 1; i <= 600; i ++)
        {
		var elem = document.getElementById('q' + i);
		if(!elem) break;	

		var data = elem.innerHTML;
		var mdata = orfo_sanitize(data);
		if(mdata.match(text))
		{
			data = data.replace(/.*<strong>(.*?)<\/strong>/i, "$1");
			alert(data);
			return;
		}
        }

	alert("Загадка не найдена. Возможно, вопрос был недавно изменён или добавлен. Попробуйте воспользоваться алфавитным указателем.");
}
function orfo_sanitize(txt)
{
	txt = txt.replace(/ё/i, "е");
	txt = txt.replace(/ /, "");
	txt = txt.replace(/[\.,\!\?]/, "");
	txt = txt.replace("^\s+", "");
	txt = txt.replace("\s+$", "");
	return txt.toLowerCase();
}