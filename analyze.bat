@echo off
REM ============================================================================
REM analyze.bat - Analyze Model Script for CAD-KI
REM 
REM This script runs CAD-KI analysis on a specified model file with
REM visualization enabled. It accepts a model file path as a command-line
REM argument and handles paths with spaces correctly.
REM 
REM Usage: 
REM   analyze.bat "path\to\model.prt"
REM   or drag and drop a file onto this script
REM ============================================================================

echo ============================================================================
echo CAD-KI Model Analysis
echo ============================================================================
echo.

REM Check if argument was provided
if "%~1"=="" (
    echo ERROR: No model file specified
    echo.
    echo Usage:
    echo   analyze.bat "path\to\model.prt"
    echo.
    echo You can also drag and drop a model file onto this script.
    echo.
    pause
    exit /b 1
)

REM Store the full path (with quotes preserved for spaces)
set "MODEL_FILE=%~1"

REM Check if file exists
if not exist "%MODEL_FILE%" (
    echo ERROR: File not found: %MODEL_FILE%
    echo.
    echo Please check that the file path is correct.
    echo.
    pause
    exit /b 1
)

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

REM Run analysis with visualization
echo Analyzing model: %MODEL_FILE%
echo.
cad-ki analyze "%MODEL_FILE%" --visualize
if errorlevel 1 (
    echo.
    echo ERROR: Analysis failed
    echo Please check the error messages above
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================================================
echo Analysis Complete!
echo ============================================================================
echo.
pause
exit /b 0
