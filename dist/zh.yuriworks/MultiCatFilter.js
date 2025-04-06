$(document).ready(function () {
  // 禁用右键菜单
  $(document).on("contextmenu", ".category-btn", function (e) {
    e.preventDefault();
  });

  function initCategoryFilter() {
    $(".multi-cat-filter-no-js").hide();
    // 从指定div获取母分类列表
    var $parentCategoriesData = $("#multi-cat-filter-data");
    if ($parentCategoriesData.length === 0) {
      console.error("找不到母分类数据元素 #multi-cat-filter-data");
      return;
    }

    // 提取母分类（按空格分割）
    var parentCategories = $parentCategoriesData.text().trim().split(/\s+/);
    if (parentCategories.length === 0) {
      console.error("没有找到母分类数据");
      return;
    }

    // 获取结果容器
    var $resultsContainer = $("#multi-cat-filter-results");
    if ($resultsContainer.length === 0) {
      console.error("找不到结果容器 #multi-cat-filter-results");
      return;
    }

    // 清空结果容器并添加加载提示
    $resultsContainer.html(
      '<p class="loading-indicator">正在初始化分类筛选器...</p>'
    );

    // 创建筛选器UI容器
    var $filterContainer = $("<div>", { id: "multi-cat-filter-ui" });
    $resultsContainer.before($filterContainer);

    // 存储选中的分类
    var includedCategories = []; // 包含的分类
    var excludedCategories = []; // 排除的分类

    // 存储分类树（用于递归获取子分类）
    var categoryTree = {};

    // 存储文章数据
    var allArticles = {};

    // 为每个母分类创建UI
    parentCategories.forEach(function (parentCategory) {
      // 创建母分类容器
      var $parentDiv = $("<div>", { class: "parent-category" });

      // 创建标题容器
      var $titleContainer = $("<div>", { class: "title-container" });

      // 母分类标题
      var $title = $("<h3>").text(parentCategory);

      // 展开/折叠按钮
      var $toggleBtn = $("<button>", {
        class: "toggle-btn",
        html: "&#9660;" // 向下箭头
      });

      // 子分类容器
      var $childrenContainer = $("<div>", { class: "child-categories" });

      // 加载指示器
      $childrenContainer.append(
        $("<div>", {
          class: "loading-indicator",
          text: "加载子分类中..."
        })
      );

      // 构建DOM结构
      $titleContainer.append($title, $toggleBtn);
      $parentDiv.append($titleContainer, $childrenContainer);
      $filterContainer.append($parentDiv);

      // 标题点击事件 - 切换展开/折叠
      $titleContainer.on("click", function () {
        $childrenContainer.toggle();
        $toggleBtn.html(
          $childrenContainer.is(":visible") ? "&#9660;" : "&#9654;"
        );
      });

      // 加载子分类
      loadChildCategories(parentCategory, $childrenContainer, $toggleBtn);
    });

    // 更新结果容器提示
    $resultsContainer.html(
      '<p class="loading-indicator">请从上方选择分类进行筛选</p>'
    );

    // 加载子分类函数（递归获取所有子分类）
    function loadChildCategories(categoryName, $container, $toggleBtn) {
      var api = new mw.Api();

      api
        .get({
          action: "query",
          list: "categorymembers",
          cmtitle: "Category:" + categoryName,
          cmtype: "subcat",
          cmlimit: "max",
          format: "json"
        })
        .done(function (data) {
          // 移除加载指示器
          $container.find(".loading-indicator").first().remove();

          if (data.query && data.query.categorymembers) {
            var categories = data.query.categorymembers;

            if (categories.length === 0) {
              $container.append(
                $("<div>", {
                  class: "loading-indicator",
                  text: "没有子分类"
                })
              );
              return;
            }

            // 存储到分类树
            if (!categoryTree[categoryName]) {
              categoryTree[categoryName] = [];
            }

            // 创建子分类按钮
            categories.forEach(function (category) {
              var childCategoryName = category.title.replace(/^Category:/, "");
              categoryTree[categoryName].push(childCategoryName);

              var $btn = $("<button>", {
                text: childCategoryName,
                class: "category-btn"
              });

              // 左键点击 - 包含
              $btn.on("click", function (e) {
                if (e.button !== 0) return; // 只处理左键
                toggleCategorySelection(childCategoryName, $btn, "included");
              });

              // 右键点击 - 排除
              $btn.on("contextmenu", function (e) {
                e.preventDefault();
                toggleCategorySelection(childCategoryName, $btn, "excluded");
              });

              $container.append($btn);
            });

            // 加载完成后显示容器
            $container.show();
            $toggleBtn.html("&#9660;");
          } else {
            $container.append(
              $("<div>", {
                class: "error-message",
                text: "无法加载子分类"
              })
            );
          }
        })
        .fail(function (error) {
          $container.find(".loading-indicator").first().remove();
          $container.append(
            $("<div>", {
              class: "error-message",
              text: "加载子分类失败: " + error
            })
          );
        });
    }

    // 切换分类选择状态
    function toggleCategorySelection(category, $button, mode) {
      // 确定是包含还是排除操作
      var targetArray =
        mode === "included" ? includedCategories : excludedCategories;
      var oppositeArray =
        mode === "included" ? excludedCategories : includedCategories;
      var oppositeMode = mode === "included" ? "excluded" : "included";

      // 检查是否已在目标数组中
      var index = targetArray.indexOf(category);
      var oppositeIndex = oppositeArray.indexOf(category);

      if (index === -1) {
        // 添加到目标数组
        targetArray.push(category);
        $button.addClass(mode).removeClass(oppositeMode);

        // 如果在对立数组中，则移除
        if (oppositeIndex !== -1) {
          oppositeArray.splice(oppositeIndex, 1);
        }
      } else {
        // 已存在，则移除
        targetArray.splice(index, 1);
        $button.removeClass(mode);
      }

      // 更新筛选结果
      updateFilterResults();
    }

    // 更新筛选结果
    function updateFilterResults() {
      var $resultsDiv = $("#multi-cat-filter-results");

      // 验证不能只有排除分类
      if (includedCategories.length === 0 && excludedCategories.length > 0) {
        $resultsDiv.html(
          '<p class="error-message">不可以只筛选出排除的分类。请至少选择一个包含的分类。</p>'
        );
        return;
      }

      if (includedCategories.length === 0 && excludedCategories.length === 0) {
        $resultsDiv.html(
          '<p class="loading-indicator">请从上方选择分类进行筛选</p>'
        );
        return;
      }

      // 显示加载中
      $resultsDiv.html(
        '<p class="loading-indicator">正在筛选文章... <span class="mw-spinner"></span></p>'
      );

      // 获取所有包含分类及其子分类的文章
      var api = new mw.Api();
      var includePromises = includedCategories.map(function (category) {
        return getAllPagesInCategoryTree(category, api);
      });

      // 获取所有排除分类及其子分类的文章
      var excludePromises = excludedCategories.map(function (category) {
        return getAllPagesInCategoryTree(category, api);
      });

      // 等待所有请求完成
      Promise.all([Promise.all(includePromises), Promise.all(excludePromises)])
        .then(function (results) {
          var includedArticles = results[0].flat();
          var excludedArticles = results[1].flat();

          // 找出包含分类共有的文章
          var commonIncluded = findCommonArticles(results[0]);

          // 如果有排除分类，则过滤掉这些文章
          var finalArticles = commonIncluded;
          if (excludedArticles.length > 0) {
            finalArticles = commonIncluded.filter(function (article) {
              return !excludedArticles.includes(article);
            });
          }

          if (finalArticles.length === 0) {
            $resultsDiv.html(
              '<p class="loading-indicator">没有找到符合条件的文章</p>'
            );
            return;
          }

          // 创建结果HTML
          var html = '<div class="results-header">';
          html += "<h3>筛选结果 (" + finalArticles.length + " 篇文章)</h3>";

          if (includedCategories.length > 0) {
            html += "<p>包含的分类: " + includedCategories.join(", ") + "</p>";
          }

          if (excludedCategories.length > 0) {
            html += "<p>排除的分类: " + excludedCategories.join(", ") + "</p>";
          }

          html += "</div>";

          html += '<div class="results-list"><ul>';
          finalArticles.forEach(function (article) {
            html +=
              '<li><a href="' +
              mw.util.getUrl(article) +
              '">' +
              article +
              "</a></li>";
          });
          html += "</ul></div>";

          $resultsDiv.html(html);
        })
        .catch(function (error) {
          $resultsDiv.html(
            '<p class="error-message">加载文章时出错: ' + error + "</p>"
          );
        });
    }

    // 递归获取分类树中的所有页面
    function getAllPagesInCategoryTree(rootCategory, api) {
      return new Promise(function (resolve, reject) {
        // 检查缓存
        if (allArticles[rootCategory]) {
          resolve(allArticles[rootCategory]);
          return;
        }

        var allPages = [];
        var processedCategories = {};

        function processCategory(category) {
          if (processedCategories[category]) return Promise.resolve();
          processedCategories[category] = true;

          return new Promise(function (resolveCategory) {
            var pagesPromise = getPagesInCategory(category, api);
            var subcatsPromise = getSubcategories(category, api);

            Promise.all([pagesPromise, subcatsPromise])
              .then(function (results) {
                var pages = results[0];
                var subcats = results[1];

                allPages = allPages.concat(pages);

                var subPromises = subcats.map(function (subcat) {
                  return processCategory(subcat);
                });

                Promise.all(subPromises).then(resolveCategory);
              })
              .catch(reject);
          });
        }

        processCategory(rootCategory)
          .then(function () {
            var uniquePages = Array.from(new Set(allPages));
            allArticles[rootCategory] = uniquePages;
            resolve(uniquePages);
          })
          .catch(reject);
      });
    }

    // 获取分类下的所有页面（非递归）
    function getPagesInCategory(category, api) {
      return new Promise(function (resolve, reject) {
        var pages = [];
        var continueParams = {};

        function fetchBatch() {
          var params = {
            action: "query",
            list: "categorymembers",
            cmtitle: "Category:" + category,
            cmlimit: "max",
            cmtype: "page",
            format: "json"
          };

          $.extend(params, continueParams);

          api
            .get(params)
            .done(function (data) {
              if (data.query && data.query.categorymembers) {
                data.query.categorymembers.forEach(function (member) {
                  pages.push(member.title);
                });

                if (data.continue) {
                  continueParams = data.continue;
                  fetchBatch();
                } else {
                  resolve(pages);
                }
              } else {
                reject("没有获取到文章数据");
              }
            })
            .fail(reject);
        }

        fetchBatch();
      });
    }

    // 获取分类下的所有子分类
    function getSubcategories(category, api) {
      return new Promise(function (resolve, reject) {
        var subcategories = [];
        var continueParams = {};

        function fetchBatch() {
          var params = {
            action: "query",
            list: "categorymembers",
            cmtitle: "Category:" + category,
            cmlimit: "max",
            cmtype: "subcat",
            format: "json"
          };

          $.extend(params, continueParams);

          api
            .get(params)
            .done(function (data) {
              if (data.query && data.query.categorymembers) {
                data.query.categorymembers.forEach(function (member) {
                  subcategories.push(member.title.replace(/^Category:/, ""));
                });

                if (data.continue) {
                  continueParams = data.continue;
                  fetchBatch();
                } else {
                  resolve(subcategories);
                }
              } else {
                reject("没有获取到子分类数据");
              }
            })
            .fail(reject);
        }

        fetchBatch();
      });
    }

    // 找出多个分类共有的文章
    function findCommonArticles(articlesArrays) {
      if (articlesArrays.length === 0) return [];
      if (articlesArrays.length === 1) return articlesArrays[0];

      articlesArrays.sort(function (a, b) {
        return a.length - b.length;
      });

      return articlesArrays[0].filter(function (article) {
        for (var i = 1; i < articlesArrays.length; i++) {
          if (articlesArrays[i].indexOf(article) === -1) {
            return false;
          }
        }
        return true;
      });
    }
  }

  // 初始化
  initCategoryFilter();
});