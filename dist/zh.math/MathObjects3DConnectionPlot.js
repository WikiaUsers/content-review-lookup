// 等待DOM加载完成
$(document).ready(function() {
    // 初始化3D网络图
    initMath3DPlot();
});

// 全局变量，用于存储数据以便在函数间访问
var math3DPlotData = {
    mathConcepts: [],
    conceptConnections: [],
    subject: null,     // 学科大类过滤
    category: null,    // 学科小类过滤
    filteredConcepts: [],      // 过滤后的概念
    filteredConnections: []    // 过滤后的连接
};

// 全局进度信息
var math3DProgress = {
    currentStep: 0,
    totalSteps: 0,
    steps: [
        { id: 'loading', name: '加载数据页面', progress: 0 },
        { id: 'parsing', name: '解析数据格式', progress: 0 },
        { id: 'filtering', name: '过滤学科数据', progress: 0 },
        { id: 'converting', name: '转换wikitext', progress: 0 },
        { id: 'rendering', name: '渲染3D图形', progress: 0 }
    ]
};

// 数学大类小类层级关系（从提供的清单解析）
var mathSubjectHierarchy = {
    "11011": { name: "数学史", subcategories: {} },
    "11014": { name: "数理逻辑与数学基础", subcategories: {
        "1101410": "演绎逻辑学",
        "1101420": "证明论",
        "1101430": "递归论",
        "1101440": "模型论",
        "1101450": "公理集合论",
        "1101460": "数学基础",
        "1101499": "数理逻辑与数学基础其他学科"
    }},
    "11017": { name: "数论", subcategories: {
        "1101710": "初等数论",
        "1101720": "解析数论",
        "1101730": "代数数论",
        "1101740": "超越数论",
        "1101750": "丢番图逼近",
        "1101760": "数的几何",
        "1101770": "概率数论",
        "1101780": "计算数论",
        "1101799": "数论其他学科"
    }},
    "11021": { name: "代数学", subcategories: {
        "1102110": "线性代数",
        "1102115": "群论",
        "1102120": "域论",
        "1102125": "李群",
        "1102130": "李代数",
        "1102135": "Kac-Moody 代数",
        "1102140": "环论",
        "1102145": "模论",
        "1102150": "格论",
        "1102155": "泛代数理论",
        "1102160": "范畴论",
        "1102165": "同调代数",
        "1102170": "代数 K 理论",
        "1102175": "微分代数",
        "1102180": "代数编码理论",
        "1102199": "代数学其他学科"
    }},
    "11024": { name: "代数几何学", subcategories: {} },
    "11027": { name: "几何学", subcategories: {
        "1102710": "几何学基础",
        "1102715": "欧氏几何学",
        "1102720": "非欧几何学",
        "1102725": "球面几何学",
        "1102730": "向量和张量分析",
        "1102735": "仿射几何学",
        "1102740": "射影几何学",
        "1102745": "微分几何学",
        "1102750": "分数维几何",
        "1102755": "计算几何学",
        "1102799": "几何学其他学科"
    }},
    "11031": { name: "拓扑学", subcategories: {
        "1103110": "点集拓扑学",
        "1103115": "代数拓扑学",
        "1103120": "同伦论",
        "1103125": "低维拓扑学",
        "1103130": "同调论",
        "1103135": "维数论",
        "1103140": "格上拓扑学",
        "1103145": "纤维丛论",
        "1103150": "几何拓扑学",
        "1103155": "奇点理论",
        "1103160": "微分拓扑学",
        "1103199": "拓扑学其他学科"
    }},
    "11034": { name: "数学分析", subcategories: {
        "1103410": "微分学",
        "1103420": "积分学",
        "1103430": "级数论",
        "1103499": "数学分析其他学科"
    }},
    "11037": { name: "非标准分析", subcategories: {} },
    "11041": { name: "函数论", subcategories: {
        "1104110": "实变函数论",
        "1104120": "单复变函数论",
        "1104130": "多复变函数论",
        "1104140": "函数逼近论",
        "1104150": "调和分析",
        "1104160": "复流形",
        "1104170": "特殊函数论",
        "1104199": "函数论其他学科"
    }},
    "11044": { name: "常微分方程", subcategories: {
        "1104410": "定性理论",
        "1104420": "稳定性理论",
        "1104430": "解析理论",
        "1104499": "常微分方程其他学科"
    }},
    "11047": { name: "偏微分方程", subcategories: {
        "1104710": "椭圆型偏微分方程",
        "1104720": "双曲型偏微分方程",
        "1104730": "抛物型偏微分方程",
        "1104740": "非线性偏微分方程",
        "1104799": "偏微分方程其他学科"
    }},
    "11051": { name: "动力系统", subcategories: {
        "1105110": "微分动力系统",
        "1105120": "拓扑动力系统",
        "1105130": "复动力系统",
        "1105199": "动力系统其他学科"
    }},
    "11054": { name: "积分方程", subcategories: {} },
    "11057": { name: "泛函分析", subcategories: {
        "1105710": "线性算子理论",
        "1105715": "变分法",
        "1105720": "拓扑线性空间",
        "1105725": "希尔伯特空间",
        "1105730": "函数空间",
        "1105735": "巴拿赫空间",
        "1105740": "算子代数",
        "1105745": "测度与积分",
        "1105750": "广义函数论",
        "1105755": "非线性泛函分析",
        "1105799": "泛函分析其他学科"
    }},
    "11061": { name: "计算数学", subcategories: {
        "1106120": "常微分方程数值解",
        "1106130": "偏微分方程数值解",
        "1106140": "积分变换与积分方程数值方法",
        "1106150": "数值代数",
        "1106155": "优化计算方法",
        "1106165": "数值逼近与计算几何",
        "1106170": "随机数值方法与统计计算",
        "1106175": "并行计算方法",
        "1106180": "误差分析与区间算法",
        "1106185": "小波分析与傅立叶分析的数值方法",
        "1106190": "反问题计算方法",
        "1106195": "符号计算与计算机推理",
        "1106199": "计算数学其他学科"
    }},
    "11064": { name: "概率论", subcategories: {
        "1106410": "几何概率",
        "1106420": "概率分布",
        "1106430": "极限理论",
        "1106440": "随机过程",
        "1106450": "马尔可夫过程",
        "1106460": "随机分析",
        "1106470": "鞅论",
        "1106480": "应用概率论",
        "1106499": "概率论其他学科"
    }},
    "11067": { name: "数理统计学", subcategories: {
        "1106710": "抽样理论",
        "1106715": "假设检验",
        "1106720": "非参数统计",
        "1106725": "方差分析",
        "1106730": "相关回归分析",
        "1106735": "统计推断",
        "1106740": "贝叶斯统计",
        "1106745": "试验设计",
        "1106750": "多元分析",
        "1106755": "统计判决理论",
        "1106760": "时间序列分析",
        "1106799": "数理统计学其他学科"
    }},
    "11071": { name: "应用统计数学", subcategories: {
        "1107110": "统计质量控制",
        "1107120": "可靠性数学",
        "1107130": "保险数学",
        "1107140": "统计模拟",
        "1107199": "应用统计数学其他学科"
    }},
    "11074": { name: "运筹学", subcategories: {
        "1107410": "线性规划",
        "1107415": "非线性规划",
        "1107420": "动态规划",
        "1107425": "组合最优化",
        "1107430": "参数规划",
        "1107435": "整数规划",
        "1107440": "随机规划",
        "1107445": "排队论",
        "1107450": "对策论",
        "1107455": "库存论",
        "1107460": "决策论",
        "1107465": "搜索论",
        "1107470": "图论",
        "1107475": "统筹论",
        "1107480": "最优化",
        "1107499": "运筹学其他学科"
    }},
    "11077": { name: "组合数学", subcategories: {} },
    "11081": { name: "离散数学", subcategories: {} },
    "11084": { name: "模糊数学", subcategories: {} },
    "11085": { name: "计算机数学", subcategories: {} },
    "11087": { name: "应用数学", subcategories: {} },
    "11099": { name: "数学其他学科", subcategories: {} }
};

// 根据代码获取学科名称
function getSubjectName(code) {
    if (mathSubjectHierarchy[code]) {
        return mathSubjectHierarchy[code].name;
    }
    
    // 查找小类
    for (var majorCode in mathSubjectHierarchy) {
        var subject = mathSubjectHierarchy[majorCode];
        if (subject.subcategories && subject.subcategories[code]) {
            return subject.subcategories[code];
        }
    }
    
    return code; // 如果找不到，返回原代码
}

// 根据代码判断是否是大类（五位数）
function isMajorSubject(code) {
    return code && code.length === 5 && /^\d{5}$/.test(code);
}

// 根据代码判断是否是小类（七位数）
function isMinorSubject(code) {
    return code && code.length === 7 && /^\d{7}$/.test(code);
}

// 获取小类所属的大类
function getMajorSubjectForMinor(minorCode) {
    if (minorCode && minorCode.length >= 5) {
        var majorCode = minorCode.substring(0, 5);
        if (mathSubjectHierarchy[majorCode]) {
            return majorCode;
        }
    }
    return null;
}

// 根据大类获取所有小类
function getSubcategoriesForMajor(majorCode) {
    if (mathSubjectHierarchy[majorCode] && mathSubjectHierarchy[majorCode].subcategories) {
        return mathSubjectHierarchy[majorCode].subcategories;
    }
    return {};
}

function initMath3DPlot() {
    // 获取容器
    var container = $('#math-objects-3d-connection-plot');
    if (container.length === 0) return;
    
    // 获取data-subject和data-category属性
    math3DPlotData.subject = container.data('subject') || null;
    math3DPlotData.category = container.data('category') || null;
    
    // 如果是代码，转换为名称
    if (math3DPlotData.subject && /^\d+$/.test(math3DPlotData.subject)) {
        math3DPlotData.subject = getSubjectName(math3DPlotData.subject);
    }
    if (math3DPlotData.category && /^\d+$/.test(math3DPlotData.category)) {
        math3DPlotData.category = getSubjectName(math3DPlotData.category);
    }
    
    console.log('学科过滤条件:', {
        subject: math3DPlotData.subject,
        category: math3DPlotData.category
    });
    
    // 清空容器并添加加载提示
    container.empty();
    container.addClass('math-3d-plot-container');
    
    // 创建进度条
    createProgressBar(container);
    
    // 更新进度
    updateProgress('loading', 0, '正在加载数据页面...');
    
    // 从MediaWiki API获取数据
    loadPlotData(container);
}

// 创建进度条
function createProgressBar(container) {
    var progressContainer = $('<div class="math-3d-progress-container"></div>');
    
    var title = $('<div class="math-3d-progress-title">正在初始化数学概念3D网络图...</div>');
    
    var progressBar = $('<div class="math-3d-progress-bar"></div>');
    var progressFill = $('<div class="math-3d-progress-fill"></div>');
    progressBar.append(progressFill);
    
    var progressText = $('<div class="math-3d-progress-text">0% - 初始化中...</div>');
    
    var stepsContainer = $('<div class="math-3d-progress-steps"></div>');
    
    // 添加进度步骤
    math3DProgress.steps.forEach(function(step, index) {
        var stepElement = $('<div class="math-3d-progress-step pending"></div>')
            .attr('data-step', step.id)
            .text((index + 1) + '. ' + step.name);
        stepsContainer.append(stepElement);
    });
    
    progressContainer.append(title, progressBar, progressText, stepsContainer);
    container.append(progressContainer);
    
    // 保存进度条引用
    math3DProgress.container = progressContainer;
    math3DProgress.fill = progressFill;
    math3DProgress.text = progressText;
    math3DProgress.stepsElements = stepsContainer.find('.math-3d-progress-step');
}

// 更新进度
function updateProgress(stepId, progress, message) {
    if (!math3DProgress.container) return;
    
    // 找到当前步骤的索引
    var stepIndex = math3DProgress.steps.findIndex(function(step) {
        return step.id === stepId;
    });
    
    if (stepIndex >= 0) {
        // 更新步骤进度
        math3DProgress.steps[stepIndex].progress = progress;
        
        // 计算总进度
        var totalProgress = 0;
        math3DProgress.steps.forEach(function(step, index) {
            if (index < stepIndex) {
                totalProgress += 100; // 已完成步骤
            } else if (index === stepIndex) {
                totalProgress += progress; // 当前步骤
            }
        });
        
        var overallProgress = totalProgress / math3DProgress.steps.length;
        
        // 更新UI
        math3DProgress.fill.css('width', overallProgress + '%');
        math3DProgress.text.text(Math.round(overallProgress) + '% - ' + (message || '处理中...'));
        
        // 更新步骤状态
        math3DProgress.stepsElements.each(function(index, element) {
            var $element = $(element);
            if (index < stepIndex) {
                $element.removeClass('pending current').addClass('completed');
            } else if (index === stepIndex) {
                $element.removeClass('pending completed').addClass('current');
            } else {
                $element.removeClass('completed current').addClass('pending');
            }
        });
    }
}

// 隐藏进度条
function hideProgressBar() {
    if (math3DProgress.container) {
        math3DProgress.container.fadeOut(500, function() {
            $(this).remove();
            math3DProgress.container = null;
        });
    }
}

function loadPlotData(container) {
    // 从两个页面获取数据
    var defDataPage = 'Project:MathObjectsPlotData/def';
    var conDataPage = 'Project:MathObjectsPlotData/con';
    
    // 使用Promise包装API调用
    function fetchPageData(pageName) {
        return new Promise(function(resolve, reject) {
            var api = new mw.Api();
            
            updateProgress('loading', 50, '正在从 ' + pageName + ' 获取数据...');
            
            api.get({
                action: 'query',
                prop: 'revisions',
                rvprop: 'content',
                titles: pageName,
                format: 'json',
                formatversion: 2
            }).done(function(data) {
                updateProgress('loading', 100, '数据页面加载完成');
                if (data.query && data.query.pages && data.query.pages.length > 0) {
                    var page = data.query.pages[0];
                    
                    if (!page.revisions || page.revisions.length === 0) {
                        reject('数据页面不存在或为空: ' + pageName);
                        return;
                    }
                    
                    var content = page.revisions[0].content;
                    
                    if (!content || content.trim() === '') {
                        reject('页面内容为空: ' + pageName);
                        return;
                    }
                    
                    try {
                        // 尝试解析JSON内容
                        var jsonData = parseDataContent(content);
                        resolve(jsonData);
                    } catch (parseError) {
                        reject('解析数据失败: ' + parseError.message);
                    }
                } else {
                    reject('页面不存在或无法访问: ' + pageName);
                }
            }).fail(function(error) {
                reject('API请求失败: ' + error);
            });
        });
    }
    
    // 同时获取两个页面的数据
    Promise.all([
        fetchPageData(defDataPage),
        fetchPageData(conDataPage)
    ]).then(function(results) {
        var defData = results[0];
        var conData = results[1];
        
        updateProgress('parsing', 50, '正在处理概念数据...');
        
        // 解析数据并处理默认值
        math3DPlotData.mathConcepts = processMathConcepts(defData);
        math3DPlotData.conceptConnections = processConceptConnections(conData);
        
        updateProgress('parsing', 100, '数据解析完成');
        
        console.log('加载的概念数据:', math3DPlotData.mathConcepts);
        console.log('加载的连接数据:', math3DPlotData.conceptConnections);
        
        // 根据学科过滤条件过滤数据
        updateProgress('filtering', 0, '正在根据学科条件过滤数据...');
        filterDataBySubjectCategory();
        updateProgress('filtering', 100, '数据过滤完成');
        
        // 移除进度条并初始化3D图
        hideProgressBar();
        init3DVisualization(container);
        
    }).catch(function(error) {
        console.error('加载数据失败:', error);
        hideProgressBar();
        container.append('<div class="math-3d-error">加载数据失败: ' + error + '</div>');
    });
}

// 根据学科过滤数据
function filterDataBySubjectCategory() {
    var originalConcepts = math3DPlotData.mathConcepts;
    var originalConnections = math3DPlotData.conceptConnections;
    
    // 如果没有过滤条件，使用所有数据
    if (!math3DPlotData.subject && !math3DPlotData.category) {
        math3DPlotData.filteredConcepts = originalConcepts;
        math3DPlotData.filteredConnections = originalConnections;
        return;
    }
    
    // 过滤概念
    math3DPlotData.filteredConcepts = originalConcepts.filter(function(concept) {
        if (math3DPlotData.category) {
            // 如果有学科小类过滤，必须完全匹配
            return concept.category === math3DPlotData.category;
        } else if (math3DPlotData.subject) {
            // 如果有学科大类过滤，检查是否属于该大类
            // 首先检查majorCategory是否匹配
            if (concept.majorCategory === math3DPlotData.subject) {
                return true;
            }
            // 然后检查category是否属于该大类的子类
            // 查找大类对应的所有小类
            for (var majorCode in mathSubjectHierarchy) {
                var subject = mathSubjectHierarchy[majorCode];
                if (subject.name === math3DPlotData.subject) {
                    // 检查所有小类
                    for (var minorCode in subject.subcategories) {
                        if (subject.subcategories[minorCode] === concept.category) {
                            return true;
                        }
                    }
                    // 如果大类本身没有小类，检查大类名称是否匹配
                    if (Object.keys(subject.subcategories).length === 0 && 
                        subject.name === concept.category) {
                        return true;
                    }
                    break;
                }
            }
            return false;
        }
        return true;
    });
    
    // 获取过滤后的概念ID集合
    var filteredConceptIds = {};
    math3DPlotData.filteredConcepts.forEach(function(concept) {
        filteredConceptIds[concept.id] = true;
    });
    
    // 过滤连接：起点和终点都必须在过滤后的概念中
    math3DPlotData.filteredConnections = originalConnections.filter(function(connection) {
        var fromId = connection[0];
        var toId = connection[1];
        return filteredConceptIds[fromId] && filteredConceptIds[toId];
    });
    
    console.log('过滤结果:', {
        '原始概念数': originalConcepts.length,
        '过滤后概念数': math3DPlotData.filteredConcepts.length,
        '原始连接数': originalConnections.length,
        '过滤后连接数': math3DPlotData.filteredConnections.length,
        '过滤条件': {
            subject: math3DPlotData.subject,
            category: math3DPlotData.category
        }
    });
}

// 解析数据内容
function parseDataContent(content) {
    // 清理内容
    var cleanContent = content.trim();
    
    // 尝试直接解析为JSON
    try {
        return JSON.parse(cleanContent);
    } catch (jsonError) {
        // 如果不是JSON，尝试提取JavaScript变量
        return extractDataFromContent(cleanContent);
    }
}

// 从页面内容中提取数据（支持多种格式）
function extractDataFromContent(content) {
    // 尝试匹配JavaScript变量定义
    var patterns = [
        // 匹配 var variable = [...]; 或 var variable = {...};
        /var\s+(\w+)\s*=\s*(\[[\s\S]*?\]|\{[\s\S]*?\});/,
        // 匹配 let variable = [...]; 或 let variable = {...};
        /let\s+(\w+)\s*=\s*(\[[\s\S]*?\]|\{[\s\S]*?\});/,
        // 匹配 const variable = [...]; 或 const variable = {...};
        /const\s+(\w+)\s*=\s*(\[[\s\S]*?\]|\{[\s\S]*?\});/
    ];
    
    for (var i = 0; i < patterns.length; i++) {
        var match = content.match(patterns[i]);
        if (match && match[2]) {
            try {
                var jsonStr = cleanJSONString(match[2]);
                return JSON.parse(jsonStr);
            } catch (parseError) {
                console.warn('JSON解析失败:', parseError);
                continue;
            }
        }
    }
    
    throw new Error('无法解析页面内容');
}

// 清理JSON字符串中的常见问题
function cleanJSONString(str) {
    // 移除单行注释
    str = str.replace(/\/\/.*$/gm, '');
    
    // 移除多行注释
    str = str.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // 移除尾随逗号（在数组和对象中）
    str = str.replace(/,\s*\]/g, ']');
    str = str.replace(/,\s*\}/g, '}');
    
    // 修复未加引号的键名（仅在对象中）
    str = str.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*:)/g, '$1"$2"$3');
    
    // 移除多余的空格和换行（但保留字符串内的空格）
    str = str.replace(/\s+/g, ' ').trim();
    
    return str;
}

// 处理数学概念数据，设置默认值
function processMathConcepts(data) {
    // 如果数据是数组，直接处理
    var concepts = Array.isArray(data) ? data : (data.mathConcepts || []);
    
    if (!Array.isArray(concepts)) {
        console.error('概念数据格式错误:', data);
        return [];
    }
    
    return concepts.map(function(concept, index) {
        // 确保必要字段存在
        if (!concept || typeof concept !== 'object') {
            console.warn('发现无效的概念数据:', concept);
            return null;
        }
        
        // 设置id（必需）
        var id = concept.id;
        if (!id) {
            console.warn('概念缺少id字段:', concept);
            id = 'concept_' + index;
        }
        
        // 设置name（必需）
        var name = concept.name || concept.id || '未命名';
        
        // 设置fullName（默认值）
        var fullName = concept.fullName || concept.name || concept.id || '未命名';
        
        // 设置页面链接（层级默认值）
        var pageLink = concept.pageLink || concept.fullName || concept.name || concept.id || '未命名';
        
        // 重要：确保坐标值是数字，不是字符串
        var x = parseFloat(concept.x);
        var y = parseFloat(concept.y);
        var z = parseFloat(concept.z);
        
        // 如果没有坐标，生成一些分布
        if (isNaN(x) || isNaN(y) || isNaN(z)) {
            // 生成3D球面分布
            var radius = 200;
            var phi = Math.acos(-1 + (2 * index) / concepts.length);
            var theta = Math.sqrt(concepts.length * Math.PI) * phi;
            
            x = radius * Math.sin(phi) * Math.cos(theta);
            y = radius * Math.sin(phi) * Math.sin(theta);
            z = radius * Math.cos(phi);
        }
        
        // 构建处理后的概念对象
        var processedConcept = {
            id: id,
            name: name,
            fullName: fullName,
            pageLink: pageLink,
            category: concept.category || '未分类',
            majorCategory: concept.majorCategory || concept.category || '其他',
            importance: parseInt(concept.importance) || 5,
            definition: concept.definition || '暂无定义',
            x: x,
            y: y,
            z: z
        };
        
        console.log('处理后的概念坐标:', processedConcept.name, 'x:', x, 'y:', y, 'z:', z);
        
        return processedConcept;
    }).filter(function(concept) {
        return concept !== null; // 过滤掉无效的概念
    });
}

// 处理连接关系数据
function processConceptConnections(data) {
    // 如果数据是数组，直接处理
    var connections = Array.isArray(data) ? data : (data.conceptConnections || []);
    
    if (!Array.isArray(connections)) {
        console.error('连接数据格式错误:', data);
        return [];
    }
    
    return connections.map(function(connection) {
        // 确保连接有正确的格式
        if (!Array.isArray(connection) || connection.length < 2) {
            console.warn('无效的连接数据:', connection);
            return null;
        }
        
        var fromId = connection[0] || '';
        var toId = connection[1] || '';
        
        if (!fromId || !toId) {
            console.warn('连接缺少起点或终点ID:', connection);
            return null;
        }
        
        return [
            fromId,  // 起点ID
            toId,    // 终点ID
            connection[2] || '无描述',  // 关系说明
            Math.max(1, Math.min(10, parseInt(connection[3]) || 5))  // 重要性（限制在1-10）
        ];
    }).filter(function(connection) {
        return connection !== null && connection[0] && connection[1]; // 过滤无效连接
    });
}

// 批量转换wikitext到HTML
function batchConvertWikitextToHTML(texts) {
    return new Promise(function(resolve) {
        if (!texts || texts.length === 0) {
            resolve([]);
            return;
        }
        
        // 分批处理，避免请求过大
        var batchSize = 5;
        var results = new Array(texts.length);
        var totalBatches = Math.ceil(texts.length / batchSize);
        var completedBatches = 0;
        
        function processBatch(startIndex) {
            if (startIndex >= texts.length) {
                resolve(results);
                return;
            }
            
            var endIndex = Math.min(startIndex + batchSize, texts.length);
            var batch = texts.slice(startIndex, endIndex);
            var currentBatch = Math.floor(startIndex / batchSize) + 1;
            
            // 更新进度
            var progress = Math.round((completedBatches / totalBatches) * 100);
            updateProgress('converting', progress, 
                '转换wikitext (' + currentBatch + '/' + totalBatches + '批次)...');
            
            var promises = batch.map(function(text, index) {
                if (!text || typeof text !== 'string' || text.trim() === '') {
                    return Promise.resolve('');
                }
                
                return new mw.Api().post({
                    action: 'parse',
                    text: text,
                    contentmodel: 'wikitext',
                    format: 'json',
                    formatversion: 2,
                    disableeditsection: true,
                    disabletoc: true,
                    preview: true
                }).then(function(data) {
                    return data.parse && data.parse.text ? data.parse.text : text;
                }).catch(function(error) {
                    console.warn('wikitext转换失败:', error);
                    return text; // 转换失败时返回原文
                });
            });
            
            Promise.all(promises).then(function(batchResults) {
                for (var i = 0; i < batchResults.length; i++) {
                    results[startIndex + i] = batchResults[i];
                }
                
                completedBatches++;
                
                // 继续处理下一批
                setTimeout(function() {
                    processBatch(startIndex + batchSize);
                }, 200); // 添加延迟避免API限制
            });
        }
        
        processBatch(0);
    });
}

// 根据ID获取概念
function getConceptById(id) {
    for (var i = 0; i < math3DPlotData.filteredConcepts.length; i++) {
        if (math3DPlotData.filteredConcepts[i].id === id) {
            return math3DPlotData.filteredConcepts[i];
        }
    }
    return null;
}

// 初始化3D可视化
function init3DVisualization(container) {
    var mathConcepts = math3DPlotData.filteredConcepts;
    var conceptConnections = math3DPlotData.filteredConnections;
    
    updateProgress('rendering', 0, '正在初始化3D可视化...');
    
    // 颜色生成函数 - 使用HSL颜色空间生成鲜艳且可区分的颜色
    function generateColorScheme(categories) {
        var colors = {};
        var hueStep = 360 / categories.length;
        
        categories.forEach(function(category, index) {
            var hue = (index * hueStep) % 360;
            // 使用较高的饱和度(70%)和亮度(60%)确保颜色鲜艳
            colors[category] = 'hsl(' + hue + ', 70%, 60%)';
        });
        
        return colors;
    }
    
    // 根据过滤条件确定颜色方案
    var categoryColors;
    var isLegendInteractive = false; // 图例是否可交互（点击显示/隐藏）
    
    if (math3DPlotData.category) {
        // 学科小类过滤：所有点使用相同颜色
        categoryColors = {
            [math3DPlotData.category]: '#4facfe'
        };
        isLegendInteractive = false;
    } else if (math3DPlotData.subject) {
        // 学科大类过滤：按学科小类着色
        // 收集过滤后的所有学科小类
        var subcategories = {};
        mathConcepts.forEach(function(concept) {
            subcategories[concept.category] = true;
        });
        
        var subcategoryList = Object.keys(subcategories);
        categoryColors = generateColorScheme(subcategoryList);
        isLegendInteractive = true;
    } else {
        // 无过滤：按学科大类着色
        // 收集所有大类
        var majorCategories = {};
        mathConcepts.forEach(function(concept) {
            if (concept.majorCategory && concept.majorCategory !== '未分类' && concept.majorCategory !== '其他') {
                majorCategories[concept.majorCategory] = true;
            }
        });
        
        var majorCategoryList = Object.keys(majorCategories);
        categoryColors = generateColorScheme(majorCategoryList);
        isLegendInteractive = true;
    }
    
    // 创建3D容器
    var plot3dWrapper = $('<div class="math-3d-plot-wrapper"></div>');
    container.append(plot3dWrapper);
    
    updateProgress('rendering', 30, '正在创建控制面板...');
    
    // 创建控制面板
    var controlsPanel = createControlsPanel(isLegendInteractive);
    container.append(controlsPanel);
    
    // 创建旋转提示
    var rotateInfo = $('<div class="math-3d-rotate-info">右键拖动或Alt+方向键旋转视角</div>');
    container.append(rotateInfo);
    
    // 创建过滤信息提示
    if (math3DPlotData.subject || math3DPlotData.category) {
        var filterInfo = $('<div class="math-3d-filter-info"></div>');
        if (math3DPlotData.category) {
            filterInfo.text('学科小类: ' + math3DPlotData.category);
        } else if (math3DPlotData.subject) {
            filterInfo.text('学科大类: ' + math3DPlotData.subject);
        }
        filterInfo.css({
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '5px 15px',
            borderRadius: '15px',
            color: '#88d3fa',
            fontSize: '0.9rem',
            zIndex: '20'
        });
        container.append(filterInfo);
    }
    
    // 全局变量
    var selectedConcept = null;
    var firstRightClickConcept = null;
    var isDragging = false;
    var isRotating = false;
    var startX, startY;
    var offsetX = 0, offsetY = 0;
    var spaceScale = 1;
    var activeCategories = {}; // 记录哪些类别是激活的
    var tooltipTimeout;
    var viewCenterX = 0, viewCenterY = 0;
    var rotateX = 20, rotateY = 30;
    var enableTooltips = true;
    var animationFrameId = null;
    var targetOffsetX = 0, targetOffsetY = 0;
    var targetSpaceScale = 1;
    var targetRotateX = 20, targetRotateY = 30;
    var moveStep = 30;
    var rotateStep = 5;
    var cameraDistance = 1000;
    var focalLength = 500;
    var baseRadius = 15;
    var baseFontSize = 12;
    
    // 修复线条闪烁的关键：添加稳定类
    var rodStableClassAdded = false;
    
    // 收集需要转换的wikitext
    var wikitextsToConvert = [];
    
    updateProgress('rendering', 50, '正在收集文本数据...');
    
    // 收集概念定义
    mathConcepts.forEach(function(concept) {
        if (concept.definition && typeof concept.definition === 'string') {
            wikitextsToConvert.push(concept.definition);
        }
    });
    
    // 收集连接描述
    conceptConnections.forEach(function(connection) {
        if (connection[2] && typeof connection[2] === 'string') {
            wikitextsToConvert.push(connection[2]);
        }
    });
    
    // 批量转换wikitext到HTML
    batchConvertWikitextToHTML(wikitextsToConvert).then(function(convertedTexts) {
        updateProgress('rendering', 70, '正在处理转换后的文本...');
        
        // 更新概念定义
        var textIndex = 0;
        mathConcepts.forEach(function(concept) {
            if (concept.definition && typeof concept.definition === 'string') {
                concept.definitionHTML = convertedTexts[textIndex] || concept.definition;
                textIndex++;
            }
        });
        
        // 更新连接描述
        conceptConnections.forEach(function(connection) {
            if (connection[2] && typeof connection[2] === 'string') {
                connection[2] = convertedTexts[textIndex] || connection[2];
                textIndex++;
            }
        });
        
        // 初始化激活所有分类
        Object.keys(categoryColors).forEach(function(category) {
            activeCategories[category] = true;
        });
        
        updateProgress('rendering', 80, '正在创建图例...');
        
        // 创建图例（如果可交互，添加点击事件）
        createLegend(controlsPanel, categoryColors, isLegendInteractive);
        
        updateProgress('rendering', 90, '正在渲染3D元素...');
        
        // 创建概念球体和连接
        createSpheres(plot3dWrapper, mathConcepts, categoryColors, math3DPlotData.category);
        createConnections(plot3dWrapper, conceptConnections, categoryColors);
        
        // 更新计数
        updateCounts(controlsPanel, mathConcepts.length, conceptConnections.length);
        
        // 设置事件监听器
        setupEventListeners(container, plot3dWrapper, controlsPanel);
        
        // 初始化视图中心
        var containerWidth = container.width();
        var containerHeight = container.height();
        viewCenterX = containerWidth / 2;
        viewCenterY = containerHeight / 2;
        
        // 计算数据的边界范围
        var bounds = calculateDataBounds(mathConcepts);
        console.log('数据边界:', bounds);
        
        // 调整缩放以适应数据
        var maxExtent = Math.max(
            bounds.maxX - bounds.minX,
            bounds.maxY - bounds.minY,
            bounds.maxZ - bounds.minZ
        );
        
        if (maxExtent > 0) {
            // 自动调整缩放使数据适合视图
            var targetScale = Math.min(containerWidth, containerHeight) / (maxExtent * 2);
            targetSpaceScale = Math.max(0.1, Math.min(5, targetScale));
        }
        
        updateProgress('rendering', 100, '3D可视化初始化完成');
        
        // 开始动画循环
        animate();
        
        // 稍后隐藏进度条
        setTimeout(function() {
            hideProgressBar();
        }, 500);
        
    }).catch(function(error) {
        console.error('转换wikitext失败:', error);
        hideProgressBar();
        container.append('<div class="math-3d-error">处理文本数据失败: ' + error + '</div>');
    });
    
    // 计算数据边界
    function calculateDataBounds(concepts) {
        var bounds = {
            minX: Infinity, maxX: -Infinity,
            minY: Infinity, maxY: -Infinity,
            minZ: Infinity, maxZ: -Infinity
        };
        
        concepts.forEach(function(concept) {
            bounds.minX = Math.min(bounds.minX, concept.x);
            bounds.maxX = Math.max(bounds.maxX, concept.x);
            bounds.minY = Math.min(bounds.minY, concept.y);
            bounds.maxY = Math.max(bounds.maxY, concept.y);
            bounds.minZ = Math.min(bounds.minZ, concept.z);
            bounds.maxZ = Math.max(bounds.maxZ, concept.z);
        });
        
        // 如果所有值都是0，设置一个默认范围
        if (bounds.minX === bounds.maxX && bounds.maxX === 0) {
            bounds.minX = -100;
            bounds.maxX = 100;
            bounds.minY = -100;
            bounds.maxY = 100;
            bounds.minZ = -100;
            bounds.maxZ = 100;
        }
        
        return bounds;
    }
    
    // 创建控制面板
    function createControlsPanel(isLegendInteractive) {
        var panel = $('<div class="math-3d-controls-panel"></div>');
        
        // 显示当前过滤条件
        if (math3DPlotData.subject || math3DPlotData.category) {
            var filterSection = '<div class="math-3d-panel-section">';
            filterSection += '<h3><i class="fas fa-filter"></i> 当前过滤条件</h3>';
            if (math3DPlotData.category) {
                filterSection += '<p><strong>学科小类:</strong> ' + math3DPlotData.category + '</p>';
            }
            if (math3DPlotData.subject) {
                filterSection += '<p><strong>学科大类:</strong> ' + math3DPlotData.subject + '</p>';
                filterSection += '<p><em>点击图例可显示/隐藏特定小类</em></p>';
            }
            filterSection += '</div>';
            panel.append(filterSection);
        }
        
        // 使用说明
        var instructions = `
        <div class="math-3d-panel-section">
            <h3><i class="fas fa-info-circle"></i> 使用说明</h3>
            <div class="math-3d-instructions">
                <div class="math-3d-instruction-item">
                    <div class="math-3d-instruction-icon"><i class="fas fa-mouse-pointer"></i></div>
                    <div>左键拖动：移动3D视图</div>
                </div>
                <div class="math-3d-instruction-item">
                    <div class="math-3d-instruction-icon"><i class="fas fa-mouse"></i></div>
                    <div>右键拖动：旋转3D视图</div>
                </div>
                <div class="math-3d-instruction-item">
                    <div class="math-3d-instruction-icon"><i class="fas fa-arrows-alt"></i></div>
                    <div>键盘方向键：移动3D视图</div>
                </div>
                <div class="math-3d-instruction-item">
                    <div class="math-3d-instruction-icon"><i class="fas fa-keyboard"></i></div>
                    <div>Alt+方向键：旋转3D视图</div>
                </div>
                <div class="math-3d-instruction-item">
                    <div class="math-3d-instruction-icon"><i class="fas fa-search-plus"></i></div>
                    <div>鼠标滚轮：平滑放大/缩小整个3D场景</div>
                </div>
                <div class="math-3d-instruction-item">
                    <div class="math-3d-instruction-icon"><i class="fas fa-mouse"></i></div>
                    <div>左键点击概念：高亮相关概念</div>
                </div>
                <div class="math-3d-instruction-item">
                    <div class="math-3d-instruction-icon"><i class="fas fa-mouse"></i></div>
                    <div>右键点击两个概念：显示它们之间的路径</div>
                </div>
                <div class="math-3d-instruction-item">
                    <div class="math-3d-instruction-icon"><i class="fas fa-hand-point-up"></i></div>
                    <div>悬停概念或连线：查看详细信息</div>
                </div>
                ${isLegendInteractive ? '<div class="math-3d-instruction-item"><div class="math-3d-instruction-icon"><i class="fas fa-eye"></i></div><div>点击图例：显示/隐藏该类节点和连线</div></div>' : ''}
            </div>
        </div>`;
        
        panel.append(instructions);
        
        // 图例区域 - 标题根据情况变化
        var legendTitle = '';
        if (math3DPlotData.category) {
            legendTitle = '学科小类颜色';
        } else if (math3DPlotData.subject) {
            legendTitle = '学科小类颜色图例';
        } else {
            legendTitle = '学科分类图例';
        }
        
        if (isLegendInteractive) {
            legendTitle += ' (点击显示/隐藏)';
        }
        
        panel.append('<div class="math-3d-panel-section"><h3><i class="fas fa-palette"></i> ' + legendTitle + '</h3><div id="math-3d-category-legend"></div></div>');
        
        // 当前选中区域
        panel.append('<div class="math-3d-panel-section"><h3><i class="fas fa-crosshairs"></i> 当前选中</h3><div id="math-3d-selected-info"></div></div>');
        
        // 控制选项
        var controls = `
        <div class="math-3d-panel-section">
            <h3><i class="fas fa-cog"></i> 控制选项</h3>
            <button id="math-3d-toggle-tooltips" class="math-3d-toggle-button">
                <i class="fas fa-eye"></i> 启用悬停提示
            </button>
            <button id="math-3d-reset-view" class="math-3d-reset-button" style="margin-top: 10px;">
                <i class="fas fa-redo"></i> 重置视图与筛选
            </button>
        </div>`;
        
        panel.append(controls);
        
        // 状态栏
        panel.append('<div class="math-3d-status-bar"><div id="math-3d-point-count">概念总数: 0</div><div id="math-3d-connection-count">关系总数: 0</div><div id="math-3d-view-status">3D视图已激活</div></div>');
        
        return panel;
    }
    
    // 创建图例
    function createLegend(panel, categoryColors, isInteractive) {
        var legendContainer = panel.find('#math-3d-category-legend');
        legendContainer.empty();
        
        Object.keys(categoryColors).forEach(function(categoryName) {
            var legendItem = $('<div class="math-3d-legend-item"></div>')
                .attr('data-category', categoryName);
            
            var colorBox = $('<div class="math-3d-legend-color"></div>')
                .css('backgroundColor', categoryColors[categoryName]);
            
            legendItem.append(colorBox);
            legendItem.append('<span>' + categoryName + '</span>');
            
            // 如果图例可交互，添加点击事件
            if (isInteractive) {
                legendItem.css('cursor', 'pointer');
                legendItem.on('click', function() {
                    var $this = $(this);
                    var category = $this.data('category');
                    
                    if ($this.hasClass('hidden')) {
                        // 显示该类
                        $this.removeClass('hidden');
                        activeCategories[category] = true;
                    } else {
                        // 隐藏该类
                        $this.addClass('hidden');
                        activeCategories[category] = false;
                    }
                    
                    // 更新3D视图
                    updateAllPositions();
                    
                    // 更新状态栏
                    var visibleCount = Object.values(activeCategories).filter(v => v).length;
                    var totalCount = Object.keys(activeCategories).length;
                    panel.find('#math-3d-view-status').text('显示: ' + visibleCount + '/' + totalCount + '类');
                });
            }
            
            legendContainer.append(legendItem);
        });
    }
    
    // 更新计数
    function updateCounts(panel, conceptCount, connectionCount) {
        panel.find('#math-3d-point-count').text('概念总数: ' + conceptCount);
        panel.find('#math-3d-connection-count').text('关系总数: ' + connectionCount);
    }
    
    // 创建概念球体
    function createSpheres(wrapper, mathConcepts, categoryColors, singleCategory) {
        mathConcepts.forEach(function(concept) {
            var color;
            if (singleCategory) {
                // 单一学科小类：使用统一颜色
                color = categoryColors[singleCategory] || '#4facfe';
            } else if (math3DPlotData.subject) {
                // 学科大类过滤：根据概念的小类分配颜色
                color = categoryColors[concept.category] || '#888888';
            } else {
                // 无过滤：根据概念的大类分配颜色
                color = categoryColors[concept.majorCategory] || '#888888';
            }
            
            // 创建球体元素
            var sphere = $('<div class="math-3d-concept-sphere"></div>')
                .attr('id', 'math-3d-sphere-' + concept.id)
                .attr('data-id', concept.id)
                .data('importance', concept.importance)
                .data('color', color)
                .data('concept', concept)
                .css({
                    backgroundColor: color
                })
                .text(concept.name.charAt(0))
                .appendTo(wrapper);
            
            // 创建标签（带链接）
            var label = $('<div class="math-3d-concept-label"></div>')
                .attr('id', 'math-3d-label-' + concept.id)
                .attr('data-id', concept.id);
            
            // 添加超链接
            var link = $('<a></a>')
                .attr('href', mw.util.getUrl(concept.pageLink))
                .attr('title', concept.fullName)
                .text(concept.name)
                .css({ color: color });
            
            label.append(link).appendTo(wrapper);
            
            // 添加悬停效果
            sphere.hover(
                function() {
                    if (enableTooltips) {
                        showTooltip(concept, $(this));
                    }
                },
                function() {
                    hideTooltip();
                }
            );
            
            // 添加点击事件
            sphere.on('click', function(e) {
                e.stopPropagation();
                selectConcept(concept.id);
            });
            
            // 添加右键点击事件
            sphere.on('contextmenu', function(e) {
                e.preventDefault();
                e.stopPropagation();
                rightClickConcept(concept.id);
                return false;
            });
        });
    }
    
    // 创建连接棍 - 修复闪烁问题
    function createConnections(wrapper, conceptConnections, categoryColors) {
        conceptConnections.forEach(function(connection, index) {
            var fromConcept = getConceptById(connection[0]);
            var toConcept = getConceptById(connection[1]);
            var description = connection[2];
            var importance = connection[3];
            
            if (!fromConcept || !toConcept) return;
            
            // 确定颜色
            var fromColor, toColor;
            if (math3DPlotData.category) {
                // 单一学科小类：使用统一颜色
                fromColor = categoryColors[math3DPlotData.category] || '#4facfe';
                toColor = fromColor;
            } else if (math3DPlotData.subject) {
                // 学科大类过滤：根据概念的小类分配颜色
                fromColor = categoryColors[fromConcept.category] || '#888888';
                toColor = categoryColors[toConcept.category] || '#888888';
            } else {
                // 无过滤：根据概念的大类分配颜色
                fromColor = categoryColors[fromConcept.majorCategory] || '#888888';
                toColor = categoryColors[toConcept.majorCategory] || '#888888';
            }
            
            // 创建棍元素 - 添加稳定类防止闪烁
            var rod = $('<div class="math-3d-connection-rod math-3d-connection-rod-stable"></div>')
                .attr('id', 'math-3d-rod-' + index)
                .attr('data-from', connection[0])
                .attr('data-to', connection[1])
                .data('importance', importance)
                .data('from-color', fromColor)
                .data('to-color', toColor)
                .css({
                    background: 'linear-gradient(90deg, ' + fromColor + ', ' + toColor + ')'
                })
                .appendTo(wrapper);
            
            // 添加悬停效果
            rod.hover(
                function() {
                    if (enableTooltips) {
                        showConnectionTooltip(description, $(this), fromConcept, toConcept);
                    }
                },
                function() {
                    hideTooltip();
                }
            );
        });
    }
    
    // 3D投影计算
    function project3D(x, y, z) {
        // 应用3D空间缩放
        x = x * spaceScale;
        y = y * spaceScale;
        z = z * spaceScale;
        
        // 应用旋转
        var radX = rotateX * Math.PI / 180;
        var radY = rotateY * Math.PI / 180;
        
        // 绕Y轴旋转
        var cosY = Math.cos(radY);
        var sinY = Math.sin(radY);
        var x1 = x * cosY - z * sinY;
        var z1 = x * sinY + z * cosY;
        
        // 绕X轴旋转
        var cosX = Math.cos(radX);
        var sinX = Math.sin(radX);
        var y1 = y * cosX - z1 * sinX;
        var z2 = y * sinX + z1 * cosX;
        
        // 透视投影
        var distance = cameraDistance + z2;
        var scaleFactor = focalLength / (focalLength + distance);
        
        return {
            x: x1 * scaleFactor,
            y: y1 * scaleFactor,
            z: z2,
            scale: scaleFactor
        };
    }
    
    // 更新球体位置
    function updateSpherePosition(concept, sphere, label) {
        var categoryKey;
        if (math3DPlotData.category) {
            categoryKey = math3DPlotData.category;
        } else if (math3DPlotData.subject) {
            categoryKey = concept.category;
        } else {
            categoryKey = concept.majorCategory;
        }
        
        // 检查该类是否激活
        if (!activeCategories[categoryKey]) {
            sphere.hide();
            label.hide();
            return;
        }
        
        sphere.show();
        label.show();
        
        var projected = project3D(
            concept.x + offsetX,
            concept.y + offsetY,
            concept.z
        );
        
        var screenX = viewCenterX + projected.x;
        var screenY = viewCenterY + projected.y;
        
        var importance = concept.importance;
        var radiusMultiplier = 0.5 + importance * 0.1;
        var perspectiveRadius = baseRadius * radiusMultiplier * projected.scale;
        
        sphere.css({
            left: (screenX - perspectiveRadius) + 'px',
            top: (screenY - perspectiveRadius) + 'px',
            width: (perspectiveRadius * 2) + 'px',
            height: (perspectiveRadius * 2) + 'px',
            fontSize: (perspectiveRadius * 0.7) + 'px',
            zIndex: Math.round(1000 - projected.z)
        });
        
        var labelFontSize = baseFontSize * projected.scale;
        label.css({
            left: screenX + 'px',
            top: (screenY + perspectiveRadius + 5) + 'px',
            fontSize: labelFontSize + 'px',
            transform: 'translateX(-50%)',
            zIndex: Math.round(1000 - projected.z) + 1
        });
    }
    
    // 更新棍的位置 - 修复闪烁问题
    function updateRodPosition(fromConcept, toConcept, rod, index) {
        if (!fromConcept || !toConcept) {
            rod.hide();
            return;
        }
        
        // 确定类别键
        var fromCategoryKey, toCategoryKey;
        if (math3DPlotData.category) {
            fromCategoryKey = math3DPlotData.category;
            toCategoryKey = math3DPlotData.category;
        } else if (math3DPlotData.subject) {
            fromCategoryKey = fromConcept.category;
            toCategoryKey = toConcept.category;
        } else {
            fromCategoryKey = fromConcept.majorCategory;
            toCategoryKey = toConcept.majorCategory;
        }
        
        // 检查两端类别是否都激活
        if (!activeCategories[fromCategoryKey] || !activeCategories[toCategoryKey]) {
            rod.hide();
            return;
        }
        
        var fromProjected = project3D(
            fromConcept.x + offsetX,
            fromConcept.y + offsetY,
            fromConcept.z
        );
        
        var toProjected = project3D(
            toConcept.x + offsetX,
            toConcept.y + offsetY,
            toConcept.z
        );
        
        var fromX = viewCenterX + fromProjected.x;
        var fromY = viewCenterY + fromProjected.y;
        var toX = viewCenterX + toProjected.x;
        var toY = viewCenterY + toProjected.y;
        
        var dx = toX - fromX;
        var dy = toY - fromY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        var avgZ = (fromProjected.z + toProjected.z) / 2;
        var importance = rod.data('importance') || 1;
        var rodThickness = (0.5 + importance * 0.3) * ((fromProjected.scale + toProjected.scale) / 2);
        var opacity = 0.3 + importance * 0.07;
        
        // 修复闪烁：使用更稳定的CSS属性设置
        rod.css({
            left: fromX + 'px',
            top: fromY + 'px',
            width: distance + 'px',
            height: rodThickness + 'px',
            transform: 'rotate(' + angle + 'deg) translateZ(0)',
            opacity: opacity,
            zIndex: Math.round(900 - avgZ)
        });
        
        rod.show();
    }
    
    // 更新所有位置
    function updateAllPositions() {
        mathConcepts.forEach(function(concept) {
            var sphere = $('#math-3d-sphere-' + concept.id);
            var label = $('#math-3d-label-' + concept.id);
            if (sphere.length && label.length) {
                updateSpherePosition(concept, sphere, label);
            }
        });
        
        conceptConnections.forEach(function(connection, index) {
            var fromConcept = getConceptById(connection[0]);
            var toConcept = getConceptById(connection[1]);
            var rod = $('#math-3d-rod-' + index);
            if (fromConcept && toConcept && rod.length) {
                updateRodPosition(fromConcept, toConcept, rod, index);
            }
        });
    }
    
    // 动画循环 - 优化性能
    function animate() {
        var smoothing = 0.15;
        
        offsetX += (targetOffsetX - offsetX) * smoothing;
        offsetY += (targetOffsetY - offsetY) * smoothing;
        spaceScale += (targetSpaceScale - spaceScale) * smoothing;
        rotateX += (targetRotateX - rotateX) * smoothing;
        rotateY += (targetRotateY - rotateY) * smoothing;
        
        updateAllPositions();
        
        animationFrameId = requestAnimationFrame(animate);
    }
    
    // 缩放逻辑
    function zoomAtPoint(delta, mouseX, mouseY) {
        var oldScale = targetSpaceScale;
        var newScale = targetSpaceScale * delta;
        
        if (newScale < 0.05) newScale = 0.05;
        if (newScale > 5) newScale = 5;
        
        var scaleRatio = newScale / oldScale;
        targetOffsetX = mouseX - (mouseX - targetOffsetX) * scaleRatio;
        targetOffsetY = mouseY - (mouseY - targetOffsetY) * scaleRatio;
        targetSpaceScale = newScale;
    }
    
    // 选择概念
    function selectConcept(conceptId) {
        if (selectedConcept === conceptId) {
            resetSelection();
            return;
        }
        
        selectedConcept = conceptId;
        var concept = getConceptById(conceptId);
        
        if (concept) {
            updateSelectedInfo(concept);
            highlightRelatedConcepts(conceptId);
        }
    }
    
    // 高亮相关概念
    function highlightRelatedConcepts(conceptId) {
        $('.math-3d-concept-sphere').addClass('math-3d-faded');
        $('.math-3d-concept-label').addClass('math-3d-faded');
        $('.math-3d-connection-rod').addClass('math-3d-faded');
        
        $('#math-3d-sphere-' + conceptId)
            .removeClass('math-3d-faded')
            .addClass('math-3d-highlighted');
        $('#math-3d-label-' + conceptId)
            .removeClass('math-3d-faded')
            .addClass('math-3d-highlighted');
        
        var relatedConnections = conceptConnections.filter(function(conn) {
            return conn[0] === conceptId || conn[1] === conceptId;
        });
        
        relatedConnections.forEach(function(conn) {
            var relatedConceptId = conn[0] === conceptId ? conn[1] : conn[0];
            var connectionIndex = conceptConnections.indexOf(conn);
            
            $('#math-3d-rod-' + connectionIndex)
                .removeClass('math-3d-faded')
                .addClass('math-3d-highlighted');
            
            $('#math-3d-sphere-' + relatedConceptId)
                .removeClass('math-3d-faded')
                .addClass('math-3d-highlighted');
            $('#math-3d-label-' + relatedConceptId)
                .removeClass('math-3d-faded')
                .addClass('math-3d-highlighted');
        });
    }
    
    // 右键点击概念
    function rightClickConcept(conceptId) {
        if (!firstRightClickConcept) {
            firstRightClickConcept = conceptId;
            $('#math-3d-sphere-' + conceptId).css('box-shadow', '0 0 20px #ffeb3b, inset 0 0 20px rgba(255,235,59,0.3)');
            updateSelectedInfo(getConceptById(conceptId), "第一步: 已选择第一个概念");
        } else {
            if (firstRightClickConcept === conceptId) {
                $('#math-3d-sphere-' + conceptId).css('box-shadow', '');
                firstRightClickConcept = null;
                resetSelection();
            } else {
                var path = findPath(firstRightClickConcept, conceptId);
                if (path && path.length > 0) {
                    highlightPath(path);
                    updateSelectedInfo(
                        getConceptById(conceptId), 
                        "路径找到: " + path.map(function(id) { 
                            var c = getConceptById(id);
                            return c ? c.name : id;
                        }).join(" → ")
                    );
                } else {
                    updateSelectedInfo(
                        getConceptById(conceptId), 
                        "未找到路径连接这两个概念"
                    );
                }
                firstRightClickConcept = null;
            }
        }
    }
    
    // 查找路径
    function findPath(startId, endId) {
        var adjacency = {};
        
        // 初始化所有节点的邻接表
        mathConcepts.forEach(function(concept) {
            adjacency[concept.id] = [];
        });
        
        // 添加连接关系
        conceptConnections.forEach(function(conn) {
            var fromId = conn[0];
            var toId = conn[1];
            
            // 确保节点存在
            if (adjacency[fromId] !== undefined && adjacency[toId] !== undefined) {
                adjacency[fromId].push(toId);
                adjacency[toId].push(fromId);
            }
        });
        
        // BFS查找路径
        var queue = [[startId]];
        var visited = {};
        visited[startId] = true;
        
        while (queue.length > 0) {
            var path = queue.shift();
            var node = path[path.length - 1];
            
            if (node === endId) {
                return path;
            }
            
            // 确保节点有邻接关系
            if (adjacency[node]) {
                adjacency[node].forEach(function(neighbor) {
                    if (!visited[neighbor]) {
                        visited[neighbor] = true;
                        var newPath = path.slice();
                        newPath.push(neighbor);
                        queue.push(newPath);
                    }
                });
            }
        }
        
        return null;
    }
    
    // 高亮路径
    function highlightPath(path) {
        $('.math-3d-concept-sphere').addClass('math-3d-faded');
        $('.math-3d-concept-label').addClass('math-3d-faded');
        $('.math-3d-connection-rod').addClass('math-3d-faded');
        $('.math-3d-concept-sphere').removeClass('math-3d-path-node');
        $('.math-3d-connection-rod').removeClass('math-3d-path-connection');
        
        path.forEach(function(conceptId) {
            $('#math-3d-sphere-' + conceptId)
                .removeClass('math-3d-faded')
                .addClass('math-3d-path-node');
            $('#math-3d-label-' + conceptId)
                .removeClass('math-3d-faded')
                .addClass('math-3d-highlighted');
        });
        
        for (var i = 0; i < path.length - 1; i++) {
            var fromId = path[i];
            var toId = path[i + 1];
            
            conceptConnections.forEach(function(conn, index) {
                if ((conn[0] === fromId && conn[1] === toId) || 
                    (conn[0] === toId && conn[1] === fromId)) {
                    $('#math-3d-rod-' + index)
                        .removeClass('math-3d-faded')
                        .addClass('math-3d-path-connection');
                }
            });
        }
    }
    
    // 重置选择
    function resetSelection() {
        selectedConcept = null;
        firstRightClickConcept = null;
        $('.math-3d-concept-sphere').removeClass('math-3d-faded math-3d-highlighted math-3d-path-node');
        $('.math-3d-concept-label').removeClass('math-3d-faded math-3d-highlighted');
        $('.math-3d-connection-rod').removeClass('math-3d-faded math-3d-highlighted math-3d-path-connection');
        $('.math-3d-concept-sphere').css('box-shadow', '');
        updateSelectedInfo(null);
        updateAllPositions();
    }
    
    // 更新选中信息
    function updateSelectedInfo(concept, additionalInfo) {
        var selectedInfo = controlsPanel.find('#math-3d-selected-info');
        
        if (!concept) {
            selectedInfo.html('<p>未选择任何概念</p>');
            return;
        }
        
        var html = '<div class="math-3d-selected-concept">';
        html += '<h4>' + concept.fullName + ' (' + concept.name + ')</h4>';
        html += '<p><strong>学科分类:</strong> ' + concept.category;
        if (concept.majorCategory && concept.majorCategory !== concept.category) {
            html += ' (' + concept.majorCategory + ')';
        }
        html += '</p>';
        html += '<p><strong>重要性:</strong> ' + concept.importance + '/10</p>';
        html += '<p><strong>定义:</strong> ' + (concept.definitionHTML || concept.definition || '暂无定义') + '</p>';
        html += '<p><strong>3D坐标:</strong> (' + concept.x.toFixed(1) + ', ' + concept.y.toFixed(1) + ', ' + concept.z.toFixed(1) + ')</p>';
        
        if (additionalInfo) {
            html += '<p style="color:#ffeb3b;margin-top:8px;"><strong>' + additionalInfo + '</strong></p>';
        }
        
        html += '</div>';
        selectedInfo.html(html);
    }
    
    // 显示工具提示
    function showTooltip(concept, element) {
        if (!enableTooltips) return;
        
        hideTooltip();
        
        var tooltip = $('<div class="math-3d-tooltip"></div>')
            .html('<h4>' + concept.fullName + ' (' + concept.name + ')</h4>' +
                  '<div class="math-3d-tooltip-category">' + concept.category + 
                  (concept.majorCategory && concept.majorCategory !== concept.category ? ' | ' + concept.majorCategory : '') +
                  '</div>' +
                  '<p><strong>定义:</strong> ' + (concept.definitionHTML || concept.definition || '暂无定义') + '</p>' +
                  '<p><strong>重要性:</strong> ' + concept.importance + '/10</p>' +
                  '<p><strong>3D坐标:</strong> (' + concept.x.toFixed(1) + ', ' + concept.y.toFixed(1) + ', ' + concept.z.toFixed(1) + ')</p>')
            .appendTo('body');
        
        var pos = element.offset();
        var elementWidth = element.width();
        var elementHeight = element.height();
        var tooltipWidth = tooltip.outerWidth();
        var tooltipHeight = tooltip.outerHeight();
        
        var left = pos.left + elementWidth + 15;
        var top = pos.top - tooltipHeight / 2 + elementHeight / 2;
        
        if (left + tooltipWidth > $(window).width()) {
            left = pos.left - tooltipWidth - 15;
        }
        
        if (top + tooltipHeight > $(window).height()) {
            top = $(window).height() - tooltipHeight - 10;
        }
        
        if (top < 10) {
            top = 10;
        }
        
        tooltip.css({
            left: left + 'px',
            top: top + 'px'
        });
        
        setTimeout(function() {
            tooltip.addClass('show');
        }, 10);
        
        tooltipTimeout = setTimeout(function() {
            hideTooltip();
        }, 5000);
    }
    
    // 显示连接工具提示
    function showConnectionTooltip(description, element, fromConcept, toConcept) {
        if (!enableTooltips) return;
        
        hideTooltip();
        
        var tooltip = $('<div class="math-3d-tooltip"></div>')
            .html('<h4>' + fromConcept.name + ' ↔ ' + toConcept.name + '</h4>' +
                  '<p><strong>关系说明:</strong> ' + (description || '暂无说明') + '</p>' +
                  '<p><strong>连接:</strong> ' + fromConcept.fullName + ' 与 ' + toConcept.fullName + '</p>' +
                  '<p><strong>学科:</strong> ' + fromConcept.category + ' ↔ ' + toConcept.category + '</p>' +
                  '<p><strong>距离:</strong> ' + 
                  Math.sqrt(
                      Math.pow(toConcept.x - fromConcept.x, 2) + 
                      Math.pow(toConcept.y - fromConcept.y, 2) + 
                      Math.pow(toConcept.z - fromConcept.z, 2)
                  ).toFixed(1) + ' 单位</p>')
            .appendTo('body');
        
        var pos = element.offset();
        var elementWidth = element.width();
        var elementHeight = element.height();
        var tooltipWidth = tooltip.outerWidth();
        var tooltipHeight = tooltip.outerHeight();
        
        var left = pos.left + elementWidth / 2 - tooltipWidth / 2;
        var top = pos.top - tooltipHeight - 10;
        
        if (left + tooltipWidth > $(window).width()) {
            left = $(window).width() - tooltipWidth - 10;
        }
        
        if (left < 10) {
            left = 10;
        }
        
        if (top < 10) {
            top = pos.top + elementHeight + 10;
        }
        
        tooltip.css({
            left: left + 'px',
            top: top + 'px'
        });
        
        setTimeout(function() {
            tooltip.addClass('show');
        }, 10);
        
        tooltipTimeout = setTimeout(function() {
            hideTooltip();
        }, 5000);
    }
    
    // 隐藏工具提示
    function hideTooltip() {
        var tooltip = $('.math-3d-tooltip');
        if (tooltip.length) {
            tooltip.removeClass('show');
            setTimeout(function() {
                tooltip.remove();
            }, 300);
        }
        if (tooltipTimeout) {
            clearTimeout(tooltipTimeout);
            tooltipTimeout = null;
        }
    }
    
    // 设置事件监听器
    function setupEventListeners(container, wrapper, controlsPanel) {
        // 鼠标左键拖动
        container.on('mousedown', function(e) {
            if (e.button === 0) {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                container.css('cursor', 'grabbing');
            }
        });
        
        // 鼠标右键拖动
        container.on('mousedown', function(e) {
            if (e.button === 2) {
                isRotating = true;
                startX = e.clientX;
                startY = e.clientY;
                container.css('cursor', 'all-scroll');
                return false;
            }
        });
        
        $(document).on('mousemove', function(e) {
            if (isDragging) {
                var deltaX = e.clientX - startX;
                var deltaY = e.clientY - startY;
                startX = e.clientX;
                startY = e.clientY;
                
                targetOffsetX += deltaX * 0.5;
                targetOffsetY += deltaY * 0.5;
            } else if (isRotating) {
                var deltaX = e.clientX - startX;
                var deltaY = e.clientY - startY;
                startX = e.clientX;
                startY = e.clientY;
                
                targetRotateY += deltaX * 0.3;
                targetRotateX -= deltaY * 0.3;
                
                if (targetRotateX > 90) targetRotateX = 90;
                if (targetRotateX < -90) targetRotateX = -90;
            }
        });
        
        $(document).on('mouseup', function() {
            isDragging = false;
            isRotating = false;
            container.css('cursor', 'grab');
        });
        
        // 键盘事件
        $(document).on('keydown', function(e) {
            if (!e.altKey) {
                switch(e.keyCode) {
                    case 37: targetOffsetX -= moveStep; break;
                    case 38: targetOffsetY -= moveStep; break;
                    case 39: targetOffsetX += moveStep; break;
                    case 40: targetOffsetY += moveStep; break;
                    default: return;
                }
                e.preventDefault();
            } else if (e.altKey) {
                switch(e.keyCode) {
                    case 37: targetRotateY -= rotateStep; break;
                    case 38: targetRotateX += rotateStep; if (targetRotateX > 90) targetRotateX = 90; break;
                    case 39: targetRotateY += rotateStep; break;
                    case 40: targetRotateX -= rotateStep; if (targetRotateX < -90) targetRotateX = -90; break;
                    default: return;
                }
                e.preventDefault();
            }
        });
        
        // 鼠标滚轮 - 只在3D图区域内触发缩放
        var smoothZoomTimeout;
        container.on('wheel', function(e) {
            // 检查是否在控制面板上滚动
            var target = e.target;
            var isInControlPanel = $(target).closest('.math-3d-controls-panel').length > 0;
            
            if (isInControlPanel) {
                // 在控制面板上，允许正常滚动
                return;
            }
            
            // 在3D图区域上，执行缩放
            e.preventDefault();
            
            var rect = container[0].getBoundingClientRect();
            var mouseX = e.clientX - rect.left;
            var mouseY = e.clientY - rect.top;
            
            var containerX = mouseX - viewCenterX;
            var containerY = mouseY - viewCenterY;
            
            var delta = e.originalEvent.deltaY > 0 ? 0.93 : 1.07;
            zoomAtPoint(delta, containerX, containerY);
            
            controlsPanel.find('#math-3d-view-status').text('3D缩放: ' + Math.round(targetSpaceScale * 100) + '%');
            
            if (smoothZoomTimeout) {
                clearTimeout(smoothZoomTimeout);
            }
            
            smoothZoomTimeout = setTimeout(function() {
                controlsPanel.find('#math-3d-view-status').text('3D视图已激活');
            }, 1000);
        });
        
        // 为控制面板添加独立的滚轮事件处理
        controlsPanel.on('wheel', function(e) {
            // 控制面板内部允许正常滚动
            // 阻止事件冒泡到容器
            e.stopPropagation();
        });
        
        // 点击容器其他地方取消选择
        container.on('click', function(e) {
            if ($(e.target).hasClass('math-3d-concept-sphere') || 
                $(e.target).closest('.math-3d-concept-label').length) return;
            resetSelection();
        });
        
        // 切换悬停提示
        controlsPanel.find('#math-3d-toggle-tooltips').on('click', function() {
            enableTooltips = !enableTooltips;
            if (enableTooltips) {
                $(this).html('<i class="fas fa-eye"></i> 启用悬停提示').removeClass('off');
            } else {
                $(this).html('<i class="fas fa-eye-slash"></i> 禁用悬停提示').addClass('off');
                hideTooltip();
            }
        });
        
        // 重置按钮 - 同时重置图例显示状态
        controlsPanel.find('#math-3d-reset-view').on('click', function() {
            targetOffsetX = 0;
            targetOffsetY = 0;
            targetSpaceScale = 1;
            targetRotateX = 20;
            targetRotateY = 30;
            resetSelection();
            
            // 重置图例显示状态
            $('.math-3d-legend-item').removeClass('hidden');
            Object.keys(activeCategories).forEach(function(category) {
                activeCategories[category] = true;
            });
            
            controlsPanel.find('#math-3d-view-status').text('3D视图已重置');
            updateAllPositions();
        });
        
        // 防止右键菜单
        container.on('contextmenu', function(e) {
            if (!$(e.target).hasClass('math-3d-concept-sphere')) {
                e.preventDefault();
                return false;
            }
        });
        
        // 窗口大小改变
        $(window).on('resize', function() {
            var containerWidth = container.width();
            var containerHeight = container.height();
            viewCenterX = containerWidth / 2;
            viewCenterY = containerHeight / 2;
            updateAllPositions();
        });
    }
}