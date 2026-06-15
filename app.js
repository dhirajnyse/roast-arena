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

const promptFlavors = {
  social: {
    label: "Social Spark",
    helper: "Friend table",
    cue: "Everyday banter for birthdays, reunions, and group chats.",
    prompts: {
      classic: [
        "Write a group chat announcement for a friendship committee nobody elected.",
        "Invent an award this friend group would absolutely give itself.",
        "Pitch a party theme that sounds fun until the planning starts."
      ],
      duel: [
        "Describe your rival's party planning style as a suspicious app notification.",
        "Roast your rival's imaginary excuse for arriving late.",
        "Write the toast your rival would give after misunderstanding the assignment."
      ],
      court: [
        "Present evidence that your friend group needs a snack-based constitution.",
        "Defend the person who always says 'five minutes' with full legal confidence.",
        "Call a witness to explain why the group chat has too many opinions."
      ]
    }
  },
  workSafe: {
    label: "Work-Safe",
    helper: "Team rooms",
    cue: "Clean, polished prompts for teams, offsites, and mixed audiences.",
    prompts: {
      classic: [
        "Pitch the most unnecessary office productivity ritual.",
        "Write a launch plan for a spreadsheet that thinks it is famous.",
        "Invent a corporate award for surviving another calendar invite."
      ],
      duel: [
        "Write a polite performance review for your rival's imaginary calendar.",
        "Roast your rival's meeting notes without triggering HR.",
        "Describe your rival as a dashboard metric nobody understands."
      ],
      court: [
        "Defend a meeting that could have been a sticker.",
        "Present evidence that the team snack table needs stronger governance.",
        "Deliver closing arguments for a project name that got out of hand."
      ]
    }
  },
  absurd: {
    label: "Absurd Glow",
    helper: "Surreal jokes",
    cue: "Stranger setups for creator rooms and late-night nonsense.",
    prompts: {
      classic: [
        "Explain why a cloud has started charging rent.",
        "Pitch a luxury spa for emotionally exhausted houseplants.",
        "Write a warning label for a sandwich with main-character energy."
      ],
      duel: [
        "Roast your rival as if they were a fridge with a podcast.",
        "Describe your rival's aura as a rejected cereal mascot.",
        "Write a magical curse that only affects their Wi-Fi confidence."
      ],
      court: [
        "Put a dramatic moon on trial for poor lighting choices.",
        "Defend a haunted elevator that insists it is networking.",
        "Present evidence that a chair has been gossiping after midnight."
      ]
    }
  }
};

const roomVibes = {
  serene: {
    label: "Serene",
    helper: "Soft focus",
    badge: "Serene Room",
    tone: "Calm pacing, polished jokes, no frantic energy.",
    hostCue: "Take a breath. Let the sharpest line arrive clean."
  },
  luminous: {
    label: "Luminous",
    helper: "Bright lounge",
    badge: "Luminous Room",
    tone: "Warm, social, easy for mixed groups.",
    hostCue: "Keep it bright, quick, and impossible not to smile at."
  },
  studio: {
    label: "Studio",
    helper: "Creator ready",
    badge: "Studio Room",
    tone: "Streamer-friendly rhythm with crisp reveals.",
    hostCue: "Write like the clip will be replayed tomorrow."
  }
};

const comedyGuards = {
  gentle: {
    label: "Gentle",
    helper: "Friendly table",
    cue: "Keep jokes playful, warm, and easy for mixed rooms.",
    placeholder: "Aim for clever, playful, and safe for everyone at the table."
  },
  balanced: {
    label: "Balanced",
    helper: "Party sharp",
    cue: "Allow sharper punchlines while keeping the room comfortable.",
    placeholder: "Make it sharp, but keep it about the prompt, not the person."
  },
  bold: {
    label: "Bold",
    helper: "High heat",
    cue: "Bigger swings for creator rooms, still no personal cruelty.",
    placeholder: "Go bigger, keep it witty, and leave the friendship intact."
  }
};

const worldRooms = {
  global: {
    label: "Global",
    cue: "Culture-neutral prompts for mixed rooms.",
    hostLine: "Built for friends across cities, accents, and time zones."
  },
  dubai: {
    label: "Dubai",
    cue: "Luxury, ambition, brunch, and group chat diplomacy.",
    hostLine: "Keep it glossy, clever, and just dramatic enough."
  },
  mumbai: {
    label: "Mumbai",
    cue: "Fast banter, family energy, hustle, and filmi timing.",
    hostLine: "Make the room feel busy, warm, and dangerously witty."
  },
  london: {
    label: "London",
    cue: "Dry wit, polite damage, and weather-based judgment.",
    hostLine: "Understate the insult and let the silence do half the work."
  },
  singapore: {
    label: "Singapore",
    cue: "Clean, sharp, efficient jokes with food-court precision.",
    hostLine: "Keep it tidy, fast, and oddly devastating."
  },
  newyork: {
    label: "New York",
    cue: "Direct, fast, high-pressure punchlines.",
    hostLine: "No warmup. Land the joke before the elevator closes."
  }
};

const promptCompass = {
  social: {
    label: "Relatable truth",
    cue: "Find the group-chat truth everyone quietly recognizes.",
    image: "a group chat that needs adult supervision",
    evidence: "the room has formed a committee and nobody should chair it"
  },
  workSafe: {
    label: "Polished jab",
    cue: "Use a clean workplace metaphor and keep the punchline table-safe.",
    image: "a calendar invite that promoted itself",
    evidence: "this meeting became a dashboard before it became useful"
  },
  absurd: {
    label: "Dream logic",
    cue: "Give the setup a strange job, tiny ego, or dramatic backstory.",
    image: "a sandwich with a personal brand",
    evidence: "the moon asked for a performance review and brought slides"
  }
};

const modeCompass = {
  classic: {
    label: "Clean turn",
    cue: "One setup, one twist, one punchline."
  },
  duel: {
    label: "Persona roast",
    cue: "Aim at the imaginary character, not the real person."
  },
  court: {
    label: "Evidence bit",
    cue: "Sound official first, then let the logic unravel."
  }
};

const guardCompass = {
  gentle: {
    label: "Warm landing",
    cue: "Playful enough for mixed company."
  },
  balanced: {
    label: "Sharp edge",
    cue: "Point the joke at the prompt."
  },
  bold: {
    label: "Big swing",
    cue: "High energy without personal cruelty."
  }
};

const draftWatchWords = ["ugly", "stupid", "hate", "loser", "idiot", "dumb", "trash"];

const roomRecipes = {
  calmFriends: {
    label: "Calm Friends",
    helper: "Easy starter room",
    brief: "A gentle default for first-time rooms, mixed friend groups, and low-pressure laughs.",
    roomVibe: "serene",
    worldRoom: "global",
    mode: "classic",
    promptFlavor: "social",
    selectedJudgeId: "auntie",
    roastLevel: "gentle",
    maxRounds: 3,
    timeLimit: 45
  },
  globalTeam: {
    label: "Global Team",
    helper: "Work-safe social",
    brief: "A polished room for remote teams, offsites, and people joining from different cultures.",
    roomVibe: "luminous",
    worldRoom: "singapore",
    mode: "court",
    promptFlavor: "workSafe",
    selectedJudgeId: "hr",
    roastLevel: "gentle",
    maxRounds: 3,
    timeLimit: 60
  },
  creatorNight: {
    label: "Creator Night",
    helper: "Clip-ready chaos",
    brief: "A sharper setup for streamers, parties, and rooms that want fast memorable moments.",
    roomVibe: "studio",
    worldRoom: "newyork",
    mode: "duel",
    promptFlavor: "absurd",
    selectedJudgeId: "ceo",
    roastLevel: "bold",
    maxRounds: 5,
    timeLimit: 35
  }
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

const botAnswerPacks = {
  gentle: [
    "A subscription box for unfinished to-do lists and optimistic calendars.",
    "My browser history is just curiosity wearing a tiny business suit.",
    "We regret to inform you your gym bag has requested emotional distance.",
    "A luxury planner that gently judges you from the coffee table.",
    "This group chat has strong committee energy and no official minutes.",
    "Where the waiter compliments your choice before forgetting the order.",
    "How I Turned A Mild Delay Into A Personal Brand.",
    "Five stars. Dramatic, warm, and somehow toasted evenly."
  ],
  balanced: [
    "Uber, but for borrowing confidence from strangers.",
    "My browser history is just market research with emotional side quests.",
    "We regret to inform you your cardio has been seeing other people.",
    "A gold-plated subscription box for unused planners.",
    "This group chat has caused more chaos than an unpaid intern with admin access.",
    "Where the waiter judges you before the food does.",
    "How I Turned Minor Inconvenience Into A Full Personality.",
    "Five stars. Screamed at me in Latin, toasted evenly."
  ],
  bold: [
    "A startup that turns overconfidence into push notifications.",
    "My browser history has a crisis PR team and three fake tabs for dignity.",
    "Your gym membership is leaving because it wants a relationship with effort.",
    "A diamond-coated calendar for people allergic to follow-through.",
    "This group chat needs a board, bylaws, and adult supervision.",
    "Where the food arrives late and somehow still has an attitude.",
    "How I Monetized Avoiding Basic Responsibilities.",
    "Five stars. Possessed, dramatic, and still more reliable than my schedule."
  ]
};

const state = {
  screen: "home",
  playerName: "You",
  roomCode: "R0AST",
  mode: "classic",
  roomVibe: "serene",
  worldRoom: "global",
  promptFlavor: "social",
  selectedRecipeId: "calmFriends",
  selectedJudgeId: "auntie",
  roastLevel: "gentle",
  round: 1,
  maxRounds: gameModes.classic.rounds,
  promptIndex: 0,
  timeLimit: gameModes.classic.timeLimit,
  timeLeft: gameModes.classic.timeLimit,
  submissions: [],
  winner: null,
  verdict: "",
  notice: "",
  focusMode: false,
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

function currentVibe() {
  return roomVibes[state.roomVibe] || roomVibes.serene;
}

function currentWorldRoom() {
  return worldRooms[state.worldRoom] || worldRooms.global;
}

function currentPromptFlavor() {
  return promptFlavors[state.promptFlavor] || promptFlavors.social;
}

function currentRecipe() {
  return roomRecipes[state.selectedRecipeId] || null;
}

function currentComedyGuard() {
  return comedyGuards[state.roastLevel] || comedyGuards.gentle;
}

function currentBotAnswers() {
  return botAnswerPacks[state.roastLevel] || botAnswerPacks.gentle;
}

function activePrompt() {
  const flavor = currentPromptFlavor();
  const flavorPrompts = flavor.prompts[state.mode] || flavor.prompts.classic || [];
  const prompts = [...flavorPrompts, ...(promptPacks[state.mode] || promptPacks.classic)];
  return prompts[state.promptIndex % prompts.length];
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.round(number)));
}

function cleanRoomCode(value) {
  const code = String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8);
  return code || "R0AST";
}

function cleanPlayerName(value, fallback = "You") {
  const name = String(value || "").trim().slice(0, 18);
  return name || fallback;
}

function validKey(collection, key, fallback) {
  return Object.prototype.hasOwnProperty.call(collection, key) ? key : fallback;
}

function validJudgeId(id, fallback = "auntie") {
  return judges.some((judge) => judge.id === id) ? id : fallback;
}

function applyModeDefaults(modeId) {
  const mode = gameModes[modeId] || gameModes.classic;
  state.mode = gameModes[modeId] ? modeId : "classic";
  state.maxRounds = mode.rounds;
  state.timeLimit = mode.timeLimit;
  state.timeLeft = mode.timeLimit;
}

function applyRoomRecipe(recipeId) {
  const recipe = roomRecipes[recipeId];
  if (!recipe) return;
  state.selectedRecipeId = recipeId;
  state.roomVibe = recipe.roomVibe;
  state.worldRoom = recipe.worldRoom;
  state.mode = recipe.mode;
  state.promptFlavor = recipe.promptFlavor;
  state.selectedJudgeId = recipe.selectedJudgeId;
  state.roastLevel = recipe.roastLevel;
  state.maxRounds = recipe.maxRounds;
  state.timeLimit = recipe.timeLimit;
  state.timeLeft = recipe.timeLimit;
}

function markCustomRecipe() {
  state.selectedRecipeId = "custom";
}

function pointsForWin() {
  return currentMode().points;
}

function roomPulse() {
  const players = state.players.length;
  const seatScore = Math.min(44, players * 11);
  const guardScore = state.roastLevel === "gentle" ? 20 : state.roastLevel === "balanced" ? 17 : 14;
  const paceScore = state.timeLimit <= 45 ? 18 : state.timeLimit <= 60 ? 15 : 12;
  const roundScore = state.maxRounds <= 3 ? 18 : 14;
  const score = Math.min(100, seatScore + guardScore + paceScore + roundScore);
  const label = score >= 88 ? "Ready" : score >= 72 ? "Warm" : "Gathering";
  const tone = score >= 88 ? "Start clean" : score >= 72 ? "Nearly there" : "Soft opening";
  const pace = state.timeLimit <= 40 ? "Fast" : state.timeLimit <= 60 ? "Steady" : "Slow";
  return {
    score,
    label,
    tone,
    signals: [
      { label: "Seats", value: `${players}/8` },
      { label: "Heat", value: currentComedyGuard().label },
      { label: "Pace", value: pace }
    ]
  };
}

function roomPulseMarkup() {
  const pulse = roomPulse();
  return `
    <div class="room-pulse" aria-label="Room pulse">
      <div class="pulse-head">
        <div>
          <span class="pulse-kicker">Room Pulse</span>
          <strong>${escapeHtml(pulse.label)}</strong>
        </div>
        <span class="pulse-score">${pulse.score}%</span>
      </div>
      <div class="pulse-track" aria-hidden="true">
        <span class="pulse-fill" style="width: ${pulse.score}%"></span>
      </div>
      <div class="pulse-signals">
        ${pulse.signals.map((signal) => `
          <span class="pulse-signal">
            <strong>${escapeHtml(signal.value)}</strong>
            <em>${escapeHtml(signal.label)}</em>
          </span>
        `).join("")}
      </div>
      <p>${escapeHtml(pulse.tone)}</p>
    </div>
  `;
}

function roomSummaryMarkup() {
  const vibe = currentVibe();
  const worldRoom = currentWorldRoom();
  const flavor = currentPromptFlavor();
  const recipe = currentRecipe();
  const guard = currentComedyGuard();
  return `
    <div class="room-summary" aria-label="Room setup summary">
      <span>${escapeHtml(recipe ? recipe.label : "Custom")} Recipe</span>
      <span>${escapeHtml(vibe.label)} Vibe</span>
      <span>${escapeHtml(worldRoom.label)} Room</span>
      <span>${escapeHtml(flavor.label)} Prompts</span>
      <span>${escapeHtml(guard.label)} Guard</span>
      <span>${state.maxRounds} Rounds</span>
    </div>
  `;
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
  state.focusMode = false;
  state.history = [];
  state.players = state.players.map((player) => ({ ...player, score: 0 }));
}

function hydrateInviteFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("room")) return;

  const recipeId = params.get("recipe");
  if (roomRecipes[recipeId]) {
    applyRoomRecipe(recipeId);
  } else {
    state.selectedRecipeId = "custom";
  }

  state.roomCode = cleanRoomCode(params.get("room"));
  state.playerName = cleanPlayerName(params.get("name"), state.playerName);
  state.roomVibe = validKey(roomVibes, params.get("vibe"), state.roomVibe);
  state.worldRoom = validKey(worldRooms, params.get("world"), state.worldRoom);
  state.mode = validKey(gameModes, params.get("mode"), state.mode);
  state.promptFlavor = validKey(promptFlavors, params.get("flavor"), state.promptFlavor);
  state.roastLevel = validKey(comedyGuards, params.get("guard"), state.roastLevel);
  state.selectedJudgeId = validJudgeId(params.get("judge"), state.selectedJudgeId);
  state.maxRounds = clampNumber(params.get("rounds"), 1, 7, currentMode().rounds);
  state.timeLimit = clampNumber(params.get("timer"), 20, 90, currentMode().timeLimit);
  state.timeLeft = state.timeLimit;
  state.players = state.players.map((player) => (
    player.id === "you" ? { ...player, name: state.playerName, score: 0 } : { ...player, score: 0 }
  ));
  state.screen = "lobby";
  state.notice = "Room link ready.";
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
  const vibe = currentVibe();
  return `
    <header class="topbar">
      <img class="brand-mark" src="assets/logo.svg" alt="Roast Arena">
      <div class="brand-lockup">
        <p class="kicker">${escapeHtml(vibe.badge)}</p>
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
    ${state.screen !== "home" ? roomSummaryMarkup() : ""}
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
            <span class="player-name-wrap">
              <span>${escapeHtml(player.name)}</span>
              ${player.invited ? `<span class="player-tag">Guest</span>` : ""}
            </span>
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
      ${state.history.map((item) => {
        const dna = buildPunchlineDna(item.answer);
        return `
          <article class="recap-item">
            <div>
              <span>Round ${item.round} / ${escapeHtml(item.mode)}</span>
              <strong>${escapeHtml(item.playerName)} +${item.points}</strong>
            </div>
            <p>${escapeHtml(item.prompt)}</p>
            <blockquote>${escapeHtml(item.answer)}</blockquote>
            <span class="recap-dna">DNA ${dna.score}% / ${escapeHtml(dna.verdict)}</span>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function buildRecapText() {
  const sorted = [...state.players].sort((a, b) => b.score - a.score);
  const leader = sorted[0];
  const scoreLines = sorted.map((player, index) => `${index + 1}. ${player.name} - ${player.score} pts`);
  const roundLines = state.history.map((item) => {
    const dna = buildPunchlineDna(item.answer);
    return `R${item.round}: ${item.playerName} won ${item.points} pts with "${item.answer}" - DNA ${dna.score}% (${dna.verdict})`;
  });
  return [
    `Roast Arena recap - ${state.roomCode}`,
    `Mode: ${currentMode().label}`,
    `Vibe: ${currentVibe().label}`,
    `World room: ${currentWorldRoom().label}`,
    `Comedy guard: ${currentComedyGuard().label}`,
    `Champion: ${leader.name} (${leader.score} pts)`,
    "",
    "Scoreboard:",
    ...scoreLines,
    "",
    "Round winners:",
    ...roundLines
  ].join("\n");
}

function buildInviteUrl() {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("room", state.roomCode);
  url.searchParams.set("recipe", state.selectedRecipeId);
  url.searchParams.set("vibe", state.roomVibe);
  url.searchParams.set("world", state.worldRoom);
  url.searchParams.set("mode", state.mode);
  url.searchParams.set("flavor", state.promptFlavor);
  url.searchParams.set("guard", state.roastLevel);
  url.searchParams.set("judge", state.selectedJudgeId);
  url.searchParams.set("rounds", String(state.maxRounds));
  url.searchParams.set("timer", String(state.timeLimit));
  return url.toString();
}

function buildInviteText() {
  const recipe = currentRecipe();
  const inviteUrl = buildInviteUrl();
  const flavor = currentPromptFlavor();
  const pulse = roomPulse();
  return [
    "Roast Arena invite",
    `Room: ${state.roomCode}`,
    `Link: ${inviteUrl}`,
    `Recipe: ${recipe ? recipe.label : "Custom"}`,
    `Vibe: ${currentVibe().label}`,
    `World room: ${currentWorldRoom().label}`,
    `Prompt flavor: ${flavor.label}`,
    `Comedy guard: ${currentComedyGuard().label}`,
    `Rounds: ${state.maxRounds} x ${state.timeLimit}s`,
    `Room pulse: ${pulse.label} (${pulse.score}%)`,
    "",
    "Bring one clever answer. Keep it funny, not cruel."
  ].join("\n");
}

function buildHostBrief() {
  const recipe = currentRecipe();
  const mode = currentMode();
  const vibe = currentVibe();
  const worldRoom = currentWorldRoom();
  const flavor = currentPromptFlavor();
  const guard = currentComedyGuard();
  const judge = currentJudge();
  return [
    `Host Brief - ${state.roomCode}`,
    `Welcome to Roast Arena room ${state.roomCode}.`,
    `Room style: ${recipe ? recipe.label : "Custom"} recipe, ${worldRoom.label} table, ${flavor.label} prompts.`,
    `Tone: ${vibe.label}. ${vibe.hostCue}`,
    `Guardrail: ${guard.label}. ${guard.cue}`,
    `Judge: ${judge.name}. ${mode.label} runs ${state.maxRounds} rounds, ${state.timeLimit}s each.`,
    "Win by making the room smile, not by making anyone small."
  ].join("\n");
}

function buildRoastCompass() {
  const promptGuide = promptCompass[state.promptFlavor] || promptCompass.social;
  const modeGuide = modeCompass[state.mode] || modeCompass.classic;
  const guardGuide = guardCompass[state.roastLevel] || guardCompass.gentle;
  const starter = state.mode === "court"
    ? `Exhibit A: ${promptGuide.evidence}.`
    : state.mode === "duel"
      ? `My rival has the confidence of ${promptGuide.image}.`
      : `This has the energy of ${promptGuide.image}.`;
  return {
    label: promptGuide.label,
    cue: promptGuide.cue,
    starter,
    chips: [
      { label: "Shape", value: modeGuide.label, cue: modeGuide.cue },
      { label: "Tone", value: guardGuide.label, cue: guardGuide.cue },
      { label: "Room", value: currentWorldRoom().label, cue: currentWorldRoom().cue }
    ]
  };
}

function buildLaughSignal(text = "") {
  const draft = text.trim();
  const length = draft.length;
  const lowerDraft = draft.toLowerCase();
  const hasTwist = /\b(like|because|but|somehow|nobody|only|energy)\b|as if|plot twist|main character|main-character|exhibit a/i.test(draft);
  const hasWatchWord = draftWatchWords.some((word) => lowerDraft.includes(word));
  const lengthSignal = length === 0
    ? { value: "Start", cue: "One clean image", level: "soft" }
    : length < 35
      ? { value: "Short", cue: "Add a turn", level: "warm" }
      : length <= 120
        ? { value: "Tight", cue: "Good length", level: "strong" }
        : { value: "Long", cue: "Trim it down", level: "warm" };
  const twistSignal = hasTwist
    ? { value: "Clear", cue: "Punchline has a turn", level: "strong" }
    : { value: "Add", cue: "Try like, because, or but", level: length ? "warm" : "soft" };
  const kindnessSignal = hasWatchWord
    ? { value: "Soften", cue: "Aim back at the prompt", level: "warm" }
    : { value: "Safe", cue: "Table-friendly", level: "strong" };
  const lengthScore = length === 0 ? 6 : length < 35 ? 18 : length <= 120 ? 34 : 22;
  const twistScore = hasTwist ? 32 : length >= 35 ? 18 : 8;
  const kindnessScore = hasWatchWord ? 12 : 30;
  const score = Math.min(100, lengthScore + twistScore + kindnessScore);
  const label = length === 0 ? "Listening" : score >= 88 ? "Sharp" : score >= 68 ? "Room-ready" : score >= 44 ? "Warming" : "Seed";
  const cue = length === 0
    ? "Start with a vivid image, then add one clean turn."
    : score >= 88
      ? "Strong enough. Stop before the joke gets heavier."
      : score >= 68
        ? "Good shape. One cleaner final word could make it land."
        : score >= 44
          ? "Nice seed. Add a comparison or a small surprise."
          : "Keep it short and aim the joke at the prompt.";
  return {
    score,
    label,
    cue,
    signals: [
      { label: "Length", ...lengthSignal },
      { label: "Twist", ...twistSignal },
      { label: "Kind", ...kindnessSignal }
    ]
  };
}

function laughSignalMarkup(signal = buildLaughSignal()) {
  return `
    <div class="laugh-signal" aria-label="Laugh signal">
      <div class="laugh-head">
        <div>
          <span>Laugh Signal</span>
          <strong id="laughSignalLabel">${escapeHtml(signal.label)}</strong>
        </div>
        <span class="laugh-score" id="laughSignalScore">${signal.score}%</span>
      </div>
      <div class="laugh-track" aria-hidden="true">
        <span id="laughSignalFill" style="width: ${signal.score}%"></span>
      </div>
      <p id="laughSignalCue">${escapeHtml(signal.cue)}</p>
      <div class="laugh-signals" id="laughSignalChips">
        ${signal.signals.map((item) => `
          <span class="laugh-chip ${escapeHtml(item.level)}">
            <em>${escapeHtml(item.label)}</em>
            <strong>${escapeHtml(item.value)}</strong>
            <small>${escapeHtml(item.cue)}</small>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function buildPunchlineDna(answer) {
  const signal = buildLaughSignal(answer);
  const strongCount = signal.signals.filter((item) => item.level === "strong").length;
  const verdict = signal.score >= 88
    ? "Clean hit"
    : signal.score >= 68
      ? "Room-ready"
      : "Almost there";
  const hostCue = strongCount >= 3
    ? "Keep the pace. Ask for one tighter swing next round."
    : strongCount === 2
      ? "Good laugh shape. Invite the room to sharpen the final word."
      : "Nice spark. Remind players to add one vivid turn.";
  return {
    score: signal.score,
    label: signal.label,
    verdict,
    cue: signal.cue,
    hostCue,
    signals: signal.signals
  };
}

function punchlineDnaMarkup(answer) {
  const dna = buildPunchlineDna(answer);
  return `
    <div class="punchline-dna" aria-label="Punchline DNA">
      <div class="dna-head">
        <div>
          <span>Punchline DNA</span>
          <strong>${escapeHtml(dna.verdict)}</strong>
        </div>
        <span class="dna-score">${dna.score}%</span>
      </div>
      <div class="dna-track" aria-hidden="true">
        <span style="width: ${dna.score}%"></span>
      </div>
      <p>${escapeHtml(dna.hostCue)}</p>
      <div class="dna-chips">
        ${dna.signals.map((item) => `
          <span class="dna-chip ${escapeHtml(item.level)}">
            <em>${escapeHtml(item.label)}</em>
            <strong>${escapeHtml(item.value)}</strong>
            <small>${escapeHtml(item.cue)}</small>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function averageDnaScore() {
  if (!state.history.length) return 0;
  const total = state.history.reduce((sum, item) => sum + buildPunchlineDna(item.answer).score, 0);
  return Math.round(total / state.history.length);
}

function scoreGap() {
  const sorted = [...state.players].sort((a, b) => b.score - a.score);
  return Math.max(0, (sorted[0]?.score || 0) - (sorted[1]?.score || 0));
}

function buildEncorePlan() {
  const average = averageDnaScore();
  const gap = scoreGap();
  const baseWorldRoom = state.worldRoom;
  let plan = {
    label: "Calm Rematch",
    cue: "Keep the same friendly table, reset the scores, and let everyone sharpen one line.",
    setup: {
      mode: "classic",
      roomVibe: "serene",
      promptFlavor: "social",
      roastLevel: "gentle",
      selectedJudgeId: "auntie",
      maxRounds: 3,
      timeLimit: 45
    }
  };

  if (average >= 88 || gap >= pointsForWin() * 2) {
    plan = {
      label: "Sharp Rematch",
      cue: "The room is warmed up. Move to faster duels with bigger swings and cleaner clips.",
      setup: {
        mode: "duel",
        roomVibe: "studio",
        promptFlavor: "absurd",
        roastLevel: state.roastLevel === "bold" ? "bold" : "balanced",
        selectedJudgeId: "ceo",
        maxRounds: 5,
        timeLimit: 35
      }
    };
  } else if (average >= 68 && state.mode !== "court") {
    plan = {
      label: "Court Finale",
      cue: "The jokes have shape. Give the room a cleaner dramatic finish with bigger verdicts.",
      setup: {
        mode: "court",
        roomVibe: "luminous",
        promptFlavor: state.promptFlavor === "absurd" ? "absurd" : "workSafe",
        roastLevel: state.roastLevel === "gentle" ? "balanced" : state.roastLevel,
        selectedJudgeId: "king",
        maxRounds: 3,
        timeLimit: 60
      }
    };
  } else if (average < 58) {
    plan = {
      label: "Soft Reset",
      cue: "Bring the room back to easy social prompts and give players more breathing room.",
      setup: {
        mode: "classic",
        roomVibe: "serene",
        promptFlavor: "social",
        roastLevel: "gentle",
        selectedJudgeId: "auntie",
        maxRounds: 3,
        timeLimit: 60
      }
    };
  }

  return {
    ...plan,
    average,
    gap,
    setup: {
      ...plan.setup,
      worldRoom: baseWorldRoom
    },
    chips: [
      { label: "DNA Avg", value: average ? `${average}%` : "Fresh", cue: "Match signal" },
      { label: "Next Mode", value: gameModes[plan.setup.mode].label, cue: `${plan.setup.maxRounds} rounds` },
      { label: "Guard", value: comedyGuards[plan.setup.roastLevel].label, cue: `${plan.setup.timeLimit}s pace` }
    ]
  };
}

function encorePlanMarkup() {
  const plan = buildEncorePlan();
  return `
    <div class="encore-plan" aria-label="Encore plan">
      <div class="encore-head">
        <div>
          <span>Encore Plan</span>
          <strong>${escapeHtml(plan.label)}</strong>
        </div>
        <button class="button secondary" id="applyEncore">Apply Encore</button>
      </div>
      <p>${escapeHtml(plan.cue)}</p>
      <div class="encore-chips">
        ${plan.chips.map((chip) => `
          <span class="encore-chip">
            <em>${escapeHtml(chip.label)}</em>
            <strong>${escapeHtml(chip.value)}</strong>
            <small>${escapeHtml(chip.cue)}</small>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function setShareStatus(message) {
  state.notice = message;
  const status = document.querySelector("#shareStatus");
  if (status) status.textContent = message;
}

function setInviteStatus(message) {
  state.notice = message;
  const status = document.querySelector("#inviteStatus");
  if (status) status.textContent = message;
}

function setBriefStatus(message) {
  const status = document.querySelector("#briefStatus");
  if (status) status.textContent = message;
}

function fallbackCopy(text, setStatus = setShareStatus) {
  const scratch = document.createElement("textarea");
  scratch.value = text;
  scratch.setAttribute("readonly", "");
  scratch.style.position = "fixed";
  scratch.style.left = "-9999px";
  document.body.appendChild(scratch);
  scratch.select();
  try {
    const copied = document.execCommand("copy");
    setStatus(copied ? "Copied to clipboard." : "Could not copy in this browser.");
    return copied;
  } catch (error) {
    setStatus("Could not copy in this browser.");
    return false;
  } finally {
    scratch.remove();
  }
}

function copyRecap() {
  const text = buildRecapText();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setShareStatus("Recap copied to clipboard."))
      .catch(() => fallbackCopy(text, setShareStatus));
    return;
  }
  fallbackCopy(text, setShareStatus);
}

function copyInvite() {
  const text = buildInviteText();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setInviteStatus("Smart invite copied."))
      .catch(() => fallbackCopy(text, setInviteStatus));
    return;
  }
  fallbackCopy(text, setInviteStatus);
}

function copyHostBrief() {
  const text = buildHostBrief();
  const fallbackBriefCopy = () => {
    const copied = fallbackCopy(text, setBriefStatus);
    if (!copied) setBriefStatus("Copy is blocked here. Brief text is ready above.");
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setBriefStatus("Host brief copied."))
      .catch(fallbackBriefCopy);
    return;
  }
  fallbackBriefCopy();
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
  const vibe = currentVibe();
  const worldRoom = currentWorldRoom();
  const recipe = currentRecipe();
  const guard = currentComedyGuard();
  const flavor = currentPromptFlavor();
  return shellMarkup(`
    <section class="home-layout">
      <div>
        <img class="hero-logo" src="assets/logo.svg" alt="Roast Arena logo">
        <p class="kicker">Enter funny. Leave famous.</p>
        <h2 class="hero-title">Calm room. Sharp laughs.</h2>
        <p class="hero-copy">A global party-room prototype where the interface stays peaceful, the setup stays simple, and the jokes still get their spotlight.</p>
        <div class="stats-grid">
          <div class="stat"><strong>${escapeHtml(vibe.label)}</strong><span>Room Vibe</span></div>
          <div class="stat"><strong>${escapeHtml(worldRoom.label)}</strong><span>World Room</span></div>
          <div class="stat"><strong>${escapeHtml(guard.label)}</strong><span>Comedy Guard</span></div>
        </div>
      </div>

      <form class="setup-card" id="setupForm">
        <div class="identity-grid">
          <div class="field">
            <label for="playerName">Player name</label>
            <input id="playerName" maxlength="18" value="${escapeHtml(state.playerName)}">
          </div>
          <div class="field">
            <label for="roomCode">Room code</label>
            <input id="roomCode" maxlength="8" value="${escapeHtml(state.roomCode)}">
          </div>
        </div>
        <div class="field">
          <label>Room recipe</label>
          <div class="recipe-grid">
            ${Object.entries(roomRecipes).map(([id, item]) => `
              <button class="choice recipe-choice ${state.selectedRecipeId === id ? "active" : ""}" type="button" data-recipe="${id}">
                <strong>${escapeHtml(item.label)}</strong>
                <span>${escapeHtml(item.helper)}</span>
              </button>
            `).join("")}
          </div>
          <p class="field-note">${escapeHtml(recipe ? recipe.brief : "Custom room: your fine-tuned setup is ready.")}</p>
        </div>
        <div class="field">
          <label>Prompt Studio</label>
          <div class="flavor-grid">
            ${Object.entries(promptFlavors).map(([id, item]) => `
              <button class="choice flavor-choice ${state.promptFlavor === id ? "active" : ""}" type="button" data-flavor="${id}">
                <strong>${escapeHtml(item.label)}</strong>
                <span>${escapeHtml(item.helper)}</span>
              </button>
            `).join("")}
          </div>
          <p class="field-note">${escapeHtml(flavor.cue)}</p>
        </div>
        <div class="tune-grid">
          <div class="field">
            <label for="worldRoom">World room</label>
            <select id="worldRoom">
              ${Object.entries(worldRooms).map(([id, item]) => `
                <option value="${id}" ${state.worldRoom === id ? "selected" : ""}>${escapeHtml(item.label)}</option>
              `).join("")}
            </select>
          </div>
          <div class="field">
            <label for="vibeSelect">Vibe</label>
            <select id="vibeSelect">
              ${Object.entries(roomVibes).map(([id, item]) => `
                <option value="${id}" ${state.roomVibe === id ? "selected" : ""}>${escapeHtml(item.label)}</option>
              `).join("")}
            </select>
          </div>
          <div class="field">
            <label for="modeSelect">Mode</label>
            <select id="modeSelect">
              ${Object.entries(gameModes).map(([id, item]) => `
                <option value="${id}" ${state.mode === id ? "selected" : ""}>${escapeHtml(item.label)}</option>
              `).join("")}
            </select>
          </div>
          <div class="field">
            <label for="guardSelect">Comedy guard</label>
            <select id="guardSelect">
              ${Object.entries(comedyGuards).map(([id, item]) => `
                <option value="${id}" ${state.roastLevel === id ? "selected" : ""}>${escapeHtml(item.label)}</option>
              `).join("")}
            </select>
          </div>
        </div>
        <p class="field-note">${escapeHtml(guard.label)} guard: ${escapeHtml(guard.cue)}</p>
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
          <select id="judgeSelect">
            ${judges.map((item) => `
              <option value="${item.id}" ${judge.id === item.id ? "selected" : ""}>${escapeHtml(item.name)}</option>
            `).join("")}
          </select>
          <p class="field-note">${escapeHtml(judge.flavor)}</p>
        </div>
        <button class="button hot full" type="submit">Create Party Room</button>
      </form>
    </section>
  `);
}

function renderLobby() {
  const mode = currentMode();
  const vibe = currentVibe();
  const worldRoom = currentWorldRoom();
  const guard = currentComedyGuard();
  const flavor = currentPromptFlavor();
  const recipe = currentRecipe();
  const hostBrief = buildHostBrief();
  const inviteText = buildInviteText();
  return shellMarkup(`
    <section class="arena-grid">
      <aside class="sidebar" aria-label="Players">
        <div class="sidebar-header">
          <h2>Players</h2>
          <span>${state.players.length}/8</span>
        </div>
        ${scoreboardMarkup()}
        <form class="guest-form" id="guestForm">
          <label for="guestName">Add guest</label>
          <div class="guest-row">
            <input id="guestName" maxlength="18" placeholder="Friend name">
            <button class="button secondary" type="submit">Add</button>
          </div>
          <p class="field-note">Keep the room light and easy to scan.</p>
        </form>
      </aside>
      <section class="stage">
        <div class="phase-panel">
          <p class="kicker">Lobby</p>
          <h2>Share the room code</h2>
          <p class="hero-copy">${escapeHtml(worldRoom.hostLine)}</p>
          <div class="lobby-code">${escapeHtml(state.roomCode)}</div>
          <div class="stats-grid">
            <div class="stat"><strong>${state.maxRounds}</strong><span>Rounds</span></div>
            <div class="stat"><strong>${state.timeLimit}</strong><span>Seconds</span></div>
            <div class="stat"><strong>${mode.points}</strong><span>Points/Win</span></div>
          </div>
          ${roomPulseMarkup()}
          <p class="mode-note">${escapeHtml(mode.label)} mode: ${escapeHtml(mode.tone)}</p>
          <div class="host-cue">
            <span>${escapeHtml(vibe.label)} host cue</span>
            <p>${escapeHtml(vibe.hostCue)}</p>
          </div>
          <div class="host-cue prompt-cue">
            <span>${escapeHtml(flavor.label)} prompt studio</span>
            <p>${escapeHtml(flavor.cue)}</p>
          </div>
          <div class="host-cue guard-cue">
            <span>${escapeHtml(guard.label)} comedy guard</span>
            <p>${escapeHtml(guard.cue)}</p>
          </div>
          <div class="host-brief" aria-label="Host brief">
            <div>
              <span>Host Brief</span>
              <strong>${escapeHtml(recipe ? recipe.label : "Custom")} / ${escapeHtml(flavor.label)}</strong>
            </div>
            <pre>${escapeHtml(hostBrief)}</pre>
            <p class="share-status" id="briefStatus"></p>
          </div>
          <div class="invite-card" aria-label="Room invite">
            <div>
              <span>Invite Preview</span>
              <strong>${escapeHtml(state.roomCode)} / ${escapeHtml(worldRoom.label)}</strong>
            </div>
            <pre>${escapeHtml(inviteText)}</pre>
            <p class="share-status" id="inviteStatus">${state.notice ? escapeHtml(state.notice) : ""}</p>
          </div>
          <div class="controls">
            <button class="button hot" id="startGame">Start Game</button>
            <button class="button secondary" id="copyBrief">Copy Brief</button>
            <button class="button secondary" id="copyInvite">Copy Invite</button>
            <button class="button secondary" id="addBot">Add Bot</button>
            <button class="button ghost" id="backHome">Edit Setup</button>
          </div>
        </div>
      </section>
    </section>
  `);
}

function renderSubmit() {
  const mode = currentMode();
  const vibe = currentVibe();
  const worldRoom = currentWorldRoom();
  const guard = currentComedyGuard();
  const compass = buildRoastCompass();
  return shellMarkup(`
    <section class="arena-grid ${state.focusMode ? "focus-mode" : ""}">
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
              <p class="judge-reaction">${escapeHtml(vibe.hostCue)}</p>
            </div>
            <div class="timer" id="roundTimer">${state.timeLeft}</div>
          </div>
          <p class="room-cue">${escapeHtml(worldRoom.label)} room / ${escapeHtml(guard.label)} guard: ${escapeHtml(guard.cue)}</p>
          <div class="roast-compass" aria-label="Roast compass">
            <div class="compass-head">
              <span>Roast Compass</span>
              <strong>${escapeHtml(compass.label)}</strong>
            </div>
            <p>${escapeHtml(compass.cue)}</p>
            <div class="compass-chips">
              ${compass.chips.map((chip) => `
                <span class="compass-chip">
                  <em>${escapeHtml(chip.label)}</em>
                  <strong>${escapeHtml(chip.value)}</strong>
                  <small>${escapeHtml(chip.cue)}</small>
                </span>
              `).join("")}
            </div>
          </div>
          <div class="progress-track"><span class="progress-fill" id="timerFill" style="width: ${Math.max(0, (state.timeLeft / state.timeLimit) * 100)}%"></span></div>
          <textarea id="answerInput" class="answer-input" maxlength="160" placeholder="${escapeHtml(guard.placeholder)}"></textarea>
          <div class="input-meta">
            <span id="charCount">0/160</span>
            <span>${pointsForWin()} points if picked</span>
          </div>
          ${laughSignalMarkup()}
          <p class="form-error" id="answerError">${state.notice ? escapeHtml(state.notice) : ""}</p>
          <div class="controls">
            <button class="button hot" id="submitAnswer">Submit Roast</button>
            <button class="button secondary" id="toggleFocus">${state.focusMode ? "Show Scoreboard" : "Calm Focus"}</button>
            <button class="button secondary" id="compassStarter">Use Starter</button>
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
          ${punchlineDnaMarkup(winner.text)}
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
  const vibe = currentVibe();
  const worldRoom = currentWorldRoom();
  const guard = currentComedyGuard();
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
          <p class="hero-copy">${escapeHtml(vibe.label)} vibe, ${escapeHtml(worldRoom.label)} room, ${escapeHtml(guard.label)} guard. The jokes landed, the flow stayed calm, and the winner gets the clean receipt.</p>
          <div class="champion-card">
            <span class="avatar champion-avatar">${escapeHtml(initials(leader.name))}</span>
            <div>
              <span class="meter-label">Champion Score</span>
              <strong>${leader.score} points</strong>
            </div>
          </div>
          ${encorePlanMarkup()}
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
  document.body.dataset.vibe = state.roomVibe;
  app.innerHTML = screens[state.screen]();
  bindEvents();
  if (state.screen === "submit") startRoundTimer();
}

function bindEvents() {
  document.querySelector("#setupForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const playerName = cleanPlayerName(document.querySelector("#playerName").value);
    const roomCode = cleanRoomCode(document.querySelector("#roomCode").value);
    const worldRoom = document.querySelector("#worldRoom").value;
    const judgeId = document.querySelector("#judgeSelect").value;
    const roastLevel = document.querySelector("#guardSelect").value;
    const maxRounds = clampNumber(document.querySelector("#maxRounds").value, 1, 7, currentMode().rounds);
    const timeLimit = clampNumber(document.querySelector("#timeLimit").value, 20, 90, currentMode().timeLimit);
    state.playerName = playerName;
    state.roomCode = roomCode;
    state.worldRoom = validKey(worldRooms, worldRoom, "global");
    state.selectedJudgeId = validJudgeId(judgeId, "hr");
    state.roastLevel = validKey(comedyGuards, roastLevel, "gentle");
    state.maxRounds = maxRounds;
    state.timeLimit = timeLimit;
    state.timeLeft = timeLimit;
    state.players = state.players.map((player) => (
      player.id === "you" ? { ...player, name: playerName } : player
    ));
    resetGame();
    setScreen("lobby");
  });

  document.querySelectorAll("[data-recipe]").forEach((button) => {
    button.addEventListener("click", () => {
      applyRoomRecipe(button.dataset.recipe);
      render();
    });
  });

  document.querySelectorAll("[data-flavor]").forEach((button) => {
    button.addEventListener("click", () => {
      markCustomRecipe();
      state.promptFlavor = validKey(promptFlavors, button.dataset.flavor, "social");
      render();
    });
  });

  document.querySelector("#worldRoom")?.addEventListener("change", (event) => {
    markCustomRecipe();
    state.worldRoom = validKey(worldRooms, event.target.value, "global");
    render();
  });

  document.querySelector("#vibeSelect")?.addEventListener("change", (event) => {
    markCustomRecipe();
    state.roomVibe = validKey(roomVibes, event.target.value, "serene");
    render();
  });

  document.querySelector("#modeSelect")?.addEventListener("change", (event) => {
    markCustomRecipe();
    applyModeDefaults(event.target.value);
    render();
  });

  document.querySelector("#guardSelect")?.addEventListener("change", (event) => {
    markCustomRecipe();
    state.roastLevel = validKey(comedyGuards, event.target.value, "gentle");
    render();
  });

  document.querySelector("#judgeSelect")?.addEventListener("change", (event) => {
    markCustomRecipe();
    state.selectedJudgeId = validJudgeId(event.target.value, "hr");
    render();
  });

  document.querySelector("#maxRounds")?.addEventListener("input", markCustomRecipe);
  document.querySelector("#timeLimit")?.addEventListener("input", markCustomRecipe);

  document.querySelector("#backHome")?.addEventListener("click", () => setScreen("home"));
  document.querySelector("#startGame")?.addEventListener("click", () => {
    state.timeLeft = state.timeLimit;
    setScreen("submit");
  });
  document.querySelector("#copyBrief")?.addEventListener("click", copyHostBrief);
  document.querySelector("#copyInvite")?.addEventListener("click", copyInvite);
  document.querySelector("#addBot")?.addEventListener("click", addBot);
  document.querySelector("#guestForm")?.addEventListener("submit", addGuest);
  document.querySelector("#submitAnswer")?.addEventListener("click", submitAnswer);
  document.querySelector("#toggleFocus")?.addEventListener("click", toggleFocusMode);
  document.querySelector("#compassStarter")?.addEventListener("click", useCompassStarter);
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
  document.querySelector("#applyEncore")?.addEventListener("click", applyEncorePlan);
  document.querySelector("#copyRecap")?.addEventListener("click", copyRecap);

  const answerInput = document.querySelector("#answerInput");
  const charCount = document.querySelector("#charCount");
  if (answerInput && charCount) {
    answerInput.addEventListener("input", updateCharCount);
  }

  document.querySelectorAll("[data-vote]").forEach((button) => {
    button.addEventListener("click", () => chooseWinner(Number(button.dataset.vote)));
  });
}

function addBot() {
  state.notice = "";
  const names = ["Rafi", "Lina", "Omar", "Pixel", "Tara", "Jay", "Ava", "Noor"];
  const used = new Set(state.players.map((player) => player.name.toLowerCase()));
  const name = names.find((candidate) => !used.has(candidate.toLowerCase()));
  if (state.players.length >= 8) {
    setInviteStatus("Room is full at 8 players.");
    return;
  }
  if (!name) {
    setInviteStatus("All quick guests are already in.");
    return;
  }
  state.players.push({ id: name.toLowerCase(), name, score: 0, bot: true });
  render();
}

function addGuest(event) {
  event.preventDefault();
  const input = document.querySelector("#guestName");
  const name = input.value.trim();
  const normalized = name.toLowerCase();
  const used = new Set(state.players.map((player) => player.name.toLowerCase()));
  if (!name) {
    setInviteStatus("Add a guest name first.");
    input.focus();
    return;
  }
  if (state.players.length >= 8) {
    setInviteStatus("Room is full at 8 players.");
    return;
  }
  if (used.has(normalized)) {
    setInviteStatus("That guest is already in the room.");
    input.focus();
    return;
  }
  state.players.push({
    id: `guest-${Date.now()}`,
    name,
    score: 0,
    bot: true,
    invited: true
  });
  state.notice = `${name} added to the room.`;
  render();
}

function updateCharCount() {
  const input = document.querySelector("#answerInput");
  const charCount = document.querySelector("#charCount");
  if (input && charCount) charCount.textContent = `${input.value.length}/160`;
  if (input) updateLaughSignal(input.value);
}

function updateLaughSignal(text) {
  const signal = buildLaughSignal(text);
  const label = document.querySelector("#laughSignalLabel");
  const score = document.querySelector("#laughSignalScore");
  const fill = document.querySelector("#laughSignalFill");
  const cue = document.querySelector("#laughSignalCue");
  const chips = document.querySelector("#laughSignalChips");
  if (label) label.textContent = signal.label;
  if (score) score.textContent = `${signal.score}%`;
  if (fill) fill.style.width = `${signal.score}%`;
  if (cue) cue.textContent = signal.cue;
  if (chips) {
    chips.innerHTML = signal.signals.map((item) => `
      <span class="laugh-chip ${escapeHtml(item.level)}">
        <em>${escapeHtml(item.label)}</em>
        <strong>${escapeHtml(item.value)}</strong>
        <small>${escapeHtml(item.cue)}</small>
      </span>
    `).join("");
  }
}

function useCompassStarter() {
  const input = document.querySelector("#answerInput");
  if (!input) return;
  input.value = buildRoastCompass().starter.slice(0, 160);
  updateCharCount();
  state.notice = "";
  const error = document.querySelector("#answerError");
  if (error) error.textContent = "";
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
}

function useChaosAnswer() {
  const input = document.querySelector("#answerInput");
  const answers = currentBotAnswers();
  input.value = answers[state.promptIndex % answers.length];
  updateCharCount();
  input.focus();
}

function toggleFocusMode() {
  const input = document.querySelector("#answerInput");
  const draft = input ? input.value : "";
  state.focusMode = !state.focusMode;
  render();
  const nextInput = document.querySelector("#answerInput");
  if (!nextInput) return;
  nextInput.value = draft;
  updateCharCount();
  nextInput.focus();
  nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
}

function applyEncorePlan() {
  const plan = buildEncorePlan();
  state.selectedRecipeId = "custom";
  state.mode = plan.setup.mode;
  state.roomVibe = plan.setup.roomVibe;
  state.worldRoom = plan.setup.worldRoom;
  state.promptFlavor = plan.setup.promptFlavor;
  state.roastLevel = plan.setup.roastLevel;
  state.selectedJudgeId = plan.setup.selectedJudgeId;
  state.maxRounds = plan.setup.maxRounds;
  state.timeLimit = plan.setup.timeLimit;
  state.timeLeft = plan.setup.timeLimit;
  resetGame();
  state.notice = `${plan.label} applied.`;
  setScreen("lobby");
}

function buildSubmissions(answer) {
  const answers = currentBotAnswers();
  const userAnswer = answer || answers[state.promptIndex % answers.length];
  return state.players.map((player, index) => ({
    playerId: player.id,
    playerName: player.name,
    text: player.bot ? answers[(state.promptIndex + index) % answers.length] : userAnswer
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

hydrateInviteFromUrl();
render();
