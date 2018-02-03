<!-- External JavaScripts
============================================= -->
<script type="text/javascript" src="js/jquery.js"></script>

<script type="text/javascript" src="js/plugins.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lazyload@2.0.0-beta.2/lazyload.js"></script>

<!-- Footer Scripts
============================================= -->
<script type="text/javascript" src="js/functions.js"></script>

<script>
    $(window).scroll(function () {
        let pixs = $(window).scrollTop();
        pixs = pixs / 70;
        $(".blurred-img").css({"-webkit-filter": "blur(" + pixs + "px)", "filter": "blur(" + pixs + "px)"});
    });

    $(document).ready(function () {
        $(".lazyload").lazyload({
            effect: 'fadeIn'
        });
    });
</script>
