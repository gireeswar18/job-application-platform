package com.giree.job_app.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "User")
@Data

public class User {

    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private List<String> jobsPosted;
    private List<String> jobsApplied;
    private boolean isLoggedIn;

}
