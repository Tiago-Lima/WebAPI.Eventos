import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos : any = [];
  mostrarImagem = false;

  eventosFiltrados : any = [];
  _filtroLista : string ;
  
  
  get filtroLista(){
   return this._filtroLista;
  }

  set filtroLista(value : string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): any{

    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
    }

  mostrarImg(){
    this.mostrarImagem = !this.mostrarImagem;
  }
  getEventos(){
    this.http.get('http://localhost:5000/api/values').subscribe(response => {
      this.eventos= response;
      console.log(this.eventos);
    }, error => {
      console.log(error);
    });
  }

}
