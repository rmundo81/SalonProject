package com.salon.api.payment;

import com.salon.api.config.SalonDetails;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConfirmationResponse {

    SalonDetails salonDetails;

    Ticket ticket;

}
