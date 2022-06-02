package SoulCode.Servicos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServicosApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServicosApplication.class, args);
		
		//System.out.println(new BCryptPasswordEncoder().encode("1234"));
	}
}
