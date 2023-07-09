import requests
import json

def create_pokemon_profiles(num_profiles):
    base_url = "https://pokeapi.co/api/v2/pokemon"
    profiles = []

    for i in range(1, num_profiles + 1):
        url = f"{base_url}/{i}"
        response = requests.get(url)

        if response.status_code == 200:
            pokemon_data = response.json()
            name = pokemon_data['name']
            height = pokemon_data['height']
            weight = pokemon_data['weight']

            profile = {
                "name": name,
                "height": height,
                "weight": weight
            }

            profiles.append(profile)
        else:
            print(f"Failed to retrieve data for Pokemon #{i}")

    return profiles

num_profiles = 15
pokemon_profiles = create_pokemon_profiles(num_profiles)

file_name = input("Enter the file name (without extension): ")
file_path = f"{file_name}.json"

with open(file_path, "w") as file:
    json.dump(pokemon_profiles, file, indent=4)

print(f"Pokemon profiles saved to {file_path}.")
