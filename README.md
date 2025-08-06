# 📚 Study Streak - Comprehensive Study Management App

A powerful, modern study tracking application designed for competitive exam aspirants (UPSC, JEE, NEET, CAT) and students who want to optimize their learning journey through consistent study streaks.

![Study Streak Dashboard](https://img.shields.io/badge/Study_Streak-Dashboard-blue)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-blue)

## ✨ Features

### 🎯 Core Functionality
- **📊 Dashboard** - Real-time progress tracking with beautiful analytics
- **✅ Daily Target Tracker** - Interactive checklist with completion rates
- **⏰ Pomodoro Timer** - Built-in focus sessions with customizable intervals
- **📝 Smart Note-Making** - Rich text editor with templates and organization
- **📅 Study Calendar** - Visual streak tracking and progress visualization
- **📈 Analytics Dashboard** - Comprehensive charts and performance metrics
- **💪 Motivation Center** - Daily quotes, achievements, and reflection system
- **👥 Study Groups** - Community features with leaderboards and challenges
- **⚙️ Settings** - Comprehensive customization options

### 🏆 Study-Specific Features
- **Ethics Case Study Templates** - Pre-built formats for UPSC preparation
- **Mains Answer Writing Templates** - Structured formats for competitive exams
- **Subject-wise Organization** - Ethics, Polity, Economics, Geography, etc.
- **Streak-based Motivation** - Gamified consistency tracking with fire emoji
- **Revision Scheduling** - Smart spaced repetition system
- **Achievement System** - Badges and milestones for motivation

### 🎨 Design & UX
- **Modern Interface** - Beautiful gradient-based design
- **Responsive Layout** - Perfect on mobile, tablet, and desktop
- **Dark/Light Themes** - Multiple theme options
- **Smooth Animations** - Polished user experience
- **Accessible Design** - WCAG compliant interface

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourUsername/studystreak.git
   cd studystreak
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:8080
   ```

## 📱 Screenshots

### Dashboard
*Main dashboard showing daily progress, streak counter, and quick actions*

### Study Timer
*Pomodoro timer with session tracking and analytics*

### Notes System
*Rich text editor with templates and organization*

### Analytics
*Comprehensive charts showing study patterns and progress*

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Recharts** - Responsive chart library

### Backend
- **Express.js** - Fast, minimalist web framework
- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe backend development

### Development Tools
- **Vitest** - Modern testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Hot Reload** - Instant development feedback

## 📁 Project Structure

```
studystreak/
├── client/                 # React frontend
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (buttons, cards, etc.)
│   │   ├── Layout.tsx     # Main app layout
│   │   ├── Dashboard.tsx  # Dashboard component
│   │   └── ...            # Feature-specific components
│   ├── pages/             # Route components
│   │   ├── Index.tsx      # Home page (Dashboard)
│   │   ├── Timer.tsx      # Pomodoro timer page
│   │   ├── Notes.tsx      # Note-making page
│   │   └── ...            # Other pages
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── global.css         # Global styles and themes
├── server/                # Express backend
│   ├── routes/            # API endpoints
│   └── index.ts           # Server configuration
├── shared/                # Shared types and utilities
└── public/                # Static assets
```

## 🎯 Usage Guide

### For UPSC Aspirants
1. **Set Daily Targets** - Configure your daily study goals
2. **Use Ethics Templates** - Pre-built case study formats
3. **Track Mains Practice** - Answer writing with structured templates
4. **Monitor Progress** - Visual analytics for all subjects
5. **Join Study Groups** - Connect with fellow aspirants

### For JEE/NEET Students
1. **Subject-wise Planning** - Organize by Physics, Chemistry, Biology/Math
2. **Pomodoro Sessions** - Focused study with optimal breaks
3. **Progress Tracking** - Visual charts for performance analysis
4. **Revision Calendar** - Spaced repetition scheduling
5. **Peer Competition** - Leaderboards and challenges

### For General Students
1. **Habit Building** - Consistent study streak tracking
2. **Note Organization** - Rich text editor with tagging
3. **Time Management** - Built-in timer and session tracking
4. **Goal Setting** - Customizable daily and weekly targets
5. **Motivation** - Achievement system and daily quotes

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Database (if using)
# DATABASE_URL=your_database_url

# API Keys (if needed)
# API_KEY=your_api_key
```

### Customization
- **Themes**: Modify `client/global.css` for custom color schemes
- **Components**: Extend components in `client/components/ui/`
- **Templates**: Add new note templates in `client/components/NoteEditor.tsx`
- **Subjects**: Configure subjects in relevant components

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run typecheck
```

## 🏗️ Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist/spa`
4. Deploy automatically on push

### Vercel
1. Connect repository to Vercel
2. Configure build settings
3. Deploy with zero configuration

### Self-hosting
1. Build the application: `npm run build`
2. Copy `dist/` folder to your server
3. Serve with any static hosting solution

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design

## 📋 Roadmap

### Version 2.0
- [ ] **Mobile App** - React Native version
- [ ] **Real-time Sync** - Multi-device synchronization
- [ ] **AI Recommendations** - Smart study suggestions
- [ ] **Advanced Analytics** - Machine learning insights
- [ ] **Collaborative Features** - Real-time group study
- [ ] **Integration APIs** - Connect with external tools

### Community Features
- [ ] **Study Marketplace** - Share and discover study materials
- [ ] **Mentorship System** - Connect with experienced students
- [ ] **Live Study Rooms** - Virtual study sessions
- [ ] **Discussion Forums** - Subject-wise discussions

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please:

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with detailed information
3. **Use appropriate labels** (bug, enhancement, etc.)
4. **Provide screenshots** if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yash Raj**
- LinkedIn: [Yash Raj](https://www.linkedin.com/in/yash-raj-329ba124b/)

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Radix UI** - For accessible component primitives
- **Vite Team** - For the lightning-fast build tool
- **Lucide** - For beautiful icons
- **All Contributors** - For making this project better

## ⭐ Show Your Support               

If this project helped you, please give it a ⭐ on GitHub!

---

**Built with ❤️ for students**

*Happy studying! 📚✨*
