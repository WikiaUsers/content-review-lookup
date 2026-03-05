(function ($) {
  $(function () {
    var container = $(".portable-infobox.theme-yuri, .portable-infobox").first();
    if (!container.length) return;

    // ... inside $(function () { ...

var mediumRow = container.find('.pi-item.pi-data[data-source="medium"]');
if (!mediumRow.length) return;

// Prefer hidden raw span for clean parsing
var rawSpan = mediumRow.find('.medium-raw');
var rawMedium = rawSpan.length 
  ? rawSpan.text().trim() 
  : mediumRow.find('.pi-data-value').text().trim();  // fallback if needed

if (!rawMedium) return;

var mediaOrder = rawMedium
  .toLowerCase()
  .split(/[,，、;；|]+/)
  .map(s => s.trim())
  .filter(Boolean);

if (!mediaOrder.length) return;

    var sections = container.find("section.pi-group");
    if (!sections.length) return;

    // Map headers to sections
    var sectionMap = {};
    sections.each(function () {
      var section = $(this);
      var header = section.find(".pi-header").text().trim().toLowerCase();
      mediaOrder.forEach(function (m) {
        if (header.includes(m)) sectionMap[m] = section;
      });
    });

    // Find all media sections that exist
    var mediaSections = mediaOrder.map(m => sectionMap[m]).filter(Boolean);
    if (!mediaSections.length) return;

    // The first section stays in place
    var firstSection = mediaSections.shift();

    // Detach the rest
    mediaSections.forEach(s => s.detach());

    // Re-insert in order after firstSection
    var insertAfter = firstSection;
    mediaSections.forEach(function (s) {
      s.insertAfter(insertAfter);
      insertAfter = s;
    });

  });
})(jQuery);