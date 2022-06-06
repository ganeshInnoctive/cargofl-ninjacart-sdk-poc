$(document).ready(function(){
    $('table').stickyTableHeaders();

    $('table').on("scroll-body.bs.table", function () {
        $(window).trigger('resize.stickyTableHeaders');
    });
})
