/*
  De Creative Carpenter - JavaScript File
  Interactive elements and user transitions.
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header scroll behavior
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Hamburger Mobile Menu
  const hamburger = document.querySelector('.nav-hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      // Hamburger lines animation
      const lines = hamburger.querySelectorAll('span');
      lines[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
      lines[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
      lines[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
    });
  }

  // 3. FAQ Accordion Logic
  const faqRows = document.querySelectorAll('.faq-row');
  faqRows.forEach(row => {
    const header = row.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        // Toggle the active class
        const isActive = row.classList.contains('active');
        
        // Close all rows
        faqRows.forEach(r => r.classList.remove('active'));
        
        // Open current row if it wasn't open
        if (!isActive) {
          row.classList.add('active');
        }
      });
    }
  });

  // 4. Contact Form Submission Formspree Setup or Mailto Fallback
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value;
      const phone = document.getElementById('form-phone').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      // Premium visual loading feedback
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Sending Request...';
      submitBtn.disabled = true;

      // Construct Mailto Email
      const emailBody = `Name: ${name}%0D%0APhone: ${phone}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
      const mailtoUrl = `mailto:info@cypriandecreativecarpenter.com?subject=${encodeURIComponent(subject || 'Roofing Estimate Request')}&body=${emailBody}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
        
        submitBtn.innerText = 'Request Sent!';
        submitBtn.style.backgroundColor = '#4E6E58'; // Earthy forest green success feedback
        submitBtn.style.color = '#FFFFFF';
        
        setTimeout(() => {
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.color = '';
          contactForm.reset();
        }, 3000);
      }, 1000);
    });
  }

  // 5. Testimonial Slider / Carousel Logic
  const slider = document.querySelector('.testimonials-slider');
  const track = document.querySelector('.testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');
  const dots = document.querySelectorAll('.slider-dots .dot');

  if (slider && track && slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoScrollInterval;

    function updateSlider() {
      // Shift track horizontally
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update active dot indicator
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function goToSlide(index) {
      if (index < 0) {
        currentSlide = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }
      updateSlider();
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function startTimer() {
      stopTimer(); // clear any existing timer first
      autoScrollInterval = setInterval(nextSlide, 3000); // automatic scroll every 5 seconds
    }

    function stopTimer() {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    }

    // Event listeners for arrows
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        startTimer(); // reset auto scroll timer
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        startTimer(); // reset auto scroll timer
      });
    }

    // Event listeners for dot indicators
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
        goToSlide(targetIndex);
        startTimer(); // reset auto scroll timer
      });
    });

    // Pause on hover
    slider.addEventListener('mouseenter', stopTimer);
    slider.addEventListener('mouseleave', startTimer);

    // Touch Swipe Gestures for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      const swipeDistance = touchStartX - touchEndX;
      
      if (Math.abs(swipeDistance) > 50) { // minimum distance for a swipe
        if (swipeDistance > 0) {
          // Swiped left -> Next slide
          goToSlide(currentSlide + 1);
        } else {
          // Swiped right -> Previous slide
          goToSlide(currentSlide - 1);
        }
        startTimer(); // reset auto scroll timer
      }
    }, { passive: true });

    // Initialize slider automatic scroll
    startTimer();
  }
});
