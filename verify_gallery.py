from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})

        print("Navigating to localhost:5173...")
        try:
            page.goto("http://localhost:5173", timeout=60000)
        except Exception as e:
            print(f"Error navigating: {e}")
            browser.close()
            return

        # Wait for Gallery section (scroll down to find it)
        print("Waiting for page load...")
        time.sleep(5)

        # Scroll to gallery
        print("Scrolling to Gallery...")
        try:
            # Look for the Gallery Header
            gallery_header = page.locator("h2:has-text('GALERÍA')")
            gallery_header.wait_for(state="visible", timeout=10000)
            gallery_header.scroll_into_view_if_needed()
            print("Found Gallery section.")
        except Exception as e:
            print(f"Could not find Gallery section: {e}")
            page.screenshot(path="debug_not_found.png")
            # Continue anyway to check for toggle

        # Check for Theme Toggle
        print("Checking for Theme Toggle (Light Mode state '🌙')...")
        try:
            # In NeoNavBar, the button contains the emoji directly
            toggle_btn = page.get_by_role("button", name="🌙").first
            if toggle_btn.is_visible():
                print("Toggle button found!")
            else:
                print("Toggle button not visible, searching via class...")
                # Fallback: try finding by emoji text
                toggle_btn = page.locator("button:has-text('🌙')").first

            # Take Light Mode Screenshot
            print("Taking Light Mode screenshot...")
            time.sleep(2)
            page.screenshot(path="gallery_light_mode.png")

            # Click to toggle Dark Mode
            print("Clicking Toggle...")
            toggle_btn.click()

            # Wait for dark mode class on html
            print("Waiting for Dark Mode...")
            page.locator("html.dark").wait_for(state="attached", timeout=5000)

            # Verify sun icon appears
            print("Verifying Sun Icon...")
            sun_btn = page.locator("button:has-text('☀️')").first
            sun_btn.wait_for(state="visible")

            print("Taking Dark Mode screenshot...")
            time.sleep(2)
            page.screenshot(path="gallery_dark_mode.png")
            print("Dark Mode verified successfully.")

        except Exception as e:
            print(f"Error verifying Dark Mode: {e}")
            page.screenshot(path="debug_error.png")

        browser.close()

if __name__ == "__main__":
    run()
