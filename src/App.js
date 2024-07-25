import React from "react";
import "./App.css";
import logo from "./assets/main-logo.png";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: !!localStorage.getItem("ACCESS_TOKEN"), // 로그인 상태 확인
        };
    }

    // 버튼 클릭 시 페이지 이동 처리
    handleButtonClick = () => {
        const token = localStorage.getItem("ACCESS_TOKEN"); // 로컬 스토리지에서 토큰 가져오기
        if (token) {
            window.location.href = "/resumes"; // 로그인 상태면 이력서 페이지로 이동
        } else {
            window.location.href = "/login"; // 로그아웃 상태면 로그인 페이지로 이동
        }
    };

    // 렌더링
    render() {
        return (
            <div className="App">
                <div className="leftPanel" style={{backgroundColor: "#486da3"}}>
                    <h1 className="devDocTitle">Dev
                        <div style={{marginTop: -30}}>Doc</div>
                    </h1>
                </div>
                <div className="rightPanel">
                    <img src={logo} className="App-logo" alt="logo" /> {/* 로고 이미지 */}
                    <button
                        className="App-button"
                        onClick={this.handleButtonClick}
                    >
                        시작 하기 {/* 버튼 */}
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
