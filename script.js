document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario');
    const nome = document.getElementById('inome');
    const cpf = document.getElementById('icpf');
    const idade = document.getElementById('iidade');
    const email = document.getElementById('iemail');
    const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];

    let usuario = JSON.parse(localStorage.getItem('usuario')) || [];
    let editIndex = null;

    const attTable = () => {
        tabela.innerHTML = '';
        usuario.forEach((usuario,index) => {
            const linha = tabela.insertRow();
            linha.insertCell(0).textContent = usuario.nome;
            linha.insertCell(1).textContent = usuario.cpf;
            linha.insertCell(2).textContent = usuario.idade;
            linha.insertCell(3).textContent = usuario.email;
            const celula = linha.insertCell(4);
            const editarBotao = document.createElement('button');
            editarBotao.textContent = 'Editar';
            editarBotao.onclick = () => editarUsuario(index);
            celula.appendChild(editarBotao);

            const deleteBotao = document.createElement('button');
            deleteBotao.textContent = 'Excluir';
            deleteBotao.onclick = () => deleteUsuario(index);
            celula.appendChild(deleteBotao);
        });
    };
    
    const addUsuario = (nome,cpf,idade,email) => {
        usuario.push({nome,cpf,idade,email});
        localStorage.setItem('usuario', JSON.stringify(usuario));
        attTable();
    };
    const editarUsuario = (index) => {
        editIndex = index;
        const user = usuario[index];
        nome.value = user.nome;
        cpf.value = user.cpf;
        idade.value = user.idade;
        email.value = user.email;
    };
    const updateUsuario = (index,nome,cpf,idade,email) => {
        usuario[index] = {nome,cpf,idade,email};
        localStorage.setItem('usuario', JSON.stringify(usuario));
        editIndex = null;
        attTable();
    };
    const deleteUsuario = (index) => {
        usuario.splice(index,1);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        attTable();
    };


    form.addEventListener('submit',(event) => {
        event.preventDefault();
        const addNome = nome.value.trim();
        const addCpf = cpf.value.trim();
        const addIdade = idade.value.trim();
        const addEmail = email.value.trim();
        if (addNome && addCpf && addIdade && addEmail){
            if (editIndex === null){
                addUsuario(addNome,addCpf,addIdade,addEmail);
            }else{
                updateUsuario(editIndex,addNome,addCpf,addIdade,addEmail);
            }
            form.reset();
        }
    });
    attTable();
});
