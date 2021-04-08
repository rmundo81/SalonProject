package com.salon.api.payment;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PaymentIntentDetails {

    String intentId;
    String secretId;
    Long amount;
}
