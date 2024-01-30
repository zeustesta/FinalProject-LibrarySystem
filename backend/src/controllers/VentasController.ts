import { Request, Response } from "express";
import { Venta, LibrosVendidos, EstadoVenta } from "../models/VentasModel";

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
    console.log('No se ha podido agregar la venta');
  }
} 

export const updateStatusVenta = async (req: Request, res: Response) => {
  const { idVenta } = req.params;
  const { nuevoEstado } = req.body;

  try {
    const venta = await Venta.findByPk(idVenta);
  
    if (!venta) {
      res.status(404).json({
        msg: `No existe una venta con id: ${idVenta}`
      });
    } else {
      venta.setDataValue('estado', nuevoEstado);
      await venta.save()
      res.json({
        msg: 'Venta actualizada con exito'
      });
    }
  } catch (error) {
    console.log(error);
    console.log('No se ha podido actualizar la venta');
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
    console.log('No se ha podido agregar el libro vendidos');
  }
} 

export const getLibrosPorVenta = async (req: Request, res: Response) => {
  const { idVenta } = req.params;
  const librosPorVenta = await Venta.findAll({
    where: {
      idVenta: idVenta
    },
    attributes: ['idLibro']
  });

  if (librosPorVenta.length > 0) {
    res.json(librosPorVenta);
  } else {
    res.status(404).json({
      msg: `No existen libros para una venta con id: ${idVenta}`
    });
  }
} 