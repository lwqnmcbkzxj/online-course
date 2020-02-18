import Axios from 'axios';
import returnUserToken from "../redux/user-reducer";
// let token = "Bearer " + returnUserToken();
const instance = Axios.create({
    // baseURL: "http://online-course.dig-studio.ru/api/",
    baseURL: "http://38df15df.ngrok.io",
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkJIdUFoNGQifQ.eyJpc3MiOiJtZSIsImV4cCI6MTU4MTk5MTg3Miwicm9sZSI6MSwiaWQiOjMsImlhdCI6MTU4MTk1NTg3Mn0.uh6IGBsSiMlRmc830f-8FcVdA9Bhb3-ZRRvRQm2x9hs"
    }
});

export const sectionsListAPI = {
    getSections() {
        return instance.get(`sections`)
            .then(response => response.data);
    },

    addSection() {
        return instance.post(`sections`, { "title": "NEW SECTION" })
            .then(response => response.data);
    },
    editSection(sectionId, title) {
        return instance.post(`sections/edit`, { "id": sectionId, "title": title })
            .then(response => response.data);
    },
    deleteSection(sectionId) {
        return instance.delete(`sections`, { "data": { "id": sectionId } })
            .then(response => response.data);
    }, 
}
export const lessonAPI = {
    getLesson(id) {
        return instance.get(`lessons/${id}`)
            .then(response => response.data);
    },

    addLesson(sectionId, type) {
        return instance.post(`lessons`, { "section_id": sectionId, "content_type": type })
            .then(response => response.data);
    },
    editLesson(lessonId, title) {
        return instance.post(`lessons/edit`, { "id": lessonId, "title": title })
            .then(response => response.data);
    },
    deleteLesson(lessonid) {
        return instance.delete(`lessons`, { "data": { "id": lessonid } })
            .then(response => response.data);
    },
    completeLesson(lessonId, contentType) {
        return instance.post(`complete`, { "id": lessonId, "type": contentType })
            .then(response => response.data);
    },
}

export const articleElementsAPI = {
    addArticleElement(lessonId, elementType) {
        return instance.post(`lessons/article`, { "lesson_id": lessonId, "type": elementType })
            .then(response => response.data);
    },

    deleteArticleElement(elementId) {
        return instance.delete(`lessons/article`, { "data": { "id": elementId } })
            .then(response => response.data);
    }, 

    editArticleElementText(elementId, data) {
        return instance.post(`lessons/article/edit-text`, { "id": elementId, "text": data })
            .then(response => response.data);
    },    
    editArticleElementMedia(elementId, data) {
        return instance.post(`lessons/article/edit-media`, { "id": elementId, "media": data })
            .then(response => response.data);
    },
}

export const taskElementsAPI = {
    addTaskElement(lessonId, elementType, data) {
        return instance.post(`lessons/task`, { "lesson_id": lessonId, "type": elementType, "data": data })
            .then(response => response.data);
    },
    deleteTaskElement(elementId) {
        return instance.delete(`lessons/task`, { "data": { "id": elementId } })
            .then(response => response.data);
    }, 

    editTaskElementText(elementId, data) {
        return instance.post(`lessons/task/edit-text`, { "id": elementId, "text": data })
            .then(response => response.data);
    },    
    editTaskElementMedia(elementId, data) {
        return instance.post(`lessons/task/edit-media`, { "id": elementId, "media": data })
            .then(response => response.data);
    },
    editTaskQuiz(elementId, data) {
        return instance.post(`lessons/task/edit-quiz`, { "id": elementId, "json_options": data[0], "json_answers": data[1] })
            .then(response => response.data);
    },
}

export const tasksAPI = {
    getTasks() {
        return instance.get(`tasks`)
            .then(response => response.data);
    },

    getTask(id) {
        return instance.get(`tasks/${id}`)
            .then(response => response.data);
    }
}




export const userAPI = {
    getUserInfo() {
        return instance.get(`user-info`)
            .then(response => response.data);
    }, 

    login(email, password) {
        return instance.post(`login`, {"email": email, "password":password})
            .then(response => response.data);
    }
}
