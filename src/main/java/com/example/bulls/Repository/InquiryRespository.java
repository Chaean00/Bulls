package com.example.bulls.Repository;

import com.example.bulls.Entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InquiryRespository extends JpaRepository<Inquiry, Long> {
}
