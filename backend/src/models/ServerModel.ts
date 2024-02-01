import express, { Application, Request, Response } from 'express';
import routesLibros from '../routes/LibrosRoutes';
import routesClientes from '../routes/ClientesRoutes';
import routesVentas from '../routes/VentasRoutes';
import db from '../db/connection';
import cors from 'cors';
import { Venta, LibrosVendidos } from './VentasModel';
import { Cliente, ClienteCarrito, ClienteFavoritos } from './ClientesModel';
import libroModel from './LibrosModel';
import { PORT } from '../config';

class Server {
  private app: Application;
  private port: string; 

  constructor() {
    this.app = express();
    this.port = PORT || '3001';
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
    this.app.use('/api/libros', routesLibros);
    this.app.use('/api/clientes', routesClientes);
    this.app.use('/api/ventas', routesVentas);
  }

  middlewares() {
    const corsOptions = {
      origin: 'http://localhost:4200', // Reemplaza con el dominio de tu frontend
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Habilita las cookies y credenciales de autorización
      optionsSuccessStatus: 204, // Responde con un 204 No Content para las solicitudes OPTIONS
    };

    this.app.use(express.json());
    this.app.use(cors(corsOptions));

    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*'); // O el dominio específico que estás usando
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });
  }

  async dbConnect() {
    try {
      await db.authenticate();
      console.log('Base de datos conectada');
      await libroModel.sync();
      await Cliente.sync();
      await ClienteCarrito.sync();
      await ClienteFavoritos.sync()
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