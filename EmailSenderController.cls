public with sharing class EmailSenderController {

    @AuraEnabled
    public static String sendEmail(String toEmail, String body) {
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setToAddresses(new String[] { toEmail });
        email.setSubject('Assunto do E-mail'); // Pode personalizar o assunto se desejar
        email.setPlainTextBody(body);

        try {
            Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
            if (results[0].isSuccess()) {
                return 'E-mail enviado com sucesso!';
            } else {
                return 'Falha ao enviar o e-mail: ' + results[0].getErrors()[0].getMessage();
            }
        } catch (Exception e) {
            return 'Erro ao enviar o e-mail: ' + e.getMessage();
        }
    }
}
