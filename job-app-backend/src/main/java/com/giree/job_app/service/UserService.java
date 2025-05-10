package com.giree.job_app.service;

import com.giree.job_app.dto.UserSignInDto;
import com.giree.job_app.model.User;
import com.giree.job_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findUser(String email) {

        try {
            return userRepository.findByEmail(email);
        }
        catch (Exception e) {
            return null;
        }
    }

    public User signUp(User user) {
        try {
            User exists = userRepository.findByEmail(user.getEmail());
            if (exists != null) {
                return null;
            }
            user.setLoggedIn(true);
            user.setJobsPosted(new ArrayList<>());
            user.setJobsApplied(new ArrayList<>());

            return userRepository.save(user);
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public User signIn(UserSignInDto userSignInDto) {
        try {
            User user = userRepository.findByEmail(userSignInDto.getEmail());
            if (user == null)
                return null;

            if (userSignInDto.getPassword().equals(user.getPassword())) {
                user.setLoggedIn(true);
                userRepository.save(user);
            }
            else
                return null;

            return user;
        }
        catch (Exception e) {
            return null;
        }
    }

    public User signOut(String email) {
        try {
            User user = userRepository.findByEmail(email);

            user.setLoggedIn(false);
            return userRepository.save(user);
        }
        catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }
}
