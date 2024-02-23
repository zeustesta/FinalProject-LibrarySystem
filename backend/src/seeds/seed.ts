import LibrosModel from '../models/LibrosModel'
const urlApi = 'https://gutendex.com/books/?page=4';
const imageNotFound = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';

export async function seedDatabase() {
  try {
    const data = await (await (fetch(urlApi))).json();
    const results = data.results;
    for (let i = 0; i < results.length; i++) {
      if(results[i].authors[0] !== undefined){
        if (results[i].formats["image/jpeg"] == null) {
          populateBooksTable(results[i].title, results[i].authors[0].name, imageNotFound);
        } else {
          populateBooksTable(results[i].title, results[i].authors[0].name, results[i].formats["image/jpeg"]);
        }
        
      }
    }
    console.log('Base de datos poblada correctamente'); 
  } catch (error) {
    console.log(error);
    console.log('No se ha podido poblar la base de datos');
  }
}

async function populateBooksTable(titulo: string, autor: string, portada: string){
  try {
    const genero = randGenre();
    const stock = Math.floor(Math.random() * (15 - 3 + 1)) + 3;
    const cantVenta = 0;
    const precio = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;

    await LibrosModel.create({
      titulo: titulo,
      genero: genero,
      autor: autor,
      stock: stock,
      precio: precio,
      portada: portada,
      cantVenta: cantVenta
    });
  } catch (error) {
    console.log(error)
    console.log('No se ha podido almacenar el libro');
  }
}

function randGenre() {
  const generos = ['Horror', 'Fantasía', 'Ciencia Ficción', 'Drama', 'Suspenso', 'Aventura', 'Policial', 'Paranormal', 'Poesía'];
  return generos[Math.floor(Math.random() * (9 - 1 + 1))];
}
