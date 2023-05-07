import csv

class AirportData:
    def __init__(self, name, year=0, number=0):
        self.name = name
        self.year = year
        self.number = number

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
                airport_data = AirportData(row_data_list[0],row_data_list[1],row_data_list[2])
                print(airport_data.name)
                airport_volume_list.append(airport_data)

print(airport_volume_list[0].name)
print(airport_volume_list[0].year)
print(airport_volume_list[0].number)