import { Request, Response } from "express";
import Libro from "../models/LibrosModel";

export const getLibros = async (req: Request, res: Response) => {
  const listaLibros = await Libro.findAll();
  res.json(listaLibros);
} 

export const getLibro = async (req: Request, res: Response) => {
  const { idLibro } = req.params;
  const libro = await Libro.findByPk(idLibro);

  if (libro) {
    res.json(libro);
  } else {
    res.status(404).json({
      msg: `No existe un libro con id: ${idLibro}`
    });
  }
} 

export const deleteLibro = async (req: Request, res: Response) => {
  const { idLibro } = req.params;
  const libro = await Libro.findByPk(idLibro);

  if (!libro) {
    res.status(404).json({
      msg: `No existe un libro con id: ${idLibro}`
    });
  } else {
    await libro.destroy();
    res.json({
      msg: 'Libro eliminado con exito'
    });
  }
} 

export const postLibro = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await Libro.create(body);
    res.json({
      msg: 'Libro agregado con exito'
    });
  } catch (error) {
    console.log(error);
    console.log('No se ha podido agregar el libro');
  }
} 

export const updateCantVentasLibro = async (req: Request, res: Response) => {
  const { cantVentas } = req.body;
  const { idLibro } = req.params;
  try {
    const libro = await Libro.findByPk(idLibro);
  
    if (libro) {
      libro.set({cantVentas: cantVentas})
      await libro.save();
      res.json({
        msg: 'Cantidad de ventas actualizada con exito'
      });
    } 
    else {
      res.status(404).json({
        msg: `No existe un libro con id: ${idLibro}`
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: `No se ha podido actualizar la cantidad de ventas`,
      error
    });
  }
} 

export const updateStockLibro = async (req: Request, res: Response) => {
  const { stock } = req.body;
  const { idLibro } = req.params;
  try {
    const libroUpdated = await updateStockLibroFunction(idLibro, stock); 
    if (libroUpdated) {
      res.json({
        msg: 'Stock actualizado con exito'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: `No se ha podido actualizar el stock: ${idLibro}`,
      error
    });
  }
} 

export async function updateStockLibroFunction(idLibro: string, newStock: number) {
  try {
    const libro = await Libro.findByPk(idLibro);
  
    if (libro) {
      libro.set({stock: newStock})
      await libro.save();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log('No se ha podido actualizar el stock');
  }
} 