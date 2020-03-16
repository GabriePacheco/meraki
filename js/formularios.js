class Formulario {
	constructor (iq){
		let sets = settings.tablas[iq];
		this.id = sets.id
		this.path = sets.path
		this.nombre = sets.nombre
		this.campos = sets.campos
		this.filtro = sets.filtro
		this.acciones = sets.acciones
		
		this.setHtml();

	}
	async getHtml(obj){
		await obj(this.html);
	  this.reset();
	}
	setHtml(){
		let forma = document.createElement("form");
		forma.id = `formulario_${this.id}`
		forma.setAttribute('class', "col s12 white");
		
		let titulo = document.createElement("h6");
		titulo.innerHTML=`&nbsp; Formulario ${this.nombre}`;
		forma.append(titulo);

		let botonera = document.createElement('div');
		botonera.setAttribute("class", "col s12 input-filed");
		let botonSubmit = document.createElement('button');

		botonSubmit.setAttribute("type", "submit");
		botonSubmit.setAttribute("class", "color right btn small");
		botonSubmit.innerHTML = "<i class ='material-icons'>save</i>"

		forma.append(botonSubmit);

		this.campos.forEach((item) => {
			let col = document.createElement("div");
			col.setAttribute("class","col s12 input-field");
			let inp = document.createElement('input')
			inp.setAttribute("type", item.type);
			inp.id= item.fuente;
			inp.setAttribute("placeHolder", item.nombre);
			if (item.required == true){
				inp.setAttribute("required",true);
			}
			if (item.pattern){
				inp.setAttribute("pattern",item.pattern);	
			}
			col.appendChild(inp);
			forma.append(col);
		})

		this.html = forma;
	}
	async reset(){
		$(".color").addClass(settings.color_primario);
		$( `#formulario_${this.id}`).submit(async (e)=>{
			e.preventDefault();
			/*** NUEVO REGISTRO */
			let nId = await base.ref().child(this.path).push().key;
			let archivo = {}
			this.campos.forEach((item) => {
			  archivo[item.fuente]= $(`#${item.fuente}`).val()			  
			})
			let update ={}
			update[`${this.path}/${nId}`]= archivo
			base.ref().update(update)
			.then(() => {
				mensajeria ("guardar/ok");
				this.delete ()
			})
		});
	}
	delete(){
		delete this
	}
}