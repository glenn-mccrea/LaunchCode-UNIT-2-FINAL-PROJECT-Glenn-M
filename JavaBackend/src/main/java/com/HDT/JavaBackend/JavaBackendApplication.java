package com.HDT.JavaBackend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JavaBackendApplication {

    public static void main(String[] args) {

        // Load .env file and push DB_PASSWORD into Spring
        Dotenv dotenv = Dotenv.load();
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));

        SpringApplication.run(JavaBackendApplication.class, args);
    }
}