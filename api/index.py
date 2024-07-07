from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import random

app = FastAPI()

class MessageRequest(BaseModel):
    domain: str
    position: str

class MessageResponse(BaseModel):
    messages: List[str]

@app.post("/api/generate_messages", response_model=MessageResponse)
async def generate_messages(request: MessageRequest):
    try:
        # This is a placeholder for your actual message generation logic
        # You would typically use the domain and position to generate custom messages
        sample_messages = [
            f"Hello! I noticed your work at {request.domain} and I'm impressed with your company's innovations.",
            f"As a {request.position} at {request.domain}, I believe you might be interested in our services.",
            f"I've been following {request.domain}'s progress and would love to discuss how we could collaborate."
        ]
        
        # Randomly select 1-3 messages
        num_messages = random.randint(1, 3)
        generated_messages = random.sample(sample_messages, num_messages)
        
        return MessageResponse(messages=generated_messages)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}