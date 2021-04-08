package com.salon.api.payment;

import com.salon.api.salonservice.SalonServiceDetail;
import com.salon.api.slot.Slot;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
//@NoArgsConstructor(access= AccessLevel.PRIVATE, force=true)
@NoArgsConstructor
@Data
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private SalonServiceDetail selectedService;

    @OneToOne
    private Slot slot;

    private Long amount;

    private PaymentStatus status;

    @CreationTimestamp
    LocalDateTime createdTime;

    @UpdateTimestamp
    LocalDateTime updatedTime;

    private String intendID;

    private String secretID;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    public enum PaymentStatus{
        PROCESSING, SUCCESS, FAILED;
    }
}
