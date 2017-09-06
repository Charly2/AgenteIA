/**
 * Created by Charly on 25/08/2017.
 */

function init(numf,numi) {
    var mapa= $("#mapa");
    var mapaheight=mapa.height()/numf,mapawidth = mapa.width()/numi;
    console.log(mapa.height())
    var tabla = document.getElementById("tabla")
    for(var x=0; x<numf-1 ; x++){
        var nodeRen = document.createElement("div");
        nodeRen.className = "fila";
        nodeRen.innerHTML = "";
        for (var y = 0; y<numi-1 ; y++){
            var node = document.createElement("div");
            node.className = "item";
            node.activo=false;
            node.tam = [mapawidth,mapaheight];
            node.cordenadas={'x':x,'y':y}
            node.id = "elem_"+(x)+"_"+(y);
            //node.innerHTML = "[ "+x+","+y+"]"
            node.innerHTML = ""
            node.onclick=function () {
                if (this.activo){
                    console.log("desactivo");
                }
                else {
                    console.log("activo")
                    this.className="activo"
                    agregar(this);
                }
            };
            node.style.width = mapawidth+"px";
            node.style.height = mapaheight+"px";
            nodeRen.appendChild(node);
        }
        tabla.appendChild(nodeRen);
    }
    $("#iniciar").css({
        "background": "red",
        "border-color": "red"
    }).html("Detener App");

    var matriz = crearMatriz(numi,numf);
    return {"state":true,"mapa": matriz};
}

function agregar(e){
    console.log(e.cordenadas)
    if (nivelCarga==1){
        matriz[(e.cordenadas.x)][(e.cordenadas.y)].state=1;
        matriz[(e.cordenadas.x)][(e.cordenadas.y)].tipo=1;
        e.style.background= "url(assets/img/nave.png)";
        e.style.backgroundRepeat="no-repeat";
        e.style.backgroundPosition="center"
        e.style.backgroundSize = (e.tam[0])*.8+"px "+(e.tam[0])*.8+"px";
        nivelCarga=2;
        e.activo=true;
        nave=[e.cordenadas.x,e.cordenadas.y];
        $( "#evento").trigger( "custom", [ "Custom", "Event" ] );
    }
    else if (nivelCarga==2){
        matriz[(e.cordenadas.x)][(e.cordenadas.y)].state=1;
        matriz[(e.cordenadas.x)][(e.cordenadas.y)].tipo=2;
        mineralesSelc++;
        e.style.background= "url(assets/img/diamante.png)"
        e.style.backgroundRepeat="no-repeat";
        e.style.backgroundPosition="center"
        e.style.backgroundSize = (e.tam[0])*.8+"px "+(e.tam[0])*.8+"px";
        e.activo=true;
        diamantes.push(e.cordenadas);
        if(mineralesSelc == mineralesNum){
            nivelCarga=3;
            $( "#evento").trigger( "custom", [ "Custom", "Event" ] );
        }
    }
    else if (nivelCarga==3){
        matriz[(e.cordenadas.x)][(e.cordenadas.y)].state=1;
        matriz[(e.cordenadas.x)][(e.cordenadas.y)].tipo=3;
        obstaSelc++;
        e.style.background= "url(assets/img/piedras.png)";
        e.style.backgroundSize = (e.tam[0])*.8+"px "+(e.tam[0])*.8+"px";
        e.style.backgroundRepeat="no-repeat";
        e.style.backgroundPosition="center"
        e.activo=true;
        obstaculos.push(e.cordenadas);
        if(obstaSelc == obstaculosNum){
            nivelCarga=4;
            $( "#evento").trigger( "custom", [ "Custom", "Event" ] );
        }
    }
}
function quitar(e) {
    e.style.background= "transparent";
    e.activo=false
}

function crearMatriz(x,y) {
    var a = new Array(x);
    for (var i = 0; i < x; i++) {
        a[i] = new Array(y);
        for (var j = 0; j < y; j++) {
            a[i][j] = {'state':0,'tipo':0};
        }
    }
    console.log(a)
    return a;
}