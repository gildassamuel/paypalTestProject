package com.myapp.testpaypal.repository;

import com.myapp.testpaypal.domain.Customer;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Customer entity.
 */
public interface CustomerRepository extends MongoRepository<Customer,String> {

}
