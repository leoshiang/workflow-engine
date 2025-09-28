namespace WorkflowEngine.Constants;

public static class ErrorMessages
{
    public const string FILE_NOT_FOUND = "檔案不存在";
    public const string INVALID_DIAGRAM = "無效的流程圖格式";
    public const string MISSING_START_NODE = "找不到開始節點";
    public const string MISSING_END_NODE = "找不到結束節點";
    public const string ORPHANED_NODE = "存在孤立節點";
    public const string INVALID_CONNECTION = "無效的連線";
    public const string SCRIPT_EXECUTION_ERROR = "腳本執行錯誤";
}