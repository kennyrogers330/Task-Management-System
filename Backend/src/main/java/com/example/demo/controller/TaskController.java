package com.example.demo.controller;

import com.example.demo.Utils.FileUtil;
import com.example.demo.dto.AddTaskModel;
import com.example.demo.entity.OurUsers;
import com.example.demo.repository.UsersRepo;
import com.example.demo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;
    @Autowired
    private UsersRepo usersRepo;

    private static String UPLOAD_DIR = "./files/";

    private byte[] decodeBase64(String base64String) {
        // Remove the data URI scheme part if present
        if (base64String.startsWith("data:application/pdf;base64,")) {
            base64String = base64String.substring("data:application/pdf;base64,".length());
        }
        return Base64.getDecoder().decode(base64String);
    }
    @PostMapping("/create")
    public ResponseEntity<Object> createTask(@RequestBody AddTaskModel taskModel) {
        try{
            for (String assignee: taskModel.getAssignees()) {
                OurUsers user = usersRepo.findByName(assignee).orElse(null);
                if(user == null) {
                    return ResponseEntity.status(400).body("User not found");
                }
            }
//            System.out.println(taskModel.getBase64Files()[0]);
            byte[] fileBytes = decodeBase64(taskModel.getBase64Files()[0]);

            String filePath = FileUtil.saveFile(fileBytes, UPLOAD_DIR);
//            System.out.println("files saved to: " + "filePath");

            // Save the task to the database
             taskService.SaveTask(taskModel, filePath);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Task created successfully");
            return ResponseEntity.ok(response);
//            return ResponseEntity.ok("Task created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error occurred while creating task");
        }

    }
}
