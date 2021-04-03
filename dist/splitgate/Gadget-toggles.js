    $('.sections-toggler').each(function() {
        $(this).click(function() {
            $this = $(this);
            var toHide = $this.attr('data-toggler-hide');
            var toShow = $this.attr('data-toggler-show');
            var toHide_tbl = toHide.split(';');
            var toShow_tbl = toShow.split(';');
            
            var hiddenClass = $this.attr('data-toggler-hiddenclass');
            hiddenClass = hiddenClass ? hiddenClass : 'toggle-section-hidden';
            
            for(i in toHide_tbl) {
                var toHide = toHide_tbl[i];
                if (! toHide.startsWith('.')) toHide = '.' + toHide;
                $(toHide).addClass(hiddenClass);
            }
            
            for (i in toShow_tbl) {
                var toShow = toShow_tbl[i];
                if (! toShow.startsWith('.')) toShow = '.' + toShow;
                $(toShow).removeClass(hiddenClass);
            }
        });
    });