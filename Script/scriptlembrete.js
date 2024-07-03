function personalizarTexto() {
    var nomeCliente = document.getElementById('nome').value;
    var placa = document.getElementById('placa').value.toUpperCase();
    var seguradora = document.getElementById('seguradora').value;
    var data = document.getElementById('data').value;
    var pgto = document.getElementById('pgto').value;
    var telefone = document.getElementById('telefone').value;

    var camposPreenchidos = true;

    if (nomeCliente === '' || placa === '' || seguradora === '' || data === '' || pgto === '') {
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


    function formatarData(dataStr) {
        var dataObj = new Date(dataStr);
        var dia = ("0" + dataObj.getUTCDate()).slice(-2);
        var mes = ("0" + (dataObj.getUTCMonth() + 1)).slice(-2); 
        var ano = dataObj.getUTCFullYear();
        return dia + '/' + mes + '/' + ano;
    }

    var dataFormatada = formatarData(data);

    var textoPersonalizado = "Prezado " + nomeCliente + ", bom dia! Tudo bem?\n\n" +

    "Lembrando que a 1º parcela do seu seguro " + seguradora + " referente ao veículo de placa " + placa + " vencerá na data de " + dataFormatada + " via "+ pgto + ".\n\n" +

    "O não pagamento da parcela resultará no cancelamento do seguro.\n\n" +

    "Qualquer duvida, estamos à sua disposição.\n\n" +

    "Atenciosamente."

    document.getElementById('textoPersonalizado').textContent = textoPersonalizado;

    // Habilita o botão de envio de WhatsApp
     document.getElementById('btnEnviarWhatsapp').disabled = false;

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
    var nomeCliente = document.getElementById('nome').value;
    var texto = document.getElementById('textoPersonalizado').textContent;
    var assunto = encodeURIComponent("Lembrete de parcela - Segurado: "+ nomeCliente);
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
