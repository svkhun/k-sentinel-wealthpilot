import uvicorn
import webbrowser
import threading
import time

def open_browser():
    time.sleep(1.5)
    print("\n[Browser] Opening K-Sentinel & WealthPilot Platform in your default browser...")
    webbrowser.open("http://localhost:8000")

if __name__ == "__main__":
    print("==================================================================")
    print("  K-Sentinel & WealthPilot | K PLUS Enterprise Platform")
    print("  KBTG Kampus Hackathon 2026 — Track 2: Data Science & Intelligence")
    print("==================================================================")
    print("Starting FastAPI Engine & Modern Web Application on http://localhost:8000 ...")
    
    # Auto-open browser in background thread
    threading.Thread(target=open_browser, daemon=True).start()
    
    # Run FastAPI server
    uvicorn.run("src.app_v2:app", host="127.0.0.1", port=8000, reload=True)
