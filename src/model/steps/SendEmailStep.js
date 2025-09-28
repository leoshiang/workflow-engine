const Step = require('./Step')
const nodemailer = require('nodemailer')

class SendEmailStep extends Step {

    constructor(id, type, code) {
        super(id, type, code)
        this._body = ''
        this._from = ''
        this._host = ''
        this._password = ''
        this._port = ''
        this._recipients = ''
        this._subject = ''
        this._userName = ''
        this._secure = ''
        this._attachments = ''
    }

    get attachments() {
        return this._attachments
    }

    set attachments(value) {
        this._attachments = value
    }

    get body() {
        return this._body
    }

    set body(value) {
        this._body = value
        return this
    }

    get from() {
        return this._from
    }

    set from(value) {
        this._from = value
        return this
    }

    get host() {
        return this._host
    }

    set host(value) {
        this._host = value
        return this
    }

    get password() {
        return this._password
    }

    set password(value) {
        this._password = value
    }

    get port() {
        return this._port
    }

    set port(value) {
        this._port = value
        return this
    }

    get recipients() {
        return this._recipients
    }

    set recipients(value) {
        this._recipients = value
    }

    get secure() {
        return this._secure
    }

    set secure(value) {
        this._secure = value
    }

    get subject() {
        return this._subject
    }

    set subject(value) {
        this._subject = value
    }

    get userName() {
        return this._userName
    }

    set userName(value) {
        this._userName = value
    }

    createTransporter() {
        return nodemailer.createTransport({
            host: this.getVariable(this.host),
            port: this.getVariable(this.port),
            secure: this.getVariable(this.secure),
            auth: {
                user: this.getVariable(this.userName),
                pass: this.getVariable(this.password),
            },
        })
    }

    async execute(runner) {
        await super.execute(runner)

        this._runner = runner
        const transporter = this.createTransporter()
        let message = {
            from: this.getVariable(this.from) || '',
            to: this.getVariable(this.recipients),
            subject: this.getVariable(this.subject),
            text: this.getVariable(this.body),
            attachments: this.getVariable(this.attachments),
        }
        try {
            await transporter.sendMail(message)
        } catch (e) {
            console.log(e)
        }

        return this.getNextStep()
    }

}

module.exports = SendEmailStep
