CREATE DATABASE IF NOT EXISTS ctf_db;
USE ctf_db;

CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,  
  username VARCHAR(50) NOT NULL UNIQUE,         
  password_hash VARCHAR(70) NOT NULL,     
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);


CREATE TABLE challenges (
  challenge_id INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(30) NOT NULL,                  
  description TEXT,
  difficulty VARCHAR(10),                            
  points INT NOT NULL,                         
  flag VARCHAR(50) NOT NULL UNIQUE,
  time TIME DEFAULT NULL,
  hint VARCHAR(125)
);


CREATE TABLE IF NOT EXISTS submissions (
  submission_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  challenge_id INT,
  flag_submitted VARCHAR(50),
  is_correct BOOLEAN,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (challenge_id) REFERENCES challenges(challenge_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_scores (
  user_id INT,                                 
  challenge_id INT,                            
  score INT NOT NULL,                          
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  PRIMARY KEY (user_id, challenge_id),         
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,   
  FOREIGN KEY (challenge_id) REFERENCES challenges(challenge_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS challenge_status (
  challenge_id INT,                             
  user_id INT,                                 
  start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP,                           
  status VARCHAR(10),                          
  PRIMARY KEY (challenge_id, user_id),          
  FOREIGN KEY (challenge_id) REFERENCES challenges(challenge_id) ON DELETE CASCADE,  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE  
);

CREATE OR REPLACE VIEW leaderboard AS
SELECT u.username, SUM(s.score) AS total_score
FROM user_scores s
JOIN users u ON s.user_id = u.user_id
GROUP BY u.username
ORDER BY total_score DESC;

INSERT INTO challenges (name, description, points, flag, difficulty, time)
VALUES 
('Basic Password Search', 'The basic challenge of finding the correct password account is hidden inside the sources to help players understand how to find the flag.', 20, 'CTF{hihi}', 'easy', 10),
('Network Log Investigation', 'This challenge is about finding flags in the network, players need to understand the network part as well as how to check logs.', 30, 'CTF{Say_goodbye}', 'easy', 10),
('Bypass', 'The web application uses default credentials, which are easy to guess. Players have to find them out and login to get the flag.', 20, 'CTF{security_default_credentials}', 'easy', 10),
('Access Management', 'This challenge requires changing access rights from user to admin (additional upgrades require bypassing verification, and increases the difficulty to reach hard level).', 50, 'CTF{admin_flag}', 'medium', 20),
('Bypass2', 'The challenge requires bypassing through multiple stages to get the flag.', 50, 'CTF{multiple_bypass_success}', 'medium', 20);
INSERT INTO users (username, password_hash) 
VALUES 
('Lan', 'hashed_password1'),
('Linh', 'hashed_password2'),
('Bao', 'hashed_password3');

INSERT INTO submissions (user_id, challenge_id, flag_submitted, is_correct) 
VALUES 
(1, 1, 'CTF{hihi}', TRUE),          
(2, 2, 'CTF{Say_goodbye}', TRUE),   
(3, 1, 'CTF{hihi}', TRUE),          
(3, 2, 'CTF{Say_goodbye}', TRUE);   

INSERT INTO user_scores (user_id, challenge_id, score) 
VALUES 
(1, 1, 20),  
(2, 2, 30),  
(3, 1, 20),  
(3, 2, 30); 

