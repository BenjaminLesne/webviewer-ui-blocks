#!/bin/bash
set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <iterations>"
    exit 1
fi

for ((i=1; i<=$1; i++)); do
    echo "Iteration $i"
    echo "--------------------------------"
    result=$(docker sandbox run claude --permission-mode acceptEdits -p "@ai/ralph/prd.json @ai/ralph/progress.txt \
1. Find the highest-priority feature to work on and work only on that feature. \
2. Check that the types check via npm typecheck, the lint via npm run lint and tests pass via npm test. \
3. Update the PRD with the work that was done. \
4. Append your progress to the progress.txt file. \
Use this to leave a note for the next person working in the codebase. \
5. Make a git commit of that feature. \
ONLY WORK ON A SINGLE FEATURE. \
If, while implementing the feature, you notice the PRD is complete, output <promise>COMPLETE</promise>. \
")

    echo "$result"

    if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
        echo "PRD is complete, exiting."
        echo "Ralph finished after $i iterations!"
        exit 0
    fi

done