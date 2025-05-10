package com.giree.job_app.service;

import com.giree.job_app.model.Post;
import com.giree.job_app.model.User;
import com.giree.job_app.repository.PostRepository;
import com.giree.job_app.repository.SearchRepository;
import com.giree.job_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private SearchRepository searchRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    public List<Post> allPosts() {
        try {
            return postRepository.findAll();
        }
        catch (Exception e) {
            return null;
        }
    }

    public Post addPost(Post post, String userId) {
        try {
            Optional<User> user = userRepository.findById(userId);
            if (user.isEmpty())
                return null;

            User user1 = user.get();

            Post createdPost = postRepository.save(post);

            List<String> jobsId = user1.getJobsPosted();
            jobsId.add(createdPost.getId());;

            user1.setJobsPosted(jobsId);

            userRepository.save(user1);

            return createdPost;

        }
        catch (Exception e) {
            return null;
        }
    }

    public List<Post> search(String text) {
        try {
            return searchRepository.findByText(text);
        }
        catch (Exception e) {
            return null;
        }
    }

    public Post getPostById(String id) {
        try {
            Optional<Post> post = postRepository.findById(id);
            return post.orElse(null);
        } catch (Exception e) {
            return null;
        }
    }

    public String applyJob(String uId, String pId) {

        try {
            Optional<Post> postPresent = postRepository.findById(pId);
            if (postPresent.isEmpty())
                return "Post not found!";

            Optional<User> userPresent = userRepository.findById(uId);
            if (userPresent.isEmpty())
                return "User not found!";

            User user = userPresent.get();
            Post post = postPresent.get();

            List<String> jobsApplied = user.getJobsApplied();
            jobsApplied.add(pId);

            user.setJobsApplied(jobsApplied);
            userRepository.save(user);

            SimpleMailMessage message = new SimpleMailMessage();

            String posterEmail = post.getJobPoster();

            message.setFrom(user.getEmail());
            message.setTo(posterEmail);
            message.setReplyTo(user.getEmail());
            message.setSubject("Application for the post of " + post.getJobTitle());

            String text = "You have received a application from " + user.getUsername() + ".\n" + "Applicant email: " + user.getEmail() + ".";
            message.setText(text);

            javaMailSender.send(message);

            System.out.println("Message :" + text);
            System.out.println("From: " + user.getEmail());
            System.out.println("To: " + post.getJobPoster());

            return "Applied successfully!";
        }
        catch (Exception e) {
            System.out.println(e.toString());
            return "Error";
        }
    }

    public User deletePost(String pId, String uId) {

        try {
            User user = userRepository.findById(uId).get();

            postRepository.deleteById(pId);

            List<String> list = new ArrayList<>();

            for (String str : user.getJobsPosted()) {
                if (!str.equals(pId))
                    list.add(str);
            }

            user.setJobsPosted(list);
            userRepository.save(user);

            return user;
        }
        catch (Exception e) {
            return null;
        }

    }
}
