import express, { Application, Request, Response } from 'express';
import routesLibros from '../routes/libros';
import db from '../db/connection';

class Server {
  private app: Application;
  private port: string; 

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3001';
    this.listen();
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicacion corriendo en el puerto: ${this.port}`);
    })
  }

  routes() {
    this.app.get('/', (req: Request, res: Response) => {
      res.json({
        msg: 'API Working'
      });
    })
    this.app.use('/api/libros', routesLibros)
  }

  middlewares() {
    this.app.use(express.json())
  }

  async dbConnect() {
    try {
      await db.authenticate()
      console.log('Base de datos conectada');
    } catch(error) {
      console.log(error);
      console.log('Error al conectar a la base de datos');
    }
    
  }
}

export default Server;