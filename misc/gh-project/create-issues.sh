#!/bin/bash

# SET YOUR PROJECT NUMBER HERE
PROJECT_NUMBER=1
OWNER="@andrewkelly" # Use your GitHub username or organization name

INPUT_FILE="issues.csv"
if [ ! -f "$INPUT_FILE" ]; then
    echo "Error: File '$INPUT_FILE' not found."
    exit 1
fi

tail -n +2 "$INPUT_FILE" | while IFS=, read -r title body milestone; do
    clean_title=$(echo "$title" | sed 's/^"//;s/"$//')
    clean_body=$(echo "$body" | sed 's/^"//;s/"$//')
    clean_milestone=$(echo "$milestone" | sed 's/^"//;s/"$//')

    echo "Creating issue: '$clean_title'..."

    # Create the issue and capture its URL
    issue_url=$("/c/Program Files/GitHub CLI/gh.exe" issue create \
        --title "$clean_title" \
        --body "$clean_body" \
        --milestone "$clean_milestone")

    if [ -n "$issue_url" ]; then
        echo "Adding $issue_url to project #$PROJECT_NUMBER..."
        "/c/Program Files/GitHub CLI/gh.exe" project item-add $PROJECT_NUMBER --owner "$OWNER" --url "$issue_url"
    else
        echo "Failed to create issue: $clean_title"
    fi

    sleep 1
done

echo "🚀 All done!"