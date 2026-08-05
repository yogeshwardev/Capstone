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
                                    <label class="form-label flex-between"><span>Warning (°C)</span> <span class="val-display">70°C</span></label>
                                    <input type="range" class="form-input" min="0" max="120" value="70" oninput="this.previousElementSibling.querySelector('.val-display').textContent=this.value+'°C'">
                                </div>
                                <div class="form-group">
                                    <label class="form-label flex-between"><span>Critical (°C)</span> <span class="val-display">85°C</span></label>
                                    <input type="range" class="form-input" min="0" max="120" value="85" oninput="this.previousElementSibling.querySelector('.val-display').textContent=this.value+'°C'">
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
