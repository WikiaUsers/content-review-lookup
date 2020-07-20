!function()
{
    var $hu = $('.HiUser');
    $hu.each(
        function()
        {
            var $this = $(this),
                cUser = mw.config.get('wgUserName') || '',
                tUser = ($this.data('target') || '').trim();
                
                if(cUser === tUser)
                {
                    $this.show();
                }
            
        }
    );
    console.log('[HiUser] Инициализация завершена. Всего обработано:' + $hu.length );
}();