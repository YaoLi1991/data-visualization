import requests

r=requests.get("https://dataderden.cbs.nl/ODataApi/odata/24114NED/UntypedDataSet?$filter=((Perioden+eq+%272021SJ00%27))+and+((RegioS+eq+%27NL01++%27))&$select=Opleidingsvorm,+Opleiding,+Perioden,+RegioS,+GediplomeerdenWo_1").json()
list = r["value"]
non_healthcare = "A049845"
healthcare = "A049844"
for item in list:
    if item["Opleiding"] == non_healthcare:
        print(item)
        


