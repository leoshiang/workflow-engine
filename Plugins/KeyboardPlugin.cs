using InputSimulatorStandard;
using InputSimulatorStandard.Native;

namespace WorkflowEngine.Plugins;

public class KeyboardPlugin : IPlugin
{
    private readonly InputSimulator _inputSimulator = new();

    public void Init()
    {
        // 初始化鍵盤插件
    }

    public void Type(string text)
    {
        _inputSimulator.Keyboard.TextEntry(text);
        Console.WriteLine($"輸入文字: {text}");
    }

    public void KeyPress(string keyName)
    {
        if (Enum.TryParse<VirtualKeyCode>(keyName.ToUpper(), out var keyCode))
        {
            _inputSimulator.Keyboard.KeyPress(keyCode);
            Console.WriteLine($"按鍵: {keyName}");
        }
        else
        {
            Console.WriteLine($"未知按鍵: {keyName}");
        }
    }

    public void KeyDown(string keyName)
    {
        if (Enum.TryParse<VirtualKeyCode>(keyName.ToUpper(), out var keyCode))
        {
            _inputSimulator.Keyboard.KeyDown(keyCode);
            Console.WriteLine($"按下按鍵: {keyName}");
        }
        else
        {
            Console.WriteLine($"未知按鍵: {keyName}");
        }
    }

    public void KeyUp(string keyName)
    {
        if (Enum.TryParse<VirtualKeyCode>(keyName.ToUpper(), out var keyCode))
        {
            _inputSimulator.Keyboard.KeyUp(keyCode);
            Console.WriteLine($"釋放按鍵: {keyName}");
        }
        else
        {
            Console.WriteLine($"未知按鍵: {keyName}");
        }
    }

    public void Shortcut(params string[] keys)
    {
        var keyCodes = keys.Where(k => Enum.TryParse<VirtualKeyCode>(k.ToUpper(), out _))
            .Select(k => Enum.Parse<VirtualKeyCode>(k.ToUpper()))
            .ToArray();

        if (keyCodes.Length > 0)
        {
            _inputSimulator.Keyboard.ModifiedKeyStroke(keyCodes.Take(keyCodes.Length - 1), keyCodes.Last());
            Console.WriteLine($"快捷鍵: {string.Join("+", keys)}");
        }
    }
}