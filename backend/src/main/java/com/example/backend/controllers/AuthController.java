package com.example.backend.controllers;
import com.example.backend.dto.CompanyDto;
import com.example.backend.dto.EditorDto;
import com.example.backend.dto.SignUpDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entities.Person;
import com.example.backend.services.CompanyService;
import com.example.backend.services.EditorService;
import com.example.backend.services.PersonService;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/auth")
public class AuthController {

    @Autowired
    PersonService personService;

    @Autowired
    UserService userService;

    @Autowired
    EditorService editorService;

    @Autowired
    CompanyService companyService;


    @PostMapping(path="/signUp")
    public void signUp(@RequestBody SignUpDto signUpDto) {
        String type = signUpDto.getType();
        if(type.equals("User")) {
            UserDto userDto = new UserDto();
            userDto.setEmail(signUpDto.getEmail());
            userDto.setBirth_date(signUpDto.getBirth_date());
            userDto.setFull_name(signUpDto.getFull_name());
            userDto.setPassword(signUpDto.getPassword());
            userDto.setNickname(signUpDto.getNickname());
            userService.signUp(userDto);
        }
        else if(type.equals("Editor")) {
            EditorDto editorDto = new EditorDto();
            editorDto.setEmail(signUpDto.getEmail());
            editorDto.setBirth_date(signUpDto.getBirth_date());
            editorDto.setFull_name(signUpDto.getFull_name());
            editorDto.setPassword(signUpDto.getPassword());
            editorDto.setNickname(signUpDto.getNickname());
            editorDto.setCv_url(signUpDto.getCv_url());
            editorService.signUp(editorDto);
        }
        else if(type.equals("Company")) {
            CompanyDto companyDto = new CompanyDto();
            companyDto.setCompany_email(signUpDto.getEmail());
            companyDto.setCompany_phone(signUpDto.getCompany_phone());
            companyDto.setCompany_name(signUpDto.getFull_name());
            companyDto.setCompany_password(signUpDto.getPassword());
            companyDto.setCompany_address(signUpDto.getCompany_address());
            companyService.signUp(companyDto);
        }
        else {
            // exception
        }

    }

    @PutMapping("/login/{email}/{password}")
    public boolean login(@PathVariable String email, @PathVariable String password) {
        if(personService.getPersonByEmail(email) != null)
            return personService.login(email,password);
        else if(companyService.getCompanyByEmail(email) != null)
            return companyService.login(email, password);
        else
            return false;
    }
}
