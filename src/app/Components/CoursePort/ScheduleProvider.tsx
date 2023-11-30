'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from 'react';
import {
  Course,
  /* Department, */
  /* Semester, */
  /* exampleDatabase, */
  bookletData,
  timeIntervals,
  departments,
  initialDays,
  timeStringToMinutes,
  semesters,
  days,
  Database,
} from './Data'
import { initialVisibleColumnId } from './Columns';
import { changeTheme, ThemeMap } from './Colorscheme';

interface ProviderContextType {
  selectedSemester: string;
  setSelectedSemester: React.Dispatch<React.SetStateAction<string>>;
  selectedCourses: Course[];
  /* setSelectedCourses: React.Dispatch<React.SetStateAction<Course[]>>; */
  addSelectedCourse: <T extends Course>(course: T) => void;
  removeSelectedCourse: <T extends Course>(course: T) => void;
  pickedCourses: Course[];
  /* setPickedCourses: React.Dispatch<React.SetStateAction<Course[]>>; */
  addPickedCourse: <T extends Course>(course: T) => void;
  addPickedCourseNoCollision: <T extends Course>(course: T) => void;
  removePickedCourse: <T extends Course>(course: T) => void;
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
  isShowTBADays: boolean;
  setIsShowTBADays: React.Dispatch<React.SetStateAction<boolean>>;
  isShowTBATime: boolean;
  setIsShowTBATime: React.Dispatch<React.SetStateAction<boolean>>;
  /* toggleIsExclusiveDays: () => void; */
  toggleSelectedDays: () => void;
  toggleDaySelection: (day: string) => void;
  timeIntervals: string[];
  reversedTimeIntervals: string[];
  fromTime: string;
  setFromTime: React.Dispatch<React.SetStateAction<string>>;
  toTime: string;
  setToTime: React.Dispatch<React.SetStateAction<string>>;
  selectedTheme: string;
  setSelectedTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ScheduleContext = createContext<ProviderContextType | null>(null);

// Create a provider to wrap the components that need access to the board context
export const ScheduleProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const database: Database = bookletData;
  const timeIntervals = Object.keys(timeStringToMinutes);
  const reversedTimeIntervals = Object.keys(timeStringToMinutes).reverse();
  const [selectedTheme, setSelectedTheme] = useState(Object.keys(ThemeMap)[0]); // Set initial theme

  const [selectedSemester, setSelectedSemester] = useState<string>(semesters[0])
  /* const [selectedDepartment, setSelectedDepartment] = useState<string>(departments[0]) */
  const [selectedDepartment, setSelectedDepartment] = useState<string>("COMPUTER SCIENCE");
  /* const [selectedDays, setSelectedDays] = useState<string[]>(days) */
  const [selectedDays, setSelectedDays] = useState<{ [key: string]: boolean }>(initialDays);
  /* const [isExclusiveDays, setIsExclusiveDays] = useState<boolean>(false); */
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [pickedCourses, setPickedCourses] = useState<Course[]>([]);
  const [isShowTBADays, setIsShowTBADays] = useState<boolean>(true);
  const [isShowTBATime, setIsShowTBATime] = useState<boolean>(true);
  /* const [database, setDatabase] = useState<Semester[]>(exampleDatabase); */
  const [filterString, setFilterString] = useState<string>("");

  const [visibleColumns, setVisibleColumns] = useState<string[]>(initialVisibleColumnId);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);

  const [fromTime, setFromTime] = useState(timeIntervals[0]);
  const [toTime, setToTime] = useState(reversedTimeIntervals[0]);

  useEffect(() => {
    changeTheme(selectedTheme);
  }, [selectedTheme]);

  const toggleDaySelection = (day: string) => {
    setSelectedDays(prevSelectedDays => ({
      ...prevSelectedDays,
      [day]: !prevSelectedDays[day], // Toggle the value for the specific day
    }));
  };

  // Toggle the value for each day
  const toggleSelectedDays = () => {
    setIsShowTBADays(!isShowTBADays);
    const updatedDays: { [day: string]: boolean } = {};

    Object.keys(selectedDays).forEach(day => {
      updatedDays[day] = !selectedDays[day];
    });

    setSelectedDays(updatedDays);
  };

  const addSelectedCourse = <T extends Course>(course: T) => {
    /* console.log("add selectedCourses", course); */
    setSelectedCourses((prevSelectedCourses) => {
      /* NOTE: stuffs inside here get called twice for some reason */
      /* even though addSelectedCourse is only called once */
      /* console.log("TWICE"); */

      // Check if the course is already in the selectedCourses array
      if (prevSelectedCourses.some((selectedCourse) => selectedCourse === course)) {
        console.log("selectedCourse already exist. Should not happen");
        return prevSelectedCourses; // Course is already selected, no need to add it again
      }

      // Add the course to the selectedCourses array
      return [...prevSelectedCourses, course];
    });
  };

  const removeSelectedCourse = <T extends Course>(course: T) => {
    setSelectedCourses((prevSelectedCourses) => {
      const updatedSelectedCourses = prevSelectedCourses.filter(
        (selectedCourse) => selectedCourse !== course
      );
      return updatedSelectedCourses;
    });
    removePickedCourse(course);
  };

  const addPickedCourseNoCollision = <T extends Course>(course: T) => {
    setPickedCourses((prevPickedCourses) => {
      // Check if the course is already in the selectedCourses array
      if (prevPickedCourses.some((pickedCourse) => pickedCourse === course)) {
        console.log("pickedCourse already exists. Should not happen");
        return prevPickedCourses; // Course is already selected, no need to add it again
      }

      // Add the course to the selectedCourses array
      return [...prevPickedCourses, course];
    });
  };

  const addPickedCourse = <T extends Course>(course: T) => {
    setPickedCourses((prevPickedCourses) => {
      const hasDaysOverlap = (days1: string, days2: string) => {
        if (days1 === "?" || days2 === "?") {
          return false; // If any day is "?", it doesn't overlap
        }

        return days1
          .replace(/\s/g, '')
          .replace('TH', 'H')
          .split('')
          .some((day) =>
            days2.replace(/\s/g, '').replace('TH', 'H').includes(day)
          );
      };

      const hasTimeOverlap = (
        beginTime1: number | string,
        endTime1: number | string,
        beginTime2: number | string,
        endTime2: number | string
      ) => {
        if (beginTime1 === "?" || endTime1 === "?" || beginTime2 === "?" || endTime2 === "?") {
          return false; // If any value is "?", it doesn't overlap
        }

        const isNumeric = (value: number | string): value is number => typeof value === 'number';

        if (isNumeric(beginTime1) && isNumeric(endTime1) && isNumeric(beginTime2) && isNumeric(endTime2)) {
          return (
            (beginTime1 >= beginTime2 && beginTime1 <= endTime2) ||
              (endTime1 >= beginTime2 && endTime1 <= endTime2)
          );
        }

        // If any value is not a number and not "?", it doesn't overlap, although this should not ever happen
        return false;
      };

      const hasOverlap = (course1: Course, course2: Course) => {
        const regularDaysOverlap = hasDaysOverlap(course1.days, course2.days);
        const regularTimeOverlap = hasTimeOverlap(
          course1.begin,
          course1.end,
          course2.begin,
          course2.end
        );

        if (course1.lab) {
          const labDaysOverlap1 = hasDaysOverlap(course1.lab.days, course2.days);
          const labTimeOverlap1 = hasTimeOverlap(
            course1.lab.begin,
            course1.lab.end,
            course2.begin,
            course2.end
          );

          if (course2.lab) {
            const labLabDaysOverlap = hasDaysOverlap(course1.lab.days, course2.lab.days);
            const labLabTimeOverlap = hasTimeOverlap(
              course1.lab.begin,
              course1.lab.end,
              course2.lab.begin,
              course2.lab.end
            );
            const labDaysOverlap2 = hasDaysOverlap(course1.days, course2.lab.days);
            const labTimeOverlap2 = hasTimeOverlap(
              course1.begin,
              course1.end,
              course2.lab.begin,
              course2.lab.end
            );
            if (labLabDaysOverlap && labLabTimeOverlap || labDaysOverlap2 && labTimeOverlap2) {
              return true;
            }
          }
          if (labDaysOverlap1 && labTimeOverlap1) {
            return true;
          }
        }

        if (course2.lab) {
          const labDaysOverlap2 = hasDaysOverlap(course1.days, course2.lab.days);
          const labTimeOverlap2 = hasTimeOverlap(
            course1.begin,
            course1.end,
            course2.lab.begin,
            course2.lab.end
          );
          if (labDaysOverlap2 && labTimeOverlap2) {
            return true;
          }
        }

        return regularDaysOverlap && regularTimeOverlap;
      };

      const conflictedIndex = prevPickedCourses.findIndex((pickedCourse) => {
        return hasOverlap(course, pickedCourse);
      });

      if (conflictedIndex !== -1) {
        console.log("conflict");
        // Replace the conflicted course with the new one
        const updatedCourses = [...prevPickedCourses];
        updatedCourses.splice(conflictedIndex, 1, course);
        return updatedCourses;
      }

      // Check if the course is already in the selectedCourses array
      if (prevPickedCourses.some((pickedCourse) => pickedCourse === course)) {
        console.log("pickedCourse already exists. Should not happen");
        return prevPickedCourses; // Course is already selected, no need to add it again
      }

      // Add the course to the selectedCourses array
      return [...prevPickedCourses, course];
    });
  };

  const removePickedCourse = <T extends Course>(course: T) => {
    setPickedCourses((prevPickedCourses) => {
      const updatedPickedCourses = prevPickedCourses.filter(
        (pickedCourses) => pickedCourses !== course
      );
      return updatedPickedCourses;
    });
  };

  return (
    <ScheduleContext.Provider
      value={{
        selectedSemester,
        setSelectedSemester,
        selectedCourses,
        /* setSelectedCourses, */
        addSelectedCourse,
        removeSelectedCourse,
        pickedCourses,
        /* setPickedCourses, */
        addPickedCourse,
        addPickedCourseNoCollision,
        removePickedCourse,
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
        isShowTBADays,
        setIsShowTBADays,
        isShowTBATime,
        setIsShowTBATime,
        timeIntervals,
        reversedTimeIntervals,
        fromTime,
        setFromTime,
        toTime,
        setToTime,
        selectedTheme,
        setSelectedTheme,
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

