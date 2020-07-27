
export default function (iptupbhRawValue) {
  return maskIndiceCadastral(iptupbhRawValue)
}

function maskIndiceCadastral(vr) {
    var exp_reg = new RegExp("^[a-zA-Z ]*$");
    var exp_reg2 = new RegExp("^[0-9xX]*$");
    var exp_reg3 = new RegExp("^[0-9a-zA-Z]*$");
    var numeros = new RegExp("[0-9]");
    const expressao = new RegExp("^[^.]*$");

    vr = vr.toUpperCase();				
    vr = filtraPorExpressao(expressao, vr);

    let tam = vr.length;
    if (tam <= 15) {
        tam = vr.length;
    } else if (tam > 15) {
        vr = vr.substr(0, 15);
        tam = vr.length;
    }

    // verifica as letras
    var str = "";
    if (tam < 7) {
        str = filtraCaracteres(vr);
    }

    if ((tam >= 7) && (tam < 11)) {
        if (exp_reg.test(vr.substr(6, 1))) {
            str = filtraCaracteres(vr.substr(0, 6)) + vr.substr(6, 1) + filtraCaracteres(vr.substr(7, tam));
        } else if (numeros.test(vr.substr(6, 1))) {
            str = filtraCaracteres(vr.substr(0, 6));
            str = str + " " + vr.substr(6, 1);
        } else {
            str = filtraCaracteres(vr.substr(0, 6));
        }
    }

    if ((tam >= 11) && (tam < 13)) {
        if ((exp_reg.test(vr.substr(6, 1))) && (exp_reg.test(vr.substr(10, 1))) && (exp_reg3.test(vr.substr(11, 1))) ) {
            str = filtraCaracteres(vr.substr(0, 6)) + vr.substr(6, 1) + filtraCaracteres(vr.substr(7, 3)) + vr.substr(10, 2) + filtraCaracteres(vr.substr(12, tam));
        } else {
            if (exp_reg.test(vr.substr(6, 1))) {
                str = filtraCaracteres(vr.substr(0, 6)) + vr.substr(6, 1) + filtraCaracteres(vr.substr(7, 3));
            } else if (numeros.test(vr.substr(6, 1))) {
                str = filtraCaracteres(vr.substr(0, 6));
                str = str + " " + vr.substr(6, 1);
            }
            if (numeros.test(vr.substr(10, 1))) {
                str = str + " " + vr.substr(10, 1);
            } else {
                    if (exp_reg.test(vr.substr(10, 1)))  {
                    str = str + vr.substr(10, 1);
                    }
            }
            if (exp_reg3.test(vr.substr(11, 1))) {
                str = str + vr.substr(11, 1);
            }
        }
    }

    if (tam >= 13) {
        if ((exp_reg.test(vr.substr(6, 1))) && (exp_reg.test(vr.substr(10, 1))) && (exp_reg3.test(vr.substr(11, 1))) && (exp_reg2.test(vr.substr(14, 1)))) {
            str = filtraCaracteres(vr.substr(0, 6)) + vr.substr(6, 1) + filtraCaracteres(vr.substr(7, 3)) + vr.substr(10, 2) + filtraCaracteres(vr.substr(12, 2)) + vr.substr(14, 1);
        } else {
            if (exp_reg.test(vr.substr(6, 1))) {
                str = filtraCaracteres(vr.substr(0, 6)) + vr.substr(6, 1) + filtraCaracteres(vr.substr(7, 3));
                    if (numeros.test(vr.substr(10, 1))) {
                        str = str + " " + vr.substr(10, 1);
                    } else {
                        if (exp_reg.test(vr.substr(10, 1)))  {
                        str = str + vr.substr(10, 1);
                        }
                    }
                    if (exp_reg3.test(vr.substr(11, 1))) {
                        str = str + vr.substr(11, 3);
                    }
            }
        }
    }
    // atualiza os valores
    vr = str;
    tam = vr.length;
    // formata os espaçamentos
    if ( tam <= 1 ){
        return vr;
    }
    if ((tam >= 2) && (tam <= 4)) {
        return vr.substr( 0, tam - 1 ) + '.' + vr.substr( tam - 1, tam ) ;
    }
    if ((tam >= 5) && (tam <= 8)) {
        return vr.substr( 0, tam - 4 ) + '.' + vr.substr( tam - 4, 3) + '.' + vr.substr( tam - 1, tam ) ;
    }
    if ((tam >= 9) && (tam <= 12)) {
        return vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 4 ) + '.' + vr.substr( tam - 4, 3) + '.' + vr.substr( tam - 1, tam ) ;
    }
    if ((tam >= 13) && (tam <= 15)) {
        return vr.substr( 0, tam - 12 ) + '.' + vr.substr( tam - 12, 4 ) + '.' + vr.substr( tam - 8, 4 ) + '.' + vr.substr( tam - 4, 3) + '.' + vr.substr( tam - 1, tam ) ;
    }			  
}

function filtraPorExpressao(expressao, valor) {
    const exp_reg = expressao;
    const tam = valor.length;
    let str = "";
    for (let i = 0; i < tam; i++) {
        if(exp_reg.test(valor.substr(i, 1))) {
            str += valor.substr(i, 1);
        }
    }
    return str;
}

function filtraCaracteres(valor) {
    const exp_reg = new RegExp("^[0-9]*$");
    const tam = valor.length;
    let str = "";
    for (let i = 0; i < tam; i++) {
        if(exp_reg.test(valor.substr(i, 1))) {
            str += valor.substr(i, 1);
        }
    }
    return str;
}