using System.Globalization;
using CsvHelper;

namespace WorkflowEngine.Models.Steps;

public class CsvReaderStep : Step
{
    public string FilePath { get; set; } = string.Empty;
    public string VariableName { get; set; } = string.Empty;

    public override async Task<Step?> ExecuteAsync(ModelRunner runner)
    {
        Console.WriteLine($"讀取 CSV 檔案: {FilePath}");

        try
        {
            using var reader = new StringReader(await File.ReadAllTextAsync(FilePath));
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

            var records = csv.GetRecords<dynamic>().ToList();

            if (!string.IsNullOrEmpty(VariableName))
            {
                runner.SetVariable(VariableName, records);
            }

            Console.WriteLine($"成功讀取 {records.Count} 筆資料");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"讀取 CSV 檔案失敗: {ex.Message}");
        }

        return GetNextStep();
    }
}