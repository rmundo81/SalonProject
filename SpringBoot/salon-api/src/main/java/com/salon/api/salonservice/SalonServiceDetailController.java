package com.salon.api.salonservice;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@Api(value = "SalonServiceDetailController")
@ApiOperation(value = "Get list of Salon Service Details in the System ", response = Iterable.class, tags = "list")
@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping(path = "/api/services/retrieveAvailableSalonServices",
        produces="application/json")
@AllArgsConstructor
public class SalonServiceDetailController {


    private SalonServiceDetailRepository salonServiceDetailRepository;

    @GetMapping
    public @ResponseBody List<SalonServiceDetail> list() {
        return salonServiceDetailRepository.findAll();
    }


}
