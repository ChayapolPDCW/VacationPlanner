
--- USER TABLE

CREATE TABLE IF NOT EXISTS usersdb (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE travel_plans (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES usersdb(id),
    title VARCHAR(255) NOT NULL,
    start_location VARCHAR(255) NOT NULL,
    end_location VARCHAR(255) NOT NULL,
    startPlan_date TIMESTAMP NOT NULL,
    endPlan_date TIMESTAMP,
    duration INTERVAL NOT NULL,
    weather_info TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
