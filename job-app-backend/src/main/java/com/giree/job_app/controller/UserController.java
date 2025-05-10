package com.giree.job_app.controller;


import com.giree.job_app.dto.UserSignInDto;
import com.giree.job_app.model.User;
import com.giree.job_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user-info/{email}")
    public ResponseEntity<?> userInfo(@PathVariable String email) {
        User user = userService.findUser(email);

        if (user == null) {
            return new ResponseEntity<>("Oops! Something went wrong!",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody UserSignInDto userSignInDto) {
        User user = userService.signIn(userSignInDto);

        if (user == null)
            return new ResponseEntity<>("Oops! Something went wrong!",
                    HttpStatus.INTERNAL_SERVER_ERROR);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        User createdUser = userService.signUp(user);

        if (createdUser == null)
            return new ResponseEntity<>("Oops! Something went wrong!",
                    HttpStatus.INTERNAL_SERVER_ERROR);

        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    @PutMapping("/sign-out/{email}")
    public ResponseEntity<?> signOut(@PathVariable String email) {
        User user = userService.signOut(email);

        if (user == null)
            return new ResponseEntity<>("Oops! Something went wrong!",
                    HttpStatus.INTERNAL_SERVER_ERROR);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
