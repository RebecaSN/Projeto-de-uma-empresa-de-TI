package SoulCode.Servicos.Controllers;

import java.net.URI;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import SoulCode.Servicos.Models.Funcionario;
import SoulCode.Servicos.Models.Servico;
import SoulCode.Servicos.Services.ServicoService;

@CrossOrigin 
@RestController 
@RequestMapping("servicos")
public class ServicoController {
	
	@Autowired
	ServicoService servicoService;
	
	// o método get serve para fazer buscar no banco de dados
	@GetMapping("/servico")
	public List<Servico> mostrarTodosServicos(){
		List<Servico> servicos = servicoService.mostrarTodosServicos();
		return servicos;
	}
	
	@GetMapping("/servico/{idServico}")
	public ResponseEntity<Servico> buscarUmServico(@PathVariable Integer idServico){
		Servico servico  = servicoService.buscarUmServico(idServico);
		return ResponseEntity.ok().body(servico);
		
	}
	
	
}
