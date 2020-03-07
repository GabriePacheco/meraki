class Pagina {
	constructor(url){
		let set = settings.paginas.find(page => page.id == url);	
		this.id = set.id;
		this.nombre= set.nombre;
		this.path= set.path;
		this.componentes=  set.componentes;
		this.crear();

	}
	crear(){
		let contenedor =  document.createElement('div');
		contenedor.id = "page_"+this.id;
		contenedor.setAttribute("class", "col s12 pages");

		let titulo = document.createElement("h5");
		titulo.id = "page_titulo" +this.id;
		titulo.innerHTML= this.nombre;
		contenedor.append(titulo);
		if (this.componentes){
			let componentes = document.createElement("div");
			componentes.setAttribute("class", "row");
			if (this.componentes.tablas){
				let tablas = document.createElement("div");
				tablas.setAttribute("class", "col s12");
				this.componentes.tablas.forEach(async (item) => {					
					let tab = new Tabla(item);
				 	tablas.append(await tab.getTabla());
				 	/*tab.reSetTable();							*/
				})
				componentes.append(tablas);			
			}
			contenedor.append(componentes);

		}
		this.html = contenedor;
	}
	 getdraw() {
		return this.html;
	 }
	 setdraw (x){
	 	this.nombre= x;
	 }

}