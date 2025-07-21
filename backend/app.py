# app.py
# Main FastAPI app entry point.
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import content

app = FastAPI()

# Allow frontend dev server (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only; restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(content.router) 