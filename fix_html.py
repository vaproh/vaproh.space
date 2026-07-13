import os
import glob
import re

for file in glob.glob("*.html"):
    with open(file, "r") as f:
        content = f.read()
    
    # regex to find the button inside nav and move it out
    pattern = re.compile(r'(\s*<button class="theme-toggle".*?</button>)\s*(</nav>)', re.DOTALL)
    new_content = pattern.sub(r'\n      \2\1', content)
    
    with open(file, "w") as f:
        f.write(new_content)
    print(f"Updated {file}")
