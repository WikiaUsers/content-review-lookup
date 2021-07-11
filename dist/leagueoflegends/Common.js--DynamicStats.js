/* Author:     Karol "[[User:Nanaki]]" Dylewski */
/* License:    CC-BY-SA 3.0 */

;(function(){
    function sanitize(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    var MIN_LVL = 1,
        MAX_LVL = 18,
        dmark = sanitize(window.dynamic_stats_dmark || '.'),
        default_formula = 'growth',
        formulas = { // If the formula changes, add a new one and change the default, so the previous versions are still available
            old_linear: function(base, per_lvl, level) {
                return base + per_lvl * level;
            },
            linear: function(base, per_lvl, level) {
                return base + per_lvl * (level - 1);
            },
            growth: function(base, growth, level) {
                return base + growth * (level - 1) * (0.685 + 0.0175 * level);
            },
        };
    function format(number, prec, accented) {
        prec = Math.pow(10, prec || 2);
        var s = String(Math.round(number * prec) / prec).split('.');
        if(s.length === 1) return s[0];
        if(accented) {
            return s[0] + '<small>' + dmark + s[1] + '</small>';
        } else {
            return s[0] + dmark + s[1];
        }
    }
    function updateStats(statbox, value) {
        statbox.data('dynamic-stats-value', value = parseInt(value, 10) || value);
        var f = formulas[statbox.data('dynamic-stats-formula')],
            accented = statbox.data('dynamic-stats-accented');
        
        statbox.find('.dynamic-stat').each(function() {
            var $t = $(this),
                base = $t.data('base'),
                level = $t.data('level');
            
            if(typeof(value) === 'number') {
                $t.html(format(f(base, level, value), 1, accented))
                  .attr('title', format(base, 2, false) + ' + ' + format(f(base, level, value) - base, 3, false));
            } else if(value === 'n') {
                var str = '';
                if(base !== 0 || level !== 0) {
                    if(base !== 0) {
                        str += format(base, 2, accented);
                        if(level > 0) str += ' (+';
                        else if(level < 0) str += ' (-';
                    }
                    if(level !== 0) {
                        str += format(level, 3, accented);
                        if(base !== 0) str += ')';
                    }
                } else {
                    str = '0';
                }
                $t.empty().attr('title', null)
                  .append(str);
            } else {
                var at_min = f(base, level, MIN_LVL),
                    at_max = f(base, level, MAX_LVL);
                
                if(at_min === at_max) {
                    $t.empty().attr('title', null)
                      .append(format(at_min, 3, accented));
                } else {
                    $t.empty().attr('title', null)
                      .append(format(at_min, 1, accented))
                      .append('&thinsp;–&thinsp;')
                      .append(format(at_max, 1, accented));
                }
            }
        });
        statbox.find('.dynamic-stats-switch select').val(value);
    }
    function createSelects(statbox) {
        statbox.find('.dynamic-stats-switch:not(:has(>select))').each(function() {
            var $t = $(this);
            
            var sel = $('<select>');
            
            sel.append('<option value="n">n</option>')
               .append('<option value="range">' + MIN_LVL + '&thinsp;–&thinsp;' + MAX_LVL +'</option>');
            
            for(var i=MIN_LVL;i<=MAX_LVL;i++) {
                sel.append('<option value="' + i + '">' + i + '</option>');
            }
            
            $t.empty()
              .append($t.data('prefix'))
              .append(' ')
              .append(sel)
              .append(' ')
              .append($t.data('suffix'));
        });
    }
    function initSelects(statbox, inside) {
        inside = inside || statbox;
        inside.find('.dynamic-stats-switch > select').off('change').change(function() {
            updateStats(statbox, $(this).val());
        });
    }
    function initStats(statbox) {
		statbox.find('.dynamic-stat').each(function() {
            var $t = $(this);
            $t.data('base', parseFloat($t.data('base')) || 0);
            $t.data('level', parseFloat($t.data('level')) || 0);
        });
    }
    function initChild(child, parent) {        
        if(!parent.data('dynamic-stats-default')) {
            init(parent);
        } else {
            child.removeClass('dynamic-stats').addClass('dynamic-stats-nested');
            
            /* Stucture of new elements */
            createSelects(child);
            initSelects(parent, child);
            initStats(child);
            
            /* Reapply value of parent */
            updateStats(parent, parent.data('dynamic-stats-value'));
        }
    }
    function init(statbox) {
        if(!statbox.is('.dynamic-stats') || statbox.data('dynamic-stats-default')) return;
        
        /* Check if is top-most */
        var p;
        statbox.parents().filter('.dynamic-stats').last().each(function() {
            p = $(this);
        });
        if(p) return initChild(statbox, p);
        
        /* Settings */
        var val = parseInt(statbox.data('default'), 10);
        if(val && MIN_LVL <= val && val <= MAX_LVL) {
            statbox.data('dynamic-stats-default', val);
        } else if(val === -1 || statbox.data('default') === 'n') {
            statbox.data('dynamic-stats-default', 'n');
        } else {
            statbox.data('dynamic-stats-default', 'range');
        }
        statbox.data('dynamic-stats-formula', statbox.data('formula') in formulas ? statbox.data('formula') : default_formula);
        statbox.data('dynamic-stats-accented', !!statbox.data('accented'));
        
        /* Structure and events */
        statbox.find('.dynamic-stats').removeClass('dynamic-stats').addClass('dynamic-stats-nested');
        createSelects(statbox);
        initSelects(statbox);
        initStats(statbox);
        
        /* Apply default value */
        updateStats(statbox, statbox.data('dynamic-stats-default'));
    }
    $(function(){
        mw.util.$content.find('.dynamic-stats').each(function() {
            init($(this));
        });
        mw.hook('wikipage.content').add(function(elem) {
            $(elem).find('.dynamic-stats').each(function() {
                init($(this));
            });
        });
    });
})();