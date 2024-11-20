package com.bankingapp.bankingapp.service;

import com.bankingapp.bankingapp.model.Transaction;
import com.bankingapp.bankingapp.model.User;
import com.bankingapp.bankingapp.repository.TransactionRepository;
import com.bankingapp.bankingapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public void registerUser(User user) {
        userRepository.save(user);
    }

    public java.util.Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Double getBalanceByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found!"));
        return user.getBalance();
    }

    public void transferFunds(String senderAccountNumber, String receiverAccountNumber, Double amount) {
        User sender = userRepository.findByAccountNumber(senderAccountNumber)
                .orElseThrow(() -> new RuntimeException("Sender account not found!"));

        User receiver = userRepository.findByAccountNumber(receiverAccountNumber)
                .orElseThrow(() -> new RuntimeException("Receiver account not found!"));

        if (sender.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance!");
        }

        // Deduct from sender and add to receiver
        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);

        userRepository.save(sender);
        userRepository.save(receiver);

        // Create and save transaction with sender and receiver first names
        Transaction transaction = new Transaction(
                sender.getAccountNumber(),
                receiver.getAccountNumber(),
                sender.getEmail(),
                receiver.getEmail(),
                amount,
                new Date(),
                sender.getFirstname(),  // Sender's first name
                receiver.getFirstname()  // Receiver's first name
        );
        transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionHistory(String accountNumber) {
        return transactionRepository.findBySenderAccountNumberOrReceiverAccountNumber(accountNumber, accountNumber);
    }

    public List<Transaction> getTransactionHistoryForResponse(String accountNumber) {
        return getTransactionHistory(accountNumber).stream()
                .map(transaction -> new Transaction(
                        transaction.getSenderAccountNumber(),
                        null, // Receiver account is omitted
                        null, // Sender email is omitted
                        null, // Receiver email is omitted
                        transaction.getAmount(),
                        transaction.getTransactionDate(),
                        transaction.getSenderFirstname(),
                        transaction.getReceiverFirstname()
                ))
                .collect(Collectors.toList());
    }
}
