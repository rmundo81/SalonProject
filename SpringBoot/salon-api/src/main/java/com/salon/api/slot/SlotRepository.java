package com.salon.api.slot;

import com.salon.api.salonservice.SalonServiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface SlotRepository extends JpaRepository<Slot, Long> {

    //List<Slot> getSlotForServiceOnDate(Long slotServiceId, String formattedDate);

//    List<Slot> findAllSlotsAvailableByAvailableServicesEqualsAndSlotForGreaterThanEqual(Long salonServiceId, LocalDateTime formattedDate);

//    Flux<Slot> findAllBySlotForGreaterThanEqualAndSlotForLessThanEqualAndAvailableServicesContaining(LocalDateTime startTime, LocalDateTime endTime, SalonServiceDetail serviceDetail);
    List<Slot> findAllBySlotForGreaterThanEqualAndSlotForLessThanEqualAndAvailableServicesContaining(LocalDateTime startTime, LocalDateTime endTime, SalonServiceDetail serviceDetail);

    //SELECT Name FROM Customers WHERE EXISTS
      //      (SELECT Item FROM Orders
        //            WHERE Customers.ID = Orders.ID AND Price < 50)


//    @Query("select id from Slot where id in (select availableServices from Slot s2 where s2.selectedService.id =:salonServiceDetailId)")
    //@Query("select s from Slot s where s.id in(select slot_id from slot_available_services ss where available_services_id =:salonServiceDetailId)")
//    @Query("select * from slot where id in (select slot_id from slot_available_services where available_services_id =:salonServiceDetailId)")
//    Flux<Slot> findAvailableSlotsForService(Long salonServiceDetailId);
//@Query("select u from User u where u.firstname like %?1")
    //@Query(value ="select * from slot where id in (select slot_id from slot_available_services where available_services_id =:salonServiceDetailId)")
//    @Query(value ="select s from Slot s where s.id in (select s2.id  from Slot s2  where s2.selectedServiceId =:salonServiceDetailId)")
//    List<Slot> findAvailableSlotsForService(Long salonServiceDetailId);
//
//    Flux<Slot> findAvailableSlotsForService(Long salonServiceDetailId);

//    Mono<Slot> findById(Long id);
    Optional<Slot> findById(Long id);

    Slot findSlotsByIdAndAvailableServicesAndStatus(Long id, SalonServiceDetail salonServiceDetail, Slot.SlotStatus status);
//    Mono<Slot> findByIdAndStatus(Long id, int slotStatus);
    //    Optional<Slot> findByIdAndStatus(Long id, int slotStatus);





}
