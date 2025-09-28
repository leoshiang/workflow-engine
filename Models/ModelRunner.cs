using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;
using WorkflowEngine.Models.Steps;
using WorkflowEngine.Plugins;

namespace WorkflowEngine.Models;

public class ModelRunner
{
    private readonly FilePlugin _filePlugin = new();
    private readonly KeyboardPlugin _keyboardPlugin = new();
    private readonly MousePlugin _mousePlugin = new();
    private readonly ScreenPlugin _screenPlugin = new();
    private readonly SystemPlugin _systemPlugin = new();
    private readonly Dictionary<string, object?> _variables = new();

    public async Task<object?> ExecuteAsync(string code)
    {
        try
        {
            var options = ScriptOptions.Default
                .WithReferences(typeof(Console).Assembly)
                .WithImports("System", "System.Console", "System.IO", "System.Threading.Tasks");

            var globals = new ScriptGlobals
            {
                Variables = _variables,
                Mouse = _mousePlugin,
                Keyboard = _keyboardPlugin,
                Screen = _screenPlugin,
                System = _systemPlugin,
                File = _filePlugin
            };

            var result = await CSharpScript.EvaluateAsync(code, options, globals);
            return result;
        }
        catch (Exception ex)
        {
            throw new Exception($"執行腳本時發生錯誤: {ex.Message}");
        }
    }

    public object? GetVariable(string name)
    {
        return _variables.TryGetValue(name, out var value) ? value : null;
    }

    public void SetVariable(string name, object? value)
    {
        _variables[name] = value;
    }

    public async Task RunAsync(Model model)
    {
        var currentStep = model.FindEntryPoint().GetNextStep();

        while (!IsFinished(currentStep))
        {
            currentStep = await currentStep.ExecuteAsync(this);
        }
    }

    private static bool IsFinished(Step? step)
    {
        return step == null || step.Type == StepTypes.STOP;
    }

    public class ScriptGlobals
    {
        public Dictionary<string, object?> Variables { get; set; } = new();
        public MousePlugin Mouse { get; set; } = new();
        public KeyboardPlugin Keyboard { get; set; } = new();
        public ScreenPlugin Screen { get; set; } = new();
        public SystemPlugin System { get; set; } = new();
        public FilePlugin File { get; set; } = new();
    }
}