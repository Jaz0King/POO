import { LitElement, html, css } from 'lit';//Importamos los componentes queutilizaremos de litElement, html y el css
import "./components/GetData";//Importamos el componente personalizado GetData con la etiqueta get-data 
//Creamos el componente principal que recibira los datos, extendemos de LitElement para tener todas las funcionalidades de forma global
export class PooProject extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String }
    };
  }

  static get styles() {
    return css`
      
    `;
  }

  constructor(){
    super(); //hacemos referencia para acceder de forma global
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
    console.log(characters)
  }


  render() {
    return html`
      <get-data url="https://rickandmortyapi.com/api/character" method="GET"></get-data>
    `;
  }
}
