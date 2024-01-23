import { Request, Response } from "express";
import { Cliente } from "../models/ClientesModel";

export const getClientes = async (req: Request, res: Response) => {
  const listaClientes = await Cliente.findAll();
  res.json(listaClientes);
} 

export const getCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cliente = await Cliente.findByPk(id);

  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({
      msg: `No existe un cliente con id: ${id}`
    });
  }
} 

export const deleteCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cliente = await Cliente.findByPk(id);

  if (!cliente) {
    res.status(404).json({
      msg: `No existe un cliente con id: ${id}`
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
  const { id } = req.params;

  try {
    const cliente = await Cliente.findByPk(id);
  
    if (!cliente) {
      res.status(404).json({
        msg: `No existe un cliente con id: ${id}`
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