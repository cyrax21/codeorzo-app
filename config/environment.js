const development = {
    name: 'development',
    asset_path: 'assets',
    session_cookie_key: 'something',
    db: 'codeorzo-app',
    smtp: {
        service: 'gmail', 
        host: 'smtp.gmail.com', //smtp server address
        port: 587,
        secure: false,
        auth: {  // authorization object
            user: 'codeorzo.service@gmail.com',
            pass: 'Joydeb@21' 
        }
    },
    google_client_id: '892611351534-vduv0r7f0c20r4ks84gqmnaj74kc2j70.apps.googleusercontent.com',
    google_client_secret: 'd7pRbE63zl_7vt4ROhsdoNu0',
    google_callback_url: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret_key: 'codeorzo',
}

const production = {
    name: 'production',
    asset_path: 'assets',
    session_cookie_key: 'something',
    db: 'codeorzo-app',
    smtp: {
        service: 'gmail', 
        host: 'smtp.gmail.com', //smtp server address
        port: 587,
        secure: false,
        auth: {  // authorization object
            user: 'codeorzo.service@gmail.com',
            pass: 'Joydeb@21' 
        }
    },
    google_client_id: '892611351534-vduv0r7f0c20r4ks84gqmnaj74kc2j70.apps.googleusercontent.com',
    google_client_secret: 'd7pRbE63zl_7vt4ROhsdoNu0',
    google_callback_url: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret_key: 'codeorzo',
}





module.exports = development;