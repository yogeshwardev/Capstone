const LoginPage = {
  render() {
    return `
<div class="login-page">
  <div class="login-container">
    <div class="login-logo">
      <div class="login-logo-icon"><i data-lucide="monitor"></i></div>
      <span class="login-brand">Lab<span>X</span></span>
    </div>
    <h2 class="login-title">Welcome to LabX</h2>
    <p class="login-subtitle">Sign in to continue to the monitoring dashboard</p>
    <form id="login-form">
      <div class="form-group">
        <label class="form-label">Username</label>
        <input type="text" class="form-input" id="login-username" placeholder="Enter your username" value="admin">
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <input type="password" class="form-input" id="login-password" placeholder="Enter your password" value="admin123">
      </div>
      <div class="login-remember">
        <label class="form-checkbox"><input type="checkbox" checked> Remember me</label>
        <a href="#" style="font-size:13px;color:var(--primary);text-decoration:none">Forgot password?</a>
      </div>
      <button type="submit" class="btn btn-primary login-btn" style="width:100%; justify-content:center;">Sign In</button>
    </form>
    <div class="login-footer" style="text-align:center; font-size:13px; color:var(--text-tertiary); margin-top:24px;">
      <p>© 2025 LabX Monitoring Platform</p>
      <p style="margin-top:4px">Computer Architecture Project</p>
    </div>
  </div>
</div>`;
  },
  init() {
    const form = document.getElementById('login-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.login-btn');
        btn.innerHTML = '<i data-lucide="loader" class="spin"></i> Signing in...';
        if (window.lucide) lucide.createIcons();
        
        App.isLoggedIn = true;
        setTimeout(() => {
          App.navigate('#/dashboard');
        }, 400);
      });
    }
    if (window.lucide) lucide.createIcons();
  },
  destroy() {}
};
