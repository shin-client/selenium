const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const config = require('./config'); // Import file config

(async function loginFacebook() {
    // Cấu hình Chrome chạy headless
    let options = new chrome.Options();
    options.addArguments('--headless'); // Chạy không giao diện
    options.addArguments('--no-sandbox'); // Cần thiết cho Codespaces
    options.addArguments('--disable-dev-shm-usage'); // Tránh lỗi bộ nhớ
    options.addArguments('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Tạo WebDriver
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Mở trang Facebook
        await driver.get('https://www.facebook.com');

        // Điền email/số điện thoại từ config
        await driver.findElement(By.id('email')).sendKeys(config.facebook.email);

        // Điền mật khẩu từ config
        await driver.findElement(By.id('pass')).sendKeys(config.facebook.password);

        // Nhấn nút đăng nhập
        await driver.findElement(By.name('login')).click();

        // Chờ một chút để trang tải
        await driver.sleep(5000);

        // Lấy tiêu đề trang sau khi đăng nhập
        let title = await driver.getTitle();
        console.log('Tiêu đề trang sau đăng nhập:', title);

    } catch (error) {
        console.error('Lỗi:', error);
    } finally {
        // Đóng trình duyệt
        await driver.quit();
    }
})();