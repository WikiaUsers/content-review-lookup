/*<pre> */
// Une las filas de varias tablas en una misma tabla.
// (c) Jesús Martínez Novo (Ciencia Al Poder)
// Licencia/License: http://www.gnu.org/copyleft/gpl.html GNU General Public Licence 2.0 or later
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

cMergeTables = {
  btnTitle: 'Click to Merge All Tables.',
  timeoutToHide: 500,
  tableClassName: 'mergetable',
  mergeButton: false,
  init: function(){
    for (var i = 0, tables = document.getElementsByTagName('table'); i < tables.length; i++){
      var t = tables[i];
      if ((' '+t.className+' ').indexOf(' '+this.tableClassName+' ') != -1){
        if (t.rows.length < 1) continue;
        var header = null;
        if (t.tHead && t.tHead.rows.length > 0)
          header = t.tHead.rows[t.tHead.rows.length-1];
        else
          header = t.rows[0];
        t.cMergeTables = this;
        this.addEvent(header, 'mouseover', this.muestraMergeIcon);
        this.addEvent(header, 'mouseout', this.ocultaMergeIcon);
      }
    }
  },
  creaButton: function(){
    var button = document.createElement('div');
    button.id = 'mergetables-button';
    button.title = this.btnTitle;
    this.addEvent(button, 'click', this.uneTablas);
    this.addEvent(button, 'mouseover', this.muestraMergeIcon);
    this.addEvent(button, 'mouseout', this.ocultaMergeIcon);
    button.cMergeTables = this;
    return button;
  },
  muestraMergeIcon: function(event){
    var target = window.eventTargetElement(event);
    if (!target) return;
    if (!target.cMergeTables)
      target = window.parentElement(target, 'table');
    if (!target.cMergeTables) return;
    if (! target.cMergeTables.mergeButton)
      target.cMergeTables.mergeButton = target.cMergeTables.creaButton();
    if (target.cMergeTables.timeoutId){
      window.clearTimeout(target.cMergeTables.timeoutId);
      delete target.cMergeTables.timeoutId;
    }
    if (target.nodeName.toUpperCase() != 'TABLE') {
      return;
    }
    var table = target;
      table.parentNode.insertBefore(target.cMergeTables.mergeButton,table);
  },
  ocultaMergeIcon: function(event){
    var target = window.eventTargetElement(event);
    if (!target) return;
    if (!target.cMergeTables)
      target = window.parentElement(target, 'table');
    if (!target.cMergeTables) return;
    var icon = target.cMergeTables.mergeButton;
    if (icon && icon.parentNode && !target.cMergeTables.timeoutId)
      target.cMergeTables.timeoutId = window.setTimeout(function(){
        target.cMergeTables.mergeButton = target.cMergeTables.mergeButton.parentNode.removeChild(target.cMergeTables.mergeButton);
        delete target.cMergeTables.timeoutId;
      },target.cMergeTables.timeoutToHide);
  },
  uneTablas: function(event){
    var target = window.eventTargetElement(event);
    if (!target || !target.cMergeTables) return;
    target.cMergeTables.mergeButton.parentNode.removeChild(target.cMergeTables.mergeButton);
    delete target.cMergeTables.timeoutId;
    var parentTable = false;
    for (var i = 0, tables = document.getElementsByTagName('table'); i < tables.length; i++){
      var t = tables[i];
      if ((' '+t.className+' ').indexOf(' '+target.cMergeTables.tableClassName+' ') != -1){
        var header = null;
        if (t.tHead && t.tHead.rows.length > 0)
          header = t.tHead.rows[t.tHead.rows.length-1];
        else
          header = t.rows[0];
        target.cMergeTables.removeEvent(header, 'mouseover', target.cMergeTables.muestraMergeIcon);
        target.cMergeTables.removeEvent(header, 'mouseout', target.cMergeTables.ocultaMergeIcon);
        if (!parentTable){
          parentTable = t;
          continue;
        }
        if (t.rows.length <= 1 || t.tBodies.lenght < 1) continue;
        // Asumimos que sólo hay un tBody y saltamos la primera fila (se supone que es la cabecera del sorttable)
        while (t.tBodies[0].rows.length > 1){
          parentTable.tBodies[0].appendChild(t.tBodies[0].rows[1]);
        }
        t.parentNode.removeChild(t);
        i--;
	    }
	  }
  },
  addEvent: window.addHookEvent,
  removeEvent: function(el, event, funct){
    if (el.removeEventListener) {
      el.removeEventListener(event, funct, false);
    } else if (el.detachEvent) {
      try {
        el.detachEvent('on' + event, funct);
      } catch (e) {}
    }
  }
}

cMergeTables.init();

/* </pre> */