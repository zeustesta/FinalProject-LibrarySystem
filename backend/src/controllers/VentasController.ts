import { Request, Response } from "express";
import { Sequelize } from 'sequelize/types';
import { Venta, LibrosVendidos } from "../models/VentasModel";
import Libro from "../models/LibrosModel";

//METODOS PARA VENTA

export const getVentas = async (req: Request, res: Response) => {
  const listaVentas = await Venta.findAll();
  res.json(listaVentas);
} 

export const getVenta = async (req: Request, res: Response) => {
  const { idVenta } = req.params;
  const venta = await Venta.findByPk(idVenta);

  if (venta) {
    res.json(venta);
  } else {
    res.status(404).json({
      msg: `No existe una venta con id: ${idVenta}`
    });
  }
} 

export const deleteVenta = async (req: Request, res: Response) => {
  const { idVenta } = req.params;
  const venta = await Venta.findByPk(idVenta);

  if (!venta) {
    res.status(404).json({
      msg: `No existe una venta con id: ${idVenta}`
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
    res.status(404).json({
      msg: 'No se ha podido agregar la venta',
      error
    });  
  }
} 

export const updateStatusVenta = async (req: Request, res: Response) => {
  const { idVenta } = req.params;
  const { estado } = req.body;
  
  try {
    const venta = await Venta.findByPk(idVenta);
  
    if (!venta) {
      res.status(404).json({
        msg: `No existe una venta con id: ${idVenta}`
      });
    } else {
      venta.set({ estado: estado });
      await venta.save()
      res.json({
        msg: 'Venta actualizada con exito'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: 'No se ha podido actualizar la venta',
      error
    });
  }
} 

//METODOS PARA LIBROS X VENTA

export const postLibroPorVenta = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await LibrosVendidos.create(body);
    res.json({
      msg: 'Libro vendido agregado con exito'
    });
  } catch (error) {
    console.log(error); 
    res.status(404).json({
      msg: 'No se ha podido agregar el libro vendido',
      error
    });  
  }
} 

export const getLibrosPorVenta = async (req: Request, res: Response) => {
  const { idVenta } = req.params;
  const librosPorVenta = await LibrosVendidos.findAll({
    where: {
      idVenta: idVenta
    },
    include: [{ 
      model: Libro, 
      as: 'LibrosVenta' 
    }] 
  });

  if (librosPorVenta.length > 0) {
    res.json(librosPorVenta);
  } else {
    res.status(404).json({
      msg: `No existen libros para una venta con id: ${idVenta}`
    });
  }
} 