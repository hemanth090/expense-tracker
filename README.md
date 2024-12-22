# Modern Expense Tracker Pro

A modern, full-stack expense tracking application built with React and Supabase, featuring user authentication, real-time updates, and advanced analytics.

## 🌟 Features

- **User Authentication**
  - Secure Sign up/Sign in with email
  - Password reset functionality
  - Protected routes and authenticated sessions

- **Expense Management**
  - Add, edit, and delete expenses
  - Categorize expenses with custom categories
  - Attach notes and dates to expenses
  - Real-time updates across devices

- **Analytics & Visualization**
  - Visual expense breakdown by category
  - Monthly spending trends
  - Interactive charts and graphs
  - Category-wise analysis

- **UI/UX**
  - Modern, responsive Material-UI design
  - Dark/Light theme support
  - Mobile-friendly interface
  - Smooth animations and transitions

## 🚀 Live Demo

Visit the live application: [Expense Tracker Pro](https://expense-tracker-pro.vercel.app)

## 🛠️ Tech Stack

- **Frontend:**
  - React 18
  - Material-UI (MUI) for components
  - React Router for navigation
  - Recharts for data visualization
  - Context API for state management

- **Backend & Database:**
  - Supabase for backend services
  - PostgreSQL with Row Level Security
  - Real-time subscriptions
  - Secure authentication

## 📦 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/expense-tracker-pro.git
   cd expense-tracker-pro
   ```

2. **Supabase Setup**
   - Create a project at [Supabase](https://supabase.com)
   - Run SQL commands from `supabase/init.sql`
   - Copy project URL and anon key from Project Settings > API

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**
   Create `.env` file in the frontend directory:
   ```env
   REACT_APP_SUPABASE_URL=your-project-url
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Start Development Server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
expense-tracker-pro/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Auth/
│       │   ├── Dashboard/
│       │   ├── Expenses/
│       │   └── Charts/
│       ├── context/
│       │   ├── AuthContext.js
│       │   └── ExpenseContext.js
│       ├── hooks/
│       ├── utils/
│       └── App.js
├── supabase/
│   └── init.sql
└── README.md
```

## 🔒 Security Features

- Row Level Security (RLS) for data protection
- Secure environment variable management
- Protected API endpoints
- SQL injection prevention
- XSS protection

## 🚀 Deployment

The application is deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy!

## 📱 Progressive Web App (PWA)

- Installable on mobile devices
- Offline functionality
- Push notifications support
- Fast loading and performance

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI for the beautiful components
- Supabase for the amazing backend service
- React community for the excellent tools
- All contributors who helped improve the project

---

Made with ❤️ by Hemanth

For support, email: naveenhemanth4@gmail.com
