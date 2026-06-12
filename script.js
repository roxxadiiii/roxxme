const linksData = [
  {
    title: "GitHub",
    subtitle: "Check out my open-source projects, dotfiles, and code experiments.",
    icon: "ti-brand-github",
    url: "https://github.com/roxx",
    size: "size-2x2",
    color: "#ffffff"
  },
  {
    title: "Twitter / X",
    subtitle: "Thoughts on AI, Linux, and tech.",
    icon: "ti-brand-twitter",
    url: "#",
    size: "size-2x1",
    color: "#1DA1F2"
  },
  {
    title: "Medium",
    subtitle: "Deep dives into Machine Learning, knowledge management, and terminal setups.",
    icon: "ti-brand-medium",
    url: "#",
    size: "size-1x2",
    color: "#ff8a00"
  },
  {
    title: "LinkedIn",
    subtitle: "Professional network",
    icon: "ti-brand-linkedin",
    url: "#",
    size: "size-1x1",
    color: "#0A66C2"
  },
  {
    title: "ML Projects",
    subtitle: "Models & Data",
    icon: "ti-flask",
    url: "#",
    size: "size-1x1",
    color: "#ff758c"
  },
  {
    title: "Blog / Notes",
    subtitle: "Zettelkasten",
    icon: "ti-notebook",
    url: "#",
    size: "size-1x1",
    color: "#ff7eb3"
  },
  {
    title: "Dotfiles",
    subtitle: "My config files",
    icon: "ti-terminal",
    url: "#",
    size: "size-2x1",
    color: "#a18cd1"
  },
  {
    title: "CV / Resume",
    subtitle: "My experience",
    icon: "ti-file-description",
    url: "#",
    size: "size-1x1",
    color: "#fbc2eb"
  },
  {
    title: "Contact",
    subtitle: "Send a mail",
    icon: "ti-mail",
    url: "#",
    size: "size-1x1",
    color: "#84fab0"
  },
  {
    title: "Discord",
    subtitle: "Community",
    icon: "ti-brand-discord",
    url: "#",
    size: "size-1x1",
    color: "#5865F2"
  },
  {
    title: "Telegram",
    subtitle: "Direct Message",
    icon: "ti-messages",
    url: "#",
    size: "size-1x1",
    color: "#0088cc"
  },
  {
    type: "joke",
    size: "size-2x2"
  }
];

// Curated fallback jokes if API is unavailable
const fallbackJokes = [
  { setup: "Why do programmers prefer dark mode?", delivery: "Because light attracts bugs!" },
  { setup: "How many programmers does it take to change a light bulb?", delivery: "None — that's a hardware problem." },
  { setup: "Why do Java developers wear glasses?", delivery: "Because they don't C#." },
  { single: "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'" },
  { setup: "What's a programmer's favourite hangout place?", delivery: "Foo Bar." },
  { single: "There are 10 types of people in the world: those who understand binary and those who don't." },
  { setup: "Why do programmers always mix up Christmas and Halloween?", delivery: "Because Oct 31 == Dec 25." },
  { single: "Debugging: Being the detective in a crime movie where you are also the murderer." },
  { setup: "What did the Java code say to the C code?", delivery: "You've got no class." },
  { single: "It's not a bug, it's an undocumented feature." }
];

function renderBentoGrid() {
  const container = document.getElementById('bento-grid');

  linksData.forEach(link => {
    // ── Joke card branch ──────────────────────────────────
    if (link.type === 'joke') {
      const card = document.createElement('div');
      card.className = `joke-card ${link.size}`;
      card.id = 'joke-card';
      card.innerHTML = `
        <div class="joke-header-row">
          <div class="joke-header-left">
            <i class="ti ti-mood-wink joke-icon"></i>
            <span class="joke-label">Dev Joke</span>
          </div>
          <button class="refresh-joke-btn" id="refresh-joke-btn" title="Get another joke" aria-label="Refresh joke">
            <i class="ti ti-refresh"></i>
          </button>
        </div>
        <div class="joke-body" id="joke-body">
          <div class="joke-skeleton">
            <div class="skeleton-line long"></div>
            <div class="skeleton-line medium"></div>
            <div class="skeleton-line short"></div>
          </div>
        </div>
        <div class="joke-footer">
          <i class="ti ti-api"></i>
          <span>jokeapi.dev • safe mode</span>
        </div>
      `;
      container.appendChild(card);

      // Fetch on render
      fetchProgrammingJoke();

      document.getElementById('refresh-joke-btn').addEventListener('click', () => {
        fetchProgrammingJoke();
      });
      return;
    }

    // ── Standard link card branch ─────────────────────────
    const card = document.createElement('a');
    card.href = link.url;
    card.className = `glass-card ${link.size}`;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    const iconStyle = link.color
      ? `background: -webkit-linear-gradient(45deg, ${link.color}, #ffffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`
      : '';

    if (link.size === 'size-2x1') {
      card.innerHTML = `
        <div class="glass-card-inner">
          <i class="ti ${link.icon} card-icon" style="${iconStyle}"></i>
          <div>
            <h2 class="card-title">${link.title}</h2>
            <p class="card-subtitle">${link.subtitle}</p>
          </div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <i class="ti ${link.icon} card-icon" style="${iconStyle}"></i>
        <div>
          <h2 class="card-title">${link.title}</h2>
          <p class="card-subtitle">${link.subtitle}</p>
        </div>
      `;
    }

    container.appendChild(card);
  });
}

async function fetchProgrammingJoke() {
  const body    = document.getElementById('joke-body');
  const btn     = document.getElementById('refresh-joke-btn');
  if (!body) return;

  // Loading state
  btn.classList.add('spinning');
  body.innerHTML = `
    <div class="joke-skeleton">
      <div class="skeleton-line long"></div>
      <div class="skeleton-line medium"></div>
      <div class="skeleton-line short"></div>
    </div>
  `;

  // Remove spin class after animation ends so it can retrigger
  btn.addEventListener('animationend', () => btn.classList.remove('spinning'), { once: true });

  try {
    const res  = await fetch('https://v2.jokeapi.dev/joke/Programming?safe-mode&blacklistFlags=nsfw,racist,sexist');
    if (!res.ok) throw new Error('API error');
    const data = await res.json();

    if (data.type === 'twopart') {
      body.innerHTML = `
        <p class="joke-setup">${data.setup}</p>
        <p class="joke-punchline">👾 ${data.delivery}</p>
      `;
    } else {
      body.innerHTML = `<p class="joke-single">${data.joke}</p>`;
    }
  } catch (_) {
    // Graceful fallback to local curated joke
    const pick = fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
    if (pick.single) {
      body.innerHTML = `<p class="joke-single">${pick.single}</p>`;
    } else {
      body.innerHTML = `
        <p class="joke-setup">${pick.setup}</p>
        <p class="joke-punchline">👾 ${pick.delivery}</p>
      `;
    }
  }
}

const themesList = [
  'dracula', 'tokyo-night', 'catppuccin', 'nord', 'gruvbox', 
  'solarized-dark', 'solarized-light', 'cyberpunk', 'synthwave', 
  'rose-pine', 'monokai', 'one-dark', 'material-ocean', 
  'dracula-light', 'hacker-terminal'
];

const animationsList = [
  { val: 'anim-scale-up', name: 'Scale Up' },
  { val: 'anim-scale-down', name: 'Scale Down' },
  { val: 'anim-float', name: 'Float' },
  { val: 'anim-sink', name: 'Sink' },
  { val: 'anim-tilt-left', name: 'Tilt Left' },
  { val: 'anim-tilt-right', name: 'Tilt Right' },
  { val: 'anim-wiggle', name: 'Wiggle' },
  { val: 'anim-pulse', name: 'Pulse' },
  { val: 'anim-glow', name: 'Glow' },
  { val: 'anim-shadow-pop', name: 'Shadow Pop' },
  { val: 'anim-border-glow', name: 'Border Glow' },
  { val: 'anim-flip-x', name: 'Flip X' },
  { val: 'anim-flip-y', name: 'Flip Y' },
  { val: 'anim-jelly', name: 'Jelly' },
  { val: 'anim-shake', name: 'Shake' },
  { val: 'anim-bounce', name: 'Bounce' },
  { val: 'anim-spin-slight', name: 'Spin Slight' },
  { val: 'anim-blur-out', name: 'Blur Out' },
  { val: 'anim-push-3d', name: 'Push 3D' },
  { val: 'anim-slide-up', name: 'Slide Up' },
  { val: 'anim-neon-glitch', name: 'Neon Glitch' }
];

function initSwitchers() {
  console.log("initSwitchers initialized successfully");
  const themeLink = document.getElementById('theme-stylesheet');
  const bentoGrid = document.getElementById('bento-grid');
  const settingsToggle = document.getElementById('settings-toggle');
  const settingsPill = document.getElementById('settings-pill');

  // Toggle Settings Pill
  settingsToggle.addEventListener('click', () => {
    const isExpanded = settingsPill.classList.toggle('expanded');
    console.log("Settings toggled. expanded:", isExpanded);
    if (!isExpanded) {
      closeAllDropdowns();
    }
  });

  function closeAllDropdowns() {
    console.log("Closing all dropdowns");
    document.querySelectorAll('.custom-select.active').forEach(select => {
      select.classList.remove('active');
      select.querySelector('.custom-select-trigger').setAttribute('aria-expanded', 'false');
    });
  }

  // Helper to format theme name display
  function formatThemeName(t) {
    return t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  // Helper to set up custom dropdown
  function setupCustomDropdown(selectId, triggerId, containerId, items, savedVal, onSelect) {
    console.log("Setting up custom dropdown:", selectId);
    const selectEl = document.getElementById(selectId);
    const triggerEl = document.getElementById(triggerId);
    const containerEl = document.getElementById(containerId);
    const labelSpan = triggerEl.querySelector('.selected-value');

    // Toggle dropdown active state
    triggerEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = selectEl.classList.contains('active');
      console.log(`Trigger ${triggerId} clicked. Current isActive:`, isActive);
      
      // Close other dropdowns first
      closeAllDropdowns();

      if (!isActive) {
        selectEl.classList.add('active');
        triggerEl.setAttribute('aria-expanded', 'true');
        console.log(`Added active class to ${selectId}`);
      } else {
        console.log(`Dropdown ${selectId} was active, now closed`);
      }
    });

    // Populate items
    items.forEach(item => {
      const val = typeof item === 'string' ? item : item.val;
      const text = typeof item === 'string' ? formatThemeName(item) : item.name;

      const opt = document.createElement('div');
      opt.className = 'custom-option';
      opt.setAttribute('role', 'option');
      opt.textContent = text;
      opt.dataset.value = val;

      if (val === savedVal) {
        opt.classList.add('selected');
        labelSpan.textContent = text;
      }

      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Update selection states
        containerEl.querySelectorAll('.custom-option').forEach(el => el.classList.remove('selected'));
        opt.classList.add('selected');
        labelSpan.textContent = text;
        
        // Close dropdown
        selectEl.classList.remove('active');
        triggerEl.setAttribute('aria-expanded', 'false');

        // Fire select callback
        onSelect(val);
      });

      containerEl.appendChild(opt);
    });
  }

  // Load Preferences
  const savedTheme = localStorage.getItem('linktree-theme') || 'dracula';
  const savedAnim = localStorage.getItem('linktree-anim') || 'anim-float';

  // Apply initial preferences
  themeLink.href = 'themes/' + savedTheme + '.css';
  bentoGrid.className = 'bento-grid ' + savedAnim;

  // Set up theme custom selector
  setupCustomDropdown(
    'theme-select-custom',
    'theme-trigger',
    'theme-options',
    themesList,
    savedTheme,
    (val) => {
      themeLink.href = 'themes/' + val + '.css';
      localStorage.setItem('linktree-theme', val);
    }
  );

  // Set up animation custom selector
  setupCustomDropdown(
    'anim-select-custom',
    'anim-trigger',
    'anim-options',
    animationsList,
    savedAnim,
    (val) => {
      bentoGrid.className = 'bento-grid ' + val;
      localStorage.setItem('linktree-anim', val);
    }
  );

  // Close dropdowns on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select')) {
      closeAllDropdowns();
    }
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderBentoGrid();
  initSwitchers();
});
