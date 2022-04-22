package com.example.backend.controllers;

import com.example.backend.entities.Person;
import com.example.backend.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/person")
public class PersonController {

    @Autowired
    PersonService personService;

    @PostMapping("/change/password/{person_id}/{password}")
    public void changePassword(@PathVariable String person_id, @PathVariable String password){
        personService.changePassword(person_id, password);
    }

    @PostMapping("/change/phone/{person_id}/{phone}")
    public void changePhone(@PathVariable String person_id, @PathVariable String phone){
        personService.changePhone(person_id, phone);
    }

    @PostMapping("/change/photo/{person_id}/{photo}")
    public void changePhoto(@PathVariable String person_id, @PathVariable String photo){
        personService.changePhoto(person_id, photo);
    }

}
