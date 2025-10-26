# Conexión Backend (Django) ↔ Frontend (React) — Despliegue y desarrollo

Resumen
- En desarrollo:
  - Ejecuta Django en http://localhost:8000
  - Ejecuta React en http://localhost:3000
  - frontend/package.json incluye un patch para añadir "proxy": "http://localhost:8000" para redirigir llamadas a /api/*.
  - Usa la instancia axios en frontend/src/api.js para llamadas a la API: api.get('/endpoint') -> http://localhost:8000/api/endpoint

- En producción (opción seleccionada: servidor único):
  - Pasos:
    1. Desde /frontend: npm ci && npm run build
    2. Ajusta CLIENT_URL en entorno si necesitas (para CORS_ALLOWED_ORIGINS)
    3. Ejecuta tu servidor Django (ej: gunicorn) que usará WhiteNoise para servir los assets compilados:
       gunicorn PROYECTO_FINORA.wsgi:application --bind 0.0.0.0:8000
  - El servidor servirá archivos estáticos desde frontend/build/static y devolverá index.html para rutas no /api/.

Dependencias nuevas a instalar (añadir a requirements.txt o instalar en tu entorno):
- django-cors-headers==4.0.0
- whitenoise==6.5.0

Comandos útiles
- Desarrollo frontend:
  cd frontend
  npm install
  npm start

- Desarrollo backend:
  pip install -r requirements.txt
  python manage.py migrate
  python manage.py runserver 8000

- Producción (build frontend y servir con Django + WhiteNoise):
  cd frontend
  npm ci
  npm run build
  # luego desplegar Django como de costumbre (ej. gunicorn)
  python manage.py collectstatic  # opcional si quieres usar STATIC_ROOT

Notas sobre seguridad/cookies
- Si usas cookies para auth: asegúrate de CORS_ALLOW_CREDENTIALS = True y en axios withCredentials: true
- En producción usa HTTPS y cookies con Secure y SameSite según sea necesario

---