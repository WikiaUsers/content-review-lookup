(function (root) {
    'use strict';
    var own = function (value, key) { return Object.prototype.hasOwnProperty.call(value, key); };
    var clone = function (value) { return value === undefined ? undefined : JSON.parse(JSON.stringify(value)); };
    var object = function (value) { return value !== null && typeof value === 'object' && !Array.isArray(value); };
    var keys = ['Dragons', 'Quests', 'EarningRates', 'DragonCommemorations', 'BreedingHints'];
    var units = { day: 86400000, hour: 3600000, minute: 60000, second: 1000, millisecond: 1 };
    var suffixes = { hour: 'H', minute: 'M', second: 'S', millisecond: 'MS' };

    function equal(left, right) {
        function stable(value) {
            if (Array.isArray(value)) return value.map(stable);
            if (!object(value)) return value;
            return Object.keys(value).sort().reduce(function (result, key) {
                Object.defineProperty(result, key, { value: stable(value[key]), enumerable: true });
                return result;
            }, {});
        }
        return JSON.stringify(stable(left)) === JSON.stringify(stable(right));
    }
    function collection(document, key) {
        var wrapper = key.charAt(0).toLowerCase() + key.slice(1);
        var result = object(document) && own(document, wrapper) ? document[wrapper] : document;
        if (!Array.isArray(result) && !object(result)) throw new Error(key + ': invalid collection');
        return result;
    }
    function record(document, key, name) {
        var data = collection(document, key);
        if (!Array.isArray(data)) return own(data, name) ? data[name] : undefined;
        var found = data.filter(function (entry) { return entry.Name === name; });
        if (found.length > 1) throw new Error(key + ': duplicate records for ' + name);
        return found[0];
    }
    function update(document, key, name, value) {
        var result = clone(document);
        var data = collection(result, key);
        record(result, key, name);
        if (Array.isArray(data)) {
            var index = data.findIndex(function (entry) { return entry.Name === name; });
            if (value === undefined) { if (index !== -1) data.splice(index, 1); }
            else if (index === -1) data.push(clone(value));
            else data[index] = clone(value);
        } else if (value === undefined) delete data[name];
        else Object.defineProperty(data, name, { value: clone(value), enumerable: true, writable: true, configurable: true });
        return result;
    }
    function durationMilliseconds(text) {
        if (text === '' || text === undefined || text === null || /^instant$/i.test(String(text))) return 0;
        var total = 0;
        var remaining = String(text).replace(/([0-9]+(?:\.[0-9]+)?)\s*(milliseconds?|ms|days?|d|hours?|h|minutes?|mins?|m|seconds?|secs?|s)\b/gi,
            function (_, number, unit) {
                var key = /^ms|^millisecond/i.test(unit) ? 'millisecond' :
                    /^d/i.test(unit) ? 'day' : /^h/i.test(unit) ? 'hour' : /^m/i.test(unit) ? 'minute' : 'second';
                total += Number(number) * units[key]; return '';
            });
        if (remaining.trim() || !Number.isSafeInteger(total)) throw new Error('Invalid duration: ' + text);
        return total;
    }
    function formatDuration(values) {
        var milliseconds = Object.keys(values).reduce(function (total, key) {
            var value = values[key] === '' ? 0 : Number(values[key]);
            if (!own(units, key) || !Number.isInteger(value) || value < 0) throw new Error('Duration values must be nonnegative integers');
            return total + value * units[key];
        }, 0);
        if (!Number.isSafeInteger(milliseconds)) throw new Error('Duration is too large');
        return Object.keys(suffixes).map(function (key) {
            var value = Math.floor(milliseconds / units[key]); milliseconds %= units[key];
            return value ? value + ' ' + suffixes[key] : '';
        }).filter(Boolean).join(' ');
    }
    function dateInput(value) {
        if (!value) return '';
        var text = String(value).replace(/\s+#.*$/, '');
        if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
        var date = new Date(text + ' UTC');
        return isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
    }
    function releaseDate(value) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('A release date is required');
        var date = new Date(value + 'T00:00:00Z');
        if (isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) throw new Error('Invalid release date');
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
    }
    function apiCall(api, method, parameters) {
        function failure(code, details) {
            var info = details && details.error || details || {};
            var error = new Error(info.info || String(code));
            error.code = info.code || code;
            return error;
        }
        return new Promise(function (resolve, reject) {
            var request = method === 'edit' ? api.postWithToken('csrf', parameters) : api[method](parameters);
            request.then(function (result) {
                if (result.error) reject(failure(result.error.code, result.error)); else resolve(result);
            }, function (code, details) { reject(failure(code, details)); });
        });
    }
    function load(api, title) {
        return apiCall(api, 'get', { action: 'query', prop: 'revisions', titles: title, redirects: 1,
            rvprop: 'content|ids|timestamp', rvslots: 'main', curtimestamp: 1, formatversion: 2 }).then(function (result) {
            var page = result.query.pages[0];
            if (page.missing || !page.revisions) throw new Error(title + ': page not found or unreadable');
            var revision = page.revisions[0];
            return { title: page.title, document: JSON.parse(revision.slots.main.content), revision: revision.revid,
                timestamp: revision.timestamp, start: result.curtimestamp };
        });
    }
    // Preflight every changed record before writing. Merge into fresh documents
    // and protect each write with baserevid; never overwrite another editor.
    function save(api, snapshots, name, values, user, progress) {
        var plans = [];
        var saved = [];
        return keys.reduce(function (chain, key) {
            return chain.then(function () {
                var original = snapshots[key];
                var before = record(original.document, key, name);
                if (equal(before, values[key])) return;
                return load(api, original.title).then(function (fresh) {
                    var current = record(fresh.document, key, name);
                    if (key === 'Dragons' && values[key] && collection(fresh.document, key).some(function (dragon) {
                        return dragon.Name !== name && dragon.Order === values[key].Order;
                    })) throw new Error('Dragons: that order was assigned to another dragon. Reload before saving.');
                    if (!equal(before, current)) {
                        if (equal(current, values[key])) { snapshots[key] = fresh; return; }
                        throw new Error(key + ': this dragon changed on the wiki. Reload before saving.');
                    }
                    plans.push({ key: key, snapshot: fresh, document: update(fresh.document, key, name, values[key]) });
                });
            });
        }, Promise.resolve()).then(function () {
            return plans.reduce(function (chain, plan) {
                return chain.then(function () {
                    if (progress) progress('Saving ' + plan.key + '…');
                    return apiCall(api, 'edit', { action: 'edit', title: plan.snapshot.title,
                        text: JSON.stringify(plan.document, null, '\t'), summary: 'Update ' + name + ' dragon data (' + plan.key + ')',
                        baserevid: plan.snapshot.revision, starttimestamp: plan.snapshot.start,
                        assert: 'user', assertuser: user, nocreate: 1, formatversion: 2 }).then(function (response) {
                        if (!response.edit || response.edit.result !== 'Success') throw new Error(plan.key + ': edit was not accepted');
                        snapshots[plan.key] = Object.assign({}, plan.snapshot, { document: plan.document,
                            revision: response.edit.newrevid || plan.snapshot.revision });
                        saved.push(plan.key);
                    });
                });
            }, Promise.resolve());
        }).then(function () { return saved; }).catch(function (error) { error.saved = saved; throw error; });
    }
    function imageTitle(name) {
        if (typeof name !== 'string') throw new Error('Invalid image filename');
        name = name.replace(/^(?:File|Image):/i, '').replace(/_/g, ' ').trim();
        if (!name || /[\\/:*?"<>|#{}\[\]\r\n]/.test(name) || !/\.(png|gif|jpe?g|webp|svg|tiff?|bmp)$/i.test(name)) {
            throw new Error('Invalid image filename: ' + name);
        }
        return 'File:' + name.charAt(0).toUpperCase() + name.slice(1);
    }
    function galleryTemplates(content) {
        // Ignore examples in comments/nowiki/pre/source. Keep offsets so each
        // returned invocation is the unmodified original wikitext.
        var searchable = content.replace(/<!--[\s\S]*?(?:-->|$)|<(nowiki|pre|source|syntaxhighlight)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,
            function (text) { return new Array(text.length + 1).join(' '); });
        var pattern = /{{\s*(?:Template\s*:\s*)?DragonGallery\s*(?=[|}])/gi;
        var result = [], match;
        while ((match = pattern.exec(searchable))) {
            var stack = [], cursor = match.index, end = -1;
            while (cursor < searchable.length) {
                var pair = searchable.slice(cursor, cursor + 2);
                var triple = searchable.slice(cursor, cursor + 3);
                if (triple === '{{{') { stack.push(3); cursor += 3; }
                else if (pair === '{{') { stack.push(2); cursor += 2; }
                else if (pair === '}}' && stack.length) {
                    var size = stack[stack.length - 1];
                    if (size === 3 && triple !== '}}}') { cursor++; continue; }
                    stack.pop(); cursor += size;
                    if (!stack.length) { end = cursor; break; }
                } else cursor++;
            }
            if (end < 0) throw new Error('Unclosed DragonGallery template in dragon page');
            result.push(content.slice(match.index, end)); pattern.lastIndex = end;
        }
        return result;
    }
    function tagImagePages(api, filenames, user, progress, refreshExisting, options) {
        options = options || {};
        var pause = options.wait || function (milliseconds) { return new Promise(function (resolve) { setTimeout(resolve, milliseconds); }); };
        var writesStarted = 0;
        var titles = filenames.map(imageTitle).filter(function (title, index, all) { return all.indexOf(title) === index; });
        var stats = { updated: 0, skipped: 0, total: titles.length };
        if (refreshExisting) stats.refreshed = 0;
        var seen = Object.create(null);
        var refreshed = Object.create(null);
        var batches = [];
        function requestWithCooldown(method, parameters, attempt) {
            return apiCall(api, method, parameters).catch(function (error) {
                if (error.code !== 'ratelimited' || attempt >= 3) throw error;
                var seconds = 60 * Math.pow(2, attempt);
                stats.waitSeconds = seconds;
                if (progress) progress(stats, parameters.title);
                return pause(seconds * 1000).then(function () {
                    delete stats.waitSeconds;
                    return requestWithCooldown(method, parameters, attempt + 1);
                });
            });
        }
        for (var offset = 0; offset < titles.length; offset += 50) batches.push(titles.slice(offset, offset + 50));
        return batches.reduce(function (chain, batch) {
            return chain.then(function () {
                return apiCall(api, 'get', { action: 'query', titles: batch.join('|'), prop: 'revisions', redirects: 1,
                    rvprop: 'content|ids', rvslots: 'main', curtimestamp: 1, formatversion: 2 });
            }).then(function (response) {
                var pages = response.query && response.query.pages;
                if (!Array.isArray(pages) || !pages.length) throw new Error('Image description pages could not be read');
                return pages.reduce(function (chain, page) {
                    return chain.then(function () {
                        if (page.ns !== 6 || !/^File:/i.test(page.title) || page.invalid) throw new Error('Image redirect did not resolve to a File page');
                        if (seen[page.title]) return;
                        seen[page.title] = true;
                        var revision = page.revisions && page.revisions[0];
                        if (!page.missing && (!revision || !revision.slots || !revision.slots.main || typeof revision.slots.main.content !== 'string')) {
                            throw new Error(page.title + ': description is not readable');
                        }
                        var text = revision ? revision.slots.main.content : '';
                        var active = text.replace(/<!--[\s\S]*?-->|<(nowiki|pre|source|syntaxhighlight)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
                        if (/<!--|<(?:nowiki|pre|source|syntaxhighlight)\b[^>]*>/i.test(active)) throw new Error(page.title + ': unclosed comment or literal block; append would not categorize the image');
                        if (/{{\s*(?:Template\s*:\s*)?AutoCategorizeImage\s*(?=[|}])/i.test(active)) {
                            stats.skipped++; if (progress) progress(stats); return;
                        }
                        if (progress) progress(stats, page.title);
                        var parameters = { action: 'edit', title: page.title, appendtext: '\n{{AutoCategorizeImage}}\n',
                            summary: 'Automatically categorize dragon image', assert: 'user', assertuser: user,
                            starttimestamp: response.curtimestamp, maxlag: 5, bot: 1, formatversion: 2 };
                        if (page.missing) parameters.createonly = 1;
                        else { parameters.nocreate = 1; parameters.baserevid = revision.revid; }
                        var paced = writesStarted++ && options.intervalMs ? pause(options.intervalMs) : Promise.resolve();
                        return paced.then(function () { return requestWithCooldown('edit', parameters, 0); }).then(function (result) {
                            if (!result.edit || result.edit.result !== 'Success') throw new Error(page.title + ': template edit was not accepted');
                            stats.updated++; if (progress) progress(stats);
                        });
                    });
                }, Promise.resolve()).then(function () {
                    if (!refreshExisting) return;
                    var refreshTitles = pages.map(function (page) { return page.title; }).filter(function (title, index, all) { return !refreshed[title] && all.indexOf(title) === index; });
                    if (!refreshTitles.length) return;
                    return requestWithCooldown('post', { action: 'purge', titles: refreshTitles.join('|'), forcelinkupdate: 1,
                        assert: 'user', assertuser: user, formatversion: 2 }, 0).then(function (result) {
                        if (!Array.isArray(result.purge) || result.purge.length !== refreshTitles.length || result.purge.some(function (page) { return !page.purged || !page.linkupdate || page.missing || page.invalid; })) {
                            throw new Error('Image category links could not be refreshed');
                        }
                        refreshTitles.forEach(function (title) { refreshed[title] = true; });
                        stats.refreshed += refreshTitles.length;
                        if (progress) progress(stats);
                    });
                });
            });
        }, Promise.resolve()).then(function () { return stats; }).catch(function (error) { error.images = stats; throw error; });
    }
    var core = { keys: keys, clone: clone, equal: equal, collection: collection, record: record, update: update,
        durationMilliseconds: durationMilliseconds, formatDuration: formatDuration, dateInput: dateInput,
        releaseDate: releaseDate, load: load, save: save, imageTitle: imageTitle, galleryTemplates: galleryTemplates, tagImagePages: tagImagePages };
    if (typeof module === 'object' && module.exports) module.exports = core;
    if (!root.document || !root.jQuery || !root.mediaWiki) return;
    if (root.dvDragonEditorLoaded) return;
    root.dvDragonEditorLoaded = true;
    var $ = root.jQuery;
    var mw = root.mediaWiki;
    var initializing = new WeakSet();
    var api;
    function actionButton(id, label, type, primary) {
        if (root.OO && root.OO.ui && root.OO.ui.ButtonInputWidget) {
            return new root.OO.ui.ButtonInputWidget({ id: id, label: label, type: type,
                flags: primary ? ['primary', 'progressive'] : [] }).$element;
        }
        return $('<button>', { id: id, type: type, 'class': 'wds-button' }).text(label);
    }
    function initializeParentSelects($form) {
        function initialize() {
            if (!$.fn.select2 || !document.documentElement.contains($form[0])) return;
            $form.find('select.dragon-parent-select').each(function () {
                if (!$(this).hasClass('select2-hidden-accessible')) $(this).select2({
                    width: '100%', placeholder: $(this).attr('data-placeholder') || 'Select Parent(s)', allowClear: true,
                    dropdownParent: $(this).closest('.field')
                });
            });
        }
        initialize();
        if (root.dvSelect2Ready) Promise.resolve(root.dvSelect2Ready).then(initialize)
            .catch(function (error) { console.warn('Dragon editor: parent search unavailable', error); });
    }
    var formIcons = Object.create(null);
    function loadFormIcons($form) {
        var $slots = $form.find('.dragon-option-icon');
        var requests = [];
        var seen = Object.create(null);
        $slots.each(function () {
            var kind = $(this).attr('data-icon-kind');
            var name = $(this).attr('data-icon-name');
            var key = kind + ':' + name;
            if ((kind === 'icon' || kind === 'trait') && /^[A-Za-z][A-Za-z0-9 '-]*$/.test(name) && !seen[key] && !formIcons[key]) {
                seen[key] = true; requests.push({ kind: kind, name: name, key: key });
            }
        });
        function apply() {
            $slots.each(function () {
                var icon = formIcons[$(this).attr('data-icon-kind') + ':' + $(this).attr('data-icon-name')];
                if (icon) $(this).empty().append($('<img>', { src: icon.src, srcset: icon.srcset,
                    width: 24, height: 24, alt: '', 'aria-hidden': 'true' }));
            });
        }
        apply();
        if (!requests.length) return Promise.resolve();
        // Use the wiki's own filenames and rendering rules, rather than guessing
        // CDN URLs. Numeric wrappers keep missing files from shifting the icons.
        var text = requests.map(function (request, index) {
            return '<span data-dragon-icon-index="' + index + '">{{#invoke:DvWiki|Show|type=' + request.kind +
                '|size=24px|1=' + request.name + '}}</span>';
        }).join('\n');
        return apiCall(api, 'post', { action: 'parse', contentmodel: 'wikitext', text: text,
            prop: 'text', disablelimitreport: 1, formatversion: 2 }).then(function (result) {
            if (!result.parse || typeof result.parse.text !== 'string') throw new Error('No icon markup returned');
            var $parsed = $('<div>').append($.parseHTML(result.parse.text, document, false));
            requests.forEach(function (request, index) {
                var $image = $parsed.find('[data-dragon-icon-index="' + index + '"] img').first();
                var src = $image.attr('data-src') || $image.attr('src');
                if (src) formIcons[request.key] = { src: src, srcset: $image.attr('data-srcset') || $image.attr('srcset') };
            });
            apply();
        }).catch(function (error) { console.warn('Dragon editor: unable to load option icons', error); });
    }
    function groupOptions(groups, selected) {
        return (selected || Object.keys(groups)).reduce(function (result, key) {
            return result.concat(Array.isArray(groups[key]) ? groups[key] : []);
        }, []).filter(function (value, index, all) { return all.indexOf(value) === index; });
    }
    function choices(value, game) {
        if (object(value)) value = own(value, 'Available') ? value.Available : value.Default;
        if (value === 'All') return game.elements.primary.slice();
        return Array.isArray(value) ? value.slice() : value ? [value] : [];
    }
    function createField(section, key, definition, existing, game, dragons, preserveAbsent, settings) {
        var field = typeof definition === 'string' ? { type: definition } : clone(definition || {});
        if (section === 'Dragons' && ['Name', 'Order', 'ReleaseDate', 'Rarity', 'Elements'].indexOf(key) !== -1) field.required = true;
        if (section === 'Dragons' && key === 'Order') { field.min = 1; field.step = 1; }
        var type = field.type || 'text';
        if (['text', 'number', 'textarea', 'date', 'time', 'park-level', 'elements', 'duration', 'rates', 'currency', 'rarity', 'weather', 'dropdown', 'dragon-select', 'checkbox', 'toggle'].indexOf(type) === -1) throw new Error('Unsupported field type: ' + type);
        var value = existing !== undefined ? clone(existing) : field.default;
        var id = section + '-' + key;
        var protectedField = section === 'Dragons' && ['Name', 'Order', 'ReleaseDate', 'Rarity', 'Elements', 'BreedingTime'].indexOf(key) !== -1;
        if (protectedField && (field.showWhen || field.disableWhen)) throw new Error('Core dragon fields cannot be conditionally hidden or disabled');
        var $row = $('<div>', { 'class': 'field' });
        var labelText = (field.name || key) + (type === 'checkbox' || type === 'toggle' ? '' : ':');
        var $label = $('<label>', { 'for': id }).text(labelText + (field.required ? ' *' : ''));
        if (field.width !== undefined) {
            if (['full', 'half', 'third', 'quarter'].indexOf(field.width) === -1) throw new Error('Invalid field width: ' + id);
            $row.addClass('dragon-field-' + field.width);
        }
        if (field.tip) $label.attr('title', field.tip);
        $row.append($label);
        if (field.note) $row.append($('<small>').text(field.note));
        var $input;
        var read;
        if (type === 'elements') {
            var selected = choices(value, game);
            var $toggleAll;
            var options = groupOptions(game.elements, field.options && field.options.length ? field.options : null);
            $input = $('<div>', { id: id, 'class': 'dragon-element-options' });
            if (field.radio) $input.append($('<label>', { 'class': 'checkbox-container' }).append($('<input>', { type: 'radio', name: id,
                value: '', checked: !selected.length }).on('change', function () { selected = []; }),
                $('<span>', { 'class': 'radio-checkmark', 'aria-hidden': 'true' }),
                $('<span>', { 'class': 'checkmark-text' }).text(message(settings, 'none', 'None'))));
            options.concat(selected).filter(function (item, index, all) { return all.indexOf(item) === index; }).forEach(function (option, index) {
                var $option = $('<input>', { type: field.radio ? 'radio' : 'checkbox', name: id,
                    value: option, id: id + '-' + index, checked: selected.indexOf(option) !== -1 });
                $option.on('change', function () {
                    if (field.radio) selected = this.checked ? [option] : [];
                    else if (this.checked) { if (selected.indexOf(option) === -1) selected.push(option); }
                    else selected = selected.filter(function (item) { return item !== option; });
                    showOrder();
                });
                var iconKind = field.imageType === 'trait' || /traits|alignment/i.test(key) ? 'trait' : 'icon';
                $input.append($('<label>', { 'for': id + '-' + index, 'class': 'checkbox-container' }).append($option,
                    $('<span>', { 'class': field.radio ? 'radio-checkmark' : 'checkmark', 'aria-hidden': 'true' }),
                    $('<span>', { 'class': 'dragon-option-icon', 'data-icon-kind': iconKind,
                        'data-icon-name': option, 'aria-hidden': 'true' }),
                    $('<span>', { 'class': 'checkmark-text' }).text(option)));
            });
            if (field.includeAll && !field.radio) {
                $toggleAll = $('<input>', { type: 'checkbox', 'class': 'toggle-all', 'aria-label': 'Select all ' + (field.name || key) })
                    .on('change', function () {
                        selected = this.checked ? options.slice() : [];
                        $input.find('input').not($toggleAll).prop('checked', this.checked);
                        showOrder(); $input.trigger('change');
                    });
                $input.prepend($('<label>', { 'class': 'checkbox-container' }).append($toggleAll,
                    $('<span>', { 'class': 'checkmark', 'aria-hidden': 'true' }),
                    $('<span>', { 'class': 'checkmark-text' }).text(message(settings, 'all', 'All'))), $('<br>'));
            }
            var $actions = $('<div>', { 'class': 'dragon-choice-actions' }).appendTo($input);
            $actions.append(actionButton(undefined, message(settings, 'clear', 'Clear'), 'button').on('click', function () {
                selected = []; $input.find('input').prop('checked', false); showOrder(); $input.trigger('change');
            }));
            var $order = $('<small>').appendTo($actions);
            function showOrder() {
                $order.text(field.preserveOrder ? message(settings, 'elementOrder', 'Order: {elements}. Reselect to reorder.', { elements: selected.join(', ') }) : '');
                if ($toggleAll) {
                    var count = options.filter(function (option) { return selected.indexOf(option) !== -1; }).length;
                    $toggleAll.prop('checked', count === options.length && count > 0).prop('indeterminate', count > 0 && count < options.length);
                }
            }
            showOrder();
            read = function () {
                if (field.required && !selected.length) throw new Error(key + ' is required');
                if (key === 'Traits') {
                    if (equal(choices(value, game), selected)) return clone(value);
                    if (!selected.length) return undefined;
                    return selected.length === 1 ? { Default: selected[0] } :
                        { Available: selected.length === game.elements.primary.length ? 'All' : selected.slice() };
                }
                return selected.length ? (field.radio ? selected[0] : selected.slice()) : undefined;
            };
        } else if (type === 'duration') {
            $input = $('<div>', { id: id, 'class': 'duration-container' });
            var $instant = $('<input>', { type: 'checkbox', checked: /^instant$/i.test(String(value)) });
            $input.append($('<label>').append($instant, ' ' + message(settings, 'instant', 'Instant')));
            var remaining = durationMilliseconds(value);
            var formats = field.format || Object.keys(units);
            if (!Array.isArray(formats) || !formats.length || formats.some(function (unit, index) { return !own(units, unit) || formats.indexOf(unit) !== index; })) throw new Error('Invalid duration format: ' + id);
            formats = formats.slice();
            var smallest = Math.min.apply(null, formats.map(function (unit) { return units[unit]; }));
            if (remaining % smallest) formats = Object.keys(units);
            formats.sort(function (a, b) { return units[b] - units[a]; });
            formats.forEach(function (unit) {
                var amount = Math.floor(remaining / units[unit]); remaining %= units[unit];
                $input.append($('<label>', { 'class': 'duration-field' }).append($('<span>', { 'class': 'duration-label' }).text(unit), $('<input>', { type: 'number', min: 0, step: 1,
                    'data-unit': unit, 'aria-label': key + ' ' + unit, value: amount || '' })));
            });
            $input.append($('<div>', { 'class': 'dragon-choice-actions' }).append(actionButton(undefined, message(settings, 'clear', 'Clear'), 'button').on('click', function () {
                $input.find('input[type="number"]').val(''); $instant.prop('checked', false); $input.trigger('change');
            })));
            read = function () {
                if ($instant.prop('checked')) return 'Instant';
                var parts = {};
                $input.find('input[data-unit]').each(function () { parts[$(this).attr('data-unit')] = $(this).val(); });
                var result = formatDuration(parts);
                if (field.required && !result) throw new Error(key + ' is required');
                return result || undefined;
            };
        } else if (type === 'rates') {
            $input = $('<div>', { id: id, 'class': 'dragon-rate-options' });
            var rates = Array.isArray(value) ? value : [];
            for (var level = 0; level < Math.max(game.maxDragonLevel || 21, rates.length); level++) {
                $input.append($('<label>').text(message(settings, 'level', 'Level {level}', { level: level + 1 }) + ' ').append($('<input>', {
                    type: 'number', min: 0, step: 'any', 'aria-label': 'Level ' + (level + 1) + ' earning rate',
                    value: rates[level] !== undefined ? rates[level] : '' })));
            }
            read = function () {
                var result = $input.find('input').map(function () { return this.value; }).get();
                while (result.length && result[result.length - 1] === '') result.pop();
                if (result.some(function (item) { return item === '' || !Number.isFinite(Number(item)) || Number(item) < 0; })) {
                    throw new Error('Earning rates must be nonnegative numbers with no gaps between levels');
                }
                return result.length ? result.map(Number) : undefined;
            };
        } else if (['currency', 'rarity', 'weather', 'dropdown', 'dragon-select'].indexOf(type) !== -1) {
            var options = type === 'currency' ? groupOptions(game.currencies, field.options && field.options.length ? field.options : null) :
                type === 'rarity' ? game.rarities : type === 'weather' ? game.weather :
                    type === 'dragon-select' ? dragons.map(function (dragon) { return dragon.Name; }).sort() : field.options || [];
            var selected = Array.isArray(value) ? value : value !== undefined ? [value] : [];
            $input = $('<select>', { id: id, multiple: type === 'dragon-select', required: !!field.required });
            if (type === 'dragon-select') $input.addClass('dragon-parent-select');
            if (type !== 'dragon-select') $input.append($('<option>', { value: '' }).text(message(settings, 'none', 'None')));
            options.concat(selected).filter(function (item, index, all) { return all.indexOf(item) === index; }).forEach(function (option) {
                $input.append($('<option>', { value: option, selected: selected.indexOf(option) !== -1 }).text(option));
            });
            read = function () {
                var result = $input.val();
                if (field.maxSelect && result && result.length > field.maxSelect) throw new Error(key + ': choose at most ' + field.maxSelect);
                return result && result.length ? result : undefined;
            };
        } else if (type === 'checkbox' || type === 'toggle') {
            $row.addClass(type === 'toggle' ? 'wds-toggle' : 'wds-checkbox');
            $label.addClass(type === 'toggle' ? 'wds-toggle__label' : 'wds-checkbox__label');
            $input = $('<input>', { id: id, type: 'checkbox', 'class': type === 'toggle' ? 'wds-toggle__input' : 'wds-checkbox__input', checked: value === true });
            read = function () {
                if (field.required && !$input.prop('checked')) throw new Error(key + ' is required');
                return $input.prop('checked') || (value === false ? false : undefined);
            };
        } else {
            $input = type === 'textarea' ? $('<textarea>', { id: id }) : $('<input>', {
                id: id, type: type === 'park-level' ? 'number' : ['number', 'date', 'time'].indexOf(type) !== -1 ? type : 'text' });
            $input.prop('required', !!field.required);
            if (type === 'number' || type === 'park-level') $input.attr({ min: type === 'park-level' ? 1 : field.min,
                max: type === 'park-level' ? game.park.maxLevel : field.max, step: field.step || 'any' });
            $input.val(type === 'date' ? dateInput(value) : key === 'Tags' && Array.isArray(value) ? value.join(', ') : value === undefined ? '' : value);
            read = function () {
                var result = $input.val();
                if (field.required && !result.trim()) throw new Error(key + ' is required');
                if (result === '') return undefined;
                if (type === 'number' || type === 'park-level') {
                    var number = Number(result);
                    if (!Number.isFinite(number) || (field.min !== undefined && number < field.min) ||
                        (field.max !== undefined && number > field.max)) throw new Error(key + ': invalid number');
                    return number;
                }
                if (key === 'Tags') return result.split(',').map(function (tag) { return tag.trim(); }).filter(Boolean);
                return result;
            };
        }
        if (field.placeholder) $input.attr({ placeholder: field.placeholder, 'data-placeholder': field.placeholder });
        if (type === 'textarea' && field.rows !== undefined) {
            if (!Number.isSafeInteger(field.rows) || field.rows < 2 || field.rows > 30) throw new Error('Textarea rows must be between 2 and 30');
            $input.attr('rows', field.rows).addClass('dragon-configured-rows');
        }
        if (type === 'checkbox' || type === 'toggle') $row.prepend($input); else $row.append($input);
        if (field.validationMessage) $row.find('input, select, textarea').on('invalid', function () {
            this.setCustomValidity(field.validationMessage);
        }).on('input change', function () { this.setCustomValidity(''); });
        var initial;
        try { initial = clone(read()); } catch (_) { initial = undefined; }
        $input.attr('aria-required', field.required ? 'true' : null);
        $input.attr('name', key);
        var baseRequired = !!field.required;
        return { element: $row, advanced: field.advanced, definition: field, inactive: false,
            value: function () {
                if (type === 'checkbox' || type === 'toggle') return !!$input.prop('checked');
                if (type === 'elements') return field.radio ? selected[0] : selected.slice();
                var required = field.required; field.required = false;
                try { return clone(read()); } catch (_) { return undefined; } finally { field.required = required; }
            },
            require: function (required) {
                field.required = baseRequired || required;
                if (field.validationMessage) $row.find('input, select, textarea').each(function () { this.setCustomValidity(''); });
                $label.text(labelText + (field.required ? ' *' : ''));
                $input.attr('aria-required', field.required ? 'true' : null);
                if ($input.is('input, select, textarea')) $input.prop('required', !!field.required);
            }, read: function () {
                try {
                    var result = read();
                    return equal(result, initial) && (existing !== undefined || preserveAbsent) ? clone(existing) : result;
                } catch (error) {
                    if (field.validationMessage) error.message = field.validationMessage;
                    error.field = $row;
                    throw error;
                }
        } };
    }
    // Configuration contains data only: no expressions, scripts, HTML or remote code URLs.
    function editorSettings(config) {
        var settings = config._editor || {};
        if (!object(settings) || (settings.version !== undefined && settings.version !== 1)) throw new Error('Unsupported editor configuration version');
        var tabs = settings.tabs || {};
        if (!object(tabs)) throw new Error('Editor tabs must be an object');
        var order = tabs.order === undefined ? keys.slice() : tabs.order;
        var hidden = tabs.hidden || [];
        function sectionList(list, label) {
            if (!Array.isArray(list) || list.some(function (key, index) { return keys.indexOf(key) === -1 || list.indexOf(key) !== index; })) {
                throw new Error('Invalid ' + label + ' in editor configuration');
            }
        }
        sectionList(order, 'tab order'); sectionList(hidden, 'hidden tabs');
        if (hidden.indexOf('Dragons') !== -1) throw new Error('The Dragon tab cannot be hidden');
        var visible = order.concat(keys.filter(function (key) { return order.indexOf(key) === -1; }))
            .filter(function (key) { return hidden.indexOf(key) === -1; });
        var messages = settings.messages || {};
        if (!object(messages) || Object.keys(messages).some(function (key) { return typeof messages[key] !== 'string'; })) {
            throw new Error('Editor messages must be text');
        }
        var preview = settings.preview || {};
        if (!object(preview) || (preview.showData !== undefined && typeof preview.showData !== 'boolean')) throw new Error('Invalid preview configuration');
        var previewKinds = ['purchase', 'breeding', 'requiredCombos', 'sandbox', 'rates', 'names'];
        if (preview.sections !== undefined && (!Array.isArray(preview.sections) || preview.sections.some(function (key, index, list) {
            return previewKinds.indexOf(key) === -1 || list.indexOf(key) !== index;
        }))) throw new Error('Invalid preview section list');
        var images = settings.imageCategorization || {};
        if (!object(images) || ['onCreate', 'onSave', 'showButton'].some(function (name) { return images[name] !== undefined && typeof images[name] !== 'boolean'; }) ||
            (images.maxFiles !== undefined && (!Number.isSafeInteger(images.maxFiles) || images.maxFiles < 1 || images.maxFiles > 5000)) ||
            (images.editIntervalMs !== undefined && (!Number.isSafeInteger(images.editIntervalMs) || images.editIntervalMs < 1000 || images.editIntervalMs > 60000))) throw new Error('Invalid image categorization settings');
        var initial = tabs.initial || 'Dragons';
        if (visible.indexOf(initial) === -1) throw new Error('Initial tab must be visible');
        return { tabs: visible, initial: initial, hidden: hidden, messages: messages, preview: preview, images: images };
    }
    function message(settings, key, fallback, values) {
        var text = own(settings.messages, key) ? settings.messages[key] : fallback;
        return text.replace(/\{(\w+)\}/g, function (match, name) { return values && own(values, name) ? String(values[name]) : match; });
    }
    function validateCondition(rule, sections, depth) {
        if (!object(rule) || depth > 8) throw new Error('Invalid field condition');
        var names = Object.keys(rule);
        if (names.length === 1 && (own(rule, 'all') || own(rule, 'any'))) {
            var children = rule.all || rule.any;
            if (!Array.isArray(children) || !children.length || children.length > 20) throw new Error('Invalid condition group');
            children.forEach(function (child) { validateCondition(child, sections, depth + 1); });
            return;
        }
        var reference = typeof rule.field === 'string' ? rule.field.split('.') : [];
        var operators = ['equals', 'notEquals', 'includes', 'empty'];
        if (reference.length !== 2 || !own(sections, reference[0]) || !own(sections[reference[0]].fields, reference[1]) ||
            names.length !== 2 || !operators.some(function (operator) { return own(rule, operator); })) throw new Error('Invalid condition field or operator');
        var operand = rule[names[0] === 'field' ? names[1] : names[0]];
        if (operand !== null && ['string', 'number', 'boolean'].indexOf(typeof operand) === -1) throw new Error('Condition values must be scalar');
        if (own(rule, 'empty') && typeof rule.empty !== 'boolean') throw new Error('Condition empty must be boolean');
    }
    function matchesCondition(rule, sections) {
        if (rule.all) return rule.all.every(function (child) { return matchesCondition(child, sections); });
        if (rule.any) return rule.any.some(function (child) { return matchesCondition(child, sections); });
        var reference = rule.field.split('.');
        var value = sections[reference[0]].fields[reference[1]].value();
        if (own(rule, 'equals')) return equal(value, rule.equals);
        if (own(rule, 'notEquals')) return !equal(value, rule.notEquals);
        if (own(rule, 'includes')) return Array.isArray(value) && value.indexOf(rule.includes) !== -1;
        return (value === undefined || value === null || value === '' || (Array.isArray(value) && !value.length)) === rule.empty;
    }
    function loadDragonImageFiles(dragon, maximum) {
        var names, articleTitle;
        return apiCall(api, 'post', { action: 'parse', text: '{{#invoke:AutoCategorizeImage|manifest|data=' +
            encodeURIComponent(JSON.stringify(dragon)) + '}}', title: dragon.Name + ' Dragon',
            contentmodel: 'wikitext', prop: 'text', formatversion: 2 }).then(function (result) {
                var $rendered = $('<div>').html(result.parse && result.parse.text || '');
                var $manifest = $rendered.find('pre.dragon-image-manifest');
                if ($manifest.length !== 1) {
                    var detail = $rendered.find('.scribunto-error, .error').first().text().trim();
                    throw new Error('The dragon image manifest could not be rendered. ' +
                        (detail || 'Check Module:AutoCategorizeImage.'));
                }
                var manifest = JSON.parse($manifest.text());
                if (!manifest || !Array.isArray(manifest.files) || !manifest.files.length) throw new Error('The dragon image manifest is empty');
                names = manifest.files.map(function (file) { return file.name; });
                articleTitle = manifest.page === undefined ? dragon.Name + ' Dragon' : manifest.page;
                if (typeof articleTitle !== 'string' || !articleTitle.trim()) throw new Error('Invalid dragon image manifest page title');
                return apiCall(api, 'get', { action: 'query', titles: articleTitle, prop: 'revisions',
                    rvprop: 'content', rvslots: 'main', redirects: 1, formatversion: 2 });
            }).then(function (result) {
                var page = result.query.pages[0];
                if (page.missing) return;
                var revision = page.revisions && page.revisions[0];
                if (!revision || typeof revision.slots.main.content !== 'string') throw new Error('Dragon gallery source is not readable');
                return galleryTemplates(revision.slots.main.content).reduce(function (chain, gallery) {
                    var explicit = /(?:^|[\r\n]|{{\s*(?:Template\s*:\s*)?DragonGallery\s*\|)\s*(?:1\s*=\s*)?(?:File:|Image:)?([^{}\r\n|]+\.(?:png|gif|jpe?g|webp|svg|tiff?|bmp))(?=\s*(?:{{!}}|\||$))/gi;
                    var image;
                    while ((image = explicit.exec(gallery))) names.push(image[1].trim());
                    return chain.then(function () {
                        return apiCall(api, 'post', { action: 'parse', text: gallery, title: articleTitle,
                            contentmodel: 'wikitext', prop: 'images', formatversion: 2 });
                    }).then(function (response) {
                        if (!response.parse || !Array.isArray(response.parse.images)) throw new Error('DragonGallery images could not be read');
                        names = names.concat(response.parse.images);
                    });
                }, Promise.resolve());
            }).then(function () {
                var titles = names.map(imageTitle).filter(function (title, index, all) { return all.indexOf(title) === index; });
                if (titles.length > maximum) throw new Error('Image manifest has ' + titles.length + ' files; the configured limit is ' + maximum);
                return titles;
            });
    }
    function initializePicker(container) {
        if (initializing.has(container)) return;
        initializing.add(container);
        var $container = $(container);
        var $status = $('<p>', { role: 'status', 'aria-live': 'polite' }).text('Loading dragons…');
        $container.empty().append($status);
        return Promise.resolve().then(function () {
            if (!mw.config.get('wgUserName')) throw new Error('Sign in to edit dragon data.');
            return load(api, 'Data:Dragons.json');
        }).then(function (snapshot) {
            if (!document.documentElement.contains(container)) return;
            var dragons = collection(snapshot.document, 'Dragons');
            if (!Array.isArray(dragons)) throw new Error('Dragons must be an array');
            var names = dragons.map(function (dragon) { return dragon.Name; }).filter(function (name) {
                return typeof name === 'string' && name.length > 0;
            }).sort(function (a, b) { return a.localeCompare(b); });
            var $picker = $('<section>', { 'class': 'dragon-picker', 'aria-labelledby': 'dragon-picker-heading' });
            var $search = $('<input>', { id: 'dragon-picker-search', type: 'text', list: 'dragon-picker-options',
                autocomplete: 'off', placeholder: 'Start typing a dragon name' });
            var $options = $('<datalist>', { id: 'dragon-picker-options' });
            names.forEach(function (name) { $options.append($('<option>', { value: name })); });
            var $edit = $('<a>', { id: 'dragon-picker-edit', 'class': 'dragon-picker-button', 'aria-disabled': 'true' }).text('Edit dragon');
            function selectDragon() {
                var query = $search.val().trim().toLowerCase();
                var selected = names.filter(function (name) { return name.toLowerCase() === query; })[0];
                if (selected) {
                    $edit.attr({ href: mw.util.getUrl(selected + ' Dragon/Edit'), 'aria-disabled': 'false' });
                    $status.text('Ready to edit ' + selected + '.');
                } else {
                    $edit.removeAttr('href').attr('aria-disabled', 'true');
                    $status.text(query ? 'Choose an existing dragon from the suggestions, or create a new dragon.' :
                        names.length + ' dragons available. Select a dragon to edit or create a new one.');
                }
            }
            $search.on('input change', selectDragon);
            var $create = $('<button>', { id: 'dragon-picker-new', type: 'button' }).text('Create new dragon').on('click', function () {
                var $editor = $('<div>', { id: 'dragon-form-container' });
                $container.empty().append($editor);
                initialize($editor[0]);
            });
            $picker.append($('<h2>', { id: 'dragon-picker-heading' }).text('Dragon editor'),
                $('<p>').text('Select a dragon to edit or create a new one.'),
                $('<label>', { 'for': 'dragon-picker-search' }).text('Select a dragon'), $search, $options,
                $('<div>', { 'class': 'dragon-picker-actions' }).append($edit, $create),
                $('<p>', { 'class': 'dragon-picker-source' }).append(
                    $('<a>', { href: mw.util.getUrl('Data:Dragons.json', { action: 'raw' }) }).text('View raw JSON'), ' · ',
                    $('<a>', { href: mw.util.getUrl('Data:Dragons.json', { action: 'edit' }) }).text('Edit JSON source')));
            $container.append($picker);
            selectDragon();
        }).catch(function (error) {
            if (!document.documentElement.contains(container)) return;
            $status.text('Unable to load the dragon picker: ' + error.message);
            $container.append($('<button>', { type: 'button' }).text('Retry').on('click', function () {
                initializing.delete(container); initializePicker(container);
            }));
        });
    }
    function initialize(container) {
        if (initializing.has(container)) return;
        initializing.add(container);
        var $container = $(container);
        var $status = $('<p>', { role: 'status', 'aria-live': 'polite' }).text('Loading dragon data…');
        $container.empty().append($status);
        var user = mw.config.get('wgUserName');
        return Promise.resolve().then(function () {
            if (!user) throw new Error('Sign in to edit dragon data.');
            return Promise.all([load(api, 'Data:NewDragonConfig.json'), load(api, 'Data:Game.json')].concat(
                keys.map(function (key) { return load(api, 'Data:' + key + '.json'); })));
        }).then(function (sources) {
            if (!document.documentElement.contains(container)) return;
            var config = sources[0].document;
            var settings = editorSettings(config);
            var tabKeys = settings.tabs;
            var game = sources[1].document;
            var snapshots = {};
            keys.forEach(function (key, index) { snapshots[key] = sources[index + 2]; });
            var pageName = $container.attr('data-page');
            var existingName = pageName ? pageName.replace(/_/g, ' ').replace(/ Dragon\/Edit$/, '').replace(/ Dragon$/, '') : null;
            var dragons = collection(snapshots.Dragons.document, 'Dragons');
            if (!Array.isArray(dragons)) throw new Error('Dragons must be an array');
            if (existingName && !record(snapshots.Dragons.document, 'Dragons', existingName)) throw new Error('Dragon not found: ' + existingName);
            var maxOrder = dragons.reduce(function (maximum, dragon) { return Math.max(maximum, Number(dragon.Order) || 0); }, 0);
            var $form = $('<form>', { id: 'dragon-form', 'class': 'data-form dragon-editor', novalidate: true });
            var $fieldset = $('<fieldset>').appendTo($form);
            var sections = {};
            var dirty = false;
            var busy = false;
            var previewSequence = 0;
            var imagesPending = !existingName && settings.images.onCreate === true;
            var $preview = $('<div>', { id: 'box-result', 'class': 'dragon-draft-preview', tabindex: '-1',
                role: 'region', 'aria-label': 'Dragon page preview' });
            $fieldset.append($('<legend>').text(existingName ? message(settings, 'editTitle', 'Edit {name} Dragon', { name: existingName }) : message(settings, 'newTitle', 'New dragon')));
            $fieldset.append($('<p>').text(message(settings, 'requiredNotice', 'Fields marked * are required.')));
            var $tabber = $('<div>', { 'class': 'tabber wds-tabber dragon-editor-tabber' }).appendTo($fieldset);
            var $tabs = $('<ul>', { 'class': 'wds-tabs', role: 'tablist', 'aria-label': message(settings, 'tabList', 'Dragon data') });
            var $tabNavigation = $('<div>', { 'class': 'dragon-tab-navigation' }).appendTo($tabber);
            var $previousTab = $('<button>', { type: 'button', 'class': 'dragon-tab-arrow',
                'aria-label': message(settings, 'previousTab', 'Previous editor tab'), title: message(settings, 'previousTab', 'Previous editor tab') }).text('\u2039').appendTo($tabNavigation);
            $tabNavigation.append($('<div>', { 'class': 'wds-tabs__wrapper with-bottom-border' }).append($tabs));
            var $nextTab = $('<button>', { type: 'button', 'class': 'dragon-tab-arrow',
                'aria-label': message(settings, 'nextTab', 'Next editor tab'), title: message(settings, 'nextTab', 'Next editor tab') }).text('\u203a').appendTo($tabNavigation);
            var activeSection = 'Dragons';
            function moveTab(offset) {
                var index = tabKeys.indexOf(activeSection) + offset;
                if (index >= 0 && index < tabKeys.length) activateSection(tabKeys[index], false);
            }
            $previousTab.on('click', function () { moveTab(-1); });
            $nextTab.on('click', function () { moveTab(1); });
            function activateSection(key, focus) {
                activeSection = key;
                Object.keys(sections).forEach(function (name) {
                    var active = name === key;
                    sections[name].tab.toggleClass('wds-is-current', active);
                    sections[name].link.attr({ 'aria-selected': active ? 'true' : 'false', tabindex: active ? '0' : '-1' });
                    sections[name].panel.toggleClass('wds-is-current', active).prop('hidden', !active);
                });
                $previousTab.prop('disabled', tabKeys.indexOf(key) === 0);
                $nextTab.prop('disabled', tabKeys.indexOf(key) === tabKeys.length - 1);
                if (focus) sections[key].link[0].focus();
                var strip = $tabs[0];
                var tabBounds = sections[key].tab[0].getBoundingClientRect();
                var stripBounds = strip.getBoundingClientRect();
                if (tabBounds.left < stripBounds.left) strip.scrollLeft -= stripBounds.left - tabBounds.left;
                else if (tabBounds.right > stripBounds.right) strip.scrollLeft += tabBounds.right - stripBounds.right;
            }
            tabKeys.concat(settings.hidden).forEach(function (key) {
                if (!object(config[key])) throw new Error('Missing form configuration for ' + key);
                var original = existingName ? record(snapshots[key].document, key, existingName) : undefined;
                var schema = clone(config[key]);
                var metadata = schema['*'] || {};
                var title = metadata.Title || key;
                var $tab = $('<li>', { 'class': 'wds-tabs__tab', 'data-hash': title, role: 'presentation' }).appendTo($tabs);
                var $link = $('<a>', { href: '#dragon-panel-' + key, id: 'dragon-tab-' + key, role: 'tab',
                    'aria-controls': 'dragon-panel-' + key }).text(title);
                $tab.append($('<div>', { 'class': 'wds-tabs__tab-label' }).append($link));
                $tab.on('click', function (event) {
                    event.preventDefault(); event.stopPropagation(); activateSection(key, false);
                });
                $link.on('keydown', function (event) {
                    var index = tabKeys.indexOf(key);
                    var next = event.key === 'ArrowRight' ? (index + 1) % tabKeys.length :
                        event.key === 'ArrowLeft' ? (index + tabKeys.length - 1) % tabKeys.length :
                        event.key === 'Home' ? 0 : event.key === 'End' ? tabKeys.length - 1 : -1;
                    if (next !== -1) { event.preventDefault(); activateSection(tabKeys[next], true); }
                });
                var $section = $('<div>', { id: 'dragon-panel-' + key, 'class': 'wds-tab__content sub-form',
                    role: 'tabpanel', 'aria-labelledby': 'dragon-tab-' + key, 'data-section': key, 'data-formid': key });
                var $enabled = $('<input>', { type: 'checkbox', checked: key === 'Dragons' || !!original,
                    disabled: key === 'Dragons', 'aria-label': 'Include ' + key });
                if (key !== 'Dragons') $section.append($('<label>').append($enabled, ' ' + message(settings, 'includeRecord', 'Include this record (uncheck to remove it)')));
                var $fields = $('<fieldset>', { 'class': 'form-fields' }).appendTo($section);
                var $advanced = $('<details>').append($('<summary>').text(message(settings, 'advanced', 'Advanced fields'))).appendTo($fields);
                var $advancedFields = $('<div>', { 'class': 'dragon-fields-layout' }).appendTo($advanced);
                var fields = {};
                var groups = {};
                (metadata.groups || []).forEach(function (group) {
                    if (!object(group) || typeof group.id !== 'string' || !/^[a-zA-Z][\w-]*$/.test(group.id) || own(groups, group.id)) throw new Error('Invalid field group');
                    var $group = $('<fieldset>', { 'class': 'dragon-field-group' });
                    $group.append($('<legend>').text(group.title || group.id));
                    if (group.description) $group.append($('<p>').text(group.description));
                    groups[group.id] = $group;
                    (group.advanced ? $advancedFields : $fields).append($group);
                });
                var fieldOrder = metadata.fieldOrder || [];
                if (!Array.isArray(fieldOrder) || fieldOrder.some(function (name, index) { return name === '*' || !own(schema, name) || fieldOrder.indexOf(name) !== index; })) throw new Error('Invalid field order in ' + key);
                fieldOrder.concat(Object.keys(schema).filter(function (name) { return fieldOrder.indexOf(name) === -1; })).forEach(function (fieldKey) {
                    if (fieldKey === '*' || (typeof schema[fieldKey] !== 'string' && !object(schema[fieldKey])) ||
                        (schema[fieldKey] && schema[fieldKey].hide)) return;
                    if (!/^[A-Za-z][A-Za-z0-9]*$/.test(fieldKey) || ['constructor', 'prototype'].indexOf(fieldKey) !== -1) throw new Error('Invalid field name: ' + fieldKey);
                    var value = original && own(original, fieldKey) ? original[fieldKey] : undefined;
                    if (key === 'Dragons' && fieldKey.indexOf('Pedestal') === 0 && original && original.Pedestal) value = original.Pedestal[fieldKey.slice(8)];
                    var definition = clone(schema[fieldKey]);
                    if (!existingName && key === 'Dragons' && fieldKey === 'Order') {
                        if (typeof definition === 'string') definition = { type: definition };
                        definition.default = maxOrder + 1;
                        value = maxOrder + 1;
                    }
                    var field = createField(key, fieldKey, definition, value, game, dragons, !!original, settings);
                    fields[fieldKey] = field;
                    if (field.definition.group && !own(groups, field.definition.group)) throw new Error('Unknown field group: ' + field.definition.group);
                    (field.definition.group ? groups[field.definition.group] : field.advanced ? $advancedFields : $fields).append(field.element);
                    if (key === 'Dragons' && fieldKey === 'Name' && existingName) field.element.find('input').prop('readOnly', true);
                });
                if ($advancedFields.children().length) $fields.append($advanced); else $advanced.remove();
                function enableSection() { $fields.prop('disabled', !$enabled.prop('checked') || settings.hidden.indexOf(key) !== -1); }
                $enabled.on('change', enableSection); enableSection();
                sections[key] = { fields: fields, enabled: $enabled, tab: $tab, link: $link, panel: $section };
                if (settings.hidden.indexOf(key) !== -1) { $tab.hide(); $section.prop('hidden', true); }
                $tabber.append($section);
            });
            activateSection(settings.initial, false);
            ['Name', 'Order', 'ReleaseDate', 'Rarity', 'Elements', 'BreedingTime'].forEach(function (name) {
                if (!sections.Dragons.fields[name]) throw new Error('Missing core dragon field: ' + name);
            });
            Object.keys(sections).forEach(function (key) {
                Object.keys(sections[key].fields).forEach(function (name) {
                    var field = sections[key].fields[name];
                    ['showWhen', 'disableWhen', 'requiredWhen'].forEach(function (kind) {
                        if (field.definition[kind] !== undefined) validateCondition(field.definition[kind], sections, 0);
                    });
                });
            });
            function updateConditions() {
                Object.keys(sections).forEach(function (key) {
                    Object.keys(sections[key].fields).forEach(function (name) {
                        var field = sections[key].fields[name];
                        var definition = field.definition;
                        var visible = !definition.showWhen || matchesCondition(definition.showWhen, sections);
                        field.inactive = !visible || !!(definition.disableWhen && matchesCondition(definition.disableWhen, sections));
                        field.element.prop('hidden', !visible);
                        if (definition.showWhen || definition.disableWhen) field.element.find('input, select, textarea, button').prop('disabled', field.inactive);
                        field.require(!!(definition.requiredWhen && matchesCondition(definition.requiredWhen, sections)));
                    });
                });
            }
            $form.on('input change', updateConditions);
            updateConditions();
            var priorInstant;
            var wasExclusive = false;
            var $breedingControls = sections.Dragons.fields.BreedingTime.element.find('input');
            var $riftNote = $('<small>').text(message(settings, 'riftInstantNote', 'Rift-exclusive dragons breed instantly.')).appendTo(sections.Dragons.fields.BreedingTime.element);
            function syncRiftTime() {
                var exclusive = sections.Dragons.fields.Elements.element.find('input[value="Rift"]').prop('checked') === true;
                var $instant = $breedingControls.filter('[type="checkbox"]');
                if (exclusive && !wasExclusive) { priorInstant = $instant.prop('checked'); $instant.prop('checked', true); }
                if (!exclusive && wasExclusive) $instant.prop('checked', priorInstant);
                $breedingControls.prop('disabled', exclusive);
                $riftNote.toggle(exclusive);
                wasExclusive = exclusive;
            }
            sections.Dragons.fields.Elements.element.on('change', syncRiftTime);
            syncRiftTime();
            var $buttons = $('<div>', { 'class': 'form-submit-container' }).appendTo($fieldset);
            var $previewButton = actionButton('dragonPreview', message(settings, 'preview', 'Preview'), 'button').appendTo($buttons);
            actionButton('dragonSave', message(settings, 'save', 'Save'), 'submit', true).appendTo($buttons);
            var $imageButton = actionButton('dragonUpdateImageCategories', message(settings, 'updateImageCategories', 'Update image categories'), 'button').insertBefore($previewButton);
            var $imageNote = $('<small>', { id: 'dragon-image-action-note', 'class': 'dragon-image-action-note' })
                .text(message(settings, 'imageActionNote', 'Image categories use saved dragon data; this does not save form edits.')).appendTo($buttons);
            $imageButton.find('button, input').addBack('button, input').attr('aria-describedby', 'dragon-image-action-note');
            var $imageStatus = $('<p>', { id: 'dragon-image-action-status', 'class': 'dragon-image-action-status',
                role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' }).hide().appendTo($buttons);
            function imageStatus(text, state) {
                $status.text(text);
                $imageStatus.text(text).attr('data-state', state || 'working').show();
                $imageButton.attr('aria-busy', state === 'working' ? 'true' : 'false');
            }
            function syncImageAction() {
                var visible = !!existingName && settings.images.showButton !== false;
                $imageButton.toggle(visible); $imageNote.toggle(visible);
            }
            syncImageAction();
            $imageButton.on('click', function () {
                if (busy || !existingName || settings.images.showButton === false) return;
                busy = true; previewSequence++;
                $fieldset.prop('disabled', true);
                imageStatus(message(settings, 'imageActionLoading', 'Loading saved dragon data for image categories...'), 'working');
                return load(api, 'Data:Dragons.json').then(function (fresh) {
                    var savedDragon = record(fresh.document, 'Dragons', existingName);
                    if (!savedDragon) throw new Error('The saved dragon could not be found');
                    imageStatus(message(settings, 'imageActionCollecting', 'Collecting dragon images and gallery files...'), 'working');
                    return loadDragonImageFiles(savedDragon, settings.images.maxFiles || 1000);
                }).then(function (filenames) {
                    return tagImagePages(api, filenames, user, function (stats) {
                        if (stats.waitSeconds) {
                            imageStatus(message(settings, 'imageActionWaiting', 'Wiki edit rate limit reached. Waiting {seconds} seconds before retrying; keep this page open.', { seconds: stats.waitSeconds }), 'working');
                            return;
                        }
                        imageStatus(message(settings, 'imageActionProgress', 'Updating image categories from saved data: {done}/{total}.',
                            { done: stats.updated + stats.skipped, total: stats.total }), 'working');
                    }, true, { intervalMs: settings.images.editIntervalMs || 1500 });
                }).then(function (stats) {
                    imagesPending = false;
                    imageStatus(message(settings, 'imageActionDone', 'Image categories updated from saved dragon data. Templates added: {updated}; pages refreshed: {refreshed}. Form edits have not been saved.', stats), 'success');
                }).catch(function (error) {
                    imageStatus(message(settings, 'imageActionError', 'Image category update incomplete: {error}. Click Update image categories to retry. Form edits have not been saved.', { error: error.message }), 'error');
                }).then(function () { busy = false; $fieldset.prop('disabled', false); });
            });
            $form.on('input change', function () { dirty = true; previewSequence++; });
            root.addEventListener('beforeunload', function (event) { if (dirty) { event.preventDefault(); event.returnValue = ''; } });
            function collect() {
                updateConditions(); syncRiftTime();
                var values = {};
                var name = sections.Dragons.fields.Name.read();
                if (!name || name !== name.trim() || /[\[\]{}|<>#\n\r]/.test(name) || ['__proto__', 'constructor', 'prototype'].indexOf(name) !== -1) {
                    throw new Error('Provide a valid dragon name without leading or trailing spaces');
                }
                if (existingName && name !== existingName) throw new Error('Renaming dragons is not supported by this form');
                if (!existingName && record(snapshots.Dragons.document, 'Dragons', name)) throw new Error('This dragon already exists. Open its Dragon/Edit page.');
                keys.forEach(function (key) {
                    if (settings.hidden.indexOf(key) !== -1) { values[key] = clone(record(snapshots[key].document, key, name)); return; }
                    if (!sections[key].enabled.prop('checked')) { values[key] = undefined; return; }
                    var original = record(snapshots[key].document, key, name);
                    var value = clone(original || {});
                    Object.keys(sections[key].fields).forEach(function (fieldKey) {
                        if (sections[key].fields[fieldKey].inactive) return;
                        var result = sections[key].fields[fieldKey].read();
                        if (key === 'Dragons' && fieldKey.indexOf('Pedestal') === 0) {
                            var pedestal = clone(value.Pedestal || {});
                            if (result === undefined) delete pedestal[fieldKey.slice(8)]; else pedestal[fieldKey.slice(8)] = result;
                            if (Object.keys(pedestal).length) value.Pedestal = pedestal; else delete value.Pedestal;
                            delete value[fieldKey];
                        } else if (result === undefined) delete value[fieldKey]; else value[fieldKey] = result;
                    });
                    if (Array.isArray(collection(snapshots[key].document, key))) value.Name = name;
                    values[key] = value;
                });
                if (!Number.isSafeInteger(values.Dragons.Order) || values.Dragons.Order < 1) throw new Error('Order must be a positive integer');
                if (!Array.isArray(values.Dragons.Elements) || !values.Dragons.Elements.length) throw new Error('Select at least one dragon element');
                if (!values.Dragons.Rarity) throw new Error('Select the dragon rarity');
                if (values.Dragons.Elements.indexOf('Rift') !== -1) values.Dragons.BreedingTime = 'Instant';
                if (dragons.some(function (dragon) { return dragon.Name !== name && dragon.Order === values.Dragons.Order; })) throw new Error('That dragon order is already in use');
                values.Dragons.ReleaseDate = releaseDate(dateInput(values.Dragons.ReleaseDate));
                return { name: name, values: values };
            }
            function validated() {
                updateConditions(); syncRiftTime();
                var invalid = $form.find('input, select, textarea').filter(function () {
                    return this.willValidate && !this.validity.valid;
                }).first();
                function reveal($field) {
                    var key = $field.closest('[role="tabpanel"]').attr('data-section');
                    if (key) activateSection(key, false);
                    $field.parents('details').prop('open', true);
                    var control = $field.is('input, select, textarea') ? $field[0] : $field.find('input, select, textarea').filter(':enabled')[0];
                    if (control) control.focus();
                    var target = $field[0];
                    if (target && target.scrollIntoView) target.scrollIntoView({ block: 'center', behavior: 'smooth' });
                }
                if (invalid.length) {
                    reveal(invalid);
                    $form[0].reportValidity();
                    $status.text(message(settings, 'requiredError', 'Complete the required fields before previewing or saving.'));
                    return null;
                }
                try { return collect(); } catch (error) {
                    if (error.field) {
                        reveal(error.field);
                        $status.text(message(settings, 'fieldError', 'Check this field: {error}', { error: error.message }));
                        return null;
                    }
                    throw error;
                }
            }
            function showPreview() {
                $preview[0].focus({ preventScroll: true });
                if ($preview[0].scrollIntoView) $preview[0].scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            $previewButton.on('click', function () {
                if (busy) return;
                var sequence;
                var draft;
                return Promise.resolve().then(function () {
                    draft = validated();
                    if (!draft) return;
                    sequence = ++previewSequence;
                    $status.text('Rendering preview…');
                    return apiCall(api, 'post', { action: 'parse', contentmodel: 'wikitext',
                        text: '{{#invoke:Dragonbox|preview|data=' + encodeURIComponent(JSON.stringify(draft.values)) +
                            '|options=' + encodeURIComponent(JSON.stringify({ sections: settings.preview.sections })) + '}}',
                        title: draft.name + ' Dragon', prop: 'text', disablelimitreport: 1, formatversion: 2 });
                }).then(function (result) {
                    if (!result || sequence !== previewSequence) return;
                    if (!result.parse || typeof result.parse.text !== 'string') throw new Error('No preview returned');
                    $preview.html(result.parse.text);
                    if ($preview.find('.error, .scribunto-error').length) {
                        showPreview();
                        throw new Error('The wiki could not render this draft. See the preview error.');
                    }
                    $preview.prepend($('<p>').text(message(settings, 'draftNotice', 'Draft page preview. Changes have not been saved.')));
                    if (settings.preview.showData !== false) $preview.append(
                        $('<details>').append($('<summary>').text(message(settings, 'draftData', 'Draft data for all records')),
                        $('<pre>').text(JSON.stringify(draft.values, null, 2))));
                    if (typeof root.initializeToggler === 'function') root.initializeToggler();
                    if (typeof root.initializeCountdown === 'function') root.initializeCountdown($preview);
                    $status.text(message(settings, 'draftStatus', 'Draft preview. Changes have not been saved.'));
                    showPreview();
                }).catch(function (error) {
                    if (sequence === undefined || sequence === previewSequence) $status.text(message(settings, 'previewError', 'Preview failed: {error}', { error: error.message }));
                });
            });
            $form.on('submit', function (event) {
                event.preventDefault();
                if (busy) return;
                var draft;
                var imagePhase = false;
                busy = true;
                $status.text('Validating changes…');
                return Promise.resolve().then(function () {
                    draft = validated();
                    if (!draft) return;
                    previewSequence++;
                    $fieldset.prop('disabled', true);
                    $status.text('Checking for changes on the wiki…');
                    return save(api, snapshots, draft.name, draft.values, user, function (message) { $status.text(message); });
                }).then(function (saved) {
                    if (!saved) return;
                    dirty = false; existingName = draft.name;
                    syncImageAction();
                    sections.Dragons.fields.Name.element.find('input').prop('readOnly', true);
                    $status.text(saved.length ? message(settings, 'saved', 'Saved {datasets}.', { datasets: saved.join(', ') }) : message(settings, 'unchanged', 'No changes to save.'));
                    if (!imagesPending && settings.images.onSave !== true) return;
                    imagesPending = true; imagePhase = true;
                    $status.text(message(settings, 'loadingImages', 'Dragon data saved. Collecting image filenames...'));
                    return loadDragonImageFiles(draft.values.Dragons, settings.images.maxFiles || 1000).then(function (filenames) {
                        return tagImagePages(api, filenames, user, function (stats) {
                            if (stats.waitSeconds) {
                                $status.text(message(settings, 'imageActionWaiting', 'Wiki edit rate limit reached. Waiting {seconds} seconds before retrying; keep this page open.', { seconds: stats.waitSeconds }));
                                return;
                            }
                            $status.text(message(settings, 'taggingImages', 'Dragon data saved. Categorizing images: {done}/{total}.',
                                { done: stats.updated + stats.skipped, total: stats.total }));
                        }, false, { intervalMs: settings.images.editIntervalMs || 1500 });
                    }).then(function (stats) {
                        imagesPending = false;
                        $status.text(message(settings, 'imagesSaved', 'Dragon data saved. Image templates added: {updated}; already present: {skipped}.', stats));
                    });
                }).catch(function (error) {
                    if (imagePhase) {
                        $status.text(message(settings, 'imagesFailed', 'Dragon data saved; image categorization incomplete: {error}. Click Save to retry the remaining images.', { error: error.message }));
                        return;
                    }
                    if (draft && record(snapshots.Dragons.document, 'Dragons', draft.name)) {
                        existingName = draft.name; sections.Dragons.fields.Name.element.find('input').prop('readOnly', true);
                        syncImageAction();
                    }
                    $status.text('Save failed: ' + error.message + (error.saved && error.saved.length ?
                        ' Already saved: ' + error.saved.join(', ') + '. Retry to save the remaining records.' :
                        ' No successful edits were confirmed. Retry checks the wiki before writing.'));
                }).then(function () { busy = false; $fieldset.prop('disabled', false); });
            });
            $container.append($preview, $form);
            $status.text(message(settings, 'ready', 'Ready. Preview your changes before saving.'));
            loadFormIcons($form);
            initializeParentSelects($form);
        }).catch(function (error) {
            $status.text('Unable to load the editor: ' + error.message);
            $container.append($('<button>', { type: 'button' }).text('Retry').on('click', function () {
                initializing.delete(container); initialize(container);
            }));
        });
    }
    $(function () {
        mw.loader.using(['mediawiki.api', 'mediawiki.util', 'oojs-ui-core', 'oojs-ui-widgets']).then(function () {
            api = new mw.Api();
            function scan() {
                $('#dragon-picker-container').each(function () { initializePicker(this); });
                $('#dragon-form-container').each(function () { initialize(this); });
            }
            mw.hook('wikipage.content').add(scan);
            mw.hook('dragonedit.container').add(scan);
            scan();
            var observer = new MutationObserver(scan);
            observer.observe(document.body, { childList: true, subtree: true });
            root.addEventListener('pagehide', function () { observer.disconnect(); }, { once: true });
        }).catch(function (error) { console.error('Dragon editor: unable to load API', error); });
    });
})(typeof window !== 'undefined' ? window : globalThis);