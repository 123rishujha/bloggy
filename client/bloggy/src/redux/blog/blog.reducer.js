import * as types from "./blog.types";

const init = {
    singleBlog: {},
    blogs: [],
    blogLoading: false,
    blogError: false,
    blogAlert: null,
}

export const blogReducer = (state=init,{type,payload}) => {
    switch(type){
        case types.LOADING_BLOG : {
            return {...state,blogLoading: true,blogError:false,blogAlert:null}
        }
        case types.ERROR_BLOG : {
            return {...state,blogLoading: false,blogError:true,blogAlert:null}
        }
        
        case types.BLOG_ALERT : {
            return {...state,blogLoading:false,blogAlert:payload}
        }
        
        case types.CREATE_BLOG : {
            return {...state,blogLoading:false,blogError:false,singleBlog: payload,blogs:[payload,...state.blogs]}
        }
        
        case types.GET_BLOG : {
            return {...state,blogLoading:false,blogError:false,singleBlog: payload}
        }   
        
        case types.GET_BLOGS : {
            return {...state,blogs: payload,loading: false,error:false}            
        }
        
        case types.PATCH_BLOG : {
            return {...state,loading: false, error: false, singleBlog: payload}
        }
        
        default: {
            return state
        }
    }
}
