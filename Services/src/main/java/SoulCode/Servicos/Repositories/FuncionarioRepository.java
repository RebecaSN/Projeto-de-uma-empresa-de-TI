package SoulCode.Servicos.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import SoulCode.Servicos.Models.Funcionario;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario,Integer>{
	
	

}
