import csv
import json

class WildlifeDatabase:

    DATABASE_PATH = 'database/wildlife_occurrences.csv'

    @staticmethod
    def get_all_occurrences():
        occurrences = []

        with open(WildlifeDatabase.DATABASE_PATH, encoding="utf8") as file:
            reader = csv.DictReader(file, delimiter='\t')

            for row in reader:
                try:
                    if not row["decimalLatitude"] or not row["decimalLongitude"]:
                        continue

                    occurrences.append({
                        "species": row["scientificName"],
                        "lat": float(row["decimalLatitude"]),
                        "long": float(row["decimalLongitude"]),
                        "year": row["year"],
                        "country": row["countryCode"],
                        "status": row["occurrenceStatus"]
                    })
                except:
                    continue 

        return json.dumps(occurrences)