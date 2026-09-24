/* ==========================================================================
   NILAM'S BIRTHDAY CELEBRATION WEBSITE - JAVASCRIPT (script.js)
   Passcode Login Gate, Canvas Confetti, 3D Card Flip, Candle Blowing &
   Video Clip Controls
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. FLOATING BALLOONS GENERATOR
    // ----------------------------------------------------
    const balloonsContainer = document.getElementById('balloons-container');
    const balloonColors = ['#E8A598', '#B76E79', '#A47BFF', '#7C4DFF', '#FFD700', '#F7D0C8'];

    function createBalloons(count = 16) {
        if (!balloonsContainer) return;
        for (let i = 0; i < count; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            
            const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            const left = Math.random() * 100;
            const size = Math.random() * 25 + 40;
            const duration = Math.random() * 8 + 10;
            const delay = Math.random() * 10;
            
            balloon.style.background = `radial-gradient(circle at 30% 30%, #FFF 0%, ${color} 70%)`;
            balloon.style.left = `${left}%`;
            balloon.style.width = `${size}px`;
            balloon.style.height = `${size * 1.3}px`;
            balloon.style.animationDuration = `${duration}s`;
            balloon.style.animationDelay = `${delay}s`;
            
            balloonsContainer.appendChild(balloon);
        }
    }
    createBalloons(18);

    // ----------------------------------------------------
    // 2. CANVAS CONFETTI ENGINE
    // ----------------------------------------------------
    function triggerConfettiBurst(particleCount = 100, originY = 0.6) {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: particleCount,
                spread: 90,
                origin: { y: originY },
                colors: ['#E8A598', '#B76E79', '#7C4DFF', '#FFD700', '#FFFFFF']
            });
        }
    }

    // ----------------------------------------------------
    // 3. PASSCODE LOGIN / SECRET GATE
    // ----------------------------------------------------
    const loginForm = document.getElementById('login-form');
    const passInput = document.getElementById('passcode-input');
    const loginGate = document.getElementById('login-gate');
    const mainWebsite = document.getElementById('main-website');
    const loginError = document.getElementById('login-error');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = passInput.value.trim().toLowerCase();

            if (val === 'nilam') {
                // Correct passcode typed!
                if (loginError) loginError.classList.add('hidden');
                
                triggerConfettiBurst(160, 0.4);
                playSparkleSound();

                // Fade out login gate
                loginGate.style.opacity = '0';
                loginGate.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    loginGate.style.display = 'none';
                    mainWebsite.classList.remove('hidden');
                    
                    // Trigger welcome burst
                    triggerConfettiBurst(100, 0.5);
                }, 500);

            } else {
                // Invalid passcode
                if (loginError) loginError.classList.remove('hidden');
                passInput.focus();
                passInput.select();
            }
        });
    }

    function playSparkleSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(587.33, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } catch (e) {}
    }

    // ----------------------------------------------------
    // 5. CANDLE BLOWING & CAKE SURPRISE
    // ----------------------------------------------------
    const blowCandlesBtn = document.getElementById('blow-candles-btn');
    const flames = document.querySelectorAll('.flame');
    const smokes = document.querySelectorAll('.smoke');
    const cakeWishMsg = document.getElementById('cake-wish-message');

    if (blowCandlesBtn) {
        blowCandlesBtn.addEventListener('click', () => {
            flames.forEach(flame => flame.classList.add('extinguished'));
            smokes.forEach(smoke => smoke.classList.add('active'));
            
            triggerConfettiBurst(140, 0.5);
            playSparkleSound();

            if (cakeWishMsg) cakeWishMsg.classList.remove('hidden');

            blowCandlesBtn.innerHTML = '<i class="fa-solid fa-star"></i> Candles Blown Out! Wish Granted! ✨';
            blowCandlesBtn.style.background = 'linear-gradient(135deg, #27C93F, #1E822B)';
            blowCandlesBtn.style.color = '#FFF';
        });
    }

    // ----------------------------------------------------
    // 6. FEATURED VIDEO CLIP PLAYER
    // ----------------------------------------------------
    const videoElem = document.getElementById('birthday-video');
    const customPlayBtn = document.getElementById('custom-play-overlay');
    const fullscreenVideoBtn = document.getElementById('fullscreen-video-btn');

    if (videoElem && customPlayBtn) {
        customPlayBtn.addEventListener('click', () => {
            videoElem.play();
            customPlayBtn.style.display = 'none';
        });

        videoElem.addEventListener('play', () => {
            if (customPlayBtn) customPlayBtn.style.display = 'none';
        });

        videoElem.addEventListener('pause', () => {
            if (customPlayBtn) customPlayBtn.style.display = 'flex';
        });
    }

    if (fullscreenVideoBtn && videoElem) {
        fullscreenVideoBtn.addEventListener('click', () => {
            if (videoElem.requestFullscreen) videoElem.requestFullscreen();
            else if (videoElem.webkitRequestFullscreen) videoElem.webkitRequestFullscreen();
        });
    }

    // ----------------------------------------------------
    // 7. INTERACTIVE 3D WISH CARD / LETTER
    // ----------------------------------------------------
    const interactiveCard = document.getElementById('interactive-card');
    const closeCardBtn = document.querySelector('.close-card-btn');

    if (interactiveCard) {
        interactiveCard.addEventListener('click', (e) => {
            if (e.target.closest('.close-card-btn')) return;
            if (!interactiveCard.classList.contains('flipped')) {
                interactiveCard.classList.add('flipped');
                triggerConfettiBurst(90, 0.5);
                playSparkleSound();
            }
        });
    }

    if (closeCardBtn && interactiveCard) {
        closeCardBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            interactiveCard.classList.remove('flipped');
        });
    }

    // ----------------------------------------------------
    // 8. POLAROID GALLERY LIGHTBOX
    // ----------------------------------------------------
    const polaroidCards = document.querySelectorAll('.polaroid-card');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    polaroidCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const caption = card.dataset.caption || '';

            if (img && lightboxModal && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxCaption.textContent = caption;
                lightboxModal.style.display = 'flex';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => lightboxModal.style.display = 'none');
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) lightboxModal.style.display = 'none';
        });
    }

});
