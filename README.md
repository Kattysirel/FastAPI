# FastAPI

API básica de login hecha con **FastAPI** y **SQLModel**: valida un usuario y contraseña contra
una lista fija en memoria (sin base de datos real) y devuelve si el acceso fue exitoso o denegado.

- **Endpoint**: `POST /login`
- **Body**: `{ "user": "Katty", "contraseña": "123" }`
- **Respuesta**: `{ "mensaje": "Login Exitoso" }` o `{ "mensaje": "Acceso denegado" }`

Usuarios de prueba definidos en el propio código: `Katty/123`, `Kata/456`, `Cris/789`.

Esta actividad ayudó a entender cómo funciona una API básica de login y la validación de
usuarios con FastAPI y SQLModel.

## Cómo correr el backend

```bash
python -m venv .venv
.venv\Scripts\activate     # en Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Queda disponible en `http://127.0.0.1:8000`.

## Interfaz web

El repo incluye una **demo interactiva** ([`app/`](./app)) hecha con React + TypeScript: un
formulario de login que llama directamente al endpoint `/login` del backend y muestra el
resultado (éxito o acceso denegado) con una paleta de colores cálida y elementos suaves
(gradientes, bordes redondeados, sombras difuminadas).

### Cómo correrla

Con el backend corriendo en `http://127.0.0.1:8000` (ver arriba):

```bash
cd app
npm install
npm run dev
```

Abre la URL que muestra la terminal (por defecto `http://localhost:5173`).

## Capturas

**Login exitoso** — al ingresar un usuario y contraseña válidos (por ejemplo `Katty` / `123`).

![Login exitoso](./docs/login-exitoso.png)

**Acceso denegado** — con credenciales incorrectas.

![Acceso denegado](./docs/acceso-denegado.png)
