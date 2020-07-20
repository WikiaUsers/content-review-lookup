// Accordion
function Accordion(target, config){
    this.target = target;
    this.panelSelector = ['section', 'div', 'article'].map(function(element){
        var selector = target.concat(' '.concat(element));
        return selector;
    }).join(', ');
    this.collapsed = (typeof config == 'object') ? (config.collapsed || false) : false;
    this.idBase = (typeof config == 'object') ? (config.idBase || 'accordion') : 'accordion';
    this.duration = (typeof config == 'object') ? (config.duration || null) : null;
    this.replace = (typeof config == 'object') ? (config.replace || false) : false;
    this.replaceTarget = (this.replace === true) ? config.replaceTarget : '';
    this.append = (this.replace === false && typeof config == 'object') ? (config.append || false) : false;
    this.appendTarget = (this.append === true) ? config.appendTarget : '';
    this.init();
}

Accordion.prototype.hideAllPanels = function(){
    if (this.collapsed === true){
        var $panels = $(this.panelSelector);
        $panels.hide();
    }
};

Accordion.prototype.init = function(){
    var $panels = $('<section class="AccordionWrapper accordion-wrapper" />');
    if (this.replace === true){
        
    }
};