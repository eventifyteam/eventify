!function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery")) : "function" == typeof define && define.amd ? define(["exports", "jquery"], e) : (t = t || self, e(t.bootstrap = {}, t.jQuery))
}(this, function (t, e) {
  "use strict";

  function n(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
    }
  }

  function i(t, e, i) {
    return e && n(t.prototype, e), i && n(t, i), t
  }

  function o(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = n, t
  }

  function r(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = null != arguments[e] ? arguments[e] : {}, i = Object.keys(n);
      "function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter(function (t) {
        return Object.getOwnPropertyDescriptor(n, t).enumerable
      }))), i.forEach(function (e) {
        o(t, e, n[e])
      })
    }
    return t
  }

  function s(t, e) {
    t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
  }

  function a(t) {
    return {}.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase()
  }

  function l(t) {
    var e = {};
    return t && "[object Function]" === e.toString.call(t)
  }

  function c(t, e) {
    if (1 !== t.nodeType) return [];
    var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
    return e ? n[e] : n
  }

  function u(t) {
    return "HTML" === t.nodeName ? t : t.parentNode || t.host
  }

  function h(t) {
    if (!t) return document.body;
    switch (t.nodeName) {
      case"HTML":
      case"BODY":
        return t.ownerDocument.body;
      case"#document":
        return t.body
    }
    var e = c(t), n = e.overflow, i = e.overflowX, o = e.overflowY;
    return /(auto|scroll|overlay)/.test(n + o + i) ? t : h(u(t))
  }

  function f(t) {
    return 11 === t ? jt : 10 === t ? Bt : jt || Bt
  }

  function d(t) {
    if (!t) return document.documentElement;
    for (var e = f(10) ? document.body : null, n = t.offsetParent || null; n === e && t.nextElementSibling;) n = (t = t.nextElementSibling).offsetParent;
    var i = n && n.nodeName;
    return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === c(n, "position") ? d(n) : n : t ? t.ownerDocument.documentElement : document.documentElement
  }

  function p(t) {
    var e = t.nodeName;
    return "BODY" !== e && ("HTML" === e || d(t.firstElementChild) === t)
  }

  function m(t) {
    return null !== t.parentNode ? m(t.parentNode) : t
  }

  function g(t, e) {
    if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
    var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING, i = n ? t : e, o = n ? e : t,
      r = document.createRange();
    r.setStart(i, 0), r.setEnd(o, 0);
    var s = r.commonAncestorContainer;
    if (t !== s && e !== s || i.contains(o)) return p(s) ? s : d(s);
    var a = m(t);
    return a.host ? g(a.host, e) : g(t, m(e).host)
  }

  function _(t) {
    var e = "top" === (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
      n = t.nodeName;
    if ("BODY" === n || "HTML" === n) {
      var i = t.ownerDocument.documentElement;
      return (t.ownerDocument.scrollingElement || i)[e]
    }
    return t[e]
  }

  function v(t, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], i = _(e, "top"), o = _(e, "left"),
      r = n ? -1 : 1;
    return t.top += i * r, t.bottom += i * r, t.left += o * r, t.right += o * r, t
  }

  function E(t, e) {
    var n = "x" === e ? "Left" : "Top", i = "Left" === n ? "Right" : "Bottom";
    return parseFloat(t["border" + n + "Width"], 10) + parseFloat(t["border" + i + "Width"], 10)
  }

  function T(t, e, n, i) {
    return Math.max(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], f(10) ? parseInt(n["offset" + t]) + parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")]) : 0)
  }

  function b(t) {
    var e = t.body, n = t.documentElement, i = f(10) && getComputedStyle(n);
    return {height: T("Height", e, n, i), width: T("Width", e, n, i)}
  }

  function y(t) {
    return Qt({}, t, {right: t.left + t.width, bottom: t.top + t.height})
  }

  function S(t) {
    var e = {};
    try {
      if (f(10)) {
        e = t.getBoundingClientRect();
        var n = _(t, "top"), i = _(t, "left");
        e.top += n, e.left += i, e.bottom += n, e.right += i
      } else e = t.getBoundingClientRect()
    } catch (t) {
    }
    var o = {left: e.left, top: e.top, width: e.right - e.left, height: e.bottom - e.top},
      r = "HTML" === t.nodeName ? b(t.ownerDocument) : {}, s = r.width || t.clientWidth || o.right - o.left,
      a = r.height || t.clientHeight || o.bottom - o.top, l = t.offsetWidth - s, u = t.offsetHeight - a;
    if (l || u) {
      var h = c(t);
      l -= E(h, "x"), u -= E(h, "y"), o.width -= l, o.height -= u
    }
    return y(o)
  }

  function I(t, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], i = f(10), o = "HTML" === e.nodeName,
      r = S(t), s = S(e), a = h(t), l = c(e), u = parseFloat(l.borderTopWidth, 10),
      d = parseFloat(l.borderLeftWidth, 10);
    n && o && (s.top = Math.max(s.top, 0), s.left = Math.max(s.left, 0));
    var p = y({top: r.top - s.top - u, left: r.left - s.left - d, width: r.width, height: r.height});
    if (p.marginTop = 0, p.marginLeft = 0, !i && o) {
      var m = parseFloat(l.marginTop, 10), g = parseFloat(l.marginLeft, 10);
      p.top -= u - m, p.bottom -= u - m, p.left -= d - g, p.right -= d - g, p.marginTop = m, p.marginLeft = g
    }
    return (i && !n ? e.contains(a) : e === a && "BODY" !== a.nodeName) && (p = v(p, e)), p
  }

  function O(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = t.ownerDocument.documentElement,
      i = I(t, n), o = Math.max(n.clientWidth, window.innerWidth || 0),
      r = Math.max(n.clientHeight, window.innerHeight || 0), s = e ? 0 : _(n), a = e ? 0 : _(n, "left");
    return y({top: s - i.top + i.marginTop, left: a - i.left + i.marginLeft, width: o, height: r})
  }

  function C(t) {
    var e = t.nodeName;
    if ("BODY" === e || "HTML" === e) return !1;
    if ("fixed" === c(t, "position")) return !0;
    var n = u(t);
    return !!n && C(n)
  }

  function A(t) {
    if (!t || !t.parentElement || f()) return document.documentElement;
    for (var e = t.parentElement; e && "none" === c(e, "transform");) e = e.parentElement;
    return e || document.documentElement
  }

  function D(t, e, n, i) {
    var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], r = {top: 0, left: 0},
      s = o ? A(t) : g(t, e);
    if ("viewport" === i) r = O(s, o); else {
      var a = void 0;
      "scrollParent" === i ? "BODY" === (a = h(u(e))).nodeName && (a = t.ownerDocument.documentElement) : a = "window" === i ? t.ownerDocument.documentElement : i;
      var l = I(a, s, o);
      if ("HTML" !== a.nodeName || C(s)) r = l; else {
        var c = b(t.ownerDocument), f = c.height, d = c.width;
        r.top += l.top - l.marginTop, r.bottom = f + l.top, r.left += l.left - l.marginLeft, r.right = d + l.left
      }
    }
    var p = "number" == typeof (n = n || 0);
    return r.left += p ? n : n.left || 0, r.top += p ? n : n.top || 0, r.right -= p ? n : n.right || 0, r.bottom -= p ? n : n.bottom || 0, r
  }

  function w(t) {
    return t.width * t.height
  }

  function N(t, e, n, i, o) {
    var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === t.indexOf("auto")) return t;
    var s = D(n, i, r, o), a = {
      top: {width: s.width, height: e.top - s.top},
      right: {width: s.right - e.right, height: s.height},
      bottom: {width: s.width, height: s.bottom - e.bottom},
      left: {width: e.left - s.left, height: s.height}
    }, l = Object.keys(a).map(function (t) {
      return Qt({key: t}, a[t], {area: w(a[t])})
    }).sort(function (t, e) {
      return e.area - t.area
    }), c = l.filter(function (t) {
      var e = t.width, i = t.height;
      return e >= n.clientWidth && i >= n.clientHeight
    }), u = c.length > 0 ? c[0].key : l[0].key, h = t.split("-")[1];
    return u + (h ? "-" + h : "")
  }

  function L(t, e, n) {
    var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
    return I(n, i ? A(e) : g(e, n), i)
  }

  function P(t) {
    var e = t.ownerDocument.defaultView.getComputedStyle(t),
      n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
      i = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
    return {width: t.offsetWidth + i, height: t.offsetHeight + n}
  }

  function H(t) {
    var e = {left: "right", right: "left", bottom: "top", top: "bottom"};
    return t.replace(/left|right|bottom|top/g, function (t) {
      return e[t]
    })
  }

  function R(t, e, n) {
    n = n.split("-")[0];
    var i = P(t), o = {width: i.width, height: i.height}, r = -1 !== ["right", "left"].indexOf(n),
      s = r ? "top" : "left", a = r ? "left" : "top", l = r ? "height" : "width", c = r ? "width" : "height";
    return o[s] = e[s] + e[l] / 2 - i[l] / 2, o[a] = n === a ? e[a] - i[c] : e[H(a)], o
  }

  function W(t, e) {
    return Array.prototype.find ? t.find(e) : t.filter(e)[0]
  }

  function k(t, e, n) {
    if (Array.prototype.findIndex) return t.findIndex(function (t) {
      return t[e] === n
    });
    var i = W(t, function (t) {
      return t[e] === n
    });
    return t.indexOf(i)
  }

  function F(t, e, n) {
    return (void 0 === n ? t : t.slice(0, k(t, "name", n))).forEach(function (t) {
      t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
      var n = t.function || t.fn;
      t.enabled && l(n) && (e.offsets.popper = y(e.offsets.popper), e.offsets.reference = y(e.offsets.reference), e = n(e, t))
    }), e
  }

  function M() {
    if (!this.state.isDestroyed) {
      var t = {instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {}};
      t.offsets.reference = L(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = N(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = R(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", t = F(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t))
    }
  }

  function x(t, e) {
    return t.some(function (t) {
      var n = t.name;
      return t.enabled && n === e
    })
  }

  function U(t) {
    for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < e.length; i++) {
      var o = e[i], r = o ? "" + o + n : t;
      if (void 0 !== document.body.style[r]) return r
    }
    return null
  }

  function V() {
    return this.state.isDestroyed = !0, x(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[U("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
  }

  function j(t) {
    var e = t.ownerDocument;
    return e ? e.defaultView : window
  }

  function B(t, e, n, i) {
    var o = "BODY" === t.nodeName, r = o ? t.ownerDocument.defaultView : t;
    r.addEventListener(e, n, {passive: !0}), o || B(h(r.parentNode), e, n, i), i.push(r)
  }

  function G(t, e, n, i) {
    n.updateBound = i, j(t).addEventListener("resize", n.updateBound, {passive: !0});
    var o = h(t);
    return B(o, "scroll", n.updateBound, n.scrollParents), n.scrollElement = o, n.eventsEnabled = !0, n
  }

  function K() {
    this.state.eventsEnabled || (this.state = G(this.reference, this.options, this.state, this.scheduleUpdate))
  }

  function q(t, e) {
    return j(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function (t) {
      t.removeEventListener("scroll", e.updateBound)
    }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e
  }

  function Q() {
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = q(this.reference, this.state))
  }

  function Y(t) {
    return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
  }

  function X(t, e) {
    Object.keys(e).forEach(function (n) {
      var i = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && Y(e[n]) && (i = "px"), t.style[n] = e[n] + i
    })
  }

  function z(t, e) {
    Object.keys(e).forEach(function (n) {
      !1 !== e[n] ? t.setAttribute(n, e[n]) : t.removeAttribute(n)
    })
  }

  function $(t, e) {
    var n = t.offsets, i = n.popper, o = n.reference, r = Math.round, s = Math.floor, a = function (t) {
        return t
      }, l = r(o.width), c = r(i.width), u = -1 !== ["left", "right"].indexOf(t.placement),
      h = -1 !== t.placement.indexOf("-"), f = l % 2 == c % 2, d = l % 2 == 1 && c % 2 == 1,
      p = e ? u || h || f ? r : s : a, m = e ? r : a;
    return {left: p(d && !h && e ? i.left - 1 : i.left), top: m(i.top), bottom: m(i.bottom), right: p(i.right)}
  }

  function J(t, e, n) {
    var i = W(t, function (t) {
      return t.name === e
    }), o = !!i && t.some(function (t) {
      return t.name === n && t.enabled && t.order < i.order
    });
    if (!o) {
      var r = "`" + e + "`", s = "`" + n + "`";
      console.warn(s + " modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!")
    }
    return o
  }

  function Z(t) {
    return "end" === t ? "start" : "start" === t ? "end" : t
  }

  function tt(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = zt.indexOf(t),
      i = zt.slice(n + 1).concat(zt.slice(0, n));
    return e ? i.reverse() : i
  }

  function et(t, e, n, i) {
    var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), r = +o[1], s = o[2];
    if (!r) return t;
    if (0 === s.indexOf("%")) {
      var a = void 0;
      switch (s) {
        case"%p":
          a = n;
          break;
        case"%":
        case"%r":
        default:
          a = i
      }
      return y(a)[e] / 100 * r
    }
    return "vh" === s || "vw" === s ? ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * r : r
  }

  function nt(t, e, n, i) {
    var o = [0, 0], r = -1 !== ["right", "left"].indexOf(i), s = t.split(/(\+|\-)/).map(function (t) {
      return t.trim()
    }), a = s.indexOf(W(s, function (t) {
      return -1 !== t.search(/,|\s/)
    }));
    s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
    var l = /\s*,\s*|\s+/,
      c = -1 !== a ? [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))] : [s];
    return (c = c.map(function (t, i) {
      var o = (1 === i ? !r : r) ? "height" : "width", s = !1;
      return t.reduce(function (t, e) {
        return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, s = !0, t) : s ? (t[t.length - 1] += e, s = !1, t) : t.concat(e)
      }, []).map(function (t) {
        return et(t, o, e, n)
      })
    })).forEach(function (t, e) {
      t.forEach(function (n, i) {
        Y(n) && (o[e] += n * ("-" === t[i - 1] ? -1 : 1))
      })
    }), o
  }

  function it(t, e) {
    var n = t.nodeName.toLowerCase();
    if (-1 !== e.indexOf(n)) return -1 === _e.indexOf(n) || Boolean(t.nodeValue.match(Ee) || t.nodeValue.match(Te));
    for (var i = e.filter(function (t) {
      return t instanceof RegExp
    }), o = 0, r = i.length; o < r; o++) if (n.match(i[o])) return !0;
    return !1
  }

  function ot(t, e, n) {
    if (0 === t.length) return t;
    if (n && "function" == typeof n) return n(t);
    for (var i = (new window.DOMParser).parseFromString(t, "text/html"), o = Object.keys(e), r = [].slice.call(i.body.querySelectorAll("*")), s = 0, a = r.length; s < a; s++) !function (t, n) {
      var i = r[t], s = i.nodeName.toLowerCase();
      if (-1 === o.indexOf(i.nodeName.toLowerCase())) return i.parentNode.removeChild(i), "continue";
      var a = [].slice.call(i.attributes), l = [].concat(e["*"] || [], e[s] || []);
      a.forEach(function (t) {
        it(t, l) || i.removeAttribute(t.nodeName)
      })
    }(s);
    return i.body.innerHTML
  }

  var rt = "transitionend", st = {
    TRANSITION_END: "bsTransitionEnd", getUID: function (t) {
      do {
        t += ~~(1e6 * Math.random())
      } while (document.getElementById(t));
      return t
    }, getSelectorFromElement: function (t) {
      var e = t.getAttribute("data-target");
      if (!e || "#" === e) {
        var n = t.getAttribute("href");
        e = n && "#" !== n ? n.trim() : ""
      }
      try {
        return document.querySelector(e) ? e : null
      } catch (t) {
        return null
      }
    }, getTransitionDurationFromElement: function (t) {
      if (!t) return 0;
      var n = e(t).css("transition-duration"), i = e(t).css("transition-delay"), o = parseFloat(n), r = parseFloat(i);
      return o || r ? (n = n.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(n) + parseFloat(i))) : 0
    }, reflow: function (t) {
      return t.offsetHeight
    }, triggerTransitionEnd: function (t) {
      e(t).trigger(rt)
    }, supportsTransitionEnd: function () {
      return Boolean(rt)
    }, isElement: function (t) {
      return (t[0] || t).nodeType
    }, typeCheckConfig: function (t, e, n) {
      for (var i in n) if (Object.prototype.hasOwnProperty.call(n, i)) {
        var o = n[i], r = e[i], s = r && st.isElement(r) ? "element" : a(r);
        if (!new RegExp(o).test(s)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + o + '".')
      }
    }, findShadowRoot: function (t) {
      if (!document.documentElement.attachShadow) return null;
      if ("function" == typeof t.getRootNode) {
        var e = t.getRootNode();
        return e instanceof ShadowRoot ? e : null
      }
      return t instanceof ShadowRoot ? t : t.parentNode ? st.findShadowRoot(t.parentNode) : null
    }
  };
  (e = e && e.hasOwnProperty("default") ? e.default : e).fn.emulateTransitionEnd = function (t) {
    var n = this, i = !1;
    return e(this).one(st.TRANSITION_END, function () {
      i = !0
    }), setTimeout(function () {
      i || st.triggerTransitionEnd(n)
    }, t), this
  }, e.event.special[st.TRANSITION_END] = {
    bindType: rt, delegateType: rt, handle: function (t) {
      if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
    }
  };
  var at = "alert", lt = e.fn[at], ct = {DISMISS: '[data-dismiss="alert"]'},
    ut = {CLOSE: "close.bs.alert", CLOSED: "closed.bs.alert", CLICK_DATA_API: "click.bs.alert.data-api"},
    ht = {ALERT: "alert", FADE: "fade", SHOW: "show"}, ft = function () {
      function t(t) {
        this._element = t
      }

      var n = t.prototype;
      return n.close = function (t) {
        var e = this._element;
        t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
      }, n.dispose = function () {
        e.removeData(this._element, "bs.alert"), this._element = null
      }, n._getRootElement = function (t) {
        var n = st.getSelectorFromElement(t), i = !1;
        return n && (i = document.querySelector(n)), i || (i = e(t).closest("." + ht.ALERT)[0]), i
      }, n._triggerCloseEvent = function (t) {
        var n = e.Event(ut.CLOSE);
        return e(t).trigger(n), n
      }, n._removeElement = function (t) {
        var n = this;
        if (e(t).removeClass(ht.SHOW), e(t).hasClass(ht.FADE)) {
          var i = st.getTransitionDurationFromElement(t);
          e(t).one(st.TRANSITION_END, function (e) {
            return n._destroyElement(t, e)
          }).emulateTransitionEnd(i)
        } else this._destroyElement(t)
      }, n._destroyElement = function (t) {
        e(t).detach().trigger(ut.CLOSED).remove()
      }, t._jQueryInterface = function (n) {
        return this.each(function () {
          var i = e(this), o = i.data("bs.alert");
          o || (o = new t(this), i.data("bs.alert", o)), "close" === n && o[n](this)
        })
      }, t._handleDismiss = function (t) {
        return function (e) {
          e && e.preventDefault(), t.close(this)
        }
      }, i(t, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }]), t
    }();
  e(document).on(ut.CLICK_DATA_API, ct.DISMISS, ft._handleDismiss(new ft)), e.fn[at] = ft._jQueryInterface, e.fn[at].Constructor = ft, e.fn[at].noConflict = function () {
    return e.fn[at] = lt, ft._jQueryInterface
  };
  var dt = e.fn.button, pt = {ACTIVE: "active", BUTTON: "btn", FOCUS: "focus"}, mt = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: ".active",
    BUTTON: ".btn"
  }, gt = {
    CLICK_DATA_API: "click.bs.button.data-api",
    FOCUS_BLUR_DATA_API: "focus.bs.button.data-api blur.bs.button.data-api"
  }, _t = function () {
    function t(t) {
      this._element = t
    }

    var n = t.prototype;
    return n.toggle = function () {
      var t = !0, n = !0, i = e(this._element).closest(mt.DATA_TOGGLE)[0];
      if (i) {
        var o = this._element.querySelector(mt.INPUT);
        if (o) {
          if ("radio" === o.type) if (o.checked && this._element.classList.contains(pt.ACTIVE)) t = !1; else {
            var r = i.querySelector(mt.ACTIVE);
            r && e(r).removeClass(pt.ACTIVE)
          }
          if (t) {
            if (o.hasAttribute("disabled") || i.hasAttribute("disabled") || o.classList.contains("disabled") || i.classList.contains("disabled")) return;
            o.checked = !this._element.classList.contains(pt.ACTIVE), e(o).trigger("change")
          }
          o.focus(), n = !1
        }
      }
      n && this._element.setAttribute("aria-pressed", !this._element.classList.contains(pt.ACTIVE)), t && e(this._element).toggleClass(pt.ACTIVE)
    }, n.dispose = function () {
      e.removeData(this._element, "bs.button"), this._element = null
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this).data("bs.button");
        i || (i = new t(this), e(this).data("bs.button", i)), "toggle" === n && i[n]()
      })
    }, i(t, null, [{
      key: "VERSION", get: function () {
        return "4.3.1"
      }
    }]), t
  }();
  e(document).on(gt.CLICK_DATA_API, mt.DATA_TOGGLE_CARROT, function (t) {
    t.preventDefault();
    var n = t.target;
    e(n).hasClass(pt.BUTTON) || (n = e(n).closest(mt.BUTTON)), _t._jQueryInterface.call(e(n), "toggle")
  }).on(gt.FOCUS_BLUR_DATA_API, mt.DATA_TOGGLE_CARROT, function (t) {
    var n = e(t.target).closest(mt.BUTTON)[0];
    e(n).toggleClass(pt.FOCUS, /^focus(in)?$/.test(t.type))
  }), e.fn.button = _t._jQueryInterface, e.fn.button.Constructor = _t, e.fn.button.noConflict = function () {
    return e.fn.button = dt, _t._jQueryInterface
  };
  var vt = "carousel", Et = e.fn[vt],
    Tt = {interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0}, bt = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean",
      touch: "boolean"
    }, yt = {NEXT: "next", PREV: "prev", LEFT: "left", RIGHT: "right"}, St = {
      SLIDE: "slide.bs.carousel",
      SLID: "slid.bs.carousel",
      KEYDOWN: "keydown.bs.carousel",
      MOUSEENTER: "mouseenter.bs.carousel",
      MOUSELEAVE: "mouseleave.bs.carousel",
      TOUCHSTART: "touchstart.bs.carousel",
      TOUCHMOVE: "touchmove.bs.carousel",
      TOUCHEND: "touchend.bs.carousel",
      POINTERDOWN: "pointerdown.bs.carousel",
      POINTERUP: "pointerup.bs.carousel",
      DRAG_START: "dragstart.bs.carousel",
      LOAD_DATA_API: "load.bs.carousel.data-api",
      CLICK_DATA_API: "click.bs.carousel.data-api"
    }, It = {
      CAROUSEL: "carousel",
      ACTIVE: "active",
      SLIDE: "slide",
      RIGHT: "carousel-item-right",
      LEFT: "carousel-item-left",
      NEXT: "carousel-item-next",
      PREV: "carousel-item-prev",
      ITEM: "carousel-item",
      POINTER_EVENT: "pointer-event"
    }, Ot = {
      ACTIVE: ".active",
      ACTIVE_ITEM: ".active.carousel-item",
      ITEM: ".carousel-item",
      ITEM_IMG: ".carousel-item img",
      NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
      INDICATORS: ".carousel-indicators",
      DATA_SLIDE: "[data-slide], [data-slide-to]",
      DATA_RIDE: '[data-ride="carousel"]'
    }, Ct = {TOUCH: "touch", PEN: "pen"}, At = function () {
      function t(t, e) {
        this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(Ot.INDICATORS), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
      }

      var n = t.prototype;
      return n.next = function () {
        this._isSliding || this._slide(yt.NEXT)
      }, n.nextWhenVisible = function () {
        !document.hidden && e(this._element).is(":visible") && "hidden" !== e(this._element).css("visibility") && this.next()
      }, n.prev = function () {
        this._isSliding || this._slide(yt.PREV)
      }, n.pause = function (t) {
        t || (this._isPaused = !0), this._element.querySelector(Ot.NEXT_PREV) && (st.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
      }, n.cycle = function (t) {
        t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
      }, n.to = function (t) {
        var n = this;
        this._activeElement = this._element.querySelector(Ot.ACTIVE_ITEM);
        var i = this._getItemIndex(this._activeElement);
        if (!(t > this._items.length - 1 || t < 0)) if (this._isSliding) e(this._element).one(St.SLID, function () {
          return n.to(t)
        }); else {
          if (i === t) return this.pause(), void this.cycle();
          var o = t > i ? yt.NEXT : yt.PREV;
          this._slide(o, this._items[t])
        }
      }, n.dispose = function () {
        e(this._element).off(".bs.carousel"), e.removeData(this._element, "bs.carousel"), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
      }, n._getConfig = function (t) {
        return t = r({}, Tt, t), st.typeCheckConfig(vt, t, bt), t
      }, n._handleSwipe = function () {
        var t = Math.abs(this.touchDeltaX);
        if (!(t <= 40)) {
          var e = t / this.touchDeltaX;
          e > 0 && this.prev(), e < 0 && this.next()
        }
      }, n._addEventListeners = function () {
        var t = this;
        this._config.keyboard && e(this._element).on(St.KEYDOWN, function (e) {
          return t._keydown(e)
        }), "hover" === this._config.pause && e(this._element).on(St.MOUSEENTER, function (e) {
          return t.pause(e)
        }).on(St.MOUSELEAVE, function (e) {
          return t.cycle(e)
        }), this._config.touch && this._addTouchEventListeners()
      }, n._addTouchEventListeners = function () {
        var t = this;
        if (this._touchSupported) {
          var n = function (e) {
            t._pointerEvent && Ct[e.originalEvent.pointerType.toUpperCase()] ? t.touchStartX = e.originalEvent.clientX : t._pointerEvent || (t.touchStartX = e.originalEvent.touches[0].clientX)
          }, i = function (e) {
            e.originalEvent.touches && e.originalEvent.touches.length > 1 ? t.touchDeltaX = 0 : t.touchDeltaX = e.originalEvent.touches[0].clientX - t.touchStartX
          }, o = function (e) {
            t._pointerEvent && Ct[e.originalEvent.pointerType.toUpperCase()] && (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX), t._handleSwipe(), "hover" === t._config.pause && (t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function (e) {
              return t.cycle(e)
            }, 500 + t._config.interval))
          };
          e(this._element.querySelectorAll(Ot.ITEM_IMG)).on(St.DRAG_START, function (t) {
            return t.preventDefault()
          }), this._pointerEvent ? (e(this._element).on(St.POINTERDOWN, function (t) {
            return n(t)
          }), e(this._element).on(St.POINTERUP, function (t) {
            return o(t)
          }), this._element.classList.add(It.POINTER_EVENT)) : (e(this._element).on(St.TOUCHSTART, function (t) {
            return n(t)
          }), e(this._element).on(St.TOUCHMOVE, function (t) {
            return i(t)
          }), e(this._element).on(St.TOUCHEND, function (t) {
            return o(t)
          }))
        }
      }, n._keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
          case 37:
            t.preventDefault(), this.prev();
            break;
          case 39:
            t.preventDefault(), this.next()
        }
      }, n._getItemIndex = function (t) {
        return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(Ot.ITEM)) : [], this._items.indexOf(t)
      }, n._getItemByDirection = function (t, e) {
        var n = t === yt.NEXT, i = t === yt.PREV, o = this._getItemIndex(e), r = this._items.length - 1;
        if ((i && 0 === o || n && o === r) && !this._config.wrap) return e;
        var s = (o + (t === yt.PREV ? -1 : 1)) % this._items.length;
        return -1 === s ? this._items[this._items.length - 1] : this._items[s]
      }, n._triggerSlideEvent = function (t, n) {
        var i = this._getItemIndex(t), o = this._getItemIndex(this._element.querySelector(Ot.ACTIVE_ITEM)),
          r = e.Event(St.SLIDE, {relatedTarget: t, direction: n, from: o, to: i});
        return e(this._element).trigger(r), r
      }, n._setActiveIndicatorElement = function (t) {
        if (this._indicatorsElement) {
          var n = [].slice.call(this._indicatorsElement.querySelectorAll(Ot.ACTIVE));
          e(n).removeClass(It.ACTIVE);
          var i = this._indicatorsElement.children[this._getItemIndex(t)];
          i && e(i).addClass(It.ACTIVE)
        }
      }, n._slide = function (t, n) {
        var i, o, r, s = this, a = this._element.querySelector(Ot.ACTIVE_ITEM), l = this._getItemIndex(a),
          c = n || a && this._getItemByDirection(t, a), u = this._getItemIndex(c), h = Boolean(this._interval);
        if (t === yt.NEXT ? (i = It.LEFT, o = It.NEXT, r = yt.LEFT) : (i = It.RIGHT, o = It.PREV, r = yt.RIGHT), c && e(c).hasClass(It.ACTIVE)) this._isSliding = !1; else if (!this._triggerSlideEvent(c, r).isDefaultPrevented() && a && c) {
          this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(c);
          var f = e.Event(St.SLID, {relatedTarget: c, direction: r, from: l, to: u});
          if (e(this._element).hasClass(It.SLIDE)) {
            e(c).addClass(o), st.reflow(c), e(a).addClass(i), e(c).addClass(i);
            var d = parseInt(c.getAttribute("data-interval"), 10);
            d ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = d) : this._config.interval = this._config.defaultInterval || this._config.interval;
            var p = st.getTransitionDurationFromElement(a);
            e(a).one(st.TRANSITION_END, function () {
              e(c).removeClass(i + " " + o).addClass(It.ACTIVE), e(a).removeClass(It.ACTIVE + " " + o + " " + i), s._isSliding = !1, setTimeout(function () {
                return e(s._element).trigger(f)
              }, 0)
            }).emulateTransitionEnd(p)
          } else e(a).removeClass(It.ACTIVE), e(c).addClass(It.ACTIVE), this._isSliding = !1, e(this._element).trigger(f);
          h && this.cycle()
        }
      }, t._jQueryInterface = function (n) {
        return this.each(function () {
          var i = e(this).data("bs.carousel"), o = r({}, Tt, e(this).data());
          "object" == typeof n && (o = r({}, o, n));
          var s = "string" == typeof n ? n : o.slide;
          if (i || (i = new t(this, o), e(this).data("bs.carousel", i)), "number" == typeof n) i.to(n); else if ("string" == typeof s) {
            if (void 0 === i[s]) throw new TypeError('No method named "' + s + '"');
            i[s]()
          } else o.interval && o.ride && (i.pause(), i.cycle())
        })
      }, t._dataApiClickHandler = function (n) {
        var i = st.getSelectorFromElement(this);
        if (i) {
          var o = e(i)[0];
          if (o && e(o).hasClass(It.CAROUSEL)) {
            var s = r({}, e(o).data(), e(this).data()), a = this.getAttribute("data-slide-to");
            a && (s.interval = !1), t._jQueryInterface.call(e(o), s), a && e(o).data("bs.carousel").to(a), n.preventDefault()
          }
        }
      }, i(t, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }, {
        key: "Default", get: function () {
          return Tt
        }
      }]), t
    }();
  e(document).on(St.CLICK_DATA_API, Ot.DATA_SLIDE, At._dataApiClickHandler), e(window).on(St.LOAD_DATA_API, function () {
    for (var t = [].slice.call(document.querySelectorAll(Ot.DATA_RIDE)), n = 0, i = t.length; n < i; n++) {
      var o = e(t[n]);
      At._jQueryInterface.call(o, o.data())
    }
  }), e.fn[vt] = At._jQueryInterface, e.fn[vt].Constructor = At, e.fn[vt].noConflict = function () {
    return e.fn[vt] = Et, At._jQueryInterface
  };
  var Dt = "collapse", wt = e.fn[Dt], Nt = {toggle: !0, parent: ""},
    Lt = {toggle: "boolean", parent: "(string|element)"}, Pt = {
      SHOW: "show.bs.collapse",
      SHOWN: "shown.bs.collapse",
      HIDE: "hide.bs.collapse",
      HIDDEN: "hidden.bs.collapse",
      CLICK_DATA_API: "click.bs.collapse.data-api"
    }, Ht = {SHOW: "show", COLLAPSE: "collapse", COLLAPSING: "collapsing", COLLAPSED: "collapsed"},
    Rt = {WIDTH: "width", HEIGHT: "height"},
    Wt = {ACTIVES: ".show, .collapsing", DATA_TOGGLE: '[data-toggle="collapse"]'}, kt = function () {
      function t(t, e) {
        this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
        for (var n = [].slice.call(document.querySelectorAll(Wt.DATA_TOGGLE)), i = 0, o = n.length; i < o; i++) {
          var r = n[i], s = st.getSelectorFromElement(r),
            a = [].slice.call(document.querySelectorAll(s)).filter(function (e) {
              return e === t
            });
          null !== s && a.length > 0 && (this._selector = s, this._triggerArray.push(r))
        }
        this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
      }

      var n = t.prototype;
      return n.toggle = function () {
        e(this._element).hasClass(Ht.SHOW) ? this.hide() : this.show()
      }, n.show = function () {
        var n = this;
        if (!this._isTransitioning && !e(this._element).hasClass(Ht.SHOW)) {
          var i, o;
          if (this._parent && 0 === (i = [].slice.call(this._parent.querySelectorAll(Wt.ACTIVES)).filter(function (t) {
            return "string" == typeof n._config.parent ? t.getAttribute("data-parent") === n._config.parent : t.classList.contains(Ht.COLLAPSE)
          })).length && (i = null), !(i && (o = e(i).not(this._selector).data("bs.collapse")) && o._isTransitioning)) {
            var r = e.Event(Pt.SHOW);
            if (e(this._element).trigger(r), !r.isDefaultPrevented()) {
              i && (t._jQueryInterface.call(e(i).not(this._selector), "hide"), o || e(i).data("bs.collapse", null));
              var s = this._getDimension();
              e(this._element).removeClass(Ht.COLLAPSE).addClass(Ht.COLLAPSING), this._element.style[s] = 0, this._triggerArray.length && e(this._triggerArray).removeClass(Ht.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);
              var a = "scroll" + (s[0].toUpperCase() + s.slice(1)),
                l = st.getTransitionDurationFromElement(this._element);
              e(this._element).one(st.TRANSITION_END, function () {
                e(n._element).removeClass(Ht.COLLAPSING).addClass(Ht.COLLAPSE).addClass(Ht.SHOW), n._element.style[s] = "", n.setTransitioning(!1), e(n._element).trigger(Pt.SHOWN)
              }).emulateTransitionEnd(l), this._element.style[s] = this._element[a] + "px"
            }
          }
        }
      }, n.hide = function () {
        var t = this;
        if (!this._isTransitioning && e(this._element).hasClass(Ht.SHOW)) {
          var n = e.Event(Pt.HIDE);
          if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
            var i = this._getDimension();
            this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", st.reflow(this._element), e(this._element).addClass(Ht.COLLAPSING).removeClass(Ht.COLLAPSE).removeClass(Ht.SHOW);
            var o = this._triggerArray.length;
            if (o > 0) for (var r = 0; r < o; r++) {
              var s = this._triggerArray[r], a = st.getSelectorFromElement(s);
              null !== a && (e([].slice.call(document.querySelectorAll(a))).hasClass(Ht.SHOW) || e(s).addClass(Ht.COLLAPSED).attr("aria-expanded", !1))
            }
            this.setTransitioning(!0), this._element.style[i] = "";
            var l = st.getTransitionDurationFromElement(this._element);
            e(this._element).one(st.TRANSITION_END, function () {
              t.setTransitioning(!1), e(t._element).removeClass(Ht.COLLAPSING).addClass(Ht.COLLAPSE).trigger(Pt.HIDDEN)
            }).emulateTransitionEnd(l)
          }
        }
      }, n.setTransitioning = function (t) {
        this._isTransitioning = t
      }, n.dispose = function () {
        e.removeData(this._element, "bs.collapse"), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
      }, n._getConfig = function (t) {
        return t = r({}, Nt, t), t.toggle = Boolean(t.toggle), st.typeCheckConfig(Dt, t, Lt), t
      }, n._getDimension = function () {
        return e(this._element).hasClass(Rt.WIDTH) ? Rt.WIDTH : Rt.HEIGHT
      }, n._getParent = function () {
        var n, i = this;
        st.isElement(this._config.parent) ? (n = this._config.parent, void 0 !== this._config.parent.jquery && (n = this._config.parent[0])) : n = document.querySelector(this._config.parent);
        var o = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
          r = [].slice.call(n.querySelectorAll(o));
        return e(r).each(function (e, n) {
          i._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n])
        }), n
      }, n._addAriaAndCollapsedClass = function (t, n) {
        var i = e(t).hasClass(Ht.SHOW);
        n.length && e(n).toggleClass(Ht.COLLAPSED, !i).attr("aria-expanded", i)
      }, t._getTargetFromElement = function (t) {
        var e = st.getSelectorFromElement(t);
        return e ? document.querySelector(e) : null
      }, t._jQueryInterface = function (n) {
        return this.each(function () {
          var i = e(this), o = i.data("bs.collapse"), s = r({}, Nt, i.data(), "object" == typeof n && n ? n : {});
          if (!o && s.toggle && /show|hide/.test(n) && (s.toggle = !1), o || (o = new t(this, s), i.data("bs.collapse", o)), "string" == typeof n) {
            if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');
            o[n]()
          }
        })
      }, i(t, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }, {
        key: "Default", get: function () {
          return Nt
        }
      }]), t
    }();
  e(document).on(Pt.CLICK_DATA_API, Wt.DATA_TOGGLE, function (t) {
    "A" === t.currentTarget.tagName && t.preventDefault();
    var n = e(this), i = st.getSelectorFromElement(this), o = [].slice.call(document.querySelectorAll(i));
    e(o).each(function () {
      var t = e(this), i = t.data("bs.collapse") ? "toggle" : n.data();
      kt._jQueryInterface.call(t, i)
    })
  }), e.fn[Dt] = kt._jQueryInterface, e.fn[Dt].Constructor = kt, e.fn[Dt].noConflict = function () {
    return e.fn[Dt] = wt, kt._jQueryInterface
  };
  for (var Ft = "undefined" != typeof window && "undefined" != typeof document, Mt = ["Edge", "Trident", "Firefox"], xt = 0, Ut = 0; Ut < Mt.length; Ut += 1) if (Ft && navigator.userAgent.indexOf(Mt[Ut]) >= 0) {
    xt = 1;
    break
  }
  var Vt = Ft && window.Promise ? function (t) {
      var e = !1;
      return function () {
        e || (e = !0, window.Promise.resolve().then(function () {
          e = !1, t()
        }))
      }
    } : function (t) {
      var e = !1;
      return function () {
        e || (e = !0, setTimeout(function () {
          e = !1, t()
        }, xt))
      }
    }, jt = Ft && !(!window.MSInputMethodContext || !document.documentMode),
    Bt = Ft && /MSIE 10/.test(navigator.userAgent), Gt = function (t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }, Kt = function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
      }

      return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e
      }
    }(), qt = function (t, e, n) {
      return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[e] = n, t
    }, Qt = Object.assign || function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
      }
      return t
    }, Yt = Ft && /Firefox/i.test(navigator.userAgent),
    Xt = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
    zt = Xt.slice(3), $t = {FLIP: "flip", CLOCKWISE: "clockwise", COUNTERCLOCKWISE: "counterclockwise"}, Jt = {
      placement: "bottom", positionFixed: !1, eventsEnabled: !0, removeOnDestroy: !1, onCreate: function () {
      }, onUpdate: function () {
      }, modifiers: {
        shift: {
          order: 100, enabled: !0, fn: function (t) {
            var e = t.placement, n = e.split("-")[0], i = e.split("-")[1];
            if (i) {
              var o = t.offsets, r = o.reference, s = o.popper, a = -1 !== ["bottom", "top"].indexOf(n),
                l = a ? "left" : "top", c = a ? "width" : "height",
                u = {start: qt({}, l, r[l]), end: qt({}, l, r[l] + r[c] - s[c])};
              t.offsets.popper = Qt({}, s, u[i])
            }
            return t
          }
        }, offset: {
          order: 200, enabled: !0, fn: function (t, e) {
            var n = e.offset, i = t.placement, o = t.offsets, r = o.popper, s = o.reference, a = i.split("-")[0],
              l = void 0;
            return l = Y(+n) ? [+n, 0] : nt(n, r, s, a), "left" === a ? (r.top += l[0], r.left -= l[1]) : "right" === a ? (r.top += l[0], r.left += l[1]) : "top" === a ? (r.left += l[0], r.top -= l[1]) : "bottom" === a && (r.left += l[0], r.top += l[1]), t.popper = r, t
          }, offset: 0
        }, preventOverflow: {
          order: 300, enabled: !0, fn: function (t, e) {
            var n = e.boundariesElement || d(t.instance.popper);
            t.instance.reference === n && (n = d(n));
            var i = U("transform"), o = t.instance.popper.style, r = o.top, s = o.left, a = o[i];
            o.top = "", o.left = "", o[i] = "";
            var l = D(t.instance.popper, t.instance.reference, e.padding, n, t.positionFixed);
            o.top = r, o.left = s, o[i] = a, e.boundaries = l;
            var c = e.priority, u = t.offsets.popper, h = {
              primary: function (t) {
                var n = u[t];
                return u[t] < l[t] && !e.escapeWithReference && (n = Math.max(u[t], l[t])), qt({}, t, n)
              }, secondary: function (t) {
                var n = "right" === t ? "left" : "top", i = u[n];
                return u[t] > l[t] && !e.escapeWithReference && (i = Math.min(u[n], l[t] - ("right" === t ? u.width : u.height))), qt({}, n, i)
              }
            };
            return c.forEach(function (t) {
              var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
              u = Qt({}, u, h[e](t))
            }), t.offsets.popper = u, t
          }, priority: ["left", "right", "top", "bottom"], padding: 5, boundariesElement: "scrollParent"
        }, keepTogether: {
          order: 400, enabled: !0, fn: function (t) {
            var e = t.offsets, n = e.popper, i = e.reference, o = t.placement.split("-")[0], r = Math.floor,
              s = -1 !== ["top", "bottom"].indexOf(o), a = s ? "right" : "bottom", l = s ? "left" : "top",
              c = s ? "width" : "height";
            return n[a] < r(i[l]) && (t.offsets.popper[l] = r(i[l]) - n[c]), n[l] > r(i[a]) && (t.offsets.popper[l] = r(i[a])), t
          }
        }, arrow: {
          order: 500, enabled: !0, fn: function (t, e) {
            var n;
            if (!J(t.instance.modifiers, "arrow", "keepTogether")) return t;
            var i = e.element;
            if ("string" == typeof i) {
              if (!(i = t.instance.popper.querySelector(i))) return t
            } else if (!t.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
            var o = t.placement.split("-")[0], r = t.offsets, s = r.popper, a = r.reference,
              l = -1 !== ["left", "right"].indexOf(o), u = l ? "height" : "width", h = l ? "Top" : "Left",
              f = h.toLowerCase(), d = l ? "left" : "top", p = l ? "bottom" : "right", m = P(i)[u];
            a[p] - m < s[f] && (t.offsets.popper[f] -= s[f] - (a[p] - m)), a[f] + m > s[p] && (t.offsets.popper[f] += a[f] + m - s[p]), t.offsets.popper = y(t.offsets.popper);
            var g = a[f] + a[u] / 2 - m / 2, _ = c(t.instance.popper), v = parseFloat(_["margin" + h], 10),
              E = parseFloat(_["border" + h + "Width"], 10), T = g - t.offsets.popper[f] - v - E;
            return T = Math.max(Math.min(s[u] - m, T), 0), t.arrowElement = i, t.offsets.arrow = (n = {}, qt(n, f, Math.round(T)), qt(n, d, ""), n), t
          }, element: "[x-arrow]"
        }, flip: {
          order: 600, enabled: !0, fn: function (t, e) {
            if (x(t.instance.modifiers, "inner")) return t;
            if (t.flipped && t.placement === t.originalPlacement) return t;
            var n = D(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed),
              i = t.placement.split("-")[0], o = H(i), r = t.placement.split("-")[1] || "", s = [];
            switch (e.behavior) {
              case $t.FLIP:
                s = [i, o];
                break;
              case $t.CLOCKWISE:
                s = tt(i);
                break;
              case $t.COUNTERCLOCKWISE:
                s = tt(i, !0);
                break;
              default:
                s = e.behavior
            }
            return s.forEach(function (a, l) {
              if (i !== a || s.length === l + 1) return t;
              i = t.placement.split("-")[0], o = H(i);
              var c = t.offsets.popper, u = t.offsets.reference, h = Math.floor,
                f = "left" === i && h(c.right) > h(u.left) || "right" === i && h(c.left) < h(u.right) || "top" === i && h(c.bottom) > h(u.top) || "bottom" === i && h(c.top) < h(u.bottom),
                d = h(c.left) < h(n.left), p = h(c.right) > h(n.right), m = h(c.top) < h(n.top),
                g = h(c.bottom) > h(n.bottom),
                _ = "left" === i && d || "right" === i && p || "top" === i && m || "bottom" === i && g,
                v = -1 !== ["top", "bottom"].indexOf(i),
                E = !!e.flipVariations && (v && "start" === r && d || v && "end" === r && p || !v && "start" === r && m || !v && "end" === r && g);
              (f || _ || E) && (t.flipped = !0, (f || _) && (i = s[l + 1]), E && (r = Z(r)), t.placement = i + (r ? "-" + r : ""), t.offsets.popper = Qt({}, t.offsets.popper, R(t.instance.popper, t.offsets.reference, t.placement)), t = F(t.instance.modifiers, t, "flip"))
            }), t
          }, behavior: "flip", padding: 5, boundariesElement: "viewport"
        }, inner: {
          order: 700, enabled: !1, fn: function (t) {
            var e = t.placement, n = e.split("-")[0], i = t.offsets, o = i.popper, r = i.reference,
              s = -1 !== ["left", "right"].indexOf(n), a = -1 === ["top", "left"].indexOf(n);
            return o[s ? "left" : "top"] = r[n] - (a ? o[s ? "width" : "height"] : 0), t.placement = H(e), t.offsets.popper = y(o), t
          }
        }, hide: {
          order: 800, enabled: !0, fn: function (t) {
            if (!J(t.instance.modifiers, "hide", "preventOverflow")) return t;
            var e = t.offsets.reference, n = W(t.instance.modifiers, function (t) {
              return "preventOverflow" === t.name
            }).boundaries;
            if (e.bottom < n.top || e.left > n.right || e.top > n.bottom || e.right < n.left) {
              if (!0 === t.hide) return t;
              t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
            } else {
              if (!1 === t.hide) return t;
              t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
            }
            return t
          }
        }, computeStyle: {
          order: 850, enabled: !0, fn: function (t, e) {
            var n = e.x, i = e.y, o = t.offsets.popper, r = W(t.instance.modifiers, function (t) {
              return "applyStyle" === t.name
            }).gpuAcceleration;
            void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
            var s = void 0 !== r ? r : e.gpuAcceleration, a = d(t.instance.popper), l = S(a), c = {position: o.position},
              u = $(t, window.devicePixelRatio < 2 || !Yt), h = "bottom" === n ? "top" : "bottom",
              f = "right" === i ? "left" : "right", p = U("transform"), m = void 0, g = void 0;
            if (g = "bottom" === h ? "HTML" === a.nodeName ? -a.clientHeight + u.bottom : -l.height + u.bottom : u.top, m = "right" === f ? "HTML" === a.nodeName ? -a.clientWidth + u.right : -l.width + u.right : u.left, s && p) c[p] = "translate3d(" + m + "px, " + g + "px, 0)", c[h] = 0, c[f] = 0, c.willChange = "transform"; else {
              var _ = "bottom" === h ? -1 : 1, v = "right" === f ? -1 : 1;
              c[h] = g * _, c[f] = m * v, c.willChange = h + ", " + f
            }
            var E = {"x-placement": t.placement};
            return t.attributes = Qt({}, E, t.attributes), t.styles = Qt({}, c, t.styles), t.arrowStyles = Qt({}, t.offsets.arrow, t.arrowStyles), t
          }, gpuAcceleration: !0, x: "bottom", y: "right"
        }, applyStyle: {
          order: 900, enabled: !0, fn: function (t) {
            return X(t.instance.popper, t.styles), z(t.instance.popper, t.attributes), t.arrowElement && Object.keys(t.arrowStyles).length && X(t.arrowElement, t.arrowStyles), t
          }, onLoad: function (t, e, n, i, o) {
            var r = L(o, e, t, n.positionFixed),
              s = N(n.placement, r, e, t, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
            return e.setAttribute("x-placement", s), X(e, {position: n.positionFixed ? "fixed" : "absolute"}), n
          }, gpuAcceleration: void 0
        }
      }
    }, Zt = function () {
      function t(e, n) {
        var i = this, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        Gt(this, t), this.scheduleUpdate = function () {
          return requestAnimationFrame(i.update)
        }, this.update = Vt(this.update.bind(this)), this.options = Qt({}, t.Defaults, o), this.state = {
          isDestroyed: !1,
          isCreated: !1,
          scrollParents: []
        }, this.reference = e && e.jquery ? e[0] : e, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(Qt({}, t.Defaults.modifiers, o.modifiers)).forEach(function (e) {
          i.options.modifiers[e] = Qt({}, t.Defaults.modifiers[e] || {}, o.modifiers ? o.modifiers[e] : {})
        }), this.modifiers = Object.keys(this.options.modifiers).map(function (t) {
          return Qt({name: t}, i.options.modifiers[t])
        }).sort(function (t, e) {
          return t.order - e.order
        }), this.modifiers.forEach(function (t) {
          t.enabled && l(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state)
        }), this.update();
        var r = this.options.eventsEnabled;
        r && this.enableEventListeners(), this.state.eventsEnabled = r
      }

      return Kt(t, [{
        key: "update", value: function () {
          return M.call(this)
        }
      }, {
        key: "destroy", value: function () {
          return V.call(this)
        }
      }, {
        key: "enableEventListeners", value: function () {
          return K.call(this)
        }
      }, {
        key: "disableEventListeners", value: function () {
          return Q.call(this)
        }
      }]), t
    }();
  Zt.Utils = ("undefined" != typeof window ? window : global).PopperUtils, Zt.placements = Xt, Zt.Defaults = Jt;
  var te = "dropdown", ee = e.fn[te], ne = new RegExp("38|40|27"), ie = {
    HIDE: "hide.bs.dropdown",
    HIDDEN: "hidden.bs.dropdown",
    SHOW: "show.bs.dropdown",
    SHOWN: "shown.bs.dropdown",
    CLICK: "click.bs.dropdown",
    CLICK_DATA_API: "click.bs.dropdown.data-api",
    KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api",
    KEYUP_DATA_API: "keyup.bs.dropdown.data-api"
  }, oe = {
    DISABLED: "disabled",
    SHOW: "show",
    DROPUP: "dropup",
    DROPRIGHT: "dropright",
    DROPLEFT: "dropleft",
    MENURIGHT: "dropdown-menu-right",
    MENULEFT: "dropdown-menu-left",
    POSITION_STATIC: "position-static"
  }, re = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: ".dropdown form",
    MENU: ".dropdown-menu",
    NAVBAR_NAV: ".navbar-nav",
    VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
  }, se = {
    TOP: "top-start",
    TOPEND: "top-end",
    BOTTOM: "bottom-start",
    BOTTOMEND: "bottom-end",
    RIGHT: "right-start",
    RIGHTEND: "right-end",
    LEFT: "left-start",
    LEFTEND: "left-end"
  }, ae = {offset: 0, flip: !0, boundary: "scrollParent", reference: "toggle", display: "dynamic"}, le = {
    offset: "(number|string|function)",
    flip: "boolean",
    boundary: "(string|element)",
    reference: "(string|element)",
    display: "string"
  }, ce = function () {
    function t(t, e) {
      this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
    }

    var n = t.prototype;
    return n.toggle = function () {
      if (!this._element.disabled && !e(this._element).hasClass(oe.DISABLED)) {
        var n = t._getParentFromElement(this._element), i = e(this._menu).hasClass(oe.SHOW);
        if (t._clearMenus(), !i) {
          var o = {relatedTarget: this._element}, r = e.Event(ie.SHOW, o);
          if (e(n).trigger(r), !r.isDefaultPrevented()) {
            if (!this._inNavbar) {
              if (void 0 === Zt) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
              var s = this._element;
              "parent" === this._config.reference ? s = n : st.isElement(this._config.reference) && (s = this._config.reference, void 0 !== this._config.reference.jquery && (s = this._config.reference[0])), "scrollParent" !== this._config.boundary && e(n).addClass(oe.POSITION_STATIC), this._popper = new Zt(s, this._menu, this._getPopperConfig())
            }
            "ontouchstart" in document.documentElement && 0 === e(n).closest(re.NAVBAR_NAV).length && e(document.body).children().on("mouseover", null, e.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), e(this._menu).toggleClass(oe.SHOW), e(n).toggleClass(oe.SHOW).trigger(e.Event(ie.SHOWN, o))
          }
        }
      }
    }, n.show = function () {
      if (!(this._element.disabled || e(this._element).hasClass(oe.DISABLED) || e(this._menu).hasClass(oe.SHOW))) {
        var n = {relatedTarget: this._element}, i = e.Event(ie.SHOW, n), o = t._getParentFromElement(this._element);
        e(o).trigger(i), i.isDefaultPrevented() || (e(this._menu).toggleClass(oe.SHOW), e(o).toggleClass(oe.SHOW).trigger(e.Event(ie.SHOWN, n)))
      }
    }, n.hide = function () {
      if (!this._element.disabled && !e(this._element).hasClass(oe.DISABLED) && e(this._menu).hasClass(oe.SHOW)) {
        var n = {relatedTarget: this._element}, i = e.Event(ie.HIDE, n), o = t._getParentFromElement(this._element);
        e(o).trigger(i), i.isDefaultPrevented() || (e(this._menu).toggleClass(oe.SHOW), e(o).toggleClass(oe.SHOW).trigger(e.Event(ie.HIDDEN, n)))
      }
    }, n.dispose = function () {
      e.removeData(this._element, "bs.dropdown"), e(this._element).off(".bs.dropdown"), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
    }, n.update = function () {
      this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
    }, n._addEventListeners = function () {
      var t = this;
      e(this._element).on(ie.CLICK, function (e) {
        e.preventDefault(), e.stopPropagation(), t.toggle()
      })
    }, n._getConfig = function (t) {
      return t = r({}, this.constructor.Default, e(this._element).data(), t), st.typeCheckConfig(te, t, this.constructor.DefaultType), t
    }, n._getMenuElement = function () {
      if (!this._menu) {
        var e = t._getParentFromElement(this._element);
        e && (this._menu = e.querySelector(re.MENU))
      }
      return this._menu
    }, n._getPlacement = function () {
      var t = e(this._element.parentNode), n = se.BOTTOM;
      return t.hasClass(oe.DROPUP) ? (n = se.TOP, e(this._menu).hasClass(oe.MENURIGHT) && (n = se.TOPEND)) : t.hasClass(oe.DROPRIGHT) ? n = se.RIGHT : t.hasClass(oe.DROPLEFT) ? n = se.LEFT : e(this._menu).hasClass(oe.MENURIGHT) && (n = se.BOTTOMEND), n
    }, n._detectNavbar = function () {
      return e(this._element).closest(".navbar").length > 0
    }, n._getOffset = function () {
      var t = this, e = {};
      return "function" == typeof this._config.offset ? e.fn = function (e) {
        return e.offsets = r({}, e.offsets, t._config.offset(e.offsets, t._element) || {}), e
      } : e.offset = this._config.offset, e
    }, n._getPopperConfig = function () {
      var t = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {enabled: this._config.flip},
          preventOverflow: {boundariesElement: this._config.boundary}
        }
      };
      return "static" === this._config.display && (t.modifiers.applyStyle = {enabled: !1}), t
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this).data("bs.dropdown"), o = "object" == typeof n ? n : null;
        if (i || (i = new t(this, o), e(this).data("bs.dropdown", i)), "string" == typeof n) {
          if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
          i[n]()
        }
      })
    }, t._clearMenus = function (n) {
      if (!n || 3 !== n.which && ("keyup" !== n.type || 9 === n.which)) for (var i = [].slice.call(document.querySelectorAll(re.DATA_TOGGLE)), o = 0, r = i.length; o < r; o++) {
        var s = t._getParentFromElement(i[o]), a = e(i[o]).data("bs.dropdown"), l = {relatedTarget: i[o]};
        if (n && "click" === n.type && (l.clickEvent = n), a) {
          var c = a._menu;
          if (e(s).hasClass(oe.SHOW) && !(n && ("click" === n.type && /input|textarea/i.test(n.target.tagName) || "keyup" === n.type && 9 === n.which) && e.contains(s, n.target))) {
            var u = e.Event(ie.HIDE, l);
            e(s).trigger(u), u.isDefaultPrevented() || ("ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), i[o].setAttribute("aria-expanded", "false"), e(c).removeClass(oe.SHOW), e(s).removeClass(oe.SHOW).trigger(e.Event(ie.HIDDEN, l)))
          }
        }
      }
    }, t._getParentFromElement = function (t) {
      var e, n = st.getSelectorFromElement(t);
      return n && (e = document.querySelector(n)), e || t.parentNode
    }, t._dataApiKeydownHandler = function (n) {
      if ((/input|textarea/i.test(n.target.tagName) ? !(32 === n.which || 27 !== n.which && (40 !== n.which && 38 !== n.which || e(n.target).closest(re.MENU).length)) : ne.test(n.which)) && (n.preventDefault(), n.stopPropagation(), !this.disabled && !e(this).hasClass(oe.DISABLED))) {
        var i = t._getParentFromElement(this), o = e(i).hasClass(oe.SHOW);
        if (o && (!o || 27 !== n.which && 32 !== n.which)) {
          var r = [].slice.call(i.querySelectorAll(re.VISIBLE_ITEMS));
          if (0 !== r.length) {
            var s = r.indexOf(n.target);
            38 === n.which && s > 0 && s--, 40 === n.which && s < r.length - 1 && s++, s < 0 && (s = 0), r[s].focus()
          }
        } else {
          if (27 === n.which) {
            var a = i.querySelector(re.DATA_TOGGLE);
            e(a).trigger("focus")
          }
          e(this).trigger("click")
        }
      }
    }, i(t, null, [{
      key: "VERSION", get: function () {
        return "4.3.1"
      }
    }, {
      key: "Default", get: function () {
        return ae
      }
    }, {
      key: "DefaultType", get: function () {
        return le
      }
    }]), t
  }();
  e(document).on(ie.KEYDOWN_DATA_API, re.DATA_TOGGLE, ce._dataApiKeydownHandler).on(ie.KEYDOWN_DATA_API, re.MENU, ce._dataApiKeydownHandler).on(ie.CLICK_DATA_API + " " + ie.KEYUP_DATA_API, ce._clearMenus).on(ie.CLICK_DATA_API, re.DATA_TOGGLE, function (t) {
    t.preventDefault(), t.stopPropagation(), ce._jQueryInterface.call(e(this), "toggle")
  }).on(ie.CLICK_DATA_API, re.FORM_CHILD, function (t) {
    t.stopPropagation()
  }), e.fn[te] = ce._jQueryInterface, e.fn[te].Constructor = ce, e.fn[te].noConflict = function () {
    return e.fn[te] = ee, ce._jQueryInterface
  };
  var ue = e.fn.modal, he = {backdrop: !0, keyboard: !0, focus: !0, show: !0},
    fe = {backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean"}, de = {
      HIDE: "hide.bs.modal",
      HIDDEN: "hidden.bs.modal",
      SHOW: "show.bs.modal",
      SHOWN: "shown.bs.modal",
      FOCUSIN: "focusin.bs.modal",
      RESIZE: "resize.bs.modal",
      CLICK_DISMISS: "click.dismiss.bs.modal",
      KEYDOWN_DISMISS: "keydown.dismiss.bs.modal",
      MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal",
      MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal",
      CLICK_DATA_API: "click.bs.modal.data-api"
    }, pe = {
      SCROLLABLE: "modal-dialog-scrollable",
      SCROLLBAR_MEASURER: "modal-scrollbar-measure",
      BACKDROP: "modal-backdrop",
      OPEN: "modal-open",
      FADE: "fade",
      SHOW: "show"
    }, me = {
      DIALOG: ".modal-dialog",
      MODAL_BODY: ".modal-body",
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
      STICKY_CONTENT: ".sticky-top"
    }, ge = function () {
      function t(t, e) {
        this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(me.DIALOG), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
      }

      var n = t.prototype;
      return n.toggle = function (t) {
        return this._isShown ? this.hide() : this.show(t)
      }, n.show = function (t) {
        var n = this;
        if (!this._isShown && !this._isTransitioning) {
          e(this._element).hasClass(pe.FADE) && (this._isTransitioning = !0);
          var i = e.Event(de.SHOW, {relatedTarget: t});
          e(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), e(this._element).on(de.CLICK_DISMISS, me.DATA_DISMISS, function (t) {
            return n.hide(t)
          }), e(this._dialog).on(de.MOUSEDOWN_DISMISS, function () {
            e(n._element).one(de.MOUSEUP_DISMISS, function (t) {
              e(t.target).is(n._element) && (n._ignoreBackdropClick = !0)
            })
          }), this._showBackdrop(function () {
            return n._showElement(t)
          }))
        }
      }, n.hide = function (t) {
        var n = this;
        if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
          var i = e.Event(de.HIDE);
          if (e(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
            this._isShown = !1;
            var o = e(this._element).hasClass(pe.FADE);
            if (o && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), e(document).off(de.FOCUSIN), e(this._element).removeClass(pe.SHOW), e(this._element).off(de.CLICK_DISMISS), e(this._dialog).off(de.MOUSEDOWN_DISMISS), o) {
              var r = st.getTransitionDurationFromElement(this._element);
              e(this._element).one(st.TRANSITION_END, function (t) {
                return n._hideModal(t)
              }).emulateTransitionEnd(r)
            } else this._hideModal()
          }
        }
      }, n.dispose = function () {
        [window, this._element, this._dialog].forEach(function (t) {
          return e(t).off(".bs.modal")
        }), e(document).off(de.FOCUSIN), e.removeData(this._element, "bs.modal"), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
      }, n.handleUpdate = function () {
        this._adjustDialog()
      }, n._getConfig = function (t) {
        return t = r({}, he, t), st.typeCheckConfig("modal", t, fe), t
      }, n._showElement = function (t) {
        var n = this, i = e(this._element).hasClass(pe.FADE);
        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), e(this._dialog).hasClass(pe.SCROLLABLE) ? this._dialog.querySelector(me.MODAL_BODY).scrollTop = 0 : this._element.scrollTop = 0, i && st.reflow(this._element), e(this._element).addClass(pe.SHOW), this._config.focus && this._enforceFocus();
        var o = e.Event(de.SHOWN, {relatedTarget: t}), r = function () {
          n._config.focus && n._element.focus(), n._isTransitioning = !1, e(n._element).trigger(o)
        };
        if (i) {
          var s = st.getTransitionDurationFromElement(this._dialog);
          e(this._dialog).one(st.TRANSITION_END, r).emulateTransitionEnd(s)
        } else r()
      }, n._enforceFocus = function () {
        var t = this;
        e(document).off(de.FOCUSIN).on(de.FOCUSIN, function (n) {
          document !== n.target && t._element !== n.target && 0 === e(t._element).has(n.target).length && t._element.focus()
        })
      }, n._setEscapeEvent = function () {
        var t = this;
        this._isShown && this._config.keyboard ? e(this._element).on(de.KEYDOWN_DISMISS, function (e) {
          27 === e.which && (e.preventDefault(), t.hide())
        }) : this._isShown || e(this._element).off(de.KEYDOWN_DISMISS)
      }, n._setResizeEvent = function () {
        var t = this;
        this._isShown ? e(window).on(de.RESIZE, function (e) {
          return t.handleUpdate(e)
        }) : e(window).off(de.RESIZE)
      }, n._hideModal = function () {
        var t = this;
        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function () {
          e(document.body).removeClass(pe.OPEN), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger(de.HIDDEN)
        })
      }, n._removeBackdrop = function () {
        this._backdrop && (e(this._backdrop).remove(), this._backdrop = null)
      }, n._showBackdrop = function (t) {
        var n = this, i = e(this._element).hasClass(pe.FADE) ? pe.FADE : "";
        if (this._isShown && this._config.backdrop) {
          if (this._backdrop = document.createElement("div"), this._backdrop.className = pe.BACKDROP, i && this._backdrop.classList.add(i), e(this._backdrop).appendTo(document.body), e(this._element).on(de.CLICK_DISMISS, function (t) {
            n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
          }), i && st.reflow(this._backdrop), e(this._backdrop).addClass(pe.SHOW), !t) return;
          if (!i) return void t();
          var o = st.getTransitionDurationFromElement(this._backdrop);
          e(this._backdrop).one(st.TRANSITION_END, t).emulateTransitionEnd(o)
        } else if (!this._isShown && this._backdrop) {
          e(this._backdrop).removeClass(pe.SHOW);
          var r = function () {
            n._removeBackdrop(), t && t()
          };
          if (e(this._element).hasClass(pe.FADE)) {
            var s = st.getTransitionDurationFromElement(this._backdrop);
            e(this._backdrop).one(st.TRANSITION_END, r).emulateTransitionEnd(s)
          } else r()
        } else t && t()
      }, n._adjustDialog = function () {
        var t = this._element.scrollHeight > document.documentElement.clientHeight;
        !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
      }, n._resetAdjustments = function () {
        this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
      }, n._checkScrollbar = function () {
        var t = document.body.getBoundingClientRect();
        this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
      }, n._setScrollbar = function () {
        var t = this;
        if (this._isBodyOverflowing) {
          var n = [].slice.call(document.querySelectorAll(me.FIXED_CONTENT)),
            i = [].slice.call(document.querySelectorAll(me.STICKY_CONTENT));
          e(n).each(function (n, i) {
            var o = i.style.paddingRight, r = e(i).css("padding-right");
            e(i).data("padding-right", o).css("padding-right", parseFloat(r) + t._scrollbarWidth + "px")
          }), e(i).each(function (n, i) {
            var o = i.style.marginRight, r = e(i).css("margin-right");
            e(i).data("margin-right", o).css("margin-right", parseFloat(r) - t._scrollbarWidth + "px")
          });
          var o = document.body.style.paddingRight, r = e(document.body).css("padding-right");
          e(document.body).data("padding-right", o).css("padding-right", parseFloat(r) + this._scrollbarWidth + "px")
        }
        e(document.body).addClass(pe.OPEN)
      }, n._resetScrollbar = function () {
        var t = [].slice.call(document.querySelectorAll(me.FIXED_CONTENT));
        e(t).each(function (t, n) {
          var i = e(n).data("padding-right");
          e(n).removeData("padding-right"), n.style.paddingRight = i || ""
        });
        var n = [].slice.call(document.querySelectorAll("" + me.STICKY_CONTENT));
        e(n).each(function (t, n) {
          var i = e(n).data("margin-right");
          void 0 !== i && e(n).css("margin-right", i).removeData("margin-right")
        });
        var i = e(document.body).data("padding-right");
        e(document.body).removeData("padding-right"), document.body.style.paddingRight = i || ""
      }, n._getScrollbarWidth = function () {
        var t = document.createElement("div");
        t.className = pe.SCROLLBAR_MEASURER, document.body.appendChild(t);
        var e = t.getBoundingClientRect().width - t.clientWidth;
        return document.body.removeChild(t), e
      }, t._jQueryInterface = function (n, i) {
        return this.each(function () {
          var o = e(this).data("bs.modal"), s = r({}, he, e(this).data(), "object" == typeof n && n ? n : {});
          if (o || (o = new t(this, s), e(this).data("bs.modal", o)), "string" == typeof n) {
            if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');
            o[n](i)
          } else s.show && o.show(i)
        })
      }, i(t, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }, {
        key: "Default", get: function () {
          return he
        }
      }]), t
    }();
  e(document).on(de.CLICK_DATA_API, me.DATA_TOGGLE, function (t) {
    var n, i = this, o = st.getSelectorFromElement(this);
    o && (n = document.querySelector(o));
    var s = e(n).data("bs.modal") ? "toggle" : r({}, e(n).data(), e(this).data());
    "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
    var a = e(n).one(de.SHOW, function (t) {
      t.isDefaultPrevented() || a.one(de.HIDDEN, function () {
        e(i).is(":visible") && i.focus()
      })
    });
    ge._jQueryInterface.call(e(n), s, this)
  }), e.fn.modal = ge._jQueryInterface, e.fn.modal.Constructor = ge, e.fn.modal.noConflict = function () {
    return e.fn.modal = ue, ge._jQueryInterface
  };
  var _e = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"], ve = {
      "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
      a: ["target", "href", "title", "rel"],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ["src", "alt", "title", "width", "height"],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: []
    }, Ee = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
    Te = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i,
    be = "tooltip", ye = e.fn[be], Se = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
    Ie = ["sanitize", "whiteList", "sanitizeFn"], Oe = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(number|string|function)",
      container: "(string|element|boolean)",
      fallbackPlacement: "(string|array)",
      boundary: "(string|element)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      whiteList: "object"
    }, Ce = {AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left"}, Ae = {
      animation: !0,
      template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: 0,
      container: !1,
      fallbackPlacement: "flip",
      boundary: "scrollParent",
      sanitize: !0,
      sanitizeFn: null,
      whiteList: ve
    }, De = {SHOW: "show", OUT: "out"}, we = {
      HIDE: "hide.bs.tooltip",
      HIDDEN: "hidden.bs.tooltip",
      SHOW: "show.bs.tooltip",
      SHOWN: "shown.bs.tooltip",
      INSERTED: "inserted.bs.tooltip",
      CLICK: "click.bs.tooltip",
      FOCUSIN: "focusin.bs.tooltip",
      FOCUSOUT: "focusout.bs.tooltip",
      MOUSEENTER: "mouseenter.bs.tooltip",
      MOUSELEAVE: "mouseleave.bs.tooltip"
    }, Ne = {FADE: "fade", SHOW: "show"}, Le = {TOOLTIP: ".tooltip", TOOLTIP_INNER: ".tooltip-inner", ARROW: ".arrow"},
    Pe = {HOVER: "hover", FOCUS: "focus", CLICK: "click", MANUAL: "manual"}, He = function () {
      function t(t, e) {
        if (void 0 === Zt) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
        this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
      }

      var n = t.prototype;
      return n.enable = function () {
        this._isEnabled = !0
      }, n.disable = function () {
        this._isEnabled = !1
      }, n.toggleEnabled = function () {
        this._isEnabled = !this._isEnabled
      }, n.toggle = function (t) {
        if (this._isEnabled) if (t) {
          var n = this.constructor.DATA_KEY, i = e(t.currentTarget).data(n);
          i || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
        } else {
          if (e(this.getTipElement()).hasClass(Ne.SHOW)) return void this._leave(null, this);
          this._enter(null, this)
        }
      }, n.dispose = function () {
        clearTimeout(this._timeout), e.removeData(this.element, this.constructor.DATA_KEY), e(this.element).off(this.constructor.EVENT_KEY), e(this.element).closest(".modal").off("hide.bs.modal"), this.tip && e(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
      }, n.show = function () {
        var t = this;
        if ("none" === e(this.element).css("display")) throw new Error("Please use show on visible elements");
        var n = e.Event(this.constructor.Event.SHOW);
        if (this.isWithContent() && this._isEnabled) {
          e(this.element).trigger(n);
          var i = st.findShadowRoot(this.element),
            o = e.contains(null !== i ? i : this.element.ownerDocument.documentElement, this.element);
          if (n.isDefaultPrevented() || !o) return;
          var r = this.getTipElement(), s = st.getUID(this.constructor.NAME);
          r.setAttribute("id", s), this.element.setAttribute("aria-describedby", s), this.setContent(), this.config.animation && e(r).addClass(Ne.FADE);
          var a = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
            l = this._getAttachment(a);
          this.addAttachmentClass(l);
          var c = this._getContainer();
          e(r).data(this.constructor.DATA_KEY, this), e.contains(this.element.ownerDocument.documentElement, this.tip) || e(r).appendTo(c), e(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new Zt(this.element, r, {
            placement: l,
            modifiers: {
              offset: this._getOffset(),
              flip: {behavior: this.config.fallbackPlacement},
              arrow: {element: Le.ARROW},
              preventOverflow: {boundariesElement: this.config.boundary}
            },
            onCreate: function (e) {
              e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e)
            },
            onUpdate: function (e) {
              return t._handlePopperPlacementChange(e)
            }
          }), e(r).addClass(Ne.SHOW), "ontouchstart" in document.documentElement && e(document.body).children().on("mouseover", null, e.noop);
          var u = function () {
            t.config.animation && t._fixTransition();
            var n = t._hoverState;
            t._hoverState = null, e(t.element).trigger(t.constructor.Event.SHOWN), n === De.OUT && t._leave(null, t)
          };
          if (e(this.tip).hasClass(Ne.FADE)) {
            var h = st.getTransitionDurationFromElement(this.tip);
            e(this.tip).one(st.TRANSITION_END, u).emulateTransitionEnd(h)
          } else u()
        }
      }, n.hide = function (t) {
        var n = this, i = this.getTipElement(), o = e.Event(this.constructor.Event.HIDE), r = function () {
          n._hoverState !== De.SHOW && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), e(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), t && t()
        };
        if (e(this.element).trigger(o), !o.isDefaultPrevented()) {
          if (e(i).removeClass(Ne.SHOW), "ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), this._activeTrigger[Pe.CLICK] = !1, this._activeTrigger[Pe.FOCUS] = !1, this._activeTrigger[Pe.HOVER] = !1, e(this.tip).hasClass(Ne.FADE)) {
            var s = st.getTransitionDurationFromElement(i);
            e(i).one(st.TRANSITION_END, r).emulateTransitionEnd(s)
          } else r();
          this._hoverState = ""
        }
      }, n.update = function () {
        null !== this._popper && this._popper.scheduleUpdate()
      }, n.isWithContent = function () {
        return Boolean(this.getTitle())
      }, n.addAttachmentClass = function (t) {
        e(this.getTipElement()).addClass("bs-tooltip-" + t)
      }, n.getTipElement = function () {
        return this.tip = this.tip || e(this.config.template)[0], this.tip
      }, n.setContent = function () {
        var t = this.getTipElement();
        this.setElementContent(e(t.querySelectorAll(Le.TOOLTIP_INNER)), this.getTitle()), e(t).removeClass(Ne.FADE + " " + Ne.SHOW)
      }, n.setElementContent = function (t, n) {
        "object" != typeof n || !n.nodeType && !n.jquery ? this.config.html ? (this.config.sanitize && (n = ot(n, this.config.whiteList, this.config.sanitizeFn)), t.html(n)) : t.text(n) : this.config.html ? e(n).parent().is(t) || t.empty().append(n) : t.text(e(n).text())
      }, n.getTitle = function () {
        var t = this.element.getAttribute("data-original-title");
        return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
      }, n._getOffset = function () {
        var t = this, e = {};
        return "function" == typeof this.config.offset ? e.fn = function (e) {
          return e.offsets = r({}, e.offsets, t.config.offset(e.offsets, t.element) || {}), e
        } : e.offset = this.config.offset, e
      }, n._getContainer = function () {
        return !1 === this.config.container ? document.body : st.isElement(this.config.container) ? e(this.config.container) : e(document).find(this.config.container)
      }, n._getAttachment = function (t) {
        return Ce[t.toUpperCase()]
      }, n._setListeners = function () {
        var t = this;
        this.config.trigger.split(" ").forEach(function (n) {
          if ("click" === n) e(t.element).on(t.constructor.Event.CLICK, t.config.selector, function (e) {
            return t.toggle(e)
          }); else if (n !== Pe.MANUAL) {
            var i = n === Pe.HOVER ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
              o = n === Pe.HOVER ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
            e(t.element).on(i, t.config.selector, function (e) {
              return t._enter(e)
            }).on(o, t.config.selector, function (e) {
              return t._leave(e)
            })
          }
        }), e(this.element).closest(".modal").on("hide.bs.modal", function () {
          t.element && t.hide()
        }), this.config.selector ? this.config = r({}, this.config, {trigger: "manual", selector: ""}) : this._fixTitle()
      }, n._fixTitle = function () {
        var t = typeof this.element.getAttribute("data-original-title");
        (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
      }, n._enter = function (t, n) {
        var i = this.constructor.DATA_KEY;
        (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusin" === t.type ? Pe.FOCUS : Pe.HOVER] = !0), e(n.getTipElement()).hasClass(Ne.SHOW) || n._hoverState === De.SHOW ? n._hoverState = De.SHOW : (clearTimeout(n._timeout), n._hoverState = De.SHOW, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function () {
          n._hoverState === De.SHOW && n.show()
        }, n.config.delay.show) : n.show())
      }, n._leave = function (t, n) {
        var i = this.constructor.DATA_KEY;
        (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusout" === t.type ? Pe.FOCUS : Pe.HOVER] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = De.OUT, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function () {
          n._hoverState === De.OUT && n.hide()
        }, n.config.delay.hide) : n.hide())
      }, n._isWithActiveTrigger = function () {
        for (var t in this._activeTrigger) if (this._activeTrigger[t]) return !0;
        return !1
      }, n._getConfig = function (t) {
        var n = e(this.element).data();
        return Object.keys(n).forEach(function (t) {
          -1 !== Ie.indexOf(t) && delete n[t]
        }), "number" == typeof (t = r({}, this.constructor.Default, n, "object" == typeof t && t ? t : {})).delay && (t.delay = {
          show: t.delay,
          hide: t.delay
        }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), st.typeCheckConfig(be, t, this.constructor.DefaultType), t.sanitize && (t.template = ot(t.template, t.whiteList, t.sanitizeFn)), t
      }, n._getDelegateConfig = function () {
        var t = {};
        if (this.config) for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
        return t
      }, n._cleanTipClass = function () {
        var t = e(this.getTipElement()), n = t.attr("class").match(Se);
        null !== n && n.length && t.removeClass(n.join(""))
      }, n._handlePopperPlacementChange = function (t) {
        var e = t.instance;
        this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
      }, n._fixTransition = function () {
        var t = this.getTipElement(), n = this.config.animation;
        null === t.getAttribute("x-placement") && (e(t).removeClass(Ne.FADE), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
      }, t._jQueryInterface = function (n) {
        return this.each(function () {
          var i = e(this).data("bs.tooltip"), o = "object" == typeof n && n;
          if ((i || !/dispose|hide/.test(n)) && (i || (i = new t(this, o), e(this).data("bs.tooltip", i)), "string" == typeof n)) {
            if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
            i[n]()
          }
        })
      }, i(t, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }, {
        key: "Default", get: function () {
          return Ae
        }
      }, {
        key: "NAME", get: function () {
          return be
        }
      }, {
        key: "DATA_KEY", get: function () {
          return "bs.tooltip"
        }
      }, {
        key: "Event", get: function () {
          return we
        }
      }, {
        key: "EVENT_KEY", get: function () {
          return ".bs.tooltip"
        }
      }, {
        key: "DefaultType", get: function () {
          return Oe
        }
      }]), t
    }();
  e.fn[be] = He._jQueryInterface, e.fn[be].Constructor = He, e.fn[be].noConflict = function () {
    return e.fn[be] = ye, He._jQueryInterface
  };
  var Re = "popover", We = e.fn[Re], ke = new RegExp("(^|\\s)bs-popover\\S+", "g"), Fe = r({}, He.Default, {
      placement: "right",
      trigger: "click",
      content: "",
      template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }), Me = r({}, He.DefaultType, {content: "(string|element|function)"}), xe = {FADE: "fade", SHOW: "show"},
    Ue = {TITLE: ".popover-header", CONTENT: ".popover-body"}, Ve = {
      HIDE: "hide.bs.popover",
      HIDDEN: "hidden.bs.popover",
      SHOW: "show.bs.popover",
      SHOWN: "shown.bs.popover",
      INSERTED: "inserted.bs.popover",
      CLICK: "click.bs.popover",
      FOCUSIN: "focusin.bs.popover",
      FOCUSOUT: "focusout.bs.popover",
      MOUSEENTER: "mouseenter.bs.popover",
      MOUSELEAVE: "mouseleave.bs.popover"
    }, je = function (t) {
      function n() {
        return t.apply(this, arguments) || this
      }

      s(n, t);
      var o = n.prototype;
      return o.isWithContent = function () {
        return this.getTitle() || this._getContent()
      }, o.addAttachmentClass = function (t) {
        e(this.getTipElement()).addClass("bs-popover-" + t)
      }, o.getTipElement = function () {
        return this.tip = this.tip || e(this.config.template)[0], this.tip
      }, o.setContent = function () {
        var t = e(this.getTipElement());
        this.setElementContent(t.find(Ue.TITLE), this.getTitle());
        var n = this._getContent();
        "function" == typeof n && (n = n.call(this.element)), this.setElementContent(t.find(Ue.CONTENT), n), t.removeClass(xe.FADE + " " + xe.SHOW)
      }, o._getContent = function () {
        return this.element.getAttribute("data-content") || this.config.content
      }, o._cleanTipClass = function () {
        var t = e(this.getTipElement()), n = t.attr("class").match(ke);
        null !== n && n.length > 0 && t.removeClass(n.join(""))
      }, n._jQueryInterface = function (t) {
        return this.each(function () {
          var i = e(this).data("bs.popover"), o = "object" == typeof t ? t : null;
          if ((i || !/dispose|hide/.test(t)) && (i || (i = new n(this, o), e(this).data("bs.popover", i)), "string" == typeof t)) {
            if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
            i[t]()
          }
        })
      }, i(n, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }, {
        key: "Default", get: function () {
          return Fe
        }
      }, {
        key: "NAME", get: function () {
          return Re
        }
      }, {
        key: "DATA_KEY", get: function () {
          return "bs.popover"
        }
      }, {
        key: "Event", get: function () {
          return Ve
        }
      }, {
        key: "EVENT_KEY", get: function () {
          return ".bs.popover"
        }
      }, {
        key: "DefaultType", get: function () {
          return Me
        }
      }]), n
    }(He);
  e.fn[Re] = je._jQueryInterface, e.fn[Re].Constructor = je, e.fn[Re].noConflict = function () {
    return e.fn[Re] = We, je._jQueryInterface
  };
  var Be = "scrollspy", Ge = e.fn[Be], Ke = {offset: 10, method: "auto", target: ""},
    qe = {offset: "number", method: "string", target: "(string|element)"}, Qe = {
      ACTIVATE: "activate.bs.scrollspy",
      SCROLL: "scroll.bs.scrollspy",
      LOAD_DATA_API: "load.bs.scrollspy.data-api"
    }, Ye = {DROPDOWN_ITEM: "dropdown-item", DROPDOWN_MENU: "dropdown-menu", ACTIVE: "active"}, Xe = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: ".active",
      NAV_LIST_GROUP: ".nav, .list-group",
      NAV_LINKS: ".nav-link",
      NAV_ITEMS: ".nav-item",
      LIST_ITEMS: ".list-group-item",
      DROPDOWN: ".dropdown",
      DROPDOWN_ITEMS: ".dropdown-item",
      DROPDOWN_TOGGLE: ".dropdown-toggle"
    }, ze = {OFFSET: "offset", POSITION: "position"}, $e = function () {
      function t(t, n) {
        var i = this;
        this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(n), this._selector = this._config.target + " " + Xe.NAV_LINKS + "," + this._config.target + " " + Xe.LIST_ITEMS + "," + this._config.target + " " + Xe.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, e(this._scrollElement).on(Qe.SCROLL, function (t) {
          return i._process(t)
        }), this.refresh(), this._process()
      }

      var n = t.prototype;
      return n.refresh = function () {
        var t = this, n = this._scrollElement === this._scrollElement.window ? ze.OFFSET : ze.POSITION,
          i = "auto" === this._config.method ? n : this._config.method, o = i === ze.POSITION ? this._getScrollTop() : 0;
        this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (t) {
          var n, r = st.getSelectorFromElement(t);
          if (r && (n = document.querySelector(r)), n) {
            var s = n.getBoundingClientRect();
            if (s.width || s.height) return [e(n)[i]().top + o, r]
          }
          return null
        }).filter(function (t) {
          return t
        }).sort(function (t, e) {
          return t[0] - e[0]
        }).forEach(function (e) {
          t._offsets.push(e[0]), t._targets.push(e[1])
        })
      }, n.dispose = function () {
        e.removeData(this._element, "bs.scrollspy"), e(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
      }, n._getConfig = function (t) {
        if ("string" != typeof (t = r({}, Ke, "object" == typeof t && t ? t : {})).target) {
          var n = e(t.target).attr("id");
          n || (n = st.getUID(Be), e(t.target).attr("id", n)), t.target = "#" + n
        }
        return st.typeCheckConfig(Be, t, qe), t
      }, n._getScrollTop = function () {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
      }, n._getScrollHeight = function () {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
      }, n._getOffsetHeight = function () {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
      }, n._process = function () {
        var t = this._getScrollTop() + this._config.offset, e = this._getScrollHeight(),
          n = this._config.offset + e - this._getOffsetHeight();
        if (this._scrollHeight !== e && this.refresh(), t >= n) {
          var i = this._targets[this._targets.length - 1];
          this._activeTarget !== i && this._activate(i)
        } else {
          if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
          for (var o = this._offsets.length; o--;) this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
        }
      }, n._activate = function (t) {
        this._activeTarget = t, this._clear();
        var n = this._selector.split(",").map(function (e) {
          return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
        }), i = e([].slice.call(document.querySelectorAll(n.join(","))));
        i.hasClass(Ye.DROPDOWN_ITEM) ? (i.closest(Xe.DROPDOWN).find(Xe.DROPDOWN_TOGGLE).addClass(Ye.ACTIVE), i.addClass(Ye.ACTIVE)) : (i.addClass(Ye.ACTIVE), i.parents(Xe.NAV_LIST_GROUP).prev(Xe.NAV_LINKS + ", " + Xe.LIST_ITEMS).addClass(Ye.ACTIVE), i.parents(Xe.NAV_LIST_GROUP).prev(Xe.NAV_ITEMS).children(Xe.NAV_LINKS).addClass(Ye.ACTIVE)), e(this._scrollElement).trigger(Qe.ACTIVATE, {relatedTarget: t})
      }, n._clear = function () {
        [].slice.call(document.querySelectorAll(this._selector)).filter(function (t) {
          return t.classList.contains(Ye.ACTIVE)
        }).forEach(function (t) {
          return t.classList.remove(Ye.ACTIVE)
        })
      }, t._jQueryInterface = function (n) {
        return this.each(function () {
          var i = e(this).data("bs.scrollspy"), o = "object" == typeof n && n;
          if (i || (i = new t(this, o), e(this).data("bs.scrollspy", i)), "string" == typeof n) {
            if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
            i[n]()
          }
        })
      }, i(t, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }, {
        key: "Default", get: function () {
          return Ke
        }
      }]), t
    }();
  e(window).on(Qe.LOAD_DATA_API, function () {
    for (var t = [].slice.call(document.querySelectorAll(Xe.DATA_SPY)), n = t.length; n--;) {
      var i = e(t[n]);
      $e._jQueryInterface.call(i, i.data())
    }
  }), e.fn[Be] = $e._jQueryInterface, e.fn[Be].Constructor = $e, e.fn[Be].noConflict = function () {
    return e.fn[Be] = Ge, $e._jQueryInterface
  };
  var Je = e.fn.tab, Ze = {
    HIDE: "hide.bs.tab",
    HIDDEN: "hidden.bs.tab",
    SHOW: "show.bs.tab",
    SHOWN: "shown.bs.tab",
    CLICK_DATA_API: "click.bs.tab.data-api"
  }, tn = {DROPDOWN_MENU: "dropdown-menu", ACTIVE: "active", DISABLED: "disabled", FADE: "fade", SHOW: "show"}, en = {
    DROPDOWN: ".dropdown",
    NAV_LIST_GROUP: ".nav, .list-group",
    ACTIVE: ".active",
    ACTIVE_UL: "> li > .active",
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: ".dropdown-toggle",
    DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
  }, nn = function () {
    function t(t) {
      this._element = t
    }

    var n = t.prototype;
    return n.show = function () {
      var t = this;
      if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass(tn.ACTIVE) || e(this._element).hasClass(tn.DISABLED))) {
        var n, i, o = e(this._element).closest(en.NAV_LIST_GROUP)[0], r = st.getSelectorFromElement(this._element);
        if (o) {
          var s = "UL" === o.nodeName || "OL" === o.nodeName ? en.ACTIVE_UL : en.ACTIVE;
          i = e.makeArray(e(o).find(s)), i = i[i.length - 1]
        }
        var a = e.Event(Ze.HIDE, {relatedTarget: this._element}), l = e.Event(Ze.SHOW, {relatedTarget: i});
        if (i && e(i).trigger(a), e(this._element).trigger(l), !l.isDefaultPrevented() && !a.isDefaultPrevented()) {
          r && (n = document.querySelector(r)), this._activate(this._element, o);
          var c = function () {
            var n = e.Event(Ze.HIDDEN, {relatedTarget: t._element}), o = e.Event(Ze.SHOWN, {relatedTarget: i});
            e(i).trigger(n), e(t._element).trigger(o)
          };
          n ? this._activate(n, n.parentNode, c) : c()
        }
      }
    }, n.dispose = function () {
      e.removeData(this._element, "bs.tab"), this._element = null
    }, n._activate = function (t, n, i) {
      var o = this,
        r = (!n || "UL" !== n.nodeName && "OL" !== n.nodeName ? e(n).children(en.ACTIVE) : e(n).find(en.ACTIVE_UL))[0],
        s = i && r && e(r).hasClass(tn.FADE), a = function () {
          return o._transitionComplete(t, r, i)
        };
      if (r && s) {
        var l = st.getTransitionDurationFromElement(r);
        e(r).removeClass(tn.SHOW).one(st.TRANSITION_END, a).emulateTransitionEnd(l)
      } else a()
    }, n._transitionComplete = function (t, n, i) {
      if (n) {
        e(n).removeClass(tn.ACTIVE);
        var o = e(n.parentNode).find(en.DROPDOWN_ACTIVE_CHILD)[0];
        o && e(o).removeClass(tn.ACTIVE), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
      }
      if (e(t).addClass(tn.ACTIVE), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), st.reflow(t), t.classList.contains(tn.FADE) && t.classList.add(tn.SHOW), t.parentNode && e(t.parentNode).hasClass(tn.DROPDOWN_MENU)) {
        var r = e(t).closest(en.DROPDOWN)[0];
        if (r) {
          var s = [].slice.call(r.querySelectorAll(en.DROPDOWN_TOGGLE));
          e(s).addClass(tn.ACTIVE)
        }
        t.setAttribute("aria-expanded", !0)
      }
      i && i()
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this), o = i.data("bs.tab");
        if (o || (o = new t(this), i.data("bs.tab", o)), "string" == typeof n) {
          if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');
          o[n]()
        }
      })
    }, i(t, null, [{
      key: "VERSION", get: function () {
        return "4.3.1"
      }
    }]), t
  }();
  e(document).on(Ze.CLICK_DATA_API, en.DATA_TOGGLE, function (t) {
    t.preventDefault(), nn._jQueryInterface.call(e(this), "show")
  }), e.fn.tab = nn._jQueryInterface, e.fn.tab.Constructor = nn, e.fn.tab.noConflict = function () {
    return e.fn.tab = Je, nn._jQueryInterface
  };
  var on = e.fn.toast, rn = {
      CLICK_DISMISS: "click.dismiss.bs.toast",
      HIDE: "hide.bs.toast",
      HIDDEN: "hidden.bs.toast",
      SHOW: "show.bs.toast",
      SHOWN: "shown.bs.toast"
    }, sn = {FADE: "fade", HIDE: "hide", SHOW: "show", SHOWING: "showing"},
    an = {animation: "boolean", autohide: "boolean", delay: "number"}, ln = {animation: !0, autohide: !0, delay: 500},
    cn = {DATA_DISMISS: '[data-dismiss="toast"]'}, un = function () {
      function t(t, e) {
        this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
      }

      var n = t.prototype;
      return n.show = function () {
        var t = this;
        e(this._element).trigger(rn.SHOW), this._config.animation && this._element.classList.add(sn.FADE);
        var n = function () {
          t._element.classList.remove(sn.SHOWING), t._element.classList.add(sn.SHOW), e(t._element).trigger(rn.SHOWN), t._config.autohide && t.hide()
        };
        if (this._element.classList.remove(sn.HIDE), this._element.classList.add(sn.SHOWING), this._config.animation) {
          var i = st.getTransitionDurationFromElement(this._element);
          e(this._element).one(st.TRANSITION_END, n).emulateTransitionEnd(i)
        } else n()
      }, n.hide = function (t) {
        var n = this;
        this._element.classList.contains(sn.SHOW) && (e(this._element).trigger(rn.HIDE), t ? this._close() : this._timeout = setTimeout(function () {
          n._close()
        }, this._config.delay))
      }, n.dispose = function () {
        clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(sn.SHOW) && this._element.classList.remove(sn.SHOW), e(this._element).off(rn.CLICK_DISMISS), e.removeData(this._element, "bs.toast"), this._element = null, this._config = null
      }, n._getConfig = function (t) {
        return t = r({}, ln, e(this._element).data(), "object" == typeof t && t ? t : {}), st.typeCheckConfig("toast", t, this.constructor.DefaultType), t
      }, n._setListeners = function () {
        var t = this;
        e(this._element).on(rn.CLICK_DISMISS, cn.DATA_DISMISS, function () {
          return t.hide(!0)
        })
      }, n._close = function () {
        var t = this, n = function () {
          t._element.classList.add(sn.HIDE), e(t._element).trigger(rn.HIDDEN)
        };
        if (this._element.classList.remove(sn.SHOW), this._config.animation) {
          var i = st.getTransitionDurationFromElement(this._element);
          e(this._element).one(st.TRANSITION_END, n).emulateTransitionEnd(i)
        } else n()
      }, t._jQueryInterface = function (n) {
        return this.each(function () {
          var i = e(this), o = i.data("bs.toast"), r = "object" == typeof n && n;
          if (o || (o = new t(this, r), i.data("bs.toast", o)), "string" == typeof n) {
            if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');
            o[n](this)
          }
        })
      }, i(t, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }, {
        key: "DefaultType", get: function () {
          return an
        }
      }, {
        key: "Default", get: function () {
          return ln
        }
      }]), t
    }();
  e.fn.toast = un._jQueryInterface, e.fn.toast.Constructor = un, e.fn.toast.noConflict = function () {
    return e.fn.toast = on, un._jQueryInterface
  }, function () {
    if (void 0 === e) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
    var t = e.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || t[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
  }(), t.Util = st, t.Alert = ft, t.Button = _t, t.Carousel = At, t.Collapse = kt, t.Dropdown = ce, t.Modal = ge, t.Popover = je, t.Scrollspy = $e, t.Tab = nn, t.Toast = un, t.Tooltip = He, Object.defineProperty(t, "__esModule", {value: !0})
});
