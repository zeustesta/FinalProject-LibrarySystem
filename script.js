const URL = 'https://gutendex.com/books/?page=3';

async function getElements(){
  try{
    const response = await fetch(URL);
    const responseJson = await response.json(); 
    console.log(responseJson);
  }catch(error){
    console.log(error);
  }
}

getElements();