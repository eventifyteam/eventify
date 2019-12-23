!function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : (t = t || self, e(t.bootstrap = {}, t.jQuery, t.Popper))
}(this, function (t, e, n) {
  "use strict";

  function i(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
    }
  }

  function o(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t
  }

  function s(t, e, n) {
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
        s(t, e, n[e])
      })
    }
    return t
  }

  function a(t, e) {
    t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
  }

  function l(t) {
    return {}.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase()
  }

  function c(t, e) {
    var n = t.nodeName.toLowerCase();
    if (-1 !== e.indexOf(n)) return -1 === rt.indexOf(n) || Boolean(t.nodeValue.match(lt) || t.nodeValue.match(ct));
    for (var i = e.filter(function (t) {
      return t instanceof RegExp
    }), o = 0, s = i.length; o < s; o++) if (n.match(i[o])) return !0;
    return !1
  }

  function h(t, e, n) {
    if (0 === t.length) return t;
    if (n && "function" == typeof n) return n(t);
    for (var i = (new window.DOMParser).parseFromString(t, "text/html"), o = Object.keys(e), s = [].slice.call(i.body.querySelectorAll("*")), r = 0, a = s.length; r < a; r++) !function (t, n) {
      var i = s[t], r = i.nodeName.toLowerCase();
      if (-1 === o.indexOf(i.nodeName.toLowerCase())) return i.parentNode.removeChild(i), "continue";
      var a = [].slice.call(i.attributes), l = [].concat(e["*"] || [], e[r] || []);
      a.forEach(function (t) {
        c(t, l) || i.removeAttribute(t.nodeName)
      })
    }(r);
    return i.body.innerHTML
  }

  e = e && e.hasOwnProperty("default") ? e.default : e, n = n && n.hasOwnProperty("default") ? n.default : n;
  var u = "transitionend", f = {
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
      var n = e(t).css("transition-duration"), i = e(t).css("transition-delay"), o = parseFloat(n), s = parseFloat(i);
      return o || s ? (n = n.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(n) + parseFloat(i))) : 0
    }, reflow: function (t) {
      return t.offsetHeight
    }, triggerTransitionEnd: function (t) {
      e(t).trigger(u)
    }, supportsTransitionEnd: function () {
      return Boolean(u)
    }, isElement: function (t) {
      return (t[0] || t).nodeType
    }, typeCheckConfig: function (t, e, n) {
      for (var i in n) if (Object.prototype.hasOwnProperty.call(n, i)) {
        var o = n[i], s = e[i], r = s && f.isElement(s) ? "element" : l(s);
        if (!new RegExp(o).test(r)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + r + '" but expected type "' + o + '".')
      }
    }, findShadowRoot: function (t) {
      if (!document.documentElement.attachShadow) return null;
      if ("function" == typeof t.getRootNode) {
        var e = t.getRootNode();
        return e instanceof ShadowRoot ? e : null
      }
      return t instanceof ShadowRoot ? t : t.parentNode ? f.findShadowRoot(t.parentNode) : null
    }
  };
  e.fn.emulateTransitionEnd = function (t) {
    var n = this, i = !1;
    return e(this).one(f.TRANSITION_END, function () {
      i = !0
    }), setTimeout(function () {
      i || f.triggerTransitionEnd(n)
    }, t), this
  }, e.event.special[f.TRANSITION_END] = {
    bindType: u, delegateType: u, handle: function (t) {
      if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
    }
  };
  var d = "alert", _ = e.fn[d], g = {DISMISS: '[data-dismiss="alert"]'},
    m = {CLOSE: "close.bs.alert", CLOSED: "closed.bs.alert", CLICK_DATA_API: "click.bs.alert.data-api"},
    p = {ALERT: "alert", FADE: "fade", SHOW: "show"}, E = function () {
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
        var n = f.getSelectorFromElement(t), i = !1;
        return n && (i = document.querySelector(n)), i || (i = e(t).closest("." + p.ALERT)[0]), i
      }, n._triggerCloseEvent = function (t) {
        var n = e.Event(m.CLOSE);
        return e(t).trigger(n), n
      }, n._removeElement = function (t) {
        var n = this;
        if (e(t).removeClass(p.SHOW), e(t).hasClass(p.FADE)) {
          var i = f.getTransitionDurationFromElement(t);
          e(t).one(f.TRANSITION_END, function (e) {
            return n._destroyElement(t, e)
          }).emulateTransitionEnd(i)
        } else this._destroyElement(t)
      }, n._destroyElement = function (t) {
        e(t).detach().trigger(m.CLOSED).remove()
      }, t._jQueryInterface = function (n) {
        return this.each(function () {
          var i = e(this), o = i.data("bs.alert");
          o || (o = new t(this), i.data("bs.alert", o)), "close" === n && o[n](this)
        })
      }, t._handleDismiss = function (t) {
        return function (e) {
          e && e.preventDefault(), t.close(this)
        }
      }, o(t, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }]), t
    }();
  e(document).on(m.CLICK_DATA_API, g.DISMISS, E._handleDismiss(new E)), e.fn[d] = E._jQueryInterface, e.fn[d].Constructor = E, e.fn[d].noConflict = function () {
    return e.fn[d] = _, E._jQueryInterface
  };
  var v = e.fn.button, T = {ACTIVE: "active", BUTTON: "btn", FOCUS: "focus"}, S = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: ".active",
    BUTTON: ".btn"
  }, I = {
    CLICK_DATA_API: "click.bs.button.data-api",
    FOCUS_BLUR_DATA_API: "focus.bs.button.data-api blur.bs.button.data-api"
  }, A = function () {
    function t(t) {
      this._element = t
    }

    var n = t.prototype;
    return n.toggle = function () {
      var t = !0, n = !0, i = e(this._element).closest(S.DATA_TOGGLE)[0];
      if (i) {
        var o = this._element.querySelector(S.INPUT);
        if (o) {
          if ("radio" === o.type) if (o.checked && this._element.classList.contains(T.ACTIVE)) t = !1; else {
            var s = i.querySelector(S.ACTIVE);
            s && e(s).removeClass(T.ACTIVE)
          }
          if (t) {
            if (o.hasAttribute("disabled") || i.hasAttribute("disabled") || o.classList.contains("disabled") || i.classList.contains("disabled")) return;
            o.checked = !this._element.classList.contains(T.ACTIVE), e(o).trigger("change")
          }
          o.focus(), n = !1
        }
      }
      n && this._element.setAttribute("aria-pressed", !this._element.classList.contains(T.ACTIVE)), t && e(this._element).toggleClass(T.ACTIVE)
    }, n.dispose = function () {
      e.removeData(this._element, "bs.button"), this._element = null
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this).data("bs.button");
        i || (i = new t(this), e(this).data("bs.button", i)), "toggle" === n && i[n]()
      })
    }, o(t, null, [{
      key: "VERSION", get: function () {
        return "4.3.1"
      }
    }]), t
  }();
  e(document).on(I.CLICK_DATA_API, S.DATA_TOGGLE_CARROT, function (t) {
    t.preventDefault();
    var n = t.target;
    e(n).hasClass(T.BUTTON) || (n = e(n).closest(S.BUTTON)), A._jQueryInterface.call(e(n), "toggle")
  }).on(I.FOCUS_BLUR_DATA_API, S.DATA_TOGGLE_CARROT, function (t) {
    var n = e(t.target).closest(S.BUTTON)[0];
    e(n).toggleClass(T.FOCUS, /^focus(in)?$/.test(t.type))
  }), e.fn.button = A._jQueryInterface, e.fn.button.Constructor = A, e.fn.button.noConflict = function () {
    return e.fn.button = v, A._jQueryInterface
  };
  var C = "carousel", b = e.fn[C], O = {interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0},
    D = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean",
      touch: "boolean"
    }, y = {NEXT: "next", PREV: "prev", LEFT: "left", RIGHT: "right"}, N = {
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
    }, w = {
      CAROUSEL: "carousel",
      ACTIVE: "active",
      SLIDE: "slide",
      RIGHT: "carousel-item-right",
      LEFT: "carousel-item-left",
      NEXT: "carousel-item-next",
      PREV: "carousel-item-prev",
      ITEM: "carousel-item",
      POINTER_EVENT: "pointer-event"
    }, L = {
      ACTIVE: ".active",
      ACTIVE_ITEM: ".active.carousel-item",
      ITEM: ".carousel-item",
      ITEM_IMG: ".carousel-item img",
      NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
      INDICATORS: ".carousel-indicators",
      DATA_SLIDE: "[data-slide], [data-slide-to]",
      DATA_RIDE: '[data-ride="carousel"]'
    }, P = {TOUCH: "touch", PEN: "pen"}, R = function () {
      function t(t, e) {
        this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(L.INDICATORS), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
      }

      var n = t.prototype;
      return n.next = function () {
        this._isSliding || this._slide(y.NEXT)
      }, n.nextWhenVisible = function () {
        !document.hidden && e(this._element).is(":visible") && "hidden" !== e(this._element).css("visibility") && this.next()
      }, n.prev = function () {
        this._isSliding || this._slide(y.PREV)
      }, n.pause = function (t) {
        t || (this._isPaused = !0), this._element.querySelector(L.NEXT_PREV) && (f.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
      }, n.cycle = function (t) {
        t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
      }, n.to = function (t) {
        var n = this;
        this._activeElement = this._element.querySelector(L.ACTIVE_ITEM);
        var i = this._getItemIndex(this._activeElement);
        if (!(t > this._items.length - 1 || t < 0)) if (this._isSliding) e(this._element).one(N.SLID, function () {
          return n.to(t)
        }); else {
          if (i === t) return this.pause(), void this.cycle();
          var o = t > i ? y.NEXT : y.PREV;
          this._slide(o, this._items[t])
        }
      }, n.dispose = function () {
        e(this._element).off(".bs.carousel"), e.removeData(this._element, "bs.carousel"), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
      }, n._getConfig = function (t) {
        return t = r({}, O, t), f.typeCheckConfig(C, t, D), t
      }, n._handleSwipe = function () {
        var t = Math.abs(this.touchDeltaX);
        if (!(t <= 40)) {
          var e = t / this.touchDeltaX;
          e > 0 && this.prev(), e < 0 && this.next()
        }
      }, n._addEventListeners = function () {
        var t = this;
        this._config.keyboard && e(this._element).on(N.KEYDOWN, function (e) {
          return t._keydown(e)
        }), "hover" === this._config.pause && e(this._element).on(N.MOUSEENTER, function (e) {
          return t.pause(e)
        }).on(N.MOUSELEAVE, function (e) {
          return t.cycle(e)
        }), this._config.touch && this._addTouchEventListeners()
      }, n._addTouchEventListeners = function () {
        var t = this;
        if (this._touchSupported) {
          var n = function (e) {
            t._pointerEvent && P[e.originalEvent.pointerType.toUpperCase()] ? t.touchStartX = e.originalEvent.clientX : t._pointerEvent || (t.touchStartX = e.originalEvent.touches[0].clientX)
          }, i = function (e) {
            e.originalEvent.touches && e.originalEvent.touches.length > 1 ? t.touchDeltaX = 0 : t.touchDeltaX = e.originalEvent.touches[0].clientX - t.touchStartX
          }, o = function (e) {
            t._pointerEvent && P[e.originalEvent.pointerType.toUpperCase()] && (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX), t._handleSwipe(), "hover" === t._config.pause && (t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function (e) {
              return t.cycle(e)
            }, 500 + t._config.interval))
          };
          e(this._element.querySelectorAll(L.ITEM_IMG)).on(N.DRAG_START, function (t) {
            return t.preventDefault()
          }), this._pointerEvent ? (e(this._element).on(N.POINTERDOWN, function (t) {
            return n(t)
          }), e(this._element).on(N.POINTERUP, function (t) {
            return o(t)
          }), this._element.classList.add(w.POINTER_EVENT)) : (e(this._element).on(N.TOUCHSTART, function (t) {
            return n(t)
          }), e(this._element).on(N.TOUCHMOVE, function (t) {
            return i(t)
          }), e(this._element).on(N.TOUCHEND, function (t) {
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
        return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(L.ITEM)) : [], this._items.indexOf(t)
      }, n._getItemByDirection = function (t, e) {
        var n = t === y.NEXT, i = t === y.PREV, o = this._getItemIndex(e), s = this._items.length - 1;
        if ((i && 0 === o || n && o === s) && !this._config.wrap) return e;
        var r = (o + (t === y.PREV ? -1 : 1)) % this._items.length;
        return -1 === r ? this._items[this._items.length - 1] : this._items[r]
      }, n._triggerSlideEvent = function (t, n) {
        var i = this._getItemIndex(t), o = this._getItemIndex(this._element.querySelector(L.ACTIVE_ITEM)),
          s = e.Event(N.SLIDE, {relatedTarget: t, direction: n, from: o, to: i});
        return e(this._element).trigger(s), s
      }, n._setActiveIndicatorElement = function (t) {
        if (this._indicatorsElement) {
          var n = [].slice.call(this._indicatorsElement.querySelectorAll(L.ACTIVE));
          e(n).removeClass(w.ACTIVE);
          var i = this._indicatorsElement.children[this._getItemIndex(t)];
          i && e(i).addClass(w.ACTIVE)
        }
      }, n._slide = function (t, n) {
        var i, o, s, r = this, a = this._element.querySelector(L.ACTIVE_ITEM), l = this._getItemIndex(a),
          c = n || a && this._getItemByDirection(t, a), h = this._getItemIndex(c), u = Boolean(this._interval);
        if (t === y.NEXT ? (i = w.LEFT, o = w.NEXT, s = y.LEFT) : (i = w.RIGHT, o = w.PREV, s = y.RIGHT), c && e(c).hasClass(w.ACTIVE)) this._isSliding = !1; else if (!this._triggerSlideEvent(c, s).isDefaultPrevented() && a && c) {
          this._isSliding = !0, u && this.pause(), this._setActiveIndicatorElement(c);
          var d = e.Event(N.SLID, {relatedTarget: c, direction: s, from: l, to: h});
          if (e(this._element).hasClass(w.SLIDE)) {
            e(c).addClass(o), f.reflow(c), e(a).addClass(i), e(c).addClass(i);
            var _ = parseInt(c.getAttribute("data-interval"), 10);
            _ ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = _) : this._config.interval = this._config.defaultInterval || this._config.interval;
            var g = f.getTransitionDurationFromElement(a);
            e(a).one(f.TRANSITION_END, function () {
              e(c).removeClass(i + " " + o).addClass(w.ACTIVE), e(a).removeClass(w.ACTIVE + " " + o + " " + i), r._isSliding = !1, setTimeout(function () {
                return e(r._element).trigger(d)
              }, 0)
            }).emulateTransitionEnd(g)
          } else e(a).removeClass(w.ACTIVE), e(c).addClass(w.ACTIVE), this._isSliding = !1, e(this._element).trigger(d);
          u && this.cycle()
        }
      }, t._jQueryInterface = function (n) {
        return this.each(function () {
          var i = e(this).data("bs.carousel"), o = r({}, O, e(this).data());
          "object" == typeof n && (o = r({}, o, n));
          var s = "string" == typeof n ? n : o.slide;
          if (i || (i = new t(this, o), e(this).data("bs.carousel", i)), "number" == typeof n) i.to(n); else if ("string" == typeof s) {
            if (void 0 === i[s]) throw new TypeError('No method named "' + s + '"');
            i[s]()
          } else o.interval && o.ride && (i.pause(), i.cycle())
        })
      }, t._dataApiClickHandler = function (n) {
        var i = f.getSelectorFromElement(this);
        if (i) {
          var o = e(i)[0];
          if (o && e(o).hasClass(w.CAROUSEL)) {
            var s = r({}, e(o).data(), e(this).data()), a = this.getAttribute("data-slide-to");
            a && (s.interval = !1), t._jQueryInterface.call(e(o), s), a && e(o).data("bs.carousel").to(a), n.preventDefault()
          }
        }
      }, o(t, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }, {
        key: "Default", get: function () {
          return O
        }
      }]), t
    }();
  e(document).on(N.CLICK_DATA_API, L.DATA_SLIDE, R._dataApiClickHandler), e(window).on(N.LOAD_DATA_API, function () {
    for (var t = [].slice.call(document.querySelectorAll(L.DATA_RIDE)), n = 0, i = t.length; n < i; n++) {
      var o = e(t[n]);
      R._jQueryInterface.call(o, o.data())
    }
  }), e.fn[C] = R._jQueryInterface, e.fn[C].Constructor = R, e.fn[C].noConflict = function () {
    return e.fn[C] = b, R._jQueryInterface
  };
  var H = "collapse", W = e.fn[H], k = {toggle: !0, parent: ""}, F = {toggle: "boolean", parent: "(string|element)"},
    V = {
      SHOW: "show.bs.collapse",
      SHOWN: "shown.bs.collapse",
      HIDE: "hide.bs.collapse",
      HIDDEN: "hidden.bs.collapse",
      CLICK_DATA_API: "click.bs.collapse.data-api"
    }, U = {SHOW: "show", COLLAPSE: "collapse", COLLAPSING: "collapsing", COLLAPSED: "collapsed"},
    M = {WIDTH: "width", HEIGHT: "height"},
    j = {ACTIVES: ".show, .collapsing", DATA_TOGGLE: '[data-toggle="collapse"]'}, G = function () {
      function t(t, e) {
        this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
        for (var n = [].slice.call(document.querySelectorAll(j.DATA_TOGGLE)), i = 0, o = n.length; i < o; i++) {
          var s = n[i], r = f.getSelectorFromElement(s),
            a = [].slice.call(document.querySelectorAll(r)).filter(function (e) {
              return e === t
            });
          null !== r && a.length > 0 && (this._selector = r, this._triggerArray.push(s))
        }
        this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
      }

      var n = t.prototype;
      return n.toggle = function () {
        e(this._element).hasClass(U.SHOW) ? this.hide() : this.show()
      }, n.show = function () {
        var n = this;
        if (!this._isTransitioning && !e(this._element).hasClass(U.SHOW)) {
          var i, o;
          if (this._parent && 0 === (i = [].slice.call(this._parent.querySelectorAll(j.ACTIVES)).filter(function (t) {
            return "string" == typeof n._config.parent ? t.getAttribute("data-parent") === n._config.parent : t.classList.contains(U.COLLAPSE)
          })).length && (i = null), !(i && (o = e(i).not(this._selector).data("bs.collapse")) && o._isTransitioning)) {
            var s = e.Event(V.SHOW);
            if (e(this._element).trigger(s), !s.isDefaultPrevented()) {
              i && (t._jQueryInterface.call(e(i).not(this._selector), "hide"), o || e(i).data("bs.collapse", null));
              var r = this._getDimension();
              e(this._element).removeClass(U.COLLAPSE).addClass(U.COLLAPSING), this._element.style[r] = 0, this._triggerArray.length && e(this._triggerArray).removeClass(U.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);
              var a = "scroll" + (r[0].toUpperCase() + r.slice(1)), l = f.getTransitionDurationFromElement(this._element);
              e(this._element).one(f.TRANSITION_END, function () {
                e(n._element).removeClass(U.COLLAPSING).addClass(U.COLLAPSE).addClass(U.SHOW), n._element.style[r] = "", n.setTransitioning(!1), e(n._element).trigger(V.SHOWN)
              }).emulateTransitionEnd(l), this._element.style[r] = this._element[a] + "px"
            }
          }
        }
      }, n.hide = function () {
        var t = this;
        if (!this._isTransitioning && e(this._element).hasClass(U.SHOW)) {
          var n = e.Event(V.HIDE);
          if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
            var i = this._getDimension();
            this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", f.reflow(this._element), e(this._element).addClass(U.COLLAPSING).removeClass(U.COLLAPSE).removeClass(U.SHOW);
            var o = this._triggerArray.length;
            if (o > 0) for (var s = 0; s < o; s++) {
              var r = this._triggerArray[s], a = f.getSelectorFromElement(r);
              null !== a && (e([].slice.call(document.querySelectorAll(a))).hasClass(U.SHOW) || e(r).addClass(U.COLLAPSED).attr("aria-expanded", !1))
            }
            this.setTransitioning(!0), this._element.style[i] = "";
            var l = f.getTransitionDurationFromElement(this._element);
            e(this._element).one(f.TRANSITION_END, function () {
              t.setTransitioning(!1), e(t._element).removeClass(U.COLLAPSING).addClass(U.COLLAPSE).trigger(V.HIDDEN)
            }).emulateTransitionEnd(l)
          }
        }
      }, n.setTransitioning = function (t) {
        this._isTransitioning = t
      }, n.dispose = function () {
        e.removeData(this._element, "bs.collapse"), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
      }, n._getConfig = function (t) {
        return t = r({}, k, t), t.toggle = Boolean(t.toggle), f.typeCheckConfig(H, t, F), t
      }, n._getDimension = function () {
        return e(this._element).hasClass(M.WIDTH) ? M.WIDTH : M.HEIGHT
      }, n._getParent = function () {
        var n, i = this;
        f.isElement(this._config.parent) ? (n = this._config.parent, void 0 !== this._config.parent.jquery && (n = this._config.parent[0])) : n = document.querySelector(this._config.parent);
        var o = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
          s = [].slice.call(n.querySelectorAll(o));
        return e(s).each(function (e, n) {
          i._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n])
        }), n
      }, n._addAriaAndCollapsedClass = function (t, n) {
        var i = e(t).hasClass(U.SHOW);
        n.length && e(n).toggleClass(U.COLLAPSED, !i).attr("aria-expanded", i)
      }, t._getTargetFromElement = function (t) {
        var e = f.getSelectorFromElement(t);
        return e ? document.querySelector(e) : null
      }, t._jQueryInterface = function (n) {
        return this.each(function () {
          var i = e(this), o = i.data("bs.collapse"), s = r({}, k, i.data(), "object" == typeof n && n ? n : {});
          if (!o && s.toggle && /show|hide/.test(n) && (s.toggle = !1), o || (o = new t(this, s), i.data("bs.collapse", o)), "string" == typeof n) {
            if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');
            o[n]()
          }
        })
      }, o(t, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }, {
        key: "Default", get: function () {
          return k
        }
      }]), t
    }();
  e(document).on(V.CLICK_DATA_API, j.DATA_TOGGLE, function (t) {
    "A" === t.currentTarget.tagName && t.preventDefault();
    var n = e(this), i = f.getSelectorFromElement(this), o = [].slice.call(document.querySelectorAll(i));
    e(o).each(function () {
      var t = e(this), i = t.data("bs.collapse") ? "toggle" : n.data();
      G._jQueryInterface.call(t, i)
    })
  }), e.fn[H] = G._jQueryInterface, e.fn[H].Constructor = G, e.fn[H].noConflict = function () {
    return e.fn[H] = W, G._jQueryInterface
  };
  var B = "dropdown", x = e.fn[B], K = new RegExp("38|40|27"), q = {
    HIDE: "hide.bs.dropdown",
    HIDDEN: "hidden.bs.dropdown",
    SHOW: "show.bs.dropdown",
    SHOWN: "shown.bs.dropdown",
    CLICK: "click.bs.dropdown",
    CLICK_DATA_API: "click.bs.dropdown.data-api",
    KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api",
    KEYUP_DATA_API: "keyup.bs.dropdown.data-api"
  }, Q = {
    DISABLED: "disabled",
    SHOW: "show",
    DROPUP: "dropup",
    DROPRIGHT: "dropright",
    DROPLEFT: "dropleft",
    MENURIGHT: "dropdown-menu-right",
    MENULEFT: "dropdown-menu-left",
    POSITION_STATIC: "position-static"
  }, Y = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: ".dropdown form",
    MENU: ".dropdown-menu",
    NAVBAR_NAV: ".navbar-nav",
    VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
  }, X = {
    TOP: "top-start",
    TOPEND: "top-end",
    BOTTOM: "bottom-start",
    BOTTOMEND: "bottom-end",
    RIGHT: "right-start",
    RIGHTEND: "right-end",
    LEFT: "left-start",
    LEFTEND: "left-end"
  }, z = {offset: 0, flip: !0, boundary: "scrollParent", reference: "toggle", display: "dynamic"}, $ = {
    offset: "(number|string|function)",
    flip: "boolean",
    boundary: "(string|element)",
    reference: "(string|element)",
    display: "string"
  }, J = function () {
    function t(t, e) {
      this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
    }

    var i = t.prototype;
    return i.toggle = function () {
      if (!this._element.disabled && !e(this._element).hasClass(Q.DISABLED)) {
        var i = t._getParentFromElement(this._element), o = e(this._menu).hasClass(Q.SHOW);
        if (t._clearMenus(), !o) {
          var s = {relatedTarget: this._element}, r = e.Event(q.SHOW, s);
          if (e(i).trigger(r), !r.isDefaultPrevented()) {
            if (!this._inNavbar) {
              if (void 0 === n) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
              var a = this._element;
              "parent" === this._config.reference ? a = i : f.isElement(this._config.reference) && (a = this._config.reference, void 0 !== this._config.reference.jquery && (a = this._config.reference[0])), "scrollParent" !== this._config.boundary && e(i).addClass(Q.POSITION_STATIC), this._popper = new n(a, this._menu, this._getPopperConfig())
            }
            "ontouchstart" in document.documentElement && 0 === e(i).closest(Y.NAVBAR_NAV).length && e(document.body).children().on("mouseover", null, e.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), e(this._menu).toggleClass(Q.SHOW), e(i).toggleClass(Q.SHOW).trigger(e.Event(q.SHOWN, s))
          }
        }
      }
    }, i.show = function () {
      if (!(this._element.disabled || e(this._element).hasClass(Q.DISABLED) || e(this._menu).hasClass(Q.SHOW))) {
        var n = {relatedTarget: this._element}, i = e.Event(q.SHOW, n), o = t._getParentFromElement(this._element);
        e(o).trigger(i), i.isDefaultPrevented() || (e(this._menu).toggleClass(Q.SHOW), e(o).toggleClass(Q.SHOW).trigger(e.Event(q.SHOWN, n)))
      }
    }, i.hide = function () {
      if (!this._element.disabled && !e(this._element).hasClass(Q.DISABLED) && e(this._menu).hasClass(Q.SHOW)) {
        var n = {relatedTarget: this._element}, i = e.Event(q.HIDE, n), o = t._getParentFromElement(this._element);
        e(o).trigger(i), i.isDefaultPrevented() || (e(this._menu).toggleClass(Q.SHOW), e(o).toggleClass(Q.SHOW).trigger(e.Event(q.HIDDEN, n)))
      }
    }, i.dispose = function () {
      e.removeData(this._element, "bs.dropdown"), e(this._element).off(".bs.dropdown"), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
    }, i.update = function () {
      this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
    }, i._addEventListeners = function () {
      var t = this;
      e(this._element).on(q.CLICK, function (e) {
        e.preventDefault(), e.stopPropagation(), t.toggle()
      })
    }, i._getConfig = function (t) {
      return t = r({}, this.constructor.Default, e(this._element).data(), t), f.typeCheckConfig(B, t, this.constructor.DefaultType), t
    }, i._getMenuElement = function () {
      if (!this._menu) {
        var e = t._getParentFromElement(this._element);
        e && (this._menu = e.querySelector(Y.MENU))
      }
      return this._menu
    }, i._getPlacement = function () {
      var t = e(this._element.parentNode), n = X.BOTTOM;
      return t.hasClass(Q.DROPUP) ? (n = X.TOP, e(this._menu).hasClass(Q.MENURIGHT) && (n = X.TOPEND)) : t.hasClass(Q.DROPRIGHT) ? n = X.RIGHT : t.hasClass(Q.DROPLEFT) ? n = X.LEFT : e(this._menu).hasClass(Q.MENURIGHT) && (n = X.BOTTOMEND), n
    }, i._detectNavbar = function () {
      return e(this._element).closest(".navbar").length > 0
    }, i._getOffset = function () {
      var t = this, e = {};
      return "function" == typeof this._config.offset ? e.fn = function (e) {
        return e.offsets = r({}, e.offsets, t._config.offset(e.offsets, t._element) || {}), e
      } : e.offset = this._config.offset, e
    }, i._getPopperConfig = function () {
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
      if (!n || 3 !== n.which && ("keyup" !== n.type || 9 === n.which)) for (var i = [].slice.call(document.querySelectorAll(Y.DATA_TOGGLE)), o = 0, s = i.length; o < s; o++) {
        var r = t._getParentFromElement(i[o]), a = e(i[o]).data("bs.dropdown"), l = {relatedTarget: i[o]};
        if (n && "click" === n.type && (l.clickEvent = n), a) {
          var c = a._menu;
          if (e(r).hasClass(Q.SHOW) && !(n && ("click" === n.type && /input|textarea/i.test(n.target.tagName) || "keyup" === n.type && 9 === n.which) && e.contains(r, n.target))) {
            var h = e.Event(q.HIDE, l);
            e(r).trigger(h), h.isDefaultPrevented() || ("ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), i[o].setAttribute("aria-expanded", "false"), e(c).removeClass(Q.SHOW), e(r).removeClass(Q.SHOW).trigger(e.Event(q.HIDDEN, l)))
          }
        }
      }
    }, t._getParentFromElement = function (t) {
      var e, n = f.getSelectorFromElement(t);
      return n && (e = document.querySelector(n)), e || t.parentNode
    }, t._dataApiKeydownHandler = function (n) {
      if ((/input|textarea/i.test(n.target.tagName) ? !(32 === n.which || 27 !== n.which && (40 !== n.which && 38 !== n.which || e(n.target).closest(Y.MENU).length)) : K.test(n.which)) && (n.preventDefault(), n.stopPropagation(), !this.disabled && !e(this).hasClass(Q.DISABLED))) {
        var i = t._getParentFromElement(this), o = e(i).hasClass(Q.SHOW);
        if (o && (!o || 27 !== n.which && 32 !== n.which)) {
          var s = [].slice.call(i.querySelectorAll(Y.VISIBLE_ITEMS));
          if (0 !== s.length) {
            var r = s.indexOf(n.target);
            38 === n.which && r > 0 && r--, 40 === n.which && r < s.length - 1 && r++, r < 0 && (r = 0), s[r].focus()
          }
        } else {
          if (27 === n.which) {
            var a = i.querySelector(Y.DATA_TOGGLE);
            e(a).trigger("focus")
          }
          e(this).trigger("click")
        }
      }
    }, o(t, null, [{
      key: "VERSION", get: function () {
        return "4.3.1"
      }
    }, {
      key: "Default", get: function () {
        return z
      }
    }, {
      key: "DefaultType", get: function () {
        return $
      }
    }]), t
  }();
  e(document).on(q.KEYDOWN_DATA_API, Y.DATA_TOGGLE, J._dataApiKeydownHandler).on(q.KEYDOWN_DATA_API, Y.MENU, J._dataApiKeydownHandler).on(q.CLICK_DATA_API + " " + q.KEYUP_DATA_API, J._clearMenus).on(q.CLICK_DATA_API, Y.DATA_TOGGLE, function (t) {
    t.preventDefault(), t.stopPropagation(), J._jQueryInterface.call(e(this), "toggle")
  }).on(q.CLICK_DATA_API, Y.FORM_CHILD, function (t) {
    t.stopPropagation()
  }), e.fn[B] = J._jQueryInterface, e.fn[B].Constructor = J, e.fn[B].noConflict = function () {
    return e.fn[B] = x, J._jQueryInterface
  };
  var Z = e.fn.modal, tt = {backdrop: !0, keyboard: !0, focus: !0, show: !0},
    et = {backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean"}, nt = {
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
    }, it = {
      SCROLLABLE: "modal-dialog-scrollable",
      SCROLLBAR_MEASURER: "modal-scrollbar-measure",
      BACKDROP: "modal-backdrop",
      OPEN: "modal-open",
      FADE: "fade",
      SHOW: "show"
    }, ot = {
      DIALOG: ".modal-dialog",
      MODAL_BODY: ".modal-body",
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
      STICKY_CONTENT: ".sticky-top"
    }, st = function () {
      function t(t, e) {
        this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(ot.DIALOG), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
      }

      var n = t.prototype;
      return n.toggle = function (t) {
        return this._isShown ? this.hide() : this.show(t)
      }, n.show = function (t) {
        var n = this;
        if (!this._isShown && !this._isTransitioning) {
          e(this._element).hasClass(it.FADE) && (this._isTransitioning = !0);
          var i = e.Event(nt.SHOW, {relatedTarget: t});
          e(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), e(this._element).on(nt.CLICK_DISMISS, ot.DATA_DISMISS, function (t) {
            return n.hide(t)
          }), e(this._dialog).on(nt.MOUSEDOWN_DISMISS, function () {
            e(n._element).one(nt.MOUSEUP_DISMISS, function (t) {
              e(t.target).is(n._element) && (n._ignoreBackdropClick = !0)
            })
          }), this._showBackdrop(function () {
            return n._showElement(t)
          }))
        }
      }, n.hide = function (t) {
        var n = this;
        if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
          var i = e.Event(nt.HIDE);
          if (e(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
            this._isShown = !1;
            var o = e(this._element).hasClass(it.FADE);
            if (o && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), e(document).off(nt.FOCUSIN), e(this._element).removeClass(it.SHOW), e(this._element).off(nt.CLICK_DISMISS), e(this._dialog).off(nt.MOUSEDOWN_DISMISS), o) {
              var s = f.getTransitionDurationFromElement(this._element);
              e(this._element).one(f.TRANSITION_END, function (t) {
                return n._hideModal(t)
              }).emulateTransitionEnd(s)
            } else this._hideModal()
          }
        }
      }, n.dispose = function () {
        [window, this._element, this._dialog].forEach(function (t) {
          return e(t).off(".bs.modal")
        }), e(document).off(nt.FOCUSIN), e.removeData(this._element, "bs.modal"), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
      }, n.handleUpdate = function () {
        this._adjustDialog()
      }, n._getConfig = function (t) {
        return t = r({}, tt, t), f.typeCheckConfig("modal", t, et), t
      }, n._showElement = function (t) {
        var n = this, i = e(this._element).hasClass(it.FADE);
        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), e(this._dialog).hasClass(it.SCROLLABLE) ? this._dialog.querySelector(ot.MODAL_BODY).scrollTop = 0 : this._element.scrollTop = 0, i && f.reflow(this._element), e(this._element).addClass(it.SHOW), this._config.focus && this._enforceFocus();
        var o = e.Event(nt.SHOWN, {relatedTarget: t}), s = function () {
          n._config.focus && n._element.focus(), n._isTransitioning = !1, e(n._element).trigger(o)
        };
        if (i) {
          var r = f.getTransitionDurationFromElement(this._dialog);
          e(this._dialog).one(f.TRANSITION_END, s).emulateTransitionEnd(r)
        } else s()
      }, n._enforceFocus = function () {
        var t = this;
        e(document).off(nt.FOCUSIN).on(nt.FOCUSIN, function (n) {
          document !== n.target && t._element !== n.target && 0 === e(t._element).has(n.target).length && t._element.focus()
        })
      }, n._setEscapeEvent = function () {
        var t = this;
        this._isShown && this._config.keyboard ? e(this._element).on(nt.KEYDOWN_DISMISS, function (e) {
          27 === e.which && (e.preventDefault(), t.hide())
        }) : this._isShown || e(this._element).off(nt.KEYDOWN_DISMISS)
      }, n._setResizeEvent = function () {
        var t = this;
        this._isShown ? e(window).on(nt.RESIZE, function (e) {
          return t.handleUpdate(e)
        }) : e(window).off(nt.RESIZE)
      }, n._hideModal = function () {
        var t = this;
        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function () {
          e(document.body).removeClass(it.OPEN), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger(nt.HIDDEN)
        })
      }, n._removeBackdrop = function () {
        this._backdrop && (e(this._backdrop).remove(), this._backdrop = null)
      }, n._showBackdrop = function (t) {
        var n = this, i = e(this._element).hasClass(it.FADE) ? it.FADE : "";
        if (this._isShown && this._config.backdrop) {
          if (this._backdrop = document.createElement("div"), this._backdrop.className = it.BACKDROP, i && this._backdrop.classList.add(i), e(this._backdrop).appendTo(document.body), e(this._element).on(nt.CLICK_DISMISS, function (t) {
            n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
          }), i && f.reflow(this._backdrop), e(this._backdrop).addClass(it.SHOW), !t) return;
          if (!i) return void t();
          var o = f.getTransitionDurationFromElement(this._backdrop);
          e(this._backdrop).one(f.TRANSITION_END, t).emulateTransitionEnd(o)
        } else if (!this._isShown && this._backdrop) {
          e(this._backdrop).removeClass(it.SHOW);
          var s = function () {
            n._removeBackdrop(), t && t()
          };
          if (e(this._element).hasClass(it.FADE)) {
            var r = f.getTransitionDurationFromElement(this._backdrop);
            e(this._backdrop).one(f.TRANSITION_END, s).emulateTransitionEnd(r)
          } else s()
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
          var n = [].slice.call(document.querySelectorAll(ot.FIXED_CONTENT)),
            i = [].slice.call(document.querySelectorAll(ot.STICKY_CONTENT));
          e(n).each(function (n, i) {
            var o = i.style.paddingRight, s = e(i).css("padding-right");
            e(i).data("padding-right", o).css("padding-right", parseFloat(s) + t._scrollbarWidth + "px")
          }), e(i).each(function (n, i) {
            var o = i.style.marginRight, s = e(i).css("margin-right");
            e(i).data("margin-right", o).css("margin-right", parseFloat(s) - t._scrollbarWidth + "px")
          });
          var o = document.body.style.paddingRight, s = e(document.body).css("padding-right");
          e(document.body).data("padding-right", o).css("padding-right", parseFloat(s) + this._scrollbarWidth + "px")
        }
        e(document.body).addClass(it.OPEN)
      }, n._resetScrollbar = function () {
        var t = [].slice.call(document.querySelectorAll(ot.FIXED_CONTENT));
        e(t).each(function (t, n) {
          var i = e(n).data("padding-right");
          e(n).removeData("padding-right"), n.style.paddingRight = i || ""
        });
        var n = [].slice.call(document.querySelectorAll("" + ot.STICKY_CONTENT));
        e(n).each(function (t, n) {
          var i = e(n).data("margin-right");
          void 0 !== i && e(n).css("margin-right", i).removeData("margin-right")
        });
        var i = e(document.body).data("padding-right");
        e(document.body).removeData("padding-right"), document.body.style.paddingRight = i || ""
      }, n._getScrollbarWidth = function () {
        var t = document.createElement("div");
        t.className = it.SCROLLBAR_MEASURER, document.body.appendChild(t);
        var e = t.getBoundingClientRect().width - t.clientWidth;
        return document.body.removeChild(t), e
      }, t._jQueryInterface = function (n, i) {
        return this.each(function () {
          var o = e(this).data("bs.modal"), s = r({}, tt, e(this).data(), "object" == typeof n && n ? n : {});
          if (o || (o = new t(this, s), e(this).data("bs.modal", o)), "string" == typeof n) {
            if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');
            o[n](i)
          } else s.show && o.show(i)
        })
      }, o(t, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }, {
        key: "Default", get: function () {
          return tt
        }
      }]), t
    }();
  e(document).on(nt.CLICK_DATA_API, ot.DATA_TOGGLE, function (t) {
    var n, i = this, o = f.getSelectorFromElement(this);
    o && (n = document.querySelector(o));
    var s = e(n).data("bs.modal") ? "toggle" : r({}, e(n).data(), e(this).data());
    "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
    var a = e(n).one(nt.SHOW, function (t) {
      t.isDefaultPrevented() || a.one(nt.HIDDEN, function () {
        e(i).is(":visible") && i.focus()
      })
    });
    st._jQueryInterface.call(e(n), s, this)
  }), e.fn.modal = st._jQueryInterface, e.fn.modal.Constructor = st, e.fn.modal.noConflict = function () {
    return e.fn.modal = Z, st._jQueryInterface
  };
  var rt = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"], at = {
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
    }, lt = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
    ct = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i,
    ht = "tooltip", ut = e.fn[ht], ft = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
    dt = ["sanitize", "whiteList", "sanitizeFn"], _t = {
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
    }, gt = {AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left"}, mt = {
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
      whiteList: at
    }, pt = {SHOW: "show", OUT: "out"}, Et = {
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
    }, vt = {FADE: "fade", SHOW: "show"}, Tt = {TOOLTIP: ".tooltip", TOOLTIP_INNER: ".tooltip-inner", ARROW: ".arrow"},
    St = {HOVER: "hover", FOCUS: "focus", CLICK: "click", MANUAL: "manual"}, It = function () {
      function t(t, e) {
        if (void 0 === n) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
        this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
      }

      var i = t.prototype;
      return i.enable = function () {
        this._isEnabled = !0
      }, i.disable = function () {
        this._isEnabled = !1
      }, i.toggleEnabled = function () {
        this._isEnabled = !this._isEnabled
      }, i.toggle = function (t) {
        if (this._isEnabled) if (t) {
          var n = this.constructor.DATA_KEY, i = e(t.currentTarget).data(n);
          i || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
        } else {
          if (e(this.getTipElement()).hasClass(vt.SHOW)) return void this._leave(null, this);
          this._enter(null, this)
        }
      }, i.dispose = function () {
        clearTimeout(this._timeout), e.removeData(this.element, this.constructor.DATA_KEY), e(this.element).off(this.constructor.EVENT_KEY), e(this.element).closest(".modal").off("hide.bs.modal"), this.tip && e(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
      }, i.show = function () {
        var t = this;
        if ("none" === e(this.element).css("display")) throw new Error("Please use show on visible elements");
        var i = e.Event(this.constructor.Event.SHOW);
        if (this.isWithContent() && this._isEnabled) {
          e(this.element).trigger(i);
          var o = f.findShadowRoot(this.element),
            s = e.contains(null !== o ? o : this.element.ownerDocument.documentElement, this.element);
          if (i.isDefaultPrevented() || !s) return;
          var r = this.getTipElement(), a = f.getUID(this.constructor.NAME);
          r.setAttribute("id", a), this.element.setAttribute("aria-describedby", a), this.setContent(), this.config.animation && e(r).addClass(vt.FADE);
          var l = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
            c = this._getAttachment(l);
          this.addAttachmentClass(c);
          var h = this._getContainer();
          e(r).data(this.constructor.DATA_KEY, this), e.contains(this.element.ownerDocument.documentElement, this.tip) || e(r).appendTo(h), e(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new n(this.element, r, {
            placement: c,
            modifiers: {
              offset: this._getOffset(),
              flip: {behavior: this.config.fallbackPlacement},
              arrow: {element: Tt.ARROW},
              preventOverflow: {boundariesElement: this.config.boundary}
            },
            onCreate: function (e) {
              e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e)
            },
            onUpdate: function (e) {
              return t._handlePopperPlacementChange(e)
            }
          }), e(r).addClass(vt.SHOW), "ontouchstart" in document.documentElement && e(document.body).children().on("mouseover", null, e.noop);
          var u = function () {
            t.config.animation && t._fixTransition();
            var n = t._hoverState;
            t._hoverState = null, e(t.element).trigger(t.constructor.Event.SHOWN), n === pt.OUT && t._leave(null, t)
          };
          if (e(this.tip).hasClass(vt.FADE)) {
            var d = f.getTransitionDurationFromElement(this.tip);
            e(this.tip).one(f.TRANSITION_END, u).emulateTransitionEnd(d)
          } else u()
        }
      }, i.hide = function (t) {
        var n = this, i = this.getTipElement(), o = e.Event(this.constructor.Event.HIDE), s = function () {
          n._hoverState !== pt.SHOW && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), e(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), t && t()
        };
        if (e(this.element).trigger(o), !o.isDefaultPrevented()) {
          if (e(i).removeClass(vt.SHOW), "ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), this._activeTrigger[St.CLICK] = !1, this._activeTrigger[St.FOCUS] = !1, this._activeTrigger[St.HOVER] = !1, e(this.tip).hasClass(vt.FADE)) {
            var r = f.getTransitionDurationFromElement(i);
            e(i).one(f.TRANSITION_END, s).emulateTransitionEnd(r)
          } else s();
          this._hoverState = ""
        }
      }, i.update = function () {
        null !== this._popper && this._popper.scheduleUpdate()
      }, i.isWithContent = function () {
        return Boolean(this.getTitle())
      }, i.addAttachmentClass = function (t) {
        e(this.getTipElement()).addClass("bs-tooltip-" + t)
      }, i.getTipElement = function () {
        return this.tip = this.tip || e(this.config.template)[0], this.tip
      }, i.setContent = function () {
        var t = this.getTipElement();
        this.setElementContent(e(t.querySelectorAll(Tt.TOOLTIP_INNER)), this.getTitle()), e(t).removeClass(vt.FADE + " " + vt.SHOW)
      }, i.setElementContent = function (t, n) {
        "object" != typeof n || !n.nodeType && !n.jquery ? this.config.html ? (this.config.sanitize && (n = h(n, this.config.whiteList, this.config.sanitizeFn)), t.html(n)) : t.text(n) : this.config.html ? e(n).parent().is(t) || t.empty().append(n) : t.text(e(n).text())
      }, i.getTitle = function () {
        var t = this.element.getAttribute("data-original-title");
        return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
      }, i._getOffset = function () {
        var t = this, e = {};
        return "function" == typeof this.config.offset ? e.fn = function (e) {
          return e.offsets = r({}, e.offsets, t.config.offset(e.offsets, t.element) || {}), e
        } : e.offset = this.config.offset, e
      }, i._getContainer = function () {
        return !1 === this.config.container ? document.body : f.isElement(this.config.container) ? e(this.config.container) : e(document).find(this.config.container)
      }, i._getAttachment = function (t) {
        return gt[t.toUpperCase()]
      }, i._setListeners = function () {
        var t = this;
        this.config.trigger.split(" ").forEach(function (n) {
          if ("click" === n) e(t.element).on(t.constructor.Event.CLICK, t.config.selector, function (e) {
            return t.toggle(e)
          }); else if (n !== St.MANUAL) {
            var i = n === St.HOVER ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
              o = n === St.HOVER ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
            e(t.element).on(i, t.config.selector, function (e) {
              return t._enter(e)
            }).on(o, t.config.selector, function (e) {
              return t._leave(e)
            })
          }
        }), e(this.element).closest(".modal").on("hide.bs.modal", function () {
          t.element && t.hide()
        }), this.config.selector ? this.config = r({}, this.config, {trigger: "manual", selector: ""}) : this._fixTitle()
      }, i._fixTitle = function () {
        var t = typeof this.element.getAttribute("data-original-title");
        (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
      }, i._enter = function (t, n) {
        var i = this.constructor.DATA_KEY;
        (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusin" === t.type ? St.FOCUS : St.HOVER] = !0), e(n.getTipElement()).hasClass(vt.SHOW) || n._hoverState === pt.SHOW ? n._hoverState = pt.SHOW : (clearTimeout(n._timeout), n._hoverState = pt.SHOW, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function () {
          n._hoverState === pt.SHOW && n.show()
        }, n.config.delay.show) : n.show())
      }, i._leave = function (t, n) {
        var i = this.constructor.DATA_KEY;
        (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusout" === t.type ? St.FOCUS : St.HOVER] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = pt.OUT, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function () {
          n._hoverState === pt.OUT && n.hide()
        }, n.config.delay.hide) : n.hide())
      }, i._isWithActiveTrigger = function () {
        for (var t in this._activeTrigger) if (this._activeTrigger[t]) return !0;
        return !1
      }, i._getConfig = function (t) {
        var n = e(this.element).data();
        return Object.keys(n).forEach(function (t) {
          -1 !== dt.indexOf(t) && delete n[t]
        }), "number" == typeof (t = r({}, this.constructor.Default, n, "object" == typeof t && t ? t : {})).delay && (t.delay = {
          show: t.delay,
          hide: t.delay
        }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), f.typeCheckConfig(ht, t, this.constructor.DefaultType), t.sanitize && (t.template = h(t.template, t.whiteList, t.sanitizeFn)), t
      }, i._getDelegateConfig = function () {
        var t = {};
        if (this.config) for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
        return t
      }, i._cleanTipClass = function () {
        var t = e(this.getTipElement()), n = t.attr("class").match(ft);
        null !== n && n.length && t.removeClass(n.join(""))
      }, i._handlePopperPlacementChange = function (t) {
        var e = t.instance;
        this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
      }, i._fixTransition = function () {
        var t = this.getTipElement(), n = this.config.animation;
        null === t.getAttribute("x-placement") && (e(t).removeClass(vt.FADE), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
      }, t._jQueryInterface = function (n) {
        return this.each(function () {
          var i = e(this).data("bs.tooltip"), o = "object" == typeof n && n;
          if ((i || !/dispose|hide/.test(n)) && (i || (i = new t(this, o), e(this).data("bs.tooltip", i)), "string" == typeof n)) {
            if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
            i[n]()
          }
        })
      }, o(t, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }, {
        key: "Default", get: function () {
          return mt
        }
      }, {
        key: "NAME", get: function () {
          return ht
        }
      }, {
        key: "DATA_KEY", get: function () {
          return "bs.tooltip"
        }
      }, {
        key: "Event", get: function () {
          return Et
        }
      }, {
        key: "EVENT_KEY", get: function () {
          return ".bs.tooltip"
        }
      }, {
        key: "DefaultType", get: function () {
          return _t
        }
      }]), t
    }();
  e.fn[ht] = It._jQueryInterface, e.fn[ht].Constructor = It, e.fn[ht].noConflict = function () {
    return e.fn[ht] = ut, It._jQueryInterface
  };
  var At = "popover", Ct = e.fn[At], bt = new RegExp("(^|\\s)bs-popover\\S+", "g"), Ot = r({}, It.Default, {
      placement: "right",
      trigger: "click",
      content: "",
      template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }), Dt = r({}, It.DefaultType, {content: "(string|element|function)"}), yt = {FADE: "fade", SHOW: "show"},
    Nt = {TITLE: ".popover-header", CONTENT: ".popover-body"}, wt = {
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
    }, Lt = function (t) {
      function n() {
        return t.apply(this, arguments) || this
      }

      a(n, t);
      var i = n.prototype;
      return i.isWithContent = function () {
        return this.getTitle() || this._getContent()
      }, i.addAttachmentClass = function (t) {
        e(this.getTipElement()).addClass("bs-popover-" + t)
      }, i.getTipElement = function () {
        return this.tip = this.tip || e(this.config.template)[0], this.tip
      }, i.setContent = function () {
        var t = e(this.getTipElement());
        this.setElementContent(t.find(Nt.TITLE), this.getTitle());
        var n = this._getContent();
        "function" == typeof n && (n = n.call(this.element)), this.setElementContent(t.find(Nt.CONTENT), n), t.removeClass(yt.FADE + " " + yt.SHOW)
      }, i._getContent = function () {
        return this.element.getAttribute("data-content") || this.config.content
      }, i._cleanTipClass = function () {
        var t = e(this.getTipElement()), n = t.attr("class").match(bt);
        null !== n && n.length > 0 && t.removeClass(n.join(""))
      }, n._jQueryInterface = function (t) {
        return this.each(function () {
          var i = e(this).data("bs.popover"), o = "object" == typeof t ? t : null;
          if ((i || !/dispose|hide/.test(t)) && (i || (i = new n(this, o), e(this).data("bs.popover", i)), "string" == typeof t)) {
            if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
            i[t]()
          }
        })
      }, o(n, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }, {
        key: "Default", get: function () {
          return Ot
        }
      }, {
        key: "NAME", get: function () {
          return At
        }
      }, {
        key: "DATA_KEY", get: function () {
          return "bs.popover"
        }
      }, {
        key: "Event", get: function () {
          return wt
        }
      }, {
        key: "EVENT_KEY", get: function () {
          return ".bs.popover"
        }
      }, {
        key: "DefaultType", get: function () {
          return Dt
        }
      }]), n
    }(It);
  e.fn[At] = Lt._jQueryInterface, e.fn[At].Constructor = Lt, e.fn[At].noConflict = function () {
    return e.fn[At] = Ct, Lt._jQueryInterface
  };
  var Pt = "scrollspy", Rt = e.fn[Pt], Ht = {offset: 10, method: "auto", target: ""},
    Wt = {offset: "number", method: "string", target: "(string|element)"}, kt = {
      ACTIVATE: "activate.bs.scrollspy",
      SCROLL: "scroll.bs.scrollspy",
      LOAD_DATA_API: "load.bs.scrollspy.data-api"
    }, Ft = {DROPDOWN_ITEM: "dropdown-item", DROPDOWN_MENU: "dropdown-menu", ACTIVE: "active"}, Vt = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: ".active",
      NAV_LIST_GROUP: ".nav, .list-group",
      NAV_LINKS: ".nav-link",
      NAV_ITEMS: ".nav-item",
      LIST_ITEMS: ".list-group-item",
      DROPDOWN: ".dropdown",
      DROPDOWN_ITEMS: ".dropdown-item",
      DROPDOWN_TOGGLE: ".dropdown-toggle"
    }, Ut = {OFFSET: "offset", POSITION: "position"}, Mt = function () {
      function t(t, n) {
        var i = this;
        this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(n), this._selector = this._config.target + " " + Vt.NAV_LINKS + "," + this._config.target + " " + Vt.LIST_ITEMS + "," + this._config.target + " " + Vt.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, e(this._scrollElement).on(kt.SCROLL, function (t) {
          return i._process(t)
        }), this.refresh(), this._process()
      }

      var n = t.prototype;
      return n.refresh = function () {
        var t = this, n = this._scrollElement === this._scrollElement.window ? Ut.OFFSET : Ut.POSITION,
          i = "auto" === this._config.method ? n : this._config.method, o = i === Ut.POSITION ? this._getScrollTop() : 0;
        this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (t) {
          var n, s = f.getSelectorFromElement(t);
          if (s && (n = document.querySelector(s)), n) {
            var r = n.getBoundingClientRect();
            if (r.width || r.height) return [e(n)[i]().top + o, s]
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
        if ("string" != typeof (t = r({}, Ht, "object" == typeof t && t ? t : {})).target) {
          var n = e(t.target).attr("id");
          n || (n = f.getUID(Pt), e(t.target).attr("id", n)), t.target = "#" + n
        }
        return f.typeCheckConfig(Pt, t, Wt), t
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
        i.hasClass(Ft.DROPDOWN_ITEM) ? (i.closest(Vt.DROPDOWN).find(Vt.DROPDOWN_TOGGLE).addClass(Ft.ACTIVE), i.addClass(Ft.ACTIVE)) : (i.addClass(Ft.ACTIVE), i.parents(Vt.NAV_LIST_GROUP).prev(Vt.NAV_LINKS + ", " + Vt.LIST_ITEMS).addClass(Ft.ACTIVE), i.parents(Vt.NAV_LIST_GROUP).prev(Vt.NAV_ITEMS).children(Vt.NAV_LINKS).addClass(Ft.ACTIVE)), e(this._scrollElement).trigger(kt.ACTIVATE, {relatedTarget: t})
      }, n._clear = function () {
        [].slice.call(document.querySelectorAll(this._selector)).filter(function (t) {
          return t.classList.contains(Ft.ACTIVE)
        }).forEach(function (t) {
          return t.classList.remove(Ft.ACTIVE)
        })
      }, t._jQueryInterface = function (n) {
        return this.each(function () {
          var i = e(this).data("bs.scrollspy"), o = "object" == typeof n && n;
          if (i || (i = new t(this, o), e(this).data("bs.scrollspy", i)), "string" == typeof n) {
            if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
            i[n]()
          }
        })
      }, o(t, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }, {
        key: "Default", get: function () {
          return Ht
        }
      }]), t
    }();
  e(window).on(kt.LOAD_DATA_API, function () {
    for (var t = [].slice.call(document.querySelectorAll(Vt.DATA_SPY)), n = t.length; n--;) {
      var i = e(t[n]);
      Mt._jQueryInterface.call(i, i.data())
    }
  }), e.fn[Pt] = Mt._jQueryInterface, e.fn[Pt].Constructor = Mt, e.fn[Pt].noConflict = function () {
    return e.fn[Pt] = Rt, Mt._jQueryInterface
  };
  var jt = e.fn.tab, Gt = {
    HIDE: "hide.bs.tab",
    HIDDEN: "hidden.bs.tab",
    SHOW: "show.bs.tab",
    SHOWN: "shown.bs.tab",
    CLICK_DATA_API: "click.bs.tab.data-api"
  }, Bt = {DROPDOWN_MENU: "dropdown-menu", ACTIVE: "active", DISABLED: "disabled", FADE: "fade", SHOW: "show"}, xt = {
    DROPDOWN: ".dropdown",
    NAV_LIST_GROUP: ".nav, .list-group",
    ACTIVE: ".active",
    ACTIVE_UL: "> li > .active",
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: ".dropdown-toggle",
    DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
  }, Kt = function () {
    function t(t) {
      this._element = t
    }

    var n = t.prototype;
    return n.show = function () {
      var t = this;
      if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass(Bt.ACTIVE) || e(this._element).hasClass(Bt.DISABLED))) {
        var n, i, o = e(this._element).closest(xt.NAV_LIST_GROUP)[0], s = f.getSelectorFromElement(this._element);
        if (o) {
          var r = "UL" === o.nodeName || "OL" === o.nodeName ? xt.ACTIVE_UL : xt.ACTIVE;
          i = e.makeArray(e(o).find(r)), i = i[i.length - 1]
        }
        var a = e.Event(Gt.HIDE, {relatedTarget: this._element}), l = e.Event(Gt.SHOW, {relatedTarget: i});
        if (i && e(i).trigger(a), e(this._element).trigger(l), !l.isDefaultPrevented() && !a.isDefaultPrevented()) {
          s && (n = document.querySelector(s)), this._activate(this._element, o);
          var c = function () {
            var n = e.Event(Gt.HIDDEN, {relatedTarget: t._element}), o = e.Event(Gt.SHOWN, {relatedTarget: i});
            e(i).trigger(n), e(t._element).trigger(o)
          };
          n ? this._activate(n, n.parentNode, c) : c()
        }
      }
    }, n.dispose = function () {
      e.removeData(this._element, "bs.tab"), this._element = null
    }, n._activate = function (t, n, i) {
      var o = this,
        s = (!n || "UL" !== n.nodeName && "OL" !== n.nodeName ? e(n).children(xt.ACTIVE) : e(n).find(xt.ACTIVE_UL))[0],
        r = i && s && e(s).hasClass(Bt.FADE), a = function () {
          return o._transitionComplete(t, s, i)
        };
      if (s && r) {
        var l = f.getTransitionDurationFromElement(s);
        e(s).removeClass(Bt.SHOW).one(f.TRANSITION_END, a).emulateTransitionEnd(l)
      } else a()
    }, n._transitionComplete = function (t, n, i) {
      if (n) {
        e(n).removeClass(Bt.ACTIVE);
        var o = e(n.parentNode).find(xt.DROPDOWN_ACTIVE_CHILD)[0];
        o && e(o).removeClass(Bt.ACTIVE), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
      }
      if (e(t).addClass(Bt.ACTIVE), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), f.reflow(t), t.classList.contains(Bt.FADE) && t.classList.add(Bt.SHOW), t.parentNode && e(t.parentNode).hasClass(Bt.DROPDOWN_MENU)) {
        var s = e(t).closest(xt.DROPDOWN)[0];
        if (s) {
          var r = [].slice.call(s.querySelectorAll(xt.DROPDOWN_TOGGLE));
          e(r).addClass(Bt.ACTIVE)
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
    }, o(t, null, [{
      key: "VERSION", get: function () {
        return "4.3.1"
      }
    }]), t
  }();
  e(document).on(Gt.CLICK_DATA_API, xt.DATA_TOGGLE, function (t) {
    t.preventDefault(), Kt._jQueryInterface.call(e(this), "show")
  }), e.fn.tab = Kt._jQueryInterface, e.fn.tab.Constructor = Kt, e.fn.tab.noConflict = function () {
    return e.fn.tab = jt, Kt._jQueryInterface
  };
  var qt = e.fn.toast, Qt = {
      CLICK_DISMISS: "click.dismiss.bs.toast",
      HIDE: "hide.bs.toast",
      HIDDEN: "hidden.bs.toast",
      SHOW: "show.bs.toast",
      SHOWN: "shown.bs.toast"
    }, Yt = {FADE: "fade", HIDE: "hide", SHOW: "show", SHOWING: "showing"},
    Xt = {animation: "boolean", autohide: "boolean", delay: "number"}, zt = {animation: !0, autohide: !0, delay: 500},
    $t = {DATA_DISMISS: '[data-dismiss="toast"]'}, Jt = function () {
      function t(t, e) {
        this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
      }

      var n = t.prototype;
      return n.show = function () {
        var t = this;
        e(this._element).trigger(Qt.SHOW), this._config.animation && this._element.classList.add(Yt.FADE);
        var n = function () {
          t._element.classList.remove(Yt.SHOWING), t._element.classList.add(Yt.SHOW), e(t._element).trigger(Qt.SHOWN), t._config.autohide && t.hide()
        };
        if (this._element.classList.remove(Yt.HIDE), this._element.classList.add(Yt.SHOWING), this._config.animation) {
          var i = f.getTransitionDurationFromElement(this._element);
          e(this._element).one(f.TRANSITION_END, n).emulateTransitionEnd(i)
        } else n()
      }, n.hide = function (t) {
        var n = this;
        this._element.classList.contains(Yt.SHOW) && (e(this._element).trigger(Qt.HIDE), t ? this._close() : this._timeout = setTimeout(function () {
          n._close()
        }, this._config.delay))
      }, n.dispose = function () {
        clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(Yt.SHOW) && this._element.classList.remove(Yt.SHOW), e(this._element).off(Qt.CLICK_DISMISS), e.removeData(this._element, "bs.toast"), this._element = null, this._config = null
      }, n._getConfig = function (t) {
        return t = r({}, zt, e(this._element).data(), "object" == typeof t && t ? t : {}), f.typeCheckConfig("toast", t, this.constructor.DefaultType), t
      }, n._setListeners = function () {
        var t = this;
        e(this._element).on(Qt.CLICK_DISMISS, $t.DATA_DISMISS, function () {
          return t.hide(!0)
        })
      }, n._close = function () {
        var t = this, n = function () {
          t._element.classList.add(Yt.HIDE), e(t._element).trigger(Qt.HIDDEN)
        };
        if (this._element.classList.remove(Yt.SHOW), this._config.animation) {
          var i = f.getTransitionDurationFromElement(this._element);
          e(this._element).one(f.TRANSITION_END, n).emulateTransitionEnd(i)
        } else n()
      }, t._jQueryInterface = function (n) {
        return this.each(function () {
          var i = e(this), o = i.data("bs.toast"), s = "object" == typeof n && n;
          if (o || (o = new t(this, s), i.data("bs.toast", o)), "string" == typeof n) {
            if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');
            o[n](this)
          }
        })
      }, o(t, null, [{
        key: "VERSION", get: function () {
          return "4.3.1"
        }
      }, {
        key: "DefaultType", get: function () {
          return Xt
        }
      }, {
        key: "Default", get: function () {
          return zt
        }
      }]), t
    }();
  e.fn.toast = Jt._jQueryInterface, e.fn.toast.Constructor = Jt, e.fn.toast.noConflict = function () {
    return e.fn.toast = qt, Jt._jQueryInterface
  }, function () {
    if (void 0 === e) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
    var t = e.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || t[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
  }(), t.Util = f, t.Alert = E, t.Button = A, t.Carousel = R, t.Collapse = G, t.Dropdown = J, t.Modal = st, t.Popover = Lt, t.Scrollspy = Mt, t.Tab = Kt, t.Toast = Jt, t.Tooltip = It, Object.defineProperty(t, "__esModule", {value: !0})
});
