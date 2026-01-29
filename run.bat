@echo off
REM ============================================================================
REM run.bat - Daily Use Script for CAD-KI
REM 
REM This script provides an interactive command prompt with the CAD-KI
REM environment activated. It's designed for daily use without needing to
REM manually activate the virtual environment.
REM 
REM Usage: Simply double-click this file or run "run.bat" from command line
REM ============================================================================

echo ============================================================================
echo CAD-KI Interactive Session
echo ============================================================================
echo.

REM Check if virtual environment exists
if not exist "venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo.
    echo Please run setup.bat first to create the virtual environment
    echo and install CAD-KI.
    echo.
    pause
    exit /b 1
)

REM Activate virtual environment
echo Activating CAD-KI environment...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    pause
    exit /b 1
)
echo Environment activated successfully!
echo.

echo ============================================================================
echo Available CAD-KI Commands:
echo ============================================================================
echo   cad-ki verify             - Verify the installation
echo   cad-ki configure          - Configure CAD-KI settings
echo   cad-ki analyze [file]     - Analyze a CAD model
echo   cad-ki --help             - Show all available commands
echo.
echo Type 'exit' to close this session
echo ============================================================================
echo.

REM Keep the command prompt open with environment activated
cmd /k
