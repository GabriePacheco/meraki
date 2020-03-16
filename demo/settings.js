var settings = {
	'nombre':'Meraki',
	'color_primario': 'black white-text',
	'color_fondo':'grey lighten-4', 
	'paginacion': 10,
	'paginas':[
		{
			id: 'dashboard',
			nombre: "Dashboard",
			menu: "true",
			icono: "dashboard",
			menu: true
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
			icono: 'store',
			componentes: {
				tablas: ['productos']
			}
		},
		{
			id: 'atletas/nuevo',
			nombre: 'Nuevo atelta',
			path: 'atletas',
			menu: false,
			componentes: {
				formularios: ['atletas'],
			}
		},
		{
			id: 'productos/nuevo',
			nombre: 'Nuevo Poducto',
			path: 'productos',
			menu: false,
			componentes: {
				formularios: ['productos'],
			}
		}
	
	],
	'tablas':{
		'atletas': {
			id: 'atletas',
			path: 'atletas',
			nombre:  'Atletas',
			filtro: 'nombre',
			acciones: true,
			add: 'atletas/nuevo',
			campos: [
				{
					nombre: 'Cedula',
					fuente: 'cedula',
					visible: true,
					editable: false,
					type: "text",
					required: true,
					pattern: '[0-9]{10}'
				},
				{
					nombre: 'Email',
					fuente: 'correo',
					visible: true,
					editable: true,
					type:"email",
					required: true
				},

				{
					nombre: 'Nombre',
					fuente: 'nombre',
					visible: true,
					editable: true,
					type:"text",
					required: true,
					order: true				
				},				
				{
					nombre: 'Nacimiento',
					fuente: 'nacimiento',
					visible: true,
					editable: true,
					type:"date"
				},
				{
					nombre: 'Telf',
					fuente: 'telefono',
					visible: true,
					editable: true,
					type:"tel"
				}
			] 
		},
		'productos':{
			id: 'productos',
			path: 'productos',
			nombre: "Productos",
			filtro: "nombre",
			acciones: true,
			add: 'productos/nuevo',
			campos: [
				{
					nombre: 'nombre',
					fuente: 'nombre',
					visible: true,
					editable: true,
					type: "text",
					required: true,
					order: true
				}, 
				{
					nombre: 'P. Compra',
					fuente: 'precio_compra',
					visible: true,
					editable: true,
					type: "number",
					required: true,

					
				}, 
				{
					nombre: 'P. Venta',
					fuente: 'precio_venta',
					visible: true,
					editable: true,
					type: "number",
					required: true,
				
				}, 
				{
					nombre: 'Stock',
					fuente: 'stock',
					visible: true,
					editable: true,
					type: "number",
					required: true,
					pattern: '[0-9]{6}'
				}, 

			]
		}
	}
}

