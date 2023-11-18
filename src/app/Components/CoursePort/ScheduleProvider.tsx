'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  Course,
  /* Department, */
  /* Semester, */
  /* exampleDatabase, */
  bookletData,
  timeIntervals,
  departments,
  initialDays,
  semesters,
  days,
  Database,
} from './Data'
import { initialVisibleColumnId } from './Columns';

interface ProviderContextType {
  selectedSemester: string;
  setSelectedSemester: React.Dispatch<React.SetStateAction<string>>;
  selectedCourses: Course[];
  setSelectedCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  addCourse: <T extends Course>(course: T) => void;
  removeCourse: <T extends Course>(course: T) => void;
  selectedDepartment: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
  /* selectedDays: string[]; */
  /* setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>; */
  selectedDays: { [day: string]: boolean };
  setSelectedDays: React.Dispatch<React.SetStateAction<{ [day: string]: boolean }>>;
  database: Database;
  activePageIndex: number;
  setActivePageIndex: React.Dispatch<React.SetStateAction<number>>;
  filterString: string;
  setFilterString: React.Dispatch<React.SetStateAction<string>>;
  visibleColumns: string[];
  setVisibleColumns: React.Dispatch<React.SetStateAction<string[]>>;
  /* isExclusiveDays: boolean; */
  /* setIsExclusiveDays: React.Dispatch<React.SetStateAction<boolean>>; */
  isShowTBA: boolean;
  setIsShowTBA: React.Dispatch<React.SetStateAction<boolean>>;
  /* toggleIsExclusiveDays: () => void; */
  toggleSelectedDays: () => void;
  toggleDaySelection: (day: string) => void;
}

const ScheduleContext = createContext<ProviderContextType | null>(null);

// Create a provider to wrap the components that need access to the board context
export const ScheduleProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [selectedSemester, setSelectedSemester] = useState<string>(semesters[0])
  /* const [selectedDepartment, setSelectedDepartment] = useState<string>(departments[0]) */
  const [selectedDepartment, setSelectedDepartment] = useState<string>("COMPUTER SCIENCE");
  /* const [selectedDays, setSelectedDays] = useState<string[]>(days) */
  const [selectedDays, setSelectedDays] = useState<{ [key: string]: boolean }>(initialDays);
  /* const [isExclusiveDays, setIsExclusiveDays] = useState<boolean>(false); */
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [isShowTBA, setIsShowTBA] = useState<boolean>(true);
  /* const [database, setDatabase] = useState<Semester[]>(exampleDatabase); */
  const database: Database = bookletData;
  const [filterString, setFilterString] = useState<string>("");

  const [visibleColumns, setVisibleColumns] = useState<string[]>(initialVisibleColumnId);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);

  const toggleDaySelection = (day: string) => {
    setSelectedDays(prevSelectedDays => ({
      ...prevSelectedDays,
      [day]: !prevSelectedDays[day], // Toggle the value for the specific day
    }));
  };

  // Toggle the value for each day
  const toggleSelectedDays = () => {
    setIsShowTBA(!isShowTBA);
    const updatedDays: { [day: string]: boolean } = {};

    Object.keys(selectedDays).forEach(day => {
      updatedDays[day] = !selectedDays[day];
    });

    setSelectedDays(updatedDays);
  };

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
        setFilterString,
        visibleColumns,
        setVisibleColumns,
        toggleSelectedDays,
        toggleDaySelection,
        isShowTBA,
        setIsShowTBA,
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

