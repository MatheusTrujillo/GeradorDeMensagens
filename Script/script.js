function personalizarTexto() {
    // Obter os valores dos campos
    var nomeCliente = document.getElementById('nome').value;
    var placa = document.getElementById('placa').value;
    var seguradora = document.getElementById('seguradora').value;
    var numeroParcela = document.getElementById('numeroParcela').value;
    var data = document.getElementById('data').value;
    var dataProrrogada = document.getElementById('dataProrrogada').value;

    // Variável de validação
    var camposPreenchidos = true;

    // Verificar se os campos obrigatórios estão preenchidos
    if (nomeCliente === '' || placa === '' || seguradora === '' || numeroParcela === '' || data === '' || dataProrrogada === '') {
        alert('Por favor, preencha todos os campos obrigatórios.');
        camposPreenchidos = false;
    }
    // Validar a placa (padrão normal e Mercosul)
    var placaRegex = /^[a-zA-Z]{3}\d{4}$|^[a-zA-Z]{3}\d[a-zA-Z]\d{2}$/;
    if (!placa.match(placaRegex)) {
        alert('Por favor, insira uma placa válida.');
        camposPreenchidos = false;
    }   


    // Se algum campo estiver vazio ou a placa for inválida, retorna sem gerar o texto
    if (!camposPreenchidos) {
        return;
    }

    // Função para formatar a data no formato dd/mm/aaaa
    function formatarData(dataStr) {
        var dataObj = new Date(dataStr);
        var dia = ("0" + dataObj.getUTCDate()).slice(-2);
        var mes = ("0" + (dataObj.getUTCMonth() + 1)).slice(-2); 
        var ano = dataObj.getUTCFullYear();
        return dia + '/' + mes + '/' + ano;
    }



    var dataFormatada = formatarData(data);
    var dataFormatadaProrrogada = formatarData(dataProrrogada);

    var textoPersonalizado = `Prezado ${nomeCliente}, bom dia! Tudo bem? A seguradora ${seguradora} não identificou o pagamento da ${numeroParcela}ª parcela que venceu na data ${dataFormatada} referente ao veículo de placa ${placa}.
    
    Desta forma a CIA liberou um boleto com o prazo de pagamento para ${dataFormatadaProrrogada} O não pagamento da parcela acarretará no cancelamento do seguro e o veículo ficará sem cobertura securitária.

    Por gentileza enviar comprovante de pagamento quando o mesmo for efetuado.

    Segue em anexo boleto prorrogado.`;

    document.getElementById('textoPersonalizado').textContent = textoPersonalizado;
}
