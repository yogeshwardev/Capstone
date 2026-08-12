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
        <span class="text-xs text-secondary" style="color: #94A3B8;">agent.py — Hardware Telemetry Collector Source Code</span>
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
        <p class="text-xs text-secondary">Lightweight python daemon (<code>agent.py</code>) installed on each lab workstation.</p>
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
