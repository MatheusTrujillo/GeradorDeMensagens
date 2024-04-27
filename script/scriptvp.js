function personalizarTexto() {
    var nomeCliente = document.getElementById('nome').value;
    var placa = document.getElementById('placa').value.toUpperCase();
    var seguradora = document.getElementById('seguradora').value;
    var instalacaoTipo = document.getElementById('instalacaoTipo').value;
    var telefone = document.getElementById('telefone').value;

    var camposPreenchidos = true;

    if (nomeCliente === '' || placa === '' || seguradora === '' || instalacaoTipo === '') {
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

    var textoPersonalizado = "Prezado " + nomeCliente + ", bom dia! Tudo bem?\n\n" +
    
    "A seguradora " + seguradora + " solicitou " + instalacaoTipo + " referente ao seu veículo de placa " + placa + ".\n\n" +

    "Desta forma estou entrando em contato para verificar referente ao agendamento e precisarei de algumas informações: \n\n" +

    "- Tipo de atendimento:\n"+
    "A domicílio ou comparecer em Posto-fixo.\n\n"+

    "- Data de preferência.\n\n"+

    "- Período  de preferência:\n"+
    "Manhã (08:00 - 13:00) ou Tarde (13:00 - 18:00)\n\n"+

    "- Endereço completo.\n\n"+

    "Após estas informações verificaremos junto à prestadora para realizar o agendamento e retornamos.\n\n"+

    "Atenciosamente.";


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
    var nomeCliente = document.getElementById('nome').value;
    var texto = document.getElementById('textoPersonalizado').textContent;
    var assunto = encodeURIComponent("Agendamento pendente - Segurado: "+ nomeCliente);
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