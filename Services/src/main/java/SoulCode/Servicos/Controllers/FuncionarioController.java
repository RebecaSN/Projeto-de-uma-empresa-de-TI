package SoulCode.Servicos.Controllers;


import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import SoulCode.Servicos.Models.Funcionario;
import SoulCode.Servicos.Services.FuncionarioService;


@CrossOrigin 
@RestController 
@RequestMapping("servicos")
public class FuncionarioController {
	
	@Autowired
	FuncionarioService funcionarioService;
	
	@GetMapping("/funcionario")
	public List<Funcionario> mostrarTodosFuncionarios(){
		List<Funcionario> funcionarios = funcionarioService.mostrarTodosFuncionarios();
		return funcionarios;
	}
	
	@GetMapping("/funcionario/{idFuncionario}")
	public ResponseEntity<Funcionario> mostrarUmFuncionario(@PathVariable Integer idFuncionario){
		Funcionario funcionario = funcionarioService.mostrarUmFuncionario(idFuncionario);
		return ResponseEntity.ok().body(funcionario);
	}
	
	@PostMapping("/funcionario")
	public ResponseEntity<Funcionario> inserirFuncionario(@RequestBody Funcionario funcionario){
		// nessa linha 44, o novo funcionário já é salvo no banco de dados e já é criado o seu id
		funcionario = funcionarioService.inserirFuncionario(funcionario);
		URI novaUri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(funcionario.getIdFuncionario()).toUri();
		return ResponseEntity.created(novaUri).build();
	}
	
	@PutMapping("/funcionario/{idFuncionario}")
	public ResponseEntity<Funcionario> editarFuncionario(@PathVariable Integer idFuncionario,
										@RequestBody Funcionario funcionario){
		funcionario.setIdFuncionario(idFuncionario);
		funcionario = funcionarioService.editarFuncionario(funcionario);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("funcionario/{idFuncionario}")
	public ResponseEntity<Void> excluirFuncionario(@PathVariable Integer idFuncionario){
		funcionarioService.excluirFuncionario(idFuncionario);
		return ResponseEntity.noContent().build();
	}
	
}
