import express, { Application, Request, Response } from 'express';
import routesLibros from '../routes/LibrosRoutes';
import db from '../db/Connection';
import { Venta, LibrosVendidos } from './VentasModel';
import { Cliente, ClienteCarrito, ClienteCompras, ClienteFavoritos } from './ClientesModel';
import libroModel from './LibrosModel';

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
      console.log(`Aplicacion corriendo en: http://localhost:${this.port}`);
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
      await db.authenticate();
      console.log('Base de datos conectada');
      await libroModel.sync();
      await Cliente.sync();
      await ClienteCarrito.sync();
      await ClienteCompras.sync();
      await ClienteFavoritos.sync();
      await Venta.sync();
      await LibrosVendidos.sync();
      console.log('Modelos sincronizados correctamente');
    } catch(error) {
      console.log(error);
      console.log('Error al conectar a la base de datos o sincronizar los modelos');
    }
    
  }
}

export default Server;