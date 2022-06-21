import { LitElement, html, css } from 'lit';//Importamos los componentes queutilizaremos de litElement, html y el css
import "./components/GetData";//Importamos el componente personalizado GetData con la etiqueta get-data 
//Creamos el componente principal que recibira los datos, extendemos de LitElement para tener todas las funcionalidades de forma global
export class PooProject extends LitElement {
  static get properties() {
    return {
      wiki: { type: Array } //Creamos la propiedad wiki de tipo arreglo para guardar los personajes traidos de la api 
    };
  }

  static get styles() {
    return css`
      
    `;
  }
  
  constructor(){
    super(); //hacemos referencia para acceder de forma global
    this.wiki = [] //Cuando se reinicializa el componente pasamos a un arreglo vacío en de la propiedad wiki que guarda nuestros personajes traidos de la api
    this.addEventListener('ApiData', (e) => { 
      this._dataFormat(e.detail.data);//El evento personaliazdo regresa toda la información de la api dentro de detail, dentro de la función con la data formateada
    }) //pasamos mediante el evento personalizado la info
  }

  _dataFormat(data) { //Función que nos permite dar el formato que queremos a los dato traidos
    let characters = [];
    data["results"].forEach((character) => {
      characters.push({
        image: character.image,
        name: character.name,
        species: character.species,
        status: character.status
      })
    })
    //console.log(characters)
    this.wiki = characters; //pasamos la data de characters a la propiedad wiki
  }


  render() {
    return html`
      <get-data url="https://rickandmortyapi.com/api/character" method="GET"></get-data>
      ${this.dataTemplate}
    `;
  }
  //Función para mostrar los datos en pantalla
  get dataTemplate(){
    return html `
      ${this.wiki.map(character => html `
         <div class="card">
          <div class="card-container">
            <img src="${character.image}">
            <h2>${character.name}</h2>
            <p>${character.species | character.status}</p>
          </div>
         </div>
      ` )}
     
    `;
  }



}

