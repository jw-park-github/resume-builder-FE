import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

// API 호출 함수
export function call(api, method, request, authRequired = true) {
  let headers = new Headers({
    "Content-Type": "application/json", // Request 헤더 설정
  });

  if (authRequired) {
    // local storage에서 ACCESS TOKEN 가져오기
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    console.log("Access Token from localStorage:", accessToken);

    if (accessToken && accessToken !== "null") {
      headers.append("Authorization", "Bearer " + accessToken); // 토큰이 있을 경우 헤더에 추가
    }
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method, // HTTP 메서드 설정
  };

  if (request) {
    options.body = JSON.stringify(request); // 요청 본문 설정
  }

  console.log('Sending request to:', options.url, 'with options:', options);

  return fetch(options.url, options)
      .then((response) => {
        return response.text().then((text) => {
          console.log("Response Text:", text);
          if (!response.ok) {
            if (response.status === 403) {
              alert("잘못된 접근입니다.");
              window.location.href = "/resumes";
            }
            return Promise.reject(text);
          }
          return text ? JSON.parse(text) : {}; // JSON 응답이 비어있을 경우 처리
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        if (error.status === 403) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      });
}

// 로그인 처리 함수
export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then((response) => {
    if (response.token) {
      localStorage.setItem(ACCESS_TOKEN, response.token); // 토큰을 local storage에 저장
      window.location.href = "/resumes";
    }
  });
}

// 로그아웃 처리 함수
export function signout() {
  localStorage.removeItem(ACCESS_TOKEN); // 토큰 삭제
  window.location.href = "/login";
}

// 회원가입 처리 함수
export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO, false);
}
