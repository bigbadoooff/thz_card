# Windows Batch Scripts for CAD-KI

This directory contains a set of Windows batch scripts that simplify the CAD-KI setup and daily usage workflow. These scripts eliminate the need to manually activate virtual environments and run commands, and they work around PowerShell execution policy issues common in corporate environments.

## Available Scripts

### 1. `setup.bat` - First-time Setup
**Purpose**: Initial installation and setup of CAD-KI environment.

**Usage**: 
```cmd
setup.bat
```
or simply double-click the file.

**What it does**:
- Checks if Python is installed
- Creates a Python virtual environment (if it doesn't exist)
- Activates the virtual environment
- Upgrades pip to the latest version
- Installs CAD-KI and all dependencies using `pip install -e .`
- Provides feedback at each step
- Handles errors gracefully

**When to use**: Run this once when first setting up CAD-KI, or when you need to recreate your environment.

---

### 2. `run.bat` - Daily Use Script
**Purpose**: Quickly start an interactive CAD-KI session.

**Usage**: 
```cmd
run.bat
```
or simply double-click the file.

**What it does**:
- Activates the virtual environment
- Displays available CAD-KI commands
- Opens an interactive command prompt with the environment activated
- Keeps the session open for you to run multiple commands

**When to use**: This is your go-to script for daily use. Double-click it whenever you want to work with CAD-KI.

---

### 3. `verify.bat` - Quick Verification
**Purpose**: Verify that CAD-KI is installed and working correctly.

**Usage**: 
```cmd
verify.bat
```
or simply double-click the file.

**What it does**:
- Activates the virtual environment
- Runs `cad-ki verify` command
- Displays the results
- Pauses so you can review the output

**When to use**: After installation or when troubleshooting issues.

---

### 4. `configure_nx.bat` - NX Configuration
**Purpose**: Configure the path to your NX installation.

**Usage**: 
```cmd
configure_nx.bat
```
or simply double-click the file.

**What it does**:
- Activates the virtual environment
- Prompts you for your NX installation path
- Provides a default path: `C:\Program Files\Siemens\NX2406`
- Runs `cad-ki configure --nx-path` with the provided path
- Handles paths with spaces correctly

**When to use**: When setting up NX integration or changing your NX version.

---

### 5. `analyze.bat` - Analyze Model
**Purpose**: Analyze a CAD model file with visualization.

**Usage**: 
```cmd
analyze.bat "path\to\model.prt"
```
or drag and drop a model file onto the script.

**What it does**:
- Accepts a model file path as a command-line argument
- Activates the virtual environment
- Runs `cad-ki analyze` with the provided file and `--visualize` flag
- Shows usage instructions if no file is provided
- Handles paths with spaces correctly

**When to use**: When you want to analyze a specific CAD model file.

**Examples**:
```cmd
analyze.bat "C:\Projects\MyModel.prt"
analyze.bat "C:\Users\John Doe\Documents\CAD Files\part123.prt"
```

---

### 6. `dev.bat` - Interactive Development Menu
**Purpose**: Comprehensive development menu for all CAD-KI operations.

**Usage**: 
```cmd
dev.bat
```
or simply double-click the file.

**What it does**:
Provides an interactive menu with the following options:
1. **Setup/Install** - Run first-time setup or reinstall
2. **Activate environment only** - Open interactive session
3. **Verify installation** - Check if everything is working
4. **Configure NX path** - Set up NX integration
5. **Run tests (pytest)** - Execute test suite
6. **Analyze a model** - Analyze a CAD file with prompt
7. **Update dependencies** - Upgrade CAD-KI and dependencies
8. **Exit** - Close the menu

The menu loops until you choose to exit.

**When to use**: Perfect for developers or power users who want quick access to all CAD-KI functions.

---

## Quick Start Guide

### For First-Time Users:

1. **Double-click `setup.bat`**
   - Wait for the installation to complete
   - You should see "Setup Complete!" when done

2. **Double-click `verify.bat`**
   - Verify that everything is working correctly

3. **Double-click `configure_nx.bat`** (if using NX)
   - Enter your NX installation path or press Enter for the default

4. **Double-click `run.bat`** for daily use
   - This opens an interactive session where you can run any CAD-KI command

### For Daily Use:

- **Double-click `run.bat`** to start working with CAD-KI
- **Drag and drop** CAD files onto `analyze.bat` for quick analysis
- **Use `dev.bat`** if you prefer a menu-driven interface

---

## Technical Details

### Virtual Environment Activation
All scripts use `call venv\Scripts\activate.bat` to activate the Python virtual environment. This approach:
- Works without admin rights
- Bypasses PowerShell execution policy restrictions
- Is compatible with all Windows versions

### Error Handling
Each script includes:
- Checks for virtual environment existence
- Python installation verification
- Proper error level checks
- Clear error messages
- Graceful failure handling

### Path Handling
All scripts properly handle:
- Paths with spaces (using quotes)
- Relative and absolute paths
- User input validation
- File existence checks

### Exit Codes
Scripts return appropriate exit codes:
- `0` - Success
- `1` - Error occurred

---

## Troubleshooting

### "Python is not installed or not in PATH"
- Install Python 3.8 or higher from [python.org](https://www.python.org/downloads/)
- During installation, check "Add Python to PATH"

### "Virtual environment not found"
- Run `setup.bat` first to create the virtual environment

### "Failed to install CAD-KI"
- Ensure you have a `setup.py`, `pyproject.toml`, or `requirements.txt` file
- Check that you're in the correct directory
- Verify your internet connection (for downloading packages)

### Scripts open and close immediately
- Right-click the script and select "Edit" to see what's happening
- The scripts include `pause` commands, so if they're closing, there may be a syntax error

### Need to see more details
- Open Command Prompt
- Navigate to the directory: `cd path\to\cad-ki`
- Run the script: `setup.bat` (or whichever script you need)
- You'll see all output in the terminal

---

## Requirements

- **Windows**: Windows 7 or later
- **Python**: Python 3.8 or higher
- **Permissions**: No admin rights required
- **Internet**: Required for initial setup (downloading packages)

---

## Customization

All scripts are well-commented and can be easily customized:
- Open any `.bat` file in a text editor
- Modify paths, default values, or commands as needed
- Comments explain each section of the script

---

## Support

For issues, questions, or suggestions:
- Check the main CAD-KI documentation
- Review error messages carefully
- Ensure Python is installed and in PATH
- Verify you're in the correct directory

---

## License

These scripts are provided as utilities for CAD-KI and follow the same license as the main project.
