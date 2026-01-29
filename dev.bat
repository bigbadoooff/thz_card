@echo off
REM ============================================================================
REM dev.bat - Interactive Development Menu for CAD-KI
REM 
REM This script provides a comprehensive interactive menu for common
REM development tasks including setup, testing, configuration, and analysis.
REM 
REM Usage: Simply double-click this file or run "dev.bat" from command line
REM ============================================================================

:MENU
cls
echo ============================================================================
echo CAD-KI Development Menu
echo ============================================================================
echo.
echo Please select an option:
echo.
echo   1. Setup/Install (First-time setup or reinstall)
echo   2. Activate environment only (Interactive session)
echo   3. Verify installation
echo   4. Configure NX path
echo   5. Run tests (pytest)
echo   6. Analyze a model
echo   7. Update dependencies
echo   8. Exit
echo.
echo ============================================================================
set /p CHOICE="Enter your choice (1-8): "

if "%CHOICE%"=="1" goto SETUP
if "%CHOICE%"=="2" goto ACTIVATE
if "%CHOICE%"=="3" goto VERIFY
if "%CHOICE%"=="4" goto CONFIGURE
if "%CHOICE%"=="5" goto TEST
if "%CHOICE%"=="6" goto ANALYZE
if "%CHOICE%"=="7" goto UPDATE
if "%CHOICE%"=="8" goto EXIT

echo.
echo Invalid choice. Please enter a number between 1 and 8.
timeout /t 2 >nul
goto MENU

:SETUP
cls
echo ============================================================================
echo Setup/Install
echo ============================================================================
echo.
echo Running setup script...
echo.
call setup.bat
if errorlevel 1 (
    echo.
    echo Setup failed. Press any key to return to menu...
    pause >nul
    goto MENU
)
echo.
echo Press any key to return to menu...
pause >nul
goto MENU

:ACTIVATE
cls
echo ============================================================================
echo Activate Environment
echo ============================================================================
echo.
if not exist "venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo Please run option 1 (Setup/Install) first.
    echo.
    echo Press any key to return to menu...
    pause >nul
    goto MENU
)
echo Activating virtual environment...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    echo.
    echo Press any key to return to menu...
    pause >nul
    goto MENU
)
echo.
echo Environment activated successfully!
echo.
echo Available commands:
echo   cad-ki --help       - Show all commands
echo   cad-ki verify       - Verify installation
echo   cad-ki configure    - Configure settings
echo   cad-ki analyze      - Analyze a model
echo   exit                - Return to menu
echo.
cmd /k "echo. & echo Type 'exit' to return to the development menu & echo."
goto MENU

:VERIFY
cls
echo ============================================================================
echo Verify Installation
echo ============================================================================
echo.
if not exist "venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo Please run option 1 (Setup/Install) first.
    echo.
    echo Press any key to return to menu...
    pause >nul
    goto MENU
)
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    echo.
    echo Press any key to return to menu...
    pause >nul
    goto MENU
)
echo Running verification...
echo.
cad-ki verify
if errorlevel 1 (
    echo.
    echo Verification failed.
) else (
    echo.
    echo Verification successful!
)
echo.
echo Press any key to return to menu...
pause >nul
goto MENU

:CONFIGURE
cls
echo ============================================================================
echo Configure NX Path
echo ============================================================================
echo.
if not exist "venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo Please run option 1 (Setup/Install) first.
    echo.
    echo Press any key to return to menu...
    pause >nul
    goto MENU
)
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    echo.
    echo Press any key to return to menu...
    pause >nul
    goto MENU
)
echo Please enter the path to your NX installation.
echo Default: C:\Program Files\Siemens\NX2406
echo.
set /p NX_PATH="NX Path (press Enter for default): "
if "%NX_PATH%"=="" (
    set "NX_PATH=C:\Program Files\Siemens\NX2406"
    echo Using default path: %NX_PATH%
)
echo.
echo Configuring CAD-KI...
cad-ki configure --nx-path "%NX_PATH%"
if errorlevel 1 (
    echo.
    echo Configuration failed.
) else (
    echo.
    echo Configuration successful!
)
echo.
echo Press any key to return to menu...
pause >nul
goto MENU

:TEST
cls
echo ============================================================================
echo Run Tests
echo ============================================================================
echo.
if not exist "venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo Please run option 1 (Setup/Install) first.
    echo.
    echo Press any key to return to menu...
    pause >nul
    goto MENU
)
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    echo.
    echo Press any key to return to menu...
    pause >nul
    goto MENU
)
echo Running pytest...
echo.
pytest
if errorlevel 1 (
    echo.
    echo Some tests failed. Review the output above.
) else (
    echo.
    echo All tests passed!
)
echo.
echo Press any key to return to menu...
pause >nul
goto MENU

:ANALYZE
cls
echo ============================================================================
echo Analyze a Model
echo ============================================================================
echo.
if not exist "venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo Please run option 1 (Setup/Install) first.
    echo.
    echo Press any key to return to menu...
    pause >nul
    goto MENU
)
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    echo.
    echo Press any key to return to menu...
    pause >nul
    goto MENU
)
echo Please enter the path to the model file you want to analyze.
echo.
set /p MODEL_FILE="Model file path: "
if "%MODEL_FILE%"=="" (
    echo No file specified.
    echo.
    echo Press any key to return to menu...
    pause >nul
    goto MENU
)
if not exist "%MODEL_FILE%" (
    echo ERROR: File not found: %MODEL_FILE%
    echo.
    echo Press any key to return to menu...
    pause >nul
    goto MENU
)
echo.
echo Analyzing model...
echo.
cad-ki analyze "%MODEL_FILE%" --visualize
if errorlevel 1 (
    echo.
    echo Analysis failed.
) else (
    echo.
    echo Analysis complete!
)
echo.
echo Press any key to return to menu...
pause >nul
goto MENU

:UPDATE
cls
echo ============================================================================
echo Update Dependencies
echo ============================================================================
echo.
if not exist "venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo Please run option 1 (Setup/Install) first.
    echo.
    echo Press any key to return to menu...
    pause >nul
    goto MENU
)
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    echo.
    echo Press any key to return to menu...
    pause >nul
    goto MENU
)
echo Upgrading pip...
python -m pip install --upgrade pip
if errorlevel 1 (
    echo WARNING: Failed to upgrade pip
)
echo.
echo Updating CAD-KI and dependencies...
if exist "setup.py" (
    pip install -e . --upgrade
) else if exist "pyproject.toml" (
    pip install -e . --upgrade
) else if exist "requirements.txt" (
    pip install -r requirements.txt --upgrade
) else (
    echo ERROR: No setup.py, pyproject.toml, or requirements.txt found
    echo.
    echo Press any key to return to menu...
    pause >nul
    goto MENU
)
if errorlevel 1 (
    echo.
    echo Update failed.
) else (
    echo.
    echo Dependencies updated successfully!
)
echo.
echo Press any key to return to menu...
pause >nul
goto MENU

:EXIT
cls
echo.
echo Exiting CAD-KI Development Menu...
echo.
exit /b 0
