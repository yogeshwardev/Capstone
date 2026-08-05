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
    { id: 'alt-5', severity: 'warning', type: 'Temperature Warning', computer: 'LAB-A-PC-07', computerId: 'comp-07', description: 'CPU temperature reached 75°C', time: new Date(Date.now() - 45 * 60000), status: 'active' },
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
