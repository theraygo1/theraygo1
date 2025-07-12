
let names = [];
let angles = [];
let isSpinning = false;
let currentAngle = 0;
let canvas, ctx;

window.onload = () => {
  canvas = document.getElementById('wheelCanvas');
  ctx = canvas.getContext('2d');
};

function generateWheel() {
  const input = document.getElementById('nameInput').value;
  names = input.split('\n').map(n => n.trim()).filter(n => n);
  if (names.length < 2) {
    alert("Please enter at least two names.");
    return;
  }
  angles = Array.from({ length: names.length }, (_, i) => (2 * Math.PI * i / names.length));
  drawWheel();
}

function drawWheel() {
  const total = names.length;
  const radius = canvas.width / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < total; i++) {
    const startAngle = angles[i];
    const endAngle = angles[(i + 1) % total];
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, startAngle, endAngle);
    ctx.fillStyle = `hsl(${(360 / total) * i}, 70%, 60%)`;
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate((startAngle + endAngle) / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "14px sans-serif";
    ctx.fillText(names[i], radius - 10, 5);
    ctx.restore();
  }
}

function spinWheel() {
  if (isSpinning || names.length < 2) return;

  isSpinning = true;
  const sound = document.getElementById('spinSound');
  sound.currentTime = 0;
  sound.play();

  const total = names.length;
  const spins = 5 + Math.floor(Math.random() * 3); // 5–7 full rotations
  const finalIndex = Math.floor(Math.random() * total);
  const finalAngle = 2 * Math.PI * finalIndex / total + Math.PI / total;
  const targetAngle = 2 * Math.PI * spins + finalAngle;

  const duration = 4000;
  const start = performance.now();

  function animate(time) {
    const progress = Math.min((time - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    currentAngle = targetAngle * ease;
    drawRotatedWheel(currentAngle);
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;
      const index = Math.floor(((2 * Math.PI - (currentAngle % (2 * Math.PI))) / (2 * Math.PI)) * total) % total;
      document.getElementById('result').textContent = `🎉 ${names[index]} 🎉`;
    }
  }

  requestAnimationFrame(animate);
}

function drawRotatedWheel(angle) {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angle);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);
  drawWheel();
  ctx.restore();
}
