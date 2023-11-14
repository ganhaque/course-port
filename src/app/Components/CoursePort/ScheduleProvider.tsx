'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  Course,
  Department,
  Semester,
  exampleDatabase,
  timeIntervals,
  departments,
  semesters,
  days,
} from './Data'

interface ProviderContextType {
  selectedSemester: string;
  setSelectedSemester: React.Dispatch<React.SetStateAction<string>>;
  selectedCourses: Course[];
  setSelectedCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  addCourse: <T extends Course>(course: T) => void;
  removeCourse: <T extends Course>(course: T) => void;
  selectedDepartment: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
  selectedDays: string[];
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;
  database: Semester[];
  activePageIndex: number;
  setActivePageIndex: React.Dispatch<React.SetStateAction<number>>;
  filterString: string;
  setFilterString: React.Dispatch<React.SetStateAction<string>>;
}

const ScheduleContext = createContext<ProviderContextType | null>(null);

// Create a provider to wrap the components that need access to the board context
export const ScheduleProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [selectedSemester, setSelectedSemester] = useState<string>(semesters[0])
  const [selectedDepartment, setSelectedDepartment] = useState<string>(departments[0])
  const [selectedDays, setSelectedDays] = useState<string[]>(days)
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  /* const [database, setDatabase] = useState<Semester[]>(exampleDatabase); */
  const database = exampleDatabase;
  const [filterString, setFilterString] = useState<string>("");

  const [activePageIndex, setActivePageIndex] = useState<number>(0);

  const addCourse = <T extends Course>(course: T) => {
    setSelectedCourses((prevSelectedCourses) => {
      // Check if the course is already in the selectedCourses array
      if (prevSelectedCourses.some((selectedCourse) => selectedCourse.number === course.number && selectedCourse.section === course.section)) {
        return prevSelectedCourses; // Course is already selected, no need to add it again
      }

      // Add the course to the selectedCourses array
      return [...prevSelectedCourses, course];
    });
  };

  const removeCourse = <T extends Course>(course: T) => {
    setSelectedCourses((prevSelectedCourses) => {
      // Filter out the course with the specified number and section
      const updatedSelectedCourses = prevSelectedCourses.filter(
        (selectedCourse) => selectedCourse.number !== course.number || selectedCourse.section !== course.section
      );
      return updatedSelectedCourses;
    });
  };

  return (
    <ScheduleContext.Provider
      value={{
        selectedSemester,
        setSelectedSemester,
        selectedCourses,
        setSelectedCourses,
        addCourse,
        removeCourse,
        selectedDepartment,
        setSelectedDepartment,
        selectedDays,
        setSelectedDays,
        database,
        activePageIndex,
        setActivePageIndex,
        filterString,
        setFilterString
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

// A custom hook to use the board context in components
export const useScheduleContext = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useScheduleContext must be used within a ScheduleProvider');
  }
  return context;
};

