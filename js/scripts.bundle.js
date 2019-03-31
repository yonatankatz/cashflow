this.Element && function(e) {
        e.matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.msMatchesSelector || function(e) {
            for (var t = (this.parentNode || this.document).querySelectorAll(e), a = -1; t[++a] && t[a] != this;);
            return !!t[a]
        }
    }(Element.prototype), this.Element && function(e) {
        e.closest = e.closest || function(e) {
            for (var t = this; t.matches && !t.matches(e);) t = t.parentNode;
            return t.matches ? t : null
        }
    }(Element.prototype), this.Element && function(e) {
        e.matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.msMatchesSelector || function(e) {
            for (var t = (this.parentNode || this.document).querySelectorAll(e), a = -1; t[++a] && t[a] != this;);
            return !!t[a]
        }
    }(Element.prototype),
    function() {
        for (var e = 0, t = ["webkit", "moz"], a = 0; a < t.length && !window.requestAnimationFrame; ++a) window.requestAnimationFrame = window[t[a] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[a] + "CancelAnimationFrame"] || window[t[a] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(t) {
            var a = (new Date).getTime(),
                n = Math.max(0, 16 - (a - e)),
                o = window.setTimeout(function() {
                    t(a + n)
                }, n);
            return e = a + n, o
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
            clearTimeout(e)
        })
    }(), [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(function(e) {
        e.hasOwnProperty("prepend") || Object.defineProperty(e, "prepend", {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: function() {
                var e = Array.prototype.slice.call(arguments),
                    t = document.createDocumentFragment();
                e.forEach(function(e) {
                    var a = e instanceof Node;
                    t.appendChild(a ? e : document.createTextNode(String(e)))
                }), this.insertBefore(t, this.firstChild)
            }
        })
    }), window.mUtilElementDataStore = {}, window.mUtilElementDataStoreID = 0, window.mUtilDelegatedEventHandlers = {};
var mUtil = function() {
    var e = [],
        t = {
            sm: 544,
            md: 768,
            lg: 1024,
            xl: 1200
        },
        a = function() {
            var t = !1;
            window.addEventListener("resize", function() {
                clearTimeout(t), t = setTimeout(function() {
                    ! function() {
                        for (var t = 0; t < e.length; t++) e[t].call()
                    }()
                }, 250)
            })
        };
    return {
        init: function(e) {
            e && e.breakpoints && (t = e.breakpoints), a()
        },
        addResizeHandler: function(t) {
            e.push(t)
        },
        removeResizeHandler: function(t) {
            for (var a = 0; a < e.length; a++) t === e[a] && delete e[a]
        },
        runResizeHandlers: function() {
            _runResizeHandlers()
        },
        resize: function() {
            if ("function" == typeof Event) window.dispatchEvent(new Event("resize"));
            else {
                var e = window.document.createEvent("UIEvents");
                e.initUIEvent("resize", !0, !1, window, 0), window.dispatchEvent(e)
            }
        },
        getURLParam: function(e) {
            var t, a, n = window.location.search.substring(1).split("&");
            for (t = 0; t < n.length; t++)
                if ((a = n[t].split("="))[0] == e) return unescape(a[1]);
            return null
        },
        isMobileDevice: function() {
            return this.getViewPort().width < this.getBreakpoint("lg")
        },
        isDesktopDevice: function() {
            return !mUtil.isMobileDevice()
        },
        getViewPort: function() {
            var e = window,
                t = "inner";
            return "innerWidth" in window || (t = "client", e = document.documentElement || document.body), {
                width: e[t + "Width"],
                height: e[t + "Height"]
            }
        },
        isInResponsiveRange: function(e) {
            var t = this.getViewPort().width;
            return "general" == e || ("desktop" == e && t >= this.getBreakpoint("lg") + 1 || ("tablet" == e && t >= this.getBreakpoint("md") + 1 && t < this.getBreakpoint("lg") || ("mobile" == e && t <= this.getBreakpoint("md") || ("desktop-and-tablet" == e && t >= this.getBreakpoint("md") + 1 || ("tablet-and-mobile" == e && t <= this.getBreakpoint("lg") || "minimal-desktop-and-below" == e && t <= this.getBreakpoint("xl"))))))
        },
        getUniqueID: function(e) {
            return e + Math.floor(Math.random() * (new Date).getTime())
        },
        getBreakpoint: function(e) {
            return t[e]
        },
        isset: function(e, t) {
            var a;
            if (-1 !== (t = t || "").indexOf("[")) throw new Error("Unsupported object path notation.");
            t = t.split(".");
            do {
                if (void 0 === e) return !1;
                if (a = t.shift(), !e.hasOwnProperty(a)) return !1;
                e = e[a]
            } while (t.length);
            return !0
        },
        getHighestZindex: function(e) {
            for (var t, a, n = mUtil.get(e); n && n !== document;) {
                if (("absolute" === (t = mUtil.css(n, "position")) || "relative" === t || "fixed" === t) && (a = parseInt(mUtil.css(n, "z-index")), !isNaN(a) && 0 !== a)) return a;
                n = n.parentNode
            }
            return null
        },
        hasFixedPositionedParent: function(e) {
            for (; e && e !== document;) {
                if (position = mUtil.css(e, "position"), "fixed" === position) return !0;
                e = e.parentNode
            }
            return !1
        },
        sleep: function(e) {
            for (var t = (new Date).getTime(), a = 0; a < 1e7 && !((new Date).getTime() - t > e); a++);
        },
        getRandomInt: function(e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e
        },
        isAngularVersion: function() {
            return void 0 !== window.Zone
        },
        deepExtend: function(e) {
            e = e || {};
            for (var t = 1; t < arguments.length; t++) {
                var a = arguments[t];
                if (a)
                    for (var n in a) a.hasOwnProperty(n) && ("object" == typeof a[n] ? e[n] = mUtil.deepExtend(e[n], a[n]) : e[n] = a[n])
            }
            return e
        },
        extend: function(e) {
            e = e || {};
            for (var t = 1; t < arguments.length; t++)
                if (arguments[t])
                    for (var a in arguments[t]) arguments[t].hasOwnProperty(a) && (e[a] = arguments[t][a]);
            return e
        },
        get: function(e) {
            var t;
            return e === document ? document : e && 1 === e.nodeType ? e : (t = document.getElementById(e)) ? t : (t = document.getElementsByTagName(e)) ? t[0] : (t = document.getElementsByClassName(e)) ? t[0] : null
        },
        getByClass: function(e) {
            var t;
            return (t = document.getElementsByClassName(e)) ? t[0] : null
        },
        hasClasses: function(e, t) {
            if (e) {
                for (var a = t.split(" "), n = 0; n < a.length; n++)
                    if (0 == mUtil.hasClass(e, mUtil.trim(a[n]))) return !1;
                return !0
            }
        },
        hasClass: function(e, t) {
            if (e) return e.classList ? e.classList.contains(t) : new RegExp("\\b" + t + "\\b").test(e.className)
        },
        addClass: function(e, t) {
            if (e && void 0 !== t) {
                var a = t.split(" ");
                if (e.classList)
                    for (var n = 0; n < a.length; n++) a[n] && a[n].length > 0 && e.classList.add(mUtil.trim(a[n]));
                else if (!mUtil.hasClass(e, t))
                    for (n = 0; n < a.length; n++) e.className += " " + mUtil.trim(a[n])
            }
        },
        removeClass: function(e, t) {
            if (e && void 0 !== t) {
                var a = t.split(" ");
                if (e.classList)
                    for (var n = 0; n < a.length; n++) e.classList.remove(mUtil.trim(a[n]));
                else if (mUtil.hasClass(e, t))
                    for (n = 0; n < a.length; n++) e.className = e.className.replace(new RegExp("\\b" + mUtil.trim(a[n]) + "\\b", "g"), "")
            }
        },
        triggerCustomEvent: function(e, t, a) {
            if (window.CustomEvent) var n = new CustomEvent(t, {
                detail: a
            });
            else(n = document.createEvent("CustomEvent")).initCustomEvent(t, !0, !0, a);
            e.dispatchEvent(n)
        },
        trim: function(e) {
            return e.trim()
        },
        eventTriggered: function(e) {
            return !!e.currentTarget.dataset.triggered || (e.currentTarget.dataset.triggered = !0, !1)
        },
        remove: function(e) {
            e && e.parentNode && e.parentNode.removeChild(e)
        },
        find: function(e, t) {
            if (e = mUtil.get(e)) return e.querySelector(t)
        },
        findAll: function(e, t) {
            if (e = mUtil.get(e)) return e.querySelectorAll(t)
        },
        insertAfter: function(e, t) {
            return t.parentNode.insertBefore(e, t.nextSibling)
        },
        parents: function(e, t) {
            function a(e, t) {
                for (var a = 0, n = e.length; a < n; a++)
                    if (e[a] == t) return !0;
                return !1
            }
            return function(e, t) {
                for (var n = document.querySelectorAll(t), o = e.parentNode; o && !a(n, o);) o = o.parentNode;
                return o
            }(e, t)
        },
        children: function(e, t, a) {
            if (e && e.childNodes) {
                for (var n = [], o = 0, i = e.childNodes.length; o < i; ++o) 1 == e.childNodes[o].nodeType && mUtil.matches(e.childNodes[o], t, a) && n.push(e.childNodes[o]);
                return n
            }
        },
        child: function(e, t, a) {
            var n = mUtil.children(e, t, a);
            return n ? n[0] : null
        },
        matches: function(e, t, a) {
            var n = Element.prototype,
                o = n.matches || n.webkitMatchesSelector || n.mozMatchesSelector || n.msMatchesSelector || function(e) {
                    return -1 !== [].indexOf.call(document.querySelectorAll(e), this)
                };
            return !(!e || !e.tagName) && o.call(e, t)
        },
        data: function(e) {
            return e = mUtil.get(e), {
                set: function(t, a) {
                    void 0 === e.customDataTag && (mUtilElementDataStoreID++, e.customDataTag = mUtilElementDataStoreID), void 0 === mUtilElementDataStore[e.customDataTag] && (mUtilElementDataStore[e.customDataTag] = {}), mUtilElementDataStore[e.customDataTag][t] = a
                },
                get: function(t) {
                    return this.has(t) ? mUtilElementDataStore[e.customDataTag][t] : null
                },
                has: function(t) {
                    return !(!mUtilElementDataStore[e.customDataTag] || !mUtilElementDataStore[e.customDataTag][t])
                },
                remove: function(t) {
                    this.has(t) && delete mUtilElementDataStore[e.customDataTag][t]
                }
            }
        },
        outerWidth: function(e, t) {
            if (!0 === t) {
                var a = parseFloat(e.offsetWidth);
                return a += parseFloat(mUtil.css(e, "margin-left")) + parseFloat(mUtil.css(e, "margin-right")), parseFloat(a)
            }
            return a = parseFloat(e.offsetWidth)
        },
        offset: function(e) {
            var t, a;
            if (e = mUtil.get(e)) return e.getClientRects().length ? (t = e.getBoundingClientRect(), a = e.ownerDocument.defaultView, {
                top: t.top + a.pageYOffset,
                left: t.left + a.pageXOffset
            }) : {
                top: 0,
                left: 0
            }
        },
        height: function(e) {
            return mUtil.css(e, "height")
        },
        visible: function(e) {
            return !(0 === e.offsetWidth && 0 === e.offsetHeight)
        },
        attr: function(e, t, a) {
            if (null != (e = mUtil.get(e))) return void 0 === a ? e.getAttribute(t) : void e.setAttribute(t, a)
        },
        hasAttr: function(e, t) {
            if (null != (e = mUtil.get(e))) return !!e.getAttribute(t)
        },
        removeAttr: function(e, t) {
            null != (e = mUtil.get(e)) && e.removeAttribute(t)
        },
        animate: function(e, t, a, n, o, i) {
            var l = {};
            if (l.linear = function(e, t, a, n) {
                    return a * e / n + t
                }, o = l.linear, "number" == typeof e && "number" == typeof t && "number" == typeof a && "function" == typeof n) {
                "function" != typeof i && (i = function() {});
                var r = window.requestAnimationFrame || function(e) {
                        window.setTimeout(e, 20)
                    },
                    s = t - e;
                n(e);
                var d = window.performance && window.performance.now ? window.performance.now() : +new Date;
                r(function l(c) {
                    var m = (c || +new Date) - d;
                    m >= 0 && n(o(m, e, s, a)), m >= 0 && m >= a ? (n(t), i()) : r(l)
                })
            }
        },
        actualCss: function(e, t, a) {
            var n;
            if (e instanceof HTMLElement != !1) return e.getAttribute("m-hidden-" + t) && !1 !== a ? parseFloat(e.getAttribute("m-hidden-" + t)) : (e.style.cssText = "position: absolute; visibility: hidden; display: block;", "width" == t ? n = e.offsetWidth : "height" == t && (n = e.offsetHeight), e.style.cssText = "", e.setAttribute("m-hidden-" + t, n), parseFloat(n))
        },
        actualHeight: function(e, t) {
            return mUtil.actualCss(e, "height", t)
        },
        actualWidth: function(e, t) {
            return mUtil.actualCss(e, "width", t)
        },
        getScroll: function(e, t) {
            return t = "scroll" + t, e == window || e == document ? self["scrollTop" == t ? "pageYOffset" : "pageXOffset"] || browserSupportsBoxModel && document.documentElement[t] || document.body[t] : e[t]
        },
        css: function(e, t, a) {
            if (e = mUtil.get(e))
                if (void 0 !== a) e.style[t] = a;
                else {
                    var n = (e.ownerDocument || document).defaultView;
                    if (n && n.getComputedStyle) return t = t.replace(/([A-Z])/g, "-$1").toLowerCase(), n.getComputedStyle(e, null).getPropertyValue(t);
                    if (e.currentStyle) return t = t.replace(/\-(\w)/g, function(e, t) {
                        return t.toUpperCase()
                    }), a = e.currentStyle[t], /^\d+(em|pt|%|ex)?$/i.test(a) ? function(t) {
                        var a = e.style.left,
                            n = e.runtimeStyle.left;
                        return e.runtimeStyle.left = e.currentStyle.left, e.style.left = t || 0, t = e.style.pixelLeft + "px", e.style.left = a, e.runtimeStyle.left = n, t
                    }(a) : a
                }
        },
        slide: function(e, t, a, n, o) {
            if (!(!e || "up" == t && !1 === mUtil.visible(e) || "down" == t && !0 === mUtil.visible(e))) {
                a = a || 600;
                var i = mUtil.actualHeight(e),
                    l = !1,
                    r = !1;
                mUtil.css(e, "padding-top") && !0 !== mUtil.data(e).has("slide-padding-top") && mUtil.data(e).set("slide-padding-top", mUtil.css(e, "padding-top")), mUtil.css(e, "padding-bottom") && !0 !== mUtil.data(e).has("slide-padding-bottom") && mUtil.data(e).set("slide-padding-bottom", mUtil.css(e, "padding-bottom")), mUtil.data(e).has("slide-padding-top") && (l = parseInt(mUtil.data(e).get("slide-padding-top"))), mUtil.data(e).has("slide-padding-bottom") && (r = parseInt(mUtil.data(e).get("slide-padding-bottom"))), "up" == t ? (e.style.cssText = "display: block; overflow: hidden;", l && mUtil.animate(0, l, a, function(t) {
                    e.style.paddingTop = l - t + "px"
                }, "linear"), r && mUtil.animate(0, r, a, function(t) {
                    e.style.paddingBottom = r - t + "px"
                }, "linear"), mUtil.animate(0, i, a, function(t) {
                    e.style.height = i - t + "px"
                }, "linear", function() {
                    n(), e.style.height = "", e.style.display = "none"
                })) : "down" == t && (e.style.cssText = "display: block; overflow: hidden;", l && mUtil.animate(0, l, a, function(t) {
                    e.style.paddingTop = t + "px"
                }, "linear", function() {
                    e.style.paddingTop = ""
                }), r && mUtil.animate(0, r, a, function(t) {
                    e.style.paddingBottom = t + "px"
                }, "linear", function() {
                    e.style.paddingBottom = ""
                }), mUtil.animate(0, i, a, function(t) {
                    e.style.height = t + "px"
                }, "linear", function() {
                    n(), e.style.height = "", e.style.display = "", e.style.overflow = ""
                }))
            }
        },
        slideUp: function(e, t, a) {
            mUtil.slide(e, "up", t, a)
        },
        slideDown: function(e, t, a) {
            mUtil.slide(e, "down", t, a)
        },
        show: function(e, t) {
            e.style.display = t || "block"
        },
        hide: function(e) {
            e.style.display = "none"
        },
        addEvent: function(e, t, a, n) {
            void 0 !== (e = mUtil.get(e)) && e.addEventListener(t, a)
        },
        removeEvent: function(e, t, a) {
            (e = mUtil.get(e)).removeEventListener(t, a)
        },
        on: function(e, t, a, n) {
            if (t) {
                var o = mUtil.getUniqueID("event");
                return mUtilDelegatedEventHandlers[o] = function(a) {
                    for (var o = e.querySelectorAll(t), i = a.target; i && i !== e;) {
                        for (var l = 0, r = o.length; l < r; l++) i === o[l] && n.call(i, a);
                        i = i.parentNode
                    }
                }, mUtil.addEvent(e, a, mUtilDelegatedEventHandlers[o]), o
            }
        },
        off: function(e, t, a) {
            e && mUtilDelegatedEventHandlers[a] && (mUtil.removeEvent(e, t, mUtilDelegatedEventHandlers[a]), delete mUtilDelegatedEventHandlers[a])
        },
        one: function(e, t, a) {
            (e = mUtil.get(e)).addEventListener(t, function(e) {
                return e.target.removeEventListener(e.type, arguments.callee), a(e)
            })
        },
        hash: function(e) {
            var t, a = 0;
            if (0 === e.length) return a;
            for (t = 0; t < e.length; t++) a = (a << 5) - a + e.charCodeAt(t), a |= 0;
            return a
        },
        animateClass: function(e, t, a) {
            mUtil.addClass(e, "animated " + t), mUtil.one(e, "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                mUtil.removeClass(e, "animated " + t)
            }), a && mUtil.one(e.animationEnd, a)
        },
        animateDelay: function(e, t) {
            for (var a = ["webkit-", "moz-", "ms-", "o-", ""], n = 0; n < a.length; n++) mUtil.css(e, a[n] + "animation-delay", t)
        },
        animateDuration: function(e, t) {
            for (var a = ["webkit-", "moz-", "ms-", "o-", ""], n = 0; n < a.length; n++) mUtil.css(e, a[n] + "animation-duration", t)
        },
        scrollTo: function(e, t, a) {
            a = a || 500;
            var n, o, i = (e = mUtil.get(e)) ? mUtil.offset(e).top : 0,
                l = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            i > l ? (n = i, o = l) : (n = l, o = i), t && (o += t), mUtil.animate(n, o, a, function(e) {
                document.documentElement.scrollTop = e, document.body.parentNode.scrollTop = e, document.body.scrollTop = e
            })
        },
        scrollTop: function(e, t) {
            mUtil.scrollTo(null, e, t)
        },
        isArray: function(e) {
            return e && Array.isArray(e)
        },
        ready: function(e) {
            (document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState) ? e(): document.addEventListener("DOMContentLoaded", e)
        },
        isEmpty: function(e) {
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        },
        numberString: function(e) {
            for (var t = (e += "").split("."), a = t[0], n = t.length > 1 ? "." + t[1] : "", o = /(\d+)(\d{3})/; o.test(a);) a = a.replace(o, "$1,$2");
            return a + n
        },
        detectIE: function() {
            var e = window.navigator.userAgent,
                t = e.indexOf("MSIE ");
            if (t > 0) return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
            if (e.indexOf("Trident/") > 0) {
                var a = e.indexOf("rv:");
                return parseInt(e.substring(a + 3, e.indexOf(".", a)), 10)
            }
            var n = e.indexOf("Edge/");
            return n > 0 && parseInt(e.substring(n + 5, e.indexOf(".", n)), 10)
        },
        isRTL: function() {
            return "rtl" == mUtil.attr(mUtil.get("html"), "direction")
        },
        scrollerInit: function(e, t) {
            function a() {
                var a, n;
                n = t.height instanceof Function ? parseInt(t.height.call()) : parseInt(t.height), t.disableForMobile && mUtil.isInResponsiveRange("tablet-and-mobile") ? (a = mUtil.data(e).get("ps")) ? (t.resetHeightOnDestroy ? mUtil.css(e, "height", "auto") : (mUtil.css(e, "overflow", "auto"), n > 0 && mUtil.css(e, "height", n + "px")), a.destroy(), a = mUtil.data(e).remove("ps")) : n > 0 && (mUtil.css(e, "overflow", "auto"), mUtil.css(e, "height", n + "px")) : (n > 0 && mUtil.css(e, "height", n + "px"), mUtil.css(e, "overflow", "hidden"), (a = mUtil.data(e).get("ps")) ? a.update() : (mUtil.addClass(e, "m-scroller"), a = new PerfectScrollbar(e, {
                    wheelSpeed: .5,
                    swipeEasing: !0,
                    wheelPropagation: !1,
                    minScrollbarLength: 40,
                    suppressScrollX: !mUtil.isRTL()
                }), mUtil.data(e).set("ps", a)))
            }
            a(), t.handleWindowResize && mUtil.addResizeHandler(function() {
                a()
            })
        },
        scrollerUpdate: function(e) {
            var t;
            (t = mUtil.data(e).get("ps")) && t.update()
        },
        scrollersUpdate: function(e) {
            for (var t = mUtil.findAll(e, ".ps"), a = 0, n = t.length; a < n; a++) mUtil.scrollerUpdate(t[a])
        },
        scrollerTop: function(e) {
            mUtil.data(e).get("ps") && (e.scrollTop = 0)
        },
        scrollerDestroy: function(e) {
            var t;
            (t = mUtil.data(e).get("ps")) && (t.destroy(), t = mUtil.data(e).remove("ps"))
        }
    }
}();
mUtil.ready(function() {
    mUtil.init()
});
var mApp = function() {
    var e = {
            brand: "#716aca",
            metal: "#c4c5d6",
            light: "#ffffff",
            accent: "#00c5dc",
            primary: "#5867dd",
            success: "#34bfa3",
            info: "#36a3f7",
            warning: "#ffb822",
            danger: "#f4516c",
            focus: "#9816f4"
        },
        t = function(e) {
            var t = e.data("skin") ? "m-tooltip--skin-" + e.data("skin") : "",
                a = "auto" == e.data("width") ? "m-tooltop--auto-width" : "",
                n = e.data("trigger") ? e.data("trigger") : "hover";
            e.data("placement") && e.data("placement");
            e.tooltip({
                trigger: n,
                template: '<div class="m-tooltip ' + t + " " + a + ' tooltip" role="tooltip">                <div class="arrow"></div>                <div class="tooltip-inner"></div>            </div>'
            })
        },
        a = function() {
            $('[data-toggle="m-tooltip"]').each(function() {
                t($(this))
            })
        },
        n = function(e) {
            var t = e.data("skin") ? "m-popover--skin-" + e.data("skin") : "",
                a = e.data("trigger") ? e.data("trigger") : "hover";
            e.popover({
                trigger: a,
                template: '            <div class="m-popover ' + t + ' popover" role="tooltip">                <div class="arrow"></div>                <h3 class="popover-header"></h3>                <div class="popover-body"></div>            </div>'
            })
        },
        o = function() {
            $('[data-toggle="m-popover"]').each(function() {
                n($(this))
            })
        },
        i = function(e, t) {
            e = $(e), new mPortlet(e[0], t)
        },
        l = function() {
            $('[m-portlet="true"]').each(function() {
                var e = $(this);
                !0 !== e.data("portlet-initialized") && (i(e, {}), e.data("portlet-initialized", !0))
            })
        },
        r = function() {
            $("[data-tab-target]").each(function() {
                1 != $(this).data("tabs-initialized") && ($(this).click(function(e) {
                    e.preventDefault();
                    var t = $(this),
                        a = t.closest('[data-tabs="true"]'),
                        n = $(a.data("tabs-contents")),
                        o = $(t.data("tab-target"));
                    a.find(".m-tabs__item.m-tabs__item--active").removeClass("m-tabs__item--active"), t.addClass("m-tabs__item--active"), n.find(".m-tabs-content__item.m-tabs-content__item--active").removeClass("m-tabs-content__item--active"), o.addClass("m-tabs-content__item--active")
                }), $(this).data("tabs-initialized", !0))
            })
        };
    return {
        init: function(t) {
            t && t.colors && (e = t.colors), mApp.initComponents()
        },
        initComponents: function() {
            jQuery.event.special.touchstart = {
                setup: function(e, t, a) {
                    "function" == typeof this && (t.includes("noPreventDefault") ? this.addEventListener("touchstart", a, {
                        passive: !1
                    }) : this.addEventListener("touchstart", a, {
                        passive: !0
                    }))
                }
            }, jQuery.event.special.touchmove = {
                setup: function(e, t, a) {
                    "function" == typeof this && (t.includes("noPreventDefault") ? this.addEventListener("touchmove", a, {
                        passive: !1
                    }) : this.addEventListener("touchmove", a, {
                        passive: !0
                    }))
                }
            }, jQuery.event.special.wheel = {
                setup: function(e, t, a) {
                    "function" == typeof this && (t.includes("noPreventDefault") ? this.addEventListener("wheel", a, {
                        passive: !1
                    }) : this.addEventListener("wheel", a, {
                        passive: !0
                    }))
                }
            }, $('[data-scrollable="true"]').each(function() {
                var e = $(this);
                mUtil.scrollerInit(this, {
                    disableForMobile: !0,
                    handleWindowResize: !0,
                    height: function() {
                        return mUtil.isInResponsiveRange("tablet-and-mobile") && e.data("mobile-height") ? e.data("mobile-height") : e.data("height")
                    }
                })
            }), a(), o(), $("body").on("click", "[data-close=alert]", function() {
                $(this).closest(".alert").hide()
            }), l(), $(".custom-file-input").on("change", function() {
                var e = $(this).val();
                $(this).next(".custom-file-label").addClass("selected").html(e)
            }), r()
        },
        initCustomTabs: function() {
            r()
        },
        initTooltips: function() {
            a()
        },
        initTooltip: function(e) {
            t(e)
        },
        initPopovers: function() {
            o()
        },
        initPopover: function(e) {
            n(e)
        },
        initPortlet: function(e, t) {
            i(e, t)
        },
        initPortlets: function() {
            l()
        },
        block: function(e, t) {
            var a, n, o, i = $(e);
            if ("spinner" == (t = $.extend(!0, {
                    opacity: .03,
                    overlayColor: "#000000",
                    state: "brand",
                    type: "loader",
                    size: "lg",
                    centerX: !0,
                    centerY: !0,
                    message: "",
                    shadow: !0,
                    width: "auto"
                }, t)).type ? o = '<div class="m-spinner ' + (a = t.skin ? "m-spinner--skin-" + t.skin : "") + " " + (n = t.state ? "m-spinner--" + t.state : "") + '"></div' : (a = t.skin ? "m-loader--skin-" + t.skin : "", n = t.state ? "m-loader--" + t.state : "", size = t.size ? "m-loader--" + t.size : "", o = '<div class="m-loader ' + a + " " + n + " " + size + '"></div'), t.message && t.message.length > 0) {
                var l = "m-blockui " + (!1 === t.shadow ? "m-blockui-no-shadow" : "");
                html = '<div class="' + l + '"><span>' + t.message + "</span><span>" + o + "</span></div>";
                i = document.createElement("div");
                mUtil.get("body").prepend(i), mUtil.addClass(i, l), i.innerHTML = "<span>" + t.message + "</span><span>" + o + "</span>", t.width = mUtil.actualWidth(i) + 10, mUtil.remove(i), "body" == e && (html = '<div class="' + l + '" style="margin-left:-' + t.width / 2 + 'px;"><span>' + t.message + "</span><span>" + o + "</span></div>")
            } else html = o;
            var r = {
                message: html,
                centerY: t.centerY,
                centerX: t.centerX,
                css: {
                    top: "30%",
                    left: "50%",
                    border: "0",
                    padding: "0",
                    backgroundColor: "none",
                    width: t.width
                },
                overlayCSS: {
                    backgroundColor: t.overlayColor,
                    opacity: t.opacity,
                    cursor: "wait",
                    zIndex: "10"
                },
                onUnblock: function() {
                    i && i[0] && (mUtil.css(i[0], "position", ""), mUtil.css(i[0], "zoom", ""))
                }
            };
            "body" == e ? (r.css.top = "50%", $.blockUI(r)) : (i = $(e)).block(r)
        },
        unblock: function(e) {
            e && "body" != e ? $(e).unblock() : $.unblockUI()
        },
        blockPage: function(e) {
            return mApp.block("body", e)
        },
        unblockPage: function() {
            return mApp.unblock("body")
        },
        progress: function(e, t) {
            var a = "m-loader m-loader--" + (t && t.skin ? t.skin : "light") + " m-loader--" + (t && t.alignment ? t.alignment : "right") + " m-loader--" + (t && t.size ? "m-spinner--" + t.size : "");
            mApp.unprogress(e), $(e).addClass(a), $(e).data("progress-classes", a)
        },
        unprogress: function(e) {
            $(e).removeClass($(e).data("progress-classes"))
        },
        getColor: function(t) {
            return e[t]
        }
    }
}();
$(document).ready(function() {
        mApp.init({})
    }),
    function(e) {
        var t = mUtil,
            a = mApp;
        if (void 0 === t) throw new Error("Util class is required and must be included before mDatatable");
        e.fn.mDatatable = function(n) {
            if (0 !== e(this).length) {
                var o = this;
                o.debug = !1, o.API = {
                    record: null,
                    value: null,
                    params: null
                };
                var i = {
                    isInit: !1,
                    offset: 110,
                    stateId: "meta",
                    ajaxParams: {},
                    init: function(t) {
                        var a = !1;
                        return null === t.data.source && (i.extractTable(), a = !0), i.setupBaseDOM.call(), i.setupDOM(o.table), i.spinnerCallback(!0), i.setDataSourceQuery(i.getOption("data.source.read.params.query")), e(o).on("m-datatable--on-layout-updated", i.afterRender), o.debug && i.stateRemove(i.stateId), e.each(i.getOption("extensions"), function(t, a) {
                            "function" == typeof e.fn.mDatatable[t] && new e.fn.mDatatable[t](o, a)
                        }), "remote" !== t.data.type && "local" !== t.data.type || ((!1 === t.data.saveState || !1 === t.data.saveState.cookie && !1 === t.data.saveState.webstorage) && i.stateRemove(i.stateId), "local" === t.data.type && "object" == typeof t.data.source && (o.dataSet = o.originalDataSet = i.dataMapCallback(t.data.source)), i.dataRender()), a || (i.setHeadTitle(), i.getOption("layout.footer") && i.setHeadTitle(o.tableFoot)), void 0 !== t.layout.header && !1 === t.layout.header && e(o.table).find("thead").remove(), void 0 !== t.layout.footer && !1 === t.layout.footer && e(o.table).find("tfoot").remove(), null !== t.data.type && "local" !== t.data.type || (i.setupCellField.call(), i.setupTemplateCell.call(), i.setupSubDatatable.call(), i.setupSystemColumn.call(), i.redraw()), e(window).resize(i.fullRender), e(o).height(""), e(i.getOption("search.input")).on("keyup", function(t) {
                            i.getOption("search.onEnter") && 13 !== t.which || i.search(e(this).val())
                        }), o
                    },
                    extractTable: function() {
                        var a = [],
                            i = e(o).find("tr:first-child th").get().map(function(t, o) {
                                var i = e(t).data("field");
                                void 0 === i && (i = e(t).text().trim());
                                var l = {
                                    field: i,
                                    title: i
                                };
                                for (var r in n.columns) n.columns[r].field === i && (l = e.extend(!0, {}, n.columns[r], l));
                                return a.push(l), i
                            });
                        n.columns = a;
                        var l = [],
                            r = [];
                        e(o).find("tr").each(function() {
                            e(this).find("td").length && l.push(e(this).prop("attributes"));
                            var a = {};
                            e(this).find("td").each(function(e, t) {
                                a[i[e]] = t.innerHTML.trim()
                            }), t.isEmpty(a) || r.push(a)
                        }), n.data.attr.rowProps = l, n.data.source = r
                    },
                    layoutUpdate: function() {
                        i.setupSubDatatable.call(), i.setupSystemColumn.call(), i.setupHover.call(), void 0 === n.detail && 1 === i.getDepth() && i.lockTable.call(), i.columnHide.call(), i.resetScroll(), i.isInit || (e(o).trigger("m-datatable--on-init", {
                            table: e(o.wrap).attr("id"),
                            options: n
                        }), i.isInit = !0), e(o).trigger("m-datatable--on-layout-updated", {
                            table: e(o.wrap).attr("id")
                        })
                    },
                    lockTable: function() {
                        var t = {
                            lockEnabled: !1,
                            init: function() {
                                t.lockEnabled = i.lockEnabledColumns(), 0 === t.lockEnabled.left.length && 0 === t.lockEnabled.right.length || t.enable()
                            },
                            enable: function() {
                                e(o.table).find("thead,tbody,tfoot").each(function() {
                                    var a = this;
                                    0 === e(this).find(".m-datatable__lock").length && e(this).ready(function() {
                                        ! function(a) {
                                            if (e(a).find(".m-datatable__lock").length > 0) i.log("Locked container already exist in: ", a);
                                            else if (0 !== e(a).find(".m-datatable__row").length) {
                                                var n = e("<div/>").addClass("m-datatable__lock m-datatable__lock--left"),
                                                    l = e("<div/>").addClass("m-datatable__lock m-datatable__lock--scroll"),
                                                    r = e("<div/>").addClass("m-datatable__lock m-datatable__lock--right");
                                                e(a).find(".m-datatable__row").each(function() {
                                                    var t = e("<tr/>").addClass("m-datatable__row").appendTo(n),
                                                        a = e("<tr/>").addClass("m-datatable__row").appendTo(l),
                                                        o = e("<tr/>").addClass("m-datatable__row").appendTo(r);
                                                    e(this).find(".m-datatable__cell").each(function() {
                                                        var n = e(this).data("locked");
                                                        void 0 !== n ? (void 0 === n.left && !0 !== n || e(this).appendTo(t), void 0 !== n.right && e(this).appendTo(o)) : e(this).appendTo(a)
                                                    }), e(this).remove()
                                                }), t.lockEnabled.left.length > 0 && (e(o.wrap).addClass("m-datatable--lock"), e(n).appendTo(a)), (t.lockEnabled.left.length > 0 || t.lockEnabled.right.length > 0) && e(l).appendTo(a), t.lockEnabled.right.length > 0 && (e(o.wrap).addClass("m-datatable--lock"), e(r).appendTo(a))
                                            } else i.log("No row exist in: ", a)
                                        }(a)
                                    })
                                })
                            }
                        };
                        return t.init(), t
                    },
                    fullRender: function() {
                        i.isLocked() && (e(o.tableHead).empty(), i.setHeadTitle(), i.getOption("layout.footer") && (e(o.tableFoot).empty(), i.setHeadTitle(o.tableFoot)), i.spinnerCallback(!0), e(o.wrap).removeClass("m-datatable--loaded"), i.insertData())
                    },
                    lockEnabledColumns: function() {
                        var a = e(window).width(),
                            o = n.columns,
                            i = {
                                left: [],
                                right: []
                            };
                        return e.each(o, function(e, n) {
                            void 0 !== n.locked && (void 0 !== n.locked.left && t.getBreakpoint(n.locked.left) <= a && i.left.push(n.locked.left), void 0 !== n.locked.right && t.getBreakpoint(n.locked.right) <= a && i.right.push(n.locked.right))
                        }), i
                    },
                    afterRender: function(t, a) {
                        a.table == e(o.wrap).attr("id") && e(o).ready(function() {
                            i.isLocked() || (i.redraw(), i.getOption("rows.autoHide") && (i.autoHide(), e(o.table).find(".m-datatable__row").css("height", ""))), i.rowEvenOdd.call(), i.isLocked() && i.redraw(), e(o.tableBody).css("visibility", ""), e(o.wrap).addClass("m-datatable--loaded"), i.scrollbar.call(), i.spinnerCallback(!1), i.sorting.call()
                        })
                    },
                    hoverTimer: 0,
                    isScrolling: !1,
                    setupHover: function() {
                        e(window).scroll(function(e) {
                            clearTimeout(i.hoverTimer), i.isScrolling = !0
                        }), e(o.tableBody).find(".m-datatable__cell").off("mouseenter", "mouseleave").on("mouseenter", function() {
                            if (i.hoverTimer = setTimeout(function() {
                                    i.isScrolling = !1
                                }, 200), !i.isScrolling) {
                                var t = e(this).closest(".m-datatable__row").addClass("m-datatable__row--hover"),
                                    a = e(t).index() + 1;
                                e(t).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + a + ")").addClass("m-datatable__row--hover")
                            }
                        }).on("mouseleave", function() {
                            var t = e(this).closest(".m-datatable__row").removeClass("m-datatable__row--hover"),
                                a = e(t).index() + 1;
                            e(t).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + a + ")").removeClass("m-datatable__row--hover")
                        })
                    },
                    adjustLockContainer: function() {
                        if (!i.isLocked()) return 0;
                        var t = e(o.tableHead).width(),
                            a = e(o.tableHead).find(".m-datatable__lock--left").width(),
                            n = e(o.tableHead).find(".m-datatable__lock--right").width();
                        void 0 === a && (a = 0), void 0 === n && (n = 0);
                        var l = Math.floor(t - a - n);
                        return e(o.table).find(".m-datatable__lock--scroll").css("width", l), l
                    },
                    dragResize: function() {
                        var t, a, n = !1,
                            i = void 0;
                        e(o.tableHead).find(".m-datatable__cell").mousedown(function(o) {
                            i = e(this), n = !0, t = o.pageX, a = e(this).width(), e(i).addClass("m-datatable__cell--resizing")
                        }).mousemove(function(l) {
                            if (n) {
                                var r = e(i).index(),
                                    s = e(o.tableBody),
                                    d = e(i).closest(".m-datatable__lock");
                                if (d) {
                                    var c = e(d).index();
                                    s = e(o.tableBody).find(".m-datatable__lock").eq(c)
                                }
                                e(s).find(".m-datatable__row").each(function(n, o) {
                                    e(o).find(".m-datatable__cell").eq(r).width(a + (l.pageX - t)).children().width(a + (l.pageX - t))
                                }), e(i).children().css("width", a + (l.pageX - t))
                            }
                        }).mouseup(function() {
                            e(i).removeClass("m-datatable__cell--resizing"), n = !1
                        }), e(document).mouseup(function() {
                            e(i).removeClass("m-datatable__cell--resizing"), n = !1
                        })
                    },
                    initHeight: function() {
                        if (n.layout.height && n.layout.scroll) {
                            var t = e(o.tableHead).find(".m-datatable__row").height(),
                                a = e(o.tableFoot).find(".m-datatable__row").height(),
                                i = n.layout.height;
                            t > 0 && (i -= t), a > 0 && (i -= a), e(o.tableBody).css("max-height", i), e(o.tableBody).find(".m-datatable__lock--scroll").css("height", i)
                        }
                    },
                    setupBaseDOM: function() {
                        o.initialDatatable = e(o).clone(), "TABLE" === e(o).prop("tagName") ? (o.table = e(o).removeClass("m-datatable").addClass("m-datatable__table"), 0 === e(o.table).parents(".m-datatable").length && (o.table.wrap(e("<div/>").addClass("m-datatable").addClass("m-datatable--" + n.layout.theme)), o.wrap = e(o.table).parent())) : (o.wrap = e(o).addClass("m-datatable").addClass("m-datatable--" + n.layout.theme), o.table = e("<table/>").addClass("m-datatable__table").appendTo(o)), void 0 !== n.layout.class && e(o.wrap).addClass(n.layout.class), e(o.table).removeClass("m-datatable--destroyed").css("display", "block"), void 0 === e(o).attr("id") && (i.setOption("data.saveState", !1), e(o.table).attr("id", t.getUniqueID("m-datatable--"))), i.getOption("layout.minHeight") && e(o.table).css("min-height", i.getOption("layout.minHeight")), i.getOption("layout.height") && e(o.table).css("max-height", i.getOption("layout.height")), null === n.data.type && e(o.table).css("width", "").css("display", ""), o.tableHead = e(o.table).find("thead"), 0 === e(o.tableHead).length && (o.tableHead = e("<thead/>").prependTo(o.table)), o.tableBody = e(o.table).find("tbody"), 0 === e(o.tableBody).length && (o.tableBody = e("<tbody/>").appendTo(o.table)), void 0 !== n.layout.footer && n.layout.footer && (o.tableFoot = e(o.table).find("tfoot"), 0 === e(o.tableFoot).length && (o.tableFoot = e("<tfoot/>").appendTo(o.table)))
                    },
                    setupCellField: function(t) {
                        void 0 === t && (t = e(o.table).children());
                        var a = n.columns;
                        e.each(t, function(t, n) {
                            e(n).find(".m-datatable__row").each(function(t, n) {
                                e(n).find(".m-datatable__cell").each(function(t, n) {
                                    void 0 !== a[t] && e(n).data(a[t])
                                })
                            })
                        })
                    },
                    setupTemplateCell: function(t) {
                        void 0 === t && (t = o.tableBody);
                        var a = n.columns;
                        e(t).find(".m-datatable__row").each(function(t, n) {
                            var l = e(n).data("obj") || {},
                                r = i.getOption("rows.callback");
                            "function" == typeof r && r(e(n), l, t);
                            var s = i.getOption("rows.beforeTemplate");
                            "function" == typeof s && s(e(n), l, t), void 0 === l && (l = {}, e(n).find(".m-datatable__cell").each(function(t, n) {
                                var o = e.grep(a, function(t, a) {
                                    return e(n).data("field") === t.field
                                })[0];
                                void 0 !== o && (l[o.field] = e(n).text())
                            })), e(n).find(".m-datatable__cell").each(function(n, r) {
                                var s = e.grep(a, function(t, a) {
                                    return e(r).data("field") === t.field
                                })[0];
                                if (void 0 !== s && void 0 !== s.template) {
                                    var d = "";
                                    "string" == typeof s.template && (d = i.dataPlaceholder(s.template, l)), "function" == typeof s.template && (d = s.template(l, t, o));
                                    var c = document.createElement("span");
                                    c.innerHTML = d, e(r).html(c), void 0 !== s.overflow && (e(c).css("overflow", s.overflow), e(c).css("position", "relative"))
                                }
                            });
                            var d = i.getOption("rows.afterTemplate");
                            "function" == typeof d && d(e(n), l, t)
                        })
                    },
                    setupSystemColumn: function() {
                        if (o.dataSet = o.dataSet || [], 0 !== o.dataSet.length) {
                            var t = n.columns;
                            e(o.tableBody).find(".m-datatable__row").each(function(a, n) {
                                e(n).find(".m-datatable__cell").each(function(a, n) {
                                    var o = e.grep(t, function(t, a) {
                                        return e(n).data("field") === t.field
                                    })[0];
                                    if (void 0 !== o) {
                                        var l = e(n).text();
                                        if (void 0 !== o.selector && !1 !== o.selector) {
                                            if (e(n).find('.m-checkbox [type="checkbox"]').length > 0) return;
                                            e(n).addClass("m-datatable__cell--check");
                                            var r = e("<label/>").addClass("m-checkbox m-checkbox--single").append(e("<input/>").attr("type", "checkbox").attr("value", l).on("click", function() {
                                                e(this).is(":checked") ? i.setActive(this) : i.setInactive(this)
                                            })).append("&nbsp;<span></span>");
                                            void 0 !== o.selector.class && e(r).addClass(o.selector.class), e(n).children().html(r)
                                        }
                                        if (void 0 !== o.subtable && o.subtable) {
                                            if (e(n).find(".m-datatable__toggle-subtable").length > 0) return;
                                            e(n).children().html(e("<a/>").addClass("m-datatable__toggle-subtable").attr("href", "#").attr("data-value", l).append(e("<i/>").addClass(i.getOption("layout.icons.rowDetail.collapse"))))
                                        }
                                    }
                                })
                            });
                            var a = function(a) {
                                var n = e.grep(t, function(e, t) {
                                    return void 0 !== e.selector && !1 !== e.selector
                                })[0];
                                if (void 0 !== n && void 0 !== n.selector && !1 !== n.selector) {
                                    var o = e(a).find('[data-field="' + n.field + '"]');
                                    if (e(o).find('.m-checkbox [type="checkbox"]').length > 0) return;
                                    e(o).addClass("m-datatable__cell--check");
                                    var l = e("<label/>").addClass("m-checkbox m-checkbox--single m-checkbox--all").append(e("<input/>").attr("type", "checkbox").on("click", function() {
                                        e(this).is(":checked") ? i.setActiveAll(!0) : i.setActiveAll(!1)
                                    })).append("&nbsp;<span></span>");
                                    void 0 !== n.selector.class && e(l).addClass(n.selector.class), e(o).children().html(l)
                                }
                            };
                            n.layout.header && a(e(o.tableHead).find(".m-datatable__row").first()), n.layout.footer && a(e(o.tableFoot).find(".m-datatable__row").first())
                        }
                    },
                    adjustCellsWidth: function() {
                        var t = e(o.tableHead).width(),
                            a = e(o.tableHead).find(".m-datatable__row:first-child").find(".m-datatable__cell:visible").length;
                        if (a > 0) {
                            t -= 20 * a;
                            var n = Math.floor(t / a);
                            n <= i.offset && (n = i.offset), e(o.table).find(".m-datatable__row").find(".m-datatable__cell:visible").each(function(t, a) {
                                var o = n,
                                    i = e(a).data("width");
                                void 0 !== i && (o = i), e(a).children().css("width", parseInt(o))
                            })
                        }
                        return o
                    },
                    adjustCellsHeight: function() {
                        e.each(e(o.table).children(), function(t, a) {
                            for (var n = e(a).find(".m-datatable__row").first().parent().find(".m-datatable__row").length, o = 1; o <= n; o++) {
                                var i = e(a).find(".m-datatable__row:nth-child(" + o + ")");
                                if (e(i).length > 0) {
                                    var l = Math.max.apply(null, e(i).map(function() {
                                        return e(this).height()
                                    }).get());
                                    e(i).css("height", Math.ceil(parseInt(l)))
                                }
                            }
                        })
                    },
                    setupDOM: function(t) {
                        e(t).find("> thead").addClass("m-datatable__head"), e(t).find("> tbody").addClass("m-datatable__body"), e(t).find("> tfoot").addClass("m-datatable__foot"), e(t).find("tr").addClass("m-datatable__row"), e(t).find("tr > th, tr > td").addClass("m-datatable__cell"), e(t).find("tr > th, tr > td").each(function(t, a) {
                            0 === e(a).find("span").length && e(a).wrapInner(e("<span/>").css("width", i.offset))
                        })
                    },
                    scrollbar: function() {
                        var a = {
                            scrollable: null,
                            tableLocked: null,
                            mcsOptions: {
                                scrollInertia: 0,
                                autoDraggerLength: !0,
                                autoHideScrollbar: !0,
                                autoExpandScrollbar: !1,
                                alwaysShowScrollbar: 0,
                                mouseWheel: {
                                    scrollAmount: 120,
                                    preventDefault: !1
                                },
                                advanced: {
                                    updateOnContentResize: !0,
                                    autoExpandHorizontalScroll: !0
                                },
                                theme: "minimal-dark"
                            },
                            init: function() {
                                var l = t.getViewPort().width;
                                if (n.layout.scroll) {
                                    e(o.wrap).addClass("m-datatable--scroll");
                                    var r = e(o.tableBody).find(".m-datatable__lock--scroll");
                                    e(r).find(".m-datatable__row").length > 0 && e(r).length > 0 ? (a.scrollHead = e(o.tableHead).find("> .m-datatable__lock--scroll > .m-datatable__row"), a.scrollFoot = e(o.tableFoot).find("> .m-datatable__lock--scroll > .m-datatable__row"), a.tableLocked = e(o.tableBody).find(".m-datatable__lock:not(.m-datatable__lock--scroll)"), i.getOption("layout.customScrollbar") && 10 != t.detectIE() && l > t.getBreakpoint("lg") ? a.initCustomScrollbar(r[0]) : a.initDefaultScrollbar(r)) : e(o.tableBody).find(".m-datatable__row").length > 0 && (a.scrollHead = e(o.tableHead).find("> .m-datatable__row"), a.scrollFoot = e(o.tableFoot).find("> .m-datatable__row"), i.getOption("layout.customScrollbar") && 10 != t.detectIE() && l > t.getBreakpoint("lg") ? a.initCustomScrollbar(o.tableBody) : a.initDefaultScrollbar(o.tableBody))
                                } else e(o.table).css("overflow-x", "auto")
                            },
                            initDefaultScrollbar: function(t) {
                                e(t).css("overflow", "auto").off().on("scroll", a.onScrolling)
                            },
                            onScrolling: function(t) {
                                var n = e(this).scrollLeft(),
                                    o = e(this).scrollTop();
                                e(a.scrollHead).css("left", -n), e(a.scrollFoot).css("left", -n), e(a.tableLocked).each(function(t, a) {
                                    e(a).css("top", -o)
                                })
                            },
                            initCustomScrollbar: function(t) {
                                a.scrollable = t, i.initScrollbar(t), e(t).off().on("scroll", a.onScrolling)
                            }
                        };
                        return a.init(), a
                    },
                    initScrollbar: function(a, n) {
                        if (e(o.tableBody).css("overflow", ""), t.hasClass(a, "ps")) e(a).data("ps").update();
                        else {
                            var i = new PerfectScrollbar(a);
                            e(a).data("ps", i)
                        }
                    },
                    setHeadTitle: function(a) {
                        void 0 === a && (a = o.tableHead), a = e(a)[0];
                        var l = n.columns,
                            r = a.getElementsByTagName("tr")[0],
                            s = a.getElementsByTagName("td");
                        void 0 === r && (r = document.createElement("tr"), a.appendChild(r)), e.each(l, function(a, n) {
                            var i = s[a];
                            if (void 0 === i && (i = document.createElement("th"), r.appendChild(i)), void 0 !== n.title && (i.innerHTML = n.title, i.setAttribute("data-field", n.field), t.addClass(i, n.class), e(i).data(n)), void 0 !== n.attr && e.each(n.attr, function(e, t) {
                                    i.setAttribute(e, t)
                                }), void 0 !== n.textAlign) {
                                var l = void 0 !== o.textAlign[n.textAlign] ? o.textAlign[n.textAlign] : "";
                                t.addClass(i, l)
                            }
                        }), i.setupDOM(a)
                    },
                    dataRender: function(t) {
                        e(o.table).siblings(".m-datatable__pager").removeClass("m-datatable--paging-loaded");
                        var a = function() {
                                o.dataSet = o.dataSet || [], i.localDataUpdate();
                                var t = i.getDataSourceParam("pagination");
                                0 === t.perpage && (t.perpage = n.data.pageSize || 10), t.total = o.dataSet.length;
                                var a = Math.max(t.perpage * (t.page - 1), 0),
                                    l = Math.min(a + t.perpage, t.total);
                                return o.dataSet = e(o.dataSet).slice(a, l), t
                            },
                            l = function(t) {
                                var l = function(t, a) {
                                    e(t.pager).hasClass("m-datatable--paging-loaded") || (e(t.pager).remove(), t.init(a)), e(t.pager).off().on("m-datatable--on-goto-page", function(n) {
                                        e(t.pager).remove(), t.init(a)
                                    });
                                    var n = Math.max(a.perpage * (a.page - 1), 0),
                                        l = Math.min(n + a.perpage, a.total);
                                    i.localDataUpdate(), o.dataSet = e(o.dataSet).slice(n, l), i.insertData()
                                };
                                if (e(o.wrap).removeClass("m-datatable--error"), n.pagination)
                                    if (n.data.serverPaging && "local" !== n.data.type) {
                                        var r = i.getObject("meta", t || null);
                                        null !== r ? i.paging(r) : i.paging(a(), l)
                                    } else i.paging(a(), l);
                                else i.localDataUpdate();
                                i.insertData()
                            };
                        "local" === n.data.type || !1 === n.data.serverSorting && "sort" === t || !1 === n.data.serverFiltering && "search" === t ? l() : i.getData().done(l)
                    },
                    insertData: function() {
                        o.dataSet = o.dataSet || [];
                        var a = i.getDataSourceParam(),
                            l = a.pagination,
                            r = (Math.max(l.page, 1) - 1) * l.perpage,
                            s = Math.min(l.page, l.pages) * l.perpage,
                            d = {};
                        void 0 !== n.data.attr.rowProps && n.data.attr.rowProps.length && (d = n.data.attr.rowProps.slice(r, s));
                        var c = document.createElement("tbody");
                        c.style.visibility = "hidden";
                        var m = n.columns.length;
                        if (e.each(o.dataSet, function(l, r) {
                                var s = document.createElement("tr");
                                s.setAttribute("data-row", l), e(s).data("obj", r), void 0 !== d[l] && e.each(d[l], function() {
                                    s.setAttribute(this.name, this.value)
                                });
                                for (var u = 0; u < m; u += 1) {
                                    var p = n.columns[u],
                                        f = [];
                                    if (i.getObject("sort.field", a) === p.field && f.push("m-datatable__cell--sorted"), void 0 !== p.textAlign) {
                                        var g = void 0 !== o.textAlign[p.textAlign] ? o.textAlign[p.textAlign] : "";
                                        f.push(g)
                                    }
                                    void 0 !== p.class && f.push(p.class);
                                    var h = document.createElement("td");
                                    t.addClass(h, f.join(" ")), h.setAttribute("data-field", p.field), h.innerHTML = i.getObject(p.field, r), s.appendChild(h)
                                }
                                c.appendChild(s)
                            }), 0 === o.dataSet.length) {
                            var u = document.createElement("span");
                            t.addClass(u, "m-datatable--error"), u.innerHTML = i.getOption("translate.records.noRecords"), c.appendChild(u), e(o.wrap).addClass("m-datatable--error m-datatable--loaded"), i.spinnerCallback(!1)
                        }
                        e(o.tableBody).replaceWith(c), o.tableBody = c, i.setupDOM(o.table), i.setupCellField([o.tableBody]), i.setupTemplateCell(o.tableBody), i.layoutUpdate()
                    },
                    updateTableComponents: function() {
                        o.tableHead = e(o.table).children("thead"), o.tableBody = e(o.table).children("tbody"), o.tableFoot = e(o.table).children("tfoot")
                    },
                    getData: function() {
                        i.spinnerCallback(!0);
                        var t = {
                            dataType: "json",
                            method: "GET",
                            data: {},
                            timeout: i.getOption("data.source.read.timeout") || 3e4
                        };
                        if ("local" === n.data.type && (t.url = n.data.source), "remote" === n.data.type) {
                            t.url = i.getOption("data.source.read.url"), "string" != typeof t.url && (t.url = i.getOption("data.source.read")), "string" != typeof t.url && (t.url = i.getOption("data.source")), t.headers = i.getOption("data.source.read.headers"), t.method = i.getOption("data.source.read.method") || "POST";
                            var a = i.getDataSourceParam();
                            i.getOption("data.serverPaging") || delete a.pagination, i.getOption("data.serverSorting") || delete a.sort, t.data = e.extend({}, t.data, a, i.getOption("data.source.read.params"))
                        }
                        return e.ajax(t).done(function(t, a, n) {
                            o.lastResponse = t, o.dataSet = o.originalDataSet = i.dataMapCallback(t), i.setAutoColumns(), e(o).trigger("m-datatable--on-ajax-done", [o.dataSet])
                        }).fail(function(t, a, n) {
                            e(o).trigger("m-datatable--on-ajax-fail", [t]), e(o.tableBody).html(e("<span/>").addClass("m-datatable--error").html(i.getOption("translate.records.noRecords"))), e(o.wrap).addClass("m-datatable--error m-datatable--loaded"), i.spinnerCallback(!1)
                        }).always(function() {})
                    },
                    paging: function(a, n) {
                        var l = {
                            meta: null,
                            pager: null,
                            paginateEvent: null,
                            pagerLayout: {
                                pagination: null,
                                info: null
                            },
                            callback: null,
                            init: function(t) {
                                l.meta = t, l.meta.page = parseInt(l.meta.page), l.meta.pages = parseInt(l.meta.pages), l.meta.perpage = parseInt(l.meta.perpage), l.meta.total = parseInt(l.meta.total), l.meta.pages = Math.max(Math.ceil(l.meta.total / l.meta.perpage), 1), l.meta.page > l.meta.pages && (l.meta.page = l.meta.pages), l.paginateEvent = i.getTablePrefix(), l.pager = e(o.table).siblings(".m-datatable__pager"), e(l.pager).hasClass("m-datatable--paging-loaded") || (e(l.pager).remove(), 0 !== l.meta.pages && (i.setDataSourceParam("pagination", {
                                    page: l.meta.page,
                                    pages: l.meta.pages,
                                    perpage: l.meta.perpage,
                                    total: l.meta.total
                                }), l.callback = l.serverCallback, "function" == typeof n && (l.callback = n), l.addPaginateEvent(), l.populate(), l.meta.page = Math.max(l.meta.page || 1, l.meta.page), e(o).trigger(l.paginateEvent, l.meta), l.pagingBreakpoint.call(), e(window).resize(l.pagingBreakpoint)))
                            },
                            serverCallback: function(e, t) {
                                i.dataRender()
                            },
                            populate: function() {
                                var t = i.getOption("layout.icons.pagination"),
                                    a = i.getOption("translate.toolbar.pagination.items.default");
                                l.pager = e("<div/>").addClass("m-datatable__pager m-datatable--paging-loaded clearfix");
                                var n = e("<ul/>").addClass("m-datatable__pager-nav");
                                l.pagerLayout.pagination = n, e("<li/>").append(e("<a/>").attr("title", a.first).addClass("m-datatable__pager-link m-datatable__pager-link--first").append(e("<i/>").addClass(t.first)).on("click", l.gotoMorePage).attr("data-page", 1)).appendTo(n), e("<li/>").append(e("<a/>").attr("title", a.prev).addClass("m-datatable__pager-link m-datatable__pager-link--prev").append(e("<i/>").addClass(t.prev)).on("click", l.gotoMorePage)).appendTo(n), e("<li/>").append(e("<a/>").attr("title", a.more).addClass("m-datatable__pager-link m-datatable__pager-link--more-prev").html(e("<i/>").addClass(t.more)).on("click", l.gotoMorePage)).appendTo(n), e("<li/>").append(e("<input/>").attr("type", "text").addClass("m-pager-input form-control").attr("title", a.input).on("keyup", function() {
                                    e(this).attr("data-page", Math.abs(e(this).val()))
                                }).on("keypress", function(e) {
                                    13 === e.which && l.gotoMorePage(e)
                                })).appendTo(n);
                                var r = i.getOption("toolbar.items.pagination.pages.desktop.pagesNumber"),
                                    s = Math.ceil(l.meta.page / r) * r,
                                    d = s - r;
                                s > l.meta.pages && (s = l.meta.pages);
                                for (var c = d; c < s; c++) {
                                    var m = c + 1;
                                    e("<li/>").append(e("<a/>").addClass("m-datatable__pager-link m-datatable__pager-link-number").text(m).attr("data-page", m).attr("title", m).on("click", l.gotoPage)).appendTo(n)
                                }
                                e("<li/>").append(e("<a/>").attr("title", a.more).addClass("m-datatable__pager-link m-datatable__pager-link--more-next").html(e("<i/>").addClass(t.more)).on("click", l.gotoMorePage)).appendTo(n), e("<li/>").append(e("<a/>").attr("title", a.next).addClass("m-datatable__pager-link m-datatable__pager-link--next").append(e("<i/>").addClass(t.next)).on("click", l.gotoMorePage)).appendTo(n), e("<li/>").append(e("<a/>").attr("title", a.last).addClass("m-datatable__pager-link m-datatable__pager-link--last").append(e("<i/>").addClass(t.last)).on("click", l.gotoMorePage).attr("data-page", l.meta.pages)).appendTo(n), i.getOption("toolbar.items.info") && (l.pagerLayout.info = e("<div/>").addClass("m-datatable__pager-info").append(e("<span/>").addClass("m-datatable__pager-detail"))), e.each(i.getOption("toolbar.layout"), function(t, a) {
                                    e(l.pagerLayout[a]).appendTo(l.pager)
                                });
                                var u = e("<select/>").addClass("selectpicker m-datatable__pager-size").attr("title", i.getOption("translate.toolbar.pagination.items.default.select")).attr("data-width", "70px").val(l.meta.perpage).on("change", l.updatePerpage).prependTo(l.pagerLayout.info),
                                    p = i.getOption("toolbar.items.pagination.pageSizeSelect");
                                0 == p.length && (p = [10, 20, 30, 50, 100]), e.each(p, function(t, a) {
                                    var n = a; - 1 === a && (n = "All"), e("<option/>").attr("value", a).html(n).appendTo(u)
                                }), e(o).ready(function() {
                                    e(".selectpicker").selectpicker().siblings(".dropdown-toggle").attr("title", i.getOption("translate.toolbar.pagination.items.default.select"))
                                }), l.paste()
                            },
                            paste: function() {
                                e.each(e.unique(i.getOption("toolbar.placement")), function(t, a) {
                                    "bottom" === a && e(l.pager).clone(!0).insertAfter(o.table), "top" === a && e(l.pager).clone(!0).addClass("m-datatable__pager--top").insertBefore(o.table)
                                })
                            },
                            gotoMorePage: function(t) {
                                if (t.preventDefault(), "disabled" === e(this).attr("disabled")) return !1;
                                var a = e(this).attr("data-page");
                                return void 0 === a && (a = e(t.target).attr("data-page")), l.openPage(parseInt(a)), !1
                            },
                            gotoPage: function(t) {
                                t.preventDefault(), e(this).hasClass("m-datatable__pager-link--active") || l.openPage(parseInt(e(this).data("page")))
                            },
                            openPage: function(t) {
                                l.meta.page = parseInt(t), e(o).trigger(l.paginateEvent, l.meta), l.callback(l, l.meta), e(l.pager).trigger("m-datatable--on-goto-page", l.meta)
                            },
                            updatePerpage: function(t) {
                                t.preventDefault(), l.pager = e(o.table).siblings(".m-datatable__pager").removeClass("m-datatable--paging-loaded"), t.originalEvent && (l.meta.perpage = parseInt(e(this).val())), e(l.pager).find("select.m-datatable__pager-size").val(l.meta.perpage).attr("data-selected", l.meta.perpage), i.setDataSourceParam("pagination", {
                                    page: l.meta.page,
                                    pages: l.meta.pages,
                                    perpage: l.meta.perpage,
                                    total: l.meta.total
                                }), e(l.pager).trigger("m-datatable--on-update-perpage", l.meta), e(o).trigger(l.paginateEvent, l.meta), l.callback(l, l.meta), l.updateInfo.call()
                            },
                            addPaginateEvent: function(t) {
                                e(o).off(l.paginateEvent).on(l.paginateEvent, function(t, a) {
                                    i.spinnerCallback(!0), l.pager = e(o.table).siblings(".m-datatable__pager");
                                    var n = e(l.pager).find(".m-datatable__pager-nav");
                                    e(n).find(".m-datatable__pager-link--active").removeClass("m-datatable__pager-link--active"), e(n).find('.m-datatable__pager-link-number[data-page="' + a.page + '"]').addClass("m-datatable__pager-link--active"), e(n).find(".m-datatable__pager-link--prev").attr("data-page", Math.max(a.page - 1, 1)), e(n).find(".m-datatable__pager-link--next").attr("data-page", Math.min(a.page + 1, a.pages)), e(l.pager).each(function() {
                                        e(this).find('.m-pager-input[type="text"]').prop("value", a.page)
                                    }), e(l.pager).find(".m-datatable__pager-nav").show(), a.pages <= 1 && e(l.pager).find(".m-datatable__pager-nav").hide(), i.setDataSourceParam("pagination", {
                                        page: l.meta.page,
                                        pages: l.meta.pages,
                                        perpage: l.meta.perpage,
                                        total: l.meta.total
                                    }), e(l.pager).find("select.m-datatable__pager-size").val(a.perpage).attr("data-selected", a.perpage), e(o.table).find('.m-checkbox > [type="checkbox"]').prop("checked", !1), e(o.table).find(".m-datatable__row--active").removeClass("m-datatable__row--active"), l.updateInfo.call(), l.pagingBreakpoint.call()
                                })
                            },
                            updateInfo: function() {
                                var t = Math.max(l.meta.perpage * (l.meta.page - 1) + 1, 1),
                                    a = Math.min(t + l.meta.perpage - 1, l.meta.total);
                                e(l.pager).find(".m-datatable__pager-info").find(".m-datatable__pager-detail").html(i.dataPlaceholder(i.getOption("translate.toolbar.pagination.items.info"), {
                                    start: t,
                                    end: -1 === l.meta.perpage ? l.meta.total : a,
                                    pageSize: -1 === l.meta.perpage || l.meta.perpage >= l.meta.total ? l.meta.total : l.meta.perpage,
                                    total: l.meta.total
                                }))
                            },
                            pagingBreakpoint: function() {
                                var a = e(o.table).siblings(".m-datatable__pager").find(".m-datatable__pager-nav");
                                if (0 !== e(a).length) {
                                    var n = i.getCurrentPage(),
                                        r = e(a).find(".m-pager-input").closest("li");
                                    e(a).find("li").show(), e.each(i.getOption("toolbar.items.pagination.pages"), function(o, s) {
                                        if (t.isInResponsiveRange(o)) {
                                            switch (o) {
                                                case "desktop":
                                                case "tablet":
                                                    Math.ceil(n / s.pagesNumber), s.pagesNumber, s.pagesNumber;
                                                    e(r).hide(), l.meta = i.getDataSourceParam("pagination"), l.paginationUpdate();
                                                    break;
                                                case "mobile":
                                                    e(r).show(), e(a).find(".m-datatable__pager-link--more-prev").closest("li").hide(), e(a).find(".m-datatable__pager-link--more-next").closest("li").hide(), e(a).find(".m-datatable__pager-link-number").closest("li").hide()
                                            }
                                            return !1
                                        }
                                    })
                                }
                            },
                            paginationUpdate: function() {
                                var t = e(o.table).siblings(".m-datatable__pager").find(".m-datatable__pager-nav"),
                                    a = e(t).find(".m-datatable__pager-link--more-prev"),
                                    n = e(t).find(".m-datatable__pager-link--more-next"),
                                    r = e(t).find(".m-datatable__pager-link--first"),
                                    s = e(t).find(".m-datatable__pager-link--prev"),
                                    d = e(t).find(".m-datatable__pager-link--next"),
                                    c = e(t).find(".m-datatable__pager-link--last"),
                                    m = e(t).find(".m-datatable__pager-link-number"),
                                    u = Math.max(e(m).first().data("page") - 1, 1);
                                e(a).each(function(t, a) {
                                    e(a).attr("data-page", u)
                                }), 1 === u ? e(a).parent().hide() : e(a).parent().show();
                                var p = Math.min(e(m).last().data("page") + 1, l.meta.pages);
                                e(n).each(function(t, a) {
                                    e(n).attr("data-page", p).show()
                                }), p === l.meta.pages && p === e(m).last().data("page") ? e(n).parent().hide() : e(n).parent().show(), 1 === l.meta.page ? (e(r).attr("disabled", !0).addClass("m-datatable__pager-link--disabled"), e(s).attr("disabled", !0).addClass("m-datatable__pager-link--disabled")) : (e(r).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled"), e(s).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled")), l.meta.page === l.meta.pages ? (e(d).attr("disabled", !0).addClass("m-datatable__pager-link--disabled"), e(c).attr("disabled", !0).addClass("m-datatable__pager-link--disabled")) : (e(d).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled"), e(c).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled"));
                                var f = i.getOption("toolbar.items.pagination.navigation");
                                f.first || e(r).remove(), f.prev || e(s).remove(), f.next || e(d).remove(), f.last || e(c).remove()
                            }
                        };
                        return l.init(a), l
                    },
                    columnHide: function() {
                        var a = t.getViewPort().width;
                        e.each(n.columns, function(n, i) {
                            if (void 0 !== i.responsive) {
                                var l = i.field,
                                    r = e.grep(e(o.table).find(".m-datatable__cell"), function(t, a) {
                                        return l === e(t).data("field")
                                    });
                                t.getBreakpoint(i.responsive.hidden) >= a ? e(r).hide() : e(r).show(), t.getBreakpoint(i.responsive.visible) <= a ? e(r).show() : e(r).hide()
                            }
                        })
                    },
                    setupSubDatatable: function() {
                        var t = i.getOption("detail.content");
                        if ("function" == typeof t && !(e(o.table).find(".m-datatable__subtable").length > 0)) {
                            e(o.wrap).addClass("m-datatable--subtable"), n.columns[0].subtable = !0;
                            var a = function(a) {
                                    a.preventDefault();
                                    var l = e(this).closest(".m-datatable__row"),
                                        r = e(l).next(".m-datatable__row-subtable");
                                    0 === e(r).length && (r = e("<tr/>").addClass("m-datatable__row-subtable m-datatable__row-loading").hide().append(e("<td/>").addClass("m-datatable__subtable").attr("colspan", i.getTotalColumns())), e(l).after(r), e(l).hasClass("m-datatable__row--even") && e(r).addClass("m-datatable__row-subtable--even")), e(r).toggle();
                                    var s = e(r).find(".m-datatable__subtable"),
                                        d = e(this).closest("[data-field]:first-child").find(".m-datatable__toggle-subtable").data("value"),
                                        c = e(this).find("i").removeAttr("class");
                                    e(l).hasClass("m-datatable__row--subtable-expanded") ? (e(c).addClass(i.getOption("layout.icons.rowDetail.collapse")), e(l).removeClass("m-datatable__row--subtable-expanded"), e(o).trigger("m-datatable--on-collapse-subtable", [l])) : (e(c).addClass(i.getOption("layout.icons.rowDetail.expand")), e(l).addClass("m-datatable__row--subtable-expanded"), e(o).trigger("m-datatable--on-expand-subtable", [l])), 0 === e(s).find(".m-datatable").length && (e.map(o.dataSet, function(e, t) {
                                        return d === e[n.columns[0].field] && (a.data = e, !0)
                                    }), a.detailCell = s, a.parentRow = l, a.subTable = s, t(a), e(s).children(".m-datatable").on("m-datatable--on-init", function(t) {
                                        e(r).removeClass("m-datatable__row-loading")
                                    }), "local" === i.getOption("data.type") && e(r).removeClass("m-datatable__row-loading"))
                                },
                                l = n.columns;
                            e(o.tableBody).find(".m-datatable__row").each(function(t, n) {
                                e(n).find(".m-datatable__cell").each(function(t, n) {
                                    var o = e.grep(l, function(t, a) {
                                        return e(n).data("field") === t.field
                                    })[0];
                                    if (void 0 !== o) {
                                        var r = e(n).text();
                                        if (void 0 !== o.subtable && o.subtable) {
                                            if (e(n).find(".m-datatable__toggle-subtable").length > 0) return;
                                            e(n).html(e("<a/>").addClass("m-datatable__toggle-subtable").attr("href", "#").attr("data-value", r).attr("title", i.getOption("detail.title")).on("click", a).append(e("<i/>").css("width", e(n).data("width")).addClass(i.getOption("layout.icons.rowDetail.collapse"))))
                                        }
                                    }
                                })
                            })
                        }
                    },
                    dataMapCallback: function(e) {
                        var t = e;
                        return "function" == typeof i.getOption("data.source.read.map") ? i.getOption("data.source.read.map")(e) : (void 0 !== e && void 0 !== e.data && (t = e.data), t)
                    },
                    isSpinning: !1,
                    spinnerCallback: function(e) {
                        if (e) {
                            if (!i.isSpinning) {
                                var t = i.getOption("layout.spinner");
                                void 0 !== t.message && !0 === t.message && (t.message = i.getOption("translate.records.processing")), i.isSpinning = !0, void 0 !== a && a.block(o, t)
                            }
                        } else i.isSpinning = !1, void 0 !== a && a.unblock(o)
                    },
                    sortCallback: function(t, a, n) {
                        var o = n.type || "string",
                            i = n.format || "",
                            l = n.field;
                        return e(t).sort(function(e, t) {
                            var n = e[l],
                                r = t[l];
                            switch (o) {
                                case "date":
                                    if ("undefined" == typeof moment) throw new Error("Moment.js is required.");
                                    var s = moment(n, i).diff(moment(r, i));
                                    return "asc" === a ? s > 0 ? 1 : s < 0 ? -1 : 0 : s < 0 ? 1 : s > 0 ? -1 : 0;
                                case "number":
                                    return isNaN(parseFloat(n)) && null != n && (n = Number(n.replace(/[^0-9\.-]+/g, ""))), isNaN(parseFloat(r)) && null != r && (r = Number(r.replace(/[^0-9\.-]+/g, ""))), n = parseFloat(n), r = parseFloat(r), "asc" === a ? n > r ? 1 : n < r ? -1 : 0 : n < r ? 1 : n > r ? -1 : 0;
                                case "string":
                                default:
                                    return "asc" === a ? n > r ? 1 : n < r ? -1 : 0 : n < r ? 1 : n > r ? -1 : 0
                            }
                        })
                    },
                    log: function(e, t) {
                        void 0 === t && (t = ""), o.debug && console.log(e, t)
                    },
                    autoHide: function() {
                        e(o.table).find(".m-datatable__cell").show(), e(o.tableBody).each(function() {
                            for (; e(this)[0].offsetWidth < e(this)[0].scrollWidth;) e(o.table).find(".m-datatable__row").each(function(t) {
                                var a = e(this).find(".m-datatable__cell").not(":hidden").last();
                                e(a).hide()
                            }), i.adjustCellsWidth.call()
                        });
                        var t = function(t) {
                            t.preventDefault();
                            var a = e(this).closest(".m-datatable__row"),
                                o = e(a).next();
                            if (e(o).hasClass("m-datatable__row-detail")) e(this).find("i").removeClass(i.getOption("layout.icons.rowDetail.expand")).addClass(i.getOption("layout.icons.rowDetail.collapse")), e(o).remove();
                            else {
                                e(this).find("i").removeClass(i.getOption("layout.icons.rowDetail.collapse")).addClass(i.getOption("layout.icons.rowDetail.expand"));
                                var l = e(a).find(".m-datatable__cell:hidden").clone().show();
                                o = e("<tr/>").addClass("m-datatable__row-detail").insertAfter(a);
                                var r = e("<td/>").addClass("m-datatable__detail").attr("colspan", i.getTotalColumns()).appendTo(o),
                                    s = e("<table/>");
                                e(l).each(function() {
                                    var t = e(this).data("field"),
                                        a = e.grep(n.columns, function(e, a) {
                                            return t === e.field
                                        })[0];
                                    e(s).append(e('<tr class="m-datatable__row"></tr>').append(e('<td class="m-datatable__cell"></td>').append(e("<span/>").css("width", i.offset).append(a.title))).append(this))
                                }), e(r).append(s)
                            }
                        };
                        e(o.tableBody).find(".m-datatable__row").each(function() {
                            e(this).prepend(e("<td/>").addClass("m-datatable__cell m-datatable__toggle--detail").append(e("<a/>").addClass("m-datatable__toggle-detail").attr("href", "").on("click", t).append(e("<i/>").css("width", "21px").addClass(i.getOption("layout.icons.rowDetail.collapse"))))), 0 === e(o.tableHead).find(".m-datatable__toggle-detail").length ? (e(o.tableHead).find(".m-datatable__row").first().prepend('<th class="m-datatable__cell m-datatable__toggle-detail"><span style="width: 21px"></span></th>'), e(o.tableFoot).find(".m-datatable__row").first().prepend('<th class="m-datatable__cell m-datatable__toggle-detail"><span style="width: 21px"></span></th>')) : e(o.tableHead).find(".m-datatable__toggle-detail").find("span").css("width", "21px")
                        })
                    },
                    hoverColumn: function() {
                        e(o.tableBody).on("mouseenter", ".m-datatable__cell", function() {
                            var t = e(i.cell(this).nodes()).index();
                            e(i.cells().nodes()).removeClass("m-datatable__cell--hover"), e(i.column(t).nodes()).addClass("m-datatable__cell--hover")
                        })
                    },
                    setAutoColumns: function() {
                        i.getOption("data.autoColumns") && (e.each(o.dataSet[0], function(t, a) {
                            0 === e.grep(n.columns, function(e, a) {
                                return t === e.field
                            }).length && n.columns.push({
                                field: t,
                                title: t
                            })
                        }), e(o.tableHead).find(".m-datatable__row").remove(), i.setHeadTitle(), i.getOption("layout.footer") && (e(o.tableFoot).find(".m-datatable__row").remove(), i.setHeadTitle(o.tableFoot)))
                    },
                    isLocked: function() {
                        return t.hasClass(o.wrap[0], "m-datatable--lock") || !1
                    },
                    getExtraSpace: function(t) {
                        return parseInt(e(t).css("paddingRight")) + parseInt(e(t).css("paddingLeft")) + (parseInt(e(t).css("marginRight")) + parseInt(e(t).css("marginLeft"))) + Math.ceil(e(t).css("border-right-width").replace("px", ""))
                    },
                    dataPlaceholder: function(t, a) {
                        var n = t;
                        return e.each(a, function(e, t) {
                            n = n.replace("{{" + e + "}}", t)
                        }), n
                    },
                    getTableId: function(t) {
                        void 0 === t && (t = "");
                        var a = e(o).attr("id");
                        return void 0 === a && (a = e(o).attr("class").split(" ")[0]), a + t
                    },
                    getTablePrefix: function(e) {
                        return void 0 !== e && (e = "-" + e), i.getTableId() + "-" + i.getDepth() + e
                    },
                    getDepth: function() {
                        var t = 0,
                            a = o.table;
                        do {
                            a = e(a).parents(".m-datatable__table"), t++
                        } while (e(a).length > 0);
                        return t
                    },
                    stateKeep: function(e, t) {
                        e = i.getTablePrefix(e), !1 !== i.getOption("data.saveState") && (i.getOption("data.saveState.webstorage") && localStorage && localStorage.setItem(e, JSON.stringify(t)), i.getOption("data.saveState.cookie") && Cookies.set(e, JSON.stringify(t)))
                    },
                    stateGet: function(e, t) {
                        if (e = i.getTablePrefix(e), !1 !== i.getOption("data.saveState")) {
                            var a = null;
                            return null != (a = i.getOption("data.saveState.webstorage") && localStorage ? localStorage.getItem(e) : Cookies.get(e)) ? JSON.parse(a) : void 0
                        }
                    },
                    stateUpdate: function(t, a) {
                        var n = i.stateGet(t);
                        null == n && (n = {}), i.stateKeep(t, e.extend({}, n, a))
                    },
                    stateRemove: function(e) {
                        e = i.getTablePrefix(e), localStorage && localStorage.removeItem(e), Cookies.remove(e)
                    },
                    getTotalColumns: function(t) {
                        return void 0 === t && (t = o.tableBody), e(t).find(".m-datatable__row").first().find(".m-datatable__cell").length
                    },
                    getOneRow: function(t, a, n) {
                        void 0 === n && (n = !0);
                        var o = e(t).find(".m-datatable__row:not(.m-datatable__row-detail):nth-child(" + a + ")");
                        return n && (o = o.find(".m-datatable__cell")), o
                    },
                    hasOverflowY: function(t) {
                        var a = e(t).find(".m-datatable__row"),
                            n = 0;
                        return a.length > 0 && (e(a).each(function(t, a) {
                            n += Math.floor(e(a).innerHeight())
                        }), n > e(t).innerHeight())
                    },
                    sortColumn: function(t, a, n) {
                        void 0 === a && (a = "asc"), void 0 === n && (n = !1);
                        var i = e(t).index(),
                            l = e(o.tableBody).find(".m-datatable__row"),
                            r = e(t).closest(".m-datatable__lock").index(); - 1 !== r && (l = e(o.tableBody).find(".m-datatable__lock:nth-child(" + (r + 1) + ")").find(".m-datatable__row"));
                        var s = e(l).parent();
                        e(l).sort(function(t, o) {
                            var l = e(t).find("td:nth-child(" + i + ")").text(),
                                r = e(o).find("td:nth-child(" + i + ")").text();
                            return n && (l = parseInt(l), r = parseInt(r)), "asc" === a ? l > r ? 1 : l < r ? -1 : 0 : l < r ? 1 : l > r ? -1 : 0
                        }).appendTo(s)
                    },
                    sorting: function() {
                        var t = {
                            init: function() {
                                n.sortable && (e(o.tableHead).find(".m-datatable__cell:not(.m-datatable__cell--check)").addClass("m-datatable__cell--sort").off("click").on("click", t.sortClick), t.setIcon())
                            },
                            setIcon: function() {
                                var t = i.getDataSourceParam("sort");
                                if (!e.isEmptyObject(t)) {
                                    var a = e(o.tableHead).find('.m-datatable__cell[data-field="' + t.field + '"]').attr("data-sort", t.sort),
                                        n = e(a).find("span"),
                                        l = e(n).find("i"),
                                        r = i.getOption("layout.icons.sort");
                                    e(l).length > 0 ? e(l).removeAttr("class").addClass(r[t.sort]) : e(n).append(e("<i/>").addClass(r[t.sort]))
                                }
                            },
                            sortClick: function(a) {
                                var l = i.getDataSourceParam("sort"),
                                    r = e(this).data("field"),
                                    s = i.getColumnByField(r);
                                if ((void 0 === s.sortable || !1 !== s.sortable) && (e(o.tableHead).find(".m-datatable__cell > span > i").remove(), n.sortable)) {
                                    i.spinnerCallback(!0);
                                    var d = "desc";
                                    i.getObject("field", l) === r && (d = i.getObject("sort", l)), l = {
                                        field: r,
                                        sort: d = void 0 === d || "desc" === d ? "asc" : "desc"
                                    }, i.setDataSourceParam("sort", l), t.setIcon(), setTimeout(function() {
                                        i.dataRender("sort"), e(o).trigger("m-datatable--on-sort", l)
                                    }, 300)
                                }
                            }
                        };
                        t.init()
                    },
                    localDataUpdate: function() {
                        var t = i.getDataSourceParam();
                        void 0 === o.originalDataSet && (o.originalDataSet = o.dataSet);
                        var a = i.getObject("sort.field", t),
                            n = i.getObject("sort.sort", t),
                            l = i.getColumnByField(a);
                        if (void 0 !== l && !0 !== i.getOption("data.serverSorting") ? "function" == typeof l.sortCallback ? o.dataSet = l.sortCallback(o.originalDataSet, n, l) : o.dataSet = i.sortCallback(o.originalDataSet, n, l) : o.dataSet = o.originalDataSet, "object" == typeof t.query && !i.getOption("data.serverFiltering")) {
                            t.query = t.query || {};
                            var r = function(e) {
                                    for (var t in e)
                                        if (e.hasOwnProperty(t))
                                            if ("string" == typeof e[t]) {
                                                if (e[t].toLowerCase() == s || -1 !== e[t].toLowerCase().indexOf(s)) return !0
                                            } else if ("number" == typeof e[t]) {
                                        if (e[t] === s) return !0
                                    } else if ("object" == typeof e[t]) return r(e[t]);
                                    return !1
                                },
                                s = e(i.getOption("search.input")).val();
                            void 0 !== s && "" !== s && (s = s.toLowerCase(), o.dataSet = e.grep(o.dataSet, r), delete t.query[i.getGeneralSearchKey()]), e.each(t.query, function(e, a) {
                                "" === a && delete t.query[e]
                            }), o.dataSet = i.filterArray(o.dataSet, t.query), o.dataSet = o.dataSet.filter(function() {
                                return !0
                            })
                        }
                        return o.dataSet
                    },
                    filterArray: function(t, a, n) {
                        if ("object" != typeof t) return [];
                        if (void 0 === n && (n = "AND"), "object" != typeof a) return t;
                        if (n = n.toUpperCase(), -1 === e.inArray(n, ["AND", "OR", "NOT"])) return [];
                        var o = Object.keys(a).length,
                            i = [];
                        return e.each(t, function(t, l) {
                            var r = l,
                                s = 0;
                            e.each(a, function(e, t) {
                                if (t = t instanceof Array ? t : [t], r.hasOwnProperty(e)) {
                                    var a = r[e].toString().toLowerCase();
                                    t.forEach(function(e, t) {
                                        e.toString().toLowerCase() != a && -1 === a.indexOf(e.toString().toLowerCase()) || s++
                                    })
                                }
                            }), ("AND" == n && s == o || "OR" == n && s > 0 || "NOT" == n && 0 == s) && (i[t] = l)
                        }), t = i
                    },
                    resetScroll: function() {
                        void 0 === n.detail && 1 === i.getDepth() && (e(o.table).find(".m-datatable__row").css("left", 0), e(o.table).find(".m-datatable__lock").css("top", 0), e(o.tableBody).scrollTop(0))
                    },
                    getColumnByField: function(t) {
                        var a;
                        if (void 0 !== t) return e.each(n.columns, function(e, n) {
                            if (t === n.field) return a = n, !1
                        }), a
                    },
                    getDefaultSortColumn: function() {
                        var t;
                        return e.each(n.columns, function(a, n) {
                            if (void 0 !== n.sortable && -1 !== e.inArray(n.sortable, ["asc", "desc"])) return t = {
                                sort: n.sortable,
                                field: n.field
                            }, !1
                        }), t
                    },
                    getHiddenDimensions: function(t, a) {
                        var n = {
                                position: "absolute",
                                visibility: "hidden",
                                display: "block"
                            },
                            o = {
                                width: 0,
                                height: 0,
                                innerWidth: 0,
                                innerHeight: 0,
                                outerWidth: 0,
                                outerHeight: 0
                            },
                            i = e(t).parents().addBack().not(":visible");
                        a = "boolean" == typeof a && a;
                        var l = [];
                        return i.each(function() {
                            var e = {};
                            for (var t in n) e[t] = this.style[t], this.style[t] = n[t];
                            l.push(e)
                        }), o.width = e(t).width(), o.outerWidth = e(t).outerWidth(a), o.innerWidth = e(t).innerWidth(), o.height = e(t).height(), o.innerHeight = e(t).innerHeight(), o.outerHeight = e(t).outerHeight(a), i.each(function(e) {
                            var t = l[e];
                            for (var a in n) this.style[a] = t[a]
                        }), o
                    },
                    getGeneralSearchKey: function() {
                        var t = e(i.getOption("search.input"));
                        return e(t).prop("name") || e(t).prop("id")
                    },
                    getObject: function(e, t) {
                        return e.split(".").reduce(function(e, t) {
                            return null !== e && void 0 !== e[t] ? e[t] : null
                        }, t)
                    },
                    extendObj: function(e, t, a) {
                        var n = t.split("."),
                            o = 0;
                        return function e(t) {
                            var i = n[o++];
                            void 0 !== t[i] && null !== t[i] ? "object" != typeof t[i] && "function" != typeof t[i] && (t[i] = {}) : t[i] = {}, o === n.length ? t[i] = a : e(t[i])
                        }(e), e
                    },
                    rowEvenOdd: function() {
                        e(o.tableBody).find(".m-datatable__row").removeClass("m-datatable__row--even"), e(o.wrap).hasClass("m-datatable--subtable") ? e(o.tableBody).find(".m-datatable__row:not(.m-datatable__row-detail):even").addClass("m-datatable__row--even") : e(o.tableBody).find(".m-datatable__row:nth-child(even)").addClass("m-datatable__row--even")
                    },
                    timer: 0,
                    redraw: function() {
                        return i.adjustCellsWidth.call(), i.isLocked() && (i.scrollbar(), i.resetScroll(), i.adjustCellsHeight.call()), i.adjustLockContainer.call(), i.initHeight.call(), o
                    },
                    load: function() {
                        return i.reload(), o
                    },
                    reload: function() {
                        return function(e, t) {
                            clearTimeout(i.timer), i.timer = setTimeout(e, t)
                        }(function() {
                            n.data.serverFiltering || i.localDataUpdate(), i.dataRender(), e(o).trigger("m-datatable--on-reloaded")
                        }, i.getOption("search.delay")), o
                    },
                    getRecord: function(t) {
                        return void 0 === o.tableBody && (o.tableBody = e(o.table).children("tbody")), e(o.tableBody).find(".m-datatable__cell:first-child").each(function(a, n) {
                            if (t == e(n).text()) {
                                var l = e(n).closest(".m-datatable__row").index() + 1;
                                return o.API.record = o.API.value = i.getOneRow(o.tableBody, l), o
                            }
                        }), o
                    },
                    getColumn: function(t) {
                        return i.setSelectedRecords(), o.API.value = e(o.API.record).find('[data-field="' + t + '"]'), o
                    },
                    destroy: function() {
                        e(o).parent().find(".m-datatable__pager").remove();
                        var t = e(o.initialDatatable).addClass("m-datatable--destroyed").show();
                        return e(o).replaceWith(t), e(o = t).trigger("m-datatable--on-destroy"), i.isInit = !1, t = null
                    },
                    sort: function(t, a) {
                        a = void 0 === a ? "asc" : a, i.spinnerCallback(!0);
                        var n = {
                            field: t,
                            sort: a
                        };
                        return i.setDataSourceParam("sort", n), setTimeout(function() {
                            i.dataRender("sort"), e(o).trigger("m-datatable--on-sort", n), e(o.tableHead).find(".m-datatable__cell > span > i").remove()
                        }, 300), o
                    },
                    getValue: function() {
                        return e(o.API.value).text()
                    },
                    setActive: function(t) {
                        "string" == typeof t && (t = e(o.tableBody).find('.m-checkbox--single > [type="checkbox"][value="' + t + '"]')), e(t).prop("checked", !0);
                        var a = e(t).closest(".m-datatable__row").addClass("m-datatable__row--active"),
                            n = e(a).index() + 1;
                        e(a).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + n + ")").addClass("m-datatable__row--active");
                        var i = [];
                        e(a).each(function(t, a) {
                            var n = e(a).find('.m-checkbox--single:not(.m-checkbox--all) > [type="checkbox"]').val();
                            void 0 !== n && i.push(n)
                        }), e(o).trigger("m-datatable--on-check", [i])
                    },
                    setInactive: function(t) {
                        "string" == typeof t && (t = e(o.tableBody).find('.m-checkbox--single > [type="checkbox"][value="' + t + '"]')), e(t).prop("checked", !1);
                        var a = e(t).closest(".m-datatable__row").removeClass("m-datatable__row--active"),
                            n = e(a).index() + 1;
                        e(a).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + n + ")").removeClass("m-datatable__row--active");
                        var i = [];
                        e(a).each(function(t, a) {
                            var n = e(a).find('.m-checkbox--single:not(.m-checkbox--all) > [type="checkbox"]').val();
                            void 0 !== n && i.push(n)
                        }), e(o).trigger("m-datatable--on-uncheck", [i])
                    },
                    setActiveAll: function(t) {
                        var a = e(o.table).find("> tbody, > thead").find("> tr:not(.m-datatable__row-subtable)").find('.m-datatable__cell--check [type="checkbox"]');
                        t ? i.setActive(a) : i.setInactive(a)
                    },
                    setSelectedRecords: function() {
                        return o.API.record = e(o.tableBody).find(".m-datatable__row--active"), o
                    },
                    getSelectedRecords: function() {
                        return i.setSelectedRecords(), o.API.record = o.rows(".m-datatable__row--active").nodes(), o.API.record
                    },
                    getOption: function(e) {
                        return i.getObject(e, n)
                    },
                    setOption: function(e, t) {
                        n = i.extendObj(n, e, t)
                    },
                    search: function(t, a) {
                        void 0 !== a && (a = e.makeArray(a)), o = function() {
                            var o = i.getDataSourceQuery();
                            if (void 0 === a && void 0 !== t) {
                                var l = i.getGeneralSearchKey();
                                o[l] = t
                            }
                            "object" == typeof a && (e.each(a, function(e, a) {
                                o[a] = t
                            }), e.each(o, function(t, a) {
                                ("" === a || e.isEmptyObject(a)) && delete o[t]
                            })), i.setDataSourceQuery(o), n.data.serverFiltering || i.localDataUpdate(), i.dataRender("search")
                        }, l = i.getOption("search.delay"), clearTimeout(i.timer), i.timer = setTimeout(o, l);
                        var o, l
                    },
                    setDataSourceParam: function(t, a) {
                        o.API.params = e.extend({}, {
                            pagination: {
                                page: 1,
                                perpage: i.getOption("data.pageSize")
                            },
                            sort: i.getDefaultSortColumn(),
                            query: {}
                        }, o.API.params, i.stateGet(i.stateId)), o.API.params = i.extendObj(o.API.params, t, a), i.stateKeep(i.stateId, o.API.params)
                    },
                    getDataSourceParam: function(t) {
                        return o.API.params = e.extend({}, {
                            pagination: {
                                page: 1,
                                perpage: i.getOption("data.pageSize")
                            },
                            sort: i.getDefaultSortColumn(),
                            query: {}
                        }, o.API.params, i.stateGet(i.stateId)), "string" == typeof t ? i.getObject(t, o.API.params) : o.API.params
                    },
                    getDataSourceQuery: function() {
                        return i.getDataSourceParam("query") || {}
                    },
                    setDataSourceQuery: function(e) {
                        i.setDataSourceParam("query", e)
                    },
                    getCurrentPage: function() {
                        return e(o.table).siblings(".m-datatable__pager").last().find(".m-datatable__pager-nav").find(".m-datatable__pager-link.m-datatable__pager-link--active").data("page") || 1
                    },
                    getPageSize: function() {
                        return e(o.table).siblings(".m-datatable__pager").last().find("select.m-datatable__pager-size").val() || 10
                    },
                    getTotalRows: function() {
                        return o.API.params.pagination.total
                    },
                    getDataSet: function() {
                        return o.originalDataSet
                    },
                    hideColumn: function(t) {
                        e.map(n.columns, function(e) {
                            return t === e.field && (e.responsive = {
                                hidden: "xl"
                            }), e
                        });
                        var a = e.grep(e(o.table).find(".m-datatable__cell"), function(a, n) {
                            return t === e(a).data("field")
                        });
                        e(a).hide()
                    },
                    showColumn: function(t) {
                        e.map(n.columns, function(e) {
                            return t === e.field && delete e.responsive, e
                        });
                        var a = e.grep(e(o.table).find(".m-datatable__cell"), function(a, n) {
                            return t === e(a).data("field")
                        });
                        e(a).show()
                    },
                    nodeTr: [],
                    nodeTd: [],
                    nodeCols: [],
                    recentNode: [],
                    table: function() {
                        return o.table
                    },
                    row: function(t) {
                        return i.rows(t), i.nodeTr = i.recentNode = e(i.nodeTr).first(), o
                    },
                    rows: function(t) {
                        return i.nodeTr = i.recentNode = e(o.tableBody).find(t).filter(".m-datatable__row"), o
                    },
                    column: function(t) {
                        return i.nodeCols = i.recentNode = e(o.tableBody).find(".m-datatable__cell:nth-child(" + (t + 1) + ")"), o
                    },
                    columns: function(t) {
                        var a = o.table;
                        i.nodeTr === i.recentNode && (a = i.nodeTr);
                        var n = e(a).find('.m-datatable__cell[data-field="' + t + '"]');
                        return n.length > 0 ? i.nodeCols = i.recentNode = n : i.nodeCols = i.recentNode = e(a).find(t).filter(".m-datatable__cell"), o
                    },
                    cell: function(t) {
                        return i.cells(t), i.nodeTd = i.recentNode = e(i.nodeTd).first(), o
                    },
                    cells: function(t) {
                        var a = e(o.tableBody).find(".m-datatable__cell");
                        return void 0 !== t && (a = e(a).filter(t)), i.nodeTd = i.recentNode = a, o
                    },
                    remove: function() {
                        return e(i.nodeTr.length) && i.nodeTr === i.recentNode && e(i.nodeTr).remove(), i.layoutUpdate(), o
                    },
                    visible: function(t) {
                        if (e(i.recentNode.length)) {
                            var a = i.lockEnabledColumns();
                            if (i.recentNode === i.nodeCols) {
                                var o = i.recentNode.index();
                                if (i.isLocked()) {
                                    var l = e(i.recentNode).closest(".m-datatable__lock--scroll").length;
                                    l ? o += a.left.length + 1 : e(i.recentNode).closest(".m-datatable__lock--right").length && (o += a.left.length + l + 1)
                                }
                            }
                            t ? (i.recentNode === i.nodeCols && delete n.columns[o].responsive, e(i.recentNode).show()) : (i.recentNode === i.nodeCols && i.setOption("columns." + o + ".responsive", {
                                hidden: "xl"
                            }), e(i.recentNode).hide()), i.redraw()
                        }
                    },
                    nodes: function() {
                        return i.recentNode
                    },
                    dataset: function() {
                        return o
                    }
                };
                if (e.each(i, function(e, t) {
                        o[e] = t
                    }), void 0 !== n)
                    if ("string" == typeof n) {
                        var l = n;
                        void 0 !== (o = e(this).data("mDatatable")) && (n = o.options, i[l].apply(this, Array.prototype.slice.call(arguments, 1)))
                    } else o.data("mDatatable") || e(this).hasClass("m-datatable--loaded") || (o.dataSet = null, o.textAlign = {
                        left: "m-datatable__cell--left",
                        center: "m-datatable__cell--center",
                        right: "m-datatable__cell--right"
                    }, n = e.extend(!0, {}, e.fn.mDatatable.defaults, n), o.options = n, i.init.apply(this, [n]), e(o.wrap).data("mDatatable", o));
                else void 0 === (o = e(this).data("mDatatable")) && e.error("mDatatable not initialized"), n = o.options;
                return o
            }
            console.log("No mDatatable element exist.")
        }, e.fn.mDatatable.defaults = {
            data: {
                type: "local",
                source: null,
                pageSize: 10,
                saveState: {
                    cookie: !1,
                    webstorage: !0
                },
                serverPaging: !1,
                serverFiltering: !1,
                serverSorting: !1,
                autoColumns: !1,
                attr: {
                    rowProps: []
                }
            },
            layout: {
                theme: "default",
                class: "m-datatable--brand",
                scroll: !1,
                height: null,
                minHeight: 300,
                footer: !1,
                header: !0,
                customScrollbar: !0,
                spinner: {
                    overlayColor: "#000000",
                    opacity: 0,
                    type: "loader",
                    state: "brand",
                    message: !0
                },
                icons: {
                    sort: {
                        asc: "la la-arrow-up",
                        desc: "la la-arrow-down"
                    },
                    pagination: {
                        next: "la la-angle-right",
                        prev: "la la-angle-left",
                        first: "la la-angle-double-left",
                        last: "la la-angle-double-right",
                        more: "la la-ellipsis-h"
                    },
                    rowDetail: {
                        expand: "fa fa-caret-down",
                        collapse: "fa fa-caret-right"
                    }
                }
            },
            sortable: !0,
            resizable: !1,
            filterable: !1,
            pagination: !0,
            editable: !1,
            columns: [],
            search: {
                onEnter: !1,
                input: null,
                delay: 400
            },
            rows: {
                callback: function() {},
                beforeTemplate: function() {},
                afterTemplate: function() {},
                autoHide: !1
            },
            toolbar: {
                layout: ["pagination", "info"],
                placement: ["bottom"],
                items: {
                    pagination: {
                        type: "default",
                        pages: {
                            desktop: {
                                layout: "default",
                                pagesNumber: 6
                            },
                            tablet: {
                                layout: "default",
                                pagesNumber: 3
                            },
                            mobile: {
                                layout: "compact"
                            }
                        },
                        navigation: {
                            prev: !0,
                            next: !0,
                            first: !0,
                            last: !0
                        },
                        pageSizeSelect: []
                    },
                    info: !0
                }
            },
            translate: {
                records: {
                    processing: "Please wait...",
                    noRecords: "No records found"
                },
                toolbar: {
                    pagination: {
                        items: {
                            default: {
                                first: "First",
                                prev: "Previous",
                                next: "Next",
                                last: "Last",
                                more: "More pages",
                                input: "Page number",
                                select: "Select page size"
                            },
                            info: "Displaying {{start}} - {{end}} of {{total}} records"
                        }
                    }
                }
            },
            extensions: {}
        }
    }(jQuery);
var mDropdown = function(e, t) {
    var a = this,
        n = mUtil.get(e),
        o = mUtil.get("body");
    if (n) {
        var i = {
                toggle: "click",
                hoverTimeout: 300,
                skin: "light",
                height: "auto",
                maxHeight: !1,
                minHeight: !1,
                persistent: !1,
                mobileOverlay: !0
            },
            l = {
                construct: function(e) {
                    return mUtil.data(n).has("dropdown") ? a = mUtil.data(n).get("dropdown") : (l.init(e), l.setup(), mUtil.data(n).set("dropdown", a)), a
                },
                init: function(e) {
                    a.options = mUtil.deepExtend({}, i, e), a.events = [], a.eventHandlers = {}, a.open = !1, a.layout = {}, a.layout.close = mUtil.find(n, ".m-dropdown__close"), a.layout.toggle = mUtil.find(n, ".m-dropdown__toggle"), a.layout.arrow = mUtil.find(n, ".m-dropdown__arrow"), a.layout.wrapper = mUtil.find(n, ".m-dropdown__wrapper"), a.layout.defaultDropPos = mUtil.hasClass(n, "m-dropdown--up") ? "up" : "down", a.layout.currentDropPos = a.layout.defaultDropPos, "hover" == mUtil.attr(n, "m-dropdown-toggle") && (a.options.toggle = "hover")
                },
                setup: function() {
                    a.options.placement && mUtil.addClass(n, "m-dropdown--" + a.options.placement), a.options.align && mUtil.addClass(n, "m-dropdown--align-" + a.options.align), a.options.width && mUtil.css(a.layout.wrapper, "width", a.options.width + "px"), "1" == mUtil.attr(n, "m-dropdown-persistent") && (a.options.persistent = !0), "hover" == a.options.toggle && mUtil.addEvent(n, "mouseout", l.hideMouseout), l.setZindex()
                },
                toggle: function() {
                    return a.open ? l.hide() : l.show()
                },
                setContent: function(e) {
                    e = mUtil.find(n, ".m-dropdown__content").innerHTML = e;
                    return a
                },
                show: function() {
                    if ("hover" == a.options.toggle && mUtil.hasAttr(n, "hover")) return l.clearHovered(), a;
                    if (a.open) return a;
                    if (a.layout.arrow && l.adjustArrowPos(), l.eventTrigger("beforeShow"), l.hideOpened(), mUtil.addClass(n, "m-dropdown--open"), mUtil.isMobileDevice() && a.options.mobileOverlay) {
                        var e = mUtil.css(n, "z-index") - 1,
                            t = mUtil.insertAfter(document.createElement("DIV"), n);
                        mUtil.addClass(t, "m-dropdown__dropoff"), mUtil.css(t, "z-index", e), mUtil.data(t).set("dropdown", n), mUtil.data(n).set("dropoff", t), mUtil.addEvent(t, "click", function(e) {
                            l.hide(), mUtil.remove(this), e.preventDefault()
                        })
                    }
                    return n.focus(), n.setAttribute("aria-expanded", "true"), a.open = !0, mUtil.scrollersUpdate(n), l.eventTrigger("afterShow"), a
                },
                clearHovered: function() {
                    var e = mUtil.attr(n, "timeout");
                    mUtil.removeAttr(n, "hover"), mUtil.removeAttr(n, "timeout"), clearTimeout(e)
                },
                hideHovered: function(e) {
                    if (!0 === e) {
                        if (!1 === l.eventTrigger("beforeHide")) return;
                        l.clearHovered(), mUtil.removeClass(n, "m-dropdown--open"), a.open = !1, l.eventTrigger("afterHide")
                    } else {
                        if (!0 === mUtil.hasAttr(n, "hover")) return;
                        if (!1 === l.eventTrigger("beforeHide")) return;
                        var t = setTimeout(function() {
                            mUtil.attr(n, "hover") && (l.clearHovered(), mUtil.removeClass(n, "m-dropdown--open"), a.open = !1, l.eventTrigger("afterHide"))
                        }, a.options.hoverTimeout);
                        mUtil.attr(n, "hover", "1"), mUtil.attr(n, "timeout", t)
                    }
                },
                hideClicked: function() {
                    !1 !== l.eventTrigger("beforeHide") && (mUtil.removeClass(n, "m-dropdown--open"), mUtil.data(n).remove("dropoff"), a.open = !1, l.eventTrigger("afterHide"))
                },
                hide: function(e) {
                    return !1 === a.open ? a : (mUtil.isDesktopDevice() && "hover" == a.options.toggle ? l.hideHovered(e) : l.hideClicked(), "down" == a.layout.defaultDropPos && "up" == a.layout.currentDropPos && (mUtil.removeClass(n, "m-dropdown--up"), a.layout.arrow.prependTo(a.layout.wrapper), a.layout.currentDropPos = "down"), a)
                },
                hideMouseout: function() {
                    mUtil.isDesktopDevice() && l.hide()
                },
                hideOpened: function() {
                    for (var e = mUtil.findAll(o, ".m-dropdown.m-dropdown--open"), t = 0, a = e.length; t < a; t++) {
                        var n = e[t];
                        mUtil.data(n).get("dropdown").hide(!0)
                    }
                },
                adjustArrowPos: function() {
                    var e = mUtil.outerWidth(n),
                        t = mUtil.hasClass(a.layout.arrow, "m-dropdown__arrow--right") ? "right" : "left",
                        o = 0;
                    a.layout.arrow && (mUtil.isInResponsiveRange("mobile") && mUtil.hasClass(n, "m-dropdown--mobile-full-width") ? (o = mUtil.offset(n).left + e / 2 - Math.abs(parseInt(mUtil.css(a.layout.arrow, "width")) / 2) - parseInt(mUtil.css(a.layout.wrapper, "left")), mUtil.css(a.layout.arrow, "right", "auto"), mUtil.css(a.layout.arrow, "left", o + "px"), mUtil.css(a.layout.arrow, "margin-left", "auto"), mUtil.css(a.layout.arrow, "margin-right", "auto")) : mUtil.hasClass(a.layout.arrow, "m-dropdown__arrow--adjust") && (o = e / 2 - Math.abs(parseInt(mUtil.css(a.layout.arrow, "width")) / 2), mUtil.hasClass(n, "m-dropdown--align-push") && (o += 20), "right" == t ? mUtil.isRTL() ? (mUtil.css(a.layout.arrow, "right", "auto"), mUtil.css(a.layout.arrow, "left", o + "px")) : (mUtil.css(a.layout.arrow, "left", "auto"), mUtil.css(a.layout.arrow, "right", o + "px")) : mUtil.isRTL() ? (mUtil.css(a.layout.arrow, "left", "auto"), mUtil.css(a.layout.arrow, "right", o + "px")) : (mUtil.css(a.layout.arrow, "right", "auto"), mUtil.css(a.layout.arrow, "left", o + "px"))))
                },
                setZindex: function() {
                    var e = 101,
                        t = mUtil.getHighestZindex(n);
                    t >= e && (e = t + 1), mUtil.css(a.layout.wrapper, "z-index", e)
                },
                isPersistent: function() {
                    return a.options.persistent
                },
                isShown: function() {
                    return a.open
                },
                eventTrigger: function(e, t) {
                    for (var n = 0; n < a.events.length; n++) {
                        var o = a.events[n];
                        o.name == e && (1 == o.one ? 0 == o.fired && (a.events[n].fired = !0, o.handler.call(this, a, t)) : o.handler.call(this, a, t))
                    }
                },
                addEvent: function(e, t, n) {
                    a.events.push({
                        name: e,
                        handler: t,
                        one: n,
                        fired: !1
                    })
                }
            };
        return a.setDefaults = function(e) {
            i = e
        }, a.show = function() {
            return l.show()
        }, a.hide = function() {
            return l.hide()
        }, a.toggle = function() {
            return l.toggle()
        }, a.isPersistent = function() {
            return l.isPersistent()
        }, a.isShown = function() {
            return l.isShown()
        }, a.setContent = function(e) {
            return l.setContent(e)
        }, a.on = function(e, t) {
            return l.addEvent(e, t)
        }, a.one = function(e, t) {
            return l.addEvent(e, t, !0)
        }, l.construct.apply(a, [t]), !0, a
    }
};
mUtil.on(document, '[m-dropdown-toggle="click"] .m-dropdown__toggle', "click", function(e) {
    var t = this.closest(".m-dropdown");
    t && ((mUtil.data(t).has("dropdown") ? mUtil.data(t).get("dropdown") : new mDropdown(t)).toggle(), e.preventDefault())
}), mUtil.on(document, '[m-dropdown-toggle="hover"] .m-dropdown__toggle', "click", function(e) {
    if (mUtil.isDesktopDevice()) "#" == mUtil.attr(this, "href") && e.preventDefault();
    else if (mUtil.isMobileDevice()) {
        var t = this.closest(".m-dropdown");
        t && ((mUtil.data(t).has("dropdown") ? mUtil.data(t).get("dropdown") : new mDropdown(t)).toggle(), e.preventDefault())
    }
}), mUtil.on(document, '[m-dropdown-toggle="hover"]', "mouseover", function(e) {
    if (mUtil.isDesktopDevice()) {
        this && ((mUtil.data(this).has("dropdown") ? mUtil.data(this).get("dropdown") : new mDropdown(this)).show(), e.preventDefault())
    }
}), document.addEventListener("click", function(e) {
    var t, a = mUtil.get("body"),
        n = e.target;
    if (t = a.querySelectorAll(".m-dropdown.m-dropdown--open"))
        for (var o = 0, i = t.length; o < i; o++) {
            var l = t[o];
            if (!1 === mUtil.data(l).has("dropdown")) return;
            var r = mUtil.data(l).get("dropdown"),
                s = mUtil.find(l, ".m-dropdown__toggle");
            mUtil.hasClass(l, "m-dropdown--disable-close") && (e.preventDefault(), e.stopPropagation()), s && n !== s && !1 === s.contains(n) && !1 === n.contains(s) ? !1 === r.isPersistent() && r.hide() : !1 === l.contains(n) && r.hide()
        }
});
var mHeader = function(e, t) {
        var a = this,
            n = mUtil.get(e),
            o = mUtil.get("body");
        if (void 0 !== n) {
            var i = {
                    classic: !1,
                    offset: {
                        mobile: 150,
                        desktop: 200
                    },
                    minimize: {
                        mobile: !1,
                        desktop: !1
                    }
                },
                l = {
                    construct: function(e) {
                        return mUtil.data(n).has("header") ? a = mUtil.data(n).get("header") : (l.init(e), l.build(), mUtil.data(n).set("header", a)), a
                    },
                    init: function(e) {
                        a.events = [], a.options = mUtil.deepExtend({}, i, e)
                    },
                    build: function() {
                        var e = 0;
                        !1 === a.options.minimize.mobile && !1 === a.options.minimize.desktop || window.addEventListener("scroll", function() {
                            var t, n, i, l = 0;
                            mUtil.isInResponsiveRange("desktop") ? (l = a.options.offset.desktop, t = a.options.minimize.desktop.on, n = a.options.minimize.desktop.off) : mUtil.isInResponsiveRange("tablet-and-mobile") && (l = a.options.offset.mobile, t = a.options.minimize.mobile.on, n = a.options.minimize.mobile.off), i = window.pageYOffset, mUtil.isInResponsiveRange("tablet-and-mobile") && a.options.classic && a.options.classic.mobile || mUtil.isInResponsiveRange("desktop") && a.options.classic && a.options.classic.desktop ? i > l ? (mUtil.addClass(o, t), mUtil.removeClass(o, n)) : (mUtil.addClass(o, n), mUtil.removeClass(o, t)) : (i > l && e < i ? (mUtil.addClass(o, t), mUtil.removeClass(o, n)) : (mUtil.addClass(o, n), mUtil.removeClass(o, t)), e = i)
                        })
                    },
                    eventTrigger: function(e, t) {
                        for (var n = 0; n < a.events.length; n++) {
                            var o = a.events[n];
                            o.name == e && (1 == o.one ? 0 == o.fired && (a.events[n].fired = !0, o.handler.call(this, a, t)) : o.handler.call(this, a, t))
                        }
                    },
                    addEvent: function(e, t, n) {
                        a.events.push({
                            name: e,
                            handler: t,
                            one: n,
                            fired: !1
                        })
                    }
                };
            return a.setDefaults = function(e) {
                i = e
            }, a.on = function(e, t) {
                return l.addEvent(e, t)
            }, l.construct.apply(a, [t]), !0, a
        }
    },
    mMenu = function(e, t) {
        var a = this,
            n = !1,
            o = mUtil.get(e),
            i = mUtil.get("body");
        if (o) {
            var l = {
                    accordion: {
                        slideSpeed: 200,
                        autoScroll: !1,
                        autoScrollSpeed: 1200,
                        expandAll: !0
                    },
                    dropdown: {
                        timeout: 500
                    }
                },
                r = {
                    construct: function(e) {
                        return mUtil.data(o).has("menu") ? a = mUtil.data(o).get("menu") : (r.init(e), r.reset(), r.build(), mUtil.data(o).set("menu", a)), a
                    },
                    init: function(e) {
                        a.events = [], a.eventHandlers = {}, a.options = mUtil.deepExtend({}, l, e), a.pauseDropdownHoverTime = 0, a.uid = mUtil.getUniqueID()
                    },
                    update: function(e) {
                        a.options = mUtil.deepExtend({}, l, e), a.pauseDropdownHoverTime = 0, r.reset(), a.eventHandlers = {}, r.build(), mUtil.data(o).set("menu", a)
                    },
                    reload: function() {
                        r.reset(), r.build()
                    },
                    build: function() {
                        a.eventHandlers.event_1 = mUtil.on(o, ".m-menu__toggle", "click", r.handleSubmenuAccordion), ("dropdown" === r.getSubmenuMode() || r.isConditionalSubmenuDropdown()) && (a.eventHandlers.event_2 = mUtil.on(o, '[m-menu-submenu-toggle="hover"]', "mouseover", r.handleSubmenuDrodownHoverEnter), a.eventHandlers.event_3 = mUtil.on(o, '[m-menu-submenu-toggle="hover"]', "mouseout", r.handleSubmenuDrodownHoverExit), a.eventHandlers.event_4 = mUtil.on(o, '[m-menu-submenu-toggle="click"] > .m-menu__toggle, [m-menu-submenu-toggle="click"] > .m-menu__link .m-menu__toggle', "click", r.handleSubmenuDropdownClick), a.eventHandlers.event_5 = mUtil.on(o, '[m-menu-submenu-toggle="tab"] > .m-menu__toggle, [m-menu-submenu-toggle="tab"] > .m-menu__link .m-menu__toggle', "click", r.handleSubmenuDropdownTabClick)), a.eventHandlers.event_6 = mUtil.on(o, ".m-menu__item:not(.m-menu__item--submenu) > .m-menu__link:not(.m-menu__toggle):not(.m-menu__link--toggle-skip)", "click", r.handleLinkClick), a.options.scroll && a.options.scroll.height && r.scrollerInit()
                    },
                    reset: function() {
                        mUtil.off(o, "click", a.eventHandlers.event_1), mUtil.off(o, "mouseover", a.eventHandlers.event_2), mUtil.off(o, "mouseout", a.eventHandlers.event_3), mUtil.off(o, "click", a.eventHandlers.event_4), mUtil.off(o, "click", a.eventHandlers.event_5), mUtil.off(o, "click", a.eventHandlers.event_6)
                    },
                    scrollerInit: function() {
                        a.options.scroll && a.options.scroll.height && (mUtil.scrollerDestroy(o), mUtil.scrollerInit(o, {
                            disableForMobile: !0,
                            resetHeightOnDestroy: !0,
                            handleWindowResize: !0,
                            height: a.options.scroll.height
                        }))
                    },
                    scrollerUpdate: function() {
                        a.options.scroll && a.options.scroll.height ? mUtil.scrollerUpdate(o) : mUtil.scrollerDestroy(o)
                    },
                    scrollerTop: function() {
                        a.options.scroll && a.options.scroll.height && mUtil.scrollerTop(o)
                    },
                    getSubmenuMode: function(e) {
                        return mUtil.isInResponsiveRange("desktop") ? e && mUtil.hasAttr(e, "m-menu-submenu-toggle") ? mUtil.attr(e, "m-menu-submenu-toggle") : mUtil.isset(a.options.submenu, "desktop.state.body") ? mUtil.hasClass(i, a.options.submenu.desktop.state.body) ? a.options.submenu.desktop.state.mode : a.options.submenu.desktop.default : mUtil.isset(a.options.submenu, "desktop") ? a.options.submenu.desktop : void 0 : mUtil.isInResponsiveRange("tablet") && mUtil.isset(a.options.submenu, "tablet") ? a.options.submenu.tablet : !(!mUtil.isInResponsiveRange("mobile") || !mUtil.isset(a.options.submenu, "mobile")) && a.options.submenu.mobile
                    },
                    isConditionalSubmenuDropdown: function() {
                        return !(!mUtil.isInResponsiveRange("desktop") || !mUtil.isset(a.options.submenu, "desktop.state.body"))
                    },
                    handleLinkClick: function(e) {
                        !1 === r.eventTrigger("linkClick", this) && e.preventDefault(), ("dropdown" === r.getSubmenuMode(this) || r.isConditionalSubmenuDropdown()) && r.handleSubmenuDropdownClose(e, this)
                    },
                    handleSubmenuDrodownHoverEnter: function(e) {
                        if ("accordion" !== r.getSubmenuMode(this) && !1 !== a.resumeDropdownHover()) {
                            "1" == this.getAttribute("data-hover") && (this.removeAttribute("data-hover"), clearTimeout(this.getAttribute("data-timeout")), this.removeAttribute("data-timeout")), r.showSubmenuDropdown(this)
                        }
                    },
                    handleSubmenuDrodownHoverExit: function(e) {
                        if (!1 !== a.resumeDropdownHover() && "accordion" !== r.getSubmenuMode(this)) {
                            var t = this,
                                n = a.options.dropdown.timeout,
                                o = setTimeout(function() {
                                    "1" == t.getAttribute("data-hover") && r.hideSubmenuDropdown(t, !0)
                                }, n);
                            t.setAttribute("data-hover", "1"), t.setAttribute("data-timeout", o)
                        }
                    },
                    handleSubmenuDropdownClick: function(e) {
                        if ("accordion" !== r.getSubmenuMode(this)) {
                            var t = this.closest(".m-menu__item");
                            "accordion" != t.getAttribute("m-menu-submenu-mode") && (!1 === mUtil.hasClass(t, "m-menu__item--hover") ? (mUtil.addClass(t, "m-menu__item--open-dropdown"), r.showSubmenuDropdown(t)) : (mUtil.removeClass(t, "m-menu__item--open-dropdown"), r.hideSubmenuDropdown(t, !0)), e.preventDefault())
                        }
                    },
                    handleSubmenuDropdownTabClick: function(e) {
                        if ("accordion" !== r.getSubmenuMode(this)) {
                            var t = this.closest(".m-menu__item");
                            "accordion" != t.getAttribute("m-menu-submenu-mode") && (0 == mUtil.hasClass(t, "m-menu__item--hover") && (mUtil.addClass(t, "m-menu__item--open-dropdown"), r.showSubmenuDropdown(t)), e.preventDefault())
                        }
                    },
                    handleSubmenuDropdownClose: function(e, t) {
                        if ("accordion" !== r.getSubmenuMode(t)) {
                            var a = o.querySelectorAll(".m-menu__item.m-menu__item--submenu.m-menu__item--hover:not(.m-menu__item--tabs)");
                            if (a.length > 0 && !1 === mUtil.hasClass(t, "m-menu__toggle") && 0 === t.querySelectorAll(".m-menu__toggle").length)
                                for (var n = 0, i = a.length; n < i; n++) r.hideSubmenuDropdown(a[0], !0)
                        }
                    },
                    handleSubmenuAccordion: function(e, t) {
                        var n, o = t || this;
                        if ("dropdown" === r.getSubmenuMode(t) && (n = o.closest(".m-menu__item")) && "accordion" != n.getAttribute("m-menu-submenu-mode")) e.preventDefault();
                        else {
                            var i = o.closest(".m-menu__item"),
                                l = mUtil.child(i, ".m-menu__submenu, .m-menu__inner");
                            if (!mUtil.hasClass(o.closest(".m-menu__item"), "m-menu__item--open-always") && i && l) {
                                e.preventDefault();
                                var s = a.options.accordion.slideSpeed;
                                if (!1 === mUtil.hasClass(i, "m-menu__item--open")) {
                                    if (!1 === a.options.accordion.expandAll) {
                                        var d = o.closest(".m-menu__nav, .m-menu__subnav"),
                                            c = mUtil.children(d, ".m-menu__item.m-menu__item--open.m-menu__item--submenu:not(.m-menu__item--expanded):not(.m-menu__item--open-always)");
                                        if (d && c)
                                            for (var m = 0, u = c.length; m < u; m++) {
                                                var p = c[0],
                                                    f = mUtil.child(p, ".m-menu__submenu");
                                                f && mUtil.slideUp(f, s, function() {
                                                    r.scrollerUpdate(), mUtil.removeClass(p, "m-menu__item--open")
                                                })
                                            }
                                    }
                                    mUtil.slideDown(l, s, function() {
                                        r.scrollToItem(o), r.scrollerUpdate(), r.eventTrigger("submenuToggle", l)
                                    }), mUtil.addClass(i, "m-menu__item--open")
                                } else mUtil.slideUp(l, s, function() {
                                    r.scrollToItem(o), r.eventTrigger("submenuToggle", l)
                                }), mUtil.removeClass(i, "m-menu__item--open")
                            }
                        }
                    },
                    scrollToItem: function(e) {
                        mUtil.isInResponsiveRange("desktop") && a.options.accordion.autoScroll && "1" !== o.getAttribute("m-menu-scrollable") && mUtil.scrollTo(e, a.options.accordion.autoScrollSpeed)
                    },
                    hideSubmenuDropdown: function(e, t) {
                        t && (mUtil.removeClass(e, "m-menu__item--hover"), mUtil.removeClass(e, "m-menu__item--active-tab")), e.removeAttribute("data-hover"), e.getAttribute("m-menu-dropdown-toggle-class") && mUtil.removeClass(i, e.getAttribute("m-menu-dropdown-toggle-class"));
                        var a = e.getAttribute("data-timeout");
                        e.removeAttribute("data-timeout"), clearTimeout(a)
                    },
                    showSubmenuDropdown: function(e) {
                        var t = o.querySelectorAll(".m-menu__item--submenu.m-menu__item--hover, .m-menu__item--submenu.m-menu__item--active-tab");
                        if (t)
                            for (var a = 0, n = t.length; a < n; a++) {
                                var l = t[a];
                                e !== l && !1 === l.contains(e) && !1 === e.contains(l) && r.hideSubmenuDropdown(l, !0)
                            }
                        r.adjustSubmenuDropdownArrowPos(e), mUtil.addClass(e, "m-menu__item--hover"), e.getAttribute("m-menu-dropdown-toggle-class") && mUtil.addClass(i, e.getAttribute("m-menu-dropdown-toggle-class"))
                    },
                    createSubmenuDropdownClickDropoff: function(e) {
                        var t, a = (t = mUtil.child(e, ".m-menu__submenu") ? mUtil.css(t, "z-index") : 0) - 1,
                            n = document.createElement('<div class="m-menu__dropoff" style="background: transparent; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: ' + a + '"></div>');
                        i.appendChild(n), mUtil.addEvent(n, "click", function(t) {
                            t.stopPropagation(), t.preventDefault(), mUtil.remove(this), r.hideSubmenuDropdown(e, !0)
                        })
                    },
                    adjustSubmenuDropdownArrowPos: function(e) {
                        var t = mUtil.child(e, ".m-menu__submenu"),
                            a = mUtil.child(t, ".m-menu__arrow.m-menu__arrow--adjust");
                        mUtil.child(t, ".m-menu__subnav");
                        if (a) {
                            var n = 0;
                            mUtil.child(e, ".m-menu__link");
                            mUtil.hasClass(t, "m-menu__submenu--classic") || mUtil.hasClass(t, "m-menu__submenu--fixed") ? (mUtil.hasClass(t, "m-menu__submenu--right") ? (n = mUtil.outerWidth(e) / 2, mUtil.hasClass(t, "m-menu__submenu--pull") && (mUtil.isRTL() ? n += Math.abs(parseFloat(mUtil.css(t, "margin-left"))) : n += Math.abs(parseFloat(mUtil.css(t, "margin-right")))), n = parseInt(mUtil.css(t, "width")) - n) : mUtil.hasClass(t, "m-menu__submenu--left") && (n = mUtil.outerWidth(e) / 2, mUtil.hasClass(t, "m-menu__submenu--pull") && (mUtil.isRTL() ? n += Math.abs(parseFloat(mUtil.css(t, "margin-right"))) : n += Math.abs(parseFloat(mUtil.css(t, "margin-left"))))), mUtil.isRTL() ? mUtil.css(a, "right", n + "px") : mUtil.css(a, "left", n + "px")) : (mUtil.hasClass(t, "m-menu__submenu--center") || mUtil.hasClass(t, "m-menu__submenu--full")) && (n = mUtil.offset(e).left - (mUtil.getViewPort().width - parseInt(mUtil.css(t, "width"))) / 2, n += mUtil.outerWidth(e) / 2, mUtil.css(a, "left", n + "px"), mUtil.isRTL() && mUtil.css(a, "right", "auto"))
                        }
                    },
                    pauseDropdownHover: function(e) {
                        var t = new Date;
                        a.pauseDropdownHoverTime = t.getTime() + e
                    },
                    resumeDropdownHover: function() {
                        return (new Date).getTime() > a.pauseDropdownHoverTime
                    },
                    resetActiveItem: function(e) {
                        for (var t, n, i = 0, l = (t = o.querySelectorAll(".m-menu__item--active")).length; i < l; i++) {
                            var r = t[0];
                            mUtil.removeClass(r, "m-menu__item--active"), mUtil.hide(mUtil.child(r, ".m-menu__submenu"));
                            for (var s = 0, d = (n = mUtil.parents(r, ".m-menu__item--submenu")).length; s < d; s++) {
                                var c = n[i];
                                mUtil.removeClass(c, "m-menu__item--open"), mUtil.hide(mUtil.child(c, ".m-menu__submenu"))
                            }
                        }
                        if (!1 === a.options.accordion.expandAll && (t = o.querySelectorAll(".m-menu__item--open")))
                            for (i = 0, l = t.length; i < l; i++) mUtil.removeClass(n[0], "m-menu__item--open")
                    },
                    setActiveItem: function(e) {
                        r.resetActiveItem(), mUtil.addClass(e, "m-menu__item--active");
                        for (var t = mUtil.parents(e, ".m-menu__item--submenu"), a = 0, n = t.length; a < n; a++) mUtil.addClass(t[a], "m-menu__item--open")
                    },
                    getBreadcrumbs: function(e) {
                        var t, a = [],
                            n = mUtil.child(e, ".m-menu__link");
                        a.push({
                            text: t = mUtil.child(n, ".m-menu__link-text") ? t.innerHTML : "",
                            title: n.getAttribute("title"),
                            href: n.getAttribute("href")
                        });
                        for (var o = mUtil.parents(e, ".m-menu__item--submenu"), i = 0, l = o.length; i < l; i++) {
                            var r = mUtil.child(o[i], ".m-menu__link");
                            a.push({
                                text: t = mUtil.child(r, ".m-menu__link-text") ? t.innerHTML : "",
                                title: r.getAttribute("title"),
                                href: r.getAttribute("href")
                            })
                        }
                        return a.reverse()
                    },
                    getPageTitle: function(e) {
                        var t;
                        return mUtil.child(e, ".m-menu__link-text") ? t.innerHTML : ""
                    },
                    eventTrigger: function(e, t) {
                        for (var n = 0; n < a.events.length; n++) {
                            var o = a.events[n];
                            o.name == e && (1 == o.one ? 0 == o.fired && (a.events[n].fired = !0, o.handler.call(this, a, t)) : o.handler.call(this, a, t))
                        }
                    },
                    addEvent: function(e, t, n) {
                        a.events.push({
                            name: e,
                            handler: t,
                            one: n,
                            fired: !1
                        })
                    },
                    removeEvent: function(e) {
                        a.events[e] && delete a.events[e]
                    }
                };
            return a.setDefaults = function(e) {
                l = e
            }, a.scrollerUpdate = function() {
                return r.scrollerUpdate()
            }, a.scrollerTop = function() {
                return r.scrollerTop()
            }, a.setActiveItem = function(e) {
                return r.setActiveItem(e)
            }, a.reload = function() {
                return r.reload()
            }, a.update = function(e) {
                return r.update(e)
            }, a.getBreadcrumbs = function(e) {
                return r.getBreadcrumbs(e)
            }, a.getPageTitle = function(e) {
                return r.getPageTitle(e)
            }, a.getSubmenuMode = function(e) {
                return r.getSubmenuMode(e)
            }, a.hideDropdown = function(e) {
                r.hideSubmenuDropdown(e, !0)
            }, a.pauseDropdownHover = function(e) {
                r.pauseDropdownHover(e)
            }, a.resumeDropdownHover = function() {
                return r.resumeDropdownHover()
            }, a.on = function(e, t) {
                return r.addEvent(e, t)
            }, a.off = function(e) {
                return r.removeEvent(e)
            }, a.one = function(e, t) {
                return r.addEvent(e, t, !0)
            }, r.construct.apply(a, [t]), mUtil.addResizeHandler(function() {
                n && a.reload()
            }), n = !0, a
        }
    };
document.addEventListener("click", function(e) {
    var t;
    if (t = mUtil.get("body").querySelectorAll('.m-menu__nav .m-menu__item.m-menu__item--submenu.m-menu__item--hover:not(.m-menu__item--tabs)[m-menu-submenu-toggle="click"]'))
        for (var a = 0, n = t.length; a < n; a++) {
            var o = t[a].closest(".m-menu__nav").parentNode;
            if (o) {
                var i, l = mUtil.data(o).get("menu");
                if (!l) break;
                if (!l || "dropdown" !== l.getSubmenuMode()) break;
                if (e.target !== o && !1 === o.contains(e.target))
                    if (i = o.querySelectorAll('.m-menu__item--submenu.m-menu__item--hover:not(.m-menu__item--tabs)[m-menu-submenu-toggle="click"]'))
                        for (var r = 0, s = i.length; r < s; r++) l.hideDropdown(i[r])
            }
        }
});
var mOffcanvas = function(e, t) {
        var a = this,
            n = mUtil.get(e),
            o = mUtil.get("body");
        if (n) {
            var i = {},
                l = {
                    construct: function(e) {
                        return mUtil.data(n).has("offcanvas") ? a = mUtil.data(n).get("offcanvas") : (l.init(e), l.build(), mUtil.data(n).set("offcanvas", a)), a
                    },
                    init: function(e) {
                        a.events = [], a.options = mUtil.deepExtend({}, i, e), a.overlay, a.classBase = a.options.baseClass, a.classShown = a.classBase + "--on", a.classOverlay = a.classBase + "-overlay", a.state = mUtil.hasClass(n, a.classShown) ? "shown" : "hidden"
                    },
                    build: function() {
                        if (a.options.toggleBy)
                            if ("string" == typeof a.options.toggleBy) mUtil.addEvent(a.options.toggleBy, "click", l.toggle);
                            else if (a.options.toggleBy && a.options.toggleBy[0] && a.options.toggleBy[0].target)
                            for (var e in a.options.toggleBy) mUtil.addEvent(a.options.toggleBy[e].target, "click", l.toggle);
                        else a.options.toggleBy && a.options.toggleBy.target && mUtil.addEvent(a.options.toggleBy.target, "click", l.toggle);
                        var t = mUtil.get(a.options.closeBy);
                        t && mUtil.addEvent(t, "click", l.hide)
                    },
                    toggle: function() {
                        l.eventTrigger("toggle"), "shown" == a.state ? l.hide(this) : l.show(this)
                    },
                    show: function(e) {
                        "shown" != a.state && (l.eventTrigger("beforeShow"), l.togglerClass(e, "show"), mUtil.addClass(o, a.classShown), mUtil.addClass(n, a.classShown), a.state = "shown", a.options.overlay && (a.overlay = mUtil.insertAfter(document.createElement("DIV"), n), mUtil.addClass(a.overlay, a.classOverlay), mUtil.addEvent(a.overlay, "click", function(t) {
                            t.stopPropagation(), t.preventDefault(), l.hide(e)
                        })), l.eventTrigger("afterShow"))
                    },
                    hide: function(e) {
                        "hidden" != a.state && (l.eventTrigger("beforeHide"), l.togglerClass(e, "hide"), mUtil.removeClass(o, a.classShown), mUtil.removeClass(n, a.classShown), a.state = "hidden", a.options.overlay && a.overlay && mUtil.remove(a.overlay), l.eventTrigger("afterHide"))
                    },
                    togglerClass: function(e, t) {
                        var n, o = mUtil.attr(e, "id");
                        if (a.options.toggleBy && a.options.toggleBy[0] && a.options.toggleBy[0].target)
                            for (var i in a.options.toggleBy) a.options.toggleBy[i].target === o && (n = a.options.toggleBy[i]);
                        else a.options.toggleBy && a.options.toggleBy.target && (n = a.options.toggleBy);
                        if (n) {
                            var l = mUtil.get(n.target);
                            "show" === t && mUtil.addClass(l, n.state), "hide" === t && mUtil.removeClass(l, n.state)
                        }
                    },
                    eventTrigger: function(e, t) {
                        for (var n = 0; n < a.events.length; n++) {
                            var o = a.events[n];
                            o.name == e && (1 == o.one ? 0 == o.fired && (a.events[n].fired = !0, o.handler.call(this, a, t)) : o.handler.call(this, a, t))
                        }
                    },
                    addEvent: function(e, t, n) {
                        a.events.push({
                            name: e,
                            handler: t,
                            one: n,
                            fired: !1
                        })
                    }
                };
            return a.setDefaults = function(e) {
                i = e
            }, a.hide = function() {
                return l.hide()
            }, a.show = function() {
                return l.show()
            }, a.on = function(e, t) {
                return l.addEvent(e, t)
            }, a.one = function(e, t) {
                return l.addEvent(e, t, !0)
            }, l.construct.apply(a, [t]), !0, a
        }
    },
    mPortlet = function(e, t) {
        var a = this,
            n = mUtil.get(e),
            o = mUtil.get("body");
        if (n) {
            var l = {
                    bodyToggleSpeed: 400,
                    tooltips: !0,
                    tools: {
                        toggle: {
                            collapse: "Collapse",
                            expand: "Expand"
                        },
                        reload: "Reload",
                        remove: "Remove",
                        fullscreen: {
                            on: "Fullscreen",
                            off: "Exit Fullscreen"
                        }
                    },
                    sticky: {
                        offset: 300,
                        zIndex: 98
                    }
                },
                r = {
                    construct: function(e) {
                        return mUtil.data(n).has("portlet") ? a = mUtil.data(n).get("portlet") : (r.init(e), r.build(), mUtil.data(n).set("portlet", a)), a
                    },
                    init: function(e) {
                        a.element = n, a.events = [], a.options = mUtil.deepExtend({}, l, e), a.head = mUtil.child(n, ".m-portlet__head"), a.foot = mUtil.child(n, ".m-portlet__foot"), mUtil.child(n, ".m-portlet__body") ? a.body = mUtil.child(n, ".m-portlet__body") : 0 !== mUtil.child(n, ".m-form").length && (a.body = mUtil.child(n, ".m-form"))
                    },
                    build: function() {
                        var e = mUtil.find(a.head, "[m-portlet-tool=remove]");
                        e && mUtil.addEvent(e, "click", function(e) {
                            e.preventDefault(), r.remove()
                        });
                        var t = mUtil.find(a.head, "[m-portlet-tool=reload]");
                        t && mUtil.addEvent(t, "click", function(e) {
                            e.preventDefault(), r.reload()
                        });
                        var n = mUtil.find(a.head, "[m-portlet-tool=toggle]");
                        n && mUtil.addEvent(n, "click", function(e) {
                            e.preventDefault(), r.toggle()
                        });
                        var o = mUtil.find(a.head, "[m-portlet-tool=fullscreen]");
                        o && mUtil.addEvent(o, "click", function(e) {
                            e.preventDefault(), r.fullscreen()
                        }), r.setupTooltips()
                    },
                    onScrollSticky: function() {
                        window.pageYOffset > a.options.sticky.offset ? !1 === mUtil.hasClass(o, "m-portlet--sticky") && (r.eventTrigger("stickyOn"), mUtil.addClass(o, "m-portlet--sticky"), mUtil.addClass(n, "m-portlet--sticky"), r.updateSticky()) : mUtil.hasClass(o, "m-portlet--sticky") && (r.eventTrigger("stickyOff"), mUtil.removeClass(o, "m-portlet--sticky"), mUtil.removeClass(n, "m-portlet--sticky"), r.resetSticky())
                    },
                    initSticky: function() {
                        a.head && window.addEventListener("scroll", r.onScrollSticky)
                    },
                    updateSticky: function() {
                        var e, t, n;
                        a.head && (mUtil.hasClass(o, "m-portlet--sticky") && (e = a.options.sticky.position.top instanceof Function ? parseInt(a.options.sticky.position.top.call()) : parseInt(a.options.sticky.position.top), t = a.options.sticky.position.left instanceof Function ? parseInt(a.options.sticky.position.left.call()) : parseInt(a.options.sticky.position.left), n = a.options.sticky.position.right instanceof Function ? parseInt(a.options.sticky.position.right.call()) : parseInt(a.options.sticky.position.right), mUtil.css(a.head, "z-index", a.options.sticky.zIndex), mUtil.css(a.head, "top", e + "px"), mUtil.isRTL() ? (mUtil.css(a.head, "left", n + "px"), mUtil.css(a.head, "right", t + "px")) : (mUtil.css(a.head, "left", t + "px"), mUtil.css(a.head, "right", n + "px"))))
                    },
                    resetSticky: function() {
                        a.head && !1 === mUtil.hasClass(o, "m-portlet--sticky") && (mUtil.css(a.head, "z-index", ""), mUtil.css(a.head, "top", ""), mUtil.css(a.head, "left", ""), mUtil.css(a.head, "right", ""))
                    },
                    destroySticky: function() {
                        a.head && (r.resetSticky(), window.removeEventListener("scroll", r.onScrollSticky))
                    },
                    remove: function() {
                        !1 !== r.eventTrigger("beforeRemove") && (mUtil.hasClass(o, "m-portlet--fullscreen") && mUtil.hasClass(n, "m-portlet--fullscreen") && r.fullscreen("off"), r.removeTooltips(), mUtil.remove(n), r.eventTrigger("afterRemove"))
                    },
                    setContent: function(e) {
                        e && (a.body.innerHTML = e)
                    },
                    getBody: function() {
                        return a.body
                    },
                    getSelf: function() {
                        return n
                    },
                    setupTooltips: function() {
                        if (a.options.tooltips) {
                            var e = mUtil.hasClass(n, "m-portlet--collapse") || mUtil.hasClass(n, "m-portlet--collapsed"),
                                t = mUtil.hasClass(o, "m-portlet--fullscreen") && mUtil.hasClass(n, "m-portlet--fullscreen"),
                                i = mUtil.find(a.head, "[m-portlet-tool=remove]");
                            if (i) {
                                var l = t ? "bottom" : "top",
                                    r = new Tooltip(i, {
                                        title: a.options.tools.remove,
                                        placement: l,
                                        offset: t ? "0,10px,0,0" : "0,5px",
                                        trigger: "hover",
                                        template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + l + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
                                    });
                                mUtil.data(i).set("tooltip", r)
                            }
                            var s = mUtil.find(a.head, "[m-portlet-tool=reload]");
                            if (s) {
                                l = t ? "bottom" : "top", r = new Tooltip(s, {
                                    title: a.options.tools.reload,
                                    placement: l,
                                    offset: t ? "0,10px,0,0" : "0,5px",
                                    trigger: "hover",
                                    template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + l + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
                                });
                                mUtil.data(s).set("tooltip", r)
                            }
                            var d = mUtil.find(a.head, "[m-portlet-tool=toggle]");
                            if (d) {
                                l = t ? "bottom" : "top", r = new Tooltip(d, {
                                    title: e ? a.options.tools.toggle.expand : a.options.tools.toggle.collapse,
                                    placement: l,
                                    offset: t ? "0,10px,0,0" : "0,5px",
                                    trigger: "hover",
                                    template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + l + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
                                });
                                mUtil.data(d).set("tooltip", r)
                            }
                            var c = mUtil.find(a.head, "[m-portlet-tool=fullscreen]");
                            if (c) {
                                l = t ? "bottom" : "top", r = new Tooltip(c, {
                                    title: t ? a.options.tools.fullscreen.off : a.options.tools.fullscreen.on,
                                    placement: l,
                                    offset: t ? "0,10px,0,0" : "0,5px",
                                    trigger: "hover",
                                    template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + l + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
                                });
                                mUtil.data(c).set("tooltip", r)
                            }
                        }
                    },
                    removeTooltips: function() {
                        if (a.options.tooltips) {
                            var e = mUtil.find(a.head, "[m-portlet-tool=remove]");
                            e && mUtil.data(e).has("tooltip") && mUtil.data(e).get("tooltip").dispose();
                            var t = mUtil.find(a.head, "[m-portlet-tool=reload]");
                            t && mUtil.data(t).has("tooltip") && mUtil.data(t).get("tooltip").dispose();
                            var n = mUtil.find(a.head, "[m-portlet-tool=toggle]");
                            n && mUtil.data(n).has("tooltip") && mUtil.data(n).get("tooltip").dispose();
                            var o = mUtil.find(a.head, "[m-portlet-tool=fullscreen]");
                            o && mUtil.data(o).has("tooltip") && mUtil.data(o).get("tooltip").dispose()
                        }
                    },
                    reload: function() {
                        r.eventTrigger("reload")
                    },
                    toggle: function() {
                        mUtil.hasClass(n, "m-portlet--collapse") || mUtil.hasClass(n, "m-portlet--collapsed") ? r.expand() : r.collapse()
                    },
                    collapse: function() {
                        if (!1 !== r.eventTrigger("beforeCollapse")) {
                            mUtil.slideUp(a.body, a.options.bodyToggleSpeed, function() {
                                r.eventTrigger("afterCollapse")
                            }), mUtil.addClass(n, "m-portlet--collapse");
                            var e = mUtil.find(a.head, "[m-portlet-tool=toggle]");
                            e && mUtil.data(e).has("tooltip") && mUtil.data(e).get("tooltip").updateTitleContent(a.options.tools.toggle.expand)
                        }
                    },
                    expand: function() {
                        if (!1 !== r.eventTrigger("beforeExpand")) {
                            mUtil.slideDown(a.body, a.options.bodyToggleSpeed, function() {
                                r.eventTrigger("afterExpand")
                            }), mUtil.removeClass(n, "m-portlet--collapse"), mUtil.removeClass(n, "m-portlet--collapsed");
                            var e = mUtil.find(a.head, "[m-portlet-tool=toggle]");
                            e && mUtil.data(e).has("tooltip") && mUtil.data(e).get("tooltip").updateTitleContent(a.options.tools.toggle.collapse)
                        }
                    },
                    fullscreen: function(e) {
                        if ("off" === e || mUtil.hasClass(o, "m-portlet--fullscreen") && mUtil.hasClass(n, "m-portlet--fullscreen")) r.eventTrigger("beforeFullscreenOff"), mUtil.removeClass(o, "m-portlet--fullscreen"), mUtil.removeClass(n, "m-portlet--fullscreen"), r.removeTooltips(), r.setupTooltips(), a.foot && (mUtil.css(a.body, "margin-bottom", ""), mUtil.css(a.foot, "margin-top", "")), r.eventTrigger("afterFullscreenOff");
                        else {
                            if (r.eventTrigger("beforeFullscreenOn"), mUtil.addClass(n, "m-portlet--fullscreen"), mUtil.addClass(o, "m-portlet--fullscreen"), r.removeTooltips(), r.setupTooltips(), a.foot) {
                                var t = parseInt(mUtil.css(a.foot, "height")),
                                    i = parseInt(mUtil.css(a.foot, "height")) + parseInt(mUtil.css(a.head, "height"));
                                mUtil.css(a.body, "margin-bottom", t + "px"), mUtil.css(a.foot, "margin-top", "-" + i + "px")
                            }
                            r.eventTrigger("afterFullscreenOn")
                        }
                    },
                    eventTrigger: function(e) {
                        for (i = 0; i < a.events.length; i++) {
                            var t = a.events[i];
                            t.name == e && (1 == t.one ? 0 == t.fired && (a.events[i].fired = !0, t.handler.call(this, a)) : t.handler.call(this, a))
                        }
                    },
                    addEvent: function(e, t, n) {
                        return a.events.push({
                            name: e,
                            handler: t,
                            one: n,
                            fired: !1
                        }), a
                    }
                };
            return a.setDefaults = function(e) {
                l = e
            }, a.remove = function() {
                return r.remove(html)
            }, a.initSticky = function() {
                return r.initSticky()
            }, a.updateSticky = function() {
                return r.updateSticky()
            }, a.resetSticky = function() {
                return r.resetSticky()
            }, a.destroySticky = function() {
                return r.destroySticky()
            }, a.reload = function() {
                return r.reload()
            }, a.setContent = function(e) {
                return r.setContent(e)
            }, a.toggle = function() {
                return r.toggle()
            }, a.collapse = function() {
                return r.collapse()
            }, a.expand = function() {
                return r.expand()
            }, a.fullscreen = function() {
                return r.fullscreen("on")
            }, a.unFullscreen = function() {
                return r.fullscreen("off")
            }, a.getBody = function() {
                return r.getBody()
            }, a.getSelf = function() {
                return r.getSelf()
            }, a.on = function(e, t) {
                return r.addEvent(e, t)
            }, a.one = function(e, t) {
                return r.addEvent(e, t, !0)
            }, r.construct.apply(a, [t]), a
        }
    },
    mQuicksearch = function(e, t) {
        var a = this,
            n = mUtil.get(e),
            o = mUtil.get("body");
        if (n) {
            var l = {
                    mode: "default",
                    minLength: 1,
                    maxHeight: 300,
                    requestTimeout: 200,
                    inputTarget: "m_quicksearch_input",
                    iconCloseTarget: "m_quicksearch_close",
                    iconCancelTarget: "m_quicksearch_cancel",
                    iconSearchTarget: "m_quicksearch_search",
                    spinnerClass: "m-loader m-loader--skin-light m-loader--right",
                    hasResultClass: "m-list-search--has-result",
                    templates: {
                        error: '<div class="m-search-results m-search-results--skin-light"><span class="m-search-result__message">{{message}}</div></div>'
                    }
                },
                r = {
                    construct: function(e) {
                        return mUtil.data(n).has("quicksearch") ? a = mUtil.data(n).get("quicksearch") : (r.init(e), r.build(), mUtil.data(n).set("quicksearch", a)), a
                    },
                    init: function(e) {
                        a.element = n, a.events = [], a.options = mUtil.deepExtend({}, l, e), a.query = "", a.form = mUtil.find(n, "form"), a.input = mUtil.get(a.options.inputTarget), a.iconClose = mUtil.get(a.options.iconCloseTarget), "default" == a.options.mode && (a.iconSearch = mUtil.get(a.options.iconSearchTarget), a.iconCancel = mUtil.get(a.options.iconCancelTarget)), a.dropdown = new mDropdown(n, {
                            mobileOverlay: !1
                        }), a.cancelTimeout, a.processing = !1, a.requestTimeout = !1
                    },
                    build: function() {
                        mUtil.addEvent(a.input, "keyup", r.search), mUtil.find(n, "form").onkeypress = function(e) {
                            13 == (e.charCode || e.keyCode || 0) && e.preventDefault()
                        }, "default" == a.options.mode ? (mUtil.addEvent(a.input, "focus", r.showDropdown), mUtil.addEvent(a.iconCancel, "click", r.handleCancel), mUtil.addEvent(a.iconSearch, "click", function() {
                            mUtil.isInResponsiveRange("tablet-and-mobile") && (mUtil.addClass(o, "m-header-search--mobile-expanded"), a.input.focus())
                        }), mUtil.addEvent(a.iconClose, "click", function() {
                            mUtil.isInResponsiveRange("tablet-and-mobile") && (mUtil.removeClass(o, "m-header-search--mobile-expanded"), r.closeDropdown())
                        })) : "dropdown" == a.options.mode && (a.dropdown.on("afterShow", function() {
                            a.input.focus()
                        }), mUtil.addEvent(a.iconClose, "click", r.closeDropdown))
                    },
                    showProgress: function() {
                        return a.processing = !0, mUtil.addClass(a.form, a.options.spinnerClass), r.handleCancelIconVisibility("off"), a
                    },
                    hideProgress: function() {
                        return a.processing = !1, mUtil.removeClass(a.form, a.options.spinnerClass), r.handleCancelIconVisibility("on"), mUtil.addClass(n, a.options.hasResultClass), a
                    },
                    search: function(e) {
                        if (a.query = a.input.value, 0 === a.query.length && (r.handleCancelIconVisibility("on"), mUtil.removeClass(n, a.options.hasResultClass), mUtil.removeClass(a.form, a.options.spinnerClass)), !(a.query.length < a.options.minLength || 1 == a.processing)) return a.requestTimeout && clearTimeout(a.requestTimeout), a.requestTimeout = !1, a.requestTimeout = setTimeout(function() {
                            r.eventTrigger("search")
                        }, a.options.requestTimeout), a
                    },
                    handleCancelIconVisibility: function(e) {
                        "on" == e ? 0 === a.input.value.length ? (a.iconCancel && mUtil.css(a.iconCancel, "visibility", "hidden"), a.iconClose && mUtil.css(a.iconClose, "visibility", "visible")) : (clearTimeout(a.cancelTimeout), a.cancelTimeout = setTimeout(function() {
                            a.iconCancel && mUtil.css(a.iconCancel, "visibility", "visible"), a.iconClose && mUtil.css(a.iconClose, "visibility", "visible")
                        }, 500)) : (a.iconCancel && mUtil.css(a.iconCancel, "visibility", "hidden"), a.iconClose && mUtil.css(a.iconClose, "visibility", "hidden"))
                    },
                    handleCancel: function(e) {
                        a.input.value = "", mUtil.css(a.iconCancel, "visibility", "hidden"), mUtil.removeClass(n, a.options.hasResultClass), r.closeDropdown()
                    },
                    closeDropdown: function() {
                        a.dropdown.hide()
                    },
                    showDropdown: function(e) {
                        0 == a.dropdown.isShown() && a.input.value.length > a.options.minLength && 0 == a.processing && (console.log("show!!!"), a.dropdown.show(), e && (e.preventDefault(), e.stopPropagation()))
                    },
                    eventTrigger: function(e) {
                        for (i = 0; i < a.events.length; i++) {
                            var t = a.events[i];
                            t.name == e && (1 == t.one ? 0 == t.fired && (a.events[i].fired = !0, t.handler.call(this, a)) : t.handler.call(this, a))
                        }
                    },
                    addEvent: function(e, t, n) {
                        return a.events.push({
                            name: e,
                            handler: t,
                            one: n,
                            fired: !1
                        }), a
                    }
                };
            return a.setDefaults = function(e) {
                l = e
            }, a.search = function() {
                return r.handleSearch()
            }, a.showResult = function(e) {
                return a.dropdown.setContent(e), r.showDropdown(), a
            }, a.showError = function(e) {
                var t = a.options.templates.error.replace("{{message}}", e);
                return a.dropdown.setContent(t), r.showDropdown(), a
            }, a.showProgress = function() {
                return r.showProgress()
            }, a.hideProgress = function() {
                return r.hideProgress()
            }, a.search = function() {
                return r.search()
            }, a.on = function(e, t) {
                return r.addEvent(e, t)
            }, a.one = function(e, t) {
                return r.addEvent(e, t, !0)
            }, r.construct.apply(a, [t]), a
        }
    },
    mScrollTop = function(e, t) {
        var a = this,
            n = mUtil.get(e),
            o = mUtil.get("body");
        if (n) {
            var i = {
                    offset: 300,
                    speed: 600
                },
                l = {
                    construct: function(e) {
                        return mUtil.data(n).has("scrolltop") ? a = mUtil.data(n).get("scrolltop") : (l.init(e), l.build(), mUtil.data(n).set("scrolltop", a)), a
                    },
                    init: function(e) {
                        a.events = [], a.options = mUtil.deepExtend({}, i, e)
                    },
                    build: function() {
                        navigator.userAgent.match(/iPhone|iPad|iPod/i) ? (window.addEventListener("touchend", function() {
                            l.handle()
                        }), window.addEventListener("touchcancel", function() {
                            l.handle()
                        }), window.addEventListener("touchleave", function() {
                            l.handle()
                        })) : window.addEventListener("scroll", function() {
                            l.handle()
                        }), mUtil.addEvent(n, "click", l.scroll)
                    },
                    handle: function() {
                        window.pageYOffset > a.options.offset ? mUtil.addClass(o, "m-scroll-top--shown") : mUtil.removeClass(o, "m-scroll-top--shown")
                    },
                    scroll: function(e) {
                        e.preventDefault(), mUtil.scrollTop(0, a.options.speed)
                    },
                    eventTrigger: function(e, t) {
                        for (var n = 0; n < a.events.length; n++) {
                            var o = a.events[n];
                            o.name == e && (1 == o.one ? 0 == o.fired && (a.events[n].fired = !0, o.handler.call(this, a, t)) : o.handler.call(this, a, t))
                        }
                    },
                    addEvent: function(e, t, n) {
                        a.events.push({
                            name: e,
                            handler: t,
                            one: n,
                            fired: !1
                        })
                    }
                };
            return a.setDefaults = function(e) {
                i = e
            }, a.on = function(e, t) {
                return l.addEvent(e, t)
            }, a.one = function(e, t) {
                return l.addEvent(e, t, !0)
            }, l.construct.apply(a, [t]), !0, a
        }
    },
    mToggle = function(e, t) {
        var a = this,
            n = mUtil.get(e);
        mUtil.get("body");
        if (n) {
            var o = {
                    togglerState: "",
                    targetState: ""
                },
                l = {
                    construct: function(e) {
                        return mUtil.data(n).has("toggle") ? a = mUtil.data(n).get("toggle") : (l.init(e), l.build(), mUtil.data(n).set("toggle", a)), a
                    },
                    init: function(e) {
                        a.element = n, a.events = [], a.options = mUtil.deepExtend({}, o, e), a.target = mUtil.get(a.options.target), a.targetState = a.options.targetState, a.togglerState = a.options.togglerState, a.state = mUtil.hasClasses(a.target, a.targetState) ? "on" : "off"
                    },
                    build: function() {
                        mUtil.addEvent(n, "mouseup", l.toggle)
                    },
                    toggle: function() {
                        return l.eventTrigger("beforeToggle"), "off" == a.state ? l.toggleOn() : l.toggleOff(), a
                    },
                    toggleOn: function() {
                        return l.eventTrigger("beforeOn"), mUtil.addClass(a.target, a.targetState), a.togglerState && mUtil.addClass(n, a.togglerState), a.state = "on", l.eventTrigger("afterOn"), l.eventTrigger("toggle"), a
                    },
                    toggleOff: function() {
                        return l.eventTrigger("beforeOff"), mUtil.removeClass(a.target, a.targetState), a.togglerState && mUtil.removeClass(n, a.togglerState), a.state = "off", l.eventTrigger("afterOff"), l.eventTrigger("toggle"), a
                    },
                    eventTrigger: function(e) {
                        for (i = 0; i < a.events.length; i++) {
                            var t = a.events[i];
                            t.name == e && (1 == t.one ? 0 == t.fired && (a.events[i].fired = !0, t.handler.call(this, a)) : t.handler.call(this, a))
                        }
                    },
                    addEvent: function(e, t, n) {
                        return a.events.push({
                            name: e,
                            handler: t,
                            one: n,
                            fired: !1
                        }), a
                    }
                };
            return a.setDefaults = function(e) {
                o = e
            }, a.getState = function() {
                return a.state
            }, a.toggle = function() {
                return l.toggle()
            }, a.toggleOn = function() {
                return l.toggleOn()
            }, a.toggle = function() {
                return l.toggleOff()
            }, a.on = function(e, t) {
                return l.addEvent(e, t)
            }, a.one = function(e, t) {
                return l.addEvent(e, t, !0)
            }, l.construct.apply(a, [t]), a
        }
    },
    mWizard = function(e, t) {
        var a = this,
            n = mUtil.get(e);
        mUtil.get("body");
        if (n) {
            var o = {
                    startStep: 1,
                    manualStepForward: !1
                },
                l = {
                    construct: function(e) {
                        return mUtil.data(n).has("wizard") ? a = mUtil.data(n).get("wizard") : (l.init(e), l.build(), mUtil.data(n).set("wizard", a)), a
                    },
                    init: function(e) {
                        a.element = n, a.events = [], a.options = mUtil.deepExtend({}, o, e), a.steps = mUtil.findAll(n, ".m-wizard__step"), a.progress = mUtil.find(n, ".m-wizard__progress .progress-bar"), a.btnSubmit = mUtil.find(n, '[data-wizard-action="submit"]'), a.btnNext = mUtil.find(n, '[data-wizard-action="next"]'), a.btnPrev = mUtil.find(n, '[data-wizard-action="prev"]'), a.btnLast = mUtil.find(n, '[data-wizard-action="last"]'), a.btnFirst = mUtil.find(n, '[data-wizard-action="first"]'), a.events = [], a.currentStep = 1, a.stopped = !1, a.totalSteps = a.steps.length, a.options.startStep > 1 && l.goTo(a.options.startStep), l.updateUI()
                    },
                    build: function() {
                        mUtil.addEvent(a.btnNext, "click", function(e) {
                            e.preventDefault(), l.goNext()
                        }), mUtil.addEvent(a.btnPrev, "click", function(e) {
                            e.preventDefault(), l.goPrev()
                        }), mUtil.addEvent(a.btnFirst, "click", function(e) {
                            e.preventDefault(), l.goFirst()
                        }), mUtil.addEvent(a.btnLast, "click", function(e) {
                            e.preventDefault(), l.goLast()
                        }), mUtil.on(n, ".m-wizard__step a.m-wizard__step-number", "click", function() {
                            for (var e, t = this.closest(".m-wizard__step"), n = mUtil.parents(this, ".m-wizard__steps"), o = mUtil.findAll(n, ".m-wizard__step"), i = 0, r = o.length; i < r; i++)
                                if (t === o[i]) {
                                    e = i + 1;
                                    break
                                } e && (!1 === a.options.manualStepForward ? e < a.currentStep && l.goTo(e) : l.goTo(e))
                        })
                    },
                    goTo: function(e) {
                        if (!(e === a.currentStep || e > a.totalSteps || e < 0)) {
                            var t;
                            if (t = (e = e ? parseInt(e) : l.getNextStep()) > a.currentStep ? l.eventTrigger("beforeNext") : l.eventTrigger("beforePrev"), !0 !== a.stopped) return !1 !== t && (l.eventTrigger("beforeChange"), a.currentStep = e, l.updateUI(), l.eventTrigger("change")), e > a.startStep ? l.eventTrigger("afterNext") : l.eventTrigger("afterPrev"), a;
                            a.stopped = !1
                        }
                    },
                    setStepClass: function() {
                        l.isLastStep() ? mUtil.addClass(n, "m-wizard--step-last") : mUtil.removeClass(n, "m-wizard--step-last"), l.isFirstStep() ? mUtil.addClass(n, "m-wizard--step-first") : mUtil.removeClass(n, "m-wizard--step-first"), l.isBetweenStep() ? mUtil.addClass(n, "m-wizard--step-between") : mUtil.removeClass(n, "m-wizard--step-between")
                    },
                    updateUI: function(e) {
                        l.updateProgress(), l.handleTarget(), l.setStepClass();
                        for (var t = 0, n = a.steps.length; t < n; t++) mUtil.removeClass(a.steps[t], "m-wizard__step--current m-wizard__step--done");
                        for (t = 1; t < a.currentStep; t++) mUtil.addClass(a.steps[t - 1], "m-wizard__step--done");
                        mUtil.addClass(a.steps[a.currentStep - 1], "m-wizard__step--current")
                    },
                    stop: function() {
                        a.stopped = !0
                    },
                    start: function() {
                        a.stopped = !1
                    },
                    isLastStep: function() {
                        return a.currentStep === a.totalSteps
                    },
                    isFirstStep: function() {
                        return 1 === a.currentStep
                    },
                    isBetweenStep: function() {
                        return !1 === l.isLastStep() && !1 === l.isFirstStep()
                    },
                    goNext: function() {
                        return l.goTo(l.getNextStep())
                    },
                    goPrev: function() {
                        return l.goTo(l.getPrevStep())
                    },
                    goLast: function() {
                        return l.goTo(a.totalSteps)
                    },
                    goFirst: function() {
                        return l.goTo(1)
                    },
                    updateProgress: function() {
                        if (a.progress)
                            if (mUtil.hasClass(n, "m-wizard--1")) {
                                var e = (a.currentStep - 1) / a.totalSteps * 100,
                                    t = mUtil.find(n, ".m-wizard__step-number"),
                                    o = parseInt(mUtil.css(t, "width"));
                                mUtil.css(a.progress, "width", "calc(" + e + "% + " + o / 2 + "px)")
                            } else if (mUtil.hasClass(n, "m-wizard--2")) {
                            a.currentStep;
                            var i = (a.currentStep - 1) * (1 / (a.totalSteps - 1) * 100);
                            mUtil.isInResponsiveRange("minimal-desktop-and-below") ? mUtil.css(a.progress, "height", i + "%") : mUtil.css(a.progress, "width", i + "%")
                        } else {
                            e = a.currentStep / a.totalSteps * 100;
                            mUtil.css(a.progress, "width", e + "%")
                        }
                    },
                    handleTarget: function() {
                        var e = a.steps[a.currentStep - 1],
                            t = mUtil.get(mUtil.attr(e, "m-wizard-target")),
                            o = mUtil.find(n, ".m-wizard__form-step--current");
                        mUtil.removeClass(o, "m-wizard__form-step--current"), mUtil.addClass(t, "m-wizard__form-step--current")
                    },
                    getNextStep: function() {
                        return a.totalSteps >= a.currentStep + 1 ? a.currentStep + 1 : a.totalSteps
                    },
                    getPrevStep: function() {
                        return a.currentStep - 1 >= 1 ? a.currentStep - 1 : 1
                    },
                    eventTrigger: function(e) {
                        for (i = 0; i < a.events.length; i++) {
                            var t = a.events[i];
                            t.name == e && (1 == t.one ? 0 == t.fired && (a.events[i].fired = !0, t.handler.call(this, a)) : t.handler.call(this, a))
                        }
                    },
                    addEvent: function(e, t, n) {
                        return a.events.push({
                            name: e,
                            handler: t,
                            one: n,
                            fired: !1
                        }), a
                    }
                };
            return a.setDefaults = function(e) {
                o = e
            }, a.goNext = function() {
                return l.goNext()
            }, a.goPrev = function() {
                return l.goPrev()
            }, a.goLast = function() {
                return l.goLast()
            }, a.stop = function() {
                return l.stop()
            }, a.start = function() {
                return l.start()
            }, a.goFirst = function() {
                return l.goFirst()
            }, a.goTo = function(e) {
                return l.goTo(e)
            }, a.getStep = function() {
                return a.currentStep
            }, a.isLastStep = function() {
                return l.isLastStep()
            }, a.isFirstStep = function() {
                return l.isFirstStep()
            }, a.on = function(e, t) {
                return l.addEvent(e, t)
            }, a.one = function(e, t) {
                return l.addEvent(e, t, !0)
            }, l.construct.apply(a, [t]), a
        }
    };
! function(e) {
    e.fn.mDatatable = e.fn.mDatatable || {}, e.fn.mDatatable.checkbox = function(t, a) {
        var n = {
            selectedAllRows: !1,
            selectedRows: [],
            unselectedRows: [],
            init: function() {
                n.selectorEnabled() && (t.setDataSourceParam(a.vars.selectedAllRows, !1), t.stateRemove("checkbox"), a.vars.requestIds && t.setDataSourceParam(a.vars.requestIds, !0), e(t).on("m-datatable--on-reloaded", function() {
                    t.stateRemove("checkbox"), t.setDataSourceParam(a.vars.selectedAllRows, !1), n.selectedAllRows = !1, n.selectedRows = [], n.unselectedRows = []
                }), n.selectedAllRows = t.getDataSourceParam(a.vars.selectedAllRows), e(t).on("m-datatable--on-layout-updated", function(a, o) {
                    o.table == e(t.wrap).attr("id") && t.ready(function() {
                        n.initVars(), n.initEvent(), n.initSelect()
                    })
                }), e(t).on("m-datatable--on-check", function(a, o) {
                    o.forEach(function(e) {
                        n.selectedRows.push(e), n.unselectedRows = n.remove(n.unselectedRows, e)
                    });
                    var i = {};
                    i.selectedRows = e.unique(n.selectedRows), i.unselectedRows = e.unique(n.unselectedRows), t.stateKeep("checkbox", i)
                }), e(t).on("m-datatable--on-uncheck", function(a, o) {
                    o.forEach(function(e) {
                        n.unselectedRows.push(e), n.selectedRows = n.remove(n.selectedRows, e)
                    });
                    var i = {};
                    i.selectedRows = e.unique(n.selectedRows), i.unselectedRows = e.unique(n.unselectedRows), t.stateKeep("checkbox", i)
                }))
            },
            initEvent: function() {
                e(t.tableHead).find('.m-checkbox--all > [type="checkbox"]').click(function(o) {
                    if (n.selectedRows = n.unselectedRows = [], t.stateRemove("checkbox"), e(this).is(":checked") ? n.selectedAllRows = !0 : n.selectedAllRows = !1, !a.vars.requestIds) {
                        e(this).is(":checked") && (n.selectedRows = e.makeArray(e(t.tableBody).find('.m-checkbox--single > [type="checkbox"]').map(function(t, a) {
                            return e(a).val()
                        })));
                        var i = {};
                        i.selectedRows = e.unique(n.selectedRows), t.stateKeep("checkbox", i)
                    }
                    t.setDataSourceParam(a.vars.selectedAllRows, n.selectedAllRows), e(t).trigger("m-datatable--on-click-checkbox", [e(this)])
                }), e(t.tableBody).find('.m-checkbox--single > [type="checkbox"]').click(function(o) {
                    var i = e(this).val();
                    e(this).is(":checked") ? (n.selectedRows.push(i), n.unselectedRows = n.remove(n.unselectedRows, i)) : (n.unselectedRows.push(i), n.selectedRows = n.remove(n.selectedRows, i)), !a.vars.requestIds && n.selectedRows.length < 1 && e(t.tableHead).find('.m-checkbox--all > [type="checkbox"]').prop("checked", !1);
                    var l = {};
                    l.selectedRows = e.unique(n.selectedRows), l.unselectedRows = e.unique(n.unselectedRows), t.stateKeep("checkbox", l), e(t).trigger("m-datatable--on-click-checkbox", [e(this)])
                })
            },
            initSelect: function() {
                n.selectedAllRows && a.vars.requestIds ? (t.hasClass("m-datatable--error") || e(t.tableHead).find('.m-checkbox--all > [type="checkbox"]').prop("checked", !0), t.setActiveAll(!0), n.unselectedRows.forEach(function(e) {
                    t.setInactive(e)
                })) : (n.selectedRows.forEach(function(e) {
                    t.setActive(e)
                }), !t.hasClass("m-datatable--error") && e(t.tableBody).find('.m-checkbox--single > [type="checkbox"]').not(":checked").length < 1 && e(t.tableHead).find('.m-checkbox--all > [type="checkbox"]').prop("checked", !0))
            },
            selectorEnabled: function() {
                return e.grep(t.options.columns, function(e, t) {
                    return e.selector || !1
                })[0]
            },
            initVars: function() {
                var e = t.stateGet("checkbox");
                void 0 !== e && (n.selectedRows = e.selectedRows || [], n.unselectedRows = e.unselectedRows || [])
            },
            getSelectedId: function(e) {
                if (n.initVars(), n.selectedAllRows && a.vars.requestIds) {
                    void 0 === e && (e = a.vars.rowIds);
                    var o = t.getObject(e, t.lastResponse) || [];
                    return o.length > 0 && n.unselectedRows.forEach(function(e) {
                        o = n.remove(o, parseInt(e))
                    }), o
                }
                return n.selectedRows
            },
            remove: function(e, t) {
                return e.filter(function(e) {
                    return e !== t
                })
            }
        };
        return t.checkbox = function() {
            return n
        }, "object" == typeof a && (a = e.extend(!0, {}, e.fn.mDatatable.checkbox.default, a), n.init.apply(this, [a])), t
    }, e.fn.mDatatable.checkbox.default = {
        vars: {
            selectedAllRows: "selectedAllRows",
            requestIds: "requestIds",
            rowIds: "meta.rowIds"
        }
    }
}(jQuery);
var mLayout = function() {
    var e, t, a, n;
    return {
        init: function() {
            this.initHeader(), this.initAside()
        },
        initHeader: function() {
            var t, a, o;
            a = mUtil.get("m_header"), o = {
                offset: {},
                minimize: {}
            }, "hide" == mUtil.attr(a, "m-minimize") ? (o.minimize.mobile = {}, o.minimize.mobile.on = "m-header--hide", o.minimize.mobile.off = "m-header--show") : o.minimize.mobile = !1, "minimize" == mUtil.attr(a, "m-minimize") ? (o.minimize.desktop = {}, o.minimize.desktop.on = "m-header--minimize-on", o.minimize.desktop.off = "m-header--minimize-off") : "hide" == mUtil.attr(a, "m-minimize") ? (o.minimize.desktop = {}, o.minimize.desktop.on = "m-header--hide", o.minimize.desktop.off = "m-header--show") : o.minimize.desktop = !1, (t = mUtil.attr(a, "m-minimize-offset")) && (o.offset.desktop = t), (t = mUtil.attr(a, "m-minimize-mobile-offset")) && (o.offset.mobile = t), header = new mHeader("m_header", o), n = new mOffcanvas("m_header_menu", {
                overlay: !0,
                baseClass: "m-aside-header-menu-mobile",
                closeBy: "m_aside_header_menu_mobile_close_btn",
                toggleBy: {
                    target: "m_aside_header_menu_mobile_toggle",
                    state: "m-brand__toggler--active"
                }
            }), e = new mMenu("m_header_menu", {
                submenu: {
                    desktop: "dropdown",
                    tablet: "accordion",
                    mobile: "accordion"
                },
                accordion: {
                    slideSpeed: 200,
                    expandAll: !1
                }
            }), $("#m_aside_header_topbar_mobile_toggle").click(function() {
                $("body").toggleClass("m-topbar--on")
            }), 0 !== $("#m_quicksearch").length && (quicksearch = new mQuicksearch("m_quicksearch", {
                mode: mUtil.attr("m_quicksearch", "m-quicksearch-mode"),
                minLength: 1
            }), quicksearch.on("search", function(e) {
                e.showProgress(), $.ajax({
                    url: "search.html",
                    data: {
                        query: e.query
                    },
                    dataType: "html",
                    success: function(t) {
                        e.hideProgress(), e.showResult(t)
                    },
                    error: function(t) {
                        e.hideProgress(), e.showError("Connection error. Pleae try again later.")
                    }
                })
            })), new mScrollTop("m_scroll_top", {
                offset: 300,
                speed: 600
            })
        },
        initAside: function() {
            var n, o, i, l, r, s, d, c;
            i = mUtil.get("body"), l = mUtil.get("m_aside_left"), r = mUtil.hasClass(l, "m-aside-left--offcanvas-default") ? "m-aside-left--offcanvas-default" : "m-aside-left", a = new mOffcanvas("m_aside_left", {
                baseClass: r,
                overlay: !0,
                closeBy: "m_aside_left_close_btn",
                toggleBy: {
                    target: "m_aside_left_offcanvas_toggle",
                    state: "m-brand__toggler--active"
                }
            }), mUtil.hasClass(i, "m-aside-left--fixed") && (mUtil.addEvent(l, "mouseenter", function() {
                o && (clearTimeout(o), o = null), n = setTimeout(function() {
                    mUtil.hasClass(i, "m-aside-left--minimize") && mUtil.isInResponsiveRange("desktop") && (mUtil.removeClass(i, "m-aside-left--minimize"), mUtil.addClass(i, "m-aside-left--minimize-hover"), t.scrollerUpdate(), t.scrollerTop())
                }, 300)
            }), mUtil.addEvent(l, "mouseleave", function() {
                n && (clearTimeout(n), n = null), o = setTimeout(function() {
                    mUtil.hasClass(i, "m-aside-left--minimize-hover") && mUtil.isInResponsiveRange("desktop") && (mUtil.removeClass(i, "m-aside-left--minimize-hover"), mUtil.addClass(i, "m-aside-left--minimize"), t.scrollerUpdate(), t.scrollerTop())
                }, 500)
            })), 0 !== $("#m_aside_left_minimize_toggle").length && (asideLeftToggle = new mToggle("m_aside_left_minimize_toggle", {
                target: "body",
                targetState: "m-brand--minimize m-aside-left--minimize",
                togglerState: "m-brand__toggler--active"
            }), asideLeftToggle.on("toggle", function(a) {
                e.pauseDropdownHover(800), t.pauseDropdownHover(800), Cookies.set("sidebar_toggle_state", a.getState())
            })), d = mUtil.get("m_ver_menu"), c = "1" === mUtil.attr(d, "m-menu-dropdown") ? "dropdown" : "accordion", "1" === mUtil.attr(d, "m-menu-scrollable") && (s = {
                height: function() {
                    if (mUtil.isInResponsiveRange("desktop")) return mUtil.getViewPort().height - parseInt(mUtil.css("m_header", "height"))
                }
            }), t = new mMenu(d, {
                scroll: s,
                submenu: {
                    desktop: {
                        default: c,
                        state: {
                            body: "m-aside-left--minimize",
                            mode: "dropdown"
                        }
                    },
                    tablet: "accordion",
                    mobile: "accordion"
                },
                accordion: {
                    autoScroll: !1,
                    expandAll: !1
                }
            })
        },
        getAsideMenu: function() {
            return t
        },
        closeMobileAsideMenuOffcanvas: function() {
            mUtil.isMobileDevice() && a.hide()
        },
        closeMobileHorMenuOffcanvas: function() {
            mUtil.isMobileDevice() && n.hide()
        }
    }
}();
$(document).ready(function() {
    !1 === mUtil.isAngularVersion() && mLayout.init()
});
var mQuickSidebar = function() {
    var e = $("#m_quick_sidebar"),
        t = $("#m_quick_sidebar_tabs"),
        a = e.find(".m-quick-sidebar__content"),
        n = function() {
            var a, n, o, i;
            a = mUtil.find(mUtil.get("m_quick_sidebar_tabs_messenger"), ".m-messenger__messages"), n = $("#m_quick_sidebar_tabs_messenger .m-messenger__form"), mUtil.scrollerInit(a, {
                disableForMobile: !0,
                resetHeightOnDestroy: !1,
                handleWindowResize: !0,
                height: function() {
                    return e.outerHeight(!0) - t.outerHeight(!0) - n.outerHeight(!0) - 120
                }
            }), (o = mUtil.find(mUtil.get("m_quick_sidebar_tabs_settings"), ".m-list-settings")) && mUtil.scrollerInit(o, {
                disableForMobile: !0,
                resetHeightOnDestroy: !1,
                handleWindowResize: !0,
                height: function() {
                    return mUtil.getViewPort().height - t.outerHeight(!0) - 60
                }
            }), (i = mUtil.find(mUtil.get("m_quick_sidebar_tabs_logs"), ".m-list-timeline")) && mUtil.scrollerInit(i, {
                disableForMobile: !0,
                resetHeightOnDestroy: !1,
                handleWindowResize: !0,
                height: function() {
                    return mUtil.getViewPort().height - t.outerHeight(!0) - 60
                }
            })
        };
    return {
        init: function() {
            0 !== e.length && new mOffcanvas("m_quick_sidebar", {
                overlay: !0,
                baseClass: "m-quick-sidebar",
                closeBy: "m_quick_sidebar_close",
                toggleBy: "m_quick_sidebar_toggle"
            }).one("afterShow", function() {
                mApp.block(e), setTimeout(function() {
                    mApp.unblock(e), a.removeClass("m--hide"), n()
                }, 1e3)
            })
        }
    }
}();
$(document).ready(function() {
    mQuickSidebar.init()
});