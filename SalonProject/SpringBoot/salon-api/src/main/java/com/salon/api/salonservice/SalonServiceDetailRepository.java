package com.salon.api.salonservice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional(readOnly = true)
public interface SalonServiceDetailRepository extends JpaRepository <SalonServiceDetail, Long> {

    List<SalonServiceDetail> findAll();

    /*@Override
    List<SalonServiceDetail> findAll();*/
}
