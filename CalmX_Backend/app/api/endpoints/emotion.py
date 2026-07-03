from fastapi import APIRouter
from app.models.emotion import EmotionLogCreate
from app.services.ai_caly import generate_healing_advice

router = APIRouter()

@router.post("/log")
async def log_emotion(data: EmotionLogCreate):
    # API lưu cảm xúc (Tạm thời in ra màn hình)
    print(f"Ghi nhận cảm xúc từ {data.user_id}: {data.slider_value}")
    return {"status": "success", "received_value": data.slider_value}

@router.get("/advice/{user_id}")
async def get_caly_advice(user_id: str):
    # Dữ liệu giả lập: Người dùng đang buồn (0.3), rồi vui lên (0.6), rồi lại hơi buồn (0.4)
    mock_logs = [
        {"value": 0.3}, {"value": 0.6}, {"value": 0.4}
    ]
    
    # Gửi dữ liệu này cho Gemini phân tích
    advice = generate_healing_advice(mock_logs)
    
    return {"advice": advice}