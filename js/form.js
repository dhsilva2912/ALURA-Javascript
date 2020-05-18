
//Botao Adicionar nova Linha na Tabela
var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function (){
  event.preventDefault();

  var form = document.querySelector("#form-adiciona")
  //Extraindo informacoes do paciente do form
  var paciente = obtemPacienteDoFormulario(form);

  //Valida Dados antes de adicionar na tabela
  var erros = validaPaciente(paciente);
  if(erros.length > 0){
    exibeMensagensDeErro(erros);
    return;
  }

  adicionaPacienteNaTabela(paciente);
  form.reset();

  var mensagensErro = document.querySelector("#mensagens-erro");
  mensagensErro.innerHTML ="";

});

function adicionaPacienteNaTabela(paciente) {
  //Cria a tr e a td do paciente
  var pacienteTr = montaTr(paciente);

  //Adicionando o paciente na tabela
  var tabela = document.querySelector("#tabela-pacientes");
  tabela.appendChild(pacienteTr);

};


//Funcao Cria JSON Paciente
function obtemPacienteDoFormulario(form){
  var paciente = {
    nome:form.nome.value,
    peso:form.peso.value,
    altura:form.altura.value,
    gordura:form.gordura.value,
    imc:calculaImc(form.peso.value,form.altura.value)
  };

  return paciente;
};

//Funcao Cria Linha da Tabela a partir do Form
function montaTr(paciente){
  var pacienteTr = document.createElement("tr");
  pacienteTr.classList.add("paciente");

  pacienteTr.appendChild(montaTd(paciente.nome,"info-nome"));
  pacienteTr.appendChild(montaTd(paciente.peso,"info-peso"));
  pacienteTr.appendChild(montaTd(paciente.altura,"info-altura"));
  pacienteTr.appendChild(montaTd(paciente.gordura,"info-gordura"));
  pacienteTr.appendChild(montaTd(paciente.imc,"info-imc"));

  return pacienteTr;
}

function montaTd(dado,classe){
  var td = document.createElement("td");
  td.textContent = dado;
  td.classList.add(classe);

  return td;
}

function validaPaciente(paciente){
  var erros = [];

  if(paciente.nome.length == 0) erros.push("O Nome nao pode ser em branco!");

  if(!validaPeso(paciente.peso)) erros.push("O Peso e invalido!");
  if(paciente.peso.length == 0) erros.push("O Peso nao pode ser em braco!");

  if(!validaAltura(paciente.altura)) erros.push("A Altura e invalida!");
  if(paciente.altura.length == 0) erros.push("A Altura nao pode ser em branco!");

  if(paciente.gordura == 0) erros.push("A gordura nao pode ser em branco!");



  return erros;
}

function exibeMensagensDeErro(erros){
  var ul = document.querySelector("#mensagens-erro");
  ul.innerHTML = "";

  erros.forEach(function(erro){
    var li = document.createElement("li");
    li.textContent = erro;
    ul.appendChild(li);
  });

}
