var settings = {
	'nombre':'Meraki',
	'color_primario': 'grey darken-4 white-text',
	'color_fondo':'grey lighten-2', 
	'paginas':[
		{
			id: 'dashboard',
			nombre: "Dashboard",
			menu: "true",
			icono: "dashboard",
			menu: true,
		},
		{
			id:'atletas',
			nombre: 'Atletas',
			path: 'ateletas',
			menu: true,
			icono: 'sports_kabaddi',
			componentes: {
				tablas: ['atletas'],
			}
		},

		{
			id:'productos',
			nombre: 'Productos',
			path: 'productos',
			menu: true,
			icono: 'store'
			
		}
	
	],
	'tablas':{
		'atletas': {
			id: 'atletas',
			nombre:  'Atletas',
			filtro: 'nombre',
			campos: [
				{
					nombre: 'Cedula',
					fuente: 'cedula',
					visible: true,
					editable: false,
					type: "text"
				},
				{
					nombre: 'Email',
					fuente: 'correo',
					visible: true,
					editable: true,
					type:"email"
				},

				{
					nombre: 'Nombre',
					fuente: 'nombre',
					visible: true,
					editable: true,
					type:"text",
					
				},				
				{
					nombre: 'Nacimiento',
					fuente: 'nacimiento',
					visible: true,
					editable: true,
					type:"email"
				},
				{
					nombre: 'Telf',
					fuente: 'telefono',
					visible: true,
					editable: true,
					type:"text"
				}

			] 
		}
	}
}

