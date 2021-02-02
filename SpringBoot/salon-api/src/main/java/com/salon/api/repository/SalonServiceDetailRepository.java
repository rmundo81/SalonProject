package com.salon.api.repository;

import com.salon.api.service.SalonServiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public interface SalonServiceDetailRepository extends JpaRepository <SalonServiceDetail, Long> {
}
