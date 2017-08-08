// JUST COPY THIS CODE AND PASTE WHERE YOU NEED IT
// It's now using ".on('click').." which is much more stable

$(function () {
    $('body').on('click', 'a[href*="#"]:not([href="#"])', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 600);
                return false;
            }
        }
    });
});