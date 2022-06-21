import { LitElement } from "lit-element";

export class GetData extends LitElement { //Definimos un componente lógico para traer los datos de una api
    //Definimos las propiedades de nuestro componente 
    static get properties() {
        return {
          url: { type: String },
          method: { type: String }
        }
    }

    //LitElement nos ofrece un método llamado firtUpdated que perite ejecutarse cuando se hayan ejecutado los demás elementos 
    firstUpdated(){
        this.getData();
    }
    
    //Definimos un metodo para mandar los datos quen decibela información de la consulta
    _sendData(data){ //Creamos un evento personalizado con el nombre ApiData con valores detail, buubbles y composed en donde podemos mandar informacion de hijos a padres
        this.dispatchEvent(new CustomEvent('ApiData', { // El evento personalizado es la comunicacion entre componentes hijos a padres
            detail: { data },
            buubbles: true,
            composed: true
        }))
    }
    //Definimos una funcion que mande la informacion al mmethod 
    getData(){//Mediante uan promesa fetch recibe la url y el method
        fetch(this.url,{ method: this.method })
        .then((response) => {
            if(response.ok) return response.json();// si  la respuesta es ok retorna json
            return Promise.reject(response); // regresamos la respuesta del error 
        })
        .then((data) => { this._sendData(data);//respuesta de envío de la data
        })
        .catch((error) => { console.warn("Something went wrong", error);//mensaje de error en caso de que algo falle 
        })  
    }


}

customElements.define('get-data', GetData);//Definimos como el nombre de nuestra etiqueta del componente