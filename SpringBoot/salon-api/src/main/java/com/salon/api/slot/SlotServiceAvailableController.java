package com.salon.api.slot;


import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
//import reactor.core.publisher.Flux;

import java.util.Date;
import java.util.List;
import java.util.stream.Stream;


@Api(value = "SlotServiceAvailableController")
@ApiOperation(value = "Get list of Available Salon Service in the System ", response = Iterable.class, tags = "list")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/services", produces="application/json")
@AllArgsConstructor
public class SlotServiceAvailableController {


    private SlotService slotService;

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


}
