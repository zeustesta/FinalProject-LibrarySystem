import { Request, Response } from "express";
import { Venta } from "../models/VentasModel";

export const getVentas = async (req: Request, res: Response) => {
  const listaVentas = await Venta.findAll();
  res.json(listaVentas);
} 

export const getVenta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const venta = await Venta.findByPk(id);

  if (venta) {
    res.json(venta);
  } else {
    res.status(404).json({
      msg: `No existe una venta con id: ${id}`
    });
  }
} 

export const deleteVenta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const venta = await Venta.findByPk(id);

  if (!venta) {
    res.status(404).json({
      msg: `No existe una venta con id: ${id}`
    });
  } else {
    await venta.destroy();
    res.json({
      msg: 'Venta eliminada con exito'
    });
  }
} 

export const postVenta = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Venta.create(body);
    res.json({
      msg: 'Venta agregada con exito'
    });
  } catch (error) {
    console.log(error);
    console.log('No se ha podido agregar la venta');
  }
} 

export const updateVenta = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const venta = await Venta.findByPk(id);
  
    if (!venta) {
      res.status(404).json({
        msg: `No existe una venta con id: ${id}`
      });
    } else {
      await venta.update(body);
      res.json({
        msg: 'Venta actualizada con exito'
      });
    }
  } catch (error) {
    console.log(error);
    console.log('No se ha podido actualizar la venta');
  }
} 