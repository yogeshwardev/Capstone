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
