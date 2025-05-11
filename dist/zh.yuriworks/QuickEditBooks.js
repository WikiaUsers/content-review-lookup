var currentPopupHandlers = {
  keydown: null
};

var quickEditBooks = (function () {
  // 存储编辑历史
  var editHistory = [];
  var currentHistoryIndex = -1;
  var originalData = null;
  var currentData = null;
  var popupInstance = null;
  var lastCellEdit = null;
  var pageName = null;
  var FIELD_DEFINITIONS = [
    { key: "date", label: "发售日" },
    { key: "name", label: "作品页面名" },
    { key: "display_name", label: "作品显示名" },
    { key: "file", label: "文件名" },
    { key: "type", label: "书籍卷次" },
    { key: "author", label: "作者" },
    { key: "unchecked", label: "需要检查" }
  ];
  var REQUIRED_FIELDS = FIELD_DEFINITIONS.map(function (item) {
    return item.key;
  });
  var currentFields = REQUIRED_FIELDS.slice(); // 创建副本

  // 主函数
  return function (year, month, isPanel) {
    if (!mw.config.get("wgIsProbablyEditable")) {
      mw.notify("您没有编辑权限");
      return;
    }

    var formattedMonth = month < 10 ? "0" + month : month;
    if (isPanel) {
      loadAndShowEditDialog(year, month);
    } else {
      addQuickEditButton(year, month);
    }
  };

  // 创建空行
  function createEmptyRow() {
    var row = {};
    REQUIRED_FIELDS.forEach(function (key) {
      row[key] = "";
    });
    return row;
  }

  // Lua表解析
  function extractLuaTable(content) {
    try {
      // 1. 预处理内容
      var tableStr = content
        .replace(/--.*$/gm, "") // 移除注释
        .replace(/^\s*return\s*/, "") // 移除return关键字
        .trim();

      // 2. 转换最外层括号
      tableStr = tableStr.replace(/^\s*\{/, "[").replace(/\}\s*$/, "]");

      // 3. 先保护字符串中的冒号（特殊处理）
      tableStr = tableStr.replace(
        /(["'])(.*?)\1/g,
        function (match, quote, val) {
          return '"' + val.replace(/:/g, "<COLON>") + '"'; // 临时替换冒号
        }
      );

      // 4. 转换键值对格式
      tableStr = tableStr
        .replace(/([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, '"$1":') // key = → "key":
        .replace(/"\s*:/g, '":'); // 移除键名后的多余空格

      // 6. 移除对象/数组末尾的逗号
      tableStr = tableStr.replace(/,\s*([}\]])/g, "$1");

      // 7. 处理未加引号的字符串值
      tableStr = tableStr.replace(
        /:([^"{}\[\],\s][^,}\n]*)([,}\]])/g,
        function (match, val, end) {
          return ': "' + val.trim() + '"' + end;
        }
      );

      tableStr = tableStr.replace(/<COLON>/g, ":");

      // 8. 解析为JSON
      var result = JSON.parse(tableStr);

      // 9. 规范化字段
      var allKeys = [];
      result.forEach(function (item) {
        for (var key in item) {
          if (item.hasOwnProperty(key) && allKeys.indexOf(key) === -1) {
            allKeys.push(key);
          }
        }
      });

      return result.map(function (item) {
        var obj = {};
        allKeys.forEach(function (key) {
          obj[key] = item[key] !== undefined ? item[key] : "";
        });
        return obj;
      });
    } catch (e) {
      console.error("解析失败:", e);
      mw.notify("解析Lua表失败: " + e.message);
      return null;
    }
  }

  // 修改后的addQuickEditButton函数
  function addQuickEditButton(year, month) {
    if ($("#ca-quick-edit").length) return;

    var $button = $(
      '<a class="wds-button wds-is-text page-header__action-button has-label has-ripple unbounded-ripple" href="#" id="ca-quick-edit" data-tracking-label="ca-quick-edit" accesskey="q">' +
        '<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-pencil-small"></use></svg>快速编辑<div class="ripple-surface"></div>' +
        "</a>"
    );

    $(".page-header__actions").prepend($button);

    $button.click(function (e) {
      e.preventDefault();
      $button.addClass("is-loading");
      loadAndShowEditDialog(year, month);
      setTimeout(function () {
        $button.removeClass("is-loading");
      }, 500);
    });
  }

  function loadAndShowEditDialog(year, month) {
    var formattedMonth = month < 10 ? "0" + month : month;
    pageName = "Module:数据存档/发售书籍/" + year + "-" + formattedMonth;

    new mw.Api()
      .get({
        action: "query",
        prop: "revisions",
        titles: pageName,
        rvprop: "content",
        format: "json"
      })
      .done(function (data) {
        var pages = data.query.pages;
        var pageId = Object.keys(pages)[0];

        if (pageId === "-1") {
          // 页面不存在时创建空数据
          originalData = [createEmptyRow()];
          currentData = [createEmptyRow()];
        } else {
          var content = pages[pageId].revisions[0]["*"];
          var luaTable = extractLuaTable(content);

          if (!luaTable) {
            // 解析失败时创建空数据
            originalData = [createEmptyRow()];
            currentData = [createEmptyRow()];
          } else {
            originalData = JSON.parse(JSON.stringify(luaTable));
            currentData = JSON.parse(JSON.stringify(luaTable));

            // 如果表是空的，添加一个空行
            if (currentData.length === 0) {
              currentData.push(createEmptyRow());
              originalData.push(createEmptyRow());
            }
          }
        }

        editHistory = [
          {
            state: JSON.parse(JSON.stringify(currentData)),
            action: "init",
            timestamp: Date.now()
          }
        ];
        currentHistoryIndex = 0;

        showEditDialog(currentData);
      })
      .fail(function () {
        mw.notify("加载模块失败");
        // 加载失败时创建空数据
        originalData = [createEmptyRow()];
        currentData = [createEmptyRow()];
        editHistory = [
          {
            state: JSON.parse(JSON.stringify(currentData)),
            action: "init",
            timestamp: Date.now()
          }
        ];
        currentHistoryIndex = 0;
        showEditDialog(currentData);
      });
  }

  // 生成表格HTML
  function generateTableHtml(data) {
    var $table = $("<table>").addClass("fandom-table quick-edit-books-table");
    var $thead = $("<thead>").appendTo($table);
    var $tbody = $("<tbody>").appendTo($table);

    // 创建表头
    var $headerRow = $("<tr>").appendTo($thead);
    $headerRow.append($("<th>").text("操作"));

    FIELD_DEFINITIONS.forEach(function (field) {
      $headerRow.append($("<th>").text(field.label));
    });

    // 处理数据行
    if (data && data.length > 0) {
      data.forEach(function (item, index) {
        createTableRow($tbody, item, index, data.length);
      });
    } else {
      $tbody.append(createAddRowTd());
    }

    return $table;
  }

  function createTableRow($tbody, item, index, totalRows) {
    var $row = $("<tr>").attr("data-index", index).appendTo($tbody);
    // 如果需要检查字段有值，添加needs-check类
    var uncheckedValue = item.unchecked;
    if (
      uncheckedValue !== undefined &&
      uncheckedValue !== null &&
      String(uncheckedValue).trim() !== ""
    ) {
      $row.addClass("needs-check");
    }

    // 操作列
    var $actionCell = $("<td>").addClass("row-actions");
    if (index > 0)
      $actionCell.append(
        $("<button>").addClass("move-up").attr("title", "上移此行").html("↑")
      );
    if (index < totalRows - 1)
      $actionCell.append(
        $("<button>").addClass("move-down").attr("title", "下移此行").html("↓")
      );
    $actionCell.append(
      $("<button>").addClass("delete-row").attr("title", "删除此行").html("×")
    );
    $row.append($actionCell);

    // 数据列
    REQUIRED_FIELDS.forEach(function (key) {
      $row.append(
        $("<td>")
          .attr("contenteditable", "true")
          .text(item[key] || "")
      );
    });
    $row.append($("<td>").addClass("add-row-td").attr("title", "增加新行"));
  }

  function createAddRowTd() {
    return $("<tr>").append(
      $("<td>")
        .addClass("add-row-td")
        .attr("colspan", REQUIRED_FIELDS.length + 1)
    );
  }

  // 显示编辑对话框
  function showEditDialog(data) {
    cleanupPreviousPopup();

    popupInstance = PopupGenerator.createPopup({
      headerText: "快速编辑 - 加载中...",
      content: '<div class="loading-spinner">加载数据...</div>',
      mode: "create"
    });
    popupInstance.open();

    setTimeout(function () {
      // 创建控制栏外层容器
      var $controlsWrapper = $("<div>").addClass("quick-edit-controls-wrapper");

      // 创建图片检查区域
      var $pageExists = $("<div>")
        .addClass("quick-edit-books-check")
        .data("type", "")
        .append(
          $("<div>").addClass("current-check").text("当前页面:\n"),
          $("<div>").addClass("check-existence").text("页面状态:\n未检查")
        );

      // 创建操作按钮区域
      var $controls = $("<div>")
        .addClass("quick-edit-controls")
        .append(
          $("<button>").addClass("cdx-button undo-btn").text("撤销 (Ctrl+Z)"),
          $("<button>").addClass("cdx-button reset-btn").text("重置"),
          $("<button>").addClass("cdx-button save-btn").text("保存")
        );

      // 组合元素
      $controlsWrapper.append($pageExists, $controls);

      var $tableContainer = $("<div>").addClass("quick-edit-table-container");
      var $table = generateTableHtml(data);
      $tableContainer.append($table);

      popupInstance.contentElement
        .html("")
        .append($controlsWrapper, $tableContainer);
      popupInstance.popupElement
        .find(".popup-box-header-text")
        .text("快速编辑 - 书籍数据");
      popupInstance.popupElement.addClass("quick-edit-books-popup");

      bindTableEvents($tableContainer, data, $pageExists);
    }, 50);
    currentPopupHandlers.keydown = function (e) {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        undoEdit();
      }
    };
    $(document).on("keydown.quickEdit", currentPopupHandlers.keydown);
  }
  function cleanupPreviousPopup() {
    // 移除事件监听
    if (currentPopupHandlers.keydown) {
      $(document).off("keydown.quickEdit", currentPopupHandlers.keydown);
      currentPopupHandlers.keydown = null;
    }

    // 销毁旧弹窗
    if (popupInstance) {
      popupInstance = null;
    }

    // 清理可能残留的DOM元素
    $(".quick-edit-books-popup").remove();
  }

  function cleanupCurrentPopup() {
    // 保留基础清理，但不重置popupInstance引用
    if (currentPopupHandlers.keydown) {
      $(document).off("keydown.quickEdit", currentPopupHandlers.keydown);
      currentPopupHandlers.keydown = null;
    }
    $(".quick-edit-books-popup").remove();
  }

  // 绑定表格事件
  function bindTableEvents($container, data, $pageExists) {
    // 移除旧事件绑定
    $container.off();
    $container.closest(".popup-box-content").off("click", ".undo-btn");
    $container.closest(".popup-box-content").off("click", ".reset-btn");
    $container.closest(".popup-box-content").off("click", ".save-btn");

    var $table = $container.find("table");
    var currentFocusedCell = null;
    var isEditMode = false;
    var ignoreNextFocus = false;
    var lastCheckedFileCell = null;
    var lastCheckedPageCell = null;

    // 控制按钮事件
    $container
      .closest(".popup-box-content")
      .on("click", ".undo-btn", function () {
        undoEdit();
      })
      .on("click", ".reset-btn", function () {
        if (confirm("确定还原到初始状态？")) {
          saveEditState("pre-reset");
          currentData = JSON.parse(JSON.stringify(originalData));
          if (currentData.length === 0) currentData.push(createEmptyRow());
          refreshTable($container, currentData, $pageExists);
          saveEditState("reset", { restoredFrom: currentHistoryIndex - 1 });
          mw.notify("已还原到初始状态");
        }
      })
      .on("click", ".save-btn", function () {
        var isEmpty = true;
        for (var i = 0; i < currentData.length; i++) {
          for (var key in currentData[i]) {
            if (currentData[i][key] && currentData[i][key].trim() !== "") {
              isEmpty = false;
              break;
            }
          }
          if (!isEmpty) break;
        }
        if (isEmpty) {
          mw.notify("无法保存，所有行都是空的");
          return;
        }
        saveChanges(currentData);
      });

    // 行操作事件
    $table.on("click", ".delete-row", function () {
      var rowIndex = $(this).closest("tr").data("index");
      var deletedRow = JSON.parse(JSON.stringify(data[rowIndex]));
      saveEditState("pre-delete", { row: rowIndex });
      data.splice(rowIndex, 1);
      if (data.length === 0) data.push(createEmptyRow());
      refreshTable($container, data, $pageExists);
      saveEditState("delete", { row: rowIndex, deletedData: deletedRow });
    });

    // 在 bindTableEvents 函数中添加粘贴事件监听
    $container.on("paste", "td[contenteditable]", function (e) {
      e.preventDefault();
      var $cell = $(this);
      var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
      var pastedText = clipboardData.getData("text/plain");

      // 处理当前选区
      var selection = window.getSelection();
      if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(pastedText));

        // 移动光标到粘贴内容末尾
        range.setStartAfter(range.endContainer);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        $cell.text(pastedText);
      }

      // 更新数据模型
      var $row = $cell.closest("tr");
      var rowIndex = $row.data("index");
      var fieldName = REQUIRED_FIELDS[$cell.index() - 1];
      data[rowIndex][fieldName] = pastedText;

      saveEditState("cell-edit", {
        row: rowIndex,
        field: fieldName,
        value: pastedText
      });
    });
    // 添加行事件
    $container.on("click", "td.add-row-td", function () {
      var $clickedRow = $(this).closest("tr");
      var currentIndex = $clickedRow.data("index");
      var insertIndex = currentIndex + 1;
      saveEditState("pre-insert", { position: insertIndex });
      var newItem = createEmptyRow();
      data.splice(insertIndex, 0, newItem);
      refreshTable($container, data, $pageExists);
      saveEditState("insert", { position: insertIndex, newData: newItem });
      setTimeout(function () {
        var $cell = $container.find(
          'tr[data-index="' + insertIndex + '"] td[contenteditable]:first'
        );
        focusCell($cell);
        enterEditMode($cell);
      }, 50);
    });

    // 行移动事件
    $container.on("click", ".move-up", moveRowUp);
    $container.on("click", ".move-down", moveRowDown);

    // 单元格点击事件
    $container.on("click", "td[contenteditable]", function (e) {
      var $cell = $(this);
      if (isEditMode && currentFocusedCell && currentFocusedCell.is($cell))
        return;
      ignoreNextFocus = true;
      if (currentFocusedCell && currentFocusedCell.is($cell)) {
        enterEditMode($cell);
      } else {
        focusCell($cell);
        // 检查是否是文件列或页面名列
        var colIndex = $cell.index();
        if (colIndex === 4) {
          // 文件列
          checkFileCell($cell);
        } else if (colIndex === 2) {
          // 页面名列
          checkPageCell($cell);
        }
      }
      setTimeout(function () {
        ignoreNextFocus = false;
      }, 100);
    });

    // 单元格双击事件
    $container.on("dblclick", "td[contenteditable]", function () {
      var $cell = $(this);
      focusCell($cell);
      enterEditMode($cell);
    });

    // 单元格键盘事件
    $container.on("keydown", "td[contenteditable]", function (e) {
      var $cell = $(this);
      var $row = $cell.closest("tr");
      var colIndex = $cell.index();
      var rowIndex = $row.data("index");
      var key = e.key;
      var ctrlKey = e.ctrlKey || e.metaKey;

      if (isEditMode) {
        if (key === "Escape") {
          e.preventDefault();
          exitEditMode($cell);
          return;
        }
        if (ctrlKey && (key === "c" || key === "x")) return;
        if (ctrlKey && key === "v") {
          e.preventDefault();
          pasteToCell($cell);
          return;
        }
        if (key === "Tab") {
          e.preventDefault();
          exitEditMode($cell);
          var $nextCell = e.shiftKey
            ? $cell.prev("td[contenteditable]")
            : $cell.next("td[contenteditable]");
          if ($nextCell.length) {
            focusCell($nextCell);
            enterEditMode($nextCell);
            // 检查新聚焦的单元格
            var newColIndex = $nextCell.index();
            if (newColIndex === 4) checkFileCell($nextCell);
            else if (newColIndex === 2) checkPageCell($nextCell);
          }
          return;
        }
        if (/^Arrow/.test(key)) {
          var textNode = $cell[0].firstChild;
          var selection = window.getSelection();
          var range = selection.getRangeAt(0);
          var offset = range.startOffset;
          var textLength = textNode ? textNode.length : 0;
          if (
            (key === "ArrowLeft" && offset === 0) ||
            (key === "ArrowRight" && offset === textLength) ||
            (key === "ArrowUp" && isCursorAtFirstLine($cell[0], selection)) ||
            (key === "ArrowDown" && isCursorAtLastLine($cell[0], selection))
          ) {
            e.preventDefault();
            exitEditMode($cell);
            moveFocus(key, $cell);
          }
          return;
        }
      } else {
        if (key === "Enter") {
          e.preventDefault();
          enterEditMode($cell);
          return;
        }
        if (/^Arrow/.test(key)) {
          e.preventDefault();
          moveFocus(key, $cell);
          // 检查新聚焦的单元格
          var newColIndex = getNewCellIndex($cell, key);
          if (newColIndex === 4) checkFileCell(currentFocusedCell);
          else if (newColIndex === 2) checkPageCell(currentFocusedCell);
          return;
        }
        if (ctrlKey && key === "c") {
          e.preventDefault();
          copyCellContent($cell);
          return;
        }
        if (ctrlKey && key === "v") {
          e.preventDefault();
          pasteToCell($cell);
          return;
        }
        if (ctrlKey && key === "x") {
          e.preventDefault();
          cutCellContent($cell);
          return;
        }
        if (!ctrlKey && key.length === 1) {
          e.preventDefault();
          enterEditMode($cell);
          if (key.match(/^[ -~]$/)) {
            var textNode = $cell[0].firstChild;
            if (textNode) {
              var range = document.createRange();
              range.selectNodeContents(textNode);
              range.collapse(false);
              var selection = window.getSelection();
              selection.removeAllRanges();
              selection.addRange(range);
              document.execCommand("insertText", false, e.key);
            }
          }
          return;
        }
      }
    });

    // 单元格失去焦点事件
    $container.on("blur", "td[contenteditable]", function () {
      if (ignoreNextFocus) return;
      var $cell = $(this);
      setTimeout(function () {
        var activeElement = document.activeElement;
        if (!$(activeElement).closest("td[contenteditable]").length) {
          exitEditMode($cell);
          $cell.removeClass("focusing");
          currentFocusedCell = null;
        }
      }, 100);
    });

    // 单元格内容变化事件
    // 在bindTableEvents函数中修改输入事件处理
    $container.on("input propertychange", "td[contenteditable]", function () {
      var $cell = $(this);
      var $row = $cell.closest("tr");
      var rowIndex = $row.data("index");
      var colIndex = $cell.index();
      var fieldName = REQUIRED_FIELDS[colIndex - 1]; // 第一列是操作按钮

      // 更新数据模型
      var newValue = $cell.text();
      data[rowIndex][fieldName] = newValue;
      saveEditState("cell-edit", {
        row: rowIndex,
        field: fieldName,
        value: newValue
      });

      // 根据列类型触发实时检查
      if (colIndex === 4) {
        // 文件列索引（根据FIELD_DEFINITIONS顺序调整）
        checkFileCell($cell);
      } else if (colIndex === 2) {
        // 页面名列索引
        checkPageCell($cell);
      }

      // 更新需要检查的样式
      if (fieldName === "unchecked") {
        if (newValue.trim() !== "") {
          $row.addClass("needs-check");
        } else {
          $row.removeClass("needs-check");
        }
      }
    });

    // 修改检查函数（确保每次都会执行）
    function checkFileCell($cell) {
      var fileName = $cell.text().trim();
      updateCheckDisplay(fileName, fileName ? "checking" : "no-file", "file");

      if (fileName) {
        checkFileExistence(fileName)
          .then(function (exists) {
            // 双重验证确保单元格仍存在且内容未变
            if (
              $cell.closest("body").length &&
              $cell.text().trim() === fileName
            ) {
              updateCheckDisplay(
                fileName,
                exists ? "exists" : "not-exists",
                "file"
              );
            }
          })
          .catch(function (error) {
            console.error("文件检查错误:", error);
          });
      }
    }

    function checkPageCell($cell) {
      var pageName = $cell.text().trim();
      updateCheckDisplay(pageName, pageName ? "checking" : "no-page", "page");

      if (pageName) {
        checkPageExistence(pageName)
          .then(function (result) {
            if (
              $cell.closest("body").length &&
              $cell.text().trim() === pageName
            ) {
              updateCheckDisplay(
                result.redirect ? result.redirectTarget : pageName,
                result.exists ? "exists" : "not-exists",
                "page",
                result.redirect ? pageName : false
              );
            }
          })
          .catch(function (error) {
            console.error("页面检查错误:", error);
          });
      }
    }

    // 辅助函数：更新文件显示
    function updateCheckDisplay(name, status, pageType, redirectTo) {
      $pageExists.find(".check-actions").remove();
      redirectText = "";
      if (redirectTo) {
        redirectText = "\n(重定向到:" + redirectTo + ")";
      }
      $pageExists
        .find(".current-check")
        .text("当前页面:\n" + (name || "无") + redirectText);

      var statusText =
        "页面状态:\n" +
        (status === "checking"
          ? "检查中..."
          : status === "exists"
          ? "页面存在"
          : status === "not-exists"
          ? "页面不存在"
          : "无页面名");

      var prefix = "";
      if ($pageExists.data("type") === "file") {
        prefix = "File:";
      }
      var actionLink = "";
      if (status === "exists" && name) {
        actionLink = $("<a>")
          .addClass("check-page-link")
          .attr("href", mw.util.getUrl(prefix + name))
          .attr("target", "_blank")
          .text("(查看详情)");
      } else if (status === "not-exists" && name) {
        if (prefix === "File:") {
          actionLink = $("<a>")
            .addClass("upload-link")
            .attr(
              "href",
              mw.util.getUrl("Special:Upload", { wpDestFile: name })
            )
            .attr("target", "_blank")
            .text("(上传文件)");
        } else {
          actionLink = $("<a>")
            .addClass("upload-link")
            .attr("href", mw.util.getUrl(name, { action: "edit" }))
            .attr("target", "_blank")
            .text("(创建页面)");
        }
      }

      var $actions = $("<div>").addClass("check-actions");
      if (actionLink) $actions.append(actionLink);

      $pageExists.attr("data-check-status", status || "no-file");
      $pageExists.find(".check-existence").text(statusText).append($actions);
    }

    // 辅助函数：检查文件是否存在
    function checkFileExistence(fileName) {
      return new mw.Api()
        .get({
          action: "query",
          titles: "File:" + fileName,
          format: "json"
        })
        .then(function (data) {
          var pages = data.query.pages;
          var pageId = Object.keys(pages)[0];
          return pageId !== "-1";
        })
        .catch(function () {
          return false;
        });
    }

    // 辅助函数：检查页面是否存在及重定向
    function checkPageExistence(checkPageName) {
      return new mw.Api()
        .get({
          action: "query",
          titles: checkPageName,
          redirects: 1,
          format: "json"
        })
        .then(function (data) {
          var result = { exists: false, redirect: false };
          var pages = data.query.pages;
          var pageId = Object.keys(pages)[0];

          if (pageId !== "-1") {
            result.exists = true;
            if (data.query.redirects && data.query.redirects.length) {
              result.redirect = true;
              result.redirectTo = data.query.redirects[0].to;
            }
          }
          return result;
        })
        .catch(function () {
          return { exists: false, redirect: false };
        });
    }

    // 辅助函数：聚焦单元格
    function focusCell($cell) {
      if (currentFocusedCell && currentFocusedCell.is($cell) && !isEditMode)
        return;
      if (currentFocusedCell)
        currentFocusedCell.removeClass("focusing editing");
      $cell.addClass("focusing");
      currentFocusedCell = $cell;
      isEditMode = false;
      setTimeout(function () {
        $cell[0].focus();
        if (window.getSelection) window.getSelection().removeAllRanges();
      }, 0);
    }

    // 辅助函数：进入编辑模式
    function enterEditMode($cell) {
      if (!currentFocusedCell || !currentFocusedCell.is($cell))
        focusCell($cell);
      isEditMode = true;
      $cell.addClass("editing");
      var range = document.createRange();
      var sel = window.getSelection();
      range.selectNodeContents($cell[0]);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    // 辅助函数：退出编辑模式
    function exitEditMode($cell) {
      isEditMode = false;
      $cell.removeClass("editing");
    }

    // 辅助函数：移动焦点
    function moveFocus(direction, $currentCell) {
      var $row = $currentCell.closest("tr");
      var rowIndex = $row.data("index");
      var colIndex = $currentCell.index();
      var $targetCell = null;

      switch (direction) {
        case "ArrowUp":
          $targetCell = $row
            .prev("tr")
            .find("td[contenteditable]")
            .eq(colIndex - 1);
          break;
        case "ArrowDown":
          $targetCell = $row
            .next("tr")
            .find("td[contenteditable]")
            .eq(colIndex - 1);
          break;
        case "ArrowLeft":
          $targetCell = $currentCell.prev("td[contenteditable]");
          break;
        case "ArrowRight":
          $targetCell = $currentCell.next("td[contenteditable]");
          break;
      }

      if ($targetCell && $targetCell.length) {
        focusCell($targetCell);
      }
    }

    // 辅助函数：获取新单元格索引
    function getNewCellIndex($cell, direction) {
      var $row = $cell.closest("tr");
      var colIndex = $cell.index();
      var $targetCell = null;

      switch (direction) {
        case "ArrowUp":
          $targetCell = $row
            .prev("tr")
            .find("td[contenteditable]")
            .eq(colIndex - 1);
          break;
        case "ArrowDown":
          $targetCell = $row
            .next("tr")
            .find("td[contenteditable]")
            .eq(colIndex - 1);
          break;
        case "ArrowLeft":
          $targetCell = $cell.prev("td[contenteditable]");
          break;
        case "ArrowRight":
          $targetCell = $cell.next("td[contenteditable]");
          break;
      }

      return $targetCell ? $targetCell.index() : -1;
    }

    // 辅助函数：检查光标是否在第一行
    function isCursorAtFirstLine(cell, selection) {
      if (!selection.rangeCount) return false;
      var range = selection.getRangeAt(0);
      var startRect = range.getBoundingClientRect();
      var cellRect = cell.getBoundingClientRect();
      return Math.abs(startRect.top - cellRect.top) < 2;
    }

    // 辅助函数：检查光标是否在最后一行
    function isCursorAtLastLine(cell, selection) {
      if (!selection.rangeCount) return false;
      var range = selection.getRangeAt(0);
      var endRect = range.getBoundingClientRect();
      var cellRect = cell.getBoundingClientRect();
      return Math.abs(endRect.bottom - cellRect.bottom) < 2;
    }

    // 辅助函数：复制单元格内容（纯文本）
    function copyCellContent($cell) {
      var text = $cell.text();
      var textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        mw.notify("已复制单元格内容", { type: "success", autoHide: true });
      } catch (e) {
        mw.notify("复制失败: " + e.message, { type: "error" });
      }
      document.body.removeChild(textarea);
    }

    // 辅助函数：粘贴到单元格（纯文本）
    function pasteToCell($cell) {
      // 尝试使用现代Clipboard API
      if (navigator.clipboard && navigator.clipboard.readText) {
        navigator.clipboard
          .readText()
          .then(function (pastedText) {
            handlePastedContent($cell, pastedText);
          })
          .catch(function (err) {
            fallbackPaste($cell);
          });
      } else {
        fallbackPaste($cell);
      }
    }

    function handlePastedContent($cell, pastedText) {
      enterEditMode($cell);

      // 处理选区替换
      var selection = window.getSelection();
      if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(pastedText));
        range.collapse(false);
      } else {
        $cell.text(pastedText);
      }

      // 更新数据模型
      var $row = $cell.closest("tr");
      var rowIndex = $row.data("index");
      var fieldName = REQUIRED_FIELDS[$cell.index() - 1];
      data[rowIndex][fieldName] = pastedText;

      saveEditState("cell-edit", {
        row: rowIndex,
        field: fieldName,
        value: pastedText
      });

      mw.notify("已粘贴内容", { type: "success", autoHide: true });
    }

    function fallbackPaste($cell) {
      // 创建临时可编辑元素
      var $tempDiv = $("<div>")
        .css({
          position: "fixed",
          left: "-9999px",
          opacity: 0
        })
        .attr("contenteditable", true)
        .appendTo("body");

      $tempDiv[0].focus();

      setTimeout(function () {
        var pastedText = $tempDiv.text().trim();
        $tempDiv.remove();

        if (pastedText) {
          handlePastedContent($cell, pastedText);
        } else {
          mw.notify("粘贴失败，请尝试直接右键粘贴", { type: "error" });
        }
      }, 0);
    }
    function cutCellContent($cell) {
      var text = $cell.text();
      if (text) {
        var textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          enterEditMode($cell);
          $cell.text("");

          // 更新数据模型
          var $row = $cell.closest("tr");
          var rowIndex = $row.data("index");
          var fieldName = REQUIRED_FIELDS[$cell.index() - 1];
          data[rowIndex][fieldName] = "";

          saveEditState("cell-edit", {
            row: rowIndex,
            field: fieldName,
            value: ""
          });

          mw.notify("已剪切内容", { type: "success", autoHide: true });
        } catch (e) {
          mw.notify("剪切失败: " + e.message, { type: "error" });
        }
        document.body.removeChild(textarea);
      }
    }

    // 辅助函数：移动行上
    function moveRowUp() {
      var $row = $(this).closest("tr");
      var currentIndex = $row.data("index");
      if (currentIndex > 0) {
        saveEditState("pre-move", {
          action: "move-up",
          from: currentIndex,
          to: currentIndex - 1
        });
        swapRows(data, currentIndex, currentIndex - 1);
        saveEditState("move", {
          action: "move-up",
          from: currentIndex,
          to: currentIndex - 1
        });
        refreshTable($container, data, $pageExists);
        mw.notify(
          "已上移第 " + (currentIndex + 1) + " 行到第 " + currentIndex + " 行"
        );
      } else {
        mw.notify("已经是第一行，无法上移");
      }
    }

    // 辅助函数：移动行下
    function moveRowDown() {
      var $row = $(this).closest("tr");
      var currentIndex = $row.data("index");
      if (currentIndex < data.length - 1) {
        saveEditState("pre-move", {
          action: "move-down",
          from: currentIndex,
          to: currentIndex + 1
        });
        swapRows(data, currentIndex, currentIndex + 1);
        saveEditState("move", {
          action: "move-down",
          from: currentIndex,
          to: currentIndex + 1
        });
        refreshTable($container, data, $pageExists);
        mw.notify(
          "已下移第 " +
            (currentIndex + 1) +
            " 行到第 " +
            (currentIndex + 2) +
            " 行"
        );
      } else {
        mw.notify("已经是最后一行，无法下移");
      }
    }
  }
  // 检查文件是否存在的函数
  function checkFileExistence(fileName) {
    var fullFileName = "File:" + fileName;

    return new mw.Api()
      .get({
        action: "query",
        titles: fullFileName,
        format: "json"
      })
      .then(function (data) {
        var pages = data.query.pages;
        var pageId = Object.keys(pages)[0];
        return pageId !== "-1"; // -1表示页面不存在
      })
      .catch(function () {
        return false; // 查询失败视为文件不存在
      });
  }

  function refreshTable($container, data, $pageExists) {
    var $newTable = generateTableHtml(data);
    $container.find("table").replaceWith($newTable);
    bindTableEvents($container, data, $pageExists);

    // 确保现有行的needs-check类状态正确
    $newTable.find("tr[data-index]").each(function () {
      var $row = $(this);
      var index = $row.data("index");
      var uncheckedValue = data[index] && data[index].unchecked;
      if (
        uncheckedValue !== undefined &&
        uncheckedValue !== null &&
        String(uncheckedValue).trim() !== ""
      ) {
        $row.addClass("needs-check");
      }
    });
  }

  function swapRows(data, indexA, indexB) {
    var temp = data[indexA];
    data[indexA] = data[indexB];
    data[indexB] = temp;
  }

  function saveEditState(actionType, target) {
    var newState = JSON.parse(JSON.stringify(currentData));

    if (currentHistoryIndex < editHistory.length - 1) {
      editHistory = editHistory.slice(0, currentHistoryIndex + 1);
    }

    editHistory.push({
      state: newState,
      action: actionType,
      target: target,
      timestamp: Date.now()
    });

    currentHistoryIndex = editHistory.length - 1;
  }

  function undoEdit() {
    if (currentHistoryIndex <= 0) {
      mw.notify("没有更多可撤销的操作");
      return;
    }

    currentHistoryIndex--;
    var prevState = editHistory[currentHistoryIndex].state;
    var undoneAction = editHistory[currentHistoryIndex + 1];

    currentData = JSON.parse(JSON.stringify(prevState));

    // 获取 $pageExists 元素
    var $pageExists = popupInstance.contentElement.find(
      ".quick-edit-image-check"
    );
    refreshTable(
      popupInstance.contentElement.find(".quick-edit-table-container"),
      currentData,
      $pageExists
    );

    var actionMsg = getActionMessage(undoneAction);
    mw.notify("已撤销: " + actionMsg);
  }

  function getActionMessage(action) {
    if (!action || !action.action) return "操作";

    switch (action.action) {
      case "cell-edit":
        fieldDefinition = FIELD_DEFINITIONS.find(function (f) {
          return f.key === action.target.field;
        });
        var fieldLabel =
          (fieldDefinition && fieldDefinition.label) || action.target.field;
        return "编辑第" + (action.target.row + 1) + "行的" + fieldLabel;
      case "move-up":
        return (
          "上移第" +
          (action.target.from + 1) +
          "行到第" +
          (action.target.to + 1) +
          "行"
        );
      case "move-down":
        return (
          "下移第" +
          (action.target.from + 1) +
          "行到第" +
          (action.target.to + 1) +
          "行"
        );
      case "delete":
        return "删除第" + (action.target.row + 1) + "行";
      case "insert":
        return "添加第" + (action.target.position + 1) + "行";
      case "reset":
        return "还原到初始状态";
      default:
        return "操作";
    }
  }

  function saveChanges(data) {
    if (!mw.config.get("wgIsProbablyEditable")) {
      mw.notify("无编辑权限");
      return;
    }

    if (JSON.stringify(data) === JSON.stringify(originalData)) {
      mw.notify("数据未改变，无需保存");
      cleanupCurrentPopup();
      popupInstance && popupInstance.close();
      return;
    }

    new mw.Api()
      .get({
        action: "query",
        titles: pageName,
        prop: "info",
        format: "json"
      })
      .then(function (infoData) {
        var pages = infoData.query.pages;
        var pageId = Object.keys(pages)[0];
        var baserevid = pages[pageId].lastrevid || 0;

        var editParams = {
          action: "edit",
          title: pageName,
          text: "return " + convertToLuaTable(data),
          summary: "使用快速编辑工具更新数据",
          format: "json",
          token: mw.user.tokens.get("editToken"),
          baserevid: baserevid
        };

        return new mw.Api().postWithEditToken(editParams);
      })
      .then(function () {
        mw.notify("保存成功");
        originalData = JSON.parse(JSON.stringify(data));
        cleanupCurrentPopup();
        popupInstance && popupInstance.close();
      })
      .catch(function (error) {
        var errorMsg = "保存失败: ";

        // 检测网络状态
        if (!navigator.onLine) {
          errorMsg = "网络已断开，无法保存到服务器";
          console.error("网络连接已断开");
        }
        // 处理API错误
        else if (typeof error === "string") {
          errorMsg += getApiErrorMessage(error);
        }
        // 处理其他错误
        else if (error instanceof Error) {
          errorMsg += error.message;
          console.error("保存错误详情:", error.stack);
        }
        // 未知错误
        else {
          errorMsg += "未知错误";
          console.error("未知保存错误:", error);
        }

        mw.notify(errorMsg, { type: "error" });

        // 无论何种错误都提供保存到本地的选项
        var userChoice = confirm(errorMsg + "\n\n是否要将内容保存到本地文件？");
        if (userChoice) {
          saveToLocalFile(data);
        }
      });
  }

  // 获取API错误消息
  function getApiErrorMessage(errorCode) {
    var messages = {
      missingparam: "缺少必要参数",
      badtoken: "无效的编辑令牌",
      protectedpage: "页面受保护，无法编辑",
      editconflict: "编辑冲突，请刷新后重试",
      nosuchpage: "页面不存在",
      readonly: "维基处于只读模式",
      ratelimited: "操作过于频繁，请稍后再试"
    };
    return messages[errorCode] || errorCode;
  }

  // 保存到本地文件
  function saveToLocalFile(data) {
    try {
      // 检查浏览器是否支持Blob API
      if (typeof Blob === "undefined") {
        throw new Error("您的浏览器不支持文件保存功能");
      }

      var luaContent = "return " + convertToLuaTable(data);
      var fileName = getBackupFileName();

      var blob = new Blob([luaContent], { type: "text/plain;charset=utf-8" });
      var url = URL.createObjectURL(blob);

      var a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      // 清理
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);

      console.log("内容已保存到本地文件: " + fileName);
      mw.notify("已保存备份到本地文件: " + fileName);
    } catch (e) {
      console.error("保存到本地失败:", e);
      mw.notify("保存到本地失败: " + e.message, { type: "error" });

      // 如果Blob API不可用，提供最后的备用方案
      if (e.message.includes("Blob")) {
        showAlternativeSaveOption(luaContent);
      }
    }
  }

  // 生成备份文件名
  function getBackupFileName() {
    var now = new Date();
    var timestamp =
      now.getFullYear() +
      "-" +
      (now.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      now.getDate().toString().padStart(2, "0") +
      "_" +
      now.getHours().toString().padStart(2, "0") +
      "-" +
      now.getMinutes().toString().padStart(2, "0");

    return pageName.replace(/\//g, "_") + "_backup_" + timestamp + ".txt";
  }

  // 备用保存方案（当Blob API不可用时）
  function showAlternativeSaveOption(content) {
    var textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.width = "100%";
    textarea.style.height = "200px";
    textarea.style.zIndex = "9999";

    document.body.appendChild(textarea);
    textarea.select();

    var copyMsg =
      "您的浏览器不支持自动下载。\n" +
      "已为您选择所有内容，请按Ctrl+C复制，\n" +
      "然后粘贴到文本编辑器中手动保存。";

    alert(copyMsg);

    setTimeout(function () {
      document.body.removeChild(textarea);
    }, 5000);
  }
  function convertToLuaTable(data) {
    var luaEntries = [];

    data.forEach(function (item) {
      var entry = [];

      // 处理必填字段
      ["date", "name", "file", "type", "author"].forEach(function (key) {
        entry.push(key + " = " + formatLuaValue(item[key]));
      });

      // 处理可选字段（仅在非空时输出）
      if (item.display_name) {
        entry.push("display_name = " + formatLuaValue(item.display_name));
      }
      if (item.unchecked) {
        entry.push("unchecked = " + formatLuaValue(item.unchecked));
      }

      luaEntries.push("{\n    " + entry.join(",\n    ") + "\n}");
    });

    return "{\n" + luaEntries.join(",\n") + "\n}";
  }

  function formatLuaValue(value) {
    if (value === null || value === undefined || value === "") {
      return '""';
    }
    if (typeof value === "string") {
      return '"' + value.replace(/"/g, '\\"') + '"';
    }
    return value;
  }
})();

$(function () {
  // 检查是否存在快速编辑面板
  var $panel = $(".quick-edit-books-panel");
  if ($panel.length) {
    initPanelMode($panel);
  } else {
    initAutoMode();
  }

  // 面板模式 - 直接显示输入表单
  function initPanelMode($container) {
    // 创建输入表单
    var $form = $("<div>").addClass("quick-edit-books-form");

    // 年份输入
    var $yearInput = createInput("年份", "year-input", "如: 2023");

    // 月份输入
    var $monthInput = createInput("月份", "month-input", "如: 5 或 05");

    // 加载按钮
    var $loadBtn = $("<button>")
      .addClass("cdx-button cdx-button--action-button")
      .text("加载编辑面板")
      .on("click", function () {
        var year = $("#year-input").val().trim();
        var month = $("#month-input").val().trim();

        if (validateInputs(year, month)) {
          quickEditBooks(parseInt(year, 10), parseInt(month, 10), true);
        }
      });

    $form.append($yearInput, $monthInput, $loadBtn);
    $container.append($form);
  }

  // 自动模式 - 从页面名提取年份月份
  function initAutoMode() {
    var defaultPageName = mw.config.get("wgPageName");
    var yearMonthMatch = defaultPageName.match(/(\d{4})-(\d{2})/);

    if (yearMonthMatch) {
      quickEditBooks(
        parseInt(yearMonthMatch[1], 10),
        parseInt(yearMonthMatch[2], 10)
      );
    }
  }

  // 创建输入框
  function createInput(label, id, placeholder) {
    return $("<div>")
      .addClass("quick-edit-input-group")
      .append(
        $("<label>").attr("for", id).text(label),
        $("<input>")
          .attr({
            type: "number",
            id: id,
            placeholder: placeholder
          })
          .addClass("cdx-text-input__input")
      );
  }

  // 输入验证
  function validateInputs(year, month) {
    // 验证年份
    var yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 1000 || !Number.isInteger(yearNum)) {
      mw.notify("请输入有效的4位年份", { type: "error" });
      return false;
    }

    // 验证月份
    var monthNum = parseInt(month);
    if (
      isNaN(monthNum) ||
      monthNum < 1 ||
      monthNum > 12 ||
      !Number.isInteger(monthNum)
    ) {
      mw.notify("请输入有效的月份 (1-12)", { type: "error" });
      return false;
    }

    return true;
  }
});