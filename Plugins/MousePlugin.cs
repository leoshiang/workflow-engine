using InputSimulatorStandard;

namespace WorkflowEngine.Plugins;

public class MousePlugin : IPlugin
{
    private readonly InputSimulator _inputSimulator = new();

    public void Init()
    {
        // 初始化滑鼠插件
    }

    public void Click(int x, int y)
    {
        MoveTo(x, y);
        _inputSimulator.Mouse.LeftButtonClick();
        Console.WriteLine($"滑鼠點擊位置: ({x}, {y})");
    }

    public void RightClick(int x, int y)
    {
        MoveTo(x, y);
        _inputSimulator.Mouse.RightButtonClick();
        Console.WriteLine($"滑鼠右鍵點擊位置: ({x}, {y})");
    }

    public void MoveTo(int x, int y)
    {
        var normalizedX = (65535 * x) / Screen.PrimaryScreen.Bounds.Width;
        var normalizedY = (65535 * y) / Screen.PrimaryScreen.Bounds.Height;

        _inputSimulator.Mouse.MoveMouseTo(normalizedX, normalizedY);
        Console.WriteLine($"滑鼠移動到位置: ({x}, {y})");
    }

    public void Drag(int fromX, int fromY, int toX, int toY)
    {
        MoveTo(fromX, fromY);
        _inputSimulator.Mouse.LeftButtonDown();
        Thread.Sleep(100);
        MoveTo(toX, toY);
        _inputSimulator.Mouse.LeftButtonUp();
        Console.WriteLine($"滑鼠拖曳: ({fromX}, {fromY}) -> ({toX}, {toY})");
    }

    public void Scroll(int scrollAmount)
    {
        _inputSimulator.Mouse.VerticalScroll(scrollAmount);
        Console.WriteLine($"滑鼠滾輪滾動: {scrollAmount}");
    }
}