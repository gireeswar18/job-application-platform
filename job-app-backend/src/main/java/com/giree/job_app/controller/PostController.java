package com.giree.job_app.controller;

import com.giree.job_app.model.Post;
import com.giree.job_app.model.User;
import com.giree.job_app.repository.UserRepository;
import com.giree.job_app.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")

public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all-posts")
    public ResponseEntity<?> getAllPosts() {

        List<Post> postList = postService.allPosts();
        if (postList == null)
            return new ResponseEntity<>("Oops! Something went wrong!",
                    HttpStatus.INTERNAL_SERVER_ERROR);

        if (postList.isEmpty())
            return new ResponseEntity<>("Currently no jobs available!", HttpStatus.OK);

        return new ResponseEntity<>(postList, HttpStatus.OK);
    }

    @PostMapping("/post/user/{userId}")
    public ResponseEntity<?> postAJob(@RequestBody Post post, @PathVariable String userId) {
        Post resp = postService.addPost(post, userId);

        if (resp == null)
            return new ResponseEntity<>("Oops! Something went wrong!",
                    HttpStatus.INTERNAL_SERVER_ERROR);

        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @GetMapping("/post/search/{text}")
    public ResponseEntity<?> search(@PathVariable("text") String text) {

        List<Post> postList = postService.search(text);

        if (postList == null)
            return new ResponseEntity<>("Oops! Something went wrong!",
                    HttpStatus.INTERNAL_SERVER_ERROR);

//        if (postList.isEmpty())
//            return new ResponseEntity<>("Currently no jobs available!", HttpStatus.OK);

        return new ResponseEntity<>(postList, HttpStatus.OK);
    }

    @GetMapping("/post/{pId}")
    public ResponseEntity<?> getPost(@PathVariable String pId) {

        Post post = postService.getPostById(pId);

        if (post == null)
            return new ResponseEntity<>("Oops! Something went wrong!",
                    HttpStatus.INTERNAL_SERVER_ERROR);

        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @PutMapping("/{uId}/post/{pId}/apply")
    public ResponseEntity<?> applyPost(@PathVariable("uId") String uId,
                                       @PathVariable("pId") String pId) {
        String resp = postService.applyJob(uId, pId);

        if (resp.equals("Error"))
            return new ResponseEntity<>("Oops! Something went wrong!",
                    HttpStatus.INTERNAL_SERVER_ERROR);

        if (resp.equals("Failed"))
            return new ResponseEntity<>("Job apply failed! Try again later!",
                    HttpStatus.INTERNAL_SERVER_ERROR);

        User user = userRepository.findById(uId).get();

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/post/delete/{pId}/{uId}")
    public ResponseEntity<?> deletePost(@PathVariable("uId") String uId,
                                        @PathVariable("pId") String pId) {

        User user = postService.deletePost(pId, uId);

        if (user == null)
            return new ResponseEntity<>("Oops! Something went wrong!",
                    HttpStatus.INTERNAL_SERVER_ERROR);

        return new ResponseEntity<>(user, HttpStatus.OK);

    }

}
