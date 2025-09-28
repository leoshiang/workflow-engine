using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace WorkflowEngine.Models.Steps;

public class SendEmailStep : Step
{
    public string SmtpServer { get; set; } = string.Empty;
    public int SmtpPort { get; set; } = 587;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string To { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;

    public override async Task<Step?> ExecuteAsync(ModelRunner runner)
    {
        Console.WriteLine($"發送郵件: {Subject}");

        try
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Workflow Engine", Username));
            message.To.Add(new MailboxAddress("", To));
            message.Subject = Subject;
            message.Body = new TextPart("plain") { Text = Body };

            using var client = new SmtpClient();
            await client.ConnectAsync(SmtpServer, SmtpPort, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(Username, Password);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);

            Console.WriteLine("郵件發送成功");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"郵件發送失敗: {ex.Message}");
        }

        return GetNextStep();
    }
}