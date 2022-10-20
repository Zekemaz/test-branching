#!/bin/sh

originalbranch=$@
commandoutput=$(git branch -r --merged origin/develop $originalbranch)

if [ $commandoutput != "origin/feature/fifth-feature" ]; then
  exit 1
#  refuse PR
else
  exit 0
fi