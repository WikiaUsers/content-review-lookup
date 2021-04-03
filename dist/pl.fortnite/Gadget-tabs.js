$(function() {
    var tabsarray = $("#new-tabs div.tab-name").toArray();
    var contentarray = $("#new-tabs div.tab-content").toArray();
    console.log(tabsarray);
    console.log(contentarray);

    var tabPanels = []

    for (i in tabsarray) {
        var tab = new OO.ui.TabPanelLayout(tabsarray[i].className, {
            label: tabsarray[i].innerText,
        });
tab.$element.append(contentarray[i]);
        tabPanels.push(tab);
        console.log(tabPanels);
        i++;
    }


    var tabPanel1 = new OO.ui.TabPanelLayout('one', {
        label: 'Tab panel one'
    });
    var tabPanel2 = new OO.ui.TabPanelLayout('two', {
        label: 'Tab panel two'
    });

    tabPanel1.$element.append('<p>First tab panel</p>');
    tabPanel2.$element.append('<p>Second tab panel</p>');

    var index = new OO.ui.IndexLayout();

    index.addTabPanels(tabPanels);
    $('#new-tabs').append(index.$element);
});