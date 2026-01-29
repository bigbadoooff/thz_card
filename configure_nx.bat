@echo off
REM ============================================================================
REM configure_nx.bat - NX Configuration Script for CAD-KI
REM 
REM This script helps configure the NX installation path for CAD-KI.
REM It prompts the user for the NX installation path and handles paths
REM with spaces correctly.
REM 
REM Usage: Simply double-click this file or run "configure_nx.bat" from command line
REM ============================================================================

echo ============================================================================
echo CAD-KI NX Configuration
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
echo Activating virtual environment...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    pause
    exit /b 1
)
echo Environment activated successfully!
echo.

REM Prompt for NX path
echo Please enter the path to your NX installation.
echo Default: C:\Program Files\Siemens\NX2406
echo.
set /p NX_PATH="NX Path (press Enter for default): "

REM Use default if no input provided
if "%NX_PATH%"=="" (
    set "NX_PATH=C:\Program Files\Siemens\NX2406"
    echo Using default path: %NX_PATH%
)
echo.

REM Check if the path exists
if not exist "%NX_PATH%" (
    echo WARNING: The specified path does not exist: %NX_PATH%
    echo.
    set /p CONTINUE="Continue anyway? (y/n): "
    if /i not "%CONTINUE%"=="y" (
        echo Configuration cancelled.
        pause
        exit /b 1
    )
    echo.
)

REM Run configuration command with quotes to handle spaces
echo Configuring CAD-KI with NX path...
echo.
cad-ki configure --nx-path "%NX_PATH%"
if errorlevel 1 (
    echo.
    echo ERROR: Configuration failed
    echo Please check the error messages above
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================================================
echo Configuration Complete!
echo ============================================================================
echo NX path configured successfully: %NX_PATH%
echo.
pause
exit /b 0
