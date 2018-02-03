<!-- External JavaScripts
============================================= -->
<script type="text/javascript" src="js/jquery.js"></script>
{{--<script type="text/javascript" src="js/plugins/jquery.bootstrap.js"></script>--}}
<script type="text/javascript" src="js/plugins/jquery.chart.js"></script>
{{--<script type="text/javascript" src="js/plugins/jquery.color.js"></script>--}}
{{--<script type="text/javascript" src="js/plugins/jquery.cookie.js"></script>--}}
{{--<script type="text/javascript" src="js/plugins/jquery.countdown.js"></script>--}}
<script type="text/javascript" src="js/plugins/jquery.countto.js"></script>
{{--<script type="text/javascript" src="js/plugins/jquery.dribbble.js"></script>--}}
{{--<script type="text/javascript" src="js/plugins/jquery.fitvids.js"></script>--}}
{{--<script type="text/javascript" src="js/plugins/jquery.flexslider.js"></script>--}}
{{--<script type="text/javascript" src="js/plugins/jquery.flickrfeed.js"></script>--}}
<script type="text/javascript" src="js/plugins/jquery.form.js"></script>
<script type="text/javascript" src="js/plugins/jquery.important.js"></script>
<script type="text/javascript" src="js/plugins/jquery.infinitescroll.js"></script>



{{--<script type="text/javascript" src="js/plugins.js"></script>--}}
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

    $(".lazyload").lazyload({
        effect: 'fadeIn'
    });

</script>
