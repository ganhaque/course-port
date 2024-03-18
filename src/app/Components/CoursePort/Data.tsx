/* import data from './booklet.json'; */
import data from "../../../../data/booklet.json"


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
  begin: number | "?";
  end: number | "?";
  duration: number | "?";
  days: string;
  roomNumber?: string;
  building?: string;
  instructor?: string;
  specialEnrollment?: string;
  lab?: {
    type: string;
    begin: number | "?";
    end: number | "?";
    duration: number | "?";
    days: string;
    roomNumber?: string;
    building?: string;
    instructor?: string;
  }
  /* picked?: boolean; */
}

export interface Database {
  [semesterTitle: string]: {
    [departmentTitle: string]: Course[];
  };
}

export const bookletData = data as Database;
/* const accountingCourses: Course[] | undefined = bookletData['Spring 2024']['COMPUTER SCIENCE']; */
/* if (accountingCourses) { */
/*   console.log(accountingCourses); */
/*   if (accountingCourses) { */
/*     const firstCourse: Course | undefined = accountingCourses[0]; */
/*     if (firstCourse) { */
/*       console.log(firstCourse.title); */
/*     } */
/*   } */
/* } */
/* export const database: Database = data; */
/* export const database = (data as Database); */

/* 7:00 AM to 9:00 PM */

export const timeIntervals = [
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
];

export const timeStringToMinutes: { [time: string]: number } = {
  /* '6:00 AM': 360, */
  /* '6:30 AM': 390, */
  '7:00 AM': 420,
  '7:30 AM': 450,
  '8:00 AM': 480,
  '8:30 AM': 510,
  '9:00 AM': 540,
  '9:30 AM': 570,
  '10:00 AM': 600,
  '10:30 AM': 630,
  '11:00 AM': 660,
  '11:30 AM': 690,
  '12:00 PM': 720,
  '12:30 PM': 750,
  '1:00 PM': 780,
  '1:30 PM': 810,
  '2:00 PM': 840,
  '2:30 PM': 870,
  '3:00 PM': 900,
  '3:30 PM': 930,
  '4:00 PM': 960,
  '4:30 PM': 990,
  '5:00 PM': 1020,
  '5:30 PM': 1050,
  '6:00 PM': 1080,
  '6:30 PM': 1110,
  '7:00 PM': 1140,
  '7:30 PM': 1170,
  '8:00 PM': 1200,
  '8:30 PM': 1230,
  '9:00 PM': 1260
};

export const initialDays = {
  "Monday": true,
  "Tuesday": true,
  "Wednesday": true,
  "Thursday": true,
  "Friday": true,
};

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

/* export const semesters = [ */
/*   "Spring 2024", */
/*   "Fall 2023", */
/*   "Spring 2023", */
/*   "Fall 2022", */
/*   "Spring 2022", */
/*   "Fall 2021", */
/*   "Spring 2021", */
/*   "Fall 2020", */
/*   "Spring 2020", */
/*   "Fall 2019", */
/*   "Spring 2019", */
/*   "Fall 2018", */
/*   "Spring 2018", */
/*   "Fall 2017", */
/*   "Spring 2017", */
/*   "Fall 2016", */
/*   "Spring 2016", */
/*   "Fall 2015", */
/*   "Spring 2015", */
/*   "Fall 2014", */
/*   "Spring 2014", */
/*   "Fall 2013", */
/*   "Spring 2013", */
/*   "Fall 2012", */
/*   "Spring 2012", */
/*   "Fall 2011", */
/*   "Spring 2011", */
/*   "Fall 2010", */
/*   "Spring 2010", */
/*   "Fall 2009" */
/* ]; */
/**/
/* export const departmentToAbbreviationMap: { [department: string]: string } = { */
/*   "ACCOUNTING": "ACCT", */
/*   "ADMINISTRATIVE & FOUNDATION SE": "", */
/*   "AEROSPACE STUDIES": "ASST", */
/*   "AFRICAN & AFRICAN-AMERICAN STU": "AAAS", */
/*   "AGRIC EDUCATION": "", */
/*   "AGRIC & EXTENSION ED & EVALUAT": "AEEE", */
/*   "AGRICULTURAL ECONOMICS": "AGEC", */
/*   "AGRICULTURAL ECONOMICS & AGRIB": "", */
/*   "AGRICULTURE": "AGRI", */
/*   "AGRI, EXTENSION & ADULT EDUCAT": "", */
/*   "AGRONOMY": "AGRO", */
/*   "AMERICAN SIGN LANGUAGE": "ASLG", */
/*   "ANIMAL SCIENCES": "ANSC", */
/*   "ANTHROPOLOGY": "ANTH", */
/*   "ARABIC": "ARAB", */
/*   "ARCHITECTURE": "ARCH", */
/*   "ART": "ART", */
/*   "ART HISTORY": "ARTH", */
/*   "ASTRONOMY": "ASTR", */
/*   "ATHLETIC TRAINING": "ATRN", */
/*   "AUDIO-VISUAL ARTS": "", */
/*   "BASIC SCIENCES": "", */
/*   "BIOLOGICAL ENGINEERING": "BE", */
/*   "BIOLOGICAL SCIENCES": "BIOL", */
/*   "BUSINESS ADMINISTRATION": "BADM", */
/*   "BUSINESS EDUCATION": "", */
/*   "BUSINESS LAW": "BLAW", */
/*   "CHEMICAL ENGINEERING": "CHE", */
/*   "CHEMISTRY": "CHEM", */
/*   "CHILD AND FAMILY STUDIES": "CFS", */
/*   "CHINESE": "CHIN", */
/*   "CIVIL ENGINEERING": "CE", */
/*   "CIVIL & ENVIRONMENTAL ENGINEER": "", */
/*   "CLASSICAL STUDIES": "CLST", */
/*   "COMMUNICATION DISORDERS": "COMD", */
/*   "COMMUNICATION STUDIES": "CMST", */
/*   "COMPARATIVE BIOMEDICAL SCIENCE": "CBS", */
/*   "COMPARATIVE LITERATURE": "CPLT", */
/*   "COMPUTER SCIENCE": "CSC", */
/*   "CONSTRUCTION MANAGEMENT": "CM", */
/*   "CURRICULUM & INSTRUCTION": "EDCI", */
/*   "DAIRY SCIENCE": "", */
/*   "DIGITAL MEDIA ARTS & ENGINEERI": "DMAE", */
/*   "DISASTER SCIENCE MANAGEMENT": "", */
/*   "DOCTOR OF DESIGN": "DART", */
/*   "ECONOMICS": "ECON", */
/*   "EDUC LEADERSHIP RESEARCH COUNS": "ELRC", */
/*   "EDUCATION": "EDUC", */
/*   "ELECTRICAL ENGINEERING": "EE", */
/*   "ENGINEERING": "ENGR", */
/*   "ENGLISH": "ENGL", */
/*   "ENTOMOLOGY": "ENTM", */
/*   "ENTREPRENEURSHIP": "ENTR", */
/*   "ENVIRONMENTAL ENGINEERING": "EVEG", */
/*   "ENVIRONMENTAL MANAGEMENT SYSTE": "EMS", */
/*   "ENVIRONMENTAL SCIENCES": "ENVS", */
/*   "ENVIRONMENTAL STUDIES": "", */
/*   "EPIDEMIOLOGY & COMMUNITY HEALT": "", */
/*   "EXPERIMENTAL STATISTICS": "EXST", */
/*   "EXTENSION EDUCATION": "", */
/*   "FILM & MEDIA ARTS": "", */
/*   "FINANCE": "FIN", */
/*   "FISHERIES": "", */
/*   "FOOD SCIENCE": "", */
/*   "FORESTRY": "", */
/*   "FRENCH": "FREN", */
/*   "FRENCH STUDIES": "", */
/*   "FRESHMAN FORUM": "", */
/*   "FRESHMAN SEMINAR": "", */
/*   "GENERAL BUSINESS": "GBUS", */
/*   "GEOGRAPHY": "GEOG", */
/*   "GEOLOGY": "GEOL", */
/*   "GERMAN": "GERM", */
/*   "GRADUATE SCHOOL": "GRAD", */
/*   "GREEK": "GREK", */
/*   "HEBREW": "HEBR", */
/*   "HISTORY": "HIST", */
/*   "HOME ECON EDUC": "", */
/*   "HONORS": "HNRS", */
/*   "HORTICULTURE": "HORT", */
/*   "HOW TO DO LSU": "", */
/*   "HUMAN ECOLOGY": "", */
/*   "HUMAN RESOURCE EDUCATION": "", */
/*   "HUMAN SCIENCES & EDUCATION": "HSE", */
/*   "HUMANITIES": "", */
/*   "HUMANITIES AND SOCIAL SCIENCES": "HSS", */
/*   "INDUSTRIAL EDUCATION": "", */
/*   "INDUSTRIAL ENGINEERING": "IE", */
/*   "INDUSTRIAL TECHNOLOGY": "", */
/*   "INDUSTRIAL & MANUFACTUR ENGINE": "", */
/*   "INFO SYSTEMS AND DECISION SCIE": "ISDS", */
/*   "INFORMATION STUDIES": "LIS", */
/*   "INTERIOR DESIGN": "ID", */
/*   "INTERNATIONAL STUDIES": "INTL", */
/*   "ITALIAN": "ITAL", */
/*   "JAPANESE": "", */
/*   "JUNIOR DIVISION": "", */
/*   "KINESIOLOGY": "KIN", */
/*   "LANDSCAPE ARCHITECTURE": "LA", */
/*   "LATIN": "LATN", */
/*   "LEADERSHIP & HUMAN RESOURCES D": "LHRD", */
/*   "LIBERAL ARTS": "LIBA", */
/*   "LIBRARY & INFORMATION SCIENCE": "", */
/*   "LIFE COURSE AND AGING": "", */
/*   "LIFE COURSE IN AGING": "", */
/*   "LINGUISTICS": "LING", */
/*   "MANAGEMENT": "MGT", */
/*   "MARKETING": "MKT", */
/*   "MASS COMMUNICATION": "MC", */
/*   "MATHEMATICS": "MATH", */
/*   "MECHANICAL ENGINEERING": "ME", */
/*   "MEDICAL PHYSICS": "MEDP", */
/*   "MILITARY SCIENCE": "MILS", */
/*   "MUSIC": "MUS", */
/*   "MUSIC EDUCATION": "MUED", */
/*   "MUSIC THERAPY": "", */
/*   "NUCLEAR SCIENCE": "NS", */
/*   "NUTRITION & FOOD SCIENCES": "NFS", */
/*   "OCEANOGRAPHY & COASTAL SCIENCE": "OCS", */
/*   "PATHOBIOLOGICAL SCIENCES": "PBS", */
/*   "PETROLEUM ENGINEERING": "PETE", */
/*   "PHILOSOPHY": "PHIL", */
/*   "PHILOSOPHY & RELIGIOUS STUDIES": "", */
/*   "PHYSICAL SCIENCE": "PHSC", */
/*   "PHYSICS": "PHYS", */
/*   "PLANT HEALTH": "PLHL", */
/*   "POLITICAL SCIENCE": "POLI", */
/*   "PORTUGUESE": "", */
/*   "POULTRY SCIENCE": "", */
/*   "PSYCHOLOGY": "", */
/*   "PUBLIC ADMINISTRATION": "PADM", */
/*   "RELIGIOUS STUDIES": "REL", */
/*   "RENEWABLE NATURAL RESOURCES": "RNR", */
/*   "RUSSIAN": "", */
/*   "SCIENCE": "SCI", */
/*   "SCREEN ARTS": "SCRN", */
/*   "SOCIAL WORK": "SW", */
/*   "SOCIOLOGY": "SOCL", */
/*   "SPANISH": "SPAN", */
/*   "SPEECH COMMUNICATION": "", */
/*   "STUDENT SUPPORT SERVICES": "SSS", */
/*   "SWAHILI": "", */
/*   "SYSTEMS SCIENCE": "", */
/*   "TEXTILES,APPAREL & MERCHANDISI": "TAM", */
/*   "THEATRE": "THTR", */
/*   "UNIVERSITY": "", */
/*   "UNIVERSITY COLLEGE": "", */
/*   "UNIVERSITY STUDIES": "UNST", */
/*   "VETERINARY ANATOMY": "", */
/*   "VETERINARY CLINICAL SCIENCES": "VCS", */
/*   "VETERINARY MEDICINE": "VMED", */
/*   "VETERINARY MICROBIOL & PARASIT": "", */
/*   "VETERINARY PATHOLOGY": "", */
/*   "VETERINARY PHYSIOL, PHARMAC &": "", */
/*   "VETERINARY SCIENCE": "", */
/*   "VOCATIONAL EDUCATION": "", */
/*   "VOCATIONAL TRADE & IND ED": "", */
/*   "WILDLIFE": "", */
/*   "WOMEN'S AND GENDER STUDIES": "", */
/*   "WOMEN'S, GENDER, & SEXUALITY S": "WGS" */
/* }; */
/**/
/* export const departments = [ */
/*   "ACCOUNTING", */
/*   "ADMINISTRATIVE & FOUNDATION SE", */
/*   "AEROSPACE STUDIES", */
/*   "AFRICAN & AFRICAN-AMERICAN STU", */
/*   "AGRIC EDUCATION", */
/*   "AGRIC & EXTENSION ED & EVALUAT", */
/*   "AGRICULTURAL ECONOMICS", */
/*   "AGRICULTURAL ECONOMICS & AGRIB", */
/*   "AGRICULTURE", */
/*   "AGRI, EXTENSION & ADULT EDUCAT", */
/*   "AGRONOMY", */
/*   "AMERICAN SIGN LANGUAGE", */
/*   "ANIMAL SCIENCES", */
/*   "ANTHROPOLOGY", */
/*   "ARABIC", */
/*   "ARCHITECTURE", */
/*   "ART", */
/*   "ART HISTORY", */
/*   "ASTRONOMY", */
/*   "ATHLETIC TRAINING", */
/*   "AUDIO-VISUAL ARTS", */
/*   "BASIC SCIENCES", */
/*   "BIOLOGICAL ENGINEERING", */
/*   "BIOLOGICAL SCIENCES", */
/*   "BUSINESS ADMINISTRATION", */
/*   "BUSINESS EDUCATION", */
/*   "BUSINESS LAW", */
/*   "CHEMICAL ENGINEERING", */
/*   "CHEMISTRY", */
/*   "CHILD AND FAMILY STUDIES", */
/*   "CHINESE", */
/*   "CIVIL ENGINEERING", */
/*   "CIVIL & ENVIRONMENTAL ENGINEER", */
/*   "CLASSICAL STUDIES", */
/*   "COMMUNICATION DISORDERS", */
/*   "COMMUNICATION STUDIES", */
/*   "COMPARATIVE BIOMEDICAL SCIENCE", */
/*   "COMPARATIVE LITERATURE", */
/*   "COMPUTER SCIENCE", */
/*   "CONSTRUCTION MANAGEMENT", */
/*   "CURRICULUM & INSTRUCTION", */
/*   "DAIRY SCIENCE", */
/*   "DIGITAL MEDIA ARTS & ENGINEERI", */
/*   "DISASTER SCIENCE MANAGEMENT", */
/*   "DOCTOR OF DESIGN", */
/*   "ECONOMICS", */
/*   "EDUC LEADERSHIP RESEARCH COUNS", */
/*   "EDUCATION", */
/*   "ELECTRICAL ENGINEERING", */
/*   "ENGINEERING", */
/*   "ENGLISH", */
/*   "ENTOMOLOGY", */
/*   "ENTREPRENEURSHIP", */
/*   "ENVIRONMENTAL ENGINEERING", */
/*   "ENVIRONMENTAL MANAGEMENT SYSTE", */
/*   "ENVIRONMENTAL SCIENCES", */
/*   "ENVIRONMENTAL STUDIES", */
/*   "EPIDEMIOLOGY & COMMUNITY HEALT", */
/*   "EXPERIMENTAL STATISTICS", */
/*   "EXTENSION EDUCATION", */
/*   "FILM & MEDIA ARTS", */
/*   "FINANCE", */
/*   "FISHERIES", */
/*   "FOOD SCIENCE", */
/*   "FORESTRY", */
/*   "FRENCH", */
/*   "FRENCH STUDIES", */
/*   "FRESHMAN FORUM", */
/*   "FRESHMAN SEMINAR", */
/*   "GENERAL BUSINESS", */
/*   "GEOGRAPHY", */
/*   "GEOLOGY", */
/*   "GERMAN", */
/*   "GRADUATE SCHOOL", */
/*   "GREEK", */
/*   "HEBREW", */
/*   "HISTORY", */
/*   "HOME ECON EDUC", */
/*   "HONORS", */
/*   "HORTICULTURE", */
/*   "HOW TO DO LSU", */
/*   "HUMAN ECOLOGY", */
/*   "HUMAN RESOURCE EDUCATION", */
/*   "HUMAN SCIENCES & EDUCATION", */
/*   "HUMANITIES", */
/*   "HUMANITIES AND SOCIAL SCIENCES", */
/*   "INDUSTRIAL EDUCATION", */
/*   "INDUSTRIAL ENGINEERING", */
/*   "INDUSTRIAL TECHNOLOGY", */
/*   "INDUSTRIAL & MANUFACTUR ENGINE", */
/*   "INFO SYSTEMS AND DECISION SCIE", */
/*   "INFORMATION STUDIES", */
/*   "INTERIOR DESIGN", */
/*   "INTERNATIONAL STUDIES", */
/*   "ITALIAN", */
/*   "JAPANESE", */
/*   "JUNIOR DIVISION", */
/*   "KINESIOLOGY", */
/*   "LANDSCAPE ARCHITECTURE", */
/*   "LATIN", */
/*   "LEADERSHIP & HUMAN RESOURCES D", */
/*   "LIBERAL ARTS", */
/*   "LIBRARY & INFORMATION SCIENCE", */
/*   "LIFE COURSE AND AGING", */
/*   "LIFE COURSE IN AGING", */
/*   "LINGUISTICS", */
/*   "MANAGEMENT", */
/*   "MARKETING", */
/*   "MASS COMMUNICATION", */
/*   "MATHEMATICS", */
/*   "MECHANICAL ENGINEERING", */
/*   "MEDICAL PHYSICS", */
/*   "MILITARY SCIENCE", */
/*   "MUSIC", */
/*   "MUSIC EDUCATION", */
/*   "MUSIC THERAPY", */
/*   "NUCLEAR SCIENCE", */
/*   "NUTRITION & FOOD SCIENCES", */
/*   "OCEANOGRAPHY & COASTAL SCIENCE", */
/*   "PATHOBIOLOGICAL SCIENCES", */
/*   "PETROLEUM ENGINEERING", */
/*   "PHILOSOPHY", */
/*   "PHILOSOPHY & RELIGIOUS STUDIES", */
/*   "PHYSICAL SCIENCE", */
/*   "PHYSICS", */
/*   "PLANT HEALTH", */
/*   "POLITICAL SCIENCE", */
/*   "PORTUGUESE", */
/*   "POULTRY SCIENCE", */
/*   "PSYCHOLOGY", */
/*   "PUBLIC ADMINISTRATION", */
/*   "RELIGIOUS STUDIES", */
/*   "RENEWABLE NATURAL RESOURCES", */
/*   "RUSSIAN", */
/*   "SCIENCE", */
/*   "SCREEN ARTS", */
/*   "SOCIAL WORK", */
/*   "SOCIOLOGY", */
/*   "SPANISH", */
/*   "SPEECH COMMUNICATION", */
/*   "STUDENT SUPPORT SERVICES", */
/*   "SWAHILI", */
/*   "SYSTEMS SCIENCE", */
/*   "TEXTILES,APPAREL & MERCHANDISI", */
/*   "THEATRE", */
/*   "UNIVERSITY", */
/*   "UNIVERSITY COLLEGE", */
/*   "UNIVERSITY STUDIES", */
/*   "VETERINARY ANATOMY", */
/*   "VETERINARY CLINICAL SCIENCES", */
/*   "VETERINARY MEDICINE", */
/*   "VETERINARY MICROBIOL & PARASIT", */
/*   "VETERINARY PATHOLOGY", */
/*   "VETERINARY PHYSIOL, PHARMAC &", */
/*   "VETERINARY SCIENCE", */
/*   "VOCATIONAL EDUCATION", */
/*   "VOCATIONAL TRADE & IND ED", */
/*   "WILDLIFE", */
/*   "WOMEN'S AND GENDER STUDIES", */
/*   "WOMEN'S, GENDER, & SEXUALITY S" */
/* ]; */
