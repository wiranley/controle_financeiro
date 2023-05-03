class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == "" || this[i] == null){
                return false;
            }

            return true;
        }
    }
}

class Bd{

    constructor(){
        let id = localStorage.getItem('id');

        if(id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getProximoID(){
        let getProximoID = localStorage.getItem('id')
        return parseInt(getProximoID) + 1;
    }

    gravar(despesa){

        let id = this.getProximoID();

        localStorage.setItem(id, JSON.stringify(despesa));

        localStorage.setItem('id', id)
    }
}

    let bd = new Bd();

function cadastrarDespesa(){
    
    let ano = document.querySelector('#ano');
    let mes = document.querySelector('#mes');
    let dia = document.querySelector('#dia');
    let tipo = document.querySelector('#tipo');
    let descricao = document.querySelector('#descricao');
    let valor = document.querySelector('#valor');


    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    );

    if(despesa.validarDados()){
        bd.gravar(despesa);
        $('#sucessoGravacao').modal('show');
    }else{
        $('#erroGravacao').modal('show');
    }


}

