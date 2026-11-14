from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import subprocess, re
class Scan(HTMLParser):
 def __init__(self): super().__init__(); self.links=[]; self.ids=[]; self.h1=0
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs)
  if 'id' in attrs: self.ids.append(attrs['id'])
  if tag=='h1': self.h1+=1
  for key in ['href','src']:
   if key in attrs:self.links.append(attrs[key])
files=list(Path('.').glob('*.html')); scans={}
for file in files:
 text=file.read_text(encoding='utf-8-sig');file.write_text('\n'.join(line.rstrip() for line in text.splitlines())+'\n',encoding='utf-8',newline='\n')
 scan=Scan();scan.feed(text);scans[file.name]=scan
errors=[]
for name,scan in scans.items():
 if scan.h1!=1:errors.append((name,'h1 count',scan.h1))
 if len(scan.ids)!=len(set(scan.ids)):errors.append((name,'duplicate IDs'))
 for link in scan.links:
  u=urlsplit(link)
  if u.scheme or u.netloc:continue
  target=u.path or name
  if not Path(target).exists():errors.append((name,'missing',target))
  if u.fragment and target in scans and u.fragment not in scans[target].ids:errors.append((name,'missing anchor',link))
print('Pages:',len(files),'Errors:',errors)
assert not errors
old=subprocess.check_output(['git','show','HEAD:privacy-policy.html'],text=True,encoding='utf-8')
new=Path('privacy-policy.html').read_text(encoding='utf-8')
for section in re.findall(r'<section\b[^>]*>.*?</section>',old,re.S):
 assert re.sub(r'\s+',' ',section).strip() in re.sub(r'\s+',' ',new),'Legal content changed'
print('Existing legal sections preserved.')
