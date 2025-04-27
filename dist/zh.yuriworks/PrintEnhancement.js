$(function () {
  transformInfoboxesForPrint();
  transformVolumeTablesForPrint();
  
  // 在打印开始前和打印事件中触发转换
  if (window.matchMedia && window.matchMedia("print").matches) {
    $("body")
      .removeClass("theme-fandomdesktop-dark page-dark")
      .addClass("theme-fandomdesktop-light page-bright");
    normalizeWrappedImages();
  }

  function transformInfoboxesForPrint() {
    $(".portable-infobox").each(function () {
      var $orig = $(this);

      // 创建外层表格
      var $table = $('<table class="portable-infobox-table"></table>');

      // 遍历每个 pi-group
      $orig.find(".pi-group").each(function () {
        var $group = $(this);
        // 分组标题
        var groupTitle = $group.find(".pi-header").first().text();
        // 分组标题行
        $table.append(
          $("<tr></tr>").append(
            $('<th colspan="4" class="pit-group"></th>').text(groupTitle)
          )
        );

        // 收集所有数据项
        var $items = $group.find(".pi-data");
        for (var i = 0; i < $items.length; i += 2) {
          var $row = $("<tr></tr>");
          // 每行做两项（若最后一行只有一项，则补空单元格）
          for (var j = 0; j < 2; j++) {
            var idx = i + j;
            if (idx < $items.length) {
              var $item = $($items[idx]);
              var labelText = $item.find(".pi-data-label").text();
              var $valueNode = $item.find(".pi-data-value").clone();

              $row.append($('<td class="pit-label"></td>').text(labelText));
              $row.append(
                $('<td class="pit-value"></td>').append($valueNode.contents())
              );
            } else {
              // 补空单元格
              $row.append(
                '<td class="pit-label"></td><td class="pit-value"></td>'
              );
            }
          }
          $table.append($row);
        }
      });

      // 用新表格替换原信息框
      $orig.after($table);
    });
  }

  function transformVolumeTablesForPrint() {
    $(".volume-table").each(function () {
      try {
        var $table = $(this);
        var $tbody = $table.find("tbody");
        var $rows = $tbody.find("tr");
        if ($rows.length === 0) {
          return;
        }

        // 获取列标题（处理 colspan）
        var headers = [];
        $rows
          .eq(0)
          .find("td")
          .each(function () {
            var $cell = $(this);
            var colspan = parseInt($cell.attr("colspan"), 10) || 1;
            var text = $cell.text().trim();
            for (var k = 0; k < colspan; k++) {
              // 将 `${text}_${i+1}` 转为 ES5 拼接
              if (colspan > 1) {
                headers.push(text + "_" + (k + 1));
              } else {
                headers.push(text);
              }
            }
          });

        // 创建新的容器
        var $container = $('<div class="volume-print-container"></div>');

        // 收集所有数据行（除第一行标题外），过滤掉包含 ISBN/EAN 的行
        var allRowData = [];
        $rows.slice(1).each(function () {
          var $cells = $(this).find("th, td");
          if ($cells.length === 0) {
            return;
          }

          var rowTitle = $cells.eq(0).text().trim();
          if (/ISBN|EAN|书号|编码/i.test(rowTitle)) {
            return;
          }

          var rowCells = [];
          var cellIndex = 1; // 跳过标题列
          while (cellIndex < $cells.length) {
            var $cell = $cells.eq(cellIndex);
            var colspan = parseInt($cell.attr("colspan"), 10) || 1;
            var content = $cell.contents();
            for (var m = 0; m < colspan; m++) {
              rowCells.push(content.clone());
            }
            cellIndex++;
          }

          allRowData.push({
            title: rowTitle,
            cells: rowCells
          });
        });

        // 为每一卷创建卡片
        for (var volIndex = 0; volIndex < headers.length; volIndex++) {
          var $volumeCard = $('<div class="volume-card"></div>');
          // 将 `headers[volIndex].replace(/_\d+$/, "")` 保持不变
          $volumeCard.append(
            $('<div class="volume-title"></div>').text(
              headers[volIndex].replace(/_\d+$/, "")
            )
          );

          var hasContent = false;

          // 处理封面（固定第一行）
          if (allRowData[0] && allRowData[0].cells[volIndex]) {
            var $coverContent = $(allRowData[0].cells[volIndex]).clone();

            // 处理图片链接 - 优先使用 <a> 的 href
            $coverContent.find("a").each(function () {
              var $a = $(this);
              var $img = $a.find("img");
              if ($img.length > 0) {
                var href = $a.attr("href");
                var src = $img.attr("src") || $img.data("src");
                $img.attr("src", href || src).removeAttr("data-src");
                $img
                  .removeAttr("data-src")
                  .removeAttr("loading")
                  .removeClass("lazyloading lazyloaded lazyload");
                $a.replaceWith($img);
              }
            });

            if (
              $coverContent.text().trim() !== "" ||
              $coverContent.find("img").length > 0
            ) {
              $volumeCard.append(
                $('<div class="volume-cover"></div>').append($coverContent)
              );
              hasContent = true;
            }
          }

          // 处理其他信息行（从第二行开始）
          for (var rowIndex = 1; rowIndex < allRowData.length; rowIndex++) {
            var row = allRowData[rowIndex];
            if (!row || !row.cells[volIndex]) {
              continue;
            }

            var $content = $(row.cells[volIndex]).clone();
            var contentText = $content.text().trim();
            var contentHtml = "";
            try {
              contentHtml = $content.html().trim();
            } catch (e) {
              contentHtml = "";
            }

            if (
              contentText === "" &&
              contentHtml.replace(/<[^>]+>/g, "").trim() === ""
            ) {
              continue;
            }

            // 将模板字面量改为字符串拼接
            var labelText;
            if (row.title) {
              labelText = "(" + row.title.charAt(0) + ")";
            } else {
              labelText = "";
            }

            var $infoBlock = $('<div class="volume-info"></div>');
            $infoBlock.append(
              $('<span class="info-label"></span>').text(labelText + " ")
            );
            $infoBlock.append(
              $('<span class="info-content"></span>').append($content)
            );

            $volumeCard.append($infoBlock);
            hasContent = true;
          }

          if (hasContent) {
            $container.append($volumeCard);
          }
        }

        $table.after($container);
      } catch (e) {
        console.error("表格处理出错:", e);
      }
    });
  }
  
  function normalizeWrappedImages() {
    // 找到所有直接由 <a> 包裹的 <img>
    $(".mw-parser-output a:not(.wikia-gallery a) > img").each(function () {
      var $img = $(this);
      var $a = $img.parent();
      var href = $a.attr("href");
      var src = $img.attr("src") || $img.data("src") || "";
  
      // 优先用 a.href，不存在才用 img.src
      var finalSrc = href || src;
      if (finalSrc) {
        $img.attr("src", finalSrc);
      }
  
      // 清理 data-src 和懒加载类
      $img
        .removeAttr("data-src")
        .removeAttr("loading")
        .removeClass("lazyloading lazyloaded lazyload");
  
      // 用 img 替换 a
      $a.replaceWith($img);
    });
  }
});

// 添加打印样式
$(document).ready(function () {
  $("head").append(
    '<style type="text/css">' +
      "@media print {" +
      "  .volume-print-container {" +
      "    display: grid;" +
      "    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));" +
      "    gap: 10px;" +
      "    width: 100%;" +
      "  }" +
      "  .volume-card {" +
      "    border: 1px solid #ddd;" +
      "    page-break-inside: avoid;" +
      "    padding: 8px;" +
      "    display: flex;" +
      "    flex-direction: column;" +
      "    align-items: center;" +
      "  }" +
      "  .volume-title {" +
      "    font-weight: bold;" +
      "    text-align: center;" +
      "    margin-bottom: 8px;" +
      "    padding-bottom: 4px;" +
      "    border-bottom: 1px solid #eee;" +
      "  }" +
      "  .volume-cover {" +
      "    margin-bottom: 10px;" +
      "    text-align: center;" +
      "  }" +
      "  .volume-print-container .book-container {" +
      "    height: 216px;" +
      "    width: max-content;" +
      "  }" +
      "  .volume-cover img {" +
      "    max-width: 100%;" +
      "    height: auto;" +
      "    display: block;" +
      "    margin: 0 auto;" +
      "  }" +
      "  .volume-info {" +
      "    margin-bottom: 4px;" +
      "    line-height: 1.4;" +
      "  }" +
      "  .info-label {" +
      "    font-weight: bold;" +
      "    font-size: 0.9em;" +
      "    color: #555;" +
      "  }" +
      "  .table-wide:has(.volume-print-container):before {" +
      "    display:none;" +
      "  }" +
      "  @page {" +
      "    size: auto;" +
      "    margin: 10mm;" +
      "  }" +
      ".portable-infobox-table .pit-group {" +
      "    text-align: start;" +
      "    font-weight: initial;" +
      "    font-family: var(--heiti-font);" +
      "    font-size: larger;" +
      "    padding-inline-start: 10px;" +
      "    background-color: burlywood;" +
      "}" +
      ".pit-label {" +
      "    text-align: center;" +
      "    width: calc(5rem + 10px);" +
      "    background-color: antiquewhite;" +
      "}" +
      ".portable-infobox-table {" +
      "    width: 100%;" +
      "    border-collapse: collapse;" +
      "}" +
      ".portable-infobox-table :is(th, td) {" +
      "    border: burlywood solid 1px;" +
      "    padding: 5px;" +
      "}" +
      ".portable-infobox-table .block-cat.block-cat a {" +
      "    background: none;" +
      "}" +
      ".portable-infobox-table .pit-group:before {" +
      "    content: '★';" +
      "    padding-inline-end: 5px;" +
      "}" + 
      ".volume-table, .portable-infobox, #toc {" +
        "display: none" +
      "}}" +
      "@media not print {" +
      ".volume-print-container, .portable-infobox-table.portable-infobox-table {" +
        "display: none" +
      "}}" +
      "</style>"
  );
});