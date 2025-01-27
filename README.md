# Expense Tracker Pro

A modern, full-stack expense tracking application built with React and Supabase. Track your expenses, analyze spending patterns, and manage your finances with ease.

## 🌟 Features

- **User Authentication**
  - Secure email/password authentication
  - Password reset functionality with email notifications
  - Protected routes for authenticated users
  - Persistent login state

- **Expense Management**
  - Add, edit, and delete expenses
  - Categorize expenses with customizable categories
  - Add descriptions and dates to expenses
  - Real-time updates using Supabase subscriptions
  - Export expenses to Excel format

- **Advanced Analytics & Insights**
  - Visual breakdown of expenses by category with interactive pie charts
  - Daily spending patterns with line chart visualization
  - Monthly trends analysis with bar charts
  - Period-over-period expense comparison
  - Proper USD currency formatting throughout
  - Interactive tooltips with detailed information
  - Percentage breakdowns of spending categories

- **Modern UI/UX**
  - Responsive Material-UI design
  - Dark/Light mode theme support
  - Snackbar notifications for user feedback
  - Smooth transitions and animations
  - Mobile-friendly interface

## 🚀 Tech Stack

- **Frontend**
  - React 18 with Hooks and Context API
  - Material-UI v5 for components and theming
  - React Router v7 for navigation
  - Recharts for interactive data visualization
  - XLSX for Excel export functionality

- **Backend & Database**
  - Supabase for backend services
  - PostgreSQL database with Row Level Security
  - Real-time subscriptions for live updates
  - Secure authentication and authorization

## 🌐 Live Demo

Experience the application live: [Expense Tracker Pro](https://frontend-delta-plum-91.vercel.app/auth)

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

## 📊 Analytics Features

The analytics dashboard provides comprehensive insights into your spending:

- **Category Breakdown**
  - Interactive pie chart showing expense distribution
  - Hover tooltips with exact amounts and percentages
  - USD currency formatting

- **Daily Spending**
  - Line chart tracking daily expense patterns
  - Easy-to-read tooltips with date and amount
  - Trend analysis capabilities

- **Monthly Trends**
  - Bar chart visualization of monthly totals
  - Period-over-period comparison
  - Export functionality for detailed analysis

## 🔐 Security Features

- Row Level Security (RLS) in Supabase
- Secure authentication flow with email verification
- Protected API endpoints
- Environment variables for sensitive data
- Secure password reset functionality

## 📁 Project Structure

```
expense-tracker/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── analytics/
│       │   ├── layout/
│       │   └── common/
│       ├── context/
│       ├── hooks/
│       ├── utils/
│       │   ├── formatters.js
│       │   ├── exportUtils.js
│       │   └── validation.js
│       └── App.js
└── supabase/
    ├── functions.sql
    ├── init.sql
    └── email_template.sql
```

## 🛡️ Environment Setup

Required environment variables:
- `REACT_APP_SUPABASE_URL`: Your Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 🔄 Updates and Versions

- Latest version includes enhanced USD currency formatting
- Improved chart visualizations and tooltips
- Added export functionality for detailed analysis
- Enhanced error handling and user feedback

## 📫 Support

For issues, feature requests, or contributions, please:
1. Check existing issues or create a new one
2. Fork the repository
3. Create a pull request with your changes

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
