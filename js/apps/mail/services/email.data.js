import{}from'../../../services/storageService.js'
export const dataService = {
    createEmails
}

let loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function createEmails(count = 20) {
    let mails = []
    for (let i = 0; i++; i < count) {
        let name = makeUserLorem()
        mails.push(
            {
                id: makeId(),
                subject: makeLorem(3),
                body: makeLorem(100),
                isRead: true,
                isStared: false,
                sentAt: +makeTimeStamp(),
                to: loggedinUser.email,
                from: `${name.substring(0, name.indexOf(' '))}.Gmail.com`,
                fromUserName: name,
                removedAt:null,
                status: 'inbox',
                labels: []
            }
        )
    }
    return Promise.resolve(mails)
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}
function makeTimeStamp(){
    min = 1000000;
    max = Date.now();
    let num=Math.floor(Math.random() * (max - min + 1) +min);
    
    return num
}
function makeUserLorem() {
    var words = ['Google ', 'Spotify ', 'Puki Levi', 'Muki Cohen', 'GitHub ', 'YouTube ', 'Israel Israeli', 'Shuki Muki'];
    let txt = words[Math.floor(Math.random() * words.length)] + ' ';
    return txt;
}
function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}
