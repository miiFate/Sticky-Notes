class Controlador{
    constructor(){
        this.tablero = new Tablero("elcorcho.jpg");
        this.boton = document.createElement("input");
        this.boton.type = "button";
        this.boton.value ="Añadir nueva nota";
        var that = this;
        this.boton.onclick = function () {
            var hoy = new Date();
            var nota = new Nota("nota","",hoy,90,40,"o");
            listaCompra.añadirNotas(nota);
            that.tablero.nuevaNota(div,nota,listaCompra.mostrarLista.length,nota.x,nota.y);
            // la variable de la clase se llamara listaCompra definirlo en el window.onload
        }
        this.boton.style.margin ="40px";
        div.appendChild(this.boton);
    }
}


class Nota {
    constructor(titulo,texto,fechaCreacion,x,y,id=""){
        this.titulo = titulo;
        this.texto = texto;
        this.fechaCreacion = fechaCreacion;
        this.x = x;
        this.y = y;
        this.id = id;
    }
    
    formatearHora(millisec){
        var seconds = (millisec / 1000).toFixed(0); //toFixed  para Redondear
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        if (minutes > 59){
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }
        seconds = Math.floor(seconds%60);
        seconds = (seconds >= 10) ? seconds :"0" + seconds;
        if (hours !== ""){
            return "Hace " + hours + " horas y " + minutes + " minutos.";
        }
        return "Hace " + minutes + " minutos.";
    }
    
    getTiempo(){
        return new Date().getTime() - new Date(this.fechaCreacion).getTime();
    }
}


class Tablero {
    constructor(image){
        document.body.style.backgroundImage = image;
        document.body.style.backgroundRepeat = "no-repeat";
    }
    
    nuevaNota(div,nota,id,x,y){
        var eltablon = document.getElementById("tablero");
        var contenedor = document.createElement("div");
        contenedor.id = "contenedor" + id;
        contenedor.style.width = "232px";
        contenedor.style.height = "250px";
        contenedor.style.position = "absolute";
        contenedor.style.top = x + "px";
        contenedor.style.left = y + "px";
        eltablon.appendChild(contenedor)
        var label = document.createElement("input");
        label.type = "text";
        label.value = nota.titulo;
        label.style.backgroundColor = "#FFF59D";
        label.style.width = "203px";
        label.onblur = function(){
            var indice = listaCompra.mostrarLista.indexOf(nota);
            listaCompra.mostrarLista.splice(indice,1);
            
            div.removeChild(div.children,namedItem("contenedor" + id));
        };
        contenedor.appendChild(label);
        var eliminar = document.createElement("input");
        eliminar.type = "button";
        eliminar.value = "X";
        eliminar.onclick = function() {
            listaCompra.quitarNota(nota);
        }
        contenedor.appendChild(eliminar);
        var textarea = document.createElement("textarea");
        textarea.name = nota.titulo;
        textarea.id = "nota" + id;
        textarea.maxLength = "5000";
        textarea.cols = "30";
        textarea.rows = "15";
        textarea.value = nota.texto;
        textarea.style.backgroundColor = "#FFF9C4";
        var offsetX = false;
        var offsetY = false;
        var mouseup = false;
        var moving = false;
        textarea.onmousedown = function(e){
            mouseup = true;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            moving = true;
        };
        
        textarea.onmousemove = function(e){
            if (moving) {
                this.parentNode.style.top = (e.clientY - offsetY) + "px";
                this.parentNode.style.left = (e.clientX - offsetX) + "px";
            }
        };
        
        textarea.onmouseout = function(e){
            moving = false;
            mouseup = true;
        };
        
        textarea.onmouseup = function(e){
            if (mouseup) {
                moving = false;
                nota.x = (e.clientY - offsetY);
                nota.y = (e.clientX - offsetX);
                }
        };
        
        textarea.onblur = function(){
            listaCompra.quitarNota(nota);
        };
        contenedor.appendChild(textarea);
        
        var fecha = document.createElement("label");
        fecha.for = "nota" + id;
        var a = nota.getTiempo();
        fecha.innerHTML = nota.formatearHora(nota.getTiempo());
        fecha.style.backgroundColor = "#FFF59D";
        fecha.style.display = "inline-block";
        fecha.style.width = "233px";
        var intervalo = setInterval(function(){
            fecha.innerHTML = nota.formatearHora(nota.getTiempo());},10000);
        contenedor.appendChild(fecha);
        div.appendChild(contenedor);
    }
}

class listaNotas {
    constructor(){
        this.posits = [];
    }
    
    añadirNotas(nota){
        this.posits.push(nota);
        
        
    }
    
    quitarNota(nota){
        var ide = nota.id;
        for(var i  = 0;i < this.posits.length;i++){
            if(ide == this.posits[i].id){
                document.getElementById("tablero").removeChild(document.getElementById("contenedor" + id))
                this.posits.splice[i,1];
            }
        }
    }
    
    mostrarLista(){
        return this.posits;
    }
}

var listaCompra;
window.onload = function(){
    div = document.getElementById("div");
    listaCompra = new listaNotas();
    var controlador = new Controlador();
    for (var i = 0; i < listaCompra.mostrarLista.length; i++){
        var nota = new Nota(listaCompra.mostrarLista[i].titulo,listaCompra.mostrarLista[i].texto,new Date(listaCompra.mostrarLista[i].fechaCreacion),listaCompra.mostrarLista[i].x,listaCompra.mostrarLista[i].y);
        listaCompra.mostrarLista[i] = nota;
        controlador.tablero.nuevaNota(div,nota,i,nota.x,nota.y)
        }
}