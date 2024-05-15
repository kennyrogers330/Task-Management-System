package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Projects")
@Data
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    private String name;

    @OneToMany(fetch=FetchType.LAZY, cascade= CascadeType.ALL)
    @JoinColumn(name = "project_id")
    private List<Task> taskList;

    public void add(Task tempTask) {
        if(taskList == null) {
            taskList = new ArrayList<>();
        }
        taskList.add(tempTask);
    }
}
