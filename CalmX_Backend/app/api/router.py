from fastapi import APIRouter
from app.api.endpoints import emotion

api_router = APIRouter()

api_router.include_router(emotion.router, prefix="/emotion", tags=["emotion"])