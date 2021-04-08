package com.salon.api.payment;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class PaymentService {

    PaymentRepository paymentRepository;

    @Transactional
    public void save (Payment payment) {

        paymentRepository.save(payment);
    }

}
