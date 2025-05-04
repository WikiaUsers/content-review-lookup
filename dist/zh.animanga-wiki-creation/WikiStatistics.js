$(document).ready(function() {
    // 获取包含wiki列表的元素
    var wikiListContainer = $('.user-edits-by.month');
    if (wikiListContainer.length === 0) return;
    
    // 获取wiki列表
    var wikiList = wikiListContainer.text().trim().split('\n');
    if (wikiList.length === 0) return;
    
    // 清理wiki列表
    wikiList = wikiList.map(function(wiki) {
        return wiki.trim();
    }).filter(function(wiki) {
        return wiki.length > 0;
    });
    
    // 显示加载信息
    wikiListContainer.html('<p>正在加载编辑数据，请稍候...</p>');
    
    // 存储所有wiki的编辑数据和站点信息
    var allEditsData = {};
    var siteNames = {};
    var completedRequests = 0;
    var earliestMonth = null;
    
    // 为每个wiki获取编辑数据和站点名称
    wikiList.forEach(function(wikiUrl) {
        // 初始化存储结构
        allEditsData[wikiUrl] = {};
        
        // 确保URL格式正确
        var apiUrl = wikiUrl;
        if (!apiUrl.startsWith('http')) {
            apiUrl = 'https://' + apiUrl;
        }
        if (!apiUrl.endsWith('/api.php')) {
            apiUrl += '/api.php';
        }
        
        // 获取当前用户的用户名
        var username = mw.config.get('wgUserName');
        if (!username) {
            wikiListContainer.html('<p>错误：无法获取当前用户名</p>');
            return;
        }
        
        // 首先获取站点信息
        getSiteInfo(apiUrl, function(siteName) {
            siteNames[wikiUrl] = siteName;
            // 然后获取编辑数据
            getWikiEdits(apiUrl, username, wikiUrl);
        });
    });
    
    // 获取站点信息（站点名称）
    function getSiteInfo(apiUrl, callback) {
        $.ajax({
            url: apiUrl,
            data: {
                action: 'query',
                meta: 'siteinfo',
                siprop: 'general',
                format: 'json'
            },
            dataType: 'jsonp',
            success: function(data) {
                if (data.query && data.query.general) {
                    callback(data.query.general.sitename);
                } else {
                    // 如果无法获取站点名称，则使用URL的简化版本
                    var fallbackName = apiUrl.replace(/^https?:\/\//, '')
                                          .replace(/\/api\.php$/, '')
                                          .replace(/\.fandom\.com\/?/, '')
                                          .replace(/^[a-z]\./, ''); // 移除语言子域名
                    callback(fallbackName);
                }
            },
            error: function() {
                // 如果请求失败，使用URL的简化版本作为回退
                var fallbackName = apiUrl.replace(/^https?:\/\//, '')
                                      .replace(/\/api\.php$/, '')
                                      .replace(/\.fandom\.com\/?/, '')
                                      .replace(/^[a-z]\./, ''); // 移除语言子域名
                callback(fallbackName);
            }
        });
    }
    
    // 递归获取wiki编辑数据
    function getWikiEdits(apiUrl, username, wikiUrl, continueParams) {
        var params = {
            action: 'query',
            list: 'usercontribs',
            ucuser: username,
            ucprop: 'timestamp',
            uclimit: 'max', // 获取最大数量
            format: 'json'
        };
        
        // 添加continue参数（如果有）
        if (continueParams) {
            for (var key in continueParams) {
                params[key] = continueParams[key];
            }
        }
        
        // 使用JSONP跨域请求
        $.ajax({
            url: apiUrl,
            data: params,
            dataType: 'jsonp',
            success: function(data) {
                if (data.error) {
                    console.error('API错误:', data.error);
                    return;
                }
                
                // 处理编辑数据
                if (data.query && data.query.usercontribs) {
                    processContributions(data.query.usercontribs, wikiUrl);
                }
                
                // 检查是否需要继续获取
                if (data.continue) {
                    getWikiEdits(apiUrl, username, wikiUrl, data.continue);
                } else {
                    // 这个wiki的数据获取完成
                    completedRequests++;
                    
                    // 检查是否所有请求都完成了
                    if (completedRequests === wikiList.length) {
                        generateTable();
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error('请求失败:', wikiUrl, status, error);
                completedRequests++;
                
                // 即使有错误也继续检查是否所有请求都完成了
                if (completedRequests === wikiList.length) {
                    generateTable();
                }
            }
        });
    }
    
    // 处理编辑数据并按月份统计
    function processContributions(contributions, wikiUrl) {
        contributions.forEach(function(edit) {
            var timestamp = edit.timestamp;
            var date = new Date(timestamp);
            var monthYear = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0');
            
            // 初始化月份计数
            if (!allEditsData[wikiUrl][monthYear]) {
                allEditsData[wikiUrl][monthYear] = 0;
            }
            
            // 增加计数
            allEditsData[wikiUrl][monthYear]++;
            
            // 更新最早月份
            if (!earliestMonth || monthYear < earliestMonth) {
                earliestMonth = monthYear;
            }
        });
    }
    
    // 生成表格
    function generateTable() {
        // 如果没有数据，显示错误信息
        if (!earliestMonth) {
            wikiListContainer.html('<p>无法获取编辑数据</p>');
            return;
        }
        
        // 获取所有月份范围
        var months = getAllMonths(earliestMonth);
        
        // 创建表格容器
        var tableContainer = $('<div class="table-wide"></div>');
        var tableWrapper = $('<div class="table-wide-inner"></div>');
        
        // 创建表格
        var table = $('<table class="user-edits-table fandom-table sticky-first-column"></table>');
        var thead = $('<thead></thead>');
        var tbody = $('<tbody></tbody>');
        
        // 创建表头 - 年份行
        var yearRow = $('<tr class="year-header"></tr>');
        yearRow.append($('<th rowspan="2">Wiki</th>'));
        
        // 创建表头 - 月份行
        var monthRow = $('<tr class="month-header"></tr>');
        
        // 分组月份数据
        var yearGroups = groupMonthsByYear(months);
        
        // 填充年份和月份表头
        yearGroups.forEach(function(group) {
            yearRow.append($('<th colspan="' + group.months.length + '">' + group.year + '年' + '</th>'));
            
            group.months.forEach(function(month) {
                monthRow.append($('<th>' + formatMonth(month.split('-')[1]) + '</th>'));
            });
        });
        
        yearRow.append($('<th rowspan="2">总计</th>'));
        
        thead.append(yearRow);
        thead.append(monthRow);
        
        // 创建表格内容
        var wikiData = [];
        for (var wikiUrl in allEditsData) {
            var wikiName = siteNames[wikiUrl] || 
                          wikiUrl.replace(/^https?:\/\//, '')
                                .replace(/\/api\.php$/, '')
                                .replace(/\.fandom\.com\/?/, '')
                                .replace(/^[a-z]\./, '');
            
            var rowData = {
                name: wikiName,
                url: wikiUrl.replace(/\/api\.php$/, ''),
                edits: {},
                total: 0
            };
            
            months.forEach(function(month) {
                var edits = allEditsData[wikiUrl][month] || 0;
                rowData.edits[month] = edits;
                rowData.total += edits;
            });
            
            wikiData.push(rowData);
        }
        
        // 初始排序（降序）
        wikiData.sort(function(a, b) {
            return b.total - a.total;
        });
        
        // 添加wiki行
        wikiData.forEach(function(rowData) {
            var row = $('<tr></tr>');
            row.append($('<th><a href="' + rowData.url + '" target="_blank">' + rowData.name + '</a></th>'));
            
            months.forEach(function(month) {
                row.append($('<td>' + rowData.edits[month] + '</td>'));
            });
            
            row.append($('<td>' + rowData.total + '</td>'));
            tbody.append(row);
        });
        
        // 添加总计行
        var totalRow = $('<tr class="total-row"></tr>');
        totalRow.append($('<th><strong>总计</strong></th>'));
        
        var grandTotal = 0;
        months.forEach(function(month) {
            var monthTotal = 0;
            for (var wikiUrl in allEditsData) {
                monthTotal += allEditsData[wikiUrl][month] || 0;
            }
            totalRow.append($('<td><strong>' + monthTotal + '</strong></td>'));
            grandTotal += monthTotal;
        });
        
        totalRow.append($('<td><strong>' + grandTotal + '</strong></td>'));
        tbody.append(totalRow);
        
        // 组合表格
        table.append(thead);
        table.append(tbody);
        tableWrapper.append(table);
        tableContainer.append(tableWrapper);
        
        // 替换原始内容
        wikiListContainer.html(tableContainer);
        
        // 添加排序功能
        $('.sortable').on('click', function() {
            var $this = $(this);
            var isAsc = $this.hasClass('asc');
            
            // 切换排序方向
            $('.sort-icon').text(isAsc ? '↓' : '↑');
            $('.sortable').removeClass('asc desc');
            $this.addClass(isAsc ? 'desc' : 'asc');
            
            // 重新排序数据（排除总计行）
            var $rows = $('tbody tr').not('.total-row');
            $rows.sort(function(a, b) {
                var aTotal = parseInt($(a).find('td:last').text());
                var bTotal = parseInt($(b).find('td:last').text());
                return isAsc ? aTotal - bTotal : bTotal - aTotal;
            });
            
            // 重新插入行（保持总计行在最后）
            $rows.detach().appendTo('tbody');
        });
    }
    
    // 按年份分组月份
    function groupMonthsByYear(months) {
        var groups = [];
        var currentYear = null;
        var currentGroup = null;
        
        months.forEach(function(month) {
            var year = month.split('-')[0];
            
            if (year !== currentYear) {
                currentYear = year;
                currentGroup = {
                    year: year,
                    months: []
                };
                groups.push(currentGroup);
            }
            
            currentGroup.months.push(month);
        });
        
        return groups;
    }
    
    // 获取从最早月份到现在的所有月份
    function getAllMonths(startMonth) {
        var months = [];
        var startDate = new Date(startMonth + '-01');
        var currentDate = new Date();
        
        while (startDate <= currentDate) {
            var year = startDate.getFullYear();
            var month = (startDate.getMonth() + 1).toString().padStart(2, '0');
            months.push(year + '-' + month);
            
            // 移动到下个月
            startDate.setMonth(startDate.getMonth() + 1);
        }
        
        return months;
    }
    
    // 格式化月份显示 (例如: "01" → "1月")
    function formatMonth(monthStr) {
        return parseInt(monthStr) + '月';
    }
});