(async () => {
  (function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const a of document.querySelectorAll('link[rel="modulepreload"]')) n(a);
    new MutationObserver((a) => {
      for (const i of a) if (i.type === "childList") for (const s of i.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && n(s);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function l(a) {
      const i = {};
      return a.integrity && (i.integrity = a.integrity), a.referrerPolicy && (i.referrerPolicy = a.referrerPolicy), a.crossOrigin === "use-credentials" ? i.credentials = "include" : a.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i;
    }
    function n(a) {
      if (a.ep) return;
      a.ep = true;
      const i = l(a);
      fetch(a.href, i);
    }
  })();
  function ch(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }
  var Gr = {
    exports: {}
  }, Fi = {};
  var sh = Symbol.for("react.transitional.element"), uh = Symbol.for("react.fragment");
  function Yr(e, t, l) {
    var n = null;
    if (l !== void 0 && (n = "" + l), t.key !== void 0 && (n = "" + t.key), "key" in t) {
      l = {};
      for (var a in t) a !== "key" && (l[a] = t[a]);
    } else l = t;
    return t = l.ref, {
      $$typeof: sh,
      type: e,
      key: n,
      ref: t !== void 0 ? t : null,
      props: l
    };
  }
  Fi.Fragment = uh;
  Fi.jsx = Yr;
  Fi.jsxs = Yr;
  Gr.exports = Fi;
  var c = Gr.exports, qr = {
    exports: {}
  }, Ii = {}, Qr = {
    exports: {}
  }, Xr = {};
  (function(e) {
    function t(D, B) {
      var O = D.length;
      D.push(B);
      e: for (; 0 < O; ) {
        var Q = O - 1 >>> 1, $ = D[Q];
        if (0 < a($, B)) D[Q] = B, D[O] = $, O = Q;
        else break e;
      }
    }
    function l(D) {
      return D.length === 0 ? null : D[0];
    }
    function n(D) {
      if (D.length === 0) return null;
      var B = D[0], O = D.pop();
      if (O !== B) {
        D[0] = O;
        e: for (var Q = 0, $ = D.length, Oe = $ >>> 1; Q < Oe; ) {
          var dt = 2 * (Q + 1) - 1, Xe = D[dt], _t = dt + 1, Ql = D[_t];
          if (0 > a(Xe, O)) _t < $ && 0 > a(Ql, Xe) ? (D[Q] = Ql, D[_t] = O, Q = _t) : (D[Q] = Xe, D[dt] = O, Q = dt);
          else if (_t < $ && 0 > a(Ql, O)) D[Q] = Ql, D[_t] = O, Q = _t;
          else break e;
        }
      }
      return B;
    }
    function a(D, B) {
      var O = D.sortIndex - B.sortIndex;
      return O !== 0 ? O : D.id - B.id;
    }
    if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var i = performance;
      e.unstable_now = function() {
        return i.now();
      };
    } else {
      var s = Date, u = s.now();
      e.unstable_now = function() {
        return s.now() - u;
      };
    }
    var o = [], d = [], g = 1, p = null, m = 3, x = false, j = false, z = false, A = false, f = typeof setTimeout == "function" ? setTimeout : null, r = typeof clearTimeout == "function" ? clearTimeout : null, h = typeof setImmediate < "u" ? setImmediate : null;
    function v(D) {
      for (var B = l(d); B !== null; ) {
        if (B.callback === null) n(d);
        else if (B.startTime <= D) n(d), B.sortIndex = B.expirationTime, t(o, B);
        else break;
        B = l(d);
      }
    }
    function T(D) {
      if (z = false, v(D), !j) if (l(o) !== null) j = true, L || (L = true, M());
      else {
        var B = l(d);
        B !== null && V(T, B.startTime - D);
      }
    }
    var L = false, y = -1, w = 5, b = -1;
    function N() {
      return A ? true : !(e.unstable_now() - b < w);
    }
    function E() {
      if (A = false, L) {
        var D = e.unstable_now();
        b = D;
        var B = true;
        try {
          e: {
            j = false, z && (z = false, r(y), y = -1), x = true;
            var O = m;
            try {
              t: {
                for (v(D), p = l(o); p !== null && !(p.expirationTime > D && N()); ) {
                  var Q = p.callback;
                  if (typeof Q == "function") {
                    p.callback = null, m = p.priorityLevel;
                    var $ = Q(p.expirationTime <= D);
                    if (D = e.unstable_now(), typeof $ == "function") {
                      p.callback = $, v(D), B = true;
                      break t;
                    }
                    p === l(o) && n(o), v(D);
                  } else n(o);
                  p = l(o);
                }
                if (p !== null) B = true;
                else {
                  var Oe = l(d);
                  Oe !== null && V(T, Oe.startTime - D), B = false;
                }
              }
              break e;
            } finally {
              p = null, m = O, x = false;
            }
            B = void 0;
          }
        } finally {
          B ? M() : L = false;
        }
      }
    }
    var M;
    if (typeof h == "function") M = function() {
      h(E);
    };
    else if (typeof MessageChannel < "u") {
      var k = new MessageChannel(), U = k.port2;
      k.port1.onmessage = E, M = function() {
        U.postMessage(null);
      };
    } else M = function() {
      f(E, 0);
    };
    function V(D, B) {
      y = f(function() {
        D(e.unstable_now());
      }, B);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(D) {
      D.callback = null;
    }, e.unstable_forceFrameRate = function(D) {
      0 > D || 125 < D ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < D ? Math.floor(1e3 / D) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return m;
    }, e.unstable_next = function(D) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var B = 3;
          break;
        default:
          B = m;
      }
      var O = m;
      m = B;
      try {
        return D();
      } finally {
        m = O;
      }
    }, e.unstable_requestPaint = function() {
      A = true;
    }, e.unstable_runWithPriority = function(D, B) {
      switch (D) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          D = 3;
      }
      var O = m;
      m = D;
      try {
        return B();
      } finally {
        m = O;
      }
    }, e.unstable_scheduleCallback = function(D, B, O) {
      var Q = e.unstable_now();
      switch (typeof O == "object" && O !== null ? (O = O.delay, O = typeof O == "number" && 0 < O ? Q + O : Q) : O = Q, D) {
        case 1:
          var $ = -1;
          break;
        case 2:
          $ = 250;
          break;
        case 5:
          $ = 1073741823;
          break;
        case 4:
          $ = 1e4;
          break;
        default:
          $ = 5e3;
      }
      return $ = O + $, D = {
        id: g++,
        callback: B,
        priorityLevel: D,
        startTime: O,
        expirationTime: $,
        sortIndex: -1
      }, O > Q ? (D.sortIndex = O, t(d, D), l(o) === null && D === l(d) && (z ? (r(y), y = -1) : z = true, V(T, O - Q))) : (D.sortIndex = $, t(o, D), j || x || (j = true, L || (L = true, M()))), D;
    }, e.unstable_shouldYield = N, e.unstable_wrapCallback = function(D) {
      var B = m;
      return function() {
        var O = m;
        m = B;
        try {
          return D.apply(this, arguments);
        } finally {
          m = O;
        }
      };
    };
  })(Xr);
  Qr.exports = Xr;
  var oh = Qr.exports, Zr = {
    exports: {}
  }, q = {};
  var nu = Symbol.for("react.transitional.element"), rh = Symbol.for("react.portal"), fh = Symbol.for("react.fragment"), dh = Symbol.for("react.strict_mode"), hh = Symbol.for("react.profiler"), mh = Symbol.for("react.consumer"), xh = Symbol.for("react.context"), ph = Symbol.for("react.forward_ref"), gh = Symbol.for("react.suspense"), vh = Symbol.for("react.memo"), Vr = Symbol.for("react.lazy"), bh = Symbol.for("react.activity"), oo = Symbol.iterator;
  function yh(e) {
    return e === null || typeof e != "object" ? null : (e = oo && e[oo] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Kr = {
    isMounted: function() {
      return false;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Jr = Object.assign, $r = {};
  function An(e, t, l) {
    this.props = e, this.context = t, this.refs = $r, this.updater = l || Kr;
  }
  An.prototype.isReactComponent = {};
  An.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState");
  };
  An.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  };
  function Wr() {
  }
  Wr.prototype = An.prototype;
  function au(e, t, l) {
    this.props = e, this.context = t, this.refs = $r, this.updater = l || Kr;
  }
  var iu = au.prototype = new Wr();
  iu.constructor = au;
  Jr(iu, An.prototype);
  iu.isPureReactComponent = true;
  var ro = Array.isArray;
  function cs() {
  }
  var oe = {
    H: null,
    A: null,
    T: null,
    S: null
  }, Fr = Object.prototype.hasOwnProperty;
  function cu(e, t, l) {
    var n = l.ref;
    return {
      $$typeof: nu,
      type: e,
      key: t,
      ref: n !== void 0 ? n : null,
      props: l
    };
  }
  function zh(e, t) {
    return cu(e.type, t, e.props);
  }
  function su(e) {
    return typeof e == "object" && e !== null && e.$$typeof === nu;
  }
  function jh(e) {
    var t = {
      "=": "=0",
      ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(l) {
      return t[l];
    });
  }
  var fo = /\/+/g;
  function zc(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? jh("" + e.key) : t.toString(36);
  }
  function Sh(e) {
    switch (e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw e.reason;
      default:
        switch (typeof e.status == "string" ? e.then(cs, cs) : (e.status = "pending", e.then(function(t) {
          e.status === "pending" && (e.status = "fulfilled", e.value = t);
        }, function(t) {
          e.status === "pending" && (e.status = "rejected", e.reason = t);
        })), e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw e.reason;
        }
    }
    throw e;
  }
  function Jl(e, t, l, n, a) {
    var i = typeof e;
    (i === "undefined" || i === "boolean") && (e = null);
    var s = false;
    if (e === null) s = true;
    else switch (i) {
      case "bigint":
      case "string":
      case "number":
        s = true;
        break;
      case "object":
        switch (e.$$typeof) {
          case nu:
          case rh:
            s = true;
            break;
          case Vr:
            return s = e._init, Jl(s(e._payload), t, l, n, a);
        }
    }
    if (s) return a = a(e), s = n === "" ? "." + zc(e, 0) : n, ro(a) ? (l = "", s != null && (l = s.replace(fo, "$&/") + "/"), Jl(a, t, l, "", function(d) {
      return d;
    })) : a != null && (su(a) && (a = zh(a, l + (a.key == null || e && e.key === a.key ? "" : ("" + a.key).replace(fo, "$&/") + "/") + s)), t.push(a)), 1;
    s = 0;
    var u = n === "" ? "." : n + ":";
    if (ro(e)) for (var o = 0; o < e.length; o++) n = e[o], i = u + zc(n, o), s += Jl(n, t, l, i, a);
    else if (o = yh(e), typeof o == "function") for (e = o.call(e), o = 0; !(n = e.next()).done; ) n = n.value, i = u + zc(n, o++), s += Jl(n, t, l, i, a);
    else if (i === "object") {
      if (typeof e.then == "function") return Jl(Sh(e), t, l, n, a);
      throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    }
    return s;
  }
  function Ga(e, t, l) {
    if (e == null) return e;
    var n = [], a = 0;
    return Jl(e, n, "", "", function(i) {
      return t.call(l, i, a++);
    }), n;
  }
  function Nh(e) {
    if (e._status === -1) {
      var t = e._result;
      t = t(), t.then(function(l) {
        (e._status === 0 || e._status === -1) && (e._status = 1, e._result = l);
      }, function(l) {
        (e._status === 0 || e._status === -1) && (e._status = 2, e._result = l);
      }), e._status === -1 && (e._status = 0, e._result = t);
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
  }
  var ho = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: true,
        cancelable: true,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, _h = {
    map: Ga,
    forEach: function(e, t, l) {
      Ga(e, function() {
        t.apply(this, arguments);
      }, l);
    },
    count: function(e) {
      var t = 0;
      return Ga(e, function() {
        t++;
      }), t;
    },
    toArray: function(e) {
      return Ga(e, function(t) {
        return t;
      }) || [];
    },
    only: function(e) {
      if (!su(e)) throw Error("React.Children.only expected to receive a single React element child.");
      return e;
    }
  };
  q.Activity = bh;
  q.Children = _h;
  q.Component = An;
  q.Fragment = fh;
  q.Profiler = hh;
  q.PureComponent = au;
  q.StrictMode = dh;
  q.Suspense = gh;
  q.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = oe;
  q.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(e) {
      return oe.H.useMemoCache(e);
    }
  };
  q.cache = function(e) {
    return function() {
      return e.apply(null, arguments);
    };
  };
  q.cacheSignal = function() {
    return null;
  };
  q.cloneElement = function(e, t, l) {
    if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
    var n = Jr({}, e.props), a = e.key;
    if (t != null) for (i in t.key !== void 0 && (a = "" + t.key), t) !Fr.call(t, i) || i === "key" || i === "__self" || i === "__source" || i === "ref" && t.ref === void 0 || (n[i] = t[i]);
    var i = arguments.length - 2;
    if (i === 1) n.children = l;
    else if (1 < i) {
      for (var s = Array(i), u = 0; u < i; u++) s[u] = arguments[u + 2];
      n.children = s;
    }
    return cu(e.type, a, n);
  };
  q.createContext = function(e) {
    return e = {
      $$typeof: xh,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, e.Provider = e, e.Consumer = {
      $$typeof: mh,
      _context: e
    }, e;
  };
  q.createElement = function(e, t, l) {
    var n, a = {}, i = null;
    if (t != null) for (n in t.key !== void 0 && (i = "" + t.key), t) Fr.call(t, n) && n !== "key" && n !== "__self" && n !== "__source" && (a[n] = t[n]);
    var s = arguments.length - 2;
    if (s === 1) a.children = l;
    else if (1 < s) {
      for (var u = Array(s), o = 0; o < s; o++) u[o] = arguments[o + 2];
      a.children = u;
    }
    if (e && e.defaultProps) for (n in s = e.defaultProps, s) a[n] === void 0 && (a[n] = s[n]);
    return cu(e, i, a);
  };
  q.createRef = function() {
    return {
      current: null
    };
  };
  q.forwardRef = function(e) {
    return {
      $$typeof: ph,
      render: e
    };
  };
  q.isValidElement = su;
  q.lazy = function(e) {
    return {
      $$typeof: Vr,
      _payload: {
        _status: -1,
        _result: e
      },
      _init: Nh
    };
  };
  q.memo = function(e, t) {
    return {
      $$typeof: vh,
      type: e,
      compare: t === void 0 ? null : t
    };
  };
  q.startTransition = function(e) {
    var t = oe.T, l = {};
    oe.T = l;
    try {
      var n = e(), a = oe.S;
      a !== null && a(l, n), typeof n == "object" && n !== null && typeof n.then == "function" && n.then(cs, ho);
    } catch (i) {
      ho(i);
    } finally {
      t !== null && l.types !== null && (t.types = l.types), oe.T = t;
    }
  };
  q.unstable_useCacheRefresh = function() {
    return oe.H.useCacheRefresh();
  };
  q.use = function(e) {
    return oe.H.use(e);
  };
  q.useActionState = function(e, t, l) {
    return oe.H.useActionState(e, t, l);
  };
  q.useCallback = function(e, t) {
    return oe.H.useCallback(e, t);
  };
  q.useContext = function(e) {
    return oe.H.useContext(e);
  };
  q.useDebugValue = function() {
  };
  q.useDeferredValue = function(e, t) {
    return oe.H.useDeferredValue(e, t);
  };
  q.useEffect = function(e, t) {
    return oe.H.useEffect(e, t);
  };
  q.useEffectEvent = function(e) {
    return oe.H.useEffectEvent(e);
  };
  q.useId = function() {
    return oe.H.useId();
  };
  q.useImperativeHandle = function(e, t, l) {
    return oe.H.useImperativeHandle(e, t, l);
  };
  q.useInsertionEffect = function(e, t) {
    return oe.H.useInsertionEffect(e, t);
  };
  q.useLayoutEffect = function(e, t) {
    return oe.H.useLayoutEffect(e, t);
  };
  q.useMemo = function(e, t) {
    return oe.H.useMemo(e, t);
  };
  q.useOptimistic = function(e, t) {
    return oe.H.useOptimistic(e, t);
  };
  q.useReducer = function(e, t, l) {
    return oe.H.useReducer(e, t, l);
  };
  q.useRef = function(e) {
    return oe.H.useRef(e);
  };
  q.useState = function(e) {
    return oe.H.useState(e);
  };
  q.useSyncExternalStore = function(e, t, l) {
    return oe.H.useSyncExternalStore(e, t, l);
  };
  q.useTransition = function() {
    return oe.H.useTransition();
  };
  q.version = "19.2.3";
  Zr.exports = q;
  var C = Zr.exports;
  const wh = ch(C);
  var Ir = {
    exports: {}
  }, Be = {};
  var Th = C;
  function Pr(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++) t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function Kt() {
  }
  var Ue = {
    d: {
      f: Kt,
      r: function() {
        throw Error(Pr(522));
      },
      D: Kt,
      C: Kt,
      L: Kt,
      m: Kt,
      X: Kt,
      S: Kt,
      M: Kt
    },
    p: 0,
    findDOMNode: null
  }, Ah = Symbol.for("react.portal");
  function Dh(e, t, l) {
    var n = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: Ah,
      key: n == null ? null : "" + n,
      children: e,
      containerInfo: t,
      implementation: l
    };
  }
  var Jn = Th.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function Pi(e, t) {
    if (e === "font") return "";
    if (typeof t == "string") return t === "use-credentials" ? t : "";
  }
  Be.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Ue;
  Be.createPortal = function(e, t) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(Pr(299));
    return Dh(e, t, null, l);
  };
  Be.flushSync = function(e) {
    var t = Jn.T, l = Ue.p;
    try {
      if (Jn.T = null, Ue.p = 2, e) return e();
    } finally {
      Jn.T = t, Ue.p = l, Ue.d.f();
    }
  };
  Be.preconnect = function(e, t) {
    typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, Ue.d.C(e, t));
  };
  Be.prefetchDNS = function(e) {
    typeof e == "string" && Ue.d.D(e);
  };
  Be.preinit = function(e, t) {
    if (typeof e == "string" && t && typeof t.as == "string") {
      var l = t.as, n = Pi(l, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, i = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
      l === "style" ? Ue.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
        crossOrigin: n,
        integrity: a,
        fetchPriority: i
      }) : l === "script" && Ue.d.X(e, {
        crossOrigin: n,
        integrity: a,
        fetchPriority: i,
        nonce: typeof t.nonce == "string" ? t.nonce : void 0
      });
    }
  };
  Be.preinitModule = function(e, t) {
    if (typeof e == "string") if (typeof t == "object" && t !== null) {
      if (t.as == null || t.as === "script") {
        var l = Pi(t.as, t.crossOrigin);
        Ue.d.M(e, {
          crossOrigin: l,
          integrity: typeof t.integrity == "string" ? t.integrity : void 0,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0
        });
      }
    } else t == null && Ue.d.M(e);
  };
  Be.preload = function(e, t) {
    if (typeof e == "string" && typeof t == "object" && t !== null && typeof t.as == "string") {
      var l = t.as, n = Pi(l, t.crossOrigin);
      Ue.d.L(e, l, {
        crossOrigin: n,
        integrity: typeof t.integrity == "string" ? t.integrity : void 0,
        nonce: typeof t.nonce == "string" ? t.nonce : void 0,
        type: typeof t.type == "string" ? t.type : void 0,
        fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
        referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
        imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
        imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
        media: typeof t.media == "string" ? t.media : void 0
      });
    }
  };
  Be.preloadModule = function(e, t) {
    if (typeof e == "string") if (t) {
      var l = Pi(t.as, t.crossOrigin);
      Ue.d.m(e, {
        as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
        crossOrigin: l,
        integrity: typeof t.integrity == "string" ? t.integrity : void 0
      });
    } else Ue.d.m(e);
  };
  Be.requestFormReset = function(e) {
    Ue.d.r(e);
  };
  Be.unstable_batchedUpdates = function(e, t) {
    return e(t);
  };
  Be.useFormState = function(e, t, l) {
    return Jn.H.useFormState(e, t, l);
  };
  Be.useFormStatus = function() {
    return Jn.H.useHostTransitionStatus();
  };
  Be.version = "19.2.3";
  function ef() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ef);
    } catch (e) {
      console.error(e);
    }
  }
  ef(), Ir.exports = Be;
  var Eh = Ir.exports;
  var Se = oh, tf = C, Mh = Eh;
  function _(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++) t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function lf(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Na(e) {
    var t = e, l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, t.flags & 4098 && (l = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? l : null;
  }
  function nf(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function af(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function mo(e) {
    if (Na(e) !== e) throw Error(_(188));
  }
  function Ch(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Na(e), t === null) throw Error(_(188));
      return t !== e ? null : e;
    }
    for (var l = e, n = t; ; ) {
      var a = l.return;
      if (a === null) break;
      var i = a.alternate;
      if (i === null) {
        if (n = a.return, n !== null) {
          l = n;
          continue;
        }
        break;
      }
      if (a.child === i.child) {
        for (i = a.child; i; ) {
          if (i === l) return mo(a), e;
          if (i === n) return mo(a), t;
          i = i.sibling;
        }
        throw Error(_(188));
      }
      if (l.return !== n.return) l = a, n = i;
      else {
        for (var s = false, u = a.child; u; ) {
          if (u === l) {
            s = true, l = a, n = i;
            break;
          }
          if (u === n) {
            s = true, n = a, l = i;
            break;
          }
          u = u.sibling;
        }
        if (!s) {
          for (u = i.child; u; ) {
            if (u === l) {
              s = true, l = i, n = a;
              break;
            }
            if (u === n) {
              s = true, n = i, l = a;
              break;
            }
            u = u.sibling;
          }
          if (!s) throw Error(_(189));
        }
      }
      if (l.alternate !== n) throw Error(_(190));
    }
    if (l.tag !== 3) throw Error(_(188));
    return l.stateNode.current === l ? e : t;
  }
  function cf(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = cf(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var re = Object.assign, Oh = Symbol.for("react.element"), Ya = Symbol.for("react.transitional.element"), Qn = Symbol.for("react.portal"), Fl = Symbol.for("react.fragment"), sf = Symbol.for("react.strict_mode"), ss = Symbol.for("react.profiler"), uf = Symbol.for("react.consumer"), Ot = Symbol.for("react.context"), uu = Symbol.for("react.forward_ref"), us = Symbol.for("react.suspense"), os = Symbol.for("react.suspense_list"), ou = Symbol.for("react.memo"), Jt = Symbol.for("react.lazy"), rs = Symbol.for("react.activity"), kh = Symbol.for("react.memo_cache_sentinel"), xo = Symbol.iterator;
  function Bn(e) {
    return e === null || typeof e != "object" ? null : (e = xo && e[xo] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Uh = Symbol.for("react.client.reference");
  function fs(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.$$typeof === Uh ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Fl:
        return "Fragment";
      case ss:
        return "Profiler";
      case sf:
        return "StrictMode";
      case us:
        return "Suspense";
      case os:
        return "SuspenseList";
      case rs:
        return "Activity";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Qn:
        return "Portal";
      case Ot:
        return e.displayName || "Context";
      case uf:
        return (e._context.displayName || "Context") + ".Consumer";
      case uu:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case ou:
        return t = e.displayName || null, t !== null ? t : fs(e.type) || "Memo";
      case Jt:
        t = e._payload, e = e._init;
        try {
          return fs(e(t));
        } catch {
        }
    }
    return null;
  }
  var Xn = Array.isArray, Y = tf.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, P = Mh.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Al = {
    pending: false,
    data: null,
    method: null,
    action: null
  }, ds = [], Il = -1;
  function St(e) {
    return {
      current: e
    };
  }
  function Te(e) {
    0 > Il || (e.current = ds[Il], ds[Il] = null, Il--);
  }
  function ce(e, t) {
    Il++, ds[Il] = e.current, e.current = t;
  }
  var jt = St(null), oa = St(null), il = St(null), ji = St(null);
  function Si(e, t) {
    switch (ce(il, t), ce(oa, e), ce(jt, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? zr(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI) t = zr(t), e = A0(t, e);
        else switch (e) {
          case "svg":
            e = 1;
            break;
          case "math":
            e = 2;
            break;
          default:
            e = 0;
        }
    }
    Te(jt), ce(jt, e);
  }
  function gn() {
    Te(jt), Te(oa), Te(il);
  }
  function hs(e) {
    e.memoizedState !== null && ce(ji, e);
    var t = jt.current, l = A0(t, e.type);
    t !== l && (ce(oa, e), ce(jt, l));
  }
  function Ni(e) {
    oa.current === e && (Te(jt), Te(oa)), ji.current === e && (Te(ji), ya._currentValue = Al);
  }
  var jc, po;
  function Nl(e) {
    if (jc === void 0) try {
      throw Error();
    } catch (l) {
      var t = l.stack.trim().match(/\n( *(at )?)/);
      jc = t && t[1] || "", po = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return `
` + jc + e + po;
  }
  var Sc = false;
  function Nc(e, t) {
    if (!e || Sc) return "";
    Sc = true;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var p = function() {
                throw Error();
              };
              if (Object.defineProperty(p.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(p, []);
                } catch (x) {
                  var m = x;
                }
                Reflect.construct(e, [], p);
              } else {
                try {
                  p.call();
                } catch (x) {
                  m = x;
                }
                e.call(p.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                m = x;
              }
              (p = e()) && typeof p.catch == "function" && p.catch(function() {
              });
            }
          } catch (x) {
            if (x && m && typeof x.stack == "string") return [
              x.stack,
              m.stack
            ];
          }
          return [
            null,
            null
          ];
        }
      };
      n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot, "name");
      a && a.configurable && Object.defineProperty(n.DetermineComponentFrameRoot, "name", {
        value: "DetermineComponentFrameRoot"
      });
      var i = n.DetermineComponentFrameRoot(), s = i[0], u = i[1];
      if (s && u) {
        var o = s.split(`
`), d = u.split(`
`);
        for (a = n = 0; n < o.length && !o[n].includes("DetermineComponentFrameRoot"); ) n++;
        for (; a < d.length && !d[a].includes("DetermineComponentFrameRoot"); ) a++;
        if (n === o.length || a === d.length) for (n = o.length - 1, a = d.length - 1; 1 <= n && 0 <= a && o[n] !== d[a]; ) a--;
        for (; 1 <= n && 0 <= a; n--, a--) if (o[n] !== d[a]) {
          if (n !== 1 || a !== 1) do
            if (n--, a--, 0 > a || o[n] !== d[a]) {
              var g = `
` + o[n].replace(" at new ", " at ");
              return e.displayName && g.includes("<anonymous>") && (g = g.replace("<anonymous>", e.displayName)), g;
            }
          while (1 <= n && 0 <= a);
          break;
        }
      }
    } finally {
      Sc = false, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? Nl(l) : "";
  }
  function Bh(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Nl(e.type);
      case 16:
        return Nl("Lazy");
      case 13:
        return e.child !== t && t !== null ? Nl("Suspense Fallback") : Nl("Suspense");
      case 19:
        return Nl("SuspenseList");
      case 0:
      case 15:
        return Nc(e.type, false);
      case 11:
        return Nc(e.type.render, false);
      case 1:
        return Nc(e.type, true);
      case 31:
        return Nl("Activity");
      default:
        return "";
    }
  }
  function go(e) {
    try {
      var t = "", l = null;
      do
        t += Bh(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var ms = Object.prototype.hasOwnProperty, ru = Se.unstable_scheduleCallback, _c = Se.unstable_cancelCallback, Lh = Se.unstable_shouldYield, Hh = Se.unstable_requestPaint, $e = Se.unstable_now, Rh = Se.unstable_getCurrentPriorityLevel, of = Se.unstable_ImmediatePriority, rf = Se.unstable_UserBlockingPriority, _i = Se.unstable_NormalPriority, Gh = Se.unstable_LowPriority, ff = Se.unstable_IdlePriority, Yh = Se.log, qh = Se.unstable_setDisableYieldValue, _a = null, We = null;
  function el(e) {
    if (typeof Yh == "function" && qh(e), We && typeof We.setStrictMode == "function") try {
      We.setStrictMode(_a, e);
    } catch {
    }
  }
  var Fe = Math.clz32 ? Math.clz32 : Zh, Qh = Math.log, Xh = Math.LN2;
  function Zh(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Qh(e) / Xh | 0) | 0;
  }
  var qa = 256, Qa = 262144, Xa = 4194304;
  function _l(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function ec(e, t, l) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var a = 0, i = e.suspendedLanes, s = e.pingedLanes;
    e = e.warmLanes;
    var u = n & 134217727;
    return u !== 0 ? (n = u & ~i, n !== 0 ? a = _l(n) : (s &= u, s !== 0 ? a = _l(s) : l || (l = u & ~e, l !== 0 && (a = _l(l))))) : (u = n & ~i, u !== 0 ? a = _l(u) : s !== 0 ? a = _l(s) : l || (l = n & ~e, l !== 0 && (a = _l(l)))), a === 0 ? 0 : t !== 0 && t !== a && !(t & i) && (i = a & -a, l = t & -t, i >= l || i === 32 && (l & 4194048) !== 0) ? t : a;
  }
  function wa(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Vh(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function df() {
    var e = Xa;
    return Xa <<= 1, !(Xa & 62914560) && (Xa = 4194304), e;
  }
  function wc(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Ta(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Kh(e, t, l, n, a, i) {
    var s = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var u = e.entanglements, o = e.expirationTimes, d = e.hiddenUpdates;
    for (l = s & ~l; 0 < l; ) {
      var g = 31 - Fe(l), p = 1 << g;
      u[g] = 0, o[g] = -1;
      var m = d[g];
      if (m !== null) for (d[g] = null, g = 0; g < m.length; g++) {
        var x = m[g];
        x !== null && (x.lane &= -536870913);
      }
      l &= ~p;
    }
    n !== 0 && hf(e, n, 0), i !== 0 && a === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(s & ~t));
  }
  function hf(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var n = 31 - Fe(t);
    e.entangledLanes |= t, e.entanglements[n] = e.entanglements[n] | 1073741824 | l & 261930;
  }
  function mf(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var n = 31 - Fe(l), a = 1 << n;
      a & t | e[n] & t && (e[n] |= t), l &= ~a;
    }
  }
  function xf(e, t) {
    var l = t & -t;
    return l = l & 42 ? 1 : fu(l), l & (e.suspendedLanes | t) ? 0 : l;
  }
  function fu(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function du(e) {
    return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
  }
  function pf() {
    var e = P.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : R0(e.type));
  }
  function vo(e, t) {
    var l = P.p;
    try {
      return P.p = e, t();
    } finally {
      P.p = l;
    }
  }
  var vl = Math.random().toString(36).slice(2), De = "__reactFiber$" + vl, qe = "__reactProps$" + vl, Dn = "__reactContainer$" + vl, xs = "__reactEvents$" + vl, Jh = "__reactListeners$" + vl, $h = "__reactHandles$" + vl, bo = "__reactResources$" + vl, Aa = "__reactMarker$" + vl;
  function hu(e) {
    delete e[De], delete e[qe], delete e[xs], delete e[Jh], delete e[$h];
  }
  function Pl(e) {
    var t = e[De];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[Dn] || l[De]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null) for (e = wr(e); e !== null; ) {
          if (l = e[De]) return l;
          e = wr(e);
        }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function En(e) {
    if (e = e[De] || e[Dn]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function Zn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(_(33));
  }
  function rn(e) {
    var t = e[bo];
    return t || (t = e[bo] = {
      hoistableStyles: /* @__PURE__ */ new Map(),
      hoistableScripts: /* @__PURE__ */ new Map()
    }), t;
  }
  function we(e) {
    e[Aa] = true;
  }
  var gf = /* @__PURE__ */ new Set(), vf = {};
  function Hl(e, t) {
    vn(e, t), vn(e + "Capture", t);
  }
  function vn(e, t) {
    for (vf[e] = t, e = 0; e < t.length; e++) gf.add(t[e]);
  }
  var Wh = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), yo = {}, zo = {};
  function Fh(e) {
    return ms.call(zo, e) ? true : ms.call(yo, e) ? false : Wh.test(e) ? zo[e] = true : (yo[e] = true, false);
  }
  function ii(e, t, l) {
    if (Fh(t)) if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
          e.removeAttribute(t);
          return;
        case "boolean":
          var n = t.toLowerCase().slice(0, 5);
          if (n !== "data-" && n !== "aria-") {
            e.removeAttribute(t);
            return;
          }
      }
      e.setAttribute(t, "" + l);
    }
  }
  function Za(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + l);
    }
  }
  function wt(e, t, l, n) {
    if (n === null) e.removeAttribute(l);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, "" + n);
    }
  }
  function nt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function bf(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Ih(e, t, l) {
    var n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var a = n.get, i = n.set;
      return Object.defineProperty(e, t, {
        configurable: true,
        get: function() {
          return a.call(this);
        },
        set: function(s) {
          l = "" + s, i.call(this, s);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(s) {
          l = "" + s;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function ps(e) {
    if (!e._valueTracker) {
      var t = bf(e) ? "checked" : "value";
      e._valueTracker = Ih(e, t, "" + e[t]);
    }
  }
  function yf(e) {
    if (!e) return false;
    var t = e._valueTracker;
    if (!t) return true;
    var l = t.getValue(), n = "";
    return e && (n = bf(e) ? e.checked ? "true" : "false" : e.value), e = n, e !== l ? (t.setValue(e), true) : false;
  }
  function wi(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Ph = /[\n"\\]/g;
  function ct(e) {
    return e.replace(Ph, function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function gs(e, t, l, n, a, i, s, u) {
    e.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.type = s : e.removeAttribute("type"), t != null ? s === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + nt(t)) : e.value !== "" + nt(t) && (e.value = "" + nt(t)) : s !== "submit" && s !== "reset" || e.removeAttribute("value"), t != null ? vs(e, s, nt(t)) : l != null ? vs(e, s, nt(l)) : n != null && e.removeAttribute("value"), a == null && i != null && (e.defaultChecked = !!i), a != null && (e.checked = a && typeof a != "function" && typeof a != "symbol"), u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" ? e.name = "" + nt(u) : e.removeAttribute("name");
  }
  function zf(e, t, l, n, a, i, s, u) {
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.type = i), t != null || l != null) {
      if (!(i !== "submit" && i !== "reset" || t != null)) {
        ps(e);
        return;
      }
      l = l != null ? "" + nt(l) : "", t = t != null ? "" + nt(t) : l, u || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = n ?? a, n = typeof n != "function" && typeof n != "symbol" && !!n, e.checked = u ? e.checked : !!n, e.defaultChecked = !!n, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.name = s), ps(e);
  }
  function vs(e, t, l) {
    t === "number" && wi(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function fn(e, t, l, n) {
    if (e = e.options, t) {
      t = {};
      for (var a = 0; a < l.length; a++) t["$" + l[a]] = true;
      for (l = 0; l < e.length; l++) a = t.hasOwnProperty("$" + e[l].value), e[l].selected !== a && (e[l].selected = a), a && n && (e[l].defaultSelected = true);
    } else {
      for (l = "" + nt(l), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === l) {
          e[a].selected = true, n && (e[a].defaultSelected = true);
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = true);
    }
  }
  function jf(e, t, l) {
    if (t != null && (t = "" + nt(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + nt(l) : "";
  }
  function Sf(e, t, l, n) {
    if (t == null) {
      if (n != null) {
        if (l != null) throw Error(_(92));
        if (Xn(n)) {
          if (1 < n.length) throw Error(_(93));
          n = n[0];
        }
        l = n;
      }
      l == null && (l = ""), t = l;
    }
    l = nt(t), e.defaultValue = l, n = e.textContent, n === l && n !== "" && n !== null && (e.value = n), ps(e);
  }
  function bn(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var em = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function jo(e, t, l) {
    var n = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? n ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : n ? e.setProperty(t, l) : typeof l != "number" || l === 0 || em.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function Nf(e, t, l) {
    if (t != null && typeof t != "object") throw Error(_(62));
    if (e = e.style, l != null) {
      for (var n in l) !l.hasOwnProperty(n) || t != null && t.hasOwnProperty(n) || (n.indexOf("--") === 0 ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "");
      for (var a in t) n = t[a], t.hasOwnProperty(a) && l[a] !== n && jo(e, a, n);
    } else for (var i in t) t.hasOwnProperty(i) && jo(e, i, t[i]);
  }
  function mu(e) {
    if (e.indexOf("-") === -1) return false;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var tm = /* @__PURE__ */ new Map([
    [
      "acceptCharset",
      "accept-charset"
    ],
    [
      "htmlFor",
      "for"
    ],
    [
      "httpEquiv",
      "http-equiv"
    ],
    [
      "crossOrigin",
      "crossorigin"
    ],
    [
      "accentHeight",
      "accent-height"
    ],
    [
      "alignmentBaseline",
      "alignment-baseline"
    ],
    [
      "arabicForm",
      "arabic-form"
    ],
    [
      "baselineShift",
      "baseline-shift"
    ],
    [
      "capHeight",
      "cap-height"
    ],
    [
      "clipPath",
      "clip-path"
    ],
    [
      "clipRule",
      "clip-rule"
    ],
    [
      "colorInterpolation",
      "color-interpolation"
    ],
    [
      "colorInterpolationFilters",
      "color-interpolation-filters"
    ],
    [
      "colorProfile",
      "color-profile"
    ],
    [
      "colorRendering",
      "color-rendering"
    ],
    [
      "dominantBaseline",
      "dominant-baseline"
    ],
    [
      "enableBackground",
      "enable-background"
    ],
    [
      "fillOpacity",
      "fill-opacity"
    ],
    [
      "fillRule",
      "fill-rule"
    ],
    [
      "floodColor",
      "flood-color"
    ],
    [
      "floodOpacity",
      "flood-opacity"
    ],
    [
      "fontFamily",
      "font-family"
    ],
    [
      "fontSize",
      "font-size"
    ],
    [
      "fontSizeAdjust",
      "font-size-adjust"
    ],
    [
      "fontStretch",
      "font-stretch"
    ],
    [
      "fontStyle",
      "font-style"
    ],
    [
      "fontVariant",
      "font-variant"
    ],
    [
      "fontWeight",
      "font-weight"
    ],
    [
      "glyphName",
      "glyph-name"
    ],
    [
      "glyphOrientationHorizontal",
      "glyph-orientation-horizontal"
    ],
    [
      "glyphOrientationVertical",
      "glyph-orientation-vertical"
    ],
    [
      "horizAdvX",
      "horiz-adv-x"
    ],
    [
      "horizOriginX",
      "horiz-origin-x"
    ],
    [
      "imageRendering",
      "image-rendering"
    ],
    [
      "letterSpacing",
      "letter-spacing"
    ],
    [
      "lightingColor",
      "lighting-color"
    ],
    [
      "markerEnd",
      "marker-end"
    ],
    [
      "markerMid",
      "marker-mid"
    ],
    [
      "markerStart",
      "marker-start"
    ],
    [
      "overlinePosition",
      "overline-position"
    ],
    [
      "overlineThickness",
      "overline-thickness"
    ],
    [
      "paintOrder",
      "paint-order"
    ],
    [
      "panose-1",
      "panose-1"
    ],
    [
      "pointerEvents",
      "pointer-events"
    ],
    [
      "renderingIntent",
      "rendering-intent"
    ],
    [
      "shapeRendering",
      "shape-rendering"
    ],
    [
      "stopColor",
      "stop-color"
    ],
    [
      "stopOpacity",
      "stop-opacity"
    ],
    [
      "strikethroughPosition",
      "strikethrough-position"
    ],
    [
      "strikethroughThickness",
      "strikethrough-thickness"
    ],
    [
      "strokeDasharray",
      "stroke-dasharray"
    ],
    [
      "strokeDashoffset",
      "stroke-dashoffset"
    ],
    [
      "strokeLinecap",
      "stroke-linecap"
    ],
    [
      "strokeLinejoin",
      "stroke-linejoin"
    ],
    [
      "strokeMiterlimit",
      "stroke-miterlimit"
    ],
    [
      "strokeOpacity",
      "stroke-opacity"
    ],
    [
      "strokeWidth",
      "stroke-width"
    ],
    [
      "textAnchor",
      "text-anchor"
    ],
    [
      "textDecoration",
      "text-decoration"
    ],
    [
      "textRendering",
      "text-rendering"
    ],
    [
      "transformOrigin",
      "transform-origin"
    ],
    [
      "underlinePosition",
      "underline-position"
    ],
    [
      "underlineThickness",
      "underline-thickness"
    ],
    [
      "unicodeBidi",
      "unicode-bidi"
    ],
    [
      "unicodeRange",
      "unicode-range"
    ],
    [
      "unitsPerEm",
      "units-per-em"
    ],
    [
      "vAlphabetic",
      "v-alphabetic"
    ],
    [
      "vHanging",
      "v-hanging"
    ],
    [
      "vIdeographic",
      "v-ideographic"
    ],
    [
      "vMathematical",
      "v-mathematical"
    ],
    [
      "vectorEffect",
      "vector-effect"
    ],
    [
      "vertAdvY",
      "vert-adv-y"
    ],
    [
      "vertOriginX",
      "vert-origin-x"
    ],
    [
      "vertOriginY",
      "vert-origin-y"
    ],
    [
      "wordSpacing",
      "word-spacing"
    ],
    [
      "writingMode",
      "writing-mode"
    ],
    [
      "xmlnsXlink",
      "xmlns:xlink"
    ],
    [
      "xHeight",
      "x-height"
    ]
  ]), lm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ci(e) {
    return lm.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function kt() {
  }
  var bs = null;
  function xu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var en = null, dn = null;
  function So(e) {
    var t = En(e);
    if (t && (e = t.stateNode)) {
      var l = e[qe] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (gs(e, l.value, l.defaultValue, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name), t = l.name, l.type === "radio" && t != null) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll('input[name="' + ct("" + t) + '"][type="radio"]'), t = 0; t < l.length; t++) {
              var n = l[t];
              if (n !== e && n.form === e.form) {
                var a = n[qe] || null;
                if (!a) throw Error(_(90));
                gs(n, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
              }
            }
            for (t = 0; t < l.length; t++) n = l[t], n.form === e.form && yf(n);
          }
          break e;
        case "textarea":
          jf(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && fn(e, !!l.multiple, t, false);
      }
    }
  }
  var Tc = false;
  function _f(e, t, l) {
    if (Tc) return e(t, l);
    Tc = true;
    try {
      var n = e(t);
      return n;
    } finally {
      if (Tc = false, (en !== null || dn !== null) && (dc(), en && (t = en, e = dn, dn = en = null, So(t), e))) for (t = 0; t < e.length; t++) So(e[t]);
    }
  }
  function ra(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var n = l[qe] || null;
    if (n === null) return null;
    l = n[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (n = !n.disabled) || (e = e.type, n = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !n;
        break e;
      default:
        e = false;
    }
    if (e) return null;
    if (l && typeof l != "function") throw Error(_(231, t, typeof l));
    return l;
  }
  var Rt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ys = false;
  if (Rt) try {
    var Ln = {};
    Object.defineProperty(Ln, "passive", {
      get: function() {
        ys = true;
      }
    }), window.addEventListener("test", Ln, Ln), window.removeEventListener("test", Ln, Ln);
  } catch {
    ys = false;
  }
  var tl = null, pu = null, si = null;
  function wf() {
    if (si) return si;
    var e, t = pu, l = t.length, n, a = "value" in tl ? tl.value : tl.textContent, i = a.length;
    for (e = 0; e < l && t[e] === a[e]; e++) ;
    var s = l - e;
    for (n = 1; n <= s && t[l - n] === a[i - n]; n++) ;
    return si = a.slice(e, 1 < n ? 1 - n : void 0);
  }
  function ui(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Va() {
    return true;
  }
  function No() {
    return false;
  }
  function Qe(e) {
    function t(l, n, a, i, s) {
      this._reactName = l, this._targetInst = a, this.type = n, this.nativeEvent = i, this.target = s, this.currentTarget = null;
      for (var u in e) e.hasOwnProperty(u) && (l = e[u], this[u] = l ? l(i) : i[u]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === false) ? Va : No, this.isPropagationStopped = No, this;
    }
    return re(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = true;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = false), this.isDefaultPrevented = Va);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = true), this.isPropagationStopped = Va);
      },
      persist: function() {
      },
      isPersistent: Va
    }), t;
  }
  var Rl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, tc = Qe(Rl), Da = re({}, Rl, {
    view: 0,
    detail: 0
  }), nm = Qe(Da), Ac, Dc, Hn, lc = re({}, Da, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: gu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Hn && (Hn && e.type === "mousemove" ? (Ac = e.screenX - Hn.screenX, Dc = e.screenY - Hn.screenY) : Dc = Ac = 0, Hn = e), Ac);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Dc;
    }
  }), _o = Qe(lc), am = re({}, lc, {
    dataTransfer: 0
  }), im = Qe(am), cm = re({}, Da, {
    relatedTarget: 0
  }), Ec = Qe(cm), sm = re({}, Rl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), um = Qe(sm), om = re({}, Rl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), rm = Qe(om), fm = re({}, Rl, {
    data: 0
  }), wo = Qe(fm), dm = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, hm = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, mm = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function xm(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = mm[e]) ? !!t[e] : false;
  }
  function gu() {
    return xm;
  }
  var pm = re({}, Da, {
    key: function(e) {
      if (e.key) {
        var t = dm[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = ui(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? hm[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: gu,
    charCode: function(e) {
      return e.type === "keypress" ? ui(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? ui(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), gm = Qe(pm), vm = re({}, lc, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), To = Qe(vm), bm = re({}, Da, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: gu
  }), ym = Qe(bm), zm = re({}, Rl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), jm = Qe(zm), Sm = re({}, lc, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Nm = Qe(Sm), _m = re({}, Rl, {
    newState: 0,
    oldState: 0
  }), wm = Qe(_m), Tm = [
    9,
    13,
    27,
    32
  ], vu = Rt && "CompositionEvent" in window, $n = null;
  Rt && "documentMode" in document && ($n = document.documentMode);
  var Am = Rt && "TextEvent" in window && !$n, Tf = Rt && (!vu || $n && 8 < $n && 11 >= $n), Ao = " ", Do = false;
  function Af(e, t) {
    switch (e) {
      case "keyup":
        return Tm.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function Df(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var tn = false;
  function Dm(e, t) {
    switch (e) {
      case "compositionend":
        return Df(t);
      case "keypress":
        return t.which !== 32 ? null : (Do = true, Ao);
      case "textInput":
        return e = t.data, e === Ao && Do ? null : e;
      default:
        return null;
    }
  }
  function Em(e, t) {
    if (tn) return e === "compositionend" || !vu && Af(e, t) ? (e = wf(), si = pu = tl = null, tn = false, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Tf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Mm = {
    color: true,
    date: true,
    datetime: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    password: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true
  };
  function Eo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Mm[e.type] : t === "textarea";
  }
  function Ef(e, t, l, n) {
    en ? dn ? dn.push(n) : dn = [
      n
    ] : en = n, t = Xi(t, "onChange"), 0 < t.length && (l = new tc("onChange", "change", null, l, n), e.push({
      event: l,
      listeners: t
    }));
  }
  var Wn = null, fa = null;
  function Cm(e) {
    _0(e, 0);
  }
  function nc(e) {
    var t = Zn(e);
    if (yf(t)) return e;
  }
  function Mo(e, t) {
    if (e === "change") return t;
  }
  var Mf = false;
  if (Rt) {
    var Mc;
    if (Rt) {
      var Cc = "oninput" in document;
      if (!Cc) {
        var Co = document.createElement("div");
        Co.setAttribute("oninput", "return;"), Cc = typeof Co.oninput == "function";
      }
      Mc = Cc;
    } else Mc = false;
    Mf = Mc && (!document.documentMode || 9 < document.documentMode);
  }
  function Oo() {
    Wn && (Wn.detachEvent("onpropertychange", Cf), fa = Wn = null);
  }
  function Cf(e) {
    if (e.propertyName === "value" && nc(fa)) {
      var t = [];
      Ef(t, fa, e, xu(e)), _f(Cm, t);
    }
  }
  function Om(e, t, l) {
    e === "focusin" ? (Oo(), Wn = t, fa = l, Wn.attachEvent("onpropertychange", Cf)) : e === "focusout" && Oo();
  }
  function km(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return nc(fa);
  }
  function Um(e, t) {
    if (e === "click") return nc(t);
  }
  function Bm(e, t) {
    if (e === "input" || e === "change") return nc(t);
  }
  function Lm(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Pe = typeof Object.is == "function" ? Object.is : Lm;
  function da(e, t) {
    if (Pe(e, t)) return true;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return false;
    var l = Object.keys(e), n = Object.keys(t);
    if (l.length !== n.length) return false;
    for (n = 0; n < l.length; n++) {
      var a = l[n];
      if (!ms.call(t, a) || !Pe(e[a], t[a])) return false;
    }
    return true;
  }
  function ko(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Uo(e, t) {
    var l = ko(e);
    e = 0;
    for (var n; l; ) {
      if (l.nodeType === 3) {
        if (n = e + l.textContent.length, e <= t && n >= t) return {
          node: l,
          offset: t - e
        };
        e = n;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = ko(l);
    }
  }
  function Of(e, t) {
    return e && t ? e === t ? true : e && e.nodeType === 3 ? false : t && t.nodeType === 3 ? Of(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : false : false;
  }
  function kf(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = wi(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = false;
      }
      if (l) e = t.contentWindow;
      else break;
      t = wi(e.document);
    }
    return t;
  }
  function bu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Hm = Rt && "documentMode" in document && 11 >= document.documentMode, ln = null, zs = null, Fn = null, js = false;
  function Bo(e, t, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    js || ln == null || ln !== wi(n) || (n = ln, "selectionStart" in n && bu(n) ? n = {
      start: n.selectionStart,
      end: n.selectionEnd
    } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), Fn && da(Fn, n) || (Fn = n, n = Xi(zs, "onSelect"), 0 < n.length && (t = new tc("onSelect", "select", null, t, l), e.push({
      event: t,
      listeners: n
    }), t.target = ln)));
  }
  function Sl(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var nn = {
    animationend: Sl("Animation", "AnimationEnd"),
    animationiteration: Sl("Animation", "AnimationIteration"),
    animationstart: Sl("Animation", "AnimationStart"),
    transitionrun: Sl("Transition", "TransitionRun"),
    transitionstart: Sl("Transition", "TransitionStart"),
    transitioncancel: Sl("Transition", "TransitionCancel"),
    transitionend: Sl("Transition", "TransitionEnd")
  }, Oc = {}, Uf = {};
  Rt && (Uf = document.createElement("div").style, "AnimationEvent" in window || (delete nn.animationend.animation, delete nn.animationiteration.animation, delete nn.animationstart.animation), "TransitionEvent" in window || delete nn.transitionend.transition);
  function Gl(e) {
    if (Oc[e]) return Oc[e];
    if (!nn[e]) return e;
    var t = nn[e], l;
    for (l in t) if (t.hasOwnProperty(l) && l in Uf) return Oc[e] = t[l];
    return e;
  }
  var Bf = Gl("animationend"), Lf = Gl("animationiteration"), Hf = Gl("animationstart"), Rm = Gl("transitionrun"), Gm = Gl("transitionstart"), Ym = Gl("transitioncancel"), Rf = Gl("transitionend"), Gf = /* @__PURE__ */ new Map(), Ss = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  Ss.push("scrollEnd");
  function xt(e, t) {
    Gf.set(e, t), Hl(t, [
      e
    ]);
  }
  var Ti = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: true,
        cancelable: true,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, lt = [], an = 0, yu = 0;
  function ac() {
    for (var e = an, t = yu = an = 0; t < e; ) {
      var l = lt[t];
      lt[t++] = null;
      var n = lt[t];
      lt[t++] = null;
      var a = lt[t];
      lt[t++] = null;
      var i = lt[t];
      if (lt[t++] = null, n !== null && a !== null) {
        var s = n.pending;
        s === null ? a.next = a : (a.next = s.next, s.next = a), n.pending = a;
      }
      i !== 0 && Yf(l, a, i);
    }
  }
  function ic(e, t, l, n) {
    lt[an++] = e, lt[an++] = t, lt[an++] = l, lt[an++] = n, yu |= n, e.lanes |= n, e = e.alternate, e !== null && (e.lanes |= n);
  }
  function zu(e, t, l, n) {
    return ic(e, t, l, n), Ai(e);
  }
  function Yl(e, t) {
    return ic(e, null, null, t), Ai(e);
  }
  function Yf(e, t, l) {
    e.lanes |= l;
    var n = e.alternate;
    n !== null && (n.lanes |= l);
    for (var a = false, i = e.return; i !== null; ) i.childLanes |= l, n = i.alternate, n !== null && (n.childLanes |= l), i.tag === 22 && (e = i.stateNode, e === null || e._visibility & 1 || (a = true)), e = i, i = i.return;
    return e.tag === 3 ? (i = e.stateNode, a && t !== null && (a = 31 - Fe(l), e = i.hiddenUpdates, n = e[a], n === null ? e[a] = [
      t
    ] : n.push(t), t.lane = l | 536870912), i) : null;
  }
  function Ai(e) {
    if (50 < ca) throw ca = 0, Xs = null, Error(_(185));
    for (var t = e.return; t !== null; ) e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var cn = {};
  function qm(e, t, l, n) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ke(e, t, l, n) {
    return new qm(e, t, l, n);
  }
  function ju(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Bt(e, t) {
    var l = e.alternate;
    return l === null ? (l = Ke(e.tag, t, e.key, e.mode), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function qf(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function oi(e, t, l, n, a, i) {
    var s = 0;
    if (n = e, typeof e == "function") ju(e) && (s = 1);
    else if (typeof e == "string") s = Kx(e, l, jt.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else e: switch (e) {
      case rs:
        return e = Ke(31, l, t, a), e.elementType = rs, e.lanes = i, e;
      case Fl:
        return Dl(l.children, a, i, t);
      case sf:
        s = 8, a |= 24;
        break;
      case ss:
        return e = Ke(12, l, t, a | 2), e.elementType = ss, e.lanes = i, e;
      case us:
        return e = Ke(13, l, t, a), e.elementType = us, e.lanes = i, e;
      case os:
        return e = Ke(19, l, t, a), e.elementType = os, e.lanes = i, e;
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case Ot:
            s = 10;
            break e;
          case uf:
            s = 9;
            break e;
          case uu:
            s = 11;
            break e;
          case ou:
            s = 14;
            break e;
          case Jt:
            s = 16, n = null;
            break e;
        }
        s = 29, l = Error(_(130, e === null ? "null" : typeof e, "")), n = null;
    }
    return t = Ke(s, l, t, a), t.elementType = e, t.type = n, t.lanes = i, t;
  }
  function Dl(e, t, l, n) {
    return e = Ke(7, e, n, t), e.lanes = l, e;
  }
  function kc(e, t, l) {
    return e = Ke(6, e, null, t), e.lanes = l, e;
  }
  function Qf(e) {
    var t = Ke(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Uc(e, t, l) {
    return t = Ke(4, e.children !== null ? e.children : [], e.key, t), t.lanes = l, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Lo = /* @__PURE__ */ new WeakMap();
  function st(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = Lo.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: go(t)
      }, Lo.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: go(t)
    };
  }
  var sn = [], un = 0, Di = null, ha = 0, at = [], it = 0, ml = null, vt = 1, bt = "";
  function Mt(e, t) {
    sn[un++] = ha, sn[un++] = Di, Di = e, ha = t;
  }
  function Xf(e, t, l) {
    at[it++] = vt, at[it++] = bt, at[it++] = ml, ml = e;
    var n = vt;
    e = bt;
    var a = 32 - Fe(n) - 1;
    n &= ~(1 << a), l += 1;
    var i = 32 - Fe(t) + a;
    if (30 < i) {
      var s = a - a % 5;
      i = (n & (1 << s) - 1).toString(32), n >>= s, a -= s, vt = 1 << 32 - Fe(t) + a | l << a | n, bt = i + e;
    } else vt = 1 << i | l << a | n, bt = e;
  }
  function Su(e) {
    e.return !== null && (Mt(e, 1), Xf(e, 1, 0));
  }
  function Nu(e) {
    for (; e === Di; ) Di = sn[--un], sn[un] = null, ha = sn[--un], sn[un] = null;
    for (; e === ml; ) ml = at[--it], at[it] = null, bt = at[--it], at[it] = null, vt = at[--it], at[it] = null;
  }
  function Zf(e, t) {
    at[it++] = vt, at[it++] = bt, at[it++] = ml, vt = t.id, bt = t.overflow, ml = e;
  }
  var Ee = null, ue = null, F = false, cl = null, ut = false, Ns = Error(_(519));
  function xl(e) {
    var t = Error(_(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
    throw ma(st(t, e)), Ns;
  }
  function Ho(e) {
    var t = e.stateNode, l = e.type, n = e.memoizedProps;
    switch (t[De] = e, t[qe] = n, l) {
      case "dialog":
        K("cancel", t), K("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        K("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < va.length; l++) K(va[l], t);
        break;
      case "source":
        K("error", t);
        break;
      case "img":
      case "image":
      case "link":
        K("error", t), K("load", t);
        break;
      case "details":
        K("toggle", t);
        break;
      case "input":
        K("invalid", t), zf(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, true);
        break;
      case "select":
        K("invalid", t);
        break;
      case "textarea":
        K("invalid", t), Sf(t, n.value, n.defaultValue, n.children);
    }
    l = n.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || n.suppressHydrationWarning === true || T0(t.textContent, l) ? (n.popover != null && (K("beforetoggle", t), K("toggle", t)), n.onScroll != null && K("scroll", t), n.onScrollEnd != null && K("scrollend", t), n.onClick != null && (t.onclick = kt), t = true) : t = false, t || xl(e, true);
  }
  function Ro(e) {
    for (Ee = e.return; Ee; ) switch (Ee.tag) {
      case 5:
      case 31:
      case 13:
        ut = false;
        return;
      case 27:
      case 3:
        ut = true;
        return;
      default:
        Ee = Ee.return;
    }
  }
  function Zl(e) {
    if (e !== Ee) return false;
    if (!F) return Ro(e), F = true, false;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || $s(e.type, e.memoizedProps)), l = !l), l && ue && xl(e), Ro(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(_(317));
      ue = _r(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(_(317));
      ue = _r(e);
    } else t === 27 ? (t = ue, bl(e.type) ? (e = Ps, Ps = null, ue = e) : ue = t) : ue = Ee ? rt(e.stateNode.nextSibling) : null;
    return true;
  }
  function Ol() {
    ue = Ee = null, F = false;
  }
  function Bc() {
    var e = cl;
    return e !== null && (Ge === null ? Ge = e : Ge.push.apply(Ge, e), cl = null), e;
  }
  function ma(e) {
    cl === null ? cl = [
      e
    ] : cl.push(e);
  }
  var _s = St(null), ql = null, Ut = null;
  function Wt(e, t, l) {
    ce(_s, t._currentValue), t._currentValue = l;
  }
  function Lt(e) {
    e._currentValue = _s.current, Te(_s);
  }
  function ws(e, t, l) {
    for (; e !== null; ) {
      var n = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, n !== null && (n.childLanes |= t)) : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function Ts(e, t, l, n) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var i = a.dependencies;
      if (i !== null) {
        var s = a.child;
        i = i.firstContext;
        e: for (; i !== null; ) {
          var u = i;
          i = a;
          for (var o = 0; o < t.length; o++) if (u.context === t[o]) {
            i.lanes |= l, u = i.alternate, u !== null && (u.lanes |= l), ws(i.return, l, e), n || (s = null);
            break e;
          }
          i = u.next;
        }
      } else if (a.tag === 18) {
        if (s = a.return, s === null) throw Error(_(341));
        s.lanes |= l, i = s.alternate, i !== null && (i.lanes |= l), ws(s, l, e), s = null;
      } else s = a.child;
      if (s !== null) s.return = a;
      else for (s = a; s !== null; ) {
        if (s === e) {
          s = null;
          break;
        }
        if (a = s.sibling, a !== null) {
          a.return = s.return, s = a;
          break;
        }
        s = s.return;
      }
      a = s;
    }
  }
  function Mn(e, t, l, n) {
    e = null;
    for (var a = t, i = false; a !== null; ) {
      if (!i) {
        if (a.flags & 524288) i = true;
        else if (a.flags & 262144) break;
      }
      if (a.tag === 10) {
        var s = a.alternate;
        if (s === null) throw Error(_(387));
        if (s = s.memoizedProps, s !== null) {
          var u = a.type;
          Pe(a.pendingProps.value, s.value) || (e !== null ? e.push(u) : e = [
            u
          ]);
        }
      } else if (a === ji.current) {
        if (s = a.alternate, s === null) throw Error(_(387));
        s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e !== null ? e.push(ya) : e = [
          ya
        ]);
      }
      a = a.return;
    }
    e !== null && Ts(t, e, l, n), t.flags |= 262144;
  }
  function Ei(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Pe(e.context._currentValue, e.memoizedValue)) return true;
      e = e.next;
    }
    return false;
  }
  function kl(e) {
    ql = e, Ut = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Me(e) {
    return Vf(ql, e);
  }
  function Ka(e, t) {
    return ql === null && kl(e), Vf(e, t);
  }
  function Vf(e, t) {
    var l = t._currentValue;
    if (t = {
      context: t,
      memoizedValue: l,
      next: null
    }, Ut === null) {
      if (e === null) throw Error(_(308));
      Ut = t, e.dependencies = {
        lanes: 0,
        firstContext: t
      }, e.flags |= 524288;
    } else Ut = Ut.next = t;
    return l;
  }
  var Qm = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: false,
      addEventListener: function(l, n) {
        e.push(n);
      }
    };
    this.abort = function() {
      t.aborted = true, e.forEach(function(l) {
        return l();
      });
    };
  }, Xm = Se.unstable_scheduleCallback, Zm = Se.unstable_NormalPriority, be = {
    $$typeof: Ot,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function _u() {
    return {
      controller: new Qm(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ea(e) {
    e.refCount--, e.refCount === 0 && Xm(Zm, function() {
      e.controller.abort();
    });
  }
  var In = null, As = 0, yn = 0, hn = null;
  function Vm(e, t) {
    if (In === null) {
      var l = In = [];
      As = 0, yn = Wu(), hn = {
        status: "pending",
        value: void 0,
        then: function(n) {
          l.push(n);
        }
      };
    }
    return As++, t.then(Go, Go), t;
  }
  function Go() {
    if (--As === 0 && In !== null) {
      hn !== null && (hn.status = "fulfilled");
      var e = In;
      In = null, yn = 0, hn = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Km(e, t) {
    var l = [], n = {
      status: "pending",
      value: null,
      reason: null,
      then: function(a) {
        l.push(a);
      }
    };
    return e.then(function() {
      n.status = "fulfilled", n.value = t;
      for (var a = 0; a < l.length; a++) (0, l[a])(t);
    }, function(a) {
      for (n.status = "rejected", n.reason = a, a = 0; a < l.length; a++) (0, l[a])(void 0);
    }), n;
  }
  var Yo = Y.S;
  Y.S = function(e, t) {
    c0 = $e(), typeof t == "object" && t !== null && typeof t.then == "function" && Vm(e, t), Yo !== null && Yo(e, t);
  };
  var El = St(null);
  function wu() {
    var e = El.current;
    return e !== null ? e : ae.pooledCache;
  }
  function ri(e, t) {
    t === null ? ce(El, El.current) : ce(El, t.pool);
  }
  function Kf() {
    var e = wu();
    return e === null ? null : {
      parent: be._currentValue,
      pool: e
    };
  }
  var Cn = Error(_(460)), Tu = Error(_(474)), cc = Error(_(542)), Mi = {
    then: function() {
    }
  };
  function qo(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Jf(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(kt, kt), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Xo(e), e;
      default:
        if (typeof t.status == "string") t.then(kt, kt);
        else {
          if (e = ae, e !== null && 100 < e.shellSuspendCounter) throw Error(_(482));
          e = t, e.status = "pending", e.then(function(n) {
            if (t.status === "pending") {
              var a = t;
              a.status = "fulfilled", a.value = n;
            }
          }, function(n) {
            if (t.status === "pending") {
              var a = t;
              a.status = "rejected", a.reason = n;
            }
          });
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Xo(e), e;
        }
        throw Ml = t, Cn;
    }
  }
  function wl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Ml = l, Cn) : l;
    }
  }
  var Ml = null;
  function Qo() {
    if (Ml === null) throw Error(_(459));
    var e = Ml;
    return Ml = null, e;
  }
  function Xo(e) {
    if (e === Cn || e === cc) throw Error(_(483));
  }
  var mn = null, xa = 0;
  function Ja(e) {
    var t = xa;
    return xa += 1, mn === null && (mn = []), Jf(mn, e, t);
  }
  function Rn(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function $a(e, t) {
    throw t.$$typeof === Oh ? Error(_(525)) : (e = Object.prototype.toString.call(t), Error(_(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
  }
  function $f(e) {
    function t(f, r) {
      if (e) {
        var h = f.deletions;
        h === null ? (f.deletions = [
          r
        ], f.flags |= 16) : h.push(r);
      }
    }
    function l(f, r) {
      if (!e) return null;
      for (; r !== null; ) t(f, r), r = r.sibling;
      return null;
    }
    function n(f) {
      for (var r = /* @__PURE__ */ new Map(); f !== null; ) f.key !== null ? r.set(f.key, f) : r.set(f.index, f), f = f.sibling;
      return r;
    }
    function a(f, r) {
      return f = Bt(f, r), f.index = 0, f.sibling = null, f;
    }
    function i(f, r, h) {
      return f.index = h, e ? (h = f.alternate, h !== null ? (h = h.index, h < r ? (f.flags |= 67108866, r) : h) : (f.flags |= 67108866, r)) : (f.flags |= 1048576, r);
    }
    function s(f) {
      return e && f.alternate === null && (f.flags |= 67108866), f;
    }
    function u(f, r, h, v) {
      return r === null || r.tag !== 6 ? (r = kc(h, f.mode, v), r.return = f, r) : (r = a(r, h), r.return = f, r);
    }
    function o(f, r, h, v) {
      var T = h.type;
      return T === Fl ? g(f, r, h.props.children, v, h.key) : r !== null && (r.elementType === T || typeof T == "object" && T !== null && T.$$typeof === Jt && wl(T) === r.type) ? (r = a(r, h.props), Rn(r, h), r.return = f, r) : (r = oi(h.type, h.key, h.props, null, f.mode, v), Rn(r, h), r.return = f, r);
    }
    function d(f, r, h, v) {
      return r === null || r.tag !== 4 || r.stateNode.containerInfo !== h.containerInfo || r.stateNode.implementation !== h.implementation ? (r = Uc(h, f.mode, v), r.return = f, r) : (r = a(r, h.children || []), r.return = f, r);
    }
    function g(f, r, h, v, T) {
      return r === null || r.tag !== 7 ? (r = Dl(h, f.mode, v, T), r.return = f, r) : (r = a(r, h), r.return = f, r);
    }
    function p(f, r, h) {
      if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return r = kc("" + r, f.mode, h), r.return = f, r;
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case Ya:
            return h = oi(r.type, r.key, r.props, null, f.mode, h), Rn(h, r), h.return = f, h;
          case Qn:
            return r = Uc(r, f.mode, h), r.return = f, r;
          case Jt:
            return r = wl(r), p(f, r, h);
        }
        if (Xn(r) || Bn(r)) return r = Dl(r, f.mode, h, null), r.return = f, r;
        if (typeof r.then == "function") return p(f, Ja(r), h);
        if (r.$$typeof === Ot) return p(f, Ka(f, r), h);
        $a(f, r);
      }
      return null;
    }
    function m(f, r, h, v) {
      var T = r !== null ? r.key : null;
      if (typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint") return T !== null ? null : u(f, r, "" + h, v);
      if (typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case Ya:
            return h.key === T ? o(f, r, h, v) : null;
          case Qn:
            return h.key === T ? d(f, r, h, v) : null;
          case Jt:
            return h = wl(h), m(f, r, h, v);
        }
        if (Xn(h) || Bn(h)) return T !== null ? null : g(f, r, h, v, null);
        if (typeof h.then == "function") return m(f, r, Ja(h), v);
        if (h.$$typeof === Ot) return m(f, r, Ka(f, h), v);
        $a(f, h);
      }
      return null;
    }
    function x(f, r, h, v, T) {
      if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint") return f = f.get(h) || null, u(r, f, "" + v, T);
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case Ya:
            return f = f.get(v.key === null ? h : v.key) || null, o(r, f, v, T);
          case Qn:
            return f = f.get(v.key === null ? h : v.key) || null, d(r, f, v, T);
          case Jt:
            return v = wl(v), x(f, r, h, v, T);
        }
        if (Xn(v) || Bn(v)) return f = f.get(h) || null, g(r, f, v, T, null);
        if (typeof v.then == "function") return x(f, r, h, Ja(v), T);
        if (v.$$typeof === Ot) return x(f, r, h, Ka(r, v), T);
        $a(r, v);
      }
      return null;
    }
    function j(f, r, h, v) {
      for (var T = null, L = null, y = r, w = r = 0, b = null; y !== null && w < h.length; w++) {
        y.index > w ? (b = y, y = null) : b = y.sibling;
        var N = m(f, y, h[w], v);
        if (N === null) {
          y === null && (y = b);
          break;
        }
        e && y && N.alternate === null && t(f, y), r = i(N, r, w), L === null ? T = N : L.sibling = N, L = N, y = b;
      }
      if (w === h.length) return l(f, y), F && Mt(f, w), T;
      if (y === null) {
        for (; w < h.length; w++) y = p(f, h[w], v), y !== null && (r = i(y, r, w), L === null ? T = y : L.sibling = y, L = y);
        return F && Mt(f, w), T;
      }
      for (y = n(y); w < h.length; w++) b = x(y, f, w, h[w], v), b !== null && (e && b.alternate !== null && y.delete(b.key === null ? w : b.key), r = i(b, r, w), L === null ? T = b : L.sibling = b, L = b);
      return e && y.forEach(function(E) {
        return t(f, E);
      }), F && Mt(f, w), T;
    }
    function z(f, r, h, v) {
      if (h == null) throw Error(_(151));
      for (var T = null, L = null, y = r, w = r = 0, b = null, N = h.next(); y !== null && !N.done; w++, N = h.next()) {
        y.index > w ? (b = y, y = null) : b = y.sibling;
        var E = m(f, y, N.value, v);
        if (E === null) {
          y === null && (y = b);
          break;
        }
        e && y && E.alternate === null && t(f, y), r = i(E, r, w), L === null ? T = E : L.sibling = E, L = E, y = b;
      }
      if (N.done) return l(f, y), F && Mt(f, w), T;
      if (y === null) {
        for (; !N.done; w++, N = h.next()) N = p(f, N.value, v), N !== null && (r = i(N, r, w), L === null ? T = N : L.sibling = N, L = N);
        return F && Mt(f, w), T;
      }
      for (y = n(y); !N.done; w++, N = h.next()) N = x(y, f, w, N.value, v), N !== null && (e && N.alternate !== null && y.delete(N.key === null ? w : N.key), r = i(N, r, w), L === null ? T = N : L.sibling = N, L = N);
      return e && y.forEach(function(M) {
        return t(f, M);
      }), F && Mt(f, w), T;
    }
    function A(f, r, h, v) {
      if (typeof h == "object" && h !== null && h.type === Fl && h.key === null && (h = h.props.children), typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case Ya:
            e: {
              for (var T = h.key; r !== null; ) {
                if (r.key === T) {
                  if (T = h.type, T === Fl) {
                    if (r.tag === 7) {
                      l(f, r.sibling), v = a(r, h.props.children), v.return = f, f = v;
                      break e;
                    }
                  } else if (r.elementType === T || typeof T == "object" && T !== null && T.$$typeof === Jt && wl(T) === r.type) {
                    l(f, r.sibling), v = a(r, h.props), Rn(v, h), v.return = f, f = v;
                    break e;
                  }
                  l(f, r);
                  break;
                } else t(f, r);
                r = r.sibling;
              }
              h.type === Fl ? (v = Dl(h.props.children, f.mode, v, h.key), v.return = f, f = v) : (v = oi(h.type, h.key, h.props, null, f.mode, v), Rn(v, h), v.return = f, f = v);
            }
            return s(f);
          case Qn:
            e: {
              for (T = h.key; r !== null; ) {
                if (r.key === T) if (r.tag === 4 && r.stateNode.containerInfo === h.containerInfo && r.stateNode.implementation === h.implementation) {
                  l(f, r.sibling), v = a(r, h.children || []), v.return = f, f = v;
                  break e;
                } else {
                  l(f, r);
                  break;
                }
                else t(f, r);
                r = r.sibling;
              }
              v = Uc(h, f.mode, v), v.return = f, f = v;
            }
            return s(f);
          case Jt:
            return h = wl(h), A(f, r, h, v);
        }
        if (Xn(h)) return j(f, r, h, v);
        if (Bn(h)) {
          if (T = Bn(h), typeof T != "function") throw Error(_(150));
          return h = T.call(h), z(f, r, h, v);
        }
        if (typeof h.then == "function") return A(f, r, Ja(h), v);
        if (h.$$typeof === Ot) return A(f, r, Ka(f, h), v);
        $a(f, h);
      }
      return typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint" ? (h = "" + h, r !== null && r.tag === 6 ? (l(f, r.sibling), v = a(r, h), v.return = f, f = v) : (l(f, r), v = kc(h, f.mode, v), v.return = f, f = v), s(f)) : l(f, r);
    }
    return function(f, r, h, v) {
      try {
        xa = 0;
        var T = A(f, r, h, v);
        return mn = null, T;
      } catch (y) {
        if (y === Cn || y === cc) throw y;
        var L = Ke(29, y, null, f.mode);
        return L.lanes = v, L.return = f, L;
      } finally {
      }
    };
  }
  var Ul = $f(true), Wf = $f(false), $t = false;
  function Au(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        lanes: 0,
        hiddenCallbacks: null
      },
      callbacks: null
    };
  }
  function Ds(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function sl(e) {
    return {
      lane: e,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    };
  }
  function ul(e, t, l) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (n = n.shared, I & 2) {
      var a = n.pending;
      return a === null ? t.next = t : (t.next = a.next, a.next = t), n.pending = t, t = Ai(e), Yf(e, null, l), t;
    }
    return ic(e, n, t, l), Ai(e);
  }
  function Pn(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var n = t.lanes;
      n &= e.pendingLanes, l |= n, t.lanes = l, mf(e, l);
    }
  }
  function Lc(e, t) {
    var l = e.updateQueue, n = e.alternate;
    if (n !== null && (n = n.updateQueue, l === n)) {
      var a = null, i = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var s = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          i === null ? a = i = s : i = i.next = s, l = l.next;
        } while (l !== null);
        i === null ? a = i = t : i = i.next = t;
      } else a = i = t;
      l = {
        baseState: n.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: i,
        shared: n.shared,
        callbacks: n.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t;
  }
  var Es = false;
  function ea() {
    if (Es) {
      var e = hn;
      if (e !== null) throw e;
    }
  }
  function ta(e, t, l, n) {
    Es = false;
    var a = e.updateQueue;
    $t = false;
    var i = a.firstBaseUpdate, s = a.lastBaseUpdate, u = a.shared.pending;
    if (u !== null) {
      a.shared.pending = null;
      var o = u, d = o.next;
      o.next = null, s === null ? i = d : s.next = d, s = o;
      var g = e.alternate;
      g !== null && (g = g.updateQueue, u = g.lastBaseUpdate, u !== s && (u === null ? g.firstBaseUpdate = d : u.next = d, g.lastBaseUpdate = o));
    }
    if (i !== null) {
      var p = a.baseState;
      s = 0, g = d = o = null, u = i;
      do {
        var m = u.lane & -536870913, x = m !== u.lane;
        if (x ? (W & m) === m : (n & m) === m) {
          m !== 0 && m === yn && (Es = true), g !== null && (g = g.next = {
            lane: 0,
            tag: u.tag,
            payload: u.payload,
            callback: null,
            next: null
          });
          e: {
            var j = e, z = u;
            m = t;
            var A = l;
            switch (z.tag) {
              case 1:
                if (j = z.payload, typeof j == "function") {
                  p = j.call(A, p, m);
                  break e;
                }
                p = j;
                break e;
              case 3:
                j.flags = j.flags & -65537 | 128;
              case 0:
                if (j = z.payload, m = typeof j == "function" ? j.call(A, p, m) : j, m == null) break e;
                p = re({}, p, m);
                break e;
              case 2:
                $t = true;
            }
          }
          m = u.callback, m !== null && (e.flags |= 64, x && (e.flags |= 8192), x = a.callbacks, x === null ? a.callbacks = [
            m
          ] : x.push(m));
        } else x = {
          lane: m,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        }, g === null ? (d = g = x, o = p) : g = g.next = x, s |= m;
        if (u = u.next, u === null) {
          if (u = a.shared.pending, u === null) break;
          x = u, u = x.next, x.next = null, a.lastBaseUpdate = x, a.shared.pending = null;
        }
      } while (true);
      g === null && (o = p), a.baseState = o, a.firstBaseUpdate = d, a.lastBaseUpdate = g, i === null && (a.shared.lanes = 0), gl |= s, e.lanes = s, e.memoizedState = p;
    }
  }
  function Ff(e, t) {
    if (typeof e != "function") throw Error(_(191, e));
    e.call(t);
  }
  function If(e, t) {
    var l = e.callbacks;
    if (l !== null) for (e.callbacks = null, e = 0; e < l.length; e++) Ff(l[e], t);
  }
  var zn = St(null), Ci = St(0);
  function Zo(e, t) {
    e = Qt, ce(Ci, e), ce(zn, t), Qt = e | t.baseLanes;
  }
  function Ms() {
    ce(Ci, Qt), ce(zn, zn.current);
  }
  function Du() {
    Qt = Ci.current, Te(zn), Te(Ci);
  }
  var et = St(null), ot = null;
  function Ft(e) {
    var t = e.alternate;
    ce(xe, xe.current & 1), ce(et, e), ot === null && (t === null || zn.current !== null || t.memoizedState !== null) && (ot = e);
  }
  function Cs(e) {
    ce(xe, xe.current), ce(et, e), ot === null && (ot = e);
  }
  function Pf(e) {
    e.tag === 22 ? (ce(xe, xe.current), ce(et, e), ot === null && (ot = e)) : It();
  }
  function It() {
    ce(xe, xe.current), ce(et, et.current);
  }
  function Ve(e) {
    Te(et), ot === e && (ot = null), Te(xe);
  }
  var xe = St(0);
  function Oi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Fs(l) || Is(l))) return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if (t.flags & 128) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Gt = 0, Z = null, ne = null, ge = null, ki = false, xn = false, Bl = false, Ui = 0, pa = 0, pn = null, Jm = 0;
  function he() {
    throw Error(_(321));
  }
  function Eu(e, t) {
    if (t === null) return false;
    for (var l = 0; l < t.length && l < e.length; l++) if (!Pe(e[l], t[l])) return false;
    return true;
  }
  function Mu(e, t, l, n, a, i) {
    return Gt = i, Z = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Y.H = e === null || e.memoizedState === null ? Ed : qu, Bl = false, i = l(n, a), Bl = false, xn && (i = td(t, l, n, a)), ed(e), i;
  }
  function ed(e) {
    Y.H = ga;
    var t = ne !== null && ne.next !== null;
    if (Gt = 0, ge = ne = Z = null, ki = false, pa = 0, pn = null, t) throw Error(_(300));
    e === null || ze || (e = e.dependencies, e !== null && Ei(e) && (ze = true));
  }
  function td(e, t, l, n) {
    Z = e;
    var a = 0;
    do {
      if (xn && (pn = null), pa = 0, xn = false, 25 <= a) throw Error(_(301));
      if (a += 1, ge = ne = null, e.updateQueue != null) {
        var i = e.updateQueue;
        i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
      }
      Y.H = Md, i = t(l, n);
    } while (xn);
    return i;
  }
  function $m() {
    var e = Y.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Ma(t) : t, e = e.useState()[0], (ne !== null ? ne.memoizedState : null) !== e && (Z.flags |= 1024), t;
  }
  function Cu() {
    var e = Ui !== 0;
    return Ui = 0, e;
  }
  function Ou(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function ku(e) {
    if (ki) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      ki = false;
    }
    Gt = 0, ge = ne = Z = null, xn = false, pa = Ui = 0, pn = null;
  }
  function ke() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ge === null ? Z.memoizedState = ge = e : ge = ge.next = e, ge;
  }
  function pe() {
    if (ne === null) {
      var e = Z.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ne.next;
    var t = ge === null ? Z.memoizedState : ge.next;
    if (t !== null) ge = t, ne = e;
    else {
      if (e === null) throw Z.alternate === null ? Error(_(467)) : Error(_(310));
      ne = e, e = {
        memoizedState: ne.memoizedState,
        baseState: ne.baseState,
        baseQueue: ne.baseQueue,
        queue: ne.queue,
        next: null
      }, ge === null ? Z.memoizedState = ge = e : ge = ge.next = e;
    }
    return ge;
  }
  function sc() {
    return {
      lastEffect: null,
      events: null,
      stores: null,
      memoCache: null
    };
  }
  function Ma(e) {
    var t = pa;
    return pa += 1, pn === null && (pn = []), e = Jf(pn, e, t), t = Z, (ge === null ? t.memoizedState : ge.next) === null && (t = t.alternate, Y.H = t === null || t.memoizedState === null ? Ed : qu), e;
  }
  function uc(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ma(e);
      if (e.$$typeof === Ot) return Me(e);
    }
    throw Error(_(438, String(e)));
  }
  function Uu(e) {
    var t = null, l = Z.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var n = Z.alternate;
      n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (t = {
        data: n.data.map(function(a) {
          return a.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = {
      data: [],
      index: 0
    }), l === null && (l = sc(), Z.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0) for (l = t.data[t.index] = Array(e), n = 0; n < e; n++) l[n] = kh;
    return t.index++, l;
  }
  function Yt(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function fi(e) {
    var t = pe();
    return Bu(t, ne, e);
  }
  function Bu(e, t, l) {
    var n = e.queue;
    if (n === null) throw Error(_(311));
    n.lastRenderedReducer = l;
    var a = e.baseQueue, i = n.pending;
    if (i !== null) {
      if (a !== null) {
        var s = a.next;
        a.next = i.next, i.next = s;
      }
      t.baseQueue = a = i, n.pending = null;
    }
    if (i = e.baseState, a === null) e.memoizedState = i;
    else {
      t = a.next;
      var u = s = null, o = null, d = t, g = false;
      do {
        var p = d.lane & -536870913;
        if (p !== d.lane ? (W & p) === p : (Gt & p) === p) {
          var m = d.revertLane;
          if (m === 0) o !== null && (o = o.next = {
            lane: 0,
            revertLane: 0,
            gesture: null,
            action: d.action,
            hasEagerState: d.hasEagerState,
            eagerState: d.eagerState,
            next: null
          }), p === yn && (g = true);
          else if ((Gt & m) === m) {
            d = d.next, m === yn && (g = true);
            continue;
          } else p = {
            lane: 0,
            revertLane: d.revertLane,
            gesture: null,
            action: d.action,
            hasEagerState: d.hasEagerState,
            eagerState: d.eagerState,
            next: null
          }, o === null ? (u = o = p, s = i) : o = o.next = p, Z.lanes |= m, gl |= m;
          p = d.action, Bl && l(i, p), i = d.hasEagerState ? d.eagerState : l(i, p);
        } else m = {
          lane: p,
          revertLane: d.revertLane,
          gesture: d.gesture,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        }, o === null ? (u = o = m, s = i) : o = o.next = m, Z.lanes |= p, gl |= p;
        d = d.next;
      } while (d !== null && d !== t);
      if (o === null ? s = i : o.next = u, !Pe(i, e.memoizedState) && (ze = true, g && (l = hn, l !== null))) throw l;
      e.memoizedState = i, e.baseState = s, e.baseQueue = o, n.lastRenderedState = i;
    }
    return a === null && (n.lanes = 0), [
      e.memoizedState,
      n.dispatch
    ];
  }
  function Hc(e) {
    var t = pe(), l = t.queue;
    if (l === null) throw Error(_(311));
    l.lastRenderedReducer = e;
    var n = l.dispatch, a = l.pending, i = t.memoizedState;
    if (a !== null) {
      l.pending = null;
      var s = a = a.next;
      do
        i = e(i, s.action), s = s.next;
      while (s !== a);
      Pe(i, t.memoizedState) || (ze = true), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), l.lastRenderedState = i;
    }
    return [
      i,
      n
    ];
  }
  function ld(e, t, l) {
    var n = Z, a = pe(), i = F;
    if (i) {
      if (l === void 0) throw Error(_(407));
      l = l();
    } else l = t();
    var s = !Pe((ne || a).memoizedState, l);
    if (s && (a.memoizedState = l, ze = true), a = a.queue, Lu(id.bind(null, n, a, e), [
      e
    ]), a.getSnapshot !== t || s || ge !== null && ge.memoizedState.tag & 1) {
      if (n.flags |= 2048, jn(9, {
        destroy: void 0
      }, ad.bind(null, n, a, l, t), null), ae === null) throw Error(_(349));
      i || Gt & 127 || nd(n, t, l);
    }
    return l;
  }
  function nd(e, t, l) {
    e.flags |= 16384, e = {
      getSnapshot: t,
      value: l
    }, t = Z.updateQueue, t === null ? (t = sc(), Z.updateQueue = t, t.stores = [
      e
    ]) : (l = t.stores, l === null ? t.stores = [
      e
    ] : l.push(e));
  }
  function ad(e, t, l, n) {
    t.value = l, t.getSnapshot = n, cd(t) && sd(e);
  }
  function id(e, t, l) {
    return l(function() {
      cd(t) && sd(e);
    });
  }
  function cd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Pe(e, l);
    } catch {
      return true;
    }
  }
  function sd(e) {
    var t = Yl(e, 2);
    t !== null && Ye(t, e, 2);
  }
  function Os(e) {
    var t = ke();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), Bl) {
        el(true);
        try {
          l();
        } finally {
          el(false);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Yt,
      lastRenderedState: e
    }, t;
  }
  function ud(e, t, l, n) {
    return e.baseState = l, Bu(e, ne, typeof n == "function" ? n : Yt);
  }
  function Wm(e, t, l, n, a) {
    if (rc(e)) throw Error(_(485));
    if (e = t.action, e !== null) {
      var i = {
        payload: a,
        action: e,
        next: null,
        isTransition: true,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(s) {
          i.listeners.push(s);
        }
      };
      Y.T !== null ? l(true) : i.isTransition = false, n(i), l = t.pending, l === null ? (i.next = t.pending = i, od(t, i)) : (i.next = l.next, t.pending = l.next = i);
    }
  }
  function od(e, t) {
    var l = t.action, n = t.payload, a = e.state;
    if (t.isTransition) {
      var i = Y.T, s = {};
      Y.T = s;
      try {
        var u = l(a, n), o = Y.S;
        o !== null && o(s, u), Vo(e, t, u);
      } catch (d) {
        ks(e, t, d);
      } finally {
        i !== null && s.types !== null && (i.types = s.types), Y.T = i;
      }
    } else try {
      i = l(a, n), Vo(e, t, i);
    } catch (d) {
      ks(e, t, d);
    }
  }
  function Vo(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(function(n) {
      Ko(e, t, n);
    }, function(n) {
      return ks(e, t, n);
    }) : Ko(e, t, l);
  }
  function Ko(e, t, l) {
    t.status = "fulfilled", t.value = l, rd(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, od(e, l)));
  }
  function ks(e, t, l) {
    var n = e.pending;
    if (e.pending = null, n !== null) {
      n = n.next;
      do
        t.status = "rejected", t.reason = l, rd(t), t = t.next;
      while (t !== n);
    }
    e.action = null;
  }
  function rd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function fd(e, t) {
    return t;
  }
  function Jo(e, t) {
    if (F) {
      var l = ae.formState;
      if (l !== null) {
        e: {
          var n = Z;
          if (F) {
            if (ue) {
              t: {
                for (var a = ue, i = ut; a.nodeType !== 8; ) {
                  if (!i) {
                    a = null;
                    break t;
                  }
                  if (a = rt(a.nextSibling), a === null) {
                    a = null;
                    break t;
                  }
                }
                i = a.data, a = i === "F!" || i === "F" ? a : null;
              }
              if (a) {
                ue = rt(a.nextSibling), n = a.data === "F!";
                break e;
              }
            }
            xl(n);
          }
          n = false;
        }
        n && (t = l[0]);
      }
    }
    return l = ke(), l.memoizedState = l.baseState = t, n = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: fd,
      lastRenderedState: t
    }, l.queue = n, l = Td.bind(null, Z, n), n.dispatch = l, n = Os(false), i = Yu.bind(null, Z, false, n.queue), n = ke(), a = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, n.queue = a, l = Wm.bind(null, Z, a, i, l), a.dispatch = l, n.memoizedState = e, [
      t,
      l,
      false
    ];
  }
  function $o(e) {
    var t = pe();
    return dd(t, ne, e);
  }
  function dd(e, t, l) {
    if (t = Bu(e, t, fd)[0], e = fi(Yt)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
      var n = Ma(t);
    } catch (s) {
      throw s === Cn ? cc : s;
    }
    else n = t;
    t = pe();
    var a = t.queue, i = a.dispatch;
    return l !== t.memoizedState && (Z.flags |= 2048, jn(9, {
      destroy: void 0
    }, Fm.bind(null, a, l), null)), [
      n,
      i,
      e
    ];
  }
  function Fm(e, t) {
    e.action = t;
  }
  function Wo(e) {
    var t = pe(), l = ne;
    if (l !== null) return dd(t, l, e);
    pe(), t = t.memoizedState, l = pe();
    var n = l.queue.dispatch;
    return l.memoizedState = e, [
      t,
      n,
      false
    ];
  }
  function jn(e, t, l, n) {
    return e = {
      tag: e,
      create: l,
      deps: n,
      inst: t,
      next: null
    }, t = Z.updateQueue, t === null && (t = sc(), Z.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (n = l.next, l.next = e, e.next = n, t.lastEffect = e), e;
  }
  function hd() {
    return pe().memoizedState;
  }
  function di(e, t, l, n) {
    var a = ke();
    Z.flags |= e, a.memoizedState = jn(1 | t, {
      destroy: void 0
    }, l, n === void 0 ? null : n);
  }
  function oc(e, t, l, n) {
    var a = pe();
    n = n === void 0 ? null : n;
    var i = a.memoizedState.inst;
    ne !== null && n !== null && Eu(n, ne.memoizedState.deps) ? a.memoizedState = jn(t, i, l, n) : (Z.flags |= e, a.memoizedState = jn(1 | t, i, l, n));
  }
  function Fo(e, t) {
    di(8390656, 8, e, t);
  }
  function Lu(e, t) {
    oc(2048, 8, e, t);
  }
  function Im(e) {
    Z.flags |= 4;
    var t = Z.updateQueue;
    if (t === null) t = sc(), Z.updateQueue = t, t.events = [
      e
    ];
    else {
      var l = t.events;
      l === null ? t.events = [
        e
      ] : l.push(e);
    }
  }
  function md(e) {
    var t = pe().memoizedState;
    return Im({
      ref: t,
      nextImpl: e
    }), function() {
      if (I & 2) throw Error(_(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function xd(e, t) {
    return oc(4, 2, e, t);
  }
  function pd(e, t) {
    return oc(4, 4, e, t);
  }
  function gd(e, t) {
    if (typeof t == "function") {
      e = e();
      var l = t(e);
      return function() {
        typeof l == "function" ? l() : t(null);
      };
    }
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function vd(e, t, l) {
    l = l != null ? l.concat([
      e
    ]) : null, oc(4, 4, gd.bind(null, t, e), l);
  }
  function Hu() {
  }
  function bd(e, t) {
    var l = pe();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    return t !== null && Eu(t, n[1]) ? n[0] : (l.memoizedState = [
      e,
      t
    ], e);
  }
  function yd(e, t) {
    var l = pe();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    if (t !== null && Eu(t, n[1])) return n[0];
    if (n = e(), Bl) {
      el(true);
      try {
        e();
      } finally {
        el(false);
      }
    }
    return l.memoizedState = [
      n,
      t
    ], n;
  }
  function Ru(e, t, l) {
    return l === void 0 || Gt & 1073741824 && !(W & 261930) ? e.memoizedState = t : (e.memoizedState = l, e = u0(), Z.lanes |= e, gl |= e, l);
  }
  function zd(e, t, l, n) {
    return Pe(l, t) ? l : zn.current !== null ? (e = Ru(e, l, n), Pe(e, t) || (ze = true), e) : !(Gt & 42) || Gt & 1073741824 && !(W & 261930) ? (ze = true, e.memoizedState = l) : (e = u0(), Z.lanes |= e, gl |= e, t);
  }
  function jd(e, t, l, n, a) {
    var i = P.p;
    P.p = i !== 0 && 8 > i ? i : 8;
    var s = Y.T, u = {};
    Y.T = u, Yu(e, false, t, l);
    try {
      var o = a(), d = Y.S;
      if (d !== null && d(u, o), o !== null && typeof o == "object" && typeof o.then == "function") {
        var g = Km(o, n);
        la(e, t, g, Ie(e));
      } else la(e, t, n, Ie(e));
    } catch (p) {
      la(e, t, {
        then: function() {
        },
        status: "rejected",
        reason: p
      }, Ie());
    } finally {
      P.p = i, s !== null && u.types !== null && (s.types = u.types), Y.T = s;
    }
  }
  function Pm() {
  }
  function Us(e, t, l, n) {
    if (e.tag !== 5) throw Error(_(476));
    var a = Sd(e).queue;
    jd(e, a, t, Al, l === null ? Pm : function() {
      return Nd(e), l(n);
    });
  }
  function Sd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Al,
      baseState: Al,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Yt,
        lastRenderedState: Al
      },
      next: null
    };
    var l = {};
    return t.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Yt,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Nd(e) {
    var t = Sd(e);
    t.next === null && (t = e.alternate.memoizedState), la(e, t.next.queue, {}, Ie());
  }
  function Gu() {
    return Me(ya);
  }
  function _d() {
    return pe().memoizedState;
  }
  function wd() {
    return pe().memoizedState;
  }
  function ex(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Ie();
          e = sl(l);
          var n = ul(t, e, l);
          n !== null && (Ye(n, t, l), Pn(n, t, l)), t = {
            cache: _u()
          }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function tx(e, t, l) {
    var n = Ie();
    l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: false,
      eagerState: null,
      next: null
    }, rc(e) ? Ad(t, l) : (l = zu(e, t, l, n), l !== null && (Ye(l, e, n), Dd(l, t, n)));
  }
  function Td(e, t, l) {
    var n = Ie();
    la(e, t, l, n);
  }
  function la(e, t, l, n) {
    var a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (rc(e)) Ad(t, a);
    else {
      var i = e.alternate;
      if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
        var s = t.lastRenderedState, u = i(s, l);
        if (a.hasEagerState = true, a.eagerState = u, Pe(u, s)) return ic(e, t, a, 0), ae === null && ac(), false;
      } catch {
      } finally {
      }
      if (l = zu(e, t, a, n), l !== null) return Ye(l, e, n), Dd(l, t, n), true;
    }
    return false;
  }
  function Yu(e, t, l, n) {
    if (n = {
      lane: 2,
      revertLane: Wu(),
      gesture: null,
      action: n,
      hasEagerState: false,
      eagerState: null,
      next: null
    }, rc(e)) {
      if (t) throw Error(_(479));
    } else t = zu(e, l, n, 2), t !== null && Ye(t, e, 2);
  }
  function rc(e) {
    var t = e.alternate;
    return e === Z || t !== null && t === Z;
  }
  function Ad(e, t) {
    xn = ki = true;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function Dd(e, t, l) {
    if (l & 4194048) {
      var n = t.lanes;
      n &= e.pendingLanes, l |= n, t.lanes = l, mf(e, l);
    }
  }
  var ga = {
    readContext: Me,
    use: uc,
    useCallback: he,
    useContext: he,
    useEffect: he,
    useImperativeHandle: he,
    useLayoutEffect: he,
    useInsertionEffect: he,
    useMemo: he,
    useReducer: he,
    useRef: he,
    useState: he,
    useDebugValue: he,
    useDeferredValue: he,
    useTransition: he,
    useSyncExternalStore: he,
    useId: he,
    useHostTransitionStatus: he,
    useFormState: he,
    useActionState: he,
    useOptimistic: he,
    useMemoCache: he,
    useCacheRefresh: he
  };
  ga.useEffectEvent = he;
  var Ed = {
    readContext: Me,
    use: uc,
    useCallback: function(e, t) {
      return ke().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Me,
    useEffect: Fo,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([
        e
      ]) : null, di(4194308, 4, gd.bind(null, t, e), l);
    },
    useLayoutEffect: function(e, t) {
      return di(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      di(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = ke();
      t = t === void 0 ? null : t;
      var n = e();
      if (Bl) {
        el(true);
        try {
          e();
        } finally {
          el(false);
        }
      }
      return l.memoizedState = [
        n,
        t
      ], n;
    },
    useReducer: function(e, t, l) {
      var n = ke();
      if (l !== void 0) {
        var a = l(t);
        if (Bl) {
          el(true);
          try {
            l(t);
          } finally {
            el(false);
          }
        }
      } else a = t;
      return n.memoizedState = n.baseState = a, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: a
      }, n.queue = e, e = e.dispatch = tx.bind(null, Z, e), [
        n.memoizedState,
        e
      ];
    },
    useRef: function(e) {
      var t = ke();
      return e = {
        current: e
      }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Os(e);
      var t = e.queue, l = Td.bind(null, Z, t);
      return t.dispatch = l, [
        e.memoizedState,
        l
      ];
    },
    useDebugValue: Hu,
    useDeferredValue: function(e, t) {
      var l = ke();
      return Ru(l, e, t);
    },
    useTransition: function() {
      var e = Os(false);
      return e = jd.bind(null, Z, e.queue, true, false), ke().memoizedState = e, [
        false,
        e
      ];
    },
    useSyncExternalStore: function(e, t, l) {
      var n = Z, a = ke();
      if (F) {
        if (l === void 0) throw Error(_(407));
        l = l();
      } else {
        if (l = t(), ae === null) throw Error(_(349));
        W & 127 || nd(n, t, l);
      }
      a.memoizedState = l;
      var i = {
        value: l,
        getSnapshot: t
      };
      return a.queue = i, Fo(id.bind(null, n, i, e), [
        e
      ]), n.flags |= 2048, jn(9, {
        destroy: void 0
      }, ad.bind(null, n, i, l, t), null), l;
    },
    useId: function() {
      var e = ke(), t = ae.identifierPrefix;
      if (F) {
        var l = bt, n = vt;
        l = (n & ~(1 << 32 - Fe(n) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Ui++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else l = Jm++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Gu,
    useFormState: Jo,
    useActionState: Jo,
    useOptimistic: function(e) {
      var t = ke();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = Yu.bind(null, Z, true, l), l.dispatch = t, [
        e,
        t
      ];
    },
    useMemoCache: Uu,
    useCacheRefresh: function() {
      return ke().memoizedState = ex.bind(null, Z);
    },
    useEffectEvent: function(e) {
      var t = ke(), l = {
        impl: e
      };
      return t.memoizedState = l, function() {
        if (I & 2) throw Error(_(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, qu = {
    readContext: Me,
    use: uc,
    useCallback: bd,
    useContext: Me,
    useEffect: Lu,
    useImperativeHandle: vd,
    useInsertionEffect: xd,
    useLayoutEffect: pd,
    useMemo: yd,
    useReducer: fi,
    useRef: hd,
    useState: function() {
      return fi(Yt);
    },
    useDebugValue: Hu,
    useDeferredValue: function(e, t) {
      var l = pe();
      return zd(l, ne.memoizedState, e, t);
    },
    useTransition: function() {
      var e = fi(Yt)[0], t = pe().memoizedState;
      return [
        typeof e == "boolean" ? e : Ma(e),
        t
      ];
    },
    useSyncExternalStore: ld,
    useId: _d,
    useHostTransitionStatus: Gu,
    useFormState: $o,
    useActionState: $o,
    useOptimistic: function(e, t) {
      var l = pe();
      return ud(l, ne, e, t);
    },
    useMemoCache: Uu,
    useCacheRefresh: wd
  };
  qu.useEffectEvent = md;
  var Md = {
    readContext: Me,
    use: uc,
    useCallback: bd,
    useContext: Me,
    useEffect: Lu,
    useImperativeHandle: vd,
    useInsertionEffect: xd,
    useLayoutEffect: pd,
    useMemo: yd,
    useReducer: Hc,
    useRef: hd,
    useState: function() {
      return Hc(Yt);
    },
    useDebugValue: Hu,
    useDeferredValue: function(e, t) {
      var l = pe();
      return ne === null ? Ru(l, e, t) : zd(l, ne.memoizedState, e, t);
    },
    useTransition: function() {
      var e = Hc(Yt)[0], t = pe().memoizedState;
      return [
        typeof e == "boolean" ? e : Ma(e),
        t
      ];
    },
    useSyncExternalStore: ld,
    useId: _d,
    useHostTransitionStatus: Gu,
    useFormState: Wo,
    useActionState: Wo,
    useOptimistic: function(e, t) {
      var l = pe();
      return ne !== null ? ud(l, ne, e, t) : (l.baseState = e, [
        e,
        l.queue.dispatch
      ]);
    },
    useMemoCache: Uu,
    useCacheRefresh: wd
  };
  Md.useEffectEvent = md;
  function Rc(e, t, l, n) {
    t = e.memoizedState, l = l(n, t), l = l == null ? t : re({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Bs = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var n = Ie(), a = sl(n);
      a.payload = t, l != null && (a.callback = l), t = ul(e, a, n), t !== null && (Ye(t, e, n), Pn(t, e, n));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var n = Ie(), a = sl(n);
      a.tag = 1, a.payload = t, l != null && (a.callback = l), t = ul(e, a, n), t !== null && (Ye(t, e, n), Pn(t, e, n));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = Ie(), n = sl(l);
      n.tag = 2, t != null && (n.callback = t), t = ul(e, n, l), t !== null && (Ye(t, e, l), Pn(t, e, l));
    }
  };
  function Io(e, t, l, n, a, i, s) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(n, i, s) : t.prototype && t.prototype.isPureReactComponent ? !da(l, n) || !da(a, i) : true;
  }
  function Po(e, t, l, n) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, n), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, n), t.state !== e && Bs.enqueueReplaceState(t, t.state, null);
  }
  function Ll(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var n in t) n !== "ref" && (l[n] = t[n]);
    }
    if (e = e.defaultProps) {
      l === t && (l = re({}, l));
      for (var a in e) l[a] === void 0 && (l[a] = e[a]);
    }
    return l;
  }
  function Cd(e) {
    Ti(e);
  }
  function Od(e) {
    console.error(e);
  }
  function kd(e) {
    Ti(e);
  }
  function Bi(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, {
        componentStack: t.stack
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function er(e, t, l) {
    try {
      var n = e.onCaughtError;
      n(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Ls(e, t, l) {
    return l = sl(l), l.tag = 3, l.payload = {
      element: null
    }, l.callback = function() {
      Bi(e, t);
    }, l;
  }
  function Ud(e) {
    return e = sl(e), e.tag = 3, e;
  }
  function Bd(e, t, l, n) {
    var a = l.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var i = n.value;
      e.payload = function() {
        return a(i);
      }, e.callback = function() {
        er(t, l, n);
      };
    }
    var s = l.stateNode;
    s !== null && typeof s.componentDidCatch == "function" && (e.callback = function() {
      er(t, l, n), typeof a != "function" && (ol === null ? ol = /* @__PURE__ */ new Set([
        this
      ]) : ol.add(this));
      var u = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: u !== null ? u : ""
      });
    });
  }
  function lx(e, t, l, n, a) {
    if (l.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (t = l.alternate, t !== null && Mn(t, l, a, true), l = et.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return ot === null ? Yi() : l.alternate === null && me === 0 && (me = 3), l.flags &= -257, l.flags |= 65536, l.lanes = a, n === Mi ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([
              n
            ]) : t.add(n), Wc(e, n, a)), false;
          case 22:
            return l.flags |= 65536, n === Mi ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([
                n
              ])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([
              n
            ]) : l.add(n)), Wc(e, n, a)), false;
        }
        throw Error(_(435, l.tag));
      }
      return Wc(e, n, a), Yi(), false;
    }
    if (F) return t = et.current, t !== null ? (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, n !== Ns && (e = Error(_(422), {
      cause: n
    }), ma(st(e, l)))) : (n !== Ns && (t = Error(_(423), {
      cause: n
    }), ma(st(t, l))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, n = st(n, l), a = Ls(e.stateNode, n, a), Lc(e, a), me !== 4 && (me = 2)), false;
    var i = Error(_(520), {
      cause: n
    });
    if (i = st(i, l), ia === null ? ia = [
      i
    ] : ia.push(i), me !== 4 && (me = 2), t === null) return true;
    n = st(n, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = a & -a, l.lanes |= e, e = Ls(l.stateNode, n, e), Lc(l, e), false;
        case 1:
          if (t = l.type, i = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (ol === null || !ol.has(i)))) return l.flags |= 65536, a &= -a, l.lanes |= a, a = Ud(a), Bd(a, e, l, n), Lc(l, a), false;
      }
      l = l.return;
    } while (l !== null);
    return false;
  }
  var Qu = Error(_(461)), ze = false;
  function Ae(e, t, l, n) {
    t.child = e === null ? Wf(t, null, l, n) : Ul(t, e.child, l, n);
  }
  function tr(e, t, l, n, a) {
    l = l.render;
    var i = t.ref;
    if ("ref" in n) {
      var s = {};
      for (var u in n) u !== "ref" && (s[u] = n[u]);
    } else s = n;
    return kl(t), n = Mu(e, t, l, s, i, a), u = Cu(), e !== null && !ze ? (Ou(e, t, a), qt(e, t, a)) : (F && u && Su(t), t.flags |= 1, Ae(e, t, n, a), t.child);
  }
  function lr(e, t, l, n, a) {
    if (e === null) {
      var i = l.type;
      return typeof i == "function" && !ju(i) && i.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = i, Ld(e, t, i, n, a)) : (e = oi(l.type, null, n, t, t.mode, a), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (i = e.child, !Xu(e, a)) {
      var s = i.memoizedProps;
      if (l = l.compare, l = l !== null ? l : da, l(s, n) && e.ref === t.ref) return qt(e, t, a);
    }
    return t.flags |= 1, e = Bt(i, n), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Ld(e, t, l, n, a) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (da(i, n) && e.ref === t.ref) if (ze = false, t.pendingProps = n = i, Xu(e, a)) e.flags & 131072 && (ze = true);
      else return t.lanes = e.lanes, qt(e, t, a);
    }
    return Hs(e, t, l, n, a);
  }
  function Hd(e, t, l, n) {
    var a = n.children, i = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.mode === "hidden") {
      if (t.flags & 128) {
        if (i = i !== null ? i.baseLanes | l : l, e !== null) {
          for (n = t.child = e.child, a = 0; n !== null; ) a = a | n.lanes | n.childLanes, n = n.sibling;
          n = a & ~i;
        } else n = 0, t.child = null;
        return nr(e, t, i, l, n);
      }
      if (l & 536870912) t.memoizedState = {
        baseLanes: 0,
        cachePool: null
      }, e !== null && ri(t, i !== null ? i.cachePool : null), i !== null ? Zo(t, i) : Ms(), Pf(t);
      else return n = t.lanes = 536870912, nr(e, t, i !== null ? i.baseLanes | l : l, l, n);
    } else i !== null ? (ri(t, i.cachePool), Zo(t, i), It(), t.memoizedState = null) : (e !== null && ri(t, null), Ms(), It());
    return Ae(e, t, a, l), t.child;
  }
  function Vn(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function nr(e, t, l, n, a) {
    var i = wu();
    return i = i === null ? null : {
      parent: be._currentValue,
      pool: i
    }, t.memoizedState = {
      baseLanes: l,
      cachePool: i
    }, e !== null && ri(t, null), Ms(), Pf(t), e !== null && Mn(e, t, n, true), t.childLanes = a, null;
  }
  function hi(e, t) {
    return t = Li({
      mode: t.mode,
      children: t.children
    }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function ar(e, t, l) {
    return Ul(t, e.child, null, l), e = hi(t, t.pendingProps), e.flags |= 2, Ve(t), t.memoizedState = null, e;
  }
  function nx(e, t, l) {
    var n = t.pendingProps, a = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (F) {
        if (n.mode === "hidden") return e = hi(t, n), t.lanes = 536870912, Vn(null, e);
        if (Cs(t), (e = ue) ? (e = E0(e, ut), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ml !== null ? {
            id: vt,
            overflow: bt
          } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Qf(e), l.return = t, t.child = l, Ee = t, ue = null)) : e = null, e === null) throw xl(t);
        return t.lanes = 536870912, null;
      }
      return hi(t, n);
    }
    var i = e.memoizedState;
    if (i !== null) {
      var s = i.dehydrated;
      if (Cs(t), a) if (t.flags & 256) t.flags &= -257, t = ar(e, t, l);
      else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
      else throw Error(_(558));
      else if (ze || Mn(e, t, l, false), a = (l & e.childLanes) !== 0, ze || a) {
        if (n = ae, n !== null && (s = xf(n, l), s !== 0 && s !== i.retryLane)) throw i.retryLane = s, Yl(e, s), Ye(n, e, s), Qu;
        Yi(), t = ar(e, t, l);
      } else e = i.treeContext, ue = rt(s.nextSibling), Ee = t, F = true, cl = null, ut = false, e !== null && Zf(t, e), t = hi(t, n), t.flags |= 4096;
      return t;
    }
    return e = Bt(e.child, {
      mode: n.mode,
      children: n.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function mi(e, t) {
    var l = t.ref;
    if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object") throw Error(_(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Hs(e, t, l, n, a) {
    return kl(t), l = Mu(e, t, l, n, void 0, a), n = Cu(), e !== null && !ze ? (Ou(e, t, a), qt(e, t, a)) : (F && n && Su(t), t.flags |= 1, Ae(e, t, l, a), t.child);
  }
  function ir(e, t, l, n, a, i) {
    return kl(t), t.updateQueue = null, l = td(t, n, l, a), ed(e), n = Cu(), e !== null && !ze ? (Ou(e, t, i), qt(e, t, i)) : (F && n && Su(t), t.flags |= 1, Ae(e, t, l, i), t.child);
  }
  function cr(e, t, l, n, a) {
    if (kl(t), t.stateNode === null) {
      var i = cn, s = l.contextType;
      typeof s == "object" && s !== null && (i = Me(s)), i = new l(n, i), t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = Bs, t.stateNode = i, i._reactInternals = t, i = t.stateNode, i.props = n, i.state = t.memoizedState, i.refs = {}, Au(t), s = l.contextType, i.context = typeof s == "object" && s !== null ? Me(s) : cn, i.state = t.memoizedState, s = l.getDerivedStateFromProps, typeof s == "function" && (Rc(t, l, s, n), i.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (s = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), s !== i.state && Bs.enqueueReplaceState(i, i.state, null), ta(t, n, i, a), ea(), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308), n = true;
    } else if (e === null) {
      i = t.stateNode;
      var u = t.memoizedProps, o = Ll(l, u);
      i.props = o;
      var d = i.context, g = l.contextType;
      s = cn, typeof g == "object" && g !== null && (s = Me(g));
      var p = l.getDerivedStateFromProps;
      g = typeof p == "function" || typeof i.getSnapshotBeforeUpdate == "function", u = t.pendingProps !== u, g || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u || d !== s) && Po(t, i, n, s), $t = false;
      var m = t.memoizedState;
      i.state = m, ta(t, n, i, a), ea(), d = t.memoizedState, u || m !== d || $t ? (typeof p == "function" && (Rc(t, l, p, n), d = t.memoizedState), (o = $t || Io(t, l, o, n, m, d, s)) ? (g || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = n, t.memoizedState = d), i.props = n, i.state = d, i.context = s, n = o) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), n = false);
    } else {
      i = t.stateNode, Ds(e, t), s = t.memoizedProps, g = Ll(l, s), i.props = g, p = t.pendingProps, m = i.context, d = l.contextType, o = cn, typeof d == "object" && d !== null && (o = Me(d)), u = l.getDerivedStateFromProps, (d = typeof u == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== p || m !== o) && Po(t, i, n, o), $t = false, m = t.memoizedState, i.state = m, ta(t, n, i, a), ea();
      var x = t.memoizedState;
      s !== p || m !== x || $t || e !== null && e.dependencies !== null && Ei(e.dependencies) ? (typeof u == "function" && (Rc(t, l, u, n), x = t.memoizedState), (g = $t || Io(t, l, g, n, m, x, o) || e !== null && e.dependencies !== null && Ei(e.dependencies)) ? (d || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(n, x, o), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(n, x, o)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), t.memoizedProps = n, t.memoizedState = x), i.props = n, i.state = x, i.context = o, n = g) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), n = false);
    }
    return i = n, mi(e, t), n = (t.flags & 128) !== 0, i || n ? (i = t.stateNode, l = n && typeof l.getDerivedStateFromError != "function" ? null : i.render(), t.flags |= 1, e !== null && n ? (t.child = Ul(t, e.child, null, a), t.child = Ul(t, null, l, a)) : Ae(e, t, l, a), t.memoizedState = i.state, e = t.child) : e = qt(e, t, a), e;
  }
  function sr(e, t, l, n) {
    return Ol(), t.flags |= 256, Ae(e, t, l, n), t.child;
  }
  var Gc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Yc(e) {
    return {
      baseLanes: e,
      cachePool: Kf()
    };
  }
  function qc(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Je), e;
  }
  function Rd(e, t, l) {
    var n = t.pendingProps, a = false, i = (t.flags & 128) !== 0, s;
    if ((s = i) || (s = e !== null && e.memoizedState === null ? false : (xe.current & 2) !== 0), s && (a = true, t.flags &= -129), s = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (F) {
        if (a ? Ft(t) : It(), (e = ue) ? (e = E0(e, ut), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ml !== null ? {
            id: vt,
            overflow: bt
          } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Qf(e), l.return = t, t.child = l, Ee = t, ue = null)) : e = null, e === null) throw xl(t);
        return Is(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var u = n.children;
      return n = n.fallback, a ? (It(), a = t.mode, u = Li({
        mode: "hidden",
        children: u
      }, a), n = Dl(n, a, l, null), u.return = t, n.return = t, u.sibling = n, t.child = u, n = t.child, n.memoizedState = Yc(l), n.childLanes = qc(e, s, l), t.memoizedState = Gc, Vn(null, n)) : (Ft(t), Rs(t, u));
    }
    var o = e.memoizedState;
    if (o !== null && (u = o.dehydrated, u !== null)) {
      if (i) t.flags & 256 ? (Ft(t), t.flags &= -257, t = Qc(e, t, l)) : t.memoizedState !== null ? (It(), t.child = e.child, t.flags |= 128, t = null) : (It(), u = n.fallback, a = t.mode, n = Li({
        mode: "visible",
        children: n.children
      }, a), u = Dl(u, a, l, null), u.flags |= 2, n.return = t, u.return = t, n.sibling = u, t.child = n, Ul(t, e.child, null, l), n = t.child, n.memoizedState = Yc(l), n.childLanes = qc(e, s, l), t.memoizedState = Gc, t = Vn(null, n));
      else if (Ft(t), Is(u)) {
        if (s = u.nextSibling && u.nextSibling.dataset, s) var d = s.dgst;
        s = d, n = Error(_(419)), n.stack = "", n.digest = s, ma({
          value: n,
          source: null,
          stack: null
        }), t = Qc(e, t, l);
      } else if (ze || Mn(e, t, l, false), s = (l & e.childLanes) !== 0, ze || s) {
        if (s = ae, s !== null && (n = xf(s, l), n !== 0 && n !== o.retryLane)) throw o.retryLane = n, Yl(e, n), Ye(s, e, n), Qu;
        Fs(u) || Yi(), t = Qc(e, t, l);
      } else Fs(u) ? (t.flags |= 192, t.child = e.child, t = null) : (e = o.treeContext, ue = rt(u.nextSibling), Ee = t, F = true, cl = null, ut = false, e !== null && Zf(t, e), t = Rs(t, n.children), t.flags |= 4096);
      return t;
    }
    return a ? (It(), u = n.fallback, a = t.mode, o = e.child, d = o.sibling, n = Bt(o, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = o.subtreeFlags & 65011712, d !== null ? u = Bt(d, u) : (u = Dl(u, a, l, null), u.flags |= 2), u.return = t, n.return = t, n.sibling = u, t.child = n, Vn(null, n), n = t.child, u = e.child.memoizedState, u === null ? u = Yc(l) : (a = u.cachePool, a !== null ? (o = be._currentValue, a = a.parent !== o ? {
      parent: o,
      pool: o
    } : a) : a = Kf(), u = {
      baseLanes: u.baseLanes | l,
      cachePool: a
    }), n.memoizedState = u, n.childLanes = qc(e, s, l), t.memoizedState = Gc, Vn(e.child, n)) : (Ft(t), l = e.child, e = l.sibling, l = Bt(l, {
      mode: "visible",
      children: n.children
    }), l.return = t, l.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [
      e
    ], t.flags |= 16) : s.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function Rs(e, t) {
    return t = Li({
      mode: "visible",
      children: t
    }, e.mode), t.return = e, e.child = t;
  }
  function Li(e, t) {
    return e = Ke(22, e, null, t), e.lanes = 0, e;
  }
  function Qc(e, t, l) {
    return Ul(t, e.child, null, l), e = Rs(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function ur(e, t, l) {
    e.lanes |= t;
    var n = e.alternate;
    n !== null && (n.lanes |= t), ws(e.return, t, l);
  }
  function Xc(e, t, l, n, a, i) {
    var s = e.memoizedState;
    s === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: l,
      tailMode: a,
      treeForkCount: i
    } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = n, s.tail = l, s.tailMode = a, s.treeForkCount = i);
  }
  function Gd(e, t, l) {
    var n = t.pendingProps, a = n.revealOrder, i = n.tail;
    n = n.children;
    var s = xe.current, u = (s & 2) !== 0;
    if (u ? (s = s & 1 | 2, t.flags |= 128) : s &= 1, ce(xe, s), Ae(e, t, n, l), n = F ? ha : 0, !u && e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && ur(e, l, t);
      else if (e.tag === 19) ur(e, l, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    switch (a) {
      case "forwards":
        for (l = t.child, a = null; l !== null; ) e = l.alternate, e !== null && Oi(e) === null && (a = l), l = l.sibling;
        l = a, l === null ? (a = t.child, t.child = null) : (a = l.sibling, l.sibling = null), Xc(t, false, a, l, i, n);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, a = t.child, t.child = null; a !== null; ) {
          if (e = a.alternate, e !== null && Oi(e) === null) {
            t.child = a;
            break;
          }
          e = a.sibling, a.sibling = l, l = a, a = e;
        }
        Xc(t, true, l, null, i, n);
        break;
      case "together":
        Xc(t, false, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function qt(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), gl |= t.lanes, !(l & t.childLanes)) if (e !== null) {
      if (Mn(e, t, l, false), (l & t.childLanes) === 0) return null;
    } else return null;
    if (e !== null && t.child !== e.child) throw Error(_(153));
    if (t.child !== null) {
      for (e = t.child, l = Bt(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; ) e = e.sibling, l = l.sibling = Bt(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function Xu(e, t) {
    return e.lanes & t ? true : (e = e.dependencies, !!(e !== null && Ei(e)));
  }
  function ax(e, t, l) {
    switch (t.tag) {
      case 3:
        Si(t, t.stateNode.containerInfo), Wt(t, be, e.memoizedState.cache), Ol();
        break;
      case 27:
      case 5:
        hs(t);
        break;
      case 4:
        Si(t, t.stateNode.containerInfo);
        break;
      case 10:
        Wt(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return t.flags |= 128, Cs(t), null;
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null) return n.dehydrated !== null ? (Ft(t), t.flags |= 128, null) : l & t.child.childLanes ? Rd(e, t, l) : (Ft(t), e = qt(e, t, l), e !== null ? e.sibling : null);
        Ft(t);
        break;
      case 19:
        var a = (e.flags & 128) !== 0;
        if (n = (l & t.childLanes) !== 0, n || (Mn(e, t, l, false), n = (l & t.childLanes) !== 0), a) {
          if (n) return Gd(e, t, l);
          t.flags |= 128;
        }
        if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), ce(xe, xe.current), n) break;
        return null;
      case 22:
        return t.lanes = 0, Hd(e, t, l, t.pendingProps);
      case 24:
        Wt(t, be, e.memoizedState.cache);
    }
    return qt(e, t, l);
  }
  function Yd(e, t, l) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps) ze = true;
    else {
      if (!Xu(e, l) && !(t.flags & 128)) return ze = false, ax(e, t, l);
      ze = !!(e.flags & 131072);
    }
    else ze = false, F && t.flags & 1048576 && Xf(t, ha, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (e = wl(t.elementType), t.type = e, typeof e == "function") ju(e) ? (n = Ll(e, n), t.tag = 1, t = cr(null, t, e, n, l)) : (t.tag = 0, t = Hs(null, t, e, n, l));
          else {
            if (e != null) {
              var a = e.$$typeof;
              if (a === uu) {
                t.tag = 11, t = tr(null, t, e, n, l);
                break e;
              } else if (a === ou) {
                t.tag = 14, t = lr(null, t, e, n, l);
                break e;
              }
            }
            throw t = fs(e) || e, Error(_(306, t, ""));
          }
        }
        return t;
      case 0:
        return Hs(e, t, t.type, t.pendingProps, l);
      case 1:
        return n = t.type, a = Ll(n, t.pendingProps), cr(e, t, n, a, l);
      case 3:
        e: {
          if (Si(t, t.stateNode.containerInfo), e === null) throw Error(_(387));
          n = t.pendingProps;
          var i = t.memoizedState;
          a = i.element, Ds(e, t), ta(t, n, null, l);
          var s = t.memoizedState;
          if (n = s.cache, Wt(t, be, n), n !== i.cache && Ts(t, [
            be
          ], l, true), ea(), n = s.element, i.isDehydrated) if (i = {
            element: n,
            isDehydrated: false,
            cache: s.cache
          }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
            t = sr(e, t, n, l);
            break e;
          } else if (n !== a) {
            a = st(Error(_(424)), t), ma(a), t = sr(e, t, n, l);
            break e;
          } else {
            switch (e = t.stateNode.containerInfo, e.nodeType) {
              case 9:
                e = e.body;
                break;
              default:
                e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
            }
            for (ue = rt(e.firstChild), Ee = t, F = true, cl = null, ut = true, l = Wf(t, null, n, l), t.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          }
          else {
            if (Ol(), n === a) {
              t = qt(e, t, l);
              break e;
            }
            Ae(e, t, n, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return mi(e, t), e === null ? (l = Ar(t.type, null, t.pendingProps, null)) ? t.memoizedState = l : F || (l = t.type, e = t.pendingProps, n = Zi(il.current).createElement(l), n[De] = t, n[qe] = e, Ce(n, l, e), we(n), t.stateNode = n) : t.memoizedState = Ar(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
      case 27:
        return hs(t), e === null && F && (n = t.stateNode = M0(t.type, t.pendingProps, il.current), Ee = t, ut = true, a = ue, bl(t.type) ? (Ps = a, ue = rt(n.firstChild)) : ue = a), Ae(e, t, t.pendingProps.children, l), mi(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && F && ((a = n = ue) && (n = kx(n, t.type, t.pendingProps, ut), n !== null ? (t.stateNode = n, Ee = t, ue = rt(n.firstChild), ut = false, a = true) : a = false), a || xl(t)), hs(t), a = t.type, i = t.pendingProps, s = e !== null ? e.memoizedProps : null, n = i.children, $s(a, i) ? n = null : s !== null && $s(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Mu(e, t, $m, null, null, l), ya._currentValue = a), mi(e, t), Ae(e, t, n, l), t.child;
      case 6:
        return e === null && F && ((e = l = ue) && (l = Ux(l, t.pendingProps, ut), l !== null ? (t.stateNode = l, Ee = t, ue = null, e = true) : e = false), e || xl(t)), null;
      case 13:
        return Rd(e, t, l);
      case 4:
        return Si(t, t.stateNode.containerInfo), n = t.pendingProps, e === null ? t.child = Ul(t, null, n, l) : Ae(e, t, n, l), t.child;
      case 11:
        return tr(e, t, t.type, t.pendingProps, l);
      case 7:
        return Ae(e, t, t.pendingProps, l), t.child;
      case 8:
        return Ae(e, t, t.pendingProps.children, l), t.child;
      case 12:
        return Ae(e, t, t.pendingProps.children, l), t.child;
      case 10:
        return n = t.pendingProps, Wt(t, t.type, n.value), Ae(e, t, n.children, l), t.child;
      case 9:
        return a = t.type._context, n = t.pendingProps.children, kl(t), a = Me(a), n = n(a), t.flags |= 1, Ae(e, t, n, l), t.child;
      case 14:
        return lr(e, t, t.type, t.pendingProps, l);
      case 15:
        return Ld(e, t, t.type, t.pendingProps, l);
      case 19:
        return Gd(e, t, l);
      case 31:
        return nx(e, t, l);
      case 22:
        return Hd(e, t, l, t.pendingProps);
      case 24:
        return kl(t), n = Me(be), e === null ? (a = wu(), a === null && (a = ae, i = _u(), a.pooledCache = i, i.refCount++, i !== null && (a.pooledCacheLanes |= l), a = i), t.memoizedState = {
          parent: n,
          cache: a
        }, Au(t), Wt(t, be, a)) : (e.lanes & l && (Ds(e, t), ta(t, null, null, l), ea()), a = e.memoizedState, i = t.memoizedState, a.parent !== n ? (a = {
          parent: n,
          cache: n
        }, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Wt(t, be, n)) : (n = i.cache, Wt(t, be, n), n !== a.cache && Ts(t, [
          be
        ], l, true))), Ae(e, t, t.pendingProps.children, l), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(_(156, t.tag));
  }
  function Tt(e) {
    e.flags |= 4;
  }
  function Zc(e, t, l, n, a) {
    if ((t = (e.mode & 32) !== 0) && (t = false), t) {
      if (e.flags |= 16777216, (a & 335544128) === a) if (e.stateNode.complete) e.flags |= 8192;
      else if (f0()) e.flags |= 8192;
      else throw Ml = Mi, Tu;
    } else e.flags &= -16777217;
  }
  function or(e, t) {
    if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
    else if (e.flags |= 16777216, !k0(t)) if (f0()) e.flags |= 8192;
    else throw Ml = Mi, Tu;
  }
  function Wa(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? df() : 536870912, e.lanes |= t, Sn |= t);
  }
  function Gn(e, t) {
    if (!F) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var l = null; t !== null; ) t.alternate !== null && (l = t), t = t.sibling;
        l === null ? e.tail = null : l.sibling = null;
        break;
      case "collapsed":
        l = e.tail;
        for (var n = null; l !== null; ) l.alternate !== null && (n = l), l = l.sibling;
        n === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : n.sibling = null;
    }
  }
  function se(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, n = 0;
    if (t) for (var a = e.child; a !== null; ) l |= a.lanes | a.childLanes, n |= a.subtreeFlags & 65011712, n |= a.flags & 65011712, a.return = e, a = a.sibling;
    else for (a = e.child; a !== null; ) l |= a.lanes | a.childLanes, n |= a.subtreeFlags, n |= a.flags, a.return = e, a = a.sibling;
    return e.subtreeFlags |= n, e.childLanes = l, t;
  }
  function ix(e, t, l) {
    var n = t.pendingProps;
    switch (Nu(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return se(t), null;
      case 1:
        return se(t), null;
      case 3:
        return l = t.stateNode, n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Lt(be), gn(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Zl(t) ? Tt(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Bc())), se(t), null;
      case 26:
        var a = t.type, i = t.memoizedState;
        return e === null ? (Tt(t), i !== null ? (se(t), or(t, i)) : (se(t), Zc(t, a, null, n, l))) : i ? i !== e.memoizedState ? (Tt(t), se(t), or(t, i)) : (se(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== n && Tt(t), se(t), Zc(t, a, e, n, l)), null;
      case 27:
        if (Ni(t), l = il.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== n && Tt(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(_(166));
            return se(t), null;
          }
          e = jt.current, Zl(t) ? Ho(t) : (e = M0(a, n, l), t.stateNode = e, Tt(t));
        }
        return se(t), null;
      case 5:
        if (Ni(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== n && Tt(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(_(166));
            return se(t), null;
          }
          if (i = jt.current, Zl(t)) Ho(t);
          else {
            var s = Zi(il.current);
            switch (i) {
              case 1:
                i = s.createElementNS("http://www.w3.org/2000/svg", a);
                break;
              case 2:
                i = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                break;
              default:
                switch (a) {
                  case "svg":
                    i = s.createElementNS("http://www.w3.org/2000/svg", a);
                    break;
                  case "math":
                    i = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                    break;
                  case "script":
                    i = s.createElement("div"), i.innerHTML = "<script><\/script>", i = i.removeChild(i.firstChild);
                    break;
                  case "select":
                    i = typeof n.is == "string" ? s.createElement("select", {
                      is: n.is
                    }) : s.createElement("select"), n.multiple ? i.multiple = true : n.size && (i.size = n.size);
                    break;
                  default:
                    i = typeof n.is == "string" ? s.createElement(a, {
                      is: n.is
                    }) : s.createElement(a);
                }
            }
            i[De] = t, i[qe] = n;
            e: for (s = t.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6) i.appendChild(s.stateNode);
              else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                s.child.return = s, s = s.child;
                continue;
              }
              if (s === t) break e;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === t) break e;
                s = s.return;
              }
              s.sibling.return = s.return, s = s.sibling;
            }
            t.stateNode = i;
            e: switch (Ce(i, a, n), a) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break e;
              case "img":
                n = true;
                break e;
              default:
                n = false;
            }
            n && Tt(t);
          }
        }
        return se(t), Zc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l), null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && Tt(t);
        else {
          if (typeof n != "string" && t.stateNode === null) throw Error(_(166));
          if (e = il.current, Zl(t)) {
            if (e = t.stateNode, l = t.memoizedProps, n = null, a = Ee, a !== null) switch (a.tag) {
              case 27:
              case 5:
                n = a.memoizedProps;
            }
            e[De] = t, e = !!(e.nodeValue === l || n !== null && n.suppressHydrationWarning === true || T0(e.nodeValue, l)), e || xl(t, true);
          } else e = Zi(e).createTextNode(n), e[De] = t, t.stateNode = e;
        }
        return se(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (n = Zl(t), l !== null) {
            if (e === null) {
              if (!n) throw Error(_(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(_(557));
              e[De] = t;
            } else Ol(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
            se(t), e = false;
          } else l = Bc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = true;
          if (!e) return t.flags & 256 ? (Ve(t), t) : (Ve(t), null);
          if (t.flags & 128) throw Error(_(558));
        }
        return se(t), null;
      case 13:
        if (n = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (a = Zl(t), n !== null && n.dehydrated !== null) {
            if (e === null) {
              if (!a) throw Error(_(318));
              if (a = t.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(_(317));
              a[De] = t;
            } else Ol(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
            se(t), a = false;
          } else a = Bc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = true;
          if (!a) return t.flags & 256 ? (Ve(t), t) : (Ve(t), null);
        }
        return Ve(t), t.flags & 128 ? (t.lanes = l, t) : (l = n !== null, e = e !== null && e.memoizedState !== null, l && (n = t.child, a = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (a = n.alternate.memoizedState.cachePool.pool), i = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (i = n.memoizedState.cachePool.pool), i !== a && (n.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Wa(t, t.updateQueue), se(t), null);
      case 4:
        return gn(), e === null && Fu(t.stateNode.containerInfo), se(t), null;
      case 10:
        return Lt(t.type), se(t), null;
      case 19:
        if (Te(xe), n = t.memoizedState, n === null) return se(t), null;
        if (a = (t.flags & 128) !== 0, i = n.rendering, i === null) if (a) Gn(n, false);
        else {
          if (me !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
            if (i = Oi(e), i !== null) {
              for (t.flags |= 128, Gn(n, false), e = i.updateQueue, t.updateQueue = e, Wa(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; ) qf(l, e), l = l.sibling;
              return ce(xe, xe.current & 1 | 2), F && Mt(t, n.treeForkCount), t.child;
            }
            e = e.sibling;
          }
          n.tail !== null && $e() > Ri && (t.flags |= 128, a = true, Gn(n, false), t.lanes = 4194304);
        }
        else {
          if (!a) if (e = Oi(i), e !== null) {
            if (t.flags |= 128, a = true, e = e.updateQueue, t.updateQueue = e, Wa(t, e), Gn(n, true), n.tail === null && n.tailMode === "hidden" && !i.alternate && !F) return se(t), null;
          } else 2 * $e() - n.renderingStartTime > Ri && l !== 536870912 && (t.flags |= 128, a = true, Gn(n, false), t.lanes = 4194304);
          n.isBackwards ? (i.sibling = t.child, t.child = i) : (e = n.last, e !== null ? e.sibling = i : t.child = i, n.last = i);
        }
        return n.tail !== null ? (e = n.tail, n.rendering = e, n.tail = e.sibling, n.renderingStartTime = $e(), e.sibling = null, l = xe.current, ce(xe, a ? l & 1 | 2 : l & 1), F && Mt(t, n.treeForkCount), e) : (se(t), null);
      case 22:
      case 23:
        return Ve(t), Du(), n = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== n && (t.flags |= 8192) : n && (t.flags |= 8192), n ? l & 536870912 && !(t.flags & 128) && (se(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : se(t), l = t.updateQueue, l !== null && Wa(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), n = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), n !== l && (t.flags |= 2048), e !== null && Te(El), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Lt(be), se(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(_(156, t.tag));
  }
  function cx(e, t) {
    switch (Nu(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Lt(be), gn(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Ni(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Ve(t), t.alternate === null) throw Error(_(340));
          Ol();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Ve(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(_(340));
          Ol();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Te(xe), null;
      case 4:
        return gn(), null;
      case 10:
        return Lt(t.type), null;
      case 22:
      case 23:
        return Ve(t), Du(), e !== null && Te(El), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Lt(be), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function qd(e, t) {
    switch (Nu(t), t.tag) {
      case 3:
        Lt(be), gn();
        break;
      case 26:
      case 27:
      case 5:
        Ni(t);
        break;
      case 4:
        gn();
        break;
      case 31:
        t.memoizedState !== null && Ve(t);
        break;
      case 13:
        Ve(t);
        break;
      case 19:
        Te(xe);
        break;
      case 10:
        Lt(t.type);
        break;
      case 22:
      case 23:
        Ve(t), Du(), e !== null && Te(El);
        break;
      case 24:
        Lt(be);
    }
  }
  function Ca(e, t) {
    try {
      var l = t.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var a = n.next;
        l = a;
        do {
          if ((l.tag & e) === e) {
            n = void 0;
            var i = l.create, s = l.inst;
            n = i(), s.destroy = n;
          }
          l = l.next;
        } while (l !== a);
      }
    } catch (u) {
      te(t, t.return, u);
    }
  }
  function pl(e, t, l) {
    try {
      var n = t.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var i = a.next;
        n = i;
        do {
          if ((n.tag & e) === e) {
            var s = n.inst, u = s.destroy;
            if (u !== void 0) {
              s.destroy = void 0, a = t;
              var o = l, d = u;
              try {
                d();
              } catch (g) {
                te(a, o, g);
              }
            }
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (g) {
      te(t, t.return, g);
    }
  }
  function Qd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        If(t, l);
      } catch (n) {
        te(e, e.return, n);
      }
    }
  }
  function Xd(e, t, l) {
    l.props = Ll(e.type, e.memoizedProps), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (n) {
      te(e, t, n);
    }
  }
  function na(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var n = e.stateNode;
            break;
          case 30:
            n = e.stateNode;
            break;
          default:
            n = e.stateNode;
        }
        typeof l == "function" ? e.refCleanup = l(n) : l.current = n;
      }
    } catch (a) {
      te(e, t, a);
    }
  }
  function yt(e, t) {
    var l = e.ref, n = e.refCleanup;
    if (l !== null) if (typeof n == "function") try {
      n();
    } catch (a) {
      te(e, t, a);
    } finally {
      e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
    }
    else if (typeof l == "function") try {
      l(null);
    } catch (a) {
      te(e, t, a);
    }
    else l.current = null;
  }
  function Zd(e) {
    var t = e.type, l = e.memoizedProps, n = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && n.focus();
          break e;
        case "img":
          l.src ? n.src = l.src : l.srcSet && (n.srcset = l.srcSet);
      }
    } catch (a) {
      te(e, e.return, a);
    }
  }
  function Vc(e, t, l) {
    try {
      var n = e.stateNode;
      Ax(n, e.type, l, t), n[qe] = t;
    } catch (a) {
      te(e, e.return, a);
    }
  }
  function Vd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && bl(e.type) || e.tag === 4;
  }
  function Kc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Vd(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && bl(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Gs(e, t, l) {
    var n = e.tag;
    if (n === 5 || n === 6) e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = kt));
    else if (n !== 4 && (n === 27 && bl(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null)) for (Gs(e, t, l), e = e.sibling; e !== null; ) Gs(e, t, l), e = e.sibling;
  }
  function Hi(e, t, l) {
    var n = e.tag;
    if (n === 5 || n === 6) e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (n !== 4 && (n === 27 && bl(e.type) && (l = e.stateNode), e = e.child, e !== null)) for (Hi(e, t, l), e = e.sibling; e !== null; ) Hi(e, t, l), e = e.sibling;
  }
  function Kd(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var n = e.type, a = t.attributes; a.length; ) t.removeAttributeNode(a[0]);
      Ce(t, n, l), t[De] = e, t[qe] = l;
    } catch (i) {
      te(e, e.return, i);
    }
  }
  var Ct = false, ve = false, Jc = false, rr = typeof WeakSet == "function" ? WeakSet : Set, _e = null;
  function sx(e, t) {
    if (e = e.containerInfo, Ks = $i, e = kf(e), bu(e)) {
      if ("selectionStart" in e) var l = {
        start: e.selectionStart,
        end: e.selectionEnd
      };
      else e: {
        l = (l = e.ownerDocument) && l.defaultView || window;
        var n = l.getSelection && l.getSelection();
        if (n && n.rangeCount !== 0) {
          l = n.anchorNode;
          var a = n.anchorOffset, i = n.focusNode;
          n = n.focusOffset;
          try {
            l.nodeType, i.nodeType;
          } catch {
            l = null;
            break e;
          }
          var s = 0, u = -1, o = -1, d = 0, g = 0, p = e, m = null;
          t: for (; ; ) {
            for (var x; p !== l || a !== 0 && p.nodeType !== 3 || (u = s + a), p !== i || n !== 0 && p.nodeType !== 3 || (o = s + n), p.nodeType === 3 && (s += p.nodeValue.length), (x = p.firstChild) !== null; ) m = p, p = x;
            for (; ; ) {
              if (p === e) break t;
              if (m === l && ++d === a && (u = s), m === i && ++g === n && (o = s), (x = p.nextSibling) !== null) break;
              p = m, m = p.parentNode;
            }
            p = x;
          }
          l = u === -1 || o === -1 ? null : {
            start: u,
            end: o
          };
        } else l = null;
      }
      l = l || {
        start: 0,
        end: 0
      };
    } else l = null;
    for (Js = {
      focusedElem: e,
      selectionRange: l
    }, $i = false, _e = t; _e !== null; ) if (t = _e, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, _e = e;
    else for (; _e !== null; ) {
      switch (t = _e, i = t.alternate, e = t.flags, t.tag) {
        case 0:
          if (e & 4 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null)) for (l = 0; l < e.length; l++) a = e[l], a.ref.impl = a.nextImpl;
          break;
        case 11:
        case 15:
          break;
        case 1:
          if (e & 1024 && i !== null) {
            e = void 0, l = t, a = i.memoizedProps, i = i.memoizedState, n = l.stateNode;
            try {
              var j = Ll(l.type, a);
              e = n.getSnapshotBeforeUpdate(j, i), n.__reactInternalSnapshotBeforeUpdate = e;
            } catch (z) {
              te(l, l.return, z);
            }
          }
          break;
        case 3:
          if (e & 1024) {
            if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9) Ws(e);
            else if (l === 1) switch (e.nodeName) {
              case "HEAD":
              case "HTML":
              case "BODY":
                Ws(e);
                break;
              default:
                e.textContent = "";
            }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        default:
          if (e & 1024) throw Error(_(163));
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, _e = e;
        break;
      }
      _e = t.return;
    }
  }
  function Jd(e, t, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Dt(e, l), n & 4 && Ca(5, l);
        break;
      case 1:
        if (Dt(e, l), n & 4) if (e = l.stateNode, t === null) try {
          e.componentDidMount();
        } catch (s) {
          te(l, l.return, s);
        }
        else {
          var a = Ll(l.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            e.componentDidUpdate(a, t, e.__reactInternalSnapshotBeforeUpdate);
          } catch (s) {
            te(l, l.return, s);
          }
        }
        n & 64 && Qd(l), n & 512 && na(l, l.return);
        break;
      case 3:
        if (Dt(e, l), n & 64 && (e = l.updateQueue, e !== null)) {
          if (t = null, l.child !== null) switch (l.child.tag) {
            case 27:
            case 5:
              t = l.child.stateNode;
              break;
            case 1:
              t = l.child.stateNode;
          }
          try {
            If(e, t);
          } catch (s) {
            te(l, l.return, s);
          }
        }
        break;
      case 27:
        t === null && n & 4 && Kd(l);
      case 26:
      case 5:
        Dt(e, l), t === null && n & 4 && Zd(l), n & 512 && na(l, l.return);
        break;
      case 12:
        Dt(e, l);
        break;
      case 31:
        Dt(e, l), n & 4 && Fd(e, l);
        break;
      case 13:
        Dt(e, l), n & 4 && Id(e, l), n & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = px.bind(null, l), Bx(e, l))));
        break;
      case 22:
        if (n = l.memoizedState !== null || Ct, !n) {
          t = t !== null && t.memoizedState !== null || ve, a = Ct;
          var i = ve;
          Ct = n, (ve = t) && !i ? Et(e, l, (l.subtreeFlags & 8772) !== 0) : Dt(e, l), Ct = a, ve = i;
        }
        break;
      case 30:
        break;
      default:
        Dt(e, l);
    }
  }
  function $d(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, $d(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && hu(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var fe = null, Re = false;
  function At(e, t, l) {
    for (l = l.child; l !== null; ) Wd(e, t, l), l = l.sibling;
  }
  function Wd(e, t, l) {
    if (We && typeof We.onCommitFiberUnmount == "function") try {
      We.onCommitFiberUnmount(_a, l);
    } catch {
    }
    switch (l.tag) {
      case 26:
        ve || yt(l, t), At(e, t, l), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        ve || yt(l, t);
        var n = fe, a = Re;
        bl(l.type) && (fe = l.stateNode, Re = false), At(e, t, l), sa(l.stateNode), fe = n, Re = a;
        break;
      case 5:
        ve || yt(l, t);
      case 6:
        if (n = fe, a = Re, fe = null, At(e, t, l), fe = n, Re = a, fe !== null) if (Re) try {
          (fe.nodeType === 9 ? fe.body : fe.nodeName === "HTML" ? fe.ownerDocument.body : fe).removeChild(l.stateNode);
        } catch (i) {
          te(l, t, i);
        }
        else try {
          fe.removeChild(l.stateNode);
        } catch (i) {
          te(l, t, i);
        }
        break;
      case 18:
        fe !== null && (Re ? (e = fe, Sr(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.stateNode), Tn(e)) : Sr(fe, l.stateNode));
        break;
      case 4:
        n = fe, a = Re, fe = l.stateNode.containerInfo, Re = true, At(e, t, l), fe = n, Re = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        pl(2, l, t), ve || pl(4, l, t), At(e, t, l);
        break;
      case 1:
        ve || (yt(l, t), n = l.stateNode, typeof n.componentWillUnmount == "function" && Xd(l, t, n)), At(e, t, l);
        break;
      case 21:
        At(e, t, l);
        break;
      case 22:
        ve = (n = ve) || l.memoizedState !== null, At(e, t, l), ve = n;
        break;
      default:
        At(e, t, l);
    }
  }
  function Fd(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Tn(e);
      } catch (l) {
        te(t, t.return, l);
      }
    }
  }
  function Id(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
      Tn(e);
    } catch (l) {
      te(t, t.return, l);
    }
  }
  function ux(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new rr()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new rr()), t;
      default:
        throw Error(_(435, e.tag));
    }
  }
  function Fa(e, t) {
    var l = ux(e);
    t.forEach(function(n) {
      if (!l.has(n)) {
        l.add(n);
        var a = gx.bind(null, e, n);
        n.then(a, a);
      }
    });
  }
  function Le(e, t) {
    var l = t.deletions;
    if (l !== null) for (var n = 0; n < l.length; n++) {
      var a = l[n], i = e, s = t, u = s;
      e: for (; u !== null; ) {
        switch (u.tag) {
          case 27:
            if (bl(u.type)) {
              fe = u.stateNode, Re = false;
              break e;
            }
            break;
          case 5:
            fe = u.stateNode, Re = false;
            break e;
          case 3:
          case 4:
            fe = u.stateNode.containerInfo, Re = true;
            break e;
        }
        u = u.return;
      }
      if (fe === null) throw Error(_(160));
      Wd(i, s, a), fe = null, Re = false, i = a.alternate, i !== null && (i.return = null), a.return = null;
    }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) Pd(t, e), t = t.sibling;
  }
  var mt = null;
  function Pd(e, t) {
    var l = e.alternate, n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Le(t, e), He(e), n & 4 && (pl(3, e, e.return), Ca(3, e), pl(5, e, e.return));
        break;
      case 1:
        Le(t, e), He(e), n & 512 && (ve || l === null || yt(l, l.return)), n & 64 && Ct && (e = e.updateQueue, e !== null && (n = e.callbacks, n !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? n : l.concat(n))));
        break;
      case 26:
        var a = mt;
        if (Le(t, e), He(e), n & 512 && (ve || l === null || yt(l, l.return)), n & 4) {
          var i = l !== null ? l.memoizedState : null;
          if (n = e.memoizedState, l === null) if (n === null) if (e.stateNode === null) {
            e: {
              n = e.type, l = e.memoizedProps, a = a.ownerDocument || a;
              t: switch (n) {
                case "title":
                  i = a.getElementsByTagName("title")[0], (!i || i[Aa] || i[De] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = a.createElement(n), a.head.insertBefore(i, a.querySelector("head > title"))), Ce(i, n, l), i[De] = e, we(i), n = i;
                  break e;
                case "link":
                  var s = Er("link", "href", a).get(n + (l.href || ""));
                  if (s) {
                    for (var u = 0; u < s.length; u++) if (i = s[u], i.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && i.getAttribute("rel") === (l.rel == null ? null : l.rel) && i.getAttribute("title") === (l.title == null ? null : l.title) && i.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                      s.splice(u, 1);
                      break t;
                    }
                  }
                  i = a.createElement(n), Ce(i, n, l), a.head.appendChild(i);
                  break;
                case "meta":
                  if (s = Er("meta", "content", a).get(n + (l.content || ""))) {
                    for (u = 0; u < s.length; u++) if (i = s[u], i.getAttribute("content") === (l.content == null ? null : "" + l.content) && i.getAttribute("name") === (l.name == null ? null : l.name) && i.getAttribute("property") === (l.property == null ? null : l.property) && i.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && i.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                      s.splice(u, 1);
                      break t;
                    }
                  }
                  i = a.createElement(n), Ce(i, n, l), a.head.appendChild(i);
                  break;
                default:
                  throw Error(_(468, n));
              }
              i[De] = e, we(i), n = i;
            }
            e.stateNode = n;
          } else Mr(a, e.type, e.stateNode);
          else e.stateNode = Dr(a, n, e.memoizedProps);
          else i !== n ? (i === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : i.count--, n === null ? Mr(a, e.type, e.stateNode) : Dr(a, n, e.memoizedProps)) : n === null && e.stateNode !== null && Vc(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        Le(t, e), He(e), n & 512 && (ve || l === null || yt(l, l.return)), l !== null && n & 4 && Vc(e, e.memoizedProps, l.memoizedProps);
        break;
      case 5:
        if (Le(t, e), He(e), n & 512 && (ve || l === null || yt(l, l.return)), e.flags & 32) {
          a = e.stateNode;
          try {
            bn(a, "");
          } catch (j) {
            te(e, e.return, j);
          }
        }
        n & 4 && e.stateNode != null && (a = e.memoizedProps, Vc(e, a, l !== null ? l.memoizedProps : a)), n & 1024 && (Jc = true);
        break;
      case 6:
        if (Le(t, e), He(e), n & 4) {
          if (e.stateNode === null) throw Error(_(162));
          n = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = n;
          } catch (j) {
            te(e, e.return, j);
          }
        }
        break;
      case 3:
        if (gi = null, a = mt, mt = Vi(t.containerInfo), Le(t, e), mt = a, He(e), n & 4 && l !== null && l.memoizedState.isDehydrated) try {
          Tn(t.containerInfo);
        } catch (j) {
          te(e, e.return, j);
        }
        Jc && (Jc = false, e0(e));
        break;
      case 4:
        n = mt, mt = Vi(e.stateNode.containerInfo), Le(t, e), He(e), mt = n;
        break;
      case 12:
        Le(t, e), He(e);
        break;
      case 31:
        Le(t, e), He(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Fa(e, n)));
        break;
      case 13:
        Le(t, e), He(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (fc = $e()), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Fa(e, n)));
        break;
      case 22:
        a = e.memoizedState !== null;
        var o = l !== null && l.memoizedState !== null, d = Ct, g = ve;
        if (Ct = d || a, ve = g || o, Le(t, e), ve = g, Ct = d, He(e), n & 8192) e: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (l === null || o || Ct || ve || Tl(e)), l = null, t = e; ; ) {
          if (t.tag === 5 || t.tag === 26) {
            if (l === null) {
              o = l = t;
              try {
                if (i = o.stateNode, a) s = i.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
                else {
                  u = o.stateNode;
                  var p = o.memoizedProps.style, m = p != null && p.hasOwnProperty("display") ? p.display : null;
                  u.style.display = m == null || typeof m == "boolean" ? "" : ("" + m).trim();
                }
              } catch (j) {
                te(o, o.return, j);
              }
            }
          } else if (t.tag === 6) {
            if (l === null) {
              o = t;
              try {
                o.stateNode.nodeValue = a ? "" : o.memoizedProps;
              } catch (j) {
                te(o, o.return, j);
              }
            }
          } else if (t.tag === 18) {
            if (l === null) {
              o = t;
              try {
                var x = o.stateNode;
                a ? Nr(x, true) : Nr(o.stateNode, false);
              } catch (j) {
                te(o, o.return, j);
              }
            }
          } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === e) break e;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) break e;
            l === t && (l = null), t = t.return;
          }
          l === t && (l = null), t.sibling.return = t.return, t = t.sibling;
        }
        n & 4 && (n = e.updateQueue, n !== null && (l = n.retryQueue, l !== null && (n.retryQueue = null, Fa(e, l))));
        break;
      case 19:
        Le(t, e), He(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Fa(e, n)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Le(t, e), He(e);
    }
  }
  function He(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, n = e.return; n !== null; ) {
          if (Vd(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(_(160));
        switch (l.tag) {
          case 27:
            var a = l.stateNode, i = Kc(e);
            Hi(e, i, a);
            break;
          case 5:
            var s = l.stateNode;
            l.flags & 32 && (bn(s, ""), l.flags &= -33);
            var u = Kc(e);
            Hi(e, u, s);
            break;
          case 3:
          case 4:
            var o = l.stateNode.containerInfo, d = Kc(e);
            Gs(e, d, o);
            break;
          default:
            throw Error(_(161));
        }
      } catch (g) {
        te(e, e.return, g);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function e0(e) {
    if (e.subtreeFlags & 1024) for (e = e.child; e !== null; ) {
      var t = e;
      e0(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
    }
  }
  function Dt(e, t) {
    if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) Jd(e, t.alternate, t), t = t.sibling;
  }
  function Tl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          pl(4, t, t.return), Tl(t);
          break;
        case 1:
          yt(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && Xd(t, t.return, l), Tl(t);
          break;
        case 27:
          sa(t.stateNode);
        case 26:
        case 5:
          yt(t, t.return), Tl(t);
          break;
        case 22:
          t.memoizedState === null && Tl(t);
          break;
        case 30:
          Tl(t);
          break;
        default:
          Tl(t);
      }
      e = e.sibling;
    }
  }
  function Et(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate, a = e, i = t, s = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Et(a, i, l), Ca(4, i);
          break;
        case 1:
          if (Et(a, i, l), n = i, a = n.stateNode, typeof a.componentDidMount == "function") try {
            a.componentDidMount();
          } catch (d) {
            te(n, n.return, d);
          }
          if (n = i, a = n.updateQueue, a !== null) {
            var u = n.stateNode;
            try {
              var o = a.shared.hiddenCallbacks;
              if (o !== null) for (a.shared.hiddenCallbacks = null, a = 0; a < o.length; a++) Ff(o[a], u);
            } catch (d) {
              te(n, n.return, d);
            }
          }
          l && s & 64 && Qd(i), na(i, i.return);
          break;
        case 27:
          Kd(i);
        case 26:
        case 5:
          Et(a, i, l), l && n === null && s & 4 && Zd(i), na(i, i.return);
          break;
        case 12:
          Et(a, i, l);
          break;
        case 31:
          Et(a, i, l), l && s & 4 && Fd(a, i);
          break;
        case 13:
          Et(a, i, l), l && s & 4 && Id(a, i);
          break;
        case 22:
          i.memoizedState === null && Et(a, i, l), na(i, i.return);
          break;
        case 30:
          break;
        default:
          Et(a, i, l);
      }
      t = t.sibling;
    }
  }
  function Zu(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && Ea(l));
  }
  function Vu(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ea(e));
  }
  function ht(e, t, l, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) t0(e, t, l, n), t = t.sibling;
  }
  function t0(e, t, l, n) {
    var a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ht(e, t, l, n), a & 2048 && Ca(9, t);
        break;
      case 1:
        ht(e, t, l, n);
        break;
      case 3:
        ht(e, t, l, n), a & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ea(e)));
        break;
      case 12:
        if (a & 2048) {
          ht(e, t, l, n), e = t.stateNode;
          try {
            var i = t.memoizedProps, s = i.id, u = i.onPostCommit;
            typeof u == "function" && u(s, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
          } catch (o) {
            te(t, t.return, o);
          }
        } else ht(e, t, l, n);
        break;
      case 31:
        ht(e, t, l, n);
        break;
      case 13:
        ht(e, t, l, n);
        break;
      case 23:
        break;
      case 22:
        i = t.stateNode, s = t.alternate, t.memoizedState !== null ? i._visibility & 2 ? ht(e, t, l, n) : aa(e, t) : i._visibility & 2 ? ht(e, t, l, n) : (i._visibility |= 2, $l(e, t, l, n, (t.subtreeFlags & 10256) !== 0 || false)), a & 2048 && Zu(s, t);
        break;
      case 24:
        ht(e, t, l, n), a & 2048 && Vu(t.alternate, t);
        break;
      default:
        ht(e, t, l, n);
    }
  }
  function $l(e, t, l, n, a) {
    for (a = a && ((t.subtreeFlags & 10256) !== 0 || false), t = t.child; t !== null; ) {
      var i = e, s = t, u = l, o = n, d = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          $l(i, s, u, o, a), Ca(8, s);
          break;
        case 23:
          break;
        case 22:
          var g = s.stateNode;
          s.memoizedState !== null ? g._visibility & 2 ? $l(i, s, u, o, a) : aa(i, s) : (g._visibility |= 2, $l(i, s, u, o, a)), a && d & 2048 && Zu(s.alternate, s);
          break;
        case 24:
          $l(i, s, u, o, a), a && d & 2048 && Vu(s.alternate, s);
          break;
        default:
          $l(i, s, u, o, a);
      }
      t = t.sibling;
    }
  }
  function aa(e, t) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
      var l = e, n = t, a = n.flags;
      switch (n.tag) {
        case 22:
          aa(l, n), a & 2048 && Zu(n.alternate, n);
          break;
        case 24:
          aa(l, n), a & 2048 && Vu(n.alternate, n);
          break;
        default:
          aa(l, n);
      }
      t = t.sibling;
    }
  }
  var Kn = 8192;
  function Vl(e, t, l) {
    if (e.subtreeFlags & Kn) for (e = e.child; e !== null; ) l0(e, t, l), e = e.sibling;
  }
  function l0(e, t, l) {
    switch (e.tag) {
      case 26:
        Vl(e, t, l), e.flags & Kn && e.memoizedState !== null && Jx(l, mt, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        Vl(e, t, l);
        break;
      case 3:
      case 4:
        var n = mt;
        mt = Vi(e.stateNode.containerInfo), Vl(e, t, l), mt = n;
        break;
      case 22:
        e.memoizedState === null && (n = e.alternate, n !== null && n.memoizedState !== null ? (n = Kn, Kn = 16777216, Vl(e, t, l), Kn = n) : Vl(e, t, l));
        break;
      default:
        Vl(e, t, l);
    }
  }
  function n0(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Yn(e) {
    var t = e.deletions;
    if (e.flags & 16) {
      if (t !== null) for (var l = 0; l < t.length; l++) {
        var n = t[l];
        _e = n, i0(n, e);
      }
      n0(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) a0(e), e = e.sibling;
  }
  function a0(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Yn(e), e.flags & 2048 && pl(9, e, e.return);
        break;
      case 3:
        Yn(e);
        break;
      case 12:
        Yn(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, xi(e)) : Yn(e);
        break;
      default:
        Yn(e);
    }
  }
  function xi(e) {
    var t = e.deletions;
    if (e.flags & 16) {
      if (t !== null) for (var l = 0; l < t.length; l++) {
        var n = t[l];
        _e = n, i0(n, e);
      }
      n0(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          pl(8, t, t.return), xi(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, xi(t));
          break;
        default:
          xi(t);
      }
      e = e.sibling;
    }
  }
  function i0(e, t) {
    for (; _e !== null; ) {
      var l = _e;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          pl(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Ea(l.memoizedState.cache);
      }
      if (n = l.child, n !== null) n.return = l, _e = n;
      else e: for (l = e; _e !== null; ) {
        n = _e;
        var a = n.sibling, i = n.return;
        if ($d(n), n === l) {
          _e = null;
          break e;
        }
        if (a !== null) {
          a.return = i, _e = a;
          break e;
        }
        _e = i;
      }
    }
  }
  var ox = {
    getCacheForType: function(e) {
      var t = Me(be), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return Me(be).controller.signal;
    }
  }, rx = typeof WeakMap == "function" ? WeakMap : Map, I = 0, ae = null, J = null, W = 0, ee = 0, Ze = null, ll = false, On = false, Ku = false, Qt = 0, me = 0, gl = 0, Cl = 0, Ju = 0, Je = 0, Sn = 0, ia = null, Ge = null, Ys = false, fc = 0, c0 = 0, Ri = 1 / 0, Gi = null, ol = null, je = 0, rl = null, Nn = null, Ht = 0, qs = 0, Qs = null, s0 = null, ca = 0, Xs = null;
  function Ie() {
    return I & 2 && W !== 0 ? W & -W : Y.T !== null ? Wu() : pf();
  }
  function u0() {
    if (Je === 0) if (!(W & 536870912) || F) {
      var e = Qa;
      Qa <<= 1, !(Qa & 3932160) && (Qa = 262144), Je = e;
    } else Je = 536870912;
    return e = et.current, e !== null && (e.flags |= 32), Je;
  }
  function Ye(e, t, l) {
    (e === ae && (ee === 2 || ee === 9) || e.cancelPendingCommit !== null) && (_n(e, 0), nl(e, W, Je, false)), Ta(e, l), (!(I & 2) || e !== ae) && (e === ae && (!(I & 2) && (Cl |= l), me === 4 && nl(e, W, Je, false)), Nt(e));
  }
  function o0(e, t, l) {
    if (I & 6) throw Error(_(327));
    var n = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || wa(e, t), a = n ? hx(e, t) : $c(e, t, true), i = n;
    do {
      if (a === 0) {
        On && !n && nl(e, t, 0, false);
        break;
      } else {
        if (l = e.current.alternate, i && !fx(l)) {
          a = $c(e, t, false), i = false;
          continue;
        }
        if (a === 2) {
          if (i = t, e.errorRecoveryDisabledLanes & i) var s = 0;
          else s = e.pendingLanes & -536870913, s = s !== 0 ? s : s & 536870912 ? 536870912 : 0;
          if (s !== 0) {
            t = s;
            e: {
              var u = e;
              a = ia;
              var o = u.current.memoizedState.isDehydrated;
              if (o && (_n(u, s).flags |= 256), s = $c(u, s, false), s !== 2) {
                if (Ku && !o) {
                  u.errorRecoveryDisabledLanes |= i, Cl |= i, a = 4;
                  break e;
                }
                i = Ge, Ge = a, i !== null && (Ge === null ? Ge = i : Ge.push.apply(Ge, i));
              }
              a = s;
            }
            if (i = false, a !== 2) continue;
          }
        }
        if (a === 1) {
          _n(e, 0), nl(e, t, 0, true);
          break;
        }
        e: {
          switch (n = e, i = a, i) {
            case 0:
            case 1:
              throw Error(_(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              nl(n, t, Je, !ll);
              break e;
            case 2:
              Ge = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(_(329));
          }
          if ((t & 62914560) === t && (a = fc + 300 - $e(), 10 < a)) {
            if (nl(n, t, Je, !ll), ec(n, 0, true) !== 0) break e;
            Ht = t, n.timeoutHandle = D0(fr.bind(null, n, l, Ge, Gi, Ys, t, Je, Cl, Sn, ll, i, "Throttled", -0, 0), a);
            break e;
          }
          fr(n, l, Ge, Gi, Ys, t, Je, Cl, Sn, ll, i, null, -0, 0);
        }
      }
      break;
    } while (true);
    Nt(e);
  }
  function fr(e, t, l, n, a, i, s, u, o, d, g, p, m, x) {
    if (e.timeoutHandle = -1, p = t.subtreeFlags, p & 8192 || (p & 16785408) === 16785408) {
      p = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: true,
        waitingForViewTransition: false,
        unsuspend: kt
      }, l0(t, i, p);
      var j = (i & 62914560) === i ? fc - $e() : (i & 4194048) === i ? c0 - $e() : 0;
      if (j = $x(p, j), j !== null) {
        Ht = i, e.cancelPendingCommit = j(hr.bind(null, e, t, i, l, n, a, s, u, o, g, p, null, m, x)), nl(e, i, s, !d);
        return;
      }
    }
    hr(e, t, i, l, n, a, s, u, o);
  }
  function fx(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null))) for (var n = 0; n < l.length; n++) {
        var a = l[n], i = a.getSnapshot;
        a = a.value;
        try {
          if (!Pe(i(), a)) return false;
        } catch {
          return false;
        }
      }
      if (l = t.child, t.subtreeFlags & 16384 && l !== null) l.return = t, t = l;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return true;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return true;
  }
  function nl(e, t, l, n) {
    t &= ~Ju, t &= ~Cl, e.suspendedLanes |= t, e.pingedLanes &= ~t, n && (e.warmLanes |= t), n = e.expirationTimes;
    for (var a = t; 0 < a; ) {
      var i = 31 - Fe(a), s = 1 << i;
      n[i] = -1, a &= ~s;
    }
    l !== 0 && hf(e, l, t);
  }
  function dc() {
    return I & 6 ? true : (Oa(0), false);
  }
  function $u() {
    if (J !== null) {
      if (ee === 0) var e = J.return;
      else e = J, Ut = ql = null, ku(e), mn = null, xa = 0, e = J;
      for (; e !== null; ) qd(e.alternate, e), e = e.return;
      J = null;
    }
  }
  function _n(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, Mx(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), Ht = 0, $u(), ae = e, J = l = Bt(e.current, null), W = t, ee = 0, Ze = null, ll = false, On = wa(e, t), Ku = false, Sn = Je = Ju = Cl = gl = me = 0, Ge = ia = null, Ys = false, t & 8 && (t |= t & 32);
    var n = e.entangledLanes;
    if (n !== 0) for (e = e.entanglements, n &= t; 0 < n; ) {
      var a = 31 - Fe(n), i = 1 << a;
      t |= e[a], n &= ~i;
    }
    return Qt = t, ac(), l;
  }
  function r0(e, t) {
    Z = null, Y.H = ga, t === Cn || t === cc ? (t = Qo(), ee = 3) : t === Tu ? (t = Qo(), ee = 4) : ee = t === Qu ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Ze = t, J === null && (me = 1, Bi(e, st(t, e.current)));
  }
  function f0() {
    var e = et.current;
    return e === null ? true : (W & 4194048) === W ? ot === null : (W & 62914560) === W || W & 536870912 ? e === ot : false;
  }
  function d0() {
    var e = Y.H;
    return Y.H = ga, e === null ? ga : e;
  }
  function h0() {
    var e = Y.A;
    return Y.A = ox, e;
  }
  function Yi() {
    me = 4, ll || (W & 4194048) !== W && et.current !== null || (On = true), !(gl & 134217727) && !(Cl & 134217727) || ae === null || nl(ae, W, Je, false);
  }
  function $c(e, t, l) {
    var n = I;
    I |= 2;
    var a = d0(), i = h0();
    (ae !== e || W !== t) && (Gi = null, _n(e, t)), t = false;
    var s = me;
    e: do
      try {
        if (ee !== 0 && J !== null) {
          var u = J, o = Ze;
          switch (ee) {
            case 8:
              $u(), s = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              et.current === null && (t = true);
              var d = ee;
              if (ee = 0, Ze = null, on(e, u, o, d), l && On) {
                s = 0;
                break e;
              }
              break;
            default:
              d = ee, ee = 0, Ze = null, on(e, u, o, d);
          }
        }
        dx(), s = me;
        break;
      } catch (g) {
        r0(e, g);
      }
    while (true);
    return t && e.shellSuspendCounter++, Ut = ql = null, I = n, Y.H = a, Y.A = i, J === null && (ae = null, W = 0, ac()), s;
  }
  function dx() {
    for (; J !== null; ) m0(J);
  }
  function hx(e, t) {
    var l = I;
    I |= 2;
    var n = d0(), a = h0();
    ae !== e || W !== t ? (Gi = null, Ri = $e() + 500, _n(e, t)) : On = wa(e, t);
    e: do
      try {
        if (ee !== 0 && J !== null) {
          t = J;
          var i = Ze;
          t: switch (ee) {
            case 1:
              ee = 0, Ze = null, on(e, t, i, 1);
              break;
            case 2:
            case 9:
              if (qo(i)) {
                ee = 0, Ze = null, dr(t);
                break;
              }
              t = function() {
                ee !== 2 && ee !== 9 || ae !== e || (ee = 7), Nt(e);
              }, i.then(t, t);
              break e;
            case 3:
              ee = 7;
              break e;
            case 4:
              ee = 5;
              break e;
            case 7:
              qo(i) ? (ee = 0, Ze = null, dr(t)) : (ee = 0, Ze = null, on(e, t, i, 7));
              break;
            case 5:
              var s = null;
              switch (J.tag) {
                case 26:
                  s = J.memoizedState;
                case 5:
                case 27:
                  var u = J;
                  if (s ? k0(s) : u.stateNode.complete) {
                    ee = 0, Ze = null;
                    var o = u.sibling;
                    if (o !== null) J = o;
                    else {
                      var d = u.return;
                      d !== null ? (J = d, hc(d)) : J = null;
                    }
                    break t;
                  }
              }
              ee = 0, Ze = null, on(e, t, i, 5);
              break;
            case 6:
              ee = 0, Ze = null, on(e, t, i, 6);
              break;
            case 8:
              $u(), me = 6;
              break e;
            default:
              throw Error(_(462));
          }
        }
        mx();
        break;
      } catch (g) {
        r0(e, g);
      }
    while (true);
    return Ut = ql = null, Y.H = n, Y.A = a, I = l, J !== null ? 0 : (ae = null, W = 0, ac(), me);
  }
  function mx() {
    for (; J !== null && !Lh(); ) m0(J);
  }
  function m0(e) {
    var t = Yd(e.alternate, e, Qt);
    e.memoizedProps = e.pendingProps, t === null ? hc(e) : J = t;
  }
  function dr(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = ir(l, t, t.pendingProps, t.type, void 0, W);
        break;
      case 11:
        t = ir(l, t, t.pendingProps, t.type.render, t.ref, W);
        break;
      case 5:
        ku(t);
      default:
        qd(l, t), t = J = qf(t, Qt), t = Yd(l, t, Qt);
    }
    e.memoizedProps = e.pendingProps, t === null ? hc(e) : J = t;
  }
  function on(e, t, l, n) {
    Ut = ql = null, ku(t), mn = null, xa = 0;
    var a = t.return;
    try {
      if (lx(e, a, t, l, W)) {
        me = 1, Bi(e, st(l, e.current)), J = null;
        return;
      }
    } catch (i) {
      if (a !== null) throw J = a, i;
      me = 1, Bi(e, st(l, e.current)), J = null;
      return;
    }
    t.flags & 32768 ? (F || n === 1 ? e = true : On || W & 536870912 ? e = false : (ll = e = true, (n === 2 || n === 9 || n === 3 || n === 6) && (n = et.current, n !== null && n.tag === 13 && (n.flags |= 16384))), x0(t, e)) : hc(t);
  }
  function hc(e) {
    var t = e;
    do {
      if (t.flags & 32768) {
        x0(t, ll);
        return;
      }
      e = t.return;
      var l = ix(t.alternate, t, Qt);
      if (l !== null) {
        J = l;
        return;
      }
      if (t = t.sibling, t !== null) {
        J = t;
        return;
      }
      J = t = e;
    } while (t !== null);
    me === 0 && (me = 5);
  }
  function x0(e, t) {
    do {
      var l = cx(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, J = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
        J = e;
        return;
      }
      J = e = l;
    } while (e !== null);
    me = 6, J = null;
  }
  function hr(e, t, l, n, a, i, s, u, o) {
    e.cancelPendingCommit = null;
    do
      mc();
    while (je !== 0);
    if (I & 6) throw Error(_(327));
    if (t !== null) {
      if (t === e.current) throw Error(_(177));
      if (i = t.lanes | t.childLanes, i |= yu, Kh(e, l, i, s, u, o), e === ae && (J = ae = null, W = 0), Nn = t, rl = e, Ht = l, qs = i, Qs = a, s0 = n, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, vx(_i, function() {
        return y0(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), n = (t.flags & 13878) !== 0, t.subtreeFlags & 13878 || n) {
        n = Y.T, Y.T = null, a = P.p, P.p = 2, s = I, I |= 4;
        try {
          sx(e, t, l);
        } finally {
          I = s, P.p = a, Y.T = n;
        }
      }
      je = 1, p0(), g0(), v0();
    }
  }
  function p0() {
    if (je === 1) {
      je = 0;
      var e = rl, t = Nn, l = (t.flags & 13878) !== 0;
      if (t.subtreeFlags & 13878 || l) {
        l = Y.T, Y.T = null;
        var n = P.p;
        P.p = 2;
        var a = I;
        I |= 4;
        try {
          Pd(t, e);
          var i = Js, s = kf(e.containerInfo), u = i.focusedElem, o = i.selectionRange;
          if (s !== u && u && u.ownerDocument && Of(u.ownerDocument.documentElement, u)) {
            if (o !== null && bu(u)) {
              var d = o.start, g = o.end;
              if (g === void 0 && (g = d), "selectionStart" in u) u.selectionStart = d, u.selectionEnd = Math.min(g, u.value.length);
              else {
                var p = u.ownerDocument || document, m = p && p.defaultView || window;
                if (m.getSelection) {
                  var x = m.getSelection(), j = u.textContent.length, z = Math.min(o.start, j), A = o.end === void 0 ? z : Math.min(o.end, j);
                  !x.extend && z > A && (s = A, A = z, z = s);
                  var f = Uo(u, z), r = Uo(u, A);
                  if (f && r && (x.rangeCount !== 1 || x.anchorNode !== f.node || x.anchorOffset !== f.offset || x.focusNode !== r.node || x.focusOffset !== r.offset)) {
                    var h = p.createRange();
                    h.setStart(f.node, f.offset), x.removeAllRanges(), z > A ? (x.addRange(h), x.extend(r.node, r.offset)) : (h.setEnd(r.node, r.offset), x.addRange(h));
                  }
                }
              }
            }
            for (p = [], x = u; x = x.parentNode; ) x.nodeType === 1 && p.push({
              element: x,
              left: x.scrollLeft,
              top: x.scrollTop
            });
            for (typeof u.focus == "function" && u.focus(), u = 0; u < p.length; u++) {
              var v = p[u];
              v.element.scrollLeft = v.left, v.element.scrollTop = v.top;
            }
          }
          $i = !!Ks, Js = Ks = null;
        } finally {
          I = a, P.p = n, Y.T = l;
        }
      }
      e.current = t, je = 2;
    }
  }
  function g0() {
    if (je === 2) {
      je = 0;
      var e = rl, t = Nn, l = (t.flags & 8772) !== 0;
      if (t.subtreeFlags & 8772 || l) {
        l = Y.T, Y.T = null;
        var n = P.p;
        P.p = 2;
        var a = I;
        I |= 4;
        try {
          Jd(e, t.alternate, t);
        } finally {
          I = a, P.p = n, Y.T = l;
        }
      }
      je = 3;
    }
  }
  function v0() {
    if (je === 4 || je === 3) {
      je = 0, Hh();
      var e = rl, t = Nn, l = Ht, n = s0;
      t.subtreeFlags & 10256 || t.flags & 10256 ? je = 5 : (je = 0, Nn = rl = null, b0(e, e.pendingLanes));
      var a = e.pendingLanes;
      if (a === 0 && (ol = null), du(l), t = t.stateNode, We && typeof We.onCommitFiberRoot == "function") try {
        We.onCommitFiberRoot(_a, t, void 0, (t.current.flags & 128) === 128);
      } catch {
      }
      if (n !== null) {
        t = Y.T, a = P.p, P.p = 2, Y.T = null;
        try {
          for (var i = e.onRecoverableError, s = 0; s < n.length; s++) {
            var u = n[s];
            i(u.value, {
              componentStack: u.stack
            });
          }
        } finally {
          Y.T = t, P.p = a;
        }
      }
      Ht & 3 && mc(), Nt(e), a = e.pendingLanes, l & 261930 && a & 42 ? e === Xs ? ca++ : (ca = 0, Xs = e) : ca = 0, Oa(0);
    }
  }
  function b0(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ea(t)));
  }
  function mc() {
    return p0(), g0(), v0(), y0();
  }
  function y0() {
    if (je !== 5) return false;
    var e = rl, t = qs;
    qs = 0;
    var l = du(Ht), n = Y.T, a = P.p;
    try {
      P.p = 32 > l ? 32 : l, Y.T = null, l = Qs, Qs = null;
      var i = rl, s = Ht;
      if (je = 0, Nn = rl = null, Ht = 0, I & 6) throw Error(_(331));
      var u = I;
      if (I |= 4, a0(i.current), t0(i, i.current, s, l), I = u, Oa(0, false), We && typeof We.onPostCommitFiberRoot == "function") try {
        We.onPostCommitFiberRoot(_a, i);
      } catch {
      }
      return true;
    } finally {
      P.p = a, Y.T = n, b0(e, t);
    }
  }
  function mr(e, t, l) {
    t = st(l, t), t = Ls(e.stateNode, t, 2), e = ul(e, t, 2), e !== null && (Ta(e, 2), Nt(e));
  }
  function te(e, t, l) {
    if (e.tag === 3) mr(e, e, l);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        mr(t, e, l);
        break;
      } else if (t.tag === 1) {
        var n = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (ol === null || !ol.has(n))) {
          e = st(l, e), l = Ud(2), n = ul(t, l, 2), n !== null && (Bd(l, n, t, e), Ta(n, 2), Nt(n));
          break;
        }
      }
      t = t.return;
    }
  }
  function Wc(e, t, l) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new rx();
      var a = /* @__PURE__ */ new Set();
      n.set(t, a);
    } else a = n.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), n.set(t, a));
    a.has(l) || (Ku = true, a.add(l), e = xx.bind(null, e, t, l), t.then(e, e));
  }
  function xx(e, t, l) {
    var n = e.pingCache;
    n !== null && n.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, ae === e && (W & l) === l && (me === 4 || me === 3 && (W & 62914560) === W && 300 > $e() - fc ? !(I & 2) && _n(e, 0) : Ju |= l, Sn === W && (Sn = 0)), Nt(e);
  }
  function z0(e, t) {
    t === 0 && (t = df()), e = Yl(e, t), e !== null && (Ta(e, t), Nt(e));
  }
  function px(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), z0(e, l);
  }
  function gx(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var n = e.stateNode, a = e.memoizedState;
        a !== null && (l = a.retryLane);
        break;
      case 19:
        n = e.stateNode;
        break;
      case 22:
        n = e.stateNode._retryCache;
        break;
      default:
        throw Error(_(314));
    }
    n !== null && n.delete(t), z0(e, l);
  }
  function vx(e, t) {
    return ru(e, t);
  }
  var qi = null, Wl = null, Zs = false, Qi = false, Fc = false, al = 0;
  function Nt(e) {
    e !== Wl && e.next === null && (Wl === null ? qi = Wl = e : Wl = Wl.next = e), Qi = true, Zs || (Zs = true, yx());
  }
  function Oa(e, t) {
    if (!Fc && Qi) {
      Fc = true;
      do
        for (var l = false, n = qi; n !== null; ) {
          if (e !== 0) {
            var a = n.pendingLanes;
            if (a === 0) var i = 0;
            else {
              var s = n.suspendedLanes, u = n.pingedLanes;
              i = (1 << 31 - Fe(42 | e) + 1) - 1, i &= a & ~(s & ~u), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
            }
            i !== 0 && (l = true, xr(n, i));
          } else i = W, i = ec(n, n === ae ? i : 0, n.cancelPendingCommit !== null || n.timeoutHandle !== -1), !(i & 3) || wa(n, i) || (l = true, xr(n, i));
          n = n.next;
        }
      while (l);
      Fc = false;
    }
  }
  function bx() {
    j0();
  }
  function j0() {
    Qi = Zs = false;
    var e = 0;
    al !== 0 && Ex() && (e = al);
    for (var t = $e(), l = null, n = qi; n !== null; ) {
      var a = n.next, i = S0(n, t);
      i === 0 ? (n.next = null, l === null ? qi = a : l.next = a, a === null && (Wl = l)) : (l = n, (e !== 0 || i & 3) && (Qi = true)), n = a;
    }
    je !== 0 && je !== 5 || Oa(e), al !== 0 && (al = 0);
  }
  function S0(e, t) {
    for (var l = e.suspendedLanes, n = e.pingedLanes, a = e.expirationTimes, i = e.pendingLanes & -62914561; 0 < i; ) {
      var s = 31 - Fe(i), u = 1 << s, o = a[s];
      o === -1 ? (!(u & l) || u & n) && (a[s] = Vh(u, t)) : o <= t && (e.expiredLanes |= u), i &= ~u;
    }
    if (t = ae, l = W, l = ec(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n = e.callbackNode, l === 0 || e === t && (ee === 2 || ee === 9) || e.cancelPendingCommit !== null) return n !== null && n !== null && _c(n), e.callbackNode = null, e.callbackPriority = 0;
    if (!(l & 3) || wa(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (n !== null && _c(n), du(l)) {
        case 2:
        case 8:
          l = rf;
          break;
        case 32:
          l = _i;
          break;
        case 268435456:
          l = ff;
          break;
        default:
          l = _i;
      }
      return n = N0.bind(null, e), l = ru(l, n), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return n !== null && n !== null && _c(n), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function N0(e, t) {
    if (je !== 0 && je !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (mc() && e.callbackNode !== l) return null;
    var n = W;
    return n = ec(e, e === ae ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), n === 0 ? null : (o0(e, n, t), S0(e, $e()), e.callbackNode != null && e.callbackNode === l ? N0.bind(null, e) : null);
  }
  function xr(e, t) {
    if (mc()) return null;
    o0(e, t, true);
  }
  function yx() {
    Cx(function() {
      I & 6 ? ru(of, bx) : j0();
    });
  }
  function Wu() {
    if (al === 0) {
      var e = yn;
      e === 0 && (e = qa, qa <<= 1, !(qa & 261888) && (qa = 256)), al = e;
    }
    return al;
  }
  function pr(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ci("" + e);
  }
  function gr(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function zx(e, t, l, n, a) {
    if (t === "submit" && l && l.stateNode === a) {
      var i = pr((a[qe] || null).action), s = n.submitter;
      s && (t = (t = s[qe] || null) ? pr(t.formAction) : s.getAttribute("formAction"), t !== null && (i = t, s = null));
      var u = new tc("action", "action", null, n, a);
      e.push({
        event: u,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (n.defaultPrevented) {
                if (al !== 0) {
                  var o = s ? gr(a, s) : new FormData(a);
                  Us(l, {
                    pending: true,
                    data: o,
                    method: a.method,
                    action: i
                  }, null, o);
                }
              } else typeof i == "function" && (u.preventDefault(), o = s ? gr(a, s) : new FormData(a), Us(l, {
                pending: true,
                data: o,
                method: a.method,
                action: i
              }, i, o));
            },
            currentTarget: a
          }
        ]
      });
    }
  }
  for (var Ic = 0; Ic < Ss.length; Ic++) {
    var Pc = Ss[Ic], jx = Pc.toLowerCase(), Sx = Pc[0].toUpperCase() + Pc.slice(1);
    xt(jx, "on" + Sx);
  }
  xt(Bf, "onAnimationEnd");
  xt(Lf, "onAnimationIteration");
  xt(Hf, "onAnimationStart");
  xt("dblclick", "onDoubleClick");
  xt("focusin", "onFocus");
  xt("focusout", "onBlur");
  xt(Rm, "onTransitionRun");
  xt(Gm, "onTransitionStart");
  xt(Ym, "onTransitionCancel");
  xt(Rf, "onTransitionEnd");
  vn("onMouseEnter", [
    "mouseout",
    "mouseover"
  ]);
  vn("onMouseLeave", [
    "mouseout",
    "mouseover"
  ]);
  vn("onPointerEnter", [
    "pointerout",
    "pointerover"
  ]);
  vn("onPointerLeave", [
    "pointerout",
    "pointerover"
  ]);
  Hl("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  Hl("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  Hl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]);
  Hl("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  Hl("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  Hl("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var va = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Nx = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(va));
  function _0(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var n = e[l], a = n.event;
      n = n.listeners;
      e: {
        var i = void 0;
        if (t) for (var s = n.length - 1; 0 <= s; s--) {
          var u = n[s], o = u.instance, d = u.currentTarget;
          if (u = u.listener, o !== i && a.isPropagationStopped()) break e;
          i = u, a.currentTarget = d;
          try {
            i(a);
          } catch (g) {
            Ti(g);
          }
          a.currentTarget = null, i = o;
        }
        else for (s = 0; s < n.length; s++) {
          if (u = n[s], o = u.instance, d = u.currentTarget, u = u.listener, o !== i && a.isPropagationStopped()) break e;
          i = u, a.currentTarget = d;
          try {
            i(a);
          } catch (g) {
            Ti(g);
          }
          a.currentTarget = null, i = o;
        }
      }
    }
  }
  function K(e, t) {
    var l = t[xs];
    l === void 0 && (l = t[xs] = /* @__PURE__ */ new Set());
    var n = e + "__bubble";
    l.has(n) || (w0(t, e, 2, false), l.add(n));
  }
  function es(e, t, l) {
    var n = 0;
    t && (n |= 4), w0(l, e, n, t);
  }
  var Ia = "_reactListening" + Math.random().toString(36).slice(2);
  function Fu(e) {
    if (!e[Ia]) {
      e[Ia] = true, gf.forEach(function(l) {
        l !== "selectionchange" && (Nx.has(l) || es(l, false, e), es(l, true, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ia] || (t[Ia] = true, es("selectionchange", false, t));
    }
  }
  function w0(e, t, l, n) {
    switch (R0(t)) {
      case 2:
        var a = Ix;
        break;
      case 8:
        a = Px;
        break;
      default:
        a = to;
    }
    l = a.bind(null, t, l, e), a = void 0, !ys || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = true), n ? a !== void 0 ? e.addEventListener(t, l, {
      capture: true,
      passive: a
    }) : e.addEventListener(t, l, true) : a !== void 0 ? e.addEventListener(t, l, {
      passive: a
    }) : e.addEventListener(t, l, false);
  }
  function ts(e, t, l, n, a) {
    var i = n;
    if (!(t & 1) && !(t & 2) && n !== null) e: for (; ; ) {
      if (n === null) return;
      var s = n.tag;
      if (s === 3 || s === 4) {
        var u = n.stateNode.containerInfo;
        if (u === a) break;
        if (s === 4) for (s = n.return; s !== null; ) {
          var o = s.tag;
          if ((o === 3 || o === 4) && s.stateNode.containerInfo === a) return;
          s = s.return;
        }
        for (; u !== null; ) {
          if (s = Pl(u), s === null) return;
          if (o = s.tag, o === 5 || o === 6 || o === 26 || o === 27) {
            n = i = s;
            continue e;
          }
          u = u.parentNode;
        }
      }
      n = n.return;
    }
    _f(function() {
      var d = i, g = xu(l), p = [];
      e: {
        var m = Gf.get(e);
        if (m !== void 0) {
          var x = tc, j = e;
          switch (e) {
            case "keypress":
              if (ui(l) === 0) break e;
            case "keydown":
            case "keyup":
              x = gm;
              break;
            case "focusin":
              j = "focus", x = Ec;
              break;
            case "focusout":
              j = "blur", x = Ec;
              break;
            case "beforeblur":
            case "afterblur":
              x = Ec;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              x = _o;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              x = im;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              x = ym;
              break;
            case Bf:
            case Lf:
            case Hf:
              x = um;
              break;
            case Rf:
              x = jm;
              break;
            case "scroll":
            case "scrollend":
              x = nm;
              break;
            case "wheel":
              x = Nm;
              break;
            case "copy":
            case "cut":
            case "paste":
              x = rm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              x = To;
              break;
            case "toggle":
            case "beforetoggle":
              x = wm;
          }
          var z = (t & 4) !== 0, A = !z && (e === "scroll" || e === "scrollend"), f = z ? m !== null ? m + "Capture" : null : m;
          z = [];
          for (var r = d, h; r !== null; ) {
            var v = r;
            if (h = v.stateNode, v = v.tag, v !== 5 && v !== 26 && v !== 27 || h === null || f === null || (v = ra(r, f), v != null && z.push(ba(r, v, h))), A) break;
            r = r.return;
          }
          0 < z.length && (m = new x(m, j, null, l, g), p.push({
            event: m,
            listeners: z
          }));
        }
      }
      if (!(t & 7)) {
        e: {
          if (m = e === "mouseover" || e === "pointerover", x = e === "mouseout" || e === "pointerout", m && l !== bs && (j = l.relatedTarget || l.fromElement) && (Pl(j) || j[Dn])) break e;
          if ((x || m) && (m = g.window === g ? g : (m = g.ownerDocument) ? m.defaultView || m.parentWindow : window, x ? (j = l.relatedTarget || l.toElement, x = d, j = j ? Pl(j) : null, j !== null && (A = Na(j), z = j.tag, j !== A || z !== 5 && z !== 27 && z !== 6) && (j = null)) : (x = null, j = d), x !== j)) {
            if (z = _o, v = "onMouseLeave", f = "onMouseEnter", r = "mouse", (e === "pointerout" || e === "pointerover") && (z = To, v = "onPointerLeave", f = "onPointerEnter", r = "pointer"), A = x == null ? m : Zn(x), h = j == null ? m : Zn(j), m = new z(v, r + "leave", x, l, g), m.target = A, m.relatedTarget = h, v = null, Pl(g) === d && (z = new z(f, r + "enter", j, l, g), z.target = h, z.relatedTarget = A, v = z), A = v, x && j) t: {
              for (z = _x, f = x, r = j, h = 0, v = f; v; v = z(v)) h++;
              v = 0;
              for (var T = r; T; T = z(T)) v++;
              for (; 0 < h - v; ) f = z(f), h--;
              for (; 0 < v - h; ) r = z(r), v--;
              for (; h--; ) {
                if (f === r || r !== null && f === r.alternate) {
                  z = f;
                  break t;
                }
                f = z(f), r = z(r);
              }
              z = null;
            }
            else z = null;
            x !== null && vr(p, m, x, z, false), j !== null && A !== null && vr(p, A, j, z, true);
          }
        }
        e: {
          if (m = d ? Zn(d) : window, x = m.nodeName && m.nodeName.toLowerCase(), x === "select" || x === "input" && m.type === "file") var L = Mo;
          else if (Eo(m)) if (Mf) L = Bm;
          else {
            L = km;
            var y = Om;
          }
          else x = m.nodeName, !x || x.toLowerCase() !== "input" || m.type !== "checkbox" && m.type !== "radio" ? d && mu(d.elementType) && (L = Mo) : L = Um;
          if (L && (L = L(e, d))) {
            Ef(p, L, l, g);
            break e;
          }
          y && y(e, m, d), e === "focusout" && d && m.type === "number" && d.memoizedProps.value != null && vs(m, "number", m.value);
        }
        switch (y = d ? Zn(d) : window, e) {
          case "focusin":
            (Eo(y) || y.contentEditable === "true") && (ln = y, zs = d, Fn = null);
            break;
          case "focusout":
            Fn = zs = ln = null;
            break;
          case "mousedown":
            js = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            js = false, Bo(p, l, g);
            break;
          case "selectionchange":
            if (Hm) break;
          case "keydown":
          case "keyup":
            Bo(p, l, g);
        }
        var w;
        if (vu) e: {
          switch (e) {
            case "compositionstart":
              var b = "onCompositionStart";
              break e;
            case "compositionend":
              b = "onCompositionEnd";
              break e;
            case "compositionupdate":
              b = "onCompositionUpdate";
              break e;
          }
          b = void 0;
        }
        else tn ? Af(e, l) && (b = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (b = "onCompositionStart");
        b && (Tf && l.locale !== "ko" && (tn || b !== "onCompositionStart" ? b === "onCompositionEnd" && tn && (w = wf()) : (tl = g, pu = "value" in tl ? tl.value : tl.textContent, tn = true)), y = Xi(d, b), 0 < y.length && (b = new wo(b, e, null, l, g), p.push({
          event: b,
          listeners: y
        }), w ? b.data = w : (w = Df(l), w !== null && (b.data = w)))), (w = Am ? Dm(e, l) : Em(e, l)) && (b = Xi(d, "onBeforeInput"), 0 < b.length && (y = new wo("onBeforeInput", "beforeinput", null, l, g), p.push({
          event: y,
          listeners: b
        }), y.data = w)), zx(p, e, d, l, g);
      }
      _0(p, t);
    });
  }
  function ba(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function Xi(e, t) {
    for (var l = t + "Capture", n = []; e !== null; ) {
      var a = e, i = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || i === null || (a = ra(e, l), a != null && n.unshift(ba(e, a, i)), a = ra(e, t), a != null && n.push(ba(e, a, i))), e.tag === 3) return n;
      e = e.return;
    }
    return [];
  }
  function _x(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function vr(e, t, l, n, a) {
    for (var i = t._reactName, s = []; l !== null && l !== n; ) {
      var u = l, o = u.alternate, d = u.stateNode;
      if (u = u.tag, o !== null && o === n) break;
      u !== 5 && u !== 26 && u !== 27 || d === null || (o = d, a ? (d = ra(l, i), d != null && s.unshift(ba(l, d, o))) : a || (d = ra(l, i), d != null && s.push(ba(l, d, o)))), l = l.return;
    }
    s.length !== 0 && e.push({
      event: t,
      listeners: s
    });
  }
  var wx = /\r\n?/g, Tx = /\u0000|\uFFFD/g;
  function br(e) {
    return (typeof e == "string" ? e : "" + e).replace(wx, `
`).replace(Tx, "");
  }
  function T0(e, t) {
    return t = br(t), br(e) === t;
  }
  function le(e, t, l, n, a, i) {
    switch (l) {
      case "children":
        typeof n == "string" ? t === "body" || t === "textarea" && n === "" || bn(e, n) : (typeof n == "number" || typeof n == "bigint") && t !== "body" && bn(e, "" + n);
        break;
      case "className":
        Za(e, "class", n);
        break;
      case "tabIndex":
        Za(e, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Za(e, l, n);
        break;
      case "style":
        Nf(e, n, i);
        break;
      case "data":
        if (t !== "object") {
          Za(e, "data", n);
          break;
        }
      case "src":
      case "href":
        if (n === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") {
          e.removeAttribute(l);
          break;
        }
        n = ci("" + n), e.setAttribute(l, n);
        break;
      case "action":
      case "formAction":
        if (typeof n == "function") {
          e.setAttribute(l, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        } else typeof i == "function" && (l === "formAction" ? (t !== "input" && le(e, t, "name", a.name, a, null), le(e, t, "formEncType", a.formEncType, a, null), le(e, t, "formMethod", a.formMethod, a, null), le(e, t, "formTarget", a.formTarget, a, null)) : (le(e, t, "encType", a.encType, a, null), le(e, t, "method", a.method, a, null), le(e, t, "target", a.target, a, null)));
        if (n == null || typeof n == "symbol" || typeof n == "boolean") {
          e.removeAttribute(l);
          break;
        }
        n = ci("" + n), e.setAttribute(l, n);
        break;
      case "onClick":
        n != null && (e.onclick = kt);
        break;
      case "onScroll":
        n != null && K("scroll", e);
        break;
      case "onScrollEnd":
        n != null && K("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n)) throw Error(_(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(_(60));
            e.innerHTML = l;
          }
        }
        break;
      case "multiple":
        e.multiple = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "muted":
        e.muted = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (n == null || typeof n == "function" || typeof n == "boolean" || typeof n == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        l = ci("" + n), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        n != null && typeof n != "function" && typeof n != "symbol" ? e.setAttribute(l, "" + n) : e.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        n && typeof n != "function" && typeof n != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        n === true ? e.setAttribute(l, "") : n !== false && n != null && typeof n != "function" && typeof n != "symbol" ? e.setAttribute(l, n) : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        n != null && typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n ? e.setAttribute(l, n) : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n) ? e.removeAttribute(l) : e.setAttribute(l, n);
        break;
      case "popover":
        K("beforetoggle", e), K("toggle", e), ii(e, "popover", n);
        break;
      case "xlinkActuate":
        wt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", n);
        break;
      case "xlinkArcrole":
        wt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", n);
        break;
      case "xlinkRole":
        wt(e, "http://www.w3.org/1999/xlink", "xlink:role", n);
        break;
      case "xlinkShow":
        wt(e, "http://www.w3.org/1999/xlink", "xlink:show", n);
        break;
      case "xlinkTitle":
        wt(e, "http://www.w3.org/1999/xlink", "xlink:title", n);
        break;
      case "xlinkType":
        wt(e, "http://www.w3.org/1999/xlink", "xlink:type", n);
        break;
      case "xmlBase":
        wt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", n);
        break;
      case "xmlLang":
        wt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", n);
        break;
      case "xmlSpace":
        wt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", n);
        break;
      case "is":
        ii(e, "is", n);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = tm.get(l) || l, ii(e, l, n));
    }
  }
  function Vs(e, t, l, n, a, i) {
    switch (l) {
      case "style":
        Nf(e, n, i);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n)) throw Error(_(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(_(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof n == "string" ? bn(e, n) : (typeof n == "number" || typeof n == "bigint") && bn(e, "" + n);
        break;
      case "onScroll":
        n != null && K("scroll", e);
        break;
      case "onScrollEnd":
        n != null && K("scrollend", e);
        break;
      case "onClick":
        n != null && (e.onclick = kt);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!vf.hasOwnProperty(l)) e: {
          if (l[0] === "o" && l[1] === "n" && (a = l.endsWith("Capture"), t = l.slice(2, a ? l.length - 7 : void 0), i = e[qe] || null, i = i != null ? i[l] : null, typeof i == "function" && e.removeEventListener(t, i, a), typeof n == "function")) {
            typeof i != "function" && i !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, n, a);
            break e;
          }
          l in e ? e[l] = n : n === true ? e.setAttribute(l, "") : ii(e, l, n);
        }
    }
  }
  function Ce(e, t, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        K("error", e), K("load", e);
        var n = false, a = false, i;
        for (i in l) if (l.hasOwnProperty(i)) {
          var s = l[i];
          if (s != null) switch (i) {
            case "src":
              n = true;
              break;
            case "srcSet":
              a = true;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(_(137, t));
            default:
              le(e, t, i, s, l, null);
          }
        }
        a && le(e, t, "srcSet", l.srcSet, l, null), n && le(e, t, "src", l.src, l, null);
        return;
      case "input":
        K("invalid", e);
        var u = i = s = a = null, o = null, d = null;
        for (n in l) if (l.hasOwnProperty(n)) {
          var g = l[n];
          if (g != null) switch (n) {
            case "name":
              a = g;
              break;
            case "type":
              s = g;
              break;
            case "checked":
              o = g;
              break;
            case "defaultChecked":
              d = g;
              break;
            case "value":
              i = g;
              break;
            case "defaultValue":
              u = g;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (g != null) throw Error(_(137, t));
              break;
            default:
              le(e, t, n, g, l, null);
          }
        }
        zf(e, i, u, o, d, s, a, false);
        return;
      case "select":
        K("invalid", e), n = s = i = null;
        for (a in l) if (l.hasOwnProperty(a) && (u = l[a], u != null)) switch (a) {
          case "value":
            i = u;
            break;
          case "defaultValue":
            s = u;
            break;
          case "multiple":
            n = u;
          default:
            le(e, t, a, u, l, null);
        }
        t = i, l = s, e.multiple = !!n, t != null ? fn(e, !!n, t, false) : l != null && fn(e, !!n, l, true);
        return;
      case "textarea":
        K("invalid", e), i = a = n = null;
        for (s in l) if (l.hasOwnProperty(s) && (u = l[s], u != null)) switch (s) {
          case "value":
            n = u;
            break;
          case "defaultValue":
            a = u;
            break;
          case "children":
            i = u;
            break;
          case "dangerouslySetInnerHTML":
            if (u != null) throw Error(_(91));
            break;
          default:
            le(e, t, s, u, l, null);
        }
        Sf(e, n, a, i);
        return;
      case "option":
        for (o in l) if (l.hasOwnProperty(o) && (n = l[o], n != null)) switch (o) {
          case "selected":
            e.selected = n && typeof n != "function" && typeof n != "symbol";
            break;
          default:
            le(e, t, o, n, l, null);
        }
        return;
      case "dialog":
        K("beforetoggle", e), K("toggle", e), K("cancel", e), K("close", e);
        break;
      case "iframe":
      case "object":
        K("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < va.length; n++) K(va[n], e);
        break;
      case "image":
        K("error", e), K("load", e);
        break;
      case "details":
        K("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        K("error", e), K("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (d in l) if (l.hasOwnProperty(d) && (n = l[d], n != null)) switch (d) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(_(137, t));
          default:
            le(e, t, d, n, l, null);
        }
        return;
      default:
        if (mu(t)) {
          for (g in l) l.hasOwnProperty(g) && (n = l[g], n !== void 0 && Vs(e, t, g, n, l, void 0));
          return;
        }
    }
    for (u in l) l.hasOwnProperty(u) && (n = l[u], n != null && le(e, t, u, n, l, null));
  }
  function Ax(e, t, l, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var a = null, i = null, s = null, u = null, o = null, d = null, g = null;
        for (x in l) {
          var p = l[x];
          if (l.hasOwnProperty(x) && p != null) switch (x) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              o = p;
            default:
              n.hasOwnProperty(x) || le(e, t, x, null, n, p);
          }
        }
        for (var m in n) {
          var x = n[m];
          if (p = l[m], n.hasOwnProperty(m) && (x != null || p != null)) switch (m) {
            case "type":
              i = x;
              break;
            case "name":
              a = x;
              break;
            case "checked":
              d = x;
              break;
            case "defaultChecked":
              g = x;
              break;
            case "value":
              s = x;
              break;
            case "defaultValue":
              u = x;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (x != null) throw Error(_(137, t));
              break;
            default:
              x !== p && le(e, t, m, x, n, p);
          }
        }
        gs(e, s, u, o, d, g, i, a);
        return;
      case "select":
        x = s = u = m = null;
        for (i in l) if (o = l[i], l.hasOwnProperty(i) && o != null) switch (i) {
          case "value":
            break;
          case "multiple":
            x = o;
          default:
            n.hasOwnProperty(i) || le(e, t, i, null, n, o);
        }
        for (a in n) if (i = n[a], o = l[a], n.hasOwnProperty(a) && (i != null || o != null)) switch (a) {
          case "value":
            m = i;
            break;
          case "defaultValue":
            u = i;
            break;
          case "multiple":
            s = i;
          default:
            i !== o && le(e, t, a, i, n, o);
        }
        t = u, l = s, n = x, m != null ? fn(e, !!l, m, false) : !!n != !!l && (t != null ? fn(e, !!l, t, true) : fn(e, !!l, l ? [] : "", false));
        return;
      case "textarea":
        x = m = null;
        for (u in l) if (a = l[u], l.hasOwnProperty(u) && a != null && !n.hasOwnProperty(u)) switch (u) {
          case "value":
            break;
          case "children":
            break;
          default:
            le(e, t, u, null, n, a);
        }
        for (s in n) if (a = n[s], i = l[s], n.hasOwnProperty(s) && (a != null || i != null)) switch (s) {
          case "value":
            m = a;
            break;
          case "defaultValue":
            x = a;
            break;
          case "children":
            break;
          case "dangerouslySetInnerHTML":
            if (a != null) throw Error(_(91));
            break;
          default:
            a !== i && le(e, t, s, a, n, i);
        }
        jf(e, m, x);
        return;
      case "option":
        for (var j in l) if (m = l[j], l.hasOwnProperty(j) && m != null && !n.hasOwnProperty(j)) switch (j) {
          case "selected":
            e.selected = false;
            break;
          default:
            le(e, t, j, null, n, m);
        }
        for (o in n) if (m = n[o], x = l[o], n.hasOwnProperty(o) && m !== x && (m != null || x != null)) switch (o) {
          case "selected":
            e.selected = m && typeof m != "function" && typeof m != "symbol";
            break;
          default:
            le(e, t, o, m, n, x);
        }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var z in l) m = l[z], l.hasOwnProperty(z) && m != null && !n.hasOwnProperty(z) && le(e, t, z, null, n, m);
        for (d in n) if (m = n[d], x = l[d], n.hasOwnProperty(d) && m !== x && (m != null || x != null)) switch (d) {
          case "children":
          case "dangerouslySetInnerHTML":
            if (m != null) throw Error(_(137, t));
            break;
          default:
            le(e, t, d, m, n, x);
        }
        return;
      default:
        if (mu(t)) {
          for (var A in l) m = l[A], l.hasOwnProperty(A) && m !== void 0 && !n.hasOwnProperty(A) && Vs(e, t, A, void 0, n, m);
          for (g in n) m = n[g], x = l[g], !n.hasOwnProperty(g) || m === x || m === void 0 && x === void 0 || Vs(e, t, g, m, n, x);
          return;
        }
    }
    for (var f in l) m = l[f], l.hasOwnProperty(f) && m != null && !n.hasOwnProperty(f) && le(e, t, f, null, n, m);
    for (p in n) m = n[p], x = l[p], !n.hasOwnProperty(p) || m === x || m == null && x == null || le(e, t, p, m, n, x);
  }
  function yr(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return true;
      default:
        return false;
    }
  }
  function Dx() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), n = 0; n < l.length; n++) {
        var a = l[n], i = a.transferSize, s = a.initiatorType, u = a.duration;
        if (i && u && yr(s)) {
          for (s = 0, u = a.responseEnd, n += 1; n < l.length; n++) {
            var o = l[n], d = o.startTime;
            if (d > u) break;
            var g = o.transferSize, p = o.initiatorType;
            g && yr(p) && (o = o.responseEnd, s += g * (o < u ? 1 : (u - d) / (o - d)));
          }
          if (--n, t += 8 * (i + s) / (a.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Ks = null, Js = null;
  function Zi(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function zr(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function A0(e, t) {
    if (e === 0) switch (t) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function $s(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var ls = null;
  function Ex() {
    var e = window.event;
    return e && e.type === "popstate" ? e === ls ? false : (ls = e, true) : (ls = null, false);
  }
  var D0 = typeof setTimeout == "function" ? setTimeout : void 0, Mx = typeof clearTimeout == "function" ? clearTimeout : void 0, jr = typeof Promise == "function" ? Promise : void 0, Cx = typeof queueMicrotask == "function" ? queueMicrotask : typeof jr < "u" ? function(e) {
    return jr.resolve(null).then(e).catch(Ox);
  } : D0;
  function Ox(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function bl(e) {
    return e === "head";
  }
  function Sr(e, t) {
    var l = t, n = 0;
    do {
      var a = l.nextSibling;
      if (e.removeChild(l), a && a.nodeType === 8) if (l = a.data, l === "/$" || l === "/&") {
        if (n === 0) {
          e.removeChild(a), Tn(t);
          return;
        }
        n--;
      } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&") n++;
      else if (l === "html") sa(e.ownerDocument.documentElement);
      else if (l === "head") {
        l = e.ownerDocument.head, sa(l);
        for (var i = l.firstChild; i; ) {
          var s = i.nextSibling, u = i.nodeName;
          i[Aa] || u === "SCRIPT" || u === "STYLE" || u === "LINK" && i.rel.toLowerCase() === "stylesheet" || l.removeChild(i), i = s;
        }
      } else l === "body" && sa(e.ownerDocument.body);
      l = a;
    } while (l);
    Tn(t);
  }
  function Nr(e, t) {
    var l = e;
    e = 0;
    do {
      var n = l.nextSibling;
      if (l.nodeType === 1 ? t ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (t ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), n && n.nodeType === 8) if (l = n.data, l === "/$") {
        if (e === 0) break;
        e--;
      } else l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
      l = n;
    } while (l);
  }
  function Ws(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Ws(l), hu(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(l);
    }
  }
  function kx(e, t, l, n) {
    for (; e.nodeType === 1; ) {
      var a = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (n) {
        if (!e[Aa]) switch (t) {
          case "meta":
            if (!e.hasAttribute("itemprop")) break;
            return e;
          case "link":
            if (i = e.getAttribute("rel"), i === "stylesheet" && e.hasAttribute("data-precedence")) break;
            if (i !== a.rel || e.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || e.getAttribute("title") !== (a.title == null ? null : a.title)) break;
            return e;
          case "style":
            if (e.hasAttribute("data-precedence")) break;
            return e;
          case "script":
            if (i = e.getAttribute("src"), (i !== (a.src == null ? null : a.src) || e.getAttribute("type") !== (a.type == null ? null : a.type) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && i && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
            return e;
          default:
            return e;
        }
      } else if (t === "input" && e.type === "hidden") {
        var i = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && e.getAttribute("name") === i) return e;
      } else return e;
      if (e = rt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Ux(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = rt(e.nextSibling), e === null)) return null;
    return e;
  }
  function E0(e, t) {
    for (; e.nodeType !== 8; ) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = rt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Fs(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Is(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Bx(e, t) {
    var l = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || l.readyState !== "loading") t();
    else {
      var n = function() {
        t(), l.removeEventListener("DOMContentLoaded", n);
      };
      l.addEventListener("DOMContentLoaded", n), e._reactRetry = n;
    }
  }
  function rt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var Ps = null;
  function _r(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0) return rt(e.nextSibling);
          t--;
        } else l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function wr(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (t === 0) return e;
          t--;
        } else l !== "/$" && l !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function M0(e, t, l) {
    switch (t = Zi(l), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(_(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(_(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(_(454));
        return e;
      default:
        throw Error(_(451));
    }
  }
  function sa(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    hu(e);
  }
  var ft = /* @__PURE__ */ new Map(), Tr = /* @__PURE__ */ new Set();
  function Vi(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Xt = P.d;
  P.d = {
    f: Lx,
    r: Hx,
    D: Rx,
    C: Gx,
    L: Yx,
    m: qx,
    X: Xx,
    S: Qx,
    M: Zx
  };
  function Lx() {
    var e = Xt.f(), t = dc();
    return e || t;
  }
  function Hx(e) {
    var t = En(e);
    t !== null && t.tag === 5 && t.type === "form" ? Nd(t) : Xt.r(e);
  }
  var kn = typeof document > "u" ? null : document;
  function C0(e, t, l) {
    var n = kn;
    if (n && typeof t == "string" && t) {
      var a = ct(t);
      a = 'link[rel="' + e + '"][href="' + a + '"]', typeof l == "string" && (a += '[crossorigin="' + l + '"]'), Tr.has(a) || (Tr.add(a), e = {
        rel: e,
        crossOrigin: l,
        href: t
      }, n.querySelector(a) === null && (t = n.createElement("link"), Ce(t, "link", e), we(t), n.head.appendChild(t)));
    }
  }
  function Rx(e) {
    Xt.D(e), C0("dns-prefetch", e, null);
  }
  function Gx(e, t) {
    Xt.C(e, t), C0("preconnect", e, t);
  }
  function Yx(e, t, l) {
    Xt.L(e, t, l);
    var n = kn;
    if (n && e && t) {
      var a = 'link[rel="preload"][as="' + ct(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (a += '[imagesrcset="' + ct(l.imageSrcSet) + '"]', typeof l.imageSizes == "string" && (a += '[imagesizes="' + ct(l.imageSizes) + '"]')) : a += '[href="' + ct(e) + '"]';
      var i = a;
      switch (t) {
        case "style":
          i = wn(e);
          break;
        case "script":
          i = Un(e);
      }
      ft.has(i) || (e = re({
        rel: "preload",
        href: t === "image" && l && l.imageSrcSet ? void 0 : e,
        as: t
      }, l), ft.set(i, e), n.querySelector(a) !== null || t === "style" && n.querySelector(ka(i)) || t === "script" && n.querySelector(Ua(i)) || (t = n.createElement("link"), Ce(t, "link", e), we(t), n.head.appendChild(t)));
    }
  }
  function qx(e, t) {
    Xt.m(e, t);
    var l = kn;
    if (l && e) {
      var n = t && typeof t.as == "string" ? t.as : "script", a = 'link[rel="modulepreload"][as="' + ct(n) + '"][href="' + ct(e) + '"]', i = a;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = Un(e);
      }
      if (!ft.has(i) && (e = re({
        rel: "modulepreload",
        href: e
      }, t), ft.set(i, e), l.querySelector(a) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Ua(i))) return;
        }
        n = l.createElement("link"), Ce(n, "link", e), we(n), l.head.appendChild(n);
      }
    }
  }
  function Qx(e, t, l) {
    Xt.S(e, t, l);
    var n = kn;
    if (n && e) {
      var a = rn(n).hoistableStyles, i = wn(e);
      t = t || "default";
      var s = a.get(i);
      if (!s) {
        var u = {
          loading: 0,
          preload: null
        };
        if (s = n.querySelector(ka(i))) u.loading = 5;
        else {
          e = re({
            rel: "stylesheet",
            href: e,
            "data-precedence": t
          }, l), (l = ft.get(i)) && Iu(e, l);
          var o = s = n.createElement("link");
          we(o), Ce(o, "link", e), o._p = new Promise(function(d, g) {
            o.onload = d, o.onerror = g;
          }), o.addEventListener("load", function() {
            u.loading |= 1;
          }), o.addEventListener("error", function() {
            u.loading |= 2;
          }), u.loading |= 4, pi(s, t, n);
        }
        s = {
          type: "stylesheet",
          instance: s,
          count: 1,
          state: u
        }, a.set(i, s);
      }
    }
  }
  function Xx(e, t) {
    Xt.X(e, t);
    var l = kn;
    if (l && e) {
      var n = rn(l).hoistableScripts, a = Un(e), i = n.get(a);
      i || (i = l.querySelector(Ua(a)), i || (e = re({
        src: e,
        async: true
      }, t), (t = ft.get(a)) && Pu(e, t), i = l.createElement("script"), we(i), Ce(i, "link", e), l.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, n.set(a, i));
    }
  }
  function Zx(e, t) {
    Xt.M(e, t);
    var l = kn;
    if (l && e) {
      var n = rn(l).hoistableScripts, a = Un(e), i = n.get(a);
      i || (i = l.querySelector(Ua(a)), i || (e = re({
        src: e,
        async: true,
        type: "module"
      }, t), (t = ft.get(a)) && Pu(e, t), i = l.createElement("script"), we(i), Ce(i, "link", e), l.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, n.set(a, i));
    }
  }
  function Ar(e, t, l, n) {
    var a = (a = il.current) ? Vi(a) : null;
    if (!a) throw Error(_(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = wn(l.href), l = rn(a).hoistableStyles, n = l.get(t), n || (n = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, n)), n) : {
          type: "void",
          instance: null,
          count: 0,
          state: null
        };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = wn(l.href);
          var i = rn(a).hoistableStyles, s = i.get(e);
          if (s || (a = a.ownerDocument || a, s = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: {
              loading: 0,
              preload: null
            }
          }, i.set(e, s), (i = a.querySelector(ka(e))) && !i._p && (s.instance = i, s.state.loading = 5), ft.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, ft.set(e, l), i || Vx(a, e, l, s.state))), t && n === null) throw Error(_(528, ""));
          return s;
        }
        if (t && n !== null) throw Error(_(529, ""));
        return null;
      case "script":
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Un(l), l = rn(a).hoistableScripts, n = l.get(t), n || (n = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, n)), n) : {
          type: "void",
          instance: null,
          count: 0,
          state: null
        };
      default:
        throw Error(_(444, e));
    }
  }
  function wn(e) {
    return 'href="' + ct(e) + '"';
  }
  function ka(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function O0(e) {
    return re({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Vx(e, t, l, n) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? n.loading = 1 : (t = e.createElement("link"), n.preload = t, t.addEventListener("load", function() {
      return n.loading |= 1;
    }), t.addEventListener("error", function() {
      return n.loading |= 2;
    }), Ce(t, "link", l), we(t), e.head.appendChild(t));
  }
  function Un(e) {
    return '[src="' + ct(e) + '"]';
  }
  function Ua(e) {
    return "script[async]" + e;
  }
  function Dr(e, t, l) {
    if (t.count++, t.instance === null) switch (t.type) {
      case "style":
        var n = e.querySelector('style[data-href~="' + ct(l.href) + '"]');
        if (n) return t.instance = n, we(n), n;
        var a = re({}, l, {
          "data-href": l.href,
          "data-precedence": l.precedence,
          href: null,
          precedence: null
        });
        return n = (e.ownerDocument || e).createElement("style"), we(n), Ce(n, "style", a), pi(n, l.precedence, e), t.instance = n;
      case "stylesheet":
        a = wn(l.href);
        var i = e.querySelector(ka(a));
        if (i) return t.state.loading |= 4, t.instance = i, we(i), i;
        n = O0(l), (a = ft.get(a)) && Iu(n, a), i = (e.ownerDocument || e).createElement("link"), we(i);
        var s = i;
        return s._p = new Promise(function(u, o) {
          s.onload = u, s.onerror = o;
        }), Ce(i, "link", n), t.state.loading |= 4, pi(i, l.precedence, e), t.instance = i;
      case "script":
        return i = Un(l.src), (a = e.querySelector(Ua(i))) ? (t.instance = a, we(a), a) : (n = l, (a = ft.get(i)) && (n = re({}, l), Pu(n, a)), e = e.ownerDocument || e, a = e.createElement("script"), we(a), Ce(a, "link", n), e.head.appendChild(a), t.instance = a);
      case "void":
        return null;
      default:
        throw Error(_(443, t.type));
    }
    else t.type === "stylesheet" && !(t.state.loading & 4) && (n = t.instance, t.state.loading |= 4, pi(n, l.precedence, e));
    return t.instance;
  }
  function pi(e, t, l) {
    for (var n = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), a = n.length ? n[n.length - 1] : null, i = a, s = 0; s < n.length; s++) {
      var u = n[s];
      if (u.dataset.precedence === t) i = u;
      else if (i !== a) break;
    }
    i ? i.parentNode.insertBefore(e, i.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function Iu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Pu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var gi = null;
  function Er(e, t, l) {
    if (gi === null) {
      var n = /* @__PURE__ */ new Map(), a = gi = /* @__PURE__ */ new Map();
      a.set(l, n);
    } else a = gi, n = a.get(l), n || (n = /* @__PURE__ */ new Map(), a.set(l, n));
    if (n.has(e)) return n;
    for (n.set(e, null), l = l.getElementsByTagName(e), a = 0; a < l.length; a++) {
      var i = l[a];
      if (!(i[Aa] || i[De] || e === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
        var s = i.getAttribute(t) || "";
        s = e + s;
        var u = n.get(s);
        u ? u.push(i) : n.set(s, [
          i
        ]);
      }
    }
    return n;
  }
  function Mr(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(l, t === "title" ? e.querySelector("head > title") : null);
  }
  function Kx(e, t, l) {
    if (l === 1 || t.itemProp != null) return false;
    switch (e) {
      case "meta":
      case "title":
        return true;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
        return true;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
        switch (t.rel) {
          case "stylesheet":
            return e = t.disabled, typeof t.precedence == "string" && e == null;
          default:
            return true;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return true;
    }
    return false;
  }
  function k0(e) {
    return !(e.type === "stylesheet" && !(e.state.loading & 3));
  }
  function Jx(e, t, l, n) {
    if (l.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== false) && !(l.state.loading & 4)) {
      if (l.instance === null) {
        var a = wn(n.href), i = t.querySelector(ka(a));
        if (i) {
          t = i._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ki.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = i, we(i);
          return;
        }
        i = t.ownerDocument || t, n = O0(n), (a = ft.get(a)) && Iu(n, a), i = i.createElement("link"), we(i);
        var s = i;
        s._p = new Promise(function(u, o) {
          s.onload = u, s.onerror = o;
        }), Ce(i, "link", n), l.instance = i;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && !(l.state.loading & 3) && (e.count++, l = Ki.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var ns = 0;
  function $x(e, t) {
    return e.stylesheets && e.count === 0 && vi(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var n = setTimeout(function() {
        if (e.stylesheets && vi(e, e.stylesheets), e.unsuspend) {
          var i = e.unsuspend;
          e.unsuspend = null, i();
        }
      }, 6e4 + t);
      0 < e.imgBytes && ns === 0 && (ns = 62500 * Dx());
      var a = setTimeout(function() {
        if (e.waitingForImages = false, e.count === 0 && (e.stylesheets && vi(e, e.stylesheets), e.unsuspend)) {
          var i = e.unsuspend;
          e.unsuspend = null, i();
        }
      }, (e.imgBytes > ns ? 50 : 800) + t);
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(n), clearTimeout(a);
      };
    } : null;
  }
  function Ki() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) vi(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Ji = null;
  function vi(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Ji = /* @__PURE__ */ new Map(), t.forEach(Wx, e), Ji = null, Ki.call(e));
  }
  function Wx(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Ji.get(e);
      if (l) var n = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Ji.set(e, l);
        for (var a = e.querySelectorAll("link[data-precedence],style[data-precedence]"), i = 0; i < a.length; i++) {
          var s = a[i];
          (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (l.set(s.dataset.precedence, s), n = s);
        }
        n && l.set(null, n);
      }
      a = t.instance, s = a.getAttribute("data-precedence"), i = l.get(s) || n, i === n && l.set(null, a), l.set(s, a), this.count++, n = Ki.bind(this), a.addEventListener("load", n), a.addEventListener("error", n), i ? i.parentNode.insertBefore(a, i.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(a, e.firstChild)), t.state.loading |= 4;
    }
  }
  var ya = {
    $$typeof: Ot,
    Provider: null,
    Consumer: null,
    _currentValue: Al,
    _currentValue2: Al,
    _threadCount: 0
  };
  function Fx(e, t, l, n, a, i, s, u, o) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = wc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wc(0), this.hiddenUpdates = wc(null), this.identifierPrefix = n, this.onUncaughtError = a, this.onCaughtError = i, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = o, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function U0(e, t, l, n, a, i, s, u, o, d, g, p) {
    return e = new Fx(e, t, l, s, o, d, g, p, u), t = 1, i === true && (t |= 24), i = Ke(3, null, null, t), e.current = i, i.stateNode = e, t = _u(), t.refCount++, e.pooledCache = t, t.refCount++, i.memoizedState = {
      element: n,
      isDehydrated: l,
      cache: t
    }, Au(i), e;
  }
  function B0(e) {
    return e ? (e = cn, e) : cn;
  }
  function L0(e, t, l, n, a, i) {
    a = B0(a), n.context === null ? n.context = a : n.pendingContext = a, n = sl(t), n.payload = {
      element: l
    }, i = i === void 0 ? null : i, i !== null && (n.callback = i), l = ul(e, n, t), l !== null && (Ye(l, e, t), Pn(l, e, t));
  }
  function Cr(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function eo(e, t) {
    Cr(e, t), (e = e.alternate) && Cr(e, t);
  }
  function H0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Yl(e, 67108864);
      t !== null && Ye(t, e, 67108864), eo(e, 67108864);
    }
  }
  function Or(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ie();
      t = fu(t);
      var l = Yl(e, t);
      l !== null && Ye(l, e, t), eo(e, t);
    }
  }
  var $i = true;
  function Ix(e, t, l, n) {
    var a = Y.T;
    Y.T = null;
    var i = P.p;
    try {
      P.p = 2, to(e, t, l, n);
    } finally {
      P.p = i, Y.T = a;
    }
  }
  function Px(e, t, l, n) {
    var a = Y.T;
    Y.T = null;
    var i = P.p;
    try {
      P.p = 8, to(e, t, l, n);
    } finally {
      P.p = i, Y.T = a;
    }
  }
  function to(e, t, l, n) {
    if ($i) {
      var a = eu(n);
      if (a === null) ts(e, t, n, Wi, l), kr(e, n);
      else if (tp(a, e, t, l, n)) n.stopPropagation();
      else if (kr(e, n), t & 4 && -1 < ep.indexOf(e)) {
        for (; a !== null; ) {
          var i = En(a);
          if (i !== null) switch (i.tag) {
            case 3:
              if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                var s = _l(i.pendingLanes);
                if (s !== 0) {
                  var u = i;
                  for (u.pendingLanes |= 2, u.entangledLanes |= 2; s; ) {
                    var o = 1 << 31 - Fe(s);
                    u.entanglements[1] |= o, s &= ~o;
                  }
                  Nt(i), !(I & 6) && (Ri = $e() + 500, Oa(0));
                }
              }
              break;
            case 31:
            case 13:
              u = Yl(i, 2), u !== null && Ye(u, i, 2), dc(), eo(i, 2);
          }
          if (i = eu(n), i === null && ts(e, t, n, Wi, l), i === a) break;
          a = i;
        }
        a !== null && n.stopPropagation();
      } else ts(e, t, n, null, l);
    }
  }
  function eu(e) {
    return e = xu(e), lo(e);
  }
  var Wi = null;
  function lo(e) {
    if (Wi = null, e = Pl(e), e !== null) {
      var t = Na(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = nf(t), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = af(t), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Wi = e, null;
  }
  function R0(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Rh()) {
          case of:
            return 2;
          case rf:
            return 8;
          case _i:
          case Gh:
            return 32;
          case ff:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var tu = false, fl = null, dl = null, hl = null, za = /* @__PURE__ */ new Map(), ja = /* @__PURE__ */ new Map(), Pt = [], ep = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function kr(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        fl = null;
        break;
      case "dragenter":
      case "dragleave":
        dl = null;
        break;
      case "mouseover":
      case "mouseout":
        hl = null;
        break;
      case "pointerover":
      case "pointerout":
        za.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ja.delete(t.pointerId);
    }
  }
  function qn(e, t, l, n, a, i) {
    return e === null || e.nativeEvent !== i ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: n,
      nativeEvent: i,
      targetContainers: [
        a
      ]
    }, t !== null && (t = En(t), t !== null && H0(t)), e) : (e.eventSystemFlags |= n, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
  }
  function tp(e, t, l, n, a) {
    switch (t) {
      case "focusin":
        return fl = qn(fl, e, t, l, n, a), true;
      case "dragenter":
        return dl = qn(dl, e, t, l, n, a), true;
      case "mouseover":
        return hl = qn(hl, e, t, l, n, a), true;
      case "pointerover":
        var i = a.pointerId;
        return za.set(i, qn(za.get(i) || null, e, t, l, n, a)), true;
      case "gotpointercapture":
        return i = a.pointerId, ja.set(i, qn(ja.get(i) || null, e, t, l, n, a)), true;
    }
    return false;
  }
  function G0(e) {
    var t = Pl(e.target);
    if (t !== null) {
      var l = Na(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = nf(l), t !== null) {
            e.blockedOn = t, vo(e.priority, function() {
              Or(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = af(l), t !== null) {
            e.blockedOn = t, vo(e.priority, function() {
              Or(l);
            });
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function bi(e) {
    if (e.blockedOn !== null) return false;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = eu(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var n = new l.constructor(l.type, l);
        bs = n, l.target.dispatchEvent(n), bs = null;
      } else return t = En(l), t !== null && H0(t), e.blockedOn = l, false;
      t.shift();
    }
    return true;
  }
  function Ur(e, t, l) {
    bi(e) && l.delete(t);
  }
  function lp() {
    tu = false, fl !== null && bi(fl) && (fl = null), dl !== null && bi(dl) && (dl = null), hl !== null && bi(hl) && (hl = null), za.forEach(Ur), ja.forEach(Ur);
  }
  function Pa(e, t) {
    e.blockedOn === t && (e.blockedOn = null, tu || (tu = true, Se.unstable_scheduleCallback(Se.unstable_NormalPriority, lp)));
  }
  var ei = null;
  function Br(e) {
    ei !== e && (ei = e, Se.unstable_scheduleCallback(Se.unstable_NormalPriority, function() {
      ei === e && (ei = null);
      for (var t = 0; t < e.length; t += 3) {
        var l = e[t], n = e[t + 1], a = e[t + 2];
        if (typeof n != "function") {
          if (lo(n || l) === null) continue;
          break;
        }
        var i = En(l);
        i !== null && (e.splice(t, 3), t -= 3, Us(i, {
          pending: true,
          data: a,
          method: l.method,
          action: n
        }, n, a));
      }
    }));
  }
  function Tn(e) {
    function t(o) {
      return Pa(o, e);
    }
    fl !== null && Pa(fl, e), dl !== null && Pa(dl, e), hl !== null && Pa(hl, e), za.forEach(t), ja.forEach(t);
    for (var l = 0; l < Pt.length; l++) {
      var n = Pt[l];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < Pt.length && (l = Pt[0], l.blockedOn === null); ) G0(l), l.blockedOn === null && Pt.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null) for (n = 0; n < l.length; n += 3) {
      var a = l[n], i = l[n + 1], s = a[qe] || null;
      if (typeof i == "function") s || Br(l);
      else if (s) {
        var u = null;
        if (i && i.hasAttribute("formAction")) {
          if (a = i, s = i[qe] || null) u = s.formAction;
          else if (lo(a) !== null) continue;
        } else u = s.action;
        typeof u == "function" ? l[n + 1] = u : (l.splice(n, 3), n -= 3), Br(l);
      }
    }
  }
  function Y0() {
    function e(i) {
      i.canIntercept && i.info === "react-transition" && i.intercept({
        handler: function() {
          return new Promise(function(s) {
            return a = s;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      a !== null && (a(), a = null), n || setTimeout(l, 20);
    }
    function l() {
      if (!n && !navigation.transition) {
        var i = navigation.currentEntry;
        i && i.url != null && navigation.navigate(i.url, {
          state: i.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var n = false, a = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(l, 100), function() {
        n = true, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), a !== null && (a(), a = null);
      };
    }
  }
  function no(e) {
    this._internalRoot = e;
  }
  xc.prototype.render = no.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(_(409));
    var l = t.current, n = Ie();
    L0(l, n, e, t, null, null);
  };
  xc.prototype.unmount = no.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      L0(e.current, 2, null, e, null, null), dc(), t[Dn] = null;
    }
  };
  function xc(e) {
    this._internalRoot = e;
  }
  xc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = pf();
      e = {
        blockedOn: null,
        target: e,
        priority: t
      };
      for (var l = 0; l < Pt.length && t !== 0 && t < Pt[l].priority; l++) ;
      Pt.splice(l, 0, e), l === 0 && G0(e);
    }
  };
  var Lr = tf.version;
  if (Lr !== "19.2.3") throw Error(_(527, Lr, "19.2.3"));
  P.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0) throw typeof e.render == "function" ? Error(_(188)) : (e = Object.keys(e).join(","), Error(_(268, e)));
    return e = Ch(t), e = e !== null ? cf(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var np = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: Y,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ti = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ti.isDisabled && ti.supportsFiber) try {
      _a = ti.inject(np), We = ti;
    } catch {
    }
  }
  Ii.createRoot = function(e, t) {
    if (!lf(e)) throw Error(_(299));
    var l = false, n = "", a = Cd, i = Od, s = kd;
    return t != null && (t.unstable_strictMode === true && (l = true), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onUncaughtError !== void 0 && (a = t.onUncaughtError), t.onCaughtError !== void 0 && (i = t.onCaughtError), t.onRecoverableError !== void 0 && (s = t.onRecoverableError)), t = U0(e, 1, false, null, null, l, n, null, a, i, s, Y0), e[Dn] = t.current, Fu(e), new no(t);
  };
  Ii.hydrateRoot = function(e, t, l) {
    if (!lf(e)) throw Error(_(299));
    var n = false, a = "", i = Cd, s = Od, u = kd, o = null;
    return l != null && (l.unstable_strictMode === true && (n = true), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (i = l.onUncaughtError), l.onCaughtError !== void 0 && (s = l.onCaughtError), l.onRecoverableError !== void 0 && (u = l.onRecoverableError), l.formState !== void 0 && (o = l.formState)), t = U0(e, 1, true, t, l ?? null, n, a, o, i, s, u, Y0), t.context = B0(null), l = t.current, n = Ie(), n = fu(n), a = sl(n), a.callback = null, ul(l, a, n), l = n, t.current.lanes = l, Ta(t, l), Nt(t), e[Dn] = t.current, Fu(e), new xc(t);
  };
  Ii.version = "19.2.3";
  function q0() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(q0);
    } catch (e) {
      console.error(e);
    }
  }
  q0(), qr.exports = Ii;
  var ap = qr.exports;
  function ip() {
    const [e, t] = C.useState(false);
    return C.useEffect(() => {
      const l = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, n = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true, a = localStorage.getItem("pwa_prompt_dismissed");
      if (l && !n && !a) {
        const i = setTimeout(() => {
          t(true);
        }, 3e3);
        return () => clearTimeout(i);
      }
    }, []), e ? c.jsx("div", {
      className: "fixed bottom-0 left-0 right-0 z-50 p-4 pb-[calc(20px+env(safe-area-inset-bottom))] animate-slide-up",
      children: c.jsxs("div", {
        className: "max-w-md mx-auto bg-zinc-800/90 backdrop-blur-md border border-zinc-700 rounded-2xl shadow-2xl p-4 relative",
        children: [
          c.jsx("button", {
            onClick: () => {
              t(false), localStorage.setItem("pwa_prompt_dismissed", "true");
            },
            className: "absolute top-2 right-2 text-zinc-500 hover:text-zinc-300 p-1",
            children: c.jsx("svg", {
              className: "w-5 h-5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: c.jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M6 18L18 6M6 6l12 12"
              })
            })
          }),
          c.jsxs("div", {
            className: "flex gap-4",
            children: [
              c.jsx("div", {
                className: "shrink-0 bg-zinc-700 rounded-xl w-12 h-12 flex items-center justify-center text-2xl",
                children: "\u{1F4F2}"
              }),
              c.jsxs("div", {
                className: "flex-1",
                children: [
                  c.jsx("h3", {
                    className: "font-semibold text-zinc-100 text-sm mb-1",
                    children: "App installieren / Vollbild"
                  }),
                  c.jsx("p", {
                    className: "text-xs text-zinc-400 leading-relaxed mb-3",
                    children: "F\xFCr das beste Erlebnis ohne Browser-Leisten:"
                  }),
                  c.jsxs("div", {
                    className: "text-xs text-zinc-300 flex flex-col gap-1.5",
                    children: [
                      c.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          c.jsx("span", {
                            className: "w-5 h-5 flex items-center justify-center bg-zinc-700 rounded text-[10px]",
                            children: "1"
                          }),
                          c.jsxs("span", {
                            children: [
                              "Tippe auf ",
                              c.jsxs("span", {
                                className: "inline-block",
                                children: [
                                  c.jsx("svg", {
                                    className: "w-4 h-4 inline text-blue-400",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: c.jsx("path", {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      strokeWidth: 2,
                                      d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                    })
                                  }),
                                  " Teilen"
                                ]
                              }),
                              " (unten)"
                            ]
                          })
                        ]
                      }),
                      c.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          c.jsx("span", {
                            className: "w-5 h-5 flex items-center justify-center bg-zinc-700 rounded text-[10px]",
                            children: "2"
                          }),
                          c.jsxs("span", {
                            children: [
                              "W\xE4hle ",
                              c.jsx("span", {
                                className: "font-semibold text-zinc-100",
                                children: "+ Zum Home-Bildschirm"
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      })
    }) : null;
  }
  const cp = ({ className: e }) => c.jsxs("svg", {
    className: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      c.jsx("path", {
        d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      }),
      c.jsx("polyline", {
        points: "22,6 12,13 2,6"
      })
    ]
  }), sp = ({ className: e }) => c.jsxs("svg", {
    className: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      c.jsx("rect", {
        x: "3",
        y: "4",
        width: "18",
        height: "18",
        rx: "2",
        ry: "2"
      }),
      c.jsx("line", {
        x1: "16",
        y1: "2",
        x2: "16",
        y2: "6"
      }),
      c.jsx("line", {
        x1: "8",
        y1: "2",
        x2: "8",
        y2: "6"
      }),
      c.jsx("line", {
        x1: "3",
        y1: "10",
        x2: "21",
        y2: "10"
      }),
      c.jsx("path", {
        d: "M8 14h.01"
      }),
      c.jsx("path", {
        d: "M12 14h.01"
      }),
      c.jsx("path", {
        d: "M16 14h.01"
      }),
      c.jsx("path", {
        d: "M8 18h.01"
      }),
      c.jsx("path", {
        d: "M12 18h.01"
      }),
      c.jsx("path", {
        d: "M16 18h.01"
      })
    ]
  }), up = ({ className: e }) => c.jsxs("svg", {
    className: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      c.jsx("rect", {
        x: "3",
        y: "4",
        width: "18",
        height: "18",
        rx: "2",
        ry: "2"
      }),
      c.jsx("line", {
        x1: "16",
        y1: "2",
        x2: "16",
        y2: "6"
      }),
      c.jsx("line", {
        x1: "8",
        y1: "2",
        x2: "8",
        y2: "6"
      }),
      c.jsx("line", {
        x1: "3",
        y1: "10",
        x2: "21",
        y2: "10"
      })
    ]
  }), op = ({ className: e }) => c.jsxs("svg", {
    className: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      c.jsx("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      c.jsx("line", {
        x1: "12",
        y1: "8",
        x2: "12",
        y2: "12"
      }),
      c.jsx("line", {
        x1: "12",
        y1: "16",
        x2: "12.01",
        y2: "16"
      })
    ]
  }), rp = ({ className: e }) => c.jsx("svg", {
    className: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    children: c.jsx("path", {
      d: "M6 9l6 6 6-6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  }), fp = ({ className: e }) => c.jsx("svg", {
    className: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: c.jsx("path", {
      d: "M4 6h16M4 10h16M4 14h16M4 18h16"
    })
  });
  function dp({ activeFilter: e, onFilterSelect: t, projects: l, contexts: n, tags: a = [], isOpen: i, onClose: s, onSyncClick: u, onPullClick: o, isSyncing: d, isAuthenticated: g, onDropboxSync: p, onDropboxPull: m, isDropboxAuth: x, isDropboxSyncing: j, onGTasksSync: z, onPageNavigate: A }) {
    const [f, r] = C.useState(true), [h, v] = C.useState(true), [T, L] = C.useState(true), [y, w] = C.useState(true), [b, N] = C.useState(true), E = (U, V) => e.type === U && (V === void 0 || e.value === V), M = (U) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left transition-all duration-200 ${U ? "bg-zinc-800/80 text-white shadow-sm border border-zinc-700/50" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border border-transparent"}`, k = ({ label: U, expanded: V, onToggle: D, onAdd: B }) => c.jsxs("div", {
      onClick: D,
      className: "flex items-center justify-between px-3 py-2 mt-6 text-zinc-500 hover:text-zinc-300 cursor-pointer group transition-colors",
      children: [
        c.jsx("span", {
          className: "text-[10px] uppercase tracking-[0.15em] font-bold",
          children: U
        }),
        c.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            B && c.jsx("button", {
              className: "opacity-0 group-hover:opacity-100 p-0.5 hover:bg-zinc-800 rounded transition-all",
              onClick: (O) => {
                O.stopPropagation(), B();
              },
              children: c.jsx("svg", {
                className: "w-3 h-3",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                children: c.jsx("path", {
                  d: "M12 5v14M5 12h14",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })
              })
            }),
            c.jsx(rp, {
              className: `w-3 h-3 transition-transform duration-200 ${V ? "" : "-rotate-90"}`
            })
          ]
        })
      ]
    });
    return c.jsxs(c.Fragment, {
      children: [
        i && c.jsx("div", {
          className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity",
          onClick: s
        }),
        c.jsxs("aside", {
          className: `
            w-[280px] bg-zinc-950/95 backdrop-blur-xl flex flex-col border-l border-zinc-800/50 pt-6 px-3 shrink-0 overflow-y-auto no-scrollbar
            fixed inset-y-0 right-0 z-50 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${i ? "translate-x-0 shadow-2xl shadow-black/50" : "translate-x-full"}
            font-sans
        `,
          children: [
            c.jsxs("div", {
              className: "mb-8 px-3 flex items-center justify-between",
              children: [
                c.jsxs("div", {
                  className: "flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-default",
                  children: [
                    c.jsx("div", {
                      className: "w-8 h-8 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center",
                      children: c.jsx("span", {
                        className: "text-lg",
                        children: "\u2611\uFE0F"
                      })
                    }),
                    c.jsx("span", {
                      className: "font-bold text-zinc-200 tracking-tight",
                      children: "todotext"
                    })
                  ]
                }),
                c.jsx("button", {
                  onClick: s,
                  className: "p-2 text-zinc-500 hover:text-white hover:bg-zinc-800/50 rounded-full transition-all",
                  children: c.jsx("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    children: c.jsx("path", {
                      d: "M18 6L6 18M6 6l12 12",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    })
                  })
                })
              ]
            }),
            c.jsxs("nav", {
              className: "space-y-1 mb-6",
              children: [
                c.jsxs("button", {
                  onClick: () => {
                    t({
                      type: "inbox"
                    }), s && s();
                  },
                  className: M(e.type === "inbox"),
                  children: [
                    c.jsx(cp, {
                      className: `w-4 h-4 ${e.type === "inbox" ? "text-blue-500" : "text-zinc-500"}`
                    }),
                    "Inbox"
                  ]
                }),
                c.jsxs("button", {
                  onClick: () => {
                    t({
                      type: "today"
                    }), s && s();
                  },
                  className: M(e.type === "today"),
                  children: [
                    c.jsx(sp, {
                      className: `w-4 h-4 ${e.type === "today" ? "text-green-500" : "text-zinc-500"}`
                    }),
                    "Today"
                  ]
                }),
                c.jsxs("button", {
                  onClick: () => {
                    t({
                      type: "upcoming"
                    }), s && s();
                  },
                  className: M(e.type === "upcoming"),
                  children: [
                    c.jsx(up, {
                      className: `w-4 h-4 ${e.type === "upcoming" ? "text-purple-500" : "text-zinc-500"}`
                    }),
                    "Upcoming"
                  ]
                }),
                c.jsxs("button", {
                  onClick: () => {
                    t({
                      type: "overdue"
                    }), s && s();
                  },
                  className: M(e.type === "overdue"),
                  children: [
                    c.jsx(op, {
                      className: `w-4 h-4 ${e.type === "overdue" ? "text-red-500" : "text-zinc-500"}`
                    }),
                    "Overdue"
                  ]
                })
              ]
            }),
            c.jsx(k, {
              label: "Views",
              expanded: y,
              onToggle: () => w(!y)
            }),
            y && c.jsxs("div", {
              className: "space-y-0.5 animate-in slide-in-from-top-1 fade-in duration-200",
              children: [
                c.jsxs("button", {
                  onClick: () => t({
                    type: "view",
                    value: "all"
                  }),
                  className: M(E("view", "all")),
                  children: [
                    c.jsx(fp, {
                      className: "w-4 h-4 text-zinc-500"
                    }),
                    "All Tasks"
                  ]
                }),
                c.jsxs("button", {
                  onClick: () => t({
                    type: "view",
                    value: "open"
                  }),
                  className: M(E("view", "open")),
                  children: [
                    c.jsx("div", {
                      className: "w-4 h-4 rounded-full border-2 border-zinc-600 border-dashed"
                    }),
                    "Open"
                  ]
                }),
                c.jsxs("button", {
                  onClick: () => t({
                    type: "view",
                    value: "done"
                  }),
                  className: M(E("view", "done")),
                  children: [
                    c.jsx("div", {
                      className: "w-4 h-4 flex items-center justify-center",
                      children: c.jsx("svg", {
                        className: "w-3 h-3 text-zinc-500",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "3",
                        children: c.jsx("polyline", {
                          points: "20 6 9 17 4 12"
                        })
                      })
                    }),
                    "Completed"
                  ]
                })
              ]
            }),
            c.jsx(k, {
              label: "Filters",
              expanded: b,
              onToggle: () => N(!b)
            }),
            b && c.jsxs("div", {
              className: "space-y-0.5 animate-in slide-in-from-top-1 fade-in duration-200",
              children: [
                c.jsxs("button", {
                  onClick: () => t({
                    type: "filter",
                    value: "no-time"
                  }),
                  className: M(E("filter", "no-time")),
                  children: [
                    c.jsx("span", {
                      className: "w-4 flex justify-center text-[10px] font-mono text-zinc-500",
                      children: "\u{1F6AB}"
                    }),
                    "No Due Date"
                  ]
                }),
                c.jsxs("button", {
                  onClick: () => t({
                    type: "filter",
                    value: "no-project"
                  }),
                  className: M(E("filter", "no-project")),
                  children: [
                    c.jsx("span", {
                      className: "w-4 flex justify-center text-[10px] font-mono text-zinc-500",
                      children: "\u{1F4C2}"
                    }),
                    "No Project"
                  ]
                })
              ]
            }),
            c.jsx(k, {
              label: "Projects",
              expanded: f,
              onToggle: () => r(!f)
            }),
            f && c.jsxs("div", {
              className: "space-y-0.5 animate-in slide-in-from-top-1 fade-in duration-200",
              children: [
                l.length === 0 && c.jsx("div", {
                  className: "px-3 py-2 text-xs text-zinc-600 italic",
                  children: "No projects yet"
                }),
                l.map((U) => c.jsxs("button", {
                  onClick: () => {
                    t({
                      type: "project",
                      value: U
                    }), s && s();
                  },
                  className: M(e.type === "project" && e.value === U),
                  children: [
                    c.jsx("span", {
                      className: `w-2 h-2 rounded-full ${e.type === "project" && e.value === U ? "bg-purple-500" : "bg-zinc-700"}`
                    }),
                    U
                  ]
                }, U))
              ]
            }),
            c.jsx(k, {
              label: "Contexts",
              expanded: h,
              onToggle: () => v(!h)
            }),
            h && c.jsxs("div", {
              className: "space-y-0.5 animate-in slide-in-from-top-1 fade-in duration-200",
              children: [
                n.length === 0 && c.jsx("div", {
                  className: "px-3 py-2 text-xs text-zinc-600 italic",
                  children: "No contexts yet"
                }),
                n.map((U) => c.jsxs("button", {
                  onClick: () => {
                    t({
                      type: "context",
                      value: U
                    }), s && s();
                  },
                  className: M(e.type === "context" && e.value === U),
                  children: [
                    c.jsx("span", {
                      className: "text-zinc-500 text-xs font-mono",
                      children: "@"
                    }),
                    U
                  ]
                }, U))
              ]
            }),
            c.jsx(k, {
              label: "Tags",
              expanded: T,
              onToggle: () => L(!T)
            }),
            T && c.jsxs("div", {
              className: "space-y-0.5 animate-in slide-in-from-top-1 fade-in duration-200",
              children: [
                a.length === 0 && c.jsx("div", {
                  className: "px-3 py-2 text-xs text-zinc-600 italic",
                  children: "No tags yet"
                }),
                a.map((U) => c.jsxs("button", {
                  onClick: () => {
                    t({
                      type: "tag",
                      value: U
                    }), s && s();
                  },
                  className: M(e.type === "tag" && e.value === U),
                  children: [
                    c.jsx("span", {
                      className: "text-zinc-500 text-xs font-mono",
                      children: "#"
                    }),
                    U
                  ]
                }, U))
              ]
            }),
            c.jsx("div", {
              className: "mt-auto px-1 pb-4 pt-6",
              children: c.jsxs("div", {
                className: "space-y-1 pt-4 border-t border-zinc-800/50",
                children: [
                  c.jsxs("button", {
                    onClick: () => {
                      A && A("faq"), s && s();
                    },
                    className: "w-full text-xs text-left px-3 py-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors flex items-center gap-2 group",
                    children: [
                      c.jsx("span", {
                        className: "w-4 h-4 flex items-center justify-center bg-zinc-900 rounded border border-zinc-800 group-hover:border-zinc-700 text-[10px]",
                        children: "?"
                      }),
                      "Help & FAQ"
                    ]
                  }),
                  c.jsx("a", {
                    href: "/impressum.html",
                    className: "block w-full text-xs text-left px-3 py-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 transition-colors",
                    children: "Impressum"
                  }),
                  c.jsx("a", {
                    href: "/datenschutz.html",
                    className: "block w-full text-xs text-left px-3 py-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 transition-colors",
                    children: "Datenschutz"
                  })
                ]
              })
            })
          ]
        })
      ]
    });
  }
  const hp = "/assets/todo_parser_bg-CeTPhQdy.wasm", mp = async (e = {}, t) => {
    let l;
    if (t.startsWith("data:")) {
      const n = t.replace(/^data:.*?base64,/, "");
      let a;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") a = Buffer.from(n, "base64");
      else if (typeof atob == "function") {
        const i = atob(n);
        a = new Uint8Array(i.length);
        for (let s = 0; s < i.length; s++) a[s] = i.charCodeAt(s);
      } else throw new Error("Cannot decode base64-encoded data URL");
      l = await WebAssembly.instantiate(a, e);
    } else {
      const n = await fetch(t), a = n.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && a.startsWith("application/wasm")) l = await WebAssembly.instantiateStreaming(n, e);
      else {
        const i = await n.arrayBuffer();
        l = await WebAssembly.instantiate(i, e);
      }
    }
    return l.instance.exports;
  };
  let ye;
  function xp(e) {
    ye = e;
  }
  function pp(e) {
    const t = ye.__externref_table_alloc();
    return ye.__wbindgen_externrefs.set(t, e), t;
  }
  function lu(e) {
    const t = typeof e;
    if (t == "number" || t == "boolean" || e == null) return `${e}`;
    if (t == "string") return `"${e}"`;
    if (t == "symbol") {
      const a = e.description;
      return a == null ? "Symbol" : `Symbol(${a})`;
    }
    if (t == "function") {
      const a = e.name;
      return typeof a == "string" && a.length > 0 ? `Function(${a})` : "Function";
    }
    if (Array.isArray(e)) {
      const a = e.length;
      let i = "[";
      a > 0 && (i += lu(e[0]));
      for (let s = 1; s < a; s++) i += ", " + lu(e[s]);
      return i += "]", i;
    }
    const l = /\[object ([^\]]+)\]/.exec(toString.call(e));
    let n;
    if (l && l.length > 1) n = l[1];
    else return toString.call(e);
    if (n == "Object") try {
      return "Object(" + JSON.stringify(e) + ")";
    } catch {
      return "Object";
    }
    return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : n;
  }
  let Kl = null;
  function Sa() {
    return (Kl === null || Kl.buffer.detached === true || Kl.buffer.detached === void 0 && Kl.buffer !== ye.memory.buffer) && (Kl = new DataView(ye.memory.buffer)), Kl;
  }
  function ao(e, t) {
    return e = e >>> 0, bp(e, t);
  }
  let li = null;
  function yi() {
    return (li === null || li.byteLength === 0) && (li = new Uint8Array(ye.memory.buffer)), li;
  }
  function gp(e) {
    return e == null;
  }
  function as(e, t) {
    const l = t(e.length * 4, 4) >>> 0;
    for (let n = 0; n < e.length; n++) {
      const a = pp(e[n]);
      Sa().setUint32(l + 4 * n, a, true);
    }
    return zt = e.length, l;
  }
  function pc(e, t, l) {
    if (l === void 0) {
      const u = ua.encode(e), o = t(u.length, 1) >>> 0;
      return yi().subarray(o, o + u.length).set(u), zt = u.length, o;
    }
    let n = e.length, a = t(n, 1) >>> 0;
    const i = yi();
    let s = 0;
    for (; s < n; s++) {
      const u = e.charCodeAt(s);
      if (u > 127) break;
      i[a + s] = u;
    }
    if (s !== n) {
      s !== 0 && (e = e.slice(s)), a = l(a, n, n = s + e.length * 3, 1) >>> 0;
      const u = yi().subarray(a + s, a + n), o = ua.encodeInto(e, u);
      s += o.written, a = l(a, n, s, 1) >>> 0;
    }
    return zt = s, a;
  }
  let zi = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  zi.decode();
  const vp = 2146435072;
  let is = 0;
  function bp(e, t) {
    return is += t, is >= vp && (zi = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), zi.decode(), is = t), zi.decode(yi().subarray(e, e + t));
  }
  const ua = new TextEncoder();
  "encodeInto" in ua || (ua.encodeInto = function(e, t) {
    const l = ua.encode(e);
    return t.set(l), {
      read: e.length,
      written: l.length
    };
  });
  let zt = 0;
  function yp(e, t, l, n, a) {
    const i = pc(e, ye.__wbindgen_malloc, ye.__wbindgen_realloc), s = zt, u = as(l, ye.__wbindgen_malloc), o = zt, d = as(n, ye.__wbindgen_malloc), g = zt, p = as(a, ye.__wbindgen_malloc), m = zt;
    return ye.get_completions(i, s, t, u, o, d, g, p, m);
  }
  function ni(e) {
    const t = pc(e, ye.__wbindgen_malloc, ye.__wbindgen_realloc), l = zt;
    return ye.parse_todo_line(t, l);
  }
  function zp(e, t) {
    return Error(ao(e, t));
  }
  function jp(e, t) {
    const l = lu(t), n = pc(l, ye.__wbindgen_malloc, ye.__wbindgen_realloc), a = zt;
    Sa().setInt32(e + 4 * 1, a, true), Sa().setInt32(e + 4 * 0, n, true);
  }
  function Sp(e) {
    return typeof e == "string";
  }
  function Np(e, t) {
    const l = t, n = typeof l == "string" ? l : void 0;
    var a = gp(n) ? 0 : pc(n, ye.__wbindgen_malloc, ye.__wbindgen_realloc), i = zt;
    Sa().setInt32(e + 4 * 1, i, true), Sa().setInt32(e + 4 * 0, a, true);
  }
  function _p(e, t) {
    throw new Error(ao(e, t));
  }
  function wp(e) {
    return e.getDate();
  }
  function Tp(e) {
    return e.getFullYear();
  }
  function Ap(e) {
    return e.getMonth();
  }
  function Dp(e) {
    return e.getTime();
  }
  function Ep(e) {
    return e.getTimezoneOffset();
  }
  function Mp() {
    return /* @__PURE__ */ new Date();
  }
  function Cp() {
    return new Object();
  }
  function Op() {
    return new Array();
  }
  function kp(e) {
    return new Date(e);
  }
  function Up() {
    return /* @__PURE__ */ new Map();
  }
  function Bp() {
    return Date.now();
  }
  function Lp() {
    return Math.random();
  }
  function Hp(e, t, l) {
    e[t] = l;
  }
  function Rp(e, t, l) {
    e[t >>> 0] = l;
  }
  function Gp(e, t, l) {
    return e.set(t, l);
  }
  function Yp(e, t) {
    return ao(e, t);
  }
  function qp(e) {
    return e;
  }
  function Qp() {
    const e = ye.__wbindgen_externrefs, t = e.grow(4);
    e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, true), e.set(t + 3, false);
  }
  URL = globalThis.URL;
  const Zt = await mp({
    "./todo_parser_bg.js": {
      __wbg_set_3f1d0b984ed272ed: Hp,
      __wbg_new_25f239778d6112b9: Op,
      __wbg_new_b546ae120718850e: Up,
      __wbg_new_1ba21ce319a06297: Cp,
      __wbg_set_7df433eea03a5c14: Rp,
      __wbg_set_efaaf145b9377369: Gp,
      __wbg_getDate_b8071ea9fc4f6838: wp,
      __wbg_getFullYear_6ac412e8eee86879: Tp,
      __wbg_getMonth_48a392071f9e5017: Ap,
      __wbg_getTime_ad1e9878a735af08: Dp,
      __wbg_getTimezoneOffset_45389e26d6f46823: Ep,
      __wbg_new_b2db8aa2650f793a: kp,
      __wbg_new_0_23cedd11d9b40c9d: Mp,
      __wbg_now_69d776cd24f5215b: Bp,
      __wbg_random_cc1f9237d866d212: Lp,
      __wbg___wbindgen_string_get_a2a31e16edf96e42: Np,
      __wbg___wbindgen_debug_string_adfb662ae34724b6: jp,
      __wbg_Error_52673b7de5a0ca89: zp,
      __wbg___wbindgen_is_string_704ef9c8fc131030: Sp,
      __wbg___wbindgen_throw_dd24417ed36fc46e: _p,
      __wbindgen_init_externref_table: Qp,
      __wbindgen_cast_2241b6af4c4b2941: Yp,
      __wbindgen_cast_d6cd19b81560fd6e: qp
    }
  }, hp), Xp = Zt.memory, Zp = Zt.parse_todo_line, Vp = Zt.get_completions, Kp = Zt.get_date_aliases, Jp = Zt.__wbindgen_malloc, $p = Zt.__wbindgen_realloc, Wp = Zt.__wbindgen_externrefs, Fp = Zt.__externref_table_alloc, Q0 = Zt.__wbindgen_start, Ip = Object.freeze(Object.defineProperty({
    __proto__: null,
    __externref_table_alloc: Fp,
    __wbindgen_externrefs: Wp,
    __wbindgen_malloc: Jp,
    __wbindgen_realloc: $p,
    __wbindgen_start: Q0,
    get_completions: Vp,
    get_date_aliases: Kp,
    memory: Xp,
    parse_todo_line: Zp
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  xp(Ip);
  Q0();
  const ie = {
    tasks: [],
    listeners: [],
    undoStack: [],
    redoStack: [],
    init() {
      this.loadFromPersistence();
    },
    subscribe(e) {
      return this.listeners.push(e), () => this.unsubscribe(e);
    },
    unsubscribe(e) {
      this.listeners = this.listeners.filter((t) => t !== e);
    },
    notify(e = "STORE") {
      this.listeners.forEach((t) => t(this.tasks, e));
    },
    loadFromString(e) {
      const t = e.split(`
`);
      this.tasks = [], t.forEach((l) => {
        if (!l.trim()) return;
        const n = ni(l);
        n && this.tasks.push(n);
      }), this.saveToPersistence(), this.notify("CLOUD");
    },
    loadFromLocalStorage() {
      try {
        const e = localStorage.getItem("todoTxtTasks");
        if (e) {
          const t = JSON.parse(e);
          Array.isArray(t) && (this.tasks = t), this.notify("LOCAL_STORAGE");
        }
      } catch (e) {
        console.error("Failed to load tasks:", e);
      }
    },
    saveToLocalStorage() {
      try {
        localStorage.setItem("todoTxtTasks", JSON.stringify(this.tasks));
      } catch (e) {
        console.error("Failed to save tasks:", e);
      }
    },
    loadFromPersistence() {
      this.loadFromLocalStorage();
    },
    saveToPersistence() {
      this.saveToLocalStorage(), this.lastModificationTime = Date.now();
    },
    lastModificationTime: Date.now(),
    saveUndoState() {
      this.undoStack.length > 50 && this.undoStack.shift(), this.undoStack.push(JSON.parse(JSON.stringify(this.tasks))), this.redoStack = [];
    },
    undo() {
      this.undoStack.length !== 0 && (this.redoStack.push(JSON.parse(JSON.stringify(this.tasks))), this.tasks = this.undoStack.pop(), this.saveToPersistence(), this.notify("UNDO"));
    },
    redo() {
      this.redoStack.length !== 0 && (this.undoStack.push(JSON.parse(JSON.stringify(this.tasks))), this.tasks = this.redoStack.pop(), this.saveToPersistence(), this.notify("REDO"));
    },
    getCanUndo() {
      return this.undoStack.length > 0;
    },
    getCanRedo() {
      return this.redoStack.length > 0;
    },
    addTask(e) {
      const t = ni(e);
      !t || !t.text.trim() || (this.saveUndoState(), this.tasks.push(t), this.saveToPersistence(), this.notify("ADD_TASK"));
    },
    updateTask(e, t) {
      const l = this.tasks.findIndex((n) => n.id === e);
      if (l !== -1) {
        this.saveUndoState();
        const n = ni(t);
        n.id = e, this.tasks[l].creationDate && !n.creationDate && (n.creationDate = this.tasks[l].creationDate), this.tasks[l] = n, this.saveToPersistence(), this.notify("UPDATE_TASK");
      }
    },
    replaceAllTasks(e, t = true) {
      this.tasks = e, this.saveToPersistence(), t && this.notify("REPLACE_ALL");
    },
    deleteTask(e) {
      this.saveUndoState(), this.tasks = this.tasks.filter((t) => t.id !== e), this.saveToPersistence(), this.notify();
    },
    deleteTasks(e) {
      if (!e || e.length === 0) return;
      const t = new Set(e);
      this.saveUndoState(), this.tasks = this.tasks.filter((l) => !t.has(l.id)), this.saveToPersistence(), this.notify("BULK_DELETE");
    },
    clearAllTasks() {
      this.saveUndoState(), this.tasks = [], this.saveToPersistence(), this.notify();
    },
    setTaskPriority(e, t) {
      const l = this.tasks.findIndex((s) => s.id === e);
      if (l === -1) return;
      const n = this.tasks[l];
      this.saveUndoState();
      let a = n.raw;
      a = a.replace(/^\([A-Z]\)\s/, ""), t && (a = `(${t}) ${a}`);
      const i = ni(a);
      i && (i.id = e, n.creationDate && !i.creationDate && (i.creationDate = n.creationDate), n.completionDate && !i.completionDate && (i.completionDate = n.completionDate), i.completed = n.completed, this.tasks[l] = i, this.saveToPersistence(), this.notify());
    },
    toggleTask(e) {
      const t = this.tasks.find((a) => a.id === e);
      if (!t) return;
      this.saveUndoState(), t.completed = !t.completed;
      const l = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      let n = t.raw;
      n = n.replace(/^x\s\d{4}-\d{2}-\d{2}\s/, "").trim(), t.completed ? (t.completionDate = l, n = `x ${l} ${n}`) : t.completionDate = null, t.raw = n, this.saveToPersistence(), this.notify("TOGGLE_TASK");
    },
    getTasks() {
      return this.tasks;
    }
  };
  function Pp({ task: e, selected: t, onSelect: l, isFocused: n, onTaskFocus: a, onEdit: i, onFilterClick: s }) {
    const u = (p) => {
      p.stopPropagation(), ie.toggleTask(e.id);
    }, o = (p) => {
      p.preventDefault(), p.stopPropagation();
      const m = Array.from({
        length: 26
      }, (r, h) => String.fromCharCode(65 + h));
      m.push(null);
      const x = e.priority || null;
      let j = 0;
      x ? j = (m.indexOf(x) + 1) % m.length : j = 0;
      const z = m[j];
      let A = e.raw;
      const f = /^\([A-Z]\)\s/.test(A);
      z ? f ? A = A.replace(/^\([A-Z]\)\s/, `(${z}) `) : A = `(${z}) ` + A : f && (A = A.replace(/^\([A-Z]\)\s/, "")), ie.updateTask(e.id, A);
    }, d = {
      A: "text-red-400",
      B: "text-amber-400",
      C: "text-sky-400"
    }[e.priority] || "text-gray-400", g = (p) => p.split(/(\+[a-zA-Z0-9äöüÄÖÜß._-]+|@[a-zA-Z0-9äöüÄÖÜß._-]+|#[a-zA-Z0-9äöüÄÖÜß._-]+|due:(?:\d{4}-\d{2}-\d{2}|\d{1,2}\.\d{1,2}\.\d{2,4})|tel:[+0-9]+|mail:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|contact:[a-zA-Z0-9äöüÄÖÜß._-]+)/g).map((x, j) => {
      if (x.startsWith("+")) return c.jsx("span", {
        onClick: (z) => {
          z.stopPropagation(), s && s("project", x.substring(1));
        },
        className: "text-cyan-400 hover:underline cursor-pointer",
        children: x
      }, j);
      if (x.startsWith("@")) return c.jsx("span", {
        onClick: (z) => {
          z.stopPropagation(), s && s("context", x.substring(1));
        },
        className: "text-emerald-400 hover:underline cursor-pointer",
        children: x
      }, j);
      if (x.startsWith("#")) return c.jsx("span", {
        onClick: (z) => {
          z.stopPropagation(), s && s("tag", x.substring(1));
        },
        className: "text-purple-400 hover:underline cursor-pointer",
        children: x
      }, j);
      if (x.startsWith("due:")) {
        const z = x.substring(4);
        return c.jsx("span", {
          onClick: (A) => {
            A.stopPropagation(), s && s("date", z);
          },
          className: "text-red-400 hover:underline cursor-pointer",
          children: x
        }, j);
      }
      if (x.startsWith("tel:")) return c.jsxs("a", {
        href: x,
        onClick: (z) => z.stopPropagation(),
        className: "text-lime-400 hover:underline inline-flex items-center gap-1",
        title: "Call",
        children: [
          c.jsx("span", {
            className: "opacity-50",
            children: "\u{1F4DE}"
          }),
          x.substring(4)
        ]
      }, j);
      if (x.startsWith("mail:")) {
        const z = x.substring(5);
        return c.jsxs("a", {
          href: `mailto:${z}`,
          onClick: (A) => A.stopPropagation(),
          className: "text-orange-400 hover:underline inline-flex items-center gap-1",
          title: "Send Email",
          children: [
            c.jsx("span", {
              className: "opacity-50",
              children: "\u2709\uFE0F"
            }),
            z
          ]
        }, j);
      }
      return x.startsWith("contact:") ? c.jsxs("span", {
        className: "text-indigo-400 font-medium inline-flex items-center gap-1",
        children: [
          c.jsx("span", {
            className: "opacity-50",
            children: "\u{1F464}"
          }),
          " ",
          x.substring(8).replace(/_/g, " ")
        ]
      }, j) : x;
    });
    return c.jsxs("div", {
      className: `group flex items-center py-2 -mx-4 px-4 transition-colors cursor-pointer border-b border-zinc-800/30
                ${t ? "bg-blue-900/10" : ""} 
                ${n ? "bg-zinc-800/50 ring-1 ring-zinc-700/50" : "hover:bg-zinc-900/30"}`,
      "data-id": e.id,
      onMouseEnter: () => a && a(e.id),
      onClick: (p) => {
        i && i(e), a && a(e.id);
      },
      onContextMenu: o,
      children: [
        c.jsx("div", {
          className: `mr-3 flex-shrink-0 transition-opacity ${t || n ? "opacity-100" : "opacity-0"}`,
          onClick: (p) => p.stopPropagation(),
          children: c.jsx("input", {
            type: "checkbox",
            checked: t || false,
            onChange: () => {
            },
            onClick: (p) => {
              p.stopPropagation(), l && l(p);
            },
            className: "w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500 cursor-pointer"
          })
        }),
        c.jsx("button", {
          onClick: u,
          className: `mr-3 w-5 h-5 rounded-full border border-zinc-500 hover:border-zinc-300 flex items-center justify-center text-transparent hover:text-zinc-500 transition-all ${e.completed ? "!bg-zinc-500 !border-zinc-500 text-white !text-white" : ""}`,
          children: e.completed ? "\u2713" : ""
        }),
        c.jsx("div", {
          className: "flex-1 min-w-0",
          onClick: () => n && i && i(e),
          onDoubleClick: () => i && i(e),
          children: c.jsxs("div", {
            className: `text-sm text-zinc-200 ${e.completed ? "line-through text-zinc-500" : ""}`,
            children: [
              e.priority && c.jsxs("span", {
                className: `text-xs font-bold mr-1 hover:underline cursor-pointer ${d}`,
                onClick: (p) => {
                  p.stopPropagation(), s && s("priority", e.priority);
                },
                children: [
                  "(",
                  e.priority,
                  ")"
                ]
              }),
              g(e.text)
            ]
          })
        }),
        c.jsxs("div", {
          className: `flex items-center gap-1 ml-2 transition-opacity ${n || "group-hover:opacity-100"} opacity-0 sm:opacity-0`,
          children: [
            c.jsx("button", {
              onClick: (p) => {
                p.stopPropagation(), i && i(e);
              },
              className: "p-2 text-zinc-500 hover:text-blue-400 transition-colors",
              title: "Edit task",
              children: c.jsx("svg", {
                className: "w-4 h-4",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: c.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                })
              })
            }),
            c.jsx("button", {
              onClick: (p) => {
                p.stopPropagation(), ie.deleteTask(e.id);
              },
              className: "p-2 text-zinc-500 hover:text-red-500 transition-colors",
              title: "Delete task",
              children: "\u2715"
            })
          ]
        })
      ]
    });
  }
  function eg({ tasks: e, activeFilter: t, selectedTaskIds: l, onTaskSelect: n, onSelectAll: a, focusedTaskId: i, onTaskFocus: s, editingTaskId: u, onEditEnd: o, onFilterClick: d, projects: g, contexts: p, tags: m, onOpenCalendar: x }) {
    const j = e.length > 0 && e.every((r) => l == null ? void 0 : l.has(r.id)), A = e.some((r) => l == null ? void 0 : l.has(r.id)) && !j, f = C.useRef(null);
    return C.useEffect(() => {
      f.current && (f.current.indeterminate = A);
    }, [
      A
    ]), c.jsxs("div", {
      className: "pb-20",
      children: [
        c.jsxs("div", {
          className: "mb-1",
          children: [
            e.length > 0 && c.jsxs("div", {
              className: "flex items-center py-2 -mx-4 px-4 border-b border-zinc-800/50 mb-1 group",
              children: [
                c.jsx("div", {
                  className: "mr-3 flex-shrink-0",
                  onClick: (r) => r.stopPropagation(),
                  children: c.jsx("input", {
                    ref: f,
                    type: "checkbox",
                    checked: j,
                    onChange: a,
                    className: "w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500 cursor-pointer",
                    title: "Select All Visible"
                  })
                }),
                c.jsx("div", {
                  className: "text-xs text-zinc-500 font-medium uppercase tracking-wider select-none cursor-pointer",
                  onClick: a,
                  children: j ? "Select None" : A ? "Select all" : "Select All"
                })
              ]
            }),
            e.map((r) => c.jsx(Pp, {
              task: r,
              selected: l == null ? void 0 : l.has(r.id),
              onSelect: (h) => n && n(r.id, h),
              selectionMode: l && l.size > 0,
              isFocused: i === r.id,
              onTaskFocus: s,
              isEditingProp: u === r.id,
              onEditEnd: o,
              onFilterClick: d,
              projects: g,
              contexts: p,
              tags: m,
              onOpenCalendar: x
            }, r.id))
          ]
        }),
        e.length === 0 && c.jsx("div", {
          className: "py-8 w-full",
          children: c.jsxs("div", {
            className: "space-y-12 w-full",
            children: [
              c.jsxs("div", {
                className: "relative w-full px-4 mb-12",
                children: [
                  c.jsx("h3", {
                    className: "text-zinc-500 font-medium text-xs uppercase tracking-wider mb-8 text-center",
                    children: "Anatomy of a Task"
                  }),
                  c.jsxs("div", {
                    className: "flex flex-wrap gap-2 sm:gap-3 justify-center items-start",
                    children: [
                      c.jsxs("div", {
                        className: "flex flex-col items-center gap-2 group",
                        children: [
                          c.jsx("span", {
                            className: "bg-zinc-800/80 border border-zinc-700/50 text-zinc-500 px-1.5 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-zinc-300 transition-colors cursor-help",
                            children: "x"
                          }),
                          c.jsx("span", {
                            className: "text-[10px] text-zinc-600 uppercase tracking-wide",
                            children: "Done"
                          })
                        ]
                      }),
                      c.jsxs("div", {
                        className: "flex flex-col items-center gap-2 group",
                        children: [
                          c.jsx("span", {
                            className: "bg-zinc-800/80 border border-zinc-700/50 text-amber-500 px-1.5 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-amber-400 transition-colors cursor-help",
                            children: "(A)"
                          }),
                          c.jsx("span", {
                            className: "text-[10px] text-zinc-600 uppercase tracking-wide",
                            children: "Priority"
                          })
                        ]
                      }),
                      c.jsxs("div", {
                        className: "flex flex-col items-center gap-2 group",
                        children: [
                          c.jsx("span", {
                            className: "bg-zinc-800/80 border border-zinc-700/50 text-zinc-400 px-1.5 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-zinc-200 transition-colors cursor-help",
                            children: "2025-12-30"
                          }),
                          c.jsx("span", {
                            className: "text-[10px] text-zinc-600 uppercase tracking-wide",
                            children: "Created"
                          })
                        ]
                      }),
                      c.jsxs("div", {
                        className: "flex flex-col items-center gap-2 group",
                        children: [
                          c.jsx("span", {
                            className: "bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 px-2 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-zinc-100 transition-colors w-full text-center",
                            children: "call mum"
                          }),
                          c.jsx("span", {
                            className: "text-[10px] text-zinc-600 uppercase tracking-wide",
                            children: "Description"
                          })
                        ]
                      }),
                      c.jsxs("div", {
                        className: "flex flex-col items-center gap-2 group",
                        children: [
                          c.jsx("span", {
                            className: "bg-zinc-800/80 border border-zinc-700/50 text-cyan-500 px-1.5 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-cyan-400 transition-colors cursor-pointer",
                            children: "+Home"
                          }),
                          c.jsx("span", {
                            className: "text-[10px] text-zinc-600 uppercase tracking-wide",
                            children: "Project"
                          })
                        ]
                      }),
                      c.jsxs("div", {
                        className: "flex flex-col items-center gap-2 group",
                        children: [
                          c.jsx("span", {
                            className: "bg-zinc-800/80 border border-zinc-700/50 text-emerald-500 px-1.5 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-emerald-400 transition-colors cursor-pointer",
                            children: "@Phone"
                          }),
                          c.jsx("span", {
                            className: "text-[10px] text-zinc-600 uppercase tracking-wide",
                            children: "Context"
                          })
                        ]
                      }),
                      c.jsxs("div", {
                        className: "flex flex-col items-center gap-2 group",
                        children: [
                          c.jsx("span", {
                            className: "bg-zinc-800/80 border border-zinc-700/50 text-purple-500 px-1.5 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-purple-400 transition-colors cursor-pointer",
                            children: "#urgent"
                          }),
                          c.jsx("span", {
                            className: "text-[10px] text-zinc-600 uppercase tracking-wide",
                            children: "Hashtag"
                          })
                        ]
                      }),
                      c.jsxs("div", {
                        className: "flex flex-col items-center gap-2 group",
                        children: [
                          c.jsx("span", {
                            className: "bg-zinc-800/80 border border-zinc-700/50 text-red-500 px-1.5 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-red-400 transition-colors cursor-pointer",
                            children: "due:2025-12-31"
                          }),
                          c.jsx("span", {
                            className: "text-[10px] text-zinc-600 uppercase tracking-wide",
                            children: "Due Date"
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              c.jsxs("div", {
                className: "space-y-5",
                children: [
                  c.jsxs("h3", {
                    className: "text-zinc-500 font-medium text-xs uppercase tracking-wider flex items-center gap-2",
                    children: [
                      c.jsx("svg", {
                        className: "w-4 h-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: c.jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        })
                      }),
                      "Keyboard Shortcuts"
                    ]
                  }),
                  c.jsxs("div", {
                    className: "grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm text-zinc-400 items-baseline",
                    children: [
                      c.jsx("span", {
                        className: "justify-self-start",
                        children: c.jsx("kbd", {
                          className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]",
                          children: "/"
                        })
                      }),
                      c.jsx("span", {
                        children: "Focus search / New Task"
                      }),
                      c.jsxs("span", {
                        className: "justify-self-start text-nowrap",
                        children: [
                          c.jsx("kbd", {
                            className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]",
                            children: "\u2191"
                          }),
                          " ",
                          c.jsx("span", {
                            className: "text-zinc-600 text-[10px] px-0.5",
                            children: "/"
                          }),
                          " ",
                          c.jsx("kbd", {
                            className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]",
                            children: "\u2193"
                          })
                        ]
                      }),
                      c.jsx("span", {
                        children: "Navigate tasks"
                      }),
                      c.jsxs("span", {
                        className: "justify-self-start text-nowrap",
                        children: [
                          c.jsx("kbd", {
                            className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]",
                            children: "\u2190"
                          }),
                          " ",
                          c.jsx("span", {
                            className: "text-zinc-600 text-[10px] px-0.5",
                            children: "/"
                          }),
                          " ",
                          c.jsx("kbd", {
                            className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]",
                            children: "\u2192"
                          })
                        ]
                      }),
                      c.jsx("span", {
                        children: "Change priority"
                      }),
                      c.jsx("span", {
                        className: "justify-self-start text-nowrap",
                        children: c.jsx("kbd", {
                          className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]",
                          children: "x"
                        })
                      }),
                      c.jsx("span", {
                        children: "Complete task"
                      }),
                      c.jsx("span", {
                        className: "justify-self-start text-nowrap",
                        children: c.jsx("kbd", {
                          className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]",
                          children: "e"
                        })
                      }),
                      c.jsx("span", {
                        children: "Edit task"
                      }),
                      c.jsxs("span", {
                        className: "justify-self-start text-nowrap",
                        children: [
                          c.jsx("kbd", {
                            className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]",
                            children: "\u2318"
                          }),
                          " ",
                          c.jsx("span", {
                            className: "text-zinc-600 text-[10px] px-0.5",
                            children: "+"
                          }),
                          " ",
                          c.jsx("kbd", {
                            className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]",
                            children: "z"
                          })
                        ]
                      }),
                      c.jsx("span", {
                        children: "Undo action"
                      })
                    ]
                  })
                ]
              }),
              c.jsx("div", {
                className: "pt-8 border-t border-zinc-800/50",
                children: c.jsxs("div", {
                  className: "flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs text-zinc-500",
                  children: [
                    c.jsxs("span", {
                      className: "flex items-center gap-2",
                      children: [
                        c.jsx("svg", {
                          className: "w-3.5 h-3.5",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          children: c.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                          })
                        }),
                        " Google Drive & Dropbox Sync"
                      ]
                    }),
                    c.jsxs("span", {
                      className: "flex items-center gap-2",
                      children: [
                        c.jsx("svg", {
                          className: "w-3.5 h-3.5",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          children: c.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
                          })
                        }),
                        " Offline-first"
                      ]
                    })
                  ]
                })
              })
            ]
          })
        })
      ]
    });
  }
  function tg({ selectedCount: e, onDeselectAll: t, onCompleteAll: l, onDeleteAll: n, onSetPriority: a, onSetDate: i, onBulkAdd: s }) {
    const [u, o] = C.useState(false), [d, g] = C.useState(false), [p, m] = C.useState("");
    if (e === 0) return null;
    const x = (j) => {
      j.preventDefault(), p.trim() && (s(p.trim()), m(""), g(false));
    };
    return c.jsx("div", {
      className: "w-full bg-zinc-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 py-1 px-4 flex items-center justify-between animate-in slide-in-from-top-2 duration-200",
      children: d ? c.jsxs("form", {
        onSubmit: x,
        className: "flex-1 flex items-center gap-2",
        children: [
          c.jsx("input", {
            type: "text",
            value: p,
            onChange: (j) => m(j.target.value),
            placeholder: "Add +project / @context / #tag or remove -+project / -@context / -#tag",
            className: "flex-1 bg-zinc-100 dark:bg-zinc-900 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400",
            autoFocus: true,
            onKeyDown: (j) => {
              j.key === "Escape" && (g(false), m(""));
            }
          }),
          c.jsx("button", {
            type: "submit",
            className: "p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium",
            children: "Add"
          }),
          c.jsx("button", {
            type: "button",
            onClick: () => g(false),
            className: "p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
            children: "\u2715"
          })
        ]
      }) : c.jsxs(c.Fragment, {
        children: [
          c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              c.jsxs("span", {
                className: "font-semibold text-sm text-gray-700 dark:text-gray-300",
                children: [
                  e,
                  " selected"
                ]
              }),
              c.jsx("button", {
                onClick: t,
                className: "p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                title: "Cancel Selection",
                children: c.jsx("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: c.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M6 18L18 6M6 6l12 12"
                  })
                })
              })
            ]
          }),
          c.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              c.jsx("button", {
                onClick: () => g(true),
                className: "p-2 text-zinc-500 hover:text-purple-500 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-600",
                title: "Add Project, Context, or Tag",
                children: c.jsx("span", {
                  className: "font-bold text-lg leading-none",
                  children: "+"
                })
              }),
              c.jsx("div", {
                className: "w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1"
              }),
              c.jsxs("div", {
                className: "relative",
                children: [
                  c.jsx("button", {
                    onClick: () => o(!u),
                    className: "p-2 text-zinc-500 hover:text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-600",
                    title: "Set Priority",
                    children: c.jsx("svg", {
                      className: "w-5 h-5",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      children: c.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      })
                    })
                  }),
                  u && c.jsxs("div", {
                    className: "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-xl p-1 flex flex-col gap-1 min-w-[40px]",
                    children: [
                      [
                        "A",
                        "B",
                        "C"
                      ].map((j) => c.jsx("button", {
                        onClick: () => {
                          a(j), o(false);
                        },
                        className: "px-3 py-1.5 text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-amber-500",
                        children: j
                      }, j)),
                      c.jsx("div", {
                        className: "h-px bg-zinc-200 dark:bg-zinc-700 my-0.5"
                      }),
                      c.jsx("button", {
                        onClick: () => {
                          a(null), o(false);
                        },
                        className: "px-3 py-1.5 text-xs text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded",
                        children: "None"
                      })
                    ]
                  })
                ]
              }),
              c.jsx("button", {
                onClick: i,
                className: "p-2 text-zinc-500 hover:text-blue-500 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-600",
                title: "Set Due Date",
                children: c.jsx("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: c.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  })
                })
              }),
              c.jsx("div", {
                className: "w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1"
              }),
              c.jsx("button", {
                onClick: l,
                className: "p-2 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md transition-colors",
                title: "Complete Selected",
                children: c.jsx("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: c.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                })
              }),
              c.jsx("button", {
                onClick: n,
                className: "px-3 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors",
                title: "Delete Selected",
                children: c.jsx("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: c.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  })
                })
              })
            ]
          })
        ]
      })
    });
  }
  function lg({ searchValue: e, onSearch: t, onQuickAdd: l, onMenuClick: n, onSettingsClick: a, focusTrigger: i, activeFilter: s, onClearFilter: u, projects: o, contexts: d, tags: g, onOpenCalendar: p }) {
    const m = C.useRef(null), [x, j] = C.useState([]), [z, A] = C.useState(false), [f, r] = C.useState(0), h = C.useRef(0);
    C.useEffect(() => {
      if (i > 0 && m.current) {
        m.current.focus();
        const y = m.current.value.length;
        m.current.setSelectionRange(y, y);
      }
    }, [
      i
    ]), C.useEffect(() => {
      m.current && (m.current.style.height = "auto", e !== "" && (m.current.style.height = m.current.scrollHeight + "px"));
    }, [
      e
    ]);
    const v = (y) => {
      const w = y.target.value, b = y.target.selectionStart;
      h.current = b, t(w);
      try {
        const N = yp(w, b, o || [], d || [], g || []);
        if (N && N.length > 0) {
          const E = N.map((M) => ({
            id: M.id,
            name: M.display,
            value: M.value,
            type: M.category
          }));
          j(E), A(true), r(0);
        } else A(false), r(0);
      } catch (N) {
        console.error("Autocomplete error:", N), A(false);
      }
    }, T = (y, w = null) => {
      if (!m.current) return;
      const b = m.current.value, N = h.current;
      let k = b.substring(0, N).lastIndexOf(" ") + 1;
      const V = b.substring(N).indexOf(" "), D = V === -1 ? b.length : N + V, B = b.substring(k, D);
      let O = false;
      w && !B.toLowerCase().startsWith("due:") && B.trim().length > 0 && (k = D, O = true);
      const Q = b.substring(0, k), $ = b.substring(D);
      let Oe = "";
      y.type === "date" ? Oe = `due:${w || y.value}` : y.type === "project" ? Oe = `+${y.value}` : y.type === "context" ? Oe = `@${y.value}` : y.type === "tag" ? Oe = `#${y.value}` : Oe = y.value, O && !Q.endsWith(" ") && (Oe = " " + Oe);
      const dt = Q + Oe + $;
      t(dt), m.current.value = dt;
      const Xe = Q.length + Oe.length;
      m.current.focus(), m.current.setSelectionRange(Xe, Xe), A(false), r(0);
    }, L = typeof window < "u" && window.matchMedia("(pointer: coarse)").matches;
    return c.jsxs("div", {
      className: "relative",
      children: [
        z && x.length > 0 && c.jsxs("div", {
          className: "absolute top-full left-0 mt-2 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl z-50 max-h-48 overflow-y-auto",
          children: [
            c.jsx("div", {
              className: "px-3 py-2 text-xs font-semibold text-zinc-500 border-b border-zinc-800",
              children: "Suggestions"
            }),
            x.map((y, w) => c.jsxs("div", {
              className: `px-3 py-2 cursor-pointer flex items-center gap-3 ${w === f ? "bg-zinc-800" : "hover:bg-zinc-800"}`,
              onClick: () => T(y),
              children: [
                c.jsx("div", {
                  className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold 
                                ${y.type === "date" ? "text-red-400 bg-red-500/20" : y.type === "project" ? "text-cyan-400 bg-cyan-500/20" : y.type === "context" ? "text-emerald-400 bg-emerald-500/20" : "text-purple-400 bg-purple-500/20"}`,
                  children: y.type === "date" ? "\u{1F4C5}" : y.type === "project" ? "+" : y.type === "context" ? "@" : "#"
                }),
                c.jsx("div", {
                  className: "flex-1",
                  children: c.jsx("div", {
                    className: "text-sm text-zinc-200",
                    children: y.name
                  })
                })
              ]
            }, w))
          ]
        }),
        c.jsx("div", {
          className: "max-w-2xl mx-auto px-4 py-3 bg-zinc-900/80 backdrop-blur-xl border-t border-zinc-800",
          children: c.jsxs("div", {
            className: "flex items-center gap-2 bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-700/50 focus-within:border-zinc-600 focus-within:ring-1 focus-within:ring-zinc-600 transition-all shadow-lg",
            children: [
              c.jsx("span", {
                className: "text-zinc-500",
                children: c.jsx("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: c.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  })
                })
              }),
              c.jsx("textarea", {
                ref: m,
                value: e,
                onChange: (y) => {
                  v(y), y.target.style.height = "auto", y.target.style.height = y.target.scrollHeight + "px";
                },
                onKeyDown: (y) => {
                  var _a2;
                  z && x.length > 0 ? y.key === "ArrowDown" ? (y.preventDefault(), r((w) => (w + 1) % x.length)) : y.key === "ArrowUp" ? (y.preventDefault(), r((w) => (w - 1 + x.length) % x.length)) : y.key === "Tab" || y.key === "Enter" ? (y.preventDefault(), T(x[f])) : y.key === "Escape" && (y.preventDefault(), A(false)) : y.key === "Escape" ? (y.preventDefault(), isEditing && onCancelEdit ? onCancelEdit() : (s && s.type, (_a2 = m.current) == null ? void 0 : _a2.blur())) : y.key === "Enter" && !L && !y.shiftKey && (y.preventDefault(), l(e));
                },
                placeholder: s && s.type !== "inbox" ? `Add to ${s.value}...` : "add a new task, filter or search...",
                className: "flex-1 bg-transparent border-none outline-none text-zinc-200 placeholder-zinc-500 text-sm min-h-[32px] max-h-32 resize-none py-1.5",
                rows: 1,
                onBlur: () => {
                  setTimeout(() => {
                    A(false);
                  }, 150);
                }
              }),
              s && s.type !== "inbox" && !isEditing && c.jsxs("button", {
                onClick: u,
                className: "text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full hover:bg-blue-500/30 flex items-center gap-1",
                children: [
                  s.type,
                  ":",
                  s.value,
                  " ",
                  c.jsx("span", {
                    className: "font-bold",
                    children: "\xD7"
                  })
                ]
              }),
              e.length > 0 && c.jsx("button", {
                onClick: () => {
                  var _a2;
                  isEditing && onCancelEdit ? onCancelEdit() : (t(""), (_a2 = m.current) == null ? void 0 : _a2.focus());
                },
                className: "p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700/50 rounded-lg transition-colors",
                title: "Clear / Cancel",
                children: c.jsx("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: c.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M6 18L18 6M6 6l12 12"
                  })
                })
              }),
              e.trim().length > 0 && c.jsx("button", {
                onClick: () => l(e),
                className: "p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors",
                title: isEditing ? "Save Changes" : "Add Task",
                children: isEditing ? c.jsx("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: c.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }) : c.jsx("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: c.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M12 4v16m8-8H4"
                  })
                })
              }),
              c.jsx("button", {
                onClick: () => {
                  p((y) => {
                    T({
                      type: "date",
                      value: y
                    }, y);
                  });
                },
                className: "p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50 rounded-lg transition-colors",
                title: "Add Due Date",
                children: c.jsx("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: c.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  })
                })
              }),
              c.jsx("div", {
                className: "w-px h-4 bg-zinc-700 mx-1"
              }),
              c.jsx("button", {
                onClick: a,
                className: "text-zinc-500 hover:text-zinc-300 transition-colors",
                children: c.jsxs("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: [
                    c.jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    }),
                    c.jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    })
                  ]
                })
              }),
              c.jsx("button", {
                onClick: n,
                className: "text-zinc-500 hover:text-zinc-300 transition-colors",
                children: c.jsx("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: c.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M4 6h16M4 12h16M4 18h16"
                  })
                })
              })
            ]
          })
        })
      ]
    });
  }
  function ng({ projects: e, contexts: t, tags: l, onFilterSelect: n, activeFilter: a, openCategory: i, onClose: s }) {
    const u = (d) => d === "project" ? e || [] : d === "context" ? t || [] : d === "tag" ? l || [] : d === "priority" ? [
      "A",
      "B",
      "C"
    ] : d === "alpha" ? Array.from({
      length: 26
    }, (g, p) => String.fromCharCode(65 + p)) : d === "date" ? [
      "Today",
      "Tomorrow",
      "Overdue",
      "Upcoming"
    ] : [], o = (d, g) => {
      n(d === "date" ? {
        type: {
          Today: "today",
          Tomorrow: "tomorrow",
          Overdue: "overdue",
          Upcoming: "upcoming"
        }[g] || "date",
        value: g
      } : {
        type: d,
        value: g
      }), s && s();
    };
    return i ? c.jsx("div", {
      className: "flex flex-col bg-zinc-950 border-b border-zinc-900",
      children: c.jsx("div", {
        className: "px-4 py-3 bg-zinc-900/30 border-t border-zinc-900 animate-in slide-in-from-top-2 duration-200",
        children: c.jsx("div", {
          className: "flex flex-wrap gap-2",
          children: u(i).length === 0 ? c.jsx("div", {
            className: "text-zinc-600 text-xs italic px-2",
            children: "No items found"
          }) : u(i).map((d, g) => c.jsx("button", {
            onClick: () => o(i, d),
            className: `px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                                    ${(a == null ? void 0 : a.type) === i && (a == null ? void 0 : a.value) === d ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50"}`,
            children: d
          }, g))
        })
      })
    }) : null;
  }
  const ag = "533958879265-u2sipqoup3j5fobgfkq1f37r5g8eo7lj.apps.googleusercontent.com", ig = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/tasks";
  function cg(e) {
    const [t, l] = C.useState(false), [n, a] = C.useState(false), [i, s] = C.useState(null), [u, o] = C.useState(null);
    C.useEffect(() => {
      (() => {
        if (window.gapi) d();
        else {
          const b = document.createElement("script");
          b.src = "https://apis.google.com/js/api.js", b.onload = () => d(), document.body.appendChild(b);
        }
        if (window.google) g();
        else {
          const b = document.createElement("script");
          b.src = "https://accounts.google.com/gsi/client", b.onload = () => g(), document.body.appendChild(b);
        }
      })();
    }, []);
    const d = () => {
      window.gapi.load("client", async () => {
        await window.gapi.client.init({
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
            "https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"
          ]
        });
      });
    }, g = () => {
      const w = window.google.accounts.oauth2.initTokenClient({
        client_id: ag,
        scope: ig,
        callback: (b) => {
          if (b.error !== void 0) throw b;
          l(true);
        }
      });
      s(w);
    }, p = () => {
      i && i.requestAccessToken({
        prompt: "consent"
      });
    }, m = async (w) => {
      try {
        const b = await window.gapi.client.drive.files.list({
          q: `name='${w}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
          fields: "files(id, name)",
          spaces: "drive"
        });
        if (b.result.files && b.result.files.length > 0) return console.log(`\u2705 Found existing folder: ${w}`), b.result.files[0].id;
        const N = await window.gapi.client.drive.files.create({
          resource: {
            name: w,
            mimeType: "application/vnd.google-apps.folder"
          },
          fields: "id"
        });
        return console.log(`\u2705 Created new folder: ${w}`), N.result.id;
      } catch (b) {
        throw console.error("\u274C Folder creation failed", b), b;
      }
    }, x = async (w, b) => {
      try {
        const N = await window.gapi.client.drive.files.list({
          q: `name='${w}' and '${b}' in parents and trashed=false`,
          fields: "files(id, name)",
          spaces: "drive"
        });
        if (N.result.files && N.result.files.length > 0) return console.log(`\u2705 Found existing file: ${w}`), N.result.files[0].id;
        const E = await window.gapi.client.drive.files.create({
          resource: {
            name: w,
            parents: [
              b
            ],
            mimeType: "text/plain"
          },
          fields: "id"
        });
        return console.log(`\u2705 Created new file: ${w}`), E.result.id;
      } catch (N) {
        throw console.error("\u274C File creation failed", N), N;
      }
    }, j = async (w) => {
      if (!t) {
        p();
        return;
      }
      a(true);
      try {
        const b = await m("todotext.de");
        let N = "", E = "";
        if (shouldArchive) {
          const k = w.filter((V) => !V.completed), U = w.filter((V) => V.completed);
          N = k.map((V) => V.raw).join(`
`), E = U.map((V) => V.raw).join(`
`);
        } else N = w.map((k) => k.raw).join(`
`);
        const M = await x("todo.txt", b);
        if (await h(M, N), shouldArchive) {
          const k = await x("done.txt", b);
          await h(k, E);
        }
        console.log("\u2705 Pushed to Google Drive: /todotext.de/"), z();
      } catch (b) {
        console.error("\u274C Drive Push failed", b);
      } finally {
        a(false);
      }
    }, z = async () => {
      const w = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      if (localStorage.getItem("gdrive_last_backup") === w) {
        console.log("\u2705 Daily backup already performed today (GDrive).");
        return;
      }
      console.log("\u{1F4E6} Starting daily backup (GDrive)...");
      try {
        const N = await m("todotext.de"), E = await A("Archive", N), M = await f("todo.txt", N);
        M && await r(M, E, `${w}_todo.txt`);
        const k = await f("done.txt", N);
        k && await r(k, E, `${w}_done.txt`), localStorage.setItem("gdrive_last_backup", w), console.log("\u2705 Daily backup completed (GDrive).");
      } catch (N) {
        console.error("GDrive Backup failed", N);
      }
    }, A = async (w, b) => {
      var _a2;
      try {
        const N = await window.gapi.client.drive.files.list({
          q: `name='${w}' and '${b}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
          fields: "files(id, name)",
          spaces: "drive"
        });
        return ((_a2 = N.result.files) == null ? void 0 : _a2.length) > 0 ? N.result.files[0].id : (await window.gapi.client.drive.files.create({
          resource: {
            name: w,
            parents: [
              b
            ],
            mimeType: "application/vnd.google-apps.folder"
          },
          fields: "id"
        })).result.id;
      } catch (N) {
        throw console.error("Archive folder error", N), N;
      }
    }, f = async (w, b) => {
      var _a2, _b;
      return (_b = (_a2 = (await window.gapi.client.drive.files.list({
        q: `name='${w}' and '${b}' in parents and trashed=false`,
        fields: "files(id)",
        spaces: "drive"
      })).result.files) == null ? void 0 : _a2[0]) == null ? void 0 : _b.id;
    }, r = async (w, b, N) => {
      await window.gapi.client.drive.files.copy({
        fileId: w,
        resource: {
          name: N,
          parents: [
            b
          ]
        }
      });
    }, h = async (w, b) => {
      const N = `https://www.googleapis.com/upload/drive/v3/files/${w}?uploadType=media`, E = window.gapi.client.getToken().access_token;
      await fetch(N, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${E}`,
          "Content-Type": "text/plain"
        },
        body: b
      });
    }, v = async () => {
      if (!t) {
        p();
        return;
      }
      a(true);
      try {
        const w = await m("todotext.de"), b = await x("todo.txt", w), N = await window.gapi.client.drive.files.get({
          fileId: b,
          alt: "media"
        }), E = await window.gapi.client.drive.files.get({
          fileId: b,
          fields: "md5Checksum"
        });
        E.result.md5Checksum && o(E.result.md5Checksum);
        let M = N.body;
        try {
          const k = await x("done.txt", w), U = await window.gapi.client.drive.files.get({
            fileId: k,
            alt: "media"
          });
          U.body && (M += `
` + U.body, console.log("\u2705 Loaded done.txt from Drive"));
        } catch (k) {
          console.warn("\u26A0\uFE0F Could not load done.txt (might be empty/new)", k);
        }
        e(M), console.log("\u2705 Pulled from Google Drive: /todotext.de/");
      } catch (w) {
        console.error("\u274C Drive Pull failed", w);
      } finally {
        a(false);
      }
    };
    return {
      isAuthenticated: t,
      isSyncing: n,
      login: p,
      syncPushDrive: j,
      syncPullDrive: v,
      syncPushTasks: async (w) => {
        if (!t) {
          p();
          return;
        }
        a(true);
        try {
          const N = (await window.gapi.client.tasks.tasklists.list()).result.items[0];
          for (const E of w) E.completed || await window.gapi.client.tasks.tasks.insert({
            tasklist: N.id,
            resource: {
              title: E.text,
              notes: E.raw
            }
          });
          console.log("Pushed tasks to Google Tasks");
        } catch (b) {
          console.error("GTasks Push failed", b);
        } finally {
          a(false);
        }
      },
      syncPullTasks: async () => {
        if (!t) {
          p();
          return;
        }
        a(true);
        try {
          const b = (await window.gapi.client.tasks.tasklists.list()).result.items[0], k = ((await window.gapi.client.tasks.tasks.list({
            tasklist: b.id,
            showCompleted: true,
            showHidden: true
          })).result.items || []).map((U) => {
            const V = U.status === "completed" ? "x " : "", D = U.title || "", B = U.notes ? ` ${U.notes}` : "";
            return `${V}${D}${B}`;
          }).filter((U) => U.trim()).join(`
`);
          e(k), console.log("\u2705 Pulled tasks from Google Tasks");
        } catch (w) {
          console.error("\u274C GTasks Pull failed", w);
        } finally {
          a(false);
        }
      },
      checkForRemoteUpdates: async () => {
        if (!(!t || !u || n)) try {
          const w = await m("todotext.de"), b = await f("todo.txt", w);
          if (b) {
            const E = (await window.gapi.client.drive.files.get({
              fileId: b,
              fields: "md5Checksum"
            })).result.md5Checksum;
            E && E !== u && (console.log("\u{1F504} Remote change detected (MD5 mismatch). Pulling (GDrive)..."), await v());
          }
        } catch (w) {
          console.error("Remote check failed (GDrive)", w);
        }
      }
    };
  }
  const sg = "rbpbfwt1ba6ji8h";
  function ug(e, t = false) {
    const [l, n] = C.useState(false), [a, i] = C.useState(null), [s, u] = C.useState(false), [o, d] = C.useState(null), [g, p] = C.useState(null), [m, x] = C.useState(null), j = C.useRef(false), z = C.useRef(null), A = C.useRef(null);
    C.useEffect(() => {
      z.current = g;
    }, [
      g
    ]);
    const f = () => {
      const b = window.location.origin, N = `https://www.dropbox.com/oauth2/authorize?client_id=${sg}&response_type=token&redirect_uri=${b}`;
      window.location.href = N;
    }, r = async (b, N = true) => {
      if (!a) {
        f();
        return;
      }
      if (j.current) {
        console.log("\u23F3 Sync in progress, queueing next update..."), A.current = b;
        return;
      }
      j.current = true, u(true);
      try {
        let E = b;
        for (; ; ) {
          let M = "", k = "";
          if (t) {
            const O = E.filter(($) => !$.completed), Q = E.filter(($) => $.completed);
            M = O.map(($) => $.raw).join(`
`), k = Q.map(($) => $.raw).join(`
`);
          } else M = E.map((O) => O.raw).join(`
`);
          if (!z.current) try {
            const O = await fetch("https://api.dropboxapi.com/2/files/get_metadata", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${a}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                path: "/todo.txt"
              })
            });
            if (O.ok) {
              const Q = await O.json();
              p(Q.rev), z.current = Q.rev, console.warn("\u26A0\uFE0F Remote file found during initial push. Switching to Merge flow."), await v(E);
              break;
            }
          } catch {
          }
          const U = new Blob([
            M
          ], {
            type: "text/plain"
          }), V = z.current, D = V ? {
            ".tag": "update",
            update: V
          } : {
            ".tag": "overwrite"
          }, B = await fetch("https://content.dropboxapi.com/2/files/upload", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${a}`,
              "Dropbox-API-Arg": JSON.stringify({
                path: "/todo.txt",
                mode: D,
                autorename: true,
                mute: false
              }),
              "Content-Type": "application/octet-stream"
            },
            body: U
          });
          if (B.status === 401) {
            console.error("Dropbox Token Expired (401)"), n(false), sessionStorage.removeItem("dropbox_token");
            return;
          }
          if (B.status === 409) {
            console.warn("\u26A0\uFE0F Conflict detected (409). Merging..."), N && await v(E);
            break;
          }
          if (B.ok) {
            const O = await B.json();
            p(O.rev), z.current = O.rev, console.log("Dropbox push successful. Rev:", O.rev), d(/* @__PURE__ */ new Date()), t && await h(k), L();
          }
          if (A.current) console.log("\u{1F504} Executing queued sync..."), E = A.current, A.current = null;
          else break;
        }
      } catch (E) {
        console.error("Dropbox push error", E);
      } finally {
        j.current = false, u(false);
      }
    }, h = async (b) => {
      const N = new Blob([
        b
      ], {
        type: "text/plain"
      }), E = m ? {
        ".tag": "update",
        update: m
      } : {
        ".tag": "overwrite"
      };
      try {
        const M = await fetch("https://content.dropboxapi.com/2/files/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${a}`,
            "Dropbox-API-Arg": JSON.stringify({
              path: "/done.txt",
              mode: E,
              autorename: true,
              mute: false
            }),
            "Content-Type": "application/octet-stream"
          },
          body: N
        });
        if (M.ok) {
          const k = await M.json();
          x(k.rev), console.log("Dropbox push successful (done.txt). New Rev:", k.rev);
        } else M.status === 409 && console.warn("\u26A0\uFE0F Conflict on done.txt. Skipping update to avoid overwrite (TODO: Merge done.txt).");
      } catch (M) {
        console.error("Failed to upload done.txt", M);
      }
    }, v = async (b) => {
      try {
        const N = await fetch("https://content.dropboxapi.com/2/files/download", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${a}`,
            "Dropbox-API-Arg": JSON.stringify({
              path: "/todo.txt"
            })
          }
        });
        if (N.ok) {
          const M = JSON.parse(N.headers.get("dropbox-api-result")).rev;
          p(M), z.current = M;
          const U = (await N.text()).split(`
`).filter((O) => O.trim()), V = b.map((O) => O.raw), D = /* @__PURE__ */ new Set([
            ...U,
            ...V
          ]), B = Array.from(D).join(`
`);
          console.log(`Merged ${V.length} local + ${U.length} remote tasks -> ${D.size} unique tasks.`), e(B), await y(B, M);
        }
      } catch (N) {
        console.error("Conflict handling logic failed", N);
      }
    }, T = async () => {
      try {
        const b = (/* @__PURE__ */ new Date()).toISOString().split("T")[0], N = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${a}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            path: "",
            recursive: false
          })
        });
        if (N.ok) {
          const k = (await N.json()).entries.filter((U) => U[".tag"] === "file" && U.name.toLowerCase().includes("conflicted copy"));
          if (k.length > 0) {
            console.log(`\u{1F9F9} Found ${k.length} conflicted copies. Moving to /Archive/conflicts/...`);
            for (const U of k) try {
              await fetch("https://api.dropboxapi.com/2/files/move_v2", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${a}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  from_path: U.path_lower,
                  to_path: `/Archive/conflicts/${b}_${U.name}`,
                  autorename: true
                })
              }), console.log(`\u2705 Moved ${U.name} to /Archive/conflicts/${b}_${U.name}`);
            } catch (V) {
              console.error(`Failed to move ${U.name}`, V);
            }
          }
        }
      } catch (b) {
        console.error("Conflict cleanup failed", b);
      }
    }, L = async () => {
      const b = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      if (localStorage.getItem("dropbox_last_backup") === b) {
        console.log("\u2705 Daily backup already performed today.");
        return;
      }
      console.log("\u{1F4E6} Starting daily backup...");
      try {
        const E = b, M = [
          "todo.txt",
          "done.txt"
        ];
        for (const k of M) try {
          await fetch("https://api.dropboxapi.com/2/files/copy_v2", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${a}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from_path: `/${k}`,
              to_path: `/Archive/${E}_${k}`,
              autorename: false
            })
          }), console.log(`\u2705 Backed up ${k} to /Archive/${E}_${k}`);
        } catch {
          console.warn(`Backup skipped for ${k} (may not exist or already backed up)`);
        }
        localStorage.setItem("dropbox_last_backup", b);
        try {
          await T();
        } catch (k) {
          console.error("Cleanup failed", k);
        }
      } catch (E) {
        console.error("Backup failed", E);
      }
    }, y = async (b, N) => {
      const E = new Blob([
        b
      ], {
        type: "text/plain"
      });
      try {
        const M = await fetch("https://content.dropboxapi.com/2/files/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${a}`,
            "Dropbox-API-Arg": JSON.stringify({
              path: "/todo.txt",
              mode: {
                ".tag": "update",
                update: N
              },
              autorename: true,
              mute: false
            }),
            "Content-Type": "application/octet-stream"
          },
          body: E
        });
        if (M.ok) {
          const k = await M.json();
          p(k.rev), z.current = k.rev, d(/* @__PURE__ */ new Date()), console.log("Merge & Push successful. Rev:", k.rev), L();
        }
      } catch (M) {
        console.error("Direct upload failed", M);
      }
    };
    return {
      isAuthenticated: l,
      isSyncing: s,
      login: f,
      syncPush: r,
      syncPull: async () => {
        if (!a) {
          f();
          return;
        }
        u(true);
        try {
          const b = await fetch("https://content.dropboxapi.com/2/files/download", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${a}`,
              "Dropbox-API-Arg": JSON.stringify({
                path: "/todo.txt"
              })
            }
          });
          if (b.status === 401) {
            console.error("Dropbox Token Expired (401) during Pull"), n(false), sessionStorage.removeItem("dropbox_token");
            return;
          }
          let N = "";
          if (b.ok) {
            const k = JSON.parse(b.headers.get("dropbox-api-result"));
            p(k.rev), N = await b.text(), console.log("\u2705 todo.txt loaded. Rev:", k.rev);
          } else console.warn("\u26A0\uFE0F todo.txt not found or error:", b.status);
          let E = "";
          try {
            const k = await fetch("https://content.dropboxapi.com/2/files/download", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${a}`,
                "Dropbox-API-Arg": JSON.stringify({
                  path: "/done.txt"
                })
              }
            });
            if (k.status === 401) return;
            if (k.ok) {
              const U = JSON.parse(k.headers.get("dropbox-api-result"));
              x(U.rev), E = await k.text(), console.log("\u2705 done.txt loaded. Rev:", U.rev);
            }
          } catch {
            console.log("\u2139\uFE0F done.txt not available (optional)");
          }
          const M = [
            N,
            E
          ].filter((k) => k.trim()).join(`
`);
          M && (e(M), console.log("\u2705 Dropbox pull successful"));
        } catch (b) {
          console.error("\u274C Dropbox pull failed", b);
        } finally {
          u(false);
        }
      },
      lastSyncTime: o
    };
  }
  const og = ({ tasks: e, focusedTaskId: t, setFocusedTaskId: l, setSearchFocus: n, onTaskComplete: a, onTaskDelete: i, onTaskEdit: s, onTaskPriority: u, onUndo: o, onRedo: d, clearFilters: g, onClearSelection: p, selectedTaskIds: m, onSelectTask: x, onTasksDelete: j }) => {
    const [z, A] = C.useState(false), f = C.useRef({
      tasks: e,
      focusedTaskId: t,
      selectedTaskIds: m,
      onUndo: o,
      onRedo: d,
      onTaskPriority: u,
      onTaskComplete: a,
      onTaskDelete: i,
      onTasksDelete: j,
      onTaskEdit: s,
      onClearSelection: p,
      setSearchFocus: n,
      clearFilters: g
    });
    return C.useLayoutEffect(() => {
      f.current = {
        tasks: e,
        focusedTaskId: t,
        selectedTaskIds: m,
        onUndo: o,
        onRedo: d,
        onTaskPriority: u,
        onTaskComplete: a,
        onTaskDelete: i,
        onTasksDelete: j,
        onTaskEdit: s,
        onClearSelection: p,
        setSearchFocus: n,
        clearFilters: g
      };
    }, [
      e,
      t,
      m,
      o,
      d,
      u,
      a,
      i,
      j,
      s,
      p,
      n,
      g
    ]), C.useEffect(() => {
      const r = (h) => {
        const { tasks: v, focusedTaskId: T, selectedTaskIds: L, onUndo: y, onRedo: w, onTaskPriority: b, onTaskComplete: N, onTaskDelete: E, onTasksDelete: M, onTaskEdit: k, onClearSelection: U, setSearchFocus: V, clearFilters: D } = f.current;
        if ([
          "INPUT",
          "TEXTAREA"
        ].includes(document.activeElement.tagName)) {
          h.key === "Escape" && (document.activeElement.blur(), h.preventDefault());
          return;
        }
        if (h.key === "/") {
          h.preventDefault(), V();
          return;
        }
        if (h.key === "Escape") {
          if (h.preventDefault(), z) {
            A(false);
            return;
          }
          D && D(), U && U(), l(null);
          return;
        }
        if (h.key.toLowerCase() === "n" && !z) {
          h.preventDefault(), V();
          return;
        }
        if ((h.ctrlKey || h.metaKey) && h.key.toLowerCase() === "z") {
          console.log(`Shortcut Triggered: ${h.shiftKey ? "Redo" : "Undo"}`), h.preventDefault(), h.shiftKey ? w ? (console.log("Calling onRedo callback"), w()) : console.log("onRedo callback is missing") : y && y();
          return;
        }
        if (!v || v.length === 0) return;
        const O = v.findIndex((Q) => String(Q.id) === String(T));
        if (z) {
          if ([
            "a",
            "b",
            "c",
            "n"
          ].includes(h.key.toLowerCase())) {
            if (h.preventDefault(), T) {
              const Q = h.key.toLowerCase() === "n" ? null : h.key.toUpperCase();
              b(T, Q);
            }
            A(false);
          } else A(false);
          return;
        }
        switch (h.key) {
          case "ArrowDown":
            h.preventDefault();
            let Q = null;
            O < v.length - 1 ? Q = v[O + 1].id : O === -1 && (Q = v[0].id), Q && (l(Q), h.shiftKey && x && (T && x(T, true), x(Q, true)));
            break;
          case "ArrowUp":
            h.preventDefault();
            let $ = null;
            O > 0 ? $ = v[O - 1].id : O === -1 && ($ = v[v.length - 1].id), $ && (l($), h.shiftKey && x && (T && x(T, true), x($, true)));
            break;
          case "x":
          case " ":
            T && N && (h.preventDefault(), N(T));
            break;
          case "Delete":
          case "Backspace":
            h.shiftKey && L && L.size > 0 && M ? (h.preventDefault(), M(Array.from(L))) : T && E && (h.preventDefault(), E(T));
            break;
          case "ArrowRight":
            T && (h.preventDefault(), h.shiftKey && x ? x(T, true) : b(T, "up"));
            break;
          case "ArrowLeft":
            T && (h.preventDefault(), h.shiftKey && x ? x(T, false) : b(T, "down"));
            break;
          case "Enter":
            T && k && (h.preventDefault(), k(T));
            break;
          case "!":
            h.preventDefault(), A(true);
            break;
        }
      };
      return window.addEventListener("keydown", r), () => window.removeEventListener("keydown", r);
    }, [
      l,
      n,
      a,
      i,
      s,
      u,
      o,
      g,
      p,
      x,
      z,
      e,
      t,
      m
    ]), {
      priorityMode: z
    };
  }, rg = (e, t) => {
    if (!t || !t.trim()) return e;
    const l = t.trim().split(/\s+/);
    return e.filter((n) => l.every((a) => {
      var _a2;
      const i = a.toLowerCase();
      let s = false, u = i;
      u.startsWith("-") && (s = true, u = u.substring(1));
      let o = false;
      if (u.startsWith("prio:")) {
        const d = (_a2 = u.split(":")[1]) == null ? void 0 : _a2.toUpperCase();
        o = n.priority === d;
      } else if (/^\([a-z]\)$/.test(u)) {
        const d = u[1].toUpperCase();
        o = n.priority === d;
      } else if (u.startsWith("+")) {
        const d = u.substring(1);
        o = n.projects && n.projects.some((g) => g.toLowerCase().includes(d));
      } else if (u.startsWith("@")) {
        const d = u.substring(1);
        o = n.contexts && n.contexts.some((g) => g.toLowerCase().includes(d));
      } else if (u === "is:open") o = !n.completed;
      else if (u === "is:done") o = n.completed;
      else if (u === "is:no-due") o = !n.metadata || !n.metadata.due;
      else if (u.startsWith("^")) {
        const d = u.substring(1);
        o = n.raw.toLowerCase().startsWith(d);
      } else o = n.raw.toLowerCase().includes(u);
      return s ? !o : o;
    }));
  }, fg = ({ className: e }) => c.jsxs("svg", {
    className: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      c.jsx("path", {
        d: "M7 17l5 3 5-3-5-3-5 3z",
        className: "text-blue-500 fill-blue-500/20",
        stroke: "none"
      }),
      c.jsx("path", {
        d: "M2 12l5 3 5-3-5-3-5 3z",
        stroke: "#3B82F6"
      }),
      c.jsx("path", {
        d: "M7 7l5 3 5-3-5-3-5 3z",
        stroke: "#3B82F6"
      }),
      c.jsx("path", {
        d: "M17 17l5-3-5-3-5 3-5-3z",
        stroke: "#3B82F6"
      }),
      c.jsx("path", {
        d: "M17 7l5-3-5-3-5 3-5-3z",
        stroke: "#3B82F6"
      })
    ]
  }), dg = ({ className: e }) => c.jsxs("svg", {
    className: e,
    viewBox: "0 0 87.3 78",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      c.jsx("path", {
        d: "m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z",
        fill: "#0066da"
      }),
      c.jsx("path", {
        d: "m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44.1c-.8 1.4-1.2 2.95-1.2 4.5h27.5z",
        fill: "#00ac47"
      }),
      c.jsx("path", {
        d: "m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 11.1-19.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z",
        fill: "#ea4335"
      }),
      c.jsx("path", {
        d: "m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.4-4.5 1.2z",
        fill: "#00832d"
      }),
      c.jsx("path", {
        d: "m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.4 4.5-1.2z",
        fill: "#2684fc"
      }),
      c.jsx("path", {
        d: "m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z",
        fill: "#ffba00"
      })
    ]
  }), hg = ({ className: e }) => c.jsxs("svg", {
    className: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    children: [
      c.jsx("circle", {
        cx: "12",
        cy: "12",
        r: "10",
        className: "text-blue-500"
      }),
      c.jsx("path", {
        d: "M9 12l2 2 4-4",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      })
    ]
  }), Hr = ({ className: e }) => c.jsx("svg", {
    className: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    children: c.jsx("path", {
      d: "M6 9l6 6 6-6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  });
  function mg({ isOpen: e, onClose: t, onSyncClick: l, onPullClick: n, isSyncing: a, isAuthenticated: i, onDropboxSync: s, onDropboxPull: u, isDropboxAuth: o, isDropboxSyncing: d, onGTasksSync: g, onGTasksPull: p, onClearAll: m, dropboxLastSync: x, archiveCompleted: j, onToggleArchive: z, syncMode: A, onSyncModeChange: f, onExport: r, onImport: h }) {
    const [v, T] = C.useState(true), L = wh.useRef(null), [y, w] = C.useState(false);
    return c.jsxs(c.Fragment, {
      children: [
        e && c.jsx("div", {
          className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity",
          onClick: t
        }),
        c.jsxs("aside", {
          className: `
            w-[320px] bg-zinc-950/95 backdrop-blur-xl flex flex-col border-l border-zinc-800/50 pt-6 px-0 shrink-0 overflow-y-auto
            fixed inset-y-0 right-0 z-50 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${e ? "translate-x-0 shadow-2xl shadow-black/50" : "translate-x-[110%]"}
            text-zinc-300 font-sans
        `,
          children: [
            c.jsxs("div", {
              className: "flex justify-between items-center mb-8 px-6",
              children: [
                c.jsx("h2", {
                  className: "text-xl font-bold text-white tracking-tight",
                  children: "Settings"
                }),
                c.jsx("button", {
                  onClick: t,
                  className: "p-2 -mr-2 text-zinc-500 hover:text-white hover:bg-zinc-800/50 rounded-full transition-all",
                  children: c.jsx("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    children: c.jsx("path", {
                      d: "M18 6L6 18M6 6l12 12",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    })
                  })
                })
              ]
            }),
            c.jsxs("div", {
              className: "flex-1 px-4 space-y-4",
              children: [
                c.jsxs("div", {
                  className: "border border-zinc-800/50 rounded-2xl bg-zinc-900/30 overflow-hidden",
                  children: [
                    c.jsxs("button", {
                      onClick: () => T(!v),
                      className: "w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-800/30 transition-colors",
                      children: [
                        c.jsx("span", {
                          className: "text-sm font-semibold text-zinc-100 uppercase tracking-widest text-[10px]",
                          children: "Cloud Sync"
                        }),
                        c.jsx(Hr, {
                          className: `w-4 h-4 text-zinc-500 transition-transform duration-200 ${v ? "rotate-180" : ""}`
                        })
                      ]
                    }),
                    v && c.jsxs("div", {
                      className: "px-3 pb-3 space-y-2 animate-in slide-in-from-top-1 fade-in duration-200",
                      children: [
                        c.jsxs("div", {
                          className: "px-2 py-2 mb-2 bg-zinc-900/50 rounded-xl border border-zinc-800/50",
                          children: [
                            c.jsx("span", {
                              className: "text-xs text-zinc-300 font-medium block mb-2 px-1",
                              children: "Sync Mode"
                            }),
                            c.jsxs("div", {
                              className: "bg-zinc-800 p-1 rounded-lg flex",
                              children: [
                                c.jsx("button", {
                                  onClick: () => f("auto"),
                                  className: `flex-1 py-1 text-[10px] font-medium rounded-md transition-all ${A === "auto" ? "bg-zinc-600 text-white shadow" : "text-zinc-500 hover:text-zinc-300"}`,
                                  children: "Automatic"
                                }),
                                c.jsx("button", {
                                  onClick: () => f("manual"),
                                  className: `flex-1 py-1 text-[10px] font-medium rounded-md transition-all ${A === "manual" ? "bg-zinc-600 text-white shadow" : "text-zinc-500 hover:text-zinc-300"}`,
                                  children: "Manual"
                                })
                              ]
                            }),
                            c.jsx("p", {
                              className: "text-[9px] text-zinc-500 mt-2 px-1 leading-tight",
                              children: A === "auto" ? "Syncs automatically on changes and app start." : "Only syncs when you click Push or Pull."
                            })
                          ]
                        }),
                        c.jsxs("div", {
                          className: "group bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-3 hover:border-zinc-700/50 transition-colors",
                          children: [
                            c.jsx("div", {
                              className: "flex items-center justify-between mb-2",
                              children: c.jsxs("div", {
                                className: "flex items-center gap-3",
                                children: [
                                  c.jsx("div", {
                                    className: "p-2 bg-zinc-800/50 rounded-lg",
                                    children: c.jsx(dg, {
                                      className: "w-5 h-5"
                                    })
                                  }),
                                  c.jsxs("div", {
                                    className: "flex flex-col",
                                    children: [
                                      c.jsx("span", {
                                        className: "text-sm font-medium text-zinc-200",
                                        children: "Google Drive"
                                      }),
                                      c.jsx("span", {
                                        className: `text-[10px] uppercase tracking-wider font-bold ${i ? "text-green-500" : "text-zinc-600"}`,
                                        children: i ? "Connected" : "Disconnected"
                                      })
                                    ]
                                  })
                                ]
                              })
                            }),
                            c.jsxs("div", {
                              className: "grid grid-cols-2 gap-2 mt-2",
                              children: [
                                c.jsx("button", {
                                  onClick: l,
                                  className: `py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${i ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 col-span-2"}`,
                                  children: i ? a ? "Pushing..." : "Push \u2197" : "Connect"
                                }),
                                i && c.jsx("button", {
                                  onClick: n,
                                  className: "py-1.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-colors text-xs font-medium",
                                  title: "Force Download",
                                  children: a ? "Pulling..." : "Pull \u2199"
                                })
                              ]
                            })
                          ]
                        }),
                        c.jsxs("div", {
                          className: "group bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-3 hover:border-zinc-700/50 transition-colors",
                          children: [
                            c.jsx("div", {
                              className: "flex items-center justify-between mb-2",
                              children: c.jsxs("div", {
                                className: "flex items-center gap-3",
                                children: [
                                  c.jsx("div", {
                                    className: "p-2 bg-zinc-800/50 rounded-lg",
                                    children: c.jsx(fg, {
                                      className: "w-5 h-5"
                                    })
                                  }),
                                  c.jsxs("div", {
                                    className: "flex flex-col",
                                    children: [
                                      c.jsx("span", {
                                        className: "text-sm font-medium text-zinc-200",
                                        children: "Dropbox"
                                      }),
                                      c.jsx("span", {
                                        className: `text-[10px] uppercase tracking-wider font-bold ${o ? "text-green-500" : "text-zinc-600"}`,
                                        children: o ? "Connected" : "Disconnected"
                                      })
                                    ]
                                  })
                                ]
                              })
                            }),
                            c.jsxs("div", {
                              className: "grid grid-cols-2 gap-2 mt-2",
                              children: [
                                c.jsx("button", {
                                  onClick: s,
                                  className: `py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${o ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-[#0061FE] hover:bg-[#0057E5] text-white shadow-lg shadow-blue-900/20 col-span-2"}`,
                                  children: o ? d ? "Pushing..." : "Push \u2197" : "Connect"
                                }),
                                o && c.jsx("button", {
                                  onClick: u,
                                  className: "py-1.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-colors text-xs font-medium",
                                  title: "Force Download",
                                  children: d ? "Pulling..." : "Pull \u2199"
                                })
                              ]
                            }),
                            o && x && c.jsx("div", {
                              className: "mt-2 text-center",
                              children: c.jsxs("span", {
                                className: "text-[10px] text-zinc-500 font-mono",
                                children: [
                                  "Synced: ",
                                  (() => {
                                    const b = new Date(x), N = (E) => E.toString().padStart(2, "0");
                                    return `${b.getFullYear()}-${N(b.getMonth() + 1)}-${N(b.getDate())}-${N(b.getHours())}-${N(b.getMinutes())}-${N(b.getSeconds())}`;
                                  })()
                                ]
                              })
                            })
                          ]
                        }),
                        i && c.jsxs("div", {
                          className: "group bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-3 hover:border-zinc-700/50 transition-colors",
                          children: [
                            c.jsxs("div", {
                              className: "flex items-center gap-3 mb-3",
                              children: [
                                c.jsx("div", {
                                  className: "p-2 bg-zinc-800/50 rounded-lg",
                                  children: c.jsx(hg, {
                                    className: "w-5 h-5"
                                  })
                                }),
                                c.jsx("span", {
                                  className: "text-sm font-medium text-zinc-200",
                                  children: "Google Tasks"
                                })
                              ]
                            }),
                            c.jsxs("div", {
                              className: "grid grid-cols-2 gap-2",
                              children: [
                                c.jsx("button", {
                                  onClick: g,
                                  className: "py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors",
                                  children: "Push \u2197"
                                }),
                                c.jsx("button", {
                                  onClick: p,
                                  className: "py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors",
                                  children: "Pull \u2199"
                                })
                              ]
                            })
                          ]
                        })
                      ]
                    })
                  ]
                }),
                c.jsxs("div", {
                  className: "border border-zinc-800/50 rounded-2xl bg-zinc-900/30 overflow-hidden",
                  children: [
                    c.jsxs("button", {
                      onClick: () => w(!y),
                      className: "w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-800/30 transition-colors",
                      children: [
                        c.jsx("span", {
                          className: "text-sm font-semibold text-zinc-100 uppercase tracking-widest text-[10px]",
                          children: "Data Management"
                        }),
                        c.jsx(Hr, {
                          className: `w-4 h-4 text-zinc-500 transition-transform duration-200 ${y ? "rotate-180" : ""}`
                        })
                      ]
                    }),
                    y && c.jsxs("div", {
                      className: "px-3 pb-3 space-y-2 animate-in slide-in-from-top-1 fade-in duration-200",
                      children: [
                        c.jsxs("div", {
                          className: "flex items-center justify-between px-2 py-2 mb-2 bg-zinc-900/50 rounded-xl border border-zinc-800/50",
                          children: [
                            c.jsx("span", {
                              className: "text-xs text-zinc-300 font-medium",
                              children: "Archive Completed"
                            }),
                            c.jsx("button", {
                              onClick: z,
                              className: `w-9 h-5 rounded-full p-1 transition-colors relative ${j ? "bg-green-500" : "bg-zinc-700"}`,
                              children: c.jsx("div", {
                                className: `w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${j ? "translate-x-4" : "translate-x-0"}`
                              })
                            })
                          ]
                        }),
                        c.jsxs("div", {
                          className: "grid grid-cols-2 gap-2",
                          children: [
                            c.jsxs("button", {
                              onClick: r,
                              className: "flex items-center justify-center gap-2 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors text-xs font-medium border border-zinc-700/50",
                              children: [
                                c.jsx("svg", {
                                  className: "w-4 h-4",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  children: c.jsx("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                  })
                                }),
                                "Export txt"
                              ]
                            }),
                            c.jsxs("button", {
                              onClick: () => {
                                var _a2;
                                return (_a2 = L.current) == null ? void 0 : _a2.click();
                              },
                              className: "flex items-center justify-center gap-2 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors text-xs font-medium border border-zinc-700/50",
                              children: [
                                c.jsx("svg", {
                                  className: "w-4 h-4",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  children: c.jsx("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                  })
                                }),
                                "Import txt"
                              ]
                            }),
                            c.jsx("input", {
                              type: "file",
                              ref: L,
                              onChange: (b) => {
                                var _a2;
                                ((_a2 = b.target.files) == null ? void 0 : _a2[0]) && (confirm("Importing will overwrite/merge your current tasks. Continue?") && h(b.target.files[0]), b.target.value = "");
                              },
                              className: "hidden",
                              accept: ".txt"
                            })
                          ]
                        }),
                        c.jsx("p", {
                          className: "text-[9px] text-zinc-500 px-1",
                          children: "Download your list as todo.txt or import an existing file."
                        }),
                        c.jsx("div", {
                          className: "pt-2 mt-2 border-t border-zinc-800/50",
                          children: c.jsxs("button", {
                            onClick: m,
                            className: "w-full flex items-center justify-center gap-2 py-2 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 rounded-xl transition-colors text-xs font-semibold uppercase tracking-wider border border-red-500/10",
                            children: [
                              c.jsx("svg", {
                                className: "w-4 h-4",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                children: c.jsx("path", {
                                  d: "M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round"
                                })
                              }),
                              "Clear System"
                            ]
                          })
                        })
                      ]
                    })
                  ]
                }),
                c.jsx("div", {
                  className: "text-center pb-8 pt-4",
                  children: c.jsxs("span", {
                    className: "text-[10px] text-zinc-600 font-mono",
                    children: [
                      "Version: ",
                      "2026-01-01-21-01-02"
                    ]
                  })
                })
              ]
            })
          ]
        })
      ]
    });
  }
  function xg({ onSelect: e, onClose: t }) {
    const [l, n] = C.useState(/* @__PURE__ */ new Date());
    C.useEffect(() => {
      const z = (A) => {
        A.key === "Escape" && (A.preventDefault(), t());
      };
      return window.addEventListener("keydown", z), () => window.removeEventListener("keydown", z);
    }, [
      t
    ]);
    const a = (z, A) => new Date(z, A + 1, 0).getDate(), i = (z, A) => {
      const f = new Date(z, A, 1).getDay();
      return f === 0 ? 6 : f - 1;
    }, s = () => {
      n(new Date(l.getFullYear(), l.getMonth() - 1, 1));
    }, u = () => {
      n(new Date(l.getFullYear(), l.getMonth() + 1, 1));
    }, o = (z) => {
      const A = l.getFullYear(), f = String(l.getMonth() + 1).padStart(2, "0"), r = String(z).padStart(2, "0");
      e(`${A}-${f}-${r}`);
    }, d = l.getFullYear(), g = l.getMonth(), p = l.toLocaleString("default", {
      month: "long"
    }), m = a(d, g), x = i(d, g), j = [];
    for (let z = 0; z < x; z++) j.push(c.jsx("div", {}, `empty-${z}`));
    for (let z = 1; z <= m; z++) {
      const A = z === (/* @__PURE__ */ new Date()).getDate() && g === (/* @__PURE__ */ new Date()).getMonth() && d === (/* @__PURE__ */ new Date()).getFullYear();
      j.push(c.jsx("button", {
        onClick: (f) => {
          f.preventDefault(), f.stopPropagation(), o(z);
        },
        className: `w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-zinc-700 transition-colors ${A ? "bg-blue-600 text-white hover:bg-blue-500" : "text-zinc-300"}`,
        children: z
      }, z));
    }
    return c.jsxs("div", {
      className: "fixed top-32 right-4 bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-4 w-72 z-[60] animate-in fade-in slide-in-from-top-4 duration-200",
      children: [
        c.jsxs("div", {
          className: "flex items-center justify-between mb-4",
          children: [
            c.jsx("button", {
              onClick: (z) => {
                z.preventDefault(), s();
              },
              className: "p-1 hover:text-white text-zinc-400",
              children: c.jsx("svg", {
                className: "w-5 h-5",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: c.jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M15 19l-7-7 7-7"
                })
              })
            }),
            c.jsxs("div", {
              className: "font-semibold text-zinc-200",
              children: [
                p,
                " ",
                d
              ]
            }),
            c.jsxs("div", {
              className: "flex items-center gap-1",
              children: [
                c.jsx("button", {
                  onClick: (z) => {
                    z.preventDefault(), u();
                  },
                  className: "p-1 hover:text-white text-zinc-400",
                  children: c.jsx("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: c.jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M9 5l7 7-7 7"
                    })
                  })
                }),
                c.jsx("button", {
                  onClick: (z) => {
                    z.preventDefault(), z.stopPropagation(), t && t();
                  },
                  className: "p-1 hover:text-red-400 text-zinc-500 ml-1",
                  title: "Close",
                  children: c.jsx("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: c.jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  })
                })
              ]
            })
          ]
        }),
        c.jsx("div", {
          className: "grid grid-cols-7 mb-2 text-center",
          children: [
            "Mo",
            "Tu",
            "We",
            "Th",
            "Fr",
            "Sa",
            "Su"
          ].map((z) => c.jsx("div", {
            className: "text-xs text-zinc-500 font-medium",
            children: z
          }, z))
        }),
        c.jsx("div", {
          className: "grid grid-cols-7 gap-1 place-items-center",
          children: j
        })
      ]
    });
  }
  const ai = (e) => {
    if (!e) return 9999999999999;
    if (/^\d{4}-\d{2}-\d{2}$/.test(e)) return new Date(e).getTime();
    const t = e.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (t) return (/* @__PURE__ */ new Date(`${t[3]}-${t[2]}-${t[1]}`)).getTime();
    const l = e.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2})$/);
    if (l) {
      const n = parseInt(l[3], 10) + 2e3;
      return (/* @__PURE__ */ new Date(`${n}-${l[2]}-${l[1]}`)).getTime();
    }
    return 9999999999999;
  }, pg = (e, t) => {
    if (!e) return [];
    const l = [
      ...e
    ];
    switch (t) {
      case "priority":
        return l.sort((n, a) => n.priority && !a.priority ? -1 : !n.priority && a.priority ? 1 : n.priority && a.priority ? n.priority.localeCompare(a.priority) : 0);
      case "priority-desc":
        return l.sort((n, a) => n.priority && !a.priority ? 1 : !n.priority && a.priority ? -1 : n.priority && a.priority ? a.priority.localeCompare(n.priority) : 0);
      case "due":
        return l.sort((n, a) => {
          var _a2, _b;
          const i = ai(n.due || ((_a2 = n.metadata) == null ? void 0 : _a2.due)), s = ai(a.due || ((_b = a.metadata) == null ? void 0 : _b.due));
          return i - s;
        });
      case "due-desc":
        return l.sort((n, a) => {
          var _a2, _b;
          const i = ai(n.due || ((_a2 = n.metadata) == null ? void 0 : _a2.due));
          return ai(a.due || ((_b = a.metadata) == null ? void 0 : _b.due)) - i;
        });
      case "project":
        return l.sort((n, a) => {
          const i = n.projects && n.projects[0] || "zzzz", s = a.projects && a.projects[0] || "zzzz";
          return i.localeCompare(s);
        });
      case "project-desc":
        return l.sort((n, a) => {
          const i = n.projects && n.projects[0] || "zzzz";
          return (a.projects && a.projects[0] || "zzzz").localeCompare(i);
        });
      case "context":
        return l.sort((n, a) => {
          const i = n.contexts && n.contexts[0] || "zzzz", s = a.contexts && a.contexts[0] || "zzzz";
          return i.localeCompare(s);
        });
      case "context-desc":
        return l.sort((n, a) => {
          const i = n.contexts && n.contexts[0] || "zzzz";
          return (a.contexts && a.contexts[0] || "zzzz").localeCompare(i);
        });
      case "tag":
        return l.sort((n, a) => {
          const i = n.tags && n.tags[0] || "zzzz", s = a.tags && a.tags[0] || "zzzz";
          return i.localeCompare(s);
        });
      case "tag-desc":
        return l.sort((n, a) => {
          const i = n.tags && n.tags[0] || "zzzz";
          return (a.tags && a.tags[0] || "zzzz").localeCompare(i);
        });
      case "alpha-asc":
        return l.sort((n, a) => n.text.toLowerCase().localeCompare(a.text.toLowerCase()));
      case "alpha-desc":
        return l.sort((n, a) => a.text.toLowerCase().localeCompare(n.text.toLowerCase()));
      case "none":
      default:
        return l;
    }
  };
  function gg({ onBack: e }) {
    return c.jsxs("div", {
      className: "text-zinc-300 max-w-2xl mx-auto pb-20 p-4",
      children: [
        e && c.jsxs("button", {
          onClick: e,
          className: "mb-4 flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors",
          children: [
            c.jsx("svg", {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: c.jsx("path", {
                d: "M19 12H5M5 12l7 7M5 12l7-7"
              })
            }),
            "Back to App"
          ]
        }),
        c.jsx("header", {
          className: "mb-8 border-b border-zinc-800 pb-4",
          children: c.jsx("h1", {
            className: "text-3xl font-bold text-zinc-100",
            children: "Impressum"
          })
        }),
        c.jsxs("div", {
          className: "space-y-8 text-sm leading-relaxed",
          children: [
            c.jsxs("section", {
              children: [
                c.jsx("h2", {
                  className: "text-xl font-semibold text-zinc-100 mb-4",
                  children: "Angaben gem\xE4\xDF \xA7 5 TMG"
                }),
                c.jsxs("p", {
                  className: "text-zinc-400",
                  children: [
                    "Alexander Mut",
                    c.jsx("br", {}),
                    "Falkenbergsweg 66",
                    c.jsx("br", {}),
                    "21149 Hamburg",
                    c.jsx("br", {}),
                    "Deutschland"
                  ]
                })
              ]
            }),
            c.jsxs("section", {
              children: [
                c.jsx("h2", {
                  className: "text-xl font-semibold text-zinc-100 mb-4",
                  children: "Kontakt"
                }),
                c.jsxs("p", {
                  className: "text-zinc-400",
                  children: [
                    "Telefon: +49 151 51 00 27 67",
                    c.jsx("br", {}),
                    "E-Mail: mutalex (at) gmail (punkt) com"
                  ]
                })
              ]
            }),
            c.jsxs("section", {
              children: [
                c.jsx("h2", {
                  className: "text-xl font-semibold text-zinc-100 mb-4",
                  children: "Verantwortlich f\xFCr den Inhalt nach \xA7 18 Abs. 2 MStV"
                }),
                c.jsxs("p", {
                  className: "text-zinc-400",
                  children: [
                    "Alexander Mut",
                    c.jsx("br", {}),
                    "Falkenbergsweg 66",
                    c.jsx("br", {}),
                    "21149 Hamburg"
                  ]
                })
              ]
            }),
            c.jsxs("section", {
              children: [
                c.jsx("h3", {
                  className: "text-lg font-semibold text-zinc-200 mb-2",
                  children: "Haftungsausschluss"
                }),
                c.jsx("p", {
                  className: "text-zinc-400",
                  children: "Trotz sorgf\xE4ltiger inhaltlicher Kontrolle \xFCbernehmen wir keine Haftung f\xFCr die Inhalte externer Links. F\xFCr den Inhalt der verlinkten Seiten sind ausschlie\xDFlich deren Betreiber verantwortlich."
                })
              ]
            })
          ]
        })
      ]
    });
  }
  function vg({ onBack: e }) {
    return c.jsxs("div", {
      className: "text-zinc-300 max-w-2xl mx-auto pb-20 p-4",
      children: [
        e && c.jsxs("button", {
          onClick: e,
          className: "mb-4 flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors",
          children: [
            c.jsx("svg", {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: c.jsx("path", {
                d: "M19 12H5M5 12l7 7M5 12l7-7"
              })
            }),
            "Back to App"
          ]
        }),
        c.jsx("header", {
          className: "mb-8 border-b border-zinc-800 pb-4",
          children: c.jsx("h1", {
            className: "text-3xl font-bold text-zinc-100",
            children: "Datenschutzerkl\xE4rung"
          })
        }),
        c.jsxs("div", {
          className: "space-y-8 text-sm leading-relaxed",
          children: [
            c.jsxs("section", {
              children: [
                c.jsx("h2", {
                  className: "text-xl font-semibold text-zinc-100 mb-4",
                  children: "1. Verantwortlicher"
                }),
                c.jsx("p", {
                  className: "text-zinc-400 mb-2",
                  children: "Verantwortlicher f\xFCr die Datenverarbeitung im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:"
                }),
                c.jsxs("p", {
                  className: "text-zinc-400 mb-2",
                  children: [
                    "Alexander Mut",
                    c.jsx("br", {}),
                    "Falkenbergsweg 66",
                    c.jsx("br", {}),
                    "21149 Hamburg",
                    c.jsx("br", {}),
                    "E-Mail: mutalex (at) gmail (punkt) com"
                  ]
                }),
                c.jsx("p", {
                  className: "text-zinc-500 italic",
                  children: "(Weitere Angaben siehe Impressum)"
                })
              ]
            }),
            c.jsxs("section", {
              children: [
                c.jsx("h2", {
                  className: "text-xl font-semibold text-zinc-100 mb-4",
                  children: "2. Geltungsbereich"
                }),
                c.jsx("p", {
                  className: "text-zinc-400",
                  children: 'Diese Datenschutzerkl\xE4rung kl\xE4rt Sie \xFCber die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten innerhalb dieser Webanwendung (im Folgenden "App"), die unter https://alexandermut.github.io/protodo/index.html und deren Unterseiten betrieben wird, auf.'
                })
              ]
            }),
            c.jsxs("section", {
              children: [
                c.jsx("h2", {
                  className: "text-xl font-semibold text-zinc-100 mb-4",
                  children: "3. Datenverarbeitung im \xDCberblick"
                }),
                c.jsx("p", {
                  className: "text-zinc-400 mb-4",
                  children: 'Diese App ist als "Offline-First"-Anwendung konzipiert. Die Kernfunktionalit\xE4t erfordert keine \xDCbertragung Ihrer pers\xF6nlichen Daten an den Anbieter dieser App.'
                }),
                c.jsxs("ul", {
                  className: "list-disc pl-5 space-y-2 text-zinc-400",
                  children: [
                    c.jsxs("li", {
                      children: [
                        c.jsx("strong", {
                          className: "text-zinc-300",
                          children: "Hosting (GitHub Pages):"
                        }),
                        " Beim Aufruf der App werden Daten (z.B. IP-Adresse) an den Hosting-Anbieter \xFCbertragen."
                      ]
                    }),
                    c.jsxs("li", {
                      children: [
                        c.jsx("strong", {
                          className: "text-zinc-300",
                          children: "Externe Skripte (Google):"
                        }),
                        " Um die Anmeldung zu erm\xF6glichen, l\xE4dt die App Skripte von Google-Servern, wodurch Ihre IP-Adresse an Google \xFCbermittelt werden kann."
                      ]
                    }),
                    c.jsxs("li", {
                      children: [
                        c.jsx("strong", {
                          className: "text-zinc-300",
                          children: "Lokale Speicherung (LocalStorage):"
                        }),
                        " Ihre Aufgaben werden prim\xE4r lokal in Ihrem Browser gespeichert."
                      ]
                    }),
                    c.jsxs("li", {
                      children: [
                        c.jsx("strong", {
                          className: "text-zinc-300",
                          children: "Synchronisierung (Google / Dropbox):"
                        }),
                        " Nur bei aktiver Nutzung werden Daten direkt zwischen Ihrem Browser und dem gew\xE4hlten Cloud-Anbieter \xFCbertragen."
                      ]
                    })
                  ]
                })
              ]
            }),
            c.jsxs("section", {
              children: [
                c.jsx("h2", {
                  className: "text-xl font-semibold text-zinc-100 mb-4",
                  children: "4. Datenverarbeitung im Detail"
                }),
                c.jsxs("div", {
                  className: "mb-6",
                  children: [
                    c.jsx("h3", {
                      className: "text-lg font-medium text-zinc-200 mb-2",
                      children: "a) Hosting durch GitHub Pages"
                    }),
                    c.jsx("p", {
                      className: "text-zinc-400 mb-2",
                      children: "Diese App wird bei GitHub Pages, einem Dienst der GitHub, Inc. (88 Colin P Kelly Jr St, San Francisco, CA 94107, USA), gehostet."
                    }),
                    c.jsx("p", {
                      className: "text-zinc-400 mb-2",
                      children: "Beim Aufruf der App werden von GitHub Server-Logfiles erhoben (IP-Adresse, Browserdaten, etc.), um den Dienst sicher bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO)."
                    })
                  ]
                }),
                c.jsxs("div", {
                  className: "mb-6",
                  children: [
                    c.jsx("h3", {
                      className: "text-lg font-medium text-zinc-200 mb-2",
                      children: "b) Einbindung von Google-Diensten (Google Identity Services)"
                    }),
                    c.jsx("p", {
                      className: "text-zinc-400 mb-2",
                      children: 'Um die Authentifizierung und Synchronisierung mit Google-Diensten zu erm\xF6glichen, wird beim Start der App der "Google Identity Services"-Client (gsi/client) geladen.'
                    }),
                    c.jsx("p", {
                      className: "text-zinc-400 mb-2",
                      children: "Hierbei baut Ihr Browser eine direkte Verbindung zu den Servern von Google auf. Google erh\xE4lt dadurch die Information, dass Sie diese Webseite aufgerufen haben (inkl. Ihrer IP-Adresse), auch wenn Sie sich nicht einloggen. Dies ist technisch notwendig, um die Login-Funktionalit\xE4t bereitzustellen."
                    })
                  ]
                }),
                c.jsxs("div", {
                  className: "mb-6",
                  children: [
                    c.jsx("h3", {
                      className: "text-lg font-medium text-zinc-200 mb-2",
                      children: "c) Google Drive & Google Tasks Synchronisation"
                    }),
                    c.jsx("p", {
                      className: "text-zinc-400 mb-2",
                      children: 'Sie haben die M\xF6glichkeit, Ihre Aufgaben mit Google Drive zu synchronisieren oder an Google Tasks zu senden. Dies geschieht ausschlie\xDFlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) durch den Login ("Sign in with Google").'
                    }),
                    c.jsxs("p", {
                      className: "text-zinc-400 mb-2",
                      children: [
                        c.jsx("strong", {
                          className: "text-zinc-300",
                          children: "Umfang:"
                        }),
                        " Die App erh\xE4lt Zugriff auf einen speziellen Anwendungsordner in Ihrem Google Drive (zur Speicherung der `todo.txt`) sowie das Recht, Aufgaben in Ihren Google Tasks zu erstellen."
                      ]
                    }),
                    c.jsxs("p", {
                      className: "text-zinc-400 mb-2",
                      children: [
                        c.jsx("strong", {
                          className: "text-zinc-300",
                          children: "Daten\xFCbermittlung:"
                        }),
                        " Die Daten\xFCbertragung findet direkt verschl\xFCsselt zwischen Ihrem Endger\xE4t und den Google-Servern statt. Der Anbieter der App hat keinen Zugriff auf Ihr Google-Konto."
                      ]
                    })
                  ]
                }),
                c.jsxs("div", {
                  className: "mb-6",
                  children: [
                    c.jsx("h3", {
                      className: "text-lg font-medium text-zinc-200 mb-2",
                      children: "d) Dropbox Synchronisation"
                    }),
                    c.jsx("p", {
                      className: "text-zinc-400 mb-2",
                      children: "Alternativ k\xF6nnen Sie den Dienst Dropbox zur Synchronisierung nutzen. Anbieter ist die Dropbox International Unlimited Company (Irland)."
                    }),
                    c.jsxs("p", {
                      className: "text-zinc-400 mb-2",
                      children: [
                        c.jsx("strong", {
                          className: "text-zinc-300",
                          children: "Funktionsweise:"
                        }),
                        " Nach Ihrer expliziten Authentifizierung (OAuth) erh\xE4lt die App einen Zugriffstoken, der lokal in Ihrem Browser gespeichert wird. Mit diesem Token kann die App die Datei `todo.txt` in Ihrem Dropbox-Speicher lesen und schreiben."
                      ]
                    }),
                    c.jsxs("p", {
                      className: "text-zinc-400 mb-2",
                      children: [
                        c.jsx("strong", {
                          className: "text-zinc-300",
                          children: "Rechtsgrundlage:"
                        }),
                        " Einwilligung gem\xE4\xDF Art. 6 Abs. 1 lit. a DSGVO."
                      ]
                    })
                  ]
                })
              ]
            }),
            c.jsxs("section", {
              children: [
                c.jsx("h2", {
                  className: "text-xl font-semibold text-zinc-100 mb-4",
                  children: "5. Ihre Rechte"
                }),
                c.jsx("p", {
                  className: "text-zinc-400 mb-4",
                  children: "Sie haben gem\xE4\xDF DSGVO das Recht auf Auskunft, Berichtigung, L\xF6schung und Einschr\xE4nkung der Verarbeitung Ihrer bei uns gespeicherten Daten."
                }),
                c.jsx("p", {
                  className: "text-zinc-400 mb-2",
                  children: "Da wir als App-Anbieter keine Benutzerdaten auf eigenen Servern speichern, wenden Sie sich f\xFCr die Aus\xFCbung Ihrer Rechte bez\xFCglich der Cloud-Daten (Drive/Dropbox) bitte direkt an die jeweiligen Anbieter oder nutzen Sie die L\xF6schfunktionen innerhalb der Dienste."
                }),
                c.jsx("p", {
                  className: "text-zinc-400",
                  children: 'Lokale Daten ("LocalStorage") k\xF6nnen Sie jederzeit selbst durch das Leeren Ihres Browser-Caches l\xF6schen.'
                })
              ]
            })
          ]
        })
      ]
    });
  }
  function bg({ onBack: e }) {
    return c.jsxs("div", {
      className: "w-full text-zinc-300 space-y-12 animate-in fade-in duration-500 pb-20",
      children: [
        c.jsxs("div", {
          className: "flex items-center justify-between mb-8 border-b border-zinc-800 pb-6 sticky top-0 bg-zinc-950/80 backdrop-blur-xl z-20 pt-4",
          children: [
            c.jsxs("div", {
              children: [
                c.jsx("h2", {
                  className: "text-3xl font-bold text-white tracking-tight",
                  children: "Help Center"
                }),
                c.jsx("p", {
                  className: "text-zinc-500 text-sm mt-1",
                  children: "Master your tasks with todotext.de"
                })
              ]
            }),
            c.jsx("button", {
              onClick: e,
              className: "px-4 py-2 bg-zinc-800 hover:bg-zinc-700 hover:text-white text-sm font-medium rounded-lg transition-all border border-zinc-700/50",
              children: "\u2190 Back"
            })
          ]
        }),
        c.jsxs("section", {
          className: "space-y-6",
          children: [
            c.jsxs("h3", {
              className: "text-2xl font-bold text-white flex items-center gap-3",
              children: [
                c.jsx("span", {
                  className: "text-4xl",
                  children: "\u26A1"
                }),
                "Quick Start Guide"
              ]
            }),
            c.jsxs("p", {
              className: "text-zinc-400 leading-relaxed",
              children: [
                "todotext.de uses the powerful ",
                c.jsx("strong", {
                  children: "todo.txt"
                }),
                " format. It's plain text, but with special symbols to organize your life."
              ]
            }),
            c.jsxs("div", {
              className: "grid gap-6 md:grid-cols-2",
              children: [
                c.jsxs("div", {
                  className: "bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:bg-zinc-900/60 transition-colors",
                  children: [
                    c.jsxs("div", {
                      className: "flex items-center gap-3 mb-3",
                      children: [
                        c.jsx("span", {
                          className: "bg-red-500/10 text-red-400 px-2 py-1 rounded text-sm font-bold border border-red-500/20",
                          children: "(A)"
                        }),
                        c.jsx("h4", {
                          className: "text-lg font-semibold text-white",
                          children: "Priority"
                        })
                      ]
                    }),
                    c.jsx("p", {
                      className: "text-sm text-zinc-400 mb-2",
                      children: "Use (A) through (Z) at the start of a task to set importance."
                    }),
                    c.jsx("code", {
                      className: "text-xs bg-black/50 px-2 py-1 rounded text-zinc-500 block",
                      children: "(A) Call Mom later"
                    })
                  ]
                }),
                c.jsxs("div", {
                  className: "bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:bg-zinc-900/60 transition-colors",
                  children: [
                    c.jsxs("div", {
                      className: "flex items-center gap-3 mb-3",
                      children: [
                        c.jsx("span", {
                          className: "bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-sm font-bold border border-blue-500/20",
                          children: "+Project"
                        }),
                        c.jsx("h4", {
                          className: "text-lg font-semibold text-white",
                          children: "Projects"
                        })
                      ]
                    }),
                    c.jsxs("p", {
                      className: "text-sm text-zinc-400 mb-2",
                      children: [
                        "Group tasks by goal or project using the ",
                        c.jsx("code", {
                          children: "+"
                        }),
                        " symbol."
                      ]
                    }),
                    c.jsx("code", {
                      className: "text-xs bg-black/50 px-2 py-1 rounded text-zinc-500 block",
                      children: "Write code +WebsiteRedesign"
                    })
                  ]
                }),
                c.jsxs("div", {
                  className: "bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:bg-zinc-900/60 transition-colors",
                  children: [
                    c.jsxs("div", {
                      className: "flex items-center gap-3 mb-3",
                      children: [
                        c.jsx("span", {
                          className: "bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-sm font-bold border border-emerald-500/20",
                          children: "@Context"
                        }),
                        c.jsx("h4", {
                          className: "text-lg font-semibold text-white",
                          children: "Contexts"
                        })
                      ]
                    }),
                    c.jsxs("p", {
                      className: "text-sm text-zinc-400 mb-2",
                      children: [
                        "Define ",
                        c.jsx("em", {
                          children: "where"
                        }),
                        " or ",
                        c.jsx("em", {
                          children: "how"
                        }),
                        " a task is done using ",
                        c.jsx("code", {
                          children: "@"
                        }),
                        "."
                      ]
                    }),
                    c.jsx("code", {
                      className: "text-xs bg-black/50 px-2 py-1 rounded text-zinc-500 block",
                      children: "Buy milk @Supermarket"
                    })
                  ]
                }),
                c.jsxs("div", {
                  className: "bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:bg-zinc-900/60 transition-colors",
                  children: [
                    c.jsxs("div", {
                      className: "flex items-center gap-3 mb-3",
                      children: [
                        c.jsx("span", {
                          className: "bg-orange-500/10 text-orange-400 px-2 py-1 rounded text-sm font-bold border border-orange-500/20",
                          children: "due:YYYY-MM-DD"
                        }),
                        c.jsx("h4", {
                          className: "text-lg font-semibold text-white",
                          children: "Due Dates"
                        })
                      ]
                    }),
                    c.jsx("p", {
                      className: "text-sm text-zinc-400 mb-2",
                      children: "Set deadlines with standard ISO dates."
                    }),
                    c.jsx("code", {
                      className: "text-xs bg-black/50 px-2 py-1 rounded text-zinc-500 block",
                      children: "Tax return due:2024-05-31"
                    })
                  ]
                })
              ]
            })
          ]
        }),
        c.jsx("hr", {
          className: "border-zinc-800"
        }),
        c.jsxs("section", {
          className: "space-y-6",
          children: [
            c.jsxs("h3", {
              className: "text-2xl font-bold text-white flex items-center gap-3",
              children: [
                c.jsx("span", {
                  className: "text-4xl",
                  children: "\u{1F680}"
                }),
                "Power Features"
              ]
            }),
            c.jsxs("div", {
              className: "grid gap-4 sm:grid-cols-3",
              children: [
                c.jsxs("div", {
                  className: "p-4 bg-zinc-950 border border-zinc-800 rounded-xl",
                  children: [
                    c.jsx("div", {
                      className: "text-2xl mb-2",
                      children: "\u2601\uFE0F"
                    }),
                    c.jsx("h4", {
                      className: "font-bold text-white mb-1",
                      children: "Cloud Sync"
                    }),
                    c.jsx("p", {
                      className: "text-xs text-zinc-500",
                      children: "Connect Dropbox or Google Drive to sync your `todo.txt` file across devices. Your data remains yours."
                    })
                  ]
                }),
                c.jsxs("div", {
                  className: "p-4 bg-zinc-950 border border-zinc-800 rounded-xl",
                  children: [
                    c.jsx("div", {
                      className: "text-2xl mb-2",
                      children: "\u{1F4F6}"
                    }),
                    c.jsx("h4", {
                      className: "font-bold text-white mb-1",
                      children: "Offline First"
                    }),
                    c.jsx("p", {
                      className: "text-xs text-zinc-500",
                      children: "No internet? No problem. Use the app offline. It syncs automatically when you're back online."
                    })
                  ]
                }),
                c.jsxs("div", {
                  className: "p-4 bg-zinc-950 border border-zinc-800 rounded-xl",
                  children: [
                    c.jsx("div", {
                      className: "text-2xl mb-2",
                      children: "\u{1F4F1}"
                    }),
                    c.jsx("h4", {
                      className: "font-bold text-white mb-1",
                      children: "Install App"
                    }),
                    c.jsx("p", {
                      className: "text-xs text-zinc-500",
                      children: 'Install as a PWA on iOS or Android for a native app experience. Look for "Add to Home Screen".'
                    })
                  ]
                })
              ]
            })
          ]
        }),
        c.jsx("hr", {
          className: "border-zinc-800"
        }),
        c.jsxs("section", {
          className: "space-y-6",
          children: [
            c.jsxs("h3", {
              className: "text-2xl font-bold text-white flex items-center gap-3",
              children: [
                c.jsx("span", {
                  className: "text-4xl",
                  children: "\u{1F50D}"
                }),
                "Find Your Focus"
              ]
            }),
            c.jsxs("div", {
              className: "space-y-4",
              children: [
                c.jsx("p", {
                  className: "text-zinc-400 text-sm leading-relaxed",
                  children: "Navigate your tasks quickly with powerful filtering and sorting options."
                }),
                c.jsxs("div", {
                  className: "grid gap-4 sm:grid-cols-2",
                  children: [
                    c.jsxs("div", {
                      className: "bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-5",
                      children: [
                        c.jsx("h4", {
                          className: "text-lg font-bold text-white mb-2",
                          children: "Filtering"
                        }),
                        c.jsxs("ul", {
                          className: "space-y-2 text-sm text-zinc-400",
                          children: [
                            c.jsxs("li", {
                              children: [
                                "\u2022 Tap tags (e.g., ",
                                c.jsx("span", {
                                  className: "text-blue-400",
                                  children: "+Project"
                                }),
                                ") in the task list to filter instantly."
                              ]
                            }),
                            c.jsxs("li", {
                              children: [
                                "\u2022 Use the ",
                                c.jsx("strong", {
                                  children: "Filter Bar"
                                }),
                                " (top right) to drill down by priority, date, or context."
                              ]
                            }),
                            c.jsxs("li", {
                              children: [
                                "\u2022 Type in the search bar to filter by text or syntax (e.g. ",
                                c.jsx("code", {
                                  children: "prio:A"
                                }),
                                ")."
                              ]
                            })
                          ]
                        })
                      ]
                    }),
                    c.jsxs("div", {
                      className: "bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-5",
                      children: [
                        c.jsx("h4", {
                          className: "text-lg font-bold text-white mb-2",
                          children: "Sorting"
                        }),
                        c.jsxs("ul", {
                          className: "space-y-2 text-sm text-zinc-400",
                          children: [
                            c.jsxs("li", {
                              children: [
                                "\u2022 Click the ",
                                c.jsx("strong", {
                                  children: "Sort Icon"
                                }),
                                " (top right) to toggle between:"
                              ]
                            }),
                            c.jsx("li", {
                              className: "pl-4 text-zinc-500 text-xs",
                              children: "A-Z (Priority) \u2192 Creation Date \u2192 Due Date"
                            }),
                            c.jsx("li", {
                              children: "\u2022 Click again to reverse the order (Ascending/Descending)."
                            })
                          ]
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }),
        c.jsx("hr", {
          className: "border-zinc-800"
        }),
        c.jsxs("section", {
          className: "space-y-6",
          children: [
            c.jsxs("h3", {
              className: "text-2xl font-bold text-white flex items-center gap-3",
              children: [
                c.jsx("span", {
                  className: "text-4xl",
                  children: "\u{1F9E0}"
                }),
                "Workflows"
              ]
            }),
            c.jsxs("div", {
              className: "space-y-6",
              children: [
                c.jsxs("div", {
                  className: "bg-zinc-900/20 border border-zinc-800/50 rounded-2xl p-6",
                  children: [
                    c.jsx("h4", {
                      className: "text-xl font-bold text-white mb-2",
                      children: "Getting Things Done (GTD)"
                    }),
                    c.jsxs("p", {
                      className: "text-zinc-400 text-sm mb-4",
                      children: [
                        "Capture everything in your ",
                        c.jsx("strong", {
                          children: "Inbox"
                        }),
                        " (no project/context). Then process it:"
                      ]
                    }),
                    c.jsxs("ol", {
                      className: "list-decimal pl-5 space-y-2 text-sm text-zinc-300",
                      children: [
                        c.jsxs("li", {
                          children: [
                            c.jsx("strong", {
                              children: "Clarify:"
                            }),
                            " Add details. Is it actionable?"
                          ]
                        }),
                        c.jsxs("li", {
                          children: [
                            c.jsx("strong", {
                              children: "Organize:"
                            }),
                            " Assign a ",
                            c.jsx("code", {
                              children: "+Project"
                            }),
                            " or ",
                            c.jsx("code", {
                              children: "@Context"
                            }),
                            "."
                          ]
                        }),
                        c.jsxs("li", {
                          children: [
                            c.jsx("strong", {
                              children: "Review:"
                            }),
                            " Check your lists daily."
                          ]
                        })
                      ]
                    })
                  ]
                }),
                c.jsxs("div", {
                  className: "bg-zinc-900/20 border border-zinc-800/50 rounded-2xl p-6",
                  children: [
                    c.jsx("h4", {
                      className: "text-xl font-bold text-white mb-2",
                      children: "Eisenhower Matrix"
                    }),
                    c.jsx("p", {
                      className: "text-zinc-400 text-sm mb-4",
                      children: "Use priorities to distinguish urgent from important:"
                    }),
                    c.jsxs("ul", {
                      className: "space-y-2 text-sm",
                      children: [
                        c.jsxs("li", {
                          className: "flex gap-2",
                          children: [
                            c.jsx("span", {
                              className: "text-red-400 font-bold",
                              children: "(A)"
                            }),
                            " ",
                            c.jsx("span", {
                              className: "text-zinc-300",
                              children: "Urgent & Important (Do now)"
                            })
                          ]
                        }),
                        c.jsxs("li", {
                          className: "flex gap-2",
                          children: [
                            c.jsx("span", {
                              className: "text-orange-400 font-bold",
                              children: "(B)"
                            }),
                            " ",
                            c.jsx("span", {
                              className: "text-zinc-300",
                              children: "Important, not Urgent (Schedule)"
                            })
                          ]
                        }),
                        c.jsxs("li", {
                          className: "flex gap-2",
                          children: [
                            c.jsx("span", {
                              className: "text-blue-400 font-bold",
                              children: "(C)"
                            }),
                            " ",
                            c.jsx("span", {
                              className: "text-zinc-300",
                              children: "Urgent, not Important (Delegate)"
                            })
                          ]
                        }),
                        c.jsxs("li", {
                          className: "flex gap-2",
                          children: [
                            c.jsx("span", {
                              className: "text-zinc-500 font-bold",
                              children: "(D)"
                            }),
                            " ",
                            c.jsx("span", {
                              className: "text-zinc-300",
                              children: "Neither (Eliminate)"
                            })
                          ]
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }),
        c.jsx("hr", {
          className: "border-zinc-800"
        }),
        c.jsxs("section", {
          className: "space-y-6",
          children: [
            c.jsxs("h3", {
              className: "text-xl font-semibold text-white flex items-center gap-2",
              children: [
                c.jsx("span", {
                  className: "text-blue-500",
                  children: "\u2328\uFE0F"
                }),
                " Keyboard Shortcuts"
              ]
            }),
            c.jsx("div", {
              className: "bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden p-4 grid gap-x-8 gap-y-3 sm:grid-cols-2",
              children: [
                {
                  label: "New Task",
                  keys: [
                    "N"
                  ]
                },
                {
                  label: "Focus Search",
                  keys: [
                    "/"
                  ]
                },
                {
                  label: "Edit Task",
                  keys: [
                    "Enter"
                  ]
                },
                {
                  label: "Complete Task",
                  keys: [
                    "x",
                    "Space"
                  ]
                },
                {
                  label: "Delete Task",
                  keys: [
                    "Del"
                  ]
                },
                {
                  label: "Move Selection",
                  keys: [
                    "\u2191",
                    "\u2193"
                  ]
                },
                {
                  label: "Change Priority",
                  keys: [
                    "\u2190",
                    "\u2192"
                  ]
                },
                {
                  label: "Select Range",
                  keys: [
                    "Shift",
                    "\u2191/\u2193"
                  ]
                },
                {
                  label: "Select/Deselect",
                  keys: [
                    "Shift",
                    "\u2192/\u2190"
                  ]
                },
                {
                  label: "Multi-Line",
                  keys: [
                    "Shift",
                    "Enter"
                  ]
                },
                {
                  label: "Undo",
                  keys: [
                    "\u2318",
                    "Z"
                  ]
                },
                {
                  label: "Redo",
                  keys: [
                    "\u2318",
                    "\u21E7",
                    "Z"
                  ]
                },
                {
                  label: "Close Modal",
                  keys: [
                    "Esc"
                  ]
                }
              ].map((t, l) => c.jsxs("div", {
                className: "flex justify-between items-center py-1 border-b border-zinc-800/30 last:border-0 sm:last:border-0 sm:even:border-b-0",
                children: [
                  c.jsx("span", {
                    className: "text-sm text-zinc-400",
                    children: t.label
                  }),
                  c.jsx("div", {
                    className: "flex gap-1",
                    children: t.keys.map((n) => c.jsx("kbd", {
                      className: "min-w-[24px] text-center px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px] font-mono text-zinc-300 shadow-sm",
                      children: n
                    }, n))
                  })
                ]
              }, l))
            })
          ]
        })
      ]
    });
  }
  const yg = "/assets/logo-sV1hvh_m.png";
  function zg() {
    const [e, t] = C.useState(ie.getTasks()), [l, n] = C.useState({
      type: "inbox"
    }), [a, i] = C.useState(false), [s, u] = C.useState(null), [o, d] = C.useState(null), [g, p] = C.useState(false), [m, x] = C.useState("tasks"), [j, z] = C.useState({
      isOpen: false,
      onSelect: null
    }), A = (S) => {
      z({
        isOpen: true,
        onSelect: S
      });
    }, [f, r] = C.useState("priority"), [h, v] = C.useState(null), [T, L] = C.useState("include"), y = (S) => {
      v((H) => H === S ? null : S);
    }, w = (S) => {
      ie.loadFromString(S);
    }, [b, N] = C.useState(() => localStorage.getItem("setting_archiveCompleted") === "true"), E = () => {
      N((S) => {
        const H = !S;
        return localStorage.setItem("setting_archiveCompleted", H), H;
      });
    }, [M, k] = C.useState(() => localStorage.getItem("setting_syncMode") || "auto"), U = (S) => {
      k(S), localStorage.setItem("setting_syncMode", S);
    }, { isAuthenticated: V, isSyncing: D, login: B, syncPushDrive: O, syncPullDrive: Q, syncPushTasks: $, syncPullTasks: Oe, checkForRemoteUpdates: dt } = cg(w), { isAuthenticated: Xe, isSyncing: _t, login: Ql, syncPush: io, syncPull: X0, lastSyncTime: Z0, checkForRemoteUpdates: gc } = ug(w, b);
    C.useEffect(() => {
      const S = ie.subscribe((H) => {
        t([
          ...H
        ]);
      });
      return ie.init(), () => {
        ie.unsubscribe(S);
      };
    }, []);
    const [yl, Vt] = C.useState(""), [V0, co] = C.useState(0), [vc, bc] = C.useState(null), so = (S) => {
      bc(S), Vt(S.raw), co((H) => H + 1);
    }, K0 = () => {
      bc(null), Vt("");
    }, J0 = (S) => {
      S.trim() && (vc ? (ie.updateTask(vc.id, S), bc(null), Vt("")) : (ie.addTask(S), Vt("")));
    };
    C.useEffect(() => {
      if (M === "auto" && e.length > 0) {
        const S = setTimeout(() => {
          Xe && (console.log("\u2601\uFE0F Auto-Syncing to Dropbox..."), io(e)), V && (console.log("\u2601\uFE0F Auto-Syncing to Google Drive..."), O(e));
        }, 3e3);
        return () => clearTimeout(S);
      }
    }, [
      e,
      Xe,
      V,
      M
    ]), C.useEffect(() => {
      if (M !== "auto") return;
      const S = () => {
        if (Date.now() - ie.lastModificationTime < 1e4) {
          console.log("\u23F3 Skipping Auto-Pull (User is active)...");
          return;
        }
        V && dt && (console.log("\u{1F50D} Auto-Pull Check (GDrive)..."), dt()), Xe && gc && (console.log("\u{1F50D} Auto-Pull Check (Dropbox)..."), gc());
      }, H = setInterval(S, 6e4), X = () => {
        document.visibilityState === "visible" && (console.log("\u{1F440} Window Focused - Checking for updates..."), S());
      };
      return document.addEventListener("visibilitychange", X), () => {
        clearInterval(H), document.removeEventListener("visibilitychange", X);
      };
    }, [
      V,
      Xe,
      dt,
      gc
    ]);
    const Ba = C.useMemo(() => {
      let S = e;
      if (yl.trim() && (S = rg(S, yl)), l) switch (l.type) {
        case "today":
          const H = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          S = S.filter((G) => G.metadata && G.metadata.due === H);
          break;
        case "upcoming":
          const X = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          S = S.filter((G) => G.metadata && G.metadata.due > X);
          break;
        case "overdue":
          const R = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          S = S.filter((G) => G.metadata && G.metadata.due && G.metadata.due < R && !G.completed);
          break;
        case "project":
          S = S.filter((G) => G.projects && G.projects.includes(l.value));
          break;
        case "context":
          S = S.filter((G) => G.contexts && G.contexts.includes(l.value));
          break;
        case "tag":
          S = S.filter((G) => G.tags && G.tags.includes(l.value));
          break;
        case "priority":
          S = S.filter((G) => G.priority === l.value);
          break;
      }
      return pg(S, f);
    }, [
      e,
      l,
      yl,
      f
    ]), uo = (S, H) => {
      let X = "", R = "";
      S === "project" ? X = "+" : S === "context" ? X = "@" : S === "tag" ? X = "#" : S === "priority" ? R = `(${H})` : S === "alpha" ? R = `^${H}` : S === "date" && (X = "due:"), R || (R = `${X}${H}`), T === "exclude" && (R = `-${R}`), Vt((G) => {
        const Ne = G ? G.trim().split(/\s+/) : [];
        return Ne.includes(R) ? Ne.filter((gt) => gt !== R).join(" ") : [
          ...Ne,
          R
        ].join(" ");
      });
    }, La = C.useMemo(() => [
      ...new Set(e.flatMap((S) => S.projects || []))
    ].sort(), [
      e
    ]), Ha = C.useMemo(() => [
      ...new Set(e.flatMap((S) => S.contexts || []))
    ].sort(), [
      e
    ]), Ra = C.useMemo(() => [
      ...new Set(e.flatMap((S) => S.tags || []))
    ].sort(), [
      e
    ]), [tt, pt] = C.useState(/* @__PURE__ */ new Set()), [yc, $0] = C.useState(null), W0 = (S, H) => {
      let X = new Set(tt);
      if (H && H.shiftKey && yc && yc !== S) {
        const R = Ba, G = R.findIndex((de) => de.id === yc), Ne = R.findIndex((de) => de.id === S);
        if (G !== -1 && Ne !== -1) {
          const de = Math.min(G, Ne), gt = Math.max(G, Ne);
          for (let jl = de; jl <= gt; jl++) X.add(R[jl].id);
        }
      } else X.has(S) ? X.delete(S) : X.add(S), $0(S);
      pt(X);
    }, F0 = () => {
      const S = Ba.map((R) => R.id), H = S.every((R) => tt.has(R)), X = new Set(tt);
      H ? S.forEach((R) => X.delete(R)) : S.forEach((R) => X.add(R)), pt(X);
    }, I0 = () => {
      e.filter((H) => tt.has(H.id)).forEach((H) => {
        H.completed || ie.toggleTask(H.id);
      }), pt(/* @__PURE__ */ new Set());
    }, P0 = () => {
      window.confirm(`Delete ${tt.size} tasks?`) && (Array.from(tt).forEach((S) => ie.deleteTask(S)), pt(/* @__PURE__ */ new Set()));
    }, eh = (S) => {
      Array.from(tt).forEach((H) => ie.setTaskPriority(H, S));
    }, th = (S) => {
      Array.from(tt).forEach((H) => {
        const X = e.find((R) => R.id === H);
        if (X) {
          let R = X.raw;
          const G = /\bdue:\S+/g;
          G.test(R) ? R = R.replace(G, `due:${S}`) : R = `${R} due:${S}`, ie.updateTask(H, R);
        }
      }), pt(/* @__PURE__ */ new Set());
    }, lh = (S) => {
      if (!S.trim()) return;
      const H = S.trim().split(/\s+/), X = [], R = [];
      H.forEach((G) => {
        G.startsWith("-+") || G.startsWith("-@") || G.startsWith("-#") ? R.push(G.substring(1)) : X.push(G);
      }), Array.from(tt).forEach((G) => {
        const Ne = e.find((de) => de.id === G);
        if (Ne) {
          let de = Ne.raw;
          if (R.forEach((gt) => {
            const jl = gt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), ih = new RegExp(`\\s*${jl}\\b`, "g");
            de = de.replace(ih, "");
          }), X.length > 0) {
            const gt = X.join(" ");
            de = `${de} ${gt}`;
          }
          de = de.replace(/\s+/g, " ").trim(), de !== Ne.raw && ie.updateTask(G, de);
        }
      }), pt(/* @__PURE__ */ new Set());
    };
    og({
      tasks: Ba,
      focusedTaskId: s,
      setFocusedTaskId: u,
      setSearchFocus: () => co((S) => S + 1),
      onTaskComplete: (S) => {
        ie.toggleTask(S);
      },
      onTaskDelete: (S) => ie.deleteTask(S),
      onTasksDelete: (S) => {
        ie.deleteTasks(S), pt(/* @__PURE__ */ new Set());
      },
      onTaskEdit: (S) => {
        const H = e.find((X) => X.id === S);
        H && so(H);
      },
      onRedo: () => ie.redo(),
      onClearSelection: () => pt(/* @__PURE__ */ new Set()),
      selectedTaskIds: tt,
      onSelectTask: (S, H = true) => {
        pt((X) => {
          const R = new Set(X);
          return H ? R.add(S) : R.delete(S), R;
        });
      },
      onTaskPriority: (S, H) => {
        const X = e.find((gt) => gt.id === S);
        if (!X) return;
        if ([
          "A",
          "B",
          "C",
          null
        ].includes(H)) {
          ie.setTaskPriority(S, H);
          return;
        }
        const G = [
          ...Array.from({
            length: 26
          }, (gt, jl) => String.fromCharCode(65 + jl)),
          null
        ];
        let Ne = G.indexOf(X.priority || null);
        Ne === -1 && (Ne = G.length - 1);
        let de = Ne;
        H === "up" && (de = (Ne + 1) % G.length), H === "down" && (de = (Ne - 1 + G.length) % G.length), de !== Ne && ie.setTaskPriority(S, G[de]);
      },
      onUndo: () => ie.undo(),
      clearFilters: () => {
        Vt(""), n({
          type: "inbox"
        }), p(false);
      }
    });
    const Xl = (S) => {
      if (S === "alpha-asc") {
        r(f === "alpha-asc" ? "alpha-desc" : "alpha-asc");
        return;
      }
      f === S ? r(`${S}-desc`) : (`${S}`, r(S));
    }, zl = ({ icon: S, label: H, value: X, isActive: R, onClick: G }) => c.jsx("button", {
      onClick: G,
      title: H,
      className: `whitespace-nowrap p-2 rounded-lg text-xs font-medium transition-colors border ${R ? "bg-zinc-100 text-zinc-900 border-zinc-100" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300"}`,
      children: c.jsxs("div", {
        className: "flex items-center justify-center gap-1",
        children: [
          S,
          R && f.includes("desc") && c.jsx("span", {
            className: "opacity-60 text-[10px]",
            children: "\u2193"
          }),
          R && !f.includes("desc") && !f.includes("none") && c.jsx("span", {
            className: "opacity-60 text-[10px]",
            children: "\u2191"
          })
        ]
      })
    }), nh = () => {
      const S = ie.dumpToString(), H = new Blob([
        S
      ], {
        type: "text/plain"
      }), X = URL.createObjectURL(H), R = document.createElement("a");
      R.href = X, R.download = "todo.txt", document.body.appendChild(R), R.click(), document.body.removeChild(R), URL.revokeObjectURL(X);
    }, ah = (S) => {
      if (!S) return;
      const H = new FileReader();
      H.onload = (X) => {
        const R = X.target.result;
        ie.loadFromString(R);
      }, H.readAsText(S);
    };
    return c.jsxs(c.Fragment, {
      children: [
        c.jsxs("div", {
          className: "flex flex-col h-[100dvh]",
          children: [
            c.jsx(ip, {}),
            m === "tasks" && c.jsxs("div", {
              className: "bg-zinc-950 border-b border-zinc-800 flex flex-col pt-[max(env(safe-area-inset-top),16px)] z-30 relative shrink-0",
              children: [
                c.jsxs("div", {
                  className: "flex items-center justify-between px-4 pb-2",
                  children: [
                    c.jsxs("div", {
                      className: "flex items-center gap-3",
                      children: [
                        c.jsx("img", {
                          src: yg,
                          alt: "todotext.de",
                          className: "w-8 h-8"
                        }),
                        c.jsx("h2", {
                          className: "text-lg font-semibold text-zinc-300",
                          children: "todotext.de"
                        })
                      ]
                    }),
                    c.jsxs("div", {
                      className: "flex items-center gap-3 text-[10px] text-zinc-600",
                      children: [
                        c.jsx("button", {
                          onClick: () => x("faq"),
                          className: "p-1.5 hover:bg-zinc-800 rounded-full text-zinc-500 hover:text-zinc-300 transition-colors",
                          title: "Help & FAQ",
                          children: c.jsx("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            children: c.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            })
                          })
                        }),
                        c.jsx("a", {
                          href: "/datenschutz.html",
                          className: "hover:text-zinc-400 transition-colors hidden sm:block",
                          children: "Datenschutz"
                        }),
                        c.jsx("a", {
                          href: "/impressum.html",
                          className: "hover:text-zinc-400 transition-colors hidden sm:block",
                          children: "Impressum"
                        })
                      ]
                    })
                  ]
                }),
                c.jsx(lg, {
                  searchValue: yl,
                  onSearch: Vt,
                  onQuickAdd: J0,
                  onMenuClick: () => i(true),
                  onSettingsClick: () => p(true),
                  focusTrigger: V0,
                  activeFilter: l,
                  onClearFilter: () => n({
                    type: "inbox"
                  }),
                  projects: La,
                  contexts: Ha,
                  tags: Ra,
                  onOpenCalendar: A,
                  isEditing: !!vc,
                  onCancelEdit: K0
                }),
                yl.trim() && c.jsx("div", {
                  className: "flex flex-wrap gap-2 px-4 py-2 animate-in fade-in zoom-in-95 duration-200",
                  children: yl.trim().split(/\s+/).map((S, H) => c.jsxs("div", {
                    className: "flex items-center gap-1 bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1 text-xs text-zinc-300",
                    children: [
                      c.jsx("span", {
                        className: "font-medium",
                        children: S
                      }),
                      c.jsx("button", {
                        onClick: () => {
                          const X = yl.trim().split(/\s+/).filter((R, G) => G !== H).join(" ");
                          Vt(X);
                        },
                        className: "ml-1 p-0.5 rounded-full hover:bg-zinc-700 text-zinc-500 hover:text-red-400 transition-colors",
                        children: c.jsx("svg", {
                          className: "w-3 h-3",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          children: c.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M6 18L18 6M6 6l12 12"
                          })
                        })
                      })
                    ]
                  }, H))
                }),
                c.jsxs("div", {
                  className: "max-w-2xl mx-auto w-full px-4 py-2 flex items-start gap-2 overflow-x-auto no-scrollbar",
                  children: [
                    c.jsxs("div", {
                      className: "flex flex-col gap-1 min-w-max",
                      children: [
                        c.jsx(zl, {
                          label: "Default",
                          value: "none",
                          isActive: f === "none",
                          onClick: () => r("none"),
                          icon: c.jsx("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: c.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M4 6h16M4 12h16M4 18h7"
                            })
                          })
                        }),
                        c.jsx("button", {
                          onClick: () => L((S) => S === "include" ? "exclude" : "include"),
                          className: `w-full h-6 flex items-center justify-center rounded-md transition-colors font-bold text-xs ${T === "include" ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : "bg-red-500/10 text-red-500 hover:bg-red-500/20"}`,
                          title: T === "include" ? "Current Mode: Include (+)" : "Current Mode: Exclude (-)",
                          children: T === "include" ? "+" : "-"
                        })
                      ]
                    }),
                    c.jsxs("div", {
                      className: "flex flex-col gap-1 min-w-max",
                      children: [
                        c.jsx(zl, {
                          label: "Priority",
                          value: "priority",
                          isActive: f.startsWith("priority"),
                          onClick: () => Xl("priority"),
                          icon: c.jsx("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: c.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            })
                          })
                        }),
                        c.jsx("button", {
                          onClick: () => y("priority"),
                          className: `w-full h-6 flex items-center justify-center rounded-md transition-colors ${h === "priority" ? "bg-zinc-800 text-white" : "text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300"}`,
                          children: c.jsx("svg", {
                            className: `w-3 h-3 transition-transform ${h === "priority" ? "rotate-180" : ""}`,
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: c.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M19 9l-7 7-7-7"
                            })
                          })
                        })
                      ]
                    }),
                    c.jsxs("div", {
                      className: "flex flex-col gap-1 min-w-max",
                      children: [
                        c.jsx(zl, {
                          label: "Project",
                          value: "project",
                          isActive: f.startsWith("project"),
                          onClick: () => Xl("project"),
                          icon: c.jsx("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: c.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M12 4v16m8-8H4"
                            })
                          })
                        }),
                        c.jsx("button", {
                          onClick: () => y("project"),
                          className: `w-full h-6 flex items-center justify-center rounded-md transition-colors ${h === "project" ? "bg-zinc-800 text-white" : "text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300"}`,
                          children: c.jsx("svg", {
                            className: `w-3 h-3 transition-transform ${h === "project" ? "rotate-180" : ""}`,
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: c.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M19 9l-7 7-7-7"
                            })
                          })
                        })
                      ]
                    }),
                    c.jsxs("div", {
                      className: "flex flex-col gap-1 min-w-max",
                      children: [
                        c.jsx(zl, {
                          label: "Context",
                          value: "context",
                          isActive: f.startsWith("context"),
                          onClick: () => Xl("context"),
                          icon: c.jsx("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: c.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            })
                          })
                        }),
                        c.jsx("button", {
                          onClick: () => y("context"),
                          className: `w-full h-6 flex items-center justify-center rounded-md transition-colors ${h === "context" ? "bg-zinc-800 text-white" : "text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300"}`,
                          children: c.jsx("svg", {
                            className: `w-3 h-3 transition-transform ${h === "context" ? "rotate-180" : ""}`,
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: c.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M19 9l-7 7-7-7"
                            })
                          })
                        })
                      ]
                    }),
                    c.jsxs("div", {
                      className: "flex flex-col gap-1 min-w-max",
                      children: [
                        c.jsx(zl, {
                          label: "Tag",
                          value: "tag",
                          isActive: f.startsWith("tag"),
                          onClick: () => Xl("tag"),
                          icon: c.jsx("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: c.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                            })
                          })
                        }),
                        c.jsx("button", {
                          onClick: () => y("tag"),
                          className: `w-full h-6 flex items-center justify-center rounded-md transition-colors ${h === "tag" ? "bg-zinc-800 text-white" : "text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300"}`,
                          children: c.jsx("svg", {
                            className: `w-3 h-3 transition-transform ${h === "tag" ? "rotate-180" : ""}`,
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: c.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M19 9l-7 7-7-7"
                            })
                          })
                        })
                      ]
                    }),
                    c.jsxs("div", {
                      className: "flex flex-col gap-1 min-w-max",
                      children: [
                        c.jsx(zl, {
                          label: "Due Date",
                          value: "due",
                          isActive: f.startsWith("due"),
                          onClick: () => Xl("due"),
                          icon: c.jsx("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: c.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            })
                          })
                        }),
                        c.jsx("button", {
                          onClick: () => y("date"),
                          className: `w-full h-6 flex items-center justify-center rounded-md transition-colors ${h === "date" ? "bg-zinc-800 text-white" : "text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300"}`,
                          children: c.jsx("svg", {
                            className: `w-3 h-3 transition-transform ${h === "date" ? "rotate-180" : ""}`,
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: c.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M19 9l-7 7-7-7"
                            })
                          })
                        })
                      ]
                    }),
                    c.jsxs("div", {
                      className: "flex flex-col gap-1 min-w-max",
                      children: [
                        c.jsx(zl, {
                          label: "A-Z",
                          value: "alpha",
                          isActive: f.startsWith("alpha"),
                          onClick: () => Xl("alpha-asc"),
                          icon: c.jsx("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: c.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                            })
                          })
                        }),
                        c.jsx("button", {
                          onClick: () => y("alpha"),
                          className: `w-full h-6 flex items-center justify-center rounded-md transition-colors ${h === "alpha" ? "bg-zinc-800 text-white" : "text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300"}`,
                          children: c.jsx("svg", {
                            className: `w-3 h-3 transition-transform ${h === "alpha" ? "rotate-180" : ""}`,
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: c.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M19 9l-7 7-7-7"
                            })
                          })
                        })
                      ]
                    })
                  ]
                }),
                c.jsx(ng, {
                  projects: La,
                  contexts: Ha,
                  tags: Ra,
                  activeFilter: l,
                  onFilterSelect: (S) => {
                    [
                      "project",
                      "context",
                      "tag",
                      "priority",
                      "alpha"
                    ].includes(S.type) ? uo(S.type, S.value) : n(S);
                  },
                  openCategory: h,
                  onClose: () => v(null)
                }),
                c.jsx(tg, {
                  selectedCount: tt.size,
                  onDeselectAll: () => pt(/* @__PURE__ */ new Set()),
                  onCompleteAll: I0,
                  onDeleteAll: P0,
                  onSetPriority: eh,
                  onSetDate: () => A(th),
                  onBulkAdd: lh
                })
              ]
            }),
            c.jsxs("div", {
              className: "flex flex-1 overflow-hidden relative",
              children: [
                c.jsx(mg, {
                  isOpen: g,
                  onClose: () => p(false),
                  onSyncClick: () => V ? O(e) : B(),
                  onPullClick: Q,
                  isSyncing: D,
                  isAuthenticated: V,
                  onDropboxSync: () => Xe ? io(e) : Ql(),
                  onDropboxPull: X0,
                  isDropboxAuth: Xe,
                  isDropboxSyncing: _t,
                  dropboxLastSync: Z0,
                  archiveCompleted: b,
                  onToggleArchive: E,
                  syncMode: M,
                  onSyncModeChange: U,
                  onExport: nh,
                  onImport: ah,
                  onGTasksSync: () => V ? $(e) : B(),
                  onGTasksPull: Oe,
                  onClearAll: () => {
                    window.confirm(`Are you sure you want to delete all ${e.length} tasks? This cannot be undone (but you can undo with Cmd+Z).`) && ie.clearAllTasks();
                  }
                }),
                c.jsx("main", {
                  id: "main-content",
                  className: "flex-1 overflow-y-auto bg-zinc-950 flex justify-center transition-colors pb-32",
                  children: c.jsx("div", {
                    className: "w-full max-w-2xl px-4 sm:px-6 md:px-8 pt-2 pb-6",
                    children: c.jsx("div", {
                      className: "space-y-2",
                      children: m === "impressum" ? c.jsx(gg, {
                        onBack: () => x("tasks")
                      }) : m === "datenschutz" ? c.jsx(vg, {
                        onBack: () => x("tasks")
                      }) : m === "faq" ? c.jsx(bg, {
                        onBack: () => x("tasks")
                      }) : c.jsx(eg, {
                        tasks: Ba,
                        activeFilter: l,
                        selectedTaskIds: tt,
                        onTaskSelect: W0,
                        onSelectAll: F0,
                        focusedTaskId: s,
                        onTaskFocus: u,
                        editingTaskId: o,
                        onEdit: so,
                        onEditEnd: (S) => {
                          d(null), S && u(S);
                        },
                        projects: La,
                        contexts: Ha,
                        tags: Ra,
                        onOpenCalendar: A,
                        onFilterClick: uo
                      })
                    })
                  })
                }),
                c.jsx(dp, {
                  activeFilter: l,
                  onFilterSelect: n,
                  projects: La,
                  contexts: Ha,
                  tags: Ra,
                  tasks: e,
                  isOpen: a,
                  onClose: () => i(false),
                  onPageNavigate: x,
                  syncMode: M,
                  onSyncModeChange: U
                })
              ]
            })
          ]
        }),
        j.isOpen && c.jsx(xg, {
          onSelect: (S) => {
            j.onSelect && j.onSelect(S), z({
              ...j,
              isOpen: false
            });
          },
          onClose: () => z({
            ...j,
            isOpen: false
          })
        })
      ]
    });
  }
  const jg = "modulepreload", Sg = function(e) {
    return "/" + e;
  }, Rr = {}, Ng = function(t, l, n) {
    let a = Promise.resolve();
    if (l && l.length > 0) {
      document.getElementsByTagName("link");
      const s = document.querySelector("meta[property=csp-nonce]"), u = (s == null ? void 0 : s.nonce) || (s == null ? void 0 : s.getAttribute("nonce"));
      a = Promise.allSettled(l.map((o) => {
        if (o = Sg(o), o in Rr) return;
        Rr[o] = true;
        const d = o.endsWith(".css"), g = d ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${o}"]${g}`)) return;
        const p = document.createElement("link");
        if (p.rel = d ? "stylesheet" : jg, d || (p.as = "script"), p.crossOrigin = "", p.href = o, u && p.setAttribute("nonce", u), document.head.appendChild(p), d) return new Promise((m, x) => {
          p.addEventListener("load", m), p.addEventListener("error", () => x(new Error(`Unable to preload CSS for ${o}`)));
        });
      }));
    }
    function i(s) {
      const u = new Event("vite:preloadError", {
        cancelable: true
      });
      if (u.payload = s, window.dispatchEvent(u), !u.defaultPrevented) throw s;
    }
    return a.then((s) => {
      for (const u of s || []) u.status === "rejected" && i(u.reason);
      return t().catch(i);
    });
  };
  function _g(e = {}) {
    const { immediate: t = false, onNeedRefresh: l, onOfflineReady: n, onRegistered: a, onRegisteredSW: i, onRegisterError: s } = e;
    let u, o;
    const d = async (p = true) => {
      await o;
    };
    async function g() {
      if ("serviceWorker" in navigator) {
        if (u = await Ng(async () => {
          const { Workbox: p } = await import("./workbox-window.prod.es5-vqzQaGvo.js");
          return {
            Workbox: p
          };
        }, []).then(({ Workbox: p }) => new p("/sw.js", {
          scope: "/",
          type: "classic"
        })).catch((p) => {
          s == null ? void 0 : s(p);
        }), !u) return;
        u.addEventListener("activated", (p) => {
          (p.isUpdate || p.isExternal) && window.location.reload();
        }), u.addEventListener("installed", (p) => {
          p.isUpdate || (n == null ? void 0 : n());
        }), u.register({
          immediate: t
        }).then((p) => {
          i ? i("/sw.js", p) : a == null ? void 0 : a(p);
        }).catch((p) => {
          s == null ? void 0 : s(p);
        });
      }
    }
    return o = g(), d;
  }
  _g({
    immediate: true
  });
  ap.createRoot(document.getElementById("root")).render(c.jsx(zg, {}));
})();
