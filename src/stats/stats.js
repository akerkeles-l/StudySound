// Basic statistics written from scratch (no stats library), formulas are standard.

export const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;

export function median(a) {
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

export const min = (a) => Math.min(...a);
export const max = (a) => Math.max(...a);

/** Sample standard deviation: sqrt( Σ(x - x̄)² / (n - 1) ) */
export function sampleSd(a) {
  const m = mean(a);
  return Math.sqrt(a.reduce((s, v) => s + (v - m) ** 2, 0) / (a.length - 1));
}

export function describe(a) {
  return {
    n: a.length,
    mean: mean(a),
    median: median(a),
    min: min(a),
    max: max(a),
    sd: sampleSd(a),
  };
}

/** Pearson r = Sxy / sqrt(Sxx · Syy) */
export function pearson(x, y) {
  const mx = mean(x);
  const my = mean(y);
  let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < x.length; i++) {
    sxy += (x[i] - mx) * (y[i] - my);
    sxx += (x[i] - mx) ** 2;
    syy += (y[i] - my) ** 2;
  }
  return sxy / Math.sqrt(sxx * syy);
}

/** Simple linear regression  y = a + b·x  (least squares). */
export function linearRegression(x, y) {
  const mx = mean(x);
  const my = mean(y);
  let sxy = 0, sxx = 0;
  for (let i = 0; i < x.length; i++) {
    sxy += (x[i] - mx) * (y[i] - my);
    sxx += (x[i] - mx) ** 2;
  }
  const slope = sxy / sxx;
  const intercept = my - slope * mx;
  const r = pearson(x, y);
  return { slope, intercept, r2: r * r };
}

// ── p-value for H0: ρ = 0 ───────────────────────────────────
// t = r·sqrt((n-2)/(1-r²)) follows a t-distribution with n-2 degrees
// of freedom when H0 is true. The two-sided p-value is computed with
// the regularised incomplete beta function:
//     p = I_{df/(df+t²)}(df/2, 1/2)

function logGamma(z) {
  // Lanczos approximation
  const c = [
    76.18009172947146, -86.50532032941677, 24.01409824083091,
    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5,
  ];
  let y = z;
  let tmp = z + 5.5;
  tmp -= (z + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (const ci of c) ser += ci / ++y;
  return -tmp + Math.log((2.5066282746310005 * ser) / z);
}

function betaContinuedFraction(a, b, x) {
  const EPS = 3e-16, FPMIN = 1e-300;
  const qab = a + b, qap = a + 1, qam = a - 1;
  let c = 1;
  let d = 1 - (qab * x) / qap;
  if (Math.abs(d) < FPMIN) d = FPMIN;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= 300; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d; h *= d * c;
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < EPS) break;
  }
  return h;
}

function regularizedBeta(x, a, b) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const front = Math.exp(
    logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x)
  );
  return x < (a + 1) / (a + b + 2)
    ? (front * betaContinuedFraction(a, b, x)) / a
    : 1 - (front * betaContinuedFraction(b, a, 1 - x)) / b;
}

/** Two-sided test of H0: ρ = 0. Returns { t, df, p }. */
export function correlationTest(r, n) {
  const df = n - 2;
  const t = r * Math.sqrt(df / (1 - r * r));
  const p = regularizedBeta(df / (df + t * t), df / 2, 0.5);
  return { t, df, p };
}

// ── Histogram helpers ───────────────────────────────────────

/** Counts for each distinct value (used for music hours: 0, 0.5, 1, 1.5, 2). */
export function valueCounts(values) {
  const map = new Map();
  values.forEach((v) => map.set(v, (map.get(v) || 0) + 1));
  return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([value, count]) => ({ value, count }));
}

/** Equal-width bins (default 10 points). The last bin includes the upper edge (100). */
export function binScores(values, width = 10, upper = 100) {
  const bins = [];
  for (let lo = 0; lo < upper; lo += width) {
    const hi = lo + width;
    const last = hi >= upper;
    bins.push({
      label: last ? `${lo}–${upper}` : `${lo}–${hi - 1}`,
      from: lo,
      count: values.filter((v) => v >= lo && (last ? v <= upper : v < hi)).length,
    });
  }
  return bins;
}

/** Verbal label for |r| (common rule of thumb). */
export function describeCorrelation(r) {
  const a = Math.abs(r);
  const strength = a < 0.2 ? "Very weak" : a < 0.4 ? "Weak" : a < 0.6 ? "Moderate" : a < 0.8 ? "Strong" : "Very strong";
  const direction = r < 0 ? "negative" : "positive";
  return { strength, direction, label: `${strength} ${direction} correlation` };
}
