import express from 'express';
import logger from 'morgan';
import { Server } from 'socket.io';
import { createServer } from 'node:http'; // Compatibilidad: Se junta con createServer para permitir que el mismo servidor maneje tanto solicitudes HTTP como conexiones WebSocket.

import dotenv from 'dotenv';
import { createClient } from '@libsql/client';


dotenv.config(); // Módulo dotenv está diseñado para cargar automáticamente las variables de entorno definidas en un archivo .env en process.env
const port = process.env.PORT ?? 1234;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {
    maxDisconnectionTime: 120000, // Tiempo máximo de desconexión permitido en milisegundos (2 minutos)
  }});

const db = createClient({
  url: "libsql://warm-professor-monster-thedavid0326.turso.io",
  authToken: process.env.DB_TOKEN
})

await db.execute(`CREATE TABLE IF NOT EXISTS messages(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  username TEXT)`)

io.on('connection', async (socket) => { // El callback recibe un socket como argumento, de tipo Socket<DefaultEventsMap, ...>. Esta función no devuelve nada (void) y simplemente maneja los eventos de conexión.
  console.log('An user has connected!')

  socket.on('disconnect', () => {
  console.log('An user has disconnected!')
  })

  socket.on('chat message', async (msg) => {
    // Con "io.emit", envía el mensaje a todos los clientes, incluido el remitente
    console.log('message', msg);
    let result;
    try {
      result= await db.execute({
        sql: `INSERT INTO messages(content, username) VALUES(:message, :username)`,
        args: {message: msg, username: socket.handshake.auth.username ?? 'Anonymous'}
      })
    } catch (error) {
      console.error('Error:', error);
      return;
    }
    
    io.emit('chat message', msg, result.lastInsertRowid.toString(), socket.handshake.auth.username ?? 'Anonymous');

    // Envía el mensaje solo al cliente que lo envió
    // socket.emit('chat message', 'Tu mensaje ha sido recibido: ' + msg);

    // Opcional: Envía un mensaje de confirmación a todos los demás clientes excepto al remitente
    // socket.broadcast.emit('chat message', 'Nuevo mensaje de un usuario');

  })

  
  if (!socket.recovered){
    const results= await db.execute({
      sql: 'SELECT id, content, username FROM messages WHERE id > :id',
      args: {id:socket.handshake.auth.serverOffset ?? 0 } // Viene del cliente socket = io({auth: {serverOffset: 0    });
        })
      results.rows.forEach(row =>{
        socket.emit('chat message', row.content, row.id.toString(), row.username)
      })
  }
})



app.use(logger('dev'));
// Da información cómo: "GET / 304 8.720 ms - -""

app.get("/", (req, res) => {
  res.sendFile(process.cwd()+'/client/index.html')
})

server.listen(port, () =>{
  console.log(`Server listening on http://localhost:${port}`)
})