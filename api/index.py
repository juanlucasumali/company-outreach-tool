import os
from pydantic import BaseModel
from langchain_groq import ChatGroq
from fastapi import FastAPI, HTTPException
from crewai import Process, Agent, Task, Crew
from .utils import web_scraper, helper_functions
from . import agents, tasks

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
        
        print("Setting up LLM...")
        # Set up LLM
        os.environ["OPENAI_API_KEY"] = "NA"
        llm=ChatGroq(temperature=0,
            model_name="llama3-70b-8192",
            api_key=request.groqAPIKey)
        
        # Set up run variables
        company_name = helper_functions.get_company_name_from_domain(request.domain)
        current_run = helper_functions.get_current_date_time()

        print("Scraping webpage...")
        # Scrape inputted webpage
        scraped_result = web_scraper.scrape_website(request.domain)
        
        print("Creating crew...")
        crew = Crew(
            agents=[
                agents.get_company_info_summarizer(llm),
                agents.get_pain_point_analyzer(llm),
                agents.get_solution_matcher(llm),
                agents.get_outreach_message_creator(llm)
                ],
            tasks=[
                tasks.get_summarize_company(scraped_result, company_name, current_run, agents.get_company_info_summarizer(llm)),
                tasks.get_analyze_pain_points(company_name, current_run, agents.get_pain_point_analyzer(llm)),
                tasks.get_match_solutions(company_name, current_run, agents.get_solution_matcher(llm)),
                tasks.get_create_outreach_messages(request.position, company_name, current_run, agents.get_outreach_message_creator(llm))
                ],
            verbose=2,
            process=Process.sequential
        )

        try:
            print("Kicking off crew...")
            result = crew.kickoff()
        except Exception as e:
            print(f"Error in crew.kickoff(): {str(e)}")
            raise

        print("Result:")
        print(result)
        
        print("Returning...")
        return MessageResponse(messages=result)
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        print(f"Error type: {type(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))