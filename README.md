# Bài thực hành 03 (N2) - Lập trình Web

- **Họ và tên:** Chu Hữu Lợi
- **Mã sinh viên:** B25DCTV051

## Cách chạy dự án
1. Vào thư mục `part-a-class` hoặc `part-b-hooks`.
2. Chạy lệnh `npm install` để cài đặt thư viện.
3. Chạy lệnh `npm run dev` để khởi động dự án.

## Đánh giá: Hooks giúp khắc phục thách thức của Class Component như thế nào?
- **Code ngắn gọn và dễ đọc hơn:** Không cần dùng `this`, không cần constructor để khởi tạo state hay bind các phương thức.
- **Tái sử dụng logic dễ dàng:** Custom Hooks (như `useFetch`, `useClock`) cho phép tách logic ra khỏi UI và tái sử dụng ở nhiều component khác nhau mà không cần cấu trúc phức tạp như Higher-Order Components.
- **Quản lý Lifecycle tập trung:** `useEffect` gom nhóm các logic liên quan (như componentDidMount, componentDidUpdate, componentWillUnmount) vào cùng một nơi, tránh việc logic của một tính năng bị phân tán ra nhiều phương thức lifecycle khác nhau.# ChuHuuLoi-B25DCTV051-TH3
