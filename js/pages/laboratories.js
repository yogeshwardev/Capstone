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
