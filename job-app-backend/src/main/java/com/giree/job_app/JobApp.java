package com.giree.job_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JobApp {

	public static void main(String[] args) {
		SpringApplication.run(JobApp.class, args);
		System.out.println("Application Started Successfully...");
	}

}
