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
  const { newCantVentas } = req.body;
  const { idLibro } = req.params;

  try {
    const libro = await Libro.findByPk(idLibro);
  
    if (!libro) {
      res.status(404).json({
        msg: `No existe un libro con id: ${idLibro}`
      });
    } else {
      libro.setDataValue('cantVentas', newCantVentas);
      await libro.save();
      res.json({
        msg: 'Cantidad de ventas actualizada con exito'
      });
    }
  } catch (error) {
    console.log(error);
    console.log('No se ha podido actualizar la cantidad de ventas');
  }
} 

export const updateLibro = async (req: Request, res: Response) => {
  const { updateLibro } = req.body;
  const { idLibro } = req.params;

  try {
    const libro = await Libro.findByPk(idLibro);
  
    if (libro) {
      console.log('Updateando')
      console.log(updateLibro);
      // await Libro.update(updateLibro, {
      //   where: {
      //     idLibro: idLibro
      //   }
      // });
      // libro.stock = updateLibro;
      await libro.save({ fields: ['stock'] });
      await libro.reload();
      res.json({
        msg: 'Stock actualizado con exito'
      });
    } 
    // else {
      // res.status(404).json({
      //   msg: `No existe un libro con id: ${idLibro}`
      // });
    // }
  } catch (error) {
    console.log(error);
    console.log('No se ha podido actualizar el stock');
  }
} 