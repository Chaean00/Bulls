package com.example.bulls.Service;

import com.example.bulls.DTO.InquiryDTO;
import com.example.bulls.Entity.Inquiry;
import com.example.bulls.Repository.InquiryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class InquiryService {
    private final InquiryRepository inquiryRepository;

    @Autowired
    public InquiryService(InquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    // 문의 등록
    public Inquiry newInquiry(InquiryDTO inquiryDTO) {

        Inquiry inquiry = new Inquiry();
        inquiry.setTitle(inquiryDTO.getTitle());
        inquiry.setName(inquiryDTO.getName());
        inquiry.setPhone(inquiryDTO.getPhone());
        inquiry.setEmail(inquiryDTO.getEmail());
        inquiry.setBody(inquiryDTO.getBody());
        inquiry.setStatus("대기중");

        inquiryRepository.save(inquiry);

        return inquiry;
    }
}
