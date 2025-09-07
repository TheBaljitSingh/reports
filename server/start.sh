#!/bin/bash

echo "Starting NGO Reports Management System..."

# Check if Redis is running
if ! pgrep -x "redis-server" > /dev/null; then
    echo "Starting Redis server..."
    redis-server --daemonize yes
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "Starting MongoDB..."
    mongod --fork --logpath /var/log/mongodb.log
fi

# Start backend
echo "Starting backend server..."
cd server
npm install
npm start &

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "Starting frontend..."
cd ../frontend
npm install
npm start

echo "Application started!"
echo "Frontend: http://localhost:3001"
echo "Backend: http://localhost:3000"
