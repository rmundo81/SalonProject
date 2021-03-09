package com.salon.api.slot;

import com.salon.api.salonservice.SalonService;
import com.salon.api.salonservice.SalonServiceDetail;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@AllArgsConstructor
@Service
public class SlotService {


    private SalonService salonService;

    private SlotRepository slotRepository;

    @Transactional
    public void save(Slot slot) {slotRepository.save(slot);}

    public Optional<Slot> findById(Long id) {return  slotRepository.findById(id);}

    public List<Slot> getSlotsForServiceOnDate(Long slotServiceId, String formattedDate) {

        System.out.println("slotServiceId = " + slotServiceId + " /// "  + "formattedDate = " + formattedDate);
        SalonServiceDetail salonServiceDetail = salonService.findById(slotServiceId).orElseThrow(()-> new RuntimeException("Invalid Service"));

        LocalDate localDate = getAsDate(formattedDate);

        LocalDateTime startDate = localDate.atTime(0,1);
        LocalDateTime endDate = localDate.atTime(23,59);

        List<Slot> results = slotRepository.findAllBySlotForGreaterThanEqualAndSlotForLessThanEqualAndAvailableServicesContaining(startDate,endDate,salonServiceDetail);
//       return slotRepository.findAvailableSlotsForService(slotServiceId)
//                .filter(slot -> slot.slotFor.isAfter(startDate) && slot.slotFor.isBefore(endDate));
        return results;
    }

    private LocalDate getAsDate(String formattedDate) {

        System.out.println(SlotService.class.getName()+ " formattedDate:= " + formattedDate);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(formattedDate, formatter);
    }

    public Slot bookSlotWithService(BookSlotRequest bookSlotRequest) {return  null;}




}
