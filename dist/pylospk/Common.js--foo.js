/* Any JavaScript here will be loaded for all users on every page load. */

function addCounter()
{
    var sidebar = document.getElementById("102_wg");

    if(sidebar == null)
        return;

    var comboString = "<div align='center'><a href='http://hitslog.com/'><img border=0 src='http://h2.hitslog.com/myspace/123456.png' width=88 height=31 alt='free counter' title='counter'></a></div>";
    sidebar.innerHTML = sidebar.innerHTML + comboString;

}

addOnloadHook(addCounter);