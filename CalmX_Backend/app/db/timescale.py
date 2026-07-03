import asyncpg
import os

# Bạn nên để DATABASE_URL trong file .env
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/calmx_db")

async def get_db_pool():
    return await asyncpg.create_pool(DATABASE_URL)

async def save_emotion_log(user_id: str, value: float):
    pool = await get_db_pool()
    async with pool.acquire() as conn:
        await conn.execute(
            "INSERT INTO emotion_logs(user_id, slider_value, timestamp) VALUES($1, $2, NOW())",
            user_id, value
        )
    await pool.close()