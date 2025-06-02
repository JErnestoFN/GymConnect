# GymConnect

GymConnect es una plataforma social para entusiastas del fitness que permite conectar con otros usuarios, registrar actividades físicas, participar en grupos y retos, y compartir tu progreso.

## Requisitos previos

- Node.js >= 18.x
- npm >= 9.x

## Instalación y ejecución local

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/gymconnect.git
   cd gymconnect
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido (ajusta según tu entorno):
   ```env
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/gymconnect"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="tu-secreto-seguro"
   ```

4. **Configura la base de datos:**
   ```bash
   npx prisma db push
   ```

5. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

6. **Abre [http://localhost:3000](http://localhost:3000) en tu navegador.**

---

## Estructura del proyecto y buenas prácticas

- **Modularidad:**
  - Todos los modelos de datos (usuarios, grupos, actividades, logros, etc.) están implementados usando **clases** (POO) y se encuentran en la carpeta `/src/models` o como helpers en cada módulo.
  - La lógica de negocio y manipulación de datos está separada de los componentes visuales.
  - Los componentes de React están organizados en `/src/app/_components` y cada uno en su propio archivo.

- **Ejemplo de modelo POO:**
  - El archivo `src/models/User.ts` define la clase `User`, que centraliza la lógica y estructura de los usuarios, con métodos útiles para mostrar información y calcular fechas.

- **Carpetas principales:**
  - `/src/app`: Páginas y componentes principales de la aplicación.
  - `/src/models`: Modelos de datos orientados a objetos.
  - `/src/services`: Servicios para interactuar con la API o lógica de negocio.
  - `/prisma`: Esquema de la base de datos y migraciones.

---

## Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz fork del repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Haz commit de tus cambios: `git commit -m 'Añadir nueva funcionalidad'`
4. Envía tu rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
