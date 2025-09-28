using System.IO.Compression;
using System.Text;
using System.Web;
using System.Xml.Linq;

namespace WorkflowEngine.Models;

public class Diagram
{
    private List<XElement> _cells = new();
    private List<XElement> _objects = new();

    public List<XElement> Cells => _cells;
    public List<XElement> Objects => _objects;

    public async Task<Diagram> LoadFromFileAsync(string fileName)
    {
        if (!File.Exists(fileName))
            throw new Exception($"檔案 {fileName} 不存在！");

        var data = await File.ReadAllTextAsync(fileName);
        var xml = XDocument.Parse(data);

        await DecompressAsync(xml);
        GetObjects(xml);
        GetCells(xml);

        return this;
    }

    private async Task DecompressAsync(XDocument xml)
    {
        var diagrams = xml.Root?.Elements("diagram");
        if (diagrams == null) return;

        foreach (var diagram in diagrams)
        {
            var compressedData = diagram.Value;
            if (string.IsNullOrEmpty(compressedData)) continue;

            try
            {
                var compressedBytes = Convert.FromBase64String(compressedData);
                string decompressedXml;

                using (var compressedStream = new MemoryStream(compressedBytes))
                using (var deflateStream = new DeflateStream(compressedStream, CompressionMode.Decompress))
                using (var resultStream = new MemoryStream())
                {
                    await deflateStream.CopyToAsync(resultStream);
                    var decompressedBytes = resultStream.ToArray();
                    decompressedXml = Encoding.UTF8.GetString(decompressedBytes);
                }

                var decodedXml = HttpUtility.UrlDecode(decompressedXml);
                var parsedXml = XDocument.Parse(decodedXml);

                diagram.RemoveNodes();
                diagram.Add(parsedXml.Root?.Elements());
            }
            catch (Exception ex)
            {
                throw new Exception($"解壓縮圖表資料時發生錯誤: {ex.Message}");
            }
        }
    }

    private void GetCells(XDocument xml)
    {
        var root = xml.Root?.Element("diagram")?.Element("mxGraphModel")?.Element("root");
        if (root != null)
        {
            _cells = root.Elements("mxCell").ToList();
        }
    }

    private void GetObjects(XDocument xml)
    {
        var root = xml.Root?.Element("diagram")?.Element("mxGraphModel")?.Element("root");
        if (root != null)
        {
            _objects = root.Elements("object").ToList();
        }
    }
}