#!/bin/bash
echo "Bash version ${BASH_VERSION}..."
for run in {1..31}
do
  time sh run_with_exit.sh
done