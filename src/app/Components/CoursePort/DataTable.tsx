"use client"

import { useEffect, useState } from "react";
import { Fragment } from "react";

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

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../UI/DropdownMenu"

import { PlusCircle, MinusCircle } from "lucide-react";
import { useScheduleContext } from "./ScheduleProvider";
import { Course } from "./Data";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const {
    selectedSemester,
    /* setSelectedSemester, */
    selectedCourses,
    /* setSelectedCourses, */
    selectedDepartment,
    selectedDays,
    /* setSelectedDepartment, */
    /* database, */
    addCourse,
    removeCourse,
    filterString,
    visibleColumns,
    setVisibleColumns
  } = useScheduleContext();

  const [sorting, setSorting] = useState<SortingState>([
    {id: "number", desc: false}
  ])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [visibleColumnsLoaded, setVisibleColumnsLoaded] = useState(false);
  const table = useReactTable({
    data,
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

      /* column.toggleVisibility(!!value) */
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
      {visibleColumnsLoaded ? ( // Render the table only when visibleColumnsLoaded is true
        <div style={{
          overflow:"visible",
        }}
        >
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
                  /* const isNumberSorted = table.getColumn("number")?.getIsSorted(); */
                  const isSectionOne = currentCourse.section === 1;

                  const isNextSectionOne = nextRow?.section === 1;
                  const isDifferentBeginEnd = nextRow &&
                    (nextRow.begin !== currentCourse.begin || nextRow.end !== currentCourse.end);
                  const isDifferentInstructor = nextRow && nextRow.instructor !== currentCourse.instructor;

                  const isNewSection =
                    index < table.getRowModel().rows.length - 1 &&
                      ((table.getColumn("number")?.getIsSorted() === "asc" && isNextSectionOne) ||
                        (table.getColumn("number")?.getIsSorted() === "desc" && isSectionOne) ||
                          ((isDifferentBeginEnd && (table.getColumn("begin-end")?.getIsSorted()) ||
                            ((isDifferentInstructor && (table.getColumn("instructor")?.getIsSorted())))
                          )));
                  return (
                    <Fragment key={row.id}>
                      {/* {(row.original as Course).section === 1 && ( */}
                      {/*   <div style={{ height: "1rem" }} /> */}
                      {/* )} */}

                      {/* { */}
                      {/*   index < table.getRowModel().rows.length - 1 */}
                      {/*     && (table.getRowModel().rows[index + 1].original as Course).section === 1 */}
                      {/*     && ( <div style={{ height: "1rem" }} />) */}
                      {/* } */}
                      <TableRow
                        className={isNewSection ? "new-section" : ""}
                        /* className={ */
                        /*   (index < table.getRowModel().rows.length - 1 */
                        /*     && (table.getColumn("number")?.getIsSorted() */
                        /*       &&((table.getRowModel().rows[index + 1].original as Course).section === 1) */
                        /*       || ( */
                        /*         (((table.getRowModel().rows[index + 1].original as Course).begin !== (row.original as Course).begin) */
                        /*           || ((table.getRowModel().rows[index + 1].original as Course).end !== (row.original as Course).end) */
                        /*         ) && table.getColumn("begin-end")?.getIsSorted() */
                        /*       ) */
                        /*       || ( */
                        /*         (((table.getRowModel().rows[index + 1].original as Course).instructor !== (row.original as Course).instructor) */
                        /*         ) && table.getColumn("instructor")?.getIsSorted() */
                        /*       ) */
                        /*     ) */
                        /*   ) ? "new-section" : "" */
                        /* } */
                        /* key={row.id} */
                        data-state={(row.getIsSelected() && "selected")}
                        onAuxClick={() => {
                          if (row.getIsSelected()) {
                            removeCourse(row.original as Course);
                          }
                          else {
                            addCourse(row.original as Course);
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
                                onClick={() => {
                                  const course = row.original as Course;
                                  if (row.getIsSelected()) {
                                    removeCourse(course);
                                    console.log("removed", course);
                                  }
                                  else {
                                    addCourse(course);
                                    console.log("added", course);
                                  }
                                }}
                              >
                                {row.getIsSelected() ? (
                                  <div
                                    style={{
                                      color:"hsla(var(--red))"
                                    }}
                                  >
                                    <MinusCircle
                                      style={{
                                        width:"1rem",
                                        height:"1rem",
                                      }}
                                    />
                                  </div>
                                ) : (
                                    <div
                                      style={{
                                        color:"hsla(var(--green))"
                                      }}
                                    >
                                      <PlusCircle
                                        style={{
                                          width:"1rem",
                                          height:"1rem",
                                        }}
                                      />
                                    </div>
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
        </div>
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
