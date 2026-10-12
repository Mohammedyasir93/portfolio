const portfolioConfig = {
  social: {
    github: '',
    linkedin: ''
  },
  resumePath: 'assets/resume.pdf',
  contactEndpoint: '',
  skills: [
    { name: 'HTML5', category: 'Markup', mark: 'HTML' },
    { name: 'CSS3', category: 'Styling', mark: 'CSS' },
    { name: 'JavaScript', category: 'Language', mark: 'JS' },
    { name: 'React', category: 'Frontend', mark: 'RE' },
    { name: 'Node.js', category: 'Runtime', mark: 'N' },
    { name: 'Express.js', category: 'Backend', mark: 'EX' },
    { name: 'MongoDB', category: 'Database', mark: 'DB' },
    { name: 'MySQL', category: 'Database', mark: 'SQL' },
    { name: 'Git', category: 'Version control', mark: 'GIT' },
    { name: 'GitHub', category: 'Collaboration', mark: 'GH' }
  ],
  projects: [
    {
      number: '01', name: 'Personal portfolio', category: 'Portfolio concept',
      description: 'A personal website concept for presenting projects, skills, and ways to connect.',
      technologies: ['HTML', 'CSS', 'JavaScript'], visual: 'visual-portfolio', mark: '01',
      github: '', demo: ''
    },
    {
      number: '02', name: 'Task management app', category: 'Productivity concept',
      description: 'A task management concept focused on organizing work into a clear, useful workflow.',
      technologies: ['React', 'Node.js', 'MongoDB'], visual: 'visual-tasks', mark: '02',
      github: '', demo: ''
    },
    {
      number: '03', name: 'Student management system', category: 'Education concept',
      description: 'A student information concept for keeping academic records and administration organized.',
      technologies: ['JavaScript', 'Express.js', 'MySQL'], visual: 'visual-students', mark: '03',
      github: '', demo: ''
    }
  ],
  education: {
    collegeDates: '',
    collegeDegree: '',
    schoolDates: '',
    schoolQualification: ''
  }
};

const skillsGrid = document.querySelector('#skills-grid');
const projectsGrid = document.querySelector('#projects-grid');
const resumeButton = document.querySelector('#resume-download');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

function renderSkills() {
  skillsGrid.innerHTML = portfolioConfig.skills.map((skill) => `
    <article class="skill-card">
      <span class="skill-glyph" aria-hidden="true">${escapeHTML(skill.mark)}</span>
      <span><strong>${escapeHTML(skill.name)}</strong><span>${escapeHTML(skill.category)}</span></span>
    </article>
  `).join('');
}

function renderProjects() {
  projectsGrid.innerHTML = portfolioConfig.projects.map((project) => `
    <article class="project-card">
      <div class="project-visual ${escapeHTML(project.visual)}" aria-hidden="true"><span class="visual-label">${escapeHTML(project.mark)}</span></div>
      <div class="project-content">
        <div class="project-meta"><span>${escapeHTML(project.category)}</span><span>Concept</span></div>
        <h3>${escapeHTML(project.name)}</h3>
        <p>${escapeHTML(project.description)}</p>
        <ul class="tag-list">${project.technologies.map((technology) => `<li>${escapeHTML(technology)}</li>`).join('')}</ul>
        <div class="project-links">
          ${projectLink(project.github, 'GitHub')}
          ${projectLink(project.demo, 'Live demo')}
        </div>
      </div>
    </article>
  `).join('');
}

function projectLink(url, label) {
  if (!url) {
    return `<a class="project-link" data-inactive="true" href="#projects" aria-disabled="true" title="Add a real ${label.toLowerCase()} URL in script.js">${label} <span aria-hidden="true">↗</span></a>`;
  }
  return `<a class="project-link" href="${escapeAttribute(url)}" target="_blank" rel="noreferrer">${label} <span aria-hidden="true">↗</span></a>`;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function escapeAttribute(value) {
  return escapeHTML(value);
}

function setSocialLinks() {
  document.querySelectorAll('[data-social]').forEach((link) => {
    const url = portfolioConfig.social[link.dataset.social];
    if (url) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noreferrer';
    } else {
      link.href = '#contact';
      link.removeAttribute('target');
      link.setAttribute('aria-disabled', 'true');
      link.title = `Add your ${link.dataset.social === 'github' ? 'GitHub' : 'LinkedIn'} profile URL in script.js`;
      link.addEventListener('click', (event) => event.preventDefault());
      link.classList.add('profile-link-inactive');
    }
  });
}

function setEducation() {
  Object.entries(portfolioConfig.education).forEach(([key, value]) => {
    const element = document.querySelector(`[data-education="${key}"]`);
    if (value) element.textContent = value;
  });
}

function setResumeDownload() {
  fetch(portfolioConfig.resumePath, { method: 'HEAD' })
    .then((response) => {
      if (!response.ok) return;
      resumeButton.disabled = false;
      resumeButton.title = 'Download résumé PDF';
      resumeButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = portfolioConfig.resumePath;
        link.download = 'Mohamed-Yasir-Resume.pdf';
        link.click();
      });
    })
    .catch(() => {
      resumeButton.title = 'Add your PDF to assets/resume.pdf to enable this download';
    });
}

function setTypingAnimation() {
  const target = document.querySelector('.typing-text');
  const phrases = ['thoughtful web experiences', 'useful applications', 'ideas into interfaces'];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let phraseIndex = 0;
  let characterIndex = phrases[0].length;
  let deleting = true;

  function type() {
    const phrase = phrases[phraseIndex];
    characterIndex += deleting ? -1 : 1;
    target.textContent = phrase.slice(0, characterIndex);
    let delay = deleting ? 38 : 68;
    if (characterIndex <= 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 380;
    } else if (characterIndex >= phrases[phraseIndex].length) {
      deleting = true;
      delay = 1500;
    }
    window.setTimeout(type, delay);
  }
  window.setTimeout(type, 1600);
}

function setRevealAnimations() {
  const revealItems = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}

function setMobileNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('#nav-links');
  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    links.classList.remove('is-open');
  }
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    links.classList.toggle('is-open', !isOpen);
  });
  links.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

function setFormValidation() {
  const fields = [...contactForm.querySelectorAll('input, textarea')];
  const errorText = {
    name: 'Please enter at least 2 characters.',
    email: 'Enter a valid email address.',
    subject: 'Please enter a subject.',
    message: 'Please enter at least 10 characters.'
  };

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      field.removeAttribute('aria-invalid');
      document.querySelector(`#${field.name}-error`).textContent = '';
    });
  });

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    formStatus.classList.remove('is-success', 'is-error');
    let isValid = true;
    fields.forEach((field) => {
      const error = document.querySelector(`#${field.name}-error`);
      if (!field.checkValidity()) {
        field.setAttribute('aria-invalid', 'true');
        error.textContent = field.validity.typeMismatch ? errorText.email : errorText[field.name];
        isValid = false;
      } else {
        field.removeAttribute('aria-invalid');
        error.textContent = '';
      }
    });
    if (!isValid) {
      formStatus.textContent = 'Please check the highlighted fields.';
      formStatus.classList.add('is-error');
      contactForm.querySelector('[aria-invalid="true"]').focus();
      return;
    }
    if (!portfolioConfig.contactEndpoint) {
      formStatus.textContent = 'Your message is valid, but delivery is not connected yet. Add a Formspree endpoint in script.js to receive submissions.';
      return;
    }
    const submitButton = contactForm.querySelector('[type="submit"]');
    submitButton.disabled = true;
    formStatus.textContent = 'Sending your message…';
    try {
      const response = await fetch(portfolioConfig.contactEndpoint, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Submission failed');
      contactForm.reset();
      formStatus.textContent = 'Thanks, your message has been sent.';
      formStatus.classList.add('is-success');
    } catch {
      formStatus.textContent = 'The message could not be sent. Check the form endpoint and try again.';
      formStatus.classList.add('is-error');
    } finally {
      submitButton.disabled = false;
    }
  });
}

renderSkills();
renderProjects();
setSocialLinks();
setEducation();
setResumeDownload();
setTypingAnimation();
setRevealAnimations();
setMobileNavigation();
setFormValidation();
document.querySelector('#copyright-year').textContent = new Date().getFullYear();
