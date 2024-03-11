from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List
from app.dependencies import UserDependency
from app.database import db_manager  # Import the db_manager instance

class ProductCreate(BaseModel):
    name: str
    price: float

class ProductResponse(BaseModel):
    id: int
    name: str
    price: float

router = APIRouter()

@router.post("/products", response_model=ProductResponse)
async def add_product(product: ProductCreate, user: dict = Depends(UserDependency.get_current_user)):
    try:
        return await db_manager.add_product(product.name, product.price, user['uid'])
    except Exception as e:
        print(f"Error adding product: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/products", response_model=List[ProductResponse])
async def read_products(user: dict = Depends(UserDependency.get_current_user)):
    try:
        print("Fetching products, user id:", user['uid'])
        products = await db_manager.get_products_by_user(user['uid'])
        if not products:
            print("No products found: 404")
            raise HTTPException(status_code=404, detail="No products found")
        products_models = [ProductResponse(**dict(product)) for product in products]
        print("Fetched products as models:", products_models)
        return products_models
    except HTTPException as he:  # Re-raise the 404 error
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/products/{product_id}")
async def remove_product(product_id: str, user: dict = Depends(UserDependency.get_current_user)):
    # Convert product_id from string to int, handling any conversion error
    try:
        print(f"Error removing product: {product_id}")
        product_id_int = int(product_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid product ID format. Product ID must be an integer.")

    try:
        # Call the database function to delete the product by ID
        delete_result = await db_manager.remove_product(product_id=product_id_int, user_id=user['uid'])

        if not delete_result:
            raise HTTPException(status_code=404,
                                detail="Product not found or user is unauthorized to delete this product.")

        return {"message": "Product successfully deleted"}
    except HTTPException as e:
        # Re-raise HTTPException to ensure it's properly handled by FastAPI
        raise e
    except Exception as e:
        # Catch-all for any other unexpected errors
        print(f"Error removing product: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@router.get("/products/total")
async def get_total_cost(user: dict = Depends(UserDependency.get_current_user)):
    try:
        products = await db_manager.get_products_by_user(user['uid'])
        total_cost = sum(product.price for product in products)
        return {"total_cost": total_cost}
    except Exception as e:
        print(f"Error getting total cost: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
