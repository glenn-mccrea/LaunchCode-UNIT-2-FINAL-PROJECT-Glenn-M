package com.HDT.JavaBackend.service;

import com.HDT.JavaBackend.model.Log;
import com.HDT.JavaBackend.model.Subject;
import com.HDT.JavaBackend.repository.LogRepository;
import com.HDT.JavaBackend.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LogService {

    @Autowired
    private LogRepository logRepository;

    @Autowired
    private SubjectRepository subjectRepository; // ← ADD THIS

    public List<Log> getAllLogs() {
        return logRepository.findAll();
    }

    public Log createLog(Log log) {
        // ← Fetch the full subject from DB first, THEN save the log
        Subject subject = subjectRepository.findById(log.getSubject().getId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        log.setSubject(subject);
        return logRepository.save(log);
    }

    public Log updateLog(Long id, Log updatedLog) {
        Log existing = logRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Log not found"));

        Subject subject = subjectRepository.findById(updatedLog.getSubject().getId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        existing.setSubject(subject);
        existing.setDuration(updatedLog.getDuration());
        existing.setMaterials(updatedLog.getMaterials());
        existing.setNotes(updatedLog.getNotes());

        return logRepository.save(existing);
    }

    public void deleteLog(Long id) {
        logRepository.deleteById(id);
    }
}