<!DOCTYPE html>
<html lang="zh-TW">
<head>

@yield('meta')

@include('include.style')

    <!-- Document Title
    ============================================= -->
    <title>Resume | Kevin</title>

</head>

<body class="stretched sticky-responsive-menu">

  <div id="app">

  </div>

<!-- Document Wrapper
============================================= -->
<div id="wrapper" class="clearfix">

    <!-- Header
    ============================================= -->
    <header id="header" class="transparent-header sticky-transparent static-sticky">

        <div id="header-wrap">

            <div class="container clearfix">

                <div id="primary-menu-trigger"><i class="icon-reorder"></i></div>

                <!-- Logo
                ============================================= -->
                <div id="logo">
                    <a href="index.html" class="standard-logo font-secondary ls3" style="line-height: 90px;">THEK</a>
                    <a href="index.html" class="retina-logo font-secondary ls3" style="line-height: 90px;">THEK</a>
                </div><!-- #logo end -->

                <!-- Primary Navigation
                ============================================= -->
                <nav id="primary-menu">

                    <ul class="one-page-menu" data-easing="easeInOutExpo" data-speed="1250" data-offset="0">
                        <li class="current">
                            <a href="#" data-href="#wrapper">
                                <i class="fa fa-home" aria-hidden="true"></i>
                                <div>Intro</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-href="#section-skills">
                                <i class="fa fa-star"></i>
                                <div>Skills</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-href="#section-about">
                                <i class="fa fa-user"></i>
                                <div>About</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-href="#section-works">
                                <i class="fa fa-book"></i>
                                <div>Experiences</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-href="#section-articles">
                                <i class="fa fa-pencil"></i>
                                <div>Articles</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-href="#footer">
                                <i class="fa fa-phone"></i>
                                <div>Contact</div>
                            </a>
                        </li>
                    </ul>

                </nav><!-- #primary-menu end -->

            </div>

        </div>

    </header><!-- #header end -->

    <section id="slider" class="full-screen force-full-screen clearfix">
        <div class="full-screen force-full-screen blurred-img" style="position: fixed; width: 100%; background: #FFF url('css/images/hero-image/1.jpg') no-repeat top center; background-size: cover; background-attachment: fixed;">

            <div class="container clearfix">
                <div class="slider-caption dark slider-caption-right" style="width: 100%; max-width: 430px;">
                    <h2 class="font-primary ls5" data-animate="fadeIn" style="font-weight: 900; font-size: 80px">Kevin Xu</h2>
                    <p class="t300 ls1" style="font-size: 24px; color: #AAA;" data-animate="fadeIn" data-delay="400">我會用最簡單的表達呈現我自己。<br>----- 徐鎧文 , 臺北市, 臺灣
</p>
                    <a class="font-primary noborder ls1 topmargin-sm inline-block more-link dark" style="font-style: normal;" data-animate="fadeIn" data-delay="800" data-scrollto="#section-works" data-offset="0" href="#"><u>My Works</u> &rarr;</a>
                </div>
            </div>

        </div>
    </section>

@yield('content')

    <!-- Footer
    ============================================= -->
    <footer id="footer" class="page-section dark noborder nopadding clearfix" style="background-color: #1C1C1C;">

        <div class="container clearfix">

            <!-- Footer Widgets
            ============================================= -->
            <div class="footer-widgets-wrap clearfix" style="padding: 80px 0">
                <div class="col_one_fourth">
                    <div class="footer-logo">
                        <span class="t400 color ls1" style="font-size: 22px; ">ThekDesign</span>
                        <br>
                        <small class="ls3 uppercase" style="color: rgba(255,255,255,0.2);">&copy; 2018 Reserved.</small>
                    </div>
                </div>
                <div class="col_three_fourth col_last">
                    <div class="col_one_third">
                        <div class="widget widget_links clearfix">
                            <h4>聯 絡 我</h4>
                            <div class="footer-content">
                                <abbr title="Phone Number"><strong>Phone:</strong></abbr> (+886) 986-366-329<br>
                                <abbr title="Facebook"><strong>Facebook:</strong></abbr> thekey<br>
                                <abbr title="Line"><strong>Line:</strong></abbr> kkeeper<br>
                                <abbr title="Email Address"><strong>Email:</strong></abbr> kevin830802@gmail.com
                            </div>
                        </div>
                    </div>
                    <div class="col_one_third">
                        <div class="widget clearfix">
                            <h4>Location</h4>
                            <div class="footer-content">
                                <address>
                                    <strong>臺灣, 臺北市</strong><br>
                                </address>
                            </div>
                        </div>
                    </div>
                    <div class="col_one_third col_last">
                        <div class="widget widget_links clearfix">
                            <h4>Social</h4>
                            <a href="https://www.facebook.com/thekey" target="_blank" class="social-icon nobg si-small si-light si-facebook">
                                <i class="fa fa-facebook fa-stack-1x"></i>
                                <i class="fa fa-facebook fa-stack-1x"></i>
                            </a>
                            <a href="https://github.com/ThekDesign" target="_blank" class="social-icon nobg si-small si-light si-github">
                                <i class="fa fa-github fa-stack-1x"></i>
                                <i class="fa fa-github fa-stack-1x"></i>
                            </a>
                            <a href="mailto:kevin830802@gmail.com" class="social-icon nobg si-small si-light si-email3">
                                <i class="fa fa-envelope fa-stack-1x"></i>
                                <i class="fa fa-envelope fa-stack-1x"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Copyrights
        ============================================= -->
        <div id="copyrights" style="background-color: #111;">

            <div class="container clearfix">

                <div class="col_full center nobottommargin">
                    Copyrights &copy; 2018 All Rights Reserved by Kevin Xu<br>
                    <div class="copyright-links"><a href="#">Terms of Use</a> / <a href="#">Privacy Policy</a></div>
                </div>

            </div>

        </div><!-- #copyrights end -->

    </footer><!-- #footer end -->

</div><!-- #wrapper end -->

<!-- Go To Top
============================================= -->
<div id="gotoTop" class="icon-angle-up"></div>

@include('include.script')

</body>
</html>
