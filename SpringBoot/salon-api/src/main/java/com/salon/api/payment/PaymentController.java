package com.salon.api.payment;

import com.salon.api.salonservice.BookingService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Api(value = "PaymentController")
@ApiOperation(value = "Get Payment Config ")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping(path = "/api", produces="application/json")
@AllArgsConstructor
@Slf4j
public class PaymentController {

    private final BookingService bookingService;

    @PostMapping(value = "/api/payments/initiate", produces="application/json")
    @ApiOperation("InitiatePaymentAPI")
    @Transactional
    public Payment createPayment(@RequestBody @Valid PaymentRequest paymentRequest) {
        log.info("Payment createPayment paymentRequest !!!");
        log.info(paymentRequest.toString());
        return bookingService.createPayment(paymentRequest);
    }

    @PutMapping(value = "/api/payments/confirm/{id}", produces="application/json")
    @ApiOperation("VerifyPaymentAndConfirmSlotAPI")
    @Transactional
    public ConfirmationResponse confirmationResponse(@PathVariable("id") Long id) {
        log.info("ConfirmationResponse confirmationResponse");
        log.info("id="+id);
        return bookingService.confirmPayment(id);
    }

    @GetMapping(value = "/api/tickets/{id}")
    @ApiOperation("VerifyTicketAPI")
    public Ticket getTicket(@PathVariable Long id) {
        return bookingService.getTicket(id);
    }
}
