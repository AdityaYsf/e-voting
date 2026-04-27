import { jsx as t, jsxs as l, Fragment as N } from "react/jsx-runtime";
import { useState as W, useRef as k, useEffect as d } from "react";
const w = {
  sm: { s: 28, f: "11px", g: "8px" },
  md: { s: 44, f: "13px", g: "12px" },
  lg: { s: 64, f: "15px", g: "16px" },
  xl: { s: 88, f: "18px", g: "22px" }
}, F = {
  light: { bg: "rgba(255,255,255,0.9)", tx: "#1a1a2e" },
  dark: { bg: "rgba(10,10,20,0.92)", tx: "#f0f0f0" },
  blur: { bg: "rgba(20,15,50,0.5)", tx: "#fff" },
  transparent: { bg: "rgba(0,0,0,0)", tx: "#f0f0f0" },
  gradient: {
    bg: "linear-gradient(135deg,rgba(15,15,40,.95),rgba(50,10,80,.95))",
    tx: "#e8d5ff"
  }
}, V = `
  @keyframes lSpin{to{transform:rotate(360deg)}}
  @keyframes lBounce{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}
  @keyframes lPR{0%{transform:scale(.8);opacity:.6}100%{transform:scale(1.8);opacity:0}}
  @keyframes lPC{0%,100%{transform:scale(.9)}50%{transform:scale(1.1)}}
  @keyframes lBar{0%,100%{height:30%;opacity:.4}50%{height:100%;opacity:1}}
  @keyframes lFI{from{opacity:0}to{opacity:1}}
  @keyframes lShim{0%{background-position:0 50%}100%{background-position:200% 50%}}
`, Z = ({ s: e, color: n }) => /* @__PURE__ */ t(
  "svg",
  {
    width: e,
    height: e,
    viewBox: "0 0 50 50",
    style: { animation: "lSpin .9s linear infinite" },
    children: /* @__PURE__ */ t(
      "circle",
      {
        cx: "25",
        cy: "25",
        r: "20",
        fill: "none",
        stroke: n,
        strokeWidth: "4",
        strokeLinecap: "round",
        strokeDasharray: "90 60"
      }
    )
  }
), _ = ({ s: e, color: n }) => /* @__PURE__ */ t("div", { style: { display: "flex", gap: e * 0.18, alignItems: "center" }, children: [0, 1, 2].map((i) => /* @__PURE__ */ t(
  "div",
  {
    style: {
      width: e * 0.22,
      height: e * 0.22,
      borderRadius: "50%",
      background: n,
      animation: `lBounce 1.2s ease-in-out ${i * 0.2}s infinite`
    }
  },
  i
)) }), q = ({ s: e, color: n }) => /* @__PURE__ */ l("div", { style: { position: "relative", width: e, height: e }, children: [
  /* @__PURE__ */ t(
    "div",
    {
      style: {
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        background: n,
        opacity: 0.2,
        animation: "lPR 1.4s ease-out infinite"
      }
    }
  ),
  /* @__PURE__ */ t(
    "div",
    {
      style: {
        position: "absolute",
        inset: "20%",
        borderRadius: "50%",
        background: n,
        animation: "lPC 1.4s ease-in-out infinite"
      }
    }
  )
] }), C = ({ s: e, color: n }) => /* @__PURE__ */ t(
  "div",
  {
    style: {
      width: e,
      height: e,
      borderRadius: "50%",
      border: `${e * 0.08}px solid ${n}22`,
      borderTop: `${e * 0.08}px solid ${n}`,
      animation: "lSpin .75s linear infinite"
    }
  }
), G = ({ s: e, color: n }) => /* @__PURE__ */ t(
  "div",
  {
    style: {
      display: "flex",
      gap: e * 0.1,
      alignItems: "flex-end",
      height: e * 0.7
    },
    children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ t(
      "div",
      {
        style: {
          width: e * 0.15,
          background: n,
          borderRadius: 3,
          animation: `lBar 1s ease-in-out ${i * 0.15}s infinite`
        }
      },
      i
    ))
  }
), B = {
  spinner: Z,
  dots: _,
  pulse: q,
  ring: C,
  bar: G
};
function Q({
  show: e = !0,
  type: n = "spinner",
  size: i = "md",
  variant: o = "dark",
  color: r = "#a78bfa",
  message: S = "Loading...",
  submessage: v = "",
  fullScreen: z = !1,
  zIndex: L = 999,
  opacity: M = 1,
  blur: c = 8,
  showProgress: P = !1,
  progress: R = 0,
  closable: T = !1,
  onClose: u = () => {
  },
  position: I = "center",
  animateIn: A = !0,
  timeout: m = 0,
  children: E = null,
  closeOnOutsideClick: y = !1,
  onOutsideClick: h = () => {
  }
}) {
  const [s, p] = W(e), x = k(null), f = k(u), $ = k(h);
  if (d(() => {
    f.current = u;
  }, [u]), d(() => {
    $.current = h;
  }, [h]), d(() => {
    p(e);
  }, [e]), d(() => {
    if (!s || !y) return;
    const g = (D) => {
      x.current && !x.current.contains(D.target) && ($.current(), p(!1), f.current());
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [s, y]), d(() => {
    if (m > 0 && s) {
      const g = setTimeout(() => {
        p(!1), f.current();
      }, m);
      return () => clearTimeout(g);
    }
  }, [m, s]), !s) return null;
  const b = w[i] || w.md, a = F[o] || F.dark, j = B[n] || B.spinner;
  return /* @__PURE__ */ l(N, { children: [
    /* @__PURE__ */ t("style", { children: V }),
    /* @__PURE__ */ t(
      "div",
      {
        style: {
          position: z ? "fixed" : "absolute",
          inset: 0,
          zIndex: L,
          display: "flex",
          alignItems: { center: "center", top: "flex-start", bottom: "flex-end" }[I] || "center",
          justifyContent: "center",
          padding: I !== "center" ? 40 : 0,
          background: a.bg,
          backdropFilter: c > 0 ? `blur(${c}px)` : "none",
          WebkitBackdropFilter: c > 0 ? `blur(${c}px)` : "none",
          opacity: M,
          animation: A ? "lFI .25s ease" : "none"
        },
        children: /* @__PURE__ */ l(
          "div",
          {
            ref: x,
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: b.g,
              padding: "28px 36px",
              borderRadius: 16,
              position: "relative",
              background: o === "transparent" ? "transparent" : o === "gradient" ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.07)",
              border: o === "transparent" ? "none" : `1px solid ${r}25`,
              boxShadow: o === "transparent" ? "none" : `0 8px 40px ${r}15`
            },
            children: [
              T && /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    p(!1), f.current();
                  },
                  style: {
                    position: "absolute",
                    top: 8,
                    right: 10,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: a.tx,
                    fontSize: 16,
                    opacity: 0.45,
                    padding: "2px 6px",
                    borderRadius: 6
                  },
                  children: "✕"
                }
              ),
              E || /* @__PURE__ */ t(j, { s: b.s, color: r }),
              S && /* @__PURE__ */ t(
                "p",
                {
                  style: {
                    margin: 0,
                    color: a.tx,
                    fontSize: b.f,
                    fontWeight: 600,
                    letterSpacing: ".04em",
                    fontFamily: "system-ui,sans-serif"
                  },
                  children: S
                }
              ),
              v && /* @__PURE__ */ t(
                "p",
                {
                  style: {
                    margin: 0,
                    color: a.tx,
                    fontSize: "11px",
                    opacity: 0.5,
                    fontFamily: "system-ui,sans-serif"
                  },
                  children: v
                }
              ),
              P && /* @__PURE__ */ l("div", { style: { width: 140, marginTop: 2 }, children: [
                /* @__PURE__ */ t(
                  "div",
                  {
                    style: {
                      width: "100%",
                      height: 4,
                      background: `${r}22`,
                      borderRadius: 99,
                      overflow: "hidden"
                    },
                    children: /* @__PURE__ */ t(
                      "div",
                      {
                        style: {
                          height: "100%",
                          width: `${Math.min(100, Math.max(0, R))}%`,
                          background: `linear-gradient(90deg,${r},${r}88,${r})`,
                          backgroundSize: "200% 100%",
                          borderRadius: 99,
                          transition: "width .3s ease",
                          animation: "lShim 1.5s linear infinite"
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ l(
                  "p",
                  {
                    style: {
                      margin: "3px 0 0",
                      textAlign: "right",
                      color: a.tx,
                      opacity: 0.4,
                      fontSize: 10,
                      fontFamily: "monospace"
                    },
                    children: [
                      R,
                      "%"
                    ]
                  }
                )
              ] }),
              y && /* @__PURE__ */ t(
                "p",
                {
                  style: {
                    margin: "2px 0 0",
                    color: a.tx,
                    opacity: 0.3,
                    fontSize: 9,
                    fontFamily: "monospace"
                  },
                  children: "click outside to dismiss"
                }
              )
            ]
          }
        )
      }
    )
  ] });
}
export {
  V as ANIM_CSS,
  G as BarIcon,
  _ as DotsIcon,
  B as ICONS,
  q as PulseIcon,
  C as RingIcon,
  w as SIZES,
  Z as SpinIcon,
  F as VARIANTS,
  Q as default
};
//# sourceMappingURL=loader-overlay.es.js.map
