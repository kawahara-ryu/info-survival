// DOM Elements
const screens = {
  title: document.getElementById('title-screen'),
  game: document.getElementById('game-screen'),
  clear: document.getElementById('clear-screen')
};

const UI = {
  speakerName: document.getElementById('speaker-name'),
  scenarioText: document.getElementById('scenario-text'),
  imageContainer: document.getElementById('image-container'),
  sceneImage: document.getElementById('scene-image'),
  choicesArea: document.getElementById('choices-area'),
  gameScreen: document.getElementById('game-screen'),
  trustBar: document.getElementById('trust-bar'),
  typingIndicator: document.getElementById('typing-indicator'),
  textBubble: document.getElementById('text-bubble'),
  timerContainer: document.getElementById('timer-container'),
  timerBar: document.getElementById('timer-bar'),
  choicesList: document.getElementById('choices-list')
};

// State
let currentSceneId = 'start';
let trustLevel = 100;
let sceneTimer = null;
let currentTimerValue = 0;

// Event Listeners
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('home-btn').addEventListener('click', resetGame);
document.getElementById('header-back').addEventListener('click', resetGame);

function switchScreen(screenName) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[screenName].classList.add('active');
}

function startGame() {
  currentSceneId = 'start';
  trustLevel = 100;
  updateTrustUI();
  UI.gameScreen.classList.remove('bad-end-glitch');
  loadScene(currentSceneId);
  switchScreen('game');
}

function resetGame() {
  clearTimeout(sceneTimer);
  clearInterval(sceneTimer);
  switchScreen('title');
}

function updateTrustUI() {
  trustLevel = Math.max(0, Math.min(100, trustLevel));
  UI.trustBar.style.width = `${trustLevel}%`;
  
  if (trustLevel > 60) {
    UI.trustBar.style.backgroundColor = '#42b72a'; // Green
  } else if (trustLevel > 30) {
    UI.trustBar.style.backgroundColor = '#ffb86c'; // Orange
  } else {
    UI.trustBar.style.backgroundColor = '#ff003c'; // Red
  }

  if (trustLevel <= 0 && !currentSceneId.startsWith('bad')) {
    loadScene('bad_trust_zero');
  }
}

function loadScene(sceneId) {
  // Clear any existing timers
  clearTimeout(sceneTimer);
  clearInterval(sceneTimer);
  UI.timerContainer.classList.add('hidden');

  // Hardcode a bad end for zero trust
  if (sceneId === 'bad_trust_zero') {
    scenarios['bad_trust_zero'] = {
      text: "【BAD END: 大炎上】\\n日々のグレーな行動が積み重なり、あなたの社会的信用は地に落ちた...。フォロワーはゼロになり、ネット上で大炎上してしまいました。",
      image: null,
      speaker: "システム",
      trustChange: 0,
      choices: [{ text: "最初からやり直す", nextId: "start" }]
    };
  }

  currentSceneId = sceneId;
  const scene = scenarios[sceneId];

  // Update Trust
  if (scene.trustChange) {
    trustLevel += scene.trustChange;
    updateTrustUI();
  }

  // Check for CLEAR
  if (sceneId === 'clear') {
    switchScreen('clear');
    return;
  }

  // Check for BAD END glitch
  if (sceneId.startsWith('bad')) {
    UI.gameScreen.classList.add('bad-end-glitch');
  } else {
    UI.gameScreen.classList.remove('bad-end-glitch');
  }

  // Hide UI before typing
  UI.textBubble.classList.add('hidden');
  UI.choicesArea.classList.add('hidden');
  UI.imageContainer.classList.add('hidden');
  
  UI.speakerName.textContent = scene.speaker;

  // Typing Animation (if it's not system/browser and not a bad end)
  if (scene.speaker !== "システム" && scene.speaker !== "ブラウザ" && !sceneId.startsWith('bad')) {
    UI.typingIndicator.classList.remove('hidden');
    
    // Wait 1.5 seconds for typing
    sceneTimer = setTimeout(() => {
      UI.typingIndicator.classList.add('hidden');
      renderSceneContent(scene);
    }, 1500);
  } else {
    UI.typingIndicator.classList.add('hidden');
    renderSceneContent(scene);
  }
}

function renderSceneContent(scene) {
  // Handle text with line breaks
  UI.scenarioText.innerHTML = scene.text.replace(/\\n/g, '<br><br>');
  UI.textBubble.classList.remove('hidden');

  // Handle Image
  if (scene.image) {
    UI.sceneImage.src = scene.image;
    UI.imageContainer.classList.remove('hidden');
  }

  // Handle Choices
  UI.choicesList.innerHTML = '';
  scene.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice.text;
    btn.style.animationDelay = `${index * 0.1}s`;
    btn.onclick = () => loadScene(choice.nextId);
    UI.choicesList.appendChild(btn);
  });
  
  UI.choicesArea.classList.remove('hidden');

  // Handle Time Pressure
  if (scene.timeLimit) {
    startTimer(scene.timeLimit, scene.timeoutNextId);
  }
}

function startTimer(seconds, timeoutNextId) {
  UI.timerContainer.classList.remove('hidden');
  UI.timerBar.style.width = '100%';
  
  const totalMs = seconds * 1000;
  let remainingMs = totalMs;
  const intervalMs = 50; // update every 50ms for smooth bar

  sceneTimer = setInterval(() => {
    remainingMs -= intervalMs;
    const percentage = (remainingMs / totalMs) * 100;
    UI.timerBar.style.width = `${Math.max(0, percentage)}%`;

    if (remainingMs <= 0) {
      clearInterval(sceneTimer);
      // Disable choices
      const buttons = UI.choicesList.querySelectorAll('.choice-btn');
      buttons.forEach(btn => btn.disabled = true);
      
      // Auto transition to timeout node
      setTimeout(() => loadScene(timeoutNextId), 500);
    }
  }, intervalMs);
}
