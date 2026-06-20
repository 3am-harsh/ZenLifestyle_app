// Collection of Zen and motivational quotes
const quotes = [
    "\"Quiet the mind, and the soul will speak.\"",
    "\"The present moment is filled with joy and happiness. If you are attentive, you will see it.\"",
    "\"Flow with whatever may happen, and let your mind be free.\"",
    "\"In the beginner's mind there are many possibilities, but in the expert's there are few.\"",
    "\"Water does not resist. Water flows.\"",
    "\"Discipline is the bridge between goals and accomplishment.\"",
    "\"Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\"",
    "\"Fall seven times, stand up eight.\""
];

// Elements
const quoteElement = document.getElementById('quote-text');
const zazenBtn = document.getElementById('btn-zazen');
const kenzenBtn = document.getElementById('btn-kenzen');

let currentQuoteIndex = 0;

// Function to cycle quotes smoothly
function changeQuote() {
    // Start fade out
    quoteElement.classList.add('quote-fade-out');
    
    setTimeout(() => {
        // Change text while invisible
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        quoteElement.textContent = quotes[currentQuoteIndex];
        
        // Remove fade out, add fade in
        quoteElement.classList.remove('quote-fade-out');
        
        // Very tiny delay to ensure CSS registers the class change for the transition
        setTimeout(() => {
            quoteElement.classList.add('quote-fade-in');
        }, 50);
        
    }, 1000); // 1s matches the CSS transition time
}

// Change quote every 6 seconds
setInterval(changeQuote, 6000);

// Screens & Overlays
const homeScreen = document.getElementById('home-screen');
const transitionScreen = document.getElementById('transition-screen');
const kenzenGoalsScreen = document.getElementById('kenzen-goals-screen');
const transitionKanji = document.getElementById('transition-kanji');
const transitionTranslation = document.getElementById('transition-translation');

// Interaction handlers for the paths
function handleSelection(type) {
    const selectedCard = type === 'zazen' ? zazenBtn : kenzenBtn;
    selectedCard.classList.add('selected');
    
    setTimeout(() => {
        // Fade out home screen
        homeScreen.style.transition = 'opacity 1s ease';
        homeScreen.style.opacity = '0';
        
        setTimeout(() => {
            homeScreen.classList.add('hidden');
            
            // Setup transition screen content
            if (type === 'zazen') {
                transitionKanji.textContent = '坐禅';
                transitionTranslation.textContent = 'Calming the mind';
            } else {
                transitionKanji.textContent = '剣禅一如';
                transitionTranslation.textContent = 'Sword and Zen are One';
            }
            
            // Show transition overlay
            transitionScreen.classList.remove('hidden');
            // Slight delay to ensure display:block takes effect before changing opacity
            setTimeout(() => {
                transitionScreen.classList.add('visible');
            }, 50);

            // After 3 seconds, fade out transition and show next screen
            setTimeout(() => {
                transitionScreen.classList.remove('visible');
                
                setTimeout(() => {
                    transitionScreen.classList.add('hidden');
                    
                    if (type === 'kenzen') {
                        if (localStorage.getItem('zen_onboarded') === 'true') {
                            // Directly send to homepage
                            homeDashboard.classList.remove('hidden');
                            homeDashboard.style.opacity = '0';
                            setTimeout(() => {
                                homeDashboard.style.transition = 'opacity 1s ease';
                                homeDashboard.style.opacity = '1';
                            }, 50);
                        } else {
                            // Show Kenzen goals screen
                            kenzenGoalsScreen.classList.remove('hidden');
                        }
                    } else {
                        // For now, if Zazen is clicked, just alert
                        alert('Zazen path coming next!');
                        homeScreen.classList.remove('hidden');
                        homeScreen.style.opacity = '1';
                        selectedCard.classList.remove('selected');
                    }
                }, 1500); // Wait for transition fade out
            }, 3000); // How long the transition screen stays visible

        }, 1000); // Wait for home screen fade out
    }, 400);
}

// Goals Selection Logic
const goalCards = document.querySelectorAll('.goal-card');
const btnContinueGoals = document.getElementById('btn-continue-goals');
let selectedGoals = [];

goalCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
        const goal = card.getAttribute('data-goal');
        
        if (selectedGoals.includes(goal)) {
            selectedGoals = selectedGoals.filter(g => g !== goal);
        } else {
            selectedGoals.push(goal);
        }
        
        // Enable continue button if at least one goal is selected
        btnContinueGoals.disabled = selectedGoals.length === 0;
    });
});

const loadingScreen = document.getElementById('loading-screen');
const loadingText = document.getElementById('loading-text');
const chapterOneScreen = document.getElementById('chapter-one-screen');
const startJourneyScreen = document.getElementById('start-journey-screen');
const btnStartJourney = document.getElementById('btn-start-journey');

const loadingPhrases = [
    "Going through samurai texts...",
    "Decoding ancient philosophy...",
    "Forging your path..."
];

btnContinueGoals.addEventListener('click', () => {
    // Fade out goals screen
    kenzenGoalsScreen.style.transition = 'opacity 1s ease';
    kenzenGoalsScreen.style.opacity = '0';
    
    setTimeout(() => {
        kenzenGoalsScreen.classList.add('hidden');
        
        // Show loading screen FIRST
        loadingScreen.classList.remove('hidden');
        setTimeout(() => {
            loadingScreen.classList.add('visible');
        }, 50);

        // Cycle through loading phrases
        let phraseIndex = 0;
        const phraseInterval = setInterval(() => {
            phraseIndex++;
            if (phraseIndex < loadingPhrases.length) {
                loadingText.style.opacity = '0';
                setTimeout(() => {
                    loadingText.textContent = loadingPhrases[phraseIndex];
                    loadingText.style.opacity = '1';
                }, 500); // Wait for fade out
            }
        }, 2000); // Change phrase every 2 seconds

        // End loading screen after 6.5 seconds
        setTimeout(() => {
            clearInterval(phraseInterval);
            loadingScreen.classList.remove('visible');
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                
                // Show start journey screen SECOND
                startJourneyScreen.classList.remove('hidden');
                startJourneyScreen.style.opacity = '0'; // Ensure opacity starts at 0 for fade in
                setTimeout(() => {
                    startJourneyScreen.style.transition = 'opacity 1s ease';
                    startJourneyScreen.style.opacity = '1';
                    window.scrollTo(0, 0);
                }, 50);
            }, 1500); // Wait for loading screen fade out
        }, 6500);

    }, 1000); // Wait for goals screen fade out
});

btnStartJourney.addEventListener('click', () => {
    // Fade out start journey screen
    startJourneyScreen.style.transition = 'opacity 1s ease';
    startJourneyScreen.style.opacity = '0';
    
    setTimeout(() => {
        startJourneyScreen.classList.add('hidden');

        // Show Homescreen
        homeDashboard.classList.remove('hidden');
        homeDashboard.style.opacity = '0';
        setTimeout(() => {
            homeDashboard.style.transition = 'opacity 1s ease';
            homeDashboard.style.opacity = '1';
            window.scrollTo(0, 0);
        }, 50);
        
        // Mark user as onboarded
        localStorage.setItem('zen_onboarded', 'true');
    }, 1000); // Wait for start journey screen fade out
});

if (zazenBtn) {
    zazenBtn.addEventListener('click', () => handleSelection('zazen'));
}
kenzenBtn.addEventListener('click', () => handleSelection('kenzen'));

// Dashboard and Pathway Logic
const btnFinishChapter1 = document.getElementById('btn-finish-chapter-1');
const homeDashboard = document.getElementById('home-dashboard');

// Dashboard interactions
const chapter1Card = document.getElementById('chapter-1-card');
const chapter2Card = document.getElementById('chapter-2-card');
const chapter3Card = document.getElementById('chapter-3-card');
const chapter4Card = document.getElementById('chapter-4-card');

chapter1Card.addEventListener('click', () => {
    // Only open if unlocked or completed
    if (chapter1Card.classList.contains('locked')) return;
    
    // Hide dashboard
    homeDashboard.style.transition = 'opacity 1s ease';
    homeDashboard.style.opacity = '0';
    
    setTimeout(() => {
        homeDashboard.classList.add('hidden');
        // Reset opacity for next time
        homeDashboard.style.opacity = '1';
        
        // Show Chapter 1
        chapterOneScreen.classList.remove('hidden');
        chapterOneScreen.style.opacity = '0';
        
        setTimeout(() => {
            chapterOneScreen.style.transition = 'opacity 1s ease';
            chapterOneScreen.style.opacity = '1';
            window.scrollTo(0, 0);
        }, 50);
    }, 1000);
});

function markChapter1Complete() {
    chapter1Card.classList.remove('unlocked');
    chapter1Card.classList.add('completed');
    document.getElementById('ch1-icon').textContent = '✓';
    document.getElementById('ch1-badge').textContent = 'Completed';
    document.getElementById('ch1-badge').classList.remove('active-badge');
    
    chapter2Card.classList.remove('locked');
    chapter2Card.classList.add('unlocked');
    document.getElementById('ch2-icon').textContent = '▶';
    document.getElementById('ch2-badge').textContent = 'Up Next';
    document.getElementById('ch2-badge').classList.remove('locked-badge');
    document.getElementById('ch2-badge').classList.add('active-badge');
}

btnFinishChapter1.addEventListener('click', () => {
    // Save to local storage
    let completed = JSON.parse(localStorage.getItem('zen_completed_chapters') || '[]');
    if (!completed.includes('ch1')) {
        completed.push('ch1');
        localStorage.setItem('zen_completed_chapters', JSON.stringify(completed));
    }

    markChapter1Complete();

    // Fade out chapter 1
    chapterOneScreen.style.transition = 'opacity 1s ease';
    chapterOneScreen.style.opacity = '0';
    
    // Smooth transition
    setTimeout(() => {
        chapterOneScreen.classList.add('hidden');
        homeDashboard.classList.remove('hidden');
        window.scrollTo(0, 0);
    }, 1000);
});

// Chapter 2 Logic
const chapterTwoScreen = document.getElementById('chapter-two-screen');
const btnFinishChapter2 = document.getElementById('btn-finish-chapter-2');

chapter2Card.addEventListener('click', () => {
    // Only open if unlocked or completed
    if (chapter2Card.classList.contains('locked')) return;
    
    // Hide dashboard
    homeDashboard.style.transition = 'opacity 1s ease';
    homeDashboard.style.opacity = '0';
    
    setTimeout(() => {
        homeDashboard.classList.add('hidden');
        homeDashboard.style.opacity = '1';
        
        // Show Chapter 2
        chapterTwoScreen.classList.remove('hidden');
        chapterTwoScreen.style.opacity = '0';
        
        setTimeout(() => {
            chapterTwoScreen.style.transition = 'opacity 1s ease';
            chapterTwoScreen.style.opacity = '1';
            window.scrollTo(0, 0);
        }, 50);
    }, 1000);
});

function markChapter2Complete() {
    chapter2Card.classList.remove('unlocked');
    chapter2Card.classList.add('completed');
    document.getElementById('ch2-icon').textContent = '✓';
    document.getElementById('ch2-badge').textContent = 'Completed';
    document.getElementById('ch2-badge').classList.remove('active-badge');
    
    // Unlock Chapter 3
    if (chapter3Card) {
        chapter3Card.classList.remove('locked');
        chapter3Card.classList.add('unlocked');
        document.getElementById('ch3-icon').textContent = '▶';
        document.getElementById('ch3-badge').textContent = 'Up Next';
        document.getElementById('ch3-badge').classList.remove('locked-badge');
        document.getElementById('ch3-badge').classList.add('active-badge');
    }
}

btnFinishChapter2.addEventListener('click', () => {
    // Save to local storage
    let completed = JSON.parse(localStorage.getItem('zen_completed_chapters') || '[]');
    if (!completed.includes('ch2')) {
        completed.push('ch2');
        localStorage.setItem('zen_completed_chapters', JSON.stringify(completed));
    }

    markChapter2Complete();

    // Fade out chapter 2
    chapterTwoScreen.style.transition = 'opacity 1s ease';
    chapterTwoScreen.style.opacity = '0';
    
    // Smooth transition
    setTimeout(() => {
        chapterTwoScreen.classList.add('hidden');
        homeDashboard.classList.remove('hidden');
        window.scrollTo(0, 0);
    }, 1000);
});

// Chapter 3 Logic
const chapterThreeScreen = document.getElementById('chapter-three-screen');
const btnFinishChapter3 = document.getElementById('btn-finish-chapter-3');

if (chapter3Card) {
    chapter3Card.addEventListener('click', () => {
        if (chapter3Card.classList.contains('locked')) return;
        
        homeDashboard.style.transition = 'opacity 1s ease';
        homeDashboard.style.opacity = '0';
        
        setTimeout(() => {
            homeDashboard.classList.add('hidden');
            homeDashboard.style.opacity = '1';
            
            chapterThreeScreen.classList.remove('hidden');
            chapterThreeScreen.style.opacity = '0';
            
            setTimeout(() => {
                chapterThreeScreen.style.transition = 'opacity 1s ease';
                chapterThreeScreen.style.opacity = '1';
                window.scrollTo(0, 0);
            }, 50);
        }, 1000);
    });
}

function markChapter3Complete() {
    chapter3Card.classList.remove('unlocked');
    chapter3Card.classList.add('completed');
    document.getElementById('ch3-icon').textContent = '✓';
    document.getElementById('ch3-badge').textContent = 'Completed';
    document.getElementById('ch3-badge').classList.remove('active-badge');
    
    // Unlock Chapter 4
    if (chapter4Card) {
        chapter4Card.classList.remove('locked');
        chapter4Card.classList.add('unlocked');
        document.getElementById('ch4-icon').textContent = '▶';
        document.getElementById('ch4-badge').textContent = 'Up Next';
        document.getElementById('ch4-badge').classList.remove('locked-badge');
        document.getElementById('ch4-badge').classList.add('active-badge');
    }
}

if (btnFinishChapter3) {
    btnFinishChapter3.addEventListener('click', () => {
        let completed = JSON.parse(localStorage.getItem('zen_completed_chapters') || '[]');
        if (!completed.includes('ch3')) {
            completed.push('ch3');
            localStorage.setItem('zen_completed_chapters', JSON.stringify(completed));
        }

        markChapter3Complete();

        chapterThreeScreen.style.transition = 'opacity 1s ease';
        chapterThreeScreen.style.opacity = '0';
        
        setTimeout(() => {
            chapterThreeScreen.classList.add('hidden');
            homeDashboard.classList.remove('hidden');
            window.scrollTo(0, 0);
        }, 1000);
    });
}

// Chapter 4 Logic
const chapterFourScreen = document.getElementById('chapter-four-screen');
const btnFinishChapter4 = document.getElementById('btn-finish-chapter-4');

if (chapter4Card) {
    chapter4Card.addEventListener('click', () => {
        if (chapter4Card.classList.contains('locked')) return;
        
        homeDashboard.style.transition = 'opacity 1s ease';
        homeDashboard.style.opacity = '0';
        
        setTimeout(() => {
            homeDashboard.classList.add('hidden');
            homeDashboard.style.opacity = '1';
            
            chapterFourScreen.classList.remove('hidden');
            chapterFourScreen.style.opacity = '0';
            
            setTimeout(() => {
                chapterFourScreen.style.transition = 'opacity 1s ease';
                chapterFourScreen.style.opacity = '1';
                window.scrollTo(0, 0);
            }, 50);
        }, 1000);
    });
}

function markChapter4Complete() {
    chapter4Card.classList.remove('unlocked');
    chapter4Card.classList.add('completed');
    document.getElementById('ch4-icon').textContent = '✓';
    document.getElementById('ch4-badge').textContent = 'Completed';
    document.getElementById('ch4-badge').classList.remove('active-badge');
    
    // Check if all previous chapters are completed before unlocking Bushido
    let completed = JSON.parse(localStorage.getItem('zen_completed_chapters') || '[]');
    const allCompleted = ['ch1', 'ch2', 'ch3', 'ch4'].every(ch => completed.includes(ch));

    if (allCompleted) {
        // Unlock first Bushido chapter (Gi: Rectitude)
        const bushidoCard = document.querySelector('.bushido-card');
        if (bushidoCard) {
            bushidoCard.classList.remove('locked');
            bushidoCard.classList.add('unlocked');
            const icon = bushidoCard.querySelector('.chapter-status-icon');
            if (icon) icon.textContent = '▶';
            const badge = bushidoCard.querySelector('.status-badge');
            if (badge) {
                badge.textContent = 'Up Next';
                badge.classList.remove('locked-badge');
                badge.classList.add('active-badge');
            }
        }
    }
}

if (btnFinishChapter4) {
    btnFinishChapter4.addEventListener('click', () => {
        let completed = JSON.parse(localStorage.getItem('zen_completed_chapters') || '[]');
        if (!completed.includes('ch4')) {
            completed.push('ch4');
            localStorage.setItem('zen_completed_chapters', JSON.stringify(completed));
        }

        markChapter4Complete();

        chapterFourScreen.style.transition = 'opacity 1s ease';
        chapterFourScreen.style.opacity = '0';
        
        setTimeout(() => {
            chapterFourScreen.classList.add('hidden');
            
            const congratsFoundationScreen = document.getElementById('congrats-foundation-screen');
            if (congratsFoundationScreen) {
                congratsFoundationScreen.classList.remove('hidden');
                congratsFoundationScreen.style.opacity = '0';
                setTimeout(() => {
                    congratsFoundationScreen.style.transition = 'opacity 1s ease';
                    congratsFoundationScreen.style.opacity = '1';
                }, 50);
            } else {
                homeDashboard.classList.remove('hidden');
            }
            window.scrollTo(0, 0);
        }, 1000);
    });
}

const btnContinueToBushido = document.getElementById('btn-continue-to-bushido');
if (btnContinueToBushido) {
    btnContinueToBushido.addEventListener('click', () => {
        const congratsFoundationScreen = document.getElementById('congrats-foundation-screen');
        congratsFoundationScreen.style.transition = 'opacity 1s ease';
        congratsFoundationScreen.style.opacity = '0';
        setTimeout(() => {
            congratsFoundationScreen.classList.add('hidden');
            homeDashboard.classList.remove('hidden');
            window.scrollTo(0, 0);
        }, 1000);
    });
}

// Bushido Intro Logic
const bushidoIntroCard = document.getElementById('bushido-intro-card');
const bushidoIntroScreen = document.getElementById('bushido-intro-screen');
const btnFinishBushidoIntro = document.getElementById('btn-finish-bushido-intro');

if (bushidoIntroCard) {
    bushidoIntroCard.addEventListener('click', () => {
        if (bushidoIntroCard.classList.contains('locked')) return;
        
        homeDashboard.style.transition = 'opacity 1s ease';
        homeDashboard.style.opacity = '0';
        
        setTimeout(() => {
            homeDashboard.classList.add('hidden');
            homeDashboard.style.opacity = '1';
            
            bushidoIntroScreen.classList.remove('hidden');
            bushidoIntroScreen.style.opacity = '0';
            
            setTimeout(() => {
                bushidoIntroScreen.style.transition = 'opacity 1s ease';
                bushidoIntroScreen.style.opacity = '1';
                window.scrollTo(0, 0);
            }, 50);
        }, 1000);
    });
}

function markBushidoIntroComplete() {
    if (!bushidoIntroCard) return;
    bushidoIntroCard.classList.remove('unlocked');
    bushidoIntroCard.classList.add('completed');
    const introIcon = bushidoIntroCard.querySelector('.chapter-status-icon');
    if (introIcon) introIcon.textContent = '✓';
    const introBadge = bushidoIntroCard.querySelector('.status-badge');
    if (introBadge) {
        introBadge.textContent = 'Completed';
        introBadge.classList.remove('active-badge');
    }
    
    // Unlock Gi: Rectitude (the second bushido card)
    const bushidoCards = document.querySelectorAll('.bushido-card');
    if (bushidoCards.length > 1) {
        const giCard = bushidoCards[1];
        giCard.classList.remove('locked');
        giCard.classList.add('unlocked');
        const icon = giCard.querySelector('.chapter-status-icon');
        if (icon) icon.textContent = '▶';
        const badge = giCard.querySelector('.status-badge');
        if (badge) {
            badge.textContent = 'Up Next';
            badge.classList.remove('locked-badge');
            badge.classList.add('active-badge');
        }
    }
}

if (btnFinishBushidoIntro) {
    btnFinishBushidoIntro.addEventListener('click', () => {
        let completed = JSON.parse(localStorage.getItem('zen_completed_chapters') || '[]');
        if (!completed.includes('bushido_intro')) {
            completed.push('bushido_intro');
            localStorage.setItem('zen_completed_chapters', JSON.stringify(completed));
        }

        markBushidoIntroComplete();

        bushidoIntroScreen.style.transition = 'opacity 1s ease';
        bushidoIntroScreen.style.opacity = '0';
        
        setTimeout(() => {
            bushidoIntroScreen.classList.add('hidden');
            homeDashboard.classList.remove('hidden');
            window.scrollTo(0, 0);
        }, 1000);
    });
}

// Bushido Gi Logic
const bushidoGiCard = document.getElementById('bushido-gi-card');
const bushidoGiScreen = document.getElementById('bushido-gi-screen');
const btnFinishBushidoGi = document.getElementById('btn-finish-bushido-gi');
const bushidoYuuCard = document.getElementById('bushido-yuu-card');

if (bushidoGiCard) {
    bushidoGiCard.addEventListener('click', () => {
        if (bushidoGiCard.classList.contains('locked')) return;
        
        homeDashboard.style.transition = 'opacity 1s ease';
        homeDashboard.style.opacity = '0';
        
        setTimeout(() => {
            homeDashboard.classList.add('hidden');
            homeDashboard.style.opacity = '1';
            
            bushidoGiScreen.classList.remove('hidden');
            bushidoGiScreen.style.opacity = '0';
            
            setTimeout(() => {
                bushidoGiScreen.style.transition = 'opacity 1s ease';
                bushidoGiScreen.style.opacity = '1';
                window.scrollTo(0, 0);
            }, 50);
        }, 1000);
    });
}

function markBushidoGiComplete() {
    if (!bushidoGiCard) return;
    bushidoGiCard.classList.remove('unlocked');
    bushidoGiCard.classList.add('completed');
    const giIcon = bushidoGiCard.querySelector('.chapter-status-icon');
    if (giIcon) giIcon.textContent = '✓';
    const giBadge = bushidoGiCard.querySelector('.status-badge');
    if (giBadge) {
        giBadge.textContent = 'Completed';
        giBadge.classList.remove('active-badge');
    }
    
    // Unlock Yuu
    if (bushidoYuuCard) {
        bushidoYuuCard.classList.remove('locked');
        bushidoYuuCard.classList.add('unlocked');
        const icon = bushidoYuuCard.querySelector('.chapter-status-icon');
        if (icon) icon.textContent = '▶';
        const badge = bushidoYuuCard.querySelector('.status-badge');
        if (badge) {
            badge.textContent = 'Up Next';
            badge.classList.remove('locked-badge');
            badge.classList.add('active-badge');
        }
    }
}

if (btnFinishBushidoGi) {
    btnFinishBushidoGi.addEventListener('click', () => {
        let completed = JSON.parse(localStorage.getItem('zen_completed_chapters') || '[]');
        if (!completed.includes('bushido_gi')) {
            completed.push('bushido_gi');
            localStorage.setItem('zen_completed_chapters', JSON.stringify(completed));
        }

        markBushidoGiComplete();

        bushidoGiScreen.style.transition = 'opacity 1s ease';
        bushidoGiScreen.style.opacity = '0';
        
        setTimeout(() => {
            bushidoGiScreen.classList.add('hidden');
            homeDashboard.classList.remove('hidden');
            window.scrollTo(0, 0);
        }, 1000);
    });
}

// Bushido Yuu Logic
const bushidoYuuScreen = document.getElementById('bushido-yuu-screen');
const btnFinishBushidoYuu = document.getElementById('btn-finish-bushido-yuu');
const bushidoJinCard = document.getElementById('bushido-jin-card');

if (bushidoYuuCard) {
    bushidoYuuCard.addEventListener('click', () => {
        if (bushidoYuuCard.classList.contains('locked')) return;
        
        homeDashboard.style.transition = 'opacity 1s ease';
        homeDashboard.style.opacity = '0';
        
        setTimeout(() => {
            homeDashboard.classList.add('hidden');
            homeDashboard.style.opacity = '1';
            
            bushidoYuuScreen.classList.remove('hidden');
            bushidoYuuScreen.style.opacity = '0';
            
            setTimeout(() => {
                bushidoYuuScreen.style.transition = 'opacity 1s ease';
                bushidoYuuScreen.style.opacity = '1';
                window.scrollTo(0, 0);
            }, 50);
        }, 1000);
    });
}

function markBushidoYuuComplete() {
    if (!bushidoYuuCard) return;
    bushidoYuuCard.classList.remove('unlocked');
    bushidoYuuCard.classList.add('completed');
    const yuuIcon = bushidoYuuCard.querySelector('.chapter-status-icon');
    if (yuuIcon) yuuIcon.textContent = '✓';
    const yuuBadge = bushidoYuuCard.querySelector('.status-badge');
    if (yuuBadge) {
        yuuBadge.textContent = 'Completed';
        yuuBadge.classList.remove('active-badge');
    }
    
    // Unlock Jin
    if (bushidoJinCard) {
        bushidoJinCard.classList.remove('locked');
        bushidoJinCard.classList.add('unlocked');
        const icon = bushidoJinCard.querySelector('.chapter-status-icon');
        if (icon) icon.textContent = '▶';
        const badge = bushidoJinCard.querySelector('.status-badge');
        if (badge) {
            badge.textContent = 'Up Next';
            badge.classList.remove('locked-badge');
            badge.classList.add('active-badge');
        }
    }
}

if (btnFinishBushidoYuu) {
    btnFinishBushidoYuu.addEventListener('click', () => {
        let completed = JSON.parse(localStorage.getItem('zen_completed_chapters') || '[]');
        if (!completed.includes('bushido_yuu')) {
            completed.push('bushido_yuu');
            localStorage.setItem('zen_completed_chapters', JSON.stringify(completed));
        }

        markBushidoYuuComplete();

        bushidoYuuScreen.style.transition = 'opacity 1s ease';
        bushidoYuuScreen.style.opacity = '0';
        
        setTimeout(() => {
            bushidoYuuScreen.classList.add('hidden');
            homeDashboard.classList.remove('hidden');
            window.scrollTo(0, 0);
        }, 1000);
    });
}

// Bushido Jin Logic
const bushidoJinScreen = document.getElementById('bushido-jin-screen');
const btnFinishBushidoJin = document.getElementById('btn-finish-bushido-jin');
const bushidoReiCard = document.getElementById('bushido-rei-card');

if (bushidoJinCard) {
    bushidoJinCard.addEventListener('click', () => {
        if (bushidoJinCard.classList.contains('locked')) return;
        
        homeDashboard.style.transition = 'opacity 1s ease';
        homeDashboard.style.opacity = '0';
        
        setTimeout(() => {
            homeDashboard.classList.add('hidden');
            homeDashboard.style.opacity = '1';
            
            bushidoJinScreen.classList.remove('hidden');
            bushidoJinScreen.style.opacity = '0';
            
            setTimeout(() => {
                bushidoJinScreen.style.transition = 'opacity 1s ease';
                bushidoJinScreen.style.opacity = '1';
                window.scrollTo(0, 0);
            }, 50);
        }, 1000);
    });
}

function markBushidoJinComplete() {
    if (!bushidoJinCard) return;
    bushidoJinCard.classList.remove('unlocked');
    bushidoJinCard.classList.add('completed');
    const jinIcon = bushidoJinCard.querySelector('.chapter-status-icon');
    if (jinIcon) jinIcon.textContent = '✓';
    const jinBadge = bushidoJinCard.querySelector('.status-badge');
    if (jinBadge) {
        jinBadge.textContent = 'Completed';
        jinBadge.classList.remove('active-badge');
    }
    
    // Unlock Rei
    if (bushidoReiCard) {
        bushidoReiCard.classList.remove('locked');
        bushidoReiCard.classList.add('unlocked');
        const icon = bushidoReiCard.querySelector('.chapter-status-icon');
        if (icon) icon.textContent = '▶';
        const badge = bushidoReiCard.querySelector('.status-badge');
        if (badge) {
            badge.textContent = 'Up Next';
            badge.classList.remove('locked-badge');
            badge.classList.add('active-badge');
        }
    }
}

if (btnFinishBushidoJin) {
    btnFinishBushidoJin.addEventListener('click', () => {
        let completed = JSON.parse(localStorage.getItem('zen_completed_chapters') || '[]');
        if (!completed.includes('bushido_jin')) {
            completed.push('bushido_jin');
            localStorage.setItem('zen_completed_chapters', JSON.stringify(completed));
        }

        markBushidoJinComplete();

        bushidoJinScreen.style.transition = 'opacity 1s ease';
        bushidoJinScreen.style.opacity = '0';
        
        setTimeout(() => {
            bushidoJinScreen.classList.add('hidden');
            homeDashboard.classList.remove('hidden');
            window.scrollTo(0, 0);
        }, 1000);
    });
}

// Bushido Rei Logic
const bushidoReiScreen = document.getElementById('bushido-rei-screen');
const btnFinishBushidoRei = document.getElementById('btn-finish-bushido-rei');
const bushidoMakotoCard = document.getElementById('bushido-makoto-card');

if (bushidoReiCard) {
    bushidoReiCard.addEventListener('click', () => {
        if (bushidoReiCard.classList.contains('locked')) return;
        
        homeDashboard.style.transition = 'opacity 1s ease';
        homeDashboard.style.opacity = '0';
        
        setTimeout(() => {
            homeDashboard.classList.add('hidden');
            homeDashboard.style.opacity = '1';
            
            bushidoReiScreen.classList.remove('hidden');
            bushidoReiScreen.style.opacity = '0';
            
            setTimeout(() => {
                bushidoReiScreen.style.transition = 'opacity 1s ease';
                bushidoReiScreen.style.opacity = '1';
                window.scrollTo(0, 0);
            }, 50);
        }, 1000);
    });
}

function markBushidoReiComplete() {
    if (!bushidoReiCard) return;
    bushidoReiCard.classList.remove('unlocked');
    bushidoReiCard.classList.add('completed');
    const reiIcon = bushidoReiCard.querySelector('.chapter-status-icon');
    if (reiIcon) reiIcon.textContent = '✓';
    const reiBadge = bushidoReiCard.querySelector('.status-badge');
    if (reiBadge) {
        reiBadge.textContent = 'Completed';
        reiBadge.classList.remove('active-badge');
    }
    
    // Unlock Makoto
    if (bushidoMakotoCard) {
        bushidoMakotoCard.classList.remove('locked');
        bushidoMakotoCard.classList.add('unlocked');
        const icon = bushidoMakotoCard.querySelector('.chapter-status-icon');
        if (icon) icon.textContent = '▶';
        const badge = bushidoMakotoCard.querySelector('.status-badge');
        if (badge) {
            badge.textContent = 'Up Next';
            badge.classList.remove('locked-badge');
            badge.classList.add('active-badge');
        }
    }
}

if (btnFinishBushidoRei) {
    btnFinishBushidoRei.addEventListener('click', () => {
        let completed = JSON.parse(localStorage.getItem('zen_completed_chapters') || '[]');
        if (!completed.includes('bushido_rei')) {
            completed.push('bushido_rei');
            localStorage.setItem('zen_completed_chapters', JSON.stringify(completed));
        }

        markBushidoReiComplete();

        bushidoReiScreen.style.transition = 'opacity 1s ease';
        bushidoReiScreen.style.opacity = '0';
        
        setTimeout(() => {
            bushidoReiScreen.classList.add('hidden');
            homeDashboard.classList.remove('hidden');
            window.scrollTo(0, 0);
        }, 1000);
    });
}

// Bushido Makoto Logic
const bushidoMakotoScreen = document.getElementById('bushido-makoto-screen');
const btnFinishBushidoMakoto = document.getElementById('btn-finish-bushido-makoto');
const bushidoMeiyoCard = document.getElementById('bushido-meiyo-card');

if (bushidoMakotoCard) {
    bushidoMakotoCard.addEventListener('click', () => {
        if (bushidoMakotoCard.classList.contains('locked')) return;
        
        homeDashboard.style.transition = 'opacity 1s ease';
        homeDashboard.style.opacity = '0';
        
        setTimeout(() => {
            homeDashboard.classList.add('hidden');
            homeDashboard.style.opacity = '1';
            
            bushidoMakotoScreen.classList.remove('hidden');
            bushidoMakotoScreen.style.opacity = '0';
            
            setTimeout(() => {
                bushidoMakotoScreen.style.transition = 'opacity 1s ease';
                bushidoMakotoScreen.style.opacity = '1';
                window.scrollTo(0, 0);
            }, 50);
        }, 1000);
    });
}

function markBushidoMakotoComplete() {
    if (!bushidoMakotoCard) return;
    bushidoMakotoCard.classList.remove('unlocked');
    bushidoMakotoCard.classList.add('completed');
    const makotoIcon = bushidoMakotoCard.querySelector('.chapter-status-icon');
    if (makotoIcon) makotoIcon.textContent = '✓';
    const makotoBadge = bushidoMakotoCard.querySelector('.status-badge');
    if (makotoBadge) {
        makotoBadge.textContent = 'Completed';
        makotoBadge.classList.remove('active-badge');
    }
    
    // Unlock Meiyo
    if (bushidoMeiyoCard) {
        bushidoMeiyoCard.classList.remove('locked');
        bushidoMeiyoCard.classList.add('unlocked');
        const icon = bushidoMeiyoCard.querySelector('.chapter-status-icon');
        if (icon) icon.textContent = '▶';
        const badge = bushidoMeiyoCard.querySelector('.status-badge');
        if (badge) {
            badge.textContent = 'Up Next';
            badge.classList.remove('locked-badge');
            badge.classList.add('active-badge');
        }
    }
}

if (btnFinishBushidoMakoto) {
    btnFinishBushidoMakoto.addEventListener('click', () => {
        let completed = JSON.parse(localStorage.getItem('zen_completed_chapters') || '[]');
        if (!completed.includes('bushido_makoto')) {
            completed.push('bushido_makoto');
            localStorage.setItem('zen_completed_chapters', JSON.stringify(completed));
        }

        markBushidoMakotoComplete();

        bushidoMakotoScreen.style.transition = 'opacity 1s ease';
        bushidoMakotoScreen.style.opacity = '0';
        
        setTimeout(() => {
            bushidoMakotoScreen.classList.add('hidden');
            homeDashboard.classList.remove('hidden');
            window.scrollTo(0, 0);
        }, 1000);
    });
}

// Bushido Meiyo Logic
const bushidoMeiyoScreen = document.getElementById('bushido-meiyo-screen');
const btnFinishBushidoMeiyo = document.getElementById('btn-finish-bushido-meiyo');
const bushidoChugiCard = document.getElementById('bushido-chugi-card');

if (bushidoMeiyoCard) {
    bushidoMeiyoCard.addEventListener('click', () => {
        if (bushidoMeiyoCard.classList.contains('locked')) return;
        
        homeDashboard.style.transition = 'opacity 1s ease';
        homeDashboard.style.opacity = '0';
        
        setTimeout(() => {
            homeDashboard.classList.add('hidden');
            homeDashboard.style.opacity = '1';
            
            bushidoMeiyoScreen.classList.remove('hidden');
            bushidoMeiyoScreen.style.opacity = '0';
            
            setTimeout(() => {
                bushidoMeiyoScreen.style.transition = 'opacity 1s ease';
                bushidoMeiyoScreen.style.opacity = '1';
                window.scrollTo(0, 0);
            }, 50);
        }, 1000);
    });
}

function markBushidoMeiyoComplete() {
    if (!bushidoMeiyoCard) return;
    bushidoMeiyoCard.classList.remove('unlocked');
    bushidoMeiyoCard.classList.add('completed');
    const meiyoIcon = bushidoMeiyoCard.querySelector('.chapter-status-icon');
    if (meiyoIcon) meiyoIcon.textContent = '✓';
    const meiyoBadge = bushidoMeiyoCard.querySelector('.status-badge');
    if (meiyoBadge) {
        meiyoBadge.textContent = 'Completed';
        meiyoBadge.classList.remove('active-badge');
    }
    
    // Unlock Chugi
    if (bushidoChugiCard) {
        bushidoChugiCard.classList.remove('locked');
        bushidoChugiCard.classList.add('unlocked');
        const icon = bushidoChugiCard.querySelector('.chapter-status-icon');
        if (icon) icon.textContent = '▶';
        const badge = bushidoChugiCard.querySelector('.status-badge');
        if (badge) {
            badge.textContent = 'Up Next';
            badge.classList.remove('locked-badge');
            badge.classList.add('active-badge');
        }
    }
}

if (btnFinishBushidoMeiyo) {
    btnFinishBushidoMeiyo.addEventListener('click', () => {
        let completed = JSON.parse(localStorage.getItem('zen_completed_chapters') || '[]');
        if (!completed.includes('bushido_meiyo')) {
            completed.push('bushido_meiyo');
            localStorage.setItem('zen_completed_chapters', JSON.stringify(completed));
        }

        markBushidoMeiyoComplete();

        bushidoMeiyoScreen.style.transition = 'opacity 1s ease';
        bushidoMeiyoScreen.style.opacity = '0';
        
        setTimeout(() => {
            bushidoMeiyoScreen.classList.add('hidden');
            homeDashboard.classList.remove('hidden');
            window.scrollTo(0, 0);
        }, 1000);
    });
}

// Bushido Chugi Logic
const bushidoChugiScreen = document.getElementById('bushido-chugi-screen');
const btnFinishBushidoChugi = document.getElementById('btn-finish-bushido-chugi');
const dokkodoIntroCard = document.getElementById('dokkodo-intro-card');

if (bushidoChugiCard) {
    bushidoChugiCard.addEventListener('click', () => {
        if (bushidoChugiCard.classList.contains('locked')) return;
        
        homeDashboard.style.transition = 'opacity 1s ease';
        homeDashboard.style.opacity = '0';
        
        setTimeout(() => {
            homeDashboard.classList.add('hidden');
            homeDashboard.style.opacity = '1';
            
            bushidoChugiScreen.classList.remove('hidden');
            bushidoChugiScreen.style.opacity = '0';
            
            setTimeout(() => {
                bushidoChugiScreen.style.transition = 'opacity 1s ease';
                bushidoChugiScreen.style.opacity = '1';
                window.scrollTo(0, 0);
            }, 50);
        }, 1000);
    });
}

function markBushidoChugiComplete() {
    if (!bushidoChugiCard) return;
    bushidoChugiCard.classList.remove('unlocked');
    bushidoChugiCard.classList.add('completed');
    const chugiIcon = bushidoChugiCard.querySelector('.chapter-status-icon');
    if (chugiIcon) chugiIcon.textContent = '✓';
    const chugiBadge = bushidoChugiCard.querySelector('.status-badge');
    if (chugiBadge) {
        chugiBadge.textContent = 'Completed';
        chugiBadge.classList.remove('active-badge');
    }
    
    // Unlock Dokkodo
    if (dokkodoIntroCard) {
        dokkodoIntroCard.classList.remove('locked');
        dokkodoIntroCard.classList.add('unlocked');
        const icon = dokkodoIntroCard.querySelector('.chapter-status-icon');
        if (icon) icon.textContent = '▶';
        const badge = dokkodoIntroCard.querySelector('.status-badge');
        if (badge) {
            badge.textContent = 'Up Next';
            badge.classList.remove('locked-badge');
            badge.classList.add('active-badge');
        }
    }
}

if (btnFinishBushidoChugi) {
    btnFinishBushidoChugi.addEventListener('click', () => {
        let completed = JSON.parse(localStorage.getItem('zen_completed_chapters') || '[]');
        if (!completed.includes('bushido_chugi')) {
            completed.push('bushido_chugi');
            localStorage.setItem('zen_completed_chapters', JSON.stringify(completed));
        }

        markBushidoChugiComplete();

        bushidoChugiScreen.style.transition = 'opacity 1s ease';
        bushidoChugiScreen.style.opacity = '0';
        
        setTimeout(() => {
            bushidoChugiScreen.classList.add('hidden');
            
            const congratsBushidoScreen = document.getElementById('congrats-bushido-screen');
            if (congratsBushidoScreen) {
                congratsBushidoScreen.classList.remove('hidden');
                congratsBushidoScreen.style.opacity = '0';
                setTimeout(() => {
                    congratsBushidoScreen.style.transition = 'opacity 1s ease';
                    congratsBushidoScreen.style.opacity = '1';
                }, 50);
            } else {
                homeDashboard.classList.remove('hidden');
            }
            window.scrollTo(0, 0);
        }, 1000);
    });
}

const btnContinueToDokkodo = document.getElementById('btn-continue-to-dokkodo');
if (btnContinueToDokkodo) {
    btnContinueToDokkodo.addEventListener('click', () => {
        const congratsBushidoScreen = document.getElementById('congrats-bushido-screen');
        congratsBushidoScreen.style.transition = 'opacity 1s ease';
        congratsBushidoScreen.style.opacity = '0';
        setTimeout(() => {
            congratsBushidoScreen.classList.add('hidden');
            homeDashboard.classList.remove('hidden');
            window.scrollTo(0, 0);
        }, 1000);
    });
}

// Initialize completed chapters on load
let completedChapters = JSON.parse(localStorage.getItem('zen_completed_chapters') || '[]');
if (completedChapters.includes('ch1')) markChapter1Complete();
if (completedChapters.includes('ch2')) markChapter2Complete();
if (completedChapters.includes('ch3')) markChapter3Complete();
if (completedChapters.includes('ch4')) markChapter4Complete();
if (completedChapters.includes('bushido_intro')) markBushidoIntroComplete();
if (completedChapters.includes('bushido_gi')) markBushidoGiComplete();
if (completedChapters.includes('bushido_yuu')) markBushidoYuuComplete();
if (completedChapters.includes('bushido_jin')) markBushidoJinComplete();
if (completedChapters.includes('bushido_rei')) markBushidoReiComplete();
if (completedChapters.includes('bushido_makoto')) markBushidoMakotoComplete();
if (completedChapters.includes('bushido_meiyo')) markBushidoMeiyoComplete();
if (completedChapters.includes('bushido_chugi')) markBushidoChugiComplete();
// Dashboard Tab Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if(btn.id === 'btn-leave-garden') return; // Handled separately
        
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked
        btn.classList.add('active');
        const targetTab = btn.getAttribute('data-tab');
        if(targetTab) {
            document.getElementById(`tab-${targetTab}`).classList.add('active');
        }
    });
});

// ==========================================
// GARDEN INTERIOR LOGIC
// ==========================================
const btnEnterGarden = document.getElementById('btn-enter-garden');
const gardenInteriorScreen = document.getElementById('garden-interior-screen');
const btnLeaveGarden = document.getElementById('btn-leave-garden');
const btnWaterGarden = document.getElementById('btn-water-garden');

const fields = ['health', 'skill', 'connections', 'discipline', 'stability', 'goals'];
const fieldLabels = ['Health', 'Skill', 'Connections', 'Discipline', 'Stability', 'Goals'];

let lifetimeData = JSON.parse(localStorage.getItem('zen_lifetime')) || [20, 20, 20, 20, 20, 20];
let lastWateredDate = localStorage.getItem('zen_last_watered');

btnEnterGarden.addEventListener('click', () => {
    // Fade out dashboard
    homeDashboard.style.transition = 'opacity 1s ease';
    homeDashboard.style.opacity = '0';
    
    setTimeout(() => {
        homeDashboard.classList.add('hidden');
        gardenInteriorScreen.classList.remove('hidden');
        gardenInteriorScreen.style.opacity = '0';
        
        // Setup Date
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const todayStr = new Date().toLocaleDateString(undefined, dateOptions);
        document.getElementById('garden-date-display').textContent = todayStr;
        
        // Check if already watered today
        if (lastWateredDate === todayStr) {
            btnWaterGarden.textContent = "Garden Watered Today.";
            btnWaterGarden.disabled = true;
            btnWaterGarden.style.opacity = '0.5';
            
            // Load saved daily data and set sliders
            const savedDaily = JSON.parse(localStorage.getItem('zen_daily_watered'));
            if (savedDaily) {
                fields.forEach((f, i) => {
                    const slider = document.getElementById(`slider-${f}`);
                    slider.value = savedDaily[i];
                    document.getElementById(`val-${f}`).textContent = savedDaily[i];
                    slider.disabled = true;
                });
            } else {
                fields.forEach(f => document.getElementById(`slider-${f}`).disabled = true);
            }
        } else {
            btnWaterGarden.textContent = "Water The Garden";
            btnWaterGarden.disabled = false;
            btnWaterGarden.style.opacity = '1';
            fields.forEach(f => document.getElementById(`slider-${f}`).disabled = false);
        }
        
        setTimeout(() => {
            gardenInteriorScreen.style.transition = 'opacity 1s ease';
            gardenInteriorScreen.style.opacity = '1';
            window.scrollTo(0, 0);
            updateDailyChart();
            updateLifetimeChart();
        }, 50);
    }, 1000);
});

btnLeaveGarden.addEventListener('click', () => {
    gardenInteriorScreen.style.transition = 'opacity 1s ease';
    gardenInteriorScreen.style.opacity = '0';
    setTimeout(() => {
        gardenInteriorScreen.classList.add('hidden');
        homeDashboard.classList.remove('hidden');
        homeDashboard.style.opacity = '0';
        setTimeout(() => {
            homeDashboard.style.transition = 'opacity 1s ease';
            homeDashboard.style.opacity = '1';
            window.scrollTo(0, 0);
        }, 50);
    }, 1000);
});

// Slider Events
fields.forEach(f => {
    const slider = document.getElementById(`slider-${f}`);
    const valDisplay = document.getElementById(`val-${f}`);
    slider.addEventListener('input', (e) => {
        valDisplay.textContent = e.target.value;
        updateDailyChart();
    });
});

// Water Button Logic (Exponential Growth)
btnWaterGarden.addEventListener('click', () => {
    const currentValues = fields.map(f => parseInt(document.getElementById(`slider-${f}`).value));
    
    // Calculate exponential growth. Base growth + an exponential multiplier based on the daily score.
    // A 10/10 gives significant boost, a 1/10 gives almost none.
    lifetimeData = lifetimeData.map((val, i) => {
        const growth = Math.pow(currentValues[i] * 0.6, 1.3); 
        return Math.min(200, val + growth); // Cap visual maximum at 200 for the chart scaling
    });
    
    localStorage.setItem('zen_lifetime', JSON.stringify(lifetimeData));
    
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    localStorage.setItem('zen_last_watered', new Date().toLocaleDateString(undefined, dateOptions));
    localStorage.setItem('zen_daily_watered', JSON.stringify(currentValues));
    lastWateredDate = localStorage.getItem('zen_last_watered');
    
    btnWaterGarden.textContent = "Garden Watered.";
    btnWaterGarden.disabled = true;
    btnWaterGarden.style.opacity = '0.5';
    fields.forEach(f => document.getElementById(`slider-${f}`).disabled = true);
    
    updateLifetimeChart();
});

// ==========================================
// CUSTOM HEXAGON CANVAS RENDERER
// ==========================================
function drawHexagonChart(canvasId, dataValues, maxVal, accentColor, fillOpacity) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 30; // 30px padding for labels
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw Web Background
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    const numWebs = 5;
    for (let i = 1; i <= numWebs; i++) {
        const r = (radius / numWebs) * i;
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
            const angle = -Math.PI / 2 + (Math.PI * 2 * j) / 6;
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    // Draw Axes & Labels
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let j = 0; j < 6; j++) {
        const angle = -Math.PI / 2 + (Math.PI * 2 * j) / 6;
        
        // Axis line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        ctx.stroke();
        
        // Label
        const labelR = radius + 15;
        const lx = centerX + Math.cos(angle) * labelR;
        const ly = centerY + Math.sin(angle) * labelR;
        ctx.fillText(fieldLabels[j], lx, ly);
    }
    
    // Draw Data Polygon
    ctx.beginPath();
    for (let j = 0; j < 6; j++) {
        const angle = -Math.PI / 2 + (Math.PI * 2 * j) / 6;
        const val = Math.min(dataValues[j], maxVal);
        const r = (val / maxVal) * radius;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    
    // Fill and Stroke Data
    ctx.fillStyle = accentColor;
    ctx.globalAlpha = fillOpacity;
    ctx.fill();
    ctx.globalAlpha = 1.0;
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function updateDailyChart() {
    const currentValues = fields.map(f => parseInt(document.getElementById(`slider-${f}`).value));
    drawHexagonChart('daily-hexagon', currentValues, 10, 'rgba(188, 155, 115, 1)', 0.4);
}

function updateLifetimeChart() {
    // Dynamic maxVal scaling: find max of lifetime, minimum of 100 for visual scale
    const currentMax = Math.max(...lifetimeData, 100);
    const scaleMax = Math.ceil(currentMax / 50) * 50; 
    drawHexagonChart('lifetime-hexagon', lifetimeData, scaleMax, 'rgba(74, 124, 89, 1)', 0.6);
}

// Journey Tracker Logic
let zen_login_streak = parseInt(localStorage.getItem('zen_login_streak') || '0');
let zen_last_login_date = localStorage.getItem('zen_last_login_date') || '';
const todayStr = new Date().toDateString();

if (zen_last_login_date !== todayStr) {
    zen_login_streak += 1;
    localStorage.setItem('zen_login_streak', zen_login_streak.toString());
    localStorage.setItem('zen_last_login_date', todayStr);
}

function renderJourneyTimeline() {
    const container = document.getElementById('journey-timeline-container');
    if (!container) return;
    container.innerHTML = '';

    const totalDays = 35;
    const milestones = {
        5: { name: "Matahachi Honiden", image: "assets/MatahachiHoniden.png", text: "We are all like him at some point of our life." },
        10: { name: "Seijuro Yoshioka", image: "assets/SeijuroYoshioka.png", text: "Talent unrefined by the weight of consequence." },
        15: { name: "Inshun Hozoin", image: "assets/InshunHozoin.png", text: "The terror of facing true depth." },
        25: { name: "Sasaki Kojiro", image: "assets/SasakiKojiro.png", text: "Pure connection to the sword, unburdened by words." },
        35: { name: "Miyamoto Musashi", image: "assets/MiyamotoMusashi.png", text: "The path of invincible under the sun." }
    };

    let html = '<div class="timeline-track" style="position: relative; padding-left: 50px; border-left: 2px solid rgba(255,255,255,0.1); margin-left: 20px;">';

    for (let day = 1; day <= totalDays; day++) {
        const isCompleted = day <= zen_login_streak;
        const isMilestone = milestones[day] !== undefined;

        let dotColor = isCompleted ? 'var(--accent-color)' : 'rgba(255,255,255,0.2)';
        let dotShadow = isCompleted ? '0 0 10px var(--accent-color)' : 'none';

        if (isMilestone) {
            const m = milestones[day];
            const imgSrc = isCompleted ? `<img src="${m.image}" alt="${m.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'; this.parentElement.innerHTML='Img<br>Needed'"/>` : `<span style="font-size: 2rem;">🔒</span>`;
            
            html += `
            <div class="timeline-node milestone-node" style="position: relative; margin-bottom: 3rem;">
                <div class="node-dot" style="position: absolute; left: -61px; top: 0; width: 20px; height: 20px; border-radius: 50%; background: ${dotColor}; box-shadow: ${dotShadow}; border: 2px solid #1a1a1a;"></div>
                <div class="milestone-card fade-in" style="background: rgba(10,10,10,0.8); border: 1px solid ${isCompleted ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)'}; border-radius: 12px; padding: 1.5rem; text-align: left; transition: all 0.3s ease;">
                    <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem; letter-spacing: 2px;">DAY ${day}</div>
                    <div style="display: flex; gap: 1.5rem; align-items: center;">
                        <div class="character-img" style="width: 80px; height: 80px; border-radius: 50%; background: #222; border: 2px solid ${isCompleted ? 'var(--accent-color)' : '#444'}; overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: #555; font-size: 0.8rem; text-align: center;">
                            ${imgSrc}
                        </div>
                        <div>
                            <h3 style="color: ${isCompleted ? 'var(--text-primary)' : 'rgba(255,255,255,0.3)'}; margin-bottom: 0.5rem;">${isCompleted ? m.name : 'Unknown Master'}</h3>
                            <p style="color: ${isCompleted ? 'var(--text-secondary)' : 'rgba(255,255,255,0.2)'}; font-size: 0.95rem; line-height: 1.5;">${isCompleted ? m.text : 'Walk further to reveal this encounter.'}</p>
                        </div>
                    </div>
                </div>
            </div>`;
        } else {
            html += `
            <div class="timeline-node standard-node" style="position: relative; margin-bottom: 1.5rem; height: 10px;">
                <div class="node-dot" style="position: absolute; left: -56px; top: 0; width: 10px; height: 10px; border-radius: 50%; background: ${dotColor}; box-shadow: ${dotShadow}; border: 2px solid #1a1a1a;"></div>
                <div style="padding-left: 1rem; font-size: 0.9rem; color: ${isCompleted ? 'var(--text-secondary)' : 'rgba(255,255,255,0.2)'}; line-height: 10px;">Day ${day}</div>
            </div>`;
        }
    }

    html += '</div>';
    container.innerHTML = html;
}

// Ensure it gets called on initial load
renderJourneyTimeline();
