! function () {
    window.ICE = window.ICE || {}, window.ICE.__readyCallabck__ = [], window.ICE.__asyncLoaded__ = !1, window.ICE.ready = function (e) {
        if ("function" != typeof e) throw new Error("callback of ICE.ready is not a function");
        window.ICE.__asyncLoaded__ ? e() : window.ICE.__readyCallabck__.push(e)
    };
    var e = window.location.protocol;
    /^http/.test(e) || (e = "http:"), window.ICE.protocol = e || "";
    var t = window.location.search.replace(/^\?/, ""),
        n = t.split("&"),
        r = n.reduce(function (e, t) {
            if (t) {
                var n = t.split("=");
                e[n[0]] = n[1]
            }
            return e
        }, {});
    if (r.debug) {
        var o = "127.0.0.1",
            i = r.debugPort || "3333",
            a = r.debugPath || "/build/index.js";
        window.ICE.debug ? (window.ICE.debug.origin = "127.0.0.1", window.ICE.debug.port = i, window.ICE.debug.path = a, window.ICE.debug.base = r.debugBase || null) : window.ICE.debug = {
            origin: "127.0.0.1",
            port: i,
            path: a
        }
    }
    var s = ["https://g.alicdn.com/code/icon/babel-polyfill/6.16.0/polyfill.min.js"],
        u = [],
        l = document.getElementById("ice-script") || document.currentScript,
        c = "//g.alicdn.com";
    if ("" === c) {
        var f = "";
        if (l && l.src) {
            var d = document.createElement("a");
            d.href = l.src, f = d.origin
        }
        c = f || window.location.origin
    }
    l && /g-assets.daily.taobao.net/.test(l.src) && (c = "//g-assets.daily.taobao.net"), window.ICE.publicPath = c + "/tmall-wireless/hack-game/0.0.6/";
    var p = document.querySelector("link[data-ice-style-loaded]");
    if (void 0 !== l && null !== l) {
        var h = l.src,
            y = l.getAttribute("src") || "",
            m = h.replace(/\.js$/, ".css").replace(/(\.js)(?=[?#])/i, ".css"),
            v = document.querySelector('link[href$="' + y.replace(/\.js$/, ".css").replace(/(\.js)(?=[?#])/i, ".css") + '"]');
        p || v || u.push(m)
    }
    window.location.href.match(/ice[_|-]debug/i) ? s.push("https://g.alicdn.com/code/npm/??react/15.6.2/dist/react-with-addons.js,react-dom/15.6.2/dist/react-dom.js") : s.push("https://g.alicdn.com/code/npm/??react/15.6.2/dist/react-with-addons.min.js,react-dom/15.6.2/dist/react-dom.min.js");
    var A = function () {
        function e() {
            r && (clearTimeout(r), r = null)
        }

        function t(e, t) {
            function n() {
                clearTimeout(i), t && t(null, r)
            }
            var r = document.createElement("link");
            r.rel = "stylesheet", r.type = "text/css", r.href = e, r.onload = n, r.setAttribute("data-ice-style-loaded", "true");
            var i = setTimeout(function () {
                console.warn("\u52a0\u8f7d css \u8d85\u65f6!"), t && t(new Error("timeout for 5s"))
            }, 5e3);
            o.appendChild(r)
        }

        function n(t, n) {
            function i(r) {
                s.onerror = null, s = null, e(), n("JS Can not load: " + t)
            }

            function a() {
                var t = s.readyState;
                t && "loaded" !== t && "complete" !== t || (s.onreadystatechange = s.onload = null, s = void 0, e(), n(null))
            }
            var s = document.createElement("script");
            s.type = "text/javascript", s.async = !0, e(), r = setTimeout(function () {
                e(), n("\u8bf7\u6c42\u8d85\u65f6")
            }, 6e4), "onload" in s ? (s.onload = a, s.onerror = i) : s.onreadystatechange = a, s.onreadystatechange = s.onload = a, s.src = t, o.insertBefore(s, o.firstChild)
        }
        var r = null,
            o = document.head || document.querySelector("head");
        return function (e, r, i) {
            if (!o) throw new Error("\u9875\u9762\u4e2d\u5fc5\u987b\u5b58\u5728 head \u5143\u7d20");
            "function" == typeof r && (i = r, r = []);
            var a = r.map(function (e) {
                    return {
                        type: "css",
                        url: e
                    }
                }).concat(e.map(function (e) {
                    return {
                        type: "js",
                        url: e
                    }
                })),
                s = a.length;
            ! function e(r) {
                if (0 === r) return i();
                var o = a.shift(),
                    s = "css" === o.type ? t : n;
                if ("js" === o.type) {
                    if (window.React && window.React.version && -1 !== o.url.indexOf("react-with-addons")) return "15.6.2" !== window.React.version && console.warn("\u5f53\u524d\u9875\u9762\u5df2\u52a0\u8f7d React \u7248\u672c %s\uff0c\u53ef\u80fd\u4f1a\u5bfc\u81f4\u529f\u80fd\u5931\u6548\uff01\u63a8\u8350\u4f7f\u7528 15.6.2 \u8be6\u60c5\u8bf7\u8054\u7cfb ICE \u56e2\u961f\u3002", window.React.version), e(a.length);
                    if (window._babelPolyfill && -1 !== o.url.indexOf("babel-polyfill")) return e(a.length)
                }
                s(o.url, function (t) {
                    if (t) return void console.error(t);
                    e(a.length)
                })
            }(s)
        }
    }();
    if (null === l) console.error("!\u60a8\u6b63\u5728\u4f7f\u7528 ICE \u667a\u80fd\u8c03\u8bd5\u670d\u52a1, \u4f46\u662f\u9875\u9762\u4e0a\u7684 script \u8282\u70b9\u627e\u4e0d\u5230 ice-script \u7684 id, \u8bf7\u68c0\u67e5!");
    else if (window.ICE.debug && window.ICE.debug.origin) {
        var g = (l.src.replace(/^https?:\/\//, "").match(/(\/.*)/) || ["", "/index.js"])[1];
        window.ICE.debug.customJS = window.ICE.protocol + "//" + window.ICE.debug.origin + ":" + window.ICE.debug.port + (window.ICE.debug.path || g), u = [window.ICE.debug.customJS.replace(/\.js$/i, ".css").replace(/(\.js)(?=[?#])/i, ".css")];
        var m = (l.getAttribute("src") || "").replace(/\.js$/i, ".css").replace(/(\.js)(?=[?#])/i, ".css"),
            b = document.querySelector('link[href$="' + m + '"]');
        b && b.parentElement.removeChild(b)
    }
    if (null !== l && window.ICE.debug && window.ICE.debug.customJS && !window.ICE.debug.skip) return window.ICE.debug.skip = !0, void A([window.ICE.debug.customJS], function () {
        console.warn("\u60a8\u6b63\u5728\u4f7f\u7528 ICE \u667a\u80fd\u8c03\u8bd5\u670d\u52a1, \u76ee\u524d\u52a0\u8f7d\u7684 JS \u548c CSS \u8def\u5f84\u4e3a:"), console.warn(window.ICE.debug.customJS + "\n" + u[0])
    });
    A(s, u, function () {
                ! function (e) {
                    function t(r) {
                        if (n[r]) return n[r].exports;
                        var o = n[r] = {
                            exports: {},
                            id: r,
                            loaded: !1
                        };
                        return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
                    }
                    var n = {};
                    t.m = e, t.c = n, t.p = "//g.alicdn.com/tmall-wireless/hack-game/0.0.6/", t(0)
                }(function (e) {
                        for (var t in e)
                            if (Object.prototype.hasOwnProperty.call(e, t)) switch (typeof e[t]) {
                                case "function":
                                    break;
                                case "object":
                                    e[t] = function (t) {
                                        var n = t.slice(1),
                                            r = e[t[0]];
                                        return function (e, t, o) {
                                            r.apply(this, [e, t, o].concat(n))
                                        }
                                    }(e[t]);
                                    break;
                                default:
                                    e[t] = e[e[t]]
                            }
                        return e
                    }([function (e, t, n) {
                                "use strict";

                                function r(e) {
                                    return e && e.__esModule ? e : {
                                        default: e
                                    }
                                }
                                var o = n(6),
                                    i = r(o),
                                    a = n(433),
                                    s = r(a);
                                if (n(416), n(427), window.ICE && window.ICE.publicPath && (n.p = window.ICE.publicPath), window.ICE && window.ICE.debug) {
                                    var u = window.ICE.debug;
                                    n.p = u.base || "//" + u.origin + ":" + u.port + "/build/"
                                }
                                var l = document.getElementById("ice_container");
                                if (!l) throw new Error('\u5f53\u524d\u9875\u9762\u4e0d\u5b58\u5728 <div id="ice_container"></div> \u8282\u70b9.');
                                i.default.render(s.default, l)
                            }, function (e, t) {
                                e.exports = window.React
                            }, function (e, t, n) {
                                var r, o, i;
                                e.exports = n(467)()
                            }, function (e, t, n) {
                                var r, o;
                                /*!