import Axios from 'axios';

const instance = Axios.create({
    // withCredentials: true,   
    // baseURL: "http://online-course.dig-studio.ru/api/",
    baseURL: "http://8d63c1fe.ngrok.io",
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkJIdUFoNGQifQ.eyJpc3MiOiJtZSIsImV4cCI6MTU4MTU5MjI2MSwicm9sZSI6MCwiaWQiOjIsImlhdCI6MTU4MTU1NjI2MX0.e0P2GASdtz1Hc26HJp2Npaqxk_e69_UYWE_oysHnuT4"
    }
});

export const sectionsListAPI = {
    getSections() {
        return instance.get(`sections`)
            .then(response => response.data);
    },

    addSection() {
        return instance.post(`complete-section`, { "id": 1 })
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

    deleteLesson(lessonid) {
        return instance.delete(`lessons/article`, { "data": { "id": lessonid } })
            .then(response => response.data);
    },
    completeLesson(lessonId, contentType) {
        return instance.post(`complete`, { "id": lessonId, "type": contentType })
            .then(response => response.data);
    },
}

export const lessonElementsAPI = {
    addArticleLessonElement(lessonId, data, elementType) {
        return instance.post(`lessons/article`, { "lesson_id": lessonId, "data": data, "type": elementType })
            .then(response => response.data);
    },

    deleteArticleLessonElement(elementId) {
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
    }
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

