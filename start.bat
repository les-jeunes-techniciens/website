@echo off
setlocal
cd /d "%~dp0"

rem Detect available package manager: pnpm -> yarn -> npm
where pnpm >nul 2>&1
if %ERRORLEVEL%==0 (
	set "PKG=pnpm"
) else (
	where yarn >nul 2>&1
	if %ERRORLEVEL%==0 (
		set "PKG=yarn"
	) else (
		set "PKG=npm"
	)
)

rem Ensure Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
	echo.
	echo ERROR: Node.js is not installed or not in PATH.
	echo Please install Node.js (v16+) from https://nodejs.org/ and rerun this script.
	echo.
	pause
	exit /b 1
)

rem Parse command argument: install | dev | build | preview | clean
set "ACTION=%~1"
if "%ACTION%"=="" set "ACTION=dev"

if /I "%ACTION%"=="install" (
	echo Installing dependencies with %PKG%...
	%PKG% install
	exit /b %ERRORLEVEL%
)

if /I "%ACTION%"=="clean" (
	echo Removing node_modules and lock files...
	if exist node_modules rd /s /q node_modules
	if exist package-lock.json del /f /q package-lock.json
	if exist pnpm-lock.yaml del /f /q pnpm-lock.yaml
	if exist yarn.lock del /f /q yarn.lock
	echo Clean complete.
	exit /b 0
)

if /I "%ACTION%"=="build" (
	echo Building project via %PKG%...
	%PKG% run build
	exit /b %ERRORLEVEL%
)

if /I "%ACTION%"=="preview" (
	echo Starting preview server via %PKG%...
	%PKG% run preview
	exit /b %ERRORLEVEL%
)

if /I "%ACTION%"=="dev" (
	rem Install dependencies if missing
	if not exist node_modules (
		echo node_modules not found — installing with %PKG%...
		%PKG% install
		if %ERRORLEVEL% NEQ 0 (
			echo Dependency install failed. Aborting.
			exit /b %ERRORLEVEL%
		)
	)

	echo Starting development server via %PKG%...
	%PKG% run dev
	exit /b %ERRORLEVEL%
)

echo Unknown action: %ACTION%
echo Usage: start.bat [dev|install|build|preview|clean]
exit /b 2
