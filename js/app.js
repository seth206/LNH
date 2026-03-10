(function () {
  // Current year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Theme toggle (auto / dark / light cycle)
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');

  function setIcon(mode) {
    icon.className = 'ti ' + (mode === 'dark' ? 'ti-moon' : mode === 'light' ? 'ti-sun-high' : 'ti-sun-high');
  }
  function setTheme(mode) {
    if (mode === 'auto') {
      root.setAttribute('data-theme', 'auto');
      localStorage.removeItem('theme');
      setIcon(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', mode);
      localStorage.setItem('theme', mode);
      setIcon(mode);
    }
  }
  function nextMode(current) {
    return current === 'auto' ? 'dark' : current === 'dark' ? 'light' : 'auto';
  }

  const saved = localStorage.getItem('theme') || 'auto';
  setTheme(saved);
  btn?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'auto';
    setTheme(nextMode(current));
  });

  // Respect system theme changes when in auto
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if ((localStorage.getItem('theme') || 'auto') === 'auto') setTheme('auto');
  });
})();
