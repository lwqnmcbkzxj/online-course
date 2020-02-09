import React from 'react';
import { Route } from "react-router-dom";

import AddSection from './AddSection/AddSection';
import AddLesson from './AddLesson/AddLesson';

const Add = (props) => {
    return (
        <div>
            <Route path="/course/add/section" render={() => <AddSection {...props} />} />           
            <Route path="/course/add/lesson" render={() => <AddLesson {...props} />} /> 
        </div>        
    );
}
export default Add;
