package com.salon.api.slot;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.salon.api.salonservice.SalonServiceDetail;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@ToString
@Entity
public class Slot {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //private int status;

    @ManyToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    //@Transient
    Set<SalonServiceDetail> availableServices;

    @ManyToOne
    // @Column(value = "selected_service_id")
    private SalonServiceDetail selectedServiceId;

    String stylistName;
    LocalDateTime slotFor;
    LocalDateTime lockedAt;
    LocalDateTime confirmedAt;
    SlotStatus status;


    //public SlotStatus getStatus() {
        //return SlotStatus.values()[status];
    //}

    //public void setStatus(SlotStatus status) {
      //      this.status = status.ordinal();
        //}

public enum  SlotStatus {
    AVAILABLE,LOCKED,CONFIRMED,CANCELLED
}
}
