package com.HDT.JavaBackend.controller;

import com.HDT.JavaBackend.model.Log;
import com.HDT.JavaBackend.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "http://localhost:5173")
public class LogController {

    @Autowired
    private LogService logService;

    // GET all logs → React fetches these to display LogCards
    @GetMapping
    public List<Log> getAllLogs() {
        return logService.getAllLogs();
    }

    // POST a new log → React sends form data here
    @PostMapping
    public Log createLog(@RequestBody Log log) {
        return logService.createLog(log);
    }

    // PUT update an existing log → React sends edited data here
    @PutMapping("/{id}")
    public Log updateLog(@PathVariable Long id, @RequestBody Log updatedLog) {
        return logService.updateLog(id, updatedLog);
    }

    // DELETE triggered by "Delete Activity" button
    @DeleteMapping("/{id}")
    public void deleteLog(@PathVariable Long id) {
        logService.deleteLog(id);
    }
}