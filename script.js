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
  }
];

function renderBentoGrid() {
  const container = document.getElementById('bento-grid');
  
  linksData.forEach(link => {
    const card = document.createElement('a');
    card.href = link.url;
    card.className = `glass-card ${link.size}`;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    
    // Custom gradient style for icons based on the provided base color
    const iconStyle = link.color 
      ? `background: -webkit-linear-gradient(45deg, ${link.color}, #ffffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;` 
      : '';

    // Specialized HTML structure for horizontal 2x1 cards to flex items nicely
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
      // Default structure for 1x1, 1x2, and 2x2
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
