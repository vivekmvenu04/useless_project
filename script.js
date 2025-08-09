document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const lastKeyElement = document.getElementById('last-key');
    const visualFeedback = document.getElementById('visual-feedback');

    // Audio context
    let audioContext;
    
    // Initialize audio context on first user interaction
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            document.removeEventListener('keydown', initAudio);
            document.removeEventListener('click', initAudio);
            console.log('Audio context initialized');
        }
    }

    // Add event listeners to initialize audio
    document.addEventListener('keydown', initAudio);
    document.addEventListener('click', initAudio);
    
    // Force audio initialization on page load with a user gesture simulation
    window.addEventListener('load', () => {
        // Display a message to the user
        const message = document.createElement('div');
        message.textContent = 'Click anywhere to enable sounds!';
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.padding = '20px';
        message.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        message.style.color = '#fff';
        message.style.borderRadius = '10px';
        message.style.zIndex = '1000';
        document.body.appendChild(message);
        
        // Remove the message on first click
        document.addEventListener('click', () => {
            if (message.parentNode) {
                document.body.removeChild(message);
            }
        }, { once: true });
    });

    // Sound types and their generation functions
    const soundTypes = {
        // Beat sounds (mapped to specific keys)
        beats: {
            'a': { type: 'kick', name: 'Kick Drum' },
            's': { type: 'snare', name: 'Snare Drum' },
            'd': { type: 'hihat', name: 'Hi-Hat' },
            'f': { type: 'clap', name: 'Clap' },
            'g': { type: 'cymbal', name: 'Cymbal' },
            'h': { type: 'tom', name: 'Tom Drum' },
            'j': { type: 'rimshot', name: 'Rimshot' },
            'k': { type: 'cowbell', name: 'Cowbell' },
            'l': { type: 'shaker', name: 'Shaker' },
            ';': { type: 'woodblock', name: 'Woodblock' }
        },
        // Funny sound types for all other keys
        funny: {
            'q': { type: 'boing', name: 'Boing' },
            'w': { type: 'fart', name: 'Fart' },
            'e': { type: 'meow', name: 'Meow' },
            'r': { type: 'squeak', name: 'Squeak' },
            't': { type: 'kazoo', name: 'Kazoo' },
            'y': { type: 'pop', name: 'Pop' },
            'u': { type: 'quack', name: 'Quack' },
            'i': { type: 'whistle', name: 'Whistle' },
            'o': { type: 'spring', name: 'Spring' },
            'p': { type: 'laser', name: 'Laser' },
            '[': { type: 'bubbles', name: 'Bubbles' },
            ']': { type: 'robot', name: 'Robot' },
            'z': { type: 'alien', name: 'Alien' },
            'x': { type: 'doorbell', name: 'Doorbell' },
            'c': { type: 'telephone', name: 'Telephone' },
            'v': { type: 'thunder', name: 'Thunder' },
            'b': { type: 'helicopter', name: 'Helicopter' },
            'n': { type: 'siren', name: 'Siren' },
            'm': { type: 'cricket', name: 'Cricket' },
            ',': { type: 'dog', name: 'Dog Bark' },
            '.': { type: 'glass', name: 'Glass Break' },
            '/': { type: 'laugh', name: 'Evil Laugh' }
        }
    };

    // Generate a sound using Web Audio API
    function generateSound(soundType) {
        if (!audioContext) {
            initAudio();
            if (!audioContext) {
                console.error('Audio context not initialized');
                return;
            }
        }

        // Create oscillator and gain nodes
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Default values
        let duration = 0.3;
        let frequency = 440;
        let oscillatorType = 'sine';
        let attackTime = 0.01;
        let decayTime = 0.2;
        let sustainLevel = 0.3;
        let releaseTime = 0.1;
        
        // Configure based on sound type
        switch (soundType.type) {
            case 'kick':
                oscillator.type = 'sine';
                frequency = 150;
                duration = 0.3;
                attackTime = 0.001;
                decayTime = 0.2;
                sustainLevel = 0;
                releaseTime = 0.1;
                
                // Frequency sweep for kick
                oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.1);
                break;
                
            case 'snare':
                oscillator.type = 'triangle';
                frequency = 200;
                duration = 0.2;
                attackTime = 0.001;
                decayTime = 0.1;
                sustainLevel = 0.1;
                releaseTime = 0.1;
                
                // Add noise for snare
                const noiseNode = createNoiseNode(audioContext, 0.2);
                noiseNode.connect(gainNode);
                break;
                
            case 'hihat':
                oscillator.type = 'square';
                frequency = 800;
                duration = 0.1;
                attackTime = 0.001;
                decayTime = 0.05;
                sustainLevel = 0.01;
                releaseTime = 0.05;
                
                // Add noise for hi-hat
                const hihatNoise = createNoiseNode(audioContext, 0.1);
                hihatNoise.connect(gainNode);
                break;
                
            case 'clap':
                oscillator.type = 'square';
                frequency = 300;
                duration = 0.2;
                attackTime = 0.001;
                decayTime = 0.1;
                sustainLevel = 0.1;
                releaseTime = 0.1;
                
                // Multiple short bursts for clap
                const clapGain = audioContext.createGain();
                clapGain.gain.setValueAtTime(0, audioContext.currentTime);
                clapGain.gain.setValueAtTime(1, audioContext.currentTime + 0.01);
                clapGain.gain.setValueAtTime(0.3, audioContext.currentTime + 0.02);
                clapGain.gain.setValueAtTime(0.7, audioContext.currentTime + 0.03);
                clapGain.gain.setValueAtTime(0.2, audioContext.currentTime + 0.04);
                clapGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
                
                const clapNoise = createNoiseNode(audioContext, 0.15);
                clapNoise.connect(clapGain).connect(audioContext.destination);
                break;
                
            case 'cymbal':
                oscillator.type = 'square';
                frequency = 1200;
                duration = 0.5;
                attackTime = 0.001;
                decayTime = 0.3;
                sustainLevel = 0.05;
                releaseTime = 0.2;
                
                // Add noise for cymbal
                const cymbalNoise = createNoiseNode(audioContext, 0.5);
                const cymbalFilter = audioContext.createBiquadFilter();
                cymbalFilter.type = 'highpass';
                cymbalFilter.frequency.value = 8000;
                cymbalNoise.connect(cymbalFilter).connect(gainNode);
                break;
                
            case 'boing':
                oscillator.type = 'sine';
                frequency = 150;
                duration = 0.5;
                
                // Frequency sweep for boing
                oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.1);
                oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.4);
                break;
                
            case 'fart':
                oscillator.type = 'sawtooth';
                frequency = 100;
                duration = 0.7;
                
                // Random frequency modulation for fart
                const fartLFO = audioContext.createOscillator();
                fartLFO.type = 'sine';
                fartLFO.frequency.value = 5;
                
                const fartLFOGain = audioContext.createGain();
                fartLFOGain.gain.value = 50;
                
                fartLFO.connect(fartLFOGain);
                fartLFOGain.connect(oscillator.frequency);
                fartLFO.start();
                fartLFO.stop(audioContext.currentTime + duration);
                break;
                
            case 'meow':
                oscillator.type = 'sine';
                frequency = 800;
                duration = 0.5;
                
                // Frequency sweep for meow
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.linearRampToValueAtTime(400, audioContext.currentTime + 0.5);
                break;
                
            case 'squeak':
                oscillator.type = 'sine';
                frequency = 1200;
                duration = 0.2;
                
                // Quick frequency modulation for squeak
                oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
                oscillator.frequency.linearRampToValueAtTime(1800, audioContext.currentTime + 0.1);
                oscillator.frequency.linearRampToValueAtTime(1200, audioContext.currentTime + 0.2);
                break;
                
            case 'kazoo':
                oscillator.type = 'square';
                frequency = 300;
                duration = 0.4;
                
                // Add vibrato for kazoo
                const kazooLFO = audioContext.createOscillator();
                kazooLFO.type = 'sine';
                kazooLFO.frequency.value = 12;
                
                const kazooLFOGain = audioContext.createGain();
                kazooLFOGain.gain.value = 20;
                
                kazooLFO.connect(kazooLFOGain);
                kazooLFOGain.connect(oscillator.frequency);
                kazooLFO.start();
                kazooLFO.stop(audioContext.currentTime + duration);
                break;
                
            case 'pop':
                oscillator.type = 'sine';
                frequency = 600;
                duration = 0.1;
                attackTime = 0.001;
                decayTime = 0.02;
                sustainLevel = 0;
                releaseTime = 0.08;
                break;
                
            case 'whistle':
                oscillator.type = 'sine';
                frequency = 1000;
                duration = 0.5;
                
                // Frequency sweep for whistle
                oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
                oscillator.frequency.linearRampToValueAtTime(2000, audioContext.currentTime + 0.2);
                oscillator.frequency.linearRampToValueAtTime(1500, audioContext.currentTime + 0.5);
                break;
                
            case 'quack':
                oscillator.type = 'sawtooth';
                frequency = 300;
                duration = 0.2;
                attackTime = 0.01;
                decayTime = 0.1;
                sustainLevel = 0.1;
                releaseTime = 0.1;
                
                // Frequency modulation for quack
                oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
                oscillator.frequency.linearRampToValueAtTime(200, audioContext.currentTime + 0.2);
                break;
                
            case 'spring':
                oscillator.type = 'sine';
                frequency = 300;
                duration = 0.5;
                
                // Bouncing frequency for spring
                oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
                oscillator.frequency.linearRampToValueAtTime(600, audioContext.currentTime + 0.1);
                oscillator.frequency.linearRampToValueAtTime(400, audioContext.currentTime + 0.2);
                oscillator.frequency.linearRampToValueAtTime(500, audioContext.currentTime + 0.3);
                oscillator.frequency.linearRampToValueAtTime(350, audioContext.currentTime + 0.4);
                oscillator.frequency.linearRampToValueAtTime(300, audioContext.currentTime + 0.5);
                break;
                
            case 'laser':
                oscillator.type = 'sawtooth';
                frequency = 1500;
                duration = 0.2;
                
                // Frequency sweep for laser
                oscillator.frequency.setValueAtTime(1500, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.2);
                break;
                
            case 'bubbles':
                oscillator.type = 'sine';
                frequency = 800;
                duration = 0.5;
                
                // Random bubbles
                const times = [0, 0.1, 0.2, 0.3, 0.4];
                times.forEach(time => {
                    oscillator.frequency.setValueAtTime(
                        600 + Math.random() * 400, 
                        audioContext.currentTime + time
                    );
                });
                break;
                
            case 'robot':
                oscillator.type = 'square';
                frequency = 300;
                duration = 0.5;
                
                // Robot voice effect
                const robotLFO = audioContext.createOscillator();
                robotLFO.type = 'square';
                robotLFO.frequency.value = 30;
                
                const robotLFOGain = audioContext.createGain();
                robotLFOGain.gain.value = 100;
                
                robotLFO.connect(robotLFOGain);
                robotLFOGain.connect(oscillator.frequency);
                robotLFO.start();
                robotLFO.stop(audioContext.currentTime + duration);
                break;

            // New beat sounds
            case 'tom':
                oscillator.type = 'sine';
                frequency = 100;
                duration = 0.3;
                attackTime = 0.001;
                decayTime = 0.1;
                sustainLevel = 0.1;
                releaseTime = 0.2;
                
                // Frequency sweep for tom
                oscillator.frequency.setValueAtTime(180, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(60, audioContext.currentTime + 0.2);
                break;
                
            case 'rimshot':
                oscillator.type = 'triangle';
                frequency = 400;
                duration = 0.1;
                attackTime = 0.001;
                decayTime = 0.01;
                sustainLevel = 0;
                releaseTime = 0.09;
                
                // Add noise for rimshot
                const rimshotNoise = createNoiseNode(audioContext, 0.1);
                const rimshotFilter = audioContext.createBiquadFilter();
                rimshotFilter.type = 'bandpass';
                rimshotFilter.frequency.value = 2000;
                rimshotFilter.Q.value = 5;
                rimshotNoise.connect(rimshotFilter).connect(gainNode);
                break;
                
            case 'cowbell':
                oscillator.type = 'triangle';
                frequency = 800;
                duration = 0.3;
                attackTime = 0.001;
                decayTime = 0.05;
                sustainLevel = 0.2;
                releaseTime = 0.25;
                
                // Second oscillator for cowbell
                const cowbellOsc2 = audioContext.createOscillator();
                cowbellOsc2.type = 'triangle';
                cowbellOsc2.frequency.value = 540;
                cowbellOsc2.connect(gainNode);
                cowbellOsc2.start();
                cowbellOsc2.stop(audioContext.currentTime + duration);
                break;
                
            case 'shaker':
                oscillator.type = 'sine';
                frequency = 3000;
                duration = 0.15;
                attackTime = 0.001;
                decayTime = 0.05;
                sustainLevel = 0.01;
                releaseTime = 0.1;
                
                // Noise for shaker
                const shakerNoise = createNoiseNode(audioContext, 0.15);
                const shakerFilter = audioContext.createBiquadFilter();
                shakerFilter.type = 'bandpass';
                shakerFilter.frequency.value = 8000;
                shakerFilter.Q.value = 1;
                shakerNoise.connect(shakerFilter).connect(gainNode);
                
                // Reduce oscillator volume
                gainNode.gain.value = 0.1;
                break;
                
            case 'woodblock':
                oscillator.type = 'sine';
                frequency = 800;
                duration = 0.15;
                attackTime = 0.001;
                decayTime = 0.05;
                sustainLevel = 0;
                releaseTime = 0.1;
                
                // Quick pitch drop for woodblock
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
                break;

            // New funny sounds
            case 'alien':
                oscillator.type = 'sine';
                frequency = 1500;
                duration = 0.8;
                
                // Alien voice effect
                const alienLFO = audioContext.createOscillator();
                alienLFO.type = 'sine';
                alienLFO.frequency.value = 8;
                
                const alienLFOGain = audioContext.createGain();
                alienLFOGain.gain.value = 300;
                
                alienLFO.connect(alienLFOGain);
                alienLFOGain.connect(oscillator.frequency);
                alienLFO.start();
                alienLFO.stop(audioContext.currentTime + duration);
                
                // Frequency sweep
                oscillator.frequency.setValueAtTime(1500, audioContext.currentTime);
                oscillator.frequency.linearRampToValueAtTime(500, audioContext.currentTime + 0.4);
                oscillator.frequency.linearRampToValueAtTime(2000, audioContext.currentTime + 0.8);
                break;
                
            case 'doorbell':
                oscillator.type = 'sine';
                frequency = 440;
                duration = 0.6;
                
                // Two-tone doorbell
                oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(550, audioContext.currentTime + 0.3);
                
                // ADSR envelope
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.05);
                gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.25);
                gainNode.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.35);
                gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.6);
                break;
                
            case 'telephone':
                oscillator.type = 'sine';
                frequency = 480;
                duration = 0.7;
                
                // Telephone ring pattern
                const phoneTimes = [0, 0.1, 0.35, 0.45];
                const freqs = [480, 440, 480, 440];
                
                phoneTimes.forEach((time, i) => {
                    oscillator.frequency.setValueAtTime(freqs[i], audioContext.currentTime + time);
                });
                
                // ADSR envelope for telephone
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.05);
                gainNode.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.15);
                gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);
                gainNode.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.4);
                gainNode.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.5);
                gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.55);
                break;
                
            case 'thunder':
                oscillator.type = 'sawtooth';
                frequency = 60;
                duration = 1.0;
                
                // Thunder rumble
                const thunderNoise = createNoiseNode(audioContext, 1.0);
                const thunderFilter = audioContext.createBiquadFilter();
                thunderFilter.type = 'lowpass';
                thunderFilter.frequency.value = 100;
                
                thunderNoise.connect(thunderFilter).connect(gainNode);
                
                // Thunder envelope
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.05);
                gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.2);
                gainNode.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.3);
                gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.5);
                gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.0);
                break;
                
            case 'helicopter':
                oscillator.type = 'sawtooth';
                frequency = 40;
                duration = 0.8;
                
                // Helicopter blade sound
                const heliLFO = audioContext.createOscillator();
                heliLFO.type = 'square';
                heliLFO.frequency.value = 20;
                
                const heliLFOGain = audioContext.createGain();
                heliLFOGain.gain.value = 20;
                
                heliLFO.connect(heliLFOGain);
                heliLFOGain.connect(oscillator.frequency);
                heliLFO.start();
                heliLFO.stop(audioContext.currentTime + duration);
                
                // Add noise for helicopter
                const heliNoise = createNoiseNode(audioContext, 0.8);
                const heliFilter = audioContext.createBiquadFilter();
                heliFilter.type = 'lowpass';
                heliFilter.frequency.value = 300;
                heliNoise.connect(heliFilter).connect(gainNode);
                break;
                
            case 'siren':
                oscillator.type = 'triangle';
                frequency = 800;
                duration = 0.8;
                
                // Siren wail
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                oscillator.frequency.linearRampToValueAtTime(1200, audioContext.currentTime + 0.4);
                oscillator.frequency.linearRampToValueAtTime(400, audioContext.currentTime + 0.8);
                break;
                
            case 'cricket':
                oscillator.type = 'sine';
                frequency = 4000;
                duration = 0.6;
                
                // Cricket chirp pattern
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.7, audioContext.currentTime + 0.05);
                gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.7, audioContext.currentTime + 0.15);
                gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.2);
                gainNode.gain.setValueAtTime(0.7, audioContext.currentTime + 0.4);
                gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.45);
                gainNode.gain.setValueAtTime(0.7, audioContext.currentTime + 0.5);
                gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.55);
                break;
                
            case 'dog':
                oscillator.type = 'sawtooth';
                frequency = 200;
                duration = 0.4;
                
                // Dog bark
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                oscillator.frequency.linearRampToValueAtTime(150, audioContext.currentTime + 0.1);
                oscillator.frequency.linearRampToValueAtTime(100, audioContext.currentTime + 0.4);
                
                // Add noise for bark
                const dogNoise = createNoiseNode(audioContext, 0.4);
                const dogFilter = audioContext.createBiquadFilter();
                dogFilter.type = 'bandpass';
                dogFilter.frequency.value = 800;
                dogFilter.Q.value = 2;
                dogNoise.connect(dogFilter).connect(gainNode);
                break;
                
            case 'glass':
                oscillator.type = 'sine';
                frequency = 4000;
                duration = 0.5;
                
                // Glass break effect
                const glassNoise = createNoiseNode(audioContext, 0.5);
                const glassFilter = audioContext.createBiquadFilter();
                glassFilter.type = 'highpass';
                glassFilter.frequency.value = 3000;
                glassNoise.connect(glassFilter).connect(gainNode);
                
                // Glass tinkle
                const glassTimes = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3];
                glassTimes.forEach(time => {
                    oscillator.frequency.setValueAtTime(
                        3000 + Math.random() * 2000, 
                        audioContext.currentTime + time
                    );
                });
                break;
                
            case 'laugh':
                oscillator.type = 'sawtooth';
                frequency = 300;
                duration = 0.8;
                
                // Evil laugh pattern
                const laughTimes = [0, 0.15, 0.3, 0.45, 0.6];
                const laughFreqs = [300, 400, 350, 450, 250];
                
                laughTimes.forEach((time, i) => {
                    oscillator.frequency.setValueAtTime(laughFreqs[i], audioContext.currentTime + time);
                });
                
                // Laugh envelope
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.05);
                gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.14);
                gainNode.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.2);
                gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.29);
                gainNode.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.35);
                gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.44);
                gainNode.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.5);
                gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.8);
                break;
                
            default:
                // Default sound
                oscillator.type = 'sine';
                frequency = 440;
                duration = 0.3;
        }
        
        // Set oscillator frequency
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        
        // Apply ADSR envelope
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + attackTime);
        gainNode.gain.linearRampToValueAtTime(sustainLevel, audioContext.currentTime + attackTime + decayTime);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + attackTime + decayTime + releaseTime);
        
        // Start and stop oscillator
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
        
        console.log(`Playing sound: ${soundType.name}`);
        return { oscillator, gainNode };
    }
    
    // Helper function to create a noise node
    function createNoiseNode(audioContext, duration) {
        const bufferSize = audioContext.sampleRate * duration;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        // Fill buffer with noise
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = audioContext.createBufferSource();
        noise.buffer = buffer;
        noise.start();
        noise.stop(audioContext.currentTime + duration);
        
        return noise;
    }

    // Get a random funny sound
    function getRandomFunnySound() {
        const funnyKeys = Object.keys(soundTypes.funny);
        const randomKey = funnyKeys[Math.floor(Math.random() * funnyKeys.length)];
        return soundTypes.funny[randomKey];
    }

    // Create visual particle effect
    function createParticle(x, y, color) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 30 + 10}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = color;
        
        visualFeedback.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            if (particle.parentNode === visualFeedback) {
                visualFeedback.removeChild(particle);
            }
        }, 1000);
    }

    // Generate random color
    function getRandomColor() {
        const colors = [
            '#00f5d4', '#00bbf9', '#fee440', '#f15bb5', '#9b5de5',
            '#ff0055', '#ff7b00', '#00ff88', '#8338ec', '#fb5607'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Handle keydown event
    function handleKeyDown(event) {
        const key = event.key.toLowerCase();
        
        // Update last key display
        lastKeyElement.textContent = event.key === ' ' ? 'SPACE' : event.key.toUpperCase();
        
        // Create visual effect
        const color = getRandomColor();
        const feedbackRect = visualFeedback.getBoundingClientRect();
        const x = Math.random() * feedbackRect.width;
        const y = feedbackRect.height;
        
        // Create multiple particles for visual effect
        for (let i = 0; i < 5; i++) {
            createParticle(x + (Math.random() * 40 - 20), y, color);
        }
        
        // Play sound based on key
        if (key in soundTypes.beats) {
            // Play mapped beat sound
            generateSound(soundTypes.beats[key]);
        } else if (key in soundTypes.funny) {
            // Play mapped funny sound
            generateSound(soundTypes.funny[key]);
        } else {
            // Play random funny sound for unmapped keys
            generateSound(getRandomFunnySound());
        }
    }

    // Create UI for sound options
    function createSoundUI() {
        const container = document.getElementById('sound-container');
        container.innerHTML = '';
        
        // Create beat sounds section
        const beatsSection = document.createElement('div');
        beatsSection.className = 'sound-section';
        beatsSection.innerHTML = '<h2>Beat Sounds</h2>';
        
        const beatsList = document.createElement('div');
        beatsList.className = 'sound-list';
        
        for (const key in soundTypes.beats) {
            const sound = soundTypes.beats[key];
            const button = createSoundButton(key, sound.name, sound);
            beatsList.appendChild(button);
        }
        
        beatsSection.appendChild(beatsList);
        container.appendChild(beatsSection);
        
        // Create funny sounds section
        const funnySection = document.createElement('div');
        funnySection.className = 'sound-section';
        funnySection.innerHTML = '<h2>Funny Sounds</h2>';
        
        const funnyList = document.createElement('div');
        funnyList.className = 'sound-list';
        
        for (const key in soundTypes.funny) {
            const sound = soundTypes.funny[key];
            const button = createSoundButton(key, sound.name, sound);
            funnyList.appendChild(button);
        }
        
        funnySection.appendChild(funnyList);
        container.appendChild(funnySection);
    }
    
    // Helper function to create sound buttons
    function createSoundButton(key, name, sound) {
        const button = document.createElement('button');
        button.className = 'sound-button';
        button.innerHTML = `<span class="key">${key}</span><span class="name">${name}</span>`;
        button.addEventListener('click', () => generateSound(sound));
        return button;
    }
    
    // Add keydown event listener
    document.addEventListener('keydown', handleKeyDown);
    
    // Initialize the UI when the DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        createSoundUI();
    });

    // Add click handler for mobile users
    visualFeedback.addEventListener('click', (event) => {
        // Get click position relative to the container
        const rect = visualFeedback.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Create visual effect
        const color = getRandomColor();
        for (let i = 0; i < 5; i++) {
            createParticle(x + (Math.random() * 40 - 20), y, color);
        }
        
        // Play random funny sound
        generateSound(getRandomFunnySound());
        
        // Update last key display
        lastKeyElement.textContent = 'CLICK';
    });
});