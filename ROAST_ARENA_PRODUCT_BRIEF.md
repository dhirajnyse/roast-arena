# Roast Arena Product Brief

## Concept

Roast Arena is a browser-first social comedy game where players join a room, respond to funny prompts, vote on anonymous submissions, and watch a theatrical judge deliver verdicts. The humans create the comedy; the AI or scripted host provides the stage, prompts, reactions, pacing, and drama.

The first version should feel like a fast party game: no login, room code, short rounds, anonymous submissions, voting, scoreboard, and one memorable judge personality.

## Core Promise

"Make your friends laugh in 3 minutes."

The game should not depend on complex rules. A new player should understand the loop after one screen:

1. Join a room.
2. Read the prompt.
3. Submit the funniest answer.
4. Vote on anonymous answers.
5. Enjoy the judge verdict.
6. Climb the scoreboard.

## Why This Is Worth Building

Roast Arena has a strong MVP path because it can be fun before it becomes technically complex. We can start with hand-written prompts and template-based judge commentary, then add AI generation, image prompts, streamer tools, premium packs, and creator content later.

The idea has several monetization angles:

- Premium judge personalities
- Paid private party rooms
- Streamer overlays and audience voting
- Brand or team-building event packs
- Cosmetic avatars, titles, podium effects, and winner animations
- Creator-made prompt packs with revenue share
- AI-powered custom prompt generation as a paid feature

## Target Audience

Primary users:

- Friend groups who want a quick browser party game
- Discord communities
- Streamers and their live audiences
- College groups and casual online communities

Secondary users:

- Remote teams looking for playful icebreakers
- Event hosts
- Comedy creators who want to publish prompt packs

## MVP Scope

The first playable MVP should include:

- Landing directly into the game flow, not a marketing page
- Create room
- Join room with code
- Room lobby with player list
- Judge selection
- Prompt reveal
- Timed answer submission
- Anonymous answer reveal
- Voting phase
- Judge commentary
- Scoreboard
- Next round button

Recommended first judge:

- HR Department: polite, passive-aggressive, absurdly corporate, and easy to keep safe.

Recommended first modes:

- Classic Roast: everyone answers the same prompt.
- Duel Mode can come later.
- Meme Court can come later after the text loop is proven.

## First Prompt Bank

Good prompts should be specific enough to make jokes easy:

- Explain why your ex should be banned from Wi-Fi.
- Pitch the worst startup idea that somehow gets VC funding.
- Roast a villain's LinkedIn profile.
- Write a customer review for a haunted toaster.
- Defend your browser history in court.
- Give a TED Talk title for your worst life decision.
- Write a breakup text from a gym membership.
- Explain why this group chat deserves government supervision.
- Invent a luxury product nobody asked for.
- Write a slogan for a restaurant with terrible service.

## Judge Personality Examples

### HR Department

Tone: corporate, passive-aggressive, legally nervous.

Example verdict:

"After careful review, this submission has been deemed disruptive, emotionally accurate, and unfortunately hilarious."

### Medieval King

Tone: dramatic, royal, nonsensical.

Example verdict:

"The court has laughed, the goblet has trembled, and this answer shall be granted three points and one imaginary province."

### Brutal CEO

Tone: investor-style, cold, efficiency-obsessed.

Example verdict:

"The joke has no market moat, but the disrespect scales beautifully. Approved."

### Disappointed Auntie

Tone: loving but devastating.

Example verdict:

"Beta, I expected nothing, and still this answer has brought shame with excellent timing."

## Safety And Moderation

Roast Arena must be funny without becoming abusive. Safety is part of the product design, not an afterthought.

Suggested guardrails:

- Default to "friendly roast" intensity.
- Avoid prompts that target protected traits or real private individuals.
- Let hosts set intensity: Friendly, Spicy, Unhinged Private Room.
- Add kick, mute, report, and skip round controls.
- Add profanity and slur filtering before reveal.
- Keep public rooms stricter than private friend rooms.
- Make anonymous submissions anonymous during voting, but traceable internally for moderation.

## Product Differentiation

Roast Arena is not just "AI writes jokes." The better product direction is:

- Humans perform.
- AI hosts.
- The room creates social pressure.
- Judges create repeatable personality and monetization.
- Prompt packs create new seasons and creator content.

Compared with traditional party games, Roast Arena should feel:

- Faster to start
- More customizable
- Better for streaming
- More internet-native
- Easier to expand with new judges and prompt packs

## Build Roadmap

### Phase 1: Playable Local Prototype

- Single browser app
- Fake room state in memory
- 3-5 sample players
- Prompt, submit, reveal, vote, judge verdict, scoreboard
- No backend required

Goal: prove the loop is funny.

### Phase 2: Real Multiplayer

- Room codes
- WebSocket or realtime backend
- Host controls
- Player names
- Round timer
- Voting validation

Goal: play with real friends.

### Phase 3: Content And Personality

- Prompt packs
- Multiple judges
- Judge scoring styles
- Better animations and sound effects
- Basic moderation filters

Goal: make the game replayable.

### Phase 4: Monetization Tests

- Premium judge packs
- Paid private rooms
- Event mode
- Streamer overlay prototype
- Creator prompt pack experiments

Goal: find what people will pay for.

## Recommended First Build

Build a polished browser MVP called "Roast Arena: Party Room."

Use a single-page app with these screens:

1. Home / create room
2. Lobby
3. Prompt round
4. Submission reveal
5. Voting
6. Judge verdict
7. Scoreboard

For the first prototype, skip real AI and use:

- A curated prompt bank
- Judge templates
- Randomized verdict lines
- Simulated player support for solo testing

Once the loop feels fun, plug in AI for prompt generation and judge commentary.

## Decision Criteria

Before committing to a bigger build, test whether:

- Players laugh during the first round.
- Players ask for "one more round."
- Losing still feels entertaining.
- The judge personality is memorable.
- The host can explain the game in under 20 seconds.
- The prompts make funny answers easy.

If these are true, Roast Arena is worth building seriously.
