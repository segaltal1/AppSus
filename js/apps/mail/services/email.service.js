
export const emailService = {
    query,
    deleteMail,
    getMailById,
    sortMails,
    addMail,
    changeMode,
    makeId,
    getRandomColor
    
}

const email = {
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    to: 'momo@momo.com'
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}


const criteria = {
    status: ['inbox', 'sent', 'trash', 'drafts'],
    txt: '',
    isRead: '', // (optional property, if missing: show all)
    lables: ['important', 'romantic']
}
let currFolder;
function query(filterBy) {
    let { status, isRead, isStared, labels } = criteria
    let mailsToFilter;
    let mailsToShow;
    if (filterBy) {
        (filterBy.isRead === true || filterBy.isRead === false) ? isRead = filterBy.isRead : isRead = '';
        (status.includes(filterBy)) ? currFolder = filterBy : currFolder = currFolder;
        (status.includes(currFolder)) ? mailsToFilter = gMails.filter(mail => mail.status === currFolder) : mailsToFilter = gMails
        if (filterBy === 'isStared') mailsToFilter = gMails.filter(mail => mail.isStared);
        // (filterBy.isRead !== '' ) ? mailsToFilter = mailsToFilter.filter((mail) => { return (mail.isRead === isRead) }) : mailsToFilter;
        if (filterBy.txt === "" || !filterBy.txt) return Promise.resolve(mailsToFilter)
        mailsToShow = mailsToFilter.filter(mail => { return (mail.subject.includes(filterBy.txt.toLowerCase()) || mail.body.includes(filterBy.txt.toLowerCase())) })
        mailsToShow = (isRead === ' ') ? mailsToShow : mailsToShow.filter(mail => { return (mail.isRead === isRead) })

        return Promise.resolve(mailsToShow)
    }
    return Promise.resolve(gMails.filter(mail => mail.status === 'inbox'))
}

function getMailById(mailId) {
    var mail = gMails.find((mail) => {
        return mailId === mail.id
    })
    return Promise.resolve(mail)
}

function sortMails(sortBy) {
    if (sortBy === 'oldest') gMails.sort(function (a, b) { return a.sentAt - b.sentAt })
    if (sortBy === 'newest') gMails.sort(function (a, b) { return b.sentAt - a.sentAt })
    if (sortBy === 'title') gMails.sort(function (a, b) { return a.subject.localeCompare(b.subject) })

    // if(sortBy==='title')
    return Promise.resolve(gMails)
}
function addMail(mail) {
    gMails.push(mail)
    _saveMailsToStorage()
    return Promise.resolve(gMails)
}
function changeMode(id, mode) {
    let mailIdx = gMails.findIndex(function (mail) {
        return id === mail.id
    })
    let mail = gMails[mailIdx]
    mode === 'isStared' ? mail.isStared = !mail.isStared : mail.isStared
    mode === 'isRead' ? mail.isRead = !mail.isRead : mail.isRead
    return Promise.resolve()
}
function deleteMail(mailId) {
    let mailIdx = gMails.findIndex(function (mail) {
        return mailId === mail.id
    })
    gMails[mailIdx].removedAt = Date.now()
    gMails[mailIdx].status === 'trash' ? gMails.splice(mailIdx, 1) : gMails[mailIdx].status = 'trash'

    _saveMailsToStorage()
    return Promise.resolve()
}

function _saveMailsToStorage() {
    localStorage.setItem('emailsDB', JSON.stringify(gMails))
}


function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}
function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function makeTimeStamp(){
  let   min = Date.now()-15500012300;
    let max = Date.now()-1000;
    let num=Math.floor(Math.random() * (max - min + 1) +min);
    return num
}
const gMails = loadFromStorage('emailsDB') || [
    {
        id: "Tg2bjt",
        subject: "this happened the color of television the port ",
        body: "more or less had from various people this happened The sky . tuned happens was the story each time from various people . a pleasure from various people was . . this happened as generally was the story more or less All The sky The sky more or less and as generally was to I in such cases I . a dead channel All in such cases the story the story burn and It this happened was . to a dead channel All to from various people happens from various people . above burn All the story The sky this happened more or less All to I All from various people was as generally was . each time this happened burn It . . a different story was to above The sky I more or less it the story burn as generally and . . burn I bit by bit a dead channel was burn I to bit by bit burn ",
        isRead: false,
        isStared: false,
        // sentAt: makeTimeStamp(),
        sentAt: Date.now()-15000,
        to: "user@appsus.com",
        from: "Israel.Gmail.com",
        fromName: "Israel Israeli ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "kZ6aVU",
        subject: ". as generally was ",
        body: "All was this happened to each time it the color of television tuned I each time It the port this happened The sky a pleasure . bit by bit above All above the port in such cases the port a dead channel It more or less All . It to as generally the story and burn to from various people It it to . this happened It a pleasure it tuned a dead channel in such cases this happened All was was . the color of television from various people and a pleasure bit by bit each time as generally to . happens each time had I The sky each time and the color of television happens to in such cases happens this happened . a different story . . . from various people to . It it to it I a different story the story to above to this happened bit by bit . this happened All this happened a dead channel was ",
        isRead: false,
        isStared: false,
        sentAt: Date.now()-11000,
        to: "user@appsus.com",
        from: "Muki.Gmail.com",
        fromName: "Muki Cohen ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "Kl36qr",
        subject: "the story had it ",
        body: "above bit by bit was and each time happens . burn the port . I was was burn It bit by bit the port . tuned All the port the story . in such cases was and a different story was burn and was and a different story was The sky to it more or less the color of television to . from various people a different story was above burn to was and was a pleasure it . was from various people more or less bit by bit the port to the story The sky a pleasure above burn . The sky . was above each time I in such cases more or less I tuned to the port each time happens All tuned happens a dead channel as generally bit by bit It a dead channel a pleasure above a different story from various people more or less to a pleasure happens happens the color of television the color of television . the color of television ",
        isRead: false,
        isStared: false,
        sentAt: Date.now()-154560,
        to: "user@appsus.com",
        from: "Muki.Gmail.com",
        fromName: "Muki Cohen ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "ZItqAN",
        subject: "this happened to to ",
        body: "as generally it bit by bit above a dead channel it to was to this happened in such cases happens it a different story was burn It burn happens a dead channel was the port to a dead channel was had above The sky this happened happens to had above above more or less tuned to above a dead channel to I was it and happens . the color of television in such cases It in such cases each time was to in such cases and to It bit by bit had in such cases was was was this happened . the port happens burn was . in such cases to the port a different story The sky . was was each time was It this happened the color of television each time The sky It . in such cases All this happened . a different story . happens a pleasure the story had a pleasure more or less from various people ",
        isRead: false,
        isStared: false,
        sentAt:Date.now()-168752,
        to: "user@appsus.com",
        from: "YouTube.Gmail.com",
        fromName: "YouTube  ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "3dUizu",
        subject: "was was . ",
        body: "was was the color of television to the color of television each time in such cases the story was more or less . was . above was it a pleasure burn this happened from various people a pleasure was . above The sky to It a pleasure . I bit by bit burn burn I above All The sky in such cases burn bit by bit . All to to The sky the story bit by bit the story was . this happened All . each time was was a different story a different story . The sky The sky had and it The sky a pleasure I this happened this happened to It the story the color of television It had and from various people above each time this happened a different story a different story All to . this happened as generally it in such cases was each time . the color of television a different story and a dead channel to to The sky bit by bit ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "Muki.Gmail.com",
        fromName: "Muki Cohen ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "2zV1eL",
        subject: "the port . from various people ",
        body: "was as generally the port the color of television a pleasure happens bit by bit tuned this happened each time tuned . above All a dead channel happens the story each time happens had a different story tuned All The sky a pleasure tuned happens to and the color of television a different story more or less . the port in such cases the color of television a pleasure . The sky each time it the color of television in such cases . was in such cases the color of television had above I It . It a different story the story as generally I had it tuned it All was above bit by bit was and bit by bit the color of television was was from various people I had a dead channel . had . burn happens this happened It a dead channel tuned the color of television The sky the story . was was . this happened It was this happened All to more or less a dead channel the port ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "Muki.Gmail.com",
        fromName: "Muki Cohen ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "S3AKOO",
        subject: "more or less The sky as generally ",
        body: "a different story had was I as generally more or less The sky each time I was each time this happened each time each time was . the color of television the color of television happens the story . bit by bit to tuned and was and was tuned more or less It . a pleasure in such cases the story was from various people was a different story more or less was was a different story . above each time was from various people a dead channel tuned more or less it All the port bit by bit and burn It a different story a dead channel the port more or less All bit by bit in such cases the color of television tuned to a pleasure from various people It above this happened as generally bit by bit . the story had from various people was . was was All burn All tuned from various people . had It . had a dead channel had it was happens a different story . ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "Muki.Gmail.com",
        fromName: "Muki Cohen ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "lkjqlj",
        subject: "in such cases happens and ",
        body: "had to the story burn from various people to . happens in such cases from various people . The sky I the color of television It the story a pleasure . . from various people and to the color of television . . . All the story I above bit by bit . had each time tuned was The sky each time each time to was in such cases was was a pleasure was and was this happened happens burn bit by bit All as generally it happens burn I in such cases to a different story was and the color of television in such cases the color of television the story . and happens bit by bit happens to to to All tuned a different story a pleasure It the story The sky and the port to was a pleasure burn . the port was . each time bit by bit a different story and to tuned had above ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "Muki.Gmail.com",
        fromName: "Muki Cohen ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "iQFutI",
        subject: "the story as generally it ",
        body: "happens The sky . All It . the color of television to was it was happens it a dead channel burn The sky above was . as generally . above had burn more or less All to to above was bit by bit to burn a pleasure It had to to in such cases more or less the port above it the story had above above had burn it from various people The sky to burn a dead channel a pleasure was tuned the story All and a dead channel to . I a dead channel tuned it . a different story to tuned from various people each time as generally a dead channel a different story It the color of television a pleasure more or less I was was a different story was in such cases . It a dead channel was was each time happens in such cases All All each time a pleasure . ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "Shuki.Gmail.com",
        fromName: "Shuki Muki ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "8t7N8v",
        subject: "the color of television above a dead channel ",
        body: "was The sky had bit by bit had tuned All . a dead channel bit by bit each time more or less it . as generally was each time a different story was this happened the port the color of television happens . The sky to more or less the color of television the port a dead channel tuned as generally a dead channel above the story the story to to this happened it to had the color of television had tuned tuned It bit by bit above tuned above the color of television was I was bit by bit It happens bit by bit was All the port each time the color of television a pleasure . The sky and was I above The sky the port tuned a dead channel as generally each time each time more or less a dead channel . it a different story burn was a dead channel to in such cases more or less above a dead channel was and each time the port to I happens this happened was ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "YouTube.Gmail.com",
        fromName: "YouTube  ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "6IvOKA",
        subject: "happens to . ",
        body: "and happens . I . All bit by bit burn was was each time happens It bit by bit . I this happened was . was as generally had . . was a pleasure to . from various people a pleasure was had the port and above . tuned . and a pleasure . . the color of television had the story a pleasure a dead channel I . The sky a dead channel each time . burn a different story above the color of television more or less . . each time a pleasure It a dead channel a different story the color of television the color of television this happened more or less burn tuned happens was it . more or less the story tuned I the color of television was each time was All as generally the port a different story and the port to the story this happened from various people . was the color of television as generally burn a different story The sky ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "Israel.Gmail.com",
        fromName: "Israel Israeli ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "XVYGHk",
        subject: "had a pleasure was ",
        body: "was I a different story from various people . more or less a pleasure All burn above as generally was to each time and to as generally each time it . All burn as generally had The sky above it the story it from various people burn tuned was a pleasure it and tuned All burn happens the story was from various people The sky bit by bit All more or less to . more or less All was bit by bit was . The sky in such cases it in such cases to a dead channel was was to a dead channel as generally the color of television to bit by bit and the color of television bit by bit more or less more or less had bit by bit I each time in such cases it the port to It a different story bit by bit burn . The sky as generally It above burn . All It a different story the color of television to . to ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "GitHub.Gmail.com",
        fromName: "GitHub  ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "9piswD",
        subject: "tuned had in such cases ",
        body: "bit by bit to a different story a pleasure tuned the port The sky . above . bit by bit in such cases a dead channel the port from various people was more or less the story above All burn the color of television The sky I . a pleasure I to It as generally each time from various people I was in such cases to each time and a different story . this happened each time from various people bit by bit each time a pleasure was a dead channel a pleasure had . as generally to to in such cases each time All a pleasure was was The sky in such cases to it and to . to tuned to each time tuned bit by bit was above It this happened from various people more or less a dead channel a dead channel . I the color of television a dead channel the color of television above in such cases the story I the color of television . to the port from various people bit by bit in such cases burn The sky above ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "Israel.Gmail.com",
        fromName: "Israel Israeli ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "vrNpZo",
        subject: ". The sky in such cases ",
        body: "was in such cases I in such cases was from various people bit by bit was this happened was had a dead channel was a different story All had was as generally this happened a different story the color of television happens . a pleasure more or less was It All tuned was . The sky . bit by bit to the story to more or less was this happened and in such cases to the color of television the color of television All was to . The sky . tuned more or less was All and . the color of television more or less each time The sky as generally a dead channel the story . to The sky It more or less to a different story the color of television . the port each time each time was the story the story the port the color of television It a different story each time each time more or less . each time and in such cases the color of television happens the story a pleasure All this happened the port I this happened the port ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "Israel.Gmail.com",
        fromName: "Israel Israeli ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "TeYIN1",
        subject: ". a pleasure and ",
        body: "to a dead channel It each time burn a dead channel the port from various people the story to It happens above was was a different story the story to . was was I from various people was a dead channel the story bit by bit above . . to bit by bit was had it was a different story this happened a dead channel this happened was the story I a dead channel from various people had to above the story was more or less was I the story more or less it and this happened . from various people I had . to I as generally the story from various people the port bit by bit from various people to to I was was had . a dead channel a pleasure was above . I I from various people was bit by bit to had . burn to to All the color of television happens in such cases each time I ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "Puki.Gmail.com",
        fromName: "Puki Levi ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "xX2A3y",
        subject: "I was was ",
        body: "happens to . was was happens . All a different story above . was was happens had The sky a dead channel was each time as generally The sky a different story each time above It the port . bit by bit the color of television . burn was from various people a dead channel burn . each time more or less a dead channel to as generally burn and to was was had more or less and . I . it a dead channel as generally from various people more or less was . . the story to the story . was a pleasure more or less to burn it to the color of television burn a different story had it happens . the port as generally the port a pleasure in such cases the port above it a dead channel . more or less happens a pleasure as generally more or less All from various people a dead channel was . from various people a different story ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "Google.Gmail.com",
        fromName: "Google  ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "VDm4K2",
        subject: "I it and ",
        body: "All I each time it the story had happens tuned had the port All and a different story the story . to . tuned . . as generally in such cases . was more or less in such cases a dead channel was . as generally it . was was was was tuned in such cases . it more or less above above to and . a different story a dead channel happens tuned . each time above it was was a different story from various people to each time All had this happened a dead channel more or less . had was this happened the story as generally from various people the color of television . above had from various people as generally more or less a dead channel burn was a different story I a different story the story the story was was a dead channel a dead channel . was more or less a pleasure tuned this happened the port above above ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "Israel.Gmail.com",
        fromName: "Israel Israeli ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "03jzOp",
        subject: "as generally burn The sky ",
        body: "more or less I a pleasure above bit by bit it . it The sky . a dead channel a different story The sky a dead channel each time . to as generally I the story I to burn it it the port . the port this happened a dead channel above The sky It . a pleasure It the story burn in such cases from various people it I was . I . in such cases and from various people . in such cases each time more or less a dead channel as generally the color of television tuned more or less . a dead channel burn the port more or less was All a pleasure All it a pleasure was I the port above more or less burn tuned happens bit by bit to from various people . the color of television . as generally the story from various people was All more or less It and . a different story was had above bit by bit bit by bit a different story to ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "Puki.Gmail.com",
        fromName: "Puki Levi ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "2g45Vj",
        subject: "happens . was ",
        body: "The sky . more or less more or less had to more or less . more or less above as generally above . was to the story each time a pleasure happens it bit by bit this happened this happened to . burn All the color of television The sky happens was to each time happens a different story . from various people I a pleasure the port to the port the port in such cases more or less it tuned . happens was from various people a different story the story this happened as generally The sky the color of television to as generally it I . All . more or less this happened the color of television tuned was was more or less tuned the story each time more or less this happened a pleasure as generally the story from various people . from various people more or less The sky each time it All burn was The sky more or less the story the story burn It and was . a dead channel burn ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "YouTube.Gmail.com",
        fromName: "YouTube  ",
        removedAt: null,
        status: "inbox",
        lables: []
    },
    {
        id: "NGXkQ9",
        subject: "I a dead channel the story ",
        body: "was a different story this happened All the story . a dead channel and happens and tuned . it in such cases from various people . a pleasure to . as generally it tuned the port the port . burn The sky was happens it The sky bit by bit it more or less to in such cases was from various people . . a dead channel to to this happened the color of television was each time was I a pleasure The sky was was It each time I and each time and a different story bit by bit it I had it the color of television this happened this happened had burn was burn was to it happens a pleasure had had was in such cases was as generally The sky a pleasure the color of television It . . I The sky All this happened a different story to to . . All The sky ",
        isRead: false,
        isStared: false,
        sentAt: makeTimeStamp(),
        to: "user@appsus.com",
        from: "Google.Gmail.com",
        fromName: "Google  ",
        removedAt: null,
        status: "inbox",
        lables: []
    }
]
