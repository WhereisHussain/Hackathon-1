from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from qdrant_client import QdrantClient
from openai import OpenAI
from agents.skills import RoboticsSkills

load_dotenv()

app = FastAPI(title="Textbook AI Backend")

qdrant_client = QdrantClient(url=os.getenv("QDRANT_URL"), api_key=os.getenv("QDRANT_API_KEY"))
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

COLLECTION_NAME = "humanoid_robotics_textbook"

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your Docusaurus domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    question: str
    selected_text: Optional[str] = None
    user_id: Optional[str] = None

class PersonalizeRequest(BaseModel):
    chapter_id: str
    content: str
    user_background: dict

class TranslateRequest(BaseModel):
    content: str
    target_language: str = "ur"

@app.get("/")
async def root():
    return {"message": "Physical AI & Humanoid Robotics API is running"}

@app.post("/chat/query")
async def query_rag(request: QueryRequest):
    # Get embedding for the question
    query_vector = openai_client.embeddings.create(
        input=[request.question],
        model="text-embedding-3-small"
    ).data[0].embedding

    # Search Qdrant
    search_result = qdrant_client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=3
    )
    
    context = "\n".join([hit.payload["content"] for hit in search_result])
    if request.selected_text:
        context = f"USER SELECTED TEXT:\n{request.selected_text}\n\nRELEVANT BOOK CONTENT:\n{context}"

    # Generate answer with OpenAI
    response = openai_client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a helpful teaching assistant for a Physical AI and Humanoid Robotics course. Use the provided context to answer the student's question accurately. If the answer is not in the context, say so."},
            {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {request.question}"}
        ]
    )
    
    return {"answer": response.choices[0].message.content}

@app.post("/content/personalize")
async def personalize_content(request: PersonalizeRequest):
    bg = request.user_background
    prompt = f"""
    Personalize the following technical content for a student with this background:
    - Software Level: {bg.get('software', 'Intermediate')}
    - Hardware Level: {bg.get('hardware', 'Beginner')}
    - Interests: {bg.get('interests', 'Robotics')}
    
    Content:
    {request.content}
    
    Maintain the technical accuracy but adjust the explanations and analogies to better suit the student's background.
    """
    
    response = openai_client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )
    
    return {"personalized_content": response.choices[0].message.content}

@app.post("/content/translate")
async def translate_content(request: TranslateRequest):
    prompt = f"Translate the following technical content to Urdu (Pakistan) for an engineering textbook:\n\n{request.content}"
    
    response = openai_client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )
    
    return {"translated_content": response.choices[0].message.content}

@app.post("/agents/skill/summarize")
async def skill_summarize(request: dict):
    content = request.get("content", "")
    summary = RoboticsSkills.summarize_chapter(content)
    return {"summary": summary}

@app.post("/agents/skill/explain")
async def skill_explain(request: dict):
    code = request.get("code", "")
    explanation = RoboticsSkills.explain_code(code)
    return {"explanation": explanation}
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
