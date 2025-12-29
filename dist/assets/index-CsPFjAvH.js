(function() {
  const l = document.createElement("link").relList;
  if (l && l.supports && l.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) a(n);
  new MutationObserver((n) => {
    for (const u of n) if (u.type === "childList") for (const i of u.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && a(i);
  }).observe(document, { childList: true, subtree: true });
  function e(n) {
    const u = {};
    return n.integrity && (u.integrity = n.integrity), n.referrerPolicy && (u.referrerPolicy = n.referrerPolicy), n.crossOrigin === "use-credentials" ? u.credentials = "include" : n.crossOrigin === "anonymous" ? u.credentials = "omit" : u.credentials = "same-origin", u;
  }
  function a(n) {
    if (n.ep) return;
    n.ep = true;
    const u = e(n);
    fetch(n.href, u);
  }
})();
var Ps = { exports: {} }, Tu = {};
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var e0 = Symbol.for("react.transitional.element"), a0 = Symbol.for("react.fragment");
function to(t, l, e) {
  var a = null;
  if (e !== void 0 && (a = "" + e), l.key !== void 0 && (a = "" + l.key), "key" in l) {
    e = {};
    for (var n in l) n !== "key" && (e[n] = l[n]);
  } else e = l;
  return l = e.ref, { $$typeof: e0, type: t, key: a, ref: l !== void 0 ? l : null, props: e };
}
Tu.Fragment = a0;
Tu.jsx = to;
Tu.jsxs = to;
Ps.exports = Tu;
var f = Ps.exports, lo = { exports: {} }, Au = {}, eo = { exports: {} }, ao = {};
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
  function l(A, U) {
    var C = A.length;
    A.push(U);
    t: for (; 0 < C; ) {
      var nt = C - 1 >>> 1, st = A[nt];
      if (0 < n(st, U)) A[nt] = U, A[C] = st, C = nt;
      else break t;
    }
  }
  function e(A) {
    return A.length === 0 ? null : A[0];
  }
  function a(A) {
    if (A.length === 0) return null;
    var U = A[0], C = A.pop();
    if (C !== U) {
      A[0] = C;
      t: for (var nt = 0, st = A.length, je = st >>> 1; nt < je; ) {
        var E = 2 * (nt + 1) - 1, $ = A[E], ot = E + 1, Ot = A[ot];
        if (0 > n($, C)) ot < st && 0 > n(Ot, $) ? (A[nt] = Ot, A[ot] = C, nt = ot) : (A[nt] = $, A[E] = C, nt = E);
        else if (ot < st && 0 > n(Ot, C)) A[nt] = Ot, A[ot] = C, nt = ot;
        else break t;
      }
    }
    return U;
  }
  function n(A, U) {
    var C = A.sortIndex - U.sortIndex;
    return C !== 0 ? C : A.id - U.id;
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
  var s = [], r = [], v = 1, y = null, m = 3, h = false, p = false, S = false, z = false, d = typeof setTimeout == "function" ? setTimeout : null, o = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
  function b(A) {
    for (var U = e(r); U !== null; ) {
      if (U.callback === null) a(r);
      else if (U.startTime <= A) a(r), U.sortIndex = U.expirationTime, l(s, U);
      else break;
      U = e(r);
    }
  }
  function N(A) {
    if (S = false, b(A), !p) if (e(s) !== null) p = true, _ || (_ = true, q());
    else {
      var U = e(r);
      U !== null && ga(N, U.startTime - A);
    }
  }
  var _ = false, T = -1, j = 5, O = -1;
  function M() {
    return z ? true : !(t.unstable_now() - O < j);
  }
  function at() {
    if (z = false, _) {
      var A = t.unstable_now();
      O = A;
      var U = true;
      try {
        t: {
          p = false, S && (S = false, o(T), T = -1), h = true;
          var C = m;
          try {
            l: {
              for (b(A), y = e(s); y !== null && !(y.expirationTime > A && M()); ) {
                var nt = y.callback;
                if (typeof nt == "function") {
                  y.callback = null, m = y.priorityLevel;
                  var st = nt(y.expirationTime <= A);
                  if (A = t.unstable_now(), typeof st == "function") {
                    y.callback = st, b(A), U = true;
                    break l;
                  }
                  y === e(s) && a(s), b(A);
                } else a(s);
                y = e(s);
              }
              if (y !== null) U = true;
              else {
                var je = e(r);
                je !== null && ga(N, je.startTime - A), U = false;
              }
            }
            break t;
          } finally {
            y = null, m = C, h = false;
          }
          U = void 0;
        }
      } finally {
        U ? q() : _ = false;
      }
    }
  }
  var q;
  if (typeof g == "function") q = function() {
    g(at);
  };
  else if (typeof MessageChannel < "u") {
    var ue = new MessageChannel(), Zu = ue.port2;
    ue.port1.onmessage = at, q = function() {
      Zu.postMessage(null);
    };
  } else q = function() {
    d(at, 0);
  };
  function ga(A, U) {
    T = d(function() {
      A(t.unstable_now());
    }, U);
  }
  t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(A) {
    A.callback = null;
  }, t.unstable_forceFrameRate = function(A) {
    0 > A || 125 < A ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : j = 0 < A ? Math.floor(1e3 / A) : 5;
  }, t.unstable_getCurrentPriorityLevel = function() {
    return m;
  }, t.unstable_next = function(A) {
    switch (m) {
      case 1:
      case 2:
      case 3:
        var U = 3;
        break;
      default:
        U = m;
    }
    var C = m;
    m = U;
    try {
      return A();
    } finally {
      m = C;
    }
  }, t.unstable_requestPaint = function() {
    z = true;
  }, t.unstable_runWithPriority = function(A, U) {
    switch (A) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        A = 3;
    }
    var C = m;
    m = A;
    try {
      return U();
    } finally {
      m = C;
    }
  }, t.unstable_scheduleCallback = function(A, U, C) {
    var nt = t.unstable_now();
    switch (typeof C == "object" && C !== null ? (C = C.delay, C = typeof C == "number" && 0 < C ? nt + C : nt) : C = nt, A) {
      case 1:
        var st = -1;
        break;
      case 2:
        st = 250;
        break;
      case 5:
        st = 1073741823;
        break;
      case 4:
        st = 1e4;
        break;
      default:
        st = 5e3;
    }
    return st = C + st, A = { id: v++, callback: U, priorityLevel: A, startTime: C, expirationTime: st, sortIndex: -1 }, C > nt ? (A.sortIndex = C, l(r, A), e(s) === null && A === e(r) && (S ? (o(T), T = -1) : S = true, ga(N, C - nt))) : (A.sortIndex = st, l(s, A), p || h || (p = true, _ || (_ = true, q()))), A;
  }, t.unstable_shouldYield = M, t.unstable_wrapCallback = function(A) {
    var U = m;
    return function() {
      var C = m;
      m = U;
      try {
        return A.apply(this, arguments);
      } finally {
        m = C;
      }
    };
  };
})(ao);
eo.exports = ao;
var n0 = eo.exports, no = { exports: {} }, H = {};
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Tc = Symbol.for("react.transitional.element"), u0 = Symbol.for("react.portal"), i0 = Symbol.for("react.fragment"), c0 = Symbol.for("react.strict_mode"), f0 = Symbol.for("react.profiler"), s0 = Symbol.for("react.consumer"), o0 = Symbol.for("react.context"), r0 = Symbol.for("react.forward_ref"), d0 = Symbol.for("react.suspense"), m0 = Symbol.for("react.memo"), uo = Symbol.for("react.lazy"), h0 = Symbol.for("react.activity"), Nf = Symbol.iterator;
function y0(t) {
  return t === null || typeof t != "object" ? null : (t = Nf && t[Nf] || t["@@iterator"], typeof t == "function" ? t : null);
}
var io = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, co = Object.assign, fo = {};
function fa(t, l, e) {
  this.props = t, this.context = l, this.refs = fo, this.updater = e || io;
}
fa.prototype.isReactComponent = {};
fa.prototype.setState = function(t, l) {
  if (typeof t != "object" && typeof t != "function" && t != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, t, l, "setState");
};
fa.prototype.forceUpdate = function(t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function so() {
}
so.prototype = fa.prototype;
function Ac(t, l, e) {
  this.props = t, this.context = l, this.refs = fo, this.updater = e || io;
}
var Nc = Ac.prototype = new so();
Nc.constructor = Ac;
co(Nc, fa.prototype);
Nc.isPureReactComponent = true;
var jf = Array.isArray;
function Ei() {
}
var tt = { H: null, A: null, T: null, S: null }, oo = Object.prototype.hasOwnProperty;
function jc(t, l, e) {
  var a = e.ref;
  return { $$typeof: Tc, type: t, key: l, ref: a !== void 0 ? a : null, props: e };
}
function g0(t, l) {
  return jc(t.type, l, t.props);
}
function Ec(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Tc;
}
function v0(t) {
  var l = { "=": "=0", ":": "=2" };
  return "$" + t.replace(/[=:]/g, function(e) {
    return l[e];
  });
}
var Ef = /\/+/g;
function wu(t, l) {
  return typeof t == "object" && t !== null && t.key != null ? v0("" + t.key) : l.toString(36);
}
function b0(t) {
  switch (t.status) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw t.reason;
    default:
      switch (typeof t.status == "string" ? t.then(Ei, Ei) : (t.status = "pending", t.then(function(l) {
        t.status === "pending" && (t.status = "fulfilled", t.value = l);
      }, function(l) {
        t.status === "pending" && (t.status = "rejected", t.reason = l);
      })), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw t.reason;
      }
  }
  throw t;
}
function Oe(t, l, e, a, n) {
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
        case Tc:
        case u0:
          i = true;
          break;
        case uo:
          return i = t._init, Oe(i(t._payload), l, e, a, n);
      }
  }
  if (i) return n = n(t), i = a === "" ? "." + wu(t, 0) : a, jf(n) ? (e = "", i != null && (e = i.replace(Ef, "$&/") + "/"), Oe(n, l, e, "", function(r) {
    return r;
  })) : n != null && (Ec(n) && (n = g0(n, e + (n.key == null || t && t.key === n.key ? "" : ("" + n.key).replace(Ef, "$&/") + "/") + i)), l.push(n)), 1;
  i = 0;
  var c = a === "" ? "." : a + ":";
  if (jf(t)) for (var s = 0; s < t.length; s++) a = t[s], u = c + wu(a, s), i += Oe(a, l, e, u, n);
  else if (s = y0(t), typeof s == "function") for (t = s.call(t), s = 0; !(a = t.next()).done; ) a = a.value, u = c + wu(a, s++), i += Oe(a, l, e, u, n);
  else if (u === "object") {
    if (typeof t.then == "function") return Oe(b0(t), l, e, a, n);
    throw l = String(t), Error("Objects are not valid as a React child (found: " + (l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l) + "). If you meant to render a collection of children, use an array instead.");
  }
  return i;
}
function gn(t, l, e) {
  if (t == null) return t;
  var a = [], n = 0;
  return Oe(t, a, "", "", function(u) {
    return l.call(e, u, n++);
  }), a;
}
function x0(t) {
  if (t._status === -1) {
    var l = t._result;
    l = l(), l.then(function(e) {
      (t._status === 0 || t._status === -1) && (t._status = 1, t._result = e);
    }, function(e) {
      (t._status === 0 || t._status === -1) && (t._status = 2, t._result = e);
    }), t._status === -1 && (t._status = 0, t._result = l);
  }
  if (t._status === 1) return t._result.default;
  throw t._result;
}
var Df = typeof reportError == "function" ? reportError : function(t) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var l = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t), error: t });
    if (!window.dispatchEvent(l)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", t);
    return;
  }
  console.error(t);
}, p0 = { map: gn, forEach: function(t, l, e) {
  gn(t, function() {
    l.apply(this, arguments);
  }, e);
}, count: function(t) {
  var l = 0;
  return gn(t, function() {
    l++;
  }), l;
}, toArray: function(t) {
  return gn(t, function(l) {
    return l;
  }) || [];
}, only: function(t) {
  if (!Ec(t)) throw Error("React.Children.only expected to receive a single React element child.");
  return t;
} };
H.Activity = h0;
H.Children = p0;
H.Component = fa;
H.Fragment = i0;
H.Profiler = f0;
H.PureComponent = Ac;
H.StrictMode = c0;
H.Suspense = d0;
H.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = tt;
H.__COMPILER_RUNTIME = { __proto__: null, c: function(t) {
  return tt.H.useMemoCache(t);
} };
H.cache = function(t) {
  return function() {
    return t.apply(null, arguments);
  };
};
H.cacheSignal = function() {
  return null;
};
H.cloneElement = function(t, l, e) {
  if (t == null) throw Error("The argument must be a React element, but you passed " + t + ".");
  var a = co({}, t.props), n = t.key;
  if (l != null) for (u in l.key !== void 0 && (n = "" + l.key), l) !oo.call(l, u) || u === "key" || u === "__self" || u === "__source" || u === "ref" && l.ref === void 0 || (a[u] = l[u]);
  var u = arguments.length - 2;
  if (u === 1) a.children = e;
  else if (1 < u) {
    for (var i = Array(u), c = 0; c < u; c++) i[c] = arguments[c + 2];
    a.children = i;
  }
  return jc(t.type, n, a);
};
H.createContext = function(t) {
  return t = { $$typeof: o0, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null }, t.Provider = t, t.Consumer = { $$typeof: s0, _context: t }, t;
};
H.createElement = function(t, l, e) {
  var a, n = {}, u = null;
  if (l != null) for (a in l.key !== void 0 && (u = "" + l.key), l) oo.call(l, a) && a !== "key" && a !== "__self" && a !== "__source" && (n[a] = l[a]);
  var i = arguments.length - 2;
  if (i === 1) n.children = e;
  else if (1 < i) {
    for (var c = Array(i), s = 0; s < i; s++) c[s] = arguments[s + 2];
    n.children = c;
  }
  if (t && t.defaultProps) for (a in i = t.defaultProps, i) n[a] === void 0 && (n[a] = i[a]);
  return jc(t, u, n);
};
H.createRef = function() {
  return { current: null };
};
H.forwardRef = function(t) {
  return { $$typeof: r0, render: t };
};
H.isValidElement = Ec;
H.lazy = function(t) {
  return { $$typeof: uo, _payload: { _status: -1, _result: t }, _init: x0 };
};
H.memo = function(t, l) {
  return { $$typeof: m0, type: t, compare: l === void 0 ? null : l };
};
H.startTransition = function(t) {
  var l = tt.T, e = {};
  tt.T = e;
  try {
    var a = t(), n = tt.S;
    n !== null && n(e, a), typeof a == "object" && a !== null && typeof a.then == "function" && a.then(Ei, Df);
  } catch (u) {
    Df(u);
  } finally {
    l !== null && e.types !== null && (l.types = e.types), tt.T = l;
  }
};
H.unstable_useCacheRefresh = function() {
  return tt.H.useCacheRefresh();
};
H.use = function(t) {
  return tt.H.use(t);
};
H.useActionState = function(t, l, e) {
  return tt.H.useActionState(t, l, e);
};
H.useCallback = function(t, l) {
  return tt.H.useCallback(t, l);
};
H.useContext = function(t) {
  return tt.H.useContext(t);
};
H.useDebugValue = function() {
};
H.useDeferredValue = function(t, l) {
  return tt.H.useDeferredValue(t, l);
};
H.useEffect = function(t, l) {
  return tt.H.useEffect(t, l);
};
H.useEffectEvent = function(t) {
  return tt.H.useEffectEvent(t);
};
H.useId = function() {
  return tt.H.useId();
};
H.useImperativeHandle = function(t, l, e) {
  return tt.H.useImperativeHandle(t, l, e);
};
H.useInsertionEffect = function(t, l) {
  return tt.H.useInsertionEffect(t, l);
};
H.useLayoutEffect = function(t, l) {
  return tt.H.useLayoutEffect(t, l);
};
H.useMemo = function(t, l) {
  return tt.H.useMemo(t, l);
};
H.useOptimistic = function(t, l) {
  return tt.H.useOptimistic(t, l);
};
H.useReducer = function(t, l, e) {
  return tt.H.useReducer(t, l, e);
};
H.useRef = function(t) {
  return tt.H.useRef(t);
};
H.useState = function(t) {
  return tt.H.useState(t);
};
H.useSyncExternalStore = function(t, l, e) {
  return tt.H.useSyncExternalStore(t, l, e);
};
H.useTransition = function() {
  return tt.H.useTransition();
};
H.version = "19.2.3";
no.exports = H;
var R = no.exports, ro = { exports: {} }, Dt = {};
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var S0 = R;
function mo(t) {
  var l = "https://react.dev/errors/" + t;
  if (1 < arguments.length) {
    l += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var e = 2; e < arguments.length; e++) l += "&args[]=" + encodeURIComponent(arguments[e]);
  }
  return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function Ul() {
}
var Et = { d: { f: Ul, r: function() {
  throw Error(mo(522));
}, D: Ul, C: Ul, L: Ul, m: Ul, X: Ul, S: Ul, M: Ul }, p: 0, findDOMNode: null }, z0 = Symbol.for("react.portal");
function T0(t, l, e) {
  var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: z0, key: a == null ? null : "" + a, children: t, containerInfo: l, implementation: e };
}
var Oa = S0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function Nu(t, l) {
  if (t === "font") return "";
  if (typeof l == "string") return l === "use-credentials" ? l : "";
}
Dt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Et;
Dt.createPortal = function(t, l) {
  var e = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11) throw Error(mo(299));
  return T0(t, l, null, e);
};
Dt.flushSync = function(t) {
  var l = Oa.T, e = Et.p;
  try {
    if (Oa.T = null, Et.p = 2, t) return t();
  } finally {
    Oa.T = l, Et.p = e, Et.d.f();
  }
};
Dt.preconnect = function(t, l) {
  typeof t == "string" && (l ? (l = l.crossOrigin, l = typeof l == "string" ? l === "use-credentials" ? l : "" : void 0) : l = null, Et.d.C(t, l));
};
Dt.prefetchDNS = function(t) {
  typeof t == "string" && Et.d.D(t);
};
Dt.preinit = function(t, l) {
  if (typeof t == "string" && l && typeof l.as == "string") {
    var e = l.as, a = Nu(e, l.crossOrigin), n = typeof l.integrity == "string" ? l.integrity : void 0, u = typeof l.fetchPriority == "string" ? l.fetchPriority : void 0;
    e === "style" ? Et.d.S(t, typeof l.precedence == "string" ? l.precedence : void 0, { crossOrigin: a, integrity: n, fetchPriority: u }) : e === "script" && Et.d.X(t, { crossOrigin: a, integrity: n, fetchPriority: u, nonce: typeof l.nonce == "string" ? l.nonce : void 0 });
  }
};
Dt.preinitModule = function(t, l) {
  if (typeof t == "string") if (typeof l == "object" && l !== null) {
    if (l.as == null || l.as === "script") {
      var e = Nu(l.as, l.crossOrigin);
      Et.d.M(t, { crossOrigin: e, integrity: typeof l.integrity == "string" ? l.integrity : void 0, nonce: typeof l.nonce == "string" ? l.nonce : void 0 });
    }
  } else l == null && Et.d.M(t);
};
Dt.preload = function(t, l) {
  if (typeof t == "string" && typeof l == "object" && l !== null && typeof l.as == "string") {
    var e = l.as, a = Nu(e, l.crossOrigin);
    Et.d.L(t, e, { crossOrigin: a, integrity: typeof l.integrity == "string" ? l.integrity : void 0, nonce: typeof l.nonce == "string" ? l.nonce : void 0, type: typeof l.type == "string" ? l.type : void 0, fetchPriority: typeof l.fetchPriority == "string" ? l.fetchPriority : void 0, referrerPolicy: typeof l.referrerPolicy == "string" ? l.referrerPolicy : void 0, imageSrcSet: typeof l.imageSrcSet == "string" ? l.imageSrcSet : void 0, imageSizes: typeof l.imageSizes == "string" ? l.imageSizes : void 0, media: typeof l.media == "string" ? l.media : void 0 });
  }
};
Dt.preloadModule = function(t, l) {
  if (typeof t == "string") if (l) {
    var e = Nu(l.as, l.crossOrigin);
    Et.d.m(t, { as: typeof l.as == "string" && l.as !== "script" ? l.as : void 0, crossOrigin: e, integrity: typeof l.integrity == "string" ? l.integrity : void 0 });
  } else Et.d.m(t);
};
Dt.requestFormReset = function(t) {
  Et.d.r(t);
};
Dt.unstable_batchedUpdates = function(t, l) {
  return t(l);
};
Dt.useFormState = function(t, l, e) {
  return Oa.H.useFormState(t, l, e);
};
Dt.useFormStatus = function() {
  return Oa.H.useHostTransitionStatus();
};
Dt.version = "19.2.3";
function ho() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ho);
  } catch (t) {
    console.error(t);
  }
}
ho(), ro.exports = Dt;
var A0 = ro.exports;
/**
* @license React
* react-dom-client.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var gt = n0, yo = R, N0 = A0;
function x(t) {
  var l = "https://react.dev/errors/" + t;
  if (1 < arguments.length) {
    l += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var e = 2; e < arguments.length; e++) l += "&args[]=" + encodeURIComponent(arguments[e]);
  }
  return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function go(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
}
function an(t) {
  var l = t, e = t;
  if (t.alternate) for (; l.return; ) l = l.return;
  else {
    t = l;
    do
      l = t, l.flags & 4098 && (e = l.return), t = l.return;
    while (t);
  }
  return l.tag === 3 ? e : null;
}
function vo(t) {
  if (t.tag === 13) {
    var l = t.memoizedState;
    if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
  }
  return null;
}
function bo(t) {
  if (t.tag === 31) {
    var l = t.memoizedState;
    if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
  }
  return null;
}
function Of(t) {
  if (an(t) !== t) throw Error(x(188));
}
function j0(t) {
  var l = t.alternate;
  if (!l) {
    if (l = an(t), l === null) throw Error(x(188));
    return l !== t ? null : t;
  }
  for (var e = t, a = l; ; ) {
    var n = e.return;
    if (n === null) break;
    var u = n.alternate;
    if (u === null) {
      if (a = n.return, a !== null) {
        e = a;
        continue;
      }
      break;
    }
    if (n.child === u.child) {
      for (u = n.child; u; ) {
        if (u === e) return Of(n), t;
        if (u === a) return Of(n), l;
        u = u.sibling;
      }
      throw Error(x(188));
    }
    if (e.return !== a.return) e = n, a = u;
    else {
      for (var i = false, c = n.child; c; ) {
        if (c === e) {
          i = true, e = n, a = u;
          break;
        }
        if (c === a) {
          i = true, a = n, e = u;
          break;
        }
        c = c.sibling;
      }
      if (!i) {
        for (c = u.child; c; ) {
          if (c === e) {
            i = true, e = u, a = n;
            break;
          }
          if (c === a) {
            i = true, a = u, e = n;
            break;
          }
          c = c.sibling;
        }
        if (!i) throw Error(x(189));
      }
    }
    if (e.alternate !== a) throw Error(x(190));
  }
  if (e.tag !== 3) throw Error(x(188));
  return e.stateNode.current === e ? t : l;
}
function xo(t) {
  var l = t.tag;
  if (l === 5 || l === 26 || l === 27 || l === 6) return t;
  for (t = t.child; t !== null; ) {
    if (l = xo(t), l !== null) return l;
    t = t.sibling;
  }
  return null;
}
var lt = Object.assign, E0 = Symbol.for("react.element"), vn = Symbol.for("react.transitional.element"), Aa = Symbol.for("react.portal"), Ue = Symbol.for("react.fragment"), po = Symbol.for("react.strict_mode"), Di = Symbol.for("react.profiler"), So = Symbol.for("react.consumer"), pl = Symbol.for("react.context"), Dc = Symbol.for("react.forward_ref"), Oi = Symbol.for("react.suspense"), _i = Symbol.for("react.suspense_list"), Oc = Symbol.for("react.memo"), Cl = Symbol.for("react.lazy"), Mi = Symbol.for("react.activity"), D0 = Symbol.for("react.memo_cache_sentinel"), _f = Symbol.iterator;
function va(t) {
  return t === null || typeof t != "object" ? null : (t = _f && t[_f] || t["@@iterator"], typeof t == "function" ? t : null);
}
var O0 = Symbol.for("react.client.reference");
function Ui(t) {
  if (t == null) return null;
  if (typeof t == "function") return t.$$typeof === O0 ? null : t.displayName || t.name || null;
  if (typeof t == "string") return t;
  switch (t) {
    case Ue:
      return "Fragment";
    case Di:
      return "Profiler";
    case po:
      return "StrictMode";
    case Oi:
      return "Suspense";
    case _i:
      return "SuspenseList";
    case Mi:
      return "Activity";
  }
  if (typeof t == "object") switch (t.$$typeof) {
    case Aa:
      return "Portal";
    case pl:
      return t.displayName || "Context";
    case So:
      return (t._context.displayName || "Context") + ".Consumer";
    case Dc:
      var l = t.render;
      return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
    case Oc:
      return l = t.displayName || null, l !== null ? l : Ui(t.type) || "Memo";
    case Cl:
      l = t._payload, t = t._init;
      try {
        return Ui(t(l));
      } catch {
      }
  }
  return null;
}
var Na = Array.isArray, D = yo.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = N0.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, re = { pending: false, data: null, method: null, action: null }, Ci = [], Ce = -1;
function rl(t) {
  return { current: t };
}
function xt(t) {
  0 > Ce || (t.current = Ci[Ce], Ci[Ce] = null, Ce--);
}
function F(t, l) {
  Ce++, Ci[Ce] = t.current, t.current = l;
}
var ol = rl(null), La = rl(null), wl = rl(null), kn = rl(null);
function $n(t, l) {
  switch (F(wl, l), F(La, t), F(ol, null), l.nodeType) {
    case 9:
    case 11:
      t = (t = l.documentElement) && (t = t.namespaceURI) ? Rs(t) : 0;
      break;
    default:
      if (t = l.tagName, l = l.namespaceURI) l = Rs(l), t = Xd(l, t);
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
  xt(ol), F(ol, t);
}
function Fe() {
  xt(ol), xt(La), xt(wl);
}
function Hi(t) {
  t.memoizedState !== null && F(kn, t);
  var l = ol.current, e = Xd(l, t.type);
  l !== e && (F(La, t), F(ol, e));
}
function Wn(t) {
  La.current === t && (xt(ol), xt(La)), kn.current === t && (xt(kn), tn._currentValue = re);
}
var Vu, Mf;
function ce(t) {
  if (Vu === void 0) try {
    throw Error();
  } catch (e) {
    var l = e.stack.trim().match(/\n( *(at )?)/);
    Vu = l && l[1] || "", Mf = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
  }
  return `
` + Vu + t + Mf;
}
var Ku = false;
function Ju(t, l) {
  if (!t || Ku) return "";
  Ku = true;
  var e = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var a = { DetermineComponentFrameRoot: function() {
      try {
        if (l) {
          var y = function() {
            throw Error();
          };
          if (Object.defineProperty(y.prototype, "props", { set: function() {
            throw Error();
          } }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(y, []);
            } catch (h) {
              var m = h;
            }
            Reflect.construct(t, [], y);
          } else {
            try {
              y.call();
            } catch (h) {
              m = h;
            }
            t.call(y.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (h) {
            m = h;
          }
          (y = t()) && typeof y.catch == "function" && y.catch(function() {
          });
        }
      } catch (h) {
        if (h && m && typeof h.stack == "string") return [h.stack, m.stack];
      }
      return [null, null];
    } };
    a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var n = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
    n && n.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
    var u = a.DetermineComponentFrameRoot(), i = u[0], c = u[1];
    if (i && c) {
      var s = i.split(`
`), r = c.split(`
`);
      for (n = a = 0; a < s.length && !s[a].includes("DetermineComponentFrameRoot"); ) a++;
      for (; n < r.length && !r[n].includes("DetermineComponentFrameRoot"); ) n++;
      if (a === s.length || n === r.length) for (a = s.length - 1, n = r.length - 1; 1 <= a && 0 <= n && s[a] !== r[n]; ) n--;
      for (; 1 <= a && 0 <= n; a--, n--) if (s[a] !== r[n]) {
        if (a !== 1 || n !== 1) do
          if (a--, n--, 0 > n || s[a] !== r[n]) {
            var v = `
` + s[a].replace(" at new ", " at ");
            return t.displayName && v.includes("<anonymous>") && (v = v.replace("<anonymous>", t.displayName)), v;
          }
        while (1 <= a && 0 <= n);
        break;
      }
    }
  } finally {
    Ku = false, Error.prepareStackTrace = e;
  }
  return (e = t ? t.displayName || t.name : "") ? ce(e) : "";
}
function _0(t, l) {
  switch (t.tag) {
    case 26:
    case 27:
    case 5:
      return ce(t.type);
    case 16:
      return ce("Lazy");
    case 13:
      return t.child !== l && l !== null ? ce("Suspense Fallback") : ce("Suspense");
    case 19:
      return ce("SuspenseList");
    case 0:
    case 15:
      return Ju(t.type, false);
    case 11:
      return Ju(t.type.render, false);
    case 1:
      return Ju(t.type, true);
    case 31:
      return ce("Activity");
    default:
      return "";
  }
}
function Uf(t) {
  try {
    var l = "", e = null;
    do
      l += _0(t, e), e = t, t = t.return;
    while (t);
    return l;
  } catch (a) {
    return `
Error generating stack: ` + a.message + `
` + a.stack;
  }
}
var Bi = Object.prototype.hasOwnProperty, _c = gt.unstable_scheduleCallback, ku = gt.unstable_cancelCallback, M0 = gt.unstable_shouldYield, U0 = gt.unstable_requestPaint, Xt = gt.unstable_now, C0 = gt.unstable_getCurrentPriorityLevel, zo = gt.unstable_ImmediatePriority, To = gt.unstable_UserBlockingPriority, Fn = gt.unstable_NormalPriority, H0 = gt.unstable_LowPriority, Ao = gt.unstable_IdlePriority, B0 = gt.log, R0 = gt.unstable_setDisableYieldValue, nn = null, Zt = null;
function ql(t) {
  if (typeof B0 == "function" && R0(t), Zt && typeof Zt.setStrictMode == "function") try {
    Zt.setStrictMode(nn, t);
  } catch {
  }
}
var Lt = Math.clz32 ? Math.clz32 : q0, G0 = Math.log, Y0 = Math.LN2;
function q0(t) {
  return t >>>= 0, t === 0 ? 32 : 31 - (G0(t) / Y0 | 0) | 0;
}
var bn = 256, xn = 262144, pn = 4194304;
function fe(t) {
  var l = t & 42;
  if (l !== 0) return l;
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
function ju(t, l, e) {
  var a = t.pendingLanes;
  if (a === 0) return 0;
  var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
  t = t.warmLanes;
  var c = a & 134217727;
  return c !== 0 ? (a = c & ~u, a !== 0 ? n = fe(a) : (i &= c, i !== 0 ? n = fe(i) : e || (e = c & ~t, e !== 0 && (n = fe(e))))) : (c = a & ~u, c !== 0 ? n = fe(c) : i !== 0 ? n = fe(i) : e || (e = a & ~t, e !== 0 && (n = fe(e)))), n === 0 ? 0 : l !== 0 && l !== n && !(l & u) && (u = n & -n, e = l & -l, u >= e || u === 32 && (e & 4194048) !== 0) ? l : n;
}
function un(t, l) {
  return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
}
function Q0(t, l) {
  switch (t) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64:
      return l + 250;
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
      return l + 5e3;
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
function No() {
  var t = pn;
  return pn <<= 1, !(pn & 62914560) && (pn = 4194304), t;
}
function $u(t) {
  for (var l = [], e = 0; 31 > e; e++) l.push(t);
  return l;
}
function cn(t, l) {
  t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
}
function X0(t, l, e, a, n, u) {
  var i = t.pendingLanes;
  t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
  var c = t.entanglements, s = t.expirationTimes, r = t.hiddenUpdates;
  for (e = i & ~e; 0 < e; ) {
    var v = 31 - Lt(e), y = 1 << v;
    c[v] = 0, s[v] = -1;
    var m = r[v];
    if (m !== null) for (r[v] = null, v = 0; v < m.length; v++) {
      var h = m[v];
      h !== null && (h.lane &= -536870913);
    }
    e &= ~y;
  }
  a !== 0 && jo(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~l));
}
function jo(t, l, e) {
  t.pendingLanes |= l, t.suspendedLanes &= ~l;
  var a = 31 - Lt(l);
  t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
}
function Eo(t, l) {
  var e = t.entangledLanes |= l;
  for (t = t.entanglements; e; ) {
    var a = 31 - Lt(e), n = 1 << a;
    n & l | t[a] & l && (t[a] |= l), e &= ~n;
  }
}
function Do(t, l) {
  var e = l & -l;
  return e = e & 42 ? 1 : Mc(e), e & (t.suspendedLanes | l) ? 0 : e;
}
function Mc(t) {
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
function Uc(t) {
  return t &= -t, 2 < t ? 8 < t ? t & 134217727 ? 32 : 268435456 : 8 : 2;
}
function Oo() {
  var t = L.p;
  return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Id(t.type));
}
function Cf(t, l) {
  var e = L.p;
  try {
    return L.p = t, l();
  } finally {
    L.p = e;
  }
}
var ae = Math.random().toString(36).slice(2), St = "__reactFiber$" + ae, Bt = "__reactProps$" + ae, sa = "__reactContainer$" + ae, Ri = "__reactEvents$" + ae, Z0 = "__reactListeners$" + ae, L0 = "__reactHandles$" + ae, Hf = "__reactResources$" + ae, fn = "__reactMarker$" + ae;
function Cc(t) {
  delete t[St], delete t[Bt], delete t[Ri], delete t[Z0], delete t[L0];
}
function He(t) {
  var l = t[St];
  if (l) return l;
  for (var e = t.parentNode; e; ) {
    if (l = e[sa] || e[St]) {
      if (e = l.alternate, l.child !== null || e !== null && e.child !== null) for (t = Xs(t); t !== null; ) {
        if (e = t[St]) return e;
        t = Xs(t);
      }
      return l;
    }
    t = e, e = t.parentNode;
  }
  return null;
}
function oa(t) {
  if (t = t[St] || t[sa]) {
    var l = t.tag;
    if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3) return t;
  }
  return null;
}
function ja(t) {
  var l = t.tag;
  if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
  throw Error(x(33));
}
function we(t) {
  var l = t[Hf];
  return l || (l = t[Hf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
}
function bt(t) {
  t[fn] = true;
}
var _o = /* @__PURE__ */ new Set(), Mo = {};
function Se(t, l) {
  Ie(t, l), Ie(t + "Capture", l);
}
function Ie(t, l) {
  for (Mo[t] = l, t = 0; t < l.length; t++) _o.add(l[t]);
}
var w0 = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Bf = {}, Rf = {};
function V0(t) {
  return Bi.call(Rf, t) ? true : Bi.call(Bf, t) ? false : w0.test(t) ? Rf[t] = true : (Bf[t] = true, false);
}
function Cn(t, l, e) {
  if (V0(l)) if (e === null) t.removeAttribute(l);
  else {
    switch (typeof e) {
      case "undefined":
      case "function":
      case "symbol":
        t.removeAttribute(l);
        return;
      case "boolean":
        var a = l.toLowerCase().slice(0, 5);
        if (a !== "data-" && a !== "aria-") {
          t.removeAttribute(l);
          return;
        }
    }
    t.setAttribute(l, "" + e);
  }
}
function Sn(t, l, e) {
  if (e === null) t.removeAttribute(l);
  else {
    switch (typeof e) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        t.removeAttribute(l);
        return;
    }
    t.setAttribute(l, "" + e);
  }
}
function ml(t, l, e, a) {
  if (a === null) t.removeAttribute(e);
  else {
    switch (typeof a) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        t.removeAttribute(e);
        return;
    }
    t.setAttributeNS(l, e, "" + a);
  }
}
function kt(t) {
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
function Uo(t) {
  var l = t.type;
  return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
}
function K0(t, l, e) {
  var a = Object.getOwnPropertyDescriptor(t.constructor.prototype, l);
  if (!t.hasOwnProperty(l) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
    var n = a.get, u = a.set;
    return Object.defineProperty(t, l, { configurable: true, get: function() {
      return n.call(this);
    }, set: function(i) {
      e = "" + i, u.call(this, i);
    } }), Object.defineProperty(t, l, { enumerable: a.enumerable }), { getValue: function() {
      return e;
    }, setValue: function(i) {
      e = "" + i;
    }, stopTracking: function() {
      t._valueTracker = null, delete t[l];
    } };
  }
}
function Gi(t) {
  if (!t._valueTracker) {
    var l = Uo(t) ? "checked" : "value";
    t._valueTracker = K0(t, l, "" + t[l]);
  }
}
function Co(t) {
  if (!t) return false;
  var l = t._valueTracker;
  if (!l) return true;
  var e = l.getValue(), a = "";
  return t && (a = Uo(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), true) : false;
}
function In(t) {
  if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
  try {
    return t.activeElement || t.body;
  } catch {
    return t.body;
  }
}
var J0 = /[\n"\\]/g;
function Ft(t) {
  return t.replace(J0, function(l) {
    return "\\" + l.charCodeAt(0).toString(16) + " ";
  });
}
function Yi(t, l, e, a, n, u, i, c) {
  t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), l != null ? i === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + kt(l)) : t.value !== "" + kt(l) && (t.value = "" + kt(l)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), l != null ? qi(t, i, kt(l)) : e != null ? qi(t, i, kt(e)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.name = "" + kt(c) : t.removeAttribute("name");
}
function Ho(t, l, e, a, n, u, i, c) {
  if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), l != null || e != null) {
    if (!(u !== "submit" && u !== "reset" || l != null)) {
      Gi(t);
      return;
    }
    e = e != null ? "" + kt(e) : "", l = l != null ? "" + kt(l) : e, c || l === t.value || (t.value = l), t.defaultValue = l;
  }
  a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = c ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), Gi(t);
}
function qi(t, l, e) {
  l === "number" && In(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
}
function Ve(t, l, e, a) {
  if (t = t.options, l) {
    l = {};
    for (var n = 0; n < e.length; n++) l["$" + e[n]] = true;
    for (e = 0; e < t.length; e++) n = l.hasOwnProperty("$" + t[e].value), t[e].selected !== n && (t[e].selected = n), n && a && (t[e].defaultSelected = true);
  } else {
    for (e = "" + kt(e), l = null, n = 0; n < t.length; n++) {
      if (t[n].value === e) {
        t[n].selected = true, a && (t[n].defaultSelected = true);
        return;
      }
      l !== null || t[n].disabled || (l = t[n]);
    }
    l !== null && (l.selected = true);
  }
}
function Bo(t, l, e) {
  if (l != null && (l = "" + kt(l), l !== t.value && (t.value = l), e == null)) {
    t.defaultValue !== l && (t.defaultValue = l);
    return;
  }
  t.defaultValue = e != null ? "" + kt(e) : "";
}
function Ro(t, l, e, a) {
  if (l == null) {
    if (a != null) {
      if (e != null) throw Error(x(92));
      if (Na(a)) {
        if (1 < a.length) throw Error(x(93));
        a = a[0];
      }
      e = a;
    }
    e == null && (e = ""), l = e;
  }
  e = kt(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), Gi(t);
}
function Pe(t, l) {
  if (l) {
    var e = t.firstChild;
    if (e && e === t.lastChild && e.nodeType === 3) {
      e.nodeValue = l;
      return;
    }
  }
  t.textContent = l;
}
var k0 = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
function Gf(t, l, e) {
  var a = l.indexOf("--") === 0;
  e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || k0.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
}
function Go(t, l, e) {
  if (l != null && typeof l != "object") throw Error(x(62));
  if (t = t.style, e != null) {
    for (var a in e) !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
    for (var n in l) a = l[n], l.hasOwnProperty(n) && e[n] !== a && Gf(t, n, a);
  } else for (var u in l) l.hasOwnProperty(u) && Gf(t, u, l[u]);
}
function Hc(t) {
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
var $0 = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), W0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function Hn(t) {
  return W0.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
}
function Sl() {
}
var Qi = null;
function Bc(t) {
  return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
}
var Be = null, Ke = null;
function Yf(t) {
  var l = oa(t);
  if (l && (t = l.stateNode)) {
    var e = t[Bt] || null;
    t: switch (t = l.stateNode, l.type) {
      case "input":
        if (Yi(t, e.value, e.defaultValue, e.defaultValue, e.checked, e.defaultChecked, e.type, e.name), l = e.name, e.type === "radio" && l != null) {
          for (e = t; e.parentNode; ) e = e.parentNode;
          for (e = e.querySelectorAll('input[name="' + Ft("" + l) + '"][type="radio"]'), l = 0; l < e.length; l++) {
            var a = e[l];
            if (a !== t && a.form === t.form) {
              var n = a[Bt] || null;
              if (!n) throw Error(x(90));
              Yi(a, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name);
            }
          }
          for (l = 0; l < e.length; l++) a = e[l], a.form === t.form && Co(a);
        }
        break t;
      case "textarea":
        Bo(t, e.value, e.defaultValue);
        break t;
      case "select":
        l = e.value, l != null && Ve(t, !!e.multiple, l, false);
    }
  }
}
var Wu = false;
function Yo(t, l, e) {
  if (Wu) return t(l, e);
  Wu = true;
  try {
    var a = t(l);
    return a;
  } finally {
    if (Wu = false, (Be !== null || Ke !== null) && (Yu(), Be && (l = Be, t = Ke, Ke = Be = null, Yf(l), t))) for (l = 0; l < t.length; l++) Yf(t[l]);
  }
}
function wa(t, l) {
  var e = t.stateNode;
  if (e === null) return null;
  var a = e[Bt] || null;
  if (a === null) return null;
  e = a[l];
  t: switch (l) {
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
  if (e && typeof e != "function") throw Error(x(231, l, typeof e));
  return e;
}
var jl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Xi = false;
if (jl) try {
  var ba = {};
  Object.defineProperty(ba, "passive", { get: function() {
    Xi = true;
  } }), window.addEventListener("test", ba, ba), window.removeEventListener("test", ba, ba);
} catch {
  Xi = false;
}
var Ql = null, Rc = null, Bn = null;
function qo() {
  if (Bn) return Bn;
  var t, l = Rc, e = l.length, a, n = "value" in Ql ? Ql.value : Ql.textContent, u = n.length;
  for (t = 0; t < e && l[t] === n[t]; t++) ;
  var i = e - t;
  for (a = 1; a <= i && l[e - a] === n[u - a]; a++) ;
  return Bn = n.slice(t, 1 < a ? 1 - a : void 0);
}
function Rn(t) {
  var l = t.keyCode;
  return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
}
function zn() {
  return true;
}
function qf() {
  return false;
}
function Rt(t) {
  function l(e, a, n, u, i) {
    this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
    for (var c in t) t.hasOwnProperty(c) && (e = t[c], this[c] = e ? e(u) : u[c]);
    return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === false) ? zn : qf, this.isPropagationStopped = qf, this;
  }
  return lt(l.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var e = this.nativeEvent;
    e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = false), this.isDefaultPrevented = zn);
  }, stopPropagation: function() {
    var e = this.nativeEvent;
    e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = true), this.isPropagationStopped = zn);
  }, persist: function() {
  }, isPersistent: zn }), l;
}
var ze = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(t) {
  return t.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Eu = Rt(ze), sn = lt({}, ze, { view: 0, detail: 0 }), F0 = Rt(sn), Fu, Iu, xa, Du = lt({}, sn, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Gc, button: 0, buttons: 0, relatedTarget: function(t) {
  return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
}, movementX: function(t) {
  return "movementX" in t ? t.movementX : (t !== xa && (xa && t.type === "mousemove" ? (Fu = t.screenX - xa.screenX, Iu = t.screenY - xa.screenY) : Iu = Fu = 0, xa = t), Fu);
}, movementY: function(t) {
  return "movementY" in t ? t.movementY : Iu;
} }), Qf = Rt(Du), I0 = lt({}, Du, { dataTransfer: 0 }), P0 = Rt(I0), tm = lt({}, sn, { relatedTarget: 0 }), Pu = Rt(tm), lm = lt({}, ze, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), em = Rt(lm), am = lt({}, ze, { clipboardData: function(t) {
  return "clipboardData" in t ? t.clipboardData : window.clipboardData;
} }), nm = Rt(am), um = lt({}, ze, { data: 0 }), Xf = Rt(um), im = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, cm = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, fm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function sm(t) {
  var l = this.nativeEvent;
  return l.getModifierState ? l.getModifierState(t) : (t = fm[t]) ? !!l[t] : false;
}
function Gc() {
  return sm;
}
var om = lt({}, sn, { key: function(t) {
  if (t.key) {
    var l = im[t.key] || t.key;
    if (l !== "Unidentified") return l;
  }
  return t.type === "keypress" ? (t = Rn(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? cm[t.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Gc, charCode: function(t) {
  return t.type === "keypress" ? Rn(t) : 0;
}, keyCode: function(t) {
  return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
}, which: function(t) {
  return t.type === "keypress" ? Rn(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
} }), rm = Rt(om), dm = lt({}, Du, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Zf = Rt(dm), mm = lt({}, sn, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Gc }), hm = Rt(mm), ym = lt({}, ze, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), gm = Rt(ym), vm = lt({}, Du, { deltaX: function(t) {
  return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
}, deltaY: function(t) {
  return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
}, deltaZ: 0, deltaMode: 0 }), bm = Rt(vm), xm = lt({}, ze, { newState: 0, oldState: 0 }), pm = Rt(xm), Sm = [9, 13, 27, 32], Yc = jl && "CompositionEvent" in window, _a = null;
jl && "documentMode" in document && (_a = document.documentMode);
var zm = jl && "TextEvent" in window && !_a, Qo = jl && (!Yc || _a && 8 < _a && 11 >= _a), Lf = " ", wf = false;
function Xo(t, l) {
  switch (t) {
    case "keyup":
      return Sm.indexOf(l.keyCode) !== -1;
    case "keydown":
      return l.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function Zo(t) {
  return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
}
var Re = false;
function Tm(t, l) {
  switch (t) {
    case "compositionend":
      return Zo(l);
    case "keypress":
      return l.which !== 32 ? null : (wf = true, Lf);
    case "textInput":
      return t = l.data, t === Lf && wf ? null : t;
    default:
      return null;
  }
}
function Am(t, l) {
  if (Re) return t === "compositionend" || !Yc && Xo(t, l) ? (t = qo(), Bn = Rc = Ql = null, Re = false, t) : null;
  switch (t) {
    case "paste":
      return null;
    case "keypress":
      if (!(l.ctrlKey || l.altKey || l.metaKey) || l.ctrlKey && l.altKey) {
        if (l.char && 1 < l.char.length) return l.char;
        if (l.which) return String.fromCharCode(l.which);
      }
      return null;
    case "compositionend":
      return Qo && l.locale !== "ko" ? null : l.data;
    default:
      return null;
  }
}
var Nm = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function Vf(t) {
  var l = t && t.nodeName && t.nodeName.toLowerCase();
  return l === "input" ? !!Nm[t.type] : l === "textarea";
}
function Lo(t, l, e, a) {
  Be ? Ke ? Ke.push(a) : Ke = [a] : Be = a, l = gu(l, "onChange"), 0 < l.length && (e = new Eu("onChange", "change", null, e, a), t.push({ event: e, listeners: l }));
}
var Ma = null, Va = null;
function jm(t) {
  Yd(t, 0);
}
function Ou(t) {
  var l = ja(t);
  if (Co(l)) return t;
}
function Kf(t, l) {
  if (t === "change") return l;
}
var wo = false;
if (jl) {
  var ti;
  if (jl) {
    var li = "oninput" in document;
    if (!li) {
      var Jf = document.createElement("div");
      Jf.setAttribute("oninput", "return;"), li = typeof Jf.oninput == "function";
    }
    ti = li;
  } else ti = false;
  wo = ti && (!document.documentMode || 9 < document.documentMode);
}
function kf() {
  Ma && (Ma.detachEvent("onpropertychange", Vo), Va = Ma = null);
}
function Vo(t) {
  if (t.propertyName === "value" && Ou(Va)) {
    var l = [];
    Lo(l, Va, t, Bc(t)), Yo(jm, l);
  }
}
function Em(t, l, e) {
  t === "focusin" ? (kf(), Ma = l, Va = e, Ma.attachEvent("onpropertychange", Vo)) : t === "focusout" && kf();
}
function Dm(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown") return Ou(Va);
}
function Om(t, l) {
  if (t === "click") return Ou(l);
}
function _m(t, l) {
  if (t === "input" || t === "change") return Ou(l);
}
function Mm(t, l) {
  return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
}
var Vt = typeof Object.is == "function" ? Object.is : Mm;
function Ka(t, l) {
  if (Vt(t, l)) return true;
  if (typeof t != "object" || t === null || typeof l != "object" || l === null) return false;
  var e = Object.keys(t), a = Object.keys(l);
  if (e.length !== a.length) return false;
  for (a = 0; a < e.length; a++) {
    var n = e[a];
    if (!Bi.call(l, n) || !Vt(t[n], l[n])) return false;
  }
  return true;
}
function $f(t) {
  for (; t && t.firstChild; ) t = t.firstChild;
  return t;
}
function Wf(t, l) {
  var e = $f(t);
  t = 0;
  for (var a; e; ) {
    if (e.nodeType === 3) {
      if (a = t + e.textContent.length, t <= l && a >= l) return { node: e, offset: l - t };
      t = a;
    }
    t: {
      for (; e; ) {
        if (e.nextSibling) {
          e = e.nextSibling;
          break t;
        }
        e = e.parentNode;
      }
      e = void 0;
    }
    e = $f(e);
  }
}
function Ko(t, l) {
  return t && l ? t === l ? true : t && t.nodeType === 3 ? false : l && l.nodeType === 3 ? Ko(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : false : false;
}
function Jo(t) {
  t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
  for (var l = In(t.document); l instanceof t.HTMLIFrameElement; ) {
    try {
      var e = typeof l.contentWindow.location.href == "string";
    } catch {
      e = false;
    }
    if (e) t = l.contentWindow;
    else break;
    l = In(t.document);
  }
  return l;
}
function qc(t) {
  var l = t && t.nodeName && t.nodeName.toLowerCase();
  return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
}
var Um = jl && "documentMode" in document && 11 >= document.documentMode, Ge = null, Zi = null, Ua = null, Li = false;
function Ff(t, l, e) {
  var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
  Li || Ge == null || Ge !== In(a) || (a = Ge, "selectionStart" in a && qc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = { anchorNode: a.anchorNode, anchorOffset: a.anchorOffset, focusNode: a.focusNode, focusOffset: a.focusOffset }), Ua && Ka(Ua, a) || (Ua = a, a = gu(Zi, "onSelect"), 0 < a.length && (l = new Eu("onSelect", "select", null, l, e), t.push({ event: l, listeners: a }), l.target = Ge)));
}
function ie(t, l) {
  var e = {};
  return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
}
var Ye = { animationend: ie("Animation", "AnimationEnd"), animationiteration: ie("Animation", "AnimationIteration"), animationstart: ie("Animation", "AnimationStart"), transitionrun: ie("Transition", "TransitionRun"), transitionstart: ie("Transition", "TransitionStart"), transitioncancel: ie("Transition", "TransitionCancel"), transitionend: ie("Transition", "TransitionEnd") }, ei = {}, ko = {};
jl && (ko = document.createElement("div").style, "AnimationEvent" in window || (delete Ye.animationend.animation, delete Ye.animationiteration.animation, delete Ye.animationstart.animation), "TransitionEvent" in window || delete Ye.transitionend.transition);
function Te(t) {
  if (ei[t]) return ei[t];
  if (!Ye[t]) return t;
  var l = Ye[t], e;
  for (e in l) if (l.hasOwnProperty(e) && e in ko) return ei[t] = l[e];
  return t;
}
var $o = Te("animationend"), Wo = Te("animationiteration"), Fo = Te("animationstart"), Cm = Te("transitionrun"), Hm = Te("transitionstart"), Bm = Te("transitioncancel"), Io = Te("transitionend"), Po = /* @__PURE__ */ new Map(), wi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
wi.push("scrollEnd");
function il(t, l) {
  Po.set(t, l), Se(l, [t]);
}
var Pn = typeof reportError == "function" ? reportError : function(t) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var l = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t), error: t });
    if (!window.dispatchEvent(l)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", t);
    return;
  }
  console.error(t);
}, Jt = [], qe = 0, Qc = 0;
function _u() {
  for (var t = qe, l = Qc = qe = 0; l < t; ) {
    var e = Jt[l];
    Jt[l++] = null;
    var a = Jt[l];
    Jt[l++] = null;
    var n = Jt[l];
    Jt[l++] = null;
    var u = Jt[l];
    if (Jt[l++] = null, a !== null && n !== null) {
      var i = a.pending;
      i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
    }
    u !== 0 && tr(e, n, u);
  }
}
function Mu(t, l, e, a) {
  Jt[qe++] = t, Jt[qe++] = l, Jt[qe++] = e, Jt[qe++] = a, Qc |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
}
function Xc(t, l, e, a) {
  return Mu(t, l, e, a), tu(t);
}
function Ae(t, l) {
  return Mu(t, null, null, l), tu(t);
}
function tr(t, l, e) {
  t.lanes |= e;
  var a = t.alternate;
  a !== null && (a.lanes |= e);
  for (var n = false, u = t.return; u !== null; ) u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = true)), t = u, u = u.return;
  return t.tag === 3 ? (u = t.stateNode, n && l !== null && (n = 31 - Lt(e), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [l] : a.push(l), l.lane = e | 536870912), u) : null;
}
function tu(t) {
  if (50 < Xa) throw Xa = 0, rc = null, Error(x(185));
  for (var l = t.return; l !== null; ) t = l, l = t.return;
  return t.tag === 3 ? t.stateNode : null;
}
var Qe = {};
function Rm(t, l, e, a) {
  this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function qt(t, l, e, a) {
  return new Rm(t, l, e, a);
}
function Zc(t) {
  return t = t.prototype, !(!t || !t.isReactComponent);
}
function Tl(t, l) {
  var e = t.alternate;
  return e === null ? (e = qt(t.tag, l, t.key, t.mode), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
}
function lr(t, l) {
  t.flags &= 65011714;
  var e = t.alternate;
  return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }), t;
}
function Gn(t, l, e, a, n, u) {
  var i = 0;
  if (a = t, typeof t == "function") Zc(t) && (i = 1);
  else if (typeof t == "string") i = Xh(t, e, ol.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
  else t: switch (t) {
    case Mi:
      return t = qt(31, e, l, n), t.elementType = Mi, t.lanes = u, t;
    case Ue:
      return de(e.children, n, u, l);
    case po:
      i = 8, n |= 24;
      break;
    case Di:
      return t = qt(12, e, l, n | 2), t.elementType = Di, t.lanes = u, t;
    case Oi:
      return t = qt(13, e, l, n), t.elementType = Oi, t.lanes = u, t;
    case _i:
      return t = qt(19, e, l, n), t.elementType = _i, t.lanes = u, t;
    default:
      if (typeof t == "object" && t !== null) switch (t.$$typeof) {
        case pl:
          i = 10;
          break t;
        case So:
          i = 9;
          break t;
        case Dc:
          i = 11;
          break t;
        case Oc:
          i = 14;
          break t;
        case Cl:
          i = 16, a = null;
          break t;
      }
      i = 29, e = Error(x(130, t === null ? "null" : typeof t, "")), a = null;
  }
  return l = qt(i, e, l, n), l.elementType = t, l.type = a, l.lanes = u, l;
}
function de(t, l, e, a) {
  return t = qt(7, t, a, l), t.lanes = e, t;
}
function ai(t, l, e) {
  return t = qt(6, t, null, l), t.lanes = e, t;
}
function er(t) {
  var l = qt(18, null, null, 0);
  return l.stateNode = t, l;
}
function ni(t, l, e) {
  return l = qt(4, t.children !== null ? t.children : [], t.key, l), l.lanes = e, l.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }, l;
}
var If = /* @__PURE__ */ new WeakMap();
function It(t, l) {
  if (typeof t == "object" && t !== null) {
    var e = If.get(t);
    return e !== void 0 ? e : (l = { value: t, source: l, stack: Uf(l) }, If.set(t, l), l);
  }
  return { value: t, source: l, stack: Uf(l) };
}
var Xe = [], Ze = 0, lu = null, Ja = 0, $t = [], Wt = 0, Pl = null, cl = 1, fl = "";
function bl(t, l) {
  Xe[Ze++] = Ja, Xe[Ze++] = lu, lu = t, Ja = l;
}
function ar(t, l, e) {
  $t[Wt++] = cl, $t[Wt++] = fl, $t[Wt++] = Pl, Pl = t;
  var a = cl;
  t = fl;
  var n = 32 - Lt(a) - 1;
  a &= ~(1 << n), e += 1;
  var u = 32 - Lt(l) + n;
  if (30 < u) {
    var i = n - n % 5;
    u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, cl = 1 << 32 - Lt(l) + n | e << n | a, fl = u + t;
  } else cl = 1 << u | e << n | a, fl = t;
}
function Lc(t) {
  t.return !== null && (bl(t, 1), ar(t, 1, 0));
}
function wc(t) {
  for (; t === lu; ) lu = Xe[--Ze], Xe[Ze] = null, Ja = Xe[--Ze], Xe[Ze] = null;
  for (; t === Pl; ) Pl = $t[--Wt], $t[Wt] = null, fl = $t[--Wt], $t[Wt] = null, cl = $t[--Wt], $t[Wt] = null;
}
function nr(t, l) {
  $t[Wt++] = cl, $t[Wt++] = fl, $t[Wt++] = Pl, cl = l.id, fl = l.overflow, Pl = t;
}
var zt = null, P = null, X = false, Vl = null, Pt = false, Vi = Error(x(519));
function te(t) {
  var l = Error(x(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
  throw ka(It(l, t)), Vi;
}
function Pf(t) {
  var l = t.stateNode, e = t.type, a = t.memoizedProps;
  switch (l[St] = t, l[Bt] = a, e) {
    case "dialog":
      G("cancel", l), G("close", l);
      break;
    case "iframe":
    case "object":
    case "embed":
      G("load", l);
      break;
    case "video":
    case "audio":
      for (e = 0; e < Ia.length; e++) G(Ia[e], l);
      break;
    case "source":
      G("error", l);
      break;
    case "img":
    case "image":
    case "link":
      G("error", l), G("load", l);
      break;
    case "details":
      G("toggle", l);
      break;
    case "input":
      G("invalid", l), Ho(l, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, true);
      break;
    case "select":
      G("invalid", l);
      break;
    case "textarea":
      G("invalid", l), Ro(l, a.value, a.defaultValue, a.children);
  }
  e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === true || Qd(l.textContent, e) ? (a.popover != null && (G("beforetoggle", l), G("toggle", l)), a.onScroll != null && G("scroll", l), a.onScrollEnd != null && G("scrollend", l), a.onClick != null && (l.onclick = Sl), l = true) : l = false, l || te(t, true);
}
function ts(t) {
  for (zt = t.return; zt; ) switch (zt.tag) {
    case 5:
    case 31:
    case 13:
      Pt = false;
      return;
    case 27:
    case 3:
      Pt = true;
      return;
    default:
      zt = zt.return;
  }
}
function Ee(t) {
  if (t !== zt) return false;
  if (!X) return ts(t), X = true, false;
  var l = t.tag, e;
  if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || gc(t.type, t.memoizedProps)), e = !e), e && P && te(t), ts(t), l === 13) {
    if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(x(317));
    P = Qs(t);
  } else if (l === 31) {
    if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(x(317));
    P = Qs(t);
  } else l === 27 ? (l = P, ne(t.type) ? (t = pc, pc = null, P = t) : P = l) : P = zt ? ll(t.stateNode.nextSibling) : null;
  return true;
}
function ge() {
  P = zt = null, X = false;
}
function ui() {
  var t = Vl;
  return t !== null && (Ct === null ? Ct = t : Ct.push.apply(Ct, t), Vl = null), t;
}
function ka(t) {
  Vl === null ? Vl = [t] : Vl.push(t);
}
var Ki = rl(null), Ne = null, zl = null;
function Bl(t, l, e) {
  F(Ki, l._currentValue), l._currentValue = e;
}
function Al(t) {
  t._currentValue = Ki.current, xt(Ki);
}
function Ji(t, l, e) {
  for (; t !== null; ) {
    var a = t.alternate;
    if ((t.childLanes & l) !== l ? (t.childLanes |= l, a !== null && (a.childLanes |= l)) : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l), t === e) break;
    t = t.return;
  }
}
function ki(t, l, e, a) {
  var n = t.child;
  for (n !== null && (n.return = t); n !== null; ) {
    var u = n.dependencies;
    if (u !== null) {
      var i = n.child;
      u = u.firstContext;
      t: for (; u !== null; ) {
        var c = u;
        u = n;
        for (var s = 0; s < l.length; s++) if (c.context === l[s]) {
          u.lanes |= e, c = u.alternate, c !== null && (c.lanes |= e), Ji(u.return, e, t), a || (i = null);
          break t;
        }
        u = c.next;
      }
    } else if (n.tag === 18) {
      if (i = n.return, i === null) throw Error(x(341));
      i.lanes |= e, u = i.alternate, u !== null && (u.lanes |= e), Ji(i, e, t), i = null;
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
function ra(t, l, e, a) {
  t = null;
  for (var n = l, u = false; n !== null; ) {
    if (!u) {
      if (n.flags & 524288) u = true;
      else if (n.flags & 262144) break;
    }
    if (n.tag === 10) {
      var i = n.alternate;
      if (i === null) throw Error(x(387));
      if (i = i.memoizedProps, i !== null) {
        var c = n.type;
        Vt(n.pendingProps.value, i.value) || (t !== null ? t.push(c) : t = [c]);
      }
    } else if (n === kn.current) {
      if (i = n.alternate, i === null) throw Error(x(387));
      i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(tn) : t = [tn]);
    }
    n = n.return;
  }
  t !== null && ki(l, t, e, a), l.flags |= 262144;
}
function eu(t) {
  for (t = t.firstContext; t !== null; ) {
    if (!Vt(t.context._currentValue, t.memoizedValue)) return true;
    t = t.next;
  }
  return false;
}
function ve(t) {
  Ne = t, zl = null, t = t.dependencies, t !== null && (t.firstContext = null);
}
function Tt(t) {
  return ur(Ne, t);
}
function Tn(t, l) {
  return Ne === null && ve(t), ur(t, l);
}
function ur(t, l) {
  var e = l._currentValue;
  if (l = { context: l, memoizedValue: e, next: null }, zl === null) {
    if (t === null) throw Error(x(308));
    zl = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
  } else zl = zl.next = l;
  return e;
}
var Gm = typeof AbortController < "u" ? AbortController : function() {
  var t = [], l = this.signal = { aborted: false, addEventListener: function(e, a) {
    t.push(a);
  } };
  this.abort = function() {
    l.aborted = true, t.forEach(function(e) {
      return e();
    });
  };
}, Ym = gt.unstable_scheduleCallback, qm = gt.unstable_NormalPriority, mt = { $$typeof: pl, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
function Vc() {
  return { controller: new Gm(), data: /* @__PURE__ */ new Map(), refCount: 0 };
}
function on(t) {
  t.refCount--, t.refCount === 0 && Ym(qm, function() {
    t.controller.abort();
  });
}
var Ca = null, $i = 0, ta = 0, Je = null;
function Qm(t, l) {
  if (Ca === null) {
    var e = Ca = [];
    $i = 0, ta = vf(), Je = { status: "pending", value: void 0, then: function(a) {
      e.push(a);
    } };
  }
  return $i++, l.then(ls, ls), l;
}
function ls() {
  if (--$i === 0 && Ca !== null) {
    Je !== null && (Je.status = "fulfilled");
    var t = Ca;
    Ca = null, ta = 0, Je = null;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
}
function Xm(t, l) {
  var e = [], a = { status: "pending", value: null, reason: null, then: function(n) {
    e.push(n);
  } };
  return t.then(function() {
    a.status = "fulfilled", a.value = l;
    for (var n = 0; n < e.length; n++) (0, e[n])(l);
  }, function(n) {
    for (a.status = "rejected", a.reason = n, n = 0; n < e.length; n++) (0, e[n])(void 0);
  }), a;
}
var es = D.S;
D.S = function(t, l) {
  xd = Xt(), typeof l == "object" && l !== null && typeof l.then == "function" && Qm(t, l), es !== null && es(t, l);
};
var me = rl(null);
function Kc() {
  var t = me.current;
  return t !== null ? t : W.pooledCache;
}
function Yn(t, l) {
  l === null ? F(me, me.current) : F(me, l.pool);
}
function ir() {
  var t = Kc();
  return t === null ? null : { parent: mt._currentValue, pool: t };
}
var da = Error(x(460)), Jc = Error(x(474)), Uu = Error(x(542)), au = { then: function() {
} };
function as(t) {
  return t = t.status, t === "fulfilled" || t === "rejected";
}
function cr(t, l, e) {
  switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(Sl, Sl), l = e), l.status) {
    case "fulfilled":
      return l.value;
    case "rejected":
      throw t = l.reason, us(t), t;
    default:
      if (typeof l.status == "string") l.then(Sl, Sl);
      else {
        if (t = W, t !== null && 100 < t.shellSuspendCounter) throw Error(x(482));
        t = l, t.status = "pending", t.then(function(a) {
          if (l.status === "pending") {
            var n = l;
            n.status = "fulfilled", n.value = a;
          }
        }, function(a) {
          if (l.status === "pending") {
            var n = l;
            n.status = "rejected", n.reason = a;
          }
        });
      }
      switch (l.status) {
        case "fulfilled":
          return l.value;
        case "rejected":
          throw t = l.reason, us(t), t;
      }
      throw he = l, da;
  }
}
function se(t) {
  try {
    var l = t._init;
    return l(t._payload);
  } catch (e) {
    throw e !== null && typeof e == "object" && typeof e.then == "function" ? (he = e, da) : e;
  }
}
var he = null;
function ns() {
  if (he === null) throw Error(x(459));
  var t = he;
  return he = null, t;
}
function us(t) {
  if (t === da || t === Uu) throw Error(x(483));
}
var ke = null, $a = 0;
function An(t) {
  var l = $a;
  return $a += 1, ke === null && (ke = []), cr(ke, t, l);
}
function pa(t, l) {
  l = l.props.ref, t.ref = l !== void 0 ? l : null;
}
function Nn(t, l) {
  throw l.$$typeof === E0 ? Error(x(525)) : (t = Object.prototype.toString.call(l), Error(x(31, t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t)));
}
function fr(t) {
  function l(d, o) {
    if (t) {
      var g = d.deletions;
      g === null ? (d.deletions = [o], d.flags |= 16) : g.push(o);
    }
  }
  function e(d, o) {
    if (!t) return null;
    for (; o !== null; ) l(d, o), o = o.sibling;
    return null;
  }
  function a(d) {
    for (var o = /* @__PURE__ */ new Map(); d !== null; ) d.key !== null ? o.set(d.key, d) : o.set(d.index, d), d = d.sibling;
    return o;
  }
  function n(d, o) {
    return d = Tl(d, o), d.index = 0, d.sibling = null, d;
  }
  function u(d, o, g) {
    return d.index = g, t ? (g = d.alternate, g !== null ? (g = g.index, g < o ? (d.flags |= 67108866, o) : g) : (d.flags |= 67108866, o)) : (d.flags |= 1048576, o);
  }
  function i(d) {
    return t && d.alternate === null && (d.flags |= 67108866), d;
  }
  function c(d, o, g, b) {
    return o === null || o.tag !== 6 ? (o = ai(g, d.mode, b), o.return = d, o) : (o = n(o, g), o.return = d, o);
  }
  function s(d, o, g, b) {
    var N = g.type;
    return N === Ue ? v(d, o, g.props.children, b, g.key) : o !== null && (o.elementType === N || typeof N == "object" && N !== null && N.$$typeof === Cl && se(N) === o.type) ? (o = n(o, g.props), pa(o, g), o.return = d, o) : (o = Gn(g.type, g.key, g.props, null, d.mode, b), pa(o, g), o.return = d, o);
  }
  function r(d, o, g, b) {
    return o === null || o.tag !== 4 || o.stateNode.containerInfo !== g.containerInfo || o.stateNode.implementation !== g.implementation ? (o = ni(g, d.mode, b), o.return = d, o) : (o = n(o, g.children || []), o.return = d, o);
  }
  function v(d, o, g, b, N) {
    return o === null || o.tag !== 7 ? (o = de(g, d.mode, b, N), o.return = d, o) : (o = n(o, g), o.return = d, o);
  }
  function y(d, o, g) {
    if (typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint") return o = ai("" + o, d.mode, g), o.return = d, o;
    if (typeof o == "object" && o !== null) {
      switch (o.$$typeof) {
        case vn:
          return g = Gn(o.type, o.key, o.props, null, d.mode, g), pa(g, o), g.return = d, g;
        case Aa:
          return o = ni(o, d.mode, g), o.return = d, o;
        case Cl:
          return o = se(o), y(d, o, g);
      }
      if (Na(o) || va(o)) return o = de(o, d.mode, g, null), o.return = d, o;
      if (typeof o.then == "function") return y(d, An(o), g);
      if (o.$$typeof === pl) return y(d, Tn(d, o), g);
      Nn(d, o);
    }
    return null;
  }
  function m(d, o, g, b) {
    var N = o !== null ? o.key : null;
    if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint") return N !== null ? null : c(d, o, "" + g, b);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case vn:
          return g.key === N ? s(d, o, g, b) : null;
        case Aa:
          return g.key === N ? r(d, o, g, b) : null;
        case Cl:
          return g = se(g), m(d, o, g, b);
      }
      if (Na(g) || va(g)) return N !== null ? null : v(d, o, g, b, null);
      if (typeof g.then == "function") return m(d, o, An(g), b);
      if (g.$$typeof === pl) return m(d, o, Tn(d, g), b);
      Nn(d, g);
    }
    return null;
  }
  function h(d, o, g, b, N) {
    if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint") return d = d.get(g) || null, c(o, d, "" + b, N);
    if (typeof b == "object" && b !== null) {
      switch (b.$$typeof) {
        case vn:
          return d = d.get(b.key === null ? g : b.key) || null, s(o, d, b, N);
        case Aa:
          return d = d.get(b.key === null ? g : b.key) || null, r(o, d, b, N);
        case Cl:
          return b = se(b), h(d, o, g, b, N);
      }
      if (Na(b) || va(b)) return d = d.get(g) || null, v(o, d, b, N, null);
      if (typeof b.then == "function") return h(d, o, g, An(b), N);
      if (b.$$typeof === pl) return h(d, o, g, Tn(o, b), N);
      Nn(o, b);
    }
    return null;
  }
  function p(d, o, g, b) {
    for (var N = null, _ = null, T = o, j = o = 0, O = null; T !== null && j < g.length; j++) {
      T.index > j ? (O = T, T = null) : O = T.sibling;
      var M = m(d, T, g[j], b);
      if (M === null) {
        T === null && (T = O);
        break;
      }
      t && T && M.alternate === null && l(d, T), o = u(M, o, j), _ === null ? N = M : _.sibling = M, _ = M, T = O;
    }
    if (j === g.length) return e(d, T), X && bl(d, j), N;
    if (T === null) {
      for (; j < g.length; j++) T = y(d, g[j], b), T !== null && (o = u(T, o, j), _ === null ? N = T : _.sibling = T, _ = T);
      return X && bl(d, j), N;
    }
    for (T = a(T); j < g.length; j++) O = h(T, d, j, g[j], b), O !== null && (t && O.alternate !== null && T.delete(O.key === null ? j : O.key), o = u(O, o, j), _ === null ? N = O : _.sibling = O, _ = O);
    return t && T.forEach(function(at) {
      return l(d, at);
    }), X && bl(d, j), N;
  }
  function S(d, o, g, b) {
    if (g == null) throw Error(x(151));
    for (var N = null, _ = null, T = o, j = o = 0, O = null, M = g.next(); T !== null && !M.done; j++, M = g.next()) {
      T.index > j ? (O = T, T = null) : O = T.sibling;
      var at = m(d, T, M.value, b);
      if (at === null) {
        T === null && (T = O);
        break;
      }
      t && T && at.alternate === null && l(d, T), o = u(at, o, j), _ === null ? N = at : _.sibling = at, _ = at, T = O;
    }
    if (M.done) return e(d, T), X && bl(d, j), N;
    if (T === null) {
      for (; !M.done; j++, M = g.next()) M = y(d, M.value, b), M !== null && (o = u(M, o, j), _ === null ? N = M : _.sibling = M, _ = M);
      return X && bl(d, j), N;
    }
    for (T = a(T); !M.done; j++, M = g.next()) M = h(T, d, j, M.value, b), M !== null && (t && M.alternate !== null && T.delete(M.key === null ? j : M.key), o = u(M, o, j), _ === null ? N = M : _.sibling = M, _ = M);
    return t && T.forEach(function(q) {
      return l(d, q);
    }), X && bl(d, j), N;
  }
  function z(d, o, g, b) {
    if (typeof g == "object" && g !== null && g.type === Ue && g.key === null && (g = g.props.children), typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case vn:
          t: {
            for (var N = g.key; o !== null; ) {
              if (o.key === N) {
                if (N = g.type, N === Ue) {
                  if (o.tag === 7) {
                    e(d, o.sibling), b = n(o, g.props.children), b.return = d, d = b;
                    break t;
                  }
                } else if (o.elementType === N || typeof N == "object" && N !== null && N.$$typeof === Cl && se(N) === o.type) {
                  e(d, o.sibling), b = n(o, g.props), pa(b, g), b.return = d, d = b;
                  break t;
                }
                e(d, o);
                break;
              } else l(d, o);
              o = o.sibling;
            }
            g.type === Ue ? (b = de(g.props.children, d.mode, b, g.key), b.return = d, d = b) : (b = Gn(g.type, g.key, g.props, null, d.mode, b), pa(b, g), b.return = d, d = b);
          }
          return i(d);
        case Aa:
          t: {
            for (N = g.key; o !== null; ) {
              if (o.key === N) if (o.tag === 4 && o.stateNode.containerInfo === g.containerInfo && o.stateNode.implementation === g.implementation) {
                e(d, o.sibling), b = n(o, g.children || []), b.return = d, d = b;
                break t;
              } else {
                e(d, o);
                break;
              }
              else l(d, o);
              o = o.sibling;
            }
            b = ni(g, d.mode, b), b.return = d, d = b;
          }
          return i(d);
        case Cl:
          return g = se(g), z(d, o, g, b);
      }
      if (Na(g)) return p(d, o, g, b);
      if (va(g)) {
        if (N = va(g), typeof N != "function") throw Error(x(150));
        return g = N.call(g), S(d, o, g, b);
      }
      if (typeof g.then == "function") return z(d, o, An(g), b);
      if (g.$$typeof === pl) return z(d, o, Tn(d, g), b);
      Nn(d, g);
    }
    return typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint" ? (g = "" + g, o !== null && o.tag === 6 ? (e(d, o.sibling), b = n(o, g), b.return = d, d = b) : (e(d, o), b = ai(g, d.mode, b), b.return = d, d = b), i(d)) : e(d, o);
  }
  return function(d, o, g, b) {
    try {
      $a = 0;
      var N = z(d, o, g, b);
      return ke = null, N;
    } catch (T) {
      if (T === da || T === Uu) throw T;
      var _ = qt(29, T, null, d.mode);
      return _.lanes = b, _.return = d, _;
    } finally {
    }
  };
}
var be = fr(true), sr = fr(false), Hl = false;
function kc(t) {
  t.updateQueue = { baseState: t.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
}
function Wi(t, l) {
  t = t.updateQueue, l.updateQueue === t && (l.updateQueue = { baseState: t.baseState, firstBaseUpdate: t.firstBaseUpdate, lastBaseUpdate: t.lastBaseUpdate, shared: t.shared, callbacks: null });
}
function Kl(t) {
  return { lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Jl(t, l, e) {
  var a = t.updateQueue;
  if (a === null) return null;
  if (a = a.shared, Z & 2) {
    var n = a.pending;
    return n === null ? l.next = l : (l.next = n.next, n.next = l), a.pending = l, l = tu(t), tr(t, null, e), l;
  }
  return Mu(t, a, l, e), tu(t);
}
function Ha(t, l, e) {
  if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
    var a = l.lanes;
    a &= t.pendingLanes, e |= a, l.lanes = e, Eo(t, e);
  }
}
function ii(t, l) {
  var e = t.updateQueue, a = t.alternate;
  if (a !== null && (a = a.updateQueue, e === a)) {
    var n = null, u = null;
    if (e = e.firstBaseUpdate, e !== null) {
      do {
        var i = { lane: e.lane, tag: e.tag, payload: e.payload, callback: null, next: null };
        u === null ? n = u = i : u = u.next = i, e = e.next;
      } while (e !== null);
      u === null ? n = u = l : u = u.next = l;
    } else n = u = l;
    e = { baseState: a.baseState, firstBaseUpdate: n, lastBaseUpdate: u, shared: a.shared, callbacks: a.callbacks }, t.updateQueue = e;
    return;
  }
  t = e.lastBaseUpdate, t === null ? e.firstBaseUpdate = l : t.next = l, e.lastBaseUpdate = l;
}
var Fi = false;
function Ba() {
  if (Fi) {
    var t = Je;
    if (t !== null) throw t;
  }
}
function Ra(t, l, e, a) {
  Fi = false;
  var n = t.updateQueue;
  Hl = false;
  var u = n.firstBaseUpdate, i = n.lastBaseUpdate, c = n.shared.pending;
  if (c !== null) {
    n.shared.pending = null;
    var s = c, r = s.next;
    s.next = null, i === null ? u = r : i.next = r, i = s;
    var v = t.alternate;
    v !== null && (v = v.updateQueue, c = v.lastBaseUpdate, c !== i && (c === null ? v.firstBaseUpdate = r : c.next = r, v.lastBaseUpdate = s));
  }
  if (u !== null) {
    var y = n.baseState;
    i = 0, v = r = s = null, c = u;
    do {
      var m = c.lane & -536870913, h = m !== c.lane;
      if (h ? (Q & m) === m : (a & m) === m) {
        m !== 0 && m === ta && (Fi = true), v !== null && (v = v.next = { lane: 0, tag: c.tag, payload: c.payload, callback: null, next: null });
        t: {
          var p = t, S = c;
          m = l;
          var z = e;
          switch (S.tag) {
            case 1:
              if (p = S.payload, typeof p == "function") {
                y = p.call(z, y, m);
                break t;
              }
              y = p;
              break t;
            case 3:
              p.flags = p.flags & -65537 | 128;
            case 0:
              if (p = S.payload, m = typeof p == "function" ? p.call(z, y, m) : p, m == null) break t;
              y = lt({}, y, m);
              break t;
            case 2:
              Hl = true;
          }
        }
        m = c.callback, m !== null && (t.flags |= 64, h && (t.flags |= 8192), h = n.callbacks, h === null ? n.callbacks = [m] : h.push(m));
      } else h = { lane: m, tag: c.tag, payload: c.payload, callback: c.callback, next: null }, v === null ? (r = v = h, s = y) : v = v.next = h, i |= m;
      if (c = c.next, c === null) {
        if (c = n.shared.pending, c === null) break;
        h = c, c = h.next, h.next = null, n.lastBaseUpdate = h, n.shared.pending = null;
      }
    } while (true);
    v === null && (s = y), n.baseState = s, n.firstBaseUpdate = r, n.lastBaseUpdate = v, u === null && (n.shared.lanes = 0), ee |= i, t.lanes = i, t.memoizedState = y;
  }
}
function or(t, l) {
  if (typeof t != "function") throw Error(x(191, t));
  t.call(l);
}
function rr(t, l) {
  var e = t.callbacks;
  if (e !== null) for (t.callbacks = null, t = 0; t < e.length; t++) or(e[t], l);
}
var la = rl(null), nu = rl(0);
function is(t, l) {
  t = _l, F(nu, t), F(la, l), _l = t | l.baseLanes;
}
function Ii() {
  F(nu, _l), F(la, la.current);
}
function $c() {
  _l = nu.current, xt(la), xt(nu);
}
var Kt = rl(null), tl = null;
function Rl(t) {
  var l = t.alternate;
  F(ct, ct.current & 1), F(Kt, t), tl === null && (l === null || la.current !== null || l.memoizedState !== null) && (tl = t);
}
function Pi(t) {
  F(ct, ct.current), F(Kt, t), tl === null && (tl = t);
}
function dr(t) {
  t.tag === 22 ? (F(ct, ct.current), F(Kt, t), tl === null && (tl = t)) : Gl();
}
function Gl() {
  F(ct, ct.current), F(Kt, Kt.current);
}
function Yt(t) {
  xt(Kt), tl === t && (tl = null), xt(ct);
}
var ct = rl(0);
function uu(t) {
  for (var l = t; l !== null; ) {
    if (l.tag === 13) {
      var e = l.memoizedState;
      if (e !== null && (e = e.dehydrated, e === null || bc(e) || xc(e))) return l;
    } else if (l.tag === 19 && (l.memoizedProps.revealOrder === "forwards" || l.memoizedProps.revealOrder === "backwards" || l.memoizedProps.revealOrder === "unstable_legacy-backwards" || l.memoizedProps.revealOrder === "together")) {
      if (l.flags & 128) return l;
    } else if (l.child !== null) {
      l.child.return = l, l = l.child;
      continue;
    }
    if (l === t) break;
    for (; l.sibling === null; ) {
      if (l.return === null || l.return === t) return null;
      l = l.return;
    }
    l.sibling.return = l.return, l = l.sibling;
  }
  return null;
}
var El = 0, B = null, k = null, rt = null, iu = false, $e = false, xe = false, cu = 0, Wa = 0, We = null, Zm = 0;
function ut() {
  throw Error(x(321));
}
function Wc(t, l) {
  if (l === null) return false;
  for (var e = 0; e < l.length && e < t.length; e++) if (!Vt(t[e], l[e])) return false;
  return true;
}
function Fc(t, l, e, a, n, u) {
  return El = u, B = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, D.H = t === null || t.memoizedState === null ? Lr : sf, xe = false, u = e(a, n), xe = false, $e && (u = hr(l, e, a, n)), mr(t), u;
}
function mr(t) {
  D.H = Fa;
  var l = k !== null && k.next !== null;
  if (El = 0, rt = k = B = null, iu = false, Wa = 0, We = null, l) throw Error(x(300));
  t === null || ht || (t = t.dependencies, t !== null && eu(t) && (ht = true));
}
function hr(t, l, e, a) {
  B = t;
  var n = 0;
  do {
    if ($e && (We = null), Wa = 0, $e = false, 25 <= n) throw Error(x(301));
    if (n += 1, rt = k = null, t.updateQueue != null) {
      var u = t.updateQueue;
      u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
    }
    D.H = wr, u = l(e, a);
  } while ($e);
  return u;
}
function Lm() {
  var t = D.H, l = t.useState()[0];
  return l = typeof l.then == "function" ? rn(l) : l, t = t.useState()[0], (k !== null ? k.memoizedState : null) !== t && (B.flags |= 1024), l;
}
function Ic() {
  var t = cu !== 0;
  return cu = 0, t;
}
function Pc(t, l, e) {
  l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
}
function tf(t) {
  if (iu) {
    for (t = t.memoizedState; t !== null; ) {
      var l = t.queue;
      l !== null && (l.pending = null), t = t.next;
    }
    iu = false;
  }
  El = 0, rt = k = B = null, $e = false, Wa = cu = 0, We = null;
}
function jt() {
  var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return rt === null ? B.memoizedState = rt = t : rt = rt.next = t, rt;
}
function ft() {
  if (k === null) {
    var t = B.alternate;
    t = t !== null ? t.memoizedState : null;
  } else t = k.next;
  var l = rt === null ? B.memoizedState : rt.next;
  if (l !== null) rt = l, k = t;
  else {
    if (t === null) throw B.alternate === null ? Error(x(467)) : Error(x(310));
    k = t, t = { memoizedState: k.memoizedState, baseState: k.baseState, baseQueue: k.baseQueue, queue: k.queue, next: null }, rt === null ? B.memoizedState = rt = t : rt = rt.next = t;
  }
  return rt;
}
function Cu() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function rn(t) {
  var l = Wa;
  return Wa += 1, We === null && (We = []), t = cr(We, t, l), l = B, (rt === null ? l.memoizedState : rt.next) === null && (l = l.alternate, D.H = l === null || l.memoizedState === null ? Lr : sf), t;
}
function Hu(t) {
  if (t !== null && typeof t == "object") {
    if (typeof t.then == "function") return rn(t);
    if (t.$$typeof === pl) return Tt(t);
  }
  throw Error(x(438, String(t)));
}
function lf(t) {
  var l = null, e = B.updateQueue;
  if (e !== null && (l = e.memoCache), l == null) {
    var a = B.alternate;
    a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = { data: a.data.map(function(n) {
      return n.slice();
    }), index: 0 })));
  }
  if (l == null && (l = { data: [], index: 0 }), e === null && (e = Cu(), B.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0) for (e = l.data[l.index] = Array(t), a = 0; a < t; a++) e[a] = D0;
  return l.index++, e;
}
function Dl(t, l) {
  return typeof l == "function" ? l(t) : l;
}
function qn(t) {
  var l = ft();
  return ef(l, k, t);
}
function ef(t, l, e) {
  var a = t.queue;
  if (a === null) throw Error(x(311));
  a.lastRenderedReducer = e;
  var n = t.baseQueue, u = a.pending;
  if (u !== null) {
    if (n !== null) {
      var i = n.next;
      n.next = u.next, u.next = i;
    }
    l.baseQueue = n = u, a.pending = null;
  }
  if (u = t.baseState, n === null) t.memoizedState = u;
  else {
    l = n.next;
    var c = i = null, s = null, r = l, v = false;
    do {
      var y = r.lane & -536870913;
      if (y !== r.lane ? (Q & y) === y : (El & y) === y) {
        var m = r.revertLane;
        if (m === 0) s !== null && (s = s.next = { lane: 0, revertLane: 0, gesture: null, action: r.action, hasEagerState: r.hasEagerState, eagerState: r.eagerState, next: null }), y === ta && (v = true);
        else if ((El & m) === m) {
          r = r.next, m === ta && (v = true);
          continue;
        } else y = { lane: 0, revertLane: r.revertLane, gesture: null, action: r.action, hasEagerState: r.hasEagerState, eagerState: r.eagerState, next: null }, s === null ? (c = s = y, i = u) : s = s.next = y, B.lanes |= m, ee |= m;
        y = r.action, xe && e(u, y), u = r.hasEagerState ? r.eagerState : e(u, y);
      } else m = { lane: y, revertLane: r.revertLane, gesture: r.gesture, action: r.action, hasEagerState: r.hasEagerState, eagerState: r.eagerState, next: null }, s === null ? (c = s = m, i = u) : s = s.next = m, B.lanes |= y, ee |= y;
      r = r.next;
    } while (r !== null && r !== l);
    if (s === null ? i = u : s.next = c, !Vt(u, t.memoizedState) && (ht = true, v && (e = Je, e !== null))) throw e;
    t.memoizedState = u, t.baseState = i, t.baseQueue = s, a.lastRenderedState = u;
  }
  return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
}
function ci(t) {
  var l = ft(), e = l.queue;
  if (e === null) throw Error(x(311));
  e.lastRenderedReducer = t;
  var a = e.dispatch, n = e.pending, u = l.memoizedState;
  if (n !== null) {
    e.pending = null;
    var i = n = n.next;
    do
      u = t(u, i.action), i = i.next;
    while (i !== n);
    Vt(u, l.memoizedState) || (ht = true), l.memoizedState = u, l.baseQueue === null && (l.baseState = u), e.lastRenderedState = u;
  }
  return [u, a];
}
function yr(t, l, e) {
  var a = B, n = ft(), u = X;
  if (u) {
    if (e === void 0) throw Error(x(407));
    e = e();
  } else e = l();
  var i = !Vt((k || n).memoizedState, e);
  if (i && (n.memoizedState = e, ht = true), n = n.queue, af(br.bind(null, a, n, t), [t]), n.getSnapshot !== l || i || rt !== null && rt.memoizedState.tag & 1) {
    if (a.flags |= 2048, ea(9, { destroy: void 0 }, vr.bind(null, a, n, e, l), null), W === null) throw Error(x(349));
    u || El & 127 || gr(a, l, e);
  }
  return e;
}
function gr(t, l, e) {
  t.flags |= 16384, t = { getSnapshot: l, value: e }, l = B.updateQueue, l === null ? (l = Cu(), B.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
}
function vr(t, l, e, a) {
  l.value = e, l.getSnapshot = a, xr(l) && pr(t);
}
function br(t, l, e) {
  return e(function() {
    xr(l) && pr(t);
  });
}
function xr(t) {
  var l = t.getSnapshot;
  t = t.value;
  try {
    var e = l();
    return !Vt(t, e);
  } catch {
    return true;
  }
}
function pr(t) {
  var l = Ae(t, 2);
  l !== null && Ht(l, t, 2);
}
function tc(t) {
  var l = jt();
  if (typeof t == "function") {
    var e = t;
    if (t = e(), xe) {
      ql(true);
      try {
        e();
      } finally {
        ql(false);
      }
    }
  }
  return l.memoizedState = l.baseState = t, l.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Dl, lastRenderedState: t }, l;
}
function Sr(t, l, e, a) {
  return t.baseState = e, ef(t, k, typeof a == "function" ? a : Dl);
}
function wm(t, l, e, a, n) {
  if (Ru(t)) throw Error(x(485));
  if (t = l.action, t !== null) {
    var u = { payload: n, action: t, next: null, isTransition: true, status: "pending", value: null, reason: null, listeners: [], then: function(i) {
      u.listeners.push(i);
    } };
    D.T !== null ? e(true) : u.isTransition = false, a(u), e = l.pending, e === null ? (u.next = l.pending = u, zr(l, u)) : (u.next = e.next, l.pending = e.next = u);
  }
}
function zr(t, l) {
  var e = l.action, a = l.payload, n = t.state;
  if (l.isTransition) {
    var u = D.T, i = {};
    D.T = i;
    try {
      var c = e(n, a), s = D.S;
      s !== null && s(i, c), cs(t, l, c);
    } catch (r) {
      lc(t, l, r);
    } finally {
      u !== null && i.types !== null && (u.types = i.types), D.T = u;
    }
  } else try {
    u = e(n, a), cs(t, l, u);
  } catch (r) {
    lc(t, l, r);
  }
}
function cs(t, l, e) {
  e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(function(a) {
    fs(t, l, a);
  }, function(a) {
    return lc(t, l, a);
  }) : fs(t, l, e);
}
function fs(t, l, e) {
  l.status = "fulfilled", l.value = e, Tr(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, zr(t, e)));
}
function lc(t, l, e) {
  var a = t.pending;
  if (t.pending = null, a !== null) {
    a = a.next;
    do
      l.status = "rejected", l.reason = e, Tr(l), l = l.next;
    while (l !== a);
  }
  t.action = null;
}
function Tr(t) {
  t = t.listeners;
  for (var l = 0; l < t.length; l++) (0, t[l])();
}
function Ar(t, l) {
  return l;
}
function ss(t, l) {
  if (X) {
    var e = W.formState;
    if (e !== null) {
      t: {
        var a = B;
        if (X) {
          if (P) {
            l: {
              for (var n = P, u = Pt; n.nodeType !== 8; ) {
                if (!u) {
                  n = null;
                  break l;
                }
                if (n = ll(n.nextSibling), n === null) {
                  n = null;
                  break l;
                }
              }
              u = n.data, n = u === "F!" || u === "F" ? n : null;
            }
            if (n) {
              P = ll(n.nextSibling), a = n.data === "F!";
              break t;
            }
          }
          te(a);
        }
        a = false;
      }
      a && (l = e[0]);
    }
  }
  return e = jt(), e.memoizedState = e.baseState = l, a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Ar, lastRenderedState: l }, e.queue = a, e = Qr.bind(null, B, a), a.dispatch = e, a = tc(false), u = ff.bind(null, B, false, a.queue), a = jt(), n = { state: l, dispatch: null, action: t, pending: null }, a.queue = n, e = wm.bind(null, B, n, u, e), n.dispatch = e, a.memoizedState = t, [l, e, false];
}
function os(t) {
  var l = ft();
  return Nr(l, k, t);
}
function Nr(t, l, e) {
  if (l = ef(t, l, Ar)[0], t = qn(Dl)[0], typeof l == "object" && l !== null && typeof l.then == "function") try {
    var a = rn(l);
  } catch (i) {
    throw i === da ? Uu : i;
  }
  else a = l;
  l = ft();
  var n = l.queue, u = n.dispatch;
  return e !== l.memoizedState && (B.flags |= 2048, ea(9, { destroy: void 0 }, Vm.bind(null, n, e), null)), [a, u, t];
}
function Vm(t, l) {
  t.action = l;
}
function rs(t) {
  var l = ft(), e = k;
  if (e !== null) return Nr(l, e, t);
  ft(), l = l.memoizedState, e = ft();
  var a = e.queue.dispatch;
  return e.memoizedState = t, [l, a, false];
}
function ea(t, l, e, a) {
  return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = B.updateQueue, l === null && (l = Cu(), B.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
}
function jr() {
  return ft().memoizedState;
}
function Qn(t, l, e, a) {
  var n = jt();
  B.flags |= t, n.memoizedState = ea(1 | l, { destroy: void 0 }, e, a === void 0 ? null : a);
}
function Bu(t, l, e, a) {
  var n = ft();
  a = a === void 0 ? null : a;
  var u = n.memoizedState.inst;
  k !== null && a !== null && Wc(a, k.memoizedState.deps) ? n.memoizedState = ea(l, u, e, a) : (B.flags |= t, n.memoizedState = ea(1 | l, u, e, a));
}
function ds(t, l) {
  Qn(8390656, 8, t, l);
}
function af(t, l) {
  Bu(2048, 8, t, l);
}
function Km(t) {
  B.flags |= 4;
  var l = B.updateQueue;
  if (l === null) l = Cu(), B.updateQueue = l, l.events = [t];
  else {
    var e = l.events;
    e === null ? l.events = [t] : e.push(t);
  }
}
function Er(t) {
  var l = ft().memoizedState;
  return Km({ ref: l, nextImpl: t }), function() {
    if (Z & 2) throw Error(x(440));
    return l.impl.apply(void 0, arguments);
  };
}
function Dr(t, l) {
  return Bu(4, 2, t, l);
}
function Or(t, l) {
  return Bu(4, 4, t, l);
}
function _r(t, l) {
  if (typeof l == "function") {
    t = t();
    var e = l(t);
    return function() {
      typeof e == "function" ? e() : l(null);
    };
  }
  if (l != null) return t = t(), l.current = t, function() {
    l.current = null;
  };
}
function Mr(t, l, e) {
  e = e != null ? e.concat([t]) : null, Bu(4, 4, _r.bind(null, l, t), e);
}
function nf() {
}
function Ur(t, l) {
  var e = ft();
  l = l === void 0 ? null : l;
  var a = e.memoizedState;
  return l !== null && Wc(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
}
function Cr(t, l) {
  var e = ft();
  l = l === void 0 ? null : l;
  var a = e.memoizedState;
  if (l !== null && Wc(l, a[1])) return a[0];
  if (a = t(), xe) {
    ql(true);
    try {
      t();
    } finally {
      ql(false);
    }
  }
  return e.memoizedState = [a, l], a;
}
function uf(t, l, e) {
  return e === void 0 || El & 1073741824 && !(Q & 261930) ? t.memoizedState = l : (t.memoizedState = e, t = Sd(), B.lanes |= t, ee |= t, e);
}
function Hr(t, l, e, a) {
  return Vt(e, l) ? e : la.current !== null ? (t = uf(t, e, a), Vt(t, l) || (ht = true), t) : !(El & 42) || El & 1073741824 && !(Q & 261930) ? (ht = true, t.memoizedState = e) : (t = Sd(), B.lanes |= t, ee |= t, l);
}
function Br(t, l, e, a, n) {
  var u = L.p;
  L.p = u !== 0 && 8 > u ? u : 8;
  var i = D.T, c = {};
  D.T = c, ff(t, false, l, e);
  try {
    var s = n(), r = D.S;
    if (r !== null && r(c, s), s !== null && typeof s == "object" && typeof s.then == "function") {
      var v = Xm(s, a);
      Ga(t, l, v, wt(t));
    } else Ga(t, l, a, wt(t));
  } catch (y) {
    Ga(t, l, { then: function() {
    }, status: "rejected", reason: y }, wt());
  } finally {
    L.p = u, i !== null && c.types !== null && (i.types = c.types), D.T = i;
  }
}
function Jm() {
}
function ec(t, l, e, a) {
  if (t.tag !== 5) throw Error(x(476));
  var n = Rr(t).queue;
  Br(t, n, l, re, e === null ? Jm : function() {
    return Gr(t), e(a);
  });
}
function Rr(t) {
  var l = t.memoizedState;
  if (l !== null) return l;
  l = { memoizedState: re, baseState: re, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Dl, lastRenderedState: re }, next: null };
  var e = {};
  return l.next = { memoizedState: e, baseState: e, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Dl, lastRenderedState: e }, next: null }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
}
function Gr(t) {
  var l = Rr(t);
  l.next === null && (l = t.alternate.memoizedState), Ga(t, l.next.queue, {}, wt());
}
function cf() {
  return Tt(tn);
}
function Yr() {
  return ft().memoizedState;
}
function qr() {
  return ft().memoizedState;
}
function km(t) {
  for (var l = t.return; l !== null; ) {
    switch (l.tag) {
      case 24:
      case 3:
        var e = wt();
        t = Kl(e);
        var a = Jl(l, t, e);
        a !== null && (Ht(a, l, e), Ha(a, l, e)), l = { cache: Vc() }, t.payload = l;
        return;
    }
    l = l.return;
  }
}
function $m(t, l, e) {
  var a = wt();
  e = { lane: a, revertLane: 0, gesture: null, action: e, hasEagerState: false, eagerState: null, next: null }, Ru(t) ? Xr(l, e) : (e = Xc(t, l, e, a), e !== null && (Ht(e, t, a), Zr(e, l, a)));
}
function Qr(t, l, e) {
  var a = wt();
  Ga(t, l, e, a);
}
function Ga(t, l, e, a) {
  var n = { lane: a, revertLane: 0, gesture: null, action: e, hasEagerState: false, eagerState: null, next: null };
  if (Ru(t)) Xr(l, n);
  else {
    var u = t.alternate;
    if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = l.lastRenderedReducer, u !== null)) try {
      var i = l.lastRenderedState, c = u(i, e);
      if (n.hasEagerState = true, n.eagerState = c, Vt(c, i)) return Mu(t, l, n, 0), W === null && _u(), false;
    } catch {
    } finally {
    }
    if (e = Xc(t, l, n, a), e !== null) return Ht(e, t, a), Zr(e, l, a), true;
  }
  return false;
}
function ff(t, l, e, a) {
  if (a = { lane: 2, revertLane: vf(), gesture: null, action: a, hasEagerState: false, eagerState: null, next: null }, Ru(t)) {
    if (l) throw Error(x(479));
  } else l = Xc(t, e, a, 2), l !== null && Ht(l, t, 2);
}
function Ru(t) {
  var l = t.alternate;
  return t === B || l !== null && l === B;
}
function Xr(t, l) {
  $e = iu = true;
  var e = t.pending;
  e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
}
function Zr(t, l, e) {
  if (e & 4194048) {
    var a = l.lanes;
    a &= t.pendingLanes, e |= a, l.lanes = e, Eo(t, e);
  }
}
var Fa = { readContext: Tt, use: Hu, useCallback: ut, useContext: ut, useEffect: ut, useImperativeHandle: ut, useLayoutEffect: ut, useInsertionEffect: ut, useMemo: ut, useReducer: ut, useRef: ut, useState: ut, useDebugValue: ut, useDeferredValue: ut, useTransition: ut, useSyncExternalStore: ut, useId: ut, useHostTransitionStatus: ut, useFormState: ut, useActionState: ut, useOptimistic: ut, useMemoCache: ut, useCacheRefresh: ut };
Fa.useEffectEvent = ut;
var Lr = { readContext: Tt, use: Hu, useCallback: function(t, l) {
  return jt().memoizedState = [t, l === void 0 ? null : l], t;
}, useContext: Tt, useEffect: ds, useImperativeHandle: function(t, l, e) {
  e = e != null ? e.concat([t]) : null, Qn(4194308, 4, _r.bind(null, l, t), e);
}, useLayoutEffect: function(t, l) {
  return Qn(4194308, 4, t, l);
}, useInsertionEffect: function(t, l) {
  Qn(4, 2, t, l);
}, useMemo: function(t, l) {
  var e = jt();
  l = l === void 0 ? null : l;
  var a = t();
  if (xe) {
    ql(true);
    try {
      t();
    } finally {
      ql(false);
    }
  }
  return e.memoizedState = [a, l], a;
}, useReducer: function(t, l, e) {
  var a = jt();
  if (e !== void 0) {
    var n = e(l);
    if (xe) {
      ql(true);
      try {
        e(l);
      } finally {
        ql(false);
      }
    }
  } else n = l;
  return a.memoizedState = a.baseState = n, t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: n }, a.queue = t, t = t.dispatch = $m.bind(null, B, t), [a.memoizedState, t];
}, useRef: function(t) {
  var l = jt();
  return t = { current: t }, l.memoizedState = t;
}, useState: function(t) {
  t = tc(t);
  var l = t.queue, e = Qr.bind(null, B, l);
  return l.dispatch = e, [t.memoizedState, e];
}, useDebugValue: nf, useDeferredValue: function(t, l) {
  var e = jt();
  return uf(e, t, l);
}, useTransition: function() {
  var t = tc(false);
  return t = Br.bind(null, B, t.queue, true, false), jt().memoizedState = t, [false, t];
}, useSyncExternalStore: function(t, l, e) {
  var a = B, n = jt();
  if (X) {
    if (e === void 0) throw Error(x(407));
    e = e();
  } else {
    if (e = l(), W === null) throw Error(x(349));
    Q & 127 || gr(a, l, e);
  }
  n.memoizedState = e;
  var u = { value: e, getSnapshot: l };
  return n.queue = u, ds(br.bind(null, a, u, t), [t]), a.flags |= 2048, ea(9, { destroy: void 0 }, vr.bind(null, a, u, e, l), null), e;
}, useId: function() {
  var t = jt(), l = W.identifierPrefix;
  if (X) {
    var e = fl, a = cl;
    e = (a & ~(1 << 32 - Lt(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = cu++, 0 < e && (l += "H" + e.toString(32)), l += "_";
  } else e = Zm++, l = "_" + l + "r_" + e.toString(32) + "_";
  return t.memoizedState = l;
}, useHostTransitionStatus: cf, useFormState: ss, useActionState: ss, useOptimistic: function(t) {
  var l = jt();
  l.memoizedState = l.baseState = t;
  var e = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
  return l.queue = e, l = ff.bind(null, B, true, e), e.dispatch = l, [t, l];
}, useMemoCache: lf, useCacheRefresh: function() {
  return jt().memoizedState = km.bind(null, B);
}, useEffectEvent: function(t) {
  var l = jt(), e = { impl: t };
  return l.memoizedState = e, function() {
    if (Z & 2) throw Error(x(440));
    return e.impl.apply(void 0, arguments);
  };
} }, sf = { readContext: Tt, use: Hu, useCallback: Ur, useContext: Tt, useEffect: af, useImperativeHandle: Mr, useInsertionEffect: Dr, useLayoutEffect: Or, useMemo: Cr, useReducer: qn, useRef: jr, useState: function() {
  return qn(Dl);
}, useDebugValue: nf, useDeferredValue: function(t, l) {
  var e = ft();
  return Hr(e, k.memoizedState, t, l);
}, useTransition: function() {
  var t = qn(Dl)[0], l = ft().memoizedState;
  return [typeof t == "boolean" ? t : rn(t), l];
}, useSyncExternalStore: yr, useId: Yr, useHostTransitionStatus: cf, useFormState: os, useActionState: os, useOptimistic: function(t, l) {
  var e = ft();
  return Sr(e, k, t, l);
}, useMemoCache: lf, useCacheRefresh: qr };
sf.useEffectEvent = Er;
var wr = { readContext: Tt, use: Hu, useCallback: Ur, useContext: Tt, useEffect: af, useImperativeHandle: Mr, useInsertionEffect: Dr, useLayoutEffect: Or, useMemo: Cr, useReducer: ci, useRef: jr, useState: function() {
  return ci(Dl);
}, useDebugValue: nf, useDeferredValue: function(t, l) {
  var e = ft();
  return k === null ? uf(e, t, l) : Hr(e, k.memoizedState, t, l);
}, useTransition: function() {
  var t = ci(Dl)[0], l = ft().memoizedState;
  return [typeof t == "boolean" ? t : rn(t), l];
}, useSyncExternalStore: yr, useId: Yr, useHostTransitionStatus: cf, useFormState: rs, useActionState: rs, useOptimistic: function(t, l) {
  var e = ft();
  return k !== null ? Sr(e, k, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
}, useMemoCache: lf, useCacheRefresh: qr };
wr.useEffectEvent = Er;
function fi(t, l, e, a) {
  l = t.memoizedState, e = e(a, l), e = e == null ? l : lt({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
}
var ac = { enqueueSetState: function(t, l, e) {
  t = t._reactInternals;
  var a = wt(), n = Kl(a);
  n.payload = l, e != null && (n.callback = e), l = Jl(t, n, a), l !== null && (Ht(l, t, a), Ha(l, t, a));
}, enqueueReplaceState: function(t, l, e) {
  t = t._reactInternals;
  var a = wt(), n = Kl(a);
  n.tag = 1, n.payload = l, e != null && (n.callback = e), l = Jl(t, n, a), l !== null && (Ht(l, t, a), Ha(l, t, a));
}, enqueueForceUpdate: function(t, l) {
  t = t._reactInternals;
  var e = wt(), a = Kl(e);
  a.tag = 2, l != null && (a.callback = l), l = Jl(t, a, e), l !== null && (Ht(l, t, e), Ha(l, t, e));
} };
function ms(t, l, e, a, n, u, i) {
  return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : l.prototype && l.prototype.isPureReactComponent ? !Ka(e, a) || !Ka(n, u) : true;
}
function hs(t, l, e, a) {
  t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && ac.enqueueReplaceState(l, l.state, null);
}
function pe(t, l) {
  var e = l;
  if ("ref" in l) {
    e = {};
    for (var a in l) a !== "ref" && (e[a] = l[a]);
  }
  if (t = t.defaultProps) {
    e === l && (e = lt({}, e));
    for (var n in t) e[n] === void 0 && (e[n] = t[n]);
  }
  return e;
}
function Vr(t) {
  Pn(t);
}
function Kr(t) {
  console.error(t);
}
function Jr(t) {
  Pn(t);
}
function fu(t, l) {
  try {
    var e = t.onUncaughtError;
    e(l.value, { componentStack: l.stack });
  } catch (a) {
    setTimeout(function() {
      throw a;
    });
  }
}
function ys(t, l, e) {
  try {
    var a = t.onCaughtError;
    a(e.value, { componentStack: e.stack, errorBoundary: l.tag === 1 ? l.stateNode : null });
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
function nc(t, l, e) {
  return e = Kl(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
    fu(t, l);
  }, e;
}
function kr(t) {
  return t = Kl(t), t.tag = 3, t;
}
function $r(t, l, e, a) {
  var n = e.type.getDerivedStateFromError;
  if (typeof n == "function") {
    var u = a.value;
    t.payload = function() {
      return n(u);
    }, t.callback = function() {
      ys(l, e, a);
    };
  }
  var i = e.stateNode;
  i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
    ys(l, e, a), typeof n != "function" && (kl === null ? kl = /* @__PURE__ */ new Set([this]) : kl.add(this));
    var c = a.stack;
    this.componentDidCatch(a.value, { componentStack: c !== null ? c : "" });
  });
}
function Wm(t, l, e, a, n) {
  if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
    if (l = e.alternate, l !== null && ra(l, e, n, true), e = Kt.current, e !== null) {
      switch (e.tag) {
        case 31:
        case 13:
          return tl === null ? mu() : e.alternate === null && it === 0 && (it = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === au ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), xi(t, a, n)), false;
        case 22:
          return e.flags |= 65536, a === au ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([a]) }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), xi(t, a, n)), false;
      }
      throw Error(x(435, e.tag));
    }
    return xi(t, a, n), mu(), false;
  }
  if (X) return l = Kt.current, l !== null ? (!(l.flags & 65536) && (l.flags |= 256), l.flags |= 65536, l.lanes = n, a !== Vi && (t = Error(x(422), { cause: a }), ka(It(t, e)))) : (a !== Vi && (l = Error(x(423), { cause: a }), ka(It(l, e))), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = It(a, e), n = nc(t.stateNode, a, n), ii(t, n), it !== 4 && (it = 2)), false;
  var u = Error(x(520), { cause: a });
  if (u = It(u, e), Qa === null ? Qa = [u] : Qa.push(u), it !== 4 && (it = 2), l === null) return true;
  a = It(a, e), e = l;
  do {
    switch (e.tag) {
      case 3:
        return e.flags |= 65536, t = n & -n, e.lanes |= t, t = nc(e.stateNode, a, t), ii(e, t), false;
      case 1:
        if (l = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (kl === null || !kl.has(u)))) return e.flags |= 65536, n &= -n, e.lanes |= n, n = kr(n), $r(n, t, e, a), ii(e, n), false;
    }
    e = e.return;
  } while (e !== null);
  return false;
}
var of = Error(x(461)), ht = false;
function pt(t, l, e, a) {
  l.child = t === null ? sr(l, null, e, a) : be(l, t.child, e, a);
}
function gs(t, l, e, a, n) {
  e = e.render;
  var u = l.ref;
  if ("ref" in a) {
    var i = {};
    for (var c in a) c !== "ref" && (i[c] = a[c]);
  } else i = a;
  return ve(l), a = Fc(t, l, e, i, u, n), c = Ic(), t !== null && !ht ? (Pc(t, l, n), Ol(t, l, n)) : (X && c && Lc(l), l.flags |= 1, pt(t, l, a, n), l.child);
}
function vs(t, l, e, a, n) {
  if (t === null) {
    var u = e.type;
    return typeof u == "function" && !Zc(u) && u.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = u, Wr(t, l, u, a, n)) : (t = Gn(e.type, null, a, l, l.mode, n), t.ref = l.ref, t.return = l, l.child = t);
  }
  if (u = t.child, !rf(t, n)) {
    var i = u.memoizedProps;
    if (e = e.compare, e = e !== null ? e : Ka, e(i, a) && t.ref === l.ref) return Ol(t, l, n);
  }
  return l.flags |= 1, t = Tl(u, a), t.ref = l.ref, t.return = l, l.child = t;
}
function Wr(t, l, e, a, n) {
  if (t !== null) {
    var u = t.memoizedProps;
    if (Ka(u, a) && t.ref === l.ref) if (ht = false, l.pendingProps = a = u, rf(t, n)) t.flags & 131072 && (ht = true);
    else return l.lanes = t.lanes, Ol(t, l, n);
  }
  return uc(t, l, e, a, n);
}
function Fr(t, l, e, a) {
  var n = a.children, u = t !== null ? t.memoizedState : null;
  if (t === null && l.stateNode === null && (l.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), a.mode === "hidden") {
    if (l.flags & 128) {
      if (u = u !== null ? u.baseLanes | e : e, t !== null) {
        for (a = l.child = t.child, n = 0; a !== null; ) n = n | a.lanes | a.childLanes, a = a.sibling;
        a = n & ~u;
      } else a = 0, l.child = null;
      return bs(t, l, u, e, a);
    }
    if (e & 536870912) l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Yn(l, u !== null ? u.cachePool : null), u !== null ? is(l, u) : Ii(), dr(l);
    else return a = l.lanes = 536870912, bs(t, l, u !== null ? u.baseLanes | e : e, e, a);
  } else u !== null ? (Yn(l, u.cachePool), is(l, u), Gl(), l.memoizedState = null) : (t !== null && Yn(l, null), Ii(), Gl());
  return pt(t, l, n, e), l.child;
}
function Ea(t, l) {
  return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), l.sibling;
}
function bs(t, l, e, a, n) {
  var u = Kc();
  return u = u === null ? null : { parent: mt._currentValue, pool: u }, l.memoizedState = { baseLanes: e, cachePool: u }, t !== null && Yn(l, null), Ii(), dr(l), t !== null && ra(t, l, a, true), l.childLanes = n, null;
}
function Xn(t, l) {
  return l = su({ mode: l.mode, children: l.children }, t.mode), l.ref = t.ref, t.child = l, l.return = t, l;
}
function xs(t, l, e) {
  return be(l, t.child, null, e), t = Xn(l, l.pendingProps), t.flags |= 2, Yt(l), l.memoizedState = null, t;
}
function Fm(t, l, e) {
  var a = l.pendingProps, n = (l.flags & 128) !== 0;
  if (l.flags &= -129, t === null) {
    if (X) {
      if (a.mode === "hidden") return t = Xn(l, a), l.lanes = 536870912, Ea(null, t);
      if (Pi(l), (t = P) ? (t = Ld(t, Pt), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = { dehydrated: t, treeContext: Pl !== null ? { id: cl, overflow: fl } : null, retryLane: 536870912, hydrationErrors: null }, e = er(t), e.return = l, l.child = e, zt = l, P = null)) : t = null, t === null) throw te(l);
      return l.lanes = 536870912, null;
    }
    return Xn(l, a);
  }
  var u = t.memoizedState;
  if (u !== null) {
    var i = u.dehydrated;
    if (Pi(l), n) if (l.flags & 256) l.flags &= -257, l = xs(t, l, e);
    else if (l.memoizedState !== null) l.child = t.child, l.flags |= 128, l = null;
    else throw Error(x(558));
    else if (ht || ra(t, l, e, false), n = (e & t.childLanes) !== 0, ht || n) {
      if (a = W, a !== null && (i = Do(a, e), i !== 0 && i !== u.retryLane)) throw u.retryLane = i, Ae(t, i), Ht(a, t, i), of;
      mu(), l = xs(t, l, e);
    } else t = u.treeContext, P = ll(i.nextSibling), zt = l, X = true, Vl = null, Pt = false, t !== null && nr(l, t), l = Xn(l, a), l.flags |= 4096;
    return l;
  }
  return t = Tl(t.child, { mode: a.mode, children: a.children }), t.ref = l.ref, l.child = t, t.return = l, t;
}
function Zn(t, l) {
  var e = l.ref;
  if (e === null) t !== null && t.ref !== null && (l.flags |= 4194816);
  else {
    if (typeof e != "function" && typeof e != "object") throw Error(x(284));
    (t === null || t.ref !== e) && (l.flags |= 4194816);
  }
}
function uc(t, l, e, a, n) {
  return ve(l), e = Fc(t, l, e, a, void 0, n), a = Ic(), t !== null && !ht ? (Pc(t, l, n), Ol(t, l, n)) : (X && a && Lc(l), l.flags |= 1, pt(t, l, e, n), l.child);
}
function ps(t, l, e, a, n, u) {
  return ve(l), l.updateQueue = null, e = hr(l, a, e, n), mr(t), a = Ic(), t !== null && !ht ? (Pc(t, l, u), Ol(t, l, u)) : (X && a && Lc(l), l.flags |= 1, pt(t, l, e, u), l.child);
}
function Ss(t, l, e, a, n) {
  if (ve(l), l.stateNode === null) {
    var u = Qe, i = e.contextType;
    typeof i == "object" && i !== null && (u = Tt(i)), u = new e(a, u), l.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = ac, l.stateNode = u, u._reactInternals = l, u = l.stateNode, u.props = a, u.state = l.memoizedState, u.refs = {}, kc(l), i = e.contextType, u.context = typeof i == "object" && i !== null ? Tt(i) : Qe, u.state = l.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (fi(l, e, i, a), u.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && ac.enqueueReplaceState(u, u.state, null), Ra(l, a, u, n), Ba(), u.state = l.memoizedState), typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = true;
  } else if (t === null) {
    u = l.stateNode;
    var c = l.memoizedProps, s = pe(e, c);
    u.props = s;
    var r = u.context, v = e.contextType;
    i = Qe, typeof v == "object" && v !== null && (i = Tt(v));
    var y = e.getDerivedStateFromProps;
    v = typeof y == "function" || typeof u.getSnapshotBeforeUpdate == "function", c = l.pendingProps !== c, v || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c || r !== i) && hs(l, u, a, i), Hl = false;
    var m = l.memoizedState;
    u.state = m, Ra(l, a, u, n), Ba(), r = l.memoizedState, c || m !== r || Hl ? (typeof y == "function" && (fi(l, e, y, a), r = l.memoizedState), (s = Hl || ms(l, e, s, a, m, r, i)) ? (v || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = r), u.props = a, u.state = r, u.context = i, a = s) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = false);
  } else {
    u = l.stateNode, Wi(t, l), i = l.memoizedProps, v = pe(e, i), u.props = v, y = l.pendingProps, m = u.context, r = e.contextType, s = Qe, typeof r == "object" && r !== null && (s = Tt(r)), c = e.getDerivedStateFromProps, (r = typeof c == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== y || m !== s) && hs(l, u, a, s), Hl = false, m = l.memoizedState, u.state = m, Ra(l, a, u, n), Ba();
    var h = l.memoizedState;
    i !== y || m !== h || Hl || t !== null && t.dependencies !== null && eu(t.dependencies) ? (typeof c == "function" && (fi(l, e, c, a), h = l.memoizedState), (v = Hl || ms(l, e, v, a, m, h, s) || t !== null && t.dependencies !== null && eu(t.dependencies)) ? (r || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, h, s), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(a, h, s)), typeof u.componentDidUpdate == "function" && (l.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && m === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && m === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = h), u.props = a, u.state = h, u.context = s, a = v) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && m === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && m === t.memoizedState || (l.flags |= 1024), a = false);
  }
  return u = a, Zn(t, l), a = (l.flags & 128) !== 0, u || a ? (u = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), l.flags |= 1, t !== null && a ? (l.child = be(l, t.child, null, n), l.child = be(l, null, e, n)) : pt(t, l, e, n), l.memoizedState = u.state, t = l.child) : t = Ol(t, l, n), t;
}
function zs(t, l, e, a) {
  return ge(), l.flags |= 256, pt(t, l, e, a), l.child;
}
var si = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
function oi(t) {
  return { baseLanes: t, cachePool: ir() };
}
function ri(t, l, e) {
  return t = t !== null ? t.childLanes & ~e : 0, l && (t |= Qt), t;
}
function Ir(t, l, e) {
  var a = l.pendingProps, n = false, u = (l.flags & 128) !== 0, i;
  if ((i = u) || (i = t !== null && t.memoizedState === null ? false : (ct.current & 2) !== 0), i && (n = true, l.flags &= -129), i = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
    if (X) {
      if (n ? Rl(l) : Gl(), (t = P) ? (t = Ld(t, Pt), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = { dehydrated: t, treeContext: Pl !== null ? { id: cl, overflow: fl } : null, retryLane: 536870912, hydrationErrors: null }, e = er(t), e.return = l, l.child = e, zt = l, P = null)) : t = null, t === null) throw te(l);
      return xc(t) ? l.lanes = 32 : l.lanes = 536870912, null;
    }
    var c = a.children;
    return a = a.fallback, n ? (Gl(), n = l.mode, c = su({ mode: "hidden", children: c }, n), a = de(a, n, e, null), c.return = l, a.return = l, c.sibling = a, l.child = c, a = l.child, a.memoizedState = oi(e), a.childLanes = ri(t, i, e), l.memoizedState = si, Ea(null, a)) : (Rl(l), ic(l, c));
  }
  var s = t.memoizedState;
  if (s !== null && (c = s.dehydrated, c !== null)) {
    if (u) l.flags & 256 ? (Rl(l), l.flags &= -257, l = di(t, l, e)) : l.memoizedState !== null ? (Gl(), l.child = t.child, l.flags |= 128, l = null) : (Gl(), c = a.fallback, n = l.mode, a = su({ mode: "visible", children: a.children }, n), c = de(c, n, e, null), c.flags |= 2, a.return = l, c.return = l, a.sibling = c, l.child = a, be(l, t.child, null, e), a = l.child, a.memoizedState = oi(e), a.childLanes = ri(t, i, e), l.memoizedState = si, l = Ea(null, a));
    else if (Rl(l), xc(c)) {
      if (i = c.nextSibling && c.nextSibling.dataset, i) var r = i.dgst;
      i = r, a = Error(x(419)), a.stack = "", a.digest = i, ka({ value: a, source: null, stack: null }), l = di(t, l, e);
    } else if (ht || ra(t, l, e, false), i = (e & t.childLanes) !== 0, ht || i) {
      if (i = W, i !== null && (a = Do(i, e), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, Ae(t, a), Ht(i, t, a), of;
      bc(c) || mu(), l = di(t, l, e);
    } else bc(c) ? (l.flags |= 192, l.child = t.child, l = null) : (t = s.treeContext, P = ll(c.nextSibling), zt = l, X = true, Vl = null, Pt = false, t !== null && nr(l, t), l = ic(l, a.children), l.flags |= 4096);
    return l;
  }
  return n ? (Gl(), c = a.fallback, n = l.mode, s = t.child, r = s.sibling, a = Tl(s, { mode: "hidden", children: a.children }), a.subtreeFlags = s.subtreeFlags & 65011712, r !== null ? c = Tl(r, c) : (c = de(c, n, e, null), c.flags |= 2), c.return = l, a.return = l, a.sibling = c, l.child = a, Ea(null, a), a = l.child, c = t.child.memoizedState, c === null ? c = oi(e) : (n = c.cachePool, n !== null ? (s = mt._currentValue, n = n.parent !== s ? { parent: s, pool: s } : n) : n = ir(), c = { baseLanes: c.baseLanes | e, cachePool: n }), a.memoizedState = c, a.childLanes = ri(t, i, e), l.memoizedState = si, Ea(t.child, a)) : (Rl(l), e = t.child, t = e.sibling, e = Tl(e, { mode: "visible", children: a.children }), e.return = l, e.sibling = null, t !== null && (i = l.deletions, i === null ? (l.deletions = [t], l.flags |= 16) : i.push(t)), l.child = e, l.memoizedState = null, e);
}
function ic(t, l) {
  return l = su({ mode: "visible", children: l }, t.mode), l.return = t, t.child = l;
}
function su(t, l) {
  return t = qt(22, t, null, l), t.lanes = 0, t;
}
function di(t, l, e) {
  return be(l, t.child, null, e), t = ic(l, l.pendingProps.children), t.flags |= 2, l.memoizedState = null, t;
}
function Ts(t, l, e) {
  t.lanes |= l;
  var a = t.alternate;
  a !== null && (a.lanes |= l), Ji(t.return, l, e);
}
function mi(t, l, e, a, n, u) {
  var i = t.memoizedState;
  i === null ? t.memoizedState = { isBackwards: l, rendering: null, renderingStartTime: 0, last: a, tail: e, tailMode: n, treeForkCount: u } : (i.isBackwards = l, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = n, i.treeForkCount = u);
}
function Pr(t, l, e) {
  var a = l.pendingProps, n = a.revealOrder, u = a.tail;
  a = a.children;
  var i = ct.current, c = (i & 2) !== 0;
  if (c ? (i = i & 1 | 2, l.flags |= 128) : i &= 1, F(ct, i), pt(t, l, a, e), a = X ? Ja : 0, !c && t !== null && t.flags & 128) t: for (t = l.child; t !== null; ) {
    if (t.tag === 13) t.memoizedState !== null && Ts(t, e, l);
    else if (t.tag === 19) Ts(t, e, l);
    else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === l) break t;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === l) break t;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  switch (n) {
    case "forwards":
      for (e = l.child, n = null; e !== null; ) t = e.alternate, t !== null && uu(t) === null && (n = e), e = e.sibling;
      e = n, e === null ? (n = l.child, l.child = null) : (n = e.sibling, e.sibling = null), mi(l, false, n, e, u, a);
      break;
    case "backwards":
    case "unstable_legacy-backwards":
      for (e = null, n = l.child, l.child = null; n !== null; ) {
        if (t = n.alternate, t !== null && uu(t) === null) {
          l.child = n;
          break;
        }
        t = n.sibling, n.sibling = e, e = n, n = t;
      }
      mi(l, true, e, null, u, a);
      break;
    case "together":
      mi(l, false, null, null, void 0, a);
      break;
    default:
      l.memoizedState = null;
  }
  return l.child;
}
function Ol(t, l, e) {
  if (t !== null && (l.dependencies = t.dependencies), ee |= l.lanes, !(e & l.childLanes)) if (t !== null) {
    if (ra(t, l, e, false), (e & l.childLanes) === 0) return null;
  } else return null;
  if (t !== null && l.child !== t.child) throw Error(x(153));
  if (l.child !== null) {
    for (t = l.child, e = Tl(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; ) t = t.sibling, e = e.sibling = Tl(t, t.pendingProps), e.return = l;
    e.sibling = null;
  }
  return l.child;
}
function rf(t, l) {
  return t.lanes & l ? true : (t = t.dependencies, !!(t !== null && eu(t)));
}
function Im(t, l, e) {
  switch (l.tag) {
    case 3:
      $n(l, l.stateNode.containerInfo), Bl(l, mt, t.memoizedState.cache), ge();
      break;
    case 27:
    case 5:
      Hi(l);
      break;
    case 4:
      $n(l, l.stateNode.containerInfo);
      break;
    case 10:
      Bl(l, l.type, l.memoizedProps.value);
      break;
    case 31:
      if (l.memoizedState !== null) return l.flags |= 128, Pi(l), null;
      break;
    case 13:
      var a = l.memoizedState;
      if (a !== null) return a.dehydrated !== null ? (Rl(l), l.flags |= 128, null) : e & l.child.childLanes ? Ir(t, l, e) : (Rl(l), t = Ol(t, l, e), t !== null ? t.sibling : null);
      Rl(l);
      break;
    case 19:
      var n = (t.flags & 128) !== 0;
      if (a = (e & l.childLanes) !== 0, a || (ra(t, l, e, false), a = (e & l.childLanes) !== 0), n) {
        if (a) return Pr(t, l, e);
        l.flags |= 128;
      }
      if (n = l.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), F(ct, ct.current), a) break;
      return null;
    case 22:
      return l.lanes = 0, Fr(t, l, e, l.pendingProps);
    case 24:
      Bl(l, mt, t.memoizedState.cache);
  }
  return Ol(t, l, e);
}
function td(t, l, e) {
  if (t !== null) if (t.memoizedProps !== l.pendingProps) ht = true;
  else {
    if (!rf(t, e) && !(l.flags & 128)) return ht = false, Im(t, l, e);
    ht = !!(t.flags & 131072);
  }
  else ht = false, X && l.flags & 1048576 && ar(l, Ja, l.index);
  switch (l.lanes = 0, l.tag) {
    case 16:
      t: {
        var a = l.pendingProps;
        if (t = se(l.elementType), l.type = t, typeof t == "function") Zc(t) ? (a = pe(t, a), l.tag = 1, l = Ss(null, l, t, a, e)) : (l.tag = 0, l = uc(null, l, t, a, e));
        else {
          if (t != null) {
            var n = t.$$typeof;
            if (n === Dc) {
              l.tag = 11, l = gs(null, l, t, a, e);
              break t;
            } else if (n === Oc) {
              l.tag = 14, l = vs(null, l, t, a, e);
              break t;
            }
          }
          throw l = Ui(t) || t, Error(x(306, l, ""));
        }
      }
      return l;
    case 0:
      return uc(t, l, l.type, l.pendingProps, e);
    case 1:
      return a = l.type, n = pe(a, l.pendingProps), Ss(t, l, a, n, e);
    case 3:
      t: {
        if ($n(l, l.stateNode.containerInfo), t === null) throw Error(x(387));
        a = l.pendingProps;
        var u = l.memoizedState;
        n = u.element, Wi(t, l), Ra(l, a, null, e);
        var i = l.memoizedState;
        if (a = i.cache, Bl(l, mt, a), a !== u.cache && ki(l, [mt], e, true), Ba(), a = i.element, u.isDehydrated) if (u = { element: a, isDehydrated: false, cache: i.cache }, l.updateQueue.baseState = u, l.memoizedState = u, l.flags & 256) {
          l = zs(t, l, a, e);
          break t;
        } else if (a !== n) {
          n = It(Error(x(424)), l), ka(n), l = zs(t, l, a, e);
          break t;
        } else {
          switch (t = l.stateNode.containerInfo, t.nodeType) {
            case 9:
              t = t.body;
              break;
            default:
              t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
          }
          for (P = ll(t.firstChild), zt = l, X = true, Vl = null, Pt = true, e = sr(l, null, a, e), l.child = e; e; ) e.flags = e.flags & -3 | 4096, e = e.sibling;
        }
        else {
          if (ge(), a === n) {
            l = Ol(t, l, e);
            break t;
          }
          pt(t, l, a, e);
        }
        l = l.child;
      }
      return l;
    case 26:
      return Zn(t, l), t === null ? (e = Ls(l.type, null, l.pendingProps, null)) ? l.memoizedState = e : X || (e = l.type, t = l.pendingProps, a = vu(wl.current).createElement(e), a[St] = l, a[Bt] = t, At(a, e, t), bt(a), l.stateNode = a) : l.memoizedState = Ls(l.type, t.memoizedProps, l.pendingProps, t.memoizedState), null;
    case 27:
      return Hi(l), t === null && X && (a = l.stateNode = wd(l.type, l.pendingProps, wl.current), zt = l, Pt = true, n = P, ne(l.type) ? (pc = n, P = ll(a.firstChild)) : P = n), pt(t, l, l.pendingProps.children, e), Zn(t, l), t === null && (l.flags |= 4194304), l.child;
    case 5:
      return t === null && X && ((n = a = P) && (a = Dh(a, l.type, l.pendingProps, Pt), a !== null ? (l.stateNode = a, zt = l, P = ll(a.firstChild), Pt = false, n = true) : n = false), n || te(l)), Hi(l), n = l.type, u = l.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, gc(n, u) ? a = null : i !== null && gc(n, i) && (l.flags |= 32), l.memoizedState !== null && (n = Fc(t, l, Lm, null, null, e), tn._currentValue = n), Zn(t, l), pt(t, l, a, e), l.child;
    case 6:
      return t === null && X && ((t = e = P) && (e = Oh(e, l.pendingProps, Pt), e !== null ? (l.stateNode = e, zt = l, P = null, t = true) : t = false), t || te(l)), null;
    case 13:
      return Ir(t, l, e);
    case 4:
      return $n(l, l.stateNode.containerInfo), a = l.pendingProps, t === null ? l.child = be(l, null, a, e) : pt(t, l, a, e), l.child;
    case 11:
      return gs(t, l, l.type, l.pendingProps, e);
    case 7:
      return pt(t, l, l.pendingProps, e), l.child;
    case 8:
      return pt(t, l, l.pendingProps.children, e), l.child;
    case 12:
      return pt(t, l, l.pendingProps.children, e), l.child;
    case 10:
      return a = l.pendingProps, Bl(l, l.type, a.value), pt(t, l, a.children, e), l.child;
    case 9:
      return n = l.type._context, a = l.pendingProps.children, ve(l), n = Tt(n), a = a(n), l.flags |= 1, pt(t, l, a, e), l.child;
    case 14:
      return vs(t, l, l.type, l.pendingProps, e);
    case 15:
      return Wr(t, l, l.type, l.pendingProps, e);
    case 19:
      return Pr(t, l, e);
    case 31:
      return Fm(t, l, e);
    case 22:
      return Fr(t, l, e, l.pendingProps);
    case 24:
      return ve(l), a = Tt(mt), t === null ? (n = Kc(), n === null && (n = W, u = Vc(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), l.memoizedState = { parent: a, cache: n }, kc(l), Bl(l, mt, n)) : (t.lanes & e && (Wi(t, l), Ra(l, null, null, e), Ba()), n = t.memoizedState, u = l.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, l.memoizedState = n, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = n), Bl(l, mt, a)) : (a = u.cache, Bl(l, mt, a), a !== n.cache && ki(l, [mt], e, true))), pt(t, l, l.pendingProps.children, e), l.child;
    case 29:
      throw l.pendingProps;
  }
  throw Error(x(156, l.tag));
}
function hl(t) {
  t.flags |= 4;
}
function hi(t, l, e, a, n) {
  if ((l = (t.mode & 32) !== 0) && (l = false), l) {
    if (t.flags |= 16777216, (n & 335544128) === n) if (t.stateNode.complete) t.flags |= 8192;
    else if (Ad()) t.flags |= 8192;
    else throw he = au, Jc;
  } else t.flags &= -16777217;
}
function As(t, l) {
  if (l.type !== "stylesheet" || l.state.loading & 4) t.flags &= -16777217;
  else if (t.flags |= 16777216, !Jd(l)) if (Ad()) t.flags |= 8192;
  else throw he = au, Jc;
}
function jn(t, l) {
  l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? No() : 536870912, t.lanes |= l, aa |= l);
}
function Sa(t, l) {
  if (!X) switch (t.tailMode) {
    case "hidden":
      l = t.tail;
      for (var e = null; l !== null; ) l.alternate !== null && (e = l), l = l.sibling;
      e === null ? t.tail = null : e.sibling = null;
      break;
    case "collapsed":
      e = t.tail;
      for (var a = null; e !== null; ) e.alternate !== null && (a = e), e = e.sibling;
      a === null ? l || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
  }
}
function I(t) {
  var l = t.alternate !== null && t.alternate.child === t.child, e = 0, a = 0;
  if (l) for (var n = t.child; n !== null; ) e |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = t, n = n.sibling;
  else for (n = t.child; n !== null; ) e |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
  return t.subtreeFlags |= a, t.childLanes = e, l;
}
function Pm(t, l, e) {
  var a = l.pendingProps;
  switch (wc(l), l.tag) {
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return I(l), null;
    case 1:
      return I(l), null;
    case 3:
      return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), Al(mt), Fe(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (Ee(l) ? hl(l) : t === null || t.memoizedState.isDehydrated && !(l.flags & 256) || (l.flags |= 1024, ui())), I(l), null;
    case 26:
      var n = l.type, u = l.memoizedState;
      return t === null ? (hl(l), u !== null ? (I(l), As(l, u)) : (I(l), hi(l, n, null, a, e))) : u ? u !== t.memoizedState ? (hl(l), I(l), As(l, u)) : (I(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && hl(l), I(l), hi(l, n, t, a, e)), null;
    case 27:
      if (Wn(l), e = wl.current, n = l.type, t !== null && l.stateNode != null) t.memoizedProps !== a && hl(l);
      else {
        if (!a) {
          if (l.stateNode === null) throw Error(x(166));
          return I(l), null;
        }
        t = ol.current, Ee(l) ? Pf(l) : (t = wd(n, a, e), l.stateNode = t, hl(l));
      }
      return I(l), null;
    case 5:
      if (Wn(l), n = l.type, t !== null && l.stateNode != null) t.memoizedProps !== a && hl(l);
      else {
        if (!a) {
          if (l.stateNode === null) throw Error(x(166));
          return I(l), null;
        }
        if (u = ol.current, Ee(l)) Pf(l);
        else {
          var i = vu(wl.current);
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
          u[St] = l, u[Bt] = a;
          t: for (i = l.child; i !== null; ) {
            if (i.tag === 5 || i.tag === 6) u.appendChild(i.stateNode);
            else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
              i.child.return = i, i = i.child;
              continue;
            }
            if (i === l) break t;
            for (; i.sibling === null; ) {
              if (i.return === null || i.return === l) break t;
              i = i.return;
            }
            i.sibling.return = i.return, i = i.sibling;
          }
          l.stateNode = u;
          t: switch (At(u, n, a), n) {
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
          a && hl(l);
        }
      }
      return I(l), hi(l, l.type, t === null ? null : t.memoizedProps, l.pendingProps, e), null;
    case 6:
      if (t && l.stateNode != null) t.memoizedProps !== a && hl(l);
      else {
        if (typeof a != "string" && l.stateNode === null) throw Error(x(166));
        if (t = wl.current, Ee(l)) {
          if (t = l.stateNode, e = l.memoizedProps, a = null, n = zt, n !== null) switch (n.tag) {
            case 27:
            case 5:
              a = n.memoizedProps;
          }
          t[St] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === true || Qd(t.nodeValue, e)), t || te(l, true);
        } else t = vu(t).createTextNode(a), t[St] = l, l.stateNode = t;
      }
      return I(l), null;
    case 31:
      if (e = l.memoizedState, t === null || t.memoizedState !== null) {
        if (a = Ee(l), e !== null) {
          if (t === null) {
            if (!a) throw Error(x(318));
            if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(x(557));
            t[St] = l;
          } else ge(), !(l.flags & 128) && (l.memoizedState = null), l.flags |= 4;
          I(l), t = false;
        } else e = ui(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = true;
        if (!t) return l.flags & 256 ? (Yt(l), l) : (Yt(l), null);
        if (l.flags & 128) throw Error(x(558));
      }
      return I(l), null;
    case 13:
      if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
        if (n = Ee(l), a !== null && a.dehydrated !== null) {
          if (t === null) {
            if (!n) throw Error(x(318));
            if (n = l.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(x(317));
            n[St] = l;
          } else ge(), !(l.flags & 128) && (l.memoizedState = null), l.flags |= 4;
          I(l), n = false;
        } else n = ui(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = true;
        if (!n) return l.flags & 256 ? (Yt(l), l) : (Yt(l), null);
      }
      return Yt(l), l.flags & 128 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), jn(l, l.updateQueue), I(l), null);
    case 4:
      return Fe(), t === null && bf(l.stateNode.containerInfo), I(l), null;
    case 10:
      return Al(l.type), I(l), null;
    case 19:
      if (xt(ct), a = l.memoizedState, a === null) return I(l), null;
      if (n = (l.flags & 128) !== 0, u = a.rendering, u === null) if (n) Sa(a, false);
      else {
        if (it !== 0 || t !== null && t.flags & 128) for (t = l.child; t !== null; ) {
          if (u = uu(t), u !== null) {
            for (l.flags |= 128, Sa(a, false), t = u.updateQueue, l.updateQueue = t, jn(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; ) lr(e, t), e = e.sibling;
            return F(ct, ct.current & 1 | 2), X && bl(l, a.treeForkCount), l.child;
          }
          t = t.sibling;
        }
        a.tail !== null && Xt() > ru && (l.flags |= 128, n = true, Sa(a, false), l.lanes = 4194304);
      }
      else {
        if (!n) if (t = uu(u), t !== null) {
          if (l.flags |= 128, n = true, t = t.updateQueue, l.updateQueue = t, jn(l, t), Sa(a, true), a.tail === null && a.tailMode === "hidden" && !u.alternate && !X) return I(l), null;
        } else 2 * Xt() - a.renderingStartTime > ru && e !== 536870912 && (l.flags |= 128, n = true, Sa(a, false), l.lanes = 4194304);
        a.isBackwards ? (u.sibling = l.child, l.child = u) : (t = a.last, t !== null ? t.sibling = u : l.child = u, a.last = u);
      }
      return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = Xt(), t.sibling = null, e = ct.current, F(ct, n ? e & 1 | 2 : e & 1), X && bl(l, a.treeForkCount), t) : (I(l), null);
    case 22:
    case 23:
      return Yt(l), $c(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? e & 536870912 && !(l.flags & 128) && (I(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : I(l), e = l.updateQueue, e !== null && jn(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && xt(me), null;
    case 24:
      return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), Al(mt), I(l), null;
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(x(156, l.tag));
}
function th(t, l) {
  switch (wc(l), l.tag) {
    case 1:
      return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
    case 3:
      return Al(mt), Fe(), t = l.flags, t & 65536 && !(t & 128) ? (l.flags = t & -65537 | 128, l) : null;
    case 26:
    case 27:
    case 5:
      return Wn(l), null;
    case 31:
      if (l.memoizedState !== null) {
        if (Yt(l), l.alternate === null) throw Error(x(340));
        ge();
      }
      return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
    case 13:
      if (Yt(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
        if (l.alternate === null) throw Error(x(340));
        ge();
      }
      return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
    case 19:
      return xt(ct), null;
    case 4:
      return Fe(), null;
    case 10:
      return Al(l.type), null;
    case 22:
    case 23:
      return Yt(l), $c(), t !== null && xt(me), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
    case 24:
      return Al(mt), null;
    case 25:
      return null;
    default:
      return null;
  }
}
function ld(t, l) {
  switch (wc(l), l.tag) {
    case 3:
      Al(mt), Fe();
      break;
    case 26:
    case 27:
    case 5:
      Wn(l);
      break;
    case 4:
      Fe();
      break;
    case 31:
      l.memoizedState !== null && Yt(l);
      break;
    case 13:
      Yt(l);
      break;
    case 19:
      xt(ct);
      break;
    case 10:
      Al(l.type);
      break;
    case 22:
    case 23:
      Yt(l), $c(), t !== null && xt(me);
      break;
    case 24:
      Al(mt);
  }
}
function dn(t, l) {
  try {
    var e = l.updateQueue, a = e !== null ? e.lastEffect : null;
    if (a !== null) {
      var n = a.next;
      e = n;
      do {
        if ((e.tag & t) === t) {
          a = void 0;
          var u = e.create, i = e.inst;
          a = u(), i.destroy = a;
        }
        e = e.next;
      } while (e !== n);
    }
  } catch (c) {
    V(l, l.return, c);
  }
}
function le(t, l, e) {
  try {
    var a = l.updateQueue, n = a !== null ? a.lastEffect : null;
    if (n !== null) {
      var u = n.next;
      a = u;
      do {
        if ((a.tag & t) === t) {
          var i = a.inst, c = i.destroy;
          if (c !== void 0) {
            i.destroy = void 0, n = l;
            var s = e, r = c;
            try {
              r();
            } catch (v) {
              V(n, s, v);
            }
          }
        }
        a = a.next;
      } while (a !== u);
    }
  } catch (v) {
    V(l, l.return, v);
  }
}
function ed(t) {
  var l = t.updateQueue;
  if (l !== null) {
    var e = t.stateNode;
    try {
      rr(l, e);
    } catch (a) {
      V(t, t.return, a);
    }
  }
}
function ad(t, l, e) {
  e.props = pe(t.type, t.memoizedProps), e.state = t.memoizedState;
  try {
    e.componentWillUnmount();
  } catch (a) {
    V(t, l, a);
  }
}
function Ya(t, l) {
  try {
    var e = t.ref;
    if (e !== null) {
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
      typeof e == "function" ? t.refCleanup = e(a) : e.current = a;
    }
  } catch (n) {
    V(t, l, n);
  }
}
function sl(t, l) {
  var e = t.ref, a = t.refCleanup;
  if (e !== null) if (typeof a == "function") try {
    a();
  } catch (n) {
    V(t, l, n);
  } finally {
    t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
  }
  else if (typeof e == "function") try {
    e(null);
  } catch (n) {
    V(t, l, n);
  }
  else e.current = null;
}
function nd(t) {
  var l = t.type, e = t.memoizedProps, a = t.stateNode;
  try {
    t: switch (l) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        e.autoFocus && a.focus();
        break t;
      case "img":
        e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
    }
  } catch (n) {
    V(t, t.return, n);
  }
}
function yi(t, l, e) {
  try {
    var a = t.stateNode;
    zh(a, t.type, e, l), a[Bt] = l;
  } catch (n) {
    V(t, t.return, n);
  }
}
function ud(t) {
  return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ne(t.type) || t.tag === 4;
}
function gi(t) {
  t: for (; ; ) {
    for (; t.sibling === null; ) {
      if (t.return === null || ud(t.return)) return null;
      t = t.return;
    }
    for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
      if (t.tag === 27 && ne(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
      t.child.return = t, t = t.child;
    }
    if (!(t.flags & 2)) return t.stateNode;
  }
}
function cc(t, l, e) {
  var a = t.tag;
  if (a === 5 || a === 6) t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = Sl));
  else if (a !== 4 && (a === 27 && ne(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null)) for (cc(t, l, e), t = t.sibling; t !== null; ) cc(t, l, e), t = t.sibling;
}
function ou(t, l, e) {
  var a = t.tag;
  if (a === 5 || a === 6) t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
  else if (a !== 4 && (a === 27 && ne(t.type) && (e = t.stateNode), t = t.child, t !== null)) for (ou(t, l, e), t = t.sibling; t !== null; ) ou(t, l, e), t = t.sibling;
}
function id(t) {
  var l = t.stateNode, e = t.memoizedProps;
  try {
    for (var a = t.type, n = l.attributes; n.length; ) l.removeAttributeNode(n[0]);
    At(l, a, e), l[St] = t, l[Bt] = e;
  } catch (u) {
    V(t, t.return, u);
  }
}
var xl = false, dt = false, vi = false, Ns = typeof WeakSet == "function" ? WeakSet : Set, vt = null;
function lh(t, l) {
  if (t = t.containerInfo, hc = Su, t = Jo(t), qc(t)) {
    if ("selectionStart" in t) var e = { start: t.selectionStart, end: t.selectionEnd };
    else t: {
      e = (e = t.ownerDocument) && e.defaultView || window;
      var a = e.getSelection && e.getSelection();
      if (a && a.rangeCount !== 0) {
        e = a.anchorNode;
        var n = a.anchorOffset, u = a.focusNode;
        a = a.focusOffset;
        try {
          e.nodeType, u.nodeType;
        } catch {
          e = null;
          break t;
        }
        var i = 0, c = -1, s = -1, r = 0, v = 0, y = t, m = null;
        l: for (; ; ) {
          for (var h; y !== e || n !== 0 && y.nodeType !== 3 || (c = i + n), y !== u || a !== 0 && y.nodeType !== 3 || (s = i + a), y.nodeType === 3 && (i += y.nodeValue.length), (h = y.firstChild) !== null; ) m = y, y = h;
          for (; ; ) {
            if (y === t) break l;
            if (m === e && ++r === n && (c = i), m === u && ++v === a && (s = i), (h = y.nextSibling) !== null) break;
            y = m, m = y.parentNode;
          }
          y = h;
        }
        e = c === -1 || s === -1 ? null : { start: c, end: s };
      } else e = null;
    }
    e = e || { start: 0, end: 0 };
  } else e = null;
  for (yc = { focusedElem: t, selectionRange: e }, Su = false, vt = l; vt !== null; ) if (l = vt, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null) t.return = l, vt = t;
  else for (; vt !== null; ) {
    switch (l = vt, u = l.alternate, t = l.flags, l.tag) {
      case 0:
        if (t & 4 && (t = l.updateQueue, t = t !== null ? t.events : null, t !== null)) for (e = 0; e < t.length; e++) n = t[e], n.ref.impl = n.nextImpl;
        break;
      case 11:
      case 15:
        break;
      case 1:
        if (t & 1024 && u !== null) {
          t = void 0, e = l, n = u.memoizedProps, u = u.memoizedState, a = e.stateNode;
          try {
            var p = pe(e.type, n);
            t = a.getSnapshotBeforeUpdate(p, u), a.__reactInternalSnapshotBeforeUpdate = t;
          } catch (S) {
            V(e, e.return, S);
          }
        }
        break;
      case 3:
        if (t & 1024) {
          if (t = l.stateNode.containerInfo, e = t.nodeType, e === 9) vc(t);
          else if (e === 1) switch (t.nodeName) {
            case "HEAD":
            case "HTML":
            case "BODY":
              vc(t);
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
        if (t & 1024) throw Error(x(163));
    }
    if (t = l.sibling, t !== null) {
      t.return = l.return, vt = t;
      break;
    }
    vt = l.return;
  }
}
function cd(t, l, e) {
  var a = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 15:
      gl(t, e), a & 4 && dn(5, e);
      break;
    case 1:
      if (gl(t, e), a & 4) if (t = e.stateNode, l === null) try {
        t.componentDidMount();
      } catch (i) {
        V(e, e.return, i);
      }
      else {
        var n = pe(e.type, l.memoizedProps);
        l = l.memoizedState;
        try {
          t.componentDidUpdate(n, l, t.__reactInternalSnapshotBeforeUpdate);
        } catch (i) {
          V(e, e.return, i);
        }
      }
      a & 64 && ed(e), a & 512 && Ya(e, e.return);
      break;
    case 3:
      if (gl(t, e), a & 64 && (t = e.updateQueue, t !== null)) {
        if (l = null, e.child !== null) switch (e.child.tag) {
          case 27:
          case 5:
            l = e.child.stateNode;
            break;
          case 1:
            l = e.child.stateNode;
        }
        try {
          rr(t, l);
        } catch (i) {
          V(e, e.return, i);
        }
      }
      break;
    case 27:
      l === null && a & 4 && id(e);
    case 26:
    case 5:
      gl(t, e), l === null && a & 4 && nd(e), a & 512 && Ya(e, e.return);
      break;
    case 12:
      gl(t, e);
      break;
    case 31:
      gl(t, e), a & 4 && od(t, e);
      break;
    case 13:
      gl(t, e), a & 4 && rd(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = oh.bind(null, e), _h(t, e))));
      break;
    case 22:
      if (a = e.memoizedState !== null || xl, !a) {
        l = l !== null && l.memoizedState !== null || dt, n = xl;
        var u = dt;
        xl = a, (dt = l) && !u ? vl(t, e, (e.subtreeFlags & 8772) !== 0) : gl(t, e), xl = n, dt = u;
      }
      break;
    case 30:
      break;
    default:
      gl(t, e);
  }
}
function fd(t) {
  var l = t.alternate;
  l !== null && (t.alternate = null, fd(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && Cc(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
}
var et = null, Ut = false;
function yl(t, l, e) {
  for (e = e.child; e !== null; ) sd(t, l, e), e = e.sibling;
}
function sd(t, l, e) {
  if (Zt && typeof Zt.onCommitFiberUnmount == "function") try {
    Zt.onCommitFiberUnmount(nn, e);
  } catch {
  }
  switch (e.tag) {
    case 26:
      dt || sl(e, l), yl(t, l, e), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
      break;
    case 27:
      dt || sl(e, l);
      var a = et, n = Ut;
      ne(e.type) && (et = e.stateNode, Ut = false), yl(t, l, e), Za(e.stateNode), et = a, Ut = n;
      break;
    case 5:
      dt || sl(e, l);
    case 6:
      if (a = et, n = Ut, et = null, yl(t, l, e), et = a, Ut = n, et !== null) if (Ut) try {
        (et.nodeType === 9 ? et.body : et.nodeName === "HTML" ? et.ownerDocument.body : et).removeChild(e.stateNode);
      } catch (u) {
        V(e, l, u);
      }
      else try {
        et.removeChild(e.stateNode);
      } catch (u) {
        V(e, l, u);
      }
      break;
    case 18:
      et !== null && (Ut ? (t = et, Ys(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, e.stateNode), ca(t)) : Ys(et, e.stateNode));
      break;
    case 4:
      a = et, n = Ut, et = e.stateNode.containerInfo, Ut = true, yl(t, l, e), et = a, Ut = n;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      le(2, e, l), dt || le(4, e, l), yl(t, l, e);
      break;
    case 1:
      dt || (sl(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && ad(e, l, a)), yl(t, l, e);
      break;
    case 21:
      yl(t, l, e);
      break;
    case 22:
      dt = (a = dt) || e.memoizedState !== null, yl(t, l, e), dt = a;
      break;
    default:
      yl(t, l, e);
  }
}
function od(t, l) {
  if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
    t = t.dehydrated;
    try {
      ca(t);
    } catch (e) {
      V(l, l.return, e);
    }
  }
}
function rd(t, l) {
  if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null)))) try {
    ca(t);
  } catch (e) {
    V(l, l.return, e);
  }
}
function eh(t) {
  switch (t.tag) {
    case 31:
    case 13:
    case 19:
      var l = t.stateNode;
      return l === null && (l = t.stateNode = new Ns()), l;
    case 22:
      return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new Ns()), l;
    default:
      throw Error(x(435, t.tag));
  }
}
function En(t, l) {
  var e = eh(t);
  l.forEach(function(a) {
    if (!e.has(a)) {
      e.add(a);
      var n = rh.bind(null, t, a);
      a.then(n, n);
    }
  });
}
function _t(t, l) {
  var e = l.deletions;
  if (e !== null) for (var a = 0; a < e.length; a++) {
    var n = e[a], u = t, i = l, c = i;
    t: for (; c !== null; ) {
      switch (c.tag) {
        case 27:
          if (ne(c.type)) {
            et = c.stateNode, Ut = false;
            break t;
          }
          break;
        case 5:
          et = c.stateNode, Ut = false;
          break t;
        case 3:
        case 4:
          et = c.stateNode.containerInfo, Ut = true;
          break t;
      }
      c = c.return;
    }
    if (et === null) throw Error(x(160));
    sd(u, i, n), et = null, Ut = false, u = n.alternate, u !== null && (u.return = null), n.return = null;
  }
  if (l.subtreeFlags & 13886) for (l = l.child; l !== null; ) dd(l, t), l = l.sibling;
}
var ul = null;
function dd(t, l) {
  var e = t.alternate, a = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      _t(l, t), Mt(t), a & 4 && (le(3, t, t.return), dn(3, t), le(5, t, t.return));
      break;
    case 1:
      _t(l, t), Mt(t), a & 512 && (dt || e === null || sl(e, e.return)), a & 64 && xl && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
      break;
    case 26:
      var n = ul;
      if (_t(l, t), Mt(t), a & 512 && (dt || e === null || sl(e, e.return)), a & 4) {
        var u = e !== null ? e.memoizedState : null;
        if (a = t.memoizedState, e === null) if (a === null) if (t.stateNode === null) {
          t: {
            a = t.type, e = t.memoizedProps, n = n.ownerDocument || n;
            l: switch (a) {
              case "title":
                u = n.getElementsByTagName("title")[0], (!u || u[fn] || u[St] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(u, n.querySelector("head > title"))), At(u, a, e), u[St] = t, bt(u), a = u;
                break t;
              case "link":
                var i = Vs("link", "href", n).get(a + (e.href || ""));
                if (i) {
                  for (var c = 0; c < i.length; c++) if (u = i[c], u.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && u.getAttribute("rel") === (e.rel == null ? null : e.rel) && u.getAttribute("title") === (e.title == null ? null : e.title) && u.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                    i.splice(c, 1);
                    break l;
                  }
                }
                u = n.createElement(a), At(u, a, e), n.head.appendChild(u);
                break;
              case "meta":
                if (i = Vs("meta", "content", n).get(a + (e.content || ""))) {
                  for (c = 0; c < i.length; c++) if (u = i[c], u.getAttribute("content") === (e.content == null ? null : "" + e.content) && u.getAttribute("name") === (e.name == null ? null : e.name) && u.getAttribute("property") === (e.property == null ? null : e.property) && u.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && u.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                    i.splice(c, 1);
                    break l;
                  }
                }
                u = n.createElement(a), At(u, a, e), n.head.appendChild(u);
                break;
              default:
                throw Error(x(468, a));
            }
            u[St] = t, bt(u), a = u;
          }
          t.stateNode = a;
        } else Ks(n, t.type, t.stateNode);
        else t.stateNode = ws(n, a, t.memoizedProps);
        else u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? Ks(n, t.type, t.stateNode) : ws(n, a, t.memoizedProps)) : a === null && t.stateNode !== null && yi(t, t.memoizedProps, e.memoizedProps);
      }
      break;
    case 27:
      _t(l, t), Mt(t), a & 512 && (dt || e === null || sl(e, e.return)), e !== null && a & 4 && yi(t, t.memoizedProps, e.memoizedProps);
      break;
    case 5:
      if (_t(l, t), Mt(t), a & 512 && (dt || e === null || sl(e, e.return)), t.flags & 32) {
        n = t.stateNode;
        try {
          Pe(n, "");
        } catch (p) {
          V(t, t.return, p);
        }
      }
      a & 4 && t.stateNode != null && (n = t.memoizedProps, yi(t, n, e !== null ? e.memoizedProps : n)), a & 1024 && (vi = true);
      break;
    case 6:
      if (_t(l, t), Mt(t), a & 4) {
        if (t.stateNode === null) throw Error(x(162));
        a = t.memoizedProps, e = t.stateNode;
        try {
          e.nodeValue = a;
        } catch (p) {
          V(t, t.return, p);
        }
      }
      break;
    case 3:
      if (Vn = null, n = ul, ul = bu(l.containerInfo), _t(l, t), ul = n, Mt(t), a & 4 && e !== null && e.memoizedState.isDehydrated) try {
        ca(l.containerInfo);
      } catch (p) {
        V(t, t.return, p);
      }
      vi && (vi = false, md(t));
      break;
    case 4:
      a = ul, ul = bu(t.stateNode.containerInfo), _t(l, t), Mt(t), ul = a;
      break;
    case 12:
      _t(l, t), Mt(t);
      break;
    case 31:
      _t(l, t), Mt(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, En(t, a)));
      break;
    case 13:
      _t(l, t), Mt(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Gu = Xt()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, En(t, a)));
      break;
    case 22:
      n = t.memoizedState !== null;
      var s = e !== null && e.memoizedState !== null, r = xl, v = dt;
      if (xl = r || n, dt = v || s, _t(l, t), dt = v, xl = r, Mt(t), a & 8192) t: for (l = t.stateNode, l._visibility = n ? l._visibility & -2 : l._visibility | 1, n && (e === null || s || xl || dt || oe(t)), e = null, l = t; ; ) {
        if (l.tag === 5 || l.tag === 26) {
          if (e === null) {
            s = e = l;
            try {
              if (u = s.stateNode, n) i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
              else {
                c = s.stateNode;
                var y = s.memoizedProps.style, m = y != null && y.hasOwnProperty("display") ? y.display : null;
                c.style.display = m == null || typeof m == "boolean" ? "" : ("" + m).trim();
              }
            } catch (p) {
              V(s, s.return, p);
            }
          }
        } else if (l.tag === 6) {
          if (e === null) {
            s = l;
            try {
              s.stateNode.nodeValue = n ? "" : s.memoizedProps;
            } catch (p) {
              V(s, s.return, p);
            }
          }
        } else if (l.tag === 18) {
          if (e === null) {
            s = l;
            try {
              var h = s.stateNode;
              n ? qs(h, true) : qs(s.stateNode, false);
            } catch (p) {
              V(s, s.return, p);
            }
          }
        } else if ((l.tag !== 22 && l.tag !== 23 || l.memoizedState === null || l === t) && l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === t) break t;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) break t;
          e === l && (e = null), l = l.return;
        }
        e === l && (e = null), l.sibling.return = l.return, l = l.sibling;
      }
      a & 4 && (a = t.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, En(t, e))));
      break;
    case 19:
      _t(l, t), Mt(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, En(t, a)));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      _t(l, t), Mt(t);
  }
}
function Mt(t) {
  var l = t.flags;
  if (l & 2) {
    try {
      for (var e, a = t.return; a !== null; ) {
        if (ud(a)) {
          e = a;
          break;
        }
        a = a.return;
      }
      if (e == null) throw Error(x(160));
      switch (e.tag) {
        case 27:
          var n = e.stateNode, u = gi(t);
          ou(t, u, n);
          break;
        case 5:
          var i = e.stateNode;
          e.flags & 32 && (Pe(i, ""), e.flags &= -33);
          var c = gi(t);
          ou(t, c, i);
          break;
        case 3:
        case 4:
          var s = e.stateNode.containerInfo, r = gi(t);
          cc(t, r, s);
          break;
        default:
          throw Error(x(161));
      }
    } catch (v) {
      V(t, t.return, v);
    }
    t.flags &= -3;
  }
  l & 4096 && (t.flags &= -4097);
}
function md(t) {
  if (t.subtreeFlags & 1024) for (t = t.child; t !== null; ) {
    var l = t;
    md(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
  }
}
function gl(t, l) {
  if (l.subtreeFlags & 8772) for (l = l.child; l !== null; ) cd(t, l.alternate, l), l = l.sibling;
}
function oe(t) {
  for (t = t.child; t !== null; ) {
    var l = t;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        le(4, l, l.return), oe(l);
        break;
      case 1:
        sl(l, l.return);
        var e = l.stateNode;
        typeof e.componentWillUnmount == "function" && ad(l, l.return, e), oe(l);
        break;
      case 27:
        Za(l.stateNode);
      case 26:
      case 5:
        sl(l, l.return), oe(l);
        break;
      case 22:
        l.memoizedState === null && oe(l);
        break;
      case 30:
        oe(l);
        break;
      default:
        oe(l);
    }
    t = t.sibling;
  }
}
function vl(t, l, e) {
  for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
    var a = l.alternate, n = t, u = l, i = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        vl(n, u, e), dn(4, u);
        break;
      case 1:
        if (vl(n, u, e), a = u, n = a.stateNode, typeof n.componentDidMount == "function") try {
          n.componentDidMount();
        } catch (r) {
          V(a, a.return, r);
        }
        if (a = u, n = a.updateQueue, n !== null) {
          var c = a.stateNode;
          try {
            var s = n.shared.hiddenCallbacks;
            if (s !== null) for (n.shared.hiddenCallbacks = null, n = 0; n < s.length; n++) or(s[n], c);
          } catch (r) {
            V(a, a.return, r);
          }
        }
        e && i & 64 && ed(u), Ya(u, u.return);
        break;
      case 27:
        id(u);
      case 26:
      case 5:
        vl(n, u, e), e && a === null && i & 4 && nd(u), Ya(u, u.return);
        break;
      case 12:
        vl(n, u, e);
        break;
      case 31:
        vl(n, u, e), e && i & 4 && od(n, u);
        break;
      case 13:
        vl(n, u, e), e && i & 4 && rd(n, u);
        break;
      case 22:
        u.memoizedState === null && vl(n, u, e), Ya(u, u.return);
        break;
      case 30:
        break;
      default:
        vl(n, u, e);
    }
    l = l.sibling;
  }
}
function df(t, l) {
  var e = null;
  t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && on(e));
}
function mf(t, l) {
  t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && on(t));
}
function nl(t, l, e, a) {
  if (l.subtreeFlags & 10256) for (l = l.child; l !== null; ) hd(t, l, e, a), l = l.sibling;
}
function hd(t, l, e, a) {
  var n = l.flags;
  switch (l.tag) {
    case 0:
    case 11:
    case 15:
      nl(t, l, e, a), n & 2048 && dn(9, l);
      break;
    case 1:
      nl(t, l, e, a);
      break;
    case 3:
      nl(t, l, e, a), n & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && on(t)));
      break;
    case 12:
      if (n & 2048) {
        nl(t, l, e, a), t = l.stateNode;
        try {
          var u = l.memoizedProps, i = u.id, c = u.onPostCommit;
          typeof c == "function" && c(i, l.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
        } catch (s) {
          V(l, l.return, s);
        }
      } else nl(t, l, e, a);
      break;
    case 31:
      nl(t, l, e, a);
      break;
    case 13:
      nl(t, l, e, a);
      break;
    case 23:
      break;
    case 22:
      u = l.stateNode, i = l.alternate, l.memoizedState !== null ? u._visibility & 2 ? nl(t, l, e, a) : qa(t, l) : u._visibility & 2 ? nl(t, l, e, a) : (u._visibility |= 2, _e(t, l, e, a, (l.subtreeFlags & 10256) !== 0 || false)), n & 2048 && df(i, l);
      break;
    case 24:
      nl(t, l, e, a), n & 2048 && mf(l.alternate, l);
      break;
    default:
      nl(t, l, e, a);
  }
}
function _e(t, l, e, a, n) {
  for (n = n && ((l.subtreeFlags & 10256) !== 0 || false), l = l.child; l !== null; ) {
    var u = t, i = l, c = e, s = a, r = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        _e(u, i, c, s, n), dn(8, i);
        break;
      case 23:
        break;
      case 22:
        var v = i.stateNode;
        i.memoizedState !== null ? v._visibility & 2 ? _e(u, i, c, s, n) : qa(u, i) : (v._visibility |= 2, _e(u, i, c, s, n)), n && r & 2048 && df(i.alternate, i);
        break;
      case 24:
        _e(u, i, c, s, n), n && r & 2048 && mf(i.alternate, i);
        break;
      default:
        _e(u, i, c, s, n);
    }
    l = l.sibling;
  }
}
function qa(t, l) {
  if (l.subtreeFlags & 10256) for (l = l.child; l !== null; ) {
    var e = t, a = l, n = a.flags;
    switch (a.tag) {
      case 22:
        qa(e, a), n & 2048 && df(a.alternate, a);
        break;
      case 24:
        qa(e, a), n & 2048 && mf(a.alternate, a);
        break;
      default:
        qa(e, a);
    }
    l = l.sibling;
  }
}
var Da = 8192;
function De(t, l, e) {
  if (t.subtreeFlags & Da) for (t = t.child; t !== null; ) yd(t, l, e), t = t.sibling;
}
function yd(t, l, e) {
  switch (t.tag) {
    case 26:
      De(t, l, e), t.flags & Da && t.memoizedState !== null && Zh(e, ul, t.memoizedState, t.memoizedProps);
      break;
    case 5:
      De(t, l, e);
      break;
    case 3:
    case 4:
      var a = ul;
      ul = bu(t.stateNode.containerInfo), De(t, l, e), ul = a;
      break;
    case 22:
      t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = Da, Da = 16777216, De(t, l, e), Da = a) : De(t, l, e));
      break;
    default:
      De(t, l, e);
  }
}
function gd(t) {
  var l = t.alternate;
  if (l !== null && (t = l.child, t !== null)) {
    l.child = null;
    do
      l = t.sibling, t.sibling = null, t = l;
    while (t !== null);
  }
}
function za(t) {
  var l = t.deletions;
  if (t.flags & 16) {
    if (l !== null) for (var e = 0; e < l.length; e++) {
      var a = l[e];
      vt = a, bd(a, t);
    }
    gd(t);
  }
  if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) vd(t), t = t.sibling;
}
function vd(t) {
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      za(t), t.flags & 2048 && le(9, t, t.return);
      break;
    case 3:
      za(t);
      break;
    case 12:
      za(t);
      break;
    case 22:
      var l = t.stateNode;
      t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, Ln(t)) : za(t);
      break;
    default:
      za(t);
  }
}
function Ln(t) {
  var l = t.deletions;
  if (t.flags & 16) {
    if (l !== null) for (var e = 0; e < l.length; e++) {
      var a = l[e];
      vt = a, bd(a, t);
    }
    gd(t);
  }
  for (t = t.child; t !== null; ) {
    switch (l = t, l.tag) {
      case 0:
      case 11:
      case 15:
        le(8, l, l.return), Ln(l);
        break;
      case 22:
        e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, Ln(l));
        break;
      default:
        Ln(l);
    }
    t = t.sibling;
  }
}
function bd(t, l) {
  for (; vt !== null; ) {
    var e = vt;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        le(8, e, l);
        break;
      case 23:
      case 22:
        if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
          var a = e.memoizedState.cachePool.pool;
          a != null && a.refCount++;
        }
        break;
      case 24:
        on(e.memoizedState.cache);
    }
    if (a = e.child, a !== null) a.return = e, vt = a;
    else t: for (e = t; vt !== null; ) {
      a = vt;
      var n = a.sibling, u = a.return;
      if (fd(a), a === e) {
        vt = null;
        break t;
      }
      if (n !== null) {
        n.return = u, vt = n;
        break t;
      }
      vt = u;
    }
  }
}
var ah = { getCacheForType: function(t) {
  var l = Tt(mt), e = l.data.get(t);
  return e === void 0 && (e = t(), l.data.set(t, e)), e;
}, cacheSignal: function() {
  return Tt(mt).controller.signal;
} }, nh = typeof WeakMap == "function" ? WeakMap : Map, Z = 0, W = null, Y = null, Q = 0, w = 0, Gt = null, Xl = false, ma = false, hf = false, _l = 0, it = 0, ee = 0, ye = 0, yf = 0, Qt = 0, aa = 0, Qa = null, Ct = null, fc = false, Gu = 0, xd = 0, ru = 1 / 0, du = null, kl = null, yt = 0, $l = null, na = null, Nl = 0, sc = 0, oc = null, pd = null, Xa = 0, rc = null;
function wt() {
  return Z & 2 && Q !== 0 ? Q & -Q : D.T !== null ? vf() : Oo();
}
function Sd() {
  if (Qt === 0) if (!(Q & 536870912) || X) {
    var t = xn;
    xn <<= 1, !(xn & 3932160) && (xn = 262144), Qt = t;
  } else Qt = 536870912;
  return t = Kt.current, t !== null && (t.flags |= 32), Qt;
}
function Ht(t, l, e) {
  (t === W && (w === 2 || w === 9) || t.cancelPendingCommit !== null) && (ua(t, 0), Zl(t, Q, Qt, false)), cn(t, e), (!(Z & 2) || t !== W) && (t === W && (!(Z & 2) && (ye |= e), it === 4 && Zl(t, Q, Qt, false)), dl(t));
}
function zd(t, l, e) {
  if (Z & 6) throw Error(x(327));
  var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || un(t, l), n = a ? ch(t, l) : bi(t, l, true), u = a;
  do {
    if (n === 0) {
      ma && !a && Zl(t, l, 0, false);
      break;
    } else {
      if (e = t.current.alternate, u && !uh(e)) {
        n = bi(t, l, false), u = false;
        continue;
      }
      if (n === 2) {
        if (u = l, t.errorRecoveryDisabledLanes & u) var i = 0;
        else i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
        if (i !== 0) {
          l = i;
          t: {
            var c = t;
            n = Qa;
            var s = c.current.memoizedState.isDehydrated;
            if (s && (ua(c, i).flags |= 256), i = bi(c, i, false), i !== 2) {
              if (hf && !s) {
                c.errorRecoveryDisabledLanes |= u, ye |= u, n = 4;
                break t;
              }
              u = Ct, Ct = n, u !== null && (Ct === null ? Ct = u : Ct.push.apply(Ct, u));
            }
            n = i;
          }
          if (u = false, n !== 2) continue;
        }
      }
      if (n === 1) {
        ua(t, 0), Zl(t, l, 0, true);
        break;
      }
      t: {
        switch (a = t, u = n, u) {
          case 0:
          case 1:
            throw Error(x(345));
          case 4:
            if ((l & 4194048) !== l) break;
          case 6:
            Zl(a, l, Qt, !Xl);
            break t;
          case 2:
            Ct = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(x(329));
        }
        if ((l & 62914560) === l && (n = Gu + 300 - Xt(), 10 < n)) {
          if (Zl(a, l, Qt, !Xl), ju(a, 0, true) !== 0) break t;
          Nl = l, a.timeoutHandle = Zd(js.bind(null, a, e, Ct, du, fc, l, Qt, ye, aa, Xl, u, "Throttled", -0, 0), n);
          break t;
        }
        js(a, e, Ct, du, fc, l, Qt, ye, aa, Xl, u, null, -0, 0);
      }
    }
    break;
  } while (true);
  dl(t);
}
function js(t, l, e, a, n, u, i, c, s, r, v, y, m, h) {
  if (t.timeoutHandle = -1, y = l.subtreeFlags, y & 8192 || (y & 16785408) === 16785408) {
    y = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: true, waitingForViewTransition: false, unsuspend: Sl }, yd(l, u, y);
    var p = (u & 62914560) === u ? Gu - Xt() : (u & 4194048) === u ? xd - Xt() : 0;
    if (p = Lh(y, p), p !== null) {
      Nl = u, t.cancelPendingCommit = p(Ds.bind(null, t, l, u, e, a, n, i, c, s, v, y, null, m, h)), Zl(t, u, i, !r);
      return;
    }
  }
  Ds(t, l, u, e, a, n, i, c, s);
}
function uh(t) {
  for (var l = t; ; ) {
    var e = l.tag;
    if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null))) for (var a = 0; a < e.length; a++) {
      var n = e[a], u = n.getSnapshot;
      n = n.value;
      try {
        if (!Vt(u(), n)) return false;
      } catch {
        return false;
      }
    }
    if (e = l.child, l.subtreeFlags & 16384 && e !== null) e.return = l, l = e;
    else {
      if (l === t) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) return true;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
  }
  return true;
}
function Zl(t, l, e, a) {
  l &= ~yf, l &= ~ye, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
  for (var n = l; 0 < n; ) {
    var u = 31 - Lt(n), i = 1 << u;
    a[u] = -1, n &= ~i;
  }
  e !== 0 && jo(t, e, l);
}
function Yu() {
  return Z & 6 ? true : (mn(0), false);
}
function gf() {
  if (Y !== null) {
    if (w === 0) var t = Y.return;
    else t = Y, zl = Ne = null, tf(t), ke = null, $a = 0, t = Y;
    for (; t !== null; ) ld(t.alternate, t), t = t.return;
    Y = null;
  }
}
function ua(t, l) {
  var e = t.timeoutHandle;
  e !== -1 && (t.timeoutHandle = -1, Nh(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), Nl = 0, gf(), W = t, Y = e = Tl(t.current, null), Q = l, w = 0, Gt = null, Xl = false, ma = un(t, l), hf = false, aa = Qt = yf = ye = ee = it = 0, Ct = Qa = null, fc = false, l & 8 && (l |= l & 32);
  var a = t.entangledLanes;
  if (a !== 0) for (t = t.entanglements, a &= l; 0 < a; ) {
    var n = 31 - Lt(a), u = 1 << n;
    l |= t[n], a &= ~u;
  }
  return _l = l, _u(), e;
}
function Td(t, l) {
  B = null, D.H = Fa, l === da || l === Uu ? (l = ns(), w = 3) : l === Jc ? (l = ns(), w = 4) : w = l === of ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, Gt = l, Y === null && (it = 1, fu(t, It(l, t.current)));
}
function Ad() {
  var t = Kt.current;
  return t === null ? true : (Q & 4194048) === Q ? tl === null : (Q & 62914560) === Q || Q & 536870912 ? t === tl : false;
}
function Nd() {
  var t = D.H;
  return D.H = Fa, t === null ? Fa : t;
}
function jd() {
  var t = D.A;
  return D.A = ah, t;
}
function mu() {
  it = 4, Xl || (Q & 4194048) !== Q && Kt.current !== null || (ma = true), !(ee & 134217727) && !(ye & 134217727) || W === null || Zl(W, Q, Qt, false);
}
function bi(t, l, e) {
  var a = Z;
  Z |= 2;
  var n = Nd(), u = jd();
  (W !== t || Q !== l) && (du = null, ua(t, l)), l = false;
  var i = it;
  t: do
    try {
      if (w !== 0 && Y !== null) {
        var c = Y, s = Gt;
        switch (w) {
          case 8:
            gf(), i = 6;
            break t;
          case 3:
          case 2:
          case 9:
          case 6:
            Kt.current === null && (l = true);
            var r = w;
            if (w = 0, Gt = null, Le(t, c, s, r), e && ma) {
              i = 0;
              break t;
            }
            break;
          default:
            r = w, w = 0, Gt = null, Le(t, c, s, r);
        }
      }
      ih(), i = it;
      break;
    } catch (v) {
      Td(t, v);
    }
  while (true);
  return l && t.shellSuspendCounter++, zl = Ne = null, Z = a, D.H = n, D.A = u, Y === null && (W = null, Q = 0, _u()), i;
}
function ih() {
  for (; Y !== null; ) Ed(Y);
}
function ch(t, l) {
  var e = Z;
  Z |= 2;
  var a = Nd(), n = jd();
  W !== t || Q !== l ? (du = null, ru = Xt() + 500, ua(t, l)) : ma = un(t, l);
  t: do
    try {
      if (w !== 0 && Y !== null) {
        l = Y;
        var u = Gt;
        l: switch (w) {
          case 1:
            w = 0, Gt = null, Le(t, l, u, 1);
            break;
          case 2:
          case 9:
            if (as(u)) {
              w = 0, Gt = null, Es(l);
              break;
            }
            l = function() {
              w !== 2 && w !== 9 || W !== t || (w = 7), dl(t);
            }, u.then(l, l);
            break t;
          case 3:
            w = 7;
            break t;
          case 4:
            w = 5;
            break t;
          case 7:
            as(u) ? (w = 0, Gt = null, Es(l)) : (w = 0, Gt = null, Le(t, l, u, 7));
            break;
          case 5:
            var i = null;
            switch (Y.tag) {
              case 26:
                i = Y.memoizedState;
              case 5:
              case 27:
                var c = Y;
                if (i ? Jd(i) : c.stateNode.complete) {
                  w = 0, Gt = null;
                  var s = c.sibling;
                  if (s !== null) Y = s;
                  else {
                    var r = c.return;
                    r !== null ? (Y = r, qu(r)) : Y = null;
                  }
                  break l;
                }
            }
            w = 0, Gt = null, Le(t, l, u, 5);
            break;
          case 6:
            w = 0, Gt = null, Le(t, l, u, 6);
            break;
          case 8:
            gf(), it = 6;
            break t;
          default:
            throw Error(x(462));
        }
      }
      fh();
      break;
    } catch (v) {
      Td(t, v);
    }
  while (true);
  return zl = Ne = null, D.H = a, D.A = n, Z = e, Y !== null ? 0 : (W = null, Q = 0, _u(), it);
}
function fh() {
  for (; Y !== null && !M0(); ) Ed(Y);
}
function Ed(t) {
  var l = td(t.alternate, t, _l);
  t.memoizedProps = t.pendingProps, l === null ? qu(t) : Y = l;
}
function Es(t) {
  var l = t, e = l.alternate;
  switch (l.tag) {
    case 15:
    case 0:
      l = ps(e, l, l.pendingProps, l.type, void 0, Q);
      break;
    case 11:
      l = ps(e, l, l.pendingProps, l.type.render, l.ref, Q);
      break;
    case 5:
      tf(l);
    default:
      ld(e, l), l = Y = lr(l, _l), l = td(e, l, _l);
  }
  t.memoizedProps = t.pendingProps, l === null ? qu(t) : Y = l;
}
function Le(t, l, e, a) {
  zl = Ne = null, tf(l), ke = null, $a = 0;
  var n = l.return;
  try {
    if (Wm(t, n, l, e, Q)) {
      it = 1, fu(t, It(e, t.current)), Y = null;
      return;
    }
  } catch (u) {
    if (n !== null) throw Y = n, u;
    it = 1, fu(t, It(e, t.current)), Y = null;
    return;
  }
  l.flags & 32768 ? (X || a === 1 ? t = true : ma || Q & 536870912 ? t = false : (Xl = t = true, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Kt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Dd(l, t)) : qu(l);
}
function qu(t) {
  var l = t;
  do {
    if (l.flags & 32768) {
      Dd(l, Xl);
      return;
    }
    t = l.return;
    var e = Pm(l.alternate, l, _l);
    if (e !== null) {
      Y = e;
      return;
    }
    if (l = l.sibling, l !== null) {
      Y = l;
      return;
    }
    Y = l = t;
  } while (l !== null);
  it === 0 && (it = 5);
}
function Dd(t, l) {
  do {
    var e = th(t.alternate, t);
    if (e !== null) {
      e.flags &= 32767, Y = e;
      return;
    }
    if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
      Y = t;
      return;
    }
    Y = t = e;
  } while (t !== null);
  it = 6, Y = null;
}
function Ds(t, l, e, a, n, u, i, c, s) {
  t.cancelPendingCommit = null;
  do
    Qu();
  while (yt !== 0);
  if (Z & 6) throw Error(x(327));
  if (l !== null) {
    if (l === t.current) throw Error(x(177));
    if (u = l.lanes | l.childLanes, u |= Qc, X0(t, e, u, i, c, s), t === W && (Y = W = null, Q = 0), na = l, $l = t, Nl = e, sc = u, oc = n, pd = a, l.subtreeFlags & 10256 || l.flags & 10256 ? (t.callbackNode = null, t.callbackPriority = 0, dh(Fn, function() {
      return Cd(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), a = (l.flags & 13878) !== 0, l.subtreeFlags & 13878 || a) {
      a = D.T, D.T = null, n = L.p, L.p = 2, i = Z, Z |= 4;
      try {
        lh(t, l, e);
      } finally {
        Z = i, L.p = n, D.T = a;
      }
    }
    yt = 1, Od(), _d(), Md();
  }
}
function Od() {
  if (yt === 1) {
    yt = 0;
    var t = $l, l = na, e = (l.flags & 13878) !== 0;
    if (l.subtreeFlags & 13878 || e) {
      e = D.T, D.T = null;
      var a = L.p;
      L.p = 2;
      var n = Z;
      Z |= 4;
      try {
        dd(l, t);
        var u = yc, i = Jo(t.containerInfo), c = u.focusedElem, s = u.selectionRange;
        if (i !== c && c && c.ownerDocument && Ko(c.ownerDocument.documentElement, c)) {
          if (s !== null && qc(c)) {
            var r = s.start, v = s.end;
            if (v === void 0 && (v = r), "selectionStart" in c) c.selectionStart = r, c.selectionEnd = Math.min(v, c.value.length);
            else {
              var y = c.ownerDocument || document, m = y && y.defaultView || window;
              if (m.getSelection) {
                var h = m.getSelection(), p = c.textContent.length, S = Math.min(s.start, p), z = s.end === void 0 ? S : Math.min(s.end, p);
                !h.extend && S > z && (i = z, z = S, S = i);
                var d = Wf(c, S), o = Wf(c, z);
                if (d && o && (h.rangeCount !== 1 || h.anchorNode !== d.node || h.anchorOffset !== d.offset || h.focusNode !== o.node || h.focusOffset !== o.offset)) {
                  var g = y.createRange();
                  g.setStart(d.node, d.offset), h.removeAllRanges(), S > z ? (h.addRange(g), h.extend(o.node, o.offset)) : (g.setEnd(o.node, o.offset), h.addRange(g));
                }
              }
            }
          }
          for (y = [], h = c; h = h.parentNode; ) h.nodeType === 1 && y.push({ element: h, left: h.scrollLeft, top: h.scrollTop });
          for (typeof c.focus == "function" && c.focus(), c = 0; c < y.length; c++) {
            var b = y[c];
            b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
          }
        }
        Su = !!hc, yc = hc = null;
      } finally {
        Z = n, L.p = a, D.T = e;
      }
    }
    t.current = l, yt = 2;
  }
}
function _d() {
  if (yt === 2) {
    yt = 0;
    var t = $l, l = na, e = (l.flags & 8772) !== 0;
    if (l.subtreeFlags & 8772 || e) {
      e = D.T, D.T = null;
      var a = L.p;
      L.p = 2;
      var n = Z;
      Z |= 4;
      try {
        cd(t, l.alternate, l);
      } finally {
        Z = n, L.p = a, D.T = e;
      }
    }
    yt = 3;
  }
}
function Md() {
  if (yt === 4 || yt === 3) {
    yt = 0, U0();
    var t = $l, l = na, e = Nl, a = pd;
    l.subtreeFlags & 10256 || l.flags & 10256 ? yt = 5 : (yt = 0, na = $l = null, Ud(t, t.pendingLanes));
    var n = t.pendingLanes;
    if (n === 0 && (kl = null), Uc(e), l = l.stateNode, Zt && typeof Zt.onCommitFiberRoot == "function") try {
      Zt.onCommitFiberRoot(nn, l, void 0, (l.current.flags & 128) === 128);
    } catch {
    }
    if (a !== null) {
      l = D.T, n = L.p, L.p = 2, D.T = null;
      try {
        for (var u = t.onRecoverableError, i = 0; i < a.length; i++) {
          var c = a[i];
          u(c.value, { componentStack: c.stack });
        }
      } finally {
        D.T = l, L.p = n;
      }
    }
    Nl & 3 && Qu(), dl(t), n = t.pendingLanes, e & 261930 && n & 42 ? t === rc ? Xa++ : (Xa = 0, rc = t) : Xa = 0, mn(0);
  }
}
function Ud(t, l) {
  (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, on(l)));
}
function Qu() {
  return Od(), _d(), Md(), Cd();
}
function Cd() {
  if (yt !== 5) return false;
  var t = $l, l = sc;
  sc = 0;
  var e = Uc(Nl), a = D.T, n = L.p;
  try {
    L.p = 32 > e ? 32 : e, D.T = null, e = oc, oc = null;
    var u = $l, i = Nl;
    if (yt = 0, na = $l = null, Nl = 0, Z & 6) throw Error(x(331));
    var c = Z;
    if (Z |= 4, vd(u.current), hd(u, u.current, i, e), Z = c, mn(0, false), Zt && typeof Zt.onPostCommitFiberRoot == "function") try {
      Zt.onPostCommitFiberRoot(nn, u);
    } catch {
    }
    return true;
  } finally {
    L.p = n, D.T = a, Ud(t, l);
  }
}
function Os(t, l, e) {
  l = It(e, l), l = nc(t.stateNode, l, 2), t = Jl(t, l, 2), t !== null && (cn(t, 2), dl(t));
}
function V(t, l, e) {
  if (t.tag === 3) Os(t, t, e);
  else for (; l !== null; ) {
    if (l.tag === 3) {
      Os(l, t, e);
      break;
    } else if (l.tag === 1) {
      var a = l.stateNode;
      if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (kl === null || !kl.has(a))) {
        t = It(e, t), e = kr(2), a = Jl(l, e, 2), a !== null && ($r(e, a, l, t), cn(a, 2), dl(a));
        break;
      }
    }
    l = l.return;
  }
}
function xi(t, l, e) {
  var a = t.pingCache;
  if (a === null) {
    a = t.pingCache = new nh();
    var n = /* @__PURE__ */ new Set();
    a.set(l, n);
  } else n = a.get(l), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(l, n));
  n.has(e) || (hf = true, n.add(e), t = sh.bind(null, t, l, e), l.then(t, t));
}
function sh(t, l, e) {
  var a = t.pingCache;
  a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, W === t && (Q & e) === e && (it === 4 || it === 3 && (Q & 62914560) === Q && 300 > Xt() - Gu ? !(Z & 2) && ua(t, 0) : yf |= e, aa === Q && (aa = 0)), dl(t);
}
function Hd(t, l) {
  l === 0 && (l = No()), t = Ae(t, l), t !== null && (cn(t, l), dl(t));
}
function oh(t) {
  var l = t.memoizedState, e = 0;
  l !== null && (e = l.retryLane), Hd(t, e);
}
function rh(t, l) {
  var e = 0;
  switch (t.tag) {
    case 31:
    case 13:
      var a = t.stateNode, n = t.memoizedState;
      n !== null && (e = n.retryLane);
      break;
    case 19:
      a = t.stateNode;
      break;
    case 22:
      a = t.stateNode._retryCache;
      break;
    default:
      throw Error(x(314));
  }
  a !== null && a.delete(l), Hd(t, e);
}
function dh(t, l) {
  return _c(t, l);
}
var hu = null, Me = null, dc = false, yu = false, pi = false, Ll = 0;
function dl(t) {
  t !== Me && t.next === null && (Me === null ? hu = Me = t : Me = Me.next = t), yu = true, dc || (dc = true, hh());
}
function mn(t, l) {
  if (!pi && yu) {
    pi = true;
    do
      for (var e = false, a = hu; a !== null; ) {
        if (t !== 0) {
          var n = a.pendingLanes;
          if (n === 0) var u = 0;
          else {
            var i = a.suspendedLanes, c = a.pingedLanes;
            u = (1 << 31 - Lt(42 | t) + 1) - 1, u &= n & ~(i & ~c), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
          }
          u !== 0 && (e = true, _s(a, u));
        } else u = Q, u = ju(a, a === W ? u : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1), !(u & 3) || un(a, u) || (e = true, _s(a, u));
        a = a.next;
      }
    while (e);
    pi = false;
  }
}
function mh() {
  Bd();
}
function Bd() {
  yu = dc = false;
  var t = 0;
  Ll !== 0 && Ah() && (t = Ll);
  for (var l = Xt(), e = null, a = hu; a !== null; ) {
    var n = a.next, u = Rd(a, l);
    u === 0 ? (a.next = null, e === null ? hu = n : e.next = n, n === null && (Me = e)) : (e = a, (t !== 0 || u & 3) && (yu = true)), a = n;
  }
  yt !== 0 && yt !== 5 || mn(t), Ll !== 0 && (Ll = 0);
}
function Rd(t, l) {
  for (var e = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
    var i = 31 - Lt(u), c = 1 << i, s = n[i];
    s === -1 ? (!(c & e) || c & a) && (n[i] = Q0(c, l)) : s <= l && (t.expiredLanes |= c), u &= ~c;
  }
  if (l = W, e = Q, e = ju(t, t === l ? e : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1), a = t.callbackNode, e === 0 || t === l && (w === 2 || w === 9) || t.cancelPendingCommit !== null) return a !== null && a !== null && ku(a), t.callbackNode = null, t.callbackPriority = 0;
  if (!(e & 3) || un(t, e)) {
    if (l = e & -e, l === t.callbackPriority) return l;
    switch (a !== null && ku(a), Uc(e)) {
      case 2:
      case 8:
        e = To;
        break;
      case 32:
        e = Fn;
        break;
      case 268435456:
        e = Ao;
        break;
      default:
        e = Fn;
    }
    return a = Gd.bind(null, t), e = _c(e, a), t.callbackPriority = l, t.callbackNode = e, l;
  }
  return a !== null && a !== null && ku(a), t.callbackPriority = 2, t.callbackNode = null, 2;
}
function Gd(t, l) {
  if (yt !== 0 && yt !== 5) return t.callbackNode = null, t.callbackPriority = 0, null;
  var e = t.callbackNode;
  if (Qu() && t.callbackNode !== e) return null;
  var a = Q;
  return a = ju(t, t === W ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1), a === 0 ? null : (zd(t, a, l), Rd(t, Xt()), t.callbackNode != null && t.callbackNode === e ? Gd.bind(null, t) : null);
}
function _s(t, l) {
  if (Qu()) return null;
  zd(t, l, true);
}
function hh() {
  jh(function() {
    Z & 6 ? _c(zo, mh) : Bd();
  });
}
function vf() {
  if (Ll === 0) {
    var t = ta;
    t === 0 && (t = bn, bn <<= 1, !(bn & 261888) && (bn = 256)), Ll = t;
  }
  return Ll;
}
function Ms(t) {
  return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Hn("" + t);
}
function Us(t, l) {
  var e = l.ownerDocument.createElement("input");
  return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
}
function yh(t, l, e, a, n) {
  if (l === "submit" && e && e.stateNode === n) {
    var u = Ms((n[Bt] || null).action), i = a.submitter;
    i && (l = (l = i[Bt] || null) ? Ms(l.formAction) : i.getAttribute("formAction"), l !== null && (u = l, i = null));
    var c = new Eu("action", "action", null, a, n);
    t.push({ event: c, listeners: [{ instance: null, listener: function() {
      if (a.defaultPrevented) {
        if (Ll !== 0) {
          var s = i ? Us(n, i) : new FormData(n);
          ec(e, { pending: true, data: s, method: n.method, action: u }, null, s);
        }
      } else typeof u == "function" && (c.preventDefault(), s = i ? Us(n, i) : new FormData(n), ec(e, { pending: true, data: s, method: n.method, action: u }, u, s));
    }, currentTarget: n }] });
  }
}
for (var Si = 0; Si < wi.length; Si++) {
  var zi = wi[Si], gh = zi.toLowerCase(), vh = zi[0].toUpperCase() + zi.slice(1);
  il(gh, "on" + vh);
}
il($o, "onAnimationEnd");
il(Wo, "onAnimationIteration");
il(Fo, "onAnimationStart");
il("dblclick", "onDoubleClick");
il("focusin", "onFocus");
il("focusout", "onBlur");
il(Cm, "onTransitionRun");
il(Hm, "onTransitionStart");
il(Bm, "onTransitionCancel");
il(Io, "onTransitionEnd");
Ie("onMouseEnter", ["mouseout", "mouseover"]);
Ie("onMouseLeave", ["mouseout", "mouseover"]);
Ie("onPointerEnter", ["pointerout", "pointerover"]);
Ie("onPointerLeave", ["pointerout", "pointerover"]);
Se("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Se("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Se("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Se("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Se("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Se("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ia = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), bh = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ia));
function Yd(t, l) {
  l = (l & 4) !== 0;
  for (var e = 0; e < t.length; e++) {
    var a = t[e], n = a.event;
    a = a.listeners;
    t: {
      var u = void 0;
      if (l) for (var i = a.length - 1; 0 <= i; i--) {
        var c = a[i], s = c.instance, r = c.currentTarget;
        if (c = c.listener, s !== u && n.isPropagationStopped()) break t;
        u = c, n.currentTarget = r;
        try {
          u(n);
        } catch (v) {
          Pn(v);
        }
        n.currentTarget = null, u = s;
      }
      else for (i = 0; i < a.length; i++) {
        if (c = a[i], s = c.instance, r = c.currentTarget, c = c.listener, s !== u && n.isPropagationStopped()) break t;
        u = c, n.currentTarget = r;
        try {
          u(n);
        } catch (v) {
          Pn(v);
        }
        n.currentTarget = null, u = s;
      }
    }
  }
}
function G(t, l) {
  var e = l[Ri];
  e === void 0 && (e = l[Ri] = /* @__PURE__ */ new Set());
  var a = t + "__bubble";
  e.has(a) || (qd(l, t, 2, false), e.add(a));
}
function Ti(t, l, e) {
  var a = 0;
  l && (a |= 4), qd(e, t, a, l);
}
var Dn = "_reactListening" + Math.random().toString(36).slice(2);
function bf(t) {
  if (!t[Dn]) {
    t[Dn] = true, _o.forEach(function(e) {
      e !== "selectionchange" && (bh.has(e) || Ti(e, false, t), Ti(e, true, t));
    });
    var l = t.nodeType === 9 ? t : t.ownerDocument;
    l === null || l[Dn] || (l[Dn] = true, Ti("selectionchange", false, l));
  }
}
function qd(t, l, e, a) {
  switch (Id(l)) {
    case 2:
      var n = Kh;
      break;
    case 8:
      n = Jh;
      break;
    default:
      n = zf;
  }
  e = n.bind(null, l, e, t), n = void 0, !Xi || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (n = true), a ? n !== void 0 ? t.addEventListener(l, e, { capture: true, passive: n }) : t.addEventListener(l, e, true) : n !== void 0 ? t.addEventListener(l, e, { passive: n }) : t.addEventListener(l, e, false);
}
function Ai(t, l, e, a, n) {
  var u = a;
  if (!(l & 1) && !(l & 2) && a !== null) t: for (; ; ) {
    if (a === null) return;
    var i = a.tag;
    if (i === 3 || i === 4) {
      var c = a.stateNode.containerInfo;
      if (c === n) break;
      if (i === 4) for (i = a.return; i !== null; ) {
        var s = i.tag;
        if ((s === 3 || s === 4) && i.stateNode.containerInfo === n) return;
        i = i.return;
      }
      for (; c !== null; ) {
        if (i = He(c), i === null) return;
        if (s = i.tag, s === 5 || s === 6 || s === 26 || s === 27) {
          a = u = i;
          continue t;
        }
        c = c.parentNode;
      }
    }
    a = a.return;
  }
  Yo(function() {
    var r = u, v = Bc(e), y = [];
    t: {
      var m = Po.get(t);
      if (m !== void 0) {
        var h = Eu, p = t;
        switch (t) {
          case "keypress":
            if (Rn(e) === 0) break t;
          case "keydown":
          case "keyup":
            h = rm;
            break;
          case "focusin":
            p = "focus", h = Pu;
            break;
          case "focusout":
            p = "blur", h = Pu;
            break;
          case "beforeblur":
          case "afterblur":
            h = Pu;
            break;
          case "click":
            if (e.button === 2) break t;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            h = Qf;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            h = P0;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            h = hm;
            break;
          case $o:
          case Wo:
          case Fo:
            h = em;
            break;
          case Io:
            h = gm;
            break;
          case "scroll":
          case "scrollend":
            h = F0;
            break;
          case "wheel":
            h = bm;
            break;
          case "copy":
          case "cut":
          case "paste":
            h = nm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            h = Zf;
            break;
          case "toggle":
          case "beforetoggle":
            h = pm;
        }
        var S = (l & 4) !== 0, z = !S && (t === "scroll" || t === "scrollend"), d = S ? m !== null ? m + "Capture" : null : m;
        S = [];
        for (var o = r, g; o !== null; ) {
          var b = o;
          if (g = b.stateNode, b = b.tag, b !== 5 && b !== 26 && b !== 27 || g === null || d === null || (b = wa(o, d), b != null && S.push(Pa(o, b, g))), z) break;
          o = o.return;
        }
        0 < S.length && (m = new h(m, p, null, e, v), y.push({ event: m, listeners: S }));
      }
    }
    if (!(l & 7)) {
      t: {
        if (m = t === "mouseover" || t === "pointerover", h = t === "mouseout" || t === "pointerout", m && e !== Qi && (p = e.relatedTarget || e.fromElement) && (He(p) || p[sa])) break t;
        if ((h || m) && (m = v.window === v ? v : (m = v.ownerDocument) ? m.defaultView || m.parentWindow : window, h ? (p = e.relatedTarget || e.toElement, h = r, p = p ? He(p) : null, p !== null && (z = an(p), S = p.tag, p !== z || S !== 5 && S !== 27 && S !== 6) && (p = null)) : (h = null, p = r), h !== p)) {
          if (S = Qf, b = "onMouseLeave", d = "onMouseEnter", o = "mouse", (t === "pointerout" || t === "pointerover") && (S = Zf, b = "onPointerLeave", d = "onPointerEnter", o = "pointer"), z = h == null ? m : ja(h), g = p == null ? m : ja(p), m = new S(b, o + "leave", h, e, v), m.target = z, m.relatedTarget = g, b = null, He(v) === r && (S = new S(d, o + "enter", p, e, v), S.target = g, S.relatedTarget = z, b = S), z = b, h && p) l: {
            for (S = xh, d = h, o = p, g = 0, b = d; b; b = S(b)) g++;
            b = 0;
            for (var N = o; N; N = S(N)) b++;
            for (; 0 < g - b; ) d = S(d), g--;
            for (; 0 < b - g; ) o = S(o), b--;
            for (; g--; ) {
              if (d === o || o !== null && d === o.alternate) {
                S = d;
                break l;
              }
              d = S(d), o = S(o);
            }
            S = null;
          }
          else S = null;
          h !== null && Cs(y, m, h, S, false), p !== null && z !== null && Cs(y, z, p, S, true);
        }
      }
      t: {
        if (m = r ? ja(r) : window, h = m.nodeName && m.nodeName.toLowerCase(), h === "select" || h === "input" && m.type === "file") var _ = Kf;
        else if (Vf(m)) if (wo) _ = _m;
        else {
          _ = Dm;
          var T = Em;
        }
        else h = m.nodeName, !h || h.toLowerCase() !== "input" || m.type !== "checkbox" && m.type !== "radio" ? r && Hc(r.elementType) && (_ = Kf) : _ = Om;
        if (_ && (_ = _(t, r))) {
          Lo(y, _, e, v);
          break t;
        }
        T && T(t, m, r), t === "focusout" && r && m.type === "number" && r.memoizedProps.value != null && qi(m, "number", m.value);
      }
      switch (T = r ? ja(r) : window, t) {
        case "focusin":
          (Vf(T) || T.contentEditable === "true") && (Ge = T, Zi = r, Ua = null);
          break;
        case "focusout":
          Ua = Zi = Ge = null;
          break;
        case "mousedown":
          Li = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Li = false, Ff(y, e, v);
          break;
        case "selectionchange":
          if (Um) break;
        case "keydown":
        case "keyup":
          Ff(y, e, v);
      }
      var j;
      if (Yc) t: {
        switch (t) {
          case "compositionstart":
            var O = "onCompositionStart";
            break t;
          case "compositionend":
            O = "onCompositionEnd";
            break t;
          case "compositionupdate":
            O = "onCompositionUpdate";
            break t;
        }
        O = void 0;
      }
      else Re ? Xo(t, e) && (O = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (O = "onCompositionStart");
      O && (Qo && e.locale !== "ko" && (Re || O !== "onCompositionStart" ? O === "onCompositionEnd" && Re && (j = qo()) : (Ql = v, Rc = "value" in Ql ? Ql.value : Ql.textContent, Re = true)), T = gu(r, O), 0 < T.length && (O = new Xf(O, t, null, e, v), y.push({ event: O, listeners: T }), j ? O.data = j : (j = Zo(e), j !== null && (O.data = j)))), (j = zm ? Tm(t, e) : Am(t, e)) && (O = gu(r, "onBeforeInput"), 0 < O.length && (T = new Xf("onBeforeInput", "beforeinput", null, e, v), y.push({ event: T, listeners: O }), T.data = j)), yh(y, t, r, e, v);
    }
    Yd(y, l);
  });
}
function Pa(t, l, e) {
  return { instance: t, listener: l, currentTarget: e };
}
function gu(t, l) {
  for (var e = l + "Capture", a = []; t !== null; ) {
    var n = t, u = n.stateNode;
    if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = wa(t, e), n != null && a.unshift(Pa(t, n, u)), n = wa(t, l), n != null && a.push(Pa(t, n, u))), t.tag === 3) return a;
    t = t.return;
  }
  return [];
}
function xh(t) {
  if (t === null) return null;
  do
    t = t.return;
  while (t && t.tag !== 5 && t.tag !== 27);
  return t || null;
}
function Cs(t, l, e, a, n) {
  for (var u = l._reactName, i = []; e !== null && e !== a; ) {
    var c = e, s = c.alternate, r = c.stateNode;
    if (c = c.tag, s !== null && s === a) break;
    c !== 5 && c !== 26 && c !== 27 || r === null || (s = r, n ? (r = wa(e, u), r != null && i.unshift(Pa(e, r, s))) : n || (r = wa(e, u), r != null && i.push(Pa(e, r, s)))), e = e.return;
  }
  i.length !== 0 && t.push({ event: l, listeners: i });
}
var ph = /\r\n?/g, Sh = /\u0000|\uFFFD/g;
function Hs(t) {
  return (typeof t == "string" ? t : "" + t).replace(ph, `
`).replace(Sh, "");
}
function Qd(t, l) {
  return l = Hs(l), Hs(t) === l;
}
function J(t, l, e, a, n, u) {
  switch (e) {
    case "children":
      typeof a == "string" ? l === "body" || l === "textarea" && a === "" || Pe(t, a) : (typeof a == "number" || typeof a == "bigint") && l !== "body" && Pe(t, "" + a);
      break;
    case "className":
      Sn(t, "class", a);
      break;
    case "tabIndex":
      Sn(t, "tabindex", a);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      Sn(t, e, a);
      break;
    case "style":
      Go(t, a, u);
      break;
    case "data":
      if (l !== "object") {
        Sn(t, "data", a);
        break;
      }
    case "src":
    case "href":
      if (a === "" && (l !== "a" || e !== "href")) {
        t.removeAttribute(e);
        break;
      }
      if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
        t.removeAttribute(e);
        break;
      }
      a = Hn("" + a), t.setAttribute(e, a);
      break;
    case "action":
    case "formAction":
      if (typeof a == "function") {
        t.setAttribute(e, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
        break;
      } else typeof u == "function" && (e === "formAction" ? (l !== "input" && J(t, l, "name", n.name, n, null), J(t, l, "formEncType", n.formEncType, n, null), J(t, l, "formMethod", n.formMethod, n, null), J(t, l, "formTarget", n.formTarget, n, null)) : (J(t, l, "encType", n.encType, n, null), J(t, l, "method", n.method, n, null), J(t, l, "target", n.target, n, null)));
      if (a == null || typeof a == "symbol" || typeof a == "boolean") {
        t.removeAttribute(e);
        break;
      }
      a = Hn("" + a), t.setAttribute(e, a);
      break;
    case "onClick":
      a != null && (t.onclick = Sl);
      break;
    case "onScroll":
      a != null && G("scroll", t);
      break;
    case "onScrollEnd":
      a != null && G("scrollend", t);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a)) throw Error(x(61));
        if (e = a.__html, e != null) {
          if (n.children != null) throw Error(x(60));
          t.innerHTML = e;
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
      e = Hn("" + a), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e);
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "" + a) : t.removeAttribute(e);
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
      a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "") : t.removeAttribute(e);
      break;
    case "capture":
    case "download":
      a === true ? t.setAttribute(e, "") : a !== false && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, a) : t.removeAttribute(e);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(e, a) : t.removeAttribute(e);
      break;
    case "rowSpan":
    case "start":
      a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(e) : t.setAttribute(e, a);
      break;
    case "popover":
      G("beforetoggle", t), G("toggle", t), Cn(t, "popover", a);
      break;
    case "xlinkActuate":
      ml(t, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
      break;
    case "xlinkArcrole":
      ml(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
      break;
    case "xlinkRole":
      ml(t, "http://www.w3.org/1999/xlink", "xlink:role", a);
      break;
    case "xlinkShow":
      ml(t, "http://www.w3.org/1999/xlink", "xlink:show", a);
      break;
    case "xlinkTitle":
      ml(t, "http://www.w3.org/1999/xlink", "xlink:title", a);
      break;
    case "xlinkType":
      ml(t, "http://www.w3.org/1999/xlink", "xlink:type", a);
      break;
    case "xmlBase":
      ml(t, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
      break;
    case "xmlLang":
      ml(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
      break;
    case "xmlSpace":
      ml(t, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
      break;
    case "is":
      Cn(t, "is", a);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = $0.get(e) || e, Cn(t, e, a));
  }
}
function mc(t, l, e, a, n, u) {
  switch (e) {
    case "style":
      Go(t, a, u);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a)) throw Error(x(61));
        if (e = a.__html, e != null) {
          if (n.children != null) throw Error(x(60));
          t.innerHTML = e;
        }
      }
      break;
    case "children":
      typeof a == "string" ? Pe(t, a) : (typeof a == "number" || typeof a == "bigint") && Pe(t, "" + a);
      break;
    case "onScroll":
      a != null && G("scroll", t);
      break;
    case "onScrollEnd":
      a != null && G("scrollend", t);
      break;
    case "onClick":
      a != null && (t.onclick = Sl);
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
      if (!Mo.hasOwnProperty(e)) t: {
        if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), l = e.slice(2, n ? e.length - 7 : void 0), u = t[Bt] || null, u = u != null ? u[e] : null, typeof u == "function" && t.removeEventListener(l, u, n), typeof a == "function")) {
          typeof u != "function" && u !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, a, n);
          break t;
        }
        e in t ? t[e] = a : a === true ? t.setAttribute(e, "") : Cn(t, e, a);
      }
  }
}
function At(t, l, e) {
  switch (l) {
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
      G("error", t), G("load", t);
      var a = false, n = false, u;
      for (u in e) if (e.hasOwnProperty(u)) {
        var i = e[u];
        if (i != null) switch (u) {
          case "src":
            a = true;
            break;
          case "srcSet":
            n = true;
            break;
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(x(137, l));
          default:
            J(t, l, u, i, e, null);
        }
      }
      n && J(t, l, "srcSet", e.srcSet, e, null), a && J(t, l, "src", e.src, e, null);
      return;
    case "input":
      G("invalid", t);
      var c = u = i = n = null, s = null, r = null;
      for (a in e) if (e.hasOwnProperty(a)) {
        var v = e[a];
        if (v != null) switch (a) {
          case "name":
            n = v;
            break;
          case "type":
            i = v;
            break;
          case "checked":
            s = v;
            break;
          case "defaultChecked":
            r = v;
            break;
          case "value":
            u = v;
            break;
          case "defaultValue":
            c = v;
            break;
          case "children":
          case "dangerouslySetInnerHTML":
            if (v != null) throw Error(x(137, l));
            break;
          default:
            J(t, l, a, v, e, null);
        }
      }
      Ho(t, u, c, s, r, i, n, false);
      return;
    case "select":
      G("invalid", t), a = i = u = null;
      for (n in e) if (e.hasOwnProperty(n) && (c = e[n], c != null)) switch (n) {
        case "value":
          u = c;
          break;
        case "defaultValue":
          i = c;
          break;
        case "multiple":
          a = c;
        default:
          J(t, l, n, c, e, null);
      }
      l = u, e = i, t.multiple = !!a, l != null ? Ve(t, !!a, l, false) : e != null && Ve(t, !!a, e, true);
      return;
    case "textarea":
      G("invalid", t), u = n = a = null;
      for (i in e) if (e.hasOwnProperty(i) && (c = e[i], c != null)) switch (i) {
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
          if (c != null) throw Error(x(91));
          break;
        default:
          J(t, l, i, c, e, null);
      }
      Ro(t, a, n, u);
      return;
    case "option":
      for (s in e) if (e.hasOwnProperty(s) && (a = e[s], a != null)) switch (s) {
        case "selected":
          t.selected = a && typeof a != "function" && typeof a != "symbol";
          break;
        default:
          J(t, l, s, a, e, null);
      }
      return;
    case "dialog":
      G("beforetoggle", t), G("toggle", t), G("cancel", t), G("close", t);
      break;
    case "iframe":
    case "object":
      G("load", t);
      break;
    case "video":
    case "audio":
      for (a = 0; a < Ia.length; a++) G(Ia[a], t);
      break;
    case "image":
      G("error", t), G("load", t);
      break;
    case "details":
      G("toggle", t);
      break;
    case "embed":
    case "source":
    case "link":
      G("error", t), G("load", t);
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
      for (r in e) if (e.hasOwnProperty(r) && (a = e[r], a != null)) switch (r) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(x(137, l));
        default:
          J(t, l, r, a, e, null);
      }
      return;
    default:
      if (Hc(l)) {
        for (v in e) e.hasOwnProperty(v) && (a = e[v], a !== void 0 && mc(t, l, v, a, e, void 0));
        return;
      }
  }
  for (c in e) e.hasOwnProperty(c) && (a = e[c], a != null && J(t, l, c, a, e, null));
}
function zh(t, l, e, a) {
  switch (l) {
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
      var n = null, u = null, i = null, c = null, s = null, r = null, v = null;
      for (h in e) {
        var y = e[h];
        if (e.hasOwnProperty(h) && y != null) switch (h) {
          case "checked":
            break;
          case "value":
            break;
          case "defaultValue":
            s = y;
          default:
            a.hasOwnProperty(h) || J(t, l, h, null, a, y);
        }
      }
      for (var m in a) {
        var h = a[m];
        if (y = e[m], a.hasOwnProperty(m) && (h != null || y != null)) switch (m) {
          case "type":
            u = h;
            break;
          case "name":
            n = h;
            break;
          case "checked":
            r = h;
            break;
          case "defaultChecked":
            v = h;
            break;
          case "value":
            i = h;
            break;
          case "defaultValue":
            c = h;
            break;
          case "children":
          case "dangerouslySetInnerHTML":
            if (h != null) throw Error(x(137, l));
            break;
          default:
            h !== y && J(t, l, m, h, a, y);
        }
      }
      Yi(t, i, c, s, r, v, u, n);
      return;
    case "select":
      h = i = c = m = null;
      for (u in e) if (s = e[u], e.hasOwnProperty(u) && s != null) switch (u) {
        case "value":
          break;
        case "multiple":
          h = s;
        default:
          a.hasOwnProperty(u) || J(t, l, u, null, a, s);
      }
      for (n in a) if (u = a[n], s = e[n], a.hasOwnProperty(n) && (u != null || s != null)) switch (n) {
        case "value":
          m = u;
          break;
        case "defaultValue":
          c = u;
          break;
        case "multiple":
          i = u;
        default:
          u !== s && J(t, l, n, u, a, s);
      }
      l = c, e = i, a = h, m != null ? Ve(t, !!e, m, false) : !!a != !!e && (l != null ? Ve(t, !!e, l, true) : Ve(t, !!e, e ? [] : "", false));
      return;
    case "textarea":
      h = m = null;
      for (c in e) if (n = e[c], e.hasOwnProperty(c) && n != null && !a.hasOwnProperty(c)) switch (c) {
        case "value":
          break;
        case "children":
          break;
        default:
          J(t, l, c, null, a, n);
      }
      for (i in a) if (n = a[i], u = e[i], a.hasOwnProperty(i) && (n != null || u != null)) switch (i) {
        case "value":
          m = n;
          break;
        case "defaultValue":
          h = n;
          break;
        case "children":
          break;
        case "dangerouslySetInnerHTML":
          if (n != null) throw Error(x(91));
          break;
        default:
          n !== u && J(t, l, i, n, a, u);
      }
      Bo(t, m, h);
      return;
    case "option":
      for (var p in e) if (m = e[p], e.hasOwnProperty(p) && m != null && !a.hasOwnProperty(p)) switch (p) {
        case "selected":
          t.selected = false;
          break;
        default:
          J(t, l, p, null, a, m);
      }
      for (s in a) if (m = a[s], h = e[s], a.hasOwnProperty(s) && m !== h && (m != null || h != null)) switch (s) {
        case "selected":
          t.selected = m && typeof m != "function" && typeof m != "symbol";
          break;
        default:
          J(t, l, s, m, a, h);
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
      for (var S in e) m = e[S], e.hasOwnProperty(S) && m != null && !a.hasOwnProperty(S) && J(t, l, S, null, a, m);
      for (r in a) if (m = a[r], h = e[r], a.hasOwnProperty(r) && m !== h && (m != null || h != null)) switch (r) {
        case "children":
        case "dangerouslySetInnerHTML":
          if (m != null) throw Error(x(137, l));
          break;
        default:
          J(t, l, r, m, a, h);
      }
      return;
    default:
      if (Hc(l)) {
        for (var z in e) m = e[z], e.hasOwnProperty(z) && m !== void 0 && !a.hasOwnProperty(z) && mc(t, l, z, void 0, a, m);
        for (v in a) m = a[v], h = e[v], !a.hasOwnProperty(v) || m === h || m === void 0 && h === void 0 || mc(t, l, v, m, a, h);
        return;
      }
  }
  for (var d in e) m = e[d], e.hasOwnProperty(d) && m != null && !a.hasOwnProperty(d) && J(t, l, d, null, a, m);
  for (y in a) m = a[y], h = e[y], !a.hasOwnProperty(y) || m === h || m == null && h == null || J(t, l, y, m, a, h);
}
function Bs(t) {
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
function Th() {
  if (typeof performance.getEntriesByType == "function") {
    for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
      var n = e[a], u = n.transferSize, i = n.initiatorType, c = n.duration;
      if (u && c && Bs(i)) {
        for (i = 0, c = n.responseEnd, a += 1; a < e.length; a++) {
          var s = e[a], r = s.startTime;
          if (r > c) break;
          var v = s.transferSize, y = s.initiatorType;
          v && Bs(y) && (s = s.responseEnd, i += v * (s < c ? 1 : (c - r) / (s - r)));
        }
        if (--a, l += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
      }
    }
    if (0 < t) return l / t / 1e6;
  }
  return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
}
var hc = null, yc = null;
function vu(t) {
  return t.nodeType === 9 ? t : t.ownerDocument;
}
function Rs(t) {
  switch (t) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function Xd(t, l) {
  if (t === 0) switch (l) {
    case "svg":
      return 1;
    case "math":
      return 2;
    default:
      return 0;
  }
  return t === 1 && l === "foreignObject" ? 0 : t;
}
function gc(t, l) {
  return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
}
var Ni = null;
function Ah() {
  var t = window.event;
  return t && t.type === "popstate" ? t === Ni ? false : (Ni = t, true) : (Ni = null, false);
}
var Zd = typeof setTimeout == "function" ? setTimeout : void 0, Nh = typeof clearTimeout == "function" ? clearTimeout : void 0, Gs = typeof Promise == "function" ? Promise : void 0, jh = typeof queueMicrotask == "function" ? queueMicrotask : typeof Gs < "u" ? function(t) {
  return Gs.resolve(null).then(t).catch(Eh);
} : Zd;
function Eh(t) {
  setTimeout(function() {
    throw t;
  });
}
function ne(t) {
  return t === "head";
}
function Ys(t, l) {
  var e = l, a = 0;
  do {
    var n = e.nextSibling;
    if (t.removeChild(e), n && n.nodeType === 8) if (e = n.data, e === "/$" || e === "/&") {
      if (a === 0) {
        t.removeChild(n), ca(l);
        return;
      }
      a--;
    } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&") a++;
    else if (e === "html") Za(t.ownerDocument.documentElement);
    else if (e === "head") {
      e = t.ownerDocument.head, Za(e);
      for (var u = e.firstChild; u; ) {
        var i = u.nextSibling, c = u.nodeName;
        u[fn] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && u.rel.toLowerCase() === "stylesheet" || e.removeChild(u), u = i;
      }
    } else e === "body" && Za(t.ownerDocument.body);
    e = n;
  } while (e);
  ca(l);
}
function qs(t, l) {
  var e = t;
  t = 0;
  do {
    var a = e.nextSibling;
    if (e.nodeType === 1 ? l ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (l ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8) if (e = a.data, e === "/$") {
      if (t === 0) break;
      t--;
    } else e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || t++;
    e = a;
  } while (e);
}
function vc(t) {
  var l = t.firstChild;
  for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
    var e = l;
    switch (l = l.nextSibling, e.nodeName) {
      case "HTML":
      case "HEAD":
      case "BODY":
        vc(e), Cc(e);
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (e.rel.toLowerCase() === "stylesheet") continue;
    }
    t.removeChild(e);
  }
}
function Dh(t, l, e, a) {
  for (; t.nodeType === 1; ) {
    var n = e;
    if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
      if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
    } else if (a) {
      if (!t[fn]) switch (l) {
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
    } else if (l === "input" && t.type === "hidden") {
      var u = n.name == null ? null : "" + n.name;
      if (n.type === "hidden" && t.getAttribute("name") === u) return t;
    } else return t;
    if (t = ll(t.nextSibling), t === null) break;
  }
  return null;
}
function Oh(t, l, e) {
  if (l === "") return null;
  for (; t.nodeType !== 3; ) if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = ll(t.nextSibling), t === null)) return null;
  return t;
}
function Ld(t, l) {
  for (; t.nodeType !== 8; ) if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = ll(t.nextSibling), t === null)) return null;
  return t;
}
function bc(t) {
  return t.data === "$?" || t.data === "$~";
}
function xc(t) {
  return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
}
function _h(t, l) {
  var e = t.ownerDocument;
  if (t.data === "$~") t._reactRetry = l;
  else if (t.data !== "$?" || e.readyState !== "loading") l();
  else {
    var a = function() {
      l(), e.removeEventListener("DOMContentLoaded", a);
    };
    e.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
  }
}
function ll(t) {
  for (; t != null; t = t.nextSibling) {
    var l = t.nodeType;
    if (l === 1 || l === 3) break;
    if (l === 8) {
      if (l = t.data, l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&" || l === "F!" || l === "F") break;
      if (l === "/$" || l === "/&") return null;
    }
  }
  return t;
}
var pc = null;
function Qs(t) {
  t = t.nextSibling;
  for (var l = 0; t; ) {
    if (t.nodeType === 8) {
      var e = t.data;
      if (e === "/$" || e === "/&") {
        if (l === 0) return ll(t.nextSibling);
        l--;
      } else e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
    }
    t = t.nextSibling;
  }
  return null;
}
function Xs(t) {
  t = t.previousSibling;
  for (var l = 0; t; ) {
    if (t.nodeType === 8) {
      var e = t.data;
      if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
        if (l === 0) return t;
        l--;
      } else e !== "/$" && e !== "/&" || l++;
    }
    t = t.previousSibling;
  }
  return null;
}
function wd(t, l, e) {
  switch (l = vu(e), t) {
    case "html":
      if (t = l.documentElement, !t) throw Error(x(452));
      return t;
    case "head":
      if (t = l.head, !t) throw Error(x(453));
      return t;
    case "body":
      if (t = l.body, !t) throw Error(x(454));
      return t;
    default:
      throw Error(x(451));
  }
}
function Za(t) {
  for (var l = t.attributes; l.length; ) t.removeAttributeNode(l[0]);
  Cc(t);
}
var el = /* @__PURE__ */ new Map(), Zs = /* @__PURE__ */ new Set();
function bu(t) {
  return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
}
var Ml = L.d;
L.d = { f: Mh, r: Uh, D: Ch, C: Hh, L: Bh, m: Rh, X: Yh, S: Gh, M: qh };
function Mh() {
  var t = Ml.f(), l = Yu();
  return t || l;
}
function Uh(t) {
  var l = oa(t);
  l !== null && l.tag === 5 && l.type === "form" ? Gr(l) : Ml.r(t);
}
var ha = typeof document > "u" ? null : document;
function Vd(t, l, e) {
  var a = ha;
  if (a && typeof l == "string" && l) {
    var n = Ft(l);
    n = 'link[rel="' + t + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), Zs.has(n) || (Zs.add(n), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(n) === null && (l = a.createElement("link"), At(l, "link", t), bt(l), a.head.appendChild(l)));
  }
}
function Ch(t) {
  Ml.D(t), Vd("dns-prefetch", t, null);
}
function Hh(t, l) {
  Ml.C(t, l), Vd("preconnect", t, l);
}
function Bh(t, l, e) {
  Ml.L(t, l, e);
  var a = ha;
  if (a && t && l) {
    var n = 'link[rel="preload"][as="' + Ft(l) + '"]';
    l === "image" && e && e.imageSrcSet ? (n += '[imagesrcset="' + Ft(e.imageSrcSet) + '"]', typeof e.imageSizes == "string" && (n += '[imagesizes="' + Ft(e.imageSizes) + '"]')) : n += '[href="' + Ft(t) + '"]';
    var u = n;
    switch (l) {
      case "style":
        u = ia(t);
        break;
      case "script":
        u = ya(t);
    }
    el.has(u) || (t = lt({ rel: "preload", href: l === "image" && e && e.imageSrcSet ? void 0 : t, as: l }, e), el.set(u, t), a.querySelector(n) !== null || l === "style" && a.querySelector(hn(u)) || l === "script" && a.querySelector(yn(u)) || (l = a.createElement("link"), At(l, "link", t), bt(l), a.head.appendChild(l)));
  }
}
function Rh(t, l) {
  Ml.m(t, l);
  var e = ha;
  if (e && t) {
    var a = l && typeof l.as == "string" ? l.as : "script", n = 'link[rel="modulepreload"][as="' + Ft(a) + '"][href="' + Ft(t) + '"]', u = n;
    switch (a) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        u = ya(t);
    }
    if (!el.has(u) && (t = lt({ rel: "modulepreload", href: t }, l), el.set(u, t), e.querySelector(n) === null)) {
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (e.querySelector(yn(u))) return;
      }
      a = e.createElement("link"), At(a, "link", t), bt(a), e.head.appendChild(a);
    }
  }
}
function Gh(t, l, e) {
  Ml.S(t, l, e);
  var a = ha;
  if (a && t) {
    var n = we(a).hoistableStyles, u = ia(t);
    l = l || "default";
    var i = n.get(u);
    if (!i) {
      var c = { loading: 0, preload: null };
      if (i = a.querySelector(hn(u))) c.loading = 5;
      else {
        t = lt({ rel: "stylesheet", href: t, "data-precedence": l }, e), (e = el.get(u)) && xf(t, e);
        var s = i = a.createElement("link");
        bt(s), At(s, "link", t), s._p = new Promise(function(r, v) {
          s.onload = r, s.onerror = v;
        }), s.addEventListener("load", function() {
          c.loading |= 1;
        }), s.addEventListener("error", function() {
          c.loading |= 2;
        }), c.loading |= 4, wn(i, l, a);
      }
      i = { type: "stylesheet", instance: i, count: 1, state: c }, n.set(u, i);
    }
  }
}
function Yh(t, l) {
  Ml.X(t, l);
  var e = ha;
  if (e && t) {
    var a = we(e).hoistableScripts, n = ya(t), u = a.get(n);
    u || (u = e.querySelector(yn(n)), u || (t = lt({ src: t, async: true }, l), (l = el.get(n)) && pf(t, l), u = e.createElement("script"), bt(u), At(u, "link", t), e.head.appendChild(u)), u = { type: "script", instance: u, count: 1, state: null }, a.set(n, u));
  }
}
function qh(t, l) {
  Ml.M(t, l);
  var e = ha;
  if (e && t) {
    var a = we(e).hoistableScripts, n = ya(t), u = a.get(n);
    u || (u = e.querySelector(yn(n)), u || (t = lt({ src: t, async: true, type: "module" }, l), (l = el.get(n)) && pf(t, l), u = e.createElement("script"), bt(u), At(u, "link", t), e.head.appendChild(u)), u = { type: "script", instance: u, count: 1, state: null }, a.set(n, u));
  }
}
function Ls(t, l, e, a) {
  var n = (n = wl.current) ? bu(n) : null;
  if (!n) throw Error(x(446));
  switch (t) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof e.precedence == "string" && typeof e.href == "string" ? (l = ia(e.href), e = we(n).hoistableStyles, a = e.get(l), a || (a = { type: "style", instance: null, count: 0, state: null }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
        t = ia(e.href);
        var u = we(n).hoistableStyles, i = u.get(t);
        if (i || (n = n.ownerDocument || n, i = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, u.set(t, i), (u = n.querySelector(hn(t))) && !u._p && (i.instance = u, i.state.loading = 5), el.has(t) || (e = { rel: "preload", as: "style", href: e.href, crossOrigin: e.crossOrigin, integrity: e.integrity, media: e.media, hrefLang: e.hrefLang, referrerPolicy: e.referrerPolicy }, el.set(t, e), u || Qh(n, t, e, i.state))), l && a === null) throw Error(x(528, ""));
        return i;
      }
      if (l && a !== null) throw Error(x(529, ""));
      return null;
    case "script":
      return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = ya(e), e = we(n).hoistableScripts, a = e.get(l), a || (a = { type: "script", instance: null, count: 0, state: null }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
    default:
      throw Error(x(444, t));
  }
}
function ia(t) {
  return 'href="' + Ft(t) + '"';
}
function hn(t) {
  return 'link[rel="stylesheet"][' + t + "]";
}
function Kd(t) {
  return lt({}, t, { "data-precedence": t.precedence, precedence: null });
}
function Qh(t, l, e, a) {
  t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? a.loading = 1 : (l = t.createElement("link"), a.preload = l, l.addEventListener("load", function() {
    return a.loading |= 1;
  }), l.addEventListener("error", function() {
    return a.loading |= 2;
  }), At(l, "link", e), bt(l), t.head.appendChild(l));
}
function ya(t) {
  return '[src="' + Ft(t) + '"]';
}
function yn(t) {
  return "script[async]" + t;
}
function ws(t, l, e) {
  if (l.count++, l.instance === null) switch (l.type) {
    case "style":
      var a = t.querySelector('style[data-href~="' + Ft(e.href) + '"]');
      if (a) return l.instance = a, bt(a), a;
      var n = lt({}, e, { "data-href": e.href, "data-precedence": e.precedence, href: null, precedence: null });
      return a = (t.ownerDocument || t).createElement("style"), bt(a), At(a, "style", n), wn(a, e.precedence, t), l.instance = a;
    case "stylesheet":
      n = ia(e.href);
      var u = t.querySelector(hn(n));
      if (u) return l.state.loading |= 4, l.instance = u, bt(u), u;
      a = Kd(e), (n = el.get(n)) && xf(a, n), u = (t.ownerDocument || t).createElement("link"), bt(u);
      var i = u;
      return i._p = new Promise(function(c, s) {
        i.onload = c, i.onerror = s;
      }), At(u, "link", a), l.state.loading |= 4, wn(u, e.precedence, t), l.instance = u;
    case "script":
      return u = ya(e.src), (n = t.querySelector(yn(u))) ? (l.instance = n, bt(n), n) : (a = e, (n = el.get(u)) && (a = lt({}, e), pf(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), bt(n), At(n, "link", a), t.head.appendChild(n), l.instance = n);
    case "void":
      return null;
    default:
      throw Error(x(443, l.type));
  }
  else l.type === "stylesheet" && !(l.state.loading & 4) && (a = l.instance, l.state.loading |= 4, wn(a, e.precedence, t));
  return l.instance;
}
function wn(t, l, e) {
  for (var a = e.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
    var c = a[i];
    if (c.dataset.precedence === l) u = c;
    else if (u !== n) break;
  }
  u ? u.parentNode.insertBefore(t, u.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
}
function xf(t, l) {
  t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
}
function pf(t, l) {
  t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
}
var Vn = null;
function Vs(t, l, e) {
  if (Vn === null) {
    var a = /* @__PURE__ */ new Map(), n = Vn = /* @__PURE__ */ new Map();
    n.set(e, a);
  } else n = Vn, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
  if (a.has(t)) return a;
  for (a.set(t, null), e = e.getElementsByTagName(t), n = 0; n < e.length; n++) {
    var u = e[n];
    if (!(u[fn] || u[St] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
      var i = u.getAttribute(l) || "";
      i = t + i;
      var c = a.get(i);
      c ? c.push(u) : a.set(i, [u]);
    }
  }
  return a;
}
function Ks(t, l, e) {
  t = t.ownerDocument || t, t.head.insertBefore(e, l === "title" ? t.querySelector("head > title") : null);
}
function Xh(t, l, e) {
  if (e === 1 || l.itemProp != null) return false;
  switch (t) {
    case "meta":
    case "title":
      return true;
    case "style":
      if (typeof l.precedence != "string" || typeof l.href != "string" || l.href === "") break;
      return true;
    case "link":
      if (typeof l.rel != "string" || typeof l.href != "string" || l.href === "" || l.onLoad || l.onError) break;
      switch (l.rel) {
        case "stylesheet":
          return t = l.disabled, typeof l.precedence == "string" && t == null;
        default:
          return true;
      }
    case "script":
      if (l.async && typeof l.async != "function" && typeof l.async != "symbol" && !l.onLoad && !l.onError && l.src && typeof l.src == "string") return true;
  }
  return false;
}
function Jd(t) {
  return !(t.type === "stylesheet" && !(t.state.loading & 3));
}
function Zh(t, l, e, a) {
  if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== false) && !(e.state.loading & 4)) {
    if (e.instance === null) {
      var n = ia(a.href), u = l.querySelector(hn(n));
      if (u) {
        l = u._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = xu.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = u, bt(u);
        return;
      }
      u = l.ownerDocument || l, a = Kd(a), (n = el.get(n)) && xf(a, n), u = u.createElement("link"), bt(u);
      var i = u;
      i._p = new Promise(function(c, s) {
        i.onload = c, i.onerror = s;
      }), At(u, "link", a), e.instance = u;
    }
    t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && !(e.state.loading & 3) && (t.count++, e = xu.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
  }
}
var ji = 0;
function Lh(t, l) {
  return t.stylesheets && t.count === 0 && Kn(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
    var a = setTimeout(function() {
      if (t.stylesheets && Kn(t, t.stylesheets), t.unsuspend) {
        var u = t.unsuspend;
        t.unsuspend = null, u();
      }
    }, 6e4 + l);
    0 < t.imgBytes && ji === 0 && (ji = 62500 * Th());
    var n = setTimeout(function() {
      if (t.waitingForImages = false, t.count === 0 && (t.stylesheets && Kn(t, t.stylesheets), t.unsuspend)) {
        var u = t.unsuspend;
        t.unsuspend = null, u();
      }
    }, (t.imgBytes > ji ? 50 : 800) + l);
    return t.unsuspend = e, function() {
      t.unsuspend = null, clearTimeout(a), clearTimeout(n);
    };
  } : null;
}
function xu() {
  if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
    if (this.stylesheets) Kn(this, this.stylesheets);
    else if (this.unsuspend) {
      var t = this.unsuspend;
      this.unsuspend = null, t();
    }
  }
}
var pu = null;
function Kn(t, l) {
  t.stylesheets = null, t.unsuspend !== null && (t.count++, pu = /* @__PURE__ */ new Map(), l.forEach(wh, t), pu = null, xu.call(t));
}
function wh(t, l) {
  if (!(l.state.loading & 4)) {
    var e = pu.get(t);
    if (e) var a = e.get(null);
    else {
      e = /* @__PURE__ */ new Map(), pu.set(t, e);
      for (var n = t.querySelectorAll("link[data-precedence],style[data-precedence]"), u = 0; u < n.length; u++) {
        var i = n[u];
        (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
      }
      a && e.set(null, a);
    }
    n = l.instance, i = n.getAttribute("data-precedence"), u = e.get(i) || a, u === a && e.set(null, n), e.set(i, n), this.count++, a = xu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), l.state.loading |= 4;
  }
}
var tn = { $$typeof: pl, Provider: null, Consumer: null, _currentValue: re, _currentValue2: re, _threadCount: 0 };
function Vh(t, l, e, a, n, u, i, c, s) {
  this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = $u(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $u(0), this.hiddenUpdates = $u(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = s, this.incompleteTransitions = /* @__PURE__ */ new Map();
}
function kd(t, l, e, a, n, u, i, c, s, r, v, y) {
  return t = new Vh(t, l, e, i, s, r, v, y, c), l = 1, u === true && (l |= 24), u = qt(3, null, null, l), t.current = u, u.stateNode = t, l = Vc(), l.refCount++, t.pooledCache = l, l.refCount++, u.memoizedState = { element: a, isDehydrated: e, cache: l }, kc(u), t;
}
function $d(t) {
  return t ? (t = Qe, t) : Qe;
}
function Wd(t, l, e, a, n, u) {
  n = $d(n), a.context === null ? a.context = n : a.pendingContext = n, a = Kl(l), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = Jl(t, a, l), e !== null && (Ht(e, t, l), Ha(e, t, l));
}
function Js(t, l) {
  if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
    var e = t.retryLane;
    t.retryLane = e !== 0 && e < l ? e : l;
  }
}
function Sf(t, l) {
  Js(t, l), (t = t.alternate) && Js(t, l);
}
function Fd(t) {
  if (t.tag === 13 || t.tag === 31) {
    var l = Ae(t, 67108864);
    l !== null && Ht(l, t, 67108864), Sf(t, 67108864);
  }
}
function ks(t) {
  if (t.tag === 13 || t.tag === 31) {
    var l = wt();
    l = Mc(l);
    var e = Ae(t, l);
    e !== null && Ht(e, t, l), Sf(t, l);
  }
}
var Su = true;
function Kh(t, l, e, a) {
  var n = D.T;
  D.T = null;
  var u = L.p;
  try {
    L.p = 2, zf(t, l, e, a);
  } finally {
    L.p = u, D.T = n;
  }
}
function Jh(t, l, e, a) {
  var n = D.T;
  D.T = null;
  var u = L.p;
  try {
    L.p = 8, zf(t, l, e, a);
  } finally {
    L.p = u, D.T = n;
  }
}
function zf(t, l, e, a) {
  if (Su) {
    var n = Sc(a);
    if (n === null) Ai(t, l, a, zu, e), $s(t, a);
    else if ($h(n, t, l, e, a)) a.stopPropagation();
    else if ($s(t, a), l & 4 && -1 < kh.indexOf(t)) {
      for (; n !== null; ) {
        var u = oa(n);
        if (u !== null) switch (u.tag) {
          case 3:
            if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
              var i = fe(u.pendingLanes);
              if (i !== 0) {
                var c = u;
                for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                  var s = 1 << 31 - Lt(i);
                  c.entanglements[1] |= s, i &= ~s;
                }
                dl(u), !(Z & 6) && (ru = Xt() + 500, mn(0));
              }
            }
            break;
          case 31:
          case 13:
            c = Ae(u, 2), c !== null && Ht(c, u, 2), Yu(), Sf(u, 2);
        }
        if (u = Sc(a), u === null && Ai(t, l, a, zu, e), u === n) break;
        n = u;
      }
      n !== null && a.stopPropagation();
    } else Ai(t, l, a, null, e);
  }
}
function Sc(t) {
  return t = Bc(t), Tf(t);
}
var zu = null;
function Tf(t) {
  if (zu = null, t = He(t), t !== null) {
    var l = an(t);
    if (l === null) t = null;
    else {
      var e = l.tag;
      if (e === 13) {
        if (t = vo(l), t !== null) return t;
        t = null;
      } else if (e === 31) {
        if (t = bo(l), t !== null) return t;
        t = null;
      } else if (e === 3) {
        if (l.stateNode.current.memoizedState.isDehydrated) return l.tag === 3 ? l.stateNode.containerInfo : null;
        t = null;
      } else l !== t && (t = null);
    }
  }
  return zu = t, null;
}
function Id(t) {
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
      switch (C0()) {
        case zo:
          return 2;
        case To:
          return 8;
        case Fn:
        case H0:
          return 32;
        case Ao:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var zc = false, Wl = null, Fl = null, Il = null, ln = /* @__PURE__ */ new Map(), en = /* @__PURE__ */ new Map(), Yl = [], kh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
function $s(t, l) {
  switch (t) {
    case "focusin":
    case "focusout":
      Wl = null;
      break;
    case "dragenter":
    case "dragleave":
      Fl = null;
      break;
    case "mouseover":
    case "mouseout":
      Il = null;
      break;
    case "pointerover":
    case "pointerout":
      ln.delete(l.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      en.delete(l.pointerId);
  }
}
function Ta(t, l, e, a, n, u) {
  return t === null || t.nativeEvent !== u ? (t = { blockedOn: l, domEventName: e, eventSystemFlags: a, nativeEvent: u, targetContainers: [n] }, l !== null && (l = oa(l), l !== null && Fd(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, n !== null && l.indexOf(n) === -1 && l.push(n), t);
}
function $h(t, l, e, a, n) {
  switch (l) {
    case "focusin":
      return Wl = Ta(Wl, t, l, e, a, n), true;
    case "dragenter":
      return Fl = Ta(Fl, t, l, e, a, n), true;
    case "mouseover":
      return Il = Ta(Il, t, l, e, a, n), true;
    case "pointerover":
      var u = n.pointerId;
      return ln.set(u, Ta(ln.get(u) || null, t, l, e, a, n)), true;
    case "gotpointercapture":
      return u = n.pointerId, en.set(u, Ta(en.get(u) || null, t, l, e, a, n)), true;
  }
  return false;
}
function Pd(t) {
  var l = He(t.target);
  if (l !== null) {
    var e = an(l);
    if (e !== null) {
      if (l = e.tag, l === 13) {
        if (l = vo(e), l !== null) {
          t.blockedOn = l, Cf(t.priority, function() {
            ks(e);
          });
          return;
        }
      } else if (l === 31) {
        if (l = bo(e), l !== null) {
          t.blockedOn = l, Cf(t.priority, function() {
            ks(e);
          });
          return;
        }
      } else if (l === 3 && e.stateNode.current.memoizedState.isDehydrated) {
        t.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
        return;
      }
    }
  }
  t.blockedOn = null;
}
function Jn(t) {
  if (t.blockedOn !== null) return false;
  for (var l = t.targetContainers; 0 < l.length; ) {
    var e = Sc(t.nativeEvent);
    if (e === null) {
      e = t.nativeEvent;
      var a = new e.constructor(e.type, e);
      Qi = a, e.target.dispatchEvent(a), Qi = null;
    } else return l = oa(e), l !== null && Fd(l), t.blockedOn = e, false;
    l.shift();
  }
  return true;
}
function Ws(t, l, e) {
  Jn(t) && e.delete(l);
}
function Wh() {
  zc = false, Wl !== null && Jn(Wl) && (Wl = null), Fl !== null && Jn(Fl) && (Fl = null), Il !== null && Jn(Il) && (Il = null), ln.forEach(Ws), en.forEach(Ws);
}
function On(t, l) {
  t.blockedOn === l && (t.blockedOn = null, zc || (zc = true, gt.unstable_scheduleCallback(gt.unstable_NormalPriority, Wh)));
}
var _n = null;
function Fs(t) {
  _n !== t && (_n = t, gt.unstable_scheduleCallback(gt.unstable_NormalPriority, function() {
    _n === t && (_n = null);
    for (var l = 0; l < t.length; l += 3) {
      var e = t[l], a = t[l + 1], n = t[l + 2];
      if (typeof a != "function") {
        if (Tf(a || e) === null) continue;
        break;
      }
      var u = oa(e);
      u !== null && (t.splice(l, 3), l -= 3, ec(u, { pending: true, data: n, method: e.method, action: a }, a, n));
    }
  }));
}
function ca(t) {
  function l(s) {
    return On(s, t);
  }
  Wl !== null && On(Wl, t), Fl !== null && On(Fl, t), Il !== null && On(Il, t), ln.forEach(l), en.forEach(l);
  for (var e = 0; e < Yl.length; e++) {
    var a = Yl[e];
    a.blockedOn === t && (a.blockedOn = null);
  }
  for (; 0 < Yl.length && (e = Yl[0], e.blockedOn === null); ) Pd(e), e.blockedOn === null && Yl.shift();
  if (e = (t.ownerDocument || t).$$reactFormReplay, e != null) for (a = 0; a < e.length; a += 3) {
    var n = e[a], u = e[a + 1], i = n[Bt] || null;
    if (typeof u == "function") i || Fs(e);
    else if (i) {
      var c = null;
      if (u && u.hasAttribute("formAction")) {
        if (n = u, i = u[Bt] || null) c = i.formAction;
        else if (Tf(n) !== null) continue;
      } else c = i.action;
      typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), Fs(e);
    }
  }
}
function t0() {
  function t(u) {
    u.canIntercept && u.info === "react-transition" && u.intercept({ handler: function() {
      return new Promise(function(i) {
        return n = i;
      });
    }, focusReset: "manual", scroll: "manual" });
  }
  function l() {
    n !== null && (n(), n = null), a || setTimeout(e, 20);
  }
  function e() {
    if (!a && !navigation.transition) {
      var u = navigation.currentEntry;
      u && u.url != null && navigation.navigate(u.url, { state: u.getState(), info: "react-transition", history: "replace" });
    }
  }
  if (typeof navigation == "object") {
    var a = false, n = null;
    return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", l), navigation.addEventListener("navigateerror", l), setTimeout(e, 100), function() {
      a = true, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", l), navigation.removeEventListener("navigateerror", l), n !== null && (n(), n = null);
    };
  }
}
function Af(t) {
  this._internalRoot = t;
}
Xu.prototype.render = Af.prototype.render = function(t) {
  var l = this._internalRoot;
  if (l === null) throw Error(x(409));
  var e = l.current, a = wt();
  Wd(e, a, t, l, null, null);
};
Xu.prototype.unmount = Af.prototype.unmount = function() {
  var t = this._internalRoot;
  if (t !== null) {
    this._internalRoot = null;
    var l = t.containerInfo;
    Wd(t.current, 2, null, t, null, null), Yu(), l[sa] = null;
  }
};
function Xu(t) {
  this._internalRoot = t;
}
Xu.prototype.unstable_scheduleHydration = function(t) {
  if (t) {
    var l = Oo();
    t = { blockedOn: null, target: t, priority: l };
    for (var e = 0; e < Yl.length && l !== 0 && l < Yl[e].priority; e++) ;
    Yl.splice(e, 0, t), e === 0 && Pd(t);
  }
};
var Is = yo.version;
if (Is !== "19.2.3") throw Error(x(527, Is, "19.2.3"));
L.findDOMNode = function(t) {
  var l = t._reactInternals;
  if (l === void 0) throw typeof t.render == "function" ? Error(x(188)) : (t = Object.keys(t).join(","), Error(x(268, t)));
  return t = j0(l), t = t !== null ? xo(t) : null, t = t === null ? null : t.stateNode, t;
};
var Fh = { bundleType: 0, version: "19.2.3", rendererPackageName: "react-dom", currentDispatcherRef: D, reconcilerVersion: "19.2.3" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Mn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Mn.isDisabled && Mn.supportsFiber) try {
    nn = Mn.inject(Fh), Zt = Mn;
  } catch {
  }
}
Au.createRoot = function(t, l) {
  if (!go(t)) throw Error(x(299));
  var e = false, a = "", n = Vr, u = Kr, i = Jr;
  return l != null && (l.unstable_strictMode === true && (e = true), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (n = l.onUncaughtError), l.onCaughtError !== void 0 && (u = l.onCaughtError), l.onRecoverableError !== void 0 && (i = l.onRecoverableError)), l = kd(t, 1, false, null, null, e, a, null, n, u, i, t0), t[sa] = l.current, bf(t), new Af(l);
};
Au.hydrateRoot = function(t, l, e) {
  if (!go(t)) throw Error(x(299));
  var a = false, n = "", u = Vr, i = Kr, c = Jr, s = null;
  return e != null && (e.unstable_strictMode === true && (a = true), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (s = e.formState)), l = kd(t, 1, true, l, e ?? null, a, n, s, u, i, c, t0), l.context = $d(null), e = l.current, a = wt(), a = Mc(a), n = Kl(a), n.callback = null, Jl(e, n, a), e = a, l.current.lanes = e, cn(l, e), dl(l), t[sa] = l.current, bf(t), new Xu(l);
};
Au.version = "19.2.3";
function l0() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l0);
  } catch (t) {
    console.error(t);
  }
}
l0(), lo.exports = Au;
var Ih = lo.exports;
function Ph({ activeFilter: t, onFilterSelect: l, projects: e, contexts: a, tags: n = [], isOpen: u, onClose: i, onSyncClick: c, onPullClick: s, isSyncing: r, isAuthenticated: v, onDropboxSync: y, onDropboxPull: m, isDropboxAuth: h, isDropboxSyncing: p, onGTasksSync: S }) {
  const [z, d] = R.useState(true), [o, g] = R.useState(true), [b, N] = R.useState(true), [_, T] = R.useState(true), [j, O] = R.useState(true), M = (q, ue) => t.type === q && (ue === void 0 || t.value === ue), at = (q) => `flex items-center gap-2 px-2 py-1.5 rounded text-sm font-medium w-full text-left transition-colors ${q ? "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"}`;
  return f.jsxs(f.Fragment, { children: [u && f.jsx("div", { className: "fixed inset-0 bg-black/50 z-40", onClick: i }), f.jsxs("aside", { className: `
            w-[305px] bg-zinc-900 flex flex-col border-r border-zinc-800 pt-8 pl-8 pr-4 shrink-0 overflow-y-auto
            fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
            ${u ? "translate-x-0 shadow-xl" : "-translate-x-full"}
            bg-zinc-900 text-zinc-300
        `, children: [f.jsxs("nav", { className: "space-y-1 mb-8", children: [f.jsxs("button", { onClick: () => {
    l({ type: "inbox" }), i && i();
  }, className: at(t.type === "inbox"), children: [f.jsx("span", { className: "text-blue-500 text-lg leading-none", children: "\u{1F4E5}" }), " Inbox"] }), f.jsxs("button", { onClick: () => {
    l({ type: "today" }), i && i();
  }, className: at(t.type === "today"), children: [f.jsx("span", { className: "text-green-500 text-lg leading-none", children: "\u{1F4C5}" }), " Today"] }), f.jsxs("button", { onClick: () => {
    l({ type: "upcoming" }), i && i();
  }, className: at(t.type === "upcoming"), children: [f.jsx("span", { className: "text-purple-500 text-lg leading-none", children: "\u{1F5D3}" }), " Upcoming"] }), f.jsxs("button", { onClick: () => {
    l({ type: "overdue" }), i && i();
  }, className: at(t.type === "overdue"), children: [f.jsx("span", { className: "text-red-500 text-lg leading-none", children: "\u26A0\uFE0F" }), " Overdue"] })] }), f.jsxs("div", { onClick: () => T(!_), className: "flex items-center justify-between px-2 py-1 mt-4 text-gray-500 hover:text-gray-700 cursor-pointer text-xs font-bold uppercase tracking-wider", children: [f.jsx("span", { children: "Views" }), f.jsx("span", { children: _ ? "\u25BC" : "\u25B6" })] }), _ && f.jsxs("div", { className: "mt-1 space-y-0.5", children: [f.jsxs("div", { onClick: () => l({ type: "view", value: "all" }), className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${M("view", "all") ? "bg-orange-100 text-orange-800" : "text-gray-700 hover:bg-gray-100"}`, children: [f.jsx("span", { children: "\u{1F4D1}" }), " All"] }), f.jsxs("div", { onClick: () => l({ type: "view", value: "open" }), className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${M("view", "open") ? "bg-emerald-100 text-emerald-800" : "text-gray-700 hover:bg-gray-100"}`, children: [f.jsx("span", { children: "\u26A1" }), " Open"] }), f.jsxs("div", { onClick: () => l({ type: "view", value: "done" }), className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${M("view", "done") ? "bg-gray-200 text-gray-800" : "text-gray-700 hover:bg-gray-100"}`, children: [f.jsx("span", { children: "\u2705" }), " Done"] })] }), f.jsxs("div", { onClick: () => O(!j), className: "flex items-center justify-between px-2 py-1 mt-4 text-gray-500 hover:text-gray-700 cursor-pointer text-xs font-bold uppercase tracking-wider", children: [f.jsx("span", { children: "Filters" }), f.jsx("span", { children: j ? "\u25BC" : "\u25B6" })] }), j && f.jsxs("div", { className: "mt-1 space-y-0.5", children: [f.jsxs("div", { onClick: () => l({ type: "filter", value: "no-due" }), className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${M("filter", "no-due") ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-gray-100"}`, children: [f.jsx("span", { children: "\u{1F6AB}" }), " No Due Date"] }), f.jsxs("div", { onClick: () => l({ type: "filter", value: "no-project" }), className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${M("filter", "no-project") ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-gray-100"}`, children: [f.jsx("span", { children: "\u{1F4C2}" }), " No Project"] })] }), f.jsxs("div", { className: "mb-6", children: [f.jsxs("h3", { className: "flex items-center justify-between text-gray-500 font-bold text-xs px-2 mb-2 group cursor-pointer hover:text-gray-700", onClick: () => d(!z), children: [f.jsxs("span", { className: "flex items-center gap-1", children: [f.jsx("span", { className: `transition-transform duration-200 ${z ? "" : "-rotate-90"}`, children: "\u25BC" }), "Projects"] }), f.jsx("button", { className: "opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded p-0.5", onClick: (q) => q.stopPropagation(), children: "+" })] }), z && f.jsxs("div", { className: "space-y-0.5", children: [e.length === 0 && f.jsx("div", { className: "px-2 text-xs text-gray-400 italic", children: "No projects yet" }), e.map((q) => f.jsxs("button", { onClick: () => {
    l({ type: "project", value: q }), i && i();
  }, className: at(t.type === "project" && t.value === q), children: [f.jsx("span", { className: "text-gray-400 text-xs", children: "\u25CF" }), q] }, q))] })] }), f.jsxs("div", { className: "mb-6", children: [f.jsxs("h3", { className: "flex items-center justify-between text-gray-500 font-bold text-xs px-2 mb-2 group cursor-pointer hover:text-gray-700", onClick: () => g(!o), children: [f.jsxs("span", { className: "flex items-center gap-1", children: [f.jsx("span", { className: `transition-transform duration-200 ${o ? "" : "-rotate-90"}`, children: "\u25BC" }), "Contexts"] }), f.jsx("button", { className: "opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded p-0.5", onClick: (q) => q.stopPropagation(), children: "+" })] }), o && f.jsxs("div", { className: "space-y-0.5", children: [a.length === 0 && f.jsx("div", { className: "px-2 text-xs text-gray-400 italic", children: "No contexts yet" }), a.map((q) => f.jsxs("button", { onClick: () => {
    l({ type: "context", value: q }), i && i();
  }, className: at(t.type === "context" && t.value === q), children: [f.jsx("span", { className: "text-gray-400 text-lg leading-none", children: "@" }), q] }, q))] })] }), f.jsxs("div", { className: "mb-6", children: [f.jsxs("h3", { className: "flex items-center justify-between text-gray-500 font-bold text-xs px-2 mb-2 group cursor-pointer hover:text-gray-700", onClick: () => N(!b), children: [f.jsxs("span", { className: "flex items-center gap-1", children: [f.jsx("span", { className: `transition-transform duration-200 ${b ? "" : "-rotate-90"}`, children: "\u25BC" }), "Tags"] }), f.jsx("button", { className: "opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded p-0.5", onClick: (q) => q.stopPropagation(), children: "+" })] }), b && f.jsxs("div", { className: "space-y-0.5", children: [n.length === 0 && f.jsx("div", { className: "px-2 text-xs text-gray-400 italic", children: "No tags yet" }), n.map((q) => f.jsxs("button", { onClick: () => {
    l({ type: "tag", value: q }), i && i();
  }, className: at(t.type === "tag" && t.value === q), children: [f.jsx("span", { className: "text-gray-400 text-xs", children: "#" }), q] }, q))] })] }), f.jsx("div", { className: "mt-auto pt-6 border-t border-gray-100 dark:border-zinc-800", children: f.jsxs("div", { className: "flex flex-col space-y-2 px-2 pb-4", children: [f.jsx("button", { onClick: () => {
    l({ type: "impressum" }), i && i();
  }, className: `text-sm text-left transition-colors ${t.type === "impressum" ? "text-zinc-100 font-medium" : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"}`, children: "Impressum" }), f.jsx("button", { onClick: () => {
    l({ type: "datenschutz" }), i && i();
  }, className: `text-sm text-left transition-colors ${t.type === "datenschutz" ? "text-zinc-100 font-medium" : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"}`, children: "Datenschutz" })] }) })] })] });
}
function Un(t) {
  let l = t.trim();
  if (!l) return null;
  const e = { id: ty(), raw: l, text: "", completed: false, priority: null, completionDate: null, creationDate: null, projects: [], contexts: [], tags: [], metadata: {} };
  let a = l;
  a.startsWith("x ") && (e.completed = true, a = a.substring(2).trim());
  const n = a.match(/^\(([A-Z])\)\s/);
  n && (e.priority = n[1], a = a.substring(n[0].length).trim());
  const u = /^(\d{4}-\d{2}-\d{2})/, i = a.match(u);
  if (i) {
    const y = i[1];
    a = a.substring(y.length).trim();
    const m = a.match(u);
    m ? e.completed ? (e.completionDate = y, e.creationDate = m[1], a = a.substring(m[1].length).trim()) : e.creationDate = y : e.completed ? e.completionDate = y : e.creationDate = y;
  }
  e.text = a;
  const c = a.matchAll(/(^|\s)\+([\w.-]+)/g);
  for (const y of c) e.projects.includes(y[2]) || e.projects.push(y[2]);
  const s = a.matchAll(/(^|\s)@([\w.-]+)/g);
  for (const y of s) e.contexts.includes(y[2]) || e.contexts.push(y[2]);
  const r = a.matchAll(/(^|\s)#([\w.-]+)/g);
  for (const y of r) e.tags.includes(y[2]) || e.tags.push(y[2]);
  const v = a.matchAll(/(^|\s)(\w+):(\S+)/g);
  for (const y of v) e.metadata[y[2]] = y[3];
  return e;
}
function ty() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}
const Nt = { tasks: [], listeners: [], undoStack: [], init() {
  this.loadFromPersistence();
}, subscribe(t) {
  return this.listeners.push(t), () => this.unsubscribe(t);
}, unsubscribe(t) {
  this.listeners = this.listeners.filter((l) => l !== t);
}, notify() {
  this.listeners.forEach((t) => t(this.tasks));
}, loadFromString(t) {
  const l = t.split(`
`);
  this.tasks = [], l.forEach((e) => {
    if (!e.trim()) return;
    const a = Un(e);
    a && this.tasks.push(a);
  }), this.saveToPersistence(), this.notify();
}, loadFromLocalStorage() {
  try {
    const t = localStorage.getItem("todoTxtTasks");
    if (t) {
      const l = JSON.parse(t);
      Array.isArray(l) && (this.tasks = l);
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
  const l = Un(t);
  !l || !l.text.trim() || (this.saveUndoState(), this.tasks.push(l), this.saveToPersistence(), this.notify());
}, updateTask(t, l) {
  const e = this.tasks.findIndex((a) => a.id === t);
  if (e !== -1) {
    this.saveUndoState();
    const a = Un(l);
    a.id = t, this.tasks[e].creationDate && !a.creationDate && (a.creationDate = this.tasks[e].creationDate), this.tasks[e] = a, this.saveToPersistence(), this.notify();
  }
}, deleteTask(t) {
  this.saveUndoState(), this.tasks = this.tasks.filter((l) => l.id !== t), this.saveToPersistence(), this.notify();
}, setTaskPriority(t, l) {
  const e = this.tasks.findIndex((i) => i.id === t);
  if (e === -1) return;
  const a = this.tasks[e];
  this.saveUndoState();
  let n = a.raw;
  n = n.replace(/^\([A-Z]\)\s/, ""), l && (n = `(${l}) ${n}`);
  const u = Un(n);
  u && (u.id = t, a.creationDate && !u.creationDate && (u.creationDate = a.creationDate), a.completionDate && !u.completionDate && (u.completionDate = a.completionDate), u.completed = a.completed, this.tasks[e] = u, this.saveToPersistence(), this.notify());
}, toggleTask(t) {
  const l = this.tasks.find((n) => n.id === t);
  if (!l) return;
  this.saveUndoState(), l.completed = !l.completed;
  const e = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  let a = l.raw;
  a = a.replace(/^x\s\d{4}-\d{2}-\d{2}\s/, "").trim(), l.completed ? (l.completionDate = e, a = `x ${e} ${a}`) : l.completionDate = null, l.raw = a, this.saveToLocalStorage(), this.notify();
}, deleteTask(t) {
  this.saveUndoState(), this.tasks = this.tasks.filter((l) => l.id !== t), this.saveToLocalStorage(), this.notify();
}, getTasks() {
  return this.tasks;
} };
function ly({ task: t, selected: l, onSelect: e, selectionMode: a, isFocused: n, isEditingProp: u, onEditEnd: i, onFilterClick: c }) {
  const [s, r] = R.useState(false);
  R.useEffect(() => {
    u && r(true);
  }, [u]);
  const v = (p) => {
    p.stopPropagation(), Nt.toggleTask(t.id);
  }, y = (p) => {
    Nt.updateTask(t.id, p), r(false), i && i();
  }, m = { A: "text-red-400", B: "text-amber-400", C: "text-sky-400" }[t.priority] || "text-gray-400", h = (p) => p.split(/(\+[\w.-]+|@[\w.-]+|#[\w.-]+|due:\d{4}-\d{2}-\d{2})/g).map((z, d) => {
    if (z.startsWith("+")) return f.jsx("span", { onClick: (o) => {
      o.stopPropagation(), c && c("project", z.substring(1));
    }, className: "text-cyan-400 hover:underline cursor-pointer", children: z }, d);
    if (z.startsWith("@")) return f.jsx("span", { onClick: (o) => {
      o.stopPropagation(), c && c("context", z.substring(1));
    }, className: "text-emerald-400 hover:underline cursor-pointer", children: z }, d);
    if (z.startsWith("#")) return f.jsx("span", { onClick: (o) => {
      o.stopPropagation(), c && c("tag", z.substring(1));
    }, className: "text-purple-400 hover:underline cursor-pointer", children: z }, d);
    if (z.startsWith("due:")) {
      const o = z.substring(4);
      return f.jsx("span", { onClick: (g) => {
        g.stopPropagation(), c && c("date", o);
      }, className: "text-red-400 hover:underline cursor-pointer", children: z }, d);
    }
    return z;
  });
  return s ? f.jsx("div", { className: "py-2 -mx-4 px-4 bg-gray-50 dark:bg-zinc-800 border-b border-gray-100 dark:border-zinc-700", children: f.jsx("input", { type: "text", defaultValue: t.raw, autoFocus: true, className: "w-full bg-transparent text-sm text-gray-800 dark:text-gray-200 outline-none placeholder-gray-400", onKeyDown: (p) => {
    p.key === "Enter" ? y(p.target.value) : p.key === "Escape" && (r(false), i && i());
  }, onBlur: (p) => y(p.target.value) }) }) : f.jsxs("div", { className: `group flex items-center py-1 border-b border-gray-800 hover:bg-zinc-900 -mx-4 px-4 transition-colors cursor-pointer 
                ${l ? "bg-blue-900/20" : ""} 
                ${n ? "bg-zinc-800 ring-1 ring-zinc-700" : ""}`, "data-id": t.id, onClick: () => r(true), children: [f.jsx("div", { className: "mr-3 flex-shrink-0", onClick: (p) => p.stopPropagation(), children: f.jsx("input", { type: "checkbox", checked: l || false, onChange: (p) => {
    e && e();
  }, className: "w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500 cursor-pointer" }) }), f.jsx("button", { onClick: v, className: `mr-3 w-5 h-5 rounded-full border border-zinc-500 hover:border-zinc-300 flex items-center justify-center text-transparent hover:text-zinc-500 transition-all ${t.completed ? "!bg-zinc-500 !border-zinc-500 text-white !text-white" : ""}`, children: t.completed ? "\u2713" : "" }), f.jsx("div", { className: "flex-1 min-w-0", children: f.jsxs("div", { className: `text-sm text-zinc-200 ${t.completed ? "line-through text-zinc-500" : ""}`, children: [t.priority && f.jsxs("span", { className: `text-xs font-bold mr-2 ${m}`, children: ["(", t.priority, ")"] }), h(t.text)] }) }), f.jsx("div", { className: "flex items-center ml-2", children: f.jsx("button", { onClick: (p) => {
    p.stopPropagation(), Nt.deleteTask(t.id);
  }, className: "p-2 text-zinc-500 hover:text-red-500 transition-colors", title: "Delete task", children: "\u2715" }) })] });
}
function ey({ tasks: t, activeFilter: l, selectedTaskIds: e, onTaskSelect: a, focusedTaskId: n, editingTaskId: u, onEditEnd: i, onFilterClick: c }) {
  const s = () => {
    if (!l) return "Inbox";
    switch (l.type) {
      case "inbox":
        return "Inbox";
      case "today":
        return "Today";
      case "upcoming":
        return "Upcoming";
      case "project":
        return `${l.value}`;
      case "context":
        return `@${l.value}`;
      default:
        return "Inbox";
    }
  };
  return f.jsxs("div", { className: "pb-20", children: [f.jsxs("header", { className: "mb-6", children: [f.jsx("h1", { className: "text-xl font-bold text-gray-800", children: s() }), f.jsx("div", { className: "text-xs text-gray-500 mt-1", children: (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, { weekday: "short", day: "numeric", month: "short" }) })] }), f.jsx("div", { className: "mb-4", children: t.map((r) => f.jsx(ly, { task: r, selected: e == null ? void 0 : e.has(r.id), onSelect: () => a && a(r.id), selectionMode: e && e.size > 0, isFocused: n === r.id, isEditingProp: u === r.id, onEditEnd: i, onFilterClick: c }, r.id)) }), t.length === 0 && f.jsxs("div", { className: "text-center py-10", children: [f.jsx("div", { className: "mb-4 text-6xl", children: "\u{1F389}" }), f.jsx("div", { className: "text-gray-800 font-medium", children: "All clear" }), f.jsx("div", { className: "text-gray-500 text-sm mt-2 max-w-sm mx-auto", children: "todo is a simple, offline-first task manager that allows you to organize your life and optionally sync with your todo.txt file on Google Drive or Dropbox." })] })] });
}
function ay({ selectedCount: t, onDeselectAll: l, onCompleteAll: e, onDeleteAll: a }) {
  return t === 0 ? null : f.jsxs("div", { className: "fixed bottom-0 left-0 right-0 md:left-[305px] bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700 p-4 flex items-center justify-between shadow-lg z-30 transition-all transform translate-y-0", children: [f.jsxs("div", { className: "flex items-center gap-4", children: [f.jsxs("span", { className: "font-semibold text-sm text-gray-700 dark:text-gray-300", children: [t, " selected"] }), f.jsx("button", { onClick: l, className: "text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200", children: "Cancel" })] }), f.jsxs("div", { className: "flex items-center gap-2", children: [f.jsx("button", { onClick: e, className: "px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-md text-sm font-medium transition-colors", children: "Complete" }), f.jsx("button", { onClick: a, className: "px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm font-medium transition-colors", children: "Delete" })] })] });
}
function ny({ searchValue: t, onSearch: l, onQuickAdd: e, onMenuClick: a, onSettingsClick: n, focusTrigger: u, activeFilter: i, onClearFilter: c }) {
  const s = R.useRef(null);
  R.useEffect(() => {
    u > 0 && s.current && (s.current.focus(), s.current.setSelectionRange(0, 0));
  }, [u]);
  let r = null;
  return i && (i.type === "project" ? r = { text: `+${i.value}`, className: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20" } : i.type === "context" ? r = { text: `@${i.value}`, className: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" } : i.type === "tag" ? r = { text: `#${i.value}`, className: "text-purple-400 bg-purple-400/10 border-purple-400/20" } : i.type === "today" ? r = { text: "\u{1F4C5} Today", className: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" } : i.type === "upcoming" ? r = { text: "\u{1F5D3} Upcoming", className: "text-purple-400 bg-purple-400/10 border-purple-400/20" } : i.type === "overdue" && (r = { text: "\u26A0\uFE0F Overdue", className: "text-red-400 bg-red-400/10 border-red-400/20" })), f.jsxs("div", { className: "fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800 z-40 flex items-center gap-3", children: [f.jsxs("div", { className: "relative flex-1 group", children: [f.jsx("div", { className: "absolute inset-0 bg-zinc-800 rounded-xl transition-colors group-focus-within:bg-zinc-700 border border-zinc-700 shadow-sm group-focus-within:ring-1 group-focus-within:ring-zinc-600" }), f.jsxs("div", { className: "relative flex items-center w-full px-3 py-1.5 h-[46px]", children: [f.jsx("input", { ref: s, type: "text", placeholder: r ? "Add a new task..." : "Search, filter or add a new task ...", className: "bg-transparent text-zinc-100 placeholder-zinc-500 text-sm outline-none flex-1 min-w-0 font-medium h-full", value: t, onChange: (v) => l(v.target.value), onKeyDown: (v) => {
    v.key === "Enter" && e(t);
  } }), r && f.jsxs("button", { onClick: c, className: `flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono border ml-2 whitespace-nowrap select-none hover:opacity-80 transition-opacity ${r.className}`, title: "Clear filter", children: [r.text, f.jsx("span", { className: "ml-1 opacity-60 hover:opacity-100", children: "\xD7" })] }), t && f.jsxs(f.Fragment, { children: [f.jsx("button", { onClick: () => l(""), className: "p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors ml-2 shrink-0", title: "Clear search", children: f.jsx("span", { className: "text-lg", children: "\xD7" }) }), f.jsx("button", { onClick: () => e(t), className: "p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors ml-1 shrink-0", children: f.jsx("span", { className: "text-xs font-bold", children: "\u21B5" }) })] })] })] }), f.jsxs("div", { className: "flex gap-2 shrink-0", children: [f.jsx("button", { className: "p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 rounded-xl transition-colors", onClick: n, title: "Settings", children: f.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", className: "fill-current", children: f.jsx("path", { d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.09 8.87a.49.49 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" }) }) }), f.jsx("button", { className: "p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 rounded-xl transition-colors", onClick: a, children: f.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", className: "fill-current", children: f.jsx("path", { d: "M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" }) }) })] })] });
}
const uy = "533958879265-u2sipqoup3j5fobgfkq1f37r5g8eo7lj.apps.googleusercontent.com", iy = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/tasks";
function cy(t) {
  const [l, e] = R.useState(false), [a, n] = R.useState(false), [u, i] = R.useState(null);
  R.useEffect(() => {
    (() => {
      if (window.gapi) c();
      else {
        const z = document.createElement("script");
        z.src = "https://apis.google.com/js/api.js", z.onload = () => c(), document.body.appendChild(z);
      }
      if (window.google) s();
      else {
        const z = document.createElement("script");
        z.src = "https://accounts.google.com/gsi/client", z.onload = () => s(), document.body.appendChild(z);
      }
    })();
  }, []);
  const c = () => {
    window.gapi.load("client", async () => {
      await window.gapi.client.init({ discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest", "https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"] });
    });
  }, s = () => {
    const S = window.google.accounts.oauth2.initTokenClient({ client_id: uy, scope: iy, callback: (z) => {
      if (z.error !== void 0) throw z;
      e(true);
    } });
    i(S);
  }, r = () => {
    u && u.requestAccessToken({ prompt: "consent" });
  }, v = async (S) => {
    if (!l) {
      r();
      return;
    }
    n(true);
    try {
      const z = S.map((b) => b.raw).join(`
`), o = (await window.gapi.client.drive.files.list({ q: "name = 'todo.txt' and trashed = false", fields: "files(id, name)", spaces: "drive" })).result.files, g = { name: "todo.txt", mimeType: "text/plain" };
      o && o.length > 0 ? (await y(o[0].id, z), console.log("Updated existing todo.txt")) : (await m(g, z), console.log("Created new todo.txt"));
    } catch (z) {
      console.error("Drive Push failed", z);
    } finally {
      n(false);
    }
  }, y = async (S, z) => {
    const d = `https://www.googleapis.com/upload/drive/v3/files/${S}?uploadType=media`, o = window.gapi.client.getToken().access_token;
    await fetch(d, { method: "PATCH", headers: { Authorization: `Bearer ${o}`, "Content-Type": "text/plain" }, body: z });
  }, m = async (S, z) => {
    const d = new FormData();
    d.append("metadata", new Blob([JSON.stringify(S)], { type: "application/json" })), d.append("file", new Blob([z], { type: "text/plain" }));
    const o = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", g = window.gapi.client.getToken().access_token;
    await fetch(o, { method: "POST", headers: { Authorization: `Bearer ${g}` }, body: d });
  };
  return { isAuthenticated: l, isSyncing: a, login: r, syncPushDrive: v, syncPullDrive: async () => {
    if (!l) {
      r();
      return;
    }
    n(true);
    try {
      const z = (await window.gapi.client.drive.files.list({ q: "name = 'todo.txt' and trashed = false", fields: "files(id, name)", spaces: "drive" })).result.files;
      if (z && z.length > 0) {
        const d = await window.gapi.client.drive.files.get({ fileId: z[0].id, alt: "media" });
        t(d.body);
      }
    } catch (S) {
      console.error("Drive Pull failed", S);
    } finally {
      n(false);
    }
  }, syncPushTasks: async (S) => {
    if (!l) {
      r();
      return;
    }
    n(true);
    try {
      const d = (await window.gapi.client.tasks.tasklists.list()).result.items[0];
      for (const o of S) o.completed || await window.gapi.client.tasks.tasks.insert({ tasklist: d.id, resource: { title: o.text, notes: o.raw } });
      console.log("Pushed tasks to Google Tasks");
    } catch (z) {
      console.error("GTasks Push failed", z);
    } finally {
      n(false);
    }
  } };
}
const fy = "xdqurve95t2h4hb";
function sy(t) {
  const [l, e] = R.useState(false), [a, n] = R.useState(null), [u, i] = R.useState(false);
  R.useEffect(() => {
    const v = window.location.hash;
    if (v.includes("access_token")) {
      const m = new URLSearchParams(v.substring(1)).get("access_token");
      m && (n(m), e(true), window.history.replaceState(null, null, window.location.pathname), sessionStorage.setItem("dropbox_token", m));
    } else {
      const y = sessionStorage.getItem("dropbox_token");
      y && (n(y), e(true));
    }
  }, []);
  const c = () => {
    const v = window.location.origin, y = `https://www.dropbox.com/oauth2/authorize?client_id=${fy}&response_type=token&redirect_uri=${v}`;
    window.location.href = y;
  };
  return { isAuthenticated: l, isSyncing: u, login: c, syncPush: async (v) => {
    if (!a) {
      c();
      return;
    }
    i(true);
    try {
      const y = v.map((h) => h.raw).join(`
`), m = new Blob([y], { type: "text/plain" });
      await fetch("https://content.dropboxapi.com/2/files/upload", { method: "POST", headers: { Authorization: `Bearer ${a}`, "Dropbox-API-Arg": JSON.stringify({ path: "/todo.txt", mode: "overwrite", autorename: true, mute: false }), "Content-Type": "application/octet-stream" }, body: m }), console.log("Dropbox push successful");
    } catch (y) {
      console.error("Dropbox push failed", y), y.status === 401 && (e(false), sessionStorage.removeItem("dropbox_token"));
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
      if (v.ok) {
        const y = await v.text();
        t(y), console.log("Dropbox pull successful");
      } else throw new Error(await v.text());
    } catch (v) {
      console.error("Dropbox pull failed", v);
    } finally {
      i(false);
    }
  } };
}
const oy = ({ tasks: t, focusedTaskId: l, setFocusedTaskId: e, setSearchFocus: a, onTaskComplete: n, onTaskDelete: u, onTaskEdit: i, onTaskPriority: c, onUndo: s, clearFilters: r }) => {
  const [v, y] = R.useState(false);
  R.useEffect(() => {
    const m = (h) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        h.key === "Escape" && (document.activeElement.blur(), h.preventDefault());
        return;
      }
      if (h.key === "/") {
        h.preventDefault(), a();
        return;
      }
      if (h.key === "Escape") {
        if (h.preventDefault(), v) {
          y(false);
          return;
        }
        r && r(), e(null);
        return;
      }
      if ((h.ctrlKey || h.metaKey) && h.key === "z") {
        h.preventDefault(), s && s();
        return;
      }
      if (!t || t.length === 0) return;
      const S = t.findIndex((z) => z.id === l);
      if (v) {
        if (["a", "b", "c", "n"].includes(h.key.toLowerCase())) {
          if (h.preventDefault(), l) {
            const z = h.key.toLowerCase() === "n" ? null : h.key.toUpperCase();
            c(l, z);
          }
          y(false);
        } else y(false);
        return;
      }
      switch (h.key) {
        case "ArrowDown":
          h.preventDefault(), S < t.length - 1 ? e(t[S + 1].id) : S === -1 && e(t[0].id);
          break;
        case "ArrowUp":
          h.preventDefault(), S > 0 ? e(t[S - 1].id) : S === -1 && t.length > 0 && e(t[t.length - 1].id);
          break;
        case "x":
          l && (h.preventDefault(), n(l));
          break;
        case "e":
          l && (h.preventDefault(), i(l));
          break;
        case "Delete":
        case "Backspace":
          l && (h.preventDefault(), u(l));
          break;
        case "ArrowRight":
          l && (h.preventDefault(), c(l, "up"));
          break;
        case "ArrowLeft":
          l && (h.preventDefault(), c(l, "down"));
          break;
        case "p":
          l && (h.preventDefault(), y(true));
          break;
      }
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [t, l, e, a, n, u, i, c, s, r, v]);
}, ry = (t, l) => {
  if (!l || !l.trim()) return t;
  const e = l.trim().split(/\s+/);
  return t.filter((a) => e.every((n) => {
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
function dy({ isOpen: t, onClose: l, onSyncClick: e, onPullClick: a, isSyncing: n, isAuthenticated: u, onDropboxSync: i, onDropboxPull: c, isDropboxAuth: s, isDropboxSyncing: r, onGTasksSync: v }) {
  const [y, m] = R.useState(false), [h, p] = R.useState(false), [S, z] = R.useState(false);
  return f.jsxs(f.Fragment, { children: [t && f.jsx("div", { className: "fixed inset-0 bg-black/50 z-40", onClick: l }), f.jsxs("aside", { className: `
            w-[305px] bg-zinc-900 flex flex-col border-r border-zinc-800 pt-8 px-4 shrink-0 overflow-y-auto
            fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
            ${t ? "translate-x-0 shadow-xl" : "-translate-x-full"}
            text-zinc-300
        `, children: [f.jsxs("div", { className: "flex justify-between items-center mb-6 px-2", children: [f.jsx("h2", { className: "text-lg font-bold text-gray-100", children: "Settings" }), f.jsx("button", { onClick: l, className: "text-gray-400 hover:text-gray-200", children: f.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [f.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), f.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) })] }), f.jsxs("div", { className: "mb-4", children: [f.jsxs("button", { onClick: () => m(!y), className: "w-full flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2 py-2 hover:bg-zinc-800 rounded transition-colors", children: [f.jsx("span", { children: "Sync" }), f.jsx("span", { children: y ? "\u2212" : "+" })] }), y && f.jsxs("div", { className: "space-y-2 px-2 animate-in slide-in-from-top-2 duration-200", children: [f.jsxs("div", { className: "flex items-center justify-between p-2 rounded hover:bg-zinc-800/50 transition-colors", children: [f.jsx("span", { className: "text-sm text-gray-300", children: "Google Drive" }), f.jsxs("div", { className: "flex items-center gap-2", children: [f.jsx("button", { onClick: e, className: `p-1.5 rounded hover:bg-zinc-700 ${n ? "animate-pulse text-blue-500" : "text-gray-500"}`, title: u ? "Sync Drive" : "Login Google", children: u ? "\u2601\uFE0F" : "\u{1F511}" }), u && f.jsx("button", { onClick: a, className: `p-1.5 rounded hover:bg-zinc-700 ${n ? "animate-spin" : "text-gray-500"}`, title: "Pull from Drive", children: "\u{1F504}" })] })] }), u && f.jsxs("div", { className: "flex items-center justify-between p-2 rounded hover:bg-zinc-800/50 transition-colors", children: [f.jsx("span", { className: "text-sm text-gray-300", children: "Google Tasks" }), f.jsx("button", { onClick: v, className: `p-1.5 rounded hover:bg-zinc-700 ${n ? "animate-pulse text-blue-500" : "text-gray-500"}`, title: "Push to GTasks", children: "\u2611\uFE0F" })] }), f.jsxs("div", { className: "flex items-center justify-between p-2 rounded hover:bg-zinc-800/50 transition-colors", children: [f.jsx("span", { className: "text-sm text-gray-300", children: "Dropbox" }), f.jsxs("div", { className: "flex items-center gap-2", children: [f.jsx("button", { onClick: i, className: `p-1.5 rounded hover:bg-zinc-700 ${r ? "animate-pulse text-blue-500" : "text-gray-500"}`, title: s ? "Sync Dropbox" : "Login Dropbox", children: s ? "\u{1F4E6}" : "Login" }), s && f.jsx("button", { onClick: c, className: `p-1.5 rounded hover:bg-zinc-700 ${r ? "animate-spin" : "text-gray-500"}`, title: "Pull from Dropbox", children: "\u{1F504}" })] })] })] })] }), f.jsxs("div", { className: "mb-4", children: [f.jsxs("button", { onClick: () => p(!h), className: "w-full flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2 py-2 hover:bg-zinc-800 rounded transition-colors", children: [f.jsx("span", { children: "Shortcuts" }), f.jsx("span", { children: h ? "\u2212" : "+" })] }), h && f.jsxs("div", { className: "space-y-1 px-2 text-sm animate-in slide-in-from-top-2 duration-200", children: [f.jsxs("div", { className: "flex justify-between items-center py-1", children: [f.jsx("span", { className: "text-gray-400", children: "Focus search" }), f.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "/" })] }), f.jsxs("div", { className: "flex justify-between items-center py-1", children: [f.jsx("span", { className: "text-gray-400", children: "Navigate" }), f.jsxs("div", { className: "flex gap-1", children: [f.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "\u2191" }), f.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "\u2193" })] })] }), f.jsxs("div", { className: "flex justify-between items-center py-1", children: [f.jsx("span", { className: "text-gray-400", children: "Priority" }), f.jsxs("div", { className: "flex gap-1", children: [f.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "\u2190" }), f.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "\u2192" })] })] }), f.jsxs("div", { className: "flex justify-between items-center py-1", children: [f.jsx("span", { className: "text-gray-400", children: "Edit" }), f.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "e" })] }), f.jsxs("div", { className: "flex justify-between items-center py-1", children: [f.jsx("span", { className: "text-gray-400", children: "Complete" }), f.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "x" })] }), f.jsxs("div", { className: "flex justify-between items-center py-1", children: [f.jsx("span", { className: "text-gray-400", children: "Delete" }), f.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "Del" })] }), f.jsxs("div", { className: "flex justify-between items-center py-1", children: [f.jsx("span", { className: "text-gray-400", children: "Clear" }), f.jsx("kbd", { className: "px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400", children: "Esc" })] })] })] }), f.jsxs("div", { className: "mb-4", children: [f.jsxs("button", { onClick: () => z(!S), className: "w-full flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2 py-2 hover:bg-zinc-800 rounded transition-colors", children: [f.jsx("span", { children: "Search Syntax" }), f.jsx("span", { children: S ? "\u2212" : "+" })] }), S && f.jsxs("div", { className: "space-y-2 px-2 text-xs text-gray-400 animate-in slide-in-from-top-2 duration-200", children: [f.jsxs("div", { className: "flex gap-2", children: [f.jsx("code", { className: "text-blue-400 bg-blue-900/30 px-1 rounded", children: "prio:A" }), f.jsx("span", { children: "Priority" })] }), f.jsxs("div", { className: "flex gap-2", children: [f.jsx("code", { className: "text-purple-400 bg-purple-900/30 px-1 rounded", children: "+proj" }), f.jsx("span", { children: "Project" })] }), f.jsxs("div", { className: "flex gap-2", children: [f.jsx("code", { className: "text-green-400 bg-green-900/30 px-1 rounded", children: "@ctx" }), f.jsx("span", { children: "Context" })] }), f.jsxs("div", { className: "flex gap-2", children: [f.jsx("code", { className: "text-orange-400 bg-orange-900/30 px-1 rounded", children: "is:open" }), f.jsx("span", { children: "Status" })] })] })] })] })] });
}
function my() {
  return f.jsxs("div", { className: "text-zinc-300 max-w-2xl mx-auto pb-20 p-4", children: [f.jsx("header", { className: "mb-8 border-b border-zinc-800 pb-4", children: f.jsx("h1", { className: "text-3xl font-bold text-zinc-100", children: "Impressum" }) }), f.jsxs("div", { className: "space-y-8 text-sm leading-relaxed", children: [f.jsxs("section", { children: [f.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "Angaben gem\xE4\xDF \xA7 5 TMG" }), f.jsxs("p", { className: "text-zinc-400", children: ["Alexander Mut", f.jsx("br", {}), "Falkenbergsweg 66", f.jsx("br", {}), "21149 Hamburg", f.jsx("br", {}), "Deutschland"] })] }), f.jsxs("section", { children: [f.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "Kontakt" }), f.jsxs("p", { className: "text-zinc-400", children: ["Telefon: +49 151 51 00 27 67", f.jsx("br", {}), "E-Mail: mutalex (at) gmail (punkt) com"] })] }), f.jsxs("section", { children: [f.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "Verantwortlich f\xFCr den Inhalt nach \xA7 18 Abs. 2 MStV" }), f.jsxs("p", { className: "text-zinc-400", children: ["Alexander Mut", f.jsx("br", {}), "Falkenbergsweg 66", f.jsx("br", {}), "21149 Hamburg"] })] }), f.jsxs("section", { children: [f.jsx("h3", { className: "text-lg font-semibold text-zinc-200 mb-2", children: "Haftungsausschluss" }), f.jsx("p", { className: "text-zinc-400", children: "Trotz sorgf\xE4ltiger inhaltlicher Kontrolle \xFCbernehmen wir keine Haftung f\xFCr die Inhalte externer Links. F\xFCr den Inhalt der verlinkten Seiten sind ausschlie\xDFlich deren Betreiber verantwortlich." })] })] })] });
}
function hy() {
  return f.jsxs("div", { className: "text-zinc-300 max-w-2xl mx-auto pb-20 p-4", children: [f.jsx("header", { className: "mb-8 border-b border-zinc-800 pb-4", children: f.jsx("h1", { className: "text-3xl font-bold text-zinc-100", children: "Datenschutzerkl\xE4rung" }) }), f.jsxs("div", { className: "space-y-8 text-sm leading-relaxed", children: [f.jsxs("section", { children: [f.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "1. Verantwortlicher" }), f.jsx("p", { className: "text-zinc-400 mb-2", children: "Verantwortlicher f\xFCr die Datenverarbeitung im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:" }), f.jsxs("p", { className: "text-zinc-400 mb-2", children: ["Alexander Mut", f.jsx("br", {}), "Falkenbergsweg 66", f.jsx("br", {}), "21149 Hamburg", f.jsx("br", {}), "E-Mail: mutalex (at) gmail (punkt) com"] }), f.jsx("p", { className: "text-zinc-500 italic", children: "(Weitere Angaben siehe Impressum)" })] }), f.jsxs("section", { children: [f.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "2. Geltungsbereich" }), f.jsx("p", { className: "text-zinc-400", children: 'Diese Datenschutzerkl\xE4rung kl\xE4rt Sie \xFCber die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten innerhalb dieser Webanwendung (im Folgenden "App"), die unter https://alexandermut.github.io/protodo/index.html und deren Unterseiten betrieben wird, auf.' })] }), f.jsxs("section", { children: [f.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "3. Datenverarbeitung im \xDCberblick" }), f.jsx("p", { className: "text-zinc-400 mb-4", children: 'Diese App ist als "Offline-First"-Anwendung konzipiert. Die Kernfunktionalit\xE4t erfordert keine \xDCbertragung Ihrer pers\xF6nlichen Daten an den Anbieter dieser App.' }), f.jsxs("ul", { className: "list-disc pl-5 space-y-2 text-zinc-400", children: [f.jsxs("li", { children: [f.jsx("strong", { className: "text-zinc-300", children: "Hosting (GitHub Pages):" }), " Beim Aufruf der App werden Daten (z.B. IP-Adresse) an den Hosting-Anbieter \xFCbertragen."] }), f.jsxs("li", { children: [f.jsx("strong", { className: "text-zinc-300", children: "Externe Skripte (Google):" }), " Um die Anmeldung zu erm\xF6glichen, l\xE4dt die App Skripte von Google-Servern, wodurch Ihre IP-Adresse an Google \xFCbermittelt werden kann."] }), f.jsxs("li", { children: [f.jsx("strong", { className: "text-zinc-300", children: "Lokale Speicherung (LocalStorage):" }), " Ihre Aufgaben werden prim\xE4r lokal in Ihrem Browser gespeichert."] }), f.jsxs("li", { children: [f.jsx("strong", { className: "text-zinc-300", children: "Synchronisierung (Google / Dropbox):" }), " Nur bei aktiver Nutzung werden Daten direkt zwischen Ihrem Browser und dem gew\xE4hlten Cloud-Anbieter \xFCbertragen."] })] })] }), f.jsxs("section", { children: [f.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "4. Datenverarbeitung im Detail" }), f.jsxs("div", { className: "mb-6", children: [f.jsx("h3", { className: "text-lg font-medium text-zinc-200 mb-2", children: "a) Hosting durch GitHub Pages" }), f.jsx("p", { className: "text-zinc-400 mb-2", children: "Diese App wird bei GitHub Pages, einem Dienst der GitHub, Inc. (88 Colin P Kelly Jr St, San Francisco, CA 94107, USA), gehostet." }), f.jsx("p", { className: "text-zinc-400 mb-2", children: "Beim Aufruf der App werden von GitHub Server-Logfiles erhoben (IP-Adresse, Browserdaten, etc.), um den Dienst sicher bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO)." })] }), f.jsxs("div", { className: "mb-6", children: [f.jsx("h3", { className: "text-lg font-medium text-zinc-200 mb-2", children: "b) Einbindung von Google-Diensten (Google Identity Services)" }), f.jsx("p", { className: "text-zinc-400 mb-2", children: 'Um die Authentifizierung und Synchronisierung mit Google-Diensten zu erm\xF6glichen, wird beim Start der App der "Google Identity Services"-Client (gsi/client) geladen.' }), f.jsx("p", { className: "text-zinc-400 mb-2", children: "Hierbei baut Ihr Browser eine direkte Verbindung zu den Servern von Google auf. Google erh\xE4lt dadurch die Information, dass Sie diese Webseite aufgerufen haben (inkl. Ihrer IP-Adresse), auch wenn Sie sich nicht einloggen. Dies ist technisch notwendig, um die Login-Funktionalit\xE4t bereitzustellen." })] }), f.jsxs("div", { className: "mb-6", children: [f.jsx("h3", { className: "text-lg font-medium text-zinc-200 mb-2", children: "c) Google Drive & Google Tasks Synchronisation" }), f.jsx("p", { className: "text-zinc-400 mb-2", children: 'Sie haben die M\xF6glichkeit, Ihre Aufgaben mit Google Drive zu synchronisieren oder an Google Tasks zu senden. Dies geschieht ausschlie\xDFlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) durch den Login ("Sign in with Google").' }), f.jsxs("p", { className: "text-zinc-400 mb-2", children: [f.jsx("strong", { className: "text-zinc-300", children: "Umfang:" }), " Die App erh\xE4lt Zugriff auf einen speziellen Anwendungsordner in Ihrem Google Drive (zur Speicherung der `todo.txt`) sowie das Recht, Aufgaben in Ihren Google Tasks zu erstellen."] }), f.jsxs("p", { className: "text-zinc-400 mb-2", children: [f.jsx("strong", { className: "text-zinc-300", children: "Daten\xFCbermittlung:" }), " Die Daten\xFCbertragung findet direkt verschl\xFCsselt zwischen Ihrem Endger\xE4t und den Google-Servern statt. Der Anbieter der App hat keinen Zugriff auf Ihr Google-Konto."] })] }), f.jsxs("div", { className: "mb-6", children: [f.jsx("h3", { className: "text-lg font-medium text-zinc-200 mb-2", children: "d) Dropbox Synchronisation" }), f.jsx("p", { className: "text-zinc-400 mb-2", children: "Alternativ k\xF6nnen Sie den Dienst Dropbox zur Synchronisierung nutzen. Anbieter ist die Dropbox International Unlimited Company (Irland)." }), f.jsxs("p", { className: "text-zinc-400 mb-2", children: [f.jsx("strong", { className: "text-zinc-300", children: "Funktionsweise:" }), " Nach Ihrer expliziten Authentifizierung (OAuth) erh\xE4lt die App einen Zugriffstoken, der lokal in Ihrem Browser gespeichert wird. Mit diesem Token kann die App die Datei `todo.txt` in Ihrem Dropbox-Speicher lesen und schreiben."] }), f.jsxs("p", { className: "text-zinc-400 mb-2", children: [f.jsx("strong", { className: "text-zinc-300", children: "Rechtsgrundlage:" }), " Einwilligung gem\xE4\xDF Art. 6 Abs. 1 lit. a DSGVO."] })] })] }), f.jsxs("section", { children: [f.jsx("h2", { className: "text-xl font-semibold text-zinc-100 mb-4", children: "5. Ihre Rechte" }), f.jsx("p", { className: "text-zinc-400 mb-4", children: "Sie haben gem\xE4\xDF DSGVO das Recht auf Auskunft, Berichtigung, L\xF6schung und Einschr\xE4nkung der Verarbeitung Ihrer bei uns gespeicherten Daten." }), f.jsx("p", { className: "text-zinc-400 mb-2", children: "Da wir als App-Anbieter keine Benutzerdaten auf eigenen Servern speichern, wenden Sie sich f\xFCr die Aus\xFCbung Ihrer Rechte bez\xFCglich der Cloud-Daten (Drive/Dropbox) bitte direkt an die jeweiligen Anbieter oder nutzen Sie die L\xF6schfunktionen innerhalb der Dienste." }), f.jsx("p", { className: "text-zinc-400", children: 'Lokale Daten ("LocalStorage") k\xF6nnen Sie jederzeit selbst durch das Leeren Ihres Browser-Caches l\xF6schen.' })] })] })] });
}
function yy() {
  const [t, l] = R.useState(Nt.getTasks()), [e, a] = R.useState({ type: "inbox" }), [n, u] = R.useState(false), [i, c] = R.useState(null), [s, r] = R.useState(null), [v, y] = R.useState(false), m = (E) => {
    Nt.loadFromString(E);
  }, { isAuthenticated: h, isSyncing: p, login: S, syncPushDrive: z, syncPullDrive: d, syncPushTasks: o } = cy(m), { isAuthenticated: g, isSyncing: b, login: N, syncPush: _, syncPull: T } = sy(m);
  R.useEffect(() => (Nt.init(), Nt.subscribe((E) => {
    l([...E]);
  }), () => {
  }), []);
  const [j, O] = R.useState(""), [M, at] = R.useState(0), q = R.useMemo(() => {
    let E = t;
    if (j.trim() && (E = ry(E, j)), !e) return E;
    switch (e.type) {
      case "today":
        const $ = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        return E.filter((K) => K.metadata && K.metadata.due === $);
      case "upcoming":
        const ot = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        return E.filter((K) => K.metadata && K.metadata.due > ot);
      case "overdue":
        const Ot = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        return E.filter((K) => K.metadata && K.metadata.due && K.metadata.due < Ot && !K.completed);
      case "project":
        return E.filter((K) => K.projects.includes(e.value));
      case "context":
        return E.filter((K) => K.contexts && K.contexts.includes(e.value));
      case "tag":
        return E.filter((K) => K.tags && K.tags.includes(e.value));
      case "inbox":
      case "impressum":
      case "datenschutz":
      default:
        return E;
    }
  }, [t, e, j]), ue = (E) => {
    if (!E.trim()) return;
    let $ = E;
    if (e) switch (e.type) {
      case "project":
        $ += ` +${e.value}`;
        break;
      case "context":
        $ += ` @${e.value}`;
        break;
      case "tag":
        $ += ` #${e.value}`;
        break;
      case "today":
        const ot = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        $ += ` due:${ot}`;
        break;
    }
    Nt.addTask($), O("");
  }, Zu = R.useMemo(() => [...new Set(t.flatMap((E) => E.projects || []))].sort(), [t]), ga = R.useMemo(() => [...new Set(t.flatMap((E) => E.contexts || []))].sort(), [t]), A = R.useMemo(() => [...new Set(t.flatMap((E) => E.tags || []))].sort(), [t]), [U, C] = R.useState(/* @__PURE__ */ new Set()), nt = (E) => {
    const $ = new Set(U);
    $.has(E) ? $.delete(E) : $.add(E), C($);
  }, st = () => {
    t.filter(($) => U.has($.id)).forEach(($) => Nt.updateTask($.id, { completed: true })), C(/* @__PURE__ */ new Set());
  }, je = () => {
    Array.from(U).forEach((E) => Nt.deleteTask(E)), C(/* @__PURE__ */ new Set());
  };
  return oy({ tasks: q, focusedTaskId: i, setFocusedTaskId: c, setSearchFocus: () => at((E) => E + 1), onTaskComplete: (E) => {
    Nt.toggleTask(E);
  }, onTaskDelete: (E) => Nt.deleteTask(E), onTaskEdit: (E) => {
    r(E);
  }, onTaskPriority: (E, $) => {
    const ot = t.find((Lu) => Lu.id === E);
    if (!ot) return;
    if (["A", "B", "C", null].includes($)) {
      Nt.setTaskPriority(E, $);
      return;
    }
    const Ot = [null, "C", "B", "A"];
    let K = Ot.indexOf(ot.priority || null);
    K === -1 && (K = 0);
    let al = K;
    $ === "up" && (al = Math.min(al + 1, Ot.length - 1)), $ === "down" && (al = Math.max(al - 1, 0)), al !== K && Nt.setTaskPriority(E, Ot[al]);
  }, onUndo: () => Nt.undo(), clearFilters: () => {
    O(""), a({ type: "inbox" }), y(false);
  } }), f.jsx(f.Fragment, { children: f.jsxs("div", { className: "flex flex-col h-full", children: [f.jsxs("div", { className: "flex flex-1 overflow-hidden relative", children: [f.jsx(dy, { isOpen: v, onClose: () => y(false), onSyncClick: () => h ? z(t) : S(), onPullClick: d, isSyncing: p, isAuthenticated: h, onDropboxSync: () => g ? _(t) : N(), onDropboxPull: T, isDropboxAuth: g, isDropboxSyncing: b, onGTasksSync: () => h ? o(t) : S() }), f.jsx("main", { id: "main-content", className: "flex-1 overflow-y-auto bg-zinc-950 p-4 sm:p-8 flex justify-center transition-colors pb-32", children: f.jsx("div", { className: "w-full max-w-3xl", children: f.jsx("div", { className: "mt-8 space-y-2", children: e.type === "impressum" ? f.jsx(my, {}) : e.type === "datenschutz" ? f.jsx(hy, {}) : f.jsx(ey, { tasks: q, activeFilter: e, selectedTaskIds: U, onTaskSelect: nt, focusedTaskId: i, editingTaskId: s, onEditEnd: () => r(null), onFilterClick: (E, $) => {
    let ot = "";
    E === "project" && (ot = "+"), E === "context" && (ot = "@"), E === "tag" && (ot = "#"), E === "date" && (ot = "due:");
    const Ot = `${ot}${$}`, K = j || "";
    if (K.includes(Ot)) {
      const al = K.replace(Ot, "").replace(/\s\s+/g, " ").trim();
      O(al);
    } else {
      const Lu = (K || "") + " " + Ot;
      O(Lu);
    }
    at((al) => al + 1);
  } }) }) }) }), f.jsx(Ph, { activeFilter: e, onFilterSelect: a, projects: Zu, contexts: ga, tags: A, tasks: t, isOpen: n, onClose: () => u(false) }), f.jsx(ay, { selectedCount: U.size, onDeselectAll: () => C(/* @__PURE__ */ new Set()), onCompleteAll: st, onDeleteAll: je })] }), f.jsx(ny, { searchValue: j, onSearch: O, onQuickAdd: ue, onMenuClick: () => u(!n), onSettingsClick: () => y(!v), focusTrigger: M, activeFilter: e, onClearFilter: () => a({ type: "inbox" }) })] }) });
}
Ih.createRoot(document.getElementById("root")).render(f.jsx(yy, {}));
