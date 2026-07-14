/**
 * ISSIG THIÈS - Landing Page Logic
 * Features: Sticky Header, Mobile Navigation, Tabs, Counter Animation, Scroll Reveal, Modal Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // STICKY HEADER
  // ==========================================================================
  const header = document.getElementById('header');
  const checkHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', checkHeaderScroll);
  checkHeaderScroll(); // Check on initial page load


  // ==========================================================================
  // MOBILE NAVIGATION MENU
  // ==========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileNav = () => {
    const isActive = menuToggle.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active', isActive);
    
    // Prevent scrolling behind mobile nav overlay
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  menuToggle.addEventListener('click', toggleMobileNav);

  // Close menu when clicking on nav links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Remove active classes
      menuToggle.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = '';
      
      // Update active state class in links
      mobileNavLinks.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Desktop active links highlighting based on click
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
    });
  });


  // ==========================================================================
  // FORMATIONS TAB SWITCHER
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Update active states on buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Update active states on contents with smooth animation
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `tab-${targetTab}`) {
          content.classList.add('active');
        }
      });
    });
  });


  // ==========================================================================
  // SCROLL REVEAL (Intersection Observer)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger counters if this entry is the figures section
        if (entry.target.classList.contains('figures-section') || entry.target.id === 'figures') {
          triggerCounters();
        }
        
        // Stop observing once revealed
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ==========================================================================
  // COUNTERS ANIMATION
  // ==========================================================================
  let countersTriggered = false;

  const triggerCounters = () => {
    if (countersTriggered) return;
    countersTriggered = true;

    const counterElements = document.querySelectorAll('.figure-number');
    
    counterElements.forEach(counter => {
      const targetValue = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 2000; // Duration of animation in ms
      const stepTime = Math.max(Math.floor(duration / targetValue), 15);
      let currentValue = 0;
      
      const timer = setInterval(() => {
        currentValue += Math.ceil(targetValue / (duration / stepTime));
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }
        
        // Add suffix to numbers
        if (targetValue === 15) {
          counter.textContent = currentValue + '+';
        } else if (targetValue === 100 && counter.parentElement.querySelector('.figure-label').textContent.includes('Diplômes')) {
          counter.textContent = currentValue + '%';
        } else if (targetValue === 100 && counter.parentElement.querySelector('.figure-label').textContent.includes('Encadrement')) {
          counter.textContent = currentValue + '%';
        } else if (targetValue === 30) {
          counter.textContent = currentValue + '+';
        } else {
          counter.textContent = currentValue;
        }
      }, stepTime);
    });
  };

  // Fallback for counters in case Intersection Observer is not fully supported
  const checkCountersFallback = () => {
    const figuresSec = document.getElementById('figures');
    if (figuresSec) {
      const rect = figuresSec.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        triggerCounters();
        window.removeEventListener('scroll', checkCountersFallback);
      }
    }
  };
  window.addEventListener('scroll', checkCountersFallback);


  // ==========================================================================
  // ADMISSION MODAL (CANDIDACY FORM)
  // ==========================================================================
  const modal = document.getElementById('admission-modal');
  const openModalBtns = document.querySelectorAll('.open-admission-modal');
  const closeModalBtn = document.getElementById('modal-close');
  const successCloseBtn = document.getElementById('success-close');
  const candidacyForm = document.getElementById('candidacy-form');
  const candidacySuccess = document.getElementById('candidacy-success');
  const candidacySubmitBtn = document.getElementById('candidacy-submit');
  const successUserName = document.getElementById('success-user-name');

  const openModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable scroll under modal
    
    // Auto-select program tab if postuler button is clicked inside a training card
    // We can extract interest area from cards if needed
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset form states after closing modal (with small delay for smooth transition)
    setTimeout(() => {
      candidacyForm.classList.remove('hidden');
      candidacySuccess.classList.add('hidden');
      candidacyForm.reset();
      
      // Reset submit button state
      candidacySubmitBtn.disabled = false;
      candidacySubmitBtn.querySelector('.btn-text').classList.remove('hidden');
      candidacySubmitBtn.querySelector('.btn-spinner').classList.add('hidden');
    }, 400);
  };

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeModalBtn.addEventListener('click', closeModal);
  successCloseBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside the modal box
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ==========================================================================
// HANDLE CANDIDACY FORM SUBMISSION (FORMSPREE)
// ==========================================================================

candidacyForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const firstNameVal = document.getElementById('cand-firstname').value.trim();

    // Loading
    candidacySubmitBtn.disabled = true;
    candidacySubmitBtn.querySelector('.btn-text').classList.add('hidden');
    candidacySubmitBtn.querySelector('.btn-spinner').classList.remove('hidden');

    try{

        const response = await fetch(candidacyForm.action,{

            method:'POST',

            body:new FormData(candidacyForm),

            headers:{
                'Accept':'application/json'
            }

        });

        if(response.ok){

            successUserName.textContent = firstNameVal;

            candidacyForm.classList.add('hidden');

            candidacySuccess.classList.remove('hidden');

            candidacyForm.reset();

        }else{

            alert("Une erreur est survenue lors de l'envoi de votre candidature.");

        }

    }catch(error){

        alert("Impossible de contacter le serveur. Vérifiez votre connexion Internet.");

    }finally{

        candidacySubmitBtn.disabled = false;

        candidacySubmitBtn.querySelector('.btn-text').classList.remove('hidden');

        candidacySubmitBtn.querySelector('.btn-spinner').classList.add('hidden');

    }

});


  // ==========================================================================
  // NEWSLETTER FORM SUBMISSION
  // ==========================================================================
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMsg = document.getElementById('newsletter-msg');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button');
      
      // Disable inputs during simulation
      emailInput.disabled = true;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';

      setTimeout(() => {
        // Clear input and show success message
        emailInput.value = '';
        emailInput.disabled = false;
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
        
        newsletterMsg.textContent = 'Inscription réussie ! Merci pour votre confiance.';
        newsletterMsg.style.color = 'var(--color-secondary-light)';
        
        // Clear status message after 4 seconds
        setTimeout(() => {
          newsletterMsg.textContent = '';
        }, 4000);
      }, 1200);
    });
  }
});
