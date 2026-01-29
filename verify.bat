@echo off
REM ============================================================================
REM verify.bat - Quick Verification Script for CAD-KI
REM 
REM This script activates the virtual environment and runs the CAD-KI verify
REM command to check if the installation is working correctly.
REM 
REM Usage: Simply double-click this file or run "verify.bat" from command line
REM ============================================================================

echo ============================================================================
echo CAD-KI Installation Verification
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
echo.

REM Run verification command
echo Running CAD-KI verification...
echo.
cad-ki verify
if errorlevel 1 (
    echo.
    echo ERROR: Verification failed
    echo Please check the error messages above
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================================================
echo Verification Complete!
echo ============================================================================
echo.
pause
exit /b 0
