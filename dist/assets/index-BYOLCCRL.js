(function() {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) a(n);
  new MutationObserver((n) => {
    for (const u of n) if (u.type === "childList") for (const i of u.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && a(i);
  }).observe(document, { childList: true, subtree: true });
  function l(n) {
    const u = {};
    return n.integrity && (u.integrity = n.integrity), n.referrerPolicy && (u.referrerPolicy = n.referrerPolicy), n.crossOrigin === "use-credentials" ? u.credentials = "include" : n.crossOrigin === "anonymous" ? u.credentials = "omit" : u.credentials = "same-origin", u;
  }
  function a(n) {
    if (n.ep) return;
    n.ep = true;
    const u = l(n);
    fetch(n.href, u);
  }
})();
var fo = { exports: {} }, Uu = {};
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var h0 = Symbol.for("react.transitional.element"), y0 = Symbol.for("react.fragment");
function oo(t, e, l) {
  var a = null;
  if (l !== void 0 && (a = "" + l), e.key !== void 0 && (a = "" + e.key), "key" in e) {
    l = {};
    for (var n in e) n !== "key" && (l[n] = e[n]);
  } else l = e;
  return e = l.ref, { $$typeof: h0, type: t, key: a, ref: e !== void 0 ? e : null, props: l };
}
Uu.Fragment = y0;
Uu.jsx = oo;
Uu.jsxs = oo;
fo.exports = Uu;
var s = fo.exports, ro = { exports: {} }, Cu = {}, mo = { exports: {} }, ho = {};
/**
* @license React
* scheduler.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
(function(t) {
  function e(T, R) {
    var M = T.length;
    T.push(R);
    t: for (; 0 < M; ) {
      var K = M - 1 >>> 1, J = T[K];
      if (0 < n(J, R)) T[K] = R, T[M] = J, M = K;
      else break t;
    }
  }
  function l(T) {
    return T.length === 0 ? null : T[0];
  }
  function a(T) {
    if (T.length === 0) return null;
    var R = T[0], M = T.pop();
    if (M !== R) {
      T[0] = M;
      t: for (var K = 0, J = T.length, jt = J >>> 1; K < jt; ) {
        var ve = 2 * (K + 1) - 1, Ye = T[ve], xe = ve + 1, U = T[xe];
        if (0 > n(Ye, M)) xe < J && 0 > n(U, Ye) ? (T[K] = U, T[xe] = M, K = xe) : (T[K] = Ye, T[ve] = M, K = ve);
        else if (xe < J && 0 > n(U, M)) T[K] = U, T[xe] = M, K = xe;
        else break t;
      }
    }
    return R;
  }
  function n(T, R) {
    var M = T.sortIndex - R.sortIndex;
    return M !== 0 ? M : T.id - R.id;
  }
  if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
    var u = performance;
    t.unstable_now = function() {
      return u.now();
    };
  } else {
    var i = Date, c = i.now();
    t.unstable_now = function() {
      return i.now() - c;
    };
  }
  var f = [], h = [], v = 1, g = null, d = 3, y = false, j = false, z = false, O = false, r = typeof setTimeout == "function" ? setTimeout : null, o = typeof clearTimeout == "function" ? clearTimeout : null, m = typeof setImmediate < "u" ? setImmediate : null;
  function x(T) {
    for (var R = l(h); R !== null; ) {
      if (R.callback === null) a(h);
      else if (R.startTime <= T) a(h), R.sortIndex = R.expirationTime, e(f, R);
      else break;
      R = l(h);
    }
  }
  function N(T) {
    if (z = false, x(T), !j) if (l(f) !== null) j = true, _ || (_ = true, E());
    else {
      var R = l(h);
      R !== null && gt(N, R.startTime - T);
    }
  }
  var _ = false, b = -1, A = 5, D = -1;
  function S() {
    return O ? true : !(t.unstable_now() - D < A);
  }
  function Y() {
    if (O = false, _) {
      var T = t.unstable_now();
      D = T;
      var R = true;
      try {
        t: {
          j = false, z && (z = false, o(b), b = -1), y = true;
          var M = d;
          try {
            e: {
              for (x(T), g = l(f); g !== null && !(g.expirationTime > T && S()); ) {
                var K = g.callback;
                if (typeof K == "function") {
                  g.callback = null, d = g.priorityLevel;
                  var J = K(g.expirationTime <= T);
                  if (T = t.unstable_now(), typeof J == "function") {
                    g.callback = J, x(T), R = true;
                    break e;
                  }
                  g === l(f) && a(f), x(T);
                } else a(f);
                g = l(f);
              }
              if (g !== null) R = true;
              else {
                var jt = l(h);
                jt !== null && gt(N, jt.startTime - T), R = false;
              }
            }
            break t;
          } finally {
            g = null, d = M, y = false;
          }
          R = void 0;
        }
      } finally {
        R ? E() : _ = false;
      }
    }
  }
  var E;
  if (typeof m == "function") E = function() {
    m(Y);
  };
  else if (typeof MessageChannel < "u") {
    var C = new MessageChannel(), W = C.port2;
    C.port1.onmessage = Y, E = function() {
      W.postMessage(null);
    };
  } else E = function() {
    r(Y, 0);
  };
  function gt(T, R) {
    b = r(function() {
      T(t.unstable_now());
    }, R);
  }
  t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(T) {
    T.callback = null;
  }, t.unstable_forceFrameRate = function(T) {
    0 > T || 125 < T ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : A = 0 < T ? Math.floor(1e3 / T) : 5;
  }, t.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, t.unstable_next = function(T) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var R = 3;
        break;
      default:
        R = d;
    }
    var M = d;
    d = R;
    try {
      return T();
    } finally {
      d = M;
    }
  }, t.unstable_requestPaint = function() {
    O = true;
  }, t.unstable_runWithPriority = function(T, R) {
    switch (T) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        T = 3;
    }
    var M = d;
    d = T;
    try {
      return R();
    } finally {
      d = M;
    }
  }, t.unstable_scheduleCallback = function(T, R, M) {
    var K = t.unstable_now();
    switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? K + M : K) : M = K, T) {
      case 1:
        var J = -1;
        break;
      case 2:
        J = 250;
        break;
      case 5:
        J = 1073741823;
        break;
      case 4:
        J = 1e4;
        break;
      default:
        J = 5e3;
    }
    return J = M + J, T = { id: v++, callback: R, priorityLevel: T, startTime: M, expirationTime: J, sortIndex: -1 }, M > K ? (T.sortIndex = M, e(h, T), l(f) === null && T === l(h) && (z ? (o(b), b = -1) : z = true, gt(N, M - K))) : (T.sortIndex = J, e(f, T), j || y || (j = true, _ || (_ = true, E()))), T;
  }, t.unstable_shouldYield = S, t.unstable_wrapCallback = function(T) {
    var R = d;
    return function() {
      var M = d;
      d = R;
      try {
        return T.apply(this, arguments);
      } finally {
        d = M;
      }
    };
  };
})(ho);
mo.exports = ho;
var g0 = mo.exports, yo = { exports: {} }, G = {};
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Cc = Symbol.for("react.transitional.element"), v0 = Symbol.for("react.portal"), x0 = Symbol.for("react.fragment"), p0 = Symbol.for("react.strict_mode"), b0 = Symbol.for("react.profiler"), S0 = Symbol.for("react.consumer"), z0 = Symbol.for("react.context"), j0 = Symbol.for("react.forward_ref"), N0 = Symbol.for("react.suspense"), T0 = Symbol.for("react.memo"), go = Symbol.for("react.lazy"), A0 = Symbol.for("react.activity"), Hs = Symbol.iterator;
function E0(t) {
  return t === null || typeof t != "object" ? null : (t = Hs && t[Hs] || t["@@iterator"], typeof t == "function" ? t : null);
}
var vo = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, xo = Object.assign, po = {};
function ga(t, e, l) {
  this.props = t, this.context = e, this.refs = po, this.updater = l || vo;
}
ga.prototype.isReactComponent = {};
ga.prototype.setState = function(t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, t, e, "setState");
};
ga.prototype.forceUpdate = function(t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function bo() {
}
bo.prototype = ga.prototype;
function Hc(t, e, l) {
  this.props = t, this.context = e, this.refs = po, this.updater = l || vo;
}
var Bc = Hc.prototype = new bo();
Bc.constructor = Hc;
xo(Bc, ga.prototype);
Bc.isPureReactComponent = true;
var Bs = Array.isArray;
function Gi() {
}
var ut = { H: null, A: null, T: null, S: null }, So = Object.prototype.hasOwnProperty;
function Rc(t, e, l) {
  var a = l.ref;
  return { $$typeof: Cc, type: t, key: e, ref: a !== void 0 ? a : null, props: l };
}
function D0(t, e) {
  return Rc(t.type, e, t.props);
}
function Gc(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Cc;
}
function _0(t) {
  var e = { "=": "=0", ":": "=2" };
  return "$" + t.replace(/[=:]/g, function(l) {
    return e[l];
  });
}
var Rs = /\/+/g;
function Iu(t, e) {
  return typeof t == "object" && t !== null && t.key != null ? _0("" + t.key) : e.toString(36);
}
function O0(t) {
  switch (t.status) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw t.reason;
    default:
      switch (typeof t.status == "string" ? t.then(Gi, Gi) : (t.status = "pending", t.then(function(e) {
        t.status === "pending" && (t.status = "fulfilled", t.value = e);
      }, function(e) {
        t.status === "pending" && (t.status = "rejected", t.reason = e);
      })), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw t.reason;
      }
  }
  throw t;
}
function Gl(t, e, l, a, n) {
  var u = typeof t;
  (u === "undefined" || u === "boolean") && (t = null);
  var i = false;
  if (t === null) i = true;
  else switch (u) {
    case "bigint":
    case "string":
    case "number":
      i = true;
      break;
    case "object":
      switch (t.$$typeof) {
        case Cc:
        case v0:
          i = true;
          break;
        case go:
          return i = t._init, Gl(i(t._payload), e, l, a, n);
      }
  }
  if (i) return n = n(t), i = a === "" ? "." + Iu(t, 0) : a, Bs(n) ? (l = "", i != null && (l = i.replace(Rs, "$&/") + "/"), Gl(n, e, l, "", function(h) {
    return h;
  })) : n != null && (Gc(n) && (n = D0(n, l + (n.key == null || t && t.key === n.key ? "" : ("" + n.key).replace(Rs, "$&/") + "/") + i)), e.push(n)), 1;
  i = 0;
  var c = a === "" ? "." : a + ":";
  if (Bs(t)) for (var f = 0; f < t.length; f++) a = t[f], u = c + Iu(a, f), i += Gl(a, e, l, u, n);
  else if (f = E0(t), typeof f == "function") for (t = f.call(t), f = 0; !(a = t.next()).done; ) a = a.value, u = c + Iu(a, f++), i += Gl(a, e, l, u, n);
  else if (u === "object") {
    if (typeof t.then == "function") return Gl(O0(t), e, l, a, n);
    throw e = String(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead.");
  }
  return i;
}
function Nn(t, e, l) {
  if (t == null) return t;
  var a = [], n = 0;
  return Gl(t, a, "", "", function(u) {
    return e.call(l, u, n++);
  }), a;
}
function M0(t) {
  if (t._status === -1) {
    var e = t._result;
    e = e(), e.then(function(l) {
      (t._status === 0 || t._status === -1) && (t._status = 1, t._result = l);
    }, function(l) {
      (t._status === 0 || t._status === -1) && (t._status = 2, t._result = l);
    }), t._status === -1 && (t._status = 0, t._result = e);
  }
  if (t._status === 1) return t._result.default;
  throw t._result;
}
var Gs = typeof reportError == "function" ? reportError : function(t) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var e = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t), error: t });
    if (!window.dispatchEvent(e)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", t);
    return;
  }
  console.error(t);
}, U0 = { map: Nn, forEach: function(t, e, l) {
  Nn(t, function() {
    e.apply(this, arguments);
  }, l);
}, count: function(t) {
  var e = 0;
  return Nn(t, function() {
    e++;
  }), e;
}, toArray: function(t) {
  return Nn(t, function(e) {
    return e;
  }) || [];
}, only: function(t) {
  if (!Gc(t)) throw Error("React.Children.only expected to receive a single React element child.");
  return t;
} };
G.Activity = A0;
G.Children = U0;
G.Component = ga;
G.Fragment = x0;
G.Profiler = b0;
G.PureComponent = Hc;
G.StrictMode = p0;
G.Suspense = N0;
G.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ut;
G.__COMPILER_RUNTIME = { __proto__: null, c: function(t) {
  return ut.H.useMemoCache(t);
} };
G.cache = function(t) {
  return function() {
    return t.apply(null, arguments);
  };
};
G.cacheSignal = function() {
  return null;
};
G.cloneElement = function(t, e, l) {
  if (t == null) throw Error("The argument must be a React element, but you passed " + t + ".");
  var a = xo({}, t.props), n = t.key;
  if (e != null) for (u in e.key !== void 0 && (n = "" + e.key), e) !So.call(e, u) || u === "key" || u === "__self" || u === "__source" || u === "ref" && e.ref === void 0 || (a[u] = e[u]);
  var u = arguments.length - 2;
  if (u === 1) a.children = l;
  else if (1 < u) {
    for (var i = Array(u), c = 0; c < u; c++) i[c] = arguments[c + 2];
    a.children = i;
  }
  return Rc(t.type, n, a);
};
G.createContext = function(t) {
  return t = { $$typeof: z0, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null }, t.Provider = t, t.Consumer = { $$typeof: S0, _context: t }, t;
};
G.createElement = function(t, e, l) {
  var a, n = {}, u = null;
  if (e != null) for (a in e.key !== void 0 && (u = "" + e.key), e) So.call(e, a) && a !== "key" && a !== "__self" && a !== "__source" && (n[a] = e[a]);
  var i = arguments.length - 2;
  if (i === 1) n.children = l;
  else if (1 < i) {
    for (var c = Array(i), f = 0; f < i; f++) c[f] = arguments[f + 2];
    n.children = c;
  }
  if (t && t.defaultProps) for (a in i = t.defaultProps, i) n[a] === void 0 && (n[a] = i[a]);
  return Rc(t, u, n);
};
G.createRef = function() {
  return { current: null };
};
G.forwardRef = function(t) {
  return { $$typeof: j0, render: t };
};
G.isValidElement = Gc;
G.lazy = function(t) {
  return { $$typeof: go, _payload: { _status: -1, _result: t }, _init: M0 };
};
G.memo = function(t, e) {
  return { $$typeof: T0, type: t, compare: e === void 0 ? null : e };
};
G.startTransition = function(t) {
  var e = ut.T, l = {};
  ut.T = l;
  try {
    var a = t(), n = ut.S;
    n !== null && n(l, a), typeof a == "object" && a !== null && typeof a.then == "function" && a.then(Gi, Gs);
  } catch (u) {
    Gs(u);
  } finally {
    e !== null && l.types !== null && (e.types = l.types), ut.T = e;
  }
};
G.unstable_useCacheRefresh = function() {
  return ut.H.useCacheRefresh();
};
G.use = function(t) {
  return ut.H.use(t);
};
G.useActionState = function(t, e, l) {
  return ut.H.useActionState(t, e, l);
};
G.useCallback = function(t, e) {
  return ut.H.useCallback(t, e);
};
G.useContext = function(t) {
  return ut.H.useContext(t);
};
G.useDebugValue = function() {
};
G.useDeferredValue = function(t, e) {
  return ut.H.useDeferredValue(t, e);
};
G.useEffect = function(t, e) {
  return ut.H.useEffect(t, e);
};
G.useEffectEvent = function(t) {
  return ut.H.useEffectEvent(t);
};
G.useId = function() {
  return ut.H.useId();
};
G.useImperativeHandle = function(t, e, l) {
  return ut.H.useImperativeHandle(t, e, l);
};
G.useInsertionEffect = function(t, e) {
  return ut.H.useInsertionEffect(t, e);
};
G.useLayoutEffect = function(t, e) {
  return ut.H.useLayoutEffect(t, e);
};
G.useMemo = function(t, e) {
  return ut.H.useMemo(t, e);
};
G.useOptimistic = function(t, e) {
  return ut.H.useOptimistic(t, e);
};
G.useReducer = function(t, e, l) {
  return ut.H.useReducer(t, e, l);
};
G.useRef = function(t) {
  return ut.H.useRef(t);
};
G.useState = function(t) {
  return ut.H.useState(t);
};
G.useSyncExternalStore = function(t, e, l) {
  return ut.H.useSyncExternalStore(t, e, l);
};
G.useTransition = function() {
  return ut.H.useTransition();
};
G.version = "19.2.3";
yo.exports = G;
var H = yo.exports, zo = { exports: {} }, Mt = {};
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var C0 = H;
function jo(t) {
  var e = "https://react.dev/errors/" + t;
  if (1 < arguments.length) {
    e += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var l = 2; l < arguments.length; l++) e += "&args[]=" + encodeURIComponent(arguments[l]);
  }
  return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function qe() {
}
var Ot = { d: { f: qe, r: function() {
  throw Error(jo(522));
}, D: qe, C: qe, L: qe, m: qe, X: qe, S: qe, M: qe }, p: 0, findDOMNode: null }, H0 = Symbol.for("react.portal");
function B0(t, e, l) {
  var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: H0, key: a == null ? null : "" + a, children: t, containerInfo: e, implementation: l };
}
var Ra = C0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function Hu(t, e) {
  if (t === "font") return "";
  if (typeof e == "string") return e === "use-credentials" ? e : "";
}
Mt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Ot;
Mt.createPortal = function(t, e) {
  var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11) throw Error(jo(299));
  return B0(t, e, null, l);
};
Mt.flushSync = function(t) {
  var e = Ra.T, l = Ot.p;
  try {
    if (Ra.T = null, Ot.p = 2, t) return t();
  } finally {
    Ra.T = e, Ot.p = l, Ot.d.f();
  }
};
Mt.preconnect = function(t, e) {
  typeof t == "string" && (e ? (e = e.crossOrigin, e = typeof e == "string" ? e === "use-credentials" ? e : "" : void 0) : e = null, Ot.d.C(t, e));
};
Mt.prefetchDNS = function(t) {
  typeof t == "string" && Ot.d.D(t);
};
Mt.preinit = function(t, e) {
  if (typeof t == "string" && e && typeof e.as == "string") {
    var l = e.as, a = Hu(l, e.crossOrigin), n = typeof e.integrity == "string" ? e.integrity : void 0, u = typeof e.fetchPriority == "string" ? e.fetchPriority : void 0;
    l === "style" ? Ot.d.S(t, typeof e.precedence == "string" ? e.precedence : void 0, { crossOrigin: a, integrity: n, fetchPriority: u }) : l === "script" && Ot.d.X(t, { crossOrigin: a, integrity: n, fetchPriority: u, nonce: typeof e.nonce == "string" ? e.nonce : void 0 });
  }
};
Mt.preinitModule = function(t, e) {
  if (typeof t == "string") if (typeof e == "object" && e !== null) {
    if (e.as == null || e.as === "script") {
      var l = Hu(e.as, e.crossOrigin);
      Ot.d.M(t, { crossOrigin: l, integrity: typeof e.integrity == "string" ? e.integrity : void 0, nonce: typeof e.nonce == "string" ? e.nonce : void 0 });
    }
  } else e == null && Ot.d.M(t);
};
Mt.preload = function(t, e) {
  if (typeof t == "string" && typeof e == "object" && e !== null && typeof e.as == "string") {
    var l = e.as, a = Hu(l, e.crossOrigin);
    Ot.d.L(t, l, { crossOrigin: a, integrity: typeof e.integrity == "string" ? e.integrity : void 0, nonce: typeof e.nonce == "string" ? e.nonce : void 0, type: typeof e.type == "string" ? e.type : void 0, fetchPriority: typeof e.fetchPriority == "string" ? e.fetchPriority : void 0, referrerPolicy: typeof e.referrerPolicy == "string" ? e.referrerPolicy : void 0, imageSrcSet: typeof e.imageSrcSet == "string" ? e.imageSrcSet : void 0, imageSizes: typeof e.imageSizes == "string" ? e.imageSizes : void 0, media: typeof e.media == "string" ? e.media : void 0 });
  }
};
Mt.preloadModule = function(t, e) {
  if (typeof t == "string") if (e) {
    var l = Hu(e.as, e.crossOrigin);
    Ot.d.m(t, { as: typeof e.as == "string" && e.as !== "script" ? e.as : void 0, crossOrigin: l, integrity: typeof e.integrity == "string" ? e.integrity : void 0 });
  } else Ot.d.m(t);
};
Mt.requestFormReset = function(t) {
  Ot.d.r(t);
};
Mt.unstable_batchedUpdates = function(t, e) {
  return t(e);
};
Mt.useFormState = function(t, e, l) {
  return Ra.H.useFormState(t, e, l);
};
Mt.useFormStatus = function() {
  return Ra.H.useHostTransitionStatus();
};
Mt.version = "19.2.3";
function No() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(No);
  } catch (t) {
    console.error(t);
  }
}
No(), zo.exports = Mt;
var R0 = zo.exports;
/**
* @license React
* react-dom-client.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var xt = g0, To = H, G0 = R0;
function p(t) {
  var e = "https://react.dev/errors/" + t;
  if (1 < arguments.length) {
    e += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var l = 2; l < arguments.length; l++) e += "&args[]=" + encodeURIComponent(arguments[l]);
  }
  return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function Ao(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
}
function dn(t) {
  var e = t, l = t;
  if (t.alternate) for (; e.return; ) e = e.return;
  else {
    t = e;
    do
      e = t, e.flags & 4098 && (l = e.return), t = e.return;
    while (t);
  }
  return e.tag === 3 ? l : null;
}
function Eo(t) {
  if (t.tag === 13) {
    var e = t.memoizedState;
    if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
  }
  return null;
}
function Do(t) {
  if (t.tag === 31) {
    var e = t.memoizedState;
    if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
  }
  return null;
}
function ws(t) {
  if (dn(t) !== t) throw Error(p(188));
}
function w0(t) {
  var e = t.alternate;
  if (!e) {
    if (e = dn(t), e === null) throw Error(p(188));
    return e !== t ? null : t;
  }
  for (var l = t, a = e; ; ) {
    var n = l.return;
    if (n === null) break;
    var u = n.alternate;
    if (u === null) {
      if (a = n.return, a !== null) {
        l = a;
        continue;
      }
      break;
    }
    if (n.child === u.child) {
      for (u = n.child; u; ) {
        if (u === l) return ws(n), t;
        if (u === a) return ws(n), e;
        u = u.sibling;
      }
      throw Error(p(188));
    }
    if (l.return !== a.return) l = n, a = u;
    else {
      for (var i = false, c = n.child; c; ) {
        if (c === l) {
          i = true, l = n, a = u;
          break;
        }
        if (c === a) {
          i = true, a = n, l = u;
          break;
        }
        c = c.sibling;
      }
      if (!i) {
        for (c = u.child; c; ) {
          if (c === l) {
            i = true, l = u, a = n;
            break;
          }
          if (c === a) {
            i = true, a = u, l = n;
            break;
          }
          c = c.sibling;
        }
        if (!i) throw Error(p(189));
      }
    }
    if (l.alternate !== a) throw Error(p(190));
  }
  if (l.tag !== 3) throw Error(p(188));
  return l.stateNode.current === l ? t : e;
}
function _o(t) {
  var e = t.tag;
  if (e === 5 || e === 26 || e === 27 || e === 6) return t;
  for (t = t.child; t !== null; ) {
    if (e = _o(t), e !== null) return e;
    t = t.sibling;
  }
  return null;
}
var it = Object.assign, Y0 = Symbol.for("react.element"), Tn = Symbol.for("react.transitional.element"), Ma = Symbol.for("react.portal"), ql = Symbol.for("react.fragment"), Oo = Symbol.for("react.strict_mode"), wi = Symbol.for("react.profiler"), Mo = Symbol.for("react.consumer"), Ee = Symbol.for("react.context"), wc = Symbol.for("react.forward_ref"), Yi = Symbol.for("react.suspense"), qi = Symbol.for("react.suspense_list"), Yc = Symbol.for("react.memo"), Qe = Symbol.for("react.lazy"), Qi = Symbol.for("react.activity"), q0 = Symbol.for("react.memo_cache_sentinel"), Ys = Symbol.iterator;
function Na(t) {
  return t === null || typeof t != "object" ? null : (t = Ys && t[Ys] || t["@@iterator"], typeof t == "function" ? t : null);
}
var Q0 = Symbol.for("react.client.reference");
function Xi(t) {
  if (t == null) return null;
  if (typeof t == "function") return t.$$typeof === Q0 ? null : t.displayName || t.name || null;
  if (typeof t == "string") return t;
  switch (t) {
    case ql:
      return "Fragment";
    case wi:
      return "Profiler";
    case Oo:
      return "StrictMode";
    case Yi:
      return "Suspense";
    case qi:
      return "SuspenseList";
    case Qi:
      return "Activity";
  }
  if (typeof t == "object") switch (t.$$typeof) {
    case Ma:
      return "Portal";
    case Ee:
      return t.displayName || "Context";
    case Mo:
      return (t._context.displayName || "Context") + ".Consumer";
    case wc:
      var e = t.render;
      return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
    case Yc:
      return e = t.displayName || null, e !== null ? e : Xi(t.type) || "Memo";
    case Qe:
      e = t._payload, t = t._init;
      try {
        return Xi(t(e));
      } catch {
      }
  }
  return null;
}
var Ua = Array.isArray, B = To.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = G0.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, pl = { pending: false, data: null, method: null, action: null }, Zi = [], Ql = -1;
function ye(t) {
  return { current: t };
}
function zt(t) {
  0 > Ql || (t.current = Zi[Ql], Zi[Ql] = null, Ql--);
}
function et(t, e) {
  Ql++, Zi[Ql] = t.current, t.current = e;
}
var he = ye(null), Fa = ye(null), Pe = ye(null), au = ye(null);
function nu(t, e) {
  switch (et(Pe, e), et(Fa, t), et(he, null), e.nodeType) {
    case 9:
    case 11:
      t = (t = e.documentElement) && (t = t.namespaceURI) ? Kf(t) : 0;
      break;
    default:
      if (t = e.tagName, e = e.namespaceURI) e = Kf(e), t = Fd(e, t);
      else switch (t) {
        case "svg":
          t = 1;
          break;
        case "math":
          t = 2;
          break;
        default:
          t = 0;
      }
  }
  zt(he), et(he, t);
}
function ua() {
  zt(he), zt(Fa), zt(Pe);
}
function Li(t) {
  t.memoizedState !== null && et(au, t);
  var e = he.current, l = Fd(e, t.type);
  e !== l && (et(Fa, t), et(he, l));
}
function uu(t) {
  Fa.current === t && (zt(he), zt(Fa)), au.current === t && (zt(au), fn._currentValue = pl);
}
var Pu, qs;
function yl(t) {
  if (Pu === void 0) try {
    throw Error();
  } catch (l) {
    var e = l.stack.trim().match(/\n( *(at )?)/);
    Pu = e && e[1] || "", qs = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
  }
  return `
` + Pu + t + qs;
}
var ti = false;
function ei(t, e) {
  if (!t || ti) return "";
  ti = true;
  var l = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var a = { DetermineComponentFrameRoot: function() {
      try {
        if (e) {
          var g = function() {
            throw Error();
          };
          if (Object.defineProperty(g.prototype, "props", { set: function() {
            throw Error();
          } }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(g, []);
            } catch (y) {
              var d = y;
            }
            Reflect.construct(t, [], g);
          } else {
            try {
              g.call();
            } catch (y) {
              d = y;
            }
            t.call(g.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (y) {
            d = y;
          }
          (g = t()) && typeof g.catch == "function" && g.catch(function() {
          });
        }
      } catch (y) {
        if (y && d && typeof y.stack == "string") return [y.stack, d.stack];
      }
      return [null, null];
    } };
    a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var n = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
    n && n.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
    var u = a.DetermineComponentFrameRoot(), i = u[0], c = u[1];
    if (i && c) {
      var f = i.split(`
`), h = c.split(`
`);
      for (n = a = 0; a < f.length && !f[a].includes("DetermineComponentFrameRoot"); ) a++;
      for (; n < h.length && !h[n].includes("DetermineComponentFrameRoot"); ) n++;
      if (a === f.length || n === h.length) for (a = f.length - 1, n = h.length - 1; 1 <= a && 0 <= n && f[a] !== h[n]; ) n--;
      for (; 1 <= a && 0 <= n; a--, n--) if (f[a] !== h[n]) {
        if (a !== 1 || n !== 1) do
          if (a--, n--, 0 > n || f[a] !== h[n]) {
            var v = `
` + f[a].replace(" at new ", " at ");
            return t.displayName && v.includes("<anonymous>") && (v = v.replace("<anonymous>", t.displayName)), v;
          }
        while (1 <= a && 0 <= n);
        break;
      }
    }
  } finally {
    ti = false, Error.prepareStackTrace = l;
  }
  return (l = t ? t.displayName || t.name : "") ? yl(l) : "";
}
function X0(t, e) {
  switch (t.tag) {
    case 26:
    case 27:
    case 5:
      return yl(t.type);
    case 16:
      return yl("Lazy");
    case 13:
      return t.child !== e && e !== null ? yl("Suspense Fallback") : yl("Suspense");
    case 19:
      return yl("SuspenseList");
    case 0:
    case 15:
      return ei(t.type, false);
    case 11:
      return ei(t.type.render, false);
    case 1:
      return ei(t.type, true);
    case 31:
      return yl("Activity");
    default:
      return "";
  }
}
function Qs(t) {
  try {
    var e = "", l = null;
    do
      e += X0(t, l), l = t, t = t.return;
    while (t);
    return e;
  } catch (a) {
    return `
Error generating stack: ` + a.message + `
` + a.stack;
  }
}
var Vi = Object.prototype.hasOwnProperty, qc = xt.unstable_scheduleCallback, li = xt.unstable_cancelCallback, Z0 = xt.unstable_shouldYield, L0 = xt.unstable_requestPaint, Lt = xt.unstable_now, V0 = xt.unstable_getCurrentPriorityLevel, Uo = xt.unstable_ImmediatePriority, Co = xt.unstable_UserBlockingPriority, iu = xt.unstable_NormalPriority, K0 = xt.unstable_LowPriority, Ho = xt.unstable_IdlePriority, J0 = xt.log, k0 = xt.unstable_setDisableYieldValue, mn = null, Vt = null;
function Je(t) {
  if (typeof J0 == "function" && k0(t), Vt && typeof Vt.setStrictMode == "function") try {
    Vt.setStrictMode(mn, t);
  } catch {
  }
}
var Kt = Math.clz32 ? Math.clz32 : F0, $0 = Math.log, W0 = Math.LN2;
function F0(t) {
  return t >>>= 0, t === 0 ? 32 : 31 - ($0(t) / W0 | 0) | 0;
}
var An = 256, En = 262144, Dn = 4194304;
function gl(t) {
  var e = t & 42;
  if (e !== 0) return e;
  switch (t & -t) {
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
      return t & 261888;
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t & 3932160;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return t & 62914560;
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
      return t;
  }
}
function Bu(t, e, l) {
  var a = t.pendingLanes;
  if (a === 0) return 0;
  var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
  t = t.warmLanes;
  var c = a & 134217727;
  return c !== 0 ? (a = c & ~u, a !== 0 ? n = gl(a) : (i &= c, i !== 0 ? n = gl(i) : l || (l = c & ~t, l !== 0 && (n = gl(l))))) : (c = a & ~u, c !== 0 ? n = gl(c) : i !== 0 ? n = gl(i) : l || (l = a & ~t, l !== 0 && (n = gl(l)))), n === 0 ? 0 : e !== 0 && e !== n && !(e & u) && (u = n & -n, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : n;
}
function hn(t, e) {
  return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
}
function I0(t, e) {
  switch (t) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64:
      return e + 250;
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
      return e + 5e3;
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
function Bo() {
  var t = Dn;
  return Dn <<= 1, !(Dn & 62914560) && (Dn = 4194304), t;
}
function ai(t) {
  for (var e = [], l = 0; 31 > l; l++) e.push(t);
  return e;
}
function yn(t, e) {
  t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
}
function P0(t, e, l, a, n, u) {
  var i = t.pendingLanes;
  t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
  var c = t.entanglements, f = t.expirationTimes, h = t.hiddenUpdates;
  for (l = i & ~l; 0 < l; ) {
    var v = 31 - Kt(l), g = 1 << v;
    c[v] = 0, f[v] = -1;
    var d = h[v];
    if (d !== null) for (h[v] = null, v = 0; v < d.length; v++) {
      var y = d[v];
      y !== null && (y.lane &= -536870913);
    }
    l &= ~g;
  }
  a !== 0 && Ro(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~e));
}
function Ro(t, e, l) {
  t.pendingLanes |= e, t.suspendedLanes &= ~e;
  var a = 31 - Kt(e);
  t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | l & 261930;
}
function Go(t, e) {
  var l = t.entangledLanes |= e;
  for (t = t.entanglements; l; ) {
    var a = 31 - Kt(l), n = 1 << a;
    n & e | t[a] & e && (t[a] |= e), l &= ~n;
  }
}
function wo(t, e) {
  var l = e & -e;
  return l = l & 42 ? 1 : Qc(l), l & (t.suspendedLanes | e) ? 0 : l;
}
function Qc(t) {
  switch (t) {
    case 2:
      t = 1;
      break;
    case 8:
      t = 4;
      break;
    case 32:
      t = 16;
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
      t = 128;
      break;
    case 268435456:
      t = 134217728;
      break;
    default:
      t = 0;
  }
  return t;
}
function Xc(t) {
  return t &= -t, 2 < t ? 8 < t ? t & 134217727 ? 32 : 268435456 : 8 : 2;
}
function Yo() {
  var t = V.p;
  return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : s0(t.type));
}
function Xs(t, e) {
  var l = V.p;
  try {
    return V.p = t, e();
  } finally {
    V.p = l;
  }
}
var dl = Math.random().toString(36).slice(2), Tt = "__reactFiber$" + dl, wt = "__reactProps$" + dl, va = "__reactContainer$" + dl, Ki = "__reactEvents$" + dl, tm = "__reactListeners$" + dl, em = "__reactHandles$" + dl, Zs = "__reactResources$" + dl, gn = "__reactMarker$" + dl;
function Zc(t) {
  delete t[Tt], delete t[wt], delete t[Ki], delete t[tm], delete t[em];
}
function Xl(t) {
  var e = t[Tt];
  if (e) return e;
  for (var l = t.parentNode; l; ) {
    if (e = l[va] || l[Tt]) {
      if (l = e.alternate, e.child !== null || l !== null && l.child !== null) for (t = Ff(t); t !== null; ) {
        if (l = t[Tt]) return l;
        t = Ff(t);
      }
      return e;
    }
    t = l, l = t.parentNode;
  }
  return null;
}
function xa(t) {
  if (t = t[Tt] || t[va]) {
    var e = t.tag;
    if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
  }
  return null;
}
function Ca(t) {
  var e = t.tag;
  if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
  throw Error(p(33));
}
function Il(t) {
  var e = t[Zs];
  return e || (e = t[Zs] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
}
function St(t) {
  t[gn] = true;
}
var qo = /* @__PURE__ */ new Set(), Qo = {};
function _l(t, e) {
  ia(t, e), ia(t + "Capture", e);
}
function ia(t, e) {
  for (Qo[t] = e, t = 0; t < e.length; t++) qo.add(e[t]);
}
var lm = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Ls = {}, Vs = {};
function am(t) {
  return Vi.call(Vs, t) ? true : Vi.call(Ls, t) ? false : lm.test(t) ? Vs[t] = true : (Ls[t] = true, false);
}
function Xn(t, e, l) {
  if (am(e)) if (l === null) t.removeAttribute(e);
  else {
    switch (typeof l) {
      case "undefined":
      case "function":
      case "symbol":
        t.removeAttribute(e);
        return;
      case "boolean":
        var a = e.toLowerCase().slice(0, 5);
        if (a !== "data-" && a !== "aria-") {
          t.removeAttribute(e);
          return;
        }
    }
    t.setAttribute(e, "" + l);
  }
}
function _n(t, e, l) {
  if (l === null) t.removeAttribute(e);
  else {
    switch (typeof l) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        t.removeAttribute(e);
        return;
    }
    t.setAttribute(e, "" + l);
  }
}
function be(t, e, l, a) {
  if (a === null) t.removeAttribute(l);
  else {
    switch (typeof a) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        t.removeAttribute(l);
        return;
    }
    t.setAttributeNS(e, l, "" + a);
  }
}
function It(t) {
  switch (typeof t) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return t;
    case "object":
      return t;
    default:
      return "";
  }
}
function Xo(t) {
  var e = t.type;
  return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
}
function nm(t, e, l) {
  var a = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
  if (!t.hasOwnProperty(e) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
    var n = a.get, u = a.set;
    return Object.defineProperty(t, e, { configurable: true, get: function() {
      return n.call(this);
    }, set: function(i) {
      l = "" + i, u.call(this, i);
    } }), Object.defineProperty(t, e, { enumerable: a.enumerable }), { getValue: function() {
      return l;
    }, setValue: function(i) {
      l = "" + i;
    }, stopTracking: function() {
      t._valueTracker = null, delete t[e];
    } };
  }
}
function Ji(t) {
  if (!t._valueTracker) {
    var e = Xo(t) ? "checked" : "value";
    t._valueTracker = nm(t, e, "" + t[e]);
  }
}
function Zo(t) {
  if (!t) return false;
  var e = t._valueTracker;
  if (!e) return true;
  var l = e.getValue(), a = "";
  return t && (a = Xo(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== l ? (e.setValue(t), true) : false;
}
function cu(t) {
  if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
  try {
    return t.activeElement || t.body;
  } catch {
    return t.body;
  }
}
var um = /[\n"\\]/g;
function ee(t) {
  return t.replace(um, function(e) {
    return "\\" + e.charCodeAt(0).toString(16) + " ";
  });
}
function ki(t, e, l, a, n, u, i, c) {
  t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), e != null ? i === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + It(e)) : t.value !== "" + It(e) && (t.value = "" + It(e)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), e != null ? $i(t, i, It(e)) : l != null ? $i(t, i, It(l)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.name = "" + It(c) : t.removeAttribute("name");
}
function Lo(t, e, l, a, n, u, i, c) {
  if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
    if (!(u !== "submit" && u !== "reset" || e != null)) {
      Ji(t);
      return;
    }
    l = l != null ? "" + It(l) : "", e = e != null ? "" + It(e) : l, c || e === t.value || (t.value = e), t.defaultValue = e;
  }
  a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = c ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), Ji(t);
}
function $i(t, e, l) {
  e === "number" && cu(t.ownerDocument) === t || t.defaultValue === "" + l || (t.defaultValue = "" + l);
}
function Pl(t, e, l, a) {
  if (t = t.options, e) {
    e = {};
    for (var n = 0; n < l.length; n++) e["$" + l[n]] = true;
    for (l = 0; l < t.length; l++) n = e.hasOwnProperty("$" + t[l].value), t[l].selected !== n && (t[l].selected = n), n && a && (t[l].defaultSelected = true);
  } else {
    for (l = "" + It(l), e = null, n = 0; n < t.length; n++) {
      if (t[n].value === l) {
        t[n].selected = true, a && (t[n].defaultSelected = true);
        return;
      }
      e !== null || t[n].disabled || (e = t[n]);
    }
    e !== null && (e.selected = true);
  }
}
function Vo(t, e, l) {
  if (e != null && (e = "" + It(e), e !== t.value && (t.value = e), l == null)) {
    t.defaultValue !== e && (t.defaultValue = e);
    return;
  }
  t.defaultValue = l != null ? "" + It(l) : "";
}
function Ko(t, e, l, a) {
  if (e == null) {
    if (a != null) {
      if (l != null) throw Error(p(92));
      if (Ua(a)) {
        if (1 < a.length) throw Error(p(93));
        a = a[0];
      }
      l = a;
    }
    l == null && (l = ""), e = l;
  }
  l = It(e), t.defaultValue = l, a = t.textContent, a === l && a !== "" && a !== null && (t.value = a), Ji(t);
}
function ca(t, e) {
  if (e) {
    var l = t.firstChild;
    if (l && l === t.lastChild && l.nodeType === 3) {
      l.nodeValue = e;
      return;
    }
  }
  t.textContent = e;
}
var im = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
function Ks(t, e, l) {
  var a = e.indexOf("--") === 0;
  l == null || typeof l == "boolean" || l === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, l) : typeof l != "number" || l === 0 || im.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
}
function Jo(t, e, l) {
  if (e != null && typeof e != "object") throw Error(p(62));
  if (t = t.style, l != null) {
    for (var a in l) !l.hasOwnProperty(a) || e != null && e.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
    for (var n in e) a = e[n], e.hasOwnProperty(n) && l[n] !== a && Ks(t, n, a);
  } else for (var u in e) e.hasOwnProperty(u) && Ks(t, u, e[u]);
}
function Lc(t) {
  if (t.indexOf("-") === -1) return false;
  switch (t) {
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
var cm = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), sm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function Zn(t) {
  return sm.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
}
function De() {
}
var Wi = null;
function Vc(t) {
  return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
}
var Zl = null, ta = null;
function Js(t) {
  var e = xa(t);
  if (e && (t = e.stateNode)) {
    var l = t[wt] || null;
    t: switch (t = e.stateNode, e.type) {
      case "input":
        if (ki(t, l.value, l.defaultValue, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name), e = l.name, l.type === "radio" && e != null) {
          for (l = t; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll('input[name="' + ee("" + e) + '"][type="radio"]'), e = 0; e < l.length; e++) {
            var a = l[e];
            if (a !== t && a.form === t.form) {
              var n = a[wt] || null;
              if (!n) throw Error(p(90));
              ki(a, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name);
            }
          }
          for (e = 0; e < l.length; e++) a = l[e], a.form === t.form && Zo(a);
        }
        break t;
      case "textarea":
        Vo(t, l.value, l.defaultValue);
        break t;
      case "select":
        e = l.value, e != null && Pl(t, !!l.multiple, e, false);
    }
  }
}
var ni = false;
function ko(t, e, l) {
  if (ni) return t(e, l);
  ni = true;
  try {
    var a = t(e);
    return a;
  } finally {
    if (ni = false, (Zl !== null || ta !== null) && (Ju(), Zl && (e = Zl, t = ta, ta = Zl = null, Js(e), t))) for (e = 0; e < t.length; e++) Js(t[e]);
  }
}
function Ia(t, e) {
  var l = t.stateNode;
  if (l === null) return null;
  var a = l[wt] || null;
  if (a === null) return null;
  l = a[e];
  t: switch (e) {
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
      (a = !a.disabled) || (t = t.type, a = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !a;
      break t;
    default:
      t = false;
  }
  if (t) return null;
  if (l && typeof l != "function") throw Error(p(231, e, typeof l));
  return l;
}
var Ce = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Fi = false;
if (Ce) try {
  var Ta = {};
  Object.defineProperty(Ta, "passive", { get: function() {
    Fi = true;
  } }), window.addEventListener("test", Ta, Ta), window.removeEventListener("test", Ta, Ta);
} catch {
  Fi = false;
}
var ke = null, Kc = null, Ln = null;
function $o() {
  if (Ln) return Ln;
  var t, e = Kc, l = e.length, a, n = "value" in ke ? ke.value : ke.textContent, u = n.length;
  for (t = 0; t < l && e[t] === n[t]; t++) ;
  var i = l - t;
  for (a = 1; a <= i && e[l - a] === n[u - a]; a++) ;
  return Ln = n.slice(t, 1 < a ? 1 - a : void 0);
}
function Vn(t) {
  var e = t.keyCode;
  return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
}
function On() {
  return true;
}
function ks() {
  return false;
}
function Yt(t) {
  function e(l, a, n, u, i) {
    this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
    for (var c in t) t.hasOwnProperty(c) && (l = t[c], this[c] = l ? l(u) : u[c]);
    return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === false) ? On : ks, this.isPropagationStopped = ks, this;
  }
  return it(e.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var l = this.nativeEvent;
    l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = false), this.isDefaultPrevented = On);
  }, stopPropagation: function() {
    var l = this.nativeEvent;
    l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = true), this.isPropagationStopped = On);
  }, persist: function() {
  }, isPersistent: On }), e;
}
var Ol = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(t) {
  return t.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Ru = Yt(Ol), vn = it({}, Ol, { view: 0, detail: 0 }), fm = Yt(vn), ui, ii, Aa, Gu = it({}, vn, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Jc, button: 0, buttons: 0, relatedTarget: function(t) {
  return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
}, movementX: function(t) {
  return "movementX" in t ? t.movementX : (t !== Aa && (Aa && t.type === "mousemove" ? (ui = t.screenX - Aa.screenX, ii = t.screenY - Aa.screenY) : ii = ui = 0, Aa = t), ui);
}, movementY: function(t) {
  return "movementY" in t ? t.movementY : ii;
} }), $s = Yt(Gu), om = it({}, Gu, { dataTransfer: 0 }), rm = Yt(om), dm = it({}, vn, { relatedTarget: 0 }), ci = Yt(dm), mm = it({}, Ol, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), hm = Yt(mm), ym = it({}, Ol, { clipboardData: function(t) {
  return "clipboardData" in t ? t.clipboardData : window.clipboardData;
} }), gm = Yt(ym), vm = it({}, Ol, { data: 0 }), Ws = Yt(vm), xm = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, pm = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, bm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Sm(t) {
  var e = this.nativeEvent;
  return e.getModifierState ? e.getModifierState(t) : (t = bm[t]) ? !!e[t] : false;
}
function Jc() {
  return Sm;
}
var zm = it({}, vn, { key: function(t) {
  if (t.key) {
    var e = xm[t.key] || t.key;
    if (e !== "Unidentified") return e;
  }
  return t.type === "keypress" ? (t = Vn(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? pm[t.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Jc, charCode: function(t) {
  return t.type === "keypress" ? Vn(t) : 0;
}, keyCode: function(t) {
  return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
}, which: function(t) {
  return t.type === "keypress" ? Vn(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
} }), jm = Yt(zm), Nm = it({}, Gu, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Fs = Yt(Nm), Tm = it({}, vn, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Jc }), Am = Yt(Tm), Em = it({}, Ol, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Dm = Yt(Em), _m = it({}, Gu, { deltaX: function(t) {
  return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
}, deltaY: function(t) {
  return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
}, deltaZ: 0, deltaMode: 0 }), Om = Yt(_m), Mm = it({}, Ol, { newState: 0, oldState: 0 }), Um = Yt(Mm), Cm = [9, 13, 27, 32], kc = Ce && "CompositionEvent" in window, Ga = null;
Ce && "documentMode" in document && (Ga = document.documentMode);
var Hm = Ce && "TextEvent" in window && !Ga, Wo = Ce && (!kc || Ga && 8 < Ga && 11 >= Ga), Is = " ", Ps = false;
function Fo(t, e) {
  switch (t) {
    case "keyup":
      return Cm.indexOf(e.keyCode) !== -1;
    case "keydown":
      return e.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function Io(t) {
  return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
}
var Ll = false;
function Bm(t, e) {
  switch (t) {
    case "compositionend":
      return Io(e);
    case "keypress":
      return e.which !== 32 ? null : (Ps = true, Is);
    case "textInput":
      return t = e.data, t === Is && Ps ? null : t;
    default:
      return null;
  }
}
function Rm(t, e) {
  if (Ll) return t === "compositionend" || !kc && Fo(t, e) ? (t = $o(), Ln = Kc = ke = null, Ll = false, t) : null;
  switch (t) {
    case "paste":
      return null;
    case "keypress":
      if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
        if (e.char && 1 < e.char.length) return e.char;
        if (e.which) return String.fromCharCode(e.which);
      }
      return null;
    case "compositionend":
      return Wo && e.locale !== "ko" ? null : e.data;
    default:
      return null;
  }
}
var Gm = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function tf(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e === "input" ? !!Gm[t.type] : e === "textarea";
}
function Po(t, e, l, a) {
  Zl ? ta ? ta.push(a) : ta = [a] : Zl = a, e = Tu(e, "onChange"), 0 < e.length && (l = new Ru("onChange", "change", null, l, a), t.push({ event: l, listeners: e }));
}
var wa = null, Pa = null;
function wm(t) {
  kd(t, 0);
}
function wu(t) {
  var e = Ca(t);
  if (Zo(e)) return t;
}
function ef(t, e) {
  if (t === "change") return e;
}
var tr = false;
if (Ce) {
  var si;
  if (Ce) {
    var fi = "oninput" in document;
    if (!fi) {
      var lf = document.createElement("div");
      lf.setAttribute("oninput", "return;"), fi = typeof lf.oninput == "function";
    }
    si = fi;
  } else si = false;
  tr = si && (!document.documentMode || 9 < document.documentMode);
}
function af() {
  wa && (wa.detachEvent("onpropertychange", er), Pa = wa = null);
}
function er(t) {
  if (t.propertyName === "value" && wu(Pa)) {
    var e = [];
    Po(e, Pa, t, Vc(t)), ko(wm, e);
  }
}
function Ym(t, e, l) {
  t === "focusin" ? (af(), wa = e, Pa = l, wa.attachEvent("onpropertychange", er)) : t === "focusout" && af();
}
function qm(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown") return wu(Pa);
}
function Qm(t, e) {
  if (t === "click") return wu(e);
}
function Xm(t, e) {
  if (t === "input" || t === "change") return wu(e);
}
function Zm(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var kt = typeof Object.is == "function" ? Object.is : Zm;
function tn(t, e) {
  if (kt(t, e)) return true;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null) return false;
  var l = Object.keys(t), a = Object.keys(e);
  if (l.length !== a.length) return false;
  for (a = 0; a < l.length; a++) {
    var n = l[a];
    if (!Vi.call(e, n) || !kt(t[n], e[n])) return false;
  }
  return true;
}
function nf(t) {
  for (; t && t.firstChild; ) t = t.firstChild;
  return t;
}
function uf(t, e) {
  var l = nf(t);
  t = 0;
  for (var a; l; ) {
    if (l.nodeType === 3) {
      if (a = t + l.textContent.length, t <= e && a >= e) return { node: l, offset: e - t };
      t = a;
    }
    t: {
      for (; l; ) {
        if (l.nextSibling) {
          l = l.nextSibling;
          break t;
        }
        l = l.parentNode;
      }
      l = void 0;
    }
    l = nf(l);
  }
}
function lr(t, e) {
  return t && e ? t === e ? true : t && t.nodeType === 3 ? false : e && e.nodeType === 3 ? lr(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : false : false;
}
function ar(t) {
  t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
  for (var e = cu(t.document); e instanceof t.HTMLIFrameElement; ) {
    try {
      var l = typeof e.contentWindow.location.href == "string";
    } catch {
      l = false;
    }
    if (l) t = e.contentWindow;
    else break;
    e = cu(t.document);
  }
  return e;
}
function $c(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
}
var Lm = Ce && "documentMode" in document && 11 >= document.documentMode, Vl = null, Ii = null, Ya = null, Pi = false;
function cf(t, e, l) {
  var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
  Pi || Vl == null || Vl !== cu(a) || (a = Vl, "selectionStart" in a && $c(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = { anchorNode: a.anchorNode, anchorOffset: a.anchorOffset, focusNode: a.focusNode, focusOffset: a.focusOffset }), Ya && tn(Ya, a) || (Ya = a, a = Tu(Ii, "onSelect"), 0 < a.length && (e = new Ru("onSelect", "select", null, e, l), t.push({ event: e, listeners: a }), e.target = Vl)));
}
function hl(t, e) {
  var l = {};
  return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
}
var Kl = { animationend: hl("Animation", "AnimationEnd"), animationiteration: hl("Animation", "AnimationIteration"), animationstart: hl("Animation", "AnimationStart"), transitionrun: hl("Transition", "TransitionRun"), transitionstart: hl("Transition", "TransitionStart"), transitioncancel: hl("Transition", "TransitionCancel"), transitionend: hl("Transition", "TransitionEnd") }, oi = {}, nr = {};
Ce && (nr = document.createElement("div").style, "AnimationEvent" in window || (delete Kl.animationend.animation, delete Kl.animationiteration.animation, delete Kl.animationstart.animation), "TransitionEvent" in window || delete Kl.transitionend.transition);
function Ml(t) {
  if (oi[t]) return oi[t];
  if (!Kl[t]) return t;
  var e = Kl[t], l;
  for (l in e) if (e.hasOwnProperty(l) && l in nr) return oi[t] = e[l];
  return t;
}
var ur = Ml("animationend"), ir = Ml("animationiteration"), cr = Ml("animationstart"), Vm = Ml("transitionrun"), Km = Ml("transitionstart"), Jm = Ml("transitioncancel"), sr = Ml("transitionend"), fr = /* @__PURE__ */ new Map(), tc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
tc.push("scrollEnd");
function oe(t, e) {
  fr.set(t, e), _l(e, [t]);
}
var su = typeof reportError == "function" ? reportError : function(t) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var e = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t), error: t });
    if (!window.dispatchEvent(e)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", t);
    return;
  }
  console.error(t);
}, Ft = [], Jl = 0, Wc = 0;
function Yu() {
  for (var t = Jl, e = Wc = Jl = 0; e < t; ) {
    var l = Ft[e];
    Ft[e++] = null;
    var a = Ft[e];
    Ft[e++] = null;
    var n = Ft[e];
    Ft[e++] = null;
    var u = Ft[e];
    if (Ft[e++] = null, a !== null && n !== null) {
      var i = a.pending;
      i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
    }
    u !== 0 && or(l, n, u);
  }
}
function qu(t, e, l, a) {
  Ft[Jl++] = t, Ft[Jl++] = e, Ft[Jl++] = l, Ft[Jl++] = a, Wc |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
}
function Fc(t, e, l, a) {
  return qu(t, e, l, a), fu(t);
}
function Ul(t, e) {
  return qu(t, null, null, e), fu(t);
}
function or(t, e, l) {
  t.lanes |= l;
  var a = t.alternate;
  a !== null && (a.lanes |= l);
  for (var n = false, u = t.return; u !== null; ) u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = true)), t = u, u = u.return;
  return t.tag === 3 ? (u = t.stateNode, n && e !== null && (n = 31 - Kt(l), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [e] : a.push(e), e.lane = l | 536870912), u) : null;
}
function fu(t) {
  if (50 < ka) throw ka = 0, Sc = null, Error(p(185));
  for (var e = t.return; e !== null; ) t = e, e = t.return;
  return t.tag === 3 ? t.stateNode : null;
}
var kl = {};
function km(t, e, l, a) {
  this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Xt(t, e, l, a) {
  return new km(t, e, l, a);
}
function Ic(t) {
  return t = t.prototype, !(!t || !t.isReactComponent);
}
function Oe(t, e) {
  var l = t.alternate;
  return l === null ? (l = Xt(t.tag, e, t.key, t.mode), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 65011712, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
}
function rr(t, e) {
  t.flags &= 65011714;
  var l = t.alternate;
  return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), t;
}
function Kn(t, e, l, a, n, u) {
  var i = 0;
  if (a = t, typeof t == "function") Ic(t) && (i = 1);
  else if (typeof t == "string") i = Ph(t, l, he.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
  else t: switch (t) {
    case Qi:
      return t = Xt(31, l, e, n), t.elementType = Qi, t.lanes = u, t;
    case ql:
      return bl(l.children, n, u, e);
    case Oo:
      i = 8, n |= 24;
      break;
    case wi:
      return t = Xt(12, l, e, n | 2), t.elementType = wi, t.lanes = u, t;
    case Yi:
      return t = Xt(13, l, e, n), t.elementType = Yi, t.lanes = u, t;
    case qi:
      return t = Xt(19, l, e, n), t.elementType = qi, t.lanes = u, t;
    default:
      if (typeof t == "object" && t !== null) switch (t.$$typeof) {
        case Ee:
          i = 10;
          break t;
        case Mo:
          i = 9;
          break t;
        case wc:
          i = 11;
          break t;
        case Yc:
          i = 14;
          break t;
        case Qe:
          i = 16, a = null;
          break t;
      }
      i = 29, l = Error(p(130, t === null ? "null" : typeof t, "")), a = null;
  }
  return e = Xt(i, l, e, n), e.elementType = t, e.type = a, e.lanes = u, e;
}
function bl(t, e, l, a) {
  return t = Xt(7, t, a, e), t.lanes = l, t;
}
function ri(t, e, l) {
  return t = Xt(6, t, null, e), t.lanes = l, t;
}
function dr(t) {
  var e = Xt(18, null, null, 0);
  return e.stateNode = t, e;
}
function di(t, e, l) {
  return e = Xt(4, t.children !== null ? t.children : [], t.key, e), e.lanes = l, e.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }, e;
}
var sf = /* @__PURE__ */ new WeakMap();
function le(t, e) {
  if (typeof t == "object" && t !== null) {
    var l = sf.get(t);
    return l !== void 0 ? l : (e = { value: t, source: e, stack: Qs(e) }, sf.set(t, e), e);
  }
  return { value: t, source: e, stack: Qs(e) };
}
var $l = [], Wl = 0, ou = null, en = 0, Pt = [], te = 0, sl = null, re = 1, de = "";
function Te(t, e) {
  $l[Wl++] = en, $l[Wl++] = ou, ou = t, en = e;
}
function mr(t, e, l) {
  Pt[te++] = re, Pt[te++] = de, Pt[te++] = sl, sl = t;
  var a = re;
  t = de;
  var n = 32 - Kt(a) - 1;
  a &= ~(1 << n), l += 1;
  var u = 32 - Kt(e) + n;
  if (30 < u) {
    var i = n - n % 5;
    u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, re = 1 << 32 - Kt(e) + n | l << n | a, de = u + t;
  } else re = 1 << u | l << n | a, de = t;
}
function Pc(t) {
  t.return !== null && (Te(t, 1), mr(t, 1, 0));
}
function ts(t) {
  for (; t === ou; ) ou = $l[--Wl], $l[Wl] = null, en = $l[--Wl], $l[Wl] = null;
  for (; t === sl; ) sl = Pt[--te], Pt[te] = null, de = Pt[--te], Pt[te] = null, re = Pt[--te], Pt[te] = null;
}
function hr(t, e) {
  Pt[te++] = re, Pt[te++] = de, Pt[te++] = sl, re = e.id, de = e.overflow, sl = t;
}
var At = null, nt = null, Z = false, tl = null, ae = false, ec = Error(p(519));
function fl(t) {
  var e = Error(p(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
  throw ln(le(e, t)), ec;
}
function ff(t) {
  var e = t.stateNode, l = t.type, a = t.memoizedProps;
  switch (e[Tt] = t, e[wt] = a, l) {
    case "dialog":
      q("cancel", e), q("close", e);
      break;
    case "iframe":
    case "object":
    case "embed":
      q("load", e);
      break;
    case "video":
    case "audio":
      for (l = 0; l < cn.length; l++) q(cn[l], e);
      break;
    case "source":
      q("error", e);
      break;
    case "img":
    case "image":
    case "link":
      q("error", e), q("load", e);
      break;
    case "details":
      q("toggle", e);
      break;
    case "input":
      q("invalid", e), Lo(e, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, true);
      break;
    case "select":
      q("invalid", e);
      break;
    case "textarea":
      q("invalid", e), Ko(e, a.value, a.defaultValue, a.children);
  }
  l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || a.suppressHydrationWarning === true || Wd(e.textContent, l) ? (a.popover != null && (q("beforetoggle", e), q("toggle", e)), a.onScroll != null && q("scroll", e), a.onScrollEnd != null && q("scrollend", e), a.onClick != null && (e.onclick = De), e = true) : e = false, e || fl(t, true);
}
function of(t) {
  for (At = t.return; At; ) switch (At.tag) {
    case 5:
    case 31:
    case 13:
      ae = false;
      return;
    case 27:
    case 3:
      ae = true;
      return;
    default:
      At = At.return;
  }
}
function Hl(t) {
  if (t !== At) return false;
  if (!Z) return of(t), Z = true, false;
  var e = t.tag, l;
  if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Ac(t.type, t.memoizedProps)), l = !l), l && nt && fl(t), of(t), e === 13) {
    if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(p(317));
    nt = Wf(t);
  } else if (e === 31) {
    if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(p(317));
    nt = Wf(t);
  } else e === 27 ? (e = nt, ml(t.type) ? (t = Oc, Oc = null, nt = t) : nt = e) : nt = At ? ue(t.stateNode.nextSibling) : null;
  return true;
}
function Nl() {
  nt = At = null, Z = false;
}
function mi() {
  var t = tl;
  return t !== null && (Bt === null ? Bt = t : Bt.push.apply(Bt, t), tl = null), t;
}
function ln(t) {
  tl === null ? tl = [t] : tl.push(t);
}
var lc = ye(null), Cl = null, _e = null;
function Ze(t, e, l) {
  et(lc, e._currentValue), e._currentValue = l;
}
function Me(t) {
  t._currentValue = lc.current, zt(lc);
}
function ac(t, e, l) {
  for (; t !== null; ) {
    var a = t.alternate;
    if ((t.childLanes & e) !== e ? (t.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), t === l) break;
    t = t.return;
  }
}
function nc(t, e, l, a) {
  var n = t.child;
  for (n !== null && (n.return = t); n !== null; ) {
    var u = n.dependencies;
    if (u !== null) {
      var i = n.child;
      u = u.firstContext;
      t: for (; u !== null; ) {
        var c = u;
        u = n;
        for (var f = 0; f < e.length; f++) if (c.context === e[f]) {
          u.lanes |= l, c = u.alternate, c !== null && (c.lanes |= l), ac(u.return, l, t), a || (i = null);
          break t;
        }
        u = c.next;
      }
    } else if (n.tag === 18) {
      if (i = n.return, i === null) throw Error(p(341));
      i.lanes |= l, u = i.alternate, u !== null && (u.lanes |= l), ac(i, l, t), i = null;
    } else i = n.child;
    if (i !== null) i.return = n;
    else for (i = n; i !== null; ) {
      if (i === t) {
        i = null;
        break;
      }
      if (n = i.sibling, n !== null) {
        n.return = i.return, i = n;
        break;
      }
      i = i.return;
    }
    n = i;
  }
}
function pa(t, e, l, a) {
  t = null;
  for (var n = e, u = false; n !== null; ) {
    if (!u) {
      if (n.flags & 524288) u = true;
      else if (n.flags & 262144) break;
    }
    if (n.tag === 10) {
      var i = n.alternate;
      if (i === null) throw Error(p(387));
      if (i = i.memoizedProps, i !== null) {
        var c = n.type;
        kt(n.pendingProps.value, i.value) || (t !== null ? t.push(c) : t = [c]);
      }
    } else if (n === au.current) {
      if (i = n.alternate, i === null) throw Error(p(387));
      i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(fn) : t = [fn]);
    }
    n = n.return;
  }
  t !== null && nc(e, t, l, a), e.flags |= 262144;
}
function ru(t) {
  for (t = t.firstContext; t !== null; ) {
    if (!kt(t.context._currentValue, t.memoizedValue)) return true;
    t = t.next;
  }
  return false;
}
function Tl(t) {
  Cl = t, _e = null, t = t.dependencies, t !== null && (t.firstContext = null);
}
function Et(t) {
  return yr(Cl, t);
}
function Mn(t, e) {
  return Cl === null && Tl(t), yr(t, e);
}
function yr(t, e) {
  var l = e._currentValue;
  if (e = { context: e, memoizedValue: l, next: null }, _e === null) {
    if (t === null) throw Error(p(308));
    _e = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
  } else _e = _e.next = e;
  return l;
}
var $m = typeof AbortController < "u" ? AbortController : function() {
  var t = [], e = this.signal = { aborted: false, addEventListener: function(l, a) {
    t.push(a);
  } };
  this.abort = function() {
    e.aborted = true, t.forEach(function(l) {
      return l();
    });
  };
}, Wm = xt.unstable_scheduleCallback, Fm = xt.unstable_NormalPriority, ht = { $$typeof: Ee, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
function es() {
  return { controller: new $m(), data: /* @__PURE__ */ new Map(), refCount: 0 };
}
function xn(t) {
  t.refCount--, t.refCount === 0 && Wm(Fm, function() {
    t.controller.abort();
  });
}
var qa = null, uc = 0, sa = 0, ea = null;
function Im(t, e) {
  if (qa === null) {
    var l = qa = [];
    uc = 0, sa = As(), ea = { status: "pending", value: void 0, then: function(a) {
      l.push(a);
    } };
  }
  return uc++, e.then(rf, rf), e;
}
function rf() {
  if (--uc === 0 && qa !== null) {
    ea !== null && (ea.status = "fulfilled");
    var t = qa;
    qa = null, sa = 0, ea = null;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
}
function Pm(t, e) {
  var l = [], a = { status: "pending", value: null, reason: null, then: function(n) {
    l.push(n);
  } };
  return t.then(function() {
    a.status = "fulfilled", a.value = e;
    for (var n = 0; n < l.length; n++) (0, l[n])(e);
  }, function(n) {
    for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++) (0, l[n])(void 0);
  }), a;
}
var df = B.S;
B.S = function(t, e) {
  _d = Lt(), typeof e == "object" && e !== null && typeof e.then == "function" && Im(t, e), df !== null && df(t, e);
};
var Sl = ye(null);
function ls() {
  var t = Sl.current;
  return t !== null ? t : tt.pooledCache;
}
function Jn(t, e) {
  e === null ? et(Sl, Sl.current) : et(Sl, e.pool);
}
function gr() {
  var t = ls();
  return t === null ? null : { parent: ht._currentValue, pool: t };
}
var ba = Error(p(460)), as = Error(p(474)), Qu = Error(p(542)), du = { then: function() {
} };
function mf(t) {
  return t = t.status, t === "fulfilled" || t === "rejected";
}
function vr(t, e, l) {
  switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(De, De), e = l), e.status) {
    case "fulfilled":
      return e.value;
    case "rejected":
      throw t = e.reason, yf(t), t;
    default:
      if (typeof e.status == "string") e.then(De, De);
      else {
        if (t = tt, t !== null && 100 < t.shellSuspendCounter) throw Error(p(482));
        t = e, t.status = "pending", t.then(function(a) {
          if (e.status === "pending") {
            var n = e;
            n.status = "fulfilled", n.value = a;
          }
        }, function(a) {
          if (e.status === "pending") {
            var n = e;
            n.status = "rejected", n.reason = a;
          }
        });
      }
      switch (e.status) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw t = e.reason, yf(t), t;
      }
      throw zl = e, ba;
  }
}
function vl(t) {
  try {
    var e = t._init;
    return e(t._payload);
  } catch (l) {
    throw l !== null && typeof l == "object" && typeof l.then == "function" ? (zl = l, ba) : l;
  }
}
var zl = null;
function hf() {
  if (zl === null) throw Error(p(459));
  var t = zl;
  return zl = null, t;
}
function yf(t) {
  if (t === ba || t === Qu) throw Error(p(483));
}
var la = null, an = 0;
function Un(t) {
  var e = an;
  return an += 1, la === null && (la = []), vr(la, t, e);
}
function Ea(t, e) {
  e = e.props.ref, t.ref = e !== void 0 ? e : null;
}
function Cn(t, e) {
  throw e.$$typeof === Y0 ? Error(p(525)) : (t = Object.prototype.toString.call(e), Error(p(31, t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t)));
}
function xr(t) {
  function e(r, o) {
    if (t) {
      var m = r.deletions;
      m === null ? (r.deletions = [o], r.flags |= 16) : m.push(o);
    }
  }
  function l(r, o) {
    if (!t) return null;
    for (; o !== null; ) e(r, o), o = o.sibling;
    return null;
  }
  function a(r) {
    for (var o = /* @__PURE__ */ new Map(); r !== null; ) r.key !== null ? o.set(r.key, r) : o.set(r.index, r), r = r.sibling;
    return o;
  }
  function n(r, o) {
    return r = Oe(r, o), r.index = 0, r.sibling = null, r;
  }
  function u(r, o, m) {
    return r.index = m, t ? (m = r.alternate, m !== null ? (m = m.index, m < o ? (r.flags |= 67108866, o) : m) : (r.flags |= 67108866, o)) : (r.flags |= 1048576, o);
  }
  function i(r) {
    return t && r.alternate === null && (r.flags |= 67108866), r;
  }
  function c(r, o, m, x) {
    return o === null || o.tag !== 6 ? (o = ri(m, r.mode, x), o.return = r, o) : (o = n(o, m), o.return = r, o);
  }
  function f(r, o, m, x) {
    var N = m.type;
    return N === ql ? v(r, o, m.props.children, x, m.key) : o !== null && (o.elementType === N || typeof N == "object" && N !== null && N.$$typeof === Qe && vl(N) === o.type) ? (o = n(o, m.props), Ea(o, m), o.return = r, o) : (o = Kn(m.type, m.key, m.props, null, r.mode, x), Ea(o, m), o.return = r, o);
  }
  function h(r, o, m, x) {
    return o === null || o.tag !== 4 || o.stateNode.containerInfo !== m.containerInfo || o.stateNode.implementation !== m.implementation ? (o = di(m, r.mode, x), o.return = r, o) : (o = n(o, m.children || []), o.return = r, o);
  }
  function v(r, o, m, x, N) {
    return o === null || o.tag !== 7 ? (o = bl(m, r.mode, x, N), o.return = r, o) : (o = n(o, m), o.return = r, o);
  }
  function g(r, o, m) {
    if (typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint") return o = ri("" + o, r.mode, m), o.return = r, o;
    if (typeof o == "object" && o !== null) {
      switch (o.$$typeof) {
        case Tn:
          return m = Kn(o.type, o.key, o.props, null, r.mode, m), Ea(m, o), m.return = r, m;
        case Ma:
          return o = di(o, r.mode, m), o.return = r, o;
        case Qe:
          return o = vl(o), g(r, o, m);
      }
      if (Ua(o) || Na(o)) return o = bl(o, r.mode, m, null), o.return = r, o;
      if (typeof o.then == "function") return g(r, Un(o), m);
      if (o.$$typeof === Ee) return g(r, Mn(r, o), m);
      Cn(r, o);
    }
    return null;
  }
  function d(r, o, m, x) {
    var N = o !== null ? o.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint") return N !== null ? null : c(r, o, "" + m, x);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Tn:
          return m.key === N ? f(r, o, m, x) : null;
        case Ma:
          return m.key === N ? h(r, o, m, x) : null;
        case Qe:
          return m = vl(m), d(r, o, m, x);
      }
      if (Ua(m) || Na(m)) return N !== null ? null : v(r, o, m, x, null);
      if (typeof m.then == "function") return d(r, o, Un(m), x);
      if (m.$$typeof === Ee) return d(r, o, Mn(r, m), x);
      Cn(r, m);
    }
    return null;
  }
  function y(r, o, m, x, N) {
    if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint") return r = r.get(m) || null, c(o, r, "" + x, N);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Tn:
          return r = r.get(x.key === null ? m : x.key) || null, f(o, r, x, N);
        case Ma:
          return r = r.get(x.key === null ? m : x.key) || null, h(o, r, x, N);
        case Qe:
          return x = vl(x), y(r, o, m, x, N);
      }
      if (Ua(x) || Na(x)) return r = r.get(m) || null, v(o, r, x, N, null);
      if (typeof x.then == "function") return y(r, o, m, Un(x), N);
      if (x.$$typeof === Ee) return y(r, o, m, Mn(o, x), N);
      Cn(o, x);
    }
    return null;
  }
  function j(r, o, m, x) {
    for (var N = null, _ = null, b = o, A = o = 0, D = null; b !== null && A < m.length; A++) {
      b.index > A ? (D = b, b = null) : D = b.sibling;
      var S = d(r, b, m[A], x);
      if (S === null) {
        b === null && (b = D);
        break;
      }
      t && b && S.alternate === null && e(r, b), o = u(S, o, A), _ === null ? N = S : _.sibling = S, _ = S, b = D;
    }
    if (A === m.length) return l(r, b), Z && Te(r, A), N;
    if (b === null) {
      for (; A < m.length; A++) b = g(r, m[A], x), b !== null && (o = u(b, o, A), _ === null ? N = b : _.sibling = b, _ = b);
      return Z && Te(r, A), N;
    }
    for (b = a(b); A < m.length; A++) D = y(b, r, A, m[A], x), D !== null && (t && D.alternate !== null && b.delete(D.key === null ? A : D.key), o = u(D, o, A), _ === null ? N = D : _.sibling = D, _ = D);
    return t && b.forEach(function(Y) {
      return e(r, Y);
    }), Z && Te(r, A), N;
  }
  function z(r, o, m, x) {
    if (m == null) throw Error(p(151));
    for (var N = null, _ = null, b = o, A = o = 0, D = null, S = m.next(); b !== null && !S.done; A++, S = m.next()) {
      b.index > A ? (D = b, b = null) : D = b.sibling;
      var Y = d(r, b, S.value, x);
      if (Y === null) {
        b === null && (b = D);
        break;
      }
      t && b && Y.alternate === null && e(r, b), o = u(Y, o, A), _ === null ? N = Y : _.sibling = Y, _ = Y, b = D;
    }
    if (S.done) return l(r, b), Z && Te(r, A), N;
    if (b === null) {
      for (; !S.done; A++, S = m.next()) S = g(r, S.value, x), S !== null && (o = u(S, o, A), _ === null ? N = S : _.sibling = S, _ = S);
      return Z && Te(r, A), N;
    }
    for (b = a(b); !S.done; A++, S = m.next()) S = y(b, r, A, S.value, x), S !== null && (t && S.alternate !== null && b.delete(S.key === null ? A : S.key), o = u(S, o, A), _ === null ? N = S : _.sibling = S, _ = S);
    return t && b.forEach(function(E) {
      return e(r, E);
    }), Z && Te(r, A), N;
  }
  function O(r, o, m, x) {
    if (typeof m == "object" && m !== null && m.type === ql && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Tn:
          t: {
            for (var N = m.key; o !== null; ) {
              if (o.key === N) {
                if (N = m.type, N === ql) {
                  if (o.tag === 7) {
                    l(r, o.sibling), x = n(o, m.props.children), x.return = r, r = x;
                    break t;
                  }
                } else if (o.elementType === N || typeof N == "object" && N !== null && N.$$typeof === Qe && vl(N) === o.type) {
                  l(r, o.sibling), x = n(o, m.props), Ea(x, m), x.return = r, r = x;
                  break t;
                }
                l(r, o);
                break;
              } else e(r, o);
              o = o.sibling;
            }
            m.type === ql ? (x = bl(m.props.children, r.mode, x, m.key), x.return = r, r = x) : (x = Kn(m.type, m.key, m.props, null, r.mode, x), Ea(x, m), x.return = r, r = x);
          }
          return i(r);
        case Ma:
          t: {
            for (N = m.key; o !== null; ) {
              if (o.key === N) if (o.tag === 4 && o.stateNode.containerInfo === m.containerInfo && o.stateNode.implementation === m.implementation) {
                l(r, o.sibling), x = n(o, m.children || []), x.return = r, r = x;
                break t;
              } else {
                l(r, o);
                break;
              }
              else e(r, o);
              o = o.sibling;
            }
            x = di(m, r.mode, x), x.return = r, r = x;
          }
          return i(r);
        case Qe:
          return m = vl(m), O(r, o, m, x);
      }
      if (Ua(m)) return j(r, o, m, x);
      if (Na(m)) {
        if (N = Na(m), typeof N != "function") throw Error(p(150));
        return m = N.call(m), z(r, o, m, x);
      }
      if (typeof m.then == "function") return O(r, o, Un(m), x);
      if (m.$$typeof === Ee) return O(r, o, Mn(r, m), x);
      Cn(r, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint" ? (m = "" + m, o !== null && o.tag === 6 ? (l(r, o.sibling), x = n(o, m), x.return = r, r = x) : (l(r, o), x = ri(m, r.mode, x), x.return = r, r = x), i(r)) : l(r, o);
  }
  return function(r, o, m, x) {
    try {
      an = 0;
      var N = O(r, o, m, x);
      return la = null, N;
    } catch (b) {
      if (b === ba || b === Qu) throw b;
      var _ = Xt(29, b, null, r.mode);
      return _.lanes = x, _.return = r, _;
    } finally {
    }
  };
}
var Al = xr(true), pr = xr(false), Xe = false;
function ns(t) {
  t.updateQueue = { baseState: t.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
}
function ic(t, e) {
  t = t.updateQueue, e.updateQueue === t && (e.updateQueue = { baseState: t.baseState, firstBaseUpdate: t.firstBaseUpdate, lastBaseUpdate: t.lastBaseUpdate, shared: t.shared, callbacks: null });
}
function el(t) {
  return { lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ll(t, e, l) {
  var a = t.updateQueue;
  if (a === null) return null;
  if (a = a.shared, L & 2) {
    var n = a.pending;
    return n === null ? e.next = e : (e.next = n.next, n.next = e), a.pending = e, e = fu(t), or(t, null, l), e;
  }
  return qu(t, a, e, l), fu(t);
}
function Qa(t, e, l) {
  if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
    var a = e.lanes;
    a &= t.pendingLanes, l |= a, e.lanes = l, Go(t, l);
  }
}
function hi(t, e) {
  var l = t.updateQueue, a = t.alternate;
  if (a !== null && (a = a.updateQueue, l === a)) {
    var n = null, u = null;
    if (l = l.firstBaseUpdate, l !== null) {
      do {
        var i = { lane: l.lane, tag: l.tag, payload: l.payload, callback: null, next: null };
        u === null ? n = u = i : u = u.next = i, l = l.next;
      } while (l !== null);
      u === null ? n = u = e : u = u.next = e;
    } else n = u = e;
    l = { baseState: a.baseState, firstBaseUpdate: n, lastBaseUpdate: u, shared: a.shared, callbacks: a.callbacks }, t.updateQueue = l;
    return;
  }
  t = l.lastBaseUpdate, t === null ? l.firstBaseUpdate = e : t.next = e, l.lastBaseUpdate = e;
}
var cc = false;
function Xa() {
  if (cc) {
    var t = ea;
    if (t !== null) throw t;
  }
}
function Za(t, e, l, a) {
  cc = false;
  var n = t.updateQueue;
  Xe = false;
  var u = n.firstBaseUpdate, i = n.lastBaseUpdate, c = n.shared.pending;
  if (c !== null) {
    n.shared.pending = null;
    var f = c, h = f.next;
    f.next = null, i === null ? u = h : i.next = h, i = f;
    var v = t.alternate;
    v !== null && (v = v.updateQueue, c = v.lastBaseUpdate, c !== i && (c === null ? v.firstBaseUpdate = h : c.next = h, v.lastBaseUpdate = f));
  }
  if (u !== null) {
    var g = n.baseState;
    i = 0, v = h = f = null, c = u;
    do {
      var d = c.lane & -536870913, y = d !== c.lane;
      if (y ? (X & d) === d : (a & d) === d) {
        d !== 0 && d === sa && (cc = true), v !== null && (v = v.next = { lane: 0, tag: c.tag, payload: c.payload, callback: null, next: null });
        t: {
          var j = t, z = c;
          d = e;
          var O = l;
          switch (z.tag) {
            case 1:
              if (j = z.payload, typeof j == "function") {
                g = j.call(O, g, d);
                break t;
              }
              g = j;
              break t;
            case 3:
              j.flags = j.flags & -65537 | 128;
            case 0:
              if (j = z.payload, d = typeof j == "function" ? j.call(O, g, d) : j, d == null) break t;
              g = it({}, g, d);
              break t;
            case 2:
              Xe = true;
          }
        }
        d = c.callback, d !== null && (t.flags |= 64, y && (t.flags |= 8192), y = n.callbacks, y === null ? n.callbacks = [d] : y.push(d));
      } else y = { lane: d, tag: c.tag, payload: c.payload, callback: c.callback, next: null }, v === null ? (h = v = y, f = g) : v = v.next = y, i |= d;
      if (c = c.next, c === null) {
        if (c = n.shared.pending, c === null) break;
        y = c, c = y.next, y.next = null, n.lastBaseUpdate = y, n.shared.pending = null;
      }
    } while (true);
    v === null && (f = g), n.baseState = f, n.firstBaseUpdate = h, n.lastBaseUpdate = v, u === null && (n.shared.lanes = 0), rl |= i, t.lanes = i, t.memoizedState = g;
  }
}
function br(t, e) {
  if (typeof t != "function") throw Error(p(191, t));
  t.call(e);
}
function Sr(t, e) {
  var l = t.callbacks;
  if (l !== null) for (t.callbacks = null, t = 0; t < l.length; t++) br(l[t], e);
}
var fa = ye(null), mu = ye(0);
function gf(t, e) {
  t = Ge, et(mu, t), et(fa, e), Ge = t | e.baseLanes;
}
function sc() {
  et(mu, Ge), et(fa, fa.current);
}
function us() {
  Ge = mu.current, zt(fa), zt(mu);
}
var $t = ye(null), ne = null;
function Le(t) {
  var e = t.alternate;
  et(ot, ot.current & 1), et($t, t), ne === null && (e === null || fa.current !== null || e.memoizedState !== null) && (ne = t);
}
function fc(t) {
  et(ot, ot.current), et($t, t), ne === null && (ne = t);
}
function zr(t) {
  t.tag === 22 ? (et(ot, ot.current), et($t, t), ne === null && (ne = t)) : Ve();
}
function Ve() {
  et(ot, ot.current), et($t, $t.current);
}
function Qt(t) {
  zt($t), ne === t && (ne = null), zt(ot);
}
var ot = ye(0);
function hu(t) {
  for (var e = t; e !== null; ) {
    if (e.tag === 13) {
      var l = e.memoizedState;
      if (l !== null && (l = l.dehydrated, l === null || Dc(l) || _c(l))) return e;
    } else if (e.tag === 19 && (e.memoizedProps.revealOrder === "forwards" || e.memoizedProps.revealOrder === "backwards" || e.memoizedProps.revealOrder === "unstable_legacy-backwards" || e.memoizedProps.revealOrder === "together")) {
      if (e.flags & 128) return e;
    } else if (e.child !== null) {
      e.child.return = e, e = e.child;
      continue;
    }
    if (e === t) break;
    for (; e.sibling === null; ) {
      if (e.return === null || e.return === t) return null;
      e = e.return;
    }
    e.sibling.return = e.return, e = e.sibling;
  }
  return null;
}
var He = 0, w = null, P = null, dt = null, yu = false, aa = false, El = false, gu = 0, nn = 0, na = null, th = 0;
function st() {
  throw Error(p(321));
}
function is(t, e) {
  if (e === null) return false;
  for (var l = 0; l < e.length && l < t.length; l++) if (!kt(t[l], e[l])) return false;
  return true;
}
function cs(t, e, l, a, n, u) {
  return He = u, w = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, B.H = t === null || t.memoizedState === null ? Pr : xs, El = false, u = l(a, n), El = false, aa && (u = Nr(e, l, a, n)), jr(t), u;
}
function jr(t) {
  B.H = un;
  var e = P !== null && P.next !== null;
  if (He = 0, dt = P = w = null, yu = false, nn = 0, na = null, e) throw Error(p(300));
  t === null || yt || (t = t.dependencies, t !== null && ru(t) && (yt = true));
}
function Nr(t, e, l, a) {
  w = t;
  var n = 0;
  do {
    if (aa && (na = null), nn = 0, aa = false, 25 <= n) throw Error(p(301));
    if (n += 1, dt = P = null, t.updateQueue != null) {
      var u = t.updateQueue;
      u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
    }
    B.H = td, u = e(l, a);
  } while (aa);
  return u;
}
function eh() {
  var t = B.H, e = t.useState()[0];
  return e = typeof e.then == "function" ? pn(e) : e, t = t.useState()[0], (P !== null ? P.memoizedState : null) !== t && (w.flags |= 1024), e;
}
function ss() {
  var t = gu !== 0;
  return gu = 0, t;
}
function fs(t, e, l) {
  e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
}
function os(t) {
  if (yu) {
    for (t = t.memoizedState; t !== null; ) {
      var e = t.queue;
      e !== null && (e.pending = null), t = t.next;
    }
    yu = false;
  }
  He = 0, dt = P = w = null, aa = false, nn = gu = 0, na = null;
}
function _t() {
  var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return dt === null ? w.memoizedState = dt = t : dt = dt.next = t, dt;
}
function rt() {
  if (P === null) {
    var t = w.alternate;
    t = t !== null ? t.memoizedState : null;
  } else t = P.next;
  var e = dt === null ? w.memoizedState : dt.next;
  if (e !== null) dt = e, P = t;
  else {
    if (t === null) throw w.alternate === null ? Error(p(467)) : Error(p(310));
    P = t, t = { memoizedState: P.memoizedState, baseState: P.baseState, baseQueue: P.baseQueue, queue: P.queue, next: null }, dt === null ? w.memoizedState = dt = t : dt = dt.next = t;
  }
  return dt;
}
function Xu() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function pn(t) {
  var e = nn;
  return nn += 1, na === null && (na = []), t = vr(na, t, e), e = w, (dt === null ? e.memoizedState : dt.next) === null && (e = e.alternate, B.H = e === null || e.memoizedState === null ? Pr : xs), t;
}
function Zu(t) {
  if (t !== null && typeof t == "object") {
    if (typeof t.then == "function") return pn(t);
    if (t.$$typeof === Ee) return Et(t);
  }
  throw Error(p(438, String(t)));
}
function rs(t) {
  var e = null, l = w.updateQueue;
  if (l !== null && (e = l.memoCache), e == null) {
    var a = w.alternate;
    a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (e = { data: a.data.map(function(n) {
      return n.slice();
    }), index: 0 })));
  }
  if (e == null && (e = { data: [], index: 0 }), l === null && (l = Xu(), w.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0) for (l = e.data[e.index] = Array(t), a = 0; a < t; a++) l[a] = q0;
  return e.index++, l;
}
function Be(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function kn(t) {
  var e = rt();
  return ds(e, P, t);
}
function ds(t, e, l) {
  var a = t.queue;
  if (a === null) throw Error(p(311));
  a.lastRenderedReducer = l;
  var n = t.baseQueue, u = a.pending;
  if (u !== null) {
    if (n !== null) {
      var i = n.next;
      n.next = u.next, u.next = i;
    }
    e.baseQueue = n = u, a.pending = null;
  }
  if (u = t.baseState, n === null) t.memoizedState = u;
  else {
    e = n.next;
    var c = i = null, f = null, h = e, v = false;
    do {
      var g = h.lane & -536870913;
      if (g !== h.lane ? (X & g) === g : (He & g) === g) {
        var d = h.revertLane;
        if (d === 0) f !== null && (f = f.next = { lane: 0, revertLane: 0, gesture: null, action: h.action, hasEagerState: h.hasEagerState, eagerState: h.eagerState, next: null }), g === sa && (v = true);
        else if ((He & d) === d) {
          h = h.next, d === sa && (v = true);
          continue;
        } else g = { lane: 0, revertLane: h.revertLane, gesture: null, action: h.action, hasEagerState: h.hasEagerState, eagerState: h.eagerState, next: null }, f === null ? (c = f = g, i = u) : f = f.next = g, w.lanes |= d, rl |= d;
        g = h.action, El && l(u, g), u = h.hasEagerState ? h.eagerState : l(u, g);
      } else d = { lane: g, revertLane: h.revertLane, gesture: h.gesture, action: h.action, hasEagerState: h.hasEagerState, eagerState: h.eagerState, next: null }, f === null ? (c = f = d, i = u) : f = f.next = d, w.lanes |= g, rl |= g;
      h = h.next;
    } while (h !== null && h !== e);
    if (f === null ? i = u : f.next = c, !kt(u, t.memoizedState) && (yt = true, v && (l = ea, l !== null))) throw l;
    t.memoizedState = u, t.baseState = i, t.baseQueue = f, a.lastRenderedState = u;
  }
  return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
}
function yi(t) {
  var e = rt(), l = e.queue;
  if (l === null) throw Error(p(311));
  l.lastRenderedReducer = t;
  var a = l.dispatch, n = l.pending, u = e.memoizedState;
  if (n !== null) {
    l.pending = null;
    var i = n = n.next;
    do
      u = t(u, i.action), i = i.next;
    while (i !== n);
    kt(u, e.memoizedState) || (yt = true), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), l.lastRenderedState = u;
  }
  return [u, a];
}
function Tr(t, e, l) {
  var a = w, n = rt(), u = Z;
  if (u) {
    if (l === void 0) throw Error(p(407));
    l = l();
  } else l = e();
  var i = !kt((P || n).memoizedState, l);
  if (i && (n.memoizedState = l, yt = true), n = n.queue, ms(Dr.bind(null, a, n, t), [t]), n.getSnapshot !== e || i || dt !== null && dt.memoizedState.tag & 1) {
    if (a.flags |= 2048, oa(9, { destroy: void 0 }, Er.bind(null, a, n, l, e), null), tt === null) throw Error(p(349));
    u || He & 127 || Ar(a, e, l);
  }
  return l;
}
function Ar(t, e, l) {
  t.flags |= 16384, t = { getSnapshot: e, value: l }, e = w.updateQueue, e === null ? (e = Xu(), w.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
}
function Er(t, e, l, a) {
  e.value = l, e.getSnapshot = a, _r(e) && Or(t);
}
function Dr(t, e, l) {
  return l(function() {
    _r(e) && Or(t);
  });
}
function _r(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var l = e();
    return !kt(t, l);
  } catch {
    return true;
  }
}
function Or(t) {
  var e = Ul(t, 2);
  e !== null && Gt(e, t, 2);
}
function oc(t) {
  var e = _t();
  if (typeof t == "function") {
    var l = t;
    if (t = l(), El) {
      Je(true);
      try {
        l();
      } finally {
        Je(false);
      }
    }
  }
  return e.memoizedState = e.baseState = t, e.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Be, lastRenderedState: t }, e;
}
function Mr(t, e, l, a) {
  return t.baseState = l, ds(t, P, typeof a == "function" ? a : Be);
}
function lh(t, e, l, a, n) {
  if (Vu(t)) throw Error(p(485));
  if (t = e.action, t !== null) {
    var u = { payload: n, action: t, next: null, isTransition: true, status: "pending", value: null, reason: null, listeners: [], then: function(i) {
      u.listeners.push(i);
    } };
    B.T !== null ? l(true) : u.isTransition = false, a(u), l = e.pending, l === null ? (u.next = e.pending = u, Ur(e, u)) : (u.next = l.next, e.pending = l.next = u);
  }
}
function Ur(t, e) {
  var l = e.action, a = e.payload, n = t.state;
  if (e.isTransition) {
    var u = B.T, i = {};
    B.T = i;
    try {
      var c = l(n, a), f = B.S;
      f !== null && f(i, c), vf(t, e, c);
    } catch (h) {
      rc(t, e, h);
    } finally {
      u !== null && i.types !== null && (u.types = i.types), B.T = u;
    }
  } else try {
    u = l(n, a), vf(t, e, u);
  } catch (h) {
    rc(t, e, h);
  }
}
function vf(t, e, l) {
  l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(function(a) {
    xf(t, e, a);
  }, function(a) {
    return rc(t, e, a);
  }) : xf(t, e, l);
}
function xf(t, e, l) {
  e.status = "fulfilled", e.value = l, Cr(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, Ur(t, l)));
}
function rc(t, e, l) {
  var a = t.pending;
  if (t.pending = null, a !== null) {
    a = a.next;
    do
      e.status = "rejected", e.reason = l, Cr(e), e = e.next;
    while (e !== a);
  }
  t.action = null;
}
function Cr(t) {
  t = t.listeners;
  for (var e = 0; e < t.length; e++) (0, t[e])();
}
function Hr(t, e) {
  return e;
}
function pf(t, e) {
  if (Z) {
    var l = tt.formState;
    if (l !== null) {
      t: {
        var a = w;
        if (Z) {
          if (nt) {
            e: {
              for (var n = nt, u = ae; n.nodeType !== 8; ) {
                if (!u) {
                  n = null;
                  break e;
                }
                if (n = ue(n.nextSibling), n === null) {
                  n = null;
                  break e;
                }
              }
              u = n.data, n = u === "F!" || u === "F" ? n : null;
            }
            if (n) {
              nt = ue(n.nextSibling), a = n.data === "F!";
              break t;
            }
          }
          fl(a);
        }
        a = false;
      }
      a && (e = l[0]);
    }
  }
  return l = _t(), l.memoizedState = l.baseState = e, a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Hr, lastRenderedState: e }, l.queue = a, l = Wr.bind(null, w, a), a.dispatch = l, a = oc(false), u = vs.bind(null, w, false, a.queue), a = _t(), n = { state: e, dispatch: null, action: t, pending: null }, a.queue = n, l = lh.bind(null, w, n, u, l), n.dispatch = l, a.memoizedState = t, [e, l, false];
}
function bf(t) {
  var e = rt();
  return Br(e, P, t);
}
function Br(t, e, l) {
  if (e = ds(t, e, Hr)[0], t = kn(Be)[0], typeof e == "object" && e !== null && typeof e.then == "function") try {
    var a = pn(e);
  } catch (i) {
    throw i === ba ? Qu : i;
  }
  else a = e;
  e = rt();
  var n = e.queue, u = n.dispatch;
  return l !== e.memoizedState && (w.flags |= 2048, oa(9, { destroy: void 0 }, ah.bind(null, n, l), null)), [a, u, t];
}
function ah(t, e) {
  t.action = e;
}
function Sf(t) {
  var e = rt(), l = P;
  if (l !== null) return Br(e, l, t);
  rt(), e = e.memoizedState, l = rt();
  var a = l.queue.dispatch;
  return l.memoizedState = t, [e, a, false];
}
function oa(t, e, l, a) {
  return t = { tag: t, create: l, deps: a, inst: e, next: null }, e = w.updateQueue, e === null && (e = Xu(), w.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (a = l.next, l.next = t, t.next = a, e.lastEffect = t), t;
}
function Rr() {
  return rt().memoizedState;
}
function $n(t, e, l, a) {
  var n = _t();
  w.flags |= t, n.memoizedState = oa(1 | e, { destroy: void 0 }, l, a === void 0 ? null : a);
}
function Lu(t, e, l, a) {
  var n = rt();
  a = a === void 0 ? null : a;
  var u = n.memoizedState.inst;
  P !== null && a !== null && is(a, P.memoizedState.deps) ? n.memoizedState = oa(e, u, l, a) : (w.flags |= t, n.memoizedState = oa(1 | e, u, l, a));
}
function zf(t, e) {
  $n(8390656, 8, t, e);
}
function ms(t, e) {
  Lu(2048, 8, t, e);
}
function nh(t) {
  w.flags |= 4;
  var e = w.updateQueue;
  if (e === null) e = Xu(), w.updateQueue = e, e.events = [t];
  else {
    var l = e.events;
    l === null ? e.events = [t] : l.push(t);
  }
}
function Gr(t) {
  var e = rt().memoizedState;
  return nh({ ref: e, nextImpl: t }), function() {
    if (L & 2) throw Error(p(440));
    return e.impl.apply(void 0, arguments);
  };
}
function wr(t, e) {
  return Lu(4, 2, t, e);
}
function Yr(t, e) {
  return Lu(4, 4, t, e);
}
function qr(t, e) {
  if (typeof e == "function") {
    t = t();
    var l = e(t);
    return function() {
      typeof l == "function" ? l() : e(null);
    };
  }
  if (e != null) return t = t(), e.current = t, function() {
    e.current = null;
  };
}
function Qr(t, e, l) {
  l = l != null ? l.concat([t]) : null, Lu(4, 4, qr.bind(null, e, t), l);
}
function hs() {
}
function Xr(t, e) {
  var l = rt();
  e = e === void 0 ? null : e;
  var a = l.memoizedState;
  return e !== null && is(e, a[1]) ? a[0] : (l.memoizedState = [t, e], t);
}
function Zr(t, e) {
  var l = rt();
  e = e === void 0 ? null : e;
  var a = l.memoizedState;
  if (e !== null && is(e, a[1])) return a[0];
  if (a = t(), El) {
    Je(true);
    try {
      t();
    } finally {
      Je(false);
    }
  }
  return l.memoizedState = [a, e], a;
}
function ys(t, e, l) {
  return l === void 0 || He & 1073741824 && !(X & 261930) ? t.memoizedState = e : (t.memoizedState = l, t = Md(), w.lanes |= t, rl |= t, l);
}
function Lr(t, e, l, a) {
  return kt(l, e) ? l : fa.current !== null ? (t = ys(t, l, a), kt(t, e) || (yt = true), t) : !(He & 42) || He & 1073741824 && !(X & 261930) ? (yt = true, t.memoizedState = l) : (t = Md(), w.lanes |= t, rl |= t, e);
}
function Vr(t, e, l, a, n) {
  var u = V.p;
  V.p = u !== 0 && 8 > u ? u : 8;
  var i = B.T, c = {};
  B.T = c, vs(t, false, e, l);
  try {
    var f = n(), h = B.S;
    if (h !== null && h(c, f), f !== null && typeof f == "object" && typeof f.then == "function") {
      var v = Pm(f, a);
      La(t, e, v, Jt(t));
    } else La(t, e, a, Jt(t));
  } catch (g) {
    La(t, e, { then: function() {
    }, status: "rejected", reason: g }, Jt());
  } finally {
    V.p = u, i !== null && c.types !== null && (i.types = c.types), B.T = i;
  }
}
function uh() {
}
function dc(t, e, l, a) {
  if (t.tag !== 5) throw Error(p(476));
  var n = Kr(t).queue;
  Vr(t, n, e, pl, l === null ? uh : function() {
    return Jr(t), l(a);
  });
}
function Kr(t) {
  var e = t.memoizedState;
  if (e !== null) return e;
  e = { memoizedState: pl, baseState: pl, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Be, lastRenderedState: pl }, next: null };
  var l = {};
  return e.next = { memoizedState: l, baseState: l, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Be, lastRenderedState: l }, next: null }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
}
function Jr(t) {
  var e = Kr(t);
  e.next === null && (e = t.alternate.memoizedState), La(t, e.next.queue, {}, Jt());
}
function gs() {
  return Et(fn);
}
function kr() {
  return rt().memoizedState;
}
function $r() {
  return rt().memoizedState;
}
function ih(t) {
  for (var e = t.return; e !== null; ) {
    switch (e.tag) {
      case 24:
      case 3:
        var l = Jt();
        t = el(l);
        var a = ll(e, t, l);
        a !== null && (Gt(a, e, l), Qa(a, e, l)), e = { cache: es() }, t.payload = e;
        return;
    }
    e = e.return;
  }
}
function ch(t, e, l) {
  var a = Jt();
  l = { lane: a, revertLane: 0, gesture: null, action: l, hasEagerState: false, eagerState: null, next: null }, Vu(t) ? Fr(e, l) : (l = Fc(t, e, l, a), l !== null && (Gt(l, t, a), Ir(l, e, a)));
}
function Wr(t, e, l) {
  var a = Jt();
  La(t, e, l, a);
}
function La(t, e, l, a) {
  var n = { lane: a, revertLane: 0, gesture: null, action: l, hasEagerState: false, eagerState: null, next: null };
  if (Vu(t)) Fr(e, n);
  else {
    var u = t.alternate;
    if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null)) try {
      var i = e.lastRenderedState, c = u(i, l);
      if (n.hasEagerState = true, n.eagerState = c, kt(c, i)) return qu(t, e, n, 0), tt === null && Yu(), false;
    } catch {
    } finally {
    }
    if (l = Fc(t, e, n, a), l !== null) return Gt(l, t, a), Ir(l, e, a), true;
  }
  return false;
}
function vs(t, e, l, a) {
  if (a = { lane: 2, revertLane: As(), gesture: null, action: a, hasEagerState: false, eagerState: null, next: null }, Vu(t)) {
    if (e) throw Error(p(479));
  } else e = Fc(t, l, a, 2), e !== null && Gt(e, t, 2);
}
function Vu(t) {
  var e = t.alternate;
  return t === w || e !== null && e === w;
}
function Fr(t, e) {
  aa = yu = true;
  var l = t.pending;
  l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
}
function Ir(t, e, l) {
  if (l & 4194048) {
    var a = e.lanes;
    a &= t.pendingLanes, l |= a, e.lanes = l, Go(t, l);
  }
}
var un = { readContext: Et, use: Zu, useCallback: st, useContext: st, useEffect: st, useImperativeHandle: st, useLayoutEffect: st, useInsertionEffect: st, useMemo: st, useReducer: st, useRef: st, useState: st, useDebugValue: st, useDeferredValue: st, useTransition: st, useSyncExternalStore: st, useId: st, useHostTransitionStatus: st, useFormState: st, useActionState: st, useOptimistic: st, useMemoCache: st, useCacheRefresh: st };
un.useEffectEvent = st;
var Pr = { readContext: Et, use: Zu, useCallback: function(t, e) {
  return _t().memoizedState = [t, e === void 0 ? null : e], t;
}, useContext: Et, useEffect: zf, useImperativeHandle: function(t, e, l) {
  l = l != null ? l.concat([t]) : null, $n(4194308, 4, qr.bind(null, e, t), l);
}, useLayoutEffect: function(t, e) {
  return $n(4194308, 4, t, e);
}, useInsertionEffect: function(t, e) {
  $n(4, 2, t, e);
}, useMemo: function(t, e) {
  var l = _t();
  e = e === void 0 ? null : e;
  var a = t();
  if (El) {
    Je(true);
    try {
      t();
    } finally {
      Je(false);
    }
  }
  return l.memoizedState = [a, e], a;
}, useReducer: function(t, e, l) {
  var a = _t();
  if (l !== void 0) {
    var n = l(e);
    if (El) {
      Je(true);
      try {
        l(e);
      } finally {
        Je(false);
      }
    }
  } else n = e;
  return a.memoizedState = a.baseState = n, t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: n }, a.queue = t, t = t.dispatch = ch.bind(null, w, t), [a.memoizedState, t];
}, useRef: function(t) {
  var e = _t();
  return t = { current: t }, e.memoizedState = t;
}, useState: function(t) {
  t = oc(t);
  var e = t.queue, l = Wr.bind(null, w, e);
  return e.dispatch = l, [t.memoizedState, l];
}, useDebugValue: hs, useDeferredValue: function(t, e) {
  var l = _t();
  return ys(l, t, e);
}, useTransition: function() {
  var t = oc(false);
  return t = Vr.bind(null, w, t.queue, true, false), _t().memoizedState = t, [false, t];
}, useSyncExternalStore: function(t, e, l) {
  var a = w, n = _t();
  if (Z) {
    if (l === void 0) throw Error(p(407));
    l = l();
  } else {
    if (l = e(), tt === null) throw Error(p(349));
    X & 127 || Ar(a, e, l);
  }
  n.memoizedState = l;
  var u = { value: l, getSnapshot: e };
  return n.queue = u, zf(Dr.bind(null, a, u, t), [t]), a.flags |= 2048, oa(9, { destroy: void 0 }, Er.bind(null, a, u, l, e), null), l;
}, useId: function() {
  var t = _t(), e = tt.identifierPrefix;
  if (Z) {
    var l = de, a = re;
    l = (a & ~(1 << 32 - Kt(a) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = gu++, 0 < l && (e += "H" + l.toString(32)), e += "_";
  } else l = th++, e = "_" + e + "r_" + l.toString(32) + "_";
  return t.memoizedState = e;
}, useHostTransitionStatus: gs, useFormState: pf, useActionState: pf, useOptimistic: function(t) {
  var e = _t();
  e.memoizedState = e.baseState = t;
  var l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
  return e.queue = l, e = vs.bind(null, w, true, l), l.dispatch = e, [t, e];
}, useMemoCache: rs, useCacheRefresh: function() {
  return _t().memoizedState = ih.bind(null, w);
}, useEffectEvent: function(t) {
  var e = _t(), l = { impl: t };
  return e.memoizedState = l, function() {
    if (L & 2) throw Error(p(440));
    return l.impl.apply(void 0, arguments);
  };
} }, xs = { readContext: Et, use: Zu, useCallback: Xr, useContext: Et, useEffect: ms, useImperativeHandle: Qr, useInsertionEffect: wr, useLayoutEffect: Yr, useMemo: Zr, useReducer: kn, useRef: Rr, useState: function() {
  return kn(Be);
}, useDebugValue: hs, useDeferredValue: function(t, e) {
  var l = rt();
  return Lr(l, P.memoizedState, t, e);
}, useTransition: function() {
  var t = kn(Be)[0], e = rt().memoizedState;
  return [typeof t == "boolean" ? t : pn(t), e];
}, useSyncExternalStore: Tr, useId: kr, useHostTransitionStatus: gs, useFormState: bf, useActionState: bf, useOptimistic: function(t, e) {
  var l = rt();
  return Mr(l, P, t, e);
}, useMemoCache: rs, useCacheRefresh: $r };
xs.useEffectEvent = Gr;
var td = { readContext: Et, use: Zu, useCallback: Xr, useContext: Et, useEffect: ms, useImperativeHandle: Qr, useInsertionEffect: wr, useLayoutEffect: Yr, useMemo: Zr, useReducer: yi, useRef: Rr, useState: function() {
  return yi(Be);
}, useDebugValue: hs, useDeferredValue: function(t, e) {
  var l = rt();
  return P === null ? ys(l, t, e) : Lr(l, P.memoizedState, t, e);
}, useTransition: function() {
  var t = yi(Be)[0], e = rt().memoizedState;
  return [typeof t == "boolean" ? t : pn(t), e];
}, useSyncExternalStore: Tr, useId: kr, useHostTransitionStatus: gs, useFormState: Sf, useActionState: Sf, useOptimistic: function(t, e) {
  var l = rt();
  return P !== null ? Mr(l, P, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
}, useMemoCache: rs, useCacheRefresh: $r };
td.useEffectEvent = Gr;
function gi(t, e, l, a) {
  e = t.memoizedState, l = l(a, e), l = l == null ? e : it({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
}
var mc = { enqueueSetState: function(t, e, l) {
  t = t._reactInternals;
  var a = Jt(), n = el(a);
  n.payload = e, l != null && (n.callback = l), e = ll(t, n, a), e !== null && (Gt(e, t, a), Qa(e, t, a));
}, enqueueReplaceState: function(t, e, l) {
  t = t._reactInternals;
  var a = Jt(), n = el(a);
  n.tag = 1, n.payload = e, l != null && (n.callback = l), e = ll(t, n, a), e !== null && (Gt(e, t, a), Qa(e, t, a));
}, enqueueForceUpdate: function(t, e) {
  t = t._reactInternals;
  var l = Jt(), a = el(l);
  a.tag = 2, e != null && (a.callback = e), e = ll(t, a, l), e !== null && (Gt(e, t, l), Qa(e, t, l));
} };
function jf(t, e, l, a, n, u, i) {
  return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : e.prototype && e.prototype.isPureReactComponent ? !tn(l, a) || !tn(n, u) : true;
}
function Nf(t, e, l, a) {
  t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, a), e.state !== t && mc.enqueueReplaceState(e, e.state, null);
}
function Dl(t, e) {
  var l = e;
  if ("ref" in e) {
    l = {};
    for (var a in e) a !== "ref" && (l[a] = e[a]);
  }
  if (t = t.defaultProps) {
    l === e && (l = it({}, l));
    for (var n in t) l[n] === void 0 && (l[n] = t[n]);
  }
  return l;
}
function ed(t) {
  su(t);
}
function ld(t) {
  console.error(t);
}
function ad(t) {
  su(t);
}
function vu(t, e) {
  try {
    var l = t.onUncaughtError;
    l(e.value, { componentStack: e.stack });
  } catch (a) {
    setTimeout(function() {
      throw a;
    });
  }
}
function Tf(t, e, l) {
  try {
    var a = t.onCaughtError;
    a(l.value, { componentStack: l.stack, errorBoundary: e.tag === 1 ? e.stateNode : null });
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
function hc(t, e, l) {
  return l = el(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
    vu(t, e);
  }, l;
}
function nd(t) {
  return t = el(t), t.tag = 3, t;
}
function ud(t, e, l, a) {
  var n = l.type.getDerivedStateFromError;
  if (typeof n == "function") {
    var u = a.value;
    t.payload = function() {
      return n(u);
    }, t.callback = function() {
      Tf(e, l, a);
    };
  }
  var i = l.stateNode;
  i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
    Tf(e, l, a), typeof n != "function" && (al === null ? al = /* @__PURE__ */ new Set([this]) : al.add(this));
    var c = a.stack;
    this.componentDidCatch(a.value, { componentStack: c !== null ? c : "" });
  });
}
function sh(t, e, l, a, n) {
  if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
    if (e = l.alternate, e !== null && pa(e, l, n, true), l = $t.current, l !== null) {
      switch (l.tag) {
        case 31:
        case 13:
          return ne === null ? zu() : l.alternate === null && ft === 0 && (ft = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === du ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), Ei(t, a, n)), false;
        case 22:
          return l.flags |= 65536, a === du ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([a]) }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), Ei(t, a, n)), false;
      }
      throw Error(p(435, l.tag));
    }
    return Ei(t, a, n), zu(), false;
  }
  if (Z) return e = $t.current, e !== null ? (!(e.flags & 65536) && (e.flags |= 256), e.flags |= 65536, e.lanes = n, a !== ec && (t = Error(p(422), { cause: a }), ln(le(t, l)))) : (a !== ec && (e = Error(p(423), { cause: a }), ln(le(e, l))), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = le(a, l), n = hc(t.stateNode, a, n), hi(t, n), ft !== 4 && (ft = 2)), false;
  var u = Error(p(520), { cause: a });
  if (u = le(u, l), Ja === null ? Ja = [u] : Ja.push(u), ft !== 4 && (ft = 2), e === null) return true;
  a = le(a, l), l = e;
  do {
    switch (l.tag) {
      case 3:
        return l.flags |= 65536, t = n & -n, l.lanes |= t, t = hc(l.stateNode, a, t), hi(l, t), false;
      case 1:
        if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (al === null || !al.has(u)))) return l.flags |= 65536, n &= -n, l.lanes |= n, n = nd(n), ud(n, t, l, a), hi(l, n), false;
    }
    l = l.return;
  } while (l !== null);
  return false;
}
var ps = Error(p(461)), yt = false;
function Nt(t, e, l, a) {
  e.child = t === null ? pr(e, null, l, a) : Al(e, t.child, l, a);
}
function Af(t, e, l, a, n) {
  l = l.render;
  var u = e.ref;
  if ("ref" in a) {
    var i = {};
    for (var c in a) c !== "ref" && (i[c] = a[c]);
  } else i = a;
  return Tl(e), a = cs(t, e, l, i, u, n), c = ss(), t !== null && !yt ? (fs(t, e, n), Re(t, e, n)) : (Z && c && Pc(e), e.flags |= 1, Nt(t, e, a, n), e.child);
}
function Ef(t, e, l, a, n) {
  if (t === null) {
    var u = l.type;
    return typeof u == "function" && !Ic(u) && u.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = u, id(t, e, u, a, n)) : (t = Kn(l.type, null, a, e, e.mode, n), t.ref = e.ref, t.return = e, e.child = t);
  }
  if (u = t.child, !bs(t, n)) {
    var i = u.memoizedProps;
    if (l = l.compare, l = l !== null ? l : tn, l(i, a) && t.ref === e.ref) return Re(t, e, n);
  }
  return e.flags |= 1, t = Oe(u, a), t.ref = e.ref, t.return = e, e.child = t;
}
function id(t, e, l, a, n) {
  if (t !== null) {
    var u = t.memoizedProps;
    if (tn(u, a) && t.ref === e.ref) if (yt = false, e.pendingProps = a = u, bs(t, n)) t.flags & 131072 && (yt = true);
    else return e.lanes = t.lanes, Re(t, e, n);
  }
  return yc(t, e, l, a, n);
}
function cd(t, e, l, a) {
  var n = a.children, u = t !== null ? t.memoizedState : null;
  if (t === null && e.stateNode === null && (e.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), a.mode === "hidden") {
    if (e.flags & 128) {
      if (u = u !== null ? u.baseLanes | l : l, t !== null) {
        for (a = e.child = t.child, n = 0; a !== null; ) n = n | a.lanes | a.childLanes, a = a.sibling;
        a = n & ~u;
      } else a = 0, e.child = null;
      return Df(t, e, u, l, a);
    }
    if (l & 536870912) e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Jn(e, u !== null ? u.cachePool : null), u !== null ? gf(e, u) : sc(), zr(e);
    else return a = e.lanes = 536870912, Df(t, e, u !== null ? u.baseLanes | l : l, l, a);
  } else u !== null ? (Jn(e, u.cachePool), gf(e, u), Ve(), e.memoizedState = null) : (t !== null && Jn(e, null), sc(), Ve());
  return Nt(t, e, n, l), e.child;
}
function Ha(t, e) {
  return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), e.sibling;
}
function Df(t, e, l, a, n) {
  var u = ls();
  return u = u === null ? null : { parent: ht._currentValue, pool: u }, e.memoizedState = { baseLanes: l, cachePool: u }, t !== null && Jn(e, null), sc(), zr(e), t !== null && pa(t, e, a, true), e.childLanes = n, null;
}
function Wn(t, e) {
  return e = xu({ mode: e.mode, children: e.children }, t.mode), e.ref = t.ref, t.child = e, e.return = t, e;
}
function _f(t, e, l) {
  return Al(e, t.child, null, l), t = Wn(e, e.pendingProps), t.flags |= 2, Qt(e), e.memoizedState = null, t;
}
function fh(t, e, l) {
  var a = e.pendingProps, n = (e.flags & 128) !== 0;
  if (e.flags &= -129, t === null) {
    if (Z) {
      if (a.mode === "hidden") return t = Wn(e, a), e.lanes = 536870912, Ha(null, t);
      if (fc(e), (t = nt) ? (t = Pd(t, ae), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = { dehydrated: t, treeContext: sl !== null ? { id: re, overflow: de } : null, retryLane: 536870912, hydrationErrors: null }, l = dr(t), l.return = e, e.child = l, At = e, nt = null)) : t = null, t === null) throw fl(e);
      return e.lanes = 536870912, null;
    }
    return Wn(e, a);
  }
  var u = t.memoizedState;
  if (u !== null) {
    var i = u.dehydrated;
    if (fc(e), n) if (e.flags & 256) e.flags &= -257, e = _f(t, e, l);
    else if (e.memoizedState !== null) e.child = t.child, e.flags |= 128, e = null;
    else throw Error(p(558));
    else if (yt || pa(t, e, l, false), n = (l & t.childLanes) !== 0, yt || n) {
      if (a = tt, a !== null && (i = wo(a, l), i !== 0 && i !== u.retryLane)) throw u.retryLane = i, Ul(t, i), Gt(a, t, i), ps;
      zu(), e = _f(t, e, l);
    } else t = u.treeContext, nt = ue(i.nextSibling), At = e, Z = true, tl = null, ae = false, t !== null && hr(e, t), e = Wn(e, a), e.flags |= 4096;
    return e;
  }
  return t = Oe(t.child, { mode: a.mode, children: a.children }), t.ref = e.ref, e.child = t, t.return = e, t;
}
function Fn(t, e) {
  var l = e.ref;
  if (l === null) t !== null && t.ref !== null && (e.flags |= 4194816);
  else {
    if (typeof l != "function" && typeof l != "object") throw Error(p(284));
    (t === null || t.ref !== l) && (e.flags |= 4194816);
  }
}
function yc(t, e, l, a, n) {
  return Tl(e), l = cs(t, e, l, a, void 0, n), a = ss(), t !== null && !yt ? (fs(t, e, n), Re(t, e, n)) : (Z && a && Pc(e), e.flags |= 1, Nt(t, e, l, n), e.child);
}
function Of(t, e, l, a, n, u) {
  return Tl(e), e.updateQueue = null, l = Nr(e, a, l, n), jr(t), a = ss(), t !== null && !yt ? (fs(t, e, u), Re(t, e, u)) : (Z && a && Pc(e), e.flags |= 1, Nt(t, e, l, u), e.child);
}
function Mf(t, e, l, a, n) {
  if (Tl(e), e.stateNode === null) {
    var u = kl, i = l.contextType;
    typeof i == "object" && i !== null && (u = Et(i)), u = new l(a, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = mc, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = a, u.state = e.memoizedState, u.refs = {}, ns(e), i = l.contextType, u.context = typeof i == "object" && i !== null ? Et(i) : kl, u.state = e.memoizedState, i = l.getDerivedStateFromProps, typeof i == "function" && (gi(e, l, i, a), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && mc.enqueueReplaceState(u, u.state, null), Za(e, a, u, n), Xa(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = true;
  } else if (t === null) {
    u = e.stateNode;
    var c = e.memoizedProps, f = Dl(l, c);
    u.props = f;
    var h = u.context, v = l.contextType;
    i = kl, typeof v == "object" && v !== null && (i = Et(v));
    var g = l.getDerivedStateFromProps;
    v = typeof g == "function" || typeof u.getSnapshotBeforeUpdate == "function", c = e.pendingProps !== c, v || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c || h !== i) && Nf(e, u, a, i), Xe = false;
    var d = e.memoizedState;
    u.state = d, Za(e, a, u, n), Xa(), h = e.memoizedState, c || d !== h || Xe ? (typeof g == "function" && (gi(e, l, g, a), h = e.memoizedState), (f = Xe || jf(e, l, f, a, d, h, i)) ? (v || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = h), u.props = a, u.state = h, u.context = i, a = f) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = false);
  } else {
    u = e.stateNode, ic(t, e), i = e.memoizedProps, v = Dl(l, i), u.props = v, g = e.pendingProps, d = u.context, h = l.contextType, f = kl, typeof h == "object" && h !== null && (f = Et(h)), c = l.getDerivedStateFromProps, (h = typeof c == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== g || d !== f) && Nf(e, u, a, f), Xe = false, d = e.memoizedState, u.state = d, Za(e, a, u, n), Xa();
    var y = e.memoizedState;
    i !== g || d !== y || Xe || t !== null && t.dependencies !== null && ru(t.dependencies) ? (typeof c == "function" && (gi(e, l, c, a), y = e.memoizedState), (v = Xe || jf(e, l, v, a, d, y, f) || t !== null && t.dependencies !== null && ru(t.dependencies)) ? (h || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, y, f), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(a, y, f)), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && d === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && d === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = y), u.props = a, u.state = y, u.context = f, a = v) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && d === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && d === t.memoizedState || (e.flags |= 1024), a = false);
  }
  return u = a, Fn(t, e), a = (e.flags & 128) !== 0, u || a ? (u = e.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && a ? (e.child = Al(e, t.child, null, n), e.child = Al(e, null, l, n)) : Nt(t, e, l, n), e.memoizedState = u.state, t = e.child) : t = Re(t, e, n), t;
}
function Uf(t, e, l, a) {
  return Nl(), e.flags |= 256, Nt(t, e, l, a), e.child;
}
var vi = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
function xi(t) {
  return { baseLanes: t, cachePool: gr() };
}
function pi(t, e, l) {
  return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Zt), t;
}
function sd(t, e, l) {
  var a = e.pendingProps, n = false, u = (e.flags & 128) !== 0, i;
  if ((i = u) || (i = t !== null && t.memoizedState === null ? false : (ot.current & 2) !== 0), i && (n = true, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
    if (Z) {
      if (n ? Le(e) : Ve(), (t = nt) ? (t = Pd(t, ae), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = { dehydrated: t, treeContext: sl !== null ? { id: re, overflow: de } : null, retryLane: 536870912, hydrationErrors: null }, l = dr(t), l.return = e, e.child = l, At = e, nt = null)) : t = null, t === null) throw fl(e);
      return _c(t) ? e.lanes = 32 : e.lanes = 536870912, null;
    }
    var c = a.children;
    return a = a.fallback, n ? (Ve(), n = e.mode, c = xu({ mode: "hidden", children: c }, n), a = bl(a, n, l, null), c.return = e, a.return = e, c.sibling = a, e.child = c, a = e.child, a.memoizedState = xi(l), a.childLanes = pi(t, i, l), e.memoizedState = vi, Ha(null, a)) : (Le(e), gc(e, c));
  }
  var f = t.memoizedState;
  if (f !== null && (c = f.dehydrated, c !== null)) {
    if (u) e.flags & 256 ? (Le(e), e.flags &= -257, e = bi(t, e, l)) : e.memoizedState !== null ? (Ve(), e.child = t.child, e.flags |= 128, e = null) : (Ve(), c = a.fallback, n = e.mode, a = xu({ mode: "visible", children: a.children }, n), c = bl(c, n, l, null), c.flags |= 2, a.return = e, c.return = e, a.sibling = c, e.child = a, Al(e, t.child, null, l), a = e.child, a.memoizedState = xi(l), a.childLanes = pi(t, i, l), e.memoizedState = vi, e = Ha(null, a));
    else if (Le(e), _c(c)) {
      if (i = c.nextSibling && c.nextSibling.dataset, i) var h = i.dgst;
      i = h, a = Error(p(419)), a.stack = "", a.digest = i, ln({ value: a, source: null, stack: null }), e = bi(t, e, l);
    } else if (yt || pa(t, e, l, false), i = (l & t.childLanes) !== 0, yt || i) {
      if (i = tt, i !== null && (a = wo(i, l), a !== 0 && a !== f.retryLane)) throw f.retryLane = a, Ul(t, a), Gt(i, t, a), ps;
      Dc(c) || zu(), e = bi(t, e, l);
    } else Dc(c) ? (e.flags |= 192, e.child = t.child, e = null) : (t = f.treeContext, nt = ue(c.nextSibling), At = e, Z = true, tl = null, ae = false, t !== null && hr(e, t), e = gc(e, a.children), e.flags |= 4096);
    return e;
  }
  return n ? (Ve(), c = a.fallback, n = e.mode, f = t.child, h = f.sibling, a = Oe(f, { mode: "hidden", children: a.children }), a.subtreeFlags = f.subtreeFlags & 65011712, h !== null ? c = Oe(h, c) : (c = bl(c, n, l, null), c.flags |= 2), c.return = e, a.return = e, a.sibling = c, e.child = a, Ha(null, a), a = e.child, c = t.child.memoizedState, c === null ? c = xi(l) : (n = c.cachePool, n !== null ? (f = ht._currentValue, n = n.parent !== f ? { parent: f, pool: f } : n) : n = gr(), c = { baseLanes: c.baseLanes | l, cachePool: n }), a.memoizedState = c, a.childLanes = pi(t, i, l), e.memoizedState = vi, Ha(t.child, a)) : (Le(e), l = t.child, t = l.sibling, l = Oe(l, { mode: "visible", children: a.children }), l.return = e, l.sibling = null, t !== null && (i = e.deletions, i === null ? (e.deletions = [t], e.flags |= 16) : i.push(t)), e.child = l, e.memoizedState = null, l);
}
function gc(t, e) {
  return e = xu({ mode: "visible", children: e }, t.mode), e.return = t, t.child = e;
}
function xu(t, e) {
  return t = Xt(22, t, null, e), t.lanes = 0, t;
}
function bi(t, e, l) {
  return Al(e, t.child, null, l), t = gc(e, e.pendingProps.children), t.flags |= 2, e.memoizedState = null, t;
}
function Cf(t, e, l) {
  t.lanes |= e;
  var a = t.alternate;
  a !== null && (a.lanes |= e), ac(t.return, e, l);
}
function Si(t, e, l, a, n, u) {
  var i = t.memoizedState;
  i === null ? t.memoizedState = { isBackwards: e, rendering: null, renderingStartTime: 0, last: a, tail: l, tailMode: n, treeForkCount: u } : (i.isBackwards = e, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = l, i.tailMode = n, i.treeForkCount = u);
}
function fd(t, e, l) {
  var a = e.pendingProps, n = a.revealOrder, u = a.tail;
  a = a.children;
  var i = ot.current, c = (i & 2) !== 0;
  if (c ? (i = i & 1 | 2, e.flags |= 128) : i &= 1, et(ot, i), Nt(t, e, a, l), a = Z ? en : 0, !c && t !== null && t.flags & 128) t: for (t = e.child; t !== null; ) {
    if (t.tag === 13) t.memoizedState !== null && Cf(t, l, e);
    else if (t.tag === 19) Cf(t, l, e);
    else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break t;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) break t;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  switch (n) {
    case "forwards":
      for (l = e.child, n = null; l !== null; ) t = l.alternate, t !== null && hu(t) === null && (n = l), l = l.sibling;
      l = n, l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null), Si(e, false, n, l, u, a);
      break;
    case "backwards":
    case "unstable_legacy-backwards":
      for (l = null, n = e.child, e.child = null; n !== null; ) {
        if (t = n.alternate, t !== null && hu(t) === null) {
          e.child = n;
          break;
        }
        t = n.sibling, n.sibling = l, l = n, n = t;
      }
      Si(e, true, l, null, u, a);
      break;
    case "together":
      Si(e, false, null, null, void 0, a);
      break;
    default:
      e.memoizedState = null;
  }
  return e.child;
}
function Re(t, e, l) {
  if (t !== null && (e.dependencies = t.dependencies), rl |= e.lanes, !(l & e.childLanes)) if (t !== null) {
    if (pa(t, e, l, false), (l & e.childLanes) === 0) return null;
  } else return null;
  if (t !== null && e.child !== t.child) throw Error(p(153));
  if (e.child !== null) {
    for (t = e.child, l = Oe(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; ) t = t.sibling, l = l.sibling = Oe(t, t.pendingProps), l.return = e;
    l.sibling = null;
  }
  return e.child;
}
function bs(t, e) {
  return t.lanes & e ? true : (t = t.dependencies, !!(t !== null && ru(t)));
}
function oh(t, e, l) {
  switch (e.tag) {
    case 3:
      nu(e, e.stateNode.containerInfo), Ze(e, ht, t.memoizedState.cache), Nl();
      break;
    case 27:
    case 5:
      Li(e);
      break;
    case 4:
      nu(e, e.stateNode.containerInfo);
      break;
    case 10:
      Ze(e, e.type, e.memoizedProps.value);
      break;
    case 31:
      if (e.memoizedState !== null) return e.flags |= 128, fc(e), null;
      break;
    case 13:
      var a = e.memoizedState;
      if (a !== null) return a.dehydrated !== null ? (Le(e), e.flags |= 128, null) : l & e.child.childLanes ? sd(t, e, l) : (Le(e), t = Re(t, e, l), t !== null ? t.sibling : null);
      Le(e);
      break;
    case 19:
      var n = (t.flags & 128) !== 0;
      if (a = (l & e.childLanes) !== 0, a || (pa(t, e, l, false), a = (l & e.childLanes) !== 0), n) {
        if (a) return fd(t, e, l);
        e.flags |= 128;
      }
      if (n = e.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), et(ot, ot.current), a) break;
      return null;
    case 22:
      return e.lanes = 0, cd(t, e, l, e.pendingProps);
    case 24:
      Ze(e, ht, t.memoizedState.cache);
  }
  return Re(t, e, l);
}
function od(t, e, l) {
  if (t !== null) if (t.memoizedProps !== e.pendingProps) yt = true;
  else {
    if (!bs(t, l) && !(e.flags & 128)) return yt = false, oh(t, e, l);
    yt = !!(t.flags & 131072);
  }
  else yt = false, Z && e.flags & 1048576 && mr(e, en, e.index);
  switch (e.lanes = 0, e.tag) {
    case 16:
      t: {
        var a = e.pendingProps;
        if (t = vl(e.elementType), e.type = t, typeof t == "function") Ic(t) ? (a = Dl(t, a), e.tag = 1, e = Mf(null, e, t, a, l)) : (e.tag = 0, e = yc(null, e, t, a, l));
        else {
          if (t != null) {
            var n = t.$$typeof;
            if (n === wc) {
              e.tag = 11, e = Af(null, e, t, a, l);
              break t;
            } else if (n === Yc) {
              e.tag = 14, e = Ef(null, e, t, a, l);
              break t;
            }
          }
          throw e = Xi(t) || t, Error(p(306, e, ""));
        }
      }
      return e;
    case 0:
      return yc(t, e, e.type, e.pendingProps, l);
    case 1:
      return a = e.type, n = Dl(a, e.pendingProps), Mf(t, e, a, n, l);
    case 3:
      t: {
        if (nu(e, e.stateNode.containerInfo), t === null) throw Error(p(387));
        a = e.pendingProps;
        var u = e.memoizedState;
        n = u.element, ic(t, e), Za(e, a, null, l);
        var i = e.memoizedState;
        if (a = i.cache, Ze(e, ht, a), a !== u.cache && nc(e, [ht], l, true), Xa(), a = i.element, u.isDehydrated) if (u = { element: a, isDehydrated: false, cache: i.cache }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
          e = Uf(t, e, a, l);
          break t;
        } else if (a !== n) {
          n = le(Error(p(424)), e), ln(n), e = Uf(t, e, a, l);
          break t;
        } else {
          switch (t = e.stateNode.containerInfo, t.nodeType) {
            case 9:
              t = t.body;
              break;
            default:
              t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
          }
          for (nt = ue(t.firstChild), At = e, Z = true, tl = null, ae = true, l = pr(e, null, a, l), e.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
        }
        else {
          if (Nl(), a === n) {
            e = Re(t, e, l);
            break t;
          }
          Nt(t, e, a, l);
        }
        e = e.child;
      }
      return e;
    case 26:
      return Fn(t, e), t === null ? (l = Pf(e.type, null, e.pendingProps, null)) ? e.memoizedState = l : Z || (l = e.type, t = e.pendingProps, a = Au(Pe.current).createElement(l), a[Tt] = e, a[wt] = t, Dt(a, l, t), St(a), e.stateNode = a) : e.memoizedState = Pf(e.type, t.memoizedProps, e.pendingProps, t.memoizedState), null;
    case 27:
      return Li(e), t === null && Z && (a = e.stateNode = t0(e.type, e.pendingProps, Pe.current), At = e, ae = true, n = nt, ml(e.type) ? (Oc = n, nt = ue(a.firstChild)) : nt = n), Nt(t, e, e.pendingProps.children, l), Fn(t, e), t === null && (e.flags |= 4194304), e.child;
    case 5:
      return t === null && Z && ((n = a = nt) && (a = qh(a, e.type, e.pendingProps, ae), a !== null ? (e.stateNode = a, At = e, nt = ue(a.firstChild), ae = false, n = true) : n = false), n || fl(e)), Li(e), n = e.type, u = e.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, Ac(n, u) ? a = null : i !== null && Ac(n, i) && (e.flags |= 32), e.memoizedState !== null && (n = cs(t, e, eh, null, null, l), fn._currentValue = n), Fn(t, e), Nt(t, e, a, l), e.child;
    case 6:
      return t === null && Z && ((t = l = nt) && (l = Qh(l, e.pendingProps, ae), l !== null ? (e.stateNode = l, At = e, nt = null, t = true) : t = false), t || fl(e)), null;
    case 13:
      return sd(t, e, l);
    case 4:
      return nu(e, e.stateNode.containerInfo), a = e.pendingProps, t === null ? e.child = Al(e, null, a, l) : Nt(t, e, a, l), e.child;
    case 11:
      return Af(t, e, e.type, e.pendingProps, l);
    case 7:
      return Nt(t, e, e.pendingProps, l), e.child;
    case 8:
      return Nt(t, e, e.pendingProps.children, l), e.child;
    case 12:
      return Nt(t, e, e.pendingProps.children, l), e.child;
    case 10:
      return a = e.pendingProps, Ze(e, e.type, a.value), Nt(t, e, a.children, l), e.child;
    case 9:
      return n = e.type._context, a = e.pendingProps.children, Tl(e), n = Et(n), a = a(n), e.flags |= 1, Nt(t, e, a, l), e.child;
    case 14:
      return Ef(t, e, e.type, e.pendingProps, l);
    case 15:
      return id(t, e, e.type, e.pendingProps, l);
    case 19:
      return fd(t, e, l);
    case 31:
      return fh(t, e, l);
    case 22:
      return cd(t, e, l, e.pendingProps);
    case 24:
      return Tl(e), a = Et(ht), t === null ? (n = ls(), n === null && (n = tt, u = es(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), e.memoizedState = { parent: a, cache: n }, ns(e), Ze(e, ht, n)) : (t.lanes & l && (ic(t, e), Za(e, null, null, l), Xa()), n = t.memoizedState, u = e.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), Ze(e, ht, a)) : (a = u.cache, Ze(e, ht, a), a !== n.cache && nc(e, [ht], l, true))), Nt(t, e, e.pendingProps.children, l), e.child;
    case 29:
      throw e.pendingProps;
  }
  throw Error(p(156, e.tag));
}
function Se(t) {
  t.flags |= 4;
}
function zi(t, e, l, a, n) {
  if ((e = (t.mode & 32) !== 0) && (e = false), e) {
    if (t.flags |= 16777216, (n & 335544128) === n) if (t.stateNode.complete) t.flags |= 8192;
    else if (Hd()) t.flags |= 8192;
    else throw zl = du, as;
  } else t.flags &= -16777217;
}
function Hf(t, e) {
  if (e.type !== "stylesheet" || e.state.loading & 4) t.flags &= -16777217;
  else if (t.flags |= 16777216, !a0(e)) if (Hd()) t.flags |= 8192;
  else throw zl = du, as;
}
function Hn(t, e) {
  e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Bo() : 536870912, t.lanes |= e, ra |= e);
}
function Da(t, e) {
  if (!Z) switch (t.tailMode) {
    case "hidden":
      e = t.tail;
      for (var l = null; e !== null; ) e.alternate !== null && (l = e), e = e.sibling;
      l === null ? t.tail = null : l.sibling = null;
      break;
    case "collapsed":
      l = t.tail;
      for (var a = null; l !== null; ) l.alternate !== null && (a = l), l = l.sibling;
      a === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
  }
}
function at(t) {
  var e = t.alternate !== null && t.alternate.child === t.child, l = 0, a = 0;
  if (e) for (var n = t.child; n !== null; ) l |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = t, n = n.sibling;
  else for (n = t.child; n !== null; ) l |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
  return t.subtreeFlags |= a, t.childLanes = l, e;
}
function rh(t, e, l) {
  var a = e.pendingProps;
  switch (ts(e), e.tag) {
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return at(e), null;
    case 1:
      return at(e), null;
    case 3:
      return l = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), Me(ht), ua(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (Hl(e) ? Se(e) : t === null || t.memoizedState.isDehydrated && !(e.flags & 256) || (e.flags |= 1024, mi())), at(e), null;
    case 26:
      var n = e.type, u = e.memoizedState;
      return t === null ? (Se(e), u !== null ? (at(e), Hf(e, u)) : (at(e), zi(e, n, null, a, l))) : u ? u !== t.memoizedState ? (Se(e), at(e), Hf(e, u)) : (at(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && Se(e), at(e), zi(e, n, t, a, l)), null;
    case 27:
      if (uu(e), l = Pe.current, n = e.type, t !== null && e.stateNode != null) t.memoizedProps !== a && Se(e);
      else {
        if (!a) {
          if (e.stateNode === null) throw Error(p(166));
          return at(e), null;
        }
        t = he.current, Hl(e) ? ff(e) : (t = t0(n, a, l), e.stateNode = t, Se(e));
      }
      return at(e), null;
    case 5:
      if (uu(e), n = e.type, t !== null && e.stateNode != null) t.memoizedProps !== a && Se(e);
      else {
        if (!a) {
          if (e.stateNode === null) throw Error(p(166));
          return at(e), null;
        }
        if (u = he.current, Hl(e)) ff(e);
        else {
          var i = Au(Pe.current);
          switch (u) {
            case 1:
              u = i.createElementNS("http://www.w3.org/2000/svg", n);
              break;
            case 2:
              u = i.createElementNS("http://www.w3.org/1998/Math/MathML", n);
              break;
            default:
              switch (n) {
                case "svg":
                  u = i.createElementNS("http://www.w3.org/2000/svg", n);
                  break;
                case "math":
                  u = i.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                  break;
                case "script":
                  u = i.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(u.firstChild);
                  break;
                case "select":
                  u = typeof a.is == "string" ? i.createElement("select", { is: a.is }) : i.createElement("select"), a.multiple ? u.multiple = true : a.size && (u.size = a.size);
                  break;
                default:
                  u = typeof a.is == "string" ? i.createElement(n, { is: a.is }) : i.createElement(n);
              }
          }
          u[Tt] = e, u[wt] = a;
          t: for (i = e.child; i !== null; ) {
            if (i.tag === 5 || i.tag === 6) u.appendChild(i.stateNode);
            else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
              i.child.return = i, i = i.child;
              continue;
            }
            if (i === e) break t;
            for (; i.sibling === null; ) {
              if (i.return === null || i.return === e) break t;
              i = i.return;
            }
            i.sibling.return = i.return, i = i.sibling;
          }
          e.stateNode = u;
          t: switch (Dt(u, n, a), n) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              a = !!a.autoFocus;
              break t;
            case "img":
              a = true;
              break t;
            default:
              a = false;
          }
          a && Se(e);
        }
      }
      return at(e), zi(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, l), null;
    case 6:
      if (t && e.stateNode != null) t.memoizedProps !== a && Se(e);
      else {
        if (typeof a != "string" && e.stateNode === null) throw Error(p(166));
        if (t = Pe.current, Hl(e)) {
          if (t = e.stateNode, l = e.memoizedProps, a = null, n = At, n !== null) switch (n.tag) {
            case 27:
            case 5:
              a = n.memoizedProps;
          }
          t[Tt] = e, t = !!(t.nodeValue === l || a !== null && a.suppressHydrationWarning === true || Wd(t.nodeValue, l)), t || fl(e, true);
        } else t = Au(t).createTextNode(a), t[Tt] = e, e.stateNode = t;
      }
      return at(e), null;
    case 31:
      if (l = e.memoizedState, t === null || t.memoizedState !== null) {
        if (a = Hl(e), l !== null) {
          if (t === null) {
            if (!a) throw Error(p(318));
            if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(p(557));
            t[Tt] = e;
          } else Nl(), !(e.flags & 128) && (e.memoizedState = null), e.flags |= 4;
          at(e), t = false;
        } else l = mi(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = true;
        if (!t) return e.flags & 256 ? (Qt(e), e) : (Qt(e), null);
        if (e.flags & 128) throw Error(p(558));
      }
      return at(e), null;
    case 13:
      if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
        if (n = Hl(e), a !== null && a.dehydrated !== null) {
          if (t === null) {
            if (!n) throw Error(p(318));
            if (n = e.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(p(317));
            n[Tt] = e;
          } else Nl(), !(e.flags & 128) && (e.memoizedState = null), e.flags |= 4;
          at(e), n = false;
        } else n = mi(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = true;
        if (!n) return e.flags & 256 ? (Qt(e), e) : (Qt(e), null);
      }
      return Qt(e), e.flags & 128 ? (e.lanes = l, e) : (l = a !== null, t = t !== null && t.memoizedState !== null, l && (a = e.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), Hn(e, e.updateQueue), at(e), null);
    case 4:
      return ua(), t === null && Es(e.stateNode.containerInfo), at(e), null;
    case 10:
      return Me(e.type), at(e), null;
    case 19:
      if (zt(ot), a = e.memoizedState, a === null) return at(e), null;
      if (n = (e.flags & 128) !== 0, u = a.rendering, u === null) if (n) Da(a, false);
      else {
        if (ft !== 0 || t !== null && t.flags & 128) for (t = e.child; t !== null; ) {
          if (u = hu(t), u !== null) {
            for (e.flags |= 128, Da(a, false), t = u.updateQueue, e.updateQueue = t, Hn(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; ) rr(l, t), l = l.sibling;
            return et(ot, ot.current & 1 | 2), Z && Te(e, a.treeForkCount), e.child;
          }
          t = t.sibling;
        }
        a.tail !== null && Lt() > bu && (e.flags |= 128, n = true, Da(a, false), e.lanes = 4194304);
      }
      else {
        if (!n) if (t = hu(u), t !== null) {
          if (e.flags |= 128, n = true, t = t.updateQueue, e.updateQueue = t, Hn(e, t), Da(a, true), a.tail === null && a.tailMode === "hidden" && !u.alternate && !Z) return at(e), null;
        } else 2 * Lt() - a.renderingStartTime > bu && l !== 536870912 && (e.flags |= 128, n = true, Da(a, false), e.lanes = 4194304);
        a.isBackwards ? (u.sibling = e.child, e.child = u) : (t = a.last, t !== null ? t.sibling = u : e.child = u, a.last = u);
      }
      return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = Lt(), t.sibling = null, l = ot.current, et(ot, n ? l & 1 | 2 : l & 1), Z && Te(e, a.treeForkCount), t) : (at(e), null);
    case 22:
    case 23:
      return Qt(e), us(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? l & 536870912 && !(e.flags & 128) && (at(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : at(e), l = e.updateQueue, l !== null && Hn(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== l && (e.flags |= 2048), t !== null && zt(Sl), null;
    case 24:
      return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), Me(ht), at(e), null;
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(p(156, e.tag));
}
function dh(t, e) {
  switch (ts(e), e.tag) {
    case 1:
      return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 3:
      return Me(ht), ua(), t = e.flags, t & 65536 && !(t & 128) ? (e.flags = t & -65537 | 128, e) : null;
    case 26:
    case 27:
    case 5:
      return uu(e), null;
    case 31:
      if (e.memoizedState !== null) {
        if (Qt(e), e.alternate === null) throw Error(p(340));
        Nl();
      }
      return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 13:
      if (Qt(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
        if (e.alternate === null) throw Error(p(340));
        Nl();
      }
      return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 19:
      return zt(ot), null;
    case 4:
      return ua(), null;
    case 10:
      return Me(e.type), null;
    case 22:
    case 23:
      return Qt(e), us(), t !== null && zt(Sl), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 24:
      return Me(ht), null;
    case 25:
      return null;
    default:
      return null;
  }
}
function rd(t, e) {
  switch (ts(e), e.tag) {
    case 3:
      Me(ht), ua();
      break;
    case 26:
    case 27:
    case 5:
      uu(e);
      break;
    case 4:
      ua();
      break;
    case 31:
      e.memoizedState !== null && Qt(e);
      break;
    case 13:
      Qt(e);
      break;
    case 19:
      zt(ot);
      break;
    case 10:
      Me(e.type);
      break;
    case 22:
    case 23:
      Qt(e), us(), t !== null && zt(Sl);
      break;
    case 24:
      Me(ht);
  }
}
function bn(t, e) {
  try {
    var l = e.updateQueue, a = l !== null ? l.lastEffect : null;
    if (a !== null) {
      var n = a.next;
      l = n;
      do {
        if ((l.tag & t) === t) {
          a = void 0;
          var u = l.create, i = l.inst;
          a = u(), i.destroy = a;
        }
        l = l.next;
      } while (l !== n);
    }
  } catch (c) {
    $(e, e.return, c);
  }
}
function ol(t, e, l) {
  try {
    var a = e.updateQueue, n = a !== null ? a.lastEffect : null;
    if (n !== null) {
      var u = n.next;
      a = u;
      do {
        if ((a.tag & t) === t) {
          var i = a.inst, c = i.destroy;
          if (c !== void 0) {
            i.destroy = void 0, n = e;
            var f = l, h = c;
            try {
              h();
            } catch (v) {
              $(n, f, v);
            }
          }
        }
        a = a.next;
      } while (a !== u);
    }
  } catch (v) {
    $(e, e.return, v);
  }
}
function dd(t) {
  var e = t.updateQueue;
  if (e !== null) {
    var l = t.stateNode;
    try {
      Sr(e, l);
    } catch (a) {
      $(t, t.return, a);
    }
  }
}
function md(t, e, l) {
  l.props = Dl(t.type, t.memoizedProps), l.state = t.memoizedState;
  try {
    l.componentWillUnmount();
  } catch (a) {
    $(t, e, a);
  }
}
function Va(t, e) {
  try {
    var l = t.ref;
    if (l !== null) {
      switch (t.tag) {
        case 26:
        case 27:
        case 5:
          var a = t.stateNode;
          break;
        case 30:
          a = t.stateNode;
          break;
        default:
          a = t.stateNode;
      }
      typeof l == "function" ? t.refCleanup = l(a) : l.current = a;
    }
  } catch (n) {
    $(t, e, n);
  }
}
function me(t, e) {
  var l = t.ref, a = t.refCleanup;
  if (l !== null) if (typeof a == "function") try {
    a();
  } catch (n) {
    $(t, e, n);
  } finally {
    t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
  }
  else if (typeof l == "function") try {
    l(null);
  } catch (n) {
    $(t, e, n);
  }
  else l.current = null;
}
function hd(t) {
  var e = t.type, l = t.memoizedProps, a = t.stateNode;
  try {
    t: switch (e) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        l.autoFocus && a.focus();
        break t;
      case "img":
        l.src ? a.src = l.src : l.srcSet && (a.srcset = l.srcSet);
    }
  } catch (n) {
    $(t, t.return, n);
  }
}
function ji(t, e, l) {
  try {
    var a = t.stateNode;
    Hh(a, t.type, l, e), a[wt] = e;
  } catch (n) {
    $(t, t.return, n);
  }
}
function yd(t) {
  return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ml(t.type) || t.tag === 4;
}
function Ni(t) {
  t: for (; ; ) {
    for (; t.sibling === null; ) {
      if (t.return === null || yd(t.return)) return null;
      t = t.return;
    }
    for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
      if (t.tag === 27 && ml(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
      t.child.return = t, t = t.child;
    }
    if (!(t.flags & 2)) return t.stateNode;
  }
}
function vc(t, e, l) {
  var a = t.tag;
  if (a === 5 || a === 6) t = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(t, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(t), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = De));
  else if (a !== 4 && (a === 27 && ml(t.type) && (l = t.stateNode, e = null), t = t.child, t !== null)) for (vc(t, e, l), t = t.sibling; t !== null; ) vc(t, e, l), t = t.sibling;
}
function pu(t, e, l) {
  var a = t.tag;
  if (a === 5 || a === 6) t = t.stateNode, e ? l.insertBefore(t, e) : l.appendChild(t);
  else if (a !== 4 && (a === 27 && ml(t.type) && (l = t.stateNode), t = t.child, t !== null)) for (pu(t, e, l), t = t.sibling; t !== null; ) pu(t, e, l), t = t.sibling;
}
function gd(t) {
  var e = t.stateNode, l = t.memoizedProps;
  try {
    for (var a = t.type, n = e.attributes; n.length; ) e.removeAttributeNode(n[0]);
    Dt(e, a, l), e[Tt] = t, e[wt] = l;
  } catch (u) {
    $(t, t.return, u);
  }
}
var Ae = false, mt = false, Ti = false, Bf = typeof WeakSet == "function" ? WeakSet : Set, bt = null;
function mh(t, e) {
  if (t = t.containerInfo, Nc = Ou, t = ar(t), $c(t)) {
    if ("selectionStart" in t) var l = { start: t.selectionStart, end: t.selectionEnd };
    else t: {
      l = (l = t.ownerDocument) && l.defaultView || window;
      var a = l.getSelection && l.getSelection();
      if (a && a.rangeCount !== 0) {
        l = a.anchorNode;
        var n = a.anchorOffset, u = a.focusNode;
        a = a.focusOffset;
        try {
          l.nodeType, u.nodeType;
        } catch {
          l = null;
          break t;
        }
        var i = 0, c = -1, f = -1, h = 0, v = 0, g = t, d = null;
        e: for (; ; ) {
          for (var y; g !== l || n !== 0 && g.nodeType !== 3 || (c = i + n), g !== u || a !== 0 && g.nodeType !== 3 || (f = i + a), g.nodeType === 3 && (i += g.nodeValue.length), (y = g.firstChild) !== null; ) d = g, g = y;
          for (; ; ) {
            if (g === t) break e;
            if (d === l && ++h === n && (c = i), d === u && ++v === a && (f = i), (y = g.nextSibling) !== null) break;
            g = d, d = g.parentNode;
          }
          g = y;
        }
        l = c === -1 || f === -1 ? null : { start: c, end: f };
      } else l = null;
    }
    l = l || { start: 0, end: 0 };
  } else l = null;
  for (Tc = { focusedElem: t, selectionRange: l }, Ou = false, bt = e; bt !== null; ) if (e = bt, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null) t.return = e, bt = t;
  else for (; bt !== null; ) {
    switch (e = bt, u = e.alternate, t = e.flags, e.tag) {
      case 0:
        if (t & 4 && (t = e.updateQueue, t = t !== null ? t.events : null, t !== null)) for (l = 0; l < t.length; l++) n = t[l], n.ref.impl = n.nextImpl;
        break;
      case 11:
      case 15:
        break;
      case 1:
        if (t & 1024 && u !== null) {
          t = void 0, l = e, n = u.memoizedProps, u = u.memoizedState, a = l.stateNode;
          try {
            var j = Dl(l.type, n);
            t = a.getSnapshotBeforeUpdate(j, u), a.__reactInternalSnapshotBeforeUpdate = t;
          } catch (z) {
            $(l, l.return, z);
          }
        }
        break;
      case 3:
        if (t & 1024) {
          if (t = e.stateNode.containerInfo, l = t.nodeType, l === 9) Ec(t);
          else if (l === 1) switch (t.nodeName) {
            case "HEAD":
            case "HTML":
            case "BODY":
              Ec(t);
              break;
            default:
              t.textContent = "";
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
        if (t & 1024) throw Error(p(163));
    }
    if (t = e.sibling, t !== null) {
      t.return = e.return, bt = t;
      break;
    }
    bt = e.return;
  }
}
function vd(t, e, l) {
  var a = l.flags;
  switch (l.tag) {
    case 0:
    case 11:
    case 15:
      je(t, l), a & 4 && bn(5, l);
      break;
    case 1:
      if (je(t, l), a & 4) if (t = l.stateNode, e === null) try {
        t.componentDidMount();
      } catch (i) {
        $(l, l.return, i);
      }
      else {
        var n = Dl(l.type, e.memoizedProps);
        e = e.memoizedState;
        try {
          t.componentDidUpdate(n, e, t.__reactInternalSnapshotBeforeUpdate);
        } catch (i) {
          $(l, l.return, i);
        }
      }
      a & 64 && dd(l), a & 512 && Va(l, l.return);
      break;
    case 3:
      if (je(t, l), a & 64 && (t = l.updateQueue, t !== null)) {
        if (e = null, l.child !== null) switch (l.child.tag) {
          case 27:
          case 5:
            e = l.child.stateNode;
            break;
          case 1:
            e = l.child.stateNode;
        }
        try {
          Sr(t, e);
        } catch (i) {
          $(l, l.return, i);
        }
      }
      break;
    case 27:
      e === null && a & 4 && gd(l);
    case 26:
    case 5:
      je(t, l), e === null && a & 4 && hd(l), a & 512 && Va(l, l.return);
      break;
    case 12:
      je(t, l);
      break;
    case 31:
      je(t, l), a & 4 && bd(t, l);
      break;
    case 13:
      je(t, l), a & 4 && Sd(t, l), a & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = zh.bind(null, l), Xh(t, l))));
      break;
    case 22:
      if (a = l.memoizedState !== null || Ae, !a) {
        e = e !== null && e.memoizedState !== null || mt, n = Ae;
        var u = mt;
        Ae = a, (mt = e) && !u ? Ne(t, l, (l.subtreeFlags & 8772) !== 0) : je(t, l), Ae = n, mt = u;
      }
      break;
    case 30:
      break;
    default:
      je(t, l);
  }
}
function xd(t) {
  var e = t.alternate;
  e !== null && (t.alternate = null, xd(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Zc(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
}
var ct = null, Ht = false;
function ze(t, e, l) {
  for (l = l.child; l !== null; ) pd(t, e, l), l = l.sibling;
}
function pd(t, e, l) {
  if (Vt && typeof Vt.onCommitFiberUnmount == "function") try {
    Vt.onCommitFiberUnmount(mn, l);
  } catch {
  }
  switch (l.tag) {
    case 26:
      mt || me(l, e), ze(t, e, l), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
      break;
    case 27:
      mt || me(l, e);
      var a = ct, n = Ht;
      ml(l.type) && (ct = l.stateNode, Ht = false), ze(t, e, l), $a(l.stateNode), ct = a, Ht = n;
      break;
    case 5:
      mt || me(l, e);
    case 6:
      if (a = ct, n = Ht, ct = null, ze(t, e, l), ct = a, Ht = n, ct !== null) if (Ht) try {
        (ct.nodeType === 9 ? ct.body : ct.nodeName === "HTML" ? ct.ownerDocument.body : ct).removeChild(l.stateNode);
      } catch (u) {
        $(l, e, u);
      }
      else try {
        ct.removeChild(l.stateNode);
      } catch (u) {
        $(l, e, u);
      }
      break;
    case 18:
      ct !== null && (Ht ? (t = ct, kf(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, l.stateNode), ya(t)) : kf(ct, l.stateNode));
      break;
    case 4:
      a = ct, n = Ht, ct = l.stateNode.containerInfo, Ht = true, ze(t, e, l), ct = a, Ht = n;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      ol(2, l, e), mt || ol(4, l, e), ze(t, e, l);
      break;
    case 1:
      mt || (me(l, e), a = l.stateNode, typeof a.componentWillUnmount == "function" && md(l, e, a)), ze(t, e, l);
      break;
    case 21:
      ze(t, e, l);
      break;
    case 22:
      mt = (a = mt) || l.memoizedState !== null, ze(t, e, l), mt = a;
      break;
    default:
      ze(t, e, l);
  }
}
function bd(t, e) {
  if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
    t = t.dehydrated;
    try {
      ya(t);
    } catch (l) {
      $(e, e.return, l);
    }
  }
}
function Sd(t, e) {
  if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null)))) try {
    ya(t);
  } catch (l) {
    $(e, e.return, l);
  }
}
function hh(t) {
  switch (t.tag) {
    case 31:
    case 13:
    case 19:
      var e = t.stateNode;
      return e === null && (e = t.stateNode = new Bf()), e;
    case 22:
      return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Bf()), e;
    default:
      throw Error(p(435, t.tag));
  }
}
function Bn(t, e) {
  var l = hh(t);
  e.forEach(function(a) {
    if (!l.has(a)) {
      l.add(a);
      var n = jh.bind(null, t, a);
      a.then(n, n);
    }
  });
}
function Ut(t, e) {
  var l = e.deletions;
  if (l !== null) for (var a = 0; a < l.length; a++) {
    var n = l[a], u = t, i = e, c = i;
    t: for (; c !== null; ) {
      switch (c.tag) {
        case 27:
          if (ml(c.type)) {
            ct = c.stateNode, Ht = false;
            break t;
          }
          break;
        case 5:
          ct = c.stateNode, Ht = false;
          break t;
        case 3:
        case 4:
          ct = c.stateNode.containerInfo, Ht = true;
          break t;
      }
      c = c.return;
    }
    if (ct === null) throw Error(p(160));
    pd(u, i, n), ct = null, Ht = false, u = n.alternate, u !== null && (u.return = null), n.return = null;
  }
  if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) zd(e, t), e = e.sibling;
}
var fe = null;
function zd(t, e) {
  var l = t.alternate, a = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      Ut(e, t), Ct(t), a & 4 && (ol(3, t, t.return), bn(3, t), ol(5, t, t.return));
      break;
    case 1:
      Ut(e, t), Ct(t), a & 512 && (mt || l === null || me(l, l.return)), a & 64 && Ae && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
      break;
    case 26:
      var n = fe;
      if (Ut(e, t), Ct(t), a & 512 && (mt || l === null || me(l, l.return)), a & 4) {
        var u = l !== null ? l.memoizedState : null;
        if (a = t.memoizedState, l === null) if (a === null) if (t.stateNode === null) {
          t: {
            a = t.type, l = t.memoizedProps, n = n.ownerDocument || n;
            e: switch (a) {
              case "title":
                u = n.getElementsByTagName("title")[0], (!u || u[gn] || u[Tt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(u, n.querySelector("head > title"))), Dt(u, a, l), u[Tt] = t, St(u), a = u;
                break t;
              case "link":
                var i = eo("link", "href", n).get(a + (l.href || ""));
                if (i) {
                  for (var c = 0; c < i.length; c++) if (u = i[c], u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                    i.splice(c, 1);
                    break e;
                  }
                }
                u = n.createElement(a), Dt(u, a, l), n.head.appendChild(u);
                break;
              case "meta":
                if (i = eo("meta", "content", n).get(a + (l.content || ""))) {
                  for (c = 0; c < i.length; c++) if (u = i[c], u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                    i.splice(c, 1);
                    break e;
                  }
                }
                u = n.createElement(a), Dt(u, a, l), n.head.appendChild(u);
                break;
              default:
                throw Error(p(468, a));
            }
            u[Tt] = t, St(u), a = u;
          }
          t.stateNode = a;
        } else lo(n, t.type, t.stateNode);
        else t.stateNode = to(n, a, t.memoizedProps);
        else u !== a ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, a === null ? lo(n, t.type, t.stateNode) : to(n, a, t.memoizedProps)) : a === null && t.stateNode !== null && ji(t, t.memoizedProps, l.memoizedProps);
      }
      break;
    case 27:
      Ut(e, t), Ct(t), a & 512 && (mt || l === null || me(l, l.return)), l !== null && a & 4 && ji(t, t.memoizedProps, l.memoizedProps);
      break;
    case 5:
      if (Ut(e, t), Ct(t), a & 512 && (mt || l === null || me(l, l.return)), t.flags & 32) {
        n = t.stateNode;
        try {
          ca(n, "");
        } catch (j) {
          $(t, t.return, j);
        }
      }
      a & 4 && t.stateNode != null && (n = t.memoizedProps, ji(t, n, l !== null ? l.memoizedProps : n)), a & 1024 && (Ti = true);
      break;
    case 6:
      if (Ut(e, t), Ct(t), a & 4) {
        if (t.stateNode === null) throw Error(p(162));
        a = t.memoizedProps, l = t.stateNode;
        try {
          l.nodeValue = a;
        } catch (j) {
          $(t, t.return, j);
        }
      }
      break;
    case 3:
      if (tu = null, n = fe, fe = Eu(e.containerInfo), Ut(e, t), fe = n, Ct(t), a & 4 && l !== null && l.memoizedState.isDehydrated) try {
        ya(e.containerInfo);
      } catch (j) {
        $(t, t.return, j);
      }
      Ti && (Ti = false, jd(t));
      break;
    case 4:
      a = fe, fe = Eu(t.stateNode.containerInfo), Ut(e, t), Ct(t), fe = a;
      break;
    case 12:
      Ut(e, t), Ct(t);
      break;
    case 31:
      Ut(e, t), Ct(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Bn(t, a)));
      break;
    case 13:
      Ut(e, t), Ct(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Ku = Lt()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Bn(t, a)));
      break;
    case 22:
      n = t.memoizedState !== null;
      var f = l !== null && l.memoizedState !== null, h = Ae, v = mt;
      if (Ae = h || n, mt = v || f, Ut(e, t), mt = v, Ae = h, Ct(t), a & 8192) t: for (e = t.stateNode, e._visibility = n ? e._visibility & -2 : e._visibility | 1, n && (l === null || f || Ae || mt || xl(t)), l = null, e = t; ; ) {
        if (e.tag === 5 || e.tag === 26) {
          if (l === null) {
            f = l = e;
            try {
              if (u = f.stateNode, n) i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
              else {
                c = f.stateNode;
                var g = f.memoizedProps.style, d = g != null && g.hasOwnProperty("display") ? g.display : null;
                c.style.display = d == null || typeof d == "boolean" ? "" : ("" + d).trim();
              }
            } catch (j) {
              $(f, f.return, j);
            }
          }
        } else if (e.tag === 6) {
          if (l === null) {
            f = e;
            try {
              f.stateNode.nodeValue = n ? "" : f.memoizedProps;
            } catch (j) {
              $(f, f.return, j);
            }
          }
        } else if (e.tag === 18) {
          if (l === null) {
            f = e;
            try {
              var y = f.stateNode;
              n ? $f(y, true) : $f(f.stateNode, false);
            } catch (j) {
              $(f, f.return, j);
            }
          }
        } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break t;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break t;
          l === e && (l = null), e = e.return;
        }
        l === e && (l = null), e.sibling.return = e.return, e = e.sibling;
      }
      a & 4 && (a = t.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, Bn(t, l))));
      break;
    case 19:
      Ut(e, t), Ct(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Bn(t, a)));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      Ut(e, t), Ct(t);
  }
}
function Ct(t) {
  var e = t.flags;
  if (e & 2) {
    try {
      for (var l, a = t.return; a !== null; ) {
        if (yd(a)) {
          l = a;
          break;
        }
        a = a.return;
      }
      if (l == null) throw Error(p(160));
      switch (l.tag) {
        case 27:
          var n = l.stateNode, u = Ni(t);
          pu(t, u, n);
          break;
        case 5:
          var i = l.stateNode;
          l.flags & 32 && (ca(i, ""), l.flags &= -33);
          var c = Ni(t);
          pu(t, c, i);
          break;
        case 3:
        case 4:
          var f = l.stateNode.containerInfo, h = Ni(t);
          vc(t, h, f);
          break;
        default:
          throw Error(p(161));
      }
    } catch (v) {
      $(t, t.return, v);
    }
    t.flags &= -3;
  }
  e & 4096 && (t.flags &= -4097);
}
function jd(t) {
  if (t.subtreeFlags & 1024) for (t = t.child; t !== null; ) {
    var e = t;
    jd(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
  }
}
function je(t, e) {
  if (e.subtreeFlags & 8772) for (e = e.child; e !== null; ) vd(t, e.alternate, e), e = e.sibling;
}
function xl(t) {
  for (t = t.child; t !== null; ) {
    var e = t;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ol(4, e, e.return), xl(e);
        break;
      case 1:
        me(e, e.return);
        var l = e.stateNode;
        typeof l.componentWillUnmount == "function" && md(e, e.return, l), xl(e);
        break;
      case 27:
        $a(e.stateNode);
      case 26:
      case 5:
        me(e, e.return), xl(e);
        break;
      case 22:
        e.memoizedState === null && xl(e);
        break;
      case 30:
        xl(e);
        break;
      default:
        xl(e);
    }
    t = t.sibling;
  }
}
function Ne(t, e, l) {
  for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
    var a = e.alternate, n = t, u = e, i = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        Ne(n, u, l), bn(4, u);
        break;
      case 1:
        if (Ne(n, u, l), a = u, n = a.stateNode, typeof n.componentDidMount == "function") try {
          n.componentDidMount();
        } catch (h) {
          $(a, a.return, h);
        }
        if (a = u, n = a.updateQueue, n !== null) {
          var c = a.stateNode;
          try {
            var f = n.shared.hiddenCallbacks;
            if (f !== null) for (n.shared.hiddenCallbacks = null, n = 0; n < f.length; n++) br(f[n], c);
          } catch (h) {
            $(a, a.return, h);
          }
        }
        l && i & 64 && dd(u), Va(u, u.return);
        break;
      case 27:
        gd(u);
      case 26:
      case 5:
        Ne(n, u, l), l && a === null && i & 4 && hd(u), Va(u, u.return);
        break;
      case 12:
        Ne(n, u, l);
        break;
      case 31:
        Ne(n, u, l), l && i & 4 && bd(n, u);
        break;
      case 13:
        Ne(n, u, l), l && i & 4 && Sd(n, u);
        break;
      case 22:
        u.memoizedState === null && Ne(n, u, l), Va(u, u.return);
        break;
      case 30:
        break;
      default:
        Ne(n, u, l);
    }
    e = e.sibling;
  }
}
function Ss(t, e) {
  var l = null;
  t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && xn(l));
}
function zs(t, e) {
  t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && xn(t));
}
function se(t, e, l, a) {
  if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) Nd(t, e, l, a), e = e.sibling;
}
function Nd(t, e, l, a) {
  var n = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 15:
      se(t, e, l, a), n & 2048 && bn(9, e);
      break;
    case 1:
      se(t, e, l, a);
      break;
    case 3:
      se(t, e, l, a), n & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && xn(t)));
      break;
    case 12:
      if (n & 2048) {
        se(t, e, l, a), t = e.stateNode;
        try {
          var u = e.memoizedProps, i = u.id, c = u.onPostCommit;
          typeof c == "function" && c(i, e.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
        } catch (f) {
          $(e, e.return, f);
        }
      } else se(t, e, l, a);
      break;
    case 31:
      se(t, e, l, a);
      break;
    case 13:
      se(t, e, l, a);
      break;
    case 23:
      break;
    case 22:
      u = e.stateNode, i = e.alternate, e.memoizedState !== null ? u._visibility & 2 ? se(t, e, l, a) : Ka(t, e) : u._visibility & 2 ? se(t, e, l, a) : (u._visibility |= 2, wl(t, e, l, a, (e.subtreeFlags & 10256) !== 0 || false)), n & 2048 && Ss(i, e);
      break;
    case 24:
      se(t, e, l, a), n & 2048 && zs(e.alternate, e);
      break;
    default:
      se(t, e, l, a);
  }
}
function wl(t, e, l, a, n) {
  for (n = n && ((e.subtreeFlags & 10256) !== 0 || false), e = e.child; e !== null; ) {
    var u = t, i = e, c = l, f = a, h = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        wl(u, i, c, f, n), bn(8, i);
        break;
      case 23:
        break;
      case 22:
        var v = i.stateNode;
        i.memoizedState !== null ? v._visibility & 2 ? wl(u, i, c, f, n) : Ka(u, i) : (v._visibility |= 2, wl(u, i, c, f, n)), n && h & 2048 && Ss(i.alternate, i);
        break;
      case 24:
        wl(u, i, c, f, n), n && h & 2048 && zs(i.alternate, i);
        break;
      default:
        wl(u, i, c, f, n);
    }
    e = e.sibling;
  }
}
function Ka(t, e) {
  if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) {
    var l = t, a = e, n = a.flags;
    switch (a.tag) {
      case 22:
        Ka(l, a), n & 2048 && Ss(a.alternate, a);
        break;
      case 24:
        Ka(l, a), n & 2048 && zs(a.alternate, a);
        break;
      default:
        Ka(l, a);
    }
    e = e.sibling;
  }
}
var Ba = 8192;
function Bl(t, e, l) {
  if (t.subtreeFlags & Ba) for (t = t.child; t !== null; ) Td(t, e, l), t = t.sibling;
}
function Td(t, e, l) {
  switch (t.tag) {
    case 26:
      Bl(t, e, l), t.flags & Ba && t.memoizedState !== null && ty(l, fe, t.memoizedState, t.memoizedProps);
      break;
    case 5:
      Bl(t, e, l);
      break;
    case 3:
    case 4:
      var a = fe;
      fe = Eu(t.stateNode.containerInfo), Bl(t, e, l), fe = a;
      break;
    case 22:
      t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = Ba, Ba = 16777216, Bl(t, e, l), Ba = a) : Bl(t, e, l));
      break;
    default:
      Bl(t, e, l);
  }
}
function Ad(t) {
  var e = t.alternate;
  if (e !== null && (t = e.child, t !== null)) {
    e.child = null;
    do
      e = t.sibling, t.sibling = null, t = e;
    while (t !== null);
  }
}
function _a(t) {
  var e = t.deletions;
  if (t.flags & 16) {
    if (e !== null) for (var l = 0; l < e.length; l++) {
      var a = e[l];
      bt = a, Dd(a, t);
    }
    Ad(t);
  }
  if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) Ed(t), t = t.sibling;
}
function Ed(t) {
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      _a(t), t.flags & 2048 && ol(9, t, t.return);
      break;
    case 3:
      _a(t);
      break;
    case 12:
      _a(t);
      break;
    case 22:
      var e = t.stateNode;
      t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, In(t)) : _a(t);
      break;
    default:
      _a(t);
  }
}
function In(t) {
  var e = t.deletions;
  if (t.flags & 16) {
    if (e !== null) for (var l = 0; l < e.length; l++) {
      var a = e[l];
      bt = a, Dd(a, t);
    }
    Ad(t);
  }
  for (t = t.child; t !== null; ) {
    switch (e = t, e.tag) {
      case 0:
      case 11:
      case 15:
        ol(8, e, e.return), In(e);
        break;
      case 22:
        l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, In(e));
        break;
      default:
        In(e);
    }
    t = t.sibling;
  }
}
function Dd(t, e) {
  for (; bt !== null; ) {
    var l = bt;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        ol(8, l, e);
        break;
      case 23:
      case 22:
        if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
          var a = l.memoizedState.cachePool.pool;
          a != null && a.refCount++;
        }
        break;
      case 24:
        xn(l.memoizedState.cache);
    }
    if (a = l.child, a !== null) a.return = l, bt = a;
    else t: for (l = t; bt !== null; ) {
      a = bt;
      var n = a.sibling, u = a.return;
      if (xd(a), a === l) {
        bt = null;
        break t;
      }
      if (n !== null) {
        n.return = u, bt = n;
        break t;
      }
      bt = u;
    }
  }
}
var yh = { getCacheForType: function(t) {
  var e = Et(ht), l = e.data.get(t);
  return l === void 0 && (l = t(), e.data.set(t, l)), l;
}, cacheSignal: function() {
  return Et(ht).controller.signal;
} }, gh = typeof WeakMap == "function" ? WeakMap : Map, L = 0, tt = null, Q = null, X = 0, k = 0, qt = null, $e = false, Sa = false, js = false, Ge = 0, ft = 0, rl = 0, jl = 0, Ns = 0, Zt = 0, ra = 0, Ja = null, Bt = null, xc = false, Ku = 0, _d = 0, bu = 1 / 0, Su = null, al = null, vt = 0, nl = null, da = null, Ue = 0, pc = 0, bc = null, Od = null, ka = 0, Sc = null;
function Jt() {
  return L & 2 && X !== 0 ? X & -X : B.T !== null ? As() : Yo();
}
function Md() {
  if (Zt === 0) if (!(X & 536870912) || Z) {
    var t = En;
    En <<= 1, !(En & 3932160) && (En = 262144), Zt = t;
  } else Zt = 536870912;
  return t = $t.current, t !== null && (t.flags |= 32), Zt;
}
function Gt(t, e, l) {
  (t === tt && (k === 2 || k === 9) || t.cancelPendingCommit !== null) && (ma(t, 0), We(t, X, Zt, false)), yn(t, l), (!(L & 2) || t !== tt) && (t === tt && (!(L & 2) && (jl |= l), ft === 4 && We(t, X, Zt, false)), ge(t));
}
function Ud(t, e, l) {
  if (L & 6) throw Error(p(327));
  var a = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || hn(t, e), n = a ? ph(t, e) : Ai(t, e, true), u = a;
  do {
    if (n === 0) {
      Sa && !a && We(t, e, 0, false);
      break;
    } else {
      if (l = t.current.alternate, u && !vh(l)) {
        n = Ai(t, e, false), u = false;
        continue;
      }
      if (n === 2) {
        if (u = e, t.errorRecoveryDisabledLanes & u) var i = 0;
        else i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
        if (i !== 0) {
          e = i;
          t: {
            var c = t;
            n = Ja;
            var f = c.current.memoizedState.isDehydrated;
            if (f && (ma(c, i).flags |= 256), i = Ai(c, i, false), i !== 2) {
              if (js && !f) {
                c.errorRecoveryDisabledLanes |= u, jl |= u, n = 4;
                break t;
              }
              u = Bt, Bt = n, u !== null && (Bt === null ? Bt = u : Bt.push.apply(Bt, u));
            }
            n = i;
          }
          if (u = false, n !== 2) continue;
        }
      }
      if (n === 1) {
        ma(t, 0), We(t, e, 0, true);
        break;
      }
      t: {
        switch (a = t, u = n, u) {
          case 0:
          case 1:
            throw Error(p(345));
          case 4:
            if ((e & 4194048) !== e) break;
          case 6:
            We(a, e, Zt, !$e);
            break t;
          case 2:
            Bt = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(p(329));
        }
        if ((e & 62914560) === e && (n = Ku + 300 - Lt(), 10 < n)) {
          if (We(a, e, Zt, !$e), Bu(a, 0, true) !== 0) break t;
          Ue = e, a.timeoutHandle = Id(Rf.bind(null, a, l, Bt, Su, xc, e, Zt, jl, ra, $e, u, "Throttled", -0, 0), n);
          break t;
        }
        Rf(a, l, Bt, Su, xc, e, Zt, jl, ra, $e, u, null, -0, 0);
      }
    }
    break;
  } while (true);
  ge(t);
}
function Rf(t, e, l, a, n, u, i, c, f, h, v, g, d, y) {
  if (t.timeoutHandle = -1, g = e.subtreeFlags, g & 8192 || (g & 16785408) === 16785408) {
    g = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: true, waitingForViewTransition: false, unsuspend: De }, Td(e, u, g);
    var j = (u & 62914560) === u ? Ku - Lt() : (u & 4194048) === u ? _d - Lt() : 0;
    if (j = ey(g, j), j !== null) {
      Ue = u, t.cancelPendingCommit = j(wf.bind(null, t, e, u, l, a, n, i, c, f, v, g, null, d, y)), We(t, u, i, !h);
      return;
    }
  }
  wf(t, e, u, l, a, n, i, c, f);
}
function vh(t) {
  for (var e = t; ; ) {
    var l = e.tag;
    if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null))) for (var a = 0; a < l.length; a++) {
      var n = l[a], u = n.getSnapshot;
      n = n.value;
      try {
        if (!kt(u(), n)) return false;
      } catch {
        return false;
      }
    }
    if (l = e.child, e.subtreeFlags & 16384 && l !== null) l.return = e, e = l;
    else {
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return true;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
  }
  return true;
}
function We(t, e, l, a) {
  e &= ~Ns, e &= ~jl, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
  for (var n = e; 0 < n; ) {
    var u = 31 - Kt(n), i = 1 << u;
    a[u] = -1, n &= ~i;
  }
  l !== 0 && Ro(t, l, e);
}
function Ju() {
  return L & 6 ? true : (Sn(0), false);
}
function Ts() {
  if (Q !== null) {
    if (k === 0) var t = Q.return;
    else t = Q, _e = Cl = null, os(t), la = null, an = 0, t = Q;
    for (; t !== null; ) rd(t.alternate, t), t = t.return;
    Q = null;
  }
}
function ma(t, e) {
  var l = t.timeoutHandle;
  l !== -1 && (t.timeoutHandle = -1, Gh(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), Ue = 0, Ts(), tt = t, Q = l = Oe(t.current, null), X = e, k = 0, qt = null, $e = false, Sa = hn(t, e), js = false, ra = Zt = Ns = jl = rl = ft = 0, Bt = Ja = null, xc = false, e & 8 && (e |= e & 32);
  var a = t.entangledLanes;
  if (a !== 0) for (t = t.entanglements, a &= e; 0 < a; ) {
    var n = 31 - Kt(a), u = 1 << n;
    e |= t[n], a &= ~u;
  }
  return Ge = e, Yu(), l;
}
function Cd(t, e) {
  w = null, B.H = un, e === ba || e === Qu ? (e = hf(), k = 3) : e === as ? (e = hf(), k = 4) : k = e === ps ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, qt = e, Q === null && (ft = 1, vu(t, le(e, t.current)));
}
function Hd() {
  var t = $t.current;
  return t === null ? true : (X & 4194048) === X ? ne === null : (X & 62914560) === X || X & 536870912 ? t === ne : false;
}
function Bd() {
  var t = B.H;
  return B.H = un, t === null ? un : t;
}
function Rd() {
  var t = B.A;
  return B.A = yh, t;
}
function zu() {
  ft = 4, $e || (X & 4194048) !== X && $t.current !== null || (Sa = true), !(rl & 134217727) && !(jl & 134217727) || tt === null || We(tt, X, Zt, false);
}
function Ai(t, e, l) {
  var a = L;
  L |= 2;
  var n = Bd(), u = Rd();
  (tt !== t || X !== e) && (Su = null, ma(t, e)), e = false;
  var i = ft;
  t: do
    try {
      if (k !== 0 && Q !== null) {
        var c = Q, f = qt;
        switch (k) {
          case 8:
            Ts(), i = 6;
            break t;
          case 3:
          case 2:
          case 9:
          case 6:
            $t.current === null && (e = true);
            var h = k;
            if (k = 0, qt = null, Fl(t, c, f, h), l && Sa) {
              i = 0;
              break t;
            }
            break;
          default:
            h = k, k = 0, qt = null, Fl(t, c, f, h);
        }
      }
      xh(), i = ft;
      break;
    } catch (v) {
      Cd(t, v);
    }
  while (true);
  return e && t.shellSuspendCounter++, _e = Cl = null, L = a, B.H = n, B.A = u, Q === null && (tt = null, X = 0, Yu()), i;
}
function xh() {
  for (; Q !== null; ) Gd(Q);
}
function ph(t, e) {
  var l = L;
  L |= 2;
  var a = Bd(), n = Rd();
  tt !== t || X !== e ? (Su = null, bu = Lt() + 500, ma(t, e)) : Sa = hn(t, e);
  t: do
    try {
      if (k !== 0 && Q !== null) {
        e = Q;
        var u = qt;
        e: switch (k) {
          case 1:
            k = 0, qt = null, Fl(t, e, u, 1);
            break;
          case 2:
          case 9:
            if (mf(u)) {
              k = 0, qt = null, Gf(e);
              break;
            }
            e = function() {
              k !== 2 && k !== 9 || tt !== t || (k = 7), ge(t);
            }, u.then(e, e);
            break t;
          case 3:
            k = 7;
            break t;
          case 4:
            k = 5;
            break t;
          case 7:
            mf(u) ? (k = 0, qt = null, Gf(e)) : (k = 0, qt = null, Fl(t, e, u, 7));
            break;
          case 5:
            var i = null;
            switch (Q.tag) {
              case 26:
                i = Q.memoizedState;
              case 5:
              case 27:
                var c = Q;
                if (i ? a0(i) : c.stateNode.complete) {
                  k = 0, qt = null;
                  var f = c.sibling;
                  if (f !== null) Q = f;
                  else {
                    var h = c.return;
                    h !== null ? (Q = h, ku(h)) : Q = null;
                  }
                  break e;
                }
            }
            k = 0, qt = null, Fl(t, e, u, 5);
            break;
          case 6:
            k = 0, qt = null, Fl(t, e, u, 6);
            break;
          case 8:
            Ts(), ft = 6;
            break t;
          default:
            throw Error(p(462));
        }
      }
      bh();
      break;
    } catch (v) {
      Cd(t, v);
    }
  while (true);
  return _e = Cl = null, B.H = a, B.A = n, L = l, Q !== null ? 0 : (tt = null, X = 0, Yu(), ft);
}
function bh() {
  for (; Q !== null && !Z0(); ) Gd(Q);
}
function Gd(t) {
  var e = od(t.alternate, t, Ge);
  t.memoizedProps = t.pendingProps, e === null ? ku(t) : Q = e;
}
function Gf(t) {
  var e = t, l = e.alternate;
  switch (e.tag) {
    case 15:
    case 0:
      e = Of(l, e, e.pendingProps, e.type, void 0, X);
      break;
    case 11:
      e = Of(l, e, e.pendingProps, e.type.render, e.ref, X);
      break;
    case 5:
      os(e);
    default:
      rd(l, e), e = Q = rr(e, Ge), e = od(l, e, Ge);
  }
  t.memoizedProps = t.pendingProps, e === null ? ku(t) : Q = e;
}
function Fl(t, e, l, a) {
  _e = Cl = null, os(e), la = null, an = 0;
  var n = e.return;
  try {
    if (sh(t, n, e, l, X)) {
      ft = 1, vu(t, le(l, t.current)), Q = null;
      return;
    }
  } catch (u) {
    if (n !== null) throw Q = n, u;
    ft = 1, vu(t, le(l, t.current)), Q = null;
    return;
  }
  e.flags & 32768 ? (Z || a === 1 ? t = true : Sa || X & 536870912 ? t = false : ($e = t = true, (a === 2 || a === 9 || a === 3 || a === 6) && (a = $t.current, a !== null && a.tag === 13 && (a.flags |= 16384))), wd(e, t)) : ku(e);
}
function ku(t) {
  var e = t;
  do {
    if (e.flags & 32768) {
      wd(e, $e);
      return;
    }
    t = e.return;
    var l = rh(e.alternate, e, Ge);
    if (l !== null) {
      Q = l;
      return;
    }
    if (e = e.sibling, e !== null) {
      Q = e;
      return;
    }
    Q = e = t;
  } while (e !== null);
  ft === 0 && (ft = 5);
}
function wd(t, e) {
  do {
    var l = dh(t.alternate, t);
    if (l !== null) {
      l.flags &= 32767, Q = l;
      return;
    }
    if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
      Q = t;
      return;
    }
    Q = t = l;
  } while (t !== null);
  ft = 6, Q = null;
}
function wf(t, e, l, a, n, u, i, c, f) {
  t.cancelPendingCommit = null;
  do
    $u();
  while (vt !== 0);
  if (L & 6) throw Error(p(327));
  if (e !== null) {
    if (e === t.current) throw Error(p(177));
    if (u = e.lanes | e.childLanes, u |= Wc, P0(t, l, u, i, c, f), t === tt && (Q = tt = null, X = 0), da = e, nl = t, Ue = l, pc = u, bc = n, Od = a, e.subtreeFlags & 10256 || e.flags & 10256 ? (t.callbackNode = null, t.callbackPriority = 0, Nh(iu, function() {
      return Zd(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), a = (e.flags & 13878) !== 0, e.subtreeFlags & 13878 || a) {
      a = B.T, B.T = null, n = V.p, V.p = 2, i = L, L |= 4;
      try {
        mh(t, e, l);
      } finally {
        L = i, V.p = n, B.T = a;
      }
    }
    vt = 1, Yd(), qd(), Qd();
  }
}
function Yd() {
  if (vt === 1) {
    vt = 0;
    var t = nl, e = da, l = (e.flags & 13878) !== 0;
    if (e.subtreeFlags & 13878 || l) {
      l = B.T, B.T = null;
      var a = V.p;
      V.p = 2;
      var n = L;
      L |= 4;
      try {
        zd(e, t);
        var u = Tc, i = ar(t.containerInfo), c = u.focusedElem, f = u.selectionRange;
        if (i !== c && c && c.ownerDocument && lr(c.ownerDocument.documentElement, c)) {
          if (f !== null && $c(c)) {
            var h = f.start, v = f.end;
            if (v === void 0 && (v = h), "selectionStart" in c) c.selectionStart = h, c.selectionEnd = Math.min(v, c.value.length);
            else {
              var g = c.ownerDocument || document, d = g && g.defaultView || window;
              if (d.getSelection) {
                var y = d.getSelection(), j = c.textContent.length, z = Math.min(f.start, j), O = f.end === void 0 ? z : Math.min(f.end, j);
                !y.extend && z > O && (i = O, O = z, z = i);
                var r = uf(c, z), o = uf(c, O);
                if (r && o && (y.rangeCount !== 1 || y.anchorNode !== r.node || y.anchorOffset !== r.offset || y.focusNode !== o.node || y.focusOffset !== o.offset)) {
                  var m = g.createRange();
                  m.setStart(r.node, r.offset), y.removeAllRanges(), z > O ? (y.addRange(m), y.extend(o.node, o.offset)) : (m.setEnd(o.node, o.offset), y.addRange(m));
                }
              }
            }
          }
          for (g = [], y = c; y = y.parentNode; ) y.nodeType === 1 && g.push({ element: y, left: y.scrollLeft, top: y.scrollTop });
          for (typeof c.focus == "function" && c.focus(), c = 0; c < g.length; c++) {
            var x = g[c];
            x.element.scrollLeft = x.left, x.element.scrollTop = x.top;
          }
        }
        Ou = !!Nc, Tc = Nc = null;
      } finally {
        L = n, V.p = a, B.T = l;
      }
    }
    t.current = e, vt = 2;
  }
}
function qd() {
  if (vt === 2) {
    vt = 0;
    var t = nl, e = da, l = (e.flags & 8772) !== 0;
    if (e.subtreeFlags & 8772 || l) {
      l = B.T, B.T = null;
      var a = V.p;
      V.p = 2;
      var n = L;
      L |= 4;
      try {
        vd(t, e.alternate, e);
      } finally {
        L = n, V.p = a, B.T = l;
      }
    }
    vt = 3;
  }
}
function Qd() {
  if (vt === 4 || vt === 3) {
    vt = 0, L0();
    var t = nl, e = da, l = Ue, a = Od;
    e.subtreeFlags & 10256 || e.flags & 10256 ? vt = 5 : (vt = 0, da = nl = null, Xd(t, t.pendingLanes));
    var n = t.pendingLanes;
    if (n === 0 && (al = null), Xc(l), e = e.stateNode, Vt && typeof Vt.onCommitFiberRoot == "function") try {
      Vt.onCommitFiberRoot(mn, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
    if (a !== null) {
      e = B.T, n = V.p, V.p = 2, B.T = null;
      try {
        for (var u = t.onRecoverableError, i = 0; i < a.length; i++) {
          var c = a[i];
          u(c.value, { componentStack: c.stack });
        }
      } finally {
        B.T = e, V.p = n;
      }
    }
    Ue & 3 && $u(), ge(t), n = t.pendingLanes, l & 261930 && n & 42 ? t === Sc ? ka++ : (ka = 0, Sc = t) : ka = 0, Sn(0);
  }
}
function Xd(t, e) {
  (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, xn(e)));
}
function $u() {
  return Yd(), qd(), Qd(), Zd();
}
function Zd() {
  if (vt !== 5) return false;
  var t = nl, e = pc;
  pc = 0;
  var l = Xc(Ue), a = B.T, n = V.p;
  try {
    V.p = 32 > l ? 32 : l, B.T = null, l = bc, bc = null;
    var u = nl, i = Ue;
    if (vt = 0, da = nl = null, Ue = 0, L & 6) throw Error(p(331));
    var c = L;
    if (L |= 4, Ed(u.current), Nd(u, u.current, i, l), L = c, Sn(0, false), Vt && typeof Vt.onPostCommitFiberRoot == "function") try {
      Vt.onPostCommitFiberRoot(mn, u);
    } catch {
    }
    return true;
  } finally {
    V.p = n, B.T = a, Xd(t, e);
  }
}
function Yf(t, e, l) {
  e = le(l, e), e = hc(t.stateNode, e, 2), t = ll(t, e, 2), t !== null && (yn(t, 2), ge(t));
}
function $(t, e, l) {
  if (t.tag === 3) Yf(t, t, l);
  else for (; e !== null; ) {
    if (e.tag === 3) {
      Yf(e, t, l);
      break;
    } else if (e.tag === 1) {
      var a = e.stateNode;
      if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (al === null || !al.has(a))) {
        t = le(l, t), l = nd(2), a = ll(e, l, 2), a !== null && (ud(l, a, e, t), yn(a, 2), ge(a));
        break;
      }
    }
    e = e.return;
  }
}
function Ei(t, e, l) {
  var a = t.pingCache;
  if (a === null) {
    a = t.pingCache = new gh();
    var n = /* @__PURE__ */ new Set();
    a.set(e, n);
  } else n = a.get(e), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(e, n));
  n.has(l) || (js = true, n.add(l), t = Sh.bind(null, t, e, l), e.then(t, t));
}
function Sh(t, e, l) {
  var a = t.pingCache;
  a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, tt === t && (X & l) === l && (ft === 4 || ft === 3 && (X & 62914560) === X && 300 > Lt() - Ku ? !(L & 2) && ma(t, 0) : Ns |= l, ra === X && (ra = 0)), ge(t);
}
function Ld(t, e) {
  e === 0 && (e = Bo()), t = Ul(t, e), t !== null && (yn(t, e), ge(t));
}
function zh(t) {
  var e = t.memoizedState, l = 0;
  e !== null && (l = e.retryLane), Ld(t, l);
}
function jh(t, e) {
  var l = 0;
  switch (t.tag) {
    case 31:
    case 13:
      var a = t.stateNode, n = t.memoizedState;
      n !== null && (l = n.retryLane);
      break;
    case 19:
      a = t.stateNode;
      break;
    case 22:
      a = t.stateNode._retryCache;
      break;
    default:
      throw Error(p(314));
  }
  a !== null && a.delete(e), Ld(t, l);
}
function Nh(t, e) {
  return qc(t, e);
}
var ju = null, Yl = null, zc = false, Nu = false, Di = false, Fe = 0;
function ge(t) {
  t !== Yl && t.next === null && (Yl === null ? ju = Yl = t : Yl = Yl.next = t), Nu = true, zc || (zc = true, Ah());
}
function Sn(t, e) {
  if (!Di && Nu) {
    Di = true;
    do
      for (var l = false, a = ju; a !== null; ) {
        if (t !== 0) {
          var n = a.pendingLanes;
          if (n === 0) var u = 0;
          else {
            var i = a.suspendedLanes, c = a.pingedLanes;
            u = (1 << 31 - Kt(42 | t) + 1) - 1, u &= n & ~(i & ~c), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
          }
          u !== 0 && (l = true, qf(a, u));
        } else u = X, u = Bu(a, a === tt ? u : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1), !(u & 3) || hn(a, u) || (l = true, qf(a, u));
        a = a.next;
      }
    while (l);
    Di = false;
  }
}
function Th() {
  Vd();
}
function Vd() {
  Nu = zc = false;
  var t = 0;
  Fe !== 0 && Rh() && (t = Fe);
  for (var e = Lt(), l = null, a = ju; a !== null; ) {
    var n = a.next, u = Kd(a, e);
    u === 0 ? (a.next = null, l === null ? ju = n : l.next = n, n === null && (Yl = l)) : (l = a, (t !== 0 || u & 3) && (Nu = true)), a = n;
  }
  vt !== 0 && vt !== 5 || Sn(t), Fe !== 0 && (Fe = 0);
}
function Kd(t, e) {
  for (var l = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
    var i = 31 - Kt(u), c = 1 << i, f = n[i];
    f === -1 ? (!(c & l) || c & a) && (n[i] = I0(c, e)) : f <= e && (t.expiredLanes |= c), u &= ~c;
  }
  if (e = tt, l = X, l = Bu(t, t === e ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1), a = t.callbackNode, l === 0 || t === e && (k === 2 || k === 9) || t.cancelPendingCommit !== null) return a !== null && a !== null && li(a), t.callbackNode = null, t.callbackPriority = 0;
  if (!(l & 3) || hn(t, l)) {
    if (e = l & -l, e === t.callbackPriority) return e;
    switch (a !== null && li(a), Xc(l)) {
      case 2:
      case 8:
        l = Co;
        break;
      case 32:
        l = iu;
        break;
      case 268435456:
        l = Ho;
        break;
      default:
        l = iu;
    }
    return a = Jd.bind(null, t), l = qc(l, a), t.callbackPriority = e, t.callbackNode = l, e;
  }
  return a !== null && a !== null && li(a), t.callbackPriority = 2, t.callbackNode = null, 2;
}
function Jd(t, e) {
  if (vt !== 0 && vt !== 5) return t.callbackNode = null, t.callbackPriority = 0, null;
  var l = t.callbackNode;
  if ($u() && t.callbackNode !== l) return null;
  var a = X;
  return a = Bu(t, t === tt ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1), a === 0 ? null : (Ud(t, a, e), Kd(t, Lt()), t.callbackNode != null && t.callbackNode === l ? Jd.bind(null, t) : null);
}
function qf(t, e) {
  if ($u()) return null;
  Ud(t, e, true);
}
function Ah() {
  wh(function() {
    L & 6 ? qc(Uo, Th) : Vd();
  });
}
function As() {
  if (Fe === 0) {
    var t = sa;
    t === 0 && (t = An, An <<= 1, !(An & 261888) && (An = 256)), Fe = t;
  }
  return Fe;
}
function Qf(t) {
  return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Zn("" + t);
}
function Xf(t, e) {
  var l = e.ownerDocument.createElement("input");
  return l.name = e.name, l.value = e.value, t.id && l.setAttribute("form", t.id), e.parentNode.insertBefore(l, e), t = new FormData(t), l.parentNode.removeChild(l), t;
}
function Eh(t, e, l, a, n) {
  if (e === "submit" && l && l.stateNode === n) {
    var u = Qf((n[wt] || null).action), i = a.submitter;
    i && (e = (e = i[wt] || null) ? Qf(e.formAction) : i.getAttribute("formAction"), e !== null && (u = e, i = null));
    var c = new Ru("action", "action", null, a, n);
    t.push({ event: c, listeners: [{ instance: null, listener: function() {
      if (a.defaultPrevented) {
        if (Fe !== 0) {
          var f = i ? Xf(n, i) : new FormData(n);
          dc(l, { pending: true, data: f, method: n.method, action: u }, null, f);
        }
      } else typeof u == "function" && (c.preventDefault(), f = i ? Xf(n, i) : new FormData(n), dc(l, { pending: true, data: f, method: n.method, action: u }, u, f));
    }, currentTarget: n }] });
  }
}
for (var _i = 0; _i < tc.length; _i++) {
  var Oi = tc[_i], Dh = Oi.toLowerCase(), _h = Oi[0].toUpperCase() + Oi.slice(1);
  oe(Dh, "on" + _h);
}
oe(ur, "onAnimationEnd");
oe(ir, "onAnimationIteration");
oe(cr, "onAnimationStart");
oe("dblclick", "onDoubleClick");
oe("focusin", "onFocus");
oe("focusout", "onBlur");
oe(Vm, "onTransitionRun");
oe(Km, "onTransitionStart");
oe(Jm, "onTransitionCancel");
oe(sr, "onTransitionEnd");
ia("onMouseEnter", ["mouseout", "mouseover"]);
ia("onMouseLeave", ["mouseout", "mouseover"]);
ia("onPointerEnter", ["pointerout", "pointerover"]);
ia("onPointerLeave", ["pointerout", "pointerover"]);
_l("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
_l("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
_l("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
_l("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
_l("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
_l("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var cn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Oh = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(cn));
function kd(t, e) {
  e = (e & 4) !== 0;
  for (var l = 0; l < t.length; l++) {
    var a = t[l], n = a.event;
    a = a.listeners;
    t: {
      var u = void 0;
      if (e) for (var i = a.length - 1; 0 <= i; i--) {
        var c = a[i], f = c.instance, h = c.currentTarget;
        if (c = c.listener, f !== u && n.isPropagationStopped()) break t;
        u = c, n.currentTarget = h;
        try {
          u(n);
        } catch (v) {
          su(v);
        }
        n.currentTarget = null, u = f;
      }
      else for (i = 0; i < a.length; i++) {
        if (c = a[i], f = c.instance, h = c.currentTarget, c = c.listener, f !== u && n.isPropagationStopped()) break t;
        u = c, n.currentTarget = h;
        try {
          u(n);
        } catch (v) {
          su(v);
        }
        n.currentTarget = null, u = f;
      }
    }
  }
}
function q(t, e) {
  var l = e[Ki];
  l === void 0 && (l = e[Ki] = /* @__PURE__ */ new Set());
  var a = t + "__bubble";
  l.has(a) || ($d(e, t, 2, false), l.add(a));
}
function Mi(t, e, l) {
  var a = 0;
  e && (a |= 4), $d(l, t, a, e);
}
var Rn = "_reactListening" + Math.random().toString(36).slice(2);
function Es(t) {
  if (!t[Rn]) {
    t[Rn] = true, qo.forEach(function(l) {
      l !== "selectionchange" && (Oh.has(l) || Mi(l, false, t), Mi(l, true, t));
    });
    var e = t.nodeType === 9 ? t : t.ownerDocument;
    e === null || e[Rn] || (e[Rn] = true, Mi("selectionchange", false, e));
  }
}
function $d(t, e, l, a) {
  switch (s0(e)) {
    case 2:
      var n = ny;
      break;
    case 8:
      n = uy;
      break;
    default:
      n = Ms;
  }
  l = n.bind(null, e, l, t), n = void 0, !Fi || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (n = true), a ? n !== void 0 ? t.addEventListener(e, l, { capture: true, passive: n }) : t.addEventListener(e, l, true) : n !== void 0 ? t.addEventListener(e, l, { passive: n }) : t.addEventListener(e, l, false);
}
function Ui(t, e, l, a, n) {
  var u = a;
  if (!(e & 1) && !(e & 2) && a !== null) t: for (; ; ) {
    if (a === null) return;
    var i = a.tag;
    if (i === 3 || i === 4) {
      var c = a.stateNode.containerInfo;
      if (c === n) break;
      if (i === 4) for (i = a.return; i !== null; ) {
        var f = i.tag;
        if ((f === 3 || f === 4) && i.stateNode.containerInfo === n) return;
        i = i.return;
      }
      for (; c !== null; ) {
        if (i = Xl(c), i === null) return;
        if (f = i.tag, f === 5 || f === 6 || f === 26 || f === 27) {
          a = u = i;
          continue t;
        }
        c = c.parentNode;
      }
    }
    a = a.return;
  }
  ko(function() {
    var h = u, v = Vc(l), g = [];
    t: {
      var d = fr.get(t);
      if (d !== void 0) {
        var y = Ru, j = t;
        switch (t) {
          case "keypress":
            if (Vn(l) === 0) break t;
          case "keydown":
          case "keyup":
            y = jm;
            break;
          case "focusin":
            j = "focus", y = ci;
            break;
          case "focusout":
            j = "blur", y = ci;
            break;
          case "beforeblur":
          case "afterblur":
            y = ci;
            break;
          case "click":
            if (l.button === 2) break t;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = $s;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = rm;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Am;
            break;
          case ur:
          case ir:
          case cr:
            y = hm;
            break;
          case sr:
            y = Dm;
            break;
          case "scroll":
          case "scrollend":
            y = fm;
            break;
          case "wheel":
            y = Om;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = gm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Fs;
            break;
          case "toggle":
          case "beforetoggle":
            y = Um;
        }
        var z = (e & 4) !== 0, O = !z && (t === "scroll" || t === "scrollend"), r = z ? d !== null ? d + "Capture" : null : d;
        z = [];
        for (var o = h, m; o !== null; ) {
          var x = o;
          if (m = x.stateNode, x = x.tag, x !== 5 && x !== 26 && x !== 27 || m === null || r === null || (x = Ia(o, r), x != null && z.push(sn(o, x, m))), O) break;
          o = o.return;
        }
        0 < z.length && (d = new y(d, j, null, l, v), g.push({ event: d, listeners: z }));
      }
    }
    if (!(e & 7)) {
      t: {
        if (d = t === "mouseover" || t === "pointerover", y = t === "mouseout" || t === "pointerout", d && l !== Wi && (j = l.relatedTarget || l.fromElement) && (Xl(j) || j[va])) break t;
        if ((y || d) && (d = v.window === v ? v : (d = v.ownerDocument) ? d.defaultView || d.parentWindow : window, y ? (j = l.relatedTarget || l.toElement, y = h, j = j ? Xl(j) : null, j !== null && (O = dn(j), z = j.tag, j !== O || z !== 5 && z !== 27 && z !== 6) && (j = null)) : (y = null, j = h), y !== j)) {
          if (z = $s, x = "onMouseLeave", r = "onMouseEnter", o = "mouse", (t === "pointerout" || t === "pointerover") && (z = Fs, x = "onPointerLeave", r = "onPointerEnter", o = "pointer"), O = y == null ? d : Ca(y), m = j == null ? d : Ca(j), d = new z(x, o + "leave", y, l, v), d.target = O, d.relatedTarget = m, x = null, Xl(v) === h && (z = new z(r, o + "enter", j, l, v), z.target = m, z.relatedTarget = O, x = z), O = x, y && j) e: {
            for (z = Mh, r = y, o = j, m = 0, x = r; x; x = z(x)) m++;
            x = 0;
            for (var N = o; N; N = z(N)) x++;
            for (; 0 < m - x; ) r = z(r), m--;
            for (; 0 < x - m; ) o = z(o), x--;
            for (; m--; ) {
              if (r === o || o !== null && r === o.alternate) {
                z = r;
                break e;
              }
              r = z(r), o = z(o);
            }
            z = null;
          }
          else z = null;
          y !== null && Zf(g, d, y, z, false), j !== null && O !== null && Zf(g, O, j, z, true);
        }
      }
      t: {
        if (d = h ? Ca(h) : window, y = d.nodeName && d.nodeName.toLowerCase(), y === "select" || y === "input" && d.type === "file") var _ = ef;
        else if (tf(d)) if (tr) _ = Xm;
        else {
          _ = qm;
          var b = Ym;
        }
        else y = d.nodeName, !y || y.toLowerCase() !== "input" || d.type !== "checkbox" && d.type !== "radio" ? h && Lc(h.elementType) && (_ = ef) : _ = Qm;
        if (_ && (_ = _(t, h))) {
          Po(g, _, l, v);
          break t;
        }
        b && b(t, d, h), t === "focusout" && h && d.type === "number" && h.memoizedProps.value != null && $i(d, "number", d.value);
      }
      switch (b = h ? Ca(h) : window, t) {
        case "focusin":
          (tf(b) || b.contentEditable === "true") && (Vl = b, Ii = h, Ya = null);
          break;
        case "focusout":
          Ya = Ii = Vl = null;
          break;
        case "mousedown":
          Pi = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Pi = false, cf(g, l, v);
          break;
        case "selectionchange":
          if (Lm) break;
        case "keydown":
        case "keyup":
          cf(g, l, v);
      }
      var A;
      if (kc) t: {
        switch (t) {
          case "compositionstart":
            var D = "onCompositionStart";
            break t;
          case "compositionend":
            D = "onCompositionEnd";
            break t;
          case "compositionupdate":
            D = "onCompositionUpdate";
            break t;
        }
        D = void 0;
      }
      else Ll ? Fo(t, l) && (D = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (D = "onCompositionStart");
      D && (Wo && l.locale !== "ko" && (Ll || D !== "onCompositionStart" ? D === "onCompositionEnd" && Ll && (A = $o()) : (ke = v, Kc = "value" in ke ? ke.value : ke.textContent, Ll = true)), b = Tu(h, D), 0 < b.length && (D = new Ws(D, t, null, l, v), g.push({ event: D, listeners: b }), A ? D.data = A : (A = Io(l), A !== null && (D.data = A)))), (A = Hm ? Bm(t, l) : Rm(t, l)) && (D = Tu(h, "onBeforeInput"), 0 < D.length && (b = new Ws("onBeforeInput", "beforeinput", null, l, v), g.push({ event: b, listeners: D }), b.data = A)), Eh(g, t, h, l, v);
    }
    kd(g, e);
  });
}
function sn(t, e, l) {
  return { instance: t, listener: e, currentTarget: l };
}
function Tu(t, e) {
  for (var l = e + "Capture", a = []; t !== null; ) {
    var n = t, u = n.stateNode;
    if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Ia(t, l), n != null && a.unshift(sn(t, n, u)), n = Ia(t, e), n != null && a.push(sn(t, n, u))), t.tag === 3) return a;
    t = t.return;
  }
  return [];
}
function Mh(t) {
  if (t === null) return null;
  do
    t = t.return;
  while (t && t.tag !== 5 && t.tag !== 27);
  return t || null;
}
function Zf(t, e, l, a, n) {
  for (var u = e._reactName, i = []; l !== null && l !== a; ) {
    var c = l, f = c.alternate, h = c.stateNode;
    if (c = c.tag, f !== null && f === a) break;
    c !== 5 && c !== 26 && c !== 27 || h === null || (f = h, n ? (h = Ia(l, u), h != null && i.unshift(sn(l, h, f))) : n || (h = Ia(l, u), h != null && i.push(sn(l, h, f)))), l = l.return;
  }
  i.length !== 0 && t.push({ event: e, listeners: i });
}
var Uh = /\r\n?/g, Ch = /\u0000|\uFFFD/g;
function Lf(t) {
  return (typeof t == "string" ? t : "" + t).replace(Uh, `
`).replace(Ch, "");
}
function Wd(t, e) {
  return e = Lf(e), Lf(t) === e;
}
function I(t, e, l, a, n, u) {
  switch (l) {
    case "children":
      typeof a == "string" ? e === "body" || e === "textarea" && a === "" || ca(t, a) : (typeof a == "number" || typeof a == "bigint") && e !== "body" && ca(t, "" + a);
      break;
    case "className":
      _n(t, "class", a);
      break;
    case "tabIndex":
      _n(t, "tabindex", a);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      _n(t, l, a);
      break;
    case "style":
      Jo(t, a, u);
      break;
    case "data":
      if (e !== "object") {
        _n(t, "data", a);
        break;
      }
    case "src":
    case "href":
      if (a === "" && (e !== "a" || l !== "href")) {
        t.removeAttribute(l);
        break;
      }
      if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
        t.removeAttribute(l);
        break;
      }
      a = Zn("" + a), t.setAttribute(l, a);
      break;
    case "action":
    case "formAction":
      if (typeof a == "function") {
        t.setAttribute(l, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
        break;
      } else typeof u == "function" && (l === "formAction" ? (e !== "input" && I(t, e, "name", n.name, n, null), I(t, e, "formEncType", n.formEncType, n, null), I(t, e, "formMethod", n.formMethod, n, null), I(t, e, "formTarget", n.formTarget, n, null)) : (I(t, e, "encType", n.encType, n, null), I(t, e, "method", n.method, n, null), I(t, e, "target", n.target, n, null)));
      if (a == null || typeof a == "symbol" || typeof a == "boolean") {
        t.removeAttribute(l);
        break;
      }
      a = Zn("" + a), t.setAttribute(l, a);
      break;
    case "onClick":
      a != null && (t.onclick = De);
      break;
    case "onScroll":
      a != null && q("scroll", t);
      break;
    case "onScrollEnd":
      a != null && q("scrollend", t);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a)) throw Error(p(61));
        if (l = a.__html, l != null) {
          if (n.children != null) throw Error(p(60));
          t.innerHTML = l;
        }
      }
      break;
    case "multiple":
      t.multiple = a && typeof a != "function" && typeof a != "symbol";
      break;
    case "muted":
      t.muted = a && typeof a != "function" && typeof a != "symbol";
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
      if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
        t.removeAttribute("xlink:href");
        break;
      }
      l = Zn("" + a), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l);
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, "" + a) : t.removeAttribute(l);
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
      a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, "") : t.removeAttribute(l);
      break;
    case "capture":
    case "download":
      a === true ? t.setAttribute(l, "") : a !== false && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, a) : t.removeAttribute(l);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(l, a) : t.removeAttribute(l);
      break;
    case "rowSpan":
    case "start":
      a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(l) : t.setAttribute(l, a);
      break;
    case "popover":
      q("beforetoggle", t), q("toggle", t), Xn(t, "popover", a);
      break;
    case "xlinkActuate":
      be(t, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
      break;
    case "xlinkArcrole":
      be(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
      break;
    case "xlinkRole":
      be(t, "http://www.w3.org/1999/xlink", "xlink:role", a);
      break;
    case "xlinkShow":
      be(t, "http://www.w3.org/1999/xlink", "xlink:show", a);
      break;
    case "xlinkTitle":
      be(t, "http://www.w3.org/1999/xlink", "xlink:title", a);
      break;
    case "xlinkType":
      be(t, "http://www.w3.org/1999/xlink", "xlink:type", a);
      break;
    case "xmlBase":
      be(t, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
      break;
    case "xmlLang":
      be(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
      break;
    case "xmlSpace":
      be(t, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
      break;
    case "is":
      Xn(t, "is", a);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = cm.get(l) || l, Xn(t, l, a));
  }
}
function jc(t, e, l, a, n, u) {
  switch (l) {
    case "style":
      Jo(t, a, u);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a)) throw Error(p(61));
        if (l = a.__html, l != null) {
          if (n.children != null) throw Error(p(60));
          t.innerHTML = l;
        }
      }
      break;
    case "children":
      typeof a == "string" ? ca(t, a) : (typeof a == "number" || typeof a == "bigint") && ca(t, "" + a);
      break;
    case "onScroll":
      a != null && q("scroll", t);
      break;
    case "onScrollEnd":
      a != null && q("scrollend", t);
      break;
    case "onClick":
      a != null && (t.onclick = De);
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
      if (!Qo.hasOwnProperty(l)) t: {
        if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), e = l.slice(2, n ? l.length - 7 : void 0), u = t[wt] || null, u = u != null ? u[l] : null, typeof u == "function" && t.removeEventListener(e, u, n), typeof a == "function")) {
          typeof u != "function" && u !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(e, a, n);
          break t;
        }
        l in t ? t[l] = a : a === true ? t.setAttribute(l, "") : Xn(t, l, a);
      }
  }
}
function Dt(t, e, l) {
  switch (e) {
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
      q("error", t), q("load", t);
      var a = false, n = false, u;
      for (u in l) if (l.hasOwnProperty(u)) {
        var i = l[u];
        if (i != null) switch (u) {
          case "src":
            a = true;
            break;
          case "srcSet":
            n = true;
            break;
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(p(137, e));
          default:
            I(t, e, u, i, l, null);
        }
      }
      n && I(t, e, "srcSet", l.srcSet, l, null), a && I(t, e, "src", l.src, l, null);
      return;
    case "input":
      q("invalid", t);
      var c = u = i = n = null, f = null, h = null;
      for (a in l) if (l.hasOwnProperty(a)) {
        var v = l[a];
        if (v != null) switch (a) {
          case "name":
            n = v;
            break;
          case "type":
            i = v;
            break;
          case "checked":
            f = v;
            break;
          case "defaultChecked":
            h = v;
            break;
          case "value":
            u = v;
            break;
          case "defaultValue":
            c = v;
            break;
          case "children":
          case "dangerouslySetInnerHTML":
            if (v != null) throw Error(p(137, e));
            break;
          default:
            I(t, e, a, v, l, null);
        }
      }
      Lo(t, u, c, f, h, i, n, false);
      return;
    case "select":
      q("invalid", t), a = i = u = null;
      for (n in l) if (l.hasOwnProperty(n) && (c = l[n], c != null)) switch (n) {
        case "value":
          u = c;
          break;
        case "defaultValue":
          i = c;
          break;
        case "multiple":
          a = c;
        default:
          I(t, e, n, c, l, null);
      }
      e = u, l = i, t.multiple = !!a, e != null ? Pl(t, !!a, e, false) : l != null && Pl(t, !!a, l, true);
      return;
    case "textarea":
      q("invalid", t), u = n = a = null;
      for (i in l) if (l.hasOwnProperty(i) && (c = l[i], c != null)) switch (i) {
        case "value":
          a = c;
          break;
        case "defaultValue":
          n = c;
          break;
        case "children":
          u = c;
          break;
        case "dangerouslySetInnerHTML":
          if (c != null) throw Error(p(91));
          break;
        default:
          I(t, e, i, c, l, null);
      }
      Ko(t, a, n, u);
      return;
    case "option":
      for (f in l) if (l.hasOwnProperty(f) && (a = l[f], a != null)) switch (f) {
        case "selected":
          t.selected = a && typeof a != "function" && typeof a != "symbol";
          break;
        default:
          I(t, e, f, a, l, null);
      }
      return;
    case "dialog":
      q("beforetoggle", t), q("toggle", t), q("cancel", t), q("close", t);
      break;
    case "iframe":
    case "object":
      q("load", t);
      break;
    case "video":
    case "audio":
      for (a = 0; a < cn.length; a++) q(cn[a], t);
      break;
    case "image":
      q("error", t), q("load", t);
      break;
    case "details":
      q("toggle", t);
      break;
    case "embed":
    case "source":
    case "link":
      q("error", t), q("load", t);
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
      for (h in l) if (l.hasOwnProperty(h) && (a = l[h], a != null)) switch (h) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(p(137, e));
        default:
          I(t, e, h, a, l, null);
      }
      return;
    default:
      if (Lc(e)) {
        for (v in l) l.hasOwnProperty(v) && (a = l[v], a !== void 0 && jc(t, e, v, a, l, void 0));
        return;
      }
  }
  for (c in l) l.hasOwnProperty(c) && (a = l[c], a != null && I(t, e, c, a, l, null));
}
function Hh(t, e, l, a) {
  switch (e) {
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
      var n = null, u = null, i = null, c = null, f = null, h = null, v = null;
      for (y in l) {
        var g = l[y];
        if (l.hasOwnProperty(y) && g != null) switch (y) {
          case "checked":
            break;
          case "value":
            break;
          case "defaultValue":
            f = g;
          default:
            a.hasOwnProperty(y) || I(t, e, y, null, a, g);
        }
      }
      for (var d in a) {
        var y = a[d];
        if (g = l[d], a.hasOwnProperty(d) && (y != null || g != null)) switch (d) {
          case "type":
            u = y;
            break;
          case "name":
            n = y;
            break;
          case "checked":
            h = y;
            break;
          case "defaultChecked":
            v = y;
            break;
          case "value":
            i = y;
            break;
          case "defaultValue":
            c = y;
            break;
          case "children":
          case "dangerouslySetInnerHTML":
            if (y != null) throw Error(p(137, e));
            break;
          default:
            y !== g && I(t, e, d, y, a, g);
        }
      }
      ki(t, i, c, f, h, v, u, n);
      return;
    case "select":
      y = i = c = d = null;
      for (u in l) if (f = l[u], l.hasOwnProperty(u) && f != null) switch (u) {
        case "value":
          break;
        case "multiple":
          y = f;
        default:
          a.hasOwnProperty(u) || I(t, e, u, null, a, f);
      }
      for (n in a) if (u = a[n], f = l[n], a.hasOwnProperty(n) && (u != null || f != null)) switch (n) {
        case "value":
          d = u;
          break;
        case "defaultValue":
          c = u;
          break;
        case "multiple":
          i = u;
        default:
          u !== f && I(t, e, n, u, a, f);
      }
      e = c, l = i, a = y, d != null ? Pl(t, !!l, d, false) : !!a != !!l && (e != null ? Pl(t, !!l, e, true) : Pl(t, !!l, l ? [] : "", false));
      return;
    case "textarea":
      y = d = null;
      for (c in l) if (n = l[c], l.hasOwnProperty(c) && n != null && !a.hasOwnProperty(c)) switch (c) {
        case "value":
          break;
        case "children":
          break;
        default:
          I(t, e, c, null, a, n);
      }
      for (i in a) if (n = a[i], u = l[i], a.hasOwnProperty(i) && (n != null || u != null)) switch (i) {
        case "value":
          d = n;
          break;
        case "defaultValue":
          y = n;
          break;
        case "children":
          break;
        case "dangerouslySetInnerHTML":
          if (n != null) throw Error(p(91));
          break;
        default:
          n !== u && I(t, e, i, n, a, u);
      }
      Vo(t, d, y);
      return;
    case "option":
      for (var j in l) if (d = l[j], l.hasOwnProperty(j) && d != null && !a.hasOwnProperty(j)) switch (j) {
        case "selected":
          t.selected = false;
          break;
        default:
          I(t, e, j, null, a, d);
      }
      for (f in a) if (d = a[f], y = l[f], a.hasOwnProperty(f) && d !== y && (d != null || y != null)) switch (f) {
        case "selected":
          t.selected = d && typeof d != "function" && typeof d != "symbol";
          break;
        default:
          I(t, e, f, d, a, y);
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
      for (var z in l) d = l[z], l.hasOwnProperty(z) && d != null && !a.hasOwnProperty(z) && I(t, e, z, null, a, d);
      for (h in a) if (d = a[h], y = l[h], a.hasOwnProperty(h) && d !== y && (d != null || y != null)) switch (h) {
        case "children":
        case "dangerouslySetInnerHTML":
          if (d != null) throw Error(p(137, e));
          break;
        default:
          I(t, e, h, d, a, y);
      }
      return;
    default:
      if (Lc(e)) {
        for (var O in l) d = l[O], l.hasOwnProperty(O) && d !== void 0 && !a.hasOwnProperty(O) && jc(t, e, O, void 0, a, d);
        for (v in a) d = a[v], y = l[v], !a.hasOwnProperty(v) || d === y || d === void 0 && y === void 0 || jc(t, e, v, d, a, y);
        return;
      }
  }
  for (var r in l) d = l[r], l.hasOwnProperty(r) && d != null && !a.hasOwnProperty(r) && I(t, e, r, null, a, d);
  for (g in a) d = a[g], y = l[g], !a.hasOwnProperty(g) || d === y || d == null && y == null || I(t, e, g, d, a, y);
}
function Vf(t) {
  switch (t) {
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
function Bh() {
  if (typeof performance.getEntriesByType == "function") {
    for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
      var n = l[a], u = n.transferSize, i = n.initiatorType, c = n.duration;
      if (u && c && Vf(i)) {
        for (i = 0, c = n.responseEnd, a += 1; a < l.length; a++) {
          var f = l[a], h = f.startTime;
          if (h > c) break;
          var v = f.transferSize, g = f.initiatorType;
          v && Vf(g) && (f = f.responseEnd, i += v * (f < c ? 1 : (c - h) / (f - h)));
        }
        if (--a, e += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
      }
    }
    if (0 < t) return e / t / 1e6;
  }
  return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
}
var Nc = null, Tc = null;
function Au(t) {
  return t.nodeType === 9 ? t : t.ownerDocument;
}
function Kf(t) {
  switch (t) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function Fd(t, e) {
  if (t === 0) switch (e) {
    case "svg":
      return 1;
    case "math":
      return 2;
    default:
      return 0;
  }
  return t === 1 && e === "foreignObject" ? 0 : t;
}
function Ac(t, e) {
  return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
}
var Ci = null;
function Rh() {
  var t = window.event;
  return t && t.type === "popstate" ? t === Ci ? false : (Ci = t, true) : (Ci = null, false);
}
var Id = typeof setTimeout == "function" ? setTimeout : void 0, Gh = typeof clearTimeout == "function" ? clearTimeout : void 0, Jf = typeof Promise == "function" ? Promise : void 0, wh = typeof queueMicrotask == "function" ? queueMicrotask : typeof Jf < "u" ? function(t) {
  return Jf.resolve(null).then(t).catch(Yh);
} : Id;
function Yh(t) {
  setTimeout(function() {
    throw t;
  });
}
function ml(t) {
  return t === "head";
}
function kf(t, e) {
  var l = e, a = 0;
  do {
    var n = l.nextSibling;
    if (t.removeChild(l), n && n.nodeType === 8) if (l = n.data, l === "/$" || l === "/&") {
      if (a === 0) {
        t.removeChild(n), ya(e);
        return;
      }
      a--;
    } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&") a++;
    else if (l === "html") $a(t.ownerDocument.documentElement);
    else if (l === "head") {
      l = t.ownerDocument.head, $a(l);
      for (var u = l.firstChild; u; ) {
        var i = u.nextSibling, c = u.nodeName;
        u[gn] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = i;
      }
    } else l === "body" && $a(t.ownerDocument.body);
    l = n;
  } while (l);
  ya(e);
}
function $f(t, e) {
  var l = t;
  t = 0;
  do {
    var a = l.nextSibling;
    if (l.nodeType === 1 ? e ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (e ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), a && a.nodeType === 8) if (l = a.data, l === "/$") {
      if (t === 0) break;
      t--;
    } else l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || t++;
    l = a;
  } while (l);
}
function Ec(t) {
  var e = t.firstChild;
  for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
    var l = e;
    switch (e = e.nextSibling, l.nodeName) {
      case "HTML":
      case "HEAD":
      case "BODY":
        Ec(l), Zc(l);
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (l.rel.toLowerCase() === "stylesheet") continue;
    }
    t.removeChild(l);
  }
}
function qh(t, e, l, a) {
  for (; t.nodeType === 1; ) {
    var n = l;
    if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
      if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
    } else if (a) {
      if (!t[gn]) switch (e) {
        case "meta":
          if (!t.hasAttribute("itemprop")) break;
          return t;
        case "link":
          if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence")) break;
          if (u !== n.rel || t.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || t.getAttribute("title") !== (n.title == null ? null : n.title)) break;
          return t;
        case "style":
          if (t.hasAttribute("data-precedence")) break;
          return t;
        case "script":
          if (u = t.getAttribute("src"), (u !== (n.src == null ? null : n.src) || t.getAttribute("type") !== (n.type == null ? null : n.type) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop")) break;
          return t;
        default:
          return t;
      }
    } else if (e === "input" && t.type === "hidden") {
      var u = n.name == null ? null : "" + n.name;
      if (n.type === "hidden" && t.getAttribute("name") === u) return t;
    } else return t;
    if (t = ue(t.nextSibling), t === null) break;
  }
  return null;
}
function Qh(t, e, l) {
  if (e === "") return null;
  for (; t.nodeType !== 3; ) if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = ue(t.nextSibling), t === null)) return null;
  return t;
}
function Pd(t, e) {
  for (; t.nodeType !== 8; ) if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = ue(t.nextSibling), t === null)) return null;
  return t;
}
function Dc(t) {
  return t.data === "$?" || t.data === "$~";
}
function _c(t) {
  return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
}
function Xh(t, e) {
  var l = t.ownerDocument;
  if (t.data === "$~") t._reactRetry = e;
  else if (t.data !== "$?" || l.readyState !== "loading") e();
  else {
    var a = function() {
      e(), l.removeEventListener("DOMContentLoaded", a);
    };
    l.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
  }
}
function ue(t) {
  for (; t != null; t = t.nextSibling) {
    var e = t.nodeType;
    if (e === 1 || e === 3) break;
    if (e === 8) {
      if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F") break;
      if (e === "/$" || e === "/&") return null;
    }
  }
  return t;
}
var Oc = null;
function Wf(t) {
  t = t.nextSibling;
  for (var e = 0; t; ) {
    if (t.nodeType === 8) {
      var l = t.data;
      if (l === "/$" || l === "/&") {
        if (e === 0) return ue(t.nextSibling);
        e--;
      } else l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || e++;
    }
    t = t.nextSibling;
  }
  return null;
}
function Ff(t) {
  t = t.previousSibling;
  for (var e = 0; t; ) {
    if (t.nodeType === 8) {
      var l = t.data;
      if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
        if (e === 0) return t;
        e--;
      } else l !== "/$" && l !== "/&" || e++;
    }
    t = t.previousSibling;
  }
  return null;
}
function t0(t, e, l) {
  switch (e = Au(l), t) {
    case "html":
      if (t = e.documentElement, !t) throw Error(p(452));
      return t;
    case "head":
      if (t = e.head, !t) throw Error(p(453));
      return t;
    case "body":
      if (t = e.body, !t) throw Error(p(454));
      return t;
    default:
      throw Error(p(451));
  }
}
function $a(t) {
  for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
  Zc(t);
}
var ie = /* @__PURE__ */ new Map(), If = /* @__PURE__ */ new Set();
function Eu(t) {
  return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
}
var we = V.d;
V.d = { f: Zh, r: Lh, D: Vh, C: Kh, L: Jh, m: kh, X: Wh, S: $h, M: Fh };
function Zh() {
  var t = we.f(), e = Ju();
  return t || e;
}
function Lh(t) {
  var e = xa(t);
  e !== null && e.tag === 5 && e.type === "form" ? Jr(e) : we.r(t);
}
var za = typeof document > "u" ? null : document;
function e0(t, e, l) {
  var a = za;
  if (a && typeof e == "string" && e) {
    var n = ee(e);
    n = 'link[rel="' + t + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), If.has(n) || (If.add(n), t = { rel: t, crossOrigin: l, href: e }, a.querySelector(n) === null && (e = a.createElement("link"), Dt(e, "link", t), St(e), a.head.appendChild(e)));
  }
}
function Vh(t) {
  we.D(t), e0("dns-prefetch", t, null);
}
function Kh(t, e) {
  we.C(t, e), e0("preconnect", t, e);
}
function Jh(t, e, l) {
  we.L(t, e, l);
  var a = za;
  if (a && t && e) {
    var n = 'link[rel="preload"][as="' + ee(e) + '"]';
    e === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + ee(l.imageSrcSet) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + ee(l.imageSizes) + '"]')) : n += '[href="' + ee(t) + '"]';
    var u = n;
    switch (e) {
      case "style":
        u = ha(t);
        break;
      case "script":
        u = ja(t);
    }
    ie.has(u) || (t = it({ rel: "preload", href: e === "image" && l && l.imageSrcSet ? void 0 : t, as: e }, l), ie.set(u, t), a.querySelector(n) !== null || e === "style" && a.querySelector(zn(u)) || e === "script" && a.querySelector(jn(u)) || (e = a.createElement("link"), Dt(e, "link", t), St(e), a.head.appendChild(e)));
  }
}
function kh(t, e) {
  we.m(t, e);
  var l = za;
  if (l && t) {
    var a = e && typeof e.as == "string" ? e.as : "script", n = 'link[rel="modulepreload"][as="' + ee(a) + '"][href="' + ee(t) + '"]', u = n;
    switch (a) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        u = ja(t);
    }
    if (!ie.has(u) && (t = it({ rel: "modulepreload", href: t }, e), ie.set(u, t), l.querySelector(n) === null)) {
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (l.querySelector(jn(u))) return;
      }
      a = l.createElement("link"), Dt(a, "link", t), St(a), l.head.appendChild(a);
    }
  }
}
function $h(t, e, l) {
  we.S(t, e, l);
  var a = za;
  if (a && t) {
    var n = Il(a).hoistableStyles, u = ha(t);
    e = e || "default";
    var i = n.get(u);
    if (!i) {
      var c = { loading: 0, preload: null };
      if (i = a.querySelector(zn(u))) c.loading = 5;
      else {
        t = it({ rel: "stylesheet", href: t, "data-precedence": e }, l), (l = ie.get(u)) && Ds(t, l);
        var f = i = a.createElement("link");
        St(f), Dt(f, "link", t), f._p = new Promise(function(h, v) {
          f.onload = h, f.onerror = v;
        }), f.addEventListener("load", function() {
          c.loading |= 1;
        }), f.addEventListener("error", function() {
          c.loading |= 2;
        }), c.loading |= 4, Pn(i, e, a);
      }
      i = { type: "stylesheet", instance: i, count: 1, state: c }, n.set(u, i);
    }
  }
}
function Wh(t, e) {
  we.X(t, e);
  var l = za;
  if (l && t) {
    var a = Il(l).hoistableScripts, n = ja(t), u = a.get(n);
    u || (u = l.querySelector(jn(n)), u || (t = it({ src: t, async: true }, e), (e = ie.get(n)) && _s(t, e), u = l.createElement("script"), St(u), Dt(u, "link", t), l.head.appendChild(u)), u = { type: "script", instance: u, count: 1, state: null }, a.set(n, u));
  }
}
function Fh(t, e) {
  we.M(t, e);
  var l = za;
  if (l && t) {
    var a = Il(l).hoistableScripts, n = ja(t), u = a.get(n);
    u || (u = l.querySelector(jn(n)), u || (t = it({ src: t, async: true, type: "module" }, e), (e = ie.get(n)) && _s(t, e), u = l.createElement("script"), St(u), Dt(u, "link", t), l.head.appendChild(u)), u = { type: "script", instance: u, count: 1, state: null }, a.set(n, u));
  }
}
function Pf(t, e, l, a) {
  var n = (n = Pe.current) ? Eu(n) : null;
  if (!n) throw Error(p(446));
  switch (t) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof l.precedence == "string" && typeof l.href == "string" ? (e = ha(l.href), l = Il(n).hoistableStyles, a = l.get(e), a || (a = { type: "style", instance: null, count: 0, state: null }, l.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
        t = ha(l.href);
        var u = Il(n).hoistableStyles, i = u.get(t);
        if (i || (n = n.ownerDocument || n, i = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, u.set(t, i), (u = n.querySelector(zn(t))) && !u._p && (i.instance = u, i.state.loading = 5), ie.has(t) || (l = { rel: "preload", as: "style", href: l.href, crossOrigin: l.crossOrigin, integrity: l.integrity, media: l.media, hrefLang: l.hrefLang, referrerPolicy: l.referrerPolicy }, ie.set(t, l), u || Ih(n, t, l, i.state))), e && a === null) throw Error(p(528, ""));
        return i;
      }
      if (e && a !== null) throw Error(p(529, ""));
      return null;
    case "script":
      return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = ja(l), l = Il(n).hoistableScripts, a = l.get(e), a || (a = { type: "script", instance: null, count: 0, state: null }, l.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
    default:
      throw Error(p(444, t));
  }
}
function ha(t) {
  return 'href="' + ee(t) + '"';
}
function zn(t) {
  return 'link[rel="stylesheet"][' + t + "]";
}
function l0(t) {
  return it({}, t, { "data-precedence": t.precedence, precedence: null });
}
function Ih(t, e, l, a) {
  t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? a.loading = 1 : (e = t.createElement("link"), a.preload = e, e.addEventListener("load", function() {
    return a.loading |= 1;
  }), e.addEventListener("error", function() {
    return a.loading |= 2;
  }), Dt(e, "link", l), St(e), t.head.appendChild(e));
}
function ja(t) {
  return '[src="' + ee(t) + '"]';
}
function jn(t) {
  return "script[async]" + t;
}
function to(t, e, l) {
  if (e.count++, e.instance === null) switch (e.type) {
    case "style":
      var a = t.querySelector('style[data-href~="' + ee(l.href) + '"]');
      if (a) return e.instance = a, St(a), a;
      var n = it({}, l, { "data-href": l.href, "data-precedence": l.precedence, href: null, precedence: null });
      return a = (t.ownerDocument || t).createElement("style"), St(a), Dt(a, "style", n), Pn(a, l.precedence, t), e.instance = a;
    case "stylesheet":
      n = ha(l.href);
      var u = t.querySelector(zn(n));
      if (u) return e.state.loading |= 4, e.instance = u, St(u), u;
      a = l0(l), (n = ie.get(n)) && Ds(a, n), u = (t.ownerDocument || t).createElement("link"), St(u);
      var i = u;
      return i._p = new Promise(function(c, f) {
        i.onload = c, i.onerror = f;
      }), Dt(u, "link", a), e.state.loading |= 4, Pn(u, l.precedence, t), e.instance = u;
    case "script":
      return u = ja(l.src), (n = t.querySelector(jn(u))) ? (e.instance = n, St(n), n) : (a = l, (n = ie.get(u)) && (a = it({}, l), _s(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), St(n), Dt(n, "link", a), t.head.appendChild(n), e.instance = n);
    case "void":
      return null;
    default:
      throw Error(p(443, e.type));
  }
  else e.type === "stylesheet" && !(e.state.loading & 4) && (a = e.instance, e.state.loading |= 4, Pn(a, l.precedence, t));
  return e.instance;
}
function Pn(t, e, l) {
  for (var a = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
    var c = a[i];
    if (c.dataset.precedence === e) u = c;
    else if (u !== n) break;
  }
  u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
}
function Ds(t, e) {
  t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
}
function _s(t, e) {
  t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
}
var tu = null;
function eo(t, e, l) {
  if (tu === null) {
    var a = /* @__PURE__ */ new Map(), n = tu = /* @__PURE__ */ new Map();
    n.set(l, a);
  } else n = tu, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
  if (a.has(t)) return a;
  for (a.set(t, null), l = l.getElementsByTagName(t), n = 0; n < l.length; n++) {
    var u = l[n];
    if (!(u[gn] || u[Tt] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
      var i = u.getAttribute(e) || "";
      i = t + i;
      var c = a.get(i);
      c ? c.push(u) : a.set(i, [u]);
    }
  }
  return a;
}
function lo(t, e, l) {
  t = t.ownerDocument || t, t.head.insertBefore(l, e === "title" ? t.querySelector("head > title") : null);
}
function Ph(t, e, l) {
  if (l === 1 || e.itemProp != null) return false;
  switch (t) {
    case "meta":
    case "title":
      return true;
    case "style":
      if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "") break;
      return true;
    case "link":
      if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError) break;
      switch (e.rel) {
        case "stylesheet":
          return t = e.disabled, typeof e.precedence == "string" && t == null;
        default:
          return true;
      }
    case "script":
      if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string") return true;
  }
  return false;
}
function a0(t) {
  return !(t.type === "stylesheet" && !(t.state.loading & 3));
}
function ty(t, e, l, a) {
  if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== false) && !(l.state.loading & 4)) {
    if (l.instance === null) {
      var n = ha(a.href), u = e.querySelector(zn(n));
      if (u) {
        e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Du.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, St(u);
        return;
      }
      u = e.ownerDocument || e, a = l0(a), (n = ie.get(n)) && Ds(a, n), u = u.createElement("link"), St(u);
      var i = u;
      i._p = new Promise(function(c, f) {
        i.onload = c, i.onerror = f;
      }), Dt(u, "link", a), l.instance = u;
    }
    t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && !(l.state.loading & 3) && (t.count++, l = Du.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
  }
}
var Hi = 0;
function ey(t, e) {
  return t.stylesheets && t.count === 0 && eu(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
    var a = setTimeout(function() {
      if (t.stylesheets && eu(t, t.stylesheets), t.unsuspend) {
        var u = t.unsuspend;
        t.unsuspend = null, u();
      }
    }, 6e4 + e);
    0 < t.imgBytes && Hi === 0 && (Hi = 62500 * Bh());
    var n = setTimeout(function() {
      if (t.waitingForImages = false, t.count === 0 && (t.stylesheets && eu(t, t.stylesheets), t.unsuspend)) {
        var u = t.unsuspend;
        t.unsuspend = null, u();
      }
    }, (t.imgBytes > Hi ? 50 : 800) + e);
    return t.unsuspend = l, function() {
      t.unsuspend = null, clearTimeout(a), clearTimeout(n);
    };
  } : null;
}
function Du() {
  if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
    if (this.stylesheets) eu(this, this.stylesheets);
    else if (this.unsuspend) {
      var t = this.unsuspend;
      this.unsuspend = null, t();
    }
  }
}
var _u = null;
function eu(t, e) {
  t.stylesheets = null, t.unsuspend !== null && (t.count++, _u = /* @__PURE__ */ new Map(), e.forEach(ly, t), _u = null, Du.call(t));
}
function ly(t, e) {
  if (!(e.state.loading & 4)) {
    var l = _u.get(t);
    if (l) var a = l.get(null);
    else {
      l = /* @__PURE__ */ new Map(), _u.set(t, l);
      for (var n = t.querySelectorAll("link[data-precedence],style[data-precedence]"), u = 0; u < n.length; u++) {
        var i = n[u];
        (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (l.set(i.dataset.precedence, i), a = i);
      }
      a && l.set(null, a);
    }
    n = e.instance, i = n.getAttribute("data-precedence"), u = l.get(i) || a, u === a && l.set(null, n), l.set(i, n), this.count++, a = Du.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), e.state.loading |= 4;
  }
}
var fn = { $$typeof: Ee, Provider: null, Consumer: null, _currentValue: pl, _currentValue2: pl, _threadCount: 0 };
function ay(t, e, l, a, n, u, i, c, f) {
  this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ai(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ai(0), this.hiddenUpdates = ai(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = f, this.incompleteTransitions = /* @__PURE__ */ new Map();
}
function n0(t, e, l, a, n, u, i, c, f, h, v, g) {
  return t = new ay(t, e, l, i, f, h, v, g, c), e = 1, u === true && (e |= 24), u = Xt(3, null, null, e), t.current = u, u.stateNode = t, e = es(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = { element: a, isDehydrated: l, cache: e }, ns(u), t;
}
function u0(t) {
  return t ? (t = kl, t) : kl;
}
function i0(t, e, l, a, n, u) {
  n = u0(n), a.context === null ? a.context = n : a.pendingContext = n, a = el(e), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = ll(t, a, e), l !== null && (Gt(l, t, e), Qa(l, t, e));
}
function ao(t, e) {
  if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
    var l = t.retryLane;
    t.retryLane = l !== 0 && l < e ? l : e;
  }
}
function Os(t, e) {
  ao(t, e), (t = t.alternate) && ao(t, e);
}
function c0(t) {
  if (t.tag === 13 || t.tag === 31) {
    var e = Ul(t, 67108864);
    e !== null && Gt(e, t, 67108864), Os(t, 67108864);
  }
}
function no(t) {
  if (t.tag === 13 || t.tag === 31) {
    var e = Jt();
    e = Qc(e);
    var l = Ul(t, e);
    l !== null && Gt(l, t, e), Os(t, e);
  }
}
var Ou = true;
function ny(t, e, l, a) {
  var n = B.T;
  B.T = null;
  var u = V.p;
  try {
    V.p = 2, Ms(t, e, l, a);
  } finally {
    V.p = u, B.T = n;
  }
}
function uy(t, e, l, a) {
  var n = B.T;
  B.T = null;
  var u = V.p;
  try {
    V.p = 8, Ms(t, e, l, a);
  } finally {
    V.p = u, B.T = n;
  }
}
function Ms(t, e, l, a) {
  if (Ou) {
    var n = Mc(a);
    if (n === null) Ui(t, e, a, Mu, l), uo(t, a);
    else if (cy(n, t, e, l, a)) a.stopPropagation();
    else if (uo(t, a), e & 4 && -1 < iy.indexOf(t)) {
      for (; n !== null; ) {
        var u = xa(n);
        if (u !== null) switch (u.tag) {
          case 3:
            if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
              var i = gl(u.pendingLanes);
              if (i !== 0) {
                var c = u;
                for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                  var f = 1 << 31 - Kt(i);
                  c.entanglements[1] |= f, i &= ~f;
                }
                ge(u), !(L & 6) && (bu = Lt() + 500, Sn(0));
              }
            }
            break;
          case 31:
          case 13:
            c = Ul(u, 2), c !== null && Gt(c, u, 2), Ju(), Os(u, 2);
        }
        if (u = Mc(a), u === null && Ui(t, e, a, Mu, l), u === n) break;
        n = u;
      }
      n !== null && a.stopPropagation();
    } else Ui(t, e, a, null, l);
  }
}
function Mc(t) {
  return t = Vc(t), Us(t);
}
var Mu = null;
function Us(t) {
  if (Mu = null, t = Xl(t), t !== null) {
    var e = dn(t);
    if (e === null) t = null;
    else {
      var l = e.tag;
      if (l === 13) {
        if (t = Eo(e), t !== null) return t;
        t = null;
      } else if (l === 31) {
        if (t = Do(e), t !== null) return t;
        t = null;
      } else if (l === 3) {
        if (e.stateNode.current.memoizedState.isDehydrated) return e.tag === 3 ? e.stateNode.containerInfo : null;
        t = null;
      } else e !== t && (t = null);
    }
  }
  return Mu = t, null;
}
function s0(t) {
  switch (t) {
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
      switch (V0()) {
        case Uo:
          return 2;
        case Co:
          return 8;
        case iu:
        case K0:
          return 32;
        case Ho:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var Uc = false, ul = null, il = null, cl = null, on = /* @__PURE__ */ new Map(), rn = /* @__PURE__ */ new Map(), Ke = [], iy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
function uo(t, e) {
  switch (t) {
    case "focusin":
    case "focusout":
      ul = null;
      break;
    case "dragenter":
    case "dragleave":
      il = null;
      break;
    case "mouseover":
    case "mouseout":
      cl = null;
      break;
    case "pointerover":
    case "pointerout":
      on.delete(e.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      rn.delete(e.pointerId);
  }
}
function Oa(t, e, l, a, n, u) {
  return t === null || t.nativeEvent !== u ? (t = { blockedOn: e, domEventName: l, eventSystemFlags: a, nativeEvent: u, targetContainers: [n] }, e !== null && (e = xa(e), e !== null && c0(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), t);
}
function cy(t, e, l, a, n) {
  switch (e) {
    case "focusin":
      return ul = Oa(ul, t, e, l, a, n), true;
    case "dragenter":
      return il = Oa(il, t, e, l, a, n), true;
    case "mouseover":
      return cl = Oa(cl, t, e, l, a, n), true;
    case "pointerover":
      var u = n.pointerId;
      return on.set(u, Oa(on.get(u) || null, t, e, l, a, n)), true;
    case "gotpointercapture":
      return u = n.pointerId, rn.set(u, Oa(rn.get(u) || null, t, e, l, a, n)), true;
  }
  return false;
}
function f0(t) {
  var e = Xl(t.target);
  if (e !== null) {
    var l = dn(e);
    if (l !== null) {
      if (e = l.tag, e === 13) {
        if (e = Eo(l), e !== null) {
          t.blockedOn = e, Xs(t.priority, function() {
            no(l);
          });
          return;
        }
      } else if (e === 31) {
        if (e = Do(l), e !== null) {
          t.blockedOn = e, Xs(t.priority, function() {
            no(l);
          });
          return;
        }
      } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
        t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
        return;
      }
    }
  }
  t.blockedOn = null;
}
function lu(t) {
  if (t.blockedOn !== null) return false;
  for (var e = t.targetContainers; 0 < e.length; ) {
    var l = Mc(t.nativeEvent);
    if (l === null) {
      l = t.nativeEvent;
      var a = new l.constructor(l.type, l);
      Wi = a, l.target.dispatchEvent(a), Wi = null;
    } else return e = xa(l), e !== null && c0(e), t.blockedOn = l, false;
    e.shift();
  }
  return true;
}
function io(t, e, l) {
  lu(t) && l.delete(e);
}
function sy() {
  Uc = false, ul !== null && lu(ul) && (ul = null), il !== null && lu(il) && (il = null), cl !== null && lu(cl) && (cl = null), on.forEach(io), rn.forEach(io);
}
function Gn(t, e) {
  t.blockedOn === e && (t.blockedOn = null, Uc || (Uc = true, xt.unstable_scheduleCallback(xt.unstable_NormalPriority, sy)));
}
var wn = null;
function co(t) {
  wn !== t && (wn = t, xt.unstable_scheduleCallback(xt.unstable_NormalPriority, function() {
    wn === t && (wn = null);
    for (var e = 0; e < t.length; e += 3) {
      var l = t[e], a = t[e + 1], n = t[e + 2];
      if (typeof a != "function") {
        if (Us(a || l) === null) continue;
        break;
      }
      var u = xa(l);
      u !== null && (t.splice(e, 3), e -= 3, dc(u, { pending: true, data: n, method: l.method, action: a }, a, n));
    }
  }));
}
function ya(t) {
  function e(f) {
    return Gn(f, t);
  }
  ul !== null && Gn(ul, t), il !== null && Gn(il, t), cl !== null && Gn(cl, t), on.forEach(e), rn.forEach(e);
  for (var l = 0; l < Ke.length; l++) {
    var a = Ke[l];
    a.blockedOn === t && (a.blockedOn = null);
  }
  for (; 0 < Ke.length && (l = Ke[0], l.blockedOn === null); ) f0(l), l.blockedOn === null && Ke.shift();
  if (l = (t.ownerDocument || t).$$reactFormReplay, l != null) for (a = 0; a < l.length; a += 3) {
    var n = l[a], u = l[a + 1], i = n[wt] || null;
    if (typeof u == "function") i || co(l);
    else if (i) {
      var c = null;
      if (u && u.hasAttribute("formAction")) {
        if (n = u, i = u[wt] || null) c = i.formAction;
        else if (Us(n) !== null) continue;
      } else c = i.action;
      typeof c == "function" ? l[a + 1] = c : (l.splice(a, 3), a -= 3), co(l);
    }
  }
}
function o0() {
  function t(u) {
    u.canIntercept && u.info === "react-transition" && u.intercept({ handler: function() {
      return new Promise(function(i) {
        return n = i;
      });
    }, focusReset: "manual", scroll: "manual" });
  }
  function e() {
    n !== null && (n(), n = null), a || setTimeout(l, 20);
  }
  function l() {
    if (!a && !navigation.transition) {
      var u = navigation.currentEntry;
      u && u.url != null && navigation.navigate(u.url, { state: u.getState(), info: "react-transition", history: "replace" });
    }
  }
  if (typeof navigation == "object") {
    var a = false, n = null;
    return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(l, 100), function() {
      a = true, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), n !== null && (n(), n = null);
    };
  }
}
function Cs(t) {
  this._internalRoot = t;
}
Wu.prototype.render = Cs.prototype.render = function(t) {
  var e = this._internalRoot;
  if (e === null) throw Error(p(409));
  var l = e.current, a = Jt();
  i0(l, a, t, e, null, null);
};
Wu.prototype.unmount = Cs.prototype.unmount = function() {
  var t = this._internalRoot;
  if (t !== null) {
    this._internalRoot = null;
    var e = t.containerInfo;
    i0(t.current, 2, null, t, null, null), Ju(), e[va] = null;
  }
};
function Wu(t) {
  this._internalRoot = t;
}
Wu.prototype.unstable_scheduleHydration = function(t) {
  if (t) {
    var e = Yo();
    t = { blockedOn: null, target: t, priority: e };
    for (var l = 0; l < Ke.length && e !== 0 && e < Ke[l].priority; l++) ;
    Ke.splice(l, 0, t), l === 0 && f0(t);
  }
};
var so = To.version;
if (so !== "19.2.3") throw Error(p(527, so, "19.2.3"));
V.findDOMNode = function(t) {
  var e = t._reactInternals;
  if (e === void 0) throw typeof t.render == "function" ? Error(p(188)) : (t = Object.keys(t).join(","), Error(p(268, t)));
  return t = w0(e), t = t !== null ? _o(t) : null, t = t === null ? null : t.stateNode, t;
};
var fy = { bundleType: 0, version: "19.2.3", rendererPackageName: "react-dom", currentDispatcherRef: B, reconcilerVersion: "19.2.3" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Yn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Yn.isDisabled && Yn.supportsFiber) try {
    mn = Yn.inject(fy), Vt = Yn;
  } catch {
  }
}
Cu.createRoot = function(t, e) {
  if (!Ao(t)) throw Error(p(299));
  var l = false, a = "", n = ed, u = ld, i = ad;
  return e != null && (e.unstable_strictMode === true && (l = true), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError)), e = n0(t, 1, false, null, null, l, a, null, n, u, i, o0), t[va] = e.current, Es(t), new Cs(e);
};
Cu.hydrateRoot = function(t, e, l) {
  if (!Ao(t)) throw Error(p(299));
  var a = false, n = "", u = ed, i = ld, c = ad, f = null;
  return l != null && (l.unstable_strictMode === true && (a = true), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (c = l.onRecoverableError), l.formState !== void 0 && (f = l.formState)), e = n0(t, 1, true, e, l ?? null, a, n, f, u, i, c, o0), e.context = u0(null), l = e.current, a = Jt(), a = Qc(a), n = el(a), n.callback = null, ll(l, n, a), l = a, e.current.lanes = l, yn(e, l), ge(e), t[va] = e.current, Es(t), new Wu(e);
};
Cu.version = "19.2.3";
function r0() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r0);
  } catch (t) {
    console.error(t);
  }
}
r0(), ro.exports = Cu;
var oy = ro.exports;
function ry({ activeFilter: t, onFilterSelect: e, projects: l, contexts: a, tags: n = [], isOpen: u, onClose: i, onSyncClick: c, onPullClick: f, isSyncing: h, isAuthenticated: v, onDropboxSync: g, onDropboxPull: d, isDropboxAuth: y, isDropboxSyncing: j, onGTasksSync: z, onPageNavigate: O }) {
  const [r, o] = H.useState(true), [m, x] = H.useState(true), [N, _] = H.useState(true), [b, A] = H.useState(true), [D, S] = H.useState(true), Y = (C, W) => t.type === C && (W === void 0 || t.value === W), E = (C) => `flex items-center gap-2 px-2 py-1.5 rounded text-sm font-medium w-full text-left transition-colors ${C ? "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"}`;
  return s.jsxs(s.Fragment, { children: [u && s.jsx("div", { className: "fixed inset-0 bg-black/50 z-40", onClick: i }), s.jsxs("aside", { className: `
            w-[305px] bg-zinc-900 flex flex-col border-l border-zinc-800 pt-8 pl-8 pr-4 shrink-0 overflow-y-auto
            fixed inset-y-0 right-0 z-50 transition-transform duration-300 ease-in-out
            ${u ? "translate-x-0 shadow-xl" : "translate-x-full"}
            bg-zinc-900 text-zinc-300
        `, children: [s.jsx("div", { className: "mb-8 px-2", children: s.jsx("img", { src: "/icons/logo.svg", alt: "todo.txt", className: "h-8" }) }), s.jsxs("nav", { className: "space-y-1 mb-8", children: [s.jsxs("button", { onClick: () => {
    e({ type: "inbox" }), i && i();
  }, className: E(t.type === "inbox"), children: [s.jsx("span", { className: "text-blue-500 text-lg leading-none", children: "\u{1F4E5}" }), " Inbox"] }), s.jsxs("button", { onClick: () => {
    e({ type: "today" }), i && i();
  }, className: E(t.type === "today"), children: [s.jsx("span", { className: "text-green-500 text-lg leading-none", children: "\u{1F4C5}" }), " Today"] }), s.jsxs("button", { onClick: () => {
    e({ type: "upcoming" }), i && i();
  }, className: E(t.type === "upcoming"), children: [s.jsx("span", { className: "text-purple-500 text-lg leading-none", children: "\u{1F5D3}" }), " Upcoming"] }), s.jsxs("button", { onClick: () => {
    e({ type: "overdue" }), i && i();
  }, className: E(t.type === "overdue"), children: [s.jsx("span", { className: "text-red-500 text-lg leading-none", children: "\u26A0\uFE0F" }), " Overdue"] })] }), s.jsxs("div", { onClick: () => A(!b), className: "flex items-center justify-between px-2 py-1 mt-4 text-gray-500 hover:text-gray-700 cursor-pointer text-xs font-bold uppercase tracking-wider", children: [s.jsx("span", { children: "Views" }), s.jsx("span", { children: b ? "\u25BC" : "\u25B6" })] }), b && s.jsxs("div", { className: "mt-1 space-y-0.5", children: [s.jsxs("div", { onClick: () => e({ type: "view", value: "all" }), className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${Y("view", "all") ? "bg-orange-100 text-orange-800" : "text-gray-700 hover:bg-gray-100"}`, children: [s.jsx("span", { children: "\u{1F4D1}" }), " All"] }), s.jsxs("div", { onClick: () => e({ type: "view", value: "open" }), className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${Y("view", "open") ? "bg-emerald-100 text-emerald-800" : "text-gray-700 hover:bg-gray-100"}`, children: [s.jsx("span", { children: "\u26A1" }), " Open"] }), s.jsxs("div", { onClick: () => e({ type: "view", value: "done" }), className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${Y("view", "done") ? "bg-gray-200 text-gray-800" : "text-gray-700 hover:bg-gray-100"}`, children: [s.jsx("span", { children: "\u2705" }), " Done"] })] }), s.jsxs("div", { onClick: () => S(!D), className: "flex items-center justify-between px-2 py-1 mt-4 text-gray-500 hover:text-gray-700 cursor-pointer text-xs font-bold uppercase tracking-wider", children: [s.jsx("span", { children: "Filters" }), s.jsx("span", { children: D ? "\u25BC" : "\u25B6" })] }), D && s.jsxs("div", { className: "mt-1 space-y-0.5", children: [s.jsxs("div", { onClick: () => e({ type: "filter", value: "no-due" }), className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${Y("filter", "no-due") ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-gray-100"}`, children: [s.jsx("span", { children: "\u{1F6AB}" }), " No Due Date"] }), s.jsxs("div", { onClick: () => e({ type: "filter", value: "no-project" }), className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${Y("filter", "no-project") ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-gray-100"}`, children: [s.jsx("span", { children: "\u{1F4C2}" }), " No Project"] })] }), s.jsxs("div", { className: "mb-6", children: [s.jsxs("h3", { className: "flex items-center justify-between text-gray-500 font-bold text-xs px-2 mb-2 group cursor-pointer hover:text-gray-700", onClick: () => o(!r), children: [s.jsxs("span", { className: "flex items-center gap-1", children: [s.jsx("span", { className: `transition-transform duration-200 ${r ? "" : "-rotate-90"}`, children: "\u25BC" }), "Projects"] }), s.jsx("button", { className: "opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded p-0.5", onClick: (C) => C.stopPropagation(), children: "+" })] }), r && s.jsxs("div", { className: "space-y-0.5", children: [l.length === 0 && s.jsx("div", { className: "px-2 text-xs text-gray-400 italic", children: "No projects yet" }), l.map((C) => s.jsxs("button", { onClick: () => {
    e({ type: "project", value: C }), i && i();
  }, className: E(t.type === "project" && t.value === C), children: [s.jsx("span", { className: "text-gray-400 text-xs", children: "\u25CF" }), C] }, C))] })] }), s.jsxs("div", { className: "mb-6", children: [s.jsxs("h3", { className: "flex items-center justify-between text-gray-500 font-bold text-xs px-2 mb-2 group cursor-pointer hover:text-gray-700", onClick: () => x(!m), children: [s.jsxs("span", { className: "flex items-center gap-1", children: [s.jsx("span", { className: `transition-transform duration-200 ${m ? "" : "-rotate-90"}`, children: "\u25BC" }), "Contexts"] }), s.jsx("button", { className: "opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded p-0.5", onClick: (C) => C.stopPropagation(), children: "+" })] }), m && s.jsxs("div", { className: "space-y-0.5", children: [a.length === 0 && s.jsx("div", { className: "px-2 text-xs text-gray-400 italic", children: "No contexts yet" }), a.map((C) => s.jsxs("button", { onClick: () => {
    e({ type: "context", value: C }), i && i();
  }, className: E(t.type === "context" && t.value === C), children: [s.jsx("span", { className: "text-gray-400 text-lg leading-none", children: "@" }), C] }, C))] })] }), s.jsxs("div", { className: "mb-6", children: [s.jsxs("h3", { className: "flex items-center justify-between text-gray-500 font-bold text-xs px-2 mb-2 group cursor-pointer hover:text-gray-700", onClick: () => _(!N), children: [s.jsxs("span", { className: "flex items-center gap-1", children: [s.jsx("span", { className: `transition-transform duration-200 ${N ? "" : "-rotate-90"}`, children: "\u25BC" }), "Tags"] }), s.jsx("button", { className: "opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded p-0.5", onClick: (C) => C.stopPropagation(), children: "+" })] }), N && s.jsxs("div", { className: "space-y-0.5", children: [n.length === 0 && s.jsx("div", { className: "px-2 text-xs text-gray-400 italic", children: "No tags yet" }), n.map((C) => s.jsxs("button", { onClick: () => {
    e({ type: "tag", value: C }), i && i();
  }, className: E(t.type === "tag" && t.value === C), children: [s.jsx("span", { className: "text-gray-400 text-xs", children: "#" }), C] }, C))] })] }), s.jsx("div", { className: "mt-auto pt-6 border-t border-gray-100 dark:border-zinc-800", children: s.jsxs("div", { className: "flex flex-col space-y-2 px-2 pb-4", children: [s.jsx("a", { href: "/impressum.html", className: "text-sm text-left transition-colors text-gray-500 hover:text-gray-800 dark:hover:text-gray-300", children: "Impressum" }), s.jsx("a", { href: "/datenschutz.html", className: "text-sm text-left transition-colors text-gray-500 hover:text-gray-800 dark:hover:text-gray-300", children: "Datenschutz" })] }) }), s.jsx("button", { onClick: i, className: "absolute bottom-4 right-4 p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors", title: "Close sidebar", children: s.jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: s.jsx("path", { d: "M18 6L6 18M6 6l12 12" }) }) })] })] });
}
let Rt;
function dy(t) {
  const e = Rt.__externref_table_alloc();
  return Rt.__wbindgen_externrefs.set(e, t), e;
}
let Rl = null;
function my() {
  return (Rl === null || Rl.buffer.detached === true || Rl.buffer.detached === void 0 && Rl.buffer !== Rt.memory.buffer) && (Rl = new DataView(Rt.memory.buffer)), Rl;
}
let qn = null;
function Bi() {
  return (qn === null || qn.byteLength === 0) && (qn = new Uint8Array(Rt.memory.buffer)), qn;
}
function Ri(t, e) {
  const l = e(t.length * 4, 4) >>> 0;
  for (let a = 0; a < t.length; a++) {
    const n = dy(t[a]);
    my().setUint32(l + 4 * a, n, true);
  }
  return Ie = t.length, l;
}
function d0(t, e, l) {
  if (l === void 0) {
    const c = Wa.encode(t), f = e(c.length, 1) >>> 0;
    return Bi().subarray(f, f + c.length).set(c), Ie = c.length, f;
  }
  let a = t.length, n = e(a, 1) >>> 0;
  const u = Bi();
  let i = 0;
  for (; i < a; i++) {
    const c = t.charCodeAt(i);
    if (c > 127) break;
    u[n + i] = c;
  }
  if (i !== a) {
    i !== 0 && (t = t.slice(i)), n = l(n, a, a = i + t.length * 3, 1) >>> 0;
    const c = Bi().subarray(n + i, n + a), f = Wa.encodeInto(t, c);
    i += f.written, n = l(n, a, i, 1) >>> 0;
  }
  return Ie = i, n;
}
let hy = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
hy.decode();
const Wa = new TextEncoder();
"encodeInto" in Wa || (Wa.encodeInto = function(t, e) {
  const l = Wa.encode(t);
  return e.set(l), { read: t.length, written: l.length };
});
let Ie = 0;
function m0(t, e, l, a, n) {
  const u = d0(t, Rt.__wbindgen_malloc, Rt.__wbindgen_realloc), i = Ie, c = Ri(l, Rt.__wbindgen_malloc), f = Ie, h = Ri(a, Rt.__wbindgen_malloc), v = Ie, g = Ri(n, Rt.__wbindgen_malloc), d = Ie;
  return Rt.get_completions(u, i, e, c, f, h, v, g, d);
}
function Qn(t) {
  const e = d0(t, Rt.__wbindgen_malloc, Rt.__wbindgen_realloc), l = Ie;
  return Rt.parse_todo_line(e, l);
}
const pt = { tasks: [], listeners: [], undoStack: [], init() {
  this.loadFromPersistence();
}, subscribe(t) {
  return this.listeners.push(t), () => this.unsubscribe(t);
}, unsubscribe(t) {
  this.listeners = this.listeners.filter((e) => e !== t);
}, notify() {
  this.listeners.forEach((t) => t(this.tasks));
}, loadFromString(t) {
  const e = t.split(`
`);
  this.tasks = [], e.forEach((l) => {
    if (!l.trim()) return;
    const a = Qn(l);
    a && this.tasks.push(a);
  }), this.saveToPersistence(), this.notify();
}, loadFromLocalStorage() {
  try {
    const t = localStorage.getItem("todoTxtTasks");
    if (t) {
      const e = JSON.parse(t);
      Array.isArray(e) && (this.tasks = e), this.notify();
    }
  } catch (t) {
    console.error("Failed to load tasks:", t);
  }
}, saveToLocalStorage() {
  try {
    localStorage.setItem("todoTxtTasks", JSON.stringify(this.tasks));
  } catch (t) {
    console.error("Failed to save tasks:", t);
  }
}, loadFromPersistence() {
  this.loadFromLocalStorage();
}, saveToPersistence() {
  this.saveToLocalStorage();
}, saveUndoState() {
  this.undoStack.push(JSON.parse(JSON.stringify(this.tasks)));
}, undo() {
  this.undoStack.length !== 0 && (this.tasks = this.undoStack.pop(), this.saveToPersistence(), this.notify());
}, addTask(t) {
  const e = Qn(t);
  !e || !e.text.trim() || (this.saveUndoState(), this.tasks.push(e), this.saveToPersistence(), this.notify());
}, updateTask(t, e) {
  const l = this.tasks.findIndex((a) => a.id === t);
  if (l !== -1) {
    this.saveUndoState();
    const a = Qn(e);
    a.id = t, this.tasks[l].creationDate && !a.creationDate && (a.creationDate = this.tasks[l].creationDate), this.tasks[l] = a, this.saveToPersistence(), this.notify();
  }
}, deleteTask(t) {
  this.saveUndoState(), this.tasks = this.tasks.filter((e) => e.id !== t), this.saveToPersistence(), this.notify();
}, clearAllTasks() {
  this.saveUndoState(), this.tasks = [], this.saveToPersistence(), this.notify();
}, setTaskPriority(t, e) {
  const l = this.tasks.findIndex((i) => i.id === t);
  if (l === -1) return;
  const a = this.tasks[l];
  this.saveUndoState();
  let n = a.raw;
  n = n.replace(/^\([A-Z]\)\s/, ""), e && (n = `(${e}) ${n}`);
  const u = Qn(n);
  u && (u.id = t, a.creationDate && !u.creationDate && (u.creationDate = a.creationDate), a.completionDate && !u.completionDate && (u.completionDate = a.completionDate), u.completed = a.completed, this.tasks[l] = u, this.saveToPersistence(), this.notify());
}, toggleTask(t) {
  const e = this.tasks.find((n) => n.id === t);
  if (!e) return;
  this.saveUndoState(), e.completed = !e.completed;
  const l = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  let a = e.raw;
  a = a.replace(/^x\s\d{4}-\d{2}-\d{2}\s/, "").trim(), e.completed ? (e.completionDate = l, a = `x ${l} ${a}`) : e.completionDate = null, e.raw = a, this.saveToLocalStorage(), this.notify();
}, deleteTask(t) {
  this.saveUndoState(), this.tasks = this.tasks.filter((e) => e.id !== t), this.saveToLocalStorage(), this.notify();
}, getTasks() {
  return this.tasks;
} };
function yy({ task: t, selected: e, onSelect: l, selectionMode: a, isFocused: n, isEditingProp: u, onEditEnd: i, onFilterClick: c, projects: f, contexts: h, tags: v }) {
  const [g, d] = H.useState(false), [y, j] = H.useState([]), [z, O] = H.useState(false), [r, o] = H.useState(0), m = H.useRef(null);
  H.useEffect(() => {
    u && d(true);
  }, [u]);
  const x = (S) => {
    S.stopPropagation(), pt.toggleTask(t.id);
  }, N = (S) => {
    pt.updateTask(t.id, S), d(false), O(false), i && i();
  }, _ = async (S) => {
    const Y = S.target.value, E = S.target.selectionStart;
    o(E), S.target.style.height = "auto", S.target.style.height = S.target.scrollHeight + "px";
    const C = m0(Y, E, f || [], h || [], v || []);
    if (C && C.length > 0) {
      const W = C.map((gt) => ({ id: gt.id, name: gt.display, value: gt.value, type: gt.category }));
      j(W), O(true);
    } else O(false);
  }, b = (S) => {
    if (!m.current) return;
    const Y = m.current.value, E = r, gt = Y.substring(0, E).lastIndexOf(" ") + 1, R = Y.substring(E).indexOf(" "), M = R === -1 ? Y.length : E + R, K = Y.substring(0, gt), J = Y.substring(M);
    let jt = "";
    S.type === "date" ? jt = `due:${S.value}` : S.type === "project" ? jt = `+${S.value}` : S.type === "context" ? jt = `@${S.value}` : S.type === "tag" ? jt = `#${S.value}` : jt = S.value;
    const ve = K + jt + J;
    m.current.value = ve;
    const Ye = K.length + jt.length;
    pt.updateTask(t.id, ve), m.current.focus(), m.current.setSelectionRange(Ye, Ye), O(false);
  }, A = { A: "text-red-400", B: "text-amber-400", C: "text-sky-400" }[t.priority] || "text-gray-400", D = (S) => S.split(/(\+[a-zA-Z0-9äöüÄÖÜß._-]+|@[a-zA-Z0-9äöüÄÖÜß._-]+|#[a-zA-Z0-9äöüÄÖÜß._-]+|due:(?:\d{4}-\d{2}-\d{2}|\d{1,2}\.\d{1,2}\.\d{2,4})|tel:[+0-9]+|mail:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|contact:[a-zA-Z0-9äöüÄÖÜß._-]+)/g).map((E, C) => {
    if (E.startsWith("+")) return s.jsx("span", { onClick: (W) => {
      W.stopPropagation(), c && c("project", E.substring(1));
    }, className: "text-cyan-400 hover:underline cursor-pointer", children: E }, C);
    if (E.startsWith("@")) return s.jsx("span", { onClick: (W) => {
      W.stopPropagation(), c && c("context", E.substring(1));
    }, className: "text-emerald-400 hover:underline cursor-pointer", children: E }, C);
    if (E.startsWith("#")) return s.jsx("span", { onClick: (W) => {
      W.stopPropagation(), c && c("tag", E.substring(1));
    }, className: "text-purple-400 hover:underline cursor-pointer", children: E }, C);
    if (E.startsWith("due:")) {
      const W = E.substring(4);
      return s.jsx("span", { onClick: (gt) => {
        gt.stopPropagation(), c && c("date", W);
      }, className: "text-red-400 hover:underline cursor-pointer", children: E }, C);
    }
    if (E.startsWith("tel:")) return s.jsxs("a", { href: E, onClick: (W) => W.stopPropagation(), className: "text-lime-400 hover:underline inline-flex items-center gap-1", title: "Call", children: [s.jsx("span", { className: "opacity-50", children: "\u{1F4DE}" }), E.substring(4)] }, C);
    if (E.startsWith("mail:")) {
      const W = E.substring(5);
      return s.jsxs("a", { href: `mailto:${W}`, onClick: (gt) => gt.stopPropagation(), className: "text-orange-400 hover:underline inline-flex items-center gap-1", title: "Send Email", children: [s.jsx("span", { className: "opacity-50", children: "\u2709\uFE0F" }), W] }, C);
    }
    return E.startsWith("contact:") ? s.jsxs("span", { className: "text-indigo-400 font-medium inline-flex items-center gap-1", children: [s.jsx("span", { className: "opacity-50", children: "\u{1F464}" }), " ", E.substring(8).replace(/_/g, " ")] }, C) : E;
  });
  return g ? s.jsxs("div", { className: "py-2 -mx-4 px-4 bg-gray-50 dark:bg-zinc-800 border-b border-gray-100 dark:border-zinc-700 relative", children: [s.jsxs("div", { className: "relative w-full", children: [s.jsx("textarea", { ref: m, defaultValue: t.raw, autoFocus: true, className: "w-full bg-transparent text-sm text-gray-800 dark:text-gray-200 outline-none placeholder-gray-400 resize-none overflow-hidden pr-8", rows: 1, onFocus: (S) => {
    S.target.style.height = "auto", S.target.style.height = S.target.scrollHeight + "px";
    const Y = S.target.value;
    S.target.value = "", S.target.value = Y;
  }, onInput: _, onKeyDown: (S) => {
    S.key === "Enter" ? (S.preventDefault(), N(S.target.value)) : S.key === "Escape" && (d(false), i && i());
  }, onBlur: (S) => {
    setTimeout(() => {
      z || N(S.target.value);
    }, 200);
  } }), s.jsx("div", { className: "absolute right-0 top-1", children: s.jsxs("label", { className: "cursor-pointer text-zinc-500 hover:text-zinc-300 p-1", children: [s.jsx("input", { type: "date", className: "sr-only", onChange: (S) => {
    S.target.value && b({ type: "date", value: S.target.value });
  } }), "\u{1F4C5}"] }) })] }), z && y.length > 0 && s.jsxs("div", { className: "absolute left-4 top-full mt-1 w-64 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto", children: [s.jsx("div", { className: "px-3 py-2 text-xs font-semibold text-zinc-500 border-b border-zinc-800", children: "Suggestions" }), y.map((S, Y) => {
    let E = "\u26A1", C = "text-zinc-400 bg-zinc-500/20";
    return S.type === "date" ? (E = "\u{1F4C5}", C = "text-red-400 bg-red-500/20") : S.type === "project" ? (E = "+", C = "text-cyan-400 bg-cyan-500/20") : S.type === "context" ? (E = "@", C = "text-emerald-400 bg-emerald-500/20") : S.type === "tag" && (E = "#", C = "text-purple-400 bg-purple-500/20"), s.jsx("div", { className: "px-3 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-3 transition-colors", onMouseDown: (W) => {
      W.preventDefault(), b(S);
    }, children: s.jsxs("div", { className: "flex items-center gap-3 w-full", children: [s.jsx("div", { className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${C}`, children: E }), s.jsxs("div", { className: "flex-1", children: [s.jsx("div", { className: "text-sm text-zinc-200 font-medium capitalize", children: S.name }), S.type === "date" && s.jsx("div", { className: "text-xs text-zinc-500", children: S.value })] })] }) }, S.id || Y);
  })] })] }) : s.jsxs("div", { className: `group flex items-center py-1 -mx-4 px-4 transition-colors cursor-pointer
                hover:bg-zinc-900 
                ${e ? "bg-blue-900/20" : ""} 
                ${n ? "bg-zinc-800 ring-1 ring-zinc-700" : ""}`, "data-id": t.id, onClick: () => d(true), children: [s.jsx("div", { className: "mr-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity", onClick: (S) => S.stopPropagation(), children: s.jsx("input", { type: "checkbox", checked: e || false, onChange: (S) => {
    l && l();
  }, className: "w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500 cursor-pointer" }) }), s.jsx("button", { onClick: x, className: `mr-3 w-5 h-5 rounded-full border border-zinc-500 hover:border-zinc-300 flex items-center justify-center text-transparent hover:text-zinc-500 transition-all ${t.completed ? "!bg-zinc-500 !border-zinc-500 text-white !text-white" : ""}`, children: t.completed ? "\u2713" : "" }), s.jsx("div", { className: "flex-1 min-w-0", children: s.jsxs("div", { className: `text-sm text-zinc-200 ${t.completed ? "line-through text-zinc-500" : ""}`, children: [t.priority && s.jsxs("span", { className: `text-xs font-bold mr-1 ${A}`, children: ["(", t.priority, ")"] }), D(t.text)] }) }), s.jsx("div", { className: "flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity", children: s.jsx("button", { onClick: (S) => {
    S.stopPropagation(), pt.deleteTask(t.id);
  }, className: "p-2 text-zinc-500 hover:text-red-500 transition-colors", title: "Delete task", children: "\u2715" }) })] });
}
const gy = "/assets/logo-sV1hvh_m.png";
function vy({ tasks: t, activeFilter: e, selectedTaskIds: l, onTaskSelect: a, focusedTaskId: n, editingTaskId: u, onEditEnd: i, onFilterClick: c, projects: f, contexts: h, tags: v }) {
  const [g, d] = H.useState("none"), y = () => {
    if (!e) return "Inbox";
    switch (e.type) {
      case "inbox":
        return "Inbox";
      case "today":
        return "Today";
      case "upcoming":
        return "Upcoming";
      case "project":
        return `${e.value}`;
      case "context":
        return `@${e.value}`;
      default:
        return "Inbox";
    }
  }, j = H.useMemo(() => {
    const z = [...t];
    switch (g) {
      case "priority":
        return z.sort((O, r) => O.priority && !r.priority ? -1 : !O.priority && r.priority ? 1 : O.priority && r.priority ? O.priority.localeCompare(r.priority) : 0);
      case "alpha":
        return z.sort((O, r) => O.text.toLowerCase().localeCompare(r.text.toLowerCase()));
      case "due":
        return z.sort((O, r) => {
          const o = O.due || "9999-99-99", m = r.due || "9999-99-99";
          return o.localeCompare(m);
        });
      default:
        return z;
    }
  }, [t, g]);
  return s.jsxs("div", { className: "pb-20", children: [s.jsxs("header", { className: "mb-6 flex items-start justify-between", children: [s.jsxs("div", { children: [s.jsx("h1", { className: "text-xl font-bold text-gray-800 dark:text-zinc-100", children: y() }), s.jsx("div", { className: "text-xs text-gray-500 mt-1", children: (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, { weekday: "short", day: "numeric", month: "short" }) })] }), t.length > 0 && s.jsxs("div", { className: "flex items-center gap-2", children: [s.jsx("label", { className: "text-xs text-zinc-500 font-medium", children: "Sort:" }), s.jsxs("select", { value: g, onChange: (z) => d(z.target.value), className: "bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs rounded px-2 py-1 outline-none focus:border-blue-500 cursor-pointer", children: [s.jsx("option", { value: "none", children: "Default" }), s.jsx("option", { value: "priority", children: "Priority" }), s.jsx("option", { value: "due", children: "Due Date" }), s.jsx("option", { value: "alpha", children: "A-Z" })] })] })] }), s.jsx("div", { className: "mb-4", children: j.map((z) => s.jsx(yy, { task: z, selected: l == null ? void 0 : l.has(z.id), onSelect: () => a && a(z.id), selectionMode: l && l.size > 0, isFocused: n === z.id, isEditingProp: u === z.id, onEditEnd: i, onFilterClick: c, projects: f, contexts: h, tags: v }, z.id)) }), t.length === 0 && s.jsxs("div", { className: "py-8", children: [s.jsxs("div", { className: "flex items-center gap-3 mb-12", children: [s.jsx("img", { src: gy, alt: "todotext.de", className: "w-10 h-10" }), s.jsx("h2", { className: "text-xl font-semibold text-zinc-300", children: "todotext.de" }), s.jsx("span", { className: "text-[10px] text-zinc-600 font-mono mt-1 ml-2", children: "2025-12-30-17-28-57" })] }), s.jsxs("div", { className: "space-y-12 max-w-xl", children: [s.jsxs("div", { className: "space-y-5", children: [s.jsxs("h3", { className: "text-zinc-500 font-medium text-xs uppercase tracking-wider flex items-center gap-2", children: [s.jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" }) }), "Syntax Guide"] }), s.jsxs("div", { className: "space-y-4 text-sm text-zinc-400", children: [s.jsxs("div", { children: [s.jsx("div", { className: "text-xs text-zinc-500 mb-1.5", children: "Projects & Contexts" }), s.jsxs("div", { className: "flex gap-2", children: [s.jsx("code", { className: "text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/50", children: "+project" }), s.jsx("code", { className: "text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/50", children: "@context" })] })] }), s.jsxs("div", { children: [s.jsx("div", { className: "text-xs text-zinc-500 mb-1.5", children: "Priorities" }), s.jsxs("div", { className: "flex gap-2", children: [s.jsx("code", { className: "text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/50", children: "(A)" }), s.jsx("code", { className: "text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/50", children: "(B)" }), s.jsx("code", { className: "text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/50", children: "(C)" }), s.jsx("span", { className: "text-zinc-500 text-xs self-center ml-1", children: "start of line" })] })] }), s.jsxs("div", { children: [s.jsx("div", { className: "text-xs text-zinc-500 mb-1.5", children: "Key:Value Tags" }), s.jsxs("div", { className: "flex flex-wrap gap-2", children: [s.jsx("code", { className: "text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/50", children: "due:2025-12-31" }), s.jsx("code", { className: "text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/50", children: "rec:1w" })] })] })] })] }), s.jsxs("div", { className: "space-y-5", children: [s.jsxs("h3", { className: "text-zinc-500 font-medium text-xs uppercase tracking-wider flex items-center gap-2", children: [s.jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" }) }), "Keyboard Shortcuts"] }), s.jsxs("div", { className: "grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm text-zinc-400 items-baseline", children: [s.jsx("span", { className: "justify-self-start", children: s.jsx("kbd", { className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]", children: "/" }) }), s.jsx("span", { children: "Focus search / New Task" }), s.jsxs("span", { className: "justify-self-start text-nowrap", children: [s.jsx("kbd", { className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]", children: "\u2191" }), " ", s.jsx("span", { className: "text-zinc-600 text-[10px] px-0.5", children: "/" }), " ", s.jsx("kbd", { className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]", children: "\u2193" })] }), s.jsx("span", { children: "Navigate tasks" }), s.jsxs("span", { className: "justify-self-start text-nowrap", children: [s.jsx("kbd", { className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]", children: "\u2190" }), " ", s.jsx("span", { className: "text-zinc-600 text-[10px] px-0.5", children: "/" }), " ", s.jsx("kbd", { className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]", children: "\u2192" })] }), s.jsx("span", { children: "Change priority" }), s.jsx("span", { className: "justify-self-start text-nowrap", children: s.jsx("kbd", { className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]", children: "x" }) }), s.jsx("span", { children: "Complete task" }), s.jsx("span", { className: "justify-self-start text-nowrap", children: s.jsx("kbd", { className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]", children: "e" }) }), s.jsx("span", { children: "Edit task" }), s.jsxs("span", { className: "justify-self-start text-nowrap", children: [s.jsx("kbd", { className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]", children: "\u2318" }), " ", s.jsx("span", { className: "text-zinc-600 text-[10px] px-0.5", children: "+" }), " ", s.jsx("kbd", { className: "bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]", children: "z" })] }), s.jsx("span", { children: "Undo action" })] })] }), s.jsx("div", { className: "pt-8 border-t border-zinc-800/50", children: s.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs text-zinc-500", children: [s.jsxs("span", { className: "flex items-center gap-2", children: [s.jsx("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" }) }), " Google Drive & Dropbox Sync"] }), s.jsxs("span", { className: "flex items-center gap-2", children: [s.jsx("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: s.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" }) }), " Offline-first"] })] }) })] })] })] });
}
function xy({ selectedCount: t, onDeselectAll: e, onCompleteAll: l, onDeleteAll: a }) {
  return t === 0 ? null : s.jsxs("div", { className: "fixed bottom-0 left-0 right-0 md:left-[305px] bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700 p-4 flex items-center justify-between shadow-lg z-30 transition-all transform translate-y-0", children: [s.jsxs("div", { className: "flex items-center gap-4", children: [s.jsxs("span", { className: "font-semibold text-sm text-gray-700 dark:text-gray-300", children: [t, " selected"] }), s.jsx("button", { onClick: e, className: "text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200", children: "Cancel" })] }), s.jsxs("div", { className: "flex items-center gap-2", children: [s.jsx("button", { onClick: l, className: "px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-md text-sm font-medium transition-colors", children: "Complete" }), s.jsx("button", { onClick: a, className: "px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm font-medium transition-colors", children: "Delete" })] })] });
}
function py({ searchValue: t, onSearch: e, onQuickAdd: l, onMenuClick: a, onSettingsClick: n, focusTrigger: u, activeFilter: i, onClearFilter: c, projects: f, contexts: h, tags: v }) {
  const g = H.useRef(null), [d, y] = H.useState([]), [j, z] = H.useState(false), [O, r] = H.useState(0), [o, m] = H.useState(false);
  H.useEffect(() => {
    u > 0 && g.current && (g.current.focus(), g.current.setSelectionRange(0, 0));
  }, [u]);
  const x = async (b) => {
    const A = b.target.value, D = b.target.selectionStart;
    r(D), e(A);
    const S = m0(A, D, f || [], h || [], v || []);
    if (S && S.length > 0) {
      const Y = S.map((E) => ({ id: E.id, name: E.display, value: E.value, type: E.category }));
      y(Y), z(true);
    } else z(false);
  }, N = (b) => {
    if (!g.current) return;
    const A = g.current.value, D = O, E = A.substring(0, D).lastIndexOf(" ") + 1, W = A.substring(D).indexOf(" "), gt = W === -1 ? A.length : D + W, T = A.substring(0, E), R = A.substring(gt);
    let M = "";
    b.type === "date" ? M = `due:${b.value}` : b.type === "project" ? M = `+${b.value}` : b.type === "context" ? M = `@${b.value}` : b.type === "tag" ? M = `#${b.value}` : M = b.value;
    const K = T + M + R, J = T.length + M.length;
    e(K), setTimeout(() => {
      g.current && (g.current.focus(), g.current.setSelectionRange(J, J));
    }, 10), z(false), m(false);
  };
  let _ = null;
  return i && (i.type === "project" ? _ = { text: `+${i.value}`, className: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20" } : i.type === "context" ? _ = { text: `@${i.value}`, className: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" } : i.type === "tag" ? _ = { text: `#${i.value}`, className: "text-purple-400 bg-purple-400/10 border-purple-400/20" } : i.type === "today" ? _ = { text: "\u{1F4C5} Today", className: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" } : i.type === "upcoming" ? _ = { text: "\u{1F5D3} Upcoming", className: "text-purple-400 bg-purple-400/10 border-purple-400/20" } : i.type === "overdue" && (_ = { text: "\u26A0\uFE0F Overdue", className: "text-red-400 bg-red-400/10 border-red-400/20" })), s.jsxs("div", { className: "fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800 z-40 flex items-center gap-3", children: [s.jsxs("div", { className: "relative flex-1 group", children: [j && d.length > 0 && s.jsxs("div", { className: "absolute bottom-full left-0 mb-2 w-full sm:w-80 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto", children: [s.jsxs("div", { className: "px-3 py-2 text-xs font-semibold text-zinc-500 border-b border-zinc-800 flex justify-between", children: [s.jsx("span", { children: "Suggestions" }), s.jsx("span", { className: "text-[10px] bg-zinc-800 px-1 rounded", children: "TAB to select" })] }), d.map((b) => {
    let A = "\u26A1", D = "text-zinc-400 bg-zinc-500/20";
    return b.type === "date" ? (A = "\u{1F4C5}", D = "text-red-400 bg-red-500/20") : b.type === "project" ? (A = "+", D = "text-cyan-400 bg-cyan-500/20") : b.type === "context" ? (A = "@", D = "text-emerald-400 bg-emerald-500/20") : b.type === "tag" && (A = "#", D = "text-purple-400 bg-purple-500/20"), s.jsx("div", { className: "px-3 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-3 transition-colors", onMouseDown: (S) => {
      S.preventDefault(), N(b);
    }, children: s.jsxs("div", { className: "flex items-center gap-3 w-full", children: [s.jsx("div", { className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${D}`, children: A }), s.jsxs("div", { className: "flex-1", children: [s.jsx("div", { className: "text-sm text-zinc-200 font-medium capitalize", children: b.name }), b.type === "date" && s.jsx("div", { className: "text-xs text-zinc-500", children: b.value })] })] }) }, b.id);
  })] }), s.jsx("div", { className: "absolute inset-0 bg-zinc-800 rounded-xl transition-colors group-focus-within:bg-zinc-700 border border-zinc-700 shadow-sm group-focus-within:ring-1 group-focus-within:ring-zinc-600" }), s.jsxs("div", { className: "relative flex items-center w-full px-3 py-1.5 h-[46px]", children: [s.jsx("input", { ref: g, type: "text", placeholder: _ ? "Add a new task..." : "Search, filter or add a new task ...", className: "bg-transparent text-zinc-100 placeholder-zinc-500 text-sm outline-none flex-1 min-w-0 font-medium h-full", value: t, onChange: x, onKeyDown: (b) => {
    b.key === "Enter" && (j && d.length > 0, l(t), z(false)), b.key === "Tab" && j && d.length > 0 && (b.preventDefault(), N(d[0]));
  }, onBlur: () => {
    setTimeout(() => z(false), 200);
  } }), _ && s.jsxs("button", { onClick: c, className: `flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono border ml-2 whitespace-nowrap select-none hover:opacity-80 transition-opacity ${_.className}`, title: "Clear filter", children: [_.text, s.jsx("span", { className: "ml-1 opacity-60 hover:opacity-100", children: "\xD7" })] }), s.jsx("button", { onClick: () => m(!o), className: `p-1.5 ml-1 shrink-0 rounded transition-colors ${o ? "text-red-400 bg-red-400/10" : "text-zinc-500 hover:text-zinc-300"}`, title: "Pick due date", children: "\u{1F4C5}" }), t && s.jsxs(s.Fragment, { children: [s.jsx("button", { onClick: () => e(""), className: "p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors ml-1 shrink-0", title: "Clear search", children: s.jsx("span", { className: "text-lg", children: "\xD7" }) }), s.jsx("button", { onClick: () => l(t), className: "p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors ml-1 shrink-0", children: s.jsx("span", { className: "text-xs font-bold", children: "\u21B5" }) })] })] })] }), s.jsxs("div", { className: "flex gap-2 shrink-0", children: [s.jsx("button", { className: "p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 rounded-xl transition-colors", onClick: n, title: "Settings", children: s.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", className: "fill-current", children: s.jsx("path", { d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.09 8.87a.49.49 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6 3.6z" }) }) }), s.jsx("button", { className: "p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 rounded-xl transition-colors", onClick: a, children: s.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", className: "fill-current", children: s.jsx("path", { d: "M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" }) }) })] })] });
}
const by = "533958879265-u2sipqoup3j5fobgfkq1f37r5g8eo7lj.apps.googleusercontent.com", Sy = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/tasks";
function zy(t) {
  const [e, l] = H.useState(false), [a, n] = H.useState(false), [u, i] = H.useState(null);
  H.useEffect(() => {
    (() => {
      if (window.gapi) c();
      else {
        const o = document.createElement("script");
        o.src = "https://apis.google.com/js/api.js", o.onload = () => c(), document.body.appendChild(o);
      }
      if (window.google) f();
      else {
        const o = document.createElement("script");
        o.src = "https://accounts.google.com/gsi/client", o.onload = () => f(), document.body.appendChild(o);
      }
    })();
  }, []);
  const c = () => {
    window.gapi.load("client", async () => {
      await window.gapi.client.init({ discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest", "https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"] });
    });
  }, f = () => {
    const r = window.google.accounts.oauth2.initTokenClient({ client_id: by, scope: Sy, callback: (o) => {
      if (o.error !== void 0) throw o;
      l(true);
    } });
    i(r);
  }, h = () => {
    u && u.requestAccessToken({ prompt: "consent" });
  }, v = async (r) => {
    try {
      const o = await window.gapi.client.drive.files.list({ q: `name='${r}' and mimeType='application/vnd.google-apps.folder' and trashed=false`, fields: "files(id, name)", spaces: "drive" });
      if (o.result.files && o.result.files.length > 0) return console.log(`\u2705 Found existing folder: ${r}`), o.result.files[0].id;
      const m = await window.gapi.client.drive.files.create({ resource: { name: r, mimeType: "application/vnd.google-apps.folder" }, fields: "id" });
      return console.log(`\u2705 Created new folder: ${r}`), m.result.id;
    } catch (o) {
      throw console.error("\u274C Folder creation failed", o), o;
    }
  }, g = async (r, o) => {
    try {
      const m = await window.gapi.client.drive.files.list({ q: `name='${r}' and '${o}' in parents and trashed=false`, fields: "files(id, name)", spaces: "drive" });
      if (m.result.files && m.result.files.length > 0) return console.log(`\u2705 Found existing file: ${r}`), m.result.files[0].id;
      const x = await window.gapi.client.drive.files.create({ resource: { name: r, parents: [o], mimeType: "text/plain" }, fields: "id" });
      return console.log(`\u2705 Created new file: ${r}`), x.result.id;
    } catch (m) {
      throw console.error("\u274C File creation failed", m), m;
    }
  }, d = async (r) => {
    if (!e) {
      h();
      return;
    }
    n(true);
    try {
      const o = await v("todotext.de"), m = await g("todo.txt", o), x = r.map((N) => N.raw).join(`
`);
      await y(m, x), console.log("\u2705 Pushed to Google Drive: /todotext.de/todo.txt");
    } catch (o) {
      console.error("\u274C Drive Push failed", o);
    } finally {
      n(false);
    }
  }, y = async (r, o) => {
    const m = `https://www.googleapis.com/upload/drive/v3/files/${r}?uploadType=media`, x = window.gapi.client.getToken().access_token;
    await fetch(m, { method: "PATCH", headers: { Authorization: `Bearer ${x}`, "Content-Type": "text/plain" }, body: o });
  };
  return { isAuthenticated: e, isSyncing: a, login: h, syncPushDrive: d, syncPullDrive: async () => {
    if (!e) {
      h();
      return;
    }
    n(true);
    try {
      const r = await v("todotext.de"), o = await g("todo.txt", r), m = await window.gapi.client.drive.files.get({ fileId: o, alt: "media" });
      t(m.body), console.log("\u2705 Pulled from Google Drive: /todotext.de/todo.txt");
    } catch (r) {
      console.error("\u274C Drive Pull failed", r);
    } finally {
      n(false);
    }
  }, syncPushTasks: async (r) => {
    if (!e) {
      h();
      return;
    }
    n(true);
    try {
      const m = (await window.gapi.client.tasks.tasklists.list()).result.items[0];
      for (const x of r) x.completed || await window.gapi.client.tasks.tasks.insert({ tasklist: m.id, resource: { title: x.text, notes: x.raw } });
      console.log("Pushed tasks to Google Tasks");
    } catch (o) {
      console.error("GTasks Push failed", o);
    } finally {
      n(false);
    }
  }, syncPullTasks: async () => {
    if (!e) {
      h();
      return;
    }
    n(true);
    try {
      const o = (await window.gapi.client.tasks.tasklists.list()).result.items[0], _ = ((await window.gapi.client.tasks.tasks.list({ tasklist: o.id, showCompleted: true, showHidden: true })).result.items || []).map((b) => {
        const A = b.status === "completed" ? "x " : "", D = b.title || "", S = b.notes ? ` ${b.notes}` : "";
        return `${A}${D}${S}`;
      }).filter((b) => b.trim()).join(`
`);
      t(_), console.log("\u2705 Pulled tasks from Google Tasks");
    } catch (r) {
      console.error("\u274C GTasks Pull failed", r);
    } finally {
      n(false);
    }
  } };
}
const jy = "xdqurve95t2h4hb";
function Ny(t) {
  const [e, l] = H.useState(false), [a, n] = H.useState(null), [u, i] = H.useState(false);
  H.useEffect(() => {
    const v = window.location.hash;
    if (v.includes("access_token")) {
      const d = new URLSearchParams(v.substring(1)).get("access_token");
      d && (n(d), l(true), window.history.replaceState(null, null, window.location.pathname), sessionStorage.setItem("dropbox_token", d));
    } else {
      const g = sessionStorage.getItem("dropbox_token");
      g && (n(g), l(true));
    }
  }, []);
  const c = () => {
    const v = window.location.origin, g = `https://www.dropbox.com/oauth2/authorize?client_id=${jy}&response_type=token&redirect_uri=${v}`;
    window.location.href = g;
  };
  return { isAuthenticated: e, isSyncing: u, login: c, syncPush: async (v) => {
    if (!a) {
      c();
      return;
    }
    i(true);
    try {
      const g = v.map((y) => y.raw).join(`
`), d = new Blob([g], { type: "text/plain" });
      await fetch("https://content.dropboxapi.com/2/files/upload", { method: "POST", headers: { Authorization: `Bearer ${a}`, "Dropbox-API-Arg": JSON.stringify({ path: "/todo.txt", mode: "overwrite", autorename: true, mute: false }), "Content-Type": "application/octet-stream" }, body: d }), console.log("Dropbox push successful");
    } catch (g) {
      console.error("Dropbox push failed", g), g.status === 401 && (l(false), sessionStorage.removeItem("dropbox_token"));
    } finally {
      i(false);
    }
  }, syncPull: async () => {
    if (!a) {
      c();
      return;
    }
    i(true);
    try {
      const v = await fetch("https://content.dropboxapi.com/2/files/download", { method: "POST", headers: { Authorization: `Bearer ${a}`, "Dropbox-API-Arg": JSON.stringify({ path: "/todo.txt" }) } });
      let g = "";
      v.ok ? (g = await v.text(), console.log("\u2705 todo.txt loaded")) : console.warn("\u26A0\uFE0F todo.txt not found or error:", v.status);
      let d = "";
      try {
        const j = await fetch("https://content.dropboxapi.com/2/files/download", { method: "POST", headers: { Authorization: `Bearer ${a}`, "Dropbox-API-Arg": JSON.stringify({ path: "/done.txt" }) } });
        j.ok ? (d = await j.text(), console.log("\u2705 done.txt loaded")) : console.log("\u2139\uFE0F done.txt not found (optional)");
      } catch {
        console.log("\u2139\uFE0F done.txt not available (optional)");
      }
      const y = [g, d].filter((j) => j.trim()).join(`
`);
      y ? (t(y), console.log("\u2705 Dropbox pull successful (todo.txt + done.txt)")) : console.warn("\u26A0\uFE0F No tasks found in Dropbox files");
    } catch (v) {
      console.error("\u274C Dropbox pull failed", v);
    } finally {
      i(false);
    }
  } };
}
const Ty = ({ tasks: t, focusedTaskId: e, setFocusedTaskId: l, setSearchFocus: a, onTaskComplete: n, onTaskDelete: u, onTaskEdit: i, onTaskPriority: c, onUndo: f, clearFilters: h }) => {
  const [v, g] = H.useState(false);
  H.useEffect(() => {
    const d = (y) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        y.key === "Escape" && (document.activeElement.blur(), y.preventDefault());
        return;
      }
      if (y.key === "/") {
        y.preventDefault(), a();
        return;
      }
      if (y.key === "Escape") {
        if (y.preventDefault(), v) {
          g(false);
          return;
        }
        h && h(), l(null);
        return;
      }
      if ((y.ctrlKey || y.metaKey) && y.key === "z") {
        y.preventDefault(), f && f();
        return;
      }
      if (!t || t.length === 0) return;
      const z = t.findIndex((O) => O.id === e);
      if (v) {
        if (["a", "b", "c", "n"].includes(y.key.toLowerCase())) {
          if (y.preventDefault(), e) {
            const O = y.key.toLowerCase() === "n" ? null : y.key.toUpperCase();
            c(e, O);
          }
          g(false);
        } else g(false);
        return;
      }
      switch (y.key) {
        case "ArrowDown":
          y.preventDefault(), z < t.length - 1 ? l(t[z + 1].id) : z === -1 && l(t[0].id);
          break;
        case "ArrowUp":
          y.preventDefault(), z > 0 ? l(t[z - 1].id) : z === -1 && t.length > 0 && l(t[t.length - 1].id);
          break;
        case "x":
          e && (y.preventDefault(), n(e));
          break;
        case "e":
          e && (y.preventDefault(), i(e));
          break;
        case "Delete":
        case "Backspace":
          e && (y.preventDefault(), u(e));
          break;
        case "ArrowRight":
          e && (y.preventDefault(), c(e, "up"));
          break;
        case "ArrowLeft":
          e && (y.preventDefault(), c(e, "down"));
          break;
        case "p":
          e && (y.preventDefault(), g(true));
          break;
      }
    };
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, [t, e, l, a, n, u, i, c, f, h, v]);
}, Ay = (t, e) => {
  if (!e || !e.trim()) return t;
  const l = e.trim().split(/\s+/);
  return t.filter((a) => l.every((n) => {
    var _a2;
    const u = n.toLowerCase();
    if (u.startsWith("prio:")) {
      const i = (_a2 = u.split(":")[1]) == null ? void 0 : _a2.toUpperCase();
      return a.priority === i;
    }
    if (u.startsWith("+")) {
      const i = u.substring(1);
      return a.projects && a.projects.some((c) => c.toLowerCase().includes(i));
    }
    if (u.startsWith("@")) {
      const i = u.substring(1);
      return a.contexts && a.contexts.some((c) => c.toLowerCase().includes(i));
    }
    return u === "is:open" ? !a.completed : u === "is:done" ? a.completed : u === "is:no-due" ? !a.metadata || !a.metadata.due : a.raw.toLowerCase().includes(u);
  }));
};
function Ey({ isOpen: t, onClose: e, onSyncClick: l, onPullClick: a, isSyncing: n, isAuthenticated: u, onDropboxSync: i, onDropboxPull: c, isDropboxAuth: f, isDropboxSyncing: h, onGTasksSync: v, onGTasksPull: g, onClearAll: d }) {
  const [y, j] = H.useState(false), [z, O] = H.useState(false), [r, o] = H.useState(false);
  return s.jsxs(s.Fragment, { children: [t && s.jsx("div", { className: "fixed inset-0 bg-black/50 z-40", onClick: e }), s.jsxs("aside", { className: `
            w-[305px] bg-zinc-900 flex flex-col border-l border-zinc-800 pt-8 px-4 shrink-0 overflow-y-auto
            fixed inset-y-0 right-0 z-50 transition-transform duration-300 ease-in-out
            ${t ? "translate-x-0 shadow-xl" : "translate-x-full"}
            text-zinc-300
        `, children: [s.jsx("div", { className: "flex justify-between items-center mb-6 px-2", children: s.jsx("h2", { className: "text-lg font-bold text-gray-100", children: "Settings" }) }), s.jsxs("div", { className: "mb-4", children: [s.jsxs("button", { onClick: () => j(!y), className: "w-full flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2 py-2 hover:bg-zinc-800 rounded transition-colors", children: [s.jsx("span", { children: "Sync" }), s.jsx("span", { children: y ? "\u2212" : "+" })] }), y && s.jsxs("div", { className: "space-y-2 px-2 animate-in slide-in-from-top-2 duration-200", children: [s.jsxs("div", { className: "flex items-center justify-between p-2 rounded hover:bg-zinc-800/50 transition-colors", children: [s.jsx("span", { className: "text-sm text-gray-300", children: "Google Drive" }), s.jsxs("div", { className: "flex items-center gap-2", children: [s.jsx("button", { onClick: l, className: `p-1.5 rounded hover:bg-zinc-700 ${n ? "animate-pulse text-blue-500" : "text-gray-500"}`, title: u ? "Sync Drive" : "Login Google", children: u ? "\u2601\uFE0F" : "\u{1F511}" }), u && s.jsx("button", { onClick: a, className: `p-1.5 rounded hover:bg-zinc-700 ${n ? "animate-spin" : "text-gray-500"}`, title: "Pull from Drive", children: "\u{1F504}" })] })] }), u && s.jsxs("div", { className: "flex items-center justify-between p-2 rounded hover:bg-zinc-800/50 transition-colors", children: [s.jsx("span", { className: "text-sm text-gray-300", children: "Google Tasks" }), s.jsxs("div", { className: "flex items-center gap-2", children: [s.jsx("button", { onClick: v, className: `p-1.5 rounded hover:bg-zinc-700 ${n ? "animate-pulse text-blue-500" : "text-gray-500"}`, title: "Push to Google Tasks", children: "\u{1F4E6}" }), s.jsx("button", { onClick: g, className: `p-1.5 rounded hover:bg-zinc-700 ${n ? "animate-pulse text-blue-500" : "text-gray-500"}`, title: "Pull from Google Tasks", children: "\u{1F504}" })] })] }), s.jsxs("div", { className: "flex items-center justify-between p-2 rounded hover:bg-zinc-800/50 transition-colors", children: [s.jsx("span", { className: "text-sm text-gray-300", children: "Dropbox" }), s.jsxs("div", { className: "flex items-center gap-2", children: [s.jsx("button", { onClick: i, className: `p-1.5 rounded hover:bg-zinc-700 ${h ? "animate-pulse text-blue-500" : "text-gray-500"}`, title: f ? "Sync Dropbox" : "Login Dropbox", children: f ? "\u{1F4E6}" : "Login" }), f && s.jsx("button", { onClick: c, className: `p-1.5 rounded hover:bg-zinc-700 ${h ? "animate-spin" : "text-gray-500"}`, title: "Pull from Dropbox", children: "\u{1F504}" })] })] })] })] }), s.jsx("div", { className: "mb-4 p-3 rounded bg-zinc-800/30 border border-red-900/30", children: s.jsxs("button", { onClick: d, className: "w-full px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors flex items-center justify-center gap-2", children: [s.jsx("span", { children: "\u{1F5D1}\uFE0F" }), s.jsx("span", { children: "Clear All Tasks" })] }) }), s.jsxs("div", { className: "mb-4", children: [s.jsxs("button", { onClick: () => O(!z), className: "w-full flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2 py-2 hover:bg-zinc-800 rounded transition-colors", children: [s.jsx("span", { children: "Shortcuts" }), s.jsx("span", { children: z ? "\u2212" : "+" })] }), z && s.jsxs("div", { className: "space-y-1 px-2 text-sm animate-in slide-in-from-top-2 duration-200", children: [s.jsxs("div", { className: "flex justify-between items-center py-1", children: [s.jsx("span", { className: "text-gray-400", children: "Focus search" }), s.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "/" })] }), s.jsxs("div", { className: "flex justify-between items-center py-1", children: [s.jsx("span", { className: "text-gray-400", children: "Navigate" }), s.jsxs("div", { className: "flex gap-1", children: [s.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "\u2191" }), s.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "\u2193" })] })] }), s.jsxs("div", { className: "flex justify-between items-center py-1", children: [s.jsx("span", { className: "text-gray-400", children: "Priority" }), s.jsxs("div", { className: "flex gap-1", children: [s.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "\u2190" }), s.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "\u2192" })] })] }), s.jsxs("div", { className: "flex justify-between items-center py-1", children: [s.jsx("span", { className: "text-gray-400", children: "Edit" }), s.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "e" })] }), s.jsxs("div", { className: "flex justify-between items-center py-1", children: [s.jsx("span", { className: "text-gray-400", children: "Complete" }), s.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "x" })] }), s.jsxs("div", { className: "flex justify-between items-center py-1", children: [s.jsx("span", { className: "text-gray-400", children: "Delete" }), s.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "Del" })] }), s.jsxs("div", { className: "flex justify-between items-center py-1", children: [s.jsx("span", { className: "text-gray-400", children: "Clear" }), s.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "Esc" })] })] })] }), s.jsxs("div", { className: "mb-4", children: [s.jsxs("button", { onClick: () => o(!r), className: "w-full flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2 py-2 hover:bg-zinc-800 rounded transition-colors", children: [s.jsx("span", { children: "Search Syntax" }), s.jsx("span", { children: r ? "\u2212" : "+" })] }), r && s.jsxs("div", { className: "space-y-2 px-2 text-xs text-gray-400 animate-in slide-in-from-top-2 duration-200", children: [s.jsxs("div", { className: "flex gap-2", children: [s.jsx("code", { className: "text-blue-400 bg-blue-900/30 px-1 rounded", children: "prio:A" }), s.jsx("span", { children: "Priority" })] }), s.jsxs("div", { className: "flex gap-2", children: [s.jsx("code", { className: "text-purple-400 bg-purple-900/30 px-1 rounded", children: "+proj" }), s.jsx("span", { children: "Project" })] }), s.jsxs("div", { className: "flex gap-2", children: [s.jsx("code", { className: "text-green-400 bg-green-900/30 px-1 rounded", children: "@ctx" }), s.jsx("span", { children: "Context" })] }), s.jsxs("div", { className: "flex gap-2", children: [s.jsx("code", { className: "text-orange-400 bg-orange-900/30 px-1 rounded", children: "is:open" }), s.jsx("span", { children: "Status" })] })] })] }), s.jsx("button", { onClick: e, className: "absolute bottom-4 right-4 p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors", title: "Close settings", children: s.jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: s.jsx("path", { d: "M18 6L6 18M6 6l12 12" }) }) })] })] });
}
function Dy({ onBack: t }) {
  return s.jsxs("div", { className: "text-zinc-300 max-w-2xl mx-auto pb-20 p-4", children: [t && s.jsxs("button", { onClick: t, className: "mb-4 flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors", children: [s.jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: s.jsx("path", { d: "M19 12H5M5 12l7 7M5 12l7-7" }) }), "Back to App"] }), s.jsx("header", { className: "mb-8 border-b border-zinc-800 pb-4", children: s.jsx("h1", { className: "text-3xl font-bold text-zinc-100", children: "Impressum" }) }), s.jsxs("div", { className: "space-y-8 text-sm leading-relaxed", children: [s.jsxs("section", { children: [s.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "Angaben gem\xE4\xDF \xA7 5 TMG" }), s.jsxs("p", { className: "text-zinc-400", children: ["Alexander Mut", s.jsx("br", {}), "Falkenbergsweg 66", s.jsx("br", {}), "21149 Hamburg", s.jsx("br", {}), "Deutschland"] })] }), s.jsxs("section", { children: [s.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "Kontakt" }), s.jsxs("p", { className: "text-zinc-400", children: ["Telefon: +49 151 51 00 27 67", s.jsx("br", {}), "E-Mail: mutalex (at) gmail (punkt) com"] })] }), s.jsxs("section", { children: [s.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "Verantwortlich f\xFCr den Inhalt nach \xA7 18 Abs. 2 MStV" }), s.jsxs("p", { className: "text-zinc-400", children: ["Alexander Mut", s.jsx("br", {}), "Falkenbergsweg 66", s.jsx("br", {}), "21149 Hamburg"] })] }), s.jsxs("section", { children: [s.jsx("h3", { className: "text-lg font-semibold text-zinc-200 mb-2", children: "Haftungsausschluss" }), s.jsx("p", { className: "text-zinc-400", children: "Trotz sorgf\xE4ltiger inhaltlicher Kontrolle \xFCbernehmen wir keine Haftung f\xFCr die Inhalte externer Links. F\xFCr den Inhalt der verlinkten Seiten sind ausschlie\xDFlich deren Betreiber verantwortlich." })] })] })] });
}
function _y({ onBack: t }) {
  return s.jsxs("div", { className: "text-zinc-300 max-w-2xl mx-auto pb-20 p-4", children: [t && s.jsxs("button", { onClick: t, className: "mb-4 flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors", children: [s.jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: s.jsx("path", { d: "M19 12H5M5 12l7 7M5 12l7-7" }) }), "Back to App"] }), s.jsx("header", { className: "mb-8 border-b border-zinc-800 pb-4", children: s.jsx("h1", { className: "text-3xl font-bold text-zinc-100", children: "Datenschutzerkl\xE4rung" }) }), s.jsxs("div", { className: "space-y-8 text-sm leading-relaxed", children: [s.jsxs("section", { children: [s.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "1. Verantwortlicher" }), s.jsx("p", { className: "text-zinc-400 mb-2", children: "Verantwortlicher f\xFCr die Datenverarbeitung im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:" }), s.jsxs("p", { className: "text-zinc-400 mb-2", children: ["Alexander Mut", s.jsx("br", {}), "Falkenbergsweg 66", s.jsx("br", {}), "21149 Hamburg", s.jsx("br", {}), "E-Mail: mutalex (at) gmail (punkt) com"] }), s.jsx("p", { className: "text-zinc-500 italic", children: "(Weitere Angaben siehe Impressum)" })] }), s.jsxs("section", { children: [s.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "2. Geltungsbereich" }), s.jsx("p", { className: "text-zinc-400", children: 'Diese Datenschutzerkl\xE4rung kl\xE4rt Sie \xFCber die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten innerhalb dieser Webanwendung (im Folgenden "App"), die unter https://alexandermut.github.io/protodo/index.html und deren Unterseiten betrieben wird, auf.' })] }), s.jsxs("section", { children: [s.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "3. Datenverarbeitung im \xDCberblick" }), s.jsx("p", { className: "text-zinc-400 mb-4", children: 'Diese App ist als "Offline-First"-Anwendung konzipiert. Die Kernfunktionalit\xE4t erfordert keine \xDCbertragung Ihrer pers\xF6nlichen Daten an den Anbieter dieser App.' }), s.jsxs("ul", { className: "list-disc pl-5 space-y-2 text-zinc-400", children: [s.jsxs("li", { children: [s.jsx("strong", { className: "text-zinc-300", children: "Hosting (GitHub Pages):" }), " Beim Aufruf der App werden Daten (z.B. IP-Adresse) an den Hosting-Anbieter \xFCbertragen."] }), s.jsxs("li", { children: [s.jsx("strong", { className: "text-zinc-300", children: "Externe Skripte (Google):" }), " Um die Anmeldung zu erm\xF6glichen, l\xE4dt die App Skripte von Google-Servern, wodurch Ihre IP-Adresse an Google \xFCbermittelt werden kann."] }), s.jsxs("li", { children: [s.jsx("strong", { className: "text-zinc-300", children: "Lokale Speicherung (LocalStorage):" }), " Ihre Aufgaben werden prim\xE4r lokal in Ihrem Browser gespeichert."] }), s.jsxs("li", { children: [s.jsx("strong", { className: "text-zinc-300", children: "Synchronisierung (Google / Dropbox):" }), " Nur bei aktiver Nutzung werden Daten direkt zwischen Ihrem Browser und dem gew\xE4hlten Cloud-Anbieter \xFCbertragen."] })] })] }), s.jsxs("section", { children: [s.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "4. Datenverarbeitung im Detail" }), s.jsxs("div", { className: "mb-6", children: [s.jsx("h3", { className: "text-lg font-medium text-zinc-200 mb-2", children: "a) Hosting durch GitHub Pages" }), s.jsx("p", { className: "text-zinc-400 mb-2", children: "Diese App wird bei GitHub Pages, einem Dienst der GitHub, Inc. (88 Colin P Kelly Jr St, San Francisco, CA 94107, USA), gehostet." }), s.jsx("p", { className: "text-zinc-400 mb-2", children: "Beim Aufruf der App werden von GitHub Server-Logfiles erhoben (IP-Adresse, Browserdaten, etc.), um den Dienst sicher bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO)." })] }), s.jsxs("div", { className: "mb-6", children: [s.jsx("h3", { className: "text-lg font-medium text-zinc-200 mb-2", children: "b) Einbindung von Google-Diensten (Google Identity Services)" }), s.jsx("p", { className: "text-zinc-400 mb-2", children: 'Um die Authentifizierung und Synchronisierung mit Google-Diensten zu erm\xF6glichen, wird beim Start der App der "Google Identity Services"-Client (gsi/client) geladen.' }), s.jsx("p", { className: "text-zinc-400 mb-2", children: "Hierbei baut Ihr Browser eine direkte Verbindung zu den Servern von Google auf. Google erh\xE4lt dadurch die Information, dass Sie diese Webseite aufgerufen haben (inkl. Ihrer IP-Adresse), auch wenn Sie sich nicht einloggen. Dies ist technisch notwendig, um die Login-Funktionalit\xE4t bereitzustellen." })] }), s.jsxs("div", { className: "mb-6", children: [s.jsx("h3", { className: "text-lg font-medium text-zinc-200 mb-2", children: "c) Google Drive & Google Tasks Synchronisation" }), s.jsx("p", { className: "text-zinc-400 mb-2", children: 'Sie haben die M\xF6glichkeit, Ihre Aufgaben mit Google Drive zu synchronisieren oder an Google Tasks zu senden. Dies geschieht ausschlie\xDFlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) durch den Login ("Sign in with Google").' }), s.jsxs("p", { className: "text-zinc-400 mb-2", children: [s.jsx("strong", { className: "text-zinc-300", children: "Umfang:" }), " Die App erh\xE4lt Zugriff auf einen speziellen Anwendungsordner in Ihrem Google Drive (zur Speicherung der `todo.txt`) sowie das Recht, Aufgaben in Ihren Google Tasks zu erstellen."] }), s.jsxs("p", { className: "text-zinc-400 mb-2", children: [s.jsx("strong", { className: "text-zinc-300", children: "Daten\xFCbermittlung:" }), " Die Daten\xFCbertragung findet direkt verschl\xFCsselt zwischen Ihrem Endger\xE4t und den Google-Servern statt. Der Anbieter der App hat keinen Zugriff auf Ihr Google-Konto."] })] }), s.jsxs("div", { className: "mb-6", children: [s.jsx("h3", { className: "text-lg font-medium text-zinc-200 mb-2", children: "d) Dropbox Synchronisation" }), s.jsx("p", { className: "text-zinc-400 mb-2", children: "Alternativ k\xF6nnen Sie den Dienst Dropbox zur Synchronisierung nutzen. Anbieter ist die Dropbox International Unlimited Company (Irland)." }), s.jsxs("p", { className: "text-zinc-400 mb-2", children: [s.jsx("strong", { className: "text-zinc-300", children: "Funktionsweise:" }), " Nach Ihrer expliziten Authentifizierung (OAuth) erh\xE4lt die App einen Zugriffstoken, der lokal in Ihrem Browser gespeichert wird. Mit diesem Token kann die App die Datei `todo.txt` in Ihrem Dropbox-Speicher lesen und schreiben."] }), s.jsxs("p", { className: "text-zinc-400 mb-2", children: [s.jsx("strong", { className: "text-zinc-300", children: "Rechtsgrundlage:" }), " Einwilligung gem\xE4\xDF Art. 6 Abs. 1 lit. a DSGVO."] })] })] }), s.jsxs("section", { children: [s.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "5. Ihre Rechte" }), s.jsx("p", { className: "text-zinc-400 mb-4", children: "Sie haben gem\xE4\xDF DSGVO das Recht auf Auskunft, Berichtigung, L\xF6schung und Einschr\xE4nkung der Verarbeitung Ihrer bei uns gespeicherten Daten." }), s.jsx("p", { className: "text-zinc-400 mb-2", children: "Da wir als App-Anbieter keine Benutzerdaten auf eigenen Servern speichern, wenden Sie sich f\xFCr die Aus\xFCbung Ihrer Rechte bez\xFCglich der Cloud-Daten (Drive/Dropbox) bitte direkt an die jeweiligen Anbieter oder nutzen Sie die L\xF6schfunktionen innerhalb der Dienste." }), s.jsx("p", { className: "text-zinc-400", children: 'Lokale Daten ("LocalStorage") k\xF6nnen Sie jederzeit selbst durch das Leeren Ihres Browser-Caches l\xF6schen.' })] })] })] });
}
function Oy() {
  const [t, e] = H.useState(pt.getTasks()), [l, a] = H.useState({ type: "inbox" }), [n, u] = H.useState(false), [i, c] = H.useState(null), [f, h] = H.useState(null), [v, g] = H.useState(false), [d, y] = H.useState("tasks"), j = (U) => {
    pt.loadFromString(U);
  }, { isAuthenticated: z, isSyncing: O, login: r, syncPushDrive: o, syncPullDrive: m, syncPushTasks: x, syncPullTasks: N } = zy(j), { isAuthenticated: _, isSyncing: b, login: A, syncPush: D, syncPull: S } = Ny(j);
  H.useEffect(() => {
    const U = pt.subscribe((lt) => {
      e([...lt]);
    });
    return pt.init(), () => {
      pt.unsubscribe(U);
    };
  }, []);
  const [Y, E] = H.useState(""), [C, W] = H.useState(0), gt = H.useMemo(() => {
    let U = t;
    if (Y.trim() && (U = Ay(U, Y)), !l) return U;
    switch (l.type) {
      case "today":
        const lt = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        return U.filter((F) => F.metadata && F.metadata.due === lt);
      case "upcoming":
        const Wt = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        return U.filter((F) => F.metadata && F.metadata.due > Wt);
      case "overdue":
        const pe = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        return U.filter((F) => F.metadata && F.metadata.due && F.metadata.due < pe && !F.completed);
      case "project":
        return U.filter((F) => F.projects.includes(l.value));
      case "context":
        return U.filter((F) => F.contexts && F.contexts.includes(l.value));
      case "tag":
        return U.filter((F) => F.tags && F.tags.includes(l.value));
      case "inbox":
      case "impressum":
      case "datenschutz":
      default:
        return U;
    }
  }, [t, l, Y]), T = (U) => {
    if (!U.trim()) return;
    let lt = U;
    if (l) switch (l.type) {
      case "project":
        lt += ` +${l.value}`;
        break;
      case "context":
        lt += ` @${l.value}`;
        break;
      case "tag":
        lt += ` #${l.value}`;
        break;
      case "today":
        const Wt = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        lt += ` due:${Wt}`;
        break;
    }
    pt.addTask(lt), E("");
  }, R = H.useMemo(() => [...new Set(t.flatMap((U) => U.projects || []))].sort(), [t]), M = H.useMemo(() => [...new Set(t.flatMap((U) => U.contexts || []))].sort(), [t]), K = H.useMemo(() => [...new Set(t.flatMap((U) => U.tags || []))].sort(), [t]), [J, jt] = H.useState(/* @__PURE__ */ new Set()), ve = (U) => {
    const lt = new Set(J);
    lt.has(U) ? lt.delete(U) : lt.add(U), jt(lt);
  }, Ye = () => {
    t.filter((lt) => J.has(lt.id)).forEach((lt) => pt.updateTask(lt.id, { completed: true })), jt(/* @__PURE__ */ new Set());
  }, xe = () => {
    Array.from(J).forEach((U) => pt.deleteTask(U)), jt(/* @__PURE__ */ new Set());
  };
  return Ty({ tasks: gt, focusedTaskId: i, setFocusedTaskId: c, setSearchFocus: () => W((U) => U + 1), onTaskComplete: (U) => {
    pt.toggleTask(U);
  }, onTaskDelete: (U) => pt.deleteTask(U), onTaskEdit: (U) => {
    h(U);
  }, onTaskPriority: (U, lt) => {
    const Wt = t.find((Fu) => Fu.id === U);
    if (!Wt) return;
    if (["A", "B", "C", null].includes(lt)) {
      pt.setTaskPriority(U, lt);
      return;
    }
    const pe = [null, "C", "B", "A"];
    let F = pe.indexOf(Wt.priority || null);
    F === -1 && (F = 0);
    let ce = F;
    lt === "up" && (ce = Math.min(ce + 1, pe.length - 1)), lt === "down" && (ce = Math.max(ce - 1, 0)), ce !== F && pt.setTaskPriority(U, pe[ce]);
  }, onUndo: () => pt.undo(), clearFilters: () => {
    E(""), a({ type: "inbox" }), g(false);
  } }), s.jsx(s.Fragment, { children: s.jsxs("div", { className: "flex flex-col h-full", children: [s.jsxs("div", { className: "flex flex-1 overflow-hidden relative", children: [s.jsx(Ey, { isOpen: v, onClose: () => g(false), onSyncClick: () => z ? o(t) : r(), onPullClick: m, isSyncing: O, isAuthenticated: z, onDropboxSync: () => _ ? D(t) : A(), onDropboxPull: S, isDropboxAuth: _, isDropboxSyncing: b, onGTasksSync: () => z ? x(t) : r(), onGTasksPull: N, onClearAll: () => {
    window.confirm(`Are you sure you want to delete all ${t.length} tasks? This cannot be undone (but you can undo with Cmd+Z).`) && pt.clearAllTasks();
  } }), s.jsx("main", { id: "main-content", className: "flex-1 overflow-y-auto bg-zinc-950 flex justify-center transition-colors pb-32", children: s.jsx("div", { className: "w-full max-w-2xl px-4 sm:px-6 md:px-8 py-6", children: s.jsx("div", { className: "space-y-2", children: d === "impressum" ? s.jsx(Dy, { onBack: () => y("tasks") }) : d === "datenschutz" ? s.jsx(_y, { onBack: () => y("tasks") }) : s.jsx(vy, { tasks: gt, activeFilter: l, selectedTaskIds: J, onTaskSelect: ve, focusedTaskId: i, editingTaskId: f, onEditEnd: () => h(null), projects: R, contexts: M, tags: K, onFilterClick: (U, lt) => {
    let Wt = "";
    U === "project" && (Wt = "+"), U === "context" && (Wt = "@"), U === "tag" && (Wt = "#"), U === "date" && (Wt = "due:");
    const pe = `${Wt}${lt}`, F = Y || "";
    if (F.includes(pe)) {
      const ce = F.replace(pe, "").replace(/\s\s+/g, " ").trim();
      E(ce);
    } else {
      const Fu = (F || "") + " " + pe;
      E(Fu);
    }
    W((ce) => ce + 1);
  } }) }) }) }), s.jsx(ry, { activeFilter: l, onFilterSelect: a, projects: R, contexts: M, tags: K, tasks: t, isOpen: n, onClose: () => u(false), onPageNavigate: y }), s.jsx(xy, { selectedCount: J.size, onDeselectAll: () => jt(/* @__PURE__ */ new Set()), onCompleteAll: Ye, onDeleteAll: xe })] }), d === "tasks" && s.jsxs("div", { className: "bg-zinc-900/80 backdrop-blur-sm border-t border-zinc-800 py-2 px-4 text-center text-xs text-zinc-500", children: [s.jsx("a", { href: "/datenschutz.html", className: "hover:text-zinc-300 transition-colors", children: "Datenschutzerkl\xE4rung" }), " \u2022 ", s.jsx("a", { href: "/impressum.html", className: "hover:text-zinc-300 transition-colors", children: "Impressum" })] }), d === "tasks" && s.jsx(py, { searchValue: Y, onSearch: E, onQuickAdd: T, onMenuClick: () => u(!n), onSettingsClick: () => g(!v), focusTrigger: C, activeFilter: l, onClearFilter: () => a({ type: "inbox" }), projects: R, contexts: M, tags: K })] }) });
}
oy.createRoot(document.getElementById("root")).render(s.jsx(Oy, {}));
