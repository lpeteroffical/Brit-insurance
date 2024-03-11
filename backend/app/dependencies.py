# Filename: dependencies.py

from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import firebase_admin
from firebase_admin import credentials, auth

class FirebaseAdmin:
    def __init__(self, service_account_key_path: str):
        self.cred = credentials.Certificate(service_account_key_path)
        firebase_admin.initialize_app(self.cred)

class UserDependency:
    security = HTTPBearer()

    @classmethod
    def get_current_user(cls, credentials: HTTPAuthorizationCredentials = Security(security)):
        try:
            token = credentials.credentials
            decoded_token = auth.verify_id_token(token)
            return decoded_token
        except Exception as e:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
