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
          <div class="flex flex-between p-sm" style="background:var(--bg); border-radius:var(--radius-sm);"><strong class="text-primary">Disk (SSD)</strong> <span class="text-secondary">Speed: ~100μs | Size: 512GB</span></div>
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
