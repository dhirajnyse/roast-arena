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
    hostLine: "Built for friends across cities, accents, and time zones.",
    rhythm: "Warm, plain-language jokes that travel across cultures.",
    safeAngle: "Use shared rituals like group chats, snacks, meetings, and celebrations.",
    avoid: "Avoid local politics, accents, religion, or inside references.",
    promptSeed: "Make the prompt funny even if nobody shares the same hometown."
  },
  dubai: {
    label: "Dubai",
    cue: "Luxury, ambition, brunch, and group chat diplomacy.",
    hostLine: "Keep it glossy, clever, and just dramatic enough.",
    rhythm: "Polished ambition, luxury cues, brunch plans, and friendly drama.",
    safeAngle: "Aim at over-planning, premium everything, and group-chat diplomacy.",
    avoid: "Avoid stereotypes, class jokes, religion, or nationality punches.",
    promptSeed: "Turn ordinary errands into five-star launches."
  },
  mumbai: {
    label: "Mumbai",
    cue: "Fast banter, family energy, hustle, and filmi timing.",
    hostLine: "Make the room feel busy, warm, and dangerously witty.",
    rhythm: "Fast turns, family warmth, hustle energy, and dramatic timing.",
    safeAngle: "Use traffic, group plans, snacks, and overconfident schedules.",
    avoid: "Avoid language mockery, class jokes, religion, or regional digs.",
    promptSeed: "Make every setup feel late but confident."
  },
  london: {
    label: "London",
    cue: "Dry wit, polite damage, and weather-based judgment.",
    hostLine: "Understate the insult and let the silence do half the work.",
    rhythm: "Dry understatement, polite tension, weather jokes, and quiet judgment.",
    safeAngle: "Use queues, transport delays, tea-level disappointment, and polite emails.",
    avoid: "Avoid identity jokes, class digs, politics, or accent imitation.",
    promptSeed: "Let the roast sound formal while the meaning gets sharper."
  },
  singapore: {
    label: "Singapore",
    cue: "Clean, sharp, efficient jokes with food-court precision.",
    hostLine: "Keep it tidy, fast, and oddly devastating.",
    rhythm: "Precise jokes, efficient setups, food-court timing, and clean structure.",
    safeAngle: "Use queues, rules, hawker decisions, calendars, and tidy chaos.",
    avoid: "Avoid ethnicity, language mockery, politics, or personal status jokes.",
    promptSeed: "Make the punchline feel organized enough to pass inspection."
  },
  newyork: {
    label: "New York",
    cue: "Direct, fast, high-pressure punchlines.",
    hostLine: "No warmup. Land the joke before the elevator closes.",
    rhythm: "Direct setups, fast opinions, big confidence, and city-pressure pace.",
    safeAngle: "Use rent, commute logic, coffee urgency, and main-character schedules.",
    avoid: "Avoid identity jokes, neighborhoods as insults, politics, or income digs.",
    promptSeed: "Make the answer sound late, expensive, and somehow confident."
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

const arenaScreens = ["home", "lobby", "submit", "vote", "verdict", "scoreboard"];
const projectScreens = ["build", "roadmap"];

const buildSignals = [
  {
    label: "Current release",
    value: "Room Share Polish",
    note: "Static room links now get a cleaner guest handoff before live multiplayer."
  },
  {
    label: "Prototype channel",
    value: "GitHub Pages",
    note: "Static, fast, and easy to preview while the game loop evolves."
  },
  {
    label: "Product principle",
    value: "Simplify",
    note: "Every release should make the room easier to host."
  }
];

const buildLanes = [
  {
    status: "Shipped",
    title: "Round Start Polish",
    note: "Players now see a compact start cue before writing the first answer."
  },
  {
    status: "Shipped",
    title: "Vote Flow Polish",
    note: "The voting moment now explains what to reward and makes each anonymous answer easier to scan."
  },
  {
    status: "Shipped",
    title: "Verdict Moment Polish",
    note: "Make the winning reveal feel more replayable while keeping the next action obvious."
  },
  {
    status: "Shipped",
    title: "Scoreboard Polish",
    note: "Make the final match closeout easier to share, replay, and restart."
  },
  {
    status: "Shipped",
    title: "Room Share Polish",
    note: "Make shared room links feel more polished for guests before real multiplayer."
  },
  {
    status: "Next",
    title: "Live Sync Prep",
    note: "Prepare the room loop for one shared state model before backend work."
  }
];

const quickLaunches = [
  {
    recipeId: "calmFriends",
    label: "Serene Table",
    meta: "Gentle / Global / 3 rounds",
    cue: "Easy first room"
  },
  {
    recipeId: "globalTeam",
    label: "Global Team",
    meta: "Work-safe / Singapore / Court",
    cue: "Polished group energy"
  },
  {
    recipeId: "creatorNight",
    label: "Creator Night",
    meta: "Bold / New York / Duel",
    cue: "Clip-ready pace"
  }
];

const magicMixes = {
  zen: {
    label: "Zen Start",
    cue: "Peaceful first room",
    promise: "Gentle jokes, calm pace, global-safe defaults.",
    insight: "Best when the host wants everyone relaxed before the first laugh.",
    recipeId: "calmFriends",
    setup: {
      roomVibe: "serene",
      worldRoom: "global",
      mode: "classic",
      promptFlavor: "social",
      selectedJudgeId: "auntie",
      roastLevel: "gentle",
      maxRounds: 3,
      timeLimit: 45
    }
  },
  global: {
    label: "World Class",
    cue: "Polished global room",
    promise: "Work-safe energy with bigger verdict drama.",
    insight: "Best for mixed cultures, remote teams, and professional group fun.",
    recipeId: "globalTeam",
    setup: {
      roomVibe: "luminous",
      worldRoom: "singapore",
      mode: "court",
      promptFlavor: "workSafe",
      selectedJudgeId: "hr",
      roastLevel: "gentle",
      maxRounds: 3,
      timeLimit: 60
    }
  },
  creator: {
    label: "Creator Glow",
    cue: "Clip-ready pace",
    promise: "Fast turns, bold guard, sharper judge energy.",
    insight: "Best when the room wants replayable moments and higher tempo.",
    recipeId: "creatorNight",
    setup: {
      roomVibe: "studio",
      worldRoom: "newyork",
      mode: "duel",
      promptFlavor: "absurd",
      selectedJudgeId: "ceo",
      roastLevel: "bold",
      maxRounds: 5,
      timeLimit: 35
    }
  },
  spark: {
    label: "Night Spark",
    cue: "Funky party room",
    promise: "Brighter banter with safer chaos and quick rounds.",
    insight: "Best for late friends, birthdays, and rooms that want playful lift.",
    recipeId: "custom",
    setup: {
      roomVibe: "luminous",
      worldRoom: "dubai",
      mode: "classic",
      promptFlavor: "absurd",
      selectedJudgeId: "king",
      roastLevel: "balanced",
      maxRounds: 4,
      timeLimit: 40
    }
  }
};

const recipeMagicMixMap = {
  calmFriends: "zen",
  globalTeam: "global",
  creatorNight: "creator"
};

const roadmapItems = [
  {
    phase: "Now",
    title: "Room Share Polish",
    text: "Make shared room links feel more polished for guests before real multiplayer.",
    status: "Shipped"
  },
  {
    phase: "Next",
    title: "Live Sync Prep",
    text: "Prepare the room loop for one shared state model before backend work.",
    status: "Planned"
  },
  {
    phase: "Scale",
    title: "Real Multiplayer",
    text: "Move room state, submissions, voting, and verdicts from local simulation to live sync.",
    status: "Research"
  },
  {
    phase: "Platform",
    title: "Multi-Environment Launch",
    text: "Keep staging, country rollout, and production operations calm before the wider launch.",
    status: "Later"
  }
];

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
  lastArenaScreen: "home",
  playerName: "You",
  roomCode: "R0AST",
  mode: "classic",
  roomVibe: "serene",
  worldRoom: "global",
  promptFlavor: "social",
  selectedRecipeId: "calmFriends",
  selectedMixId: "zen",
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
  showAdvancedSetup: false,
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

function currentMagicMix() {
  if (magicMixes[state.selectedMixId]) return magicMixes[state.selectedMixId];
  const vibe = currentVibe();
  const worldRoom = currentWorldRoom();
  const guard = currentComedyGuard();
  return {
    label: "Custom Mix",
    cue: "Fine-tuned by you",
    promise: `${vibe.label} vibe, ${worldRoom.label} room, ${guard.label} guard.`,
    insight: "Your custom setup is ready. Keep it only if every choice earns its place."
  };
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

function launchCode(recipeId) {
  const prefix = {
    calmFriends: "CALM",
    globalTeam: "TEAM",
    creatorNight: "CLIP"
  }[recipeId] || "ROOM";
  return cleanRoomCode(`${prefix}${Math.floor(Math.random() * 90) + 10}`);
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
  state.selectedMixId = recipeMagicMixMap[recipeId] || "custom";
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

function syncSetupDraft() {
  const playerNameInput = document.querySelector("#playerName");
  const roomCodeInput = document.querySelector("#roomCode");
  const worldRoomInput = document.querySelector("#worldRoom");
  const vibeInput = document.querySelector("#vibeSelect");
  const modeInput = document.querySelector("#modeSelect");
  const guardInput = document.querySelector("#guardSelect");
  const judgeInput = document.querySelector("#judgeSelect");
  const maxRoundsInput = document.querySelector("#maxRounds");
  const timeLimitInput = document.querySelector("#timeLimit");

  state.playerName = cleanPlayerName(playerNameInput ? playerNameInput.value : state.playerName, state.playerName);
  state.roomCode = cleanRoomCode(roomCodeInput ? roomCodeInput.value : state.roomCode);

  if (worldRoomInput) state.worldRoom = validKey(worldRooms, worldRoomInput.value, state.worldRoom);
  if (vibeInput) state.roomVibe = validKey(roomVibes, vibeInput.value, state.roomVibe);
  if (modeInput) state.mode = validKey(gameModes, modeInput.value, state.mode);
  if (guardInput) state.roastLevel = validKey(comedyGuards, guardInput.value, state.roastLevel);
  if (judgeInput) state.selectedJudgeId = validJudgeId(judgeInput.value, state.selectedJudgeId);

  const mode = currentMode();
  if (maxRoundsInput) state.maxRounds = clampNumber(maxRoundsInput.value, 1, 7, mode.rounds);
  if (timeLimitInput) state.timeLimit = clampNumber(timeLimitInput.value, 20, 90, mode.timeLimit);
  state.timeLeft = state.timeLimit;
  state.players = state.players.map((player) => (
    player.id === "you" ? { ...player, name: state.playerName } : player
  ));
}

function applySetup(setup) {
  state.roomVibe = validKey(roomVibes, setup.roomVibe, state.roomVibe);
  state.worldRoom = validKey(worldRooms, setup.worldRoom, state.worldRoom);
  state.mode = validKey(gameModes, setup.mode, state.mode);
  state.promptFlavor = validKey(promptFlavors, setup.promptFlavor, state.promptFlavor);
  state.selectedJudgeId = validJudgeId(setup.selectedJudgeId, state.selectedJudgeId);
  state.roastLevel = validKey(comedyGuards, setup.roastLevel, state.roastLevel);
  state.maxRounds = clampNumber(setup.maxRounds, 1, 7, currentMode().rounds);
  state.timeLimit = clampNumber(setup.timeLimit, 20, 90, currentMode().timeLimit);
  state.timeLeft = state.timeLimit;
}

function applyMagicMix(mixId) {
  const mix = magicMixes[mixId];
  if (!mix) return;
  syncSetupDraft();
  state.selectedMixId = mixId;
  state.selectedRecipeId = roomRecipes[mix.recipeId] ? mix.recipeId : "custom";
  applySetup(mix.setup);
  state.notice = `${mix.label} mix applied.`;
  render();
}

function markCustomRecipe() {
  state.selectedRecipeId = "custom";
  state.selectedMixId = "custom";
}

function syncPlayerName() {
  const input = document.querySelector("#playerName");
  state.playerName = cleanPlayerName(input ? input.value : state.playerName, state.playerName);
  state.players = state.players.map((player) => (
    player.id === "you" ? { ...player, name: state.playerName } : player
  ));
}

function quickLaunchRoom(recipeId) {
  syncPlayerName();
  applyRoomRecipe(recipeId);
  resetGame();
  syncPlayerName();
  state.roomCode = launchCode(recipeId);
  state.notice = `${currentRecipe()?.label || "Room"} room ready.`;
  setScreen("lobby", true);
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

function buildLiveReadiness() {
  const pulse = roomPulse();
  const mode = currentMode();
  const guide = buildGlobalRoomGuide();
  const items = [
    {
      label: "State Contract",
      value: "Ready",
      level: "ready",
      cue: "Room setup, players, rounds, prompts, submissions, votes, and verdicts already live in one state model."
    },
    {
      label: "Sync Events",
      value: "Next",
      level: "next",
      cue: "Start game, submit answer, cast vote, reveal verdict, and rematch become the first server events."
    },
    {
      label: "Safety Layer",
      value: guide.chips[1].value,
      level: state.roastLevel === "gentle" ? "ready" : "next",
      cue: `${currentComedyGuard().label} guard plus Global Room Guide defines the first moderation contract.`
    },
    {
      label: "Environment",
      value: "Static",
      level: "later",
      cue: "Keep GitHub Pages as prototype while staging and production contracts stay small."
    }
  ];
  const readyCount = items.filter((item) => item.level === "ready").length;
  const score = Math.min(100, 42 + readyCount * 18 + (pulse.score >= 72 ? 12 : 0));
  return {
    label: score >= 82 ? "Live-ready shape" : "Prototype shape",
    score,
    summary: `${mode.label} room loop has ${items.length} live handoff surfaces. Build the backend only after these stay simple.`,
    items
  };
}

function liveReadinessMarkup() {
  const readiness = buildLiveReadiness();
  return `
    <div class="live-readiness" aria-label="Live room readiness">
      <div class="live-readiness-head">
        <div>
          <span>Live Room Prep</span>
          <strong>${escapeHtml(readiness.label)}</strong>
        </div>
        <button class="button secondary" id="copyLiveBlueprint" type="button">Copy Blueprint</button>
      </div>
      <div class="live-readiness-meter" aria-hidden="true">
        <span style="width: ${readiness.score}%"></span>
      </div>
      <p>${escapeHtml(readiness.summary)}</p>
      <div class="live-readiness-grid">
        ${readiness.items.map((item) => `
          <span class="live-readiness-chip ${escapeHtml(item.level)}">
            <em>${escapeHtml(item.label)}</em>
            <strong>${escapeHtml(item.value)}</strong>
            <small>${escapeHtml(item.cue)}</small>
          </span>
        `).join("")}
      </div>
      <em id="liveBlueprintStatus" class="share-status"></em>
    </div>
  `;
}

function roomAudienceLabel() {
  if (state.roastLevel === "gentle") return "Mixed table";
  if (state.roastLevel === "bold") return "Creator room";
  return state.mode === "duel" ? "Close friends" : "Party table";
}

function roomPaceLabel() {
  if (state.timeLimit <= 40) return "Fast";
  if (state.timeLimit >= 60) return "Slow burn";
  return "Steady";
}

function buildGlobalRoomGuide() {
  const worldRoom = currentWorldRoom();
  const guard = currentComedyGuard();
  const flavor = currentPromptFlavor();
  return {
    title: `${worldRoom.label} Room Guide`,
    subtitle: worldRoom.hostLine,
    safeLine: `${guard.label} guard: ${worldRoom.safeAngle}`,
    promptLine: `${flavor.label}: ${worldRoom.promptSeed}`,
    avoidLine: worldRoom.avoid,
    chips: [
      { label: "Rhythm", value: worldRoom.label, cue: worldRoom.rhythm },
      { label: "Safe Angle", value: guard.label, cue: worldRoom.safeAngle },
      { label: "Prompt Seed", value: flavor.helper, cue: worldRoom.promptSeed }
    ]
  };
}

function buildRoomPassport() {
  const mix = currentMagicMix();
  const worldRoom = currentWorldRoom();
  const guide = buildGlobalRoomGuide();
  const flavor = currentPromptFlavor();
  const guard = currentComedyGuard();
  const vibe = currentVibe();
  const mode = currentMode();
  const pulse = roomPulse();
  const audience = roomAudienceLabel();
  const pace = roomPaceLabel();
  const readiness = pulse.score >= 88 ? "Launch ready" : pulse.score >= 72 ? "Almost ready" : "Soft launch";
  return {
    title: `${worldRoom.label} ${audience}`,
    readiness,
    headline: `${mix.label} / ${pace} ${mode.label}`,
    summary: `${worldRoom.hostLine} ${guide.safeLine}`,
    hostLine: vibe.hostCue,
    signals: [
      { label: "Audience", value: audience },
      { label: "World", value: worldRoom.label },
      { label: "Pace", value: `${state.maxRounds} x ${state.timeLimit}s` },
      { label: "Guard", value: guard.label },
      { label: "Prompts", value: flavor.label },
      { label: "Safe Angle", value: "Local-safe" },
      { label: "Pulse", value: `${pulse.score}%` }
    ]
  };
}

function buildLaunchRitual() {
  const passport = buildRoomPassport();
  const mode = currentMode();
  const guard = currentComedyGuard();
  const worldRoom = currentWorldRoom();
  const pace = roomPaceLabel();
  const heatLine = state.roastLevel === "bold"
    ? "Big swings are welcome, personal cruelty is not."
    : state.roastLevel === "balanced"
      ? "Keep it sharp, but aim at the prompt."
      : "Keep it warm enough for the whole table.";
  const firstMove = state.mode === "court"
    ? "Think like a lawyer for a ridiculous case, then land one clean verdict."
    : state.mode === "duel"
      ? "Roast the imaginary character, not the real person across the table."
      : "Find one funny image, one twist, and one clean ending.";
  return {
    label: `${pace} ${mode.label}`,
    title: `Open ${state.roomCode} calmly`,
    opening: `Welcome to ${state.roomCode}. This is a ${passport.title.toLowerCase()} with ${state.maxRounds} short rounds.`,
    steps: [
      {
        label: "Settle",
        text: `${worldRoom.hostLine} Take one breath before the first prompt.`
      },
      {
        label: "Guardrail",
        text: `${guard.label}: ${heatLine}`
      },
      {
        label: "First Move",
        text: firstMove
      }
    ]
  };
}

function buildGuestWelcome() {
  const passport = buildRoomPassport();
  const vibe = currentVibe();
  const guard = currentComedyGuard();
  const flavor = currentPromptFlavor();
  const mode = currentMode();
  const guide = buildGlobalRoomGuide();
  return {
    title: `${state.roomCode} is ${passport.readiness.toLowerCase()}`,
    subtitle: `${passport.title} / ${roomPaceLabel()} ${mode.label}`,
    note: `${vibe.hostCue} ${guide.safeLine}`,
    footer: `Avoid zone: ${guide.avoidLine}`,
    signals: [
      { label: "Room", value: guide.title, cue: guide.subtitle },
      { label: "Guard", value: guard.label, cue: guard.cue },
      { label: "Prompt", value: flavor.label, cue: guide.promptLine }
    ]
  };
}

function guestWelcomeMarkup() {
  const welcome = buildGuestWelcome();
  return `
    <div class="guest-welcome" aria-label="Guest welcome">
      <div class="guest-welcome-head">
        <div>
          <span>Guest Welcome</span>
          <strong>${escapeHtml(welcome.title)}</strong>
        </div>
        <button class="button secondary" id="copyWelcome" type="button">Copy Welcome</button>
      </div>
      <p>${escapeHtml(welcome.subtitle)}</p>
      <div class="guest-welcome-grid">
        ${welcome.signals.map((signal) => `
          <span class="guest-welcome-chip">
            <em>${escapeHtml(signal.label)}</em>
            <strong>${escapeHtml(signal.value)}</strong>
            <small>${escapeHtml(signal.cue)}</small>
          </span>
        `).join("")}
      </div>
      <small>${escapeHtml(welcome.footer)}</small>
      <em id="welcomeStatus" class="share-status"></em>
    </div>
  `;
}

function buildGuestJoinCard() {
  const guide = buildGlobalRoomGuide();
  const flavor = currentPromptFlavor();
  const mode = currentMode();
  const guard = currentComedyGuard();
  return {
    title: `Join ${state.roomCode} calmly`,
    subtitle: `${currentWorldRoom().label} room / ${roomPaceLabel()} ${mode.label} / ${guard.label} guard`,
    note: "Open the link, keep the name simple, wait for the host, then write one clean answer.",
    steps: [
      {
        label: "Room Code",
        value: state.roomCode,
        cue: "Shared link restores setup"
      },
      {
        label: "Your Name",
        value: state.playerName,
        cue: "Host can adjust seats"
      },
      {
        label: "First Move",
        value: flavor.helper,
        cue: "Read prompt, land one line"
      },
      {
        label: "Room Rule",
        value: guard.label,
        cue: guide.safeLine
      }
    ]
  };
}

function inviteUrlLabel() {
  const inviteUrl = new URL(buildInviteUrl());
  if (inviteUrl.hostname) {
    return `${inviteUrl.hostname}${inviteUrl.pathname}?room=${state.roomCode}`;
  }
  return `${state.roomCode} share link`;
}

function buildRoomShareCard() {
  const guide = buildGlobalRoomGuide();
  const guard = currentComedyGuard();
  const flavor = currentPromptFlavor();
  const mode = currentMode();
  const mix = currentMagicMix();
  return {
    title: `${state.roomCode} share link ready`,
    subtitle: `${currentWorldRoom().label} guests get setup, safety, and first-move cues before the host starts.`,
    label: inviteUrlLabel(),
    note: "Temporary static handoff today; this can become live join state when multiplayer lands.",
    chips: [
      {
        label: "Restores",
        value: mix.label,
        cue: `${mode.label} / ${state.maxRounds} rounds`
      },
      {
        label: "Guest Sees",
        value: state.roomCode,
        cue: "Code stays first"
      },
      {
        label: "Safety",
        value: guard.label,
        cue: guide.safeLine
      },
      {
        label: "First Move",
        value: flavor.label,
        cue: flavor.helper
      }
    ]
  };
}

function roomShareCardMarkup() {
  const card = buildRoomShareCard();
  return `
    <div class="room-share-card" aria-label="Room share card">
      <div class="room-share-head">
        <div>
          <span>Room Share</span>
          <strong>${escapeHtml(card.title)}</strong>
        </div>
        <button class="button secondary" id="copyRoomShare" type="button">Copy Share Card</button>
      </div>
      <p>${escapeHtml(card.subtitle)}</p>
      <div class="room-share-url">
        <span>Guest Link</span>
        <strong>${escapeHtml(card.label)}</strong>
      </div>
      <div class="room-share-grid">
        ${card.chips.map((chip) => `
          <span class="room-share-chip">
            <em>${escapeHtml(chip.label)}</em>
            <strong>${escapeHtml(chip.value)}</strong>
            <small>${escapeHtml(chip.cue)}</small>
          </span>
        `).join("")}
      </div>
      <small>${escapeHtml(card.note)}</small>
      <em id="roomShareStatus" class="share-status"></em>
    </div>
  `;
}

function guestJoinCardMarkup() {
  const card = buildGuestJoinCard();
  return `
    <div class="guest-join-card" aria-label="Guest join card">
      <div class="guest-join-head">
        <div>
          <span>Guest Join</span>
          <strong>${escapeHtml(card.title)}</strong>
        </div>
        <button class="button secondary" id="copyJoinCard" type="button">Copy Join Card</button>
      </div>
      <p>${escapeHtml(card.subtitle)}</p>
      <div class="guest-join-steps">
        ${card.steps.map((step) => `
          <span class="guest-join-step">
            <em>${escapeHtml(step.label)}</em>
            <strong>${escapeHtml(step.value)}</strong>
            <small>${escapeHtml(step.cue)}</small>
          </span>
        `).join("")}
      </div>
      <small>${escapeHtml(card.note)}</small>
      <em id="joinCardStatus" class="share-status"></em>
    </div>
  `;
}

function globalRoomGuideMarkup() {
  const guide = buildGlobalRoomGuide();
  return `
    <div class="global-room-guide" aria-label="Global room guide">
      <div class="global-guide-head">
        <div>
          <span>Global Room Guide</span>
          <strong>${escapeHtml(guide.title)}</strong>
        </div>
        <button class="button secondary" id="copyGlobalGuide" type="button">Copy Guide</button>
      </div>
      <p>${escapeHtml(guide.subtitle)}</p>
      <div class="global-guide-grid">
        ${guide.chips.map((chip) => `
          <span class="global-guide-chip">
            <em>${escapeHtml(chip.label)}</em>
            <strong>${escapeHtml(chip.value)}</strong>
            <small>${escapeHtml(chip.cue)}</small>
          </span>
        `).join("")}
      </div>
      <small>${escapeHtml(guide.avoidLine)}</small>
      <em id="globalGuideStatus" class="share-status"></em>
    </div>
  `;
}

function buildHostCommand() {
  const pulse = roomPulse();
  const readiness = buildLiveReadiness();
  const guide = buildGlobalRoomGuide();
  const mode = currentMode();
  const mix = currentMagicMix();
  const flavor = currentPromptFlavor();
  const seatsReady = state.players.length >= 3;
  const inviteReady = pulse.score >= 72;
  const liveReady = readiness.score >= 82;
  return {
    title: seatsReady ? `${pulse.label} to launch` : "Invite one more player",
    subtitle: `${roomPaceLabel()} ${mode.label} / ${mix.label} / ${guide.chips[1].value} guard`,
    primaryLabel: "Start Game",
    steps: [
      {
        label: "Seats",
        value: `${state.players.length}/8`,
        state: seatsReady ? "ready" : "next",
        cue: seatsReady ? "Enough voices" : "Add guests or bots"
      },
      {
        label: "Invite",
        value: state.roomCode,
        state: inviteReady ? "ready" : "next",
        cue: inviteReady ? "Welcome copy ready" : "Warm up the table"
      },
      {
        label: "First Prompt",
        value: flavor.helper,
        state: "ready",
        cue: activePrompt()
      },
      {
        label: "Live Shape",
        value: liveReady ? "Clean" : "Prototype",
        state: liveReady ? "ready" : "next",
        cue: readiness.label
      }
    ]
  };
}

function hostDockMarkup() {
  const command = buildHostCommand();
  return `
    <div class="host-dock" aria-label="Host command">
      <div class="host-dock-copy">
        <span>Host Command</span>
        <strong>${escapeHtml(command.title)}</strong>
        <small>${escapeHtml(command.subtitle)} / ${state.maxRounds} rounds / ${state.timeLimit}s timer</small>
        <em id="dockStatus" class="share-status"></em>
      </div>
      <div class="host-dock-actions">
        <button class="button hot" id="startGame" type="button">${escapeHtml(command.primaryLabel)}</button>
        <button class="button secondary" id="dockCopyWelcome" type="button">Copy Invite</button>
        <button class="button secondary" id="addBot" type="button">Add Bot</button>
        <button class="button ghost" id="backHome" type="button">Edit Setup</button>
      </div>
      <div class="host-command-strip">
        ${command.steps.map((step) => `
          <span class="host-command-step ${escapeHtml(step.state)}">
            <em>${escapeHtml(step.label)}</em>
            <strong>${escapeHtml(step.value)}</strong>
            <small>${escapeHtml(step.cue)}</small>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function buildPromptPreview() {
  const compass = buildRoastCompass();
  const guard = currentComedyGuard();
  const flavor = currentPromptFlavor();
  const mode = currentMode();
  return {
    title: `Round ${state.round}/${state.maxRounds} first look`,
    prompt: activePrompt(),
    starter: compass.starter,
    cue: compass.cue,
    chips: [
      { label: "Mode", value: mode.label, cue: mode.tone },
      { label: "Flavor", value: flavor.label, cue: flavor.cue },
      { label: "Guard", value: guard.label, cue: guard.cue }
    ]
  };
}

function promptPreviewMarkup() {
  const preview = buildPromptPreview();
  return `
    <div class="prompt-preview" aria-label="Prompt preview">
      <div class="prompt-preview-head">
        <div>
          <span>Prompt Preview</span>
          <strong>${escapeHtml(preview.title)}</strong>
        </div>
        <button class="button secondary" id="copyPromptPreview" type="button">Copy Prompt</button>
      </div>
      <blockquote>${escapeHtml(preview.prompt)}</blockquote>
      <p>${escapeHtml(preview.cue)}</p>
      <div class="prompt-starter">
        <span>Starter Line</span>
        <strong>${escapeHtml(preview.starter)}</strong>
      </div>
      <div class="prompt-preview-grid">
        ${preview.chips.map((chip) => `
          <span class="prompt-preview-chip">
            <em>${escapeHtml(chip.label)}</em>
            <strong>${escapeHtml(chip.value)}</strong>
            <small>${escapeHtml(chip.cue)}</small>
          </span>
        `).join("")}
      </div>
      <em id="promptPreviewStatus" class="share-status"></em>
    </div>
  `;
}

function launchKitMarkup() {
  const passport = buildRoomPassport();
  const ritual = buildLaunchRitual();
  const mix = currentMagicMix();
  const worldRoom = currentWorldRoom();
  const flavor = currentPromptFlavor();
  const guard = currentComedyGuard();
  const mode = currentMode();
  const judge = currentJudge();
  return `
    <div class="launch-kit" aria-label="Launch kit">
      <div class="launch-kit-head">
        <div>
          <span>Launch Kit</span>
          <strong>${escapeHtml(passport.title)}</strong>
        </div>
        <em>${escapeHtml(passport.readiness)}</em>
      </div>
      <p>${escapeHtml(mix.label)} / ${escapeHtml(roomPaceLabel())} ${escapeHtml(mode.label)} / ${escapeHtml(guard.label)} guard</p>
      <div class="launch-kit-grid">
        <article class="launch-kit-card passport-card">
          <span>Passport</span>
          <strong>${escapeHtml(passport.headline)}</strong>
          <small>${escapeHtml(worldRoom.label)} / ${escapeHtml(flavor.label)} / ${state.maxRounds} rounds</small>
          <button class="button secondary" id="copyPassport">Copy Passport</button>
          <em id="passportStatus" class="share-status"></em>
        </article>
        <article class="launch-kit-card ritual-card">
          <span>Ritual</span>
          <strong>${escapeHtml(ritual.title)}</strong>
          <small>${escapeHtml(ritual.opening)}</small>
          <button class="button secondary" id="copyRitual">Copy Ritual</button>
          <em id="ritualStatus" class="share-status"></em>
        </article>
        <article class="launch-kit-card invite-kit-card">
          <span>Invite</span>
          <strong>${escapeHtml(state.roomCode)} / ${escapeHtml(worldRoom.label)}</strong>
          <small>${escapeHtml(passport.summary)}</small>
          <button class="button secondary" id="copyInvite">Copy Invite</button>
          <em id="inviteStatus" class="share-status">${state.notice ? escapeHtml(state.notice) : ""}</em>
        </article>
        <article class="launch-kit-card brief-kit-card">
          <span>Host Brief</span>
          <strong>${escapeHtml(judge.name)}</strong>
          <small>${escapeHtml(ritual.steps[0].text)}</small>
          <button class="button secondary" id="copyBrief">Copy Brief</button>
          <em id="briefStatus" class="share-status"></em>
        </article>
      </div>
      <blockquote>${escapeHtml(passport.hostLine)}</blockquote>
    </div>
  `;
}

function magicMixMarkup() {
  const mix = currentMagicMix();
  return `
    <div class="magic-mix-panel" aria-label="Magic Mix room composer">
      <div class="magic-mix-head">
        <div>
          <span>Magic Mix</span>
          <strong>One-tap room tuning</strong>
        </div>
        <em>${escapeHtml(mix.cue)}</em>
      </div>
      <div class="magic-mix-grid">
        ${Object.entries(magicMixes).map(([id, item]) => `
          <button class="magic-mix-card ${state.selectedMixId === id ? "active" : ""}" type="button" data-magic-mix="${escapeHtml(id)}">
            <span>${escapeHtml(item.cue)}</span>
            <strong>${escapeHtml(item.label)}</strong>
            <small>${escapeHtml(item.promise)}</small>
          </button>
        `).join("")}
      </div>
      <div class="magic-insight">
        <span>${escapeHtml(mix.label)}</span>
        <strong>${escapeHtml(mix.promise)}</strong>
        <p>${escapeHtml(mix.insight)}</p>
      </div>
    </div>
  `;
}

function zenSetupPreviewMarkup() {
  const mix = currentMagicMix();
  const passport = buildRoomPassport();
  const mode = currentMode();
  const guard = currentComedyGuard();
  const flavor = currentPromptFlavor();
  const toggleLabel = state.showAdvancedSetup ? "Hide Tuning" : "Fine Tune";
  const toggleCue = state.showAdvancedSetup
    ? "Advanced controls are open for this room."
    : "Advanced controls are tucked away until needed.";
  return `
    <div class="zen-setup-preview" aria-label="Zen Setup room preview">
      <div class="zen-setup-head">
        <div>
          <span>Zen Setup</span>
          <strong>${escapeHtml(passport.readiness)}</strong>
        </div>
        <div class="zen-setup-actions">
          <button class="button hot setup-launch" type="submit">Create Party Room</button>
          <button class="button secondary setup-toggle" id="toggleAdvancedSetup" type="button" aria-expanded="${state.showAdvancedSetup ? "true" : "false"}">
            ${escapeHtml(toggleLabel)}
          </button>
        </div>
      </div>
      <p>${escapeHtml(mix.promise)}</p>
      <div class="zen-setup-grid">
        <span>
          <strong>${escapeHtml(passport.title)}</strong>
          <em>Room</em>
        </span>
        <span>
          <strong>${state.maxRounds} x ${state.timeLimit}s</strong>
          <em>Pace</em>
        </span>
        <span>
          <strong>${escapeHtml(guard.label)}</strong>
          <em>Guard</em>
        </span>
        <span>
          <strong>${escapeHtml(flavor.label)} / ${escapeHtml(mode.label)}</strong>
          <em>Prompts</em>
        </span>
      </div>
      <small>${escapeHtml(toggleCue)}</small>
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

function currentFlowCue() {
  const mode = currentMode();
  const recipe = currentRecipe();
  const pulse = roomPulse();
  const leader = [...state.players].sort((a, b) => b.score - a.score)[0];

  if (state.screen === "home") {
    return {
      label: "Flow Cue",
      title: "A ready room can start in one tap.",
      text: "Pick a Quick Launch room, choose a Magic Mix, or open Fine Tune only when needed.",
      metric: recipe ? recipe.label : "Custom"
    };
  }

  if (state.screen === "lobby") {
    return {
      label: "Flow Cue",
      title: `${pulse.label} room, ${state.players.length}/8 seats.`,
      text: `${currentWorldRoom().label} guide is ready. The room code is safe to share.`,
      metric: currentWorldRoom().label
    };
  }

  if (state.screen === "submit") {
    return {
      label: "Flow Cue",
      title: `Round ${state.round}/${state.maxRounds}: one clean turn.`,
      text: `${currentWorldRoom().label} room, ${currentComedyGuard().label} guard, ${pointsForWin()} points on the line.`,
      metric: `${state.timeLimit}s`
    };
  }

  if (state.screen === "vote") {
    return {
      label: "Flow Cue",
      title: `${state.submissions.length} hidden answers are ready.`,
      text: "Let the room pick the laugh that lands cleanest.",
      metric: "Vote"
    };
  }

  if (state.screen === "verdict" && state.winner) {
    const dna = buildPunchlineDna(state.winner.text);
    return {
      label: "Flow Cue",
      title: `${state.winner.playerName}'s moment is ready.`,
      text: `${dna.verdict} DNA with a clip-ready verdict line.`,
      metric: `${dna.score}%`
    };
  }

  if (state.screen === "scoreboard") {
    return {
      label: "Flow Cue",
      title: `${leader.name} leads with ${leader.score} points.`,
      text: "The recap and rematch setup are ready for the next room.",
      metric: "Done"
    };
  }

  if (state.screen === "build") {
    return {
      label: "Build Cue",
      title: "Small releases keep the product calm.",
      text: "Track only the next useful product move.",
      metric: "Temp"
    };
  }

  return {
    label: "Roadmap Cue",
    title: "Keep the path simple.",
    text: "Only bets that reduce hesitation stay on the roadmap.",
    metric: "Focus"
  };
}

function flowCueMarkup() {
  const cue = currentFlowCue();
  return `
    <section class="flow-cue" aria-label="Host flow cue">
      <span>${escapeHtml(cue.label)}</span>
      <div>
        <strong>${escapeHtml(cue.title)}</strong>
        <p>${escapeHtml(cue.text)}</p>
      </div>
      <em>${escapeHtml(cue.metric)}</em>
    </section>
  `;
}

function initials(name) {
  return name.trim().slice(0, 1).toUpperCase() || "?";
}

function randomFrom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function isArenaScreen(screen) {
  return arenaScreens.includes(screen);
}

function isProjectScreen(screen) {
  return projectScreens.includes(screen);
}

function screenFromHash() {
  const hash = window.location.hash.replace("#", "").toLowerCase();
  if (projectScreens.includes(hash)) return hash;
  if (hash === "arena") return state.lastArenaScreen;
  return null;
}

function syncScreenHash(screen) {
  const hash = isProjectScreen(screen) ? `#${screen}` : "#arena";
  if (window.location.hash === hash) return;
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
}

function setScreen(screen, syncRoute = false) {
  const nextScreen = isArenaScreen(screen) || isProjectScreen(screen) ? screen : "home";
  stopTimer();
  if (isArenaScreen(nextScreen)) state.lastArenaScreen = nextScreen;
  state.screen = nextScreen;
  render();
  window.scrollTo(0, 0);
  if (syncRoute) syncScreenHash(nextScreen);
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

  if (params.has("mix")) {
    state.selectedMixId = magicMixes[params.get("mix")] ? params.get("mix") : "custom";
  } else if (!roomRecipes[recipeId]) {
    state.selectedMixId = "custom";
  }

  state.roomCode = cleanRoomCode(params.get("room"));
  state.playerName = cleanPlayerName(params.get("name"), state.playerName);
  state.roomVibe = validKey(roomVibes, params.get("vibe"), state.roomVibe);
  state.worldRoom = validKey(worldRooms, params.get("world"), state.worldRoom);
  const hasModeParam = params.has("mode");
  state.mode = validKey(gameModes, params.get("mode"), state.mode);
  state.promptFlavor = validKey(promptFlavors, params.get("flavor"), state.promptFlavor);
  state.roastLevel = validKey(comedyGuards, params.get("guard"), state.roastLevel);
  state.selectedJudgeId = validJudgeId(params.get("judge"), state.selectedJudgeId);
  if (hasModeParam && !params.has("rounds")) state.maxRounds = currentMode().rounds;
  if (hasModeParam && !params.has("timer")) state.timeLimit = currentMode().timeLimit;
  if (params.has("rounds")) state.maxRounds = clampNumber(params.get("rounds"), 1, 7, currentMode().rounds);
  if (params.has("timer")) state.timeLimit = clampNumber(params.get("timer"), 20, 90, currentMode().timeLimit);
  state.timeLeft = state.timeLimit;
  state.players = state.players.map((player) => (
    player.id === "you" ? { ...player, name: state.playerName, score: 0 } : { ...player, score: 0 }
  ));
  state.screen = "lobby";
  state.lastArenaScreen = "lobby";
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
    if (state.timeLeft === 0) submitAnswer("auto");
  }, 1000);
}

function productNavMarkup() {
  const activeTab = isProjectScreen(state.screen) ? state.screen : "arena";
  const tabs = [
    { id: "arena", label: "Arena", screen: state.lastArenaScreen, href: "#arena" },
    { id: "build", label: "Build", screen: "build", href: "#build", badge: "Temp" },
    { id: "roadmap", label: "Roadmap", screen: "roadmap", href: "#roadmap" }
  ];

  return `
    <nav class="product-tabs" aria-label="Project pages">
      ${tabs.map((tab) => `
        <a class="product-tab ${activeTab === tab.id ? "active" : ""}" href="${tab.href}" data-go-screen="${escapeHtml(tab.screen)}" ${activeTab === tab.id ? "aria-current=\"page\"" : ""}>
          <span>${escapeHtml(tab.label)}</span>
          ${tab.badge ? `<strong>${escapeHtml(tab.badge)}</strong>` : ""}
        </a>
      `).join("")}
    </nav>
  `;
}

function gameStepsMarkup() {
  return `
    <nav class="steps" aria-label="Game flow">
      ${arenaScreens.map((step) => `
        <span class="step ${state.screen === step ? "active" : ""}">${step}</span>
      `).join("")}
    </nav>
  `;
}

function headerMarkup() {
  const judge = currentJudge();
  const vibe = currentVibe();
  const showArenaContext = !isProjectScreen(state.screen);
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
    ${productNavMarkup()}
    ${flowCueMarkup()}
    ${showArenaContext ? gameStepsMarkup() : ""}
    ${showArenaContext && state.screen !== "home" ? roomSummaryMarkup() : ""}
    ${showArenaContext && state.screen !== "home" ? `
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

function topScoreRows() {
  return [...state.players].sort((a, b) => b.score - a.score);
}

function bestHistoryMoment() {
  if (!state.history.length) return null;
  return state.history.reduce((best, item) => {
    const dna = buildPunchlineDna(item.answer);
    if (!best || dna.score > best.dna.score) {
      return { ...item, dna };
    }
    return best;
  }, null);
}

function buildFinalCommand(leader = topScoreRows()[0]) {
  const sorted = topScoreRows();
  const runner = sorted[1];
  const gap = scoreGap();
  const average = averageDnaScore();
  const best = bestHistoryMoment();
  const plan = buildEncorePlan();
  const marginText = runner
    ? gap > 0 ? `${gap} over ${runner.name}` : `Tied with ${runner.name}`
    : `${leader.score} solo points`;
  return {
    title: `${leader.name}'s champion card`,
    subtitle: `${leader.score} pts / ${currentMode().label} / ${average ? `${average}% room DNA` : "fresh room"}`,
    copyLabel: "Copy Final Card",
    chips: [
      {
        label: "Champion",
        value: leader.name,
        cue: `${leader.score} points`
      },
      {
        label: "Margin",
        value: marginText,
        cue: gap ? "Clear win signal" : "Shared-table finish"
      },
      {
        label: "Best Moment",
        value: best ? `Round ${best.round}` : "Room warmup",
        cue: best ? `${best.dna.score}% DNA by ${best.playerName}` : "No round history yet"
      },
      {
        label: "Replay",
        value: plan.label,
        cue: `${plan.setup.maxRounds} rounds / ${plan.setup.timeLimit}s`
      }
    ]
  };
}

function finalCommandMarkup(leader) {
  const command = buildFinalCommand(leader);
  return `
    <div class="final-command" aria-label="Final command">
      <div class="final-command-head">
        <div>
          <span>Final Command</span>
          <strong>${escapeHtml(command.title)}</strong>
          <p>${escapeHtml(command.subtitle)}</p>
        </div>
        <button class="button secondary" id="copyFinalCard" type="button">${escapeHtml(command.copyLabel)}</button>
      </div>
      <div class="final-command-grid">
        ${command.chips.map((chip) => `
          <span class="final-command-chip">
            <em>${escapeHtml(chip.label)}</em>
            <strong>${escapeHtml(chip.value)}</strong>
            <small>${escapeHtml(chip.cue)}</small>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function buildRecapText() {
  const sorted = topScoreRows();
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

function buildFinalCardText() {
  const sorted = topScoreRows();
  const leader = sorted[0];
  const runner = sorted[1];
  const gap = scoreGap();
  const average = averageDnaScore();
  const best = bestHistoryMoment();
  const plan = buildEncorePlan();
  const scoreLines = sorted.map((player, index) => `${index + 1}. ${player.name} - ${player.score} pts`);
  return [
    `Roast Arena final card - ${state.roomCode}`,
    `Champion: ${leader.name} (${leader.score} pts)`,
    runner ? `Margin: ${gap > 0 ? `${gap} over ${runner.name}` : `Tied with ${runner.name}`}` : `Margin: ${leader.score} solo points`,
    `Room: ${currentWorldRoom().label} / ${currentComedyGuard().label} guard / ${currentVibe().label} vibe`,
    `Mode: ${currentMode().label}`,
    average ? `Room DNA: ${average}% average` : "Room DNA: fresh room",
    best ? `Best moment: R${best.round} by ${best.playerName} - ${best.dna.score}% DNA (${best.dna.verdict})` : "Best moment: no round history yet",
    best ? `Best line: "${best.answer}"` : "",
    `Replay command: ${plan.label} (${gameModes[plan.setup.mode].label}, ${plan.setup.maxRounds} rounds, ${plan.setup.timeLimit}s)`,
    `Replay link: ${buildInviteUrl()}`,
    "",
    "Final score:",
    ...scoreLines
  ].filter(Boolean).join("\n");
}

function buildMomentClipText() {
  const winner = state.winner;
  if (!winner) return "";
  const dna = buildPunchlineDna(winner.text);
  return [
    `Roast Arena moment - ${state.roomCode}`,
    `Round: ${state.round}/${state.maxRounds}`,
    `Prompt: ${activePrompt()}`,
    `Winner: ${winner.playerName}`,
    `Answer: "${winner.text}"`,
    `Judge: ${state.verdict}`,
    `Punchline DNA: ${dna.score}% (${dna.verdict})`,
    `Host cue: ${dna.hostCue}`,
    "",
    "Keep it funny, not cruel."
  ].join("\n");
}

function buildVerdictCardText() {
  const winner = state.winner;
  if (!winner) return "";
  const dna = buildPunchlineDna(winner.text);
  const nextAction = state.round >= state.maxRounds ? "Final Scoreboard" : "Next Round";
  return [
    `Roast Arena verdict card - ${state.roomCode}`,
    `Winner: ${winner.playerName} (+${pointsForWin()} pts)`,
    `Prompt: ${activePrompt()}`,
    `Answer: "${winner.text}"`,
    `Judge line: ${state.verdict}`,
    `Punchline DNA: ${dna.score}% (${dna.verdict})`,
    `Room: ${currentWorldRoom().label} / ${currentComedyGuard().label} guard`,
    `Next move: ${nextAction}`,
    `Replay link: ${buildInviteUrl()}`,
    "",
    "Replay the room. Keep it funny, not cruel."
  ].join("\n");
}

function creatorCaptionLine(winner, dna = buildPunchlineDna(winner.text)) {
  return `Round ${state.round}: ${winner.playerName} won a ${dna.verdict.toLowerCase()} with "${winner.text}"`;
}

function buildCreatorShareKitText() {
  const winner = state.winner;
  if (!winner) return "";
  const dna = buildPunchlineDna(winner.text);
  return [
    `Roast Arena creator share kit - ${state.roomCode}`,
    `Caption: ${creatorCaptionLine(winner, dna)}`,
    `Clip title: R${state.round} - ${winner.playerName} / ${dna.verdict}`,
    `Prompt: ${activePrompt()}`,
    `Judge line: ${state.verdict}`,
    `Replay invite: ${buildInviteUrl()}`,
    `Room: ${currentWorldRoom().label} / ${currentComedyGuard().label} guard / ${currentVibe().label} vibe`,
    `Punchline DNA: ${dna.score}% (${dna.verdict})`,
    "",
    "Bring one line. Keep it funny, not cruel."
  ].join("\n");
}

function buildInviteUrl() {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("room", state.roomCode);
  url.searchParams.set("recipe", state.selectedRecipeId);
  url.searchParams.set("mix", state.selectedMixId);
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
  const mix = currentMagicMix();
  const passport = buildRoomPassport();
  const ritual = buildLaunchRitual();
  const welcome = buildGuestWelcome();
  const inviteUrl = buildInviteUrl();
  const flavor = currentPromptFlavor();
  const pulse = roomPulse();
  return [
    "Roast Arena invite",
    `Room: ${state.roomCode}`,
    `Link: ${inviteUrl}`,
    `Magic mix: ${mix.label}`,
    `Room passport: ${passport.title} (${passport.readiness})`,
    `Launch ritual: ${ritual.label}`,
    `Guest welcome: ${welcome.subtitle}`,
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

function buildGuestWelcomeText() {
  const welcome = buildGuestWelcome();
  return [
    `Welcome to Roast Arena - ${state.roomCode}`,
    welcome.subtitle,
    "",
    welcome.note,
    "",
    ...welcome.signals.map((signal) => `${signal.label}: ${signal.value} - ${signal.cue}`),
    "",
    welcome.footer
  ].join("\n");
}

function buildGuestJoinCardText() {
  const card = buildGuestJoinCard();
  const inviteUrl = buildInviteUrl();
  return [
    `Roast Arena guest join card - ${state.roomCode}`,
    `Link: ${inviteUrl}`,
    card.subtitle,
    "",
    card.note,
    "",
    ...card.steps.map((step) => `${step.label}: ${step.value} - ${step.cue}`),
    "",
    "Bring one clever answer. Keep it funny, not cruel."
  ].join("\n");
}

function buildRoomShareCardText() {
  const card = buildRoomShareCard();
  const inviteUrl = buildInviteUrl();
  return [
    `Roast Arena room share card - ${state.roomCode}`,
    `Link: ${inviteUrl}`,
    card.subtitle,
    "",
    ...card.chips.map((chip) => `${chip.label}: ${chip.value} - ${chip.cue}`),
    "",
    card.note,
    "",
    "Open the link, read the room rule, and bring one clean answer."
  ].join("\n");
}

function buildPromptPreviewText() {
  const preview = buildPromptPreview();
  return [
    `Roast Arena Prompt Preview - ${state.roomCode}`,
    preview.title,
    "",
    `Prompt: ${preview.prompt}`,
    `Starter: ${preview.starter}`,
    "",
    ...preview.chips.map((chip) => `${chip.label}: ${chip.value} - ${chip.cue}`)
  ].join("\n");
}

function buildGlobalRoomGuideText() {
  const guide = buildGlobalRoomGuide();
  return [
    `Global Room Guide - ${state.roomCode}`,
    guide.title,
    guide.subtitle,
    "",
    ...guide.chips.map((chip) => `${chip.label}: ${chip.value} - ${chip.cue}`),
    "",
    `Avoid zone: ${guide.avoidLine}`,
    "Make the joke travel: clear image, kind target, crisp ending."
  ].join("\n");
}

function buildLiveBlueprintText() {
  const readiness = buildLiveReadiness();
  return [
    `Live Room Blueprint - ${state.roomCode}`,
    `Status: ${readiness.label} / ${readiness.score}%`,
    readiness.summary,
    "",
    "Handoff surfaces:",
    ...readiness.items.map((item) => `${item.label}: ${item.value} - ${item.cue}`),
    "",
    "First backend events:",
    "1. room:start",
    "2. answer:submit",
    "3. vote:cast",
    "4. verdict:reveal",
    "5. room:rematch",
    "",
    "Keep the first live version calm: one room, one host, one shared state, one moderation path."
  ].join("\n");
}

function buildEncorePlanText() {
  const plan = buildEncorePlan();
  const setup = plan.setup;
  return [
    `Roast Arena rematch plan - ${state.roomCode}`,
    `Plan: ${plan.label}`,
    `Why: ${plan.cue}`,
    "",
    "Next room:",
    `Mode: ${gameModes[setup.mode].label}`,
    `Vibe: ${roomVibes[setup.roomVibe].label}`,
    `World room: ${worldRooms[setup.worldRoom].label}`,
    `Prompt flavor: ${promptFlavors[setup.promptFlavor].label}`,
    `Comedy guard: ${comedyGuards[setup.roastLevel].label}`,
    `Rounds: ${setup.maxRounds} x ${setup.timeLimit}s`,
    "",
    "Host move: apply rematch, keep players seated, start the room."
  ].join("\n");
}

function buildLaunchRitualText() {
  const ritual = buildLaunchRitual();
  return [
    `Calm Launch Ritual - ${state.roomCode}`,
    ritual.opening,
    "",
    ...ritual.steps.map((step, index) => `${index + 1}. ${step.label}: ${step.text}`),
    "",
    "Start the game when everyone has one clean idea."
  ].join("\n");
}

function buildRoomPassportText() {
  const passport = buildRoomPassport();
  const guide = buildGlobalRoomGuide();
  return [
    `Room Passport - ${state.roomCode}`,
    `${passport.title}`,
    `${passport.headline}`,
    `Readiness: ${passport.readiness}`,
    "",
    ...passport.signals.map((signal) => `${signal.label}: ${signal.value}`),
    "",
    `Host line: ${passport.hostLine}`,
    `Room note: ${passport.summary}`,
    `Global guide: ${guide.safeLine}`,
    `Avoid zone: ${guide.avoidLine}`,
    "",
    "Keep it funny, global, and kind."
  ].join("\n");
}

function buildHostBrief() {
  const recipe = currentRecipe();
  const mix = currentMagicMix();
  const passport = buildRoomPassport();
  const ritual = buildLaunchRitual();
  const mode = currentMode();
  const vibe = currentVibe();
  const worldRoom = currentWorldRoom();
  const guide = buildGlobalRoomGuide();
  const readiness = buildLiveReadiness();
  const flavor = currentPromptFlavor();
  const guard = currentComedyGuard();
  const judge = currentJudge();
  return [
    `Host Brief - ${state.roomCode}`,
    `Welcome to Roast Arena room ${state.roomCode}.`,
    `Magic mix: ${mix.label}. ${mix.promise}`,
    `Room passport: ${passport.title}. ${passport.readiness}.`,
    `Launch ritual: ${ritual.opening}`,
    `Room style: ${recipe ? recipe.label : "Custom"} recipe, ${worldRoom.label} table, ${flavor.label} prompts.`,
    `Global room guide: ${guide.safeLine}`,
    `Avoid zone: ${guide.avoidLine}`,
    `Live room prep: ${readiness.label}. ${readiness.summary}`,
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

function buildRoundStartCue() {
  const compass = buildRoastCompass();
  const mode = currentMode();
  const guard = currentComedyGuard();
  const worldRoom = currentWorldRoom();
  const flavor = currentPromptFlavor();
  return {
    title: `Round ${state.round}: one clean first swing`,
    subtitle: `${state.playerName}, start with a vivid image, then add one turn.`,
    starter: compass.starter,
    chips: [
      {
        label: "Read",
        value: flavor.helper,
        cue: "Find the funny object in the prompt"
      },
      {
        label: "Aim",
        value: worldRoom.label,
        cue: worldRoom.safeAngle
      },
      {
        label: "Turn",
        value: mode.label,
        cue: mode.tone
      },
      {
        label: "Land",
        value: guard.label,
        cue: guard.cue
      }
    ]
  };
}

function roundStartCueMarkup() {
  const cue = buildRoundStartCue();
  return `
    <div class="round-start-cue" aria-label="Round start cue">
      <div class="round-start-head">
        <div>
          <span>Round Start</span>
          <strong>${escapeHtml(cue.title)}</strong>
          <p>${escapeHtml(cue.subtitle)}</p>
        </div>
        <button class="button secondary" id="roundStartStarter" type="button">Use Starter</button>
      </div>
      <div class="round-start-starter">
        <em>Starter</em>
        <strong>${escapeHtml(cue.starter)}</strong>
      </div>
      <div class="round-start-steps">
        ${cue.chips.map((chip) => `
          <span class="round-start-step">
            <em>${escapeHtml(chip.label)}</em>
            <strong>${escapeHtml(chip.value)}</strong>
            <small>${escapeHtml(chip.cue)}</small>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function firstTurnAssistMarkup() {
  const compass = buildRoastCompass();
  const starterSignal = buildLaughSignal(compass.starter);
  const spark = currentBotAnswers()[state.promptIndex % currentBotAnswers().length];
  return `
    <div class="turn-assist" aria-label="First turn assist">
      <div class="assist-head">
        <div>
          <span>Answer Assist</span>
          <strong>${escapeHtml(compass.label)}</strong>
          <p>${escapeHtml(compass.cue)}</p>
        </div>
        <em>${starterSignal.score}% starter</em>
      </div>
      <div class="assist-starter">
        <div>
          <span>Starter Line</span>
          <strong>${escapeHtml(compass.starter)}</strong>
        </div>
        <button class="button ghost" id="compassStarter" type="button">Use</button>
      </div>
      <div class="assist-cues">
        ${compass.chips.map((chip) => `
          <span class="assist-cue">
            <em>${escapeHtml(chip.label)}</em>
            <strong>${escapeHtml(chip.value)}</strong>
            <small>${escapeHtml(chip.cue)}</small>
          </span>
        `).join("")}
      </div>
      <div class="spark-row">
        <div>
          <span>Spark Option</span>
          <small>${escapeHtml(spark)}</small>
        </div>
        <button class="button secondary" id="chaosAnswer" type="button">Use Spark</button>
      </div>
    </div>
  `;
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

function buildVerdictCommand(winner) {
  const dna = buildPunchlineDna(winner.text);
  const judge = currentJudge();
  const nextAction = state.round >= state.maxRounds ? "Final Scoreboard" : "Next Round";
  return {
    title: `${winner.playerName}'s replay card`,
    subtitle: `${dna.verdict} / ${dna.score}% DNA / ${pointsForWin()} pts`,
    nextAction,
    chips: [
      {
        label: "Winner",
        value: winner.playerName,
        cue: `+${pointsForWin()} pts banked`
      },
      {
        label: "Judge Line",
        value: judge.name,
        cue: "Verdict is ready to share"
      },
      {
        label: "Clip Hook",
        value: dna.verdict,
        cue: "Clean replay moment"
      },
      {
        label: "Next Move",
        value: nextAction,
        cue: "Keep the room moving"
      }
    ]
  };
}

function verdictCommandMarkup(winner) {
  const command = buildVerdictCommand(winner);
  return `
    <div class="verdict-command" aria-label="Verdict command">
      <div class="verdict-command-head">
        <div>
          <span>Verdict Command</span>
          <strong>${escapeHtml(command.title)}</strong>
          <p>${escapeHtml(command.subtitle)}</p>
        </div>
        <button class="button secondary" id="copyVerdictCard" type="button">Copy Card</button>
      </div>
      <div class="verdict-command-grid">
        ${command.chips.map((chip) => `
          <span class="verdict-command-chip">
            <em>${escapeHtml(chip.label)}</em>
            <strong>${escapeHtml(chip.value)}</strong>
            <small>${escapeHtml(chip.cue)}</small>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function buildVoteGuide() {
  const guard = currentComedyGuard();
  const mode = currentMode();
  const judge = currentJudge();
  return {
    title: `${state.submissions.length} anonymous answers`,
    subtitle: "Pick the line with the clearest image, cleanest turn, and safest landing.",
    chips: [
      {
        label: "Blind",
        value: "No names",
        cue: "Vote for the joke, not the player"
      },
      {
        label: "Reward",
        value: `${pointsForWin()} pts`,
        cue: `${mode.label} scoring`
      },
      {
        label: "Guard",
        value: guard.label,
        cue: guard.cue
      },
      {
        label: "Judge",
        value: judge.name,
        cue: "Verdict lands after the tap"
      }
    ]
  };
}

function voteGuideMarkup() {
  const guide = buildVoteGuide();
  return `
    <div class="vote-guide" aria-label="Vote guide">
      <div class="vote-guide-head">
        <div>
          <span>Vote Guide</span>
          <strong>${escapeHtml(guide.title)}</strong>
          <p>${escapeHtml(guide.subtitle)}</p>
        </div>
        <em>${pointsForWin()} pts</em>
      </div>
      <div class="vote-guide-grid">
        ${guide.chips.map((chip) => `
          <span class="vote-guide-chip">
            <em>${escapeHtml(chip.label)}</em>
            <strong>${escapeHtml(chip.value)}</strong>
            <small>${escapeHtml(chip.cue)}</small>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function submissionVoteMarkup(entry, index) {
  const signal = buildLaughSignal(entry.text);
  return `
    <button class="submission" data-vote="${index}" type="button">
      <span class="submission-head">
        <span>Answer ${index + 1}</span>
        <strong>${escapeHtml(signal.label)} / ${signal.score}%</strong>
      </span>
      <p>${escapeHtml(entry.text)}</p>
      <small>${escapeHtml(signal.cue)}</small>
    </button>
  `;
}

function momentClipMarkup(winner) {
  const dna = buildPunchlineDna(winner.text);
  return `
    <div class="moment-clip" aria-label="Moment clip">
      <div class="moment-head">
        <span>Moment Clip</span>
        <strong>Round ${state.round} / ${escapeHtml(dna.verdict)}</strong>
      </div>
      <p>${escapeHtml(activePrompt())}</p>
      <blockquote>${escapeHtml(winner.text)}</blockquote>
      <small>DNA ${dna.score}% / ${escapeHtml(currentWorldRoom().label)} room / ${escapeHtml(currentComedyGuard().label)} guard</small>
    </div>
  `;
}

function creatorShareKitMarkup(winner) {
  const dna = buildPunchlineDna(winner.text);
  return `
    <div class="creator-share-kit" aria-label="Creator share kit">
      <div class="share-kit-head">
        <div>
          <span>Creator Share Kit</span>
          <strong>Caption, clip, replay</strong>
        </div>
        <button class="button secondary" id="copyCreatorKit" type="button">Copy Kit</button>
      </div>
      <p>${escapeHtml(creatorCaptionLine(winner, dna))}</p>
      <div class="share-kit-assets">
        <span>
          <em>Clip Title</em>
          <strong>R${state.round} - ${escapeHtml(winner.playerName)}</strong>
          <small>${escapeHtml(dna.verdict)} / ${dna.score}% DNA</small>
        </span>
        <span>
          <em>Caption Hook</em>
          <strong>${escapeHtml(currentWorldRoom().label)} room</strong>
          <small>${escapeHtml(currentComedyGuard().label)} guard keeps it share-safe.</small>
        </span>
        <span>
          <em>Replay Invite</em>
          <strong>${escapeHtml(state.roomCode)}</strong>
          <small>Reusable room link included in the copied kit.</small>
        </span>
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
  const leader = [...state.players].sort((a, b) => b.score - a.score)[0];
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
      {
        label: "Signal",
        value: average ? `${average}% DNA` : "Fresh room",
        cue: gap ? `${gap} point gap` : "Even table"
      },
      {
        label: "Keep Seats",
        value: `${state.players.length} players`,
        cue: `${state.roomCode} stays open`
      },
      {
        label: "Next Setup",
        value: gameModes[plan.setup.mode].label,
        cue: `${plan.setup.maxRounds} rounds / ${plan.setup.timeLimit}s`
      },
      {
        label: "Reset Tone",
        value: comedyGuards[plan.setup.roastLevel].label,
        cue: `${leader.name}'s win becomes warmup`
      }
    ]
  };
}

function encorePlanMarkup() {
  const plan = buildEncorePlan();
  return `
    <div class="encore-plan" aria-label="Encore plan">
      <div class="encore-head">
        <div>
          <span>Rematch Command</span>
          <strong>${escapeHtml(plan.label)}</strong>
        </div>
        <div class="encore-actions">
          <button class="button hot" id="applyEncore" type="button">Apply Rematch</button>
          <button class="button secondary" id="copyEncorePlan" type="button">Copy Plan</button>
        </div>
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

function setWelcomeStatus(message) {
  const status = document.querySelector("#welcomeStatus");
  if (status) status.textContent = message;
  const dockStatus = document.querySelector("#dockStatus");
  if (dockStatus) dockStatus.textContent = message;
}

function setJoinCardStatus(message) {
  const status = document.querySelector("#joinCardStatus");
  if (status) status.textContent = message;
  const inviteStatus = document.querySelector("#inviteStatus");
  if (inviteStatus) inviteStatus.textContent = message;
}

function setRoomShareStatus(message) {
  state.notice = message;
  const status = document.querySelector("#roomShareStatus");
  if (status) status.textContent = message;
  const inviteStatus = document.querySelector("#inviteStatus");
  if (inviteStatus) inviteStatus.textContent = message;
}

function setPromptPreviewStatus(message) {
  const status = document.querySelector("#promptPreviewStatus");
  if (status) status.textContent = message;
}

function setGlobalGuideStatus(message) {
  const status = document.querySelector("#globalGuideStatus");
  if (status) status.textContent = message;
}

function setLiveBlueprintStatus(message) {
  const status = document.querySelector("#liveBlueprintStatus");
  if (status) status.textContent = message;
}

function setBriefStatus(message) {
  const status = document.querySelector("#briefStatus");
  if (status) status.textContent = message;
}

function setPassportStatus(message) {
  const status = document.querySelector("#passportStatus");
  if (status) status.textContent = message;
}

function setRitualStatus(message) {
  const status = document.querySelector("#ritualStatus");
  if (status) status.textContent = message;
}

function setMomentStatus(message) {
  state.notice = message;
  const status = document.querySelector("#momentStatus");
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

function copyFinalCard() {
  const text = buildFinalCardText();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setShareStatus("Final card copied."))
      .catch(() => fallbackCopy(text, setShareStatus));
    return;
  }
  fallbackCopy(text, setShareStatus);
}

function copyMomentClip() {
  const text = buildMomentClipText();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setMomentStatus("Moment clip copied."))
      .catch(() => fallbackCopy(text, setMomentStatus));
    return;
  }
  fallbackCopy(text, setMomentStatus);
}

function copyVerdictCard() {
  const text = buildVerdictCardText();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setMomentStatus("Verdict card copied."))
      .catch(() => fallbackCopy(text, setMomentStatus));
    return;
  }
  fallbackCopy(text, setMomentStatus);
}

function copyCreatorShareKit() {
  const text = buildCreatorShareKitText();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setMomentStatus("Creator share kit copied."))
      .catch(() => fallbackCopy(text, setMomentStatus));
    return;
  }
  fallbackCopy(text, setMomentStatus);
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

function copyGuestWelcome() {
  const text = buildGuestWelcomeText();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setWelcomeStatus("Guest welcome copied."))
      .catch(() => fallbackCopy(text, setWelcomeStatus));
    return;
  }
  fallbackCopy(text, setWelcomeStatus);
}

function copyGuestJoinCard() {
  const text = buildGuestJoinCardText();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setJoinCardStatus("Guest join card copied."))
      .catch(() => fallbackCopy(text, setJoinCardStatus));
    return;
  }
  fallbackCopy(text, setJoinCardStatus);
}

function copyRoomShareCard() {
  const text = buildRoomShareCardText();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setRoomShareStatus("Room share card copied."))
      .catch(() => fallbackCopy(text, setRoomShareStatus));
    return;
  }
  fallbackCopy(text, setRoomShareStatus);
}

function copyPromptPreview() {
  const text = buildPromptPreviewText();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setPromptPreviewStatus("Prompt preview copied."))
      .catch(() => fallbackCopy(text, setPromptPreviewStatus));
    return;
  }
  fallbackCopy(text, setPromptPreviewStatus);
}

function copyGlobalRoomGuide() {
  const text = buildGlobalRoomGuideText();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setGlobalGuideStatus("Global room guide copied."))
      .catch(() => fallbackCopy(text, setGlobalGuideStatus));
    return;
  }
  fallbackCopy(text, setGlobalGuideStatus);
}

function copyLiveBlueprint() {
  const text = buildLiveBlueprintText();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setLiveBlueprintStatus("Live room blueprint copied."))
      .catch(() => fallbackCopy(text, setLiveBlueprintStatus));
    return;
  }
  fallbackCopy(text, setLiveBlueprintStatus);
}

function copyEncorePlan() {
  const text = buildEncorePlanText();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setShareStatus("Rematch plan copied."))
      .catch(() => fallbackCopy(text, setShareStatus));
    return;
  }
  fallbackCopy(text, setShareStatus);
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

function copyRoomPassport() {
  const text = buildRoomPassportText();
  const fallbackPassportCopy = () => {
    const copied = fallbackCopy(text, setPassportStatus);
    if (!copied) setPassportStatus("Copy is blocked here. Passport text is ready.");
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setPassportStatus("Room passport copied."))
      .catch(fallbackPassportCopy);
    return;
  }
  fallbackPassportCopy();
}

function copyLaunchRitual() {
  const text = buildLaunchRitualText();
  const fallbackRitualCopy = () => {
    const copied = fallbackCopy(text, setRitualStatus);
    if (!copied) setRitualStatus("Copy is blocked here. Ritual text is ready.");
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => setRitualStatus("Launch ritual copied."))
      .catch(fallbackRitualCopy);
    return;
  }
  fallbackRitualCopy();
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
        <div class="quick-launch-panel" aria-label="Quick launch rooms">
          <div class="quick-launch-head">
            <span>Quick Launch</span>
            <strong>Ready rooms</strong>
          </div>
          <div class="quick-launch-grid">
            ${quickLaunches.map((item) => `
              <button class="quick-launch-card" type="button" data-quick-launch="${escapeHtml(item.recipeId)}">
                <span>${escapeHtml(item.cue)}</span>
                <strong>${escapeHtml(item.label)}</strong>
                <small>${escapeHtml(item.meta)}</small>
              </button>
            `).join("")}
          </div>
        </div>
      </div>

      <form class="setup-card ${state.showAdvancedSetup ? "advanced-open" : "zen-compact"}" id="setupForm">
        ${magicMixMarkup()}
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
        ${zenSetupPreviewMarkup()}
        ${state.showAdvancedSetup ? `
          <div class="advanced-setup" id="advancedSetup">
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
          </div>
        ` : ""}
        ${state.showAdvancedSetup ? `<button class="button hot full" type="submit">Create Party Room</button>` : ""}
      </form>
    </section>
  `);
}

function renderLobby() {
  const mode = currentMode();
  const worldRoom = currentWorldRoom();
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
          ${hostDockMarkup()}
          ${roomShareCardMarkup()}
          ${guestJoinCardMarkup()}
          ${liveReadinessMarkup()}
          ${globalRoomGuideMarkup()}
          ${promptPreviewMarkup()}
          ${guestWelcomeMarkup()}
          ${roomPulseMarkup()}
          ${launchKitMarkup()}
          <p class="mode-note">${escapeHtml(mode.label)} mode: ${escapeHtml(mode.tone)}</p>
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
          <div class="progress-track"><span class="progress-fill" id="timerFill" style="width: ${Math.max(0, (state.timeLeft / state.timeLimit) * 100)}%"></span></div>
          ${roundStartCueMarkup()}
          <div class="answer-flow">
            ${firstTurnAssistMarkup()}
            <div class="answer-compose">
              <div class="compose-head">
                <div>
                  <p class="kicker">Your answer</p>
                  <h3>Write once. Submit clean.</h3>
                </div>
                <span>${pointsForWin()} pts</span>
              </div>
              <textarea id="answerInput" class="answer-input" maxlength="160" placeholder="${escapeHtml(guard.placeholder)}"></textarea>
              <div class="input-meta">
                <span id="charCount">0/160</span>
                <span>Anonymous until vote</span>
              </div>
              ${laughSignalMarkup()}
              <p class="form-error" id="answerError">${state.notice ? escapeHtml(state.notice) : ""}</p>
              <div class="controls answer-actions">
                <button class="button hot" id="submitAnswer">Submit Answer</button>
                <button class="button secondary" id="toggleFocus">${state.focusMode ? "Show Scoreboard" : "Calm Focus"}</button>
                <button class="button ghost" id="skipToVote">Finish Round</button>
              </div>
            </div>
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
          ${voteGuideMarkup()}
          <div class="submissions">
            ${state.submissions.map(submissionVoteMarkup).join("")}
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
          ${verdictCommandMarkup(winner)}
          ${punchlineDnaMarkup(winner.text)}
          ${momentClipMarkup(winner)}
          ${creatorShareKitMarkup(winner)}
          <p class="mode-note">${escapeHtml(winner.playerName)} banked ${pointsForWin()} points for this verdict.</p>
          <div class="controls">
            <button class="button hot" id="continueGame">${state.round >= state.maxRounds ? "Final Scoreboard" : "Next Round"}</button>
            <button class="button secondary" id="copyMoment">Copy Moment</button>
            <button class="button ghost" id="playAgain">Restart</button>
          </div>
          <p class="share-status" id="momentStatus">${state.notice ? escapeHtml(state.notice) : ""}</p>
        </div>
      </section>
    </section>
  `);
}

function renderScoreboardScreen() {
  const leader = topScoreRows()[0];
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
          ${finalCommandMarkup(leader)}
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

function renderBuild() {
  return shellMarkup(`
    <section class="build-layout">
      <div class="build-hero project-hero">
        <div>
          <p class="kicker">Temporary Build Page</p>
          <h2 class="project-title">Release cockpit.</h2>
          <p class="hero-copy">Current release, next bet, and product principles in one compact work surface.</p>
        </div>
        <div class="project-hero-side">
          <div class="temp-note">
            <span>Temporary</span>
            <p>Delete Build and Roadmap before public launch if they stop reducing product uncertainty.</p>
          </div>
          <div class="controls">
            <a class="button hot" href="#roadmap" data-go-screen="roadmap">Open Roadmap</a>
            <a class="button ghost" href="#arena" data-go-screen="${escapeHtml(state.lastArenaScreen)}">Back to Arena</a>
          </div>
        </div>
      </div>

      <div class="build-status-grid">
        ${buildSignals.map((item) => `
          <article class="build-card">
            <span>${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.value)}</strong>
            <p>${escapeHtml(item.note)}</p>
          </article>
        `).join("")}
      </div>

      <section class="build-card build-lane-card" aria-label="Build lane">
        <div class="build-section-head">
          <div>
            <p class="kicker">Release Lane</p>
            <h2>What is moving now</h2>
          </div>
          <a class="text-link" href="#roadmap" data-go-screen="roadmap">View roadmap</a>
        </div>
        <div class="build-lanes">
          ${buildLanes.map((item) => `
            <div class="build-lane">
              <span>${escapeHtml(item.status)}</span>
              <strong>${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.note)}</p>
            </div>
          `).join("")}
        </div>
      </section>
    </section>
  `);
}

function renderRoadmap() {
  return shellMarkup(`
    <section class="roadmap-layout">
      <div class="build-hero roadmap-hero project-hero">
        <div>
          <p class="kicker">Temporary Roadmap Page</p>
          <h2 class="project-title">Compact path to launch.</h2>
          <p class="hero-copy">Keep only the bets that reduce hesitation: host loop, sharing, global rooms, then platform infrastructure.</p>
        </div>
        <div class="project-hero-side">
          <div class="temp-note">
            <span>Focus</span>
            <p>Every roadmap item must make the room easier to host, play, share, or scale.</p>
          </div>
          <div class="controls">
            <a class="button secondary" href="#build" data-go-screen="build">Back to Build</a>
            <a class="button ghost" href="#arena" data-go-screen="${escapeHtml(state.lastArenaScreen)}">Open Arena</a>
          </div>
        </div>
      </div>

      <div class="roadmap-track" aria-label="Roadmap timeline">
        ${roadmapItems.map((item) => `
          <article class="roadmap-item">
            <span>${escapeHtml(item.phase)}</span>
            <div>
              <div class="roadmap-item-head">
                <h2>${escapeHtml(item.title)}</h2>
                <strong>${escapeHtml(item.status)}</strong>
              </div>
              <p>${escapeHtml(item.text)}</p>
            </div>
          </article>
        `).join("")}
      </div>

      <section class="build-card roadmap-note">
        <p class="kicker">Simplification Rule</p>
        <h2>Every release should remove hesitation.</h2>
        <p>When a new capability arrives, it should make the room easier to understand, easier to host, or easier to share. If it does not, it waits.</p>
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
    scoreboard: renderScoreboardScreen,
    build: renderBuild,
    roadmap: renderRoadmap
  };
  document.body.dataset.vibe = state.roomVibe;
  app.innerHTML = (screens[state.screen] || renderHome)();
  bindEvents();
  if (state.screen === "submit") startRoundTimer();
}

function bindEvents() {
  document.querySelectorAll("[data-go-screen]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setScreen(link.dataset.goScreen, true);
    });
  });

  document.querySelectorAll("[data-quick-launch]").forEach((button) => {
    button.addEventListener("click", () => quickLaunchRoom(button.dataset.quickLaunch));
  });

  document.querySelectorAll("[data-magic-mix]").forEach((button) => {
    button.addEventListener("click", () => applyMagicMix(button.dataset.magicMix));
  });

  document.querySelector("#toggleAdvancedSetup")?.addEventListener("click", () => {
    syncSetupDraft();
    state.showAdvancedSetup = !state.showAdvancedSetup;
    render();
  });

  document.querySelector("#setupForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    syncSetupDraft();
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
  document.querySelector("#copyWelcome")?.addEventListener("click", copyGuestWelcome);
  document.querySelector("#dockCopyWelcome")?.addEventListener("click", copyGuestWelcome);
  document.querySelector("#copyJoinCard")?.addEventListener("click", copyGuestJoinCard);
  document.querySelector("#copyRoomShare")?.addEventListener("click", copyRoomShareCard);
  document.querySelector("#copyPromptPreview")?.addEventListener("click", copyPromptPreview);
  document.querySelector("#copyGlobalGuide")?.addEventListener("click", copyGlobalRoomGuide);
  document.querySelector("#copyLiveBlueprint")?.addEventListener("click", copyLiveBlueprint);
  document.querySelector("#copyPassport")?.addEventListener("click", copyRoomPassport);
  document.querySelector("#copyRitual")?.addEventListener("click", copyLaunchRitual);
  document.querySelector("#addBot")?.addEventListener("click", addBot);
  document.querySelector("#guestForm")?.addEventListener("submit", addGuest);
  document.querySelector("#submitAnswer")?.addEventListener("click", submitAnswer);
  document.querySelector("#toggleFocus")?.addEventListener("click", toggleFocusMode);
  document.querySelector("#roundStartStarter")?.addEventListener("click", useCompassStarter);
  document.querySelector("#compassStarter")?.addEventListener("click", useCompassStarter);
  document.querySelector("#chaosAnswer")?.addEventListener("click", useChaosAnswer);
  document.querySelector("#skipToVote")?.addEventListener("click", () => submitAnswer("auto"));
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
  document.querySelector("#copyEncorePlan")?.addEventListener("click", copyEncorePlan);
  document.querySelector("#copyFinalCard")?.addEventListener("click", copyFinalCard);
  document.querySelector("#copyMoment")?.addEventListener("click", copyMomentClip);
  document.querySelector("#copyVerdictCard")?.addEventListener("click", copyVerdictCard);
  document.querySelector("#copyCreatorKit")?.addEventListener("click", copyCreatorShareKit);
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
  if (!input) return;
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
  markCustomRecipe();
  applySetup(plan.setup);
  resetGame();
  state.notice = `${plan.label} applied. Scores reset, players stay seated.`;
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
  const answer = forceBotAnswer === true ? "" : (input ? input.value.trim() : "");
  if (!forceBotAnswer && !answer) {
    state.notice = "Write a roast first, or use Spark.";
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
  if (!winner) return;
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
const routedScreen = screenFromHash();
if (routedScreen) {
  if (isArenaScreen(routedScreen)) state.lastArenaScreen = routedScreen;
  state.screen = routedScreen;
}

window.addEventListener("hashchange", () => {
  const nextScreen = screenFromHash();
  if (nextScreen && nextScreen !== state.screen) setScreen(nextScreen);
});

render();
