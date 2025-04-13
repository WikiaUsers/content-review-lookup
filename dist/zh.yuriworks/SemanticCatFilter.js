(function ($, mw) {
  $(document).ready(function () {
    // 对页面上所有 .semantic-category-filter 容器分别初始化
    $(".semantic-category-filter").each(function () {
      var container = $(this);

      // 创建输入框和按钮
      var inputContainer = $("<div></div>").addClass("cdx-text-input");
      var input = $('<input type="text" id="category-filter-input" placeholder="例如：漫画 or 动画 and 轻小说 或 含括号的分类如 a%(b%)c">')
                    .addClass("mw-inputbox-input cdx-text-input__input");
      inputContainer.append(input);
      var button = $('<button id="category-filter-submit">提交</button>').addClass("cdx-button");
      var inputAndButtonWrapper = $("<div></div>").addClass("semantic-category-input-wrapper");
      inputAndButtonWrapper.append(inputContainer).append(button);

      // 创建结果显示区域和逻辑解释区域
      var resultDiv = $('<div id="category-filter-result" style="margin-top:10px;"></div>');
      var logicExplanation = $('<div class="semantic-filter-logic"></div>');

      container.append(inputAndButtonWrapper).append(logicExplanation).append(resultDiv);

      button.on("click", function () {
        var expr = $.trim(input.val());
        if (!expr) {
          alert("请输入筛选语法片段");
          return;
        }
        var tokens, ast, cnfAst;
        try {
          tokens = tokenize(expr);
          ast = parseExpression(tokens);
          cnfAst = convertToCNF(ast); // 转换为合取范式

          // 显示合取范式逻辑解释
          var explanation = generateCNFExplanation(cnfAst);
          logicExplanation.html("<strong>筛选逻辑：</strong>" + explanation);
        } catch (e) {
          alert("解析筛选语法出错：" + e.message);
          return;
        }

        var categories = extractCategories(cnfAst);
        var categoryPages = {};
        var ajaxCalls = [];
        for (var i = 0; i < categories.length; i++) {
          (function (cat) {
            var dfd = $.Deferred();
            fetchCategoryPages(
              unescapeCategoryName(cat),
              function () {
                dfd.resolve();
              },
              function () {
                dfd.reject();
              },
              categoryPages
            );
            ajaxCalls.push(dfd.promise());
          })(categories[i]);
        }
        $.when.apply($, ajaxCalls)
          .done(function () {
            if (hasNotOperator(cnfAst)) {
              fetchAllMainPages(function (allPages) {
                var resultPages = evaluateAST(cnfAst, categoryPages, allPages);
                resultPages = excludePages(resultPages, container);
                displayResults(resultPages, resultDiv);
              });
            } else {
              var resultPages = evaluateAST(cnfAst, categoryPages, null);
              resultPages = excludePages(resultPages, container);
              displayResults(resultPages, resultDiv);
            }
          })
          .fail(function () {
            alert("获取页面数据出错");
          });
      });
    });
  });



  /*===== 分类名转义处理 =====*/
  function escapeCategoryName(name) {
    return name.replace(/\(/g, "%(").replace(/\)/g, "%)");
  }
  function unescapeCategoryName(name) {
    return name.replace(/\%\(/g, "(").replace(/\%\)/g, ")");
  }



  /*===== 合取范式(CNF)解释生成 =====*/
  function generateCNFExplanation(cnfAst) {
    var conditions = collectANDConditions(cnfAst);
    if (conditions.length === 0) {
      return "无筛选条件";
    }
    var explanation = '您的表达式筛选出了同时符合下述所有条件的页面：<ol>';
    conditions.forEach(function (cond) {
      explanation += "<li>" + explainORCondition(cond) + "</li>";
    });
    explanation += "</ol>";
    return explanation;
  }
  function explainORCondition(cond) {
    function explain(node) {
      switch (node.type) {
        case "category":
          var catName = unescapeCategoryName(node.value);
          return '<a href="' + mw.util.getUrl('Category:' + catName) + '">分类:' + catName + '</a>';
        case "not":
          if (node.child.type === "category") {
            var catName = unescapeCategoryName(node.child.value);
            return '不属于<a href="' + mw.util.getUrl('Category:' + catName) + '">分类:' + catName + '</a>';
          }
          return '非(' + explain(node.child) + ')';
        case "or":
          return explain(node.left) + "或" + explain(node.right);
        default:
          return explain(node);
      }
    }
    if (cond.type === "category" || cond.type === "not") {
      return explain(cond);
    }
    var parts = [];
    function collectORParts(node) {
      if (node.type === "or") {
        collectORParts(node.left);
        collectORParts(node.right);
      } else {
        parts.push(explain(node));
      }
    }
    collectORParts(cond);
    return parts.join("或");
  }



  /*===== 表达式解析 =====*/
  function tokenize(input) {
    var tokens = [];
    // 正则：优先匹配 "%(" 和 "%)" ，再匹配 "(" 和 ")"、and/or/not，
    // 其它为非空、非括号、非"%"的字符
    var re = /\s*(%\(|%\)|\(|\)|and|or|not|[^\s()%]+)/ig;
    var m;
    while ((m = re.exec(input)) !== null) {
      var t = m[1];
      if (/^and$/i.test(t)) tokens.push({ type: "AND" });
      else if (/^or$/i.test(t)) tokens.push({ type: "OR" });
      else if (/^not$/i.test(t)) tokens.push({ type: "NOT" });
      else if (t === "(") tokens.push({ type: "LPAREN" });
      else if (t === ")") tokens.push({ type: "RPAREN" });
      else if (t === "%(") tokens.push({ type: "CATEGORY", value: "(" });
      else if (t === "%)") tokens.push({ type: "CATEGORY", value: ")" });
      else tokens.push({ type: "CATEGORY", value: t });
    }
    // 合并相邻的 CATEGORY token
    var mergedTokens = [];
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (token.type === "CATEGORY" &&
          mergedTokens.length > 0 &&
          mergedTokens[mergedTokens.length - 1].type === "CATEGORY") {
        mergedTokens[mergedTokens.length - 1].value += token.value;
      } else {
        mergedTokens.push(token);
      }
    }
    return mergedTokens;
  }
  function parseExpression(tokens) {
    var pos = 0;
    function parseExpr() {
      var node = parsePrimary();
      while (pos < tokens.length &&
             (tokens[pos].type === "AND" || tokens[pos].type === "OR")) {
        var operator = tokens[pos].type.toLowerCase();
        pos++;
        node = {
          type: operator,
          left: node,
          right: parsePrimary()
        };
      }
      return node;
    }
    function parsePrimary() {
      if (pos >= tokens.length) throw new Error("不完整的表达式");
      if (tokens[pos].type === "NOT") {
        pos++;
        return { type: "not", child: parsePrimary() };
      }
      if (tokens[pos].type === "LPAREN") {
        pos++;
        var node = parseExpr();
        if (pos >= tokens.length || tokens[pos].type !== "RPAREN") {
          throw new Error("缺少右括号");
        }
        pos++;
        return node;
      }
      if (tokens[pos].type === "CATEGORY") {
        return { type: "category", value: tokens[pos++].value };
      }
      throw new Error("无效的表达式因子");
    }
    var ast = parseExpr();
    if (pos !== tokens.length) throw new Error("无法解析剩余部分");
    return ast;
  }
  function convertToCNF(ast) {
    if (!ast) return ast;
    ast = normalizeNotOperators(ast);
    if (ast.left) ast.left = convertToCNF(ast.left);
    if (ast.right) ast.right = convertToCNF(ast.right);
    if (ast.child) ast.child = convertToCNF(ast.child);
    if (ast.type === "or") {
      if (ast.left.type === "and") {
        return {
          type: "and",
          left: convertToCNF({ type: "or", left: ast.left.left, right: ast.right }),
          right: convertToCNF({ type: "or", left: ast.left.right, right: ast.right })
        };
      } else if (ast.right.type === "and") {
        return {
          type: "and",
          left: convertToCNF({ type: "or", left: ast.left, right: ast.right.left }),
          right: convertToCNF({ type: "or", left: ast.left, right: ast.right.right })
        };
      }
    }
    return ast;
  }
  function normalizeNotOperators(ast) {
    if (!ast) return ast;
    if (ast.left) ast.left = normalizeNotOperators(ast.left);
    if (ast.right) ast.right = normalizeNotOperators(ast.right);
    if (ast.child) ast.child = normalizeNotOperators(ast.child);
    if (ast.type === "not" && ast.child.type === "not") {
      return ast.child.child;
    }
    if (ast.type === "not") {
      if (ast.child.type === "and") {
        return {
          type: "or",
          left: { type: "not", child: ast.child.left },
          right: { type: "not", child: ast.child.right }
        };
      } else if (ast.child.type === "or") {
        return {
          type: "and",
          left: { type: "not", child: ast.child.left },
          right: { type: "not", child: ast.child.right }
        };
      }
    }
    return ast;
  }
  function collectANDConditions(ast) {
    var conditions = [];
    function traverse(node) {
      if (node.type === "and") {
        traverse(node.left);
        traverse(node.right);
      } else {
        conditions.push(node);
      }
    }
    if (ast) traverse(ast);
    return conditions;
  }
  /*===== 辅助函数 =====*/
  function extractCategories(ast) {
    var cats = {};
    function traverse(node) {
      if (node.type === "category") cats[node.value] = true;
      if (node.child) traverse(node.child);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(ast);
    return Object.keys(cats);
  }
  function hasNotOperator(ast) {
    var found = false;
    function traverse(node) {
      if (node.type === "not") found = true;
      if (node.child) traverse(node.child);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(ast);
    return found;
  }
  /*===== API 调用部分 =====*/
  function fetchCategoryPages(categoryName, success, failure, categoryPages) {
    var pages = [];
    var api = new mw.Api();
    function fetchBatch(continueParam) {
      var params = {
        action: "query",
        list: "categorymembers",
        cmtitle: "Category:" + categoryName,
        cmnamespace: 0,
        cmlimit: "max",
        cmfilterredir: "nonredirects",
        format: "json"
      };
      if (continueParam) params.cmcontinue = continueParam;
      api.get(params)
        .done(function (data) {
          if (data && data.query && data.query.categorymembers) {
            pages = pages.concat(data.query.categorymembers);
          }
          if (data.continue && data.continue.cmcontinue) {
            fetchBatch(data.continue.cmcontinue);
          } else {
            categoryPages[categoryName] = pages.map(function (m) {
              return m.title;
            });
            success();
          }
        })
        .fail(failure);
    }
    fetchBatch();
  }
  function fetchAllMainPages(callback) {
    var pages = [];
    var api = new mw.Api();
    function fetchBatch(apcontinue) {
      var params = {
        action: "query",
        list: "allpages",
        apnamespace: 0,
        aplimit: "max",
        apfilterredir: "nonredirects",
        format: "json"
      };
      if (apcontinue) params.apcontinue = apcontinue;
      api.get(params).done(function (data) {
        if (data && data.query && data.query.allpages) {
          pages = pages.concat(data.query.allpages);
        }
        if (data.continue && data.continue.apcontinue) {
          fetchBatch(data.continue.apcontinue);
        } else {
          callback(pages.map(function (p) {
            return p.title;
          }));
        }
      });
    }
    fetchBatch();
  }
  /*===== 集合运算 =====*/
  function setIntersection(a, b) {
    return a.filter(function (item) {
      return b.indexOf(item) !== -1;
    });
  }
  function setUnion(a, b) {
    return a.concat(b.filter(function (item) {
      return a.indexOf(item) === -1;
    }));
  }
  function setDifference(a, b) {
    return a.filter(function (item) {
      return b.indexOf(item) === -1;
    });
  }
  /*===== 结果评估与显示 =====*/
  function evaluateAST(ast, categoryPages, universe) {
    switch (ast.type) {
      case "category":
        return categoryPages[ast.value] || [];
      case "not":
        return universe ? setDifference(universe, evaluateAST(ast.child, categoryPages, universe)) : [];
      case "and":
        return setIntersection(evaluateAST(ast.left, categoryPages, universe), evaluateAST(ast.right, categoryPages, universe));
      case "or":
        return setUnion(evaluateAST(ast.left, categoryPages, universe), evaluateAST(ast.right, categoryPages, universe));
      default:
        return [];
    }
  }
  // 修改后的 excludePages 函数：从全局与当前容器中读取排除页，合并后对 pages 过滤
  function excludePages(pages, $container) {
    var globalExcludes = window.SemanticCatFilterExcludePages || [];
    var containerExcludes = [];
    var excludeText = $container.find(".exclude-pages").text();
    if (excludeText) {
      containerExcludes = excludeText.trim().split(/\s+/).map(function (item) {
        return item.replace(/_/g, " ");
      });
    }
    var allExcludes = globalExcludes.concat(containerExcludes);
    var uniqueExcludes = [];
    var seen = {};
    for (var i = 0; i < allExcludes.length; i++) {
      var page = allExcludes[i];
      if (!seen[page]) {
        seen[page] = true;
        uniqueExcludes.push(page);
      }
    }
    return uniqueExcludes.length > 0 ? setDifference(pages, uniqueExcludes) : pages;
  }
  function displayResults(pages, $container) {
    $container.empty();
    var countEl = $("<p></p>").text("筛选出页面数量：" + pages.length);
    $container.append(countEl);
    if (!pages.length) {
      $container.append("<p>未找到符合条件的页面</p>");
      return;
    }
    var list = $('<ol class="results-list" style="column-count:2; -webkit-column-count:2; -moz-column-count:2;"></ol>');
    pages.forEach(function (page) {
      list.append($("<li></li>").append($("<a></a>").attr("href", mw.util.getUrl(page)).text(page)));
    });
    $container.append(list);
  }
})(jQuery, mw);