import { Request, Response } from "express";
import Libro from "../models/LibrosModel";

export const getLibros = async (req: Request, res: Response) => {
  const listaLibros = await Libro.findAll();
  res.json(listaLibros);
} 

export const getLibro = async (req: Request, res: Response) => {
  const { id } = req.params;
  const libro = await Libro.findByPk(id);

  if (libro) {
    res.json(libro);
  } else {
    res.status(404).json({
      msg: `No existe un libro con id: ${id}`
    });
  }
} 

export const deleteLibro = async (req: Request, res: Response) => {
  const { id } = req.params;
  const libro = await Libro.findByPk(id);

  if (!libro) {
    res.status(404).json({
      msg: `No existe un libro con id: ${id}`
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

export const updateLibro = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const libro = await Libro.findByPk(id);
  
    if (!libro) {
      res.status(404).json({
        msg: `No existe un libro con id: ${id}`
      });
    } else {
      await libro.update(body);
      res.json({
        msg: 'Libro actualizado con exito'
      });
    }
  } catch (error) {
    console.log(error);
    console.log('No se ha podido actualizar el libro');
  }
} 