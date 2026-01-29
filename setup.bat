@echo off
REM ============================================================================
REM setup.bat - First-time Setup Script for CAD-KI
REM 
REM This script handles the initial setup of the CAD-KI environment:
REM - Creates a Python virtual environment if it doesn't exist
REM - Activates the virtual environment
REM - Upgrades pip to the latest version
REM - Installs CAD-KI and all dependencies using pip install -e .
REM 
REM Usage: Simply double-click this file or run "setup.bat" from command line
REM ============================================================================

echo ============================================================================
echo CAD-KI First-Time Setup Script
echo ============================================================================
echo.

REM Check if Python is available
echo [1/5] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8 or higher and add it to your PATH
    echo Download from: https://www.python.org/downloads/
    pause
    exit /b 1
)
python --version
echo Python found successfully!
echo.

REM Check if virtual environment exists
echo [2/5] Checking virtual environment...
if exist "venv\Scripts\activate.bat" (
    echo Virtual environment already exists.
    echo.
) else (
    echo Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment
        echo Make sure you have the 'venv' module installed
        pause
        exit /b 1
    )
    echo Virtual environment created successfully!
    echo.
)

REM Activate virtual environment
echo [3/5] Activating virtual environment...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    pause
    exit /b 1
)
echo Virtual environment activated!
echo.

REM Upgrade pip
echo [4/5] Upgrading pip...
python -m pip install --upgrade pip
if errorlevel 1 (
    echo WARNING: Failed to upgrade pip, continuing anyway...
    echo.
) else (
    echo Pip upgraded successfully!
    echo.
)

REM Install CAD-KI in editable mode
echo [5/5] Installing CAD-KI and dependencies...
if exist "setup.py" (
    pip install -e .
    if errorlevel 1 (
        echo ERROR: Failed to install CAD-KI
        echo Please check if setup.py exists and is properly configured
        pause
        exit /b 1
    )
    echo CAD-KI installed successfully!
) else if exist "pyproject.toml" (
    pip install -e .
    if errorlevel 1 (
        echo ERROR: Failed to install CAD-KI
        echo Please check if pyproject.toml exists and is properly configured
        pause
        exit /b 1
    )
    echo CAD-KI installed successfully!
) else (
    echo WARNING: No setup.py or pyproject.toml found
    echo Attempting to install from requirements.txt if available...
    if exist "requirements.txt" (
        pip install -r requirements.txt
        if errorlevel 1 (
            echo ERROR: Failed to install requirements
            pause
            exit /b 1
        )
        echo Requirements installed successfully!
    ) else (
        echo ERROR: No setup.py, pyproject.toml, or requirements.txt found
        echo Cannot install CAD-KI
        pause
        exit /b 1
    )
)
echo.

echo ============================================================================
echo Setup Complete!
echo ============================================================================
echo.
echo You can now use the following scripts:
echo   - run.bat        : Start an interactive CAD-KI session
echo   - verify.bat     : Verify the installation
echo   - configure_nx.bat : Configure NX path
echo   - analyze.bat    : Analyze a CAD model
echo   - dev.bat        : Access development menu
echo.
echo Press any key to exit...
pause >nul
exit /b 0
