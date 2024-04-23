function personalizarTexto() {
    var nomeCliente = document.getElementById('nome').value;
    var placa = document.getElementById('placa').value;
    var seguradora = document.getElementById('seguradora').value;
    var numeroParcela = document.getElementById('numeroParcela').value;
    var data = document.getElementById('data').value;
    var dataProrrogada = document.getElementById('dataProrrogada').value;
    var telefone = document.getElementById('telefone').value;

    var camposPreenchidos = true;

    if (nomeCliente === '' || placa === '' || seguradora === '' || numeroParcela === '' || data === '' || dataProrrogada === '') {
        alert('Por favor, preencha todos os campos obrigatórios.');
        camposPreenchidos = false;
    }

    var placaRegex = /^[a-zA-Z]{3}\d{4}$|^[a-zA-Z]{3}\d[a-zA-Z]\d{2}$/;
    if (!placa.match(placaRegex)) {
        alert('Por favor, insira uma placa válida.');
        camposPreenchidos = false;
    }

    if (!camposPreenchidos) {
        return;
    }

    // Habilita o botão de envio de WhatsApp
    document.getElementById('btnEnviarWhatsapp').disabled = false;

    function formatarData(dataStr) {
        var dataObj = new Date(dataStr);
        var dia = ("0" + dataObj.getUTCDate()).slice(-2);
        var mes = ("0" + (dataObj.getUTCMonth() + 1)).slice(-2); 
        var ano = dataObj.getUTCFullYear();
        return dia + '/' + mes + '/' + ano;
    }

    var dataFormatada = formatarData(data);
    var dataFormatadaProrrogada = formatarData(dataProrrogada);

    var textoPersonalizado = "Prezado " + nomeCliente + ", bom dia! Tudo bem?\n\n" +
    "A seguradora " + seguradora + " não identificou o pagamento da " + numeroParcela + "ª parcela que venceu na data " + dataFormatada + " referente ao veículo de placa " + placa + ".\n\n" +
    "Desta forma a CIA liberou um boleto com o prazo de pagamento para " + dataFormatadaProrrogada + ". O não pagamento da parcela acarretará no cancelamento do seguro e o veículo ficará sem cobertura securitária.\n\n" +
    "Por gentileza enviar comprovante de pagamento quando o mesmo for efetuado.\n\n" +
    "Segue em anexo boleto prorrogado.";

    document.getElementById('textoPersonalizado').textContent = textoPersonalizado;
}

function copiarTexto() {
    var texto = document.getElementById('textoPersonalizado').innerText;
    var textoLimpo = texto.replace(/\r/g, ''); // Remove apenas retornos de carro

    var inputTemporario = document.createElement('input');
    inputTemporario.setAttribute('value', textoLimpo);
    document.body.appendChild(inputTemporario);

    inputTemporario.select();
    inputTemporario.setSelectionRange(0, 99999); // Para dispositivos móveis

    document.execCommand('copy');

    document.body.removeChild(inputTemporario);

    alert('Texto copiado com sucesso!');
}

function enviarEmail() {
    var texto = document.getElementById('textoPersonalizado').textContent;
    var assunto = encodeURIComponent("Parcela em Atraso - Segurado: ");
    var corpoEmail = encodeURIComponent(texto);

    var linkEmail = "mailto:?subject=" + assunto + "&body=" + corpoEmail;

    window.open(linkEmail, "_blank");
}

function enviarWhatsapp() {
    var texto = document.getElementById('textoPersonalizado').textContent;
    var telefone = document.getElementById('telefone').value;

    // Verifica se há um número de telefone válido
    if (telefone.trim() === '') {
        alert('Por favor, insira um número de telefone válido.');
        return;
    }

    // Formata o texto para a URL do WhatsApp
    var textoFormatado = encodeURIComponent(texto);
    var linkWhatsapp = 'https://api.whatsapp.com/send?phone=' + telefone + '&text=' + textoFormatado;

    // Abre a URL do WhatsApp em uma nova aba
    window.open(linkWhatsapp, '_blank');
}

