DROP DATABASE IF EXISTS tasktastic;
CREATE DATABASE tasktastic;
\c tasktastic

-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(100) NOT NULL,
--     password VARCHAR(100) NOT NULL,
--     created_at TIMESTAMP DEFAULT NOW(),
--     updated_at TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TABLE todos (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     description TEXT NOT NULL,
--     user_id INT NOT NULL,
--     is_completed BOOLEAN DEFAULT false,
--     created_at TIMESTAMP DEFAULT NOW(),
--     updated_at TIMESTAMP DEFAULT NOW()
-- );