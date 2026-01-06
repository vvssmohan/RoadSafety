from flask import Flask, render_template, request, redirect, url_for, session
import json
import os


app = Flask(__name__)
app.secret_key = 'simple_secret_key_for_students'  


USERS = {
    'student': 'password123',
    'admin': 'admin123'
}


reported_issues = []


def load_questions():

    json_path = os.path.join(os.path.dirname(__file__), 'questions.json')
    try:
        with open(json_path, 'r') as file:
            data = json.load(file)
            return data['quiz_questions']
    except FileNotFoundError:
        
        return [
            {
                'question': 'What does a red traffic light mean?',
                'options': ['Go', 'Stop', 'Slow down', 'Turn right'],
                'correct': 'Stop'
            }
        ]


QUIZ_QUESTIONS = load_questions()



@app.route('/')
def home():
    """Display home page with basic road safety rules"""
    return render_template('home.html')



@app.route('/login', methods=['GET', 'POST'])
def login():
    """Handle user login"""
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        # Check if username and password match
        if username in USERS and USERS[username] == password:
            session['username'] = username  # Store username in session
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', error='Invalid username or password')
    
    return render_template('login.html')


# LOGOUT - Clear session and redirect to home
@app.route('/logout')
def logout():
    """Handle user logout"""
    session.pop('username', None)  # Remove username from session
    return redirect(url_for('home'))


# DASHBOARD - Main page after login
@app.route('/dashboard')
def dashboard():
    """Display dashboard with navigation links"""
    if 'username' not in session:
        return redirect(url_for('login'))
    
    return render_template('dashboard.html', username=session['username'])


# LEARNING PAGE - Display road safety rules
@app.route('/learn')
def learn():
    """Display road safety learning page"""
    if 'username' not in session:
        return redirect(url_for('login'))
    
    return render_template('learn.html')


# QUIZ PAGE - Display quiz and calculate score
@app.route('/quiz', methods=['GET', 'POST'])
def quiz():
    """Handle quiz display and submission"""
    if 'username' not in session:
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        # Calculate score
        score = 0
        total = len(QUIZ_QUESTIONS)
        
        for i in range(total):
            user_answer = request.form.get(f'question{i}')
            correct_answer = QUIZ_QUESTIONS[i]['correct']
            print(f"Question {i}: User={user_answer}, Correct={correct_answer}")
            if user_answer == correct_answer:
                score += 1
        
        print(f"Final Score: {score}/{total}")
        return render_template('quiz.html', 
                             questions=QUIZ_QUESTIONS, 
                             submitted=True, 
                             score=score, 
                             total=total)
    
    return render_template('quiz.html', questions=QUIZ_QUESTIONS, submitted=False)



@app.route('/report', methods=['GET', 'POST'])
def report():
    """Handle issue reporting"""
    if 'username' not in session:
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        # Get form data
        issue_type = request.form.get('issue_type')
        location = request.form.get('location')
        description = request.form.get('description')
        
        # Store issue in list
        issue = {
            'type': issue_type,
            'location': location,
            'description': description,
            'reported_by': session['username']
        }
        reported_issues.append(issue)
        
        return render_template('report.html', success=True)
    
    return render_template('report.html', success=False)


# ADMIN PAGE - View all reported issues
@app.route('/admin')
def admin():
    """Display all reported issues"""
    if 'username' not in session:
        return redirect(url_for('login'))
    
    return render_template('admin.html', issues=reported_issues)


# Run the Flask app
if __name__ == '__main__':
    print("=" * 50)
    print("Road Safety Awareness Platform")
    print("=" * 50)
    print("\nDefault Login Credentials:")
    print("Username: student | Password: password123")
    print("Username: admin   | Password: admin123")
    print("\nServer starting at http://127.0.0.1:5000")
    print("=" * 50)
    app.run(debug=True)
