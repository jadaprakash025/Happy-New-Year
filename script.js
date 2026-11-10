/**
 * Premium Diwali & Bestu Varas 2027 Wishes Website
 * Author: Jada Prakash (જાડા પ્રકાશ)
 * Features:
 *  - Mobile Hamburger Menu Toggle (☰ to ✕) with Smooth Drawer Navigation
 *  - Toran Positioned Cleanly Underneath Navbar (0 Text Overlap)
 *  - Today is New Year Live Celebration Clock (આજે નવું વર્ષ છે!)
 *  - Interactive Diya Lighting (મંગલ દીપ પ્રાગટ્ય) with Sound & Particle Burst
 *  - Mobile-First Thumb Action Bar for 1-Handed WhatsApp Sharing & Controls
 *  - Canvas-based Realistic Fireworks Physics & Tap-to-Launch Crackers
 *  - Canvas-based Golden Festive Confetti Engine
 *  - Web Audio API Sound Synthesizer & Background Celebration Music Controller
 *  - Dynamic URL Personalization (?name=Rahul) with Live On-Page Re-rendering & XSS Protection
 *  - WhatsApp Viral Sharing & Native Web Share API with Deployed URL Auto-Detection
 *  - Interactive 3D Envelope Opening with Gujarati Secret Letter & Wax Seal
 *  - 2027 Gujarati Fortune Cookie Blessing Generator
 *  - Copy to Clipboard with Animated Toast Feedback
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. CONFIGURATION & STATE
  // ==========================================================================
  const CONFIG = {
    senderName: 'Jada Prakash',
    senderNameGujarati: 'Jada Prakash (જાડા પ્રકાશ)',
    targetYear: 2027,
    audioSrc: 'assets/music/celebration.wav',
    audioMp3Src: 'assets/music/celebration.mp3'
  };

  const state = {
    musicPlaying: false,
    audioInitialized: false,
    audioCtx: null,
    envelopeOpen: false,
    diyaLit: false,
    currentRecipient: ''
  };

  // Color palettes for fireworks & Diwali crackers
  const FIREWORK_PALETTES = [
    ['#ffd700', '#fef08a', '#f59e0b', '#d97706'], // Gold Royale
    ['#ff4b4b', '#ff7675', '#d63031', '#ffd700'], // Ruby & Gold
    ['#00cec9', '#81ecec', '#0984e3', '#74b9ff'], // Sapphire Cyan
    ['#a29bfe', '#6c5ce7', '#fd79a8', '#e84393'], // Amethyst Violet
    ['#00b894', '#55efc4', '#f1c40f', '#ffffff'], // Emerald Festive
    ['#ffffff', '#fffbe0', '#fce7f3', '#ffd700']  // Starlight White
  ];

  // Gujarati Fortune Blessings for 2027
  const FORTUNES_GUJARATI = [
    "૨૦૨૭નું આ નવું વર્ષ તમારી બધી જ મહેનતને સોનેરી સફળતામાં ફેરવશે!",
    "મા લક્ષ્મીજીની કૃપાથી આપના ઘરમાં અખૂટ ધન, શાંતિ અને સમૃદ્ધિનો વાસ રહેશે.",
    "નવા વર્ષમાં તમારા અટકેલા બધા જ કાર્યો નિર્વિઘ્ને સિદ્ધ થશે અને ઉત્તમ યશ મળશે.",
    "તમારા પરિવારમાં પ્રેમ, સંપ અને સદ્ભાવનાનો મંગલ દીપક સદાય પ્રજ્વલિત રહેશે.",
    "૨૦૨૭નું દરેક પ્રભાત તમારા માટે નવી આશાઓ અને દરેક સાંજ સંતોષ લઈને આવશે.",
    "વ્યાપાર, નોકરી અને અભ્યાસમાં આપ ઉત્તરોત્તર નવી ઊંચાઈઓ સર કરશો તેવી મંગલ કામના!",
    "આ વર્ષે તમારા દરેક સપના સાકાર થશે અને ઉત્સાહભરી ખુશીઓ આપની સાથે રહેશે."
  ];

  // ==========================================================================
  // 2. DOM ELEMENT REFERENCES
  // ==========================================================================
  const DOM = {
    // Canvas
    fireworksCanvas: document.getElementById('fireworksCanvas'),
    confettiCanvas: document.getElementById('confettiCanvas'),
    
    // Audio Elements
    celebrationAudio: document.getElementById('celebrationAudio'),
    musicToggleBtn: document.getElementById('musicToggleBtn'),
    musicLabel: document.getElementById('musicLabel'),
    navSoundBtn: document.getElementById('navSoundBtn'),
    navSoundIcon: document.getElementById('navSoundIcon'),
    navSoundText: document.getElementById('navSoundText'),

    // Mobile Navigation & Toggle
    mobileNavToggle: document.getElementById('mobileNavToggle'),
    navLinks: document.getElementById('navLinks'),

    // Mobile Bottom Bar Elements
    mobileDiyaBtn: document.getElementById('mobileDiyaBtn'),
    mobileMusicBtn: document.getElementById('mobileMusicBtn'),
    mobileMusicIcon: document.getElementById('mobileMusicIcon'),
    mobileMusicLabel: document.getElementById('mobileMusicLabel'),
    mobileWhatsAppBtn: document.getElementById('mobileWhatsAppBtn'),

    // Interactive Diya
    diyaGlowWrap: document.getElementById('diyaGlowWrap'),
    lightDiyaBtn: document.getElementById('lightDiyaBtn'),
    lightDiyaBtnText: document.getElementById('lightDiyaBtnText'),
    diyaStatusMsg: document.getElementById('diyaStatusMsg'),

    // Personalization Elements
    greetingRecipient: document.getElementById('greetingRecipient'),
    cardRecipientName: document.getElementById('cardRecipientName'),
    secretLetterRecipient: document.getElementById('secretLetterRecipient'),
    friendNameInput: document.getElementById('friendNameInput'),
    generateLinkBtn: document.getElementById('generateLinkBtn'),
    shareableUrlInput: document.getElementById('shareableUrlInput'),
    copyLinkBtn: document.getElementById('copyLinkBtn'),
    previewCustomLinkBtn: document.getElementById('previewCustomLinkBtn'),
    waMessagePreview: document.getElementById('waMessagePreview'),

    // Hero & Action Buttons
    celebrateNowBtn: document.getElementById('celebrateNowBtn'),
    heroWhatsAppBtn: document.getElementById('heroWhatsAppBtn'),
    quickShareBtn: document.getElementById('quickShareBtn'),
    mainWhatsAppShareBtn: document.getElementById('mainWhatsAppShareBtn'),
    nativeDeviceShareBtn: document.getElementById('nativeDeviceShareBtn'),
    salvoFireworksBtn: document.getElementById('salvoFireworksBtn'),
    burstConfettiBtn: document.getElementById('burstConfettiBtn'),
    restartCelebrationBtn: document.getElementById('restartCelebrationBtn'),
    rePlayWishChimeBtn: document.getElementById('rePlayWishChimeBtn'),

    // Envelope Elements
    surpriseEnvelope: document.getElementById('surpriseEnvelope'),
    waxSealBtn: document.getElementById('waxSealBtn'),
    revealSurpriseBtn: document.getElementById('revealSurpriseBtn'),
    surpriseBtnText: document.getElementById('surpriseBtnText'),
    envelopeHint: document.getElementById('envelopeHint'),

    // Fortune Widget
    fortuneText: document.getElementById('fortuneText'),
    drawFortuneBtn: document.getElementById('drawFortuneBtn'),

    // Live Today Celebration Clock Elements
    liveHours: document.getElementById('liveHours'),
    liveMinutes: document.getElementById('liveMinutes'),
    liveSeconds: document.getElementById('liveSeconds'),
    liveAmPm: document.getElementById('liveAmPm'),

    // Toast
    toast: document.getElementById('toastNotification'),
    toastMsg: document.getElementById('toastMessage')
  };

  // ==========================================================================
  // 3. UTILITY FUNCTIONS (XSS SANITIZATION & TOAST)
  // ==========================================================================
  
  function sanitizeName(str) {
    if (!str || typeof str !== 'string') return '';
    let clean = str.trim().slice(0, 40);
    clean = clean.replace(/[<>'"/\\&;$`]/g, '');
    return clean;
  }

  let toastTimer = null;
  function showToast(message, duration = 3000) {
    if (!DOM.toast || !DOM.toastMsg) return;
    DOM.toastMsg.textContent = message;
    DOM.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      DOM.toast.classList.remove('show');
    }, duration);
  }

  // ==========================================================================
  // 4. MOBILE HAMBURGER MENU TOGGLE
  // ==========================================================================
  function initMobileNav() {
    if (!DOM.mobileNavToggle || !DOM.navLinks) return;

    DOM.mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = DOM.navLinks.classList.toggle('mobile-active');
      DOM.mobileNavToggle.classList.toggle('active', isOpen);
      DOM.mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when any link is clicked
    DOM.navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        DOM.navLinks.classList.remove('mobile-active');
        DOM.mobileNavToggle.classList.remove('active');
        DOM.mobileNavToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#festiveNav')) {
        DOM.navLinks.classList.remove('mobile-active');
        DOM.mobileNavToggle.classList.remove('active');
        DOM.mobileNavToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================================================
  // 5. LIVE TODAY CELEBRATION CLOCK (આજે જ ન્યૂ યર છે!)
  // ==========================================================================
  function initTodayCelebrationClock() {
    function update() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12; // 12-hour format

      if (DOM.liveHours) DOM.liveHours.textContent = String(hours).padStart(2, '0');
      if (DOM.liveMinutes) DOM.liveMinutes.textContent = String(minutes).padStart(2, '0');
      if (DOM.liveSeconds) DOM.liveSeconds.textContent = String(seconds).padStart(2, '0');
      if (DOM.liveAmPm) DOM.liveAmPm.textContent = ampm;
    }

    update();
    setInterval(update, 1000);
  }

  // ==========================================================================
  // 6. URL PERSONALIZATION ENGINE (WITH LIVE ON-PAGE UPDATING)
  // ==========================================================================
  function applyPersonalizedName(name) {
    const sanitized = sanitizeName(name);

    if (sanitized) {
      state.currentRecipient = sanitized;
      if (DOM.greetingRecipient) {
        DOM.greetingRecipient.innerHTML = `વ્હાલા <strong>${sanitized}</strong>, નૂતન વર્ષાભિનંદન!`;
      }
      document.title = `સાલ મુબારક ${sanitized}! | Happy New Year 2027 | Jada Prakash`;
      if (DOM.cardRecipientName) {
        DOM.cardRecipientName.textContent = `${sanitized} અને આપનો પરિવાર`;
      }
      if (DOM.secretLetterRecipient) {
        DOM.secretLetterRecipient.textContent = sanitized;
      }
      if (DOM.friendNameInput) {
        DOM.friendNameInput.value = sanitized;
      }
    } else {
      state.currentRecipient = '';
      if (DOM.greetingRecipient) {
        DOM.greetingRecipient.textContent = 'આજે બેસતું વર્ષ છે • સાલ મુબારક ૨૦૨૭!';
      }
      if (DOM.cardRecipientName) {
        DOM.cardRecipientName.textContent = 'તમે અને તમારો પરિવાર';
      }
      if (DOM.secretLetterRecipient) {
        DOM.secretLetterRecipient.textContent = 'સ્નેહી મિત્ર';
      }
    }

    updateGeneratedShareLinks(state.currentRecipient);
  }

  function initPersonalization() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const rawName = urlParams.get('name') || urlParams.get('n');
      applyPersonalizedName(rawName);
    } catch (e) {
      console.warn('Personalization notice:', e);
    }
  }

  function updateGeneratedShareLinks(name) {
    const baseUrl = window.location.origin + window.location.pathname;
    const finalUrl = name ? `${baseUrl}?name=${encodeURIComponent(name)}` : baseUrl;

    if (DOM.shareableUrlInput) {
      DOM.shareableUrlInput.value = finalUrl;
    }
    if (DOM.previewCustomLinkBtn) {
      DOM.previewCustomLinkBtn.href = finalUrl;
    }

    const greetingLine = name ? `વ્હાલા ${name},\n\n` : '';
    const shareMessage = `🪔✨ શુભ દિપાવલી અને નૂતન વર્ષાભિનંદન! ✨🪔\n🎉 Happy New Year 2027 / સાલ મુબારક! 🎊\n\nઆજે નવું વર્ષ (બેસતું વર્ષ) છે!\n${greetingLine}તમને અને તમારા સમગ્ર પરિવારને નવા વર્ષની ખૂબ ખૂબ શુભકામનાઓ! ❤️\nમા લક્ષ્મીજી તમારા ઘરમાં સુખ, શાંતિ અને સમૃદ્ધિ આપે.\n\n👉 આ ખાસ ડિજિટલ શુભેચ્છા અને ફટાકડા જોવા અહીં ક્લિક કરો:\n${finalUrl}\n\nWith Best Wishes,\n${CONFIG.senderNameGujarati} ❤️`;

    if (DOM.waMessagePreview) {
      DOM.waMessagePreview.textContent = shareMessage;
    }

    return { finalUrl, shareMessage };
  }

  // ==========================================================================
  // 7. AUDIO & WEB AUDIO API ENGINE
  // ==========================================================================
  function getAudioContext() {
    if (!state.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        state.audioCtx = new AudioContext();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
    return state.audioCtx;
  }

  function playCelebrationChime(freq = 587.33, duration = 1.6) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy
    }
  }

  function playFanfareChimes() {
    const notes = [587.33, 739.99, 880.00]; // D5, F#5, A5
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playCelebrationChime(freq, 1.8);
      }, idx * 160);
    });
  }

  function toggleMusic(forceState) {
    if (!DOM.celebrationAudio) return;

    const shouldPlay = forceState !== undefined ? forceState : !state.musicPlaying;

    if (shouldPlay) {
      DOM.celebrationAudio.play()
        .then(() => {
          state.musicPlaying = true;
          updateMusicUI(true);
          showToast('🎵 સંગીત ચાલુ થયું (Music Playing)');
        })
        .catch(err => {
          console.warn('Audio play prevented or file unavailable, using chime engine:', err);
          state.musicPlaying = true;
          updateMusicUI(true);
          playFanfareChimes();
          showToast('🔔 મંગલ નાદ ચાલુ (Chimes active)');
        });
    } else {
      DOM.celebrationAudio.pause();
      state.musicPlaying = false;
      updateMusicUI(false);
      showToast('🔇 સંગીત બંધ કર્યું (Music Paused)');
    }
  }

  function updateMusicUI(isPlaying) {
    if (DOM.musicToggleBtn) {
      DOM.musicToggleBtn.classList.toggle('playing', isPlaying);
    }
    if (DOM.musicLabel) {
      DOM.musicLabel.textContent = isPlaying ? 'Music: ON' : 'Music: OFF';
    }
    if (DOM.navSoundIcon) {
      DOM.navSoundIcon.className = isPlaying ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
    }
    if (DOM.navSoundText) {
      DOM.navSoundText.textContent = isPlaying ? 'વાગે છે' : 'સંગીત';
    }
    if (DOM.mobileMusicIcon) {
      DOM.mobileMusicIcon.className = isPlaying ? 'fa-solid fa-volume-high' : 'fa-solid fa-music';
    }
    if (DOM.mobileMusicLabel) {
      DOM.mobileMusicLabel.textContent = isPlaying ? 'ચાલુ છે' : 'મ્યુઝિક';
    }
  }

  // ==========================================================================
  // 8. FIREWORKS PHYSICS & ANIMATION ENGINE (CANVAS)
  // ==========================================================================
  class FireworksEngine {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas ? canvas.getContext('2d') : null;
      this.fireworks = [];
      this.particles = [];
      this.ambientStars = [];
      this.animFrameId = null;
      this.isRunning = false;
      this.lastAutoLaunch = 0;
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      if (this.ctx) {
        this.resize();
        this.initAmbientStars();
        window.addEventListener('resize', () => this.resize());
      }
    }

    resize() {
      if (!this.canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.ctx.scale(dpr, dpr);
    }

    initAmbientStars() {
      this.ambientStars = [];
      const count = Math.floor(this.width < 768 ? 35 : 70);
      for (let i = 0; i < count; i++) {
        this.ambientStars.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.02 + 0.005,
          color: Math.random() > 0.3 ? '#fef08a' : '#ffffff'
        });
      }
    }

    start() {
      if (this.isRunning || !this.ctx) return;
      this.isRunning = true;
      this.loop(performance.now());
    }

    stop() {
      this.isRunning = false;
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
      }
    }

    createRocket(startX, targetX, targetY) {
      const palette = FIREWORK_PALETTES[Math.floor(Math.random() * FIREWORK_PALETTES.length)];
      this.fireworks.push({
        x: startX || Math.random() * this.width,
        y: this.height,
        targetX: targetX !== undefined ? targetX : Math.random() * (this.width - 160) + 80,
        targetY: targetY !== undefined ? targetY : Math.random() * (this.height * 0.45) + 60,
        speed: Math.random() * 3 + 8,
        palette: palette
      });
    }

    explode(x, y, palette) {
      const colors = palette || FIREWORK_PALETTES[Math.floor(Math.random() * FIREWORK_PALETTES.length)];
      const particleCount = Math.floor(this.width < 768 ? 40 : 75);
      
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        this.particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.018 + 0.012,
          gravity: 0.08,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 2.5 + 1.2,
          sparkle: Math.random() > 0.4
        });
      }
    }

    launchSalvo(count = 6) {
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const sx = Math.random() * (this.width * 0.7) + (this.width * 0.15);
          const tx = sx + (Math.random() * 100 - 50);
          const ty = Math.random() * (this.height * 0.4) + 60;
          this.createRocket(sx, tx, ty);
        }, i * 200);
      }
    }

    loop(currentTime) {
      if (!this.isRunning) return;

      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.globalCompositeOperation = 'lighter';

      for (let star of this.ambientStars) {
        star.alpha += Math.sin(currentTime * star.speed) * 0.015;
        const clampedAlpha = Math.max(0.1, Math.min(1, star.alpha));
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = star.color;
        this.ctx.globalAlpha = clampedAlpha;
        this.ctx.fill();
      }
      this.ctx.globalAlpha = 1;

      for (let i = this.fireworks.length - 1; i >= 0; i--) {
        const fw = this.fireworks[i];
        const dx = fw.targetX - fw.x;
        const dy = fw.targetY - fw.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < fw.speed || fw.y <= fw.targetY) {
          this.explode(fw.targetX, fw.targetY, fw.palette);
          this.fireworks.splice(i, 1);
        } else {
          fw.x += (dx / dist) * fw.speed;
          fw.y += (dy / dist) * fw.speed;

          this.ctx.beginPath();
          this.ctx.arc(fw.x, fw.y, 2.5, 0, Math.PI * 2);
          this.ctx.fillStyle = fw.palette[0];
          this.ctx.fill();

          this.ctx.beginPath();
          this.ctx.arc(fw.x + (Math.random() * 2 - 1), fw.y + 3, 1.2, 0, Math.PI * 2);
          this.ctx.fillStyle = '#fef08a';
          this.ctx.fill();
        }
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
        } else {
          this.ctx.save();
          this.ctx.globalAlpha = p.alpha;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.ctx.fillStyle = p.sparkle && Math.random() > 0.5 ? '#ffffff' : p.color;
          this.ctx.fill();
          this.ctx.restore();
        }
      }

      if (currentTime - this.lastAutoLaunch > 2800) {
        this.createRocket();
        this.lastAutoLaunch = currentTime;
      }

      this.animFrameId = requestAnimationFrame((t) => this.loop(t));
    }
  }

  // ==========================================================================
  // 9. GOLDEN CONFETTI ENGINE (CANVAS)
  // ==========================================================================
  class ConfettiEngine {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas ? canvas.getContext('2d') : null;
      this.confettiPieces = [];
      this.animFrameId = null;
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      if (this.ctx) {
        this.resize();
        window.addEventListener('resize', () => this.resize());
      }
    }

    resize() {
      if (!this.canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.ctx.scale(dpr, dpr);
    }

    burst(count = 100) {
      if (!this.ctx) return;
      const colors = ['#ffd700', '#f59e0b', '#fde68a', '#25d366', '#ef4444', '#38bdf8', '#ffffff'];
      const adjustedCount = Math.floor(this.width < 768 ? count * 0.6 : count);

      for (let i = 0; i < adjustedCount; i++) {
        this.confettiPieces.push({
          x: Math.random() * this.width,
          y: -20,
          w: Math.random() * 9 + 5,
          h: Math.random() * 5 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: Math.random() * 4 - 2,
          vy: Math.random() * 4 + 3,
          rot: Math.random() * 360,
          rotSpeed: Math.random() * 8 - 4,
          opacity: 1,
          shape: Math.random() > 0.4 ? 'rect' : 'circle'
        });
      }

      if (!this.animFrameId) {
        this.loop();
      }
    }

    loop() {
      if (!this.ctx) return;

      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = this.confettiPieces.length - 1; i >= 0; i--) {
        const c = this.confettiPieces[i];
        c.x += c.vx;
        c.y += c.vy;
        c.rot += c.rotSpeed;

        if (c.y > this.height - 100) {
          c.opacity -= 0.02;
        }

        if (c.y > this.height || c.opacity <= 0) {
          this.confettiPieces.splice(i, 1);
        } else {
          this.ctx.save();
          this.ctx.translate(c.x, c.y);
          this.ctx.rotate((c.rot * Math.PI) / 180);
          this.ctx.globalAlpha = Math.max(0, c.opacity);
          this.ctx.fillStyle = c.color;

          if (c.shape === 'circle') {
            this.ctx.beginPath();
            this.ctx.arc(0, 0, c.w / 2, 0, Math.PI * 2);
            this.ctx.fill();
          } else {
            this.ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
          }
          this.ctx.restore();
        }
      }

      if (this.confettiPieces.length > 0) {
        this.animFrameId = requestAnimationFrame(() => this.loop());
      } else {
        this.animFrameId = null;
        this.ctx.clearRect(0, 0, this.width, this.height);
      }
    }
  }

  // ==========================================================================
  // 10. INTERACTIVE DIYA LIGHTING (દીવો પ્રગટાવો)
  // ==========================================================================
  function initInteractiveDiya(fireworks, confetti) {
    function triggerLightDiya() {
      state.diyaLit = !state.diyaLit;

      if (DOM.diyaGlowWrap) {
        DOM.diyaGlowWrap.classList.toggle('lit', state.diyaLit);
      }

      if (state.diyaLit) {
        if (DOM.lightDiyaBtnText) {
          DOM.lightDiyaBtnText.textContent = '✨ દીપક પ્રજ્વલિત છે! (Diya is Lit)';
        }
        if (DOM.diyaStatusMsg) {
          DOM.diyaStatusMsg.innerHTML = '✨ <strong>મા લક્ષ્મીજીની કૃપા સદા તમારા પરિવાર પર રહે! નૂતન વર્ષાભિનંદન!</strong> ✨';
        }
        playFanfareChimes();
        if (confetti) confetti.burst(130);
        if (fireworks) fireworks.launchSalvo(4);
        showToast('🪔 મંગલ દીપ પ્રગટાવ્યો! સાલ મુબારક!');
      } else {
        if (DOM.lightDiyaBtnText) {
          DOM.lightDiyaBtnText.textContent = '🪔 દીવો પ્રગટાવો (Tap to Light Diya)';
        }
        if (DOM.diyaStatusMsg) {
          DOM.diyaStatusMsg.textContent = 'દીવા પર ક્લિક કરો અને નવા વર્ષના આશીર્વાદ મેળવો!';
        }
        showToast('દીપક શાંત થયો');
      }
    }

    if (DOM.lightDiyaBtn) {
      DOM.lightDiyaBtn.addEventListener('click', triggerLightDiya);
    }
    if (DOM.diyaGlowWrap) {
      DOM.diyaGlowWrap.addEventListener('click', triggerLightDiya);
    }

    // Mobile Bottom Bar Diya Button
    if (DOM.mobileDiyaBtn) {
      DOM.mobileDiyaBtn.addEventListener('click', () => {
        const diyaSection = document.getElementById('diyaSection');
        if (diyaSection) {
          diyaSection.scrollIntoView({ behavior: 'smooth' });
        }
        if (!state.diyaLit) {
          setTimeout(triggerLightDiya, 400);
        }
      });
    }
  }

  // ==========================================================================
  // 11. INTERACTIVE 3D SURPRISE ENVELOPE
  // ==========================================================================
  function initSurpriseEnvelope(fireworks, confetti) {
    function toggleEnvelope() {
      state.envelopeOpen = !state.envelopeOpen;
      if (DOM.surpriseEnvelope) {
        DOM.surpriseEnvelope.classList.toggle('open', state.envelopeOpen);
      }

      if (state.envelopeOpen) {
        if (DOM.surpriseBtnText) DOM.surpriseBtnText.textContent = 'પરબિડીયું બંધ કરો (Close)';
        if (DOM.envelopeHint) DOM.envelopeHint.textContent = '✨ શુભ આશીર્વાદ સંદેશ! મા લક્ષ્મીજીની સદા કૃપા રહે!';
        
        playFanfareChimes();
        if (confetti) confetti.burst(120);
        if (fireworks) fireworks.launchSalvo(3);
      } else {
        if (DOM.surpriseBtnText) DOM.surpriseBtnText.textContent = 'પરબિડીયું ખોલો (Open Royal Envelope)';
        if (DOM.envelopeHint) DOM.envelopeHint.textContent = 'ઉપરના સીલ પર ક્લિક કરીને ગુપ્ત શુભેચ્છા વાંચો!';
      }
    }

    if (DOM.waxSealBtn) {
      DOM.waxSealBtn.addEventListener('click', toggleEnvelope);
      DOM.waxSealBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleEnvelope();
        }
      });
    }

    if (DOM.revealSurpriseBtn) {
      DOM.revealSurpriseBtn.addEventListener('click', toggleEnvelope);
    }
  }

  // ==========================================================================
  // 12. GUJARATI FORTUNE GENERATOR
  // ==========================================================================
  function initFortuneGenerator() {
    let lastIndex = 0;
    if (!DOM.drawFortuneBtn || !DOM.fortuneText) return;

    DOM.drawFortuneBtn.addEventListener('click', () => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * FORTUNES_GUJARATI.length);
      } while (nextIndex === lastIndex && FORTUNES_GUJARATI.length > 1);
      lastIndex = nextIndex;

      DOM.fortuneText.style.opacity = '0';
      setTimeout(() => {
        DOM.fortuneText.textContent = `"${FORTUNES_GUJARATI[nextIndex]}"`;
        DOM.fortuneText.style.opacity = '1';
        playCelebrationChime(659.25, 0.8);
      }, 200);
    });
  }

  // ==========================================================================
  // 13. 3D CARD TILT EFFECT
  // ==========================================================================
  function initCardTilt() {
    const cards = document.querySelectorAll('[data-tilt]');
    if (!cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // ==========================================================================
  // 14. VIRAL SHARING & WHATSAPP ENGINE
  // ==========================================================================
  function initSharingHandlers(confetti) {
    if (DOM.generateLinkBtn && DOM.friendNameInput) {
      DOM.generateLinkBtn.addEventListener('click', () => {
        const name = sanitizeName(DOM.friendNameInput.value);
        if (!name) {
          showToast('કૃપા કરીને પહેલાં નામ લખો! 😊');
          DOM.friendNameInput.focus();
          return;
        }
        applyPersonalizedName(name);
        showToast(`✨ ${name} માટે ખાસ લિંક બની ગઈ છે!`);
        if (confetti) confetti.burst(60);
      });

      DOM.friendNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          DOM.generateLinkBtn.click();
        }
      });
    }

    if (DOM.copyLinkBtn && DOM.shareableUrlInput) {
      DOM.copyLinkBtn.addEventListener('click', () => {
        const urlToCopy = DOM.shareableUrlInput.value || window.location.href;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(urlToCopy)
            .then(() => showToast('📋 લિંક કોપી થઈ ગઈ! હવે WhatsApp પર મોકલો!'))
            .catch(() => fallbackCopy(urlToCopy));
        } else {
          fallbackCopy(urlToCopy);
        }
      });
    }

    function fallbackCopy(text) {
      try {
        const input = document.createElement('textarea');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showToast('📋 લિંક કોપી થઈ ગઈ!');
      } catch (e) {
        showToast('લિંક કોપી થઈ શકી નહીં. કૃપા કરીને જાતે કોપી કરો.');
      }
    }

    function handleWhatsAppShare() {
      const recipient = DOM.friendNameInput ? sanitizeName(DOM.friendNameInput.value) : state.currentRecipient;
      const { shareMessage } = updateGeneratedShareLinks(recipient);
      const encodedMsg = encodeURIComponent(shareMessage);
      const waUrl = `https://api.whatsapp.com/send?text=${encodedMsg}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }

    if (DOM.heroWhatsAppBtn) DOM.heroWhatsAppBtn.addEventListener('click', handleWhatsAppShare);
    if (DOM.quickShareBtn) DOM.quickShareBtn.addEventListener('click', handleWhatsAppShare);
    if (DOM.mainWhatsAppShareBtn) DOM.mainWhatsAppShareBtn.addEventListener('click', handleWhatsAppShare);
    if (DOM.mobileWhatsAppBtn) DOM.mobileWhatsAppBtn.addEventListener('click', handleWhatsAppShare);

    if (DOM.nativeDeviceShareBtn) {
      DOM.nativeDeviceShareBtn.addEventListener('click', () => {
        const recipient = DOM.friendNameInput ? sanitizeName(DOM.friendNameInput.value) : state.currentRecipient;
        const { finalUrl, shareMessage } = updateGeneratedShareLinks(recipient);

        if (navigator.share) {
          navigator.share({
            title: `આજે બેસતું વર્ષ છે! શુભ દિપાવલી અને નૂતન વર્ષાભિનંદન ૨૦૨૭ | Jada Prakash`,
            text: shareMessage,
            url: finalUrl
          }).catch(err => {
            if (err.name !== 'AbortError') {
              handleWhatsAppShare();
            }
          });
        } else {
          handleWhatsAppShare();
        }
      });
    }
  }

  // ==========================================================================
  // 15. MASTER INITIALIZATION & EVENT LISTENERS
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    const fireworks = new FireworksEngine(DOM.fireworksCanvas);
    const confetti = new ConfettiEngine(DOM.confettiCanvas);
    
    fireworks.start();
    
    setTimeout(() => {
      confetti.burst(100);
    }, 600);

    initMobileNav();
    initTodayCelebrationClock();
    initPersonalization();
    initInteractiveDiya(fireworks, confetti);
    initSurpriseEnvelope(fireworks, confetti);
    initFortuneGenerator();
    initCardTilt();
    initSharingHandlers(confetti);

    if (DOM.musicToggleBtn) {
      DOM.musicToggleBtn.addEventListener('click', () => toggleMusic());
    }
    if (DOM.navSoundBtn) {
      DOM.navSoundBtn.addEventListener('click', () => toggleMusic());
    }
    if (DOM.mobileMusicBtn) {
      DOM.mobileMusicBtn.addEventListener('click', () => toggleMusic());
    }
    if (DOM.rePlayWishChimeBtn) {
      DOM.rePlayWishChimeBtn.addEventListener('click', () => {
        playFanfareChimes();
        showToast('🔔 મંગલ નાદ થયો!');
      });
    }

    if (DOM.celebrateNowBtn) {
      DOM.celebrateNowBtn.addEventListener('click', () => {
        fireworks.launchSalvo(8);
        confetti.burst(150);
        playFanfareChimes();

        if (!state.musicPlaying) {
          toggleMusic(true);
        }

        const wishesSection = document.getElementById('diyaSection');
        if (wishesSection) {
          wishesSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    if (DOM.salvoFireworksBtn) {
      DOM.salvoFireworksBtn.addEventListener('click', () => {
        fireworks.launchSalvo(8);
        playCelebrationChime(783.99, 1.2);
        showToast('🎆 ફટાકડાની રમઝટ શરૂ!');
      });
    }

    if (DOM.burstConfettiBtn) {
      DOM.burstConfettiBtn.addEventListener('click', () => {
        confetti.burst(140);
        playCelebrationChime(659.25, 0.8);
        showToast('🎊 રંગબેરંગી ફૂલોની વર્ષા!');
      });
    }

    if (DOM.restartCelebrationBtn) {
      DOM.restartCelebrationBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          fireworks.launchSalvo(8);
          confetti.burst(160);
          playFanfareChimes();
          showToast('🎉 ફરીથી ઉજવણી શરૂ થઈ! સાલ મુબારક ૨૦૨૭!');
        }, 400);
      });
    }

    // Tap/Click fireworks on screen
    window.addEventListener('click', (e) => {
      if (e.target.closest('button, a, input, select, textarea, .wax-seal-wrapper, .floating-btn, .mobile-bottom-bar, .diya-glow-wrapper, .mobile-nav-toggle')) {
        return;
      }
      fireworks.explode(e.clientX, e.clientY);
      playCelebrationChime(Math.random() * 300 + 400, 0.5);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        fireworks.stop();
      } else {
        fireworks.start();
      }
    });

    console.log('✨ આજે નવું વર્ષ છે! વેબસાઇટ સફળતાપૂર્વક લોડ થઈ ગઈ!');
  });

})();
