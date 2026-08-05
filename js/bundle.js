const LabData = {
  computers: [],
  labs: [
    { id: 'lab-a', name: 'CS Lab', shortName: 'Lab A', total: 10, healthy: 9, warning: 1, critical: 0, offline: 0 },
    { id: 'lab-b', name: 'IT Lab', shortName: 'Lab B', total: 10, healthy: 10, warning: 0, critical: 0, offline: 0 },
    { id: 'lab-c', name: 'Multimedia Lab', shortName: 'Lab C', total: 10, healthy: 8, warning: 0, critical: 1, offline: 1 }
  ],
  alerts: [
    { id: 'alt-1', severity: 'critical', type: 'High CPU Usage', computer: 'LAB-C-PC-03', computerId: 'comp-23', description: 'CPU Usage has been above 90% for 15 minutes', time: new Date(Date.now() - 15 * 60000), status: 'active' },
    { id: 'alt-2', severity: 'critical', type: 'Low Disk Space', computer: 'LAB-C-PC-03', computerId: 'comp-23', description: 'Disk space critically low (< 5% free)', time: new Date(Date.now() - 60 * 60000), status: 'active' },
    { id: 'alt-3', severity: 'critical', type: 'Offline Computer', computer: 'LAB-C-PC-08', computerId: 'comp-28', description: 'Computer has missed 3 heartbeats', time: new Date(Date.now() - 120 * 60000), status: 'active' },
    { id: 'alt-4', severity: 'warning', type: 'High CPU Usage', computer: 'LAB-A-PC-07', computerId: 'comp-07', description: 'CPU Usage averaging 85%', time: new Date(Date.now() - 30 * 60000), status: 'active' },
    { id: 'alt-5', severity: 'warning', type: 'Temperature Warning', computer: 'LAB-A-PC-07', computerId: 'comp-07', description: 'CPU temperature reached 75Â°C', time: new Date(Date.now() - 45 * 60000), status: 'active' },
    { id: 'alt-6', severity: 'info', type: 'Network Failure', computer: 'LAB-B-PC-02', computerId: 'comp-12', description: 'Network interface reset', time: new Date(Date.now() - 180 * 60000), status: 'resolved' },
    { id: 'alt-7', severity: 'warning', type: 'High Memory Usage', computer: 'LAB-A-PC-04', computerId: 'comp-04', description: 'Memory usage exceeded 85%', time: new Date(Date.now() - 25 * 60000), status: 'resolved' },
    { id: 'alt-8', severity: 'warning', type: 'High CPU Usage', computer: 'LAB-B-PC-10', computerId: 'comp-20', description: 'CPU spiked to 92%', time: new Date(Date.now() - 90 * 60000), status: 'resolved' },
    { id: 'alt-9', severity: 'critical', type: 'Offline Computer', computer: 'LAB-A-PC-09', computerId: 'comp-09', description: 'Missed heartbeats', time: new Date(Date.now() - 300 * 60000), status: 'resolved' },
    { id: 'alt-10', severity: 'info', type: 'Temperature Warning', computer: 'LAB-C-PC-01', computerId: 'comp-21', description: 'Temperature normalized', time: new Date(Date.now() - 10 * 60000), status: 'active' },
    { id: 'alt-11', severity: 'info', type: 'Low Disk Space', computer: 'LAB-B-PC-05', computerId: 'comp-15', description: 'Disk cleanup completed', time: new Date(Date.now() - 50 * 60000), status: 'resolved' },
    { id: 'alt-12', severity: 'warning', type: 'Network Failure', computer: 'LAB-A-PC-03', computerId: 'comp-03', description: 'High latency detected', time: new Date(Date.now() - 75 * 60000), status: 'active' }
  ],
  recentEvents: [
    { text: 'LAB-A-PC-01 Connected', time: new Date(Date.now() - 5 * 60000), type: 'success' },
    { text: 'LAB-C-PC-03 CPU exceeded 90%', time: new Date(Date.now() - 15 * 60000), type: 'critical' },
    { text: 'LAB-B-PC-05 Restarted', time: new Date(Date.now() - 25 * 60000), type: 'info' },
    { text: 'LAB-C-PC-08 Offline', time: new Date(Date.now() - 120 * 60000), type: 'critical' },
    { text: 'LAB-A-PC-07 CPU Warning cleared', time: new Date(Date.now() - 150 * 60000), type: 'warning' },
    { text: 'System backup completed', time: new Date(Date.now() - 160 * 60000), type: 'success' },
    { text: 'LAB-C-PC-10 temperature alert', time: new Date(Date.now() - 200 * 60000), type: 'warning' },
    { text: 'LAB-B-PC-02 software update installed', time: new Date(Date.now() - 220 * 60000), type: 'info' },
    { text: 'LAB-A-PC-04 user logged in', time: new Date(Date.now() - 240 * 60000), type: 'info' },
    { text: 'LAB-C-PC-05 high memory usage', time: new Date(Date.now() - 260 * 60000), type: 'warning' }
  ],
  insights: [
    { message: 'LAB-C-PC-03 has experienced CPU usage above 90% for the last 20 minutes. Consider checking background processes.', type: 'critical' },
    { message: 'Disk usage on LAB-C-PC-03 is above 95%. Storage cleanup is recommended.', type: 'warning' },
    { message: 'Average laboratory health increased by 5% this week.', type: 'info' },
    { message: 'LAB-A-PC-07 shows consistently high memory usage. Consider upgrading RAM.', type: 'warning' },
    { message: 'Network throughput in IT Lab is optimal. No action required.', type: 'info' }
  ]
};

// Generate realistic data for 30 computers
const cpuModels = ['Intel Core i5-12400', 'Intel Core i7-12700', 'Intel Core i7-13700', 'Intel Core i9-13900K', 'AMD Ryzen 5 5600', 'AMD Ryzen 7 5800X'];
const clockSpeeds = ['2.10 GHz', '2.50 GHz', '3.20 GHz', '3.60 GHz'];
const ramOpts = [{ desc: '8 GB DDR4', val: 8 }, { desc: '16 GB DDR4', val: 16 }, { desc: '32 GB DDR5', val: 32 }];
const storageOpts = [{ desc: '256GB SSD', total: 256 }, { desc: '512GB SSD', total: 512 }, { desc: '1TB SSD', total: 1024 }, { desc: '1TB HDD+256GB SSD', total: 1280 }];
const osOpts = ['Windows 11 Pro', 'Windows 10 Pro', 'Ubuntu 22.04 LTS'];
const netAdapters = ['Intel I219-V Gigabit', 'Realtek RTL8111', 'Intel Wi-Fi 6E AX211'];
const processesPool = ['chrome.exe', 'explorer.exe', 'code.exe', 'python.exe', 'java.exe', 'mysqld.exe', 'node.exe', 'Teams.exe', 'svchost.exe', 'System', 'dwm.exe', 'SearchHost.exe', 'RuntimeBroker.exe', 'firefox.exe', 'vlc.exe', 'blender.exe', 'photoshop.exe', 'premiere.exe'];

function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

for (let i = 1; i <= 30; i++) {
  let labIndex = Math.floor((i - 1) / 10);
  let lab = LabData.labs[labIndex];
  let id = `comp-${String(i).padStart(2, '0')}`;
  let pcNum = String(((i - 1) % 10) + 1).padStart(2, '0');
  let hostname = `LAB-${lab.shortName.split(' ')[1]}-PC-${pcNum}`;
  
  let cpuUsage = randomChoice([15, 23, 32, 45, 52, 61, 71, 78, 85, 92]);
  let ramUsage = randomChoice([25, 32, 41, 48, 55, 63, 72, 78, 81, 85]);
  let storageUsage = randomChoice([35, 42, 48, 55, 62, 68, 72, 78, 85, 95]);
  let networkSpeed = randomChoice([2, 5, 8, 12, 18, 25, 35, 50, 75, 100]);
  let temp = randomInt(35, 75);
  let uptime = randomInt(2, 720);
  
  let status = 'healthy';
  if (labIndex === 0 && pcNum === '07') {
    status = 'warning';
    cpuUsage = 85;
  }
  if (labIndex === 2 && pcNum === '03') {
    status = 'critical';
    storageUsage = 95;
    cpuUsage = 92;
  }
  if (labIndex === 2 && pcNum === '08') {
    status = 'offline';
    cpuUsage = 0; ramUsage = 0; storageUsage = 0; networkSpeed = 0; temp = null;
  }
  
  let healthScore = 0;
  if (status === 'healthy') healthScore = randomInt(80, 99);
  else if (status === 'warning') healthScore = randomInt(66, 79);
  else if (status === 'critical') healthScore = randomInt(45, 65);
  
  let ram = randomChoice(ramOpts);
  let storage = randomChoice(storageOpts);
  
  let processes = [];
  let numProcs = randomInt(3, 8);
  for (let j=0; j<numProcs; j++) {
    processes.push({
      pid: randomInt(1000, 9999),
      name: randomChoice(processesPool),
      cpu: Number((Math.random() * 15).toFixed(1)),
      memory: Number((Math.random() * 10).toFixed(1)),
      status: 'Running'
    });
  }

  LabData.computers.push({
    id,
    hostname,
    ip: `192.168.${labIndex+1}.${100+parseInt(pcNum)}`,
    mac: `AA:BB:CC:DD:EE:${String(i).padStart(2, '0')}`,
    lab: lab.name,
    labId: lab.id,
    processor: randomChoice(cpuModels),
    clockSpeed: randomChoice(clockSpeeds),
    physicalCores: randomChoice([4, 6, 8, 12, 16]),
    logicalCores: randomChoice([8, 12, 16, 24, 32]),
    cache: `${randomChoice([12, 16, 24, 32, 36])} MB`,
    installedRam: ram.desc,
    availableRam: Number((ram.val * (100 - ramUsage) / 100).toFixed(1)),
    ramUsage,
    cpuUsage,
    disk: { total: storage.total, used: Math.floor(storage.total * storageUsage / 100), free: storage.total - Math.floor(storage.total * storageUsage / 100), percent: storageUsage },
    os: (i % 8 === 0) ? 'Ubuntu 22.04 LTS' : randomChoice(['Windows 11 Pro', 'Windows 10 Pro']),
    osVersion: '23H2 (Build 22631)',
    networkAdapter: randomChoice(netAdapters),
    networkSpeed,
    uptime,
    lastHeartbeat: status === 'offline' ? new Date(Date.now() - 120 * 60000) : new Date(),
    temperature: temp,
    processes,
    status,
    healthScore,
    loadAverage: [Number((Math.random()*2).toFixed(1)), Number((Math.random()*2).toFixed(1)), Number((Math.random()*2).toFixed(1))],
    threadCount: randomInt(100, 500)
  });
}

LabData.getComputer = function(id) { return this.computers.find(c => c.id === id); };

LabData.getLabComputers = function(labId) { return this.computers.filter(c => c.labId === labId); };

LabData.getStats = function() {
  let total = this.computers.length;
  let healthy = 0, warning = 0, critical = 0, offline = 0;
  let cpuSum = 0, ramSum = 0, storageSum = 0, healthSum = 0;
  let onlineCount = 0;
  
  this.computers.forEach(c => {
    if (c.status === 'healthy') healthy++;
    else if (c.status === 'warning') warning++;
    else if (c.status === 'critical') critical++;
    else if (c.status === 'offline') offline++;
    
    if (c.status !== 'offline') {
      cpuSum += c.cpuUsage;
      ramSum += c.ramUsage;
      storageSum += c.disk.percent;
      healthSum += c.healthScore;
      onlineCount++;
    }
  });
  
  return { 
    total, healthy, warning, critical, offline, 
    avgCpu: onlineCount ? Math.round(cpuSum / onlineCount) : 0, 
    avgRam: onlineCount ? Math.round(ramSum / onlineCount) : 0, 
    avgStorage: onlineCount ? Math.round(storageSum / onlineCount) : 0, 
    healthScore: onlineCount ? Math.round(healthSum / onlineCount) : 0 
  };
};

LabData.refreshData = function() {
  this.computers.forEach(c => {
    if (c.status !== 'offline') {
      c.cpuUsage = Math.max(5, Math.min(99, c.cpuUsage + (Math.floor(Math.random() * 7) - 3)));
      c.ramUsage = Math.max(10, Math.min(99, c.ramUsage + (Math.floor(Math.random() * 5) - 2)));
      c.networkSpeed = Math.max(1, Math.min(100, c.networkSpeed + (Math.floor(Math.random() * 11) - 5)));
      c.temperature = Math.max(30, Math.min(85, c.temperature + (Math.floor(Math.random() * 3) - 1)));
      c.lastHeartbeat = new Date();
      
      let newHealth = 100 - (c.cpuUsage * 0.4 + c.ramUsage * 0.3 + c.disk.percent * 0.3);
      c.healthScore = Math.max(0, Math.min(100, Math.round(newHealth)));
      
      if (c.healthScore >= 80) c.status = 'healthy';
      else if (c.healthScore >= 66) c.status = 'warning';
      else c.status = 'critical';
    }
  });
  this.updateLabStats();
};

LabData.updateLabStats = function() {
  this.labs.forEach(lab => {
    const pcs = this.getLabComputers(lab.id);
    lab.total = pcs.length;
    lab.healthy = pcs.filter(c => c.status === 'healthy').length;
    lab.warning = pcs.filter(c => c.status === 'warning').length;
    lab.critical = pcs.filter(c => c.status === 'critical').length;
    lab.offline = pcs.filter(c => c.status === 'offline').length;
  });
};

LabData.getTimeSeriesData = function(metric, points=24) {
  let labels = [];
  let data = [];
  let now = new Date();
  for (let i = points - 1; i >= 0; i--) {
    let d = new Date(now.getTime() - i * 60 * 60000);
    labels.push(`${String(d.getHours()).padStart(2, '0')}:00`);
    let hour = d.getHours();
    let val = 0;
    if (metric === 'cpu') {
      val = (hour > 8 && hour < 18) ? 60 + Math.random()*20 : 25 + Math.random()*15;
    } else if (metric === 'memory') {
      val = 50 + Math.random()*10;
    } else if (metric === 'storage') {
      val = 60 + ((24-i) * 0.5);
    } else if (metric === 'network') {
      val = Math.random() > 0.8 ? 80 + Math.random()*20 : 10 + Math.random()*20;
    }
    data.push(Math.round(val));
  }
  return { labels, data };
};

LabData.getCpuHistory = function(computerId, points=24) {
  let c = this.getComputer(computerId);
  if (!c || c.status === 'offline') return Array(points).fill(0);
  return Array.from({length: points}, () => Math.max(0, Math.min(100, c.cpuUsage + (Math.random() * 20 - 10))));
};

LabData.getMemoryHistory = function(computerId, points=24) {
  let c = this.getComputer(computerId);
  if (!c || c.status === 'offline') return Array(points).fill(0);
  return Array.from({length: points}, () => Math.max(0, Math.min(100, c.ramUsage + (Math.random() * 10 - 5))));
};

LabData.getStorageHistory = function(computerId, points=12) {
  let c = this.getComputer(computerId);
  if (!c || c.status === 'offline') return Array(points).fill(0);
  let base = Math.max(0, c.disk.percent - points);
  return Array.from({length: points}, (_, i) => Math.min(100, base + i + Math.random()*2));
};
/* ============================================================
   LabX â€” Component Renderer (Robust & Fault-Tolerant)
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
/* ============================================================
   LabX â€” Charts Wrapper (Fail-Safe & CDN Protected)
   ============================================================ */

const Charts = {
  instances: {},

  defaultOptions: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { family: 'Inter', size: 13 },
        bodyFont: { family: 'Inter', size: 12 },
        padding: 10,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { font: { family: 'Inter', size: 11 }, color: '#94A3B8' }
      },
      y: {
        grid: { color: '#F1F5F9' },
        border: { display: false },
        ticks: { font: { family: 'Inter', size: 11 }, color: '#94A3B8' },
        beginAtZero: true
      }
    }
  },

  createLine(canvasId, labels, datasets, customOptions = {}) {
    if (typeof Chart === 'undefined') return null;
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    try {
      datasets.forEach(ds => {
        ds.tension = ds.tension || 0.4;
        ds.borderWidth = ds.borderWidth || 2;
        ds.pointRadius = ds.pointRadius || 0;
        ds.pointHoverRadius = ds.pointHoverRadius || 4;
      });
      const options = this._mergeOptions(customOptions);
      this.instances[canvasId] = new Chart(ctx, {
        type: 'line', data: { labels, datasets }, options
      });
      return this.instances[canvasId];
    } catch (err) {
      console.warn('Chart createLine warning:', err);
      return null;
    }
  },

  createBar(canvasId, labels, datasets, customOptions = {}) {
    if (typeof Chart === 'undefined') return null;
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    try {
      datasets.forEach(ds => {
        ds.borderRadius = ds.borderRadius || 6;
        ds.borderSkipped = false;
      });
      const options = this._mergeOptions(customOptions);
      this.instances[canvasId] = new Chart(ctx, {
        type: 'bar', data: { labels, datasets }, options
      });
      return this.instances[canvasId];
    } catch (err) {
      console.warn('Chart createBar warning:', err);
      return null;
    }
  },

  createDoughnut(canvasId, labels, data, colors) {
    if (typeof Chart === 'undefined') return null;
    this.destroy(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    try {
      this.instances[canvasId] = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            data, backgroundColor: colors,
            borderWidth: 0, cutout: '75%'
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { font: { family: 'Inter', size: 12 }, padding: 16, usePointStyle: true, pointStyle: 'circle' } },
            tooltip: { ...this.defaultOptions.plugins.tooltip }
          }
        }
      });
      return this.instances[canvasId];
    } catch (err) {
      console.warn('Chart createDoughnut warning:', err);
      return null;
    }
  },

  createArea(canvasId, labels, datasets, customOptions = {}) {
    if (typeof Chart === 'undefined') return null;
    datasets.forEach(ds => { ds.fill = true; });
    return this.createLine(canvasId, labels, datasets, customOptions);
  },

  destroy(canvasId) {
    if (this.instances[canvasId]) {
      try {
        this.instances[canvasId].destroy();
      } catch (e) {}
      delete this.instances[canvasId];
    }
  },

  destroyAll() {
    Object.keys(this.instances).forEach(id => this.destroy(id));
  },

  update(canvasId, newData) {
    if (typeof Chart === 'undefined') return;
    if (this.instances[canvasId] && this.instances[canvasId].data) {
      try {
        this.instances[canvasId].data.datasets[0].data = newData;
        this.instances[canvasId].update('none');
      } catch (e) {}
    }
  },

  _mergeOptions(custom) {
    return {
      ...this.defaultOptions,
      ...custom,
      plugins: { ...this.defaultOptions.plugins, ...(custom.plugins || {}) },
      scales: { ...this.defaultOptions.scales, ...(custom.scales || {}) }
    };
  }
};
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
      <p>Â© 2025 LabX Monitoring Platform</p>
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
const DashboardPage = {
  refreshInterval: null,

  render() {
    // 1. Top 5 Stats Row
    const gaugeCard = Components.systemHealthGauge(97);
    const cpuCard = Components.statCard({
      title: 'Active CPUs',
      value: '340',
      unit: '/350',
      subtitle: '78% Avg Load',
      badgeText: '+5%',
      badgeType: 'green'
    });
    const ramCard = Components.statCard({
      title: 'RAM Usage',
      value: '5.8 TB',
      unit: '/8 TB',
      subtitle: '72.5%',
      badgeText: '-2%',
      badgeType: 'amber'
    });
    const storageCard = Components.statCard({
      title: 'Storage',
      value: '2.1 PB',
      unit: '/3 PB',
      subtitle: '70% Used'
    });
    const alertsCard = Components.alertsCard({
      critical: 12,
      warnings: 28,
      newAlerts: 4
    });

    // 2. Lab Overview Cards Row
    const csLab = Components.labCard({
      name: 'CS Lab',
      onlineCount: 48,
      totalCount: 50,
      healthyCount: 46,
      avgLoad: 65,
      status: 'Online'
    });

    const itLab = Components.labCard({
      name: 'IT Lab',
      onlineCount: 38,
      totalCount: 40,
      healthyCount: 35,
      avgLoad: 72,
      status: 'Healthy'
    });

    const mmLab = Components.labCard({
      name: 'Multimedia Lab',
      onlineCount: 24,
      totalCount: 25,
      healthyCount: 23,
      avgLoad: 58,
      status: 'Online'
    });

    // 3. Charts Row
    const netChartCard = Components.chartCard('Network Traffic (Mbps)', 'netTrafficChart', [
      { label: 'Upload', color: '#3B82F6' },
      { label: 'Download', color: '#10B981' }
    ]);

    const cpuChartCard = Components.chartCard('CPU Load Over Time', 'cpuLoadChart', [
      { label: 'Percent', color: '#3B82F6' },
      { label: 'Percent', color: '#9CA3AF' }
    ]);

    // 4. Live Lab Status Table
    const tableLabs = [
      { name: 'CS Lab', id: 'CS-01', onlineCount: 48, totalCount: 50, healthyCount: 46, activeUsers: 210, warningAlerts: 2 },
      { name: 'IT Lab', id: 'IT-01', onlineCount: 38, totalCount: 40, healthyCount: 35, activeUsers: 155, warningAlerts: 3, criticalAlerts: 1 },
      { name: 'Multimedia Lab', id: 'MM-01', onlineCount: 24, totalCount: 25, healthyCount: 23, activeUsers: 98, warningAlerts: 1 }
    ];

    const tableCard = Components.liveLabTable(tableLabs);

    return `
      <!-- Row 1: Top 5 Stats -->
      <div class="grid grid-5">
        ${gaugeCard}
        ${cpuCard}
        ${ramCard}
        ${storageCard}
        ${alertsCard}
      </div>

      <!-- Row 2: Lab Cards -->
      <div class="grid grid-3">
        ${csLab}
        ${itLab}
        ${mmLab}
      </div>

      <!-- Row 3: Dual Charts -->
      <div class="grid grid-2">
        ${netChartCard}
        ${cpuChartCard}
      </div>

      <!-- Row 4: Live Lab Status Table -->
      <div>
        ${tableCard}
      </div>
    `;
  },

  createCharts() {
    try {
      if (typeof Chart === 'undefined') return;
      const timeLabels = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];

      // 1. Network Traffic Dual Line Chart
      Charts.createLine('netTrafficChart', timeLabels, [
        {
          label: 'Upload',
          data: [100, 140, 110, 150, 120, 160, 130],
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Download',
          data: [40, 50, 45, 65, 55, 75, 50],
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.05)',
          fill: true,
          tension: 0.4
        }
      ]);

      // 2. CPU Load Over Time Dual Line Chart
      Charts.createLine('cpuLoadChart', timeLabels, [
        {
          label: 'Percent',
          data: [35, 45, 40, 60, 50, 75, 55],
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Percent',
          data: [50, 55, 50, 65, 60, 85, 70],
          borderColor: '#9CA3AF',
          backgroundColor: 'transparent',
          fill: false,
          tension: 0.4
        }
      ]);
    } catch (err) {
      console.warn('Dashboard chart creation deferred:', err);
    }
  },

  init() {
    this.createCharts();

    this.refreshInterval = setInterval(() => {
      // Periodic soft refresh simulation
    }, 5000);

    if (window.lucide) lucide.createIcons();
  },

  destroy() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
    Charts.destroyAll();
  }
};
const LaboratoriesPage = {
  render() {
    const labs = LabData.labs;
    const kpiCards = labs.map(lab => {
      let color = 'success';
      if (lab.critical > 0) color = 'critical';
      else if (lab.warning > 0) color = 'warning';
      else if (lab.healthy === 0) color = 'offline';
      
      return `<div class="card p-sm flex flex-between" style="align-items:center;">
        <div>
          <h3 class="text-lg text-bold">${lab.name}</h3>
          <p class="text-secondary">${lab.total} Computers Total</p>
        </div>
        ${Components.statusBadge(color === 'success' ? 'healthy' : color)}
      </div>`;
    }).join('');

    return `
<div class="page-header">
  <div>
    <h1 class="page-title">Laboratories</h1>
    <p class="page-subtitle">Monitor lab health and performance</p>
  </div>
</div>

<div class="page-content flex flex-col gap-lg">
  <!-- Summary KPI Row -->
  <div class="grid grid-3 gap-md">
    ${kpiCards}
  </div>

  <!-- Lab Cards Grid -->
  <div class="grid grid-3 gap-md" id="lab-cards-container">
    ${labs.map(lab => `<div class="clickable-lab" data-id="${lab.id}" style="cursor:pointer; transition: transform 0.2s;">${Components.labCard(lab)}</div>`).join('')}
  </div>

  <!-- Lab Detail Section -->
  <div id="lab-detail-section" style="display:none;" class="card">
    <div class="flex flex-between mb-lg" style="align-items:center">
      <div class="flex gap-md" style="align-items:center">
        ${Components.button('', {variant: 'ghost', icon: 'chevron-right', id: 'btn-back-labs', className: 'btn-icon', style: 'transform: rotate(180deg);'})}
        <h2 class="text-2xl text-bold" id="lab-detail-name">Lab Name</h2>
      </div>
      <div>
        ${Components.button('Manage Lab', {variant: 'secondary', icon: 'settings'})}
      </div>
    </div>
    
    <div class="grid grid-4 gap-sm mb-lg" id="lab-detail-stats">
      <!-- Injected dynamically -->
    </div>
    
    <div class="grid grid-2 gap-md mb-lg">
      ${Components.chartCard('Lab CPU Trend', 'labCpuChart')}
      ${Components.chartCard('Lab Memory Trend', 'labMemChart')}
    </div>
    
    <h3 class="text-xl text-bold mb-md">Computers</h3>
    <div id="lab-detail-table-container"></div>
  </div>
</div>`;
  },
  
  showLabDetail(labId) {
    const lab = LabData.labs.find(l => l.id === labId);
    if (!lab) return;
    
    document.getElementById('lab-cards-container').style.display = 'none';
    document.getElementById('lab-detail-section').style.display = 'block';
    
    document.getElementById('lab-detail-name').textContent = lab.name;
    
    document.getElementById('lab-detail-stats').innerHTML = `
      ${Components.kpiCard({icon: 'check-circle', title: 'Healthy', value: lab.healthy.toString(), color: 'success'})}
      ${Components.kpiCard({icon: 'alert-triangle', title: 'Warning', value: lab.warning.toString(), color: 'warning'})}
      ${Components.kpiCard({icon: 'alert-octagon', title: 'Critical', value: lab.critical.toString(), color: 'critical'})}
      ${Components.kpiCard({icon: 'power', title: 'Offline', value: lab.offline.toString(), color: 'offline'})}
    `;

    const computers = LabData.getLabComputers(labId);
    const columns = [
      { key: 'hostname', label: 'Computer Name', width: '25%', render: (val, row) => `<strong>${val}</strong>` },
      { key: 'ip', label: 'IP Address', width: '15%' },
      { key: 'cpuUsage', label: 'CPU', width: '15%', render: (val) => Components.progressBar(val) },
      { key: 'ramUsage', label: 'RAM', width: '15%', render: (val) => Components.progressBar(val) },
      { key: 'status', label: 'Status', width: '15%', render: (val) => Components.statusBadge(val) },
      { key: 'healthScore', label: 'Score', width: '15%', render: (val) => `<div style="font-weight:bold; color:var(--${val>85?'success':val>70?'warning':'critical'})">${val}%</div>` }
    ];
    
    document.getElementById('lab-detail-table-container').innerHTML = Components.dataTable(columns, computers, {id: 'lab-computers-table', clickable: true});
    
    const cpuData = LabData.getTimeSeriesData('cpu');
    Charts.createLine('labCpuChart', cpuData.labels, [{
        label: 'Average CPU %',
        data: cpuData.data,
        borderColor: '#2563EB',
        tension: 0.4
    }]);

    const memData = LabData.getTimeSeriesData('ram');
    Charts.createArea('labMemChart', memData.labels, [{
        label: 'Average RAM %',
        data: memData.data,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: true,
        tension: 0.4
    }]);

    if (window.lucide) lucide.createIcons();
  },

  init() {
    document.getElementById('lab-cards-container').addEventListener('click', (e) => {
      const card = e.target.closest('.clickable-lab');
      if (card && card.dataset.id) {
        this.showLabDetail(card.dataset.id);
      }
    });

    const backBtn = document.getElementById('btn-back-labs');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        document.getElementById('lab-detail-section').style.display = 'none';
        document.getElementById('lab-cards-container').style.display = 'grid'; // .grid-3
        Charts.destroy('labCpuChart');
        Charts.destroy('labMemChart');
      });
    }

    document.getElementById('lab-detail-section').addEventListener('click', (e) => {
      const row = e.target.closest('.table-row-clickable');
      if (row && row.dataset.id) {
        App.navigate('#/computers/' + row.dataset.id);
      }
    });

    if (window.lucide) lucide.createIcons();
  },
  
  destroy() {
    Charts.destroyAll();
  }
};
const ComputersPage = {
    refreshInterval: null,
    currentComputerId: null,
    viewMode: 'grid', // 'grid' or 'list'

    render(computerId = null) {
        this.currentComputerId = computerId;
        if (computerId) {
            return this.renderDetailView(computerId);
        }
        return this.renderListView();
    },

    renderListView() {
        let html = `
            <div class="page-header flex-between flex-wrap gap-md mb-lg">
                <div>
                    <h1 class="page-title text-2xl text-bold">Computers</h1>
                    <p class="page-subtitle text-secondary">Manage and monitor all lab computers</p>
                </div>
                <div class="page-actions flex gap-md flex-wrap">
                    <div class="search-container">
                        <i data-lucide="search" class="search-icon"></i>
                        <input type="text" id="computer-search" class="search-input" placeholder="Search hostname or IP...">
                    </div>
                    <select id="status-filter" class="form-select">
                        <option value="all">All</option>
                        <option value="healthy">Healthy</option>
                        <option value="warning">Warning</option>
                        <option value="critical">Critical</option>
                        <option value="offline">Offline</option>
                    </select>
                    <div class="view-toggles flex gap-xs">
                        <button class="btn btn-icon ${this.viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}" id="btn-grid-view">
                            <i data-lucide="grid"></i>
                        </button>
                        <button class="btn btn-icon ${this.viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}" id="btn-list-view">
                            <i data-lucide="list"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div id="computers-container" class="page-content">
                ${this.getComputersContent(LabData.computers)}
            </div>
        `;
        return html;
    },

    getComputersContent(computers) {
        if (this.viewMode === 'grid') {
            let cardsHtml = computers.map(comp => `
                <div class="card computer-card table-row-clickable cursor-pointer" data-id="${comp.id}">
                    <div class="flex-between mb-md">
                        <div>
                            <div class="text-bold text-lg">${comp.hostname}</div>
                            <div class="text-secondary text-sm">${comp.ip}</div>
                        </div>
                        ${Components.statusBadge(comp.status)}
                    </div>
                    <div class="flex-center mb-md">
                        <div style="width:80px;height:80px;">
                            ${Components.healthScore(comp.healthScore)}
                        </div>
                    </div>
                    <div class="flex-between text-sm mb-xs">
                        <span class="text-secondary">CPU</span>
                        <span>${comp.cpuUsage || 0}%</span>
                    </div>
                    <div class="mb-sm">
                        ${Components.progressBar(comp.cpuUsage)}
                    </div>
                    <div class="flex-between text-sm mb-xs">
                        <span class="text-secondary">RAM</span>
                        <span>${comp.ramUsage || 0}%</span>
                    </div>
                    <div class="mb-sm">
                        ${Components.progressBar(comp.ramUsage)}
                    </div>
                    <div class="flex-between text-sm mb-xs">
                        <span class="text-secondary">Storage</span>
                        <span>${comp.disk ? comp.disk.percent : 0}%</span>
                    </div>
                    <div class="mb-md">
                        ${Components.progressBar(comp.disk ? comp.disk.percent : 0)}
                    </div>
                    <div class="text-sm text-tertiary">
                        <i data-lucide="map-pin" style="width:14px;height:14px;vertical-align:middle;"></i> ${comp.lab}
                    </div>
                </div>
            `).join('');
            return `<div class="grid-4 gap-lg">${cardsHtml}</div>`;
        } else {
            const columns = [
                { key: 'hostname', label: 'Hostname', render: (v) => `<span class="text-bold">${v}</span>` },
                { key: 'ip', label: 'IP Address' },
                { key: 'lab', label: 'Lab' },
                { key: 'status', label: 'Status', render: (v) => Components.statusBadge(v) },
                { key: 'cpuUsage', label: 'CPU', render: (v) => `${v || 0}%` },
                { key: 'ramUsage', label: 'RAM', render: (v) => `${v || 0}%` },
                { key: 'healthScore', label: 'Health', render: (v) => `<span class="text-${v >= 90 ? 'success' : v >= 70 ? 'warning' : 'critical'}">${v}%</span>` }
            ];
            return Components.dataTable(columns, computers, { clickable: true });
        }
    },

    renderDetailView(computerId) {
        const computer = LabData.getComputer(computerId);
        if (!computer) return `<div class="p-lg">Computer not found</div>`;

        let html = `
            <div class="mb-lg">
                <button class="btn btn-ghost" id="btn-back-computers">
                    <i data-lucide="arrow-left"></i> Back to Computers
                </button>
            </div>
            <div class="page-header flex-between flex-wrap gap-md mb-lg">
                <div class="flex gap-md flex-center" style="align-items: center;">
                    <div>
                        <h1 class="page-title text-2xl text-bold">${computer.hostname}</h1>
                        <p class="page-subtitle text-secondary mt-xs flex gap-sm" style="align-items: center;">
                            <i data-lucide="map-pin" style="width:16px;height:16px;"></i> ${computer.lab}
                        </p>
                    </div>
                    <div class="ml-sm">${Components.statusBadge(computer.status)}</div>
                    <div style="width: 60px; height: 60px;" class="ml-sm">
                        ${Components.healthScore(computer.healthScore)}
                    </div>
                </div>
                <div class="page-actions flex gap-sm flex-wrap">
                    <button class="btn btn-secondary" id="btn-refresh-comp">
                        <i data-lucide="refresh-cw"></i> Refresh
                    </button>
                    <button class="btn btn-secondary" id="btn-restart-comp" title="Coming Soon" disabled>
                        <i data-lucide="rotate-ccw"></i> Restart
                    </button>
                    <button class="btn btn-danger" id="btn-shutdown-comp" disabled>
                        <i data-lucide="power"></i> Shutdown
                    </button>
                    <button class="btn btn-primary" id="btn-export-comp">
                        <i data-lucide="download"></i> Export
                    </button>
                </div>
            </div>

            <div class="page-content">
                <div class="card mb-lg">
                    <h3 class="text-lg text-bold mb-md">System Specifications</h3>
                    <div class="grid-3 gap-lg spec-grid">
                        ${Components.statItem('Processor', computer.processor, 'cpu')}
                        ${Components.statItem('Clock Speed', computer.clockSpeed, 'zap')}
                        ${Components.statItem('Physical Cores', computer.physicalCores, 'hash')}
                        ${Components.statItem('Logical Cores', computer.logicalCores, 'hash')}
                        ${Components.statItem('Cache', computer.cache, 'box')}
                        ${Components.statItem('Installed RAM', computer.installedRam, 'memory-stick')}
                        
                        <div class="spec-item flex" style="align-items: center; gap: var(--radius-md);">
                            <i data-lucide="memory-stick" class="text-primary"></i>
                            <div style="flex:1;">
                                <div class="text-secondary text-sm mb-xs">Available RAM</div>
                                <div class="text-bold">${computer.availableRam} GB</div>
                            </div>
                        </div>
                        <div class="spec-item">
                            <div class="text-secondary text-sm mb-xs">RAM Usage (${computer.ramUsage}%)</div>
                            ${Components.progressBar(computer.ramUsage)}
                        </div>
                        
                        ${Components.statItem('Total Storage', (computer.disk ? computer.disk.total : 0) + ' GB', 'hard-drive')}
                        ${Components.statItem('Used Storage', (computer.disk ? computer.disk.used : 0) + ' GB', 'database')}
                        ${Components.statItem('Free Storage', (computer.disk ? computer.disk.free : 0) + ' GB', 'cloud')}
                        
                        <div class="spec-item">
                            <div class="text-secondary text-sm mb-xs">Storage Usage (${computer.disk ? computer.disk.percent : 0}%)</div>
                            ${Components.progressBar(computer.disk ? computer.disk.percent : 0)}
                        </div>

                        ${Components.statItem('OS', computer.os, 'monitor')}
                        ${Components.statItem('OS Version', computer.osVersion, 'layers')}
                        ${Components.statItem('Network Adapter', computer.networkAdapter, 'network')}
                        ${Components.statItem('IP Address', computer.ip, 'globe')}
                        ${Components.statItem('MAC Address', computer.mac, 'hash')}
                        ${Components.statItem('System Uptime', computer.uptime + ' hours', 'clock')}
                        ${Components.statItem('Temperature', computer.temperature ? computer.temperature + 'Â°C' : 'N/A', 'thermometer')}
                        ${Components.statItem('Load Average', computer.loadAverage.join(', '), 'activity')}
                        ${Components.statItem('Thread Count', computer.threadCount, 'layers')}
                    </div>
                </div>

                <div class="grid-3 gap-lg mb-lg">
                    ${Components.chartCard('CPU History', 'cpu-chart')}
                    ${Components.chartCard('Memory History', 'memory-chart')}
                    ${Components.chartCard('Storage Trend', 'storage-chart')}
                </div>

                <div class="card">
                    <h3 class="text-lg text-bold mb-md">Running Processes</h3>
                    <div class="table-container">
                        <table class="data-table process-table" style="width:100%; text-align:left;">
                            <thead>
                                <tr>
                                    <th>PID</th>
                                    <th>Process Name</th>
                                    <th>CPU %</th>
                                    <th>Memory %</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${(computer.processes || []).map(p => `
                                    <tr>
                                        <td>${p.pid}</td>
                                        <td class="text-bold">${p.name}</td>
                                        <td>${p.cpu}%</td>
                                        <td>${p.memory}%</td>
                                        <td>${Components.statusBadge(p.status === 'Running' ? 'healthy' : 'warning')}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        return html;
    },

    init() {
        if (this.currentComputerId) {
            this.initDetailView();
        } else {
            this.initListView();
        }
        if (window.lucide) {
            window.lucide.createIcons();
        }
    },

    initListView() {
        const searchInput = document.getElementById('computer-search');
        const statusFilter = document.getElementById('status-filter');
        const btnGrid = document.getElementById('btn-grid-view');
        const btnList = document.getElementById('btn-list-view');

        const filterComputers = () => {
            const query = searchInput.value.toLowerCase();
            const status = statusFilter.value;
            let filtered = LabData.computers.filter(c => {
                const matchSearch = c.hostname.toLowerCase().includes(query) || c.ip.includes(query);
                const matchStatus = status === 'all' || c.status === status;
                return matchSearch && matchStatus;
            });
            document.getElementById('computers-container').innerHTML = this.getComputersContent(filtered);
            this.bindCardClicks();
            if (window.lucide) window.lucide.createIcons();
        };

        if (searchInput) searchInput.addEventListener('input', filterComputers);
        if (statusFilter) statusFilter.addEventListener('change', filterComputers);

        if (btnGrid) btnGrid.addEventListener('click', () => {
            this.viewMode = 'grid';
            App.navigate('#/computers');
        });
        if (btnList) btnList.addEventListener('click', () => {
            this.viewMode = 'list';
            App.navigate('#/computers');
        });

        this.bindCardClicks();
    },

    bindCardClicks() {
        const cards = document.querySelectorAll('.table-row-clickable');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                App.navigate('#/computers/' + id);
            });
        });
    },

    initDetailView() {
        const btnBack = document.getElementById('btn-back-computers');
        if (btnBack) {
            btnBack.addEventListener('click', () => {
                App.navigate('#/computers');
            });
        }
        
        const btnExport = document.getElementById('btn-export-comp');
        if (btnExport) {
            btnExport.addEventListener('click', () => {
                const comp = LabData.getComputer(this.currentComputerId);
                if (!comp) return;

                const csvLines = [
                    "Field,Value",
                    `Hostname,${comp.hostname}`,
                    `IP Address,${comp.ip}`,
                    `MAC Address,${comp.mac}`,
                    `Lab,${comp.lab}`,
                    `Processor,"${comp.processor}"`,
                    `Clock Speed,${comp.clockSpeed}`,
                    `Physical Cores,${comp.physicalCores}`,
                    `Logical Cores,${comp.logicalCores}`,
                    `RAM,${comp.installedRam}`,
                    `RAM Usage,${comp.ramUsage}%`,
                    `Storage Total,${comp.disk ? comp.disk.total : 0} GB`,
                    `Storage Usage,${comp.disk ? comp.disk.percent : 0}%`,
                    `OS,${comp.os}`,
                    `Uptime Hours,${comp.uptime}`,
                    `Health Score,${comp.healthScore}%`,
                    `Status,${comp.status}`
                ];

                const blob = new Blob([csvLines.join('\n')], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${comp.hostname}-hardware-report.csv`;
                a.click();
                window.URL.revokeObjectURL(url);

                if (App.showToast) App.showToast(`Exported ${comp.hostname} specs to CSV!`, 'success');
            });
        }

        const btnRefresh = document.getElementById('btn-refresh-comp');
        if (btnRefresh) {
            btnRefresh.addEventListener('click', () => {
                if (App.showToast) App.showToast('Data refreshed', 'success');
                this.updateCharts();
            });
        }

        this.createCharts();

        this.refreshInterval = setInterval(() => {
            this.updateCharts();
        }, 5000);
    },

    createCharts() {
        const id = this.currentComputerId;
        const labels = Array.from({length: 24}, (_, i) => i + ':00');
        
        Charts.createLine('cpu-chart', labels, [{
            label: 'CPU Usage %',
            data: LabData.getCpuHistory(id, 24),
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.1)'
        }]);

        Charts.createArea('memory-chart', labels, [{
            label: 'Memory Usage %',
            data: LabData.getMemoryHistory(id, 24),
            borderColor: '#F59E0B',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            fill: true
        }]);

        Charts.createBar('storage-chart', Array.from({length: 12}, (_, i) => 'Day ' + (i+1)), [{
            label: 'Storage Used GB',
            data: LabData.getStorageHistory(id, 12),
            backgroundColor: '#10B981'
        }]);
    },

    updateCharts() {
        const id = this.currentComputerId;
        Charts.update('cpu-chart', [{ data: LabData.getCpuHistory(id, 24) }]);
        Charts.update('memory-chart', [{ data: LabData.getMemoryHistory(id, 24) }]);
        Charts.update('storage-chart', [{ data: LabData.getStorageHistory(id, 12) }]);
    },

    destroy() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
        Charts.destroyAll();
    }
};
const PerformancePage = {
  refreshInterval: null,
  render() {
    const stats = LabData.getStats();
    
    // Sort computers by CPU usage for Top Consumers table
    const topComputers = [...LabData.computers].sort((a, b) => b.cpuUsage - a.cpuUsage).slice(0, 10);
    
    const columns = [
      { key: 'hostname', label: 'Computer Name', width: '20%', render: (val, row) => `<strong>${val}</strong>` },
      { key: 'lab', label: 'Lab', width: '15%' },
      { key: 'cpuUsage', label: 'CPU Usage', width: '20%', render: (val) => Components.progressBar(val) },
      { key: 'ramUsage', label: 'Memory Usage', width: '20%', render: (val) => Components.progressBar(val) },
      { key: 'disk', label: 'Storage', width: '15%', render: (val) => Components.progressBar(val.percent) },
      { key: 'healthScore', label: 'Health', width: '10%', render: (val) => `<span class="text-bold" style="color:var(--${val>85?'success':val>70?'warning':'critical'})">${val}</span>` }
    ];

    return `
<div class="page-header flex flex-between" style="align-items:center;">
  <div>
    <h1 class="page-title">Performance Analytics</h1>
    <p class="page-subtitle">Resource utilization trends and insights</p>
  </div>
  ${Components.tabs([
    {id: 'daily', label: 'Daily'},
    {id: 'weekly', label: 'Weekly'},
    {id: 'monthly', label: 'Monthly'}
  ], 'daily')}
</div>

<div class="page-content flex flex-col gap-lg">
  
  <!-- Summary Cards -->
  <div class="grid grid-4 gap-md">
    <div class="card p-md perf-summary-card">
      <div class="text-secondary text-sm mb-xs">Average CPU</div>
      <div class="flex flex-between" style="align-items:baseline;">
        <div class="text-2xl text-bold">${stats.avgCpu}%</div>
        <div class="text-sm text-success flex" style="align-items:center;"><i data-lucide="trending-down" style="width:14px;"></i> 2.4%</div>
      </div>
    </div>
    <div class="card p-md perf-summary-card">
      <div class="text-secondary text-sm mb-xs">Peak CPU</div>
      <div class="flex flex-between" style="align-items:baseline;">
        <div class="text-2xl text-bold text-warning">89%</div>
        <div class="text-sm text-warning flex" style="align-items:center;"><i data-lucide="trending-up" style="width:14px;"></i> 5.1%</div>
      </div>
    </div>
    <div class="card p-md perf-summary-card">
      <div class="text-secondary text-sm mb-xs">Average Memory</div>
      <div class="flex flex-between" style="align-items:baseline;">
        <div class="text-2xl text-bold">${stats.avgRam}%</div>
        <div class="text-sm text-success flex" style="align-items:center;"><i data-lucide="trending-down" style="width:14px;"></i> 1.2%</div>
      </div>
    </div>
    <div class="card p-md perf-summary-card">
      <div class="text-secondary text-sm mb-xs">Idle Time</div>
      <div class="flex flex-between" style="align-items:baseline;">
        <div class="text-2xl text-bold">42%</div>
        <div class="text-sm text-success flex" style="align-items:center;"><i data-lucide="trending-up" style="width:14px;"></i> 8.4%</div>
      </div>
    </div>
  </div>

  <!-- Charts -->
  <div class="grid grid-2 gap-lg">
    ${Components.chartCard('CPU Usage Trend', 'perfCpuChart', 'Average CPU load across all labs')}
    ${Components.chartCard('Memory Consumption', 'perfMemChart', 'Aggregate RAM usage over time')}
    ${Components.chartCard('Storage Growth', 'perfStorageChart', 'Disk space consumption rate')}
    ${Components.chartCard('Network Activity', 'perfNetChart', 'Combined inbound/outbound traffic')}
  </div>

  <!-- Architecture Widgets -->
  <div>
    <h2 class="text-xl text-bold mb-md">Computer Architecture Widgets</h2>
    <div class="grid grid-3 gap-md">
      <!-- CPU Widget -->
      <div class="card p-md">
        <h3 class="text-bold mb-md">CPU Utilization</h3>
        <div class="flex flex-between mb-sm"><span class="text-secondary">Current Average</span> <strong class="text-lg">${stats.avgCpu}%</strong></div>
        ${Components.progressBar(stats.avgCpu, 'primary')}
        <div style="height: 100px; margin-top: 16px;"><canvas id="widgetCpuChart"></canvas></div>
      </div>
      
      <!-- Memory Hierarchy -->
      <div class="card p-md">
        <h3 class="text-bold mb-md">Memory Hierarchy</h3>
        <div class="flex flex-col gap-sm">
          <div class="flex flex-between p-sm" style="background:var(--bg); border-radius:var(--radius-sm);"><strong class="text-primary">L1 Cache</strong> <span class="text-secondary">Speed: ~1ns | Size: 64KB</span></div>
          <div class="flex flex-between p-sm" style="background:var(--bg); border-radius:var(--radius-sm);"><strong class="text-primary">L2 Cache</strong> <span class="text-secondary">Speed: ~4ns | Size: 2MB</span></div>
          <div class="flex flex-between p-sm" style="background:var(--bg); border-radius:var(--radius-sm);"><strong class="text-primary">L3 Cache</strong> <span class="text-secondary">Speed: ~10ns | Size: 25MB</span></div>
          <div class="flex flex-between p-sm" style="background:var(--bg); border-radius:var(--radius-sm);"><strong class="text-primary">RAM</strong> <span class="text-secondary">Speed: ~100ns | Size: 16GB</span></div>
          <div class="flex flex-between p-sm" style="background:var(--bg); border-radius:var(--radius-sm);"><strong class="text-primary">Disk (SSD)</strong> <span class="text-secondary">Speed: ~100Î¼s | Size: 512GB</span></div>
        </div>
      </div>
      
      <!-- Resource Allocation -->
      <div class="card p-md">
        <h3 class="text-bold mb-md">Resource Allocation</h3>
        <div style="height: 200px; display:flex; justify-content:center;"><canvas id="widgetAllocChart"></canvas></div>
      </div>
      
      <!-- Thread Count -->
      <div class="card p-md">
        <h3 class="text-bold mb-md">Thread Count</h3>
        <div class="flex flex-between mb-sm"><span class="text-secondary">Total Threads</span> <strong class="text-lg">12,450</strong></div>
        <div style="height: 120px;"><canvas id="widgetThreadChart"></canvas></div>
      </div>
      
      <!-- Load Average -->
      <div class="card p-md">
        <h3 class="text-bold mb-md">Load Average</h3>
        <div class="flex flex-between" style="align-items:center; height: 100%;">
          <div class="text-center p-md" style="flex:1; border-right:1px solid var(--border);"><div class="text-2xl text-bold text-success">1.24</div><div class="text-xs text-secondary mt-xs">1 min</div></div>
          <div class="text-center p-md" style="flex:1; border-right:1px solid var(--border);"><div class="text-2xl text-bold text-warning">1.45</div><div class="text-xs text-secondary mt-xs">5 min</div></div>
          <div class="text-center p-md" style="flex:1;"><div class="text-2xl text-bold">1.38</div><div class="text-xs text-secondary mt-xs">15 min</div></div>
        </div>
      </div>
      
      <!-- Cache Info -->
      <div class="card p-md">
        <h3 class="text-bold mb-md">Cache Information</h3>
        <table style="width:100%; border-collapse:collapse;" class="text-sm">
          <tr style="border-bottom:1px solid var(--border)"><th class="p-xs text-left">Level</th><th class="p-xs text-right">Hit Rate</th><th class="p-xs text-right">Miss Rate</th></tr>
          <tr style="border-bottom:1px solid var(--border)"><td class="p-xs font-bold">L1</td><td class="p-xs text-right text-success">92%</td><td class="p-xs text-right text-critical">8%</td></tr>
          <tr style="border-bottom:1px solid var(--border)"><td class="p-xs font-bold">L2</td><td class="p-xs text-right text-success">85%</td><td class="p-xs text-right text-warning">15%</td></tr>
          <tr><td class="p-xs font-bold">L3</td><td class="p-xs text-right text-success">65%</td><td class="p-xs text-right text-warning">35%</td></tr>
        </table>
      </div>
    </div>
  </div>
  
  <!-- Top Resource Consumers -->
  <div class="card mt-lg">
    <h2 class="text-xl text-bold mb-md">Top Resource Consumers</h2>
    ${Components.dataTable(columns, topComputers, {id: 'perf-top-table', clickable: true})}
  </div>
  
</div>`;
  },
  
  buildCharts() {
    const cpuData = LabData.getTimeSeriesData('cpu', 24);
    Charts.createLine('perfCpuChart', cpuData.labels, [{
      label: 'CPU Usage %',
      data: cpuData.data,
      borderColor: '#2563EB',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      fill: true,
      tension: 0.3
    }]);

    const memData = LabData.getTimeSeriesData('ram', 24);
    Charts.createArea('perfMemChart', memData.labels, [{
      label: 'Memory Usage %',
      data: memData.data,
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      fill: true,
      tension: 0.3
    }]);
    
    const storageData = LabData.getTimeSeriesData('storage', 12);
    Charts.createBar('perfStorageChart', storageData.labels, [{
      label: 'Storage Growth GB',
      data: storageData.data.map(v => v * 5),
      backgroundColor: '#F59E0B',
      borderRadius: 4
    }]);
    
    const netData = LabData.getTimeSeriesData('network', 24);
    Charts.createLine('perfNetChart', netData.labels, [{
      label: 'Network Traffic Mbps',
      data: netData.data,
      borderColor: '#EF4444',
      tension: 0.2
    }]);
    
    // Widgets Charts
    const widgetCpuData = LabData.getTimeSeriesData('cpu', 10);
    Charts.createLine('widgetCpuChart', widgetCpuData.labels, [{
      label: 'CPU',
      data: widgetCpuData.data,
      borderColor: '#2563EB',
      borderWidth: 2,
      pointRadius: 0
    }], { maintainAspectRatio: false, scales: { x: { display: false }, y: { display: false } } });
    
    Charts.createDoughnut('widgetAllocChart', ['System', 'Apps', 'Services', 'Free'], [15, 45, 20, 20], ['#2563EB', '#10B981', '#F59E0B', '#E2E8F0']);
    
    Charts.createBar('widgetThreadChart', ['Lab A', 'Lab B', 'Lab C'], [{
      label: 'Threads',
      data: [4200, 3800, 4450],
      backgroundColor: '#2563EB'
    }], { maintainAspectRatio: false, scales: { y: { display: false } }, plugins: { legend: { display: false } } });
  },

  init() {
    this.buildCharts();
    
    this.refreshInterval = setInterval(() => {
      // In real scenario, update charts with new data here
    }, 5000);
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        // Re-render charts for different timeframes
        Charts.destroy('perfCpuChart');
        Charts.destroy('perfMemChart');
        Charts.destroy('perfStorageChart');
        Charts.destroy('perfNetChart');
        this.buildCharts();
      });
    });

    const tableContainer = document.getElementById('perf-top-table');
    if (tableContainer) {
      tableContainer.addEventListener('click', (e) => {
        const row = e.target.closest('.table-row-clickable');
        if (row && row.dataset.id) {
          App.navigate('#/computers/' + row.dataset.id);
        }
      });
    }

    if (window.lucide) lucide.createIcons();
  },
  
  destroy() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
    Charts.destroyAll();
  }
};
const AlertsPage = {
    render() {
        let criticalCount = LabData.alerts.filter(a => a.severity === 'critical' && a.status === 'active').length;
        let warningCount = LabData.alerts.filter(a => a.severity === 'warning' && a.status === 'active').length;
        let infoCount = LabData.alerts.filter(a => a.severity === 'info' && a.status === 'active').length;

        let html = `
            <div class="page-header mb-lg">
                <h1 class="page-title text-2xl text-bold">Alert Center</h1>
                <p class="page-subtitle text-secondary">Monitor and manage system alerts</p>
            </div>
            
            <div class="page-content">
                <div class="grid-3 gap-lg mb-lg">
                    ${Components.kpiCard({ icon: 'alert-octagon', title: 'Critical Alerts', value: criticalCount, color: 'critical' })}
                    ${Components.kpiCard({ icon: 'alert-triangle', title: 'Warning Alerts', value: warningCount, color: 'warning' })}
                    ${Components.kpiCard({ icon: 'info', title: 'Info Alerts', value: infoCount, color: 'info' })}
                </div>

                <div class="card mb-lg flex-between flex-wrap gap-md">
                    <div class="flex gap-sm severity-filters">
                        <button class="btn btn-secondary active" data-severity="all">All</button>
                        <button class="btn btn-ghost" data-severity="critical">Critical</button>
                        <button class="btn btn-ghost" data-severity="warning">Warning</button>
                        <button class="btn btn-ghost" data-severity="info">Info</button>
                    </div>
                    <div class="flex gap-md flex-wrap">
                        <select id="status-filter" class="form-select">
                            <option value="all">All Status</option>
                            <option value="active" selected>Active</option>
                            <option value="resolved">Resolved</option>
                        </select>
                        <div class="search-container">
                            <i data-lucide="search" class="search-icon"></i>
                            <input type="text" id="alert-search" class="search-input" placeholder="Search alerts...">
                        </div>
                        <button class="btn btn-primary" id="btn-resolve-all">
                            <i data-lucide="check-circle"></i> Resolve All
                        </button>
                    </div>
                </div>

                <div id="alerts-list" class="flex" style="flex-direction: column; gap: var(--radius-sm)">
                    ${this.getAlertsContent(LabData.alerts.filter(a => a.status === 'active'))}
                </div>
            </div>
        `;
        return html;
    },

    getAlertsContent(alerts) {
        if (alerts.length === 0) {
            return Components.emptyState('check-circle', 'All Clear', 'There are no alerts matching your criteria.');
        }
        
        alerts.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        
        return alerts.map(alert => Components.alertItem(alert)).join('');
    },

    init() {
        const renderList = () => {
            const activeSeverityBtn = document.querySelector('.severity-filters .btn.active');
            const severity = activeSeverityBtn ? activeSeverityBtn.getAttribute('data-severity') : 'all';
            const status = document.getElementById('status-filter').value;
            const query = document.getElementById('alert-search').value.toLowerCase();

            let filtered = LabData.alerts.filter(a => {
                const matchSeverity = severity === 'all' || a.severity === severity;
                const matchStatus = status === 'all' || a.status === status;
                const searchTarget = (a.description || '') + ' ' + (a.computer || '');
                const matchSearch = searchTarget.toLowerCase().includes(query);
                return matchSeverity && matchStatus && matchSearch;
            });

            document.getElementById('alerts-list').innerHTML = this.getAlertsContent(filtered);
            this.bindResolveButtons();
            if (window.lucide) window.lucide.createIcons();
        };

        const severityBtns = document.querySelectorAll('.severity-filters .btn');
        severityBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                severityBtns.forEach(b => {
                    b.classList.remove('btn-secondary', 'active');
                    b.classList.add('btn-ghost');
                });
                e.target.classList.remove('btn-ghost');
                e.target.classList.add('btn-secondary', 'active');
                renderList();
            });
        });

        document.getElementById('status-filter').addEventListener('change', renderList);
        document.getElementById('alert-search').addEventListener('input', renderList);

        document.getElementById('btn-resolve-all').addEventListener('click', () => {
            let activeAlerts = LabData.alerts.filter(a => a.status === 'active');
            activeAlerts.forEach(a => a.status = 'resolved');
            if (App.showToast && activeAlerts.length > 0) {
                App.showToast('All alerts resolved', 'success');
            }
            renderList();
        });

        this.bindResolveButtons = () => {
            document.querySelectorAll('.btn-resolve').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.target.closest('.btn-resolve').getAttribute('data-id');
                    const alert = LabData.alerts.find(a => a.id === id);
                    if (alert) {
                        alert.status = 'resolved';
                        if (App.showToast) App.showToast('Alert marked as resolved', 'success');
                        renderList();
                    }
                });
            });
        };

        this.bindResolveButtons();
        if (window.lucide) window.lucide.createIcons();
    },

    destroy() {}
};
const ReportsPage = {
    render() {
        let html = `
            <div class="page-header mb-lg">
                <h1 class="page-title text-2xl text-bold">Reports Generator</h1>
                <p class="page-subtitle text-secondary">Generate, preview, and download custom laboratory telemetry reports</p>
            </div>
            
            <div class="page-content">
                <h3 class="text-lg text-bold mb-md">Report Type Selection</h3>
                <div class="grid-3 gap-md mb-lg" id="report-types">
                    <div class="card report-type-card cursor-pointer selected" data-type="daily">
                        <i data-lucide="calendar" class="text-info mb-sm"></i>
                        <div class="text-bold">Daily Report</div>
                        <div class="text-sm text-secondary">Daily system performance summary</div>
                    </div>
                    <div class="card report-type-card cursor-pointer" data-type="weekly">
                        <i data-lucide="bar-chart-2" class="text-success mb-sm"></i>
                        <div class="text-bold">Weekly Report</div>
                        <div class="text-sm text-secondary">Weekly trend analysis</div>
                    </div>
                    <div class="card report-type-card cursor-pointer" data-type="monthly">
                        <i data-lucide="pie-chart" class="text-primary mb-sm"></i>
                        <div class="text-bold">Monthly Report</div>
                        <div class="text-sm text-secondary">Monthly comprehensive report</div>
                    </div>
                    <div class="card report-type-card cursor-pointer" data-type="health">
                        <i data-lucide="activity" class="text-success mb-sm"></i>
                        <div class="text-bold">Health Report</div>
                        <div class="text-sm text-secondary">System health assessment</div>
                    </div>
                    <div class="card report-type-card cursor-pointer" data-type="inventory">
                        <i data-lucide="package" class="text-warning mb-sm"></i>
                        <div class="text-bold">Inventory Report</div>
                        <div class="text-sm text-secondary">Hardware and software inventory</div>
                    </div>
                    <div class="card report-type-card cursor-pointer" data-type="performance">
                        <i data-lucide="zap" class="text-critical mb-sm"></i>
                        <div class="text-bold">Performance Report</div>
                        <div class="text-sm text-secondary">Detailed performance metrics</div>
                    </div>
                </div>

                <div class="card mb-lg">
                    <h3 class="text-lg text-bold mb-md">Report Configuration</h3>
                    <div class="grid-2 gap-md mb-md">
                        <div class="form-group">
                            <label class="form-label">Start Date</label>
                            <input type="date" class="form-input" value="2026-08-01">
                        </div>
                        <div class="form-group">
                            <label class="form-label">End Date</label>
                            <input type="date" class="form-input" value="2026-08-05">
                        </div>
                    </div>
                    <div class="form-group mb-md">
                        <label class="form-label">Lab Filter</label>
                        <select class="form-select" id="lab-filter-select">
                            <option value="all">All Labs</option>
                            <option value="cs">CS Lab</option>
                            <option value="it">IT Lab</option>
                            <option value="mm">Multimedia Lab</option>
                        </select>
                    </div>
                    <div class="form-group mb-md">
                        <label class="form-label">Format</label>
                        <div class="flex gap-md mt-sm">
                            <label class="flex gap-sm cursor-pointer" style="align-items:center;">
                                <input type="radio" name="format" value="csv" checked> CSV Spreadsheet (.csv)
                            </label>
                            <label class="flex gap-sm cursor-pointer" style="align-items:center;">
                                <input type="radio" name="format" value="pdf"> PDF Document (.pdf)
                            </label>
                        </div>
                    </div>
                    <button class="btn btn-primary" id="btn-generate">
                        <i data-lucide="file-text"></i> Generate Report
                    </button>
                </div>

                <div id="report-preview-section" style="display:none;" class="mb-lg">
                    <div class="flex-between mb-md">
                        <h3 class="text-lg text-bold">Report Preview & Export</h3>
                        <button class="btn btn-primary btn-sm" id="btn-download-preview">
                            <i data-lucide="download"></i> Download Report File
                        </button>
                    </div>
                    <div class="card mb-md">
                        <h4 class="text-bold mb-md">Resource Summary</h4>
                        <div class="grid-4 gap-md mb-lg">
                            ${Components.kpiCard({ icon: 'cpu', title: 'Avg CPU', value: '45%', color: 'primary' })}
                            ${Components.kpiCard({ icon: 'memory-stick', title: 'Avg RAM', value: '62%', color: 'warning' })}
                            ${Components.kpiCard({ icon: 'hard-drive', title: 'Avg Storage', value: '55%', color: 'success' })}
                            ${Components.kpiCard({ icon: 'activity', title: 'Uptime %', value: '99.9%', color: 'success' })}
                        </div>
                        
                        <div class="grid-2 gap-md mb-md">
                            <div>
                                <h4 class="text-bold mb-md">Top Performing Workstations</h4>
                                ${Components.dataTable(
                                    [ {key:'hostname', label:'System'}, {key:'lab', label:'Lab'}, {key:'healthScore', label:'Health Score', render:(v) => v+'%'} ],
                                    LabData.computers.sort((a,b)=>b.healthScore-a.healthScore).slice(0,5),
                                    {}
                                )}
                            </div>
                            <div>
                                <h4 class="text-bold mb-md">Workstations Requiring Maintenance</h4>
                                ${Components.dataTable(
                                    [ {key:'hostname', label:'System'}, {key:'lab', label:'Lab'}, {key:'healthScore', label:'Health Score', render:(v) => '<span class="text-critical">'+v+'%</span>'} ],
                                    LabData.computers.filter(c => c.healthScore < 75).slice(0,5),
                                    {}
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <h3 class="text-lg text-bold mb-md">Recent Reports Archive</h3>
                <div class="card">
                    <div class="table-container">
                        <table class="data-table" style="width:100%; text-align:left;">
                            <thead>
                                <tr>
                                    <th>Report Name</th>
                                    <th>Type</th>
                                    <th>Date Range</th>
                                    <th>Generated On</th>
                                    <th>Size</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-bold">Weekly Performance - Lab A</td>
                                    <td>Weekly</td>
                                    <td>Jul 28 - Aug 3</td>
                                    <td>Aug 4, 2026</td>
                                    <td>2.4 KB</td>
                                    <td><button class="btn btn-sm btn-secondary btn-download-archive" data-name="Weekly-Performance-LabA.csv"><i data-lucide="download"></i> Download</button></td>
                                </tr>
                                <tr>
                                    <td class="text-bold">Inventory Audit 2026</td>
                                    <td>Inventory</td>
                                    <td>All Time</td>
                                    <td>Aug 1, 2026</td>
                                    <td>1.8 KB</td>
                                    <td><button class="btn btn-sm btn-secondary btn-download-archive" data-name="Inventory-Audit-2026.csv"><i data-lucide="download"></i> Download</button></td>
                                </tr>
                                <tr>
                                    <td class="text-bold">Daily Health Check</td>
                                    <td>Daily</td>
                                    <td>Aug 3, 2026</td>
                                    <td>Aug 4, 2026</td>
                                    <td>0.5 KB</td>
                                    <td><button class="btn btn-sm btn-secondary btn-download-archive" data-name="Daily-Health-Check.csv"><i data-lucide="download"></i> Download</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        return html;
    },

    init() {
        let selectedType = 'Daily';

        const cards = document.querySelectorAll('.report-type-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectedType = card.querySelector('.text-bold').textContent;
            });
        });

        const generateCSV = (filename = 'LabX-Telemetry-Report.csv') => {
            const rows = [
                "Computer Name,IP Address,Lab,Status,Health Score,CPU Usage %,RAM Usage %,Storage Total GB,Storage Usage %",
                ...LabData.computers.map(c => 
                    `"${c.hostname}","${c.ip}","${c.lab}","${c.status}",${c.healthScore},${c.cpuUsage},${c.ramUsage},${c.disk ? c.disk.total : 0},${c.disk ? c.disk.percent : 0}`
                )
            ];

            const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
            if (App.showToast) App.showToast(`Downloaded ${filename}`, 'success');
        };

        const btnGenerate = document.getElementById('btn-generate');
        if (btnGenerate) {
            btnGenerate.addEventListener('click', () => {
                document.getElementById('report-preview-section').style.display = 'block';
                if (App.showToast) App.showToast(`Generated ${selectedType} successfully!`, 'success');
            });
        }

        document.getElementById('btn-download-preview')?.addEventListener('click', () => {
            generateCSV(`LabX-${selectedType.replace(/\s+/g, '-')}.csv`);
        });

        document.querySelectorAll('.btn-download-archive').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const name = e.currentTarget.dataset.name || 'Report.csv';
                generateCSV(name);
            });
        });

        if (window.lucide) window.lucide.createIcons();
    },

    destroy() {}
};
const UsersPage = {
    render() {
        let html = `
            <div class="page-header flex-between flex-wrap gap-md mb-lg">
                <div>
                    <h1 class="page-title text-2xl text-bold">User Management</h1>
                    <p class="page-subtitle text-secondary">Manage administrators and access</p>
                </div>
                <button class="btn btn-primary" id="btn-add-user">
                    <i data-lucide="plus"></i> Add User
                </button>
            </div>
            
            <div class="page-content">
                <div class="card">
                    <div class="table-container">
                        <table class="data-table" id="users-table" style="width:100%; text-align:left;">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Last Login</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="flex gap-sm" style="align-items:center;">
                                            <div style="width:32px;height:32px;border-radius:50%;background:#1D4ED8;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;">AU</div>
                                            <div>
                                                <div class="text-bold">Admin User</div>
                                                <div class="text-sm text-secondary">admin@labx.edu</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-info">System Administrator</span></td>
                                    <td>Today 9:00 AM</td>
                                    <td><span class="badge badge-healthy">Active</span></td>
                                    <td>
                                        <button class="btn btn-icon btn-ghost btn-edit" title="Edit User"><i data-lucide="edit"></i></button>
                                        <button class="btn btn-icon btn-ghost btn-delete text-critical" title="Delete User"><i data-lucide="trash-2"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="flex gap-sm" style="align-items:center;">
                                            <div style="width:32px;height:32px;border-radius:50%;background:#F59E0B;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;">DS</div>
                                            <div>
                                                <div class="text-bold">Dr. Smith</div>
                                                <div class="text-sm text-secondary">smith@college.edu</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-info">Lab Manager</span></td>
                                    <td>Yesterday 3:00 PM</td>
                                    <td><span class="badge badge-healthy">Active</span></td>
                                    <td>
                                        <button class="btn btn-icon btn-ghost btn-edit" title="Edit User"><i data-lucide="edit"></i></button>
                                        <button class="btn btn-icon btn-ghost btn-delete text-critical" title="Delete User"><i data-lucide="trash-2"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="flex gap-sm" style="align-items:center;">
                                            <div style="width:32px;height:32px;border-radius:50%;background:#10B981;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;">JD</div>
                                            <div>
                                                <div class="text-bold">John Doe</div>
                                                <div class="text-sm text-secondary">john@college.edu</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-info">Lab Assistant</span></td>
                                    <td>Aug 3 2025 10:30 AM</td>
                                    <td><span class="badge badge-healthy">Active</span></td>
                                    <td>
                                        <button class="btn btn-icon btn-ghost btn-edit" title="Edit User"><i data-lucide="edit"></i></button>
                                        <button class="btn btn-icon btn-ghost btn-delete text-critical" title="Delete User"><i data-lucide="trash-2"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="flex gap-sm" style="align-items:center;">
                                            <div style="width:32px;height:32px;border-radius:50%;background:#1D4ED8;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;">JW</div>
                                            <div>
                                                <div class="text-bold">Jane Wilson</div>
                                                <div class="text-sm text-secondary">jane@college.edu</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-info">Viewer</span></td>
                                    <td>Jul 30 2025</td>
                                    <td><span class="badge badge-healthy">Active</span></td>
                                    <td>
                                        <button class="btn btn-icon btn-ghost btn-edit" title="Edit User"><i data-lucide="edit"></i></button>
                                        <button class="btn btn-icon btn-ghost btn-delete text-critical" title="Delete User"><i data-lucide="trash-2"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div id="user-modal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:100; align-items:center; justify-content:center;">
                <div class="modal card" style="width: 420px; max-width: 90vw;">
                    <div class="modal-header flex-between mb-md">
                        <h3 class="text-lg text-bold" id="modal-title">Add User</h3>
                        <button class="btn btn-icon btn-ghost btn-close-modal"><i data-lucide="x"></i></button>
                    </div>
                    <div class="modal-body mb-md">
                        <div class="form-group mb-md">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-input" id="user-name" placeholder="John Doe">
                        </div>
                        <div class="form-group mb-md">
                            <label class="form-label">Email Address</label>
                            <input type="email" class="form-input" id="user-email" placeholder="john@example.com">
                        </div>
                        <div class="form-group mb-md">
                            <label class="form-label">User Role</label>
                            <select class="form-select" id="user-role">
                                <option>System Administrator</option>
                                <option>Lab Manager</option>
                                <option>Lab Assistant</option>
                                <option selected>Viewer</option>
                            </select>
                        </div>
                        <div class="form-group mb-md">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-input" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢">
                        </div>
                    </div>
                    <div class="modal-footer flex gap-sm" style="justify-content:flex-end;">
                        <button class="btn btn-secondary btn-close-modal">Cancel</button>
                        <button class="btn btn-primary" id="btn-save-user">Save User</button>
                    </div>
                </div>
            </div>
        `;
        return html;
    },

    init() {
        const modal = document.getElementById('user-modal');
        const modalTitle = document.getElementById('modal-title');
        const userName = document.getElementById('user-name');
        const userEmail = document.getElementById('user-email');
        const userRole = document.getElementById('user-role');
        const tbody = document.querySelector('#users-table tbody');
        let editingRow = null;
        
        const openModal = (title = 'Add User', name = '', email = '', role = 'Viewer', row = null) => {
            editingRow = row;
            modalTitle.textContent = title;
            userName.value = name;
            userEmail.value = email;
            userRole.value = role;
            modal.style.display = 'flex';
        };

        const closeModal = () => {
            modal.style.display = 'none';
        };

        document.getElementById('btn-add-user')?.addEventListener('click', () => openModal('Add New User'));
        
        document.querySelectorAll('.btn-close-modal').forEach(btn => {
            btn.addEventListener('click', closeModal);
        });

        const bindRowEvents = (tr) => {
            tr.querySelector('.btn-edit')?.addEventListener('click', () => {
                const name = tr.querySelector('.text-bold').textContent;
                const email = tr.querySelector('.text-secondary').textContent;
                const role = tr.querySelector('td:nth-child(2) span').textContent;
                openModal('Edit User', name, email, role, tr);
            });

            tr.querySelector('.btn-delete')?.addEventListener('click', () => {
                tr.remove();
                if (App.showToast) App.showToast('User removed successfully', 'success');
            });
        };

        document.querySelectorAll('#users-table tbody tr').forEach(tr => bindRowEvents(tr));

        document.getElementById('btn-save-user')?.addEventListener('click', () => {
            const name = userName.value.trim() || 'New User';
            const email = userEmail.value.trim() || 'user@labx.edu';
            const role = userRole.value;
            const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

            if (editingRow) {
                editingRow.querySelector('.text-bold').textContent = name;
                editingRow.querySelector('.text-secondary').textContent = email;
                editingRow.querySelector('td:nth-child(2)').innerHTML = `<span class="badge badge-info">${role}</span>`;
                if (App.showToast) App.showToast(`Updated user ${name}`, 'success');
            } else {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>
                        <div class="flex gap-sm" style="align-items:center;">
                            <div style="width:32px;height:32px;border-radius:50%;background:#2563EB;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;">${initials}</div>
                            <div>
                                <div class="text-bold">${name}</div>
                                <div class="text-sm text-secondary">${email}</div>
                            </div>
                        </div>
                    </td>
                    <td><span class="badge badge-info">${role}</span></td>
                    <td>Just now</td>
                    <td><span class="badge badge-healthy">Active</span></td>
                    <td>
                        <button class="btn btn-icon btn-ghost btn-edit" title="Edit User"><i data-lucide="edit"></i></button>
                        <button class="btn btn-icon btn-ghost btn-delete text-critical" title="Delete User"><i data-lucide="trash-2"></i></button>
                    </td>
                `;
                tbody.appendChild(tr);
                bindRowEvents(tr);
                if (App.showToast) App.showToast(`Added user ${name}`, 'success');
            }

            closeModal();
            if (window.lucide) window.lucide.createIcons();
        });

        if (window.lucide) window.lucide.createIcons();
    },

    destroy() {}
};
const SettingsPage = {
    render() {
        const tabs = [
            { id: 'tab-general', label: 'General', icon: 'settings' },
            { id: 'tab-agent', label: 'Client Agent Software', icon: 'download' },
            { id: 'tab-thresholds', label: 'Alert Thresholds', icon: 'activity' },
            { id: 'tab-notifications', label: 'Notifications', icon: 'bell' },
            { id: 'tab-backup', label: 'Backup', icon: 'database' },
            { id: 'tab-theme', label: 'Theme', icon: 'monitor' }
        ];

        let html = `
            <div class="page-header mb-lg">
                <h1 class="page-title text-2xl text-bold">Settings</h1>
                <p class="page-subtitle text-secondary">Configure system preferences</p>
            </div>
            
            <div class="page-content">
                ${Components.tabs(tabs, 'tab-general')}
                
                <div class="card mt-lg">
                    <!-- General Tab -->
                    <div id="pane-tab-general" class="tab-pane" style="display:block;">
                        <h3 class="text-lg text-bold mb-md">System Configuration</h3>
                        <div class="grid-2 gap-md mb-lg">
                            <div class="form-group">
                                <label class="form-label">System Name</label>
                                <input type="text" class="form-input" value="LabX Monitoring Platform">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Refresh Interval</label>
                                <select class="form-select">
                                    <option value="5">5s</option>
                                    <option value="10">10s</option>
                                    <option value="15">15s</option>
                                    <option value="30">30s</option>
                                    <option value="60">60s</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Data Retention</label>
                                <select class="form-select">
                                    <option value="7">7 days</option>
                                    <option value="30" selected>30 days</option>
                                    <option value="90">90 days</option>
                                    <option value="365">1 year</option>
                                </select>
                            </div>
                            <div class="form-group flex gap-sm" style="align-items:center; margin-top: 28px;">
                                <input type="checkbox" class="form-checkbox" checked id="auto-discovery">
                                <label for="auto-discovery" class="form-label" style="margin-bottom:0;">Enable Auto-Discovery</label>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-save">Save Changes</button>
                    </div>

                    <!-- Client Agent Software Tab -->
                    <div id="pane-tab-agent" class="tab-pane" style="display:none;">
                        <div class="flex-between mb-md">
                            <div>
                                <h3 class="text-lg text-bold">LabX Client Telemetry Agent Installer</h3>
                                <p class="text-sm text-secondary">Deploy to laboratory workstations to stream CPU, RAM, Storage, Network, and Process metrics to LabX</p>
                            </div>
                            <a href="agent.py" download="labx-agent.py" class="btn btn-primary">
                                <i data-lucide="download"></i> Download agent.py
                            </a>
                        </div>
                        <div class="p-md mb-md" style="background: var(--bg); border-radius: var(--radius); border: 1px solid var(--border-light);">
                            <h4 class="text-bold mb-xs">Installation Steps:</h4>
                            <ol class="text-sm text-secondary" style="padding-left:20px; line-height:1.8;">
                                <li>Ensure Python 3.8+ and <code>psutil</code> library are installed: <code>pip install psutil requests</code></li>
                                <li>Download <code>agent.py</code> onto the target computer or execute the PowerShell / Terminal command below.</li>
                                <li>Run the agent as a background service: <code>python agent.py</code></li>
                                <li>The machine will automatically register on the LabX Dashboard within 5 seconds!</li>
                            </ol>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Windows PowerShell 1-Liner Command</label>
                            <input type="text" class="form-input" readonly value="iwr -useb http://localhost:8080/agent.py -OutFile agent.py; python agent.py" style="font-family:monospace; background: #0F172A; color: #38BDF8;">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Linux / macOS Terminal Command</label>
                            <input type="text" class="form-input" readonly value="curl -sSL http://localhost:8080/agent.py -o agent.py && python3 agent.py" style="font-family:monospace; background: #0F172A; color: #4ADE80;">
                        </div>
                    </div>

                    <!-- Thresholds Tab -->
                    <div id="pane-tab-thresholds" class="tab-pane" style="display:none;">
                        <div class="grid-2 gap-lg mb-lg">
                            <div>
                                <h3 class="text-lg text-bold mb-md">CPU Thresholds</h3>
                                <div class="form-group mb-sm">
                                    <label class="form-label flex-between"><span>Warning (%)</span> <span class="val-display">80%</span></label>
                                    <input type="range" class="form-input" min="0" max="100" value="80" oninput="this.previousElementSibling.querySelector('.val-display').textContent=this.value+'%'">
                                </div>
                                <div class="form-group">
                                    <label class="form-label flex-between"><span>Critical (%)</span> <span class="val-display">95%</span></label>
                                    <input type="range" class="form-input" min="0" max="100" value="95" oninput="this.previousElementSibling.querySelector('.val-display').textContent=this.value+'%'">
                                </div>
                            </div>
                            <div>
                                <h3 class="text-lg text-bold mb-md">Memory Thresholds</h3>
                                <div class="form-group mb-sm">
                                    <label class="form-label flex-between"><span>Warning (%)</span> <span class="val-display">80%</span></label>
                                    <input type="range" class="form-input" min="0" max="100" value="80" oninput="this.previousElementSibling.querySelector('.val-display').textContent=this.value+'%'">
                                </div>
                                <div class="form-group">
                                    <label class="form-label flex-between"><span>Critical (%)</span> <span class="val-display">95%</span></label>
                                    <input type="range" class="form-input" min="0" max="100" value="95" oninput="this.previousElementSibling.querySelector('.val-display').textContent=this.value+'%'">
                                </div>
                            </div>
                            <div>
                                <h3 class="text-lg text-bold mb-md">Storage Thresholds</h3>
                                <div class="form-group mb-sm">
                                    <label class="form-label flex-between"><span>Warning (%)</span> <span class="val-display">85%</span></label>
                                    <input type="range" class="form-input" min="0" max="100" value="85" oninput="this.previousElementSibling.querySelector('.val-display').textContent=this.value+'%'">
                                </div>
                                <div class="form-group">
                                    <label class="form-label flex-between"><span>Critical (%)</span> <span class="val-display">95%</span></label>
                                    <input type="range" class="form-input" min="0" max="100" value="95" oninput="this.previousElementSibling.querySelector('.val-display').textContent=this.value+'%'">
                                </div>
                            </div>
                            <div>
                                <h3 class="text-lg text-bold mb-md">Temperature Thresholds</h3>
                                <div class="form-group mb-sm">
                                    <label class="form-label flex-between"><span>Warning (Â°C)</span> <span class="val-display">70Â°C</span></label>
                                    <input type="range" class="form-input" min="0" max="120" value="70" oninput="this.previousElementSibling.querySelector('.val-display').textContent=this.value+'Â°C'">
                                </div>
                                <div class="form-group">
                                    <label class="form-label flex-between"><span>Critical (Â°C)</span> <span class="val-display">85Â°C</span></label>
                                    <input type="range" class="form-input" min="0" max="120" value="85" oninput="this.previousElementSibling.querySelector('.val-display').textContent=this.value+'Â°C'">
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-save">Save Changes</button>
                    </div>

                    <!-- Notifications Tab -->
                    <div id="pane-tab-notifications" class="tab-pane" style="display:none;">
                        <div class="grid-2 gap-lg mb-lg">
                            <div>
                                <h3 class="text-lg text-bold mb-md">Notification Channels</h3>
                                <div class="form-group mb-md">
                                    <label class="flex gap-sm cursor-pointer" style="align-items:center;">
                                        <input type="checkbox" class="form-checkbox" checked> Email Notifications
                                    </label>
                                    <input type="email" class="form-input mt-sm" value="admin@labx.edu">
                                </div>
                                <div class="form-group mb-sm">
                                    <label class="flex gap-sm cursor-pointer" style="align-items:center;">
                                        <input type="checkbox" class="form-checkbox" checked> Browser Notifications
                                    </label>
                                </div>
                                <div class="form-group mb-sm">
                                    <label class="flex gap-sm cursor-pointer" style="align-items:center;">
                                        <input type="checkbox" class="form-checkbox"> SMS Alerts
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-lg text-bold mb-md">Notification Rules</h3>
                                <div class="form-group mb-sm">
                                    <label class="flex gap-sm cursor-pointer" style="align-items:center;">
                                        <input type="checkbox" class="form-checkbox" checked> Notify on Critical
                                    </label>
                                </div>
                                <div class="form-group mb-sm">
                                    <label class="flex gap-sm cursor-pointer" style="align-items:center;">
                                        <input type="checkbox" class="form-checkbox" checked> Notify on Warning
                                    </label>
                                </div>
                                <div class="form-group mb-sm">
                                    <label class="flex gap-sm cursor-pointer" style="align-items:center;">
                                        <input type="checkbox" class="form-checkbox"> Notify on Recovery
                                    </label>
                                </div>
                                <div class="form-group mb-sm">
                                    <label class="flex gap-sm cursor-pointer" style="align-items:center;">
                                        <input type="checkbox" class="form-checkbox" checked> Daily Summary
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-save">Save Changes</button>
                    </div>

                    <!-- Backup Tab -->
                    <div id="pane-tab-backup" class="tab-pane" style="display:none;">
                        <div class="grid-2 gap-lg mb-lg">
                            <div>
                                <h3 class="text-lg text-bold mb-md">Backup Configuration</h3>
                                <div class="form-group mb-md flex gap-sm" style="align-items:center;">
                                    <input type="checkbox" class="form-checkbox" checked id="auto-backup">
                                    <label for="auto-backup" class="form-label" style="margin-bottom:0;">Auto Backup</label>
                                </div>
                                <div class="form-group mb-md">
                                    <label class="form-label">Backup Frequency</label>
                                    <select class="form-select">
                                        <option>Daily</option>
                                        <option selected>Weekly</option>
                                        <option>Monthly</option>
                                    </select>
                                </div>
                                <div class="form-group mb-md">
                                    <label class="form-label">Backup Location</label>
                                    <input type="text" class="form-input" value="/backups/labx">
                                </div>
                                <div class="mb-md">
                                    <span class="text-secondary text-sm">Last Backup:</span>
                                    <span class="text-bold">Aug 4, 2025 at 11:00 PM</span>
                                </div>
                                <button class="btn btn-secondary" id="btn-backup-now">Backup Now</button>
                            </div>
                            <div>
                                <h3 class="text-lg text-bold mb-md">Restore</h3>
                                <p class="text-secondary mb-md">Restore system state from a backup file.</p>
                                <div class="form-group mb-md">
                                    <input type="file" class="form-input">
                                </div>
                                <button class="btn btn-danger">Restore</button>
                            </div>
                        </div>
                    </div>

                    <!-- Theme Tab -->
                    <div id="pane-tab-theme" class="tab-pane" style="display:none;">
                        <h3 class="text-lg text-bold mb-md">Appearance</h3>
                        
                        <div class="mb-lg">
                            <label class="form-label mb-sm">Theme</label>
                            <div class="flex gap-md">
                                <div class="card cursor-pointer" style="border: 2px solid var(--primary); padding: var(--radius-sm);">
                                    <div class="text-bold text-center">Light</div>
                                </div>
                                <div class="card cursor-not-allowed" style="opacity: 0.5; padding: var(--radius-sm);">
                                    <div class="text-bold text-center">Dark <span class="badge badge-info ml-sm">Coming Soon</span></div>
                                </div>
                            </div>
                        </div>

                        <div class="mb-lg">
                            <label class="form-label mb-sm">Primary Color</label>
                            <div class="flex gap-sm">
                                <div style="width:32px;height:32px;border-radius:50%;background:#2563EB;border:2px solid black;cursor:pointer;"></div>
                                <div style="width:32px;height:32px;border-radius:50%;background:#4F46E5;cursor:pointer;"></div>
                                <div style="width:32px;height:32px;border-radius:50%;background:#0D9488;cursor:pointer;"></div>
                                <div style="width:32px;height:32px;border-radius:50%;background:#9333EA;cursor:pointer;"></div>
                            </div>
                        </div>

                        <div class="form-group mb-lg" style="max-width:200px;">
                            <label class="form-label">Font Size</label>
                            <select class="form-select">
                                <option>Small</option>
                                <option selected>Medium</option>
                                <option>Large</option>
                            </select>
                        </div>

                        <div class="form-group mb-lg flex gap-sm" style="align-items:center;">
                            <input type="checkbox" class="form-checkbox" id="compact-mode">
                            <label for="compact-mode" class="form-label" style="margin-bottom:0;">Compact Mode</label>
                        </div>
                        
                        <button class="btn btn-primary btn-save">Save Changes</button>
                    </div>
                </div>
            </div>
        `;
        return html;
    },

    init() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetBtn = e.target.closest('.tab-btn');
                const targetId = targetBtn.getAttribute('data-tab');
                
                tabBtns.forEach(b => b.classList.remove('active'));
                targetBtn.classList.add('active');

                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.style.display = 'none';
                });
                const pane = document.getElementById('pane-' + targetId);
                if(pane) pane.style.display = 'block';
            });
        });

        document.querySelectorAll('.btn-save').forEach(btn => {
            btn.addEventListener('click', () => {
                if (App.showToast) App.showToast('Settings saved successfully', 'success');
            });
        });

        const btnBackup = document.getElementById('btn-backup-now');
        if (btnBackup) {
            btnBackup.addEventListener('click', () => {
                const backupObj = {
                    version: "1.0.0",
                    timestamp: new Date().toISOString(),
                    labs: LabData.labs,
                    computers: LabData.computers,
                    alerts: LabData.alerts,
                    insights: LabData.insights
                };

                const blob = new Blob([JSON.stringify(backupObj, null, 2)], { type: 'application/json' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `labx-system-backup-${new Date().toISOString().slice(0,10)}.json`;
                a.click();
                window.URL.revokeObjectURL(url);

                if (App.showToast) App.showToast('System database backup downloaded!', 'success');
            });
        }

        if (window.lucide) window.lucide.createIcons();
    },

    destroy() {}
};
const ArchitecturePage = {
  render() {
    return `
<div class="page-header flex-between">
  <div>
    <h1 class="page-title">System Architecture & Client Agent</h1>
    <p class="page-subtitle">LabX Monitoring Platform Technical Design & Software Deployer</p>
  </div>
  <div class="page-actions">
    <a href="agent.py" download="labx-agent.py" class="btn btn-primary">
      <i data-lucide="download"></i> Download Client Agent (agent.py)
    </a>
  </div>
</div>

<div class="page-content flex flex-col gap-lg">
  
  <!-- Client Agent Deployment Box -->
  <div class="card" style="border: 2px solid var(--primary-light); background: #F8FAFC;">
    <div class="flex-between mb-md">
      <div>
        <h2 class="text-xl text-bold flex gap-sm" style="align-items:center;">
          <i data-lucide="terminal" class="text-primary"></i> LabX Client Agent Deployment Center
        </h2>
        <p class="text-sm text-secondary mt-xs">Deploy the lightweight telemetry collector to college laboratory workstations (Windows / Linux / macOS)</p>
      </div>
      <a href="agent.py" download="labx-agent.py" class="btn btn-sm btn-primary">
        <i data-lucide="download"></i> Download agent.py
      </a>
    </div>

    <!-- Quick Installer Commands -->
    <div class="grid grid-2 gap-md mb-md">
      <div class="p-md" style="background: white; border-radius: var(--radius); border: 1px solid var(--border);">
        <strong class="text-sm flex gap-xs mb-xs" style="align-items:center;">
          <i data-lucide="terminal" class="text-primary" style="width:16px;"></i> One-Line Windows PowerShell Install Command
        </strong>
        <div style="background: #0F172A; color: #38BDF8; font-family: monospace; font-size: 12px; padding: 10px; border-radius: 6px; overflow-x: auto; white-space: nowrap; margin-top: 6px;">
          iwr -useb http://localhost:8080/agent.py -OutFile agent.py; python agent.py
        </div>
      </div>
      
      <div class="p-md" style="background: white; border-radius: var(--radius); border: 1px solid var(--border);">
        <strong class="text-sm flex gap-xs mb-xs" style="align-items:center;">
          <i data-lucide="terminal" class="text-success" style="width:16px;"></i> Linux / macOS Terminal Command
        </strong>
        <div style="background: #0F172A; color: #4ADE80; font-family: monospace; font-size: 12px; padding: 10px; border-radius: 6px; overflow-x: auto; white-space: nowrap; margin-top: 6px;">
          curl -sSL http://localhost:8080/agent.py -o agent.py && python3 agent.py
        </div>
      </div>
    </div>

    <!-- Source Code Viewer Accordion/Box -->
    <div class="card p-md" style="background: #0F172A; color: #F8FAFC; font-family: monospace;">
      <div class="flex-between mb-xs">
        <span class="text-xs text-secondary" style="color: #94A3B8;">agent.py â€” Hardware Telemetry Collector Source Code</span>
        <button class="btn btn-sm btn-ghost" id="copy-agent-code" style="color:#38BDF8; padding:2px 8px;">
          <i data-lucide="copy" style="width:14px;"></i> Copy Code
        </button>
      </div>
      <pre style="max-height: 220px; overflow-y: auto; font-size: 12px; line-height: 1.5; color: #E2E8F0; margin:0;">
import time, socket, platform, psutil, requests

SERVER_URL = "http://localhost:8080/api/v1/telemetry"

def collect_telemetry():
    cpu_usage = psutil.cpu_percent(interval=1)
    ram = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    
    return {
        "hostname": socket.gethostname(),
        "ip": socket.gethostbyname(socket.gethostname()),
        "processor": platform.processor(),
        "physicalCores": psutil.cpu_count(logical=False),
        "logicalCores": psutil.cpu_count(logical=True),
        "cpuUsage": cpu_usage,
        "installedRam": f"{round(ram.total / (1024**3))} GB",
        "availableRam": round(ram.available / (1024**3), 1),
        "ramUsage": ram.percent,
        "disk": { "total": round(disk.total / (1024**3)), "percent": disk.percent },
        "os": f"{platform.system()} {platform.release()}",
        "uptimeHours": round((time.time() - psutil.boot_time()) / 3600, 1),
        "timestamp": time.time()
    }

while True:
    data = collect_telemetry()
    print(f"[LabX Agent] Telemetry payload sent to server: CPU {data['cpuUsage']}% | RAM {data['ramUsage']}%")
    time.sleep(5)
</pre>
    </div>
  </div>

  <!-- Architecture Diagram -->
  <div class="card">
    <h2 class="text-xl text-bold mb-md">Architecture Diagram</h2>
    <div class="arch-flow flex flex-between" style="padding: 24px; background: var(--bg); border-radius: var(--radius); align-items:center; overflow-x: auto;">
      <div class="arch-node card flex flex-col flex-center text-center p-md" style="min-width:180px; border: 2px solid var(--primary);">
        <i data-lucide="laptop" style="color:var(--primary); width:40px; height:40px; margin-bottom:12px;"></i>
        <strong style="margin-bottom:8px;">Client Agent</strong>
        <p class="text-xs text-secondary">Lightweight python daemon (`agent.py`) installed on each lab workstation.</p>
      </div>
      <div class="arch-arrow text-secondary"><i data-lucide="arrow-right"></i></div>
      
      <div class="arch-node card flex flex-col flex-center text-center p-md" style="min-width:180px; border: 2px solid var(--success);">
        <i data-lucide="server" style="color:var(--success); width:40px; height:40px; margin-bottom:12px;"></i>
        <strong style="margin-bottom:8px;">Monitoring Server</strong>
        <p class="text-xs text-secondary">Central server receiving 5-sec heartbeat JSON payloads from agents.</p>
      </div>
      <div class="arch-arrow text-secondary"><i data-lucide="arrow-right"></i></div>
      
      <div class="arch-node card flex flex-col flex-center text-center p-md" style="min-width:180px; border: 2px solid var(--warning);">
        <i data-lucide="database" style="color:var(--warning); width:40px; height:40px; margin-bottom:12px;"></i>
        <strong style="margin-bottom:8px;">Database</strong>
        <p class="text-xs text-secondary">Stores time-series metrics, logs, and system thresholds.</p>
      </div>
      <div class="arch-arrow text-secondary"><i data-lucide="arrow-right"></i></div>
      
      <div class="arch-node card flex flex-col flex-center text-center p-md" style="min-width:180px; border: 2px solid var(--critical); background: var(--critical-bg);">
        <i data-lucide="monitor" style="color:var(--critical); width:40px; height:40px; margin-bottom:12px;"></i>
        <strong style="margin-bottom:8px;">Web Dashboard</strong>
        <p class="text-xs text-secondary">Real-time SaaS UI for IT administrators to monitor and manage all systems.</p>
      </div>
    </div>
  </div>

  <!-- Tech Stack & Metrics -->
  <div class="grid grid-2 gap-lg">
    <div class="card">
      <h2 class="text-xl text-bold mb-md">Technology Stack</h2>
      <div class="table-container">
        <table class="data-table" style="width:100%; border-collapse:collapse;">
          <tr style="border-bottom:1px solid var(--border); text-align:left;">
            <th class="p-sm">Layer</th>
            <th class="p-sm">Technology</th>
            <th class="p-sm">Purpose</th>
          </tr>
          <tr style="border-bottom:1px solid var(--border);"><td class="p-sm">Client Agent</td><td class="p-sm">Python + psutil</td><td class="p-sm text-secondary">System metric collection</td></tr>
          <tr style="border-bottom:1px solid var(--border);"><td class="p-sm">Server</td><td class="p-sm">Node.js + Express</td><td class="p-sm text-secondary">API server & data processing</td></tr>
          <tr style="border-bottom:1px solid var(--border);"><td class="p-sm">Database</td><td class="p-sm">MongoDB</td><td class="p-sm text-secondary">Time-series data storage</td></tr>
          <tr style="border-bottom:1px solid var(--border);"><td class="p-sm">Dashboard</td><td class="p-sm">HTML/CSS/JavaScript</td><td class="p-sm text-secondary">Real-time monitoring UI</td></tr>
          <tr style="border-bottom:1px solid var(--border);"><td class="p-sm">Charts</td><td class="p-sm">Chart.js</td><td class="p-sm text-secondary">Data visualization</td></tr>
          <tr><td class="p-sm">Communication</td><td class="p-sm">REST API + WebSocket</td><td class="p-sm text-secondary">Real-time data transfer</td></tr>
        </table>
      </div>
    </div>

    <!-- System Metrics -->
    <div class="card">
      <h2 class="text-xl text-bold mb-md">System Metrics Collected</h2>
      <div class="grid grid-2 gap-md">
        <div class="p-sm" style="background:var(--bg); border-radius:var(--radius-sm);">
          <strong class="flex gap-xs mb-xs" style="align-items:center;"><i data-lucide="cpu" style="width:16px;"></i> CPU</strong>
          <div class="text-xs text-secondary">Usage %, Core Count, Clock Speed, Cache, Load Average, Thread Count</div>
        </div>
        <div class="p-sm" style="background:var(--bg); border-radius:var(--radius-sm);">
          <strong class="flex gap-xs mb-xs" style="align-items:center;"><i data-lucide="memory-stick" style="width:16px;"></i> Memory</strong>
          <div class="text-xs text-secondary">Total RAM, Available RAM, Usage %, Page Faults</div>
        </div>
        <div class="p-sm" style="background:var(--bg); border-radius:var(--radius-sm);">
          <strong class="flex gap-xs mb-xs" style="align-items:center;"><i data-lucide="hard-drive" style="width:16px;"></i> Storage</strong>
          <div class="text-xs text-secondary">Total Disk, Used Space, Free Space, I/O Rate</div>
        </div>
        <div class="p-sm" style="background:var(--bg); border-radius:var(--radius-sm);">
          <strong class="flex gap-xs mb-xs" style="align-items:center;"><i data-lucide="network" style="width:16px;"></i> Network</strong>
          <div class="text-xs text-secondary">Speed, Adapter, Bandwidth, Latency</div>
        </div>
      </div>
    </div>
  </div>

</div>`;
  },
  
  init() {
    const copyBtn = document.getElementById('copy-agent-code');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const code = `import time, socket, platform, psutil, requests

SERVER_URL = "http://localhost:8080/api/v1/telemetry"

def collect_telemetry():
    cpu_usage = psutil.cpu_percent(interval=1)
    ram = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    return {
        "hostname": socket.gethostname(),
        "ip": socket.gethostbyname(socket.gethostname()),
        "processor": platform.processor(),
        "physicalCores": psutil.cpu_count(logical=False),
        "logicalCores": psutil.cpu_count(logical=True),
        "cpuUsage": cpu_usage,
        "installedRam": f"{round(ram.total / (1024**3))} GB",
        "availableRam": round(ram.available / (1024**3), 1),
        "ramUsage": ram.percent,
        "disk": { "total": round(disk.total / (1024**3)), "percent": disk.percent },
        "os": f"{platform.system()} {platform.release()}",
        "uptimeHours": round((time.time() - psutil.boot_time()) / 3600, 1),
        "timestamp": time.time()
    }

while True:
    data = collect_telemetry()
    print(f"[LabX Agent] Telemetry payload sent: CPU {data['cpuUsage']}% | RAM {data['ramUsage']}%")
    time.sleep(5)`;
        navigator.clipboard.writeText(code);
        if (window.App && App.showToast) {
          App.showToast('Client Agent code copied to clipboard!', 'success');
        }
      });
    }

    if (window.lucide) lucide.createIcons();
  },
  
  destroy() {}
};
/* ============================================================
   LabX â€” Application Router & Interactive Controller
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
            results.push({ title: c.hostname, subtitle: `${c.ip} â€¢ ${c.lab}`, action: `#/assets/${c.id}` });
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

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
