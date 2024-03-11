from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.products import router as products_router
from app.dependencies import FirebaseAdmin
from app.database import db_manager

class FastAPIApp:
    def __init__(self, title: str, origins: list, firebase_key_path: str):
        self.app = FastAPI(title=title)
        self.origins = origins
        self.setup_firebase_admin(firebase_key_path)
        self.configure_cors()
        self.include_routers()

    def setup_firebase_admin(self, service_account_key_path: str):
        FirebaseAdmin(service_account_key_path)

    def configure_cors(self):
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=self.origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    def include_routers(self):
        self.app.include_router(
            products_router,
            prefix="/api",
            tags=["products"],
        )

    async def connect_to_db(self):
        await db_manager.connect_to_db()
        db_manager.create_tables()

    async def disconnect_from_db(self):
        await db_manager.disconnect_from_db()

origins = ["http://localhost:3001"]
firebase_key_path = "./serviceAccountKey.json"
fastapi_instance = FastAPIApp("My FastAPI Application", origins, firebase_key_path)
app = fastapi_instance.app

@app.on_event("startup")
async def startup_event():
    # Connect to the database and create tables if needed
    await fastapi_instance.connect_to_db()
    # Optional: fastapi_instance.create_tables() if you have a method for this

@app.on_event("shutdown")
async def shutdown_event():
    # Disconnect from the database
    await fastapi_instance.disconnect_from_db()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
