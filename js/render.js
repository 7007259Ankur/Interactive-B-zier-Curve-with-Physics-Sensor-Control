function drawBezier(ctx, p0, p1, p2, p3) {
  ctx.beginPath();
  // Resolution 0.01 for smooth curve
  for (let t = 0; t <= 1; t += 0.01) {
    const p = bezierPoint(t, p0, p1, p2, p3);
    if (t === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.strokeStyle = "#00ffcc";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.stroke();
}

function drawTangents(ctx, p0, p1, p2, p3) {
  // Draw fewer tangents (step 0.1) to keep it clean
  for (let t = 0; t <= 1; t += 0.1) {
    const p = bezierPoint(t, p0, p1, p2, p3);
    const tan = normalize(bezierTangent(t, p0, p1, p2, p3));

    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    
    // CHANGED: Increased length from 25 to 60
    // CHANGED: Added circle at the end to make direction clear
    const lineLength = 60; 
    
    ctx.lineTo(p.x + tan.x * lineLength, p.y + tan.y * lineLength);
    ctx.strokeStyle = "#ff3333"; // Brighter red
    ctx.lineWidth = 3;            // Thicker line
    ctx.stroke();
    
    // Optional: Draw a dot at the end of the tangent to see the tip
    ctx.beginPath();
    ctx.arc(p.x + tan.x * lineLength, p.y + tan.y * lineLength, 3, 0, Math.PI*2);
    ctx.fillStyle = "#ff3333";
    ctx.fill();
  }
}

function drawPoint(ctx, p, color) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawControlLines(ctx, p0, p1, p2, p3) {
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  ctx.lineTo(p1.x, p1.y);
  // Break in middle
  ctx.moveTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  
  ctx.strokeStyle = "#444";
  ctx.setLineDash([5, 5]);
  ctx.stroke();
  ctx.setLineDash([]); // Reset dash
}