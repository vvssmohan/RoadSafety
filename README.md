# 🚦 Road Safety Awareness Platform

A simple Flask-based web application for learning road safety rules, taking quizzes, and reporting unsafe road conditions.

## 📋 Project Overview

This is a beginner-friendly project designed for students to understand Flask web development. The application includes:
- User login system (simple, no encryption)
- Learning page with road safety rules
- Interactive quiz with 5 questions
- Issue reporting system
- Admin panel to view reports

## 🛠️ Tech Stack

- **Backend:** Python Flask
- **Frontend:** HTML, CSS
- **Storage:** In-memory Python lists (no database required)

## 📁 Project Structure

```
Backend/
│
├── app.py                 # Main Flask application
├── templates/             # HTML templates
│   ├── home.html         # Landing page
│   ├── login.html        # Login page
│   ├── dashboard.html    # User dashboard
│   ├── learn.html        # Learning page
│   ├── quiz.html         # Quiz page
│   ├── report.html       # Report issue page
│   └── admin.html        # Admin panel
└── static/
    └── style.css         # CSS styling
```

## 🚀 How to Run the Project

### Step 1: Install Python
Make sure Python 3.7 or higher is installed on your system.
Check by running:
```bash
python --version
```

### Step 2: Install Flask
Open Command Prompt or Terminal and run:
```bash
pip install flask
```

### Step 3: Navigate to Backend Folder
```bash
cd Backend
```

### Step 4: Run the Application
```bash
python app.py
```

### Step 5: Open in Browser
Open your web browser and go to:
```
http://127.0.0.1:5000
```

## 👤 Login Credentials

The application comes with two pre-configured users:

| Username | Password    | Purpose        |
|----------|-------------|----------------|
| student  | password123 | Regular user   |
| admin    | admin123    | Admin access   |

## ✨ Features

### 1. Home Page
- Displays project title and overview
- Shows 6 basic road safety rules
- Navigation links to login

### 2. User Login
- Simple login with username and password
- Session-based authentication
- Error messages for invalid credentials

### 3. Dashboard
- Welcome message with username
- Four main navigation cards:
  - Learn Road Safety
  - Take Quiz
  - Report Issue
  - View Reports
- Road safety statistics

### 4. Learning Page
- Traffic signal information (Red, Yellow, Green)
- Safety equipment guidelines
- Speed limits for different areas
- Pedestrian safety tips
- Driving best practices
- Emergency contact numbers

### 5. Quiz Page
- 5 multiple-choice questions about road safety
- Score calculation and percentage
- Performance feedback based on score:
  - Excellent: 80% and above
  - Good: 60-79%
  - Keep Learning: Below 60%
- Option to retake quiz

### 6. Report Issue Page
- Simple form with three fields:
  - Issue Type (dropdown with common road issues)
  - Location (text field)
  - Description (textarea)
- Success message after submission
- Tips for effective reporting

### 7. Admin Panel
- View all reported issues in a table
- Displays issue type, location, description, and reporter
- Shows total number of reports

## 📝 Code Explanation

### app.py
- **Flask Setup:** Creates Flask app with secret key for sessions
- **User Storage:** Dictionary with hardcoded usernames and passwords
- **Routes:** 
  - `/` - Home page
  - `/login` - Login handling
  - `/logout` - Logout and session clearing
  - `/dashboard` - Main dashboard
  - `/learn` - Learning content
  - `/quiz` - Quiz questions and scoring
  - `/report` - Issue reporting form
  - `/admin` - View all reports
- **Session Management:** Uses Flask sessions to track logged-in users
- **Data Storage:** Python list `reported_issues` stores all reports

### HTML Templates
- **Base Structure:** Each page has navbar, main content, and footer
- **Jinja2 Templating:** Uses `{{ }}` for variables and `{% %}` for logic
- **Forms:** POST method for login, quiz, and report forms
- **Conditional Rendering:** Shows different content based on user state

### CSS Styling
- **Simple Layout:** Uses flexbox and CSS grid
- **Color Scheme:** Blue (#3498db) as primary color
- **Responsive:** Works on different screen sizes
- **Card Design:** Clean white cards with shadows
- **Hover Effects:** Interactive buttons and links

## 🎓 Suitable For

- College lab assignments
- Final year projects
- Viva demonstrations
- Learning Flask basics
- Understanding web development concepts

## 🔧 Customization

### Adding More Quiz Questions
Edit the `QUIZ_QUESTIONS` list in `app.py`:
```python
QUIZ_QUESTIONS.append({
    'question': 'Your question here?',
    'options': ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    'correct': 'Option 1'
})
```

### Adding More Users
Edit the `USERS` dictionary in `app.py`:
```python
USERS = {
    'username': 'password',
    'newuser': 'newpassword'
}
```

### Changing Colors
Edit `style.css` and change color values:
```css
.btn-primary {
    background-color: #your-color;
}
```

## 📊 Features Summary

| Feature | Status | Complexity |
|---------|--------|------------|
| Home Page | ✅ Complete | Simple |
| Login System | ✅ Complete | Simple |
| Dashboard | ✅ Complete | Simple |
| Learning Page | ✅ Complete | Simple |
| Quiz System | ✅ Complete | Medium |
| Report Form | ✅ Complete | Simple |
| Admin Panel | ✅ Complete | Simple |

## 🐛 Troubleshooting

### Issue: Flask not found
**Solution:** Install Flask using `pip install flask`

### Issue: Port already in use
**Solution:** Either:
- Close the other application using port 5000
- Or change the port in app.py: `app.run(port=5001, debug=True)`

### Issue: Page not found (404)
**Solution:** Make sure you're running app.py from the Backend folder

### Issue: CSS not loading
**Solution:** Clear browser cache or use Ctrl+F5 to hard refresh

## 📚 Learning Outcomes

After working with this project, you will understand:
1. Flask routing and view functions
2. HTML template rendering with Jinja2
3. Form handling (GET and POST methods)
4. Session management for login
5. CSS styling for web pages
6. Project structure and organization
7. Basic web application flow

## 🎯 Future Enhancements (Optional)

If you want to extend this project:
- Add SQLite database instead of in-memory lists
- Implement password hashing with werkzeug
- Add user registration functionality
- Include images on the learning page
- Add date/time stamps to reports
- Implement pagination for admin panel
- Add search and filter for reports
- Create a statistics dashboard

## 📞 Support

For any questions or issues:
- Check the code comments in app.py
- Review the HTML templates
- Ensure all files are in correct folders
- Make sure Flask is installed properly

## 📄 License

This project is created for educational purposes and is free to use and modify.

---

**Happy Learning! Stay Safe on the Roads! 🚗🛣️**
