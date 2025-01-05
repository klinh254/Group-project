
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const challengeId = urlParams.get('id');

    if (challengeId) {
        fetchChallengeDetails(challengeId);
    } else {
        alert('No challenge ID specified.');
        document.getElementById('challenge-info').innerHTML = '<p>No challenge selected.</p>';
    }
});


function fetchChallengeDetails(id) {
    fetch(`../../backend/get_challenge.php?id=${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                displayError(data.error);
            } else {
                displayChallenge(data);
            }
        })
        .catch(error => {
            console.error('Error fetching challenge details:', error);
            displayError('Failed to fetch challenge details. Please try again later.');
        });
}

function displayChallenge(challenge) {
    const challengeInfoDiv = document.getElementById('challenge-info');
    challengeInfoDiv.innerHTML = `
        <h2>${challenge.name}</h2>
        <p><strong>Description:</strong> ${challenge.description}</p>
        <p><strong>Difficulty:</strong> ${challenge.difficulty}</p>
    `;
}

function displayError(message) {
    const challengeInfoDiv = document.getElementById('challenge-info');
    challengeInfoDiv.innerHTML = `<p class="error">${message}</p>`;
}
































document.addEventListener('DOMContentLoaded', () => {
    // Tìm nút launch-button
    const launchButton = document.getElementById('launch-button');

    // Lấy challengeId từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const challengeId = urlParams.get('id');

    console.log('Challenge ID on DOMContentLoaded:', challengeId);

    // Đảm bảo chỉ gắn sự kiện nếu nút tồn tại
    if (launchButton) {
        // Xóa mọi sự kiện click trước đó
        launchButton.replaceWith(launchButton.cloneNode(true));
        const newLaunchButton = document.getElementById('launch-button');

        // Gắn sự kiện mới
        newLaunchButton.addEventListener('click', (event) => {
            event.preventDefault(); // Ngăn chặn hành động mặc định nếu trong form
            if (!challengeId) {
                alert('Challenge ID is missing!');
                return;
            }
            launchChallenge(challengeId);
        });
    }
});

function launchChallenge(challengeId) {
    let url;

    // Log để kiểm tra giá trị truyền vào
    console.log('Launching Challenge ID:', challengeId);

    // Xác định URL dựa trên challengeId
    if (challengeId === '1') {
        url = '../../CTF_challenge/CTF1/login.html';
    } else if (challengeId === '2') {
        url = '../../CTF_challenge/CTF2/start.html';
    } else if (challengeId === '3') {
        url = '../../CTF_challenge/CTF3/login.html';
    } else if (challengeId === '4') {
        url = 'http://localhost:1004/login.html';
    } else if (challengeId === '5') {
        url = 'http://localhost:1005/login.html';
    } else {
        alert('Challenge not found.');
        return;
    }

    // Mở URL trong tab mới
    window.open(url, '_blank');
}














function submitFlag() {
    const flagInput = document.getElementById('flag').value;
    const message = document.getElementById('flag-message');
    
    const urlParams = new URLSearchParams(window.location.search);
    const challengeId = urlParams.get('id');

    if (flagInput.trim() === '') {
        message.textContent = 'Please enter a flag.';
        message.style.color = 'red';
    } else {
        fetch('../../../backend/check_flag.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id=${encodeURIComponent(challengeId)}&flag=${encodeURIComponent(flagInput)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                message.textContent = data.message;
                message.style.color = 'green';

                setTimeout(() => {
                    window.location.href = '../Challenges/challenge.html';
                }, 2000); 
            } else {
                message.textContent = data.message;
                message.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error checking flag:', error);
            message.textContent = 'An error occurred while checking the flag.';
            message.style.color = 'red';
        });
    }
}

