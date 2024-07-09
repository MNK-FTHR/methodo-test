# "Date"        "Niveau"    "Allonge"   "Assis"     "SessionID"                             "formattedDate"
# "1618937885"  "2"         "True"      "True"      "ed73e2a7-8f8a-493c-9388-c7cc4714b0ad"  "20/04/2021"
import csv 
import os.path
fileToWrite="./code/EnregistrementUpdated.csv"
fields = ["Date","Niveau","Allonge","Assis","SessionID","formattedDate","serie"]
dataList = []
betterDataList = []
def dataToVariable():
    with open('smallerEnregistrement.csv') as file:
        reader = csv.DictReader(file, fieldnames=["Date", "Niveau", "Allonge", "Assis", "SessionID", "formattedDate"], quotechar='"', quoting=csv.QUOTE_ALL)
        next(reader)
        for row in reader:
            dataList.append(dict(row))

def addSerieAndVieToData():
    sorted_by_sessionid = sorted(dataList, key=lambda x: x['SessionID'])
    for i, data in enumerate(sorted_by_sessionid):
        data['Serie'] = "0"
    betterDataList.extend(sorted_by_sessionid)
    # session_ids = set()
    # for d in betterDataList:
    #     session_ids.add(d['SessionID'])
    # unique_session_ids = list(session_ids)
    # print([d for d in betterDataList if d['SessionID'] == unique_session_ids[0]])
    # for id in unique_session_ids:


if os.path.isfile('smallerEnregistrement.csv'):
    if os.path.exists(fileToWrite):
        os.remove(fileToWrite)
        print(f"{fileToWrite} supprimé.")
    dataToVariable()
    addSerieAndVieToData()
    with open(fileToWrite, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile, quotechar='"', quoting=csv.QUOTE_ALL)
        writer.writerow(fields)
        session_ids = set()
        for d in betterDataList:
            session_ids.add(d['SessionID'])
            unique_session_ids = list(session_ids)
            writer.writerow(list([d for d in betterDataList if d['SessionID'] == unique_session_ids[0]].values()))
        # for data in betterDataList:
else:
    print("Il n'y a pas de fichier Enregistrement.csv à lire pour moi :(")