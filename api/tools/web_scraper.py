from crewai_tools import ScrapeWebsiteTool

def scrape_website(url):
    web_scraper_tool = ScrapeWebsiteTool(website_url=url)
    return web_scraper_tool.run()