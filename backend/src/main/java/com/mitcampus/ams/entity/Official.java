package com.mitcampus.ams.entity;
import jakarta.persistence.*;import java.time.*;
@Entity @Table(name="OFFICIALS") public class Official { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(name="OFFICIAL_ID") public Long id; public String name; @Column(name="EMPLOYEE_ID") public String employeeId; public String email; @Column(name="PASSWORD_HASH") public String passwordHash; @Column(name="CONTACT_NUMBER") public String contactNumber; public String designation; public String department; @Column(name="CREATED_AT") public LocalDateTime createdAt=LocalDateTime.now(); }
