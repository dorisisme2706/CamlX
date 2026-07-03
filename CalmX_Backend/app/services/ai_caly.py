from google import genai
import os
from dotenv import load_dotenv

# 1. Tải biến môi trường
load_dotenv()

# Khởi tạo Client
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

def generate_healing_advice(emotion_logs: list):
    if not emotion_logs:
        return "Chào cậu! Cậu thấy hôm nay thế nào, kéo thanh cảm xúc cho tớ biết với nhé!"

    # Lấy 5 giá trị gần nhất
    values = [log['value'] for log in emotion_logs[-5:]]
    
    prompt = f"""
    Bạn là Caly, một trợ lý tâm lý thấu cảm, dịu dàng của ứng dụng CalmX. 
    Người dùng có chỉ số cảm xúc (0.0 = Rất tiêu cực, 1.0 = Rất hạnh phúc) trong những lần check-in gần đây là: {values}.
    Hãy phân tích xu hướng này và đưa ra 1 lời khuyên ngắn gọn (dưới 25 chữ) bằng tiếng Việt.
    Giọng văn ân cần, ấm áp, xưng "tớ" và gọi người dùng là "cậu". Không dùng hashtag hay emoji.
    """
    
    try:
        # SỬ DỤNG MODEL THẾ HỆ MỚI (Năm 2026)
        response = client.models.generate_content(
            model='gemini-3.5-flash', # <--- Chìa khóa thành công nằm ở đây!
            contents=prompt
        )
        return response.text.strip()
    except Exception as e:
        return f"LỖI HỆ THỐNG AI: {str(e)}"