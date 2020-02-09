const API_URL = {
    ROOT: 'http://104.209.168.184:3000/dro',
    //ROOT: 'http://jellyfish.carematix.com/dro',
    //ROOT: 'http://localhost:8080/dro',
    //ROOT: 'http://dev.carematix.com:3000/dro',
    LOGIN: '/auth/web/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    SESSION_ACTIVE: '/auth/active-session',
    WELCOMELOGIN: '/auth/welcome-login',
    FORGOT_PASSWORD: {
        ROOT: '/reset-password',
        VERIFY: '/verify',
        RESET: '/reset'
    },
    USER: {
        ROOT: '/user',
        SUMMARY: '/summary',
        TIMELINE: '/timeline',
        CREATE: '/createUser',
        CHANGE_PASSWORD: '/changePassword',
        UPDATE: '/personnel-setitngs',
        RESEND: '/reSend',
        GENERATEPDF: '/generatePdf',
        EMAILLEGAL: '/emailLegal',
        PERSONALDETAILS: '/personaldetails',
        DASHBOARDDATA: '/dashboardData',
        USERINFO: '/userInfo',
        DRODATA: '/droData',
        USERTIMELINE: '/userTimeline'
    },
    USER_SURVEY: {
        ROOT: '/user/survey',
        SPECIFIC_SURVEY: '/{surveyId}',
        CALENDARSCHEDULES: '/calendarSchedulesNew',
        GETCALENDER: '/getCalendarICS',
        DECLINE: '/decline',
        GENERATE: '/generate/{userId}/{language}/{fileName}',
        SURVEY: '/getSurvey',
        SAVESURVEY: '/updateSurveyResponse',
        ADHOC: '/adhoc',
        CRO: '/croData',
        VALIDATEADHOC: '/validateAdhocToken',
        VALIDATECRO : '/validateCroToken',
        UPLOAD_FILES: '/uploadFile',
        GET_FILE: '/getFile'
    },
    MASTER_DATA: {
        LANGUAGE: function (orgId: string) :string{
            return '/organization/' + orgId + '/languages';
        }
    },
    ORGANIZATION: {
        VALIDATECODE: function (clientCode: string, programCode: string, languageCode: string) {
            return '/organization/' + clientCode +'/'+ programCode +'/info?ln='+ languageCode;
        },
        CONFIG: function (orgId: string, languageCode: string) {
            return '/organization/' + orgId + '/config?ln=' + languageCode;
        }
    },
    DECLINE: {
        ROOT: '/declinereason',
        SAVEDECLINE: '/savedeclinereason'
    },
    VIEW_MESSAGE: {
        ROOT: '/user/message',
        UPDATE: '/update'
    },
    GET_BODY_CONTENT: function (languageCode: string) {
        return 'assets/data/config_' + languageCode + '.json';
    }
}

export default API_URL;
