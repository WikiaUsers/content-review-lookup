/**
 * @name    Syntax Recolor
 * @desc    This script allows you configure colors of syntax highlighter.
 * @version 1.0
 * @author  Kofirs2634
 */
$(function($) {
    if (wgAction == 'view') return;
    var getStyle = function(type, n) { return window.getComputedStyle(document.querySelectorAll('#wpTextbox0 span')[n], type).backgroundColor },
        getContent = function(type, n) { return window.getComputedStyle(document.querySelectorAll('#wpTextbox0 span')[n], type).content },
        colors = [{ light: 'rgba(0, 0, 0, 0)', dark: 'rgba(0, 0, 0, 0)', name: '' }, { light: 'rgb(246, 221, 233)', dark: 'rgb(102, 41, 70)', name: 'html' }, { light: 'rgb(248, 219, 218)', dark: 'rgb(77, 26, 25)', name: 'comment' }, { light: 'rgb(228, 229, 243)', dark: 'rgb(68, 70, 109)', name: 'format' }, { light: 'rgb(217, 234, 246)', dark: 'rgb(36, 84, 119)', name: 'link' }, { light: 'rgb(240, 235, 219)', dark: 'rgb(94, 81, 41)', name: 'template' }, { light: 'rgb(219, 236, 235)', dark: 'rgb(36, 77, 73)', name: 'external' }, { light: 'rgb(232, 235, 218)', dark: 'rgb(71, 77, 35)', name: 'special' }]
    if (wgIsDarkTheme) {
        // Dark theme handler
        window.upd = setInterval(function() {
            var elem = document.querySelectorAll('#wpTextbox0 span');
            for (i = 0; i < document.querySelectorAll('#wpTextbox0 span').length; i++) {
                var newClass = '';
                colors.forEach(function(e, n) {
                    if (getStyle('after', i) == colors[n].dark) newClass += 'a-' + colors[n].name + ' ';
                    if (getStyle('before', i) == colors[n].dark) newClass += 'b-' + colors[n].name + ' ';
                    if (getContent('after', i).match(/\[?https?:\/\/\D+\]?/) && !elem[i].className) newClass += 'a-external ';
                    if (getContent('before', i).match(/\[?https?:\/\/\D+\]?/) && !elem[i].className) newClass += 'b-external ';
                    elem[i].className = newClass.replace(/[ab]?-(?![a-z]+)/g, '').replace(/\s(?![a-z]+)/g, '')
                })
            }
        }, 1000)
    } else {
        // Light theme handler
        window.upd = setInterval(function() {
            var elem = document.querySelectorAll('#wpTextbox0 span');
            for (i = 0; i < document.querySelectorAll('#wpTextbox0 span').length; i++) {
                var newClass = '';
                colors.forEach(function(e, n) {
                    if (getStyle('after', i) == colors[n].light) newClass += 'a-' + colors[n].name + ' ';
                    if (getStyle('before', i) == colors[n].light) newClass += 'b-' + colors[n].name + ' ';
                    elem[i].className = newClass.replace(/[ab]?-(?![a-z]+)/g, '').replace(/\s(?![a-z]+)/g, '')
                })
            }
        }, 1000)
    }
})