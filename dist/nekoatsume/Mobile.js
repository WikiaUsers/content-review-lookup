/* All JavaScript here will be loaded for users of the mobile site */



var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.cssClass { color: #FF0000; }';
document.getElementsByTagName('head')[0].appendChild(style);

document.getElementById('testId').className = 'cssClass';