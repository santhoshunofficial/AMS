package com.mitcampus.ams.entity;
import jakarta.persistence.*;import java.time.*;
@Entity @Table(name="NOTIFICATIONS") public class Notification { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(name="NOTIFICATION_ID") public Long id; @Column(name="USER_ID") public Long userId; @Column(name="USER_ROLE") public String userRole; public String title; @Column(length=2000) public String message; public String type; @Column(name="IS_READ") public Boolean read=false; @Column(name="CREATED_AT") public LocalDateTime createdAt=LocalDateTime.now(); }
