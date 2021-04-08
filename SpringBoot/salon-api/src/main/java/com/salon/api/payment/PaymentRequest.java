package com.salon.api.payment;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@Data
@Builder
public class PaymentRequest {

    @NotNull(message = "Slot ID is required")
    private final Long slotID;
    @NotNull(message = "Salon Service Detail ID is required")
    private final Long salonServiceDetailID;
    @NotBlank
    @Size(min = 3, message = "First name should at least 3 characters")
    private final String firstName;
    @Size(min = 3, message = "Last name should at least 3 characters")
    private final String lastName;
    @Email
    private final String email;
    @NotBlank
    @Size(min = 3, message = "Phone number should at least 10 characters")
    private final String phoneNumber;
}
