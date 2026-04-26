console.log("JewelsFilter loaded");
$(function () {

  function applyFilter() {

    const types = $('.filter-type.active').map(function () {
      return $(this).data('value');
    }).get();

    const parts = $('.filter-part.active').map(function () {
      return $(this).data('value');
    }).get();

    const search = ($('#filter-search').val() || '').toLowerCase();

    const groups = {};

    $('.jewel-row').each(function () {
      const row = $(this);
      const group = row.data('group');

      if (!groups[group]) {
        groups[group] = {
          rows: [],
          name: row.data('name') || '',
          type: row.data('type') || '',
          parts: row.data('parts') || ''
        };
      }

      groups[group].rows.push(row);
    });

    Object.values(groups).forEach(g => {
      let show = true;

      if (types.length && !types.includes(g.type)) {
        show = false;
      }

      if (parts.length) {
        let match = parts.some(p => g.parts.includes(p));
        if (!match) show = false;
      }

      if (search && !g.name.includes(search)) {
        show = false;
      }

      g.rows.forEach(r => r.toggle(show));
    });
  }

  // toggle button
  $(document).on('click', '.filter-btn', function () {
    $(this).toggleClass('active');
    applyFilter();
  });

  $(document).on('input', '#filter-search', applyFilter);

});