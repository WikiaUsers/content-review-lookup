 (function () {
      function init() {
          var checkboxCell = document.querySelector('[data-tpt-id="UsesTableFeatures"] .table-progress-checkbox-cell');
          if (!checkboxCell) {
              setTimeout(init, 500);
              return;
          }

          var tempCells = document.querySelectorAll('.itemUsesTable .mm-tempCol');

          // Nothing to hide on this page → hide the feature row (but keep the table for other future features)
          if (tempCells.length === 0) {
              var row = checkboxCell.closest('tr');
              if (row) row.style.display = 'none';
              return;
          }

          function applyState() {
              var checked = checkboxCell.getAttribute('data-sort-value') === '1';
              tempCells.forEach(function (cell) {
                  cell.style.display = checked ? 'none' : '';
              });
          }

          applyState();

          new MutationObserver(function () {
              applyState();
          }).observe(checkboxCell, { attributes: true, attributeFilter: ['data-sort-value'] });
      }

      if (document.readyState === 'complete') {
          init();
      } else {
          window.addEventListener('load', init);
      }
  })();