package com.salon.api;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static springfox.documentation.builders.PathSelectors.ant;


@SpringBootApplication
@Configuration
//@EnableR2dbcRepositories
@EnableSwagger2
//@EnableSwagger2WebFlux
public class SalonApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalonApiApplication.class, args);
	}

	@Bean
	public Docket swagger() {
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.any())
				.paths(ant("/api/**/*"))
				.paths(PathSelectors.any())
				.build();
	}
}

//	@Autowired
//	private ConnectionFactory connectionFactory;



//	@Override
//	@Bean
//	public ConnectionFactory connectionFactory() {
//		ConnectionFactory connectionFactory = ConnectionFactories.get(ConnectionFactoryOptions.builder()
//				.option(DRIVER, "pool")
//				.option(PROTOCOL, "postgresql") // driver identifier, PROTOCOL is delegated as DRIVER by the pool.
//				.option(HOST, "localhost")
//				.option(PORT, 5432)
//				.option(USER, "postgres")
//				.option(PASSWORD, "V243951")
//				.option(DATABASE, "salon")
//				.build());
//		ConnectionPoolConfiguration configuration = ConnectionPoolConfiguration.builder(connectionFactory)
//				.maxIdleTime(Duration.ofMinutes(30))
//				.initialSize(2)
//				.maxSize(2)
//				.maxCreateConnectionTime(Duration.ofSeconds(1))
//				.build();
//		return new ConnectionPool(configuration);
//	}
//}

//@Configuration
//@EnableR2dbcRepositories
//class R2DBCConfig extends AbstractR2dbcConfiguration {
//	@Override
//	@Bean
//	public ConnectionFactory connectionFactory() {
//		ConnectionFactory connectionFactory = ConnectionFactories.get(ConnectionFactoryOptions.builder()
//				.option(DRIVER, "pool")
//				.option(PROTOCOL, "postgresql") // driver identifier, PROTOCOL is delegated as DRIVER by the pool.
//				.option(HOST, "localhost")
//				.option(PORT, 5432)
//				.option(USER, "postgres")
//				.option(PASSWORD, "V243951")
//				.option(DATABASE, "salon")
//				.build());
//		ConnectionPoolConfiguration configuration = ConnectionPoolConfiguration.builder(connectionFactory)
//				.maxIdleTime(Duration.ofMinutes(30))
//				.initialSize(2)
//				.maxSize(2)
//				.maxCreateConnectionTime(Duration.ofSeconds(1))
//				.build();
//		return new ConnectionPool(configuration);
//	}
//}
