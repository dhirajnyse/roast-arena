const app = document.querySelector("#app");

const prompts = [
  "Pitch the worst startup idea that somehow gets VC funding.",
  "Defend your browser history in court.",
  "Write a breakup text from a gym membership.",
  "Invent a luxury product nobody asked for.",
  "Explain why this group chat deserves government supervision.",
  "Write a slogan for a restaurant with terrible service.",
  "Give a TED Talk title for your worst life decision.",
  "Write a customer review for a haunted toaster."
];

const judges = [
  {
    id: "hr",
    name: "HR Department",
    heat: 46,
    intro: "Please keep all emotional damage workplace appropriate.",
    flavor: "Corporate, nervous, passive-aggressive.",
    reaction: "Policy violation detected. Comedy value rising.",
    verdicts: [
      "After careful review, this answer is disruptive, emotionally accurate, and unfortunately hilarious.",
      "The committee has concerns, but the laugh metrics are undeniable.",
      "This submission violates three policies and one friendship. Approved."
    ]
  },
  {
    id: "ceo",
    name: "Brutal CEO",
    heat: 78,
    intro: "The joke has no moat, but the disrespect scales beautifully.",
    flavor: "Cold, fast, investor-brained.",
    reaction: "Investor confidence in this insult is irrationally high.",
    verdicts: [
      "This answer has product-market fit in the humiliation economy.",
      "No revenue model, but impressive emotional margins.",
      "The burn rate is high. The burn quality is higher."
    ]
  },
  {
    id: "auntie",
    name: "Disappointed Auntie",
    heat: 62,
    intro: "Beta, I am smiling because crying would ruin my eyeliner.",
    flavor: "Loving, devastating, oddly proud.",
    reaction: "Affection remains. Respect is under review.",
    verdicts: [
      "I expected better, but unfortunately this made me laugh.",
      "So much shame, delivered with excellent timing.",
      "This answer needs discipline, but it has talent."
    ]
  },
  {
    id: "king",
    name: "Medieval King",
    heat: 69,
    intro: "The court shall laugh or someone shall explain why.",
    flavor: "Royal, loud, nonsense-powered.",
    reaction: "The crowd is rowdy and the crown is entertained.",
    verdicts: [
      "The court has laughed, and this answer receives three imaginary provinces.",
      "Summon the scoreboard. A champion has insulted with honor.",
      "This jest has rattled the goblet and pleased the crown."
    ]
  }
];

const botAnswers = [
  "Uber, but for borrowing confidence from strangers.",
  "My browser history is just market research with emotional side quests.",
  "We regret to inform you your cardio has been seeing other people.",
  "A gold-plated subscription box for unused planners.",
  "This group chat has caused more chaos than an unpaid intern with admin access.",
  "Where the waiter judges you before the food does.",
  "How I Turned Minor Inconvenience Into A Full Personality.",
  "Five stars. Screamed at me in Latin, toasted evenly."
];

const state = {
  screen: "home",
  playerName: "You",
  roomCode: "R0AST",
  mode: "classic",
  selectedJudgeId: "hr",
  round: 1,
  maxRounds: 3,
  promptIndex: 0,
  timeLeft: 45,
  submissions: [],
  winner: null,
  verdict: "",
  history: [],
  players: [
    { id: "you", name: "You", score: 0, bot: false },
    { id: "maya", name: "Maya", score: 0, bot: true },
    { id: "zed", name: "Zed", score: 0, bot: true },
    { id: "nora", name: "Nora", score: 0, bot: true }
  ]
};

let timerId = null;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function currentJudge() {
  return judges.find((judge) => judge.id === state.selectedJudgeId) || judges[0];
}

function activePrompt() {
  return prompts[state.promptIndex % prompts.length];
}

function initials(name) {
  return name.trim().slice(0, 1).toUpperCase() || "?";
}

function randomFrom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function setScreen(screen) {
  stopTimer();
  state.screen = screen;
  render();
}

function resetGame() {
  stopTimer();
  state.round = 1;
  state.promptIndex = 0;
  state.submissions = [];
  state.winner = null;
  state.verdict = "";
  state.history = [];
  state.players = state.players.map((player) => ({ ...player, score: 0 }));
}

function stopTimer() {
  if (!timerId) return;
  clearInterval(timerId);
  timerId = null;
}

function startRoundTimer() {
  stopTimer();
  timerId = setInterval(() => {
    if (state.screen !== "submit") {
      stopTimer();
      return;
    }
    state.timeLeft = Math.max(0, state.timeLeft - 1);
    const timer = document.querySelector("#roundTimer");
    const fill = document.querySelector("#timerFill");
    if (timer) timer.textContent = state.timeLeft;
    if (fill) fill.style.width = `${Math.max(0, (state.timeLeft / 45) * 100)}%`;
    if (state.timeLeft === 0) submitAnswer(true);
  }, 1000);
}

function headerMarkup() {
  const judge = currentJudge();
  return `
    <header class="topbar">
      <img class="brand-mark" src="assets/logo.svg" alt="Roast Arena">
      <div class="brand-lockup">
        <p class="kicker">Party Room MVP</p>
        <h1>Roast Arena</h1>
      </div>
      <div class="room-code" aria-label="Room code">
        <span>ROOM</span>
        <strong>${escapeHtml(state.roomCode)}</strong>
      </div>
    </header>
    <nav class="steps" aria-label="Game flow">
      ${["home", "lobby", "submit", "vote", "verdict", "scoreboard"].map((step) => `
        <span class="step ${state.screen === step ? "active" : ""}">${step}</span>
      `).join("")}
    </nav>
    ${state.screen !== "home" ? `
      <section class="judge-card">
        <div class="judge-row">
          <div>
            <span class="judge-badge">Judge</span>
            <h2>${escapeHtml(judge.name)}</h2>
            <p>${escapeHtml(judge.intro)}</p>
          </div>
          <div class="judge-meter" aria-label="Judge heat level">
            <span class="meter-label">Heat</span>
            <span class="meter-track"><span class="meter-fill" style="width: ${judge.heat}%"></span></span>
          </div>
        </div>
      </section>
    ` : ""}
  `;
}

function scoreboardMarkup() {
  const sorted = [...state.players].sort((a, b) => b.score - a.score);
  return `
    <ol class="scoreboard">
      ${sorted.map((player, index) => `
        <li class="score-row ${index === 0 && player.score > 0 ? "leader" : ""}">
          <span class="player-meta">
            <span class="avatar">${escapeHtml(initials(player.name))}</span>
            <span>${escapeHtml(player.name)}</span>
          </span>
          <strong>${player.score}</strong>
        </li>
      `).join("")}
    </ol>
  `;
}

function historyMarkup() {
  if (!state.history.length) {
    return `<p class="empty-history">No rounds claimed yet.</p>`;
  }
  return `
    <div class="history-list">
      ${state.history.slice(-3).map((item) => `
        <div class="history-item">
          <span>R${item.round}</span>
          <strong>${escapeHtml(item.playerName)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function shellMarkup(content) {
  return `
    <section class="game-panel" aria-label="Roast Arena game">
      ${headerMarkup()}
      ${content}
    </section>
  `;
}

function renderHome() {
  const judge = currentJudge();
  return shellMarkup(`
    <section class="home-layout">
      <div>
        <img class="hero-logo" src="assets/logo.svg" alt="Roast Arena logo">
        <p class="kicker">Enter funny. Leave famous.</p>
        <h2 class="hero-title">Battle your friends with punchlines.</h2>
        <p class="hero-copy">Create a party room, pick a dramatic judge, answer absurd prompts, vote anonymously, and let the scoreboard expose who has dangerous comedy timing.</p>
        <div class="stats-grid">
          <div class="stat"><strong>3</strong><span>Round Sprint</span></div>
          <div class="stat"><strong>4</strong><span>Starter Judges</span></div>
          <div class="stat"><strong>0</strong><span>Install Needed</span></div>
        </div>
      </div>

      <form class="setup-card" id="setupForm">
        <div class="field">
          <label for="playerName">Player name</label>
          <input id="playerName" maxlength="18" value="${escapeHtml(state.playerName)}">
        </div>
        <div class="field">
          <label for="roomCode">Room code</label>
          <input id="roomCode" maxlength="8" value="${escapeHtml(state.roomCode)}">
        </div>
        <div class="field">
          <label>Mode</label>
          <div class="mode-grid">
            ${[
              ["classic", "Classic", "Same prompt"],
              ["duel", "Duel", "Face-off"],
              ["court", "Court", "Verdict drama"]
            ].map(([id, label, helper]) => `
              <button class="choice ${state.mode === id ? "active" : ""}" type="button" data-mode="${id}">
                <strong>${label}</strong>
                <span>${helper}</span>
              </button>
            `).join("")}
          </div>
        </div>
        <div class="field">
          <label>Judge</label>
          <div class="judge-grid">
            ${judges.map((item) => `
              <button class="choice ${judge.id === item.id ? "active" : ""}" type="button" data-judge="${item.id}">
                <strong>${escapeHtml(item.name)}</strong>
                <span>${escapeHtml(item.flavor)}</span>
              </button>
            `).join("")}
          </div>
        </div>
        <button class="button hot full" type="submit">Create Party Room</button>
      </form>
    </section>
  `);
}

function renderLobby() {
  return shellMarkup(`
    <section class="arena-grid">
      <aside class="sidebar" aria-label="Players">
        <div class="sidebar-header">
          <h2>Players</h2>
          <span>${state.players.length}/8</span>
        </div>
        ${scoreboardMarkup()}
      </aside>
      <section class="stage">
        <div class="phase-panel">
          <p class="kicker">Lobby</p>
          <h2>Share the room code</h2>
          <p class="hero-copy">This is the party-room prototype: bots stand in for friends so the full loop can be tested instantly.</p>
          <div class="lobby-code">${escapeHtml(state.roomCode)}</div>
          <div class="stats-grid">
            <div class="stat"><strong>${state.maxRounds}</strong><span>Rounds</span></div>
            <div class="stat"><strong>${state.players.length}</strong><span>Players</span></div>
            <div class="stat"><strong>45</strong><span>Seconds</span></div>
          </div>
          <div class="controls">
            <button class="button hot" id="startGame">Start Game</button>
            <button class="button secondary" id="addBot">Add Bot</button>
            <button class="button ghost" id="backHome">Edit Setup</button>
          </div>
        </div>
      </section>
    </section>
  `);
}

function renderSubmit() {
  const judge = currentJudge();
  return shellMarkup(`
    <section class="arena-grid">
      <aside class="sidebar" aria-label="Scoreboard">
        <div class="sidebar-header">
          <h2>Scoreboard</h2>
          <span>Round ${state.round}</span>
        </div>
        ${scoreboardMarkup()}
      </aside>
      <section class="stage">
        <article class="prompt-card">
          <p class="kicker">Prompt</p>
          <h2>${escapeHtml(activePrompt())}</h2>
        </article>
        <div class="phase-panel round-shell">
          <div class="timer-row">
            <div>
              <p class="kicker">Your Turn</p>
              <h2>Drop your roast</h2>
              <p class="judge-reaction">${escapeHtml(judge.reaction)}</p>
            </div>
            <div class="timer" id="roundTimer">${state.timeLeft}</div>
          </div>
          <div class="progress-track"><span class="progress-fill" id="timerFill"></span></div>
          <textarea id="answerInput" class="answer-input" maxlength="160" placeholder="Make it funny, not felony."></textarea>
          <div class="input-meta">
            <span id="charCount">0/160</span>
            <span>Anonymous until verdict</span>
          </div>
          <div class="controls">
            <button class="button hot" id="submitAnswer">Submit Roast</button>
            <button class="button secondary" id="chaosAnswer">Use Chaos Answer</button>
            <button class="button ghost" id="skipToVote">Simulate Everyone</button>
          </div>
        </div>
      </section>
    </section>
  `);
}

function renderVote() {
  return shellMarkup(`
    <section class="arena-grid">
      <aside class="sidebar" aria-label="Scoreboard">
        <div class="sidebar-header">
          <h2>Scoreboard</h2>
          <span>Vote</span>
        </div>
        ${scoreboardMarkup()}
        <div class="mini-panel history-panel">
          <h3>Round History</h3>
          ${historyMarkup()}
        </div>
      </aside>
      <section class="stage">
        <article class="prompt-card">
          <p class="kicker">Anonymous Reveal</p>
          <h2>${escapeHtml(activePrompt())}</h2>
        </article>
        <div class="phase-panel">
          <p class="kicker">Pick the winner</p>
          <h2>Which answer owns the room?</h2>
          <div class="submissions">
            ${state.submissions.map((entry, index) => `
              <button class="submission" data-vote="${index}">
                <strong>Answer ${index + 1}</strong><br>
                ${escapeHtml(entry.text)}
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    </section>
  `);
}

function renderVerdict() {
  const winner = state.winner;
  return shellMarkup(`
    <section class="arena-grid">
      <aside class="sidebar" aria-label="Scoreboard">
        <div class="sidebar-header">
          <h2>Scoreboard</h2>
          <span>Verdict</span>
        </div>
        ${scoreboardMarkup()}
        <div class="mini-panel history-panel">
          <h3>Round History</h3>
          ${historyMarkup()}
        </div>
      </aside>
      <section class="stage">
        <div class="phase-panel verdict-panel">
          <div class="burst" aria-hidden="true"></div>
          <p class="kicker">Judge Verdict</p>
          <h2 class="winner-line">${escapeHtml(winner.playerName)} takes the round</h2>
          <div class="verdict">
            <p>${escapeHtml(state.verdict)}</p>
          </div>
          <div class="answer-card">
            <span>Winning answer</span>
            <p>${escapeHtml(winner.text)}</p>
          </div>
          <div class="controls">
            <button class="button hot" id="continueGame">${state.round >= state.maxRounds ? "Final Scoreboard" : "Next Round"}</button>
            <button class="button ghost" id="playAgain">Restart</button>
          </div>
        </div>
      </section>
    </section>
  `);
}

function renderScoreboardScreen() {
  const leader = [...state.players].sort((a, b) => b.score - a.score)[0];
  return shellMarkup(`
    <section class="arena-grid">
      <aside class="sidebar" aria-label="Final scoreboard">
        <div class="sidebar-header">
          <h2>Final Scores</h2>
          <span>Done</span>
        </div>
        ${scoreboardMarkup()}
        <div class="mini-panel history-panel">
          <h3>Round History</h3>
          ${historyMarkup()}
        </div>
      </aside>
      <section class="stage">
        <div class="phase-panel champion-panel">
          <div class="confetti" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
          <p class="kicker">Champion</p>
          <h2 class="winner-line">${escapeHtml(leader.name)} wins Roast Arena</h2>
          <p class="hero-copy">The arena has spoken. The jokes were questionable. The scoreboard was legally binding.</p>
          <div class="champion-card">
            <span class="avatar champion-avatar">${escapeHtml(initials(leader.name))}</span>
            <div>
              <span class="meter-label">Champion Score</span>
              <strong>${leader.score} points</strong>
            </div>
          </div>
          <div class="controls">
            <button class="button hot" id="newGame">Run It Back</button>
            <button class="button secondary" id="newRoom">New Room Setup</button>
          </div>
        </div>
      </section>
    </section>
  `);
}

function render() {
  const screens = {
    home: renderHome,
    lobby: renderLobby,
    submit: renderSubmit,
    vote: renderVote,
    verdict: renderVerdict,
    scoreboard: renderScoreboardScreen
  };
  app.innerHTML = screens[state.screen]();
  bindEvents();
  if (state.screen === "submit") startRoundTimer();
}

function bindEvents() {
  document.querySelector("#setupForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const playerName = document.querySelector("#playerName").value.trim() || "You";
    const roomCode = document.querySelector("#roomCode").value.trim().toUpperCase() || "R0AST";
    state.playerName = playerName;
    state.roomCode = roomCode;
    state.players = state.players.map((player) => (
      player.id === "you" ? { ...player, name: playerName } : player
    ));
    resetGame();
    setScreen("lobby");
  });

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.mode;
      render();
    });
  });

  document.querySelectorAll("[data-judge]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedJudgeId = button.dataset.judge;
      render();
    });
  });

  document.querySelector("#backHome")?.addEventListener("click", () => setScreen("home"));
  document.querySelector("#startGame")?.addEventListener("click", () => {
    state.timeLeft = 45;
    setScreen("submit");
  });
  document.querySelector("#addBot")?.addEventListener("click", addBot);
  document.querySelector("#submitAnswer")?.addEventListener("click", submitAnswer);
  document.querySelector("#chaosAnswer")?.addEventListener("click", useChaosAnswer);
  document.querySelector("#skipToVote")?.addEventListener("click", () => submitAnswer(true));
  document.querySelector("#continueGame")?.addEventListener("click", continueGame);
  document.querySelector("#playAgain")?.addEventListener("click", () => {
    resetGame();
    setScreen("lobby");
  });
  document.querySelector("#newGame")?.addEventListener("click", () => {
    resetGame();
    setScreen("lobby");
  });
  document.querySelector("#newRoom")?.addEventListener("click", () => {
    resetGame();
    setScreen("home");
  });

  const answerInput = document.querySelector("#answerInput");
  const charCount = document.querySelector("#charCount");
  if (answerInput && charCount) {
    answerInput.addEventListener("input", () => {
      charCount.textContent = `${answerInput.value.length}/160`;
    });
  }

  document.querySelectorAll("[data-vote]").forEach((button) => {
    button.addEventListener("click", () => chooseWinner(Number(button.dataset.vote)));
  });
}

function addBot() {
  const names = ["Rafi", "Lina", "Omar", "Pixel", "Tara", "Jay"];
  const used = new Set(state.players.map((player) => player.name));
  const name = names.find((candidate) => !used.has(candidate));
  if (!name || state.players.length >= 8) return;
  state.players.push({ id: name.toLowerCase(), name, score: 0, bot: true });
  render();
}

function useChaosAnswer() {
  const input = document.querySelector("#answerInput");
  input.value = botAnswers[state.promptIndex % botAnswers.length];
  document.querySelector("#charCount").textContent = `${input.value.length}/160`;
  input.focus();
}

function buildSubmissions(answer) {
  const userAnswer = answer || botAnswers[state.promptIndex % botAnswers.length];
  return state.players.map((player, index) => ({
    playerId: player.id,
    playerName: player.name,
    text: player.bot ? botAnswers[(state.promptIndex + index) % botAnswers.length] : userAnswer
  })).sort(() => Math.random() - 0.5);
}

function submitAnswer(forceBotAnswer = false) {
  stopTimer();
  const input = document.querySelector("#answerInput");
  const answer = forceBotAnswer ? "" : input.value.trim();
  state.submissions = buildSubmissions(answer);
  setScreen("vote");
}

function chooseWinner(index) {
  const winner = state.submissions[index];
  const player = state.players.find((item) => item.id === winner.playerId);
  if (player) player.score += 3;
  state.winner = winner;
  state.verdict = randomFrom(currentJudge().verdicts);
  state.history.push({
    round: state.round,
    playerName: winner.playerName,
    prompt: activePrompt()
  });
  setScreen("verdict");
}

function continueGame() {
  if (state.round >= state.maxRounds) {
    setScreen("scoreboard");
    return;
  }
  state.round += 1;
  state.promptIndex += 1;
  state.timeLeft = 45;
  state.submissions = [];
  state.winner = null;
  state.verdict = "";
  setScreen("submit");
}

render();
