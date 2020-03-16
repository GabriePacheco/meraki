$(document).ready(function(){
	 //1.- setting sistem
	$("#app").height($(document).outerHeight()); //Alto completo de la app
	$(".nombre").html(settings.nombre);// Pone el nombre del sitio el los lugares requeridos 
	$(".colorF").addClass(settings.color_fondo) //Pinta el color de primario 
	$(".color").addClass(settings.color_primario);// pone el color de fondo 
		//variable contine el preloadar 
	var loading = `<div class="preloader-wrapper small active">
    <div class="spinner-layer spinner-green-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>`;

	//2.- intecación del formulario login
	$("#email").keyup(hLoginer);
	$("#password").keyup(hLoginer);
	function hLoginer (e){
		
		if ($("#email").val() != "" && $("#password").val()!= ""){
			$("#loginer button").removeClass("disabled");
		}else{
			$("#loginer button").addClass("disabled");
		}
	}

	$("#loginer").submit(function (e){
		e.preventDefault();
		$("#loginer button span i").html(loading) 
		login(function(res){
			mensajeria(res);
			$("#loginer button span i").html ("send");
		})
	});



		//6.- controlar los enlaces
		$("a").click(function (e){
			e.preventDefault();
			if ($(this).attr('action') == "menu"){
				navegacion($(this).attr('data-url'))
				
			}else{
				console.log("ddd")
			}
		})

			


})

//4.- Controla navegacion de pantallas
var navegacion = function (url){
	if (url == 'login'){
		$("#start").addClass("hide");
		$("#home").addClass("hide");
		$("#login").removeClass("hide");
	}else{
		$("#start").addClass("hide");
		$("#login").addClass("hide");
		$("#home").removeClass("hide");
		cargarPagina(url);
	}
}

//5.- Cargar user
var cargarUser = function (inline){
	if (inline.photoURL){
		$(".userInlineImg").attr("src", inline.photoURL);
	}
	if (inline.displayName){
		$(".userInlineName").html(inline.displayName);

	}else{
		$(".userInlineName").html(inline.email);
	}
}


var cargarPagina = function (url){
	$("#contenedor_paginas").html("cargando..")
	let pag = new Pagina(url);
	$("#contenedor_paginas").html(pag.getdraw())

}

	//3.- Gestion de la mesajeria 
	function mensajeria (code){
		let mensajes ={
			'auth/wrong-password': ["La contraseña ingresada no es correcta", "error", "red-text"],
			'auth/user-not-found': ["El usuario ingresado no fue encontrado", "error", "red-text"],
			'auth/login-ok': ["Listo! la comunicación comensara enseguida. ", "done_outline", "green-text"],
			'guardar/ok':["Listo ! los datos se guardaron con exito. ", "done_ouyline", "green-text"],
			'guardar/fall': ["Oooh no ! ", 'ocurio un error al guardar los datos', "green-text"]

		}
		let mensaje;
		if (! mensajes[code]){
			mensaje = `<span>Error desconocido <i class='material-icons  red'>error</i></span>`	
		}else{
			mensaje = `<span>${mensajes[code][0]}<i class='material-icons ${mensajes[code][2]}'>${mensajes[code][1]}</i></span>`	
		}	
		M.toast({html: mensaje })
	}