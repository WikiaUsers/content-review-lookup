$(function () {
  // Search filter box
  $('#search').html(
    '<input id="searchInput" class="rsw-search" placeholder="Filter name...">'
  );

  // Type filter
  $('#filter-type').html(
    '<select id="filterType" class="rsw-filter">' +
      '<option value="">All Types</option>' +
      '<option value="fruit-type-paramecia">Paramecia</option>' +
      '<option value="fruit-type-zoan">Zoan</option>' +
      '<option value="fruit-type-logia">Logia</option>' +
    '</select>'
  );

  // Grade filter
  $('#filter-grade').html(
    '<select id="filterGrade" class="rsw-filter">' +
      '<option value="">All Grades</option>' +
      '<option value="grade-a">Grade A</option>' +
      '<option value="grade-b">Grade B</option>' +
      '<option value="grade-c">Grade C</option>' +
      '<option value="grade-d">Grade D</option>' +
      '<option value="grade-e">Grade E</option>' +
      '<option value="grade-f">Grade F</option>' +
    '</select>'
  );

  // Filtering logic
  function filterItems () {
    const search = $('#searchInput').val().trim().toLowerCase();

    const filters = {
      type  : $('#filterType').val(),
      grade : $('#filterGrade').val()
    };

    $('#itemList > div').each(function () {
      const $t = $(this);


      const textOk =
        !search ||
        ($t.attr('id')||'').toLowerCase().includes(search) ||
        $t.text().toLowerCase().includes(search);

      const catsOk = Object.entries(filters).every(([attr, val]) => {
        if (!val) return true;
        const list = ($t.data(attr) || '')
          .toString()
          .split(/\s+/);
        return list.includes(val);
      });

      $t.toggle(textOk && catsOk);
    });
  }

  // Bind events
  $(document).on('input change', '#searchInput, #filterType, #filterGrade', filterItems);
});