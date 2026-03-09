import urllib.request

# Download a generic flow chart diagram and save it as diagram.jpg
def download_diagram():
    url = "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop"
    urllib.request.urlretrieve(url, "diagram.jpg")
    print("diagram.jpg created")

if __name__ == "__main__":
    download_diagram()
