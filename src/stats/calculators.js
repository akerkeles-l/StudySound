// Pure calculator functions for the Calculator Lab. Each returns
// { error } or { main, steps: [..] } so the UI only has to display it.

/** Accepts "0,01" and "0.01". Returns NaN for empty / invalid text. */
export function parseNum(text) {
  const s = String(text).trim().replace(",", ".");
  return s === "" ? NaN : Number(s);
}
const isInt = (x) => Number.isInteger(x);
const fact = (n) => { let r = 1n; for (let i = 2n; i <= BigInt(n); i++) r *= i; return r; };
const big = (b) => (b.toString().length > 24 ? Number(b).toExponential(4) : b.toString());
const r4 = (x) => Number(x.toPrecision(6));

export function combinatorics({ n, k }) {
  if (!isInt(n) || !isInt(k) || n < 0 || k < 0) return { error: "n and k must be non-negative integers." };
  if (k > n) return { error: "k cannot be larger than n." };
  if (n > 150) return { error: "Please use n ≤ 150." };
  const nf = fact(n), kf = fact(k), nkf = fact(n - k);
  const A = nf / nkf, C = nf / (kf * nkf);
  return {
    main: `C(${n},${k}) = ${big(C)}`,
    steps: [
      `Permutations: P${n} = ${n}! = ${big(nf)}`,
      `Arrangements: A(${n},${k}) = ${n}! / ${n - k}! = ${big(A)}`,
      `Combinations: C(${n},${k}) = ${n}! / (${k}! · ${n - k}!) = ${big(C)}`,
    ],
  };
}

export function basicProbability({ fav, total }) {
  if (!isInt(fav) || !isInt(total)) return { error: "Both values must be whole numbers." };
  if (total <= 0) return { error: "Total outcomes must be greater than 0." };
  if (fav < 0 || fav > total) return { error: "Favorable outcomes must be between 0 and total." };
  const p = fav / total;
  return {
    main: `P(A) = ${r4(p)}  (${r4(p * 100)}%)`,
    steps: [`P(A) = ${fav} / ${total} = ${r4(p)}`, `Complement: P(not A) = 1 − ${r4(p)} = ${r4(1 - p)}`],
  };
}

export function bayes({ pA, pBA, pB }) {
  for (const [name, v] of [["P(A)", pA], ["P(B|A)", pBA], ["P(B)", pB]])
    if (!(v >= 0 && v <= 1)) return { error: `${name} must be a number between 0 and 1.` };
  if (pB === 0) return { error: "P(B) must be greater than 0." };
  const res = (pBA * pA) / pB;
  if (res > 1) return { error: `These inputs are inconsistent: the result would be ${r4(res)} (> 1). P(B) must be at least P(B|A)·P(A) = ${r4(pBA * pA)}.` };
  return {
    main: `P(A|B) = ${r4(res)}  (${r4(res * 100)}%)`,
    steps: [`P(A|B) = (${pBA} × ${pA}) / ${pB}`, `= ${r4(pBA * pA)} / ${pB} = ${r4(res)}`],
  };
}

export function poisson({ lambda, k }) {
  if (!(lambda > 0)) return { error: "λ must be greater than 0." };
  if (!isInt(k) || k < 0) return { error: "k must be a non-negative integer." };
  if (k > 170) return { error: "Please use k ≤ 170." };
  const pmf = (i) => {
    let logFact = 0;
    for (let j = 2; j <= i; j++) logFact += Math.log(j);
    return Math.exp(i * Math.log(lambda) - lambda - logFact);
  };
  let cdf = 0;
  for (let i = 0; i <= k; i++) cdf += pmf(i);
  return {
    main: `P(X = ${k}) = ${r4(pmf(k))}`,
    steps: [
      `P(X = ${k}) = (${lambda}^${k} · e^(−${lambda})) / ${k}! = ${r4(pmf(k))}`,
      `Cumulative: P(X ≤ ${k}) = ${r4(Math.min(cdf, 1))}`,
    ],
  };
}

/** Uses the regression fitted on the study data (passed in from the analysis). */
export function predictScore({ hours }, { slope, intercept, minX, maxX }) {
  if (!(hours >= 0) || hours > 24) return { error: "Enter hours per day between 0 and 24." };
  const y = intercept + slope * hours;
  const steps = [
    `Score = ${r4(intercept)} ${slope < 0 ? "−" : "+"} ${r4(Math.abs(slope))} × ${hours} = ${r4(y)}%`,
    "This is the model's fitted value, not a forecast for one student: R² is only about 1.6%.",
  ];
  if (hours < minX || hours > maxX)
    steps.push(`⚠ ${hours} h is outside the observed range (${minX}–${maxX} h): this is extrapolation.`);
  if (y < 0 || y > 100) steps.push("⚠ The line gives a value outside 0–100%, so the linear model does not make sense here.");
  return { main: `Predicted score ≈ ${r4(y)}%`, steps };
}
