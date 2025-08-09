<img width="3188" height="1202" alt="frame (3)" src="https://github.com/user-attachments/assets/517ad8e9-ad22-457d-9538-a9e62d137cd7" />


#   Keyboard DJ 🎯


## Keyboard DJ – Turn Your Typing Into a Party
### Team Name: VIVEK M VENU

### Project Description
Keyboard DJ is a fun and chaotic web app that transforms your keyboard into a musical instrument. Every key you press plays a random funny sound — from farts to meows to cartoon boings — making typing an unpredictable musical performance.

### The Problem (that doesn't exist)
Typing is boring. It’s all click-clack, click-clack, with zero pizzazz.Keyboard DJ solves the global crisis of dull keystrokes by transforming every press into a chaotic symphony of farts, meows, beeps, and kazoos — because productivity is overrated, and fun is underrated.



### The Solution (that nobody asked for)
By turning your boring QWERTY keyboard into a full-blown chaotic DJ console.

## Technical Details
### Technologies/Components Used
For Software:
- JavaScript (core logic for sound triggers)

HTML (structure)

CSS (styling, animations)
- None required for basic version
- Howler.js → for playing and managing sounds

Optional: Anime.js or GSAP for fun visual effects
- VS Code (code editor)

Audacity (edit sound effects)

Browser DevTools (testing)

For Hardware:
- Standard USB or Bluetooth keyboard (input device)

Laptop or PC to run the app

Optional: External speakers for maximum chaos
- Minimum: Any modern browser with JavaScript enabled

Recommended: Chrome/Edge/Firefox with audio autoplay allowed
- Sound recording device (mic) if you want custom sounds

Headphones (for testing without annoying everyone)



### Implementation
For Software:Setup the Environment

Install VS Code (or any code editor).

Download Howler.js library for handling audio playback.

Prepare a set of funny sound effects (farts, meows, beeps, kazoos).

Frontend Structure (HTML + CSS)

HTML: Create a simple page with instructions like "Type anything to drop the beat!".

CSS: Add bright, flashy styles — optional animated background or disco lights effect.

Sound Integration (JavaScript)

Import Howler.js and preload all sounds into an array.

Add an event listener for keydown events.

On each key press, randomly select a sound from the array and play it instantly.

Special Combo Beats

Detect if WASD + SPACE is pressed in sequence.

If combo detected, play a looping “party beat” and flash the screen.

Visual Feedback

Use Anime.js or CSS animations to make the background flash or pulse when keys are pressed.

Show an on-screen “sound name” when each sound is triggered (e.g., “MEOW!”).

Testing

Test on multiple browsers to ensure sounds trigger without delay.

Check if the timing between key press and sound is instant (low latency).

Deployment

Host on GitHub Pages or Netlify for easy demo during competition.

Bonus: Make it mobile-friendly so people can tap to make sounds.


# Installation
git clone https://github.com/yourusername/keyboard-dj.git
cd keyboard-dj
Create a sounds/ folder in the project.
sounds/
 ├── fart1.mp3
 ├── meow.wav
 ├── beep.mp3
 └── kazoo.wav

# Run
npx live-server
or
Just double-click index.html and it will open in your browser.

### Project Documentation
For Software:Keyboard DJ – Project Documentation 
1. Project Overview
Keyboard DJ is a quirky, fun web app that turns your keyboard into a chaotic musical instrument.
Every key you press plays a random funny sound — fart , meow , kazoo , beep  — making typing feel like a live comedy concert.
Bonus feature: The WASD + SPACE combo lets you drop sick beats like a pro DJ (or a cat walking on a piano).

2. What Ridiculous Problem Are We Solving?
Typing is boring.
Emails, reports, and assignments feel like a punishment.
We’re solving the “Bored Fingers Syndrome” by making each keystroke a mini-party.

3. How Are We Solving It? (Keep It Fun!)
Intercept every keyboard press with JavaScript

Play a random sound effect using Howler.js

Add funky animations for extra fun (Anime.js or GSAP)

Special key combos trigger “beats” or sound mixes

Optional LED & speaker hardware add-on for maximum chaos

4. Software Requirements
Category	Details
Languages	JavaScript, HTML, CSS
Frameworks	None (optional: React for UI)
Libraries	Howler.js (sound), Anime.js/GSAP (animations)
Tools	VS Code, Audacity (sound editing), Browser DevTools

5. Hardware Requirements (Optional)
Component	Specification
Keyboard	Any USB/Bluetooth keyboard
Computer	Any modern PC/laptop with browser
Speakers	Optional, but recommended for fun
Extras	RGB lights (optional), Microphone for custom sounds

6. Installation
Step 1 – Clone or Download

bash
Copy
Edit
git clone https://github.com/yourusername/keyboard-dj.git
cd keyboard-dj
Step 2 – Install Dependencies (Optional)

bash
Copy
Edit
npm init -y
npm install howler animejs
Step 3 – Add Sound Effects
Create a sounds/ folder and drop your funny .mp3 or .wav files.

Step 4 – Run the Project

Open index.html in your browser
or

Start a local server:

bash
Copy
Edit
npx live-server
7. Implementation
HTML – Builds the page with a fun UI and buttons for “Test Sound”.

CSS – Styles the app with bright, playful colors.

JavaScript –

Listens for keydown events.

Picks a random sound file.

Plays it using Howler.js.

If the pressed key is W, A, S, D, or SPACE → play a beat sequence.

Sound Files – Preloaded for instant playback.

8. Possible Future Updates
Multiplayer typing battle: Compete for the funniest tune.

AI-generated random sounds.

Visualizer that flashes colors with each sound.

Record and replay your “keyboard concert”.

Mobile version (tap DJ).

# Screenshots (Add at least 3)
<img width="1920" height="1080" alt="Screenshot (7)" src="https://github.com/user-attachments/assets/67e4e004-9f3a-41ac-8a71-de2c88dd44c7" />


<img width="1920" height="1080" alt="Screenshot (6)" src="https://github.com/user-attachments/assets/b2b4c8c4-ea18-48e5-92af-cea48c5fbaf1" />

*<img width="1920" height="1080" alt="Screenshot (5)" src="https://github.com/user-attachments/assets/97fe21c7-3914-48f5-97d2-c53cc64b4af1" />


# Diagrams
For Hardware:[User Presses Key]  
        │  
        ▼  
[JavaScript Detects Keydown Event]  
        │  
        ▼  
[Pick Random Sound from sounds/]  
        │  
        ├──► [If Special Key Combo → Trigger Beat Sequence]  
        │  
        ▼  
[Play Sound via Howler.js]  
        │  
        ▼  
[Trigger Fun Animation via Anime.js / GSAP]  
        │  
        ▼  
[User Laughs & Keeps Typing]


# Schematic & Circuit
          [PC / Browser]
   (Keyboard events -> Web Serial / USB Serial)
                 │
             USB Cable
                 │
        ┌────────▼────────┐
        │   Microcontroller│
        │   (ESP32 / RP2040│
        │    / Arduino)    │
        └────────┬────────┘
                 │
    ┌────────────┴─────────────┐
    │                          │
    │                          │
┌───▼───┐                  ┌───▼────────┐
│ DAC / │--(audio out)--->│Audio       │
│ I2S   │                 │Amplifier   │
│(or PWM)│                │Module (PAM│
└───────┘                 │8403, MAX98)│
                          └───┬────────┘
                              │
                         ┌────▼────┐
                         │Speaker  │
                         │(4–8 Ω)  │
                         └─────────┘

Also:
Microcontroller ──> WS2812B (NeoPixel) LED strip data pin
(5V VCC and GND shared from power supply)

Optional:
Microcontroller GPIO ← Volume Pot (analog)  
Microcontroller ← Push Buttons (mode / record)
Power Supply: 5V USB (from PC or 5V adapter)


# Build Photos
<img width="1920" height="1080" alt="Screenshot (6)" src="https://github.com/user-attachments/assets/87e31516-a0f0-4550-a8ba-9994077eaed9" />


<img width="1920" height="1080" alt="Screenshot (3)" src="https://github.com/user-attachments/assets/b2cba621-0f02-4192-a5d3-702b6c13e196" />


<img width="1920" height="1080" alt="Screenshot (6)" src="https://github.com/user-attachments/assets/6690290f-12e9-4d77-9636-bd753f7469d3" />

<img width="1920" height="1080" alt="Screenshot (4)" src="https://github.com/user-attachments/assets/2246e66f-ba0c-470c-89c9-22ce7a3e9446" />





---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--25-25?link=https%3A%2F%2Fwww.tinkerhub.org%2Fevents%2FQ2Q1TQKX6Q%2FUseless%2520Projects)



