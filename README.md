# Physical AI & Humanoid Robotics: An AI-Native Textbook

Welcome to the **Physical AI & Humanoid Robotics** project. This is an AI-native technical textbook and learning platform built for the future of work, where humans and robots collaborate.

## Live Demo
- **Textbook**: [https://WhereisHussain.github.io/Hackathon-1/](https://WhereisHussain.github.io/Hackathon-1/)
- **Repository**: [https://github.com/WhereisHussain/Hackathon-1](https://github.com/WhereisHussain/Hackathon-1)

---

## Features

### 1. AI-Native Content
- 5 comprehensive chapters covering Humanoid Architecture, Kinematics, Sensing, Actuation, and AI Software Agents.
- Rich technical content with integrated code examples and mathematical foundations.

### 2. Integrated RAG Chatbot
- **Contextual Understanding**: A floating chatbot powered by **OpenAI Agents SDK** and **Qdrant Vector Store**.
- **Interactive Retrieval**: Highlight specific text in the book, and the chatbot will use that context to answer your questions accurately.

### 3. Personalized Learning
- **Custom Profiles**: Captures user hardware and software background during signup.
- **Dynamic Content**: Press **"Personalize for Me"** at the start of any chapter to have the AI adapt the technical complexity and analogies to your specific background.

### 4. Accessibility: Urdu Translation
- **One-Click Translation**: Every chapter can be translated into Urdu at the press of a button, ensuring that cutting-edge robotics knowledge is accessible to everyone.

### 5. Reusable Intelligence (Agent Skills)
- **Summarization**: Instantly generate key takeaways for any chapter.
- **Explain Code**: Specialized agent skill for explaining robotics control loops and ROS2 code.
- **Kinematics Tutor**: Step-by-step guidance for solving rigid body physics problems.

---

## 🛠️ Tech Stack

- **Frontend**: [Docusaurus](https://docusaurus.io/) (React-based static site generator)
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **AI Core**: [OpenAI GPT-4o](https://openai.com/), [ChatKit SDK](https://github.com/panaversity/openai-chatkit-sdk)
- **Vector Database**: [Qdrant](https://qdrant.tech/)
- **Reliable Persistence**: [Neon Serverless PostgreSQL](https://neon.tech/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)

---

## Project Structure

```text
Hackathon-1/
├── book/           # Docusaurus frontend (Textbook UI & Components)
├── api/            # FastAPI backend (RAG, Translation, Personalization)
├── agents/         # Reusable Agent Skills & Intelligence
├── auth/           # Better Auth & User Profile models
└── .github/        # CI/CD and automated deployment workflows
```

---

## Local Development

### Prerequisites
- Node.js (v20+)
- Python (3.12+)
- API Keys for OpenAI and Qdrant

### Backend
1. `cd api`
2. `python -m venv venv && .\venv\Scripts\activate`
3. `pip install -r requirements.txt`
4. `python main.py`

### Frontend
1. `cd book`
2. `npm install`
3. `npm start`

---

## 📜 Acknowledgments
Developed by Muhammad Hussain, inspired by Sir Jawwad Ali. 

GIAIC Roll No. 102210

LinkedIn: www.linkedin.com/in/where-is-hussain

---
*Created by Muhammad Hussain from GIAIC.*
