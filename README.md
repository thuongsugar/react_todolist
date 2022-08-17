# Ứng dụng Todo List

Ứng dụng **Todo List** sử dụng cho lưu trữ, lập lịch công việc, hàng ngày, hàng tuần, hàng tháng. Phục vụ cho công việc cá nhân hoặc công việc nhóm.

Ứng dụng **Todo List** sử dụng **ReactJs** làm giao diện lấy thiết kế thành phần từ **Antd** và **FireBase** để lưu trữ dữ liệu, xác thực người dùng

## Tính năng trên ứng dụng

### Về người dùng

_1.Đăng nhập:_

    Để sử dụng, người dùng phải tiến hành đăng ký hoặc đăng nhập, người dùng có thể sử dụng email không có thật để tạo tải khoản

_2.Thay đổi thông tin_

    Khi đăng nhập thành công, người dùng có thể thay đổi tên người dùng(userName), thay đổi địa chỉ(email), thay đổi mật khẩu(passWord).

_3.Thêm Todo List_

    Khi đăng nhập thành công, người sử dụng có thể thêm công việc lên lịch cho chính mình(từ ngày hiện tại trở đi), có thể chỉnh sửa(chỉ áp dụng khi chưa quá thời gian đã lên lịch), đánh dấu hoàn thành công việc, xóa công việc(chỉ áp dụng cho công việc đã hoàn thành), thông kê tất cả công việc, công việc đã hoàn thành, công việc chưa hoàn thành, xem được công việc trong quá khứ.

_4.Đăng xuất_

    Thao tác này sẽ xóa thông tin xác thực trên máy người dùng, khi trở lại người dùng sẽ phải đăng nhập lại.

### Về Group

_1.Thêm nhóm_

    Người dùng đã xác thực có thể tạo mới một nhóm, người tạo sẽ được chỉ định là chủ nhóm(admin),

_2.Xóa nhóm_

    Chỉ áp dụng cho người tạo ra nhóm(admin)

_3.Thêm thành viên_

    Áp dụng cho tất cả thành viên trong nhóm, người nào được thêm sẽ không thêm được lần 2(pending) cho đến khi hủy tham gia nhóm

_4.Hiển thị thành viên_

    Sẽ hiển thị tất cả thành viên có trong nhóm, nếu là thành viên có thể rời khỏi nhóm, nếu là chủ nhóm(admin) có thể xóa thành viên nhóm, chủ nhóm không thể rời nhóm

_5.Đổi tên nhóm_

    Áp dụng cho mọi thành viên trong nhóm

_6.Thêm Todo List_

    Tất cả thành viên có mọi thao tác như một người dùng, khi thêm mới một công việc sẽ hiện thị ai là người thêm

## Sử dụng

    git clone https://github.com/thuongsugar/react_todolist.git

#

    cd react_todolist

#

    npm start

## Tài liệu sử dụng

Trang chủ [React](https://reactjs.org/), [StackOverflow](https://stackoverflow.com/), [Youtube](https://youtube.com/), [Ant Design](https://ant.design/), [FireBase](https://firebase.google.com/)
