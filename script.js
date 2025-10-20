// Birthday Website Interactive Features

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
    initializeWishesForm();
    initializeAnimations();
    createFloatingHearts();
});

// Birthday Countdown Timer
function initializeCountdown() {
    // Set next birthday date (you can modify this)
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextBirthday = new Date(currentYear, today.getMonth(), today.getDate() + 1); // Tomorrow as example
    
    // If birthday has passed this year, set for next year
    if (nextBirthday <= today) {
        nextBirthday.setFullYear(currentYear + 1);
    }
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = nextBirthday - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;
        } else {
            // Birthday is here!
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Blow Candles Animation
function blowCandles() {
    const candles = document.querySelector('.candles');
    const button = document.querySelector('.blow-candles-btn');
    
    // Add blown class to candles
    candles.classList.add('blown');
    
    // Create confetti effect
    createConfetti();
    
    // Show birthday message
    setTimeout(() => {
        showBirthdayMessage();
    }, 1000);
    
    // Disable button
    button.disabled = true;
    button.textContent = 'Wish Granted! 🎉';
    button.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
}

// Create Confetti Effect
function createConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 50);
    }
}

// Show Birthday Message
function showBirthdayMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b6b, #feca57);
        color: white;
        padding: 2rem;
        border-radius: 20px;
        text-align: center;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 1001;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: popIn 0.5s ease-out;
    `;
    
    message.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
        <div>Happy Birthday Mom!</div>
        <div style="font-size: 1rem; margin-top: 0.5rem; opacity: 0.9;">May all your wishes come true!</div>
    `;
    
    // Add popIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.style.animation = 'popIn 0.5s ease-out reverse';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 500);
    }, 3000);
}

// Wishes Form Handler
function initializeWishesForm() {
    const form = document.getElementById('wishesForm');
    const wishesDisplay = document.getElementById('wishesDisplay');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const textarea = form.querySelector('textarea');
        const message = textarea.value.trim();
        
        if (message) {
            // Add wish to display
            const wishElement = document.createElement('div');
            wishElement.style.cssText = `
                background: linear-gradient(45deg, #ff6b6b, #feca57);
                color: white;
                padding: 1rem;
                border-radius: 15px;
                margin: 0.5rem 0;
                animation: slideInUp 0.5s ease-out;
            `;
            wishElement.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.5rem;">💌</span>
                    <span>${message}</span>
                </div>
            `;
            
            wishesDisplay.appendChild(wishElement);
            textarea.value = '';
            
            // Show success message
            showToast('Wish sent with love! 💖');
        }
    });
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #4CAF50, #45a049);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 1002;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    toast.textContent = message;
    
    // Add slideInRight animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Initialize Animations
function initializeAnimations() {
    // Animate message cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.6s ease-out';
            }
        });
    }, observerOptions);
    
    // Observe all message cards and fact cards
    document.querySelectorAll('.message-card, .fact-card').forEach(card => {
        observer.observe(card);
    });
}

// Create Floating Hearts
function createFloatingHearts() {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            const heart = document.createElement('div');
            heart.innerHTML = ['💖', '💕', '💗', '💝', '💖'][Math.floor(Math.random() * 5)];
            heart.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                bottom: -50px;
                font-size: 2rem;
                z-index: 1;
                pointer-events: none;
                animation: float 6s ease-in-out forwards;
            `;
            
            document.body.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 6000);
        }
    }, 2000);
}

// Add touch interactions for mobile
document.addEventListener('touchstart', function(e) {
    // Add ripple effect on touch
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        left: ${e.touches[0].clientX - 25}px;
        top: ${e.touches[0].clientY - 25}px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        pointer-events: none;
        z-index: 1000;
        animation: ripple 0.6s ease-out;
    `;
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
});

// Add shake animation for fun
function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Add shake animation CSS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Make cake clickable for fun
document.addEventListener('DOMContentLoaded', function() {
    const cake = document.getElementById('birthday-cake');
    if (cake) {
        cake.addEventListener('click', function() {
            shakeElement(this);
            showToast('Cake is ready! 🎂');
        });
    }
});

// Add some fun interactions
document.addEventListener('click', function(e) {
    // Create sparkle effect on random clicks
    if (Math.random() < 0.1) { // 10% chance
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 1000;
            animation: sparkle 1s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
});

// Add birthday song (optional - plays on first interaction)
let songPlayed = false;
document.addEventListener('click', function() {
    if (!songPlayed) {
        songPlayed = true;
        // You can add a birthday song here if desired
        console.log('🎵 Happy Birthday to you! 🎵');
    }
});
