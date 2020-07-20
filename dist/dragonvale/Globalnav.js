/**
* "Fix" the new and "improved" global navigation Wikia has forced upon us
*
* See https://gist.github.com/sactage/21b17a54ce6359d2bdee for the most recent version of this script
*
* Changes so far:
* Sets background colour of global nav to that of the local nav
* Removes some some of the borders used as visual separation in the global nav, since they look like crap
* Changes the colour of the chevrons on the global nav (for dropdowns) to white/black depending on new bg colour
* Changes colour of Wikia logo to white for darker themes
*
* @TODO Maybe make the nav not take up full width of the page
* @TODO Maybe add options - e.g. allow choosing if nav scrolls with you or not
* @TODO Change colour of user menu dropdown
* @TODO Improve notifications bubble look
* @TODO Send a literal letter to Wikia's product team, telling them this is utter crap
*
* @author sactage <sactage@gmail.com>
* (c) 2014 sactage
*
*/
(function fixGlobalNav() {
var bgColor = mw.config.get('wgSassParams')['color-header'],
borderElements = document.querySelectorAll('.global-navigation .page-width, .global-navigation-item'),
globalNav = document.querySelector('.global-navigation'),
bgParse = bgColor.match(/#([0-9a-f]){2}([0-9a-f]){2}([0-9a-f]){2}/).splice(1),
gt127 = 0,
arrowColor,
arwStyle = document.createElement('style'),
logo = document.querySelector('.global-navigation-link.wikia-logo img');
 
// change chevron colour based on the background colour we're going to use for the nav
for (var i = 0; i < 3; i++)
parseInt(bgParse[i], 16) > 127 && gt127++;
if (gt127 < 2) {
arrowColor = 'white';
logo.src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgdmVyc2lvbj0iMS4xIiAgIHg9IjBweCIgICB5PSIwcHgiICAgdmlld0JveD0iMCAwIDIxNy44IDYwIiAgIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIxNy44IDYwIiAgIHhtbDpzcGFjZT0icHJlc2VydmUiICAgaWQ9InN2ZzI5OTUiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC41IHIxMDA0MCIgICB3aWR0aD0iMTAwJSIgICBoZWlnaHQ9IjEwMCUiICAgc29kaXBvZGk6ZG9jbmFtZT0id2lraWEuc3ZnIj48bWV0YWRhdGEgICBpZD0ibWV0YWRhdGEzMDAzIj48cmRmOlJERj48Y2M6V29yayAgICAgICByZGY6YWJvdXQ9IiI+PGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+PGRjOnR5cGUgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPjxkYzp0aXRsZT48L2RjOnRpdGxlPjwvY2M6V29yaz48L3JkZjpSREY+PC9tZXRhZGF0YT48ZGVmcyAgIGlkPSJkZWZzMzAwMSIgLz48c29kaXBvZGk6bmFtZWR2aWV3ICAgcGFnZWNvbG9yPSIjZmZmZmZmIiAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IiAgIGJvcmRlcm9wYWNpdHk9IjEiICAgb2JqZWN0dG9sZXJhbmNlPSIxMCIgICBncmlkdG9sZXJhbmNlPSIxMCIgICBndWlkZXRvbGVyYW5jZT0iMTAiICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTA1NyIgICBpZD0ibmFtZWR2aWV3Mjk5OSIgICBzaG93Z3JpZD0iZmFsc2UiICAgaW5rc2NhcGU6em9vbT0iMTEuMzEzNzA5IiAgIGlua3NjYXBlOmN4PSIzMS4yNDk2NjQiICAgaW5rc2NhcGU6Y3k9IjYuMjQwMDQ1NyIgICBpbmtzY2FwZTp3aW5kb3cteD0iLTgiICAgaW5rc2NhcGU6d2luZG93LXk9Ii04IiAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnMjk5NSIgLz48cGF0aCAgIGQ9Ik0xMDAuNiw1OC44VjBoMTMuMnYzM2wzLjUtNC40bDcuNC04LjhoMTguOUwxMjgsMzUuMmwxNi41LDIzLjdoLTE3LjJsLTktMTQuOWwtNC42LDQuM3YxMC41SDEwMC42eiBNNTEuOCwyMC4xbC01LDI2LjRsLTYuNC0yNi40aC02aC0wLjNoLTIuN2gtMC4zaC02bC02LjQsMjYuNGwtNS0yNi40SDBsMTAuMSwzOC44aDE3LjdsNS0yMC40bDUsMjAuNGgxNy43bDEwLjEtMzguOEg1MS44eiBNMjE3LjEsNDcuNWwwLjcsMTEuM2gtMTIuMWwtMC45LTQuMmMtMi44LDIuOS02LjIsNS40LTEyLjMsNS40Yy0xMSwwLTE3LTcuMS0xNy0yMC42YzAtMTMuNSw2LTIwLjYsMTctMjAuNmM2LjEsMCw5LjUsMi40LDEyLjMsNS40bDAuOS00LjJoMTIuMWwtMC43LDExLjNWNDcuNXogTTIwMy45LDM0LjRjLTEuNy0yLjItNC4zLTMuNy03LjgtMy43Yy00LDAtNy4xLDIuNi03LjEsOC43YzAsNi4xLDMuMiw4LjcsNy4xLDguN2MzLjUsMCw2LjEtMS41LDcuOC0zLjdWMzQuNHpNNzkuOCwwLjJjLTQuMiwwLTcuNiwzLjQtNy42LDcuNmMwLDQuMiwzLjQsNy42LDcuNiw3LjZjNC4yLDAsNy42LTMuNCw3LjYtNy42Qzg3LjQsMy42LDg0LDAuMiw3OS44LDAuMiBNOTEuMiwyNy44di04LjNoLTUuN0g3Mi4ydjEzLjR2MTIuNXYxMy4xdjAuM2gxOXYtOC4yaC01LjlWMjcuOEg5MS4yeiBNMTUzLjcsNy44YzAsNC4yLDMuNCw3LjYsNy42LDcuNmM0LjIsMCw3LjYtMy40LDcuNi03LjZjMC00LjItMy40LTcuNi03LjYtNy42QzE1Ny4xLDAuMiwxNTMuNywzLjYsMTUzLjcsNy44IE0xNTUuOCwyNy44djIyLjhoLTUuOXY4LjJoMTl2LTAuM1Y0NS40VjMyLjlWMTkuNWgtMTMuMmgtNS43djguM0gxNTUuOHoiICAgZmlsbD0iIzA5MjE0MCIgICBpZD0icGF0aDI5OTciICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MSIgLz48L3N2Zz4=';
} else {
arrowColor = 'black';
}
// it's impossible to use the Selectors API with psuedo-elements (wtf mozilla) - this is the next best thing
arwStyle.innerHTML = '.hubs-entry-point:after, #searchFormChevron, .AccountNavigation > li > a:after { border: 5px solid transparent; border-top-color: ' + arrowColor + '; }';
(gt127 < 2) && (arwStyle.innerHTML += '\n.search-label-bold { color: ' + arrowColor + ' !important; }');
document.head.appendChild(arwStyle);
 
// kill borders because they look kinda horrible
for (var i = 0; i < borderElements.length; i++) {
borderElements[i].style.border = 'none'; }
 
// change nav bg
globalNav.style.backgroundColor = bgColor;
 
})();

to join this conversation on GitHub. Already have an account? Sign in to c