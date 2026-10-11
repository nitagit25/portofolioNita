/**
 * ROBOTICS PROGRAMMER PORTFOLIO - KAWAII TECH INTERACTIVE SCRIPT
 * Features:
 * - Cute interactive click particles (floating hearts & sparkles)
 * - Clickable cute robot mascot with dynamic cheerful speech bubbles
 * - Navbar scroll spy & glassmorphism effect
 * - Mobile hamburger navigation
 * - Copy to clipboard with cute toast alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM Elements
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailVal = document.getElementById('emailVal');
  const toast = document.getElementById('toastNotification');
  const cvBtn = document.getElementById('cvBtn');
  const robotAvatar = document.querySelector('.cute-robot-avatar');
  const speechBubble = document.querySelector('.robot-speech-bubble span');

  // 2. Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 4. Scroll Spy: Active Link Highlighting
  const sections = document.querySelectorAll('section[id]');
  function highlightActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 130;
      const sectionId = current.getAttribute('id');
      const relatedLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (relatedLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          relatedLink.classList.add('active');
        } else {
          relatedLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav);

  // 5. Toast Notification Helper
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 6. Copy Email to Clipboard
  if (copyEmailBtn && emailVal) {
    copyEmailBtn.addEventListener('click', () => {
      const textToCopy = emailVal.textContent.trim();
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            showToast('Email berhasil disalin ke clipboard! 💖✨');
          })
          .catch(() => {
            fallbackCopy(textToCopy);
          });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Email berhasil disalin ke clipboard! 💖');
    } catch (err) {
      showToast('Gagal menyalin email otomatis.');
    }
    document.body.removeChild(textArea);
  }

  // 7. CV Button Reminder
  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('CV resmi akan siap diunduh setelah file PDF ditambahkan! 🌸');
    });
  }

  // 8. CUTE ROBOT MASCOT INTERACTION (Click the robot!)
  if (robotAvatar && speechBubble) {
    const robotQuotes = [
      'Bip-bup! Siap memprogram ESP32! 🌸',
      'PWM duty-cycle motor sudah terkalibrasi! ⚡',
      'Sensor ToF VL53L0X mendeteksi dengan presisi! 💖',
      'Semangat melamar Robotics Programmer! ✨',
      'Logika C/C++ deterministik & anti-noise! 🤖',
      'Bangga jadi mahasiswa Teknik Komputer PENS! 💜'
    ];
    let quoteIndex = 0;

    robotAvatar.addEventListener('click', () => {
      quoteIndex = (quoteIndex + 1) % robotQuotes.length;
      speechBubble.textContent = robotQuotes[quoteIndex];

      // Add a little bounce effect on click
      robotAvatar.style.transform = 'scale(1.15) rotate(5deg)';
      setTimeout(() => {
        robotAvatar.style.transform = '';
      }, 300);
    });
  }

  // 9. CUTE CLICK PARTICLE EFFECT (Floating Hearts & Sparkles anywhere)
  const cuteIcons = ['💖', '🌸', '✨', '💜', '⭐', '🎀'];

  document.addEventListener('click', (e) => {
    // Avoid creating particles if clicking links or buttons
    if (e.target.closest('a') || e.target.closest('button')) return;

    const heart = document.createElement('span');
    heart.className = 'click-heart';
    heart.textContent = cuteIcons[Math.floor(Math.random() * cuteIcons.length)];
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1000);
  });

  // 10. Console Greeting
  console.log(
    '%c🌸 [ROBOTICS.DEV] 💜%c Kawaii Robotics Programmer Theme Activated! ✨',
    'color: #f472b6; font-weight: bold; background: #120924; padding: 6px 12px; border-radius: 999px; border: 1px solid #c084fc;',
    'color: #d8b4fe; padding: 4px; font-weight: bold;'
  );
});
