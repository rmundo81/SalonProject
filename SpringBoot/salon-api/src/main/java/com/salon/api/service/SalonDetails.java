package com.salon.api.service;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Data
@NoArgsConstructor
@Entity
@Configuration
//@ConfigurationProperties(prefix = "salon")
public class SalonDetails {

    @Id
    @SequenceGenerator(
            name = "salon_sequence",
            sequenceName = "salon_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "salon_sequence"
    )
    private Long id;

    @Value("${salon.name}")
    private String name;
    @Value("${salon.address}")
    private String address;
    @Value("${salon.city}")
    private String city;
    @Value("${salon.state}")
    private String state;
    @Value("${salon.zipcode}")
    private String zipcode;
    @Value("${salon.phone}")
    private String phone;


    public SalonDetails(String name, String address, String city, String state, String zipcode, String phone) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.phone = phone;
    }
}
