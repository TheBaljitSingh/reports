@echo off
echo Starting NGO Reports Management System...

echo Starting backend server...
cd server
call npm install
start "Backend Server" cmd /k "npm start"

timeout /t 3 /nobreak > nul

echo Starting frontend...
cd ..\frontend
call npm install
start "Frontend Server" cmd /k "npm start"

echo Application started!
echo Frontend: http://localhost:3001
echo Backend: http://localhost:3000
echo.
echo Make sure Redis and MongoDB are running!
pause
