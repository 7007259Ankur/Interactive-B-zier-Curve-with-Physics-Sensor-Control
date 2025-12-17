// Initialize mouse at center screen so rope doesn't snap to (0,0) on load
let mouse = vec(window.innerWidth / 2, window.innerHeight / 2);
let isDragging = false;

function initInput(canvas) {
  canvas.addEventListener("mousedown", () => {
    isDragging = true;
  });

  // Handle mouse up on window in case they drag off canvas
  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  canvas.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  // Touch support for mobile/tablets (bonus)
  canvas.addEventListener("touchstart", (e) => {
      isDragging = true;
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
  });
  canvas.addEventListener("touchend", () => {
      isDragging = false;
  });
  canvas.addEventListener("touchmove", (e) => {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      e.preventDefault(); // Stop scrolling
  });
}