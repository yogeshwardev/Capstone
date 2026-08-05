/* ============================================================
   LabX — Application Router & Interactive Controller
   Mapped routes: #/dashboard, #/labs, #/assets, #/users, #/reports, #/settings, #/architecture, #/alerts
   ============================================================ */

const App = {
  currentPage: 'dashboard',
  currentPageModule: null,
  isLoggedIn: true,

  currentUser: {
    name: 'Alex Morgan',
    role: 'admin',
    initials: 'AM'
  },

  pages: {
    dashboard:    () => DashboardPage,
    labs:         () => LaboratoriesPage,
    laboratories: () => LaboratoriesPage,
    assets:       () => ComputersPage,
    computers:    () => ComputersPage,
    users:        () => UsersPage,
    reports:      () => ReportsPage,
    settings:     () => SettingsPage,
    architecture: () => ArchitecturePage,
    alerts:       () => AlertsPage,
    login:        () => LoginPage
  },

  navItems: [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
    { id: 'labs',      label: 'Labs',      icon: 'building-2' },
    { id: 'assets',    label: 'Assets',    icon: 'layers' },
    { id: 'users',     label: 'Users',     icon: 'user' },
    { id: 'reports',   label: 'Reports',   icon: 'line-chart' },
    { id: 'settings',  label: 'Settings',  icon: 'settings' }
  ],

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  handleRoute() {
    const hash = window.location.hash || '#/dashboard';
    const cleanHash = hash.replace('#/', '');
    const parts = cleanHash.split('/');
    const pageKey = parts[0] || 'dashboard';
    const param = parts[1] || null;

    if (this.currentPageModule && this.currentPageModule.destroy) {
      try {
        this.currentPageModule.destroy();
      } catch (err) {
        console.warn('Destroy error:', err);
      }
    }

    this.currentPage = pageKey;
    const pageFactory = this.pages[pageKey] || this.pages['dashboard'];
    const pageModule = pageFactory();
    this.currentPageModule = pageModule;

    if (pageKey === 'login') {
      this.renderLogin(pageModule);
    } else {
      this.renderApp(pageModule, pageKey, param);
    }
  },

  renderLogin(pageModule) {
    const app = document.getElementById('app');
    app.innerHTML = pageModule.render();
    if (pageModule.init) pageModule.init();
  },

  renderApp(pageModule, pageKey, param) {
    const app = document.getElementById('app');
    
    // Normalize active tab matching for aliases (labs/laboratories, assets/computers)
    const activeId = pageKey === 'laboratories' ? 'labs' : (pageKey === 'computers' ? 'assets' : pageKey);

    app.innerHTML = `
      <div class="app-layout">
        <!-- Dark Sidebar -->
        <aside class="sidebar">
          <div class="sidebar-header">
            <div class="sidebar-logo-icon">
              <i data-lucide="monitor"></i>
            </div>
            <span class="sidebar-logo-text">Lab<span>X</span></span>
          </div>

          <nav class="sidebar-nav">
            ${this.navItems.map(item => `
              <div class="nav-item ${activeId === item.id ? 'active' : ''}" data-page="${item.id}">
                <i data-lucide="${item.icon}"></i>
                <span>${item.label}</span>
              </div>
            `).join('')}
          </nav>
        </aside>

        <!-- Main Wrapper -->
        <div class="main-wrapper">
          <!-- Top Header -->
          <header class="header">
            <h1 class="header-greeting">Good morning, Admin!</h1>

            <!-- Global Live Search -->
            <div class="header-search">
              <input type="text" id="global-search-input" placeholder="Search Labs, Assets, IPs...">
              <i data-lucide="search" class="search-icon"></i>
              <div id="search-results-dropdown" style="display:none; position:absolute; top:48px; left:0; right:0; background:white; border:1px solid #E5E7EB; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.1); z-index:1000; max-height:300px; overflow-y:auto; padding:8px;"></div>
            </div>

            <!-- Header Action Controls & Install Download Button -->
            <div class="header-user">
              <a href="labx-installer.bat" download="labx-installer.bat" class="btn btn-sm btn-primary" title="Download Workstation Installer script for other lab computers">
                <i data-lucide="download" style="width:15px; height:15px;"></i>
                <span>Installer (.bat)</span>
              </a>

              <div class="user-profile" id="user-profile-btn" title="View Profile">
                <div class="user-avatar">${this.currentUser.initials}</div>
                <div class="user-info">
                  <span class="user-name">${this.currentUser.name}</span>
                  <span class="user-role">${this.currentUser.role}</span>
                </div>
                <i data-lucide="chevron-down" style="width:14px; color:#6B7280;"></i>
              </div>

              <div class="header-notif" id="header-notif-btn" title="View Alerts">
                <i data-lucide="bell" style="width:20px;"></i>
              </div>
            </div>
          </header>

          <!-- Main Content Body -->
          <main class="main-content">
            ${param ? pageModule.render(param) : pageModule.render()}
          </main>
        </div>
      </div>
    `;

    try {
      if (pageModule.init) pageModule.init();
    } catch (err) {
      console.error('Page init error:', err);
    }
    this.setupShellListeners();

    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  setupShellListeners() {
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      item.addEventListener('click', () => {
        this.navigate('#/' + item.dataset.page);
      });
    });

    const notif = document.getElementById('header-notif-btn');
    if (notif) {
      notif.addEventListener('click', () => this.navigate('#/alerts'));
    }

    const profile = document.getElementById('user-profile-btn');
    if (profile) {
      profile.addEventListener('click', () => this.navigate('#/settings'));
    }

    const searchInput = document.getElementById('global-search-input');
    const dropdown = document.getElementById('search-results-dropdown');
    if (searchInput && dropdown) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        if (q.length < 2) {
          dropdown.style.display = 'none';
          dropdown.innerHTML = '';
          return;
        }

        const results = [];
        LabData.computers.forEach(c => {
          if (c.hostname.toLowerCase().includes(q) || c.ip.toLowerCase().includes(q) || c.lab.toLowerCase().includes(q)) {
            results.push({ title: c.hostname, subtitle: `${c.ip} • ${c.lab}`, action: `#/assets/${c.id}` });
          }
        });

        LabData.labs.forEach(l => {
          if (l.name.toLowerCase().includes(q)) {
            results.push({ title: l.name, subtitle: `${l.total} Workstations`, action: `#/labs` });
          }
        });

        if (results.length === 0) {
          dropdown.innerHTML = `<div style="padding:10px; font-size:13px; color:#9CA3AF; text-align:center;">No results matching "${q}"</div>`;
        } else {
          dropdown.innerHTML = results.slice(0, 6).map(r => `
            <div class="search-result-item" data-action="${r.action}" style="padding:8px 10px; border-radius:8px; cursor:pointer;" onmouseover="this.style.background='#F3F4F6'" onmouseout="this.style.background='transparent'">
              <strong style="font-size:13px; display:block;">${r.title}</strong>
              <span style="font-size:11px; color:#6B7280;">${r.subtitle}</span>
            </div>
          `).join('');

          dropdown.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
              this.navigate(item.dataset.action);
              dropdown.style.display = 'none';
              searchInput.value = '';
            });
          });
        }
        dropdown.style.display = 'block';
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.header-search')) {
          dropdown.style.display = 'none';
        }
      });
    }
  },

  navigate(hash) {
    window.location.hash = hash;
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
