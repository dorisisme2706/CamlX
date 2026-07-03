# CamlX
# CalmX

CalmX is a mental health and emotional wellness application featuring an AI-powered chatbot called **Caly**. The platform helps users track emotions, access support resources, and connect with a supportive community.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Contributing](#contributing)

## 🎯 Project Overview

CalmX is a full-stack application designed to support mental health and emotional wellbeing. The backend is built with FastAPI, providing REST APIs for emotion tracking, AI-powered chat support, and community features.

## ✨ Features

- **AI Chatbot (Caly)**: Intelligent chatbot for emotional support and guidance
- **Emotion Tracking**: Log and monitor emotional states over time
- **User Authentication**: Secure user account management
- **Community Support**: Connect with others and share experiences
- **Emergency Services**: Quick access to emergency support resources
- **Data Persistence**: Multi-database support (TimescaleDB, MongoDB)
CalmX/ ├── CalmX_Backend/ # FastAPI backend application │ ├── app/ │ │ ├── api/ # API routes and endpoints │ │ │ ├── endpoints/ # Endpoint implementations │ │ │ │ ├── auth.py │ │ │ │ ├── emotion.py │ │ │ │ └── community.py │ │ │ └── router.py │ │ ├── core/ # Core utilities │ │ │ ├── config.py │ │ │ └── security.py │ │ ├── db/ # Database connections │ │ │ ├── timescale.py │ │ │ └── mongodb.py │ │ ├── models/ # Data models │ │ │ ├── emotion.py │ │ │ ├── user.py │ │ │ └── post.py │ │ ├── services/ # Business logic │ │ │ ├── ai_caly.py │ │ │ └── emergency.py │ │ ├── main.py # FastAPI app entry point │ │ └── test_db.py # Database tests │ └── requirements.txt # Python dependencies └── README.md

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- PostgreSQL/TimescaleDB
- MongoDB (optional)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/dorisisme2706/CamlX.git
   cd CamlX/CalmX_Backend
   python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
📡 API Endpoints
Emotion Endpoints
GET /api/emotions - Retrieve user's emotion history
POST /api/emotions - Log a new emotion entry
GET /api/emotions/{id} - Get specific emotion record
Authentication Endpoints (in development)
POST /api/auth/register - Register new user
POST /api/auth/login - User login
POST /api/auth/logout - User logout
Community Endpoints (in development)
GET /api/community/posts - Retrieve community posts
POST /api/community/posts - Create new community post
AI Chatbot
POST /api/chat - Send message to Caly (AI assistant)
💾 Database
TimescaleDB
Used for time-series data like emotion tracking and user activity logs.

File: app/db/timescale.py

MongoDB
Planned for document-based storage for user profiles and community posts.

File: app/db/mongodb.py (in development)

🤖 AI Services
Caly Chatbot
The AI-powered emotional support assistant integrated in app/services/ai_caly.py. Caly provides:

Emotional support conversations
Wellness tips and resources
Crisis support information
📝 Development Status
Feature	Status
Emotion Tracking	✅ In Progress
AI Chatbot (Caly)	✅ In Progress
User Authentication	⏳ Planned
Community Features	⏳ Planned
Emergency Services	⏳ Planned
MongoDB Support	⏳ Planned
🤝 Contributing
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

💬 Support
For questions or issues, please open an issue on GitHub or contact the development team.


## 📁 Project Structure

