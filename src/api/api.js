import Axios from 'axios';

const instance = Axios.create({
    withCredentials: true,   
    baseURL: "http://online-course.dig-studio.ru/api/",
});

export const sectionsAPI = {
    getSections(){
        return instance.get(`sections`)
            .then(response => response.data);
    },   
}
export const lessonsAPI = {   
    getLesson(id){
        return instance.get(`lessons/${id}`)
            .then(response => response.data);
    }
}

export const tasksAPI = {   
    getTasks(id){
        return instance.get(`tasks`)
            .then(response => response.data);
    }
}