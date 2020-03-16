class Tabla{
	  constructor(set){
		let sets = settings.tablas[set];
		this.id = sets.id
		this.path = sets.path
		this.nombre = sets.nombre
		this.campos = sets.campos
		this.filtro = sets.filtro
		this.acciones = sets.acciones
		this.add= sets.add
		this.page = 1;	
		this.order = sets.campos.find(campo => {return campo.order  == true})
		this.filtrar();

	}
	getTabla(){
		this.getHtml();
		return this.html;
	}
	async filtrar(){
			$(`#table_tab_tbody_${this.id}`).html("...");
			await base.ref(this.id).once("value", (snaptotal)=>{
				this.total = snaptotal.numChildren();
				this.pages = Math.floor(this.total/ settings.paginacion ) + 1
				
			})	
			$(`#table_tab_tbody_${this.id}`).html('');	
			let filtro;

			if (!this.buscar){
				if (!this.lastView){
					if (!this.firstView){					
						filtro = base.ref(this.id).orderByKey().limitToFirst(settings.paginacion).once("value");				
					}else{
						filtro = base.ref(this.id).orderByKey().endAt(this.firstView).limitToFirst(settings.paginacion).once("value");					
					}
				}else{						
					filtro = base.ref(this.id).orderByKey().startAt(this.lastView).limitToFirst(settings.paginacion).once("value");				
				}		
			}else{
				filtro = base.ref(this.id)
				.orderByChild(this.order.fuente)
				.startAt(this.buscar)
				.endAt(this.buscar + "\uf8ff")
				.once("value");	
				$("#tabla_indicador_" + this.id).html("Todos las coincidencias")
			}
						
		 await filtro.then((snap)=>{	
		 	if (! this.buscar){

		 		$(`#tabla_indicador_`+ this.id).html(`pag ${this.page} de ${this.pages}`)
		 		if (this.page >= this.pages){
		 			$(`#tabla_forward_${this.id}`).addClass(`hide`);
		 		}else{
					$(`#tabla_forward_${this.id}`).removeClass(`hide`);
		 		}
		 		if (this.page == 1){
		 			$(`#tabla_before_${this.id}`).addClass(`hide`);
		 		}else{
		 			$(`#tabla_before_${this.id}`).removeClass(`hide`);
		 		}
		 	}

		 	if (snap && snap.val()){
		 		snap.forEach((item)=>{
		 			let datos = item.val();		
		 			let row = document.createElement("tr");
		 			row.id = item.key;
		 			this.lastView = item.key;
		 			if (! this.firstView){
		 				this.lastView = item.key
		 			}
		 			let cA = document.createElement(`td`);
	 				let acciones = document.createElement("a")
	 				acciones.id = "tabla_DropDown_"+this.id +"_"+item.key
	 				acciones.setAttribute("class", "dropdown-trigger btn color small" );
	 				acciones.setAttribute("href", "#" );
	 				acciones.setAttribute("data-target", `dropDown${item.key}`);
	 				acciones.setAttribute("data-id", `${item.key}`);
	 				acciones.innerHTML= "<i class='material-icons'>perm_data_setting</i>"
	 				cA.appendChild(acciones);

	 				let ac = document.createElement("ul");
	 				ac.id= `dropDown${item.key}`;
	 				ac.setAttribute("class", "dropdown-content");
	 				ac.innerHTML += `<li><a href='#!' data-id='${item.key}' data-accion='editar'>Editar</a></li>`
	 				ac.innerHTML += `<li><a href='#!' data-id='${item.key}' data-accion='borrar' >borrar</a></li>`
	 				cA.appendChild(ac)
	 				row.appendChild(cA)

		 			this.campos.forEach((campo)=>{	 				
		 				row.innerHTML+= `<td>${datos[campo.fuente]}</td>`;
		 			})
		 			$(`#table_tab_tbody_${this.id}`).append(row);
		 		})
		 	} else{
		 		let row = document.createElement("tr");
		 		row.innerHTML= `<td colspan ="${this.campos.length}"> No hay resultados</td>`		 ;
		 		$(`#table_tab_tbody_${this.id}`).html(row);
		 	}
		 })
		this.reSetTable();
	}
	getHtml(){
		let contenedor = document.createElement("div");
		contenedor.id = "tabla_" + this.id;
		contenedor.setAttribute("class", "col s12  ");

		let cabecera = document.createElement("div");
		cabecera.id = 'tabla_cabecera_' + this.id;
		cabecera.setAttribute('class', "row");
		let titulo	= document.createElement("h6");
		titulo.innerHTML=`&nbsp; <strong>Tabla de ${this.nombre}</strong>`;

	 	cabecera.appendChild(titulo);

		let contenAcciones = document.createElement("div");
		contenAcciones.setAttribute("class", "col s6 valign-wrapper");
		contenAcciones.id = "tabla_acciones_" + this.id;

		let paginacion = document.createElement('div');
		paginacion.id = "tabla_paginacion_" + this.id;
		paginacion.setAttribute("class", "col s7 offset-s3  white valign-wrapper");

		let indicador = document.createElement("span");
		indicador.setAttribute("class", "col s8 align-right");
		indicador.id = "tabla_indicador_" + this.id;
		paginacion.appendChild(indicador);

		let beforeBoton = document.createElement('a');
		beforeBoton.id= "tabla_before_" + this.id;
		beforeBoton.setAttribute('href', "#");
		beforeBoton.setAttribute('class', "col s2");
		beforeBoton.innerHTML= '<i class="material-icons">chevron_left</i>'
		paginacion.appendChild(beforeBoton);

		let forwardBoton = document.createElement('a');
		forwardBoton.id= "tabla_forward_" + this.id;
		forwardBoton.setAttribute('href', "#");
		forwardBoton.setAttribute('class', "col s2");
		forwardBoton.innerHTML= '<i class="material-icons">chevron_right</i>'
		paginacion.appendChild(forwardBoton);

		contenAcciones.appendChild(paginacion)

		let botnAdd = document.createElement("a");
		botnAdd.id = "tabla_botonAdd_" + this.id;
		botnAdd.setAttribute("data-href", this.add)
		botnAdd.setAttribute("class", "col s2 btn btn-small color right")
		
		let add = document.createElement("i");
		add.setAttribute("class", "material-icons");
		add.setAttribute("data-href", this.add)
		add.append("add")

		botnAdd.appendChild(add);
		contenAcciones.appendChild(botnAdd);

		if (this.filtro){
			let contenFiltro = document.createElement("div")
			contenFiltro.setAttribute("class", "col s6 ");
			let filtro = document.createElement("input");
			filtro.id = "tabla_filtro_" + this.id;
			filtro.setAttribute("type", "text");
			filtro.setAttribute("class", "col s12 white");
			filtro.setAttribute("placeholder", "Buscar");
			contenFiltro.appendChild(filtro);
			cabecera.appendChild(contenFiltro)
		}
		cabecera.appendChild(contenAcciones)
		contenedor.appendChild(cabecera);

		let tab = document.createElement("table");
		tab.id = "tabla_tab_" + this.id;
		tab.setAttribute("class", "highlight white");
		
		let head = document.createElement("thead");
		head.id = "tabla_tab_thead_" + this.id;
		let tr = document.createElement("tr");
		tr.innerHTML= `<th><i class="material-icons">perm_data_setting</i></th>`;
		this.campos.forEach((item) => {
			let th = document.createElement("th");
			th.setAttribute('data-campo', item.nombre)
			th.innerHTML =`${item.nombre} ${(item.nombre == this.order.nombre ? '<i class="order material-icons">arrow_drop_down</i>': '' )}`
		  	tr.appendChild(th)
		})	
		let tbody = document.createElement('tbody');
		tbody.id ="table_tab_tbody_" + this.id;
		head.appendChild(tr);
		tab.appendChild(head);
		tab.appendChild(tbody);
		contenedor.appendChild(tab);
		this.html = contenedor
		return this.html;
	}
	reSetTable(){
		
		$(` #tabla_${this.id} .color`).addClass(settings.color_primario);
		$(`#tabla_${this.id} a`).click(function (e){
			e.preventDefault();
		})
		var elems = document.querySelectorAll('.dropdown-trigger');
    	var instances = M.Dropdown.init(elems);
    	$(".dropdown-content a").click((e)=>{
    		e.preventDefault();
    		let targe = e.target
    		
    		if (targe.getAttribute('data-accion') == 'borrar'){
    			this.borrar(targe.getAttribute('data-id'))
    		}
    		if (targe.getAttribute('data-accion') == 'editar'){
    			this.editar(targe.getAttribute('data-id'))
    		}
    	})
    	$(`#tabla_botonAdd_${this.id}`).click((e)=>{
    		e.preventDefault();
    		let link = e.target.getAttribute("data-href");
    		cargarPagina(link);
    	})
    	if (!$(`#tabla_filtro_${this.id}`).attr("setted") == true ){
    		$(`#tabla_filtro_${this.id}`).attr("setted", true);
	    	$(`#tabla_filtro_${this.id}`).keyup((e)=>{
	    		 let code = (e.keyCode ? e.keyCode : e.which)
	    		if (code == 13){
	    			this.to += 1
	    			this.buscar = $(`#tabla_filtro_${this.id}`).val();
	    			this.firstView = false
	    			this.filtrar()
	    		}
	    	})

	    	$("#tabla_forward_" + this.id).click((e) =>{
    			delete this
    			this.firstView = false
    			this.page +=1;
    			this.filtrar();
    		})
	    	$("#tabla_before_" + this.id).click((e) =>{
    			delete this
    			this.lastView = false
    			this.page -=1;
    			this.filtrar();
    		})
			 $(`#tabla_tab_thead_${this.id} th`).click((e)=>{
			 	this.order = this.campos.find(campo => {return campo.nombre  == e.target.getAttribute('data-campo')})
			 	$(`#tabla_tab_thead_${this.id} th .order`).remove();
			 	 let ord = document.createElement("i");
			 	 ord.setAttribute("class", "order material-icons")
			 	 ord.innerHTML =`arrow_drop_down`;
				e.target.append(ord)
			 })
    	}
	}
	borrar(id){
		base.ref(`${this.id}/${id}`).remove()
		.then((e)=>{
			$(`#${id}`).remove();
		})
	}
}