function sm_format_twitter(e) {
    for (var t = [], i = 0; i < e.length; i++) {
        var n = e[i].user.screen_name, s = e[i].user.name, r = e[i].user.profile_image_url,
            a = e[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function (e) {
                return '<a href="' + e + '" target="_blank">' + e + "</a>"
            }).replace(/\B@([_a-z0-9]+)/gi, function (e) {
                return e.charAt(0) + '<a href="http://twitter.com/' + e.substring(1) + '" target="_blank">' + e.substring(1) + "</a>"
            });
        t.push('<li><i class="icon-twitter"></i><a href="http://twitter.com/' + n + '" class="twitter-avatar" target="_blank"><img src="' + r + '" alt="' + s + '" title="' + s + '"></a><span>' + a + '</span><small><a href="http://twitter.com/' + n + "/statuses/" + e[i].id_str + '" target="_blank">' + relative_time(e[i].created_at) + "</a></small></li>")
    }
    return t.join("")
}

function sm_format_twitter2(e) {
    for (var t = [], i = 0; i < e.length; i++) {
        var n = e[i].user.screen_name,
            s = e[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function (e) {
                return '<a href="' + e + '" target="_blank">' + e + "</a>"
            }).replace(/\B@([_a-z0-9]+)/gi, function (e) {
                return e.charAt(0) + '<a href="http://twitter.com/' + e.substring(1) + '" target="_blank">' + e.substring(1) + "</a>"
            });
        t.push('<div class="slide"><span>' + s + '</span><small><a href="http://twitter.com/' + n + "/statuses/" + e[i].id_str + '" target="_blank">' + relative_time(e[i].created_at) + "</a></small></div>")
    }
    return t.join("")
}

function sm_format_twitter3(e) {
    for (var t = [], i = 0; i < e.length; i++) {
        var n = e[i].user.screen_name,
            s = e[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function (e) {
                return '<a href="' + e + '" target="_blank">' + e + "</a>"
            }).replace(/\B@([_a-z0-9]+)/gi, function (e) {
                return e.charAt(0) + '<a href="http://twitter.com/' + e.substring(1) + '" target="_blank">' + e.substring(1) + "</a>"
            });
        t.push('<div class="slide"><div class="testi-content"><p>' + s + '</p><div class="testi-meta"><span><a href="http://twitter.com/' + n + "/statuses/" + e[i].id_str + '" target="_blank">' + relative_time(e[i].created_at) + "</a></span></div></div></div>")
    }
    return t.join("")
}

function relative_time(e) {
    var t = e.split(" ");
    e = t[1] + " " + t[2] + ", " + t[5] + " " + t[3];
    var i = Date.parse(e), n = arguments.length > 1 ? arguments[1] : new Date, s = parseInt((n.getTime() - i) / 1e3);
    return s += 60 * n.getTimezoneOffset(), s < 60 ? "less than a minute ago" : s < 120 ? "about a minute ago" : s < 3600 ? parseInt(s / 60).toString() + " minutes ago" : s < 7200 ? "about an hour ago" : s < 86400 ? "about " + parseInt(s / 3600).toString() + " hours ago" : s < 172800 ? "1 day ago" : parseInt(s / 86400).toString() + " days ago"
}

function ssc_init() {
    if (document.body) {
        var e = document.body, t = document.documentElement, i = window.innerHeight, n = e.scrollHeight;
        if (ssc_root = document.compatMode.indexOf("CSS") >= 0 ? t : e, ssc_activeElement = e, ssc_initdone = !0, top != self) ssc_frame = !0; else if (n > i && (e.offsetHeight <= i || t.offsetHeight <= i) && (ssc_root.style.height = "auto", ssc_root.offsetHeight <= i)) {
            var s = document.createElement("div");
            s.style.clear = "both", e.appendChild(s)
        }
        ssc_fixedback || (e.style.backgroundAttachment = "scroll", t.style.backgroundAttachment = "scroll"), ssc_keyboardsupport && ssc_addEvent("keydown", ssc_keydown)
    }
}

function ssc_scrollArray(e, t, i, n) {
    if (n || (n = 1e3), ssc_directionCheck(t, i), ssc_que.push({
            x: t,
            y: i,
            lastX: t < 0 ? .99 : -.99,
            lastY: i < 0 ? .99 : -.99,
            start: +new Date
        }), !ssc_pending) {
        var s = function () {
            for (var r = +new Date, a = 0, o = 0, l = 0; l < ssc_que.length; l++) {
                var u = ssc_que[l], c = r - u.start, d = c >= ssc_animtime, p = d ? 1 : c / ssc_animtime;
                ssc_pulseAlgorithm && (p = ssc_pulse(p));
                var h = u.x * p - u.lastX >> 0, f = u.y * p - u.lastY >> 0;
                a += h, o += f, u.lastX += h, u.lastY += f, d && (ssc_que.splice(l, 1), l--)
            }
            if (t) {
                var m = e.scrollLeft;
                e.scrollLeft += a, a && e.scrollLeft === m && (t = 0)
            }
            if (i) {
                var g = e.scrollTop;
                e.scrollTop += o, o && e.scrollTop === g && (i = 0)
            }
            t || i || (ssc_que = []), ssc_que.length ? setTimeout(s, n / ssc_framerate + 1) : ssc_pending = !1
        };
        setTimeout(s, 0), ssc_pending = !0
    }
}

function ssc_wheel(e) {
    ssc_initdone || ssc_init();
    var t = e.target, i = ssc_overflowingAncestor(t);
    if (!i || e.defaultPrevented || ssc_isNodeName(ssc_activeElement, "embed") || ssc_isNodeName(t, "embed") && /\.pdf/i.test(t.src)) return !0;
    var n = e.wheelDeltaX || 0, s = e.wheelDeltaY || 0;
    n || s || (s = e.wheelDelta || 0), Math.abs(n) > 1.2 && (n *= ssc_stepsize / 120), Math.abs(s) > 1.2 && (s *= ssc_stepsize / 120), ssc_scrollArray(i, -n, -s), e.preventDefault()
}

function ssc_keydown(e) {
    var t = e.target, i = e.ctrlKey || e.altKey || e.metaKey;
    if (/input|textarea|embed/i.test(t.nodeName) || t.isContentEditable || e.defaultPrevented || i) return !0;
    if (ssc_isNodeName(t, "button") && e.keyCode === ssc_key.spacebar) return !0;
    var n = 0, s = 0, r = ssc_overflowingAncestor(ssc_activeElement), a = r.clientHeight;
    switch (r == document.body && (a = window.innerHeight), e.keyCode) {
        case ssc_key.up:
            s = -ssc_arrowscroll;
            break;
        case ssc_key.down:
            s = ssc_arrowscroll;
            break;
        case ssc_key.spacebar:
            s = -(e.shiftKey ? 1 : -1) * a * .9;
            break;
        case ssc_key.pageup:
            s = .9 * -a;
            break;
        case ssc_key.pagedown:
            s = .9 * a;
            break;
        case ssc_key.home:
            s = -r.scrollTop;
            break;
        case ssc_key.end:
            var o = r.scrollHeight - r.scrollTop - a;
            s = o > 0 ? o + 10 : 0;
            break;
        case ssc_key.left:
            n = -ssc_arrowscroll;
            break;
        case ssc_key.right:
            n = ssc_arrowscroll;
            break;
        default:
            return !0
    }
    ssc_scrollArray(r, n, s), e.preventDefault()
}

function ssc_mousedown(e) {
    ssc_activeElement = e.target
}

function ssc_setCache(e, t) {
    for (var i = e.length; i--;) ssc_cache[ssc_uniqueID(e[i])] = t;
    return t
}

function ssc_overflowingAncestor(e) {
    var t = [], i = ssc_root.scrollHeight;
    do {
        var n = ssc_cache[ssc_uniqueID(e)];
        if (n) return ssc_setCache(t, n);
        if (t.push(e), i === e.scrollHeight) {
            if (!ssc_frame || ssc_root.clientHeight + 10 < i) return ssc_setCache(t, document.body)
        } else if (e.clientHeight + 10 < e.scrollHeight && (overflow = getComputedStyle(e, "").getPropertyValue("overflow"), "scroll" === overflow || "auto" === overflow)) return ssc_setCache(t, e)
    } while (e = e.parentNode)
}

function ssc_addEvent(e, t, i) {
    window.addEventListener(e, t, i || !1)
}

function ssc_removeEvent(e, t, i) {
    window.removeEventListener(e, t, i || !1)
}

function ssc_isNodeName(e, t) {
    return e.nodeName.toLowerCase() === t.toLowerCase()
}

function ssc_directionCheck(e, t) {
    e = e > 0 ? 1 : -1, t = t > 0 ? 1 : -1, ssc_direction.x === e && ssc_direction.y === t || (ssc_direction.x = e, ssc_direction.y = t, ssc_que = [])
}

function ssc_pulse_(e) {
    var t, i;
    return e *= ssc_pulseScale, e < 1 ? t = e - (1 - Math.exp(-e)) : (e -= 1, t = (i = Math.exp(-1)) + (1 - Math.exp(-e)) * (1 - i)), t * ssc_pulseNormalize
}

function ssc_pulse(e) {
    return e >= 1 ? 1 : e <= 0 ? 0 : (1 == ssc_pulseNormalize && (ssc_pulseNormalize /= ssc_pulse_(1)), ssc_pulse_(e))
}

function onYouTubeIframeAPIReady() {
    ytp.YTAPIReady || (ytp.YTAPIReady = !0, jQuery(document).trigger("YTAPIReady"))
}

function uncamel(e) {
    return e.replace(/([A-Z])/g, function (e) {
        return "-" + e.toLowerCase()
    })
}

function setUnit(e, t) {
    return "string" != typeof e || e.match(/^[\-0-9\.]+jQuery/) ? "" + e + t : e
}

function setFilter(e, t, i) {
    var n = uncamel(t), s = jQuery.browser.mozilla ? "" : jQuery.CSS.sfx;
    e[s + "filter"] = e[s + "filter"] || "", i = setUnit(i > jQuery.CSS.filters[t].max ? jQuery.CSS.filters[t].max : i, jQuery.CSS.filters[t].unit), e[s + "filter"] += n + "(" + i + ") ", delete e[t]
}

if (jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function (e, t, i, n, s) {
            return jQuery.easing[jQuery.easing.def](e, t, i, n, s)
        },
        easeInQuad: function (e, t, i, n, s) {
            return n * (t /= s) * t + i
        },
        easeOutQuad: function (e, t, i, n, s) {
            return -n * (t /= s) * (t - 2) + i
        },
        easeInOutQuad: function (e, t, i, n, s) {
            return (t /= s / 2) < 1 ? n / 2 * t * t + i : -n / 2 * (--t * (t - 2) - 1) + i
        },
        easeInCubic: function (e, t, i, n, s) {
            return n * (t /= s) * t * t + i
        },
        easeOutCubic: function (e, t, i, n, s) {
            return n * ((t = t / s - 1) * t * t + 1) + i
        },
        easeInOutCubic: function (e, t, i, n, s) {
            return (t /= s / 2) < 1 ? n / 2 * t * t * t + i : n / 2 * ((t -= 2) * t * t + 2) + i
        },
        easeInQuart: function (e, t, i, n, s) {
            return n * (t /= s) * t * t * t + i
        },
        easeOutQuart: function (e, t, i, n, s) {
            return -n * ((t = t / s - 1) * t * t * t - 1) + i
        },
        easeInOutQuart: function (e, t, i, n, s) {
            return (t /= s / 2) < 1 ? n / 2 * t * t * t * t + i : -n / 2 * ((t -= 2) * t * t * t - 2) + i
        },
        easeInQuint: function (e, t, i, n, s) {
            return n * (t /= s) * t * t * t * t + i
        },
        easeOutQuint: function (e, t, i, n, s) {
            return n * ((t = t / s - 1) * t * t * t * t + 1) + i
        },
        easeInOutQuint: function (e, t, i, n, s) {
            return (t /= s / 2) < 1 ? n / 2 * t * t * t * t * t + i : n / 2 * ((t -= 2) * t * t * t * t + 2) + i
        },
        easeInSine: function (e, t, i, n, s) {
            return -n * Math.cos(t / s * (Math.PI / 2)) + n + i
        },
        easeOutSine: function (e, t, i, n, s) {
            return n * Math.sin(t / s * (Math.PI / 2)) + i
        },
        easeInOutSine: function (e, t, i, n, s) {
            return -n / 2 * (Math.cos(Math.PI * t / s) - 1) + i
        },
        easeInExpo: function (e, t, i, n, s) {
            return 0 == t ? i : n * Math.pow(2, 10 * (t / s - 1)) + i
        },
        easeOutExpo: function (e, t, i, n, s) {
            return t == s ? i + n : n * (1 - Math.pow(2, -10 * t / s)) + i
        },
        easeInOutExpo: function (e, t, i, n, s) {
            return 0 == t ? i : t == s ? i + n : (t /= s / 2) < 1 ? n / 2 * Math.pow(2, 10 * (t - 1)) + i : n / 2 * (2 - Math.pow(2, -10 * --t)) + i
        },
        easeInCirc: function (e, t, i, n, s) {
            return -n * (Math.sqrt(1 - (t /= s) * t) - 1) + i
        },
        easeOutCirc: function (e, t, i, n, s) {
            return n * Math.sqrt(1 - (t = t / s - 1) * t) + i
        },
        easeInOutCirc: function (e, t, i, n, s) {
            return (t /= s / 2) < 1 ? -n / 2 * (Math.sqrt(1 - t * t) - 1) + i : n / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + i
        },
        easeInElastic: function (e, t, i, n, s) {
            var r = 1.70158, a = 0, o = n;
            if (0 == t) return i;
            if (1 == (t /= s)) return i + n;
            if (a || (a = .3 * s), o < Math.abs(n)) {
                o = n;
                r = a / 4
            } else r = a / (2 * Math.PI) * Math.asin(n / o);
            return -o * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * s - r) * (2 * Math.PI) / a) + i
        },
        easeOutElastic: function (e, t, i, n, s) {
            var r = 1.70158, a = 0, o = n;
            if (0 == t) return i;
            if (1 == (t /= s)) return i + n;
            if (a || (a = .3 * s), o < Math.abs(n)) {
                o = n;
                r = a / 4
            } else r = a / (2 * Math.PI) * Math.asin(n / o);
            return o * Math.pow(2, -10 * t) * Math.sin((t * s - r) * (2 * Math.PI) / a) + n + i
        },
        easeInOutElastic: function (e, t, i, n, s) {
            var r = 1.70158, a = 0, o = n;
            if (0 == t) return i;
            if (2 == (t /= s / 2)) return i + n;
            if (a || (a = s * (.3 * 1.5)), o < Math.abs(n)) {
                o = n;
                r = a / 4
            } else r = a / (2 * Math.PI) * Math.asin(n / o);
            return t < 1 ? o * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * s - r) * (2 * Math.PI) / a) * -.5 + i : o * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * s - r) * (2 * Math.PI) / a) * .5 + n + i
        },
        easeInBack: function (e, t, i, n, s, r) {
            return void 0 == r && (r = 1.70158), n * (t /= s) * t * ((r + 1) * t - r) + i
        },
        easeOutBack: function (e, t, i, n, s, r) {
            return void 0 == r && (r = 1.70158), n * ((t = t / s - 1) * t * ((r + 1) * t + r) + 1) + i
        },
        easeInOutBack: function (e, t, i, n, s, r) {
            return void 0 == r && (r = 1.70158), (t /= s / 2) < 1 ? n / 2 * (t * t * ((1 + (r *= 1.525)) * t - r)) + i : n / 2 * ((t -= 2) * t * ((1 + (r *= 1.525)) * t + r) + 2) + i
        },
        easeInBounce: function (e, t, i, n, s) {
            return n - jQuery.easing.easeOutBounce(e, s - t, 0, n, s) + i
        },
        easeOutBounce: function (e, t, i, n, s) {
            return (t /= s) < 1 / 2.75 ? n * (7.5625 * t * t) + i : t < 2 / 2.75 ? n * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + i : t < 2.5 / 2.75 ? n * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + i : n * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + i
        },
        easeInOutBounce: function (e, t, i, n, s) {
            return t < s / 2 ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, n, s) + i : .5 * jQuery.easing.easeOutBounce(e, 2 * t - s, 0, n, s) + .5 * n + i
        }
    }), function (e) {
        "use strict";
        e.fn.fitVids = function (t) {
            var i = {customSelector: null, ignore: null};
            if (!document.getElementById("fit-vids-style")) {
                var n = document.head || document.getElementsByTagName("head")[0], s = document.createElement("div");
                s.innerHTML = '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>', n.appendChild(s.childNodes[1])
            }
            return t && e.extend(i, t), this.each(function () {
                var t = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
                i.customSelector && t.push(i.customSelector);
                var n = ".fitvidsignore";
                i.ignore && (n = n + ", " + i.ignore);
                var s = e(this).find(t.join(","));
                (s = (s = s.not("object object")).not(n)).each(function (t) {
                    var i = e(this);
                    if (!(i.parents(n).length > 0 || "embed" === this.tagName.toLowerCase() && i.parent("object").length || i.parent(".fluid-width-video-wrapper").length)) {
                        i.css("height") || i.css("width") || !isNaN(i.attr("height")) && !isNaN(i.attr("width")) || (i.attr("height", 9), i.attr("width", 16));
                        var s = ("object" === this.tagName.toLowerCase() || i.attr("height") && !isNaN(parseInt(i.attr("height"), 10)) ? parseInt(i.attr("height"), 10) : i.height()) / (isNaN(parseInt(i.attr("width"), 10)) ? i.width() : parseInt(i.attr("width"), 10));
                        if (!i.attr("id")) {
                            var r = "fitvid" + t;
                            i.attr("id", r)
                        }
                        i.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * s + "%"), i.removeAttr("height").removeAttr("width")
                    }
                })
            })
        }
    }(window.jQuery || window.Zepto), function (e, t) {
        "use strict";
        var i = function () {
            var i = {
                bcClass: "sf-breadcrumb",
                menuClass: "sf-js-enabled",
                anchorClass: "sf-with-ul",
                menuArrowClass: "sf-arrows"
            }, n = function () {
                var t = /^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent);
                return t && e("html").css("cursor", "pointer").on("click", e.noop), t
            }(), s = function () {
                var e = document.documentElement.style;
                return "behavior" in e && "fill" in e && /iemobile/i.test(navigator.userAgent)
            }(), r = !!t.PointerEvent, a = function (e, t, n) {
                var s = i.menuClass;
                t.cssArrows && (s += " " + i.menuArrowClass), e[n ? "addClass" : "removeClass"](s)
            }, o = function (t, n) {
                return t.find("li." + n.pathClass).slice(0, n.pathLevels).addClass(n.hoverClass + " " + i.bcClass).filter(function () {
                    return e(this).children(n.popUpSelector).hide().show().length
                }).removeClass(n.pathClass)
            }, l = function (e, t) {
                var n = t ? "addClass" : "removeClass";
                e.children("a")[n](i.anchorClass)
            }, u = function (e) {
                var t = e.css("ms-touch-action"), i = e.css("touch-action");
                i = "pan-y" === (i = i || t) ? "auto" : "pan-y", e.css({"ms-touch-action": i, "touch-action": i})
            }, c = function (e) {
                return e.closest("." + i.menuClass)
            }, d = function (e) {
                return c(e).data("sfOptions")
            }, p = function () {
                var t = e(this), i = d(t);
                clearTimeout(i.sfTimer), t.siblings().superfish("hide").end().superfish("show")
            }, h = function (t) {
                t.retainPath = e.inArray(this[0], t.$path) > -1, this.superfish("hide"), this.parents("." + t.hoverClass).length || (t.onIdle.call(c(this)), t.$path.length && e.proxy(p, t.$path)())
            }, f = function () {
                var t = e(this), i = d(t);
                n ? e.proxy(h, t, i)() : (clearTimeout(i.sfTimer), i.sfTimer = setTimeout(e.proxy(h, t, i), i.delay))
            }, m = function (t) {
                var i = e(this), n = d(i), s = i.siblings(t.data.popUpSelector);
                return !1 === n.onHandleTouch.call(s) ? this : void(s.length > 0 && s.is(":hidden") && (i.one("click.superfish", !1), "MSPointerDown" === t.type || "pointerdown" === t.type ? i.trigger("focus") : e.proxy(p, i.parent("li"))()))
            }, g = function (t, i) {
                var a = "li:has(" + i.popUpSelector + ")";
                e.fn.hoverIntent && !i.disableHI ? t.hoverIntent(p, f, a) : t.on("mouseenter.superfish", a, p).on("mouseleave.superfish", a, f);
                var o = "MSPointerDown.superfish";
                r && (o = "pointerdown.superfish"), n || (o += " touchend.superfish"), s && (o += " mousedown.superfish"), t.on("focusin.superfish", "li", p).on("focusout.superfish", "li", f).on(o, "a", i, m)
            };
            return {
                hide: function (t) {
                    if (this.length) {
                        var i = this, n = d(i);
                        if (!n) return this;
                        var s = !0 === n.retainPath ? n.$path : "",
                            r = i.find("li." + n.hoverClass).add(this).not(s).removeClass(n.hoverClass).children(n.popUpSelector),
                            a = n.speedOut;
                        if (t && (r.show(), a = 0), n.retainPath = !1, !1 === n.onBeforeHide.call(r)) return this;
                        r.stop(!0, !0).animate(n.animationOut, a, function () {
                            var t = e(this);
                            n.onHide.call(t)
                        })
                    }
                    return this
                }, show: function () {
                    var e = d(this);
                    if (!e) return this;
                    var t = this.addClass(e.hoverClass).children(e.popUpSelector);
                    return !1 === e.onBeforeShow.call(t) ? this : (t.stop(!0, !0).animate(e.animation, e.speed, function () {
                        e.onShow.call(t)
                    }), this)
                }, destroy: function () {
                    return this.each(function () {
                        var t, n = e(this), s = n.data("sfOptions");
                        return !!s && (t = n.find(s.popUpSelector).parent("li"), clearTimeout(s.sfTimer), a(n, s), l(t), u(n), n.off(".superfish").off(".hoverIntent"), t.children(s.popUpSelector).attr("style", function (e, t) {
                            return t.replace(/display[^;]+;?/g, "")
                        }), s.$path.removeClass(s.hoverClass + " " + i.bcClass).addClass(s.pathClass), n.find("." + s.hoverClass).removeClass(s.hoverClass), s.onDestroy.call(n), void n.removeData("sfOptions"))
                    })
                }, init: function (t) {
                    return this.each(function () {
                        var n = e(this);
                        if (n.data("sfOptions")) return !1;
                        var s = e.extend({}, e.fn.superfish.defaults, t), r = n.find(s.popUpSelector).parent("li");
                        s.$path = o(n, s), n.data("sfOptions", s), a(n, s, !0), l(r, !0), u(n), g(n, s), r.not("." + i.bcClass).superfish("hide", !0), s.onInit.call(this)
                    })
                }
            }
        }();
        e.fn.superfish = function (t, n) {
            return i[t] ? i[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? e.error("Method " + t + " does not exist on jQuery.fn.superfish") : i.init.apply(this, arguments)
        }, e.fn.superfish.defaults = {
            popUpSelector: "ul,.sf-mega",
            hoverClass: "sfHover",
            pathClass: "overrideThisToUse",
            pathLevels: 1,
            delay: 800,
            animation: {opacity: "show"},
            animationOut: {opacity: "hide"},
            speed: "normal",
            speedOut: "fast",
            cssArrows: !0,
            disableHI: !1,
            onInit: e.noop,
            onBeforeShow: e.noop,
            onShow: e.noop,
            onBeforeHide: e.noop,
            onHide: e.noop,
            onIdle: e.noop,
            onDestroy: e.noop,
            onHandleTouch: e.noop
        }
    }(jQuery, window), function (e) {
        e.fn.hoverIntent = function (t, i, n) {
            var s = {interval: 100, sensitivity: 7, timeout: 0};
            s = "object" == typeof t ? e.extend(s, t) : e.isFunction(i) ? e.extend(s, {
                over: t,
                out: i,
                selector: n
            }) : e.extend(s, {over: t, out: t, selector: i});
            var r, a, o, l, u = function (e) {
                r = e.pageX, a = e.pageY
            }, c = function (t, i) {
                if (i.hoverIntent_t = clearTimeout(i.hoverIntent_t), Math.abs(o - r) + Math.abs(l - a) < s.sensitivity) return e(i).off("mousemove.hoverIntent", u), i.hoverIntent_s = 1, s.over.apply(i, [t]);
                o = r, l = a, i.hoverIntent_t = setTimeout(function () {
                    c(t, i)
                }, s.interval)
            }, d = function (e, t) {
                return t.hoverIntent_t = clearTimeout(t.hoverIntent_t), t.hoverIntent_s = 0, s.out.apply(t, [e])
            }, p = function (t) {
                var i = jQuery.extend({}, t), n = this;
                n.hoverIntent_t && (n.hoverIntent_t = clearTimeout(n.hoverIntent_t)), "mouseenter" == t.type ? (o = i.pageX, l = i.pageY, e(n).on("mousemove.hoverIntent", u), 1 != n.hoverIntent_s && (n.hoverIntent_t = setTimeout(function () {
                    c(i, n)
                }, s.interval))) : (e(n).off("mousemove.hoverIntent", u), 1 == n.hoverIntent_s && (n.hoverIntent_t = setTimeout(function () {
                    d(i, n)
                }, s.timeout)))
            };
            return this.on({"mouseenter.hoverIntent": p, "mouseleave.hoverIntent": p}, s.selector)
        }
    }(jQuery), function (e, t, i) {
        "object" == typeof module && module && "object" == typeof module.exports ? module.exports = i : (e[t] = i, "function" == typeof define && define.amd && define(t, [], function () {
            return i
        }))
    }(this, "jRespond", function (e, t, i) {
        "use strict";
        return function (e) {
            var t = [], n = [], s = e, r = "", a = "", o = 0, l = 500, u = function () {
                return "number" != typeof window.innerWidth ? 0 !== document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth : window.innerWidth
            }, c = function (e) {
                if (e.length === i) d(e); else for (var t = 0; t < e.length; t++) d(e[t])
            }, d = function (e) {
                var s = e.breakpoint, o = e.enter || i;
                t.push(e), n.push(!1), f(s) && (o !== i && o.call(null, {
                    entering: r,
                    exiting: a
                }), n[t.length - 1] = !0)
            }, p = function () {
                for (var e = [], s = [], o = 0; o < t.length; o++) {
                    var l = t[o].breakpoint, u = t[o].enter || i, c = t[o].exit || i;
                    "*" === l ? (u !== i && e.push(u), c !== i && s.push(c)) : f(l) ? (u === i || n[o] || e.push(u), n[o] = !0) : (c !== i && n[o] && s.push(c), n[o] = !1)
                }
                for (var d = {entering: r, exiting: a}, p = 0; p < s.length; p++) s[p].call(null, d);
                for (var h = 0; h < e.length; h++) e[h].call(null, d)
            }, h = function (e) {
                for (var t = !1, i = 0; i < s.length; i++) if (e >= s[i].enter && e <= s[i].exit) {
                    t = !0;
                    break
                }
                t && r !== s[i].label ? (a = r, r = s[i].label, p()) : t || "" === r || (r = "", p())
            }, f = function (e) {
                if ("object" == typeof e) {
                    if (e.join().indexOf(r) >= 0) return !0
                } else {
                    if ("*" === e) return !0;
                    if ("string" == typeof e && r === e) return !0
                }
            }, m = function () {
                var e = u();
                e !== o ? (l = 100, h(e)) : l = 500, o = e, setTimeout(m, l)
            };
            return m(), {
                addFunc: function (e) {
                    c(e)
                }, getBreakpoint: function () {
                    return r
                }
            }
        }
    }(0, this.document)), -1 === navigator.platform.toUpperCase().indexOf("MAC") && !navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini|BlackBerry)/) && jQuery(window).width() > 991 && !jQuery("body").hasClass("no-smooth-scroll")) {
    var ssc_framerate = 150, ssc_animtime = 500, ssc_stepsize = 150, ssc_pulseAlgorithm = !0, ssc_pulseScale = 6,
        ssc_pulseNormalize = 1, ssc_keyboardsupport = !0, ssc_arrowscroll = 50, ssc_frame = !1,
        ssc_direction = {x: 0, y: 0}, ssc_initdone = !1, ssc_fixedback = !0, ssc_root = document.documentElement,
        ssc_activeElement,
        ssc_key = {left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36},
        ssc_que = [], ssc_pending = !1, ssc_cache = {};
    setInterval(function () {
        ssc_cache = {}
    }, 1e4);
    var ssc_uniqueID = function () {
        var e = 0;
        return function (t) {
            return t.ssc_uniqueID || (t.ssc_uniqueID = e++)
        }
    }(), ischrome = /chrome/.test(navigator.userAgent.toLowerCase());
    ischrome && (ssc_addEvent("mousedown", ssc_mousedown), ssc_addEvent("mousewheel", ssc_wheel), ssc_addEvent("load", ssc_init))
}
!function (e) {
    var t = 0;
    e.fn.scrolled = function (i, n) {
        "function" == typeof i && (n = i, i = 300);
        var s = "scrollTimer" + t++;
        this.scroll(function () {
            var t = e(this), r = t.data(s);
            r && clearTimeout(r), r = setTimeout(function () {
                t.removeData(s), n.call(t[0])
            }, i), t.data(s, r)
        })
    }
}(jQuery), function (e) {
    e.fn.jflickrfeed = function (t, i) {
        var n = (t = e.extend(!0, {
            flickrbase: "http://api.flickr.com/services/feeds/",
            feedapi: "photos_public.gne",
            limit: 20,
            qstrings: {lang: "en-us", format: "json", jsoncallback: "?"},
            cleanDescription: !0,
            useTemplate: !0,
            itemTemplate: "",
            itemCallback: function () {
            }
        }, t)).flickrbase + t.feedapi + "?", s = !0;
        for (var r in t.qstrings) s || (n += "&"), n += r + "=" + t.qstrings[r], s = !1;
        return e(this).each(function () {
            var s = e(this), r = this;
            e.getJSON(n, function (n) {
                e.each(n.items, function (e, i) {
                    if (e < t.limit) {
                        if (t.cleanDescription) {
                            var n = /<p>(.*?)<\/p>/g, a = i.description;
                            n.test(a) && (i.description = a.match(n)[2], void 0 != i.description && (i.description = i.description.replace("<p>", "").replace("</p>", "")))
                        }
                        if (i.image_s = i.media.m.replace("_m", "_s"), i.image_t = i.media.m.replace("_m", "_t"), i.image_m = i.media.m.replace("_m", "_m"), i.image = i.media.m.replace("_m", ""), i.image_b = i.media.m.replace("_m", "_b"), delete i.media, t.useTemplate) {
                            var o = t.itemTemplate;
                            for (var l in i) {
                                var u = new RegExp("{{" + l + "}}", "g");
                                o = o.replace(u, i[l])
                            }
                            s.append(o)
                        }
                        t.itemCallback.call(r, i)
                    }
                }), e.isFunction(i) && i.call(r, n)
            })
        })
    }
}(jQuery), function () {
    var e;
    e = function () {
        function e(e, t) {
            var i, n;
            if (this.options = {
                    target: "instafeed",
                    get: "popular",
                    resolution: "thumbnail",
                    sortBy: "none",
                    links: !0,
                    mock: !1,
                    useHttp: !1
                }, "object" == typeof e) for (i in e) n = e[i], this.options[i] = n;
            this.context = null != t ? t : this, this.unique = this._genKey()
        }

        return e.prototype.hasNext = function () {
            return "string" == typeof this.context.nextUrl && this.context.nextUrl.length > 0
        }, e.prototype.next = function () {
            return !!this.hasNext() && this.run(this.context.nextUrl)
        }, e.prototype.run = function (t) {
            var i, n;
            if ("string" != typeof this.options.clientId && "string" != typeof this.options.accessToken) throw new Error("Missing clientId or accessToken.");
            if ("string" != typeof this.options.accessToken && "string" != typeof this.options.clientId) throw new Error("Missing clientId or accessToken.");
            return null != this.options.before && "function" == typeof this.options.before && this.options.before.call(this), "undefined" != typeof document && null !== document && (n = document.createElement("script"), n.id = "instafeed-fetcher", n.src = t || this._buildUrl(), document.getElementsByTagName("head")[0].appendChild(n), i = "instafeedCache" + this.unique, window[i] = new e(this.options, this), window[i].unique = this.unique), !0
        }, e.prototype.parse = function (e) {
            var t, i, n, s, r, a, o, l, u, c, d, p, h, f, m, g, v, y, b, w, T, x, _, C, S, P, k, I;
            if ("object" != typeof e) {
                if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "Invalid JSON data"), !1;
                throw new Error("Invalid JSON response")
            }
            if (200 !== e.meta.code) {
                if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, e.meta.error_message), !1;
                throw new Error("Error from Instagram: " + e.meta.error_message)
            }
            if (0 === e.data.length) {
                if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "No images were returned from Instagram"), !1;
                throw new Error("No images were returned from Instagram")
            }
            if (null != this.options.success && "function" == typeof this.options.success && this.options.success.call(this, e), this.context.nextUrl = "", null != e.pagination && (this.context.nextUrl = e.pagination.next_url), "none" !== this.options.sortBy) switch (P = "random" === this.options.sortBy ? ["", "random"] : this.options.sortBy.split("-"), S = "least" === P[0], P[1]) {
                case"random":
                    e.data.sort(function () {
                        return .5 - Math.random()
                    });
                    break;
                case"recent":
                    e.data = this._sortBy(e.data, "created_time", S);
                    break;
                case"liked":
                    e.data = this._sortBy(e.data, "likes.count", S);
                    break;
                case"commented":
                    e.data = this._sortBy(e.data, "comments.count", S);
                    break;
                default:
                    throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.")
            }
            if ("undefined" != typeof document && null !== document && !1 === this.options.mock) {
                if (p = e.data, C = parseInt(this.options.limit, 10), null != this.options.limit && p.length > C && (p = p.slice(0, C)), a = document.createDocumentFragment(), null != this.options.filter && "function" == typeof this.options.filter && (p = this._filter(p, this.options.filter)), null != this.options.template && "string" == typeof this.options.template) {
                    for (o = "", "", "", I = document.createElement("div"), l = 0, w = p.length; l < w; l++) {
                        if (u = p[l], "object" != typeof(c = u.images[this.options.resolution])) throw r = "No image found for resolution: " + this.options.resolution + ".", new Error(r);
                        m = "square", (g = c.width) > (f = c.height) && (m = "landscape"), g < f && (m = "portrait"), d = c.url, window.location.protocol.indexOf("http") >= 0 && !this.options.useHttp && (d = d.replace(/https?:\/\//, "//")), o += this._makeTemplate(this.options.template, {
                            model: u,
                            id: u.id,
                            link: u.link,
                            type: u.type,
                            image: d,
                            width: g,
                            height: f,
                            orientation: m,
                            caption: this._getObjectProperty(u, "caption.text"),
                            likes: u.likes.count,
                            comments: u.comments.count,
                            location: this._getObjectProperty(u, "location.name")
                        })
                    }
                    for (I.innerHTML = o, s = [], n = 0, i = I.childNodes.length; n < i;) s.push(I.childNodes[n]), n += 1;
                    for (y = 0, T = s.length; y < T; y++) _ = s[y], a.appendChild(_)
                } else for (b = 0, x = p.length; b < x; b++) {
                    if (u = p[b], h = document.createElement("img"), "object" != typeof(c = u.images[this.options.resolution])) throw r = "No image found for resolution: " + this.options.resolution + ".", new Error(r);
                    d = c.url, window.location.protocol.indexOf("http") >= 0 && !this.options.useHttp && (d = d.replace(/https?:\/\//, "//")), h.src = d, !0 === this.options.links ? (t = document.createElement("a"), t.href = u.link, t.appendChild(h), a.appendChild(t)) : a.appendChild(h)
                }
                if ("string" == typeof(k = this.options.target) && (k = document.getElementById(k)), null == k) throw r = 'No element with id="' + this.options.target + '" on page.', new Error(r);
                k.appendChild(a), document.getElementsByTagName("head")[0].removeChild(document.getElementById("instafeed-fetcher")), v = "instafeedCache" + this.unique, window[v] = void 0;
                try {
                    delete window[v]
                } catch (e) {
                    e
                }
            }
            return null != this.options.after && "function" == typeof this.options.after && this.options.after.call(this), !0
        }, e.prototype._buildUrl = function () {
            var e, t, i;
            switch (e = "https://api.instagram.com/v1", this.options.get) {
                case"popular":
                    t = "media/popular";
                    break;
                case"tagged":
                    if (!this.options.tagName) throw new Error("No tag name specified. Use the 'tagName' option.");
                    t = "tags/" + this.options.tagName + "/media/recent";
                    break;
                case"location":
                    if (!this.options.locationId) throw new Error("No location specified. Use the 'locationId' option.");
                    t = "locations/" + this.options.locationId + "/media/recent";
                    break;
                case"user":
                    if (!this.options.userId) throw new Error("No user specified. Use the 'userId' option.");
                    t = "users/" + this.options.userId + "/media/recent";
                    break;
                default:
                    throw new Error("Invalid option for get: '" + this.options.get + "'.")
            }
            return i = e + "/" + t, null != this.options.accessToken ? i += "?access_token=" + this.options.accessToken : i += "?client_id=" + this.options.clientId, null != this.options.limit && (i += "&count=" + this.options.limit), i += "&callback=instafeedCache" + this.unique + ".parse"
        }, e.prototype._genKey = function () {
            var e;
            return "" + (e = function () {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            })() + e() + e() + e()
        }, e.prototype._makeTemplate = function (e, t) {
            var i, n, s, r, a;
            for (n = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/, i = e; n.test(i);) r = i.match(n)[1], a = null != (s = this._getObjectProperty(t, r)) ? s : "", i = i.replace(n, function () {
                return "" + a
            });
            return i
        }, e.prototype._getObjectProperty = function (e, t) {
            var i, n;
            for (n = (t = t.replace(/\[(\w+)\]/g, ".$1")).split("."); n.length;) {
                if (i = n.shift(), !(null != e && i in e)) return null;
                e = e[i]
            }
            return e
        }, e.prototype._sortBy = function (e, t, i) {
            var n;
            return n = function (e, n) {
                var s, r;
                return s = this._getObjectProperty(e, t), r = this._getObjectProperty(n, t), i ? s > r ? 1 : -1 : s < r ? 1 : -1
            }, e.sort(n.bind(this)), e
        }, e.prototype._filter = function (e, t) {
            var i, n, s, r, a;
            for (i = [], n = function (e) {
                if (t(e)) return i.push(e)
            }, s = 0, a = e.length; s < a; s++) r = e[s], n(r);
            return i
        }, e
    }(), function (e, t) {
        "function" == typeof define && define.amd ? define([], t) : "object" == typeof module && module.exports ? module.exports = t() : e.Instafeed = t()
    }(this, function () {
        return e
    })
}.call(this), function (e, t, i, n) {
    "use strict";
    e.jribbble = {};
    var s = null, r = ["animated", "attachments", "debuts", "playoffs", "rebounds", "teams"], a = {
        token: "Jribbble: Missing Dribbble access token. Set one with $.jribbble.accessToken = YOUR_ACCESS_TOKEN. If you do not have an access token, you must register a new application at https://dribbble.com/account/applications/new",
        singular: function (e) {
            return e.substr(0, e.length - 1)
        },
        idRequired: function (e) {
            return "Jribbble: You have to provide a " + this.singular(e) + ' ID. ex: $.jribbble.%@("1234").'.replace(/%@/g, e)
        },
        subResource: function (e) {
            return "Jribbble: You have to provide a " + this.singular(e) + ' ID to get %@. ex: $.jribbble.%@("1234").%@()'.replace(/%@/g, e)
        },
        shotId: function (e) {
            return "Jribbble: You have to provide a shot ID to get %@. ex: " + ' $.jribbble.shots("1234").%@()'.replace(/%@/g, e)
        },
        commentLikes: 'Jribbble: You have to provide a comment ID to get likes. ex:  $.jribbble.shots("1234").comments("456").likes()'
    }, o = function (e, t) {
        if (e && "object" != typeof e) return e;
        throw new Error(a.idRequired(t))
    }, l = function (e) {
        var t = {};
        return e.forEach(function (e) {
            t[e] = h.call(this, e)
        }.bind(this)), t
    }, u = function (t) {
        var i = e.param(t);
        return i ? "?" + i : ""
    }, c = function (e) {
        if (0 !== e.length) {
            var t = e[0], i = typeof t, n = {};
            return "number" === i || "string" === i ? r.indexOf(t) > -1 ? n.list = t : n.resource = t : "object" === i && (n = t), n
        }
    }, d = function () {
        var t = e.extend({}, e.Deferred());
        return t.queue = new function () {
            return this.methods = [], this.response = null, this.flushed = !1, this.add = function (e) {
                this.flushed ? e(this.scope) : this.methods.push(e)
            }, this.flush = function (e) {
                if (!this.flushed) {
                    for (this.scope = e, this.flushed = !0; this.methods[0];) this.methods.shift()(e);
                    return e
                }
            }, this
        }, t.url = "https://api.dribbble.com/v1", t.get = function () {
            return s ? (e.ajax({
                type: "GET", url: this.url, beforeSend: function (e) {
                    e.setRequestHeader("Authorization", "Bearer " + s)
                }, success: function (e) {
                    this.resolve(e)
                }.bind(this), error: function (e) {
                    this.reject(e)
                }.bind(this)
            }), this) : (console.error(a.token), !1)
        }, t
    }, p = function (t) {
        return function (i) {
            return e.extend(this, d()), this.queue.add(function (e) {
                e.url += "/" + t + "/" + i
            }), setTimeout(function () {
                this.queue.flush(this).get()
            }.bind(this)), this
        }
    }, h = function (e) {
        return function (t) {
            return this.queue.add(function (i) {
                i.url += "/" + e + "/" + u(t || {})
            }), this
        }
    };
    e.jribbble.shots = function (t, i) {
        var n = c([].slice.call(arguments)) || {}, s = i || {}, r = function (t) {
            return function (i, n) {
                var s = c([].slice.call(arguments)) || {}, r = n || {};
                return this.queue.add(function (i) {
                    if (!i.shotId) throw new Error(a.shotId(t));
                    i.url += "/" + t + "/", s.resource && (i.url += s.resource, delete s.resource), i.url += u(e.extend(s, r))
                }), this
            }
        }, o = function () {
            return e.extend(this, d()), this.url += "/shots/", this.queue.add(function (t) {
                n.resource && (t.shotId = n.resource, t.url += n.resource, delete n.resource), t.url += u(e.extend(n, s))
            }), setTimeout(function () {
                this.queue.flush(this).get()
            }.bind(this)), this
        };
        return o.prototype.attachments = r("attachments"), o.prototype.buckets = r("buckets"), o.prototype.likes = r("likes"), o.prototype.projects = r("projects"), o.prototype.rebounds = r("rebounds"), o.prototype.comments = function (t, i) {
            var n = c([].slice.call(arguments)) || {}, s = i || {};
            return this.queue.add(function (t) {
                if (!t.shotId) throw new Error(a.shotId("comments"));
                t.url += "/comments/", n.resource && (t.commentId = n.resource, t.url += n.resource + "/", delete n.resource), t.url += u(e.extend(n, s))
            }), this.likes = function (e) {
                var t = e || {};
                return this.queue.add(function (e) {
                    if (!e.commentId) throw new Error(a.commentLikes);
                    e.url += "likes/" + u(t)
                }), this
            }, this
        }, new o
    }, e.jribbble.teams = function (e) {
        var t = "teams", i = o(e, t), n = p.call(this, t);
        return n.prototype = l.call(this, ["members", "shots"]), new n(i)
    }, e.jribbble.users = function (e) {
        var t = "users", i = o(e, t), n = p.call(this, t);
        return n.prototype = l.call(this, ["buckets", "followers", "following", "likes", "projects", "shots", "teams"]), n.prototype.isFollowing = function (e) {
            return this.queue.add(function (t) {
                t.url += "/following/" + e
            }), this
        }, new n(i)
    }, e.jribbble.buckets = function (e) {
        var t = "buckets", i = o(e, t), n = p.call(this, t);
        return n.prototype = l.call(this, ["shots"]), new n(i)
    }, e.jribbble.projects = function (e) {
        var t = "projects", i = o(e, t), n = p.call(this, t);
        return n.prototype = l.call(this, ["shots"]), new n(i)
    }, e.jribbble.setToken = function (e) {
        return s = e, this
    }
}(jQuery, window, document);
var ytp = ytp || {}, getYTPVideoID = function (e) {
    var t, i;
    return e.indexOf("youtu.be") > 0 ? (t = e.substr(e.lastIndexOf("/") + 1, e.length), i = t.indexOf("?list=") > 0 ? t.substr(t.lastIndexOf("="), t.length) : null, t = i ? t.substr(0, t.lastIndexOf("?")) : t) : e.indexOf("http") > -1 ? (t = e.match(/[\\?&]v=([^&#]*)/)[1], i = e.indexOf("list=") > 0 ? e.match(/[\\?&]list=([^&#]*)/)[1] : null) : (t = e.length > 15 ? null : e, i = t ? null : e), {
        videoID: t,
        playlistID: i
    }
};
!function (jQuery, ytp) {
    jQuery.mbYTPlayer = {
        name: "jquery.mb.YTPlayer",
        version: "3.0.10",
        build: "6087",
        author: "Matteo Bicocchi (pupunzi)",
        apiKey: "",
        defaults: {
            containment: "body",
            ratio: "auto",
            videoURL: null,
            playlistURL: null,
            startAt: 0,
            stopAt: 0,
            autoPlay: !0,
            vol: 50,
            addRaster: !1,
            mask: !1,
            opacity: 1,
            quality: "default",
            mute: !1,
            loop: !0,
            showControls: !0,
            showAnnotations: !1,
            showYTLogo: !0,
            stopMovieOnBlur: !0,
            realfullscreen: !0,
            mobileFallbackImage: null,
            gaTrack: !0,
            optimizeDisplay: !0,
            align: "center,center",
            onReady: function (e) {
            }
        },
        controls: {play: "P", pause: "p", mute: "M", unmute: "A", onlyYT: "O", showSite: "R", ytLogo: "Y"},
        controlBar: null,
        loading: null,
        locationProtocol: "https:",
        filters: {
            grayscale: {value: 0, unit: "%"},
            hue_rotate: {value: 0, unit: "deg"},
            invert: {value: 0, unit: "%"},
            opacity: {value: 0, unit: "%"},
            saturate: {value: 0, unit: "%"},
            sepia: {value: 0, unit: "%"},
            brightness: {value: 0, unit: "%"},
            contrast: {value: 0, unit: "%"},
            blur: {value: 0, unit: "px"}
        },
        buildPlayer: function (options) {
            return this.each(function () {
                var YTPlayer = this, $YTPlayer = jQuery(YTPlayer);
                YTPlayer.loop = 0, YTPlayer.opt = {}, YTPlayer.state = {}, YTPlayer.filters = jQuery.mbYTPlayer.filters, YTPlayer.filtersEnabled = !0, YTPlayer.id = YTPlayer.id || "YTP_" + (new Date).getTime(), $YTPlayer.addClass("mb_YTPlayer");
                var property = $YTPlayer.data("property") && "string" == typeof $YTPlayer.data("property") ? eval("(" + $YTPlayer.data("property") + ")") : $YTPlayer.data("property");
                void 0 !== property && void 0 !== property.vol && (property.vol = 0 === property.vol ? property.vol = 1 : property.vol), jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property), YTPlayer.hasChanged || (YTPlayer.defaultOpt = {}, jQuery.extend(YTPlayer.defaultOpt, jQuery.mbYTPlayer.defaults, options)), "true" == YTPlayer.opt.loop && (YTPlayer.opt.loop = 9999), YTPlayer.isRetina = window.retina || window.devicePixelRatio > 1;
                var isIframe = function () {
                    var e = !1;
                    try {
                        self.location.href != top.location.href && (e = !0)
                    } catch (t) {
                        e = !0
                    }
                    return e
                };
                YTPlayer.canGoFullScreen = !(jQuery.browser.msie || jQuery.browser.opera || isIframe()), YTPlayer.canGoFullScreen || (YTPlayer.opt.realfullscreen = !1), $YTPlayer.attr("id") || $YTPlayer.attr("id", "ytp_" + (new Date).getTime());
                var playerID = "mbYTP_" + YTPlayer.id;
                YTPlayer.isAlone = !1, YTPlayer.hasFocus = !0, YTPlayer.videoID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).videoID : !!$YTPlayer.attr("href") && getYTPVideoID($YTPlayer.attr("href")).videoID, YTPlayer.playlistID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).playlistID : !!$YTPlayer.attr("href") && getYTPVideoID($YTPlayer.attr("href")).playlistID, YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? "0" : "3";
                var playerVars = {
                    modestbranding: 1,
                    autoplay: 0,
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    enablejsapi: 1,
                    version: 3,
                    playerapiid: playerID,
                    origin: "*",
                    allowfullscreen: !0,
                    wmode: "transparent",
                    iv_load_policy: YTPlayer.opt.showAnnotations
                };
                if (document.createElement("video").canPlayType && jQuery.extend(playerVars, {html5: 1}), jQuery.browser.msie && jQuery.browser.version < 9 && (this.opt.opacity = 1), YTPlayer.isSelf = "self" == YTPlayer.opt.containment, YTPlayer.defaultOpt.containment = YTPlayer.opt.containment = jQuery("self" == YTPlayer.opt.containment ? this : YTPlayer.opt.containment), YTPlayer.isBackground = YTPlayer.opt.containment.is("body"), !YTPlayer.isBackground || !ytp.backgroundIsInited) {
                    var isPlayer = YTPlayer.opt.containment.is(jQuery(this));
                    YTPlayer.canPlayOnMobile = isPlayer && 0 === jQuery(this).children().length, YTPlayer.isPlayer = !1, isPlayer ? YTPlayer.isPlayer = !0 : $YTPlayer.hide();
                    var overlay = jQuery("<div/>").css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }).addClass("YTPOverlay");
                    YTPlayer.isPlayer && overlay.on("click", function () {
                        $YTPlayer.YTPTogglePlay()
                    });
                    var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + playerID);
                    wrapper.css({
                        position: "absolute",
                        zIndex: 0,
                        minWidth: "100%",
                        minHeight: "100%",
                        left: 0,
                        top: 0,
                        overflow: "hidden",
                        opacity: 0
                    });
                    var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox");
                    if (playerBox.css({
                            position: "absolute",
                            zIndex: 0,
                            width: "100%",
                            height: "100%",
                            top: 0,
                            left: 0,
                            overflow: "hidden"
                        }), wrapper.append(playerBox), YTPlayer.opt.containment.children().not("script, style").each(function () {
                            "static" == jQuery(this).css("position") && jQuery(this).css("position", "relative")
                        }), YTPlayer.isBackground ? (jQuery("body").css({boxSizing: "border-box"}), wrapper.css({
                            position: "fixed",
                            top: 0,
                            left: 0,
                            zIndex: 0
                        }), $YTPlayer.hide()) : "static" == YTPlayer.opt.containment.css("position") && YTPlayer.opt.containment.css({position: "relative"}), YTPlayer.opt.containment.prepend(wrapper), YTPlayer.wrapper = wrapper, playerBox.css({opacity: 1}), jQuery.browser.mobile || (playerBox.after(overlay), YTPlayer.overlay = overlay), YTPlayer.isBackground || overlay.on("mouseenter", function () {
                            YTPlayer.controlBar && YTPlayer.controlBar.length && YTPlayer.controlBar.addClass("visible")
                        }).on("mouseleave", function () {
                            YTPlayer.controlBar && YTPlayer.controlBar.length && YTPlayer.controlBar.removeClass("visible")
                        }), ytp.YTAPIReady) setTimeout(function () {
                        jQuery(document).trigger("YTAPIReady")
                    }, 100); else {
                        jQuery("#YTAPI").remove();
                        var tag = jQuery("<script><\/script>").attr({
                            src: jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/iframe_api?v=" + jQuery.mbYTPlayer.version,
                            id: "YTAPI"
                        });
                        jQuery("head").prepend(tag)
                    }
                    if (jQuery.browser.mobile && !YTPlayer.canPlayOnMobile) return YTPlayer.opt.mobileFallbackImage && wrapper.css({
                        backgroundImage: "url(" + YTPlayer.opt.mobileFallbackImage + ")",
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        opacity: 1
                    }), $YTPlayer.remove(), void jQuery(document).trigger("YTPUnavailable");
                    jQuery(document).on("YTAPIReady", function () {
                        YTPlayer.isBackground && ytp.backgroundIsInited || YTPlayer.isInit || (YTPlayer.isBackground && (ytp.backgroundIsInited = !0), YTPlayer.opt.autoPlay = void 0 === YTPlayer.opt.autoPlay ? !!YTPlayer.isBackground : YTPlayer.opt.autoPlay, YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100, jQuery.mbYTPlayer.getDataFromAPI(YTPlayer), jQuery(YTPlayer).on("YTPChanged", function () {
                            if (!YTPlayer.isInit) {
                                if (YTPlayer.isInit = !0, jQuery.browser.mobile && YTPlayer.canPlayOnMobile) {
                                    if (YTPlayer.opt.containment.outerWidth() > jQuery(window).width()) {
                                        YTPlayer.opt.containment.css({maxWidth: "100%"});
                                        var h = .563 * YTPlayer.opt.containment.outerWidth();
                                        YTPlayer.opt.containment.css({maxHeight: h})
                                    }
                                    return void new YT.Player(playerID, {
                                        videoId: YTPlayer.videoID.toString(),
                                        width: "100%",
                                        height: h,
                                        playerVars: playerVars,
                                        events: {
                                            onReady: function (e) {
                                                YTPlayer.player = e.target, playerBox.css({opacity: 1}), YTPlayer.wrapper.css({opacity: 1})
                                            }
                                        }
                                    })
                                }
                                new YT.Player(playerID, {
                                    videoId: YTPlayer.videoID.toString(),
                                    playerVars: playerVars,
                                    events: {
                                        onReady: function (e) {
                                            YTPlayer.player = e.target, YTPlayer.isReady || (YTPlayer.isReady = !(YTPlayer.isPlayer && !YTPlayer.opt.autoPlay), YTPlayer.playerEl = YTPlayer.player.getIframe(), jQuery(YTPlayer.playerEl).unselectable(), $YTPlayer.optimizeDisplay(), jQuery(window).off("resize.YTP_" + YTPlayer.id).on("resize.YTP_" + YTPlayer.id, function () {
                                                $YTPlayer.optimizeDisplay()
                                            }), jQuery.mbYTPlayer.checkForState(YTPlayer))
                                        }, onStateChange: function (event) {
                                            if ("function" == typeof event.target.getPlayerState) {
                                                var state = event.target.getPlayerState();
                                                if (YTPlayer.preventTrigger) return void(YTPlayer.preventTrigger = !1);
                                                YTPlayer.state = state;
                                                var eventType;
                                                switch (state) {
                                                    case-1:
                                                        eventType = "YTPUnstarted";
                                                        break;
                                                    case 0:
                                                        eventType = "YTPEnd";
                                                        break;
                                                    case 1:
                                                        eventType = "YTPPlay", YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.pause), "undefined" != typeof _gaq && eval(YTPlayer.opt.gaTrack) && _gaq.push(["_trackEvent", "YTPlayer", "Play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()]), "undefined" != typeof ga && eval(YTPlayer.opt.gaTrack) && ga("send", "event", "YTPlayer", "play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString());
                                                        break;
                                                    case 2:
                                                        eventType = "YTPPause", YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                                        break;
                                                    case 3:
                                                        YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality), eventType = "YTPBuffering", YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                                        break;
                                                    case 5:
                                                        eventType = "YTPCued"
                                                }
                                                var YTPEvent = jQuery.Event(eventType);
                                                YTPEvent.time = YTPlayer.currentTime, YTPlayer.canTrigger && jQuery(YTPlayer).trigger(YTPEvent)
                                            }
                                        }, onPlaybackQualityChange: function (e) {
                                            var t = e.target.getPlaybackQuality(), i = jQuery.Event("YTPQualityChange");
                                            i.quality = t, jQuery(YTPlayer).trigger(i)
                                        }, onError: function (e) {
                                            150 == e.data && (console.log("Embedding this video is restricted by Youtube."), YTPlayer.isPlayList && jQuery(YTPlayer).playNext()), 2 == e.data && YTPlayer.isPlayList && jQuery(YTPlayer).playNext(), "function" == typeof YTPlayer.opt.onError && YTPlayer.opt.onError($YTPlayer, e)
                                        }
                                    }
                                })
                            }
                        }))
                    }), $YTPlayer.off("YTPTime.mask"), jQuery.mbYTPlayer.applyMask(YTPlayer)
                }
            })
        },
        getDataFromAPI: function (e) {
            if (e.videoData = jQuery.mbStorage.get("YTPlayer_data_" + e.videoID), jQuery(e).off("YTPData.YTPlayer").on("YTPData.YTPlayer", function () {
                    if (e.hasData && e.isPlayer && !e.opt.autoPlay) {
                        var t = e.videoData.thumb_max || e.videoData.thumb_high || e.videoData.thumb_medium;
                        e.opt.containment.css({
                            background: "rgba(0,0,0,0.5) url(" + t + ") center center",
                            backgroundSize: "cover"
                        }), e.opt.backgroundUrl = t
                    }
                }), e.videoData) setTimeout(function () {
                e.opt.ratio = "auto" == e.opt.ratio ? "16/9" : e.opt.ratio, e.dataReceived = !0, jQuery(e).trigger("YTPChanged");
                var t = jQuery.Event("YTPData");
                t.prop = {};
                for (var i in e.videoData) t.prop[i] = e.videoData[i];
                jQuery(e).trigger(t)
            }, 500), e.hasData = !0; else if (jQuery.mbYTPlayer.apiKey) jQuery.getJSON(jQuery.mbYTPlayer.locationProtocol + "//www.googleapis.com/youtube/v3/videos?id=" + e.videoID + "&key=" + jQuery.mbYTPlayer.apiKey + "&part=snippet", function (t) {
                e.dataReceived = !0, jQuery(e).trigger("YTPChanged"), function (t) {
                    e.videoData = {}, e.videoData.id = e.videoID, e.videoData.channelTitle = t.channelTitle, e.videoData.title = t.title, e.videoData.description = t.description.length < 400 ? t.description : t.description.substring(0, 400) + " ...", e.videoData.aspectratio = "auto" == e.opt.ratio ? "16/9" : e.opt.ratio, e.opt.ratio = e.videoData.aspectratio, e.videoData.thumb_max = t.thumbnails.maxres ? t.thumbnails.maxres.url : null, e.videoData.thumb_high = t.thumbnails.high ? t.thumbnails.high.url : null, e.videoData.thumb_medium = t.thumbnails.medium ? t.thumbnails.medium.url : null, jQuery.mbStorage.set("YTPlayer_data_" + e.videoID, e.videoData)
                }(t.items[0].snippet), e.hasData = !0;
                var i = jQuery.Event("YTPData");
                i.prop = {};
                for (var n in e.videoData) i.prop[n] = e.videoData[n];
                jQuery(e).trigger(i)
            }); else {
                if (setTimeout(function () {
                        jQuery(e).trigger("YTPChanged")
                    }, 50), e.isPlayer && !e.opt.autoPlay) {
                    var t = jQuery.mbYTPlayer.locationProtocol + "//i.ytimg.com/vi/" + e.videoID + "/hqdefault.jpg";
                    e.opt.containment.css({
                        background: "rgba(0,0,0,0.5) url(" + t + ") center center",
                        backgroundSize: "cover"
                    }), e.opt.backgroundUrl = t
                }
                e.videoData = null, e.opt.ratio = "auto" == e.opt.ratio ? "16/9" : e.opt.ratio
            }
            !e.isPlayer || e.opt.autoPlay || jQuery.browser.mobile || (e.loading = jQuery("<div/>").addClass("loading").html("Loading").hide(), jQuery(e).append(e.loading), e.loading.fadeIn())
        },
        removeStoredData: function () {
            jQuery.mbStorage.remove()
        },
        getVideoData: function () {
            return this.get(0).videoData
        },
        getVideoID: function () {
            return this.get(0).videoID || !1
        },
        setVideoQuality: function (e) {
            this.get(0).player.setPlaybackQuality(e)
        },
        playlist: function (e, t, i, n) {
            var s = this.get(0);
            return s.isPlayList = !0, t && (e = jQuery.shuffle(e)), s.videoID || (s.videos = e, s.videoCounter = 0, s.videoLength = e.length, jQuery(s).data("property", e[0]), jQuery(s).mb_YTPlayer()), "function" == typeof i && jQuery(s).one("YTPChanged", function () {
                i(s)
            }), jQuery(s).on("YTPEnd", function () {
                n = void 0 === n || n, jQuery(s).playNext(n)
            }), this
        },
        playNext: function (e) {
            var t = this.get(0);
            return t.checkForStartAt && (clearTimeout(t.checkForStartAt), clearInterval(t.getState)), ++t.videoCounter >= t.videoLength && e && (t.videoCounter = 0), t.videoCounter < t.videoLength ? jQuery(t).changeMovie(t.videos[t.videoCounter]) : t.videoCounter--, this
        },
        playPrev: function () {
            var e = this.get(0);
            return e.checkForStartAt && (clearInterval(e.checkForStartAt), clearInterval(e.getState)), --e.videoCounter < 0 && (e.videoCounter = e.videoLength - 1), jQuery(e).changeMovie(e.videos[e.videoCounter]), this
        },
        playIndex: function (e) {
            var t = this.get(0);
            return e -= 1, t.checkForStartAt && (clearInterval(t.checkForStartAt), clearInterval(t.getState)), t.videoCounter = e, t.videoCounter >= t.videoLength - 1 && (t.videoCounter = t.videoLength - 1), jQuery(t).changeMovie(t.videos[t.videoCounter]), this
        },
        changeMovie: function (e) {
            var t = this.get(0);
            t.opt.startAt = 0, t.opt.stopAt = 0, t.opt.mask = !1, t.opt.mute = !0, t.hasData = !1, t.hasChanged = !0, t.player.loopTime = void 0, e && jQuery.extend(t.opt, e), t.videoID = getYTPVideoID(t.opt.videoURL).videoID, "true" == t.opt.loop && (t.opt.loop = 9999), jQuery(t.playerEl).CSSAnimate({opacity: 0}, 200, function () {
                var e = jQuery.Event("YTPChangeMovie");
                e.time = t.currentTime, e.videoId = t.videoID, jQuery(t).trigger(e), jQuery(t).YTPGetPlayer().cueVideoByUrl(encodeURI(jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + t.videoID), 1, t.opt.quality), jQuery(t).optimizeDisplay(), jQuery.mbYTPlayer.checkForState(t), jQuery.mbYTPlayer.getDataFromAPI(t)
            }), jQuery.mbYTPlayer.applyMask(t)
        },
        getPlayer: function () {
            return jQuery(this).get(0).player
        },
        playerDestroy: function () {
            var e = this.get(0);
            return ytp.YTAPIReady = !0, ytp.backgroundIsInited = !1, e.isInit = !1, e.videoID = null, e.isReady = !1, e.wrapper.remove(), jQuery("#controlBar_" + e.id).remove(), clearInterval(e.checkForStartAt), clearInterval(e.getState), this
        },
        fullscreen: function (real) {
            function hideMouse() {
                YTPlayer.overlay.css({cursor: "none"})
            }

            function RunPrefixMethod(e, t) {
                for (var i, n, s = ["webkit", "moz", "ms", "o", ""], r = 0; r < s.length && !e[i];) {
                    if (i = t, "" == s[r] && (i = i.substr(0, 1).toLowerCase() + i.substr(1)), i = s[r] + i, "undefined" != (n = typeof e[i])) return s = [s[r]], "function" == n ? e[i]() : e[i];
                    r++
                }
            }

            function launchFullscreen(e) {
                RunPrefixMethod(e, "RequestFullScreen")
            }

            function cancelFullscreen() {
                (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) && RunPrefixMethod(document, "CancelFullScreen")
            }

            var YTPlayer = this.get(0);
            void 0 === real && (real = YTPlayer.opt.realfullscreen), real = eval(real);
            var controls = jQuery("#controlBar_" + YTPlayer.id), fullScreenBtn = controls.find(".mb_OnlyYT"),
                videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
            if (real) {
                var fullscreenchange = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
                jQuery(document).off(fullscreenchange).on(fullscreenchange, function () {
                    RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen") ? (jQuery(YTPlayer).YTPSetVideoQuality("default"), jQuery(YTPlayer).trigger("YTPFullScreenStart")) : (YTPlayer.isAlone = !1, fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), jQuery(YTPlayer).YTPSetVideoQuality(YTPlayer.opt.quality), videoWrapper.removeClass("YTPFullscreen"), videoWrapper.CSSAnimate({opacity: YTPlayer.opt.opacity}, 500), videoWrapper.css({zIndex: 0}), YTPlayer.isBackground ? jQuery("body").after(controls) : YTPlayer.wrapper.before(controls), jQuery(window).resize(), jQuery(YTPlayer).trigger("YTPFullScreenEnd"))
                })
            }
            return YTPlayer.isAlone ? (jQuery(document).off("mousemove.YTPlayer"), clearTimeout(YTPlayer.hideCursor), YTPlayer.overlay.css({cursor: "auto"}), real ? cancelFullscreen() : (videoWrapper.CSSAnimate({opacity: YTPlayer.opt.opacity}, 500), videoWrapper.css({zIndex: 0})), fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), YTPlayer.isAlone = !1) : (jQuery(document).on("mousemove.YTPlayer", function (e) {
                YTPlayer.overlay.css({cursor: "auto"}), clearTimeout(YTPlayer.hideCursor), jQuery(e.target).parents().is(".mb_YTPBar") || (YTPlayer.hideCursor = setTimeout(hideMouse, 3e3))
            }), hideMouse(), real ? (videoWrapper.css({opacity: 0}), videoWrapper.addClass("YTPFullscreen"), launchFullscreen(videoWrapper.get(0)), setTimeout(function () {
                videoWrapper.CSSAnimate({opacity: 1}, 1e3), YTPlayer.wrapper.append(controls), jQuery(YTPlayer).optimizeDisplay(), YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, !0)
            }, 500)) : videoWrapper.css({zIndex: 1e4}).CSSAnimate({opacity: 1}, 1e3), fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite), YTPlayer.isAlone = !0), this
        },
        toggleLoops: function () {
            var e = this.get(0), t = e.opt;
            return 1 == t.loop ? t.loop = 0 : (t.startAt ? e.player.seekTo(t.startAt) : e.player.playVideo(), t.loop = 1), this
        },
        play: function () {
            var e = this.get(0);
            return e.isReady ? (e.player.playVideo(), e.wrapper.CSSAnimate({opacity: e.isAlone ? 1 : e.opt.opacity}, 2e3), jQuery(e.playerEl).CSSAnimate({opacity: 1}, 1e3), jQuery("#controlBar_" + e.id).find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.pause), e.state = 1, jQuery(e).css("background-image", "none"), this) : this
        },
        togglePlay: function (e) {
            var t = this.get(0);
            return 1 == t.state ? this.YTPPause() : this.YTPPlay(), "function" == typeof e && e(t.state), this
        },
        stop: function () {
            var e = this.get(0);
            return jQuery("#controlBar_" + e.id).find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play), e.player.stopVideo(), this
        },
        pause: function () {
            var e = this.get(0);
            return e.player.pauseVideo(), e.state = 2, this
        },
        seekTo: function (e) {
            return this.get(0).player.seekTo(e, !0), this
        },
        setVolume: function (e) {
            var t = this.get(0);
            return e || t.opt.vol || 0 != t.player.getVolume() ? !e && t.player.getVolume() > 0 || e && t.opt.vol == e ? t.isMute ? jQuery(t).YTPUnmute() : jQuery(t).YTPMute() : (t.opt.vol = e, t.player.setVolume(t.opt.vol), t.volumeBar && t.volumeBar.length && t.volumeBar.updateSliderVal(e)) : jQuery(t).YTPUnmute(), this
        },
        toggleVolume: function () {
            var e = this.get(0);
            if (e) return e.player.isMuted() ? (jQuery(e).YTPUnmute(), !0) : (jQuery(e).YTPMute(), !1)
        },
        mute: function () {
            var e = this.get(0);
            if (!e.isMute) {
                e.player.mute(), e.isMute = !0, e.player.setVolume(0), e.volumeBar && e.volumeBar.length && e.volumeBar.width() > 10 && e.volumeBar.updateSliderVal(0), jQuery("#controlBar_" + e.id).find(".mb_YTPMuteUnmute").html(jQuery.mbYTPlayer.controls.unmute), jQuery(e).addClass("isMuted"), e.volumeBar && e.volumeBar.length && e.volumeBar.addClass("muted");
                var t = jQuery.Event("YTPMuted");
                return t.time = e.currentTime, e.canTrigger && jQuery(e).trigger(t), this
            }
        },
        unmute: function () {
            var e = this.get(0);
            if (e.isMute) {
                e.player.unMute(), e.isMute = !1, e.player.setVolume(e.opt.vol), e.volumeBar && e.volumeBar.length && e.volumeBar.updateSliderVal(e.opt.vol > 10 ? e.opt.vol : 10), jQuery("#controlBar_" + e.id).find(".mb_YTPMuteUnmute").html(jQuery.mbYTPlayer.controls.mute), jQuery(e).removeClass("isMuted"), e.volumeBar && e.volumeBar.length && e.volumeBar.removeClass("muted");
                var t = jQuery.Event("YTPUnmuted");
                return t.time = e.currentTime, e.canTrigger && jQuery(e).trigger(t), this
            }
        },
        applyFilter: function (e, t) {
            return this.each(function () {
                var i = this;
                i.filters[e].value = t, i.filtersEnabled && jQuery(i).YTPEnableFilters()
            })
        },
        applyFilters: function (e) {
            return this.each(function () {
                var t = this;
                if (t.isReady) {
                    for (var i in e) jQuery(t).YTPApplyFilter(i, e[i]);
                    jQuery(t).trigger("YTPFiltersApplied")
                } else jQuery(t).on("YTPReady", function () {
                    jQuery(t).YTPApplyFilters(e)
                })
            })
        },
        toggleFilter: function (e, t) {
            return this.each(function () {
                var i = this;
                i.filters[e].value ? i.filters[e].value = 0 : i.filters[e].value = t, i.filtersEnabled && jQuery(this).YTPEnableFilters()
            })
        },
        toggleFilters: function (e) {
            return this.each(function () {
                var t = this;
                t.filtersEnabled ? (jQuery(t).trigger("YTPDisableFilters"), jQuery(t).YTPDisableFilters()) : (jQuery(t).YTPEnableFilters(), jQuery(t).trigger("YTPEnableFilters")), "function" == typeof e && e(t.filtersEnabled)
            })
        },
        disableFilters: function () {
            return this.each(function () {
                var e = this, t = jQuery(e.playerEl);
                t.css("-webkit-filter", ""), t.css("filter", ""), e.filtersEnabled = !1
            })
        },
        enableFilters: function () {
            return this.each(function () {
                var e = this, t = jQuery(e.playerEl), i = "";
                for (var n in e.filters) e.filters[n].value && (i += n.replace("_", "-") + "(" + e.filters[n].value + e.filters[n].unit + ") ");
                t.css("-webkit-filter", i), t.css("filter", i), e.filtersEnabled = !0
            })
        },
        removeFilter: function (e, t) {
            return this.each(function () {
                var i = this;
                if ("function" == typeof e && (t = e, e = null), e) jQuery(this).YTPApplyFilter(e, 0), "function" == typeof t && t(e); else for (var n in i.filters) jQuery(this).YTPApplyFilter(n, 0), "function" == typeof t && t(n)
            })
        },
        getFilters: function () {
            return this.get(0).filters
        },
        addMask: function (e) {
            var t = this.get(0), i = t.overlay;
            e || (e = t.actualMask);
            var n = jQuery("<img/>").attr("src", e).on("load", function () {
                i.CSSAnimate({opacity: 0}, 500, function () {
                    t.hasMask = !0, n.remove(), i.css({
                        backgroundImage: "url(" + e + ")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        backgroundSize: "cover"
                    }), i.CSSAnimate({opacity: 1}, 500)
                })
            });
            return this
        },
        removeMask: function () {
            var e = this.get(0), t = e.overlay;
            return t.CSSAnimate({opacity: 0}, 500, function () {
                e.hasMask = !1, t.css({
                    backgroundImage: "",
                    backgroundRepeat: "",
                    backgroundPosition: "",
                    backgroundSize: ""
                }), t.CSSAnimate({opacity: 1}, 500)
            }), this
        },
        applyMask: function (e) {
            var t = jQuery(e);
            if (t.off("YTPTime.mask"), e.opt.mask) if ("string" == typeof e.opt.mask) t.YTPAddMask(e.opt.mask), e.actualMask = e.opt.mask; else if ("object" == typeof e.opt.mask) {
                for (var i in e.opt.mask) e.opt.mask[i] && jQuery("<img/>").attr("src", e.opt.mask[i]);
                e.opt.mask[0] && t.YTPAddMask(e.opt.mask[0]), t.on("YTPTime.mask", function (i) {
                    for (var n in e.opt.mask) i.time == n && (e.opt.mask[n] ? (t.YTPAddMask(e.opt.mask[n]), e.actualMask = e.opt.mask[n]) : t.YTPRemoveMask())
                })
            }
        },
        toggleMask: function () {
            var e = this.get(0), t = $(e);
            return e.hasMask ? t.YTPRemoveMask() : t.YTPAddMask(), this
        },
        manageProgress: function () {
            var e = this.get(0), t = jQuery("#controlBar_" + e.id), i = t.find(".mb_YTPProgress"),
                n = t.find(".mb_YTPLoaded"), s = t.find(".mb_YTPseekbar"), r = i.outerWidth(),
                a = Math.floor(e.player.getCurrentTime()), o = Math.floor(e.player.getDuration()), l = a * r / o,
                u = 100 * e.player.getVideoLoadedFraction();
            return n.css({left: 0, width: u + "%"}), s.css({left: 0, width: l}), {totalTime: o, currentTime: a}
        },
        buildControls: function (YTPlayer) {
            var data = YTPlayer.opt;
            if (data.showYTLogo = data.showYTLogo || data.printUrl, !jQuery("#controlBar_" + YTPlayer.id).length) {
                YTPlayer.controlBar = jQuery("<span/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTPBar").css({
                    whiteSpace: "noWrap",
                    position: YTPlayer.isBackground ? "fixed" : "absolute",
                    zIndex: YTPlayer.isBackground ? 1e4 : 1e3
                }).hide();
                var buttonBar = jQuery("<div/>").addClass("buttonBar"),
                    playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTPPlaypause ytpicon").click(function () {
                        1 == YTPlayer.player.getPlayerState() ? jQuery(YTPlayer).YTPPause() : jQuery(YTPlayer).YTPPlay()
                    }),
                    MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTPMuteUnmute ytpicon").click(function () {
                        0 == YTPlayer.player.getVolume() ? jQuery(YTPlayer).YTPUnmute() : jQuery(YTPlayer).YTPMute()
                    }), volumeBar = jQuery("<div/>").addClass("mb_YTPVolumeBar").css({display: "inline-block"});
                YTPlayer.volumeBar = volumeBar;
                var idx = jQuery("<span/>").addClass("mb_YTPTime"), vURL = data.videoURL ? data.videoURL : "";
                vURL.indexOf("http") < 0 && (vURL = jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL);
                var movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTPUrl ytpicon").attr("title", "view on YouTube").on("click", function () {
                        window.open(vURL, "viewOnYT")
                    }),
                    onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function () {
                        jQuery(YTPlayer).YTPFullscreen(data.realfullscreen)
                    }),
                    progressBar = jQuery("<div/>").addClass("mb_YTPProgress").css("position", "absolute").click(function (e) {
                        timeBar.css({width: e.clientX - timeBar.offset().left}), YTPlayer.timeW = e.clientX - timeBar.offset().left, YTPlayer.controlBar.find(".mb_YTPLoaded").css({width: 0});
                        var t = Math.floor(YTPlayer.player.getDuration());
                        YTPlayer.goto = timeBar.outerWidth() * t / progressBar.outerWidth(), YTPlayer.player.seekTo(parseFloat(YTPlayer.goto), !0), YTPlayer.controlBar.find(".mb_YTPLoaded").css({width: 0})
                    }), loadedBar = jQuery("<div/>").addClass("mb_YTPLoaded").css("position", "absolute"),
                    timeBar = jQuery("<div/>").addClass("mb_YTPseekbar").css("position", "absolute");
                progressBar.append(loadedBar).append(timeBar), buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx), data.showYTLogo && buttonBar.append(movieUrl), (YTPlayer.isBackground || eval(YTPlayer.opt.realfullscreen) && !YTPlayer.isBackground) && buttonBar.append(onlyVideo), YTPlayer.controlBar.append(buttonBar).append(progressBar), YTPlayer.isBackground ? jQuery("body").after(YTPlayer.controlBar) : (YTPlayer.controlBar.addClass("inlinePlayer"), YTPlayer.wrapper.before(YTPlayer.controlBar)), volumeBar.simpleSlider({
                    initialval: YTPlayer.opt.vol,
                    scale: 100,
                    orientation: "h",
                    callback: function (e) {
                        0 == e.value ? jQuery(YTPlayer).YTPMute() : jQuery(YTPlayer).YTPUnmute(), YTPlayer.player.setVolume(e.value), YTPlayer.isMute || (YTPlayer.opt.vol = e.value)
                    }
                })
            }
        },
        checkForState: function (YTPlayer) {
            var interval = YTPlayer.opt.showControls ? 100 : 400;
            return clearInterval(YTPlayer.getState), jQuery.contains(document, YTPlayer) ? (jQuery.mbYTPlayer.checkForStart(YTPlayer), void(YTPlayer.getState = setInterval(function () {
                var prog = jQuery(YTPlayer).YTPManageProgress(), $YTPlayer = jQuery(YTPlayer), data = YTPlayer.opt,
                    startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1,
                    stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
                if (stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0, YTPlayer.currentTime != prog.currentTime) {
                    var YTPEvent = jQuery.Event("YTPTime");
                    YTPEvent.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(YTPEvent)
                }
                if (YTPlayer.currentTime = prog.currentTime, YTPlayer.totalTime = YTPlayer.player.getDuration(), 0 == YTPlayer.player.getVolume() ? $YTPlayer.addClass("isMuted") : $YTPlayer.removeClass("isMuted"), YTPlayer.opt.showControls && (prog.totalTime ? YTPlayer.controlBar.find(".mb_YTPTime").html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime)) : YTPlayer.controlBar.find(".mb_YTPTime").html("-- : -- / -- : --")), eval(YTPlayer.opt.stopMovieOnBlur) && (document.hasFocus() ? document.hasFocus() && !YTPlayer.hasFocus && -1 != YTPlayer.state && 0 != YTPlayer.state && (YTPlayer.hasFocus = !0, $YTPlayer.YTPPlay()) : 1 == YTPlayer.state && (YTPlayer.hasFocus = !1, $YTPlayer.YTPPause())), YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact ? (YTPlayer.controlBar.addClass("compact"), YTPlayer.isCompact = !0, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)) : YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact && (YTPlayer.controlBar.removeClass("compact"), YTPlayer.isCompact = !1, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)), 1 == YTPlayer.player.getPlayerState() && (parseFloat(YTPlayer.player.getDuration() - 1.5) < YTPlayer.player.getCurrentTime() || stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) > stopAt)) {
                    if (YTPlayer.isEnded) return;
                    if (YTPlayer.isEnded = !0, setTimeout(function () {
                            YTPlayer.isEnded = !1
                        }, 1e3), YTPlayer.isPlayList) {
                        if (!data.loop || data.loop > 0 && YTPlayer.player.loopTime === data.loop - 1) {
                            YTPlayer.player.loopTime = void 0, clearInterval(YTPlayer.getState);
                            var YTPEnd = jQuery.Event("YTPEnd");
                            return YTPEnd.time = YTPlayer.currentTime, void jQuery(YTPlayer).trigger(YTPEnd)
                        }
                    } else if (!data.loop || data.loop > 0 && YTPlayer.player.loopTime === data.loop - 1) return YTPlayer.player.loopTime = void 0, YTPlayer.preventTrigger = !0, YTPlayer.state = 2, jQuery(YTPlayer).YTPPause(), void YTPlayer.wrapper.CSSAnimate({opacity: 0}, 500, function () {
                        YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                        var e = jQuery.Event("YTPEnd");
                        e.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(e), YTPlayer.player.seekTo(startAt, !0), YTPlayer.isBackground || YTPlayer.opt.containment.css({
                            background: "rgba(0,0,0,0.5) url(" + YTPlayer.opt.backgroundUrl + ") center center",
                            backgroundSize: "cover"
                        })
                    });
                    YTPlayer.player.loopTime = YTPlayer.player.loopTime ? ++YTPlayer.player.loopTime : 1, startAt = startAt || 1, YTPlayer.preventTrigger = !0, YTPlayer.state = 2, jQuery(YTPlayer).YTPPause(), YTPlayer.player.seekTo(startAt, !0), $YTPlayer.YTPPlay()
                }
            }, interval))) : (jQuery(YTPlayer).YTPPlayerDestroy(), clearInterval(YTPlayer.getState), void clearInterval(YTPlayer.checkForStartAt))
        },
        getTime: function () {
            var e = this.get(0);
            return jQuery.mbYTPlayer.formatTime(e.currentTime)
        },
        getTotalTime: function () {
            var e = this.get(0);
            return jQuery.mbYTPlayer.formatTime(e.totalTime)
        },
        checkForStart: function (e) {
            var t = jQuery(e);
            if (jQuery.contains(document, e)) {
                if (e.preventTrigger = !0, e.state = 2, jQuery(e).YTPPause(), jQuery(e).muteYTPVolume(), jQuery("#controlBar_" + e.id).remove(), e.controlBar = !1, e.opt.showControls && jQuery.mbYTPlayer.buildControls(e), e.opt.addRaster) {
                    var i = "dot" == e.opt.addRaster ? "raster-dot" : "raster";
                    e.overlay.addClass(e.isRetina ? i + " retina" : i)
                } else e.overlay.removeClass(function (e, t) {
                    var i = t.split(" "), n = [];
                    return jQuery.each(i, function (e, t) {
                        /raster.*/.test(t) && n.push(t)
                    }), n.push("retina"), n.join(" ")
                });
                var n = e.opt.startAt ? e.opt.startAt : 1;
                e.player.playVideo(), e.player.seekTo(n, !0), e.checkForStartAt = setInterval(function () {
                    jQuery(e).YTPMute();
                    var i = e.player.getVideoLoadedFraction() >= n / e.player.getDuration();
                    if (e.player.getDuration() > 0 && e.player.getCurrentTime() >= n && i) {
                        clearInterval(e.checkForStartAt), "function" == typeof e.opt.onReady && e.opt.onReady(e), e.isReady = !0;
                        var s = jQuery.Event("YTPReady");
                        if (s.time = e.currentTime, jQuery(e).trigger(s), e.preventTrigger = !0, e.state = 2, jQuery(e).YTPPause(), e.opt.mute || jQuery(e).YTPUnmute(), e.canTrigger = !0, e.opt.autoPlay) {
                            var r = jQuery.Event("YTPStart");
                            r.time = e.currentTime, jQuery(e).trigger(r), t.css("background-image", "none"), jQuery(e.playerEl).CSSAnimate({opacity: 1}, 1e3), t.YTPPlay(), e.wrapper.CSSAnimate({opacity: e.isAlone ? 1 : e.opt.opacity}, 1e3), jQuery.browser.safari && (e.safariPlay = setInterval(function () {
                                1 != e.state ? t.YTPPlay() : clearInterval(e.safariPlay)
                            }, 10)), t.on("YTPReady", function () {
                                t.YTPPlay()
                            })
                        } else e.player.pauseVideo(), e.isPlayer || (jQuery(e.playerEl).CSSAnimate({opacity: 1}, 500), e.wrapper.CSSAnimate({opacity: e.isAlone ? 1 : e.opt.opacity}, 500)), e.controlBar.length && e.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                        e.isPlayer && !e.opt.autoPlay && e.loading && e.loading.length && (e.loading.html("Ready"), setTimeout(function () {
                            e.loading.fadeOut()
                        }, 100)), e.controlBar && e.controlBar.length && e.controlBar.slideDown(1e3)
                    } else jQuery.browser.safari && (e.player.playVideo(), n >= 0 && e.player.seekTo(n, !0))
                }, 1)
            } else jQuery(e).YTPPlayerDestroy()
        },
        setAlign: function (e) {
            this.optimizeDisplay(e)
        },
        getAlign: function () {
            return this.get(0).opt.align
        },
        formatTime: function (e) {
            var t = Math.floor(e / 60), i = Math.floor(e - 60 * t);
            return (9 >= t ? "0" + t : t) + " : " + (9 >= i ? "0" + i : i)
        }
    }, jQuery.fn.optimizeDisplay = function (e) {
        var t = this.get(0), i = jQuery(t.playerEl), n = {};
        t.opt.align = e || t.opt.align, t.opt.align = "undefined " != typeof t.opt.align ? t.opt.align : "center,center";
        var s = t.opt.align.split(",");
        if (t.opt.optimizeDisplay) {
            var r = t.isPlayer ? 0 : 80, a = {}, o = t.wrapper;
            a.width = o.outerWidth(), a.height = o.outerHeight() + r, n.width = a.width, n.height = "16/9" == t.opt.ratio ? Math.ceil(n.width * (9 / 16)) : Math.ceil(.75 * n.width), n.marginTop = -(n.height - a.height) / 2, n.marginLeft = 0;
            var l = n.height < a.height;
            l && (n.height = a.height, n.width = "16/9" == t.opt.ratio ? Math.floor(n.height * (16 / 9)) : Math.floor(n.height * (4 / 3)), n.marginTop = 0, n.marginLeft = -(n.width - a.width) / 2);
            for (var u in s) if (s.hasOwnProperty(u)) switch (s[u].replace(/ /g, "")) {
                case"top":
                    n.marginTop = l ? -(n.height - a.height) / 2 : 0;
                    break;
                case"bottom":
                    n.marginTop = l ? 0 : -(n.height - a.height);
                    break;
                case"left":
                    n.marginLeft = 0;
                    break;
                case"right":
                    n.marginLeft = l ? -(n.width - a.width) : 0;
                    break;
                default:
                    n.width > a.width && (n.marginLeft = -(n.width - a.width) / 2)
            }
        } else n.width = "100%", n.height = "100%", n.marginTop = 0, n.marginLeft = 0;
        i.css({width: n.width, height: n.height, marginTop: n.marginTop, marginLeft: n.marginLeft, maxWidth: "initial"})
    }, jQuery.shuffle = function (e) {
        for (var t = e.slice(), i = t.length, n = i; n--;) {
            var s = parseInt(Math.random() * i), r = t[n];
            t[n] = t[s], t[s] = r
        }
        return t
    }, jQuery.fn.unselectable = function () {
        return this.each(function () {
            jQuery(this).css({
                "-moz-user-select": "none",
                "-webkit-user-select": "none",
                "user-select": "none"
            }).attr("unselectable", "on")
        })
    }, jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play, jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay, jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop, jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause, jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo, jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist, jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext, jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.YTPPlayIndex = jQuery.mbYTPlayer.playIndex, jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute, jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute, jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume, jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData, jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter, jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters, jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter, jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters, jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter, jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters, jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters, jQuery.fn.YTPGetFilters = jQuery.mbYTPlayer.getFilters, jQuery.fn.YTPGetTime = jQuery.mbYTPlayer.getTime, jQuery.fn.YTPGetTotalTime = jQuery.mbYTPlayer.getTotalTime, jQuery.fn.YTPAddMask = jQuery.mbYTPlayer.addMask, jQuery.fn.YTPRemoveMask = jQuery.mbYTPlayer.removeMask, jQuery.fn.YTPToggleMask = jQuery.mbYTPlayer.toggleMask, jQuery.fn.YTPSetAlign = jQuery.mbYTPlayer.setAlign, jQuery.fn.YTPGetAlign = jQuery.mbYTPlayer.getAlign, jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.playNext = jQuery.mbYTPlayer.playNext, jQuery.fn.playPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildControls, jQuery.fn.playYTP = jQuery.mbYTPlayer.play, jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.stopYTP = jQuery.mbYTPlayer.stop, jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pause, jQuery.fn.seekToYTP = jQuery.mbYTPlayer.seekTo, jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.mute, jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmute, jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPGetDataFromFeed = jQuery.mbYTPlayer.getVideoData
}(jQuery, ytp), jQuery.support.CSStransition = function () {
    var e = (document.body || document.documentElement).style;
    return void 0 !== e.transition || void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.MsTransition || void 0 !== e.OTransition
}(), jQuery.CSS = {
    name: "mb.CSSAnimate",
    author: "Matteo Bicocchi",
    version: "2.0.0",
    transitionEnd: "transitionEnd",
    sfx: "",
    filters: {
        blur: {min: 0, max: 100, unit: "px"},
        brightness: {min: 0, max: 400, unit: "%"},
        contrast: {min: 0, max: 400, unit: "%"},
        grayscale: {min: 0, max: 100, unit: "%"},
        hueRotate: {min: 0, max: 360, unit: "deg"},
        invert: {min: 0, max: 100, unit: "%"},
        saturate: {min: 0, max: 400, unit: "%"},
        sepia: {min: 0, max: 100, unit: "%"}
    },
    normalizeCss: function (e) {
        var t = jQuery.extend(!0, {}, e);
        jQuery.browser.webkit || jQuery.browser.opera ? jQuery.CSS.sfx = "-webkit-" : jQuery.browser.mozilla ? jQuery.CSS.sfx = "-moz-" : jQuery.browser.msie && (jQuery.CSS.sfx = "-ms-");
        for (var i in t) {
            "transform" === i && (t[jQuery.CSS.sfx + "transform"] = t[i], delete t[i]), "transform-origin" === i && (t[jQuery.CSS.sfx + "transform-origin"] = e[i], delete t[i]), "filter" !== i || jQuery.browser.mozilla || (t[jQuery.CSS.sfx + "filter"] = e[i], delete t[i]), "blur" === i && setFilter(t, "blur", e[i]), "brightness" === i && setFilter(t, "brightness", e[i]), "contrast" === i && setFilter(t, "contrast", e[i]), "grayscale" === i && setFilter(t, "grayscale", e[i]), "hueRotate" === i && setFilter(t, "hueRotate", e[i]), "invert" === i && setFilter(t, "invert", e[i]), "saturate" === i && setFilter(t, "saturate", e[i]), "sepia" === i && setFilter(t, "sepia", e[i]);
            var n = "";
            "x" === i && (n = jQuery.CSS.sfx + "transform", t[n] = t[n] || "", t[n] += " translateX(" + setUnit(e[i], "px") + ")", delete t[i]), "y" === i && (n = jQuery.CSS.sfx + "transform", t[n] = t[n] || "", t[n] += " translateY(" + setUnit(e[i], "px") + ")", delete t[i]), "z" === i && (n = jQuery.CSS.sfx + "transform", t[n] = t[n] || "", t[n] += " translateZ(" + setUnit(e[i], "px") + ")", delete t[i]), "rotate" === i && (n = jQuery.CSS.sfx + "transform", t[n] = t[n] || "", t[n] += " rotate(" + setUnit(e[i], "deg") + ")", delete t[i]), "rotateX" === i && (n = jQuery.CSS.sfx + "transform", t[n] = t[n] || "", t[n] += " rotateX(" + setUnit(e[i], "deg") + ")", delete t[i]), "rotateY" === i && (n = jQuery.CSS.sfx + "transform", t[n] = t[n] || "", t[n] += " rotateY(" + setUnit(e[i], "deg") + ")", delete t[i]), "rotateZ" === i && (n = jQuery.CSS.sfx + "transform", t[n] = t[n] || "", t[n] += " rotateZ(" + setUnit(e[i], "deg") + ")", delete t[i]), "scale" === i && (n = jQuery.CSS.sfx + "transform", t[n] = t[n] || "", t[n] += " scale(" + setUnit(e[i], "") + ")", delete t[i]), "scaleX" === i && (n = jQuery.CSS.sfx + "transform", t[n] = t[n] || "", t[n] += " scaleX(" + setUnit(e[i], "") + ")", delete t[i]), "scaleY" === i && (n = jQuery.CSS.sfx + "transform", t[n] = t[n] || "", t[n] += " scaleY(" + setUnit(e[i], "") + ")", delete t[i]), "scaleZ" === i && (n = jQuery.CSS.sfx + "transform", t[n] = t[n] || "", t[n] += " scaleZ(" + setUnit(e[i], "") + ")", delete t[i]), "skew" === i && (n = jQuery.CSS.sfx + "transform", t[n] = t[n] || "", t[n] += " skew(" + setUnit(e[i], "deg") + ")", delete t[i]), "skewX" === i && (n = jQuery.CSS.sfx + "transform", t[n] = t[n] || "", t[n] += " skewX(" + setUnit(e[i], "deg") + ")", delete t[i]), "skewY" === i && (n = jQuery.CSS.sfx + "transform", t[n] = t[n] || "", t[n] += " skewY(" + setUnit(e[i], "deg") + ")", delete t[i]), "perspective" === i && (n = jQuery.CSS.sfx + "transform", t[n] = t[n] || "", t[n] += " perspective(" + setUnit(e[i], "px") + ")", delete t[i])
        }
        return t
    },
    getProp: function (e) {
        var t = [];
        for (var i in e) t.indexOf(i) < 0 && t.push(uncamel(i));
        return t.join(",")
    },
    animate: function (e, t, i, n, s) {
        return this.each(function () {
            function r() {
                a.called = !0, a.CSSAIsRunning = !1, o.off(jQuery.CSS.transitionEnd + "." + a.id), clearTimeout(a.timeout), o.css(jQuery.CSS.sfx + "transition", ""), "function" == typeof s && s.apply(a), "function" == typeof a.CSSqueue && (a.CSSqueue(), a.CSSqueue = null)
            }

            var a = this, o = jQuery(this);
            a.id = a.id || "CSSA_" + (new Date).getTime();
            var l = l || {type: "noEvent"};
            if (a.CSSAIsRunning && a.eventType == l.type && !jQuery.browser.msie && jQuery.browser.version <= 9) a.CSSqueue = function () {
                o.CSSAnimate(e, t, i, n, s)
            }; else if (a.CSSqueue = null, a.eventType = l.type, 0 !== o.length && e) {
                if (e = jQuery.normalizeCss(e), a.CSSAIsRunning = !0, "function" == typeof t && (s = t, t = jQuery.fx.speeds._default), "function" == typeof i && (n = i, i = 0), "string" == typeof i && (s = i, i = 0), "function" == typeof n && (s = n, n = "cubic-bezier(0.65,0.03,0.36,0.72)"), "string" == typeof t) for (var u in jQuery.fx.speeds) {
                    if (t == u) {
                        t = jQuery.fx.speeds[u];
                        break
                    }
                    t = jQuery.fx.speeds._default
                }
                if (t || (t = jQuery.fx.speeds._default), "string" == typeof s && (n = s, s = null), !jQuery.support.CSStransition) {
                    for (var c in e) {
                        if ("transform" === c && delete e[c], "filter" === c && delete e[c], "transform-origin" === c && delete e[c], "auto" === e[c] && delete e[c], "x" === c) {
                            d = e[c];
                            e[p = "left"] = d, delete e[c]
                        }
                        if ("y" === c) {
                            var d = e[c], p = "top";
                            e[p] = d, delete e[c]
                        }
                        ("-ms-transform" === c || "-ms-filter" === c) && delete e[c]
                    }
                    return void o.delay(i).animate(e, t, s)
                }
                var h = {
                    default: "ease",
                    in: "ease-in",
                    out: "ease-out",
                    "in-out": "ease-in-out",
                    snap: "cubic-bezier(0,1,.5,1)",
                    easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
                    easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
                    easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
                    easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
                    easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
                    easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
                    easeOutExpo: "cubic-bezier(.19,1,.22,1)",
                    easeInOutExpo: "cubic-bezier(1,0,0,1)",
                    easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
                    easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
                    easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
                    easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
                    easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
                    easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
                    easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
                    easeOutQuint: "cubic-bezier(.23,1,.32,1)",
                    easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
                    easeInSine: "cubic-bezier(.47,0,.745,.715)",
                    easeOutSine: "cubic-bezier(.39,.575,.565,1)",
                    easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
                    easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
                    easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
                    easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
                };
                h[n] && (n = h[n]), o.off(jQuery.CSS.transitionEnd + "." + a.id);
                var f = jQuery.CSS.getProp(e), m = {};
                jQuery.extend(m, e), m[jQuery.CSS.sfx + "transition-property"] = f, m[jQuery.CSS.sfx + "transition-duration"] = t + "ms", m[jQuery.CSS.sfx + "transition-delay"] = i + "ms", m[jQuery.CSS.sfx + "transition-timing-function"] = n, setTimeout(function () {
                    o.one(jQuery.CSS.transitionEnd + "." + a.id, r), o.css(m)
                }, 1), a.timeout = setTimeout(function () {
                    return a.called || !s ? (a.called = !1, void(a.CSSAIsRunning = !1)) : (o.css(jQuery.CSS.sfx + "transition", ""), s.apply(a), a.CSSAIsRunning = !1, void("function" == typeof a.CSSqueue && (a.CSSqueue(), a.CSSqueue = null)))
                }, t + i + 10)
            }
        })
    }
}, jQuery.fn.CSSAnimate = jQuery.CSS.animate, jQuery.normalizeCss = jQuery.CSS.normalizeCss, jQuery.fn.css3 = function (e) {
    return this.each(function () {
        var t = jQuery(this), i = jQuery.normalizeCss(e);
        t.css(i)
    })
};
var nAgt = navigator.userAgent;
if (!jQuery.browser) {
    jQuery.browser = {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.androidStock = !1, jQuery.browser.msie = !1, jQuery.browser.ua = nAgt, jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    if (-1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)); else if (-1 != (verOffset = nAgt.indexOf("OPR"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 4); else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5); else if (-1 != nAgt.indexOf("Trident") || -1 != nAgt.indexOf("Edge")) {
        jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer";
        var start = nAgt.indexOf("rv:") + 3, end = start + 4;
        jQuery.browser.fullVersion = nAgt.substring(start, end)
    } else -1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : nAgt.indexOf("mozilla/5.0") > -1 && nAgt.indexOf("android ") > -1 && nAgt.indexOf("applewebkit") > -1 && !(nAgt.indexOf("chrome") > -1) ? (verOffset = nAgt.indexOf("Chrome"), jQuery.browser.webkit = !0, jQuery.browser.androidStock = !0, jQuery.browser.name = "androidStock", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName));
    -1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion
}
jQuery.browser.android = /Android/i.test(nAgt), jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle, jQuery.isMobile = jQuery.browser.mobile, jQuery.isTablet = jQuery.browser.mobile && jQuery(window).width() > 765, jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt);
var nAgt = navigator.userAgent;
if (!jQuery.browser) {
    jQuery.browser = {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.androidStock = !1, jQuery.browser.msie = !1, jQuery.browser.ua = nAgt, jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    if (-1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)); else if (-1 != (verOffset = nAgt.indexOf("OPR"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 4); else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5); else if (-1 != nAgt.indexOf("Trident") || -1 != nAgt.indexOf("Edge")) {
        jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer";
        var start = nAgt.indexOf("rv:") + 3, end = start + 4;
        jQuery.browser.fullVersion = nAgt.substring(start, end)
    } else -1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : nAgt.indexOf("mozilla/5.0") > -1 && nAgt.indexOf("android ") > -1 && nAgt.indexOf("applewebkit") > -1 && !(nAgt.indexOf("chrome") > -1) ? (verOffset = nAgt.indexOf("Chrome"), jQuery.browser.webkit = !0, jQuery.browser.androidStock = !0, jQuery.browser.name = "androidStock", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName));
    -1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion
}
if (jQuery.browser.android = /Android/i.test(nAgt), jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle, jQuery.isMobile = jQuery.browser.mobile, jQuery.isTablet = jQuery.browser.mobile && jQuery(window).width() > 765, jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt), function (e) {
        e.simpleSlider = {
            defaults: {initialval: 0, scale: 100, orientation: "h", readonly: !1, callback: !1},
            events: {
                start: e.browser.mobile ? "touchstart" : "mousedown",
                end: e.browser.mobile ? "touchend" : "mouseup",
                move: e.browser.mobile ? "touchmove" : "mousemove"
            },
            init: function (t) {
                return this.each(function () {
                    var i = this, n = e(i);
                    n.addClass("simpleSlider"), i.opt = {}, e.extend(i.opt, e.simpleSlider.defaults, t), e.extend(i.opt, n.data());
                    var s = "h" == i.opt.orientation ? "horizontal" : "vertical",
                        s = e("<div/>").addClass("level").addClass(s);
                    n.prepend(s), i.level = s, n.css({cursor: "default"}), "auto" == i.opt.scale && (i.opt.scale = e(i).outerWidth()), n.updateSliderVal(), i.opt.readonly || (n.on(e.simpleSlider.events.start, function (t) {
                        e.browser.mobile && (t = t.changedTouches[0]), i.canSlide = !0, n.updateSliderVal(t), "h" == i.opt.orientation ? n.css({cursor: "col-resize"}) : n.css({cursor: "row-resize"}), t.preventDefault(), t.stopPropagation()
                    }), e(document).on(e.simpleSlider.events.move, function (t) {
                        e.browser.mobile && (t = t.changedTouches[0]), i.canSlide && (e(document).css({cursor: "default"}), n.updateSliderVal(t), t.preventDefault(), t.stopPropagation())
                    }).on(e.simpleSlider.events.end, function () {
                        e(document).css({cursor: "auto"}), i.canSlide = !1, n.css({cursor: "auto"})
                    }))
                })
            },
            updateSliderVal: function (t) {
                var i = this.get(0);
                if (i.opt) {
                    i.opt.initialval = "number" == typeof i.opt.initialval ? i.opt.initialval : i.opt.initialval(i);
                    var n = e(i).outerWidth(), s = e(i).outerHeight();
                    i.x = "object" == typeof t ? t.clientX + document.body.scrollLeft - this.offset().left : "number" == typeof t ? t * n / i.opt.scale : i.opt.initialval * n / i.opt.scale, i.y = "object" == typeof t ? t.clientY + document.body.scrollTop - this.offset().top : "number" == typeof t ? (i.opt.scale - i.opt.initialval - t) * s / i.opt.scale : i.opt.initialval * s / i.opt.scale, i.y = this.outerHeight() - i.y, i.scaleX = i.x * i.opt.scale / n, i.scaleY = i.y * i.opt.scale / s, i.outOfRangeX = i.scaleX > i.opt.scale ? i.scaleX - i.opt.scale : 0 > i.scaleX ? i.scaleX : 0, i.outOfRangeY = i.scaleY > i.opt.scale ? i.scaleY - i.opt.scale : 0 > i.scaleY ? i.scaleY : 0, i.outOfRange = "h" == i.opt.orientation ? i.outOfRangeX : i.outOfRangeY, i.value = void 0 !== t ? "h" == i.opt.orientation ? i.x >= this.outerWidth() ? i.opt.scale : 0 >= i.x ? 0 : i.scaleX : i.y >= this.outerHeight() ? i.opt.scale : 0 >= i.y ? 0 : i.scaleY : "h" == i.opt.orientation ? i.scaleX : i.scaleY, "h" == i.opt.orientation ? i.level.width(Math.floor(100 * i.x / n) + "%") : i.level.height(Math.floor(100 * i.y / s)), "function" == typeof i.opt.callback && i.opt.callback(i)
                }
            }
        }, e.fn.simpleSlider = e.simpleSlider.init, e.fn.updateSliderVal = e.simpleSlider.updateSliderVal
    }(jQuery), function (e) {
        e.mbCookie = {
            set: function (e, t, i, n) {
                t = JSON.stringify(t), i || (i = 7), n = n ? "; domain=" + n : "";
                var s, r = new Date;
                r.setTime(r.getTime() + 864e5 * i), s = "; expires=" + r.toGMTString(), document.cookie = e + "=" + t + s + "; path=/" + n
            }, get: function (e) {
                for (var t = e + "=", i = document.cookie.split(";"), n = 0; n < i.length; n++) {
                    for (var s = i[n]; " " == s.charAt(0);) s = s.substring(1, s.length);
                    if (0 == s.indexOf(t)) return JSON.parse(s.substring(t.length, s.length))
                }
                return null
            }, remove: function (t) {
                e.mbCookie.set(t, "", -1)
            }
        }, e.mbStorage = {
            set: function (e, t) {
                t = JSON.stringify(t), localStorage.setItem(e, t)
            }, get: function (e) {
                return localStorage[e] ? JSON.parse(localStorage[e]) : null
            }, remove: function (e) {
                e ? localStorage.removeItem(e) : localStorage.clear()
            }
        }
    }(jQuery), function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function (e) {
        function t(e) {
            return o.raw ? e : encodeURIComponent(e)
        }

        function i(e) {
            return o.raw ? e : decodeURIComponent(e)
        }

        function n(e) {
            return t(o.json ? JSON.stringify(e) : String(e))
        }

        function s(e) {
            0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return e = decodeURIComponent(e.replace(a, " ")), o.json ? JSON.parse(e) : e
            } catch (e) {
            }
        }

        function r(t, i) {
            var n = o.raw ? t : s(t);
            return e.isFunction(i) ? i(n) : n
        }

        var a = /\+/g, o = e.cookie = function (s, a, l) {
            if (arguments.length > 1 && !e.isFunction(a)) {
                if ("number" == typeof(l = e.extend({}, o.defaults, l)).expires) {
                    var u = l.expires, c = l.expires = new Date;
                    c.setMilliseconds(c.getMilliseconds() + 864e5 * u)
                }
                return document.cookie = [t(s), "=", n(a), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
            }
            for (var d = s ? void 0 : {}, p = document.cookie ? document.cookie.split("; ") : [], h = 0, f = p.length; f > h; h++) {
                var m = p[h].split("="), g = i(m.shift()), v = m.join("=");
                if (s === g) {
                    d = r(v, a);
                    break
                }
                s || void 0 === (v = r(v)) || (d[g] = v)
            }
            return d
        };
        o.defaults = {}, e.removeCookie = function (t, i) {
            return e.cookie(t, "", e.extend({}, i, {expires: -1})), !e.cookie(t)
        }
    }), function (e, t) {
        "function" == typeof define && define.amd ? define(["jquery"], function (e) {
            return t(e)
        }) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(0, function (e) {
        var t = function (e, t) {
            var i, n = document.createElement("canvas");
            e.appendChild(n), "object" == typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(n);
            var s = n.getContext("2d");
            n.width = n.height = t.size;
            var r = 1;
            window.devicePixelRatio > 1 && (r = window.devicePixelRatio, n.style.width = n.style.height = [t.size, "px"].join(""), n.width = n.height = t.size * r, s.scale(r, r)), s.translate(t.size / 2, t.size / 2), s.rotate((t.rotate / 180 - .5) * Math.PI);
            var a = (t.size - t.lineWidth) / 2;
            t.scaleColor && t.scaleLength && (a -= t.scaleLength + 2), Date.now = Date.now || function () {
                return +new Date
            };
            var o = function (e, t, i) {
                    var n = 0 >= (i = Math.min(Math.max(-1, i || 0), 1));
                    s.beginPath(), s.arc(0, 0, a, 0, 2 * Math.PI * i, n), s.strokeStyle = e, s.lineWidth = t, s.stroke()
                }, l = function () {
                    var e, i;
                    s.lineWidth = 1, s.fillStyle = t.scaleColor, s.save();
                    for (var n = 24; n > 0; --n) n % 6 == 0 ? (i = t.scaleLength, e = 0) : (i = .6 * t.scaleLength, e = t.scaleLength - i), s.fillRect(-t.size / 2 + e, 0, i, 1), s.rotate(Math.PI / 12);
                    s.restore()
                },
                u = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e) {
                    window.setTimeout(e, 1e3 / 60)
                }, c = function () {
                    t.scaleColor && l(), t.trackColor && o(t.trackColor, t.trackWidth || t.lineWidth, 1)
                };
            this.getCanvas = function () {
                return n
            }, this.getCtx = function () {
                return s
            }, this.clear = function () {
                s.clearRect(t.size / -2, t.size / -2, t.size, t.size)
            }, this.draw = function (e) {
                t.scaleColor || t.trackColor ? s.getImageData && s.putImageData ? i ? s.putImageData(i, 0, 0) : (c(), i = s.getImageData(0, 0, t.size * r, t.size * r)) : (this.clear(), c()) : this.clear(), s.lineCap = t.lineCap;
                var n;
                n = "function" == typeof t.barColor ? t.barColor(e) : t.barColor, o(n, t.lineWidth, e / 100)
            }.bind(this), this.animate = function (e, i) {
                var n = Date.now();
                t.onStart(e, i);
                var s = function () {
                    var r = Math.min(Date.now() - n, t.animate.duration),
                        a = t.easing(this, r, e, i - e, t.animate.duration);
                    this.draw(a), t.onStep(e, i, a), r >= t.animate.duration ? t.onStop(e, i) : u(s)
                }.bind(this);
                u(s)
            }.bind(this)
        }, i = function (e, i) {
            var n = {
                barColor: "#ef1e25",
                trackColor: "#f9f9f9",
                scaleColor: "#dfe0e0",
                scaleLength: 5,
                lineCap: "round",
                lineWidth: 3,
                trackWidth: void 0,
                size: 110,
                rotate: 0,
                animate: {duration: 1e3, enabled: !0},
                easing: function (e, t, i, n, s) {
                    return t /= s / 2, 1 > t ? n / 2 * t * t + i : -n / 2 * (--t * (t - 2) - 1) + i
                },
                onStart: function (e, t) {
                },
                onStep: function (e, t, i) {
                },
                onStop: function (e, t) {
                }
            };
            if (void 0 !== t) n.renderer = t; else {
                if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
                n.renderer = SVGRenderer
            }
            var s = {}, r = 0, a = function () {
                this.el = e, this.options = s;
                for (var t in n) n.hasOwnProperty(t) && (s[t] = i && void 0 !== i[t] ? i[t] : n[t], "function" == typeof s[t] && (s[t] = s[t].bind(this)));
                "string" == typeof s.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[s.easing]) ? s.easing = jQuery.easing[s.easing] : s.easing = n.easing, "number" == typeof s.animate && (s.animate = {
                    duration: s.animate,
                    enabled: !0
                }), "boolean" != typeof s.animate || s.animate || (s.animate = {
                    duration: 1e3,
                    enabled: s.animate
                }), this.renderer = new s.renderer(e, s), this.renderer.draw(r), e.dataset && e.dataset.percent ? this.update(parseFloat(e.dataset.percent)) : e.getAttribute && e.getAttribute("data-percent") && this.update(parseFloat(e.getAttribute("data-percent")))
            }.bind(this);
            this.update = function (e) {
                return e = parseFloat(e), s.animate.enabled ? this.renderer.animate(r, e) : this.renderer.draw(e), r = e, this
            }.bind(this), this.disableAnimation = function () {
                return s.animate.enabled = !1, this
            }, this.enableAnimation = function () {
                return s.animate.enabled = !0, this
            }, a()
        };
        e.fn.easyPieChart = function (t) {
            return this.each(function () {
                var n;
                e.data(this, "easyPieChart") || (n = e.extend({}, t, e(this).data()), e.data(this, "easyPieChart", new i(this, n)))
            })
        }
    }), function (e) {
        e.fn.appear = function (t, i) {
            var n = e.extend({data: void 0, one: !0, accX: 0, accY: 0}, i);
            return this.each(function () {
                var i = e(this);
                if (i.appeared = !1, t) {
                    var s = e(window), r = function () {
                        if (i.is(":visible")) {
                            var e = s.scrollLeft(), t = s.scrollTop(), r = i.offset(), a = r.left, o = r.top,
                                l = n.accX, u = n.accY, c = i.height(), d = s.height(), p = i.width(), h = s.width();
                            o + c + u >= t && o <= t + d + u && a + p + l >= e && a <= e + h + l ? i.appeared || i.trigger("appear", n.data) : i.appeared = !1
                        } else i.appeared = !1
                    }, a = function () {
                        if (i.appeared = !0, n.one) {
                            s.unbind("scroll", r);
                            var a = e.inArray(r, e.fn.appear.checks);
                            a >= 0 && e.fn.appear.checks.splice(a, 1)
                        }
                        t.apply(this, arguments)
                    };
                    n.one ? i.one("appear", n.data, a) : i.bind("appear", n.data, a), s.scroll(r), e.fn.appear.checks.push(r), r()
                } else i.trigger("appear", n.data)
            })
        }, e.extend(e.fn.appear, {
            checks: [], timeout: null, checkAll: function () {
                var t = e.fn.appear.checks.length;
                if (t > 0) for (; t--;) e.fn.appear.checks[t]()
            }, run: function () {
                e.fn.appear.timeout && clearTimeout(e.fn.appear.timeout), e.fn.appear.timeout = setTimeout(e.fn.appear.checkAll, 20)
            }
        }), e.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function (t, i) {
            var n = e.fn[i];
            n && (e.fn[i] = function () {
                var t = n.apply(this, arguments);
                return e.fn.appear.run(), t
            })
        })
    }(jQuery), function (e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function (e) {
        "use strict";
        var t = "animsition", i = !1, n = {
            init: function (s) {
                s = e.extend({
                    inClass: "fade-in",
                    outClass: "fade-out",
                    inDuration: 1500,
                    outDuration: 800,
                    linkElement: ".animsition-link",
                    loading: !0,
                    loadingParentElement: "body",
                    loadingClass: "animsition-loading",
                    loadingHtml: '<div class="css3-spinner-bounce1"></div><div class="css3-spinner-bounce2"></div><div class="css3-spinner-bounce3"></div>',
                    unSupportCss: ["animation-duration", "-webkit-animation-duration", "-o-animation-duration"],
                    overlay: !1,
                    overlayClass: "animsition-overlay-slide",
                    overlayParentElement: "body",
                    timeOut: !1
                }, s);
                var r = n.supportCheck.call(this, s);
                return r || !(s.unSupportCss.length > 0) || r && this.length ? (n.optionCheck.call(this, s) && n.addOverlay.call(this, s), s.loading && n.addLoading.call(this, s), this.each(function () {
                    var r = this, a = e(this), o = e(window);
                    a.data(t) || (s = e.extend({}, s), a.data(t, {options: s}), o.on("load." + t + " pageshow." + t, function () {
                        0 == i && n.pageIn.call(r)
                    }), s.timeOut && !isNaN(s.timeOut) && setTimeout(function () {
                        0 == i && n.pageIn.call(r)
                    }, s.timeOut), o.on("unload." + t, function () {
                    }), e(s.linkElement).on("click." + t, function (t) {
                        t.preventDefault();
                        var i = e(this), s = i.attr("href");
                        2 === t.which || t.metaKey || t.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && t.ctrlKey ? window.open(s, "_blank") : n.pageOut.call(r, i, s)
                    }))
                })) : ("console" in window || (window.console = {}, window.console.log = function (e) {
                    return e
                }), this.length || console.log("Animsition: Element does not exist on page."), r || console.log("Animsition: Does not support this browser."), n.destroy.call(this))
            }, addOverlay: function (t) {
                e(t.overlayParentElement).prepend('<div class="' + t.overlayClass + '"></div>')
            }, addLoading: function (t) {
                e(t.loadingParentElement).append('<div class="' + t.loadingClass + '">' + t.loadingHtml + "</div>")
            }, removeLoading: function () {
                var i = e(this).data(t).options;
                e(i.loadingParentElement).children("." + i.loadingClass).fadeOut().remove()
            }, supportCheck: function (t) {
                var i = e(this), n = t.unSupportCss, s = n.length, r = !1;
                0 === s && (r = !0);
                for (var a = 0; s > a; a++) if ("string" == typeof i.css(n[a])) {
                    r = !0;
                    break
                }
                return r
            }, optionCheck: function (t) {
                var i = e(this);
                return !(!t.overlay && !i.data("animsition-overlay"))
            }, animationCheck: function (i, n, s) {
                var r = e(this).data(t).options, a = typeof i, o = !n && "number" === a,
                    l = n && "string" === a && i.length > 0;
                return o || l ? i = i : n && s ? i = r.inClass : !n && s ? i = r.inDuration : n && !s ? i = r.outClass : n || s || (i = r.outDuration), i
            }, pageIn: function () {
                var s = this, r = e(this), a = r.data(t).options, o = r.data("animsition-in-duration"),
                    l = r.data("animsition-in"), u = n.animationCheck.call(s, o, !1, !0),
                    c = n.animationCheck.call(s, l, !0, !0), d = n.optionCheck.call(s, a);
                a.loading && n.removeLoading.call(s), d ? n.pageInOverlay.call(s, c, u) : n.pageInBasic.call(s, c, u), i = !0
            }, pageInBasic: function (t, i) {
                var n = e(this);
                n.trigger("animsition.start").css({"animation-duration": i / 1e3 + "s"}).addClass(t).animateCallback(function () {
                    n.removeClass(t).css({opacity: 1}).trigger("animsition.end")
                })
            }, pageInOverlay: function (i, n) {
                var s = e(this), r = s.data(t).options;
                s.trigger("animsition.start").css({opacity: 1}), e(r.overlayParentElement).children("." + r.overlayClass).css({"animation-duration": n / 1e3 + "s"}).addClass(i).animateCallback(function () {
                    s.trigger("animsition.end")
                })
            }, pageOut: function (i, s) {
                var r = this, a = e(this), o = a.data(t).options, l = i.data("animsition-out"),
                    u = a.data("animsition-out"), c = i.data("animsition-out-duration"),
                    d = a.data("animsition-out-duration"), p = l || u, h = c || d,
                    f = n.animationCheck.call(r, p, !0, !1), m = n.animationCheck.call(r, h, !1, !1);
                n.optionCheck.call(r, o) ? n.pageOutOverlay.call(r, f, m, s) : n.pageOutBasic.call(r, f, m, s)
            }, pageOutBasic: function (t, i, n) {
                e(this).css({"animation-duration": i / 1e3 + "s"}).addClass(t).animateCallback(function () {
                    location.href = n
                })
            }, pageOutOverlay: function (i, s, r) {
                var a = this, o = e(this), l = o.data(t).options, u = o.data("animsition-in"),
                    c = n.animationCheck.call(a, u, !0, !0);
                e(l.overlayParentElement).children("." + l.overlayClass).css({"animation-duration": s / 1e3 + "s"}).removeClass(c).addClass(i).animateCallback(function () {
                    location.href = r
                })
            }, destroy: function () {
                return this.each(function () {
                    var i = e(this);
                    e(window).unbind("." + t), i.css({opacity: 1}).removeData(t)
                })
            }
        };
        e.fn.animateCallback = function (t) {
            var i = "animationend webkitAnimationEnd mozAnimationEnd oAnimationEnd MSAnimationEnd";
            return this.each(function () {
                e(this).bind(i, function () {
                    return e(this).unbind(i), t.call(this)
                })
            })
        }, e.fn.animsition = function (i) {
            return n[i] ? n[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void e.error("Method " + i + " does not exist on jQuery." + t) : n.init.apply(this, arguments)
        }
    }), function (e, t, i, n) {
        function s(t, i) {
            this.element = t, this.options = e.extend({}, a, i), this._defaults = a, this._name = r, this.init()
        }

        var r = "stellar", a = {
                scrollProperty: "scroll",
                positionProperty: "position",
                horizontalScrolling: !0,
                verticalScrolling: !0,
                horizontalOffset: 0,
                verticalOffset: 0,
                responsive: !1,
                parallaxBackgrounds: !0,
                parallaxElements: !0,
                hideDistantElements: !0,
                hideElement: function (e) {
                    e.hide()
                },
                showElement: function (e) {
                    e.show()
                }
            }, o = {
                scroll: {
                    getLeft: function (e) {
                        return e.scrollLeft()
                    }, setLeft: function (e, t) {
                        e.scrollLeft(t)
                    }, getTop: function (e) {
                        return e.scrollTop()
                    }, setTop: function (e, t) {
                        e.scrollTop(t)
                    }
                }, position: {
                    getLeft: function (e) {
                        return -1 * parseInt(e.css("left"), 10)
                    }, getTop: function (e) {
                        return -1 * parseInt(e.css("top"), 10)
                    }
                }, margin: {
                    getLeft: function (e) {
                        return -1 * parseInt(e.css("margin-left"), 10)
                    }, getTop: function (e) {
                        return -1 * parseInt(e.css("margin-top"), 10)
                    }
                }, transform: {
                    getLeft: function (e) {
                        var t = getComputedStyle(e[0])[u];
                        return "none" !== t ? -1 * parseInt(t.match(/(-?[0-9]+)/g)[4], 10) : 0
                    }, getTop: function (e) {
                        var t = getComputedStyle(e[0])[u];
                        return "none" !== t ? -1 * parseInt(t.match(/(-?[0-9]+)/g)[5], 10) : 0
                    }
                }
            }, l = {
                position: {
                    setLeft: function (e, t) {
                        e.css("left", t)
                    }, setTop: function (e, t) {
                        e.css("top", t)
                    }
                }, transform: {
                    setPosition: function (e, t, i, n, s) {
                        e[0].style[u] = "translate3d(" + (t - i) + "px, " + (n - s) + "px, 0)"
                    }
                }
            }, u = function () {
                var t, i = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/, n = e("script")[0].style, s = "";
                for (t in n) if (i.test(t)) {
                    s = t.match(i)[0];
                    break
                }
                return "WebkitOpacity" in n && (s = "Webkit"), "KhtmlOpacity" in n && (s = "Khtml"), function (e) {
                    return s + (s.length > 0 ? e.charAt(0).toUpperCase() + e.slice(1) : e)
                }
            }()("transform"), c = e("<div />", {style: "background:#fff"}).css("background-position-x") !== n,
            d = c ? function (e, t, i) {
                e.css({"background-position-x": t, "background-position-y": i})
            } : function (e, t, i) {
                e.css("background-position", t + " " + i)
            }, p = c ? function (e) {
                return [e.css("background-position-x"), e.css("background-position-y")]
            } : function (e) {
                return e.css("background-position").split(" ")
            },
            h = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function (e) {
                setTimeout(e, 1e3 / 60)
            };
        s.prototype = {
            init: function () {
                this.options.name = r + "_" + Math.floor(1e9 * Math.random()), this._defineElements(), this._defineGetters(), this._defineSetters(), this._handleWindowLoadAndResize(), this._detectViewport(), this.refresh({firstLoad: !0}), "scroll" === this.options.scrollProperty ? this._handleScrollEvent() : this._startAnimationLoop()
            }, _defineElements: function () {
                this.element === i.body && (this.element = t), this.$scrollElement = e(this.element), this.$element = this.element === t ? e("body") : this.$scrollElement, this.$viewportElement = this.options.viewportElement !== n ? e(this.options.viewportElement) : this.$scrollElement[0] === t || "scroll" === this.options.scrollProperty ? this.$scrollElement : this.$scrollElement.parent()
            }, _defineGetters: function () {
                var e = this, t = o[e.options.scrollProperty];
                this._getScrollLeft = function () {
                    return t.getLeft(e.$scrollElement)
                }, this._getScrollTop = function () {
                    return t.getTop(e.$scrollElement)
                }
            }, _defineSetters: function () {
                var t = this, i = o[t.options.scrollProperty], n = l[t.options.positionProperty], s = i.setLeft,
                    r = i.setTop;
                this._setScrollLeft = "function" == typeof s ? function (e) {
                    s(t.$scrollElement, e)
                } : e.noop, this._setScrollTop = "function" == typeof r ? function (e) {
                    r(t.$scrollElement, e)
                } : e.noop, this._setPosition = n.setPosition || function (e, i, s, r, a) {
                    t.options.horizontalScrolling && n.setLeft(e, i, s), t.options.verticalScrolling && n.setTop(e, r, a)
                }
            }, _handleWindowLoadAndResize: function () {
                var i = this, n = e(t);
                i.options.responsive && n.bind("load." + this.name, function () {
                    i.refresh()
                }), n.bind("resize." + this.name, function () {
                    i._detectViewport(), i.options.responsive && i.refresh()
                })
            }, refresh: function (i) {
                var n = this, s = n._getScrollLeft(), r = n._getScrollTop();
                (!i || !i.firstLoad) && this._reset(), this._setScrollLeft(0), this._setScrollTop(0), this._setOffsets(), this._findParticles(), this._findBackgrounds(), i && i.firstLoad && /WebKit/.test(navigator.userAgent) && e(t).load(function () {
                    var e = n._getScrollLeft(), t = n._getScrollTop();
                    n._setScrollLeft(e + 1), n._setScrollTop(t + 1), n._setScrollLeft(e), n._setScrollTop(t)
                }), this._setScrollLeft(s), this._setScrollTop(r)
            }, _detectViewport: function () {
                var e = this.$viewportElement.offset(), t = null !== e && e !== n;
                this.viewportWidth = this.$viewportElement.width(), this.viewportHeight = this.$viewportElement.height(), this.viewportOffsetTop = t ? e.top : 0, this.viewportOffsetLeft = t ? e.left : 0
            }, _findParticles: function () {
                var t = this;
                this._getScrollLeft(), this._getScrollTop();
                if (this.particles !== n) for (var i = this.particles.length - 1; i >= 0; i--) this.particles[i].$element.data("stellar-elementIsActive", n);
                this.particles = [], this.options.parallaxElements && this.$element.find("[data-stellar-ratio]").each(function (i) {
                    var s, r, a, o, l, u, c, d, p, h = e(this), f = 0, m = 0, g = 0, v = 0;
                    if (h.data("stellar-elementIsActive")) {
                        if (h.data("stellar-elementIsActive") !== this) return
                    } else h.data("stellar-elementIsActive", this);
                    t.options.showElement(h), h.data("stellar-startingLeft") ? (h.css("left", h.data("stellar-startingLeft")), h.css("top", h.data("stellar-startingTop"))) : (h.data("stellar-startingLeft", h.css("left")), h.data("stellar-startingTop", h.css("top"))), a = h.position().left, o = h.position().top, l = "auto" === h.css("margin-left") ? 0 : parseInt(h.css("margin-left"), 10), u = "auto" === h.css("margin-top") ? 0 : parseInt(h.css("margin-top"), 10), d = h.offset().left - l, p = h.offset().top - u, h.parents().each(function () {
                        var t = e(this);
                        if (!0 === t.data("stellar-offset-parent")) return f = g, m = v, c = t, !1;
                        g += t.position().left, v += t.position().top
                    }), s = h.data("stellar-horizontal-offset") !== n ? h.data("stellar-horizontal-offset") : c !== n && c.data("stellar-horizontal-offset") !== n ? c.data("stellar-horizontal-offset") : t.horizontalOffset, r = h.data("stellar-vertical-offset") !== n ? h.data("stellar-vertical-offset") : c !== n && c.data("stellar-vertical-offset") !== n ? c.data("stellar-vertical-offset") : t.verticalOffset, t.particles.push({
                        $element: h,
                        $offsetParent: c,
                        isFixed: "fixed" === h.css("position"),
                        horizontalOffset: s,
                        verticalOffset: r,
                        startingPositionLeft: a,
                        startingPositionTop: o,
                        startingOffsetLeft: d,
                        startingOffsetTop: p,
                        parentOffsetLeft: f,
                        parentOffsetTop: m,
                        stellarRatio: h.data("stellar-ratio") !== n ? h.data("stellar-ratio") : 1,
                        width: h.outerWidth(!0),
                        height: h.outerHeight(!0),
                        isHidden: !1
                    })
                })
            }, _findBackgrounds: function () {
                var t, i = this, s = this._getScrollLeft(), r = this._getScrollTop();
                this.backgrounds = [], this.options.parallaxBackgrounds && (t = this.$element.find("[data-stellar-background-ratio]"), this.$element.data("stellar-background-ratio") && (t = t.add(this.$element)), t.each(function () {
                    var t, a, o, l, u, c, h, f = e(this), m = p(f), g = 0, v = 0, y = 0, b = 0;
                    if (f.data("stellar-backgroundIsActive")) {
                        if (f.data("stellar-backgroundIsActive") !== this) return
                    } else f.data("stellar-backgroundIsActive", this);
                    f.data("stellar-backgroundStartingLeft") ? d(f, f.data("stellar-backgroundStartingLeft"), f.data("stellar-backgroundStartingTop")) : (f.data("stellar-backgroundStartingLeft", m[0]), f.data("stellar-backgroundStartingTop", m[1])), o = "auto" === f.css("margin-left") ? 0 : parseInt(f.css("margin-left"), 10), l = "auto" === f.css("margin-top") ? 0 : parseInt(f.css("margin-top"), 10), u = f.offset().left - o - s, c = f.offset().top - l - r, f.parents().each(function () {
                        var t = e(this);
                        if (!0 === t.data("stellar-offset-parent")) return g = y, v = b, h = t, !1;
                        y += t.position().left, b += t.position().top
                    }), t = f.data("stellar-horizontal-offset") !== n ? f.data("stellar-horizontal-offset") : h !== n && h.data("stellar-horizontal-offset") !== n ? h.data("stellar-horizontal-offset") : i.horizontalOffset, a = f.data("stellar-vertical-offset") !== n ? f.data("stellar-vertical-offset") : h !== n && h.data("stellar-vertical-offset") !== n ? h.data("stellar-vertical-offset") : i.verticalOffset, i.backgrounds.push({
                        $element: f,
                        $offsetParent: h,
                        isFixed: "fixed" === f.css("background-attachment"),
                        horizontalOffset: t,
                        verticalOffset: a,
                        startingValueLeft: m[0],
                        startingValueTop: m[1],
                        startingBackgroundPositionLeft: isNaN(parseInt(m[0], 10)) ? 0 : parseInt(m[0], 10),
                        startingBackgroundPositionTop: isNaN(parseInt(m[1], 10)) ? 0 : parseInt(m[1], 10),
                        startingPositionLeft: f.position().left,
                        startingPositionTop: f.position().top,
                        startingOffsetLeft: u,
                        startingOffsetTop: c,
                        parentOffsetLeft: g,
                        parentOffsetTop: v,
                        stellarRatio: f.data("stellar-background-ratio") === n ? 1 : f.data("stellar-background-ratio")
                    })
                }))
            }, _reset: function () {
                var e, t, i, n, s;
                for (s = this.particles.length - 1; s >= 0; s--) e = this.particles[s], t = e.$element.data("stellar-startingLeft"), i = e.$element.data("stellar-startingTop"), this._setPosition(e.$element, t, t, i, i), this.options.showElement(e.$element), e.$element.data("stellar-startingLeft", null).data("stellar-elementIsActive", null).data("stellar-backgroundIsActive", null);
                for (s = this.backgrounds.length - 1; s >= 0; s--) (n = this.backgrounds[s]).$element.data("stellar-backgroundStartingLeft", null).data("stellar-backgroundStartingTop", null), d(n.$element, n.startingValueLeft, n.startingValueTop)
            }, destroy: function () {
                this._reset(), this.$scrollElement.unbind("resize." + this.name).unbind("scroll." + this.name), this._animationLoop = e.noop, e(t).unbind("load." + this.name).unbind("resize." + this.name)
            }, _setOffsets: function () {
                var i = this, n = e(t);
                n.unbind("resize.horizontal-" + this.name).unbind("resize.vertical-" + this.name), "function" == typeof this.options.horizontalOffset ? (this.horizontalOffset = this.options.horizontalOffset(), n.bind("resize.horizontal-" + this.name, function () {
                    i.horizontalOffset = i.options.horizontalOffset()
                })) : this.horizontalOffset = this.options.horizontalOffset, "function" == typeof this.options.verticalOffset ? (this.verticalOffset = this.options.verticalOffset(), n.bind("resize.vertical-" + this.name, function () {
                    i.verticalOffset = i.options.verticalOffset()
                })) : this.verticalOffset = this.options.verticalOffset
            }, _repositionElements: function () {
                var e, t, i, n, s, r, a, o, l, u, c = this._getScrollLeft(), p = this._getScrollTop(), h = !0, f = !0;
                if (this.currentScrollLeft !== c || this.currentScrollTop !== p || this.currentWidth !== this.viewportWidth || this.currentHeight !== this.viewportHeight) {
                    for (this.currentScrollLeft = c, this.currentScrollTop = p, this.currentWidth = this.viewportWidth, this.currentHeight = this.viewportHeight, u = this.particles.length - 1; u >= 0; u--) e = this.particles[u], t = e.isFixed ? 1 : 0, this.options.horizontalScrolling ? (r = (c + e.horizontalOffset + this.viewportOffsetLeft + e.startingPositionLeft - e.startingOffsetLeft + e.parentOffsetLeft) * -(e.stellarRatio + t - 1) + e.startingPositionLeft, o = r - e.startingPositionLeft + e.startingOffsetLeft) : (r = e.startingPositionLeft, o = e.startingOffsetLeft), this.options.verticalScrolling ? (a = (p + e.verticalOffset + this.viewportOffsetTop + e.startingPositionTop - e.startingOffsetTop + e.parentOffsetTop) * -(e.stellarRatio + t - 1) + e.startingPositionTop, l = a - e.startingPositionTop + e.startingOffsetTop) : (a = e.startingPositionTop, l = e.startingOffsetTop), this.options.hideDistantElements && (f = !this.options.horizontalScrolling || o + e.width > (e.isFixed ? 0 : c) && o < (e.isFixed ? 0 : c) + this.viewportWidth + this.viewportOffsetLeft, h = !this.options.verticalScrolling || l + e.height > (e.isFixed ? 0 : p) && l < (e.isFixed ? 0 : p) + this.viewportHeight + this.viewportOffsetTop), f && h ? (e.isHidden && (this.options.showElement(e.$element), e.isHidden = !1), this._setPosition(e.$element, r, e.startingPositionLeft, a, e.startingPositionTop)) : e.isHidden || (this.options.hideElement(e.$element), e.isHidden = !0);
                    for (u = this.backgrounds.length - 1; u >= 0; u--) i = this.backgrounds[u], t = i.isFixed ? 0 : 1, n = this.options.horizontalScrolling ? (c + i.horizontalOffset - this.viewportOffsetLeft - i.startingOffsetLeft + i.parentOffsetLeft - i.startingBackgroundPositionLeft) * (t - i.stellarRatio) + "px" : i.startingValueLeft, s = this.options.verticalScrolling ? (p + i.verticalOffset - this.viewportOffsetTop - i.startingOffsetTop + i.parentOffsetTop - i.startingBackgroundPositionTop) * (t - i.stellarRatio) + "px" : i.startingValueTop, d(i.$element, n, s)
                }
            }, _handleScrollEvent: function () {
                var e = this, t = !1, i = function () {
                    e._repositionElements(), t = !1
                }, n = function () {
                    t || (h(i), t = !0)
                };
                this.$scrollElement.bind("scroll." + this.name, n), n()
            }, _startAnimationLoop: function () {
                var e = this;
                this._animationLoop = function () {
                    h(e._animationLoop), e._repositionElements()
                }, this._animationLoop()
            }
        }, e.fn[r] = function (t) {
            var i = arguments;
            return t === n || "object" == typeof t ? this.each(function () {
                e.data(this, "plugin_" + r) || e.data(this, "plugin_" + r, new s(this, t))
            }) : "string" == typeof t && "_" !== t[0] && "init" !== t ? this.each(function () {
                var n = e.data(this, "plugin_" + r);
                n instanceof s && "function" == typeof n[t] && n[t].apply(n, Array.prototype.slice.call(i, 1)), "destroy" === t && e.data(this, "plugin_" + r, null)
            }) : void 0
        }, e[r] = function (i) {
            var n = e(t);
            return n.stellar.apply(n, Array.prototype.slice.call(arguments, 0))
        }, e[r].scrollProperty = o, e[r].positionProperty = l, t.Stellar = s
    }(jQuery, this, document), function () {
        var e = !1;
        window.JQClass = function () {
        }, JQClass.classes = {}, JQClass.extend = function t(i) {
            function n() {
                !e && this._init && this._init.apply(this, arguments)
            }

            var s = this.prototype;
            e = !0;
            var r = new this;
            e = !1;
            for (var a in i) r[a] = "function" == typeof i[a] && "function" == typeof s[a] ? function (e, t) {
                return function () {
                    var i = this._super;
                    this._super = function (t) {
                        return s[e].apply(this, t)
                    };
                    var n = t.apply(this, arguments);
                    return this._super = i, n
                }
            }(a, i[a]) : i[a];
            return n.prototype = r, n.prototype.constructor = n, n.extend = t, n
        }
    }(), function ($) {
        function camelCase(e) {
            return e.replace(/-([a-z])/g, function (e, t) {
                return t.toUpperCase()
            })
        }

        JQClass.classes.JQPlugin = JQClass.extend({
            name: "plugin",
            defaultOptions: {},
            regionalOptions: {},
            _getters: [],
            _getMarker: function () {
                return "is-" + this.name
            },
            _init: function () {
                $.extend(this.defaultOptions, this.regionalOptions && this.regionalOptions[""] || {});
                var e = camelCase(this.name);
                $[e] = this, $.fn[e] = function (t) {
                    var i = Array.prototype.slice.call(arguments, 1);
                    return $[e]._isNotChained(t, i) ? $[e][t].apply($[e], [this[0]].concat(i)) : this.each(function () {
                        if ("string" == typeof t) {
                            if ("_" === t[0] || !$[e][t]) throw"Unknown method: " + t;
                            $[e][t].apply($[e], [this].concat(i))
                        } else $[e]._attach(this, t)
                    })
                }
            },
            setDefaults: function (e) {
                $.extend(this.defaultOptions, e || {})
            },
            _isNotChained: function (e, t) {
                return "option" === e && (0 === t.length || 1 === t.length && "string" == typeof t[0]) || $.inArray(e, this._getters) > -1
            },
            _attach: function (e, t) {
                if (!(e = $(e)).hasClass(this._getMarker())) {
                    e.addClass(this._getMarker()), t = $.extend({}, this.defaultOptions, this._getMetadata(e), t || {});
                    var i = $.extend({name: this.name, elem: e, options: t}, this._instSettings(e, t));
                    e.data(this.name, i), this._postAttach(e, i), this.option(e, t)
                }
            },
            _instSettings: function (e, t) {
                return {}
            },
            _postAttach: function (e, t) {
            },
            _getMetadata: function (d) {
                try {
                    var f = d.data(this.name.toLowerCase()) || "";
                    f = f.replace(/'/g, '"'), f = f.replace(/([a-zA-Z0-9]+):/g, function (e, t, i) {
                        var n = f.substring(0, i).match(/"/g);
                        return n && n.length % 2 != 0 ? t + ":" : '"' + t + '":'
                    }), f = $.parseJSON("{" + f + "}");
                    for (var g in f) {
                        var h = f[g];
                        "string" == typeof h && h.match(/^new Date\((.*)\)$/) && (f[g] = eval(h))
                    }
                    return f
                } catch (e) {
                    return {}
                }
            },
            _getInst: function (e) {
                return $(e).data(this.name) || {}
            },
            option: function (e, t, i) {
                var n = (e = $(e)).data(this.name);
                if (!t || "string" == typeof t && null == i) return (s = (n || {}).options) && t ? s[t] : s;
                if (e.hasClass(this._getMarker())) {
                    var s = t || {};
                    "string" == typeof t && ((s = {})[t] = i), this._optionsChanged(e, n, s), $.extend(n.options, s)
                }
            },
            _optionsChanged: function (e, t, i) {
            },
            destroy: function (e) {
                (e = $(e)).hasClass(this._getMarker()) && (this._preDestroy(e, this._getInst(e)), e.removeData(this.name).removeClass(this._getMarker()))
            },
            _preDestroy: function (e, t) {
            }
        }), $.JQPlugin = {
            createPlugin: function (e, t) {
                "object" == typeof e && (t = e, e = "JQPlugin"), e = camelCase(e);
                var i = camelCase(t.name);
                JQClass.classes[i] = JQClass.classes[e].extend(t), new JQClass.classes[i]
            }
        }
    }(jQuery), function (e) {
        "use strict";
        var t = "countdown";
        e.JQPlugin.createPlugin({
            name: t,
            defaultOptions: {
                until: null,
                since: null,
                timezone: null,
                serverSync: null,
                format: "dHMS",
                layout: "",
                compact: !1,
                padZeroes: !1,
                significant: 0,
                description: "",
                expiryUrl: "",
                expiryText: "",
                alwaysExpire: !1,
                onExpiry: null,
                onTick: null,
                tickInterval: 1
            },
            regionalOptions: {
                "": {
                    labels: ["Years", "Months", "Weeks", "Days", "Hours", "Minutes", "Seconds"],
                    labels1: ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"],
                    compactLabels: ["y", "m", "w", "d"],
                    whichLabels: null,
                    digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    timeSeparator: ":",
                    isRTL: !1
                }
            },
            _rtlClass: t + "-rtl",
            _sectionClass: t + "-section",
            _amountClass: t + "-amount",
            _periodClass: t + "-period",
            _rowClass: t + "-row",
            _holdingClass: t + "-holding",
            _showClass: t + "-show",
            _descrClass: t + "-descr",
            _timerElems: [],
            _init: function () {
                function t(e) {
                    var o = e < 1e12 ? s ? window.performance.now() + window.performance.timing.navigationStart : n() : e || n();
                    o - a >= 1e3 && (i._updateElems(), a = o), r(t)
                }

                var i = this;
                this._super(), this._serverSyncs = [];
                var n = "function" == typeof Date.now ? Date.now : function () {
                        return (new Date).getTime()
                    }, s = window.performance && "function" == typeof window.performance.now,
                    r = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null,
                    a = 0;
                !r || e.noRequestAnimationFrame ? (e.noRequestAnimationFrame = null, e.countdown._timer = setInterval(function () {
                    i._updateElems()
                }, 1e3)) : (a = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || n(), r(t))
            },
            UTCDate: function (e, t, i, n, s, r, a, o) {
                "object" == typeof t && t instanceof Date && (o = t.getMilliseconds(), a = t.getSeconds(), r = t.getMinutes(), s = t.getHours(), n = t.getDate(), i = t.getMonth(), t = t.getFullYear());
                var l = new Date;
                return l.setUTCFullYear(t), l.setUTCDate(1), l.setUTCMonth(i || 0), l.setUTCDate(n || 1), l.setUTCHours(s || 0), l.setUTCMinutes((r || 0) - (Math.abs(e) < 30 ? 60 * e : e)), l.setUTCSeconds(a || 0), l.setUTCMilliseconds(o || 0), l
            },
            periodsToSeconds: function (e) {
                return 31557600 * e[0] + 2629800 * e[1] + 604800 * e[2] + 86400 * e[3] + 3600 * e[4] + 60 * e[5] + e[6]
            },
            resync: function () {
                var t = this;
                e("." + this._getMarker()).each(function () {
                    var i = e.data(this, t.name);
                    if (i.options.serverSync) {
                        for (var n = null, s = 0; s < t._serverSyncs.length; s++) if (t._serverSyncs[s][0] === i.options.serverSync) {
                            n = t._serverSyncs[s];
                            break
                        }
                        if (t._eqNull(n[2])) {
                            var r = e.isFunction(i.options.serverSync) ? i.options.serverSync.apply(this, []) : null;
                            n[2] = (r ? (new Date).getTime() - r.getTime() : 0) - n[1]
                        }
                        i._since && i._since.setMilliseconds(i._since.getMilliseconds() + n[2]), i._until.setMilliseconds(i._until.getMilliseconds() + n[2])
                    }
                });
                for (var i = 0; i < t._serverSyncs.length; i++) t._eqNull(t._serverSyncs[i][2]) || (t._serverSyncs[i][1] += t._serverSyncs[i][2], delete t._serverSyncs[i][2])
            },
            _instSettings: function (e, t) {
                return {_periods: [0, 0, 0, 0, 0, 0, 0]}
            },
            _addElem: function (e) {
                this._hasElem(e) || this._timerElems.push(e)
            },
            _hasElem: function (t) {
                return e.inArray(t, this._timerElems) > -1
            },
            _removeElem: function (t) {
                this._timerElems = e.map(this._timerElems, function (e) {
                    return e === t ? null : e
                })
            },
            _updateElems: function () {
                for (var e = this._timerElems.length - 1; e >= 0; e--) this._updateCountdown(this._timerElems[e])
            },
            _optionsChanged: function (t, i, n) {
                n.layout && (n.layout = n.layout.replace(/&lt;/g, "<").replace(/&gt;/g, ">")), this._resetExtraLabels(i.options, n);
                var s = i.options.timezone !== n.timezone;
                e.extend(i.options, n), this._adjustSettings(t, i, !this._eqNull(n.until) || !this._eqNull(n.since) || s);
                var r = new Date;
                (i._since && i._since < r || i._until && i._until > r) && this._addElem(t[0]), this._updateCountdown(t, i)
            },
            _updateCountdown: function (t, i) {
                if (t = t.jquery ? t : e(t), i = i || this._getInst(t)) {
                    if (t.html(this._generateHTML(i)).toggleClass(this._rtlClass, i.options.isRTL), "pause" !== i._hold && e.isFunction(i.options.onTick)) {
                        var n = "lap" !== i._hold ? i._periods : this._calculatePeriods(i, i._show, i.options.significant, new Date);
                        1 !== i.options.tickInterval && this.periodsToSeconds(n) % i.options.tickInterval != 0 || i.options.onTick.apply(t[0], [n])
                    }
                    if ("pause" !== i._hold && (i._since ? i._now.getTime() < i._since.getTime() : i._now.getTime() >= i._until.getTime()) && !i._expiring) {
                        if (i._expiring = !0, this._hasElem(t[0]) || i.options.alwaysExpire) {
                            if (this._removeElem(t[0]), e.isFunction(i.options.onExpiry) && i.options.onExpiry.apply(t[0], []), i.options.expiryText) {
                                var s = i.options.layout;
                                i.options.layout = i.options.expiryText, this._updateCountdown(t[0], i), i.options.layout = s
                            }
                            i.options.expiryUrl && (window.location = i.options.expiryUrl)
                        }
                        i._expiring = !1
                    } else "pause" === i._hold && this._removeElem(t[0])
                }
            },
            _resetExtraLabels: function (e, t) {
                var i = null;
                for (i in t) i.match(/[Ll]abels[02-9]|compactLabels1/) && (e[i] = t[i]);
                for (i in e) i.match(/[Ll]abels[02-9]|compactLabels1/) && void 0 === t[i] && (e[i] = null)
            },
            _eqNull: function (e) {
                return void 0 === e || null === e
            },
            _adjustSettings: function (t, i, n) {
                for (var s = null, r = 0; r < this._serverSyncs.length; r++) if (this._serverSyncs[r][0] === i.options.serverSync) {
                    s = this._serverSyncs[r][1];
                    break
                }
                var a = null, o = null;
                if (this._eqNull(s)) {
                    var l = e.isFunction(i.options.serverSync) ? i.options.serverSync.apply(t[0], []) : null;
                    a = new Date, o = l ? a.getTime() - l.getTime() : 0, this._serverSyncs.push([i.options.serverSync, o])
                } else a = new Date, o = i.options.serverSync ? s : 0;
                var u = i.options.timezone;
                u = this._eqNull(u) ? -a.getTimezoneOffset() : u, (n || !n && this._eqNull(i._until) && this._eqNull(i._since)) && (i._since = i.options.since, this._eqNull(i._since) || (i._since = this.UTCDate(u, this._determineTime(i._since, null)), i._since && o && i._since.setMilliseconds(i._since.getMilliseconds() + o)), i._until = this.UTCDate(u, this._determineTime(i.options.until, a)), o && i._until.setMilliseconds(i._until.getMilliseconds() + o)), i._show = this._determineShow(i)
            },
            _preDestroy: function (e, t) {
                this._removeElem(e[0]), e.empty()
            },
            pause: function (e) {
                this._hold(e, "pause")
            },
            lap: function (e) {
                this._hold(e, "lap")
            },
            resume: function (e) {
                this._hold(e, null)
            },
            toggle: function (t) {
                this[(e.data(t, this.name) || {})._hold ? "resume" : "pause"](t)
            },
            toggleLap: function (t) {
                this[(e.data(t, this.name) || {})._hold ? "resume" : "lap"](t)
            },
            _hold: function (t, i) {
                var n = e.data(t, this.name);
                if (n) {
                    if ("pause" === n._hold && !i) {
                        n._periods = n._savePeriods;
                        var s = n._since ? "-" : "+";
                        n[n._since ? "_since" : "_until"] = this._determineTime(s + n._periods[0] + "y" + s + n._periods[1] + "o" + s + n._periods[2] + "w" + s + n._periods[3] + "d" + s + n._periods[4] + "h" + s + n._periods[5] + "m" + s + n._periods[6] + "s"), this._addElem(t)
                    }
                    n._hold = i, n._savePeriods = "pause" === i ? n._periods : null, e.data(t, this.name, n), this._updateCountdown(t, n)
                }
            },
            getTimes: function (t) {
                var i = e.data(t, this.name);
                return i ? "pause" === i._hold ? i._savePeriods : i._hold ? this._calculatePeriods(i, i._show, i.options.significant, new Date) : i._periods : null
            },
            _determineTime: function (e, t) {
                var i = this, n = this._eqNull(e) ? t : "string" == typeof e ? function (e) {
                    e = e.toLowerCase();
                    for (var t = new Date, n = t.getFullYear(), s = t.getMonth(), r = t.getDate(), a = t.getHours(), o = t.getMinutes(), l = t.getSeconds(), u = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g, c = u.exec(e); c;) {
                        switch (c[2] || "s") {
                            case"s":
                                l += parseInt(c[1], 10);
                                break;
                            case"m":
                                o += parseInt(c[1], 10);
                                break;
                            case"h":
                                a += parseInt(c[1], 10);
                                break;
                            case"d":
                                r += parseInt(c[1], 10);
                                break;
                            case"w":
                                r += 7 * parseInt(c[1], 10);
                                break;
                            case"o":
                                s += parseInt(c[1], 10), r = Math.min(r, i._getDaysInMonth(n, s));
                                break;
                            case"y":
                                n += parseInt(c[1], 10), r = Math.min(r, i._getDaysInMonth(n, s))
                        }
                        c = u.exec(e)
                    }
                    return new Date(n, s, r, a, o, l, 0)
                }(e) : "number" == typeof e ? function (e) {
                    var t = new Date;
                    return t.setTime(t.getTime() + 1e3 * e), t
                }(e) : e;
                return n && n.setMilliseconds(0), n
            },
            _getDaysInMonth: function (e, t) {
                return 32 - new Date(e, t, 32).getDate()
            },
            _normalLabels: function (e) {
                return e
            },
            _generateHTML: function (t) {
                var i = this;
                t._periods = t._hold ? t._periods : this._calculatePeriods(t, t._show, t.options.significant, new Date);
                var n = !1, s = 0, r = t.options.significant, a = e.extend({}, t._show), o = null;
                for (o = 0; o <= 6; o++) n = n || "?" === t._show[o] && t._periods[o] > 0, a[o] = "?" !== t._show[o] || n ? t._show[o] : null, s += a[o] ? 1 : 0, r -= t._periods[o] > 0 ? 1 : 0;
                var l = [!1, !1, !1, !1, !1, !1, !1];
                for (o = 6; o >= 0; o--) t._show[o] && (t._periods[o] ? l[o] = !0 : (l[o] = r > 0, r--));
                var u = t.options.compact ? t.options.compactLabels : t.options.labels,
                    c = t.options.whichLabels || this._normalLabels, d = function (e) {
                        var n = t.options["compactLabels" + c(t._periods[e])];
                        return a[e] ? i._translateDigits(t, t._periods[e]) + (n ? n[e] : u[e]) + " " : ""
                    }, p = t.options.padZeroes ? 2 : 1, h = function (e) {
                        var n = t.options["labels" + c(t._periods[e])];
                        return !t.options.significant && a[e] || t.options.significant && l[e] ? '<span class="' + i._sectionClass + '"><span class="' + i._amountClass + '">' + i._minDigits(t, t._periods[e], p) + '</span><span class="' + i._periodClass + '">' + (n ? n[e] : u[e]) + "</span></span>" : ""
                    };
                return t.options.layout ? this._buildLayout(t, a, t.options.layout, t.options.compact, t.options.significant, l) : (t.options.compact ? '<span class="' + this._rowClass + " " + this._amountClass + (t._hold ? " " + this._holdingClass : "") + '">' + d(0) + d(1) + d(2) + d(3) + (a[4] ? this._minDigits(t, t._periods[4], 2) : "") + (a[5] ? (a[4] ? t.options.timeSeparator : "") + this._minDigits(t, t._periods[5], 2) : "") + (a[6] ? (a[4] || a[5] ? t.options.timeSeparator : "") + this._minDigits(t, t._periods[6], 2) : "") : '<span class="' + this._rowClass + " " + this._showClass + (t.options.significant || s) + (t._hold ? " " + this._holdingClass : "") + '">' + h(0) + h(1) + h(2) + h(3) + h(4) + h(5) + h(6)) + "</span>" + (t.options.description ? '<span class="' + this._rowClass + " " + this._descrClass + '">' + t.options.description + "</span>" : "")
            },
            _buildLayout: function (t, i, n, s, r, a) {
                for (var o = t.options[s ? "compactLabels" : "labels"], l = t.options.whichLabels || this._normalLabels, u = function (e) {
                    return (t.options[(s ? "compactLabels" : "labels") + l(t._periods[e])] || o)[e]
                }, c = function (e, i) {
                    return t.options.digits[Math.floor(e / i) % 10]
                }, d = {
                    desc: t.options.description,
                    sep: t.options.timeSeparator,
                    yl: u(0),
                    yn: this._minDigits(t, t._periods[0], 1),
                    ynn: this._minDigits(t, t._periods[0], 2),
                    ynnn: this._minDigits(t, t._periods[0], 3),
                    y1: c(t._periods[0], 1),
                    y10: c(t._periods[0], 10),
                    y100: c(t._periods[0], 100),
                    y1000: c(t._periods[0], 1e3),
                    ol: u(1),
                    on: this._minDigits(t, t._periods[1], 1),
                    onn: this._minDigits(t, t._periods[1], 2),
                    onnn: this._minDigits(t, t._periods[1], 3),
                    o1: c(t._periods[1], 1),
                    o10: c(t._periods[1], 10),
                    o100: c(t._periods[1], 100),
                    o1000: c(t._periods[1], 1e3),
                    wl: u(2),
                    wn: this._minDigits(t, t._periods[2], 1),
                    wnn: this._minDigits(t, t._periods[2], 2),
                    wnnn: this._minDigits(t, t._periods[2], 3),
                    w1: c(t._periods[2], 1),
                    w10: c(t._periods[2], 10),
                    w100: c(t._periods[2], 100),
                    w1000: c(t._periods[2], 1e3),
                    dl: u(3),
                    dn: this._minDigits(t, t._periods[3], 1),
                    dnn: this._minDigits(t, t._periods[3], 2),
                    dnnn: this._minDigits(t, t._periods[3], 3),
                    d1: c(t._periods[3], 1),
                    d10: c(t._periods[3], 10),
                    d100: c(t._periods[3], 100),
                    d1000: c(t._periods[3], 1e3),
                    hl: u(4),
                    hn: this._minDigits(t, t._periods[4], 1),
                    hnn: this._minDigits(t, t._periods[4], 2),
                    hnnn: this._minDigits(t, t._periods[4], 3),
                    h1: c(t._periods[4], 1),
                    h10: c(t._periods[4], 10),
                    h100: c(t._periods[4], 100),
                    h1000: c(t._periods[4], 1e3),
                    ml: u(5),
                    mn: this._minDigits(t, t._periods[5], 1),
                    mnn: this._minDigits(t, t._periods[5], 2),
                    mnnn: this._minDigits(t, t._periods[5], 3),
                    m1: c(t._periods[5], 1),
                    m10: c(t._periods[5], 10),
                    m100: c(t._periods[5], 100),
                    m1000: c(t._periods[5], 1e3),
                    sl: u(6),
                    sn: this._minDigits(t, t._periods[6], 1),
                    snn: this._minDigits(t, t._periods[6], 2),
                    snnn: this._minDigits(t, t._periods[6], 3),
                    s1: c(t._periods[6], 1),
                    s10: c(t._periods[6], 10),
                    s100: c(t._periods[6], 100),
                    s1000: c(t._periods[6], 1e3)
                }, p = n, h = 0; h <= 6; h++) {
                    var f = "yowdhms".charAt(h), m = new RegExp("\\{" + f + "<\\}([\\s\\S]*)\\{" + f + ">\\}", "g");
                    p = p.replace(m, !r && i[h] || r && a[h] ? "$1" : "")
                }
                return e.each(d, function (e, t) {
                    var i = new RegExp("\\{" + e + "\\}", "g");
                    p = p.replace(i, t)
                }), p
            },
            _minDigits: function (e, t, i) {
                return t = "" + t, t.length >= i ? this._translateDigits(e, t) : (t = "0000000000" + t, this._translateDigits(e, t.substr(t.length - i)))
            },
            _translateDigits: function (e, t) {
                return ("" + t).replace(/[0-9]/g, function (t) {
                    return e.options.digits[t]
                })
            },
            _determineShow: function (e) {
                var t = e.options.format, i = [];
                return i[0] = t.match("y") ? "?" : t.match("Y") ? "!" : null, i[1] = t.match("o") ? "?" : t.match("O") ? "!" : null, i[2] = t.match("w") ? "?" : t.match("W") ? "!" : null, i[3] = t.match("d") ? "?" : t.match("D") ? "!" : null, i[4] = t.match("h") ? "?" : t.match("H") ? "!" : null, i[5] = t.match("m") ? "?" : t.match("M") ? "!" : null, i[6] = t.match("s") ? "?" : t.match("S") ? "!" : null, i
            },
            _calculatePeriods: function (e, t, i, n) {
                e._now = n, e._now.setMilliseconds(0);
                var s = new Date(e._now.getTime());
                e._since ? n.getTime() < e._since.getTime() ? e._now = n = s : n = e._since : (s.setTime(e._until.getTime()), n.getTime() > e._until.getTime() && (e._now = n = s));
                var r = [0, 0, 0, 0, 0, 0, 0];
                if (t[0] || t[1]) {
                    var a = this._getDaysInMonth(n.getFullYear(), n.getMonth()),
                        o = this._getDaysInMonth(s.getFullYear(), s.getMonth()),
                        l = s.getDate() === n.getDate() || s.getDate() >= Math.min(a, o) && n.getDate() >= Math.min(a, o),
                        u = function (e) {
                            return 60 * (60 * e.getHours() + e.getMinutes()) + e.getSeconds()
                        },
                        c = Math.max(0, 12 * (s.getFullYear() - n.getFullYear()) + s.getMonth() - n.getMonth() + (s.getDate() < n.getDate() && !l || l && u(s) < u(n) ? -1 : 0));
                    r[0] = t[0] ? Math.floor(c / 12) : 0, r[1] = t[1] ? c - 12 * r[0] : 0;
                    var d = (n = new Date(n.getTime())).getDate() === a,
                        p = this._getDaysInMonth(n.getFullYear() + r[0], n.getMonth() + r[1]);
                    n.getDate() > p && n.setDate(p), n.setFullYear(n.getFullYear() + r[0]), n.setMonth(n.getMonth() + r[1]), d && n.setDate(p)
                }
                var h = Math.floor((s.getTime() - n.getTime()) / 1e3), f = null, m = function (e, i) {
                    r[e] = t[e] ? Math.floor(h / i) : 0, h -= r[e] * i
                };
                if (m(2, 604800), m(3, 86400), m(4, 3600), m(5, 60), m(6, 1), h > 0 && !e._since) {
                    var g = [1, 12, 4.3482, 7, 24, 60, 60], v = 6, y = 1;
                    for (f = 6; f >= 0; f--) t[f] && (r[v] >= y && (r[v] = 0, h = 1), h > 0 && (r[f]++, h = 0, v = f, y = 1)), y *= g[f]
                }
                if (i) for (f = 0; f <= 6; f++) i && r[f] ? i-- : i || (r[f] = 0);
                return r
            }
        })
    }(jQuery), function (e) {
        e.fn.countTo = function (t) {
            return t = t || {}, e(this).each(function () {
                function i(e) {
                    var t = n.formatter.call(a, e, n);
                    o.text(t)
                }

                var n = e.extend({}, e.fn.countTo.defaults, {
                        from: e(this).data("from"),
                        to: e(this).data("to"),
                        speed: e(this).data("speed"),
                        refreshInterval: e(this).data("refresh-interval"),
                        decimals: e(this).data("decimals")
                    }, t), s = Math.ceil(n.speed / n.refreshInterval), r = (n.to - n.from) / s, a = this, o = e(this),
                    l = 0, u = n.from, c = o.data("countTo") || {};
                o.data("countTo", c), c.interval && clearInterval(c.interval), c.interval = setInterval(function () {
                    l++, i(u += r), "function" == typeof n.onUpdate && n.onUpdate.call(a, u), l >= s && (o.removeData("countTo"), clearInterval(c.interval), u = n.to, "function" == typeof n.onComplete && n.onComplete.call(a, u))
                }, n.refreshInterval), i(u)
            })
        }, e.fn.countTo.defaults = {
            from: 0,
            to: 0,
            speed: 1e3,
            refreshInterval: 100,
            decimals: 0,
            formatter: function (e, t) {
                return e.toFixed(t.decimals)
            },
            onUpdate: null,
            onComplete: null
        }
    }(jQuery), function (e, t, i, n) {
        function s(t, i) {
            this.settings = null, this.options = e.extend({}, s.Defaults, i), this.$element = e(t), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
                time: null,
                target: null,
                pointer: null,
                stage: {start: null, current: null},
                direction: null
            }, this._states = {
                current: {},
                tags: {initializing: ["busy"], animating: ["busy"], dragging: ["interacting"]}
            }, e.each(["onResize", "onThrottledResize"], e.proxy(function (t, i) {
                this._handlers[i] = e.proxy(this[i], this)
            }, this)), e.each(s.Plugins, e.proxy(function (e, t) {
                this._plugins[e.charAt(0).toLowerCase() + e.slice(1)] = new t(this)
            }, this)), e.each(s.Workers, e.proxy(function (t, i) {
                this._pipe.push({filter: i.filter, run: e.proxy(i.run, this)})
            }, this)), this.setup(), this.initialize()
        }

        s.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            rewind: !1,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: t,
            fallbackEasing: "swing",
            info: !1,
            nestedItemSelector: !1,
            itemElement: "div",
            stageElement: "div",
            refreshClass: "owl-refresh",
            loadedClass: "owl-loaded",
            loadingClass: "owl-loading",
            rtlClass: "owl-rtl",
            responsiveClass: "owl-responsive",
            dragClass: "owl-drag",
            itemClass: "owl-item",
            stageClass: "owl-stage",
            stageOuterClass: "owl-stage-outer",
            grabClass: "owl-grab"
        }, s.Width = {Default: "default", Inner: "inner", Outer: "outer"}, s.Type = {
            Event: "event",
            State: "state"
        }, s.Plugins = {}, s.Workers = [{
            filter: ["width", "settings"], run: function () {
                this._width = this.$element.width()
            }
        }, {
            filter: ["width", "items", "settings"], run: function (e) {
                e.current = this._items && this._items[this.relative(this._current)]
            }
        }, {
            filter: ["items", "settings"], run: function () {
                this.$stage.children(".cloned").remove()
            }
        }, {
            filter: ["width", "items", "settings"], run: function (e) {
                var t = this.settings.margin || "", i = !this.settings.autoWidth, n = this.settings.rtl,
                    s = {width: "auto", "margin-left": n ? t : "", "margin-right": n ? "" : t};
                !i && this.$stage.children().css(s), e.css = s
            }
        }, {
            filter: ["width", "items", "settings"], run: function (e) {
                var t = (this.width() / this.settings.items).toFixed(3) - this.settings.margin, i = null,
                    n = this._items.length, s = !this.settings.autoWidth, r = [];
                for (e.items = {
                    merge: !1,
                    width: t
                }; n--;) i = this._mergers[n], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, e.items.merge = i > 1 || e.items.merge, r[n] = s ? t * i : this._items[n].width();
                this._widths = r
            }
        }, {
            filter: ["items", "settings"], run: function () {
                var t = [], i = this._items, n = this.settings, s = Math.max(2 * n.items, 4),
                    r = 2 * Math.ceil(i.length / 2), a = n.loop && i.length ? n.rewind ? s : Math.max(s, r) : 0, o = "",
                    l = "";
                for (a /= 2; a--;) t.push(this.normalize(t.length / 2, !0)), o += i[t[t.length - 1]][0].outerHTML, t.push(this.normalize(i.length - 1 - (t.length - 1) / 2, !0)), l = i[t[t.length - 1]][0].outerHTML + l;
                this._clones = t, e(o).addClass("cloned").appendTo(this.$stage), e(l).addClass("cloned").prependTo(this.$stage)
            }
        }, {
            filter: ["width", "items", "settings"], run: function () {
                for (var e = this.settings.rtl ? 1 : -1, t = this._clones.length + this._items.length, i = -1, n = 0, s = 0, r = []; ++i < t;) n = r[i - 1] || 0, s = this._widths[this.relative(i)] + this.settings.margin, r.push(n + s * e);
                this._coordinates = r
            }
        }, {
            filter: ["width", "items", "settings"], run: function () {
                var e = this.settings.stagePadding, t = this._coordinates, i = {
                    width: Math.ceil(Math.abs(t[t.length - 1])) + 2 * e,
                    "padding-left": e || "",
                    "padding-right": e || ""
                };
                this.$stage.css(i)
            }
        }, {
            filter: ["width", "items", "settings"], run: function (e) {
                var t = this._coordinates.length, i = !this.settings.autoWidth, n = this.$stage.children();
                if (i && e.items.merge) for (; t--;) e.css.width = this._widths[this.relative(t)], n.eq(t).css(e.css); else i && (e.css.width = e.items.width, n.css(e.css))
            }
        }, {
            filter: ["items"], run: function () {
                this._coordinates.length < 1 && this.$stage.removeAttr("style")
            }
        }, {
            filter: ["width", "items", "settings"], run: function (e) {
                e.current = e.current ? this.$stage.children().index(e.current) : 0, e.current = Math.max(this.minimum(), Math.min(this.maximum(), e.current)), this.reset(e.current)
            }
        }, {
            filter: ["position"], run: function () {
                this.animate(this.coordinates(this._current))
            }
        }, {
            filter: ["width", "position", "items", "settings"], run: function () {
                var e, t, i, n, s = this.settings.rtl ? 1 : -1, r = 2 * this.settings.stagePadding,
                    a = this.coordinates(this.current()) + r, o = a + this.width() * s, l = [];
                for (i = 0, n = this._coordinates.length; n > i; i++) e = this._coordinates[i - 1] || 0, t = Math.abs(this._coordinates[i]) + r * s, (this.op(e, "<=", a) && this.op(e, ">", o) || this.op(t, "<", a) && this.op(t, ">", o)) && l.push(i);
                this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
            }
        }], s.prototype.initialize = function () {
            if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
                var t, i, s;
                t = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : n, s = this.$element.children(i).width(), t.length && 0 >= s && this.preloadAutoWidthImages(t)
            }
            this.$element.addClass(this.options.loadingClass), this.$stage = e("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
        }, s.prototype.setup = function () {
            var t = this.viewport(), i = this.options.responsive, n = -1, s = null;
            i ? (e.each(i, function (e) {
                t >= e && e > n && (n = Number(e))
            }), s = e.extend({}, this.options, i[n]), delete s.responsive, s.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + n))) : s = e.extend({}, this.options), (null === this.settings || this._breakpoint !== n) && (this.trigger("change", {
                property: {
                    name: "settings",
                    value: s
                }
            }), this._breakpoint = n, this.settings = s, this.invalidate("settings"), this.trigger("changed", {
                property: {
                    name: "settings",
                    value: this.settings
                }
            }))
        }, s.prototype.optionsLogic = function () {
            this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
        }, s.prototype.prepare = function (t) {
            var i = this.trigger("prepare", {content: t});
            return i.data || (i.data = e("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(t)), this.trigger("prepared", {content: i.data}), i.data
        }, s.prototype.update = function () {
            for (var t = 0, i = this._pipe.length, n = e.proxy(function (e) {
                return this[e]
            }, this._invalidated), s = {}; i > t;) (this._invalidated.all || e.grep(this._pipe[t].filter, n).length > 0) && this._pipe[t].run(s), t++;
            this._invalidated = {}, !this.is("valid") && this.enter("valid")
        }, s.prototype.width = function (e) {
            switch (e = e || s.Width.Default) {
                case s.Width.Inner:
                case s.Width.Outer:
                    return this._width;
                default:
                    return this._width - 2 * this.settings.stagePadding + this.settings.margin
            }
        }, s.prototype.refresh = function () {
            this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
        }, s.prototype.onThrottledResize = function () {
            t.clearTimeout(this.resizeTimer), this.resizeTimer = t.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
        }, s.prototype.onResize = function () {
            return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
        }, s.prototype.registerEventHandlers = function () {
            e.support.transition && this.$stage.on(e.support.transition.end + ".owl.core", e.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(t, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", e.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
                return !1
            })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", e.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", e.proxy(this.onDragEnd, this)))
        }, s.prototype.onDragStart = function (t) {
            var n = null;
            3 !== t.which && (e.support.transform ? (n = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), n = {
                x: n[16 === n.length ? 12 : 4],
                y: n[16 === n.length ? 13 : 5]
            }) : (n = this.$stage.position(), n = {
                x: this.settings.rtl ? n.left + this.$stage.width() - this.width() + this.settings.margin : n.left,
                y: n.top
            }), this.is("animating") && (e.support.transform ? this.animate(n.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === t.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = e(t.target), this._drag.stage.start = n, this._drag.stage.current = n, this._drag.pointer = this.pointer(t), e(i).on("mouseup.owl.core touchend.owl.core", e.proxy(this.onDragEnd, this)), e(i).one("mousemove.owl.core touchmove.owl.core", e.proxy(function (t) {
                var n = this.difference(this._drag.pointer, this.pointer(t));
                e(i).on("mousemove.owl.core touchmove.owl.core", e.proxy(this.onDragMove, this)), Math.abs(n.x) < Math.abs(n.y) && this.is("valid") || (t.preventDefault(), this.enter("dragging"), this.trigger("drag"))
            }, this)))
        }, s.prototype.onDragMove = function (e) {
            var t = null, i = null, n = null, s = this.difference(this._drag.pointer, this.pointer(e)),
                r = this.difference(this._drag.stage.start, s);
            this.is("dragging") && (e.preventDefault(), this.settings.loop ? (t = this.coordinates(this.minimum()), i = this.coordinates(this.maximum() + 1) - t, r.x = ((r.x - t) % i + i) % i + t) : (t = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), n = this.settings.pullDrag ? -1 * s.x / 5 : 0, r.x = Math.max(Math.min(r.x, t + n), i + n)), this._drag.stage.current = r, this.animate(r.x))
        }, s.prototype.onDragEnd = function (t) {
            var n = this.difference(this._drag.pointer, this.pointer(t)), s = this._drag.stage.current,
                r = n.x > 0 ^ this.settings.rtl ? "left" : "right";
            e(i).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== n.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(s.x, 0 !== n.x ? r : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = r, (Math.abs(n.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
                return !1
            })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
        }, s.prototype.closest = function (t, i) {
            var n = -1, s = this.width(), r = this.coordinates();
            return this.settings.freeDrag || e.each(r, e.proxy(function (e, a) {
                return t > a - 30 && a + 30 > t ? n = e : this.op(t, "<", a) && this.op(t, ">", r[e + 1] || a - s) && (n = "left" === i ? e + 1 : e), -1 === n
            }, this)), this.settings.loop || (this.op(t, ">", r[this.minimum()]) ? n = t = this.minimum() : this.op(t, "<", r[this.maximum()]) && (n = t = this.maximum())), n
        }, s.prototype.animate = function (t) {
            var i = this.speed() > 0;
            this.is("animating") && this.onTransitionEnd(), i && (this.enter("animating"), this.trigger("translate")), e.support.transform3d && e.support.transition ? this.$stage.css({
                transform: "translate3d(" + t + "px,0px,0px)",
                transition: this.speed() / 1e3 + "s"
            }) : i ? this.$stage.animate({left: t + "px"}, this.speed(), this.settings.fallbackEasing, e.proxy(this.onTransitionEnd, this)) : this.$stage.css({left: t + "px"})
        }, s.prototype.is = function (e) {
            return this._states.current[e] && this._states.current[e] > 0
        }, s.prototype.current = function (e) {
            if (e === n) return this._current;
            if (0 === this._items.length) return n;
            if (e = this.normalize(e), this._current !== e) {
                var t = this.trigger("change", {property: {name: "position", value: e}});
                t.data !== n && (e = this.normalize(t.data)), this._current = e, this.invalidate("position"), this.trigger("changed", {
                    property: {
                        name: "position",
                        value: this._current
                    }
                })
            }
            return this._current
        }, s.prototype.invalidate = function (t) {
            return "string" === e.type(t) && (this._invalidated[t] = !0, this.is("valid") && this.leave("valid")), e.map(this._invalidated, function (e, t) {
                return t
            })
        }, s.prototype.reset = function (e) {
            (e = this.normalize(e)) !== n && (this._speed = 0, this._current = e, this.suppress(["translate", "translated"]), this.animate(this.coordinates(e)), this.release(["translate", "translated"]))
        }, s.prototype.normalize = function (t, i) {
            var s = this._items.length, r = i ? 0 : this._clones.length;
            return !e.isNumeric(t) || 1 > s ? t = n : (0 > t || t >= s + r) && (t = ((t - r / 2) % s + s) % s + r / 2), t
        }, s.prototype.relative = function (e) {
            return e -= this._clones.length / 2, this.normalize(e, !0)
        }, s.prototype.maximum = function (e) {
            var t, i = this.settings, n = this._coordinates.length,
                s = Math.abs(this._coordinates[n - 1]) - this._width, r = -1;
            if (i.loop) n = this._clones.length / 2 + this._items.length - 1; else if (i.autoWidth || i.merge) for (; n - r > 1;) Math.abs(this._coordinates[t = n + r >> 1]) < s ? r = t : n = t; else n = i.center ? this._items.length - 1 : this._items.length - i.items;
            return e && (n -= this._clones.length / 2), Math.max(n, 0)
        }, s.prototype.minimum = function (e) {
            return e ? 0 : this._clones.length / 2
        }, s.prototype.items = function (e) {
            return e === n ? this._items.slice() : (e = this.normalize(e, !0), this._items[e])
        }, s.prototype.mergers = function (e) {
            return e === n ? this._mergers.slice() : (e = this.normalize(e, !0), this._mergers[e])
        }, s.prototype.clones = function (t) {
            var i = this._clones.length / 2, s = i + this._items.length, r = function (e) {
                return e % 2 == 0 ? s + e / 2 : i - (e + 1) / 2
            };
            return t === n ? e.map(this._clones, function (e, t) {
                return r(t)
            }) : e.map(this._clones, function (e, i) {
                return e === t ? r(i) : null
            })
        }, s.prototype.speed = function (e) {
            return e !== n && (this._speed = e), this._speed
        }, s.prototype.coordinates = function (t) {
            var i = null;
            return t === n ? e.map(this._coordinates, e.proxy(function (e, t) {
                return this.coordinates(t)
            }, this)) : (this.settings.center ? (i = this._coordinates[t], i += (this.width() - i + (this._coordinates[t - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : i = this._coordinates[t - 1] || 0, i)
        }, s.prototype.duration = function (e, t, i) {
            return Math.min(Math.max(Math.abs(t - e), 1), 6) * Math.abs(i || this.settings.smartSpeed)
        }, s.prototype.to = function (e, t) {
            var i = this.current(), n = null, s = e - this.relative(i), r = (s > 0) - (0 > s), a = this._items.length,
                o = this.minimum(), l = this.maximum();
            this.settings.loop ? (!this.settings.rewind && Math.abs(s) > a / 2 && (s += -1 * r * a), e = i + s, (n = ((e - o) % a + a) % a + o) !== e && l >= n - s && n - s > 0 && (i = n - s, e = n, this.reset(i))) : this.settings.rewind ? (l += 1, e = (e % l + l) % l) : e = Math.max(o, Math.min(l, e)), this.speed(this.duration(i, e, t)), this.current(e), this.$element.is(":visible") && this.update()
        }, s.prototype.next = function (e) {
            e = e || !1, this.to(this.relative(this.current()) + 1, e)
        }, s.prototype.prev = function (e) {
            e = e || !1, this.to(this.relative(this.current()) - 1, e)
        }, s.prototype.onTransitionEnd = function (e) {
            return (e === n || (e.stopPropagation(), (e.target || e.srcElement || e.originalTarget) === this.$stage.get(0))) && (this.leave("animating"), void this.trigger("translated"))
        }, s.prototype.viewport = function () {
            var n;
            if (this.options.responsiveBaseElement !== t) n = e(this.options.responsiveBaseElement).width(); else if (t.innerWidth) n = t.innerWidth; else {
                if (!i.documentElement || !i.documentElement.clientWidth) throw"Can not detect viewport width.";
                n = i.documentElement.clientWidth
            }
            return n
        }, s.prototype.replace = function (t) {
            this.$stage.empty(), this._items = [], t && (t = t instanceof jQuery ? t : e(t)), this.settings.nestedItemSelector && (t = t.find("." + this.settings.nestedItemSelector)), t.filter(function () {
                return 1 === this.nodeType
            }).each(e.proxy(function (e, t) {
                t = this.prepare(t), this.$stage.append(t), this._items.push(t), this._mergers.push(1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
            }, this)), this.reset(e.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
        }, s.prototype.add = function (t, i) {
            var s = this.relative(this._current);
            i = i === n ? this._items.length : this.normalize(i, !0), t = t instanceof jQuery ? t : e(t), this.trigger("add", {
                content: t,
                position: i
            }), t = this.prepare(t), 0 === this._items.length || i === this._items.length ? (0 === this._items.length && this.$stage.append(t), 0 !== this._items.length && this._items[i - 1].after(t), this._items.push(t), this._mergers.push(1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[i].before(t), this._items.splice(i, 0, t), this._mergers.splice(i, 0, 1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this._items[s] && this.reset(this._items[s].index()), this.invalidate("items"), this.trigger("added", {
                content: t,
                position: i
            })
        }, s.prototype.remove = function (e) {
            (e = this.normalize(e, !0)) !== n && (this.trigger("remove", {
                content: this._items[e],
                position: e
            }), this._items[e].remove(), this._items.splice(e, 1), this._mergers.splice(e, 1), this.invalidate("items"), this.trigger("removed", {
                content: null,
                position: e
            }))
        }, s.prototype.preloadAutoWidthImages = function (t) {
            t.each(e.proxy(function (t, i) {
                this.enter("pre-loading"), i = e(i), e(new Image).one("load", e.proxy(function (e) {
                    i.attr("src", e.target.src), i.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
                }, this)).attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"))
            }, this))
        }, s.prototype.destroy = function () {
            this.$element.off(".owl.core"), this.$stage.off(".owl.core"), e(i).off(".owl.core"), !1 !== this.settings.responsive && (t.clearTimeout(this.resizeTimer), this.off(t, "resize", this._handlers.onThrottledResize));
            for (var n in this._plugins) this._plugins[n].destroy();
            this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
        }, s.prototype.op = function (e, t, i) {
            var n = this.settings.rtl;
            switch (t) {
                case"<":
                    return n ? e > i : i > e;
                case">":
                    return n ? i > e : e > i;
                case">=":
                    return n ? i >= e : e >= i;
                case"<=":
                    return n ? e >= i : i >= e
            }
        }, s.prototype.on = function (e, t, i, n) {
            e.addEventListener ? e.addEventListener(t, i, n) : e.attachEvent && e.attachEvent("on" + t, i)
        }, s.prototype.off = function (e, t, i, n) {
            e.removeEventListener ? e.removeEventListener(t, i, n) : e.detachEvent && e.detachEvent("on" + t, i)
        }, s.prototype.trigger = function (t, i, n, r, a) {
            var o = {item: {count: this._items.length, index: this.current()}},
                l = e.camelCase(e.grep(["on", t, n], function (e) {
                    return e
                }).join("-").toLowerCase()),
                u = e.Event([t, "owl", n || "carousel"].join(".").toLowerCase(), e.extend({relatedTarget: this}, o, i));
            return this._supress[t] || (e.each(this._plugins, function (e, t) {
                t.onTrigger && t.onTrigger(u)
            }), this.register({
                type: s.Type.Event,
                name: t
            }), this.$element.trigger(u), this.settings && "function" == typeof this.settings[l] && this.settings[l].call(this, u)), u
        }, s.prototype.enter = function (t) {
            e.each([t].concat(this._states.tags[t] || []), e.proxy(function (e, t) {
                this._states.current[t] === n && (this._states.current[t] = 0), this._states.current[t]++
            }, this))
        }, s.prototype.leave = function (t) {
            e.each([t].concat(this._states.tags[t] || []), e.proxy(function (e, t) {
                this._states.current[t]--
            }, this))
        }, s.prototype.register = function (t) {
            if (t.type === s.Type.Event) {
                if (e.event.special[t.name] || (e.event.special[t.name] = {}), !e.event.special[t.name].owl) {
                    var i = e.event.special[t.name]._default;
                    e.event.special[t.name]._default = function (e) {
                        return !i || !i.apply || e.namespace && -1 !== e.namespace.indexOf("owl") ? e.namespace && e.namespace.indexOf("owl") > -1 : i.apply(this, arguments)
                    }, e.event.special[t.name].owl = !0
                }
            } else t.type === s.Type.State && (this._states.tags[t.name] ? this._states.tags[t.name] = this._states.tags[t.name].concat(t.tags) : this._states.tags[t.name] = t.tags, this._states.tags[t.name] = e.grep(this._states.tags[t.name], e.proxy(function (i, n) {
                return e.inArray(i, this._states.tags[t.name]) === n
            }, this)))
        }, s.prototype.suppress = function (t) {
            e.each(t, e.proxy(function (e, t) {
                this._supress[t] = !0
            }, this))
        }, s.prototype.release = function (t) {
            e.each(t, e.proxy(function (e, t) {
                delete this._supress[t]
            }, this))
        }, s.prototype.pointer = function (e) {
            var i = {x: null, y: null};
            return e = e.originalEvent || e || t.event, e = e.touches && e.touches.length ? e.touches[0] : e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e, e.pageX ? (i.x = e.pageX, i.y = e.pageY) : (i.x = e.clientX, i.y = e.clientY), i
        }, s.prototype.difference = function (e, t) {
            return {x: e.x - t.x, y: e.y - t.y}
        }, e.fn.owlCarousel = function (t) {
            var i = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                var n = e(this), r = n.data("owl.carousel");
                r || (r = new s(this, "object" == typeof t && t), n.data("owl.carousel", r), e.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (t, i) {
                    r.register({
                        type: s.Type.Event,
                        name: i
                    }), r.$element.on(i + ".owl.carousel.core", e.proxy(function (e) {
                        e.namespace && e.relatedTarget !== this && (this.suppress([i]), r[i].apply(this, [].slice.call(arguments, 1)), this.release([i]))
                    }, r))
                })), "string" == typeof t && "_" !== t.charAt(0) && r[t].apply(r, i)
            })
        }, e.fn.owlCarousel.Constructor = s
    }(window.Zepto || window.jQuery, window, document), function (e, t, i, n) {
        var s = function (t) {
            this._core = t, this._interval = null, this._visible = null, this._handlers = {
                "initialized.owl.carousel": e.proxy(function (e) {
                    e.namespace && this._core.settings.autoRefresh && this.watch()
                }, this)
            }, this._core.options = e.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        s.Defaults = {autoRefresh: !0, autoRefreshInterval: 500}, s.prototype.watch = function () {
            this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = t.setInterval(e.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
        }, s.prototype.refresh = function () {
            this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
        }, s.prototype.destroy = function () {
            var e, i;
            t.clearInterval(this._interval);
            for (e in this._handlers) this._core.$element.off(e, this._handlers[e]);
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
        }, e.fn.owlCarousel.Constructor.Plugins.AutoRefresh = s
    }(window.Zepto || window.jQuery, window, document), function (e, t, i, n) {
        var s = function (t) {
            this._core = t, this._loaded = [], this._handlers = {
                "initialized.owl.carousel change.owl.carousel": e.proxy(function (t) {
                    if (t.namespace && this._core.settings && this._core.settings.lazyLoad && (t.property && "position" == t.property.name || "initialized" == t.type)) for (var i = this._core.settings, n = i.center && Math.ceil(i.items / 2) || i.items, s = i.center && -1 * n || 0, r = (t.property && t.property.value || this._core.current()) + s, a = this._core.clones().length, o = e.proxy(function (e, t) {
                        this.load(t)
                    }, this); s++ < n;) this.load(a / 2 + this._core.relative(r)), a && e.each(this._core.clones(this._core.relative(r)), o), r++
                }, this)
            }, this._core.options = e.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        s.Defaults = {lazyLoad: !1}, s.prototype.load = function (i) {
            var n = this._core.$stage.children().eq(i), s = n && n.find(".owl-lazy");
            !s || e.inArray(n.get(0), this._loaded) > -1 || (s.each(e.proxy(function (i, n) {
                var s, r = e(n), a = t.devicePixelRatio > 1 && r.attr("data-src-retina") || r.attr("data-src");
                this._core.trigger("load", {
                    element: r,
                    url: a
                }, "lazy"), r.is("img") ? r.one("load.owl.lazy", e.proxy(function () {
                    r.css("opacity", 1), this._core.trigger("loaded", {element: r, url: a}, "lazy")
                }, this)).attr("src", a) : (s = new Image, s.onload = e.proxy(function () {
                    r.css({
                        "background-image": "url(" + a + ")",
                        opacity: "1"
                    }), this._core.trigger("loaded", {element: r, url: a}, "lazy")
                }, this), s.src = a)
            }, this)), this._loaded.push(n.get(0)))
        }, s.prototype.destroy = function () {
            var e, t;
            for (e in this.handlers) this._core.$element.off(e, this.handlers[e]);
            for (t in Object.getOwnPropertyNames(this)) "function" != typeof this[t] && (this[t] = null)
        }, e.fn.owlCarousel.Constructor.Plugins.Lazy = s
    }(window.Zepto || window.jQuery, window, document), function (e, t, i, n) {
        var s = function (t) {
            this._core = t, this._handlers = {
                "initialized.owl.carousel refreshed.owl.carousel": e.proxy(function (e) {
                    e.namespace && this._core.settings.autoHeight && this.update()
                }, this), "changed.owl.carousel": e.proxy(function (e) {
                    e.namespace && this._core.settings.autoHeight && "position" == e.property.name && this.update()
                }, this), "loaded.owl.lazy": e.proxy(function (e) {
                    e.namespace && this._core.settings.autoHeight && e.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
                }, this)
            }, this._core.options = e.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        s.Defaults = {autoHeight: !1, autoHeightClass: "owl-height"}, s.prototype.update = function () {
            var t = this._core._current, i = t + this._core.settings.items,
                n = this._core.$stage.children().toArray().slice(t, i);
            heights = [], maxheight = 0, e.each(n, function (t, i) {
                heights.push(e(i).height())
            }), maxheight = Math.max.apply(null, heights), this._core.$stage.parent().height(maxheight).addClass(this._core.settings.autoHeightClass)
        }, s.prototype.destroy = function () {
            var e, t;
            for (e in this._handlers) this._core.$element.off(e, this._handlers[e]);
            for (t in Object.getOwnPropertyNames(this)) "function" != typeof this[t] && (this[t] = null)
        }, e.fn.owlCarousel.Constructor.Plugins.AutoHeight = s
    }(window.Zepto || window.jQuery, window, document), function (e, t, i, n) {
        var s = function (t) {
            this._core = t, this._videos = {}, this._playing = null, this._handlers = {
                "initialized.owl.carousel": e.proxy(function (e) {
                    e.namespace && this._core.register({type: "state", name: "playing", tags: ["interacting"]})
                }, this), "resize.owl.carousel": e.proxy(function (e) {
                    e.namespace && this._core.settings.video && this.isInFullScreen() && e.preventDefault()
                }, this), "refreshed.owl.carousel": e.proxy(function (e) {
                    e.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
                }, this), "changed.owl.carousel": e.proxy(function (e) {
                    e.namespace && "position" === e.property.name && this._playing && this.stop()
                }, this), "prepared.owl.carousel": e.proxy(function (t) {
                    if (t.namespace) {
                        var i = e(t.content).find(".owl-video");
                        i.length && (i.css("display", "none"), this.fetch(i, e(t.content)))
                    }
                }, this)
            }, this._core.options = e.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", e.proxy(function (e) {
                this.play(e)
            }, this))
        };
        s.Defaults = {video: !1, videoHeight: !1, videoWidth: !1}, s.prototype.fetch = function (e, t) {
            var i = e.attr("data-vimeo-id") ? "vimeo" : "youtube",
                n = e.attr("data-vimeo-id") || e.attr("data-youtube-id"),
                s = e.attr("data-width") || this._core.settings.videoWidth,
                r = e.attr("data-height") || this._core.settings.videoHeight, a = e.attr("href");
            if (!a) throw new Error("Missing video URL.");
            if ((n = a.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu") > -1) i = "youtube"; else {
                if (!(n[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
                i = "vimeo"
            }
            n = n[6], this._videos[a] = {
                type: i,
                id: n,
                width: s,
                height: r
            }, t.attr("data-video", a), this.thumbnail(e, this._videos[a])
        }, s.prototype.thumbnail = function (t, i) {
            var n, s, r, a = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
                o = t.find("img"), l = "src", u = "", c = this._core.settings, d = function (e) {
                    s = '<div class="owl-video-play-icon"></div>', n = c.lazyLoad ? '<div class="owl-video-tn ' + u + '" ' + l + '="' + e + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + e + ')"></div>', t.after(n), t.after(s)
                };
            return t.wrap('<div class="owl-video-wrapper"' + a + "></div>"), this._core.settings.lazyLoad && (l = "data-src", u = "owl-lazy"), o.length ? (d(o.attr(l)), o.remove(), !1) : void("youtube" === i.type ? (r = "http://img.youtube.com/vi/" + i.id + "/hqdefault.jpg", d(r)) : "vimeo" === i.type && e.ajax({
                type: "GET",
                url: "http://vimeo.com/api/v2/video/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function (e) {
                    r = e[0].thumbnail_large, d(r)
                }
            }))
        }, s.prototype.stop = function () {
            this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
        }, s.prototype.play = function (t) {
            var i, n = e(t.target).closest("." + this._core.settings.itemClass), s = this._videos[n.attr("data-video")],
                r = s.width || "100%", a = s.height || this._core.$stage.height();
            this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), n = this._core.items(this._core.relative(n.index())), this._core.reset(n.index()), "youtube" === s.type ? i = '<iframe width="' + r + '" height="' + a + '" src="http://www.youtube.com/embed/' + s.id + "?autoplay=1&v=" + s.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === s.type && (i = '<iframe src="http://player.vimeo.com/video/' + s.id + '?autoplay=1" width="' + r + '" height="' + a + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), e('<div class="owl-video-frame">' + i + "</div>").insertAfter(n.find(".owl-video")), this._playing = n.addClass("owl-video-playing"))
        }, s.prototype.isInFullScreen = function () {
            var t = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
            return t && e(t).parent().hasClass("owl-video-frame")
        }, s.prototype.destroy = function () {
            var e, t;
            this._core.$element.off("click.owl.video");
            for (e in this._handlers) this._core.$element.off(e, this._handlers[e]);
            for (t in Object.getOwnPropertyNames(this)) "function" != typeof this[t] && (this[t] = null)
        }, e.fn.owlCarousel.Constructor.Plugins.Video = s
    }(window.Zepto || window.jQuery, window, document), function (e, t, i, n) {
        var s = function (t) {
            this.core = t, this.core.options = e.extend({}, s.Defaults, this.core.options), this.swapping = !0, this.previous = n, this.next = n, this.handlers = {
                "change.owl.carousel": e.proxy(function (e) {
                    e.namespace && "position" == e.property.name && (this.previous = this.core.current(), this.next = e.property.value)
                }, this), "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": e.proxy(function (e) {
                    e.namespace && (this.swapping = "translated" == e.type)
                }, this), "translate.owl.carousel": e.proxy(function (e) {
                    e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
                }, this)
            }, this.core.$element.on(this.handlers)
        };
        s.Defaults = {animateOut: !1, animateIn: !1}, s.prototype.swap = function () {
            if (1 === this.core.settings.items && e.support.animation && e.support.transition) {
                this.core.speed(0);
                var t, i = e.proxy(this.clear, this), n = this.core.$stage.children().eq(this.previous),
                    s = this.core.$stage.children().eq(this.next), r = this.core.settings.animateIn,
                    a = this.core.settings.animateOut;
                this.core.current() !== this.previous && (a && (t = this.core.coordinates(this.previous) - this.core.coordinates(this.next), n.one(e.support.animation.end, i).css({left: t + "px"}).addClass("animated owl-animated-out").addClass(a)), r && s.one(e.support.animation.end, i).addClass("animated owl-animated-in").addClass(r))
            }
        }, s.prototype.clear = function (t) {
            e(t.target).css({left: ""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
        }, s.prototype.destroy = function () {
            var e, t;
            for (e in this.handlers) this.core.$element.off(e, this.handlers[e]);
            for (t in Object.getOwnPropertyNames(this)) "function" != typeof this[t] && (this[t] = null)
        }, e.fn.owlCarousel.Constructor.Plugins.Animate = s
    }(window.Zepto || window.jQuery, window, document), function (e, t, i, n) {
        var s = function (t) {
            this._core = t, this._interval = null, this._paused = !1, this._handlers = {
                "changed.owl.carousel": e.proxy(function (e) {
                    e.namespace && "settings" === e.property.name && (this._core.settings.autoplay ? this.play() : this.stop())
                }, this), "initialized.owl.carousel": e.proxy(function (e) {
                    e.namespace && this._core.settings.autoplay && this.play()
                }, this), "play.owl.autoplay": e.proxy(function (e, t, i) {
                    e.namespace && this.play(t, i)
                }, this), "stop.owl.autoplay": e.proxy(function (e) {
                    e.namespace && this.stop()
                }, this), "mouseover.owl.autoplay": e.proxy(function () {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                }, this), "mouseleave.owl.autoplay": e.proxy(function () {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
                }, this)
            }, this._core.$element.on(this._handlers), this._core.options = e.extend({}, s.Defaults, this._core.options)
        };
        s.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        }, s.prototype.play = function (n, s) {
            this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._interval = t.setInterval(e.proxy(function () {
                this._paused || this._core.is("busy") || this._core.is("interacting") || i.hidden || this._core.next(s || this._core.settings.autoplaySpeed)
            }, this), n || this._core.settings.autoplayTimeout))
        }, s.prototype.stop = function () {
            this._core.is("rotating") && (t.clearInterval(this._interval), this._core.leave("rotating"))
        }, s.prototype.pause = function () {
            this._core.is("rotating") && (this._paused = !0)
        }, s.prototype.destroy = function () {
            var e, t;
            this.stop();
            for (e in this._handlers) this._core.$element.off(e, this._handlers[e]);
            for (t in Object.getOwnPropertyNames(this)) "function" != typeof this[t] && (this[t] = null)
        }, e.fn.owlCarousel.Constructor.Plugins.autoplay = s
    }(window.Zepto || window.jQuery, window, document), function (e, t, i, n) {
        "use strict";
        var s = function (t) {
            this._core = t, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
                next: this._core.next,
                prev: this._core.prev,
                to: this._core.to
            }, this._handlers = {
                "prepared.owl.carousel": e.proxy(function (t) {
                    t.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + e(t.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot") + "</div>")
                }, this), "added.owl.carousel": e.proxy(function (e) {
                    e.namespace && this._core.settings.dotsData && this._templates.splice(e.position, 0, this._templates.pop())
                }, this), "remove.owl.carousel": e.proxy(function (e) {
                    e.namespace && this._core.settings.dotsData && this._templates.splice(e.position, 1)
                }, this), "changed.owl.carousel": e.proxy(function (e) {
                    e.namespace && "position" == e.property.name && this.draw()
                }, this), "initialized.owl.carousel": e.proxy(function (e) {
                    e.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
                }, this), "refreshed.owl.carousel": e.proxy(function (e) {
                    e.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
                }, this)
            }, this._core.options = e.extend({}, s.Defaults, this._core.options), this.$element.on(this._handlers)
        };
        s.Defaults = {
            nav: !1,
            navText: ["prev", "next"],
            navSpeed: !1,
            navElement: "div",
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1
        }, s.prototype.initialize = function () {
            var t, i = this._core.settings;
            this._controls.$relative = (i.navContainer ? e(i.navContainer) : e("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = e("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", e.proxy(function (e) {
                this.prev(i.navSpeed)
            }, this)), this._controls.$next = e("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", e.proxy(function (e) {
                this.next(i.navSpeed)
            }, this)), i.dotsData || (this._templates = [e("<div>").addClass(i.dotClass).append(e("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? e(i.dotsContainer) : e("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", e.proxy(function (t) {
                var n = e(t.target).parent().is(this._controls.$absolute) ? e(t.target).index() : e(t.target).parent().index();
                t.preventDefault(), this.to(n, i.dotsSpeed)
            }, this));
            for (t in this._overrides) this._core[t] = e.proxy(this[t], this)
        }, s.prototype.destroy = function () {
            var e, t, i, n;
            for (e in this._handlers) this.$element.off(e, this._handlers[e]);
            for (t in this._controls) this._controls[t].remove();
            for (n in this.overides) this._core[n] = this._overrides[n];
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
        }, s.prototype.update = function () {
            var e, t, i, n = this._core.clones().length / 2, s = n + this._core.items().length,
                r = this._core.maximum(!0), a = this._core.settings,
                o = a.center || a.autoWidth || a.dotsData ? 1 : a.dotsEach || a.items;
            if ("page" !== a.slideBy && (a.slideBy = Math.min(a.slideBy, a.items)), a.dots || "page" == a.slideBy) for (this._pages = [], e = n, t = 0, i = 0; s > e; e++) {
                if (t >= o || 0 === t) {
                    if (this._pages.push({
                            start: Math.min(r, e - n),
                            end: e - n + o - 1
                        }), Math.min(r, e - n) === r) break;
                    t = 0, ++i
                }
                t += this._core.mergers(this._core.relative(e))
            }
        }, s.prototype.draw = function () {
            var t, i = this._core.settings, n = this._core.items().length <= i.items,
                s = this._core.relative(this._core.current()), r = i.loop || i.rewind;
            this._controls.$relative.toggleClass("disabled", !i.nav || n), i.nav && (this._controls.$previous.toggleClass("disabled", !r && s <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !r && s >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !i.dots || n), i.dots && (t = this._pages.length - this._controls.$absolute.children().length, i.dotsData && 0 !== t ? this._controls.$absolute.html(this._templates.join("")) : t > 0 ? this._controls.$absolute.append(new Array(t + 1).join(this._templates[0])) : 0 > t && this._controls.$absolute.children().slice(t).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(e.inArray(this.current(), this._pages)).addClass("active"))
        }, s.prototype.onTrigger = function (t) {
            var i = this._core.settings;
            t.page = {
                index: e.inArray(this.current(), this._pages),
                count: this._pages.length,
                size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items)
            }
        }, s.prototype.current = function () {
            var t = this._core.relative(this._core.current());
            return e.grep(this._pages, e.proxy(function (e, i) {
                return e.start <= t && e.end >= t
            }, this)).pop()
        }, s.prototype.getPosition = function (t) {
            var i, n, s = this._core.settings;
            return "page" == s.slideBy ? (i = e.inArray(this.current(), this._pages), n = this._pages.length, t ? ++i : --i, i = this._pages[(i % n + n) % n].start) : (i = this._core.relative(this._core.current()), n = this._core.items().length, t ? i += s.slideBy : i -= s.slideBy), i
        }, s.prototype.next = function (t) {
            e.proxy(this._overrides.to, this._core)(this.getPosition(!0), t)
        }, s.prototype.prev = function (t) {
            e.proxy(this._overrides.to, this._core)(this.getPosition(!1), t)
        }, s.prototype.to = function (t, i, n) {
            var s;
            n ? e.proxy(this._overrides.to, this._core)(t, i) : (s = this._pages.length, e.proxy(this._overrides.to, this._core)(this._pages[(t % s + s) % s].start, i))
        }, e.fn.owlCarousel.Constructor.Plugins.Navigation = s
    }(window.Zepto || window.jQuery, window, document), function (e, t, i, n) {
        "use strict";
        var s = function (i) {
            this._core = i, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
                "initialized.owl.carousel": e.proxy(function (i) {
                    i.namespace && "URLHash" === this._core.settings.startPosition && e(t).trigger("hashchange.owl.navigation")
                }, this), "prepared.owl.carousel": e.proxy(function (t) {
                    if (t.namespace) {
                        var i = e(t.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                        if (!i) return;
                        this._hashes[i] = t.content
                    }
                }, this), "changed.owl.carousel": e.proxy(function (i) {
                    if (i.namespace && "position" === i.property.name) {
                        var n = this._core.items(this._core.relative(this._core.current())),
                            s = e.map(this._hashes, function (e, t) {
                                return e === n ? t : null
                            }).join();
                        if (!s || t.location.hash.slice(1) === s) return;
                        t.location.hash = s
                    }
                }, this)
            }, this._core.options = e.extend({}, s.Defaults, this._core.options), this.$element.on(this._handlers), e(t).on("hashchange.owl.navigation", e.proxy(function (e) {
                var i = t.location.hash.substring(1), n = this._core.$stage.children(),
                    s = this._hashes[i] && n.index(this._hashes[i]);
                void 0 !== s && s !== this._core.current() && this._core.to(this._core.relative(s), !1, !0)
            }, this))
        };
        s.Defaults = {URLhashListener: !1}, s.prototype.destroy = function () {
            var i, n;
            e(t).off("hashchange.owl.navigation");
            for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
            for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
        }, e.fn.owlCarousel.Constructor.Plugins.Hash = s
    }(window.Zepto || window.jQuery, window, document), function (e, t, i, n) {
        function s(t, i) {
            var s = !1, r = t.charAt(0).toUpperCase() + t.slice(1);
            return e.each((t + " " + o.join(r + " ") + r).split(" "), function (e, t) {
                return a[t] !== n ? (s = !i || t, !1) : void 0
            }), s
        }

        function r(e) {
            return s(e, !0)
        }

        var a = e("<support>").get(0).style, o = "Webkit Moz O ms".split(" "), l = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        }, u = {
            csstransforms: function () {
                return !!s("transform")
            }, csstransforms3d: function () {
                return !!s("perspective")
            }, csstransitions: function () {
                return !!s("transition")
            }, cssanimations: function () {
                return !!s("animation")
            }
        };
        u.csstransitions() && (e.support.transition = new String(r("transition")), e.support.transition.end = l.transition.end[e.support.transition]), u.cssanimations() && (e.support.animation = new String(r("animation")), e.support.animation.end = l.animation.end[e.support.animation]), u.csstransforms() && (e.support.transform = new String(r("transform")), e.support.transform3d = u.csstransforms3d())
    }(window.Zepto || window.jQuery, window, document), function (e) {
        "use strict";

        function t(t, i) {
            this.element = e(t), this.settings = e.extend({}, n, i), this._defaults = n, this._init()
        }

        var i = "Morphext", n = {animation: "bounceIn", separator: ",", speed: 2e3, complete: e.noop};
        t.prototype = {
            _init: function () {
                var t = this;
                this.phrases = [], this.element.addClass("morphext"), e.each(this.element.text().split(this.settings.separator), function (i, n) {
                    t.phrases.push(e.trim(n))
                }), this.index = -1, this.animate(), this.start()
            }, animate: function () {
                this.index = ++this.index % this.phrases.length, this.element[0].innerHTML = '<span class="animated ' + this.settings.animation + '">' + this.phrases[this.index] + "</span>", e.isFunction(this.settings.complete) && this.settings.complete.call(this)
            }, start: function () {
                var e = this;
                this._interval = setInterval(function () {
                    e.animate()
                }, this.settings.speed)
            }, stop: function () {
                this._interval = clearInterval(this._interval)
            }
        }, e.fn[i] = function (n) {
            return this.each(function () {
                e.data(this, "plugin_" + i) || e.data(this, "plugin_" + i, new t(this, n))
            })
        }
    }(jQuery), function (e, t) {
        "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
            return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("jquery")) : e.jQueryBridget = t(e, e.jQuery)
    }(window, function (e, t) {
        "use strict";

        function i(i, r, o) {
            function l(e, t, n) {
                var s, r = "$()." + i + '("' + t + '")';
                return e.each(function (e, l) {
                    var u = o.data(l, i);
                    if (u) {
                        var c = u[t];
                        if (c && "_" != t.charAt(0)) {
                            var d = c.apply(u, n);
                            s = void 0 === s ? d : s
                        } else a(r + " is not a valid method")
                    } else a(i + " not initialized. Cannot call methods, i.e. " + r)
                }), void 0 !== s ? s : e
            }

            function u(e, t) {
                e.each(function (e, n) {
                    var s = o.data(n, i);
                    s ? (s.option(t), s._init()) : (s = new r(n, t), o.data(n, i, s))
                })
            }

            (o = o || t || e.jQuery) && (r.prototype.option || (r.prototype.option = function (e) {
                o.isPlainObject(e) && (this.options = o.extend(!0, this.options, e))
            }), o.fn[i] = function (e) {
                return "string" == typeof e ? l(this, e, s.call(arguments, 1)) : (u(this, e), this)
            }, n(o))
        }

        function n(e) {
            !e || e && e.bridget || (e.bridget = i)
        }

        var s = Array.prototype.slice, r = e.console, a = void 0 === r ? function () {
        } : function (e) {
            r.error(e)
        };
        return n(t || e.jQuery), i
    }), function (e, t) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
    }("undefined" != typeof window ? window : this, function () {
        function e() {
        }

        var t = e.prototype;
        return t.on = function (e, t) {
            if (e && t) {
                var i = this._events = this._events || {}, n = i[e] = i[e] || [];
                return -1 == n.indexOf(t) && n.push(t), this
            }
        }, t.once = function (e, t) {
            if (e && t) {
                this.on(e, t);
                var i = this._onceEvents = this._onceEvents || {};
                return (i[e] = i[e] || {})[t] = !0, this
            }
        }, t.off = function (e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                var n = i.indexOf(t);
                return -1 != n && i.splice(n, 1), this
            }
        }, t.emitEvent = function (e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                var n = 0, s = i[n];
                t = t || [];
                for (var r = this._onceEvents && this._onceEvents[e]; s;) {
                    var a = r && r[s];
                    a && (this.off(e, s), delete r[s]), s.apply(this, t), s = i[n += a ? 0 : 1]
                }
                return this
            }
        }, e
    }), function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("get-size/get-size", [], function () {
            return t()
        }) : "object" == typeof module && module.exports ? module.exports = t() : e.getSize = t()
    }(window, function () {
        "use strict";

        function e(e) {
            var t = parseFloat(e);
            return -1 == e.indexOf("%") && !isNaN(t) && t
        }

        function t() {
            for (var e = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, t = 0; t < l; t++) e[o[t]] = 0;
            return e
        }

        function i(e) {
            var t = getComputedStyle(e);
            return t || a("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), t
        }

        function n() {
            if (!u) {
                u = !0;
                var t = document.createElement("div");
                t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style.boxSizing = "border-box";
                var n = document.body || document.documentElement;
                n.appendChild(t);
                var a = i(t);
                s.isBoxSizeOuter = r = 200 == e(a.width), n.removeChild(t)
            }
        }

        function s(s) {
            if (n(), "string" == typeof s && (s = document.querySelector(s)), s && "object" == typeof s && s.nodeType) {
                var a = i(s);
                if ("none" == a.display) return t();
                var u = {};
                u.width = s.offsetWidth, u.height = s.offsetHeight;
                for (var c = u.isBorderBox = "border-box" == a.boxSizing, d = 0; d < l; d++) {
                    var p = o[d], h = a[p], f = parseFloat(h);
                    u[p] = isNaN(f) ? 0 : f
                }
                var m = u.paddingLeft + u.paddingRight, g = u.paddingTop + u.paddingBottom,
                    v = u.marginLeft + u.marginRight, y = u.marginTop + u.marginBottom,
                    b = u.borderLeftWidth + u.borderRightWidth, w = u.borderTopWidth + u.borderBottomWidth, T = c && r,
                    x = e(a.width);
                !1 !== x && (u.width = x + (T ? 0 : m + b));
                var _ = e(a.height);
                return !1 !== _ && (u.height = _ + (T ? 0 : g + w)), u.innerWidth = u.width - (m + b), u.innerHeight = u.height - (g + w), u.outerWidth = u.width + v, u.outerHeight = u.height + y, u
            }
        }

        var r, a = "undefined" == typeof console ? function () {
            } : function (e) {
                console.error(e)
            },
            o = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
            l = o.length, u = !1;
        return s
    }), function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", t) : "object" == typeof module && module.exports ? module.exports = t() : e.matchesSelector = t()
    }(window, function () {
        "use strict";
        var e = function () {
            var e = Element.prototype;
            if (e.matches) return "matches";
            if (e.matchesSelector) return "matchesSelector";
            for (var t = ["webkit", "moz", "ms", "o"], i = 0; i < t.length; i++) {
                var n = t[i] + "MatchesSelector";
                if (e[n]) return n
            }
        }();
        return function (t, i) {
            return t[e](i)
        }
    }), function (e, t) {
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
            return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.matchesSelector)
    }(window, function (e, t) {
        var i = {};
        i.extend = function (e, t) {
            for (var i in t) e[i] = t[i];
            return e
        }, i.modulo = function (e, t) {
            return (e % t + t) % t
        }, i.makeArray = function (e) {
            var t = [];
            if (Array.isArray(e)) t = e; else if (e && "number" == typeof e.length) for (var i = 0; i < e.length; i++) t.push(e[i]); else t.push(e);
            return t
        }, i.removeFrom = function (e, t) {
            var i = e.indexOf(t);
            -1 != i && e.splice(i, 1)
        }, i.getParent = function (e, i) {
            for (; e != document.body;) if (e = e.parentNode, t(e, i)) return e
        }, i.getQueryElement = function (e) {
            return "string" == typeof e ? document.querySelector(e) : e
        }, i.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, i.filterFindElements = function (e, n) {
            var s = [];
            return (e = i.makeArray(e)).forEach(function (e) {
                if (e instanceof HTMLElement) {
                    if (!n) return void s.push(e);
                    t(e, n) && s.push(e);
                    for (var i = e.querySelectorAll(n), r = 0; r < i.length; r++) s.push(i[r])
                }
            }), s
        }, i.debounceMethod = function (e, t, i) {
            var n = e.prototype[t], s = t + "Timeout";
            e.prototype[t] = function () {
                var e = this[s];
                e && clearTimeout(e);
                var t = arguments, r = this;
                this[s] = setTimeout(function () {
                    n.apply(r, t), delete r[s]
                }, i || 100)
            }
        }, i.docReady = function (e) {
            var t = document.readyState;
            "complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e)
        }, i.toDashed = function (e) {
            return e.replace(/(.)([A-Z])/g, function (e, t, i) {
                return t + "-" + i
            }).toLowerCase()
        };
        var n = e.console;
        return i.htmlInit = function (t, s) {
            i.docReady(function () {
                var r = i.toDashed(s), a = "data-" + r, o = document.querySelectorAll("[" + a + "]"),
                    l = document.querySelectorAll(".js-" + r), u = i.makeArray(o).concat(i.makeArray(l)),
                    c = a + "-options", d = e.jQuery;
                u.forEach(function (e) {
                    var i, r = e.getAttribute(a) || e.getAttribute(c);
                    try {
                        i = r && JSON.parse(r)
                    } catch (t) {
                        return void(n && n.error("Error parsing " + a + " on " + e.className + ": " + t))
                    }
                    var o = new t(e, i);
                    d && d.data(e, s, o)
                })
            })
        }, i
    }), function (e, t) {
        "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("ev-emitter"), require("get-size")) : (e.Outlayer = {}, e.Outlayer.Item = t(e.EvEmitter, e.getSize))
    }(window, function (e, t) {
        "use strict";

        function i(e) {
            for (var t in e) return !1;
            return null, !0
        }

        function n(e, t) {
            e && (this.element = e, this.layout = t, this.position = {x: 0, y: 0}, this._create())
        }

        var s = document.documentElement.style, r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
            a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
            o = {WebkitTransition: "webkitTransitionEnd", transition: "transitionend"}[r], l = {
                transform: a,
                transition: r,
                transitionDuration: r + "Duration",
                transitionProperty: r + "Property",
                transitionDelay: r + "Delay"
            }, u = n.prototype = Object.create(e.prototype);
        u.constructor = n, u._create = function () {
            this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
        }, u.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, u.getSize = function () {
            this.size = t(this.element)
        }, u.css = function (e) {
            var t = this.element.style;
            for (var i in e) t[l[i] || i] = e[i]
        }, u.getPosition = function () {
            var e = getComputedStyle(this.element), t = this.layout._getOption("originLeft"),
                i = this.layout._getOption("originTop"), n = e[t ? "left" : "right"], s = e[i ? "top" : "bottom"],
                r = this.layout.size, a = -1 != n.indexOf("%") ? parseFloat(n) / 100 * r.width : parseInt(n, 10),
                o = -1 != s.indexOf("%") ? parseFloat(s) / 100 * r.height : parseInt(s, 10);
            a = isNaN(a) ? 0 : a, o = isNaN(o) ? 0 : o, a -= t ? r.paddingLeft : r.paddingRight, o -= i ? r.paddingTop : r.paddingBottom, this.position.x = a, this.position.y = o
        }, u.layoutPosition = function () {
            var e = this.layout.size, t = {}, i = this.layout._getOption("originLeft"),
                n = this.layout._getOption("originTop"), s = i ? "paddingLeft" : "paddingRight",
                r = i ? "left" : "right", a = i ? "right" : "left", o = this.position.x + e[s];
            t[r] = this.getXValue(o), t[a] = "";
            var l = n ? "paddingTop" : "paddingBottom", u = n ? "top" : "bottom", c = n ? "bottom" : "top",
                d = this.position.y + e[l];
            t[u] = this.getYValue(d), t[c] = "", this.css(t), this.emitEvent("layout", [this])
        }, u.getXValue = function (e) {
            var t = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && !t ? e / this.layout.size.width * 100 + "%" : e + "px"
        }, u.getYValue = function (e) {
            var t = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && t ? e / this.layout.size.height * 100 + "%" : e + "px"
        }, u._transitionTo = function (e, t) {
            this.getPosition();
            var i = this.position.x, n = this.position.y, s = parseInt(e, 10), r = parseInt(t, 10),
                a = s === this.position.x && r === this.position.y;
            if (this.setPosition(e, t), !a || this.isTransitioning) {
                var o = e - i, l = t - n, u = {};
                u.transform = this.getTranslate(o, l), this.transition({
                    to: u,
                    onTransitionEnd: {transform: this.layoutPosition},
                    isCleaning: !0
                })
            } else this.layoutPosition()
        }, u.getTranslate = function (e, t) {
            var i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop");
            return e = i ? e : -e, t = n ? t : -t, "translate3d(" + e + "px, " + t + "px, 0)"
        }, u.goTo = function (e, t) {
            this.setPosition(e, t), this.layoutPosition()
        }, u.moveTo = u._transitionTo, u.setPosition = function (e, t) {
            this.position.x = parseInt(e, 10), this.position.y = parseInt(t, 10)
        }, u._nonTransition = function (e) {
            this.css(e.to), e.isCleaning && this._removeStyles(e.to);
            for (var t in e.onTransitionEnd) e.onTransitionEnd[t].call(this)
        }, u.transition = function (e) {
            if (parseFloat(this.layout.options.transitionDuration)) {
                var t = this._transn;
                for (var i in e.onTransitionEnd) t.onEnd[i] = e.onTransitionEnd[i];
                for (i in e.to) t.ingProperties[i] = !0, e.isCleaning && (t.clean[i] = !0);
                if (e.from) {
                    this.css(e.from);
                    this.element.offsetHeight;
                    null
                }
                this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !0
            } else this._nonTransition(e)
        };
        var c = "opacity," + a.replace(/([A-Z])/g, function (e) {
            return "-" + e.toLowerCase()
        });
        u.enableTransition = function () {
            if (!this.isTransitioning) {
                var e = this.layout.options.transitionDuration;
                e = "number" == typeof e ? e + "ms" : e, this.css({
                    transitionProperty: c,
                    transitionDuration: e,
                    transitionDelay: this.staggerDelay || 0
                }), this.element.addEventListener(o, this, !1)
            }
        }, u.onwebkitTransitionEnd = function (e) {
            this.ontransitionend(e)
        }, u.onotransitionend = function (e) {
            this.ontransitionend(e)
        };
        var d = {"-webkit-transform": "transform"};
        u.ontransitionend = function (e) {
            if (e.target === this.element) {
                var t = this._transn, n = d[e.propertyName] || e.propertyName;
                delete t.ingProperties[n], i(t.ingProperties) && this.disableTransition(), n in t.clean && (this.element.style[e.propertyName] = "", delete t.clean[n]), n in t.onEnd && (t.onEnd[n].call(this), delete t.onEnd[n]), this.emitEvent("transitionEnd", [this])
            }
        }, u.disableTransition = function () {
            this.removeTransitionStyles(), this.element.removeEventListener(o, this, !1), this.isTransitioning = !1
        }, u._removeStyles = function (e) {
            var t = {};
            for (var i in e) t[i] = "";
            this.css(t)
        };
        var p = {transitionProperty: "", transitionDuration: "", transitionDelay: ""};
        return u.removeTransitionStyles = function () {
            this.css(p)
        }, u.stagger = function (e) {
            e = isNaN(e) ? 0 : e, this.staggerDelay = e + "ms"
        }, u.removeElem = function () {
            this.element.parentNode.removeChild(this.element), this.css({display: ""}), this.emitEvent("remove", [this])
        }, u.remove = function () {
            return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
                this.removeElem()
            }), void this.hide()) : void this.removeElem()
        }, u.reveal = function () {
            delete this.isHidden, this.css({display: ""});
            var e = this.layout.options, t = {};
            t[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({
                from: e.hiddenStyle,
                to: e.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: t
            })
        }, u.onRevealTransitionEnd = function () {
            this.isHidden || this.emitEvent("reveal")
        }, u.getHideRevealTransitionEndProperty = function (e) {
            var t = this.layout.options[e];
            if (t.opacity) return "opacity";
            for (var i in t) return i
        }, u.hide = function () {
            this.isHidden = !0, this.css({display: ""});
            var e = this.layout.options, t = {};
            t[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({
                from: e.visibleStyle,
                to: e.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: t
            })
        }, u.onHideTransitionEnd = function () {
            this.isHidden && (this.css({display: "none"}), this.emitEvent("hide"))
        }, u.destroy = function () {
            this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
        }, n
    }), function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, s, r) {
            return t(e, i, n, s, r)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : e.Outlayer = t(e, e.EvEmitter, e.getSize, e.fizzyUIUtils, e.Outlayer.Item)
    }(window, function (e, t, i, n, s) {
        "use strict";

        function r(e, t) {
            var i = n.getQueryElement(e);
            if (i) {
                this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(t);
                var s = ++d;
                this.element.outlayerGUID = s, p[s] = this, this._create(), this._getOption("initLayout") && this.layout()
            } else l && l.error("Bad element for " + this.constructor.namespace + ": " + (i || e))
        }

        function a(e) {
            function t() {
                e.apply(this, arguments)
            }

            return t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t
        }

        function o(e) {
            if ("number" == typeof e) return e;
            var t = e.match(/(^\d*\.?\d*)(\w*)/), i = t && t[1], n = t && t[2];
            return i.length ? (i = parseFloat(i)) * (f[n] || 1) : 0
        }

        var l = e.console, u = e.jQuery, c = function () {
        }, d = 0, p = {};
        r.namespace = "outlayer", r.Item = s, r.defaults = {
            containerStyle: {position: "relative"},
            initLayout: !0,
            originLeft: !0,
            originTop: !0,
            resize: !0,
            resizeContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
            visibleStyle: {opacity: 1, transform: "scale(1)"}
        };
        var h = r.prototype;
        n.extend(h, t.prototype), h.option = function (e) {
            n.extend(this.options, e)
        }, h._getOption = function (e) {
            var t = this.constructor.compatOptions[e];
            return t && void 0 !== this.options[t] ? this.options[t] : this.options[e]
        }, r.compatOptions = {
            initLayout: "isInitLayout",
            horizontal: "isHorizontal",
            layoutInstant: "isLayoutInstant",
            originLeft: "isOriginLeft",
            originTop: "isOriginTop",
            resize: "isResizeBound",
            resizeContainer: "isResizingContainer"
        }, h._create = function () {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize()
        }, h.reloadItems = function () {
            this.items = this._itemize(this.element.children)
        }, h._itemize = function (e) {
            for (var t = this._filterFindItemElements(e), i = this.constructor.Item, n = [], s = 0; s < t.length; s++) {
                var r = new i(t[s], this);
                n.push(r)
            }
            return n
        }, h._filterFindItemElements = function (e) {
            return n.filterFindElements(e, this.options.itemSelector)
        }, h.getItemElements = function () {
            return this.items.map(function (e) {
                return e.element
            })
        }, h.layout = function () {
            this._resetLayout(), this._manageStamps();
            var e = this._getOption("layoutInstant"), t = void 0 !== e ? e : !this._isLayoutInited;
            this.layoutItems(this.items, t), this._isLayoutInited = !0
        }, h._init = h.layout, h._resetLayout = function () {
            this.getSize()
        }, h.getSize = function () {
            this.size = i(this.element)
        }, h._getMeasurement = function (e, t) {
            var n, s = this.options[e];
            s ? ("string" == typeof s ? n = this.element.querySelector(s) : s instanceof HTMLElement && (n = s), this[e] = n ? i(n)[t] : s) : this[e] = 0
        }, h.layoutItems = function (e, t) {
            e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
        }, h._getItemsForLayout = function (e) {
            return e.filter(function (e) {
                return !e.isIgnored
            })
        }, h._layoutItems = function (e, t) {
            if (this._emitCompleteOnItems("layout", e), e && e.length) {
                var i = [];
                e.forEach(function (e) {
                    var n = this._getItemLayoutPosition(e);
                    n.item = e, n.isInstant = t || e.isLayoutInstant, i.push(n)
                }, this), this._processLayoutQueue(i)
            }
        }, h._getItemLayoutPosition = function () {
            return {x: 0, y: 0}
        }, h._processLayoutQueue = function (e) {
            this.updateStagger(), e.forEach(function (e, t) {
                this._positionItem(e.item, e.x, e.y, e.isInstant, t)
            }, this)
        }, h.updateStagger = function () {
            var e = this.options.stagger;
            return null === e || void 0 === e ? void(this.stagger = 0) : (this.stagger = o(e), this.stagger)
        }, h._positionItem = function (e, t, i, n, s) {
            n ? e.goTo(t, i) : (e.stagger(s * this.stagger), e.moveTo(t, i))
        }, h._postLayout = function () {
            this.resizeContainer()
        }, h.resizeContainer = function () {
            if (this._getOption("resizeContainer")) {
                var e = this._getContainerSize();
                e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
            }
        }, h._getContainerSize = c, h._setContainerMeasure = function (e, t) {
            if (void 0 !== e) {
                var i = this.size;
                i.isBorderBox && (e += t ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px"
            }
        }, h._emitCompleteOnItems = function (e, t) {
            function i() {
                s.dispatchEvent(e + "Complete", null, [t])
            }

            function n() {
                ++a == r && i()
            }

            var s = this, r = t.length;
            if (t && r) {
                var a = 0;
                t.forEach(function (t) {
                    t.once(e, n)
                })
            } else i()
        }, h.dispatchEvent = function (e, t, i) {
            var n = t ? [t].concat(i) : i;
            if (this.emitEvent(e, n), u) if (this.$element = this.$element || u(this.element), t) {
                var s = u.Event(t);
                s.type = e, this.$element.trigger(s, i)
            } else this.$element.trigger(e, i)
        }, h.ignore = function (e) {
            var t = this.getItem(e);
            t && (t.isIgnored = !0)
        }, h.unignore = function (e) {
            var t = this.getItem(e);
            t && delete t.isIgnored
        }, h.stamp = function (e) {
            (e = this._find(e)) && (this.stamps = this.stamps.concat(e), e.forEach(this.ignore, this))
        }, h.unstamp = function (e) {
            (e = this._find(e)) && e.forEach(function (e) {
                n.removeFrom(this.stamps, e), this.unignore(e)
            }, this)
        }, h._find = function (e) {
            if (e) return "string" == typeof e && (e = this.element.querySelectorAll(e)), e = n.makeArray(e)
        }, h._manageStamps = function () {
            this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
        }, h._getBoundingRect = function () {
            var e = this.element.getBoundingClientRect(), t = this.size;
            this._boundingRect = {
                left: e.left + t.paddingLeft + t.borderLeftWidth,
                top: e.top + t.paddingTop + t.borderTopWidth,
                right: e.right - (t.paddingRight + t.borderRightWidth),
                bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
            }
        }, h._manageStamp = c, h._getElementOffset = function (e) {
            var t = e.getBoundingClientRect(), n = this._boundingRect, s = i(e);
            return {
                left: t.left - n.left - s.marginLeft,
                top: t.top - n.top - s.marginTop,
                right: n.right - t.right - s.marginRight,
                bottom: n.bottom - t.bottom - s.marginBottom
            }
        }, h.handleEvent = n.handleEvent, h.bindResize = function () {
            e.addEventListener("resize", this), this.isResizeBound = !0
        }, h.unbindResize = function () {
            e.removeEventListener("resize", this), this.isResizeBound = !1
        }, h.onresize = function () {
            this.resize()
        }, n.debounceMethod(r, "onresize", 100), h.resize = function () {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, h.needsResizeLayout = function () {
            var e = i(this.element);
            return this.size && e && e.innerWidth !== this.size.innerWidth
        }, h.addItems = function (e) {
            var t = this._itemize(e);
            return t.length && (this.items = this.items.concat(t)), t
        }, h.appended = function (e) {
            var t = this.addItems(e);
            t.length && (this.layoutItems(t, !0), this.reveal(t))
        }, h.prepended = function (e) {
            var t = this._itemize(e);
            if (t.length) {
                var i = this.items.slice(0);
                this.items = t.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(i)
            }
        }, h.reveal = function (e) {
            if (this._emitCompleteOnItems("reveal", e), e && e.length) {
                var t = this.updateStagger();
                e.forEach(function (e, i) {
                    e.stagger(i * t), e.reveal()
                })
            }
        }, h.hide = function (e) {
            if (this._emitCompleteOnItems("hide", e), e && e.length) {
                var t = this.updateStagger();
                e.forEach(function (e, i) {
                    e.stagger(i * t), e.hide()
                })
            }
        }, h.revealItemElements = function (e) {
            var t = this.getItems(e);
            this.reveal(t)
        }, h.hideItemElements = function (e) {
            var t = this.getItems(e);
            this.hide(t)
        }, h.getItem = function (e) {
            for (var t = 0; t < this.items.length; t++) {
                var i = this.items[t];
                if (i.element == e) return i
            }
        }, h.getItems = function (e) {
            var t = [];
            return (e = n.makeArray(e)).forEach(function (e) {
                var i = this.getItem(e);
                i && t.push(i)
            }, this), t
        }, h.remove = function (e) {
            var t = this.getItems(e);
            this._emitCompleteOnItems("remove", t), t && t.length && t.forEach(function (e) {
                e.remove(), n.removeFrom(this.items, e)
            }, this)
        }, h.destroy = function () {
            var e = this.element.style;
            e.height = "", e.position = "", e.width = "", this.items.forEach(function (e) {
                e.destroy()
            }), this.unbindResize();
            var t = this.element.outlayerGUID;
            delete p[t], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace)
        }, r.data = function (e) {
            var t = (e = n.getQueryElement(e)) && e.outlayerGUID;
            return t && p[t]
        }, r.create = function (e, t) {
            var i = a(r);
            return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, t), i.compatOptions = n.extend({}, r.compatOptions), i.namespace = e, i.data = r.data, i.Item = a(s), n.htmlInit(i, e), u && u.bridget && u.bridget(e, i), i
        };
        var f = {ms: 1, s: 1e3};
        return r.Item = s, r
    }), function (e, t) {
        "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer")) : (e.Isotope = e.Isotope || {}, e.Isotope.Item = t(e.Outlayer))
    }(window, function (e) {
        "use strict";

        function t() {
            e.Item.apply(this, arguments)
        }

        var i = t.prototype = Object.create(e.Item.prototype), n = i._create;
        i._create = function () {
            this.id = this.layout.itemGUID++, n.call(this), this.sortData = {}
        }, i.updateSortData = function () {
            if (!this.isIgnored) {
                this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
                var e = this.layout.options.getSortData, t = this.layout._sorters;
                for (var i in e) {
                    var n = t[i];
                    this.sortData[i] = n(this.element, this)
                }
            }
        };
        var s = i.destroy;
        return i.destroy = function () {
            s.apply(this, arguments), this.css({display: ""})
        }, t
    }), function (e, t) {
        "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], t) : "object" == typeof module && module.exports ? module.exports = t(require("get-size"), require("outlayer")) : (e.Isotope = e.Isotope || {}, e.Isotope.LayoutMode = t(e.getSize, e.Outlayer))
    }(window, function (e, t) {
        "use strict";

        function i(e) {
            this.isotope = e, e && (this.options = e.options[this.namespace], this.element = e.element, this.items = e.filteredItems, this.size = e.size)
        }

        var n = i.prototype;
        return ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"].forEach(function (e) {
            n[e] = function () {
                return t.prototype[e].apply(this.isotope, arguments)
            }
        }), n.needsVerticalResizeLayout = function () {
            var t = e(this.isotope.element);
            return this.isotope.size && t && t.innerHeight != this.isotope.size.innerHeight
        }, n._getMeasurement = function () {
            this.isotope._getMeasurement.apply(this, arguments)
        }, n.getColumnWidth = function () {
            this.getSegmentSize("column", "Width")
        }, n.getRowHeight = function () {
            this.getSegmentSize("row", "Height")
        }, n.getSegmentSize = function (e, t) {
            var i = e + t, n = "outer" + t;
            if (this._getMeasurement(i, n), !this[i]) {
                var s = this.getFirstItemSize();
                this[i] = s && s[n] || this.isotope.size["inner" + t]
            }
        }, n.getFirstItemSize = function () {
            var t = this.isotope.filteredItems[0];
            return t && t.element && e(t.element)
        }, n.layout = function () {
            this.isotope.layout.apply(this.isotope, arguments)
        }, n.getSize = function () {
            this.isotope.getSize(), this.size = this.isotope.size
        }, i.modes = {}, i.create = function (e, t) {
            function s() {
                i.apply(this, arguments)
            }

            return s.prototype = Object.create(n), s.prototype.constructor = s, t && (s.options = t), s.prototype.namespace = e, i.modes[e] = s, s
        }, i
    }), function (e, t) {
        "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], t) : "object" == typeof module && module.exports ? module.exports = t(require("outlayer"), require("get-size")) : e.Masonry = t(e.Outlayer, e.getSize)
    }(window, function (e, t) {
        var i = e.create("masonry");
        return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function () {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
            for (var e = 0; e < this.cols; e++) this.colYs.push(0);
            this.maxY = 0
        }, i.prototype.measureColumns = function () {
            if (this.getContainerWidth(), !this.columnWidth) {
                var e = this.items[0], i = e && e.element;
                this.columnWidth = i && t(i).outerWidth || this.containerWidth
            }
            var n = this.columnWidth += this.gutter, s = this.containerWidth + this.gutter, r = s / n, a = n - s % n,
                o = a && a < 1 ? "round" : "floor";
            r = Math[o](r), this.cols = Math.max(r, 1)
        }, i.prototype.getContainerWidth = function () {
            var e = this._getOption("fitWidth") ? this.element.parentNode : this.element, i = t(e);
            this.containerWidth = i && i.innerWidth
        }, i.prototype._getItemLayoutPosition = function (e) {
            e.getSize();
            var t = e.size.outerWidth % this.columnWidth, i = t && t < 1 ? "round" : "ceil",
                n = Math[i](e.size.outerWidth / this.columnWidth);
            n = Math.min(n, this.cols);
            for (var s = this._getColGroup(n), r = Math.min.apply(Math, s), a = s.indexOf(r), o = {
                x: this.columnWidth * a,
                y: r
            }, l = r + e.size.outerHeight, u = this.cols + 1 - s.length, c = 0; c < u; c++) this.colYs[a + c] = l;
            return o
        }, i.prototype._getColGroup = function (e) {
            if (e < 2) return this.colYs;
            for (var t = [], i = this.cols + 1 - e, n = 0; n < i; n++) {
                var s = this.colYs.slice(n, n + e);
                t[n] = Math.max.apply(Math, s)
            }
            return t
        }, i.prototype._manageStamp = function (e) {
            var i = t(e), n = this._getElementOffset(e), s = this._getOption("originLeft") ? n.left : n.right,
                r = s + i.outerWidth, a = Math.floor(s / this.columnWidth);
            a = Math.max(0, a);
            var o = Math.floor(r / this.columnWidth);
            o -= r % this.columnWidth ? 0 : 1, o = Math.min(this.cols - 1, o);
            for (var l = (this._getOption("originTop") ? n.top : n.bottom) + i.outerHeight, u = a; u <= o; u++) this.colYs[u] = Math.max(l, this.colYs[u])
        }, i.prototype._getContainerSize = function () {
            this.maxY = Math.max.apply(Math, this.colYs);
            var e = {height: this.maxY};
            return this._getOption("fitWidth") && (e.width = this._getContainerFitWidth()), e
        }, i.prototype._getContainerFitWidth = function () {
            for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];) e++;
            return (this.cols - e) * this.columnWidth - this.gutter
        }, i.prototype.needsResizeLayout = function () {
            var e = this.containerWidth;
            return this.getContainerWidth(), e != this.containerWidth
        }, i
    }), function (e, t) {
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], t) : "object" == typeof module && module.exports ? module.exports = t(require("../layout-mode"), require("masonry-layout")) : t(e.Isotope.LayoutMode, e.Masonry)
    }(window, function (e, t) {
        "use strict";
        var i = e.create("masonry"), n = i.prototype, s = {_getElementOffset: !0, layout: !0, _getMeasurement: !0};
        for (var r in t.prototype) s[r] || (n[r] = t.prototype[r]);
        var a = n.measureColumns;
        n.measureColumns = function () {
            this.items = this.isotope.filteredItems, a.call(this)
        };
        var o = n._getOption;
        return n._getOption = function (e) {
            return "fitWidth" == e ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : o.apply(this.isotope, arguments)
        }, i
    }), function (e, t) {
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], t) : "object" == typeof exports ? module.exports = t(require("../layout-mode")) : t(e.Isotope.LayoutMode)
    }(window, function (e) {
        "use strict";
        var t = e.create("fitRows"), i = t.prototype;
        return i._resetLayout = function () {
            this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
        }, i._getItemLayoutPosition = function (e) {
            e.getSize();
            var t = e.size.outerWidth + this.gutter, i = this.isotope.size.innerWidth + this.gutter;
            0 !== this.x && t + this.x > i && (this.x = 0, this.y = this.maxY);
            var n = {x: this.x, y: this.y};
            return this.maxY = Math.max(this.maxY, this.y + e.size.outerHeight), this.x += t, n
        }, i._getContainerSize = function () {
            return {height: this.maxY}
        }, t
    }), function (e, t) {
        "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], t) : "object" == typeof module && module.exports ? module.exports = t(require("../layout-mode")) : t(e.Isotope.LayoutMode)
    }(window, function (e) {
        "use strict";
        var t = e.create("vertical", {horizontalAlignment: 0}), i = t.prototype;
        return i._resetLayout = function () {
            this.y = 0
        }, i._getItemLayoutPosition = function (e) {
            e.getSize();
            var t = (this.isotope.size.innerWidth - e.size.outerWidth) * this.options.horizontalAlignment, i = this.y;
            return this.y += e.size.outerHeight, {x: t, y: i}
        }, i._getContainerSize = function () {
            return {height: this.y}
        }, t
    }), function (e, t) {
        "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function (i, n, s, r, a, o) {
            return t(e, i, n, s, r, a, o)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : e.Isotope = t(e, e.Outlayer, e.getSize, e.matchesSelector, e.fizzyUIUtils, e.Isotope.Item, e.Isotope.LayoutMode)
    }(window, function (e, t, i, n, s, r, a) {
        function o(e, t) {
            return function (i, n) {
                for (var s = 0; s < e.length; s++) {
                    var r = e[s], a = i.sortData[r], o = n.sortData[r];
                    if (a > o || a < o) {
                        var l = (void 0 !== t[r] ? t[r] : t) ? 1 : -1;
                        return (a > o ? 1 : -1) * l
                    }
                }
                return 0
            }
        }

        var l = e.jQuery, u = String.prototype.trim ? function (e) {
            return e.trim()
        } : function (e) {
            return e.replace(/^\s+|\s+$/g, "")
        }, c = t.create("isotope", {layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0});
        c.Item = r, c.LayoutMode = a;
        var d = c.prototype;
        d._create = function () {
            this.itemGUID = 0, this._sorters = {}, this._getSorters(), t.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
            for (var e in a.modes) this._initLayoutMode(e)
        }, d.reloadItems = function () {
            this.itemGUID = 0, t.prototype.reloadItems.call(this)
        }, d._itemize = function () {
            for (var e = t.prototype._itemize.apply(this, arguments), i = 0; i < e.length; i++) e[i].id = this.itemGUID++;
            return this._updateItemsSortData(e), e
        }, d._initLayoutMode = function (e) {
            var t = a.modes[e], i = this.options[e] || {};
            this.options[e] = t.options ? s.extend(t.options, i) : i, this.modes[e] = new t(this)
        }, d.layout = function () {
            return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
        }, d._layout = function () {
            var e = this._getIsInstant();
            this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, e), this._isLayoutInited = !0
        }, d.arrange = function (e) {
            this.option(e), this._getIsInstant();
            var t = this._filter(this.items);
            this.filteredItems = t.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [t]) : this._hideReveal(t), this._sort(), this._layout()
        }, d._init = d.arrange, d._hideReveal = function (e) {
            this.reveal(e.needReveal), this.hide(e.needHide)
        }, d._getIsInstant = function () {
            var e = this._getOption("layoutInstant"), t = void 0 !== e ? e : !this._isLayoutInited;
            return this._isInstant = t, t
        }, d._bindArrangeComplete = function () {
            function e() {
                t && i && n && s.dispatchEvent("arrangeComplete", null, [s.filteredItems])
            }

            var t, i, n, s = this;
            this.once("layoutComplete", function () {
                t = !0, e()
            }), this.once("hideComplete", function () {
                i = !0, e()
            }), this.once("revealComplete", function () {
                n = !0, e()
            })
        }, d._filter = function (e) {
            var t = this.options.filter;
            t = t || "*";
            for (var i = [], n = [], s = [], r = this._getFilterTest(t), a = 0; a < e.length; a++) {
                var o = e[a];
                if (!o.isIgnored) {
                    var l = r(o);
                    l && i.push(o), l && o.isHidden ? n.push(o) : l || o.isHidden || s.push(o)
                }
            }
            return {matches: i, needReveal: n, needHide: s}
        }, d._getFilterTest = function (e) {
            return l && this.options.isJQueryFiltering ? function (t) {
                return l(t.element).is(e)
            } : "function" == typeof e ? function (t) {
                return e(t.element)
            } : function (t) {
                return n(t.element, e)
            }
        }, d.updateSortData = function (e) {
            var t;
            e ? (e = s.makeArray(e), t = this.getItems(e)) : t = this.items, this._getSorters(), this._updateItemsSortData(t)
        }, d._getSorters = function () {
            var e = this.options.getSortData;
            for (var t in e) {
                var i = e[t];
                this._sorters[t] = p(i)
            }
        }, d._updateItemsSortData = function (e) {
            for (var t = e && e.length, i = 0; t && i < t; i++) e[i].updateSortData()
        };
        var p = function () {
            function e(e, t) {
                return e ? function (t) {
                    return t.getAttribute(e)
                } : function (e) {
                    var i = e.querySelector(t);
                    return i && i.textContent
                }
            }

            return function (t) {
                if ("string" != typeof t) return t;
                var i = u(t).split(" "), n = i[0], s = n.match(/^\[(.+)\]$/), r = e(s && s[1], n),
                    a = c.sortDataParsers[i[1]];
                return t = a ? function (e) {
                    return e && a(r(e))
                } : function (e) {
                    return e && r(e)
                }
            }
        }();
        c.sortDataParsers = {
            parseInt: function (e) {
                return parseInt(e, 10)
            }, parseFloat: function (e) {
                return parseFloat(e)
            }
        }, d._sort = function () {
            var e = this.options.sortBy;
            if (e) {
                var t = o([].concat.apply(e, this.sortHistory), this.options.sortAscending);
                this.filteredItems.sort(t), e != this.sortHistory[0] && this.sortHistory.unshift(e)
            }
        }, d._mode = function () {
            var e = this.options.layoutMode, t = this.modes[e];
            if (!t) throw new Error("No layout mode: " + e);
            return t.options = this.options[e], t
        }, d._resetLayout = function () {
            t.prototype._resetLayout.call(this), this._mode()._resetLayout()
        }, d._getItemLayoutPosition = function (e) {
            return this._mode()._getItemLayoutPosition(e)
        }, d._manageStamp = function (e) {
            this._mode()._manageStamp(e)
        }, d._getContainerSize = function () {
            return this._mode()._getContainerSize()
        }, d.needsResizeLayout = function () {
            return this._mode().needsResizeLayout()
        }, d.appended = function (e) {
            var t = this.addItems(e);
            if (t.length) {
                var i = this._filterRevealAdded(t);
                this.filteredItems = this.filteredItems.concat(i)
            }
        }, d.prepended = function (e) {
            var t = this._itemize(e);
            if (t.length) {
                this._resetLayout(), this._manageStamps();
                var i = this._filterRevealAdded(t);
                this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = t.concat(this.items)
            }
        }, d._filterRevealAdded = function (e) {
            var t = this._filter(e);
            return this.hide(t.needHide), this.reveal(t.matches), this.layoutItems(t.matches, !0), t.matches
        }, d.insert = function (e) {
            var t = this.addItems(e);
            if (t.length) {
                var i, n, s = t.length;
                for (i = 0; i < s; i++) n = t[i], this.element.appendChild(n.element);
                var r = this._filter(t).matches;
                for (i = 0; i < s; i++) t[i].isLayoutInstant = !0;
                for (this.arrange(), i = 0; i < s; i++) delete t[i].isLayoutInstant;
                this.reveal(r)
            }
        };
        var h = d.remove;
        return d.remove = function (e) {
            e = s.makeArray(e);
            var t = this.getItems(e);
            h.call(this, e);
            for (var i = t && t.length, n = 0; i && n < i; n++) {
                var r = t[n];
                s.removeFrom(this.filteredItems, r)
            }
        }, d.shuffle = function () {
            for (var e = 0; e < this.items.length; e++) this.items[e].sortData.random = Math.random();
            this.options.sortBy = "random", this._sort(), this._layout()
        }, d._noTransition = function (e, t) {
            var i = this.options.transitionDuration;
            this.options.transitionDuration = 0;
            var n = e.apply(this, t);
            return this.options.transitionDuration = i, n
        }, d.getFilteredItemElements = function () {
            return this.filteredItems.map(function (e) {
                return e.element
            })
        }, c
    }), function (e, t) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
    }("undefined" != typeof window ? window : this, function () {
        function e() {
        }

        var t = e.prototype;
        return t.on = function (e, t) {
            if (e && t) {
                var i = this._events = this._events || {}, n = i[e] = i[e] || [];
                return -1 == n.indexOf(t) && n.push(t), this
            }
        }, t.once = function (e, t) {
            if (e && t) {
                this.on(e, t);
                var i = this._onceEvents = this._onceEvents || {};
                return (i[e] = i[e] || {})[t] = !0, this
            }
        }, t.off = function (e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                var n = i.indexOf(t);
                return -1 != n && i.splice(n, 1), this
            }
        }, t.emitEvent = function (e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                var n = 0, s = i[n];
                t = t || [];
                for (var r = this._onceEvents && this._onceEvents[e]; s;) {
                    var a = r && r[s];
                    a && (this.off(e, s), delete r[s]), s.apply(this, t), s = i[n += a ? 0 : 1]
                }
                return this
            }
        }, e
    }), function (e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
            return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
    }(window, function (e, t) {
        function i(e, t) {
            for (var i in t) e[i] = t[i];
            return e
        }

        function n(e) {
            var t = [];
            if (Array.isArray(e)) t = e; else if ("number" == typeof e.length) for (var i = 0; i < e.length; i++) t.push(e[i]); else t.push(e);
            return t
        }

        function s(e, t, r) {
            return this instanceof s ? ("string" == typeof e && (e = document.querySelectorAll(e)), this.elements = n(e), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), o && (this.jqDeferred = new o.Deferred), void setTimeout(function () {
                this.check()
            }.bind(this))) : new s(e, t, r)
        }

        function r(e) {
            this.img = e
        }

        function a(e, t) {
            this.url = e, this.element = t, this.img = new Image
        }

        var o = e.jQuery, l = e.console;
        s.prototype = Object.create(t.prototype), s.prototype.options = {}, s.prototype.getImages = function () {
            this.images = [], this.elements.forEach(this.addElementImages, this)
        }, s.prototype.addElementImages = function (e) {
            "IMG" == e.nodeName && this.addImage(e), !0 === this.options.background && this.addElementBackgroundImages(e);
            var t = e.nodeType;
            if (t && u[t]) {
                for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                    var s = i[n];
                    this.addImage(s)
                }
                if ("string" == typeof this.options.background) {
                    var r = e.querySelectorAll(this.options.background);
                    for (n = 0; n < r.length; n++) {
                        var a = r[n];
                        this.addElementBackgroundImages(a)
                    }
                }
            }
        };
        var u = {1: !0, 9: !0, 11: !0};
        return s.prototype.addElementBackgroundImages = function (e) {
            var t = getComputedStyle(e);
            if (t) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
                var s = n && n[2];
                s && this.addBackground(s, e), n = i.exec(t.backgroundImage)
            }
        }, s.prototype.addImage = function (e) {
            var t = new r(e);
            this.images.push(t)
        }, s.prototype.addBackground = function (e, t) {
            var i = new a(e, t);
            this.images.push(i)
        }, s.prototype.check = function () {
            function e(e, i, n) {
                setTimeout(function () {
                    t.progress(e, i, n)
                })
            }

            var t = this;
            return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (t) {
                t.once("progress", e), t.check()
            }) : void this.complete()
        }, s.prototype.progress = function (e, t, i) {
            this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && l && l.log("progress: " + i, e, t)
        }, s.prototype.complete = function () {
            var e = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                var t = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[t](this)
            }
        }, r.prototype = Object.create(t.prototype), r.prototype.check = function () {
            return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
        }, r.prototype.getIsImageComplete = function () {
            return this.img.complete && void 0 !== this.img.naturalWidth
        }, r.prototype.confirm = function (e, t) {
            this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
        }, r.prototype.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, r.prototype.onload = function () {
            this.confirm(!0, "onload"), this.unbindEvents()
        }, r.prototype.onerror = function () {
            this.confirm(!1, "onerror"), this.unbindEvents()
        }, r.prototype.unbindEvents = function () {
            this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, a.prototype = Object.create(r.prototype), a.prototype.check = function () {
            this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
        }, a.prototype.unbindEvents = function () {
            this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, a.prototype.confirm = function (e, t) {
            this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
        }, s.makeJQueryPlugin = function (t) {
            (t = t || e.jQuery) && (o = t, o.fn.imagesLoaded = function (e, t) {
                return new s(this, e, t).jqDeferred.promise(o(this))
            })
        }, s.makeJQueryPlugin(), s
    }), function () {
        "use strict";
        var e, t = function (n, s) {
            function r(e) {
                return Math.floor(e)
            }

            function a() {
                var e = T.params.autoplay, t = T.slides.eq(T.activeIndex);
                t.attr("data-swiper-autoplay") && (e = t.attr("data-swiper-autoplay") || T.params.autoplay), T.autoplayTimeoutId = setTimeout(function () {
                    T.params.loop ? (T.fixLoop(), T._slideNext(), T.emit("onAutoplay", T)) : T.isEnd ? s.autoplayStopOnLast ? T.stopAutoplay() : (T._slideTo(0), T.emit("onAutoplay", T)) : (T._slideNext(), T.emit("onAutoplay", T))
                }, e)
            }

            function o(t, i) {
                var n = e(t.target);
                if (!n.is(i)) if ("string" == typeof i) n = n.parents(i); else if (i.nodeType) {
                    var s;
                    return n.parents().each(function (e, t) {
                        t === i && (s = i)
                    }), s ? i : void 0
                }
                if (0 !== n.length) return n[0]
            }

            function l(e, t) {
                t = t || {};
                var i = new (window.MutationObserver || window.WebkitMutationObserver)(function (e) {
                    e.forEach(function (e) {
                        T.onResize(!0), T.emit("onObserverUpdate", T, e)
                    })
                });
                i.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }), T.observers.push(i)
            }

            function u(e) {
                e.originalEvent && (e = e.originalEvent);
                var t = e.keyCode || e.charCode;
                if (!T.params.allowSwipeToNext && (T.isHorizontal() && 39 === t || !T.isHorizontal() && 40 === t)) return !1;
                if (!T.params.allowSwipeToPrev && (T.isHorizontal() && 37 === t || !T.isHorizontal() && 38 === t)) return !1;
                if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                    if (37 === t || 39 === t || 38 === t || 40 === t) {
                        var i = !1;
                        if (T.container.parents("." + T.params.slideClass).length > 0 && 0 === T.container.parents("." + T.params.slideActiveClass).length) return;
                        var n = {left: window.pageXOffset, top: window.pageYOffset}, s = window.innerWidth,
                            r = window.innerHeight, a = T.container.offset();
                        T.rtl && (a.left = a.left - T.container[0].scrollLeft);
                        for (var o = [[a.left, a.top], [a.left + T.width, a.top], [a.left, a.top + T.height], [a.left + T.width, a.top + T.height]], l = 0; l < o.length; l++) {
                            var u = o[l];
                            u[0] >= n.left && u[0] <= n.left + s && u[1] >= n.top && u[1] <= n.top + r && (i = !0)
                        }
                        if (!i) return
                    }
                    T.isHorizontal() ? (37 !== t && 39 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === t && !T.rtl || 37 === t && T.rtl) && T.slideNext(), (37 === t && !T.rtl || 39 === t && T.rtl) && T.slidePrev()) : (38 !== t && 40 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === t && T.slideNext(), 38 === t && T.slidePrev())
                }
            }

            function c(e) {
                e.originalEvent && (e = e.originalEvent);
                var t = 0, i = T.rtl ? -1 : 1, n = d(e);
                if (T.params.mousewheelForceToAxis) if (T.isHorizontal()) {
                    if (!(Math.abs(n.pixelX) > Math.abs(n.pixelY))) return;
                    t = n.pixelX * i
                } else {
                    if (!(Math.abs(n.pixelY) > Math.abs(n.pixelX))) return;
                    t = n.pixelY
                } else t = Math.abs(n.pixelX) > Math.abs(n.pixelY) ? -n.pixelX * i : -n.pixelY;
                if (0 !== t) {
                    if (T.params.mousewheelInvert && (t = -t), T.params.freeMode) {
                        var s = T.getWrapperTranslate() + t * T.params.mousewheelSensitivity, r = T.isBeginning,
                            a = T.isEnd;
                        if (s >= T.minTranslate() && (s = T.minTranslate()), s <= T.maxTranslate() && (s = T.maxTranslate()), T.setWrapperTransition(0), T.setWrapperTranslate(s), T.updateProgress(), T.updateActiveIndex(), (!r && T.isBeginning || !a && T.isEnd) && T.updateClasses(), T.params.freeModeSticky ? (clearTimeout(T.mousewheel.timeout), T.mousewheel.timeout = setTimeout(function () {
                                T.slideReset()
                            }, 300)) : T.params.lazyLoading && T.lazy && T.lazy.load(), T.emit("onScroll", T, e), T.params.autoplay && T.params.autoplayDisableOnInteraction && T.stopAutoplay(), 0 === s || s === T.maxTranslate()) return
                    } else {
                        if ((new window.Date).getTime() - T.mousewheel.lastScrollTime > 60) if (t < 0) if (T.isEnd && !T.params.loop || T.animating) {
                            if (T.params.mousewheelReleaseOnEdges) return !0
                        } else T.slideNext(), T.emit("onScroll", T, e); else if (T.isBeginning && !T.params.loop || T.animating) {
                            if (T.params.mousewheelReleaseOnEdges) return !0
                        } else T.slidePrev(), T.emit("onScroll", T, e);
                        T.mousewheel.lastScrollTime = (new window.Date).getTime()
                    }
                    return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
                }
            }

            function d(e) {
                var t = 0, i = 0, n = 0, s = 0;
                return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), n = 10 * t, s = 10 * i, "deltaY" in e && (s = e.deltaY), "deltaX" in e && (n = e.deltaX), (n || s) && e.deltaMode && (1 === e.deltaMode ? (n *= 40, s *= 40) : (n *= 800, s *= 800)), n && !t && (t = n < 1 ? -1 : 1), s && !i && (i = s < 1 ? -1 : 1), {
                    spinX: t,
                    spinY: i,
                    pixelX: n,
                    pixelY: s
                }
            }

            function p(t, i) {
                t = e(t);
                var n, s, r, a = T.rtl ? -1 : 1;
                n = t.attr("data-swiper-parallax") || "0", s = t.attr("data-swiper-parallax-x"), r = t.attr("data-swiper-parallax-y"), s || r ? (s = s || "0", r = r || "0") : T.isHorizontal() ? (s = n, r = "0") : (r = n, s = "0"), s = s.indexOf("%") >= 0 ? parseInt(s, 10) * i * a + "%" : s * i * a + "px", r = r.indexOf("%") >= 0 ? parseInt(r, 10) * i + "%" : r * i + "px", t.transform("translate3d(" + s + ", " + r + ",0px)")
            }

            function h(e) {
                return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
            }

            if (!(this instanceof t)) return new t(n, s);
            var f = {
                direction: "horizontal",
                touchEventsTarget: "container",
                initialSlide: 0,
                speed: 300,
                autoplay: !1,
                autoplayDisableOnInteraction: !0,
                autoplayStopOnLast: !1,
                iOSEdgeSwipeDetection: !1,
                iOSEdgeSwipeThreshold: 20,
                freeMode: !1,
                freeModeMomentum: !0,
                freeModeMomentumRatio: 1,
                freeModeMomentumBounce: !0,
                freeModeMomentumBounceRatio: 1,
                freeModeMomentumVelocityRatio: 1,
                freeModeSticky: !1,
                freeModeMinimumVelocity: .02,
                autoHeight: !1,
                setWrapperSize: !1,
                virtualTranslate: !1,
                effect: "slide",
                coverflow: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0},
                flip: {slideShadows: !0, limitRotation: !0},
                cube: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94},
                fade: {crossFade: !1},
                parallax: !1,
                zoom: !1,
                zoomMax: 3,
                zoomMin: 1,
                zoomToggle: !0,
                scrollbar: null,
                scrollbarHide: !0,
                scrollbarDraggable: !1,
                scrollbarSnapOnRelease: !1,
                keyboardControl: !1,
                mousewheelControl: !1,
                mousewheelReleaseOnEdges: !1,
                mousewheelInvert: !1,
                mousewheelForceToAxis: !1,
                mousewheelSensitivity: 1,
                mousewheelEventsTarged: "container",
                hashnav: !1,
                hashnavWatchState: !1,
                history: !1,
                replaceState: !1,
                breakpoints: void 0,
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerColumnFill: "column",
                slidesPerGroup: 1,
                centeredSlides: !1,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                roundLengths: !1,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: !0,
                shortSwipes: !0,
                longSwipes: !0,
                longSwipesRatio: .5,
                longSwipesMs: 300,
                followFinger: !0,
                onlyExternal: !1,
                threshold: 0,
                touchMoveStopPropagation: !0,
                touchReleaseOnEdges: !1,
                uniqueNavElements: !0,
                pagination: null,
                paginationElement: "span",
                paginationClickable: !1,
                paginationHide: !1,
                paginationBulletRender: null,
                paginationProgressRender: null,
                paginationFractionRender: null,
                paginationCustomRender: null,
                paginationType: "bullets",
                resistance: !0,
                resistanceRatio: .85,
                nextButton: null,
                prevButton: null,
                watchSlidesProgress: !1,
                watchSlidesVisibility: !1,
                grabCursor: !1,
                preventClicks: !0,
                preventClicksPropagation: !0,
                slideToClickedSlide: !1,
                lazyLoading: !1,
                lazyLoadingInPrevNext: !1,
                lazyLoadingInPrevNextAmount: 1,
                lazyLoadingOnTransitionStart: !1,
                preloadImages: !0,
                updateOnImagesReady: !0,
                loop: !1,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                control: void 0,
                controlInverse: !1,
                controlBy: "slide",
                normalizeSlideIndex: !0,
                allowSwipeToPrev: !0,
                allowSwipeToNext: !0,
                swipeHandler: null,
                noSwiping: !0,
                noSwipingClass: "swiper-no-swiping",
                passiveListeners: !0,
                containerModifierClass: "swiper-container-",
                slideClass: "swiper-slide",
                slideActiveClass: "swiper-slide-active",
                slideDuplicateActiveClass: "swiper-slide-duplicate-active",
                slideVisibleClass: "swiper-slide-visible",
                slideDuplicateClass: "swiper-slide-duplicate",
                slideNextClass: "swiper-slide-next",
                slideDuplicateNextClass: "swiper-slide-duplicate-next",
                slidePrevClass: "swiper-slide-prev",
                slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
                wrapperClass: "swiper-wrapper",
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                buttonDisabledClass: "swiper-button-disabled",
                paginationCurrentClass: "swiper-pagination-current",
                paginationTotalClass: "swiper-pagination-total",
                paginationHiddenClass: "swiper-pagination-hidden",
                paginationProgressbarClass: "swiper-pagination-progressbar",
                paginationClickableClass: "swiper-pagination-clickable",
                paginationModifierClass: "swiper-pagination-",
                lazyLoadingClass: "swiper-lazy",
                lazyStatusLoadingClass: "swiper-lazy-loading",
                lazyStatusLoadedClass: "swiper-lazy-loaded",
                lazyPreloaderClass: "swiper-lazy-preloader",
                notificationClass: "swiper-notification",
                preloaderClass: "preloader",
                zoomContainerClass: "swiper-zoom-container",
                observer: !1,
                observeParents: !1,
                a11y: !1,
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                runCallbacksOnInit: !0
            }, m = s && s.virtualTranslate;
            s = s || {};
            var g = {};
            for (var v in s) if ("object" != typeof s[v] || null === s[v] || s[v].nodeType || s[v] === window || s[v] === document || void 0 !== i && s[v] instanceof i || "undefined" != typeof jQuery && s[v] instanceof jQuery) g[v] = s[v]; else {
                g[v] = {};
                for (var y in s[v]) g[v][y] = s[v][y]
            }
            for (var b in f) if (void 0 === s[b]) s[b] = f[b]; else if ("object" == typeof s[b]) for (var w in f[b]) void 0 === s[b][w] && (s[b][w] = f[b][w]);
            var T = this;
            if (T.params = s, T.originalParams = g, T.classNames = [], void 0 !== e && void 0 !== i && (e = i), (void 0 !== e || (e = void 0 === i ? window.Dom7 || window.Zepto || window.jQuery : i)) && (T.$ = e, T.currentBreakpoint = void 0, T.getActiveBreakpoint = function () {
                    if (!T.params.breakpoints) return !1;
                    var e, t = !1, i = [];
                    for (e in T.params.breakpoints) T.params.breakpoints.hasOwnProperty(e) && i.push(e);
                    i.sort(function (e, t) {
                        return parseInt(e, 10) > parseInt(t, 10)
                    });
                    for (var n = 0; n < i.length; n++) (e = i[n]) >= window.innerWidth && !t && (t = e);
                    return t || "max"
                }, T.setBreakpoint = function () {
                    var e = T.getActiveBreakpoint();
                    if (e && T.currentBreakpoint !== e) {
                        var t = e in T.params.breakpoints ? T.params.breakpoints[e] : T.originalParams,
                            i = T.params.loop && t.slidesPerView !== T.params.slidesPerView;
                        for (var n in t) T.params[n] = t[n];
                        T.currentBreakpoint = e, i && T.destroyLoop && T.reLoop(!0)
                    }
                }, T.params.breakpoints && T.setBreakpoint(), T.container = e(n), 0 !== T.container.length)) {
                if (T.container.length > 1) {
                    var x = [];
                    return T.container.each(function () {
                        x.push(new t(this, s))
                    }), x
                }
                T.container[0].swiper = T, T.container.data("swiper", T), T.classNames.push(T.params.containerModifierClass + T.params.direction), T.params.freeMode && T.classNames.push(T.params.containerModifierClass + "free-mode"), T.support.flexbox || (T.classNames.push(T.params.containerModifierClass + "no-flexbox"), T.params.slidesPerColumn = 1), T.params.autoHeight && T.classNames.push(T.params.containerModifierClass + "autoheight"), (T.params.parallax || T.params.watchSlidesVisibility) && (T.params.watchSlidesProgress = !0), T.params.touchReleaseOnEdges && (T.params.resistanceRatio = 0), ["cube", "coverflow", "flip"].indexOf(T.params.effect) >= 0 && (T.support.transforms3d ? (T.params.watchSlidesProgress = !0, T.classNames.push(T.params.containerModifierClass + "3d")) : T.params.effect = "slide"), "slide" !== T.params.effect && T.classNames.push(T.params.containerModifierClass + T.params.effect), "cube" === T.params.effect && (T.params.resistanceRatio = 0, T.params.slidesPerView = 1, T.params.slidesPerColumn = 1, T.params.slidesPerGroup = 1, T.params.centeredSlides = !1, T.params.spaceBetween = 0, T.params.virtualTranslate = !0, T.params.setWrapperSize = !1), "fade" !== T.params.effect && "flip" !== T.params.effect || (T.params.slidesPerView = 1, T.params.slidesPerColumn = 1, T.params.slidesPerGroup = 1, T.params.watchSlidesProgress = !0, T.params.spaceBetween = 0, T.params.setWrapperSize = !1, void 0 === m && (T.params.virtualTranslate = !0)), T.params.grabCursor && T.support.touch && (T.params.grabCursor = !1), T.wrapper = T.container.children("." + T.params.wrapperClass), T.params.pagination && (T.paginationContainer = e(T.params.pagination), T.params.uniqueNavElements && "string" == typeof T.params.pagination && T.paginationContainer.length > 1 && 1 === T.container.find(T.params.pagination).length && (T.paginationContainer = T.container.find(T.params.pagination)), "bullets" === T.params.paginationType && T.params.paginationClickable ? T.paginationContainer.addClass(T.params.paginationModifierClass + "clickable") : T.params.paginationClickable = !1, T.paginationContainer.addClass(T.params.paginationModifierClass + T.params.paginationType)), (T.params.nextButton || T.params.prevButton) && (T.params.nextButton && (T.nextButton = e(T.params.nextButton), T.params.uniqueNavElements && "string" == typeof T.params.nextButton && T.nextButton.length > 1 && 1 === T.container.find(T.params.nextButton).length && (T.nextButton = T.container.find(T.params.nextButton))), T.params.prevButton && (T.prevButton = e(T.params.prevButton), T.params.uniqueNavElements && "string" == typeof T.params.prevButton && T.prevButton.length > 1 && 1 === T.container.find(T.params.prevButton).length && (T.prevButton = T.container.find(T.params.prevButton)))), T.isHorizontal = function () {
                    return "horizontal" === T.params.direction
                }, T.rtl = T.isHorizontal() && ("rtl" === T.container[0].dir.toLowerCase() || "rtl" === T.container.css("direction")), T.rtl && T.classNames.push(T.params.containerModifierClass + "rtl"), T.rtl && (T.wrongRTL = "-webkit-box" === T.wrapper.css("display")), T.params.slidesPerColumn > 1 && T.classNames.push(T.params.containerModifierClass + "multirow"), T.device.android && T.classNames.push(T.params.containerModifierClass + "android"), T.container.addClass(T.classNames.join(" ")), T.translate = 0, T.progress = 0, T.velocity = 0, T.lockSwipeToNext = function () {
                    T.params.allowSwipeToNext = !1, !1 === T.params.allowSwipeToPrev && T.params.grabCursor && T.unsetGrabCursor()
                }, T.lockSwipeToPrev = function () {
                    T.params.allowSwipeToPrev = !1, !1 === T.params.allowSwipeToNext && T.params.grabCursor && T.unsetGrabCursor()
                }, T.lockSwipes = function () {
                    T.params.allowSwipeToNext = T.params.allowSwipeToPrev = !1, T.params.grabCursor && T.unsetGrabCursor()
                }, T.unlockSwipeToNext = function () {
                    T.params.allowSwipeToNext = !0, !0 === T.params.allowSwipeToPrev && T.params.grabCursor && T.setGrabCursor()
                }, T.unlockSwipeToPrev = function () {
                    T.params.allowSwipeToPrev = !0, !0 === T.params.allowSwipeToNext && T.params.grabCursor && T.setGrabCursor()
                }, T.unlockSwipes = function () {
                    T.params.allowSwipeToNext = T.params.allowSwipeToPrev = !0, T.params.grabCursor && T.setGrabCursor()
                }, T.setGrabCursor = function (e) {
                    T.container[0].style.cursor = "move", T.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", T.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", T.container[0].style.cursor = e ? "grabbing" : "grab"
                }, T.unsetGrabCursor = function () {
                    T.container[0].style.cursor = ""
                }, T.params.grabCursor && T.setGrabCursor(), T.imagesToLoad = [], T.imagesLoaded = 0, T.loadImage = function (e, t, i, n, s, r) {
                    function a() {
                        r && r()
                    }

                    var o;
                    e.complete && s ? a() : t ? (o = new window.Image, o.onload = a, o.onerror = a, n && (o.sizes = n), i && (o.srcset = i), t && (o.src = t)) : a()
                }, T.preloadImages = function () {
                    T.imagesToLoad = T.container.find("img");
                    for (var e = 0; e < T.imagesToLoad.length; e++) T.loadImage(T.imagesToLoad[e], T.imagesToLoad[e].currentSrc || T.imagesToLoad[e].getAttribute("src"), T.imagesToLoad[e].srcset || T.imagesToLoad[e].getAttribute("srcset"), T.imagesToLoad[e].sizes || T.imagesToLoad[e].getAttribute("sizes"), !0, function () {
                        void 0 !== T && null !== T && T && (void 0 !== T.imagesLoaded && T.imagesLoaded++, T.imagesLoaded === T.imagesToLoad.length && (T.params.updateOnImagesReady && T.update(), T.emit("onImagesReady", T)))
                    })
                }, T.autoplayTimeoutId = void 0, T.autoplaying = !1, T.autoplayPaused = !1, T.startAutoplay = function () {
                    return void 0 === T.autoplayTimeoutId && !!T.params.autoplay && !T.autoplaying && (T.autoplaying = !0, T.emit("onAutoplayStart", T), void a())
                }, T.stopAutoplay = function (e) {
                    T.autoplayTimeoutId && (T.autoplayTimeoutId && clearTimeout(T.autoplayTimeoutId), T.autoplaying = !1, T.autoplayTimeoutId = void 0, T.emit("onAutoplayStop", T))
                }, T.pauseAutoplay = function (e) {
                    T.autoplayPaused || (T.autoplayTimeoutId && clearTimeout(T.autoplayTimeoutId), T.autoplayPaused = !0, 0 === e ? (T.autoplayPaused = !1, a()) : T.wrapper.transitionEnd(function () {
                        T && (T.autoplayPaused = !1, T.autoplaying ? a() : T.stopAutoplay())
                    }))
                }, T.minTranslate = function () {
                    return -T.snapGrid[0]
                }, T.maxTranslate = function () {
                    return -T.snapGrid[T.snapGrid.length - 1]
                }, T.updateAutoHeight = function () {
                    var e, t = [], i = 0;
                    if ("auto" !== T.params.slidesPerView && T.params.slidesPerView > 1) for (e = 0; e < Math.ceil(T.params.slidesPerView); e++) {
                        var n = T.activeIndex + e;
                        if (n > T.slides.length) break;
                        t.push(T.slides.eq(n)[0])
                    } else t.push(T.slides.eq(T.activeIndex)[0]);
                    for (e = 0; e < t.length; e++) if (void 0 !== t[e]) {
                        var s = t[e].offsetHeight;
                        i = s > i ? s : i
                    }
                    i && T.wrapper.css("height", i + "px")
                }, T.updateContainerSize = function () {
                    var e, t;
                    e = void 0 !== T.params.width ? T.params.width : T.container[0].clientWidth, t = void 0 !== T.params.height ? T.params.height : T.container[0].clientHeight, 0 === e && T.isHorizontal() || 0 === t && !T.isHorizontal() || (e = e - parseInt(T.container.css("padding-left"), 10) - parseInt(T.container.css("padding-right"), 10), t = t - parseInt(T.container.css("padding-top"), 10) - parseInt(T.container.css("padding-bottom"), 10), T.width = e, T.height = t, T.size = T.isHorizontal() ? T.width : T.height)
                }, T.updateSlidesSize = function () {
                    T.slides = T.wrapper.children("." + T.params.slideClass), T.snapGrid = [], T.slidesGrid = [], T.slidesSizesGrid = [];
                    var e, t = T.params.spaceBetween, i = -T.params.slidesOffsetBefore, n = 0, s = 0;
                    if (void 0 !== T.size) {
                        "string" == typeof t && t.indexOf("%") >= 0 && (t = parseFloat(t.replace("%", "")) / 100 * T.size), T.virtualSize = -t, T.rtl ? T.slides.css({
                            marginLeft: "",
                            marginTop: ""
                        }) : T.slides.css({marginRight: "", marginBottom: ""});
                        var a;
                        T.params.slidesPerColumn > 1 && (a = Math.floor(T.slides.length / T.params.slidesPerColumn) === T.slides.length / T.params.slidesPerColumn ? T.slides.length : Math.ceil(T.slides.length / T.params.slidesPerColumn) * T.params.slidesPerColumn, "auto" !== T.params.slidesPerView && "row" === T.params.slidesPerColumnFill && (a = Math.max(a, T.params.slidesPerView * T.params.slidesPerColumn)));
                        var o, l = T.params.slidesPerColumn, u = a / l,
                            c = u - (T.params.slidesPerColumn * u - T.slides.length);
                        for (e = 0; e < T.slides.length; e++) {
                            o = 0;
                            var d = T.slides.eq(e);
                            if (T.params.slidesPerColumn > 1) {
                                var p, h, f;
                                "column" === T.params.slidesPerColumnFill ? (h = Math.floor(e / l), f = e - h * l, (h > c || h === c && f === l - 1) && ++f >= l && (f = 0, h++), p = h + f * a / l, d.css({
                                    "-webkit-box-ordinal-group": p,
                                    "-moz-box-ordinal-group": p,
                                    "-ms-flex-order": p,
                                    "-webkit-order": p,
                                    order: p
                                })) : (f = Math.floor(e / u), h = e - f * u), d.css("margin-" + (T.isHorizontal() ? "top" : "left"), 0 !== f && T.params.spaceBetween && T.params.spaceBetween + "px").attr("data-swiper-column", h).attr("data-swiper-row", f)
                            }
                            "none" !== d.css("display") && ("auto" === T.params.slidesPerView ? (o = T.isHorizontal() ? d.outerWidth(!0) : d.outerHeight(!0), T.params.roundLengths && (o = r(o))) : (o = (T.size - (T.params.slidesPerView - 1) * t) / T.params.slidesPerView, T.params.roundLengths && (o = r(o)), T.isHorizontal() ? T.slides[e].style.width = o + "px" : T.slides[e].style.height = o + "px"), T.slides[e].swiperSlideSize = o, T.slidesSizesGrid.push(o), T.params.centeredSlides ? (i = i + o / 2 + n / 2 + t, 0 === e && (i = i - T.size / 2 - t), Math.abs(i) < .001 && (i = 0), s % T.params.slidesPerGroup == 0 && T.snapGrid.push(i), T.slidesGrid.push(i)) : (s % T.params.slidesPerGroup == 0 && T.snapGrid.push(i), T.slidesGrid.push(i), i = i + o + t), T.virtualSize += o + t, n = o, s++)
                        }
                        T.virtualSize = Math.max(T.virtualSize, T.size) + T.params.slidesOffsetAfter;
                        var m;
                        if (T.rtl && T.wrongRTL && ("slide" === T.params.effect || "coverflow" === T.params.effect) && T.wrapper.css({width: T.virtualSize + T.params.spaceBetween + "px"}), T.support.flexbox && !T.params.setWrapperSize || (T.isHorizontal() ? T.wrapper.css({width: T.virtualSize + T.params.spaceBetween + "px"}) : T.wrapper.css({height: T.virtualSize + T.params.spaceBetween + "px"})), T.params.slidesPerColumn > 1 && (T.virtualSize = (o + T.params.spaceBetween) * a, T.virtualSize = Math.ceil(T.virtualSize / T.params.slidesPerColumn) - T.params.spaceBetween, T.isHorizontal() ? T.wrapper.css({width: T.virtualSize + T.params.spaceBetween + "px"}) : T.wrapper.css({height: T.virtualSize + T.params.spaceBetween + "px"}), T.params.centeredSlides)) {
                            for (m = [], e = 0; e < T.snapGrid.length; e++) T.snapGrid[e] < T.virtualSize + T.snapGrid[0] && m.push(T.snapGrid[e]);
                            T.snapGrid = m
                        }
                        if (!T.params.centeredSlides) {
                            for (m = [], e = 0; e < T.snapGrid.length; e++) T.snapGrid[e] <= T.virtualSize - T.size && m.push(T.snapGrid[e]);
                            T.snapGrid = m, Math.floor(T.virtualSize - T.size) - Math.floor(T.snapGrid[T.snapGrid.length - 1]) > 1 && T.snapGrid.push(T.virtualSize - T.size)
                        }
                        0 === T.snapGrid.length && (T.snapGrid = [0]), 0 !== T.params.spaceBetween && (T.isHorizontal() ? T.rtl ? T.slides.css({marginLeft: t + "px"}) : T.slides.css({marginRight: t + "px"}) : T.slides.css({marginBottom: t + "px"})), T.params.watchSlidesProgress && T.updateSlidesOffset()
                    }
                }, T.updateSlidesOffset = function () {
                    for (var e = 0; e < T.slides.length; e++) T.slides[e].swiperSlideOffset = T.isHorizontal() ? T.slides[e].offsetLeft : T.slides[e].offsetTop
                }, T.currentSlidesPerView = function () {
                    var e, t, i = 1;
                    if (T.params.centeredSlides) {
                        var n, s = T.slides[T.activeIndex].swiperSlideSize;
                        for (e = T.activeIndex + 1; e < T.slides.length; e++) T.slides[e] && !n && (s += T.slides[e].swiperSlideSize, i++, s > T.size && (n = !0));
                        for (t = T.activeIndex - 1; t >= 0; t--) T.slides[t] && !n && (s += T.slides[t].swiperSlideSize, i++, s > T.size && (n = !0))
                    } else for (e = T.activeIndex + 1; e < T.slides.length; e++) T.slidesGrid[e] - T.slidesGrid[T.activeIndex] < T.size && i++;
                    return i
                }, T.updateSlidesProgress = function (e) {
                    if (void 0 === e && (e = T.translate || 0), 0 !== T.slides.length) {
                        void 0 === T.slides[0].swiperSlideOffset && T.updateSlidesOffset();
                        var t = -e;
                        T.rtl && (t = e), T.slides.removeClass(T.params.slideVisibleClass);
                        for (var i = 0; i < T.slides.length; i++) {
                            var n = T.slides[i],
                                s = (t + (T.params.centeredSlides ? T.minTranslate() : 0) - n.swiperSlideOffset) / (n.swiperSlideSize + T.params.spaceBetween);
                            if (T.params.watchSlidesVisibility) {
                                var r = -(t - n.swiperSlideOffset), a = r + T.slidesSizesGrid[i];
                                (r >= 0 && r < T.size || a > 0 && a <= T.size || r <= 0 && a >= T.size) && T.slides.eq(i).addClass(T.params.slideVisibleClass)
                            }
                            n.progress = T.rtl ? -s : s
                        }
                    }
                }, T.updateProgress = function (e) {
                    void 0 === e && (e = T.translate || 0);
                    var t = T.maxTranslate() - T.minTranslate(), i = T.isBeginning, n = T.isEnd;
                    0 === t ? (T.progress = 0, T.isBeginning = T.isEnd = !0) : (T.progress = (e - T.minTranslate()) / t, T.isBeginning = T.progress <= 0, T.isEnd = T.progress >= 1), T.isBeginning && !i && T.emit("onReachBeginning", T), T.isEnd && !n && T.emit("onReachEnd", T), T.params.watchSlidesProgress && T.updateSlidesProgress(e), T.emit("onProgress", T, T.progress)
                }, T.updateActiveIndex = function () {
                    var e, t, i, n = T.rtl ? T.translate : -T.translate;
                    for (t = 0; t < T.slidesGrid.length; t++) void 0 !== T.slidesGrid[t + 1] ? n >= T.slidesGrid[t] && n < T.slidesGrid[t + 1] - (T.slidesGrid[t + 1] - T.slidesGrid[t]) / 2 ? e = t : n >= T.slidesGrid[t] && n < T.slidesGrid[t + 1] && (e = t + 1) : n >= T.slidesGrid[t] && (e = t);
                    T.params.normalizeSlideIndex && (e < 0 || void 0 === e) && (e = 0), (i = Math.floor(e / T.params.slidesPerGroup)) >= T.snapGrid.length && (i = T.snapGrid.length - 1), e !== T.activeIndex && (T.snapIndex = i, T.previousIndex = T.activeIndex, T.activeIndex = e, T.updateClasses(), T.updateRealIndex())
                }, T.updateRealIndex = function () {
                    T.realIndex = parseInt(T.slides.eq(T.activeIndex).attr("data-swiper-slide-index") || T.activeIndex, 10)
                }, T.updateClasses = function () {
                    T.slides.removeClass(T.params.slideActiveClass + " " + T.params.slideNextClass + " " + T.params.slidePrevClass + " " + T.params.slideDuplicateActiveClass + " " + T.params.slideDuplicateNextClass + " " + T.params.slideDuplicatePrevClass);
                    var t = T.slides.eq(T.activeIndex);
                    t.addClass(T.params.slideActiveClass), s.loop && (t.hasClass(T.params.slideDuplicateClass) ? T.wrapper.children("." + T.params.slideClass + ":not(." + T.params.slideDuplicateClass + ')[data-swiper-slide-index="' + T.realIndex + '"]').addClass(T.params.slideDuplicateActiveClass) : T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass + '[data-swiper-slide-index="' + T.realIndex + '"]').addClass(T.params.slideDuplicateActiveClass));
                    var i = t.next("." + T.params.slideClass).addClass(T.params.slideNextClass);
                    T.params.loop && 0 === i.length && (i = T.slides.eq(0)).addClass(T.params.slideNextClass);
                    var n = t.prev("." + T.params.slideClass).addClass(T.params.slidePrevClass);
                    if (T.params.loop && 0 === n.length && (n = T.slides.eq(-1)).addClass(T.params.slidePrevClass), s.loop && (i.hasClass(T.params.slideDuplicateClass) ? T.wrapper.children("." + T.params.slideClass + ":not(." + T.params.slideDuplicateClass + ')[data-swiper-slide-index="' + i.attr("data-swiper-slide-index") + '"]').addClass(T.params.slideDuplicateNextClass) : T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass + '[data-swiper-slide-index="' + i.attr("data-swiper-slide-index") + '"]').addClass(T.params.slideDuplicateNextClass), n.hasClass(T.params.slideDuplicateClass) ? T.wrapper.children("." + T.params.slideClass + ":not(." + T.params.slideDuplicateClass + ')[data-swiper-slide-index="' + n.attr("data-swiper-slide-index") + '"]').addClass(T.params.slideDuplicatePrevClass) : T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass + '[data-swiper-slide-index="' + n.attr("data-swiper-slide-index") + '"]').addClass(T.params.slideDuplicatePrevClass)), T.paginationContainer && T.paginationContainer.length > 0) {
                        var r,
                            a = T.params.loop ? Math.ceil((T.slides.length - 2 * T.loopedSlides) / T.params.slidesPerGroup) : T.snapGrid.length;
                        if (T.params.loop ? ((r = Math.ceil((T.activeIndex - T.loopedSlides) / T.params.slidesPerGroup)) > T.slides.length - 1 - 2 * T.loopedSlides && (r -= T.slides.length - 2 * T.loopedSlides), r > a - 1 && (r -= a), r < 0 && "bullets" !== T.params.paginationType && (r = a + r)) : r = void 0 !== T.snapIndex ? T.snapIndex : T.activeIndex || 0, "bullets" === T.params.paginationType && T.bullets && T.bullets.length > 0 && (T.bullets.removeClass(T.params.bulletActiveClass), T.paginationContainer.length > 1 ? T.bullets.each(function () {
                                e(this).index() === r && e(this).addClass(T.params.bulletActiveClass)
                            }) : T.bullets.eq(r).addClass(T.params.bulletActiveClass)), "fraction" === T.params.paginationType && (T.paginationContainer.find("." + T.params.paginationCurrentClass).text(r + 1), T.paginationContainer.find("." + T.params.paginationTotalClass).text(a)), "progress" === T.params.paginationType) {
                            var o = (r + 1) / a, l = o, u = 1;
                            T.isHorizontal() || (u = o, l = 1), T.paginationContainer.find("." + T.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + l + ") scaleY(" + u + ")").transition(T.params.speed)
                        }
                        "custom" === T.params.paginationType && T.params.paginationCustomRender && (T.paginationContainer.html(T.params.paginationCustomRender(T, r + 1, a)), T.emit("onPaginationRendered", T, T.paginationContainer[0]))
                    }
                    T.params.loop || (T.params.prevButton && T.prevButton && T.prevButton.length > 0 && (T.isBeginning ? (T.prevButton.addClass(T.params.buttonDisabledClass), T.params.a11y && T.a11y && T.a11y.disable(T.prevButton)) : (T.prevButton.removeClass(T.params.buttonDisabledClass), T.params.a11y && T.a11y && T.a11y.enable(T.prevButton))), T.params.nextButton && T.nextButton && T.nextButton.length > 0 && (T.isEnd ? (T.nextButton.addClass(T.params.buttonDisabledClass), T.params.a11y && T.a11y && T.a11y.disable(T.nextButton)) : (T.nextButton.removeClass(T.params.buttonDisabledClass), T.params.a11y && T.a11y && T.a11y.enable(T.nextButton))))
                }, T.updatePagination = function () {
                    if (T.params.pagination && T.paginationContainer && T.paginationContainer.length > 0) {
                        var e = "";
                        if ("bullets" === T.params.paginationType) {
                            for (var t = T.params.loop ? Math.ceil((T.slides.length - 2 * T.loopedSlides) / T.params.slidesPerGroup) : T.snapGrid.length, i = 0; i < t; i++) e += T.params.paginationBulletRender ? T.params.paginationBulletRender(T, i, T.params.bulletClass) : "<" + T.params.paginationElement + ' class="' + T.params.bulletClass + '"></' + T.params.paginationElement + ">";
                            T.paginationContainer.html(e), T.bullets = T.paginationContainer.find("." + T.params.bulletClass), T.params.paginationClickable && T.params.a11y && T.a11y && T.a11y.initPagination()
                        }
                        "fraction" === T.params.paginationType && (e = T.params.paginationFractionRender ? T.params.paginationFractionRender(T, T.params.paginationCurrentClass, T.params.paginationTotalClass) : '<span class="' + T.params.paginationCurrentClass + '"></span> / <span class="' + T.params.paginationTotalClass + '"></span>', T.paginationContainer.html(e)), "progress" === T.params.paginationType && (e = T.params.paginationProgressRender ? T.params.paginationProgressRender(T, T.params.paginationProgressbarClass) : '<span class="' + T.params.paginationProgressbarClass + '"></span>', T.paginationContainer.html(e)), "custom" !== T.params.paginationType && T.emit("onPaginationRendered", T, T.paginationContainer[0])
                    }
                }, T.update = function (e) {
                    function t() {
                        T.rtl, T.translate, i = Math.min(Math.max(T.translate, T.maxTranslate()), T.minTranslate()), T.setWrapperTranslate(i), T.updateActiveIndex(), T.updateClasses()
                    }

                    if (T) if (T.updateContainerSize(), T.updateSlidesSize(), T.updateProgress(), T.updatePagination(), T.updateClasses(), T.params.scrollbar && T.scrollbar && T.scrollbar.set(), e) {
                        var i;
                        T.controller && T.controller.spline && (T.controller.spline = void 0), T.params.freeMode ? (t(), T.params.autoHeight && T.updateAutoHeight()) : (("auto" === T.params.slidesPerView || T.params.slidesPerView > 1) && T.isEnd && !T.params.centeredSlides ? T.slideTo(T.slides.length - 1, 0, !1, !0) : T.slideTo(T.activeIndex, 0, !1, !0)) || t()
                    } else T.params.autoHeight && T.updateAutoHeight()
                }, T.onResize = function (e) {
                    T.params.breakpoints && T.setBreakpoint();
                    var t = T.params.allowSwipeToPrev, i = T.params.allowSwipeToNext;
                    T.params.allowSwipeToPrev = T.params.allowSwipeToNext = !0, T.updateContainerSize(), T.updateSlidesSize(), ("auto" === T.params.slidesPerView || T.params.freeMode || e) && T.updatePagination(), T.params.scrollbar && T.scrollbar && T.scrollbar.set(), T.controller && T.controller.spline && (T.controller.spline = void 0);
                    var n = !1;
                    if (T.params.freeMode) {
                        var s = Math.min(Math.max(T.translate, T.maxTranslate()), T.minTranslate());
                        T.setWrapperTranslate(s), T.updateActiveIndex(), T.updateClasses(), T.params.autoHeight && T.updateAutoHeight()
                    } else T.updateClasses(), n = ("auto" === T.params.slidesPerView || T.params.slidesPerView > 1) && T.isEnd && !T.params.centeredSlides ? T.slideTo(T.slides.length - 1, 0, !1, !0) : T.slideTo(T.activeIndex, 0, !1, !0);
                    T.params.lazyLoading && !n && T.lazy && T.lazy.load(), T.params.allowSwipeToPrev = t, T.params.allowSwipeToNext = i
                }, T.touchEventsDesktop = {
                    start: "mousedown",
                    move: "mousemove",
                    end: "mouseup"
                }, window.navigator.pointerEnabled ? T.touchEventsDesktop = {
                    start: "pointerdown",
                    move: "pointermove",
                    end: "pointerup"
                } : window.navigator.msPointerEnabled && (T.touchEventsDesktop = {
                    start: "MSPointerDown",
                    move: "MSPointerMove",
                    end: "MSPointerUp"
                }), T.touchEvents = {
                    start: T.support.touch || !T.params.simulateTouch ? "touchstart" : T.touchEventsDesktop.start,
                    move: T.support.touch || !T.params.simulateTouch ? "touchmove" : T.touchEventsDesktop.move,
                    end: T.support.touch || !T.params.simulateTouch ? "touchend" : T.touchEventsDesktop.end
                }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === T.params.touchEventsTarget ? T.container : T.wrapper).addClass("swiper-wp8-" + T.params.direction), T.initEvents = function (e) {
                    var t = e ? "off" : "on", i = e ? "removeEventListener" : "addEventListener",
                        n = "container" === T.params.touchEventsTarget ? T.container[0] : T.wrapper[0],
                        r = T.support.touch ? n : document, a = !!T.params.nested;
                    if (T.browser.ie) n[i](T.touchEvents.start, T.onTouchStart, !1), r[i](T.touchEvents.move, T.onTouchMove, a), r[i](T.touchEvents.end, T.onTouchEnd, !1); else {
                        if (T.support.touch) {
                            var o = !("touchstart" !== T.touchEvents.start || !T.support.passiveListener || !T.params.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            n[i](T.touchEvents.start, T.onTouchStart, o), n[i](T.touchEvents.move, T.onTouchMove, a), n[i](T.touchEvents.end, T.onTouchEnd, o)
                        }
                        (s.simulateTouch && !T.device.ios && !T.device.android || s.simulateTouch && !T.support.touch && T.device.ios) && (n[i]("mousedown", T.onTouchStart, !1), document[i]("mousemove", T.onTouchMove, a), document[i]("mouseup", T.onTouchEnd, !1))
                    }
                    window[i]("resize", T.onResize), T.params.nextButton && T.nextButton && T.nextButton.length > 0 && (T.nextButton[t]("click", T.onClickNext), T.params.a11y && T.a11y && T.nextButton[t]("keydown", T.a11y.onEnterKey)), T.params.prevButton && T.prevButton && T.prevButton.length > 0 && (T.prevButton[t]("click", T.onClickPrev), T.params.a11y && T.a11y && T.prevButton[t]("keydown", T.a11y.onEnterKey)), T.params.pagination && T.params.paginationClickable && (T.paginationContainer[t]("click", "." + T.params.bulletClass, T.onClickIndex), T.params.a11y && T.a11y && T.paginationContainer[t]("keydown", "." + T.params.bulletClass, T.a11y.onEnterKey)), (T.params.preventClicks || T.params.preventClicksPropagation) && n[i]("click", T.preventClicks, !0)
                }, T.attachEvents = function () {
                    T.initEvents()
                }, T.detachEvents = function () {
                    T.initEvents(!0)
                }, T.allowClick = !0, T.preventClicks = function (e) {
                    T.allowClick || (T.params.preventClicks && e.preventDefault(), T.params.preventClicksPropagation && T.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                }, T.onClickNext = function (e) {
                    e.preventDefault(), T.isEnd && !T.params.loop || T.slideNext()
                }, T.onClickPrev = function (e) {
                    e.preventDefault(), T.isBeginning && !T.params.loop || T.slidePrev()
                }, T.onClickIndex = function (t) {
                    t.preventDefault();
                    var i = e(this).index() * T.params.slidesPerGroup;
                    T.params.loop && (i += T.loopedSlides), T.slideTo(i)
                }, T.updateClickedSlide = function (t) {
                    var i = o(t, "." + T.params.slideClass), n = !1;
                    if (i) for (var s = 0; s < T.slides.length; s++) T.slides[s] === i && (n = !0);
                    if (!i || !n) return T.clickedSlide = void 0, void(T.clickedIndex = void 0);
                    if (T.clickedSlide = i, T.clickedIndex = e(i).index(), T.params.slideToClickedSlide && void 0 !== T.clickedIndex && T.clickedIndex !== T.activeIndex) {
                        var r, a = T.clickedIndex,
                            l = "auto" === T.params.slidesPerView ? T.currentSlidesPerView() : T.params.slidesPerView;
                        if (T.params.loop) {
                            if (T.animating) return;
                            r = parseInt(e(T.clickedSlide).attr("data-swiper-slide-index"), 10), T.params.centeredSlides ? a < T.loopedSlides - l / 2 || a > T.slides.length - T.loopedSlides + l / 2 ? (T.fixLoop(), a = T.wrapper.children("." + T.params.slideClass + '[data-swiper-slide-index="' + r + '"]:not(.' + T.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                                T.slideTo(a)
                            }, 0)) : T.slideTo(a) : a > T.slides.length - l ? (T.fixLoop(), a = T.wrapper.children("." + T.params.slideClass + '[data-swiper-slide-index="' + r + '"]:not(.' + T.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                                T.slideTo(a)
                            }, 0)) : T.slideTo(a)
                        } else T.slideTo(a)
                    }
                };
                var _, C, S, P, k, I, E, j, A, M, Y = "input, select, textarea, button, video", D = Date.now(), z = [];
                T.animating = !1, T.touches = {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0};
                var Q, O;
                T.onTouchStart = function (t) {
                    if (t.originalEvent && (t = t.originalEvent), (Q = "touchstart" === t.type) || !("which" in t) || 3 !== t.which) {
                        if (T.params.noSwiping && o(t, "." + T.params.noSwipingClass)) return void(T.allowClick = !0);
                        if (!T.params.swipeHandler || o(t, T.params.swipeHandler)) {
                            var i = T.touches.currentX = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX,
                                n = T.touches.currentY = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY;
                            if (!(T.device.ios && T.params.iOSEdgeSwipeDetection && i <= T.params.iOSEdgeSwipeThreshold)) {
                                if (_ = !0, C = !1, S = !0, k = void 0, O = void 0, T.touches.startX = i, T.touches.startY = n, P = Date.now(), T.allowClick = !0, T.updateContainerSize(), T.swipeDirection = void 0, T.params.threshold > 0 && (j = !1), "touchstart" !== t.type) {
                                    var s = !0;
                                    e(t.target).is(Y) && (s = !1), document.activeElement && e(document.activeElement).is(Y) && document.activeElement.blur(), s && t.preventDefault()
                                }
                                T.emit("onTouchStart", T, t)
                            }
                        }
                    }
                }, T.onTouchMove = function (t) {
                    if (t.originalEvent && (t = t.originalEvent), !Q || "mousemove" !== t.type) {
                        if (t.preventedByNestedSwiper) return T.touches.startX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, void(T.touches.startY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY);
                        if (T.params.onlyExternal) return T.allowClick = !1, void(_ && (T.touches.startX = T.touches.currentX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, T.touches.startY = T.touches.currentY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY, P = Date.now()));
                        if (Q && T.params.touchReleaseOnEdges && !T.params.loop) if (T.isHorizontal()) {
                            if (T.touches.currentX < T.touches.startX && T.translate <= T.maxTranslate() || T.touches.currentX > T.touches.startX && T.translate >= T.minTranslate()) return
                        } else if (T.touches.currentY < T.touches.startY && T.translate <= T.maxTranslate() || T.touches.currentY > T.touches.startY && T.translate >= T.minTranslate()) return;
                        if (Q && document.activeElement && t.target === document.activeElement && e(t.target).is(Y)) return C = !0, void(T.allowClick = !1);
                        if (S && T.emit("onTouchMove", T, t), !(t.targetTouches && t.targetTouches.length > 1)) {
                            if (T.touches.currentX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, T.touches.currentY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY, void 0 === k) {
                                var i;
                                T.isHorizontal() && T.touches.currentY === T.touches.startY || !T.isHorizontal() && T.touches.currentX === T.touches.startX ? k = !1 : (i = 180 * Math.atan2(Math.abs(T.touches.currentY - T.touches.startY), Math.abs(T.touches.currentX - T.touches.startX)) / Math.PI, k = T.isHorizontal() ? i > T.params.touchAngle : 90 - i > T.params.touchAngle)
                            }
                            if (k && T.emit("onTouchMoveOpposite", T, t), void 0 === O && T.browser.ieTouch && (T.touches.currentX === T.touches.startX && T.touches.currentY === T.touches.startY || (O = !0)), _) {
                                if (k) return void(_ = !1);
                                if (O || !T.browser.ieTouch) {
                                    T.allowClick = !1, T.emit("onSliderMove", T, t), t.preventDefault(), T.params.touchMoveStopPropagation && !T.params.nested && t.stopPropagation(), C || (s.loop && T.fixLoop(), E = T.getWrapperTranslate(), T.setWrapperTransition(0), T.animating && T.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), T.params.autoplay && T.autoplaying && (T.params.autoplayDisableOnInteraction ? T.stopAutoplay() : T.pauseAutoplay()), M = !1, !T.params.grabCursor || !0 !== T.params.allowSwipeToNext && !0 !== T.params.allowSwipeToPrev || T.setGrabCursor(!0)), C = !0;
                                    var n = T.touches.diff = T.isHorizontal() ? T.touches.currentX - T.touches.startX : T.touches.currentY - T.touches.startY;
                                    n *= T.params.touchRatio, T.rtl && (n = -n), T.swipeDirection = n > 0 ? "prev" : "next", I = n + E;
                                    var r = !0;
                                    if (n > 0 && I > T.minTranslate() ? (r = !1, T.params.resistance && (I = T.minTranslate() - 1 + Math.pow(-T.minTranslate() + E + n, T.params.resistanceRatio))) : n < 0 && I < T.maxTranslate() && (r = !1, T.params.resistance && (I = T.maxTranslate() + 1 - Math.pow(T.maxTranslate() - E - n, T.params.resistanceRatio))), r && (t.preventedByNestedSwiper = !0), !T.params.allowSwipeToNext && "next" === T.swipeDirection && I < E && (I = E), !T.params.allowSwipeToPrev && "prev" === T.swipeDirection && I > E && (I = E), T.params.threshold > 0) {
                                        if (!(Math.abs(n) > T.params.threshold || j)) return void(I = E);
                                        if (!j) return j = !0, T.touches.startX = T.touches.currentX, T.touches.startY = T.touches.currentY, I = E, void(T.touches.diff = T.isHorizontal() ? T.touches.currentX - T.touches.startX : T.touches.currentY - T.touches.startY)
                                    }
                                    T.params.followFinger && ((T.params.freeMode || T.params.watchSlidesProgress) && T.updateActiveIndex(), T.params.freeMode && (0 === z.length && z.push({
                                        position: T.touches[T.isHorizontal() ? "startX" : "startY"],
                                        time: P
                                    }), z.push({
                                        position: T.touches[T.isHorizontal() ? "currentX" : "currentY"],
                                        time: (new window.Date).getTime()
                                    })), T.updateProgress(I), T.setWrapperTranslate(I))
                                }
                            }
                        }
                    }
                }, T.onTouchEnd = function (t) {
                    if (t.originalEvent && (t = t.originalEvent), S && T.emit("onTouchEnd", T, t), S = !1, _) {
                        T.params.grabCursor && C && _ && (!0 === T.params.allowSwipeToNext || !0 === T.params.allowSwipeToPrev) && T.setGrabCursor(!1);
                        var i = Date.now(), n = i - P;
                        if (T.allowClick && (T.updateClickedSlide(t), T.emit("onTap", T, t), n < 300 && i - D > 300 && (A && clearTimeout(A), A = setTimeout(function () {
                                T && (T.params.paginationHide && T.paginationContainer.length > 0 && !e(t.target).hasClass(T.params.bulletClass) && T.paginationContainer.toggleClass(T.params.paginationHiddenClass), T.emit("onClick", T, t))
                            }, 300)), n < 300 && i - D < 300 && (A && clearTimeout(A), T.emit("onDoubleTap", T, t))), D = Date.now(), setTimeout(function () {
                                T && (T.allowClick = !0)
                            }, 0), !_ || !C || !T.swipeDirection || 0 === T.touches.diff || I === E) return void(_ = C = !1);
                        _ = C = !1;
                        var s;
                        if (s = T.params.followFinger ? T.rtl ? T.translate : -T.translate : -I, T.params.freeMode) {
                            if (s < -T.minTranslate()) return void T.slideTo(T.activeIndex);
                            if (s > -T.maxTranslate()) return void(T.slides.length < T.snapGrid.length ? T.slideTo(T.snapGrid.length - 1) : T.slideTo(T.slides.length - 1));
                            if (T.params.freeModeMomentum) {
                                if (z.length > 1) {
                                    var r = z.pop(), a = z.pop(), o = r.position - a.position, l = r.time - a.time;
                                    T.velocity = o / l, T.velocity = T.velocity / 2, Math.abs(T.velocity) < T.params.freeModeMinimumVelocity && (T.velocity = 0), (l > 150 || (new window.Date).getTime() - r.time > 300) && (T.velocity = 0)
                                } else T.velocity = 0;
                                T.velocity = T.velocity * T.params.freeModeMomentumVelocityRatio, z.length = 0;
                                var u = 1e3 * T.params.freeModeMomentumRatio, c = T.velocity * u, d = T.translate + c;
                                T.rtl && (d = -d);
                                var p, h = !1, f = 20 * Math.abs(T.velocity) * T.params.freeModeMomentumBounceRatio;
                                if (d < T.maxTranslate()) T.params.freeModeMomentumBounce ? (d + T.maxTranslate() < -f && (d = T.maxTranslate() - f), p = T.maxTranslate(), h = !0, M = !0) : d = T.maxTranslate(); else if (d > T.minTranslate()) T.params.freeModeMomentumBounce ? (d - T.minTranslate() > f && (d = T.minTranslate() + f), p = T.minTranslate(), h = !0, M = !0) : d = T.minTranslate(); else if (T.params.freeModeSticky) {
                                    var m, g = 0;
                                    for (g = 0; g < T.snapGrid.length; g += 1) if (T.snapGrid[g] > -d) {
                                        m = g;
                                        break
                                    }
                                    d = Math.abs(T.snapGrid[m] - d) < Math.abs(T.snapGrid[m - 1] - d) || "next" === T.swipeDirection ? T.snapGrid[m] : T.snapGrid[m - 1], T.rtl || (d = -d)
                                }
                                if (0 !== T.velocity) u = T.rtl ? Math.abs((-d - T.translate) / T.velocity) : Math.abs((d - T.translate) / T.velocity); else if (T.params.freeModeSticky) return void T.slideReset();
                                T.params.freeModeMomentumBounce && h ? (T.updateProgress(p), T.setWrapperTransition(u), T.setWrapperTranslate(d), T.onTransitionStart(), T.animating = !0, T.wrapper.transitionEnd(function () {
                                    T && M && (T.emit("onMomentumBounce", T), T.setWrapperTransition(T.params.speed), T.setWrapperTranslate(p), T.wrapper.transitionEnd(function () {
                                        T && T.onTransitionEnd()
                                    }))
                                })) : T.velocity ? (T.updateProgress(d), T.setWrapperTransition(u), T.setWrapperTranslate(d), T.onTransitionStart(), T.animating || (T.animating = !0, T.wrapper.transitionEnd(function () {
                                    T && T.onTransitionEnd()
                                }))) : T.updateProgress(d), T.updateActiveIndex()
                            }
                            return void((!T.params.freeModeMomentum || n >= T.params.longSwipesMs) && (T.updateProgress(), T.updateActiveIndex()))
                        }
                        var v, y = 0, b = T.slidesSizesGrid[0];
                        for (v = 0; v < T.slidesGrid.length; v += T.params.slidesPerGroup) void 0 !== T.slidesGrid[v + T.params.slidesPerGroup] ? s >= T.slidesGrid[v] && s < T.slidesGrid[v + T.params.slidesPerGroup] && (y = v, b = T.slidesGrid[v + T.params.slidesPerGroup] - T.slidesGrid[v]) : s >= T.slidesGrid[v] && (y = v, b = T.slidesGrid[T.slidesGrid.length - 1] - T.slidesGrid[T.slidesGrid.length - 2]);
                        var w = (s - T.slidesGrid[y]) / b;
                        if (n > T.params.longSwipesMs) {
                            if (!T.params.longSwipes) return void T.slideTo(T.activeIndex);
                            "next" === T.swipeDirection && (w >= T.params.longSwipesRatio ? T.slideTo(y + T.params.slidesPerGroup) : T.slideTo(y)), "prev" === T.swipeDirection && (w > 1 - T.params.longSwipesRatio ? T.slideTo(y + T.params.slidesPerGroup) : T.slideTo(y))
                        } else {
                            if (!T.params.shortSwipes) return void T.slideTo(T.activeIndex);
                            "next" === T.swipeDirection && T.slideTo(y + T.params.slidesPerGroup), "prev" === T.swipeDirection && T.slideTo(y)
                        }
                    }
                }, T._slideTo = function (e, t) {
                    return T.slideTo(e, t, !0, !0)
                }, T.slideTo = function (e, t, i, n) {
                    void 0 === i && (i = !0), void 0 === e && (e = 0), e < 0 && (e = 0), T.snapIndex = Math.floor(e / T.params.slidesPerGroup), T.snapIndex >= T.snapGrid.length && (T.snapIndex = T.snapGrid.length - 1);
                    var s = -T.snapGrid[T.snapIndex];
                    if (T.params.autoplay && T.autoplaying && (n || !T.params.autoplayDisableOnInteraction ? T.pauseAutoplay(t) : T.stopAutoplay()), T.updateProgress(s), T.params.normalizeSlideIndex) for (var r = 0; r < T.slidesGrid.length; r++) -Math.floor(100 * s) >= Math.floor(100 * T.slidesGrid[r]) && (e = r);
                    return !(!T.params.allowSwipeToNext && s < T.translate && s < T.minTranslate() || !T.params.allowSwipeToPrev && s > T.translate && s > T.maxTranslate() && (T.activeIndex || 0) !== e || (void 0 === t && (t = T.params.speed), T.previousIndex = T.activeIndex || 0, T.activeIndex = e, T.updateRealIndex(), T.rtl && -s === T.translate || !T.rtl && s === T.translate ? (T.params.autoHeight && T.updateAutoHeight(), T.updateClasses(), "slide" !== T.params.effect && T.setWrapperTranslate(s), 1) : (T.updateClasses(), T.onTransitionStart(i), 0 === t || T.browser.lteIE9 ? (T.setWrapperTranslate(s), T.setWrapperTransition(0), T.onTransitionEnd(i)) : (T.setWrapperTranslate(s), T.setWrapperTransition(t), T.animating || (T.animating = !0, T.wrapper.transitionEnd(function () {
                        T && T.onTransitionEnd(i)
                    }))), 0)))
                }, T.onTransitionStart = function (e) {
                    void 0 === e && (e = !0), T.params.autoHeight && T.updateAutoHeight(), T.lazy && T.lazy.onTransitionStart(), e && (T.emit("onTransitionStart", T), T.activeIndex !== T.previousIndex && (T.emit("onSlideChangeStart", T), T.activeIndex > T.previousIndex ? T.emit("onSlideNextStart", T) : T.emit("onSlidePrevStart", T)))
                }, T.onTransitionEnd = function (e) {
                    T.animating = !1, T.setWrapperTransition(0), void 0 === e && (e = !0), T.lazy && T.lazy.onTransitionEnd(), e && (T.emit("onTransitionEnd", T), T.activeIndex !== T.previousIndex && (T.emit("onSlideChangeEnd", T), T.activeIndex > T.previousIndex ? T.emit("onSlideNextEnd", T) : T.emit("onSlidePrevEnd", T))), T.params.history && T.history && T.history.setHistory(T.params.history, T.activeIndex), T.params.hashnav && T.hashnav && T.hashnav.setHash()
                }, T.slideNext = function (e, t, i) {
                    return T.params.loop ? !T.animating && (T.fixLoop(), T.container[0].clientLeft, T.slideTo(T.activeIndex + T.params.slidesPerGroup, t, e, i)) : T.slideTo(T.activeIndex + T.params.slidesPerGroup, t, e, i)
                }, T._slideNext = function (e) {
                    return T.slideNext(!0, e, !0)
                }, T.slidePrev = function (e, t, i) {
                    return T.params.loop ? !T.animating && (T.fixLoop(), T.container[0].clientLeft, T.slideTo(T.activeIndex - 1, t, e, i)) : T.slideTo(T.activeIndex - 1, t, e, i)
                }, T._slidePrev = function (e) {
                    return T.slidePrev(!0, e, !0)
                }, T.slideReset = function (e, t, i) {
                    return T.slideTo(T.activeIndex, t, e)
                }, T.disableTouchControl = function () {
                    return T.params.onlyExternal = !0, !0
                }, T.enableTouchControl = function () {
                    return T.params.onlyExternal = !1, !0
                }, T.setWrapperTransition = function (e, t) {
                    T.wrapper.transition(e), "slide" !== T.params.effect && T.effects[T.params.effect] && T.effects[T.params.effect].setTransition(e), T.params.parallax && T.parallax && T.parallax.setTransition(e), T.params.scrollbar && T.scrollbar && T.scrollbar.setTransition(e), T.params.control && T.controller && T.controller.setTransition(e, t), T.emit("onSetTransition", T, e)
                }, T.setWrapperTranslate = function (e, t, i) {
                    var n = 0, s = 0;
                    T.isHorizontal() ? n = T.rtl ? -e : e : s = e, T.params.roundLengths && (n = r(n), s = r(s)), T.params.virtualTranslate || (T.support.transforms3d ? T.wrapper.transform("translate3d(" + n + "px, " + s + "px, 0px)") : T.wrapper.transform("translate(" + n + "px, " + s + "px)")), T.translate = T.isHorizontal() ? n : s;
                    var a = T.maxTranslate() - T.minTranslate();
                    (0 === a ? 0 : (e - T.minTranslate()) / a) !== T.progress && T.updateProgress(e), t && T.updateActiveIndex(), "slide" !== T.params.effect && T.effects[T.params.effect] && T.effects[T.params.effect].setTranslate(T.translate), T.params.parallax && T.parallax && T.parallax.setTranslate(T.translate), T.params.scrollbar && T.scrollbar && T.scrollbar.setTranslate(T.translate), T.params.control && T.controller && T.controller.setTranslate(T.translate, i), T.emit("onSetTranslate", T, T.translate)
                }, T.getTranslate = function (e, t) {
                    var i, n, s, r;
                    return void 0 === t && (t = "x"), T.params.virtualTranslate ? T.rtl ? -T.translate : T.translate : (s = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? ((n = s.transform || s.webkitTransform).split(",").length > 6 && (n = n.split(", ").map(function (e) {
                        return e.replace(",", ".")
                    }).join(", ")), r = new window.WebKitCSSMatrix("none" === n ? "" : n)) : (r = s.MozTransform || s.OTransform || s.MsTransform || s.msTransform || s.transform || s.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = r.toString().split(",")), "x" === t && (n = window.WebKitCSSMatrix ? r.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (n = window.WebKitCSSMatrix ? r.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), T.rtl && n && (n = -n), n || 0)
                }, T.getWrapperTranslate = function (e) {
                    return void 0 === e && (e = T.isHorizontal() ? "x" : "y"), T.getTranslate(T.wrapper[0], e)
                }, T.observers = [], T.initObservers = function () {
                    if (T.params.observeParents) for (var e = T.container.parents(), t = 0; t < e.length; t++) l(e[t]);
                    l(T.container[0], {childList: !1}), l(T.wrapper[0], {attributes: !1})
                }, T.disconnectObservers = function () {
                    for (var e = 0; e < T.observers.length; e++) T.observers[e].disconnect();
                    T.observers = []
                }, T.createLoop = function () {
                    T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass).remove();
                    var t = T.wrapper.children("." + T.params.slideClass);
                    "auto" !== T.params.slidesPerView || T.params.loopedSlides || (T.params.loopedSlides = t.length), T.loopedSlides = parseInt(T.params.loopedSlides || T.params.slidesPerView, 10), T.loopedSlides = T.loopedSlides + T.params.loopAdditionalSlides, T.loopedSlides > t.length && (T.loopedSlides = t.length);
                    var i, n = [], s = [];
                    for (t.each(function (i, r) {
                        var a = e(this);
                        i < T.loopedSlides && s.push(r), i < t.length && i >= t.length - T.loopedSlides && n.push(r), a.attr("data-swiper-slide-index", i)
                    }), i = 0; i < s.length; i++) T.wrapper.append(e(s[i].cloneNode(!0)).addClass(T.params.slideDuplicateClass));
                    for (i = n.length - 1; i >= 0; i--) T.wrapper.prepend(e(n[i].cloneNode(!0)).addClass(T.params.slideDuplicateClass))
                }, T.destroyLoop = function () {
                    T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass).remove(), T.slides.removeAttr("data-swiper-slide-index")
                }, T.reLoop = function (e) {
                    var t = T.activeIndex - T.loopedSlides;
                    T.destroyLoop(), T.createLoop(), T.updateSlidesSize(), e && T.slideTo(t + T.loopedSlides, 0, !1)
                }, T.fixLoop = function () {
                    var e;
                    T.activeIndex < T.loopedSlides ? (e = T.slides.length - 3 * T.loopedSlides + T.activeIndex, e += T.loopedSlides, T.slideTo(e, 0, !1, !0)) : ("auto" === T.params.slidesPerView && T.activeIndex >= 2 * T.loopedSlides || T.activeIndex > T.slides.length - 2 * T.params.slidesPerView) && (e = -T.slides.length + T.activeIndex + T.loopedSlides, e += T.loopedSlides, T.slideTo(e, 0, !1, !0))
                }, T.appendSlide = function (e) {
                    if (T.params.loop && T.destroyLoop(), "object" == typeof e && e.length) for (var t = 0; t < e.length; t++) e[t] && T.wrapper.append(e[t]); else T.wrapper.append(e);
                    T.params.loop && T.createLoop(), T.params.observer && T.support.observer || T.update(!0)
                }, T.prependSlide = function (e) {
                    T.params.loop && T.destroyLoop();
                    var t = T.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var i = 0; i < e.length; i++) e[i] && T.wrapper.prepend(e[i]);
                        t = T.activeIndex + e.length
                    } else T.wrapper.prepend(e);
                    T.params.loop && T.createLoop(), T.params.observer && T.support.observer || T.update(!0), T.slideTo(t, 0, !1)
                }, T.removeSlide = function (e) {
                    T.params.loop && (T.destroyLoop(), T.slides = T.wrapper.children("." + T.params.slideClass));
                    var t, i = T.activeIndex;
                    if ("object" == typeof e && e.length) {
                        for (var n = 0; n < e.length; n++) t = e[n], T.slides[t] && T.slides.eq(t).remove(), t < i && i--;
                        i = Math.max(i, 0)
                    } else t = e, T.slides[t] && T.slides.eq(t).remove(), t < i && i--, i = Math.max(i, 0);
                    T.params.loop && T.createLoop(), T.params.observer && T.support.observer || T.update(!0), T.params.loop ? T.slideTo(i + T.loopedSlides, 0, !1) : T.slideTo(i, 0, !1)
                }, T.removeAllSlides = function () {
                    for (var e = [], t = 0; t < T.slides.length; t++) e.push(t);
                    T.removeSlide(e)
                }, T.effects = {
                    fade: {
                        setTranslate: function () {
                            for (var e = 0; e < T.slides.length; e++) {
                                var t = T.slides.eq(e), i = -t[0].swiperSlideOffset;
                                T.params.virtualTranslate || (i -= T.translate);
                                var n = 0;
                                T.isHorizontal() || (n = i, i = 0);
                                var s = T.params.fade.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                                t.css({opacity: s}).transform("translate3d(" + i + "px, " + n + "px, 0px)")
                            }
                        }, setTransition: function (e) {
                            if (T.slides.transition(e), T.params.virtualTranslate && 0 !== e) {
                                var t = !1;
                                T.slides.transitionEnd(function () {
                                    if (!t && T) {
                                        t = !0, T.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], i = 0; i < e.length; i++) T.wrapper.trigger(e[i])
                                    }
                                })
                            }
                        }
                    }, flip: {
                        setTranslate: function () {
                            for (var t = 0; t < T.slides.length; t++) {
                                var i = T.slides.eq(t), n = i[0].progress;
                                T.params.flip.limitRotation && (n = Math.max(Math.min(i[0].progress, 1), -1));
                                var s = -180 * n, r = 0, a = -i[0].swiperSlideOffset, o = 0;
                                if (T.isHorizontal() ? T.rtl && (s = -s) : (o = a, a = 0, r = -s, s = 0), i[0].style.zIndex = -Math.abs(Math.round(n)) + T.slides.length, T.params.flip.slideShadows) {
                                    var l = T.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
                                        u = T.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
                                    0 === l.length && (l = e('<div class="swiper-slide-shadow-' + (T.isHorizontal() ? "left" : "top") + '"></div>'), i.append(l)), 0 === u.length && (u = e('<div class="swiper-slide-shadow-' + (T.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(u)), l.length && (l[0].style.opacity = Math.max(-n, 0)), u.length && (u[0].style.opacity = Math.max(n, 0))
                                }
                                i.transform("translate3d(" + a + "px, " + o + "px, 0px) rotateX(" + r + "deg) rotateY(" + s + "deg)")
                            }
                        }, setTransition: function (t) {
                            if (T.slides.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t), T.params.virtualTranslate && 0 !== t) {
                                var i = !1;
                                T.slides.eq(T.activeIndex).transitionEnd(function () {
                                    if (!i && T && e(this).hasClass(T.params.slideActiveClass)) {
                                        i = !0, T.animating = !1;
                                        for (var t = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], n = 0; n < t.length; n++) T.wrapper.trigger(t[n])
                                    }
                                })
                            }
                        }
                    }, cube: {
                        setTranslate: function () {
                            var t, i = 0;
                            T.params.cube.shadow && (T.isHorizontal() ? (0 === (t = T.wrapper.find(".swiper-cube-shadow")).length && (t = e('<div class="swiper-cube-shadow"></div>'), T.wrapper.append(t)), t.css({height: T.width + "px"})) : 0 === (t = T.container.find(".swiper-cube-shadow")).length && (t = e('<div class="swiper-cube-shadow"></div>'), T.container.append(t)));
                            for (var n = 0; n < T.slides.length; n++) {
                                var s = T.slides.eq(n), r = 90 * n, a = Math.floor(r / 360);
                                T.rtl && (r = -r, a = Math.floor(-r / 360));
                                var o = Math.max(Math.min(s[0].progress, 1), -1), l = 0, u = 0, c = 0;
                                n % 4 == 0 ? (l = 4 * -a * T.size, c = 0) : (n - 1) % 4 == 0 ? (l = 0, c = 4 * -a * T.size) : (n - 2) % 4 == 0 ? (l = T.size + 4 * a * T.size, c = T.size) : (n - 3) % 4 == 0 && (l = -T.size, c = 3 * T.size + 4 * T.size * a), T.rtl && (l = -l), T.isHorizontal() || (u = l, l = 0);
                                var d = "rotateX(" + (T.isHorizontal() ? 0 : -r) + "deg) rotateY(" + (T.isHorizontal() ? r : 0) + "deg) translate3d(" + l + "px, " + u + "px, " + c + "px)";
                                if (o <= 1 && o > -1 && (i = 90 * n + 90 * o, T.rtl && (i = 90 * -n - 90 * o)), s.transform(d), T.params.cube.slideShadows) {
                                    var p = T.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
                                        h = T.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                                    0 === p.length && (p = e('<div class="swiper-slide-shadow-' + (T.isHorizontal() ? "left" : "top") + '"></div>'), s.append(p)), 0 === h.length && (h = e('<div class="swiper-slide-shadow-' + (T.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(h)), p.length && (p[0].style.opacity = Math.max(-o, 0)), h.length && (h[0].style.opacity = Math.max(o, 0))
                                }
                            }
                            if (T.wrapper.css({
                                    "-webkit-transform-origin": "50% 50% -" + T.size / 2 + "px",
                                    "-moz-transform-origin": "50% 50% -" + T.size / 2 + "px",
                                    "-ms-transform-origin": "50% 50% -" + T.size / 2 + "px",
                                    "transform-origin": "50% 50% -" + T.size / 2 + "px"
                                }), T.params.cube.shadow) if (T.isHorizontal()) t.transform("translate3d(0px, " + (T.width / 2 + T.params.cube.shadowOffset) + "px, " + -T.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + T.params.cube.shadowScale + ")"); else {
                                var f = Math.abs(i) - 90 * Math.floor(Math.abs(i) / 90),
                                    m = 1.5 - (Math.sin(2 * f * Math.PI / 360) / 2 + Math.cos(2 * f * Math.PI / 360) / 2),
                                    g = T.params.cube.shadowScale, v = T.params.cube.shadowScale / m,
                                    y = T.params.cube.shadowOffset;
                                t.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (T.height / 2 + y) + "px, " + -T.height / 2 / v + "px) rotateX(-90deg)")
                            }
                            var b = T.isSafari || T.isUiWebView ? -T.size / 2 : 0;
                            T.wrapper.transform("translate3d(0px,0," + b + "px) rotateX(" + (T.isHorizontal() ? 0 : i) + "deg) rotateY(" + (T.isHorizontal() ? -i : 0) + "deg)")
                        }, setTransition: function (e) {
                            T.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), T.params.cube.shadow && !T.isHorizontal() && T.container.find(".swiper-cube-shadow").transition(e)
                        }
                    }, coverflow: {
                        setTranslate: function () {
                            for (var t = T.translate, i = T.isHorizontal() ? -t + T.width / 2 : -t + T.height / 2, n = T.isHorizontal() ? T.params.coverflow.rotate : -T.params.coverflow.rotate, s = T.params.coverflow.depth, r = 0, a = T.slides.length; r < a; r++) {
                                var o = T.slides.eq(r), l = T.slidesSizesGrid[r],
                                    u = (i - o[0].swiperSlideOffset - l / 2) / l * T.params.coverflow.modifier,
                                    c = T.isHorizontal() ? n * u : 0, d = T.isHorizontal() ? 0 : n * u,
                                    p = -s * Math.abs(u), h = T.isHorizontal() ? 0 : T.params.coverflow.stretch * u,
                                    f = T.isHorizontal() ? T.params.coverflow.stretch * u : 0;
                                Math.abs(f) < .001 && (f = 0), Math.abs(h) < .001 && (h = 0), Math.abs(p) < .001 && (p = 0), Math.abs(c) < .001 && (c = 0), Math.abs(d) < .001 && (d = 0);
                                var m = "translate3d(" + f + "px," + h + "px," + p + "px)  rotateX(" + d + "deg) rotateY(" + c + "deg)";
                                if (o.transform(m), o[0].style.zIndex = 1 - Math.abs(Math.round(u)), T.params.coverflow.slideShadows) {
                                    var g = T.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                                        v = T.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                                    0 === g.length && (g = e('<div class="swiper-slide-shadow-' + (T.isHorizontal() ? "left" : "top") + '"></div>'), o.append(g)), 0 === v.length && (v = e('<div class="swiper-slide-shadow-' + (T.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(v)), g.length && (g[0].style.opacity = u > 0 ? u : 0), v.length && (v[0].style.opacity = -u > 0 ? -u : 0)
                                }
                            }
                            T.browser.ie && (T.wrapper[0].style.perspectiveOrigin = i + "px 50%")
                        }, setTransition: function (e) {
                            T.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                        }
                    }
                }, T.lazy = {
                    initialImageLoaded: !1, loadImageInSlide: function (t, i) {
                        if (void 0 !== t && (void 0 === i && (i = !0), 0 !== T.slides.length)) {
                            var n = T.slides.eq(t),
                                s = n.find("." + T.params.lazyLoadingClass + ":not(." + T.params.lazyStatusLoadedClass + "):not(." + T.params.lazyStatusLoadingClass + ")");
                            !n.hasClass(T.params.lazyLoadingClass) || n.hasClass(T.params.lazyStatusLoadedClass) || n.hasClass(T.params.lazyStatusLoadingClass) || (s = s.add(n[0])), 0 !== s.length && s.each(function () {
                                var t = e(this);
                                t.addClass(T.params.lazyStatusLoadingClass);
                                var s = t.attr("data-background"), r = t.attr("data-src"), a = t.attr("data-srcset"),
                                    o = t.attr("data-sizes");
                                T.loadImage(t[0], r || s, a, o, !1, function () {
                                    if (s ? (t.css("background-image", 'url("' + s + '")'), t.removeAttr("data-background")) : (a && (t.attr("srcset", a), t.removeAttr("data-srcset")), o && (t.attr("sizes", o), t.removeAttr("data-sizes")), r && (t.attr("src", r), t.removeAttr("data-src"))), t.addClass(T.params.lazyStatusLoadedClass).removeClass(T.params.lazyStatusLoadingClass), n.find("." + T.params.lazyPreloaderClass + ", ." + T.params.preloaderClass).remove(), T.params.loop && i) {
                                        var e = n.attr("data-swiper-slide-index");
                                        if (n.hasClass(T.params.slideDuplicateClass)) {
                                            var l = T.wrapper.children('[data-swiper-slide-index="' + e + '"]:not(.' + T.params.slideDuplicateClass + ")");
                                            T.lazy.loadImageInSlide(l.index(), !1)
                                        } else {
                                            var u = T.wrapper.children("." + T.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                            T.lazy.loadImageInSlide(u.index(), !1)
                                        }
                                    }
                                    T.emit("onLazyImageReady", T, n[0], t[0])
                                }), T.emit("onLazyImageLoad", T, n[0], t[0])
                            })
                        }
                    }, load: function () {
                        var t, i = T.params.slidesPerView;
                        if ("auto" === i && (i = 0), T.lazy.initialImageLoaded || (T.lazy.initialImageLoaded = !0), T.params.watchSlidesVisibility) T.wrapper.children("." + T.params.slideVisibleClass).each(function () {
                            T.lazy.loadImageInSlide(e(this).index())
                        }); else if (i > 1) for (t = T.activeIndex; t < T.activeIndex + i; t++) T.slides[t] && T.lazy.loadImageInSlide(t); else T.lazy.loadImageInSlide(T.activeIndex);
                        if (T.params.lazyLoadingInPrevNext) if (i > 1 || T.params.lazyLoadingInPrevNextAmount && T.params.lazyLoadingInPrevNextAmount > 1) {
                            var n = T.params.lazyLoadingInPrevNextAmount, s = i,
                                r = Math.min(T.activeIndex + s + Math.max(n, s), T.slides.length),
                                a = Math.max(T.activeIndex - Math.max(s, n), 0);
                            for (t = T.activeIndex + i; t < r; t++) T.slides[t] && T.lazy.loadImageInSlide(t);
                            for (t = a; t < T.activeIndex; t++) T.slides[t] && T.lazy.loadImageInSlide(t)
                        } else {
                            var o = T.wrapper.children("." + T.params.slideNextClass);
                            o.length > 0 && T.lazy.loadImageInSlide(o.index());
                            var l = T.wrapper.children("." + T.params.slidePrevClass);
                            l.length > 0 && T.lazy.loadImageInSlide(l.index())
                        }
                    }, onTransitionStart: function () {
                        T.params.lazyLoading && (T.params.lazyLoadingOnTransitionStart || !T.params.lazyLoadingOnTransitionStart && !T.lazy.initialImageLoaded) && T.lazy.load()
                    }, onTransitionEnd: function () {
                        T.params.lazyLoading && !T.params.lazyLoadingOnTransitionStart && T.lazy.load()
                    }
                }, T.scrollbar = {
                    isTouched: !1,
                    setDragPosition: function (e) {
                        var t = T.scrollbar,
                            i = (T.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - t.track.offset()[T.isHorizontal() ? "left" : "top"] - t.dragSize / 2,
                            n = -T.minTranslate() * t.moveDivider, s = -T.maxTranslate() * t.moveDivider;
                        i < n ? i = n : i > s && (i = s), i = -i / t.moveDivider, T.updateProgress(i), T.setWrapperTranslate(i, !0)
                    },
                    dragStart: function (e) {
                        var t = T.scrollbar;
                        t.isTouched = !0, e.preventDefault(), e.stopPropagation(), t.setDragPosition(e), clearTimeout(t.dragTimeout), t.track.transition(0), T.params.scrollbarHide && t.track.css("opacity", 1), T.wrapper.transition(100), t.drag.transition(100), T.emit("onScrollbarDragStart", T)
                    },
                    dragMove: function (e) {
                        var t = T.scrollbar;
                        t.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), T.wrapper.transition(0), t.track.transition(0), t.drag.transition(0), T.emit("onScrollbarDragMove", T))
                    },
                    dragEnd: function (e) {
                        var t = T.scrollbar;
                        t.isTouched && (t.isTouched = !1, T.params.scrollbarHide && (clearTimeout(t.dragTimeout), t.dragTimeout = setTimeout(function () {
                            t.track.css("opacity", 0), t.track.transition(400)
                        }, 1e3)), T.emit("onScrollbarDragEnd", T), T.params.scrollbarSnapOnRelease && T.slideReset())
                    },
                    draggableEvents: !1 !== T.params.simulateTouch || T.support.touch ? T.touchEvents : T.touchEventsDesktop,
                    enableDraggable: function () {
                        var t = T.scrollbar, i = T.support.touch ? t.track : document;
                        e(t.track).on(t.draggableEvents.start, t.dragStart), e(i).on(t.draggableEvents.move, t.dragMove), e(i).on(t.draggableEvents.end, t.dragEnd)
                    },
                    disableDraggable: function () {
                        var t = T.scrollbar, i = T.support.touch ? t.track : document;
                        e(t.track).off(t.draggableEvents.start, t.dragStart), e(i).off(t.draggableEvents.move, t.dragMove), e(i).off(t.draggableEvents.end, t.dragEnd)
                    },
                    set: function () {
                        if (T.params.scrollbar) {
                            var t = T.scrollbar;
                            t.track = e(T.params.scrollbar), T.params.uniqueNavElements && "string" == typeof T.params.scrollbar && t.track.length > 1 && 1 === T.container.find(T.params.scrollbar).length && (t.track = T.container.find(T.params.scrollbar)), t.drag = t.track.find(".swiper-scrollbar-drag"), 0 === t.drag.length && (t.drag = e('<div class="swiper-scrollbar-drag"></div>'), t.track.append(t.drag)), t.drag[0].style.width = "", t.drag[0].style.height = "", t.trackSize = T.isHorizontal() ? t.track[0].offsetWidth : t.track[0].offsetHeight, t.divider = T.size / T.virtualSize, t.moveDivider = t.divider * (t.trackSize / T.size), t.dragSize = t.trackSize * t.divider, T.isHorizontal() ? t.drag[0].style.width = t.dragSize + "px" : t.drag[0].style.height = t.dragSize + "px", t.divider >= 1 ? t.track[0].style.display = "none" : t.track[0].style.display = "", T.params.scrollbarHide && (t.track[0].style.opacity = 0)
                        }
                    },
                    setTranslate: function () {
                        if (T.params.scrollbar) {
                            var e, t = T.scrollbar, i = (T.translate, t.dragSize);
                            e = (t.trackSize - t.dragSize) * T.progress, T.rtl && T.isHorizontal() ? (e = -e, e > 0 ? (i = t.dragSize - e, e = 0) : -e + t.dragSize > t.trackSize && (i = t.trackSize + e)) : e < 0 ? (i = t.dragSize + e, e = 0) : e + t.dragSize > t.trackSize && (i = t.trackSize - e), T.isHorizontal() ? (T.support.transforms3d ? t.drag.transform("translate3d(" + e + "px, 0, 0)") : t.drag.transform("translateX(" + e + "px)"), t.drag[0].style.width = i + "px") : (T.support.transforms3d ? t.drag.transform("translate3d(0px, " + e + "px, 0)") : t.drag.transform("translateY(" + e + "px)"), t.drag[0].style.height = i + "px"), T.params.scrollbarHide && (clearTimeout(t.timeout), t.track[0].style.opacity = 1, t.timeout = setTimeout(function () {
                                t.track[0].style.opacity = 0, t.track.transition(400)
                            }, 1e3))
                        }
                    },
                    setTransition: function (e) {
                        T.params.scrollbar && T.scrollbar.drag.transition(e)
                    }
                }, T.controller = {
                    LinearSpline: function (e, t) {
                        this.x = e, this.y = t, this.lastIndex = e.length - 1;
                        var i, n;
                        this.x.length, this.interpolate = function (e) {
                            return e ? (n = s(this.x, e), i = n - 1, (e - this.x[i]) * (this.y[n] - this.y[i]) / (this.x[n] - this.x[i]) + this.y[i]) : 0
                        };
                        var s = function () {
                            var e, t, i;
                            return function (n, s) {
                                for (t = -1, e = n.length; e - t > 1;) n[i = e + t >> 1] <= s ? t = i : e = i;
                                return e
                            }
                        }()
                    }, getInterpolateFunction: function (e) {
                        T.controller.spline || (T.controller.spline = T.params.loop ? new T.controller.LinearSpline(T.slidesGrid, e.slidesGrid) : new T.controller.LinearSpline(T.snapGrid, e.snapGrid))
                    }, setTranslate: function (e, i) {
                        function n(t) {
                            e = t.rtl && "horizontal" === t.params.direction ? -T.translate : T.translate, "slide" === T.params.controlBy && (T.controller.getInterpolateFunction(t), r = -T.controller.spline.interpolate(-e)), r && "container" !== T.params.controlBy || (s = (t.maxTranslate() - t.minTranslate()) / (T.maxTranslate() - T.minTranslate()), r = (e - T.minTranslate()) * s + t.minTranslate()), T.params.controlInverse && (r = t.maxTranslate() - r), t.updateProgress(r), t.setWrapperTranslate(r, !1, T), t.updateActiveIndex()
                        }

                        var s, r, a = T.params.control;
                        if (T.isArray(a)) for (var o = 0; o < a.length; o++) a[o] !== i && a[o] instanceof t && n(a[o]); else a instanceof t && i !== a && n(a)
                    }, setTransition: function (e, i) {
                        function n(t) {
                            t.setWrapperTransition(e, T), 0 !== e && (t.onTransitionStart(), t.wrapper.transitionEnd(function () {
                                r && (t.params.loop && "slide" === T.params.controlBy && t.fixLoop(), t.onTransitionEnd())
                            }))
                        }

                        var s, r = T.params.control;
                        if (T.isArray(r)) for (s = 0; s < r.length; s++) r[s] !== i && r[s] instanceof t && n(r[s]); else r instanceof t && i !== r && n(r)
                    }
                }, T.hashnav = {
                    onHashCange: function (e, t) {
                        var i = document.location.hash.replace("#", "");
                        i !== T.slides.eq(T.activeIndex).attr("data-hash") && T.slideTo(T.wrapper.children("." + T.params.slideClass + '[data-hash="' + i + '"]').index())
                    }, attachEvents: function (t) {
                        var i = t ? "off" : "on";
                        e(window)[i]("hashchange", T.hashnav.onHashCange)
                    }, setHash: function () {
                        if (T.hashnav.initialized && T.params.hashnav) if (T.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + T.slides.eq(T.activeIndex).attr("data-hash") || ""); else {
                            var e = T.slides.eq(T.activeIndex), t = e.attr("data-hash") || e.attr("data-history");
                            document.location.hash = t || ""
                        }
                    }, init: function () {
                        if (T.params.hashnav && !T.params.history) {
                            T.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e) for (var t = 0, i = T.slides.length; t < i; t++) {
                                var n = T.slides.eq(t);
                                if ((n.attr("data-hash") || n.attr("data-history")) === e && !n.hasClass(T.params.slideDuplicateClass)) {
                                    var s = n.index();
                                    T.slideTo(s, 0, T.params.runCallbacksOnInit, !0)
                                }
                            }
                            T.params.hashnavWatchState && T.hashnav.attachEvents()
                        }
                    }, destroy: function () {
                        T.params.hashnavWatchState && T.hashnav.attachEvents(!0)
                    }
                }, T.history = {
                    init: function () {
                        if (T.params.history) {
                            if (!window.history || !window.history.pushState) return T.params.history = !1, void(T.params.hashnav = !0);
                            T.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, T.params.runCallbacksOnInit), T.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState))
                        }
                    }, setHistoryPopState: function () {
                        T.history.paths = T.history.getPathValues(), T.history.scrollToSlide(T.params.speed, T.history.paths.value, !1)
                    }, getPathValues: function () {
                        var e = window.location.pathname.slice(1).split("/"), t = e.length;
                        return {key: e[t - 2], value: e[t - 1]}
                    }, setHistory: function (e, t) {
                        if (T.history.initialized && T.params.history) {
                            var i = T.slides.eq(t), n = this.slugify(i.attr("data-history"));
                            window.location.pathname.includes(e) || (n = e + "/" + n), T.params.replaceState ? window.history.replaceState(null, null, n) : window.history.pushState(null, null, n)
                        }
                    }, slugify: function (e) {
                        return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
                    }, scrollToSlide: function (e, t, i) {
                        if (t) for (var n = 0, s = T.slides.length; n < s; n++) {
                            var r = T.slides.eq(n);
                            if (this.slugify(r.attr("data-history")) === t && !r.hasClass(T.params.slideDuplicateClass)) {
                                var a = r.index();
                                T.slideTo(a, e, i)
                            }
                        } else T.slideTo(0, e, i)
                    }
                }, T.disableKeyboardControl = function () {
                    T.params.keyboardControl = !1, e(document).off("keydown", u)
                }, T.enableKeyboardControl = function () {
                    T.params.keyboardControl = !0, e(document).on("keydown", u)
                }, T.mousewheel = {
                    event: !1,
                    lastScrollTime: (new window.Date).getTime()
                }, T.params.mousewheelControl && (T.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function () {
                    var e = "onwheel", t = e in document;
                    if (!t) {
                        var i = document.createElement("div");
                        i.setAttribute(e, "return;"), t = "function" == typeof i[e]
                    }
                    return !t && document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", "") && (t = document.implementation.hasFeature("Events.wheel", "3.0")), t
                }() ? "wheel" : "mousewheel"), T.disableMousewheelControl = function () {
                    if (!T.mousewheel.event) return !1;
                    var t = T.container;
                    return "container" !== T.params.mousewheelEventsTarged && (t = e(T.params.mousewheelEventsTarged)), t.off(T.mousewheel.event, c), !0
                }, T.enableMousewheelControl = function () {
                    if (!T.mousewheel.event) return !1;
                    var t = T.container;
                    return "container" !== T.params.mousewheelEventsTarged && (t = e(T.params.mousewheelEventsTarged)), t.on(T.mousewheel.event, c), !0
                }, T.parallax = {
                    setTranslate: function () {
                        T.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            p(this, T.progress)
                        }), T.slides.each(function () {
                            var t = e(this);
                            t.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                                p(this, Math.min(Math.max(t[0].progress, -1), 1))
                            })
                        })
                    }, setTransition: function (t) {
                        void 0 === t && (t = T.params.speed), T.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            var i = e(this), n = parseInt(i.attr("data-swiper-parallax-duration"), 10) || t;
                            0 === t && (n = 0), i.transition(n)
                        })
                    }
                }, T.zoom = {
                    scale: 1,
                    currentScale: 1,
                    isScaling: !1,
                    gesture: {
                        slide: void 0,
                        slideWidth: void 0,
                        slideHeight: void 0,
                        image: void 0,
                        imageWrap: void 0,
                        zoomMax: T.params.zoomMax
                    },
                    image: {
                        isTouched: void 0,
                        isMoved: void 0,
                        currentX: void 0,
                        currentY: void 0,
                        minX: void 0,
                        minY: void 0,
                        maxX: void 0,
                        maxY: void 0,
                        width: void 0,
                        height: void 0,
                        startX: void 0,
                        startY: void 0,
                        touchesStart: {},
                        touchesCurrent: {}
                    },
                    velocity: {x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0},
                    getDistanceBetweenTouches: function (e) {
                        if (e.targetTouches.length < 2) return 1;
                        var t = e.targetTouches[0].pageX, i = e.targetTouches[0].pageY, n = e.targetTouches[1].pageX,
                            s = e.targetTouches[1].pageY;
                        return Math.sqrt(Math.pow(n - t, 2) + Math.pow(s - i, 2))
                    },
                    onGestureStart: function (t) {
                        var i = T.zoom;
                        if (!T.support.gestures) {
                            if ("touchstart" !== t.type || "touchstart" === t.type && t.targetTouches.length < 2) return;
                            i.gesture.scaleStart = i.getDistanceBetweenTouches(t)
                        }
                        return i.gesture.slide && i.gesture.slide.length || (i.gesture.slide = e(this), 0 === i.gesture.slide.length && (i.gesture.slide = T.slides.eq(T.activeIndex)), i.gesture.image = i.gesture.slide.find("img, svg, canvas"), i.gesture.imageWrap = i.gesture.image.parent("." + T.params.zoomContainerClass), i.gesture.zoomMax = i.gesture.imageWrap.attr("data-swiper-zoom") || T.params.zoomMax, 0 !== i.gesture.imageWrap.length) ? (i.gesture.image.transition(0), void(i.isScaling = !0)) : void(i.gesture.image = void 0)
                    },
                    onGestureChange: function (e) {
                        var t = T.zoom;
                        if (!T.support.gestures) {
                            if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                            t.gesture.scaleMove = t.getDistanceBetweenTouches(e)
                        }
                        t.gesture.image && 0 !== t.gesture.image.length && (T.support.gestures ? t.scale = e.scale * t.currentScale : t.scale = t.gesture.scaleMove / t.gesture.scaleStart * t.currentScale, t.scale > t.gesture.zoomMax && (t.scale = t.gesture.zoomMax - 1 + Math.pow(t.scale - t.gesture.zoomMax + 1, .5)), t.scale < T.params.zoomMin && (t.scale = T.params.zoomMin + 1 - Math.pow(T.params.zoomMin - t.scale + 1, .5)), t.gesture.image.transform("translate3d(0,0,0) scale(" + t.scale + ")"))
                    },
                    onGestureEnd: function (e) {
                        var t = T.zoom;
                        !T.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || t.gesture.image && 0 !== t.gesture.image.length && (t.scale = Math.max(Math.min(t.scale, t.gesture.zoomMax), T.params.zoomMin), t.gesture.image.transition(T.params.speed).transform("translate3d(0,0,0) scale(" + t.scale + ")"), t.currentScale = t.scale, t.isScaling = !1, 1 === t.scale && (t.gesture.slide = void 0))
                    },
                    onTouchStart: function (e, t) {
                        var i = e.zoom;
                        i.gesture.image && 0 !== i.gesture.image.length && (i.image.isTouched || ("android" === e.device.os && t.preventDefault(), i.image.isTouched = !0, i.image.touchesStart.x = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX, i.image.touchesStart.y = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY))
                    },
                    onTouchMove: function (e) {
                        var t = T.zoom;
                        if (t.gesture.image && 0 !== t.gesture.image.length && (T.allowClick = !1, t.image.isTouched && t.gesture.slide)) {
                            t.image.isMoved || (t.image.width = t.gesture.image[0].offsetWidth, t.image.height = t.gesture.image[0].offsetHeight, t.image.startX = T.getTranslate(t.gesture.imageWrap[0], "x") || 0, t.image.startY = T.getTranslate(t.gesture.imageWrap[0], "y") || 0, t.gesture.slideWidth = t.gesture.slide[0].offsetWidth, t.gesture.slideHeight = t.gesture.slide[0].offsetHeight, t.gesture.imageWrap.transition(0), T.rtl && (t.image.startX = -t.image.startX), T.rtl && (t.image.startY = -t.image.startY));
                            var i = t.image.width * t.scale, n = t.image.height * t.scale;
                            if (!(i < t.gesture.slideWidth && n < t.gesture.slideHeight)) {
                                if (t.image.minX = Math.min(t.gesture.slideWidth / 2 - i / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - n / 2, 0), t.image.maxY = -t.image.minY, t.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, t.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !t.image.isMoved && !t.isScaling) {
                                    if (T.isHorizontal() && Math.floor(t.image.minX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x < t.image.touchesStart.x || Math.floor(t.image.maxX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x > t.image.touchesStart.x) return void(t.image.isTouched = !1);
                                    if (!T.isHorizontal() && Math.floor(t.image.minY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y < t.image.touchesStart.y || Math.floor(t.image.maxY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y > t.image.touchesStart.y) return void(t.image.isTouched = !1)
                                }
                                e.preventDefault(), e.stopPropagation(), t.image.isMoved = !0, t.image.currentX = t.image.touchesCurrent.x - t.image.touchesStart.x + t.image.startX, t.image.currentY = t.image.touchesCurrent.y - t.image.touchesStart.y + t.image.startY, t.image.currentX < t.image.minX && (t.image.currentX = t.image.minX + 1 - Math.pow(t.image.minX - t.image.currentX + 1, .8)), t.image.currentX > t.image.maxX && (t.image.currentX = t.image.maxX - 1 + Math.pow(t.image.currentX - t.image.maxX + 1, .8)), t.image.currentY < t.image.minY && (t.image.currentY = t.image.minY + 1 - Math.pow(t.image.minY - t.image.currentY + 1, .8)), t.image.currentY > t.image.maxY && (t.image.currentY = t.image.maxY - 1 + Math.pow(t.image.currentY - t.image.maxY + 1, .8)), t.velocity.prevPositionX || (t.velocity.prevPositionX = t.image.touchesCurrent.x), t.velocity.prevPositionY || (t.velocity.prevPositionY = t.image.touchesCurrent.y), t.velocity.prevTime || (t.velocity.prevTime = Date.now()), t.velocity.x = (t.image.touchesCurrent.x - t.velocity.prevPositionX) / (Date.now() - t.velocity.prevTime) / 2, t.velocity.y = (t.image.touchesCurrent.y - t.velocity.prevPositionY) / (Date.now() - t.velocity.prevTime) / 2, Math.abs(t.image.touchesCurrent.x - t.velocity.prevPositionX) < 2 && (t.velocity.x = 0), Math.abs(t.image.touchesCurrent.y - t.velocity.prevPositionY) < 2 && (t.velocity.y = 0), t.velocity.prevPositionX = t.image.touchesCurrent.x, t.velocity.prevPositionY = t.image.touchesCurrent.y, t.velocity.prevTime = Date.now(), t.gesture.imageWrap.transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)")
                            }
                        }
                    },
                    onTouchEnd: function (e, t) {
                        var i = e.zoom;
                        if (i.gesture.image && 0 !== i.gesture.image.length) {
                            if (!i.image.isTouched || !i.image.isMoved) return i.image.isTouched = !1, void(i.image.isMoved = !1);
                            i.image.isTouched = !1, i.image.isMoved = !1;
                            var n = 300, s = 300, r = i.velocity.x * n, a = i.image.currentX + r, o = i.velocity.y * s,
                                l = i.image.currentY + o;
                            0 !== i.velocity.x && (n = Math.abs((a - i.image.currentX) / i.velocity.x)), 0 !== i.velocity.y && (s = Math.abs((l - i.image.currentY) / i.velocity.y));
                            var u = Math.max(n, s);
                            i.image.currentX = a, i.image.currentY = l;
                            var c = i.image.width * i.scale, d = i.image.height * i.scale;
                            i.image.minX = Math.min(i.gesture.slideWidth / 2 - c / 2, 0), i.image.maxX = -i.image.minX, i.image.minY = Math.min(i.gesture.slideHeight / 2 - d / 2, 0), i.image.maxY = -i.image.minY, i.image.currentX = Math.max(Math.min(i.image.currentX, i.image.maxX), i.image.minX), i.image.currentY = Math.max(Math.min(i.image.currentY, i.image.maxY), i.image.minY), i.gesture.imageWrap.transition(u).transform("translate3d(" + i.image.currentX + "px, " + i.image.currentY + "px,0)")
                        }
                    },
                    onTransitionEnd: function (e) {
                        var t = e.zoom;
                        t.gesture.slide && e.previousIndex !== e.activeIndex && (t.gesture.image.transform("translate3d(0,0,0) scale(1)"), t.gesture.imageWrap.transform("translate3d(0,0,0)"), t.gesture.slide = t.gesture.image = t.gesture.imageWrap = void 0, t.scale = t.currentScale = 1)
                    },
                    toggleZoom: function (t, i) {
                        var n = t.zoom;
                        if (n.gesture.slide || (n.gesture.slide = t.clickedSlide ? e(t.clickedSlide) : t.slides.eq(t.activeIndex), n.gesture.image = n.gesture.slide.find("img, svg, canvas"), n.gesture.imageWrap = n.gesture.image.parent("." + t.params.zoomContainerClass)), n.gesture.image && 0 !== n.gesture.image.length) {
                            var s, r, a, o, l, u, c, d, p, h, f, m, g, v, y, b, w, T;
                            void 0 === n.image.touchesStart.x && i ? (s = "touchend" === i.type ? i.changedTouches[0].pageX : i.pageX, r = "touchend" === i.type ? i.changedTouches[0].pageY : i.pageY) : (s = n.image.touchesStart.x, r = n.image.touchesStart.y), n.scale && 1 !== n.scale ? (n.scale = n.currentScale = 1, n.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), n.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), n.gesture.slide = void 0) : (n.scale = n.currentScale = n.gesture.imageWrap.attr("data-swiper-zoom") || t.params.zoomMax, i ? (w = n.gesture.slide[0].offsetWidth, T = n.gesture.slide[0].offsetHeight, a = n.gesture.slide.offset().left, o = n.gesture.slide.offset().top, l = a + w / 2 - s, u = o + T / 2 - r, p = n.gesture.image[0].offsetWidth, h = n.gesture.image[0].offsetHeight, f = p * n.scale, m = h * n.scale, g = Math.min(w / 2 - f / 2, 0), v = Math.min(T / 2 - m / 2, 0), y = -g, b = -v, c = l * n.scale, d = u * n.scale, c < g && (c = g), c > y && (c = y), d < v && (d = v), d > b && (d = b)) : (c = 0, d = 0), n.gesture.imageWrap.transition(300).transform("translate3d(" + c + "px, " + d + "px,0)"), n.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + n.scale + ")"))
                        }
                    },
                    attachEvents: function (t) {
                        var i = t ? "off" : "on";
                        if (T.params.zoom) {
                            var n = (T.slides, !("touchstart" !== T.touchEvents.start || !T.support.passiveListener || !T.params.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            });
                            T.support.gestures ? (T.slides[i]("gesturestart", T.zoom.onGestureStart, n), T.slides[i]("gesturechange", T.zoom.onGestureChange, n), T.slides[i]("gestureend", T.zoom.onGestureEnd, n)) : "touchstart" === T.touchEvents.start && (T.slides[i](T.touchEvents.start, T.zoom.onGestureStart, n), T.slides[i](T.touchEvents.move, T.zoom.onGestureChange, n), T.slides[i](T.touchEvents.end, T.zoom.onGestureEnd, n)), T[i]("touchStart", T.zoom.onTouchStart), T.slides.each(function (t, n) {
                                e(n).find("." + T.params.zoomContainerClass).length > 0 && e(n)[i](T.touchEvents.move, T.zoom.onTouchMove)
                            }), T[i]("touchEnd", T.zoom.onTouchEnd), T[i]("transitionEnd", T.zoom.onTransitionEnd), T.params.zoomToggle && T.on("doubleTap", T.zoom.toggleZoom)
                        }
                    },
                    init: function () {
                        T.zoom.attachEvents()
                    },
                    destroy: function () {
                        T.zoom.attachEvents(!0)
                    }
                }, T._plugins = [];
                for (var L in T.plugins) {
                    var B = T.plugins[L](T, T.params[L]);
                    B && T._plugins.push(B)
                }
                return T.callPlugins = function (e) {
                    for (var t = 0; t < T._plugins.length; t++) e in T._plugins[t] && T._plugins[t][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
                }, T.emitterEventListeners = {}, T.emit = function (e) {
                    T.params[e] && T.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    var t;
                    if (T.emitterEventListeners[e]) for (t = 0; t < T.emitterEventListeners[e].length; t++) T.emitterEventListeners[e][t](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    T.callPlugins && T.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
                }, T.on = function (e, t) {
                    return e = h(e), T.emitterEventListeners[e] || (T.emitterEventListeners[e] = []), T.emitterEventListeners[e].push(t), T
                }, T.off = function (e, t) {
                    var i;
                    if (e = h(e), void 0 === t) return T.emitterEventListeners[e] = [], T;
                    if (T.emitterEventListeners[e] && 0 !== T.emitterEventListeners[e].length) {
                        for (i = 0; i < T.emitterEventListeners[e].length; i++) T.emitterEventListeners[e][i] === t && T.emitterEventListeners[e].splice(i, 1);
                        return T
                    }
                }, T.once = function (e, t) {
                    e = h(e);
                    var i = function () {
                        t(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), T.off(e, i)
                    };
                    return T.on(e, i), T
                }, T.a11y = {
                    makeFocusable: function (e) {
                        return e.attr("tabIndex", "0"), e
                    },
                    addRole: function (e, t) {
                        return e.attr("role", t), e
                    },
                    addLabel: function (e, t) {
                        return e.attr("aria-label", t), e
                    },
                    disable: function (e) {
                        return e.attr("aria-disabled", !0), e
                    },
                    enable: function (e) {
                        return e.attr("aria-disabled", !1), e
                    },
                    onEnterKey: function (t) {
                        13 === t.keyCode && (e(t.target).is(T.params.nextButton) ? (T.onClickNext(t), T.isEnd ? T.a11y.notify(T.params.lastSlideMessage) : T.a11y.notify(T.params.nextSlideMessage)) : e(t.target).is(T.params.prevButton) && (T.onClickPrev(t), T.isBeginning ? T.a11y.notify(T.params.firstSlideMessage) : T.a11y.notify(T.params.prevSlideMessage)), e(t.target).is("." + T.params.bulletClass) && e(t.target)[0].click())
                    },
                    liveRegion: e('<span class="' + T.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
                    notify: function (e) {
                        var t = T.a11y.liveRegion;
                        0 !== t.length && (t.html(""), t.html(e))
                    },
                    init: function () {
                        T.params.nextButton && T.nextButton && T.nextButton.length > 0 && (T.a11y.makeFocusable(T.nextButton), T.a11y.addRole(T.nextButton, "button"), T.a11y.addLabel(T.nextButton, T.params.nextSlideMessage)), T.params.prevButton && T.prevButton && T.prevButton.length > 0 && (T.a11y.makeFocusable(T.prevButton), T.a11y.addRole(T.prevButton, "button"), T.a11y.addLabel(T.prevButton, T.params.prevSlideMessage)), e(T.container).append(T.a11y.liveRegion)
                    },
                    initPagination: function () {
                        T.params.pagination && T.params.paginationClickable && T.bullets && T.bullets.length && T.bullets.each(function () {
                            var t = e(this);
                            T.a11y.makeFocusable(t), T.a11y.addRole(t, "button"), T.a11y.addLabel(t, T.params.paginationBulletMessage.replace(/{{index}}/, t.index() + 1))
                        })
                    },
                    destroy: function () {
                        T.a11y.liveRegion && T.a11y.liveRegion.length > 0 && T.a11y.liveRegion.remove()
                    }
                }, T.init = function () {
                    T.params.loop && T.createLoop(), T.updateContainerSize(), T.updateSlidesSize(), T.updatePagination(), T.params.scrollbar && T.scrollbar && (T.scrollbar.set(), T.params.scrollbarDraggable && T.scrollbar.enableDraggable()), "slide" !== T.params.effect && T.effects[T.params.effect] && (T.params.loop || T.updateProgress(), T.effects[T.params.effect].setTranslate()), T.params.loop ? T.slideTo(T.params.initialSlide + T.loopedSlides, 0, T.params.runCallbacksOnInit) : (T.slideTo(T.params.initialSlide, 0, T.params.runCallbacksOnInit), 0 === T.params.initialSlide && (T.parallax && T.params.parallax && T.parallax.setTranslate(), T.lazy && T.params.lazyLoading && (T.lazy.load(), T.lazy.initialImageLoaded = !0))), T.attachEvents(), T.params.observer && T.support.observer && T.initObservers(), T.params.preloadImages && !T.params.lazyLoading && T.preloadImages(), T.params.zoom && T.zoom && T.zoom.init(), T.params.autoplay && T.startAutoplay(), T.params.keyboardControl && T.enableKeyboardControl && T.enableKeyboardControl(), T.params.mousewheelControl && T.enableMousewheelControl && T.enableMousewheelControl(), T.params.hashnavReplaceState && (T.params.replaceState = T.params.hashnavReplaceState), T.params.history && T.history && T.history.init(), T.params.hashnav && T.hashnav && T.hashnav.init(), T.params.a11y && T.a11y && T.a11y.init(), T.emit("onInit", T)
                }, T.cleanupStyles = function () {
                    T.container.removeClass(T.classNames.join(" ")).removeAttr("style"), T.wrapper.removeAttr("style"), T.slides && T.slides.length && T.slides.removeClass([T.params.slideVisibleClass, T.params.slideActiveClass, T.params.slideNextClass, T.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), T.paginationContainer && T.paginationContainer.length && T.paginationContainer.removeClass(T.params.paginationHiddenClass), T.bullets && T.bullets.length && T.bullets.removeClass(T.params.bulletActiveClass), T.params.prevButton && e(T.params.prevButton).removeClass(T.params.buttonDisabledClass), T.params.nextButton && e(T.params.nextButton).removeClass(T.params.buttonDisabledClass), T.params.scrollbar && T.scrollbar && (T.scrollbar.track && T.scrollbar.track.length && T.scrollbar.track.removeAttr("style"), T.scrollbar.drag && T.scrollbar.drag.length && T.scrollbar.drag.removeAttr("style"))
                }, T.destroy = function (e, t) {
                    T.detachEvents(), T.stopAutoplay(), T.params.scrollbar && T.scrollbar && T.params.scrollbarDraggable && T.scrollbar.disableDraggable(), T.params.loop && T.destroyLoop(), t && T.cleanupStyles(), T.disconnectObservers(), T.params.zoom && T.zoom && T.zoom.destroy(), T.params.keyboardControl && T.disableKeyboardControl && T.disableKeyboardControl(), T.params.mousewheelControl && T.disableMousewheelControl && T.disableMousewheelControl(), T.params.a11y && T.a11y && T.a11y.destroy(), T.params.history && !T.params.replaceState && window.removeEventListener("popstate", T.history.setHistoryPopState), T.params.hashnav && T.hashnav && T.hashnav.destroy(), T.emit("onDestroy"), !1 !== e && (T = null)
                }, T.init(), T
            }
        };
        t.prototype = {
            isSafari: function () {
                var e = window.navigator.userAgent.toLowerCase();
                return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
            }(),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
            isArray: function (e) {
                return "[object Array]" === Object.prototype.toString.apply(e)
            },
            browser: {
                ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
                ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
                lteIE9: function () {
                    var e = document.createElement("div");
                    return e.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e", 1 === e.getElementsByTagName("i").length
                }()
            },
            device: function () {
                var e = window.navigator.userAgent, t = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                    i = e.match(/(iPad).*OS\s([\d_]+)/), n = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                    s = !i && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
                return {ios: i || s || n, android: t}
            }(),
            support: {
                touch: window.Modernizr && !0 === Modernizr.touch || !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch),
                transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d || function () {
                    var e = document.createElement("div").style;
                    return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
                }(),
                flexbox: function () {
                    for (var e = document.createElement("div").style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i++) if (t[i] in e) return !0
                }(),
                observer: "MutationObserver" in window || "WebkitMutationObserver" in window,
                passiveListener: function () {
                    var e = !1;
                    try {
                        var t = Object.defineProperty({}, "passive", {
                            get: function () {
                                e = !0
                            }
                        });
                        window.addEventListener("testPassiveListener", null, t)
                    } catch (e) {
                    }
                    return e
                }(),
                gestures: "ongesturestart" in window
            },
            plugins: {}
        };
        for (var i = (function () {
            var e = function (e) {
                var t = this, i = 0;
                for (i = 0; i < e.length; i++) t[i] = e[i];
                return t.length = e.length, this
            }, t = function (t, i) {
                var n = [], s = 0;
                if (t && !i && t instanceof e) return t;
                if (t) if ("string" == typeof t) {
                    var r, a, o = t.trim();
                    if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                        var l = "div";
                        for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), 0 !== o.indexOf("<td") && 0 !== o.indexOf("<th") || (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), (a = document.createElement(l)).innerHTML = t, s = 0; s < a.childNodes.length; s++) n.push(a.childNodes[s])
                    } else for (r = i || "#" !== t[0] || t.match(/[ .<>:~]/) ? (i || document).querySelectorAll(t) : [document.getElementById(t.split("#")[1])], s = 0; s < r.length; s++) r[s] && n.push(r[s])
                } else if (t.nodeType || t === window || t === document) n.push(t); else if (t.length > 0 && t[0].nodeType) for (s = 0; s < t.length; s++) n.push(t[s]);
                return new e(n)
            };
            return e.prototype = {
                addClass: function (e) {
                    if (void 0 === e) return this;
                    for (var t = e.split(" "), i = 0; i < t.length; i++) for (var n = 0; n < this.length; n++) this[n].classList.add(t[i]);
                    return this
                }, removeClass: function (e) {
                    for (var t = e.split(" "), i = 0; i < t.length; i++) for (var n = 0; n < this.length; n++) this[n].classList.remove(t[i]);
                    return this
                }, hasClass: function (e) {
                    return !!this[0] && this[0].classList.contains(e)
                }, toggleClass: function (e) {
                    for (var t = e.split(" "), i = 0; i < t.length; i++) for (var n = 0; n < this.length; n++) this[n].classList.toggle(t[i]);
                    return this
                }, attr: function (e, t) {
                    if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                    for (var i = 0; i < this.length; i++) if (2 === arguments.length) this[i].setAttribute(e, t); else for (var n in e) this[i][n] = e[n], this[i].setAttribute(n, e[n]);
                    return this
                }, removeAttr: function (e) {
                    for (var t = 0; t < this.length; t++) this[t].removeAttribute(e);
                    return this
                }, data: function (e, t) {
                    if (void 0 !== t) {
                        for (var i = 0; i < this.length; i++) {
                            var n = this[i];
                            n.dom7ElementDataStorage || (n.dom7ElementDataStorage = {}), n.dom7ElementDataStorage[e] = t
                        }
                        return this
                    }
                    if (this[0]) {
                        var s = this[0].getAttribute("data-" + e);
                        return s || (this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0)
                    }
                }, transform: function (e) {
                    for (var t = 0; t < this.length; t++) {
                        var i = this[t].style;
                        i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
                    }
                    return this
                }, transition: function (e) {
                    "string" != typeof e && (e += "ms");
                    for (var t = 0; t < this.length; t++) {
                        var i = this[t].style;
                        i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e
                    }
                    return this
                }, on: function (e, i, n, s) {
                    function r(e) {
                        var s = e.target;
                        if (t(s).is(i)) n.call(s, e); else for (var r = t(s).parents(), a = 0; a < r.length; a++) t(r[a]).is(i) && n.call(r[a], e)
                    }

                    var a, o, l = e.split(" ");
                    for (a = 0; a < this.length; a++) if ("function" == typeof i || !1 === i) for ("function" == typeof i && (n = arguments[1], s = arguments[2] || !1), o = 0; o < l.length; o++) this[a].addEventListener(l[o], n, s); else for (o = 0; o < l.length; o++) this[a].dom7LiveListeners || (this[a].dom7LiveListeners = []), this[a].dom7LiveListeners.push({
                        listener: n,
                        liveListener: r
                    }), this[a].addEventListener(l[o], r, s);
                    return this
                }, off: function (e, t, i, n) {
                    for (var s = e.split(" "), r = 0; r < s.length; r++) for (var a = 0; a < this.length; a++) if ("function" == typeof t || !1 === t) "function" == typeof t && (i = arguments[1], n = arguments[2] || !1), this[a].removeEventListener(s[r], i, n); else if (this[a].dom7LiveListeners) for (var o = 0; o < this[a].dom7LiveListeners.length; o++) this[a].dom7LiveListeners[o].listener === i && this[a].removeEventListener(s[r], this[a].dom7LiveListeners[o].liveListener, n);
                    return this
                }, once: function (e, t, i, n) {
                    function s(a) {
                        i(a), r.off(e, t, s, n)
                    }

                    var r = this;
                    "function" == typeof t && (t = !1, i = arguments[1], n = arguments[2]), r.on(e, t, s, n)
                }, trigger: function (e, t) {
                    for (var i = 0; i < this.length; i++) {
                        var n;
                        try {
                            n = new window.CustomEvent(e, {detail: t, bubbles: !0, cancelable: !0})
                        } catch (i) {
                            (n = document.createEvent("Event")).initEvent(e, !0, !0), n.detail = t
                        }
                        this[i].dispatchEvent(n)
                    }
                    return this
                }, transitionEnd: function (e) {
                    function t(r) {
                        if (r.target === this) for (e.call(this, r), i = 0; i < n.length; i++) s.off(n[i], t)
                    }

                    var i,
                        n = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                        s = this;
                    if (e) for (i = 0; i < n.length; i++) s.on(n[i], t);
                    return this
                }, width: function () {
                    return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
                }, outerWidth: function (e) {
                    return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
                }, height: function () {
                    return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
                }, outerHeight: function (e) {
                    return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
                }, offset: function () {
                    if (this.length > 0) {
                        var e = this[0], t = e.getBoundingClientRect(), i = document.body,
                            n = e.clientTop || i.clientTop || 0, s = e.clientLeft || i.clientLeft || 0,
                            r = window.pageYOffset || e.scrollTop, a = window.pageXOffset || e.scrollLeft;
                        return {top: t.top + r - n, left: t.left + a - s}
                    }
                    return null
                }, css: function (e, t) {
                    var i;
                    if (1 === arguments.length) {
                        if ("string" != typeof e) {
                            for (i = 0; i < this.length; i++) for (var n in e) this[i].style[n] = e[n];
                            return this
                        }
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
                    }
                    if (2 === arguments.length && "string" == typeof e) {
                        for (i = 0; i < this.length; i++) this[i].style[e] = t;
                        return this
                    }
                    return this
                }, each: function (e) {
                    for (var t = 0; t < this.length; t++) e.call(this[t], t, this[t]);
                    return this
                }, html: function (e) {
                    if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
                    for (var t = 0; t < this.length; t++) this[t].innerHTML = e;
                    return this
                }, text: function (e) {
                    if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
                    for (var t = 0; t < this.length; t++) this[t].textContent = e;
                    return this
                }, is: function (i) {
                    if (!this[0]) return !1;
                    var n, s;
                    if ("string" == typeof i) {
                        var r = this[0];
                        if (r === document) return i === document;
                        if (r === window) return i === window;
                        if (r.matches) return r.matches(i);
                        if (r.webkitMatchesSelector) return r.webkitMatchesSelector(i);
                        if (r.mozMatchesSelector) return r.mozMatchesSelector(i);
                        if (r.msMatchesSelector) return r.msMatchesSelector(i);
                        for (n = t(i), s = 0; s < n.length; s++) if (n[s] === this[0]) return !0;
                        return !1
                    }
                    if (i === document) return this[0] === document;
                    if (i === window) return this[0] === window;
                    if (i.nodeType || i instanceof e) {
                        for (n = i.nodeType ? [i] : i, s = 0; s < n.length; s++) if (n[s] === this[0]) return !0;
                        return !1
                    }
                    return !1
                }, index: function () {
                    if (this[0]) {
                        for (var e = this[0], t = 0; null !== (e = e.previousSibling);) 1 === e.nodeType && t++;
                        return t
                    }
                }, eq: function (t) {
                    if (void 0 === t) return this;
                    var i, n = this.length;
                    return t > n - 1 ? new e([]) : t < 0 ? (i = n + t, new e(i < 0 ? [] : [this[i]])) : new e([this[t]])
                }, append: function (t) {
                    var i, n;
                    for (i = 0; i < this.length; i++) if ("string" == typeof t) {
                        var s = document.createElement("div");
                        for (s.innerHTML = t; s.firstChild;) this[i].appendChild(s.firstChild)
                    } else if (t instanceof e) for (n = 0; n < t.length; n++) this[i].appendChild(t[n]); else this[i].appendChild(t);
                    return this
                }, prepend: function (t) {
                    var i, n;
                    for (i = 0; i < this.length; i++) if ("string" == typeof t) {
                        var s = document.createElement("div");
                        for (s.innerHTML = t, n = s.childNodes.length - 1; n >= 0; n--) this[i].insertBefore(s.childNodes[n], this[i].childNodes[0])
                    } else if (t instanceof e) for (n = 0; n < t.length; n++) this[i].insertBefore(t[n], this[i].childNodes[0]); else this[i].insertBefore(t, this[i].childNodes[0]);
                    return this
                }, insertBefore: function (e) {
                    for (var i = t(e), n = 0; n < this.length; n++) if (1 === i.length) i[0].parentNode.insertBefore(this[n], i[0]); else if (i.length > 1) for (var s = 0; s < i.length; s++) i[s].parentNode.insertBefore(this[n].cloneNode(!0), i[s])
                }, insertAfter: function (e) {
                    for (var i = t(e), n = 0; n < this.length; n++) if (1 === i.length) i[0].parentNode.insertBefore(this[n], i[0].nextSibling); else if (i.length > 1) for (var s = 0; s < i.length; s++) i[s].parentNode.insertBefore(this[n].cloneNode(!0), i[s].nextSibling)
                }, next: function (i) {
                    return new e(this.length > 0 ? i ? this[0].nextElementSibling && t(this[0].nextElementSibling).is(i) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
                }, nextAll: function (i) {
                    var n = [], s = this[0];
                    if (!s) return new e([]);
                    for (; s.nextElementSibling;) {
                        var r = s.nextElementSibling;
                        i ? t(r).is(i) && n.push(r) : n.push(r), s = r
                    }
                    return new e(n)
                }, prev: function (i) {
                    return new e(this.length > 0 ? i ? this[0].previousElementSibling && t(this[0].previousElementSibling).is(i) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
                }, prevAll: function (i) {
                    var n = [], s = this[0];
                    if (!s) return new e([]);
                    for (; s.previousElementSibling;) {
                        var r = s.previousElementSibling;
                        i ? t(r).is(i) && n.push(r) : n.push(r), s = r
                    }
                    return new e(n)
                }, parent: function (e) {
                    for (var i = [], n = 0; n < this.length; n++) e ? t(this[n].parentNode).is(e) && i.push(this[n].parentNode) : i.push(this[n].parentNode);
                    return t(t.unique(i))
                }, parents: function (e) {
                    for (var i = [], n = 0; n < this.length; n++) for (var s = this[n].parentNode; s;) e ? t(s).is(e) && i.push(s) : i.push(s), s = s.parentNode;
                    return t(t.unique(i))
                }, find: function (t) {
                    for (var i = [], n = 0; n < this.length; n++) for (var s = this[n].querySelectorAll(t), r = 0; r < s.length; r++) i.push(s[r]);
                    return new e(i)
                }, children: function (i) {
                    for (var n = [], s = 0; s < this.length; s++) for (var r = this[s].childNodes, a = 0; a < r.length; a++) i ? 1 === r[a].nodeType && t(r[a]).is(i) && n.push(r[a]) : 1 === r[a].nodeType && n.push(r[a]);
                    return new e(t.unique(n))
                }, remove: function () {
                    for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                    return this
                }, add: function () {
                    var e, i, n = this;
                    for (e = 0; e < arguments.length; e++) {
                        var s = t(arguments[e]);
                        for (i = 0; i < s.length; i++) n[n.length] = s[i], n.length++
                    }
                    return n
                }
            }, t.fn = e.prototype, t.unique = function (e) {
                for (var t = [], i = 0; i < e.length; i++) -1 === t.indexOf(e[i]) && t.push(e[i]);
                return t
            }, t
        }()), n = ["jQuery", "Zepto", "Dom7"], s = 0; s < n.length; s++) window[n[s]] && function (e) {
            e.fn.swiper = function (i) {
                var n;
                return e(this).each(function () {
                    var e = new t(this, i);
                    n || (n = e)
                }), n
            }
        }(window[n[s]]);
        var r;
        (r = void 0 === i ? window.Dom7 || window.Zepto || window.jQuery : i) && ("transitionEnd" in r.fn || (r.fn.transitionEnd = function (e) {
            function t(r) {
                if (r.target === this) for (e.call(this, r), i = 0; i < n.length; i++) s.off(n[i], t)
            }

            var i, n = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                s = this;
            if (e) for (i = 0; i < n.length; i++) s.on(n[i], t);
            return this
        }), "transform" in r.fn || (r.fn.transform = function (e) {
            for (var t = 0; t < this.length; t++) {
                var i = this[t].style;
                i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
            }
            return this
        }), "transition" in r.fn || (r.fn.transition = function (e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t++) {
                var i = this[t].style;
                i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e
            }
            return this
        }), "outerWidth" in r.fn || (r.fn.outerWidth = function (e) {
            return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
        })), window.Swiper = t
    }(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function () {
        "use strict";
        return window.Swiper
    }), function (e, t) {
        function i(e) {
            return "string" == typeof e
        }

        function n(e) {
            var t = w.call(arguments, 1);
            return function () {
                return e.apply(this, t.concat(w.call(arguments)))
            }
        }

        function s(t, n, s, r, a) {
            var u, d, p, h, f;
            return r !== o ? (f = (p = s.match(t ? g : /^([^#?]*)\??([^#]*)(#?.*)/))[3] || "", 2 === a && i(r) ? d = r.replace(t ? m : A, "") : (h = c(p[2]), r = i(r) ? c[t ? k : P](r) : r, d = 2 === a ? r : 1 === a ? e.extend({}, r, h) : e.extend({}, h, r), d = l(d), t && (d = d.replace(v, T))), u = p[1] + (t ? b : d || !p[1] ? "?" : "") + d + f) : u = n(s !== o ? s : location.href), u
        }

        function r(e, t, n) {
            return t === o || "boolean" == typeof t ? (n = t, t = x[e ? k : P]()) : t = i(t) ? t.replace(e ? m : A, "") : t, c(t, n)
        }

        function a(t, n, s, r) {
            return i(s) || "object" == typeof s || (r = s, s = n, n = o), this.each(function () {
                var i = e(this), a = n || f()[(this.nodeName || "").toLowerCase()] || "", o = a && i.attr(a) || "";
                i.attr(a, x[t](o, s, r))
            })
        }

        var o, l, u, c, d, p, h, f, m, g, v, y, b, w = Array.prototype.slice, T = decodeURIComponent, x = e.param,
            _ = e.bbq = e.bbq || {}, C = e.event.special, S = "hashchange", P = "querystring", k = "fragment",
            I = "elemUrlAttr", E = "href", j = "src", A = /^.*\?|#.*$/g, M = {};
        x[P] = n(s, 0, function (e) {
            return e.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
        }), x[k] = u = n(s, 1, function (e) {
            return e.replace(g, "$2")
        }), x.sorted = l = function (t, i) {
            var n = [], s = {};
            return e.each(x(t, i).split("&"), function (e, t) {
                var i = t.replace(/(?:%5B|=).*$/, ""), r = s[i];
                r || (r = s[i] = [], n.push(i)), r.push(t)
            }), e.map(n.sort(), function (e) {
                return s[e]
            }).join("&")
        }, u.noEscape = function (t) {
            t = t || "";
            var i = e.map(t.split(""), encodeURIComponent);
            v = new RegExp(i.join("|"), "g")
        }, u.noEscape(",/"), u.ajaxCrawlable = function (e) {
            return e !== o && (e ? (m = /^.*(?:#!|#)/, g = /^([^#]*)(?:#!|#)?(.*)$/, b = "#!") : (m = /^.*#/, g = /^([^#]*)#?(.*)$/, b = "#"), y = !!e), y
        }, u.ajaxCrawlable(0), e.deparam = c = function (t, i) {
            var n = {}, s = {true: !0, false: !1, null: null};
            return e.each(t.replace(/\+/g, " ").split("&"), function (t, r) {
                var a, l = r.split("="), u = T(l[0]), c = n, d = 0, p = u.split("]["), h = p.length - 1;
                if (/\[/.test(p[0]) && /\]$/.test(p[h]) ? (p[h] = p[h].replace(/\]$/, ""), h = (p = p.shift().split("[").concat(p)).length - 1) : h = 0, 2 === l.length) if (a = T(l[1]), i && (a = a && !isNaN(a) ? +a : "undefined" === a ? o : s[a] !== o ? s[a] : a), h) for (; d <= h; d++) c = c[u = "" === p[d] ? c.length : p[d]] = d < h ? c[u] || (p[d + 1] && isNaN(p[d + 1]) ? {} : []) : a; else e.isArray(n[u]) ? n[u].push(a) : n[u] !== o ? n[u] = [n[u], a] : n[u] = a; else u && (n[u] = i ? o : "")
            }), n
        }, c[P] = n(r, 0), c[k] = d = n(r, 1), e[I] || (e[I] = function (t) {
            return e.extend(M, t)
        })({
            a: E,
            base: E,
            iframe: j,
            img: j,
            input: j,
            form: "action",
            link: E,
            script: j
        }), f = e[I], e.fn[P] = n(a, P), e.fn[k] = n(a, k), _.pushState = p = function (e, t) {
            i(e) && /^#/.test(e) && t === o && (t = 2);
            var n = e !== o, s = u(location.href, n ? e : {}, n ? t : 2);
            location.href = s
        }, _.getState = h = function (e, t) {
            return e === o || "boolean" == typeof e ? d(e) : d(t)[e]
        }, _.removeState = function (t) {
            var i = {};
            t !== o && (i = h(), e.each(e.isArray(t) ? t : arguments, function (e, t) {
                delete i[t]
            })), p(i, 2)
        }, C[S] = e.extend(C[S], {
            add: function (t) {
                function i(e) {
                    var t = e[k] = u();
                    e.getState = function (e, i) {
                        return e === o || "boolean" == typeof e ? c(t, e) : c(t, i)[e]
                    }, n.apply(this, arguments)
                }

                var n;
                if (e.isFunction(t)) return n = t, i;
                n = t.handler, t.handler = i
            }
        })
    }(jQuery), function (e, t, i) {
        "$:nomunge";

        function n(e) {
            return "#" + (e = e || location.href).replace(/^[^#]*#?(.*)$/, "$1")
        }

        var s, r = "hashchange", a = document, o = e.event.special, l = a.documentMode,
            u = "on" + r in t && (l === i || l > 7);
        e.fn[r] = function (e) {
            return e ? this.bind(r, e) : this.trigger(r)
        }, e.fn[r].delay = 50, o[r] = e.extend(o[r], {
            setup: function () {
                if (u) return !1;
                e(s.start)
            }, teardown: function () {
                if (u) return !1;
                e(s.stop)
            }
        }), s = function () {
            function s() {
                var i = n(), a = h(c);
                i !== c ? (p(c = i, a), e(t).trigger(r)) : a !== c && (location.href = location.href.replace(/#.*/, "") + a), o = setTimeout(s, e.fn[r].delay)
            }

            var o, l = {}, c = n(), d = function (e) {
                return e
            }, p = d, h = d;
            return l.start = function () {
                o || s()
            }, l.stop = function () {
                o && clearTimeout(o), o = i
            }, "Microsoft Internet Explorer" === navigator.appName && !u && function () {
                var t, i;
                l.start = function () {
                    t || (i = e.fn[r].src, i = i && i + n(), t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
                        i || p(n()), s()
                    }).attr("src", i || "javascript:0").insertAfter("body")[0].contentWindow, a.onpropertychange = function () {
                        try {
                            "title" === event.propertyName && (t.document.title = a.title)
                        } catch (e) {
                        }
                    })
                }, l.stop = d, h = function () {
                    return n(t.location.href)
                }, p = function (i, n) {
                    var s = t.document, o = e.fn[r].domain;
                    i !== n && (s.title = a.title, s.open(), o && s.write('<script>document.domain="' + o + '"<\/script>'), s.close(), t.location.hash = i)
                }
            }(), l
        }()
    }(jQuery, this), function (e) {
        e.fn.scwStickySidebar = function (t) {
            function i(t, i) {
                return !0 === t.initialized || !(e("body").width() < t.minWidth) && (n(t, i), !0)
            }

            function n(t, i) {
                t.initialized = !0, e("head").append(e('<style>.sticky-sidebar:after {content: ""; display: table; clear: both;}</style>')), i.each(function () {
                    function i() {
                        r.fixedScrollTop = 0, r.sidebar.css({"min-height": "1px"}), r.stickySidebar.css({
                            position: "static",
                            width: "",
                            transform: "none"
                        })
                    }

                    function n(t) {
                        var i = t.height();
                        return t.children().each(function () {
                            i = Math.max(i, e(this).height())
                        }), i
                    }

                    var r = {};
                    if (r.sidebar = e(this), r.options = t || {}, r.container = e(r.options.containerSelector), 0 == r.container.length && (r.container = r.sidebar.parent()), r.sidebar.parents().css("-webkit-transform", "none"), r.sidebar.css({
                            position: "relative",
                            overflow: "visible",
                            "-webkit-box-sizing": "border-box",
                            "-moz-box-sizing": "border-box",
                            "box-sizing": "border-box"
                        }), r.stickySidebar = r.sidebar.find(".sticky-sidebar"), 0 == r.stickySidebar.length) {
                        var a = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                        r.sidebar.find("script").filter(function (e, t) {
                            return 0 === t.type.length || t.type.match(a)
                        }).remove(), r.stickySidebar = e("<div>").addClass("sticky-sidebar").append(r.sidebar.children()), r.sidebar.append(r.stickySidebar)
                    }
                    r.marginBottom = parseInt(r.sidebar.css("margin-bottom")), r.paddingTop = parseInt(r.sidebar.css("padding-top")), r.paddingBottom = parseInt(r.sidebar.css("padding-bottom"));
                    var o = r.stickySidebar.offset().top, l = r.stickySidebar.outerHeight();
                    r.stickySidebar.css("padding-top", 1), r.stickySidebar.css("padding-bottom", 1), o -= r.stickySidebar.offset().top, l = r.stickySidebar.outerHeight() - l - o, 0 == o ? (r.stickySidebar.css("padding-top", 0), r.stickySidebarPaddingTop = 0) : r.stickySidebarPaddingTop = 1, 0 == l ? (r.stickySidebar.css("padding-bottom", 0), r.stickySidebarPaddingBottom = 0) : r.stickySidebarPaddingBottom = 1, r.previousScrollTop = null, r.fixedScrollTop = 0, i(), r.onScroll = function (r) {
                        if (r.stickySidebar.is(":visible")) {
                            if (e("body").width() < r.options.minWidth) return void i();
                            if (r.options.disableOnResponsiveLayouts && r.sidebar.outerWidth("none" == r.sidebar.css("float")) + 50 > r.container.width()) return void i();
                            var a = e(document).scrollTop(), o = "static";
                            if (a >= r.sidebar.offset().top + (r.paddingTop - r.options.additionalMarginTop)) {
                                var l, u = r.paddingTop + t.additionalMarginTop,
                                    c = r.paddingBottom + r.marginBottom + t.additionalMarginBottom,
                                    d = r.sidebar.offset().top, p = r.sidebar.offset().top + n(r.container),
                                    h = 0 + t.additionalMarginTop;
                                l = r.stickySidebar.outerHeight() + u + c < e(window).height() ? h + r.stickySidebar.outerHeight() : e(window).height() - r.marginBottom - r.paddingBottom - t.additionalMarginBottom;
                                var f = d - a + r.paddingTop, m = p - a - r.paddingBottom - r.marginBottom,
                                    g = r.stickySidebar.offset().top - a, v = r.previousScrollTop - a;
                                "fixed" == r.stickySidebar.css("position") && "modern" == r.options.sidebarBehavior && (g += v), "stick-to-top" == r.options.sidebarBehavior && (g = t.additionalMarginTop), "stick-to-bottom" == r.options.sidebarBehavior && (g = l - r.stickySidebar.outerHeight()), g = v > 0 ? Math.min(g, h) : Math.max(g, l - r.stickySidebar.outerHeight()), g = Math.max(g, f), g = Math.min(g, m - r.stickySidebar.outerHeight());
                                var y = r.container.height() == r.stickySidebar.outerHeight();
                                o = !y && g == h || !y && g == l - r.stickySidebar.outerHeight() ? "fixed" : a + g - r.sidebar.offset().top - r.paddingTop <= t.additionalMarginTop ? "static" : "absolute"
                            }
                            if ("fixed" == o) {
                                var b = e(document).scrollLeft();
                                r.stickySidebar.css({
                                    position: "fixed",
                                    width: s(r.stickySidebar) + "px",
                                    transform: "translateY(" + g + "px)",
                                    left: r.sidebar.offset().left + parseInt(r.sidebar.css("padding-left")) - b + "px",
                                    top: "0px"
                                })
                            } else if ("absolute" == o) {
                                var w = {};
                                "absolute" != r.stickySidebar.css("position") && (w.position = "absolute", w.transform = "translateY(" + (a + g - r.sidebar.offset().top - r.stickySidebarPaddingTop - r.stickySidebarPaddingBottom) + "px)", w.top = "0px"), w.width = s(r.stickySidebar) + "px", w.left = "", r.stickySidebar.css(w)
                            } else "static" == o && i();
                            "static" != o && 1 == r.options.updateSidebarHeight && r.sidebar.css({"min-height": r.stickySidebar.outerHeight() + r.stickySidebar.offset().top - r.sidebar.offset().top + r.paddingBottom}), r.previousScrollTop = a
                        }
                    }, r.onScroll(r), e(document).scroll(function (e) {
                        return function () {
                            e.onScroll(e)
                        }
                    }(r)), e(window).resize(function (e) {
                        return function () {
                            e.stickySidebar.css({position: "static"}), e.onScroll(e)
                        }
                    }(r)), "undefined" != typeof ResizeSensor && new ResizeSensor(r.stickySidebar[0], function (e) {
                        return function () {
                            e.onScroll(e)
                        }
                    }(r))
                })
            }

            function s(e) {
                var t;
                try {
                    t = e[0].getBoundingClientRect().width
                } catch (e) {
                }
                return void 0 === t && (t = e.width()), t
            }

            var r = {
                containerSelector: "",
                additionalMarginTop: 0,
                additionalMarginBottom: 0,
                updateSidebarHeight: !0,
                minWidth: 0,
                disableOnResponsiveLayouts: !0,
                sidebarBehavior: "modern"
            };
            (t = e.extend(r, t)).additionalMarginTop = parseInt(t.additionalMarginTop) || 0, t.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0, function (t, n) {
                i(t, n) || (console.log("TSS: Body width smaller than options.minWidth. Init is delayed."), e(document).scroll(function (t, n) {
                    return function (s) {
                        i(t, n) && e(this).unbind(s)
                    }
                }(t, n)), e(window).resize(function (t, n) {
                    return function (s) {
                        i(t, n) && e(this).unbind(s)
                    }
                }(t, n)))
            }(t, this)
        }
    }(jQuery), function () {
        var e = function (t, i) {
            function n() {
                this.q = [], this.add = function (e) {
                    this.q.push(e)
                };
                var e, t;
                this.call = function () {
                    for (e = 0, t = this.q.length; e < t; e++) this.q[e].call()
                }
            }

            function s(e, t) {
                return e.currentStyle ? e.currentStyle[t] : window.getComputedStyle ? window.getComputedStyle(e, null).getPropertyValue(t) : e.style[t]
            }

            function r(e, t) {
                if (e.resizedAttached) {
                    if (e.resizedAttached) return void e.resizedAttached.add(t)
                } else e.resizedAttached = new n, e.resizedAttached.add(t);
                e.resizeSensor = document.createElement("div"), e.resizeSensor.className = "resize-sensor";
                var i = "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;",
                    r = "position: absolute; left: 0; top: 0; transition: 0s;";
                e.resizeSensor.style.cssText = i, e.resizeSensor.innerHTML = '<div class="resize-sensor-expand" style="' + i + '"><div style="' + r + '"></div></div><div class="resize-sensor-shrink" style="' + i + '"><div style="' + r + ' width: 200%; height: 200%"></div></div>', e.appendChild(e.resizeSensor), {
                    fixed: 1,
                    absolute: 1
                }[s(e, "position")] || (e.style.position = "relative");
                var a, o, l = e.resizeSensor.childNodes[0], u = l.childNodes[0], c = e.resizeSensor.childNodes[1],
                    d = (c.childNodes[0], function () {
                        u.style.width = l.offsetWidth + 10 + "px", u.style.height = l.offsetHeight + 10 + "px", l.scrollLeft = l.scrollWidth, l.scrollTop = l.scrollHeight, c.scrollLeft = c.scrollWidth, c.scrollTop = c.scrollHeight, a = e.offsetWidth, o = e.offsetHeight
                    });
                d();
                var p = function () {
                    e.resizedAttached && e.resizedAttached.call()
                }, h = function (e, t, i) {
                    e.attachEvent ? e.attachEvent("on" + t, i) : e.addEventListener(t, i)
                }, f = function () {
                    e.offsetWidth == a && e.offsetHeight == o || p(), d()
                };
                h(l, "scroll", f), h(c, "scroll", f)
            }

            var a = Object.prototype.toString.call(t),
                o = "[object Array]" === a || "[object NodeList]" === a || "[object HTMLCollection]" === a || "undefined" != typeof jQuery && t instanceof jQuery || "undefined" != typeof Elements && t instanceof Elements;
            if (o) for (var l = 0, u = t.length; l < u; l++) r(t[l], i); else r(t, i);
            this.detach = function () {
                if (o) for (var i = 0, n = t.length; i < n; i++) e.detach(t[i]); else e.detach(t)
            }
        };
        e.detach = function (e) {
            e.resizeSensor && (e.removeChild(e.resizeSensor), delete e.resizeSensor, delete e.resizedAttached)
        }, "undefined" != typeof module && void 0 !== module.exports ? module.exports = e : window.ResizeSensor = e
    }(), function (e, t) {
        function i(e, t, i) {
            var n = c[t.type] || {};
            return null == e ? i || !t.def ? null : t.def : (e = n.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : n.mod ? (e + n.mod) % n.mod : 0 > e ? 0 : n.max < e ? n.max : e)
        }

        function n(t) {
            var i = l(), n = i._rgba = [];
            return t = t.toLowerCase(), h(o, function (e, s) {
                var r, a = s.re.exec(t), o = a && s.parse(a), l = s.space || "rgba";
                return o ? (r = i[l](o), i[u[l].cache] = r[u[l].cache], n = i._rgba = r._rgba, !1) : void 0
            }), n.length ? ("0,0,0,0" === n.join() && e.extend(n, r.transparent), i) : r[t]
        }

        function s(e, t, i) {
            return i = (i + 1) % 1, 1 > 6 * i ? e + (t - e) * i * 6 : 1 > 2 * i ? t : 2 > 3 * i ? e + (t - e) * (2 / 3 - i) * 6 : e
        }

        var r, a = /^([\-+])=\s*(\d+\.?\d*)/, o = [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function (e) {
                    return [e[1], e[2], e[3], e[4]]
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function (e) {
                    return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
                }
            }, {
                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function (e) {
                    return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
                }
            }, {
                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function (e) {
                    return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
                }
            }, {
                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                space: "hsla",
                parse: function (e) {
                    return [e[1], e[2] / 100, e[3] / 100, e[4]]
                }
            }], l = e.Color = function (t, i, n, s) {
                return new e.Color.fn.parse(t, i, n, s)
            }, u = {
                rgba: {
                    props: {
                        red: {idx: 0, type: "byte"},
                        green: {idx: 1, type: "byte"},
                        blue: {idx: 2, type: "byte"}
                    }
                },
                hsla: {
                    props: {
                        hue: {idx: 0, type: "degrees"},
                        saturation: {idx: 1, type: "percent"},
                        lightness: {idx: 2, type: "percent"}
                    }
                }
            }, c = {byte: {floor: !0, max: 255}, percent: {max: 1}, degrees: {mod: 360, floor: !0}}, d = l.support = {},
            p = e("<p>")[0], h = e.each;
        p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, h(u, function (e, t) {
            t.cache = "_" + e, t.props.alpha = {idx: 3, type: "percent", def: 1}
        }), l.fn = e.extend(l.prototype, {
            parse: function (s, a, o, c) {
                if (s === t) return this._rgba = [null, null, null, null], this;
                (s.jquery || s.nodeType) && (s = e(s).css(a), a = t);
                var d = this, p = e.type(s), f = this._rgba = [];
                return a !== t && (s = [s, a, o, c], p = "array"), "string" === p ? this.parse(n(s) || r._default) : "array" === p ? (h(u.rgba.props, function (e, t) {
                    f[t.idx] = i(s[t.idx], t)
                }), this) : "object" === p ? (s instanceof l ? h(u, function (e, t) {
                    s[t.cache] && (d[t.cache] = s[t.cache].slice())
                }) : h(u, function (t, n) {
                    var r = n.cache;
                    h(n.props, function (e, t) {
                        if (!d[r] && n.to) {
                            if ("alpha" === e || null == s[e]) return;
                            d[r] = n.to(d._rgba)
                        }
                        d[r][t.idx] = i(s[e], t, !0)
                    }), d[r] && e.inArray(null, d[r].slice(0, 3)) < 0 && (d[r][3] = 1, n.from && (d._rgba = n.from(d[r])))
                }), this) : void 0
            }, is: function (e) {
                var t = l(e), i = !0, n = this;
                return h(u, function (e, s) {
                    var r, a = t[s.cache];
                    return a && (r = n[s.cache] || s.to && s.to(n._rgba) || [], h(s.props, function (e, t) {
                        return null != a[t.idx] ? i = a[t.idx] === r[t.idx] : void 0
                    })), i
                }), i
            }, _space: function () {
                var e = [], t = this;
                return h(u, function (i, n) {
                    t[n.cache] && e.push(i)
                }), e.pop()
            }, transition: function (e, t) {
                var n = l(e), s = n._space(), r = u[s], a = 0 === this.alpha() ? l("transparent") : this,
                    o = a[r.cache] || r.to(a._rgba), d = o.slice();
                return n = n[r.cache], h(r.props, function (e, s) {
                    var r = s.idx, a = o[r], l = n[r], u = c[s.type] || {};
                    null !== l && (null === a ? d[r] = l : (u.mod && (l - a > u.mod / 2 ? a += u.mod : a - l > u.mod / 2 && (a -= u.mod)), d[r] = i((l - a) * t + a, s)))
                }), this[s](d)
            }, blend: function (t) {
                if (1 === this._rgba[3]) return this;
                var i = this._rgba.slice(), n = i.pop(), s = l(t)._rgba;
                return l(e.map(i, function (e, t) {
                    return (1 - n) * s[t] + n * e
                }))
            }, toRgbaString: function () {
                var t = "rgba(", i = e.map(this._rgba, function (e, t) {
                    return null == e ? t > 2 ? 1 : 0 : e
                });
                return 1 === i[3] && (i.pop(), t = "rgb("), t + i.join() + ")"
            }, toHslaString: function () {
                var t = "hsla(", i = e.map(this.hsla(), function (e, t) {
                    return null == e && (e = t > 2 ? 1 : 0), t && 3 > t && (e = Math.round(100 * e) + "%"), e
                });
                return 1 === i[3] && (i.pop(), t = "hsl("), t + i.join() + ")"
            }, toHexString: function (t) {
                var i = this._rgba.slice(), n = i.pop();
                return t && i.push(~~(255 * n)), "#" + e.map(i, function (e) {
                    return e = (e || 0).toString(16), 1 === e.length ? "0" + e : e
                }).join("")
            }, toString: function () {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }
        }), l.fn.parse.prototype = l.fn, u.hsla.to = function (e) {
            if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
            var t, i, n = e[0] / 255, s = e[1] / 255, r = e[2] / 255, a = e[3], o = Math.max(n, s, r),
                l = Math.min(n, s, r), u = o - l, c = o + l, d = .5 * c;
            return t = l === o ? 0 : n === o ? 60 * (s - r) / u + 360 : s === o ? 60 * (r - n) / u + 120 : 60 * (n - s) / u + 240, i = 0 === u ? 0 : .5 >= d ? u / c : u / (2 - c), [Math.round(t) % 360, i, d, null == a ? 1 : a]
        }, u.hsla.from = function (e) {
            if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
            var t = e[0] / 360, i = e[1], n = e[2], r = e[3], a = .5 >= n ? n * (1 + i) : n + i - n * i, o = 2 * n - a;
            return [Math.round(255 * s(o, a, t + 1 / 3)), Math.round(255 * s(o, a, t)), Math.round(255 * s(o, a, t - 1 / 3)), r]
        }, h(u, function (n, s) {
            var r = s.props, o = s.cache, u = s.to, c = s.from;
            l.fn[n] = function (n) {
                if (u && !this[o] && (this[o] = u(this._rgba)), n === t) return this[o].slice();
                var s, a = e.type(n), d = "array" === a || "object" === a ? n : arguments, p = this[o].slice();
                return h(r, function (e, t) {
                    var n = d["object" === a ? e : t.idx];
                    null == n && (n = p[t.idx]), p[t.idx] = i(n, t)
                }), c ? (s = l(c(p)), s[o] = p, s) : l(p)
            }, h(r, function (t, i) {
                l.fn[t] || (l.fn[t] = function (s) {
                    var r, o = e.type(s), l = "alpha" === t ? this._hsla ? "hsla" : "rgba" : n, u = this[l](),
                        c = u[i.idx];
                    return "undefined" === o ? c : ("function" === o && (s = s.call(this, c), o = e.type(s)), null == s && i.empty ? this : ("string" === o && (r = a.exec(s)) && (s = c + parseFloat(r[2]) * ("+" === r[1] ? 1 : -1)), u[i.idx] = s, this[l](u)))
                })
            })
        }), l.hook = function (t) {
            var i = t.split(" ");
            h(i, function (t, i) {
                e.cssHooks[i] = {
                    set: function (t, s) {
                        var r, a, o = "";
                        if ("transparent" !== s && ("string" !== e.type(s) || (r = n(s)))) {
                            if (s = l(r || s), !d.rgba && 1 !== s._rgba[3]) {
                                for (a = "backgroundColor" === i ? t.parentNode : t; ("" === o || "transparent" === o) && a && a.style;) try {
                                    o = e.css(a, "backgroundColor"), a = a.parentNode
                                } catch (e) {
                                }
                                s = s.blend(o && "transparent" !== o ? o : "_default")
                            }
                            s = s.toRgbaString()
                        }
                        try {
                            t.style[i] = s
                        } catch (e) {
                        }
                    }
                }, e.fx.step[i] = function (t) {
                    t.colorInit || (t.start = l(t.elem, i), t.end = l(t.end), t.colorInit = !0), e.cssHooks[i].set(t.elem, t.start.transition(t.end, t.pos))
                }
            })
        }, l.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"), e.cssHooks.borderColor = {
            expand: function (e) {
                var t = {};
                return h(["Top", "Right", "Bottom", "Left"], function (i, n) {
                    t["border" + n + "Color"] = e
                }), t
            }
        }, r = e.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }(jQuery), function (e) {
        e(["jquery"], function (e) {
            return function () {
                function t(t, i) {
                    return t || (t = l()), c = e("#" + t.containerId), c.length ? c : (i && (c = s(t)), c)
                }

                function i(t) {
                    for (var i = c.children(), s = i.length - 1; s >= 0; s--) n(e(i[s]), t)
                }

                function n(t, i, n) {
                    var s = !(!n || !n.force) && n.force;
                    return !(!t || !s && 0 !== e(":focus", t).length || (t[i.hideMethod]({
                        duration: i.hideDuration,
                        easing: i.hideEasing,
                        complete: function () {
                            u(t)
                        }
                    }), 0))
                }

                function s(t) {
                    return (c = e("<div/>").attr("id", t.containerId).addClass(t.positionClass)).appendTo(e(t.target)), c
                }

                function r() {
                    return {
                        tapToDismiss: !0,
                        toastClass: "toast",
                        containerId: "toast-container",
                        debug: !1,
                        showMethod: "fadeIn",
                        showDuration: 300,
                        showEasing: "swing",
                        onShown: void 0,
                        hideMethod: "fadeOut",
                        hideDuration: 1e3,
                        hideEasing: "swing",
                        onHidden: void 0,
                        closeMethod: !1,
                        closeDuration: !1,
                        closeEasing: !1,
                        closeOnHover: !0,
                        extendedTimeOut: 1e3,
                        iconClasses: {
                            error: "toast-error",
                            info: "toast-info",
                            success: "toast-success",
                            warning: "toast-warning"
                        },
                        iconClass: "toast-info",
                        positionClass: "toast-top-right",
                        timeOut: 5e3,
                        titleClass: "toast-title",
                        messageClass: "toast-message",
                        escapeHtml: !1,
                        target: "body",
                        closeHtml: '<button type="button">&times;</button>',
                        closeClass: "toast-close-button",
                        newestOnTop: !0,
                        preventDuplicates: !1,
                        progressBar: !1,
                        progressClass: "toast-progress",
                        rtl: !1
                    }
                }

                function a(e) {
                    d && d(e)
                }

                function o(i) {
                    function n(e) {
                        return null == e && (e = ""), e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                    }

                    function s() {
                        var e = "";
                        switch (i.iconClass) {
                            case"toast-success":
                            case"toast-info":
                                e = "polite";
                                break;
                            default:
                                e = "assertive"
                        }
                        S.attr("aria-live", e)
                    }

                    function r() {
                        i.iconClass && S.addClass(x.toastClass).addClass(_)
                    }

                    function o() {
                        x.newestOnTop ? c.prepend(S) : c.append(S)
                    }

                    function d() {
                        if (i.title) {
                            var e = i.title;
                            x.escapeHtml && (e = n(i.title)), P.append(e).addClass(x.titleClass), S.append(P)
                        }
                    }

                    function f() {
                        if (i.message) {
                            var e = i.message;
                            x.escapeHtml && (e = n(i.message)), k.append(e).addClass(x.messageClass), S.append(k)
                        }
                    }

                    function m() {
                        x.closeButton && (E.addClass(x.closeClass).attr("role", "button"), S.prepend(E))
                    }

                    function g() {
                        x.progressBar && (I.addClass(x.progressClass), S.prepend(I))
                    }

                    function v() {
                        x.rtl && S.addClass("rtl")
                    }

                    function y(t) {
                        var i = t && !1 !== x.closeMethod ? x.closeMethod : x.hideMethod,
                            n = t && !1 !== x.closeDuration ? x.closeDuration : x.hideDuration,
                            s = t && !1 !== x.closeEasing ? x.closeEasing : x.hideEasing;
                        if (!e(":focus", S).length || t) return clearTimeout(j.intervalId), S[i]({
                            duration: n,
                            easing: s,
                            complete: function () {
                                u(S), clearTimeout(C), x.onHidden && "hidden" !== A.state && x.onHidden(), A.state = "hidden", A.endTime = new Date, a(A)
                            }
                        })
                    }

                    function b() {
                        (x.timeOut > 0 || x.extendedTimeOut > 0) && (C = setTimeout(y, x.extendedTimeOut), j.maxHideTime = parseFloat(x.extendedTimeOut), j.hideEta = (new Date).getTime() + j.maxHideTime)
                    }

                    function w() {
                        clearTimeout(C), j.hideEta = 0, S.stop(!0, !0)[x.showMethod]({
                            duration: x.showDuration,
                            easing: x.showEasing
                        })
                    }

                    function T() {
                        var e = (j.hideEta - (new Date).getTime()) / j.maxHideTime * 100;
                        I.width(e + "%")
                    }

                    var x = l(), _ = i.iconClass || x.iconClass;
                    if (void 0 !== i.optionsOverride && (x = e.extend(x, i.optionsOverride), _ = i.optionsOverride.iconClass || _), !function (e, t) {
                            if (e.preventDuplicates) {
                                if (t.message === p) return !0;
                                p = t.message
                            }
                            return !1
                        }(x, i)) {
                        h++, c = t(x, !0);
                        var C = null, S = e("<div/>"), P = e("<div/>"), k = e("<div/>"), I = e("<div/>"),
                            E = e(x.closeHtml), j = {intervalId: null, hideEta: null, maxHideTime: null},
                            A = {toastId: h, state: "visible", startTime: new Date, options: x, map: i};
                        return r(), d(), f(), m(), g(), v(), o(), s(), S.hide(), S[x.showMethod]({
                            duration: x.showDuration,
                            easing: x.showEasing,
                            complete: x.onShown
                        }), x.timeOut > 0 && (C = setTimeout(y, x.timeOut), j.maxHideTime = parseFloat(x.timeOut), j.hideEta = (new Date).getTime() + j.maxHideTime, x.progressBar && (j.intervalId = setInterval(T, 10))), x.closeOnHover && S.hover(w, b), !x.onclick && x.tapToDismiss && S.click(y), x.closeButton && E && E.click(function (e) {
                            e.stopPropagation ? e.stopPropagation() : void 0 !== e.cancelBubble && !0 !== e.cancelBubble && (e.cancelBubble = !0), x.onCloseClick && x.onCloseClick(e), y(!0)
                        }), x.onclick && S.click(function (e) {
                            x.onclick(e), y()
                        }), a(A), x.debug && console && console.log(A), S
                    }
                }

                function l() {
                    return e.extend({}, r(), m.options)
                }

                function u(e) {
                    c || (c = t()), e.is(":visible") || (e.remove(), e = null, 0 === c.children().length && (c.remove(), p = void 0))
                }

                var c, d, p, h = 0, f = {error: "error", info: "info", success: "success", warning: "warning"}, m = {
                    clear: function (e, s) {
                        var r = l();
                        c || t(r), n(e, r, s) || i(r)
                    }, remove: function (i) {
                        var n = l();
                        return c || t(n), i && 0 === e(":focus", i).length ? void u(i) : void(c.children().length && c.remove())
                    }, error: function (e, t, i) {
                        return o({
                            type: f.error,
                            iconClass: l().iconClasses.error,
                            message: e,
                            optionsOverride: i,
                            title: t
                        })
                    }, getContainer: t, info: function (e, t, i) {
                        return o({
                            type: f.info,
                            iconClass: l().iconClasses.info,
                            message: e,
                            optionsOverride: i,
                            title: t
                        })
                    }, options: {}, subscribe: function (e) {
                        d = e
                    }, success: function (e, t, i) {
                        return o({
                            type: f.success,
                            iconClass: l().iconClasses.success,
                            message: e,
                            optionsOverride: i,
                            title: t
                        })
                    }, version: "2.1.3", warning: function (e, t, i) {
                        return o({
                            type: f.warning,
                            iconClass: l().iconClasses.warning,
                            message: e,
                            optionsOverride: i,
                            title: t
                        })
                    }
                };
                return m
            }()
        })
    }("function" == typeof define && define.amd ? define : function (e, t) {
        "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : window.toastr = t(window.jQuery)
    }), function (e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : e("undefined" != typeof jQuery ? jQuery : window.Zepto)
    }(function (e) {
        "use strict";

        function t(t) {
            var i = t.data;
            t.isDefaultPrevented() || (t.preventDefault(), e(t.target).ajaxSubmit(i))
        }

        function i(t) {
            var i = t.target, n = e(i);
            if (!n.is("[type=submit],[type=image]")) {
                var s = n.closest("[type=submit]");
                if (0 === s.length) return;
                i = s[0]
            }
            var r = this;
            if (r.clk = i, "image" == i.type) if (void 0 !== t.offsetX) r.clk_x = t.offsetX, r.clk_y = t.offsetY; else if ("function" == typeof e.fn.offset) {
                var a = n.offset();
                r.clk_x = t.pageX - a.left, r.clk_y = t.pageY - a.top
            } else r.clk_x = t.pageX - i.offsetLeft, r.clk_y = t.pageY - i.offsetTop;
            setTimeout(function () {
                r.clk = r.clk_x = r.clk_y = null
            }, 100)
        }

        function n() {
            if (e.fn.ajaxSubmit.debug) {
                var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
                window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t)
            }
        }

        var s = {};
        s.fileapi = void 0 !== e("<input type='file'/>").get(0).files, s.formdata = void 0 !== window.FormData;
        var r = !!e.fn.prop;
        e.fn.attr2 = function () {
            if (!r) return this.attr.apply(this, arguments);
            var e = this.prop.apply(this, arguments);
            return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
        }, e.fn.ajaxSubmit = function (t) {
            function i(i) {
                var n, s, r = e.param(i, t.traditional).split("&"), a = r.length, o = [];
                for (n = 0; a > n; n++) r[n] = r[n].replace(/\+/g, " "), s = r[n].split("="), o.push([decodeURIComponent(s[0]), decodeURIComponent(s[1])]);
                return o
            }

            function a(i) {
                function s(e) {
                    var t = null;
                    try {
                        e.contentWindow && (t = e.contentWindow.document)
                    } catch (e) {
                        n("cannot get iframe.contentWindow document: " + e)
                    }
                    if (t) return t;
                    try {
                        t = e.contentDocument ? e.contentDocument : e.document
                    } catch (i) {
                        n("cannot get iframe.contentDocument: " + i), t = e.document
                    }
                    return t
                }

                function a() {
                    function t() {
                        try {
                            var e = s(v).readyState;
                            n("state = " + e), e && "uninitialized" == e.toLowerCase() && setTimeout(t, 50)
                        } catch (e) {
                            n("Server abort: ", e, " (", e.name, ")"), l(P), x && clearTimeout(x), x = void 0
                        }
                    }

                    var i = c.attr2("target"), r = c.attr2("action"),
                        a = c.attr("enctype") || c.attr("encoding") || "multipart/form-data";
                    _.setAttribute("target", m), (!o || /post/i.test(o)) && _.setAttribute("method", "POST"), r != p.url && _.setAttribute("action", p.url), p.skipEncodingOverride || o && !/post/i.test(o) || c.attr({
                        encoding: "multipart/form-data",
                        enctype: "multipart/form-data"
                    }), p.timeout && (x = setTimeout(function () {
                        T = !0, l(S)
                    }, p.timeout));
                    var u = [];
                    try {
                        if (p.extraData) for (var d in p.extraData) p.extraData.hasOwnProperty(d) && u.push(e.isPlainObject(p.extraData[d]) && p.extraData[d].hasOwnProperty("name") && p.extraData[d].hasOwnProperty("value") ? e('<input type="hidden" name="' + p.extraData[d].name + '">').val(p.extraData[d].value).appendTo(_)[0] : e('<input type="hidden" name="' + d + '">').val(p.extraData[d]).appendTo(_)[0]);
                        p.iframeTarget || g.appendTo("body"), v.attachEvent ? v.attachEvent("onload", l) : v.addEventListener("load", l, !1), setTimeout(t, 15);
                        try {
                            _.submit()
                        } catch (e) {
                            document.createElement("form").submit.apply(_)
                        }
                    } finally {
                        _.setAttribute("action", r), _.setAttribute("enctype", a), i ? _.setAttribute("target", i) : c.removeAttr("target"), e(u).remove()
                    }
                }

                function l(t) {
                    if (!y.aborted && !A) {
                        if ((j = s(v)) || (n("cannot access response document"), t = P), t === S && y) return y.abort("timeout"), void C.reject(y, "timeout");
                        if (t == P && y) return y.abort("server abort"), void C.reject(y, "error", "server abort");
                        if (j && j.location.href != p.iframeSrc || T) {
                            v.detachEvent ? v.detachEvent("onload", l) : v.removeEventListener("load", l, !1);
                            var i, r = "success";
                            try {
                                if (T) throw"timeout";
                                var a = "xml" == p.dataType || j.XMLDocument || e.isXMLDoc(j);
                                if (n("isXml=" + a), !a && window.opera && (null === j.body || !j.body.innerHTML) && --M) return n("requeing onLoad callback, DOM not available"), void setTimeout(l, 250);
                                var o = j.body ? j.body : j.documentElement;
                                y.responseText = o ? o.innerHTML : null, y.responseXML = j.XMLDocument ? j.XMLDocument : j, a && (p.dataType = "xml"), y.getResponseHeader = function (e) {
                                    return {"content-type": p.dataType}[e.toLowerCase()]
                                }, o && (y.status = Number(o.getAttribute("status")) || y.status, y.statusText = o.getAttribute("statusText") || y.statusText);
                                var u = (p.dataType || "").toLowerCase(), c = /(json|script|text)/.test(u);
                                if (c || p.textarea) {
                                    var d = j.getElementsByTagName("textarea")[0];
                                    if (d) y.responseText = d.value, y.status = Number(d.getAttribute("status")) || y.status, y.statusText = d.getAttribute("statusText") || y.statusText; else if (c) {
                                        var f = j.getElementsByTagName("pre")[0], m = j.getElementsByTagName("body")[0];
                                        f ? y.responseText = f.textContent ? f.textContent : f.innerText : m && (y.responseText = m.textContent ? m.textContent : m.innerText)
                                    }
                                } else "xml" == u && !y.responseXML && y.responseText && (y.responseXML = Y(y.responseText));
                                try {
                                    E = z(y, u, p)
                                } catch (e) {
                                    r = "parsererror", y.error = i = e || r
                                }
                            } catch (e) {
                                n("error caught: ", e), r = "error", y.error = i = e || r
                            }
                            y.aborted && (n("upload aborted"), r = null), y.status && (r = y.status >= 200 && y.status < 300 || 304 === y.status ? "success" : "error"), "success" === r ? (p.success && p.success.call(p.context, E, "success", y), C.resolve(y.responseText, "success", y), h && e.event.trigger("ajaxSuccess", [y, p])) : r && (void 0 === i && (i = y.statusText), p.error && p.error.call(p.context, y, r, i), C.reject(y, "error", i), h && e.event.trigger("ajaxError", [y, p, i])), h && e.event.trigger("ajaxComplete", [y, p]), h && !--e.active && e.event.trigger("ajaxStop"), p.complete && p.complete.call(p.context, y, r), A = !0, p.timeout && clearTimeout(x), setTimeout(function () {
                                p.iframeTarget ? g.attr("src", p.iframeSrc) : g.remove(), y.responseXML = null
                            }, 100)
                        }
                    }
                }

                var u, d, p, h, m, g, v, y, b, w, T, x, _ = c[0], C = e.Deferred();
                if (C.abort = function (e) {
                        y.abort(e)
                    }, i) for (d = 0; d < f.length; d++) u = e(f[d]), r ? u.prop("disabled", !1) : u.removeAttr("disabled");
                if (p = e.extend(!0, {}, e.ajaxSettings, t), p.context = p.context || p, m = "jqFormIO" + (new Date).getTime(), p.iframeTarget ? (g = e(p.iframeTarget), w = g.attr2("name"), w ? m = w : g.attr2("name", m)) : (g = e('<iframe name="' + m + '" src="' + p.iframeSrc + '" />')).css({
                        position: "absolute",
                        top: "-1000px",
                        left: "-1000px"
                    }), v = g[0], y = {
                        aborted: 0,
                        responseText: null,
                        responseXML: null,
                        status: 0,
                        statusText: "n/a",
                        getAllResponseHeaders: function () {
                        },
                        getResponseHeader: function () {
                        },
                        setRequestHeader: function () {
                        },
                        abort: function (t) {
                            var i = "timeout" === t ? "timeout" : "aborted";
                            n("aborting upload... " + i), this.aborted = 1;
                            try {
                                v.contentWindow.document.execCommand && v.contentWindow.document.execCommand("Stop")
                            } catch (e) {
                            }
                            g.attr("src", p.iframeSrc), y.error = i, p.error && p.error.call(p.context, y, i, t), h && e.event.trigger("ajaxError", [y, p, i]), p.complete && p.complete.call(p.context, y, i)
                        }
                    }, (h = p.global) && 0 == e.active++ && e.event.trigger("ajaxStart"), h && e.event.trigger("ajaxSend", [y, p]), p.beforeSend && !1 === p.beforeSend.call(p.context, y, p)) return p.global && e.active--, C.reject(), C;
                if (y.aborted) return C.reject(), C;
                (b = _.clk) && (w = b.name) && !b.disabled && (p.extraData = p.extraData || {}, p.extraData[w] = b.value, "image" == b.type && (p.extraData[w + ".x"] = _.clk_x, p.extraData[w + ".y"] = _.clk_y));
                var S = 1, P = 2, k = e("meta[name=csrf-token]").attr("content"),
                    I = e("meta[name=csrf-param]").attr("content");
                I && k && (p.extraData = p.extraData || {}, p.extraData[I] = k), p.forceSync ? a() : setTimeout(a, 10);
                var E, j, A, M = 50, Y = e.parseXML || function (e, t) {
                    return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null
                }, D = e.parseJSON || function (e) {
                    return window.eval("(" + e + ")")
                }, z = function (t, i, n) {
                    var s = t.getResponseHeader("content-type") || "", r = "xml" === i || !i && s.indexOf("xml") >= 0,
                        a = r ? t.responseXML : t.responseText;
                    return r && "parsererror" === a.documentElement.nodeName && e.error && e.error("parsererror"), n && n.dataFilter && (a = n.dataFilter(a, i)), "string" == typeof a && ("json" === i || !i && s.indexOf("json") >= 0 ? a = D(a) : ("script" === i || !i && s.indexOf("javascript") >= 0) && e.globalEval(a)), a
                };
                return C
            }

            if (!this.length) return n("ajaxSubmit: skipping submit process - no element selected"), this;
            var o, l, u, c = this;
            "function" == typeof t ? t = {success: t} : void 0 === t && (t = {}), o = t.type || this.attr2("method"), (u = (u = "string" == typeof(l = t.url || this.attr2("action")) ? e.trim(l) : "") || window.location.href || "") && (u = (u.match(/^([^#]+)/) || [])[1]), t = e.extend(!0, {
                url: u,
                success: e.ajaxSettings.success,
                type: o || e.ajaxSettings.type,
                iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
            }, t);
            var d = {};
            if (this.trigger("form-pre-serialize", [this, t, d]), d.veto) return n("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
            if (t.beforeSerialize && !1 === t.beforeSerialize(this, t)) return n("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
            var p = t.traditional;
            void 0 === p && (p = e.ajaxSettings.traditional);
            var h, f = [], m = this.formToArray(t.semantic, f);
            if (t.data && (t.extraData = t.data, h = e.param(t.data, p)), t.beforeSubmit && !1 === t.beforeSubmit(m, this, t)) return n("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
            if (this.trigger("form-submit-validate", [m, this, t, d]), d.veto) return n("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
            var g = e.param(m, p);
            h && (g = g ? g + "&" + h : h), "GET" == t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + g, t.data = null) : t.data = g;
            var v = [];
            if (t.resetForm && v.push(function () {
                    c.resetForm()
                }), t.clearForm && v.push(function () {
                    c.clearForm(t.includeHidden)
                }), !t.dataType && t.target) {
                var y = t.success || function () {
                };
                v.push(function (i) {
                    var n = t.replaceTarget ? "replaceWith" : "html";
                    e(t.target)[n](i).each(y, arguments)
                })
            } else t.success && v.push(t.success);
            if (t.success = function (e, i, n) {
                    for (var s = t.context || this, r = 0, a = v.length; a > r; r++) v[r].apply(s, [e, i, n || c, c])
                }, t.error) {
                var b = t.error;
                t.error = function (e, i, n) {
                    var s = t.context || this;
                    b.apply(s, [e, i, n, c])
                }
            }
            if (t.complete) {
                var w = t.complete;
                t.complete = function (e, i) {
                    var n = t.context || this;
                    w.apply(n, [e, i, c])
                }
            }
            var T = e("input[type=file]:enabled", this).filter(function () {
                    return "" !== e(this).val()
                }).length > 0, x = "multipart/form-data", _ = c.attr("enctype") == x || c.attr("encoding") == x,
                C = s.fileapi && s.formdata;
            n("fileAPI :" + C);
            var S, P = (T || _) && !C;
            !1 !== t.iframe && (t.iframe || P) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function () {
                S = a(m)
            }) : S = a(m) : S = (T || _) && C ? function (n) {
                for (var s = new FormData, r = 0; r < n.length; r++) s.append(n[r].name, n[r].value);
                if (t.extraData) {
                    var a = i(t.extraData);
                    for (r = 0; r < a.length; r++) a[r] && s.append(a[r][0], a[r][1])
                }
                t.data = null;
                var l = e.extend(!0, {}, e.ajaxSettings, t, {
                    contentType: !1,
                    processData: !1,
                    cache: !1,
                    type: o || "POST"
                });
                t.uploadProgress && (l.xhr = function () {
                    var i = e.ajaxSettings.xhr();
                    return i.upload && i.upload.addEventListener("progress", function (e) {
                        var i = 0, n = e.loaded || e.position, s = e.total;
                        e.lengthComputable && (i = Math.ceil(n / s * 100)), t.uploadProgress(e, n, s, i)
                    }, !1), i
                }), l.data = null;
                var u = l.beforeSend;
                return l.beforeSend = function (e, i) {
                    i.data = t.formData ? t.formData : s, u && u.call(this, e, i)
                }, e.ajax(l)
            }(m) : e.ajax(t), c.removeData("jqxhr").data("jqxhr", S);
            for (var k = 0; k < f.length; k++) f[k] = null;
            return this.trigger("form-submit-notify", [this, t]), this
        }, e.fn.ajaxForm = function (s) {
            if (s = s || {}, s.delegation = s.delegation && e.isFunction(e.fn.on), !s.delegation && 0 === this.length) {
                var r = {s: this.selector, c: this.context};
                return !e.isReady && r.s ? (n("DOM not ready, queuing ajaxForm"), e(function () {
                    e(r.s, r.c).ajaxForm(s)
                }), this) : (n("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this)
            }
            return s.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, i).on("submit.form-plugin", this.selector, s, t).on("click.form-plugin", this.selector, s, i), this) : this.ajaxFormUnbind().bind("submit.form-plugin", s, t).bind("click.form-plugin", s, i)
        }, e.fn.ajaxFormUnbind = function () {
            return this.unbind("submit.form-plugin click.form-plugin")
        }, e.fn.formToArray = function (t, i) {
            var n = [];
            if (0 === this.length) return n;
            var r, a = this[0], o = this.attr("id"), l = t ? a.getElementsByTagName("*") : a.elements;
            if (l && !/MSIE [678]/.test(navigator.userAgent) && (l = e(l).get()), o && (r = e(':input[form="' + o + '"]').get()).length && (l = (l || []).concat(r)), !l || !l.length) return n;
            var u, c, d, p, h, f, m;
            for (u = 0, f = l.length; f > u; u++) if (h = l[u], (d = h.name) && !h.disabled) if (t && a.clk && "image" == h.type) a.clk == h && (n.push({
                name: d,
                value: e(h).val(),
                type: h.type
            }), n.push({name: d + ".x", value: a.clk_x}, {
                name: d + ".y",
                value: a.clk_y
            })); else if ((p = e.fieldValue(h, !0)) && p.constructor == Array) for (i && i.push(h), c = 0, m = p.length; m > c; c++) n.push({
                name: d,
                value: p[c]
            }); else if (s.fileapi && "file" == h.type) {
                i && i.push(h);
                var g = h.files;
                if (g.length) for (c = 0; c < g.length; c++) n.push({
                    name: d,
                    value: g[c],
                    type: h.type
                }); else n.push({name: d, value: "", type: h.type})
            } else null !== p && void 0 !== p && (i && i.push(h), n.push({
                name: d,
                value: p,
                type: h.type,
                required: h.required
            }));
            if (!t && a.clk) {
                var v = e(a.clk), y = v[0];
                (d = y.name) && !y.disabled && "image" == y.type && (n.push({
                    name: d,
                    value: v.val()
                }), n.push({name: d + ".x", value: a.clk_x}, {name: d + ".y", value: a.clk_y}))
            }
            return n
        }, e.fn.formSerialize = function (t) {
            return e.param(this.formToArray(t))
        }, e.fn.fieldSerialize = function (t) {
            var i = [];
            return this.each(function () {
                var n = this.name;
                if (n) {
                    var s = e.fieldValue(this, t);
                    if (s && s.constructor == Array) for (var r = 0, a = s.length; a > r; r++) i.push({
                        name: n,
                        value: s[r]
                    }); else null !== s && void 0 !== s && i.push({name: this.name, value: s})
                }
            }), e.param(i)
        }, e.fn.fieldValue = function (t) {
            for (var i = [], n = 0, s = this.length; s > n; n++) {
                var r = this[n], a = e.fieldValue(r, t);
                null === a || void 0 === a || a.constructor == Array && !a.length || (a.constructor == Array ? e.merge(i, a) : i.push(a))
            }
            return i
        }, e.fieldValue = function (t, i) {
            var n = t.name, s = t.type, r = t.tagName.toLowerCase();
            if (void 0 === i && (i = !0), i && (!n || t.disabled || "reset" == s || "button" == s || ("checkbox" == s || "radio" == s) && !t.checked || ("submit" == s || "image" == s) && t.form && t.form.clk != t || "select" == r && -1 == t.selectedIndex)) return null;
            if ("select" == r) {
                var a = t.selectedIndex;
                if (0 > a) return null;
                for (var o = [], l = t.options, u = "select-one" == s, c = u ? a + 1 : l.length, d = u ? a : 0; c > d; d++) {
                    var p = l[d];
                    if (p.selected) {
                        var h = p.value;
                        if (h || (h = p.attributes && p.attributes.value && !p.attributes.value.specified ? p.text : p.value), u) return h;
                        o.push(h)
                    }
                }
                return o
            }
            return e(t).val()
        }, e.fn.clearForm = function (t) {
            return this.each(function () {
                e("input,select,textarea", this).clearFields(t)
            })
        }, e.fn.clearFields = e.fn.clearInputs = function (t) {
            var i = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
            return this.each(function () {
                var n = this.type, s = this.tagName.toLowerCase();
                i.test(n) || "textarea" == s ? this.value = "" : "checkbox" == n || "radio" == n ? this.checked = !1 : "select" == s ? this.selectedIndex = -1 : "file" == n ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (!0 === t && /hidden/.test(n) || "string" == typeof t && e(this).is(t)) && (this.value = "")
            })
        }, e.fn.resetForm = function () {
            return this.each(function () {
                ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
            })
        }, e.fn.enable = function (e) {
            return void 0 === e && (e = !0), this.each(function () {
                this.disabled = !e
            })
        }, e.fn.selected = function (t) {
            return void 0 === t && (t = !0), this.each(function () {
                var i = this.type;
                if ("checkbox" == i || "radio" == i) this.checked = t; else if ("option" == this.tagName.toLowerCase()) {
                    var n = e(this).parent("select");
                    t && n[0] && "select-one" == n[0].type && n.find("option").selected(!1), this.selected = t
                }
            })
        }, e.fn.ajaxSubmit.debug = !1
    }), function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
    }(function (e) {
        var t, i, n, s, r, a, o = "Close", l = "BeforeClose", u = "MarkupParse", c = "Open", d = "Change", p = "mfp",
            h = "." + p, f = "mfp-ready", m = "mfp-removing", g = "mfp-prevent-close", v = function () {
            }, y = !!window.jQuery, b = e(window), w = function (e, i) {
                t.ev.on(p + e + h, i)
            }, T = function (t, i, n, s) {
                var r = document.createElement("div");
                return r.className = "mfp-" + t, n && (r.innerHTML = n), s ? i && i.appendChild(r) : (r = e(r), i && r.appendTo(i)), r
            }, x = function (i, n) {
                t.ev.triggerHandler(p + i, n), t.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), t.st.callbacks[i] && t.st.callbacks[i].apply(t, e.isArray(n) ? n : [n]))
            }, _ = function (i) {
                return i === a && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), a = i), t.currTemplate.closeBtn
            }, C = function () {
                e.magnificPopup.instance || ((t = new v).init(), e.magnificPopup.instance = t)
            }, S = function () {
                var e = document.createElement("p").style, t = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== e.transition) return !0;
                for (; t.length;) if (t.pop() + "Transition" in e) return !0;
                return !1
            };
        v.prototype = {
            constructor: v, init: function () {
                var i = navigator.appVersion;
                t.isLowIE = t.isIE8 = document.all && !document.addEventListener, t.isAndroid = /android/gi.test(i), t.isIOS = /iphone|ipad|ipod/gi.test(i), t.supportsTransition = S(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), n = e(document), t.popupsCache = {}
            }, open: function (i) {
                var s;
                if (!1 === i.isObj) {
                    t.items = i.items.toArray(), t.index = 0;
                    var a, o = i.items;
                    for (s = 0; s < o.length; s++) if ((a = o[s]).parsed && (a = a.el[0]), a === i.el[0]) {
                        t.index = s;
                        break
                    }
                } else t.items = e.isArray(i.items) ? i.items : [i.items], t.index = i.index || 0;
                {
                    if (!t.isOpen) {
                        t.types = [], r = "", i.mainEl && i.mainEl.length ? t.ev = i.mainEl.eq(0) : t.ev = n, i.key ? (t.popupsCache[i.key] || (t.popupsCache[i.key] = {}), t.currTemplate = t.popupsCache[i.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, i), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = T("bg").on("click" + h, function () {
                            t.close()
                        }), t.wrap = T("wrap").attr("tabindex", -1).on("click" + h, function (e) {
                            t._checkIfClose(e.target) && t.close()
                        }), t.container = T("container", t.wrap)), t.contentContainer = T("content"), t.st.preloader && (t.preloader = T("preloader", t.container, t.st.tLoading));
                        var l = e.magnificPopup.modules;
                        for (s = 0; s < l.length; s++) {
                            var d = l[s];
                            d = d.charAt(0).toUpperCase() + d.slice(1), t["init" + d].call(t)
                        }
                        x("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (w(u, function (e, t, i, n) {
                            i.close_replaceWith = _(n.type)
                        }), r += " mfp-close-btn-in") : t.wrap.append(_())), t.st.alignTop && (r += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({
                            overflow: t.st.overflowY,
                            overflowX: "hidden",
                            overflowY: t.st.overflowY
                        }) : t.wrap.css({
                            top: b.scrollTop(),
                            position: "absolute"
                        }), (!1 === t.st.fixedBgPos || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                            height: n.height(),
                            position: "absolute"
                        }), t.st.enableEscapeKey && n.on("keyup" + h, function (e) {
                            27 === e.keyCode && t.close()
                        }), b.on("resize" + h, function () {
                            t.updateSize()
                        }), t.st.closeOnContentClick || (r += " mfp-auto-cursor"), r && t.wrap.addClass(r);
                        var p = t.wH = b.height(), m = {};
                        if (t.fixedContentPos && t._hasScrollBar(p)) {
                            var g = t._getScrollbarSize();
                            g && (m.marginRight = g)
                        }
                        t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : m.overflow = "hidden");
                        var v = t.st.mainClass;
                        return t.isIE7 && (v += " mfp-ie7"), v && t._addClassToMFP(v), t.updateItemHTML(), x("BuildControls"), e("html").css(m), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)), t._lastFocusedEl = document.activeElement, setTimeout(function () {
                            t.content ? (t._addClassToMFP(f), t._setFocus()) : t.bgOverlay.addClass(f), n.on("focusin" + h, t._onFocusIn)
                        }, 16), t.isOpen = !0, t.updateSize(p), x(c), i
                    }
                    t.updateItemHTML()
                }
            }, close: function () {
                t.isOpen && (x(l), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(m), setTimeout(function () {
                    t._close()
                }, t.st.removalDelay)) : t._close())
            }, _close: function () {
                x(o);
                var i = m + " " + f + " ";
                if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (i += t.st.mainClass + " "), t._removeClassFromMFP(i), t.fixedContentPos) {
                    var s = {marginRight: ""};
                    t.isIE7 ? e("body, html").css("overflow", "") : s.overflow = "", e("html").css(s)
                }
                n.off("keyup.mfp focusin" + h), t.ev.off(h), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && !0 !== t.currTemplate[t.currItem.type] || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, x("AfterClose")
            }, updateSize: function (e) {
                if (t.isIOS) {
                    var i = document.documentElement.clientWidth / window.innerWidth, n = window.innerHeight * i;
                    t.wrap.css("height", n), t.wH = n
                } else t.wH = e || b.height();
                t.fixedContentPos || t.wrap.css("height", t.wH), x("Resize")
            }, updateItemHTML: function () {
                var i = t.items[t.index];
                t.contentContainer.detach(), t.content && t.content.detach(), i.parsed || (i = t.parseEl(t.index));
                var n = i.type;
                if (x("BeforeChange", [t.currItem ? t.currItem.type : "", n]), t.currItem = i, !t.currTemplate[n]) {
                    var r = !!t.st[n] && t.st[n].markup;
                    x("FirstMarkupParse", r), t.currTemplate[n] = !r || e(r)
                }
                s && s !== i.type && t.container.removeClass("mfp-" + s + "-holder");
                var a = t["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, t.currTemplate[n]);
                t.appendContent(a, n), i.preloaded = !0, x(d, i), s = i.type, t.container.prepend(t.contentContainer), x("AfterChange")
            }, appendContent: function (e, i) {
                t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[i] ? t.content.find(".mfp-close").length || t.content.append(_()) : t.content = e : t.content = "", x("BeforeAppend"), t.container.addClass("mfp-" + i + "-holder"), t.contentContainer.append(t.content)
            }, parseEl: function (i) {
                var n, s = t.items[i];
                if (s.tagName ? s = {el: e(s)} : (n = s.type, s = {data: s, src: s.src}), s.el) {
                    for (var r = t.types, a = 0; a < r.length; a++) if (s.el.hasClass("mfp-" + r[a])) {
                        n = r[a];
                        break
                    }
                    s.src = s.el.attr("data-mfp-src"), s.src || (s.src = s.el.attr("href"))
                }
                return s.type = n || t.st.type || "inline", s.index = i, s.parsed = !0, t.items[i] = s, x("ElementParse", s), t.items[i]
            }, addGroup: function (e, i) {
                var n = function (n) {
                    n.mfpEl = this, t._openClick(n, e, i)
                };
                i || (i = {});
                var s = "click.magnificPopup";
                i.mainEl = e, i.items ? (i.isObj = !0, e.off(s).on(s, n)) : (i.isObj = !1, i.delegate ? e.off(s).on(s, i.delegate, n) : (i.items = e, e.off(s).on(s, n)))
            }, _openClick: function (i, n, s) {
                if ((void 0 !== s.midClick ? s.midClick : e.magnificPopup.defaults.midClick) || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                    var r = void 0 !== s.disableOn ? s.disableOn : e.magnificPopup.defaults.disableOn;
                    if (r) if (e.isFunction(r)) {
                        if (!r.call(t)) return !0
                    } else if (b.width() < r) return !0;
                    i.type && (i.preventDefault(), t.isOpen && i.stopPropagation()), s.el = e(i.mfpEl), s.delegate && (s.items = n.find(s.delegate)), t.open(s)
                }
            }, updateStatus: function (e, n) {
                if (t.preloader) {
                    i !== e && t.container.removeClass("mfp-s-" + i), n || "loading" !== e || (n = t.st.tLoading);
                    var s = {status: e, text: n};
                    x("UpdateStatus", s), e = s.status, n = s.text, t.preloader.html(n), t.preloader.find("a").on("click", function (e) {
                        e.stopImmediatePropagation()
                    }), t.container.addClass("mfp-s-" + e), i = e
                }
            }, _checkIfClose: function (i) {
                if (!e(i).hasClass(g)) {
                    var n = t.st.closeOnContentClick, s = t.st.closeOnBgClick;
                    if (n && s) return !0;
                    if (!t.content || e(i).hasClass("mfp-close") || t.preloader && i === t.preloader[0]) return !0;
                    if (i === t.content[0] || e.contains(t.content[0], i)) {
                        if (n) return !0
                    } else if (s && e.contains(document, i)) return !0;
                    return !1
                }
            }, _addClassToMFP: function (e) {
                t.bgOverlay.addClass(e), t.wrap.addClass(e)
            }, _removeClassFromMFP: function (e) {
                this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
            }, _hasScrollBar: function (e) {
                return (t.isIE7 ? n.height() : document.body.scrollHeight) > (e || b.height())
            }, _setFocus: function () {
                (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
            }, _onFocusIn: function (i) {
                return i.target === t.wrap[0] || e.contains(t.wrap[0], i.target) ? void 0 : (t._setFocus(), !1)
            }, _parseMarkup: function (t, i, n) {
                var s;
                n.data && (i = e.extend(n.data, i)), x(u, [t, i, n]), e.each(i, function (i, n) {
                    if (void 0 === n || !1 === n) return !0;
                    if ((s = i.split("_")).length > 1) {
                        var r = t.find(h + "-" + s[0]);
                        if (r.length > 0) {
                            var a = s[1];
                            "replaceWith" === a ? r[0] !== n[0] && r.replaceWith(n) : "img" === a ? r.is("img") ? r.attr("src", n) : r.replaceWith(e("<img>").attr("src", n).attr("class", r.attr("class"))) : r.attr(s[1], n)
                        }
                    } else t.find(h + "-" + i).html(n)
                })
            }, _getScrollbarSize: function () {
                if (void 0 === t.scrollbarSize) {
                    var e = document.createElement("div");
                    e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
                }
                return t.scrollbarSize
            }
        }, e.magnificPopup = {
            instance: null,
            proto: v.prototype,
            modules: [],
            open: function (t, i) {
                return C(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = i || 0, this.instance.open(t)
            },
            close: function () {
                return e.magnificPopup.instance && e.magnificPopup.instance.close()
            },
            registerModule: function (t, i) {
                i.options && (e.magnificPopup.defaults[t] = i.options), e.extend(this.proto, i.proto), this.modules.push(t)
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading...",
                autoFocusLast: !0
            }
        }, e.fn.magnificPopup = function (i) {
            C();
            var n = e(this);
            if ("string" == typeof i) if ("open" === i) {
                var s, r = y ? n.data("magnificPopup") : n[0].magnificPopup, a = parseInt(arguments[1], 10) || 0;
                r.items ? s = r.items[a] : (s = n, r.delegate && (s = s.find(r.delegate)), s = s.eq(a)), t._openClick({mfpEl: s}, n, r)
            } else t.isOpen && t[i].apply(t, Array.prototype.slice.call(arguments, 1)); else i = e.extend(!0, {}, i), y ? n.data("magnificPopup", i) : n[0].magnificPopup = i, t.addGroup(n, i);
            return n
        };
        var P, k, I, E = "inline", j = function () {
            I && (k.after(I.addClass(P)).detach(), I = null)
        };
        e.magnificPopup.registerModule(E, {
            options: {hiddenClass: "hide", markup: "", tNotFound: "Content not found"},
            proto: {
                initInline: function () {
                    t.types.push(E), w(o + "." + E, function () {
                        j()
                    })
                }, getInline: function (i, n) {
                    if (j(), i.src) {
                        var s = t.st.inline, r = e(i.src);
                        if (r.length) {
                            var a = r[0].parentNode;
                            a && a.tagName && (k || (P = s.hiddenClass, k = T(P), P = "mfp-" + P), I = r.after(k).detach().removeClass(P)), t.updateStatus("ready")
                        } else t.updateStatus("error", s.tNotFound), r = e("<div>");
                        return i.inlineElement = r, r
                    }
                    return t.updateStatus("ready"), t._parseMarkup(n, {}, i), n
                }
            }
        });
        var A, M = "ajax", Y = function () {
            A && e(document.body).removeClass(A)
        }, D = function () {
            Y(), t.req && t.req.abort()
        };
        e.magnificPopup.registerModule(M, {
            options: {
                settings: null,
                cursor: "mfp-ajax-cur",
                tError: '<a href="%url%">The content</a> could not be loaded.'
            }, proto: {
                initAjax: function () {
                    t.types.push(M), A = t.st.ajax.cursor, w(o + "." + M, D), w("BeforeChange." + M, D)
                }, getAjax: function (i) {
                    A && e(document.body).addClass(A), t.updateStatus("loading");
                    var n = e.extend({
                        url: i.src, success: function (n, s, r) {
                            var a = {data: n, xhr: r};
                            x("ParseAjax", a), t.appendContent(e(a.data), M), i.finished = !0, Y(), t._setFocus(), setTimeout(function () {
                                t.wrap.addClass(f)
                            }, 16), t.updateStatus("ready"), x("AjaxContentAdded")
                        }, error: function () {
                            Y(), i.finished = i.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", i.src))
                        }
                    }, t.st.ajax.settings);
                    return t.req = e.ajax(n), ""
                }
            }
        });
        var z, Q = function (i) {
            if (i.data && void 0 !== i.data.title) return i.data.title;
            var n = t.st.image.titleSrc;
            if (n) {
                if (e.isFunction(n)) return n.call(t, i);
                if (i.el) return i.el.attr(n) || ""
            }
            return ""
        };
        e.magnificPopup.registerModule("image", {
            options: {
                markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                cursor: "mfp-zoom-out-cur",
                titleSrc: "title",
                verticalFit: !0,
                tError: '<a href="%url%">The image</a> could not be loaded.'
            }, proto: {
                initImage: function () {
                    var i = t.st.image, n = ".image";
                    t.types.push("image"), w(c + n, function () {
                        "image" === t.currItem.type && i.cursor && e(document.body).addClass(i.cursor)
                    }), w(o + n, function () {
                        i.cursor && e(document.body).removeClass(i.cursor), b.off("resize" + h)
                    }), w("Resize" + n, t.resizeImage), t.isLowIE && w("AfterChange", t.resizeImage)
                }, resizeImage: function () {
                    var e = t.currItem;
                    if (e && e.img && t.st.image.verticalFit) {
                        var i = 0;
                        t.isLowIE && (i = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - i)
                    }
                }, _onImageHasSize: function (e) {
                    e.img && (e.hasSize = !0, z && clearInterval(z), e.isCheckingImgSize = !1, x("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
                }, findImageSize: function (e) {
                    var i = 0, n = e.img[0], s = function (r) {
                        z && clearInterval(z), z = setInterval(function () {
                            return n.naturalWidth > 0 ? void t._onImageHasSize(e) : (i > 200 && clearInterval(z), i++, void(3 === i ? s(10) : 40 === i ? s(50) : 100 === i && s(500)))
                        }, r)
                    };
                    s(1)
                }, getImage: function (i, n) {
                    var s = 0, r = function () {
                        i && (i.img[0].complete ? (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, x("ImageLoadComplete")) : (s++, 200 > s ? setTimeout(r, 100) : a()))
                    }, a = function () {
                        i && (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("error", o.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
                    }, o = t.st.image, l = n.find(".mfp-img");
                    if (l.length) {
                        var u = document.createElement("img");
                        u.className = "mfp-img", i.el && i.el.find("img").length && (u.alt = i.el.find("img").attr("alt")), i.img = e(u).on("load.mfploader", r).on("error.mfploader", a), u.src = i.src, l.is("img") && (i.img = i.img.clone()), (u = i.img[0]).naturalWidth > 0 ? i.hasSize = !0 : u.width || (i.hasSize = !1)
                    }
                    return t._parseMarkup(n, {
                        title: Q(i),
                        img_replaceWith: i.img
                    }, i), t.resizeImage(), i.hasSize ? (z && clearInterval(z), i.loadError ? (n.addClass("mfp-loading"), t.updateStatus("error", o.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"), t.updateStatus("ready")), n) : (t.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, n.addClass("mfp-loading"), t.findImageSize(i)), n)
                }
            }
        });
        var O, L = function () {
            return void 0 === O && (O = void 0 !== document.createElement("p").style.MozTransform), O
        };
        e.magnificPopup.registerModule("zoom", {
            options: {
                enabled: !1,
                easing: "ease-in-out",
                duration: 300,
                opener: function (e) {
                    return e.is("img") ? e : e.find("img")
                }
            }, proto: {
                initZoom: function () {
                    var e, i = t.st.zoom, n = ".zoom";
                    if (i.enabled && t.supportsTransition) {
                        var s, r, a = i.duration, u = function (e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                n = "all " + i.duration / 1e3 + "s " + i.easing, s = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                }, r = "transition";
                            return s["-webkit-" + r] = s["-moz-" + r] = s["-o-" + r] = s[r] = n, t.css(s), t
                        }, c = function () {
                            t.content.css("visibility", "visible")
                        };
                        w("BuildControls" + n, function () {
                            if (t._allowZoom()) {
                                if (clearTimeout(s), t.content.css("visibility", "hidden"), !(e = t._getItemToZoom())) return void c();
                                (r = u(e)).css(t._getOffset()), t.wrap.append(r), s = setTimeout(function () {
                                    r.css(t._getOffset(!0)), s = setTimeout(function () {
                                        c(), setTimeout(function () {
                                            r.remove(), e = r = null, x("ZoomAnimationEnded")
                                        }, 16)
                                    }, a)
                                }, 16)
                            }
                        }), w(l + n, function () {
                            if (t._allowZoom()) {
                                if (clearTimeout(s), t.st.removalDelay = a, !e) {
                                    if (!(e = t._getItemToZoom())) return;
                                    r = u(e)
                                }
                                r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout(function () {
                                    r.css(t._getOffset())
                                }, 16)
                            }
                        }), w(o + n, function () {
                            t._allowZoom() && (c(), r && r.remove(), e = null)
                        })
                    }
                }, _allowZoom: function () {
                    return "image" === t.currItem.type
                }, _getItemToZoom: function () {
                    return !!t.currItem.hasSize && t.currItem.img
                }, _getOffset: function (i) {
                    var n, s = (n = i ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem)).offset(),
                        r = parseInt(n.css("padding-top"), 10), a = parseInt(n.css("padding-bottom"), 10);
                    s.top -= e(window).scrollTop() - r;
                    var o = {width: n.width(), height: (y ? n.innerHeight() : n[0].offsetHeight) - a - r};
                    return L() ? o["-moz-transform"] = o.transform = "translate(" + s.left + "px," + s.top + "px)" : (o.left = s.left, o.top = s.top), o
                }
            }
        });
        var B = "iframe", N = function (e) {
            if (t.currTemplate[B]) {
                var i = t.currTemplate[B].find("iframe");
                i.length && (e || (i[0].src = "//about:blank"), t.isIE8 && i.css("display", e ? "block" : "none"))
            }
        };
        e.magnificPopup.registerModule(B, {
            options: {
                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                srcAction: "iframe_src",
                patterns: {
                    youtube: {index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1"},
                    vimeo: {index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1"},
                    gmaps: {index: "//maps.google.", src: "%id%&output=embed"}
                }
            }, proto: {
                initIframe: function () {
                    t.types.push(B), w("BeforeChange", function (e, t, i) {
                        t !== i && (t === B ? N() : i === B && N(!0))
                    }), w(o + "." + B, function () {
                        N()
                    })
                }, getIframe: function (i, n) {
                    var s = i.src, r = t.st.iframe;
                    e.each(r.patterns, function () {
                        return s.indexOf(this.index) > -1 ? (this.id && (s = "string" == typeof this.id ? s.substr(s.lastIndexOf(this.id) + this.id.length, s.length) : this.id.call(this, s)), s = this.src.replace("%id%", s), !1) : void 0
                    });
                    var a = {};
                    return r.srcAction && (a[r.srcAction] = s), t._parseMarkup(n, a, i), t.updateStatus("ready"), n
                }
            }
        });
        var R = function (e) {
            var i = t.items.length;
            return e > i - 1 ? e - i : 0 > e ? i + e : e
        }, W = function (e, t, i) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
        };
        e.magnificPopup.registerModule("gallery", {
            options: {
                enabled: !1,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: !0,
                arrows: !0,
                tPrev: "Previous (Left arrow key)",
                tNext: "Next (Right arrow key)",
                tCounter: "%curr% of %total%"
            }, proto: {
                initGallery: function () {
                    var i = t.st.gallery, s = ".mfp-gallery";
                    return t.direction = !0, !(!i || !i.enabled) && (r += " mfp-gallery", w(c + s, function () {
                        i.navigateByImgClick && t.wrap.on("click" + s, ".mfp-img", function () {
                            return t.items.length > 1 ? (t.next(), !1) : void 0
                        }), n.on("keydown" + s, function (e) {
                            37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                        })
                    }), w("UpdateStatus" + s, function (e, i) {
                        i.text && (i.text = W(i.text, t.currItem.index, t.items.length))
                    }), w(u + s, function (e, n, s, r) {
                        var a = t.items.length;
                        s.counter = a > 1 ? W(i.tCounter, r.index, a) : ""
                    }), w("BuildControls" + s, function () {
                        if (t.items.length > 1 && i.arrows && !t.arrowLeft) {
                            var n = i.arrowMarkup,
                                s = t.arrowLeft = e(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(g),
                                r = t.arrowRight = e(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(g);
                            s.click(function () {
                                t.prev()
                            }), r.click(function () {
                                t.next()
                            }), t.container.append(s.add(r))
                        }
                    }), w(d + s, function () {
                        t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function () {
                            t.preloadNearbyImages(), t._preloadTimeout = null
                        }, 16)
                    }), void w(o + s, function () {
                        n.off(s), t.wrap.off("click" + s), t.arrowRight = t.arrowLeft = null
                    }))
                }, next: function () {
                    t.direction = !0, t.index = R(t.index + 1), t.updateItemHTML()
                }, prev: function () {
                    t.direction = !1, t.index = R(t.index - 1), t.updateItemHTML()
                }, goTo: function (e) {
                    t.direction = e >= t.index, t.index = e, t.updateItemHTML()
                }, preloadNearbyImages: function () {
                    var e, i = t.st.gallery.preload, n = Math.min(i[0], t.items.length),
                        s = Math.min(i[1], t.items.length);
                    for (e = 1; e <= (t.direction ? s : n); e++) t._preloadItem(t.index + e);
                    for (e = 1; e <= (t.direction ? n : s); e++) t._preloadItem(t.index - e)
                }, _preloadItem: function (i) {
                    if (i = R(i), !t.items[i].preloaded) {
                        var n = t.items[i];
                        n.parsed || (n = t.parseEl(i)), x("LazyLoad", n), "image" === n.type && (n.img = e('<img class="mfp-img" />').on("load.mfploader", function () {
                            n.hasSize = !0
                        }).on("error.mfploader", function () {
                            n.hasSize = !0, n.loadError = !0, x("LazyLoadError", n)
                        }).attr("src", n.src)), n.preloaded = !0
                    }
                }
            }
        });
        var F = "retina";
        e.magnificPopup.registerModule(F, {
            options: {
                replaceSrc: function (e) {
                    return e.src.replace(/\.\w+$/, function (e) {
                        return "@2x" + e
                    })
                }, ratio: 1
            }, proto: {
                initRetina: function () {
                    if (window.devicePixelRatio > 1) {
                        var e = t.st.retina, i = e.ratio;
                        (i = isNaN(i) ? i() : i) > 1 && (w("ImageHasSize." + F, function (e, t) {
                            t.img.css({"max-width": t.img[0].naturalWidth / i, width: "100%"})
                        }), w("ElementParse." + F, function (t, n) {
                            n.src = e.replaceSrc(n, i)
                        }))
                    }
                }
            }
        }), C()
    }), function (e) {
        var t = !0;
        e.flexslider = function (i, n) {
            var s = e(i);
            s.vars = e.extend({}, e.flexslider.defaults, n);
            var r, a = s.vars.namespace, o = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
                l = ("ontouchstart" in window || o || window.DocumentTouch && document instanceof DocumentTouch) && s.vars.touch,
                u = "click touchend MSPointerUp keyup", c = "", d = "vertical" === s.vars.direction, p = s.vars.reverse,
                h = s.vars.itemWidth > 0, f = "fade" === s.vars.animation, m = "" !== s.vars.asNavFor, g = {};
            e.data(i, "flexslider", s), g = {
                init: function () {
                    s.animating = !1, s.currentSlide = parseInt(s.vars.startAt ? s.vars.startAt : 0, 10), isNaN(s.currentSlide) && (s.currentSlide = 0), s.animatingTo = s.currentSlide, s.atEnd = 0 === s.currentSlide || s.currentSlide === s.last, s.containerSelector = s.vars.selector.substr(0, s.vars.selector.search(" ")), s.slides = e(s.vars.selector, s), s.container = e(s.containerSelector, s), s.count = s.slides.length, s.syncExists = e(s.vars.sync).length > 0, "slide" === s.vars.animation && (s.vars.animation = "swing"), s.prop = d ? "top" : "marginLeft", s.args = {}, s.manualPause = !1, s.stopped = !1, s.started = !1, s.startTimeout = null, s.transitions = !s.vars.video && !f && s.vars.useCSS && function () {
                        var e = document.createElement("div"),
                            t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                        for (var i in t) if (void 0 !== e.style[t[i]]) return s.pfx = t[i].replace("Perspective", "").toLowerCase(), s.prop = "-" + s.pfx + "-transform", !0;
                        return !1
                    }(), s.ensureAnimationEnd = "", "" !== s.vars.controlsContainer && (s.controlsContainer = e(s.vars.controlsContainer).length > 0 && e(s.vars.controlsContainer)), "" !== s.vars.manualControls && (s.manualControls = e(s.vars.manualControls).length > 0 && e(s.vars.manualControls)), "" !== s.vars.customDirectionNav && (s.customDirectionNav = 2 === e(s.vars.customDirectionNav).length && e(s.vars.customDirectionNav)), s.vars.randomize && (s.slides.sort(function () {
                        return Math.round(Math.random()) - .5
                    }), s.container.empty().append(s.slides)), s.doMath(), s.setup("init"), s.vars.controlNav && g.controlNav.setup(), s.vars.directionNav && g.directionNav.setup(), s.vars.keyboard && (1 === e(s.containerSelector).length || s.vars.multipleKeyboard) && e(document).bind("keyup", function (e) {
                        var t = e.keyCode;
                        if (!s.animating && (39 === t || 37 === t)) {
                            var i = 39 === t ? s.getTarget("next") : 37 === t && s.getTarget("prev");
                            s.flexAnimate(i, s.vars.pauseOnAction)
                        }
                    }), s.vars.mousewheel && s.bind("mousewheel", function (e, t, i, n) {
                        e.preventDefault();
                        var r = 0 > t ? s.getTarget("next") : s.getTarget("prev");
                        s.flexAnimate(r, s.vars.pauseOnAction)
                    }), s.vars.pausePlay && g.pausePlay.setup(), s.vars.slideshow && s.vars.pauseInvisible && g.pauseInvisible.init(), s.vars.slideshow && (s.vars.pauseOnHover && s.hover(function () {
                        s.manualPlay || s.manualPause || s.pause()
                    }, function () {
                        s.manualPause || s.manualPlay || s.stopped || s.play()
                    }), s.vars.pauseInvisible && g.pauseInvisible.isHidden() || (s.vars.initDelay > 0 ? s.startTimeout = setTimeout(s.play, s.vars.initDelay) : s.play())), m && g.asNav.setup(), l && s.vars.touch && g.touch(), (!f || f && s.vars.smoothHeight) && e(window).bind("resize orientationchange focus", g.resize), s.find("img").attr("draggable", "false"), setTimeout(function () {
                        s.vars.start(s)
                    }, 200)
                }, asNav: {
                    setup: function () {
                        s.asNav = !0, s.animatingTo = Math.floor(s.currentSlide / s.move), s.currentItem = s.currentSlide, s.slides.removeClass(a + "active-slide").eq(s.currentItem).addClass(a + "active-slide"), o ? (i._slider = s, s.slides.each(function () {
                            var t = this;
                            t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", function (e) {
                                e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                            }, !1), t.addEventListener("MSGestureTap", function (t) {
                                t.preventDefault();
                                var i = e(this), n = i.index();
                                e(s.vars.asNavFor).data("flexslider").animating || i.hasClass("active") || (s.direction = s.currentItem < n ? "next" : "prev", s.flexAnimate(n, s.vars.pauseOnAction, !1, !0, !0))
                            })
                        })) : s.slides.on(u, function (t) {
                            t.preventDefault();
                            var i = e(this), n = i.index();
                            0 >= i.offset().left - e(s).scrollLeft() && i.hasClass(a + "active-slide") ? s.flexAnimate(s.getTarget("prev"), !0) : e(s.vars.asNavFor).data("flexslider").animating || i.hasClass(a + "active-slide") || (s.direction = s.currentItem < n ? "next" : "prev", s.flexAnimate(n, s.vars.pauseOnAction, !1, !0, !0))
                        })
                    }
                }, controlNav: {
                    setup: function () {
                        s.manualControls ? g.controlNav.setupManual() : g.controlNav.setupPaging()
                    }, setupPaging: function () {
                        var t, i, n = "thumbnails" === s.vars.controlNav ? "control-thumbs" : "control-paging", r = 1;
                        if (s.controlNavScaffold = e('<ol class="' + a + "control-nav " + a + n + '"></ol>'), s.pagingCount > 1) for (var o = 0; o < s.pagingCount; o++) {
                            void 0 === (i = s.slides.eq(o)).attr("data-thumb-alt") && i.attr("data-thumb-alt", "");
                            var l = "" !== i.attr("data-thumb-alt") ? l = ' alt="' + i.attr("data-thumb-alt") + '"' : "";
                            if (t = "thumbnails" === s.vars.controlNav ? '<img src="' + i.attr("data-thumb") + '"' + l + "/>" : '<a href="#">' + r + "</a>", "thumbnails" === s.vars.controlNav && !0 === s.vars.thumbCaptions) {
                                var d = i.attr("data-thumbcaption");
                                "" !== d && void 0 !== d && (t += '<span class="' + a + 'caption">' + d + "</span>")
                            }
                            s.controlNavScaffold.append("<li>" + t + "</li>"), r++
                        }
                        s.controlsContainer ? e(s.controlsContainer).append(s.controlNavScaffold) : s.append(s.controlNavScaffold), g.controlNav.set(), g.controlNav.active(), s.controlNavScaffold.delegate("a, img", u, function (t) {
                            if (t.preventDefault(), "" === c || c === t.type) {
                                var i = e(this), n = s.controlNav.index(i);
                                i.hasClass(a + "active") || (s.direction = n > s.currentSlide ? "next" : "prev", s.flexAnimate(n, s.vars.pauseOnAction))
                            }
                            "" === c && (c = t.type), g.setToClearWatchedEvent()
                        })
                    }, setupManual: function () {
                        s.controlNav = s.manualControls, g.controlNav.active(), s.controlNav.bind(u, function (t) {
                            if (t.preventDefault(), "" === c || c === t.type) {
                                var i = e(this), n = s.controlNav.index(i);
                                i.hasClass(a + "active") || (n > s.currentSlide ? s.direction = "next" : s.direction = "prev", s.flexAnimate(n, s.vars.pauseOnAction))
                            }
                            "" === c && (c = t.type), g.setToClearWatchedEvent()
                        })
                    }, set: function () {
                        var t = "thumbnails" === s.vars.controlNav ? "img" : "a";
                        s.controlNav = e("." + a + "control-nav li " + t, s.controlsContainer ? s.controlsContainer : s)
                    }, active: function () {
                        s.controlNav.removeClass(a + "active").eq(s.animatingTo).addClass(a + "active")
                    }, update: function (t, i) {
                        s.pagingCount > 1 && "add" === t ? s.controlNavScaffold.append(e('<li><a href="#">' + s.count + "</a></li>")) : 1 === s.pagingCount ? s.controlNavScaffold.find("li").remove() : s.controlNav.eq(i).closest("li").remove(), g.controlNav.set(), s.pagingCount > 1 && s.pagingCount !== s.controlNav.length ? s.update(i, t) : g.controlNav.active()
                    }
                }, directionNav: {
                    setup: function () {
                        var t = e('<ul class="' + a + 'direction-nav"><li class="' + a + 'nav-prev"><a class="' + a + 'prev" href="#">' + s.vars.prevText + '</a></li><li class="' + a + 'nav-next"><a class="' + a + 'next" href="#">' + s.vars.nextText + "</a></li></ul>");
                        s.customDirectionNav ? s.directionNav = s.customDirectionNav : s.controlsContainer ? (e(s.controlsContainer).append(t), s.directionNav = e("." + a + "direction-nav li a", s.controlsContainer)) : (s.append(t), s.directionNav = e("." + a + "direction-nav li a", s)), g.directionNav.update(), s.directionNav.bind(u, function (t) {
                            t.preventDefault();
                            var i;
                            "" !== c && c !== t.type || (i = e(this).hasClass(a + "next") ? s.getTarget("next") : s.getTarget("prev"), s.flexAnimate(i, s.vars.pauseOnAction)), "" === c && (c = t.type), g.setToClearWatchedEvent()
                        })
                    }, update: function () {
                        var e = a + "disabled";
                        1 === s.pagingCount ? s.directionNav.addClass(e).attr("tabindex", "-1") : s.vars.animationLoop ? s.directionNav.removeClass(e).removeAttr("tabindex") : 0 === s.animatingTo ? s.directionNav.removeClass(e).filter("." + a + "prev").addClass(e).attr("tabindex", "-1") : s.animatingTo === s.last ? s.directionNav.removeClass(e).filter("." + a + "next").addClass(e).attr("tabindex", "-1") : s.directionNav.removeClass(e).removeAttr("tabindex")
                    }
                }, pausePlay: {
                    setup: function () {
                        var t = e('<div class="' + a + 'pauseplay"><a href="#"></a></div>');
                        s.controlsContainer ? (s.controlsContainer.append(t), s.pausePlay = e("." + a + "pauseplay a", s.controlsContainer)) : (s.append(t), s.pausePlay = e("." + a + "pauseplay a", s)), g.pausePlay.update(s.vars.slideshow ? a + "pause" : a + "play"), s.pausePlay.bind(u, function (t) {
                            t.preventDefault(), "" !== c && c !== t.type || (e(this).hasClass(a + "pause") ? (s.manualPause = !0, s.manualPlay = !1, s.pause()) : (s.manualPause = !1, s.manualPlay = !0, s.play())), "" === c && (c = t.type), g.setToClearWatchedEvent()
                        })
                    }, update: function (e) {
                        "play" === e ? s.pausePlay.removeClass(a + "pause").addClass(a + "play").html(s.vars.playText) : s.pausePlay.removeClass(a + "play").addClass(a + "pause").html(s.vars.pauseText)
                    }
                }, touch: function () {
                    var e, t, n, r, a, l, u, c, m, g = !1, v = 0, y = 0, b = 0;
                    o ? (i.style.msTouchAction = "none", i._gesture = new MSGesture, i._gesture.target = i, i.addEventListener("MSPointerDown", function (e) {
                        e.stopPropagation(), s.animating ? e.preventDefault() : (s.pause(), i._gesture.addPointer(e.pointerId), b = 0, r = d ? s.h : s.w, l = Number(new Date), n = h && p && s.animatingTo === s.last ? 0 : h && p ? s.limit - (s.itemW + s.vars.itemMargin) * s.move * s.animatingTo : h && s.currentSlide === s.last ? s.limit : h ? (s.itemW + s.vars.itemMargin) * s.move * s.currentSlide : p ? (s.last - s.currentSlide + s.cloneOffset) * r : (s.currentSlide + s.cloneOffset) * r)
                    }, !1), i._slider = s, i.addEventListener("MSGestureChange", function (e) {
                        e.stopPropagation();
                        var t = e.target._slider;
                        if (t) {
                            var s = -e.translationX, o = -e.translationY;
                            return b += d ? o : s, a = b, g = d ? Math.abs(b) < Math.abs(-s) : Math.abs(b) < Math.abs(-o), e.detail === e.MSGESTURE_FLAG_INERTIA ? void setImmediate(function () {
                                i._gesture.stop()
                            }) : void((!g || Number(new Date) - l > 500) && (e.preventDefault(), !f && t.transitions && (t.vars.animationLoop || (a = b / (0 === t.currentSlide && 0 > b || t.currentSlide === t.last && b > 0 ? Math.abs(b) / r + 2 : 1)), t.setProps(n + a, "setTouch"))))
                        }
                    }, !1), i.addEventListener("MSGestureEnd", function (i) {
                        i.stopPropagation();
                        var s = i.target._slider;
                        if (s) {
                            if (s.animatingTo === s.currentSlide && !g && null !== a) {
                                var o = p ? -a : a, u = o > 0 ? s.getTarget("next") : s.getTarget("prev");
                                s.canAdvance(u) && (Number(new Date) - l < 550 && Math.abs(o) > 50 || Math.abs(o) > r / 2) ? s.flexAnimate(u, s.vars.pauseOnAction) : f || s.flexAnimate(s.currentSlide, s.vars.pauseOnAction, !0)
                            }
                            e = null, t = null, a = null, n = null, b = 0
                        }
                    }, !1)) : (u = function (a) {
                        s.animating ? a.preventDefault() : (window.navigator.msPointerEnabled || 1 === a.touches.length) && (s.pause(), r = d ? s.h : s.w, l = Number(new Date), v = a.touches[0].pageX, y = a.touches[0].pageY, n = h && p && s.animatingTo === s.last ? 0 : h && p ? s.limit - (s.itemW + s.vars.itemMargin) * s.move * s.animatingTo : h && s.currentSlide === s.last ? s.limit : h ? (s.itemW + s.vars.itemMargin) * s.move * s.currentSlide : p ? (s.last - s.currentSlide + s.cloneOffset) * r : (s.currentSlide + s.cloneOffset) * r, e = d ? y : v, t = d ? v : y, i.addEventListener("touchmove", c, !1), i.addEventListener("touchend", m, !1))
                    }, c = function (i) {
                        v = i.touches[0].pageX, y = i.touches[0].pageY, a = d ? e - y : e - v;
                        (!(g = d ? Math.abs(a) < Math.abs(v - t) : Math.abs(a) < Math.abs(y - t)) || Number(new Date) - l > 500) && (i.preventDefault(), !f && s.transitions && (s.vars.animationLoop || (a /= 0 === s.currentSlide && 0 > a || s.currentSlide === s.last && a > 0 ? Math.abs(a) / r + 2 : 1), s.setProps(n + a, "setTouch")))
                    }, m = function (o) {
                        if (i.removeEventListener("touchmove", c, !1), s.animatingTo === s.currentSlide && !g && null !== a) {
                            var u = p ? -a : a, d = u > 0 ? s.getTarget("next") : s.getTarget("prev");
                            s.canAdvance(d) && (Number(new Date) - l < 550 && Math.abs(u) > 50 || Math.abs(u) > r / 2) ? s.flexAnimate(d, s.vars.pauseOnAction) : f || s.flexAnimate(s.currentSlide, s.vars.pauseOnAction, !0)
                        }
                        i.removeEventListener("touchend", m, !1), e = null, t = null, a = null, n = null
                    }, i.addEventListener("touchstart", u, !1))
                }, resize: function () {
                    !s.animating && s.is(":visible") && (h || s.doMath(), f ? g.smoothHeight() : h ? (s.slides.width(s.computedW), s.update(s.pagingCount), s.setProps()) : d ? (s.viewport.height(s.h), s.setProps(s.h, "setTotal")) : (s.vars.smoothHeight && g.smoothHeight(), s.newSlides.width(s.computedW), s.setProps(s.computedW, "setTotal")))
                }, smoothHeight: function (e) {
                    if (!d || f) {
                        var t = f ? s : s.viewport;
                        e ? t.animate({height: s.slides.eq(s.animatingTo).innerHeight()}, e) : t.innerHeight(s.slides.eq(s.animatingTo).innerHeight())
                    }
                }, sync: function (t) {
                    var i = e(s.vars.sync).data("flexslider"), n = s.animatingTo;
                    switch (t) {
                        case"animate":
                            i.flexAnimate(n, s.vars.pauseOnAction, !1, !0);
                            break;
                        case"play":
                            i.playing || i.asNav || i.play();
                            break;
                        case"pause":
                            i.pause()
                    }
                }, uniqueID: function (t) {
                    return t.filter("[id]").add(t.find("[id]")).each(function () {
                        var t = e(this);
                        t.attr("id", t.attr("id") + "_clone")
                    }), t
                }, pauseInvisible: {
                    visProp: null, init: function () {
                        var e = g.pauseInvisible.getHiddenProp();
                        if (e) {
                            var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
                            document.addEventListener(t, function () {
                                g.pauseInvisible.isHidden() ? s.startTimeout ? clearTimeout(s.startTimeout) : s.pause() : s.started ? s.play() : s.vars.initDelay > 0 ? setTimeout(s.play, s.vars.initDelay) : s.play()
                            })
                        }
                    }, isHidden: function () {
                        var e = g.pauseInvisible.getHiddenProp();
                        return !!e && document[e]
                    }, getHiddenProp: function () {
                        var e = ["webkit", "moz", "ms", "o"];
                        if ("hidden" in document) return "hidden";
                        for (var t = 0; t < e.length; t++) if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                        return null
                    }
                }, setToClearWatchedEvent: function () {
                    clearTimeout(r), r = setTimeout(function () {
                        c = ""
                    }, 3e3)
                }
            }, s.flexAnimate = function (t, i, n, r, o) {
                if (s.vars.animationLoop || t === s.currentSlide || (s.direction = t > s.currentSlide ? "next" : "prev"), m && 1 === s.pagingCount && (s.direction = s.currentItem < t ? "next" : "prev"), !s.animating && (s.canAdvance(t, o) || n) && s.is(":visible")) {
                    if (m && r) {
                        var u = e(s.vars.asNavFor).data("flexslider");
                        if (s.atEnd = 0 === t || t === s.count - 1, u.flexAnimate(t, !0, !1, !0, o), s.direction = s.currentItem < t ? "next" : "prev", u.direction = s.direction, Math.ceil((t + 1) / s.visible) - 1 === s.currentSlide || 0 === t) return s.currentItem = t, s.slides.removeClass(a + "active-slide").eq(t).addClass(a + "active-slide"), !1;
                        s.currentItem = t, s.slides.removeClass(a + "active-slide").eq(t).addClass(a + "active-slide"), t = Math.floor(t / s.visible)
                    }
                    if (s.animating = !0, s.animatingTo = t, i && s.pause(), s.vars.before(s), s.syncExists && !o && g.sync("animate"), s.vars.controlNav && g.controlNav.active(), h || s.slides.removeClass(a + "active-slide").eq(t).addClass(a + "active-slide"), s.atEnd = 0 === t || t === s.last, s.vars.directionNav && g.directionNav.update(), t === s.last && (s.vars.end(s), s.vars.animationLoop || s.pause()), f) l ? (s.slides.eq(s.currentSlide).css({
                        opacity: 0,
                        zIndex: 1
                    }), s.slides.eq(t).css({
                        opacity: 1,
                        zIndex: 2
                    }), s.wrapup(b)) : (s.slides.eq(s.currentSlide).css({zIndex: 1}).animate({opacity: 0}, s.vars.animationSpeed, s.vars.easing), s.slides.eq(t).css({zIndex: 2}).animate({opacity: 1}, s.vars.animationSpeed, s.vars.easing, s.wrapup)); else {
                        var c, v, y, b = d ? s.slides.filter(":first").height() : s.computedW;
                        h ? (c = s.vars.itemMargin, y = (s.itemW + c) * s.move * s.animatingTo, v = y > s.limit && 1 !== s.visible ? s.limit : y) : v = 0 === s.currentSlide && t === s.count - 1 && s.vars.animationLoop && "next" !== s.direction ? p ? (s.count + s.cloneOffset) * b : 0 : s.currentSlide === s.last && 0 === t && s.vars.animationLoop && "prev" !== s.direction ? p ? 0 : (s.count + 1) * b : p ? (s.count - 1 - t + s.cloneOffset) * b : (t + s.cloneOffset) * b, s.setProps(v, "", s.vars.animationSpeed), s.transitions ? (s.vars.animationLoop && s.atEnd || (s.animating = !1, s.currentSlide = s.animatingTo), s.container.unbind("webkitTransitionEnd transitionend"), s.container.bind("webkitTransitionEnd transitionend", function () {
                            clearTimeout(s.ensureAnimationEnd), s.wrapup(b)
                        }), clearTimeout(s.ensureAnimationEnd), s.ensureAnimationEnd = setTimeout(function () {
                            s.wrapup(b)
                        }, s.vars.animationSpeed + 100)) : s.container.animate(s.args, s.vars.animationSpeed, s.vars.easing, function () {
                            s.wrapup(b)
                        })
                    }
                    s.vars.smoothHeight && g.smoothHeight(s.vars.animationSpeed)
                }
            }, s.wrapup = function (e) {
                f || h || (0 === s.currentSlide && s.animatingTo === s.last && s.vars.animationLoop ? s.setProps(e, "jumpEnd") : s.currentSlide === s.last && 0 === s.animatingTo && s.vars.animationLoop && s.setProps(e, "jumpStart")), s.animating = !1, s.currentSlide = s.animatingTo, s.vars.after(s)
            }, s.animateSlides = function () {
                !s.animating && t && s.flexAnimate(s.getTarget("next"))
            }, s.pause = function () {
                clearInterval(s.animatedSlides), s.animatedSlides = null, s.playing = !1, s.vars.pausePlay && g.pausePlay.update("play"), s.syncExists && g.sync("pause")
            }, s.play = function () {
                s.playing && clearInterval(s.animatedSlides), s.animatedSlides = s.animatedSlides || setInterval(s.animateSlides, s.vars.slideshowSpeed), s.started = s.playing = !0, s.vars.pausePlay && g.pausePlay.update("pause"), s.syncExists && g.sync("play")
            }, s.stop = function () {
                s.pause(), s.stopped = !0
            }, s.canAdvance = function (e, t) {
                var i = m ? s.pagingCount - 1 : s.last;
                return !!t || (!(!m || s.currentItem !== s.count - 1 || 0 !== e || "prev" !== s.direction) || (!m || 0 !== s.currentItem || e !== s.pagingCount - 1 || "next" === s.direction) && (!(e === s.currentSlide && !m) && (!!s.vars.animationLoop || (!s.atEnd || 0 !== s.currentSlide || e !== i || "next" === s.direction) && (!s.atEnd || s.currentSlide !== i || 0 !== e || "next" !== s.direction))))
            }, s.getTarget = function (e) {
                return s.direction = e, "next" === e ? s.currentSlide === s.last ? 0 : s.currentSlide + 1 : 0 === s.currentSlide ? s.last : s.currentSlide - 1
            }, s.setProps = function (e, t, i) {
                var n = function () {
                    var i = e || (s.itemW + s.vars.itemMargin) * s.move * s.animatingTo;
                    return -1 * function () {
                        if (h) return "setTouch" === t ? e : p && s.animatingTo === s.last ? 0 : p ? s.limit - (s.itemW + s.vars.itemMargin) * s.move * s.animatingTo : s.animatingTo === s.last ? s.limit : i;
                        switch (t) {
                            case"setTotal":
                                return p ? (s.count - 1 - s.currentSlide + s.cloneOffset) * e : (s.currentSlide + s.cloneOffset) * e;
                            case"setTouch":
                                return e;
                            case"jumpEnd":
                                return p ? e : s.count * e;
                            case"jumpStart":
                                return p ? s.count * e : e;
                            default:
                                return e
                        }
                    }() + "px"
                }();
                s.transitions && (n = d ? "translate3d(0," + n + ",0)" : "translate3d(" + n + ",0,0)", i = void 0 !== i ? i / 1e3 + "s" : "0s", s.container.css("-" + s.pfx + "-transition-duration", i), s.container.css("transition-duration", i)), s.args[s.prop] = n, (s.transitions || void 0 === i) && s.container.css(s.args), s.container.css("transform", n)
            }, s.setup = function (t) {
                if (f) s.slides.css({
                    width: "100%",
                    float: "left",
                    marginRight: "-100%",
                    position: "relative"
                }), "init" === t && (l ? s.slides.css({
                    opacity: 0,
                    display: "block",
                    webkitTransition: "opacity " + s.vars.animationSpeed / 1e3 + "s ease",
                    zIndex: 1
                }).eq(s.currentSlide).css({
                    opacity: 1,
                    zIndex: 2
                }) : 0 == s.vars.fadeFirstSlide ? s.slides.css({
                    opacity: 0,
                    display: "block",
                    zIndex: 1
                }).eq(s.currentSlide).css({zIndex: 2}).css({opacity: 1}) : s.slides.css({
                    opacity: 0,
                    display: "block",
                    zIndex: 1
                }).eq(s.currentSlide).css({zIndex: 2}).animate({opacity: 1}, s.vars.animationSpeed, s.vars.easing)), s.vars.smoothHeight && g.smoothHeight(); else {
                    var i, n;
                    "init" === t && (s.viewport = e('<div class="' + a + 'viewport"></div>').css({
                        overflow: "hidden",
                        position: "relative"
                    }).appendTo(s).append(s.container), s.cloneCount = 0, s.cloneOffset = 0, p && (n = e.makeArray(s.slides).reverse(), s.slides = e(n), s.container.empty().append(s.slides))), s.vars.animationLoop && !h && (s.cloneCount = 2, s.cloneOffset = 1, "init" !== t && s.container.find(".clone").remove(), s.container.append(g.uniqueID(s.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(g.uniqueID(s.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), s.newSlides = e(s.vars.selector, s), i = p ? s.count - 1 - s.currentSlide + s.cloneOffset : s.currentSlide + s.cloneOffset, d && !h ? (s.container.height(200 * (s.count + s.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
                        s.newSlides.css({display: "block"}), s.doMath(), s.viewport.height(s.h), s.setProps(i * s.h, "init")
                    }, "init" === t ? 100 : 0)) : (s.container.width(200 * (s.count + s.cloneCount) + "%"), s.setProps(i * s.computedW, "init"), setTimeout(function () {
                        s.doMath(), s.newSlides.css({
                            width: s.computedW,
                            marginRight: s.computedM,
                            float: "left",
                            display: "block"
                        }), s.vars.smoothHeight && g.smoothHeight()
                    }, "init" === t ? 100 : 0))
                }
                h || s.slides.removeClass(a + "active-slide").eq(s.currentSlide).addClass(a + "active-slide"), s.vars.init(s)
            }, s.doMath = function () {
                var e = s.slides.first(), t = s.vars.itemMargin, i = s.vars.minItems, n = s.vars.maxItems;
                s.w = void 0 === s.viewport ? s.width() : s.viewport.width(), s.h = e.height(), s.boxPadding = e.outerWidth() - e.width(), h ? (s.itemT = s.vars.itemWidth + t, s.itemM = t, s.minW = i ? i * s.itemT : s.w, s.maxW = n ? n * s.itemT - t : s.w, s.itemW = s.minW > s.w ? (s.w - t * (i - 1)) / i : s.maxW < s.w ? (s.w - t * (n - 1)) / n : s.vars.itemWidth > s.w ? s.w : s.vars.itemWidth, s.visible = Math.floor(s.w / s.itemW), s.move = s.vars.move > 0 && s.vars.move < s.visible ? s.vars.move : s.visible, s.pagingCount = Math.ceil((s.count - s.visible) / s.move + 1), s.last = s.pagingCount - 1, s.limit = 1 === s.pagingCount ? 0 : s.vars.itemWidth > s.w ? s.itemW * (s.count - 1) + t * (s.count - 1) : (s.itemW + t) * s.count - s.w - t) : (s.itemW = s.w, s.itemM = t, s.pagingCount = s.count, s.last = s.count - 1), s.computedW = s.itemW - s.boxPadding, s.computedM = s.itemM
            }, s.update = function (e, t) {
                s.doMath(), h || (e < s.currentSlide ? s.currentSlide += 1 : e <= s.currentSlide && 0 !== e && (s.currentSlide -= 1), s.animatingTo = s.currentSlide), s.vars.controlNav && !s.manualControls && ("add" === t && !h || s.pagingCount > s.controlNav.length ? g.controlNav.update("add") : ("remove" === t && !h || s.pagingCount < s.controlNav.length) && (h && s.currentSlide > s.last && (s.currentSlide -= 1, s.animatingTo -= 1), g.controlNav.update("remove", s.last))), s.vars.directionNav && g.directionNav.update()
            }, s.addSlide = function (t, i) {
                var n = e(t);
                s.count += 1, s.last = s.count - 1, d && p ? void 0 !== i ? s.slides.eq(s.count - i).after(n) : s.container.prepend(n) : void 0 !== i ? s.slides.eq(i).before(n) : s.container.append(n), s.update(i, "add"), s.slides = e(s.vars.selector + ":not(.clone)", s), s.setup(), s.vars.added(s)
            }, s.removeSlide = function (t) {
                var i = isNaN(t) ? s.slides.index(e(t)) : t;
                s.count -= 1, s.last = s.count - 1, isNaN(t) ? e(t, s.slides).remove() : d && p ? s.slides.eq(s.last).remove() : s.slides.eq(t).remove(), s.doMath(), s.update(i, "remove"), s.slides = e(s.vars.selector + ":not(.clone)", s), s.setup(), s.vars.removed(s)
            }, g.init()
        }, e(window).blur(function (e) {
            t = !1
        }).focus(function (e) {
            t = !0
        }), e.flexslider.defaults = {
            namespace: "flex-",
            selector: ".slides > li",
            animation: "fade",
            easing: "swing",
            direction: "horizontal",
            reverse: !1,
            animationLoop: !0,
            smoothHeight: !1,
            startAt: 0,
            slideshow: !0,
            slideshowSpeed: 7e3,
            animationSpeed: 600,
            initDelay: 0,
            randomize: !1,
            fadeFirstSlide: !0,
            thumbCaptions: !1,
            pauseOnAction: !0,
            pauseOnHover: !1,
            pauseInvisible: !0,
            useCSS: !0,
            touch: !0,
            video: !1,
            controlNav: !0,
            directionNav: !0,
            prevText: "Previous",
            nextText: "Next",
            keyboard: !0,
            multipleKeyboard: !1,
            mousewheel: !1,
            pausePlay: !1,
            pauseText: "Pause",
            playText: "Play",
            controlsContainer: "",
            manualControls: "",
            customDirectionNav: "",
            sync: "",
            asNavFor: "",
            itemWidth: 0,
            itemMargin: 0,
            minItems: 1,
            maxItems: 0,
            move: 0,
            allowOneSlide: !0,
            start: function () {
            },
            before: function () {
            },
            after: function () {
            },
            end: function () {
            },
            added: function () {
            },
            removed: function () {
            },
            init: function () {
            }
        }, e.fn.flexslider = function (t) {
            if (void 0 === t && (t = {}), "object" == typeof t) return this.each(function () {
                var i = e(this), n = t.selector ? t.selector : ".slides > li", s = i.find(n);
                1 === s.length && !1 === t.allowOneSlide || 0 === s.length ? (s.fadeIn(400), t.start && t.start(i)) : void 0 === i.data("flexslider") && new e.flexslider(this, t)
            });
            var i = e(this).data("flexslider");
            switch (t) {
                case"play":
                    i.play();
                    break;
                case"pause":
                    i.pause();
                    break;
                case"stop":
                    i.stop();
                    break;
                case"next":
                    i.flexAnimate(i.getTarget("next"), !0);
                    break;
                case"prev":
                case"previous":
                    i.flexAnimate(i.getTarget("prev"), !0);
                    break;
                default:
                    "number" == typeof t && i.flexAnimate(t, !0)
            }
        }
    }(jQuery), function (e) {
        e.fn.pajinate = function (t) {
            function i(i) {
                new_page = parseInt(u.data(m)) - 1, 1 == e(i).siblings(".active").prev(".page_link").length ? (a(i, new_page), s(new_page)) : t.wrap_around && s(f - 1)
            }

            function n(i) {
                new_page = parseInt(u.data(m)) + 1, 1 == e(i).siblings(".active").next(".page_link").length ? (r(i, new_page), s(new_page)) : t.wrap_around && s(0)
            }

            function s(e) {
                e = parseInt(e, 10);
                var i = parseInt(u.data(g));
                start_from = e * i, end_on = start_from + i;
                var n = p.hide().slice(start_from, end_on);
                n.fadeIn(700), d.find(t.nav_panel_id).children(".page_link[longdesc=" + e + "]").addClass("active " + b).siblings(".active").removeClass("active " + b), u.data(m, e);
                var s = parseInt(u.data(m) + 1), r = c.children().size(), a = Math.ceil(r / t.items_per_page);
                d.find(t.nav_info_id).html(t.nav_label_info.replace("{0}", start_from + 1).replace("{1}", start_from + n.length).replace("{2}", p.length).replace("{3}", s).replace("{4}", a)), o(), l(), void 0 !== t.onPageDisplayed && t.onPageDisplayed.call(this, e + 1)
            }

            function r(i, n) {
                var s = n;
                "none" == e(i).siblings(".active").siblings(".page_link[longdesc=" + s + "]").css("display") && h.each(function () {
                    e(this).children(".page_link").hide().slice(parseInt(s - t.num_page_links_to_display + 1), s + 1).show()
                })
            }

            function a(i, n) {
                var s = n;
                "none" == e(i).siblings(".active").siblings(".page_link[longdesc=" + s + "]").css("display") && h.each(function () {
                    e(this).children(".page_link").hide().slice(s, s + parseInt(t.num_page_links_to_display)).show()
                })
            }

            function o() {
            }

            function l() {
                h.children(".last").hasClass("active") ? h.children(".next_link").add(".last_link").addClass("no_more " + w) : h.children(".next_link").add(".last_link").removeClass("no_more " + w), h.children(".first").hasClass("active") ? h.children(".previous_link").add(".first_link").addClass("no_more " + w) : h.children(".previous_link").add(".first_link").removeClass("no_more " + w)
            }

            var u, c, d, p, h, f, m = "current_page", g = "items_per_page", v = {
                    item_container_id: ".content",
                    items_per_page: 10,
                    nav_panel_id: ".page_navigation",
                    nav_info_id: ".info_text",
                    num_page_links_to_display: 20,
                    start_page: 0,
                    wrap_around: !1,
                    nav_label_first: "First",
                    nav_label_prev: "Prev",
                    nav_label_next: "Next",
                    nav_label_last: "Last",
                    nav_order: ["first", "prev", "num", "next", "last"],
                    nav_label_info: "Showing {0}-{1} of {2} results",
                    show_first_last: !0,
                    abort_on_small_lists: !1,
                    jquery_ui: !1,
                    jquery_ui_active: "ui-state-highlight",
                    jquery_ui_default: "ui-state-default",
                    jquery_ui_disabled: "ui-state-disabled"
                }, y = (t = e.extend(v, t)).jquery_ui ? t.jquery_ui_default : "", b = t.jquery_ui ? t.jquery_ui_active : "",
                w = t.jquery_ui ? t.jquery_ui_disabled : "";
            return this.each(function () {
                if (d = e(this), c = e(this).find(t.item_container_id), p = d.find(t.item_container_id).children(), t.abort_on_small_lists && t.items_per_page >= p.size()) return d;
                (u = d).data(m, 0), u.data(g, t.items_per_page);
                for (var v = c.children().size(), w = Math.ceil(v / t.items_per_page), T = t.show_first_last ? '<li class="first_link ' + y + '"><a href="#">' + t.nav_label_first + "</a></li>" : "", x = t.show_first_last ? '<li class="last_link ' + y + '"><a href="#">' + t.nav_label_last + "</a></li>" : "", _ = "", C = 0; C < t.nav_order.length; C++) switch (t.nav_order[C]) {
                    case"first":
                        _ += T;
                        break;
                    case"last":
                        _ += x;
                        break;
                    case"next":
                        _ += '<li class="next_link ' + y + '"><a href="#">' + t.nav_label_next + "</a></li>";
                        break;
                    case"prev":
                        _ += '<li class="previous_link ' + y + '"><a href="#">' + t.nav_label_prev + "</a></li>";
                        break;
                    case"num":
                        _ += '<li class="disabled ellipse less"><span>...</span></li>';
                        for (var S = 0; w > S;) _ += '<li class="page_link ' + y + '" longdesc="' + S + '"><a href="#">' + (S + 1) + "</a></li>", S++;
                        _ += '<li class="disabled ellipse more"><span>...</span></li>'
                }
                (h = d.find(t.nav_panel_id)).html(_).each(function () {
                    e(this).find(".page_link:first").addClass("first"), e(this).find(".page_link:last").addClass("last")
                }), h.children(".ellipse").hide(), h.find(".previous_link").next().next().addClass("active " + b), p.hide(), p.slice(0, u.data(g)).show(), f = d.find(t.nav_panel_id + ":first").children(".page_link").size(), t.num_page_links_to_display = Math.min(t.num_page_links_to_display, f), h.children(".page_link").hide(), h.each(function () {
                    e(this).children(".page_link").slice(0, t.num_page_links_to_display).show()
                }), d.find(".first_link").click(function (t) {
                    t.preventDefault(), a(e(this), 0), s(0)
                }), d.find(".last_link").click(function (t) {
                    t.preventDefault();
                    var i = f - 1;
                    r(e(this), i), s(i)
                }), d.find(".previous_link").click(function (t) {
                    t.preventDefault(), i(e(this))
                }), d.find(".next_link").click(function (t) {
                    t.preventDefault(), n(e(this))
                }), d.find(".page_link").click(function (t) {
                    t.preventDefault(), s(e(this).attr("longdesc"))
                }), s(parseInt(t.start_page)), o(), t.wrap_around || l()
            })
        }
    }(jQuery), function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
    }(function (e, t) {
        "use strict";
        e.infinitescroll = function (t, i, n) {
            this.element = e(n), this._create(t, i) || (this.failed = !0)
        }, e.infinitescroll.defaults = {
            loading: {
                finished: t,
                finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
                img: "data:image/gif;base64,R0lGODlh3AATAPQeAPDy+MnQ6LW/4N3h8MzT6rjC4sTM5r/I5NHX7N7j8c7U6tvg8OLl8uXo9Ojr9b3G5MfP6Ovu9tPZ7PT1+vX2+tbb7vf4+8/W69jd7rC73vn5/O/x+K243ai02////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgD/ACwAAAAA3AATAAAF/6AnjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEj0BAScpHLJbDqf0Kh0Sq1ar9isdioItAKGw+MAKYMFhbF63CW438f0mg1R2O8EuXj/aOPtaHx7fn96goR4hmuId4qDdX95c4+RBIGCB4yAjpmQhZN0YGYGXitdZBIVGAsLoq4BBKQDswm1CQRkcG6ytrYKubq8vbfAcMK9v7q7EMO1ycrHvsW6zcTKsczNz8HZw9vG3cjTsMIYqQkCLBwHCgsMDQ4RDAYIqfYSFxDxEfz88/X38Onr16+Bp4ADCco7eC8hQYMAEe57yNCew4IVBU7EGNDiRn8Z831cGLHhSIgdFf9chIeBg7oA7gjaWUWTVQAGE3LqBDCTlc9WOHfm7PkTqNCh54rePDqB6M+lR536hCpUqs2gVZM+xbrTqtGoWqdy1emValeXKzggYBBB5y1acFNZmEvXAoN2cGfJrTv3bl69Ffj2xZt3L1+/fw3XRVw4sGDGcR0fJhxZsF3KtBTThZxZ8mLMgC3fRatCbYMNFCzwLEqLgE4NsDWs/tvqdezZf13Hvk2A9Szdu2X3pg18N+68xXn7rh1c+PLksI/Dhe6cuO3ow3NfV92bdArTqC2Ebd3A8vjf5QWfH6Bg7Nz17c2fj69+fnq+8N2Lty+fuP78/eV2X13neIcCeBRwxorbZrA1ANoCDGrgoG8RTshahQ9iSKEEzUmYIYfNWViUhheCGJyIP5E4oom7WWjgCeBFAJNv1DVV01MAdJhhjdkplWNzO/5oXI846njjVEIqR2OS2B1pE5PVscajkxhMycqLJghQSwT40PgfAl4GqNSXYdZXJn5gSkmmmmJu1aZYb14V51do+pTOCmA40AqVCIhG5IJ9PvYnhIFOxmdqhpaI6GeHCtpooisuutmg+Eg62KOMKuqoTaXgicQWoIYq6qiklmoqFV0UoeqqrLbq6quwxirrrLTWauutJ4QAACH5BAUKABwALAcABADOAAsAAAX/IPd0D2dyRCoUp/k8gpHOKtseR9yiSmGbuBykler9XLAhkbDavXTL5k2oqFqNOxzUZPU5YYZd1XsD72rZpBjbeh52mSNnMSC8lwblKZGwi+0QfIJ8CncnCoCDgoVnBHmKfByGJimPkIwtiAeBkH6ZHJaKmCeVnKKTHIihg5KNq4uoqmEtcRUtEREMBggtEr4QDrjCuRC8h7/BwxENeicSF8DKy82pyNLMOxzWygzFmdvD2L3P0dze4+Xh1Arkyepi7dfFvvTtLQkZBC0T/FX3CRgCMOBHsJ+EHYQY7OinAGECgQsB+Lu3AOK+CewcWjwxQeJBihtNGHSoQOE+iQ3//4XkwBBhRZMcUS6YSXOAwIL8PGqEaSJCiYt9SNoCmnJPAgUVLChdaoFBURN8MAzl2PQphwQLfDFd6lTowglHve6rKpbjhK7/pG5VinZP1qkiz1rl4+tr2LRwWU64cFEihwEtZgbgR1UiHaMVvxpOSwBA37kzGz9e8G+B5MIEKLutOGEsAH2ATQwYfTmuX8aETWdGPZmiZcccNSzeTCA1Sw0bdiitC7LBWgu8jQr8HRzqgpK6gX88QbrB14z/kF+ELpwB8eVQj/JkqdylAudji/+ts3039vEEfK8Vz2dlvxZKG0CmbkKDBvllRd6fCzDvBLKBDSCeffhRJEFebFk1k/Mv9jVIoIJZSeBggwUaNeB+Qk34IE0cXlihcfRxkOAJFFhwGmKlmWDiakZhUJtnLBpnWWcnKaAZcxI0piFGGLBm1mc90kajSCveeBVWKeYEoU2wqeaQi0PetoE+rr14EpVC7oAbAUHqhYExbn2XHHsVqbcVew9tx8+XJKk5AZsqqdlddGpqAKdbAYBn1pcczmSTdWvdmZ17c1b3FZ99vnTdCRFM8OEcAhLwm1NdXnWcBBSMRWmfkWZqVlsmLIiAp/o1gGV2vpS4lalGYsUOqXrddcKCmK61aZ8SjEpUpVFVoCpTj4r661Km7kBHjrDyc1RAIQAAIfkEBQoAGwAsBwAEAM4ACwAABf/gtmUCd4goQQgFKj6PYKi0yrrbc8i4ohQt12EHcal+MNSQiCP8gigdz7iCioaCIvUmZLp8QBzW0EN2vSlCuDtFKaq4RyHzQLEKZNdiQDhRDVooCwkbfm59EAmKi4SGIm+AjIsKjhsqB4mSjT2IOIOUnICeCaB/mZKFNTSRmqVpmJqklSqskq6PfYYCDwYHDC4REQwGCBLGxxIQDsHMwhAIX8bKzcENgSLGF9PU1j3Sy9zX2NrgzQziChLk1BHWxcjf7N046tvN82715czn9Pryz6Ilc4ACj4EBOCZM8KEnAYYADBRKnACAYUMFv1wotIhCEcaJCisqwJFgAUSQGyX/kCSVUUTIdKMwJlyo0oXHlhskwrTJciZHEXsgaqS4s6PJiCAr1uzYU8kBBSgnWFqpoMJMUjGtDmUwkmfVmVypakWhEKvXsS4nhLW5wNjVroJIoc05wSzTr0PtiigpYe4EC2vj4iWrFu5euWIMRBhacaVJhYQBEFjA9jHjyQ0xEABwGceGAZYjY0YBOrRLCxUp29QM+bRkx5s7ZyYgVbTqwwti2ybJ+vLtDYpycyZbYOlptxdx0kV+V7lC5iJAyyRrwYKxAdiz82ng0/jnAdMJFz0cPi104Ec1Vj9/M6F173vKL/feXv156dw11tlqeMMnv4V5Ap53GmjQQH97nFfg+IFiucfgRX5Z8KAgbUlQ4IULIlghhhdOSB6AgX0IVn8eReghen3NRIBsRgnH4l4LuEidZBjwRpt6NM5WGwoW0KSjCwX6yJSMab2GwwAPDXfaBCtWpluRTQqC5JM5oUZAjUNS+VeOLWpJEQ7VYQANW0INJSZVDFSnZphjSikfmzE5N4EEbQI1QJmnWXCmHulRp2edwDXF43txukenJwvI9xyg9Q26Z3MzGUcBYFEChZh6DVTq34AU8Iflh51Sd+CnKFYQ6mmZkhqfBKfSxZWqA9DZanWjxmhrWwi0qtCrt/43K6WqVjjpmhIqgEGvculaGKklKstAACEAACH5BAUKABwALAcABADOAAsAAAX/ICdyQmaMYyAUqPgIBiHPxNpy79kqRXH8wAPsRmDdXpAWgWdEIYm2llCHqjVHU+jjJkwqBTecwItShMXkEfNWSh8e1NGAcLgpDGlRgk7EJ/6Ae3VKfoF/fDuFhohVeDeCfXkcCQqDVQcQhn+VNDOYmpSWaoqBlUSfmowjEA+iEAEGDRGztAwGCDcXEA60tXEiCrq8vREMEBLIyRLCxMWSHMzExnbRvQ2Sy7vN0zvVtNfU2tLY3rPgLdnDvca4VQS/Cpk3ABwSLQkYAQwT/P309vcI7OvXr94jBQMJ/nskkGA/BQBRLNDncAIAiDcG6LsxAWOLiQzmeURBKWSLCQbv/1F0eDGinJUKR47YY1IEgQASKk7Yc7ACRwZm7mHweRJoz59BJUogisKCUaFMR0x4SlJBVBFTk8pZivTR0K73rN5wqlXEAq5Fy3IYgHbEzQ0nLy4QSoCjXLoom96VOJEeCosK5n4kkFfqXjl94wa+l1gvAcGICbewAOAxY8l/Ky/QhAGz4cUkGxu2HNozhwMGBnCUqUdBg9UuW9eUynqSwLHIBujePef1ZGQZXcM+OFuEBeBhi3OYgLyqcuaxbT9vLkf4SeqyWxSQpKGB2gQpm1KdWbu72rPRzR9Ne2Nu9Kzr/1Jqj0yD/fvqP4aXOt5sW/5qsXXVcv1Nsp8IBUAmgswGF3llGgeU1YVXXKTN1FlhWFXW3gIE+DVChApysACHHo7Q4A35lLichh+ROBmLKAzgYmYEYDAhCgxKGOOMn4WR4kkDaoBBOxJtdNKQxFmg5JIWIBnQc07GaORfUY4AEkdV6jHlCEISSZ5yTXpp1pbGZbkWmcuZmQCaE6iJ0FhjMaDjTMsgZaNEHFRAQVp3bqXnZED1qYcECOz5V6BhSWCoVJQIKuKQi2KFKEkEFAqoAo7uYSmO3jk61wUUMKmknJ4SGimBmAa0qVQBhAAAIfkEBQoAGwAsBwAEAM4ACwAABf/gJm5FmRlEqhJC+bywgK5pO4rHI0D3pii22+Mg6/0Ej96weCMAk7cDkXf7lZTTnrMl7eaYoy10JN0ZFdco0XAuvKI6qkgVFJXYNwjkIBcNBgR8TQoGfRsJCRuCYYQQiI+ICosiCoGOkIiKfSl8mJkHZ4U9kZMbKaI3pKGXmJKrngmug4WwkhA0lrCBWgYFCCMQFwoQDRHGxwwGCBLMzRLEx8iGzMMO0cYNeCMKzBDW19lnF9DXDIY/48Xg093f0Q3s1dcR8OLe8+Y91OTv5wrj7o7B+7VNQqABIoRVCMBggsOHE36kSoCBIcSH3EbFangxogJYFi8CkJhqQciLJEf/LDDJEeJIBT0GsOwYUYJGBS0fjpQAMidGmyVP6sx4Y6VQhzs9VUwkwqaCCh0tmKoFtSMDmBOf9phg4SrVrROuasRQAaxXpVUhdsU6IsECZlvX3kwLUWzRt0BHOLTbNlbZG3vZinArge5Dvn7wbqtQkSYAAgtKmnSsYKVKo2AfW048uaPmG386i4Q8EQMBAIAnfB7xBxBqvapJ9zX9WgRS2YMpnvYMGdPK3aMjt/3dUcNI4blpj7iwkMFWDXDvSmgAlijrt9RTR78+PS6z1uAJZIe93Q8g5zcsWCi/4Y+C8bah5zUv3vv89uft30QP23punGCx5954oBBwnwYaNCDY/wYrsYeggnM9B2Fpf8GG2CEUVWhbWAtGouEGDy7Y4IEJVrbSiXghqGKIo7z1IVcXIkKWWR361QOLWWnIhwERpLaaCCee5iMBGJQmJGyPFTnbkfHVZGRtIGrg5HALEJAZbu39BuUEUmq1JJQIPtZilY5hGeSWsSk52G9XqsmgljdIcABytq13HyIM6RcUA+r1qZ4EBF3WHWB29tBgAzRhEGhig8KmqKFv8SeCeo+mgsF7YFXa1qWSbkDpom/mqR1PmHCqJ3fwNRVXjC7S6CZhFVCQ2lWvZiirhQq42SACt25IK2hv8TprriUV1usGgeka7LFcNmCldMLi6qZMgFLgpw16Cipb7bC1knXsBiEAACH5BAUKABsALAcABADOAAsAAAX/4FZsJPkUmUGsLCEUTywXglFuSg7fW1xAvNWLF6sFFcPb42C8EZCj24EJdCp2yoegWsolS0Uu6fmamg8n8YYcLU2bXSiRaXMGvqV6/KAeJAh8VgZqCX+BexCFioWAYgqNi4qAR4ORhRuHY408jAeUhAmYYiuVlpiflqGZa5CWkzc5fKmbbhIpsAoQDRG8vQwQCBLCwxK6vb5qwhfGxxENahvCEA7NzskSy7vNzzzK09W/PNHF1NvX2dXcN8K55cfh69Luveol3vO8zwi4Yhj+AQwmCBw4IYclDAAJDlQggVOChAoLKkgFkSCAHDwWLKhIEOONARsDKryogFPIiAUb/95gJNIiw4wnI778GFPhzBKFOAq8qLJEhQpiNArjMcHCmlTCUDIouTKBhApELSxFWiGiVKY4E2CAekPgUphDu0742nRrVLJZnyrFSqKQ2ohoSYAMW6IoDpNJ4bLdILTnAj8KUF7UeENjAKuDyxIgOuGiOI0EBBMgLNew5AUrDTMGsFixwBIaNCQuAXJB57qNJ2OWm2Aj4skwCQCIyNkhhtMkdsIuodE0AN4LJDRgfLPtn5YDLdBlraAByuUbBgxQwICxMOnYpVOPej074OFdlfc0TqC62OIbcppHjV4o+LrieWhfT8JC/I/T6W8oCl29vQ0XjLdBaA3s1RcPBO7lFvpX8BVoG4O5jTXRQRDuJ6FDTzEWF1/BCZhgbyAKE9qICYLloQYOFtahVRsWYlZ4KQJHlwHS/IYaZ6sZd9tmu5HQm2xi1UaTbzxYwJk/wBF5g5EEYOBZeEfGZmNdFyFZmZIR4jikbLThlh5kUUVJGmRT7sekkziRWUIACABk3T4qCsedgO4xhgGcY7q5pHJ4klBBTQRJ0CeHcoYHHUh6wgfdn9uJdSdMiebGJ0zUPTcoS286FCkrZxnYoYYKWLkBowhQoBeaOlZAgVhLidrXqg2GiqpQpZ4apwSwRtjqrB3muoF9BboaXKmshlqWqsWiGt2wphJkQbAU5hoCACH5BAUKABsALAcABADOAAsAAAX/oGFw2WZuT5oZROsSQnGaKjRvilI893MItlNOJ5v5gDcFrHhKIWcEYu/xFEqNv6B1N62aclysF7fsZYe5aOx2yL5aAUGSaT1oTYMBwQ5VGCAJgYIJCnx1gIOBhXdwiIl7d0p2iYGQUAQBjoOFSQR/lIQHnZ+Ue6OagqYzSqSJi5eTpTxGcjcSChANEbu8DBAIEsHBChe5vL13G7fFuscRDcnKuM3H0La3EA7Oz8kKEsXazr7Cw9/Gztar5uHHvte47MjktznZ2w0G1+D3BgirAqJmJMAQgMGEgwgn5Ei0gKDBhBMALGRYEOJBb5QcWlQo4cbAihZz3GgIMqFEBSM1/4ZEOWPAgpIIJXYU+PIhRG8ja1qU6VHlzZknJNQ6UanCjQkWCIGSUGEjAwVLjc44+DTqUQtPPS5gejUrTa5TJ3g9sWCr1BNUWZI161StiQUDmLYdGfesibQ3XMq1OPYthrwuA2yU2LBs2cBHIypYQPPlYAKFD5cVvNPtW8eVGbdcQADATsiNO4cFAPkvHpedPzc8kUcPgNGgZ5RNDZG05reoE9s2vSEP79MEGiQGy1qP8LA4ZcdtsJE48ONoLTBtTV0B9LsTnPceoIDBDQvS7W7vfjVY3q3eZ4A339J4eaAmKqU/sV58HvJh2RcnIBsDUw0ABqhBA5aV5V9XUFGiHfVeAiWwoFgJJrIXRH1tEMiDFV4oHoAEGlaWhgIGSGBO2nFomYY3mKjVglidaNYJGJDkWW2xxTfbjCbVaOGNqoX2GloR8ZeTaECS9pthRGJH2g0b3Agbk6hNANtteHD2GJUucfajCQBy5OOTQ25ZgUPvaVVQmbKh9510/qQpwXx3SQdfk8tZJOd5b6JJFplT3ZnmmX3qd5l1eg5q00HrtUkUn0AKaiGjClSAgKLYZcgWXwocGRcCFGCKwSB6ceqphwmYRUFYT/1WKlOdUpipmxW0mlCqHjYkAaeoZlqrqZ4qd+upQKaapn/AmgAegZ8KUtYtFAQQAgAh+QQFCgAbACwHAAQAzgALAAAF/+C2PUcmiCiZGUTrEkKBis8jQEquKwU5HyXIbEPgyX7BYa5wTNmEMwWsSXsqFbEh8DYs9mrgGjdK6GkPY5GOeU6ryz7UFopSQEzygOGhJBjoIgMDBAcBM0V/CYqLCQqFOwobiYyKjn2TlI6GKC2YjJZknouaZAcQlJUHl6eooJwKooobqoewrJSEmyKdt59NhRKFMxLEEA4RyMkMEAjDEhfGycqAG8TQx9IRDRDE3d3R2ctD1RLg0ttKEnbY5wZD3+zJ6M7X2RHi9Oby7u/r9g38UFjTh2xZJBEBMDAboogAgwkQI07IMUORwocSJwCgWDFBAIwZOaJIsOBjRogKJP8wTODw5ESVHVtm3AhzpEeQElOuNDlTZ0ycEUWKWFASqEahGwYUPbnxoAgEdlYSqDBkgoUNClAlIHbSAoOsqCRQnQHxq1axVb06FWFxLIqyaze0Tft1JVqyE+pWXMD1pF6bYl3+HTqAWNW8cRUFzmih0ZAAB2oGKukSAAGGRHWJgLiR6AylBLpuHKKUMlMCngMpDSAa9QIUggZVVvDaJobLeC3XZpvgNgCmtPcuwP3WgmXSq4do0DC6o2/guzcseECtUoO0hmcsGKDgOt7ssBd07wqesAIGZC1YIBa7PQHvb1+SFo+++HrJSQfB33xfav3i5eX3Hnb4CTJgegEq8tH/YQEOcIJzbm2G2EoYRLgBXFpVmFYDcREV4HIcnmUhiGBRouEMJGJGzHIspqgdXxK0yCKHRNXoIX4uorCdTyjkyNtdPWrA4Up82EbAbzMRxxZRR54WXVLDIRmRcag5d2R6ugl3ZXzNhTecchpMhIGVAKAYpgJjjsSklBEd99maZoo535ZvdamjBEpusJyctg3h4X8XqodBMx0tiNeg/oGJaKGABpogS40KSqiaEgBqlQWLUtqoVQnytekEjzo0hHqhRorppOZt2p923M2AAV+oBtpAnnPNoB6HaU6mAAIU+IXmi3j2mtFXuUoHKwXpzVrsjcgGOauKEjQrwq157hitGq2NoWmjh7z6Wmxb0m5w66+2VRAuXN/yFUAIACH5BAUKABsALAcABADOAAsAAAX/4CZuRiaM45MZqBgIRbs9AqTcuFLE7VHLOh7KB5ERdjJaEaU4ClO/lgKWjKKcMiJQ8KgumcieVdQMD8cbBeuAkkC6LYLhOxoQ2PF5Ys9PKPBMen17f0CCg4VSh32JV4t8jSNqEIOEgJKPlkYBlJWRInKdiJdkmQlvKAsLBxdABA4RsbIMBggtEhcQsLKxDBC2TAS6vLENdJLDxMZAubu8vjIbzcQRtMzJz79S08oQEt/guNiyy7fcvMbh4OezdAvGrakLAQwyABsELQkY9BP+//ckyPDD4J9BfAMh1GsBoImMeQUN+lMgUJ9CiRMa5msxoB9Gh/o8GmxYMZXIgxtR/yQ46S/gQAURR0pDwYDfywoyLPip5AdnCwsMFPBU4BPFhKBDi444quCmDKZOfwZ9KEGpCKgcN1jdALSpPqIYsabS+nSqvqplvYqQYAeDPgwKwjaMtiDl0oaqUAyo+3TuWwUAMPpVCfee0cEjVBGQq2ABx7oTWmQk4FglZMGN9fGVDMCuiH2AOVOu/PmyxM630gwM0CCn6q8LjVJ8GXvpa5Uwn95OTC/nNxkda1/dLSK475IjCD6dHbK1ZOa4hXP9DXs5chJ00UpVm5xo2qRpoxptwF2E4/IbJpB/SDz9+q9b1aNfQH08+p4a8uvX8B53fLP+ycAfemjsRUBgp1H20K+BghHgVgt1GXZXZpZ5lt4ECjxYR4ScUWiShEtZqBiIInRGWnERNnjiBglw+JyGnxUmGowsyiiZg189lNtPGACjV2+S9UjbU0JWF6SPvEk3QZEqsZYTk3UAaRSUnznJI5LmESCdBVSyaOWUWLK4I5gDUYVeV1T9l+FZClCAUVA09uSmRHBCKAECFEhW51ht6rnmWBXkaR+NjuHpJ40D3DmnQXt2F+ihZxlqVKOfQRACACH5BAUKABwALAcABADOAAsAAAX/ICdyUCkUo/g8mUG8MCGkKgspeC6j6XEIEBpBUeCNfECaglBcOVfJFK7YQwZHQ6JRZBUqTrSuVEuD3nI45pYjFuWKvjjSkCoRaBUMWxkwBGgJCXspQ36Bh4EEB0oKhoiBgyNLjo8Ki4QElIiWfJqHnISNEI+Ql5J9o6SgkqKkgqYihamPkW6oNBgSfiMMDQkGCBLCwxIQDhHIyQwQCGMKxsnKVyPCF9DREQ3MxMPX0cu4wt7J2uHWx9jlKd3o39MiuefYEcvNkuLt5O8c1ePI2tyELXGQwoGDAQf+iEC2xByDCRAjTlAgIUWCBRgCPJQ4AQBFXAs0coT40WLIjRxL/47AcHLkxIomRXL0CHPERZkpa4q4iVKiyp0tR/7kwHMkTUBBJR5dOCEBAVcKKtCAyOHpowXCpk7goABqBZdcvWploACpBKkpIJI1q5OD2rIWE0R1uTZu1LFwbWL9OlKuWb4c6+o9i3dEgw0RCGDUG9KlRw56gDY2qmCByZBaASi+TACA0TucAaTteCcy0ZuOK3N2vJlx58+LRQyY3Xm0ZsgjZg+oPQLi7dUcNXi0LOJw1pgNtB7XG6CBy+U75SYfPTSQAgZTNUDnQHt67wnbZyvwLgKiMN3oCZB3C76tdewpLFgIP2C88rbi4Y+QT3+8S5USMICZXWj1pkEDeUU3lOYGB3alSoEiMIjgX4WlgNF2EibIwQIXauWXSRg2SAOHIU5IIIMoZkhhWiJaiFVbKo6AQEgQXrTAazO1JhkBrBG3Y2Y6EsUhaGn95hprSN0oWpFE7rhkeaQBchGOEWnwEmc0uKWZj0LeuNV3W4Y2lZHFlQCSRjTIl8uZ+kG5HU/3sRlnTG2ytyadytnD3HrmuRcSn+0h1dycexIK1KCjYaCnjCCVqOFFJTZ5GkUUjESWaUIKU2lgCmAKKQIUjHapXRKE+t2og1VgankNYnohqKJ2CmKplso6GKz7WYCgqxeuyoF8u9IQAgA7",
                msg: null,
                msgText: "<em>Loading the next set of posts...</em>",
                selector: null,
                speed: "fast",
                start: t
            },
            state: {
                isDuringAjax: !1,
                isInvalidPage: !1,
                isDestroyed: !1,
                isDone: !1,
                isPaused: !1,
                isBeyondMaxPage: !1,
                currPage: 1
            },
            debug: !1,
            behavior: t,
            binder: e(window),
            nextSelector: "div.navigation a:first",
            navSelector: "div.navigation",
            contentSelector: null,
            extraScrollPx: 150,
            itemSelector: "div.post",
            animate: !1,
            pathParse: t,
            dataType: "html",
            appendCallback: !0,
            bufferPx: 40,
            errorCallback: function () {
            },
            infid: 0,
            pixelsFromNavToBottom: t,
            path: t,
            prefill: !1,
            maxPage: t
        }, e.infinitescroll.prototype = {
            _binding: function (e) {
                var i = this, n = i.options;
                if (n.v = "2.0b2.120520", n.behavior && this["_binding_" + n.behavior] !== t) this["_binding_" + n.behavior].call(this); else {
                    if ("bind" !== e && "unbind" !== e) return this._debug("Binding value  " + e + " not valid"), !1;
                    "unbind" === e ? this.options.binder.unbind("smartscroll.infscr." + i.options.infid) : this.options.binder[e]("smartscroll.infscr." + i.options.infid, function () {
                        i.scroll()
                    }), this._debug("Binding", e)
                }
            }, _create: function (i, n) {
                var s = e.extend(!0, {}, e.infinitescroll.defaults, i);
                this.options = s;
                var r = e(window);
                if (!this._validate(i)) return !1;
                var a = e(s.nextSelector).attr("href");
                if (!a) return this._debug("Navigation selector not found"), !1;
                s.path = s.path || this._determinepath(a), s.contentSelector = s.contentSelector || this.element, s.loading.selector = s.loading.selector || s.contentSelector, s.loading.msg = s.loading.msg || e('<div id="infscr-loading"><img alt="Loading..." src="' + s.loading.img + '" /><div>' + s.loading.msgText + "</div></div>"), (new Image).src = s.loading.img, s.pixelsFromNavToBottom === t && (s.pixelsFromNavToBottom = e(document).height() - e(s.navSelector).offset().top, this._debug("pixelsFromNavToBottom: " + s.pixelsFromNavToBottom));
                var o = this;
                return s.loading.start = s.loading.start || function () {
                    e(s.navSelector).hide(), s.loading.msg.appendTo(s.loading.selector).show(s.loading.speed, e.proxy(function () {
                        this.beginAjax(s)
                    }, o))
                }, s.loading.finished = s.loading.finished || function () {
                    s.state.isBeyondMaxPage || s.loading.msg.fadeOut(s.loading.speed)
                }, s.callback = function (i, a, o) {
                    s.behavior && i["_callback_" + s.behavior] !== t && i["_callback_" + s.behavior].call(e(s.contentSelector)[0], a, o), n && n.call(e(s.contentSelector)[0], a, s, o), s.prefill && r.bind("resize.infinite-scroll", i._prefill)
                }, i.debug && (!Function.prototype.bind || "object" != typeof console && "function" != typeof console || "object" != typeof console.log || ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"].forEach(function (e) {
                    console[e] = this.call(console[e], console)
                }, Function.prototype.bind)), this._setup(), s.prefill && this._prefill(), !0
            }, _prefill: function () {
                function t() {
                    return e(i.options.contentSelector).height() <= n.height()
                }

                var i = this, n = e(window);
                this._prefill = function () {
                    t() && i.scroll(), n.bind("resize.infinite-scroll", function () {
                        t() && (n.unbind("resize.infinite-scroll"), i.scroll())
                    })
                }, this._prefill()
            }, _debug: function () {
                !0 === this.options.debug && ("undefined" != typeof console && "function" == typeof console.log ? 1 === Array.prototype.slice.call(arguments).length && "string" == typeof Array.prototype.slice.call(arguments)[0] ? console.log(Array.prototype.slice.call(arguments).toString()) : console.log(Array.prototype.slice.call(arguments)) : Function.prototype.bind || "undefined" == typeof console || "object" != typeof console.log || Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments)))
            }, _determinepath: function (e) {
                var i = this.options;
                if (i.behavior && this["_determinepath_" + i.behavior] !== t) return this["_determinepath_" + i.behavior].call(this, e);
                if (i.pathParse) return this._debug("pathParse manual"), i.pathParse(e, this.options.state.currPage + 1);
                if (e.match(/^(.*?)\b2\b(.*?$)/)) e = e.match(/^(.*?)\b2\b(.*?$)/).slice(1); else if (e.match(/^(.*?)2(.*?$)/)) {
                    if (e.match(/^(.*?page=)2(\/.*|$)/)) return e = e.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                    e = e.match(/^(.*?)2(.*?$)/).slice(1)
                } else {
                    if (e.match(/^(.*?page=)1(\/.*|$)/)) return e = e.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                    this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com."), i.state.isInvalidPage = !0
                }
                return this._debug("determinePath", e), e
            }, _error: function (e) {
                var i = this.options;
                i.behavior && this["_error_" + i.behavior] !== t ? this["_error_" + i.behavior].call(this, e) : ("destroy" !== e && "end" !== e && (e = "unknown"), this._debug("Error", e), ("end" === e || i.state.isBeyondMaxPage) && this._showdonemsg(), i.state.isDone = !0, i.state.currPage = 1, i.state.isPaused = !1, i.state.isBeyondMaxPage = !1, this._binding("unbind"))
            }, _loadcallback: function (i, n, s) {
                var r, a = this.options, o = this.options.callback,
                    l = a.state.isDone ? "done" : a.appendCallback ? "append" : "no-append";
                if (a.behavior && this["_loadcallback_" + a.behavior] !== t) this["_loadcallback_" + a.behavior].call(this, i, n); else {
                    switch (l) {
                        case"done":
                            return this._showdonemsg(), !1;
                        case"no-append":
                            if ("html" === a.dataType && (n = e(n = "<div>" + n + "</div>").find(a.itemSelector)), 0 === n.length) return this._error("end");
                            break;
                        case"append":
                            var u = i.children();
                            if (0 === u.length) return this._error("end");
                            for (r = document.createDocumentFragment(); i[0].firstChild;) r.appendChild(i[0].firstChild);
                            this._debug("contentSelector", e(a.contentSelector)[0]), e(a.contentSelector)[0].appendChild(r), n = u.get()
                    }
                    if (a.loading.finished.call(e(a.contentSelector)[0], a), a.animate) {
                        var c = e(window).scrollTop() + e(a.loading.msg).height() + a.extraScrollPx + "px";
                        e("html,body").animate({scrollTop: c}, 800, function () {
                            a.state.isDuringAjax = !1
                        })
                    }
                    a.animate || (a.state.isDuringAjax = !1), o(this, n, s), a.prefill && this._prefill()
                }
            }, _nearbottom: function () {
                var i = this.options, n = 0 + e(document).height() - i.binder.scrollTop() - e(window).height();
                return i.behavior && this["_nearbottom_" + i.behavior] !== t ? this["_nearbottom_" + i.behavior].call(this) : (this._debug("math:", n, i.pixelsFromNavToBottom), n - i.bufferPx < i.pixelsFromNavToBottom)
            }, _pausing: function (e) {
                var i = this.options;
                {
                    if (!i.behavior || this["_pausing_" + i.behavior] === t) {
                        switch ("pause" !== e && "resume" !== e && null !== e && this._debug("Invalid argument. Toggling pause value instead"), e = !e || "pause" !== e && "resume" !== e ? "toggle" : e) {
                            case"pause":
                                i.state.isPaused = !0;
                                break;
                            case"resume":
                                i.state.isPaused = !1;
                                break;
                            case"toggle":
                                i.state.isPaused = !i.state.isPaused
                        }
                        return this._debug("Paused", i.state.isPaused), !1
                    }
                    this["_pausing_" + i.behavior].call(this, e)
                }
            }, _setup: function () {
                var e = this.options;
                {
                    if (!e.behavior || this["_setup_" + e.behavior] === t) return this._binding("bind"), !1;
                    this["_setup_" + e.behavior].call(this)
                }
            }, _showdonemsg: function () {
                var i = this.options;
                i.behavior && this["_showdonemsg_" + i.behavior] !== t ? this["_showdonemsg_" + i.behavior].call(this) : (i.loading.msg.find("img").hide().parent().find("div").html(i.loading.finishedMsg).animate({opacity: 1}, 2e3, function () {
                    e(this).parent().fadeOut(i.loading.speed)
                }), i.errorCallback.call(e(i.contentSelector)[0], "done"))
            }, _validate: function (t) {
                for (var i in t) if (i.indexOf && i.indexOf("Selector") > -1 && 0 === e(t[i]).length) return this._debug("Your " + i + " found no elements."), !1;
                return !0
            }, bind: function () {
                this._binding("bind")
            }, destroy: function () {
                return this.options.state.isDestroyed = !0, this.options.loading.finished(), this._error("destroy")
            }, pause: function () {
                this._pausing("pause")
            }, resume: function () {
                this._pausing("resume")
            }, beginAjax: function (i) {
                var n, s, r, a, o = this, l = i.path;
                if (i.state.currPage++, i.maxPage !== t && i.state.currPage > i.maxPage) return i.state.isBeyondMaxPage = !0, void this.destroy();
                switch (n = e(e(i.contentSelector).is("table, tbody") ? "<tbody/>" : "<div/>"), s = "function" == typeof l ? l(i.state.currPage) : l.join(i.state.currPage), o._debug("heading into ajax", s), r = "html" === i.dataType || "json" === i.dataType ? i.dataType : "html+callback", i.appendCallback && "html" === i.dataType && (r += "+callback"), r) {
                    case"html+callback":
                        o._debug("Using HTML via .load() method"), n.load(s + " " + i.itemSelector, t, function (e) {
                            o._loadcallback(n, e, s)
                        });
                        break;
                    case"html":
                        o._debug("Using " + r.toUpperCase() + " via $.ajax() method"), e.ajax({
                            url: s,
                            dataType: i.dataType,
                            complete: function (e, t) {
                                (a = void 0 !== e.isResolved ? e.isResolved() : "success" === t || "notmodified" === t) ? o._loadcallback(n, e.responseText, s) : o._error("end")
                            }
                        });
                        break;
                    case"json":
                        o._debug("Using " + r.toUpperCase() + " via $.ajax() method"), e.ajax({
                            dataType: "json",
                            type: "GET",
                            url: s,
                            success: function (e, r, l) {
                                if (a = void 0 !== l.isResolved ? l.isResolved() : "success" === r || "notmodified" === r, i.appendCallback) if (i.template !== t) {
                                    var u = i.template(e);
                                    n.append(u), a ? o._loadcallback(n, u) : o._error("end")
                                } else o._debug("template must be defined."), o._error("end"); else a ? o._loadcallback(n, e, s) : o._error("end")
                            },
                            error: function () {
                                o._debug("JSON ajax request failed."), o._error("end")
                            }
                        })
                }
            }, retrieve: function (i) {
                i = i || null;
                var n = this.options;
                if (n.behavior && this["retrieve_" + n.behavior] !== t) this["retrieve_" + n.behavior].call(this, i); else {
                    if (n.state.isDestroyed) return this._debug("Instance is destroyed"), !1;
                    n.state.isDuringAjax = !0, n.loading.start.call(e(n.contentSelector)[0], n)
                }
            }, scroll: function () {
                var e = this.options, i = e.state;
                e.behavior && this["scroll_" + e.behavior] !== t ? this["scroll_" + e.behavior].call(this) : i.isDuringAjax || i.isInvalidPage || i.isDone || i.isDestroyed || i.isPaused || this._nearbottom() && this.retrieve()
            }, toggle: function () {
                this._pausing()
            }, unbind: function () {
                this._binding("unbind")
            }, update: function (t) {
                e.isPlainObject(t) && (this.options = e.extend(!0, this.options, t))
            }
        }, e.fn.infinitescroll = function (t, i) {
            switch (typeof t) {
                case"string":
                    var n = Array.prototype.slice.call(arguments, 1);
                    this.each(function () {
                        var i = e.data(this, "infinitescroll");
                        return !!i && (!(!e.isFunction(i[t]) || "_" === t.charAt(0)) && void i[t].apply(i, n))
                    });
                    break;
                case"object":
                    this.each(function () {
                        var n = e.data(this, "infinitescroll");
                        n ? n.update(t) : (n = new e.infinitescroll(t, i, this)).failed || e.data(this, "infinitescroll", n)
                    })
            }
            return this
        };
        var i, n = e.event;
        n.special.smartscroll = {
            setup: function () {
                e(this).bind("scroll", n.special.smartscroll.handler)
            }, teardown: function () {
                e(this).unbind("scroll", n.special.smartscroll.handler)
            }, handler: function (t, n) {
                var s = this, r = arguments;
                t.type = "smartscroll", i && clearTimeout(i), i = setTimeout(function () {
                    e(s).trigger("smartscroll", r)
                }, "execAsap" === n ? 0 : 100)
            }
        }, e.fn.smartscroll = function (e) {
            return e ? this.bind("smartscroll", e) : this.trigger("smartscroll", ["execAsap"])
        }
    }), function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
    }(function (e) {
        function t(t, n) {
            var s, r, a, o = t.nodeName.toLowerCase();
            return "area" === o ? (s = t.parentNode, r = s.name, !(!t.href || !r || "map" !== s.nodeName.toLowerCase()) && (!!(a = e("img[usemap='#" + r + "']")[0]) && i(a))) : (/^(input|select|textarea|button|object)$/.test(o) ? !t.disabled : "a" === o ? t.href || n : n) && i(t)
        }

        function i(t) {
            return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function () {
                return "hidden" === e.css(this, "visibility")
            }).length
        }

        e.ui = e.ui || {}, e.extend(e.ui, {
            version: "1.11.4",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), e.fn.extend({
            scrollParent: function (t) {
                var i = this.css("position"), n = "absolute" === i, s = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                    r = this.parents().filter(function () {
                        var t = e(this);
                        return (!n || "static" !== t.css("position")) && s.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
                    }).eq(0);
                return "fixed" !== i && r.length ? r : e(this[0].ownerDocument || document)
            }, uniqueId: function () {
                var e = 0;
                return function () {
                    return this.each(function () {
                        this.id || (this.id = "ui-id-" + ++e)
                    })
                }
            }(), removeUniqueId: function () {
                return this.each(function () {
                    /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
                })
            }
        }), e.extend(e.expr[":"], {
            data: e.expr.createPseudo ? e.expr.createPseudo(function (t) {
                return function (i) {
                    return !!e.data(i, t)
                }
            }) : function (t, i, n) {
                return !!e.data(t, n[3])
            }, focusable: function (i) {
                return t(i, !isNaN(e.attr(i, "tabindex")))
            }, tabbable: function (i) {
                var n = e.attr(i, "tabindex"), s = isNaN(n);
                return (s || n >= 0) && t(i, !s)
            }
        }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (t, i) {
            function n(t, i, n, r) {
                return e.each(s, function () {
                    i -= parseFloat(e.css(t, "padding" + this)) || 0, n && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), r && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
                }), i
            }

            var s = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"], r = i.toLowerCase(), a = {
                innerWidth: e.fn.innerWidth,
                innerHeight: e.fn.innerHeight,
                outerWidth: e.fn.outerWidth,
                outerHeight: e.fn.outerHeight
            };
            e.fn["inner" + i] = function (t) {
                return void 0 === t ? a["inner" + i].call(this) : this.each(function () {
                    e(this).css(r, n(this, t) + "px")
                })
            }, e.fn["outer" + i] = function (t, s) {
                return "number" != typeof t ? a["outer" + i].call(this, t) : this.each(function () {
                    e(this).css(r, n(this, t, !0, s) + "px")
                })
            }
        }), e.fn.addBack || (e.fn.addBack = function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (t) {
            return function (i) {
                return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
            }
        }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
            focus: function (t) {
                return function (i, n) {
                    return "number" == typeof i ? this.each(function () {
                        var t = this;
                        setTimeout(function () {
                            e(t).focus(), n && n.call(t)
                        }, i)
                    }) : t.apply(this, arguments)
                }
            }(e.fn.focus), disableSelection: function () {
                var e = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
                return function () {
                    return this.bind(e + ".ui-disableSelection", function (e) {
                        e.preventDefault()
                    })
                }
            }(), enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            }, zIndex: function (t) {
                if (void 0 !== t) return this.css("zIndex", t);
                if (this.length) for (var i, n, s = e(this[0]); s.length && s[0] !== document;) {
                    if (("absolute" === (i = s.css("position")) || "relative" === i || "fixed" === i) && (n = parseInt(s.css("zIndex"), 10), !isNaN(n) && 0 !== n)) return n;
                    s = s.parent()
                }
                return 0
            }
        }), e.ui.plugin = {
            add: function (t, i, n) {
                var s, r = e.ui[t].prototype;
                for (s in n) r.plugins[s] = r.plugins[s] || [], r.plugins[s].push([i, n[s]])
            }, call: function (e, t, i, n) {
                var s, r = e.plugins[t];
                if (r && (n || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)) for (s = 0; r.length > s; s++) e.options[r[s][0]] && r[s][1].apply(e.element, i)
            }
        };
        var n = 0, s = Array.prototype.slice;
        e.cleanData = function (t) {
            return function (i) {
                var n, s, r;
                for (r = 0; null != (s = i[r]); r++) try {
                    (n = e._data(s, "events")) && n.remove && e(s).triggerHandler("remove")
                } catch (e) {
                }
                t(i)
            }
        }(e.cleanData), e.widget = function (t, i, n) {
            var s, r, a, o, l = {}, u = t.split(".")[0];
            return t = t.split(".")[1], s = u + "-" + t, n || (n = i, i = e.Widget), e.expr[":"][s.toLowerCase()] = function (t) {
                return !!e.data(t, s)
            }, e[u] = e[u] || {}, r = e[u][t], a = e[u][t] = function (e, t) {
                return this._createWidget ? void(arguments.length && this._createWidget(e, t)) : new a(e, t)
            }, e.extend(a, r, {
                version: n.version,
                _proto: e.extend({}, n),
                _childConstructors: []
            }), o = new i, o.options = e.widget.extend({}, o.options), e.each(n, function (t, n) {
                return e.isFunction(n) ? void(l[t] = function () {
                    var e = function () {
                        return i.prototype[t].apply(this, arguments)
                    }, s = function (e) {
                        return i.prototype[t].apply(this, e)
                    };
                    return function () {
                        var t, i = this._super, r = this._superApply;
                        return this._super = e, this._superApply = s, t = n.apply(this, arguments), this._super = i, this._superApply = r, t
                    }
                }()) : void(l[t] = n)
            }), a.prototype = e.widget.extend(o, {widgetEventPrefix: r ? o.widgetEventPrefix || t : t}, l, {
                constructor: a,
                namespace: u,
                widgetName: t,
                widgetFullName: s
            }), r ? (e.each(r._childConstructors, function (t, i) {
                var n = i.prototype;
                e.widget(n.namespace + "." + n.widgetName, a, i._proto)
            }), delete r._childConstructors) : i._childConstructors.push(a), e.widget.bridge(t, a), a
        }, e.widget.extend = function (t) {
            for (var i, n, r = s.call(arguments, 1), a = 0, o = r.length; o > a; a++) for (i in r[a]) n = r[a][i], r[a].hasOwnProperty(i) && void 0 !== n && (t[i] = e.isPlainObject(n) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], n) : e.widget.extend({}, n) : n);
            return t
        }, e.widget.bridge = function (t, i) {
            var n = i.prototype.widgetFullName || t;
            e.fn[t] = function (r) {
                var a = "string" == typeof r, o = s.call(arguments, 1), l = this;
                return a ? this.each(function () {
                    var i, s = e.data(this, n);
                    return "instance" === r ? (l = s, !1) : s ? e.isFunction(s[r]) && "_" !== r.charAt(0) ? (i = s[r].apply(s, o), i !== s && void 0 !== i ? (l = i && i.jquery ? l.pushStack(i.get()) : i, !1) : void 0) : e.error("no such method '" + r + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + r + "'")
                }) : (o.length && (r = e.widget.extend.apply(null, [r].concat(o))), this.each(function () {
                    var t = e.data(this, n);
                    t ? (t.option(r || {}), t._init && t._init()) : e.data(this, n, new i(r, this))
                })), l
            }
        }, e.Widget = function () {
        }, e.Widget._childConstructors = [], e.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {disabled: !1, create: null},
            _createWidget: function (t, i) {
                i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function (e) {
                        e.target === i && this.destroy()
                    }
                }), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: e.noop,
            _getCreateEventData: e.noop,
            _create: e.noop,
            _init: e.noop,
            destroy: function () {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: e.noop,
            widget: function () {
                return this.element
            },
            option: function (t, i) {
                var n, s, r, a = t;
                if (0 === arguments.length) return e.widget.extend({}, this.options);
                if ("string" == typeof t) if (a = {}, n = t.split("."), t = n.shift(), n.length) {
                    for (s = a[t] = e.widget.extend({}, this.options[t]), r = 0; n.length - 1 > r; r++) s[n[r]] = s[n[r]] || {}, s = s[n[r]];
                    if (t = n.pop(), 1 === arguments.length) return void 0 === s[t] ? null : s[t];
                    s[t] = i
                } else {
                    if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                    a[t] = i
                }
                return this._setOptions(a), this
            },
            _setOptions: function (e) {
                var t;
                for (t in e) this._setOption(t, e[t]);
                return this
            },
            _setOption: function (e, t) {
                return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
            },
            enable: function () {
                return this._setOptions({disabled: !1})
            },
            disable: function () {
                return this._setOptions({disabled: !0})
            },
            _on: function (t, i, n) {
                var s, r = this;
                "boolean" != typeof t && (n = i, i = t, t = !1), n ? (i = s = e(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, s = this.widget()), e.each(n, function (n, a) {
                    function o() {
                        return t || !0 !== r.options.disabled && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? r[a] : a).apply(r, arguments) : void 0
                    }

                    "string" != typeof a && (o.guid = a.guid = a.guid || o.guid || e.guid++);
                    var l = n.match(/^([\w:-]*)\s*(.*)$/), u = l[1] + r.eventNamespace, c = l[2];
                    c ? s.delegate(c, u, o) : i.bind(u, o)
                })
            },
            _off: function (t, i) {
                i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
            },
            _delay: function (e, t) {
                var i = this;
                return setTimeout(function () {
                    return ("string" == typeof e ? i[e] : e).apply(i, arguments)
                }, t || 0)
            },
            _hoverable: function (t) {
                this.hoverable = this.hoverable.add(t), this._on(t, {
                    mouseenter: function (t) {
                        e(t.currentTarget).addClass("ui-state-hover")
                    }, mouseleave: function (t) {
                        e(t.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function (t) {
                this.focusable = this.focusable.add(t), this._on(t, {
                    focusin: function (t) {
                        e(t.currentTarget).addClass("ui-state-focus")
                    }, focusout: function (t) {
                        e(t.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function (t, i, n) {
                var s, r, a = this.options[t];
                if (n = n || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], r = i.originalEvent) for (s in r) s in i || (i[s] = r[s]);
                return this.element.trigger(i, n), !(e.isFunction(a) && !1 === a.apply(this.element[0], [i].concat(n)) || i.isDefaultPrevented())
            }
        }, e.each({show: "fadeIn", hide: "fadeOut"}, function (t, i) {
            e.Widget.prototype["_" + t] = function (n, s, r) {
                "string" == typeof s && (s = {effect: s});
                var a, o = s ? !0 === s || "number" == typeof s ? i : s.effect || i : t;
                "number" == typeof(s = s || {}) && (s = {duration: s}), a = !e.isEmptyObject(s), s.complete = r, s.delay && n.delay(s.delay), a && e.effects && e.effects.effect[o] ? n[t](s) : o !== t && n[o] ? n[o](s.duration, s.easing, r) : n.queue(function (i) {
                    e(this)[t](), r && r.call(n[0]), i()
                })
            }
        }), e.widget;
        var r = !1;
        e(document).mouseup(function () {
            r = !1
        }), e.widget("ui.mouse", {
            version: "1.11.4",
            options: {cancel: "input,textarea,button,select,option", distance: 1, delay: 0},
            _mouseInit: function () {
                var t = this;
                this.element.bind("mousedown." + this.widgetName, function (e) {
                    return t._mouseDown(e)
                }).bind("click." + this.widgetName, function (i) {
                    return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
                }), this.started = !1
            },
            _mouseDestroy: function () {
                this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function (t) {
                if (!r) {
                    this._mouseMoved = !1, this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                    var i = this, n = 1 === t.which,
                        s = !("string" != typeof this.options.cancel || !t.target.nodeName) && e(t.target).closest(this.options.cancel).length;
                    return !(n && !s && this._mouseCapture(t)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                        i.mouseDelayMet = !0
                    }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(t), !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e) {
                        return i._mouseMove(e)
                    }, this._mouseUpDelegate = function (e) {
                        return i._mouseUp(e)
                    }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), r = !0, !0))
                }
            },
            _mouseMove: function (t) {
                if (this._mouseMoved) {
                    if (e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button) return this._mouseUp(t);
                    if (!t.which) return this._mouseUp(t)
                }
                return (t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, t), this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
            },
            _mouseUp: function (t) {
                return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), r = !1, !1
            },
            _mouseDistanceMet: function (e) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function () {
                return this.mouseDelayMet
            },
            _mouseStart: function () {
            },
            _mouseDrag: function () {
            },
            _mouseStop: function () {
            },
            _mouseCapture: function () {
                return !0
            }
        }), function () {
            function t(e, t, i) {
                return [parseFloat(e[0]) * (h.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (h.test(e[1]) ? i / 100 : 1)]
            }

            function i(t, i) {
                return parseInt(e.css(t, i), 10) || 0
            }

            function n(t) {
                var i = t[0];
                return 9 === i.nodeType ? {
                    width: t.width(),
                    height: t.height(),
                    offset: {top: 0, left: 0}
                } : e.isWindow(i) ? {
                    width: t.width(),
                    height: t.height(),
                    offset: {top: t.scrollTop(), left: t.scrollLeft()}
                } : i.preventDefault ? {
                    width: 0,
                    height: 0,
                    offset: {top: i.pageY, left: i.pageX}
                } : {width: t.outerWidth(), height: t.outerHeight(), offset: t.offset()}
            }

            e.ui = e.ui || {};
            var s, r, a = Math.max, o = Math.abs, l = Math.round, u = /left|center|right/, c = /top|center|bottom/,
                d = /[\+\-]\d+(\.[\d]+)?%?/, p = /^\w+/, h = /%$/, f = e.fn.position;
            e.position = {
                scrollbarWidth: function () {
                    if (void 0 !== s) return s;
                    var t, i,
                        n = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        r = n.children()[0];
                    return e("body").append(n), t = r.offsetWidth, n.css("overflow", "scroll"), i = r.offsetWidth, t === i && (i = n[0].clientWidth), n.remove(), s = t - i
                }, getScrollInfo: function (t) {
                    var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                        n = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                        s = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth;
                    return {
                        width: "scroll" === n || "auto" === n && t.height < t.element[0].scrollHeight ? e.position.scrollbarWidth() : 0,
                        height: s ? e.position.scrollbarWidth() : 0
                    }
                }, getWithinInfo: function (t) {
                    var i = e(t || window), n = e.isWindow(i[0]), s = !!i[0] && 9 === i[0].nodeType;
                    return {
                        element: i,
                        isWindow: n,
                        isDocument: s,
                        offset: i.offset() || {left: 0, top: 0},
                        scrollLeft: i.scrollLeft(),
                        scrollTop: i.scrollTop(),
                        width: n || s ? i.width() : i.outerWidth(),
                        height: n || s ? i.height() : i.outerHeight()
                    }
                }
            }, e.fn.position = function (s) {
                if (!s || !s.of) return f.apply(this, arguments);
                s = e.extend({}, s);
                var h, m, g, v, y, b, w = e(s.of), T = e.position.getWithinInfo(s.within),
                    x = e.position.getScrollInfo(T), _ = (s.collision || "flip").split(" "), C = {};
                return b = n(w), w[0].preventDefault && (s.at = "left top"), m = b.width, g = b.height, v = b.offset, y = e.extend({}, v), e.each(["my", "at"], function () {
                    var e, t, i = (s[this] || "").split(" ");
                    1 === i.length && (i = u.test(i[0]) ? i.concat(["center"]) : c.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = u.test(i[0]) ? i[0] : "center", i[1] = c.test(i[1]) ? i[1] : "center", e = d.exec(i[0]), t = d.exec(i[1]), C[this] = [e ? e[0] : 0, t ? t[0] : 0], s[this] = [p.exec(i[0])[0], p.exec(i[1])[0]]
                }), 1 === _.length && (_[1] = _[0]), "right" === s.at[0] ? y.left += m : "center" === s.at[0] && (y.left += m / 2), "bottom" === s.at[1] ? y.top += g : "center" === s.at[1] && (y.top += g / 2), h = t(C.at, m, g), y.left += h[0], y.top += h[1], this.each(function () {
                    var n, u, c = e(this), d = c.outerWidth(), p = c.outerHeight(), f = i(this, "marginLeft"),
                        b = i(this, "marginTop"), S = d + f + i(this, "marginRight") + x.width,
                        P = p + b + i(this, "marginBottom") + x.height, k = e.extend({}, y),
                        I = t(C.my, c.outerWidth(), c.outerHeight());
                    "right" === s.my[0] ? k.left -= d : "center" === s.my[0] && (k.left -= d / 2), "bottom" === s.my[1] ? k.top -= p : "center" === s.my[1] && (k.top -= p / 2), k.left += I[0], k.top += I[1], r || (k.left = l(k.left), k.top = l(k.top)), n = {
                        marginLeft: f,
                        marginTop: b
                    }, e.each(["left", "top"], function (t, i) {
                        e.ui.position[_[t]] && e.ui.position[_[t]][i](k, {
                            targetWidth: m,
                            targetHeight: g,
                            elemWidth: d,
                            elemHeight: p,
                            collisionPosition: n,
                            collisionWidth: S,
                            collisionHeight: P,
                            offset: [h[0] + I[0], h[1] + I[1]],
                            my: s.my,
                            at: s.at,
                            within: T,
                            elem: c
                        })
                    }), s.using && (u = function (e) {
                        var t = v.left - k.left, i = t + m - d, n = v.top - k.top, r = n + g - p, l = {
                            target: {element: w, left: v.left, top: v.top, width: m, height: g},
                            element: {element: c, left: k.left, top: k.top, width: d, height: p},
                            horizontal: 0 > i ? "left" : t > 0 ? "right" : "center",
                            vertical: 0 > r ? "top" : n > 0 ? "bottom" : "middle"
                        };
                        d > m && m > o(t + i) && (l.horizontal = "center"), p > g && g > o(n + r) && (l.vertical = "middle"), l.important = a(o(t), o(i)) > a(o(n), o(r)) ? "horizontal" : "vertical", s.using.call(this, e, l)
                    }), c.offset(e.extend(k, {using: u}))
                })
            }, e.ui.position = {
                fit: {
                    left: function (e, t) {
                        var i, n = t.within, s = n.isWindow ? n.scrollLeft : n.offset.left, r = n.width,
                            o = e.left - t.collisionPosition.marginLeft, l = s - o, u = o + t.collisionWidth - r - s;
                        t.collisionWidth > r ? l > 0 && 0 >= u ? (i = e.left + l + t.collisionWidth - r - s, e.left += l - i) : e.left = u > 0 && 0 >= l ? s : l > u ? s + r - t.collisionWidth : s : l > 0 ? e.left += l : u > 0 ? e.left -= u : e.left = a(e.left - o, e.left)
                    }, top: function (e, t) {
                        var i, n = t.within, s = n.isWindow ? n.scrollTop : n.offset.top, r = t.within.height,
                            o = e.top - t.collisionPosition.marginTop, l = s - o, u = o + t.collisionHeight - r - s;
                        t.collisionHeight > r ? l > 0 && 0 >= u ? (i = e.top + l + t.collisionHeight - r - s, e.top += l - i) : e.top = u > 0 && 0 >= l ? s : l > u ? s + r - t.collisionHeight : s : l > 0 ? e.top += l : u > 0 ? e.top -= u : e.top = a(e.top - o, e.top)
                    }
                }, flip: {
                    left: function (e, t) {
                        var i, n, s = t.within, r = s.offset.left + s.scrollLeft, a = s.width,
                            l = s.isWindow ? s.scrollLeft : s.offset.left, u = e.left - t.collisionPosition.marginLeft,
                            c = u - l, d = u + t.collisionWidth - a - l,
                            p = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
                            h = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
                            f = -2 * t.offset[0];
                        0 > c ? (0 > (i = e.left + p + h + f + t.collisionWidth - a - r) || o(c) > i) && (e.left += p + h + f) : d > 0 && ((n = e.left - t.collisionPosition.marginLeft + p + h + f - l) > 0 || d > o(n)) && (e.left += p + h + f)
                    }, top: function (e, t) {
                        var i, n, s = t.within, r = s.offset.top + s.scrollTop, a = s.height,
                            l = s.isWindow ? s.scrollTop : s.offset.top, u = e.top - t.collisionPosition.marginTop,
                            c = u - l, d = u + t.collisionHeight - a - l,
                            p = "top" === t.my[1] ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                            h = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
                            f = -2 * t.offset[1];
                        0 > c ? (0 > (n = e.top + p + h + f + t.collisionHeight - a - r) || o(c) > n) && (e.top += p + h + f) : d > 0 && ((i = e.top - t.collisionPosition.marginTop + p + h + f - l) > 0 || d > o(i)) && (e.top += p + h + f)
                    }
                }, flipfit: {
                    left: function () {
                        e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
                    }, top: function () {
                        e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
                    }
                }
            }, function () {
                var t, i, n, s, a, o = document.getElementsByTagName("body")[0], l = document.createElement("div");
                t = document.createElement(o ? "div" : "body"), n = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                }, o && e.extend(n, {position: "absolute", left: "-1000px", top: "-1000px"});
                for (a in n) t.style[a] = n[a];
                t.appendChild(l), (i = o || document.documentElement).insertBefore(t, i.firstChild), l.style.cssText = "position: absolute; left: 10.7432222px;", s = e(l).offset().left, r = s > 10 && 11 > s, t.innerHTML = "", i.removeChild(t)
            }()
        }(), e.ui.position, e.widget("ui.tabs", {
            version: "1.11.4",
            delay: 300,
            options: {
                active: null,
                collapsible: !1,
                event: "click",
                heightStyle: "content",
                hide: null,
                show: null,
                activate: null,
                beforeActivate: null,
                beforeLoad: null,
                load: null
            },
            _isLocal: function () {
                var e = /#.*$/;
                return function (t) {
                    var i, n;
                    i = (t = t.cloneNode(!1)).href.replace(e, ""), n = location.href.replace(e, "");
                    try {
                        i = decodeURIComponent(i)
                    } catch (e) {
                    }
                    try {
                        n = decodeURIComponent(n)
                    } catch (e) {
                    }
                    return t.hash.length > 1 && i === n
                }
            }(),
            _create: function () {
                var t = this, i = this.options;
                this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible), this._processTabs(), i.active = this._initialActive(), e.isArray(i.disabled) && (i.disabled = e.unique(i.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"), function (e) {
                    return t.tabs.index(e)
                }))).sort()), this.active = !1 !== this.options.active && this.anchors.length ? this._findActive(i.active) : e(), this._refresh(), this.active.length && this.load(i.active)
            },
            _initialActive: function () {
                var t = this.options.active, i = this.options.collapsible, n = location.hash.substring(1);
                return null === t && (n && this.tabs.each(function (i, s) {
                    return e(s).attr("aria-controls") === n ? (t = i, !1) : void 0
                }), null === t && (t = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === t || -1 === t) && (t = !!this.tabs.length && 0)), !1 !== t && -1 === (t = this.tabs.index(this.tabs.eq(t))) && (t = !i && 0), !i && !1 === t && this.anchors.length && (t = 0), t
            },
            _getCreateEventData: function () {
                return {tab: this.active, panel: this.active.length ? this._getPanelForTab(this.active) : e()}
            },
            _tabKeydown: function (t) {
                var i = e(this.document[0].activeElement).closest("li"), n = this.tabs.index(i), s = !0;
                if (!this._handlePageNav(t)) {
                    switch (t.keyCode) {
                        case e.ui.keyCode.RIGHT:
                        case e.ui.keyCode.DOWN:
                            n++;
                            break;
                        case e.ui.keyCode.UP:
                        case e.ui.keyCode.LEFT:
                            s = !1, n--;
                            break;
                        case e.ui.keyCode.END:
                            n = this.anchors.length - 1;
                            break;
                        case e.ui.keyCode.HOME:
                            n = 0;
                            break;
                        case e.ui.keyCode.SPACE:
                            return t.preventDefault(), clearTimeout(this.activating), void this._activate(n);
                        case e.ui.keyCode.ENTER:
                            return t.preventDefault(), clearTimeout(this.activating), void this._activate(n !== this.options.active && n);
                        default:
                            return
                    }
                    t.preventDefault(), clearTimeout(this.activating), n = this._focusNextTab(n, s), t.ctrlKey || t.metaKey || (i.attr("aria-selected", "false"), this.tabs.eq(n).attr("aria-selected", "true"), this.activating = this._delay(function () {
                        this.option("active", n)
                    }, this.delay))
                }
            },
            _panelKeydown: function (t) {
                this._handlePageNav(t) || t.ctrlKey && t.keyCode === e.ui.keyCode.UP && (t.preventDefault(), this.active.focus())
            },
            _handlePageNav: function (t) {
                return t.altKey && t.keyCode === e.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : t.altKey && t.keyCode === e.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
            },
            _findNextTab: function (t, i) {
                for (var n = this.tabs.length - 1; -1 !== e.inArray((t > n && (t = 0), 0 > t && (t = n), t), this.options.disabled);) t = i ? t + 1 : t - 1;
                return t
            },
            _focusNextTab: function (e, t) {
                return e = this._findNextTab(e, t), this.tabs.eq(e).focus(), e
            },
            _setOption: function (e, t) {
                return "active" === e ? void this._activate(t) : "disabled" === e ? void this._setupDisabled(t) : (this._super(e, t), "collapsible" === e && (this.element.toggleClass("ui-tabs-collapsible", t), t || !1 !== this.options.active || this._activate(0)), "event" === e && this._setupEvents(t), void("heightStyle" === e && this._setupHeightStyle(t)))
            },
            _sanitizeSelector: function (e) {
                return e ? e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
            },
            refresh: function () {
                var t = this.options, i = this.tablist.children(":has(a[href])");
                t.disabled = e.map(i.filter(".ui-state-disabled"), function (e) {
                    return i.index(e)
                }), this._processTabs(), !1 !== t.active && this.anchors.length ? this.active.length && !e.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1, this.active = e()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active) : (t.active = !1, this.active = e()), this._refresh()
            },
            _refresh: function () {
                this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1
                }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden": "true"}), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                }), this._getPanelForTab(this.active).show().attr({"aria-hidden": "false"})) : this.tabs.eq(0).attr("tabIndex", 0)
            },
            _processTabs: function () {
                var t = this, i = this.tabs, n = this.anchors, s = this.panels;
                this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function (t) {
                    e(this).is(".ui-state-disabled") && t.preventDefault()
                }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
                    e(this).closest("li").is(".ui-state-disabled") && this.blur()
                }), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                    role: "tab",
                    tabIndex: -1
                }), this.anchors = this.tabs.map(function () {
                    return e("a", this)[0]
                }).addClass("ui-tabs-anchor").attr({
                    role: "presentation",
                    tabIndex: -1
                }), this.panels = e(), this.anchors.each(function (i, n) {
                    var s, r, a, o = e(n).uniqueId().attr("id"), l = e(n).closest("li"), u = l.attr("aria-controls");
                    t._isLocal(n) ? (s = n.hash, a = s.substring(1), r = t.element.find(t._sanitizeSelector(s))) : (a = l.attr("aria-controls") || e({}).uniqueId()[0].id, s = "#" + a, (r = t.element.find(s)).length || (r = t._createPanel(a)).insertAfter(t.panels[i - 1] || t.tablist), r.attr("aria-live", "polite")), r.length && (t.panels = t.panels.add(r)), u && l.data("ui-tabs-aria-controls", u), l.attr({
                        "aria-controls": a,
                        "aria-labelledby": o
                    }), r.attr("aria-labelledby", o)
                }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel"), i && (this._off(i.not(this.tabs)), this._off(n.not(this.anchors)), this._off(s.not(this.panels)))
            },
            _getList: function () {
                return this.tablist || this.element.find("ol,ul").eq(0)
            },
            _createPanel: function (t) {
                return e("<div>").attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
            },
            _setupDisabled: function (t) {
                e.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1);
                for (var i, n = 0; i = this.tabs[n]; n++) !0 === t || -1 !== e.inArray(n, t) ? e(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : e(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
                this.options.disabled = t
            },
            _setupEvents: function (t) {
                var i = {};
                t && e.each(t.split(" "), function (e, t) {
                    i[t] = "_eventHandler"
                }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
                    click: function (e) {
                        e.preventDefault()
                    }
                }), this._on(this.anchors, i), this._on(this.tabs, {keydown: "_tabKeydown"}), this._on(this.panels, {keydown: "_panelKeydown"}), this._focusable(this.tabs), this._hoverable(this.tabs)
            },
            _setupHeightStyle: function (t) {
                var i, n = this.element.parent();
                "fill" === t ? (i = n.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function () {
                    var t = e(this), n = t.css("position");
                    "absolute" !== n && "fixed" !== n && (i -= t.outerHeight(!0))
                }), this.element.children().not(this.panels).each(function () {
                    i -= e(this).outerHeight(!0)
                }), this.panels.each(function () {
                    e(this).height(Math.max(0, i - e(this).innerHeight() + e(this).height()))
                }).css("overflow", "auto")) : "auto" === t && (i = 0, this.panels.each(function () {
                    i = Math.max(i, e(this).height("").height())
                }).height(i))
            },
            _eventHandler: function (t) {
                var i = this.options, n = this.active, s = e(t.currentTarget).closest("li"), r = s[0] === n[0],
                    a = r && i.collapsible, o = a ? e() : this._getPanelForTab(s),
                    l = n.length ? this._getPanelForTab(n) : e(),
                    u = {oldTab: n, oldPanel: l, newTab: a ? e() : s, newPanel: o};
                t.preventDefault(), s.hasClass("ui-state-disabled") || s.hasClass("ui-tabs-loading") || this.running || r && !i.collapsible || !1 === this._trigger("beforeActivate", t, u) || (i.active = !a && this.tabs.index(s), this.active = r ? e() : s, this.xhr && this.xhr.abort(), l.length || o.length || e.error("jQuery UI Tabs: Mismatching fragment identifier."), o.length && this.load(this.tabs.index(s), t), this._toggle(t, u))
            },
            _toggle: function (t, i) {
                function n() {
                    r.running = !1, r._trigger("activate", t, i)
                }

                function s() {
                    i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), a.length && r.options.show ? r._show(a, r.options.show, n) : (a.show(), n())
                }

                var r = this, a = i.newPanel, o = i.oldPanel;
                this.running = !0, o.length && this.options.hide ? this._hide(o, this.options.hide, function () {
                    i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), s()
                }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), o.hide(), s()), o.attr("aria-hidden", "true"), i.oldTab.attr({
                    "aria-selected": "false",
                    "aria-expanded": "false"
                }), a.length && o.length ? i.oldTab.attr("tabIndex", -1) : a.length && this.tabs.filter(function () {
                    return 0 === e(this).attr("tabIndex")
                }).attr("tabIndex", -1), a.attr("aria-hidden", "false"), i.newTab.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                })
            },
            _activate: function (t) {
                var i, n = this._findActive(t);
                n[0] !== this.active[0] && (n.length || (n = this.active), i = n.find(".ui-tabs-anchor")[0], this._eventHandler({
                    target: i,
                    currentTarget: i,
                    preventDefault: e.noop
                }))
            },
            _findActive: function (t) {
                return !1 === t ? e() : this.tabs.eq(t)
            },
            _getIndex: function (e) {
                return "string" == typeof e && (e = this.anchors.index(this.anchors.filter("[href$='" + e + "']"))), e
            },
            _destroy: function () {
                this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tablist.unbind(this.eventNamespace), this.tabs.add(this.panels).each(function () {
                    e.data(this, "ui-tabs-destroy") ? e(this).remove() : e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
                }), this.tabs.each(function () {
                    var t = e(this), i = t.data("ui-tabs-aria-controls");
                    i ? t.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : t.removeAttr("aria-controls")
                }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
            },
            enable: function (t) {
                var i = this.options.disabled;
                !1 !== i && (void 0 === t ? i = !1 : (t = this._getIndex(t), i = e.isArray(i) ? e.map(i, function (e) {
                    return e !== t ? e : null
                }) : e.map(this.tabs, function (e, i) {
                    return i !== t ? i : null
                })), this._setupDisabled(i))
            },
            disable: function (t) {
                var i = this.options.disabled;
                if (!0 !== i) {
                    if (void 0 === t) i = !0; else {
                        if (t = this._getIndex(t), -1 !== e.inArray(t, i)) return;
                        i = e.isArray(i) ? e.merge([t], i).sort() : [t]
                    }
                    this._setupDisabled(i)
                }
            },
            load: function (t, i) {
                t = this._getIndex(t);
                var n = this, s = this.tabs.eq(t), r = s.find(".ui-tabs-anchor"), a = this._getPanelForTab(s),
                    o = {tab: s, panel: a}, l = function (e, t) {
                        "abort" === t && n.panels.stop(!1, !0), s.removeClass("ui-tabs-loading"), a.removeAttr("aria-busy"), e === n.xhr && delete n.xhr
                    };
                this._isLocal(r[0]) || (this.xhr = e.ajax(this._ajaxSettings(r, i, o)), this.xhr && "canceled" !== this.xhr.statusText && (s.addClass("ui-tabs-loading"), a.attr("aria-busy", "true"), this.xhr.done(function (e, t, s) {
                    setTimeout(function () {
                        a.html(e), n._trigger("load", i, o), l(s, t)
                    }, 1)
                }).fail(function (e, t) {
                    setTimeout(function () {
                        l(e, t)
                    }, 1)
                })))
            },
            _ajaxSettings: function (t, i, n) {
                var s = this;
                return {
                    url: t.attr("href"), beforeSend: function (t, r) {
                        return s._trigger("beforeLoad", i, e.extend({jqXHR: t, ajaxSettings: r}, n))
                    }
                }
            },
            _getPanelForTab: function (t) {
                var i = e(t).attr("aria-controls");
                return this.element.find(this._sanitizeSelector("#" + i))
            }
        });
        var a = "ui-effects-", o = e;
        e.effects = {effect: {}}, function (e, t) {
            function i(e, t, i) {
                var n = c[t.type] || {};
                return null == e ? i || !t.def ? null : t.def : (e = n.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : n.mod ? (e + n.mod) % n.mod : 0 > e ? 0 : e > n.max ? n.max : e)
            }

            function n(i) {
                var n = l(), s = n._rgba = [];
                return i = i.toLowerCase(), h(o, function (e, r) {
                    var a, o = r.re.exec(i), l = o && r.parse(o), c = r.space || "rgba";
                    return l ? (a = n[c](l), n[u[c].cache] = a[u[c].cache], s = n._rgba = a._rgba, !1) : t
                }), s.length ? ("0,0,0,0" === s.join() && e.extend(s, r.transparent), n) : r[i]
            }

            function s(e, t, i) {
                return i = (i + 1) % 1, 1 > 6 * i ? e + 6 * (t - e) * i : 1 > 2 * i ? t : 2 > 3 * i ? e + 6 * (t - e) * (2 / 3 - i) : e
            }

            var r, a = /^([\-+])=\s*(\d+\.?\d*)/, o = [{
                    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function (e) {
                        return [e[1], e[2], e[3], e[4]]
                    }
                }, {
                    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function (e) {
                        return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
                    }
                }, {
                    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function (e) {
                        return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
                    }
                }, {
                    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function (e) {
                        return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
                    }
                }, {
                    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    space: "hsla",
                    parse: function (e) {
                        return [e[1], e[2] / 100, e[3] / 100, e[4]]
                    }
                }], l = e.Color = function (t, i, n, s) {
                    return new e.Color.fn.parse(t, i, n, s)
                }, u = {
                    rgba: {
                        props: {
                            red: {idx: 0, type: "byte"},
                            green: {idx: 1, type: "byte"},
                            blue: {idx: 2, type: "byte"}
                        }
                    },
                    hsla: {
                        props: {
                            hue: {idx: 0, type: "degrees"},
                            saturation: {idx: 1, type: "percent"},
                            lightness: {idx: 2, type: "percent"}
                        }
                    }
                }, c = {byte: {floor: !0, max: 255}, percent: {max: 1}, degrees: {mod: 360, floor: !0}}, d = l.support = {},
                p = e("<p>")[0], h = e.each;
            p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, h(u, function (e, t) {
                t.cache = "_" + e, t.props.alpha = {idx: 3, type: "percent", def: 1}
            }), l.fn = e.extend(l.prototype, {
                parse: function (s, a, o, c) {
                    if (s === t) return this._rgba = [null, null, null, null], this;
                    (s.jquery || s.nodeType) && (s = e(s).css(a), a = t);
                    var d = this, p = e.type(s), f = this._rgba = [];
                    return a !== t && (s = [s, a, o, c], p = "array"), "string" === p ? this.parse(n(s) || r._default) : "array" === p ? (h(u.rgba.props, function (e, t) {
                        f[t.idx] = i(s[t.idx], t)
                    }), this) : "object" === p ? (s instanceof l ? h(u, function (e, t) {
                        s[t.cache] && (d[t.cache] = s[t.cache].slice())
                    }) : h(u, function (t, n) {
                        var r = n.cache;
                        h(n.props, function (e, t) {
                            if (!d[r] && n.to) {
                                if ("alpha" === e || null == s[e]) return;
                                d[r] = n.to(d._rgba)
                            }
                            d[r][t.idx] = i(s[e], t, !0)
                        }), d[r] && 0 > e.inArray(null, d[r].slice(0, 3)) && (d[r][3] = 1, n.from && (d._rgba = n.from(d[r])))
                    }), this) : t
                }, is: function (e) {
                    var i = l(e), n = !0, s = this;
                    return h(u, function (e, r) {
                        var a, o = i[r.cache];
                        return o && (a = s[r.cache] || r.to && r.to(s._rgba) || [], h(r.props, function (e, i) {
                            return null != o[i.idx] ? n = o[i.idx] === a[i.idx] : t
                        })), n
                    }), n
                }, _space: function () {
                    var e = [], t = this;
                    return h(u, function (i, n) {
                        t[n.cache] && e.push(i)
                    }), e.pop()
                }, transition: function (e, t) {
                    var n = l(e), s = n._space(), r = u[s], a = 0 === this.alpha() ? l("transparent") : this,
                        o = a[r.cache] || r.to(a._rgba), d = o.slice();
                    return n = n[r.cache], h(r.props, function (e, s) {
                        var r = s.idx, a = o[r], l = n[r], u = c[s.type] || {};
                        null !== l && (null === a ? d[r] = l : (u.mod && (l - a > u.mod / 2 ? a += u.mod : a - l > u.mod / 2 && (a -= u.mod)), d[r] = i((l - a) * t + a, s)))
                    }), this[s](d)
                }, blend: function (t) {
                    if (1 === this._rgba[3]) return this;
                    var i = this._rgba.slice(), n = i.pop(), s = l(t)._rgba;
                    return l(e.map(i, function (e, t) {
                        return (1 - n) * s[t] + n * e
                    }))
                }, toRgbaString: function () {
                    var t = "rgba(", i = e.map(this._rgba, function (e, t) {
                        return null == e ? t > 2 ? 1 : 0 : e
                    });
                    return 1 === i[3] && (i.pop(), t = "rgb("), t + i.join() + ")"
                }, toHslaString: function () {
                    var t = "hsla(", i = e.map(this.hsla(), function (e, t) {
                        return null == e && (e = t > 2 ? 1 : 0), t && 3 > t && (e = Math.round(100 * e) + "%"), e
                    });
                    return 1 === i[3] && (i.pop(), t = "hsl("), t + i.join() + ")"
                }, toHexString: function (t) {
                    var i = this._rgba.slice(), n = i.pop();
                    return t && i.push(~~(255 * n)), "#" + e.map(i, function (e) {
                        return e = (e || 0).toString(16), 1 === e.length ? "0" + e : e
                    }).join("")
                }, toString: function () {
                    return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                }
            }), l.fn.parse.prototype = l.fn, u.hsla.to = function (e) {
                if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
                var t, i, n = e[0] / 255, s = e[1] / 255, r = e[2] / 255, a = e[3], o = Math.max(n, s, r),
                    l = Math.min(n, s, r), u = o - l, c = o + l, d = .5 * c;
                return t = l === o ? 0 : n === o ? 60 * (s - r) / u + 360 : s === o ? 60 * (r - n) / u + 120 : 60 * (n - s) / u + 240, i = 0 === u ? 0 : .5 >= d ? u / c : u / (2 - c), [Math.round(t) % 360, i, d, null == a ? 1 : a]
            }, u.hsla.from = function (e) {
                if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
                var t = e[0] / 360, i = e[1], n = e[2], r = e[3], a = .5 >= n ? n * (1 + i) : n + i - n * i,
                    o = 2 * n - a;
                return [Math.round(255 * s(o, a, t + 1 / 3)), Math.round(255 * s(o, a, t)), Math.round(255 * s(o, a, t - 1 / 3)), r]
            }, h(u, function (n, s) {
                var r = s.props, o = s.cache, u = s.to, c = s.from;
                l.fn[n] = function (n) {
                    if (u && !this[o] && (this[o] = u(this._rgba)), n === t) return this[o].slice();
                    var s, a = e.type(n), d = "array" === a || "object" === a ? n : arguments, p = this[o].slice();
                    return h(r, function (e, t) {
                        var n = d["object" === a ? e : t.idx];
                        null == n && (n = p[t.idx]), p[t.idx] = i(n, t)
                    }), c ? (s = l(c(p)), s[o] = p, s) : l(p)
                }, h(r, function (t, i) {
                    l.fn[t] || (l.fn[t] = function (s) {
                        var r, o = e.type(s), l = "alpha" === t ? this._hsla ? "hsla" : "rgba" : n, u = this[l](),
                            c = u[i.idx];
                        return "undefined" === o ? c : ("function" === o && (s = s.call(this, c), o = e.type(s)), null == s && i.empty ? this : ("string" === o && (r = a.exec(s)) && (s = c + parseFloat(r[2]) * ("+" === r[1] ? 1 : -1)), u[i.idx] = s, this[l](u)))
                    })
                })
            }), l.hook = function (t) {
                var i = t.split(" ");
                h(i, function (t, i) {
                    e.cssHooks[i] = {
                        set: function (t, s) {
                            var r, a, o = "";
                            if ("transparent" !== s && ("string" !== e.type(s) || (r = n(s)))) {
                                if (s = l(r || s), !d.rgba && 1 !== s._rgba[3]) {
                                    for (a = "backgroundColor" === i ? t.parentNode : t; ("" === o || "transparent" === o) && a && a.style;) try {
                                        o = e.css(a, "backgroundColor"), a = a.parentNode
                                    } catch (e) {
                                    }
                                    s = s.blend(o && "transparent" !== o ? o : "_default")
                                }
                                s = s.toRgbaString()
                            }
                            try {
                                t.style[i] = s
                            } catch (e) {
                            }
                        }
                    }, e.fx.step[i] = function (t) {
                        t.colorInit || (t.start = l(t.elem, i), t.end = l(t.end), t.colorInit = !0), e.cssHooks[i].set(t.elem, t.start.transition(t.end, t.pos))
                    }
                })
            }, l.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"), e.cssHooks.borderColor = {
                expand: function (e) {
                    var t = {};
                    return h(["Top", "Right", "Bottom", "Left"], function (i, n) {
                        t["border" + n + "Color"] = e
                    }), t
                }
            }, r = e.Color.names = {
                aqua: "#00ffff",
                black: "#000000",
                blue: "#0000ff",
                fuchsia: "#ff00ff",
                gray: "#808080",
                green: "#008000",
                lime: "#00ff00",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                purple: "#800080",
                red: "#ff0000",
                silver: "#c0c0c0",
                teal: "#008080",
                white: "#ffffff",
                yellow: "#ffff00",
                transparent: [null, null, null, 0],
                _default: "#ffffff"
            }
        }(o), function () {
            function t(t) {
                var i, n,
                    s = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle,
                    r = {};
                if (s && s.length && s[0] && s[s[0]]) for (n = s.length; n--;) i = s[n], "string" == typeof s[i] && (r[e.camelCase(i)] = s[i]); else for (i in s) "string" == typeof s[i] && (r[i] = s[i]);
                return r
            }

            function i(t, i) {
                var n, r, a = {};
                for (n in i) r = i[n], t[n] !== r && (s[n] || (e.fx.step[n] || !isNaN(parseFloat(r))) && (a[n] = r));
                return a
            }

            var n = ["add", "remove", "toggle"], s = {
                border: 1,
                borderBottom: 1,
                borderColor: 1,
                borderLeft: 1,
                borderRight: 1,
                borderTop: 1,
                borderWidth: 1,
                margin: 1,
                padding: 1
            };
            e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (t, i) {
                e.fx.step[i] = function (e) {
                    ("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (o.style(e.elem, i, e.end), e.setAttr = !0)
                }
            }), e.fn.addBack || (e.fn.addBack = function (e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }), e.effects.animateClass = function (s, r, a, o) {
                var l = e.speed(r, a, o);
                return this.queue(function () {
                    var r, a = e(this), o = a.attr("class") || "", u = l.children ? a.find("*").addBack() : a;
                    u = u.map(function () {
                        return {el: e(this), start: t(this)}
                    }), (r = function () {
                        e.each(n, function (e, t) {
                            s[t] && a[t + "Class"](s[t])
                        })
                    })(), u = u.map(function () {
                        return this.end = t(this.el[0]), this.diff = i(this.start, this.end), this
                    }), a.attr("class", o), u = u.map(function () {
                        var t = this, i = e.Deferred(), n = e.extend({}, l, {
                            queue: !1, complete: function () {
                                i.resolve(t)
                            }
                        });
                        return this.el.animate(this.diff, n), i.promise()
                    }), e.when.apply(e, u.get()).done(function () {
                        r(), e.each(arguments, function () {
                            var t = this.el;
                            e.each(this.diff, function (e) {
                                t.css(e, "")
                            })
                        }), l.complete.call(a[0])
                    })
                })
            }, e.fn.extend({
                addClass: function (t) {
                    return function (i, n, s, r) {
                        return n ? e.effects.animateClass.call(this, {add: i}, n, s, r) : t.apply(this, arguments)
                    }
                }(e.fn.addClass), removeClass: function (t) {
                    return function (i, n, s, r) {
                        return arguments.length > 1 ? e.effects.animateClass.call(this, {remove: i}, n, s, r) : t.apply(this, arguments)
                    }
                }(e.fn.removeClass), toggleClass: function (t) {
                    return function (i, n, s, r, a) {
                        return "boolean" == typeof n || void 0 === n ? s ? e.effects.animateClass.call(this, n ? {add: i} : {remove: i}, s, r, a) : t.apply(this, arguments) : e.effects.animateClass.call(this, {toggle: i}, n, s, r)
                    }
                }(e.fn.toggleClass), switchClass: function (t, i, n, s, r) {
                    return e.effects.animateClass.call(this, {add: i, remove: t}, n, s, r)
                }
            })
        }(), function () {
            function t(t, i, n, s) {
                return e.isPlainObject(t) && (i = t, t = t.effect), t = {effect: t}, null == i && (i = {}), e.isFunction(i) && (s = i, n = null, i = {}), ("number" == typeof i || e.fx.speeds[i]) && (s = n, n = i, i = {}), e.isFunction(n) && (s = n, n = null), i && e.extend(t, i), n = n || i.duration, t.duration = e.fx.off ? 0 : "number" == typeof n ? n : n in e.fx.speeds ? e.fx.speeds[n] : e.fx.speeds._default, t.complete = s || i.complete, t
            }

            function i(t) {
                return !(t && "number" != typeof t && !e.fx.speeds[t]) || ("string" == typeof t && !e.effects.effect[t] || (!!e.isFunction(t) || "object" == typeof t && !t.effect))
            }

            e.extend(e.effects, {
                version: "1.11.4", save: function (e, t) {
                    for (var i = 0; t.length > i; i++) null !== t[i] && e.data(a + t[i], e[0].style[t[i]])
                }, restore: function (e, t) {
                    var i, n;
                    for (n = 0; t.length > n; n++) null !== t[n] && (void 0 === (i = e.data(a + t[n])) && (i = ""), e.css(t[n], i))
                }, setMode: function (e, t) {
                    return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t
                }, getBaseline: function (e, t) {
                    var i, n;
                    switch (e[0]) {
                        case"top":
                            i = 0;
                            break;
                        case"middle":
                            i = .5;
                            break;
                        case"bottom":
                            i = 1;
                            break;
                        default:
                            i = e[0] / t.height
                    }
                    switch (e[1]) {
                        case"left":
                            n = 0;
                            break;
                        case"center":
                            n = .5;
                            break;
                        case"right":
                            n = 1;
                            break;
                        default:
                            n = e[1] / t.width
                    }
                    return {x: n, y: i}
                }, createWrapper: function (t) {
                    if (t.parent().is(".ui-effects-wrapper")) return t.parent();
                    var i = {width: t.outerWidth(!0), height: t.outerHeight(!0), float: t.css("float")},
                        n = e("<div></div>").addClass("ui-effects-wrapper").css({
                            fontSize: "100%",
                            background: "transparent",
                            border: "none",
                            margin: 0,
                            padding: 0
                        }), s = {width: t.width(), height: t.height()}, r = document.activeElement;
                    try {
                        r.id
                    } catch (e) {
                        r = document.body
                    }
                    return t.wrap(n), (t[0] === r || e.contains(t[0], r)) && e(r).focus(), n = t.parent(), "static" === t.css("position") ? (n.css({position: "relative"}), t.css({position: "relative"})) : (e.extend(i, {
                        position: t.css("position"),
                        zIndex: t.css("z-index")
                    }), e.each(["top", "left", "bottom", "right"], function (e, n) {
                        i[n] = t.css(n), isNaN(parseInt(i[n], 10)) && (i[n] = "auto")
                    }), t.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })), t.css(s), n.css(i).show()
                }, removeWrapper: function (t) {
                    var i = document.activeElement;
                    return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || e.contains(t[0], i)) && e(i).focus()), t
                }, setTransition: function (t, i, n, s) {
                    return s = s || {}, e.each(i, function (e, i) {
                        var r = t.cssUnit(i);
                        r[0] > 0 && (s[i] = r[0] * n + r[1])
                    }), s
                }
            }), e.fn.extend({
                effect: function () {
                    function i(t) {
                        function i() {
                            e.isFunction(r) && r.call(s[0]), e.isFunction(t) && t()
                        }

                        var s = e(this), r = n.complete, o = n.mode;
                        (s.is(":hidden") ? "hide" === o : "show" === o) ? (s[o](), i()) : a.call(s[0], n, i)
                    }

                    var n = t.apply(this, arguments), s = n.mode, r = n.queue, a = e.effects.effect[n.effect];
                    return e.fx.off || !a ? s ? this[s](n.duration, n.complete) : this.each(function () {
                        n.complete && n.complete.call(this)
                    }) : !1 === r ? this.each(i) : this.queue(r || "fx", i)
                }, show: function (e) {
                    return function (n) {
                        if (i(n)) return e.apply(this, arguments);
                        var s = t.apply(this, arguments);
                        return s.mode = "show", this.effect.call(this, s)
                    }
                }(e.fn.show), hide: function (e) {
                    return function (n) {
                        if (i(n)) return e.apply(this, arguments);
                        var s = t.apply(this, arguments);
                        return s.mode = "hide", this.effect.call(this, s)
                    }
                }(e.fn.hide), toggle: function (e) {
                    return function (n) {
                        if (i(n) || "boolean" == typeof n) return e.apply(this, arguments);
                        var s = t.apply(this, arguments);
                        return s.mode = "toggle", this.effect.call(this, s)
                    }
                }(e.fn.toggle), cssUnit: function (t) {
                    var i = this.css(t), n = [];
                    return e.each(["em", "px", "%", "pt"], function (e, t) {
                        i.indexOf(t) > 0 && (n = [parseFloat(i), t])
                    }), n
                }
            })
        }(), function () {
            var t = {};
            e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (e, i) {
                t[i] = function (t) {
                    return Math.pow(t, e + 2)
                }
            }), e.extend(t, {
                Sine: function (e) {
                    return 1 - Math.cos(e * Math.PI / 2)
                }, Circ: function (e) {
                    return 1 - Math.sqrt(1 - e * e)
                }, Elastic: function (e) {
                    return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
                }, Back: function (e) {
                    return e * e * (3 * e - 2)
                }, Bounce: function (e) {
                    for (var t, i = 4; ((t = Math.pow(2, --i)) - 1) / 11 > e;) ;
                    return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
                }
            }), e.each(t, function (t, i) {
                e.easing["easeIn" + t] = i, e.easing["easeOut" + t] = function (e) {
                    return 1 - i(1 - e)
                }, e.easing["easeInOut" + t] = function (e) {
                    return .5 > e ? i(2 * e) / 2 : 1 - i(-2 * e + 2) / 2
                }
            })
        }(), e.effects, e.effects.effect.fade = function (t, i) {
            var n = e(this), s = e.effects.setMode(n, t.mode || "toggle");
            n.animate({opacity: s}, {queue: !1, duration: t.duration, easing: t.easing, complete: i})
        }, e.effects.effect.slide = function (t, i) {
            var n, s = e(this), r = ["position", "top", "bottom", "left", "right", "width", "height"],
                a = e.effects.setMode(s, t.mode || "show"), o = "show" === a, l = t.direction || "left",
                u = "up" === l || "down" === l ? "top" : "left", c = "up" === l || "left" === l, d = {};
            e.effects.save(s, r), s.show(), n = t.distance || s["top" === u ? "outerHeight" : "outerWidth"](!0), e.effects.createWrapper(s).css({overflow: "hidden"}), o && s.css(u, c ? isNaN(n) ? "-" + n : -n : n), d[u] = (o ? c ? "+=" : "-=" : c ? "-=" : "+=") + n, s.animate(d, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: function () {
                    "hide" === a && s.hide(), e.effects.restore(s, r), e.effects.removeWrapper(s), i()
                }
            })
        }
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+function (e) {
    "use strict";
    var t = e.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1 || t[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), function (e) {
    "use strict";
    var t = '[data-dismiss="alert"]', i = function (i) {
        e(i).on("click", t, this.close)
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.prototype.close = function (t) {
        function n() {
            a.detach().trigger("closed.bs.alert").remove()
        }

        var s = e(this), r = s.attr("data-target");
        r || (r = s.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
        var a = e("#" === r ? [] : r);
        t && t.preventDefault(), a.length || (a = s.closest(".alert")), a.trigger(t = e.Event("close.bs.alert")), t.isDefaultPrevented() || (a.removeClass("in"), e.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n())
    };
    var n = e.fn.alert;
    e.fn.alert = function (t) {
        return this.each(function () {
            var n = e(this), s = n.data("bs.alert");
            s || n.data("bs.alert", s = new i(this)), "string" == typeof t && s[t].call(n)
        })
    }, e.fn.alert.Constructor = i, e.fn.alert.noConflict = function () {
        return e.fn.alert = n, this
    }, e(document).on("click.bs.alert.data-api", t, i.prototype.close)
}(jQuery), function (e) {
    "use strict";

    function t(t) {
        return this.each(function () {
            var n = e(this), s = n.data("bs.button"), r = "object" == typeof t && t;
            s || n.data("bs.button", s = new i(this, r)), "toggle" == t ? s.toggle() : t && s.setState(t)
        })
    }

    var i = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, i.DEFAULTS, n), this.isLoading = !1
    };
    i.VERSION = "3.3.7", i.DEFAULTS = {loadingText: "loading..."}, i.prototype.setState = function (t) {
        var i = "disabled", n = this.$element, s = n.is("input") ? "val" : "html", r = n.data();
        t += "Text", null == r.resetText && n.data("resetText", n[s]()), setTimeout(e.proxy(function () {
            n[s](null == r[t] ? this.options[t] : r[t]), "loadingText" == t ? (this.isLoading = !0, n.addClass(i).attr(i, i).prop(i, !0)) : this.isLoading && (this.isLoading = !1, n.removeClass(i).removeAttr(i).prop(i, !1))
        }, this), 0)
    }, i.prototype.toggle = function () {
        var e = !0, t = this.$element.closest('[data-toggle="buttons"]');
        if (t.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") ? (i.prop("checked") && (e = !1), t.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (e = !1), this.$element.toggleClass("active")), i.prop("checked", this.$element.hasClass("active")), e && i.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var n = e.fn.button;
    e.fn.button = t, e.fn.button.Constructor = i, e.fn.button.noConflict = function () {
        return e.fn.button = n, this
    }, e(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (i) {
        var n = e(i.target).closest(".btn");
        t.call(n, "toggle"), e(i.target).is('input[type="radio"], input[type="checkbox"]') || (i.preventDefault(), n.is("input,button") ? n.trigger("focus") : n.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (t) {
        e(t.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(t.type))
    })
}(jQuery), function (e) {
    "use strict";

    function t(t) {
        return this.each(function () {
            var n = e(this), s = n.data("bs.carousel"),
                r = e.extend({}, i.DEFAULTS, n.data(), "object" == typeof t && t),
                a = "string" == typeof t ? t : r.slide;
            s || n.data("bs.carousel", s = new i(this, r)), "number" == typeof t ? s.to(t) : a ? s[a]() : r.interval && s.pause().cycle()
        })
    }

    var i = function (t, i) {
        this.$element = e(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", e.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", e.proxy(this.pause, this)).on("mouseleave.bs.carousel", e.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function (e) {
        if (!/input|textarea/i.test(e.target.tagName)) {
            switch (e.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            e.preventDefault()
        }
    }, i.prototype.cycle = function (t) {
        return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function (e) {
        return this.$items = e.parent().children(".item"), this.$items.index(e || this.$active)
    }, i.prototype.getItemForDirection = function (e, t) {
        var i = this.getItemIndex(t);
        if (("prev" == e && 0 === i || "next" == e && i == this.$items.length - 1) && !this.options.wrap) return t;
        var n = (i + ("prev" == e ? -1 : 1)) % this.$items.length;
        return this.$items.eq(n)
    }, i.prototype.to = function (e) {
        var t = this, i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return e > this.$items.length - 1 || 0 > e ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
            t.to(e)
        }) : i == e ? this.pause().cycle() : this.slide(e > i ? "next" : "prev", this.$items.eq(e))
    }, i.prototype.pause = function (t) {
        return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition && (this.$element.trigger(e.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next")
    }, i.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, i.prototype.slide = function (t, n) {
        var s = this.$element.find(".item.active"), r = n || this.getItemForDirection(t, s), a = this.interval,
            o = "next" == t ? "left" : "right", l = this;
        if (r.hasClass("active")) return this.sliding = !1;
        var u = r[0], c = e.Event("slide.bs.carousel", {relatedTarget: u, direction: o});
        if (this.$element.trigger(c), !c.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var d = e(this.$indicators.children()[this.getItemIndex(r)]);
                d && d.addClass("active")
            }
            var p = e.Event("slid.bs.carousel", {relatedTarget: u, direction: o});
            return e.support.transition && this.$element.hasClass("slide") ? (r.addClass(t), r[0].offsetWidth, s.addClass(o), r.addClass(o), s.one("bsTransitionEnd", function () {
                r.removeClass([t, o].join(" ")).addClass("active"), s.removeClass(["active", o].join(" ")), l.sliding = !1, setTimeout(function () {
                    l.$element.trigger(p)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (s.removeClass("active"), r.addClass("active"), this.sliding = !1, this.$element.trigger(p)), a && this.cycle(), this
        }
    };
    var n = e.fn.carousel;
    e.fn.carousel = t, e.fn.carousel.Constructor = i, e.fn.carousel.noConflict = function () {
        return e.fn.carousel = n, this
    };
    var s = function (i) {
        var n, s = e(this), r = e(s.attr("data-target") || (n = s.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""));
        if (r.hasClass("carousel")) {
            var a = e.extend({}, r.data(), s.data()), o = s.attr("data-slide-to");
            o && (a.interval = !1), t.call(r, a), o && r.data("bs.carousel").to(o), i.preventDefault()
        }
    };
    e(document).on("click.bs.carousel.data-api", "[data-slide]", s).on("click.bs.carousel.data-api", "[data-slide-to]", s), e(window).on("load", function () {
        e('[data-ride="carousel"]').each(function () {
            var i = e(this);
            t.call(i, i.data())
        })
    })
}(jQuery), function (e) {
    "use strict";

    function t(t) {
        var i = t.attr("data-target");
        i || (i = t.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var n = i && e(i);
        return n && n.length ? n : t.parent()
    }

    function i(i) {
        i && 3 === i.which || (e(n).remove(), e(s).each(function () {
            var n = e(this), s = t(n), r = {relatedTarget: this};
            s.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && e.contains(s[0], i.target) || (s.trigger(i = e.Event("hide.bs.dropdown", r)), i.isDefaultPrevented() || (n.attr("aria-expanded", "false"), s.removeClass("open").trigger(e.Event("hidden.bs.dropdown", r)))))
        }))
    }

    var n = ".dropdown-backdrop", s = '[data-toggle="dropdown"]', r = function (t) {
        e(t).on("click.bs.dropdown", this.toggle)
    };
    r.VERSION = "3.3.7", r.prototype.toggle = function (n) {
        var s = e(this);
        if (!s.is(".disabled, :disabled")) {
            var r = t(s), a = r.hasClass("open");
            if (i(), !a) {
                "ontouchstart" in document.documentElement && !r.closest(".navbar-nav").length && e(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(e(this)).on("click", i);
                var o = {relatedTarget: this};
                if (r.trigger(n = e.Event("show.bs.dropdown", o)), n.isDefaultPrevented()) return;
                s.trigger("focus").attr("aria-expanded", "true"), r.toggleClass("open").trigger(e.Event("shown.bs.dropdown", o))
            }
            return !1
        }
    }, r.prototype.keydown = function (i) {
        if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
            var n = e(this);
            if (i.preventDefault(), i.stopPropagation(), !n.is(".disabled, :disabled")) {
                var r = t(n), a = r.hasClass("open");
                if (!a && 27 != i.which || a && 27 == i.which) return 27 == i.which && r.find(s).trigger("focus"), n.trigger("click");
                var o = r.find(".dropdown-menu li:not(.disabled):visible a");
                if (o.length) {
                    var l = o.index(i.target);
                    38 == i.which && l > 0 && l--, 40 == i.which && l < o.length - 1 && l++, ~l || (l = 0), o.eq(l).trigger("focus")
                }
            }
        }
    };
    var a = e.fn.dropdown;
    e.fn.dropdown = function (t) {
        return this.each(function () {
            var i = e(this), n = i.data("bs.dropdown");
            n || i.data("bs.dropdown", n = new r(this)), "string" == typeof t && n[t].call(i)
        })
    }, e.fn.dropdown.Constructor = r, e.fn.dropdown.noConflict = function () {
        return e.fn.dropdown = a, this
    }, e(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function (e) {
        e.stopPropagation()
    }).on("click.bs.dropdown.data-api", s, r.prototype.toggle).on("keydown.bs.dropdown.data-api", s, r.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", r.prototype.keydown)
}(jQuery), function (e) {
    "use strict";

    function t(t, n) {
        return this.each(function () {
            var s = e(this), r = s.data("bs.modal"), a = e.extend({}, i.DEFAULTS, s.data(), "object" == typeof t && t);
            r || s.data("bs.modal", r = new i(this, a)), "string" == typeof t ? r[t](n) : a.show && r.show(n)
        })
    }

    var i = function (t, i) {
        this.options = i, this.$body = e(document.body), this.$element = e(t), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, e.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function (e) {
        return this.isShown ? this.hide() : this.show(e)
    }, i.prototype.show = function (t) {
        var n = this, s = e.Event("show.bs.modal", {relatedTarget: t});
        this.$element.trigger(s), this.isShown || s.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            n.$element.one("mouseup.dismiss.bs.modal", function (t) {
                e(t.target).is(n.$element) && (n.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function () {
            var s = e.support.transition && n.$element.hasClass("fade");
            n.$element.parent().length || n.$element.appendTo(n.$body), n.$element.show().scrollTop(0), n.adjustDialog(), s && n.$element[0].offsetWidth, n.$element.addClass("in"), n.enforceFocus();
            var r = e.Event("shown.bs.modal", {relatedTarget: t});
            s ? n.$dialog.one("bsTransitionEnd", function () {
                n.$element.trigger("focus").trigger(r)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : n.$element.trigger("focus").trigger(r)
        }))
    }, i.prototype.hide = function (t) {
        t && t.preventDefault(), t = e.Event("hide.bs.modal"), this.$element.trigger(t), this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), e(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), e.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", e.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    }, i.prototype.enforceFocus = function () {
        e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function (e) {
            document === e.target || this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus")
        }, this))
    }, i.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", e.proxy(function (e) {
            27 == e.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, i.prototype.resize = function () {
        this.isShown ? e(window).on("resize.bs.modal", e.proxy(this.handleUpdate, this)) : e(window).off("resize.bs.modal")
    }, i.prototype.hideModal = function () {
        var e = this;
        this.$element.hide(), this.backdrop(function () {
            e.$body.removeClass("modal-open"), e.resetAdjustments(), e.resetScrollbar(), e.$element.trigger("hidden.bs.modal")
        })
    }, i.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, i.prototype.backdrop = function (t) {
        var n = this, s = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var r = e.support.transition && s;
            if (this.$backdrop = e(document.createElement("div")).addClass("modal-backdrop " + s).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", e.proxy(function (e) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), r && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t) return;
            r ? this.$backdrop.one("bsTransitionEnd", t).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : t()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function () {
                n.removeBackdrop(), t && t()
            };
            e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : a()
        } else t && t()
    }, i.prototype.handleUpdate = function () {
        this.adjustDialog()
    }, i.prototype.adjustDialog = function () {
        var e = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && e ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !e ? this.scrollbarWidth : ""
        })
    }, i.prototype.resetAdjustments = function () {
        this.$element.css({paddingLeft: "", paddingRight: ""})
    }, i.prototype.checkScrollbar = function () {
        var e = window.innerWidth;
        if (!e) {
            var t = document.documentElement.getBoundingClientRect();
            e = t.right - Math.abs(t.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < e, this.scrollbarWidth = this.measureScrollbar()
    }, i.prototype.setScrollbar = function () {
        var e = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", e + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad)
    }, i.prototype.measureScrollbar = function () {
        var e = document.createElement("div");
        e.className = "modal-scrollbar-measure", this.$body.append(e);
        var t = e.offsetWidth - e.clientWidth;
        return this.$body[0].removeChild(e), t
    };
    var n = e.fn.modal;
    e.fn.modal = t, e.fn.modal.Constructor = i, e.fn.modal.noConflict = function () {
        return e.fn.modal = n, this
    }, e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (i) {
        var n = e(this), s = n.attr("href"), r = e(n.attr("data-target") || s && s.replace(/.*(?=#[^\s]+$)/, "")),
            a = r.data("bs.modal") ? "toggle" : e.extend({remote: !/#/.test(s) && s}, r.data(), n.data());
        n.is("a") && i.preventDefault(), r.one("show.bs.modal", function (e) {
            e.isDefaultPrevented() || r.one("hidden.bs.modal", function () {
                n.is(":visible") && n.trigger("focus")
            })
        }), t.call(r, a, this)
    })
}(jQuery), function (e) {
    "use strict";
    var t = function (e, t) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", e, t)
    };
    t.VERSION = "3.3.7", t.TRANSITION_DURATION = 150, t.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, t.prototype.init = function (t, i, n) {
        if (this.enabled = !0, this.type = t, this.$element = e(i), this.options = this.getOptions(n), this.$viewport = this.options.viewport && e(e.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var s = this.options.trigger.split(" "), r = s.length; r--;) {
            var a = s[r];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)); else if ("manual" != a) {
                var o = "hover" == a ? "mouseenter" : "focusin", l = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(o + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, e.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = e.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, t.prototype.getDefaults = function () {
        return t.DEFAULTS
    }, t.prototype.getOptions = function (t) {
        return (t = e.extend({}, this.getDefaults(), this.$element.data(), t)).delay && "number" == typeof t.delay && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), t
    }, t.prototype.getDelegateOptions = function () {
        var t = {}, i = this.getDefaults();
        return this._options && e.each(this._options, function (e, n) {
            i[e] != n && (t[e] = n)
        }), t
    }, t.prototype.enter = function (t) {
        var i = t instanceof this.constructor ? t : e(t.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), e(t.currentTarget).data("bs." + this.type, i)), t instanceof e.Event && (i.inState["focusin" == t.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState ? void(i.hoverState = "in") : (clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function () {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }, t.prototype.isInStateTrue = function () {
        for (var e in this.inState) if (this.inState[e]) return !0;
        return !1
    }, t.prototype.leave = function (t) {
        var i = t instanceof this.constructor ? t : e(t.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), e(t.currentTarget).data("bs." + this.type, i)), t instanceof e.Event && (i.inState["focusout" == t.type ? "focus" : "hover"] = !1), i.isInStateTrue() ? void 0 : (clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function () {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide())
    }, t.prototype.show = function () {
        var i = e.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(i);
            var n = e.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (i.isDefaultPrevented() || !n) return;
            var s = this, r = this.tip(), a = this.getUID(this.type);
            this.setContent(), r.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && r.addClass("fade");
            var o = "function" == typeof this.options.placement ? this.options.placement.call(this, r[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i, u = l.test(o);
            u && (o = o.replace(l, "") || "top"), r.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(o).data("bs." + this.type, this), this.options.container ? r.appendTo(this.options.container) : r.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var c = this.getPosition(), d = r[0].offsetWidth, p = r[0].offsetHeight;
            if (u) {
                var h = o, f = this.getPosition(this.$viewport);
                o = "bottom" == o && c.bottom + p > f.bottom ? "top" : "top" == o && c.top - p < f.top ? "bottom" : "right" == o && c.right + d > f.width ? "left" : "left" == o && c.left - d < f.left ? "right" : o, r.removeClass(h).addClass(o)
            }
            var m = this.getCalculatedOffset(o, c, d, p);
            this.applyPlacement(m, o);
            var g = function () {
                var e = s.hoverState;
                s.$element.trigger("shown.bs." + s.type), s.hoverState = null, "out" == e && s.leave(s)
            };
            e.support.transition && this.$tip.hasClass("fade") ? r.one("bsTransitionEnd", g).emulateTransitionEnd(t.TRANSITION_DURATION) : g()
        }
    }, t.prototype.applyPlacement = function (t, i) {
        var n = this.tip(), s = n[0].offsetWidth, r = n[0].offsetHeight, a = parseInt(n.css("margin-top"), 10),
            o = parseInt(n.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(o) && (o = 0), t.top += a, t.left += o, e.offset.setOffset(n[0], e.extend({
            using: function (e) {
                n.css({top: Math.round(e.top), left: Math.round(e.left)})
            }
        }, t), 0), n.addClass("in");
        var l = n[0].offsetWidth, u = n[0].offsetHeight;
        "top" == i && u != r && (t.top = t.top + r - u);
        var c = this.getViewportAdjustedDelta(i, t, l, u);
        c.left ? t.left += c.left : t.top += c.top;
        var d = /top|bottom/.test(i), p = d ? 2 * c.left - s + l : 2 * c.top - r + u,
            h = d ? "offsetWidth" : "offsetHeight";
        n.offset(t), this.replaceArrow(p, n[0][h], d)
    }, t.prototype.replaceArrow = function (e, t, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - e / t) + "%").css(i ? "top" : "left", "")
    }, t.prototype.setContent = function () {
        var e = this.tip(), t = this.getTitle();
        e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
    }, t.prototype.hide = function (i) {
        function n() {
            "in" != s.hoverState && r.detach(), s.$element && s.$element.removeAttr("aria-describedby").trigger("hidden.bs." + s.type), i && i()
        }

        var s = this, r = e(this.$tip), a = e.Event("hide.bs." + this.type);
        return this.$element.trigger(a), a.isDefaultPrevented() ? void 0 : (r.removeClass("in"), e.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", n).emulateTransitionEnd(t.TRANSITION_DURATION) : n(), this.hoverState = null, this)
    }, t.prototype.fixTitle = function () {
        var e = this.$element;
        (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
    }, t.prototype.hasContent = function () {
        return this.getTitle()
    }, t.prototype.getPosition = function (t) {
        var i = (t = t || this.$element)[0], n = "BODY" == i.tagName, s = i.getBoundingClientRect();
        null == s.width && (s = e.extend({}, s, {width: s.right - s.left, height: s.bottom - s.top}));
        var r = window.SVGElement && i instanceof window.SVGElement, a = n ? {top: 0, left: 0} : r ? null : t.offset(),
            o = {scroll: n ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()},
            l = n ? {width: e(window).width(), height: e(window).height()} : null;
        return e.extend({}, s, o, l, a)
    }, t.prototype.getCalculatedOffset = function (e, t, i, n) {
        return "bottom" == e ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - i / 2
        } : "top" == e ? {
            top: t.top - n,
            left: t.left + t.width / 2 - i / 2
        } : "left" == e ? {top: t.top + t.height / 2 - n / 2, left: t.left - i} : {
            top: t.top + t.height / 2 - n / 2,
            left: t.left + t.width
        }
    }, t.prototype.getViewportAdjustedDelta = function (e, t, i, n) {
        var s = {top: 0, left: 0};
        if (!this.$viewport) return s;
        var r = this.options.viewport && this.options.viewport.padding || 0, a = this.getPosition(this.$viewport);
        if (/right|left/.test(e)) {
            var o = t.top - r - a.scroll, l = t.top + r - a.scroll + n;
            o < a.top ? s.top = a.top - o : l > a.top + a.height && (s.top = a.top + a.height - l)
        } else {
            var u = t.left - r, c = t.left + r + i;
            u < a.left ? s.left = a.left - u : c > a.right && (s.left = a.left + a.width - c)
        }
        return s
    }, t.prototype.getTitle = function () {
        var e = this.$element, t = this.options;
        return e.attr("data-original-title") || ("function" == typeof t.title ? t.title.call(e[0]) : t.title)
    }, t.prototype.getUID = function (e) {
        do {
            e += ~~(1e6 * Math.random())
        } while (document.getElementById(e));
        return e
    }, t.prototype.tip = function () {
        if (!this.$tip && (this.$tip = e(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, t.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, t.prototype.enable = function () {
        this.enabled = !0
    }, t.prototype.disable = function () {
        this.enabled = !1
    }, t.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, t.prototype.toggle = function (t) {
        var i = this;
        t && ((i = e(t.currentTarget).data("bs." + this.type)) || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), e(t.currentTarget).data("bs." + this.type, i))), t ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, t.prototype.destroy = function () {
        var e = this;
        clearTimeout(this.timeout), this.hide(function () {
            e.$element.off("." + e.type).removeData("bs." + e.type), e.$tip && e.$tip.detach(), e.$tip = null, e.$arrow = null, e.$viewport = null, e.$element = null
        })
    };
    var i = e.fn.tooltip;
    e.fn.tooltip = function (i) {
        return this.each(function () {
            var n = e(this), s = n.data("bs.tooltip"), r = "object" == typeof i && i;
            !s && /destroy|hide/.test(i) || (s || n.data("bs.tooltip", s = new t(this, r)), "string" == typeof i && s[i]())
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.noConflict = function () {
        return e.fn.tooltip = i, this
    }
}(jQuery), function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("popover", e, t)
    };
    if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
    t.VERSION = "3.3.7", t.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype), t.prototype.constructor = t, t.prototype.getDefaults = function () {
        return t.DEFAULTS
    }, t.prototype.setContent = function () {
        var e = this.tip(), t = this.getTitle(), i = this.getContent();
        e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide()
    }, t.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, t.prototype.getContent = function () {
        var e = this.$element, t = this.options;
        return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) : t.content)
    }, t.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var i = e.fn.popover;
    e.fn.popover = function (i) {
        return this.each(function () {
            var n = e(this), s = n.data("bs.popover"), r = "object" == typeof i && i;
            !s && /destroy|hide/.test(i) || (s || n.data("bs.popover", s = new t(this, r)), "string" == typeof i && s[i]())
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.noConflict = function () {
        return e.fn.popover = i, this
    }
}(jQuery), function (e) {
    "use strict";

    function t(t) {
        return this.each(function () {
            var n = e(this), s = n.data("bs.tab");
            s || n.data("bs.tab", s = new i(this)), "string" == typeof t && s[t]()
        })
    }

    var i = function (t) {
        this.element = e(t)
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.prototype.show = function () {
        var t = this.element, i = t.closest("ul:not(.dropdown-menu)"), n = t.data("target");
        if (n || (n = t.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
            var s = i.find(".active:last a"), r = e.Event("hide.bs.tab", {relatedTarget: t[0]}),
                a = e.Event("show.bs.tab", {relatedTarget: s[0]});
            if (s.trigger(r), t.trigger(a), !a.isDefaultPrevented() && !r.isDefaultPrevented()) {
                var o = e(n);
                this.activate(t.closest("li"), i), this.activate(o, o.parent(), function () {
                    s.trigger({type: "hidden.bs.tab", relatedTarget: t[0]}), t.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: s[0]
                    })
                })
            }
        }
    }, i.prototype.activate = function (t, n, s) {
        function r() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), o ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu").length && t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), s && s()
        }

        var a = n.find("> .active"),
            o = s && e.support.transition && (a.length && a.hasClass("fade") || !!n.find("> .fade").length);
        a.length && o ? a.one("bsTransitionEnd", r).emulateTransitionEnd(i.TRANSITION_DURATION) : r(), a.removeClass("in")
    };
    var n = e.fn.tab;
    e.fn.tab = t, e.fn.tab.Constructor = i, e.fn.tab.noConflict = function () {
        return e.fn.tab = n, this
    };
    var s = function (i) {
        i.preventDefault(), t.call(e(this), "show")
    };
    e(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', s).on("click.bs.tab.data-api", '[data-toggle="pill"]', s)
}(jQuery), function (e) {
    "use strict";

    function t(t) {
        return this.each(function () {
            var n = e(this), s = n.data("bs.affix"), r = "object" == typeof t && t;
            s || n.data("bs.affix", s = new i(this, r)), "string" == typeof t && s[t]()
        })
    }

    var i = function (t, n) {
        this.options = e.extend({}, i.DEFAULTS, n), this.$target = e(this.options.target).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this)), this.$element = e(t), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    i.VERSION = "3.3.7", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function (e, t, i, n) {
        var s = this.$target.scrollTop(), r = this.$element.offset(), a = this.$target.height();
        if (null != i && "top" == this.affixed) return i > s && "top";
        if ("bottom" == this.affixed) return null != i ? !(s + this.unpin <= r.top) && "bottom" : !(e - n >= s + a) && "bottom";
        var o = null == this.affixed, l = o ? s : r.top, u = o ? a : t;
        return null != i && i >= s ? "top" : null != n && l + u >= e - n && "bottom"
    }, i.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var e = this.$target.scrollTop(), t = this.$element.offset();
        return this.pinnedOffset = t.top - e
    }, i.prototype.checkPositionWithEventLoop = function () {
        setTimeout(e.proxy(this.checkPosition, this), 1)
    }, i.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var t = this.$element.height(), n = this.options.offset, s = n.top, r = n.bottom,
                a = Math.max(e(document).height(), e(document.body).height());
            "object" != typeof n && (r = s = n), "function" == typeof s && (s = n.top(this.$element)), "function" == typeof r && (r = n.bottom(this.$element));
            var o = this.getState(a, t, s, r);
            if (this.affixed != o) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (o ? "-" + o : ""), u = e.Event(l + ".bs.affix");
                if (this.$element.trigger(u), u.isDefaultPrevented()) return;
                this.affixed = o, this.unpin = "bottom" == o ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == o && this.$element.offset({top: a - t - r})
        }
    };
    var n = e.fn.affix;
    e.fn.affix = t, e.fn.affix.Constructor = i, e.fn.affix.noConflict = function () {
        return e.fn.affix = n, this
    }, e(window).on("load", function () {
        e('[data-spy="affix"]').each(function () {
            var i = e(this), n = i.data();
            n.offset = n.offset || {}, null != n.offsetBottom && (n.offset.bottom = n.offsetBottom), null != n.offsetTop && (n.offset.top = n.offsetTop), t.call(i, n)
        })
    })
}(jQuery), function (e) {
    "use strict";

    function t(t) {
        var i, n = t.attr("data-target") || (i = t.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return e(n)
    }

    function i(t) {
        return this.each(function () {
            var i = e(this), s = i.data("bs.collapse"),
                r = e.extend({}, n.DEFAULTS, i.data(), "object" == typeof t && t);
            !s && r.toggle && /show|hide/.test(t) && (r.toggle = !1), s || i.data("bs.collapse", s = new n(this, r)), "string" == typeof t && s[t]()
        })
    }

    var n = function (t, i) {
        this.$element = e(t), this.options = e.extend({}, n.DEFAULTS, i), this.$trigger = e('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 350, n.DEFAULTS = {toggle: !0}, n.prototype.dimension = function () {
        return this.$element.hasClass("width") ? "width" : "height"
    }, n.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var t, s = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(s && s.length && (t = s.data("bs.collapse")) && t.transitioning)) {
                var r = e.Event("show.bs.collapse");
                if (this.$element.trigger(r), !r.isDefaultPrevented()) {
                    s && s.length && (i.call(s, "hide"), t || s.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var o = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!e.support.transition) return o.call(this);
                    var l = e.camelCase(["scroll", a].join("-"));
                    this.$element.one("bsTransitionEnd", e.proxy(o, this)).emulateTransitionEnd(n.TRANSITION_DURATION)[a](this.$element[0][l])
                }
            }
        }
    }, n.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var t = e.Event("hide.bs.collapse");
            if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var s = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return e.support.transition ? void this.$element[i](0).one("bsTransitionEnd", e.proxy(s, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : s.call(this)
            }
        }
    }, n.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, n.prototype.getParent = function () {
        return e(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(e.proxy(function (i, n) {
            var s = e(n);
            this.addAriaAndCollapsedClass(t(s), s)
        }, this)).end()
    }, n.prototype.addAriaAndCollapsedClass = function (e, t) {
        var i = e.hasClass("in");
        e.attr("aria-expanded", i), t.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var s = e.fn.collapse;
    e.fn.collapse = i, e.fn.collapse.Constructor = n, e.fn.collapse.noConflict = function () {
        return e.fn.collapse = s, this
    }, e(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (n) {
        var s = e(this);
        s.attr("data-target") || n.preventDefault();
        var r = t(s), a = r.data("bs.collapse") ? "toggle" : s.data();
        i.call(r, a)
    })
}(jQuery), function (e) {
    "use strict";

    function t(i, n) {
        this.$body = e(document.body), this.$scrollElement = e(e(i).is(document.body) ? window : i), this.options = e.extend({}, t.DEFAULTS, n), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", e.proxy(this.process, this)), this.refresh(), this.process()
    }

    function i(i) {
        return this.each(function () {
            var n = e(this), s = n.data("bs.scrollspy"), r = "object" == typeof i && i;
            s || n.data("bs.scrollspy", s = new t(this, r)), "string" == typeof i && s[i]()
        })
    }

    t.VERSION = "3.3.7", t.DEFAULTS = {offset: 10}, t.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, t.prototype.refresh = function () {
        var t = this, i = "offset", n = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), e.isWindow(this.$scrollElement[0]) || (i = "position", n = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
            var t = e(this), s = t.data("target") || t.attr("href"), r = /^#./.test(s) && e(s);
            return r && r.length && r.is(":visible") && [[r[i]().top + n, s]] || null
        }).sort(function (e, t) {
            return e[0] - t[0]
        }).each(function () {
            t.offsets.push(this[0]), t.targets.push(this[1])
        })
    }, t.prototype.process = function () {
        var e, t = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(),
            n = this.options.offset + i - this.$scrollElement.height(), s = this.offsets, r = this.targets,
            a = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), t >= n) return a != (e = r[r.length - 1]) && this.activate(e);
        if (a && t < s[0]) return this.activeTarget = null, this.clear();
        for (e = s.length; e--;) a != r[e] && t >= s[e] && (void 0 === s[e + 1] || t < s[e + 1]) && this.activate(r[e])
    }, t.prototype.activate = function (t) {
        this.activeTarget = t, this.clear();
        var i = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            n = e(i).parents("li").addClass("active");
        n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate.bs.scrollspy")
    }, t.prototype.clear = function () {
        e(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var n = e.fn.scrollspy;
    e.fn.scrollspy = i, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.noConflict = function () {
        return e.fn.scrollspy = n, this
    }, e(window).on("load.bs.scrollspy.data-api", function () {
        e('[data-spy="scroll"]').each(function () {
            var t = e(this);
            i.call(t, t.data())
        })
    })
}(jQuery), function (e) {
    "use strict";

    function t() {
        var e = document.createElement("bootstrap"), t = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var i in t) if (void 0 !== e.style[i]) return {end: t[i]};
        return !1
    }

    e.fn.emulateTransitionEnd = function (t) {
        var i = !1, n = this;
        e(this).one("bsTransitionEnd", function () {
            i = !0
        });
        return setTimeout(function () {
            i || e(n).trigger(e.support.transition.end)
        }, t), this
    }, e(function () {
        e.support.transition = t(), e.support.transition && (e.event.special.bsTransitionEnd = {
            bindType: e.support.transition.end,
            delegateType: e.support.transition.end,
            handle: function (t) {
                return e(t.target).is(this) ? t.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function (e) {
    e.extend(e.fn, {
        validate: function (t) {
            if (this.length) {
                var i = e.data(this[0], "validator");
                return i || (this.attr("novalidate", "novalidate"), i = new e.validator(t, this[0]), e.data(this[0], "validator", i), i.settings.onsubmit && (this.on("click.validate", ":submit", function (t) {
                    i.settings.submitHandler && (i.submitButton = t.target), e(this).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== e(this).attr("formnovalidate") && (i.cancelSubmit = !0)
                }), this.on("submit.validate", function (t) {
                    function n() {
                        var n, s;
                        return !i.settings.submitHandler || (i.submitButton && (n = e("<input type='hidden'/>").attr("name", i.submitButton.name).val(e(i.submitButton).val()).appendTo(i.currentForm)), s = i.settings.submitHandler.call(i, i.currentForm, t), i.submitButton && n.remove(), void 0 !== s && s)
                    }

                    return i.settings.debug && t.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, n()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : n() : (i.focusInvalid(), !1)
                })), i)
            }
            t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
        }, valid: function () {
            var t, i, n;
            return e(this[0]).is("form") ? t = this.validate().form() : (n = [], t = !0, i = e(this[0].form).validate(), this.each(function () {
                (t = i.element(this) && t) || (n = n.concat(i.errorList))
            }), i.errorList = n), t
        }, rules: function (t, i) {
            if (this.length) {
                var n, s, r, a, o, l, u = this[0];
                if (t) switch (n = e.data(u.form, "validator").settings, s = n.rules, r = e.validator.staticRules(u), t) {
                    case"add":
                        e.extend(r, e.validator.normalizeRule(i)), delete r.messages, s[u.name] = r, i.messages && (n.messages[u.name] = e.extend(n.messages[u.name], i.messages));
                        break;
                    case"remove":
                        return i ? (l = {}, e.each(i.split(/\s/), function (t, i) {
                            l[i] = r[i], delete r[i], "required" === i && e(u).removeAttr("aria-required")
                        }), l) : (delete s[u.name], r)
                }
                return (a = e.validator.normalizeRules(e.extend({}, e.validator.classRules(u), e.validator.attributeRules(u), e.validator.dataRules(u), e.validator.staticRules(u)), u)).required && (o = a.required, delete a.required, a = e.extend({required: o}, a), e(u).attr("aria-required", "true")), a.remote && (o = a.remote, delete a.remote, a = e.extend(a, {remote: o})), a
            }
        }
    }), e.extend(e.expr[":"], {
        blank: function (t) {
            return !e.trim("" + e(t).val())
        }, filled: function (t) {
            var i = e(t).val();
            return null !== i && !!e.trim("" + i)
        }, unchecked: function (t) {
            return !e(t).prop("checked")
        }
    }), e.validator = function (t, i) {
        this.settings = e.extend(!0, {}, e.validator.defaults, t), this.currentForm = i, this.init()
    }, e.validator.format = function (t, i) {
        return 1 === arguments.length ? function () {
            var i = e.makeArray(arguments);
            return i.unshift(t), e.validator.format.apply(this, i)
        } : void 0 === i ? t : (arguments.length > 2 && i.constructor !== Array && (i = e.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), e.each(i, function (e, i) {
            t = t.replace(new RegExp("\\{" + e + "\\}", "g"), function () {
                return i
            })
        }), t)
    }, e.extend(e.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: e([]),
            errorLabelContainer: e([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function (e) {
                this.lastActive = e, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(e)))
            },
            onfocusout: function (e) {
                this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e)
            },
            onkeyup: function (t, i) {
                var n = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === i.which && "" === this.elementValue(t) || -1 !== e.inArray(i.keyCode, n) || (t.name in this.submitted || t.name in this.invalid) && this.element(t)
            },
            onclick: function (e) {
                e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
            },
            highlight: function (t, i, n) {
                "radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(n) : e(t).addClass(i).removeClass(n)
            },
            unhighlight: function (t, i, n) {
                "radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(n) : e(t).removeClass(i).addClass(n)
            }
        },
        setDefaults: function (t) {
            e.extend(e.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: e.validator.format("Please enter no more than {0} characters."),
            minlength: e.validator.format("Please enter at least {0} characters."),
            rangelength: e.validator.format("Please enter a value between {0} and {1} characters long."),
            range: e.validator.format("Please enter a value between {0} and {1}."),
            max: e.validator.format("Please enter a value less than or equal to {0}."),
            min: e.validator.format("Please enter a value greater than or equal to {0}."),
            step: e.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function () {
                function t(t) {
                    var i = e.data(this.form, "validator"), n = "on" + t.type.replace(/^validate/, ""), s = i.settings;
                    s[n] && !e(this).is(s.ignore) && s[n].call(i, this, t)
                }

                this.labelContainer = e(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm), this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var i, n = this.groups = {};
                e.each(this.settings.groups, function (t, i) {
                    "string" == typeof i && (i = i.split(/\s/)), e.each(i, function (e, i) {
                        n[i] = t
                    })
                }), i = this.settings.rules, e.each(i, function (t, n) {
                    i[t] = e.validator.normalizeRule(n)
                }), e(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]", t).on("click.validate", "select, option, [type='radio'], [type='checkbox']", t), this.settings.invalidHandler && e(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), e(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            }, form: function () {
                return this.checkForm(), e.extend(this.submitted, this.errorMap), this.invalid = e.extend({}, this.errorMap), this.valid() || e(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            }, checkForm: function () {
                this.prepareForm();
                for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
                return this.valid()
            }, element: function (t) {
                var i, n, s = this.clean(t), r = this.validationTargetFor(s), a = this, o = !0;
                return void 0 === r ? delete this.invalid[s.name] : (this.prepareElement(r), this.currentElements = e(r), (n = this.groups[r.name]) && e.each(this.groups, function (e, t) {
                    t === n && e !== r.name && (s = a.validationTargetFor(a.clean(a.findByName(e)))) && s.name in a.invalid && (a.currentElements.push(s), o = o && a.check(s))
                }), i = !1 !== this.check(r), o = o && i, this.invalid[r.name] = !i, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e(t).attr("aria-invalid", !i)), o
            }, showErrors: function (t) {
                if (t) {
                    var i = this;
                    e.extend(this.errorMap, t), this.errorList = e.map(this.errorMap, function (e, t) {
                        return {message: e, element: i.findByName(t)[0]}
                    }), this.successList = e.grep(this.successList, function (e) {
                        return !(e.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            }, resetForm: function () {
                e.fn.resetForm && e(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                var t = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(t)
            }, resetElements: function (e) {
                var t;
                if (this.settings.unhighlight) for (t = 0; e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, ""), this.findByName(e[t].name).removeClass(this.settings.validClass); else e.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            }, numberOfInvalids: function () {
                return this.objectLength(this.invalid)
            }, objectLength: function (e) {
                var t, i = 0;
                for (t in e) e[t] && i++;
                return i
            }, hideErrors: function () {
                this.hideThese(this.toHide)
            }, hideThese: function (e) {
                e.not(this.containers).text(""), this.addWrapper(e).hide()
            }, valid: function () {
                return 0 === this.size()
            }, size: function () {
                return this.errorList.length
            }, focusInvalid: function () {
                if (this.settings.focusInvalid) try {
                    e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (e) {
                }
            }, findLastActive: function () {
                var t = this.lastActive;
                return t && 1 === e.grep(this.errorList, function (e) {
                    return e.element.name === t.name
                }).length && t
            }, elements: function () {
                var t = this, i = {};
                return e(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
                    var n = this.name || e(this).attr("name");
                    return !n && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = e(this).closest("form")[0]), !(n in i || !t.objectLength(e(this).rules())) && (i[n] = !0, !0)
                })
            }, clean: function (t) {
                return e(t)[0]
            }, errors: function () {
                var t = this.settings.errorClass.split(" ").join(".");
                return e(this.settings.errorElement + "." + t, this.errorContext)
            }, resetInternals: function () {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = e([]), this.toHide = e([])
            }, reset: function () {
                this.resetInternals(), this.currentElements = e([])
            }, prepareForm: function () {
                this.reset(), this.toHide = this.errors().add(this.containers)
            }, prepareElement: function (e) {
                this.reset(), this.toHide = this.errorsFor(e)
            }, elementValue: function (t) {
                var i, n, s = e(t), r = t.type;
                return "radio" === r || "checkbox" === r ? this.findByName(t.name).filter(":checked").val() : "number" === r && void 0 !== t.validity ? t.validity.badInput ? "NaN" : s.val() : (i = t.hasAttribute("contenteditable") ? s.text() : s.val(), "file" === r ? "C:\\fakepath\\" === i.substr(0, 12) ? i.substr(12) : (n = i.lastIndexOf("/"), n >= 0 ? i.substr(n + 1) : (n = i.lastIndexOf("\\"), n >= 0 ? i.substr(n + 1) : i)) : "string" == typeof i ? i.replace(/\r/g, "") : i)
            }, check: function (t) {
                t = this.validationTargetFor(this.clean(t));
                var i, n, s, r = e(t).rules(), a = e.map(r, function (e, t) {
                    return t
                }).length, o = !1, l = this.elementValue(t);
                if ("function" == typeof r.normalizer) {
                    if ("string" != typeof(l = r.normalizer.call(t, l))) throw new TypeError("The normalizer should return a string value.");
                    delete r.normalizer
                }
                for (n in r) {
                    s = {method: n, parameters: r[n]};
                    try {
                        if ("dependency-mismatch" === (i = e.validator.methods[n].call(this, l, t, s.parameters)) && 1 === a) {
                            o = !0;
                            continue
                        }
                        if (o = !1, "pending" === i) return void(this.toHide = this.toHide.not(this.errorsFor(t)));
                        if (!i) return this.formatAndAdd(t, s), !1
                    } catch (e) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + s.method + "' method.", e), e instanceof TypeError && (e.message += ".  Exception occurred when checking element " + t.id + ", check the '" + s.method + "' method."), e
                    }
                }
                if (!o) return this.objectLength(r) && this.successList.push(t), !0
            }, customDataMessage: function (t, i) {
                return e(t).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || e(t).data("msg")
            }, customMessage: function (e, t) {
                var i = this.settings.messages[e];
                return i && (i.constructor === String ? i : i[t])
            }, findDefined: function () {
                for (var e = 0; e < arguments.length; e++) if (void 0 !== arguments[e]) return arguments[e]
            }, defaultMessage: function (t, i) {
                var n = this.findDefined(this.customMessage(t.name, i.method), this.customDataMessage(t, i.method), !this.settings.ignoreTitle && t.title || void 0, e.validator.messages[i.method], "<strong>Warning: No message defined for " + t.name + "</strong>"),
                    s = /\$?\{(\d+)\}/g;
                return "function" == typeof n ? n = n.call(this, i.parameters, t) : s.test(n) && (n = e.validator.format(n.replace(s, "{$1}"), i.parameters)), n
            }, formatAndAdd: function (e, t) {
                var i = this.defaultMessage(e, t);
                this.errorList.push({
                    message: i,
                    element: e,
                    method: t.method
                }), this.errorMap[e.name] = i, this.submitted[e.name] = i
            }, addWrapper: function (e) {
                return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e
            }, defaultShowErrors: function () {
                var e, t, i;
                for (e = 0; this.errorList[e]; e++) i = this.errorList[e], this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                if (this.settings.unhighlight) for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            }, validElements: function () {
                return this.currentElements.not(this.invalidElements())
            }, invalidElements: function () {
                return e(this.errorList).map(function () {
                    return this.element
                })
            }, showLabel: function (t, i) {
                var n, s, r, a, o = this.errorsFor(t), l = this.idOrName(t), u = e(t).attr("aria-describedby");
                o.length ? (o.removeClass(this.settings.validClass).addClass(this.settings.errorClass), o.html(i)) : (o = e("<" + this.settings.errorElement + ">").attr("id", l + "-error").addClass(this.settings.errorClass).html(i || ""), n = o, this.settings.wrapper && (n = o.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(n) : this.settings.errorPlacement ? this.settings.errorPlacement(n, e(t)) : n.insertAfter(t), o.is("label") ? o.attr("for", l) : 0 === o.parents("label[for='" + this.escapeCssMeta(l) + "']").length && (r = o.attr("id"), u ? u.match(new RegExp("\\b" + this.escapeCssMeta(r) + "\\b")) || (u += " " + r) : u = r, e(t).attr("aria-describedby", u), (s = this.groups[t.name]) && (a = this, e.each(a.groups, function (t, i) {
                    i === s && e("[name='" + a.escapeCssMeta(t) + "']", a.currentForm).attr("aria-describedby", o.attr("id"))
                })))), !i && this.settings.success && (o.text(""), "string" == typeof this.settings.success ? o.addClass(this.settings.success) : this.settings.success(o, t)), this.toShow = this.toShow.add(o)
            }, errorsFor: function (t) {
                var i = this.escapeCssMeta(this.idOrName(t)), n = e(t).attr("aria-describedby"),
                    s = "label[for='" + i + "'], label[for='" + i + "'] *";
                return n && (s = s + ", #" + this.escapeCssMeta(n).replace(/\s+/g, ", #")), this.errors().filter(s)
            }, escapeCssMeta: function (e) {
                return e.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1")
            }, idOrName: function (e) {
                return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
            }, validationTargetFor: function (t) {
                return this.checkable(t) && (t = this.findByName(t.name)), e(t).not(this.settings.ignore)[0]
            }, checkable: function (e) {
                return /radio|checkbox/i.test(e.type)
            }, findByName: function (t) {
                return e(this.currentForm).find("[name='" + this.escapeCssMeta(t) + "']")
            }, getLength: function (t, i) {
                switch (i.nodeName.toLowerCase()) {
                    case"select":
                        return e("option:selected", i).length;
                    case"input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                }
                return t.length
            }, depend: function (e, t) {
                return !this.dependTypes[typeof e] || this.dependTypes[typeof e](e, t)
            }, dependTypes: {
                boolean: function (e) {
                    return e
                }, string: function (t, i) {
                    return !!e(t, i.form).length
                }, function: function (e, t) {
                    return e(t)
                }
            }, optional: function (t) {
                var i = this.elementValue(t);
                return !e.validator.methods.required.call(this, i, t) && "dependency-mismatch"
            }, startRequest: function (t) {
                this.pending[t.name] || (this.pendingRequest++, e(t).addClass(this.settings.pendingClass), this.pending[t.name] = !0)
            }, stopRequest: function (t, i) {
                --this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[t.name], e(t).removeClass(this.settings.pendingClass), i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (e(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            }, previousValue: function (t, i) {
                return e.data(t, "previousValue") || e.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, {method: i})
                })
            }, destroy: function () {
                this.resetForm(), e(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
            }
        },
        classRuleSettings: {
            required: {required: !0},
            email: {email: !0},
            url: {url: !0},
            date: {date: !0},
            dateISO: {dateISO: !0},
            number: {number: !0},
            digits: {digits: !0},
            creditcard: {creditcard: !0}
        },
        addClassRules: function (t, i) {
            t.constructor === String ? this.classRuleSettings[t] = i : e.extend(this.classRuleSettings, t)
        },
        classRules: function (t) {
            var i = {}, n = e(t).attr("class");
            return n && e.each(n.split(" "), function () {
                this in e.validator.classRuleSettings && e.extend(i, e.validator.classRuleSettings[this])
            }), i
        },
        normalizeAttributeRule: function (e, t, i, n) {
            /min|max|step/.test(i) && (null === t || /number|range|text/.test(t)) && (n = Number(n), isNaN(n) && (n = void 0)), n || 0 === n ? e[i] = n : t === i && "range" !== t && (e[i] = !0)
        },
        attributeRules: function (t) {
            var i, n, s = {}, r = e(t), a = t.getAttribute("type");
            for (i in e.validator.methods) "required" === i ? ("" === (n = t.getAttribute(i)) && (n = !0), n = !!n) : n = r.attr(i), this.normalizeAttributeRule(s, a, i, n);
            return s.maxlength && /-1|2147483647|524288/.test(s.maxlength) && delete s.maxlength, s
        },
        dataRules: function (t) {
            var i, n, s = {}, r = e(t), a = t.getAttribute("type");
            for (i in e.validator.methods) n = r.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()), this.normalizeAttributeRule(s, a, i, n);
            return s
        },
        staticRules: function (t) {
            var i = {}, n = e.data(t.form, "validator");
            return n.settings.rules && (i = e.validator.normalizeRule(n.settings.rules[t.name]) || {}), i
        },
        normalizeRules: function (t, i) {
            return e.each(t, function (n, s) {
                if (!1 !== s) {
                    if (s.param || s.depends) {
                        var r = !0;
                        switch (typeof s.depends) {
                            case"string":
                                r = !!e(s.depends, i.form).length;
                                break;
                            case"function":
                                r = s.depends.call(i, i)
                        }
                        r ? t[n] = void 0 === s.param || s.param : (e.data(i.form, "validator").resetElements(e(i)), delete t[n])
                    }
                } else delete t[n]
            }), e.each(t, function (n, s) {
                t[n] = e.isFunction(s) && "normalizer" !== n ? s(i) : s
            }), e.each(["minlength", "maxlength"], function () {
                t[this] && (t[this] = Number(t[this]))
            }), e.each(["rangelength", "range"], function () {
                var i;
                t[this] && (e.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (i = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/), t[this] = [Number(i[0]), Number(i[1])]))
            }), e.validator.autoCreateRanges && (null != t.min && null != t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), null != t.minlength && null != t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
        },
        normalizeRule: function (t) {
            if ("string" == typeof t) {
                var i = {};
                e.each(t.split(/\s/), function () {
                    i[this] = !0
                }), t = i
            }
            return t
        },
        addMethod: function (t, i, n) {
            e.validator.methods[t] = i, e.validator.messages[t] = void 0 !== n ? n : e.validator.messages[t], i.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t))
        },
        methods: {
            required: function (t, i, n) {
                if (!this.depend(n, i)) return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var s = e(i).val();
                    return s && s.length > 0
                }
                return this.checkable(i) ? this.getLength(t, i) > 0 : t.length > 0
            }, email: function (e, t) {
                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
            }, url: function (e, t) {
                return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)
            }, date: function (e, t) {
                return this.optional(t) || !/Invalid|NaN/.test(new Date(e).toString())
            }, dateISO: function (e, t) {
                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
            }, number: function (e, t) {
                return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
            }, digits: function (e, t) {
                return this.optional(t) || /^\d+$/.test(e)
            }, minlength: function (t, i, n) {
                var s = e.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || s >= n
            }, maxlength: function (t, i, n) {
                var s = e.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || n >= s
            }, rangelength: function (t, i, n) {
                var s = e.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || s >= n[0] && s <= n[1]
            }, min: function (e, t, i) {
                return this.optional(t) || e >= i
            }, max: function (e, t, i) {
                return this.optional(t) || i >= e
            }, range: function (e, t, i) {
                return this.optional(t) || e >= i[0] && e <= i[1]
            }, step: function (t, i, n) {
                var s = e(i).attr("type"), r = "Step attribute on input type " + s + " is not supported.",
                    a = ["text", "number", "range"], o = new RegExp("\\b" + s + "\\b");
                if (s && !o.test(a.join())) throw new Error(r);
                return this.optional(i) || t % n == 0
            }, equalTo: function (t, i, n) {
                var s = e(n);
                return this.settings.onfocusout && s.not(".validate-equalTo-blur").length && s.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
                    e(i).valid()
                }), t === s.val()
            }, remote: function (t, i, n, s) {
                if (this.optional(i)) return "dependency-mismatch";
                s = "string" == typeof s && s || "remote";
                var r, a, o, l = this.previousValue(i, s);
                return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), l.originalMessage = l.originalMessage || this.settings.messages[i.name][s], this.settings.messages[i.name][s] = l.message, n = "string" == typeof n && {url: n} || n, o = e.param(e.extend({data: t}, n.data)), l.old === o ? l.valid : (l.old = o, r = this, this.startRequest(i), a = {}, a[i.name] = t, e.ajax(e.extend(!0, {
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: a,
                    context: r.currentForm,
                    success: function (e) {
                        var n, a, o, u = !0 === e || "true" === e;
                        r.settings.messages[i.name][s] = l.originalMessage, u ? (o = r.formSubmitted, r.resetInternals(), r.toHide = r.errorsFor(i), r.formSubmitted = o, r.successList.push(i), r.invalid[i.name] = !1, r.showErrors()) : (n = {}, a = e || r.defaultMessage(i, {
                            method: s,
                            parameters: t
                        }), n[i.name] = l.message = a, r.invalid[i.name] = !0, r.showErrors(n)), l.valid = u, r.stopRequest(i, u)
                    }
                }, n)), "pending")
            }
        }
    });
    var t, i = {};
    e.ajaxPrefilter ? e.ajaxPrefilter(function (e, t, n) {
        var s = e.port;
        "abort" === e.mode && (i[s] && i[s].abort(), i[s] = n)
    }) : (t = e.ajax, e.ajax = function (n) {
        var s = ("mode" in n ? n : e.ajaxSettings).mode, r = ("port" in n ? n : e.ajaxSettings).port;
        return "abort" === s ? (i[r] && i[r].abort(), i[r] = t.apply(this, arguments), i[r]) : t.apply(this, arguments)
    })
});