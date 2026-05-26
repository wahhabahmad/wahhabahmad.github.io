import json

# Read the portfolio.json file
with open('portfolio.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Force add "UI/UX" tag to all games with category "Games"
updated_count = 0
for project in data['projects']:
    if project.get('category') == 'Games':
        tags = list(project.get('tags', []))
        # Always append UI/UX if not already present
        if 'UI/UX' not in tags:
            tags.append('UI/UX')
            project['tags'] = tags
            updated_count += 1
            print(f"+ {project.get('title')}")

# Write back to file
with open('portfolio.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'\nUpdated {updated_count} games')


