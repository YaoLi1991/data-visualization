import csv
import json

class AirportData:
    def __init__(self, name, year=0, number=0):
        self.name = name
        self.year = year
        self.number = number

    def to_dict(self):
        return {
            'name': self.name,
            'year': self.year,
            'number': self.number
        }

class Airport:
    def __init__(self, name, stat):
        self.name = name
        self.stat = stat

    def to_dict(self):
        airport_dict = {'name':self.name}
        stat = self.stat
        airport_dict.update(stat)
        return airport_dict


def serialize_airport_data(airportdata):
    if isinstance(airportdata, AirportData):
        return airportdata.to_dict()

def serialize_airport(airport):
    if isinstance(airport, Airport):
        return airport.to_dict()
    
airport_volume_list = []
# Replace 'path/to/file.csv' with the actual path to your CSV file
with open('simple-airport-data.csv') as csv_file:
    csv_reader = csv.reader(csv_file)
    current_row_num = 0
    for row in csv_reader:
        current_row_num = current_row_num + 1
        if current_row_num > 5:
            row_data_list=row[0].split(';')
            if 'Bron: CBS' in row_data_list[0]:
                pass
            else:
                airport_data = AirportData(row_data_list[0],int(row_data_list[1].strip('"')),int(row_data_list[2].strip('"')))
                airport_volume_list.append(airport_data)

unique_airport_names=[]
airport_list = []
for airport_data in airport_volume_list:
    if(airport_data.name in unique_airport_names):
        found_airport = None
        for airport in airport_list:
          if airport.name == airport_data.name:
            found_airport = airport
            break
        stat = found_airport.stat
        stat[str(airport_data.year)] =airport_data.number
    else:
        unique_airport_names.append(airport_data.name)
        airport = Airport(airport_data.name, {str(airport_data.year) : airport_data.number})
        airport_list.append(airport)


# Convert array to JSON string
json_data = json.dumps(airport_list, default=serialize_airport)

# Specify the file path
file_path = 'output.json'

# Write JSON string to a file
with open(file_path, 'w') as file:
    file.write(json_data)