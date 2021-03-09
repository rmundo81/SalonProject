package com.salon.api.salonservice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
//import reactor.core.publisher.Flux;
//import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface SalonServiceDetailRepository extends JpaRepository<SalonServiceDetail, Long> {

    Optional<SalonServiceDetail> findById(Long id);

    List<SalonServiceDetail> findAll();

//    Mono<SalonServiceDetail> findById(Long id);
//
//    Flux<SalonServiceDetail> findAll();

    /*@Override
    List<SalonServiceDetail> findAll();*/
}
