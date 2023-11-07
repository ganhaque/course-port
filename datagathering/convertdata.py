import csv
import json

csv_data = open("rawdata_comp_sci_spring.csv", "r")
reader = csv.reader(csv_data)

# Convert CSV data to JSON format
courses = []
for row in reader:
    course = {
        "available": int(row[0]),
        "enrollmentCount": int(row[1]),
        "abbreviation": row[2],
        "number": int(row[3]),
        "section": int(row[4]),
        "title": row[5].strip(),
        "creditHour": float(row[6]),
        "begin": row[7].split("-")[0],
        "end": row[7].split("-")[1],
        "days": "".join(row[8].strip().split(' ')),
        "roomNumber": int(row[9]),
        "building": row[10].strip(),
        "instructor": row[11].strip()
    }
    courses.append(course)

# Convert the list to a JSON string
json_string = json.dumps(courses, indent=4)
with open('converted_data_comp_sci_spring.json', 'w') as f:
    f.write(json_string)

print(json_string)
