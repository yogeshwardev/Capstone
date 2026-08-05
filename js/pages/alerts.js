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
