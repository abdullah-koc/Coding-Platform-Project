package com.example.backend.services;

import com.example.backend.dto.EditorDto;
import com.example.backend.entities.Editor;
import com.example.backend.repositories.EditorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.List;

@Service
public class EditorService {

    @Autowired
    private EditorRepository editorRepository;

    @Autowired
    private JavaMailSender mailSender;

    private void sendVerificationEmail(Editor editor, String siteURL)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = editor.getEmail();
        String fromAddress = "bingithelpdesk@gmail.com";
        String senderName = "Syncoder";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Syncoder.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", editor.getFull_name());
        String verifyURL = siteURL + "/api/editor/verify?code=" + editor.getEditor_id();
        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    public void signUp(EditorDto editorDto, String siteURL) throws MessagingException, UnsupportedEncodingException {

        Editor editor = new Editor();
        editor.setFull_name(editorDto.getFull_name());
        editor.setEmail(editorDto.getEmail());
        editor.setBirth_date(editorDto.getBirth_date());
        editor.setNickname(editorDto.getNickname());
        editor.setPassword(editorDto.getPassword());
        editor.setCv(editorDto.getCv());
        editorRepository.signUp(editor);
        sendVerificationEmail(editor, siteURL);
    }

    public boolean verifyEditor(String verificationCode) {
        Editor editor = editorRepository.findById(verificationCode);

        if (editor == null || editor.getIs_confirmed()) {
            return false;
        } else {
            editor.setIs_confirmed(true);
            editorRepository.updateConfirmation(verificationCode);
            return true;
        }

    }

    public Editor getEditorByEmail(String email) {
        return editorRepository.findByEmail(email);
    }

    public boolean loginEditor(String email, String password) {
       Editor editor = editorRepository.findByEmail(email);
        if(editor.getPassword().equals(password) && editor.isIs_approved() && editor.getIs_confirmed()) {
            return true;
        }
        return false;
    }

    public void setSalary(String email, int salary){
        Editor editor = editorRepository.findByEmail(email);
        editor.setSalary(salary);
        editorRepository.updateSalary(editor.getEditor_id(), salary);
    }

    public void setExperienceLevel(String email, String experience_level) {
        Editor editor = editorRepository.findByEmail(email);
        editor.setExperience_level(experience_level);
        editorRepository.updateExperienceLevel(editor.getEditor_id(), experience_level);
    }

    public List<Editor> getAllEditors() {
        return editorRepository.getAllEditors();
    }

    public void changePhoto(String nickname, String photo){
        Editor editor = editorRepository.findByNickname(nickname);
        editor.setPhoto(photo);
        editorRepository.updatePhoto(editor.getPerson_id(), photo);
    }
}
