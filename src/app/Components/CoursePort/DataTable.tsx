"use client"

import { useEffect, useState } from "react";
import { Fragment } from "react";
import {
  IoMdHeartEmpty,
  IoMdHeart
} from "react-icons/io";

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../UI/Table"

import { PlusCircle, MinusCircle } from "lucide-react";
import { useScheduleContext } from "./ScheduleProvider";
import { Course } from "./Data";
import { timeStringToMinutes, mapDaysToShortForm } from "./Data";
import { columns } from "./Columns";

/* interface DataTableProps<TData, TValue> { */
/*   columns: ColumnDef<TData, TValue>[] */
/*   data: TData[] */
/* } */
/**/
/* export function DataTable<TData, TValue>({ */
/*   columns, */
/*   data, */
/* }: DataTableProps<TData, TValue>) { */

export function DataTable() {
  const {
    selectedSemester,
    selectedCourses,
    selectedDepartment,
    selectedDays,
    database,
    addSelectedCourse,
    removeSelectedCourse,
    addPickedCourse,
    removePickedCourse,
    addConflictedCourse,
    removeConflictedCourse,
    filterString,
    visibleColumns,
    isShowTBADays,
    isShowTBATime,
    fromTime,
    toTime,
  } = useScheduleContext();

  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  // Use useEffect to update filtered data when selectedSemester or selectedDepartment changes
  useEffect(() => {
    if (!database[selectedSemester]?.[selectedDepartment]) return;
    /* console.log("Update"); */
    /* const courses = database[selectedSemester][selectedDepartment]; */
    /* const sourses: Course[] = database[selectedSemester][selectedDepartment]; */
    const basic: Course[] = database[selectedSemester][selectedDepartment];
    const coursesSet = new Set([...basic, ...selectedCourses]);
    const courses: Course[] = Array.from(coursesSet);
    /* const courses: Course[] | undefined = */
    /*   selectedDepartment === "ALL" */
    /*     ? Object.values(database[selectedSemester]).flat() */
    /*     : database[selectedSemester]?.[selectedDepartment]; */
    const newFilteredCourses = courses.filter(course => {
      const courseDaysArray = course.days.split("");
      /* const selectedDaysShortForm = selectedDays.map(day => mapDaysToShortForm[day]); */
      const selectedDaysShortForm = Object.keys(selectedDays)
      .filter(day => selectedDays[day])
      .map(day => mapDaysToShortForm[day]);
      const hasMatchingDays = selectedDaysShortForm.some(
        selectedDay => (
          (courseDaysArray.includes(selectedDay) && course.days !== "?")
            || isShowTBADays && course.days === "?"
        )
      );
      const matchesTitle = course.title.toLowerCase().includes(filterString.toLowerCase());
      const matchesNumber = String(course.number).includes(filterString);
      const matchesInstructor = course.instructor ? course.instructor.toLowerCase().includes(filterString.toLowerCase()) : false;
      const fromTimeMinute = timeStringToMinutes[fromTime];
      const toTimeMinute = timeStringToMinutes[toTime];
      const isTimeValid = fromTimeMinute <= toTimeMinute;
      const isWithinTime = (
        ((course.begin !== "?") ? course.begin : Number.MIN_SAFE_INTEGER) >= fromTimeMinute
          && ((course.end !== "?") ? course.end : Number.MAX_SAFE_INTEGER) <= toTimeMinute
      );
      return (
        hasMatchingDays
          && isTimeValid
          && (isWithinTime || (isShowTBATime && course.begin === "?"))
          && (filterString === '' || matchesTitle || matchesNumber || matchesInstructor)
      );
    })
    setFilteredCourses(newFilteredCourses);
  }, [
      selectedSemester,
      selectedDepartment,
      selectedDays,
      filterString,
      isShowTBADays,
      isShowTBATime,
      fromTime,
      toTime,
      database
    ]);

  const [sorting, setSorting] = useState<SortingState>([
    {id: "number", desc: false}
  ])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [visibleColumnsLoaded, setVisibleColumnsLoaded] = useState(false);
  const table = useReactTable({
    data: filteredCourses,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
    enableSortingRemoval: false,
  })

  useEffect(() => {
    setTimeout(() => {
      table.getRowModel().rows.forEach((row) => {
        const isRowSelected = selectedCourses.some((course) => course === (row.original as Course));
        row.toggleSelected(isRowSelected);
      });
    }, 0);
  }, [selectedSemester, selectedDepartment, selectedDays, filterString, selectedCourses]);

  useEffect(() => {
    /* console.log(visibleColumns); */
    table.getAllColumns().forEach((column) => {
      const isColumnVisible = visibleColumns.some((id) => id === column.id);
      /* console.log(column.id, isColumnVisible); */
      column.toggleVisibility(isColumnVisible);
    })
    setVisibleColumnsLoaded(true);
  }, [visibleColumns])

  return (
    <>
      {visibleColumnsLoaded ? (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => {
                const currentCourse = row.original as Course;
                const nextRow = table.getRowModel().rows[index + 1]?.original as Course;
                const isSectionOne = currentCourse.section === 1;

                const isNextSectionOne = nextRow?.section === 1;
                const isDifferentBeginEnd = nextRow &&
                  (nextRow.begin !== currentCourse.begin || nextRow.end !== currentCourse.end);
                const isDifferentInstructor = nextRow && nextRow.instructor !== currentCourse.instructor;

                const isNewSection =
                  index < table.getRowModel().rows.length - 1 &&
                    ((table.getColumn("number")?.getIsSorted() === "asc" && isNextSectionOne) ||
                      (table.getColumn("number")?.getIsSorted() === "desc" && isSectionOne) ||
                      (table.getColumn("begin-end")?.getIsSorted() && isDifferentBeginEnd) ||
                      (table.getColumn("instructor")?.getIsSorted() && isDifferentInstructor)
                    );
                return (
                  <Fragment key={row.id}>
                    <TableRow
                      className={isNewSection ? "new-section" : ""}
                      data-state={(row.getIsSelected() && "selected")}
                      /* onAuxClick={() => { */
                      /*   if (row.getIsSelected()) { */
                      /*     removeSelectedCourse(row.original as Course); */
                      /*   } */
                      /*   else { */
                      /*     addSelectedCourse(row.original as Course); */
                      /*   } */
                      /* }} */
                      onClick={() => {
                        if (row.getIsSelected()) {
                          removeSelectedCourse(row.original as Course);
                          removePickedCourse(row.original as Course);
                          removeConflictedCourse(row.original as Course);
                        }
                        else {
                          addSelectedCourse(row.original as Course);
                          addPickedCourse(row.original as Course);
                          addConflictedCourse(row.original as Course);
                        }
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {cell.column.id === 'add' && (
                            <button
                              style={{
                                borderWidth: "0",
                                boxShadow: "none",
                              }}
                              /* className="ghost" */
                              /* onClick={() => { */
                              /*   const course = row.original as Course; */
                              /*   if (row.getIsSelected()) { */
                              /*     removeSelectedCourse(course); */
                              /*     console.log("removed", course); */
                              /*   } */
                              /*   else { */
                              /*     addSelectedCourse(course); */
                              /*     console.log("added", course); */
                              /*   } */
                              /* }} */
                            >
                              {row.getIsSelected() ? (
                                <IoMdHeart
                                  style={{
                                    width:"1rem",
                                    height:"1rem",
                                    color:"hsla(var(--red))",
                                  }}
                                />
                              ) : (
                                  <IoMdHeartEmpty
                                    style={{
                                      width:"1rem",
                                      height:"1rem",
                                      color:"hsla(var(--grey))"
                                    }}
                                  />
                                )}
                            </button>
                          )}
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  </Fragment>
                )
              })
            ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      ) : (
          <div
            style={{
              height:"100%",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              color:"hsla(var(--muted_foreground))"
            }}
          >
            Loading...
          </div>
        )
      }
    </>
  )
}
