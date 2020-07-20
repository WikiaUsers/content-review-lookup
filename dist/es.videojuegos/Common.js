/*[{{SERVER}}/index.php?title=-&amp;action=raw&amp;smaxage=0&amp;gen=js Para poder recargar sólo esta página]

/*</nowiki></pre>
==Código para plegado/desplegado de bloques==
[[plantilla:Desplegable]]

=== Prerequisitos: ===
'''NavigationBarShowDefault''' -> Si hay más de este número de desplegables ocultar todas automáticamente.
<pre><nowiki>*/
  var NavigationBarHide = '[Ocultar]';
  var NavigationBarShow = '[Mostrar]';
/*</nowiki></pre>

=== Código: ===
<pre><nowiki>*/

function toggleNavigationBar(indexNavigationBar)
{
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) {
        return false;
    }

    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavToggle') {
                NavChild.firstChild.data = NavigationBarShow;
            }
        }

    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavToggle') {
                NavChild.firstChild.data = NavigationBarHide;
            }
        }
    }
}

 // adds show/hide-button to navigation bars
 function createNavigationBarToggleButton()
 {
    var indexNavigationBar = 0;
    // iterate over all <div>-elements
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var NavToggleText = document.createTextNode( NavigationBarShow );
            NavToggle.appendChild(NavToggleText);

            // add NavToggle-Button as first div-element 
            // in <div class="NavFrame">
            NavFrame.insertBefore(
                NavToggle,
                NavFrame.firstChild
            );
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }

    //Plegamos todas....
        for(
                var i=1; 
                i<=indexNavigationBar; 
                i++
        ) {
            toggleNavigationBar(i);
            toggleNavigationBar(i);
        }   
 }

$(createNavigationBarToggleButton);

/*</nowiki></pre>
-----------------------------------------------
Redefinición de ordenación de tablas "sortable"
-----------------------------------------------
Añadido por: [[User:chixpy|Chixpy]]

Estos ingleses se creen el centro del universo y en las tablas que se pueden ordenar reconocen el punto como símbolo decimal así que hago este apaño para que lo haga correctamente..
<pre><nowiki>*/
function ts_dateToSortKey(date) {	
	// y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
	if (date.length == 11) {
		switch (date.substr(3,3).toLowerCase()) {
			case "ene": var month = "01"; break;
			case "feb": var month = "02"; break;
			case "mar": var month = "03"; break;
			case "abr": var month = "04"; break;
			case "may": var month = "05"; break;
			case "jun": var month = "06"; break;
			case "jul": var month = "07"; break;
			case "ago": var month = "08"; break;
			case "sep": var month = "09"; break;
			case "oct": var month = "10"; break;
			case "nov": var month = "11"; break;
			case "dic": var month = "12"; break;
			// default: var month = "00";
		}
		return date.substr(7,4)+month+date.substr(0,2);
	} else if (date.length == 10) {
		if (ts_europeandate == false) {
			return date.substr(6,4)+date.substr(0,2)+date.substr(3,2);
		} else {
			return date.substr(6,4)+date.substr(3,2)+date.substr(0,2);
		}
	} else if (date.length == 8) {
		yr = date.substr(6,2);
		if (parseInt(yr) < 50) { 
			yr = '20'+yr; 
		} else { 
			yr = '19'+yr; 
		}
		if (ts_europeandate == true) {
			return yr+date.substr(3,2)+date.substr(0,2);
		} else {
			return yr+date.substr(0,2)+date.substr(3,2);
		}
	}
	return "00000000";
}

//Modificado por Sanbec en WP-es aplicando la solución de WP en sueco
//(Anteriormente parece que solo cambiaba un punto)
//EXPERIMENTAL: Añadido además para que ordene los porcentajes.
function ts_parseFloat(num) {
        if (!num) return 0;
        num = num.replace("%", "");
        num = num.replace(/\./g, "");
        num = num.replace(/,/, ".");
        num = parseFloat(num);
        return (isNaN(num) ? 0 : num);
}

//Modificación hecha por Sanbec en WP-es para que ordene alfabéticamente bien
// ignorando acentos y no se limite a ordenarlo según el código ASCII.
function ts_sort_caseinsensitive(a,b) {
var aa = a[1].toLowerCase();
var bb = b[1].toLowerCase();
return(aa.localeCompare(bb));
}


// Otro pequeño apaño para "sortable"
// Cambios:
//   * Tablas de una línea: No añade el botón de ordenar
//   * Tablas de dos líneas: Tampoco (encabezado + 1 fila = estupidez ordenar)
//   * Quitammos dos &nbsp; entre el texto del encabezado y el botón
//       (para que no se descentren al cambiar el CSS en Common.css)
function ts_makeSortable(table)
{
  var firstRow;
  if (table.rows && table.rows.length > 2)
  {
    if (table.tHead && table.tHead.rows.length > 0)
    {
      firstRow = table.tHead.rows[table.tHead.rows.length - 1];
    }
    else
    {
      firstRow = table.rows[0];
    }
  }
  if (!firstRow) return;
  for (var i = 0; i < firstRow.cells.length; i++)
  {
    var cell = firstRow.cells[i];
    if ((" " + cell.className + " ").indexOf(" unsortable ") == -1)
    {
      cell.innerHTML = '<a href="#" class="sortheader" ' + 'onclick="ts_resortTable(this);return false;">' + '<span class="sortarrow">' + '<img src="' + ts_image_path + ts_image_none + '" alt="&darr;"/></span></a>' + cell.innerHTML;
    }
  }
  if (ts_alternate_row_colors)
  {
    ts_alternate(table);
  }
}


//</nowiki></pre>