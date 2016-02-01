// *********** PARA TROCAR INSTRUÇÕES CHAME A FUNÇÃO: TrocaInstrucao('INSTRUÇÃO NOVA');  ******************
// * ********* PARA TROCAR NAVEGABILIDADE CHAME A FUNÇÃO: TrocaNavegacao('NAVEGABILIDADE NOVA'); **********

'use strict';

// ************ AUDIOS PLUGIN HOWLER.JS  Documentação: http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library ***************

// Para declarar apenas um áudio
	// var trilha_sonora = new Howl({urls: ['media/audio/trilha_sonora.mp3'], volume: 1});

// Para declarar um sprite de áudio
/*
	var narracao = new Howl({  urls: ['media/audio/narracao1.mp3','media/audio/narracao1.ogg'],  sprite: { 
		text1: [0, 53500],
		text2: [29500, 51500],
		text3: [29500, 51500]
	}});
*/

// Para chamar o áudio:
// trilha_sonora.stop().play();

// Para alterar volume do áudio, valor de 0 até 1
// trilha_sonora.volume(1);  

// ************ AUDIOS PLUGIN HOWLER.JS ***************

var somAcerto = new Howl({urls: ['media/audio/certo.mp3']});
var somErro = new Howl({urls: ['media/audio/erro.mp3']});
var falas = new Howl({
    urls: ['media/audio/DKM1006.mp3'], 
    sprite: {
        titulo: [0, 3100],
        introducao: [3100, 6000],
        fase1: [9100, 14900],
        acerto: [24000, 5000],
        fase2: [29000, 15500],
        fase3: [44500, 19000],
        fase4: [63500, 17500],
        fase5: [81000, 20000]
    }
});
var faseAtual = 1;
var totalFases = 5;
var resp = [3, 2, 3, 1, 3];
var startGame = {
	init: function(){
        falas.play("introducao");
	}
};
$("#btn-fim").on("click",function(){
    window.parent.location.href = '../index.html';
});
$("#btn-troca-fase").on("click",function(){
    falas.stop();
    faseAtual++;
    $("#alternativas").fadeOut(400, function(){
        for(var i = 1; i <= 4; i++){
            $("#alternativa" + i).removeClass("alternativa-errada");
            $("#alternativa" + i).removeClass("alternativa-correta");
            $("#alternativa" + i).prop('disabled', false);
            $("#alternativa" + i).css("opacity", "0");
            $("#alternativa" + i).css('cursor', 'pointer');
            $("#marca-alternativa" + i).removeClass("marca-alternativa-errada");
            $("#marca-alternativa" + i).removeClass("marca-alternativa-correta");
        }
        $("#alternativas").show();
    });

    $("#feedback1").fadeOut();
    $("#fase" + faseAtual).fadeIn(500, function(){
        $("#fase" + (faseAtual-1)).hide();
        $("#alternativas").show();
        falas.play("fase" + faseAtual);
    });
});
$(".alternativa").on("click",function(){
    var alternativaEscolhida = Number($(this).attr("id").substr(11));
    falas.stop();
    if(alternativaEscolhida == resp[faseAtual-1]){
        $("#marca-alternativa" + alternativaEscolhida).addClass("marca-alternativa-correta");
        $(this).addClass("alternativa-correta");
        somAcerto.play();
        for(var i = 1; i <= 4; i++){
            if(i != resp[faseAtual-1]){
                $("#alternativa" + i).prop('disabled', true);
                $("#alternativa" + i).css("opacity", "1");
                $("#alternativa" + i).css('cursor', 'auto');
            }
        }
        if(faseAtual < totalFases){
            $("#feedback1").fadeIn();
        }
        else{
            $("#feedback2").fadeIn();
        }
        falas.play("acerto");
    }
    else{
        $("#marca-alternativa" + alternativaEscolhida).addClass("marca-alternativa-errada");
        $(this).addClass("alternativa-errada");
        somErro.play();
    }
    $(this).css("opacity", "1");
    $(this).prop('disabled', true);
    $(this).css('cursor', 'auto');
});
$("#btn-iniciar").on("click",function(){
    falas.stop();
    $("#fase" + faseAtual).fadeIn(500, function(){
        $("#tela-inicio").hide();
        $("#alternativas").show();
        falas.play("fase" + faseAtual);
    });
});
