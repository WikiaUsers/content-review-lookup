(function($) {
    /* 分类筛选器构造函数 */
    var CategoryFilter = function($container) {
        // DOM元素
        this.$container = $container;
        this.$resultsContainer = $container.find(".multi-cat-filter-results");
        this.$filterContainer = null;
        
        // 配置数据
        this.parentCategories = this.$container.find(".multi-cat-filter-data").text().trim().split(/\s+/);
        
        // 状态数据
        this.includedCategories = [];
        this.excludedCategories = [];
        this.categoryTree = {};
        this.allArticles = {};
    };

    /* 分类筛选器原型方法 */
    CategoryFilter.prototype = {
        init: function() {
            // 隐藏无JS提示
            this.$container.find(".multi-cat-filter-no-js").hide();
            
            // 验证必要元素
            if (this.parentCategories.length === 0) {
                console.error("没有找到母分类数据");
                return;
            }
            
            if (this.$resultsContainer.length === 0) {
                console.error("找不到结果容器 .multi-cat-filter-results");
                return;
            }
            
            // 初始化UI
            this.initUI();
        },
        
        initUI: function() {
            // 清空结果容器并添加加载提示
            this.$resultsContainer.html('<p class="loading-indicator">正在初始化分类筛选器...</p>');
            
            // 创建筛选器UI容器
            this.$filterContainer = $("<div>", { id: "multi-cat-filter-ui" });
            this.$resultsContainer.before(this.$filterContainer);
            
            // 为每个母分类创建UI
            var self = this;
            this.parentCategories.forEach(function(parentCategory) {
                self.createParentCategoryUI(parentCategory);
            });
            
            // 更新结果容器提示
            this.$resultsContainer.html('<p class="loading-indicator">请从上方选择分类进行筛选</p>');
        },
        
        createParentCategoryUI: function(parentCategory) {
            var self = this;
            
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
            this.$filterContainer.append($parentDiv);
            
            // 标题点击事件 - 切换展开/折叠
            $titleContainer.on("click", function() {
                $childrenContainer.toggle();
                $toggleBtn.html(
                    $childrenContainer.is(":visible") ? "&#9660;" : "&#9654;"
                );
            });
            
            // 加载子分类
            this.loadChildCategories(parentCategory, $childrenContainer, $toggleBtn);
        },
        
        loadChildCategories: function(categoryName, $container, $toggleBtn) {
            var self = this;
            var api = new mw.Api();
            
            api.get({
                action: "query",
                list: "categorymembers",
                cmtitle: "Category:" + categoryName,
                cmtype: "subcat",
                cmlimit: "max",
                format: "json"
            })
            .done(function(data) {
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
                    if (!self.categoryTree[categoryName]) {
                        self.categoryTree[categoryName] = [];
                    }
                    
                    // 创建子分类按钮
                    categories.forEach(function(category) {
                        var childCategoryName = category.title.replace(/^Category:/, "");
                        self.categoryTree[categoryName].push(childCategoryName);
                        
                        var $btn = $("<button>", {
                            text: childCategoryName,
                            class: "category-btn"
                        });
                        
                        // 左键点击 - 包含
                        $btn.on("click", function(e) {
                            if (e.button !== 0) return; // 只处理左键
                            self.toggleCategorySelection(childCategoryName, $btn, "included");
                        });
                        
                        // 右键点击 - 排除
                        $btn.on("contextmenu", function(e) {
                            e.preventDefault();
                            self.toggleCategorySelection(childCategoryName, $btn, "excluded");
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
            .fail(function(error) {
                $container.find(".loading-indicator").first().remove();
                $container.append(
                    $("<div>", {
                        class: "error-message",
                        text: "加载子分类失败: " + error
                    })
                );
            });
        },
        
        toggleCategorySelection: function(category, $button, mode) {
            // 确定是包含还是排除操作
            var targetArray = mode === "included" ? this.includedCategories : this.excludedCategories;
            var oppositeArray = mode === "included" ? this.excludedCategories : this.includedCategories;
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
            this.updateFilterResults();
        },
        
        updateFilterResults: function() {
            var $resultsDiv = this.$resultsContainer;
            
            // 验证不能只有排除分类
            if (this.includedCategories.length === 0 && this.excludedCategories.length > 0) {
                $resultsDiv.html(
                    '<p class="error-message">不可以只筛选出排除的分类。请至少选择一个包含的分类。</p>'
                );
                return;
            }
            
            if (this.includedCategories.length === 0 && this.excludedCategories.length === 0) {
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
            var self = this;
            var includePromises = this.includedCategories.map(function(category) {
                return self.getAllPagesInCategoryTree(category, api);
            });
            
            // 获取所有排除分类及其子分类的文章
            var excludePromises = this.excludedCategories.map(function(category) {
                return self.getAllPagesInCategoryTree(category, api);
            });
            
            // 等待所有请求完成
            Promise.all([Promise.all(includePromises), Promise.all(excludePromises)])
                .then(function(results) {
                    var includedArticles = results[0].flat();
                    var excludedArticles = results[1].flat();
                    
                    // 找出包含分类共有的文章
                    var commonIncluded = self.findCommonArticles(results[0]);
                    
                    // 如果有排除分类，则过滤掉这些文章
                    var finalArticles = commonIncluded;
                    if (excludedArticles.length > 0) {
                        finalArticles = commonIncluded.filter(function(article) {
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
                    
                    if (self.includedCategories.length > 0) {
                        html += "<p>包含的分类: " + self.includedCategories.join(", ") + "</p>";
                    }
                    
                    if (self.excludedCategories.length > 0) {
                        html += "<p>排除的分类: " + self.excludedCategories.join(", ") + "</p>";
                    }
                    
                    html += "</div>";
                    
                    html += '<ol class="results-list">';
                    finalArticles.forEach(function(article) {
                        html +=
                            '<li><a href="' +
                            mw.util.getUrl(article) +
                            '">' +
                            article +
                            "</a></li>";
                    });
                    html += "</ol>";
                    
                    $resultsDiv.html(html);
                })
                .catch(function(error) {
                    $resultsDiv.html(
                        '<p class="error-message">加载文章时出错: ' + error + "</p>"
                    );
                });
        },
        
        getAllPagesInCategoryTree: function(rootCategory, api) {
            var self = this;
            return new Promise(function(resolve, reject) {
                // 检查缓存
                if (self.allArticles[rootCategory]) {
                    resolve(self.allArticles[rootCategory]);
                    return;
                }
                
                var allPages = [];
                var processedCategories = {};
                
                function processCategory(category) {
                    if (processedCategories[category]) return Promise.resolve();
                    processedCategories[category] = true;
                    
                    return new Promise(function(resolveCategory) {
                        var pagesPromise = self.getPagesInCategoryWithContinue(category, api);
                        var subcatsPromise = self.getSubcategoriesWithContinue(category, api);
                        
                        Promise.all([pagesPromise, subcatsPromise])
                            .then(function(results) {
                                var pages = results[0];
                                var subcats = results[1];
                                
                                allPages = allPages.concat(pages);
                                
                                var subPromises = subcats.map(function(subcat) {
                                    return processCategory(subcat);
                                });
                                
                                Promise.all(subPromises).then(resolveCategory);
                            })
                            .catch(reject);
                    });
                }
                
                processCategory(rootCategory)
                    .then(function() {
                        var uniquePages = Array.from(new Set(allPages));
                        self.allArticles[rootCategory] = uniquePages;
                        resolve(uniquePages);
                    })
                    .catch(reject);
            });
        },
        
        getPagesInCategoryWithContinue: function(category, api) {
            return new Promise(function(resolve, reject) {
                var allPages = [];
                var params = {
                    action: "query",
                    list: "categorymembers",
                    cmtitle: "Category:" + category,
                    cmtype: "page",
                    cmlimit: "max",
                    format: "json"
                };
                
                function fetchBatch(continueParams) {
                    // 合并继续参数
                    var requestParams = $.extend({}, params, continueParams);
                    
                    api.get(requestParams)
                        .done(function(data) {
                            if (data.query && data.query.categorymembers) {
                                // 添加当前批次的页面
                                data.query.categorymembers.forEach(function(member) {
                                    // 排除首页（Main Page）
                                    if (member.title !== "Main Page") {
                                        allPages.push(member.title);
                                    }
                                });
                                
                                // 检查是否有更多数据
                                if (data.continue && data.continue.cmcontinue) {
                                    // 继续获取下一批数据
                                    fetchBatch({ cmcontinue: data.continue.cmcontinue });
                                } else {
                                    // 所有数据获取完成
                                    resolve(allPages);
                                }
                            } else {
                                reject("没有获取到文章数据");
                            }
                        })
                        .fail(reject);
                }
                
                // 开始获取第一页数据
                fetchBatch({});
            });
        },
        
        getSubcategoriesWithContinue: function(category, api) {
            return new Promise(function(resolve, reject) {
                var allSubcategories = [];
                var params = {
                    action: "query",
                    list: "categorymembers",
                    cmtitle: "Category:" + category,
                    cmtype: "subcat",
                    cmlimit: "max",
                    format: "json"
                };
                
                function fetchBatch(continueParams) {
                    // 合并继续参数
                    var requestParams = $.extend({}, params, continueParams);
                    
                    api.get(requestParams)
                        .done(function(data) {
                            if (data.query && data.query.categorymembers) {
                                // 添加当前批次的子分类
                                data.query.categorymembers.forEach(function(member) {
                                    allSubcategories.push(member.title.replace(/^Category:/, ""));
                                });
                                
                                // 检查是否有更多数据
                                if (data.continue && data.continue.cmcontinue) {
                                    // 继续获取下一批数据
                                    fetchBatch({ cmcontinue: data.continue.cmcontinue });
                                } else {
                                    // 所有数据获取完成
                                    resolve(allSubcategories);
                                }
                            } else {
                                reject("没有获取到子分类数据");
                            }
                        })
                        .fail(reject);
                }
                
                // 开始获取第一页数据
                fetchBatch({});
            });
        },
        
        findCommonArticles: function(articlesArrays) {
            if (articlesArrays.length === 0) return [];
            if (articlesArrays.length === 1) return articlesArrays[0];
            
            articlesArrays.sort(function(a, b) {
                return a.length - b.length;
            });
            
            return articlesArrays[0].filter(function(article) {
                for (var i = 1; i < articlesArrays.length; i++) {
                    if (articlesArrays[i].indexOf(article) === -1) {
                        return false;
                    }
                }
                return true;
            });
        }
    };

    /* 初始化所有分类筛选器 */
    $(document).ready(function() {
        // 禁用右键菜单
        $(document).on("contextmenu", ".category-btn", function(e) {
            e.preventDefault();
        });
        
        // 对每个筛选器容器初始化
        $(".multi-cat-filter-container").each(function() {
            var filter = new CategoryFilter($(this));
            filter.init();
        });
    });
})(jQuery);