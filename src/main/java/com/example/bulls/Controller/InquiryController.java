package com.example.bulls.Controller;

import com.example.bulls.DTO.InquiryDTO;
import com.example.bulls.Entity.Inquiry;
import com.example.bulls.Service.InquiryService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@Slf4j
public class InquiryController {
    private final InquiryService inquiryService;

    @Autowired
    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @PostMapping("/inquiry/new")
    public ResponseEntity<Inquiry> newInquiry (@Valid @RequestBody InquiryDTO inquiryDTO) {
        Inquiry inquiry = inquiryService.newInquiry(inquiryDTO);
        return ResponseEntity.ok(inquiry);
    }
}
