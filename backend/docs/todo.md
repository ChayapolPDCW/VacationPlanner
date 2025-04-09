# TODO

Users/Chaya/Desktop/PROJECT/VacationPlanner


- [ ] [./backend/.env](./backend/.env)
    - [ ] Generate .env/SESSION_SECRET
    - [ ] Generate backend-related secrets
- [ ] Merge git commit
- [X] Organize route handlers into submodules [./backend/src/routes/router.js](./backend/src/routes/router.js)
- [X] Backend API path prefix `/api/*`
- [ ] Auth
    - [X] Check cookies `express-session` -- `isAuthenticated`
    - [ ] Ownership middleware
    - [ ] Apply the session middleware to the restricted APIs routes
    - [X] Successful Login redirects to Home
- [ ] Database
    - [ ] Joi schema validator
    - [ ] Backup utility -- export current database snapshot
- [ ] File management
    - [ ] Directory prefix
    - [ ] File system controller
        - [ ] Common directory
        - [ ] MIME validation
    - [ ] CRUD
- [X] Avatars
    - [X] Uploads
- [ ] Controller
- [X] Create updatePassword function
- [X] Check logout function
- [ ] Middleware ป้องการเข้าถึงโดยยังไม่ Login
    - [ ] Create plan
    - [ ] Create Journal
    - [ ] Profile
    - [ ] Edit profile
    - [ ] My plan
    - [ ] My bookmark
    - [ ] hamberger drop down ถ้ายังไม่ Login จะมี Login, Register ถ้า Login เเล้วจะมี My profile, Logout เเละเเสดง username ของคนที่ Login ข้างๆ บน Navbar
    - [ ] การ Like เเละ bookmark

- [ ] ผูก API create journal & upload รูป
- [ ] ผูก API Edit profile
    

- [ ] เเสดงข้อมูลหน้า plan ของตัวเอง
- [ ] เเสดงข้อมูลหน้า bookmark เป็น Plan ที่ user bookmark ไว้
- [ ] เเสดงข้อมูลหน้า Plan ตาม id ขอ Plan นั้น
- [ ] เพิ่ม condition ปุ่ม create journal (ปุ่มอยู่ใน Plan) ถ้า user คือเจ้าของของ plan
- [ ] เเสดงข้อมูลหน้า community โดยเเสดง Plan เรียงตาม Like
 
---

- [ ] Plan Ranking (not at this moment)
