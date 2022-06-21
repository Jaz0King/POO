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
       :host {
        display: block;
        background-color: #f9f9fd;

background-image:  linear-gradient(30deg, #000000 12%, transparent 12.5%, transparent 87%, #000000 87.5%, #000000), linear-gradient(150deg, #000000 12%, transparent 12.5%, transparent 87%, #000000 87.5%, #000000), linear-gradient(30deg, #000000 12%, transparent 12.5%, transparent 87%, #000000 87.5%, #000000), linear-gradient(150deg, #000000 12%, transparent 12.5%, transparent 87%, #000000 87.5%, #000000), linear-gradient(60deg, #00000077 25%, transparent 25.5%, transparent 75%, #00000077 75%, #00000077), linear-gradient(60deg, #00000077 25%, transparent 25.5%, transparent 75%, #00000077 75%, #00000077);
background-size: 22px 39px;
background-position: 0 0, 0 0, 11px 19px, 11px 19px, 0 0, 11px 19px;
       }
       .container {
        text-align: center;
       }
       .card{
        background-color: #e4e4e4;
        border-radius: 25px;
        display: inline-block;
        align-content: center;
        align-items: center;
        text-align: center;
        flex-direction: column;
        margin: 12px 5px 12px 5px;
        padding:  10px 0 10px 0;
        width: 200px;
        height: 300px;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.25);
      }
      get-data{
        display:none;
      }
      .card img {
        border-radius: 50%;
        width: 70%;
      }
      
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
            <img class="card-img" src="${character.image}">
            <h2>${character.name}</h2>
            <p>${character.species}</p>
            <p>${character.status}</p>
          </div>
         </div>
      ` )}
     
    `;
  }
};

