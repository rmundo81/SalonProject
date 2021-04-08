package com.salon.api.slot;


import com.salon.api.salonservice.BookingService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//import reactor.core.publisher.Flux;


@Api(value = "SlotServiceAvailableController")
@ApiOperation(value = "Get list of Available Salon Service in the System ", response = Iterable.class, tags = "list")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/services", produces="application/json")
@AllArgsConstructor
@Slf4j
public class SlotServiceAvailableController {


    private SlotService slotService;

    private final BookingService bookingService;

//    public SlotServiceAvailableController(SlotService slotService) {
//        this.slotService = slotService;
//    }

    @GetMapping("/retrieveAvailableSlots/{salonServiceId}/{formattedDate}")
    public @ResponseBody
    List<Slot> retrieveAvailableSlotsApi(@PathVariable("salonServiceId") Long salonServiceId,
                                             @ApiParam(value = "Date in yyyy-MM-dd format", required = true,example = "2021-02-18")
                                         @PathVariable("formattedDate")
                                         @DateTimeFormat(pattern="yyyy-MM-dd") String formattedDate) {
        System.out.println(SlotServiceAvailableController.class.getName()+" salonServiceId :=" + salonServiceId + "/ formattedDate :=" + formattedDate);
        return slotService.getSlotsForServiceOnDate(salonServiceId,formattedDate);
    }

//    @PostMapping(value = "/api/payments/initiate", produces="application/json")
//    @ApiOperation("InitiatePaymentAPI")
//    @Transactional
//    public Payment createPayment(@RequestBody @Valid PaymentRequest paymentRequest) {
//        log.info("Payment createPayment paymentRequest !!!");
//        log.info(paymentRequest.toString());
//        return bookingService.createPayment(paymentRequest);
//    }
//
//    @PutMapping(value = "/api/payments/confirm/{id}", produces="application/json")
//    @ApiOperation("VerifyPaymentAndConfirmSlotAPI")
//    @Transactional
//    public ConfirmationResponse confirmationResponse(@PathVariable("id") Long id) {
//        return bookingService.confirmPayment(id);
//    }
//
//    @GetMapping(value = "/api/tickets/{id}")
//    @ApiOperation("VerifyTicketAPI")
//    public Ticket getTicket(@PathVariable Long id) {
//        return bookingService.getTicket(id);
//    }



}
