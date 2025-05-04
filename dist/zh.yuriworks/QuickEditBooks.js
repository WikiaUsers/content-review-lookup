/**
 * 快速编辑模块 (ES5+jQuery版)
 */
var quickEditBooks = (function() {
    // 存储编辑历史
    var editHistory = [];
    var currentHistoryIndex = -1;
    var originalData = null;
    var currentData = null;
    var popupInstance = null;
    var lastCellEdit = null;
    var FIELD_DEFINITIONS = [
        { key: 'date', label: '发售日' },
        { key: 'name', label: '作品页面名' },
        { key: 'display_name', label: '作品显示名' },
        { key: 'file', label: '文件名' },
        { key: 'type', label: '书籍卷次' },
        { key: 'author', label: '作者' },
        { key: 'unchecked', label: '需要检查' }
    ];
    var REQUIRED_FIELDS = FIELD_DEFINITIONS.map(function(item) { return item.key; });
    var currentFields = REQUIRED_FIELDS.slice(); // 创建副本
    
    // 主函数
    return function(year, month) {
        if (!mw.config.get('wgIsProbablyEditable')) {
            mw.notify('您没有编辑权限');
            return;
        }
        
        var formattedMonth = month < 10 ? '0' + month : month;
        addQuickEditButton(year, month);
    };
    
    // 加载数据
    function loadAndShowEditDialog(year, month) {
        var formattedMonth = month < 10 ? '0' + month : month;
        var pageName = 'Module:数据存档/发售书籍/' + year + '-' + formattedMonth;
        
        new mw.Api().get({
            action: 'query',
            prop: 'revisions',
            titles: pageName,
            rvprop: 'content',
            format: 'json'
        }).done(function(data) {
            var pages = data.query.pages;
            var pageId = Object.keys(pages)[0];
            
            if (pageId === '-1') {
                // 页面不存在时创建空数据
                originalData = [createEmptyRow()];
                currentData = [createEmptyRow()];
            } else {
                var content = pages[pageId].revisions[0]['*'];
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
            
            editHistory = [{
                state: JSON.parse(JSON.stringify(currentData)),
                action: 'init',
                timestamp: Date.now()
            }];
            currentHistoryIndex = 0;
            
            showEditDialog(currentData, pageName);
        }).fail(function() {
            mw.notify('加载模块失败');
            // 加载失败时创建空数据
            originalData = [createEmptyRow()];
            currentData = [createEmptyRow()];
            editHistory = [{
                state: JSON.parse(JSON.stringify(currentData)),
                action: 'init',
                timestamp: Date.now()
            }];
            currentHistoryIndex = 0;
            showEditDialog(currentData, 'Module:数据存档/发售书籍/' + year + '-' + (month < 10 ? '0' + month : month));
        });
    }
    
    // 创建空行
    function createEmptyRow() {
        var row = {};
        REQUIRED_FIELDS.forEach(function(key) {
            row[key] = '';
        });
        return row;
    }
    
    // Lua表解析
    function extractLuaTable(content) {
        try {
            // 1. 预处理内容
            var tableStr = content
                .replace(/--.*$/gm, '')      // 移除注释
                .replace(/^\s*return\s*/, '') // 移除return关键字
                .trim();
    
            // 2. 转换最外层括号（确保是数组）
            tableStr = tableStr.replace(/^\s*\{/, '[').replace(/\}\s*$/, ']');
    
            // 3. 转换键值对格式
            tableStr = tableStr
                .replace(/([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, '"$1":')  // key = → "key":
                .replace(/"\s*:/g, '":');  // 移除键名后的多余空格
    
            // 4. 【关键修正】移除所有对象/数组末尾的逗号
            tableStr = tableStr.replace(/,\s*([}\]])/g, '$1');
    
            // 5. 处理字符串值
            tableStr = tableStr.replace(/(["'])(.*?)\1/g, function(_, quote, val) {
                return '"' + val.replace(/"/g, '\\"') + '"';
            });
    
            // 6. 处理未加引号的字符串值
            tableStr = tableStr.replace(/:([^"{}\[\],\s][^,}\n]*)([,}\]])/g, 
                function(_, val, end) { return ': "' + val.trim() + '"' + end; }
            );
    
            // 7. 最终解析
            var result = JSON.parse(tableStr);
    
            // 8. 规范化字段
            var allKeys = [];
            result.forEach(function(item) {
                for (var key in item) {
                    if (allKeys.indexOf(key) === -1) {
                        allKeys.push(key);
                    }
                }
            });
            
            return result.map(function(item) {
                var obj = {};
                allKeys.forEach(function(key) {
                    obj[key] = item[key] || "";
                });
                return obj;
            });
    
        } catch (e) {
            console.error('解析失败:', e, '\n当前内容:', tableStr, '\n原始内容:', content);
            mw.notify('解析失败: ' + e.message);
            return null;
        }
    }
    
    // 修改后的addQuickEditButton函数
    function addQuickEditButton(year, month) {
        if ($('#ca-quick-edit').length) return;
        
        var $button = $(
            '<a class="wds-button wds-is-text page-header__action-button has-label has-ripple unbounded-ripple" href="#" id="ca-quick-edit" data-tracking-label="ca-quick-edit" accesskey="q">' +
                '<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-pencil-small"></use></svg>快速编辑<div class="ripple-surface"></div>' +
            '</a>'
        );
        
        $('.page-header__actions').prepend($button);
        
        $button.click(function(e) {
            e.preventDefault();
            $button.addClass('is-loading');
            loadAndShowEditDialog(year, month);
            setTimeout(function() {
                $button.removeClass('is-loading');
            }, 500);
        });
    }
    
    // 生成表格HTML
    function generateTableHtml(data) {
        var $table = $('<table>').addClass('fandom-table quick-edit-books-table');
        var $thead = $('<thead>').appendTo($table);
        var $tbody = $('<tbody>').appendTo($table);
        
        // 创建表头
        var $headerRow = $('<tr>').appendTo($thead);
        $headerRow.append($('<th>').text('操作'));
        
        FIELD_DEFINITIONS.forEach(function(field) {
            $headerRow.append($('<th>').text(field.label));
        });
        
        // 处理数据行
        if (data && data.length > 0) {
            data.forEach(function(item, index) {
                createTableRow($tbody, item, index, data.length);
            });
        } else {
            $tbody.append(createAddRowTd());
        }
        
        return $table;
    }
    
    function createTableRow($tbody, item, index, totalRows) {
        var $row = $('<tr>').attr('data-index', index).appendTo($tbody);
        
        // 操作列
        var $actionCell = $('<td>').addClass('row-actions');
        if (index > 0) $actionCell.append($('<button>').addClass('move-up').attr('title', '上移此行').html('↑'));
        if (index < totalRows - 1) $actionCell.append($('<button>').addClass('move-down').attr('title', '下移此行').html('↓'));
        $actionCell.append($('<button>').addClass('delete-row').attr('title', '删除此行').html('×'));
        $row.append($actionCell);
        
        // 数据列
        REQUIRED_FIELDS.forEach(function(key) {
            $row.append(
                $('<td>').attr('contenteditable', 'true')
                         .text(item[key] || '')
            );
        });
        $row.append($('<td>').addClass('add-row-td').attr('title', '增加新行'));
    }
    
    function createAddRowTd() {
        return $('<tr>').append(
            $('<td>').addClass('add-row-td')
                     .attr('colspan', REQUIRED_FIELDS.length + 1)
        );
    }

    // 显示编辑对话框
    function showEditDialog(data, pageName) {
        popupInstance = PopupGenerator.createPopup({
            headerText: '快速编辑 - 加载中...',
            content: '<div class="loading-spinner">加载数据...</div>',
            mode: 'create'
        });
        popupInstance.open();

        setTimeout(function() {
            var $controls = $('<div>').addClass('quick-edit-controls').append(
                $('<button>').addClass('cdx-button undo-btn').text('撤销 (Ctrl+Z)'),
                $('<button>').addClass('cdx-button reset-btn').text('重置'),
                $('<button>').addClass('cdx-button save-btn').text('保存')
            );

            var $tableContainer = $('<div>').addClass('quick-edit-table-container');
            var $table = generateTableHtml(data);
            $tableContainer.append($table);

            popupInstance.contentElement.html('').append($controls, $tableContainer);
            popupInstance.popupElement.find('.popup-box-header-text').text('快速编辑 - 书籍数据');
            popupInstance.popupElement.addClass('quick-edit-books-popup');

            bindTableEvents($tableContainer, data, pageName);
            
            $(document).on('keydown.quickEdit', function(e) {
                if (e.ctrlKey && e.key === 'z') {
                    e.preventDefault();
                    undoEdit();
                }
            });
        }, 50);
    }
    
    // 绑定表格事件
    function bindTableEvents($container, data, pageName) {
        $container.off();
        $container.closest('.popup-box-content').off('click', '.undo-btn');
        $container.closest('.popup-box-content').off('click', '.reset-btn');
        $container.closest('.popup-box-content').off('click', '.save-btn');
        
        var $table = $container.find('table');
        
        $container.closest('.popup-box-content')
            .on('click', '.undo-btn', function() {
                undoEdit();
            })
            .on('click', '.reset-btn', function() {
                if (confirm('确定还原到初始状态？')) {
                    saveEditState('pre-reset');
                    currentData = JSON.parse(JSON.stringify(originalData));
                    
                    // 确保至少有一行
                    if (currentData.length === 0) {
                        currentData.push(createEmptyRow());
                    }
                    
                    refreshTable($container, currentData, pageName);
                    saveEditState('reset', {
                        restoredFrom: currentHistoryIndex - 1
                    });
                    mw.notify('已还原到初始状态');
                }
            })
            .on('click', '.save-btn', function() {
                // 检查是否所有行都是空的
                var isEmpty = true;
                for (var i = 0; i < currentData.length; i++) {
                    for (var key in currentData[i]) {
                        if (currentData[i][key] && currentData[i][key].trim() !== '') {
                            isEmpty = false;
                            break;
                        }
                    }
                    if (!isEmpty) break;
                }
                
                if (isEmpty) {
                    mw.notify('无法保存，所有行都是空的');
                    return;
                }
                
                saveChanges(currentData, pageName);
            });
        
        $table.on('click', '.delete-row', function() {
            var rowIndex = $(this).closest('tr').data('index');
            var deletedRow = JSON.parse(JSON.stringify(data[rowIndex]));
            
            saveEditState('pre-delete', { row: rowIndex });
            data.splice(rowIndex, 1);
            
            // 如果删除了所有行，添加一个空行
            if (data.length === 0) {
                data.push(createEmptyRow());
            }
            
            refreshTable($container, data, pageName);
            saveEditState('delete', {
                row: rowIndex,
                deletedData: deletedRow
            });
        });
        
		$container.on('click', 'td.add-row-td', function() {
		    var $clickedRow = $(this).closest('tr');
		    var currentIndex = $clickedRow.data('index');
		    
		    // 修改插入位置为当前行之后
		    var insertIndex = currentIndex + 1;
		    
		    saveEditState('pre-insert', { position: insertIndex });
		    
		    var newItem = createEmptyRow();
		    data.splice(insertIndex, 0, newItem);
		    
		    refreshTable($container, data, pageName);
		    saveEditState('insert', {
		        position: insertIndex,
		        newData: newItem
		    });
		    
		    setTimeout(function() {
		        $container.find('tr[data-index="' + insertIndex + '"] td[contenteditable]:first')
		            .focus()
		            .addClass('focusing');
		    }, 50);
		});

        $container.on('click', '.move-up', function() {
            var $row = $(this).closest('tr');
            var currentIndex = $row.data('index');
            
            if (currentIndex > 0) {
                saveEditState('pre-move', { 
                    action: 'move-up',
                    from: currentIndex,
                    to: currentIndex - 1 
                });
                
                swapRows(data, currentIndex, currentIndex - 1);
                
                saveEditState('move', {
                    action: 'move-up',
                    from: currentIndex,
                    to: currentIndex - 1
                });
                
                refreshTable($container, data, pageName);
                mw.notify('已上移第 ' + (currentIndex + 1) + ' 行到第 ' + currentIndex + ' 行');
            } else {
                mw.notify('已经是第一行，无法上移');
            }
        });

        $container.on('click', '.move-down', function() {
            var $row = $(this).closest('tr');
            var currentIndex = $row.data('index');
            
            if (currentIndex < data.length - 1) {
                saveEditState('pre-move', {
                    action: 'move-down',
                    from: currentIndex,
                    to: currentIndex + 1
                });
                
                swapRows(data, currentIndex, currentIndex + 1);
                
                saveEditState('move', {
                    action: 'move-down',
                    from: currentIndex,
                    to: currentIndex + 1
                });
                
                refreshTable($container, data, pageName);
                mw.notify('已下移第 ' + (currentIndex + 1) + ' 行到第 ' + (currentIndex + 2) + ' 行');
            } else {
                mw.notify('已经是最后一行，无法下移');
            }
        });

        $container.on('input', 'td[contenteditable]', function() {
            var $cell = $(this);
            var $row = $cell.closest('tr');
            var rowIndex = $row.data('index');
            var fieldName = REQUIRED_FIELDS[$cell.index() - 1];
            
            data[rowIndex][fieldName] = $cell.text();
            
            saveEditState('cell-edit', {
                row: rowIndex,
                field: fieldName,
                value: $cell.text()
            });
        });
        
        $container.on('focus', 'td[contenteditable]', function() {
            $container.find('.focusing').removeClass('focusing');
            $(this).addClass('focusing');
        });
        
        $container.on('blur', 'td[contenteditable]', function() {
            var $cell = $(this);
            setTimeout(function() {
                if (!$cell.is(':focus')) {
                    $cell.removeClass('focusing');
                }
            }, 100);
        });
        
        $container.on('keydown', 'td[contenteditable]', function(e) {
            var $cell = $(this);
            var $row = $cell.closest('tr');
            var colIndex = $cell.index();
            var rowIndex = $row.data('index');
            
            if (e.key === 'Tab') {
                e.preventDefault();
                var $nextCell = e.shiftKey 
                    ? $cell.prev('td[contenteditable]') 
                    : $cell.next('td[contenteditable]');
                
                if ($nextCell.length) {
                    $nextCell.focus().addClass('focusing');
                    $cell.removeClass('focusing');
                }
            }
            
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
                var $targetRow = e.key === 'ArrowUp' 
                    ? $row.prev('tr[data-index]') 
                    : $row.next('tr[data-index]');
                
                if ($targetRow.length) {
                    var $targetCell = $targetRow.find('td[contenteditable]').eq(colIndex - 1);
                    $targetCell.focus().addClass('focusing');
                    $cell.removeClass('focusing');
                }
            }
        });
        
        $container.on('touchstart', 'td[contenteditable]', function() {
            $(this).focus();
        });
    }

    function refreshTable($container, data, pageName) {
        var $newTable = generateTableHtml(data);
        $container.find('table').replaceWith($newTable);
        bindTableEvents($container, data, pageName);
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
            mw.notify('没有更多可撤销的操作');
            return;
        }
        
        currentHistoryIndex--;
        var prevState = editHistory[currentHistoryIndex].state;
        var undoneAction = editHistory[currentHistoryIndex + 1];
        
        currentData = JSON.parse(JSON.stringify(prevState));
        refreshTable(popupInstance.contentElement.find('.quick-edit-table-container'), currentData);
        
        var actionMsg = getActionMessage(undoneAction);
        mw.notify('已撤销: ' + actionMsg);
    }

    function getActionMessage(action) {
        if (!action || !action.action) return "操作";
        
        switch(action.action) {
            case 'cell-edit':
				 fieldDefinition = FIELD_DEFINITIONS.find(function(f) {
				    return f.key === action.target.field;
				});
				var fieldLabel = (fieldDefinition && fieldDefinition.label) || action.target.field;
                return '编辑第' + (action.target.row + 1) + '行的' + fieldLabel;
            case 'move-up':
                return '上移第' + (action.target.from + 1) + '行到第' + (action.target.to + 1) + '行';
            case 'move-down':
                return '下移第' + (action.target.from + 1) + '行到第' + (action.target.to + 1) + '行';
            case 'delete':
                return '删除第' + (action.target.row + 1) + '行';
            case 'insert':
                return '添加第' + (action.target.position + 1) + '行';
            case 'reset':
                return '还原到初始状态';
            default:
                return "操作";
        }
    }
    
function saveChanges(data, pageName) {
    if (!mw.config.get('wgIsProbablyEditable')) {
        mw.notify('无编辑权限');
        return;
    }

    new mw.Api().get({
        action: 'query',
        titles: pageName,
        prop: 'info',
        format: 'json'
    }).then(function(infoData) {
        var pages = infoData.query.pages;
        var pageId = Object.keys(pages)[0];
        var baserevid = pages[pageId].lastrevid || 0;
        
        var editParams = {
            action: 'edit',
            title: pageName,
            text: 'return ' + convertToLuaTable(data),
            summary: '使用快速编辑工具更新数据',
            format: 'json',
            token: mw.user.tokens.get('editToken'),
            baserevid: baserevid
        };
        
        return new mw.Api().postWithEditToken(editParams);
    }).then(function() {
        mw.notify('保存成功');
        originalData = JSON.parse(JSON.stringify(data));
        popupInstance && popupInstance.close();
    }).catch(function(error) {
        var errorMsg = '保存失败: ';
        
        // 检测网络状态
        if (!navigator.onLine) {
            errorMsg = '网络已断开，无法保存到服务器';
            console.error('网络连接已断开');
        } 
        // 处理API错误
        else if (typeof error === 'string') {
            errorMsg += getApiErrorMessage(error);
        } 
        // 处理其他错误
        else if (error instanceof Error) {
            errorMsg += error.message;
            console.error('保存错误详情:', error.stack);
        } 
        // 未知错误
        else {
            errorMsg += '未知错误';
            console.error('未知保存错误:', error);
        }
        
        mw.notify(errorMsg, { type: 'error' });
        
        // 无论何种错误都提供保存到本地的选项
        var userChoice = confirm(errorMsg + '\n\n是否要将内容保存到本地文件？');
        if (userChoice) {
            saveToLocalFile(data, pageName);
        }
    });
}

// 获取API错误消息
function getApiErrorMessage(errorCode) {
    var messages = {
        'missingparam': '缺少必要参数',
        'badtoken': '无效的编辑令牌',
        'protectedpage': '页面受保护，无法编辑',
        'editconflict': '编辑冲突，请刷新后重试',
        'nosuchpage': '页面不存在',
        'readonly': '维基处于只读模式',
        'ratelimited': '操作过于频繁，请稍后再试'
    };
    return messages[errorCode] || errorCode;
}

// 保存到本地文件
function saveToLocalFile(data, pageName) {
    try {
        // 检查浏览器是否支持Blob API
        if (typeof Blob === 'undefined') {
            throw new Error('您的浏览器不支持文件保存功能');
        }
        
        var luaContent = 'return ' + convertToLuaTable(data);
        var fileName = getBackupFileName(pageName);
        
        var blob = new Blob([luaContent], { type: 'text/plain;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        
        var a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        
        // 清理
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
        
        console.log('内容已保存到本地文件: ' + fileName);
        mw.notify('已保存备份到本地文件: ' + fileName);
    } catch (e) {
        console.error('保存到本地失败:', e);
        mw.notify('保存到本地失败: ' + e.message, { type: 'error' });
        
        // 如果Blob API不可用，提供最后的备用方案
        if (e.message.includes('Blob')) {
            showAlternativeSaveOption(luaContent);
        }
    }
}

// 生成备份文件名
function getBackupFileName(pageName) {
    var now = new Date();
    var timestamp = now.getFullYear() + '-' + 
                   (now.getMonth() + 1).toString().padStart(2, '0') + '-' + 
                   now.getDate().toString().padStart(2, '0') + '_' + 
                   now.getHours().toString().padStart(2, '0') + '-' + 
                   now.getMinutes().toString().padStart(2, '0');
    
    return pageName.replace(/\//g, '_') + '_backup_' + timestamp + '.txt';
}

// 备用保存方案（当Blob API不可用时）
function showAlternativeSaveOption(content) {
    var textarea = document.createElement('textarea');
    textarea.value = content;
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.width = '100%';
    textarea.style.height = '200px';
    textarea.style.zIndex = '9999';
    
    document.body.appendChild(textarea);
    textarea.select();
    
    var copyMsg = '您的浏览器不支持自动下载。\n' +
                 '已为您选择所有内容，请按Ctrl+C复制，\n' +
                 '然后粘贴到文本编辑器中手动保存。';
    
    alert(copyMsg);
    
    setTimeout(function() {
        document.body.removeChild(textarea);
    }, 5000);
}    
    function convertToLuaTable(data) {
        var luaEntries = [];
        
        data.forEach(function(item) {
            var entry = [];
            
            // 处理必填字段
            ['date', 'name', 'file', 'type', 'author'].forEach(function(key) {
                entry.push(key + ' = ' + formatLuaValue(item[key]));
            });
            
            // 处理可选字段（仅在非空时输出）
            if (item.display_name) {
                entry.push('display_name = ' + formatLuaValue(item.display_name));
            }
            if (item.unchecked) {
                entry.push('unchecked = ' + formatLuaValue(item.unchecked));
            }
            
            luaEntries.push('{\n    ' + entry.join(',\n    ') + '\n}');
        });
        
        return '{\n' + luaEntries.join(',\n') + '\n}';
    }

    function formatLuaValue(value) {
        if (value === null || value === undefined || value === '') {
            return '""';
        }
        if (typeof value === 'string') {
            return '"' + value.replace(/"/g, '\\"') + '"';
        }
        return value;
    }
})();

// 自动检测页面中的年份月份并初始化
$(function() {
    // 从页面名称中提取年份和月份
    var pageName = mw.config.get('wgPageName');
    var yearMonthMatch = pageName.match(/(\d{4})-(\d{2})/);
    
    if (yearMonthMatch) {
        var year = parseInt(yearMonthMatch[1], 10);
        var month = parseInt(yearMonthMatch[2], 10);
        quickEditBooks(year, month);
    }
});