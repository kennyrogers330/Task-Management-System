package com.example.demo.service;

import com.example.demo.dto.AddTaskModel;
import com.example.demo.entity.File;
import com.example.demo.entity.OurUsers;
import com.example.demo.entity.Project;
import com.example.demo.entity.Task;
import com.example.demo.repository.FileRepository;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.logging.Logger;

@Service
@Transactional
public class TaskService {
    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private UsersRepo usersRepo;
    @Autowired
    private TaskRepository taskRepository;

    private ProjectRepository projectRepository;

    private Logger logger = Logger.getLogger(getClass().getName());
    public void SaveTask(AddTaskModel taskModel, String filePath) {

       try {
           logger.info("saving task");
           Task task = new Task();
           task.setName(taskModel.getName());
           task.setDescription(taskModel.getDescription());
           task.setPriority(taskModel.getPriority());
           task.setStart_date(taskModel.getStart_date());
           task.setEnd_date(taskModel.getEnd_date());

//           for (String file: taskModel.getBase64Files()) {
               File tempFile = new File();
               tempFile.setFile(filePath);
               task.add(tempFile);
                fileRepository.save(tempFile);
//           }

//           System.out.println("-------------------------------------" + taskModel.getSelectedProject());
           Project project = projectRepository.findByName(taskModel.getSelectedProject()).orElse(null);
           if(project!=null){
                  project.add(task);
                  projectRepository.save(project);
           }

           for (String assignee: taskModel.getAssignees()) {
               OurUsers user = usersRepo.findByName(assignee).orElse(null);
               task.addAssignees(user);
           }

            taskRepository.save(task);

       }catch (Exception e){
           System.out.println(e.getMessage());
       }
    }
}
