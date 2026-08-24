from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class login(SQLModel):
    user: str
    contraseña: str

Base = [
    login(user="Katty", contraseña="123"),
    login(user="Kata", contraseña="456"),
    login(user="Cris", contraseña="789")
]

class Credenciales(SQLModel):
    user: str
    contraseña: str


@app.post("/login")
def login(data: Credenciales):
    for u in Base:
        if u.user == data.user and u.contraseña == data.contraseña:
            return {"mensaje": "Login Exitoso"}
    return {"mensaje": "Acceso denegado"}