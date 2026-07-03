import asyncio
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()

async def test_connection():
    try:
        conn = await asyncpg.connect(os.getenv("DATABASE_URL"))
        print("✅ Kết nối Database thành công!")
        await conn.close()
    except Exception as e:
        print(f"❌ Kết nối thất bại: {e}")

asyncio.run(test_connection())