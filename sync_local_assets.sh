#!/bin/bash
# File: copy_extra_images.sh

# Adjust this to your Windows username
WIN_USER="shubh"  

SRC="/mnt/c/Users/$WIN_USER/Desktop/Images"
DEST="$(pwd)/src/assets"

# Create destination if missing
mkdir -p "$DEST"

# Copy only files that don't already exist
rsync -av --ignore-existing "$SRC/" "$DEST/"

echo "✅ Sync complete. Extra files copied from Desktop Images to $DEST"
