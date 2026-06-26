const formulario = document.getElementById("formCep");
const inputCep = document.getElementById("cep");
const mensagemErro = document.getElementById("erro");
const resultado = document.getElementById("resultado");
const containerResultado = document.querySelector(".container__resultado");

//Fique observando esse formulário. Quando ele for enviado (clicando no botão Consultar), execute a função que está entre { }
formulario.addEventListener("submit", async function(event) { //Essa função pode executar operações que demoram um pouco, como consultar uma API.

    event.preventDefault(); //Não recarregue a página. Eu (JavaScript) vou controlar o que acontece quando o formulário for enviado

    mensagemErro.textContent = "";// Limpa mensagens de erro antigas
    

    const cepDigitado = inputCep.value;

    if (cepDigitado.length !== 8) { //Se a quantidade de caracteres for diferente de 8...
        mensagemErro.textContent = "O CEP deve conter exatamente 8 dígitos.";
        containerResultado.classList.remove("mostrar");
        return;
    }

    if (!/^\d+$/.test(cepDigitado)) { //Do começo ao fim, só pode existir número.
        mensagemErro.textContent = "O CEP deve conter apenas números.";
        containerResultado.classList.remove("mostrar");
        return;
    }

    // aqui faz a requisição para API
    const resposta = await fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`);

    //aqui eu converto a resposta da API para um objeto JavaScript
    const dados = await resposta.json();

    //aqui eu verifico se a API retornou um cep inexistente
    if (dados.erro) {
        mensagemErro.textContent = "CEP não encontrado.";
        containerResultado.classList.remove("mostrar");
        return;
    }

    //aqui é aonde esta exibindo os daods do endereço na página
    document.getElementById("logradouro").textContent = dados.logradouro;
    document.getElementById("bairro").textContent = dados.bairro;
    document.getElementById("cidade").textContent = dados.localidade;
    document.getElementById("estado").textContent = dados.uf;

    containerResultado.classList.add("mostrar");

});