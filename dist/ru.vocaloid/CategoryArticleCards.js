/**
 * Wiki Category Cards Script
 * 
 * This script fetches MediaWiki category members and displays them as cards
 * It reads the category name from the data-category attribute
 */
(function() {
    'use strict';
    console.log('DynamicNavigation loaded');

    var EMPTY_MESSAGE = '<div class="vcw-card empty-category">В этой категории не найдено страниц.</div>';
    var ERROR_MESSAGE = '<div class="vcw-card error">Ошибка загрузки участников категории: {error}</div>';
    var LOADING_MESSAGE = '<div class="loading">Загрузка...</div>';
    var LOADING_MORE_MESSAGE = '<div class="loading-more">Загрузка дополнительных статей...</div>';

    var API_PATH = mw.config.get('wgScriptPath') + '/api.php';
    var SCROLL_THRESHOLD = 200;
    var DEBOUNCE_TIME = 100;
    var ITEMS_PER_LOAD = 30;

    var loadingStates = {};
    var loadedPages = {};

    function init() {
        $('.dynamic-navigation').each(function() {
            initializeContainer($(this));
        });
    }

    function initializeContainer($container) {
        initializeTabs($container);
        loadInitialContent($container);
        setupTabSwitching($container);
    }

    function initializeTabs($container) {
        $container.find('.articles-wrapper').each(function() {
            var categoryName = $(this).attr('data-category');
            if (categoryName) {
                loadedPages[categoryName] = new Set();
            }
        });
    }

    function loadInitialContent($container) {
        $container.find('.wds-tab__content .articles-wrapper').each(function() {
            var $wrapper = $(this);
            var categoryName = $wrapper.attr('data-category');
            
            if (categoryName) {
                fetchCategoryMembers(categoryName, $wrapper);
            }
        });
    }

    function setupTabSwitching($container) {
        $container.find('.wds-tabs__tab').on('click', function() {
            var tabHash = $(this).attr('data-hash');
            updateTabUI($container, $(this), tabHash);
        });
    }

    function updateTabUI($container, $tab, tabHash) {
        $container.find('.wds-tabs__tab').removeClass('wds-is-current');
        $tab.addClass('wds-is-current');
        
        $container.find('.wds-tab__content').removeClass('wds-is-current');
        $container.find('.wds-tab__content').each(function() {
            var $content = $(this);
            var $wrapper = $content.find('.articles-wrapper');
            if ($wrapper.attr('data-category') === tabHash) {
                $content.addClass('wds-is-current');
            }
        });
    }

    function fetchCategoryMembers(categoryName, $wrapper, continueParams) {
        var stateKey = categoryName + (continueParams ? '-' + continueParams.cmcontinue : '');
        if (loadingStates[stateKey]) {
            return;
        }
        
        loadingStates[stateKey] = true;
        showLoading($wrapper, !!continueParams);
        
        var requests = [
            makeApiRequest(buildCategoryMemberParams(categoryName, continueParams)),
            continueParams ? Promise.resolve(null) : makeApiRequest(buildCategoryInfoParams(categoryName))
        ];
        
        Promise.all(requests)
            .then(function(responses) {
                var memberData = responses[0];
                var categoryData = responses[1];
                
                filterAlreadyLoadedPages(categoryName, memberData);
                displayCategoryMembers(memberData, categoryData, $wrapper, !!continueParams);
                loadingStates[stateKey] = false;
            })
            .catch(function(error) {
                handleApiError(error, categoryName, $wrapper, continueParams);
                loadingStates[stateKey] = false;
            });
    }

    function showLoading($wrapper, isMore) {
        if (!isMore) {
            $wrapper.html(LOADING_MESSAGE);
        } else {
            $wrapper.append(LOADING_MORE_MESSAGE);
        }
    }

    function buildCategoryMemberParams(categoryName, continueParams) {
        return $.extend({
            action: 'query',
            list: 'categorymembers',
            cmtitle: 'Category:' + categoryName,
            cmlimit: ITEMS_PER_LOAD,
            cmnamespace: 0,
            cmtype: 'page',
            format: 'json',
            cmsort: 'sortkey',
            cmdir: 'asc'
        }, continueParams || {});
    }

    function buildCategoryInfoParams(categoryName) {
        return {
            action: 'query',
            prop: 'categoryinfo',
            titles: 'Category:' + categoryName,
            format: 'json'
        };
    }

    function makeApiRequest(params) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: API_PATH,
                data: params,
                dataType: 'json',
                type: 'GET'
            })
            .done(resolve)
            .fail(function(xhr, status, error) {
                reject(error);
            });
        });
    }

    function filterAlreadyLoadedPages(categoryName, memberData) {
        if (memberData.query && memberData.query.categorymembers) {
            var pageSet = loadedPages[categoryName];
            memberData.query.categorymembers = memberData.query.categorymembers.filter(function(member) {
                if (pageSet.has(member.title)) {
                    return false;
                }
                pageSet.add(member.title);
                return true;
            });
        }
    }

    function handleApiError(error, categoryName, $wrapper, continueParams) {
        if (!continueParams) {
            $wrapper.html(ERROR_MESSAGE.replace('{error}', error));
        } else {
            $wrapper.find('.loading-more').remove();
            var $retryMessage = $('<div class="error-more">Не удалось загрузить дополнительные статьи. ' +
                '<a href="#" class="retry">Повторить попытку</a></div>');
            
            $wrapper.append($retryMessage);
            
            $retryMessage.find('.retry').on('click', function(e) {
                e.preventDefault();
                $wrapper.find('.error-more').remove();
                fetchCategoryMembers(categoryName, $wrapper, continueParams);
            });
        }
    }

    function displayCategoryMembers(data, categoryData, $wrapper, isAppending) {
        $wrapper.find('.loading, .loading-more, .load-more-btn').remove();
        
        if (!isAppending) {
            initializeWrapperStructure(data, categoryData, $wrapper);
        }
        
        if (!hasValidCategoryMembers(data)) {
            handleEmptyCategory($wrapper, isAppending);
            return;
        }
        
        var $cardContainer = $wrapper.find('.article-cards-wrapper');
        var members = data.query.categorymembers;
        
        fetchBatchPageDetails(members, function(pagesData) {
            appendCards(members, pagesData, $cardContainer);
            setupInfiniteScroll(data, $wrapper);
            addLoadMoreButton(data, $wrapper);
        });
    }

    function initializeWrapperStructure(data, categoryData, $wrapper) {
        var categoryName = getCategoryName(data, $wrapper);
        var categoryUrl = mw.util.getUrl('Category:' + categoryName);
        var articleCount = getCategoryArticleCount(categoryData);
        var $header = $('<div class="article-header">')
            .append($('<h2>').append($('<a>', {
                href: categoryUrl,
                text: categoryName
            })))
            .append($('<p>', {
                text: 'Количество статей в категории: ' + articleCount 
            }))
            .append(
                $('<div class="article-header__search">')
                    .append(
                        $('<div class="wds-input">')
                            .append(
                                $('<input>', {
                                    id: 'category_search_' + categoryName.replace(/\s+/g, '_'),
                                    'class': 'wds-input__field',
                                    type: 'text',
                                    maxlength: '100'
                                })
                            )
                            .append(
                                $('<label>', {
                                    'class': 'wds-input__label',
                                    for: 'category_search_' + categoryName.replace(/\s+/g, '_'),
                                    text: 'Поиск статей'
                                })
                            )
                    )
            );

        // Add search functionality
        var searchTimeout;
        var $searchInput = $header.find('.wds-input__field');
        var $searchWrapper = $searchInput.closest('.wds-input');

        $searchInput.on('input', function() {
            var searchTerm = $(this).val().toLowerCase();
            
            if (!searchTerm) {
                $searchWrapper.addClass('is-empty');
            } else {
                $searchWrapper.removeClass('is-empty');
            }

            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            
            searchTimeout = setTimeout(function() {
                filterCards($wrapper, searchTerm);
            }, 300);
        }).trigger('input');
        
        $wrapper.empty().append(
            $header,
            $('<div class="article-cards-wrapper">')
        );
    }

    function filterCards($wrapper, searchTerm) {
        var $cards = $wrapper.find('.article-card');
        
        if (!searchTerm) {
            $cards.show();
            return;
        }
        
        $cards.each(function() {
            var $card = $(this);
            var title = $card.find('.article-card__title').text().toLowerCase();
            
            if (title.includes(searchTerm)) {
                $card.show();
            } else {
                $card.hide();
            }
        });
    }

    function getCategoryName(data, $wrapper) {
        if (data.query && data.query.categorymembers.length > 0) {
            var parts = data.query.categorymembers[0].title.split(':');
            return parts[1] || $wrapper.attr('data-category');
        }
        return $wrapper.attr('data-category');
    }

    function getCategoryArticleCount(categoryData) {
        if (!categoryData || !categoryData.query || !categoryData.query.pages) {
            return '?';
        }
        
        var pageId = Object.keys(categoryData.query.pages)[0];
        var page = categoryData.query.pages[pageId];
        return page && page.categoryinfo ? page.categoryinfo.pages : '?';
    }

    function hasValidCategoryMembers(data) {
        return data.query && 
               data.query.categorymembers && 
               data.query.categorymembers.length > 0;
    }

    function handleEmptyCategory($wrapper, isAppending) {
        if (!isAppending) {
            $wrapper.html(EMPTY_MESSAGE);
        } else {
            $wrapper.removeAttr('data-continue');
        }
    }

    function fetchBatchPageDetails(members, callback) {
        var titles = members.map(function(member) {
            return member.title;
        }).join('|');
        
        if (!titles) {
            callback({});
            return;
        }
        
        makeApiRequest({
            action: 'query',
            titles: titles,
            prop: 'pageimages',
            pithumbsize: 400,
            format: 'json'
        })
        .then(function(data) {
            var pagesData = {};
            Object.values(data.query.pages).forEach(function(page) {
                pagesData[page.title] = {
                    thumbnail: page.thumbnail ? page.thumbnail.source : null
                };
            });
            callback(pagesData);
        })
        .catch(function() {
            callback({});
        });
    }

    function appendCards(members, pagesData, $container) {
        members.forEach(function(member) {
            var pageData = pagesData[member.title] || { thumbnail: null };
            var $card = createCard(member.title, pageData);
            $container.append($card);
        });
    }
    function createCard(title, pageData) {
        var pageUrl = mw.util.getUrl(title);
        var $card = $('<a>', {
            href: pageUrl,
            'class': 'article-card'
        });
        
        var $thumbnailWrapper = $('<div>', {
            'class': 'article-card__thumbnail'
        });
        
        if (pageData.thumbnail) {
            var $image = $('<img>', {
                src: pageData.thumbnail,
                'class': 'article-card__image',
                alt: title
            });

            // Add load event to check image dimensions
            $image.on('load', function() {
                if (this.naturalHeight > this.naturalWidth) {
                    $(this).css('object-position', 'top center');
                }
            });

            $thumbnailWrapper.append($image);
        }
        
        var $content = $('<div>', {
            'class': 'article-card__text'
        }).append(
            $('<div>', {
                'class': 'article-card__title',
                text: title
            })
        );
        
        $card.append($thumbnailWrapper, $content);
        
        return $card;
    }

    function setupInfiniteScroll(data, $wrapper) {
        var categoryName = $wrapper.attr('data-category');
        var scrollNamespace = 'scroll.category-' + categoryName;
        
        $(window).off(scrollNamespace);
        
        if (data.continue) {
            $wrapper.attr('data-continue', JSON.stringify(data.continue));
            
            var scrollTimeout;
            $(window).on(scrollNamespace, function() {
                if (scrollTimeout) {
                    clearTimeout(scrollTimeout);
                }
                
                scrollTimeout = setTimeout(function() {
                    if (shouldLoadMoreContent($wrapper, categoryName, data.continue.cmcontinue)) {
                        loadMoreContent($wrapper, categoryName);
                    }
                }, DEBOUNCE_TIME);
            });
            
            $(window).trigger(scrollNamespace);
        }
    }

    function shouldLoadMoreContent($wrapper, categoryName, continueSuffix) {
        if (loadingStates[categoryName + '-' + continueSuffix]) {
            return false;
        }
        
        var $content = $wrapper.closest('.wds-tab__content');
        if (!$content.hasClass('wds-is-current')) {
            return false;
        }
        
        if (!$wrapper.attr('data-continue')) {
            return false;
        }
        
        var $cardsWrapper = $wrapper.find('.article-cards-wrapper');
        var scrollBottom = $(window).scrollTop() + $(window).height();
        var wrapperBottom = $cardsWrapper.offset().top + $cardsWrapper.height();
        
        return $cardsWrapper.length && scrollBottom >= wrapperBottom - SCROLL_THRESHOLD;
    }

    function loadMoreContent($wrapper, categoryName) {
        try {
            var continueData = JSON.parse($wrapper.attr('data-continue'));
            $wrapper.removeAttr('data-continue');
            fetchCategoryMembers(categoryName, $wrapper, continueData);
        } catch (e) {
            console.error('Error parsing continue data:', e);
        }
    }

    function addLoadMoreButton(data, $wrapper) {
        if (data.continue && !$wrapper.find('.load-more-btn').length) {
            var $loadMoreBtn = $('<button>', {
                'class': 'load-more-btn wds-button',
                text: 'Загрузить больше статей'
            });
            
            $wrapper.append($loadMoreBtn);
            
            $loadMoreBtn.on('click', function() {
                $(this).remove();
                fetchCategoryMembers($wrapper.attr('data-category'), $wrapper, data.continue);
            });
        }
    }

    init();
})();