const app = document.querySelector("#app");

const gameModes = {
  classic: {
    label: "Classic",
    helper: "Same prompt",
    rounds: 3,
    timeLimit: 45,
    points: 3,
    tone: "Fast party-room prompts for everyone."
  },
  duel: {
    label: "Duel",
    helper: "Face-off",
    rounds: 5,
    timeLimit: 35,
    points: 4,
    tone: "Sharper one-on-one callouts with a quicker clock."
  },
  court: {
    label: "Court",
    helper: "Verdict drama",
    rounds: 3,
    timeLimit: 60,
    points: 5,
    tone: "Bigger setups, louder judge rulings, more points."
  }
};

const promptPacks = {
  classic: [
    "Pitch the worst startup idea that somehow gets VC funding.",
    "Defend your browser history in court.",
    "Write a breakup text from a gym membership.",
    "Invent a luxury product nobody asked for.",
    "Explain why this group chat deserves government supervision.",
    "Write a slogan for a restaurant with terrible service.",
    "Give a TED Talk title for your worst life decision.",
    "Write a customer review for a haunted toaster."
  ],
  duel: [
    "Roast your rival's imaginary LinkedIn headline.",
    "Explain why your opponent would lose a debate against a toaster.",
    "Write the warning label that should come with your rival's confidence.",
    "Pitch your rival as a premium subscription nobody renews.",
    "Describe your rival's villain origin story in one sentence.",
    "Write a campaign slogan for your rival's worst habit."
  ],
  court: [
    "Present evidence that this friend group should be monitored by the comedy police.",
    "Write the closing argument for why your answer deserves immunity.",
    "Accuse a household object of ruining society.",
    "Draft the judge's statement after the most chaotic group chat incident.",
    "Defend the worst vacation plan like it is a constitutional right.",
    "Write a dramatic witness statement from an overworked phone charger."
  ]
};

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
  maxRounds: gameModes.classic.rounds,
  promptIndex: 0,
  timeLimit: gameModes.classic.timeLimit,
  timeLeft: gameModes.classic.timeLimit,
  submissions: [],
  winner: null,
  verdict: "",
  notice: "",
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

function currentMode() {
  return gameModes[state.mode] || gameModes.classic;
}

function activePrompt() {
  const prompts = promptPacks[state.mode] || promptPacks.classic;
  return prompts[state.promptIndex % prompts.length];
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.round(number)));
}

function applyModeDefaults(modeId) {
  const mode = gameModes[modeId] || gameModes.classic;
  state.mode = gameModes[modeId] ? modeId : "classic";
  state.maxRounds = mode.rounds;
  state.timeLimit = mode.timeLimit;
  state.timeLeft = mode.timeLimit;
}

function pointsForWin() {
  return currentMode().points;
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
  state.timeLeft = state.timeLimit;
  state.submissions = [];
  state.winner = null;
  state.verdict = "";
  state.notice = "";
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
    if (fill) fill.style.width = `${Math.max(0, (state.timeLeft / state.timeLimit) * 100)}%`;
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

function finalRecapMarkup() {
  if (!state.history.length) return "";
  return `
    <div class="recap-list" aria-label="Round recap">
      ${state.history.map((item) => `
        <article class="recap-item">
          <div>
            <span>Round ${item.round} / ${escapeHtml(item.mode)}</span>
            <strong>${escapeHtml(item.playerName)} +${item.points}</strong>
          </div>
          <p>${escapeHtml(item.prompt)}</p>
          <blockquote>${escapeHtml(item.answer)}</blockquote>
        </article>
      `).join("")}
    </div>
  `;
}

function buildRecapText() {
  const sorted = [...state.players].sort((a, b) => b.score - a.score);
  const leader = sorted[0];
  const scoreLines = sorted.map((player, index) => `${index + 1}. ${player.name} - ${player.score} pts`);
  const roundLines = state.history.map((item) => (
    `R${item.round}: ${item.playerName} won ${item.points} pts with "${item.answer}"`
  ));
  return [
    `Roast Arena recap - ${state.roomCode}`,
    `Mode: ${currentMode().label}`,
    `Champion: ${leader.name} (${leader.score} pts)`,
    "",
    "Scoreboard:",
    ...scoreLines,
    "",
    "Round winners:",
    ...roundLines
  ].join("\n");
}

function setShareStatus(message) {
  state.notice = message;
  const status = document.querySelector("#shareStatus");
  if (status) status.textContent = message;
}

function fallbackCopy(text) {
  const scratch = document.createElement("textarea");
  scratch.value = text;
  scratch.setAttribute("readonly", "");
  scratch.style.position = "fixed";
  scratch.style.left = "-9999px";
  document.body.appendChild(scratch);
  scratch.select();
  try {
    const copied = document.execCommand("copy");
    setShareStatus(copied ? "Recap copied to clipboard." : "Could not copy recap in this browser.");
  } catch (error) {
    setShareStatus("Could not copy recap in this browser.");
  } finally {
    scratch.remove();
  }
}

function copyRecap() {
  const text = buildRecapText();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setShareStatus("Recap copied to clipboard."))
      .catch(() => fallbackCopy(text));
    return;
  }
  fallbackCopy(text);
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
  const mode = currentMode();
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
            ${Object.entries(gameModes).map(([id, item]) => `
              <button class="choice ${state.mode === id ? "active" : ""}" type="button" data-mode="${id}">
                <strong>${escapeHtml(item.label)}</strong>
                <span>${escapeHtml(item.helper)}</span>
              </button>
            `).join("")}
          </div>
          <p class="field-note">${escapeHtml(mode.tone)}</p>
        </div>
        <div class="rules-grid">
          <div class="field">
            <label for="maxRounds">Rounds</label>
            <input id="maxRounds" type="number" min="1" max="7" value="${state.maxRounds}">
          </div>
          <div class="field">
            <label for="timeLimit">Timer seconds</label>
            <input id="timeLimit" type="number" min="20" max="90" step="5" value="${state.timeLimit}">
          </div>
          <div class="rule-card">
            <span>Win Value</span>
            <strong>${mode.points} pts</strong>
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
  const mode = currentMode();
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
            <div class="stat"><strong>${state.timeLimit}</strong><span>Seconds</span></div>
            <div class="stat"><strong>${mode.points}</strong><span>Points/Win</span></div>
          </div>
          <p class="mode-note">${escapeHtml(mode.label)} mode: ${escapeHtml(mode.tone)}</p>
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
  const mode = currentMode();
  return shellMarkup(`
    <section class="arena-grid">
      <aside class="sidebar" aria-label="Scoreboard">
        <div class="sidebar-header">
          <h2>Scoreboard</h2>
          <span>Round ${state.round}/${state.maxRounds}</span>
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
              <p class="kicker">${escapeHtml(mode.label)} Mode</p>
              <h2>Drop your roast</h2>
              <p class="judge-reaction">${escapeHtml(judge.reaction)}</p>
            </div>
            <div class="timer" id="roundTimer">${state.timeLeft}</div>
          </div>
          <div class="progress-track"><span class="progress-fill" id="timerFill" style="width: ${Math.max(0, (state.timeLeft / state.timeLimit) * 100)}%"></span></div>
          <textarea id="answerInput" class="answer-input" maxlength="160" placeholder="Make it funny, not felony."></textarea>
          <div class="input-meta">
            <span id="charCount">0/160</span>
            <span>${pointsForWin()} points if picked</span>
          </div>
          <p class="form-error" id="answerError">${state.notice ? escapeHtml(state.notice) : ""}</p>
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
          <p class="mode-note">Winner earns ${pointsForWin()} points in ${escapeHtml(currentMode().label)} mode.</p>
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
          <p class="mode-note">${escapeHtml(winner.playerName)} banked ${pointsForWin()} points for this verdict.</p>
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
          ${finalRecapMarkup()}
          <div class="controls">
            <button class="button hot" id="newGame">Run It Back</button>
            <button class="button secondary" id="newRoom">New Room Setup</button>
            <button class="button ghost" id="copyRecap">Copy Recap</button>
          </div>
          <p class="share-status" id="shareStatus">${state.notice ? escapeHtml(state.notice) : ""}</p>
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
    const maxRounds = clampNumber(document.querySelector("#maxRounds").value, 1, 7, currentMode().rounds);
    const timeLimit = clampNumber(document.querySelector("#timeLimit").value, 20, 90, currentMode().timeLimit);
    state.playerName = playerName;
    state.roomCode = roomCode;
    state.maxRounds = maxRounds;
    state.timeLimit = timeLimit;
    state.timeLeft = timeLimit;
    state.players = state.players.map((player) => (
      player.id === "you" ? { ...player, name: playerName } : player
    ));
    resetGame();
    setScreen("lobby");
  });

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      applyModeDefaults(button.dataset.mode);
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
    state.timeLeft = state.timeLimit;
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
  document.querySelector("#copyRecap")?.addEventListener("click", copyRecap);

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
  const input = document.querySelector("#answerInput");
  const answer = forceBotAnswer ? "" : input.value.trim();
  if (!forceBotAnswer && !answer) {
    state.notice = "Write a roast first, or use Chaos Answer.";
    const error = document.querySelector("#answerError");
    if (error) error.textContent = state.notice;
    input.focus();
    input.classList.remove("shake");
    window.requestAnimationFrame(() => input.classList.add("shake"));
    return;
  }
  stopTimer();
  state.notice = "";
  state.submissions = buildSubmissions(answer);
  setScreen("vote");
}

function chooseWinner(index) {
  const winner = state.submissions[index];
  const player = state.players.find((item) => item.id === winner.playerId);
  const points = pointsForWin();
  if (player) player.score += points;
  state.winner = winner;
  state.verdict = randomFrom(currentJudge().verdicts);
  state.history.push({
    round: state.round,
    mode: currentMode().label,
    playerName: winner.playerName,
    prompt: activePrompt(),
    answer: winner.text,
    points
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
  state.timeLeft = state.timeLimit;
  state.submissions = [];
  state.winner = null;
  state.verdict = "";
  state.notice = "";
  setScreen("submit");
}

render();
