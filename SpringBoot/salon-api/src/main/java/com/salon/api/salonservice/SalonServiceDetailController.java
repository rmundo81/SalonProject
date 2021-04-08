package com.salon.api.salonservice;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//import reactor.core.publisher.Flux;
@Api(value = "SalonServiceDetailController")
@ApiOperation(value = "Get list of Salon Service Details in the System ", response = Iterable.class, tags = "list")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/services/retrieveAvailableSalonServices",
        produces="application/json")
@AllArgsConstructor
public class SalonServiceDetailController {
    //private SalonServiceDetailRepository salonServiceDetailRepository;
    SalonService salonService;

       // public @ResponseBody
        @GetMapping
        List<SalonServiceDetail> list() {
            return salonService.findAll();
        }


}
