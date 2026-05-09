import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from api.routes import health, agents, predictions, blockchain

load_dotenv()

app = FastAPI(
    title="HerChain AI Backend",
    description="AI-powered women's healthcare API with agentic workflow, ML prediction, and blockchain verification",
    version="1.0.0",
)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api/health", tags=["Health"])
app.include_router(agents.router, prefix="/api/agents", tags=["AI Agents"])
app.include_router(predictions.router, prefix="/api/predictions", tags=["ML Predictions"])
app.include_router(blockchain.router, prefix="/api/blockchain", tags=["Blockchain"])


@app.get("/")
async def root():
    return {
        "name": "HerChain AI Backend",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "docs": "/docs",
            "health": "/api/health",
            "agents": "/api/agents/chat",
            "predictions": "/api/predictions/predict",
            "blockchain": "/api/blockchain/verify",
        },
    }
