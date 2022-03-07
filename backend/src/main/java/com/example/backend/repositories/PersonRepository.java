package com.example.backend.repositories;

import com.example.backend.entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
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

class PersonRowMapper implements RowMapper<Person> {

    @Override
    public Person mapRow(ResultSet rs, int rowNum) throws SQLException {

        Person person = new Person();
        person.setFull_name(rs.getString("full_name"));
        person.setEmail(rs.getString("email"));
        person.setPassword(rs.getString("password"));
        person.setBirth_date(rs.getString("birth_date"));
        person.setNickname(rs.getString("nickname"));
        person.setID(rs.getLong("id"));
        person.setPhone("phone");
        person.setPhoto("photo");
        person.setReg_date("reg_date");
        return person;
    }
}
