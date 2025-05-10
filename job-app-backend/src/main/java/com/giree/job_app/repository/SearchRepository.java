package com.giree.job_app.repository;

import com.giree.job_app.model.Post;

import java.util.List;

public interface SearchRepository {

    List<Post> findByText(String text);

}
