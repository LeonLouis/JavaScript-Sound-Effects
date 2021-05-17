var colors = ['green', 'yellow', 'red', 'blue'];
var sounds = ['1-up', 'bowserfalls', 'bowserfire', 'breakblock', 'bump', 'coin', 'fireball', 'fireworks', 'flagpole', 'gameover', 'jump-small',
  'jump-super', 'kick', 'mariodie', 'pause', 'pipe', 'powerup_appears', 'powerup', 'stage_clear', 'stomp', 'vine', 'warning', 'world_clear'];
const main = document.querySelector('.main-wrap');

function createKeys(num) {
  let div = document.createElement('div');
  let label = document.createElement('label');
  let span = document.createElement('span');
  div.className = 'key';
  div.setAttribute('onclick', 'playSound(' + (65 + num) + ')');
  div.setAttribute('data-key', 65 + num);
  span.className = 'sound';
  label.textContent = String.fromCharCode(65 + num);
  span.textContent = sounds[num];
  div.append(label, span);
  return div;
};

function createAudio(num) {
  let audio = document.createElement('audio');
  audio.setAttribute('data-key', 65 + num);
  audio.setAttribute('src', './sounds/' + sounds[num] + '.wav');
  return audio;
}

for (var i = 0; i < sounds.length; i++) {
  main.append(createKeys(i), createAudio(i));
}

function removeTransition(key) {
  if (key.propertyName !== 'transform') return;
  key.target.className = 'key';
}

function playSound(sound) {
  var keyCode = sound.keyCode ? sound.keyCode : sound;
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`div[data-key="${keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  var color_num = Math.floor((Math.random() * 4));
  key.classList.add('playing-' + colors[color_num]);
  audio.onended = function () {
    key.className = 'key';
  };
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);