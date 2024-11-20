package com.bankingapp.bankingapp.controller;

import com.bankingapp.bankingapp.model.Transaction;
import com.bankingapp.bankingapp.model.User;
import com.bankingapp.bankingapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // User Signup
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }

        // Assign random 10-digit account number and initial balance
        user.setRole("USER"); // Default role for users
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    // User Login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        return userService.findByEmail(user.getEmail())
                .filter(existingUser -> existingUser.getPassword().equals(user.getPassword()))
                .map(existingUser -> ResponseEntity.ok("Login successful!"))
                .orElse(ResponseEntity.badRequest().body("Invalid email or password!"));
    }

    // Fetch user details
    @GetMapping("/user-details")
    public ResponseEntity<User> getUserDetails(@RequestParam String email) {
        return userService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().body(null)); // Return error if user not found
    }

    // Transfer funds using account numbers
    @PostMapping("/transfer")
    public ResponseEntity<String> transferFunds(
            @RequestParam String senderAccountNumber,
            @RequestParam String receiverAccountNumber,
            @RequestParam Double amount
    ) {
        try {
            userService.transferFunds(senderAccountNumber, receiverAccountNumber, amount);
            return ResponseEntity.ok("Funds transferred successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get transaction history
    @GetMapping("/transaction-history")
    public ResponseEntity<List<Transaction>> getTransactionHistory(@RequestParam String identifier) {
        try {
            return ResponseEntity.ok(userService.getTransactionHistory(identifier));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Get user balance
    @GetMapping("/get-balance")
    public ResponseEntity<Double> getBalance(@RequestParam String email) {
        try {
            Double balance = userService.getBalanceByEmail(email);
            if (balance != null) {
                return ResponseEntity.ok(balance);
            } else {
                return ResponseEntity.badRequest().body(null); // If balance is not found
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null); // Handle errors if any
        }
    }
}
