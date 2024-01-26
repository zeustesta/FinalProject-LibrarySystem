import { Request, Response } from "express";
import { Cliente, ClienteCarrito, ClienteCompras, ClienteFavoritos } from "../models/ClientesModel";

//METODOS PARA CLIENTE

export const getClientes = async (req: Request, res: Response) => {
  const listaClientes = await Cliente.findAll();
  res.json(listaClientes);
} 

export const getCliente = async (req: Request, res: Response) => {
  const { idCliente } = req.params;
  const cliente = await Cliente.findByPk(idCliente);

  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({
      msg: `No existe un cliente con id: ${idCliente}`
    });
  }
} 

export const deleteCliente = async (req: Request, res: Response) => {
  const { idCliente } = req.params;
  const cliente = await Cliente.findByPk(idCliente);

  if (!cliente) {
    res.status(404).json({
      msg: `No existe un cliente con id: ${idCliente}`
    });
  } else {
    await cliente.destroy();
    res.json({
      msg: 'Cliente eliminado con exito'
    });
  }
} 

export const postCliente = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Cliente.create(body);
    res.json({
      msg: 'Cliente agregado con exito'
    });
  } catch (error) {
    console.log(error);
    console.log('No se ha podido agregar el cliente');
  }
} 

export const updateCliente = async (req: Request, res: Response) => {
  const { body } = req;
  const { idCliente } = req.params;

  try {
    const cliente = await Cliente.findByPk(idCliente);
  
    if (!cliente) {
      res.status(404).json({
        msg: `No existe un cliente con id: ${idCliente}`
      });
    } else {
      await cliente.update(body);
      res.json({
        msg: 'Cliente actualizado con exito'
      });
    }
  } catch (error) {
    console.log(error);
    console.log('No se ha podido actualizar el cliente');
  }
} 

//METODOS PARA FAVORITOS

export const getFavoritos = async (req: Request, res: Response) => {
  const { idCliente } = req.params;

  const favoritos = await ClienteFavoritos.findAll({
    where: {
      idCliente: idCliente,
    },
  });
  if (favoritos.length > 0) {
    res.json(favoritos);
  } else {
    res.status(404).json({
        msg: `No existen favoritos para el cliente con id: ${idCliente}`
    });
  }
}

export const deleteLibroFavoritos = async (req: Request, res: Response) => {
  const { idCliente } = req.params;
  const { idLibro } = req.params;

  const libroEnFavoritos = await ClienteFavoritos.findOne({
    where: {
      idCliente: idCliente,
      idLibro: idLibro,
    },
  });
  if (libroEnFavoritos) {
    await ClienteFavoritos.destroy({
      where: {
          idCliente: idCliente,
          idLibro: idLibro,
      },
    });
    res.json({
      msg: `Libro eliminado de favoritos del cliente con id: ${idCliente}`,
    });
  } else {
    res.status(404).json({
      msg: `El libro no existe en favoritos del cliente con id: ${idCliente}`,
    });
  }
}

//METODOS PARA CARRITO

export const getCarrito = async (req: Request, res: Response) => {
  const { idCliente } = req.params;

  const carrito = await ClienteCarrito.findAll({
    where: {
      idCliente: idCliente,
    },
  });
  if (carrito.length > 0) {
    res.json(carrito);
  } else {
    res.status(404).json({
        msg: `No existe un carrito para el cliente con id: ${idCliente}`
    });
  }
}

export const deleteLibroCarrito = async (req: Request, res: Response) => {
  const { idCliente } = req.params;
  const { idLibro } = req.params;

  const libroEnCarrito = await ClienteCarrito.findOne({
    where: {
      idCliente: idCliente,
      idLibro: idLibro,
    },
  });
  if (libroEnCarrito) {
    await ClienteCarrito.destroy({
      where: {
          idCliente: idCliente,
          idLibro: idLibro,
      },
    });
    res.json({
      msg: `Libro eliminado del carrito del cliente con id: ${idCliente}`,
    });
  } else {
    res.status(404).json({
      msg: `El libro no existe en el carrito del cliente con id: ${idCliente}`,
    });
  }
}

//METODOS PARA COMPRAS

export const getCompras = async (req: Request, res: Response) => {
  const { idCliente } = req.params;

  const compras = await ClienteCompras.findAll({
    where: {
      idCliente: idCliente,
    },
  });
  if (compras.length > 0) {
    res.json(compras);
  } else {
    res.status(404).json({
        msg: `No existen compras para el cliente con id: ${idCliente}`
    });
  }
}

export const postCompra = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await ClienteCompras.create(body);
    res.json({
      msg: 'Compra registrada con exito'
    });
  } catch (error) {
    console.log(error);
    console.log('No se ha podido agregar la compra');
  }
} 

// export const deleteCompra = async (req: Request, res: Response) => {
//   const { idCliente } = req.params;
//   const { idCompra } = req.params;

//   const compra = await ClienteCompras.findOne({
//     where: {
//       idCliente: idCliente,
//       idLibro: idLibro,
//     },
//   });
//   if (libroEnCarrito) {
//     await ClienteCarrito.destroy({
//       where: {
//           idCliente: idCliente,
//           idLibro: idLibro,
//       },
//     });
//     res.json({
//       msg: `Libro eliminado del carrito del cliente con id: ${idCliente}`,
//     });
//   } else {
//     res.status(404).json({
//       msg: `El libro no existe en el carrito del cliente con id: ${idCliente}`,
//     });
//   }
// } 
