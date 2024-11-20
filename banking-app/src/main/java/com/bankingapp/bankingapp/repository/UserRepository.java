package com.bankingapp.bankingapp.repository;

import com.bankingapp.bankingapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // Existing method

    Optional<User> findByAccountNumber(String accountNumber); // New method
}
