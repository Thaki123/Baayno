// Main site interactions

// Run after the DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  /* ------------------------ back to top ------------------------ */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    // hide button initially
    backToTop.style.display = 'none';
    // toggle visibility on scroll
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    // smooth scroll to top when clicked
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------ navigation ------------------------ */
  const currentPath = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a[data-path]').forEach((link) => {
    if (link.getAttribute('data-path') === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ------------------------ services orbit ------------------------ */
  const orbit = document.querySelector('.services-orbit');
  if (orbit) {
    const center = orbit.querySelector('.center');
    const defaultContent = center.innerHTML;
    const nodes = orbit.querySelectorAll('.svc-node');
    const articles = document.querySelectorAll('.services-list article');

    nodes.forEach((node, idx) => {
      const article = articles[idx];
      const content = article ? article.innerHTML : `<h3>${node.querySelector('.lbl')?.textContent || ''}</h3>`;
      const show = () => {
        center.innerHTML = content;
      };
      const hide = () => {
        center.innerHTML = defaultContent;
      };

      node.addEventListener('mouseenter', show);
      node.addEventListener('focus', show);
      node.addEventListener('mouseleave', hide);
      node.addEventListener('blur', hide);
      node.addEventListener('click', () => {
        window.location.href = 'services.html';
      });
    });
  }

  /* ------------------------ forms ------------------------ */
  document.querySelectorAll('form[data-spam-guard]').forEach((form) => {
    const tsInput = form.querySelector('input[name="ts"]');
    if (tsInput) {
      tsInput.value = Date.now();
    }

    form.addEventListener('submit', (e) => {
      const hpField = form.querySelector('.hp-field');
      const msg = form.querySelector('.form-message');
      const tooFast = tsInput && Date.now() - parseInt(tsInput.value, 10) < 2000;

      if ((hpField && hpField.value) || tooFast) {
        e.preventDefault();
        if (msg) msg.textContent = 'Submission blocked. Please try again.';
      } else if (msg) {
        msg.textContent = 'Thank you! We will be in touch soon.';
      }
    });
  });
});
