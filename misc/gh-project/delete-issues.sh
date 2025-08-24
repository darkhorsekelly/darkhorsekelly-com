#!/bin/bash

# This script deletes all open and closed issues in the current repository.
# It is irreversible. Use with extreme caution.

echo "Fetching all issue numbers for this repository..."

# Get a list of all issue numbers (open and closed)
ISSUE_NUMBERS=$("/c/Program Files/GitHub CLI/gh.exe" issue list --state all --limit 2000 --json number --jq '.[].number')

# Check if there are any issues to delete
if [ -z "$ISSUE_NUMBERS" ]; then
  echo "No issues found in this repository."
  exit 0
fi

echo "The following issues will be permanently deleted:"
echo $ISSUE_NUMBERS
echo ""
read -p "Are you sure you want to continue? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
  for ISSUE_NUMBER in $ISSUE_NUMBERS; do
    echo "Deleting issue #$ISSUE_NUMBER..."
    "/c/Program Files/GitHub CLI/gh.exe" issue delete $ISSUE_NUMBER --yes
  done
  echo "✅ All issues have been deleted."
else
  echo "Operation cancelled."
fi