(function ($) {
  $(function () {
    // 1. 找到媒介顺序
    var mediaLabel = $(".pi-data-label").filter(function () {
      return $(this).text().trim() === "媒介";
    });

    if (mediaLabel.length === 0) {
      console.log('未找到"媒介"部分');
      return;
    }

    var mediaOrder = [];
    mediaLabel
      .closest(".pi-data")
      .find(".block-cat")
      .each(function () {
        mediaOrder.push($(this).text().trim());
      });

    console.log("媒介顺序:", mediaOrder);

    // 2. 定义要处理的section类型
    var sectionTypes = {
      轻小说: "轻小说信息",
      漫画: "漫画信息",
      动画: "动画信息"
    };

    // 3. 收集需要排序的section
    var sectionsContainer = $("aside");
    var sectionsToSort = [];
    var otherSections = [];

    sectionsContainer.find("section.pi-group").each(function () {
      var section = $(this);
      var title = section.find(".pi-header").text().trim();
      var matched = false;

      // 检查是否是我们要处理的section
      for (var media in sectionTypes) {
        if (sectionTypes[media] === title) {
          sectionsToSort.push({
            section: section,
            title: title,
            media: media
          });
          matched = true;
          break;
        }
      }

      if (!matched) {
        otherSections.push(section);
      }
    });

    console.log("找到可排序section:", sectionsToSort.length);

    // 4. 按媒介顺序排序
    var orderedSections = [];

    // 首先添加按媒介顺序排列的section
    mediaOrder.forEach(function (media) {
      var found = sectionsToSort.filter(function (item) {
        return item.media === media;
      });

      if (found.length > 0) {
        orderedSections.push(found[0].section);
      }
    });

    // 然后添加未匹配的section(保持原顺序)
    sectionsToSort.forEach(function (item) {
      if (orderedSections.indexOf(item.section) === -1) {
        orderedSections.push(item.section);
      }
    });

    // 5. 重新构建DOM
    if (orderedSections.length > 0) {
      console.log("开始重新排序...");

      // 先移除所有需要排序的section
      orderedSections.forEach(function (section) {
        section.detach();
      });

      // 找到插入点(最后一个不需要排序的section之后)
      var insertAfter =
        otherSections.length > 0
          ? otherSections[otherSections.length - 1]
          : sectionsContainer.children().first();

      // 重新插入排序后的section
      orderedSections.forEach(function (section) {
        section.insertAfter(insertAfter);
        insertAfter = section;
      });

      console.log("排序完成");
    } else {
      console.log("没有需要排序的section");
    }
  });
})(jQuery);