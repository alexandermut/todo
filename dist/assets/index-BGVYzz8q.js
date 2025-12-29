(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const u of document.querySelectorAll('link[rel="modulepreload"]')) a(u);
  new MutationObserver((u) => {
    for (const n of u) if (n.type === "childList") for (const i of n.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && a(i);
  }).observe(document, { childList: true, subtree: true });
  function e(u) {
    const n = {};
    return u.integrity && (n.integrity = u.integrity), u.referrerPolicy && (n.referrerPolicy = u.referrerPolicy), u.crossOrigin === "use-credentials" ? n.credentials = "include" : u.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n;
  }
  function a(u) {
    if (u.ep) return;
    u.ep = true;
    const n = e(u);
    fetch(u.href, n);
  }
})();
var Ws = { exports: {} }, pn = {};
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Pd = Symbol.for("react.transitional.element"), lr = Symbol.for("react.fragment");
function Fs(l, t, e) {
  var a = null;
  if (e !== void 0 && (a = "" + e), t.key !== void 0 && (a = "" + t.key), "key" in t) {
    e = {};
    for (var u in t) u !== "key" && (e[u] = t[u]);
  } else e = t;
  return t = e.ref, { $$typeof: Pd, type: l, key: a, ref: t !== void 0 ? t : null, props: e };
}
pn.Fragment = lr;
pn.jsx = Fs;
pn.jsxs = Fs;
Ws.exports = pn;
var g = Ws.exports, Is = { exports: {} }, xn = {}, Ps = { exports: {} }, lo = {};
/**
* @license React
* scheduler.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
(function(l) {
  function t(z, _) {
    var C = z.length;
    z.push(_);
    l: for (; 0 < C; ) {
      var nl = C - 1 >>> 1, yl = z[nl];
      if (0 < u(yl, _)) z[nl] = _, z[C] = yl, C = nl;
      else break l;
    }
  }
  function e(z) {
    return z.length === 0 ? null : z[0];
  }
  function a(z) {
    if (z.length === 0) return null;
    var _ = z[0], C = z.pop();
    if (C !== _) {
      z[0] = C;
      l: for (var nl = 0, yl = z.length, ou = yl >>> 1; nl < ou; ) {
        var du = 2 * (nl + 1) - 1, Gn = z[du], ee = du + 1, ru = z[ee];
        if (0 > u(Gn, C)) ee < yl && 0 > u(ru, Gn) ? (z[nl] = ru, z[ee] = C, nl = ee) : (z[nl] = Gn, z[du] = C, nl = du);
        else if (ee < yl && 0 > u(ru, C)) z[nl] = ru, z[ee] = C, nl = ee;
        else break l;
      }
    }
    return _;
  }
  function u(z, _) {
    var C = z.sortIndex - _.sortIndex;
    return C !== 0 ? C : z.id - _.id;
  }
  if (l.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
    var n = performance;
    l.unstable_now = function() {
      return n.now();
    };
  } else {
    var i = Date, c = i.now();
    l.unstable_now = function() {
      return i.now() - c;
    };
  }
  var f = [], r = [], m = 1, h = null, d = 3, v = false, p = false, x = false, E = false, o = typeof setTimeout == "function" ? setTimeout : null, s = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
  function b(z) {
    for (var _ = e(r); _ !== null; ) {
      if (_.callback === null) a(r);
      else if (_.startTime <= z) a(r), _.sortIndex = _.expirationTime, t(f, _);
      else break;
      _ = e(r);
    }
  }
  function A(z) {
    if (x = false, b(z), !p) if (e(f) !== null) p = true, j || (j = true, q());
    else {
      var _ = e(r);
      _ !== null && tl(A, _.startTime - z);
    }
  }
  var j = false, T = -1, D = 5, O = -1;
  function M() {
    return E ? true : !(l.unstable_now() - O < D);
  }
  function ul() {
    if (E = false, j) {
      var z = l.unstable_now();
      O = z;
      var _ = true;
      try {
        l: {
          p = false, x && (x = false, s(T), T = -1), v = true;
          var C = d;
          try {
            t: {
              for (b(z), h = e(f); h !== null && !(h.expirationTime > z && M()); ) {
                var nl = h.callback;
                if (typeof nl == "function") {
                  h.callback = null, d = h.priorityLevel;
                  var yl = nl(h.expirationTime <= z);
                  if (z = l.unstable_now(), typeof yl == "function") {
                    h.callback = yl, b(z), _ = true;
                    break t;
                  }
                  h === e(f) && a(f), b(z);
                } else a(f);
                h = e(f);
              }
              if (h !== null) _ = true;
              else {
                var ou = e(r);
                ou !== null && tl(A, ou.startTime - z), _ = false;
              }
            }
            break l;
          } finally {
            h = null, d = C, v = false;
          }
          _ = void 0;
        }
      } finally {
        _ ? q() : j = false;
      }
    }
  }
  var q;
  if (typeof y == "function") q = function() {
    y(ul);
  };
  else if (typeof MessageChannel < "u") {
    var te = new MessageChannel(), Q = te.port2;
    te.port1.onmessage = ul, q = function() {
      Q.postMessage(null);
    };
  } else q = function() {
    o(ul, 0);
  };
  function tl(z, _) {
    T = o(function() {
      z(l.unstable_now());
    }, _);
  }
  l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(z) {
    z.callback = null;
  }, l.unstable_forceFrameRate = function(z) {
    0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < z ? Math.floor(1e3 / z) : 5;
  }, l.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, l.unstable_next = function(z) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var _ = 3;
        break;
      default:
        _ = d;
    }
    var C = d;
    d = _;
    try {
      return z();
    } finally {
      d = C;
    }
  }, l.unstable_requestPaint = function() {
    E = true;
  }, l.unstable_runWithPriority = function(z, _) {
    switch (z) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        z = 3;
    }
    var C = d;
    d = z;
    try {
      return _();
    } finally {
      d = C;
    }
  }, l.unstable_scheduleCallback = function(z, _, C) {
    var nl = l.unstable_now();
    switch (typeof C == "object" && C !== null ? (C = C.delay, C = typeof C == "number" && 0 < C ? nl + C : nl) : C = nl, z) {
      case 1:
        var yl = -1;
        break;
      case 2:
        yl = 250;
        break;
      case 5:
        yl = 1073741823;
        break;
      case 4:
        yl = 1e4;
        break;
      default:
        yl = 5e3;
    }
    return yl = C + yl, z = { id: m++, callback: _, priorityLevel: z, startTime: C, expirationTime: yl, sortIndex: -1 }, C > nl ? (z.sortIndex = C, t(r, z), e(f) === null && z === e(r) && (x ? (s(T), T = -1) : x = true, tl(A, C - nl))) : (z.sortIndex = yl, t(f, z), p || v || (p = true, j || (j = true, q()))), z;
  }, l.unstable_shouldYield = M, l.unstable_wrapCallback = function(z) {
    var _ = d;
    return function() {
      var C = d;
      d = _;
      try {
        return z.apply(this, arguments);
      } finally {
        d = C;
      }
    };
  };
})(lo);
Ps.exports = lo;
var tr = Ps.exports, to = { exports: {} }, U = {};
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var pc = Symbol.for("react.transitional.element"), er = Symbol.for("react.portal"), ar = Symbol.for("react.fragment"), ur = Symbol.for("react.strict_mode"), nr = Symbol.for("react.profiler"), ir = Symbol.for("react.consumer"), cr = Symbol.for("react.context"), fr = Symbol.for("react.forward_ref"), sr = Symbol.for("react.suspense"), or = Symbol.for("react.memo"), eo = Symbol.for("react.lazy"), dr = Symbol.for("react.activity"), zf = Symbol.iterator;
function rr(l) {
  return l === null || typeof l != "object" ? null : (l = zf && l[zf] || l["@@iterator"], typeof l == "function" ? l : null);
}
var ao = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, uo = Object.assign, no = {};
function ua(l, t, e) {
  this.props = l, this.context = t, this.refs = no, this.updater = e || ao;
}
ua.prototype.isReactComponent = {};
ua.prototype.setState = function(l, t) {
  if (typeof l != "object" && typeof l != "function" && l != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, l, t, "setState");
};
ua.prototype.forceUpdate = function(l) {
  this.updater.enqueueForceUpdate(this, l, "forceUpdate");
};
function io() {
}
io.prototype = ua.prototype;
function xc(l, t, e) {
  this.props = l, this.context = t, this.refs = no, this.updater = e || ao;
}
var zc = xc.prototype = new io();
zc.constructor = xc;
uo(zc, ua.prototype);
zc.isPureReactComponent = true;
var Tf = Array.isArray;
function Ei() {
}
var I = { H: null, A: null, T: null, S: null }, co = Object.prototype.hasOwnProperty;
function Tc(l, t, e) {
  var a = e.ref;
  return { $$typeof: pc, type: l, key: t, ref: a !== void 0 ? a : null, props: e };
}
function mr(l, t) {
  return Tc(l.type, t, l.props);
}
function Ec(l) {
  return typeof l == "object" && l !== null && l.$$typeof === pc;
}
function yr(l) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + l.replace(/[=:]/g, function(e) {
    return t[e];
  });
}
var Ef = /\/+/g;
function Qn(l, t) {
  return typeof l == "object" && l !== null && l.key != null ? yr("" + l.key) : t.toString(36);
}
function hr(l) {
  switch (l.status) {
    case "fulfilled":
      return l.value;
    case "rejected":
      throw l.reason;
    default:
      switch (typeof l.status == "string" ? l.then(Ei, Ei) : (l.status = "pending", l.then(function(t) {
        l.status === "pending" && (l.status = "fulfilled", l.value = t);
      }, function(t) {
        l.status === "pending" && (l.status = "rejected", l.reason = t);
      })), l.status) {
        case "fulfilled":
          return l.value;
        case "rejected":
          throw l.reason;
      }
  }
  throw l;
}
function Ae(l, t, e, a, u) {
  var n = typeof l;
  (n === "undefined" || n === "boolean") && (l = null);
  var i = false;
  if (l === null) i = true;
  else switch (n) {
    case "bigint":
    case "string":
    case "number":
      i = true;
      break;
    case "object":
      switch (l.$$typeof) {
        case pc:
        case er:
          i = true;
          break;
        case eo:
          return i = l._init, Ae(i(l._payload), t, e, a, u);
      }
  }
  if (i) return u = u(l), i = a === "" ? "." + Qn(l, 0) : a, Tf(u) ? (e = "", i != null && (e = i.replace(Ef, "$&/") + "/"), Ae(u, t, e, "", function(r) {
    return r;
  })) : u != null && (Ec(u) && (u = mr(u, e + (u.key == null || l && l.key === u.key ? "" : ("" + u.key).replace(Ef, "$&/") + "/") + i)), t.push(u)), 1;
  i = 0;
  var c = a === "" ? "." : a + ":";
  if (Tf(l)) for (var f = 0; f < l.length; f++) a = l[f], n = c + Qn(a, f), i += Ae(a, t, e, n, u);
  else if (f = rr(l), typeof f == "function") for (l = f.call(l), f = 0; !(a = l.next()).done; ) a = a.value, n = c + Qn(a, f++), i += Ae(a, t, e, n, u);
  else if (n === "object") {
    if (typeof l.then == "function") return Ae(hr(l), t, e, a, u);
    throw t = String(l), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  }
  return i;
}
function mu(l, t, e) {
  if (l == null) return l;
  var a = [], u = 0;
  return Ae(l, a, "", "", function(n) {
    return t.call(e, n, u++);
  }), a;
}
function vr(l) {
  if (l._status === -1) {
    var t = l._result;
    t = t(), t.then(function(e) {
      (l._status === 0 || l._status === -1) && (l._status = 1, l._result = e);
    }, function(e) {
      (l._status === 0 || l._status === -1) && (l._status = 2, l._result = e);
    }), l._status === -1 && (l._status = 0, l._result = t);
  }
  if (l._status === 1) return l._result.default;
  throw l._result;
}
var Af = typeof reportError == "function" ? reportError : function(l) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var t = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l), error: l });
    if (!window.dispatchEvent(t)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", l);
    return;
  }
  console.error(l);
}, gr = { map: mu, forEach: function(l, t, e) {
  mu(l, function() {
    t.apply(this, arguments);
  }, e);
}, count: function(l) {
  var t = 0;
  return mu(l, function() {
    t++;
  }), t;
}, toArray: function(l) {
  return mu(l, function(t) {
    return t;
  }) || [];
}, only: function(l) {
  if (!Ec(l)) throw Error("React.Children.only expected to receive a single React element child.");
  return l;
} };
U.Activity = dr;
U.Children = gr;
U.Component = ua;
U.Fragment = ar;
U.Profiler = nr;
U.PureComponent = xc;
U.StrictMode = ur;
U.Suspense = sr;
U.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = I;
U.__COMPILER_RUNTIME = { __proto__: null, c: function(l) {
  return I.H.useMemoCache(l);
} };
U.cache = function(l) {
  return function() {
    return l.apply(null, arguments);
  };
};
U.cacheSignal = function() {
  return null;
};
U.cloneElement = function(l, t, e) {
  if (l == null) throw Error("The argument must be a React element, but you passed " + l + ".");
  var a = uo({}, l.props), u = l.key;
  if (t != null) for (n in t.key !== void 0 && (u = "" + t.key), t) !co.call(t, n) || n === "key" || n === "__self" || n === "__source" || n === "ref" && t.ref === void 0 || (a[n] = t[n]);
  var n = arguments.length - 2;
  if (n === 1) a.children = e;
  else if (1 < n) {
    for (var i = Array(n), c = 0; c < n; c++) i[c] = arguments[c + 2];
    a.children = i;
  }
  return Tc(l.type, u, a);
};
U.createContext = function(l) {
  return l = { $$typeof: cr, _currentValue: l, _currentValue2: l, _threadCount: 0, Provider: null, Consumer: null }, l.Provider = l, l.Consumer = { $$typeof: ir, _context: l }, l;
};
U.createElement = function(l, t, e) {
  var a, u = {}, n = null;
  if (t != null) for (a in t.key !== void 0 && (n = "" + t.key), t) co.call(t, a) && a !== "key" && a !== "__self" && a !== "__source" && (u[a] = t[a]);
  var i = arguments.length - 2;
  if (i === 1) u.children = e;
  else if (1 < i) {
    for (var c = Array(i), f = 0; f < i; f++) c[f] = arguments[f + 2];
    u.children = c;
  }
  if (l && l.defaultProps) for (a in i = l.defaultProps, i) u[a] === void 0 && (u[a] = i[a]);
  return Tc(l, n, u);
};
U.createRef = function() {
  return { current: null };
};
U.forwardRef = function(l) {
  return { $$typeof: fr, render: l };
};
U.isValidElement = Ec;
U.lazy = function(l) {
  return { $$typeof: eo, _payload: { _status: -1, _result: l }, _init: vr };
};
U.memo = function(l, t) {
  return { $$typeof: or, type: l, compare: t === void 0 ? null : t };
};
U.startTransition = function(l) {
  var t = I.T, e = {};
  I.T = e;
  try {
    var a = l(), u = I.S;
    u !== null && u(e, a), typeof a == "object" && a !== null && typeof a.then == "function" && a.then(Ei, Af);
  } catch (n) {
    Af(n);
  } finally {
    t !== null && e.types !== null && (t.types = e.types), I.T = t;
  }
};
U.unstable_useCacheRefresh = function() {
  return I.H.useCacheRefresh();
};
U.use = function(l) {
  return I.H.use(l);
};
U.useActionState = function(l, t, e) {
  return I.H.useActionState(l, t, e);
};
U.useCallback = function(l, t) {
  return I.H.useCallback(l, t);
};
U.useContext = function(l) {
  return I.H.useContext(l);
};
U.useDebugValue = function() {
};
U.useDeferredValue = function(l, t) {
  return I.H.useDeferredValue(l, t);
};
U.useEffect = function(l, t) {
  return I.H.useEffect(l, t);
};
U.useEffectEvent = function(l) {
  return I.H.useEffectEvent(l);
};
U.useId = function() {
  return I.H.useId();
};
U.useImperativeHandle = function(l, t, e) {
  return I.H.useImperativeHandle(l, t, e);
};
U.useInsertionEffect = function(l, t) {
  return I.H.useInsertionEffect(l, t);
};
U.useLayoutEffect = function(l, t) {
  return I.H.useLayoutEffect(l, t);
};
U.useMemo = function(l, t) {
  return I.H.useMemo(l, t);
};
U.useOptimistic = function(l, t) {
  return I.H.useOptimistic(l, t);
};
U.useReducer = function(l, t, e) {
  return I.H.useReducer(l, t, e);
};
U.useRef = function(l) {
  return I.H.useRef(l);
};
U.useState = function(l) {
  return I.H.useState(l);
};
U.useSyncExternalStore = function(l, t, e) {
  return I.H.useSyncExternalStore(l, t, e);
};
U.useTransition = function() {
  return I.H.useTransition();
};
U.version = "19.2.3";
to.exports = U;
var V = to.exports, fo = { exports: {} }, Al = {};
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var br = V;
function so(l) {
  var t = "https://react.dev/errors/" + l;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var e = 2; e < arguments.length; e++) t += "&args[]=" + encodeURIComponent(arguments[e]);
  }
  return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function Nt() {
}
var El = { d: { f: Nt, r: function() {
  throw Error(so(522));
}, D: Nt, C: Nt, L: Nt, m: Nt, X: Nt, S: Nt, M: Nt }, p: 0, findDOMNode: null }, Sr = Symbol.for("react.portal");
function pr(l, t, e) {
  var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Sr, key: a == null ? null : "" + a, children: l, containerInfo: t, implementation: e };
}
var Ea = br.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function zn(l, t) {
  if (l === "font") return "";
  if (typeof t == "string") return t === "use-credentials" ? t : "";
}
Al.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = El;
Al.createPortal = function(l, t) {
  var e = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(so(299));
  return pr(l, t, null, e);
};
Al.flushSync = function(l) {
  var t = Ea.T, e = El.p;
  try {
    if (Ea.T = null, El.p = 2, l) return l();
  } finally {
    Ea.T = t, El.p = e, El.d.f();
  }
};
Al.preconnect = function(l, t) {
  typeof l == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, El.d.C(l, t));
};
Al.prefetchDNS = function(l) {
  typeof l == "string" && El.d.D(l);
};
Al.preinit = function(l, t) {
  if (typeof l == "string" && t && typeof t.as == "string") {
    var e = t.as, a = zn(e, t.crossOrigin), u = typeof t.integrity == "string" ? t.integrity : void 0, n = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
    e === "style" ? El.d.S(l, typeof t.precedence == "string" ? t.precedence : void 0, { crossOrigin: a, integrity: u, fetchPriority: n }) : e === "script" && El.d.X(l, { crossOrigin: a, integrity: u, fetchPriority: n, nonce: typeof t.nonce == "string" ? t.nonce : void 0 });
  }
};
Al.preinitModule = function(l, t) {
  if (typeof l == "string") if (typeof t == "object" && t !== null) {
    if (t.as == null || t.as === "script") {
      var e = zn(t.as, t.crossOrigin);
      El.d.M(l, { crossOrigin: e, integrity: typeof t.integrity == "string" ? t.integrity : void 0, nonce: typeof t.nonce == "string" ? t.nonce : void 0 });
    }
  } else t == null && El.d.M(l);
};
Al.preload = function(l, t) {
  if (typeof l == "string" && typeof t == "object" && t !== null && typeof t.as == "string") {
    var e = t.as, a = zn(e, t.crossOrigin);
    El.d.L(l, e, { crossOrigin: a, integrity: typeof t.integrity == "string" ? t.integrity : void 0, nonce: typeof t.nonce == "string" ? t.nonce : void 0, type: typeof t.type == "string" ? t.type : void 0, fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0, referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0, imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0, imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0, media: typeof t.media == "string" ? t.media : void 0 });
  }
};
Al.preloadModule = function(l, t) {
  if (typeof l == "string") if (t) {
    var e = zn(t.as, t.crossOrigin);
    El.d.m(l, { as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0, crossOrigin: e, integrity: typeof t.integrity == "string" ? t.integrity : void 0 });
  } else El.d.m(l);
};
Al.requestFormReset = function(l) {
  El.d.r(l);
};
Al.unstable_batchedUpdates = function(l, t) {
  return l(t);
};
Al.useFormState = function(l, t, e) {
  return Ea.H.useFormState(l, t, e);
};
Al.useFormStatus = function() {
  return Ea.H.useHostTransitionStatus();
};
Al.version = "19.2.3";
function oo() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(oo);
  } catch (l) {
    console.error(l);
  }
}
oo(), fo.exports = Al;
var xr = fo.exports;
/**
* @license React
* react-dom-client.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var ml = tr, ro = V, zr = xr;
function S(l) {
  var t = "https://react.dev/errors/" + l;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var e = 2; e < arguments.length; e++) t += "&args[]=" + encodeURIComponent(arguments[e]);
  }
  return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function mo(l) {
  return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
}
function Ia(l) {
  var t = l, e = l;
  if (l.alternate) for (; t.return; ) t = t.return;
  else {
    l = t;
    do
      t = l, t.flags & 4098 && (e = t.return), l = t.return;
    while (l);
  }
  return t.tag === 3 ? e : null;
}
function yo(l) {
  if (l.tag === 13) {
    var t = l.memoizedState;
    if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function ho(l) {
  if (l.tag === 31) {
    var t = l.memoizedState;
    if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function _f(l) {
  if (Ia(l) !== l) throw Error(S(188));
}
function Tr(l) {
  var t = l.alternate;
  if (!t) {
    if (t = Ia(l), t === null) throw Error(S(188));
    return t !== l ? null : l;
  }
  for (var e = l, a = t; ; ) {
    var u = e.return;
    if (u === null) break;
    var n = u.alternate;
    if (n === null) {
      if (a = u.return, a !== null) {
        e = a;
        continue;
      }
      break;
    }
    if (u.child === n.child) {
      for (n = u.child; n; ) {
        if (n === e) return _f(u), l;
        if (n === a) return _f(u), t;
        n = n.sibling;
      }
      throw Error(S(188));
    }
    if (e.return !== a.return) e = u, a = n;
    else {
      for (var i = false, c = u.child; c; ) {
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
      if (!i) {
        for (c = n.child; c; ) {
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
        if (!i) throw Error(S(189));
      }
    }
    if (e.alternate !== a) throw Error(S(190));
  }
  if (e.tag !== 3) throw Error(S(188));
  return e.stateNode.current === e ? l : t;
}
function vo(l) {
  var t = l.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return l;
  for (l = l.child; l !== null; ) {
    if (t = vo(l), t !== null) return t;
    l = l.sibling;
  }
  return null;
}
var P = Object.assign, Er = Symbol.for("react.element"), yu = Symbol.for("react.transitional.element"), Sa = Symbol.for("react.portal"), Ne = Symbol.for("react.fragment"), go = Symbol.for("react.strict_mode"), Ai = Symbol.for("react.profiler"), bo = Symbol.for("react.consumer"), vt = Symbol.for("react.context"), Ac = Symbol.for("react.forward_ref"), _i = Symbol.for("react.suspense"), Di = Symbol.for("react.suspense_list"), _c = Symbol.for("react.memo"), Ot = Symbol.for("react.lazy"), Ni = Symbol.for("react.activity"), Ar = Symbol.for("react.memo_cache_sentinel"), Df = Symbol.iterator;
function ra(l) {
  return l === null || typeof l != "object" ? null : (l = Df && l[Df] || l["@@iterator"], typeof l == "function" ? l : null);
}
var _r = Symbol.for("react.client.reference");
function Oi(l) {
  if (l == null) return null;
  if (typeof l == "function") return l.$$typeof === _r ? null : l.displayName || l.name || null;
  if (typeof l == "string") return l;
  switch (l) {
    case Ne:
      return "Fragment";
    case Ai:
      return "Profiler";
    case go:
      return "StrictMode";
    case _i:
      return "Suspense";
    case Di:
      return "SuspenseList";
    case Ni:
      return "Activity";
  }
  if (typeof l == "object") switch (l.$$typeof) {
    case Sa:
      return "Portal";
    case vt:
      return l.displayName || "Context";
    case bo:
      return (l._context.displayName || "Context") + ".Consumer";
    case Ac:
      var t = l.render;
      return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
    case _c:
      return t = l.displayName || null, t !== null ? t : Oi(l.type) || "Memo";
    case Ot:
      t = l._payload, l = l._init;
      try {
        return Oi(l(t));
      } catch {
      }
  }
  return null;
}
var pa = Array.isArray, N = ro.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = zr.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, fe = { pending: false, data: null, method: null, action: null }, Mi = [], Oe = -1;
function ct(l) {
  return { current: l };
}
function gl(l) {
  0 > Oe || (l.current = Mi[Oe], Mi[Oe] = null, Oe--);
}
function $(l, t) {
  Oe++, Mi[Oe] = l.current, l.current = t;
}
var it = ct(null), qa = ct(null), Qt = ct(null), Vu = ct(null);
function Ku(l, t) {
  switch ($(Qt, t), $(qa, l), $(it, null), t.nodeType) {
    case 9:
    case 11:
      l = (l = t.documentElement) && (l = l.namespaceURI) ? Hs(l) : 0;
      break;
    default:
      if (l = t.tagName, t = t.namespaceURI) t = Hs(t), l = qd(t, l);
      else switch (l) {
        case "svg":
          l = 1;
          break;
        case "math":
          l = 2;
          break;
        default:
          l = 0;
      }
  }
  gl(it), $(it, l);
}
function we() {
  gl(it), gl(qa), gl(Qt);
}
function ji(l) {
  l.memoizedState !== null && $(Vu, l);
  var t = it.current, e = qd(t, l.type);
  t !== e && ($(qa, l), $(it, e));
}
function Ju(l) {
  qa.current === l && (gl(it), gl(qa)), Vu.current === l && (gl(Vu), $a._currentValue = fe);
}
var Xn, Nf;
function ue(l) {
  if (Xn === void 0) try {
    throw Error();
  } catch (e) {
    var t = e.stack.trim().match(/\n( *(at )?)/);
    Xn = t && t[1] || "", Nf = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
  }
  return `
` + Xn + l + Nf;
}
var Zn = false;
function Ln(l, t) {
  if (!l || Zn) return "";
  Zn = true;
  var e = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var a = { DetermineComponentFrameRoot: function() {
      try {
        if (t) {
          var h = function() {
            throw Error();
          };
          if (Object.defineProperty(h.prototype, "props", { set: function() {
            throw Error();
          } }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(h, []);
            } catch (v) {
              var d = v;
            }
            Reflect.construct(l, [], h);
          } else {
            try {
              h.call();
            } catch (v) {
              d = v;
            }
            l.call(h.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (v) {
            d = v;
          }
          (h = l()) && typeof h.catch == "function" && h.catch(function() {
          });
        }
      } catch (v) {
        if (v && d && typeof v.stack == "string") return [v.stack, d.stack];
      }
      return [null, null];
    } };
    a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var u = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
    u && u.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
    var n = a.DetermineComponentFrameRoot(), i = n[0], c = n[1];
    if (i && c) {
      var f = i.split(`
`), r = c.split(`
`);
      for (u = a = 0; a < f.length && !f[a].includes("DetermineComponentFrameRoot"); ) a++;
      for (; u < r.length && !r[u].includes("DetermineComponentFrameRoot"); ) u++;
      if (a === f.length || u === r.length) for (a = f.length - 1, u = r.length - 1; 1 <= a && 0 <= u && f[a] !== r[u]; ) u--;
      for (; 1 <= a && 0 <= u; a--, u--) if (f[a] !== r[u]) {
        if (a !== 1 || u !== 1) do
          if (a--, u--, 0 > u || f[a] !== r[u]) {
            var m = `
` + f[a].replace(" at new ", " at ");
            return l.displayName && m.includes("<anonymous>") && (m = m.replace("<anonymous>", l.displayName)), m;
          }
        while (1 <= a && 0 <= u);
        break;
      }
    }
  } finally {
    Zn = false, Error.prepareStackTrace = e;
  }
  return (e = l ? l.displayName || l.name : "") ? ue(e) : "";
}
function Dr(l, t) {
  switch (l.tag) {
    case 26:
    case 27:
    case 5:
      return ue(l.type);
    case 16:
      return ue("Lazy");
    case 13:
      return l.child !== t && t !== null ? ue("Suspense Fallback") : ue("Suspense");
    case 19:
      return ue("SuspenseList");
    case 0:
    case 15:
      return Ln(l.type, false);
    case 11:
      return Ln(l.type.render, false);
    case 1:
      return Ln(l.type, true);
    case 31:
      return ue("Activity");
    default:
      return "";
  }
}
function Of(l) {
  try {
    var t = "", e = null;
    do
      t += Dr(l, e), e = l, l = l.return;
    while (l);
    return t;
  } catch (a) {
    return `
Error generating stack: ` + a.message + `
` + a.stack;
  }
}
var Ui = Object.prototype.hasOwnProperty, Dc = ml.unstable_scheduleCallback, Vn = ml.unstable_cancelCallback, Nr = ml.unstable_shouldYield, Or = ml.unstable_requestPaint, Yl = ml.unstable_now, Mr = ml.unstable_getCurrentPriorityLevel, So = ml.unstable_ImmediatePriority, po = ml.unstable_UserBlockingPriority, wu = ml.unstable_NormalPriority, jr = ml.unstable_LowPriority, xo = ml.unstable_IdlePriority, Ur = ml.log, Hr = ml.unstable_setDisableYieldValue, Pa = null, ql = null;
function Bt(l) {
  if (typeof Ur == "function" && Hr(l), ql && typeof ql.setStrictMode == "function") try {
    ql.setStrictMode(Pa, l);
  } catch {
  }
}
var Gl = Math.clz32 ? Math.clz32 : Rr, Cr = Math.log, Br = Math.LN2;
function Rr(l) {
  return l >>>= 0, l === 0 ? 32 : 31 - (Cr(l) / Br | 0) | 0;
}
var hu = 256, vu = 262144, gu = 4194304;
function ne(l) {
  var t = l & 42;
  if (t !== 0) return t;
  switch (l & -l) {
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
      return l & 261888;
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return l & 3932160;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return l & 62914560;
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
      return l;
  }
}
function Tn(l, t, e) {
  var a = l.pendingLanes;
  if (a === 0) return 0;
  var u = 0, n = l.suspendedLanes, i = l.pingedLanes;
  l = l.warmLanes;
  var c = a & 134217727;
  return c !== 0 ? (a = c & ~n, a !== 0 ? u = ne(a) : (i &= c, i !== 0 ? u = ne(i) : e || (e = c & ~l, e !== 0 && (u = ne(e))))) : (c = a & ~n, c !== 0 ? u = ne(c) : i !== 0 ? u = ne(i) : e || (e = a & ~l, e !== 0 && (u = ne(e)))), u === 0 ? 0 : t !== 0 && t !== u && !(t & n) && (n = u & -u, e = t & -t, n >= e || n === 32 && (e & 4194048) !== 0) ? t : u;
}
function lu(l, t) {
  return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
}
function Yr(l, t) {
  switch (l) {
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
function zo() {
  var l = gu;
  return gu <<= 1, !(gu & 62914560) && (gu = 4194304), l;
}
function Kn(l) {
  for (var t = [], e = 0; 31 > e; e++) t.push(l);
  return t;
}
function tu(l, t) {
  l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
}
function qr(l, t, e, a, u, n) {
  var i = l.pendingLanes;
  l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
  var c = l.entanglements, f = l.expirationTimes, r = l.hiddenUpdates;
  for (e = i & ~e; 0 < e; ) {
    var m = 31 - Gl(e), h = 1 << m;
    c[m] = 0, f[m] = -1;
    var d = r[m];
    if (d !== null) for (r[m] = null, m = 0; m < d.length; m++) {
      var v = d[m];
      v !== null && (v.lane &= -536870913);
    }
    e &= ~h;
  }
  a !== 0 && To(l, a, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(i & ~t));
}
function To(l, t, e) {
  l.pendingLanes |= t, l.suspendedLanes &= ~t;
  var a = 31 - Gl(t);
  l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
}
function Eo(l, t) {
  var e = l.entangledLanes |= t;
  for (l = l.entanglements; e; ) {
    var a = 31 - Gl(e), u = 1 << a;
    u & t | l[a] & t && (l[a] |= t), e &= ~u;
  }
}
function Ao(l, t) {
  var e = t & -t;
  return e = e & 42 ? 1 : Nc(e), e & (l.suspendedLanes | t) ? 0 : e;
}
function Nc(l) {
  switch (l) {
    case 2:
      l = 1;
      break;
    case 8:
      l = 4;
      break;
    case 32:
      l = 16;
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
      l = 128;
      break;
    case 268435456:
      l = 134217728;
      break;
    default:
      l = 0;
  }
  return l;
}
function Oc(l) {
  return l &= -l, 2 < l ? 8 < l ? l & 134217727 ? 32 : 268435456 : 8 : 2;
}
function _o() {
  var l = Z.p;
  return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : $d(l.type));
}
function Mf(l, t) {
  var e = Z.p;
  try {
    return Z.p = l, t();
  } finally {
    Z.p = e;
  }
}
var Pt = Math.random().toString(36).slice(2), Sl = "__reactFiber$" + Pt, jl = "__reactProps$" + Pt, na = "__reactContainer$" + Pt, Hi = "__reactEvents$" + Pt, Gr = "__reactListeners$" + Pt, Qr = "__reactHandles$" + Pt, jf = "__reactResources$" + Pt, eu = "__reactMarker$" + Pt;
function Mc(l) {
  delete l[Sl], delete l[jl], delete l[Hi], delete l[Gr], delete l[Qr];
}
function Me(l) {
  var t = l[Sl];
  if (t) return t;
  for (var e = l.parentNode; e; ) {
    if (t = e[na] || e[Sl]) {
      if (e = t.alternate, t.child !== null || e !== null && e.child !== null) for (l = qs(l); l !== null; ) {
        if (e = l[Sl]) return e;
        l = qs(l);
      }
      return t;
    }
    l = e, e = l.parentNode;
  }
  return null;
}
function ia(l) {
  if (l = l[Sl] || l[na]) {
    var t = l.tag;
    if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return l;
  }
  return null;
}
function xa(l) {
  var t = l.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
  throw Error(S(33));
}
function Qe(l) {
  var t = l[jf];
  return t || (t = l[jf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
}
function vl(l) {
  l[eu] = true;
}
var Do = /* @__PURE__ */ new Set(), No = {};
function be(l, t) {
  ke(l, t), ke(l + "Capture", t);
}
function ke(l, t) {
  for (No[l] = t, l = 0; l < t.length; l++) Do.add(t[l]);
}
var Xr = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Uf = {}, Hf = {};
function Zr(l) {
  return Ui.call(Hf, l) ? true : Ui.call(Uf, l) ? false : Xr.test(l) ? Hf[l] = true : (Uf[l] = true, false);
}
function Ou(l, t, e) {
  if (Zr(t)) if (e === null) l.removeAttribute(t);
  else {
    switch (typeof e) {
      case "undefined":
      case "function":
      case "symbol":
        l.removeAttribute(t);
        return;
      case "boolean":
        var a = t.toLowerCase().slice(0, 5);
        if (a !== "data-" && a !== "aria-") {
          l.removeAttribute(t);
          return;
        }
    }
    l.setAttribute(t, "" + e);
  }
}
function bu(l, t, e) {
  if (e === null) l.removeAttribute(t);
  else {
    switch (typeof e) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(t);
        return;
    }
    l.setAttribute(t, "" + e);
  }
}
function st(l, t, e, a) {
  if (a === null) l.removeAttribute(e);
  else {
    switch (typeof a) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(e);
        return;
    }
    l.setAttributeNS(t, e, "" + a);
  }
}
function Vl(l) {
  switch (typeof l) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return l;
    case "object":
      return l;
    default:
      return "";
  }
}
function Oo(l) {
  var t = l.type;
  return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Lr(l, t, e) {
  var a = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
  if (!l.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
    var u = a.get, n = a.set;
    return Object.defineProperty(l, t, { configurable: true, get: function() {
      return u.call(this);
    }, set: function(i) {
      e = "" + i, n.call(this, i);
    } }), Object.defineProperty(l, t, { enumerable: a.enumerable }), { getValue: function() {
      return e;
    }, setValue: function(i) {
      e = "" + i;
    }, stopTracking: function() {
      l._valueTracker = null, delete l[t];
    } };
  }
}
function Ci(l) {
  if (!l._valueTracker) {
    var t = Oo(l) ? "checked" : "value";
    l._valueTracker = Lr(l, t, "" + l[t]);
  }
}
function Mo(l) {
  if (!l) return false;
  var t = l._valueTracker;
  if (!t) return true;
  var e = t.getValue(), a = "";
  return l && (a = Oo(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), true) : false;
}
function ku(l) {
  if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
  try {
    return l.activeElement || l.body;
  } catch {
    return l.body;
  }
}
var Vr = /[\n"\\]/g;
function wl(l) {
  return l.replace(Vr, function(t) {
    return "\\" + t.charCodeAt(0).toString(16) + " ";
  });
}
function Bi(l, t, e, a, u, n, i, c) {
  l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + Vl(t)) : l.value !== "" + Vl(t) && (l.value = "" + Vl(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? Ri(l, i, Vl(t)) : e != null ? Ri(l, i, Vl(e)) : a != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + Vl(c) : l.removeAttribute("name");
}
function jo(l, t, e, a, u, n, i, c) {
  if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || e != null) {
    if (!(n !== "submit" && n !== "reset" || t != null)) {
      Ci(l);
      return;
    }
    e = e != null ? "" + Vl(e) : "", t = t != null ? "" + Vl(t) : e, c || t === l.value || (l.value = t), l.defaultValue = t;
  }
  a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), Ci(l);
}
function Ri(l, t, e) {
  t === "number" && ku(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
}
function Xe(l, t, e, a) {
  if (l = l.options, t) {
    t = {};
    for (var u = 0; u < e.length; u++) t["$" + e[u]] = true;
    for (e = 0; e < l.length; e++) u = t.hasOwnProperty("$" + l[e].value), l[e].selected !== u && (l[e].selected = u), u && a && (l[e].defaultSelected = true);
  } else {
    for (e = "" + Vl(e), t = null, u = 0; u < l.length; u++) {
      if (l[u].value === e) {
        l[u].selected = true, a && (l[u].defaultSelected = true);
        return;
      }
      t !== null || l[u].disabled || (t = l[u]);
    }
    t !== null && (t.selected = true);
  }
}
function Uo(l, t, e) {
  if (t != null && (t = "" + Vl(t), t !== l.value && (l.value = t), e == null)) {
    l.defaultValue !== t && (l.defaultValue = t);
    return;
  }
  l.defaultValue = e != null ? "" + Vl(e) : "";
}
function Ho(l, t, e, a) {
  if (t == null) {
    if (a != null) {
      if (e != null) throw Error(S(92));
      if (pa(a)) {
        if (1 < a.length) throw Error(S(93));
        a = a[0];
      }
      e = a;
    }
    e == null && (e = ""), t = e;
  }
  e = Vl(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), Ci(l);
}
function $e(l, t) {
  if (t) {
    var e = l.firstChild;
    if (e && e === l.lastChild && e.nodeType === 3) {
      e.nodeValue = t;
      return;
    }
  }
  l.textContent = t;
}
var Kr = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
function Cf(l, t, e) {
  var a = t.indexOf("--") === 0;
  e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || Kr.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
}
function Co(l, t, e) {
  if (t != null && typeof t != "object") throw Error(S(62));
  if (l = l.style, e != null) {
    for (var a in e) !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
    for (var u in t) a = t[u], t.hasOwnProperty(u) && e[u] !== a && Cf(l, u, a);
  } else for (var n in t) t.hasOwnProperty(n) && Cf(l, n, t[n]);
}
function jc(l) {
  if (l.indexOf("-") === -1) return false;
  switch (l) {
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
var Jr = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), wr = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function Mu(l) {
  return wr.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
}
function gt() {
}
var Yi = null;
function Uc(l) {
  return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
}
var je = null, Ze = null;
function Bf(l) {
  var t = ia(l);
  if (t && (l = t.stateNode)) {
    var e = l[jl] || null;
    l: switch (l = t.stateNode, t.type) {
      case "input":
        if (Bi(l, e.value, e.defaultValue, e.defaultValue, e.checked, e.defaultChecked, e.type, e.name), t = e.name, e.type === "radio" && t != null) {
          for (e = l; e.parentNode; ) e = e.parentNode;
          for (e = e.querySelectorAll('input[name="' + wl("" + t) + '"][type="radio"]'), t = 0; t < e.length; t++) {
            var a = e[t];
            if (a !== l && a.form === l.form) {
              var u = a[jl] || null;
              if (!u) throw Error(S(90));
              Bi(a, u.value, u.defaultValue, u.defaultValue, u.checked, u.defaultChecked, u.type, u.name);
            }
          }
          for (t = 0; t < e.length; t++) a = e[t], a.form === l.form && Mo(a);
        }
        break l;
      case "textarea":
        Uo(l, e.value, e.defaultValue);
        break l;
      case "select":
        t = e.value, t != null && Xe(l, !!e.multiple, t, false);
    }
  }
}
var Jn = false;
function Bo(l, t, e) {
  if (Jn) return l(t, e);
  Jn = true;
  try {
    var a = l(t);
    return a;
  } finally {
    if (Jn = false, (je !== null || Ze !== null) && (Bn(), je && (t = je, l = Ze, Ze = je = null, Bf(t), l))) for (t = 0; t < l.length; t++) Bf(l[t]);
  }
}
function Ga(l, t) {
  var e = l.stateNode;
  if (e === null) return null;
  var a = e[jl] || null;
  if (a === null) return null;
  e = a[t];
  l: switch (t) {
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
      (a = !a.disabled) || (l = l.type, a = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !a;
      break l;
    default:
      l = false;
  }
  if (l) return null;
  if (e && typeof e != "function") throw Error(S(231, t, typeof e));
  return e;
}
var zt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), qi = false;
if (zt) try {
  var ma = {};
  Object.defineProperty(ma, "passive", { get: function() {
    qi = true;
  } }), window.addEventListener("test", ma, ma), window.removeEventListener("test", ma, ma);
} catch {
  qi = false;
}
var Rt = null, Hc = null, ju = null;
function Ro() {
  if (ju) return ju;
  var l, t = Hc, e = t.length, a, u = "value" in Rt ? Rt.value : Rt.textContent, n = u.length;
  for (l = 0; l < e && t[l] === u[l]; l++) ;
  var i = e - l;
  for (a = 1; a <= i && t[e - a] === u[n - a]; a++) ;
  return ju = u.slice(l, 1 < a ? 1 - a : void 0);
}
function Uu(l) {
  var t = l.keyCode;
  return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
}
function Su() {
  return true;
}
function Rf() {
  return false;
}
function Ul(l) {
  function t(e, a, u, n, i) {
    this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
    for (var c in l) l.hasOwnProperty(c) && (e = l[c], this[c] = e ? e(n) : n[c]);
    return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === false) ? Su : Rf, this.isPropagationStopped = Rf, this;
  }
  return P(t.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var e = this.nativeEvent;
    e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = false), this.isDefaultPrevented = Su);
  }, stopPropagation: function() {
    var e = this.nativeEvent;
    e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = true), this.isPropagationStopped = Su);
  }, persist: function() {
  }, isPersistent: Su }), t;
}
var Se = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(l) {
  return l.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, En = Ul(Se), au = P({}, Se, { view: 0, detail: 0 }), kr = Ul(au), wn, kn, ya, An = P({}, au, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Cc, button: 0, buttons: 0, relatedTarget: function(l) {
  return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
}, movementX: function(l) {
  return "movementX" in l ? l.movementX : (l !== ya && (ya && l.type === "mousemove" ? (wn = l.screenX - ya.screenX, kn = l.screenY - ya.screenY) : kn = wn = 0, ya = l), wn);
}, movementY: function(l) {
  return "movementY" in l ? l.movementY : kn;
} }), Yf = Ul(An), $r = P({}, An, { dataTransfer: 0 }), Wr = Ul($r), Fr = P({}, au, { relatedTarget: 0 }), $n = Ul(Fr), Ir = P({}, Se, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Pr = Ul(Ir), lm = P({}, Se, { clipboardData: function(l) {
  return "clipboardData" in l ? l.clipboardData : window.clipboardData;
} }), tm = Ul(lm), em = P({}, Se, { data: 0 }), qf = Ul(em), am = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, um = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, nm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function im(l) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(l) : (l = nm[l]) ? !!t[l] : false;
}
function Cc() {
  return im;
}
var cm = P({}, au, { key: function(l) {
  if (l.key) {
    var t = am[l.key] || l.key;
    if (t !== "Unidentified") return t;
  }
  return l.type === "keypress" ? (l = Uu(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? um[l.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Cc, charCode: function(l) {
  return l.type === "keypress" ? Uu(l) : 0;
}, keyCode: function(l) {
  return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
}, which: function(l) {
  return l.type === "keypress" ? Uu(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
} }), fm = Ul(cm), sm = P({}, An, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Gf = Ul(sm), om = P({}, au, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Cc }), dm = Ul(om), rm = P({}, Se, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), mm = Ul(rm), ym = P({}, An, { deltaX: function(l) {
  return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
}, deltaY: function(l) {
  return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
}, deltaZ: 0, deltaMode: 0 }), hm = Ul(ym), vm = P({}, Se, { newState: 0, oldState: 0 }), gm = Ul(vm), bm = [9, 13, 27, 32], Bc = zt && "CompositionEvent" in window, Aa = null;
zt && "documentMode" in document && (Aa = document.documentMode);
var Sm = zt && "TextEvent" in window && !Aa, Yo = zt && (!Bc || Aa && 8 < Aa && 11 >= Aa), Qf = " ", Xf = false;
function qo(l, t) {
  switch (l) {
    case "keyup":
      return bm.indexOf(t.keyCode) !== -1;
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
function Go(l) {
  return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
}
var Ue = false;
function pm(l, t) {
  switch (l) {
    case "compositionend":
      return Go(t);
    case "keypress":
      return t.which !== 32 ? null : (Xf = true, Qf);
    case "textInput":
      return l = t.data, l === Qf && Xf ? null : l;
    default:
      return null;
  }
}
function xm(l, t) {
  if (Ue) return l === "compositionend" || !Bc && qo(l, t) ? (l = Ro(), ju = Hc = Rt = null, Ue = false, l) : null;
  switch (l) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Yo && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var zm = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function Zf(l) {
  var t = l && l.nodeName && l.nodeName.toLowerCase();
  return t === "input" ? !!zm[l.type] : t === "textarea";
}
function Qo(l, t, e, a) {
  je ? Ze ? Ze.push(a) : Ze = [a] : je = a, t = mn(t, "onChange"), 0 < t.length && (e = new En("onChange", "change", null, e, a), l.push({ event: e, listeners: t }));
}
var _a = null, Qa = null;
function Tm(l) {
  Bd(l, 0);
}
function _n(l) {
  var t = xa(l);
  if (Mo(t)) return l;
}
function Lf(l, t) {
  if (l === "change") return t;
}
var Xo = false;
if (zt) {
  var Wn;
  if (zt) {
    var Fn = "oninput" in document;
    if (!Fn) {
      var Vf = document.createElement("div");
      Vf.setAttribute("oninput", "return;"), Fn = typeof Vf.oninput == "function";
    }
    Wn = Fn;
  } else Wn = false;
  Xo = Wn && (!document.documentMode || 9 < document.documentMode);
}
function Kf() {
  _a && (_a.detachEvent("onpropertychange", Zo), Qa = _a = null);
}
function Zo(l) {
  if (l.propertyName === "value" && _n(Qa)) {
    var t = [];
    Qo(t, Qa, l, Uc(l)), Bo(Tm, t);
  }
}
function Em(l, t, e) {
  l === "focusin" ? (Kf(), _a = t, Qa = e, _a.attachEvent("onpropertychange", Zo)) : l === "focusout" && Kf();
}
function Am(l) {
  if (l === "selectionchange" || l === "keyup" || l === "keydown") return _n(Qa);
}
function _m(l, t) {
  if (l === "click") return _n(t);
}
function Dm(l, t) {
  if (l === "input" || l === "change") return _n(t);
}
function Nm(l, t) {
  return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
}
var Xl = typeof Object.is == "function" ? Object.is : Nm;
function Xa(l, t) {
  if (Xl(l, t)) return true;
  if (typeof l != "object" || l === null || typeof t != "object" || t === null) return false;
  var e = Object.keys(l), a = Object.keys(t);
  if (e.length !== a.length) return false;
  for (a = 0; a < e.length; a++) {
    var u = e[a];
    if (!Ui.call(t, u) || !Xl(l[u], t[u])) return false;
  }
  return true;
}
function Jf(l) {
  for (; l && l.firstChild; ) l = l.firstChild;
  return l;
}
function wf(l, t) {
  var e = Jf(l);
  l = 0;
  for (var a; e; ) {
    if (e.nodeType === 3) {
      if (a = l + e.textContent.length, l <= t && a >= t) return { node: e, offset: t - l };
      l = a;
    }
    l: {
      for (; e; ) {
        if (e.nextSibling) {
          e = e.nextSibling;
          break l;
        }
        e = e.parentNode;
      }
      e = void 0;
    }
    e = Jf(e);
  }
}
function Lo(l, t) {
  return l && t ? l === t ? true : l && l.nodeType === 3 ? false : t && t.nodeType === 3 ? Lo(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : false : false;
}
function Vo(l) {
  l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
  for (var t = ku(l.document); t instanceof l.HTMLIFrameElement; ) {
    try {
      var e = typeof t.contentWindow.location.href == "string";
    } catch {
      e = false;
    }
    if (e) l = t.contentWindow;
    else break;
    t = ku(l.document);
  }
  return t;
}
function Rc(l) {
  var t = l && l.nodeName && l.nodeName.toLowerCase();
  return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
}
var Om = zt && "documentMode" in document && 11 >= document.documentMode, He = null, Gi = null, Da = null, Qi = false;
function kf(l, t, e) {
  var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
  Qi || He == null || He !== ku(a) || (a = He, "selectionStart" in a && Rc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = { anchorNode: a.anchorNode, anchorOffset: a.anchorOffset, focusNode: a.focusNode, focusOffset: a.focusOffset }), Da && Xa(Da, a) || (Da = a, a = mn(Gi, "onSelect"), 0 < a.length && (t = new En("onSelect", "select", null, t, e), l.push({ event: t, listeners: a }), t.target = He)));
}
function ae(l, t) {
  var e = {};
  return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
}
var Ce = { animationend: ae("Animation", "AnimationEnd"), animationiteration: ae("Animation", "AnimationIteration"), animationstart: ae("Animation", "AnimationStart"), transitionrun: ae("Transition", "TransitionRun"), transitionstart: ae("Transition", "TransitionStart"), transitioncancel: ae("Transition", "TransitionCancel"), transitionend: ae("Transition", "TransitionEnd") }, In = {}, Ko = {};
zt && (Ko = document.createElement("div").style, "AnimationEvent" in window || (delete Ce.animationend.animation, delete Ce.animationiteration.animation, delete Ce.animationstart.animation), "TransitionEvent" in window || delete Ce.transitionend.transition);
function pe(l) {
  if (In[l]) return In[l];
  if (!Ce[l]) return l;
  var t = Ce[l], e;
  for (e in t) if (t.hasOwnProperty(e) && e in Ko) return In[l] = t[e];
  return l;
}
var Jo = pe("animationend"), wo = pe("animationiteration"), ko = pe("animationstart"), Mm = pe("transitionrun"), jm = pe("transitionstart"), Um = pe("transitioncancel"), $o = pe("transitionend"), Wo = /* @__PURE__ */ new Map(), Xi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
Xi.push("scrollEnd");
function et(l, t) {
  Wo.set(l, t), be(t, [l]);
}
var $u = typeof reportError == "function" ? reportError : function(l) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var t = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l), error: l });
    if (!window.dispatchEvent(t)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", l);
    return;
  }
  console.error(l);
}, Ll = [], Be = 0, Yc = 0;
function Dn() {
  for (var l = Be, t = Yc = Be = 0; t < l; ) {
    var e = Ll[t];
    Ll[t++] = null;
    var a = Ll[t];
    Ll[t++] = null;
    var u = Ll[t];
    Ll[t++] = null;
    var n = Ll[t];
    if (Ll[t++] = null, a !== null && u !== null) {
      var i = a.pending;
      i === null ? u.next = u : (u.next = i.next, i.next = u), a.pending = u;
    }
    n !== 0 && Fo(e, u, n);
  }
}
function Nn(l, t, e, a) {
  Ll[Be++] = l, Ll[Be++] = t, Ll[Be++] = e, Ll[Be++] = a, Yc |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
}
function qc(l, t, e, a) {
  return Nn(l, t, e, a), Wu(l);
}
function xe(l, t) {
  return Nn(l, null, null, t), Wu(l);
}
function Fo(l, t, e) {
  l.lanes |= e;
  var a = l.alternate;
  a !== null && (a.lanes |= e);
  for (var u = false, n = l.return; n !== null; ) n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = true)), l = n, n = n.return;
  return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - Gl(e), l = n.hiddenUpdates, a = l[u], a === null ? l[u] = [t] : a.push(t), t.lane = e | 536870912), n) : null;
}
function Wu(l) {
  if (50 < Ra) throw Ra = 0, fc = null, Error(S(185));
  for (var t = l.return; t !== null; ) l = t, t = l.return;
  return l.tag === 3 ? l.stateNode : null;
}
var Re = {};
function Hm(l, t, e, a) {
  this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Bl(l, t, e, a) {
  return new Hm(l, t, e, a);
}
function Gc(l) {
  return l = l.prototype, !(!l || !l.isReactComponent);
}
function St(l, t) {
  var e = l.alternate;
  return e === null ? (e = Bl(l.tag, t, l.key, l.mode), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 65011712, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
}
function Io(l, t) {
  l.flags &= 65011714;
  var e = l.alternate;
  return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), l;
}
function Hu(l, t, e, a, u, n) {
  var i = 0;
  if (a = l, typeof l == "function") Gc(l) && (i = 1);
  else if (typeof l == "string") i = qy(l, e, it.current) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
  else l: switch (l) {
    case Ni:
      return l = Bl(31, e, t, u), l.elementType = Ni, l.lanes = n, l;
    case Ne:
      return se(e.children, u, n, t);
    case go:
      i = 8, u |= 24;
      break;
    case Ai:
      return l = Bl(12, e, t, u | 2), l.elementType = Ai, l.lanes = n, l;
    case _i:
      return l = Bl(13, e, t, u), l.elementType = _i, l.lanes = n, l;
    case Di:
      return l = Bl(19, e, t, u), l.elementType = Di, l.lanes = n, l;
    default:
      if (typeof l == "object" && l !== null) switch (l.$$typeof) {
        case vt:
          i = 10;
          break l;
        case bo:
          i = 9;
          break l;
        case Ac:
          i = 11;
          break l;
        case _c:
          i = 14;
          break l;
        case Ot:
          i = 16, a = null;
          break l;
      }
      i = 29, e = Error(S(130, l === null ? "null" : typeof l, "")), a = null;
  }
  return t = Bl(i, e, t, u), t.elementType = l, t.type = a, t.lanes = n, t;
}
function se(l, t, e, a) {
  return l = Bl(7, l, a, t), l.lanes = e, l;
}
function Pn(l, t, e) {
  return l = Bl(6, l, null, t), l.lanes = e, l;
}
function Po(l) {
  var t = Bl(18, null, null, 0);
  return t.stateNode = l, t;
}
function li(l, t, e) {
  return t = Bl(4, l.children !== null ? l.children : [], l.key, t), t.lanes = e, t.stateNode = { containerInfo: l.containerInfo, pendingChildren: null, implementation: l.implementation }, t;
}
var $f = /* @__PURE__ */ new WeakMap();
function kl(l, t) {
  if (typeof l == "object" && l !== null) {
    var e = $f.get(l);
    return e !== void 0 ? e : (t = { value: l, source: t, stack: Of(t) }, $f.set(l, t), t);
  }
  return { value: l, source: t, stack: Of(t) };
}
var Ye = [], qe = 0, Fu = null, Za = 0, Kl = [], Jl = 0, $t = null, at = 1, ut = "";
function yt(l, t) {
  Ye[qe++] = Za, Ye[qe++] = Fu, Fu = l, Za = t;
}
function l0(l, t, e) {
  Kl[Jl++] = at, Kl[Jl++] = ut, Kl[Jl++] = $t, $t = l;
  var a = at;
  l = ut;
  var u = 32 - Gl(a) - 1;
  a &= ~(1 << u), e += 1;
  var n = 32 - Gl(t) + u;
  if (30 < n) {
    var i = u - u % 5;
    n = (a & (1 << i) - 1).toString(32), a >>= i, u -= i, at = 1 << 32 - Gl(t) + u | e << u | a, ut = n + l;
  } else at = 1 << n | e << u | a, ut = l;
}
function Qc(l) {
  l.return !== null && (yt(l, 1), l0(l, 1, 0));
}
function Xc(l) {
  for (; l === Fu; ) Fu = Ye[--qe], Ye[qe] = null, Za = Ye[--qe], Ye[qe] = null;
  for (; l === $t; ) $t = Kl[--Jl], Kl[Jl] = null, ut = Kl[--Jl], Kl[Jl] = null, at = Kl[--Jl], Kl[Jl] = null;
}
function t0(l, t) {
  Kl[Jl++] = at, Kl[Jl++] = ut, Kl[Jl++] = $t, at = t.id, ut = t.overflow, $t = l;
}
var pl = null, F = null, G = false, Xt = null, $l = false, Zi = Error(S(519));
function Wt(l) {
  var t = Error(S(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
  throw La(kl(t, l)), Zi;
}
function Wf(l) {
  var t = l.stateNode, e = l.type, a = l.memoizedProps;
  switch (t[Sl] = l, t[jl] = a, e) {
    case "dialog":
      B("cancel", t), B("close", t);
      break;
    case "iframe":
    case "object":
    case "embed":
      B("load", t);
      break;
    case "video":
    case "audio":
      for (e = 0; e < wa.length; e++) B(wa[e], t);
      break;
    case "source":
      B("error", t);
      break;
    case "img":
    case "image":
    case "link":
      B("error", t), B("load", t);
      break;
    case "details":
      B("toggle", t);
      break;
    case "input":
      B("invalid", t), jo(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, true);
      break;
    case "select":
      B("invalid", t);
      break;
    case "textarea":
      B("invalid", t), Ho(t, a.value, a.defaultValue, a.children);
  }
  e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === true || Yd(t.textContent, e) ? (a.popover != null && (B("beforetoggle", t), B("toggle", t)), a.onScroll != null && B("scroll", t), a.onScrollEnd != null && B("scrollend", t), a.onClick != null && (t.onclick = gt), t = true) : t = false, t || Wt(l, true);
}
function Ff(l) {
  for (pl = l.return; pl; ) switch (pl.tag) {
    case 5:
    case 31:
    case 13:
      $l = false;
      return;
    case 27:
    case 3:
      $l = true;
      return;
    default:
      pl = pl.return;
  }
}
function Te(l) {
  if (l !== pl) return false;
  if (!G) return Ff(l), G = true, false;
  var t = l.tag, e;
  if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || mc(l.type, l.memoizedProps)), e = !e), e && F && Wt(l), Ff(l), t === 13) {
    if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(S(317));
    F = Ys(l);
  } else if (t === 31) {
    if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(S(317));
    F = Ys(l);
  } else t === 27 ? (t = F, le(l.type) ? (l = gc, gc = null, F = l) : F = t) : F = pl ? Fl(l.stateNode.nextSibling) : null;
  return true;
}
function me() {
  F = pl = null, G = false;
}
function ti() {
  var l = Xt;
  return l !== null && (Ol === null ? Ol = l : Ol.push.apply(Ol, l), Xt = null), l;
}
function La(l) {
  Xt === null ? Xt = [l] : Xt.push(l);
}
var Li = ct(null), ze = null, bt = null;
function jt(l, t, e) {
  $(Li, t._currentValue), t._currentValue = e;
}
function pt(l) {
  l._currentValue = Li.current, gl(Li);
}
function Vi(l, t, e) {
  for (; l !== null; ) {
    var a = l.alternate;
    if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
    l = l.return;
  }
}
function Ki(l, t, e, a) {
  var u = l.child;
  for (u !== null && (u.return = l); u !== null; ) {
    var n = u.dependencies;
    if (n !== null) {
      var i = u.child;
      n = n.firstContext;
      l: for (; n !== null; ) {
        var c = n;
        n = u;
        for (var f = 0; f < t.length; f++) if (c.context === t[f]) {
          n.lanes |= e, c = n.alternate, c !== null && (c.lanes |= e), Vi(n.return, e, l), a || (i = null);
          break l;
        }
        n = c.next;
      }
    } else if (u.tag === 18) {
      if (i = u.return, i === null) throw Error(S(341));
      i.lanes |= e, n = i.alternate, n !== null && (n.lanes |= e), Vi(i, e, l), i = null;
    } else i = u.child;
    if (i !== null) i.return = u;
    else for (i = u; i !== null; ) {
      if (i === l) {
        i = null;
        break;
      }
      if (u = i.sibling, u !== null) {
        u.return = i.return, i = u;
        break;
      }
      i = i.return;
    }
    u = i;
  }
}
function ca(l, t, e, a) {
  l = null;
  for (var u = t, n = false; u !== null; ) {
    if (!n) {
      if (u.flags & 524288) n = true;
      else if (u.flags & 262144) break;
    }
    if (u.tag === 10) {
      var i = u.alternate;
      if (i === null) throw Error(S(387));
      if (i = i.memoizedProps, i !== null) {
        var c = u.type;
        Xl(u.pendingProps.value, i.value) || (l !== null ? l.push(c) : l = [c]);
      }
    } else if (u === Vu.current) {
      if (i = u.alternate, i === null) throw Error(S(387));
      i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push($a) : l = [$a]);
    }
    u = u.return;
  }
  l !== null && Ki(t, l, e, a), t.flags |= 262144;
}
function Iu(l) {
  for (l = l.firstContext; l !== null; ) {
    if (!Xl(l.context._currentValue, l.memoizedValue)) return true;
    l = l.next;
  }
  return false;
}
function ye(l) {
  ze = l, bt = null, l = l.dependencies, l !== null && (l.firstContext = null);
}
function xl(l) {
  return e0(ze, l);
}
function pu(l, t) {
  return ze === null && ye(l), e0(l, t);
}
function e0(l, t) {
  var e = t._currentValue;
  if (t = { context: t, memoizedValue: e, next: null }, bt === null) {
    if (l === null) throw Error(S(308));
    bt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
  } else bt = bt.next = t;
  return e;
}
var Cm = typeof AbortController < "u" ? AbortController : function() {
  var l = [], t = this.signal = { aborted: false, addEventListener: function(e, a) {
    l.push(a);
  } };
  this.abort = function() {
    t.aborted = true, l.forEach(function(e) {
      return e();
    });
  };
}, Bm = ml.unstable_scheduleCallback, Rm = ml.unstable_NormalPriority, ol = { $$typeof: vt, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
function Zc() {
  return { controller: new Cm(), data: /* @__PURE__ */ new Map(), refCount: 0 };
}
function uu(l) {
  l.refCount--, l.refCount === 0 && Bm(Rm, function() {
    l.controller.abort();
  });
}
var Na = null, Ji = 0, We = 0, Le = null;
function Ym(l, t) {
  if (Na === null) {
    var e = Na = [];
    Ji = 0, We = yf(), Le = { status: "pending", value: void 0, then: function(a) {
      e.push(a);
    } };
  }
  return Ji++, t.then(If, If), t;
}
function If() {
  if (--Ji === 0 && Na !== null) {
    Le !== null && (Le.status = "fulfilled");
    var l = Na;
    Na = null, We = 0, Le = null;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
}
function qm(l, t) {
  var e = [], a = { status: "pending", value: null, reason: null, then: function(u) {
    e.push(u);
  } };
  return l.then(function() {
    a.status = "fulfilled", a.value = t;
    for (var u = 0; u < e.length; u++) (0, e[u])(t);
  }, function(u) {
    for (a.status = "rejected", a.reason = u, u = 0; u < e.length; u++) (0, e[u])(void 0);
  }), a;
}
var Pf = N.S;
N.S = function(l, t) {
  vd = Yl(), typeof t == "object" && t !== null && typeof t.then == "function" && Ym(l, t), Pf !== null && Pf(l, t);
};
var oe = ct(null);
function Lc() {
  var l = oe.current;
  return l !== null ? l : k.pooledCache;
}
function Cu(l, t) {
  t === null ? $(oe, oe.current) : $(oe, t.pool);
}
function a0() {
  var l = Lc();
  return l === null ? null : { parent: ol._currentValue, pool: l };
}
var fa = Error(S(460)), Vc = Error(S(474)), On = Error(S(542)), Pu = { then: function() {
} };
function ls(l) {
  return l = l.status, l === "fulfilled" || l === "rejected";
}
function u0(l, t, e) {
  switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(gt, gt), t = e), t.status) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw l = t.reason, es(l), l;
    default:
      if (typeof t.status == "string") t.then(gt, gt);
      else {
        if (l = k, l !== null && 100 < l.shellSuspendCounter) throw Error(S(482));
        l = t, l.status = "pending", l.then(function(a) {
          if (t.status === "pending") {
            var u = t;
            u.status = "fulfilled", u.value = a;
          }
        }, function(a) {
          if (t.status === "pending") {
            var u = t;
            u.status = "rejected", u.reason = a;
          }
        });
      }
      switch (t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw l = t.reason, es(l), l;
      }
      throw de = t, fa;
  }
}
function ie(l) {
  try {
    var t = l._init;
    return t(l._payload);
  } catch (e) {
    throw e !== null && typeof e == "object" && typeof e.then == "function" ? (de = e, fa) : e;
  }
}
var de = null;
function ts() {
  if (de === null) throw Error(S(459));
  var l = de;
  return de = null, l;
}
function es(l) {
  if (l === fa || l === On) throw Error(S(483));
}
var Ve = null, Va = 0;
function xu(l) {
  var t = Va;
  return Va += 1, Ve === null && (Ve = []), u0(Ve, l, t);
}
function ha(l, t) {
  t = t.props.ref, l.ref = t !== void 0 ? t : null;
}
function zu(l, t) {
  throw t.$$typeof === Er ? Error(S(525)) : (l = Object.prototype.toString.call(t), Error(S(31, l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l)));
}
function n0(l) {
  function t(o, s) {
    if (l) {
      var y = o.deletions;
      y === null ? (o.deletions = [s], o.flags |= 16) : y.push(s);
    }
  }
  function e(o, s) {
    if (!l) return null;
    for (; s !== null; ) t(o, s), s = s.sibling;
    return null;
  }
  function a(o) {
    for (var s = /* @__PURE__ */ new Map(); o !== null; ) o.key !== null ? s.set(o.key, o) : s.set(o.index, o), o = o.sibling;
    return s;
  }
  function u(o, s) {
    return o = St(o, s), o.index = 0, o.sibling = null, o;
  }
  function n(o, s, y) {
    return o.index = y, l ? (y = o.alternate, y !== null ? (y = y.index, y < s ? (o.flags |= 67108866, s) : y) : (o.flags |= 67108866, s)) : (o.flags |= 1048576, s);
  }
  function i(o) {
    return l && o.alternate === null && (o.flags |= 67108866), o;
  }
  function c(o, s, y, b) {
    return s === null || s.tag !== 6 ? (s = Pn(y, o.mode, b), s.return = o, s) : (s = u(s, y), s.return = o, s);
  }
  function f(o, s, y, b) {
    var A = y.type;
    return A === Ne ? m(o, s, y.props.children, b, y.key) : s !== null && (s.elementType === A || typeof A == "object" && A !== null && A.$$typeof === Ot && ie(A) === s.type) ? (s = u(s, y.props), ha(s, y), s.return = o, s) : (s = Hu(y.type, y.key, y.props, null, o.mode, b), ha(s, y), s.return = o, s);
  }
  function r(o, s, y, b) {
    return s === null || s.tag !== 4 || s.stateNode.containerInfo !== y.containerInfo || s.stateNode.implementation !== y.implementation ? (s = li(y, o.mode, b), s.return = o, s) : (s = u(s, y.children || []), s.return = o, s);
  }
  function m(o, s, y, b, A) {
    return s === null || s.tag !== 7 ? (s = se(y, o.mode, b, A), s.return = o, s) : (s = u(s, y), s.return = o, s);
  }
  function h(o, s, y) {
    if (typeof s == "string" && s !== "" || typeof s == "number" || typeof s == "bigint") return s = Pn("" + s, o.mode, y), s.return = o, s;
    if (typeof s == "object" && s !== null) {
      switch (s.$$typeof) {
        case yu:
          return y = Hu(s.type, s.key, s.props, null, o.mode, y), ha(y, s), y.return = o, y;
        case Sa:
          return s = li(s, o.mode, y), s.return = o, s;
        case Ot:
          return s = ie(s), h(o, s, y);
      }
      if (pa(s) || ra(s)) return s = se(s, o.mode, y, null), s.return = o, s;
      if (typeof s.then == "function") return h(o, xu(s), y);
      if (s.$$typeof === vt) return h(o, pu(o, s), y);
      zu(o, s);
    }
    return null;
  }
  function d(o, s, y, b) {
    var A = s !== null ? s.key : null;
    if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint") return A !== null ? null : c(o, s, "" + y, b);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case yu:
          return y.key === A ? f(o, s, y, b) : null;
        case Sa:
          return y.key === A ? r(o, s, y, b) : null;
        case Ot:
          return y = ie(y), d(o, s, y, b);
      }
      if (pa(y) || ra(y)) return A !== null ? null : m(o, s, y, b, null);
      if (typeof y.then == "function") return d(o, s, xu(y), b);
      if (y.$$typeof === vt) return d(o, s, pu(o, y), b);
      zu(o, y);
    }
    return null;
  }
  function v(o, s, y, b, A) {
    if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint") return o = o.get(y) || null, c(s, o, "" + b, A);
    if (typeof b == "object" && b !== null) {
      switch (b.$$typeof) {
        case yu:
          return o = o.get(b.key === null ? y : b.key) || null, f(s, o, b, A);
        case Sa:
          return o = o.get(b.key === null ? y : b.key) || null, r(s, o, b, A);
        case Ot:
          return b = ie(b), v(o, s, y, b, A);
      }
      if (pa(b) || ra(b)) return o = o.get(y) || null, m(s, o, b, A, null);
      if (typeof b.then == "function") return v(o, s, y, xu(b), A);
      if (b.$$typeof === vt) return v(o, s, y, pu(s, b), A);
      zu(s, b);
    }
    return null;
  }
  function p(o, s, y, b) {
    for (var A = null, j = null, T = s, D = s = 0, O = null; T !== null && D < y.length; D++) {
      T.index > D ? (O = T, T = null) : O = T.sibling;
      var M = d(o, T, y[D], b);
      if (M === null) {
        T === null && (T = O);
        break;
      }
      l && T && M.alternate === null && t(o, T), s = n(M, s, D), j === null ? A = M : j.sibling = M, j = M, T = O;
    }
    if (D === y.length) return e(o, T), G && yt(o, D), A;
    if (T === null) {
      for (; D < y.length; D++) T = h(o, y[D], b), T !== null && (s = n(T, s, D), j === null ? A = T : j.sibling = T, j = T);
      return G && yt(o, D), A;
    }
    for (T = a(T); D < y.length; D++) O = v(T, o, D, y[D], b), O !== null && (l && O.alternate !== null && T.delete(O.key === null ? D : O.key), s = n(O, s, D), j === null ? A = O : j.sibling = O, j = O);
    return l && T.forEach(function(ul) {
      return t(o, ul);
    }), G && yt(o, D), A;
  }
  function x(o, s, y, b) {
    if (y == null) throw Error(S(151));
    for (var A = null, j = null, T = s, D = s = 0, O = null, M = y.next(); T !== null && !M.done; D++, M = y.next()) {
      T.index > D ? (O = T, T = null) : O = T.sibling;
      var ul = d(o, T, M.value, b);
      if (ul === null) {
        T === null && (T = O);
        break;
      }
      l && T && ul.alternate === null && t(o, T), s = n(ul, s, D), j === null ? A = ul : j.sibling = ul, j = ul, T = O;
    }
    if (M.done) return e(o, T), G && yt(o, D), A;
    if (T === null) {
      for (; !M.done; D++, M = y.next()) M = h(o, M.value, b), M !== null && (s = n(M, s, D), j === null ? A = M : j.sibling = M, j = M);
      return G && yt(o, D), A;
    }
    for (T = a(T); !M.done; D++, M = y.next()) M = v(T, o, D, M.value, b), M !== null && (l && M.alternate !== null && T.delete(M.key === null ? D : M.key), s = n(M, s, D), j === null ? A = M : j.sibling = M, j = M);
    return l && T.forEach(function(q) {
      return t(o, q);
    }), G && yt(o, D), A;
  }
  function E(o, s, y, b) {
    if (typeof y == "object" && y !== null && y.type === Ne && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case yu:
          l: {
            for (var A = y.key; s !== null; ) {
              if (s.key === A) {
                if (A = y.type, A === Ne) {
                  if (s.tag === 7) {
                    e(o, s.sibling), b = u(s, y.props.children), b.return = o, o = b;
                    break l;
                  }
                } else if (s.elementType === A || typeof A == "object" && A !== null && A.$$typeof === Ot && ie(A) === s.type) {
                  e(o, s.sibling), b = u(s, y.props), ha(b, y), b.return = o, o = b;
                  break l;
                }
                e(o, s);
                break;
              } else t(o, s);
              s = s.sibling;
            }
            y.type === Ne ? (b = se(y.props.children, o.mode, b, y.key), b.return = o, o = b) : (b = Hu(y.type, y.key, y.props, null, o.mode, b), ha(b, y), b.return = o, o = b);
          }
          return i(o);
        case Sa:
          l: {
            for (A = y.key; s !== null; ) {
              if (s.key === A) if (s.tag === 4 && s.stateNode.containerInfo === y.containerInfo && s.stateNode.implementation === y.implementation) {
                e(o, s.sibling), b = u(s, y.children || []), b.return = o, o = b;
                break l;
              } else {
                e(o, s);
                break;
              }
              else t(o, s);
              s = s.sibling;
            }
            b = li(y, o.mode, b), b.return = o, o = b;
          }
          return i(o);
        case Ot:
          return y = ie(y), E(o, s, y, b);
      }
      if (pa(y)) return p(o, s, y, b);
      if (ra(y)) {
        if (A = ra(y), typeof A != "function") throw Error(S(150));
        return y = A.call(y), x(o, s, y, b);
      }
      if (typeof y.then == "function") return E(o, s, xu(y), b);
      if (y.$$typeof === vt) return E(o, s, pu(o, y), b);
      zu(o, y);
    }
    return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, s !== null && s.tag === 6 ? (e(o, s.sibling), b = u(s, y), b.return = o, o = b) : (e(o, s), b = Pn(y, o.mode, b), b.return = o, o = b), i(o)) : e(o, s);
  }
  return function(o, s, y, b) {
    try {
      Va = 0;
      var A = E(o, s, y, b);
      return Ve = null, A;
    } catch (T) {
      if (T === fa || T === On) throw T;
      var j = Bl(29, T, null, o.mode);
      return j.lanes = b, j.return = o, j;
    } finally {
    }
  };
}
var he = n0(true), i0 = n0(false), Mt = false;
function Kc(l) {
  l.updateQueue = { baseState: l.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
}
function wi(l, t) {
  l = l.updateQueue, t.updateQueue === l && (t.updateQueue = { baseState: l.baseState, firstBaseUpdate: l.firstBaseUpdate, lastBaseUpdate: l.lastBaseUpdate, shared: l.shared, callbacks: null });
}
function Zt(l) {
  return { lane: l, tag: 0, payload: null, callback: null, next: null };
}
function Lt(l, t, e) {
  var a = l.updateQueue;
  if (a === null) return null;
  if (a = a.shared, X & 2) {
    var u = a.pending;
    return u === null ? t.next = t : (t.next = u.next, u.next = t), a.pending = t, t = Wu(l), Fo(l, null, e), t;
  }
  return Nn(l, a, t, e), Wu(l);
}
function Oa(l, t, e) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
    var a = t.lanes;
    a &= l.pendingLanes, e |= a, t.lanes = e, Eo(l, e);
  }
}
function ei(l, t) {
  var e = l.updateQueue, a = l.alternate;
  if (a !== null && (a = a.updateQueue, e === a)) {
    var u = null, n = null;
    if (e = e.firstBaseUpdate, e !== null) {
      do {
        var i = { lane: e.lane, tag: e.tag, payload: e.payload, callback: null, next: null };
        n === null ? u = n = i : n = n.next = i, e = e.next;
      } while (e !== null);
      n === null ? u = n = t : n = n.next = t;
    } else u = n = t;
    e = { baseState: a.baseState, firstBaseUpdate: u, lastBaseUpdate: n, shared: a.shared, callbacks: a.callbacks }, l.updateQueue = e;
    return;
  }
  l = e.lastBaseUpdate, l === null ? e.firstBaseUpdate = t : l.next = t, e.lastBaseUpdate = t;
}
var ki = false;
function Ma() {
  if (ki) {
    var l = Le;
    if (l !== null) throw l;
  }
}
function ja(l, t, e, a) {
  ki = false;
  var u = l.updateQueue;
  Mt = false;
  var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
  if (c !== null) {
    u.shared.pending = null;
    var f = c, r = f.next;
    f.next = null, i === null ? n = r : i.next = r, i = f;
    var m = l.alternate;
    m !== null && (m = m.updateQueue, c = m.lastBaseUpdate, c !== i && (c === null ? m.firstBaseUpdate = r : c.next = r, m.lastBaseUpdate = f));
  }
  if (n !== null) {
    var h = u.baseState;
    i = 0, m = r = f = null, c = n;
    do {
      var d = c.lane & -536870913, v = d !== c.lane;
      if (v ? (Y & d) === d : (a & d) === d) {
        d !== 0 && d === We && (ki = true), m !== null && (m = m.next = { lane: 0, tag: c.tag, payload: c.payload, callback: null, next: null });
        l: {
          var p = l, x = c;
          d = t;
          var E = e;
          switch (x.tag) {
            case 1:
              if (p = x.payload, typeof p == "function") {
                h = p.call(E, h, d);
                break l;
              }
              h = p;
              break l;
            case 3:
              p.flags = p.flags & -65537 | 128;
            case 0:
              if (p = x.payload, d = typeof p == "function" ? p.call(E, h, d) : p, d == null) break l;
              h = P({}, h, d);
              break l;
            case 2:
              Mt = true;
          }
        }
        d = c.callback, d !== null && (l.flags |= 64, v && (l.flags |= 8192), v = u.callbacks, v === null ? u.callbacks = [d] : v.push(d));
      } else v = { lane: d, tag: c.tag, payload: c.payload, callback: c.callback, next: null }, m === null ? (r = m = v, f = h) : m = m.next = v, i |= d;
      if (c = c.next, c === null) {
        if (c = u.shared.pending, c === null) break;
        v = c, c = v.next, v.next = null, u.lastBaseUpdate = v, u.shared.pending = null;
      }
    } while (true);
    m === null && (f = h), u.baseState = f, u.firstBaseUpdate = r, u.lastBaseUpdate = m, n === null && (u.shared.lanes = 0), It |= i, l.lanes = i, l.memoizedState = h;
  }
}
function c0(l, t) {
  if (typeof l != "function") throw Error(S(191, l));
  l.call(t);
}
function f0(l, t) {
  var e = l.callbacks;
  if (e !== null) for (l.callbacks = null, l = 0; l < e.length; l++) c0(e[l], t);
}
var Fe = ct(null), ln = ct(0);
function as(l, t) {
  l = _t, $(ln, l), $(Fe, t), _t = l | t.baseLanes;
}
function $i() {
  $(ln, _t), $(Fe, Fe.current);
}
function Jc() {
  _t = ln.current, gl(Fe), gl(ln);
}
var Zl = ct(null), Wl = null;
function Ut(l) {
  var t = l.alternate;
  $(il, il.current & 1), $(Zl, l), Wl === null && (t === null || Fe.current !== null || t.memoizedState !== null) && (Wl = l);
}
function Wi(l) {
  $(il, il.current), $(Zl, l), Wl === null && (Wl = l);
}
function s0(l) {
  l.tag === 22 ? ($(il, il.current), $(Zl, l), Wl === null && (Wl = l)) : Ht();
}
function Ht() {
  $(il, il.current), $(Zl, Zl.current);
}
function Cl(l) {
  gl(Zl), Wl === l && (Wl = null), gl(il);
}
var il = ct(0);
function tn(l) {
  for (var t = l; t !== null; ) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e !== null && (e = e.dehydrated, e === null || hc(e) || vc(e))) return t;
    } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === l) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === l) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var Tt = 0, H = null, w = null, fl = null, en = false, Ke = false, ve = false, an = 0, Ka = 0, Je = null, Gm = 0;
function el() {
  throw Error(S(321));
}
function wc(l, t) {
  if (t === null) return false;
  for (var e = 0; e < t.length && e < l.length; e++) if (!Xl(l[e], t[e])) return false;
  return true;
}
function kc(l, t, e, a, u, n) {
  return Tt = n, H = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, N.H = l === null || l.memoizedState === null ? Q0 : nf, ve = false, n = e(a, u), ve = false, Ke && (n = d0(t, e, a, u)), o0(l), n;
}
function o0(l) {
  N.H = Ja;
  var t = w !== null && w.next !== null;
  if (Tt = 0, fl = w = H = null, en = false, Ka = 0, Je = null, t) throw Error(S(300));
  l === null || dl || (l = l.dependencies, l !== null && Iu(l) && (dl = true));
}
function d0(l, t, e, a) {
  H = l;
  var u = 0;
  do {
    if (Ke && (Je = null), Ka = 0, Ke = false, 25 <= u) throw Error(S(301));
    if (u += 1, fl = w = null, l.updateQueue != null) {
      var n = l.updateQueue;
      n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
    }
    N.H = X0, n = t(e, a);
  } while (Ke);
  return n;
}
function Qm() {
  var l = N.H, t = l.useState()[0];
  return t = typeof t.then == "function" ? nu(t) : t, l = l.useState()[0], (w !== null ? w.memoizedState : null) !== l && (H.flags |= 1024), t;
}
function $c() {
  var l = an !== 0;
  return an = 0, l;
}
function Wc(l, t, e) {
  t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
}
function Fc(l) {
  if (en) {
    for (l = l.memoizedState; l !== null; ) {
      var t = l.queue;
      t !== null && (t.pending = null), l = l.next;
    }
    en = false;
  }
  Tt = 0, fl = w = H = null, Ke = false, Ka = an = 0, Je = null;
}
function Tl() {
  var l = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return fl === null ? H.memoizedState = fl = l : fl = fl.next = l, fl;
}
function cl() {
  if (w === null) {
    var l = H.alternate;
    l = l !== null ? l.memoizedState : null;
  } else l = w.next;
  var t = fl === null ? H.memoizedState : fl.next;
  if (t !== null) fl = t, w = l;
  else {
    if (l === null) throw H.alternate === null ? Error(S(467)) : Error(S(310));
    w = l, l = { memoizedState: w.memoizedState, baseState: w.baseState, baseQueue: w.baseQueue, queue: w.queue, next: null }, fl === null ? H.memoizedState = fl = l : fl = fl.next = l;
  }
  return fl;
}
function Mn() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function nu(l) {
  var t = Ka;
  return Ka += 1, Je === null && (Je = []), l = u0(Je, l, t), t = H, (fl === null ? t.memoizedState : fl.next) === null && (t = t.alternate, N.H = t === null || t.memoizedState === null ? Q0 : nf), l;
}
function jn(l) {
  if (l !== null && typeof l == "object") {
    if (typeof l.then == "function") return nu(l);
    if (l.$$typeof === vt) return xl(l);
  }
  throw Error(S(438, String(l)));
}
function Ic(l) {
  var t = null, e = H.updateQueue;
  if (e !== null && (t = e.memoCache), t == null) {
    var a = H.alternate;
    a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = { data: a.data.map(function(u) {
      return u.slice();
    }), index: 0 })));
  }
  if (t == null && (t = { data: [], index: 0 }), e === null && (e = Mn(), H.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0) for (e = t.data[t.index] = Array(l), a = 0; a < l; a++) e[a] = Ar;
  return t.index++, e;
}
function Et(l, t) {
  return typeof t == "function" ? t(l) : t;
}
function Bu(l) {
  var t = cl();
  return Pc(t, w, l);
}
function Pc(l, t, e) {
  var a = l.queue;
  if (a === null) throw Error(S(311));
  a.lastRenderedReducer = e;
  var u = l.baseQueue, n = a.pending;
  if (n !== null) {
    if (u !== null) {
      var i = u.next;
      u.next = n.next, n.next = i;
    }
    t.baseQueue = u = n, a.pending = null;
  }
  if (n = l.baseState, u === null) l.memoizedState = n;
  else {
    t = u.next;
    var c = i = null, f = null, r = t, m = false;
    do {
      var h = r.lane & -536870913;
      if (h !== r.lane ? (Y & h) === h : (Tt & h) === h) {
        var d = r.revertLane;
        if (d === 0) f !== null && (f = f.next = { lane: 0, revertLane: 0, gesture: null, action: r.action, hasEagerState: r.hasEagerState, eagerState: r.eagerState, next: null }), h === We && (m = true);
        else if ((Tt & d) === d) {
          r = r.next, d === We && (m = true);
          continue;
        } else h = { lane: 0, revertLane: r.revertLane, gesture: null, action: r.action, hasEagerState: r.hasEagerState, eagerState: r.eagerState, next: null }, f === null ? (c = f = h, i = n) : f = f.next = h, H.lanes |= d, It |= d;
        h = r.action, ve && e(n, h), n = r.hasEagerState ? r.eagerState : e(n, h);
      } else d = { lane: h, revertLane: r.revertLane, gesture: r.gesture, action: r.action, hasEagerState: r.hasEagerState, eagerState: r.eagerState, next: null }, f === null ? (c = f = d, i = n) : f = f.next = d, H.lanes |= h, It |= h;
      r = r.next;
    } while (r !== null && r !== t);
    if (f === null ? i = n : f.next = c, !Xl(n, l.memoizedState) && (dl = true, m && (e = Le, e !== null))) throw e;
    l.memoizedState = n, l.baseState = i, l.baseQueue = f, a.lastRenderedState = n;
  }
  return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
}
function ai(l) {
  var t = cl(), e = t.queue;
  if (e === null) throw Error(S(311));
  e.lastRenderedReducer = l;
  var a = e.dispatch, u = e.pending, n = t.memoizedState;
  if (u !== null) {
    e.pending = null;
    var i = u = u.next;
    do
      n = l(n, i.action), i = i.next;
    while (i !== u);
    Xl(n, t.memoizedState) || (dl = true), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), e.lastRenderedState = n;
  }
  return [n, a];
}
function r0(l, t, e) {
  var a = H, u = cl(), n = G;
  if (n) {
    if (e === void 0) throw Error(S(407));
    e = e();
  } else e = t();
  var i = !Xl((w || u).memoizedState, e);
  if (i && (u.memoizedState = e, dl = true), u = u.queue, lf(h0.bind(null, a, u, l), [l]), u.getSnapshot !== t || i || fl !== null && fl.memoizedState.tag & 1) {
    if (a.flags |= 2048, Ie(9, { destroy: void 0 }, y0.bind(null, a, u, e, t), null), k === null) throw Error(S(349));
    n || Tt & 127 || m0(a, t, e);
  }
  return e;
}
function m0(l, t, e) {
  l.flags |= 16384, l = { getSnapshot: t, value: e }, t = H.updateQueue, t === null ? (t = Mn(), H.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
}
function y0(l, t, e, a) {
  t.value = e, t.getSnapshot = a, v0(t) && g0(l);
}
function h0(l, t, e) {
  return e(function() {
    v0(t) && g0(l);
  });
}
function v0(l) {
  var t = l.getSnapshot;
  l = l.value;
  try {
    var e = t();
    return !Xl(l, e);
  } catch {
    return true;
  }
}
function g0(l) {
  var t = xe(l, 2);
  t !== null && Ml(t, l, 2);
}
function Fi(l) {
  var t = Tl();
  if (typeof l == "function") {
    var e = l;
    if (l = e(), ve) {
      Bt(true);
      try {
        e();
      } finally {
        Bt(false);
      }
    }
  }
  return t.memoizedState = t.baseState = l, t.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Et, lastRenderedState: l }, t;
}
function b0(l, t, e, a) {
  return l.baseState = e, Pc(l, w, typeof a == "function" ? a : Et);
}
function Xm(l, t, e, a, u) {
  if (Hn(l)) throw Error(S(485));
  if (l = t.action, l !== null) {
    var n = { payload: u, action: l, next: null, isTransition: true, status: "pending", value: null, reason: null, listeners: [], then: function(i) {
      n.listeners.push(i);
    } };
    N.T !== null ? e(true) : n.isTransition = false, a(n), e = t.pending, e === null ? (n.next = t.pending = n, S0(t, n)) : (n.next = e.next, t.pending = e.next = n);
  }
}
function S0(l, t) {
  var e = t.action, a = t.payload, u = l.state;
  if (t.isTransition) {
    var n = N.T, i = {};
    N.T = i;
    try {
      var c = e(u, a), f = N.S;
      f !== null && f(i, c), us(l, t, c);
    } catch (r) {
      Ii(l, t, r);
    } finally {
      n !== null && i.types !== null && (n.types = i.types), N.T = n;
    }
  } else try {
    n = e(u, a), us(l, t, n);
  } catch (r) {
    Ii(l, t, r);
  }
}
function us(l, t, e) {
  e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(function(a) {
    ns(l, t, a);
  }, function(a) {
    return Ii(l, t, a);
  }) : ns(l, t, e);
}
function ns(l, t, e) {
  t.status = "fulfilled", t.value = e, p0(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, S0(l, e)));
}
function Ii(l, t, e) {
  var a = l.pending;
  if (l.pending = null, a !== null) {
    a = a.next;
    do
      t.status = "rejected", t.reason = e, p0(t), t = t.next;
    while (t !== a);
  }
  l.action = null;
}
function p0(l) {
  l = l.listeners;
  for (var t = 0; t < l.length; t++) (0, l[t])();
}
function x0(l, t) {
  return t;
}
function is(l, t) {
  if (G) {
    var e = k.formState;
    if (e !== null) {
      l: {
        var a = H;
        if (G) {
          if (F) {
            t: {
              for (var u = F, n = $l; u.nodeType !== 8; ) {
                if (!n) {
                  u = null;
                  break t;
                }
                if (u = Fl(u.nextSibling), u === null) {
                  u = null;
                  break t;
                }
              }
              n = u.data, u = n === "F!" || n === "F" ? u : null;
            }
            if (u) {
              F = Fl(u.nextSibling), a = u.data === "F!";
              break l;
            }
          }
          Wt(a);
        }
        a = false;
      }
      a && (t = e[0]);
    }
  }
  return e = Tl(), e.memoizedState = e.baseState = t, a = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: x0, lastRenderedState: t }, e.queue = a, e = Y0.bind(null, H, a), a.dispatch = e, a = Fi(false), n = uf.bind(null, H, false, a.queue), a = Tl(), u = { state: t, dispatch: null, action: l, pending: null }, a.queue = u, e = Xm.bind(null, H, u, n, e), u.dispatch = e, a.memoizedState = l, [t, e, false];
}
function cs(l) {
  var t = cl();
  return z0(t, w, l);
}
function z0(l, t, e) {
  if (t = Pc(l, t, x0)[0], l = Bu(Et)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
    var a = nu(t);
  } catch (i) {
    throw i === fa ? On : i;
  }
  else a = t;
  t = cl();
  var u = t.queue, n = u.dispatch;
  return e !== t.memoizedState && (H.flags |= 2048, Ie(9, { destroy: void 0 }, Zm.bind(null, u, e), null)), [a, n, l];
}
function Zm(l, t) {
  l.action = t;
}
function fs(l) {
  var t = cl(), e = w;
  if (e !== null) return z0(t, e, l);
  cl(), t = t.memoizedState, e = cl();
  var a = e.queue.dispatch;
  return e.memoizedState = l, [t, a, false];
}
function Ie(l, t, e, a) {
  return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = H.updateQueue, t === null && (t = Mn(), H.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
}
function T0() {
  return cl().memoizedState;
}
function Ru(l, t, e, a) {
  var u = Tl();
  H.flags |= l, u.memoizedState = Ie(1 | t, { destroy: void 0 }, e, a === void 0 ? null : a);
}
function Un(l, t, e, a) {
  var u = cl();
  a = a === void 0 ? null : a;
  var n = u.memoizedState.inst;
  w !== null && a !== null && wc(a, w.memoizedState.deps) ? u.memoizedState = Ie(t, n, e, a) : (H.flags |= l, u.memoizedState = Ie(1 | t, n, e, a));
}
function ss(l, t) {
  Ru(8390656, 8, l, t);
}
function lf(l, t) {
  Un(2048, 8, l, t);
}
function Lm(l) {
  H.flags |= 4;
  var t = H.updateQueue;
  if (t === null) t = Mn(), H.updateQueue = t, t.events = [l];
  else {
    var e = t.events;
    e === null ? t.events = [l] : e.push(l);
  }
}
function E0(l) {
  var t = cl().memoizedState;
  return Lm({ ref: t, nextImpl: l }), function() {
    if (X & 2) throw Error(S(440));
    return t.impl.apply(void 0, arguments);
  };
}
function A0(l, t) {
  return Un(4, 2, l, t);
}
function _0(l, t) {
  return Un(4, 4, l, t);
}
function D0(l, t) {
  if (typeof t == "function") {
    l = l();
    var e = t(l);
    return function() {
      typeof e == "function" ? e() : t(null);
    };
  }
  if (t != null) return l = l(), t.current = l, function() {
    t.current = null;
  };
}
function N0(l, t, e) {
  e = e != null ? e.concat([l]) : null, Un(4, 4, D0.bind(null, t, l), e);
}
function tf() {
}
function O0(l, t) {
  var e = cl();
  t = t === void 0 ? null : t;
  var a = e.memoizedState;
  return t !== null && wc(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
}
function M0(l, t) {
  var e = cl();
  t = t === void 0 ? null : t;
  var a = e.memoizedState;
  if (t !== null && wc(t, a[1])) return a[0];
  if (a = l(), ve) {
    Bt(true);
    try {
      l();
    } finally {
      Bt(false);
    }
  }
  return e.memoizedState = [a, t], a;
}
function ef(l, t, e) {
  return e === void 0 || Tt & 1073741824 && !(Y & 261930) ? l.memoizedState = t : (l.memoizedState = e, l = bd(), H.lanes |= l, It |= l, e);
}
function j0(l, t, e, a) {
  return Xl(e, t) ? e : Fe.current !== null ? (l = ef(l, e, a), Xl(l, t) || (dl = true), l) : !(Tt & 42) || Tt & 1073741824 && !(Y & 261930) ? (dl = true, l.memoizedState = e) : (l = bd(), H.lanes |= l, It |= l, t);
}
function U0(l, t, e, a, u) {
  var n = Z.p;
  Z.p = n !== 0 && 8 > n ? n : 8;
  var i = N.T, c = {};
  N.T = c, uf(l, false, t, e);
  try {
    var f = u(), r = N.S;
    if (r !== null && r(c, f), f !== null && typeof f == "object" && typeof f.then == "function") {
      var m = qm(f, a);
      Ua(l, t, m, Ql(l));
    } else Ua(l, t, a, Ql(l));
  } catch (h) {
    Ua(l, t, { then: function() {
    }, status: "rejected", reason: h }, Ql());
  } finally {
    Z.p = n, i !== null && c.types !== null && (i.types = c.types), N.T = i;
  }
}
function Vm() {
}
function Pi(l, t, e, a) {
  if (l.tag !== 5) throw Error(S(476));
  var u = H0(l).queue;
  U0(l, u, t, fe, e === null ? Vm : function() {
    return C0(l), e(a);
  });
}
function H0(l) {
  var t = l.memoizedState;
  if (t !== null) return t;
  t = { memoizedState: fe, baseState: fe, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Et, lastRenderedState: fe }, next: null };
  var e = {};
  return t.next = { memoizedState: e, baseState: e, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Et, lastRenderedState: e }, next: null }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
}
function C0(l) {
  var t = H0(l);
  t.next === null && (t = l.alternate.memoizedState), Ua(l, t.next.queue, {}, Ql());
}
function af() {
  return xl($a);
}
function B0() {
  return cl().memoizedState;
}
function R0() {
  return cl().memoizedState;
}
function Km(l) {
  for (var t = l.return; t !== null; ) {
    switch (t.tag) {
      case 24:
      case 3:
        var e = Ql();
        l = Zt(e);
        var a = Lt(t, l, e);
        a !== null && (Ml(a, t, e), Oa(a, t, e)), t = { cache: Zc() }, l.payload = t;
        return;
    }
    t = t.return;
  }
}
function Jm(l, t, e) {
  var a = Ql();
  e = { lane: a, revertLane: 0, gesture: null, action: e, hasEagerState: false, eagerState: null, next: null }, Hn(l) ? q0(t, e) : (e = qc(l, t, e, a), e !== null && (Ml(e, l, a), G0(e, t, a)));
}
function Y0(l, t, e) {
  var a = Ql();
  Ua(l, t, e, a);
}
function Ua(l, t, e, a) {
  var u = { lane: a, revertLane: 0, gesture: null, action: e, hasEagerState: false, eagerState: null, next: null };
  if (Hn(l)) q0(t, u);
  else {
    var n = l.alternate;
    if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null)) try {
      var i = t.lastRenderedState, c = n(i, e);
      if (u.hasEagerState = true, u.eagerState = c, Xl(c, i)) return Nn(l, t, u, 0), k === null && Dn(), false;
    } catch {
    } finally {
    }
    if (e = qc(l, t, u, a), e !== null) return Ml(e, l, a), G0(e, t, a), true;
  }
  return false;
}
function uf(l, t, e, a) {
  if (a = { lane: 2, revertLane: yf(), gesture: null, action: a, hasEagerState: false, eagerState: null, next: null }, Hn(l)) {
    if (t) throw Error(S(479));
  } else t = qc(l, e, a, 2), t !== null && Ml(t, l, 2);
}
function Hn(l) {
  var t = l.alternate;
  return l === H || t !== null && t === H;
}
function q0(l, t) {
  Ke = en = true;
  var e = l.pending;
  e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
}
function G0(l, t, e) {
  if (e & 4194048) {
    var a = t.lanes;
    a &= l.pendingLanes, e |= a, t.lanes = e, Eo(l, e);
  }
}
var Ja = { readContext: xl, use: jn, useCallback: el, useContext: el, useEffect: el, useImperativeHandle: el, useLayoutEffect: el, useInsertionEffect: el, useMemo: el, useReducer: el, useRef: el, useState: el, useDebugValue: el, useDeferredValue: el, useTransition: el, useSyncExternalStore: el, useId: el, useHostTransitionStatus: el, useFormState: el, useActionState: el, useOptimistic: el, useMemoCache: el, useCacheRefresh: el };
Ja.useEffectEvent = el;
var Q0 = { readContext: xl, use: jn, useCallback: function(l, t) {
  return Tl().memoizedState = [l, t === void 0 ? null : t], l;
}, useContext: xl, useEffect: ss, useImperativeHandle: function(l, t, e) {
  e = e != null ? e.concat([l]) : null, Ru(4194308, 4, D0.bind(null, t, l), e);
}, useLayoutEffect: function(l, t) {
  return Ru(4194308, 4, l, t);
}, useInsertionEffect: function(l, t) {
  Ru(4, 2, l, t);
}, useMemo: function(l, t) {
  var e = Tl();
  t = t === void 0 ? null : t;
  var a = l();
  if (ve) {
    Bt(true);
    try {
      l();
    } finally {
      Bt(false);
    }
  }
  return e.memoizedState = [a, t], a;
}, useReducer: function(l, t, e) {
  var a = Tl();
  if (e !== void 0) {
    var u = e(t);
    if (ve) {
      Bt(true);
      try {
        e(t);
      } finally {
        Bt(false);
      }
    }
  } else u = t;
  return a.memoizedState = a.baseState = u, l = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: l, lastRenderedState: u }, a.queue = l, l = l.dispatch = Jm.bind(null, H, l), [a.memoizedState, l];
}, useRef: function(l) {
  var t = Tl();
  return l = { current: l }, t.memoizedState = l;
}, useState: function(l) {
  l = Fi(l);
  var t = l.queue, e = Y0.bind(null, H, t);
  return t.dispatch = e, [l.memoizedState, e];
}, useDebugValue: tf, useDeferredValue: function(l, t) {
  var e = Tl();
  return ef(e, l, t);
}, useTransition: function() {
  var l = Fi(false);
  return l = U0.bind(null, H, l.queue, true, false), Tl().memoizedState = l, [false, l];
}, useSyncExternalStore: function(l, t, e) {
  var a = H, u = Tl();
  if (G) {
    if (e === void 0) throw Error(S(407));
    e = e();
  } else {
    if (e = t(), k === null) throw Error(S(349));
    Y & 127 || m0(a, t, e);
  }
  u.memoizedState = e;
  var n = { value: e, getSnapshot: t };
  return u.queue = n, ss(h0.bind(null, a, n, l), [l]), a.flags |= 2048, Ie(9, { destroy: void 0 }, y0.bind(null, a, n, e, t), null), e;
}, useId: function() {
  var l = Tl(), t = k.identifierPrefix;
  if (G) {
    var e = ut, a = at;
    e = (a & ~(1 << 32 - Gl(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = an++, 0 < e && (t += "H" + e.toString(32)), t += "_";
  } else e = Gm++, t = "_" + t + "r_" + e.toString(32) + "_";
  return l.memoizedState = t;
}, useHostTransitionStatus: af, useFormState: is, useActionState: is, useOptimistic: function(l) {
  var t = Tl();
  t.memoizedState = t.baseState = l;
  var e = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
  return t.queue = e, t = uf.bind(null, H, true, e), e.dispatch = t, [l, t];
}, useMemoCache: Ic, useCacheRefresh: function() {
  return Tl().memoizedState = Km.bind(null, H);
}, useEffectEvent: function(l) {
  var t = Tl(), e = { impl: l };
  return t.memoizedState = e, function() {
    if (X & 2) throw Error(S(440));
    return e.impl.apply(void 0, arguments);
  };
} }, nf = { readContext: xl, use: jn, useCallback: O0, useContext: xl, useEffect: lf, useImperativeHandle: N0, useInsertionEffect: A0, useLayoutEffect: _0, useMemo: M0, useReducer: Bu, useRef: T0, useState: function() {
  return Bu(Et);
}, useDebugValue: tf, useDeferredValue: function(l, t) {
  var e = cl();
  return j0(e, w.memoizedState, l, t);
}, useTransition: function() {
  var l = Bu(Et)[0], t = cl().memoizedState;
  return [typeof l == "boolean" ? l : nu(l), t];
}, useSyncExternalStore: r0, useId: B0, useHostTransitionStatus: af, useFormState: cs, useActionState: cs, useOptimistic: function(l, t) {
  var e = cl();
  return b0(e, w, l, t);
}, useMemoCache: Ic, useCacheRefresh: R0 };
nf.useEffectEvent = E0;
var X0 = { readContext: xl, use: jn, useCallback: O0, useContext: xl, useEffect: lf, useImperativeHandle: N0, useInsertionEffect: A0, useLayoutEffect: _0, useMemo: M0, useReducer: ai, useRef: T0, useState: function() {
  return ai(Et);
}, useDebugValue: tf, useDeferredValue: function(l, t) {
  var e = cl();
  return w === null ? ef(e, l, t) : j0(e, w.memoizedState, l, t);
}, useTransition: function() {
  var l = ai(Et)[0], t = cl().memoizedState;
  return [typeof l == "boolean" ? l : nu(l), t];
}, useSyncExternalStore: r0, useId: B0, useHostTransitionStatus: af, useFormState: fs, useActionState: fs, useOptimistic: function(l, t) {
  var e = cl();
  return w !== null ? b0(e, w, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
}, useMemoCache: Ic, useCacheRefresh: R0 };
X0.useEffectEvent = E0;
function ui(l, t, e, a) {
  t = l.memoizedState, e = e(a, t), e = e == null ? t : P({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
}
var lc = { enqueueSetState: function(l, t, e) {
  l = l._reactInternals;
  var a = Ql(), u = Zt(a);
  u.payload = t, e != null && (u.callback = e), t = Lt(l, u, a), t !== null && (Ml(t, l, a), Oa(t, l, a));
}, enqueueReplaceState: function(l, t, e) {
  l = l._reactInternals;
  var a = Ql(), u = Zt(a);
  u.tag = 1, u.payload = t, e != null && (u.callback = e), t = Lt(l, u, a), t !== null && (Ml(t, l, a), Oa(t, l, a));
}, enqueueForceUpdate: function(l, t) {
  l = l._reactInternals;
  var e = Ql(), a = Zt(e);
  a.tag = 2, t != null && (a.callback = t), t = Lt(l, a, e), t !== null && (Ml(t, l, e), Oa(t, l, e));
} };
function os(l, t, e, a, u, n, i) {
  return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, i) : t.prototype && t.prototype.isPureReactComponent ? !Xa(e, a) || !Xa(u, n) : true;
}
function ds(l, t, e, a) {
  l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && lc.enqueueReplaceState(t, t.state, null);
}
function ge(l, t) {
  var e = t;
  if ("ref" in t) {
    e = {};
    for (var a in t) a !== "ref" && (e[a] = t[a]);
  }
  if (l = l.defaultProps) {
    e === t && (e = P({}, e));
    for (var u in l) e[u] === void 0 && (e[u] = l[u]);
  }
  return e;
}
function Z0(l) {
  $u(l);
}
function L0(l) {
  console.error(l);
}
function V0(l) {
  $u(l);
}
function un(l, t) {
  try {
    var e = l.onUncaughtError;
    e(t.value, { componentStack: t.stack });
  } catch (a) {
    setTimeout(function() {
      throw a;
    });
  }
}
function rs(l, t, e) {
  try {
    var a = l.onCaughtError;
    a(e.value, { componentStack: e.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
  } catch (u) {
    setTimeout(function() {
      throw u;
    });
  }
}
function tc(l, t, e) {
  return e = Zt(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
    un(l, t);
  }, e;
}
function K0(l) {
  return l = Zt(l), l.tag = 3, l;
}
function J0(l, t, e, a) {
  var u = e.type.getDerivedStateFromError;
  if (typeof u == "function") {
    var n = a.value;
    l.payload = function() {
      return u(n);
    }, l.callback = function() {
      rs(t, e, a);
    };
  }
  var i = e.stateNode;
  i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
    rs(t, e, a), typeof u != "function" && (Vt === null ? Vt = /* @__PURE__ */ new Set([this]) : Vt.add(this));
    var c = a.stack;
    this.componentDidCatch(a.value, { componentStack: c !== null ? c : "" });
  });
}
function wm(l, t, e, a, u) {
  if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
    if (t = e.alternate, t !== null && ca(t, e, u, true), e = Zl.current, e !== null) {
      switch (e.tag) {
        case 31:
        case 13:
          return Wl === null ? on() : e.alternate === null && al === 0 && (al = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === Pu ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), hi(l, a, u)), false;
        case 22:
          return e.flags |= 65536, a === Pu ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([a]) }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), hi(l, a, u)), false;
      }
      throw Error(S(435, e.tag));
    }
    return hi(l, a, u), on(), false;
  }
  if (G) return t = Zl.current, t !== null ? (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = u, a !== Zi && (l = Error(S(422), { cause: a }), La(kl(l, e)))) : (a !== Zi && (t = Error(S(423), { cause: a }), La(kl(t, e))), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, a = kl(a, e), u = tc(l.stateNode, a, u), ei(l, u), al !== 4 && (al = 2)), false;
  var n = Error(S(520), { cause: a });
  if (n = kl(n, e), Ba === null ? Ba = [n] : Ba.push(n), al !== 4 && (al = 2), t === null) return true;
  a = kl(a, e), e = t;
  do {
    switch (e.tag) {
      case 3:
        return e.flags |= 65536, l = u & -u, e.lanes |= l, l = tc(e.stateNode, a, l), ei(e, l), false;
      case 1:
        if (t = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (Vt === null || !Vt.has(n)))) return e.flags |= 65536, u &= -u, e.lanes |= u, u = K0(u), J0(u, l, e, a), ei(e, u), false;
    }
    e = e.return;
  } while (e !== null);
  return false;
}
var cf = Error(S(461)), dl = false;
function bl(l, t, e, a) {
  t.child = l === null ? i0(t, null, e, a) : he(t, l.child, e, a);
}
function ms(l, t, e, a, u) {
  e = e.render;
  var n = t.ref;
  if ("ref" in a) {
    var i = {};
    for (var c in a) c !== "ref" && (i[c] = a[c]);
  } else i = a;
  return ye(t), a = kc(l, t, e, i, n, u), c = $c(), l !== null && !dl ? (Wc(l, t, u), At(l, t, u)) : (G && c && Qc(t), t.flags |= 1, bl(l, t, a, u), t.child);
}
function ys(l, t, e, a, u) {
  if (l === null) {
    var n = e.type;
    return typeof n == "function" && !Gc(n) && n.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = n, w0(l, t, n, a, u)) : (l = Hu(e.type, null, a, t, t.mode, u), l.ref = t.ref, l.return = t, t.child = l);
  }
  if (n = l.child, !ff(l, u)) {
    var i = n.memoizedProps;
    if (e = e.compare, e = e !== null ? e : Xa, e(i, a) && l.ref === t.ref) return At(l, t, u);
  }
  return t.flags |= 1, l = St(n, a), l.ref = t.ref, l.return = t, t.child = l;
}
function w0(l, t, e, a, u) {
  if (l !== null) {
    var n = l.memoizedProps;
    if (Xa(n, a) && l.ref === t.ref) if (dl = false, t.pendingProps = a = n, ff(l, u)) l.flags & 131072 && (dl = true);
    else return t.lanes = l.lanes, At(l, t, u);
  }
  return ec(l, t, e, a, u);
}
function k0(l, t, e, a) {
  var u = a.children, n = l !== null ? l.memoizedState : null;
  if (l === null && t.stateNode === null && (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), a.mode === "hidden") {
    if (t.flags & 128) {
      if (n = n !== null ? n.baseLanes | e : e, l !== null) {
        for (a = t.child = l.child, u = 0; a !== null; ) u = u | a.lanes | a.childLanes, a = a.sibling;
        a = u & ~n;
      } else a = 0, t.child = null;
      return hs(l, t, n, e, a);
    }
    if (e & 536870912) t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Cu(t, n !== null ? n.cachePool : null), n !== null ? as(t, n) : $i(), s0(t);
    else return a = t.lanes = 536870912, hs(l, t, n !== null ? n.baseLanes | e : e, e, a);
  } else n !== null ? (Cu(t, n.cachePool), as(t, n), Ht(), t.memoizedState = null) : (l !== null && Cu(t, null), $i(), Ht());
  return bl(l, t, u, e), t.child;
}
function za(l, t) {
  return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), t.sibling;
}
function hs(l, t, e, a, u) {
  var n = Lc();
  return n = n === null ? null : { parent: ol._currentValue, pool: n }, t.memoizedState = { baseLanes: e, cachePool: n }, l !== null && Cu(t, null), $i(), s0(t), l !== null && ca(l, t, a, true), t.childLanes = u, null;
}
function Yu(l, t) {
  return t = nn({ mode: t.mode, children: t.children }, l.mode), t.ref = l.ref, l.child = t, t.return = l, t;
}
function vs(l, t, e) {
  return he(t, l.child, null, e), l = Yu(t, t.pendingProps), l.flags |= 2, Cl(t), t.memoizedState = null, l;
}
function km(l, t, e) {
  var a = t.pendingProps, u = (t.flags & 128) !== 0;
  if (t.flags &= -129, l === null) {
    if (G) {
      if (a.mode === "hidden") return l = Yu(t, a), t.lanes = 536870912, za(null, l);
      if (Wi(t), (l = F) ? (l = Qd(l, $l), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = { dehydrated: l, treeContext: $t !== null ? { id: at, overflow: ut } : null, retryLane: 536870912, hydrationErrors: null }, e = Po(l), e.return = t, t.child = e, pl = t, F = null)) : l = null, l === null) throw Wt(t);
      return t.lanes = 536870912, null;
    }
    return Yu(t, a);
  }
  var n = l.memoizedState;
  if (n !== null) {
    var i = n.dehydrated;
    if (Wi(t), u) if (t.flags & 256) t.flags &= -257, t = vs(l, t, e);
    else if (t.memoizedState !== null) t.child = l.child, t.flags |= 128, t = null;
    else throw Error(S(558));
    else if (dl || ca(l, t, e, false), u = (e & l.childLanes) !== 0, dl || u) {
      if (a = k, a !== null && (i = Ao(a, e), i !== 0 && i !== n.retryLane)) throw n.retryLane = i, xe(l, i), Ml(a, l, i), cf;
      on(), t = vs(l, t, e);
    } else l = n.treeContext, F = Fl(i.nextSibling), pl = t, G = true, Xt = null, $l = false, l !== null && t0(t, l), t = Yu(t, a), t.flags |= 4096;
    return t;
  }
  return l = St(l.child, { mode: a.mode, children: a.children }), l.ref = t.ref, t.child = l, l.return = t, l;
}
function qu(l, t) {
  var e = t.ref;
  if (e === null) l !== null && l.ref !== null && (t.flags |= 4194816);
  else {
    if (typeof e != "function" && typeof e != "object") throw Error(S(284));
    (l === null || l.ref !== e) && (t.flags |= 4194816);
  }
}
function ec(l, t, e, a, u) {
  return ye(t), e = kc(l, t, e, a, void 0, u), a = $c(), l !== null && !dl ? (Wc(l, t, u), At(l, t, u)) : (G && a && Qc(t), t.flags |= 1, bl(l, t, e, u), t.child);
}
function gs(l, t, e, a, u, n) {
  return ye(t), t.updateQueue = null, e = d0(t, a, e, u), o0(l), a = $c(), l !== null && !dl ? (Wc(l, t, n), At(l, t, n)) : (G && a && Qc(t), t.flags |= 1, bl(l, t, e, n), t.child);
}
function bs(l, t, e, a, u) {
  if (ye(t), t.stateNode === null) {
    var n = Re, i = e.contextType;
    typeof i == "object" && i !== null && (n = xl(i)), n = new e(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = lc, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, Kc(t), i = e.contextType, n.context = typeof i == "object" && i !== null ? xl(i) : Re, n.state = t.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (ui(t, e, i, a), n.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && lc.enqueueReplaceState(n, n.state, null), ja(t, a, n, u), Ma(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = true;
  } else if (l === null) {
    n = t.stateNode;
    var c = t.memoizedProps, f = ge(e, c);
    n.props = f;
    var r = n.context, m = e.contextType;
    i = Re, typeof m == "object" && m !== null && (i = xl(m));
    var h = e.getDerivedStateFromProps;
    m = typeof h == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, m || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || r !== i) && ds(t, n, a, i), Mt = false;
    var d = t.memoizedState;
    n.state = d, ja(t, a, n, u), Ma(), r = t.memoizedState, c || d !== r || Mt ? (typeof h == "function" && (ui(t, e, h, a), r = t.memoizedState), (f = Mt || os(t, e, f, a, d, r, i)) ? (m || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = r), n.props = a, n.state = r, n.context = i, a = f) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = false);
  } else {
    n = t.stateNode, wi(l, t), i = t.memoizedProps, m = ge(e, i), n.props = m, h = t.pendingProps, d = n.context, r = e.contextType, f = Re, typeof r == "object" && r !== null && (f = xl(r)), c = e.getDerivedStateFromProps, (r = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== h || d !== f) && ds(t, n, a, f), Mt = false, d = t.memoizedState, n.state = d, ja(t, a, n, u), Ma();
    var v = t.memoizedState;
    i !== h || d !== v || Mt || l !== null && l.dependencies !== null && Iu(l.dependencies) ? (typeof c == "function" && (ui(t, e, c, a), v = t.memoizedState), (m = Mt || os(t, e, m, a, d, v, f) || l !== null && l.dependencies !== null && Iu(l.dependencies)) ? (r || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, v, f), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(a, v, f)), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && d === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && d === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = v), n.props = a, n.state = v, n.context = f, a = m) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && d === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && d === l.memoizedState || (t.flags |= 1024), a = false);
  }
  return n = a, qu(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = he(t, l.child, null, u), t.child = he(t, null, e, u)) : bl(l, t, e, u), t.memoizedState = n.state, l = t.child) : l = At(l, t, u), l;
}
function Ss(l, t, e, a) {
  return me(), t.flags |= 256, bl(l, t, e, a), t.child;
}
var ni = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
function ii(l) {
  return { baseLanes: l, cachePool: a0() };
}
function ci(l, t, e) {
  return l = l !== null ? l.childLanes & ~e : 0, t && (l |= Rl), l;
}
function $0(l, t, e) {
  var a = t.pendingProps, u = false, n = (t.flags & 128) !== 0, i;
  if ((i = n) || (i = l !== null && l.memoizedState === null ? false : (il.current & 2) !== 0), i && (u = true, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
    if (G) {
      if (u ? Ut(t) : Ht(), (l = F) ? (l = Qd(l, $l), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = { dehydrated: l, treeContext: $t !== null ? { id: at, overflow: ut } : null, retryLane: 536870912, hydrationErrors: null }, e = Po(l), e.return = t, t.child = e, pl = t, F = null)) : l = null, l === null) throw Wt(t);
      return vc(l) ? t.lanes = 32 : t.lanes = 536870912, null;
    }
    var c = a.children;
    return a = a.fallback, u ? (Ht(), u = t.mode, c = nn({ mode: "hidden", children: c }, u), a = se(a, u, e, null), c.return = t, a.return = t, c.sibling = a, t.child = c, a = t.child, a.memoizedState = ii(e), a.childLanes = ci(l, i, e), t.memoizedState = ni, za(null, a)) : (Ut(t), ac(t, c));
  }
  var f = l.memoizedState;
  if (f !== null && (c = f.dehydrated, c !== null)) {
    if (n) t.flags & 256 ? (Ut(t), t.flags &= -257, t = fi(l, t, e)) : t.memoizedState !== null ? (Ht(), t.child = l.child, t.flags |= 128, t = null) : (Ht(), c = a.fallback, u = t.mode, a = nn({ mode: "visible", children: a.children }, u), c = se(c, u, e, null), c.flags |= 2, a.return = t, c.return = t, a.sibling = c, t.child = a, he(t, l.child, null, e), a = t.child, a.memoizedState = ii(e), a.childLanes = ci(l, i, e), t.memoizedState = ni, t = za(null, a));
    else if (Ut(t), vc(c)) {
      if (i = c.nextSibling && c.nextSibling.dataset, i) var r = i.dgst;
      i = r, a = Error(S(419)), a.stack = "", a.digest = i, La({ value: a, source: null, stack: null }), t = fi(l, t, e);
    } else if (dl || ca(l, t, e, false), i = (e & l.childLanes) !== 0, dl || i) {
      if (i = k, i !== null && (a = Ao(i, e), a !== 0 && a !== f.retryLane)) throw f.retryLane = a, xe(l, a), Ml(i, l, a), cf;
      hc(c) || on(), t = fi(l, t, e);
    } else hc(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = f.treeContext, F = Fl(c.nextSibling), pl = t, G = true, Xt = null, $l = false, l !== null && t0(t, l), t = ac(t, a.children), t.flags |= 4096);
    return t;
  }
  return u ? (Ht(), c = a.fallback, u = t.mode, f = l.child, r = f.sibling, a = St(f, { mode: "hidden", children: a.children }), a.subtreeFlags = f.subtreeFlags & 65011712, r !== null ? c = St(r, c) : (c = se(c, u, e, null), c.flags |= 2), c.return = t, a.return = t, a.sibling = c, t.child = a, za(null, a), a = t.child, c = l.child.memoizedState, c === null ? c = ii(e) : (u = c.cachePool, u !== null ? (f = ol._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = a0(), c = { baseLanes: c.baseLanes | e, cachePool: u }), a.memoizedState = c, a.childLanes = ci(l, i, e), t.memoizedState = ni, za(l.child, a)) : (Ut(t), e = l.child, l = e.sibling, e = St(e, { mode: "visible", children: a.children }), e.return = t, e.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = e, t.memoizedState = null, e);
}
function ac(l, t) {
  return t = nn({ mode: "visible", children: t }, l.mode), t.return = l, l.child = t;
}
function nn(l, t) {
  return l = Bl(22, l, null, t), l.lanes = 0, l;
}
function fi(l, t, e) {
  return he(t, l.child, null, e), l = ac(t, t.pendingProps.children), l.flags |= 2, t.memoizedState = null, l;
}
function ps(l, t, e) {
  l.lanes |= t;
  var a = l.alternate;
  a !== null && (a.lanes |= t), Vi(l.return, t, e);
}
function si(l, t, e, a, u, n) {
  var i = l.memoizedState;
  i === null ? l.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: a, tail: e, tailMode: u, treeForkCount: n } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = u, i.treeForkCount = n);
}
function W0(l, t, e) {
  var a = t.pendingProps, u = a.revealOrder, n = a.tail;
  a = a.children;
  var i = il.current, c = (i & 2) !== 0;
  if (c ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, $(il, i), bl(l, t, a, e), a = G ? Za : 0, !c && l !== null && l.flags & 128) l: for (l = t.child; l !== null; ) {
    if (l.tag === 13) l.memoizedState !== null && ps(l, e, t);
    else if (l.tag === 19) ps(l, e, t);
    else if (l.child !== null) {
      l.child.return = l, l = l.child;
      continue;
    }
    if (l === t) break l;
    for (; l.sibling === null; ) {
      if (l.return === null || l.return === t) break l;
      l = l.return;
    }
    l.sibling.return = l.return, l = l.sibling;
  }
  switch (u) {
    case "forwards":
      for (e = t.child, u = null; e !== null; ) l = e.alternate, l !== null && tn(l) === null && (u = e), e = e.sibling;
      e = u, e === null ? (u = t.child, t.child = null) : (u = e.sibling, e.sibling = null), si(t, false, u, e, n, a);
      break;
    case "backwards":
    case "unstable_legacy-backwards":
      for (e = null, u = t.child, t.child = null; u !== null; ) {
        if (l = u.alternate, l !== null && tn(l) === null) {
          t.child = u;
          break;
        }
        l = u.sibling, u.sibling = e, e = u, u = l;
      }
      si(t, true, e, null, n, a);
      break;
    case "together":
      si(t, false, null, null, void 0, a);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function At(l, t, e) {
  if (l !== null && (t.dependencies = l.dependencies), It |= t.lanes, !(e & t.childLanes)) if (l !== null) {
    if (ca(l, t, e, false), (e & t.childLanes) === 0) return null;
  } else return null;
  if (l !== null && t.child !== l.child) throw Error(S(153));
  if (t.child !== null) {
    for (l = t.child, e = St(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; ) l = l.sibling, e = e.sibling = St(l, l.pendingProps), e.return = t;
    e.sibling = null;
  }
  return t.child;
}
function ff(l, t) {
  return l.lanes & t ? true : (l = l.dependencies, !!(l !== null && Iu(l)));
}
function $m(l, t, e) {
  switch (t.tag) {
    case 3:
      Ku(t, t.stateNode.containerInfo), jt(t, ol, l.memoizedState.cache), me();
      break;
    case 27:
    case 5:
      ji(t);
      break;
    case 4:
      Ku(t, t.stateNode.containerInfo);
      break;
    case 10:
      jt(t, t.type, t.memoizedProps.value);
      break;
    case 31:
      if (t.memoizedState !== null) return t.flags |= 128, Wi(t), null;
      break;
    case 13:
      var a = t.memoizedState;
      if (a !== null) return a.dehydrated !== null ? (Ut(t), t.flags |= 128, null) : e & t.child.childLanes ? $0(l, t, e) : (Ut(t), l = At(l, t, e), l !== null ? l.sibling : null);
      Ut(t);
      break;
    case 19:
      var u = (l.flags & 128) !== 0;
      if (a = (e & t.childLanes) !== 0, a || (ca(l, t, e, false), a = (e & t.childLanes) !== 0), u) {
        if (a) return W0(l, t, e);
        t.flags |= 128;
      }
      if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), $(il, il.current), a) break;
      return null;
    case 22:
      return t.lanes = 0, k0(l, t, e, t.pendingProps);
    case 24:
      jt(t, ol, l.memoizedState.cache);
  }
  return At(l, t, e);
}
function F0(l, t, e) {
  if (l !== null) if (l.memoizedProps !== t.pendingProps) dl = true;
  else {
    if (!ff(l, e) && !(t.flags & 128)) return dl = false, $m(l, t, e);
    dl = !!(l.flags & 131072);
  }
  else dl = false, G && t.flags & 1048576 && l0(t, Za, t.index);
  switch (t.lanes = 0, t.tag) {
    case 16:
      l: {
        var a = t.pendingProps;
        if (l = ie(t.elementType), t.type = l, typeof l == "function") Gc(l) ? (a = ge(l, a), t.tag = 1, t = bs(null, t, l, a, e)) : (t.tag = 0, t = ec(null, t, l, a, e));
        else {
          if (l != null) {
            var u = l.$$typeof;
            if (u === Ac) {
              t.tag = 11, t = ms(null, t, l, a, e);
              break l;
            } else if (u === _c) {
              t.tag = 14, t = ys(null, t, l, a, e);
              break l;
            }
          }
          throw t = Oi(l) || l, Error(S(306, t, ""));
        }
      }
      return t;
    case 0:
      return ec(l, t, t.type, t.pendingProps, e);
    case 1:
      return a = t.type, u = ge(a, t.pendingProps), bs(l, t, a, u, e);
    case 3:
      l: {
        if (Ku(t, t.stateNode.containerInfo), l === null) throw Error(S(387));
        a = t.pendingProps;
        var n = t.memoizedState;
        u = n.element, wi(l, t), ja(t, a, null, e);
        var i = t.memoizedState;
        if (a = i.cache, jt(t, ol, a), a !== n.cache && Ki(t, [ol], e, true), Ma(), a = i.element, n.isDehydrated) if (n = { element: a, isDehydrated: false, cache: i.cache }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
          t = Ss(l, t, a, e);
          break l;
        } else if (a !== u) {
          u = kl(Error(S(424)), t), La(u), t = Ss(l, t, a, e);
          break l;
        } else {
          switch (l = t.stateNode.containerInfo, l.nodeType) {
            case 9:
              l = l.body;
              break;
            default:
              l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
          }
          for (F = Fl(l.firstChild), pl = t, G = true, Xt = null, $l = true, e = i0(t, null, a, e), t.child = e; e; ) e.flags = e.flags & -3 | 4096, e = e.sibling;
        }
        else {
          if (me(), a === u) {
            t = At(l, t, e);
            break l;
          }
          bl(l, t, a, e);
        }
        t = t.child;
      }
      return t;
    case 26:
      return qu(l, t), l === null ? (e = Qs(t.type, null, t.pendingProps, null)) ? t.memoizedState = e : G || (e = t.type, l = t.pendingProps, a = yn(Qt.current).createElement(e), a[Sl] = t, a[jl] = l, zl(a, e, l), vl(a), t.stateNode = a) : t.memoizedState = Qs(t.type, l.memoizedProps, t.pendingProps, l.memoizedState), null;
    case 27:
      return ji(t), l === null && G && (a = t.stateNode = Xd(t.type, t.pendingProps, Qt.current), pl = t, $l = true, u = F, le(t.type) ? (gc = u, F = Fl(a.firstChild)) : F = u), bl(l, t, t.pendingProps.children, e), qu(l, t), l === null && (t.flags |= 4194304), t.child;
    case 5:
      return l === null && G && ((u = a = F) && (a = Ay(a, t.type, t.pendingProps, $l), a !== null ? (t.stateNode = a, pl = t, F = Fl(a.firstChild), $l = false, u = true) : u = false), u || Wt(t)), ji(t), u = t.type, n = t.pendingProps, i = l !== null ? l.memoizedProps : null, a = n.children, mc(u, n) ? a = null : i !== null && mc(u, i) && (t.flags |= 32), t.memoizedState !== null && (u = kc(l, t, Qm, null, null, e), $a._currentValue = u), qu(l, t), bl(l, t, a, e), t.child;
    case 6:
      return l === null && G && ((l = e = F) && (e = _y(e, t.pendingProps, $l), e !== null ? (t.stateNode = e, pl = t, F = null, l = true) : l = false), l || Wt(t)), null;
    case 13:
      return $0(l, t, e);
    case 4:
      return Ku(t, t.stateNode.containerInfo), a = t.pendingProps, l === null ? t.child = he(t, null, a, e) : bl(l, t, a, e), t.child;
    case 11:
      return ms(l, t, t.type, t.pendingProps, e);
    case 7:
      return bl(l, t, t.pendingProps, e), t.child;
    case 8:
      return bl(l, t, t.pendingProps.children, e), t.child;
    case 12:
      return bl(l, t, t.pendingProps.children, e), t.child;
    case 10:
      return a = t.pendingProps, jt(t, t.type, a.value), bl(l, t, a.children, e), t.child;
    case 9:
      return u = t.type._context, a = t.pendingProps.children, ye(t), u = xl(u), a = a(u), t.flags |= 1, bl(l, t, a, e), t.child;
    case 14:
      return ys(l, t, t.type, t.pendingProps, e);
    case 15:
      return w0(l, t, t.type, t.pendingProps, e);
    case 19:
      return W0(l, t, e);
    case 31:
      return km(l, t, e);
    case 22:
      return k0(l, t, e, t.pendingProps);
    case 24:
      return ye(t), a = xl(ol), l === null ? (u = Lc(), u === null && (u = k, n = Zc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), t.memoizedState = { parent: a, cache: u }, Kc(t), jt(t, ol, u)) : (l.lanes & e && (wi(l, t), ja(t, null, null, e), Ma()), u = l.memoizedState, n = t.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), jt(t, ol, a)) : (a = n.cache, jt(t, ol, a), a !== u.cache && Ki(t, [ol], e, true))), bl(l, t, t.pendingProps.children, e), t.child;
    case 29:
      throw t.pendingProps;
  }
  throw Error(S(156, t.tag));
}
function ot(l) {
  l.flags |= 4;
}
function oi(l, t, e, a, u) {
  if ((t = (l.mode & 32) !== 0) && (t = false), t) {
    if (l.flags |= 16777216, (u & 335544128) === u) if (l.stateNode.complete) l.flags |= 8192;
    else if (xd()) l.flags |= 8192;
    else throw de = Pu, Vc;
  } else l.flags &= -16777217;
}
function xs(l, t) {
  if (t.type !== "stylesheet" || t.state.loading & 4) l.flags &= -16777217;
  else if (l.flags |= 16777216, !Vd(t)) if (xd()) l.flags |= 8192;
  else throw de = Pu, Vc;
}
function Tu(l, t) {
  t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? zo() : 536870912, l.lanes |= t, Pe |= t);
}
function va(l, t) {
  if (!G) switch (l.tailMode) {
    case "hidden":
      t = l.tail;
      for (var e = null; t !== null; ) t.alternate !== null && (e = t), t = t.sibling;
      e === null ? l.tail = null : e.sibling = null;
      break;
    case "collapsed":
      e = l.tail;
      for (var a = null; e !== null; ) e.alternate !== null && (a = e), e = e.sibling;
      a === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : a.sibling = null;
  }
}
function W(l) {
  var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
  if (t) for (var u = l.child; u !== null; ) e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = l, u = u.sibling;
  else for (u = l.child; u !== null; ) e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = l, u = u.sibling;
  return l.subtreeFlags |= a, l.childLanes = e, t;
}
function Wm(l, t, e) {
  var a = t.pendingProps;
  switch (Xc(t), t.tag) {
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return W(t), null;
    case 1:
      return W(t), null;
    case 3:
      return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), pt(ol), we(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (Te(t) ? ot(t) : l === null || l.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ti())), W(t), null;
    case 26:
      var u = t.type, n = t.memoizedState;
      return l === null ? (ot(t), n !== null ? (W(t), xs(t, n)) : (W(t), oi(t, u, null, a, e))) : n ? n !== l.memoizedState ? (ot(t), W(t), xs(t, n)) : (W(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && ot(t), W(t), oi(t, u, l, a, e)), null;
    case 27:
      if (Ju(t), e = Qt.current, u = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && ot(t);
      else {
        if (!a) {
          if (t.stateNode === null) throw Error(S(166));
          return W(t), null;
        }
        l = it.current, Te(t) ? Wf(t) : (l = Xd(u, a, e), t.stateNode = l, ot(t));
      }
      return W(t), null;
    case 5:
      if (Ju(t), u = t.type, l !== null && t.stateNode != null) l.memoizedProps !== a && ot(t);
      else {
        if (!a) {
          if (t.stateNode === null) throw Error(S(166));
          return W(t), null;
        }
        if (n = it.current, Te(t)) Wf(t);
        else {
          var i = yn(Qt.current);
          switch (n) {
            case 1:
              n = i.createElementNS("http://www.w3.org/2000/svg", u);
              break;
            case 2:
              n = i.createElementNS("http://www.w3.org/1998/Math/MathML", u);
              break;
            default:
              switch (u) {
                case "svg":
                  n = i.createElementNS("http://www.w3.org/2000/svg", u);
                  break;
                case "math":
                  n = i.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                  break;
                case "script":
                  n = i.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild);
                  break;
                case "select":
                  n = typeof a.is == "string" ? i.createElement("select", { is: a.is }) : i.createElement("select"), a.multiple ? n.multiple = true : a.size && (n.size = a.size);
                  break;
                default:
                  n = typeof a.is == "string" ? i.createElement(u, { is: a.is }) : i.createElement(u);
              }
          }
          n[Sl] = t, n[jl] = a;
          l: for (i = t.child; i !== null; ) {
            if (i.tag === 5 || i.tag === 6) n.appendChild(i.stateNode);
            else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
              i.child.return = i, i = i.child;
              continue;
            }
            if (i === t) break l;
            for (; i.sibling === null; ) {
              if (i.return === null || i.return === t) break l;
              i = i.return;
            }
            i.sibling.return = i.return, i = i.sibling;
          }
          t.stateNode = n;
          l: switch (zl(n, u, a), u) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              a = !!a.autoFocus;
              break l;
            case "img":
              a = true;
              break l;
            default:
              a = false;
          }
          a && ot(t);
        }
      }
      return W(t), oi(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, e), null;
    case 6:
      if (l && t.stateNode != null) l.memoizedProps !== a && ot(t);
      else {
        if (typeof a != "string" && t.stateNode === null) throw Error(S(166));
        if (l = Qt.current, Te(t)) {
          if (l = t.stateNode, e = t.memoizedProps, a = null, u = pl, u !== null) switch (u.tag) {
            case 27:
            case 5:
              a = u.memoizedProps;
          }
          l[Sl] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === true || Yd(l.nodeValue, e)), l || Wt(t, true);
        } else l = yn(l).createTextNode(a), l[Sl] = t, t.stateNode = l;
      }
      return W(t), null;
    case 31:
      if (e = t.memoizedState, l === null || l.memoizedState !== null) {
        if (a = Te(t), e !== null) {
          if (l === null) {
            if (!a) throw Error(S(318));
            if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(S(557));
            l[Sl] = t;
          } else me(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          W(t), l = false;
        } else e = ti(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = true;
        if (!l) return t.flags & 256 ? (Cl(t), t) : (Cl(t), null);
        if (t.flags & 128) throw Error(S(558));
      }
      return W(t), null;
    case 13:
      if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
        if (u = Te(t), a !== null && a.dehydrated !== null) {
          if (l === null) {
            if (!u) throw Error(S(318));
            if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(S(317));
            u[Sl] = t;
          } else me(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          W(t), u = false;
        } else u = ti(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = true;
        if (!u) return t.flags & 256 ? (Cl(t), t) : (Cl(t), null);
      }
      return Cl(t), t.flags & 128 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), Tu(t, t.updateQueue), W(t), null);
    case 4:
      return we(), l === null && hf(t.stateNode.containerInfo), W(t), null;
    case 10:
      return pt(t.type), W(t), null;
    case 19:
      if (gl(il), a = t.memoizedState, a === null) return W(t), null;
      if (u = (t.flags & 128) !== 0, n = a.rendering, n === null) if (u) va(a, false);
      else {
        if (al !== 0 || l !== null && l.flags & 128) for (l = t.child; l !== null; ) {
          if (n = tn(l), n !== null) {
            for (t.flags |= 128, va(a, false), l = n.updateQueue, t.updateQueue = l, Tu(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; ) Io(e, l), e = e.sibling;
            return $(il, il.current & 1 | 2), G && yt(t, a.treeForkCount), t.child;
          }
          l = l.sibling;
        }
        a.tail !== null && Yl() > fn && (t.flags |= 128, u = true, va(a, false), t.lanes = 4194304);
      }
      else {
        if (!u) if (l = tn(n), l !== null) {
          if (t.flags |= 128, u = true, l = l.updateQueue, t.updateQueue = l, Tu(t, l), va(a, true), a.tail === null && a.tailMode === "hidden" && !n.alternate && !G) return W(t), null;
        } else 2 * Yl() - a.renderingStartTime > fn && e !== 536870912 && (t.flags |= 128, u = true, va(a, false), t.lanes = 4194304);
        a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
      }
      return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = Yl(), l.sibling = null, e = il.current, $(il, u ? e & 1 | 2 : e & 1), G && yt(t, a.treeForkCount), l) : (W(t), null);
    case 22:
    case 23:
      return Cl(t), Jc(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? e & 536870912 && !(t.flags & 128) && (W(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : W(t), e = t.updateQueue, e !== null && Tu(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && gl(oe), null;
    case 24:
      return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), pt(ol), W(t), null;
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(S(156, t.tag));
}
function Fm(l, t) {
  switch (Xc(t), t.tag) {
    case 1:
      return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 3:
      return pt(ol), we(), l = t.flags, l & 65536 && !(l & 128) ? (t.flags = l & -65537 | 128, t) : null;
    case 26:
    case 27:
    case 5:
      return Ju(t), null;
    case 31:
      if (t.memoizedState !== null) {
        if (Cl(t), t.alternate === null) throw Error(S(340));
        me();
      }
      return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 13:
      if (Cl(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
        if (t.alternate === null) throw Error(S(340));
        me();
      }
      return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 19:
      return gl(il), null;
    case 4:
      return we(), null;
    case 10:
      return pt(t.type), null;
    case 22:
    case 23:
      return Cl(t), Jc(), l !== null && gl(oe), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 24:
      return pt(ol), null;
    case 25:
      return null;
    default:
      return null;
  }
}
function I0(l, t) {
  switch (Xc(t), t.tag) {
    case 3:
      pt(ol), we();
      break;
    case 26:
    case 27:
    case 5:
      Ju(t);
      break;
    case 4:
      we();
      break;
    case 31:
      t.memoizedState !== null && Cl(t);
      break;
    case 13:
      Cl(t);
      break;
    case 19:
      gl(il);
      break;
    case 10:
      pt(t.type);
      break;
    case 22:
    case 23:
      Cl(t), Jc(), l !== null && gl(oe);
      break;
    case 24:
      pt(ol);
  }
}
function iu(l, t) {
  try {
    var e = t.updateQueue, a = e !== null ? e.lastEffect : null;
    if (a !== null) {
      var u = a.next;
      e = u;
      do {
        if ((e.tag & l) === l) {
          a = void 0;
          var n = e.create, i = e.inst;
          a = n(), i.destroy = a;
        }
        e = e.next;
      } while (e !== u);
    }
  } catch (c) {
    K(t, t.return, c);
  }
}
function Ft(l, t, e) {
  try {
    var a = t.updateQueue, u = a !== null ? a.lastEffect : null;
    if (u !== null) {
      var n = u.next;
      a = n;
      do {
        if ((a.tag & l) === l) {
          var i = a.inst, c = i.destroy;
          if (c !== void 0) {
            i.destroy = void 0, u = t;
            var f = e, r = c;
            try {
              r();
            } catch (m) {
              K(u, f, m);
            }
          }
        }
        a = a.next;
      } while (a !== n);
    }
  } catch (m) {
    K(t, t.return, m);
  }
}
function P0(l) {
  var t = l.updateQueue;
  if (t !== null) {
    var e = l.stateNode;
    try {
      f0(t, e);
    } catch (a) {
      K(l, l.return, a);
    }
  }
}
function ld(l, t, e) {
  e.props = ge(l.type, l.memoizedProps), e.state = l.memoizedState;
  try {
    e.componentWillUnmount();
  } catch (a) {
    K(l, t, a);
  }
}
function Ha(l, t) {
  try {
    var e = l.ref;
    if (e !== null) {
      switch (l.tag) {
        case 26:
        case 27:
        case 5:
          var a = l.stateNode;
          break;
        case 30:
          a = l.stateNode;
          break;
        default:
          a = l.stateNode;
      }
      typeof e == "function" ? l.refCleanup = e(a) : e.current = a;
    }
  } catch (u) {
    K(l, t, u);
  }
}
function nt(l, t) {
  var e = l.ref, a = l.refCleanup;
  if (e !== null) if (typeof a == "function") try {
    a();
  } catch (u) {
    K(l, t, u);
  } finally {
    l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
  }
  else if (typeof e == "function") try {
    e(null);
  } catch (u) {
    K(l, t, u);
  }
  else e.current = null;
}
function td(l) {
  var t = l.type, e = l.memoizedProps, a = l.stateNode;
  try {
    l: switch (t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        e.autoFocus && a.focus();
        break l;
      case "img":
        e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
    }
  } catch (u) {
    K(l, l.return, u);
  }
}
function di(l, t, e) {
  try {
    var a = l.stateNode;
    Sy(a, l.type, e, t), a[jl] = t;
  } catch (u) {
    K(l, l.return, u);
  }
}
function ed(l) {
  return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && le(l.type) || l.tag === 4;
}
function ri(l) {
  l: for (; ; ) {
    for (; l.sibling === null; ) {
      if (l.return === null || ed(l.return)) return null;
      l = l.return;
    }
    for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
      if (l.tag === 27 && le(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
      l.child.return = l, l = l.child;
    }
    if (!(l.flags & 2)) return l.stateNode;
  }
}
function uc(l, t, e) {
  var a = l.tag;
  if (a === 5 || a === 6) l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = gt));
  else if (a !== 4 && (a === 27 && le(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null)) for (uc(l, t, e), l = l.sibling; l !== null; ) uc(l, t, e), l = l.sibling;
}
function cn(l, t, e) {
  var a = l.tag;
  if (a === 5 || a === 6) l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
  else if (a !== 4 && (a === 27 && le(l.type) && (e = l.stateNode), l = l.child, l !== null)) for (cn(l, t, e), l = l.sibling; l !== null; ) cn(l, t, e), l = l.sibling;
}
function ad(l) {
  var t = l.stateNode, e = l.memoizedProps;
  try {
    for (var a = l.type, u = t.attributes; u.length; ) t.removeAttributeNode(u[0]);
    zl(t, a, e), t[Sl] = l, t[jl] = e;
  } catch (n) {
    K(l, l.return, n);
  }
}
var ht = false, sl = false, mi = false, zs = typeof WeakSet == "function" ? WeakSet : Set, hl = null;
function Im(l, t) {
  if (l = l.containerInfo, dc = bn, l = Vo(l), Rc(l)) {
    if ("selectionStart" in l) var e = { start: l.selectionStart, end: l.selectionEnd };
    else l: {
      e = (e = l.ownerDocument) && e.defaultView || window;
      var a = e.getSelection && e.getSelection();
      if (a && a.rangeCount !== 0) {
        e = a.anchorNode;
        var u = a.anchorOffset, n = a.focusNode;
        a = a.focusOffset;
        try {
          e.nodeType, n.nodeType;
        } catch {
          e = null;
          break l;
        }
        var i = 0, c = -1, f = -1, r = 0, m = 0, h = l, d = null;
        t: for (; ; ) {
          for (var v; h !== e || u !== 0 && h.nodeType !== 3 || (c = i + u), h !== n || a !== 0 && h.nodeType !== 3 || (f = i + a), h.nodeType === 3 && (i += h.nodeValue.length), (v = h.firstChild) !== null; ) d = h, h = v;
          for (; ; ) {
            if (h === l) break t;
            if (d === e && ++r === u && (c = i), d === n && ++m === a && (f = i), (v = h.nextSibling) !== null) break;
            h = d, d = h.parentNode;
          }
          h = v;
        }
        e = c === -1 || f === -1 ? null : { start: c, end: f };
      } else e = null;
    }
    e = e || { start: 0, end: 0 };
  } else e = null;
  for (rc = { focusedElem: l, selectionRange: e }, bn = false, hl = t; hl !== null; ) if (t = hl, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null) l.return = t, hl = l;
  else for (; hl !== null; ) {
    switch (t = hl, n = t.alternate, l = t.flags, t.tag) {
      case 0:
        if (l & 4 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null)) for (e = 0; e < l.length; e++) u = l[e], u.ref.impl = u.nextImpl;
        break;
      case 11:
      case 15:
        break;
      case 1:
        if (l & 1024 && n !== null) {
          l = void 0, e = t, u = n.memoizedProps, n = n.memoizedState, a = e.stateNode;
          try {
            var p = ge(e.type, u);
            l = a.getSnapshotBeforeUpdate(p, n), a.__reactInternalSnapshotBeforeUpdate = l;
          } catch (x) {
            K(e, e.return, x);
          }
        }
        break;
      case 3:
        if (l & 1024) {
          if (l = t.stateNode.containerInfo, e = l.nodeType, e === 9) yc(l);
          else if (e === 1) switch (l.nodeName) {
            case "HEAD":
            case "HTML":
            case "BODY":
              yc(l);
              break;
            default:
              l.textContent = "";
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
        if (l & 1024) throw Error(S(163));
    }
    if (l = t.sibling, l !== null) {
      l.return = t.return, hl = l;
      break;
    }
    hl = t.return;
  }
}
function ud(l, t, e) {
  var a = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 15:
      rt(l, e), a & 4 && iu(5, e);
      break;
    case 1:
      if (rt(l, e), a & 4) if (l = e.stateNode, t === null) try {
        l.componentDidMount();
      } catch (i) {
        K(e, e.return, i);
      }
      else {
        var u = ge(e.type, t.memoizedProps);
        t = t.memoizedState;
        try {
          l.componentDidUpdate(u, t, l.__reactInternalSnapshotBeforeUpdate);
        } catch (i) {
          K(e, e.return, i);
        }
      }
      a & 64 && P0(e), a & 512 && Ha(e, e.return);
      break;
    case 3:
      if (rt(l, e), a & 64 && (l = e.updateQueue, l !== null)) {
        if (t = null, e.child !== null) switch (e.child.tag) {
          case 27:
          case 5:
            t = e.child.stateNode;
            break;
          case 1:
            t = e.child.stateNode;
        }
        try {
          f0(l, t);
        } catch (i) {
          K(e, e.return, i);
        }
      }
      break;
    case 27:
      t === null && a & 4 && ad(e);
    case 26:
    case 5:
      rt(l, e), t === null && a & 4 && td(e), a & 512 && Ha(e, e.return);
      break;
    case 12:
      rt(l, e);
      break;
    case 31:
      rt(l, e), a & 4 && cd(l, e);
      break;
    case 13:
      rt(l, e), a & 4 && fd(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = cy.bind(null, e), Dy(l, e))));
      break;
    case 22:
      if (a = e.memoizedState !== null || ht, !a) {
        t = t !== null && t.memoizedState !== null || sl, u = ht;
        var n = sl;
        ht = a, (sl = t) && !n ? mt(l, e, (e.subtreeFlags & 8772) !== 0) : rt(l, e), ht = u, sl = n;
      }
      break;
    case 30:
      break;
    default:
      rt(l, e);
  }
}
function nd(l) {
  var t = l.alternate;
  t !== null && (l.alternate = null, nd(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Mc(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
}
var ll = null, Nl = false;
function dt(l, t, e) {
  for (e = e.child; e !== null; ) id(l, t, e), e = e.sibling;
}
function id(l, t, e) {
  if (ql && typeof ql.onCommitFiberUnmount == "function") try {
    ql.onCommitFiberUnmount(Pa, e);
  } catch {
  }
  switch (e.tag) {
    case 26:
      sl || nt(e, t), dt(l, t, e), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
      break;
    case 27:
      sl || nt(e, t);
      var a = ll, u = Nl;
      le(e.type) && (ll = e.stateNode, Nl = false), dt(l, t, e), Ya(e.stateNode), ll = a, Nl = u;
      break;
    case 5:
      sl || nt(e, t);
    case 6:
      if (a = ll, u = Nl, ll = null, dt(l, t, e), ll = a, Nl = u, ll !== null) if (Nl) try {
        (ll.nodeType === 9 ? ll.body : ll.nodeName === "HTML" ? ll.ownerDocument.body : ll).removeChild(e.stateNode);
      } catch (n) {
        K(e, t, n);
      }
      else try {
        ll.removeChild(e.stateNode);
      } catch (n) {
        K(e, t, n);
      }
      break;
    case 18:
      ll !== null && (Nl ? (l = ll, Bs(l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.stateNode), aa(l)) : Bs(ll, e.stateNode));
      break;
    case 4:
      a = ll, u = Nl, ll = e.stateNode.containerInfo, Nl = true, dt(l, t, e), ll = a, Nl = u;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      Ft(2, e, t), sl || Ft(4, e, t), dt(l, t, e);
      break;
    case 1:
      sl || (nt(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && ld(e, t, a)), dt(l, t, e);
      break;
    case 21:
      dt(l, t, e);
      break;
    case 22:
      sl = (a = sl) || e.memoizedState !== null, dt(l, t, e), sl = a;
      break;
    default:
      dt(l, t, e);
  }
}
function cd(l, t) {
  if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
    l = l.dehydrated;
    try {
      aa(l);
    } catch (e) {
      K(t, t.return, e);
    }
  }
}
function fd(l, t) {
  if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null)))) try {
    aa(l);
  } catch (e) {
    K(t, t.return, e);
  }
}
function Pm(l) {
  switch (l.tag) {
    case 31:
    case 13:
    case 19:
      var t = l.stateNode;
      return t === null && (t = l.stateNode = new zs()), t;
    case 22:
      return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new zs()), t;
    default:
      throw Error(S(435, l.tag));
  }
}
function Eu(l, t) {
  var e = Pm(l);
  t.forEach(function(a) {
    if (!e.has(a)) {
      e.add(a);
      var u = fy.bind(null, l, a);
      a.then(u, u);
    }
  });
}
function _l(l, t) {
  var e = t.deletions;
  if (e !== null) for (var a = 0; a < e.length; a++) {
    var u = e[a], n = l, i = t, c = i;
    l: for (; c !== null; ) {
      switch (c.tag) {
        case 27:
          if (le(c.type)) {
            ll = c.stateNode, Nl = false;
            break l;
          }
          break;
        case 5:
          ll = c.stateNode, Nl = false;
          break l;
        case 3:
        case 4:
          ll = c.stateNode.containerInfo, Nl = true;
          break l;
      }
      c = c.return;
    }
    if (ll === null) throw Error(S(160));
    id(n, i, u), ll = null, Nl = false, n = u.alternate, n !== null && (n.return = null), u.return = null;
  }
  if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) sd(t, l), t = t.sibling;
}
var lt = null;
function sd(l, t) {
  var e = l.alternate, a = l.flags;
  switch (l.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      _l(t, l), Dl(l), a & 4 && (Ft(3, l, l.return), iu(3, l), Ft(5, l, l.return));
      break;
    case 1:
      _l(t, l), Dl(l), a & 512 && (sl || e === null || nt(e, e.return)), a & 64 && ht && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
      break;
    case 26:
      var u = lt;
      if (_l(t, l), Dl(l), a & 512 && (sl || e === null || nt(e, e.return)), a & 4) {
        var n = e !== null ? e.memoizedState : null;
        if (a = l.memoizedState, e === null) if (a === null) if (l.stateNode === null) {
          l: {
            a = l.type, e = l.memoizedProps, u = u.ownerDocument || u;
            t: switch (a) {
              case "title":
                n = u.getElementsByTagName("title")[0], (!n || n[eu] || n[Sl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(n, u.querySelector("head > title"))), zl(n, a, e), n[Sl] = l, vl(n), a = n;
                break l;
              case "link":
                var i = Zs("link", "href", u).get(a + (e.href || ""));
                if (i) {
                  for (var c = 0; c < i.length; c++) if (n = i[c], n.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && n.getAttribute("rel") === (e.rel == null ? null : e.rel) && n.getAttribute("title") === (e.title == null ? null : e.title) && n.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                    i.splice(c, 1);
                    break t;
                  }
                }
                n = u.createElement(a), zl(n, a, e), u.head.appendChild(n);
                break;
              case "meta":
                if (i = Zs("meta", "content", u).get(a + (e.content || ""))) {
                  for (c = 0; c < i.length; c++) if (n = i[c], n.getAttribute("content") === (e.content == null ? null : "" + e.content) && n.getAttribute("name") === (e.name == null ? null : e.name) && n.getAttribute("property") === (e.property == null ? null : e.property) && n.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && n.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                    i.splice(c, 1);
                    break t;
                  }
                }
                n = u.createElement(a), zl(n, a, e), u.head.appendChild(n);
                break;
              default:
                throw Error(S(468, a));
            }
            n[Sl] = l, vl(n), a = n;
          }
          l.stateNode = a;
        } else Ls(u, l.type, l.stateNode);
        else l.stateNode = Xs(u, a, l.memoizedProps);
        else n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? Ls(u, l.type, l.stateNode) : Xs(u, a, l.memoizedProps)) : a === null && l.stateNode !== null && di(l, l.memoizedProps, e.memoizedProps);
      }
      break;
    case 27:
      _l(t, l), Dl(l), a & 512 && (sl || e === null || nt(e, e.return)), e !== null && a & 4 && di(l, l.memoizedProps, e.memoizedProps);
      break;
    case 5:
      if (_l(t, l), Dl(l), a & 512 && (sl || e === null || nt(e, e.return)), l.flags & 32) {
        u = l.stateNode;
        try {
          $e(u, "");
        } catch (p) {
          K(l, l.return, p);
        }
      }
      a & 4 && l.stateNode != null && (u = l.memoizedProps, di(l, u, e !== null ? e.memoizedProps : u)), a & 1024 && (mi = true);
      break;
    case 6:
      if (_l(t, l), Dl(l), a & 4) {
        if (l.stateNode === null) throw Error(S(162));
        a = l.memoizedProps, e = l.stateNode;
        try {
          e.nodeValue = a;
        } catch (p) {
          K(l, l.return, p);
        }
      }
      break;
    case 3:
      if (Xu = null, u = lt, lt = hn(t.containerInfo), _l(t, l), lt = u, Dl(l), a & 4 && e !== null && e.memoizedState.isDehydrated) try {
        aa(t.containerInfo);
      } catch (p) {
        K(l, l.return, p);
      }
      mi && (mi = false, od(l));
      break;
    case 4:
      a = lt, lt = hn(l.stateNode.containerInfo), _l(t, l), Dl(l), lt = a;
      break;
    case 12:
      _l(t, l), Dl(l);
      break;
    case 31:
      _l(t, l), Dl(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Eu(l, a)));
      break;
    case 13:
      _l(t, l), Dl(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Cn = Yl()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Eu(l, a)));
      break;
    case 22:
      u = l.memoizedState !== null;
      var f = e !== null && e.memoizedState !== null, r = ht, m = sl;
      if (ht = r || u, sl = m || f, _l(t, l), sl = m, ht = r, Dl(l), a & 8192) l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (e === null || f || ht || sl || ce(l)), e = null, t = l; ; ) {
        if (t.tag === 5 || t.tag === 26) {
          if (e === null) {
            f = e = t;
            try {
              if (n = f.stateNode, u) i = n.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
              else {
                c = f.stateNode;
                var h = f.memoizedProps.style, d = h != null && h.hasOwnProperty("display") ? h.display : null;
                c.style.display = d == null || typeof d == "boolean" ? "" : ("" + d).trim();
              }
            } catch (p) {
              K(f, f.return, p);
            }
          }
        } else if (t.tag === 6) {
          if (e === null) {
            f = t;
            try {
              f.stateNode.nodeValue = u ? "" : f.memoizedProps;
            } catch (p) {
              K(f, f.return, p);
            }
          }
        } else if (t.tag === 18) {
          if (e === null) {
            f = t;
            try {
              var v = f.stateNode;
              u ? Rs(v, true) : Rs(f.stateNode, false);
            } catch (p) {
              K(f, f.return, p);
            }
          }
        } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === l) break l;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) break l;
          e === t && (e = null), t = t.return;
        }
        e === t && (e = null), t.sibling.return = t.return, t = t.sibling;
      }
      a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, Eu(l, e))));
      break;
    case 19:
      _l(t, l), Dl(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Eu(l, a)));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      _l(t, l), Dl(l);
  }
}
function Dl(l) {
  var t = l.flags;
  if (t & 2) {
    try {
      for (var e, a = l.return; a !== null; ) {
        if (ed(a)) {
          e = a;
          break;
        }
        a = a.return;
      }
      if (e == null) throw Error(S(160));
      switch (e.tag) {
        case 27:
          var u = e.stateNode, n = ri(l);
          cn(l, n, u);
          break;
        case 5:
          var i = e.stateNode;
          e.flags & 32 && ($e(i, ""), e.flags &= -33);
          var c = ri(l);
          cn(l, c, i);
          break;
        case 3:
        case 4:
          var f = e.stateNode.containerInfo, r = ri(l);
          uc(l, r, f);
          break;
        default:
          throw Error(S(161));
      }
    } catch (m) {
      K(l, l.return, m);
    }
    l.flags &= -3;
  }
  t & 4096 && (l.flags &= -4097);
}
function od(l) {
  if (l.subtreeFlags & 1024) for (l = l.child; l !== null; ) {
    var t = l;
    od(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
  }
}
function rt(l, t) {
  if (t.subtreeFlags & 8772) for (t = t.child; t !== null; ) ud(l, t.alternate, t), t = t.sibling;
}
function ce(l) {
  for (l = l.child; l !== null; ) {
    var t = l;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ft(4, t, t.return), ce(t);
        break;
      case 1:
        nt(t, t.return);
        var e = t.stateNode;
        typeof e.componentWillUnmount == "function" && ld(t, t.return, e), ce(t);
        break;
      case 27:
        Ya(t.stateNode);
      case 26:
      case 5:
        nt(t, t.return), ce(t);
        break;
      case 22:
        t.memoizedState === null && ce(t);
        break;
      case 30:
        ce(t);
        break;
      default:
        ce(t);
    }
    l = l.sibling;
  }
}
function mt(l, t, e) {
  for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
    var a = t.alternate, u = l, n = t, i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        mt(u, n, e), iu(4, n);
        break;
      case 1:
        if (mt(u, n, e), a = n, u = a.stateNode, typeof u.componentDidMount == "function") try {
          u.componentDidMount();
        } catch (r) {
          K(a, a.return, r);
        }
        if (a = n, u = a.updateQueue, u !== null) {
          var c = a.stateNode;
          try {
            var f = u.shared.hiddenCallbacks;
            if (f !== null) for (u.shared.hiddenCallbacks = null, u = 0; u < f.length; u++) c0(f[u], c);
          } catch (r) {
            K(a, a.return, r);
          }
        }
        e && i & 64 && P0(n), Ha(n, n.return);
        break;
      case 27:
        ad(n);
      case 26:
      case 5:
        mt(u, n, e), e && a === null && i & 4 && td(n), Ha(n, n.return);
        break;
      case 12:
        mt(u, n, e);
        break;
      case 31:
        mt(u, n, e), e && i & 4 && cd(u, n);
        break;
      case 13:
        mt(u, n, e), e && i & 4 && fd(u, n);
        break;
      case 22:
        n.memoizedState === null && mt(u, n, e), Ha(n, n.return);
        break;
      case 30:
        break;
      default:
        mt(u, n, e);
    }
    t = t.sibling;
  }
}
function sf(l, t) {
  var e = null;
  l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && uu(e));
}
function of(l, t) {
  l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && uu(l));
}
function Pl(l, t, e, a) {
  if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) dd(l, t, e, a), t = t.sibling;
}
function dd(l, t, e, a) {
  var u = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      Pl(l, t, e, a), u & 2048 && iu(9, t);
      break;
    case 1:
      Pl(l, t, e, a);
      break;
    case 3:
      Pl(l, t, e, a), u & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && uu(l)));
      break;
    case 12:
      if (u & 2048) {
        Pl(l, t, e, a), l = t.stateNode;
        try {
          var n = t.memoizedProps, i = n.id, c = n.onPostCommit;
          typeof c == "function" && c(i, t.alternate === null ? "mount" : "update", l.passiveEffectDuration, -0);
        } catch (f) {
          K(t, t.return, f);
        }
      } else Pl(l, t, e, a);
      break;
    case 31:
      Pl(l, t, e, a);
      break;
    case 13:
      Pl(l, t, e, a);
      break;
    case 23:
      break;
    case 22:
      n = t.stateNode, i = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Pl(l, t, e, a) : Ca(l, t) : n._visibility & 2 ? Pl(l, t, e, a) : (n._visibility |= 2, _e(l, t, e, a, (t.subtreeFlags & 10256) !== 0 || false)), u & 2048 && sf(i, t);
      break;
    case 24:
      Pl(l, t, e, a), u & 2048 && of(t.alternate, t);
      break;
    default:
      Pl(l, t, e, a);
  }
}
function _e(l, t, e, a, u) {
  for (u = u && ((t.subtreeFlags & 10256) !== 0 || false), t = t.child; t !== null; ) {
    var n = l, i = t, c = e, f = a, r = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        _e(n, i, c, f, u), iu(8, i);
        break;
      case 23:
        break;
      case 22:
        var m = i.stateNode;
        i.memoizedState !== null ? m._visibility & 2 ? _e(n, i, c, f, u) : Ca(n, i) : (m._visibility |= 2, _e(n, i, c, f, u)), u && r & 2048 && sf(i.alternate, i);
        break;
      case 24:
        _e(n, i, c, f, u), u && r & 2048 && of(i.alternate, i);
        break;
      default:
        _e(n, i, c, f, u);
    }
    t = t.sibling;
  }
}
function Ca(l, t) {
  if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) {
    var e = l, a = t, u = a.flags;
    switch (a.tag) {
      case 22:
        Ca(e, a), u & 2048 && sf(a.alternate, a);
        break;
      case 24:
        Ca(e, a), u & 2048 && of(a.alternate, a);
        break;
      default:
        Ca(e, a);
    }
    t = t.sibling;
  }
}
var Ta = 8192;
function Ee(l, t, e) {
  if (l.subtreeFlags & Ta) for (l = l.child; l !== null; ) rd(l, t, e), l = l.sibling;
}
function rd(l, t, e) {
  switch (l.tag) {
    case 26:
      Ee(l, t, e), l.flags & Ta && l.memoizedState !== null && Gy(e, lt, l.memoizedState, l.memoizedProps);
      break;
    case 5:
      Ee(l, t, e);
      break;
    case 3:
    case 4:
      var a = lt;
      lt = hn(l.stateNode.containerInfo), Ee(l, t, e), lt = a;
      break;
    case 22:
      l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = Ta, Ta = 16777216, Ee(l, t, e), Ta = a) : Ee(l, t, e));
      break;
    default:
      Ee(l, t, e);
  }
}
function md(l) {
  var t = l.alternate;
  if (t !== null && (l = t.child, l !== null)) {
    t.child = null;
    do
      t = l.sibling, l.sibling = null, l = t;
    while (l !== null);
  }
}
function ga(l) {
  var t = l.deletions;
  if (l.flags & 16) {
    if (t !== null) for (var e = 0; e < t.length; e++) {
      var a = t[e];
      hl = a, hd(a, l);
    }
    md(l);
  }
  if (l.subtreeFlags & 10256) for (l = l.child; l !== null; ) yd(l), l = l.sibling;
}
function yd(l) {
  switch (l.tag) {
    case 0:
    case 11:
    case 15:
      ga(l), l.flags & 2048 && Ft(9, l, l.return);
      break;
    case 3:
      ga(l);
      break;
    case 12:
      ga(l);
      break;
    case 22:
      var t = l.stateNode;
      l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, Gu(l)) : ga(l);
      break;
    default:
      ga(l);
  }
}
function Gu(l) {
  var t = l.deletions;
  if (l.flags & 16) {
    if (t !== null) for (var e = 0; e < t.length; e++) {
      var a = t[e];
      hl = a, hd(a, l);
    }
    md(l);
  }
  for (l = l.child; l !== null; ) {
    switch (t = l, t.tag) {
      case 0:
      case 11:
      case 15:
        Ft(8, t, t.return), Gu(t);
        break;
      case 22:
        e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, Gu(t));
        break;
      default:
        Gu(t);
    }
    l = l.sibling;
  }
}
function hd(l, t) {
  for (; hl !== null; ) {
    var e = hl;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ft(8, e, t);
        break;
      case 23:
      case 22:
        if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
          var a = e.memoizedState.cachePool.pool;
          a != null && a.refCount++;
        }
        break;
      case 24:
        uu(e.memoizedState.cache);
    }
    if (a = e.child, a !== null) a.return = e, hl = a;
    else l: for (e = l; hl !== null; ) {
      a = hl;
      var u = a.sibling, n = a.return;
      if (nd(a), a === e) {
        hl = null;
        break l;
      }
      if (u !== null) {
        u.return = n, hl = u;
        break l;
      }
      hl = n;
    }
  }
}
var ly = { getCacheForType: function(l) {
  var t = xl(ol), e = t.data.get(l);
  return e === void 0 && (e = l(), t.data.set(l, e)), e;
}, cacheSignal: function() {
  return xl(ol).controller.signal;
} }, ty = typeof WeakMap == "function" ? WeakMap : Map, X = 0, k = null, R = null, Y = 0, L = 0, Hl = null, Yt = false, sa = false, df = false, _t = 0, al = 0, It = 0, re = 0, rf = 0, Rl = 0, Pe = 0, Ba = null, Ol = null, nc = false, Cn = 0, vd = 0, fn = 1 / 0, sn = null, Vt = null, rl = 0, Kt = null, la = null, xt = 0, ic = 0, cc = null, gd = null, Ra = 0, fc = null;
function Ql() {
  return X & 2 && Y !== 0 ? Y & -Y : N.T !== null ? yf() : _o();
}
function bd() {
  if (Rl === 0) if (!(Y & 536870912) || G) {
    var l = vu;
    vu <<= 1, !(vu & 3932160) && (vu = 262144), Rl = l;
  } else Rl = 536870912;
  return l = Zl.current, l !== null && (l.flags |= 32), Rl;
}
function Ml(l, t, e) {
  (l === k && (L === 2 || L === 9) || l.cancelPendingCommit !== null) && (ta(l, 0), qt(l, Y, Rl, false)), tu(l, e), (!(X & 2) || l !== k) && (l === k && (!(X & 2) && (re |= e), al === 4 && qt(l, Y, Rl, false)), ft(l));
}
function Sd(l, t, e) {
  if (X & 6) throw Error(S(327));
  var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || lu(l, t), u = a ? uy(l, t) : yi(l, t, true), n = a;
  do {
    if (u === 0) {
      sa && !a && qt(l, t, 0, false);
      break;
    } else {
      if (e = l.current.alternate, n && !ey(e)) {
        u = yi(l, t, false), n = false;
        continue;
      }
      if (u === 2) {
        if (n = t, l.errorRecoveryDisabledLanes & n) var i = 0;
        else i = l.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
        if (i !== 0) {
          t = i;
          l: {
            var c = l;
            u = Ba;
            var f = c.current.memoizedState.isDehydrated;
            if (f && (ta(c, i).flags |= 256), i = yi(c, i, false), i !== 2) {
              if (df && !f) {
                c.errorRecoveryDisabledLanes |= n, re |= n, u = 4;
                break l;
              }
              n = Ol, Ol = u, n !== null && (Ol === null ? Ol = n : Ol.push.apply(Ol, n));
            }
            u = i;
          }
          if (n = false, u !== 2) continue;
        }
      }
      if (u === 1) {
        ta(l, 0), qt(l, t, 0, true);
        break;
      }
      l: {
        switch (a = l, n = u, n) {
          case 0:
          case 1:
            throw Error(S(345));
          case 4:
            if ((t & 4194048) !== t) break;
          case 6:
            qt(a, t, Rl, !Yt);
            break l;
          case 2:
            Ol = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(S(329));
        }
        if ((t & 62914560) === t && (u = Cn + 300 - Yl(), 10 < u)) {
          if (qt(a, t, Rl, !Yt), Tn(a, 0, true) !== 0) break l;
          xt = t, a.timeoutHandle = Gd(Ts.bind(null, a, e, Ol, sn, nc, t, Rl, re, Pe, Yt, n, "Throttled", -0, 0), u);
          break l;
        }
        Ts(a, e, Ol, sn, nc, t, Rl, re, Pe, Yt, n, null, -0, 0);
      }
    }
    break;
  } while (true);
  ft(l);
}
function Ts(l, t, e, a, u, n, i, c, f, r, m, h, d, v) {
  if (l.timeoutHandle = -1, h = t.subtreeFlags, h & 8192 || (h & 16785408) === 16785408) {
    h = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: true, waitingForViewTransition: false, unsuspend: gt }, rd(t, n, h);
    var p = (n & 62914560) === n ? Cn - Yl() : (n & 4194048) === n ? vd - Yl() : 0;
    if (p = Qy(h, p), p !== null) {
      xt = n, l.cancelPendingCommit = p(As.bind(null, l, t, n, e, a, u, i, c, f, m, h, null, d, v)), qt(l, n, i, !r);
      return;
    }
  }
  As(l, t, n, e, a, u, i, c, f);
}
function ey(l) {
  for (var t = l; ; ) {
    var e = t.tag;
    if ((e === 0 || e === 11 || e === 15) && t.flags & 16384 && (e = t.updateQueue, e !== null && (e = e.stores, e !== null))) for (var a = 0; a < e.length; a++) {
      var u = e[a], n = u.getSnapshot;
      u = u.value;
      try {
        if (!Xl(n(), u)) return false;
      } catch {
        return false;
      }
    }
    if (e = t.child, t.subtreeFlags & 16384 && e !== null) e.return = t, t = e;
    else {
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return true;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return true;
}
function qt(l, t, e, a) {
  t &= ~rf, t &= ~re, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
  for (var u = t; 0 < u; ) {
    var n = 31 - Gl(u), i = 1 << n;
    a[n] = -1, u &= ~i;
  }
  e !== 0 && To(l, e, t);
}
function Bn() {
  return X & 6 ? true : (cu(0), false);
}
function mf() {
  if (R !== null) {
    if (L === 0) var l = R.return;
    else l = R, bt = ze = null, Fc(l), Ve = null, Va = 0, l = R;
    for (; l !== null; ) I0(l.alternate, l), l = l.return;
    R = null;
  }
}
function ta(l, t) {
  var e = l.timeoutHandle;
  e !== -1 && (l.timeoutHandle = -1, zy(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), xt = 0, mf(), k = l, R = e = St(l.current, null), Y = t, L = 0, Hl = null, Yt = false, sa = lu(l, t), df = false, Pe = Rl = rf = re = It = al = 0, Ol = Ba = null, nc = false, t & 8 && (t |= t & 32);
  var a = l.entangledLanes;
  if (a !== 0) for (l = l.entanglements, a &= t; 0 < a; ) {
    var u = 31 - Gl(a), n = 1 << u;
    t |= l[u], a &= ~n;
  }
  return _t = t, Dn(), e;
}
function pd(l, t) {
  H = null, N.H = Ja, t === fa || t === On ? (t = ts(), L = 3) : t === Vc ? (t = ts(), L = 4) : L = t === cf ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Hl = t, R === null && (al = 1, un(l, kl(t, l.current)));
}
function xd() {
  var l = Zl.current;
  return l === null ? true : (Y & 4194048) === Y ? Wl === null : (Y & 62914560) === Y || Y & 536870912 ? l === Wl : false;
}
function zd() {
  var l = N.H;
  return N.H = Ja, l === null ? Ja : l;
}
function Td() {
  var l = N.A;
  return N.A = ly, l;
}
function on() {
  al = 4, Yt || (Y & 4194048) !== Y && Zl.current !== null || (sa = true), !(It & 134217727) && !(re & 134217727) || k === null || qt(k, Y, Rl, false);
}
function yi(l, t, e) {
  var a = X;
  X |= 2;
  var u = zd(), n = Td();
  (k !== l || Y !== t) && (sn = null, ta(l, t)), t = false;
  var i = al;
  l: do
    try {
      if (L !== 0 && R !== null) {
        var c = R, f = Hl;
        switch (L) {
          case 8:
            mf(), i = 6;
            break l;
          case 3:
          case 2:
          case 9:
          case 6:
            Zl.current === null && (t = true);
            var r = L;
            if (L = 0, Hl = null, Ge(l, c, f, r), e && sa) {
              i = 0;
              break l;
            }
            break;
          default:
            r = L, L = 0, Hl = null, Ge(l, c, f, r);
        }
      }
      ay(), i = al;
      break;
    } catch (m) {
      pd(l, m);
    }
  while (true);
  return t && l.shellSuspendCounter++, bt = ze = null, X = a, N.H = u, N.A = n, R === null && (k = null, Y = 0, Dn()), i;
}
function ay() {
  for (; R !== null; ) Ed(R);
}
function uy(l, t) {
  var e = X;
  X |= 2;
  var a = zd(), u = Td();
  k !== l || Y !== t ? (sn = null, fn = Yl() + 500, ta(l, t)) : sa = lu(l, t);
  l: do
    try {
      if (L !== 0 && R !== null) {
        t = R;
        var n = Hl;
        t: switch (L) {
          case 1:
            L = 0, Hl = null, Ge(l, t, n, 1);
            break;
          case 2:
          case 9:
            if (ls(n)) {
              L = 0, Hl = null, Es(t);
              break;
            }
            t = function() {
              L !== 2 && L !== 9 || k !== l || (L = 7), ft(l);
            }, n.then(t, t);
            break l;
          case 3:
            L = 7;
            break l;
          case 4:
            L = 5;
            break l;
          case 7:
            ls(n) ? (L = 0, Hl = null, Es(t)) : (L = 0, Hl = null, Ge(l, t, n, 7));
            break;
          case 5:
            var i = null;
            switch (R.tag) {
              case 26:
                i = R.memoizedState;
              case 5:
              case 27:
                var c = R;
                if (i ? Vd(i) : c.stateNode.complete) {
                  L = 0, Hl = null;
                  var f = c.sibling;
                  if (f !== null) R = f;
                  else {
                    var r = c.return;
                    r !== null ? (R = r, Rn(r)) : R = null;
                  }
                  break t;
                }
            }
            L = 0, Hl = null, Ge(l, t, n, 5);
            break;
          case 6:
            L = 0, Hl = null, Ge(l, t, n, 6);
            break;
          case 8:
            mf(), al = 6;
            break l;
          default:
            throw Error(S(462));
        }
      }
      ny();
      break;
    } catch (m) {
      pd(l, m);
    }
  while (true);
  return bt = ze = null, N.H = a, N.A = u, X = e, R !== null ? 0 : (k = null, Y = 0, Dn(), al);
}
function ny() {
  for (; R !== null && !Nr(); ) Ed(R);
}
function Ed(l) {
  var t = F0(l.alternate, l, _t);
  l.memoizedProps = l.pendingProps, t === null ? Rn(l) : R = t;
}
function Es(l) {
  var t = l, e = t.alternate;
  switch (t.tag) {
    case 15:
    case 0:
      t = gs(e, t, t.pendingProps, t.type, void 0, Y);
      break;
    case 11:
      t = gs(e, t, t.pendingProps, t.type.render, t.ref, Y);
      break;
    case 5:
      Fc(t);
    default:
      I0(e, t), t = R = Io(t, _t), t = F0(e, t, _t);
  }
  l.memoizedProps = l.pendingProps, t === null ? Rn(l) : R = t;
}
function Ge(l, t, e, a) {
  bt = ze = null, Fc(t), Ve = null, Va = 0;
  var u = t.return;
  try {
    if (wm(l, u, t, e, Y)) {
      al = 1, un(l, kl(e, l.current)), R = null;
      return;
    }
  } catch (n) {
    if (u !== null) throw R = u, n;
    al = 1, un(l, kl(e, l.current)), R = null;
    return;
  }
  t.flags & 32768 ? (G || a === 1 ? l = true : sa || Y & 536870912 ? l = false : (Yt = l = true, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Zl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Ad(t, l)) : Rn(t);
}
function Rn(l) {
  var t = l;
  do {
    if (t.flags & 32768) {
      Ad(t, Yt);
      return;
    }
    l = t.return;
    var e = Wm(t.alternate, t, _t);
    if (e !== null) {
      R = e;
      return;
    }
    if (t = t.sibling, t !== null) {
      R = t;
      return;
    }
    R = t = l;
  } while (t !== null);
  al === 0 && (al = 5);
}
function Ad(l, t) {
  do {
    var e = Fm(l.alternate, l);
    if (e !== null) {
      e.flags &= 32767, R = e;
      return;
    }
    if (e = l.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !t && (l = l.sibling, l !== null)) {
      R = l;
      return;
    }
    R = l = e;
  } while (l !== null);
  al = 6, R = null;
}
function As(l, t, e, a, u, n, i, c, f) {
  l.cancelPendingCommit = null;
  do
    Yn();
  while (rl !== 0);
  if (X & 6) throw Error(S(327));
  if (t !== null) {
    if (t === l.current) throw Error(S(177));
    if (n = t.lanes | t.childLanes, n |= Yc, qr(l, e, n, i, c, f), l === k && (R = k = null, Y = 0), la = t, Kt = l, xt = e, ic = n, cc = u, gd = a, t.subtreeFlags & 10256 || t.flags & 10256 ? (l.callbackNode = null, l.callbackPriority = 0, sy(wu, function() {
      return Md(), null;
    })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, t.subtreeFlags & 13878 || a) {
      a = N.T, N.T = null, u = Z.p, Z.p = 2, i = X, X |= 4;
      try {
        Im(l, t, e);
      } finally {
        X = i, Z.p = u, N.T = a;
      }
    }
    rl = 1, _d(), Dd(), Nd();
  }
}
function _d() {
  if (rl === 1) {
    rl = 0;
    var l = Kt, t = la, e = (t.flags & 13878) !== 0;
    if (t.subtreeFlags & 13878 || e) {
      e = N.T, N.T = null;
      var a = Z.p;
      Z.p = 2;
      var u = X;
      X |= 4;
      try {
        sd(t, l);
        var n = rc, i = Vo(l.containerInfo), c = n.focusedElem, f = n.selectionRange;
        if (i !== c && c && c.ownerDocument && Lo(c.ownerDocument.documentElement, c)) {
          if (f !== null && Rc(c)) {
            var r = f.start, m = f.end;
            if (m === void 0 && (m = r), "selectionStart" in c) c.selectionStart = r, c.selectionEnd = Math.min(m, c.value.length);
            else {
              var h = c.ownerDocument || document, d = h && h.defaultView || window;
              if (d.getSelection) {
                var v = d.getSelection(), p = c.textContent.length, x = Math.min(f.start, p), E = f.end === void 0 ? x : Math.min(f.end, p);
                !v.extend && x > E && (i = E, E = x, x = i);
                var o = wf(c, x), s = wf(c, E);
                if (o && s && (v.rangeCount !== 1 || v.anchorNode !== o.node || v.anchorOffset !== o.offset || v.focusNode !== s.node || v.focusOffset !== s.offset)) {
                  var y = h.createRange();
                  y.setStart(o.node, o.offset), v.removeAllRanges(), x > E ? (v.addRange(y), v.extend(s.node, s.offset)) : (y.setEnd(s.node, s.offset), v.addRange(y));
                }
              }
            }
          }
          for (h = [], v = c; v = v.parentNode; ) v.nodeType === 1 && h.push({ element: v, left: v.scrollLeft, top: v.scrollTop });
          for (typeof c.focus == "function" && c.focus(), c = 0; c < h.length; c++) {
            var b = h[c];
            b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
          }
        }
        bn = !!dc, rc = dc = null;
      } finally {
        X = u, Z.p = a, N.T = e;
      }
    }
    l.current = t, rl = 2;
  }
}
function Dd() {
  if (rl === 2) {
    rl = 0;
    var l = Kt, t = la, e = (t.flags & 8772) !== 0;
    if (t.subtreeFlags & 8772 || e) {
      e = N.T, N.T = null;
      var a = Z.p;
      Z.p = 2;
      var u = X;
      X |= 4;
      try {
        ud(l, t.alternate, t);
      } finally {
        X = u, Z.p = a, N.T = e;
      }
    }
    rl = 3;
  }
}
function Nd() {
  if (rl === 4 || rl === 3) {
    rl = 0, Or();
    var l = Kt, t = la, e = xt, a = gd;
    t.subtreeFlags & 10256 || t.flags & 10256 ? rl = 5 : (rl = 0, la = Kt = null, Od(l, l.pendingLanes));
    var u = l.pendingLanes;
    if (u === 0 && (Vt = null), Oc(e), t = t.stateNode, ql && typeof ql.onCommitFiberRoot == "function") try {
      ql.onCommitFiberRoot(Pa, t, void 0, (t.current.flags & 128) === 128);
    } catch {
    }
    if (a !== null) {
      t = N.T, u = Z.p, Z.p = 2, N.T = null;
      try {
        for (var n = l.onRecoverableError, i = 0; i < a.length; i++) {
          var c = a[i];
          n(c.value, { componentStack: c.stack });
        }
      } finally {
        N.T = t, Z.p = u;
      }
    }
    xt & 3 && Yn(), ft(l), u = l.pendingLanes, e & 261930 && u & 42 ? l === fc ? Ra++ : (Ra = 0, fc = l) : Ra = 0, cu(0);
  }
}
function Od(l, t) {
  (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, uu(t)));
}
function Yn() {
  return _d(), Dd(), Nd(), Md();
}
function Md() {
  if (rl !== 5) return false;
  var l = Kt, t = ic;
  ic = 0;
  var e = Oc(xt), a = N.T, u = Z.p;
  try {
    Z.p = 32 > e ? 32 : e, N.T = null, e = cc, cc = null;
    var n = Kt, i = xt;
    if (rl = 0, la = Kt = null, xt = 0, X & 6) throw Error(S(331));
    var c = X;
    if (X |= 4, yd(n.current), dd(n, n.current, i, e), X = c, cu(0, false), ql && typeof ql.onPostCommitFiberRoot == "function") try {
      ql.onPostCommitFiberRoot(Pa, n);
    } catch {
    }
    return true;
  } finally {
    Z.p = u, N.T = a, Od(l, t);
  }
}
function _s(l, t, e) {
  t = kl(e, t), t = tc(l.stateNode, t, 2), l = Lt(l, t, 2), l !== null && (tu(l, 2), ft(l));
}
function K(l, t, e) {
  if (l.tag === 3) _s(l, l, e);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      _s(t, l, e);
      break;
    } else if (t.tag === 1) {
      var a = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Vt === null || !Vt.has(a))) {
        l = kl(e, l), e = K0(2), a = Lt(t, e, 2), a !== null && (J0(e, a, t, l), tu(a, 2), ft(a));
        break;
      }
    }
    t = t.return;
  }
}
function hi(l, t, e) {
  var a = l.pingCache;
  if (a === null) {
    a = l.pingCache = new ty();
    var u = /* @__PURE__ */ new Set();
    a.set(t, u);
  } else u = a.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(t, u));
  u.has(e) || (df = true, u.add(e), l = iy.bind(null, l, t, e), t.then(l, l));
}
function iy(l, t, e) {
  var a = l.pingCache;
  a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, k === l && (Y & e) === e && (al === 4 || al === 3 && (Y & 62914560) === Y && 300 > Yl() - Cn ? !(X & 2) && ta(l, 0) : rf |= e, Pe === Y && (Pe = 0)), ft(l);
}
function jd(l, t) {
  t === 0 && (t = zo()), l = xe(l, t), l !== null && (tu(l, t), ft(l));
}
function cy(l) {
  var t = l.memoizedState, e = 0;
  t !== null && (e = t.retryLane), jd(l, e);
}
function fy(l, t) {
  var e = 0;
  switch (l.tag) {
    case 31:
    case 13:
      var a = l.stateNode, u = l.memoizedState;
      u !== null && (e = u.retryLane);
      break;
    case 19:
      a = l.stateNode;
      break;
    case 22:
      a = l.stateNode._retryCache;
      break;
    default:
      throw Error(S(314));
  }
  a !== null && a.delete(t), jd(l, e);
}
function sy(l, t) {
  return Dc(l, t);
}
var dn = null, De = null, sc = false, rn = false, vi = false, Gt = 0;
function ft(l) {
  l !== De && l.next === null && (De === null ? dn = De = l : De = De.next = l), rn = true, sc || (sc = true, dy());
}
function cu(l, t) {
  if (!vi && rn) {
    vi = true;
    do
      for (var e = false, a = dn; a !== null; ) {
        if (l !== 0) {
          var u = a.pendingLanes;
          if (u === 0) var n = 0;
          else {
            var i = a.suspendedLanes, c = a.pingedLanes;
            n = (1 << 31 - Gl(42 | l) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
          }
          n !== 0 && (e = true, Ds(a, n));
        } else n = Y, n = Tn(a, a === k ? n : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1), !(n & 3) || lu(a, n) || (e = true, Ds(a, n));
        a = a.next;
      }
    while (e);
    vi = false;
  }
}
function oy() {
  Ud();
}
function Ud() {
  rn = sc = false;
  var l = 0;
  Gt !== 0 && xy() && (l = Gt);
  for (var t = Yl(), e = null, a = dn; a !== null; ) {
    var u = a.next, n = Hd(a, t);
    n === 0 ? (a.next = null, e === null ? dn = u : e.next = u, u === null && (De = e)) : (e = a, (l !== 0 || n & 3) && (rn = true)), a = u;
  }
  rl !== 0 && rl !== 5 || cu(l), Gt !== 0 && (Gt = 0);
}
function Hd(l, t) {
  for (var e = l.suspendedLanes, a = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
    var i = 31 - Gl(n), c = 1 << i, f = u[i];
    f === -1 ? (!(c & e) || c & a) && (u[i] = Yr(c, t)) : f <= t && (l.expiredLanes |= c), n &= ~c;
  }
  if (t = k, e = Y, e = Tn(l, l === t ? e : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a = l.callbackNode, e === 0 || l === t && (L === 2 || L === 9) || l.cancelPendingCommit !== null) return a !== null && a !== null && Vn(a), l.callbackNode = null, l.callbackPriority = 0;
  if (!(e & 3) || lu(l, e)) {
    if (t = e & -e, t === l.callbackPriority) return t;
    switch (a !== null && Vn(a), Oc(e)) {
      case 2:
      case 8:
        e = po;
        break;
      case 32:
        e = wu;
        break;
      case 268435456:
        e = xo;
        break;
      default:
        e = wu;
    }
    return a = Cd.bind(null, l), e = Dc(e, a), l.callbackPriority = t, l.callbackNode = e, t;
  }
  return a !== null && a !== null && Vn(a), l.callbackPriority = 2, l.callbackNode = null, 2;
}
function Cd(l, t) {
  if (rl !== 0 && rl !== 5) return l.callbackNode = null, l.callbackPriority = 0, null;
  var e = l.callbackNode;
  if (Yn() && l.callbackNode !== e) return null;
  var a = Y;
  return a = Tn(l, l === k ? a : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), a === 0 ? null : (Sd(l, a, t), Hd(l, Yl()), l.callbackNode != null && l.callbackNode === e ? Cd.bind(null, l) : null);
}
function Ds(l, t) {
  if (Yn()) return null;
  Sd(l, t, true);
}
function dy() {
  Ty(function() {
    X & 6 ? Dc(So, oy) : Ud();
  });
}
function yf() {
  if (Gt === 0) {
    var l = We;
    l === 0 && (l = hu, hu <<= 1, !(hu & 261888) && (hu = 256)), Gt = l;
  }
  return Gt;
}
function Ns(l) {
  return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Mu("" + l);
}
function Os(l, t) {
  var e = t.ownerDocument.createElement("input");
  return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
}
function ry(l, t, e, a, u) {
  if (t === "submit" && e && e.stateNode === u) {
    var n = Ns((u[jl] || null).action), i = a.submitter;
    i && (t = (t = i[jl] || null) ? Ns(t.formAction) : i.getAttribute("formAction"), t !== null && (n = t, i = null));
    var c = new En("action", "action", null, a, u);
    l.push({ event: c, listeners: [{ instance: null, listener: function() {
      if (a.defaultPrevented) {
        if (Gt !== 0) {
          var f = i ? Os(u, i) : new FormData(u);
          Pi(e, { pending: true, data: f, method: u.method, action: n }, null, f);
        }
      } else typeof n == "function" && (c.preventDefault(), f = i ? Os(u, i) : new FormData(u), Pi(e, { pending: true, data: f, method: u.method, action: n }, n, f));
    }, currentTarget: u }] });
  }
}
for (var gi = 0; gi < Xi.length; gi++) {
  var bi = Xi[gi], my = bi.toLowerCase(), yy = bi[0].toUpperCase() + bi.slice(1);
  et(my, "on" + yy);
}
et(Jo, "onAnimationEnd");
et(wo, "onAnimationIteration");
et(ko, "onAnimationStart");
et("dblclick", "onDoubleClick");
et("focusin", "onFocus");
et("focusout", "onBlur");
et(Mm, "onTransitionRun");
et(jm, "onTransitionStart");
et(Um, "onTransitionCancel");
et($o, "onTransitionEnd");
ke("onMouseEnter", ["mouseout", "mouseover"]);
ke("onMouseLeave", ["mouseout", "mouseover"]);
ke("onPointerEnter", ["pointerout", "pointerover"]);
ke("onPointerLeave", ["pointerout", "pointerover"]);
be("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
be("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
be("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
be("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
be("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
be("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var wa = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), hy = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(wa));
function Bd(l, t) {
  t = (t & 4) !== 0;
  for (var e = 0; e < l.length; e++) {
    var a = l[e], u = a.event;
    a = a.listeners;
    l: {
      var n = void 0;
      if (t) for (var i = a.length - 1; 0 <= i; i--) {
        var c = a[i], f = c.instance, r = c.currentTarget;
        if (c = c.listener, f !== n && u.isPropagationStopped()) break l;
        n = c, u.currentTarget = r;
        try {
          n(u);
        } catch (m) {
          $u(m);
        }
        u.currentTarget = null, n = f;
      }
      else for (i = 0; i < a.length; i++) {
        if (c = a[i], f = c.instance, r = c.currentTarget, c = c.listener, f !== n && u.isPropagationStopped()) break l;
        n = c, u.currentTarget = r;
        try {
          n(u);
        } catch (m) {
          $u(m);
        }
        u.currentTarget = null, n = f;
      }
    }
  }
}
function B(l, t) {
  var e = t[Hi];
  e === void 0 && (e = t[Hi] = /* @__PURE__ */ new Set());
  var a = l + "__bubble";
  e.has(a) || (Rd(t, l, 2, false), e.add(a));
}
function Si(l, t, e) {
  var a = 0;
  t && (a |= 4), Rd(e, l, a, t);
}
var Au = "_reactListening" + Math.random().toString(36).slice(2);
function hf(l) {
  if (!l[Au]) {
    l[Au] = true, Do.forEach(function(e) {
      e !== "selectionchange" && (hy.has(e) || Si(e, false, l), Si(e, true, l));
    });
    var t = l.nodeType === 9 ? l : l.ownerDocument;
    t === null || t[Au] || (t[Au] = true, Si("selectionchange", false, t));
  }
}
function Rd(l, t, e, a) {
  switch ($d(t)) {
    case 2:
      var u = Ly;
      break;
    case 8:
      u = Vy;
      break;
    default:
      u = Sf;
  }
  e = u.bind(null, t, e, l), u = void 0, !qi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = true), a ? u !== void 0 ? l.addEventListener(t, e, { capture: true, passive: u }) : l.addEventListener(t, e, true) : u !== void 0 ? l.addEventListener(t, e, { passive: u }) : l.addEventListener(t, e, false);
}
function pi(l, t, e, a, u) {
  var n = a;
  if (!(t & 1) && !(t & 2) && a !== null) l: for (; ; ) {
    if (a === null) return;
    var i = a.tag;
    if (i === 3 || i === 4) {
      var c = a.stateNode.containerInfo;
      if (c === u) break;
      if (i === 4) for (i = a.return; i !== null; ) {
        var f = i.tag;
        if ((f === 3 || f === 4) && i.stateNode.containerInfo === u) return;
        i = i.return;
      }
      for (; c !== null; ) {
        if (i = Me(c), i === null) return;
        if (f = i.tag, f === 5 || f === 6 || f === 26 || f === 27) {
          a = n = i;
          continue l;
        }
        c = c.parentNode;
      }
    }
    a = a.return;
  }
  Bo(function() {
    var r = n, m = Uc(e), h = [];
    l: {
      var d = Wo.get(l);
      if (d !== void 0) {
        var v = En, p = l;
        switch (l) {
          case "keypress":
            if (Uu(e) === 0) break l;
          case "keydown":
          case "keyup":
            v = fm;
            break;
          case "focusin":
            p = "focus", v = $n;
            break;
          case "focusout":
            p = "blur", v = $n;
            break;
          case "beforeblur":
          case "afterblur":
            v = $n;
            break;
          case "click":
            if (e.button === 2) break l;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Yf;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Wr;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = dm;
            break;
          case Jo:
          case wo:
          case ko:
            v = Pr;
            break;
          case $o:
            v = mm;
            break;
          case "scroll":
          case "scrollend":
            v = kr;
            break;
          case "wheel":
            v = hm;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = tm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Gf;
            break;
          case "toggle":
          case "beforetoggle":
            v = gm;
        }
        var x = (t & 4) !== 0, E = !x && (l === "scroll" || l === "scrollend"), o = x ? d !== null ? d + "Capture" : null : d;
        x = [];
        for (var s = r, y; s !== null; ) {
          var b = s;
          if (y = b.stateNode, b = b.tag, b !== 5 && b !== 26 && b !== 27 || y === null || o === null || (b = Ga(s, o), b != null && x.push(ka(s, b, y))), E) break;
          s = s.return;
        }
        0 < x.length && (d = new v(d, p, null, e, m), h.push({ event: d, listeners: x }));
      }
    }
    if (!(t & 7)) {
      l: {
        if (d = l === "mouseover" || l === "pointerover", v = l === "mouseout" || l === "pointerout", d && e !== Yi && (p = e.relatedTarget || e.fromElement) && (Me(p) || p[na])) break l;
        if ((v || d) && (d = m.window === m ? m : (d = m.ownerDocument) ? d.defaultView || d.parentWindow : window, v ? (p = e.relatedTarget || e.toElement, v = r, p = p ? Me(p) : null, p !== null && (E = Ia(p), x = p.tag, p !== E || x !== 5 && x !== 27 && x !== 6) && (p = null)) : (v = null, p = r), v !== p)) {
          if (x = Yf, b = "onMouseLeave", o = "onMouseEnter", s = "mouse", (l === "pointerout" || l === "pointerover") && (x = Gf, b = "onPointerLeave", o = "onPointerEnter", s = "pointer"), E = v == null ? d : xa(v), y = p == null ? d : xa(p), d = new x(b, s + "leave", v, e, m), d.target = E, d.relatedTarget = y, b = null, Me(m) === r && (x = new x(o, s + "enter", p, e, m), x.target = y, x.relatedTarget = E, b = x), E = b, v && p) t: {
            for (x = vy, o = v, s = p, y = 0, b = o; b; b = x(b)) y++;
            b = 0;
            for (var A = s; A; A = x(A)) b++;
            for (; 0 < y - b; ) o = x(o), y--;
            for (; 0 < b - y; ) s = x(s), b--;
            for (; y--; ) {
              if (o === s || s !== null && o === s.alternate) {
                x = o;
                break t;
              }
              o = x(o), s = x(s);
            }
            x = null;
          }
          else x = null;
          v !== null && Ms(h, d, v, x, false), p !== null && E !== null && Ms(h, E, p, x, true);
        }
      }
      l: {
        if (d = r ? xa(r) : window, v = d.nodeName && d.nodeName.toLowerCase(), v === "select" || v === "input" && d.type === "file") var j = Lf;
        else if (Zf(d)) if (Xo) j = Dm;
        else {
          j = Am;
          var T = Em;
        }
        else v = d.nodeName, !v || v.toLowerCase() !== "input" || d.type !== "checkbox" && d.type !== "radio" ? r && jc(r.elementType) && (j = Lf) : j = _m;
        if (j && (j = j(l, r))) {
          Qo(h, j, e, m);
          break l;
        }
        T && T(l, d, r), l === "focusout" && r && d.type === "number" && r.memoizedProps.value != null && Ri(d, "number", d.value);
      }
      switch (T = r ? xa(r) : window, l) {
        case "focusin":
          (Zf(T) || T.contentEditable === "true") && (He = T, Gi = r, Da = null);
          break;
        case "focusout":
          Da = Gi = He = null;
          break;
        case "mousedown":
          Qi = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Qi = false, kf(h, e, m);
          break;
        case "selectionchange":
          if (Om) break;
        case "keydown":
        case "keyup":
          kf(h, e, m);
      }
      var D;
      if (Bc) l: {
        switch (l) {
          case "compositionstart":
            var O = "onCompositionStart";
            break l;
          case "compositionend":
            O = "onCompositionEnd";
            break l;
          case "compositionupdate":
            O = "onCompositionUpdate";
            break l;
        }
        O = void 0;
      }
      else Ue ? qo(l, e) && (O = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (O = "onCompositionStart");
      O && (Yo && e.locale !== "ko" && (Ue || O !== "onCompositionStart" ? O === "onCompositionEnd" && Ue && (D = Ro()) : (Rt = m, Hc = "value" in Rt ? Rt.value : Rt.textContent, Ue = true)), T = mn(r, O), 0 < T.length && (O = new qf(O, l, null, e, m), h.push({ event: O, listeners: T }), D ? O.data = D : (D = Go(e), D !== null && (O.data = D)))), (D = Sm ? pm(l, e) : xm(l, e)) && (O = mn(r, "onBeforeInput"), 0 < O.length && (T = new qf("onBeforeInput", "beforeinput", null, e, m), h.push({ event: T, listeners: O }), T.data = D)), ry(h, l, r, e, m);
    }
    Bd(h, t);
  });
}
function ka(l, t, e) {
  return { instance: l, listener: t, currentTarget: e };
}
function mn(l, t) {
  for (var e = t + "Capture", a = []; l !== null; ) {
    var u = l, n = u.stateNode;
    if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = Ga(l, e), u != null && a.unshift(ka(l, u, n)), u = Ga(l, t), u != null && a.push(ka(l, u, n))), l.tag === 3) return a;
    l = l.return;
  }
  return [];
}
function vy(l) {
  if (l === null) return null;
  do
    l = l.return;
  while (l && l.tag !== 5 && l.tag !== 27);
  return l || null;
}
function Ms(l, t, e, a, u) {
  for (var n = t._reactName, i = []; e !== null && e !== a; ) {
    var c = e, f = c.alternate, r = c.stateNode;
    if (c = c.tag, f !== null && f === a) break;
    c !== 5 && c !== 26 && c !== 27 || r === null || (f = r, u ? (r = Ga(e, n), r != null && i.unshift(ka(e, r, f))) : u || (r = Ga(e, n), r != null && i.push(ka(e, r, f)))), e = e.return;
  }
  i.length !== 0 && l.push({ event: t, listeners: i });
}
var gy = /\r\n?/g, by = /\u0000|\uFFFD/g;
function js(l) {
  return (typeof l == "string" ? l : "" + l).replace(gy, `
`).replace(by, "");
}
function Yd(l, t) {
  return t = js(t), js(l) === t;
}
function J(l, t, e, a, u, n) {
  switch (e) {
    case "children":
      typeof a == "string" ? t === "body" || t === "textarea" && a === "" || $e(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && $e(l, "" + a);
      break;
    case "className":
      bu(l, "class", a);
      break;
    case "tabIndex":
      bu(l, "tabindex", a);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      bu(l, e, a);
      break;
    case "style":
      Co(l, a, n);
      break;
    case "data":
      if (t !== "object") {
        bu(l, "data", a);
        break;
      }
    case "src":
    case "href":
      if (a === "" && (t !== "a" || e !== "href")) {
        l.removeAttribute(e);
        break;
      }
      if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
        l.removeAttribute(e);
        break;
      }
      a = Mu("" + a), l.setAttribute(e, a);
      break;
    case "action":
    case "formAction":
      if (typeof a == "function") {
        l.setAttribute(e, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
        break;
      } else typeof n == "function" && (e === "formAction" ? (t !== "input" && J(l, t, "name", u.name, u, null), J(l, t, "formEncType", u.formEncType, u, null), J(l, t, "formMethod", u.formMethod, u, null), J(l, t, "formTarget", u.formTarget, u, null)) : (J(l, t, "encType", u.encType, u, null), J(l, t, "method", u.method, u, null), J(l, t, "target", u.target, u, null)));
      if (a == null || typeof a == "symbol" || typeof a == "boolean") {
        l.removeAttribute(e);
        break;
      }
      a = Mu("" + a), l.setAttribute(e, a);
      break;
    case "onClick":
      a != null && (l.onclick = gt);
      break;
    case "onScroll":
      a != null && B("scroll", l);
      break;
    case "onScrollEnd":
      a != null && B("scrollend", l);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a)) throw Error(S(61));
        if (e = a.__html, e != null) {
          if (u.children != null) throw Error(S(60));
          l.innerHTML = e;
        }
      }
      break;
    case "multiple":
      l.multiple = a && typeof a != "function" && typeof a != "symbol";
      break;
    case "muted":
      l.muted = a && typeof a != "function" && typeof a != "symbol";
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
        l.removeAttribute("xlink:href");
        break;
      }
      e = Mu("" + a), l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e);
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "" + a) : l.removeAttribute(e);
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
      a && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "") : l.removeAttribute(e);
      break;
    case "capture":
    case "download":
      a === true ? l.setAttribute(e, "") : a !== false && a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, a) : l.removeAttribute(e);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? l.setAttribute(e, a) : l.removeAttribute(e);
      break;
    case "rowSpan":
    case "start":
      a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? l.removeAttribute(e) : l.setAttribute(e, a);
      break;
    case "popover":
      B("beforetoggle", l), B("toggle", l), Ou(l, "popover", a);
      break;
    case "xlinkActuate":
      st(l, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
      break;
    case "xlinkArcrole":
      st(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
      break;
    case "xlinkRole":
      st(l, "http://www.w3.org/1999/xlink", "xlink:role", a);
      break;
    case "xlinkShow":
      st(l, "http://www.w3.org/1999/xlink", "xlink:show", a);
      break;
    case "xlinkTitle":
      st(l, "http://www.w3.org/1999/xlink", "xlink:title", a);
      break;
    case "xlinkType":
      st(l, "http://www.w3.org/1999/xlink", "xlink:type", a);
      break;
    case "xmlBase":
      st(l, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
      break;
    case "xmlLang":
      st(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
      break;
    case "xmlSpace":
      st(l, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
      break;
    case "is":
      Ou(l, "is", a);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = Jr.get(e) || e, Ou(l, e, a));
  }
}
function oc(l, t, e, a, u, n) {
  switch (e) {
    case "style":
      Co(l, a, n);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a)) throw Error(S(61));
        if (e = a.__html, e != null) {
          if (u.children != null) throw Error(S(60));
          l.innerHTML = e;
        }
      }
      break;
    case "children":
      typeof a == "string" ? $e(l, a) : (typeof a == "number" || typeof a == "bigint") && $e(l, "" + a);
      break;
    case "onScroll":
      a != null && B("scroll", l);
      break;
    case "onScrollEnd":
      a != null && B("scrollend", l);
      break;
    case "onClick":
      a != null && (l.onclick = gt);
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
      if (!No.hasOwnProperty(e)) l: {
        if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), t = e.slice(2, u ? e.length - 7 : void 0), n = l[jl] || null, n = n != null ? n[e] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof a == "function")) {
          typeof n != "function" && n !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, u);
          break l;
        }
        e in l ? l[e] = a : a === true ? l.setAttribute(e, "") : Ou(l, e, a);
      }
  }
}
function zl(l, t, e) {
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
      B("error", l), B("load", l);
      var a = false, u = false, n;
      for (n in e) if (e.hasOwnProperty(n)) {
        var i = e[n];
        if (i != null) switch (n) {
          case "src":
            a = true;
            break;
          case "srcSet":
            u = true;
            break;
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(S(137, t));
          default:
            J(l, t, n, i, e, null);
        }
      }
      u && J(l, t, "srcSet", e.srcSet, e, null), a && J(l, t, "src", e.src, e, null);
      return;
    case "input":
      B("invalid", l);
      var c = n = i = u = null, f = null, r = null;
      for (a in e) if (e.hasOwnProperty(a)) {
        var m = e[a];
        if (m != null) switch (a) {
          case "name":
            u = m;
            break;
          case "type":
            i = m;
            break;
          case "checked":
            f = m;
            break;
          case "defaultChecked":
            r = m;
            break;
          case "value":
            n = m;
            break;
          case "defaultValue":
            c = m;
            break;
          case "children":
          case "dangerouslySetInnerHTML":
            if (m != null) throw Error(S(137, t));
            break;
          default:
            J(l, t, a, m, e, null);
        }
      }
      jo(l, n, c, f, r, i, u, false);
      return;
    case "select":
      B("invalid", l), a = i = n = null;
      for (u in e) if (e.hasOwnProperty(u) && (c = e[u], c != null)) switch (u) {
        case "value":
          n = c;
          break;
        case "defaultValue":
          i = c;
          break;
        case "multiple":
          a = c;
        default:
          J(l, t, u, c, e, null);
      }
      t = n, e = i, l.multiple = !!a, t != null ? Xe(l, !!a, t, false) : e != null && Xe(l, !!a, e, true);
      return;
    case "textarea":
      B("invalid", l), n = u = a = null;
      for (i in e) if (e.hasOwnProperty(i) && (c = e[i], c != null)) switch (i) {
        case "value":
          a = c;
          break;
        case "defaultValue":
          u = c;
          break;
        case "children":
          n = c;
          break;
        case "dangerouslySetInnerHTML":
          if (c != null) throw Error(S(91));
          break;
        default:
          J(l, t, i, c, e, null);
      }
      Ho(l, a, u, n);
      return;
    case "option":
      for (f in e) if (e.hasOwnProperty(f) && (a = e[f], a != null)) switch (f) {
        case "selected":
          l.selected = a && typeof a != "function" && typeof a != "symbol";
          break;
        default:
          J(l, t, f, a, e, null);
      }
      return;
    case "dialog":
      B("beforetoggle", l), B("toggle", l), B("cancel", l), B("close", l);
      break;
    case "iframe":
    case "object":
      B("load", l);
      break;
    case "video":
    case "audio":
      for (a = 0; a < wa.length; a++) B(wa[a], l);
      break;
    case "image":
      B("error", l), B("load", l);
      break;
    case "details":
      B("toggle", l);
      break;
    case "embed":
    case "source":
    case "link":
      B("error", l), B("load", l);
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
          throw Error(S(137, t));
        default:
          J(l, t, r, a, e, null);
      }
      return;
    default:
      if (jc(t)) {
        for (m in e) e.hasOwnProperty(m) && (a = e[m], a !== void 0 && oc(l, t, m, a, e, void 0));
        return;
      }
  }
  for (c in e) e.hasOwnProperty(c) && (a = e[c], a != null && J(l, t, c, a, e, null));
}
function Sy(l, t, e, a) {
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
      var u = null, n = null, i = null, c = null, f = null, r = null, m = null;
      for (v in e) {
        var h = e[v];
        if (e.hasOwnProperty(v) && h != null) switch (v) {
          case "checked":
            break;
          case "value":
            break;
          case "defaultValue":
            f = h;
          default:
            a.hasOwnProperty(v) || J(l, t, v, null, a, h);
        }
      }
      for (var d in a) {
        var v = a[d];
        if (h = e[d], a.hasOwnProperty(d) && (v != null || h != null)) switch (d) {
          case "type":
            n = v;
            break;
          case "name":
            u = v;
            break;
          case "checked":
            r = v;
            break;
          case "defaultChecked":
            m = v;
            break;
          case "value":
            i = v;
            break;
          case "defaultValue":
            c = v;
            break;
          case "children":
          case "dangerouslySetInnerHTML":
            if (v != null) throw Error(S(137, t));
            break;
          default:
            v !== h && J(l, t, d, v, a, h);
        }
      }
      Bi(l, i, c, f, r, m, n, u);
      return;
    case "select":
      v = i = c = d = null;
      for (n in e) if (f = e[n], e.hasOwnProperty(n) && f != null) switch (n) {
        case "value":
          break;
        case "multiple":
          v = f;
        default:
          a.hasOwnProperty(n) || J(l, t, n, null, a, f);
      }
      for (u in a) if (n = a[u], f = e[u], a.hasOwnProperty(u) && (n != null || f != null)) switch (u) {
        case "value":
          d = n;
          break;
        case "defaultValue":
          c = n;
          break;
        case "multiple":
          i = n;
        default:
          n !== f && J(l, t, u, n, a, f);
      }
      t = c, e = i, a = v, d != null ? Xe(l, !!e, d, false) : !!a != !!e && (t != null ? Xe(l, !!e, t, true) : Xe(l, !!e, e ? [] : "", false));
      return;
    case "textarea":
      v = d = null;
      for (c in e) if (u = e[c], e.hasOwnProperty(c) && u != null && !a.hasOwnProperty(c)) switch (c) {
        case "value":
          break;
        case "children":
          break;
        default:
          J(l, t, c, null, a, u);
      }
      for (i in a) if (u = a[i], n = e[i], a.hasOwnProperty(i) && (u != null || n != null)) switch (i) {
        case "value":
          d = u;
          break;
        case "defaultValue":
          v = u;
          break;
        case "children":
          break;
        case "dangerouslySetInnerHTML":
          if (u != null) throw Error(S(91));
          break;
        default:
          u !== n && J(l, t, i, u, a, n);
      }
      Uo(l, d, v);
      return;
    case "option":
      for (var p in e) if (d = e[p], e.hasOwnProperty(p) && d != null && !a.hasOwnProperty(p)) switch (p) {
        case "selected":
          l.selected = false;
          break;
        default:
          J(l, t, p, null, a, d);
      }
      for (f in a) if (d = a[f], v = e[f], a.hasOwnProperty(f) && d !== v && (d != null || v != null)) switch (f) {
        case "selected":
          l.selected = d && typeof d != "function" && typeof d != "symbol";
          break;
        default:
          J(l, t, f, d, a, v);
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
      for (var x in e) d = e[x], e.hasOwnProperty(x) && d != null && !a.hasOwnProperty(x) && J(l, t, x, null, a, d);
      for (r in a) if (d = a[r], v = e[r], a.hasOwnProperty(r) && d !== v && (d != null || v != null)) switch (r) {
        case "children":
        case "dangerouslySetInnerHTML":
          if (d != null) throw Error(S(137, t));
          break;
        default:
          J(l, t, r, d, a, v);
      }
      return;
    default:
      if (jc(t)) {
        for (var E in e) d = e[E], e.hasOwnProperty(E) && d !== void 0 && !a.hasOwnProperty(E) && oc(l, t, E, void 0, a, d);
        for (m in a) d = a[m], v = e[m], !a.hasOwnProperty(m) || d === v || d === void 0 && v === void 0 || oc(l, t, m, d, a, v);
        return;
      }
  }
  for (var o in e) d = e[o], e.hasOwnProperty(o) && d != null && !a.hasOwnProperty(o) && J(l, t, o, null, a, d);
  for (h in a) d = a[h], v = e[h], !a.hasOwnProperty(h) || d === v || d == null && v == null || J(l, t, h, d, a, v);
}
function Us(l) {
  switch (l) {
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
function py() {
  if (typeof performance.getEntriesByType == "function") {
    for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
      var u = e[a], n = u.transferSize, i = u.initiatorType, c = u.duration;
      if (n && c && Us(i)) {
        for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
          var f = e[a], r = f.startTime;
          if (r > c) break;
          var m = f.transferSize, h = f.initiatorType;
          m && Us(h) && (f = f.responseEnd, i += m * (f < c ? 1 : (c - r) / (f - r)));
        }
        if (--a, t += 8 * (n + i) / (u.duration / 1e3), l++, 10 < l) break;
      }
    }
    if (0 < l) return t / l / 1e6;
  }
  return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
}
var dc = null, rc = null;
function yn(l) {
  return l.nodeType === 9 ? l : l.ownerDocument;
}
function Hs(l) {
  switch (l) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function qd(l, t) {
  if (l === 0) switch (t) {
    case "svg":
      return 1;
    case "math":
      return 2;
    default:
      return 0;
  }
  return l === 1 && t === "foreignObject" ? 0 : l;
}
function mc(l, t) {
  return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var xi = null;
function xy() {
  var l = window.event;
  return l && l.type === "popstate" ? l === xi ? false : (xi = l, true) : (xi = null, false);
}
var Gd = typeof setTimeout == "function" ? setTimeout : void 0, zy = typeof clearTimeout == "function" ? clearTimeout : void 0, Cs = typeof Promise == "function" ? Promise : void 0, Ty = typeof queueMicrotask == "function" ? queueMicrotask : typeof Cs < "u" ? function(l) {
  return Cs.resolve(null).then(l).catch(Ey);
} : Gd;
function Ey(l) {
  setTimeout(function() {
    throw l;
  });
}
function le(l) {
  return l === "head";
}
function Bs(l, t) {
  var e = t, a = 0;
  do {
    var u = e.nextSibling;
    if (l.removeChild(e), u && u.nodeType === 8) if (e = u.data, e === "/$" || e === "/&") {
      if (a === 0) {
        l.removeChild(u), aa(t);
        return;
      }
      a--;
    } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&") a++;
    else if (e === "html") Ya(l.ownerDocument.documentElement);
    else if (e === "head") {
      e = l.ownerDocument.head, Ya(e);
      for (var n = e.firstChild; n; ) {
        var i = n.nextSibling, c = n.nodeName;
        n[eu] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = i;
      }
    } else e === "body" && Ya(l.ownerDocument.body);
    e = u;
  } while (e);
  aa(t);
}
function Rs(l, t) {
  var e = l;
  l = 0;
  do {
    var a = e.nextSibling;
    if (e.nodeType === 1 ? t ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (t ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8) if (e = a.data, e === "/$") {
      if (l === 0) break;
      l--;
    } else e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || l++;
    e = a;
  } while (e);
}
function yc(l) {
  var t = l.firstChild;
  for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
    var e = t;
    switch (t = t.nextSibling, e.nodeName) {
      case "HTML":
      case "HEAD":
      case "BODY":
        yc(e), Mc(e);
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (e.rel.toLowerCase() === "stylesheet") continue;
    }
    l.removeChild(e);
  }
}
function Ay(l, t, e, a) {
  for (; l.nodeType === 1; ) {
    var u = e;
    if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
      if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
    } else if (a) {
      if (!l[eu]) switch (t) {
        case "meta":
          if (!l.hasAttribute("itemprop")) break;
          return l;
        case "link":
          if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence")) break;
          if (n !== u.rel || l.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || l.getAttribute("title") !== (u.title == null ? null : u.title)) break;
          return l;
        case "style":
          if (l.hasAttribute("data-precedence")) break;
          return l;
        case "script":
          if (n = l.getAttribute("src"), (n !== (u.src == null ? null : u.src) || l.getAttribute("type") !== (u.type == null ? null : u.type) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop")) break;
          return l;
        default:
          return l;
      }
    } else if (t === "input" && l.type === "hidden") {
      var n = u.name == null ? null : "" + u.name;
      if (u.type === "hidden" && l.getAttribute("name") === n) return l;
    } else return l;
    if (l = Fl(l.nextSibling), l === null) break;
  }
  return null;
}
function _y(l, t, e) {
  if (t === "") return null;
  for (; l.nodeType !== 3; ) if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = Fl(l.nextSibling), l === null)) return null;
  return l;
}
function Qd(l, t) {
  for (; l.nodeType !== 8; ) if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = Fl(l.nextSibling), l === null)) return null;
  return l;
}
function hc(l) {
  return l.data === "$?" || l.data === "$~";
}
function vc(l) {
  return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
}
function Dy(l, t) {
  var e = l.ownerDocument;
  if (l.data === "$~") l._reactRetry = t;
  else if (l.data !== "$?" || e.readyState !== "loading") t();
  else {
    var a = function() {
      t(), e.removeEventListener("DOMContentLoaded", a);
    };
    e.addEventListener("DOMContentLoaded", a), l._reactRetry = a;
  }
}
function Fl(l) {
  for (; l != null; l = l.nextSibling) {
    var t = l.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
      if (t === "/$" || t === "/&") return null;
    }
  }
  return l;
}
var gc = null;
function Ys(l) {
  l = l.nextSibling;
  for (var t = 0; l; ) {
    if (l.nodeType === 8) {
      var e = l.data;
      if (e === "/$" || e === "/&") {
        if (t === 0) return Fl(l.nextSibling);
        t--;
      } else e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || t++;
    }
    l = l.nextSibling;
  }
  return null;
}
function qs(l) {
  l = l.previousSibling;
  for (var t = 0; l; ) {
    if (l.nodeType === 8) {
      var e = l.data;
      if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
        if (t === 0) return l;
        t--;
      } else e !== "/$" && e !== "/&" || t++;
    }
    l = l.previousSibling;
  }
  return null;
}
function Xd(l, t, e) {
  switch (t = yn(e), l) {
    case "html":
      if (l = t.documentElement, !l) throw Error(S(452));
      return l;
    case "head":
      if (l = t.head, !l) throw Error(S(453));
      return l;
    case "body":
      if (l = t.body, !l) throw Error(S(454));
      return l;
    default:
      throw Error(S(451));
  }
}
function Ya(l) {
  for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
  Mc(l);
}
var Il = /* @__PURE__ */ new Map(), Gs = /* @__PURE__ */ new Set();
function hn(l) {
  return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
}
var Dt = Z.d;
Z.d = { f: Ny, r: Oy, D: My, C: jy, L: Uy, m: Hy, X: By, S: Cy, M: Ry };
function Ny() {
  var l = Dt.f(), t = Bn();
  return l || t;
}
function Oy(l) {
  var t = ia(l);
  t !== null && t.tag === 5 && t.type === "form" ? C0(t) : Dt.r(l);
}
var oa = typeof document > "u" ? null : document;
function Zd(l, t, e) {
  var a = oa;
  if (a && typeof t == "string" && t) {
    var u = wl(t);
    u = 'link[rel="' + l + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), Gs.has(u) || (Gs.add(u), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(u) === null && (t = a.createElement("link"), zl(t, "link", l), vl(t), a.head.appendChild(t)));
  }
}
function My(l) {
  Dt.D(l), Zd("dns-prefetch", l, null);
}
function jy(l, t) {
  Dt.C(l, t), Zd("preconnect", l, t);
}
function Uy(l, t, e) {
  Dt.L(l, t, e);
  var a = oa;
  if (a && l && t) {
    var u = 'link[rel="preload"][as="' + wl(t) + '"]';
    t === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + wl(e.imageSrcSet) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + wl(e.imageSizes) + '"]')) : u += '[href="' + wl(l) + '"]';
    var n = u;
    switch (t) {
      case "style":
        n = ea(l);
        break;
      case "script":
        n = da(l);
    }
    Il.has(n) || (l = P({ rel: "preload", href: t === "image" && e && e.imageSrcSet ? void 0 : l, as: t }, e), Il.set(n, l), a.querySelector(u) !== null || t === "style" && a.querySelector(fu(n)) || t === "script" && a.querySelector(su(n)) || (t = a.createElement("link"), zl(t, "link", l), vl(t), a.head.appendChild(t)));
  }
}
function Hy(l, t) {
  Dt.m(l, t);
  var e = oa;
  if (e && l) {
    var a = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + wl(a) + '"][href="' + wl(l) + '"]', n = u;
    switch (a) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        n = da(l);
    }
    if (!Il.has(n) && (l = P({ rel: "modulepreload", href: l }, t), Il.set(n, l), e.querySelector(u) === null)) {
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (e.querySelector(su(n))) return;
      }
      a = e.createElement("link"), zl(a, "link", l), vl(a), e.head.appendChild(a);
    }
  }
}
function Cy(l, t, e) {
  Dt.S(l, t, e);
  var a = oa;
  if (a && l) {
    var u = Qe(a).hoistableStyles, n = ea(l);
    t = t || "default";
    var i = u.get(n);
    if (!i) {
      var c = { loading: 0, preload: null };
      if (i = a.querySelector(fu(n))) c.loading = 5;
      else {
        l = P({ rel: "stylesheet", href: l, "data-precedence": t }, e), (e = Il.get(n)) && vf(l, e);
        var f = i = a.createElement("link");
        vl(f), zl(f, "link", l), f._p = new Promise(function(r, m) {
          f.onload = r, f.onerror = m;
        }), f.addEventListener("load", function() {
          c.loading |= 1;
        }), f.addEventListener("error", function() {
          c.loading |= 2;
        }), c.loading |= 4, Qu(i, t, a);
      }
      i = { type: "stylesheet", instance: i, count: 1, state: c }, u.set(n, i);
    }
  }
}
function By(l, t) {
  Dt.X(l, t);
  var e = oa;
  if (e && l) {
    var a = Qe(e).hoistableScripts, u = da(l), n = a.get(u);
    n || (n = e.querySelector(su(u)), n || (l = P({ src: l, async: true }, t), (t = Il.get(u)) && gf(l, t), n = e.createElement("script"), vl(n), zl(n, "link", l), e.head.appendChild(n)), n = { type: "script", instance: n, count: 1, state: null }, a.set(u, n));
  }
}
function Ry(l, t) {
  Dt.M(l, t);
  var e = oa;
  if (e && l) {
    var a = Qe(e).hoistableScripts, u = da(l), n = a.get(u);
    n || (n = e.querySelector(su(u)), n || (l = P({ src: l, async: true, type: "module" }, t), (t = Il.get(u)) && gf(l, t), n = e.createElement("script"), vl(n), zl(n, "link", l), e.head.appendChild(n)), n = { type: "script", instance: n, count: 1, state: null }, a.set(u, n));
  }
}
function Qs(l, t, e, a) {
  var u = (u = Qt.current) ? hn(u) : null;
  if (!u) throw Error(S(446));
  switch (l) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof e.precedence == "string" && typeof e.href == "string" ? (t = ea(e.href), e = Qe(u).hoistableStyles, a = e.get(t), a || (a = { type: "style", instance: null, count: 0, state: null }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
        l = ea(e.href);
        var n = Qe(u).hoistableStyles, i = n.get(l);
        if (i || (u = u.ownerDocument || u, i = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, n.set(l, i), (n = u.querySelector(fu(l))) && !n._p && (i.instance = n, i.state.loading = 5), Il.has(l) || (e = { rel: "preload", as: "style", href: e.href, crossOrigin: e.crossOrigin, integrity: e.integrity, media: e.media, hrefLang: e.hrefLang, referrerPolicy: e.referrerPolicy }, Il.set(l, e), n || Yy(u, l, e, i.state))), t && a === null) throw Error(S(528, ""));
        return i;
      }
      if (t && a !== null) throw Error(S(529, ""));
      return null;
    case "script":
      return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = da(e), e = Qe(u).hoistableScripts, a = e.get(t), a || (a = { type: "script", instance: null, count: 0, state: null }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
    default:
      throw Error(S(444, l));
  }
}
function ea(l) {
  return 'href="' + wl(l) + '"';
}
function fu(l) {
  return 'link[rel="stylesheet"][' + l + "]";
}
function Ld(l) {
  return P({}, l, { "data-precedence": l.precedence, precedence: null });
}
function Yy(l, t, e, a) {
  l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
    return a.loading |= 1;
  }), t.addEventListener("error", function() {
    return a.loading |= 2;
  }), zl(t, "link", e), vl(t), l.head.appendChild(t));
}
function da(l) {
  return '[src="' + wl(l) + '"]';
}
function su(l) {
  return "script[async]" + l;
}
function Xs(l, t, e) {
  if (t.count++, t.instance === null) switch (t.type) {
    case "style":
      var a = l.querySelector('style[data-href~="' + wl(e.href) + '"]');
      if (a) return t.instance = a, vl(a), a;
      var u = P({}, e, { "data-href": e.href, "data-precedence": e.precedence, href: null, precedence: null });
      return a = (l.ownerDocument || l).createElement("style"), vl(a), zl(a, "style", u), Qu(a, e.precedence, l), t.instance = a;
    case "stylesheet":
      u = ea(e.href);
      var n = l.querySelector(fu(u));
      if (n) return t.state.loading |= 4, t.instance = n, vl(n), n;
      a = Ld(e), (u = Il.get(u)) && vf(a, u), n = (l.ownerDocument || l).createElement("link"), vl(n);
      var i = n;
      return i._p = new Promise(function(c, f) {
        i.onload = c, i.onerror = f;
      }), zl(n, "link", a), t.state.loading |= 4, Qu(n, e.precedence, l), t.instance = n;
    case "script":
      return n = da(e.src), (u = l.querySelector(su(n))) ? (t.instance = u, vl(u), u) : (a = e, (u = Il.get(n)) && (a = P({}, e), gf(a, u)), l = l.ownerDocument || l, u = l.createElement("script"), vl(u), zl(u, "link", a), l.head.appendChild(u), t.instance = u);
    case "void":
      return null;
    default:
      throw Error(S(443, t.type));
  }
  else t.type === "stylesheet" && !(t.state.loading & 4) && (a = t.instance, t.state.loading |= 4, Qu(a, e.precedence, l));
  return t.instance;
}
function Qu(l, t, e) {
  for (var a = e.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), u = a.length ? a[a.length - 1] : null, n = u, i = 0; i < a.length; i++) {
    var c = a[i];
    if (c.dataset.precedence === t) n = c;
    else if (n !== u) break;
  }
  n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
}
function vf(l, t) {
  l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
}
function gf(l, t) {
  l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
}
var Xu = null;
function Zs(l, t, e) {
  if (Xu === null) {
    var a = /* @__PURE__ */ new Map(), u = Xu = /* @__PURE__ */ new Map();
    u.set(e, a);
  } else u = Xu, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
  if (a.has(l)) return a;
  for (a.set(l, null), e = e.getElementsByTagName(l), u = 0; u < e.length; u++) {
    var n = e[u];
    if (!(n[eu] || n[Sl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
      var i = n.getAttribute(t) || "";
      i = l + i;
      var c = a.get(i);
      c ? c.push(n) : a.set(i, [n]);
    }
  }
  return a;
}
function Ls(l, t, e) {
  l = l.ownerDocument || l, l.head.insertBefore(e, t === "title" ? l.querySelector("head > title") : null);
}
function qy(l, t, e) {
  if (e === 1 || t.itemProp != null) return false;
  switch (l) {
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
          return l = t.disabled, typeof t.precedence == "string" && l == null;
        default:
          return true;
      }
    case "script":
      if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return true;
  }
  return false;
}
function Vd(l) {
  return !(l.type === "stylesheet" && !(l.state.loading & 3));
}
function Gy(l, t, e, a) {
  if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== false) && !(e.state.loading & 4)) {
    if (e.instance === null) {
      var u = ea(a.href), n = t.querySelector(fu(u));
      if (n) {
        t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = vn.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = n, vl(n);
        return;
      }
      n = t.ownerDocument || t, a = Ld(a), (u = Il.get(u)) && vf(a, u), n = n.createElement("link"), vl(n);
      var i = n;
      i._p = new Promise(function(c, f) {
        i.onload = c, i.onerror = f;
      }), zl(n, "link", a), e.instance = n;
    }
    l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && !(e.state.loading & 3) && (l.count++, e = vn.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
  }
}
var zi = 0;
function Qy(l, t) {
  return l.stylesheets && l.count === 0 && Zu(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
    var a = setTimeout(function() {
      if (l.stylesheets && Zu(l, l.stylesheets), l.unsuspend) {
        var n = l.unsuspend;
        l.unsuspend = null, n();
      }
    }, 6e4 + t);
    0 < l.imgBytes && zi === 0 && (zi = 62500 * py());
    var u = setTimeout(function() {
      if (l.waitingForImages = false, l.count === 0 && (l.stylesheets && Zu(l, l.stylesheets), l.unsuspend)) {
        var n = l.unsuspend;
        l.unsuspend = null, n();
      }
    }, (l.imgBytes > zi ? 50 : 800) + t);
    return l.unsuspend = e, function() {
      l.unsuspend = null, clearTimeout(a), clearTimeout(u);
    };
  } : null;
}
function vn() {
  if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
    if (this.stylesheets) Zu(this, this.stylesheets);
    else if (this.unsuspend) {
      var l = this.unsuspend;
      this.unsuspend = null, l();
    }
  }
}
var gn = null;
function Zu(l, t) {
  l.stylesheets = null, l.unsuspend !== null && (l.count++, gn = /* @__PURE__ */ new Map(), t.forEach(Xy, l), gn = null, vn.call(l));
}
function Xy(l, t) {
  if (!(t.state.loading & 4)) {
    var e = gn.get(l);
    if (e) var a = e.get(null);
    else {
      e = /* @__PURE__ */ new Map(), gn.set(l, e);
      for (var u = l.querySelectorAll("link[data-precedence],style[data-precedence]"), n = 0; n < u.length; n++) {
        var i = u[n];
        (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
      }
      a && e.set(null, a);
    }
    u = t.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = vn.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
  }
}
var $a = { $$typeof: vt, Provider: null, Consumer: null, _currentValue: fe, _currentValue2: fe, _threadCount: 0 };
function Zy(l, t, e, a, u, n, i, c, f) {
  this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Kn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Kn(0), this.hiddenUpdates = Kn(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = f, this.incompleteTransitions = /* @__PURE__ */ new Map();
}
function Kd(l, t, e, a, u, n, i, c, f, r, m, h) {
  return l = new Zy(l, t, e, i, f, r, m, h, c), t = 1, n === true && (t |= 24), n = Bl(3, null, null, t), l.current = n, n.stateNode = l, t = Zc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = { element: a, isDehydrated: e, cache: t }, Kc(n), l;
}
function Jd(l) {
  return l ? (l = Re, l) : Re;
}
function wd(l, t, e, a, u, n) {
  u = Jd(u), a.context === null ? a.context = u : a.pendingContext = u, a = Zt(t), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = Lt(l, a, t), e !== null && (Ml(e, l, t), Oa(e, l, t));
}
function Vs(l, t) {
  if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
    var e = l.retryLane;
    l.retryLane = e !== 0 && e < t ? e : t;
  }
}
function bf(l, t) {
  Vs(l, t), (l = l.alternate) && Vs(l, t);
}
function kd(l) {
  if (l.tag === 13 || l.tag === 31) {
    var t = xe(l, 67108864);
    t !== null && Ml(t, l, 67108864), bf(l, 67108864);
  }
}
function Ks(l) {
  if (l.tag === 13 || l.tag === 31) {
    var t = Ql();
    t = Nc(t);
    var e = xe(l, t);
    e !== null && Ml(e, l, t), bf(l, t);
  }
}
var bn = true;
function Ly(l, t, e, a) {
  var u = N.T;
  N.T = null;
  var n = Z.p;
  try {
    Z.p = 2, Sf(l, t, e, a);
  } finally {
    Z.p = n, N.T = u;
  }
}
function Vy(l, t, e, a) {
  var u = N.T;
  N.T = null;
  var n = Z.p;
  try {
    Z.p = 8, Sf(l, t, e, a);
  } finally {
    Z.p = n, N.T = u;
  }
}
function Sf(l, t, e, a) {
  if (bn) {
    var u = bc(a);
    if (u === null) pi(l, t, a, Sn, e), Js(l, a);
    else if (Jy(u, l, t, e, a)) a.stopPropagation();
    else if (Js(l, a), t & 4 && -1 < Ky.indexOf(l)) {
      for (; u !== null; ) {
        var n = ia(u);
        if (n !== null) switch (n.tag) {
          case 3:
            if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
              var i = ne(n.pendingLanes);
              if (i !== 0) {
                var c = n;
                for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                  var f = 1 << 31 - Gl(i);
                  c.entanglements[1] |= f, i &= ~f;
                }
                ft(n), !(X & 6) && (fn = Yl() + 500, cu(0));
              }
            }
            break;
          case 31:
          case 13:
            c = xe(n, 2), c !== null && Ml(c, n, 2), Bn(), bf(n, 2);
        }
        if (n = bc(a), n === null && pi(l, t, a, Sn, e), n === u) break;
        u = n;
      }
      u !== null && a.stopPropagation();
    } else pi(l, t, a, null, e);
  }
}
function bc(l) {
  return l = Uc(l), pf(l);
}
var Sn = null;
function pf(l) {
  if (Sn = null, l = Me(l), l !== null) {
    var t = Ia(l);
    if (t === null) l = null;
    else {
      var e = t.tag;
      if (e === 13) {
        if (l = yo(t), l !== null) return l;
        l = null;
      } else if (e === 31) {
        if (l = ho(t), l !== null) return l;
        l = null;
      } else if (e === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
        l = null;
      } else t !== l && (l = null);
    }
  }
  return Sn = l, null;
}
function $d(l) {
  switch (l) {
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
      switch (Mr()) {
        case So:
          return 2;
        case po:
          return 8;
        case wu:
        case jr:
          return 32;
        case xo:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var Sc = false, Jt = null, wt = null, kt = null, Wa = /* @__PURE__ */ new Map(), Fa = /* @__PURE__ */ new Map(), Ct = [], Ky = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
function Js(l, t) {
  switch (l) {
    case "focusin":
    case "focusout":
      Jt = null;
      break;
    case "dragenter":
    case "dragleave":
      wt = null;
      break;
    case "mouseover":
    case "mouseout":
      kt = null;
      break;
    case "pointerover":
    case "pointerout":
      Wa.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Fa.delete(t.pointerId);
  }
}
function ba(l, t, e, a, u, n) {
  return l === null || l.nativeEvent !== n ? (l = { blockedOn: t, domEventName: e, eventSystemFlags: a, nativeEvent: n, targetContainers: [u] }, t !== null && (t = ia(t), t !== null && kd(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
}
function Jy(l, t, e, a, u) {
  switch (t) {
    case "focusin":
      return Jt = ba(Jt, l, t, e, a, u), true;
    case "dragenter":
      return wt = ba(wt, l, t, e, a, u), true;
    case "mouseover":
      return kt = ba(kt, l, t, e, a, u), true;
    case "pointerover":
      var n = u.pointerId;
      return Wa.set(n, ba(Wa.get(n) || null, l, t, e, a, u)), true;
    case "gotpointercapture":
      return n = u.pointerId, Fa.set(n, ba(Fa.get(n) || null, l, t, e, a, u)), true;
  }
  return false;
}
function Wd(l) {
  var t = Me(l.target);
  if (t !== null) {
    var e = Ia(t);
    if (e !== null) {
      if (t = e.tag, t === 13) {
        if (t = yo(e), t !== null) {
          l.blockedOn = t, Mf(l.priority, function() {
            Ks(e);
          });
          return;
        }
      } else if (t === 31) {
        if (t = ho(e), t !== null) {
          l.blockedOn = t, Mf(l.priority, function() {
            Ks(e);
          });
          return;
        }
      } else if (t === 3 && e.stateNode.current.memoizedState.isDehydrated) {
        l.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
        return;
      }
    }
  }
  l.blockedOn = null;
}
function Lu(l) {
  if (l.blockedOn !== null) return false;
  for (var t = l.targetContainers; 0 < t.length; ) {
    var e = bc(l.nativeEvent);
    if (e === null) {
      e = l.nativeEvent;
      var a = new e.constructor(e.type, e);
      Yi = a, e.target.dispatchEvent(a), Yi = null;
    } else return t = ia(e), t !== null && kd(t), l.blockedOn = e, false;
    t.shift();
  }
  return true;
}
function ws(l, t, e) {
  Lu(l) && e.delete(t);
}
function wy() {
  Sc = false, Jt !== null && Lu(Jt) && (Jt = null), wt !== null && Lu(wt) && (wt = null), kt !== null && Lu(kt) && (kt = null), Wa.forEach(ws), Fa.forEach(ws);
}
function _u(l, t) {
  l.blockedOn === t && (l.blockedOn = null, Sc || (Sc = true, ml.unstable_scheduleCallback(ml.unstable_NormalPriority, wy)));
}
var Du = null;
function ks(l) {
  Du !== l && (Du = l, ml.unstable_scheduleCallback(ml.unstable_NormalPriority, function() {
    Du === l && (Du = null);
    for (var t = 0; t < l.length; t += 3) {
      var e = l[t], a = l[t + 1], u = l[t + 2];
      if (typeof a != "function") {
        if (pf(a || e) === null) continue;
        break;
      }
      var n = ia(e);
      n !== null && (l.splice(t, 3), t -= 3, Pi(n, { pending: true, data: u, method: e.method, action: a }, a, u));
    }
  }));
}
function aa(l) {
  function t(f) {
    return _u(f, l);
  }
  Jt !== null && _u(Jt, l), wt !== null && _u(wt, l), kt !== null && _u(kt, l), Wa.forEach(t), Fa.forEach(t);
  for (var e = 0; e < Ct.length; e++) {
    var a = Ct[e];
    a.blockedOn === l && (a.blockedOn = null);
  }
  for (; 0 < Ct.length && (e = Ct[0], e.blockedOn === null); ) Wd(e), e.blockedOn === null && Ct.shift();
  if (e = (l.ownerDocument || l).$$reactFormReplay, e != null) for (a = 0; a < e.length; a += 3) {
    var u = e[a], n = e[a + 1], i = u[jl] || null;
    if (typeof n == "function") i || ks(e);
    else if (i) {
      var c = null;
      if (n && n.hasAttribute("formAction")) {
        if (u = n, i = n[jl] || null) c = i.formAction;
        else if (pf(u) !== null) continue;
      } else c = i.action;
      typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), ks(e);
    }
  }
}
function Fd() {
  function l(n) {
    n.canIntercept && n.info === "react-transition" && n.intercept({ handler: function() {
      return new Promise(function(i) {
        return u = i;
      });
    }, focusReset: "manual", scroll: "manual" });
  }
  function t() {
    u !== null && (u(), u = null), a || setTimeout(e, 20);
  }
  function e() {
    if (!a && !navigation.transition) {
      var n = navigation.currentEntry;
      n && n.url != null && navigation.navigate(n.url, { state: n.getState(), info: "react-transition", history: "replace" });
    }
  }
  if (typeof navigation == "object") {
    var a = false, u = null;
    return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(e, 100), function() {
      a = true, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
    };
  }
}
function xf(l) {
  this._internalRoot = l;
}
qn.prototype.render = xf.prototype.render = function(l) {
  var t = this._internalRoot;
  if (t === null) throw Error(S(409));
  var e = t.current, a = Ql();
  wd(e, a, l, t, null, null);
};
qn.prototype.unmount = xf.prototype.unmount = function() {
  var l = this._internalRoot;
  if (l !== null) {
    this._internalRoot = null;
    var t = l.containerInfo;
    wd(l.current, 2, null, l, null, null), Bn(), t[na] = null;
  }
};
function qn(l) {
  this._internalRoot = l;
}
qn.prototype.unstable_scheduleHydration = function(l) {
  if (l) {
    var t = _o();
    l = { blockedOn: null, target: l, priority: t };
    for (var e = 0; e < Ct.length && t !== 0 && t < Ct[e].priority; e++) ;
    Ct.splice(e, 0, l), e === 0 && Wd(l);
  }
};
var $s = ro.version;
if ($s !== "19.2.3") throw Error(S(527, $s, "19.2.3"));
Z.findDOMNode = function(l) {
  var t = l._reactInternals;
  if (t === void 0) throw typeof l.render == "function" ? Error(S(188)) : (l = Object.keys(l).join(","), Error(S(268, l)));
  return l = Tr(t), l = l !== null ? vo(l) : null, l = l === null ? null : l.stateNode, l;
};
var ky = { bundleType: 0, version: "19.2.3", rendererPackageName: "react-dom", currentDispatcherRef: N, reconcilerVersion: "19.2.3" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Nu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Nu.isDisabled && Nu.supportsFiber) try {
    Pa = Nu.inject(ky), ql = Nu;
  } catch {
  }
}
xn.createRoot = function(l, t) {
  if (!mo(l)) throw Error(S(299));
  var e = false, a = "", u = Z0, n = L0, i = V0;
  return t != null && (t.unstable_strictMode === true && (e = true), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = Kd(l, 1, false, null, null, e, a, null, u, n, i, Fd), l[na] = t.current, hf(l), new xf(t);
};
xn.hydrateRoot = function(l, t, e) {
  if (!mo(l)) throw Error(S(299));
  var a = false, u = "", n = Z0, i = L0, c = V0, f = null;
  return e != null && (e.unstable_strictMode === true && (a = true), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (f = e.formState)), t = Kd(l, 1, true, t, e ?? null, a, u, f, n, i, c, Fd), t.context = Jd(null), e = t.current, a = Ql(), a = Nc(a), u = Zt(a), u.callback = null, Lt(e, u, a), e = a, t.current.lanes = e, tu(t, e), ft(t), l[na] = t.current, hf(l), new qn(t);
};
xn.version = "19.2.3";
function Id() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Id);
  } catch (l) {
    console.error(l);
  }
}
Id(), Is.exports = xn;
var $y = Is.exports;
function Wy({ activeFilter: l, onFilterSelect: t, projects: e, contexts: a, tags: u = [], isOpen: n, onClose: i, onSyncClick: c, onPullClick: f, isSyncing: r, isAuthenticated: m, onDropboxSync: h, onDropboxPull: d, isDropboxAuth: v, isDropboxSyncing: p, onGTasksSync: x }) {
  const [E, o] = V.useState(true), [s, y] = V.useState(true), [b, A] = V.useState(true), [j, T] = V.useState(true), [D, O] = V.useState(true), M = (q, te) => l.type === q && (te === void 0 || l.value === te), ul = (q) => `flex items-center gap-2 px-2 py-1.5 rounded text-sm font-medium w-full text-left transition-colors ${q ? "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"}`;
  return g.jsxs(g.Fragment, { children: [n && g.jsx("div", { className: "fixed inset-0 bg-black/50 z-40 md:hidden", onClick: i }), g.jsxs("aside", { className: `
            w-[305px] bg-zinc-900 flex flex-col border-r border-zinc-800 pt-8 pl-8 pr-4 shrink-0 overflow-y-auto
            fixed md:static inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
            ${n ? "translate-x-0 shadow-xl" : "-translate-x-full md:translate-x-0"}
            bg-zinc-900 text-zinc-300
        `, children: [g.jsxs("nav", { className: "space-y-1 mb-8", children: [g.jsxs("button", { onClick: () => {
    t({ type: "inbox" }), i && i();
  }, className: ul(l.type === "inbox"), children: [g.jsx("span", { className: "text-blue-500 text-lg leading-none", children: "\u{1F4E5}" }), " Inbox"] }), g.jsxs("button", { onClick: () => {
    t({ type: "today" }), i && i();
  }, className: ul(l.type === "today"), children: [g.jsx("span", { className: "text-green-500 text-lg leading-none", children: "\u{1F4C5}" }), " Today"] }), g.jsxs("button", { onClick: () => {
    t({ type: "upcoming" }), i && i();
  }, className: ul(l.type === "upcoming"), children: [g.jsx("span", { className: "text-purple-500 text-lg leading-none", children: "\u{1F5D3}" }), " Upcoming"] })] }), g.jsxs("div", { onClick: () => T(!j), className: "flex items-center justify-between px-2 py-1 mt-4 text-gray-500 hover:text-gray-700 cursor-pointer text-xs font-bold uppercase tracking-wider", children: [g.jsx("span", { children: "Views" }), g.jsx("span", { children: j ? "\u25BC" : "\u25B6" })] }), j && g.jsxs("div", { className: "mt-1 space-y-0.5", children: [g.jsxs("div", { onClick: () => t({ type: "view", value: "all" }), className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${M("view", "all") ? "bg-orange-100 text-orange-800" : "text-gray-700 hover:bg-gray-100"}`, children: [g.jsx("span", { children: "\u{1F4D1}" }), " All"] }), g.jsxs("div", { onClick: () => t({ type: "view", value: "open" }), className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${M("view", "open") ? "bg-emerald-100 text-emerald-800" : "text-gray-700 hover:bg-gray-100"}`, children: [g.jsx("span", { children: "\u26A1" }), " Open"] }), g.jsxs("div", { onClick: () => t({ type: "view", value: "done" }), className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${M("view", "done") ? "bg-gray-200 text-gray-800" : "text-gray-700 hover:bg-gray-100"}`, children: [g.jsx("span", { children: "\u2705" }), " Done"] })] }), g.jsxs("div", { onClick: () => O(!D), className: "flex items-center justify-between px-2 py-1 mt-4 text-gray-500 hover:text-gray-700 cursor-pointer text-xs font-bold uppercase tracking-wider", children: [g.jsx("span", { children: "Filters" }), g.jsx("span", { children: D ? "\u25BC" : "\u25B6" })] }), D && g.jsxs("div", { className: "mt-1 space-y-0.5", children: [g.jsxs("div", { onClick: () => t({ type: "filter", value: "no-due" }), className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${M("filter", "no-due") ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-gray-100"}`, children: [g.jsx("span", { children: "\u{1F6AB}" }), " No Due Date"] }), g.jsxs("div", { onClick: () => t({ type: "filter", value: "no-project" }), className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${M("filter", "no-project") ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-gray-100"}`, children: [g.jsx("span", { children: "\u{1F4C2}" }), " No Project"] })] }), g.jsxs("div", { className: "mb-6", children: [g.jsxs("h3", { className: "flex items-center justify-between text-gray-500 font-bold text-xs px-2 mb-2 group cursor-pointer hover:text-gray-700", onClick: () => o(!E), children: [g.jsxs("span", { className: "flex items-center gap-1", children: [g.jsx("span", { className: `transition-transform duration-200 ${E ? "" : "-rotate-90"}`, children: "\u25BC" }), "Projects"] }), g.jsx("button", { className: "opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded p-0.5", onClick: (q) => q.stopPropagation(), children: "+" })] }), E && g.jsxs("div", { className: "space-y-0.5", children: [e.length === 0 && g.jsx("div", { className: "px-2 text-xs text-gray-400 italic", children: "No projects yet" }), e.map((q) => g.jsxs("button", { onClick: () => {
    t({ type: "project", value: q }), i && i();
  }, className: ul(l.type === "project" && l.value === q), children: [g.jsx("span", { className: "text-gray-400 text-xs", children: "\u25CF" }), q] }, q))] })] }), g.jsxs("div", { className: "mb-6", children: [g.jsxs("h3", { className: "flex items-center justify-between text-gray-500 font-bold text-xs px-2 mb-2 group cursor-pointer hover:text-gray-700", onClick: () => y(!s), children: [g.jsxs("span", { className: "flex items-center gap-1", children: [g.jsx("span", { className: `transition-transform duration-200 ${s ? "" : "-rotate-90"}`, children: "\u25BC" }), "Contexts"] }), g.jsx("button", { className: "opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded p-0.5", onClick: (q) => q.stopPropagation(), children: "+" })] }), s && g.jsxs("div", { className: "space-y-0.5", children: [a.length === 0 && g.jsx("div", { className: "px-2 text-xs text-gray-400 italic", children: "No contexts yet" }), a.map((q) => g.jsxs("button", { onClick: () => {
    t({ type: "context", value: q }), i && i();
  }, className: ul(l.type === "context" && l.value === q), children: [g.jsx("span", { className: "text-gray-400 text-lg leading-none", children: "@" }), q] }, q))] })] }), g.jsxs("div", { className: "mb-6", children: [g.jsxs("h3", { className: "flex items-center justify-between text-gray-500 font-bold text-xs px-2 mb-2 group cursor-pointer hover:text-gray-700", onClick: () => A(!b), children: [g.jsxs("span", { className: "flex items-center gap-1", children: [g.jsx("span", { className: `transition-transform duration-200 ${b ? "" : "-rotate-90"}`, children: "\u25BC" }), "Tags"] }), g.jsx("button", { className: "opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded p-0.5", onClick: (q) => q.stopPropagation(), children: "+" })] }), b && g.jsxs("div", { className: "space-y-0.5", children: [u.length === 0 && g.jsx("div", { className: "px-2 text-xs text-gray-400 italic", children: "No tags yet" }), u.map((q) => g.jsxs("button", { onClick: () => {
    t({ type: "tag", value: q }), i && i();
  }, className: ul(l.type === "tag" && l.value === q), children: [g.jsx("span", { className: "text-gray-400 text-xs", children: "#" }), q] }, q))] })] }), g.jsxs("div", { className: "mt-auto border-t border-gray-100 dark:border-zinc-800 pt-4 mb-4", children: [g.jsx("h3", { className: "text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-2", children: "Sync & Settings" }), g.jsxs("div", { className: "space-y-2 px-2", children: [g.jsxs("div", { className: "flex items-center justify-between", children: [g.jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: "Google Drive" }), g.jsxs("div", { className: "flex items-center gap-2", children: [g.jsx("button", { onClick: c, className: `p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 ${r ? "animate-pulse text-blue-500" : "text-gray-500"}`, title: m ? "Sync Drive" : "Login Google", children: m ? "\u2601\uFE0F" : "\u{1F511}" }), m && g.jsx("button", { onClick: f, className: `p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 ${r ? "animate-spin" : "text-gray-500"}`, title: "Pull from Drive", children: "\u{1F504}" })] })] }), m && g.jsxs("div", { className: "flex items-center justify-between", children: [g.jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: "Google Tasks" }), g.jsx("button", { onClick: x, className: `p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 ${r ? "animate-pulse text-blue-500" : "text-gray-500"}`, title: "Push to GTasks", children: "\u2611\uFE0F" })] }), g.jsxs("div", { className: "flex items-center justify-between", children: [g.jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: "Dropbox" }), g.jsxs("div", { className: "flex items-center gap-2", children: [g.jsx("button", { onClick: h, className: `p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 ${p ? "animate-pulse text-blue-500" : "text-gray-500"}`, title: v ? "Sync Dropbox" : "Login Dropbox", children: v ? "\u{1F4E6}" : "Login" }), v && g.jsx("button", { onClick: d, className: `p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 ${p ? "animate-spin" : "text-gray-500"}`, title: "Pull from Dropbox", children: "\u{1F504}" })] })] })] })] })] })] });
}
function Ti(l) {
  let t = l.trim();
  if (!t) return null;
  const e = { id: Fy(), raw: t, text: "", completed: false, priority: null, completionDate: null, creationDate: null, projects: [], contexts: [], tags: [], metadata: {} };
  let a = t;
  a.startsWith("x ") && (e.completed = true, a = a.substring(2).trim());
  const u = a.match(/^\(([A-Z])\)\s/);
  u && (e.priority = u[1], a = a.substring(u[0].length).trim());
  const n = /^(\d{4}-\d{2}-\d{2})/, i = a.match(n);
  if (i) {
    const h = i[1];
    a = a.substring(h.length).trim();
    const d = a.match(n);
    d ? e.completed ? (e.completionDate = h, e.creationDate = d[1], a = a.substring(d[1].length).trim()) : e.creationDate = h : e.completed ? e.completionDate = h : e.creationDate = h;
  }
  e.text = a;
  const c = a.matchAll(/(^|\s)\+([\w.-]+)/g);
  for (const h of c) e.projects.includes(h[2]) || e.projects.push(h[2]);
  const f = a.matchAll(/(^|\s)@([\w.-]+)/g);
  for (const h of f) e.contexts.includes(h[2]) || e.contexts.push(h[2]);
  const r = a.matchAll(/(^|\s)#([\w.-]+)/g);
  for (const h of r) e.tags.includes(h[2]) || e.tags.push(h[2]);
  const m = a.matchAll(/(^|\s)(\w+):(\S+)/g);
  for (const h of m) e.metadata[h[2]] = h[3];
  return e;
}
function Fy() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}
const tt = { tasks: [], listeners: [], undoStack: [], init() {
  this.loadFromPersistence();
}, subscribe(l) {
  return this.listeners.push(l), () => this.unsubscribe(l);
}, unsubscribe(l) {
  this.listeners = this.listeners.filter((t) => t !== l);
}, notify() {
  this.listeners.forEach((l) => l(this.tasks));
}, loadFromString(l) {
  const t = l.split(`
`);
  this.tasks = [], t.forEach((e) => {
    if (!e.trim()) return;
    const a = Ti(e);
    a && this.tasks.push(a);
  }), this.saveToPersistence(), this.notify();
}, loadFromLocalStorage() {
  try {
    const l = localStorage.getItem("todoTxtTasks");
    if (l) {
      const t = JSON.parse(l);
      Array.isArray(t) && (this.tasks = t);
    }
  } catch (l) {
    console.error("Failed to load tasks:", l);
  }
}, saveToLocalStorage() {
  try {
    localStorage.setItem("todoTxtTasks", JSON.stringify(this.tasks));
  } catch (l) {
    console.error("Failed to save tasks:", l);
  }
}, loadFromPersistence() {
  this.loadFromLocalStorage();
}, saveToPersistence() {
  this.saveToLocalStorage();
}, saveUndoState() {
  this.undoStack.push(JSON.parse(JSON.stringify(this.tasks)));
}, undo() {
  this.undoStack.length !== 0 && (this.tasks = this.undoStack.pop(), this.saveToPersistence(), this.notify());
}, addTask(l) {
  const t = Ti(l);
  !t || !t.text.trim() || (this.saveUndoState(), this.tasks.push(t), this.saveToPersistence(), this.notify());
}, updateTask(l, t) {
  const e = this.tasks.findIndex((a) => a.id === l);
  if (e !== -1) {
    this.saveUndoState();
    const a = Ti(t);
    a.id = l, this.tasks[e].creationDate && !a.creationDate && (a.creationDate = this.tasks[e].creationDate), this.tasks[e] = a, this.saveToPersistence(), this.notify();
  }
}, deleteTask(l) {
  this.saveUndoState(), this.tasks = this.tasks.filter((t) => t.id !== l), this.saveToPersistence(), this.notify();
}, toggleTask(l) {
  const t = this.tasks.find((u) => u.id === l);
  if (!t) return;
  this.saveUndoState(), t.completed = !t.completed;
  const e = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  let a = t.raw;
  a = a.replace(/^x\s\d{4}-\d{2}-\d{2}\s/, "").trim(), t.completed ? (t.completionDate = e, a = `x ${e} ${a}`) : t.completionDate = null, t.raw = a, this.saveToLocalStorage(), this.notify();
}, deleteTask(l) {
  this.saveUndoState(), this.tasks = this.tasks.filter((t) => t.id !== l), this.saveToLocalStorage(), this.notify();
}, getTasks() {
  return this.tasks;
} };
function Iy({ task: l, selected: t, onSelect: e, selectionMode: a }) {
  const [u, n] = V.useState(false), i = (m) => {
    m.stopPropagation(), tt.toggleTask(l.id);
  }, c = (m) => {
    tt.updateTask(l.id, m), n(false);
  }, f = { A: "text-red-500", B: "text-orange-500", C: "text-blue-500" }[l.priority] || "text-gray-500", r = (m) => m.split(/(\+[\w.-]+|@[\w.-]+|#[\w.-]+)/g).map((d, v) => d.startsWith("+") ? g.jsx("span", { className: "text-todoist-brand hover:underline cursor-pointer", children: d }, v) : d.startsWith("@") ? g.jsx("span", { className: "text-todoist-textSec hover:underline cursor-pointer", children: d }, v) : d.startsWith("#") ? g.jsx("span", { className: "text-emerald-600 hover:underline cursor-pointer", children: d }, v) : d);
  return u ? g.jsx("div", { className: "py-2 -mx-4 px-4 bg-gray-50 dark:bg-zinc-800 border-b border-gray-100 dark:border-zinc-700", children: g.jsx("input", { type: "text", defaultValue: l.raw, autoFocus: true, className: "w-full bg-transparent text-sm text-gray-800 dark:text-gray-200 outline-none placeholder-gray-400", onKeyDown: (m) => {
    m.key === "Enter" ? c(m.target.value) : m.key === "Escape" && n(false);
  }, onBlur: (m) => c(m.target.value) }) }) : g.jsxs("div", { className: `group flex items-center py-3 border-b border-gray-800 hover:bg-zinc-900 -mx-4 px-4 transition-colors cursor-pointer ${t ? "bg-blue-900/20" : ""}`, "data-id": l.id, onClick: () => n(true), children: [g.jsx("button", { onClick: (m) => {
    m.stopPropagation(), tt.deleteTask(l.id);
  }, className: "p-2 text-zinc-500 hover:text-red-500 transition-colors mr-2", title: "Delete task", children: "\u2715" }), g.jsx("div", { className: "mr-3 flex-shrink-0", onClick: (m) => m.stopPropagation(), children: g.jsx("input", { type: "checkbox", checked: t || false, onChange: (m) => {
    e && e();
  }, className: "w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500 cursor-pointer" }) }), g.jsx("button", { onClick: i, className: `mr-3 w-5 h-5 rounded-full border border-zinc-500 hover:border-zinc-300 flex items-center justify-center text-transparent hover:text-zinc-500 transition-all ${l.completed ? "!bg-zinc-500 !border-zinc-500 text-white !text-white" : ""}`, children: l.completed ? "\u2713" : "" }), g.jsxs("div", { className: "flex-1 min-w-0", children: [g.jsxs("div", { className: `text-sm text-zinc-200 ${l.completed ? "line-through text-zinc-500" : ""}`, children: [l.priority && g.jsxs("span", { className: `text-xs font-bold mr-2 ${f}`, children: ["(", l.priority, ")"] }), r(l.text)] }), g.jsx("div", { className: "flex items-center gap-2 mt-1", children: l.metadata.due && g.jsxs("span", { className: "text-xs text-red-400 flex items-center gap-1", children: ["\u{1F4C5} ", l.metadata.due] }) })] })] });
}
function Py({ onCancel: l, initialValue: t = "", onSubmit: e, submitLabel: a = "Add task" }) {
  const [u, n] = V.useState(t), [i, c] = V.useState(false), f = (m) => {
    m.preventDefault(), !(!u.trim() || i) && (c(true), e ? e(u) : tt.addTask(u), n(""), c(false), l && l());
  }, r = (m) => {
    m.key === "Escape" && l && l();
  };
  return g.jsx("form", { onSubmit: f, className: "mb-4", children: g.jsxs("div", { className: "flex flex-col border border-gray-300 dark:border-zinc-700 rounded-lg shadow-sm focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 bg-white dark:bg-zinc-800", children: [g.jsx("input", { type: "text", value: u, onChange: (m) => n(m.target.value), onKeyDown: r, placeholder: "Task name e.g. Buy milk @shopping p:1 #Home", className: "w-full px-3 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 border-none outline-none rounded-t-lg bg-transparent", autoFocus: true }), g.jsxs("div", { className: "flex justify-between items-center px-2 py-2 border-t border-gray-100 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 rounded-b-lg", children: [g.jsxs("div", { className: "flex gap-1", children: [g.jsx("button", { type: "button", className: "p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded text-gray-500 dark:text-gray-400 text-xs font-medium px-2 border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800", children: "\u{1F4C5} Due date" }), g.jsx("button", { type: "button", className: "p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded text-gray-500 dark:text-gray-400 text-xs font-medium px-2 border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800", children: "\u{1F3F7} Label" }), g.jsx("button", { type: "button", className: "p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded text-gray-500 dark:text-gray-400 text-xs font-medium px-2 border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800", children: "\u{1F6A9} Priority" })] }), g.jsxs("div", { className: "flex gap-2", children: [l && g.jsx("button", { type: "button", onClick: l, className: "px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 rounded", children: "Cancel" }), g.jsx("button", { type: "submit", disabled: !u.trim(), className: "px-3 py-1.5 text-xs font-bold text-white bg-todoist-brand hover:bg-todoist-limit rounded disabled:opacity-50 disabled:cursor-not-allowed", children: a })] })] })] }) });
}
function lh({ tasks: l, activeFilter: t, selectedTaskIds: e, onTaskSelect: a }) {
  const [u, n] = V.useState(false), i = () => {
    if (!t) return "Inbox";
    switch (t.type) {
      case "inbox":
        return "Inbox";
      case "today":
        return "Today";
      case "upcoming":
        return "Upcoming";
      case "project":
        return `${t.value}`;
      case "context":
        return `@${t.value}`;
      default:
        return "Inbox";
    }
  };
  return g.jsxs("div", { className: "pb-20", children: [g.jsxs("header", { className: "mb-6", children: [g.jsx("h1", { className: "text-xl font-bold text-gray-800", children: i() }), g.jsx("div", { className: "text-xs text-gray-500 mt-1", children: (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, { weekday: "short", day: "numeric", month: "short" }) })] }), g.jsx("div", { className: "mb-4", children: l.map((c) => g.jsx(Iy, { task: c, selected: e == null ? void 0 : e.has(c.id), onSelect: () => a && a(c.id), selectionMode: e && e.size > 0 }, c.id)) }), u ? g.jsx(Py, { onCancel: () => n(false) }) : g.jsxs("button", { onClick: () => n(true), className: "flex items-center gap-2 text-gray-500 hover:text-todoist-brand font-medium text-sm w-full py-2 group", children: [g.jsx("span", { className: "flex items-center justify-center w-5 h-5 rounded-full text-todoist-brand group-hover:bg-todoist-brand group-hover:text-white transition-colors text-lg leading-none", children: "+" }), "Add task"] }), l.length === 0 && !u && g.jsxs("div", { className: "text-center py-10", children: [g.jsx("div", { className: "mb-4 text-6xl", children: "\u{1F389}" }), g.jsx("div", { className: "text-gray-800 font-medium", children: "All clear" }), g.jsx("div", { className: "text-gray-500 text-sm mt-2", children: "Looks like everything's organized in the right place." })] })] });
}
function th({ selectedCount: l, onDeselectAll: t, onCompleteAll: e, onDeleteAll: a }) {
  return l === 0 ? null : g.jsxs("div", { className: "fixed bottom-0 left-0 right-0 md:left-[305px] bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700 p-4 flex items-center justify-between shadow-lg z-30 transition-all transform translate-y-0", children: [g.jsxs("div", { className: "flex items-center gap-4", children: [g.jsxs("span", { className: "font-semibold text-sm text-gray-700 dark:text-gray-300", children: [l, " selected"] }), g.jsx("button", { onClick: t, className: "text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200", children: "Cancel" })] }), g.jsxs("div", { className: "flex items-center gap-2", children: [g.jsx("button", { onClick: e, className: "px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-md text-sm font-medium transition-colors", children: "Complete" }), g.jsx("button", { onClick: a, className: "px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm font-medium transition-colors", children: "Delete" })] })] });
}
function eh({ searchValue: l, onSearch: t, onQuickAdd: e, onMenuClick: a, onSettingsClick: u }) {
  return g.jsxs("div", { className: "fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800 z-40 flex items-center gap-3", children: [g.jsx("button", { className: "p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 rounded-xl transition-colors shrink-0", onClick: a, children: g.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", className: "fill-current", children: g.jsx("path", { d: "M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" }) }) }), g.jsxs("div", { className: "relative flex-1", children: [g.jsx("input", { type: "text", placeholder: "Search or add task...", className: "w-full bg-zinc-800 text-zinc-100 placeholder-zinc-500 rounded-xl px-4 py-3 text-sm outline-none focus:bg-zinc-700 focus:ring-1 focus:ring-zinc-600 transition-all font-medium border border-zinc-700 shadow-sm", value: l, onChange: (n) => t(n.target.value), onKeyDown: (n) => {
    n.key === "Enter" && e(l);
  } }), l && g.jsx("button", { onClick: () => e(l), className: "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors", children: g.jsx("span", { className: "text-xs font-bold", children: "\u21B5" }) })] }), g.jsx("button", { className: "p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 rounded-xl transition-colors shrink-0", onClick: u, title: "Settings", children: g.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", className: "fill-current", children: g.jsx("path", { d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.09 8.87a.49.49 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" }) }) })] });
}
const ah = "905370258679-k4ul7054amj1a90c505r08t6mp643k7u.apps.googleusercontent.com", uh = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/tasks";
function nh(l) {
  const [t, e] = V.useState(false), [a, u] = V.useState(false), [n, i] = V.useState(null);
  V.useEffect(() => {
    (() => {
      if (window.gapi) c();
      else {
        const E = document.createElement("script");
        E.src = "https://apis.google.com/js/api.js", E.onload = () => c(), document.body.appendChild(E);
      }
      if (window.google) f();
      else {
        const E = document.createElement("script");
        E.src = "https://accounts.google.com/gsi/client", E.onload = () => f(), document.body.appendChild(E);
      }
    })();
  }, []);
  const c = () => {
    window.gapi.load("client", async () => {
      await window.gapi.client.init({ discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest", "https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"] });
    });
  }, f = () => {
    const x = window.google.accounts.oauth2.initTokenClient({ client_id: ah, scope: uh, callback: (E) => {
      if (E.error !== void 0) throw E;
      e(true);
    } });
    i(x);
  }, r = () => {
    n && n.requestAccessToken({ prompt: "consent" });
  }, m = async (x) => {
    if (!t) {
      r();
      return;
    }
    u(true);
    try {
      const E = x.map((b) => b.raw).join(`
`), s = (await window.gapi.client.drive.files.list({ q: "name = 'todo.txt' and trashed = false", fields: "files(id, name)", spaces: "drive" })).result.files, y = { name: "todo.txt", mimeType: "text/plain" };
      s && s.length > 0 ? (await h(s[0].id, E), console.log("Updated existing todo.txt")) : (await d(y, E), console.log("Created new todo.txt"));
    } catch (E) {
      console.error("Drive Push failed", E);
    } finally {
      u(false);
    }
  }, h = async (x, E) => {
    const o = `https://www.googleapis.com/upload/drive/v3/files/${x}?uploadType=media`, s = window.gapi.client.getToken().access_token;
    await fetch(o, { method: "PATCH", headers: { Authorization: `Bearer ${s}`, "Content-Type": "text/plain" }, body: E });
  }, d = async (x, E) => {
    const o = new FormData();
    o.append("metadata", new Blob([JSON.stringify(x)], { type: "application/json" })), o.append("file", new Blob([E], { type: "text/plain" }));
    const s = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", y = window.gapi.client.getToken().access_token;
    await fetch(s, { method: "POST", headers: { Authorization: `Bearer ${y}` }, body: o });
  };
  return { isAuthenticated: t, isSyncing: a, login: r, syncPushDrive: m, syncPullDrive: async () => {
    if (!t) {
      r();
      return;
    }
    u(true);
    try {
      const E = (await window.gapi.client.drive.files.list({ q: "name = 'todo.txt' and trashed = false", fields: "files(id, name)", spaces: "drive" })).result.files;
      if (E && E.length > 0) {
        const o = await window.gapi.client.drive.files.get({ fileId: E[0].id, alt: "media" });
        l(o.body);
      }
    } catch (x) {
      console.error("Drive Pull failed", x);
    } finally {
      u(false);
    }
  }, syncPushTasks: async (x) => {
    if (!t) {
      r();
      return;
    }
    u(true);
    try {
      const o = (await window.gapi.client.tasks.tasklists.list()).result.items[0];
      for (const s of x) s.completed || await window.gapi.client.tasks.tasks.insert({ tasklist: o.id, resource: { title: s.text, notes: s.raw } });
      console.log("Pushed tasks to Google Tasks");
    } catch (E) {
      console.error("GTasks Push failed", E);
    } finally {
      u(false);
    }
  } };
}
const ih = "YOUR_DROPBOX_APP_KEY_HERE";
function ch(l) {
  const [t, e] = V.useState(false), [a, u] = V.useState(null), [n, i] = V.useState(false);
  V.useEffect(() => {
    const m = window.location.hash;
    if (m.includes("access_token")) {
      const d = new URLSearchParams(m.substring(1)).get("access_token");
      d && (u(d), e(true), window.history.replaceState(null, null, window.location.pathname), sessionStorage.setItem("dropbox_token", d));
    } else {
      const h = sessionStorage.getItem("dropbox_token");
      h && (u(h), e(true));
    }
  }, []);
  const c = () => {
    const m = window.location.origin, h = `https://www.dropbox.com/oauth2/authorize?client_id=${ih}&response_type=token&redirect_uri=${m}`;
    window.location.href = h;
  };
  return { isAuthenticated: t, isSyncing: n, login: c, syncPush: async (m) => {
    if (!a) {
      c();
      return;
    }
    i(true);
    try {
      const h = m.map((v) => v.raw).join(`
`), d = new Blob([h], { type: "text/plain" });
      await fetch("https://content.dropboxapi.com/2/files/upload", { method: "POST", headers: { Authorization: `Bearer ${a}`, "Dropbox-API-Arg": JSON.stringify({ path: "/todo.txt", mode: "overwrite", autorename: true, mute: false }), "Content-Type": "application/octet-stream" }, body: d }), console.log("Dropbox push successful");
    } catch (h) {
      console.error("Dropbox push failed", h), h.status === 401 && (e(false), sessionStorage.removeItem("dropbox_token"));
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
      const m = await fetch("https://content.dropboxapi.com/2/files/download", { method: "POST", headers: { Authorization: `Bearer ${a}`, "Dropbox-API-Arg": JSON.stringify({ path: "/todo.txt" }) } });
      if (m.ok) {
        const h = await m.text();
        l(h), console.log("Dropbox pull successful");
      } else throw new Error(await m.text());
    } catch (m) {
      console.error("Dropbox pull failed", m);
    } finally {
      i(false);
    }
  } };
}
function fh() {
  const [l, t] = V.useState(tt.getTasks()), [e, a] = V.useState({ type: "inbox" }), [u, n] = V.useState(false), i = (Q) => {
    tt.loadFromString(Q);
  }, { isAuthenticated: c, isSyncing: f, login: r, syncPushDrive: m, syncPullDrive: h, syncPushTasks: d } = nh(i), { isAuthenticated: v, isSyncing: p, login: x, syncPush: E, syncPull: o } = ch(i);
  V.useEffect(() => (tt.init(), tt.subscribe((Q) => {
    t([...Q]);
  }), () => {
  }), []);
  const [s, y] = V.useState(""), b = V.useMemo(() => {
    let Q = l;
    if (s.trim()) {
      const tl = s.toLowerCase();
      Q = Q.filter((z) => z.raw.toLowerCase().includes(tl));
    }
    if (!e) return Q;
    switch (e.type) {
      case "today":
        const tl = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        return Q.filter((_) => _.metadata && _.metadata.due === tl);
      case "upcoming":
        const z = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        return Q.filter((_) => _.metadata && _.metadata.due > z);
      case "project":
        return Q.filter((_) => _.projects.includes(e.value));
      case "context":
        return Q.filter((_) => _.contexts && _.contexts.includes(e.value));
      case "tag":
        return Q.filter((_) => _.tags && _.tags.includes(e.value));
      case "inbox":
      default:
        return Q;
    }
  }, [l, e, s]), A = (Q) => {
    if (!Q.trim()) return;
    let tl = Q;
    if (e) switch (e.type) {
      case "project":
        tl += ` +${e.value}`;
        break;
      case "context":
        tl += ` @${e.value}`;
        break;
      case "tag":
        tl += ` #${e.value}`;
        break;
      case "today":
        const z = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        tl += ` due:${z}`;
        break;
    }
    tt.addTask(tl), y("");
  }, j = V.useMemo(() => [...new Set(l.flatMap((Q) => Q.projects || []))].sort(), [l]), T = V.useMemo(() => [...new Set(l.flatMap((Q) => Q.contexts || []))].sort(), [l]), D = V.useMemo(() => [...new Set(l.flatMap((Q) => Q.tags || []))].sort(), [l]), [O, M] = V.useState(/* @__PURE__ */ new Set()), ul = (Q) => {
    const tl = new Set(O);
    tl.has(Q) ? tl.delete(Q) : tl.add(Q), M(tl);
  }, q = () => {
    l.filter((tl) => O.has(tl.id)).forEach((tl) => tt.updateTask(tl.id, { completed: true })), M(/* @__PURE__ */ new Set());
  }, te = () => {
    Array.from(O).forEach((Q) => tt.deleteTask(Q)), M(/* @__PURE__ */ new Set());
  };
  return g.jsx(g.Fragment, { children: g.jsxs("div", { className: "flex flex-col h-full", children: [g.jsxs("div", { className: "flex flex-1 overflow-hidden relative", children: [g.jsx(Wy, { activeFilter: e, onFilterSelect: a, projects: j, contexts: T, tags: D, tasks: l, isOpen: u, onClose: () => n(false), onSyncClick: () => c ? m(l) : r(), onPullClick: h, isSyncing: f, isAuthenticated: c, onDropboxSync: () => v ? E(l) : x(), onDropboxPull: o, isDropboxAuth: v, isDropboxSyncing: p, onGTasksSync: () => c ? d(l) : r() }), g.jsx("main", { id: "main-content", className: "flex-1 overflow-y-auto bg-zinc-950 p-4 sm:p-8 flex justify-center transition-colors pb-32", children: g.jsx("div", { className: "w-full max-w-3xl", children: g.jsx("div", { className: "mt-8 space-y-2", children: g.jsx(lh, { tasks: b, activeFilter: e, selectedTaskIds: O, onTaskSelect: ul }) }) }) }), g.jsx(th, { selectedCount: O.size, onDeselectAll: () => M(/* @__PURE__ */ new Set()), onCompleteAll: q, onDeleteAll: te })] }), g.jsx(eh, { searchValue: s, onSearch: y, onQuickAdd: A, onMenuClick: () => n(!u), onSettingsClick: () => alert("Settings (Google/Dropbox) will go here soon!") })] }) });
}
$y.createRoot(document.getElementById("root")).render(g.jsx(fh, {}));
