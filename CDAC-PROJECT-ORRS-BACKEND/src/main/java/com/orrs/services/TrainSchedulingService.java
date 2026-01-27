package com.orrs.services;

public interface TrainSchedulingService {
    
    /**
     * Schedules all active trains for the next 60 days (initial setup)
     */
    void scheduleTrainsForNext60Days();
    
    /**
     * Schedules trains for the next day only (daily cron job)
     */
    void scheduleTrainsForNextDay();
}