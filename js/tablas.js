class Tabla{
	 constructor(set){
		let sets = settings.tablas[set];
		this.id = sets.id,
		this.nombre = sets.nombre,
		this.campos = sets.campos,
		this.filtro = sets.filtro
		this.filtrar();
	}
	getTabla(){
		let html =  this.getHtml();
		return html;
	}
	async filtrar(){
		 await base.ref(this.id).once("value").then((snap)=>{	
		 	if (snap && snap.val()){
		 		snap.forEach((item)=>{
		 			let datos = item.val();		
		 			let row = document.createElement("tr");
		 			row.id = item.key;
		 			row.innerHTML = `<td>Botones</td>`;
		 			this.campos.forEach((campo)=>{	 				
		 				row.innerHTML+= `<td>${datos[campo.fuente]}</td>`;
		 			})
		 			$(`#table_tab_tbody_${this.id}`).html(row);
		 		})
		 	} 	
		 })
		this.reSetTable();
	}
	getHtml(){
		let contenedor = document.createElement("div");
		contenedor.id = "tabla_" + this.id;
		contenedor.setAttribute("class", "col s12 white");

		let cabecera = document.createElement("div");
		cabecera.id = 'tabla_cabecera_' + this.id;
		cabecera.setAttribute('class', "row");
		let titulo	= document.createElement("h6");
		titulo.innerHTML=' ';

	 	cabecera.appendChild(titulo);

		let contenAcciones = document.createElement("div");
		contenAcciones.setAttribute("class", "col s6 ");
		contenAcciones.id = "tabla_acciones_" + this.id;

		let botnAdd = document.createElement("a");
		botnAdd.id = "tabla_botonAdd_" + this.id;
		botnAdd.setAttribute("href", "atletas/nuevo")
		botnAdd.setAttribute("class", "btn btn-small color")
		botnAdd.innerHTML = `<i class='material-icons'>add</i>`;
		
		contenAcciones.appendChild(botnAdd);
		cabecera.appendChild(contenAcciones);

		if (this.filtro){
			let contenFiltro = document.createElement("div")
			contenFiltro.setAttribute("class", "col s6 ");
			let filtro = document.createElement("input");
			filtro.id = "tabla_filtro_" + this.id;
			filtro.setAttribute("type", "text");
			filtro.setAttribute("class", "col s12");
			filtro.setAttribute("placeholder", "Buscar");

			contenFiltro.appendChild(filtro);
			cabecera.appendChild(contenFiltro)
		}

		contenedor.appendChild(cabecera);

		let tab = document.createElement("table");
		tab.id = "tabla_tab_" + this.id;
		tab.setAttribute("class", "highlight");
		
		let head = document.createElement("thead");
		head.id = "tabla_tab_thead_" + this.id;
		let tr = document.createElement("tr");
		 tr.innerHTML= `<th><i class="material-icons">perm_data_setting</i></th>`;
		this.campos.forEach((item) => {
		  tr.innerHTML += `<th>${item.nombre}</th>` 
		})	
		let tbody = document.createElement('tbody');
		tbody.id ="table_tab_tbody_" + this.id;
		head.appendChild(tr);
		tab.appendChild(head);
		tab.appendChild(tbody);
		contenedor.appendChild(tab);
		return contenedor;
	}
	reSetTable(){
		/*** Recetea colores */
		console.log("se ejecuta..")
		$(` #tabla_${this.id} .color`).addClass(settings.color_primario);
		$(`#tabla_${this.id} a`).click(function (e){
			e.preventDefault();
		})
	}
}