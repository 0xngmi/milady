"""
File averaging script - outputs a file formed by the mode of all files passed
in as arguments.

Usage:

python3 extract.py [OUTPUT_FILE] [INPUT_FILES]
"""

import os
import sys

from collections import Counter

outfile = sys.argv[1]
files = [open(f, "rb") for f in sys.argv[2:]]
no_bytes = 0

with open(outfile, "wb") as out:
    print("Writing to", out.name, "from averages of", len(files), "files.")
    while True:
        source_bytes = (f.read(1) for f in files)
        # This returns [(byte, no_occurences)], and we only want the byte
        next_byte = Counter(source_bytes).most_common(1)[0][0]
        if next_byte == b'':
            print("Finished!", no_bytes, "written.")
            break
        out.write(next_byte)
        no_bytes += 1
