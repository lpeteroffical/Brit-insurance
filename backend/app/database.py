# database.py

from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from databases import Database
from sqlalchemy.sql import select, func

class DatabaseManager:
    DATABASE_URL = "sqlite:///./mydb.db"
    database = Database(DATABASE_URL)

    def __init__(self):
        self.engine = create_engine(self.DATABASE_URL, connect_args={"check_same_thread": False})
        self.metadata = MetaData()
        self.database = Database(self.DATABASE_URL)
        self.Base = declarative_base()
        self.products_table = Table(
            "products",
            self.metadata,
            Column("id", Integer, primary_key=True),
            Column("name", String),
            Column("price", Float),
            Column("user_id", String),
        )

    async def connect_to_db(self):
        await self.database.connect()

    async def disconnect_from_db(self):
        await self.database.disconnect()

    def create_tables(self):
        self.metadata.create_all(bind=self.engine)

    async def add_product(self, name: str, price: float, user_id: str):
        query = self.products_table.insert().values(name=name, price=price, user_id=user_id)
        last_record_id = await self.database.execute(query)
        return {"name": name, "price": price, "user_id": user_id, "id": last_record_id}

    async def get_products_by_user(self, user_id: str):
        query = self.products_table.select().where(self.products_table.c.user_id == user_id)
        return await self.database.fetch_all(query)

    async def remove_product(self, product_id: int, user_id: str):
        query = self.products_table.delete().where(
            (self.products_table.c.id == product_id) & (self.products_table.c.user_id == user_id)
        )
        await self.database.execute(query)

# Instantiate DatabaseManager to use in your FastAPI app
db_manager = DatabaseManager()
