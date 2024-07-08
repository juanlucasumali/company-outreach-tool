<p align="center">
  <a href="https://nextjs-fastapi-starter.vercel.app/">
    <h3 align="center">Company Outreach Tool</h3>
  </a>
</p>

<p align="center">Automate away!</p>

<br/>

## Introduction

This is a hybrid Next.js + Python app that uses Next.js as the frontend and FastAPI as the API backend to run CrewAI. Output files are stored in the `output` directory at root level.

## How It Works

1. Input your Groq API key, a website URL, and a position.
2. Press the 'Generate your messages' button and wait ~3 minutes for all four outputs to appear in the `output` directory.

## Getting Started

1. Clone and `cd` into the repo:

```bash
git clone https://github.com/juanlucasumali/company-outreach-tool.git
cd company-outreach-tool
```
2. (Recommended: activate a virtual enviornment/conda environment before proceeding.) Install dependencies:

```bash
npm install
```

3. Then, run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

5. Happy automating!
