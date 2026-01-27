package com.orrs.services;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.orrs.entities.Train;
import com.orrs.entities.TrainSchedule;
import com.orrs.enums.ScheduleStatus;
import com.orrs.repositories.TrainRepository;
import com.orrs.repositories.TrainScheduleRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TrainSchedulingServiceImpl implements TrainSchedulingService {

    private final TrainRepository trainRepository;
    private final TrainScheduleRepository trainScheduleRepository;

    @Override
    public void scheduleTrainsForNext60Days() {
        log.info("Starting initial 60-day train scheduling...");
        
        List<Train> activeTrains = trainRepository.findAllActiveTrains();
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusDays(60);
        
        int totalScheduled = 0;
        
        for (Train train : activeTrains) {
            List<DayOfWeek> runningDays = parseDaysOfRun(train.getDaysOfRun());
            
            for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
                if (runningDays.contains(date.getDayOfWeek())) {
                    // Check if schedule already exists
                    if (!trainScheduleRepository.existsByTrainIdAndDate(train.getId(), date)) {
                        TrainSchedule schedule = new TrainSchedule();
                        schedule.setTrain(train);
                        schedule.setDepartureDate(date);
                        schedule.setStatus(ScheduleStatus.RUNNING);
                        
                        trainScheduleRepository.save(schedule);
                        totalScheduled++;
                    }
                }
            }
        }
        
        log.info("Initial 60-day scheduling completed. Total schedules created: {}", totalScheduled);
    }

    @Override
    @Scheduled(cron = "0 1 0 * * ?") // Run daily at 12:01 AM
    public void scheduleTrainsForNextDay() {
        log.info("Starting daily train scheduling for next day...");
        
        List<Train> activeTrains = trainRepository.findAllActiveTrains();
        LocalDate targetDate = LocalDate.now().plusDays(60); // Schedule for 60 days ahead
        
        int totalScheduled = 0;
        
        for (Train train : activeTrains) {
            List<DayOfWeek> runningDays = parseDaysOfRun(train.getDaysOfRun());
            
            if (runningDays.contains(targetDate.getDayOfWeek())) {
                // Check if schedule already exists
                if (!trainScheduleRepository.existsByTrainIdAndDate(train.getId(), targetDate)) {
                    TrainSchedule schedule = new TrainSchedule();
                    schedule.setTrain(train);
                    schedule.setDepartureDate(targetDate);
                    schedule.setStatus(ScheduleStatus.RUNNING);
                    
                    trainScheduleRepository.save(schedule);
                    totalScheduled++;
                }
            }
        }
        
        log.info("Daily scheduling completed for date: {}. Total schedules created: {}", targetDate, totalScheduled);
    }

    /**
     * Parses the daysOfRun string (e.g., "Mon,Wed,Fri") into a list of DayOfWeek
     */
    private List<DayOfWeek> parseDaysOfRun(String daysOfRun) {
        List<DayOfWeek> days = new ArrayList<>();
        
        if (daysOfRun == null || daysOfRun.trim().isEmpty()) {
            return days;
        }
        
        String[] dayStrings = daysOfRun.split(",");
        
        for (String dayStr : dayStrings) {
            String trimmedDay = dayStr.trim().toUpperCase();
            
            switch (trimmedDay) {
                case "MON", "MONDAY" -> days.add(DayOfWeek.MONDAY);
                case "TUE", "TUESDAY" -> days.add(DayOfWeek.TUESDAY);
                case "WED", "WEDNESDAY" -> days.add(DayOfWeek.WEDNESDAY);
                case "THU", "THURSDAY" -> days.add(DayOfWeek.THURSDAY);
                case "FRI", "FRIDAY" -> days.add(DayOfWeek.FRIDAY);
                case "SAT", "SATURDAY" -> days.add(DayOfWeek.SATURDAY);
                case "SUN", "SUNDAY" -> days.add(DayOfWeek.SUNDAY);
                case "DAILY" -> {
                    return Arrays.asList(DayOfWeek.values()); // All days
                }
                default -> log.warn("Unknown day format: {} for train scheduling", trimmedDay);
            }
        }
        
        return days;
    }
}