from crewai import Task
from . import utils

def get_summarize_company(company_info_raw, company_name, current_run, company_info_summarizer, supabase_url, supabase_key):
    summarize_company = Task(
        description=f"Summarize the company's technology infrastructure based on the scraped data: {company_info_raw}",
        expected_output="""
        A detailed, structured text file containing:

        1. Company overview
        2. Explicit information about the technology stack of the company's product/service, NOT the website (if available)
        3. Inferred technology stack  of the company's product/service, NOT the website based on website analysis
        4. Explicit information about IT infrastructure (if available)
        5. Inferred IT infrastructure based on company size, industry, and website performance
        6. Explicit information about hardware setup (if available)
        7. Inferred hardware setup based on company operations and industry standards
        8. Cloud usage indicators
        9. Potential scalability and performance issues
        10. Security measures and compliance indicators
        11. Integration with third-party services or APIs
        12. Any unique technological challenges or requirements based on the company's specific industry or operations

        This comprehensive report will provide a solid foundation for the next agent to identify potential hardware-related pain points and opportunities for technological optimization.
        """,
        output_file=f"/output/{company_name}/{current_run}/company-summary.txt",
        agent=company_info_summarizer,
        callback=utils.create_callback(company_name, current_run, "company_summary", supabase_url, supabase_key)
    )
    return summarize_company

def get_analyze_pain_points(company_name, current_run, pain_point_analyzer, supabase_url, supabase_key):
    analyze_pain_points = Task(
        description="Analyze the company's technology infrastructure to identify hardware-related pain points and optimization opportunities.",
        expected_output="""
        A comprehensive markdown report detailing:

        # Executive Summary
        [Brief overview of the most critical hardware-related pain points identified]

        # Detailed Pain Point Analysis

        ## Performance Bottlenecks
        [Identify hardware components or configurations causing slowdowns]

        ## Scalability Challenges
        [Analyze how current hardware may limit growth]

        ## Outdated Technology
        [Flag legacy systems or outdated hardware components]

        ## Energy Efficiency and Data Centre Issues
        [Highlight inefficient energy use in current hardware setup and potential for more sustainable solutions]

        ## Security Vulnerabilities
        [Identify hardware-related security risks]

        ## Compatibility Problems
        [Analyze integration issues between different hardware components]

        ## Maintenance Challenges
        [Assess the complexity and cost of maintaining current hardware]

        ## Capacity Constraints
        [Identify storage or processing limitations]

        ## Reliability Concerns
        [Analyze potential points of failure in the current hardware setup]

        ## Compliance Issues
        [Flag any hardware setups that may not meet industry regulations]

        ## Equipment Pricing Concerns
        [Discuss any issues related to the cost of current or needed hardware]

        # Impact Assessment
        [For each identified pain point, analyze its potential impact on the company's operations, efficiency, and competitiveness]

        # Future Considerations
        [Anticipate potential hardware challenges based on the company's growth trajectory and industry trends]

        # Prioritization Matrix
        [Provide a visual representation ranking the identified pain points based on urgency and potential impact]

        # Recommendations Overview
        [Offer high-level suggestions for addressing the most critical pain points]

        This report will provide a solid foundation for developing targeted hardware solutions and improvements, enabling the company to address both immediate and long-term client needs effectively.
        """,
        output_file=f"/output/{company_name}/{current_run}/pain-point-analysis.txt",
        agent=pain_point_analyzer,
        callback=utils.create_callback(company_name, current_run, "pain_point_analysis", supabase_url, supabase_key)
    )
    return analyze_pain_points

def get_match_solutions(company_name, current_run, solution_matcher, supabase_url, supabase_key):
    match_solutions = Task(
        description="Analyze the pain points identified by the pain_point_analyzer and create a comprehensive mapping of how BSI's solutions, expertise, and partnerships can address each issue. Highlight BSI's unique value proposition for each pain point.",
        expected_output="""
        A comprehensive markdown report detailing:

        # Executive Summary
        [Brief overview of how BSI is uniquely positioned to address the identified pain points]

        # Pain Point Solutions Mapping

        ## [Pain Point 1 Name]
        ### Issue Summary
        [Brief description of the pain point]
        ### BSI Solution
        [Detailed description of how BSI can address this pain point]
        ### Unique Value Proposition
        [Why BSI's solution is superior, mentioning relevant accolades or partnerships]

        ## [Pain Point 2 Name]
        ### Issue Summary
        [Brief description of the pain point]
        ### BSI Solution
        [Detailed description of how BSI can address this pain point]
        ### Unique Value Proposition
        [Why BSI's solution is superior, mentioning relevant accolades or partnerships]

        [Continue for all identified pain points]

        # BSI's Competitive Advantages
        [List and explain BSI's key competitive advantages relevant to this client's needs, including:
        - Dell Technologies Data Centre Partner of the Year in EMEA
        - Dell Tech Storage Partner of the Year
        - Largest NVIDIA GPU supplier in Europe
        - Partnerships with Dell and NVIDIA
        - Any other relevant accolades or capabilities]

        # Proposed Solution Stack
        [Overview of the proposed BSI solution stack tailored to the client's needs]

        # Implementation Roadmap
        [High-level roadmap for implementing the proposed solutions]

        # Expected Outcomes
        [Description of the expected improvements and benefits for the client]

        # Next Steps
        [Suggested next steps for engaging with the client and moving forward with the proposal]

        This report will provide a compelling case for how BSI's unique capabilities and partnerships make them the ideal partner to address the client's hardware-related pain points and drive technological transformation.
        """,
        output_file=f"/output/{company_name}/{current_run}/solution-mapping.txt",
        agent=solution_matcher,
        callback=utils.create_callback(company_name, current_run, "solution_mapping", supabase_url, supabase_key)
    )
    return match_solutions

def get_create_outreach_messages(position_to_contact, company_name, current_run, outreach_message_creator, supabase_url, supabase_key):
    create_outreach_messages = Task(
        description=f"Create a compelling LinkedIn message and email for the {position_to_contact} of {company_name}, based on the solution mapping provided and the key phrases provided. Do not replace anything within curly brackets, leave it as a placeholder for a human to fill out. Ensure the messages are concise, persuasive, and tailored to resonate with a high-level executive.",
        expected_output="""
        A markdown file containing two sections and includes the following key phraess:
        
        ### BSI Accolades
        - Dell Technologies Data Centre Partner of the Year in EMEA
        - Dell Tech Storage Partner of the Year
        - Largest NVIDIA GPU Supplier in Europe

        ### Partnerships
        - Partners of Dell and NVIDIA

        ### Cost Advantage
        - "Cost advantage for AI infrastructure"

        ### Professional Introductions
        - Global specialist IT supplier, Europe’s largest for Dell & NVIDIA
        - 37 years in financial sector
        - Partnered with all major server, storage, and networking manufacturers

        ### Call to Action
        - Interested in a quick 15 minute call?
        - Can BSI assist with hardware or AI projects?
        - Explore collaboration opportunities

        The output template:

        # LinkedIn Message

        Subject: [Concise, attention-grabbing subject line]

        Dear {Name of Person to Contact},

        [2-3 sentences that:
        - Establish a personal connection or show understanding of their company's challenges
        - Highlight 1-2 key pain points identified and how BSI can uniquely address them
        - Include a clear, low-commitment call to action]

        {Your Name}
        {Your Position at BSI}

        # Email

        Subject: [Compelling subject line that hints at value proposition]

        Dear {Name of Person to Contact},

        [Opening paragraph: 1-2 sentences that grab attention and establish relevance]

        [Body paragraph: 2-3 sentences that:
        - Briefly outline the top 2-3 pain points identified
        - Highlight BSI's unique capabilities to address these issues, mentioning key partnerships and accolades.
        - Provide a tantalizing hint at potential outcomes or benefits]

        [Closing paragraph: 1-2 sentences with a clear, specific call to action]

        [Professional sign-off]

        {Your Name}
        {Your Position at BSI}

        Key aspects of both messages:
        - Personalization: Reference to the recipient's company and role
        - Conciseness: Keep the LinkedIn message under 150 words and the email under 200 words
        - Value proposition: Clear articulation of how BSI can solve their specific problems
        - Credibility: Subtle mention of relevant BSI accolades or partnerships
        - Call to Action: Clear, low-pressure next step (e.g., quick call, demo, or meeting)
        - Tone: Professional, confident, and solution-oriented
        """,
        output_file=f"/output/{company_name}/{current_run}/outreach-messages.txt",
        agent=outreach_message_creator,
        callback=utils.create_callback(company_name, current_run, "outreach_messages", supabase_url, supabase_key)
    )
    return create_outreach_messages