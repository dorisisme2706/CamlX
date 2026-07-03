from pydantic import BaseModel, Field

class EmotionLogCreate(BaseModel):
    user_id: str
    slider_value: float = Field(..., ge=0.0, le=1.0, description="Giá trị thanh kéo Radiant")