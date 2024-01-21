import { Request, Response } from "express"

export const getLibros = (req: Request, res: Response) => {
  res.json({
    msg: 'get Libros'
  })
} 

export const getLibro = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    msg: 'get Libro',
    id
  })
} 

export const deleteLibro = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    msg: 'delete Libro',
    id
  })
} 

export const postLibro = (req: Request, res: Response) => {
  const { body } = req;

  res.json({
    msg: 'post Libro',
    body
  })
} 

export const updateLibro = (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  res.json({
    msg: 'update Libro',
    id,
    body
  })
} 