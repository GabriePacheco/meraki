//***Funciones que se conectan a la base de datos ***//
//1.- Conectar con funciones base 
const base = firebase.database();//conecta la base;
const auth = firebase.auth();
const storage = firebase.app().storage();

//2.- inicio de sesion
var login = function (callback){
	auth.signInWithEmailAndPassword($("#email").val() , $("#password").val())
	.then(function (){
		if (callback && typeof callback == 'function'){
			callback("auth/login-ok");
		}

	})
	.catch(function (error){
		if (callback && typeof callback == 'function'){
			callback(error.code);
		}
	})

} 
//3.- Escuchar los cambios de sesion 
auth.onAuthStateChanged(function (user){
	if (user){
		navegacion ("dashboard");
		cargarUser(user);
		generarMenu()
		
	}else{
		navegacion ("login");
	
	}
});