## Instrucciones de despliegue

Sigue estos pasos para instalar y ejecutar el proyecto en un entorno local.

### Estructura de directorios del proyecto

online-store-app/
├── online-store-api/    # Backend Laravel
└── online-store/        # Frontend React

### Inicio rápido

# Backend
cd online-store-app/online-store-api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve

# Frontend
cd ../online-store
npm install
npm run dev


### Requisitos previos

- PHP >= 8.x
- Composer
- Node.js >= 18.x
- MySQL
- Git

Si necesitas mejor las instrucciones a continuación esta mejor explicado. 

### 1. Clonar el repositorio

git clone https://github.com/lidio-dev/online-store-app.git

### 2. Configurar el Backend (Laravel)

cd online-store-app/online-store-api
composer install
cp .env.example .env

1. Editar el archivo .env para configurar la base de datos:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_base_datos
DB_USERNAME=usuario
DB_PASSWORD=contraseña

2. Generar la clave de la aplicación:
php artisan key:generate

3. Migrar la base de datos y ejecutar seeders:
php artisan migrate --seed

4. Iniciar el servidor de Laravel:
php artisan serve

5. El backend estará disponible en:
http://127.0.0.1:8000

### 3. Configurar el Frontend (React)

cd ../online-store
npm install
npm run dev

1. El frontend estará disponible en:
http://127.0.0.1:5173