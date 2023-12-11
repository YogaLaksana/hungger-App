/* eslint-disable linebreak-style */
/* eslint-disable block-spacing */
/* eslint-disable no-underscore-dangle */
import CONFIG from '../scripts/global/config';

class listCard extends HTMLElement {
  constructor() {
    super();
    this.shadowCard = this.attachShadow({ mode: 'open' });
  }

  set data(data) {
    this._data = data;
    this.render();
  }

  render() {
    this.shadowCard.innerHTML = `${this.elemnetHTML()} ${this.elementStyling()}`;
  }

  elemnetHTML() {
    return `<div tabindex="0">
    <img src="${CONFIG.IMAGE_LINK}${this._data.pictureId}" alt="Poster for ${this._data.name}">
    <ul>
    <li aria-label="nama restoran, ${this._data.name}">${this._data.name}</li>
    <li aria-label="rating ${this._data.rating}"> &#10032 ${this._data.rating}</li>
    
    
    </ul>
  </div>`;
  }

  // eslint-disable-next-line class-methods-use-this
  elementStyling() {
    return ` <style>
    div{
      width: 100%;
      height:100%;
      background-color: none;
      position: relative;
      text-align:center;
      border:none;
      pointer-events: none;
  
    }
    ul{
      position:absolute;
      bottom:0;
      padding:0;
      width:100%;
      display:grid;
      grid-template-columns:8fr 2fr;
      margin:0;
      list-style: none;
      height:20%;
      font-size:inherit;
    }
    li{
      background-color:white;
      margin-inline:0;
      color: black;
      display:flex;
      font-weight: bold;
      font-family:inherit;
      font-size:inherit;
      justify-self: center;
      width: 100%;;
      height: 100%;
      text-align: left;
      align-items: center;
      border:none;
    } 

    div img{
      width:100%;  
      height:100%;
      aspect-ratio: 3/2;
      object-fit:fit;
      pointer-events: none;

    }
   
    p{
      margin-block:0;
      margin-inline:auto;
      color: #192655;
      padding: 10px;
      justify-self: center;
      width: 90%;
      height:1fr;
      border: none;
      text-align: left;
      overflow-y:auto;

    }
    </style>`;
  }
}

customElements.define('list-card', listCard);
