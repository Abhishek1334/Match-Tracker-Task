# ⚽ Match Tracker

### LIVE SITE : https://match-tracker-task-alpha.vercel.app/

A full-stack MERN-style sports tracking app that fetches match information from an external API and displays it in a modern, responsive UI with filters, pagination, and theming.

---

## 🚀 Features

- ✅ Fetch match data from external API (via backend)
- ✅ Backend validation using **Joi**
- ✅ Centralized error handling
- ✅ API documentation using **Swagger**
- ✅ Unit & integration testing with **Jest** and **Supertest**
- ✅ Frontend filters (date-based, range)
- ✅ Pagination (5 matches per page)
- ✅ Dark mode toggle
- ✅ Responsive UI
- ✅ Zustand for state management

---

## 🧱 Tech Stack

### Frontend

- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **Zustand**
- **Axios**
- **Radix UI**
- **Lucide Icons**

### Backend

- **Express v5**
- **Joi** for request validation
- **Swagger** for API docs
- **Jest** and **Supertest** for testing
- **Dotenv**, **Axios**, **CORS**

---

## 📁 Folder Structure

	match-tracker
	├── match-tracker-backend
	│   ├── config
	│   │   └── config.js
	│   ├── controllers
	│   │   └── matchControllers.js
	│   ├── index.js
	│   ├── jest.config.cjs
	│   ├── middleware
	│   │   └── errorHandler.js
	│   ├── package.json
	│   ├── package-lock.json
	│   ├── routes
	│   │   └── matchRoutes.js
	│   ├── services
	│   │   └── fetchMatches.js
	│   ├── swagger.js
	│   ├── tests
	│   │   └── match.test.js
	│   └── utils
	│       └── createError.js
	├── match-tracker-frontend
	│   ├── components.json
	│   ├── eslint.config.js
	│   ├── index.html
	│   ├── jsconfig.json
	│   ├── package.json
	│   ├── package-lock.json
	│   ├── public
	│   ├── README.md
	│   ├── src
	│   │   ├── api
	│   │   │   └── match.js
	│   │   ├── App.jsx
	│   │   ├── assets
	│   │   ├── components
	│   │   │   ├── ErrorAlert.jsx
	│   │   │   ├── FiltersPanel.jsx
	│   │   │   ├── Header.jsx
	│   │   │   ├── Loader.jsx
	│   │   │   ├── MatchCard.jsx
	│   │   │   ├── MatchList.jsx
	│   │   │   ├── ThemeToggle.jsx
	│   │   │   └── ui
	│   │   │       ├── alert.jsx
	│   │   │       ├── button.jsx
	│   │   │       └── input.jsx
	│   │   ├── index.css
	│   │   ├── lib
	│   │   │   └── utils.js
	│   │   ├── main.jsx
	│   │   ├── pages
	│   │   │   └── Home.jsx
	│   │   ├── services
	│   │   │   └── axios.js
	│   │   └── store
	│   │       └── matchStore.jsx
	│   └── vite.config.js
	└── README.md


---

## ⚙️ Environment Variables

Create `.env` files in both `backend/` and `frontend/` folders:

### `/backend/.env`

```env
PORT=5000
FootballDataApiKey=your_api_key_here
```
### `/frontend/.env`
``` env
VITE_API_URL=http://localhost:5000
```

##  🧪 Testing

```bash
cd backend
npm test
```

## 📦 How to Run the Project

### Clone the repository:
```bash
git clone https://github.com/Abhishek1334/Market-Tracker-Task.git
```

### Install dependencies:
```bash
cd match-tracker-backend && npm install
cd ../match-tracker-frontend && npm install
```

### Add environment variables as mentioned above. 

### Start the server:
```bash
cd match-tracker-backend && npm start
```

### Start the frontend development server:
```bash
cd match-tracker-frontend && npm run dev
```

Open your browser at http://localhost:XXXX to view the application.


## 📌 Future Improvements
- Match notifications
- AI-generated insights
- PWA support
-Caching and offline support
