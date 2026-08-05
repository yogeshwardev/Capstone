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
                        ${Components.statItem('Temperature', computer.temperature ? computer.temperature + '°C' : 'N/A', 'thermometer')}
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
