function vec(x, y) {
  return { x, y };
}

function add(a, b) {
  return vec(a.x + b.x, a.y + b.y);
}

function sub(a, b) {
  return vec(a.x - b.x, a.y - b.y);
}

function mul(v, s) {
  return vec(v.x * s, v.y * s);
}

function length(v) {
  return Math.hypot(v.x, v.y);
}

function normalize(v) {
  const len = length(v);
  return len === 0 ? vec(0, 0) : mul(v, 1 / len);
}

/* Cubic Bézier Point: B(t) */
function bezierPoint(t, p0, p1, p2, p3) {
  const u = 1 - t;
  // B(t) = (1-t)³P0 + 3(1-t)²tP1 + 3(1-t)t²P2 + t³P3
  return add(
    add(
      mul(p0, u * u * u),
      mul(p1, 3 * u * u * t)
    ),
    add(
      mul(p2, 3 * u * t * t),
      mul(p3, t * t * t)
    )
  );
}

/* Cubic Bézier Derivative (Tangent) */
function bezierTangent(t, p0, p1, p2, p3) {
  const u = 1 - t;
  // B'(t) calculation
  return add(
    add(
      mul(sub(p1, p0), 3 * u * u),
      mul(sub(p2, p1), 6 * u * t)
    ),
    mul(sub(p3, p2), 3 * t * t)
  );
}