console.log("DynamicRemainingItemsTable Script Executed")
// ==========================
// DynamicRemainingItemsTable.js  (VERSION 5.5)
// ==========================

mw.hook('wikipage.content').add(function ($content) {
  try {
    console.log("🚀 [RemainingItems] wikipage.content fired");

    // --- Find control table + checkbox directly via static id ---
    const featureId = "DynamicRemainingItems";
    const featureTable = document.querySelector(`table[data-tpt-id="${featureId}"]`);
    if (!featureTable) {
      console.log(`ℹ️ [RemainingItems] Feature table not found: ${featureId}`);
      return;
    }
    const featureCheckbox = featureTable.querySelector('input[type="checkbox"]');
    if (!featureCheckbox) {
      console.log("ℹ️ [RemainingItems] Feature checkbox not found in control table.");
      return;
    }

    // Global holder
    window.__RemainingItems = window.__RemainingItems || {};

    // Disconnect previous observer (if any) to avoid duplicates on repeated hooks
    if (window.__RemainingItems.toggleObserver) {
      try { window.__RemainingItems.toggleObserver.disconnect(); } catch(e){}
      window.__RemainingItems.toggleObserver = null;
    }

    // --- Singleton feature module ---
    if (!window.__RemainingItems.feature) {
      window.__RemainingItems.feature = (function () {
        let taskTable = null;
        let areaTable = null;

        let onTaskClick = null;
        let onTaskKeyup = null;

        let enabled = false;

        // rAF management (so we can hard-cancel on teardown)
        let rafIds = [];
        function scheduleRAF(fn) {
          const id = requestAnimationFrame(() => {
            rafIds = rafIds.filter(x => x !== id);
            fn();
          });
          rafIds.push(id);
          return id;
        }
        function cancelAllRAF() {
          rafIds.forEach(id => cancelAnimationFrame(id));
          rafIds = [];
        }

        let updateScheduled = false;

        // Helpers
        const fmt = (n) => Number(n).toLocaleString("en-US");
        const parseIntSafe = (s) => parseInt(String(s).replace(/[^\d-]/g, ""), 10) || 0;

        const isFooterRow = (tr) => {
          const th1 = tr.querySelector('th[colspan="2"]');
          const th2 = tr.querySelector('th.center:not([rowspan])');
          return !!(th1 && th2);
        };

        // Global “Area Completed!” row helpers
        const tableHeaderRow = () => areaTable?.querySelector("tbody > tr:first-child");

        function ensureGlobalCompletedRow() {
          if (!enabled) return null;
          let row = areaTable.querySelector("tr.area-completed-global");
          if (row) return row;

          const header = tableHeaderRow();
          if (!header) return null;

          row = document.createElement("tr");
          row.className = "area-completed-global center";
          const td = document.createElement("td");
          td.setAttribute("colspan", "3");

          const span = document.createElement("span");
          // NOTE: your CSS should define span.areaCompleted::after (checkmark icon)
          span.className = "fancy areaCompleted";
          span.textContent = "Area Completed!";
          span.style.fontSize = "18px";
          span.style.padding = "10px 0 10px 0";

          td.appendChild(span);
          row.appendChild(td);

          row.style.opacity = "0";
          row.style.transition = "opacity 1.5s";
          header.insertAdjacentElement("afterend", row);
          requestAnimationFrame(() => { if (enabled) row.style.opacity = "1"; });

          return row;
        }

        function removeGlobalCompletedRow() {
          const row = areaTable?.querySelector("tr.area-completed-global");
          if (row) row.remove();
        }

        // Quantities parsing (strip spans, split by <br>, detect leading "Nx")
        function extractQuantitiesFromCell(cell) {
          const clone = cell.cloneNode(true);
          clone.querySelectorAll("span").forEach(s => s.remove());
          const parts = clone.innerHTML.split(/<br\s*\/?>/i);
          const quantities = parts.map((part, idx) => {
            const tmp = document.createElement("div");
            tmp.innerHTML = part;
            const raw = (tmp.textContent || "").replace(/\u00A0/g, " ").trim();
            const m = raw.match(/(\d+)\s*[x×]/i);
            const qty = m ? parseInt(m[1], 10) : 1;
            console.log(`   📏 [RI] Line ${idx + 1}: "${raw}" → qty=${qty}`);
            return qty;
          });
          return quantities;
        }

        function parseItems(cell) {
          const items = [];
          if (!cell) return items;
          const anchors = Array.from(cell.querySelectorAll("a"));
          const quantities = extractQuantitiesFromCell(cell);
          anchors.forEach((a, i) => {
            const name = a.textContent.trim();
            const qty = Number.isFinite(quantities[i]) ? quantities[i] : 1;
            console.log(`➡️ [RI] Item #${i + 1}: ${name}, qty=${qty}`);
            items.push({ name, qty });
          });
          if (quantities.length !== anchors.length) {
            console.log(`⚠️ [RI] Anchors=${anchors.length} vs lines=${quantities.length}. Missing qty = 1.`);
          }
          return items;
        }

        // Build groups from original headers: from each .startOfTheGroup until next header/footer
        function buildGroups() {
          const allRows = Array.from(areaTable.querySelectorAll("tr"));
          const headerRows = allRows.filter(tr =>
            tr.classList.contains("startOfTheGroup") &&
            tr.querySelector('th.center[rowspan]:not([data-cloned-total])')
          );

          const groups = headerRows.map((headerTr) => {
            const headerTh = headerTr.querySelector('th.center[rowspan]:not([data-cloned-total])');
            const rows = [headerTr];
            let r = headerTr.nextElementSibling;
            while (r) {
              const isNextHeader = r.classList.contains("startOfTheGroup") &&
                r.querySelector('th.center[rowspan]:not([data-cloned-total])');
              if (isNextHeader || isFooterRow(r)) break;
              rows.push(r);
              r = r.nextElementSibling;
            }
            return { headerTr, headerTh, rows };
          });
          return groups;
        }

        // Move visual .newItemGroup to current visible group start
        function moveNewItemGroupClass(g, visibleStartRow) {
          g.rows.forEach(r => r.classList.remove("newItemGroup"));
          if (visibleStartRow) visibleStartRow.classList.add("newItemGroup");
        }

        function recomputeTotals() {
          if (!enabled) return;
          console.log("🧮 [RI] Recomputing group totals (Total in L1) …");
          const groups = buildGroups();
          groups.forEach((g) => {
            let sum = 0;
            g.rows.forEach(tr => {
              if (tr.style.display === "none" || tr.classList.contains("area-completed-global")) return;
              const nameCell = tr.querySelector("td:nth-child(1) a");
              const amountCell = tr.querySelector("td:nth-child(2)");
              if (!nameCell || !amountCell) return;
              const amount = parseIntSafe(amountCell.textContent);
              const levelMatch = nameCell.textContent.match(/\(L\s*(\d+)\s*\)/i);
              const level = levelMatch ? parseInt(levelMatch[1], 10) : 1;
              const weight = Math.pow(2, Math.max(0, level - 1));
              sum += amount * weight;
            });
            g.headerTh.textContent = fmt(sum);
            const clone = g.rows.map(r => r.querySelector('th.center[data-cloned-total="1"]')).find(Boolean);
            if (clone) clone.textContent = fmt(sum);
          });
        }

        function recomputeGrandTotal() {
          if (!enabled) return;
          const footer = Array.from(areaTable.querySelectorAll("tr")).find(isFooterRow);
          if (!footer) return;
          const footerCell = footer.querySelector('th.center:not([rowspan])');
          if (!footerCell) return;

          const groupHeaders = Array.from(areaTable.querySelectorAll('tr.startOfTheGroup th.center[rowspan]:not([data-cloned-total])'));
          const sum = groupHeaders.reduce((acc, th) => acc + parseIntSafe(th.textContent), 0);

          footerCell.textContent = fmt(sum);
          footer.style.display = ""; // keep footer visible
          console.log(`🏁 [RI] Grand Total: ${fmt(sum)}`);
        }

        function hideZeroRowsAndFixRowspans() {
          if (!enabled) return;
          console.log("🙈 [RI] Hiding zero rows & fixing rowspans …");
          const groups = buildGroups();

          groups.forEach((g) => {
            // Remove any old TH clones within group
            g.rows.forEach(r => {
              const oldClone = r.querySelector('th.center[data-cloned-total="1"]');
              if (oldClone) oldClone.remove();
            });

            // Read amounts
            const amounts = g.rows.map(tr => {
              const td = tr.querySelector("td:nth-child(2)");
              return td ? parseIntSafe(td.textContent) : 0;
            });

            const allZero = amounts.every(v => v === 0);
            const headerIsZero = amounts[0] === 0;

            if (allZero) {
              // Entire group is zero → hide everything including header
              g.rows.forEach(tr => tr.style.display = "none");
              g.headerTr.style.display = "none";
              moveNewItemGroupClass(g, null);
              console.log("   [RI] Group all-zero → hidden");
              return;
            }

            // Standard hide/show
            g.headerTr.style.display = headerIsZero ? "none" : "";
            g.rows.forEach((tr, idx) => {
              if (idx === 0) return;
              tr.style.display = amounts[idx] === 0 ? "none" : "";
            });

            const visibleRows = g.rows.filter(tr => tr.style.display !== "none");
            const newSpan = Math.max(1, visibleRows.length);

            if (headerIsZero) {
              // Clone TH to first visible row
              const recipient = visibleRows[0];
              if (recipient) {
                const clone = g.headerTh.cloneNode(true);
                clone.setAttribute("data-cloned-total", "1");
                clone.style.display = "";
                clone.setAttribute("rowspan", String(newSpan));
                clone.textContent = g.headerTh.textContent;
                recipient.appendChild(clone);

                g.headerTh.setAttribute("rowspan", String(newSpan));
                g.headerTh.style.display = "none";

                moveNewItemGroupClass(g, recipient);
                console.log(`   [RI] Header=0 → TH cloned, rowspan=${newSpan}`);
              }
            } else {
              g.headerTh.style.display = "";
              g.headerTh.setAttribute("rowspan", String(newSpan));
              moveNewItemGroupClass(g, g.headerTr);
              console.log(`   [RI] Header≠0 → rowspan=${newSpan}`);
            }
          });

          // Footer must remain visible
          const footer = Array.from(areaTable.querySelectorAll("tr")).find(isFooterRow);
          if (footer) footer.style.display = "";
        }

        function scheduleUpdate() {
          if (!enabled) return;
          if (updateScheduled) return;
          updateScheduled = true;
          scheduleRAF(() => {
            updateScheduled = false;
            if (!enabled) return;
            updateSummary();
          });
        }

        function updateSummary() {
          if (!enabled) return;
          console.log("🔄 [RI] updateSummary start");

          // Reset layout (keep footer), remove global completed row & TH clones
          areaTable.querySelectorAll("tr").forEach(tr => {
            if (!isFooterRow(tr)) tr.style.display = "";
          });
          removeGlobalCompletedRow();
          areaTable.querySelectorAll('th.center[data-cloned-total="1"]').forEach(clone => clone.remove());
          areaTable.querySelectorAll("th.center[rowspan]:not([data-cloned-total])").forEach(th => {
            const original = th.dataset.originalRowspan;
            if (original) th.setAttribute("rowspan", original);
            th.style.display = "";
          });

          // Reset amounts to original
          areaTable.querySelectorAll("tr").forEach(tr => {
            const amountCell = tr.querySelector("td:nth-child(2)");
            if (amountCell && amountCell.dataset.original) {
              amountCell.textContent = amountCell.dataset.original;
            }
          });

          // Subtract items from checked tasks
          taskTable.querySelectorAll("tbody tr").forEach(tr => {
            const checkCell = tr.querySelector(".table-progress-checkbox-cell");
            if (checkCell && checkCell.dataset.sortValue === "1") {
              const items = parseItems(tr.querySelector("td:nth-child(5)"));
              items.forEach(item => {
                areaTable.querySelectorAll("tr").forEach(sumRow => {
                  if (isFooterRow(sumRow)) return;
                  const nameCell = sumRow.querySelector("a");
                  const amountCell = sumRow.querySelector("td:nth-child(2)");
                  if (!nameCell || !amountCell) return;
                  if (nameCell.textContent.trim() === item.name) {
                    if (!amountCell.dataset.original) {
                      amountCell.dataset.original = amountCell.textContent.trim();
                    }
                    const current = parseIntSafe(amountCell.textContent);
                    const newVal = Math.max(0, current - item.qty);
                    amountCell.textContent = String(newVal);
                  }
                });
              });
            }
          });

          // Hide zero rows + fix rowspans
          hideZeroRowsAndFixRowspans();
          // Recompute group totals
          recomputeTotals();
          // Recompute Grand Total (footer)
          recomputeGrandTotal();

          // Global "Area Completed!" if grand total is 0
          let grand = 0;
          const footer = Array.from(areaTable.querySelectorAll("tr")).find(isFooterRow);
          if (footer) {
            const footerCell = footer.querySelector('th.center:not([rowspan])');
            if (footerCell) grand = parseIntSafe(footerCell.textContent);
          }
          if (grand === 0) {
            ensureGlobalCompletedRow();
          } else {
            removeGlobalCompletedRow();
          }

          console.log("✅ [RI] updateSummary done");
        }

        function bindTaskListeners() {
          if (onTaskClick && taskTable) taskTable.removeEventListener("click", onTaskClick);
          if (onTaskKeyup && taskTable) taskTable.removeEventListener("keyup", onTaskKeyup);

          onTaskClick = (e) => {
            const cell = e.target.closest(".table-progress-checkbox-cell");
            if (!cell) return;
            setTimeout(() => { scheduleUpdate(); }, 0);
          };
          onTaskKeyup = (e) => {
            if (e.key !== " " && e.key !== "Enter") return;
            const cell = e.target.closest(".table-progress-checkbox-cell");
            if (!cell) return;
            setTimeout(() => { scheduleUpdate(); }, 0);
          };

          taskTable.addEventListener("click", onTaskClick);
          taskTable.addEventListener("keyup", onTaskKeyup);
        }

        // ---------- Unconditional recompute used by teardown ----------
        function recomputeAllTotalsUnconditional() {
          // Build groups (like buildGroups but without enabled guard)
          const groups = (function build() {
            const allRows = Array.from(areaTable.querySelectorAll("tr"));
            const headerRows = allRows.filter(tr =>
              tr.classList.contains("startOfTheGroup") &&
              tr.querySelector('th.center[rowspan]:not([data-cloned-total])')
            );
            return headerRows.map((headerTr) => {
              const headerTh = headerTr.querySelector('th.center[rowspan]:not([data-cloned-total])');
              const rows = [headerTr];
              let r = headerTr.nextElementSibling;
              while (r) {
                const isNextHeader = r.classList.contains("startOfTheGroup") &&
                  r.querySelector('th.center[rowspan]:not([data-cloned-total])');
                if (isNextHeader || isFooterRow(r)) break;
                rows.push(r);
                r = r.nextElementSibling;
              }
              return { headerTr, headerTh, rows };
            });
          })();

          groups.forEach((g) => {
            let sum = 0;
            g.rows.forEach(tr => {
              const nameCell = tr.querySelector("td:nth-child(1) a");
              const amountCell = tr.querySelector("td:nth-child(2)");
              if (!nameCell || !amountCell) return;
              const amount = parseIntSafe(amountCell.textContent);
              const levelMatch = nameCell.textContent.match(/\(L\s*(\d+)\s*\)/i);
              const level = levelMatch ? parseInt(levelMatch[1], 10) : 1;
              const weight = Math.pow(2, Math.max(0, level - 1));
              sum += amount * weight;
            });
            g.headerTh.textContent = fmt(sum);
          });

          // Grand total
          const footer = Array.from(areaTable.querySelectorAll("tr")).find(isFooterRow);
          if (footer) {
            const footerCell = footer.querySelector('th.center:not([rowspan])');
            if (footerCell) {
              const groupHeaders = Array.from(areaTable.querySelectorAll('tr.startOfTheGroup th.center[rowspan]:not([data-cloned-total])'));
              const sum = groupHeaders.reduce((acc, th) => acc + parseIntSafe(th.textContent), 0);
              footerCell.textContent = fmt(sum);
            }
            footer.style.display = "";
          }
        }

        // --- Public API ---
        return {
          init() {
            if (enabled) return;
            console.log("🧩 [RemainingItems] init()");

            taskTable = document.querySelector(".taskTable");
            areaTable = document.querySelector(".areaSummedRequiremetsTable");

            if (!taskTable || !areaTable) {
              console.warn("❌ [RemainingItems] Required tables not found (.taskTable / .areaSummedRequiremetsTable).");
              return;
            }

            // Persist originals and mark group starts
            areaTable.querySelectorAll("tr").forEach(tr => {
              const amountCell = tr.querySelector("td:nth-child(2)");
              if (amountCell && !amountCell.dataset.original) {
                amountCell.dataset.original = amountCell.textContent.trim();
              }
            });
            areaTable.querySelectorAll("th.center[rowspan]").forEach(th => {
              if (!th.dataset.originalRowspan) {
                th.dataset.originalRowspan = th.getAttribute("rowspan") || "1";
              }
            });
            areaTable.querySelectorAll("tr").forEach(tr => {
              const th = tr.querySelector('th.center[rowspan]:not([data-cloned-total])');
              if (th) tr.classList.add("startOfTheGroup");
            });

            // Bind listeners
            bindTaskListeners();

            enabled = true;
            console.log("✅ [RemainingItems] Feature ENABLED");

            // Initial compute (double rAF, guarded)
            scheduleRAF(() => {
              if (!enabled) return;
              scheduleRAF(() => {
                if (!enabled) return;
                updateSummary();
              });
            });
          },

          refresh() {
            if (!enabled) {
              console.log("ℹ️ [RemainingItems] refresh() while disabled → init()");
              this.init();
              return;
            }
            console.log("♻️ [RemainingItems] refresh()");

            const newTask = document.querySelector(".taskTable");
            const newArea = document.querySelector(".areaSummedRequiremetsTable");
            const taskChanged = newTask && newTask !== taskTable;

            if (!newTask || !newArea) {
              console.warn("⚠️ [RemainingItems] Tables missing on refresh; skipping.");
              return;
            }

            taskTable = newTask;
            areaTable = newArea;

            if (taskChanged) {
              console.log("🔁 [RemainingItems] taskTable replaced → rebind listeners");
              bindTaskListeners();
            }

            // Ensure originals exist (idempotent)
            areaTable.querySelectorAll("tr").forEach(tr => {
              const amountCell = tr.querySelector("td:nth-child(2)");
              if (amountCell && !amountCell.dataset.original) {
                amountCell.dataset.original = amountCell.textContent.trim();
              }
            });
            areaTable.querySelectorAll("th.center[rowspan]").forEach(th => {
              if (!th.dataset.originalRowspan) {
                th.dataset.originalRowspan = th.getAttribute("rowspan") || "1";
              }
            });
            areaTable.querySelectorAll("tr").forEach(tr => {
              const th = tr.querySelector('th.center[rowspan]:not([data-cloned-total])');
              if (th) tr.classList.add("startOfTheGroup");
            });

            // Full recompute (double rAF, guarded)
            scheduleRAF(() => {
              if (!enabled) return;
              scheduleRAF(() => {
                if (!enabled) return;
                updateSummary();
              });
            });
          },

          teardown() {
            // Allow calling twice; second call still restores a consistent table.
            console.log("🧹 [RemainingItems] teardown()");

            // Stop future work
            enabled = false;
            cancelAllRAF();
            updateScheduled = false;

            // Remove listeners
            if (onTaskClick && taskTable) taskTable.removeEventListener("click", onTaskClick);
            if (onTaskKeyup && taskTable) taskTable.removeEventListener("keyup", onTaskKeyup);
            onTaskClick = null;
            onTaskKeyup = null;

            // Restore table (show all rows, remove clones, reset spans & amounts)
            if (areaTable) {
              areaTable.querySelectorAll("tr").forEach(tr => tr.style.display = "");
              areaTable.querySelectorAll('th.center[data-cloned-total="1"]').forEach(clone => clone.remove());
              removeGlobalCompletedRow();
              areaTable.querySelectorAll("th.center[rowspan]:not([data-cloned-total])").forEach(th => {
                const original = th.dataset.originalRowspan;
                if (original) th.setAttribute("rowspan", original);
                th.style.display = "";
              });
              areaTable.querySelectorAll("tr").forEach(tr => {
                const amountCell = tr.querySelector("td:nth-child(2)");
                if (amountCell && amountCell.dataset.original) {
                  amountCell.textContent = amountCell.dataset.original;
                }
              });

              // Recompute group totals + grand total (even while disabled)
              recomputeAllTotalsUnconditional();
            }

            console.log("❎ [RemainingItems] Feature DISABLED (restored original table + totals recomputed)");
          },

          isEnabled() { return enabled; }
        };
      })();
    }

    const Feature = window.__RemainingItems.feature;

    // --- Observe toggle cell's data-sort-value (0/1) and react ---
    const toggleCell = featureCheckbox.closest('.table-progress-checkbox-cell');
    if (!toggleCell) {
      console.warn("⚠️ [RemainingItems] Toggle cell (.table-progress-checkbox-cell) not found next to feature checkbox.");
    } else {
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.type === 'attributes' && m.attributeName === 'data-sort-value') {
            const val = toggleCell.getAttribute('data-sort-value');
            console.log(`👀 [RemainingItems] Toggle cell data-sort-value changed → ${val}`);
            if (val === "1") {
              if (Feature.isEnabled()) Feature.refresh(); else Feature.init();
            } else {
              Feature.teardown();
            }
          }
        }
      });
      observer.observe(toggleCell, { attributes: true, attributeFilter: ['data-sort-value'] });
      window.__RemainingItems.toggleObserver = observer;

      // Apply current state at load
      const initialVal = toggleCell.getAttribute('data-sort-value');
      if (initialVal === "1") {
        if (Feature.isEnabled()) Feature.refresh(); else Feature.init();
      } else {
        Feature.teardown();
      }
    }

    // Fallback checkbox 'change' listener (in case data-sort-value doesn't flip):
    if (!featureCheckbox.dataset.riBound) {
      featureCheckbox.dataset.riBound = "1";
      featureCheckbox.addEventListener("change", function () {
        if (this.checked) {
          if (Feature.isEnabled()) Feature.refresh(); else Feature.init();
        } else {
          Feature.teardown();
        }
      });
    }

  } catch (err) {
    console.error("💥 [RemainingItems] Init error:", err);
  }
});

console.log("DynamicRemainingItemsTable Script END")