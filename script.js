// Road Safety Awareness Platform - Static JS
// Beginner-friendly, no backend required.

// Dummy users for login
const DUMMY_USERS = [
  { username: 'student', password: 'password123' },
  { username: 'admin', password: 'admin123' }
];

// Quiz questions stored in JS
const QUIZ_QUESTIONS = [
  {
    question: 'What does a red traffic light mean?',
    options: ['Go', 'Stop', 'Slow down', 'Turn right'],
    correct: 'Stop'
  },
  {
    question: 'What is the safe following distance rule?',
    options: ['1-second rule', '2-second rule', '3-second rule', 'No rule'],
    correct: '3-second rule'
  },
  {
    question: 'What should you do at a zebra crossing?',
    options: ['Speed up', 'Give way to pedestrians', 'Honk and pass', 'Ignore it'],
    correct: 'Give way to pedestrians'
  },
  {
    question: 'When should you wear a seatbelt?',
    options: ['Only on highways', 'Always', 'Only at night', 'Never'],
    correct: 'Always'
  },
  {
    question: 'What does a yellow traffic light mean?',
    options: ['Go faster', 'Prepare to stop', 'Turn left', 'Park here'],
    correct: 'Prepare to stop'
  }
];

// LocalStorage helpers for auth and reports
const STORAGE_KEYS = {
  USER: 'rs_user',
  REPORTS: 'rs_reports'
};

function saveUser(username) {
  localStorage.setItem(STORAGE_KEYS.USER, username);
}

function getUser() {
  return localStorage.getItem(STORAGE_KEYS.USER);
}

function clearUser() {
  localStorage.removeItem(STORAGE_KEYS.USER);
}

function getReports() {
  const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
  return data ? JSON.parse(data) : [];
}

function saveReports(reports) {
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
}

// Auth utilities
function requireAuth() {
  const user = getUser();
  if (!user) {
    window.location.href = 'login.html';
  }
}

function handleLogout() {
  clearUser();
  window.location.href = 'login.html';
}

// Login handler
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorBox = document.getElementById('login-error');

  const isValid = DUMMY_USERS.some(
    (u) => u.username === username && u.password === password
  );

  if (isValid) {
    saveUser(username);
    window.location.href = 'dashboard.html';
  } else {
    errorBox.textContent = 'Invalid username or password. Try student/password123';
    errorBox.style.display = 'block';
  }
}

// Populate dashboard welcome message
function populateWelcome() {
  const user = getUser();
  const target = document.getElementById('welcome-user');
  if (target && user) {
    target.textContent = user;
  }
}

// Render quiz questions
function renderQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  QUIZ_QUESTIONS.forEach((q, idx) => {
    const block = document.createElement('div');
    block.className = 'quiz-question';

    const title = document.createElement('h3');
    title.textContent = `Q${idx + 1}. ${q.question}`;

    const optionsWrap = document.createElement('div');
    optionsWrap.className = 'quiz-options';

    q.options.forEach((opt) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${idx}`;
      input.value = opt;
      input.required = true;
      label.appendChild(input);
      label.appendChild(document.createTextNode(' ' + opt));
      optionsWrap.appendChild(label);
    });

    block.appendChild(title);
    block.appendChild(optionsWrap);
    container.appendChild(block);
  });
}

// Handle quiz submit
function handleQuizSubmit(event) {
  event.preventDefault();
  let score = 0;

  QUIZ_QUESTIONS.forEach((q, idx) => {
    const answer = document.querySelector(`input[name="q${idx}"]:checked`);
    if (answer && answer.value === q.correct) {
      score += 1;
    }
  });

  const resultBox = document.getElementById('quiz-result');
  resultBox.textContent = `Your score: ${score} / ${QUIZ_QUESTIONS.length}`;
  resultBox.classList.add('alert');
}

// Handle report submission
function handleReportSubmit(event) {
  event.preventDefault();
  const issueType = document.getElementById('issue_type').value.trim();
  const location = document.getElementById('location').value.trim();
  const description = document.getElementById('description').value.trim();

  const reports = getReports();
  reports.push({ issueType, location, description, createdAt: new Date().toISOString() });
  saveReports(reports);

  alert('Report submitted successfully!');
  event.target.reset();
}

// Load reports into admin table
function loadReportsTable() {
  const tbody = document.getElementById('reports-table-body');
  if (!tbody) return;

  const reports = getReports();
  tbody.innerHTML = '';

  if (reports.length === 0) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 4;
    cell.textContent = 'No reports yet.';
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  reports.forEach((r, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${idx + 1}</td>
      <td>${r.issueType}</td>
      <td>${r.location}</td>
      <td>${r.description}</td>
    `;
    tbody.appendChild(row);
  });
}

// Wire up page-specific logic on load
window.addEventListener('DOMContentLoaded', () => {
  // Logout buttons
  document.querySelectorAll('[data-logout]').forEach((btn) => {
    btn.addEventListener('click', handleLogout);
  });

  // Login page
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    document.getElementById('login-error').style.display = 'none';
    loginForm.addEventListener('submit', handleLogin);
  }

  // Protected pages
  const requiresAuth = document.body.dataset.auth === 'true';
  if (requiresAuth) {
    requireAuth();
    populateWelcome();
  }

  // Quiz page
  const quizForm = document.getElementById('quiz-form');
  if (quizForm) {
    renderQuiz();
    quizForm.addEventListener('submit', handleQuizSubmit);
  }

  // Report page
  const reportForm = document.getElementById('report-form');
  if (reportForm) {
    reportForm.addEventListener('submit', handleReportSubmit);
  }

  // Admin page
  if (document.getElementById('reports-table-body')) {
    loadReportsTable();
  }
});
