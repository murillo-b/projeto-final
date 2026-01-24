// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    //selecionar elementos do DOM
    const inputSenha = document.getElementById('inputSenha');
    const btnSubmit = document.getElementById('btnSubmit');
    const form = document.getElementById('formCadastro');
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');

    //Selecionar os itens da lista de requisitos de senha
    const reqLength = document.getElementById('req-length');
    const reqUpper = document.getElementById('req-upper');
    const reqNumber = document.getElementById('req-number');
    const reqSpecial = document.getElementById('req-special');

    // Variáveis para controle de validação
    let nomeValido = false;
    let emailValido = false;
    let senhaValida = false;

    // Função para validar nome
    function validarNome() {
        const valor = inputNome.value.trim();
        nomeValido = valor.length > 0;
        
        // Mostrar alerta se nome estiver vazio
        if (!nomeValido) {
            alert('Nome é obrigatório');
        }
        
        verificarFormulario();
        return nomeValido;
    }

    // Função para validar email
    function validarEmail() {
        const valor = inputEmail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        emailValido = emailRegex.test(valor);
        
        // Mostrar alerta se email estiver inválido
        if (!emailValido) {
            alert('Email é obrigatório e deve ser válido');
        }
        
        verificarFormulario();
        return emailValido;
    }

    //Função que verifica a senha a cada tecla digitada
    inputSenha.addEventListener('input', () => {
        const valor = inputSenha.value;

        //validar tamanho
        const hasLength = valor.length >= 8;
        alternarClasse(reqLength, hasLength);
        
        //validar letra maiuscula (Regex)
        const hasUpper = /[A-Z]/.test(valor);
        alternarClasse(reqUpper, hasUpper);
        
        //validar numero
        const hasNumber = /[0-9]/.test(valor);
        alternarClasse(reqNumber, hasNumber);
        
        //validar caractere especial
        const hasSpecial = /[!@#$%¨&*^~<>{}?]/.test(valor);
        alternarClasse(reqSpecial, hasSpecial);

        // Atualizar estado da senha
        senhaValida = hasLength && hasUpper && hasNumber && hasSpecial;
        
        verificarFormulario();
    });

    // Função para verificar se todo o formulário está válido
    function verificarFormulario() {
        if (nomeValido && emailValido && senhaValida) {
            btnSubmit.disabled = false;
        } else {
            btnSubmit.disabled = true;
        }
    }

    //função para trocar cor do texto
    function alternarClasse (elemento, estaValido){
        const icone = elemento.querySelector('i');
        if (estaValido){
            elemento.classList.add('valid');
            elemento.classList.remove('invalid');
            icone.classList.remove('ph-circle');
            icone.classList.add('ph-check-circle');
        } else {
            elemento.classList.remove('valid');
            elemento.classList.add('invalid');
            icone.classList.remove('ph-check-circle');
            icone.classList.add('ph-circle');
        }
    }

    // Event listener para o envio do formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Previne o envio padrão do formulário
        
        // Validar todos os campos novamente
        const nomeOk = validarNome();
        const emailOk = validarEmail();
        const senhaOk = senhaValida;
        
        // Se todos os campos estiverem válidos
        if (nomeOk && emailOk && senhaOk) {
            // Mostrar mensagem de sucesso
            alert('Cadastro realizado!');
            
            // Resetar o formulário
            form.reset();
            
            // Resetar as validações da senha
            const itens = [reqLength, reqUpper, reqNumber, reqSpecial];
            itens.forEach(item => {
                item.classList.remove('valid');
                item.classList.add('invalid');
                const icone = item.querySelector('i');
                icone.classList.remove('ph-check-circle');
                icone.classList.add('ph-circle');
            });
            
            // Resetar estados de validação
            nomeValido = false;
            emailValido = false;
            senhaValida = false;
            
            // Desabilitar botão novamente
            btnSubmit.disabled = true;
        }
    });

    // Validar nome quando perde o foco
    inputNome.addEventListener('blur', validarNome);
    
    // Validar email quando perde o foco
    inputEmail.addEventListener('blur', validarEmail);
});