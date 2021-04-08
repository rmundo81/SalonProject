package com.salon.api.payment;


import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.net.RequestOptions;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class StripePaymentService {

    private final String stripeKey;

    public StripePaymentService(@Value("${STRIPE_SECRET_KEY}") String stripeKey) {
        this.stripeKey = stripeKey;
    }

    @SneakyThrows
    public PaymentIntentDetails createIntent(Long amount) {
        log.info("PaymentIntentDetails createIntent");
        log.info("amount ="+amount);
        PaymentIntentCreateParams createParams = PaymentIntentCreateParams.builder()
                .setAmount(amount * 100)
                .setCurrency("USD")
                .build();
        log.info("paymentIntent.createParams="+createParams.getCurrency());
        PaymentIntent paymentIntent = PaymentIntent.create(createParams, buildRequestOptions());
        log.info("paymentIntent="+paymentIntent.toString());
        return new PaymentIntentDetails(paymentIntent.getId(),paymentIntent.getClientSecret(),paymentIntent.getAmount());
    }

    @SneakyThrows
    public boolean IsPaymentSuccessful(String intentId) {
        log.info("IsPaymentSuccessful intentId = " + intentId);
        log.info("IsPaymentSuccessful PaymentIntent.retrieve = " + PaymentIntent.retrieve(intentId,buildRequestOptions()).getStatus());

        return "succeeded".equals(PaymentIntent.retrieve(intentId,buildRequestOptions()).getStatus());
    }

    private RequestOptions buildRequestOptions() {
        log.info("RequestOptions buildRequestOptions()");
        log.info("stripeKey =()"+stripeKey);
        return RequestOptions.builder()
                .setApiKey(stripeKey)
                .build();
    }
}
