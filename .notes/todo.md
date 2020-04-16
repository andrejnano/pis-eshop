- [x] fix nginx reverse proxy resolver, not point to backend container
- [x] add healthcheck, visualize communication between FE <-> BE
- [x] add font-awesome
- [x] design & create layout
- [ ] create backend ***API spec***
- [x] create backend ***API routes***
- [x] create backend *Controllers*
- [x] create backend **Model** (DataModel)
- [ ] Make *Controllers* use **Model** <-> Database
- [ ] Fix production deployment pipeline: dont stop running production containers when rebuilding updated images.
- [x] add http2
- [x] add SSL/https
- [x] fix web-root volume not including built /app/dist files
- [ ] add charts to dashboard (d3.js or chartjs)
- [ ] remove unnecessary web-root directory, but still keep let's encrypt working inside docker-compose

User <-> Browser <-> Client-side web application (FE) <-> HTTP <-> API <-> Routes <-> Controllers <-> Model <-> Database
