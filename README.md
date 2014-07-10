ArrayLike.js
============

An Array-like Object Implementation Support Library


Usages
------

### Create Array-like Object

```js
var a = new ArrayLike();
a.length;//0
a.push("X");
a.length;//1
a.pop();//X
a.length;//0
```

### Extend Your Class to Array-like

```js
function CustomClass(){
	this.hoge = "hoge!";
}
ArrayLike.implementTo(CustomClass);
CustomClass.prototype.page = function(){
	return "page!";
}

var c = new CustomClass();
c.hoge;//hoge!
c.page();//page!
c.length;//0
c.push("Y");
c.length;//1
c.pop();//Y
c.length;//0
```

### With Closure Function (Constructor)

```js
var CustomClass = ArrayLike.implementTo(function(){
	this.hoge = "hoge!";
});
CustomClass.prototype.page = function(){
	return "page!";
}
```

### Extend NodeList with Array-like methods

```js
ArrayLike.implementTo(NodeList);
document.querySelector("*").forEach(function(e){
	console.log(e.tagName);
});
```
