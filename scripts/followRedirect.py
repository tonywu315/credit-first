import requests
from urllib.parse import urljoin, urlparse

url = "https://oc.brcclx.com/t?lid=26662740"

r = requests.get(url)
clean = urljoin(r.url, urlparse(r.url).path)
print(clean)
