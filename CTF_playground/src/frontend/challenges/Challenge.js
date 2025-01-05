// Fetch and display all challenges
function fetchChallenges() {
    fetch('../../../backend/challenge.php')
        .then(response => response.json())
        .then(challenges => {
            const challengeList = document.getElementById('challenge-list');
            challengeList.innerHTML = '';

            challenges.forEach(challenge => {
                const card = document.createElement('div');
                card.className = 'challenge-card';
                card.innerHTML = `
                    <h3 class="challenge-title">${challenge.name}</h3>
                    <p class="difficulty">${challenge.difficulty}</p>
                `;

                // Redirect to the challenge page with the correct ID
                card.addEventListener('click', () => {
                    window.location.href = `../do_challenges/Do_Challenge.html?id=${challenge.challenge_id}`;
                });

                challengeList.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching challenges:', error));
}

// Fetch and display leaderboard
function fetchLeaderboard() {
    fetch('../../../backend/leaderboard.php')
        .then(response => response.json())
        .then(leaderboard => {
            const leaderboardBody = document.getElementById('leaderboard-body');
            leaderboardBody.innerHTML = '';

            leaderboard.forEach((entry, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${entry.username}</td>
                    <td>${entry.total_score}</td>
                `;
                leaderboardBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching leaderboard:', error));
}

// Toggle sidebar functionality
function initializeSidebarToggle() {
    const optionsIcon = document.getElementById('optionsIcon');
    const sidebar = document.getElementById('sidebar');

    // Toggle sidebar on click
    optionsIcon.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Hide sidebar when clicking outside
    document.addEventListener('click', (event) => {
        if (!sidebar.contains(event.target) && !optionsIcon.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Add event listener for the logout button
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        alert('You have been logged out.');
        // Add logout functionality here, if needed
    });
}

// Show challenges based on difficulty
function showChallengesAndLeaderboard(difficulty) {
    const challengeTitle = document.getElementById('challenge-title');
    const challengeSubtitle = document.getElementById('challenge-subtitle');

    // Update titles dynamically
    if (difficulty === 'all') {
        challengeTitle.innerText = 'All Challenges';
        challengeSubtitle.innerText = 'Here are all available challenges:';
    } else {
        challengeTitle.innerText = `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Challenges`;
        challengeSubtitle.innerText = `Here are the ${difficulty} challenges:`;
    }

    // Fetch challenges and filter them based on difficulty
    fetch('../../../backend/challenge.php')
        .then(response => response.json())
        .then(challenges => {
            const challengeList = document.getElementById('challenge-list');
            challengeList.innerHTML = '';

            // Filter challenges
            const filteredChallenges = difficulty === 'all'
                ? challenges // Show all challenges if "all" is selected
                : challenges.filter(challenge => challenge.difficulty.toLowerCase() === difficulty.toLowerCase());

            filteredChallenges.forEach(challenge => {
                const card = document.createElement('div');
                card.className = 'challenge-card';
                card.innerHTML = `
                    <h3 class="challenge-title">${challenge.name}</h3>
                    <p class="difficulty">${challenge.difficulty}</p>
                `;

                // Redirect to the challenge page with the correct ID
                card.addEventListener('click', () => {
                    window.location.href = `../do_challenges/Do_Challenge.html?id=${challenge.challenge_id}`;
                });

                challengeList.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching challenges:', error));
}

// Initialize all functionalities on page load
window.onload = function () {
    showChallengesAndLeaderboard('all'); // Show all challenges initially
    fetchLeaderboard();
    initializeSidebarToggle();
};