import axios from 'axios';
import { API_BASE_URL } from '../app-config';
const ACCESS_TOKEN = "ACCESS_TOKEN";

// 백엔드에서 텍스트 생성 API 호출
export const kogptService = async (prompt, maxTokens) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const headers = {
        'Content-Type': 'application/json'
    };
    if (accessToken && accessToken !== "null") {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }
    try {
        const response = await axios.post(`${API_BASE_URL}/api/kogpt/generate`, { prompt, maxTokens }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error generating text:', error);
        if (error.response && error.response.status === 401) {
            alert('세션이 만료되었습니다. 다시 로그인해주세요.');
            window.location.href = '/login';
        } else {
            alert('서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
        throw error;
    }
};
