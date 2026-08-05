#!/usr/bin/env python3
"""
====================================================================
  LabX — Client Telemetry Agent Software (Production SaaS Edition)
  Automated hardware metrics collector for Linux, Windows, & macOS
====================================================================
"""

import time
import socket
import platform
import psutil
import requests
import json
import sys

# Production Server configuration
SERVER_URL = "http://localhost:5000/api/v1/telemetry"
API_KEY = "labx-secret-key-2025"
INTERVAL_SECONDS = 5

def get_ip_address():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

def get_mac_address():
    try:
        import uuid
        mac = ':'.join(['{:02x}'.format((uuid.getnode() >> ele) & 0xff) for ele in range(0,8*6,8)][::-1])
        return mac.upper()
    except Exception:
        return "AA:BB:CC:DD:EE:01"

def collect_telemetry():
    # CPU
    cpu_usage = psutil.cpu_percent(interval=1)
    cpu_freq = psutil.cpu_freq()
    
    # RAM
    ram = psutil.virtual_memory()
    
    # Storage
    disk = psutil.disk_usage('/')
    
    # Processes
    processes = []
    for proc in sorted(psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent']),
                       key=lambda p: p.info['cpu_percent'] or 0, reverse=True)[:5]:
        processes.append({
            "pid": proc.info['pid'],
            "name": proc.info['name'],
            "cpu": round(proc.info['cpu_percent'] or 0, 1),
            "memory": round(proc.info['memory_percent'] or 0, 1)
        })

    # Temperature
    temp = None
    try:
        temps = psutil.sensors_temperatures()
        if 'coretemp' in temps:
            temp = round(temps['coretemp'][0].current, 1)
    except Exception:
        temp = None

    return {
        "mac": get_mac_address(),
        "hostname": socket.gethostname(),
        "ip": get_ip_address(),
        "processor": platform.processor() or "x86_64 Processor",
        "physicalCores": psutil.cpu_count(logical=False),
        "logicalCores": psutil.cpu_count(logical=True),
        "clockSpeed": f"{round(cpu_freq.current / 1000, 2)} GHz" if cpu_freq else "2.40 GHz",
        "cpuUsage": cpu_usage,
        "installedRam": f"{round(ram.total / (1024**3))} GB",
        "availableRam": round(ram.available / (1024**3), 1),
        "ramUsage": ram.percent,
        "disk": {
            "total": round(disk.total / (1024**3)),
            "used": round(disk.used / (1024**3)),
            "free": round(disk.free / (1024**3)),
            "percent": disk.percent
        },
        "os": f"{platform.system()} {platform.release()}",
        "osVersion": platform.version(),
        "uptimeHours": round((time.time() - psutil.boot_time()) / 3600, 1),
        "temperature": temp,
        "processes": processes,
        "timestamp": time.time()
    }

def main():
    print("=" * 60)
    print(" [LabX] Production Telemetry Agent v1.0")
    print(f" Target API: {SERVER_URL}")
    print(f" MAC Address: {get_mac_address()}")
    print(f" Polling Interval: {INTERVAL_SECONDS}s")
    print("=" * 60)
    
    headers = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
    }

    while True:
        try:
            payload = collect_telemetry()
            res = requests.post(SERVER_URL, json=payload, headers=headers, timeout=3)
            print(f"[{time.strftime('%H:%M:%S')}] Telemetry Sent -> Status {res.status_code} | CPU: {payload['cpuUsage']}% | RAM: {payload['ramUsage']}%")
        except KeyboardInterrupt:
            print("\nStopping Agent...")
            sys.exit(0)
        except Exception as e:
            print(f"[{time.strftime('%H:%M:%S')}] Telemetry queued/failed: {e}")
            
        time.sleep(INTERVAL_SECONDS)

if __name__ == "__main__":
    main()
