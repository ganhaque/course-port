export interface Course {
  available: number;
  enrollmentCount: number;
  abbreviation: string;
  number: number;
  type?: string; // for the RES & IND thing (idk what they mean)
  section: number;
  title: string;
  creditHour: number;
  begin: string;
  end: string;
  days: string;
  roomNumber: number;
  building?: string;
  instructor?: string;
  specialEnrollment?: string;
  lab?: { // or REC, idk what that mean
    begin?: string;
    end?: string;
    days?: string;
  }
}

export interface Department {
  departmentTitle: string;
  courses: Course[];
}

export interface Semester {
  semesterTitle: string;
  departments: Department[];
}

export const exampleDatabase: Semester[] = [
  {
    semesterTitle: "Spring 2024",
    departments: [
      {
        departmentTitle: "Computer Science",
        courses: [
          {
            available: 42,
            enrollmentCount: 8,
            abbreviation: "CSC",
            number: 1240,
            section: 1,
            title: "STATS & GRAPH MATLB",
            creditHour: 3,
            begin: "1130",
            end: "1220",
            days: "MW",
            roomNumber: 1240,
            building: "PATRICK TAYLOR",
            instructor: "BRENER N",
          },
          {
            available: 84,
            enrollmentCount: 6,
            abbreviation: "CSC",
            number: 1350,
            section: 1,
            title: "COMP SCI I-MJRS",
            creditHour: 4,
            begin: "1030",
            end: "1120",
            days: "MWF",
            roomNumber: 1221,
            building: "PATRICK TAYLOR",
            instructor: "DUNCAN W",
            lab: {
              begin: "430",
              end: "720N",
              days: "W",
            }
          },
        ],
      },
      {
        departmentTitle: "Mathematics",
        courses: [
          {
            available: 36,
            enrollmentCount: 4,
            abbreviation: "MATH",
            number: 1550,
            section: 1,
            title: "CALCULUS I",
            creditHour: 5,
            begin: "730",
            end: "0820",
            days: "MTWTF",
            roomNumber: 155,
            building: "COATES",
            /* instructor: "HOMAN T", */ // no instructor listed
            lab : {
              // they have REC instead of lab, and it's TBA (no time or day). idk what to do with that lol
            }
          },
        ],
      },
    ]
  },
  {
    semesterTitle: "Fall 2023",
    departments: [
      {
        departmentTitle: "Computer Science",
        courses: [
          {
            available: 13,
            enrollmentCount: 17,
            abbreviation: "CSC",
            number: 1240,
            section: 1,
            title: "STATS & GRAPH MATLB",
            creditHour: 3,
            begin: "1130",
            end: "1220",
            days: "MW",
            roomNumber: 1216,
            building: "PATRICK TAYLOR",
            instructor: "BRENER N",
          },
          {
            available: 0,
            enrollmentCount: 110,
            abbreviation: "CSC",
            number: 1350,
            section: 2,
            title: "COMP SCI I-MJRS",
            creditHour: 4,
            begin: "930",
            end: "1020",
            days: "MWF",
            roomNumber: 1620,
            building: "BUS ED N WING",
            instructor: "DONZE D",
            lab: {
              begin: "500",
              end: "0750N",
              days: "M",
            }
          },
        ],
      },
      {
        departmentTitle: "Mathematics",
        courses: [
          {
            available: 0,
            enrollmentCount: 85,
            abbreviation: "MATH",
            number: 1550,
            section: 1,
            title: "CALCULUS I",
            creditHour: 5,
            begin: "730",
            end: "0820",
            days: "MTWTF",
            roomNumber: 143,
            building: "COATES",
            instructor: "HOMAN T",
            lab : {
              // they have REC instead of lab, and it's TBA (no time or day). idk what to do with that lol
            }
          },
        ],
      },
    ]
  }
];
