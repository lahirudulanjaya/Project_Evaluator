import {combineReducers} from 'redux'
import ProjectReducer from './ProjectReducers'
import authReducer from './authReducer'
import errReducer from './errReducers'
import milestoneReducer from './milestoneReducer'
export default combineReducers({
    auth :authReducer,
    errors :errReducer,
    project :ProjectReducer,
    milestone :milestoneReducer
}) 