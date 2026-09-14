@echo off
title "Setup Local Domain for K-Sentinel & WealthPilot"
echo ====================================================================
echo   Configuring Local Domain Names:
echo   - http://k-sentinel.local/
echo   - http://wealthpilot.local/
echo ====================================================================
echo.

:: Check for Administrator privileges
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [REQUEST ELEVATION] Requesting Administrator privilege to update hosts file...
    powershell -Command "Start-Process cmd -ArgumentList '/c \"%~f0\"' -Verb RunAs"
    exit /b
)

set HOSTS_FILE=%WINDIR%\System32\drivers\etc\hosts

:: Check if already mapped
findstr /i "k-sentinel.local" "%HOSTS_FILE%" >nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] k-sentinel.local is ALREADY configured in your hosts file!
) else (
    echo. >> "%HOSTS_FILE%"
    echo # K-Sentinel and WealthPilot Local Domains >> "%HOSTS_FILE%"
    echo 127.0.0.1  k-sentinel.local >> "%HOSTS_FILE%"
    echo 127.0.0.1  wealthpilot.local >> "%HOSTS_FILE%"
    echo [OK] Successfully added k-sentinel.local and wealthpilot.local to hosts!
)

ipconfig /flushdns >nul

echo.
echo ====================================================================
echo [SUCCESS] Domain setup complete!
echo You can now access the website directly via:
echo   - http://k-sentinel.local/        (Home Page)
echo   - http://k-sentinel.local/app     (Interactive Dashboard)
echo   - http://localhost/
echo ====================================================================
echo.
pause
