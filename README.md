# Scribo

Scribo is an AI-powered content generation app.

## Features
- Generate blogs, tweets, ads, captions, and newsletters using AI
- Modern React frontend with Tailwind CSS
- FastAPI backend with OpenRouter (OpenAI-compatible) integration
- Professional, animated UI

## Project Structure

### Frontend (React.js + Tailwind CSS)
- `frontend/src/` — Main React source code
- `frontend/components/` — Reusable UI components
- `frontend/pages/` — Page-level components
- `frontend/api/` — API call logic

### Backend (Python + FastAPI)
- `backend/app.py` — Main FastAPI app entry point
- `backend/routes/` — API route handlers (content, feedback, brand)
- `backend/services/` — Service logic (OpenAI, Pinecone, LangChain)
- `backend/models/` — Data models and schemas

---

## Getting Started

### 1. Clone the Repository
```sh
 git clone <your-repo-url>
 cd Content_Creation_Using_AI
```

### 2. Backend Setup (FastAPI)
```sh
cd backend
 #  pip install fastapi uvicorn openai python-dotenv
```

#### Environment Variables
Create a `.env` file in the `backend/` directory with:
```
OPENROUTER_API_KEY=your_openrouter_api_key

```

#### Run the Backend
```sh
uvicorn app:app --reload
```
- The backend will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000)
- API docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### 3. Frontend Setup (React + Vite)
```sh
cd ../frontend
npm install
```

#### Run the Frontend
```sh
npm run dev
```
- The frontend will be available at [http://localhost:5173](http://localhost:5173) (default Vite port)

---

## Usage
1. Open the frontend in your browser.
2. Select a content type and fill in the form.
3. Click "Generate" to create content.
4. The generated content will appear on a new page.

---

## Customization & Extending
- Add new content types by updating the backend `/generate/content` logic and frontend forms.
- Update the UI in `frontend/components/` for more features or branding.

---

