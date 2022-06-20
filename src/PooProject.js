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


  render() {
    return html`
      <get-data>
        </get-data>
    `;
  }
}
