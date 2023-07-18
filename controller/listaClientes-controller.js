import { clienteService } from "../service/cliente-service.js";

const criaNovaLinha = function (nome, email, id) {
    const linhaNovoCliente = document.createElement("tr");
    const conteudo = `
    <td class="td" data-td>${nome}</td>
    <td>${email}</td>
    <td>
        <ul class="tabela__botoes-controle">
            <li><a href="../telas/edita_client.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
            <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
        </ul>
    </td> `

    linhaNovoCliente.innerHTML = conteudo;
    linhaNovoCliente.dataset.id = id;
    return linhaNovoCliente;
}


const tabela = document.querySelector("[data-tabela]");

tabela.addEventListener('click', async (evento) => { // Async informa que a função é assincrona e irá aguardar por uma resposta

    let ehBotaoDeletar = evento.target.className == 'botao-simples botao-simples--excluir';

    if (ehBotaoDeletar) {
        try {
            const linhaCliente = evento.target.closest('[data-id]');
            let id = linhaCliente.dataset.id;
            await clienteService.removeCliente(id); // await é a plavra reservada que substitui o .THEN. Await espera pela resposta(promise) que retorna com os dados solicitados na requisição

            linhaCliente.remove();
        }
        catch (erro) {
            console.log(erro);
            window.location.href = '../telas/erro.html'
        }


    }
})

const render = async () => {
    try {
        const listaCliente = await clienteService.listaClientes();

        listaCliente.forEach(element => {
            tabela.appendChild(criaNovaLinha(element.nome, element.email, element.id))
        });
    }
    catch (erro) {
        console.log(erro);
        window.location.href = '../telas/erro.html'
    }



    /*clienteService.listaClientes().then(data => {
    
        data.forEach(element => {
            tabela.appendChild(criaNovaLinha(element.nome, element.email, element.id));
        })*/
}
render()

