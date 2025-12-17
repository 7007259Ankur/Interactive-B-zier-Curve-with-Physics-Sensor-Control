const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/* 1. Setup & Resize Handling */
// Define variables for points and velocities
let p0, p3; // Static Anchor Points (Ends of the rope)
let p1, p2; // Dynamic Control Points (The "handles" moving with physics)
let v1 = vec(0, 0); // Velocity for P1
let v2 = vec(0, 0); // Velocity for P2

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Reset Anchors to the sides of the screen
  p0 = vec(100, canvas.height / 2);
  p3 = vec(canvas.width - 100, canvas.height / 2);

  // Initialize P1 and P2 only if they don't exist yet (prevents resetting physics on resize)
  if (!p1) p1 = vec(canvas.width / 3, canvas.height / 2);
  if (!p2) p2 = vec((2 * canvas.width) / 3, canvas.height / 2);
}

// Initial setup
resize();
window.addEventListener("resize", resize);
initInput(canvas); // Initialize mouse tracking from input.js

/* FPS Counter Variable */
let lastTime = 0;

/* 2. Animation Loop */
function animate(currentTime) {
  // --- FPS CALCULATION START ---
  if (!lastTime) lastTime = currentTime;
  const deltaTime = currentTime - lastTime;
  
  // Calculate FPS (prevent division by zero)
  const fps = deltaTime > 0 ? Math.round(1000 / deltaTime) : 60;
  
  lastTime = currentTime;
  // --- FPS CALCULATION END ---

  // Clear the screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // --- LOGIC: Mouse Follow (Hover Mode) ---
  // The target points surround the mouse cursor. 
  
  // Target 1: 100px to the left of the mouse
  const target1 = vec(mouse.x - 100, mouse.y);
  
  // Target 2: 100px to the right of the mouse
  const target2 = vec(mouse.x + 100, mouse.y);

  // --- PHYSICS: Update Control Points ---
  // Use the spring logic from physics.js
  updateSpring(p1, v1, target1);
  updateSpring(p2, v2, target2);

  // --- RENDER: Draw the Scene ---
  
  // 1. Draw the dashed gray lines connecting control points
  drawControlLines(ctx, p0, p1, p2, p3);

  // 2. Draw the Red Tangent Vectors (Direction lines)
  drawTangents(ctx, p0, p1, p2, p3);

  // 3. Draw the actual Green Rope (The Bézier Curve)
  drawBezier(ctx, p0, p1, p2, p3);

  // 4. Draw the dots
  drawPoint(ctx, p0, "#ffffff"); // Anchor (White)
  drawPoint(ctx, p3, "#ffffff"); // Anchor (White)
  drawPoint(ctx, p1, "#3399ff"); // Physics Point (Blue)
  drawPoint(ctx, p2, "#3399ff"); // Physics Point (Blue)

  // 5. Draw FPS Counter (Top Left)
  ctx.font = "16px Arial";
  ctx.fillStyle = "#00ff00"; // Green text
  ctx.fillText("FPS: " + fps, 20, 30);

  // Loop
  requestAnimationFrame(animate);
}

// Start the animation
requestAnimationFrame(animate);