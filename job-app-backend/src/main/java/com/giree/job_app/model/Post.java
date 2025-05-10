package com.giree.job_app.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "JobPost")
@Data
public class Post {

    @Id
    private String id;
    private String jobTitle;
    private String desc;
    private String exp;
    private String[] requirements;
    private String jobPoster;
    private String companyName;

}
