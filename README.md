<div align="center">
<a href="https://github.com/phuongngo0320/hcmut-ssps">
    <img src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoatoi.png" alt="Logo">
  </a>
</div>
  
# Assignment HCMUT Smart Student Printing Service

## About
This project aim to provide a web services for printing in Ho Chi Minh University of Technology(HCMUT).
For assigment in Software Engineering(CO3001)

## Repository:
- FrontEnd: https://github.com/Kiet0712/HCMUT-SSPS
- Backend: https://github.com/trongvan245/HCMUT_SSPS_BE

## Other Link:
- Backend Swagger API: http://103.82.133.50:4000/api
- Figma Design: https://www.figma.com/design/IqxkrbWqTxGph3zQOLBewT/SSPS-Figma?node-id=0-1  

## Techstack 
- FrontEnd: [Next.js](https://nextjs.org/), [Flow-bite](https://flowbite.com/), [Shadcn-UI](https://ui.shadcn.com/), [Vite](https://vite.dev/)
- Backend: [NestJs](https://nestjs.com/), [Prisma](https://www.prisma.io/), [SwaggerAPI](https://swagger.io/), [PM2](https://pm2.keymetrics.io/), PostgresQL, Docker

## Member
-	Đặng Vũ Tuấn Kiệt - 2211743
-	Bùi Trọng Văn - 2213915
- Bùi Văn Quốc Bảo - 2210192
- Đặng Hoàng Khang - 2211422
- Đặng Ngọc Bảo Trâm - 2213568

<p align="right">(<a href="#readme-top">back to top</a>)</p> 

## How to setup
### Prerequisite
- Node version(up to date)
- NestJS
- NPM for package managament

### How to run
```
# Clone repository
git clone https://github.com/trongvan245/HCMUT_SSPS_BE.git

# Install packages
cd ./HCMUT_SSPS_BE
npm install

# Development and Deployment
npm run start:dev

npm run build
pm2 start dist/main.js --name ssps-api
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Document
Material for this assignment are provided in ./document

Content are: 
- Usecase Diagram
- Activity Diagram
- Sequence Diagram
- Class Diagram
- Architecture Design
- Report


## Contact
Feedbacks, issues report, or new features are welcome to this repository. Feel free to add PR or contact us.

## References


1. Sommerville, I. (2016). Software Engineering 10th Edition. Boston: Pearson Education Limited.

2. Thinh, N. H. P. (2019). _Use Case Diagram và 5 sai lầm thường gặp_.
Retrieved from Thinhnotes: https://thinhnotes.com/chuyen-nghe-ba/use-case-diagram-va-5-sai-lam-thuong-gap

3. Thinh, N. H. P. (2019). _Viết đặc tả Use Case sao đơn giản nhưng hiệu quả?_
Retrieved from Thinhnotes: https://thinhnotes.com/chuyen-nghe-ba/viet-dac-ta-use-case-sao-don-gian-nhung-hieu-qua

4. [NextJS Reference Documentation](https://nextjs.org/docs)

5. [NestJS Reference Documentation](https://docs.nestjs.com/)

6. [React Reference Overview – React](https://react.dev/reference/react)