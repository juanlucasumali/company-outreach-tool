# AI-Powered Company Outreach Tool

[<img width="1034" alt="Screenshot 2024-07-13 at 2 47 49 AM" src="https://github.com/user-attachments/assets/cdaa04c0-a023-4690-a37c-c9f718307e01">](https://youtu.be/_z_-C78aBIQ)
[Link to demo!](https://youtu.be/_z_-C78aBIQ)

## Project Overview
This project is a proof-of-concept AI-driven company outreach tool that automates the process of generating personalized business communications. It leverages Meta's Llama 70 LLM via Groq's fast AI inference API in concurrance with crewAI, a platform for multi AI agents systems. At a high level, this tool executes an agentic workflow that 1. analyzes company websites, 2. identifies pain points, 3. maps company-specific solutions to pain points, and 4. creates tailored outreach messages for potential clients or partners.

## Key Features
- Web scraping of target company websites
- AI-powered analysis of company information
- Automated identification of business pain points
- Generation of customized solution proposals
- Creation of personalized outreach messages (LinkedIn and email)
- Real-time progress tracking and result display

## Technology Stack

### Frontend
- Next.js 13 (React framework)
- TypeScript
- Tailwind CSS for styling
- React Hooks for state management

### Backend
- FastAPI (Python web framework)
- Langchain for AI model integration
- CrewAI for orchestrating multiple AI agents
- Groq API for accessing large language models

### Database and Real-time Updates
- Supabase for database and real-time subscriptions

### AI and Machine Learning
- Groq's LLaMA 3 70B model for natural language processing tasks

### Cloud Infrastructure and Deployment
- Vercel for frontend hosting and deployment
- Google Cloud Run for serverless backend deployment
- Google Cloud Build for CI/CD pipeline

### Development and Version Control
- Git for version control
- GitHub for repository hosting

## Architecture Highlights
- Microservices architecture with separate frontend and backend services
- Frontend deployed on Vercel for optimal performance and easy updates
- Serverless backend deployment on Google Cloud Run for scalability and cost-efficiency
- Real-time data synchronization between backend processes and frontend UI
- Asynchronous task processing for handling long-running AI operations

## Key Integrations
- Integration with Groq's API for accessing state-of-the-art language models
- Supabase integration for real-time database updates and secure data storage
- Custom web scraping solution for gathering company information

## Development Process
- Agile development methodology
- Continuous Integration and Continuous Deployment (CI/CD) with Vercel for frontend and Google Cloud Build for backend
- Emphasis on modular and reusable code structures

## Challenges and Solutions
- Designed a flexible agent system using CrewAI to break down complex tasks into manageable subtasks
- Optimized API requests to balance performance and cost when interacting with AI models
