import { LightningElement, track } from 'lwc';
import sendEmail from '@salesforce/apex/EmailSenderController.sendEmail';

export default class EnvioEmail extends LightningElement {
    @track emailValue = '';
    @track emailBody = '';

    handleEmailChange(event) {
        this.emailValue = event.target.value;
    }

    handleBodyChange(event) {
        this.emailBody = event.target.value;
    }

    sendEmail() {
        // Validação de e-mail simples (você pode implementar uma validação mais robusta)
        if (!this.isValidEmail(this.emailValue)) {
            alert('Endereço de Email inválido');
            return;
        }

        sendEmail({ toEmail: this.emailValue, body: this.emailBody })
            .then(result => {
                alert(result);

                // Limpar os campos após o email ser enviado com sucesso
                this.emailValue = '';
                this.emailBody = '';
            })
            .catch(error => {
                alert('Erro ao enviar o e-mail: ' + error.body.message);
            });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
