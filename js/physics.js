// Tuned for better "springiness"
const SPRING_K = 0.05;  // Higher = snaps back faster
const DAMPING = 0.90;   // Higher = wobbles longer (0.0 - 1.0)

function updateSpring(position, velocity, target) {
  // Hooke's Law: F = -k * x
  const force = sub(target, position);

  // Apply acceleration to velocity
  velocity.x += force.x * SPRING_K;
  velocity.y += force.y * SPRING_K;

  // Apply damping (friction)
  velocity.x *= DAMPING;
  velocity.y *= DAMPING;

  // Update position
  position.x += velocity.x;
  position.y += velocity.y;
}