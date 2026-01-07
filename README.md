# 🚦 Road Safety Awareness Platform (Static)

Simple, beginner-friendly **HTML/CSS/JavaScript** website—no backend or frameworks. All data stays in your browser via `localStorage`.

## 📁 Project Structure

```
Main/
├── index.html      # Home
├── login.html      # Dummy login (JS check)
├── dashboard.html  # Navigation hub
├── learn.html      # Static learning content
├── quiz.html       # 5-question quiz (JS)
├── report.html     # Report form (stores in localStorage)
├── admin.html      # View stored reports (localStorage)
├── style.css       # Styles
└── script.js       # Logic for auth, quiz, reports
```

## 🚀 How to Run

1) Open `index.html` in your browser (double-click or drag-drop).  
2) Use the top navigation to move between pages.  
3) Demo login (checked in JS only):
   - `student / password123`
   - `admin / admin123`
4) Reports and quiz data are saved in your browser’s `localStorage` (clear site data to reset).

Optional: serve files with a simple local server (avoids any CORS/file URL quirks):
```bash
cd Main
python -m http.server 8000
# then open http://localhost:8000
```

## ✨ Features

- **Home:** Title, description, quick links, basic safety rules.  
- **Login:** Dummy check in JS; stores user in `localStorage`; redirects to dashboard.  
- **Dashboard:** Welcome message and links to Learn/Quiz/Report/Admin.  
- **Learn:** Static road safety tips and sign explanations.  
- **Quiz:** 5 MCQs defined in `script.js`; shows score after submit.  
- **Report:** Issue form (type/location/description); saves to `localStorage`; shows alert on submit.  
- **Admin:** Reads and lists reports from `localStorage` in a table.

## 🛠️ Customization

- **Edit quiz questions:** update `QUIZ_QUESTIONS` in `script.js`.
- **Change demo users:** update `DUMMY_USERS` in `script.js`.
- **Styling:** adjust colors, spacing, or layout in `style.css`.

## 🐛 Troubleshooting

- Reports or quiz score not appearing: ensure `script.js` is loaded; try a hard refresh (Ctrl+F5).
- Admin shows no data: add reports via the Report page first; `localStorage` is per-browser.
- Need a reset: clear browser storage for the site (this clears saved login and reports).

Enjoy the static build—no server or dependencies required!
