package com.salon.api.salonservice;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
@Data
@RequiredArgsConstructor
//@NoArgsConstructor
@ToString
public class SalonServiceDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     Long id;
     String name;
     String description;
     Long price;
     Integer timeInMinutes;

//    public SalonServiceDetail(String name, String description, Long price, Integer timeInMinutes) {
//        this.name = name;
//        this.description = description;
//        this.price = price;
//        this.timeInMinutes = timeInMinutes;
//    }
}
