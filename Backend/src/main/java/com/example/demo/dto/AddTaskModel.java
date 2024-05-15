package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class AddTaskModel {
    private String name;
    private Date start_date;
    private Date end_date;
    private String priority;
    private String description;
    private String selectedProject;
    private String[] base64Files;
    private String[] assignees;
}
