# 📚 EduMentor AI Platform  

EduMentor is an *interactive educational platform* that connects students with mentors for *personalized learning and doubt-solving*.  
If a mentor is unavailable, students can get answers from an *AI-powered assistant* — including a *Mentor AI* that mimics the personality, tone, and expertise of a specific mentor.  

---

## 🚀 Features  

### 👨‍🏫 *Real Mentorship*  
- Students can connect in *real-time* with verified mentors.  
- Mentors can guide on *academic topics, career advice, interview preparation, and personal development*.  

### 🤖 *AI-Powered Doubt Solving*  
- Instant doubt-solving using *Mentor AI*.  
- AI can *mimic the teaching style and personality* of a chosen mentor.  
- Handles *text queries* and supports *document uploads* (assignments, resumes, notes).  

### 📜 *Chat History*  
- Students can *view past chats* with mentors or AI for future reference.  
- Searchable and organized per subject/topic.  

### 💬 *Smart Suggestions*  
- AI provides *predefined smart question suggestions* to help students ask better, more focused queries.  

### 🔒 *Secure & Scalable*  
- End-to-end communication security.  
- Supports high scalability for institutions and large student bases.  

---

## 🛠 Tech Stack  

*Frontend:*  
- React.js (with Framer Motion animations)  
- React Markdown for rich responses  
- CSS Modules for scoped styling  

*Backend:*  
- Node.js + Express.js  
- MongoDB (with Mongoose ORM)  
- Multer for file uploads  
- Google Gemini API for AI responses  

*AI Integration:*  
- Gemini 1.5 Flash for instant responses  
- AI personality fine-tuning for mentor mimicry  

*Others:*  
- WebSocket for real-time updates (optional live mentoring)  
- Cookies for authentication  
- Ngrok for local testing with public URLs  

---

## 📂 Project Structure  

📦 EduMentor
┣ 📂 backend
┃ ┣ 📂 routes # Express routes for chat, mentor, and user APIs
┃ ┣ 📂 controllers # Business logic for chats, users, mentors
┃ ┣ 📂 models # Mongoose models (User, Message, AuthUser)
┃ ┣ 📂 utils # AI integration, resume parsing, etc.
┃ ┗ app.js # Server entry point
┣ 📂 frontend
┃ ┣ 📂 components # Reusable UI components
┃ ┣ 📂 pages # Main pages (StartPage, MentorChat, etc.)
┃ ┣ 📂 module # CSS Modules
┃ ┗ App.js # React entry point
┗ README.md

yaml
Copy
Edit

---

## ⚙ Installation  

### ⿡ Clone the repository  
```bash
git clone https://github.com/yourusername/edumentor.git
cd edumentor
⿢ Install dependencies
Backend:

bash
Copy
Edit
cd backend
npm install
Frontend:

bash
Copy
Edit
cd frontend
npm install
⿣ Set up environment variables
Create .env in backend directory:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
PORT=8000
⿤ Start the servers
Backend:

bash
Copy
Edit
npm start
Frontend:

bash
Copy
Edit
npm run dev
📌 API Endpoints
Chat with Mentor or AI
POST /chat

Body:

json
Copy
Edit
{ 
  "prompt": "Your question", 
  "instruction": "Optional AI instruction" 
}
Optional File Upload: .pdf or .docx

🔄 How It Works — Query Flow
mermaid
Copy
Edit
flowchart TD
    A[Student Sends Query] --> B{Is Mentor Available?}
    B -- Yes --> C[Real Mentor Responds in Chat]
    B -- No --> D{Use Mentor AI?}
    D -- Yes --> E[AI Mimics Selected Mentor Personality]
    D -- No --> F[Generic AI Assistant Responds]
    C --> G[Response Sent to Student]
    E --> G
    F --> G
💡 Future Enhancements
🎥 Video Mentorship Sessions with AI transcription

🌐 Multi-language support

📊 Mentor performance analytics

🧠 Continuous AI fine-tuning from mentor’s past chats

🏆 Vision
To make mentorship accessible 24/7 for every student —
whether it’s from a human mentor or a mentor AI twin that feels just as real.

pgsql
Copy
Edit

This is ready to be **pasted directly into your README.md** and will also render the *mermaid flow diagram* on GitHub.  

If you want, I can also create a *feature graphic* or banner for your README so it looks more professional when people land on your repo. Would you like me to make that?







Ask ChatGPT
