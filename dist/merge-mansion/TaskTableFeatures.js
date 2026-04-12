(function () {
      function init() {
          var checkboxCell = document.querySelector('[data-tpt-id="TaskTableFeatures"] .table-progress-checkbox-cell');
          if (!checkboxCell) {
              setTimeout(init, 500);
              return;
          }

          function applyState() {
              var checked = checkboxCell.getAttribute('data-sort-value') === '1';
              document.querySelectorAll('.taskTable .tokensColumn').forEach(function (cell) {
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