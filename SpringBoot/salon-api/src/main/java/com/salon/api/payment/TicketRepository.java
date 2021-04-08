package com.salon.api.payment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository <Ticket,Long> {
}
