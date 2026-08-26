package com.mitcampus.ams.entity;
import jakarta.persistence.*;import java.time.*;
@Entity @Table(name="AVAILABILITY") public class Availability { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) @Column(name="AVAILABILITY_ID") public Long id; @ManyToOne(optional=false) @JoinColumn(name="OFFICIAL_ID") public Official official; @Column(name="DAY_NAME") public String day; @Column(name="START_TIME") public LocalTime startTime; @Column(name="END_TIME") public LocalTime endTime; @Column(name="IS_AVAILABLE") public Boolean available; }
