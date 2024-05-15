package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="Task")
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "start_date")
    private Date start_date;

    @Column(name = "end_date")
    private Date end_date;

    private String priority;

    private String description;

    @OneToMany(fetch=FetchType.LAZY, mappedBy="task",
            cascade= {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST,
                    CascadeType.REFRESH})
    private List<File> files;

    @ManyToMany(fetch=FetchType.LAZY,
            cascade= {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST,
                    CascadeType.REFRESH})
    @JoinTable(name="task_users",
            joinColumns=@JoinColumn(name="task_id"),
            inverseJoinColumns=@JoinColumn(name="user_id"))
    private List<OurUsers> users;

    public void addAssignees(OurUsers tempUser) {
        if(users == null) {
            users = new ArrayList<>();
        }
        users.add(tempUser);
    }

    public void add(File tempFile) {
        if(files == null) {
            files = new ArrayList<>();
        }
        files.add(tempFile);
        tempFile.setTask(this);
    }
 }
