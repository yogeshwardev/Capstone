@echo off
TITLE LabX Telemetry Agent Workstation Installer
COLOR 0A
ECHO ====================================================================
ECHO   🚀 LabX Centralized Monitoring Platform - Workstation Installer
ECHO ====================================================================
ECHO.
ECHO Installing Python dependencies (psutil, requests)...
python -m pip install psutil requests

ECHO.
ECHO Downloading LabX Agent Payload from Server...
powershell -Command "Invoke-WebRequest -Uri 'http://192.168.1.50:8080/agent.py' -OutFile 'agent.py'"

ECHO.
ECHO Starting LabX Telemetry Agent...
python agent.py

PAUSE
