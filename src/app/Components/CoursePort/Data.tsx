/* import data from './booklet.json'; */
import data from './booklet.json';


export interface Course  {
  available: number;
  enrollmentCount: number;
  capacity: number;
  abbreviation: string;
  number: number;
  type?: string;
  section: number;
  title: string;
  creditHour: string;
  begin: number | "TBA";
  end: number | "TBA";
  duration: number | "TBA";
  days: string;
  roomNumber?: string;
  building?: string;
  instructor?: string;
  specialEnrollment?: string;
  lab?: {
    type: string;
    begin: number | "TBA";
    end: number | "TBA";
    duration: number | "TBA";
    days: string;
    roomNumber?: string;
    building?: string;
    instructor?: string;
  }
}

export interface Database {
  [semesterTitle: string]: {
    [departmentTitle: string]: Course[];
  };
}

export const bookletData = data as Database;
/* const accountingCourses: Course[] | undefined = database['spring2024']['ACCOUNTING']; */
/* if (accountingCourses) { */
/*   if (accountingCourses) { */
/*     const firstCourse: Course | undefined = accountingCourses[0]; */
/*     if (firstCourse) { */
/*       console.log(firstCourse.title); */
/*     } */
/*   } */
/* } */
/* export const database: Database = data; */
/* export const database = (data as Database); */

export const timeIntervals = [
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  // Add more time intervals here...
];

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
]

export const mapDaysToShortForm: { [longForm: string]: string } = {
  "Monday": "M",
  "Tuesday": "T",
  "Wednesday": "W",
  "Thursday": "H", // it's just H so that it get detected by the filter
  "Friday": "F",
};

export const semesters = [
  "Spring 2024",
  "Fall 2023",
  "Spring 2023",
  "Fall 2022",
  "Spring 2022",
  "Fall 2021",
  "Spring 2021",
  "Fall 2020",
  "Spring 2020",
  "Fall 2019",
  "Spring 2019",
  "Fall 2018",
  "Spring 2018",
  "Fall 2017",
  "Spring 2017",
  "Fall 2016",
  "Spring 2016",
  "Fall 2015",
  "Spring 2015",
  "Fall 2014",
  "Spring 2014",
  "Fall 2013",
  "Spring 2013",
  "Fall 2012",
  "Spring 2012",
  "Fall 2011",
  "Spring 2011",
  "Fall 2010",
  "Spring 2010",
  "Fall 2009"
];


export const departments = [
  "ACCOUNTING",
  "ADMINISTRATIVE & FOUNDATION SE",
  "AEROSPACE STUDIES",
  "AFRICAN & AFRICAN-AMERICAN STU",
  "AGRIC EDUCATION",
  "AGRIC & EXTENSION ED & EVALUAT",
  "AGRICULTURAL ECONOMICS",
  "AGRICULTURAL ECONOMICS & AGRIB",
  "AGRICULTURE",
  "AGRI, EXTENSION & ADULT EDUCAT",
  "AGRONOMY",
  "AMERICAN SIGN LANGUAGE",
  "ANIMAL SCIENCES",
  "ANTHROPOLOGY",
  "ARABIC",
  "ARCHITECTURE",
  "ART",
  "ART HISTORY",
  "ASTRONOMY",
  "ATHLETIC TRAINING",
  "AUDIO-VISUAL ARTS",
  "BASIC SCIENCES",
  "BIOLOGICAL ENGINEERING",
  "BIOLOGICAL SCIENCES",
  "BUSINESS ADMINISTRATION",
  "BUSINESS EDUCATION",
  "BUSINESS LAW",
  "CHEMICAL ENGINEERING",
  "CHEMISTRY",
  "CHILD AND FAMILY STUDIES",
  "CHINESE",
  "CIVIL ENGINEERING",
  "CIVIL & ENVIRONMENTAL ENGINEER",
  "CLASSICAL STUDIES",
  "COMMUNICATION DISORDERS",
  "COMMUNICATION STUDIES",
  "COMPARATIVE BIOMEDICAL SCIENCE",
  "COMPARATIVE LITERATURE",
  "COMPUTER SCIENCE",
  "CONSTRUCTION MANAGEMENT",
  "CURRICULUM & INSTRUCTION",
  "DAIRY SCIENCE",
  "DIGITAL MEDIA ARTS & ENGINEERI",
  "DISASTER SCIENCE MANAGEMENT",
  "DOCTOR OF DESIGN",
  "ECONOMICS",
  "EDUC LEADERSHIP RESEARCH COUNS",
  "EDUCATION",
  "ELECTRICAL ENGINEERING",
  "ENGINEERING",
  "ENGLISH",
  "ENTOMOLOGY",
  "ENTREPRENEURSHIP",
  "ENVIRONMENTAL ENGINEERING",
  "ENVIRONMENTAL MANAGEMENT SYSTE",
  "ENVIRONMENTAL SCIENCES",
  "ENVIRONMENTAL STUDIES",
  "EPIDEMIOLOGY & COMMUNITY HEALT",
  "EXPERIMENTAL STATISTICS",
  "EXTENSION EDUCATION",
  "FILM & MEDIA ARTS",
  "FINANCE",
  "FISHERIES",
  "FOOD SCIENCE",
  "FORESTRY",
  "FRENCH",
  "FRENCH STUDIES",
  "FRESHMAN FORUM",
  "FRESHMAN SEMINAR",
  "GENERAL BUSINESS",
  "GEOGRAPHY",
  "GEOLOGY",
  "GERMAN",
  "GRADUATE SCHOOL",
  "GREEK",
  "HEBREW",
  "HISTORY",
  "HOME ECON EDUC",
  "HONORS",
  "HORTICULTURE",
  "HOW TO DO LSU",
  "HUMAN ECOLOGY",
  "HUMAN RESOURCE EDUCATION",
  "HUMAN SCIENCES & EDUCATION",
  "HUMANITIES",
  "HUMANITIES AND SOCIAL SCIENCES",
  "INDUSTRIAL EDUCATION",
  "INDUSTRIAL ENGINEERING",
  "INDUSTRIAL TECHNOLOGY",
  "INDUSTRIAL & MANUFACTUR ENGINE",
  "INFO SYSTEMS AND DECISION SCIE",
  "INFORMATION STUDIES",
  "INTERIOR DESIGN",
  "INTERNATIONAL STUDIES",
  "ITALIAN",
  "JAPANESE",
  "JUNIOR DIVISION",
  "KINESIOLOGY",
  "LANDSCAPE ARCHITECTURE",
  "LATIN",
  "LEADERSHIP & HUMAN RESOURCES D",
  "LIBERAL ARTS",
  "LIBRARY & INFORMATION SCIENCE",
  "LIFE COURSE AND AGING",
  "LIFE COURSE IN AGING",
  "LINGUISTICS",
  "MANAGEMENT",
  "MARKETING",
  "MASS COMMUNICATION",
  "MATHEMATICS",
  "MECHANICAL ENGINEERING",
  "MEDICAL PHYSICS",
  "MILITARY SCIENCE",
  "MUSIC",
  "MUSIC EDUCATION",
  "MUSIC THERAPY",
  "NUCLEAR SCIENCE",
  "NUTRITION & FOOD SCIENCES",
  "OCEANOGRAPHY & COASTAL SCIENCE",
  "PATHOBIOLOGICAL SCIENCES",
  "PETROLEUM ENGINEERING",
  "PHILOSOPHY",
  "PHILOSOPHY & RELIGIOUS STUDIES",
  "PHYSICAL SCIENCE",
  "PHYSICS",
  "PLANT HEALTH",
  "POLITICAL SCIENCE",
  "PORTUGUESE",
  "POULTRY SCIENCE",
  "PSYCHOLOGY",
  "PUBLIC ADMINISTRATION",
  "RELIGIOUS STUDIES",
  "RENEWABLE NATURAL RESOURCES",
  "RUSSIAN",
  "SCIENCE",
  "SCREEN ARTS",
  "SOCIAL WORK",
  "SOCIOLOGY",
  "SPANISH",
  "SPEECH COMMUNICATION",
  "STUDENT SUPPORT SERVICES",
  "SWAHILI",
  "SYSTEMS SCIENCE",
  "TEXTILES,APPAREL & MERCHANDISI",
  "THEATRE",
  "UNIVERSITY",
  "UNIVERSITY COLLEGE",
  "UNIVERSITY STUDIES",
  "VETERINARY ANATOMY",
  "VETERINARY CLINICAL SCIENCES",
  "VETERINARY MEDICINE",
  "VETERINARY MICROBIOL & PARASIT",
  "VETERINARY PATHOLOGY",
  "VETERINARY PHYSIOL, PHARMAC &",
  "VETERINARY SCIENCE",
  "VOCATIONAL EDUCATION",
  "VOCATIONAL TRADE & IND ED",
  "WILDLIFE",
  "WOMEN'S AND GENDER STUDIES",
  "WOMEN'S, GENDER, & SEXUALITY S"
];
