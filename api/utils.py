from urllib.parse import urlparse
from datetime import datetime
import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client

# Tool to get compnay's name from domain
def get_company_name_from_domain(url):
    parsed_url = urlparse(url)
    domain = parsed_url.netloc
    # Remove 'www.' if present
    if domain.startswith('www.'):
        domain = domain[4:]
    company_name = domain.split('.')[0]
    return company_name

# Supabase function
def insert_or_update_supabase(company_name: str, current_run: str, task_name: str, output: str, supabase_url: str, supabase_key: str):
    supabase: Client = create_client(supabase_url, supabase_key)
    table = supabase.table("company_outreach_tool")
    
    # Check if a row for this company and run already exists
    response = table.select("id").eq("company_name", company_name).eq("current_run", current_run).execute()
    
    if response.data:
        # If exists, update the specific task column
        row_id = response.data[0]['id']
        table.update({task_name: output}).eq("id", row_id).execute()
        print(f"Updated {task_name} for {company_name} (run: {current_run})")
    else:
        # If not exists, insert a new row
        table.insert({
            "company_name": company_name,
            "current_run": current_run,
            task_name: output
        }).execute()
        print(f"Inserted new row for {company_name} (run: {current_run}) with {task_name}")

# CrewAi callback function
def create_callback(company_name: str, current_run: str, task_name: str, supabase_url: str, supabase_key: str):
    def callback_function(output):
        print(f"Task completed: {task_name}")
        insert_or_update_supabase(company_name, current_run, task_name, output.raw_output, supabase_url, supabase_key)
    return callback_function

# Web-scraping tool
def scrape_website(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    result = soup.get_text()
    return result