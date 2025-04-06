/**
 * Wiki Category Cards Script
 * 
 * This script fetches MediaWiki category members and displays them as cards
 * It reads the category name from the data-category attribute
 */
(function() {
    'use strict';
    console.log('DynamicNavigation loaded');

    var API_PATH = mw.config.get('wgScriptPath') + '/api.php';
    var ITEMS_PER_LOAD = 30;
    var SCROLL_THRESHOLD = 200;
    var DEBOUNCE_TIME = 100;
    var EXCERPT_MAX_LENGTH = 300;

    var MESSAGES = {
        empty: '<div class="empty-category">В этой категории не найдено страниц.</div>',
        error: '<div class="error">Ошибка загрузки участников категории: {error}</div>',
        loading: '<div class="loading">Загрузка...</div>',
        loadingMore: '<div class="loading-more">Загрузка дополнительных статей...</div>'
    };

    var loadingStates = {};
    var loadedPages = {};
    var contentInitialized = {};

    function init() {
        $('.dynamic-navigation').each(function() {
            var $container = $(this);

            var categoryWrapperMap = {};
            $container.find('.articles-wrapper').each(function() {
                var categoryName = $(this).attr('data-category');
                if (categoryName) {
                    categoryWrapperMap[categoryName] = $(this);
                    loadedPages[categoryName] = new Set();
                }
            });

            $container.find('.wds-tabs').append(
                $('<li>').append(
                    $('<a>', { 
                        href: '/ru/wiki/Категория:Другое', 
                        'class': 'wds-button', 
                        'target': '_blank' 
                    }).append(
                        $('<i>', { 'class': 'fa-solid fa-arrow-up-right-from-square' }),
                        $('<span>', { text: 'Другое' })
                    )
                )
            );

            $container.find('.wds-tabs a').on('click', function(e) {
                if ($(this).find('span').text() === 'Другое') {
                    return;
                }
            });

            setupTabObserver($container, categoryWrapperMap);

            $container.find('.wds-tab__content.wds-is-current').each(function() {
                var $wrapper = $(this).find('.articles-wrapper');
                var categoryName = $wrapper.attr('data-category');
                if (categoryName && !contentInitialized[categoryName]) {
                    fetchCategoryMembers(categoryName, $wrapper);
                    contentInitialized[categoryName] = true;
                }
            });
        });
    }
    function setupTabObserver($container, categoryWrapperMap) {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'class' && 
                    $(mutation.target).hasClass('wds-is-current')) {
                    
                    var $tabContent = $(mutation.target);
                    var $wrapper = $tabContent.find('.articles-wrapper');
                    var categoryName = $wrapper.attr('data-category');
                    
                    if (categoryName && !contentInitialized[categoryName]) {
                        fetchCategoryMembers(categoryName, $wrapper);
                        contentInitialized[categoryName] = true;
                    }
                }
            });
        });

        $container.find('.wds-tab__content').each(function() {
            observer.observe(this, { attributes: true, attributeFilter: ['class'] });
        });
    }

    function fetchCategoryMembers(categoryName, $wrapper, continueParams) {
        var stateKey = categoryName + (continueParams ? '-' + continueParams.cmcontinue : '');
        if (loadingStates[stateKey]) return;
        
        loadingStates[stateKey] = true;

        if (!continueParams) {
            $wrapper.html(MESSAGES.loading);
        } else {
            $wrapper.append(MESSAGES.loadingMore);
        }

        var requests = [
            makeApiRequest({
                action: 'query',
                list: 'categorymembers',
                cmtitle: 'Category:' + categoryName,
                cmlimit: ITEMS_PER_LOAD,
                cmnamespace: 0,
                cmtype: 'page',
                format: 'json',
                cmsort: 'sortkey',
                cmdir: 'asc',
                ...(continueParams || {})
            }),
            continueParams ? Promise.resolve(null) : makeApiRequest({
                action: 'query',
                prop: 'categoryinfo',
                titles: 'Category:' + categoryName,
                format: 'json'
            })
        ];
        
        Promise.all(requests)
            .then(function(responses) {
                var memberData = responses[0];
                var categoryData = responses[1];
                
                if (memberData.query && memberData.query.categorymembers) {
                    var pageSet = loadedPages[categoryName];
                    memberData.query.categorymembers = memberData.query.categorymembers.filter(function(member) {
                        if (pageSet.has(member.title)) return false;
                        pageSet.add(member.title);
                        return true;
                    });
                }
                
                displayCategoryMembers(memberData, categoryData, $wrapper, !!continueParams);
                loadingStates[stateKey] = false;
            })
            .catch(function(error) {
                handleApiError(error, categoryName, $wrapper, continueParams);
                loadingStates[stateKey] = false;
            });
    }

    function makeApiRequest(params) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: API_PATH,
                data: params,
                dataType: 'json',
                type: 'GET',
                timeout: 20000
            })
            .done(resolve)
            .fail(function(xhr, status, error) {
                reject(error || status);
            });
        });
    }

    function handleApiError(error, categoryName, $wrapper, continueParams) {
        if (!continueParams) {
            $wrapper.html(MESSAGES.error.replace('{error}', error));
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
        
        if (!data.query || !data.query.categorymembers || !data.query.categorymembers.length) {
            if (!isAppending) {
                $wrapper.html(MESSAGES.empty);
            } else {
                $wrapper.removeAttr('data-continue');
            }
            return;
        }
        
        var $cardContainer = $wrapper.find('.article-cards-wrapper');
        var members = data.query.categorymembers;

        var fragment = document.createDocumentFragment();
        
        processMembers(members, 0, $cardContainer, fragment, data, $wrapper);
    }

    function processMembers(members, startIndex, $cardContainer, fragment, data, $wrapper, pagesData) {
        var batchSize = 10;
        var endIndex = Math.min(startIndex + batchSize, members.length);
        var currentBatch = members.slice(startIndex, endIndex);
        
        if (!pagesData && startIndex === 0) {
            fetchPageDetails(members, function(allPagesData) {
                processMembers(members, 0, $cardContainer, fragment, data, $wrapper, allPagesData);
            });
            return;
        }

        currentBatch.forEach(function(member) {
            var pageData = (pagesData && pagesData[member.title]) || { thumbnail: null, excerpt: null };
            var $card = createCard(member.title, pageData);
            fragment.appendChild($card[0]);
        });

        if (endIndex >= members.length) {
            $cardContainer.append(fragment);

            setupInfiniteScroll(data, $wrapper);

            if (data.continue && !$wrapper.find('.load-more-btn').length) {
                var $loadMoreBtn = $('<button>', {
                    'class': 'load-more-btn wds-button',
                    text: 'Загрузить больше статей'
                }).on('click', function() {
                    $(this).remove();
                    fetchCategoryMembers($wrapper.attr('data-category'), $wrapper, data.continue);
                });
                
                $wrapper.append($loadMoreBtn);
            }
        } else {
            $cardContainer.append(fragment);
            setTimeout(function() {
                processMembers(members, endIndex, $cardContainer, document.createDocumentFragment(), data, $wrapper, pagesData);
            }, 10);
        }
    }

    function initializeWrapperStructure(data, categoryData, $wrapper) {
        var categoryName = getCategoryName(data, $wrapper);
        var categoryUrl = mw.util.getUrl('Category:' + categoryName);
        var articleCount = '?';
        
        if (categoryData && categoryData.query && categoryData.query.pages) {
            var pageId = Object.keys(categoryData.query.pages)[0];
            var page = categoryData.query.pages[pageId];
            articleCount = page && page.categoryinfo ? page.categoryinfo.pages : '?';
        }

        var searchId = 'category_search_' + categoryName.replace(/\s+/g, '_') + '_' + Math.floor(Math.random() * 10000);
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
                            .append($('<input>', {
                                id: searchId,
                                'class': 'wds-input__field',
                                type: 'text',
                                maxlength: '100'
                            }))
                            .append($('<label>', {
                                'class': 'wds-input__label',
                                for: searchId,
                                text: 'Поиск статей'
                            }))
                    )
            );

        var $searchInput = $header.find('.wds-input__field');
        var $searchWrapper = $searchInput.closest('.wds-input');

        $searchInput.on('input', function() {
            var searchTerm = $(this).val().toLowerCase();
            $searchWrapper.toggleClass('is-empty', !searchTerm);

            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(function() {
                $wrapper.find('.article-card').each(function() {
                    var $card = $(this);
                    var title = $card.find('.article-card__title').text().toLowerCase();
                    var excerpt = $card.find('.article-card__subtitle').text().toLowerCase();
                    $card.toggle(!searchTerm || title.includes(searchTerm) || excerpt.includes(searchTerm));
                });

                var hasVisibleCards = $wrapper.find('.article-card:visible').length > 0;
                var $noResults = $wrapper.find('.no-search-results');
                
                if (!hasVisibleCards && searchTerm) {
                    if (!$noResults.length) {
                        $noResults = $('<div class="no-search-results">По запросу ничего не найдено</div>');
                        $wrapper.find('.article-cards-wrapper').after($noResults);
                    }
                    $noResults.show();
                } else if ($noResults.length) {
                    $noResults.hide();
                }
            }, 300);
        }).trigger('input');
        
        $wrapper.empty().append(
            $header,
            $('<div class="article-cards-wrapper">')
        );
    }

    function getCategoryName(data, $wrapper) {
        var attrCategory = $wrapper.attr('data-category');
        
        if (data.query && data.query.categorymembers.length > 0) {
            // Try to extract from cmtitle if available
            if (data.query.categorymembers[0].title) {
                var titleParts = data.query.categorymembers[0].title.split(':');
                if (titleParts.length > 1) {
                    return titleParts[1];
                }
            }
        }
        
        return attrCategory;
    }

    function fetchPageDetails(members, callback) {
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
            prop: 'pageimages|extracts',
            pithumbsize: 400,
            exintro: true,
            explaintext: true,
            exlimit: members.length,
            exchars: EXCERPT_MAX_LENGTH,
            format: 'json'
        })
        .then(function(data) {
            var pagesData = {};
            if (data.query && data.query.pages) {
                Object.values(data.query.pages).forEach(function(page) {
                    var excerpt = page.extract || null;
                    
                    if (excerpt) {
                        var dashRegex = / — | - | – /;
                        var dashMatch = excerpt.match(dashRegex);
                        
                        if (dashMatch) {
                            var dashIndex = excerpt.indexOf(dashMatch[0]);
                            excerpt = excerpt.substring(dashIndex + dashMatch[0].length).trim();
                            excerpt = excerpt.charAt(0).toUpperCase() + excerpt.slice(1);
                        }
                    }
                    
                    pagesData[page.title] = {
                        thumbnail: page.thumbnail ? page.thumbnail.source : null,
                        excerpt: excerpt
                    };
                });
            }
            callback(pagesData);
        })
        .catch(function() {
            callback({});
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
                'class': 'article-card__image',
                'data-src': pageData.thumbnail,
                alt: title,
                loading: 'lazy'
            });

            if ('loading' in HTMLImageElement.prototype) {
                $image.attr('src', pageData.thumbnail);
                $image.on('load', function() {
                    if (this.naturalHeight > this.naturalWidth) {
                        $(this).css('object-position', 'top center');
                    }
                });
            } else {
                var observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            var img = entry.target;
                            img.src = img.getAttribute('data-src');
                            observer.unobserve(img);
                        }
                    });
                });
                
                setTimeout(function() {
                    observer.observe($image[0]);
                }, 0);
            }

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

        if (pageData.excerpt) {
            $content.append(
                $('<div>', {
                    'class': 'article-card__subtitle',
                    text: pageData.excerpt
                })
            );
        }
        
        $card.append($thumbnailWrapper, $content);
        return $card;
    }

    function setupInfiniteScroll(data, $wrapper) {
        var categoryName = $wrapper.attr('data-category');
        var scrollNamespace = 'scroll.category-' + categoryName;
        
        $(window).off(scrollNamespace);
        
        if (data.continue) {
            $wrapper.attr('data-continue', JSON.stringify(data.continue));
            
            $(window).on(scrollNamespace, function() {
                clearTimeout(this.scrollTimeout);
                
                this.scrollTimeout = setTimeout(function() {
                    // Check if we should load more content
                    var continueSuffix = data.continue.cmcontinue;
                    if (loadingStates[categoryName + '-' + continueSuffix]) return;
                    
                    var $content = $wrapper.closest('.wds-tab__content');
                    if (!$content.hasClass('wds-is-current')) return;
                    
                    if (!$wrapper.attr('data-continue')) return;
                    
                    var $cardsWrapper = $wrapper.find('.article-cards-wrapper');
                    if (!$cardsWrapper.length) return;
                    
                    var scrollBottom = $(window).scrollTop() + $(window).height();
                    var wrapperBottom = $cardsWrapper.offset().top + $cardsWrapper.height();
                    
                    if (scrollBottom >= wrapperBottom - SCROLL_THRESHOLD) {
                        try {
                            var continueData = JSON.parse($wrapper.attr('data-continue'));
                            $wrapper.removeAttr('data-continue');
                            fetchCategoryMembers(categoryName, $wrapper, continueData);
                        } catch (e) {
                            console.error('Error parsing continue data:', e);
                        }
                    }
                }, DEBOUNCE_TIME);
            });
            
            $(window).trigger(scrollNamespace);
        }
    }

    init();
})();