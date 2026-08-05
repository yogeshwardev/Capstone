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
