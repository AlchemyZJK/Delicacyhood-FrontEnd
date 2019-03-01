import { SearchResponse } from '../delicacy-search/search-response';
import { RemarkResponse } from '../user-remark/remark-response';
import { Item } from '../user-collection/item';
import { Folder } from '../user-collection/folder';

function get_comment(body) {
    return {
        data: [
        {userId: '007', postId: '222', content: 'comment-01', createdAt: new Date()},
        {userId: '008', postId: '233', content: 'comment-02', createdAt: new Date()},
        {userId: '009', postId: '333', content: 'comment-03', createdAt: new Date()}
        ],
        status: true,
        message: 'success'
    };
}

function get_comment_number(body) {
    return {
        data: 3,
        status: true,
        message: 'success'
    };
}

function get_collection_number(body) {
    return {
        data: 4,
        status: true,
        message: 'success'
    };
}

function add_comment(body) {
    return {
        status: true,
        message: 'success'
    };
}

function add_collection(body) {
    return {
        status: true,
        message: 'success'
    };
}

function delete_collection(body) {
    return {
        status: true,
        message: 'success'
    };
}

function get_collection(body) {
    return {
        data: [
          {name: 'root', createdAt: new Date(), items: [
          {postId: '222', path: 'link-01', createdAt: new Date()},
          {postId: '233', path: 'link-02', createdAt: new Date()},
          {postId: '333', path: 'link-03', createdAt: new Date()}
        ]}
        ],
        status: true,
        message: 'success'
    };
}

function search(body) {
    return {
        data: [{postId: '222', path: 'path-01'},
               {postId: '233', path: 'path-02'},
               {postId: '333', path: 'path-03'}],
        status: true,
        message: 'success'
    };
}

function add_dir(body) {
    return {
        status: true,
        message: 'success'
    };
}

function get_information(body){
    return{
        status:true,
        message:'success',
            avatar:'dfshfkasfs',
            userName: 'testuser',
            id: 'A00001',
            gender:'female',
            birth: '1998-1-1',
            intro:'love&peace'
    }
}

function signin_email(body){
    return{
        status:true,
        message:'success',
            token:'dsafag-signin',
            id:'A00001'
    
    }
}

function login(body){
    return{
        status:true,
        message:'success',
        token:'dsafag-login',
        id:'A00001'
    }
}

function modify(body){
    return{
        status:true,
        message:'success'
    }
}

function logout(body){
    return{
        status:true,
        message:'success'
    }
}

function logoff(body){
    return{
        status:true,
        message:'success'
    }
}

function passwordmodify(body){
    return{
        status:true,
        message:'success',
    }
}

function getpasswordquestion(body){
    return{
        status:true,
        message:'success',
            cue1_id:1,
            cue2_id:3,
            question1:'safa',
            question2:'asfafaf'
    }
}



function forgetpasswordmodify(body){
    return{
        status:true,
        message:'success',
    
           token:'dsaf',
           id:'A00001'

    }
}


export default {
    'GET': {
        '/api/1.0/comment': get_comment,
        '/api/1.0/comment/number': get_comment_number,
        '/api/1.0/collection/number': get_collection_number,

        '/api/1.0/inform/show_inform':get_information,
        '/api/1.0/user/sign_out':logout,
        '/api/1.0/user/log_off':logoff
       //'/api/1.0/label/top':返回labels列表
    },
    'POST': {
        '/api/1.0/comment/add': add_comment,
        '/api/1.0/collection/add': add_collection,
        '/api/1.0/collection/delete': delete_collection,
        '/api/1.0/collection/get': get_collection,
        '/api/1.0/search': search,
        '/api/1.0/collection/dir/add': add_dir,

        '/api/1.0/user/sign_in':signin_email,
        '/api/1.0/user/log_in':login,
        '/api/1.0/inform/modify_inform':modify,
        '/api/1.0/security/modify_password':passwordmodify,
        '/api/1.0/security/get_cue':getpasswordquestion,
        '/api/1.0/security/forget_password':forgetpasswordmodify,

        // '/api/1.0/label/label_in':(token,labels列表)添加个人的label   
        // '/api/1.0/label/show_label':(id/token)查看返回labels


    }
};
