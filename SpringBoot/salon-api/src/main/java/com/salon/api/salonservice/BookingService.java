package com.salon.api.salonservice;

import com.salon.api.config.SalonDetails;
import com.salon.api.payment.ConfirmationResponse;
import com.salon.api.payment.Payment;
import com.salon.api.payment.PaymentIntentDetails;
import com.salon.api.payment.PaymentRepository;
import com.salon.api.payment.PaymentRequest;
import com.salon.api.payment.StripePaymentService;
import com.salon.api.payment.Ticket;
import com.salon.api.payment.TicketRepository;
import com.salon.api.slot.Slot;
import com.salon.api.slot.SlotRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class BookingService {

    private final SalonDetails salonDetails;

    private final SalonServiceDetailRepository salonServiceDetailRepository;

    private final SlotRepository slotRepository;

    private final PaymentRepository paymentRepository;

    private final StripePaymentService stripePaymentService;

    private final TicketRepository ticketRepository;


    public Payment createPayment(PaymentRequest paymentRequest) {
        // check salonServiceDetailID
        SalonServiceDetail salonServiceDetail =salonServiceDetailRepository.
                findById(paymentRequest.getSalonServiceDetailID()).
                    orElseThrow(()-> new ResponseStatusException(HttpStatus.BAD_REQUEST,"Invalid SalonService ID !",null));
        log.info("// check salonServiceDetailID");

        // Find slot available with status available
        Slot slot = Optional.ofNullable(slotRepository.findSlotsByIdAndAvailableServicesAndStatus(paymentRequest.getSlotID(),salonServiceDetail, Slot.SlotStatus.AVAILABLE)).orElseThrow(()-> new ResponseStatusException(HttpStatus.BAD_REQUEST,"Slot invalid or unavailable",null));
        log.info("// Find slot available with status available");

        // Create Intent with Stripe
        PaymentIntentDetails paymentIntentDetails = stripePaymentService.createIntent(salonServiceDetail.getPrice());

        log.info("// Create Intent with Stripe : paymentIntentDetails = "+paymentIntentDetails.toString());
        log.info("// Create Intent with Stripe");
        Payment payment = Payment.builder()
                .selectedService(salonServiceDetail)
                .slot(slot)
                .amount(paymentIntentDetails.getAmount())
                .phoneNumber(paymentRequest.getPhoneNumber())
                .intendID(paymentIntentDetails.getIntentId())
                .lastName(paymentRequest.getLastName())
                .firstName(paymentRequest.getFirstName())
                .email(paymentRequest.getEmail())
                .secretID(paymentIntentDetails.getSecretId())
                .build();
        paymentRepository.save(payment);
        slot.setLockedAt(LocalDateTime.now());
        slot.setStatus(Slot.SlotStatus.LOCKED);
        log.info(payment.toString());
        return payment;
    }

    public ConfirmationResponse confirmPayment(Long id) {
        // Check if payment status is success
        Payment payment = paymentRepository.findById(id).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.BAD_REQUEST,"Invalid Payment !",null));
        log.info("payment status :"+payment.getStatus());
        log.info("payment Enum status :"+Payment.PaymentStatus.SUCCESS);
        if (payment.getStatus() == Payment.PaymentStatus.SUCCESS) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Payment already confirmed",null);
        }
        // Check if Stripe return error not successful
        log.info("payment status Stripe return :"+payment.getIntendID());
        log.info("payment Enum status :"+Payment.PaymentStatus.SUCCESS);
        if (!stripePaymentService.IsPaymentSuccessful(payment.getIntendID())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Payment not successful",null);
        }
        // Create a ticket
        Ticket ticket = Ticket.builder()
                .payment(payment)
                .ticketStatus(Ticket.Status.BOOKED)
                .build();

        // persist/update payment ticket
        payment.setStatus(Payment.PaymentStatus.SUCCESS);
        log.info(" Payment Status= "+ payment.getStatus().toString());
        payment.getSlot().setStatus(Slot.SlotStatus.CONFIRMED);
        payment.getSlot().setConfirmedAt(LocalDateTime.now());
        payment.getSlot().setSelectedServiceId(payment.getSelectedService());

        ticketRepository.save(ticket);
        log.info(" BookingService confirmPayment ConfirmationResponse ="+ConfirmationResponse.builder()
                .ticket(ticket)
                .salonDetails(salonDetails.clone())
                .build().toString());
        return ConfirmationResponse.builder()
                .ticket(ticket)
                .salonDetails(salonDetails.clone())
                .build();
    }


    public Ticket getTicket(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.BAD_REQUEST,"Ticket not valid",null));
    }
}
