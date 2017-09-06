/**
 * Created by Charly on 25/08/2017.
 */
function moverActivo(xx,yyy) {
    for(var y=1; y<=numFilas.value;y++){
        var a = id.replace("%x",xx).replace("%y",y);
        $(a).css({
            "background": "#1ABB9C "
        });
        Concurrent.Thread.sleep(1000);
        $(a).css({
            "background": "transparent"
        });
    }
}


function moverNave(xx,yyy) {
    for(var y=1; y<=numFilas.value;y++){
        var a = id.replace("%x",xx).replace("%y",y);
        $(a).css({
            "background": "url(assets/img/agente.png)",
            "background-size":"100% 100%"
        });
        Concurrent.Thread.sleep(1000);
        $(a).css({
            "background": "transparent"
        });
    }
}

  


var run= function(ids) {
 var agente = {
        id:ids,
        estado: 0,
        carga:false,
        posicion: nave
    };
    var aux = new Array(2);

        while(countdiamantes > 0){
            if (agente.estado==0) {aux = agente.posicion}
            var a = id.replace("%x",agente.posicion[0]).replace("%y",agente.posicion[1]);
            var b = id.replace("%x",aux[0]).replace("%y",aux[1]);
            var na = id.replace("%x",agente.posicion[0]).replace("%y",agente.posicion[1]);
            var nb = id.replace("%x",nave[0]).replace("%y",nave[1]);

            console.log(nb)
            $(nb).css({
                "background": "url(assets/img/nave.png)",
                "background-size":"100% 100%"
            });

            for(var i in obstaculos){
                var ob = id.replace("%x",obstaculos[i].x).replace("%y",obstaculos[i].y);
                $(ob).css({
                    "background": "url(assets/img/piedras.png)",
                    "background-size":"100% 100%"
                });

            }





            aux=[agente.posicion[0],agente.posicion[1]];
         console.log(agente.posicion   + " postAntigua: " + aux)
            if(matriz[agente.posicion[0]][agente.posicion[1]].state > 0){ //casilla ocupada
                switch (matriz[agente.posicion[0]][agente.posicion[1]].tipo){ //tipo de casilla
                    case 1:
                        console.log("esta nave")
                        if (agente.carga){
                            countdiamantes  --;
                            agente.carga=false;






                        }

                        // while(trayec[ids].length !=0){
                        //
                        //     console.log(auer)
                        //     var addr = id.replace("%x",auer[0]).replace("%y",auer[1]);
                        //     console.log(addr)
                        //     $(addr).css({
                        //         "background": "transparent"
                        //     });
                        //
                        // }

                        // for (var xe in trayec[ids]){
                        //     var auer = trayec[ids][xe];
                        //     console.log('=>>>>>: ' + auer);
                        //
                        // }
                        else{
                            trayec[ids]= new Array();
                            agente.posicion = aux;
                            agente.estado=1;
                        }


                        break;
                    case 3:
                        console.log("esta obstaculo");
                        agente.posicion = aux;
                        $(a).css({
                            "background": "url(assets/img/piedras.png)",
                            "background-size":"100% 100%"
                        });
                        $(b).css({
                            "background": "url(assets/img/piedras.png)",
                            "background-size":"100% 100%"
                        });
                        agente.state=3;
                        break;
                    case 2:
                        console.log("esta diamante");

                        matriz[agente.posicion[0]][agente.posicion[1]].state=1;
                        matriz[agente.posicion[0]][agente.posicion[1]].tipo=1;

                        agente.carga=true;
                        agente.estado=2;
                        break;
                }
            }



            if (aux == nave){
                $(b).css({
                    "background": "url(assets/img/nave.png)",
                    "background-size":"100% 100%"
                });
            }

            if (a!=b){
                $(b).css({
                    "background": "transparent"
                });
            }



            switch (agente.estado){
                case 0:
                    agente.estado=1;
                    break;
                case 1:  //Mover random





                    var op =Math.floor( Math.random() * ( 1 + 4 ));
                    switch (op){
                        case 1: //mover arriba
                            if (agente.posicion[1]< matriz.length-1)
                                agente.posicion[1]=agente.posicion[1]+1;
                            break;
                        case 2://mover derecha
                            if (agente.posicion[1]< matriz.length-2)
                                agente.posicion[0]=agente.posicion[0]+1;
                            break;
                        case 3://mover abajo
                            if (agente.posicion[1]>0)
                                agente.posicion[1]=agente.posicion[1]-1;
                            break;
                        case 4://mover izquierda
                            if (agente.posicion[0]>0)
                                agente.posicion[0]=agente.posicion[0]-1;
                            break;
                    }

                    //if (aux!=agente.posicion){
                        console.log("Se agrego al map")
                        trayec[ids].push(aux);

                    //}else{
                      //  console.log("no se agregp")
                    //}

                    if(matriz[agente.posicion[0]][agente.posicion[1]].state == 0){

                        $(a).css({
                            "background": "url(assets/img/agente.png)",
                            "background-size":"100% 100%"
                        });
                    }






                    //console.log('op: '+op + 'pos: '+ agente.posicion[0]+' : '+agente.posicion[1]);


                    break;
                case 2: //ir a nave

                   var ar = trayec[ids].splice(trayec[ids].length-1,1);
                    if(trayec[ids].length ==0){

                        agente.posicion=nave;
                    }else{


                        var br = id.replace("%x",ar[0][0]).replace("%y",ar[0][1]);
                        console.log("vamos a la nave")
                        agente.posicion=ar[0];
                        $(a).css({
                            "background": "url(assets/img/agente.png)",
                            "background-size":"100% 100%"
                        });

                    }



                    break;


                case 3:

                    alert("obs");

                    $(a).css({
                        "background": "url(assets/img/piedras.png)",
                        "background-size":"100% 100%"
                    });
                    agente.estado=1;
                    break;
            }

            if (trayec[ids].length > 0 ){
                console.log(trayec[ids])

                var eir = trayec[ids][(trayec[ids].length)-1];
                var ad = id.replace("%x",eir[0]).replace("%y",eir[1]);
                $(b).addClass("ver")
                $(b).css({
                    "background": "#1ABB9C"
                });
            }


            Concurrent.Thread.sleep(500)



        }


};




