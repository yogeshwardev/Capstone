/* ============================================================
   LabX — Component Renderer (Robust & Fault-Tolerant)
   ============================================================ */

const Components = {
  
  // Semi-Circular Gauge Card
  systemHealthGauge(score = 97) {
    const val = Math.min(100, Math.max(0, parseInt(score) || 0));
    return `
      <div class="card gauge-card">
        <div class="semi-gauge-container">
          <svg class="semi-gauge-svg" viewBox="0 0 140 140">
            <path class="semi-gauge-bg" d="M 10,70 A 60,60 0 0,1 130,70" />
            <path class="semi-gauge-fill" d="M 10,70 A 60,60 0 0,1 130,70" />
          </svg>
          <div class="semi-gauge-text">${val}%</div>
        </div>
        <div class="gauge-label">System Health</div>
      </div>
    `;
  },

  // Stat Cards
  statCard({ title, value, unit, subtitle, badgeText, badgeType = 'success' }) {
    return `
      <div class="card stat-box">
        <div class="stat-box-title">${title || ''}</div>
        <div class="stat-box-value">${value || 0} <span>${unit || ''}</span></div>
        <div class="stat-box-sub">
          <span>${subtitle || ''}</span>
          ${badgeText ? `<span class="pill pill-${badgeType}">${badgeText}</span>` : ''}
        </div>
      </div>
    `;
  },

  // Total Alerts Pink Card
  alertsCard({ critical = 12, warnings = 28, newAlerts = 4 }) {
    return `
      <div class="card alerts-card stat-box">
        <div class="stat-box-title">Total Alerts</div>
        <div class="alerts-breakdown">
          <div class="alert-num-box">
            <div class="alert-num-val alert-num-critical">${critical}</div>
            <div class="alert-num-lbl">Critical</div>
          </div>
          <div class="alert-num-box">
            <div class="alert-num-val alert-num-warning">${warnings}</div>
            <div class="alert-num-lbl">Warnings</div>
          </div>
          <div class="alert-num-box">
            <div class="alert-num-val alert-num-new">${newAlerts}</div>
            <div class="alert-num-lbl">New</div>
          </div>
        </div>
      </div>
    `;
  },

  // Lab Overview Card (Fault tolerant for any lab object shape)
  labCard(lab) {
    if (!lab) return '';
    const name = lab.name || 'Lab';
    const total = lab.total || lab.totalCount || 10;
    const healthy = lab.healthy !== undefined ? lab.healthy : (lab.healthyCount || 9);
    const warning = lab.warning || 0;
    const critical = lab.critical || 0;
    const offline = lab.offline || 0;
    const online = lab.onlineCount !== undefined ? lab.onlineCount : (total - offline);
    const avgLoad = lab.avgLoad || (healthy > 7 ? 65 : 78);
    const status = lab.status || (critical > 0 ? 'Critical' : warning > 0 ? 'Warning' : 'Online');

    return `
      <div class="card lab-card clickable-lab" data-id="${lab.id || 'lab-a'}">
        <div class="flex-between">
          <span class="lab-card-title">${name}</span>
          <div class="flex gap-xs" style="align-items: center;">
            <span class="pill pill-${status.toLowerCase() === 'healthy' || status.toLowerCase() === 'online' ? 'green' : 'red'}">${status}</span>
            <i data-lucide="more-vertical" style="width: 16px; color: #9CA3AF; cursor: pointer;"></i>
          </div>
        </div>
        <div class="lab-meta-row">
          <span>Online: <strong>${online}/${total}</strong></span>
          <span class="pill pill-green">Healthy: ${healthy}</span>
          <span>Avg Load: <strong>${avgLoad}%</strong></span>
        </div>
      </div>
    `;
  },

  // Chart Box Wrapper
  chartCard(title, canvasId, legendItems = []) {
    return `
      <div class="card">
        <div class="flex-between mb-sm">
          <h3 style="font-size: 15px; font-weight: 700; color: #111827;">${title}</h3>
          <div class="flex gap-md" style="font-size: 12px; color: #6B7280;">
            ${legendItems.map(item => `
              <div class="flex gap-xs" style="align-items: center;">
                <span style="width: 10px; height: 3px; background-color: ${item.color}; border-radius: 2px;"></span>
                <span>${item.label}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="chart-box">
          <canvas id="${canvasId}"></canvas>
        </div>
      </div>
    `;
  },

  // Live Lab Status Table
  liveLabTable(labs) {
    const rows = (labs || []).map(lab => `
      <tr>
        <td><span class="pill pill-green">Online</span></td>
        <td><strong>${lab.name}</strong></td>
        <td style="color: #6B7280;">${lab.id}</td>
        <td>${lab.onlineCount || 10}/${lab.totalCount || 10}</td>
        <td>${lab.healthyCount || 9}</td>
        <td>${lab.activeUsers || 150}</td>
        <td>
          ${lab.warningAlerts ? `<span class="pill pill-amber">${lab.warningAlerts} W</span>` : ''}
          ${lab.criticalAlerts ? `<span class="pill pill-red">${lab.criticalAlerts} C</span>` : ''}
        </td>
      </tr>
    `).join('');

    return `
      <div class="card">
        <h3 style="font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 16px;">Live Lab Status</h3>
        <div class="table-wrap">
          <table class="lab-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Lab Name</th>
                <th>Lab ID</th>
                <th>Online</th>
                <th>Healthy</th>
                <th>Active Users</th>
                <th>Alerts</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // Status Badge Pill
  statusBadge(status) {
    const s = (status || 'healthy').toLowerCase();
    const labelMap = {
      healthy: 'Healthy',
      warning: 'Warning',
      critical: 'Critical',
      offline: 'Offline',
      info: 'Info'
    };

    return `
      <span class="badge badge-${s}">
        <span class="activity-dot activity-dot-${s === 'healthy' ? 'success' : s}"></span>
        ${labelMap[s] || status}
      </span>
    `;
  },

  // Progress Bar
  progressBar(value, forcedColor = null) {
    const val = Math.min(100, Math.max(0, parseFloat(value) || 0));
    let colorClass = 'progress-success';
    if (forcedColor === 'warning' || (!forcedColor && val >= 75 && val < 88)) colorClass = 'progress-warning';
    if (forcedColor === 'critical' || (!forcedColor && val >= 88)) colorClass = 'progress-critical';

    return `
      <div class="progress-bar">
        <div class="progress-fill ${colorClass}" style="width: ${val}%"></div>
      </div>
    `;
  },

  // Health Score Circular Ring Gauge
  healthScore(score) {
    const val = Math.min(100, Math.max(0, parseInt(score) || 0));
    const circumference = 226;
    const offset = circumference - (val / 100) * circumference;
    let strokeColor = '#10B981';
    if (val < 80 && val >= 65) strokeColor = '#F59E0B';
    if (val < 65) strokeColor = '#EF4444';

    return `
      <div class="health-ring-container" style="width:64px; height:64px;">
        <svg viewBox="0 0 80 80">
          <circle class="health-ring-bg" cx="40" cy="40" r="36" />
          <circle class="health-ring-fill" cx="40" cy="40" r="36"
                  style="stroke: ${strokeColor}; stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};" />
        </svg>
        <span class="health-ring-val" style="font-size:15px;">${val}%</span>
      </div>
    `;
  },

  // AI Insight Card
  insightCard(insights) {
    return `
      <div class="card insight-card">
        <div class="flex gap-xs mb-sm" style="align-items: center;">
          <i data-lucide="sparkles" style="color: var(--primary); width: 18px;"></i>
          <h3 style="font-size: 15px; font-weight: 600;">LabX AI Insights</h3>
        </div>
        <div>
          ${(insights || []).map(item => `
            <div class="insight-item insight-${item.type || 'info'}">
              <i data-lucide="${item.type === 'critical' ? 'alert-octagon' : item.type === 'warning' ? 'alert-triangle' : 'info'}" style="width: 15px; flex-shrink: 0; margin-top: 2px;"></i>
              <div>${item.message}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // Activity Item
  activityItem(event) {
    return `
      <div class="activity-item">
        <span class="activity-dot activity-dot-${event.type || 'info'}"></span>
        <span class="activity-text">${event.text}</span>
        <span class="activity-time">${event.time}</span>
      </div>
    `;
  },

  // Data Table Renderer
  dataTable(columns, rows, options = {}) {
    const tableId = options.id ? `id="${options.id}"` : '';
    const clickableClass = options.clickable ? 'table-row-clickable' : '';

    const headerHtml = (columns || []).map(col => `
      <th style="${col.width ? `width:${col.width};` : ''}">${col.label}</th>
    `).join('');

    const bodyHtml = (rows || []).map(row => `
      <tr class="${clickableClass}" data-id="${row.id}">
        ${columns.map(col => `
          <td>${col.render ? col.render(row[col.key], row) : (row[col.key] !== undefined ? row[col.key] : '')}</td>
        `).join('')}
      </tr>
    `).join('');

    return `
      <div class="table-container" ${tableId}>
        <table class="data-table">
          <thead>
            <tr>${headerHtml}</tr>
          </thead>
          <tbody>
            ${bodyHtml}
          </tbody>
        </table>
      </div>
    `;
  },

  // Stat Item
  statItem(label, value, icon = null) {
    return `
      <div class="p-sm flex" style="align-items: center; gap: 12px; background: #F8FAFC; border-radius: var(--radius-sm); border: 1px solid var(--border-light);">
        ${icon ? `<i data-lucide="${icon}" style="color: var(--primary); width: 18px;"></i>` : ''}
        <div>
          <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">${label}</div>
          <div style="font-size: 13px; font-weight: 600; color: var(--text-main); margin-top: 2px;">${value}</div>
        </div>
      </div>
    `;
  },

  // Button Generator
  button(text, options = {}) {
    const variant = options.variant || 'primary';
    const icon = options.icon ? `<i data-lucide="${options.icon}"></i>` : '';
    const idAttr = options.id ? `id="${options.id}"` : '';
    const classAttr = `btn btn-${variant} ${options.className || ''}`;

    return `
      <button ${idAttr} class="${classAttr}" ${options.style ? `style="${options.style}"` : ''}>
        ${icon}
        ${text ? `<span>${text}</span>` : ''}
      </button>
    `;
  },

  // Tabs
  tabs(items, activeId) {
    return `
      <div class="tabs-container">
        ${(items || []).map(tab => `
          <button class="tab-btn ${tab.id === activeId ? 'active' : ''}" data-tab="${tab.id}">
            ${tab.icon ? `<i data-lucide="${tab.icon}"></i>` : ''}
            <span>${tab.label}</span>
          </button>
        `).join('')}
      </div>
    `;
  }
};
