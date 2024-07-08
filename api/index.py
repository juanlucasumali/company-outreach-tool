from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import random

app = FastAPI()

class MessageRequest(BaseModel):
    domain: str
    position: str

class MessageResponse(BaseModel):
    messages: str

# INITIALIZING CREWAI
import os
from crewai import Process, Agent, Task, Crew
from langchain_groq import ChatGroq
from langchain_community.llms import Ollama
from crewai_tools import ScrapeWebsiteTool
from urllib.parse import urlparse
from datetime import datetime

os.environ["OPENAI_API_KEY"] = "NA"
llm=ChatGroq(temperature=0,
             model_name=os.environ.get('MODEL_NAME'),
             api_key=os.environ.get('GROQ_API_KEY'))

@app.post("/api/generate_messages", response_model=MessageResponse)
async def generate_messages(request: MessageRequest):
    try:
        
        company_info_raw = ScrapeWebsiteTool(website_url=request.domain).run()
        
        return MessageResponse(messages=company_info_raw)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}