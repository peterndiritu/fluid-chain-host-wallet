#!/data/data/com.termux/files/usr/bin/bash

# Path to your project (optional if running in project folder)
PROJECT_DIR=$(pwd)

cd $PROJECT_DIR

echo "Starting auto dev server with git pull watcher..."

while true; do
    echo "Pulling latest changes..."
    git pull

    echo "Starting dev server..."
    # Replace with your dev command (Next.js / Vite)
    npm run dev

    echo "Dev server stopped. Waiting 3s before next pull..."
    sleep 3
done
