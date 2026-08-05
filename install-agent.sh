#!/bin/bash
echo "===================================================================="
echo "  🚀 LabX Telemetry Agent Workstation Installer (Linux / macOS)"
echo "===================================================================="

# Ensure Python 3 & pip are installed
if ! command -v python3 &> /dev/null
then
    echo "Python3 could not be found. Please install Python 3."
    exit 1
fi

echo "Installing required packages (psutil, requests)..."
python3 -m pip install psutil requests

echo "Downloading LabX Client Telemetry Agent..."
curl -sSL http://localhost:8080/agent.py -o agent.py

echo "Launching LabX Agent..."
python3 agent.py
