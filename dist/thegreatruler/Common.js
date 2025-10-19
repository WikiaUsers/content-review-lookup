/* Any JavaScript here will be loaded for all users on every page load. */

$(document).ready(function() {
  $('.tabbed-box').each(function() {
    var $box = $(this);
    var tabNames = $box.data('tabs').split(',').filter(Boolean);
    var contents = $box.data('contents').split(',').filter(Boolean);
    
    if (tabNames.length === 0) return; // No tabs defined
    
    var $tabsContainer = $box.find('.tabber-tabs');
    var $contentContainer = $box.find('.tabber-content');
    
    // Generate tabs
    tabNames.forEach(function(name, index) {
      var isActive = index === 0 ? ' active' : '';
      $tabsContainer.append('<a href="#" class="tab-link' + isActive + '" data-tab="tab-' + name + '">' + name + '</a>');
      $contentContainer.append('<div class="tab-content' + isActive + '" id="tab-' + name + '">' + (contents[index] || '') + '</div>');
    });
    
    // Tab switching
    $tabsContainer.find('a').click(function(e) {
      e.preventDefault();
      var tabId = $(this).data('tab');
      $box.find('.tab-content').removeClass('active');
      $box.find('#' + tabId).addClass('active');
      $box.find('.tabber-tabs a').removeClass('active');
      $(this).addClass('active');
    });
  });
});