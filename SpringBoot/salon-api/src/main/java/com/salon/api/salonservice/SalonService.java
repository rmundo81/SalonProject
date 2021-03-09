package com.salon.api.salonservice;

import com.salon.api.slot.Slot;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SalonService {



    SalonServiceDetailRepository salonServiceDetailRepository;


//    public SalonService(SalonServiceDetailRepository salonServiceDetailRepository) {
//        this.salonServiceDetailRepository = salonServiceDetailRepository;
//    }

    public void save(SalonServiceDetail serviceDetail) {
        salonServiceDetailRepository.save(serviceDetail);
    }

    public Optional<SalonServiceDetail> findById(Long id) {return salonServiceDetailRepository.findById(id);}

    public List<SalonServiceDetail> findAll() {
        return salonServiceDetailRepository.findAll();
    }

}

