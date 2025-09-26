from fastapi import FastAPI
from sqlmodel import SQLModel

app = FastAPI()

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