mw.hook('wikipage.editform').add(function($editForm) {
  var editForm = $editForm.get(0);
  
  addToolbarSection(
  	editForm.querySelector('.wikiEditor-ui-toolbar'),
    'json-data',
    [{
      name: 'json-data-ui',
      tools: [{
        name: 'add-edit',
        title: 'Add/Edit data',
        fn: function() {
          window.open('Staffeln/Episodes.json?episode=Abgezogen&jsonAction=edit');
        }
      }],
    }]
  );
});

function addToolbarSectionGroupTool(toolbarSectionGroupEl, tool) {
  var toolEl, toolBtnEl;
  toolbarSectionGroupEl.append(toolEl = Object.assign(document.createElement('span'), {
    rel: tool.name,
    className: [
      'tool',
      'oo-ui-widget',
      'oo-ui-widget-enabled',
      'oo-ui-buttonElement',
      'oo-ui-buttonElement-frameless',
      'oo-ui-iconElement',
      'oo-ui-buttonWidget',
    ].join(' '),
  }));
  toolEl.append(toolBtnEl = Object.assign(document.createElement('a'), {
    rel: 'nofollow',
    className: 'oo-ui-buttonElement-button',
    role: 'button',
    title: tool.title,
    tabindex: 0,
    textContent: 'Add/Edit'
  }));
  toolBtnEl.addEventListener('click', tool.fn);
}

function addToolbarSectionGroup(toolbarSectionEl, group) {
  var toolbarSectionGroup;
  toolbarSectionEl.append(toolbarSectionGroup = Object.assign(document.createElement('div'), {
    rel: 'codeeditor-' + group.name,
    className: [
      'group',
      'group-codeeditor-' + group.name,
    ].join(' '),
  }));
  
  group.tools.forEach(addToolbarSectionGroupTool.bind(this, toolbarSectionGroup));
}

function addToolbarSection(toolbarEl, sectionName, groups) {
  var toolbarSection;
  var beforeEl;
  
  for (var i in toolbarEl.children) {
    if (!toolbarEl.children.item(i).id.startsWith('wikiEditor-section-')) {
      beforeEl = toolbarEl.children.item(i);
      break;
    }
  }
  
  beforeEl.before(toolbarSection = Object.assign(document.createElement('div'), {
    id: 'wikiEditor-section-' + sectionName,
    rel: sectionName,
    className: [
      'toolbar',
      'section',
      'section-' + sectionName,
    ].join(' '),
  }));
  
  groups.forEach(addToolbarSectionGroup.bind(this, toolbarSection));
}