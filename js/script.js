document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const navPanel = document.getElementById('navPanel');
  const navClose = document.getElementById('navClose');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');

  const savedTheme = localStorage.getItem('portfolioTheme') || 'light';
  document.body.dataset.theme = savedTheme;

  const syncThemeControl = () => {
    if (!themeToggle || !themeLabel) return;

    const isDark = document.body.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeLabel.textContent = isDark ? 'Dark' : 'Light';
  };

  syncThemeControl();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
      document.body.dataset.theme = nextTheme;
      localStorage.setItem('portfolioTheme', nextTheme);
      syncThemeControl();
    });
  }

  const heroName = document.querySelector('.hero-content h1');
  const heroPhoto = document.querySelector('.hero-visual .avatar-bg');
  const updateHeader = () => {
    const isScrolled = window.scrollY > 24;
    const hasPassedHeroName = heroName && heroName.getBoundingClientRect().bottom <= header.offsetHeight;
    const hasPassedHeroPhoto = heroPhoto && heroPhoto.getBoundingClientRect().bottom <= header.offsetHeight;
    header.classList.toggle('scrolled', isScrolled);
    header.classList.toggle('transparent', !isScrolled);
    header.classList.toggle('show-brand-name', Boolean(hasPassedHeroName));
    header.classList.toggle('show-brand-photo', Boolean(hasPassedHeroPhoto));
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeNavigation = () => {
    navPanel.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  };

  const navIndicator = document.createElement('span');
  navIndicator.className = 'nav-indicator';
  navIndicator.setAttribute('aria-hidden', 'true');
  navPanel.querySelector('.nav-links')?.append(navIndicator);

  const moveNavIndicator = () => {
    const activeLink = navLinks.find((link) => link.classList.contains('active'));
    const linksContainer = navPanel.querySelector('.nav-links');
    if (!activeLink || !linksContainer) return;

    const linkRect = activeLink.getBoundingClientRect();
    const listRect = linksContainer.getBoundingClientRect();
    const isMobileMenu = window.matchMedia('(max-width: 639px)').matches;
    const horizontalPadding = 9;
    const verticalPadding = isMobileMenu ? 6 : 6;
    const x = isMobileMenu ? 0 : linkRect.left - listRect.left - horizontalPadding;
    const y = linkRect.top - listRect.top - verticalPadding;
    const width = isMobileMenu ? listRect.width : linkRect.width + horizontalPadding * 2;
    linksContainer.style.setProperty('--indicator-x', `${x}px`);
    linksContainer.style.setProperty('--indicator-y', `${y}px`);
    linksContainer.style.setProperty('--indicator-width', `${width}px`);
    linksContainer.style.setProperty('--indicator-height', `${linkRect.height + verticalPadding * 2}px`);
    linksContainer.classList.add('has-indicator');
  };

  const setActiveNavLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
    moveNavIndicator();
    if (window.matchMedia('(max-width: 639px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navIndicator.animate(
        [
          { clipPath: 'inset(0 0 0 100% round 999px)' },
          { clipPath: 'inset(0 0 0 0 round 999px)' }
        ],
        { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' }
      );
    }
  };

  moveNavIndicator();
  window.addEventListener('resize', moveNavIndicator, { passive: true });

  navToggle.addEventListener('click', () => {
    const isOpen = navPanel.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
  });

  navClose?.addEventListener('click', closeNavigation);

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeNavigation();
    });
  });

  const pageSections = Array.from(document.querySelectorAll('main section[id]'));
  let sectionUpdateFrame = 0;
  const updateActiveSection = () => {
    if (sectionUpdateFrame) return;

    sectionUpdateFrame = requestAnimationFrame(() => {
      sectionUpdateFrame = 0;
      const activationLine = window.innerHeight * 0.32;
      const activeSection = pageSections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= activationLine && bounds.bottom > activationLine;
      }) || pageSections.reduce((closest, section) => {
        const distance = Math.abs(section.getBoundingClientRect().top - activationLine);
        return !closest || distance < closest.distance ? { section, distance } : closest;
      }, null)?.section;

      if (!activeSection) return;
      const currentActive = navLinks.find((link) => link.classList.contains('active'));
      if (currentActive?.getAttribute('href') !== `#${activeSection.id}`) {
        setActiveNavLink(activeSection.id);
      }
    });
  };

  updateActiveSection();
  window.addEventListener('scroll', updateActiveSection, { passive: true });
  window.addEventListener('resize', updateActiveSection, { passive: true });

  const typedText = document.getElementById('typedText');
  const taglines = ['Web Developer', 'UI/UX Designer', 'Project Lead'];
  let taglineIndex = 0;

  const rotateTagline = () => {
    if (!typedText) return;

    typedText.animate([
      { opacity: 0.25, transform: 'translateY(4px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 420, easing: 'ease-out' });

    typedText.textContent = taglines[taglineIndex];
    taglineIndex = (taglineIndex + 1) % taglines.length;
  };

  rotateTagline();
  setInterval(rotateTagline, 2600);

  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.counter);
      const prefix = target >= 10 ? '' : '';
      const duration = 1500;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        counter.textContent = Math.round(progress * target) + prefix;

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(counter);
    });
  }, { threshold: 0.55 });

  counters.forEach((counter) => counterObserver.observe(counter));

  const initInlineDashboardCarousel = (inlineDashboardGallery) => {
    if (!inlineDashboardGallery) return;

    const carouselTrack = inlineDashboardGallery.querySelector('.carousel-track');
    const prevButton = inlineDashboardGallery.querySelector('.carousel-prev');
    const nextButton = inlineDashboardGallery.querySelector('.carousel-next');

    if (!carouselTrack) return;

    const getSlideStep = () => {
      const slide = carouselTrack.querySelector('.gallery-slide');
      if (!slide) return carouselTrack.clientWidth || 240;

      const trackStyles = window.getComputedStyle(carouselTrack);
      const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
      return slide.getBoundingClientRect().width + gap;
    };

    const scrollGallery = (direction) => {
      const maxScrollLeft = Math.max(carouselTrack.scrollWidth - carouselTrack.clientWidth, 0);
      const nextPosition = carouselTrack.scrollLeft + (direction * getSlideStep());

      if (direction > 0 && nextPosition >= maxScrollLeft - 1) {
        carouselTrack.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (direction < 0 && nextPosition <= 0) {
        carouselTrack.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      } else {
        carouselTrack.scrollTo({ left: nextPosition, behavior: 'smooth' });
      }
    };

    let carouselTimer = null;

    const startCarousel = () => {
      if (carouselTimer) return;

      carouselTimer = setInterval(() => {
        scrollGallery(1);
      }, 2200);
    };

    const stopCarousel = () => {
      if (carouselTimer) {
        clearInterval(carouselTimer);
        carouselTimer = null;
      }
    };

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        stopCarousel();
        scrollGallery(-1);
        startCarousel();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        stopCarousel();
        scrollGallery(1);
        startCarousel();
      });
    }

    inlineDashboardGallery.addEventListener('mouseenter', stopCarousel);
    inlineDashboardGallery.addEventListener('mouseleave', startCarousel);
    inlineDashboardGallery.addEventListener('focusin', stopCarousel);
    inlineDashboardGallery.addEventListener('focusout', startCarousel);

    startCarousel();
  };

  document.querySelectorAll('.dashboard-inline-gallery').forEach(initInlineDashboardCarousel);

  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const closeModal = document.getElementById('modalClose');
  const projectData = {
    cpc: {
      title: 'CPC Centralized System',
      subtitle: 'Production, Inventory, Sales, and Logistics Platform',
      detail: 'A centralized solution designed to support operations across sales, production, inventory, and logistics data.',
      bullets: ['Unified operational reporting', 'User-friendly dashboard experience', 'Designed for scalable process visibility']
    },
    dashboard: {
      title: 'CPC Dashboard Experience',
      subtitle: 'Frontend UI concept for system monitoring',
      detail: 'A dashboard-first experience for visualizing system data and operational indicators.',
      bullets: ['Role-focused UI structure', 'Responsive design system', 'Project monitoring and reporting panels'],
      gallery: Array.from({ length: 13 }, (_, index) => ({ src: 'assets/ui-placeholder.svg', label: `UI Snapshot ${index + 1}` }))
    },
    automation: {
      title: 'Process Automation Workflow',
      subtitle: 'Operational data integration and automation layer',
      detail: 'A workflow-focused project that reduces manual work and supports organization-wide visibility.',
      bullets: ['Operational process mapping', 'Shared data workflow design', 'System feasibility and reporting support']
    },
    gamemechanics: {
      title: 'Game Mechanics Website',
      subtitle: 'Masters of World Literature group project',
      detail: 'A website created during first-year IT studies to present the game mechanics and interactive concepts for Masters of World Literature.',
      bullets: ['Collaborative group project delivery', 'Game mechanics and content presentation', 'Built with HTML, CSS, and JavaScript']
    },
    cinemabuddy: {
      title: 'CinemaBuddy',
      subtitle: 'Movie discovery and viewing companion app concept',
      detail: 'A mobile UI/UX concept for helping users discover films, sign in securely, and personalize their viewing journey.',
      bullets: ['Mobile-first interface design', 'Movie discovery and account flows', 'Interactive Figma prototype screens']
    },
    cinemabuddyux: {
      title: 'CinemaBuddy UX Walkthrough',
      subtitle: 'End-to-end mobile prototype experience',
      detail: 'A video walkthrough that demonstrates CinemaBuddy’s main user experience, from onboarding and account access to exploring films.',
      bullets: ['Autoplaying prototype walkthrough', 'Key account and discovery flows', 'Designed for a clear mobile viewing experience']
    }
  };

  document.querySelectorAll('[data-project]').forEach((button) => {
    button.addEventListener('click', () => {
      const project = projectData[button.dataset.project];
      if (!project) return;

      modalContent.innerHTML = `
        <span class="overline">Project Detail</span>
        <h3>${project.title}</h3>
        <p class="modal-subtitle">${project.subtitle}</p>
        <p>${project.detail}</p>
        <ul>
          ${project.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
        </ul>
      `;

      modal.showModal();
    });
  });

  closeModal.addEventListener('click', () => {
    modal.close();
    const carouselTrack = modalContent.querySelector('.carousel-track');
    if (carouselTrack) {
      carouselTrack.scrollTo({ left: 0, behavior: 'instant' });
    }
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  const certModal = document.getElementById('certificateModal');
  const certModalImage = document.getElementById('certModalImage');
  const certModalCaption = document.getElementById('certModalCaption');
  const certModalClose = document.getElementById('certModalClose');

  document.querySelectorAll('#certifications .cert-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const img = link.querySelector('img');
      const title = link.dataset.title || img?.alt || 'Certificate';

      certModalImage.src = link.href;
      certModalImage.alt = title;
      certModalCaption.textContent = title;
      certModal.showModal();
    });
  });

  document.querySelectorAll('.dashboard-inline-gallery .gallery-slide img').forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `View ${image.alt} in full size`);

    const openGalleryImage = () => {
      certModalImage.src = image.currentSrc || image.src;
      certModalImage.alt = image.alt;
      certModalCaption.textContent = image.alt;
      certModal.showModal();
    };

    image.addEventListener('click', openGalleryImage);
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openGalleryImage();
      }
    });
  });

  certModalClose.addEventListener('click', () => {
    certModal.close();
  });

  certModal.addEventListener('click', (event) => {
    if (event.target === certModal) {
      certModal.close();
    }
  });

  const contactForm = document.getElementById('contactForm');
  const submitButton = document.getElementById('submitButton');
  const loader = document.getElementById('loader');
  const formStatus = document.getElementById('formStatus');

  // Optional Formspree configuration. Replace the string below with your actual Formspree endpoint.
  // Example: window.FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';
  // You can keep this as an empty string to use the local front-end demo fallback.
  const formspreeEndpoint = window.FORMSPREE_ENDPOINT || '';

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (fieldName) => {
    const field = contactForm.elements[fieldName];
    const fieldGroup = field.closest('.form-row');
    const errorElement = document.getElementById(`${fieldName}Error`);

    if (!field || !fieldGroup || !errorElement) return true;

    const value = field.value.trim();
    let valid = true;

    if (fieldName === 'name' && value.length < 2) {
      errorElement.textContent = 'Please enter your name.';
      fieldGroup.classList.add('has-error');
      valid = false;
    } else if (fieldName === 'email' && !emailPattern.test(value)) {
      errorElement.textContent = 'Please enter a valid email address.';
      fieldGroup.classList.add('has-error');
      valid = false;
    } else if (fieldName === 'message' && value.length < 10) {
      errorElement.textContent = 'Please enter a message with at least 10 characters.';
      fieldGroup.classList.add('has-error');
      valid = false;
    } else {
      errorElement.textContent = '';
      fieldGroup.classList.remove('has-error');
      fieldGroup.classList.add('success');
    }

    return valid;
  };

  contactForm.elements.name.addEventListener('blur', () => validateField('name'));
  contactForm.elements.email.addEventListener('blur', () => validateField('email'));
  contactForm.elements.message.addEventListener('blur', () => validateField('message'));

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = contactForm.elements.name;
    const email = contactForm.elements.email;
    const message = contactForm.elements.message;

    const validName = validateField('name');
    const validEmail = validateField('email');
    const validMessage = validateField('message');

    if (!validName || !validEmail || !validMessage) {
      formStatus.textContent = 'Please correct the highlighted fields.';
      formStatus.classList.add('error');
      return;
    }

    submitButton.disabled = true;
    loader.classList.remove('hidden');
    submitButton.querySelector('.button-text').textContent = 'Sending...';
    formStatus.classList.remove('error');
    formStatus.textContent = '';

    try {
      if (formspreeEndpoint) {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name.value.trim(),
            email: email.value.trim(),
            message: message.value.trim()
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Unable to send message.');
        }
      } else {
        // Local static-site placeholder. This allows the site to demo a real loading/success/error cycle
        // without an API credential. Replace the endpoint above with a Formspree or EmailJS integration.
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      formStatus.textContent = 'Thank you. Your message has been sent successfully.';
      formStatus.classList.remove('error');
      contactForm.reset();
    } catch (error) {
      formStatus.textContent = 'Something went wrong. Please try again later.';
      formStatus.classList.add('error');
    } finally {
      submitButton.disabled = false;
      loader.classList.add('hidden');
      submitButton.querySelector('.button-text').textContent = 'Send Message';
    }
  });

  const scrollProgress = document.getElementById('scrollProgress');
  const updateScrollProgress = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    scrollProgress.style.width = `${Math.min(progress, 100)}%`;
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  const sections = document.querySelectorAll('main .section');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (finePointer.matches && !reduceMotion.matches) {
    sections.forEach((section) => {
      let pointerFrame = 0;
      section.addEventListener('pointermove', (event) => {
        section.classList.add('cursor-active');
        if (pointerFrame) cancelAnimationFrame(pointerFrame);
        pointerFrame = requestAnimationFrame(() => {
          const bounds = section.getBoundingClientRect();
          section.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
          section.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
          pointerFrame = 0;
        });
      }, { passive: true });
      section.addEventListener('pointerleave', () => {
        if (pointerFrame) cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        section.classList.remove('cursor-active');
      }, { passive: true });
    });
  }
});
