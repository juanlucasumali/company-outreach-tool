from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_groq import ChatGroq
from .tools import web_scraper

# os.environ["OPENAI_API_KEY"] = "NA"
# llm=ChatGroq(temperature=0,
#     model_name=request.groqAPIKey,
#     api_key="llama3-70b-8192")

app = FastAPI()

class MessageRequest(BaseModel):
    domain: str
    position: str
    groqAPIKey: str

class MessageResponse(BaseModel):
    messages: str

@app.post("/api/generate_messages", response_model=MessageResponse)
async def generate_messages(request: MessageRequest):
    try:
        
        # Scrape inputted webpage
        scraped_result = web_scraper.scrape_website(request.domain)

        # Summarize scraped webpage result
        
        return MessageResponse(messages=scraped_result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}