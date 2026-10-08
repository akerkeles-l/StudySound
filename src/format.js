// Small formatting helpers. Real minus sign (−) looks better than a hyphen.
export const fmt = (n, d = 2) => n.toFixed(d).replace("-", "−");
export const fmtSigned = (n, d = 2) => (n < 0 ? "−" : "+") + Math.abs(n).toFixed(d);
