(function(){

if(typeof Array.prototype.indexOf != "function"
	|| typeof Array.prototype.forEach != "function"
	|| typeof Object.defineProperty != "function"
	|| typeof Object.getOwnPropertyNames != "function"
	|| typeof Object.getOwnPropertyDescriptor != "function"){
	throw new Error("Too old to use this library");
}

var ignoreFunctions = [];
Object.getOwnPropertyNames(Function.prototype).forEach(function(p){
	if(typeof Function.prototype[p] != "function" || 0 <= ignoreFunctions.indexOf(p)) return;
	ignoreFunctions.push(p);
});
Object.getOwnPropertyNames(Object.prototype).forEach(function(p){
	if(typeof Object.prototype[p] != "function" || 0 <= ignoreFunctions.indexOf(p)) return;
	ignoreFunctions.push(p);
});

var editFunctions = [
	"add",
	"reverse",
	"sort",
	"push",
	"pop",
	"shift",
	"unshift",
	"splice",
	"concat",
	"remove",
	"removeAt"
];

function extend(O){
	var d = Object.getOwnPropertyDescriptor(O, "length");
	if(!d){
		d = {
			writable: true,
			value: 0
		};
		Object.defineProperty(O, "length", d);
	}
	Object.getOwnPropertyNames(Array.prototype).forEach(function(p){
		if(0 <= ignoreFunctions.indexOf(p)
			|| typeof Array.prototype[p] != "function"
			|| typeof O[p] != "undefined"
			|| (!d.writable && 0 <= editFunctions.indexOf(p))){
			return;
		}
		O[p] = function(){
			return Array.prototype[p].apply(this, arguments);
		};
	});
}

function implementTo(O){
	switch(typeof O){
		case "function": extend(O.prototype); return O;
		case "object": extend(O); return O;
	}
	throw new TypeError((typeof O) + " is unimplementable");
}

window.ArrayLike = implementTo(function(){});
window.ArrayLike.implementTo = implementTo;

})();
