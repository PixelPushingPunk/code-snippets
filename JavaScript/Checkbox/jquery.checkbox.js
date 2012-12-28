var loading = false;

function removeLoading() {
    loading = false;
}

$(function() {
    
    

    $('input[type=checkbox]').each(function() {
        var span = $('<span class="' + $(this).attr('type') + ' ' + $(this).attr('class') + '"></span>').click(doCheck).mousedown(doDown).mouseup(doUp);
        if ($(this).is(':checked')) {
            span.addClass('checked');
        }
        $(this).wrap(span).hide();
    });

    function doCheck() {
        if (!loading) {
            loading = true;
            if ($(this).hasClass('checked')) {
                $(this).removeClass('checked');
                $(this).children().prop("checked", false);
                setTimeout(function() { removeLoading(); }, 50);
            } else {
                $(this).addClass('checked');
                $(this).children().prop("checked", true);
                setTimeout(function() { removeLoading(); }, 50);
            }
        }
    }

    function doDown() {
        $(this).addClass('clicked');
    }

    function doUp() {
        $(this).removeClass('clicked');
    }
});