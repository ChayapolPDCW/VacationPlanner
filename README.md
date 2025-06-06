# VacationPlanner

VacationPlanner is a web application for planning trips, sharing travel plans with others, and recording your travel experiences in a journal format.

## Main Features

- User registration and authentication
- Create, edit, and delete travel plans
- Add daily destinations to each plan with photos and notes
- Bookmark and like other users' travel plans
- Create journals to record experiences and upload photos after trips
- View popular plans and bookmarked plans
- Edit profile and upload profile pictures

## Project Structure

```
VacationPlanner/
├── backend/         # Server-side code (Node.js, Express, Prisma)
├── frontend/        # Client-side code (Next.js, React)
├── public/          # Public files such as images
├── uploads/         # Uploaded files (profile pictures, plan images, etc.)
├── compose.yaml     # Docker Compose for running the whole system
└── README.md
```

## Installation and Running the Project

### 1. Clone the Repository

```sh
git clone <repo-url>
cd VacationPlanner
```

### 2. Set up Environment Variables

- Copy the `.env.sample` file to `.env` in both `backend/` and `frontend/`.
- Edit the `.env` files to match your environment (e.g., `DATABASE_URL`, `SESSION_SECRET`, etc.).
- **Important:** You must provide your own Google OAuth credentials:
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`

### 3. Install Dependencies

#### Backend

```sh
cd backend
npm install
```

#### Frontend

```sh
cd ../frontend
npm install
```

### 4. Set up the Database and Run Prisma Migration

```sh
cd ../backend
npx prisma migrate dev
```

### 5. Run the Project

#### Separate (Dev Mode)

- Backend:  
  ```sh
  cd backend
  npm run dev
  ```
- Frontend:  
  ```sh
  cd frontend
  npm run dev
  ```

#### Or run with Docker Compose

```sh
docker compose up --build
```

## Usage

- Sign up or log in
- Create new travel plans and add daily destinations
- Share or bookmark other users' plans
- After your trip, create a journal and upload photos
- Edit your profile and change your profile picture

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express.js, Prisma ORM
- **Database:** PostgreSQL, Dbeaver
- **Authentication:** express-session, JWT
- **File Upload:** Multer
- **Others:** Docker, Redis (for session management)

## Contributors

- [Your Name]
- [Other Contributors]

---

> Developed for learning and practicing Fullstack Web Development