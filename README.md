# Proyecto de Chat en Tiempo Real

Este es un proyecto de chat en tiempo real utilizando Node.js, Express, Socket.IO, y otras tecnologías. Permite a los usuarios enviar y recibir mensajes en tiempo real.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework web para Node.js, utilizado para manejar las rutas y solicitudes HTTP.
- **Socket.IO**: Biblioteca que permite la comunicación en tiempo real entre clientes y servidores.
- **dotenv**: Módulo para cargar variables de entorno desde un archivo `.env`.
- **@libsql/client**: Cliente para interactuar con una base de datos SQL.
- **morgan**: Middleware de registro de solicitudes HTTP para Node.js.

## Aprendizajes Clave

1. **Configuración del Servidor**:
   - Utilización de `createServer` de Node.js para manejar tanto solicitudes HTTP como conexiones WebSocket.

2. **Gestión de Variables de Entorno**:
   - Uso de `dotenv` para cargar automáticamente las variables de entorno definidas en un archivo `.env`.

3. **Conexión y Recuperación de Estado con Socket.IO**:
   - Implementación de `connectionStateRecovery` para permitir que los usuarios se reconecten sin perder sus mensajes enviados previamente.

4. **Interacción con Base de Datos SQL**:
   - Creación de tablas y ejecución de consultas SQL utilizando `@libsql/client`.

5. **Manejo de Eventos en Tiempo Real**:
   - Uso de Socket.IO para manejar eventos de conexión, desconexión y mensajes de chat en tiempo real.

6. **Frontend Interactivo**:
   - Uso de JavaScript y Socket.IO en el frontend para actualizar la interfaz de usuario con mensajes en tiempo real.

  ## Cómo Empezar

1. **Instalación de Dependencias**:
   ```bash
   npm install
   ```
2. **Configuración de Variables de Entorno:**:
Crea un archivo .env en la raíz del proyecto y define las siguientes variables:

```
PORT=1234
DB_TOKEN=tu_token_de_autenticación
```
3. **Ejecución del Servidor:**:

```bash
npm run dev
```
4. **Acceso a la Aplicación:**:
Abre tu navegador y accede a http://localhost:1234.

  ## Estructura del Proyecto
```
├── client
│   └── index.html
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Licencia

Este proyecto está bajo la [Licencia MIT](https://opensource.org/licenses/MIT).

## Conclusión

Este proyecto de chat en tiempo real ha sido una buena experiencia de aprendizaje. Desde la configuración del servidor hasta la implementación de conexiones en tiempo real y la interacción con la base de datos, he adquirido valiosas habilidades que podré aplicar en futuros proyectos.

Gracias por visitar mi repositorio. ¡Espero que te sea útil este proyecto !
