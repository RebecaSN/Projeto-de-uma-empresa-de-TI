package SoulCode.Servicos.Repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import SoulCode.Servicos.Models.Funcionario;
import SoulCode.Servicos.Models.Servico;

public interface ServicoRepository extends JpaRepository<Servico,Integer>{
	
	

}
