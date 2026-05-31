// ==========================
// DynamicRemainingItemsTable.js  (VERSION 5.10)
// ==========================
// 5.10: Inverted Next Area row priority. The "All tasks completed!" banner
//       in MediaWiki:TaskTableFeatures.js is now PRIMARY for rendering Next
//       Area (under the task table). This script suppresses its own
//       area-next-global row when the task-table banner already has one.
//       Includes a MutationObserver on the task table so dynamic changes to
//       the TTF banner (toggling Hide Completed Tasks) re-trigger our update.
// 5.9: Added "Show Only Remaining Rewards" feature — mirrors the existing
//      Items behaviour against the Rewards summary table (= the article-table
//      under the "Rewards" heading produced by Module:Areas.GetAreaRewards).
//      Subtracts each completed task's reward items + XP from the summary,
//      hides zero-count rows, and recomputes the Experience footer.
// 5.8: Exclude Active Tasks cloned table (.mmwt-active-tasks-table from
//      MediaWiki:TaskTableFeatures.js) from .taskTable lookup. Without this,
//      when the user enables "Show Table of Active Tasks" before "Show Only
//      Remaining Items" (or toggles Remaining off/on), document.querySelector
//      returns the cloned table (it shares class .taskTable and is inserted
//      BEFORE the main table), whose data-sort-value is mirrored once at
//      clone time and never updated → 0 subtractions → feature appears dead.

console.log("DynamicRemainingItemsTable Script Executed");

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
      try { window.__RemainingItems.toggleObserver.disconnect(); } catch (e) {}
      window.__RemainingItems.toggleObserver = null;
    }

    // --- Singleton feature module ---
    if (!window.__RemainingItems.feature) {
      window.__RemainingItems.feature = (function () {
        let taskTable = null;
        let areaTable = null;

        let onTaskClick = null;
        let onTaskKeyup = null;
        let taskBannerObserver = null; // v5.10: watches TTF banner add/remove

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

        // Global header row helper
        const tableHeaderRow = () => areaTable?.querySelector("tbody > tr:first-child");

        // ======= Area Completed + Next Area rows =======

        // v5.10: TaskTableFeatures.js banner takes priority for Next Area rendering.
        // Our own area-next-global row is suppressed when its row exists in the task table.
        function taskTableHasNextAreaRow() {
          return !!document.querySelector("table.taskTable tr.mmwt-next-area-row");
        }

        function ensureGlobalCompletedRow() {
          if (!enabled) return null;

          // If already created, check if state matches what TTF currently shows.
          let completedRow = areaTable.querySelector("tr.area-completed-global");
          let nextAreaRow = areaTable.querySelector("tr.area-next-global");
          const taskHasNextArea = taskTableHasNextAreaRow();
          // If task banner now has Next Area but we still render our copy, drop ours.
          if (taskHasNextArea && nextAreaRow) {
            nextAreaRow.remove();
            nextAreaRow = null;
          }
          // Already in the desired state?
          if (completedRow && (taskHasNextArea || nextAreaRow)) return completedRow;
          // (taskHasNextArea && completedRow) → no Next Area row needed; keep completedRow.
          if (taskHasNextArea && completedRow) return completedRow;

          const header = tableHeaderRow();
          if (!header) return null;

          // 1) Area Completed row
          completedRow = document.createElement("tr");
          completedRow.className = "area-completed-global center";
          const td1 = document.createElement("td");
          td1.setAttribute("colspan", "3");

          const span = document.createElement("span");
          span.className = "fancy areaCompleted";
          span.textContent = "Area Completed!";
          span.style.fontSize = "26px"; // bigger font as requested
          span.style.padding = "10px 0 10px 0";

          td1.appendChild(span);
          completedRow.appendChild(td1);

          completedRow.style.opacity = "0";
          completedRow.style.transition = "opacity 1.5s";

          header.insertAdjacentElement("afterend", completedRow);

          // 2) Next Area row (from data-source="unlocks") — only if TTF banner
          //     hasn't already added one in the task table (v5.10 priority).
          const unlockDiv = (!taskHasNextArea) ? document.querySelector('div[data-source="unlocks"]') : null;

          if (unlockDiv) {
            const valueDiv = unlockDiv.querySelector(".pi-data-value");
            if (valueDiv) {
              nextAreaRow = document.createElement("tr");
              nextAreaRow.className = "area-next-global center";

              const td2 = document.createElement("td");
              td2.setAttribute("colspan", "3");

              // Label "Next Area:"
              const label = document.createElement("span");
              label.className = "fancy";
              label.textContent = "Next Area:";
              label.style.fontSize = "18px";
              label.style.padding = "10px 0";
              td2.appendChild(label);

              // Wrapper for cloned unlock content
              const wrapper = document.createElement("div");
              wrapper.className = "fancy";
              wrapper.style.marginLeft = "20px";
              wrapper.style.display = "inline";

              // Clone inner HTML and tweak styles
              const html = valueDiv.innerHTML;
              const fixedHTML = html
                .replace(/--shrinker-multiplier:\s*[^;"]+/g, "--shrinker-multiplier: 10.666666666667")
                .replace(/width:\s*[^;"]+/g, "width: 48px")
                .replace(/height:\s*[^;"]+/g, "height: 48px");

              wrapper.innerHTML = fixedHTML;
              td2.appendChild(wrapper);
              nextAreaRow.appendChild(td2);

              nextAreaRow.style.opacity = "0";
              nextAreaRow.style.transition = "opacity 1.5s";

              completedRow.insertAdjacentElement("afterend", nextAreaRow);
            }
          }

          // Fade-in both rows (or just completed if no unlock found)
          requestAnimationFrame(() => {
            if (!enabled) return;
            completedRow.style.opacity = "1";
            if (nextAreaRow) nextAreaRow.style.opacity = "1";
          });

          return completedRow;
        }

        function removeGlobalCompletedRow() {
          const rows = areaTable?.querySelectorAll("tr.area-completed-global, tr.area-next-global");
          if (rows) rows.forEach(r => r.remove());
        }

        // ========= Quantities & item parsing =========

        // Quantities parsing (strip spans, split by <br>, detect leading "Nx")
        function extractQuantitiesFromCell(cell) {
		  const clone = cell.cloneNode(true);
		  clone.querySelectorAll("span").forEach(s => s.remove());
		  const parts = clone.innerHTML.split(/<br\s*\/?>/i);
		  const quantities = parts.map((part, idx) => {
		    const tmp = document.createElement("div");
		    tmp.innerHTML = part;
		    const raw = (tmp.textContent || "").replace(/\u00A0/g, " ").trim();
		
		    // 1) původní detekce "Nx" / "N×"  → zůstává
		    let qty = 1;
		    let m = raw.match(/(\d+)\s*[x×]/i);
		    if (m) {
		      qty = parseInt(m[1], 10);
		      console.log(`   📏 [RI] Line ${idx + 1}: "${raw}" → qty=${qty} (Nx/× match)`);
		    } else {
		      // 2) NOVÁ detekce: čisté číslo na řádku (např. "300" u Coinů)
		      const mPlain = raw.match(/^(\d+)\s*$/);
		      if (mPlain) {
		        qty = parseInt(mPlain[1], 10);
		        console.log(`   📏 [RI] Line ${idx + 1}: "${raw}" → qty=${qty} (plain number)`);
		      } else {
		        console.log(`   📏 [RI] Line ${idx + 1}: "${raw}" → qty=${qty} (fallback = 1)`);
		      }
		    }
		
		    return qty;
		  });
		  return quantities;
		}

        // Parse items from task table cell:
        //  - quantities are parsed from text (3x, 5×, …)
        //  - anchors = only links to real item pages (ignore Special:Upload "Level N" icons)
        function parseItems(cell) {
          const items = [];
          if (!cell) return items;

          // Module:Areas now wraps each item via utils.ItemLink which produces TWO
          // anchors per item: (1) icon anchor (<a><img></a>) and (2) text anchor with
          // display name. Filter to text anchors via "no <img> child" check (= robust
          // even when text anchor would happen to be empty due to layout edge cases).
          const anchors = Array
            .from(cell.querySelectorAll("a"))
            .filter(a => !/\/Special:Upload/i.test(a.getAttribute("href") || ""))
            .filter(a => !a.querySelector('img'));

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

        // Helper: finds the "item anchor" in area table row (ignores Special:Upload Level N links)
        function getItemAnchorFromRow(row) {
          if (!row) return null;
          // Same dual-anchor handling as parseItems: prefer anchor without <img>
          // (= text anchor). Falls back to first anchor if no text-only anchor found.
          const anchors = Array
            .from(row.querySelectorAll("td:nth-of-type(1) a"))
            .filter(a => !/\/Special:Upload/i.test(a.getAttribute("href") || ""));
          const textAnchor = anchors.find(a => !a.querySelector('img'));
          if (textAnchor) return textAnchor;
          // Fallback: first non-Special:Upload anchor; absolute last resort = first any
          return anchors[0] || row.querySelector("td:nth-of-type(1) a");
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

        // Move visual .newItemGroup to the current visible group start
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
              if (tr.style.display === "none" || tr.classList.contains("area-completed-global") || tr.classList.contains("area-next-global")) return;
              const nameCell = getItemAnchorFromRow(tr);
              const amountCell = tr.querySelector("td:nth-of-type(2)");
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
              const td = tr.querySelector("td:nth-of-type(2)");
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
              // Clone TH to the first visible row, but keep total as the LAST column
              const recipient = visibleRows[0];
              if (recipient) {
                const clone = g.headerTh.cloneNode(true);
                clone.setAttribute("data-cloned-total", "1");
                clone.style.display = "";
                clone.setAttribute("rowspan", String(newSpan));
                clone.textContent = g.headerTh.textContent;

                // Append as last cell -> column order stays [name][amount][total]
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
            const amountCell = tr.querySelector("td:nth-of-type(2)");
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
                  const nameCell = getItemAnchorFromRow(sumRow);
                  const amountCell = sumRow.querySelector("td:nth-of-type(2)");
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
          if (taskBannerObserver) { try { taskBannerObserver.disconnect(); } catch (e) {} taskBannerObserver = null; }

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

          // v5.10: watch task table for TTF banner / Next Area row appearing or disappearing
          // (e.g. user toggles Hide Completed Tasks). When that happens, rerun updateSummary
          // so our area-next-global row is shown/suppressed accordingly.
          taskBannerObserver = new MutationObserver((muts) => {
            for (const m of muts) {
              for (const n of m.addedNodes) {
                if (n.nodeType === 1 && (n.classList?.contains("mmwt-next-area-row") || n.classList?.contains("mmwt-all-completed-banner"))) {
                  scheduleUpdate(); return;
                }
              }
              for (const n of m.removedNodes) {
                if (n.nodeType === 1 && (n.classList?.contains("mmwt-next-area-row") || n.classList?.contains("mmwt-all-completed-banner"))) {
                  scheduleUpdate(); return;
                }
              }
            }
          });
          taskBannerObserver.observe(taskTable, { childList: true, subtree: true });
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
              const nameCell = getItemAnchorFromRow(tr);
              const amountCell = tr.querySelector("td:nth-of-type(2)");
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

            // :not(.mmwt-active-tasks-table) excludes the cloned table created by
            // MediaWiki:TaskTableFeatures.js #4 (Show Active Tasks). That clone shares
            // class .taskTable and is inserted BEFORE the main table, so a bare
            // querySelector(".taskTable") would pick it up first.
            taskTable = document.querySelector(".taskTable:not(.mmwt-active-tasks-table)");
            areaTable = document.querySelector(".areaSummedRequiremetsTable");

            if (!taskTable || !areaTable) {
              console.warn("❌ [RemainingItems] Required tables not found (.taskTable / .areaSummedRequiremetsTable).");
              return;
            }

            // Persist originals and mark group starts
            areaTable.querySelectorAll("tr").forEach(tr => {
              const amountCell = tr.querySelector("td:nth-of-type(2)");
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

            // See init() — exclude the Active Tasks cloned table.
            const newTask = document.querySelector(".taskTable:not(.mmwt-active-tasks-table)");
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
              const amountCell = tr.querySelector("td:nth-of-type(2)");
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
            if (taskBannerObserver) { try { taskBannerObserver.disconnect(); } catch (e) {} taskBannerObserver = null; }
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
                const amountCell = tr.querySelector("td:nth-of-type(2)");
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

// ==========================================================================
// Show Only Remaining Rewards — added in v5.9
// Independent IIFE-like singleton that mirrors the Items feature against the
// Rewards summary table (article-table under the "Rewards" heading rendered by
// Module:Areas.GetAreaRewards).  Subtracts each completed task's reward items
// (anchors in Rewards column 6 of the task table) + XP from the summary, hides
// zero-count rows, and recomputes the Experience footer.
// ==========================================================================

mw.hook('wikipage.content').add(function ($content) {
  try {
    console.log("🎁 [RemainingRewards] wikipage.content fired");

    const featureId = "DynamicRemainingItems"; // shared control table
    const rowId = "Show Only Remaining Rewards";

    const featureTable = document.querySelector(`table[data-tpt-id="${featureId}"]`);
    if (!featureTable) {
      console.log(`ℹ️ [RemainingRewards] Feature table not found: ${featureId}`);
      return;
    }
    // The control template puts each feature in its own <tr>. Rewards row has
    // <input data-tpt-row-id="Show Only Remaining Rewards"> wrapped by Tracker.
    const rowsInput = featureTable.querySelector(`[data-tpt-row-id="${rowId}"]`);
    if (!rowsInput) {
      console.log(`ℹ️ [RemainingRewards] Toggle row not found: "${rowId}". Template not yet updated?`);
      return;
    }
    const toggleCell = rowsInput.closest('.table-progress-checkbox-cell');
    if (!toggleCell) {
      console.warn(`⚠️ [RemainingRewards] Toggle row found but no .table-progress-checkbox-cell ancestor.`);
      return;
    }

    window.__RemainingRewards = window.__RemainingRewards || {};
    if (window.__RemainingRewards.toggleObserver) {
      try { window.__RemainingRewards.toggleObserver.disconnect(); } catch (e) {}
      window.__RemainingRewards.toggleObserver = null;
    }

    if (!window.__RemainingRewards.feature) {
      window.__RemainingRewards.feature = (function () {
        let taskTable = null;
        let rewardsTable = null;
        let rewardsCol = -1;       // column index of "Rewards" in task table header
        let onTaskClick = null;
        let onTaskKeyup = null;
        let enabled = false;

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

        const fmt = (n) => Number(n).toLocaleString("en-US");
        const parseIntSafe = (s) => parseInt(String(s).replace(/[^\d-]/g, ""), 10) || 0;

        // Locate the "Rewards" heading and find the next article-table.
        // Robust against page edits that introduce additional siblings.
        function findRewardsTable() {
          const span = document.querySelector('h1 #Rewards, h2 #Rewards, h3 #Rewards, h4 #Rewards, h5 #Rewards, span#Rewards.mw-headline');
          if (!span) return null;
          const heading = span.closest('h1, h2, h3, h4, h5');
          if (!heading) return null;
          let el = heading.nextElementSibling;
          while (el) {
            if (el.matches && el.matches('table.article-table')) return el;
            // Stop scanning if we've crossed into another section.
            if (el.matches && el.matches('h1, h2, h3, h4, h5')) return null;
            el = el.nextElementSibling;
          }
          return null;
        }

        // Locate the column index of "Rewards" in the task table header.
        function findRewardsColumnIndex(table) {
          const headerRow = table.querySelector('thead tr, tbody > tr, tr');
          if (!headerRow) return -1;
          const ths = headerRow.querySelectorAll('th');
          for (let i = 0; i < ths.length; i++) {
            if ((ths[i].textContent || '').trim() === 'Rewards') return i;
          }
          return -1;
        }

        // Parse a task's Rewards cell into { items: [{name, qty}], xp: number }.
        // Anchor text format produced by Module:Areas: "Energy Chest (L1)".
        // The Rewards summary uses just "Energy Chest" — strip the level suffix.
        function parseRewardCell(cell) {
          const out = { items: [], xp: 0 };
          if (!cell) return out;

          // XP: only when the cell actually contains an XP icon (otherwise the first
          // number could be the `(L7)` suffix from a level-bearing item label, which
          // would falsely inflate consumedXp on item-only reward cells).
          // Module:Areas emits XP as "<XP icon span> <number><br>...item anchors...".
          const cellText = (cell.textContent || '').replace(/ /g, ' ').trim();
          const hasXpIcon = !!(cell.querySelector('img[alt*="XP" i], span[title*="XP" i], [data-image-name*="XP" i]'));
          if (hasXpIcon) {
            const xpMatch = cellText.match(/([\d,]+)/);
            if (xpMatch) out.xp = parseIntSafe(xpMatch[1]);
          }

          // Items: every anchor with /wiki/ that's not the XP/Experience link.
          cell.querySelectorAll('a').forEach(a => {
            const href = a.getAttribute('href') || '';
            if (/\/Special:/i.test(href)) return;
            if (/\/(?:XP|Experience)\b/i.test(href)) return;
            let name = (a.textContent || '').trim();
            // Strip trailing "(L1)" / "(Lv1)" level marker
            name = name.replace(/\s*\(L\s*\d+\s*\)\s*$/i, '');
            if (!name) return;
            // Quantity: rare in Rewards, but support "Nx Item" prefix in same line
            // by scanning the parent-line text for a leading "Nx" before the anchor.
            let qty = 1;
            const parent = a.parentElement;
            if (parent) {
              const beforeText = (parent.textContent || '').split(name)[0] || '';
              const m = beforeText.match(/(\d+)\s*[x×]\s*$/i);
              if (m) qty = parseInt(m[1], 10);
            }
            out.items.push({ name, qty });
          });
          return out;
        }

        // Iterate all rows of the rewards summary, classifying them.
        function getSummaryRows() {
          const out = { headerRow: null, itemRows: [], xpRow: null };
          if (!rewardsTable) return out;
          rewardsTable.querySelectorAll('tr').forEach(tr => {
            const ths = tr.querySelectorAll(':scope > th');
            const tds = tr.querySelectorAll(':scope > td');
            // Header: "Item | Count"
            if (ths.length === 2 && tds.length === 0) {
              const text = (ths[0].textContent || '').trim().toLowerCase();
              if (text === 'item') { out.headerRow = tr; return; }
              if (text === 'experience') { out.xpRow = tr; return; }
            }
            // Item row: <td>name</td><td>count</td>
            if (tds.length === 2 && ths.length === 0) {
              // Module:Areas now renders the item cell via utils.ItemLink which wraps
              // an iconLinkWrap span with TWO anchors: (1) the icon anchor wrapping <img>
              // (empty textContent) and (2) the text anchor with display name. Pick the
              // anchor with actual text content; fallback to last anchor if no text.
              const anchors = tds[0].querySelectorAll('a');
              let a = null;
              for (let k = 0; k < anchors.length; k++) {
                if ((anchors[k].textContent || '').trim()) { a = anchors[k]; break; }
              }
              if (!a && anchors.length) a = anchors[anchors.length - 1];
              if (a) out.itemRows.push({ tr, anchor: a, countCell: tds[1] });
            }
          });
          return out;
        }

        // Restore counts from dataset.original (set on first hide) so re-computes
        // start from the unmodified summary every refresh.
        function restoreOriginalCounts() {
          if (!rewardsTable) return;
          rewardsTable.querySelectorAll('td[data-original]').forEach(td => {
            td.textContent = td.dataset.original;
          });
          rewardsTable.querySelectorAll('th[data-original]').forEach(th => {
            // Experience header has the XP icon + number; restore innerHTML
            if (th.dataset.originalHtml) {
              th.innerHTML = th.dataset.originalHtml;
            } else {
              th.textContent = th.dataset.original;
            }
          });
          rewardsTable.querySelectorAll('tr').forEach(tr => tr.style.display = '');
        }

        function captureOriginalsOnce() {
          if (!rewardsTable) return;
          // Capture once: we need original textContent for items, original HTML for XP row.
          const summary = getSummaryRows();
          summary.itemRows.forEach(r => {
            if (!r.countCell.dataset.original) {
              r.countCell.dataset.original = (r.countCell.textContent || '').trim();
            }
          });
          if (summary.xpRow) {
            const xpTh = summary.xpRow.querySelectorAll('th')[1];
            if (xpTh && !xpTh.dataset.originalHtml) {
              xpTh.dataset.originalHtml = xpTh.innerHTML;
              // Also extract the number for fast restore
              const xpMatch = (xpTh.textContent || '').match(/[\d,]+/);
              if (xpMatch) xpTh.dataset.original = xpMatch[0];
            }
          }
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
          if (!taskTable || !rewardsTable) return;
          console.log("🔄 [RemainingRewards] updateSummary start");

          // Reset to originals first.
          restoreOriginalCounts();

          // Aggregate completed task rewards.
          const consumedItems = Object.create(null);
          let consumedXp = 0;

          const completedCells = taskTable.querySelectorAll('tbody .table-progress-checkbox-cell, tbody .table-progress-checkbox-cell, tr .table-progress-checkbox-cell');
          taskTable.querySelectorAll('tbody tr').forEach(tr => {
            const checkCell = tr.querySelector('.table-progress-checkbox-cell');
            if (!checkCell || checkCell.dataset.sortValue !== '1') return;
            const tds = tr.querySelectorAll(':scope > td');
            const cell = (rewardsCol >= 0 && tds[rewardsCol]) ? tds[rewardsCol] : null;
            if (!cell) return;
            const r = parseRewardCell(cell);
            consumedXp += r.xp;
            r.items.forEach(it => {
              consumedItems[it.name] = (consumedItems[it.name] || 0) + it.qty;
            });
          });

          // Apply to summary rows.
          const summary = getSummaryRows();
          summary.itemRows.forEach(r => {
            // Strip trailing "(L#)" / "(Lv#)" from rewards-summary anchor text so the
            // lookup key matches the stripped names produced by parseRewardCell from
            // task-table anchors. Both sides must strip — Module:Areas now renders
            // level-specific display names with (L#) suffix in the rewards summary
            // (e.g. "Spirit Level (L7)"), so without symmetric stripping the lookup
            // would always miss and nothing would get subtracted.
            const rawName = (r.anchor.textContent || '').trim();
            const name = rawName.replace(/\s*\(L\s*\d+\s*\)\s*$/i, '');
            const orig = parseIntSafe(r.countCell.dataset.original || r.countCell.textContent);
            const used = consumedItems[name] || 0;
            const remaining = Math.max(0, orig - used);
            r.countCell.textContent = String(remaining);
            r.tr.style.display = (remaining === 0) ? 'none' : '';
          });

          // Experience: extract original number from dataset, subtract consumedXp.
          if (summary.xpRow) {
            const xpTh = summary.xpRow.querySelectorAll('th')[1];
            if (xpTh) {
              const origXp = parseIntSafe(xpTh.dataset.original || (xpTh.textContent.match(/[\d,]+/) || ['0'])[0]);
              const remainingXp = Math.max(0, origXp - consumedXp);
              // Preserve XP icon HTML; replace just the trailing number
              if (xpTh.dataset.originalHtml) {
                // Replace the final \s*[\d,]+ in the original HTML with remainingXp
                xpTh.innerHTML = xpTh.dataset.originalHtml.replace(/([\d,]+)(?!.*[\d,])/, fmt(remainingXp));
              } else {
                xpTh.textContent = fmt(remainingXp);
              }
              summary.xpRow.style.display = (remainingXp === 0) ? 'none' : '';
            }
          }

          // If everything's zero (all items hidden + xp=0), show a global "All Rewards Claimed!" row.
          const anyVisible = summary.itemRows.some(r => r.tr.style.display !== 'none')
            || (summary.xpRow && summary.xpRow.style.display !== 'none');
          if (!anyVisible) {
            ensureAllClaimedRow(summary);
          } else {
            removeAllClaimedRow();
          }

          console.log("✅ [RemainingRewards] updateSummary done");
        }

        function ensureAllClaimedRow(summary) {
          if (!rewardsTable) return;
          let row = rewardsTable.querySelector('tr.rewards-all-claimed');
          if (row) return;
          const header = summary.headerRow || rewardsTable.querySelector('tr');
          if (!header) return;
          row = document.createElement('tr');
          row.className = 'rewards-all-claimed center';
          const td = document.createElement('td');
          td.setAttribute('colspan', '2');
          const span = document.createElement('span');
          span.className = 'fancy areaCompleted';
          span.textContent = 'All Rewards Claimed!';
          span.style.fontSize = '26px';
          span.style.padding = '10px 0';
          td.appendChild(span);
          row.appendChild(td);
          row.style.opacity = '0';
          row.style.transition = 'opacity 1.5s';
          header.insertAdjacentElement('afterend', row);
          requestAnimationFrame(() => { if (enabled) row.style.opacity = '1'; });
        }
        function removeAllClaimedRow() {
          if (!rewardsTable) return;
          const row = rewardsTable.querySelector('tr.rewards-all-claimed');
          if (row) row.remove();
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

        return {
          init() {
            if (enabled) return;
            console.log("🧩 [RemainingRewards] init()");
            taskTable = document.querySelector(".taskTable:not(.mmwt-active-tasks-table)");
            rewardsTable = findRewardsTable();
            if (!taskTable || !rewardsTable) {
              console.warn("❌ [RemainingRewards] Required tables not found (.taskTable or Rewards article-table).");
              return;
            }
            rewardsCol = findRewardsColumnIndex(taskTable);
            if (rewardsCol < 0) {
              console.warn("❌ [RemainingRewards] 'Rewards' column not found in task table header.");
              return;
            }
            captureOriginalsOnce();
            bindTaskListeners();
            enabled = true;
            console.log(`✅ [RemainingRewards] ENABLED (rewardsCol=${rewardsCol})`);
            scheduleRAF(() => scheduleRAF(() => { if (enabled) updateSummary(); }));
          },
          refresh() {
            if (!enabled) { this.init(); return; }
            console.log("♻️ [RemainingRewards] refresh()");
            const newTask = document.querySelector(".taskTable:not(.mmwt-active-tasks-table)");
            const newRewards = findRewardsTable();
            if (!newTask || !newRewards) {
              console.warn("⚠️ [RemainingRewards] Tables missing on refresh; skipping.");
              return;
            }
            const taskChanged = newTask !== taskTable;
            taskTable = newTask;
            rewardsTable = newRewards;
            rewardsCol = findRewardsColumnIndex(taskTable);
            if (taskChanged) bindTaskListeners();
            captureOriginalsOnce();
            scheduleRAF(() => scheduleRAF(() => { if (enabled) updateSummary(); }));
          },
          teardown() {
            console.log("🧹 [RemainingRewards] teardown()");
            enabled = false;
            cancelAllRAF();
            updateScheduled = false;
            if (onTaskClick && taskTable) taskTable.removeEventListener("click", onTaskClick);
            if (onTaskKeyup && taskTable) taskTable.removeEventListener("keyup", onTaskKeyup);
            onTaskClick = null;
            onTaskKeyup = null;
            if (rewardsTable) {
              restoreOriginalCounts();
              removeAllClaimedRow();
            }
            console.log("❎ [RemainingRewards] DISABLED (restored summary)");
          },
          isEnabled() { return enabled; }
        };
      })();
    }

    const Feature = window.__RemainingRewards.feature;

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'data-sort-value') {
          const val = toggleCell.getAttribute('data-sort-value');
          console.log(`👀 [RemainingRewards] toggle → ${val}`);
          if (val === "1") {
            if (Feature.isEnabled()) Feature.refresh(); else Feature.init();
          } else {
            Feature.teardown();
          }
        }
      }
    });
    observer.observe(toggleCell, { attributes: true, attributeFilter: ['data-sort-value'] });
    window.__RemainingRewards.toggleObserver = observer;

    const initialVal = toggleCell.getAttribute('data-sort-value');
    if (initialVal === "1") {
      if (Feature.isEnabled()) Feature.refresh(); else Feature.init();
    } else {
      Feature.teardown();
    }

    if (!rowsInput.dataset.rrBound) {
      rowsInput.dataset.rrBound = "1";
      rowsInput.addEventListener("change", function () {
        if (this.checked) {
          if (Feature.isEnabled()) Feature.refresh(); else Feature.init();
        } else {
          Feature.teardown();
        }
      });
    }
  } catch (err) {
    console.error("💥 [RemainingRewards] Init error:", err);
  }
});

console.log("DynamicRemainingItemsTable Script END");