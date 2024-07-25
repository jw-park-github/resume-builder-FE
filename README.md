# [🔗 이력서 작성 웹서비스 with KoGPT](https://dev-doc.co.kr)


<img width="800" src="https://github.com/user-attachments/assets/f5dc88ca-d6e4-4f6d-8dd8-8095b942e270">

<br>


# 목차


* [1. 개요](#1-개요)
    * [1-1. 기본 정보](#1-1-기본-정보)
    * [1-2. 기술 스택](#1-2-기술-스택)
    * [1-3. 주요 기능](#1-3-주요-기능)
    * [1-4. Service Architecture](#1-4-service-architecture)

   
* [2. DB 설계](#3-db-설계)
    * [2-1. E-R Diagram](#2-1-e-r-diagram)
    * [2-2. DB Schema](#2-2-db-schema)


- [3. REST API 문서](#3-rest-api-문서)


- [4. UI & 도표 & 상세 설명](#4-ui--flow-chart--상세-설명)
  
    * [4-1. 개발](#4-1-개발)
         * [4-1-1. 회원가입 및 로그인](#4-1-1-회원가입-및-로그인)
         * [4-1-2. 이력서](#4-1-2-이력서)
         * [4-1-3. 항목](#4-1-3-항목)
         * [4-1-4. KoGPT](#4-1-4-kogpt)
         * [4-1-5. PDF](#4-1-5-pdf)
  
    * [4-2. 배포](#4-2-배포)




<br>

# 1. 개요

## 1-1. 기본 정보
* 프로젝트명: **[카카오x구름] 기업 연계 프로젝트**<br>
* 주관: **[카카오x구름] Spring & React 풀스택 개발자 과정**<br>
* 기간: 2024.05 ~ 2024.07<br>
* 나의 역할 및 담당 업무: **팀장**<br>
   * Backend: REST API, DB 설계 전반, FE↔BE 연동
   * Frontend: 메인 페이지, 이력서 목록 페이지, PDF 관련 기능
   * etc.: 배포, 개발 문서 작성, 회의 진행

<table>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/165545220" alt="jw-park-github" width="135"/></td>
    <td><img src="https://avatars.githubusercontent.com/u/130027416" alt="OiPKL" width="135"/></td>
    <td><img src="https://avatars.githubusercontent.com/u/153581188" alt="yjiiny" width="135"/></td>
    <td><img src="https://avatars.githubusercontent.com/u/2668683" alt="rpghks07" width="135"/></td>
  </tr>
  <tr>
    <td>BE & FE | <a href="https://github.com/jw-park-github">jw-park-github</a></td>
    <td>BE | <a href="https://github.com/OiPKL">OiPKL</a></td>
    <td>FE | <a href="https://github.com/yjiiny">yjiiny</a></td>
    <td>BE | <a href="https://github.com/rpghks07">rpghks07</a></td>
  </tr>
</table>

<br>

## 1-2. 기술 스택

| 카테고리 | 기술 스택 |
| --- | --- |
| Back-End | ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white) ![JPA](https://img.shields.io/badge/JPA-6DB33F?style=for-the-badge&logo=jpa&logoColor=white) ![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white) ![Gradle](https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white)  | 
| Front-End | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) | 
| Database | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) ![H2](https://img.shields.io/badge/H2-003545?style=for-the-badge&logo=h2&logoColor=white) | 
| Test | ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) |
 | Deployment | ![AWS Elastic Beanstalk](https://img.shields.io/badge/AWS%20Elastic%20Beanstalk-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white) ![AWS RDS](https://img.shields.io/badge/AWS%20RDS-527FFF?style=for-the-badge&logo=amazon-rds&logoColor=white) ![AWS Route 53](https://img.shields.io/badge/AWS%20Route%2053-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white) |

<br>

## 1-3. 주요 기능

<br>

| 구분     | 기능            | 설명                                                   |
|----------|-----------------|--------------------------------------------------------|
| 1. 회원 관리 | 1-1. 회원 가입 | 이메일, 비밀번호를 입력하여 새로운 회원 계정을 생성                 |
|  | 1-2. 로그인    | 이메일과 비밀번호를 입력하여 기존 회원 계정으로 로그인                |
| 2. KoGPT  | 2-1. 텍스트 생성  | 프롬프트를 입력하고 텍스트 생성 버튼을 클릭하여 텍스트를 생성     |
|   | 2-2. 글자 수 설정 | 텍스트 생성 시 최대 글자 수를 설정할 수 있는 기능. 기본 값은 50자로 설정됨  |
|   | 2-3. 창의성 설정  | 텍스트 생성 시 창의성(temperature)을 설정하여 응답의 다양성을 조절 |
| 3. 이력서 | 3-1. 이력서 생성 | 이력서 제목을 입력하고 생성 버튼을 클릭해서 새 이력서를 생성                          |
|  | 3-2. 개별 이력서 조회 및 수정 | 이력서 전체 목록에서 개별 이력서에 할당된 수정 버튼을 클릭해서 조회              |
|  | 3-3. 이력서 삭제 | 개별 이력서에 할당된 삭제 버튼을 클릭해서 해당 이력서를 삭제        |
|  | 3-4. 전체 이력서 목록 조회 | Pagination을 적용하여 페이지 당 4개의 이력서를 조회                          |
| 4. 항목 공통     | 4-1. 항목 생성       | 항목 목록에서 생성할 항목의 추가 버튼(+)을 클릭해서 해당 항목을 이력서에 추가                             |
|      | 4-2. 항목 저장       | 내용을 입력하고 저장 버튼을 클릭하면 현재 이력서의 모든 항목들이 전체 저장됨             |
|      | 4-3. 항목 수정       | 내용 수정 후 저장 버튼을 클릭하면 수정한 내용이 현재의 이력서에 반영되어 저장             |
|      | 4-4. 항목 삭제       | 삭제할 항목의 삭제 버튼(-)을 클릭                        |
|      | 4-5. 동일 항목 추가       | 특정 항목 내의 하위 항목 추가 버튼(+)을 클릭하여 동일한 항목을 추가             |
| 5. AboutMe 항목 | 5-1. 이미지 첨부    | 이미지를 첨부하여 화면 상에 표시              |
| 6. Skill 항목 | 6-1. 기술명 검색    | Modal 창에서 특정 기술명을 검색              |
|   | 6-2. 기술 로고 첨부  | 선택된 기술명을 클릭해서 해당 기술의 로고 이미지를 첨부          |
| 7. Project 항목 | 7-1. 경력 상세 설명 작성 | 텍스트 에디터를 통해 사용자가 경력에 대한 상세 설명을 작성  |
|  | 7-2. 기술명 검색    | Modal 창에서 특정 기술명을 검색              |
|   | 7-3. 기술 로고 첨부  | 선택된 기술명을 클릭해서 해당 기술의 로고 이미지를 첨부          |
| 8. Career 항목 | 8-1. 경력 상세 설명 작성 | 텍스트 에디터를 통해 사용자가 프로젝트에 대한 상세 설명을 작성  |
|  | 8-2. 기술명 검색    | Modal 창에서 특정 기술명을 검색              |
|   | 8-3. 기술 로고 첨부  | 선택된 기술명을 클릭해서 해당 기술의 로고 이미지를 첨부         |
| 9. PDF | 9-1. 이력서 PDF 출력  | 작성한 이력서를 PDF로 출력  |
|  | 9-2. 이력서 PDF 저장 | 작성한 이력서를 PDF 파일로 저장  |
|  | 9-3. 페이지 잘림 방지 | 페이지와 페이지 사이에 항목이 위치하지 않도록 하여 정상 출력 및 저장을 보장  |



<br>


## 1-4. Service Architecture
<img width="800" alt="ARC" src="https://github.com/user-attachments/assets/f5d8f601-6d58-4cb1-834d-b4d5974d85a4">


<br>


# 2. DB 설계

## 2-1. E-R Diagram

<img width="800" src="https://github.com/user-attachments/assets/d18db1c1-2d17-49df-a2d0-1dd247a3f1a6">

<br>


## 2-2. DB Schema

<details>
<summary>𝄜 UserEntity </summary>

| 컬럼명 | 타입 | 제약 조건 | 설명 | 
|----------|--------------|-------------------|----------------| 
| id | VARCHAR(255) | PRIMARY KEY | 사용자 고유 ID | 
| email | VARCHAR(255) | NOT NULL, UNIQUE | 사용자 이메일 | 
| password | VARCHAR(255) | NOT NULL | 사용자 비밀번호| 
| createdAt| TIMESTAMP | | 생성일자 |
</details>


<details>
<summary>𝄜 AboutMe</summary>

| 컬럼명       | 타입         | 제약 조건      | 설명                      |
|--------------|--------------|----------------|---------------------------|
| id           | INT          | PRIMARY KEY    | AboutMe ID                |
| photo        | VARCHAR(255) |                | 사진                      |
| name         | VARCHAR(255) |                | 이름                      |
| birthday     | VARCHAR(255) |                | 생일                      |
| email        | VARCHAR(255) |                | 이메일                    |
| github       | VARCHAR(255) |                | 깃허브 주소               |
| phoneNumber  | VARCHAR(255) |                | 전화 번호                 |
| blog         | VARCHAR(255) |                | 블로그                    |
| introduction | TEXT         |                | 자기 소개                 |
| resume_id    | INT          | FOREIGN KEY    | 이력서 ID                 |
</details>


<details>
<summary>𝄜 Activity</summary>

| 컬럼명         | 타입         | 제약 조건      | 설명                          |
|----------------|--------------|----------------|-------------------------------|
| id             | INT          | PRIMARY KEY    | Activity ID                   |
| activityName   | VARCHAR(255) |                | 활동명                        |
| organizationName| VARCHAR(255)|                | 조직명                        |
| startDate      | VARCHAR(255) |                | 시작 날짜                     |
| endDate        | VARCHAR(255) |                | 종료 날짜                     |
| isCurrent      | BOOLEAN      |                | 현재 진행 중 여부             |
| resume_id      | INT          | FOREIGN KEY    | 이력서 ID                     |
</details>

<details>
<summary>𝄜 Award</summary>

| 컬럼명            | 타입         | 제약 조건      | 설명                          |
|-------------------|--------------|----------------|-------------------------------|
| id                | INT          | PRIMARY KEY    | Award ID                      |
| awardName         | VARCHAR(255) |                | 수상명                        |
| awardingInstitution | VARCHAR(255) |              | 수상 기관                     |
| date              | VARCHAR(255) |                | 수상 날짜                     |
| description       | TEXT         |                | 수상 설명                     |
| resume_id         | INT          | FOREIGN KEY    | 이력서 ID                     |
</details>

<details>
<summary>𝄜 Career</summary>

| 컬럼명       | 타입         | 제약 조건      | 설명                              |
|--------------|--------------|----------------|-----------------------------------|
| id           | INT          | PRIMARY KEY    | 경력 ID                           |
| company      | VARCHAR(255) |                | 회사 이름                         |
| department   | VARCHAR(255) |                | 부서 이름                         |
| startDate    | VARCHAR(255) |                | 시작 날짜                         |
| endDate      | VARCHAR(255) |                | 종료 날짜                         |
| isCurrent    | BOOLEAN      |                | 현재 진행 중 여부                 |
| techStack    | VARCHAR(255) |                | 기술 스택                         |
| description  | TEXT         |                | 경력 설명                         |
| resume_id    | INT          | FOREIGN KEY    | 이력서 ID                         |
</details>


<details>
<summary>𝄜 Certificate</summary>

| 컬럼명           | 타입         | 제약 조건      | 설명                              |
|------------------|--------------|----------------|-----------------------------------|
| id               | INT          | PRIMARY KEY    | Certificate ID                    |
| certificateName  | VARCHAR(255) |                | 자격증 이름                       |
| issuer           | VARCHAR(255) |                | 발급 기관                         |
| issueDate        | VARCHAR(255) |                | 발급 날짜                         |
| resume_id        | INT          | FOREIGN KEY    | 이력서 ID                         |


</details>

<details>
<summary>𝄜 Education</summary>

| 컬럼명       | 타입         | 제약 조건      | 설명                              |
|--------------|--------------|----------------|-----------------------------------|
| id           | INT          | PRIMARY KEY    | Education ID                      |
| schoolName   | VARCHAR(255) |                | 학교명                            |
| major        | VARCHAR(255) |                | 전공                              |
| startDate    | VARCHAR(255) |                | 입학 날짜                         |
| endDate      | VARCHAR(255) |                | 졸업 날짜                         |
| status       | VARCHAR(255) |                | 현재 상태                         |
| educationType| VARCHAR(255) |                | 교육 유형                         |
| resume_id    | INT          | FOREIGN KEY    | 이력서 ID                         |


</details>

<details>
<summary>𝄜 Language</summary>

| 컬럼명       | 타입         | 제약 조건      | 설명                              |
|--------------|--------------|----------------|-----------------------------------|
| id           | INT          | PRIMARY KEY    | Language ID                       |
| language     | VARCHAR(255) |                | 어학                              |
| testName     | VARCHAR(255) |                | 시험명                            |
| score        | VARCHAR(255) |                | 점수                              |
| date         | VARCHAR(255) |                | 시험 날짜                         |
| resume_id    | INT          | FOREIGN KEY    | 이력서 ID                         |


</details>

<details>
<summary>𝄜 Project</summary>

| 컬럼명       | 타입         | 제약 조건      | 설명                              |
|--------------|--------------|----------------|-----------------------------------|
| id           | INT          | PRIMARY KEY    | Project ID                        |
| title        | VARCHAR(255) |                | 프로젝트 제목                     |
| startDate    | VARCHAR(255) |                | 시작 날짜                         |
| endDate      | VARCHAR(255) |                | 종료 날짜                         |
| isCurrent    | BOOLEAN      |                | 현재 진행 중 여부                 |
| intro        | TEXT         |                | 프로젝트 소개                     |
| techStack    | VARCHAR(255) |                | 기술 스택                         |
| description  | TEXT         |                | 프로젝트 설명                     |
| resume_id    | INT          | FOREIGN KEY    | 이력서 ID                         |


</details>

<details>
<summary>𝄜 Skill</summary>

| 컬럼명       | 타입         | 제약 조건      | 설명                              |
|--------------|--------------|----------------|-----------------------------------|
| id           | INT          | PRIMARY KEY    | Skill ID                          |
| techStack    | VARCHAR(255) |                | 기술 스택                         |
| description  | TEXT         |                | 기술에 대한 상세 설명             |
| resume_id    | INT          | FOREIGN KEY    | 이력서 ID                         |


</details>

<details>
<summary>𝄜 Training</summary>

| 컬럼명       | 타입         | 제약 조건      | 설명                              |
|--------------|--------------|----------------|-----------------------------------|
| id           | INT          | PRIMARY KEY    | Training ID                       |
| courseName   | VARCHAR(255) |                | 교육명                            |
| institution  | VARCHAR(255) |                | 교육 기관명                       |
| startDate    | VARCHAR(255) |                | 시작 날짜                         |
| endDate      | VARCHAR(255) |                | 종료 날짜                         |
| isCurrent    | BOOLEAN      |                | 현재 진행 중 여부                 |
| resume_id    | INT          | FOREIGN KEY    | 이력서 ID                         |

</details>

<br>

# 3. REST API 문서

<br>

🔗 https://api.dev-doc.co.kr/swagger-ui/index.html

<br>


# 4. UI & Flow Chart & 상세 설명

## 4-1. 개발

### 4-1-1. 회원가입 및 로그인

<details>
   
<summary>🖼️ UI</summary>
<img width="700" alt="signin-page" src="https://github.com/user-attachments/assets/d6adb147-6b96-43df-ac95-306a0bd2ebd8">
</details>

<details>
   
<summary>⬇️ 회원 가입 Sequence Diagram</summary>

<img width="700" src="https://mermaid.ink/img/pako:eNqFlE1v0zAYx7-K5ROIdlvabut82AG2HRBo1dIJCeViEi-1SOzgOIVSVRovQoJdthMSolWRAAlpB5BA4js1_Q7YzUuXJhXJJfbz__2fPH5sD6HNHQIRDMmziDCbHFDsCuxbDKgnwEJSmwaYSXAaElGePRKcScKccuQutp9WBrTRPUUJ7nlVljpuEtGnNqkOnpCAh1RyMSjHu1wl7Qjep472TgQaqu_v38l-FgGTuuw0AEdc-CCeXMVvfyXKTFFU9zBzPGJGT3wqy7q0UAQ6x2YXbOJI9jZD5R8F4JbOfNA9vp1QqVJDxUVAQBCXhpIIPb9CFaUZnK4QAvHr6_jTj3hyCeI3Y1VIkvSQSSoHNxxSfYYv11A5TM_jybc13FJYV2y9kNrEfeKAJVbOliE3Sz1JS12DFkst9BOB-bvp_NXP9ZUW5JXZ7z_qJqrKjJrI-xmPr2YXf_ImgudU9hJ2pZ-aWu6W_2LVm-wBt7EHTLXS2CXxx8u81kV3VsisMo25lIGOYmZfPoPZ9-vZxdd4_Hs2fT__8NdisAZ9InxMHXXGh9rFgrJHfGJBpD4dcoYjT1rQYiMlVXuXmwNmQyRFRGpQ8MjtQXSGvVCNosDBMrsgMkkyeejoLZIr1VF8zHmuUUOIhvAFREa7sbHbbOy1d1pNQ73b7RocQNTe2NozGltGq9na3jEazd1RDb5cGBg1SBbeD5NranFbjf4B8EC2LQ?type=png)](https://mermaid.live/edit#pako:eNqFlE1v0zAYx7-K5ROIdlvabut82AG2HRBo1dIJCeViEi-1SOzgOIVSVRovQoJdthMSolWRAAlpB5BA4js1_Q7YzUuXJhXJJfbz__2fPH5sD6HNHQIRDMmziDCbHFDsCuxbDKgnwEJSmwaYSXAaElGePRKcScKccuQutp9WBrTRPUUJ7nlVljpuEtGnNqkOnpCAh1RyMSjHu1wl7Qjep472TgQaqu_v38l-FgGTuuw0AEdc-CCeXMVvfyXKTFFU9zBzPGJGT3wqy7q0UAQ6x2YXbOJI9jZD5R8F4JbOfNA9vp1QqVJDxUVAQBCXhpIIPb9CFaUZnK4QAvHr6_jTj3hyCeI3Y1VIkvSQSSoHNxxSfYYv11A5TM_jybc13FJYV2y9kNrEfeKAJVbOliE3Sz1JS12DFkst9BOB-bvp_NXP9ZUW5JXZ7z_qJqrKjJrI-xmPr2YXf_ImgudU9hJ2pZ-aWu6W_2LVm-wBt7EHTLXS2CXxx8u81kV3VsisMo25lIGOYmZfPoPZ9-vZxdd4_Hs2fT__8NdisAZ9InxMHXXGh9rFgrJHfGJBpD4dcoYjT1rQYiMlVXuXmwNmQyRFRGpQ8MjtQXSGvVCNosDBMrsgMkkyeejoLZIr1VF8zHmuUUOIhvAFREa7sbHbbOy1d1pNQ73b7RocQNTe2NozGltGq9na3jEazd1RDb5cGBg1SBbeD5NranFbjf4B8EC2LQ">

</details>

<details>
   
<summary>⬇️ 로그인 Sequence Diagram</summary>

<img width="700" src="https://mermaid.ink/img/pako:eNqFlE1v0zAYx7-K5dMQ6ba03db5MAnYdkBDq9YiJJSLSbw2IrGLk2x0VSVeNiQYh-2AEJM6FQkmDe0wEEj7TNT9Djxukq5pI5FcYvv_-_t5cdzBtnAYJjhgLyLGbbbu0oakvsURPC0qQ9d2W5SH6HHA5OzsphQ8ZNyZXblP7ee5C9roAVBSeF6epV6vMbnn2mx2sS7AtCrFnutoNhZoorC2djcNhqAt0XA52hTSR-r8VB3-jIWpICtuUu54rBY9891wVpfkQVB1u1ZHCzQKmwuB2-DgP6c3Xq9v34mpRKmhbI4EaYpxyIKGbIrKSlM4KQCB8E_-_rpE6qI3-HGEhl8-qd4NmmM-dT0DKhME-0I6E1YJmPrssJYI3FDINli9uVJnl2CI1Nfr4dnHxGYCvlUXwKCQCUQPNiCFsD27WSqeTPneRMpOLp3NOtNZgobv-sPX10i97UH34krHfBJuRp4bwMMn9ViVu6Mmxq1VvdPB8Z9xP9G-GzZjdqq1mro9OP_F8s_blrCph2pQZtpg6vPJONf-K3X-fYpMMyNohwWRzwJUBQoNLq4Gx99U7_eg_3744cbi2MA-k9BPB37mjjaxMDTAZxYm8OmwXRp5oYUt3gUpnEdRa3Mbk1BGzMBSRI0mJrvUC2AUtRxoWnITTM1uOPp8jCfhp3wqhJ_6wBCTDn6JiVkpzq-UiquV5XLJhHepYuA2JpX5xVWzuGiWS-WlZbNYWuka-GBkYBqYjbwfxRfS6F7q_gMsh7DI?type=png)](https://mermaid.live/edit#pako:eNqFlE1v0zAYx7-K5dMQ6ba03db5MAnYdkBDq9YiJJSLSbw2IrGLk2x0VSVeNiQYh-2AEJM6FQkmDe0wEEj7TNT9Djxukq5pI5FcYvv_-_t5cdzBtnAYJjhgLyLGbbbu0oakvsURPC0qQ9d2W5SH6HHA5OzsphQ8ZNyZXblP7ee5C9roAVBSeF6epV6vMbnn2mx2sS7AtCrFnutoNhZoorC2djcNhqAt0XA52hTSR-r8VB3-jIWpICtuUu54rBY9891wVpfkQVB1u1ZHCzQKmwuB2-DgP6c3Xq9v34mpRKmhbI4EaYpxyIKGbIrKSlM4KQCB8E_-_rpE6qI3-HGEhl8-qd4NmmM-dT0DKhME-0I6E1YJmPrssJYI3FDINli9uVJnl2CI1Nfr4dnHxGYCvlUXwKCQCUQPNiCFsD27WSqeTPneRMpOLp3NOtNZgobv-sPX10i97UH34krHfBJuRp4bwMMn9ViVu6Mmxq1VvdPB8Z9xP9G-GzZjdqq1mro9OP_F8s_blrCph2pQZtpg6vPJONf-K3X-fYpMMyNohwWRzwJUBQoNLq4Gx99U7_eg_3744cbi2MA-k9BPB37mjjaxMDTAZxYm8OmwXRp5oYUt3gUpnEdRa3Mbk1BGzMBSRI0mJrvUC2AUtRxoWnITTM1uOPp8jCfhp3wqhJ_6wBCTDn6JiVkpzq-UiquV5XLJhHepYuA2JpX5xVWzuGiWS-WlZbNYWuka-GBkYBqYjbwfxRfS6F7q_gMsh7DI">

</details>


* 사용자 인증을 위해 Spring Security와 JWT를 사용. 사용자가 회원가입을 위해 <br>
  필요한 정보를 입력하면, BE에서 이를 처리하여 새로운 사용자 계정을 생성하고 <br>
  이를 DB에 저장. <br> 
* 로그인 기능에서는 사용자가 입력한 이메일과 비밀번호를 확인하여, 유효한 경우 <br>
  JWT 토큰을 발급하고, 이를 클라이언트에게 전달. 클라이언트는 해당 토큰을 <br>
  local storage에 저장하고, 이후의 요청에서 인증 헤더에 포함하여 사용자의 <br>
  인증 상태를 유지. <br> 
* React를 사용하여 입력 폼과 상태 관리를 구현.

---

### 4-1-2. 이력서

<details>
   
<summary>🖼️ UI</summary>

<img width="700" alt="list-page" src="https://github.com/user-attachments/assets/b9183e30-350b-414d-aaf5-fa5981dab4c1">

</details>


<details>
   
<summary>⬇️ Flow Chart</summary>

<img width="700" src="https://github.com/user-attachments/assets/1a9a69c3-7af4-4861-8b1b-f379147f5300">

</details>

* Spring Boot를 기반으로 이력서 생성, 조회, 수정, 삭제 기능을 RESTful API로 구현.
* 이력서 제목을 입력하고 생성 버튼을 클릭하면, 새로운 이력서 객체를 DB에 저장.
* 이력서 목록 페이지에서 특정 이력서를 클릭하여 해당 이력서의 세부 정보를 조회. 
* 수정 페이지에서 이력서의 제목 및 내용을 변경한 후 저장 버튼을 클릭하면 <br>
  변경된 내용을 DB에 반영. <br>
* 이력서 목록에서 특정 이력서의 삭제 버튼을 클릭하면, 해당 이력서를 DB에서 삭제. 
* FE에서는 React를 기반으로 이력서 생성, 조회, 수정, 삭제 기능을 구현.

---

### 4-1-3. 항목


<details>
   
<summary>🖼️ UI</summary>

<img width="700" alt="detail-page" src="https://github.com/user-attachments/assets/524304a2-be4f-4a7c-8032-a531d99f026c">

</details>


<details>
   
<summary>⬇️ Flow Chart</summary>

<img width="700" src="https://github.com/user-attachments/assets/bf3b5c56-a4a0-402d-9605-7239615fe1f7">

</details>

* 각 항목(어학, 수상, 자격증 등 이력서에 종속되는 하위 항목들)은 이력서와 <br>
  1:N의 관계를 가지며 이력서 ID를 통해 연관 관계를 유지. <br>
* 사용자가 화면 왼쪽의 목록에서 항목을 선택하면, 선택한 항목이 화면 오른쪽 <br>
  에 표시됨. <br>
* 특정 항목 내의 하위 항목 추가 버튼을 클릭하여 동일한 항목을 추가 가능. <br> 
* FE에서 상태가 업데이트되고, 사용자가 항목에 내용을 입력하고 저장 버튼을 <br>
  클릭하면 추가 또는 수정된 내용을 DB에 반영. <br> 
* 항목 내 오른쪽 상단의 삭제(-)버튼을 클릭하여 해당 항목을 삭제. <br>
* React를 사용하여 각 항목의 입력 폼과 상태 관리를 구현하고, UI를 제공 <br> 


---

### 4-1-4. KoGPT


<details>
   
<summary>🖼️ UI</summary>

<img width="251" alt="kogpt-component" src="https://github.com/user-attachments/assets/ddd6030e-a052-41f5-8fe9-453069dfaa09">

</details>


<details>
   
<summary>⬇️ Flow Chart</summary>

<img width="251" src="https://github.com/user-attachments/assets/a718aaff-7cd8-493e-880c-eca72541cbc8">

</details>

* 사용자가 입력한 프롬프트를 기반으로 답변 텍스트를 생성. <br>
* 사용자가 프롬프트와 글자 수를 입력하고, 텍스트 생성 버튼을 클릭하면 <br>
  BE의 KoGPT 컨트롤러가 Kakao KoGPT API를 호출하여 생성된 텍스트를 반환. <br>
  FE에서는 응답을 받아 화면에 표시. <br>
* React를 사용하여 KoGPT 텍스트 생성 폼과 상태 관리를 구현했습니다. <br>

---

### 4-1-5. PDF


<details>
   
<summary>🖼️ UI</summary>

<img width="500" alt="print" src="https://github.com/user-attachments/assets/705154d2-46f6-4b15-88ac-b64ce2777ca5">

</details>

* 사용자가 작성한 이력서를 PDF 파일로 출력하거나 저장할 수 있도록 구현. <br> 
* 페이지와 페이지 사이에 항목이 위치하지 않도록 하는 잘림 방지 기능을 포함.


## 4-2. 배포

* AWS CLI를 사용하여 AWS Elastic Beanstalk 배포 환경을 구축. <br>
* 프론트엔드(React)와 백엔드(Spring Boot)를 각각 개별적인 EB 인스턴스에 배포. <br>
* BE에서는 Spring Boot 애플리케이션을 빌드하여 EB에 배포.
* FE는 빌드된 정적 파일을 EB에 배포. <br>
* DB는 AWS RDS MySQL을 사용하여 설정.<br> 
* Route 53을 사용하여 도메인(dev-doc.co.kr)을 설정. <br>
* AWS Certificate Manager를 통해 HTTPS를 설정. <br>
* 배포 프로세스를 자동화하기 위해 EB CLI Script를 사용.<br>

<br>


## 최종 발표 자료 일부

<img width="500" alt="004" src="https://github.com/user-attachments/assets/f13973d7-b292-457c-9dbb-2602b34fb33b">
<img width="500" alt="005" src="https://github.com/user-attachments/assets/ee0b9a93-81ef-4698-8ba6-489b937981bd">
<img width="500" alt="006" src="https://github.com/user-attachments/assets/c7db8688-8690-4407-ab7e-4ebaee47b2ad">
<img width="500" alt="015" src="https://github.com/user-attachments/assets/7d6a840f-9085-4e9b-945b-219640a3783f">
<img width="500" alt="017" src="https://github.com/user-attachments/assets/b666116c-57b8-40ca-80e3-08ea71030f5c">
<img width="500" alt="019" src="https://github.com/user-attachments/assets/898a9c4d-303b-4511-8e83-08e44d55b848">
<img width="500" alt="022" src="https://github.com/user-attachments/assets/497f0b13-c808-4777-89b8-de851f527ecb">
<img width="500" alt="024" src="https://github.com/user-attachments/assets/febb3d1d-831c-42a7-b3ed-1ef6e0eab324">
<img width="500" alt="028" src="https://github.com/user-attachments/assets/be3517d9-f370-4186-bdac-97b702c94546">



