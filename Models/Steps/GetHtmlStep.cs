using HtmlDocument = HtmlAgilityPack.HtmlDocument;

namespace WorkflowEngine.Models.Steps;

public class GetHtmlStep : Step
{
    public string Url { get; set; } = string.Empty;
    public string VariableName { get; set; } = string.Empty;

    public override async Task<Step?> ExecuteAsync(ModelRunner runner)
    {
        Console.WriteLine($"獲取網頁內容: {Url}");

        try
        {
            using var client = new HttpClient();
            var html = await client.GetStringAsync(Url);

            var doc = new HtmlDocument();
            doc.LoadHtml(html);

            if (!string.IsNullOrEmpty(VariableName))
            {
                runner.SetVariable(VariableName, doc);
            }

            Console.WriteLine("網頁內容獲取成功");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"獲取網頁內容失敗: {ex.Message}");
        }

        return GetNextStep();
    }
}