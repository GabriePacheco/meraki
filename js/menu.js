var generarMenu = function (){
	let lista = settings.paginas.filter(m => m.menu == true);
	lista.forEach((item) => {
	  let opcion = document.createElement("a");
	  opcion.id= `menu_${item.id}`;
	  opcion.setAttribute("class", "col s12");
	  opcion.setAttribute("data-url", item.id);
	  opcion.setAttribute("acion", "menu");
	  opcion.setAttribute("href", "#");
	  opcion.setAttribute("onClick", `navegacion('${item.id}')`)

	  let icon = document.createElement("div");
	  icon.setAttribute("class","col s12 m4");
	  icon.innerHTML=`<i class='material-icons'>${item.icono}</i>`;

	  let nombre = document.createElement("div");
	  nombre.setAttribute("class","col m4 hide-on-small-only");
	  nombre.innerHTML=item.nombre;
	  opcion.append(icon);
	  opcion.append(nombre);
	  
	  $('#menu').append(opcion);


	})


}