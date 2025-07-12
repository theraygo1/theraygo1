
function startShuffle() {
  const input = document.getElementById('nameInput').value;
  const names = input.split('\n').map(n => n.trim()).filter(n => n);
  if (names.length === 0) {
    alert("Please enter at least one name.");
    return;
  }

  const dice = document.getElementById('diceAnimation');
  const result = document.getElementById('result');
  const sound = document.getElementById('rollSound');

  result.textContent = '';
  dice.style.animation = 'roll 1s ease-in-out';

  // Play sound
  sound.currentTime = 0;
  sound.play().catch(e => console.log('Audio play prevented', e));

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * names.length);
    result.textContent = `🎉 ${names[randomIndex]} 🎉`;
    dice.style.animation = 'none';
  }, 1000);
}
