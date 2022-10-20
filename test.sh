#!/bin/sh

originalbranch=$@
commandoutput=$(git branch -r --merged origin/develop $originalbranch)

if [ "$commandoutput" != "origin/feature/fifth-feature" ]; then
  echo "PR not allowed"
  exit 1
#  refuse PR
else
  echo "PR allowed"
  exit 0
fi