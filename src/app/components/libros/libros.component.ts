import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  listLibros: any[] = [];
  accion = "Agregar";
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _libroServices: LibroService) { 
    this.form = this.fb.group({
      titulo:['', Validators.required],
      autor: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      edicion: ['',[Validators.required]],
      fechaPublicacion: ['',[Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
            }
          )
  }

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros(){
    this._libroServices.getListLibros().subscribe(data =>{
      console.log(data);
      this.listLibros = data;
    }, error => {
      console.log(error);
      })
  }

  guardarLibro(){
    console.log(this.form);

    const libros: any ={
      titulo: this.form.get('titulo')?.value,
      autor: this.form.get('autor')?.value,
      genero: this.form.get('genero')?.value,
      edicion: this.form.get('edicion')?.value,
      fechaPublicacion: this.form.get('fechaPublicacion')?.value,
    }

if(this.id == undefined){
//Agregamos un nuevo libro
this._libroServices.saveLibro(libros).subscribe(data => {
  this.toastr.success('El libro se registro con exito!', 'Libro Registrado');
  this.obtenerLibros();
  this.form.reset();
}, error => {
  this.toastr.error("Oh no algo ocurrio","Error");
  console.log(error);
})
}else{
  libros.id = this.id;
//Editamos un libro
      this._libroServices.updateLibro(this.id,libros).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar'
        this.id = undefined;
        this.toastr.info("El libro fue actualizo con exito!","Libro Actualizada");
        this.obtenerLibros();
      }, error => {
        console.log(error);
      })
}


    
    

  }

  eliminarLibro(id: number){
    this._libroServices.deleteLibro(id).subscribe(data =>{
this.toastr.error('El libro fue eliminado con exito!','Libro eliminada');
this.obtenerLibros();
}, error =>{
  console.log(error);
})

}
editarLibro(libro: any){
  this.accion = "Editar";
  this.id = libro.id;
  
  this.form.patchValue({
    titulo: libro.titulo,
    autor: libro.autor,
    genero: libro.genero,
    edicion: libro.edicion,
    fechaPublicacion: libro.fechaPublicacion
  })
  }

}
