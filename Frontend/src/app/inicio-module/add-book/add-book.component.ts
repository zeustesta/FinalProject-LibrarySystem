import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Libro } from 'src/app/interfaces/plantillaLibro';
import { APIService } from 'src/app/service/api.service';
import { v4 as uuid4 } from 'uuid';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent {
  newBookForm: FormGroup;
  generos = ['Horror', 'Fantasía', 'Ciencia Ficción', 'Drama', 'Suspenso', 'Aventura', 'Policial', 'Paranormal', 'Poesía'];


  constructor(private fb: FormBuilder, private aService: APIService){
    this.newBookForm = this.fb.group({
      titulo: ['', Validators.required],
      genero: ['', Validators.required],
      autor: ['', Validators.required],
      stock: ['', Validators.required],
      precio: ['', Validators.required],
      portada: ['', Validators.required],
    })
  }

  addBook() {
    const titulo = this.newBookForm.value.titulo;
    const genero = this.newBookForm.value.genero;
    const autor = this.newBookForm.value.autor;
    const stock = this.newBookForm.value.stock;
    const precio = this.newBookForm.value.precio;
    const portada = this.newBookForm.value.portada;

    const newBook: Libro = {
      idLibro: uuid4(),
      titulo: titulo,
      genero: genero,
      autor: autor,
      stock: stock,
      precio: precio,
      portada: portada,
      cantVentas: 0
    };

    this.aService.postLibro(newBook).subscribe(() => {
      alert('Libro agregado correctamente');
    });
  }
}
