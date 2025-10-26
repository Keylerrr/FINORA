"""
Configuración de Django para el backend de FINORA.
Usa Django REST Framework, CORS Headers y base de datos SQLite.
"""

from pathlib import Path

# RUTA BASE
BASE_DIR = Path(__file__).resolve().parent.parent

# ===============================================
# CONFIGURACIONES BÁSICAS
# ===============================================

SECRET_KEY = 'django-insecure-fr%j&5^7$liz6knlc(y+f+f7k$kygjo7glx1h+2kidrwmvsdz^'

DEBUG = True  # Mantén True solo en desarrollo

ALLOWED_HOSTS = []  # En producción, pon tu dominio o IP

# ===============================================
# APLICACIONES INSTALADAS
# ===============================================

INSTALLED_APPS = [
    # Django apps básicas
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Terceros
    'rest_framework',          # Django REST Framework
    'corsheaders',             # Permitir peticiones desde el frontend

    # Apps propias
    'api',                     # Tu app donde crearás los modelos y endpoints
]

# ===============================================
# MIDDLEWARE
# ===============================================

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Debe ir primero
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'finora_backend.urls'

# ===============================================
# TEMPLATES
# ===============================================

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # Si usas plantillas HTML, las pones aquí
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'finora_backend.wsgi.application'

# ===============================================
# BASE DE DATOS (SQLite)
# ===============================================

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'finora.db',   # Nombre del archivo SQLite
    }
}

# ===============================================
# VALIDACIÓN DE CONTRASEÑAS
# ===============================================

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

# ===============================================
# INTERNACIONALIZACIÓN
# ===============================================

LANGUAGE_CODE = 'es-co'  # Español Colombia

TIME_ZONE = 'America/Bogota'

USE_I18N = True
USE_TZ = True

# ===============================================
# ARCHIVOS ESTÁTICOS
# ===============================================

STATIC_URL = 'static/'

# ===============================================
# DJANGO REST FRAMEWORK CONFIG
# ===============================================

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # Permite acceso sin auth (solo desarrollo)
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',  # JSON por defecto
    ]
}

# ===============================================
# CORS CONFIG (permite conexión con tu frontend Vite)
# ===============================================

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Si quieres permitir todo durante desarrollo:
# CORS_ALLOW_ALL_ORIGINS = True

# ===============================================
# OTRAS CONFIGURACIONES
# ===============================================

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'