package com.salon.api.salonservice;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@Data
@ConfigurationProperties(prefix = "salon")
@ConstructorBinding
public class Salon {
    private final String name;
    private final String address;
    private final String city;
    private final String state;
    private final String zipcode;
    private final String phone;
}
