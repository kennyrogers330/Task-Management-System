package com.example.demo.controller;

import com.example.demo.entity.Project;
import com.example.demo.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/create")
    public ResponseEntity<Object> createProject(@RequestBody Project project) {
        try {
            Project savedProject = projectRepository.save(project);
            return ResponseEntity.status(201).body(savedProject);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while creating project" + e.getMessage());
        }

    }

    @GetMapping("/")
    public ResponseEntity<Object> getAllProjects() {
        try {
            // Retrieve all projects from the repository
            List<Project> projects = projectRepository.findAll();

            // Check if projects exist
            if (!projects.isEmpty()) {
                return ResponseEntity.ok(projects);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No projects found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching projects");
        }
    }
}
