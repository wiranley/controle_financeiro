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

    recuperarTodosRegistros(){
        let id = localStorage.getItem('id')
        let despesas = Array();

        for (let index = 1; index <= id; index++) {
            let despesa = JSON.parse(localStorage.getItem(index))

            if(despesa === null){
                continue;
            }
            despesas.push(despesa);
        }
        return despesas;
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

        document.querySelector('#modal_titulo').innerHTML = 'Registro inserido com sucesso';
        document.querySelector('#modal_titulo_div').className = "modal-header text-success";
        document.querySelector('#modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!';
        document.querySelector('#modal_btn').innerHTML = 'Voltar';
        document.querySelector('#modal_btn').className = 'btn btn-success';

        $('#modalRegistraDespesa').modal('show');

        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';
    }else{
  
        document.querySelector('#modal_titulo').innerHTML = 'Erro na inclusão do registro';
        document.querySelector('#modal_titulo_div').className = "modal-header text-danger";
        document.querySelector('#modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!';
        document.querySelector('#modal_btn').innerHTML = 'Voltar e corrigir';
        document.querySelector('#modal_btn').className = 'btn btn-danger';

        $('#modalRegistraDespesa').modal('show');

    }


}

function carregaListaDespes(){
    let despesas  = Array();
    despesas = bd.recuperarTodosRegistros();
    let listadespesas = document.querySelector('tbody')

    for (let index = 0; index < despesas.length; index++) {
        const element = despesas[index];
 
        switch (element.tipo) {
            case '1': element.tipo = "Alimentação"
                
                break;
            case '2': element.tipo = "Educação"
                
                break;
            case '3': element.tipo = "Lazer"
                
                break;
            case '4': element.tipo = "Saúde"
                
                break;
            case '5': element.tipo = "Transporte"
                
                break;
        
            default:
                break;
        }

        let linha = listadespesas.insertRow();
        linha.innerHTML = `<tr>
                                <td>
                                    ${element.dia}/${element.mes}/${element.ano}
                                </td>
                                <td>
                                ${element.tipo}
                                </td>
                                <td>
                                ${element.descricao}
                                </td>
                                <td>
                                ${element.valor}
                                </td>
                            </tr>` 
        
    }
    console.log(despesas)
}
