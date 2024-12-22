# Expense Tracker Pro

A modern, full-stack expense tracking application built with React and Supabase. Track your expenses, analyze spending patterns, and manage your finances with ease.

## 🌟 Features

- **User Authentication**
  - Secure email/password authentication
  - Password reset functionality
  - Protected routes for authenticated users

- **Expense Management**
  - Add, edit, and delete expenses
  - Categorize expenses
  - Add notes and dates to expenses
  - Real-time updates

- **Analytics & Insights**
  - Visual breakdown of expenses by category
  - Monthly spending trends
  - Interactive charts and graphs
  - Expense summaries

- **Modern UI/UX**
  - Responsive design for all devices
  - Dark/Light mode support
  - Material-UI components
  - Smooth animations and transitions

## 🚀 Tech Stack

- **Frontend**
  - React 18
  - Material-UI v5
  - React Router v6
  - Recharts for data visualization
  - Context API for state management

- **Backend**
  - Supabase
  - PostgreSQL with RLS
  - Real-time subscriptions
  - Secure authentication

## 🌐 Live Demo

Check out the live application: [Expense Tracker Pro](https://frontend-delta-plum-91.vercel.app/auth)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hemanth090/expense-tracker.git
   cd expense-tracker
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the frontend directory with:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## 🔐 Security

- Implements Row Level Security (RLS) in Supabase
- Secure authentication flow
- Protected API endpoints
- Environment variables for sensitive data

## 📁 Project Structure

```
expense-tracker/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── utils/
│       └── App.js
└── supabase/
    ├── functions.sql
    ├── init.sql
    └── email_template.sql
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Contact

- GitHub: [@hemanth090](https://github.com/hemanth090)

---

Made with ❤️ by Hemanth
