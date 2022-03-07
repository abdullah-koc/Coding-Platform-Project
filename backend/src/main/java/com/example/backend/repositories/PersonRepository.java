package com.example.backend.repositories;

import com.example.backend.entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends JpaRepository<Person,Integer> {
    //@Query("SELECT p FROM persons p WHERE p.ID = ?1")
    Person findByID(long ID);
    //@Query("SELECT p FROM People p WHERE p.email = ?1")
    Person findByEmail(String email);
    //@Query("SELECT * FROM People")
    //List<Person> findAllPersons();
    //@Query("INSERT INTO People (full_name, email, nickname, password, birth_date )
    // VALUES (person.getFull_name(), person.getEmail(), person.getNickname(), person.getPassword(), person.getBirth_date()))
    //Person signUp( @Param("person") Person person);
}
