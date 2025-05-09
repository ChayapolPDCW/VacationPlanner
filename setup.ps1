# setup.ps1

# Copy root .env file
Copy-Item ".env.sample" ".env"

# If successful, copy backend .env
if ($?) {
    Copy-Item "backend/.env.sample" "backend/.env"
}

# If successful, copy frontend .env
if ($?) {
    Copy-Item "frontend/.env.sample" "frontend/.env"
}
