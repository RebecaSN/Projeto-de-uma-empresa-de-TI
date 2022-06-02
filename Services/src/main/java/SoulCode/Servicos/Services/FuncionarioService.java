package SoulCode.Servicos.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import SoulCode.Servicos.Models.Funcionario;
import SoulCode.Servicos.Repositories.FuncionarioRepository;

@Service
public class FuncionarioService {
	
	//aqui fazemos a injeção de depência
	@Autowired
	FuncionarioRepository funcionarioRepository;
	
	// findAll (método da Spring Data) - busca todos os registros
	public List<Funcionario> mostrarTodosFuncionarios(){
		return funcionarioRepository.findAll();
	}
	
	// findById - busca um funcionário específico pelo seu id
	public Funcionario mostrarUmFuncionario(Integer idFuncionario) {
		Optional<Funcionario> funcionario = funcionarioRepository.findById(idFuncionario);
		return funcionario.orElseThrow();
	}
	
	//save - insere um novo registro na tabela do nosso db
	public Funcionario inserirFuncionario(Funcionario funcionario) {
		//por precaução vamos limpar o campo de id do funcionário
		funcionario.setIdFuncionario(null);
		return funcionarioRepository.save(funcionario);
		
		//o método save pega os dados do novo funcinário, salva no db e já gera um id para esse
		//novo funcionário
	}
	
	// editar um funcionário já cadastrado
	public Funcionario editarFuncionario (Funcionario funcionario) {
		mostrarUmFuncionario(funcionario.getIdFuncionario());
		return funcionarioRepository.save(funcionario);
	}
	
	// deleteById  - excluir um funcionário pelo seu id
	public void excluirFuncionario (Integer idFuncionario) {
		mostrarUmFuncionario(idFuncionario);
		funcionarioRepository.deleteById(idFuncionario);
	}
	
	
	
	
	
}
