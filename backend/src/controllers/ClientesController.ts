import { Request, Response } from "express";
import { Cliente, ClienteCarrito, ClienteFavoritos } from "../models/ClientesModel";
import { Venta, LibrosVendidos } from "../models/VentasModel";
import Libro from "../models/LibrosModel";
import { updateStockLibroFunction } from "./LibrosController";

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
  console.log(body)

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

export const updateClienteRol = async (req: Request, res: Response) => {
  const { idCliente } = req.params;
  const { rol } = req.body;

  try {
    const cliente = await Cliente.findByPk(idCliente);
  
    if (!cliente) {
      res.status(404).json({
        msg: `No existe un usuario con id: ${idCliente}`
      });
    } else {
      cliente.set({ rol: rol });
      await cliente.save()
      res.json({
        msg: 'Usuario actualizado con exito'
      });
    }
  } catch (error) {
    res.status(404).json({
      msg: 'No se pudo actualizar el rol',
      error
    })
  }
} 

export const validarCliente = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const clienteEncontrado = await Cliente.findOne({
      where: {
        email: email,
        password: password 
      }
    });

    if (clienteEncontrado !== undefined && clienteEncontrado !== null) {
      res.json(clienteEncontrado);
    } else {
      res.json(null);
    }
  } catch (error) {
    res.status(404).json({
      msg: `No se pudo validar el cliente`,
      error
    });
  }
};

export const validarEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const emailEncontrado = await Cliente.findOne({
      where: {
        email: email
      }
    });

    if (emailEncontrado) {
      res.json({ msg: 'EXISTE' });
    } else {
      res.json({ msg: 'NO_EXISTE' });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: `No se pudo validar el email`,
      error
    });
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
    res.json([]);
  }
}

export const deleteLibroFavoritos = async (req: Request, res: Response) => {
  const { idCliente } = req.params;
  const { idLibro } = req.params;
  try {
    const libroEnFavoritos = await ClienteFavoritos.findOne({
      where: {
        idCliente: idCliente,
        idLibro: idLibro
      }
    });
    if (libroEnFavoritos) {
      await libroEnFavoritos.destroy();
      res.json({
        msg: `Libro eliminado de favoritos del cliente con id: ${idCliente}`
      });
    }
  } catch (error) {
    console.log(error);
    console.log('No se pudo eliminar el libro de favoritos');
  }
}

export const postLibroEnFavoritos = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await ClienteFavoritos.create(body);
    res.json({
      msg: 'Libro agregado a favoritos con exito'
    });
  } catch (error) {
    console.log(error);
    console.log('No se ha podido agregar el libro a favoritos');
  }
} 

//METODOS PARA CARRITO

export const getCarrito = async (req: Request, res: Response) => {
  const { idCliente } = req.params;

  const carrito = await getCarritoFunction(idCliente);
  if (carrito.length > 0) {
    res.json(carrito);
  } else {
    res.json([]);
  }
}

export async function getCarritoFunction (idCliente: string) {
  const carrito = await ClienteCarrito.findAll({
    where: {
      idCliente: idCliente,
    },
    attributes: ['idLibro']
  });
  if (carrito.length > 0) {
    return carrito;
  } else {
    return [];
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
    await libroEnCarrito.destroy();
    res.json({
      msg: `Libro eliminado del carrito del cliente con id: ${idCliente}`,
    });
  } else {
    res.status(404).json({
      msg: `El libro no existe en el carrito del cliente con id: ${idCliente}`,
    });
  }
}

export const postLibroEnCarrito = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const libro = await Libro.findByPk(body.idLibro);

    if (libro && libro.getDataValue('stock') > 0) {
        const clienteCart = await getCarritoFunction(body.idCliente);
        if ((clienteCart.find(item => item.getDataValue('idLibro') === body.idLibro)) === undefined) {
          const newStock = libro.getDataValue('stock') - 1;
          await ClienteCarrito.create(body);
          await updateStockLibroFunction(body.idLibro, newStock);
          res.json({
            agregado: 1 // AGREGADO CORRECTAMENTE 
          });
        } else {
          res.json({
            agregado: 0 // YA EXISTE EN EL CARRITO
          })
        }
    } else {
      res.json({
        agregado: -1 // NO HAY STOCK
      })
    }
  } catch (error) {
    res.status(500).json({
      msg: 'No se ha podido agregar el libro al carrito',
      error
    })
  }
} 

export const deleteCarrito = async (req: Request, res: Response) => {
  const { idCliente } = req.params;

  try {
    await ClienteCarrito.destroy({
      where: {
        idCliente: idCliente
      }
    });
    res.json({
      msg: 'Libro agregado al carrito con exito'
    });
  } catch (error) {
    console.log(error);
    console.log('No se ha podido limpiar el carrito');
  }
}

//GET HISTORIAL CLIENTE

export const getHistorialComprasCliente = async (req: Request, res: Response) => {
  const { idCliente } = req.params;

  try {
    const historialCompras = await Venta.findAll({
      where: {
        idCliente: idCliente
      },
      attributes: ['estado', 'fechaCompra'],
      include: [{
        model: LibrosVendidos,
        attributes: ['idVenta'],
        include: [{
          model: Libro,
          as: 'LibrosVenta'
        }],
        as: 'LibrosVendidos'
      }]
    });

    if (historialCompras) {
      res.json(historialCompras);
    } else {
      res.json([]);

    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: `No se pudo encontrar un historial`,
      error
    });
  }
};
