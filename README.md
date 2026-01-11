# Expense Tracker – Full-Stack Web Application

Stack: Node.js, Express.js, MongoDB (Mongoose), EJS, Chart.js  
Deployment: Render (Web Service), MongoDB Atlas

---

## Project Overview

A production-ready **Expense Tracker** that allows authenticated users to record, manage, and analyze personal expenses.  
The application supports CRUD operations, aggregation-based analytics, and interactive dashboards with a modern dark UI.

---

## Phase 1: Core Application Setup (Day 1–2)

### What was implemented
- Initialized Node.js project with Express
- Set up MVC-style folder structure (routes, models, views)
- Connected MongoDB using Mongoose
- Configured EJS for server-side rendering
- Added static asset handling (`public/`)

### Key decisions
- Used **EJS** instead of React to keep rendering server-side and simplify deployment
- Centralized DB connection logic for easier production config

---

## Phase 2: Authentication & Security (Day 3–4)

### What was implemented
- User signup, login, logout
- Password hashing using `bcrypt`
- Session-based authentication using `express-session`
- Route protection middleware
- Environment variable handling with `.env`

### Security considerations
- Passwords never stored in plain text
- Session cookies configured for production
- Secrets isolated via environment variables

---

## Phase 3: Expense CRUD Operations (Day 5–6)

### Expense schema
Fields:
- title
- amount
- category
- date
- user_id (reference)

### What was implemented
- Add expense
- Update expense by title
- Delete expense by title
- View all expenses (tabular format)

### Notes
- All operations are **user-scoped**
- Input validation enforced at form and schema level

---

## Phase 4: Aggregations & Analytics (Day 7–8)

### MongoDB aggregation pipelines
Implemented:
- Total spending per user
- Highest spending category
- Category-wise expense totals
- Monthly expense aggregation (group by month + year)

### Why aggregation pipelines
- Avoids client-side computation
- Scales better with data growth
- Keeps analytics logic close to data

---

## Phase 5: Dashboard & Visualization (Day 9–10)

### Dashboard features
- Total spends (stat card)
- Highest spending category (stat card)
- Expense distribution by category (pie chart)
- Monthly report (bar chart)

### Visualization stack
- Chart.js (CDN)
- Server-prepared datasets injected via EJS

### UI decisions
- Fixed navbar
- Card-based layout
- Black + red modern theme
- Responsive grid for stats and tables

---

## Phase 6: UI Architecture & Cleanup (Day 11–12)

### Problems solved
- Navbar overlap with fixed positioning
- CSS conflicts between auth pages and dashboard pages
- Chart stretching issues
- Invisible tables on dark background

### Final layout system
| Page Type | Layout |
|---------|--------|
| Login / Signup | Centered flex |
| Dashboard | Normal document flow |
| Tables | Full-width cards |
| Charts | Fixed aspect ratio |

### Result
- Consistent UI across all pages
- No overlapping or floating elements
- Maintainable CSS structure

---

## Phase 7: Deployment (Day 13)

### Deployment stack
- **Render**: Node.js web service
- **MongoDB Atlas**: Cloud database (M0 tier)

### Production setup
- Environment variables configured on Render
- Dynamic port handling
- Static assets served correctly
- Verified full app flow post-deploy

---

## Project Structure
expense-tracker/
│
├── app.js
├── package.json
├── .env
├── models/
│ ├── User.js
│ └── Expense.js
├── routes/
│ ├── auth.js
│ ├── expense.js
│ └── dashboard.js
├── views/
│ └── *.ejs
├── public/
│ └── style.css
└── README.md


---

## Key Learnings

- Session-based authentication in Express
- MongoDB aggregation pipelines for analytics
- Server-side rendering with EJS
- UI layout debugging with fixed navbars
- Production deployment of Node.js apps
- Separation of auth vs application layouts

---

## Next Enhancements (Planned)

- Pagination and search for expenses
- Inline edit/delete actions
- Monthly / yearly filters
- Doughnut chart with center summary
- CSV export of expenses
- Role-based access (future)

---

## Notes on Production Readiness

- Secrets isolated via `.env`
- No hardcoded ports or credentials
- MongoDB indexes recommended for scale
- Ready for CI/CD extension

---

## Author

Built by a Computer Engineering student focusing on **backend + full-stack development**.  
Designed to demonstrate real-world application structure, not just CRUD basics.


