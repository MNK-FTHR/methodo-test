#!/bin/bash

if [ $# -eq 0 ]; then
    py "./code/script.py"
    exit 1
fi
for var in "$@"
do
    cp -r "./tests/${var}.sh"
    sh "./tests/${var}.sh"
done