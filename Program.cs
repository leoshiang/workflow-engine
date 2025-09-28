using WorkflowEngine.Builders;
using WorkflowEngine.Models;
using WorkflowEngine.Models.Steps;

namespace WorkflowEngine;

class Program
{
    static async Task Main(string[] args)
    {
        try
        {
            if (args.Length < 1)
            {
                Console.WriteLine("使用方式：WorkflowEngine test.drawio");
                Environment.Exit(1);
            }

            var fileName = args[0];
            if (!File.Exists(fileName))
            {
                Console.WriteLine($"檔案 {fileName} 不存在！");
                Environment.Exit(1);
            }

            StepBuilderManager.Init();
            StepManager.Init();

            var diagram = await new Diagram().LoadFromFileAsync(fileName);
            var model = await new ModelBuilder().BuildAsync(diagram);

            var validator = new ModelValidator();
            var errorMessages = validator.Validate(model);
            if (errorMessages.Count > 0)
            {
                var messageLines = string.Join("\r\n", errorMessages);
                throw new Exception("\r\n" + messageLines);
            }

            await new ModelRunner().RunAsync(model);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"錯誤：{ex.Message}");
            Environment.Exit(1);
        }
    }
}