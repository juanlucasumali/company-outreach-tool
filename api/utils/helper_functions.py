from urllib.parse import urlparse
from datetime import datetime

def get_company_name_from_domain(url):
    parsed_url = urlparse(url)
    domain = parsed_url.netloc
    # Remove 'www.' if present
    if domain.startswith('www.'):
        domain = domain[4:]
    company_name = domain.split('.')[0]
    return company_name