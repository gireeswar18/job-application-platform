package com.giree.job_app.repository;

import com.giree.job_app.model.Post;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class SearchRepositoryImp implements SearchRepository {

    @Autowired
    private MongoClient mongoClient;

    @Autowired
    private MongoConverter mongoConverter;

    @Override
    public List<Post> findByText(String text) {

        final List<Post> posts = new ArrayList<>();

        MongoDatabase database = mongoClient.getDatabase("job-search-app");
        MongoCollection<Document> collection = database.getCollection("JobPost");
        AggregateIterable<Document> result = collection.aggregate(
                Arrays.asList(
                        new Document("$search",
                        new Document("text",
                        new Document("query", text).
                        append("path",
                        Arrays.asList("requirements", "jobTitle", "desc"))))));

        result.forEach(document -> posts.add(mongoConverter.read(Post.class, document)));

        return posts;
    }
}
